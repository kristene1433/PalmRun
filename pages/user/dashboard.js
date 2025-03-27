// pages/user/dashboard.js

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function UserDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [myApps, setMyApps] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/applications')
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Server responded with status ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setMyApps(data);
        })
        .catch((err) => {
          console.error('Error fetching user applications:', err);
          setError(err.message);
        });
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <Layout>
        <div className="bg-sky-50 min-h-screen flex items-center justify-center">
          <p className="text-neutral-600 text-sm">Loading your dashboard...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-sky-50 min-h-screen">
        <div className="container mx-auto px-6 py-10">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-neutral-800">User Dashboard</h1>
            <div className="flex space-x-4">
              <Link
                href="/user/application"
                className="bg-neutral-700 text-white px-3 py-1 rounded hover:bg-neutral-600 transition"
              >
                Application
              </Link>
              <Link
                href="/user/payment"
                className="bg-neutral-700 text-white px-3 py-1 rounded hover:bg-neutral-600 transition"
              >
                Payment
              </Link>
            </div>
          </div>

          <p className="text-lg text-neutral-600 mb-8">
            Welcome, {session?.user?.email}! You can submit an application or make a payment.
          </p>

          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
              Error: {error}
            </div>
          )}

          <h2 className="text-xl font-semibold text-neutral-700 mb-4">My Applications</h2>
          {myApps.length === 0 ? (
            <p className="text-sm text-neutral-600">No applications found.</p>
          ) : (
            <div className="space-y-6">
              {myApps.map((app) => (
                <UserApplicationCard key={app._id} app={app} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

function UserApplicationCard({ app }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-semibold text-lg text-neutral-800 mb-1">
        {app.firstName} {app.lastName}
      </h3>
      <p className="text-sm text-neutral-600 mb-1">
        Address: {app.street1}
        {app.street2 ? `, ${app.street2}` : ''}, {app.city}, {app.stateValue} {app.zip}
      </p>
      <p className="text-sm text-neutral-600 mb-1">Phone: {app.phone}</p>

      {app.startDate && app.endDate && (
        <p className="text-sm text-neutral-600 mb-1">
          Dates Requested: {new Date(app.startDate).toLocaleDateString()} -{' '}
          {new Date(app.endDate).toLocaleDateString()}
        </p>
      )}

      {app.additionalRenters && app.additionalRenters.length > 0 && (
        <div className="text-sm text-neutral-600 mt-2">
          <strong>Additional Renters:</strong>
          <ul className="list-disc ml-5 mt-1">
            {app.additionalRenters.map((r, idx) => (
              <li key={idx}>
                {r.firstName} {r.lastName} ({r.isAdult ? 'Adult' : r.isChild ? 'Child' : ''})
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-sm text-neutral-700 mt-2">
        <strong>Status:</strong> {app.status || 'pending'}
        {app.ownerComment && (
          <span className="text-neutral-500"> ({app.ownerComment})</span>
        )}
      </p>

      {app.status === 'approved' && (
        <p className="text-sm text-green-600 mt-1">
          Your application was approved! Contract will be sent within 48 hours.
        </p>
      )}
      {app.status === 'declined' && (
        <p className="text-sm text-red-600 mt-1">
          Your application was declined.
          {app.ownerComment && <> Reason: {app.ownerComment}</>}
        </p>
      )}
    </div>
  );
}
