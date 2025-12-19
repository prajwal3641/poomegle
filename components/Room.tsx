"use client";

import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { VideoOff, UserX, X, MessageSquare } from "lucide-react";
import { Navbar } from "./Navbar";
import { useRouter } from "next/navigation";

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

  // -- Chat State --
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatReady, setChatReady] = useState(false);

  const [liveUsers, setLiveUsers] = useState(0);

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
    resetConnection("skip");
  };

  const handleQuit = () => {
    socket?.emit("reset", { type: "quit" });
    socket?.disconnect();
    resetConnection("quit");
    window.location.reload();
  };

  function resetConnection(type: "skip" | "quit" | "lobby") {
    console.log("Resetting connection...");
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
    setIsChatOpen(true);
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
    const s = io(URL);
    setSocket(s);

    s.on("lobby", () => resetConnection("lobby"));

    s.on(
      "send-offer",
      async ({ roomId, role }: { roomId: string; role?: Role }) => {
        setLobby(false);
        const r = role ?? "offerer";
        setRole(r);
        roomIdRef.current = roomId;
        const pc = ensurePc(s, r);
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        s.emit("offer", { sdp: pc.localDescription, roomId });
      }
    );

    s.on("wait-offer", ({ roomId, role }: { roomId: string; role?: Role }) => {
      setLobby(false);
      const r = role ?? "answerer";
      setRole(r);
      roomIdRef.current = roomId;

      // Create PC and attach tracks, but do not create offer.
      ensurePc(s, r);
    });

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

    s.on("reset-requested", () => {
      console.log("Reset requested by server");
      resetConnection("skip");
    });

    s.on("live-users", ({ count }: { count: number }) => {
      console.log("Live users:", count);
      setLiveUsers(count);
    });

    return () => {
      s.off("lobby");
      s.off("reset-requested");
      s.off("live-users");
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
  }, [name, localAudioTrack, localVideoTrack]);

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
      <Navbar liveUsers={liveUsers} />

      <main
        className={`flex-grow w-full max-w-[1800px] mx-auto p-4 md:p-6 pb-6 md:pb-6 px-6 flex flex-col lg:grid lg:grid-cols-12 gap-4 md:gap-6 min-h-0 pt-20 md:pt-24 relative z-10 transition-all duration-300`}
      >
        {/* Left Column: Video Feeds */}
        <div
          className={`
            gap-3 md:gap-4 shrink-0 
            transition-all duration-300 
            ${
              isChatOpen
                ? "flex flex-row lg:flex-col lg:col-span-5 h-[25vh] md:h-[30vh] lg:h-full" // Mobile: Horizontal when chat open
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
              className="absolute top-2 right-2 md:top-4 md:right-4 bg-white/80 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white px-3 py-1 md:px-5 md:py-2 rounded-full hover:bg-gray-100 dark:hover:bg-white dark:hover:text-black transition-all duration-200 font-bold text-xs md:text-sm shadow-sm z-20 cursor-pointer"
            >
              skip
            </button>
            <div className="absolute bottom-2 left-3 md:bottom-4 md:left-5 text-gray-400 dark:text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-50 z-20">
              Stranger
            </div>
          </div>

          {/* Self Feed */}
          <div className="relative flex-1 bg-white dark:bg-dark-surface rounded-2xl md:rounded-3xl border border-gray-200 dark:border-white/5 flex flex-col items-center justify-center overflow-hidden group shadow-lg w-full h-full">
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
            <div className="absolute bottom-2 left-3 md:bottom-4 md:left-5 text-gray-400 dark:text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-50 z-20">
              You
            </div>
          </div>
        </div>

        {/* Right Column: Chat */}
        <div
          className={`lg:col-span-7 flex flex-col gap-3 md:gap-4 flex-1 lg:h-full min-h-0 relative transition-all duration-300 ${
            !isChatOpen ? "hidden lg:flex" : "flex"
          }`}
        >
          {/* Chat History Area */}
          <div className="flex-1 bg-white dark:bg-dark-surface rounded-2xl md:rounded-3xl border border-gray-200 dark:border-white/5 p-4 md:p-6 relative flex flex-col overflow-hidden shadow-lg">
            {/* Close Chat Button - Hidden on Desktop */}
            <button
              onClick={() => setIsChatOpen(false)}
              className="absolute top-3 right-3 p-2 bg-gray-100 dark:bg-dark-highlight rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors z-20 lg:hidden"
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
                  className={`max-w-[85%] md:max-w-[80%] px-3 py-2 md:px-4 md:py-2.5 rounded-2xl text-sm md:text-base break-words shadow-sm ${
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
          <div className="h-12 md:h-16 shrink-0 bg-white dark:bg-dark-surface rounded-full border border-gray-200 dark:border-white/10 flex items-center px-1.5 md:px-2 shadow-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/50 transition-all duration-200 mb-2 lg:mb-0">
            <input
              className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white text-sm md:text-lg px-4 md:px-6 placeholder-gray-400 dark:placeholder-gray-600 font-mono h-full outline-none disabled:opacity-50"
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
              className="mr-0.5 md:mr-1 bg-primary text-gray-900 font-bold text-xs md:text-sm hover:bg-white hover:scale-105 active:scale-95 px-4 py-2 md:px-6 md:py-2.5 rounded-full transition-all duration-200 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
            >
              send
            </button>
          </div>
        </div>
      </main>

      {/* Floating Open Chat Button (only when chat is closed) - Hidden on Desktop */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-20 right-6 md:bottom-28 md:right-8 w-12 h-12 md:w-14 md:h-14 bg-primary text-gray-900 rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 border-2 border-gray-900 lg:hidden"
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
