// pages/user/payment-cancel.js

import Link from 'next/link';
import Layout from '../../components/Layout';

export default function PaymentCancel() {
  return (
    <Layout>
      <div className="bg-sky-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-red-600 mb-2">Payment Canceled</h1>
          <p className="text-neutral-700 text-sm mb-6">You canceled the payment process.</p>

          <Link href="/user/dashboard">
            <button className="bg-neutral-700 text-white px-4 py-2 rounded hover:bg-neutral-600 transition">
              Back to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
