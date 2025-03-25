// pages/register.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react'; // <-- Import signIn from NextAuth
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Client-side check for matching passwords
    if (password !== verifyPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // 1. Create user in DB
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Registration failed');
      }

      // 2. Auto-login with NextAuth 'credentials' provider
      const signInResult = await signIn('credentials', {
        redirect: false,   // We'll handle the redirect manually
        email,
        password,
      });

      if (signInResult.error) {
        // If signIn fails, show an error
        throw new Error(signInResult.error);
      }

      // 3. If signIn success, go to user dashboard
      router.push('/user/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-neutral-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-neutral-800">Register</h2>

          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-neutral-700 mb-2">Email</label>
            <input
              type="email"
              className="border rounded w-full py-2 px-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-neutral-700 mb-2">Password</label>
            <input
              type="password"
              className="border rounded w-full py-2 px-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-neutral-700 mb-2">Verify Password</label>
            <input
              type="password"
              className="border rounded w-full py-2 px-3"
              placeholder="Verify Password"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-neutral-800 text-white py-2 rounded hover:bg-neutral-700"
          >
            Register
          </button>

          <p className="text-sm text-center text-neutral-600 mt-4">
            Already have an account?{' '}
            <Link href="/signin" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}

