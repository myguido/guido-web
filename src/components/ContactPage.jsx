'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send, Zap, Globe, MessageCircle, User, Building, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Navbar from '../components/Navbar';

export default function ContactPage({ onBack, isModal = false }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Start the animation sequence when component mounts
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 3000); // Increased animation duration for smoother effect

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully! We\'ll get back to you soon.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBackClick = () => {
    if (onBack && typeof onBack === 'function') {
      onBack();
    } else {
      // Fallback navigation
      if (typeof window !== 'undefined') {
        window.history.back();
      }
    }
  };

  // If used as a modal, render with overlay
  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-hidden">
        <div className="h-screen bg-gradient-to-br from-[#151515] via-gray-900 to-[#151515] text-white overflow-y-auto">
          {/* Contact Page Content */}
          <ContactPageContent 
            formData={formData}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            handleBackClick={handleBackClick}
            showNavbar={false}
            isAnimating={isAnimating}
          />
        </div>
      </div>
    );
  }

  // Regular page render
  return (
    <div className="h-screen bg-gradient-to-br from-[#151515] via-gray-900 to-[#151515] text-white overflow-hidden">
      <ContactPageContent 
        formData={formData}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        handleBackClick={handleBackClick}
        showNavbar={true}
        isAnimating={isAnimating}
      />
    </div>
  );
}

