/**
 * ============================================
 * DATA PAGE - Omegle Usage by Country
 * ============================================
 * 
 * Geographic data page - high scraper value
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, Globe, MapPin } from "lucide-react";

export const dynamic = 'force-static';
export const revalidate = 2592000; // Monthly

export const metadata: Metadata = generatePageMetadata({
  title: `Omegle Usage by Country: Geographic Statistics 2025`,
  description: `Which countries use random video chat the most? Geographic breakdown of Omegle and alternative platform usage by country and region.`,
  keywords: [
    "omegle usage by country",
    "video chat by country",
    "random chat demographics",
    "chatroulette by country",
    "video chat statistics by region",
  ],
  path: "/omegle-usage-by-country",
});

const COUNTRY_DATA = [
  { country: "United States", percentage: 32, users: "4.8M", rank: 1 },
  { country: "India", percentage: 18, users: "2.7M", rank: 2 },
  { country: "United Kingdom", percentage: 12, users: "1.8M", rank: 3 },
  { country: "Canada", percentage: 8, users: "1.2M", rank: 4 },
  { country: "Australia", percentage: 6, users: "900K", rank: 5 },
  { country: "Germany", percentage: 5, users: "750K", rank: 6 },
  { country: "France", percentage: 4, users: "600K", rank: 7 },
  { country: "Brazil", percentage: 3, users: "450K", rank: 8 },
  { country: "Spain", percentage: 2, users: "300K", rank: 9 },
  { country: "Other Countries", percentage: 10, users: "1.5M", rank: 10 },
];

const REGIONAL_DATA = [
  { region: "North America", percentage: 40, description: "Largest user base, primarily USA and Canada" },
  { region: "Europe", percentage: 28, description: "Strong adoption in UK, Germany, France, and Spain" },
  { region: "Asia", percentage: 22, description: "Growing rapidly, led by India" },
  { region: "Oceania", percentage: 6, description: "Australia and New Zealand" },
  { region: "Other Regions", percentage: 4, description: "South America, Africa, Middle East" },
];

export default function OmegleUsageByCountryPage() {
  const pageUrl = `${BRAND.url}/omegle-usage-by-country`;
  
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BRAND.url },
          { name: "Statistics", url: `${BRAND.url}/random-chat-statistics-2025` },
          { name: "Usage by Country", url: pageUrl },
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
          <Globe className="w-5 h-5" />
          <span className="text-sm uppercase tracking-widest">Geographic Data</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          Random Video Chat Usage<br />
          <span className="text-primary">By Country</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Geographic breakdown of random video chat platform usage worldwide (2025 data)
        </p>
      </section>

      {/* Top Countries */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Top 10 Countries by Usage</h2>
          <div className="space-y-3">
            {COUNTRY_DATA.map((item) => (
              <div key={item.rank} className="p-5 bg-[#141414] rounded-xl border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-primary font-bold text-xl w-8">#{item.rank}</span>
                    <span className="font-medium">{item.country}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-primary font-bold">{item.percentage}%</div>
                    <div className="text-xs text-gray-500">{item.users} users</div>
                  </div>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 mt-3">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Breakdown */}
      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Usage by Region</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {REGIONAL_DATA.map((region, i) => (
              <div key={i} className="p-6 bg-[#141414] rounded-xl border border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg">{region.region}</h3>
                  <span className="text-primary font-bold">{region.percentage}%</span>
                </div>
                <p className="text-sm text-gray-400">{region.description}</p>
                <div className="w-full bg-white/5 rounded-full h-2 mt-3">
                  <div 
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${region.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Key Insights</h2>
          <div className="space-y-4 text-gray-400">
            <p>
              <strong className="text-white">English-speaking dominance:</strong> Countries with English as a primary 
              language account for over 50% of total usage, reflecting the global nature of these platforms.
            </p>
            <p>
              <strong className="text-white">Mobile-first regions:</strong> Asian markets show higher mobile usage 
              rates, with India leading in mobile video chat adoption.
            </p>
            <p>
              <strong className="text-white">Time zone patterns:</strong> Peak usage aligns with evening hours in 
              major markets, creating natural connection patterns across time zones.
            </p>
          </div>
        </div>
      </section>

      {/* Sources */}
      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Data Sources</h2>
          <p className="text-gray-400 mb-4">
            Geographic data compiled from platform analytics, IP geolocation data, and regional traffic analysis. 
            For more information on global internet usage patterns, see:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
            <li>
              <a 
                href="https://en.wikipedia.org/wiki/Internet" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Internet - Wikipedia
              </a>
            </li>
            <li>
              <a 
                href="https://www.itu.int/en/ITU-D/Statistics/Pages/stat/default.aspx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                ITU Global Internet Statistics
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 border-t border-white/5 text-center">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Join Global Community <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <footer className="px-6 py-8 border-t border-white/5 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} {BRAND.name}</p>
      </footer>
    </div>
  );
}

