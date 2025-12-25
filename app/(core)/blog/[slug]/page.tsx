/**
 * Dynamic Blog Post Page
 * 
 * Posts are loaded from content/blog/ folder.
 * To add a new post, create a file there and add to index.ts
 */

import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BRAND, generateBlogPostMetadata } from "@/lib/seo";
import { getAllSlugs, getPostBySlug, getAllPosts, parseContent } from "@/lib/blog";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/lib/seo/structured-data";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Route segment config - ensure static generation with ISR
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour (ISR)

// Generate static params from blog posts
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) return { title: "Not Found" };
  
  return generateBlogPostMetadata({
    title: post.title,
    description: post.description,
    slug: post.slug,
    ogImage: post.image,
    datePublished: post.date,
    dateModified: post.date, // Can be updated later if you track modifications
    author: BRAND.name,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) notFound();

  const postUrl = `${BRAND.url}/blog/${post.slug}`;
  const publishedDate = new Date(post.date).toISOString();
  
  // Get related posts (same tag, excluding current post)
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter(p => p.slug !== slug && p.tag === post.tag)
    .slice(0, 3);
  
  // If not enough same-tag posts, get any recent posts
  const fallbackPosts = allPosts
    .filter(p => p.slug !== slug)
    .slice(0, 3);
  
  const related = relatedPosts.length >= 2 ? relatedPosts : fallbackPosts;

  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      {/* Article Structured Data */}
      <ArticleJsonLd
        article={{
          title: post.title,
          description: post.description,
          url: postUrl,
          datePublished: publishedDate,
          dateModified: publishedDate,
          author: BRAND.name,
          image: post.image,
        }}
      />
      
      {/* Breadcrumb Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BRAND.url },
          { name: "Blog", url: `${BRAND.url}/blog` },
          { name: post.title, url: postUrl },
        ]}
      />
      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="text-2xl font-display tracking-wide -rotate-2 hover:rotate-0 transition-transform">
          {BRAND.name.toUpperCase()}
        </Link>
        <Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Blog
        </Link>
      </nav>

      {/* Article */}
      <article className="px-6 py-12 max-w-3xl mx-auto">
        {/* Featured Image */}
        {post.image && (
          <div className="mb-8 rounded-xl overflow-hidden border border-white/10">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-auto"
              loading="eager"
            />
          </div>
        )}
        
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs text-primary uppercase tracking-wider font-bold">{post.tag}</span>
          <span className="text-xs text-gray-600">•</span>
          <span className="text-xs text-gray-500">
            {new Date(post.date).toLocaleDateString("en-US", { 
              month: "long", 
              day: "numeric", 
              year: "numeric" 
            })}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">{post.title}</h1>
        <p className="text-lg text-gray-400 mb-12 leading-relaxed">{post.description}</p>
        
        {/* Article Content */}
        <div 
          className="blog-content
            [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mt-12 [&_h1]:mb-6
            [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-5
            [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-8 [&_h3]:mb-4
            [&_h4]:text-lg [&_h4]:font-bold [&_h4]:text-white [&_h4]:mt-6 [&_h4]:mb-3
            [&_p]:text-gray-400 [&_p]:leading-relaxed [&_p]:mb-4 [&_p]:text-base
            [&_strong]:text-white [&_strong]:font-bold
            [&_em]:text-gray-300 [&_em]:italic
            [&_a]:text-primary [&_a]:hover:underline [&_a]:transition-colors
            [&_code]:bg-white/10 [&_code]:text-primary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
            [&_pre]:bg-[#1a1a1a] [&_pre]:border [&_pre]:border-white/10 [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:my-6
            [&_pre_code]:bg-transparent [&_pre_code]:text-gray-300 [&_pre_code]:p-0
            [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:my-4 [&_ul]:ml-6
            [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:my-4 [&_ol]:ml-6
            [&_li]:text-gray-400 [&_li]:mb-2
            [&_blockquote]:border-l-4 [&_blockquote]:border-primary/50 [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:my-4 [&_blockquote]:bg-white/5 [&_blockquote]:rounded-r-lg [&_blockquote]:italic [&_blockquote]:text-gray-300
            [&_hr]:my-8 [&_hr]:border-white/10
            [&_figure]:my-8 [&_figure]:rounded-xl [&_figure]:overflow-hidden [&_figure]:border [&_figure]:border-white/10
            [&_img]:w-full [&_img]:h-auto
            [&_figcaption]:text-xs [&_figcaption]:text-gray-500 [&_figcaption]:mt-2 [&_figcaption]:px-4 [&_figcaption]:text-center"
          dangerouslySetInnerHTML={{ __html: parseContent(post.content) }}
        />
      </article>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="px-6 py-16 border-t border-white/5">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="space-y-4">
              {related.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="block p-5 bg-[#141414] rounded-xl border border-white/5 hover:border-primary/50 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs text-primary uppercase tracking-wider">{relatedPost.tag}</span>
                        <span className="text-xs text-gray-600">•</span>
                        <span className="text-xs text-gray-600">
                          {new Date(relatedPost.date).toLocaleDateString("en-US", { 
                            month: "short", 
                            day: "numeric" 
                          })}
                        </span>
                      </div>
                      <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-500">{relatedPost.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors shrink-0 mt-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-6 py-16 border-t border-white/5 text-center">
        <p className="text-gray-400 mb-6">Ready to try {BRAND.name}?</p>
        <Link 
          href="/"
          className="inline-block bg-primary text-gray-900 font-bold px-6 py-3 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Start Chatting
        </Link>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
