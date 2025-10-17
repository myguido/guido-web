'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authHelpers } from '@/lib/supabase';
import { User, Settings, LogOut } from 'lucide-react';

interface ProfessionalNavbarProps {
  userName?: string;
  userEmail?: string;
  userRole?: string;
}

export default function ProfessionalNavbar({ 
  userName = 'Professional',
  userEmail = '',
  userRole = 'Professional'
}: ProfessionalNavbarProps) {
  const router = useRouter();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await authHelpers.signOut();
      setIsProfileDropdownOpen(false);
      router.push('/');
      console.log('User signed out successfully and redirected to home');
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Error signing out. Please try again.');
    }
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Desktop Navigation - Fixed and Sticky */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 bg-[#151515] shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <button onClick={() => router.push('/professional/dashboard')} className="flex items-center">
                <img
                  src="/assets/Fulllogo.png"
                  alt="Guido Logo"
                  className="h-12 w-auto cursor-pointer"
                />
              </button>
            </div>

            {/* Right Section - User Profile */}
            <div className="flex items-center space-x-3">
              <div className="relative profile-dropdown">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 bg-[#1F1F1F] hover:bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 transition-all"
                >
                  <div className="w-8 h-8 bg-[#FF6C4A] rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="text-white text-sm font-medium">
                    {userName}
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
                      <p className="text-sm font-medium text-white">{userName}</p>
                      <p className="text-xs text-gray-400">{userRole}</p>
                      <p className="text-xs text-gray-400 truncate">{userEmail}</p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        router.push('/professional/profile');
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
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar with Logo */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#151515] shadow-md z-50">
        <div className="flex justify-between items-center h-16 px-4">
          {/* Logo */}
          <button onClick={() => router.push('/professional/dashboard')} className="flex items-center">
            <img
              src="/assets/Fulllogo.png"
              alt="Guido Logo"
              className="h-10 w-auto cursor-pointer"
            />
          </button>
          
          {/* Mobile Right Section */}
          <div className="flex items-center space-x-2">
            {/* Mobile User Profile */}
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
                    <p className="text-sm font-medium text-white truncate">{userName}</p>
                    <p className="text-xs text-gray-400">{userRole}</p>
                    <p className="text-xs text-gray-400 truncate">{userEmail}</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      router.push('/professional/profile');
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
          </div>
        </div>
      </div>
    </>
  );
}