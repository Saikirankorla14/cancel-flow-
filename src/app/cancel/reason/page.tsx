'use client';

import { useRouter } from 'next/navigation';

import Image from 'next/image';
import { useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [reason, setReason] = useState('');

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Why are you cancelling?</h2>

        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full border rounded-md p-2 mb-4"
        >
          <option value="">Choose one…</option>
          <option value="too_expensive">Too expensive</option>
          <option value="not_helpful">Platform not helpful</option>
          <option value="not_enough_jobs">Not enough relevant jobs</option>
          <option value="decided_not_to_move">Decided not to move</option>
          <option value="other">Other</option>
        </select>

        <button
          disabled={!reason}
          className="w-full py-2 rounded-md bg-indigo-600 text-white disabled:opacity-50"
          onClick={() => router.push(`/cancel/visa?reason=${encodeURIComponent(reason)}`)}
        >
          Continue
        </button>
      </div>
      <div className="mt-10">
                <Image alt="" width={960} height={640} src="/main.jpg" className="w-full rounded-2xl" />
      </div>
    </main>
  );
}
