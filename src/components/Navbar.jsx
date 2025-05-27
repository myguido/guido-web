'use client';

import React, { useState, useMemo } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const pathname = usePathname();

  // Memoize navigation items to prevent recreating on every render
  const navItems = useMemo(() => [
    { label: "Home", href: "/" },
    { label: "Navi", href: "/Navi" },
    { label: "Counsellors", href: "/counsellors" },
    { label: "Industry Experts", href: "/industry-experts" }
  ], []);

  // Memoize active route check to prevent recalculating on every render
  const isActiveRoute = useMemo(() => (href) => {
    return pathname === href;
  }, [pathname]);

  return (
    <>
      {/* Navigation - Fixed and Sticky */}
      <nav className="fixed top-0 left-0 right-0 bg-[#151515] shadow-md z-50">
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
            <div className="hidden md:flex items-center">
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
            <div className="hidden md:block">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-[#FF6C4A] hover:opacity-90 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all"
              >
                Login
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden px-4 pb-4">
            <div className="space-y-2 pt-4 border-t border-gray-700">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block text-white px-4 py-2 rounded-full text-center font-medium transition ${
                    isActiveRoute(item.href)
                      ? "bg-[#FF6C4A]"
                      : "bg-[#2a2a2a] hover:bg-[#FF6C4A]/90"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsLoginModalOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full bg-[#FF6C4A] text-white px-4 py-2 rounded-full font-semibold mt-2 transition hover:opacity-90"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </nav>

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