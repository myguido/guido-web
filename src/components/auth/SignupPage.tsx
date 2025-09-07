'use client';

import React, { useState } from 'react';
import { X, Eye, EyeOff, CheckCircle, ArrowRight } from 'lucide-react';
import { authHelpers } from '../../lib/supabase';

export default function SignupPage({ onClose, onSwitchToLogin, isModal = false, onSignupSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service and Privacy Policy';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await authHelpers.signUp(
        formData.email, 
        formData.password, 
        formData.firstName.trim(), 
        formData.lastName.trim()
      );
      
      if (error) {
        // Handle specific Supabase auth errors
        switch (error.message) {
          case 'User already registered':
            setErrors({ submit: 'An account with this email already exists. Please sign in instead.' });
            break;
          case 'Password should be at least 6 characters':
            setErrors({ password: 'Password must be at least 6 characters long.' });
            break;
          case 'Invalid email':
            setErrors({ email: 'Please enter a valid email address.' });
            break;
          case 'Signup requires a valid password':
            setErrors({ password: 'Please enter a valid password.' });
            break;
          default:
            setErrors({ submit: error.message });
        }
        return;
      }

      // Successful signup
      console.log('User signed up:', data.user);
      
      // Show success message
      setShowSuccessMessage(true);

      // Call success callback if provided
      if (onSignupSuccess) {
        onSignupSuccess(data.user);
      }

      // Auto-close after showing success message
      setTimeout(() => {
        if (onClose) {
          onClose();
        } else {
          // Redirect to a confirmation page or login
          onSwitchToLogin();
        }
      }, 3000);
      
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthColors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-lime-400', 'bg-green-400'];
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

  // Success message component
  if (showSuccessMessage) {
    const successContent = (
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200/50">
        <div className="p-8 text-center">
          {isModal && (
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          )}
          
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={28} className="text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to GUIDO!</h2>
          <p className="text-gray-600 mb-6">Account created successfully</p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Check your email!</h3>
            <p className="text-gray-600 text-sm">
              We've sent a confirmation email to <strong>{formData.email}</strong>. 
              Please click the confirmation link to activate your account.
            </p>
          </div>

          <div className="space-y-3">
            <button 
              onClick={onSwitchToLogin}
              className="group relative w-full bg-gradient-to-r from-[#FF6C4A] to-[#dc2626] text-white py-3 px-6 rounded-2xl font-medium overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#dc2626] to-[#FF6C4A] translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
              <span className="relative flex items-center justify-center">
                Go to Sign In
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </button>
            
            <p className="text-xs text-gray-500">
              Didn't receive an email? Check your spam folder or contact support.
            </p>
          </div>
        </div>
      </div>
    );

    if (isModal) {
      return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          {successContent}
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        {successContent}
      </div>
    );
  }

  // Form component
  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input 
            type="text" 
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-gray-50/80 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-gray-200 transition-all ${
              errors.firstName ? 'ring-2 ring-red-200 bg-red-50/50' : ''
            }`}
            placeholder="John"
            disabled={isLoading}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input 
            type="text" 
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-gray-50/80 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-gray-200 transition-all ${
              errors.lastName ? 'ring-2 ring-red-200 bg-red-50/50' : ''
            }`}
            placeholder="Doe"
            disabled={isLoading}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
          )}
        </div>
      </div>

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
          placeholder="john@example.com"
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
            placeholder="Create a strong password"
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
        
        {/* Password Strength Indicator */}
        {formData.password && (
          <div className="mt-2">
            <div className="flex space-x-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1 w-full rounded-full transition-colors ${
                    i < passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <p className={`text-xs ${
              passwordStrength >= 4 ? 'text-green-600' : 
              passwordStrength >= 3 ? 'text-yellow-600' : 
              'text-red-600'
            }`}>
              Password strength: {strengthLabels[passwordStrength - 1] || 'Very Weak'}
            </p>
          </div>
        )}
        
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <input 
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 pr-12 bg-gray-50/80 border-0 rounded-2xl focus:bg-white focus:ring-2 transition-all ${
              errors.confirmPassword 
                ? 'ring-2 ring-red-200 bg-red-50/50' 
                : formData.confirmPassword && formData.password === formData.confirmPassword
                ? 'ring-2 ring-green-200 bg-green-50/50'
                : 'focus:ring-gray-200'
            }`}
            placeholder="Confirm your password"
            disabled={isLoading}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            {formData.confirmPassword && formData.password === formData.confirmPassword ? (
              <CheckCircle className="text-green-500 mr-2" size={16} />
            ) : null}
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isLoading}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
        )}
      </div>
      
      {/* Terms Agreement */}
      <div>
        <label className="flex items-start">
          <input 
            type="checkbox" 
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            className="mt-1 rounded-md border-gray-300 text-[#FF6C4A] focus:ring-[#FF6C4A] focus:ring-offset-0"
            disabled={isLoading}
          />
          <span className="ml-3 text-sm text-gray-600">
            I agree to the{' '}
            <a href="#" className="text-[#FF6C4A] hover:opacity-80 underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-[#FF6C4A] hover:opacity-80 underline">Privacy Policy</a>
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="mt-1 text-sm text-red-500">{errors.agreeToTerms}</p>
        )}
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
              Creating Account...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </>
          )}
        </span>
      </button>
    </form>
  );

  // Main content structure
  const mainContent = (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200/50">
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-gray-600">Join GUIDO and start your journey</p>
        </div>
      </div>

      {/* Form */}
      <div className="px-8 pb-8">
        {formContent}
        
        {/* Switch to Login */}
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <button 
            onClick={onSwitchToLogin}
            className="text-sm font-medium text-[#FF6C4A] hover:opacity-80 transition-opacity underline"
            disabled={isLoading}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );

  // If it's a modal, wrap in modal overlay
  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="max-h-[90vh] overflow-y-auto">
          {mainContent}
        </div>
      </div>
    );
  }

  // Return full page content
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      {mainContent}
    </div>
  );
}