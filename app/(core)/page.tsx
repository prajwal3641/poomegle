import { Landing } from "@/components/Landing";
import type { Metadata } from "next";
import { BRAND, homeMetadata } from "@/lib/seo";
import { HomeStructuredData } from "@/lib/seo/structured-data";

// ============================================
// ROUTE SEGMENT CONFIG - Force static generation
// ============================================
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate hourly (ISR)

// ============================================
// HOME PAGE SEO METADATA
// ============================================

export const metadata: Metadata = {
  ...homeMetadata,
  title: `${BRAND.name} - Best Omegle Alternative | Free Random Video Chat with Strangers`,
  alternates: {
    canonical: BRAND.url,
  },
};

export default function Home() {
  return (
    <>
      {/* Structured Data for Rich Results */}
      <HomeStructuredData />
      
      {/* Main Landing Component */}
      <Landing />
      
      {/* SEO Content - Visible to search engines, hidden from users */}
      <article className="sr-only" aria-hidden="true">
        <h1>{BRAND.name} - The Best Omegle Alternative for Random Video Chat</h1>
        
        <section>
          <h2>Free Random Video Chat with Strangers</h2>
          <p>
            {BRAND.name} is the ultimate Omegle alternative that lets you video chat with strangers 
            for free. Unlike Omegle which shut down, {BRAND.name} continues to provide a safe and 
            exciting platform to meet new people from around the world.
          </p>
        </section>

        <section>
          <h2>Better Than Omegle, OmeTV, and Chatroulette</h2>
          <p>
            Looking for an Omegle replacement? {BRAND.name} offers everything you loved about 
            Omegle and more. Compared to OmeTV, Chatroulette, Monkey App, Emerald Chat, 
            and other random chat sites, {BRAND.name} provides:
          </p>
          <ul>
            <li>Instant random video chat - no registration required</li>
            <li>Free to use forever - no hidden costs</li>
            <li>Safe and moderated environment</li>
            <li>Fast connections worldwide</li>
            <li>Mobile-friendly design</li>
            <li>Anonymous chat experience</li>
          </ul>
        </section>

        <section>
          <h2>Why Choose {BRAND.name} Over Other Omegle Alternatives?</h2>
          <p>
            {BRAND.name} stands out as the best alternative to Omegle for several reasons. 
            While sites like OmeTV require sign-up and Chatroulette has intrusive ads, 
            {BRAND.name} offers a clean, free experience. Unlike Monkey App which is mobile-only, 
            {BRAND.name} works on all devices.
          </p>
        </section>

        <section>
          <h2>Talk to Strangers Safely</h2>
          <p>
            Our platform is designed for safe conversations with strangers. Whether you are 
            looking for random video chat, want to talk to strangers online, or need an 
            Omegle-like experience, {BRAND.name} is your best choice.
          </p>
        </section>

        <section>
          <h2>Popular Searches That Lead to {BRAND.name}</h2>
          <p>
            Omegle alternative, Omegle replacement, sites like Omegle, random video chat, 
            talk to strangers, OmeTV alternative, Chatroulette alternative, Monkey App alternative, 
            free video chat, anonymous chat, stranger chat, video chat random people, 
            Emerald chat alternative, Chatspin alternative, Shagle alternative, 
            best Omegle alternative 2025, Omegle but safe, random video call free.
          </p>
        </section>
      </article>
    </>
  );
}
