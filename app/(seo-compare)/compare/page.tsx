/**
 * Comparison Hub Page
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, COMPETITORS, generatePageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/lib/seo/structured-data";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";

// Route segment config - ensure static generation
export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate daily (ISR)

export const metadata: Metadata = generatePageMetadata({
  title: `Compare ${BRAND.name} vs Competitors`,
  description: `See how ${BRAND.name} stacks up against OmeTV, Chatroulette, and other random video chat sites.`,
  path: "/compare",
});

export default function ComparePage() {
  const pageUrl = `${BRAND.url}/compare`;
  
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      {/* Breadcrumb Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BRAND.url },
          { name: "Compare", url: pageUrl },
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
      <section className="px-6 py-16 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-display mb-4">Compare</h1>
        <p className="text-gray-400">
          Honest comparisons. We tell you what&apos;s good and what&apos;s not - including about ourselves.
        </p>
      </section>

      {/* Comparisons */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto space-y-4">
          {Object.entries(COMPETITORS).map(([key, comp]) => (
            <Link
              key={key}
              href={`/compare/${comp.slug}`}
              className="block p-5 bg-[#141414] rounded-xl border border-white/5 hover:border-primary/50 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-medium group-hover:text-primary transition-colors">
                    {BRAND.name} vs {comp.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{comp.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
