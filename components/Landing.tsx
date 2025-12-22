"use client";
import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Video, VideoOff, Settings } from "lucide-react";
import { useMediaStream } from "../hooks/useMediaStream";
import { Navbar } from "./Navbar";
import { PaperPlaneBackground } from "./PaperPlaneBackground";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

const FUNNY_QUOTES = [
  "Network slow hai ya confidence? 💀 Chill kar, tu bas relax ho!",
  "Mummy ko bolna padhai kar raha hu 🤫",
  "Camera on karle bhai, sharma mat. First impression is last!",
  "Engineering li thi, ab yaha hu 🤡",
  "Mic on kar, sanata kyu hai bhai? 🎤 Awaaz nikal!",
  "Padhai likhai karo, IAS YAS bano... 📚",
  "Bas 5 min aur, phir pakka assignment 😴",
  "Chai peene chaloge? ☕ Virtual chai works too!",
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
    setTimeout(() => setShowStatic(false), 800);

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setShowStatic(true);
        setTimeout(() => setShowStatic(false), 300 + Math.random() * 400);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % FUNNY_QUOTES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleJoin = () => {
    if (name.trim() && !error) {
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
    <div className="h-[100dvh] flex flex-col relative overflow-hidden bg-[#FAF9F6] dark:bg-[#0D0D0D] text-gray-900 dark:text-gray-100 font-mono">
      <PaperPlaneBackground />

      <Navbar liveUsers={liveUsers} />

      <main className="flex-1 flex flex-col justify-center px-4 py-2 md:px-8 md:py-8 lg:px-12 mt-14 sm:mt-16 md:mt-20 relative z-10 overflow-hidden">
        {/* Mobile: flex-col, Desktop: CSS Grid for equal height columns */}
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-[55fr_45fr] gap-2 sm:gap-3 md:gap-8 lg:gap-16 items-center">
          
          {/* Left Side: Camera Preview */}
          <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-none mx-auto">
            {/* Video Container - vertical on mobile, landscape on desktop */}
            <div className="relative w-full aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:h-[420px] bg-gray-200 dark:bg-[#121215] rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-gray-300 dark:border-white/10">
              {/* Name Label */}
              <div className="absolute top-3 left-3 md:top-4 md:left-4 text-gray-800 dark:text-gray-200 font-display text-sm md:text-lg z-10 tracking-wider bg-white/30 dark:bg-black/40 backdrop-blur-md px-3 py-0.5 md:px-4 md:py-1 rounded-full">
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

              {/* CRT Static Overlay */}
              {showStatic && (
                <div className="absolute inset-0 z-30 pointer-events-none bg-black/40">
                  <div className="absolute inset-0 crt-noise animate-crt opacity-70"></div>
                  <div className="absolute inset-0 crt-overlay opacity-40"></div>
                </div>
              )}

              {/* Placeholder Icon if Cam Off */}
              {!camOn && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600">
                  <VideoOff size={40} className="md:w-14 md:h-14" strokeWidth={1} />
                </div>
              )}

              {/* Loading/Error States */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 z-20 text-white text-sm">
                  Loading Camera...
                </div>
              )}
              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-900/50 z-20 text-white p-4 text-center text-sm">
                  {error}
                </div>
              )}

              {/* Controls Bar */}
              <div className="absolute bottom-3 md:bottom-4 left-0 right-0 flex justify-center items-center gap-3 md:gap-4 z-20">
                <button
                  onClick={() => setMicOn(!micOn)}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-900 flex items-center justify-center hover:scale-110 transition-transform shadow-lg ${
                    micOn ? "bg-primary" : "bg-red-200 dark:bg-red-400/80"
                  }`}
                >
                  {micOn ? (
                    <Mic className="text-gray-900 w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    <MicOff className="text-gray-900 w-4 h-4 md:w-5 md:h-5" />
                  )}
                </button>
                <button
                  onClick={toggleFilter}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary border-2 border-gray-900 flex items-center justify-center hover:scale-110 transition-transform shadow-lg cursor-pointer"
                >
                  <Settings className="text-gray-900 w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>

            {/* Status Indicators - Removed as requested */}
          </div>

          {/* Right Side: Join Section */}
          <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-none mx-auto">
            {/* Card wrapper - only styled on desktop, matches video height */}
            <div className="w-full lg:h-[420px] lg:bg-white/80 lg:dark:bg-dark-surface/90 lg:backdrop-blur-md lg:rounded-3xl lg:border lg:border-gray-200 lg:dark:border-white/10 px-0 lg:p-10 lg:shadow-xl flex flex-col justify-center">
              {/* Heading */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-display text-gray-900 dark:text-white tracking-wide leading-tight mb-0.5 sm:mb-1 md:mb-3 text-center lg:text-left">
                Ready to join?
              </h1>
              <p className="text-sm sm:text-base md:text-base text-gray-600 dark:text-gray-400 mb-2 sm:mb-4 md:mb-6 text-center lg:text-left">
                Join a random video chat and start talking.
              </p>

              {/* Name Input */}
              <div className="w-full mb-2 sm:mb-3 md:mb-4">
                <Input
                  className="bg-white dark:bg-dark-highlight border-gray-300 dark:border-white/10 text-center text-base sm:text-lg md:text-base h-10 sm:h-11 md:h-12 rounded-lg sm:rounded-xl w-full"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => {
                    if (e.target.value.length <= 15) setName(e.target.value);
                    else setName(e.target.value.slice(0, 15));
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleJoin()}
                />
              </div>

              {/* Join Button */}
              <button
                onClick={handleJoin}
                disabled={!name.trim() || !!error}
                className="bg-primary text-gray-900 font-mono text-base sm:text-lg md:text-base font-bold px-5 py-2.5 sm:py-3 md:py-3 rounded-lg sm:rounded-xl border-2 border-transparent hover:border-gray-900 shadow-[0_4px_15px_rgb(0,0,0,0.12)] hover:shadow-[0_6px_20px_rgb(255,200,200,0.4)] hover:-translate-y-1 transition-all duration-200 w-full active:scale-95 mb-2 sm:mb-3 md:mb-5 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
              >
                Hopp in
              </button>

              {/* Terms - always visible */}
              <p className="text-xs sm:text-sm md:text-sm text-gray-500 dark:text-gray-400 text-center lg:text-left">
                By joining, you agree to our{" "}
                <a href="#" className="underline hover:text-gray-700 dark:hover:text-gray-300">terms and community guidelines</a>.
              </p>

              {/* Tip Box - Hidden on mobile, visible from md breakpoint */}
              <div className="hidden md:flex mt-auto bg-gray-100 dark:bg-dark-highlight/80 rounded-xl md:rounded-2xl px-4 md:px-5 border border-gray-200 dark:border-white/5 h-[76px] md:h-[80px] items-center justify-center lg:justify-start text-center lg:text-left overflow-hidden flex-shrink-0 md:mt-6">
                <p className="text-sm md:text-sm text-gray-600 dark:text-gray-300 font-medium leading-snug line-clamp-2">
                  {FUNNY_QUOTES[quoteIndex]}
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};
