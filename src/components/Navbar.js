import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthService } from '../services/auth.service';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();
  const authService = new AuthService();

  useEffect(() => {
    // Check authentication status on component mount
    const checkAuth = () => {
      if (authService.isAuthenticated()) {
        const userData = authService.getCurrentUser();
        setUser(userData);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    router.push('/');
  };

  const handleDashboardClick = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/login?redirect=/dashboard');
    }
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
            
            {!loading && (
              <>
                {user ? (
                  <>
                    <button 
                      onClick={handleDashboardClick}
                      className="text-gray-700 hover:text-primary-600"
                    >
                      Dashboard
                    </button>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">
                        Welcome, {user.firstName}
                      </span>
                      <button 
                        onClick={handleLogout}
                        className="btn-secondary"
                      >
                        Logout
                      </button>
                    </div>
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
            
            {!loading && (
              <>
                {user ? (
                  <>
                    <button 
                      onClick={handleDashboardClick}
                      className="block w-full text-left py-2 px-4 text-sm hover:bg-gray-100"
                    >
                      Dashboard
                    </button>
                    <div className="px-4 py-2 text-sm text-gray-600 border-b border-gray-200">
                      Welcome, {user.firstName}
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left py-2 px-4 text-sm hover:bg-gray-100"
                    >
                      Logout
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
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
} 