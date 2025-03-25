// pages/index.js

import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="bg-sky-50 min-h-screen">
        <div className="container mx-auto px-6 py-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-neutral-800 mb-2">Palm Run Beach Condo</h1>
            <p className="text-lg text-neutral-600">
              Located in Indian Shores, Florida — a monthly rental getaway.
            </p>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow rounded overflow-hidden">
              <img
                src="/images/condo1.jpg"
                alt="Condo 1"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-neutral-800">Relaxing Atmosphere</h3>
              </div>
            </div>

            <div className="bg-white shadow rounded overflow-hidden">
              <img
                src="/images/condo2.jpg"
                alt="Condo 2"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-neutral-800">Oceanfront Views</h3>
              </div>
            </div>

            <div className="bg-white shadow rounded overflow-hidden">
              <img
                src="/images/condo3.jpg"
                alt="Condo 3"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-neutral-800">Comfortable Living</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
