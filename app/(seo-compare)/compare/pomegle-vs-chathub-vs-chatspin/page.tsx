/**
 * Multi-Comparison Page
 * Target: "Pomegle vs ChatHub vs Chatspin"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, ArrowLeft, Check, X } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `${BRAND.name} vs ChatHub vs Chatspin: Anonymous Chat Comparison`,
  description: `Compare ${BRAND.name}, ChatHub, and Chatspin. See which anonymous chat platform offers the best experience for privacy-focused users.`,
  keywords: ["Pomegle vs ChatHub vs Chatspin", "anonymous chat comparison", "ChatHub alternative", "Chatspin alternative"],
  path: "/compare/pomegle-vs-chathub-vs-chatspin",
});

const COMPARISON_DATA = [
  { feature: "Free to use", pomegle: true, chathub: true, chatspin: "Freemium" },
  { feature: "No registration", pomegle: true, chathub: true, chatspin: false },
  { feature: "No ads", pomegle: true, chathub: false, chatspin: false },
  { feature: "Reliable connections", pomegle: true, chathub: "Unreliable", chatspin: true },
  { feature: "Modern interface", pomegle: true, chathub: false, chatspin: true },
  { feature: "Mobile friendly", pomegle: true, chathub: "Limited", chatspin: true },
  { feature: "Good moderation", pomegle: true, chathub: "Variable", chatspin: true },
];

const FAQS = [
  {
    question: "Which is better: Pomegle, ChatHub, or Chatspin?",
    answer: `${BRAND.name} offers the most reliable experience with no registration, no ads, and stable connections. ChatHub aggregates multiple sources but has unreliable connections. Chatspin requires registration and has ads.`,
  },
  {
    question: "Do I need to register on Chatspin?",
    answer: "Yes, Chatspin requires registration to access most features, while Pomegle and ChatHub don't require any signup.",
  },
];

export default function PomegleVsChatHubVsChatspinPage() {
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <FAQJsonLd faqs={FAQS} />
      
      <nav className="px-6 py-5 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="text-2xl font-display tracking-wide -rotate-2 hover:rotate-0 transition-transform">
          {BRAND.name.toUpperCase()}
        </Link>
        <Link href="/compare" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> All Comparisons
        </Link>
      </nav>

      <section className="px-6 py-16 max-w-3xl mx-auto text-center">
        <p className="text-primary text-sm uppercase tracking-widest mb-4">Comparison</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {BRAND.name} vs ChatHub vs Chatspin
        </h1>
        <p className="text-gray-400">Anonymous chat platforms compared.</p>
      </section>

      <section className="px-6 pb-12">
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-2 font-medium">Feature</th>
                <th className="text-center py-3 px-2 font-medium text-primary">{BRAND.name}</th>
                <th className="text-center py-3 px-2 font-medium text-gray-500">ChatHub</th>
                <th className="text-center py-3 px-2 font-medium text-gray-500">Chatspin</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_DATA.map((row, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-3 px-2">{row.feature}</td>
                  <td className="py-3 px-2 text-center">
                    {typeof row.pomegle === "boolean" ? (
                      row.pomegle ? <Check className="w-4 h-4 text-green-500 mx-auto" /> : <X className="w-4 h-4 text-red-500 mx-auto" />
                    ) : (
                      <span className="text-gray-400">{row.pomegle}</span>
                    )}
                  </td>
                  <td className="py-3 px-2 text-center">
                    {typeof row.chathub === "boolean" ? (
                      row.chathub ? <Check className="w-4 h-4 text-green-500 mx-auto" /> : <X className="w-4 h-4 text-red-500 mx-auto" />
                    ) : (
                      <span className="text-gray-400">{row.chathub}</span>
                    )}
                  </td>
                  <td className="py-3 px-2 text-center">
                    {typeof row.chatspin === "boolean" ? (
                      row.chatspin ? <Check className="w-4 h-4 text-green-500 mx-auto" /> : <X className="w-4 h-4 text-red-500 mx-auto" />
                    ) : (
                      <span className="text-gray-400">{row.chatspin}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="px-6 py-12 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold mb-4">The Verdict</h2>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              <strong className="text-white">{BRAND.name}:</strong> Best overall choice for anonymous chat. Reliable, free, no registration, no ads.
            </p>
            <p>
              <strong className="text-white">ChatHub:</strong> Aggregates multiple chat sources but suffers from unreliable connections and inconsistent quality.
            </p>
            <p>
              <strong className="text-white">Chatspin:</strong> Requires registration and shows ads, though it has a decent interface and user base.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-white/5 text-center">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Try {BRAND.name} <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <footer className="px-6 py-8 border-t border-white/5 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} {BRAND.name}</p>
      </footer>
    </div>
  );
}

