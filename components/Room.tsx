"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const URL = "https://poomegle.onrender.com";

// ICE servers for NAT traversal
const ICE_SERVERS: RTCConfiguration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun3.l.google.com:19302" },
    { urls: "stun:stun4.l.google.com:19302" },
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
    {
      urls: "turn:openrelay.metered.ca:443?transport=tcp",
      username: "openrelayproject",
      credential: "openrelayproject",
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
  const [lobby, setLobby] = useState(true);
  const [connectionState, setConnectionState] = useState<string>("new");
  
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  
  // Single peer connection ref (one PC handles both sending and receiving)
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const roomIdRef = useRef<string | null>(null);
  
  // Queue for ICE candidates that arrive before remote description is set
  const pendingCandidatesRef = useRef<RTCIceCandidate[]>([]);
  const remoteDescSetRef = useRef(false);

  useEffect(() => {
    const socket = io(URL);
    socketRef.current = socket;
    
    // Helper to set up common PC event handlers
    const setupPeerConnection = (pc: RTCPeerConnection, role: string) => {
      // Monitor connection states
      pc.oniceconnectionstatechange = () => {
        console.log(`[${role}] ICE connection state:`, pc.iceConnectionState);
        setConnectionState(pc.iceConnectionState);
        
        if (pc.iceConnectionState === "connected") {
          setLobby(false);
        }
      };
      
      pc.onconnectionstatechange = () => {
        console.log(`[${role}] Connection state:`, pc.connectionState);
        if (pc.connectionState === "connected") {
          setLobby(false);
        }
      };
      
      pc.onicegatheringstatechange = () => {
        console.log(`[${role}] ICE gathering state:`, pc.iceGatheringState);
      };

      // Handle incoming tracks (BOTH sides need this!)
      pc.ontrack = (event) => {
        console.log(`[${role}] Received remote track:`, event.track.kind);
        if (remoteVideoRef.current) {
          if (event.streams && event.streams[0]) {
            remoteVideoRef.current.srcObject = event.streams[0];
            console.log(`[${role}] Set remote video stream from event.streams`);
          } else {
            // Fallback: create stream manually
            let stream = remoteVideoRef.current.srcObject as MediaStream;
            if (!stream) {
              stream = new MediaStream();
              remoteVideoRef.current.srcObject = stream;
            }
            if (!stream.getTracks().find(t => t.id === event.track.id)) {
              stream.addTrack(event.track);
              console.log(`[${role}] Added track to remote stream manually`);
            }
          }
        }
      };
    };

    // Helper to add local tracks to PC (BOTH sides need this!)
    const addLocalTracks = (pc: RTCPeerConnection, role: string) => {
      const localStream = new MediaStream();
      
      if (localVideoTrack) {
        localStream.addTrack(localVideoTrack);
        pc.addTrack(localVideoTrack, localStream);
        console.log(`[${role}] Added local video track`);
      }
      if (localAudioTrack) {
        localStream.addTrack(localAudioTrack);
        pc.addTrack(localAudioTrack, localStream);
        console.log(`[${role}] Added local audio track`);
      }
    };

    // Helper to flush pending ICE candidates
    const flushPendingCandidates = async (pc: RTCPeerConnection) => {
      const candidates = [...pendingCandidatesRef.current];
      pendingCandidatesRef.current = [];
      
      console.log(`Flushing ${candidates.length} pending ICE candidates`);
      
      for (const candidate of candidates) {
        try {
          await pc.addIceCandidate(candidate);
          console.log("Flushed pending ICE candidate");
        } catch (err) {
          console.error("Error flushing ICE candidate:", err);
        }
      }
    };

    // User A: Creates offer and sends to User B
    socket.on("send-offer", async ({ roomId }) => {
      console.log("[CALLER] Received send-offer for room:", roomId);
      roomIdRef.current = roomId;
      remoteDescSetRef.current = false;
      pendingCandidatesRef.current = [];
      
      const pc = new RTCPeerConnection(ICE_SERVERS);
      pcRef.current = pc;
      
      setupPeerConnection(pc, "CALLER");
      addLocalTracks(pc, "CALLER");

      // ICE candidate handler
      pc.onicecandidate = (e) => {
        if (e.candidate) {
          console.log("[CALLER] Generated ICE candidate");
          socket.emit("add-ice-candidate", {
            candidate: e.candidate,
            type: "sender",
            roomId,
          });
        }
      };

      // Create and send offer when negotiation needed
      pc.onnegotiationneeded = async () => {
        try {
          console.log("[CALLER] Creating offer...");
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          console.log("[CALLER] Sending offer");
          socket.emit("offer", { sdp: offer, roomId });
        } catch (err) {
          console.error("[CALLER] Error creating offer:", err);
        }
      };
    });

    // User B: Receives offer, creates answer
    socket.on("offer", async ({ roomId, sdp: remoteSdp }) => {
      console.log("[CALLEE] Received offer for room:", roomId);
      roomIdRef.current = roomId;
      remoteDescSetRef.current = false;
      pendingCandidatesRef.current = [];
      
      const pc = new RTCPeerConnection(ICE_SERVERS);
      pcRef.current = pc;
      
      setupPeerConnection(pc, "CALLEE");
      
      // IMPORTANT: Add local tracks BEFORE setting remote description
      // This ensures tracks are included in the answer
      addLocalTracks(pc, "CALLEE");

      // ICE candidate handler
      pc.onicecandidate = (e) => {
        if (e.candidate) {
          console.log("[CALLEE] Generated ICE candidate");
          socket.emit("add-ice-candidate", {
            candidate: e.candidate,
            type: "receiver",
            roomId,
          });
        }
      };

      try {
        // Set remote description (the offer)
        console.log("[CALLEE] Setting remote description (offer)");
        await pc.setRemoteDescription(new RTCSessionDescription(remoteSdp));
        remoteDescSetRef.current = true;
        
        // Flush any pending ICE candidates
        await flushPendingCandidates(pc);
        
        // Create and send answer
        console.log("[CALLEE] Creating answer...");
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        console.log("[CALLEE] Sending answer");
        socket.emit("answer", { sdp: answer, roomId });
      } catch (err) {
        console.error("[CALLEE] Error handling offer:", err);
      }
    });

    // User A: Receives answer from User B
    socket.on("answer", async ({ sdp: remoteSdp }) => {
      console.log("[CALLER] Received answer");
      const pc = pcRef.current;
      
      if (!pc) {
        console.error("[CALLER] PC not found when receiving answer");
        return;
      }
      
      try {
        console.log("[CALLER] Setting remote description (answer)");
        await pc.setRemoteDescription(new RTCSessionDescription(remoteSdp));
        remoteDescSetRef.current = true;
        
        // Flush any pending ICE candidates
        await flushPendingCandidates(pc);
      } catch (err) {
        console.error("[CALLER] Error setting remote description:", err);
      }
    });

    socket.on("lobby", () => {
      console.log("Entered lobby");
      setLobby(true);
    });

    // Handle incoming ICE candidates
    socket.on("add-ice-candidate", async ({ candidate, type }) => {
      console.log(`Received ICE candidate from ${type}`);
      const pc = pcRef.current;
      
      if (!pc) {
        console.log("PC not ready, queuing ICE candidate");
        pendingCandidatesRef.current.push(new RTCIceCandidate(candidate));
        return;
      }
      
      if (!remoteDescSetRef.current) {
        console.log("Remote description not set, queuing ICE candidate");
        pendingCandidatesRef.current.push(new RTCIceCandidate(candidate));
        return;
      }
      
      try {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
        console.log("Added ICE candidate successfully");
      } catch (err) {
        console.error("Error adding ICE candidate:", err);
      }
    });

    // Cleanup
    return () => {
      console.log("Cleaning up...");
      socket.disconnect();
      pcRef.current?.close();
      pcRef.current = null;
    };
  }, [name, localAudioTrack, localVideoTrack]);

  // Set up local video preview
  useEffect(() => {
    if (localVideoRef.current && localVideoTrack) {
      localVideoRef.current.srcObject = new MediaStream([localVideoTrack]);
    }
  }, [localVideoTrack]);

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <h1 className="text-2xl font-semibold mb-2">poomegle</h1>
      <p className="text-base text-muted-foreground mb-6">Hi {name}</p>
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-xs sm:max-w-sm md:max-w-3xl">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
          <div className="rounded-lg overflow-hidden bg-muted">
            <video
              autoPlay
              muted
              playsInline
              ref={localVideoRef}
              className="w-full aspect-video object-cover"
            />
          </div>
          <p className="text-base text-muted-foreground text-center mt-2">You</p>
        </div>
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
          <div className="rounded-lg overflow-hidden bg-muted relative">
            <video
              autoPlay
              playsInline
              ref={remoteVideoRef}
              className="w-full aspect-video object-cover"
            />
            {lobby && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <p className="text-base text-muted-foreground">Searching...</p>
              </div>
            )}
          </div>
          <p className="text-base text-muted-foreground text-center mt-2">
            {lobby ? "Waiting" : "Stranger"}
          </p>
        </div>
      </div>
      <p className="mt-6 text-base text-muted-foreground">
        {lobby ? "Looking for someone..." : `Connected (${connectionState})`}
      </p>
    </div>
  );
};
