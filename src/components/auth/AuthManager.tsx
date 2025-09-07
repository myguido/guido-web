'use client';

import React, { useState } from 'react';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

// Define the user type
interface User {
  id: string;
  email: string;
  name?: string;
  [key: string]: any; // Allow additional properties
}

// Define the component props interface
interface AuthManagerProps {
  onClose?: () => void;
  isModal?: boolean;
  initialMode?: 'login' | 'signup';
  onAuthSuccess?: (user: User, mode: 'login' | 'signup') => void;
}

export default function AuthManager({ 
  onClose, 
  isModal = true, 
  initialMode = 'login',
  onAuthSuccess 
}: AuthManagerProps) {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>(initialMode);

  const switchToSignup = (): void => {
    setAuthMode('signup');
  };

  const switchToLogin = (): void => {
    setAuthMode('login');
  };

  const handleLoginSuccess = (user: User): void => {
    console.log('Login successful:', user);
    if (onAuthSuccess) {
      onAuthSuccess(user, 'login');
    }
  };

  const handleSignupSuccess = (user: User): void => {
    console.log('Signup successful:', user);
    if (onAuthSuccess) {
      onAuthSuccess(user, 'signup');
    }
  };

  // Provide a default empty function for onClose if it's undefined
  const closeHandler = onClose ?? (() => {});

  if (authMode === 'signup') {
    return (
      <SignupPage
        onClose={closeHandler}
        onSwitchToLogin={switchToLogin}
        isModal={isModal}
        onSignupSuccess={handleSignupSuccess}
      />
    );
  }

  return (
    <LoginPage
      onClose={closeHandler}
      onSwitchToSignup={switchToSignup}
      isModal={isModal}
      onLoginSuccess={handleLoginSuccess}
    />
  );
}