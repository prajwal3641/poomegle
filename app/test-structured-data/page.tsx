/**
 * ============================================
 * STRUCTURED DATA TESTING PAGE
 * ============================================
 * 
 * This page helps you test structured data.
 * Visit this page and use Google's Rich Results Test:
 * https://search.google.com/test/rich-results
 * 
 * Or use the Schema.org validator:
 * https://validator.schema.org/
 */

import type { Metadata } from "next";
import { BRAND } from "@/lib/seo";
import {
  BaseStructuredData,
  HomeStructuredData,
  FAQJsonLd,
  BreadcrumbJsonLd,
  ArticleJsonLd,
} from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: "Structured Data Test | " + BRAND.name,
  description: "Test page for structured data validation",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestStructuredDataPage() {
  const testFAQs = [
    {
      question: "What is structured data?",
      answer: "Structured data is a standardized format for providing information about a page and classifying the page content.",
    },
    {
      question: "Why is structured data important?",
      answer: "Structured data helps search engines understand your content and can enable rich results in search.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Structured Data Test Page</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Testing Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>View the page source (Ctrl+U or Cmd+U)</li>
            <li>Copy the page URL</li>
            <li>
              Test with{" "}
              <a
                href="https://search.google.com/test/rich-results"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google Rich Results Test
              </a>
            </li>
            <li>
              Or use{" "}
              <a
                href="https://validator.schema.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Schema.org Validator
              </a>
            </li>
          </ol>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Structured Data Types on This Page</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Organization Schema</li>
            <li>WebApplication Schema</li>
            <li>FAQPage Schema</li>
            <li>BreadcrumbList Schema</li>
            <li>Article Schema (example)</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Sample Content</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This page contains sample structured data for testing purposes.
            Check the page source to see the JSON-LD scripts.
          </p>
        </div>

        {/* All Structured Data Components */}
        <div className="hidden">
          <BaseStructuredData />
          <HomeStructuredData />
          <FAQJsonLd faqs={testFAQs} />
          <BreadcrumbJsonLd
            items={[
              { name: "Home", url: BRAND.url },
              { name: "Test", url: `${BRAND.url}/test-structured-data` },
            ]}
          />
          <ArticleJsonLd
            article={{
              title: "Test Article",
              description: "This is a test article for structured data validation",
              url: `${BRAND.url}/test-structured-data`,
              datePublished: new Date().toISOString(),
              dateModified: new Date().toISOString(),
              author: BRAND.name,
            }}
          />
        </div>
      </div>
    </div>
  );
}

