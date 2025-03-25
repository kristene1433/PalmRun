import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  const userRole = session?.user?.role || 'user'; // fallback if undefined
  const dashboardRoute =
    userRole === 'owner' ? '/owner/dashboard' : '/user/dashboard';

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="bg-neutral-800 text-white px-6 py-4 flex justify-between items-center">
      {/* Brand / Logo on the left */}
      <div className="text-xl font-semibold">
        <Link href="/">Palm Run</Link>
      </div>

      {/* Menu button & dropdown on the right */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded"
        >
          Menu
        </button>

        {menuOpen && (
          <ul className="absolute right-0 mt-2 w-48 bg-white text-neutral-700 shadow-md rounded">
            <li>
              <Link
                href="/about"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </li>

            {!isLoggedIn && (
              <>
                <li>
                  <Link
                    href="/register"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signin"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </li>
              </>
            )}

            {isLoggedIn && (
              <>
                <li>
                  <Link
                    href={dashboardRoute}
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setMenuOpen(false);
                      handleSignOut();
                    }}
                  >
                    Sign Out
                  </button>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
}
