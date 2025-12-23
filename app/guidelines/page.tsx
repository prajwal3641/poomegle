"use client";

import React, { useEffect } from "react";
import { Coffee, ShieldAlert, UserCheck, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

const Guidelines = () => {
  const router = useRouter();
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-y-auto bg-[#0d0d0d] font-mono text-gray-300">
      <div className="min-h-full flex items-center justify-center p-6">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side: Visual Vibe */}
        <div className="space-y-6">
          <div className="relative group overflow-hidden rounded-[2.5rem]">
            {/* The 'pointer-events-none' div sits on top of the GIF.
               This prevents hover states, clicks, and overlays from the Tenor script.
            */}
            <div className="absolute inset-0 z-20 pointer-events-none"></div>

            <div className="rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl transition-transform duration-500 group-hover:scale-105">
              <div
                className="tenor-gif-embed"
                data-postid="18701848"
                data-share-method="none" // Changed to 'none' to reduce external links
                data-aspect-ratio="1.33333"
                data-width="100%"
              >
                {/* Hidden links for SEO/Script requirements, but effectively invisible */}
                <a
                  className="hidden"
                  href="https://tenor.com/view/mirjapur-attitude-gif-18701848"
                >
                  GIF
                </a>
              </div>
            </div>
          </div>

          <div className="pt-4 px-2">
            <h1 className="text-3xl font-bold text-white tracking-tighter uppercase italic">
              THE <span className="text-[#a38b8b]">UNSPOKEN</span> RULES
            </h1>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              We’re here to chill, not to witness your audition for a villain
              role. Keep the vibe steady.
            </p>
          </div>
        </div>

        {/* Right Side: Simple Rules */}
        <div className="space-y-4">
          <Rule
            icon={<Coffee size={18} />}
            text="If you're here to scream, go to a stadium. Don't be a headache."
          />
          <Rule
            icon={<UserCheck size={18} />}
            text="Eye contact is cool. Creepy staring is weird. Be a normal human."
          />
          <Rule
            icon={<ShieldAlert size={18} />}
            text="Respect the territory. No spamming or unwanted promotion."
          />
          <Rule
            icon={<Zap size={18} />}
            text="One bad joke is fine. Constant toxicity will get you deleted."
          />

          {/* Action Button matching "HOPP IN" style from your image */}
          <button
            onClick={() => {
              router.push("/");
            }}
            className="w-full mt-6 py-4 bg-[#a38b8b] hover:bg-[#b8a1a1] text-[#0d0d0d] rounded-2xl font-black text-xs tracking-[0.2em] uppercase transition-all active:scale-95 shadow-lg shadow-black/40"
          >
            I'll Behave, Mostly
          </button>

          <p className="text-center text-[9px] text-gray-600 uppercase tracking-widest mt-4">
            (Disclaimer: Kaleen Bhaiya is watching, probably.)
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

const Rule = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-4 p-4 bg-[#141414] border border-white/5 rounded-2xl hover:bg-[#1a1a1a] transition-all group">
    <div className="text-gray-500 group-hover:text-[#a38b8b] transition-colors">
      {icon}
    </div>
    <span className="text-xs font-medium tracking-tight group-hover:text-gray-100">
      {text}
    </span>
  </div>
);

export default Guidelines;
