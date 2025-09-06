'use client';

import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, Users, DollarSign, Briefcase, GraduationCap, Code, TrendingUp, Rocket, User, Mail, Phone, Upload, ChevronDown, ChevronUp, Play, Zap, Globe, Building, X } from 'lucide-react';
import Image from 'next/image';
import Navbar from '../components/Navbar';

export default function CareersPage({ onClose, onBack, isModal = false }) {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationJob, setApplicationJob] = useState(null);
  const [applicationData, setApplicationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    resume: null,
    coverLetter: '',
    linkedin: ''
  });

  const jobs = [
    {
      id: 1,
      title: "SALES EXECUTIVE",
      department: "Sales & Growth",
      location: "Kanpur, UP",
      type: "Full-time",
      experience: "1-3 years",
      salary: "₹3-6 LPA",
      color: "from-[#FF6C4A] to-[#FF876B]",
      icon: TrendingUp,
      description: "Drive the future of career guidance by connecting with visionary professionals and scaling our revolutionary platform across India.",
      responsibilities: [
        "Generate and convert high-quality leads through strategic outreach",
        "Build lasting relationships with clients and industry partners",
        "Demonstrate GUIDO's AI-powered platform to prospective users",
        "Achieve and exceed monthly/quarterly revenue targets",
        "Collaborate with marketing team on growth initiatives",
        "Provide market intelligence and customer feedback"
      ],
      requirements: [
        "Bachelor's degree in Business, Marketing, or related field",
        "1-3 years of B2B sales experience, preferably in EdTech/SaaS",
        "Exceptional communication and presentation skills",
        "Proven track record of meeting sales targets",
        "Proficiency in CRM systems and sales automation tools",
        "Data-driven mindset with analytical capabilities"
      ],
      benefits: [
        "Competitive base salary + performance-based bonuses",
        "Comprehensive health insurance coverage",
        "Professional development and training programs",
        "Flexible hybrid work model",
        "Stock options and equity participation"
      ]
    },
    {
      id: 2,
      title: "BACKEND DEVELOPER",
      department: "Engineering",
      location: "Kanpur, UP / Remote",
      type: "Full-time",
      experience: "2-5 years",
      salary: "₹8-15 LPA",
      color: "from-[#FF876B] to-[#FFB6A5]",
      icon: Code,
      description: "Architect the technological backbone of India's most advanced career guidance platform, building systems that scale to millions of users.",
      responsibilities: [
        "Design and develop high-performance backend systems and APIs",
        "Build real-time communication infrastructure for mentorship sessions",
        "Optimize database architecture and system performance",
        "Integrate AI/ML models and third-party services",
        "Implement robust security and data protection measures",
        "Lead code reviews and maintain engineering best practices",
        "Collaborate with cross-functional teams on product features"
      ],
      requirements: [
        "Bachelor's/Master's degree in Computer Science or related field",
        "3-5 years of backend development experience",
        "Expertise in Node.js, Python, or Java ecosystems",
        "Strong database skills (PostgreSQL, MongoDB, Redis)",
        "Cloud platform experience (AWS, GCP, or Azure)",
        "Understanding of microservices and distributed systems",
        "Experience with containerization (Docker, Kubernetes)",
        "Knowledge of CI/CD pipelines and DevOps practices"
      ],
      benefits: [
        "Competitive salary with equity options",
        "Latest MacBook Pro and development setup",
        "₹50,000 annual learning and certification budget",
        "Premium health insurance for family",
        "100% remote work flexibility",
        "Conference attendance and tech community participation"
      ]
    },
    {
      id: 3,
      title: "FOUNDER'S OFFICE INTERN",
      department: "Leadership",
      location: "Kanpur, UP",
      type: "Internship",
      experience: "0-1 years",
      salary: "₹25,000-35,000/month",
      color: "from-[#FFB6A5] to-[#FF6C4A]",
      icon: Rocket,
      description: "A rare opportunity to work directly with GUIDO's founding team, gaining invaluable insights into startup operations and strategic decision-making.",
      responsibilities: [
        "Support founders in strategic planning and business development",
        "Conduct comprehensive market research and competitive analysis",
        "Assist in investor relations and fundraising activities",
        "Help create compelling pitch decks and business presentations",
        "Coordinate cross-functional projects and special initiatives",
        "Analyze key business metrics and prepare executive reports",
        "Support talent acquisition and recruitment processes"
      ],
      requirements: [
        "Currently pursuing or recently completed Bachelor's/Master's degree",
        "Strong analytical and critical thinking capabilities",
        "Excellent written and verbal communication skills",
        "Proficiency in Microsoft Office Suite and Google Workspace",
        "Genuine passion for startups and entrepreneurship",
        "Ability to thrive in fast-paced, dynamic environments",
        "Strong attention to detail and project management skills",
        "Previous internship or leadership experience preferred"
      ],
      benefits: [
        "Direct mentorship from founders and senior leadership",
        "360-degree exposure to all business functions",
        "Networking with industry leaders and investors",
        "Certificate of completion and recommendation letters",
        "High potential for full-time conversion",
        "Flexible working hours and learning-focused environment",
        "₹10,000 annual learning and development budget"
      ]
    }
  ];

  const handleApply = (job) => {
    setApplicationJob(job);
    setShowApplicationForm(true);
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    alert(`Application submitted successfully for ${applicationJob.title}! We'll be in touch soon.`);
    setShowApplicationForm(false);
    setApplicationJob(null);
    setApplicationData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      experience: '',
      resume: null,
      coverLetter: '',
      linkedin: ''
    });
  };

  const handleInputChange = (e) => {
    setApplicationData({
      ...applicationData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setApplicationData({
      ...applicationData,
      resume: e.target.files[0]
    });
  };

  const handleBack = () => {
    if (onClose) {
      onClose();
    } else if (onBack) {
      onBack();
    }
  };

  // If used as a modal, render with overlay
  if (isModal || onClose) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
        <div className="min-h-screen bg-[#151515] text-white">
          {/* Close button for modal */}
          <div className="fixed top-4 right-4 z-60">
            <button
              onClick={handleBack}
              className="bg-[#FF6C4A] hover:bg-[#FF876B] text-white p-3 rounded-full transition-all duration-300 shadow-lg"
            >
              <X size={24} />
            </button>
          </div>
          
          <CareersPageContent 
            jobs={jobs}
            selectedJob={selectedJob}
            setSelectedJob={setSelectedJob}
            showApplicationForm={showApplicationForm}
            setShowApplicationForm={setShowApplicationForm}
            applicationJob={applicationJob}
            setApplicationJob={setApplicationJob}
            applicationData={applicationData}
            setApplicationData={setApplicationData}
            handleApply={handleApply}
            handleSubmitApplication={handleSubmitApplication}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
            handleBack={handleBack}
            showNavbar={false}
          />
        </div>
      </div>
    );
  }

  // Regular page render
  return (
    <div className="min-h-screen bg-[#151515] text-white overflow-x-hidden">
      <CareersPageContent 
        jobs={jobs}
        selectedJob={selectedJob}
        setSelectedJob={setSelectedJob}
        showApplicationForm={showApplicationForm}
        setShowApplicationForm={setShowApplicationForm}
        applicationJob={applicationJob}
        setApplicationJob={setApplicationJob}
        applicationData={applicationData}
        setApplicationData={setApplicationData}
        handleApply={handleApply}
        handleSubmitApplication={handleSubmitApplication}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        handleBack={handleBack}
        showNavbar={true}
      />
    </div>
  );
}

