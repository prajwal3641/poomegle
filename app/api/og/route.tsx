/**
 * ============================================
 * DYNAMIC OG IMAGE GENERATION
 * ============================================
 * 
 * Generates Open Graph images dynamically using @vercel/og
 * Usage: /api/og?title=Your+Title&subtitle=Your+Subtitle
 * 
 * Install: npm install @vercel/og
 * 
 * Note: This requires Next.js 13+ and Vercel deployment for full functionality.
 * For local development, you may need to use a different approach.
 */

import { NextRequest } from "next/server";

// Dynamic import to handle cases where @vercel/og might not be installed
// Install with: npm install @vercel/og

export const runtime = "edge";

// Type declaration for when @vercel/og is not installed
type ImageResponseType = new (
  element: React.ReactElement,
  options?: { width?: number; height?: number }
) => Response;

export async function GET(request: NextRequest) {
  try {
    // Dynamic import - install @vercel/og first
    // Using type assertion to avoid TypeScript errors when package is not installed
    let ImageResponse: ImageResponseType;
    try {
      const ogModule = await import("@vercel/og");
      ImageResponse = ogModule.ImageResponse;
    } catch (importError) {
      // If @vercel/og is not installed, return a simple text response
      return new Response(
        JSON.stringify({ 
          error: "@vercel/og is not installed. Run: npm install @vercel/og",
          note: "OG image generation requires @vercel/og package"
        }),
        { 
          status: 503,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    
    const { searchParams } = new URL(request.url);
    
    const title = searchParams.get("title") || "Pomegle";
    const subtitle = searchParams.get("subtitle") || "Free Random Video Chat";
    
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0c0c0c",
            backgroundImage: "linear-gradient(to bottom, #0c0c0c, #1a1a1a)",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "80px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: "bold",
                color: "#FFD700",
                marginBottom: 20,
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </div>
            {subtitle && (
              <div
                style={{
                  fontSize: 32,
                  color: "#9ca3af",
                  marginTop: 10,
                }}
              >
                {subtitle}
              </div>
            )}
            <div
              style={{
                fontSize: 24,
                color: "#6b7280",
                marginTop: 40,
              }}
            >
              pomegle.com
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : "Unknown error";
    return new Response(`Failed to generate image: ${error}`, { status: 500 });
  }
}

