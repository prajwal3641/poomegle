"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Video, VideoOff, Settings } from 'lucide-react';
import { Navbar } from './Navbar';
import { PaperPlaneBackground } from './PaperPlaneBackground';
import { Room } from './Room';
import { Input } from './ui/input'; // Using existing shadcn input
import { Button } from './ui/button'; // Using existing shadcn button (maybe, or use new design's button)

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
  "Control Uday, Control. 😤",
  "Aao kabhi haveli pe 🏰",
  "Ye baburao ka style hai 😎",
  "25 din mein paisa double? 💰",
  "Jal lijiye, thak gaye honge scroll karke 🥤"
];

const FILTERS = [
    'none',
    'grayscale(100%)',
    'sepia(80%)',
    'invert(100%)',
    'contrast(150%)',
    'hue-rotate(90deg)'
];

export const Landing = () => {
    // State from existing Landing
    const [name, setName] = useState("")
    const [joined, setJoined] = useState(false)
    const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>(null)
    const [localVideoTrack, setLocalVideoTrack] = useState<MediaStreamTrack | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const videoRef = useRef<HTMLVideoElement | null>(null)

    // State from new Lobby
    const [micOn, setMicOn] = useState(true) // Default true to match existing behavior (getCam gets both)
    const [camOn, setCamOn] = useState(true) // Default true
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [filterIndex, setFilterIndex] = useState(0);

    const getCam = async () => {
        try {
            const stream = await window.navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            })
            const audioTrack = stream.getAudioTracks()[0]
            const videoTrack = stream.getVideoTracks()[0]
            setLocalAudioTrack(audioTrack)
            setLocalVideoTrack(videoTrack)
            if (videoRef.current) {
                videoRef.current.srcObject = new MediaStream([videoTrack])
            }
            setIsLoading(false)
        } catch (err) {
            console.error("Camera error:", err)
            setError("Camera access denied")
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getCam()
    }, [])

    useEffect(() => {
        // Update track enabled state when UI toggles change
        if (localAudioTrack) {
            localAudioTrack.enabled = micOn;
        }
        if (localVideoTrack) {
            localVideoTrack.enabled = camOn;
        }
    }, [micOn, camOn, localAudioTrack, localVideoTrack]);

    useEffect(() => {
        // Quote rotation
        const interval = setInterval(() => {
            setQuoteIndex((prev) => (prev + 1) % FUNNY_QUOTES.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const handleJoin = () => {
        if (name.trim() && !error) {
            setJoined(true);
        }
    };

    const toggleFilter = () => {
        setFilterIndex((prev) => (prev + 1) % FILTERS.length);
    };

    if (joined) {
        return (
            <Room 
                name={name} 
                localAudioTrack={localAudioTrack} 
                localVideoTrack={localVideoTrack}
            />
        )
    }

    return (
        <div className="min-h-screen flex flex-col relative overflow-y-auto overflow-x-hidden bg-light-bg dark:bg-dark-bg text-gray-900 dark:text-gray-100 font-mono">
            <PaperPlaneBackground />
            <Navbar />
            
            <main className="flex-grow flex items-center justify-center p-4 md:p-8 lg:p-12 mt-16 md:mt-0 pb-24 md:pb-24 relative z-10">
                <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-24 items-center">
                
                {/* Left Side: Camera Preview */}
                <div className="relative w-full h-[45vh] md:h-[60vh] max-h-[700px] bg-gray-200 dark:bg-[#121215] rounded-3xl shadow-2xl overflow-hidden border border-gray-300 dark:border-white/10 group mx-auto md:mx-0 lg:max-w-none">
                    {/* Name Label */}
                    <div className="absolute top-4 left-4 md:top-6 md:left-6 text-gray-800 dark:text-gray-200 font-display text-lg md:text-2xl z-10 tracking-wider bg-white/30 dark:bg-black/30 backdrop-blur-md px-4 py-1 rounded-full">
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
                        className={`absolute inset-0 w-full h-full object-cover transform scale-x-[-1] transition-all duration-300 ${camOn ? 'opacity-100' : 'opacity-0'}`}
                    />

                    {/* Placeholder Icon if Cam Off */}
                    {!camOn && (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600">
                            <VideoOff size={60} className="md:w-20 md:h-20" strokeWidth={1} />
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
                    <div className="absolute bottom-4 left-0 right-0 flex justify-between items-end px-4 md:px-10 z-20">
                        <div className="flex gap-4 md:gap-6 mx-auto pr-12 md:pr-16"> 
                            <button 
                                onClick={() => setMicOn(!micOn)}
                                className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-gray-900 flex items-center justify-center hover:scale-110 transition-transform shadow-lg ${micOn ? 'bg-primary' : 'bg-red-200 dark:bg-red-400/80'}`}
                            >
                                {micOn ? <Mic className="text-gray-900 w-5 h-5 md:w-7 md:h-7" /> : <MicOff className="text-gray-900 w-5 h-5 md:w-7 md:h-7" />}
                            </button>
                            <button 
                                onClick={() => setCamOn(!camOn)}
                                className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-gray-900 flex items-center justify-center hover:scale-110 transition-transform shadow-lg ${camOn ? 'bg-primary' : 'bg-red-200 dark:bg-red-400/80'}`}
                            >
                                {camOn ? <Video className="text-gray-900 w-5 h-5 md:w-7 md:h-7" /> : <VideoOff className="text-gray-900 w-5 h-5 md:w-7 md:h-7" />}
                            </button>
                        </div>
                        <button 
                            onClick={toggleFilter}
                            className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary border-2 border-gray-900 flex items-center justify-center hover:scale-110 transition-transform shadow-lg absolute right-4 md:right-10 bottom-0 cursor-pointer"
                        >
                            <Settings className="text-gray-900 w-5 h-5 md:w-7 md:h-7" />
                        </button>
                    </div>
                </div>

                {/* Right Side: CTA */}
                <div className="flex flex-col items-center justify-center text-center">
                    
                    <h1 className="text-3xl md:text-6xl font-display text-gray-900 dark:text-white tracking-wide leading-tight mb-6 md:mb-12 mt-2 md:mt-0">
                        Ready to join
                    </h1>
                    
                    {/* Name Input */}
                    <div className="w-full max-w-[200px] md:max-w-xs mb-4">
                        <Input 
                            className="bg-white dark:bg-dark-surface border-gray-300 dark:border-white/10 text-center text-lg h-12 rounded-xl"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                        />
                    </div>

                    <button 
                        onClick={handleJoin}
                        disabled={!name.trim() || !!error}
                        className="bg-primary text-gray-900 font-mono text-sm md:text-xl font-bold px-10 py-3 md:px-12 md:py-4 rounded-xl border-2 border-transparent hover:border-gray-900 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(255,200,200,0.4)] hover:-translate-y-2 transition-all duration-200 w-full max-w-[200px] md:max-w-xs active:scale-95 mb-6 md:mb-10 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Hopp in
                    </button>
                    
                    {/* Funny Quote */}
                    <div className="h-24 md:h-32 w-full flex items-center justify-center relative">
                        <div className="relative w-[90%] md:w-auto md:max-w-md animate-bounce">
                            <div className="bg-white dark:bg-dark-highlight border border-gray-200 dark:border-white/10 px-4 py-3 md:px-6 md:py-4 rounded-3xl rounded-bl-none shadow-xl transform rotate-1">
                                <p className="text-sm md:text-xl text-gray-800 dark:text-gray-100 font-display leading-snug font-bold break-words">
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
