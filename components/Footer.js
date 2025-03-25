// components/Footer.js
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white py-4">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between">
        {/* Left side - simple text */}
        <p className="text-sm mb-2 sm:mb-0">
          &copy; {new Date().getFullYear()} Palm Run Beach Condo
        </p>

        {/* Right side - footer links (optional) */}
        <div className="flex space-x-4">
          <Link href="/about" className="text-sm hover:text-neutral-400">
            About
          </Link>
          <Link href="/contact" className="text-sm hover:text-neutral-400">
            Contact
          </Link>
          <Link href="/privacy" className="text-sm hover:text-neutral-400">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
