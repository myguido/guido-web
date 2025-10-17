'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Mail, 
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  DollarSign,
  Star,
  Edit2,
  Save,
  Camera,
  Award,
  Calendar,
  Globe,
  Linkedin,
  Twitter,
  CheckCircle,
  FileText,
  ArrowLeft
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Rajesh',
    lastName: 'Kumar',
    email: 'rajesh.kumar@guido.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    role: 'Career Counsellor',
    bio: 'Experienced career counsellor with over 10 years of expertise in guiding students towards their dream careers. Specialized in engineering and technology career paths.',
    qualifications: 'M.A. in Psychology, Certified Career Counsellor',
    experienceYears: 10,
    consultationFee: 2500,
    specializations: ['Engineering Careers', 'Technology', 'Career Transition', 'Resume Building'],
    languages: ['English', 'Hindi', 'Marathi'],
    linkedin: 'linkedin.com/in/rajeshkumar',
    twitter: '@rajeshkumar',
    website: 'rajeshkumar.com',
    rating: 4.8,
    totalReviews: 156,
    isVerified: true
  });

  const handleSave = () => {
    setIsEditing(false);
    // Add save logic here
  };

  const handleInputChange = (field: string, value: string | number) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-[#151515]">
      <div className="pb-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Button */}
          <button
            onClick={() => router.push('/professional/dashboard')}
            className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Dashboard</span>
          </button>

          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
                <User className="mr-3 text-[#FF6C4A]" size={36} />
                Profile
              </h1>
              <p className="text-gray-400">Manage your professional information</p>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 bg-[#FF6C4A] hover:bg-[#FF6C4A]/90 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Edit2 size={18} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 bg-[#1E1E1E] border border-gray-700 hover:border-gray-600 text-gray-300 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-[#FF6C4A] hover:bg-[#FF6C4A]/90 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Profile Header Card */}
          <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-8 mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-[#FF6C4A] to-[#dc2626] rounded-full flex items-center justify-center">
                  <User className="text-white" size={64} />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#FF6C4A] rounded-full flex items-center justify-center border-4 border-[#1E1E1E] hover:bg-[#FF6C4A]/90 transition-colors">
                    <Camera className="text-white" size={18} />
                  </button>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h2 className="text-3xl font-bold text-white">
                    {profileData.firstName} {profileData.lastName}
                  </h2>
                  {profileData.isVerified && (
                    <span className="flex items-center px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full">
                      <CheckCircle size={14} className="mr-1" />
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-lg text-gray-300 mb-4">{profileData.role}</p>
                
                {/* Rating */}
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-400 fill-current" size={20} />
                    <span className="text-xl font-bold text-white">{profileData.rating}</span>
                  </div>
                  <div className="h-6 w-px bg-gray-700"></div>
                  <span className="text-gray-400">{profileData.totalReviews} reviews</span>
                  <div className="h-6 w-px bg-gray-700"></div>
                  <span className="text-gray-400">{profileData.experienceYears} years exp.</span>
                </div>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="flex items-center px-3 py-1.5 bg-[#151515] border border-gray-700 rounded-lg text-sm text-gray-300">
                    <MapPin size={14} className="mr-1.5 text-[#FF6C4A]" />
                    {profileData.location}
                  </span>
                  <span className="flex items-center px-3 py-1.5 bg-[#151515] border border-gray-700 rounded-lg text-sm text-gray-300">
                    <DollarSign size={14} className="mr-1.5 text-[#FF6C4A]" />
                    ₹{profileData.consultationFee}/session
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Basic Information */}
              <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <User className="mr-2 text-[#FF6C4A]" size={20} />
                  Basic Information
                </h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">First Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="w-full px-4 py-2 bg-[#151515] border border-gray-700 rounded-lg text-white focus:border-[#FF6C4A] focus:outline-none"
                        />
                      ) : (
                        <p className="text-white">{profileData.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Last Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="w-full px-4 py-2 bg-[#151515] border border-gray-700 rounded-lg text-white focus:border-[#FF6C4A] focus:outline-none"
                        />
                      ) : (
                        <p className="text-white">{profileData.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Email</label>
                    <div className="flex items-center gap-2">
                      <Mail className="text-gray-400" size={18} />
                      {isEditing ? (
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="flex-1 px-4 py-2 bg-[#151515] border border-gray-700 rounded-lg text-white focus:border-[#FF6C4A] focus:outline-none"
                        />
                      ) : (
                        <p className="text-white">{profileData.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Phone</label>
                    <div className="flex items-center gap-2">
                      <Phone className="text-gray-400" size={18} />
                      {isEditing ? (
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="flex-1 px-4 py-2 bg-[#151515] border border-gray-700 rounded-lg text-white focus:border-[#FF6C4A] focus:outline-none"
                        />
                      ) : (
                        <p className="text-white">{profileData.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Location</label>
                    <div className="flex items-center gap-2">
                      <MapPin className="text-gray-400" size={18} />
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="flex-1 px-4 py-2 bg-[#151515] border border-gray-700 rounded-lg text-white focus:border-[#FF6C4A] focus:outline-none"
                        />
                      ) : (
                        <p className="text-white">{profileData.location}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Details */}
              <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Briefcase className="mr-2 text-[#FF6C4A]" size={20} />
                  Professional Details
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Bio</label>
                    {isEditing ? (
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 bg-[#151515] border border-gray-700 rounded-lg text-white focus:border-[#FF6C4A] focus:outline-none resize-none"
                      />
                    ) : (
                      <p className="text-white">{profileData.bio}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Qualifications</label>
                    <div className="flex items-start gap-2">
                      <GraduationCap className="text-gray-400 mt-1" size={18} />
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.qualifications}
                          onChange={(e) => handleInputChange('qualifications', e.target.value)}
                          className="flex-1 px-4 py-2 bg-[#151515] border border-gray-700 rounded-lg text-white focus:border-[#FF6C4A] focus:outline-none"
                        />
                      ) : (
                        <p className="text-white">{profileData.qualifications}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Experience (Years)</label>
                      {isEditing ? (
                        <input
                          type="number"
                          value={profileData.experienceYears}
                          onChange={(e) => handleInputChange('experienceYears', parseInt(e.target.value))}
                          className="w-full px-4 py-2 bg-[#151515] border border-gray-700 rounded-lg text-white focus:border-[#FF6C4A] focus:outline-none"
                        />
                      ) : (
                        <p className="text-white">{profileData.experienceYears} years</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Consultation Fee (₹)</label>
                      {isEditing ? (
                        <input
                          type="number"
                          value={profileData.consultationFee}
                          onChange={(e) => handleInputChange('consultationFee', parseInt(e.target.value))}
                          className="w-full px-4 py-2 bg-[#151515] border border-gray-700 rounded-lg text-white focus:border-[#FF6C4A] focus:outline-none"
                        />
                      ) : (
                        <p className="text-white">₹{profileData.consultationFee}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Globe className="mr-2 text-[#FF6C4A]" size={20} />
                  Social Links
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">LinkedIn</label>
                    <div className="flex items-center gap-2">
                      <Linkedin className="text-blue-400" size={18} />
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.linkedin}
                          onChange={(e) => handleInputChange('linkedin', e.target.value)}
                          className="flex-1 px-4 py-2 bg-[#151515] border border-gray-700 rounded-lg text-white focus:border-[#FF6C4A] focus:outline-none"
                        />
                      ) : (
                        <p className="text-white">{profileData.linkedin}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Twitter</label>
                    <div className="flex items-center gap-2">
                      <Twitter className="text-blue-400" size={18} />
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.twitter}
                          onChange={(e) => handleInputChange('twitter', e.target.value)}
                          className="flex-1 px-4 py-2 bg-[#151515] border border-gray-700 rounded-lg text-white focus:border-[#FF6C4A] focus:outline-none"
                        />
                      ) : (
                        <p className="text-white">{profileData.twitter}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Website</label>
                    <div className="flex items-center gap-2">
                      <Globe className="text-gray-400" size={18} />
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          className="flex-1 px-4 py-2 bg-[#151515] border border-gray-700 rounded-lg text-white focus:border-[#FF6C4A] focus:outline-none"
                        />
                      ) : (
                        <p className="text-white">{profileData.website}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Additional Info */}
            <div className="space-y-6">
              
              {/* Specializations */}
              <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Award className="mr-2 text-[#FF6C4A]" size={18} />
                  Specializations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.specializations.map((spec, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-blue-500/20 text-blue-400 text-sm rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Globe className="mr-2 text-[#FF6C4A]" size={18} />
                  Languages
                </h3>
                <div className="space-y-2">
                  {profileData.languages.map((lang, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-300"
                    >
                      <div className="w-2 h-2 bg-[#FF6C4A] rounded-full"></div>
                      {lang}
                    </div>
                  ))}
                </div>
              </div>

              {/* Account Status */}
              <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Account Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Verification</span>
                    <span className="flex items-center text-green-400 text-sm">
                      <CheckCircle size={14} className="mr-1" />
                      Verified
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Profile Completion</span>
                    <span className="text-white text-sm font-medium">95%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-[#FF6C4A] h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <FileText className="mr-2 text-[#FF6C4A]" size={18} />
                  Documents
                </h3>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-[#151515] border border-gray-700 hover:border-[#FF6C4A] text-gray-300 hover:text-white rounded-lg transition-colors text-sm text-left">
                    View Certificates
                  </button>
                  <button className="w-full px-4 py-2 bg-[#151515] border border-gray-700 hover:border-[#FF6C4A] text-gray-300 hover:text-white rounded-lg transition-colors text-sm text-left">
                    Upload New Document
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}