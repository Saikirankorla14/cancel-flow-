// src/app/cancel/complete/page.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export default function Page() {
  const params = useSearchParams();
  const router = useRouter();

  const reason = params.get('reason') ?? 'Not provided';
  const lawyer = params.get('lawyer') ?? 'Not specified';
  const visa = params.get('visa') ?? 'Not specified';

  return (
    <main className="min-h-screen p-6 max-w-lg mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Cancellation Summary</h1>

      <p className="mb-2"><strong>Reason:</strong> {reason}</p>
      <p className="mb-2"><strong>Lawyer:</strong> {lawyer}</p>
      <p className="mb-2"><strong>Visa:</strong> {visa}</p>

      <button
        onClick={() => router.push('/')}
        className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-md"
      >
        Finish
      </button>
    </main>
  );
}
