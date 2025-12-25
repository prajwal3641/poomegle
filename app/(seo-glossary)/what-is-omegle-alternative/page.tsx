/**
 * ============================================
 * GLOSSARY PAGE - What is Omegle Alternative
 * ============================================
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, RefreshCw } from "lucide-react";

export const dynamic = 'force-static';
export const revalidate = 86400;

export const metadata: Metadata = generatePageMetadata({
  title: `What is an Omegle Alternative? Definition & Best Options 2025`,
  description: `An Omegle alternative is a random video chat platform that replaces Omegle. Learn what makes a good alternative and discover the best options available today.`,
  keywords: [
    "what is omegle alternative",
    "omegle alternative definition",
    "sites like omegle",
    "omegle replacement",
  ],
  path: "/what-is-omegle-alternative",
});

const FAQS = [
  {
    question: "What is an Omegle alternative?",
    answer: "An Omegle alternative is any random video chat platform that provides similar functionality to Omegle, which shut down in November 2023. These platforms allow users to video chat with strangers without registration.",
  },
  {
    question: "Why do people need Omegle alternatives?",
    answer: "Since Omegle shut down in 2023, millions of users have been looking for replacement platforms that offer the same random video chat experience. Alternatives like Pomegle provide similar features with modern improvements.",
  },
  {
    question: "What makes a good Omegle alternative?",
    answer: "A good Omegle alternative should be free, require no registration, have no ads, offer fast connections, provide safety features, and work on all devices. Pomegle meets all these criteria.",
  },
];

export default function WhatIsOmegleAlternativePage() {
  const pageUrl = `${BRAND.url}/what-is-omegle-alternative`;
  
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <FAQJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BRAND.url },
          { name: "What is Omegle Alternative", url: pageUrl },
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
        <RefreshCw className="w-12 h-12 text-primary mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          What is an Omegle Alternative?
        </h1>
        <p className="text-gray-400 text-lg">
          Definition and guide to Omegle replacement platforms
        </p>
      </section>

      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <div className="p-6 bg-primary/20 border border-primary/50 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-4">Definition</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              An <strong className="text-white">Omegle alternative</strong> is a random video chat platform designed 
              to replace or provide similar functionality to Omegle, which shut down in November 2023. These platforms 
              allow users to video chat with strangers anonymously, typically without requiring registration.
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-6">Why Alternatives Exist</h2>
          <div className="space-y-4 text-gray-400">
            <p>
              When <a 
                href="https://en.wikipedia.org/wiki/Omegle" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >Omegle</a> shut down after 14 years of operation, it left millions of users without their preferred 
              random video chat platform. This created a massive demand for alternatives that could fill the void.
            </p>
            <p>
              Modern alternatives like {BRAND.name} have learned from Omegle's challenges and offer improved safety, 
              better moderation, modern interfaces, and sustainable business models.
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
          href="/omegle-alternative"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Find Best Alternative <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <footer className="px-6 py-8 border-t border-white/5 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} {BRAND.name}</p>
      </footer>
    </div>
  );
}

