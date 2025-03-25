// pages/signin.js
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const email = e.target.email.value;
    const password = e.target.password.value;

    // Step 1: Attempt sign in
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      // Invalid credentials
      setError(result.error);
    } else {
      // Step 2: If sign-in succeeded, fetch the updated session
      const res = await fetch('/api/auth/session'); // or `getSession()` from next-auth/react
      const sessionData = await res.json();

      // Step 3: Check user’s role
      if (sessionData?.user?.role === 'owner') {
        router.push('/owner/dashboard');
      } else {
        router.push('/user/dashboard');
      }
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-neutral-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-neutral-800">Sign In</h2>
          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">{error}</div>
          )}
          <div className="mb-4">
            <label className="block text-neutral-700 mb-2">Email</label>
            <input
              name="email"
              type="email"
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-neutral-700 mb-2">Password</label>
            <input
              name="password"
              type="password"
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-neutral-800 text-white py-2 rounded hover:bg-neutral-700"
          >
            Log In
          </button>

          <p className="text-sm text-center text-neutral-600 mt-4">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}

