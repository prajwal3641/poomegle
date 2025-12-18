"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

// WebSocket URL from environment variable
const URL = process.env.NEXT_PUBLIC_WS_URL || "https://poomegle.onrender.com";

// Fallback STUN-only config (used if TURN fetch fails)
const fallbackRtcConfig: RTCConfiguration = {
  iceServers: [
    { urls: "stun:stun.cloudflare.com:3478" },
    { urls: "stun:stun.cloudflare.com:53" },
    { urls: "stun:stun.l.google.com:19302" },
  ],
};

// Fetch TURN credentials from our Next.js API route (FREE to generate!)
async function getRtcConfig(): Promise<RTCConfiguration> {
  try {
    const res = await fetch("/api/turn");
    if (!res.ok) {
      console.error("Failed to get TURN servers:", res.status);
      return fallbackRtcConfig;
    }
    const data = await res.json();
    if (data.iceServers?.length > 0) {
      console.log("Using TURN servers from Cloudflare");
      return { iceServers: data.iceServers };
    }
    return fallbackRtcConfig;
  } catch (err) {
    console.error("Error fetching TURN servers:", err);
    return fallbackRtcConfig;
  }
}

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
  const rtcConfigRef = useRef<RTCConfiguration | null>(null);

  // chat states
  type ChatMsg = { from: "me" | "peer"; text: string; ts: number };

  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const [chatReady, setChatReady] = useState(false);
  const [chatText, setChatText] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([]);

  function ensureRemoteStreamAttached() {
    if (!remoteStreamRef.current) remoteStreamRef.current = new MediaStream();
    if (
      remoteVideoRef.current &&
      remoteVideoRef.current.srcObject !== remoteStreamRef.current
    ) {
      remoteVideoRef.current.srcObject = remoteStreamRef.current;
    }
  }

  function bindDataChannel(dc: RTCDataChannel) {
    dataChannelRef.current = dc;

    dc.onopen = () => setChatReady(true);
    dc.onclose = () => setChatReady(false);

    dc.onmessage = (ev) => {
      setChatMessages((m) => [
        ...m,
        { from: "peer", text: String(ev.data), ts: Date.now() },
      ]);
    };
  }

  function ensurePc(s: Socket, r?: Role) {
    if (pcRef.current) return pcRef.current;

    // Use fetched config (with TURN) or fallback to STUN-only
    const config = rtcConfigRef.current || fallbackRtcConfig;
    const pc = new RTCPeerConnection(config);

    // >>> ADDED: Answerer receives channel created by offerer via ondatachannel
    pc.ondatachannel = (ev) => {
      bindDataChannel(ev.channel);
    };

    // >>> ADDED: Offerer creates chat channel BEFORE createOffer() so SDP includes it
    if ((r ?? role) === "offerer" && !dataChannelRef.current) {
      const dc = pc.createDataChannel("chat", { ordered: true });
      bindDataChannel(dc);
    }
    // <<< ADDED

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

    // Log ICE state changes (TURN is already configured upfront)
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

  // >>> ADDED: P2P send chat via RTCDataChannel.send()
  function sendChat() {
    const dc = dataChannelRef.current;
    const msg = chatText.trim();

    if (!dc || dc.readyState !== "open" || !msg) return;

    dc.send(msg);
    setChatMessages((m) => [...m, { from: "me", text: msg, ts: Date.now() }]);
    setChatText("");
  }
  // <<< ADDED

  // Local preview
  useEffect(() => {
    if (localVideoRef.current && localVideoTrack) {
      localVideoRef.current.srcObject = new MediaStream([localVideoTrack]);
    }
  }, [localVideoTrack]);

  // Fetch TURN credentials upfront (before socket connection)
  useEffect(() => {
    getRtcConfig().then((config) => {
      rtcConfigRef.current = config;
    });
  }, []);

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
        const r = role ?? "offerer";
        setRole(r);
        roomIdRef.current = roomId;

        const pc = ensurePc(s, r);

        // Create and send offer (setLocalDescription triggers ICE gathering). [web:8]
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        s.emit("offer", { sdp: pc.localDescription, roomId });
      }
    );

    // Answerer waits for offer; this event is from the modified backend.
    s.on("wait-offer", ({ roomId, role }: { roomId: string; role?: Role }) => {
      setLobby(false);
      const r = role ?? "answerer";
      setRole(r);
      roomIdRef.current = roomId;

      // Create PC and attach tracks, but do not create offer.
      ensurePc(s, r);
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

      // >>> ADDED: cleanup datachannel + chat state
      if (dataChannelRef.current) {
        dataChannelRef.current.onopen = null;
        dataChannelRef.current.onmessage = null;
        dataChannelRef.current.onclose = null;
        dataChannelRef.current.close();
        dataChannelRef.current = null;
      }
      setChatReady(false);
      setChatMessages([]);
      setChatText("");
      // <<< ADDED

      pendingRemoteCandidatesRef.current = [];
      roomIdRef.current = null;
      remoteStreamRef.current = null;
      rtcConfigRef.current = null;

      if (pcRef.current) {
        pcRef.current.ontrack = null;
        pcRef.current.onicecandidate = null;
        pcRef.current.oniceconnectionstatechange = null;
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

      {/* >>> ADDED: Chat UI (P2P over DataChannel) */}
      {!lobby ? (
        <div className="w-full max-w-3xl mt-6">
          <div className="h-40 overflow-y-auto border rounded p-3">
            {chatMessages.map((m, i) => (
              <div key={i}>
                <span className="text-sm font-medium">{m.from}:</span> {m.text}
              </div>
            ))}
          </div>

          <form
            className="flex gap-2 mt-2"
            onSubmit={(e) => {
              e.preventDefault();
              sendChat();
            }}
          >
            <input
              value={chatText}
              onChange={(e) => setChatText(e.target.value)}
              className="flex-1 border rounded px-3 py-2"
              placeholder={
                chatReady ? "Type a message..." : "Chat connecting..."
              }
              disabled={!chatReady}
            />
            <button
              className="border rounded px-4"
              type="submit"
              disabled={!chatReady}
            >
              Send
            </button>
          </form>
        </div>
      ) : null}
      {/* <<< ADDED */}
    </div>
  );
};
