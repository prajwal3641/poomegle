/**
 * SEO Page - How to Use Pomegle
 * Target keywords: "how to use Pomegle"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/lib/seo/structured-data";
import { Footer } from "@/components/Footer";
import { ArrowRight, Video, User, Zap, ArrowLeft } from "lucide-react";

// Route segment config - ensure static generation
export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate daily (ISR)

export const metadata: Metadata = generatePageMetadata({
  title: `How to Use ${BRAND.name}: Guide to Anonymous Video Chat`,
  description: `Learn how to use ${BRAND.name} for random video chat with strangers. Step-by-step guide for beginners to start chatting anonymously.`,
  keywords: ["how to use Pomegle", "Pomegle tutorial", "how does Pomegle work", ...BRAND.name.toLowerCase().split(" ")],
  path: "/how-to-use-pomegle",
});

const STEPS = [
  {
    num: 1,
    title: "Visit Pomegle",
    description: "Open your web browser and go to pomegle.com. No app download needed.",
    icon: Video,
  },
  {
    num: 2,
    title: "Allow Camera Access",
    description: "When prompted, allow camera and microphone access. This is required for video chat.",
    icon: Video,
  },
  {
    num: 3,
    title: "Enter Your Name",
    description: "Type any name you want (or leave it blank). You can use any name - it's anonymous.",
    icon: User,
  },
  {
    num: 4,
    title: "Start Chatting",
    description: "Click 'Start Chatting' and you'll be connected to a random stranger. Say hello!",
    icon: Zap,
  },
];

const FAQS = [
  {
    question: "How do I start using Pomegle?",
    answer: "Just visit pomegle.com in your browser, allow camera access, enter a name, and click start. No registration needed!",
  },
  {
    question: "Do I need to download an app to use Pomegle?",
    answer: "No, Pomegle works directly in your web browser. No app download or installation required.",
  },
  {
    question: "What do I need to use Pomegle?",
    answer: "You need a device with a camera and microphone (phone, tablet, or computer), and a web browser. That's it!",
  },
  {
    question: "Can I use Pomegle on my phone?",
    answer: "Yes! Pomegle works on iPhone, Android, and tablets. Just open your mobile browser and visit pomegle.com.",
  },
];

export default function HowToUsePomeglePage() {
  const pageUrl = `${BRAND.url}/how-to-use-pomegle`;
  
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <FAQJsonLd faqs={FAQS} />
      
      {/* Breadcrumb Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BRAND.url },
          { name: "How to Use Pomegle", url: pageUrl },
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
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          How to Use {BRAND.name}
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          A simple guide to get started with random video chat on {BRAND.name}.
        </p>
      </section>

      {/* Steps */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto space-y-6">
          {STEPS.map((step) => (
            <div key={step.num} className="flex gap-4 p-6 bg-[#141414] rounded-xl border border-white/5">
              <div className="w-12 h-12 bg-primary text-gray-900 rounded-full flex items-center justify-center font-bold shrink-0">
                {step.num}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">{step.title}</h2>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Tips for Better Chats</h2>
          <div className="space-y-4 text-gray-400">
            <p>• <strong className="text-white">Good lighting helps:</strong> Make sure your face is well-lit so people can see you clearly.</p>
            <p>• <strong className="text-white">Check your connection:</strong> A stable internet connection ensures smooth video quality.</p>
            <p>• <strong className="text-white">Be respectful:</strong> Treat others how you'd want to be treated.</p>
            <p>• <strong className="text-white">Skip if needed:</strong> If a conversation isn't working, feel free to skip to the next person.</p>
            <p>• <strong className="text-white">Have fun:</strong> Random video chat is about meeting new people and having interesting conversations.</p>
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
        <h2 className="text-2xl font-bold mb-4">Ready to Start?</h2>
        <p className="text-gray-400 mb-8">Now that you know how it works, give {BRAND.name} a try!</p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Start Chatting <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

