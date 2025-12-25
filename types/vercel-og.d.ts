// Type declaration for @vercel/og when package is not installed
// This allows the build to succeed even if @vercel/og is not installed
// Install the package with: npm install @vercel/og

declare module "@vercel/og" {
  export class ImageResponse extends Response {
    constructor(
      element: React.ReactElement,
      options?: {
        width?: number;
        height?: number;
      }
    );
  }
}

