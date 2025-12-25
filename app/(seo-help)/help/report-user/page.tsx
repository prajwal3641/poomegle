/**
 * Help Page - Report User
 * Target keywords: "report Pomegle user"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, ArrowLeft, AlertTriangle } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `How to Report Offensive Users on ${BRAND.name}`,
  description: `Learn how to report users who violate community guidelines on ${BRAND.name}. Help keep the platform safe for everyone.`,
  keywords: ["report Pomegle user", "report inappropriate behavior", "chat app reporting"],
  path: "/help/report-user",
});

const FAQS = [
  {
    question: "How do I report a user on Pomegle?",
    answer: `If you encounter a user violating community guidelines, skip them first to end the connection, then use ${BRAND.name}'s report feature if available. Provide details about what happened to help with moderation.`,
  },
  {
    question: "What should I report?",
    answer: "Report inappropriate content, harassment, illegal activity, requests for personal information, requests for money, or any behavior that violates community guidelines.",
  },
];

export default function ReportUserPage() {
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
          <AlertTriangle className="w-5 h-5" />
          <span className="text-sm uppercase tracking-widest">Reporting</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          How to Report Users
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Help keep {BRAND.name} safe by reporting inappropriate behavior.
        </p>
      </section>

      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4">Step 1: Skip First</h2>
            <p className="text-gray-400">
              If someone is being inappropriate, skip/block them immediately to end the connection. 
              Your safety comes first - don't continue the conversation while reporting.
            </p>
          </div>

          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4">Step 2: Report</h2>
            <p className="text-gray-400 mb-4">
              Use the report feature (usually found in settings or after skipping) to report the user. 
              Provide as much detail as possible:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
              <li>What inappropriate behavior occurred</li>
              <li>When it happened (approximate time)</li>
              <li>Any other relevant details</li>
            </ul>
          </div>

          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4">What to Report</h2>
            <div className="space-y-2 text-gray-400">
              <p>• Inappropriate content or behavior</p>
              <p>• Harassment or bullying</p>
              <p>• Requests for personal information</p>
              <p>• Requests for money or financial details</p>
              <p>• Illegal activity</p>
              <p>• Any violation of community guidelines</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Why Reporting Matters</h2>
          <div className="space-y-4 text-gray-400">
            <p>
              Reporting helps keep the platform safe for everyone. When you report inappropriate behavior, 
              you help moderators identify and take action against users who violate guidelines.
            </p>
            <p>
              Your reports help protect other users from experiencing the same inappropriate behavior. 
              Even if you've already skipped someone, reporting helps prevent them from bothering others.
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

