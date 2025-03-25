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
      <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow rounded">
        <h1 className="text-xl font-semibold mb-4">Make a Payment</h1>
        <label className="block mb-2 text-sm">Enter amount (USD):</label>
        <input
          type="number"
          className="w-full border px-3 py-2 rounded mb-4"
          placeholder="e.g. 250.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          onClick={handleCheckout}
          disabled={loading || !appId}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Processing...' : 'Proceed to Payment'}
        </button>
      </div>
    </Layout>
  );
}
