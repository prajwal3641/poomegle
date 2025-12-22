"use client";

import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    // Check localStorage first, then system preference
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      setIsDark(true);
    } else if (stored === 'light') {
      setIsDark(false);
    } else {
        // Default to dark if nothing stored
        setIsDark(true);
    }
  }, []);

  useEffect(() => {
    if (isDark === null) return;

    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  if (isDark === null) return null; // Avoid hydration mismatch or flash

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 sm:p-2.5 md:p-2.5 rounded-full bg-white/50 dark:bg-dark-highlight/50 backdrop-blur-sm border border-gray-200 dark:border-white/5 shadow-sm hover:scale-105 transition-all text-gray-800 dark:text-gray-200"
      aria-label="Toggle Theme"
    >
      {isDark ? <Sun className="w-5 h-5 sm:w-5 sm:h-5 md:w-5 md:h-5" /> : <Moon className="w-5 h-5 sm:w-5 sm:h-5 md:w-5 md:h-5" />}
    </button>
  );
};
