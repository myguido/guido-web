'use client';

import React from 'react';
import { ArrowLeft, Users, Target, Award, Heart, Linkedin, Twitter, Mail, Lightbulb, Rocket, Shield, Zap, Globe, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Navbar from '../components/Navbar';

export default function AboutUsPage({ onBack }) {
  return (
    <div className="min-h-screen bg-[#151515] text-white overflow-x-hidden">
      {/* Include Navbar Component */}
      <Navbar />

      {/* Add padding-top to account for fixed navbar */}
      <div className="pt-20">
        {/* Back Button */}
        <div className="bg-[#151515]/95 backdrop-blur-md border-b border-[#FF6C4A]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={onBack}
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
            {/* Grid Pattern */}
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
                MEET THE{' '}
                <span className="bg-gradient-to-r from-[#FF6C4A] via-[#FF876B] to-[#FFB6A5] bg-clip-text text-transparent animate-pulse">
                  GUIDO
                </span>{' '}
                TEAM
              </h1>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
                The visionary minds revolutionizing career guidance through cutting-edge technology
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

        {/* Team Members Section */}
        <section className="py-32 bg-gradient-to-b from-[#151515] to-gray-900 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#FF6C4A] to-[#FF876B] bg-clip-text text-transparent">
                THE VISIONARIES
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#FF6C4A] to-[#FF876B] mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Team Member 1 */}
              <div className="group">
                <div className="relative bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30 hover:border-[#FF6C4A]/50 transition-all duration-500 hover:transform hover:scale-105">
                  {/* Futuristic Avatar */}
                  <div className="relative mb-8">
                    <div className="w-32 h-32 mx-auto relative">
                      {/* Outer Ring */}
                      <div className="absolute inset-0 rounded-full border-2 border-[#FF6C4A]/30 animate-spin"></div>
                      {/* Inner Avatar */}
                      <div className="absolute inset-2 bg-gradient-to-br from-[#FF6C4A] to-[#FF876B] rounded-full flex items-center justify-center">
                        <div className="text-4xl font-bold text-white">AR</div>
                      </div>
                      {/* Status Indicator */}
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2 text-white">ARJUN RAJESH</h3>
                    <div className="inline-block bg-gradient-to-r from-[#FF6C4A] to-[#FF876B] text-transparent bg-clip-text font-bold text-lg mb-4">
                      CEO & Co-Founder
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      Former McKinsey strategist architecting the future of career discovery through AI-driven insights.
                    </p>
                    
                    {/* Skill Tags */}
                    <div className="flex flex-wrap justify-center gap-2">
                      <span className="px-3 py-1 bg-[#FF6C4A]/20 text-[#FF6C4A] rounded-full text-sm border border-[#FF6C4A]/30">Strategy</span>
                      <span className="px-3 py-1 bg-[#FF876B]/20 text-[#FF876B] rounded-full text-sm border border-[#FF876B]/30">Leadership</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="group">
                <div className="relative bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30 hover:border-[#FF876B]/50 transition-all duration-500 hover:transform hover:scale-105">
                  <div className="relative mb-8">
                    <div className="w-32 h-32 mx-auto relative">
                      <div className="absolute inset-0 rounded-full border-2 border-[#FF876B]/30 animate-spin"></div>
                      <div className="absolute inset-2 bg-gradient-to-br from-[#FF876B] to-[#FFB6A5] rounded-full flex items-center justify-center">
                        <div className="text-4xl font-bold text-white">PS</div>
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2 text-white">PRIYA SHARMA</h3>
                    <div className="inline-block bg-gradient-to-r from-[#FF876B] to-[#FFB6A5] text-transparent bg-clip-text font-bold text-lg mb-4">
                      CTO & Co-Founder
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      Ex-Google engineer crafting intelligent algorithms that match dreams with opportunities.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-2">
                      <span className="px-3 py-1 bg-[#FF876B]/20 text-[#FF876B] rounded-full text-sm border border-[#FF876B]/30">AI/ML</span>
                      <span className="px-3 py-1 bg-[#FFB6A5]/20 text-[#FFB6A5] rounded-full text-sm border border-[#FFB6A5]/30">Engineering</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Member 3 */}
              <div className="group">
                <div className="relative bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30 hover:border-[#FFB6A5]/50 transition-all duration-500 hover:transform hover:scale-105">
                  <div className="relative mb-8">
                    <div className="w-32 h-32 mx-auto relative">
                      <div className="absolute inset-0 rounded-full border-2 border-[#FFB6A5]/30 animate-spin"></div>
                      <div className="absolute inset-2 bg-gradient-to-br from-[#FFB6A5] to-[#FF6C4A] rounded-full flex items-center justify-center">
                        <div className="text-4xl font-bold text-white">VK</div>
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2 text-white">VIKRAM KUMAR</h3>
                    <div className="inline-block bg-gradient-to-r from-[#FFB6A5] to-[#FF6C4A] text-transparent bg-clip-text font-bold text-lg mb-4">
                      Head of Mentorship
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      Former Tata Group executive building bridges between industry experts and aspiring professionals.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-2">
                      <span className="px-3 py-1 bg-[#FFB6A5]/20 text-[#FFB6A5] rounded-full text-sm border border-[#FFB6A5]/30">Mentorship</span>
                      <span className="px-3 py-1 bg-[#FF6C4A]/20 text-[#FF6C4A] rounded-full text-sm border border-[#FF6C4A]/30">Networks</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-32 bg-gradient-to-b from-gray-900 to-[#151515] relative">
          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-10 w-2 h-2 bg-[#FF6C4A] rounded-full animate-ping"></div>
            <div className="absolute top-1/3 right-20 w-1 h-1 bg-[#FF876B] rounded-full animate-ping delay-300"></div>
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-[#FFB6A5] rounded-full animate-ping delay-700"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#FF6C4A] to-[#FF876B] bg-clip-text text-transparent">
                OUR DNA
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#FF6C4A] to-[#FF876B] mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Mission */}
              <div className="group relative">
                <div className="bg-gradient-to-b from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/20 hover:border-[#FF6C4A]/50 transition-all duration-500 h-full">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#FF6C4A] to-[#FF876B] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Target className="text-white" size={40} />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-6">MISSION</h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      Democratize career guidance through AI-powered insights, making expert mentorship accessible to every dreamer across India.
                    </p>
                  </div>
                </div>
              </div>

              {/* Vision */}
              <div className="group relative">
                <div className="bg-gradient-to-b from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/20 hover:border-[#FF876B]/50 transition-all duration-500 h-full">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#FF876B] to-[#FFB6A5] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Rocket className="text-white" size={40} />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-6">VISION</h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      Transform India into a nation where every individual discovers their true calling and builds meaningful careers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Values */}
              <div className="group relative">
                <div className="bg-gradient-to-b from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/20 hover:border-[#FFB6A5]/50 transition-all duration-500 h-full">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#FFB6A5] to-[#FF6C4A] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Heart className="text-white" size={40} />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-6">VALUES</h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      Innovation, empathy, accessibility, and integrity drive every decision in our quest to transform lives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-32 bg-gradient-to-r from-[#151515] via-gray-900 to-[#151515] relative overflow-hidden">
          {/* Data Visualization Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full">
              {/* Simulated data lines */}
              <svg className="w-full h-full" viewBox="0 0 1000 400" fill="none">
                <path d="M0,200 Q250,100 500,150 T1000,100" stroke="url(#gradient1)" strokeWidth="2" />
                <path d="M0,250 Q250,180 500,200 T1000,150" stroke="url(#gradient2)" strokeWidth="2" />
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF6C4A" />
                    <stop offset="100%" stopColor="#FF876B" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF876B" />
                    <stop offset="100%" stopColor="#FFB6A5" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#FF6C4A] to-[#FF876B] bg-clip-text text-transparent">
                IMPACT METRICS
              </h2>
              <p className="text-2xl text-gray-300 font-light">Data-driven success stories</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="bg-gradient-to-b from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/20 hover:border-[#FF6C4A]/50 transition-all duration-300">
                  <div className="text-5xl font-bold bg-gradient-to-r from-[#FF6C4A] to-[#FF876B] bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform">
                    15K+
                  </div>
                  <div className="text-lg text-gray-300 uppercase tracking-wide">Careers Transformed</div>
                </div>
              </div>
              
              <div className="group">
                <div className="bg-gradient-to-b from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/20 hover:border-[#FF876B]/50 transition-all duration-300">
                  <div className="text-5xl font-bold bg-gradient-to-r from-[#FF876B] to-[#FFB6A5] bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform">
                    1K+
                  </div>
                  <div className="text-lg text-gray-300 uppercase tracking-wide">Expert Mentors</div>
                </div>
              </div>
              
              <div className="group">
                <div className="bg-gradient-to-b from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/20 hover:border-[#FFB6A5]/50 transition-all duration-300">
                  <div className="text-5xl font-bold bg-gradient-to-r from-[#FFB6A5] to-[#FF6C4A] bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform">
                    99%
                  </div>
                  <div className="text-lg text-gray-300 uppercase tracking-wide">Success Rate</div>
                </div>
              </div>
              
              <div className="group">
                <div className="bg-gradient-to-b from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/20 hover:border-[#FF6C4A]/50 transition-all duration-300">
                  <div className="text-5xl font-bold bg-gradient-to-r from-[#FF6C4A] to-[#FF876B] bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform">
                    100+
                  </div>
                  <div className="text-lg text-gray-300 uppercase tracking-wide">Career Domains</div>
                </div>
              </div>
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
                READY TO SHAPE YOUR FUTURE?
              </h2>
              <p className="text-2xl mb-12 text-white/90 font-light leading-relaxed">
                Join the revolution. Discover your true potential with AI-powered career guidance and connect with industry-leading mentors who will transform your professional journey.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button className="group bg-white text-[#FF6C4A] px-10 py-5 rounded-full text-xl font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl border-2 border-transparent hover:border-white/20">
                  <span className="flex items-center">
                    START YOUR JOURNEY
                    <Rocket className="ml-2 group-hover:translate-x-1 transition-transform" size={24} />
                  </span>
                </button>
                
                <button className="group bg-transparent text-white px-10 py-5 rounded-full text-xl font-bold border-2 border-white hover:bg-white hover:text-[#FF6C4A] transition-all duration-300 hover:scale-105">
                  <span className="flex items-center">
                    EXPLORE FEATURES
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
    </div>
  );
}