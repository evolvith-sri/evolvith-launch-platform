import { Metadata } from 'next';
import Link from 'next/link';
import { COMMERCIAL_PRODUCTS, ALL_PRODUCTS, DODO_STOREFRONT_URL } from '@/lib/products';
import { StoreCatalogClient } from './StoreCatalogClient';

export const metadata: Metadata = {
  title: 'Commercial Storefront — Evolvith Enterprise Operating Systems',
  description:
    'Browse and purchase perpetual commercial licenses for Evolvith Enterprise Operating Systems. Direct instant checkout powered by Dodo Payments.',
  openGraph: {
    title: 'Evolvith Commercial Storefront — Perpetual Enterprise OS Licenses',
    description:
      'Explore and acquire Tier 1 ($49–$99), Tier 2A ($149–$349), and Tier 2B ($99) Codified Operating Systems. Instant fulfillment & verified runbooks.',
    type: 'website',
  },
};

export default function StorePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'Evolvith Commercial Storefront',
    description: 'Direct commercial store for Evolvith Enterprise Operating Systems.',
    url: 'https://www.evolvith.com/store',
    parentOrganization: {
      '@type': 'Organization',
      name: 'Evolvith',
      url: 'https://www.evolvith.com',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Evolvith Codified Operating Systems',
      itemListElement: COMMERCIAL_PRODUCTS.map((p, idx) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'SoftwareApplication',
          name: p.title,
          applicationCategory: p.category,
          operatingSystem: 'Cross-Platform, Local-First, Cloud Edge',
          description: p.description,
        },
        price: p.price,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `https://www.evolvith.com/products/${p.id}`,
      })),
    },
  };

  return (
    <div className="pt-28 pb-24 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Transactional Commerce Active • Dodo Payments</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
              Evolvith <span className="text-gradient">Commercial Store</span>
            </h1>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Acquire perpetual commercial licenses for production-grade AI-native operating systems.
              All purchases include full local runtime packages with inspectable source, AST schemas, CLI harnesses, and 48-hour deployment runbooks.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href={DODO_STOREFRONT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-white flex items-center justify-center gap-2 transition-all hover:border-cyan-500/50 shadow-md"
            >
              <span>View Dodo Storefront</span>
              <span className="text-cyan-400 text-sm">↗</span>
            </a>
            <Link
              href="/redeem"
              className="px-5 py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-mono text-cyan-400 flex items-center justify-center gap-2 transition-all"
            >
              <span>AppSumo Redemption</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Existing AppSumo Customer Redemption Notice */}
        <div className="bg-gradient-to-r from-cyan-950/40 via-surface/60 to-surface/40 p-4 sm:p-5 rounded-2xl border border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
              Existing AppSumo Customer Redemption
            </span>
            <p className="text-xs text-gray-300">
              Already purchased an Evolvith AppSumo deal? Redeem your existing code to activate your license.
            </p>
          </div>
          <Link
            href="/redeem"
            className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-4 shrink-0"
          >
            Redeem Code at /redeem →
          </Link>
        </div>
      </section>

      {/* Interactive Filterable Catalog */}
      <StoreCatalogClient
        allProducts={ALL_PRODUCTS}
        commercialProducts={COMMERCIAL_PRODUCTS}
        dodoStorefrontUrl={DODO_STOREFRONT_URL}
      />
    </div>
  );
}
