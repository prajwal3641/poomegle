/**
 * SEO Page - Why Did Omegle Shut Down
 * Target keywords: "why did Omegle shut down"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/lib/seo/structured-data";
import { Footer } from "@/components/Footer";
import { ArrowRight, Calendar, AlertCircle } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `Why Did Omegle Shut Down? (2025 Update)`,
  description: `Omegle shut down in November 2023 after 14 years. Learn why it closed and what the best alternatives are today.`,
  keywords: ["why did Omegle shut down", "Omegle shut down", "Omegle closed", "Omegle alternatives", ...BRAND.name.toLowerCase().split(" ")],
  path: "/why-did-omegle-shut-down",
});

const FAQS = [
  {
    question: "Why did Omegle shut down?",
    answer: "Omegle shut down in November 2023 after 14 years of operation. The founder cited ongoing challenges with content moderation and safety concerns as the main reasons for closing the platform.",
  },
  {
    question: "When did Omegle shut down?",
    answer: "Omegle officially shut down on November 8, 2023, after operating since 2009.",
  },
  {
    question: "Is Omegle coming back?",
    answer: "There's no indication that Omegle will return. The founder permanently closed the service, and the website now displays a farewell message.",
  },
  {
    question: "What happened to Omegle users?",
    answer: "Omegle users have migrated to alternatives like Pomegle, OmeTV, Chatroulette, and other random video chat platforms.",
  },
];

export default function WhyDidOmegleShutDownPage() {
  const pageUrl = `${BRAND.url}/why-did-omegle-shut-down`;
  
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <FAQJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BRAND.url },
          { name: "Why Did Omegle Shut Down", url: pageUrl },
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
      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 text-primary mb-6">
          <Calendar className="w-5 h-5" />
          <span className="text-sm uppercase tracking-widest">November 2023</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          Why Did Omegle Shut Down?
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          After 14 years, Omegle closed its doors. Here's what happened and what it means for random video chat.
        </p>
      </section>

      {/* Main Content */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto space-y-6 text-gray-400 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">The End of an Era</h2>
            <p>
              On November 8, 2023, Omegle shut down permanently after operating for 14 years. The platform, 
              which launched in 2009, was one of the first random video chat services and had millions of users worldwide.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Why It Closed</h2>
            <p>
              Omegle's founder, Leif K-Brooks, cited several reasons for shutting down the platform. 
              For more context, see the <a 
                href="https://en.wikipedia.org/wiki/Omegle" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >Omegle Wikipedia article</a> and <a 
                href="https://www.ftc.gov/tips-advice/business-center/privacy-and-security" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >FTC privacy guidelines</a>.
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li><strong className="text-white">Moderation challenges:</strong> Difficulty keeping the platform safe and appropriate for all users</li>
              <li><strong className="text-white">Legal pressures:</strong> Ongoing lawsuits and legal challenges related to content on the platform</li>
              <li><strong className="text-white">Financial strain:</strong> The cost of maintaining and moderating the service became unsustainable</li>
              <li><strong className="text-white">Safety concerns:</strong> Challenges with ensuring user safety in an anonymous environment</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">The Aftermath</h2>
            <p>
              When Omegle shut down, millions of users were left looking for alternatives. This created a huge 
              opportunity for platforms like {BRAND.name}, OmeTV, Chatroulette, and others to fill the void.
            </p>
            <p>
              Many Omegle alternatives have learned from Omegle's challenges and implemented better moderation, 
              improved safety features, and more sustainable business models.
            </p>
          </div>

          <div className="p-6 bg-primary/20 border border-primary/50 rounded-xl">
            <h2 className="text-2xl font-bold text-white mb-4">What's Next?</h2>
            <p>
              While Omegle is gone, random video chat is here to stay. Platforms like {BRAND.name} continue 
              the legacy of connecting strangers from around the world, but with modern features, better safety, 
              and a sustainable approach.
            </p>
          </div>
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
      <section className="px-6 py-20 border-t border-white/5 text-center">
        <h2 className="text-2xl font-bold mb-4">Looking for an Omegle Replacement?</h2>
        <p className="text-gray-400 mb-8">{BRAND.name} offers the same random video chat experience, but better.</p>
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

