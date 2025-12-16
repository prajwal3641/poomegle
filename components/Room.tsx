"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const URL = "https://poomegle.onrender.com";
// const URL = "http://localhost:3001";

// STUN only (add TURN for best real-world reliability)
const rtcConfig: RTCConfiguration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun3.l.google.com:19302" },
  ],
};

type Role = "offerer" | "answerer";

export const Room = ({
  name,
  localAudioTrack,
  localVideoTrack,
}: {
  name: string;
  localAudioTrack: MediaStreamTrack | null;
  localVideoTrack: MediaStreamTrack | null;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [lobby, setLobby] = useState(true);
  const [role, setRole] = useState<Role | null>(null);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const roomIdRef = useRef<string | null>(null);

  // Buffer remote ICE candidates that arrive before setRemoteDescription() completes.
  // addIceCandidate() adds candidates to the connection's remote description context. [web:9]
  const pendingRemoteCandidatesRef = useRef<RTCIceCandidateInit[]>([]);

  const remoteStreamRef = useRef<MediaStream | null>(null);

  function ensureRemoteStreamAttached() {
    if (!remoteStreamRef.current) remoteStreamRef.current = new MediaStream();
    if (
      remoteVideoRef.current &&
      remoteVideoRef.current.srcObject !== remoteStreamRef.current
    ) {
      remoteVideoRef.current.srcObject = remoteStreamRef.current;
    }
  }

  function ensurePc(s: Socket) {
    if (pcRef.current) return pcRef.current;

    const pc = new RTCPeerConnection(rtcConfig);

    // Prepare remote stream + ontrack (fires when remote adds tracks). [web:33]
    ensureRemoteStreamAttached();
    pc.ontrack = ({ streams, track }) => {
      // Preferred: browsers often provide the full stream in event.streams[0]. [web:56]
      if (streams && streams[0] && remoteVideoRef.current) {
        if (remoteVideoRef.current.srcObject !== streams[0]) {
          remoteVideoRef.current.srcObject = streams[0];
        }
        return;
      }

      // Fallback: add track to our managed MediaStream.
      ensureRemoteStreamAttached();
      const ms = remoteStreamRef.current!;
      if (!ms.getTracks().includes(track)) ms.addTrack(track);
    };

    pc.onicecandidate = (e) => {
      if (!e.candidate) return;
      const roomId = roomIdRef.current;
      if (!roomId) return;

      s.emit("add-ice-candidate", {
        candidate: e.candidate,
        roomId,
      });
    };

    // Optional but useful debug
    pc.oniceconnectionstatechange = () => {
      console.log("iceConnectionState:", pc.iceConnectionState);
    };

    // Add local tracks so they get negotiated and sent to the peer. [web:56]
    const localStream = new MediaStream();
    if (localVideoTrack) {
      localStream.addTrack(localVideoTrack);
      pc.addTrack(localVideoTrack, localStream);
    }
    if (localAudioTrack) {
      localStream.addTrack(localAudioTrack);
      pc.addTrack(localAudioTrack, localStream);
    }

    pcRef.current = pc;
    return pc;
  }

  async function flushPendingCandidates(pc: RTCPeerConnection) {
    // Wait until remoteDescription exists, else keep buffering. [web:9]
    if (!pc.remoteDescription) return;

    const pending = pendingRemoteCandidatesRef.current;
    pendingRemoteCandidatesRef.current = [];
    for (const c of pending) {
      try {
        await pc.addIceCandidate(c);
      } catch (err) {
        // In production log this; often happens if signaling order is wrong.
        // console.warn("addIceCandidate failed", err);
      }
    }
  }

  // Local preview
  useEffect(() => {
    if (localVideoRef.current && localVideoTrack) {
      localVideoRef.current.srcObject = new MediaStream([localVideoTrack]);
    }
  }, [localVideoTrack]);

  // Socket + signaling
  useEffect(() => {
    const s = io(URL);
    setSocket(s);

    s.on("lobby", () => {
      setLobby(true);
      setRole(null);
      roomIdRef.current = null;
    });

    // Offerer starts negotiation (backend should send to only one peer)
    s.on(
      "send-offer",
      async ({ roomId, role }: { roomId: string; role?: Role }) => {
        setLobby(false);
        setRole(role ?? "offerer");
        roomIdRef.current = roomId;

        const pc = ensurePc(s);

        // Create and send offer (setLocalDescription triggers ICE gathering). [web:8]
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        s.emit("offer", { sdp: pc.localDescription, roomId });
      }
    );

    // Answerer waits for offer; this event is from the modified backend.
    s.on("wait-offer", ({ roomId, role }: { roomId: string; role?: Role }) => {
      setLobby(false);
      setRole(role ?? "answerer");
      roomIdRef.current = roomId;

      // Create PC and attach tracks, but do not create offer.
      ensurePc(s);
    });

    // Answerer receives offer -> SRD -> createAnswer -> SLD -> send answer. [web:8]
    s.on(
      "offer",
      async ({
        roomId,
        sdp,
      }: {
        roomId: string;
        sdp: RTCSessionDescriptionInit;
      }) => {
        setLobby(false);
        roomIdRef.current = roomId;

        const pc = ensurePc(s);

        await pc.setRemoteDescription(sdp);
        await flushPendingCandidates(pc);

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        s.emit("answer", { sdp: pc.localDescription, roomId });
      }
    );

    // Offerer receives answer -> SRD. [web:8]
    s.on("answer", async ({ sdp }: { sdp: RTCSessionDescriptionInit }) => {
      setLobby(false);
      const pc = pcRef.current;
      if (!pc) return;

      await pc.setRemoteDescription(sdp);
      await flushPendingCandidates(pc);
    });

    // Trickle ICE: buffer until remoteDescription exists, then add. [web:9][web:8]
    s.on(
      "add-ice-candidate",
      async ({ candidate }: { candidate: RTCIceCandidateInit }) => {
        const pc = pcRef.current;
        if (!pc) {
          pendingRemoteCandidatesRef.current.push(candidate);
          return;
        }
        if (!pc.remoteDescription) {
          pendingRemoteCandidatesRef.current.push(candidate);
          return;
        }
        try {
          await pc.addIceCandidate(candidate);
        } catch (err) {
          // console.warn("addIceCandidate failed", err);
        }
      }
    );

    return () => {
      s.disconnect();
      setSocket(null);

      pendingRemoteCandidatesRef.current = [];
      roomIdRef.current = null;
      remoteStreamRef.current = null;

      if (pcRef.current) {
        pcRef.current.ontrack = null;
        pcRef.current.onicecandidate = null;
        pcRef.current.close();
        pcRef.current = null;
      }
    };
  }, [name, localAudioTrack, localVideoTrack]);

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <p className="text-lg font-medium mb-4">
        Hi {name} {role ? `(role: ${role})` : ""}
      </p>

      <div className="flex flex-col md:flex-row gap-4 w-full max-w-xs sm:max-w-sm md:max-w-3xl">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
          <video
            autoPlay
            playsInline
            muted
            ref={localVideoRef}
            className="w-full rounded-lg grayscale"
          />
        </div>

        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
          <video
            autoPlay
            playsInline
            ref={remoteVideoRef}
            className="w-full rounded-lg grayscale"
          />
        </div>
      </div>

      {lobby ? (
        <p className="mt-4 text-muted-foreground">
          Waiting to connect you to someone...
        </p>
      ) : null}
    </div>
  );
};
