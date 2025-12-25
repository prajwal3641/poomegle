/**
 * Dynamic Comparison Page
 */

import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BRAND, COMPETITORS, generateComparisonMetadata } from "@/lib/seo";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/lib/seo/structured-data";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Check, X, ArrowRight } from "lucide-react";

type CompetitorKey = keyof typeof COMPETITORS;

// Route segment config - ensure static generation
export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate daily (ISR)

function findCompetitorBySlug(slug: string) {
  return Object.entries(COMPETITORS).find(([, c]) => c.slug === slug);
}

export async function generateStaticParams() {
  return Object.keys(COMPETITORS).map((key) => ({
    competitor: COMPETITORS[key as CompetitorKey].slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ competitor: string }> }): Promise<Metadata> {
  const { competitor: slug } = await params;
  const entry = findCompetitorBySlug(slug);
  if (!entry) return { title: "Not Found" };
  
  const [, comp] = entry;
  return generateComparisonMetadata(comp.name, comp.slug);
}

// Comparison data
const DATA: Record<string, {
  features: Array<{ name: string; us: boolean | string; them: boolean | string }>;
  verdict: string;
}> = {
  omegle: {
    features: [
      { name: "Currently active", us: true, them: false },
      { name: "Free", us: true, them: true },
      { name: "No registration", us: true, them: true },
      { name: "Modern UI", us: true, them: false },
      { name: "Mobile friendly", us: true, them: "Limited" },
    ],
    verdict: "Omegle is dead. We're alive. That's the main difference.",
  },
  ometv: {
    features: [
      { name: "Free", us: true, them: "Freemium" },
      { name: "No registration", us: true, them: false },
      { name: "No ads", us: true, them: false },
      { name: "Web-based", us: true, them: true },
      { name: "Mobile apps", us: "Web only", them: true },
    ],
    verdict: "OmeTV has apps, but requires signup and shows ads. We don't.",
  },
  chatroulette: {
    features: [
      { name: "Free", us: true, them: true },
      { name: "No registration", us: true, them: true },
      { name: "Modern interface", us: true, them: false },
      { name: "Mobile friendly", us: true, them: "Limited" },
      { name: "Good moderation", us: true, them: "Questionable" },
    ],
    verdict: "Chatroulette pioneered random chat but hasn't evolved. We have.",
  },
  "monkey-app": {
    features: [
      { name: "Free", us: true, them: true },
      { name: "No download", us: true, them: false },
      { name: "Works on desktop", us: true, them: false },
      { name: "No registration", us: true, them: false },
      { name: "Fun filters", us: "Coming", them: true },
    ],
    verdict: "Monkey is mobile-only. We work everywhere.",
  },
  "emerald-chat": {
    features: [
      { name: "Free", us: true, them: "Freemium" },
      { name: "No registration", us: true, them: false },
      { name: "Interest matching", us: "Coming", them: true },
      { name: "Instant access", us: true, them: false },
    ],
    verdict: "Emerald has interest matching but locks features behind signup. We keep it simple.",
  },
  chathub: {
    features: [
      { name: "Free", us: true, them: true },
      { name: "No registration", us: true, them: true },
      { name: "Reliable connections", us: true, them: "Unreliable" },
      { name: "Consistent quality", us: true, them: false },
    ],
    verdict: "ChatHub aggregates multiple sources but suffers from connection issues. We provide direct, reliable connections.",
  },
  chatspin: {
    features: [
      { name: "Free", us: true, them: "Freemium" },
      { name: "No registration", us: true, them: false },
      { name: "No ads", us: true, them: false },
      { name: "Location filters", us: "Coming", them: true },
    ],
    verdict: "Chatspin has filters but requires signup and shows ads. We're free and no-signup.",
  },
  shagle: {
    features: [
      { name: "Free", us: true, them: "Freemium" },
      { name: "No registration", us: true, them: false },
      { name: "No ads", us: true, them: false },
      { name: "Verified users", us: "Moderation", them: "Limited" },
    ],
    verdict: "Shagle offers filters but has ads and requires payment for better features. We're completely free.",
  },
  camsurf: {
    features: [
      { name: "Free", us: true, them: true },
      { name: "No registration", us: true, them: false },
      { name: "Fast connections", us: true, them: "Slow" },
      { name: "Modern interface", us: true, them: false },
    ],
    verdict: "CamSurf is free but requires signup and has slower connections. We're instant and no-signup.",
  },
};

export default async function ComparisonPage({ params }: { params: Promise<{ competitor: string }> }) {
  const { competitor: slug } = await params;
  const entry = findCompetitorBySlug(slug);
  
  if (!entry) notFound();
  
  const [, comp] = entry;
  const data = DATA[slug];
  
  if (!data) notFound();

  const faqs = [
    {
      question: `Is ${BRAND.name} better than ${comp.name}?`,
      answer: data.verdict,
    },
    {
      question: `Is ${BRAND.name} free?`,
      answer: `Yes, ${BRAND.name} is completely free with no premium tiers.`,
    },
  ];

  const comparisonUrl = `${BRAND.url}/compare/${comp.slug}`;

  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <FAQJsonLd faqs={faqs} />
      
      {/* Breadcrumb Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BRAND.url },
          { name: "Compare", url: `${BRAND.url}/compare` },
          { name: `${BRAND.name} vs ${comp.name}`, url: comparisonUrl },
        ]}
      />
      
      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="text-2xl font-display tracking-wide -rotate-2 hover:rotate-0 transition-transform">
          {BRAND.name.toUpperCase()}
        </Link>
        <Link href="/compare" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> All Comparisons
        </Link>
      </nav>

      {/* Hero */}
      <section className="px-6 py-16 max-w-3xl mx-auto text-center">
        <p className="text-primary text-sm uppercase tracking-widest mb-4">Comparison</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {BRAND.name} vs {comp.name}
        </h1>
        <p className="text-gray-400">{comp.description}</p>
      </section>

      {/* Table */}
      <section className="px-6 pb-12">
        <div className="max-w-2xl mx-auto overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-2 font-medium">Feature</th>
                <th className="text-center py-3 px-2 font-medium text-primary">{BRAND.name}</th>
                <th className="text-center py-3 px-2 font-medium text-gray-500">{comp.name}</th>
              </tr>
            </thead>
            <tbody>
              {data.features.map((f, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-3 px-2">{f.name}</td>
                  <td className="py-3 px-2 text-center">
                    {typeof f.us === "boolean" ? (
                      f.us ? <Check className="w-4 h-4 text-green-500 mx-auto" /> : <X className="w-4 h-4 text-red-500 mx-auto" />
                    ) : (
                      <span className="text-gray-400">{f.us}</span>
                    )}
                  </td>
                  <td className="py-3 px-2 text-center">
                    {typeof f.them === "boolean" ? (
                      f.them ? <Check className="w-4 h-4 text-green-500 mx-auto" /> : <X className="w-4 h-4 text-red-500 mx-auto" />
                    ) : (
                      <span className="text-gray-400">{f.them}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Verdict */}
      <section className="px-6 py-12 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4">The verdict</h2>
          <p className="text-gray-400">{data.verdict}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 border-t border-white/5 text-center">
        <p className="text-gray-400 mb-6">See for yourself.</p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Try {BRAND.name} <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Other comparisons */}
      <section className="px-6 py-12 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm text-gray-500 mb-4">Other comparisons</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(COMPETITORS)
              .filter(([, c]) => c.slug !== slug)
              .map(([key, c]) => (
                <Link
                  key={key}
                  href={`/compare/${c.slug}`}
                  className="text-sm px-3 py-1 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  vs {c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="px-6 py-12 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4">Learn More</h2>
          <div className="space-y-2 text-sm text-gray-400">
            <p>
              For more information about video chat platforms and online communication:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                <a 
                  href="https://en.wikipedia.org/wiki/Video_telephony" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Video Telephony - Wikipedia
                </a>
              </li>
              <li>
                <a 
                  href="https://en.wikipedia.org/wiki/Omegle" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Omegle - Wikipedia
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
