import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar: React.FC<{ liveUsers?: number }> = ({ liveUsers }) => {
  const router = useRouter();
  const [animateStat, setAnimateStat] = useState(false);

  useEffect(() => {
    // Animate stats every 6 seconds
    const interval = setInterval(() => {
      setAnimateStat(true);
      setTimeout(() => setAnimateStat(false), 1000);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="w-full p-3 md:p-6 flex justify-between items-center z-20 absolute top-0 left-0 bg-transparent pointer-events-none">
      <div
        onClick={() => router.push("/")}
        className="pointer-events-auto text-2xl md:text-5xl font-display tracking-wide transform -rotate-2 select-none cursor-pointer hover:rotate-0 transition-transform text-gray-900 dark:text-white"
      >
        LOOP
      </div>
      <div className="flex items-center gap-2 md:gap-4 pointer-events-auto">
        <div
          className={`flex items-center gap-2 bg-white/50 dark:bg-dark-highlight/50 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1.5 rounded-full border border-gray-200 dark:border-white/5`}
        >
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 shrink-0 rounded-full bg-neon"></div>
          <div
            className={`text-green-700 dark:text-neon text-[10px] md:text-sm font-bold tracking-tight truncate ${
              animateStat ? "animate-rubber" : ""
            }`}
          >
            {liveUsers || 0} unemployed online
          </div>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
};
