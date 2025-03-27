// pages/user/payment-success.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PaymentSuccess() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/user/dashboard');
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer); // Clean up if component unmounts early
  }, [router]);

  return (
    <div className="bg-sky-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-green-600 mb-2">Payment Successful!</h1>
        <p className="text-neutral-700 text-sm mb-2">Thank you for your payment.</p>
        <p className="text-neutral-500 text-xs">Redirecting you to your dashboard...</p>
      </div>
    </div>
  );
}
