import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getSession } from 'next-auth/react';

export default function UserDashboard({ session }) {
  const [myApps, setMyApps] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/applications')
      .then((res) => {
        if (!res.ok) throw new Error(`Server responded with status ${res.status}`);
        return res.json();
      })
      .then((data) => setMyApps(data))
      .catch((err) => {
        console.error('Error fetching user applications:', err);
        setError(err.message);
      });
  }, []);

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
            Welcome to the User Dashboard! You can submit an application or make a payment.
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
            <div className="flex flex-col items-center gap-6">
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
  const statusColor = {
    approved: 'bg-green-100 text-green-700',
    declined: 'bg-red-100 text-red-700',
    pending: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <div className="max-w-xl w-full bg-white p-6 rounded-lg shadow-lg border border-gray-200 transition-transform hover:scale-[1.01]">
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

      <div className="mt-2">
        <p className="text-sm text-neutral-700">
          <strong>Status:</strong>{' '}
          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${statusColor[app.status] || 'bg-gray-100 text-gray-700'}`}>
            {app.status || 'pending'}
          </span>
          {app.ownerComment && (
            <span className="text-neutral-500"> ({app.ownerComment})</span>
          )}
        </p>
      </div>

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

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
