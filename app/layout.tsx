import type { Metadata, Viewport } from 'next';

import './globals.css';

import { Nunito } from 'next/font/google';
import { Open_Sans } from 'next/font/google';

const display = Nunito({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const sans = Open_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });


import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SITE_URL } from '@/lib/reviews';




export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Penny Holiday | Budget Travel Guides, Cheap Flights & Deals',
    template: '%s | Penny Holiday',
  },
  description: 'Budget travel guides with real costs: cheap flights, affordable stays and deals for Bali, Thailand, Europe, the Maldives and more. Travel more for less.',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'Penny Holiday',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: { index: true, follow: true },
  category: 'travel',
};

export const viewport: Viewport = {
  themeColor: '#0a0c10',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-ink-950 font-sans text-slate-200 antialiased">
        <div className="mesh-bg min-h-screen flex flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

// Cache bust: 2026-05-09 20:03:52
