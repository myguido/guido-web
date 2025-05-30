'use client';

import React, { useState, useMemo } from 'react';
import { Menu, X, Home, Navigation, Users, Briefcase, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const pathname = usePathname();

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

            {/* Desktop Navigation with Pill Styling */}
            <div className="flex items-center">
              <div className="flex bg-[#1F1F1F] border border-gray-600 rounded-lg px-2 py-1 space-x-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-1 text-sm font-medium rounded-full transition-all ${
                      isActiveRoute(item.href)
                        ? "bg-[#FF6C4A] rounded-lg text-white" 
                        : "text-white hover:bg-gray-700 rounded-lg"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Login Button */}
            <div>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-[#FF6C4A] hover:opacity-90 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all"
              >
                Login
              </button>
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
          
          {/* Login Button */}
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="bg-[#FF6C4A] hover:opacity-90 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
          >
            <User size={16} className="inline mr-1" />
            Login
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
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
                    ? "bg-[#FF6C4A] text-white" 
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

      {/* Add padding to body content for mobile */}
      <div className="md:hidden h-16"></div> {/* Top spacing for mobile */}
      <div className="md:hidden h-16 fixed bottom-0 w-full pointer-events-none"></div> {/* Bottom spacing for mobile */}

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Login</h2>
              <button 
                onClick={() => setIsLoginModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  placeholder="Enter your email"
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #FF6C4A'}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  placeholder="Enter your password"
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #FF6C4A'}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 focus:ring-2"
                    style={{ accentColor: '#FF6C4A' }}
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a 
                  href="#" 
                  className="text-sm hover:opacity-80"
                  style={{ color: '#FF6C4A' }}
                >
                  Forgot password?
                </a>
              </div>
              
              <button 
                style={{ backgroundColor: '#FF6C4A' }}
                className="w-full hover:opacity-90 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
              >
                Sign In
              </button>
              
              <div className="text-center">
                <span className="text-sm text-gray-600">Don't have an account? </span>
                <a 
                  href="#" 
                  className="text-sm font-medium hover:opacity-80"
                  style={{ color: '#FF6C4A' }}
                >
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}