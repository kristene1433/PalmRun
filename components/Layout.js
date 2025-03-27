// components/Layout.js
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import NavBar from './NavBar';
import Footer from './Footer';

export default function Layout({ children }) {
  useEffect(() => {
    const handleBeforeUnload = () => {
      navigator.sendBeacon('/api/auth/signout');
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}


