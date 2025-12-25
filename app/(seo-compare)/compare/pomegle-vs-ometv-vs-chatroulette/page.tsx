/**
 * Multi-Comparison Page
 * Target: "Pomegle vs OmeTV vs Chatroulette"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, ArrowLeft, Check, X } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `${BRAND.name} vs OmeTV vs Chatroulette: Best Random Chat App?`,
  description: `Compare ${BRAND.name}, OmeTV, and Chatroulette. See which random video chat app is best for you in 2025.`,
  keywords: ["Pomegle vs OmeTV vs Chatroulette", "best random chat app", "omegle alternatives comparison", ...BRAND.name.toLowerCase().split(" ")],
  path: "/compare/pomegle-vs-ometv-vs-chatroulette",
});

const COMPARISON_DATA = [
  { feature: "Free to use", pomegle: true, ometv: "Freemium", chatroulette: true },
  { feature: "No registration required", pomegle: true, ometv: false, chatroulette: true },
  { feature: "No ads", pomegle: true, ometv: false, chatroulette: false },
  { feature: "Modern interface", pomegle: true, ometv: true, chatroulette: false },
  { feature: "Mobile friendly", pomegle: true, ometv: true, chatroulette: "Limited" },
  { feature: "Active moderation", pomegle: true, ometv: "Partial", chatroulette: "Limited" },
  { feature: "Fast connections", pomegle: true, ometv: true, chatroulette: "Variable" },
];

const FAQS = [
  {
    question: "Which is better: Pomegle, OmeTV, or Chatroulette?",
    answer: `${BRAND.name} offers the best balance: completely free, no registration, no ads, and modern interface. OmeTV requires signup and has ads. Chatroulette is outdated with poor mobile support.`,
  },
  {
    question: "Do I need to register on any of these platforms?",
    answer: `${BRAND.name} and Chatroulette don't require registration. OmeTV requires you to sign up to access all features.`,
  },
  {
    question: "Which platform is completely free?",
    answer: `${BRAND.name} and Chatroulette are free, though Chatroulette has ads. OmeTV offers a free tier but locks premium features behind payment.`,
  },
];

export default function MultiComparisonPage() {
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <FAQJsonLd faqs={FAQS} />
      
      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="text-2xl font-display tracking-wide -rotate-2 hover:rotate-0 transition-transform">
          {BRAND.name.toUpperCase()}
        </Link>
        <Link href="/compare" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> All Comparisons
        </Link>
      </nav>

      {/* Hero */}
      <section className="px-6 py-16 max-w-3xl mx-auto text-center">
        <p className="text-primary text-sm uppercase tracking-widest mb-4">Comparison</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {BRAND.name} vs OmeTV vs Chatroulette
        </h1>
        <p className="text-gray-400">Which random chat app is best in 2025?</p>
      </section>

      {/* Comparison Table */}
      <section className="px-6 pb-12">
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-2 font-medium">Feature</th>
                <th className="text-center py-3 px-2 font-medium text-primary">{BRAND.name}</th>
                <th className="text-center py-3 px-2 font-medium text-gray-500">OmeTV</th>
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
                    {typeof row.ometv === "boolean" ? (
                      row.ometv ? <Check className="w-4 h-4 text-green-500 mx-auto" /> : <X className="w-4 h-4 text-red-500 mx-auto" />
                    ) : (
                      <span className="text-gray-400">{row.ometv}</span>
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

      {/* Verdict */}
      <section className="px-6 py-12 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold mb-4">The Verdict</h2>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              <strong className="text-white">{BRAND.name}:</strong> The clear winner for 2025. Completely free, no registration, 
              no ads, modern interface, and great mobile support. Best choice for users who want a hassle-free experience.
            </p>
            <p>
              <strong className="text-white">OmeTV:</strong> Good features and mobile apps, but requires registration and shows ads. 
              Premium features are locked behind payment. Solid option if you don't mind signing up.
            </p>
            <p>
              <strong className="text-white">Chatroulette:</strong> The original random chat platform but hasn't evolved much. 
              Free and no registration, but outdated interface and poor mobile experience. Still functional but feels dated.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-12 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-6">FAQ</h2>
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
        <p className="text-gray-400 mb-6">Ready to try the best option?</p>
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

