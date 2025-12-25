/**
 * ============================================
 * FOOTER COMPONENT
 * ============================================
 * 
 * Site-wide footer with comprehensive internal linking.
 * This creates a massive internal link network for SEO.
 */

import Link from "next/link";
import { BRAND } from "@/lib/seo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand & About */}
          <div>
            <h3 className="text-xl font-display mb-4">{BRAND.name}</h3>
            <p className="text-sm text-gray-400 mb-4">
              Free random video chat with strangers. The best Omegle alternative.
            </p>
            <div className="space-y-2">
              <Link href="/" className="block text-sm text-gray-400 hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/guidelines" className="block text-sm text-gray-400 hover:text-primary transition-colors">
                Community Guidelines
              </Link>
            </div>
          </div>

          {/* SEO Landing Pages */}
          <div>
            <h3 className="font-bold mb-4 text-white">Popular Pages</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/omegle-alternative" className="text-sm text-gray-400 hover:text-primary transition-colors">
                  Omegle Alternative
                </Link>
              </li>
              <li>
                <Link href="/random-video-chat" className="text-sm text-gray-400 hover:text-primary transition-colors">
                  Random Video Chat
                </Link>
              </li>
              <li>
                <Link href="/talk-to-strangers" className="text-sm text-gray-400 hover:text-primary transition-colors">
                  Talk to Strangers
                </Link>
              </li>
              <li>
                <Link href="/best-omegle-alternatives" className="text-sm text-gray-400 hover:text-primary transition-colors">
                  Best Omegle Alternatives
                </Link>
              </li>
              <li>
                <Link href="/anonymous-chat-strangers" className="text-sm text-gray-400 hover:text-primary transition-colors">
                  Anonymous Chat
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Topics */}
          <div>
            <h3 className="font-bold mb-4 text-white">Help & Topics</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-sm text-gray-400 hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/how-to-use-pomegle" className="text-sm text-gray-400 hover:text-primary transition-colors">
                  How to Use
                </Link>
              </li>
              <li>
                <Link href="/is-pomegle-free" className="text-sm text-gray-400 hover:text-primary transition-colors">
                  Is It Free?
                </Link>
              </li>
              <li>
                <Link href="/why-pomegle-is-safe" className="text-sm text-gray-400 hover:text-primary transition-colors">
                  Safety & Privacy
                </Link>
              </li>
              <li>
                <Link href="/why-did-omegle-shut-down" className="text-sm text-gray-400 hover:text-primary transition-colors">
                  Why Omegle Shut Down
                </Link>
              </li>
            </ul>
          </div>

          {/* Compare & Blog */}
          <div>
            <h3 className="font-bold mb-4 text-white">Compare & Learn</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/compare" className="text-sm text-gray-400 hover:text-primary transition-colors">
                  Compare Platforms
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-400 hover:text-primary transition-colors">
                  Blog & Guides
                </Link>
              </li>
              <li>
                <Link href="/random-chat-statistics-2025" className="text-sm text-gray-400 hover:text-primary transition-colors">
                  Statistics
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © {currentYear} {BRAND.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-600">
            <Link href="/guidelines" className="hover:text-primary transition-colors">
              Guidelines
            </Link>
            <Link href="/help" className="hover:text-primary transition-colors">
              Help
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

