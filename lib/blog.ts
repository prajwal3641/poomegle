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
 * Parse markdown content to HTML (enhanced parser with image support)
 */
export function parseContent(content: string): string {
  let html = content
    // Headers
    .replace(/^#### (.+)/gm, '<h4 class="text-lg font-bold text-white mt-6 mb-3">$1</h4>')
    .replace(/^### (.+)/gm, '<h3 class="text-xl font-bold text-white mt-8 mb-4">$1</h3>')
    .replace(/^## (.+)/gm, '<h2 class="text-2xl font-bold text-white mt-10 mb-5">$1</h2>')
    .replace(/^# (.+)/gm, '<h1 class="text-3xl font-bold text-white mt-12 mb-6">$1</h1>')
    
    // Images - supports ![alt](url) and ![alt](url "title")
    .replace(/!\[([^\]]*)\]\(([^)]+)(?:\s+"([^"]+)")?\)/g, (match, alt, url, title) => {
      const titleAttr = title ? ` title="${title}"` : '';
      return `<figure class="my-8 rounded-xl overflow-hidden border border-white/10">
        <img src="${url}" alt="${alt}"${titleAttr} class="w-full h-auto" loading="lazy" />
        ${alt ? `<figcaption class="text-xs text-gray-500 mt-2 px-4 text-center">${alt}</figcaption>` : ''}
      </figure>`;
    })
    
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
    
    // Code blocks (triple backticks)
    .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      return `<pre class="bg-[#1a1a1a] border border-white/10 rounded-lg p-4 overflow-x-auto my-6"><code class="text-sm text-gray-300">${code.trim()}</code></pre>`;
    })
    
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-white/10 text-primary px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
    .replace(/__([^_]+)__/g, '<strong class="text-white font-bold">$1</strong>')
    
    // Italic
    .replace(/\*([^*]+)\*/g, '<em class="text-gray-300 italic">$1</em>')
    .replace(/_([^_]+)_/g, '<em class="text-gray-300 italic">$1</em>')
    
    // Horizontal rule
    .replace(/^---$/gm, '<hr class="my-8 border-white/10" />')
    .replace(/^\*\*\*$/gm, '<hr class="my-8 border-white/10" />')
    
    // Blockquotes
    .replace(/^> (.+)/gm, '<blockquote class="border-l-4 border-primary/50 pl-4 py-2 my-4 bg-white/5 rounded-r-lg italic text-gray-300">$1</blockquote>')
    
    // Lists - unordered
    .replace(/^- (.+)/gm, '<li class="ml-4 mb-2">$1</li>')
    .replace(/^\* (.+)/gm, '<li class="ml-4 mb-2">$1</li>')
    
    // Lists - ordered
    .replace(/^\d+\. (.+)/gm, '<li class="ml-4 mb-2">$1</li>')
    
    // Wrap consecutive list items in ul/ol
    .replace(/(<li class="ml-4 mb-2">.*<\/li>\n?)+/g, (match) => {
      return `<ul class="list-disc space-y-2 my-4 ml-6">${match}</ul>`;
    });
  
  // Wrap paragraphs (text not already in tags)
  html = html
    .split('\n\n')
    .map(para => {
      const trimmed = para.trim();
      if (!trimmed) return '';
      // Don't wrap if it's already a tag or starts with a tag
      if (trimmed.startsWith('<') || trimmed.match(/^<[^>]+>/)) {
        return trimmed;
      }
      return `<p class="text-gray-400 leading-relaxed mb-4">${trimmed}</p>`;
    })
    .filter(p => p)
    .join('\n');
  
  return html;
}

