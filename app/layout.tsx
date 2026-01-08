import type { Metadata } from "next";
import { Fredoka, Comic_Neue } from "next/font/google";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.variable} ${comicNeue.variable} antialiased`}
        style={{ fontFamily: 'var(--font-fredoka)' }}
      >
        {children}
      </body>
    </html>
  );
}
