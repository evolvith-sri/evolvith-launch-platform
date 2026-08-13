import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-40 pb-32 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 font-mono font-extrabold text-2xl text-cyan-400 flex items-center justify-center mx-auto">
        404
      </div>

      <h1 className="text-4xl font-extrabold font-heading text-white">
        System Route Not Found
      </h1>

      <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
        The requested digital path is not active in Evolvith Launch Platform v1.0. Please return to the homepage or inspect our commercial products.
      </p>

      <div className="pt-4">
        <Link href="/" className="btn-primary inline-block px-8 py-3.5 text-sm">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
