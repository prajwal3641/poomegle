/**
 * SEO Page - Why Pomegle is Safe
 * Target keywords: "Pomegle safe privacy tips"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/lib/seo/structured-data";
import { Footer } from "@/components/Footer";
import { ArrowRight, Shield, Lock, Eye } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `Why ${BRAND.name} is Safe: Privacy & Safety Tips`,
  description: `Learn why ${BRAND.name} is safe for random video chat. Privacy features, safety measures, and tips to stay secure while chatting with strangers.`,
  keywords: ["Pomegle safe privacy tips", "is Pomegle safe", "safe video chat"],
  path: "/why-pomegle-is-safe",
});

const FAQS = [
  {
    question: "Is Pomegle safe to use?",
    answer: `${BRAND.name} implements safety features including moderation, user reporting, blocking capabilities, and privacy-first design. However, users should always follow safety best practices when chatting with strangers online.`,
  },
  {
    question: "How does Pomegle protect my privacy?",
    answer: `${BRAND.name} doesn't require registration, doesn't store conversations, uses encrypted connections, and doesn't collect personal information. You remain anonymous throughout your session.`,
  },
  {
    question: "What safety features does Pomegle have?",
    answer: `${BRAND.name} includes content moderation, NSFW filtering technology, user reporting systems, instant blocking/skipping, encrypted connections, and privacy-first design with no data collection.`,
  },
  {
    question: "Does Pomegle have an NSFW filter?",
    answer: `Yes, ${BRAND.name} uses NSFW filtering technology to detect and prevent inappropriate content. However, due to the nature of random video chat, users should still use block features if they encounter inappropriate content.`,
  },
  {
    question: "What is the age requirement for Pomegle?",
    answer: `${BRAND.name} is intended for users 18 years and older. We recommend parental guidance for younger users, as random video chat platforms can expose users to inappropriate content.`,
  },
];

const SAFETY_FEATURES = [
  {
    icon: Shield,
    title: "Content Moderation & NSFW Filter",
    description: "We actively moderate content and use NSFW filtering technology to detect and prevent inappropriate content. We take action against users who violate community guidelines.",
  },
  {
    icon: Lock,
    title: "No Data Collection",
    description: "We don't collect personal information, store conversations, or track your activity. You remain anonymous.",
  },
  {
    icon: Eye,
    title: "Encrypted Connections",
    description: "All connections use encryption to protect your privacy and security during video chats.",
  },
];

export default function WhyPomegleIsSafePage() {
  const pageUrl = `${BRAND.url}/why-pomegle-is-safe`;
  
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <FAQJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BRAND.url },
          { name: "Why Pomegle is Safe", url: pageUrl },
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
        <div className="inline-flex items-center gap-2 text-primary mb-6">
          <Shield className="w-5 h-5" />
          <span className="text-sm uppercase tracking-widest">Safety & Privacy</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          Why {BRAND.name} is Safe
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Privacy features and safety measures that protect you.
        </p>
      </section>

      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Safety Features</h2>
          <div className="space-y-4">
            {SAFETY_FEATURES.map((feature, i) => (
              <div key={i} className="p-6 bg-[#141414] rounded-xl border border-white/5">
                <div className="flex items-start gap-4">
                  <feature.icon className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Privacy Protection</h2>
          <div className="space-y-4 text-gray-400">
            <p>
              <strong className="text-white">No Registration:</strong> We don't ask for email, phone number, or any personal information. 
              Just visit and start chatting. Learn more about online privacy from the <a 
                href="https://www.ftc.gov/tips-advice/business-center/privacy-and-security" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >FTC Privacy Guidelines</a>.
            </p>
            <p>
              <strong className="text-white">No Data Storage:</strong> We don't store your conversations, video recordings, or chat logs. 
              Once you disconnect, the data is gone.
            </p>
            <p>
              <strong className="text-white">Encrypted Connections:</strong> All video and audio streams use encryption to protect your privacy. 
              For more on encryption, see <a 
                href="https://en.wikipedia.org/wiki/Encryption" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >Encryption on Wikipedia</a>.
            </p>
            <p>
              <strong className="text-white">Anonymous by Design:</strong> You choose what name to use (or none at all). Your real identity stays private.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Age Restrictions & Parental Guidance</h2>
          <div className="p-6 bg-primary/20 border border-primary/50 rounded-xl mb-6">
            <p className="text-lg text-gray-300">
              <strong className="text-white">{BRAND.name} is intended for users 18 years and older.</strong> Random video chat platforms can expose users to inappropriate content, and we recommend parental guidance for younger users.
            </p>
          </div>
          <div className="space-y-3 text-gray-400">
            <p>• <strong className="text-white">Age requirement:</strong> Users must be 18+ to use {BRAND.name}. We cannot verify ages, so parental supervision is recommended for minors.</p>
            <p>• <strong className="text-white">Parental guidance:</strong> Parents should discuss online safety with children, monitor usage, and consider whether random video chat is appropriate for their child's age.</p>
            <p>• <strong className="text-white">NSFW content:</strong> While we use NSFW filtering technology, random video chat platforms may still expose users to inappropriate content. Use block features immediately if needed.</p>
            <p>• <strong className="text-white">Digital well-being:</strong> Set time limits, take breaks, and prioritize your mental health. If random video chat becomes problematic, take a break.</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">How to Stay Safe While Using {BRAND.name}</h2>
          <div className="space-y-3 text-gray-400">
            <p>• <strong className="text-white">Never share personal information:</strong> Don't give out your address, phone number, email, or financial details</p>
            <p>• <strong className="text-white">Skip if uncomfortable:</strong> Use the skip button immediately if someone makes you feel unsafe</p>
            <p>• <strong className="text-white">Report inappropriate behavior:</strong> Help keep the platform safe by reporting users who violate guidelines</p>
            <p>• <strong className="text-white">Trust your instincts:</strong> If something feels wrong, skip immediately - don't second-guess yourself</p>
            <p>• <strong className="text-white">Don't send money:</strong> Never send money or share financial information with strangers</p>
            <p>• <strong className="text-white">Keep it anonymous:</strong> Remember that you don't know who you're talking to - stay anonymous</p>
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
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Start Chatting Safely <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <Footer />
    </div>
  );
}

