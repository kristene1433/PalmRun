// pages/signin.js

import { useState, useEffect } from 'react';
import { signIn, useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function SignIn() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      const role = session?.user?.role;
      router.push(role === 'owner' ? '/owner/dashboard' : '/user/dashboard');
    }
  }, [status, session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setError(result.error);
    } else {
      const sessionData = await getSession();
      const role = sessionData?.user?.role;
      router.push(role === 'owner' ? '/owner/dashboard' : '/user/dashboard');
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-sky-50">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-neutral-800 text-center">Sign In</h2>

          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm text-center">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-neutral-700 mb-2 text-sm">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="border border-neutral-300 rounded w-full py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-neutral-700 mb-2 text-sm">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="border border-neutral-300 rounded w-full py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-neutral-800 text-white py-2 rounded hover:bg-neutral-700 transition text-sm"
          >
            Log In
          </button>

          <p className="text-sm text-center text-neutral-600 mt-4">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>

          <p className="text-sm text-center text-neutral-600 mt-2">
            <Link href="/reset-password" className="text-blue-600 hover:underline">
              Forgot your password?
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}

