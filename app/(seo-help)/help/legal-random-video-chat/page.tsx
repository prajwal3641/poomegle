/**
 * Help Page - Legal Random Video Chat
 * Target keywords: "legal random video chat"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, ArrowLeft, Scale } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `Is Random Video Chat Legal and Safe?`,
  description: `Learn about the legality and safety of random video chat platforms. Legal considerations and safety tips for using video chat with strangers.`,
  keywords: ["legal random video chat", "is video chat legal", "safe video chat"],
  path: "/help/legal-random-video-chat",
});

const FAQS = [
  {
    question: "Is random video chat legal?",
    answer: "Yes, random video chat is legal in most countries. However, illegal activities conducted through video chat (harassment, illegal content sharing, etc.) remain illegal. Always follow local laws and platform guidelines.",
  },
  {
    question: "Is random video chat safe?",
    answer: "Random video chat can be safe when used responsibly. Use platforms with moderation, never share personal information, skip inappropriate users, and follow safety guidelines. However, like any online interaction, there are risks, so use caution.",
  },
];

export default function LegalRandomVideoChatPage() {
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
          <Scale className="w-5 h-5" />
          <span className="text-sm uppercase tracking-widest">Legal & Safety</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          Is Random Video Chat<br />
          <span className="text-primary">Legal and Safe?</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Understanding the legal and safety aspects of random video chat.
        </p>
      </section>

      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4">Legality</h2>
            <div className="space-y-3 text-gray-400">
              <p>
                Random video chat platforms themselves are legal in most countries. The platforms provide 
                a service for connecting people - similar to social media or messaging apps.
              </p>
              <p>
                However, <strong className="text-white">illegal activities conducted through video chat remain illegal.</strong> 
                This includes harassment, sharing illegal content, fraud, or any other activities that violate local laws.
              </p>
              <p>
                Always follow your local laws and the platform's community guidelines. The platform being legal 
                doesn't make illegal activities legal.
              </p>
            </div>
          </div>

          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4">Safety Considerations</h2>
            <div className="space-y-3 text-gray-400">
              <p>
                Random video chat can be safe when used responsibly:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use platforms with moderation and safety features</li>
                <li>Never share personal information</li>
                <li>Skip inappropriate users immediately</li>
                <li>Report violations</li>
                <li>Follow safety guidelines</li>
              </ul>
              <p className="mt-4">
                However, like any online interaction with strangers, there are inherent risks. 
                Use common sense and be cautious.
              </p>
            </div>
          </div>

          <div className="p-6 bg-primary/20 border border-primary/50 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Age Considerations</h2>
            <p className="text-gray-300">
              Most random video chat platforms have age requirements (typically 18+). 
              Parents should be aware that these platforms may contain adult content and are not suitable for minors. 
              Always check platform terms and age requirements before use.
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

