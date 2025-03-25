// pages/about.js
import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout>
      <div className="bg-sky-50 min-h-screen">
        <div className="container mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold text-neutral-800 mb-8 text-center">About Palm Run</h1>

          <div className="text-neutral-600 space-y-6 text-center">
            <p>
              Nestled on a barrier island along Florida’s stunning Gulf Coast, Palm Run Beach Condo offers a peaceful coastal retreat just steps from the sand and surf. Located in the heart of Indian Shores, this charming beachside community invites guests to relax, unwind, and enjoy the laid-back rhythm of seaside living.
            </p>

            <p>
              Enjoy a relaxing, walkable lifestyle with charming cafés and restaurants like Indian Shores Coffee Co., Kooky Coconut, and Salt Rock Grill just minutes away. The local Suncoast Beach Trolley makes exploring nearby towns like Clearwater and John’s Pass Village a breeze — no car needed.
            </p>

            <p>
              Outdoor lovers will appreciate access to Town Square Nature Park, the Seaside Seabird Sanctuary, and scenic fishing piers. Golf courses, mini golf, kayak rentals, boat tours, and dolphin-watching excursions are all nearby. There’s always something to enjoy year-round, from fresh markets and art fairs to nature trails and sunset celebrations.
            </p>

            <div className="flex flex-wrap justify-center gap-4 py-6">
              <div className="w-full md:w-[47%]">
                <div className="aspect-[4/3] bg-gray-200 rounded-lg shadow-md overflow-hidden">
                  <img
                    src="/images/beach2.jpeg"
                    alt="Indian Shores Beach"
                    className="object-cover object-center w-full h-full"
                  />
                </div>
              </div>
              <div className="w-full md:w-[47%]">
                <div className="aspect-[4/3] bg-gray-200 rounded-lg shadow-md overflow-hidden">
                  <img
                    src="/images/beach1.jpeg"
                    alt="Sunset at Indian Shores Boardwalk"
                    className="object-cover object-center w-full h-full"
                  />
                </div>
              </div>
            </div>

            <p>
              Our welcoming community is made up of friendly neighbors who return each season to unwind and reconnect. Whether you’re sipping morning coffee on the balcony or strolling the shoreline at dusk, Palm Run is where relaxation and coastal living come together.
            </p>

            <p>
              <strong>Highlights:</strong><br />
              • Gulf beach access just steps away<br />
              • Walkable dining, cafés, and beach bars<br />
              • Nature parks, fishing piers, and bird sanctuary<br />
              • Day trips to Clearwater Beach, John’s Pass, and local state parks<br />
              • Year-round markets, mini golf, and cultural events<br />
              • Quiet, community-oriented atmosphere perfect for long stays
            </p>

            <p>
              Come experience Palm Run – your beachside haven on Florida’s beautiful Gulf Coast.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
