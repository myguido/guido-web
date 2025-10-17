'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authHelpers } from '../../lib/supabase';
import ProfessionalNavbar from '../../components/ProfessionalNavbar';

export default function ProfessionalLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string>('');

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

      setUser(currentUser);

      // Get user role
      const { role, error: roleError } = await authHelpers.getUserRole(currentUser.id);
      
      if (roleError || !role) {
        router.push('/');
        return;
      }

      setUserRole(role);

      // Check if user is a professional
      if (!['counsellor', 'expert', 'alumni'].includes(role)) {
        router.push('/AuthenticatedDashboard');
        return;
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const getFullName = () => {
    if (user?.user_metadata?.first_name && user?.user_metadata?.last_name) {
      return `${user.user_metadata.first_name} ${user.user_metadata.last_name}`;
    }
    return user?.email?.split('@')[0] || 'Professional';
  };

  const getRoleTitle = () => {
    const titles: { [key: string]: string } = {
      counsellor: 'Career Counsellor',
      expert: 'Industry Expert',
      alumni: 'Alumni Mentor'
    };
    return titles[userRole] || 'Professional';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#151515]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6C4A] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#151515]">
      {/* Professional Navbar - Always rendered for professional routes */}
      <ProfessionalNavbar 
        userName={getFullName()}
        userEmail={user?.email || ''}
        userRole={getRoleTitle()}
      />
      
      {/* Main content with top padding for fixed navbar */}
      <div className="pt-24">
        {children}
      </div>
    </div>
  );
}