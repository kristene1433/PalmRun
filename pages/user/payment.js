// pages/user/payment.js

import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Layout from '../../components/Layout';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentPage() {
  const [amount, setAmount] = useState('');
  const [appId, setAppId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await fetch('/api/applications');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setAppId(data[0]._id); // Use most recent or first application
        }
      } catch (err) {
        console.error('Error fetching application:', err);
      }
    };

    fetchApplication();
  }, []);

  const handleCheckout = async () => {
    if (!amount || isNaN(Number(amount))) {
      setError('Please enter a valid amount.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(amount), appId }),
      });

      const data = await res.json();

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (err) {
      setError('Error creating checkout session.');
    }

    setLoading(false);
  };

  return (
    <Layout>
      <div className="bg-sky-50 min-h-screen">
        <div className="max-w-md mx-auto px-6 py-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-neutral-800 mb-4">Make a Payment</h1>
            <label className="block mb-2 text-sm text-neutral-700">Enter amount (USD):</label>
            <input
              type="number"
              className="w-full border border-neutral-300 rounded px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="e.g. 250.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <button
              onClick={handleCheckout}
              disabled={loading || !appId}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
