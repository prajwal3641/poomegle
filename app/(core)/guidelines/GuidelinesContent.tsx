"use client";

import React, { useEffect } from "react";
import { Coffee, ShieldAlert, UserCheck, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { BRAND } from "@/lib/seo";

const GuidelinesContent = () => {
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
                data-share-method="none"
                data-aspect-ratio="1.33333"
                data-width="100%"
              >
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
              We&apos;re here to chill, not to witness your audition for a villain
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

          {/* Action Button */}
          <button
            onClick={() => {
              router.push("/");
            }}
            className="w-full mt-6 py-4 bg-[#a38b8b] hover:bg-[#b8a1a1] text-[#0d0d0d] rounded-2xl font-black text-xs tracking-[0.2em] uppercase transition-all active:scale-95 shadow-lg shadow-black/40"
          >
            I&apos;ll Behave, Mostly
          </button>

          <p className="text-center text-[9px] text-gray-600 uppercase tracking-widest mt-4">
            (Disclaimer: Kaleen Bhaiya is watching, probably.)
          </p>

          {/* Age Restrictions & Safety Notice */}
          <div className="mt-6 p-4 bg-primary/20 border border-primary/50 rounded-2xl">
            <p className="text-xs font-bold text-white mb-2 uppercase tracking-wider">
              Age Restrictions & Safety
            </p>
            <p className="text-[10px] text-gray-300 leading-relaxed">
              {BRAND.name} is intended for users <strong>18 years and older</strong>. We use NSFW filtering technology 
              and content moderation, but random video chat platforms may still expose users to inappropriate content. 
              Parental guidance is strongly recommended for younger users. Use block and report features immediately 
              if you encounter inappropriate content.
            </p>
          </div>
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

export default GuidelinesContent;

