// pages/owner/applications.js
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';

export default function OwnerApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch('/api/applications') // GET request
      .then((res) => res.json())
      .then((data) => setApps(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-neutral-800 mb-6">User Applications</h1>
        {apps.length === 0 ? (
          <p className="text-neutral-600">No applications found.</p>
        ) : (
          <ul className="space-y-4">
            {apps.map((app) => (
              <li key={app._id} className="bg-white p-4 rounded shadow">
                <h2 className="font-semibold">
                  {app.firstName} {app.lastName}
                </h2>
                <p className="text-sm text-neutral-600">
                  {app.street1}, {app.city}, {app.stateValue} {app.zip}
                </p>
                {/* Additional data like phone, date range, etc. */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}
