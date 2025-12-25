/**
 * ============================================
 * SERP PARASITE PAGE - Is OmeTV Down?
 * ============================================
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, Check, AlertCircle } from "lucide-react";

export const dynamic = 'force-static';
export const revalidate = 3600;

export const metadata: Metadata = generatePageMetadata({
  title: `Is OmeTV Down Right Now? Status Check & Alternatives 2025`,
  description: `Is OmeTV down? Check OmeTV status and find working alternatives. Real-time status information and best OmeTV alternatives if it's not working.`,
  keywords: [
    "is ometv down",
    "is ometv down right now",
    "ometv not working",
    "ometv status",
    "ometv alternative",
  ],
  path: "/is-ometv-down-right-now",
});

const FAQS = [
  {
    question: "Is OmeTV down right now?",
    answer: "OmeTV is typically operational, but if you're experiencing issues, it could be due to server problems, maintenance, or network issues. Check OmeTV's official status or try an alternative like Pomegle.",
  },
  {
    question: "What should I do if OmeTV is not working?",
    answer: "If OmeTV isn't working, try refreshing the page, clearing your browser cache, checking your internet connection, or using a different browser. You can also try alternatives like Pomegle which offers similar features.",
  },
  {
    question: "Is there a better alternative to OmeTV?",
    answer: "Yes, Pomegle is a great OmeTV alternative. It's completely free, requires no registration, has no ads, and works on all devices. Unlike OmeTV, Pomegle doesn't require signup or show advertisements.",
  },
];

export default function IsOmeTVDownPage() {
  const pageUrl = `${BRAND.url}/is-ometv-down-right-now`;
  
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <FAQJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BRAND.url },
          { name: "Is OmeTV Down", url: pageUrl },
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
        <div className="inline-flex items-center gap-2 text-yellow-500 mb-6">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm uppercase tracking-widest">Status Check</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          Is OmeTV Down Right Now?
        </h1>
        <p className="text-gray-400 text-lg">
          Check OmeTV status and find working alternatives
        </p>
      </section>

      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <div className="p-6 bg-yellow-500/20 border border-yellow-500/50 rounded-xl mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Check className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold">Status: Usually Operational</h2>
            </div>
            <p className="text-gray-300">
              OmeTV is typically online, but if you're experiencing issues, it could be temporary server problems, 
              maintenance, or connection issues on your end.
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-6">Troubleshooting</h2>
          <div className="space-y-3 text-gray-400">
            <p>If OmeTV isn't working, try:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Refreshing the page or clearing browser cache</li>
              <li>Checking your internet connection</li>
              <li>Trying a different browser</li>
              <li>Checking OmeTV's official status page</li>
              <li>Using an alternative platform like {BRAND.name}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Better Alternative: {BRAND.name}</h2>
          <div className="space-y-4 text-gray-400">
            <p>
              If OmeTV is down or you're looking for a better experience, {BRAND.name} offers:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Completely free (no premium tiers)</li>
              <li>No registration required</li>
              <li>No ads</li>
              <li>Works on all devices</li>
              <li>Fast, reliable connections</li>
            </ul>
            <p>
              <Link href="/compare/ometv" className="text-primary hover:underline">
                Compare {BRAND.name} vs OmeTV
              </Link> to see the differences.
            </p>
          </div>
        </div>
      </section>

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

      <section className="px-6 py-20 border-t border-white/5 text-center">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Try {BRAND.name} Instead <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <footer className="px-6 py-8 border-t border-white/5 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} {BRAND.name}</p>
      </footer>
    </div>
  );
}

