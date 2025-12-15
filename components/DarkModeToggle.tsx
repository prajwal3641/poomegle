"use client"
import { useEffect, useState } from "react";

export const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        // Check for saved preference or system preference
        const saved = localStorage.getItem('darkMode')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setDarkMode(saved ? saved === 'true' : prefersDark)
    }, [])

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        localStorage.setItem('darkMode', String(darkMode))
    }, [darkMode])

    return (
        <button 
            onClick={() => setDarkMode(!darkMode)}
            className="fixed top-4 right-4 z-50 p-2 rounded-full bg-secondary hover:bg-accent transition-colors"
            aria-label="Toggle dark mode"
        >
            {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
            )}
        </button>
    )
}

