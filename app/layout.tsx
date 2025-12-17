import type { Metadata } from "next";
import { Gochi_Hand, Space_Mono } from "next/font/google";
import "./globals.css";
// DarkModeToggle is now integrated into the Navbar, so we don't need it globally floating anymore.
// We remove the import and usage here.

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
        {children}
      </body>
    </html>
  );
}
