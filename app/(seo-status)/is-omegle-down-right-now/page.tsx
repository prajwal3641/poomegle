/**
 * ============================================
 * SERP PARASITE PAGE - Is Omegle Down?
 * ============================================
 * 
 * Status page - Google ALWAYS ranks these
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, AlertCircle, X, Check } from "lucide-react";

export const dynamic = 'force-static';
export const revalidate = 3600; // Update hourly

export const metadata: Metadata = generatePageMetadata({
  title: `Is Omegle Down Right Now? Status & Alternatives 2025`,
  description: `Is Omegle down? Omegle shut down permanently in November 2023. Find out what happened and discover the best alternatives available today.`,
  keywords: [
    "is omegle down",
    "is omegle down right now",
    "omegle not working",
    "omegle shut down",
    "omegle status",
  ],
  path: "/is-omegle-down-right-now",
});

const FAQS = [
  {
    question: "Is Omegle down right now?",
    answer: "Omegle is permanently shut down. It closed in November 2023 and will not return. The website now displays a farewell message. If you're looking for random video chat, you'll need to use an alternative platform like Pomegle.",
  },
  {
    question: "When did Omegle shut down?",
    answer: "Omegle officially shut down on November 8, 2023, after operating for 14 years since its launch in 2009.",
  },
  {
    question: "Is Omegle coming back?",
    answer: "No, Omegle is permanently closed. The founder announced it would not return. Users have migrated to alternatives like Pomegle, OmeTV, and Chatroulette.",
  },
  {
    question: "What happened to Omegle?",
    answer: "Omegle shut down due to moderation challenges, legal pressures, financial strain, and safety concerns. The founder cited these issues as reasons for closing the platform permanently.",
  },
];

export default function IsOmegleDownPage() {
  const pageUrl = `${BRAND.url}/is-omegle-down-right-now`;
  
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <FAQJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BRAND.url },
          { name: "Is Omegle Down", url: pageUrl },
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
        <div className="inline-flex items-center gap-2 text-red-500 mb-6">
          <X className="w-5 h-5" />
          <span className="text-sm uppercase tracking-widest">Permanently Shut Down</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          Is Omegle Down Right Now?
        </h1>
        <p className="text-gray-400 text-lg mb-4">
          <strong className="text-white">Yes.</strong> Omegle is permanently shut down and will not return.
        </p>
        <p className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>
      </section>

      {/* Status */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <div className="p-6 bg-red-500/20 border border-red-500/50 rounded-xl mb-8">
            <div className="flex items-center gap-3 mb-4">
              <X className="w-6 h-6 text-red-500" />
              <h2 className="text-2xl font-bold">Status: Permanently Closed</h2>
            </div>
            <p className="text-gray-300">
              Omegle shut down on November 8, 2023, after 14 years of operation. The platform is permanently closed 
              and will not return. The website now displays a farewell message from the founder.
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-6">What Happened?</h2>
          <div className="space-y-4 text-gray-400">
            <p>
              Omegle's founder, Leif K-Brooks, announced the shutdown citing several challenges:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Ongoing content moderation difficulties</li>
              <li>Legal pressures and lawsuits</li>
              <li>Financial sustainability issues</li>
              <li>Safety concerns in an anonymous environment</li>
            </ul>
            <p>
              For more information, see the <a 
                href="https://en.wikipedia.org/wiki/Omegle" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >Omegle Wikipedia article</a> and our detailed page on <Link 
                href="/why-did-omegle-shut-down"
                className="text-primary hover:underline"
              >why Omegle shut down</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Alternatives */}
      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Check className="w-6 h-6 text-green-500" />
            <h2 className="text-2xl font-bold">Working Alternatives</h2>
          </div>
          <p className="text-gray-400 mb-6">
            Since Omegle is down permanently, here are active alternatives:
          </p>
          <div className="space-y-4">
            {[
              { name: BRAND.name, status: "Active", desc: "Free, no registration, no ads" },
              { name: "Chatroulette", status: "Active", desc: "Original random chat platform" },
              { name: "OmeTV", status: "Active", desc: "Mobile apps available" },
            ].map((alt, i) => (
              <div key={i} className="p-5 bg-[#141414] rounded-xl border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold">{alt.name}</h3>
                  <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded">{alt.status}</span>
                </div>
                <p className="text-sm text-gray-400">{alt.desc}</p>
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
        <h2 className="text-2xl font-bold mb-4">Omegle is Gone. We're Here.</h2>
        <p className="text-gray-400 mb-8">Try the best Omegle alternative - completely free.</p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Start Chatting <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <footer className="px-6 py-8 border-t border-white/5 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} {BRAND.name}</p>
      </footer>
    </div>
  );
}

