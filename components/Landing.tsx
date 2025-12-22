"use client";
import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, VideoOff, Settings } from "lucide-react";
import { useMediaStream } from "../hooks/useMediaStream";
import { Navbar } from "./Navbar";
import { PaperPlaneBackground } from "./PaperPlaneBackground";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

const FUNNY_QUOTES = [
  "EMI bharni hai ya strangers se eye contact?",
  "Mummy ko bolna padhai kar raha hu 🤫",
  "Rishta wahi, soch nayi... actually kuch nahi",
  "Camera on karle bhai, sharma mat",
  "Engineering li thi, ab yaha hu 🤡",
  "Looking for love? Wrong app bhai.",
  "Network slow hai ya confidence? 💀",
  "Mic on kar, sanata kyu hai bhai? 🎤",
  "Padhai likhai karo, IAS YAS bano... 📚",
  "Bas 5 min aur, phir pakka assignment 😴",
  "Woh stree hai, woh kuch bhi kar sakti hai 💃",
  "Aao kabhi haveli pe 🏰",
  "Ye baburao ka style hai 😎",
  "25 din mein paisa double? 💰",
  "I love you 3000 😘",
  "Beta, career ki soch raha hai? 😂",
  "Mujhe mat chhodo, main akela hoon 😢",
  "Tumse na ho payega 😅",
  "Modi hai to mumkin hai 🇮🇳",
  "Apna time aayega! ⏰",
  "Bhai, ye Zoom nahi hai! 🎥",
  "Kabhi kabhi lagta hai apun hi bhagwan hai 🙏",
  "Chai peene chaloge? ☕",
  "Dil garden garden ho gaya! 🌸",
  "Sonam Gupta bewafa hai! 💔",
];

const FILTERS = [
  "none",
  "grayscale(100%)",
  "sepia(80%)",
  "invert(100%)",
  "contrast(150%)",
  "hue-rotate(90deg)",
];

