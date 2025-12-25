/**
 * ============================================
 * POMEGLE STRUCTURED DATA COMPONENTS
 * ============================================
 * 
 * React components for injecting JSON-LD structured data.
 * Use these in your layout.tsx or page.tsx files.
 */

import { STRUCTURED_DATA, DEFAULT_FAQS, BRAND } from "./config";

// ============================================
// JSON-LD SCRIPT COMPONENT
// ============================================

interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Generic JSON-LD component
 * Renders structured data as a script tag
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ============================================
// PRE-CONFIGURED STRUCTURED DATA COMPONENTS
// ============================================

/**
 * WebApplication structured data
 * Add to the main app pages
 */
export function WebApplicationJsonLd() {
  return <JsonLd data={STRUCTURED_DATA.webApplication} />;
}

/**
 * Organization structured data
 * Add to the root layout
 */
export function OrganizationJsonLd() {
  return <JsonLd data={STRUCTURED_DATA.organization} />;
}

/**
 * Default FAQ structured data
 * Add to home page and landing pages
 */
export function DefaultFAQJsonLd() {
  return <JsonLd data={STRUCTURED_DATA.createFAQ(DEFAULT_FAQS)} />;
}

/**
 * Custom FAQ structured data
 */
export function FAQJsonLd({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  return <JsonLd data={STRUCTURED_DATA.createFAQ(faqs)} />;
}

/**
 * Breadcrumb structured data
 */
export function BreadcrumbJsonLd({ items }: { items: Array<{ name: string; url: string }> }) {
  return <JsonLd data={STRUCTURED_DATA.createBreadcrumbs(items)} />;
}

/**
 * Article structured data for blog posts
 */
export function ArticleJsonLd({ article }: { 
  article: {
    title: string;
    description: string;
    url: string;
    datePublished: string;
    dateModified: string;
    author: string;
    image?: string;
  }
}) {
  return <JsonLd data={STRUCTURED_DATA.createArticle(article)} />;
}

/**
 * Breadcrumb structured data helper
 * Use this on nested pages for better SEO
 */
export function createBreadcrumbsJsonLd(items: Array<{ name: string; url: string }>) {
  return <BreadcrumbJsonLd items={items} />;
}

/**
 * SoftwareApplication structured data (alternative to WebApplication)
 */
export function SoftwareApplicationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": BRAND.name,
    "operatingSystem": "Web",
    "applicationCategory": "CommunicationApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "15000",
    },
  };
  return <JsonLd data={data} />;
}

/**
 * VideoObject structured data for video content pages
 */
export function VideoObjectJsonLd({ video }: {
  video: {
    name: string;
    description: string;
    thumbnailUrl: string;
    uploadDate: string;
    duration?: string;
  }
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.name,
    "description": video.description,
    "thumbnailUrl": video.thumbnailUrl,
    "uploadDate": video.uploadDate,
    "duration": video.duration,
    "publisher": {
      "@type": "Organization",
      "name": BRAND.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${BRAND.url}/logo.png`,
      },
    },
  };
  return <JsonLd data={data} />;
}

// ============================================
// COMBINED STRUCTURED DATA FOR LAYOUTS
// ============================================

/**
 * All base structured data for root layout
 * Includes Organization and WebApplication schemas
 */
export function BaseStructuredData() {
  return (
    <>
      <OrganizationJsonLd />
      <WebApplicationJsonLd />
    </>
  );
}

/**
 * Home page structured data
 * Includes base + FAQ schemas
 */
export function HomeStructuredData() {
  return (
    <>
      <BaseStructuredData />
      <DefaultFAQJsonLd />
    </>
  );
}

