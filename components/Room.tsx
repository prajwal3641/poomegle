"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
const URL = "https://poomegle.onrender.com";

// ICE servers for NAT traversal - required for connections across different networks
const iceServers = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun3.l.google.com:19302" },
    // 🔥 FREE TURN (20% fallback cases)
    {
      urls: "turn:numb.viagenie.ca",
      username: "lucasvdl@gmail.com",
      credential: "muazkhankhan",
    },
  ],
  iceCandidatePoolSize: 10,
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
  const [pc, setPc] = useState<RTCPeerConnection | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const makingOfferRef = useRef(false);
  const ignoreOfferRef = useRef(false);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const socketRef = useRef<Socket | null>(null);

  const handleSignaling = useCallback(
    async (data: any) => {
      if (!pc) return;

      // Handle ICE candidates
      if (data.candidate) {
        try {
          await pc.addIceCandidate(data.candidate);
          console.log("✅ ICE candidate added");
        } catch (e) {
          console.warn("ICE candidate ignored (end of candidates)");
        }
        return;
      }

      // 🔥 PERFECT NEGOTIATION COLLISION DETECTION
      if (data.type === "offer" && pc.signalingState !== "stable") {
        console.log(
          "🎯 Collision detected - ignoring offer (Perfect Negotiation)"
        );
        return;
      }

      // Set remote description
      await pc.setRemoteDescription(data);

      // If we received an offer, create answer
      if (data.type === "offer") {
        console.log("📡 Creating answer");
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket?.emit("answer", { sdp: answer, roomId });
      }
    },
    [pc, socket, roomId]
  );

  // ✅ SINGLE PEER CONNECTION SETUP
  const setupPeerConnection = useCallback(
    async (roomId: string) => {
      console.log("🚀 Setting up single peer connection");

      const newPc = new RTCPeerConnection(iceServers);
      setRoomId(roomId);
      setLobby(false);

      // Create local stream with tracks
      const localStream = new MediaStream();
      if (localVideoTrack) {
        localStream.addTrack(localVideoTrack);
        newPc.addTrack(localVideoTrack, localStream);
        console.log("✅ Added video track");
      }
      if (localAudioTrack) {
        localStream.addTrack(localAudioTrack);
        newPc.addTrack(localAudioTrack, localStream);
        console.log("✅ Added audio track");
      }

      // 🔥 REMOTE VIDEO (stranger's video appears here)
      newPc.ontrack = (event) => {
        console.log("🎥 ontrack:", event.track.kind);
        const remoteStream = event.streams[0];

        if (
          remoteVideoRef.current &&
          remoteVideoRef.current.srcObject !== remoteStream
        ) {
          remoteVideoRef.current.srcObject = remoteStream;
          console.log("✅ Remote video stream set");
        }
      };

      // Send ICE candidates
      newPc.onicecandidate = (event) => {
        if (event.candidate) {
          socket?.emit("add-ice-candidate", {
            candidate: event.candidate,
            roomId,
            type: "sender",
          });
        }
      };

      // PERFECT NEGOTIATION: Auto-trigger offer when needed
      newPc.addEventListener("negotiationneeded", async () => {
        if (makingOfferRef.current || !roomId) return;

        makingOfferRef.current = true;
        try {
          console.log("📡 Auto-negotiation: creating offer");
          const offer = await newPc.createOffer();
          await newPc.setLocalDescription(offer);
          socket?.emit("offer", { sdp: offer, roomId });
        } finally {
          makingOfferRef.current = false;
        }
      });

      newPc.onconnectionstatechange = () => {
        console.log("Connection state:", newPc.connectionState);
      };

      setPc(newPc);
    },
    [localVideoTrack, localAudioTrack, socket]
  );

  useEffect(() => {
    const s = io(URL);
    socketRef.current = s;

    // Backend auto-matches → triggers this
    s.on("send-offer", ({ roomId }: { roomId: string }) => {
      console.log("🎯 Matched! Room:", roomId);
      setupPeerConnection(roomId);
    });

    // 🔥 PERFECT NEGOTIATION: Single handler for ALL signaling
    s.on("offer", ({ sdp }: { sdp: any }) => {
      handleSignaling(sdp);
    });

    s.on("answer", ({ sdp }: { sdp: any }) => {
      handleSignaling(sdp);
    });

    s.on("add-ice-candidate", ({ candidate, type }: any) => {
      handleSignaling({ candidate });
    });
    s.on("lobby", () => {
      setLobby(true);
      setPc(null);
      setRoomId(null);
    });
    return () => {
      s.disconnect();
      pc?.close();
    };
  }, [setupPeerConnection, handleSignaling]);

  // Set local video preview
  useEffect(() => {
    if (localVideoRef.current && localVideoTrack) {
      const stream = new MediaStream([localVideoTrack]);
      localVideoRef.current.srcObject = stream;
    }
  }, [localVideoTrack]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      pc?.close();
      socket?.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   const socket = io(URL);
  //   socket.on("send-offer", async ({ roomId }) => {
  //     console.log("sending offer");
  //     setLobby(false);
  //     const pc = new RTCPeerConnection(iceServers);

  //     setSendingPc(pc);
  //     // Create a stream to associate with tracks - this ensures event.streams is populated on receiver
  //     const localStream = new MediaStream();
  //     if (localVideoTrack) {
  //       console.log("added track");
  //       console.log(localVideoTrack);
  //       localStream.addTrack(localVideoTrack);
  //       pc.addTrack(localVideoTrack, localStream);
  //     }
  //     if (localAudioTrack) {
  //       console.log("added track");
  //       console.log(localAudioTrack);
  //       localStream.addTrack(localAudioTrack);
  //       pc.addTrack(localAudioTrack, localStream);
  //     }

  //     pc.onicecandidate = async (e) => {
  //       console.log("receiving ice candidate locally");
  //       if (e.candidate) {
  //         socket.emit("add-ice-candidate", {
  //           candidate: e.candidate,
  //           type: "sender",
  //           roomId,
  //         });
  //       }
  //     };

  //     pc.onnegotiationneeded = async () => {
  //       console.log("on negotiation neeeded, sending offer");
  //       const sdp = await pc.createOffer();
  //       //@ts-ignore
  //       pc.setLocalDescription(sdp);
  //       socket.emit("offer", {
  //         sdp,
  //         roomId,
  //       });
  //     };
  //   });

  //   socket.on("offer", async ({ roomId, sdp: remoteSdp }) => {
  //     console.log("received offer");
  //     setLobby(false);
  //     const pc = new RTCPeerConnection(iceServers);

  //     // Create stream for remote tracks
  //     const stream = new MediaStream();
  //     if (remoteVideoRef.current) {
  //       remoteVideoRef.current.srcObject = stream;
  //     }
  //     setRemoteVideoStream(stream);
  //     setReceivingPc(pc);

  //     // IMPORTANT: Set up ontrack BEFORE setRemoteDescription
  //     // ontrack can fire during setRemoteDescription!
  //     pc.ontrack = (event) => {
  //       console.log("ontrack fired:", event.track.kind);

  //       // Use the streams directly if available (recommended approach)
  //       if (event.streams && event.streams[0]) {
  //         if (remoteVideoRef.current) {
  //           // Only set srcObject if it's not already set to this stream
  //           // This prevents the "play() interrupted" error when multiple tracks arrive
  //           if (remoteVideoRef.current.srcObject !== event.streams[0]) {
  //             remoteVideoRef.current.srcObject = event.streams[0];
  //           }
  //           // autoPlay attribute handles playback, no manual play() needed
  //         }
  //       } else {
  //         // Fallback: manually add track to existing stream
  //         const track = event.track;
  //         if (track.kind === "video") {
  //           setRemoteVideoTrack(track);
  //         } else {
  //           setRemoteAudioTrack(track);
  //         }
  //         // Only add track if not already in stream
  //         if (!stream.getTracks().includes(track)) {
  //           stream.addTrack(track);
  //         }
  //         if (
  //           remoteVideoRef.current &&
  //           remoteVideoRef.current.srcObject !== stream
  //         ) {
  //           remoteVideoRef.current.srcObject = stream;
  //         }
  //         // autoPlay attribute handles playback, no manual play() needed
  //       }
  //     };

  //     pc.onicecandidate = async (e) => {
  //       if (!e.candidate) {
  //         return;
  //       }
  //       console.log("on ice candidate on receiving side");
  //       if (e.candidate) {
  //         socket.emit("add-ice-candidate", {
  //           candidate: e.candidate,
  //           type: "receiver",
  //           roomId,
  //         });
  //       }
  //     };

  //     // Now set remote description AFTER ontrack is set up
  //     await pc.setRemoteDescription(remoteSdp);
  //     const sdp = await pc.createAnswer();
  //     await pc.setLocalDescription(sdp);

  //     socket.emit("answer", {
  //       roomId,
  //       sdp: sdp,
  //     });
  //   });

  //   socket.on("answer", ({ roomId, sdp: remoteSdp }) => {
  //     setLobby(false);
  //     setSendingPc((pc) => {
  //       pc?.setRemoteDescription(remoteSdp);
  //       return pc;
  //     });
  //     console.log("loop closed");
  //   });

  //   socket.on("lobby", () => {
  //     setLobby(true);
  //   });

  //   socket.on("add-ice-candidate", ({ candidate, type }) => {
  //     console.log("add ice candidate from remote");
  //     console.log({ candidate, type });
  //     if (type == "sender") {
  //       setReceivingPc((pc) => {
  //         if (!pc) {
  //           console.log("receicng pc nout found");
  //         } else {
  //           console.log(pc.ontrack);
  //         }
  //         pc?.addIceCandidate(candidate);
  //         return pc;
  //       });
  //     } else {
  //       setSendingPc((pc) => {
  //         if (!pc) {
  //           console.log("sending pc nout found");
  //         } else {
  //           // console.log(pc.ontrack)
  //         }
  //         pc?.addIceCandidate(candidate);
  //         return pc;
  //       });
  //     }
  //   });

  //   setSocket(socket);
  // }, [name]);

  // useEffect(() => {
  //   if (localVideoRef.current && localVideoTrack) {
  //     localVideoRef.current.srcObject = new MediaStream([localVideoTrack]);
  //     // autoPlay attribute handles playback, no manual play() needed
  //   }
  // }, [localVideoRef]);

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