export const Landing = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const {
    localAudioTrack,
    localVideoTrack,
    isLoading,
    error,
    micOn,
    setMicOn,
    camOn,
    setCamOn,
  } = useMediaStream();

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [filterIndex, setFilterIndex] = useState(0);
  const [showStatic, setShowStatic] = useState(true);
  const [liveUsers, setLiveUsers] = useState<number>(0);

  useEffect(() => {
    if (videoRef.current && localVideoTrack) {
      videoRef.current.srcObject = new MediaStream([localVideoTrack]);
    }
  }, [localVideoTrack]);

  useEffect(() => {
    // Fetch live user count once on mount
    const fetchLiveUsers = async () => {
      try {
        const url =
          process.env.NEXT_PUBLIC_WS_URL || "https://poomegle.onrender.com";
        const res = await fetch(`${url}/live-users`);
        const data = await res.json();
        setLiveUsers(data.count);
      } catch (err) {
        console.error("Failed to fetch live users:", err);
      }
    };
    fetchLiveUsers();
  }, []);

  useEffect(() => {
    // Initial static burst
    setTimeout(() => setShowStatic(false), 800);

    // Random static bursts
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance every 6s
        setShowStatic(true);
        setTimeout(() => setShowStatic(false), 300 + Math.random() * 400); // 300-700ms burst
      }
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Quote rotation
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % FUNNY_QUOTES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleJoin = () => {
    if (name.trim() && !error) {
      // Store name in session storage to keep URL clean
      if (typeof window !== "undefined") {
        sessionStorage.setItem("userName", name.trim());
      }
      router.push("/room");
    }
  };

  const toggleFilter = () => {
    setFilterIndex((prev) => (prev + 1) % FILTERS.length);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-y-auto overflow-x-hidden bg-light-bg dark:bg-dark-bg text-gray-900 dark:text-gray-100 font-mono">

      <PaperPlaneBackground />
      <Navbar liveUsers={liveUsers} />

      <main className="flex-grow flex items-center justify-center p-4 md:p-8 lg:p-12 mt-16 md:mt-0 pb-12 md:pb-16 relative z-10">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          {/* Left Side: Camera Preview */}
          <div className="relative w-full aspect-video md:h-[50vh] max-h-[600px] bg-gray-200 dark:bg-[#121215] rounded-3xl shadow-2xl overflow-hidden border border-gray-300 dark:border-white/10 group mx-auto md:mx-0 lg:max-w-none">
            {/* Name Label */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 text-gray-800 dark:text-gray-200 font-display text-lg md:text-xl z-10 tracking-wider bg-white/30 dark:bg-black/30 backdrop-blur-md px-4 py-1 rounded-full">
              {name || "Your Name"}
            </div>

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none z-10"></div>

            {/* Video Element */}
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              style={{ filter: FILTERS[filterIndex] }}
              className={`absolute inset-0 w-full h-full object-cover transform scale-x-[-1] transition-all duration-300 ${
                camOn ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* CRT Static Overlay (Randomly appears) */}
            {showStatic && (
              <div className="absolute inset-0 z-30 pointer-events-none bg-black/40">
                {/* Stronger opacity for visibility, normal blend mode for B&W */}
                <div className="absolute inset-0 crt-noise animate-crt opacity-70"></div>
                <div className="absolute inset-0 crt-overlay opacity-40"></div>
              </div>
            )}

            {/* Placeholder Icon if Cam Off */}
            {!camOn && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600">
                <VideoOff
                  size={48}
                  className="md:w-16 md:h-16"
                  strokeWidth={1}
                />
              </div>
            )}

            {/* Loading/Error States */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 z-20 text-white">
                Loading Camera...
              </div>
            )}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-900/50 z-20 text-white p-4 text-center">
                {error}
              </div>
            )}

            {/* Controls Bar */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-between items-end px-4 md:px-8 z-20">
              <div className="flex gap-4 md:gap-6 mx-auto pr-12 md:pr-16">
                <button
                  onClick={() => setMicOn(!micOn)}
                  className={`w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-gray-900 flex items-center justify-center hover:scale-110 transition-transform shadow-lg ${
                    micOn ? "bg-primary" : "bg-red-200 dark:bg-red-400/80"
                  }`}
                >
                  {micOn ? (
                    <Mic className="text-gray-900 w-4 h-4 md:w-6 md:h-6" />
                  ) : (
                    <MicOff className="text-gray-900 w-4 h-4 md:w-6 md:h-6" />
                  )}
                </button>
              </div>
              <button
                onClick={toggleFilter}
                className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-primary border-2 border-gray-900 flex items-center justify-center hover:scale-110 transition-transform shadow-lg absolute right-4 md:right-8 bottom-0 cursor-pointer"
              >
                <Settings className="text-gray-900 w-4 h-4 md:w-6 md:h-6" />
              </button>
            </div>
          </div>

          {/* Right Side: CTA */}
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl md:text-5xl font-display text-gray-900 dark:text-white tracking-wide leading-tight mb-6 md:mb-10 mt-2 md:mt-0">
              Ready to join?
            </h1>

            {/* Name Input */}
            <div className="w-full max-w-[200px] md:max-w-xs mb-4">
              <Input
                className="bg-white dark:bg-dark-surface border-gray-300 dark:border-white/10 text-center text-base md:text-lg h-10 md:h-12 rounded-xl"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleJoin()}
              />
            </div>

            <button
              onClick={handleJoin}
              disabled={!name.trim() || !!error}
              className="bg-primary text-gray-900 font-mono text-sm md:text-lg font-bold px-8 py-2.5 md:px-10 md:py-3 rounded-xl border-2 border-transparent hover:border-gray-900 shadow-[0_4px_15px_rgb(0,0,0,0.12)] hover:shadow-[0_6px_20px_rgb(255,200,200,0.4)] hover:-translate-y-1 transition-all duration-200 w-full max-w-[200px] md:max-w-xs active:scale-95 mb-6 md:mb-8 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
            >
              Hopp in
            </button>

            {/* Funny Quote */}
            <div className="h-20 md:h-28 w-full flex items-center justify-center relative">
              <div className="relative w-[90%] md:w-auto md:max-w-md animate-bounce">
                <div className="bg-white dark:bg-dark-highlight border border-gray-200 dark:border-white/10 px-4 py-3 md:px-6 md:py-4 rounded-3xl rounded-bl-none shadow-xl transform rotate-1">
                  <p className="text-xs md:text-base text-gray-800 dark:text-gray-100 font-display leading-snug font-bold break-words">
                    {FUNNY_QUOTES[quoteIndex]}
                  </p>
                </div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 md:w-4 md:h-4 bg-white dark:bg-dark-highlight border-b border-l border-gray-200 dark:border-white/10 transform rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
