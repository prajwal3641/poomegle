import type { Metadata } from "next";
import { Gochi_Hand, Space_Mono } from "next/font/google";
import "./globals.css";
// DarkModeToggle is now integrated into the pages or components, but the layout wraps everything.
// The new design has ThemeToggle inside the pages, but maybe we should keep it global if it's in App.tsx in the source.
// Source App.tsx has ThemeToggle outside Routes. So I should keep it here.
import { ThemeToggle } from "../components/ThemeToggle";

const gochiHand = Gochi_Hand({
  variable: "--font-gochi-hand",
  weight: "400",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LOOP",
  description: "Video Chat App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gochiHand.variable} ${spaceMono.variable} antialiased bg-light-bg dark:bg-dark-bg text-gray-900 dark:text-gray-100 transition-colors duration-300 font-mono overflow-hidden`}
      >
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
