'use client';

import React from 'react';
import { useAuth } from './auth/AuthProvider';
import AuthManager from './auth/AuthManager';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const authData = useAuth();
  
  // Add safety checks for the auth data
  const user = authData?.user || null;
  const loading = authData?.loading || false;
  const isAuthenticated = authData?.isAuthenticated || false;

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
    return fallback || <AuthManager isModal={false} initialMode="login" />;
  }

  // If authenticated, render the protected content
  return <>{children}</>;
}