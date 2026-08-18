import { WaveEcosystem } from '@/components/WaveEcosystem';
import { ALL_PRODUCTS } from '@/lib/products';

export const metadata = {
  title: 'Commercial Operating Systems Catalog ($99+) — Evolvith',
  description: 'Explore Tier 1 focused operating systems from $99 and Tier 2 enterprise operating systems manufactured by Evolvith.',
};

export default function ProductsPage() {
  return (
    <div className="pt-32 pb-24">
      <WaveEcosystem products={ALL_PRODUCTS} />
    </div>
  );
}
