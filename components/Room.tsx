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
  
  // Use refs for PCs to avoid React state timing issues
  const sendingPcRef = useRef<RTCPeerConnection | null>(null);
  const receivingPcRef = useRef<RTCPeerConnection | null>(null);
  
  // Queue for ICE candidates that arrive before remote description is set
  const pendingCandidatesRef = useRef<{ pc: "sending" | "receiving"; candidate: RTCIceCandidate }[]>([]);
  
  // Track if remote description is set
  const sendingPcRemoteDescSet = useRef(false);
  const receivingPcRemoteDescSet = useRef(false);

  useEffect(() => {
    const socket = io(URL);
    
    // Helper to add ICE candidate with queuing
    const addIceCandidate = async (
      pc: RTCPeerConnection | null,
      candidate: RTCIceCandidate,
      pcType: "sending" | "receiving",
      isRemoteDescSet: boolean
    ) => {
      if (!pc) {
        console.log(`${pcType} PC not found, queuing candidate`);
        pendingCandidatesRef.current.push({ pc: pcType, candidate });
        return;
      }
      
      if (!isRemoteDescSet) {
        console.log(`Remote desc not set for ${pcType}, queuing candidate`);
        pendingCandidatesRef.current.push({ pc: pcType, candidate });
        return;
      }
      
      try {
        await pc.addIceCandidate(candidate);
        console.log(`Added ICE candidate to ${pcType} PC`);
      } catch (err) {
        console.error(`Error adding ICE candidate to ${pcType}:`, err);
      }
    };
    
    // Helper to flush pending candidates
    const flushPendingCandidates = async (pcType: "sending" | "receiving") => {
      const pc = pcType === "sending" ? sendingPcRef.current : receivingPcRef.current;
      if (!pc) return;
      
      const candidates = pendingCandidatesRef.current.filter(c => c.pc === pcType);
      pendingCandidatesRef.current = pendingCandidatesRef.current.filter(c => c.pc !== pcType);
      
      console.log(`Flushing ${candidates.length} pending candidates for ${pcType}`);
      
      for (const { candidate } of candidates) {
        try {
          await pc.addIceCandidate(candidate);
        } catch (err) {
          console.error("Error flushing candidate:", err);
        }
      }
    };

    socket.on("send-offer", async ({ roomId }) => {
      console.log("Sending offer for room:", roomId);
      setLobby(false);
      sendingPcRemoteDescSet.current = false;
      
      const pc = new RTCPeerConnection(ICE_SERVERS);
      sendingPcRef.current = pc;
      
      // Monitor connection state
      pc.oniceconnectionstatechange = () => {
        console.log("Sender ICE connection state:", pc.iceConnectionState);
        setConnectionState(pc.iceConnectionState);
      };
      
      pc.onconnectionstatechange = () => {
        console.log("Sender connection state:", pc.connectionState);
      };
      
      pc.onicegatheringstatechange = () => {
        console.log("Sender ICE gathering state:", pc.iceGatheringState);
      };

      // Add tracks with stream
      const localStream = new MediaStream();
      if (localVideoTrack) {
        localStream.addTrack(localVideoTrack);
        pc.addTrack(localVideoTrack, localStream);
        console.log("Added video track to sender");
      }
      if (localAudioTrack) {
        localStream.addTrack(localAudioTrack);
        pc.addTrack(localAudioTrack, localStream);
        console.log("Added audio track to sender");
      }

      // ICE candidate handler
      pc.onicecandidate = (e) => {
        if (e.candidate) {
          console.log("Sender ICE candidate generated");
          socket.emit("add-ice-candidate", {
            candidate: e.candidate,
            type: "sender",
            roomId,
          });
        }
      };

      // Create and send offer
      pc.onnegotiationneeded = async () => {
        try {
          console.log("Creating offer...");
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          console.log("Local description set, sending offer");
          socket.emit("offer", { sdp: offer, roomId });
        } catch (err) {
          console.error("Error creating offer:", err);
        }
      };
    });

    socket.on("offer", async ({ roomId, sdp: remoteSdp }) => {
      console.log("Received offer for room:", roomId);
      setLobby(false);
      receivingPcRemoteDescSet.current = false;
      
      const pc = new RTCPeerConnection(ICE_SERVERS);
      receivingPcRef.current = pc;
      
      // Monitor connection state
      pc.oniceconnectionstatechange = () => {
        console.log("Receiver ICE connection state:", pc.iceConnectionState);
        setConnectionState(pc.iceConnectionState);
      };
      
      pc.onconnectionstatechange = () => {
        console.log("Receiver connection state:", pc.connectionState);
      };
      
      pc.onicegatheringstatechange = () => {
        console.log("Receiver ICE gathering state:", pc.iceGatheringState);
      };

      // Handle incoming tracks
      pc.ontrack = (event) => {
        console.log("Received track:", event.track.kind);
        if (remoteVideoRef.current) {
          if (event.streams && event.streams[0]) {
            if (remoteVideoRef.current.srcObject !== event.streams[0]) {
              remoteVideoRef.current.srcObject = event.streams[0];
              console.log("Set remote video stream");
            }
          } else {
            // Fallback: create stream manually
            let stream = remoteVideoRef.current.srcObject as MediaStream;
            if (!stream) {
              stream = new MediaStream();
              remoteVideoRef.current.srcObject = stream;
            }
            if (!stream.getTracks().includes(event.track)) {
              stream.addTrack(event.track);
            }
          }
        }
      };

      // ICE candidate handler
      pc.onicecandidate = (e) => {
        if (e.candidate) {
          console.log("Receiver ICE candidate generated");
          socket.emit("add-ice-candidate", {
            candidate: e.candidate,
            type: "receiver",
            roomId,
          });
        }
      };

      try {
        // Set remote description
        await pc.setRemoteDescription(new RTCSessionDescription(remoteSdp));
        console.log("Receiver remote description set");
        receivingPcRemoteDescSet.current = true;
        
        // Flush any pending candidates
        await flushPendingCandidates("receiving");
        
        // Create and send answer
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        console.log("Receiver local description set, sending answer");
        
        socket.emit("answer", { sdp: answer, roomId });
      } catch (err) {
        console.error("Error handling offer:", err);
      }
    });

    socket.on("answer", async ({ sdp: remoteSdp }) => {
      console.log("Received answer");
      const pc = sendingPcRef.current;
      
      if (!pc) {
        console.error("Sending PC not found when receiving answer");
        return;
      }
      
      try {
        await pc.setRemoteDescription(new RTCSessionDescription(remoteSdp));
        console.log("Sender remote description set");
        sendingPcRemoteDescSet.current = true;
        
        // Flush any pending candidates
        await flushPendingCandidates("sending");
        setLobby(false);
      } catch (err) {
        console.error("Error setting remote description:", err);
      }
    });

    socket.on("lobby", () => {
      setLobby(true);
    });

    socket.on("add-ice-candidate", async ({ candidate, type }) => {
      console.log("Received ICE candidate from remote, type:", type);
      
      if (type === "sender") {
        // Candidate from sender goes to receiving PC
        await addIceCandidate(
          receivingPcRef.current,
          new RTCIceCandidate(candidate),
          "receiving",
          receivingPcRemoteDescSet.current
        );
      } else {
        // Candidate from receiver goes to sending PC
        await addIceCandidate(
          sendingPcRef.current,
          new RTCIceCandidate(candidate),
          "sending",
          sendingPcRemoteDescSet.current
        );
      }
    });

    // Cleanup
    return () => {
      socket.disconnect();
      sendingPcRef.current?.close();
      receivingPcRef.current?.close();
    };
  }, [name, localAudioTrack, localVideoTrack]);

  // Set up local video
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
        {lobby ? "Looking for someone..." : `Connected`}
      </p>
    </div>
  );
};