// Main content component
function ContactPageContent({ formData, handleSubmit, handleInputChange, handleBackClick, showNavbar, isAnimating }) {
  return (
    <>
      {/* Include Navbar Component only if needed */}
      {showNavbar && <Navbar />}

      {/* Main Container with proper overflow handling */}
      <div className={`h-full overflow-y-auto scrollbar-hide ${showNavbar ? "pt-20" : ""}`}>
        
        {/* Back Button - Always at top */}
        <div className={`relative z-50 transition-all duration-1000 ease-in-out ${
          isAnimating ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="bg-[#151515]/95 backdrop-blur-md border-b border-[#FF6C4A]/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <button
                onClick={handleBackClick}
                className="flex items-center text-[#FF6C4A] hover:text-[#FF876B] font-semibold transition-all duration-300 group"
              >
                <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" size={20} />
                Back to Home
              </button>
            </div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {/* Animated Grid */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" 
                 style={{
                   backgroundImage: `linear-gradient(rgba(255, 108, 74, 0.3) 1px, transparent 1px), 
                                   linear-gradient(90deg, rgba(255, 108, 74, 0.3) 1px, transparent 1px)`,
                   backgroundSize: '60px 60px',
                   animation: 'gridMove 20s linear infinite'
                 }}>
            </div>
          </div>
          
          {/* Floating Geometric Shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 border border-[#FF6C4A]/20 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-20 h-20 bg-gradient-to-br from-[#FF876B]/10 to-transparent rounded-full animate-bounce"></div>
          <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-[#FFB6A5]/30 rotate-45 animate-spin"></div>
          <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-gradient-to-tr from-[#FF6C4A]/10 to-transparent rounded-full animate-pulse delay-300"></div>
        </div>

        {/* Hero Title with Smooth Animation */}
        <div className="relative">
          <div className={`transition-all duration-[3000ms] ease-in-out transform ${
            isAnimating 
              ? 'fixed inset-0 flex items-center justify-center z-30 scale-100 translate-y-0' 
              : 'relative pt-8 pb-4 text-center scale-75 -translate-y-8'
          }`}>
            <div className="relative">
              <h1 className={`font-black tracking-tight leading-tight transition-all duration-[3000ms] ease-in-out ${
                isAnimating 
                  ? 'text-6xl lg:text-8xl' 
                  : 'text-4xl lg:text-5xl'
              }`}>
                CONNECT{' '}
                <span className="bg-gradient-to-r from-[#FF6C4A] via-[#FF876B] to-[#FFB6A5] bg-clip-text text-transparent animate-pulse">
                  WITH US
                </span>
              </h1>
              
              {/* Subtitle that smoothly fades out during animation */}
              <p className={`text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light mt-6 transition-all duration-[2000ms] ease-in-out ${
                isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 h-0 mt-0'
              }`}>
                Ready to transform your career? Let's start a conversation that could change your future
              </p>
            </div>
          </div>
        </div>

        {/* Main Content - Smoothly appears after animation */}
        <div className={`transition-all duration-[2000ms] ease-in-out delay-[1500ms] ${
          isAnimating ? 'opacity-0 translate-y-16' : 'opacity-100 translate-y-0'
        }`}>

          {/* Contact Form Section */}
          <section className="py-8 relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              
              <div className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-gray-700/30 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300 uppercase tracking-wide">
                        First Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FF6C4A]" size={20} />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6C4A] focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
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
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF876B] focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
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
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFB6A5] focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 uppercase tracking-wide">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FF6C4A]" size={20} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6C4A] focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 uppercase tracking-wide">
                      Subject *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FF876B]" size={20} />
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF876B] focus:border-transparent text-white backdrop-blur-sm transition-all duration-300 appearance-none"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="mentorship">Mentorship Program</option>
                        <option value="partnership">Partnership Opportunity</option>
                        <option value="support">Technical Support</option>
                        <option value="feedback">Feedback & Suggestions</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 uppercase tracking-wide">
                      Message *
                    </label>
                    <div className="relative">
                      <MessageCircle className="absolute left-4 top-4 text-[#FFB6A5]" size={20} />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows="5"
                        className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFB6A5] focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 resize-none"
                        placeholder="Tell us how we can help transform your career journey..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="text-center pt-4">
                    <button
                      type="submit"
                      className="group bg-gradient-to-r from-[#FF6C4A] to-[#FF876B] text-white px-10 py-4 rounded-full text-lg font-bold hover:from-[#FF876B] hover:to-[#FFB6A5] transition-all duration-300 hover:scale-105 shadow-2xl border-2 border-transparent hover:border-white/20"
                    >
                      <span className="flex items-center">
                        SEND MESSAGE
                        <Send className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>

          {/* Contact Information Section */}
          <section className="py-12 bg-gradient-to-b from-transparent to-gray-900/50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#FF6C4A] to-[#FF876B] bg-clip-text text-transparent">
                  GET IN TOUCH
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-[#FF6C4A] to-[#FF876B] mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Email */}
                <div className="group">
                  <div className="relative bg-gradient-to-b from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-[#FF6C4A]/50 transition-all duration-500 hover:transform hover:scale-105 text-center h-full">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FF6C4A] to-[#FF876B] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Mail className="text-white" size={24} />
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-white">EMAIL US</h3>
                    <p className="text-gray-300 text-sm mb-1">contact@guido.com</p>
                    <p className="text-gray-300 text-sm">support@guido.com</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="group">
                  <div className="relative bg-gradient-to-b from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-[#FF876B]/50 transition-all duration-500 hover:transform hover:scale-105 text-center h-full">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FF876B] to-[#FFB6A5] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Phone className="text-white" size={24} />
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-white">CALL US</h3>
                    <p className="text-gray-300 text-sm mb-1">+91 98765 43210</p>
                    <p className="text-gray-300 text-sm">+91 87654 32109</p>
                  </div>
                </div>

                {/* Office */}
                <div className="group">
                  <div className="relative bg-gradient-to-b from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-[#FFB6A5]/50 transition-all duration-500 hover:transform hover:scale-105 text-center h-full">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FFB6A5] to-[#FF6C4A] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="text-white" size={24} />
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-white">VISIT US</h3>
                    <p className="text-gray-300 text-sm mb-1">Innovation Hub</p>
                    <p className="text-gray-300 text-sm mb-1">Tech Park, Sector 12</p>
                    <p className="text-gray-300 text-sm">Kanpur, UP 208012</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="group">
                  <div className="relative bg-gradient-to-b from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-[#FF6C4A]/50 transition-all duration-500 hover:transform hover:scale-105 text-center h-full">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FF6C4A] to-[#FF876B] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Clock className="text-white" size={24} />
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-white">HOURS</h3>
                    <p className="text-gray-300 text-sm mb-1">Mon-Fri: 9AM-6PM</p>
                    <p className="text-gray-300 text-sm mb-1">Sat: 10AM-4PM</p>
                    <p className="text-gray-300 text-sm">Sun: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-12 bg-gradient-to-r from-gray-900/50 via-transparent to-gray-900/50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#FF6C4A] to-[#FF876B] bg-clip-text text-transparent">
                  FREQUENTLY ASKED
                </h2>
                <p className="text-lg text-gray-300 font-light">Quick answers to common questions</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-b from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/20 hover:border-[#FF6C4A]/50 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#FF6C4A] to-[#FF876B] rounded-full flex items-center justify-center mb-4">
                    <Zap className="text-white" size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">Response Time?</h4>
                  <p className="text-gray-300 text-sm">We respond to all inquiries within 24 hours during business days.</p>
                </div>
                
                <div className="bg-gradient-to-b from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/20 hover:border-[#FF876B]/50 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#FF876B] to-[#FFB6A5] rounded-full flex items-center justify-center mb-4">
                    <Phone className="text-white" size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">Schedule a Call?</h4>
                  <p className="text-gray-300 text-sm">Mention your preferred time in the message and we'll coordinate a call.</p>
                </div>
                
                <div className="bg-gradient-to-b from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/20 hover:border-[#FFB6A5]/50 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#FFB6A5] to-[#FF6C4A] rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="text-white" size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">Emergency Support?</h4>
                  <p className="text-gray-300 text-sm">For urgent matters, call our phone number directly for faster assistance.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-gradient-to-br from-[#FF6C4A] via-[#FF876B] to-[#FFB6A5] relative overflow-hidden">
            {/* Geometric Patterns */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-white rotate-45 animate-bounce"></div>
              <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white rounded-full animate-ping"></div>
              <div className="absolute bottom-1/3 right-1/3 w-14 h-14 border-2 border-white rounded-full animate-pulse delay-300"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-6 text-white">
                  LET'S BUILD YOUR FUTURE
                </h2>
                <p className="text-lg mb-8 text-white/90 font-light leading-relaxed">
                  Ready to take the next step? Join thousands of professionals who have transformed their careers with GUIDO's revolutionary platform.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Custom CSS for smooth animations and scrollbar hiding */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}