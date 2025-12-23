"use client";

import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import {
  VideoOff,
  UserX,
  X,
  MessageSquare,
  Mic,
  MicOff,
  SkipForward,
  Square as StopSquare,
  Send,
  Settings,
} from "lucide-react";
import { Navbar } from "./Navbar";
import { useRouter } from "next/navigation";
import { useMediaStream } from "@/hooks/useMediaStream";

// Types
interface Message {
  id: string;
  text: string;
  sender: "me" | "stranger";
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

export const Room = () => {
  const router = useRouter();

  // Get user name from session storage (lazy initialization to avoid race condition with socket)
  const [name] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("userName") || "Anonymous";
    }
    return "Anonymous";
  });

  // -- Use Custom Hook for Local Media --
  const {
    localAudioTrack,
    localVideoTrack,
    isLoading: isMediaLoading,
    error: mediaError,
    micOn,
    setMicOn,
    camOn,
    setCamOn,
    videoFilter,
  } = useMediaStream();

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

  // -- Chat State --
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatReady, setChatReady] = useState(false);

  // Default chat state on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setIsChatOpen(!isMobile);
  }, []);

  const [liveUsers, setLiveUsers] = useState(0);

  const localAudioTrackRef = useRef(localAudioTrack);
  const localVideoTrackRef = useRef(localVideoTrack);

  useEffect(() => {
    localAudioTrackRef.current = localAudioTrack;
  }, [localAudioTrack]);

  useEffect(() => {
    localVideoTrackRef.current = localVideoTrack;
  }, [localVideoTrack]);

  const [strangerName, setStrangerName] = useState("Stranger");

  // Use state derived from hook or internal state for muting
  // Since we have setMicOn from hook, we can use that to control mute state if we want two-way binding
  // or keep local isMuted state. The hook manages track.enabled based on micOn.
  // Let's use internal isMuted to toggle the hook's setMicOn

  const handleToggleMute = () => {
    setMicOn(!micOn);
  };

  const isMuted = !micOn;

  // No longer need this useEffect to sync initial mute state as the hook handles it
  // But we need to make sure track is enabled/disabled correctly in WebRTC

  // --- WebRTC Logic Implementation ---

  function bindDataChannel(dc: RTCDataChannel) {
    dataChannelRef.current = dc;

    dc.onopen = () => setChatReady(true);
    dc.onclose = () => setChatReady(false);

    dc.onmessage = (ev) => {
      const text = String(ev.data);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + Math.random().toString(),
          text: text,
          sender: "stranger",
          timestamp: Date.now(),
        },
      ]);
    };
  }

  function ensureRemoteStreamAttached() {
    if (!remoteStreamRef.current) remoteStreamRef.current = new MediaStream();
    if (
      remoteVideoRef.current &&
      remoteVideoRef.current.srcObject !== remoteStreamRef.current
    ) {
      remoteVideoRef.current.srcObject = remoteStreamRef.current;
    }
  }

  function ensurePc(s: Socket, currentRole?: Role) {
    if (pcRef.current) return pcRef.current;

    const config = rtcConfigRef.current || fallbackRtcConfig;
    const pc = new RTCPeerConnection(config);

    pc.ondatachannel = (ev) => {
      bindDataChannel(ev.channel);
    };

    const r = currentRole || role;
    if (r === "offerer" && !dataChannelRef.current) {
      const dc = pc.createDataChannel("chat", { ordered: true });
      bindDataChannel(dc);
    }

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
    if (localVideoTrackRef.current) {
      localStream.addTrack(localVideoTrackRef.current);
      pc.addTrack(localVideoTrackRef.current, localStream);
    }
    if (localAudioTrackRef.current) {
      localStream.addTrack(localAudioTrackRef.current);
      pc.addTrack(localAudioTrackRef.current, localStream);
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

  const handleSend = () => {
    if (!inputText.trim()) return;

    const dc = dataChannelRef.current;

    if (dc && dc.readyState === "open") {
      dc.send(inputText);

      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: "me",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setInputText("");
    } else {
      console.warn("Chat not ready");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
    if (e.key === "Escape") handleSkip();
  };

  const handleSkip = () => {
    // call backend to reset connection
    socket?.emit("reset", { type: "skip" });
  };

  const handleQuit = () => {
    socket?.disconnect();
    router.push("/");
  };

  function resetConnection(type: "skip" | "quit" | "lobby") {
    console.log("Resetting connection...");

    setStrangerName("Stranger");

    // stop showing remote video
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    remoteStreamRef.current = null;

    // clear pending ICE
    pendingRemoteCandidatesRef.current = [];
    roomIdRef.current = null;

    // close data channel
    if (dataChannelRef.current) {
      try {
        dataChannelRef.current.onopen = null;
        dataChannelRef.current.onclose = null;
        dataChannelRef.current.onmessage = null;
        dataChannelRef.current.close(); // closes RTCDataChannel [web:240]
      } catch {}
      dataChannelRef.current = null;
    }

    if (pcRef.current) {
      // close peer connection
      try {
        pcRef.current.onicecandidate = null;
        pcRef.current.oniceconnectionstatechange = null;
        pcRef.current.ondatachannel = null;
        pcRef.current.ontrack = null;
        pcRef.current.close(); // closes RTCPeerConnection [web:217]
      } catch {}
      pcRef.current = null;
    }

    // reset UI state
    setLobby(true);
    setRole(null);
    const isMobile = window.innerWidth < 768;
    setIsChatOpen(!isMobile);
    setChatReady(false);
    setMessages([]);
    setInputText("");
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
    const s = io(URL, {
      auth: {
        name,
      },
    });
    setSocket(s);

    s.on("lobby", () => resetConnection("lobby"));

    s.on(
      "send-offer",
      async ({
        roomId,
        name,
        role,
      }: {
        roomId: string;
        name: string;
        role?: Role;
      }) => {
        setLobby(false);
        const r = role ?? "offerer";
        setRole(r);
        setStrangerName(name);
        roomIdRef.current = roomId;
        const pc = ensurePc(s, r);
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        s.emit("offer", { sdp: pc.localDescription, roomId });
      }
    );

    s.on(
      "wait-offer",
      ({
        roomId,
        name,
        role,
      }: {
        roomId: string;
        name: string;
        role?: Role;
      }) => {
        setLobby(false);
        const r = role ?? "answerer";
        setRole(r);
        setStrangerName(name);
        roomIdRef.current = roomId;

        // Create PC and attach tracks, but do not create offer.
        ensurePc(s, r);
      }
    );

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
        const pc = ensurePc(s, "answerer");
        await pc.setRemoteDescription(sdp);
        await flushPendingCandidates(pc);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        s.emit("answer", { sdp: pc.localDescription, roomId });
      }
    );

    s.on("answer", async ({ sdp }: { sdp: RTCSessionDescriptionInit }) => {
      setLobby(false);
      const pc = pcRef.current;
      if (!pc) return;
      await pc.setRemoteDescription(sdp);
      await flushPendingCandidates(pc);
    });

    s.on(
      "add-ice-candidate",
      async ({ candidate }: { candidate: RTCIceCandidateInit }) => {
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
      }
    );

    s.on("live-users", ({ count }: { count: number }) => {
      console.log("Live users:", count);
      setLiveUsers(count);
    });

    return () => {
      s.off("lobby");
      s.off("live-users");
      s.off("send-offer");
      s.off("wait-offer");
      s.off("offer");
      s.off("answer");
      s.off("add-ice-candidate");
      s.disconnect();
      setSocket(null);

      pendingRemoteCandidatesRef.current = [];
      roomIdRef.current = null;
      remoteStreamRef.current = null;
      rtcConfigRef.current = null;

      if (dataChannelRef.current) {
        dataChannelRef.current.close();
        dataChannelRef.current = null;
      }

      if (pcRef.current) {
        pcRef.current.ontrack = null;
        pcRef.current.onicecandidate = null;
        pcRef.current.oniceconnectionstatechange = null;
        pcRef.current.ondatachannel = null;
        pcRef.current.close();
        pcRef.current = null;
      }
    };
  }, []);

  // --- UI Functions ---

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.sender === "stranger") {
        setIsChatOpen(true);
      }
    }
  }, [messages]);

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-light-bg dark:bg-dark-bg font-mono text-gray-900 dark:text-gray-100">
      <div className="hidden md:block">
        <Navbar liveUsers={liveUsers} />
      </div>

      <main
        className={`flex-grow w-full max-w-[1800px] mx-auto p-4 md:p-6 pb-2 md:pb-6 px-4 md:px-6 flex flex-col lg:grid lg:grid-cols-12 gap-4 md:gap-6 min-h-0 pt-20 md:pt-16 relative z-10 transition-all duration-300`}
      >
        {/* Left Column: Video Feeds */}
        <div
          className={`
            gap-3 md:gap-4 shrink-0 
            transition-all duration-300 
            ${
              isChatOpen
                ? "flex flex-row lg:flex-col lg:col-span-5 h-[30vh] md:h-[30vh] lg:h-full" // Mobile: Horizontal when chat open
                : "flex flex-col lg:col-span-12 flex-1 lg:grid lg:grid-cols-2 lg:gap-8 justify-center items-center h-auto" // Mobile: Vertical when chat closed
            }
        `}
        >
          {/* Stranger Feed */}
          <div className="relative flex-1 bg-white dark:bg-dark-surface rounded-2xl md:rounded-3xl border border-gray-200 dark:border-white/5 flex flex-col items-center justify-center overflow-hidden group shadow-lg w-full h-full">
            <video
              autoPlay
              playsInline
              ref={remoteVideoRef}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                lobby ? "opacity-0" : "opacity-100"
              }`}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-100/50 dark:from-white/5 to-transparent opacity-50 pointer-events-none"></div>

            {lobby && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-10 overflow-hidden">
                {/* CRT Static Effect */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  {/* More visible, stronger opacity, no mix-blend-overlay for true black/white */}
                  <div className="absolute inset-0 crt-noise animate-crt opacity-60"></div>
                  <div className="absolute inset-0 crt-overlay opacity-50"></div>
                </div>

                <div className="relative z-30 flex flex-col items-center justify-center p-4 text-center">
                  <UserX size={48} className="mb-2 opacity-50 text-white/50" />
                  <p className="animate-pulse text-white/70 font-mono tracking-widest text-sm md:text-base">
                    SEARCHING FREQUENCY...
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={handleSkip}
              disabled={lobby}
              className={`absolute top-4 right-4 w-12 h-12 rounded-full border-2 border-gray-900 flex items-center justify-center hover:scale-110 transition-transform shadow-md z-20 cursor-pointer hidden md:flex ${
                lobby
                  ? "bg-primary/50 cursor-not-allowed"
                  : "bg-primary"
              }`}
              title="Skip"
            >
              <SkipForward size={20} className="text-gray-900" />
            </button>
            <div className="absolute top-2 left-3 md:top-4 md:left-5 text-black-400 dark:text-black-500 text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-50 z-20">
              {strangerName}
            </div>
          </div>

          {/* Self Feed */}
          <div className="relative flex-1 bg-white dark:bg-dark-surface rounded-2xl md:rounded-3xl border border-gray-200 dark:border-white/5 flex flex-col items-center justify-center overflow-hidden group shadow-lg w-full h-full">
            <video
              autoPlay
              playsInline
              muted
              ref={localVideoRef}
              style={{ filter: videoFilter }}
              className="absolute inset-0 w-full h-full object-cover transform scale-x-[-1]"
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-100/50 dark:from-white/5 to-transparent opacity-50 pointer-events-none"></div>

            <button
              onClick={handleQuit}
              className="absolute top-4 right-4 w-12 h-12 rounded-full border-2 border-gray-900 flex items-center justify-center hover:scale-110 transition-transform shadow-md bg-red-400 z-20 cursor-pointer hidden md:flex"
              title="Quit"
            >
              <X size={20} className="text-gray-900" />
            </button>
            <div className="absolute top-2 left-3 md:top-4 md:left-5 text-gray-400 dark:text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-50 z-20">
              You
            </div>

            {/* Desktop Mic Toggle */}
            <button
              onClick={handleToggleMute}
              className={`absolute bottom-4 right-4 w-12 h-12 rounded-full border-2 border-gray-900 flex items-center justify-center hover:scale-110 transition-transform shadow-md z-20 cursor-pointer hidden md:flex ${
                micOn ? "bg-primary" : "bg-red-400"
              }`}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {micOn ? (
                <Mic size={20} className="text-gray-900" />
              ) : (
                <MicOff size={20} className="text-gray-900" />
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Chat */}
        <div
          className={`lg:col-span-7 flex flex-col gap-3 md:gap-4 flex-1 lg:h-full min-h-0 relative transition-all duration-300 ${
            !isChatOpen ? "hidden lg:flex" : "flex mb-20 lg:mb-0"
          }`}
        >
          {/* Chat History Area */}
          <div className="flex-1 bg-white dark:bg-dark-surface rounded-2xl md:rounded-3xl border border-gray-200 dark:border-white/5 p-4 md:p-6 relative flex flex-col overflow-hidden shadow-lg">
            {/* Close Chat Button - Hidden on Desktop and Mobile (controlled by dock on mobile) */}
            <button
              onClick={() => setIsChatOpen(false)}
              className="absolute top-3 right-3 p-2 bg-gray-100 dark:bg-dark-highlight rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors z-20 hidden"
              title="Close chat"
            >
              <X size={18} className="text-gray-500 dark:text-gray-400" />
            </button>

            <div className="flex-1 overflow-y-auto custom-scroll flex flex-col space-y-3 pr-2 z-10 pt-4">
              {messages.length === 0 && (
                <div className="flex-1 flex items-end justify-center pb-10 text-gray-400 dark:text-gray-600 opacity-50 font-bold text-base md:text-lg italic select-none">
                  {chatReady ? "Start chatting..." : "Connecting to chat..."}
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[85%] md:max-w-[80%] px-3 py-2 md:px-4 md:py-2 rounded-2xl text-xs md:text-sm break-words shadow-sm ${
                    msg.sender === "me"
                      ? "self-end bg-primary text-gray-900 rounded-br-none"
                      : "self-start bg-gray-100 dark:bg-dark-highlight text-gray-800 dark:text-gray-200 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="h-12 md:h-14 shrink-0 bg-white dark:bg-dark-surface rounded-full border border-gray-200 dark:border-white/10 flex items-center px-1 md:px-1.5 shadow-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/50 transition-all duration-200 mb-2 lg:mb-0">
            <input
              className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white text-xs md:text-sm px-3 md:px-4 placeholder-gray-400 dark:placeholder-gray-600 font-mono h-full outline-none disabled:opacity-50"
              placeholder={chatReady ? "type a msg .." : "Connecting..."}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={!chatReady}
            />
            <button
              onClick={handleSend}
              disabled={!chatReady}
              className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center bg-primary text-gray-900 rounded-full hover:bg-white hover:scale-105 active:scale-95 transition-all duration-200 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} className="md:w-5 md:h-5 ml-0.5 mt-0.5" />
            </button>
          </div>
        </div>
      </main>

      {/* Mobile Dock Overlay */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden w-full px-4 flex justify-center pointer-events-none">
        <div className="flex items-center gap-4 px-6 py-2 bg-transparent pointer-events-auto scale-90 sm:scale-100">
          <button
            onClick={handleToggleMute}
            className={`w-12 h-12 rounded-full border-2 border-gray-900 flex items-center justify-center hover:scale-110 transition-transform shadow-md ${
              micOn ? "bg-primary" : "bg-red-400"
            }`}
          >
            {micOn ? (
              <Mic size={20} className="text-gray-900" />
            ) : (
              <MicOff size={20} className="text-gray-900" />
            )}
          </button>
          <button
            onClick={handleSkip}
            disabled={lobby}
            className={`w-12 h-12 rounded-full border-2 border-gray-900 flex items-center justify-center hover:scale-110 transition-transform shadow-md bg-primary ${
              lobby ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <SkipForward size={20} className="text-gray-900" />
          </button>
          <button
            onClick={handleQuit}
            className="w-12 h-12 rounded-full border-2 border-gray-900 flex items-center justify-center hover:scale-110 transition-transform shadow-md bg-red-400"
          >
            <X size={20} className="text-gray-900" />
          </button>
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`w-12 h-12 rounded-full border-2 border-gray-900 flex items-center justify-center hover:scale-110 transition-transform shadow-md ${
              isChatOpen ? "bg-white" : "bg-primary"
            }`}
          >
            <MessageSquare size={20} className="text-gray-900" />
          </button>
        </div>
      </div>

      {/* Floating Open Chat Button (only when chat is closed) - Hidden on Desktop and Mobile */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-20 right-6 md:bottom-28 md:right-8 w-12 h-12 md:w-14 md:h-14 bg-primary text-gray-900 rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 border-2 border-gray-900 hidden"
          title="Open chat"
        >
          <MessageSquare
            size={20}
            className="ml-0.5 mt-0.5 md:w-6 md:h-6"
            strokeWidth={2.5}
          />
        </button>
      )}

      <div className="fixed bottom-2 right-4 text-[10px] text-gray-400 dark:text-gray-600 opacity-40 pointer-events-none hidden lg:block select-none z-0">
        esc to skip
      </div>
    </div>
  );
};
