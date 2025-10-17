'use client';

import React, { useState } from 'react';
import { Users, Briefcase, GraduationCap, ArrowRight, X } from 'lucide-react';

interface RoleSelectionProps {
  onSelectRole: (role: 'user' | 'counsellor' | 'expert' | 'alumni') => void;
  onBack: () => void;
  isModal?: boolean;
}

export default function RoleSelection({ onSelectRole, onBack, isModal = false }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<'user' | 'counsellor' | 'expert' | 'alumni' | null>(null);

  const roles = [
    {
      id: 'user' as const,
      title: 'I am a Student/User',
      description: 'Looking for career guidance and counselling',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      borderColor: 'border-blue-200',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'counsellor' as const,
      title: 'I am a Counsellor',
      description: 'Provide career guidance and counselling services',
      icon: Briefcase,
      color: 'from-purple-500 to-purple-600',
      borderColor: 'border-purple-200',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'expert' as const,
      title: 'I am an Industry Expert',
      description: 'Share industry knowledge and expertise',
      icon: GraduationCap,
      color: 'from-orange-500 to-orange-600',
      borderColor: 'border-orange-200',
      bgColor: 'bg-orange-50'
    },
    {
      id: 'alumni' as const,
      title: 'I am an Alumni',
      description: 'Help students with institution insights',
      icon: GraduationCap,
      color: 'from-green-500 to-green-600',
      borderColor: 'border-green-200',
      bgColor: 'bg-green-50'
    }
  ];

  const handleContinue = () => {
    if (selectedRole) {
      onSelectRole(selectedRole);
    }
  };

  const content = (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-200/50">
      {/* Header */}
      <div className="p-8 pb-6 border-b">
        {isModal && (
          <button 
            onClick={onBack}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        )}
        
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Role</h2>
          <p className="text-gray-600">Select how you want to use Guido</p>
        </div>
      </div>

      {/* Role Cards */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`p-6 rounded-2xl border-2 transition-all text-left ${
                  isSelected
                    ? `${role.borderColor} ${role.bgColor} shadow-lg scale-105`
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${role.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{role.title}</h3>
                <p className="text-sm text-gray-600">{role.description}</p>
                
                {isSelected && (
                  <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                    <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Selected
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selectedRole}
          className="group relative w-full bg-gradient-to-r from-[#FF6C4A] to-[#dc2626] text-white py-4 px-6 rounded-2xl font-medium overflow-hidden transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-[#dc2626] to-[#FF6C4A] translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out group-disabled:translate-x-full"></span>
          <span className="relative flex items-center justify-center">
            Continue
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </span>
        </button>

        {/* Back to Login */}
        <div className="mt-4 text-center">
          <button 
            onClick={onBack}
            className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        {content}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      {content}
    </div>
  );
}