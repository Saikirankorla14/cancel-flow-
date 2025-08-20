'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Variant = 'A' | 'B';

export default function CancelEntry() {
  const [variant, setVariant] = useState<Variant | null>(null);
  const [priceCents, setPriceCents] = useState<number>(2500); // default $25

  // Deterministic 50/50 assignment; persist once
  useEffect(() => {
    let v = localStorage.getItem('downsell_variant') as Variant | null;
    if (!v) {
      const n = crypto.getRandomValues(new Uint32Array(1))[0] % 2;
      v = n === 0 ? 'A' : 'B';
      localStorage.setItem('downsell_variant', v);
    }
    setVariant(v);

    // If you have /api/subscription, you can fetch real price here (optional)
    // fetch('/api/subscription').then(r=>r.json()).then(d => setPriceCents(d.monthly_price ?? 2500)).catch(()=>{});
  }, []);

  if (!variant) return null;

  const discountedCents = Math.max(0, priceCents - 1000); // $10 off for B
  const discounted = (discountedCents / 100).toFixed(0);
  const full = (priceCents / 100).toFixed(0);

  return (
    <main className="min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-2">Congrats on the new role!</h1>
      <p className="mb-6 text-gray-700">Did you find this job with us?</p>

      {/* ✅ Use Links instead of onClick + router */}
      <div className="w-full max-w-lg flex flex-col gap-3">
        <Link
          href="/cancel/reason"
          className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md"
        >
          Yes
        </Link>
        <Link
          href="/cancel/reason"
          className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md"
        >
          No
        </Link>
      </div>

      {variant === 'B' && (
        <div className="w-full max-w-lg border rounded-xl p-6 mt-8 text-center">
          <p className="font-medium mb-2">Special offer 🎉</p>
          <p className="mb-4">
            Stay for <b>${discounted}</b>/mo instead of ${full}
          </p>
          <Link
            href="/cancel/complete?accepted_downsell=true"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md"
          >
            Accept Offer
          </Link>
        </div>


      )}
      <div className="mt-10">
          <Image alt="" width={960} height={640} src="/main.jpg" className="w-full rounded-2xl" />
        </div>
    </main>
  );
}
