/**
 * Multi-Comparison Page
 * Target: "Pomegle vs Monkey vs Chatroulette"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, ArrowLeft, Check, X } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `${BRAND.name} vs Monkey.app vs Chatroulette: Chat App Face-off`,
  description: `Compare ${BRAND.name}, Monkey App, and Chatroulette. See which random chat platform works best for global users.`,
  keywords: ["Pomegle vs Monkey vs Chatroulette", "Monkey app alternative", "Chatroulette alternative"],
  path: "/compare/pomegle-vs-monkey-vs-chatroulette",
});

const COMPARISON_DATA = [
  { feature: "Free", pomegle: true, monkey: true, chatroulette: true },
  { feature: "No download needed", pomegle: true, monkey: false, chatroulette: true },
  { feature: "Works on desktop", pomegle: true, monkey: false, chatroulette: true },
  { feature: "No registration", pomegle: true, monkey: false, chatroulette: true },
  { feature: "No ads", pomegle: true, monkey: false, chatroulette: false },
  { feature: "Modern interface", pomegle: true, monkey: true, chatroulette: false },
  { feature: "Mobile friendly", pomegle: true, monkey: true, chatroulette: "Limited" },
];

const FAQS = [
  {
    question: "Which is better: Pomegle, Monkey App, or Chatroulette?",
    answer: `${BRAND.name} works everywhere (desktop and mobile) with no download, no registration, and no ads. Monkey is mobile-only and requires an app download. Chatroulette works on desktop but has ads and an outdated interface.`,
  },
  {
    question: "Can I use Pomegle on desktop like Chatroulette?",
    answer: "Yes, Pomegle works on desktop, mobile, and tablets through your web browser. No app download needed.",
  },
];

export default function PomegleVsMonkeyVsChatroulettePage() {
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
          {BRAND.name} vs Monkey.app vs Chatroulette
        </h1>
        <p className="text-gray-400">Global chat platforms compared.</p>
      </section>

      <section className="px-6 pb-12">
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-2 font-medium">Feature</th>
                <th className="text-center py-3 px-2 font-medium text-primary">{BRAND.name}</th>
                <th className="text-center py-3 px-2 font-medium text-gray-500">Monkey</th>
                <th className="text-center py-3 px-2 font-medium text-gray-500">Chatroulette</th>
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
                    {typeof row.monkey === "boolean" ? (
                      row.monkey ? <Check className="w-4 h-4 text-green-500 mx-auto" /> : <X className="w-4 h-4 text-red-500 mx-auto" />
                    ) : (
                      <span className="text-gray-400">{row.monkey}</span>
                    )}
                  </td>
                  <td className="py-3 px-2 text-center">
                    {typeof row.chatroulette === "boolean" ? (
                      row.chatroulette ? <Check className="w-4 h-4 text-green-500 mx-auto" /> : <X className="w-4 h-4 text-red-500 mx-auto" />
                    ) : (
                      <span className="text-gray-400">{row.chatroulette}</span>
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
              <strong className="text-white">{BRAND.name}:</strong> Works everywhere, no download, no registration, no ads. Best for users who want flexibility.
            </p>
            <p>
              <strong className="text-white">Monkey App:</strong> Great mobile experience with fun features, but mobile-only and requires app download.
            </p>
            <p>
              <strong className="text-white">Chatroulette:</strong> The original but feels outdated. Works on desktop but has ads and poor mobile support.
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

