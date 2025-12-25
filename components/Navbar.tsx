"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar: React.FC<{ liveUsers?: number }> = ({ liveUsers }) => {
  const router = useRouter();
  const [animateStat, setAnimateStat] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateStat(true);
      setTimeout(() => setAnimateStat(false), 1000);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="w-full px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-4 flex justify-between items-center z-20 absolute top-0 left-0 bg-transparent pointer-events-none">
      {/* Logo - Pomegle Brand */}
      <div
        onClick={() => router.push("/")}
        className="pointer-events-auto text-2xl sm:text-[1.75rem] md:text-3xl font-display tracking-wide transform -rotate-2 select-none cursor-pointer hover:rotate-0 transition-transform text-gray-900 dark:text-white"
        aria-label="Pomegle - Home"
      >
        POMEGLE
      </div>
      
      {/* Right side controls */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 pointer-events-auto">
        {/* Users online badge */}
        <div
          className={`flex items-center gap-1.5 sm:gap-2 bg-white/50 dark:bg-dark-highlight/50 backdrop-blur-sm px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-full border border-gray-200 dark:border-white/5`}
        >
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 shrink-0 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-gray-900 dark:text-gray-100 text-xs sm:text-sm md:text-sm font-mono tracking-tight whitespace-nowrap">
            {liveUsers ? liveUsers.toLocaleString() : 0} users online
          </span>
        </div>
        
        {/* Theme toggle */}
        <ThemeToggle />
      </div>
    </nav>
  );
};
