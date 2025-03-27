import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { getSession } from 'next-auth/react';

export default function OwnerDashboard({ session }) {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch('/api/applications')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setApps(data);
        else {
          setApps([]);
          console.error('Expected array from /api/applications');
        }
      })
      .catch((err) => {
        console.error('Error fetching applications:', err);
      });
  }, []);

  const refreshApps = async () => {
    try {
      const res = await fetch('/api/applications');
      const data = await res.json();
      if (Array.isArray(data)) setApps(data);
      else {
        setApps([]);
        console.error('Expected array in refreshApps');
      }
    } catch (err) {
      console.error('Error in refreshApps:', err);
      setApps([]);
    }
  };

  const handleApprove = async (appId) => {
    try {
      await fetch('/api/applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appId, status: 'approved' }),
      });
      await refreshApps();
    } catch (error) {
      console.error('Error approving application:', error);
    }
  };

  const handleDecline = async (appId, comment) => {
    try {
      await fetch('/api/applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appId, status: 'declined', ownerComment: comment }),
      });
      await refreshApps();
    } catch (error) {
      console.error('Error declining application:', error);
    }
  };

  const handleDelete = async (appId) => {
    try {
      await fetch(`/api/applications?id=${appId}`, { method: 'DELETE' });
      await refreshApps();
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  return (
    <Layout>
      <div className="bg-sky-50 min-h-screen">
        <div className="container mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold text-neutral-800 mb-6">Owner Dashboard</h1>
          <p className="text-lg text-neutral-600 mb-6">Below are the latest user applications.</p>

          {apps.length === 0 ? (
            <p className="text-neutral-600">No applications found or an error occurred.</p>
          ) : (
            <div className="space-y-6">
              {apps.map((app) => (
                <ApplicationCard
                  key={app._id}
                  app={app}
                  onApprove={handleApprove}
                  onDecline={handleDecline}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

function ApplicationCard({ app, onApprove, onDecline, onDelete }) {
  const [comment, setComment] = useState('');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="font-semibold text-lg text-neutral-800 mb-1">
        {app.firstName} {app.lastName}
      </h2>
      <p className="text-sm text-neutral-600 mb-1">
        {app.street1}
        {app.street2 ? `, ${app.street2}` : ''}, {app.city}, {app.stateValue}, {app.zip}
      </p>
      <p className="text-sm text-neutral-600 mb-1">Phone: {app.phone}</p>

      {app.startDate && app.endDate && (
        <p className="text-sm text-neutral-600 mb-1">
          Dates Requested: {new Date(app.startDate).toLocaleDateString()} -{' '}
          {new Date(app.endDate).toLocaleDateString()}
        </p>
      )}

      {app.additionalRenters?.length > 0 && (
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
        <strong>Status:</strong> {app.status}{' '}
        {app.ownerComment && <span className="text-neutral-500">({app.ownerComment})</span>}
      </p>

      {app.payment && (
        <div className="text-sm text-blue-700 mt-3">
          <p><strong>Payment Status:</strong> {app.payment.status || 'N/A'}</p>
          <p><strong>Amount:</strong> ${app.payment.amount?.toFixed(2)}</p>
          <p><strong>Date:</strong> {app.payment.date ? new Date(app.payment.date).toLocaleDateString() : 'N/A'}</p>
        </div>
      )}

      <div className="mt-4 flex items-center space-x-2">
        <input
          type="text"
          className="border border-neutral-300 rounded px-3 py-1 text-sm flex-grow focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Add comment if declining..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <div className="flex space-x-3 mt-4">
        <button
          onClick={() => onApprove(app._id)}
          className="bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-400 transition"
        >
          Approve
        </button>
        <button
          onClick={() => onDecline(app._id, comment)}
          className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-400 transition"
        >
          Decline
        </button>
        <button
          onClick={() => onDelete(app._id)}
          className="bg-gray-400 text-white px-3 py-1 text-sm rounded hover:bg-gray-500 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || session.user.role !== 'owner') {
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


