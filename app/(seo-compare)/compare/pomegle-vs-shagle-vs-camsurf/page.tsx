/**
 * Multi-Comparison Page
 * Target: "Pomegle vs Shagle vs CamSurf"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, ArrowLeft, Check, X } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `${BRAND.name} vs Shagle vs CamSurf: Safe Chat Showdown`,
  description: `Compare ${BRAND.name}, Shagle, and CamSurf for safety-conscious users. See which platform offers the safest random video chat experience.`,
  keywords: ["Pomegle vs Shagle vs CamSurf", "safe random chat", "Shagle alternative", "CamSurf alternative"],
  path: "/compare/pomegle-vs-shagle-vs-camsurf",
});

const COMPARISON_DATA = [
  { feature: "Completely free", pomegle: true, shagle: "Freemium", camsurf: true },
  { feature: "No registration", pomegle: true, shagle: false, camsurf: false },
  { feature: "No ads", pomegle: true, shagle: false, camsurf: true },
  { feature: "Fast connections", pomegle: true, shagle: true, camsurf: "Slow" },
  { feature: "Modern interface", pomegle: true, shagle: true, camsurf: false },
  { feature: "Good moderation", pomegle: true, shagle: "Limited", camsurf: true },
  { feature: "Mobile friendly", pomegle: true, shagle: true, camsurf: true },
];

const FAQS = [
  {
    question: "Which is safer: Pomegle, Shagle, or CamSurf?",
    answer: `${BRAND.name} and CamSurf both offer good moderation and safety features. ${BRAND.name} is completely free with no ads, while CamSurf requires signup and has slower connections. Shagle has ads and limited moderation.`,
  },
];

export default function PomegleVsShagleVsCamSurfPage() {
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
          {BRAND.name} vs Shagle vs CamSurf
        </h1>
        <p className="text-gray-400">Safe chat platforms compared.</p>
      </section>

      <section className="px-6 pb-12">
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-2 font-medium">Feature</th>
                <th className="text-center py-3 px-2 font-medium text-primary">{BRAND.name}</th>
                <th className="text-center py-3 px-2 font-medium text-gray-500">Shagle</th>
                <th className="text-center py-3 px-2 font-medium text-gray-500">CamSurf</th>
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
                    {typeof row.shagle === "boolean" ? (
                      row.shagle ? <Check className="w-4 h-4 text-green-500 mx-auto" /> : <X className="w-4 h-4 text-red-500 mx-auto" />
                    ) : (
                      <span className="text-gray-400">{row.shagle}</span>
                    )}
                  </td>
                  <td className="py-3 px-2 text-center">
                    {typeof row.camsurf === "boolean" ? (
                      row.camsurf ? <Check className="w-4 h-4 text-green-500 mx-auto" /> : <X className="w-4 h-4 text-red-500 mx-auto" />
                    ) : (
                      <span className="text-gray-400">{row.camsurf}</span>
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
              <strong className="text-white">{BRAND.name}:</strong> Best for safety-conscious users. Free, no ads, good moderation, fast connections.
            </p>
            <p>
              <strong className="text-white">Shagle:</strong> Good interface but has ads and requires registration for full features.
            </p>
            <p>
              <strong className="text-white">CamSurf:</strong> Moderated and free but requires signup and has slower connections than competitors.
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

