'use client';

import React from 'react';
import { useAuth } from './auth/AuthProvider';
import AuthManager from './auth/AuthManager';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface AuthData {
  user?: any;
  loading?: boolean;
  isAuthenticated?: boolean;
}

export default function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  let authData: AuthData;
  let user = null;
  let loading = false;
  let isAuthenticated = false;

  try {
    authData = useAuth() as AuthData;
    user = authData?.user || null;
    loading = authData?.loading || false;
    isAuthenticated = authData?.isAuthenticated || false;
  } catch (error) {
    console.error('Error accessing auth context:', error);
    // Fallback values are already set above
  }

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // If not authenticated, show auth form or fallback
  if (!isAuthenticated) {
    return fallback || (
      <AuthManager 
        isModal={false} 
        initialMode="login"
        onClose={() => {}} 
        onAuthSuccess={() => {
          // Refresh or redirect after successful authentication
          window.location.reload();
        }}
      />
    );
  }

  // If authenticated, render the protected content
  return <>{children}</>;
}