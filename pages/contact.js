// pages/contact.js
import Layout from '../components/Layout';

export default function Contact() {
  return (
    <Layout>
      <div className="bg-sky-50 min-h-screen">
        <div className="max-w-2xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold text-neutral-800 mb-6 text-center">Contact Us</h1>

          <p className="text-center text-neutral-700 mb-10 max-w-2xl mx-auto">
            We’d love to hear from you! Whether you have questions about availability, booking details, or the area,
            feel free to reach out. We're here to make your stay at Palm Run Beach Condo smooth, relaxing, and memorable.
          </p>

          {/* Contact Form */}
          <div className="bg-white p-6 rounded shadow mb-10">
            <h2 className="text-xl font-semibold text-neutral-700 mb-4">Send Us a Message</h2>

            <form
              action="https://formspree.io/f/xqaplqzd"
              method="POST"
              className="flex flex-col"
            >
              <div className="mb-4">
                <label className="block text-neutral-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-neutral-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Your email"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-neutral-700 mb-2">Message</label>
                <textarea
                  name="message"
                  rows="5"
                  className="border rounded w-full py-2 px-3"
                  placeholder="How can we help you?"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-neutral-800 text-white w-full py-2 rounded hover:bg-neutral-700"
              >
                Send
              </button>
            </form>
          </div>

          {/* Host Information */}
          <div className="text-center text-neutral-700">
            <h3 className="text-lg font-semibold text-neutral-800">Host Information</h3>
            <p className="mt-1">Jay Pommrehn</p>
            <p>Email: jaypommrehn@gmail.com</p>
            <p>Phone: (407) 687-1270</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
