/**
 * ============================================
 * BLOG UTILITY
 * ============================================
 * 
 * Simple blog system. To add a new post:
 * 1. Create a file in content/blog/your-post.ts
 * 2. Export a BlogPost object as default
 * 3. Import and add to content/blog/index.ts
 * 
 * That's it. The page will render it automatically.
 */

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  tag: string;
  date: string; // YYYY-MM-DD format
  content: string;
  image?: string; // Optional OG image
}

// Import all posts from the index
import { getAllPosts as getPosts, getPostBySlug as getPost } from "@/content/blog";

/**
 * Get all blog posts, sorted by date (newest first)
 */
export function getAllPosts(): BlogPost[] {
  return getPosts().sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return getPost(slug);
}

/**
 * Get all slugs (for generateStaticParams)
 */
export function getAllSlugs(): string[] {
  return getPosts().map(post => post.slug);
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter(post => 
    post.tag.toLowerCase() === tag.toLowerCase()
  );
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const tags = getPosts().map(post => post.tag);
  return [...new Set(tags)];
}

/**
 * Parse markdown content to HTML (simple parser)
 */
export function parseContent(content: string): string {
  return content
    .replace(/^## (.+)/gm, '<h2>$1</h2>')
    .replace(/^### (.+)/gm, '<h3>$1</h3>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^- (.+)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>');
}

