/**
 * ============================================
 * CORE WEB VITALS MONITORING
 * ============================================
 * 
 * Tracks Core Web Vitals metrics for SEO and performance monitoring.
 * 
 * Core Web Vitals are:
 * - LCP (Largest Contentful Paint): Loading performance
 * - FID (First Input Delay): Interactivity
 * - CLS (Cumulative Layout Shift): Visual stability
 * 
 * Usage: Import and call reportWebVitals() in your app
 */

export interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  delta: number;
  rating: "good" | "needs-improvement" | "poor";
  navigationType?: string;
}

type WebVitalsCallback = (metric: WebVitalsMetric) => void;

/**
 * Report Web Vitals to your analytics service
 * Modify this function to send metrics to your preferred analytics tool
 */
export function reportWebVitals(metric: WebVitalsMetric) {
  // Example: Send to Cloudflare Analytics (already configured)
  // You can also send to Google Analytics, custom endpoint, etc.
  
  if (typeof window !== "undefined") {
    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.log("Web Vital:", metric);
    }

    // Send to Cloudflare Analytics beacon
    if (typeof (window as any).cfBeacon !== "undefined") {
      // Cloudflare Analytics automatically tracks Web Vitals
      // No additional code needed if using Cloudflare
    }

    // Example: Send to custom analytics endpoint
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   body: JSON.stringify(metric),
    //   headers: { 'Content-Type': 'application/json' },
    // });

    // Example: Send to Google Analytics 4
    // if (typeof window.gtag !== 'undefined') {
    //   window.gtag('event', metric.name, {
    //     value: Math.round(metric.value),
    //     event_label: metric.id,
    //     non_interaction: true,
    //   });
    // }
  }
}

/**
 * Initialize Web Vitals tracking
 * Call this in your root layout or _app.tsx
 */
export function initWebVitals() {
  if (typeof window === "undefined") return;

  // Use Next.js built-in web-vitals if available
  // Otherwise, you can use the web-vitals library
  // npm install web-vitals
  
  // Example with web-vitals library:
  // import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals';
  // 
  // onCLS(reportWebVitals);
  // onFID(reportWebVitals);
  // onLCP(reportWebVitals);
  // onFCP(reportWebVitals);
  // onTTFB(reportWebVitals);
}

/**
 * Get Web Vitals thresholds
 * These are Google's recommended thresholds
 */
export const WEB_VITALS_THRESHOLDS = {
  LCP: {
    good: 2500,
    needsImprovement: 4000,
  },
  FID: {
    good: 100,
    needsImprovement: 300,
  },
  CLS: {
    good: 0.1,
    needsImprovement: 0.25,
  },
  FCP: {
    good: 1800,
    needsImprovement: 3000,
  },
  TTFB: {
    good: 800,
    needsImprovement: 1800,
  },
} as const;

