/**
 * SEO Landing Page - Mobile Video Chat App
 * Target keywords: "mobile video chat app", "video chat app iOS Android"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata, SEO_KEYWORDS } from "@/lib/seo";
import { FAQJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, Smartphone, Tablet, Monitor, Globe } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `Mobile Video Chat App – ${BRAND.name} for Android/iOS`,
  description: `${BRAND.name} works on mobile! Video chat with strangers on your iPhone, Android, or tablet. No app download needed - works in your browser.`,
  keywords: ["mobile video chat app", "video chat app iOS Android", "mobile video chat", "iPhone video chat", "Android video chat", ...SEO_KEYWORDS.primary],
  path: "/mobile-video-chat-app",
});

const FAQS = [
  {
    question: "Is there a Pomegle app for iPhone or Android?",
    answer: `${BRAND.name} works on all mobile devices through your web browser. No app download needed - just visit pomegle.com on your phone's browser and start chatting.`,
  },
  {
    question: "Can I use Pomegle on my phone?",
    answer: "Yes! Pomegle is fully mobile-friendly and works on iPhone, Android, and tablets. Simply open your browser and visit pomegle.com.",
  },
  {
    question: "Do I need to download an app to use Pomegle on mobile?",
    answer: "No app download required. Pomegle works directly in your mobile browser - just like on desktop, but optimized for mobile screens.",
  },
  {
    question: "Is the mobile experience the same as desktop?",
    answer: "The mobile experience is optimized for smaller screens but offers all the same features: random video chat, instant connections, and no registration required.",
  },
];

export default function MobileVideoChatAppPage() {
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <FAQJsonLd faqs={FAQS} />
      
      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="text-2xl font-display tracking-wide -rotate-2 hover:rotate-0 transition-transform">
          {BRAND.name.toUpperCase()}
        </Link>
        <Link href="/" className="bg-primary text-gray-900 font-bold text-sm px-4 py-2 rounded-lg hover:scale-105 transition-transform">
          Start Chat
        </Link>
      </nav>

      {/* Hero */}
      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 text-primary mb-6">
          <Smartphone className="w-5 h-5" />
          <span className="text-sm uppercase tracking-widest">Mobile Video Chat</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          Video Chat on Your Phone<br />
          <span className="text-primary">No App Needed</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          {BRAND.name} works perfectly on iPhone, Android, and tablets. Just open your browser and start chatting with strangers.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Start Mobile Chat <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Device Support */}
      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Works on All Devices</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Smartphone, label: "iPhone & Android", desc: "Optimized for mobile browsers" },
              { icon: Tablet, label: "Tablets", desc: "Great experience on iPad and Android tablets" },
              { icon: Monitor, label: "Desktop", desc: "Also works great on computers" },
            ].map((item) => (
              <div key={item.label} className="text-center p-6 bg-white/5 rounded-xl">
                <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-medium mb-2">{item.label}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use on Mobile */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">How to Use {BRAND.name} on Mobile</h2>
          <div className="space-y-4">
            {[
              { num: "1", step: "Open your mobile browser (Safari, Chrome, etc.)" },
              { num: "2", step: "Visit pomegle.com" },
              { num: "3", step: "Allow camera and microphone access when prompted" },
              { num: "4", step: "Enter a name (optional) and start chatting" },
            ].map((item) => (
              <div key={item.num} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                <div className="w-8 h-8 bg-primary text-gray-900 rounded-full flex items-center justify-center font-bold shrink-0">
                  {item.num}
                </div>
                <p className="text-gray-400 pt-1">{item.step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Why Browser-Based is Better</h2>
          <div className="space-y-4">
            {[
              "No app store downloads - start chatting immediately",
              "Works on any device with a browser",
              "No storage space required on your phone",
              "Always up-to-date - no manual updates needed",
              "Same experience across all devices",
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                <Globe className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-gray-400">{benefit}</p>
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
      <section className="px-6 py-20 border-t border-white/5 text-center">
        <h2 className="text-2xl font-bold mb-4">Chat on Mobile Today</h2>
        <p className="text-gray-400 mb-8">Open your browser and start video chatting with strangers right now.</p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Start Mobile Chat <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/5 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} {BRAND.name}</p>
      </footer>
    </div>
  );
}

