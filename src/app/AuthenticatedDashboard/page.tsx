'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authHelpers } from '@/lib/supabase';
import AuthenticatedDashboard from '../AuthenticatedDashboard';

export default function AuthenticatedDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      
      // Get current user
      const { user: currentUser, error: userError } = await authHelpers.getCurrentUser();
      
      if (userError || !currentUser) {
        router.push('/');
        return;
      }

      // Check if user is a professional and redirect them
      const { role, error: roleError } = await authHelpers.getUserRole(currentUser.id);
      if (!roleError && role && ['counsellor', 'expert', 'alumni'].includes(role)) {
        router.push('/professional/dashboard');
        return;
      }

      setUser(currentUser);
    } catch (error) {
      console.error('Error loading user data:', error);
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#151515]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6C4A] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return <AuthenticatedDashboard user={user} />;
}
