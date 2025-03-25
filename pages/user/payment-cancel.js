import Link from 'next/link';
import Layout from '../../components/Layout';

export default function PaymentCancel() {
  return (
    <Layout>
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold text-red-600">Payment Canceled</h1>
        <p className="mt-2 mb-6">You canceled the payment process.</p>

        <Link href="/user/dashboard">
          <button className="bg-neutral-700 text-white px-4 py-2 rounded hover:bg-neutral-600">
            Back to Dashboard
          </button>
        </Link>
      </div>
    </Layout>
  );
}
