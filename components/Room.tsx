"use client";

import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { VideoOff, UserX, X, MessageSquare } from 'lucide-react';
import { Navbar } from './Navbar';
import { useRouter } from "next/navigation";

// Types
interface Message {
  id: string;
  text: string;
  sender: 'me' | 'stranger';
  timestamp: number;
}

type Role = "offerer" | "answerer";

// Constants
const URL = process.env.NEXT_PUBLIC_WS_URL || "https://poomegle.onrender.com";

const fallbackRtcConfig: RTCConfiguration = {
  iceServers: [
    { urls: "stun:stun.cloudflare.com:3478" },
    { urls: "stun:stun.cloudflare.com:53" },
    { urls: "stun:stun.l.google.com:19302" },
  ],
};

// Helper function
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

export const Room = ({
  name,
  localAudioTrack,
  localVideoTrack,
}: {
  name: string;
  localAudioTrack: MediaStreamTrack | null;
  localVideoTrack: MediaStreamTrack | null;
}) => {
  const router = useRouter();
  
  // -- WebRTC Logic State --
  const [socket, setSocket] = useState<Socket | null>(null);
  const [lobby, setLobby] = useState(true);
  const [role, setRole] = useState<Role | null>(null);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const roomIdRef = useRef<string | null>(null);
  const pendingRemoteCandidatesRef = useRef<RTCIceCandidateInit[]>([]);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const rtcConfigRef = useRef<RTCConfiguration | null>(null);

  // -- UI State --
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- WebRTC Logic Implementation ---

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

    const config = rtcConfigRef.current || fallbackRtcConfig;
    const pc = new RTCPeerConnection(config);

    ensureRemoteStreamAttached();
    pc.ontrack = ({ streams, track }) => {
      if (streams && streams[0] && remoteVideoRef.current) {
        if (remoteVideoRef.current.srcObject !== streams[0]) {
          remoteVideoRef.current.srcObject = streams[0];
        }
        return;
      }
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

    pc.oniceconnectionstatechange = () => {
      console.log("iceConnectionState:", pc.iceConnectionState);
    };

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
    if (!pc.remoteDescription) return;
    const pending = pendingRemoteCandidatesRef.current;
    pendingRemoteCandidatesRef.current = [];
    for (const c of pending) {
      try {
        await pc.addIceCandidate(c);
      } catch (err) {
        // console.warn("addIceCandidate failed", err);
      }
    }
  }

  useEffect(() => {
    if (localVideoRef.current && localVideoTrack) {
      localVideoRef.current.srcObject = new MediaStream([localVideoTrack]);
    }
  }, [localVideoTrack]);

  useEffect(() => {
    getRtcConfig().then((config) => {
      rtcConfigRef.current = config;
    });
  }, []);

  useEffect(() => {
    const s = io(URL);
    setSocket(s);

    s.on("lobby", () => {
      setLobby(true);
      setRole(null);
      roomIdRef.current = null;
      // Clear chat when entering lobby/waiting
      setMessages([]); 
    });

    s.on("send-offer", async ({ roomId, role }: { roomId: string; role?: Role }) => {
      setLobby(false);
      setRole(role ?? "offerer");
      roomIdRef.current = roomId;
      const pc = ensurePc(s);
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      s.emit("offer", { sdp: pc.localDescription, roomId });
    });

    s.on("wait-offer", ({ roomId, role }: { roomId: string; role?: Role }) => {
      setLobby(false);
      setRole(role ?? "answerer");
      roomIdRef.current = roomId;
      ensurePc(s);
    });

    s.on("offer", async ({ roomId, sdp }: { roomId: string; sdp: RTCSessionDescriptionInit }) => {
        setLobby(false);
        roomIdRef.current = roomId;
        const pc = ensurePc(s);
        await pc.setRemoteDescription(sdp);
        await flushPendingCandidates(pc);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        s.emit("answer", { sdp: pc.localDescription, roomId });
    });

    s.on("answer", async ({ sdp }: { sdp: RTCSessionDescriptionInit }) => {
      setLobby(false);
      const pc = pcRef.current;
      if (!pc) return;
      await pc.setRemoteDescription(sdp);
      await flushPendingCandidates(pc);
    });

    s.on("add-ice-candidate", async ({ candidate }: { candidate: RTCIceCandidateInit }) => {
      const pc = pcRef.current;
      if (!pc || !pc.remoteDescription) {
        pendingRemoteCandidatesRef.current.push(candidate);
        return;
      }
      try {
        await pc.addIceCandidate(candidate);
      } catch (err) {
        // console.warn("addIceCandidate failed", err);
      }
    });

    return () => {
      s.disconnect();
      setSocket(null);
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


  // --- UI Functions ---

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // If a new message arrives from stranger, open chat
  useEffect(() => {
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.sender === 'stranger') {
        setIsChatOpen(true);
      }
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'me',
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
    
    // Note: Chat backend logic is not implemented in original code.
    // We could emit a socket event here if the backend supports it.
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
    if (e.key === 'Escape') handleSkip();
  };

  const handleSkip = () => {
    // Basic skip implementation: reload to find new peer
    // In a full implementation, we would emit 'leave' and 'join' events
    window.location.reload(); 
  };

  const handleQuit = () => {
      // Disconnect and go back home
      window.location.href = '/'; 
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-light-bg dark:bg-dark-bg font-mono text-gray-900 dark:text-gray-100">
      <Navbar />

      <main className={`flex-grow w-full max-w-[1800px] mx-auto p-4 md:p-6 pb-24 md:pb-32 px-6 flex flex-col lg:grid lg:grid-cols-12 gap-4 md:gap-6 min-h-0 pt-20 md:pt-28 relative z-10 transition-all duration-300`}>
        
        {/* Left Column: Video Feeds */}
        <div className={`flex flex-row gap-3 md:gap-4 shrink-0 h-[25vh] md:h-[30vh] lg:h-full min-h-0 transition-all duration-300 ${isChatOpen ? 'lg:col-span-5 lg:flex-col' : 'lg:col-span-12 lg:flex-col justify-center'}`}>
          
          {/* Stranger Feed */}
          <div className="relative flex-1 bg-white dark:bg-dark-surface rounded-2xl md:rounded-3xl border border-gray-200 dark:border-white/5 flex flex-col items-center justify-center overflow-hidden group shadow-lg">
            
            {/* Remote Video Element */}
            <video
                autoPlay
                playsInline
                ref={remoteVideoRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${lobby ? 'opacity-0' : 'opacity-100'}`}
            />
            
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-100/50 dark:from-white/5 to-transparent opacity-50 pointer-events-none"></div>
            
            {/* Loading/Lobby Indicator */}
            {lobby && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 z-10 p-4 text-center">
                     <UserX size={48} className="mb-2 opacity-50" />
                     <p className="animate-pulse">Waiting for a stranger...</p>
                 </div>
            )}
            
            <button 
              onClick={handleSkip}
              className="absolute top-2 right-2 md:top-4 md:right-4 bg-white/80 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white px-3 py-1 md:px-5 md:py-2 rounded-full hover:bg-gray-100 dark:hover:bg-white dark:hover:text-black transition-all duration-200 font-bold text-xs md:text-sm shadow-sm z-20 cursor-pointer"
            >
              skip
            </button>
            <div className="absolute bottom-2 left-3 md:bottom-4 md:left-5 text-gray-400 dark:text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-50 z-20">Stranger</div>
          </div>

          {/* Self Feed */}
          <div className="relative flex-1 bg-white dark:bg-dark-surface rounded-2xl md:rounded-3xl border border-gray-200 dark:border-white/5 flex flex-col items-center justify-center overflow-hidden group shadow-lg">
             
            {/* Local Video Element */}
            <video
                autoPlay
                playsInline
                muted
                ref={localVideoRef}
                className="absolute inset-0 w-full h-full object-cover transform scale-x-[-1]"
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-100/50 dark:from-white/5 to-transparent opacity-50 pointer-events-none"></div>
            
            <button 
              onClick={handleQuit}
              className="absolute top-2 right-2 md:top-4 md:right-4 bg-white/80 dark:bg-black/40 backdrop-blur-md border border-red-200 dark:border-red-500/30 text-red-500 dark:text-red-400 px-3 py-1 md:px-5 md:py-2 rounded-full hover:bg-red-500 hover:text-white transition-all duration-200 font-bold text-xs md:text-sm shadow-sm z-20 cursor-pointer"
            >
              quit
            </button>
            <div className="absolute bottom-2 left-3 md:bottom-4 md:left-5 text-gray-400 dark:text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-50 z-20">You</div>
          </div>
        </div>

        {/* Right Column: Chat */}
        {isChatOpen && (
        <div className="lg:col-span-7 flex flex-col gap-3 md:gap-4 flex-1 lg:h-full min-h-0 relative">
          
          {/* Chat History Area */}
          <div className="flex-1 bg-white dark:bg-dark-surface rounded-2xl md:rounded-3xl border border-gray-200 dark:border-white/5 p-4 md:p-6 relative flex flex-col overflow-hidden shadow-lg">
             
            {/* Close Chat Button */}
            <button 
                onClick={() => setIsChatOpen(false)}
                className="absolute top-3 right-3 p-2 bg-gray-100 dark:bg-dark-highlight rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors z-20"
                title="Close chat"
            >
                <X size={18} className="text-gray-500 dark:text-gray-400" />
            </button>

            {/* Grid Pattern Background */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                 style={{ 
                   backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', 
                   backgroundSize: '40px 40px' 
                 }}>
            </div>

            <div className="flex-1 overflow-y-auto custom-scroll flex flex-col space-y-4 pr-2 z-10 pt-6">
              {messages.length === 0 && (
                <div className="flex-1 flex items-end justify-center pb-10 text-gray-400 dark:text-gray-600 opacity-50 font-bold text-lg italic select-none">
                  Start chatting...
                </div>
              )}
              
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`max-w-[85%] md:max-w-[80%] px-4 py-2.5 md:px-5 md:py-3 rounded-2xl text-sm md:text-lg break-words shadow-sm ${
                    msg.sender === 'me' 
                      ? 'self-end bg-primary text-gray-900 rounded-br-none' 
                      : 'self-start bg-gray-100 dark:bg-dark-highlight text-gray-800 dark:text-gray-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="h-14 md:h-16 shrink-0 bg-white dark:bg-dark-surface rounded-full border border-gray-200 dark:border-white/10 flex items-center px-1.5 md:px-2 shadow-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/50 transition-all duration-200 mb-2 lg:mb-0">
            <input 
              className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white text-sm md:text-lg px-4 md:px-6 placeholder-gray-400 dark:placeholder-gray-600 font-mono h-full outline-none" 
              placeholder="type a msg .." 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button 
              onClick={handleSend}
              className="mr-0.5 md:mr-1 bg-primary text-gray-900 font-bold text-sm md:text-base hover:bg-white hover:scale-105 active:scale-95 px-5 py-2 md:px-6 md:py-2.5 rounded-full transition-all duration-200 shadow-md cursor-pointer"
            >
              send
            </button>
          </div>
        </div>
        )}

      </main>

      {/* Floating Open Chat Button (only when chat is closed) */}
      {!isChatOpen && (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-24 right-6 md:bottom-28 md:right-8 w-14 h-14 bg-primary text-gray-900 rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 border-2 border-gray-900"
            title="Open chat"
          >
              <MessageSquare size={24} className="ml-0.5 mt-0.5" strokeWidth={2.5} />
          </button>
      )}

      <div className="fixed bottom-3 right-6 text-[10px] md:text-xs text-gray-400 dark:text-gray-500 opacity-60 pointer-events-none hidden md:block select-none z-0">
        press <span className="border border-gray-400 dark:border-gray-600 px-1.5 py-0.5 rounded mx-1">esc</span> to skip
      </div>
    </div>
  );
};
