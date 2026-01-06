import type { Metadata } from "next";
import Script from "next/script";
import { Bebas_Neue, Josefin_Sans } from "next/font/google";
import Link from "next/link";
import Providers from "./providers";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const josefinSans = Josefin_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ted's Pizza Recipes",
  description: "Puff pizza recipes, products, and creator picks from Tedszaza.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5921947487618627"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${bebasNeue.variable} ${josefinSans.variable} antialiased`}>
        <Providers>
          <div className="site-shell">
          <header className="site-header">
            <nav className="nav-shell">
              <div className="nav-left">
                <Link className="nav-logo" href="/">
                  Ted's Zaza
                </Link>
                <Link className="nav-link" href="/recipes">
                  Recipes
                </Link>
                <Link className="nav-link" href="/about">
                  About
                </Link>
                <Link className="nav-link" href="/products">
                  Products
                </Link>
              </div>
              <div className="nav-right">
                <a
                  className="nav-icon"
                  href="https://www.tiktok.com/@tdk0420"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.6 5.1c-1-1-1.6-2.3-1.7-3.7H13v12.2c0 1.3-1 2.4-2.3 2.4S8.4 14.9 8.4 13.6c0-1.4 1-2.5 2.3-2.5.3 0 .6.1.9.2V8.4c-.3 0-.6-.1-.9-.1-3 0-5.4 2.4-5.4 5.4 0 3 2.4 5.4 5.4 5.4s5.4-2.4 5.4-5.4V9.5c1 .7 2.2 1.2 3.5 1.3V7.8c-.8 0-1.7-.3-2.4-.7z" />
                  </svg>
                </a>
                <a
                  className="nav-icon"
                  href="https://www.instagram.com/teds_zaza/?hl=en"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M16.8 3H7.2A4.2 4.2 0 003 7.2v9.6A4.2 4.2 0 007.2 21h9.6a4.2 4.2 0 004.2-4.2V7.2A4.2 4.2 0 0016.8 3zm1.8 13.8c0 1-0.8 1.8-1.8 1.8H7.2c-1 0-1.8-0.8-1.8-1.8V7.2c0-1 .8-1.8 1.8-1.8h9.6c1 0 1.8.8 1.8 1.8v9.6z" />
                    <path d="M12 7.6A4.4 4.4 0 107.6 12 4.4 4.4 0 0012 7.6zm0 6.9A2.5 2.5 0 119.5 12 2.5 2.5 0 0112 14.5zM17.3 6.7a1 1 0 11-1-1 1 1 0 011 1z" />
                  </svg>
                </a>
                <a
                  className="nav-icon"
                  href="https://www.youtube.com/@teds_zaza"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21.6 7.2a3 3 0 00-2.1-2.1C17.6 4.6 12 4.6 12 4.6s-5.6 0-7.5.5a3 3 0 00-2.1 2.1A31.5 31.5 0 002 12a31.5 31.5 0 00.4 4.8 3 3 0 002.1 2.1c1.9.5 7.5.5 7.5.5s5.6 0 7.5-.5a3 3 0 002.1-2.1A31.5 31.5 0 0022 12a31.5 31.5 0 00-.4-4.8z" />
                    <path d="M10 15.3V8.7l5.2 3.3L10 15.3z" />
                  </svg>
                </a>
              </div>
            </nav>
          </header>
          <main className="site-main">{children}</main>
          <footer className="site-footer">
            <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4">
              <p>© 2026 Ted's Zaza. All rights reserved.</p>
              <div className="flex gap-6">
                <Link href="/privacy" className="nav-link">
                  Privacy Policy
                </Link>
                <Link href="/contact" className="nav-link">
                  Contact
                </Link>
                <Link href="/about" className="nav-link">
                  About
                </Link>
              </div>
            </div>
          </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
