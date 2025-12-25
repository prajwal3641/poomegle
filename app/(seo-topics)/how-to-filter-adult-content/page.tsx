/**
 * SEO Page - How to Filter Adult Content
 * Target keywords: "filter adult content chat"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/lib/seo/structured-data";
import { Footer } from "@/components/Footer";
import { ArrowRight, Shield, Eye } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `How to Filter Out Adult Content on Random Chat`,
  description: `Learn how to filter and avoid adult content on random video chat platforms. Safety tips for parents and users.`,
  keywords: ["filter adult content chat", "block adult content", "safe video chat", "parental controls chat"],
  path: "/how-to-filter-adult-content",
});

const FAQS = [
  {
    question: "How can I filter adult content on random chat apps?",
    answer: "Use platforms with content moderation, use the block/report features immediately, and skip users who show inappropriate content. Some platforms also have content filters you can enable in settings.",
  },
  {
    question: "Is there a way to block adult content on video chat?",
    answer: "While random video chat platforms try to moderate content, the nature of these services means you may encounter inappropriate content. Use block features, report users, and choose platforms with active moderation.",
  },
  {
    question: "Which random chat platforms are safest for avoiding adult content?",
    answer: "Look for platforms with active moderation, NSFW filtering technology, user reporting systems, and content filtering options. {BRAND.name} uses NSFW filters and moderation to reduce inappropriate content. Always use block features immediately if you encounter inappropriate content.",
  },
  {
    question: "Does Pomegle have an NSFW filter?",
    answer: "Yes, {BRAND.name} uses NSFW filtering technology to detect and prevent inappropriate content. However, due to the nature of random video chat, users should still use block features if they encounter inappropriate content.",
  },
  {
    question: "What are the age restrictions for random video chat?",
    answer: "{BRAND.name} is intended for users 18 years and older. We recommend parental guidance for younger users, as random video chat platforms can expose users to inappropriate content despite NSFW filtering.",
  },
];

export default function HowToFilterAdultContentPage() {
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
          <Shield className="w-5 h-5" />
          <span className="text-sm uppercase tracking-widest">Safety Guide</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          How to Filter Adult Content<br />
          <span className="text-primary">On Random Chat</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Tips and strategies for avoiding inappropriate content on random video chat platforms.
        </p>
      </section>

      {/* Tips */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              1. Use Block Features Immediately
            </h2>
            <p className="text-gray-400">
              If you encounter inappropriate content, use the block or skip feature immediately. Don't hesitate - your comfort and safety come first.
            </p>
          </div>

          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              2. Report Inappropriate Users
            </h2>
            <p className="text-gray-400">
              Report users who show adult or inappropriate content. This helps platforms moderate better and protects other users.
            </p>
          </div>

          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              3. Choose Platforms with Moderation
            </h2>
            <p className="text-gray-400">
              Select random chat platforms that actively moderate content and have robust reporting systems. Platforms with moderation tend to have less inappropriate content.
            </p>
          </div>

          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4">4. Skip Quickly</h2>
            <p className="text-gray-400">
              Don't feel obligated to continue a conversation if you see something inappropriate. Skip to the next person immediately - that's what the feature is for.
            </p>
          </div>
        </div>
      </section>

      {/* For Parents */}
      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Parental Guidance & Age Restrictions</h2>
          <div className="p-6 bg-primary/20 border border-primary/50 rounded-xl mb-6">
            <p className="text-lg text-gray-300">
              <strong className="text-white">{BRAND.name} is intended for users 18 years and older.</strong> Random video chat platforms can expose users to inappropriate content, and we strongly recommend parental guidance for younger users.
            </p>
          </div>
          <div className="space-y-4 text-gray-400">
            <p>
              Random video chat platforms, by their nature, can expose users to inappropriate content. Here's what parents should know:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-white">Age restrictions:</strong> {BRAND.name} is intended for users 18+. We cannot verify ages, so parental supervision is essential for minors.</li>
              <li><strong className="text-white">NSFW content:</strong> While we use NSFW filtering technology, inappropriate content may still appear. Use block features immediately.</li>
              <li><strong className="text-white">Supervise or limit use:</strong> Monitor your child's use of random video chat platforms and set time limits.</li>
              <li><strong className="text-white">Open communication:</strong> Talk to children about what to do if they see inappropriate content and how to use block/report features.</li>
              <li><strong className="text-white">Digital well-being:</strong> Consider whether random video chat is age-appropriate for your child and discuss online safety regularly.</li>
              <li><strong className="text-white">Platform selection:</strong> Consider using platforms with stricter moderation and NSFW filters if allowing younger users.</li>
            </ul>
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

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/5 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} {BRAND.name}</p>
      </footer>
    </div>
  );
}

