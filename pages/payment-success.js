// pages/payment-success.js
import Layout from '../components/Layout';

export default function PaymentSuccess() {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
        <p className="mt-4">Thank you for your payment. We look forward to your stay!</p>
      </div>
    </Layout>
  );
}
