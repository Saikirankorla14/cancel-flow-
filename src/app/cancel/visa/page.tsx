'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import Image from 'next/image';
import { useState } from 'react';

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const reason = params.get('reason') ?? '';
  const [lawyer, setLawyer] = useState<'yes' | 'no' | ''>('');
  const [visa, setVisa] = useState('');

  const handleContinue = () => {
    const qs = new URLSearchParams();
    if (reason) qs.set('reason', reason);
    if (lawyer) qs.set('lawyer', lawyer);
    if (visa) qs.set('visa', visa);
    router.push(`/cancel/complete?${qs.toString()}`);
  };

  return (
    <main className="min-h-screen p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Visa support (optional)</h2>

      <p className="mb-2">Is your company providing a lawyer?</p>
      <div className="flex gap-3 mb-4">
        <button
          type="button"
          onClick={() => setLawyer('yes')}
          className={`px-4 py-2 rounded-md border ${lawyer === 'yes' ? 'bg-indigo-600 text-white' : 'bg-white'}`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => setLawyer('no')}
          className={`px-4 py-2 rounded-md border ${lawyer === 'no' ? 'bg-indigo-600 text-white' : 'bg-white'}`}
        >
          No
        </button>
      </div>

      <input
        value={visa}
        onChange={(e) => setVisa(e.target.value)}
        placeholder="Visa type (optional)"
        className="w-full border rounded-md p-3 mb-4"
      />

      <button
        type="button"
        onClick={handleContinue}
        className="w-full bg-indigo-600 text-white py-3 rounded-md"
      >
        Continue
      </button>

       <div className="mt-10">
                <Image alt="" width={960} height={640} src="/main.jpg" className="w-full rounded-2xl" />
              </div>
    </main>
  );
}
