'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Mock user data
const mockUser = { email: 'user@example.com', id: '1' };

// Mock subscription data for UI only (DB is handled by API routes)
const mockSubscriptionData = {
  status: 'active',
  isTrialSubscription: false,
  cancelAtPeriodEnd: false,
  currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  monthlyPrice: 25,
};

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 py-12 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-8 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
              <div className="flex space-x-3">
                <button className="px-4 py-2 text-sm font-medium text-white bg-[#8952fc] rounded-lg hover:bg-[#7b40fc]">
                  Back to jobs
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                  Sign out
                </button>
              </div>
            </div>
          </div>

          {/* Account Information (your existing content can remain) */}
          <div className="px-6 py-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Account Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="mt-1 text-md text-gray-900">user@example.com</p>
              </div>
              <div className="pt-2 space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm font-medium text-gray-900">Subscription status</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200">
                    Active
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm font-medium text-gray-900">Next payment</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">September 19</p>
                </div>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="px-6 py-6 border-b border-gray-200">
            <button className="inline-flex items-center justify-center w-full px-4 py-3 bg-[#8952fc] text-white rounded-lg hover:bg-[#7b40fc]">
              Contact support
            </button>
          </div>

          {/* Manage Subscription */}
          <div className="px-6 py-6">
            <div className="space-y-4">
              <button className="inline-flex items-center justify-center w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                <span className="text-sm font-medium">Update payment method</span>
              </button>

              <button className="inline-flex items-center justify-center w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                <span className="text-sm font-medium">View billing history</span>
              </button>

              {/* 🔴 FIXED: navigate to /cancel */}
              <button
                type="button"
                onClick={() => router.push('/cancel')}
                className="inline-flex items-center justify-center w-full px-4 py-3 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 hover:border-red-300 transition-all duration-200 shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-sm font-medium">Cancel Migrate Mate</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
