'use client';

import React, { useState } from 'react';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

export default function AuthManager({ 
  onClose, 
  isModal = true, 
  initialMode = 'login',
  onAuthSuccess 
}) {
  const [authMode, setAuthMode] = useState(initialMode); // 'login' or 'signup'

  const switchToSignup = () => {
    setAuthMode('signup');
  };

  const switchToLogin = () => {
    setAuthMode('login');
  };

  const handleLoginSuccess = (user) => {
    console.log('Login successful:', user);
    if (onAuthSuccess) {
      onAuthSuccess(user, 'login');
    }
  };

  const handleSignupSuccess = (user) => {
    console.log('Signup successful:', user);
    if (onAuthSuccess) {
      onAuthSuccess(user, 'signup');
    }
  };

  if (authMode === 'signup') {
    return (
      <SignupPage
        onClose={onClose}
        onSwitchToLogin={switchToLogin}
        isModal={isModal}
        onSignupSuccess={handleSignupSuccess}
      />
    );
  }

  return (
    <LoginPage
      onClose={onClose}
      onSwitchToSignup={switchToSignup}
      isModal={isModal}
      onLoginSuccess={handleLoginSuccess}
    />
  );
}