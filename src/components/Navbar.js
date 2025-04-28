import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const signOut = () => {
    auth.signOut();
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            AI Geneuron Courses
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/courses" className="text-gray-700 hover:text-primary-600">
              Courses
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-primary-600">
              Pricing
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600">
              About
            </Link>
            
            {user ? (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-primary-600">
                  Dashboard
                </Link>
                <button 
                  onClick={signOut}
                  className="btn-secondary"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-primary-600">
                  Login
                </Link>
                <Link href="/signup" className="btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu md:hidden mt-4 pb-2">
            <Link href="/courses" className="block py-2 px-4 text-sm hover:bg-gray-100">
              Courses
            </Link>
            <Link href="/pricing" className="block py-2 px-4 text-sm hover:bg-gray-100">
              Pricing
            </Link>
            <Link href="/about" className="block py-2 px-4 text-sm hover:bg-gray-100">
              About
            </Link>
            
            {user ? (
              <>
                <Link href="/dashboard" className="block py-2 px-4 text-sm hover:bg-gray-100">
                  Dashboard
                </Link>
                <button 
                  onClick={signOut}
                  className="block w-full text-left py-2 px-4 text-sm hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block py-2 px-4 text-sm hover:bg-gray-100">
                  Login
                </Link>
                <Link href="/signup" className="block py-2 px-4 text-sm hover:bg-gray-100">
                  Get Started
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
} 