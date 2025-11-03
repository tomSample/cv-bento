import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Navigation } from '@/components/navigation';
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Thomas Grandjean - Creative Developer & Designer",
    template: "%s | Thomas Grandjean"
  },
  description: "Portfolio de Thomas Grandjean - Développeur créatif & Designer spécialisé en React, Next.js, et technologies web modernes. Plus de 5 ans d'expérience en développement frontend et full-stack.",
  keywords: ["React", "Next.js", "TypeScript", "Developer", "Designer", "Frontend", "Full-Stack", "Web Development", "Portfolio", "Thomas Grandjean"],
  authors: [{ name: "Thomas Grandjean" }],
  creator: "Thomas Grandjean",
  publisher: "Thomas Grandjean",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://thomasgrandjean.dev'), // À remplacer par votre domaine
  alternates: {
    canonical: '/',
    languages: {
      'fr': '/fr',
      'en': '/en',
    },
  },
  openGraph: {
    title: "Thomas Grandjean - Creative Developer & Designer",
    description: "Portfolio de Thomas Grandjean - Développeur créatif spécialisé en React, Next.js, et technologies web modernes",
    url: 'https://thomasgrandjean.dev',
    siteName: 'Thomas Grandjean Portfolio',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // À créer
        width: 1200,
        height: 630,
        alt: 'Thomas Grandjean - Creative Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Thomas Grandjean - Creative Developer & Designer",
    description: "Portfolio de Thomas Grandjean - Développeur créatif spécialisé en React, Next.js",
    images: ['/og-image.jpg'],
    creator: '@thomasgrandjean', // À remplacer
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Thomas Grandjean',
              jobTitle: 'Creative Developer & Designer',
              url: 'https://thomasgrandjean.dev',
              sameAs: [
                'https://github.com/thomasgrandjean',
                'https://linkedin.com/in/thomasgrandjean',
              ],
              knowsAbout: ['React', 'Next.js', 'TypeScript', 'Web Development', 'UI/UX Design'],
              alumniOf: {
                '@type': 'Organization',
                name: 'Your University',
              },
              worksFor: {
                '@type': 'Organization',
                name: 'Global Tech Solutions',
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Skip to main content link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-blue-600 focus:text-white focus:top-4 focus:left-4 focus:rounded-lg focus:shadow-lg"
        >
          Aller au contenu principal
        </a>
        
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Navigation />
          <main id="main-content">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
