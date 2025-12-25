# Adding a New Blog Post

## Quick Guide

1. **Create a new file** in this folder: `my-post-slug.ts`

2. **Copy this template:**

```typescript
import { BlogPost } from "@/lib/blog";

const post: BlogPost = {
  slug: "my-post-slug",           // URL: /blog/my-post-slug
  title: "My Post Title",          // H1 on page
  description: "Short description for SEO and previews.",
  tag: "Tips",                     // Category: Tips, Safety, Compare, etc.
  date: "2025-01-15",             // YYYY-MM-DD format
  content: `
## First Section

Your content here. Use markdown:
- Bullet points
- **Bold text**
- *Italic text*

## Another Section

More content...
  `,
};

export default post;
```

3. **Register it** in `index.ts`:

```typescript
import myNewPost from "./my-post-slug";

const POSTS: BlogPost[] = [
  // ... existing posts
  myNewPost,  // Add here
];
```

4. **Done!** The post will appear on `/blog` and be accessible at `/blog/my-post-slug`

## Post Fields

| Field | Required | Description |
|-------|----------|-------------|
| `slug` | Yes | URL-friendly identifier (lowercase, hyphens) |
| `title` | Yes | Post title |
| `description` | Yes | Short description (under 160 chars for SEO) |
| `tag` | Yes | Category tag (Tips, Safety, Compare, Guides) |
| `date` | Yes | Publication date (YYYY-MM-DD) |
| `content` | Yes | Markdown content |
| `image` | No | Optional OG image path |

## Markdown Support

The content supports:
- `## Headings` (h2)
- `### Subheadings` (h3)
- `- Bullet lists`
- `**Bold**` and `*italic*`
- `` `inline code` ``
- Tables (basic)

## Tags

Use consistent tags:
- **Tips** - How-to guides and advice
- **Safety** - Security and privacy
- **Compare** - Competitor comparisons
- **Guides** - Getting started, tutorials

## File Naming

Use descriptive, kebab-case names:
- ✅ `video-chat-tips.ts`
- ✅ `pomegle-vs-ometv.ts`
- ❌ `post1.ts`
- ❌ `newPost.ts`

