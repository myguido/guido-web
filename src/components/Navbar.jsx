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
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();

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
      setIsProfileDropdownOpen(false);
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Error signing out. Please try again.');
    }
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

            {/* Desktop Navigation with Pill Styling - Always show if authenticated */}
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

            {/* Right Section - Auth Buttons or User Profile */}
            <div className="flex items-center space-x-3">
              {user ? (
                /* User Profile Section */
                <div className="relative profile-dropdown">
                  <button
                    onClick={toggleProfileDropdown}
                    className="flex items-center space-x-2 bg-[#1F1F1F] hover:bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 transition-all"
                  >
                    <div className="w-8 h-8 bg-[#FF6C4A] rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <span className="text-white text-sm font-medium">
                      {user?.user_metadata?.firstName || 
                       user?.user_metadata?.first_name || 
                       user?.user_metadata?.name || 
                       user?.user_metadata?.full_name ||
                       user?.email?.split('@')[0] || 
                       'User'}
                    </span>
                    <div className="text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#1F1F1F] border border-gray-600 rounded-lg shadow-lg py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-600">
                        <p className="text-sm font-medium text-white">
                          {user?.user_metadata?.firstName || 
                           user?.user_metadata?.first_name || 
                           user?.user_metadata?.name || 
                           user?.user_metadata?.full_name ||
                           'User'}
                        </p>
                        <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                      </div>
                      
                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          // Add profile navigation here if needed
                          console.log('Navigate to profile');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-all flex items-center space-x-2"
                      >
                        <Settings size={16} />
                        <span>Profile Settings</span>
                      </button>
                      
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-all flex items-center space-x-2"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Auth Buttons - Only show when user is NOT logged in */
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
          
          {/* Mobile Right Section */}
          <div className="flex items-center space-x-2">
            {loading ? (
              <div className="w-6 h-6 border-2 border-[#FF6C4A] border-t-transparent rounded-full animate-spin"></div>
            ) : user ? (
              /* Mobile User Profile */
              <div className="relative profile-dropdown">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 bg-[#1F1F1F] hover:bg-gray-700 border border-gray-600 rounded-lg px-2 py-1 transition-all"
                >
                  <div className="w-8 h-8 bg-[#FF6C4A] rounded-full flex items-center justify-center">
                    <User size={14} className="text-white" />
                  </div>
                  <div className="text-gray-400">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Mobile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-[#1F1F1F] border border-gray-600 rounded-lg shadow-lg py-2 z-50">
                    <div className="px-3 py-2 border-b border-gray-600">
                      <p className="text-sm font-medium text-white truncate">
                        {user?.user_metadata?.firstName || 
                         user?.user_metadata?.first_name || 
                         user?.user_metadata?.name || 
                         user?.user_metadata?.full_name ||
                         'User'}
                      </p>
                      <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        console.log('Navigate to profile');
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-white hover:bg-gray-700 transition-all flex items-center space-x-2"
                    >
                      <Settings size={14} />
                      <span>Profile</span>
                    </button>
                    
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-gray-700 transition-all flex items-center space-x-2"
                    >
                      <LogOut size={14} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Mobile Auth Buttons - Only show when user is NOT logged in */
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

      {/* Mobile Bottom Navigation - Always show if authenticated */}
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