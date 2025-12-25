/**
 * Help Page - Browser Compatibility
 * Target keywords: "Pomegle browser compatibility"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/lib/seo/structured-data";
import { Footer } from "@/components/Footer";
import { ArrowRight, ArrowLeft, Monitor, Smartphone } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `Browser Compatibility - ${BRAND.name} Support`,
  description: `Which browsers work with ${BRAND.name}? Browser compatibility guide for desktop and mobile web support.`,
  keywords: ["Pomegle browser compatibility", "browser support", "mobile web support", "video chat browsers"],
  path: "/help/browser-compatibility",
});

const FAQS = [
  {
    question: "Which browsers are compatible with Pomegle?",
    answer: `${BRAND.name} works on all modern browsers including Chrome, Firefox, Safari, and Edge. We support both desktop and mobile web browsers, so you can use it on computers, smartphones, and tablets.`,
  },
  {
    question: "Does Pomegle work on mobile browsers?",
    answer: `Yes, ${BRAND.name} has full mobile web support. You can use it on smartphones and tablets through your mobile browser - no app download required. Just visit the website and allow camera and microphone access.`,
  },
  {
    question: "Do I need to download anything to use Pomegle?",
    answer: "No, {BRAND.name} works entirely in your browser. You don't need to download any apps, plugins, or software. Just visit the website and allow camera and microphone access when prompted.",
  },
  {
    question: "What if Pomegle doesn't work in my browser?",
    answer: "Make sure you're using a modern, updated browser. Try updating your browser to the latest version, clearing your cache, or trying a different browser like Chrome or Firefox. Also ensure you've allowed camera and microphone access.",
  },
];

const SUPPORTED_BROWSERS = [
  { name: "Google Chrome", version: "Latest", desktop: true, mobile: true },
  { name: "Mozilla Firefox", version: "Latest", desktop: true, mobile: true },
  { name: "Safari", version: "14+", desktop: true, mobile: true },
  { name: "Microsoft Edge", version: "Latest", desktop: true, mobile: true },
  { name: "Opera", version: "Latest", desktop: true, mobile: true },
];

export default function BrowserCompatibilityPage() {
  const pageUrl = `${BRAND.url}/help/browser-compatibility`;
  
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <FAQJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BRAND.url },
          { name: "Help", url: `${BRAND.url}/help` },
          { name: "Browser Compatibility", url: pageUrl },
        ]}
      />
      
      <nav className="px-6 py-5 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="text-2xl font-display tracking-wide -rotate-2 hover:rotate-0 transition-transform">
          {BRAND.name.toUpperCase()}
        </Link>
        <Link href="/help" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Help
        </Link>
      </nav>

      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 text-primary mb-6">
          <Monitor className="w-5 h-5" />
          <span className="text-sm uppercase tracking-widest">Technical Support</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          Browser Compatibility
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Which browsers work with {BRAND.name}? Full compatibility guide.
        </p>
      </section>

      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Supported Browsers</h2>
          <div className="space-y-3">
            {SUPPORTED_BROWSERS.map((browser, i) => (
              <div key={i} className="p-5 bg-[#141414] rounded-xl border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">{browser.name}</h3>
                  <span className="text-sm text-gray-500">{browser.version}</span>
                </div>
                <div className="flex gap-4 text-sm text-gray-400">
                  {browser.desktop && (
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4" />
                      <span>Desktop</span>
                    </div>
                  )}
                  {browser.mobile && (
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      <span>Mobile</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Mobile Web Support</h2>
          <div className="space-y-4 text-gray-400">
            <p>
              <strong className="text-white">Full mobile browser compatibility:</strong> {BRAND.name} works on mobile web browsers 
              including Chrome Mobile, Safari Mobile, Firefox Mobile, and Edge Mobile. No app download required.
            </p>
            <p>
              <strong className="text-white">Camera and microphone access:</strong> Your mobile browser will request permission 
              to access your camera and microphone. This is required for video chat functionality.
            </p>
            <p>
              <strong className="text-white">Mobile web optimization:</strong> Our platform is optimized for mobile browsers 
              with responsive design and touch-friendly controls.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Requirements</h2>
          <div className="space-y-3 text-gray-400">
            <p>• <strong className="text-white">Modern browser:</strong> Use the latest version of your browser for best performance</p>
            <p>• <strong className="text-white">Camera access:</strong> Allow camera access when prompted by your browser</p>
            <p>• <strong className="text-white">Microphone access:</strong> Allow microphone access for audio communication</p>
            <p>• <strong className="text-white">WebRTC support:</strong> All modern browsers support WebRTC, which is required for video chat</p>
            <p>• <strong className="text-white">Stable internet connection:</strong> A good internet connection ensures smooth video streaming</p>
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
          Start Chatting <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <Footer />
    </div>
  );
}

