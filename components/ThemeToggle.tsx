"use client";

import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check system preference or default to dark
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed bottom-3 right-3 md:bottom-6 md:right-6 z-50 p-2 md:p-3 rounded-full bg-light-surface dark:bg-dark-surface border border-gray-300 dark:border-gray-800 shadow-lg hover:scale-105 transition-all text-gray-800 dark:text-gray-200"
      aria-label="Toggle Theme"
    >
      {isDark ? <Sun className="w-4 h-4 md:w-5 md:h-5" /> : <Moon className="w-4 h-4 md:w-5 md:h-5" />}
    </button>
  );
};
