"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
const URL = "https://poomegle.onrender.com";

// ICE servers for NAT traversal - required for cross-network connections
const ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun3.l.google.com:19302" },
    { urls: "stun:stun4.l.google.com:19302" },
    { urls: "stun:stun.stunprotocol.org:3478" },
    // Free TURN server (limited, for testing only)
    {
      urls: "turn:openrelay.metered.ca:80",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
    {
      urls: "turn:openrelay.metered.ca:443",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
  ],
};

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
  const [sendingPc, setSendingPc] = useState<RTCPeerConnection | null>(null);
  const [receivingPc, setReceivingPc] = useState<RTCPeerConnection | null>(
    null
  );
  const [remoteAudioTrack, setRemoteAudioTrack] =
    useState<MediaStreamTrack | null>(null);
  const [remoteVideoTrack, setRemoteVideoTrack] =
    useState<MediaStreamTrack | null>(null);
  const [remoteVideoStream, setRemoteVideoStream] =
    useState<MediaStream | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const socket = io(URL);
    socket.on("send-offer", async ({ roomId }) => {
      console.log("sending offer");
      setLobby(false);
      const pc = new RTCPeerConnection(ICE_SERVERS);

      setSendingPc(pc);
      // Create a stream to associate with tracks - this ensures event.streams is populated on receiver
      const localStream = new MediaStream();
      if (localVideoTrack) {
        console.log("added track");
        console.log(localVideoTrack);
        localStream.addTrack(localVideoTrack);
        pc.addTrack(localVideoTrack, localStream);
      }
      if (localAudioTrack) {
        console.log("added track");
        console.log(localAudioTrack);
        localStream.addTrack(localAudioTrack);
        pc.addTrack(localAudioTrack, localStream);
      }

      pc.onicecandidate = async (e) => {
        console.log("receiving ice candidate locally");
        if (e.candidate) {
          socket.emit("add-ice-candidate", {
            candidate: e.candidate,
            type: "sender",
            roomId,
          });
        }
      };

      pc.onnegotiationneeded = async () => {
        console.log("on negotiation neeeded, sending offer");
        const sdp = await pc.createOffer();
        //@ts-ignore
        pc.setLocalDescription(sdp);
        socket.emit("offer", {
          sdp,
          roomId,
        });
      };
    });

    socket.on("offer", async ({ roomId, sdp: remoteSdp }) => {
      console.log("received offer");
      setLobby(false);
      const pc = new RTCPeerConnection(ICE_SERVERS);
      
      // Create stream for remote tracks
      const stream = new MediaStream();
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
      setRemoteVideoStream(stream);
      setReceivingPc(pc);

      // IMPORTANT: Set up ontrack BEFORE setRemoteDescription
      // ontrack can fire during setRemoteDescription!
      pc.ontrack = (event) => {
        console.log("ontrack fired:", event.track.kind);
        
        // Use the streams directly if available (recommended approach)
        if (event.streams && event.streams[0]) {
          if (remoteVideoRef.current) {
            // Only set srcObject if it's not already set to this stream
            // This prevents the "play() interrupted" error when multiple tracks arrive
            if (remoteVideoRef.current.srcObject !== event.streams[0]) {
              remoteVideoRef.current.srcObject = event.streams[0];
            }
            // autoPlay attribute handles playback, no manual play() needed
          }
        } else {
          // Fallback: manually add track to existing stream
          const track = event.track;
          if (track.kind === "video") {
            setRemoteVideoTrack(track);
          } else {
            setRemoteAudioTrack(track);
          }
          // Only add track if not already in stream
          if (!stream.getTracks().includes(track)) {
            stream.addTrack(track);
          }
          if (remoteVideoRef.current && remoteVideoRef.current.srcObject !== stream) {
            remoteVideoRef.current.srcObject = stream;
          }
          // autoPlay attribute handles playback, no manual play() needed
        }
      };

      pc.onicecandidate = async (e) => {
        if (!e.candidate) {
          return;
        }
        console.log("on ice candidate on receiving side");
        if (e.candidate) {
          socket.emit("add-ice-candidate", {
            candidate: e.candidate,
            type: "receiver",
            roomId,
          });
        }
      };

      // Now set remote description AFTER ontrack is set up
      await pc.setRemoteDescription(remoteSdp);
      const sdp = await pc.createAnswer();
      await pc.setLocalDescription(sdp);

      socket.emit("answer", {
        roomId,
        sdp: sdp,
      });
    });

    socket.on("answer", ({ roomId, sdp: remoteSdp }) => {
      setLobby(false);
      setSendingPc((pc) => {
        pc?.setRemoteDescription(remoteSdp);
        return pc;
      });
      console.log("loop closed");
    });

    socket.on("lobby", () => {
      setLobby(true);
    });

    socket.on("add-ice-candidate", ({ candidate, type }) => {
      console.log("add ice candidate from remote");
      console.log({ candidate, type });
      if (type == "sender") {
        setReceivingPc((pc) => {
          if (!pc) {
            console.log("receicng pc nout found");
          } else {
            console.log(pc.ontrack);
          }
          pc?.addIceCandidate(candidate);
          return pc;
        });
      } else {
        setSendingPc((pc) => {
          if (!pc) {
            console.log("sending pc nout found");
          } else {
            // console.log(pc.ontrack)
          }
          pc?.addIceCandidate(candidate);
          return pc;
        });
      }
    });

    setSocket(socket);
  }, [name]);

  useEffect(() => {
    if (localVideoRef.current && localVideoTrack) {
      localVideoRef.current.srcObject = new MediaStream([localVideoTrack]);
      // autoPlay attribute handles playback, no manual play() needed
    }
  }, [localVideoRef]);

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <p className="text-lg font-medium mb-4">Hi {name}</p>
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-xs sm:max-w-sm md:max-w-3xl">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
          <video
            autoPlay
            ref={localVideoRef}
            className="w-full rounded-lg grayscale"
          />
        </div>
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
          <video
            autoPlay
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
