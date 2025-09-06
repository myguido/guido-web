'use client';

import React, { useState, useMemo } from 'react';
import { Menu, X, Home, Navigation, Users, Briefcase, User, LogOut, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../components/auth/AuthProvider';
import AuthManager from '../components/auth/AuthManager';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth(); // Using the same pattern as home page

  // Memoize navigation items with icons for bottom nav
  const navItems = useMemo(() => [
    { label: "Home", href: "/", icon: Home },
    { label: "Navi", href: "/Navi", icon: Navigation },
    { label: "Counsellors", href: "/counsellors", icon: Users },
    { label: "Industry Experts", href: "/industry-experts", icon: Briefcase }
  ], []);

  // Memoize active route check to prevent recalculating on every render
  const isActiveRoute = useMemo(() => (href) => {
    return pathname === href;
  }, [pathname]);

  const handleOpenLogin = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const handleOpenSignup = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (user, type) => {
    console.log(`${type} successful:`, user);
    setIsAuthModalOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Error signing out. Please try again.');
    }
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="hidden md:block fixed top-0 left-0 right-0 bg-[#151515] shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/assets/Fulllogo.png"
                  alt="Guido Logo"
                  width={180}
                  height={50}
                  priority
                  className="cursor-pointer"
                />
              </Link>
            </div>
            <div className="text-white">
              <div className="w-6 h-6 border-2 border-[#FF6C4A] border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Navigation - Fixed and Sticky */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 bg-[#151515] shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/assets/Fulllogo.png"
                  alt="Guido Logo"
                  width={180}
                  height={50}
                  priority
                  className="cursor-pointer"
                />
              </Link>
            </div>

            {/* Desktop Navigation with Pill Styling - Only show if authenticated */}
            {user && (
              <div className="flex items-center">
                <div className="flex bg-[#1F1F1F] border border-gray-600 rounded-lg px-2 py-1 space-x-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                        isActiveRoute(item.href)
                          ? "bg-[#FF6C4A] text-white shadow-md" 
                          : "text-white hover:bg-gray-700"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-[#FF6C4A] rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <span className="text-white text-sm font-medium">
                      {user?.user_metadata?.firstName || 
                       user?.user_metadata?.first_name || 
                       user?.email?.split('@')[0] || 
                       'User'}
                    </span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-all flex items-center space-x-2"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleOpenLogin}
                    className="bg-[#FF6C4A] hover:opacity-90 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleOpenSignup}
                    className="bg-transparent border-2 border-[#FF6C4A] text-[#FF6C4A] hover:bg-[#FF6C4A] hover:text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar with Logo */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#151515] shadow-md z-50">
        <div className="flex justify-between items-center h-16 px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/Fulllogo.png"
              alt="Guido Logo"
              width={140}
              height={40}
              priority
              className="cursor-pointer"
            />
          </Link>
          
          {/* Auth Buttons or User Info */}
          <div className="flex items-center space-x-2">
            {loading ? (
              <div className="w-6 h-6 border-2 border-[#FF6C4A] border-t-transparent rounded-full animate-spin"></div>
            ) : user ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#FF6C4A] rounded-full flex items-center justify-center">
                  <User size={14} className="text-white" />
                </div>
                <button
                  onClick={handleSignOut}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-semibold text-sm transition-all flex items-center space-x-1"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={handleOpenLogin}
                  className="bg-[#FF6C4A] hover:opacity-90 text-white px-3 py-2 rounded-lg font-semibold text-sm transition-all flex items-center space-x-1"
                >
                  <User size={14} />
                  <span>Login</span>
                </button>
                <button
                  onClick={handleOpenSignup}
                  className="bg-transparent border border-[#FF6C4A] text-[#FF6C4A] hover:bg-[#FF6C4A] hover:text-white px-3 py-2 rounded-lg font-semibold text-xs transition-all"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation - Only show if authenticated */}
      {user && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#151515] border-t border-gray-700 z-50">
          <div className="flex justify-around items-center py-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = isActiveRoute(item.href);
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-[#FF6C4A] text-white shadow-md" 
                      : "text-gray-400 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  <IconComponent size={20} className="mb-1" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}

      {/* Add padding to body content for mobile top bar */}
      <div className="md:hidden h-16"></div>
      
      {/* Add padding for mobile bottom navigation only if user is authenticated */}
      {user && <div className="md:hidden h-16 fixed bottom-0 w-full pointer-events-none"></div>}

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <AuthManager
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={handleAuthSuccess}
          isModal={true}
          initialMode={authMode}
        />
      )}
    </>
  );
}