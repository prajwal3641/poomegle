/**
 * ============================================
 * BLOG CATEGORY PAGE
 * ============================================
 * 
 * Dynamic category pages for blog posts
 */

import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BRAND, BLOG_CATEGORIES, generatePageMetadata } from "@/lib/seo";
import { getAllPosts, getPostsByTag } from "@/lib/blog";
import { BreadcrumbJsonLd } from "@/lib/seo/structured-data";
import { Footer } from "@/components/Footer";
import { ArrowRight, ArrowLeft } from "lucide-react";

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function generateStaticParams() {
  return Object.values(BLOG_CATEGORIES).map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const categoryData = Object.values(BLOG_CATEGORIES).find(c => c.slug === category);
  
  if (!categoryData) return { title: "Not Found" };
  
  return generatePageMetadata({
    title: `${categoryData.name} - ${BRAND.name} Blog`,
    description: categoryData.description,
    keywords: [categoryData.name.toLowerCase(), "blog", "articles", ...BRAND.name.toLowerCase().split(" ")],
    path: `/blog/category/${category}`,
  });
}

export default async function BlogCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const categoryData = Object.values(BLOG_CATEGORIES).find(c => c.slug === category);
  
  if (!categoryData) notFound();
  
  const posts = getPostsByTag(categoryData.name);
  const pageUrl = `${BRAND.url}/blog/category/${category}`;
  
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BRAND.url },
          { name: "Blog", url: `${BRAND.url}/blog` },
          { name: categoryData.name, url: pageUrl },
        ]}
      />
      
      <nav className="px-6 py-5 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="text-2xl font-display tracking-wide -rotate-2 hover:rotate-0 transition-transform">
          {BRAND.name.toUpperCase()}
        </Link>
        <Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> All Posts
        </Link>
      </nav>

      <section className="px-6 py-16 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-display mb-4">{categoryData.name}</h1>
        <p className="text-gray-400 mb-8">{categoryData.description}</p>
        
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts in this category yet.</p>
        ) : (
          <div className="space-y-4">
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
                      <span className="text-xs text-gray-600">•</span>
                      <span className="text-xs text-gray-600">
                        {new Date(post.date).toLocaleDateString("en-US", { 
                          month: "short", 
                          day: "numeric",
                          year: "numeric"
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
        )}
      </section>

      <Footer />
    </div>
  );
}

