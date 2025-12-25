/**
 * Help Page - Not Loading
 * Target keywords: "Pomegle not loading"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, ArrowLeft, RefreshCw } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `What to Do When ${BRAND.name} Isn't Loading`,
  description: `Fix ${BRAND.name} not loading issues. Troubleshooting guide for page loading problems on random video chat platforms.`,
  keywords: ["Pomegle not loading", "Pomegle won't load", "video chat not loading"],
  path: "/help/not-loading",
});

const FAQS = [
  {
    question: "Why is Pomegle not loading?",
    answer: "If Pomegle isn't loading, try refreshing the page, clearing your browser cache, checking your internet connection, or trying a different browser. Sometimes browser extensions can also prevent pages from loading.",
  },
  {
    question: "What should I do if the page won't load?",
    answer: "Start by refreshing the page (F5). If that doesn't work, clear your browser cache, disable extensions, try a different browser, or check if your internet connection is stable.",
  },
];

export default function NotLoadingPage() {
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
          <RefreshCw className="w-5 h-5" />
          <span className="text-sm uppercase tracking-widest">Loading Issues</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          {BRAND.name} Not Loading?
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Quick fixes for when the page won't load.
        </p>
      </section>

      {/* Solutions */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto space-y-6">
          {[
            "Refresh the page (press F5 or click the refresh button)",
            "Clear your browser cache and cookies",
            "Check your internet connection",
            "Try a different browser (Chrome, Firefox, Safari, Edge)",
            "Disable browser extensions temporarily",
            "Check if JavaScript is enabled in your browser",
            "Try using incognito/private browsing mode",
          ].map((solution, i) => (
            <div key={i} className="p-4 bg-[#141414] rounded-xl border border-white/5">
              <p className="text-gray-300">{solution}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
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

