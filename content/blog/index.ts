/**
 * ============================================
 * BLOG POSTS INDEX
 * ============================================
 * 
 * To add a new blog post:
 * 1. Create a new file in this folder (e.g., my-new-post.ts)
 * 2. Import it below
 * 3. Add it to the POSTS array
 * 
 * That's it!
 */

import { BlogPost } from "@/lib/blog";

// Import all blog posts
import safeVideoChatting from "./safe-video-chatting";
import pomegleVsOmegle from "./pomegle-vs-omegle";
import conversationStarters from "./conversation-starters";
import bestOmegleAlternatives from "./best-omegle-alternatives";
import videoChatEtiquette from "./video-chat-etiquette";
import privacyTips from "./privacy-tips";
import funnyOmegleStories from "./funny-omegle-stories";
import psychologyChattingStrangers from "./psychology-chatting-strangers";
import evolutionAnonymousChatApps from "./evolution-anonymous-chat-apps";
import whyPeopleLoveAnonymousChat from "./why-people-love-anonymous-chat";
import memorableChatrouletteMoments from "./memorable-chatroulette-moments";
import howAIChangingRandomChat from "./how-ai-changing-random-chat";
import viralChatAppsPandemic from "./viral-chat-apps-pandemic";
import top10Icebreakers from "./top-10-icebreakers";

// Add all posts here
const POSTS: BlogPost[] = [
  safeVideoChatting,
  pomegleVsOmegle,
  conversationStarters,
  bestOmegleAlternatives,
  videoChatEtiquette,
  privacyTips,
  funnyOmegleStories,
  psychologyChattingStrangers,
  evolutionAnonymousChatApps,
  whyPeopleLoveAnonymousChat,
  memorableChatrouletteMoments,
  howAIChangingRandomChat,
  viralChatAppsPandemic,
  top10Icebreakers,
  // Add new posts here ↓
];

/**
 * Get all posts
 */
export function getAllPosts(): BlogPost[] {
  return POSTS;
}

/**
 * Get a post by slug
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS.find(post => post.slug === slug);
}

