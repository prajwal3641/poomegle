/**
 * SEO Page - How Does Pomegle Work
 * Target keywords: "how Pomegle works"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/lib/seo/structured-data";
import { Footer } from "@/components/Footer";
import { ArrowRight, Server, Globe, Zap } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `How Does ${BRAND.name} Work? (Technology Behind Random Chat)`,
  description: `Learn how ${BRAND.name} works. The technology and process behind random video chat connections and how we match you with strangers.`,
  keywords: ["how Pomegle works", "how does Pomegle work", "random video chat technology"],
  path: "/how-does-pomegle-work",
});

const FAQS = [
  {
    question: "How does Pomegle work?",
    answer: `${BRAND.name} uses WebRTC technology to connect you with random strangers via video. When you click start, you're matched with another user looking for a chat. The connection is peer-to-peer through your browsers.`,
  },
  {
    question: "What technology does Pomegle use?",
    answer: `${BRAND.name} uses WebRTC (Web Real-Time Communication) for video/audio streaming, WebSocket for signaling, and a matching server to pair users. Everything runs in your browser - no app download needed.`,
  },
  {
    question: "How are users matched on Pomegle?",
    answer: "When you click start, our server finds another user who is also looking for a chat using our random match algorithm. You're matched instantly - typically within 2-3 seconds - with anyone from anywhere in the world who's online at that moment. The matching is completely random.",
  },
  {
    question: "What browsers are compatible with Pomegle?",
    answer: `${BRAND.name} works on all modern browsers including Chrome, Firefox, Safari, and Edge. We also support mobile web browsers, so you can use it on smartphones and tablets without downloading an app.`,
  },
  {
    question: "How does the random match algorithm work?",
    answer: "Our random match algorithm connects you with another user who is also online and looking for a chat. The matching is instant and completely random - you could be connected with anyone from anywhere in the world. The algorithm prioritizes fast connections and connection stability.",
  },
  {
    question: "Does Pomegle work on mobile?",
    answer: "Yes, {BRAND.name} has full mobile web support. You can use it on smartphones and tablets through your mobile browser - no app download required. Just visit the website and allow camera and microphone access.",
  },
];

export default function HowDoesPomegleWorkPage() {
  const pageUrl = `${BRAND.url}/how-does-pomegle-work`;
  
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <FAQJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BRAND.url },
          { name: "How Does Pomegle Work", url: pageUrl },
        ]}
      />
      
      <nav className="px-6 py-5 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="text-2xl font-display tracking-wide -rotate-2 hover:rotate-0 transition-transform">
          {BRAND.name.toUpperCase()}
        </Link>
        <Link href="/" className="bg-primary text-gray-900 font-bold text-sm px-4 py-2 rounded-lg hover:scale-105 transition-transform">
          Start Chat
        </Link>
      </nav>

      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          How Does {BRAND.name} Work?
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          The technology behind random video chat connections.
        </p>
      </section>

      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <Server className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold">1. The Matching Process</h2>
            </div>
            <p className="text-gray-400">
              When you click "Start Chatting", your browser sends a signal to our servers. Our random match algorithm finds another user 
              who's also looking for a conversation and pairs you together instantly. The matching happens in real-time - typically within 
              2-3 seconds - using our optimized server infrastructure to minimize latency and ensure connection stability.
            </p>
          </div>

          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold">2. WebRTC Connection</h2>
            </div>
            <p className="text-gray-400">
              Once matched, your browsers establish a direct peer-to-peer connection using WebRTC (Web Real-Time Communication). 
              This allows video and audio to stream directly between you and the other person - no data passes through our servers. 
              The peer-to-peer connection provides better performance, lower latency, and optimized bandwidth usage compared to 
              server-relayed connections.
            </p>
          </div>

          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold">3. Real-Time Communication</h2>
            </div>
            <p className="text-gray-400">
              Video and audio stream in real-time through the WebRTC connection with end-to-end communication. Everything happens in your browser - 
              no plugins or downloads required. The connection is encrypted for security. Our bandwidth optimization ensures smooth streaming 
              even on slower connections, and connection stability monitoring helps maintain quality throughout your chat session.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Key Technologies</h2>
          <div className="space-y-4 text-gray-400">
            <p>
              <strong className="text-white">WebRTC:</strong> Industry standard for real-time video/audio communication in browsers. 
              Used by Google Meet, Discord, and other major platforms.
            </p>
            <p>
              <strong className="text-white">WebSocket:</strong> Enables real-time signaling between your browser and our servers 
              for matching and connection setup.
            </p>
            <p>
              <strong className="text-white">Peer-to-Peer Connection:</strong> Video/audio streams directly between users, not through servers. 
              This provides better performance, lower server latency, and optimized bandwidth usage.
            </p>
            <p>
              <strong className="text-white">Browser Compatibility:</strong> Works on all modern browsers including Chrome, Firefox, Safari, and Edge. 
              Mobile web support means it works on smartphones and tablets without app downloads.
            </p>
            <p>
              <strong className="text-white">Camera & Microphone Access:</strong> Your browser will request permission to access your camera and microphone. 
              This is required for video chat functionality and is handled securely by your browser.
            </p>
            <p>
              <strong className="text-white">Connection Stability:</strong> Our system monitors connection quality and automatically adjusts to maintain 
              stable video and audio streams throughout your session.
            </p>
            <p>
              <strong className="text-white">HTTPS/WSS:</strong> All connections are encrypted to protect your privacy and security. 
              End-to-end communication ensures your data stays private.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Privacy & Security</h2>
          <div className="space-y-4 text-gray-400">
            <p>
              Your video and audio never pass through our servers - they go directly to the other person. 
              We only facilitate the initial connection.
            </p>
            <p>
              We don't store your conversations, record video, or save chat logs. Once you disconnect, the data is gone.
            </p>
            <p>
              No registration means we don't collect personal information. You remain anonymous throughout your session.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">FAQ</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="p-5 bg-[#141414] rounded-xl border border-white/5">
                <h3 className="font-medium mb-2">{faq.question}</h3>
                <p className="text-sm text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 border-t border-white/5 text-center">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Try {BRAND.name} <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <Footer />
    </div>
  );
}

