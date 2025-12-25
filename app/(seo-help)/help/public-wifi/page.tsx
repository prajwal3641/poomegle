/**
 * Help Page - Public Wi-Fi
 * Target keywords: "Pomegle public Wi-Fi"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, ArrowLeft, Wifi } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `Can I Use ${BRAND.name} on Public Wi-Fi Safely?`,
  description: `Learn about using ${BRAND.name} on public Wi-Fi networks. Safety tips and privacy considerations for video chat on public networks.`,
  keywords: ["Pomegle public Wi-Fi", "video chat public wifi", "safe public wifi"],
  path: "/help/public-wifi",
});

const FAQS = [
  {
    question: "Can I use Pomegle on public Wi-Fi safely?",
    answer: `${BRAND.name} uses encrypted connections, which provides some protection on public Wi-Fi. However, public Wi-Fi has inherent security risks. For additional privacy, consider using a VPN when on public networks.`,
  },
  {
    question: "Is it safe to video chat on public Wi-Fi?",
    answer: "Video chat platforms use encrypted connections, which helps protect your data. However, public Wi-Fi networks can still pose security risks. Use trusted networks when possible, and consider a VPN for additional protection.",
  },
];

export default function PublicWifiPage() {
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <FAQJsonLd faqs={FAQS} />
      
      <nav className="px-6 py-5 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="text-2xl font-display tracking-wide -rotate-2 hover:rotate-0 transition-transform">
          {BRAND.name.toUpperCase()}
        </Link>
        <Link href="/help" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Help
        </Link>
      </nav>

      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 text-primary mb-6">
          <Wifi className="w-5 h-5" />
          <span className="text-sm uppercase tracking-widest">Security</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          Using {BRAND.name}<br />
          <span className="text-primary">On Public Wi-Fi</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Safety considerations for video chat on public networks.
        </p>
      </section>

      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4">Encryption Protection</h2>
            <div className="space-y-3 text-gray-400">
              <p>
                {BRAND.name} uses encrypted connections (HTTPS/WSS), which means your video chat data is encrypted 
                as it travels over the network. This provides protection against basic interception on public Wi-Fi.
              </p>
              <p>
                However, public Wi-Fi networks still have inherent security risks that encryption alone doesn't fully address.
              </p>
            </div>
          </div>

          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4">Public Wi-Fi Risks</h2>
            <div className="space-y-3 text-gray-400">
              <p>Common risks on public Wi-Fi include:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Man-in-the-middle attacks</li>
                <li>Fake Wi-Fi networks (honeypots)</li>
                <li>Network monitoring by operators</li>
                <li>Potential IP address tracking</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4">Safety Tips</h2>
            <div className="space-y-3 text-gray-400">
              <p>
                To use {BRAND.name} more safely on public Wi-Fi:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use trusted networks when possible</li>
                <li>Consider using a VPN for additional privacy</li>
                <li>Verify you're on the correct network (ask staff if unsure)</li>
                <li>Avoid accessing sensitive information simultaneously</li>
                <li>Use mobile data if you're concerned about security</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-primary/20 border border-primary/50 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Bottom Line</h2>
            <p className="text-gray-300">
              {BRAND.name}'s encrypted connections provide basic protection on public Wi-Fi, but public networks 
              always carry some risk. For sensitive use or additional privacy, consider using a VPN or your mobile data connection.
            </p>
          </div>
        </div>
      </section>

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

      <section className="px-6 py-16 border-t border-white/5 text-center">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Start Chatting <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <footer className="px-6 py-8 border-t border-white/5 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} {BRAND.name}</p>
      </footer>
    </div>
  );
}

