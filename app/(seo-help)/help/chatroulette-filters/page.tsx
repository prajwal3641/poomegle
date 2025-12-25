/**
 * Help Page - Chatroulette Filters
 * Target keywords: "Chatroulette filters"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, ArrowLeft, Filter } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `Understanding Age and Content Filters on Chatroulette`,
  description: `Learn about age restrictions and content filtering on Chatroulette and other random video chat platforms. How filters work and what to expect.`,
  keywords: ["Chatroulette filters", "age filters chat", "content filters video chat"],
  path: "/help/chatroulette-filters",
});

const FAQS = [
  {
    question: "How do age and content filters work on Chatroulette?",
    answer: "Chatroulette and similar platforms may have basic age verification or content filtering, but random video chat platforms are inherently difficult to filter completely. Content moderation relies on user reporting and automated systems. For stricter filtering, consider platforms specifically designed for moderated chat experiences.",
  },
  {
    question: "Can I filter content on random video chat platforms?",
    answer: "Most random video chat platforms have limited filtering capabilities due to their anonymous and random nature. Some platforms offer content moderation and reporting features, but complete filtering is challenging. Users should skip inappropriate content immediately and report violations.",
  },
];

export default function ChatrouletteFiltersPage() {
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <FAQJsonLd faqs={FAQS} />
      
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
          <Filter className="w-5 h-5" />
          <span className="text-sm uppercase tracking-widest">Filters</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          Chatroulette Filters
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Understanding age and content filtering on random video chat.
        </p>
      </section>

      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4">The Filtering Challenge</h2>
            <div className="space-y-3 text-gray-400">
              <p>
                Random video chat platforms like Chatroulette face a significant challenge when it comes to filtering: 
                the anonymous and random nature makes complete content filtering nearly impossible in real-time.
              </p>
              <p>
                Video content is more difficult to filter automatically than text, and the live nature means 
                content appears before moderation can act.
              </p>
            </div>
          </div>

          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4">How Filtering Works</h2>
            <div className="space-y-3 text-gray-400">
              <p>
                Most platforms use a combination of:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">User reporting:</strong> Users report inappropriate content</li>
                <li><strong className="text-white">Automated detection:</strong> AI systems attempt to detect violations</li>
                <li><strong className="text-white">Moderation teams:</strong> Human moderators review reports</li>
                <li><strong className="text-white">Age verification:</strong> Some platforms attempt age checks</li>
                <li><strong className="text-white">Skip features:</strong> Users can immediately skip inappropriate content</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4">Age Restrictions</h2>
            <div className="space-y-3 text-gray-400">
              <p>
                Most random video chat platforms require users to be 18+ due to the potential for adult content. 
                However, age verification is difficult on anonymous platforms without registration.
              </p>
              <p>
                Parents should be aware that these platforms are not suitable for minors, regardless of age verification measures.
              </p>
            </div>
          </div>

          <div className="p-6 bg-primary/20 border border-primary/50 rounded-xl">
            <h2 className="text-xl font-bold mb-4">What You Can Do</h2>
            <p className="text-gray-300">
              If you encounter inappropriate content, skip immediately and report it. Help keep platforms safer by 
              actively using reporting features. Remember that random video chat may contain unpredictable content - 
              if you need a strictly filtered experience, consider moderated chat platforms instead.
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

      <section className="px-6 py-16 border-t border-white/5 text-center">
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

