import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Evolvith — Enterprise Operating System for Business Transformation',
  description: 'Manufacture pre-built, commercial-grade operating systems that replace legacy SaaS sprawl with integrated, autonomous enterprise architecture.',
  metadataBase: new URL('https://evolvith.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Evolvith Enterprise Operating System',
    description: 'Autonomous Business Transformation Systems for global enterprises.',
    url: 'https://evolvith.com',
    siteName: 'Evolvith',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://evolvith.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Evolvith Enterprise Operating System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Evolvith Enterprise Operating System',
    description: 'Autonomous Business Transformation Systems built for multi-decade scale.',
    images: ['https://evolvith.com/og-image.png'],
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
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Evolvith',
  url: 'https://evolvith.com',
  logo: 'https://evolvith.com/logo.png',
  description: 'Manufactures pre-built, commercial-grade Enterprise Operating Systems for business transformation.',
  sameAs: ['https://twitter.com/evolvith', 'https://github.com/evolvith'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Outfit:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-obsidian text-gray-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
