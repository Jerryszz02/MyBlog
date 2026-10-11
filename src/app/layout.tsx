import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    type: "website",
  },
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1" id="main-content" tabIndex={-1}>
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
