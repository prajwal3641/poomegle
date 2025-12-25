# Pomegle SEO Module

This folder contains all SEO-related configuration and utilities for the Pomegle application.

## 📁 File Structure

```
lib/seo/
├── index.ts           # Central export file
├── config.ts          # Brand constants, keywords, and structured data
├── metadata.ts        # Metadata generation helpers
├── structured-data.tsx # React components for JSON-LD structured data
└── README.md          # This file
```

## 🚀 Quick Start

### Import from the central module:

```typescript
import { 
  BRAND,                    // Brand constants (name, URL, etc.)
  generatePageMetadata,     // Generate metadata for any page
  HomeStructuredData,       // Pre-built structured data components
} from "@/lib/seo";
```

## 📝 Usage Examples

### 1. Adding metadata to a page:

```typescript
// app/my-page/page.tsx
import type { Metadata } from "next";
import { generatePageMetadata, BRAND } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: `My Page Title | ${BRAND.name}`,
  description: "Description under 160 characters",
  path: "/my-page",
  keywords: ["keyword1", "keyword2"],
});
```

### 2. Adding structured data:

```typescript
// app/my-page/page.tsx
import { BreadcrumbJsonLd, FAQJsonLd } from "@/lib/seo/structured-data";
import { BRAND } from "@/lib/seo";

export default function MyPage() {
  const breadcrumbs = [
    { name: "Home", url: BRAND.url },
    { name: "My Page", url: `${BRAND.url}/my-page` },
  ];

  const faqs = [
    { question: "What is this?", answer: "This is the answer." },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <FAQJsonLd faqs={faqs} />
      {/* Page content */}
    </>
  );
}
```

### 3. Using pre-configured metadata:

```typescript
import { homeMetadata, blogMetadata, guidelinesMetadata } from "@/lib/seo";

// These are ready-to-use metadata objects for common pages
export const metadata = homeMetadata;
```

## 🎯 SEO Strategy

### Content Structure (Topic Clusters)

The app follows a pillar/cluster content strategy:

1. **Pillar Pages** (High Authority):
   - `/omegle-alternative` - Main landing for "omegle alternative" keywords
   - `/random-video-chat` - Main landing for video chat keywords
   - `/talk-to-strangers` - Main landing for social keywords

2. **Cluster Pages** (Supporting Content):
   - `/blog/*` - Individual articles that link to pillar pages
   - `/compare/*` - Comparison pages for competitor keywords

3. **Internal Linking**:
   - Every blog post should link to relevant pillar pages
   - Pillar pages link to each other
   - Comparison pages link to the home page

### Keyword Targets

Keywords are organized in `config.ts`:

- `SEO_KEYWORDS.omegleAlternative` - Omegle replacement terms
- `SEO_KEYWORDS.randomVideoChat` - Video chat terms
- `SEO_KEYWORDS.talkToStrangers` - Social connection terms
- `SEO_KEYWORDS.competitors` - Competitor comparison terms
- `SEO_KEYWORDS.longTail` - Long-tail, easier-to-rank terms

### Structured Data Types

The module supports these Schema.org types:

- `WebApplication` - For the main app
- `Organization` - Brand information
- `FAQPage` - FAQ sections (great for featured snippets)
- `Article` - Blog posts
- `BreadcrumbList` - Navigation breadcrumbs

## 🔧 Configuration

### Changing the Brand Name

Update `BRAND` in `config.ts`:

```typescript
export const BRAND = {
  name: "Pomegle",      // Change this
  domain: "pomegle.com",
  url: "https://pomegle.com",
  // ...
};
```

All other files will automatically use the new name.

### Adding New Keywords

Add to the appropriate category in `config.ts`:

```typescript
export const SEO_KEYWORDS = {
  primary: [
    "existing keyword",
    "new keyword",  // Add here
  ],
  // ...
};
```

### Creating New Comparison Pages

1. Add competitor data in `config.ts`:

```typescript
export const COMPETITORS = {
  // ...
  newCompetitor: {
    name: "New Competitor",
    slug: "new-competitor",
    description: "Description here",
    pros: ["Pro 1", "Pro 2"],
    cons: ["Con 1", "Con 2"],
  },
};
```

2. The dynamic route at `/compare/[competitor]` will automatically generate the page.

## 📊 Monitoring

### Google Search Console

After deploying, submit:
- Sitemap: `https://pomegle.com/sitemap.xml`
- Check indexed pages regularly
- Monitor keyword rankings

### Key Metrics to Track

- Organic traffic to pillar pages
- Keyword rankings for target terms
- Click-through rates from search results
- Page speed (Core Web Vitals)

## 🔗 Related Files

- `app/sitemap.ts` - Dynamic sitemap generation
- `app/robots.ts` - Robots.txt configuration
- `next.config.ts` - SEO-related redirects and headers

## 📚 SEO Best Practices Implemented

1. ✅ Unique title and description for each page
2. ✅ Structured data (JSON-LD) for rich results
3. ✅ Semantic HTML structure
4. ✅ Internal linking strategy
5. ✅ Mobile-friendly design
6. ✅ Fast page loads (SSG/SSR)
7. ✅ XML sitemap
8. ✅ Robots.txt
9. ✅ Canonical URLs
10. ✅ Open Graph and Twitter cards

