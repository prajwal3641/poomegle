/**
 * Help Page - Pomegle Location
 * Target keywords: "Pomegle location"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, ArrowLeft, Globe } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `Why is ${BRAND.name} Showing Nearby Users Instead of Worldwide?`,
  description: `Understand how ${BRAND.name} matches users. Learn about location-based matching and how to connect with people worldwide.`,
  keywords: ["Pomegle location", "video chat location", "worldwide chat"],
  path: "/help/pomegle-location",
});

const FAQS = [
  {
    question: "Why is Pomegle showing nearby users instead of worldwide?",
    answer: `${BRAND.name} uses random matching that can connect you with anyone globally. If you're seeing more nearby users, it may be due to connection optimization or the time of day when people in your region are most active. You can always skip and be matched with someone else, potentially from anywhere in the world.`,
  },
  {
    question: "Can I control where my matches come from on random chat?",
    answer: "Most random video chat platforms, including Pomegle, use random matching without location filters. You're matched with whoever is available at that moment, which could be from anywhere in the world. Location preferences aren't typically available on random chat platforms.",
  },
];

export default function PomegleLocationPage() {
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
          <Globe className="w-5 h-5" />
          <span className="text-sm uppercase tracking-widest">Location</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          {BRAND.name} Location Settings
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          How location affects your random video chat matches.
        </p>
      </section>

      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4">How Random Matching Works</h2>
            <div className="space-y-3 text-gray-400">
              <p>
                {BRAND.name} uses random matching, which means you're connected with whoever is available at that moment, 
                regardless of location. The platform doesn't filter by geographic location - you can be matched with 
                someone from anywhere in the world.
              </p>
              <p>
                The random nature means you might connect with someone nearby or someone thousands of miles away - 
                it's all part of the random experience.
              </p>
            </div>
          </div>

          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4">Why You Might See More Nearby Users</h2>
            <div className="space-y-3 text-gray-400">
              <p>
                If you notice more connections with people nearby, it could be because:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>More people in your time zone are active at that time</li>
                <li>Connection optimization favors closer users for better quality</li>
                <li>Random chance - sometimes you'll get a string of nearby matches</li>
                <li>Regional activity patterns vary throughout the day</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-primary/20 border border-primary/50 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Getting Worldwide Connections</h2>
            <p className="text-gray-300">
              To connect with people from around the world, just keep chatting! The random nature means you'll eventually 
              match with people from different countries, time zones, and continents. Every skip gives you another chance 
              for a worldwide connection.
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