// Content component to avoid duplication
function CareersPageContent({ 
  jobs, 
  selectedJob, 
  setSelectedJob, 
  showApplicationForm, 
  setShowApplicationForm,
  applicationJob,
  setApplicationJob,
  applicationData,
  setApplicationData,
  handleApply,
  handleSubmitApplication,
  handleInputChange,
  handleFileChange,
  handleBack,
  showNavbar 
}) {
  
  if (showApplicationForm) {
    return (
      <>
        {showNavbar && <Navbar />}
        <div className={showNavbar ? "pt-20" : ""}>
          {/* Back Button */}
          <div className="bg-[#151515]/95 backdrop-blur-md border-b border-[#FF6C4A]/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <button
                onClick={() => setShowApplicationForm(false)}
                className="flex items-center text-[#FF6C4A] hover:text-[#FF876B] font-semibold transition-all duration-300 group"
              >
                <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" size={20} />
                Back to Careers
              </button>
            </div>
          </div>

          {/* Application Form */}
          <section className="py-20 bg-gradient-to-b from-[#151515] to-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4">
                  APPLY FOR{' '}
                  <span className={`bg-gradient-to-r ${applicationJob.color} bg-clip-text text-transparent`}>
                    {applicationJob.title}
                  </span>
                </h1>
                <p className="text-xl text-gray-300">Join our mission to transform careers across India</p>
              </div>

              <div className="bg-gradient-to-b from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/20">
                <form onSubmit={handleSubmitApplication} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300 uppercase tracking-wide">
                        First Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FF6C4A]" size={20} />
                        <input
                          type="text"
                          name="firstName"
                          value={applicationData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6C4A] focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                          placeholder="Enter your first name"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300 uppercase tracking-wide">
                        Last Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FF876B]" size={20} />
                        <input
                          type="text"
                          name="lastName"
                          value={applicationData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF876B] focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 uppercase tracking-wide">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FFB6A5]" size={20} />
                      <input
                        type="email"
                        name="email"
                        value={applicationData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFB6A5] focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 uppercase tracking-wide">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FF6C4A]" size={20} />
                      <input
                        type="tel"
                        name="phone"
                        value={applicationData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6C4A] focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 uppercase tracking-wide">
                      Years of Experience
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FF876B]" size={20} />
                      <select
                        name="experience"
                        value={applicationData.experience}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF876B] focus:border-transparent text-white backdrop-blur-sm transition-all duration-300 appearance-none"
                      >
                        <option value="">Select experience level</option>
                        <option value="0">Fresher (0 years)</option>
                        <option value="1">1 year</option>
                        <option value="2">2 years</option>
                        <option value="3">3 years</option>
                        <option value="4">4 years</option>
                        <option value="5+">5+ years</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 uppercase tracking-wide">
                      Resume/CV *
                    </label>
                    <div className="relative">
                      <Upload className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FFB6A5]" size={20} />
                      <input
                        type="file"
                        name="resume"
                        onChange={handleFileChange}
                        required
                        accept=".pdf,.doc,.docx"
                        className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFB6A5] focus:border-transparent text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-[#FFB6A5] file:text-gray-800 hover:file:bg-[#FF876B] transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 uppercase tracking-wide">
                      LinkedIn Profile URL
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FF6C4A]" size={20} />
                      <input
                        type="url"
                        name="linkedin"
                        value={applicationData.linkedin}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6C4A] focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 uppercase tracking-wide">
                      Cover Letter
                    </label>
                    <textarea
                      name="coverLetter"
                      value={applicationData.coverLetter}
                      onChange={handleInputChange}
                      rows="6"
                      className="w-full px-4 py-4 bg-gray-800/50 border border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF876B] focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 resize-none"
                      placeholder="Tell us why you're the perfect fit for this role and how you'll contribute to GUIDO's mission..."
                    ></textarea>
                  </div>

                  <div className="text-center pt-4">
                    <button
                      type="submit"
                      className="group bg-gradient-to-r from-[#FF6C4A] to-[#FF876B] text-white px-12 py-4 rounded-full text-lg font-bold hover:from-[#FF876B] hover:to-[#FFB6A5] transition-all duration-300 hover:scale-105 shadow-2xl"
                    >
                      <span className="flex items-center">
                        SUBMIT APPLICATION
                        <Rocket className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Include Navbar Component */}
      {showNavbar && <Navbar />}

      {/* Add padding-top to account for fixed navbar */}
      <div className={showNavbar ? "pt-20" : ""}>
        {/* Back Button */}
        <div className="bg-[#151515]/95 backdrop-blur-md border-b border-[#FF6C4A]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={handleBack}
              className="flex items-center text-[#FF6C4A] hover:text-[#FF876B] font-semibold transition-all duration-300 group"
            >
              <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" size={20} />
              Back to Home
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6C4A]/5 via-transparent to-[#FF876B]/5"></div>
            <div className="absolute inset-0" 
                 style={{
                   backgroundImage: `linear-gradient(rgba(255, 108, 74, 0.1) 1px, transparent 1px), 
                                   linear-gradient(90deg, rgba(255, 108, 74, 0.1) 1px, transparent 1px)`,
                   backgroundSize: '50px 50px'
                 }}>
            </div>
          </div>
          
          {/* Floating Geometric Shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 border border-[#FF6C4A]/30 rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-20 w-20 h-20 bg-gradient-to-br from-[#FF876B]/20 to-transparent rounded-full animate-bounce"></div>
            <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-[#FFB6A5]/40 rotate-45 animate-spin"></div>
            <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-gradient-to-tr from-[#FF6C4A]/10 to-transparent rounded-full"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="mb-16">
              <h1 className="text-7xl lg:text-8xl font-black mb-8 tracking-tight leading-tight">
                JOIN THE{' '}
                <span className="bg-gradient-to-r from-[#FF6C4A] via-[#FF876B] to-[#FFB6A5] bg-clip-text text-transparent animate-pulse">
                  REVOLUTION
                </span>
              </h1>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
                Shape the future of career guidance. Build technology that transforms millions of lives across India.
              </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="w-6 h-10 border-2 border-[#FF6C4A] rounded-full flex justify-center">
                <div className="w-1 h-3 bg-[#FF6C4A] rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Culture Section */}
        <section className="py-32 bg-gradient-to-b from-[#151515] to-gray-900 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#FF6C4A] to-[#FF876B] bg-clip-text text-transparent">
                WHY GUIDO?
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#FF6C4A] to-[#FF876B] mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group">
                <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30 hover:border-[#FF6C4A]/50 transition-all duration-500 hover:transform hover:scale-105 text-center h-full">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#FF6C4A] to-[#FF876B] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Users className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">COLLABORATIVE CULTURE</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Work alongside passionate individuals who are genuinely committed to making a meaningful impact on people's lives and careers.
                  </p>
                </div>
              </div>

              <div className="group">
                <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30 hover:border-[#FF876B]/50 transition-all duration-500 hover:transform hover:scale-105 text-center h-full">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#FF876B] to-[#FFB6A5] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">GROWTH OPPORTUNITIES</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Continuous learning, skill development, and career advancement in one of India's fastest-growing EdTech companies.
                  </p>
                </div>
              </div>

              <div className="group">
                <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30 hover:border-[#FFB6A5]/50 transition-all duration-500 hover:transform hover:scale-105 text-center h-full">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#FFB6A5] to-[#FF6C4A] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Rocket className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">MEANINGFUL IMPACT</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Every line of code, every strategy, every decision directly contributes to transforming careers and fulfilling dreams.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Job Listings Section */}
        <section className="py-32 bg-gradient-to-b from-gray-900 to-[#151515] relative">
          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-10 w-2 h-2 bg-[#FF6C4A] rounded-full animate-ping"></div>
            <div className="absolute top-1/3 right-20 w-1 h-1 bg-[#FF876B] rounded-full animate-ping delay-300"></div>
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-[#FFB6A5] rounded-full animate-ping delay-700"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#FF6C4A] to-[#FF876B] bg-clip-text text-transparent">
                OPEN POSITIONS
              </h2>
              <p className="text-2xl text-gray-300 font-light">Join our mission. Transform your career.</p>
            </div>

            <div className="space-y-8">
              {jobs.map((job) => {
                const IconComponent = job.icon;
                return (
                  <div key={job.id} className="bg-gradient-to-b from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-3xl border border-gray-700/20 hover:border-[#FF6C4A]/30 transition-all duration-500 overflow-hidden">
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-start space-x-6">
                          <div className={`w-16 h-16 bg-gradient-to-br ${job.color} rounded-2xl flex items-center justify-center`}>
                            <IconComponent className="text-white" size={28} />
                          </div>
                          <div>
                            <h3 className="text-3xl font-bold text-white mb-2">{job.title}</h3>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                              <div className="flex items-center gap-1">
                                <Building className="w-4 h-4" />
                                {job.department}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {job.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {job.type}
                              </div>
                              <div className="flex items-center gap-1">
                                <Briefcase className="w-4 h-4" />
                                {job.experience}
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                {job.salary}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                            className="flex items-center px-6 py-3 border border-[#FF6C4A] text-[#FF6C4A] rounded-full hover:bg-[#FF6C4A]/10 transition-all duration-300 font-medium"
                          >
                            {selectedJob === job.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            <span className="ml-2">{selectedJob === job.id ? 'Hide Details' : 'View Details'}</span>
                          </button>
                          <button
                            onClick={() => handleApply(job)}
                            className={`px-8 py-3 bg-gradient-to-r ${job.color} text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 font-bold`}
                          >
                            APPLY NOW
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-lg leading-relaxed mb-6">{job.description}</p>
                      
                      {selectedJob === job.id && (
                        <div className="border-t border-gray-700/30 pt-8 space-y-8">
                          <div>
                            <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                              <Play className="mr-2 text-[#FF6C4A]" size={20} />
                              Key Responsibilities
                            </h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {job.responsibilities.map((resp, index) => (
                                <li key={index} className="flex items-start text-gray-300">
                                  <div className="w-2 h-2 bg-[#FF6C4A] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                  {resp}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                              <Zap className="mr-2 text-[#FF876B]" size={20} />
                              Requirements
                            </h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {job.requirements.map((req, index) => (
                                <li key={index} className="flex items-start text-gray-300">
                                  <div className="w-2 h-2 bg-[#FF876B] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                              <Users className="mr-2 text-[#FFB6A5]" size={20} />
                              Benefits & Perks
                            </h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {job.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start text-gray-300">
                                  <div className="w-2 h-2 bg-[#FFB6A5] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact HR Section */}
        <section className="py-32 bg-gradient-to-r from-[#151515] via-gray-900 to-[#151515] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#FF6C4A] to-[#FF876B] bg-clip-text text-transparent">
                DON'T SEE THE RIGHT ROLE?
              </h2>
            </div>
            
            <div className="bg-gradient-to-b from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/20 text-center max-w-4xl mx-auto">
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                We're always on the lookout for exceptional talent. Send us your resume and tell us how you'd like to contribute to revolutionizing career guidance in India.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF6C4A] to-[#FF876B] rounded-full flex items-center justify-center">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">HR Contact</p>
                    <p className="text-white font-medium">careers@guido.com</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF876B] to-[#FFB6A5] rounded-full flex items-center justify-center">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">Phone</p>
                    <p className="text-white font-medium">+91 98765 43210</p>
                  </div>
                </div>
              </div>
              
              <button className="bg-gradient-to-r from-[#FF6C4A] to-[#FF876B] text-white px-10 py-4 rounded-full text-lg font-bold hover:from-[#FF876B] hover:to-[#FFB6A5] transition-all duration-300 hover:scale-105 shadow-xl">
                <span className="flex items-center">
                  SEND YOUR RESUME
                  <Mail className="ml-2" size={20} />
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-gradient-to-br from-[#FF6C4A] via-[#FF876B] to-[#FFB6A5] relative overflow-hidden">
          {/* Geometric Patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 border-4 border-white rotate-45"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
            <div className="absolute bottom-1/3 right-1/3 w-20 h-20 border-4 border-white rounded-full"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-6xl font-bold mb-8 text-white">
                READY TO TRANSFORM CAREERS?
              </h2>
              <p className="text-2xl mb-12 text-white/90 font-light leading-relaxed">
                Join the team that's revolutionizing how India discovers and builds meaningful careers. Your expertise could be the key to unlocking millions of dreams.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button className="group bg-white text-[#FF6C4A] px-10 py-5 rounded-full text-xl font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl border-2 border-transparent hover:border-white/20">
                  <span className="flex items-center">
                    EXPLORE OPPORTUNITIES
                    <Rocket className="ml-2 group-hover:translate-x-1 transition-transform" size={24} />
                  </span>
                </button>
                
                <button className="group bg-transparent text-white px-10 py-5 rounded-full text-xl font-bold border-2 border-white hover:bg-white hover:text-[#FF6C4A] transition-all duration-300 hover:scale-105">
                  <span className="flex items-center">
                    LEARN MORE
                    <TrendingUp className="ml-2 group-hover:translate-x-1 transition-transform" size={24} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 bg-[#151515] border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-[#FF6C4A] to-[#FF876B] bg-clip-text text-transparent mb-4">
              GUIDO
            </div>
            <p className="text-gray-400 text-lg">
              Empowering careers. Enabling dreams. Transforming futures.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}