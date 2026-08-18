import Link from 'next/link';
import { getProductCommerceMapping } from '@/lib/commerce';

export const metadata = {
  title: 'Checkout Incomplete — Evolvith Commerce',
  description: 'Checkout was cancelled or incomplete.',
};

interface CancelPageProps {
  searchParams: {
    product?: string;
  };
}

export default function CheckoutCancelPage({ searchParams }: CancelPageProps) {
  const productId = searchParams.product || 'rev-os-01';
  const mapping = getProductCommerceMapping(productId);

  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-24 space-y-8 text-center">
      <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-2xl mx-auto font-mono flex items-center justify-center">
        ✕
      </div>

      <div className="space-y-3">
        <span className="px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-wider">
          Transaction Cancelled
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
          Checkout Incomplete
        </h1>
        <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed">
          No charges were incurred. If you experienced an issue during checkout or have custom enterprise procurement requirements, please contact our team.
        </p>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        {mapping && (
          <Link
            href={`/products/${mapping.productId}`}
            className="btn-primary px-6 py-3 text-xs font-bold uppercase font-mono tracking-wider w-full sm:w-auto"
          >
            Return to {mapping.systemCode} ($99)
          </Link>
        )}
        <Link
          href="/products"
          className="glass-panel px-6 py-3 text-xs font-mono font-bold text-gray-300 hover:text-white rounded-lg w-full sm:w-auto"
        >
          Browse All Operating Systems
        </Link>
      </div>
    </div>
  );
}
