import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, guidelinesMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/lib/seo/structured-data";
import { Footer } from "@/components/Footer";
import GuidelinesContent from "./GuidelinesContent";

// Route segment config - ensure static generation
export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate daily (ISR)

// ============================================
// GUIDELINES PAGE SEO METADATA
// ============================================

export const metadata: Metadata = {
  ...guidelinesMetadata,
  title: `Community Guidelines | ${BRAND.name}`,
  description: `Community guidelines and rules for using ${BRAND.name}. Learn how to chat safely and respectfully with strangers.`,
};

export default function GuidelinesPage() {
  const breadcrumbs = [
    { name: "Home", url: BRAND.url },
    { name: "Guidelines", url: `${BRAND.url}/guidelines` },
  ];

  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <BreadcrumbJsonLd items={breadcrumbs} />
      
      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="text-2xl font-display tracking-wide -rotate-2 hover:rotate-0 transition-transform">
          {BRAND.name.toUpperCase()}
        </Link>
        <Link href="/" className="bg-primary text-gray-900 font-bold text-sm px-4 py-2 rounded-lg hover:scale-105 transition-transform">
          Start Chat
        </Link>
      </nav>
      
      <GuidelinesContent />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
