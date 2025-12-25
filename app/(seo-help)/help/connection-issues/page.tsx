/**
 * Help Page - Connection Issues
 * Target keywords: "Pomegle connection issues"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/lib/seo/structured-data";
import { Footer } from "@/components/Footer";
import { ArrowRight, ArrowLeft, Wifi } from "lucide-react";

// Route segment config - ensure static generation
export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate daily (ISR)

export const metadata: Metadata = generatePageMetadata({
  title: `Why Can't I Connect to ${BRAND.name} or Chatroulette?`,
  description: `Troubleshooting guide for connection issues on ${BRAND.name} and other video chat platforms. Fix connection problems quickly.`,
  keywords: ["Pomegle connection issues", "can't connect to Pomegle", "video chat connection problems"],
  path: "/help/connection-issues",
});

const FAQS = [
  {
    question: "Why can't I connect to Pomegle?",
    answer: "Connection issues can be caused by internet problems, browser issues, or firewall settings. Check your internet connection, try refreshing the page, clear your browser cache, or try a different browser.",
  },
  {
    question: "What should I do if Pomegle won't connect?",
    answer: "Try refreshing the page, checking your internet connection, disabling browser extensions, clearing cache and cookies, or using a different browser. If problems persist, check if your firewall or network is blocking the connection.",
  },
  {
    question: "Is Pomegle down?",
    answer: "If you can't connect, first check your own connection and browser. If everything else works fine, the platform might be experiencing issues. Try again in a few minutes.",
  },
];

export default function ConnectionIssuesPage() {
  const pageUrl = `${BRAND.url}/help/connection-issues`;
  
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <FAQJsonLd faqs={FAQS} />
      
      {/* Breadcrumb Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BRAND.url },
          { name: "Help & Support", url: `${BRAND.url}/help` },
          { name: "Connection Issues", url: pageUrl },
        ]}
      />
      
      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="text-2xl font-display tracking-wide -rotate-2 hover:rotate-0 transition-transform">
          {BRAND.name.toUpperCase()}
        </Link>
        <Link href="/help" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Help
        </Link>
      </nav>

      {/* Hero */}
      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 text-primary mb-6">
          <Wifi className="w-5 h-5" />
          <span className="text-sm uppercase tracking-widest">Troubleshooting</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          Connection Issues
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Having trouble connecting? Here are the most common fixes.
        </p>
      </section>

      {/* Solutions */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto space-y-6">
          {[
            {
              title: "Check Your Internet Connection",
              description: "Make sure you have a stable internet connection. Try loading other websites to verify your connection is working.",
            },
            {
              title: "Refresh the Page",
              description: "Sometimes a simple page refresh (F5 or Ctrl+R) can fix connection issues. Try refreshing a few times.",
            },
            {
              title: "Clear Browser Cache",
              description: "Clear your browser's cache and cookies. This can resolve connection problems caused by cached data.",
            },
            {
              title: "Try a Different Browser",
              description: "If one browser isn't working, try another. Chrome, Firefox, Safari, and Edge all work with Pomegle.",
            },
            {
              title: "Disable Browser Extensions",
              description: "Some browser extensions can interfere with connections. Try disabling extensions temporarily to see if that helps.",
            },
            {
              title: "Check Firewall Settings",
              description: "Your firewall or antivirus might be blocking the connection. Check if Pomegle is allowed through your firewall.",
            },
          ].map((solution, i) => (
            <div key={i} className="p-6 bg-[#141414] rounded-xl border border-white/5">
              <h2 className="text-xl font-bold mb-3">{solution.title}</h2>
              <p className="text-gray-400">{solution.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
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

      {/* CTA */}
      <section className="px-6 py-16 border-t border-white/5 text-center">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Try {BRAND.name} <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

