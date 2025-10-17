'use client';

import React, { useState } from 'react';
import { X, Eye, EyeOff, CheckCircle, ArrowRight } from 'lucide-react';
import { authHelpers, UserRole } from '../../lib/supabase';
import RoleSelection from './RoleSelection';

interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  [key: string]: any;
}

interface SignupPageProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
  isModal?: boolean;
  onSignupSuccess: (user: User) => void;
}

export default function SignupPage({ onClose, onSwitchToLogin, isModal = false, onSignupSuccess }: SignupPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState<'role' | 'form' | 'success'>('role');
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelection = (role: UserRole) => {
    setSelectedRole(role);
    setCurrentStep('form');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
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
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Sign up user with role - the helper now handles role assignment
      const { data, error } = await authHelpers.signUp(
        formData.email, 
        formData.password, 
        formData.firstName.trim(), 
        formData.lastName.trim(),
        selectedRole
      );
      
      if (error) {
        switch (error.message) {
          case 'User already registered':
            setErrors({ submit: 'An account with this email already exists.' });
            break;
          default:
            setErrors({ submit: error.message });
        }
        return;
      }

      setCurrentStep('success');

      if (onSignupSuccess && data.user && data.user.email) {
        onSignupSuccess({ ...data.user, role: selectedRole } as User);
      }

      setTimeout(() => {
        onSwitchToLogin();
      }, 3000);
      
    } catch (error: any) {
      console.error('Signup error:', error);
      setErrors({ submit: 'An unexpected error occurred.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
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

  // Show role selection first
  if (currentStep === 'role') {
    return (
      <RoleSelection
        onSelectRole={handleRoleSelection}
        onBack={onSwitchToLogin}
        isModal={isModal}
      />
    );
  }

  // Show success message
  if (currentStep === 'success') {
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
          <p className="text-gray-600 mb-4">Account created successfully as {selectedRole}</p>

          <div className="mb-6">
            <p className="text-gray-600 text-sm">
              We've sent a confirmation email to <strong>{formData.email}</strong>
            </p>
          </div>

          <button 
            onClick={onSwitchToLogin}
            className="w-full bg-gradient-to-r from-[#FF6C4A] to-[#dc2626] text-white py-3 px-6 rounded-2xl font-medium"
          >
            Go to Sign In
          </button>
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

  // Show signup form
  const formContent = (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200/50">
      <div className="p-8 pb-0">
        {isModal && (
          <button 
            onClick={() => setCurrentStep('role')}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        )}
        
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-gray-600">Signing up as <span className="font-semibold capitalize">{selectedRole}</span></p>
          <button
            onClick={() => setCurrentStep('role')}
            className="text-sm text-blue-600 hover:underline mt-1"
          >
            Change role
          </button>
        </div>
      </div>

      <div className="px-8 pb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input 
                type="text" 
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-50/80 border-0 rounded-2xl focus:ring-2 focus:ring-gray-200 text-gray-900 placeholder-gray-500 ${errors.firstName ? 'ring-2 ring-red-200' : ''}`}
                disabled={isLoading}
              />
              {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input 
                type="text" 
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-50/80 border-0 rounded-2xl focus:ring-2 focus:ring-gray-200 text-gray-900 placeholder-gray-500 ${errors.lastName ? 'ring-2 ring-red-200' : ''}`}
                disabled={isLoading}
              />
              {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-50/80 border-0 rounded-2xl focus:ring-2 focus:ring-gray-200 text-gray-900 placeholder-gray-500 ${errors.email ? 'ring-2 ring-red-200' : ''}`}
              disabled={isLoading}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 pr-12 bg-gray-50/80 border-0 rounded-2xl focus:ring-2 focus:ring-gray-200 text-gray-900 placeholder-gray-500 ${errors.password ? 'ring-2 ring-red-200' : ''}`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            {formData.password && (
              <div className="mt-2">
                <div className="flex space-x-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`h-1 w-full rounded-full ${i < passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-gray-200'}`} />
                  ))}
                </div>
                <p className="text-xs text-gray-600">Strength: {strengthLabels[passwordStrength - 1]}</p>
              </div>
            )}
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <div className="relative">
              <input 
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 pr-12 bg-gray-50/80 border-0 rounded-2xl focus:ring-2 focus:ring-gray-200 text-gray-900 placeholder-gray-500 ${errors.confirmPassword ? 'ring-2 ring-red-200' : ''}`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
          </div>

          <div>
            <label className="flex items-start">
              <input 
                type="checkbox" 
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="mt-1 rounded-md"
                disabled={isLoading}
              />
              <span className="ml-3 text-sm text-gray-600">
                I agree to the Terms of Service
              </span>
            </label>
            {errors.agreeToTerms && <p className="mt-1 text-xs text-red-500">{errors.agreeToTerms}</p>}
          </div>

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-3">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#FF6C4A] to-[#dc2626] text-white py-3 rounded-2xl font-medium disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button 
            onClick={onSwitchToLogin}
            className="text-sm text-gray-600"
          >
            Already have an account? <span className="text-[#FF6C4A]">Sign In</span>
          </button>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="max-h-[90vh] overflow-y-auto">
          {formContent}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      {formContent}
    </div>
  );
}