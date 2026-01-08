import type { Metadata } from "next";
import { Fredoka, Comic_Neue } from "next/font/google";
import PWARegister from "@/components/PWARegister";
import InstallPrompt from "@/components/InstallPrompt";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
});

const comicNeue = Comic_Neue({
  variable: "--font-comic",
  subsets: ["latin"],
  weight: ['300', '400', '700'],
});

export const metadata: Metadata = {
  title: "Story Magic - Kid-Friendly AI Stories",
  description: "Create amazing stories with AI! A fun, safe storytelling app for kids.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Story Magic",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Story Magic",
    title: "Story Magic - Kid-Friendly AI Stories",
    description: "Create amazing stories with AI! A fun, safe storytelling app for kids.",
  },
  twitter: {
    card: "summary",
    title: "Story Magic - Kid-Friendly AI Stories",
    description: "Create amazing stories with AI! A fun, safe storytelling app for kids.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Additional PWA meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Story Magic" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#9333ea" />
      </head>
      <body
        className={`${fredoka.variable} ${comicNeue.variable} antialiased`}
        style={{ fontFamily: 'var(--font-fredoka)' }}
      >
        <PWARegister />
        <InstallPrompt />
        {children}
      </body>
    </html>
  );
}
