/**
 * SEO Landing Page - Talk to Strangers
 * Target keywords: "talk to strangers", "chat with strangers"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, talkToStrangersMetadata, SEO_KEYWORDS } from "@/lib/seo";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/lib/seo/structured-data";
import { Footer } from "@/components/Footer";
import { ArrowRight, MessageCircle } from "lucide-react";

// Route segment config - ensure static generation
export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate daily (ISR)

export const metadata: Metadata = {
  ...talkToStrangersMetadata,
  keywords: [...SEO_KEYWORDS.talkToStrangers],
};

const FAQS = [
  {
    question: "Where can I talk to strangers online?",
    answer: `${BRAND.name} is one of the best places. Free video chat, no registration, global users. Other options include Chatroulette, OmeTV, and Emerald Chat.`,
  },
  {
    question: "Is it safe?",
    answer: "As safe as you make it. Don't share personal info. Skip anyone who makes you uncomfortable. Trust your gut. Use platforms with moderation and reporting features.",
  },
  {
    question: "Why talk to strangers?",
    answer: "Break out of your bubble. Practice languages. Combat boredom. Meet people you'd never otherwise encounter. Research shows that talking to strangers can improve social skills and reduce loneliness.",
  },
  {
    question: "Do I need to download an app to talk to strangers?",
    answer: "No, platforms like Pomegle work directly in your web browser. No app download or installation required. Just visit the website and start chatting.",
  },
  {
    question: "What should I talk about with strangers?",
    answer: "Start with simple questions like 'Where are you from?' or 'What's the most random thing that happened to you today?' Ask about their interests, hobbies, or experiences. Keep it light and friendly.",
  },
  {
    question: "Can I talk to strangers in other languages?",
    answer: "Yes! Random video chat connects you with people worldwide. You can practice languages, learn about different cultures, and meet people from countries you've never visited.",
  },
  {
    question: "What if someone is inappropriate?",
    answer: "Skip immediately. Use the skip button to move to the next person. Report inappropriate behavior if the platform has that feature. Never feel obligated to continue a conversation that makes you uncomfortable.",
  },
  {
    question: "Is talking to strangers legal?",
    answer: "Yes, talking to strangers online is legal. However, always follow platform guidelines, respect others, and never engage in illegal activities. See our legal guide for more information.",
  },
];

const STARTERS = [
  "Where are you from?",
  "What's the most random thing that happened to you today?",
  "Any show recommendations?",
  "What brought you here?",
];

export default function TalkToStrangersPage() {
  const pageUrl = `${BRAND.url}/talk-to-strangers`;
  
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <FAQJsonLd faqs={FAQS} />
      
      {/* Breadcrumb Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BRAND.url },
          { name: "Talk to Strangers", url: pageUrl },
        ]}
      />
      
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
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm uppercase tracking-widest">Talk to Strangers</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          The world is full<br />
          <span className="text-primary">of interesting people.</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Random video chat with strangers from around the globe. No friends list. No followers. Just real conversations.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Meet Someone <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Why */}
      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Why talk to strangers?</h2>
          <div className="text-gray-400 space-y-4 leading-relaxed">
            <p>
              Your social circle is an echo chamber. Same opinions, same jokes, same stories on repeat.
            </p>
            <p>
              Strangers are different. A student in Tokyo. A grandma in Brazil. A programmer in Berlin. 
              People you&apos;d never meet otherwise.
            </p>
            <p>
              {BRAND.name} makes it easy. One click and you&apos;re face-to-face with someone new.
            </p>
          </div>
        </div>
      </section>

      {/* Conversation starters */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Need a conversation starter?</h2>
          <div className="grid grid-cols-2 gap-3">
            {STARTERS.map((starter, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl text-sm text-gray-300 border border-white/5">
                &ldquo;{starter}&rdquo;
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Quick tips</h2>
          <div className="space-y-3 text-gray-400">
            {[
              "Smile. It's contagious, even through a screen.",
              "Ask questions. People love talking about themselves.",
              "Don't share personal info. First name only.",
              "Skip freely. Not every match is a fit.",
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-primary">→</span>
                <span>{tip}</span>
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
        <h2 className="text-2xl font-bold mb-4">Go meet someone.</h2>
        <p className="text-gray-400 mb-8">Thousands of strangers online right now.</p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Start <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
