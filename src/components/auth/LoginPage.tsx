'use client';

import React, { useState } from 'react';
import { X, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { authHelpers, utils } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

interface LoginPageProps {
  onClose: () => void;
  onSwitchToSignup: () => void;
  isModal?: boolean;
  onLoginSuccess: (user: any) => void;
}

export default function LoginPage({ onClose, onSwitchToSignup, isModal = false, onLoginSuccess }: LoginPageProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear submit error when user makes changes
    if (errors.submit) {
      setErrors(prev => ({
        ...prev,
        submit: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleForgotPassword = async () => {
    setSuccessMessage(null);
    setErrors({});
    
    if (!formData.email) {
      setErrors({ email: 'Please enter your email address first' });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await authHelpers.resetPassword(formData.email);
      
      if (error) {
        setErrors({ submit: utils.getErrorMessage(error) });
      } else {
        setSuccessMessage('Password reset email sent! Please check your inbox and spam folder.');
      }
    } catch (error: any) {
      console.error('Password reset error:', error);
      setErrors({ submit: 'Failed to send password reset email. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrors({});
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      console.log('🔐 Step 1: Attempting sign in for:', formData.email);
      
      const { data, error } = await authHelpers.signIn(formData.email, formData.password);
      
      if (error) {
        console.error('❌ Sign in error:', error);
        setErrors({ submit: utils.getErrorMessage(error) });
        setIsLoading(false);
        return;
      }

      if (!data?.user) {
        console.error('❌ No user data returned');
        setErrors({ submit: 'Login failed. Please try again.' });
        setIsLoading(false);
        return;
      }

      console.log('✅ Step 2: User signed in successfully, ID:', data.user.id);
      
      // Small delay to ensure auth state is updated
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Fetch user role
      console.log('🔍 Step 3: Fetching user role...');
      const { role: userRole, error: roleError } = await authHelpers.getUserRole(data.user.id);

      if (roleError) {
        console.error('❌ Error fetching user role:', roleError);
        
        // Check if this is a profile not found error
        if (roleError.code === 'PROFILE_NOT_FOUND') {
          setErrors({ 
            submit: 'Your account profile is incomplete. Please contact support or try signing up again.' 
          });
        } else {
          setErrors({ 
            submit: 'Could not load your profile. Please try again or contact support.' 
          });
        }
        setIsLoading(false);
        return;
      }

      if (!userRole) {
        console.error('❌ No role found for user');
        setErrors({ 
          submit: 'Your account profile is incomplete. Please contact support.' 
        });
        setIsLoading(false);
        return;
      }

      console.log('✅ Step 4: User role found:', userRole);

      // Save remember me preference
      if (formData.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }

      // Route based on role
      console.log('🚀 Step 5: Routing to dashboard...');
      const dashboardPath = utils.getDashboardPath(userRole);
      console.log('➡️ Redirecting to:', dashboardPath);
      
      // Call success callback
      if (onLoginSuccess) {
        onLoginSuccess({ ...data.user, role: userRole });
      }
      
      // For professionals, redirect immediately without delay
      if (dashboardPath !== '/AuthenticatedDashboard') {
        router.replace(dashboardPath);
        return;
      }
      
      // For regular users, show success message briefly
      setSuccessMessage('Login successful! Redirecting...');
      await new Promise(resolve => setTimeout(resolve, 500));
      router.push(dashboardPath);
      
    } catch (error: any) {
      console.error('💥 Unexpected login error:', error);
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
      setIsLoading(false);
    }
  };

  const loginFormContent = (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200/50">
      {/* Header */}
      <div className="p-8 pb-6 border-b border-gray-100">
        {isModal && (
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        )}
        
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to continue to GUIDO</p>
        </div>
      </div>

      {/* Form */}
      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input 
              id="email"
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 bg-gray-50/80 border-0 rounded-2xl focus:ring-2 focus:ring-[#FF6C4A]/30 transition-all text-gray-900 placeholder-gray-500 ${
                errors.email ? 'ring-2 ring-red-200' : ''
              }`}
              disabled={isLoading}
              autoComplete="email"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={12} />
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input 
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 pr-12 bg-gray-50/80 border-0 rounded-2xl focus:ring-2 focus:ring-[#FF6C4A]/30 transition-all text-gray-900 placeholder-gray-500 ${
                  errors.password ? 'ring-2 ring-red-200' : ''
                }`}
                disabled={isLoading}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                disabled={isLoading}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={12} />
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-[#FF6C4A] focus:ring-[#FF6C4A] focus:ring-offset-0"
                disabled={isLoading}
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-[#FF6C4A] hover:text-[#dc2626] transition-colors font-medium disabled:opacity-50"
              disabled={isLoading}
            >
              Forgot Password?
            </button>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-3">
              <p className="text-sm text-green-700 flex items-center gap-2">
                <CheckCircle size={16} />
                {successMessage}
              </p>
            </div>
          )}

          {/* Error Message */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-3">
              <p className="text-sm text-red-600 flex items-center gap-2">
                <AlertCircle size={16} />
                {errors.submit}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={isLoading}
            className="group relative w-full bg-gradient-to-r from-[#FF6C4A] to-[#dc2626] text-white py-3 px-6 rounded-2xl font-medium overflow-hidden transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#dc2626] to-[#FF6C4A] translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out group-disabled:translate-x-full"></span>
            <span className="relative flex items-center justify-center">
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </span>
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button 
              onClick={onSwitchToSignup}
              className="text-[#FF6C4A] hover:text-[#dc2626] font-medium transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              Sign Up
            </button>
          </p>
        </div>

        {/* Support Link */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Having trouble? <a href="/support" className="text-[#FF6C4A] hover:text-[#dc2626] font-medium">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        {loginFormContent}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      {loginFormContent}
    </div>
  );
}