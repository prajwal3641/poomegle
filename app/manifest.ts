/**
 * ============================================
 * POMEGLE PWA MANIFEST
 * ============================================
 * 
 * Progressive Web App manifest for better mobile experience and SEO.
 * Next.js automatically serves this at /manifest.json
 */

import { MetadataRoute } from "next";
import { BRAND } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND.name,
    short_name: BRAND.name,
    description: `Free random video chat with strangers. The best Omegle alternative.`,
    start_url: "/",
    display: "standalone",
    background_color: "#0c0c0c",
    theme_color: "#FFD700", // Primary color - adjust to match your brand
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      // Note: Create these icons and place them in /public folder
      // See public/ICON_GUIDE.md for instructions
      // For maskable icons, create separate icon files with purpose: "maskable"
    ],
    categories: ["social", "entertainment", "communication"],
    screenshots: [],
  };
}

