import type { Metadata } from "next";
import { BRAND, guidelinesMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/lib/seo/structured-data";
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
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <GuidelinesContent />
    </>
  );
}
