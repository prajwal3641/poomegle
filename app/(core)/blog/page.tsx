/**
 * Blog Hub Page
 * 
 * Automatically lists all posts from content/blog/
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, blogMetadata } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";

// Route segment config - ensure static generation with ISR
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate hourly (ISR)

export const metadata: Metadata = blogMetadata;

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
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
      <section className="px-6 py-16 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-display mb-4">Blog</h1>
        <p className="text-gray-400">
          Tips, guides, and thoughts on random video chatting.
        </p>
      </section>

      {/* Posts */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-5 bg-[#141414] rounded-xl border border-white/5 hover:border-primary/50 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-primary uppercase tracking-wider">{post.tag}</span>
                    <span className="text-xs text-gray-600">
                      {new Date(post.date).toLocaleDateString("en-US", { 
                        month: "short", 
                        day: "numeric" 
                      })}
                    </span>
                  </div>
                  <h2 className="font-medium mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500">{post.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
