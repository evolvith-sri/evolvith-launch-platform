import { WaveEcosystem } from '@/components/WaveEcosystem';
import { WAVE_1_PRODUCTS } from '@/lib/products';

export const metadata = {
  title: 'Wave 1 Commercial Operating Systems Catalog — Evolvith',
  description: 'Explore the 6 Wave 1 commercial operating systems manufactured by Evolvith.',
};

export default function ProductsPage() {
  return (
    <div className="pt-32 pb-24">
      <WaveEcosystem products={WAVE_1_PRODUCTS} />
    </div>
  );
}

