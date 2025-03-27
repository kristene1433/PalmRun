// pages/privacy.js

import Layout from '../components/Layout';

export default function Privacy() {
  return (
    <Layout>
      <div className="bg-sky-50 min-h-screen py-12">
        <div className="bg-white max-w-4xl mx-auto px-6 py-10 rounded-lg shadow-md text-neutral-800">
          <h1 className="text-3xl font-bold mb-6 text-neutral-800">Privacy Policy</h1>

          <p className="mb-4">
            At Palm Run Beach Condo (<strong>“Palm Run”</strong>), we are committed to protecting your
            personal information and respecting your privacy rights. This Privacy Policy explains how
            we collect, use, and share your information when you visit or make a booking through our
            website (<strong>“Site”</strong>).
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
          <p className="mb-4">
            <strong>Personal Data:</strong> When you register an account, make a booking, or contact
            us, we may collect personal information such as your name, email address, phone number,
            payment details, and any other information you choose to provide.
          </p>
          <p className="mb-4">
            <strong>Usage Data:</strong> We automatically collect certain information about your
            device and browsing actions, including your IP address, browser type, referring pages, and
            operating system. This data helps us understand how visitors navigate our Site.
          </p>
          <p className="mb-4">
            <strong>Cookies and Similar Technologies:</strong> We use cookies and similar tracking
            technologies to personalize your experience and analyze Site traffic. You can configure
            your browser to reject all cookies, although some parts of our Site may not function
            properly without them.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2">2. How We Use Your Information</h2>
          <p className="mb-4">
            <strong>Provide Services:</strong> We use your personal data to process bookings, manage
            your account, and respond to inquiries or support requests.
          </p>
          <p className="mb-4">
            <strong>Improve Our Site:</strong> Usage data helps us understand visitor preferences,
            enhance Site functionality, and develop new features.
          </p>
          <p className="mb-4">
            <strong>Marketing and Updates:</strong> With your consent, we may send promotional emails
            about Palm Run, special offers, or other news. You can opt out at any time by following
            the unsubscribe link in these communications.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2">3. Sharing Your Information</h2>
          <p className="mb-4">
            <strong>Service Providers:</strong> We may share your information with third-party
            providers who assist us with website operations, payment processing, analytics, or customer
            service. These providers only use your data to perform specific services on our behalf and
            are contractually obligated to protect it.
          </p>
          <p className="mb-4">
            <strong>Legal Requirements:</strong> If required by law or if we believe it's necessary to
            protect our rights, we may disclose your information to comply with legal obligations,
            enforce our Site policies, or protect the property or safety of Palm Run and others.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2">4. Data Security and Retention</h2>
          <p className="mb-4">
            We implement appropriate security measures to protect your personal information from
            unauthorized access, alteration, or disclosure. However, no method of transmission over
            the internet is completely secure, and we cannot guarantee absolute security.
          </p>
          <p className="mb-4">
            We retain your personal data only for as long as necessary to fulfill the purposes
            outlined in this policy, or as required by law.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2">5. Your Rights and Choices</h2>
          <p className="mb-4">
            <strong>Access and Correction:</strong> You have the right to access, correct, or update
            your personal information at any time by logging into your account or contacting us.
          </p>
          <p className="mb-4">
            <strong>Deletion:</strong> You may request the deletion of your personal information. We
            will comply unless we are required to retain certain data for legal or legitimate business
            purposes.
          </p>
          <p className="mb-4">
            <strong>Opt-Out:</strong> You may opt out of marketing communications at any time by
            clicking the unsubscribe link or contacting us directly.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2">6. Third-Party Links</h2>
          <p className="mb-4">
            Our Site may contain links to third-party websites, services, or social media platforms.
            We have no control over and are not responsible for the privacy practices or content of
            these third parties. We encourage you to read their privacy policies before providing any
            personal information.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2">7. Children’s Privacy</h2>
          <p className="mb-4">
            Our Site is not intended for individuals under the age of 16. We do not knowingly collect
            personal information from children. If you believe a child has provided us with personal
            information, please contact us so we can remove it promptly.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2">8. Changes to This Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time to reflect changes in our practices or
            for legal, operational, or regulatory reasons. Any changes will be posted on this page
            with an updated “Last Updated” date.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2">9. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy or wish to exercise your privacy
            rights, please contact us at:
          </p>
          <div className="pl-4 text-sm text-neutral-700">
            <p>Palm Run Beach Condo</p>
            <p>Email: <strong>jaypommrehn@gmail.com</strong></p>
            <p>Phone: <strong>(407) 687-1270</strong></p>
          </div>

          <p className="text-sm mt-6 text-neutral-500">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </Layout>
  );
}
