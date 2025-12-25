/**
 * Help Page - Webcam/Audio Issues
 * Target keywords: "Pomegle webcam fix"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, ArrowLeft, Video, Mic } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `How to Fix Webcam/Audio Issues on ${BRAND.name}`,
  description: `Troubleshooting guide for webcam and microphone problems on ${BRAND.name}. Fix camera and audio issues quickly.`,
  keywords: ["Pomegle webcam fix", "video chat camera not working", "microphone not working"],
  path: "/help/webcam-fix",
});

const FAQS = [
  {
    question: "My webcam isn't working on Pomegle. How do I fix it?",
    answer: "Check if your camera is connected and not being used by another app. Grant camera permissions in your browser settings, refresh the page, and make sure no other applications are using your camera.",
  },
  {
    question: "My microphone isn't working. What should I do?",
    answer: "Check your browser's microphone permissions, make sure your microphone isn't muted, ensure no other apps are using it, and check your system's audio settings.",
  },
];

export default function WebcamFixPage() {
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <FAQJsonLd faqs={FAQS} />
      
      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="text-2xl font-display tracking-wide -rotate-2 hover:rotate-0 transition-transform">
          {BRAND.name.toUpperCase()}
        </Link>
        <Link href="/help" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Help
        </Link>
      </nav>

      {/* Hero */}
      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 text-primary mb-6">
          <Video className="w-5 h-5" />
          <span className="text-sm uppercase tracking-widest">Technical Help</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          Webcam & Audio Issues
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Fix camera and microphone problems quickly.
        </p>
      </section>

      {/* Camera Fixes */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Video className="w-6 h-6 text-primary" />
            Camera Not Working?
          </h2>
          <div className="space-y-4">
            {[
              "Grant camera permissions when your browser asks",
              "Check if your camera is connected and working (try it in another app)",
              "Close other apps that might be using your camera",
              "Refresh the page and allow camera access again",
              "Check browser settings to ensure camera permissions are enabled",
              "Try a different browser if the problem persists",
            ].map((tip, i) => (
              <div key={i} className="p-4 bg-[#141414] rounded-xl border border-white/5">
                <p className="text-gray-300">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Microphone Fixes */}
      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Mic className="w-6 h-6 text-primary" />
            Microphone Not Working?
          </h2>
          <div className="space-y-4">
            {[
              "Grant microphone permissions in your browser",
              "Check if your microphone is muted in system settings",
              "Make sure no other apps are using your microphone",
              "Test your microphone in system settings or another app",
              "Check browser settings to ensure microphone access is allowed",
              "Try refreshing the page and allowing microphone access again",
            ].map((tip, i) => (
              <div key={i} className="p-4 bg-[#141414] rounded-xl border border-white/5">
                <p className="text-gray-300">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 border-t border-white/5">
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

      {/* CTA */}
      <section className="px-6 py-16 border-t border-white/5 text-center">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Try {BRAND.name} <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/5 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} {BRAND.name}</p>
      </footer>
    </div>
  );
}

