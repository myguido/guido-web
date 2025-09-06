'use client';

import React, { useState } from 'react';
import { X, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { authHelpers } from '../../lib/supabase';

export default function LoginPage({ onClose, onSwitchToSignup, isModal = false, onLoginSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
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
    if (!formData.email) {
      setErrors({ email: 'Please enter your email address first' });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await authHelpers.resetPassword(formData.email);
      
      if (error) {
        setErrors({ submit: error.message });
      } else {
        alert('Password reset email sent! Please check your inbox.');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      setErrors({ submit: 'Failed to send password reset email. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await authHelpers.signIn(formData.email, formData.password);
      
      if (error) {
        // Handle specific Supabase auth errors
        switch (error.message) {
          case 'Invalid login credentials':
            setErrors({ submit: 'Invalid email or password. Please try again.' });
            break;
          case 'Email not confirmed':
            setErrors({ submit: 'Please check your email and confirm your account before signing in.' });
            break;
          case 'Too many requests':
            setErrors({ submit: 'Too many login attempts. Please wait a few minutes and try again.' });
            break;
          default:
            setErrors({ submit: error.message });
        }
        return;
      }

      // Successful login
      console.log('User logged in:', data.user);
      
      // Store remember me preference in localStorage if needed
      if (formData.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }

      // Call success callback if provided
      if (onLoginSuccess) {
        onLoginSuccess(data.user);
      }

      // Close modal/redirect
      if (onClose) {
        onClose();
      } else {
        // Redirect to dashboard or home page
        window.location.href = '/dashboard';
      }
      
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const content = (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200/50">
        {/* Header */}
        <div className="p-8 pb-0">
          {isModal && (
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          )}
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to continue your journey</p>
          </div>
        </div>

        {/* Form */}
        <div className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-50/80 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-gray-200 transition-all ${
                  errors.email ? 'ring-2 ring-red-200 bg-red-50/50' : ''
                }`}
                placeholder="Enter your email"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 bg-gray-50/80 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-gray-200 transition-all ${
                    errors.password ? 'ring-2 ring-red-200 bg-red-50/50' : ''
                  }`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            
            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="rounded-md border-gray-300 text-[#FF6C4A] focus:ring-[#FF6C4A] focus:ring-offset-0"
                  disabled={isLoading}
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-[#FF6C4A] hover:opacity-80 transition-opacity underline"
                disabled={isLoading}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-3">
                <p className="text-sm text-red-600">{errors.submit}</p>
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
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
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
          
          {/* Switch to Signup */}
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">Don't have an account? </span>
            <button 
              onClick={onSwitchToSignup}
              className="text-sm font-medium text-[#FF6C4A] hover:opacity-80 transition-opacity underline"
              disabled={isLoading}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // If it's a modal, wrap in modal overlay
  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200/50">
          {/* Header */}
          <div className="p-8 pb-0">
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to continue your journey</p>
            </div>
          </div>

          {/* Form */}
          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-50/80 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-gray-200 transition-all ${
                    errors.email ? 'ring-2 ring-red-200 bg-red-50/50' : ''
                  }`}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pr-12 bg-gray-50/80 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-gray-200 transition-all ${
                      errors.password ? 'ring-2 ring-red-200 bg-red-50/50' : ''
                    }`}
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>
              
              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="rounded-md border-gray-300 text-[#FF6C4A] focus:ring-[#FF6C4A] focus:ring-offset-0"
                    disabled={isLoading}
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-[#FF6C4A] hover:opacity-80 transition-opacity underline"
                  disabled={isLoading}
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-3">
                  <p className="text-sm text-red-600">{errors.submit}</p>
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
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
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
            
            {/* Switch to Signup */}
            <div className="mt-6 text-center">
              <span className="text-sm text-gray-600">Don't have an account? </span>
              <button 
                onClick={onSwitchToSignup}
                className="text-sm font-medium text-[#FF6C4A] hover:opacity-80 transition-opacity underline"
                disabled={isLoading}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Return full page content
  return content;
}