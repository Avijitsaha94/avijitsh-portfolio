import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { siteConfig } from "@/lib/config";
import "@/app/globals.css";

const fontDisplay = Syne({ subsets: ["latin"], variable: "--font-display", weight: ["400","500","600","700","800"] });
const fontBody = DM_Sans({ subsets: ["latin"], variable: "--font-body", weight: ["300","400","500"], style: ["normal","italic"] });
const fontMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400","500"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: ["Full Stack Developer","Next.js Developer","React Developer","Node.js","TypeScript","Bangladesh Developer","Avijit Saha"],
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  openGraph: {
    type: "website", locale: "en_US", url: siteConfig.url,
    title: siteConfig.title, description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable} dark`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org", "@type": "Person",
            name: siteConfig.author.name, url: siteConfig.url,
            jobTitle: "Full Stack Developer", description: siteConfig.description,
            sameAs: [`https://github.com/${siteConfig.author.github}`, `https://linkedin.com/in/${siteConfig.author.linkedin}`],
          }),
        }} />
      </head>
      <body>
        {children}
        <Toaster position="bottom-right" toastOptions={{
          style: { background: "hsl(220 20% 8%)", border: "1px solid hsl(220 18% 14%)", color: "hsl(210 15% 92%)" },
        }} />
      </body>
    </html>
  );
}
