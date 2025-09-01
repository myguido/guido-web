'use client';

import React from 'react';
import { ArrowLeft, Users, Target, Award, Heart, Linkedin, Twitter, Mail, Lightbulb, Rocket, Shield } from 'lucide-react';
import Image from 'next/image';
import Navbar from '../components/Navbar';

export default function AboutUsPage({ onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Include Navbar Component */}
      <Navbar />

      {/* Add padding-top to account for fixed navbar */}
      <div className="pt-20">
        {/* Back Button */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-orange-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={onBack}
              className="flex items-center text-[#FF6C4A] hover:text-opacity-80 font-semibold transition-colors group"
            >
              <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
              Back to Home
            </button>
          </div>
        </div>

        {/* Hero Section with Illustrated Characters */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#FF6C4A] to-red-600 text-white py-32">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute top-40 right-20 w-20 h-20 bg-white rounded-full"></div>
            <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white rounded-full"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h1 className="text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                MEET THE <span className="text-yellow-300">GUIDO</span> TEAM
              </h1>
              <p className="text-2xl text-orange-100 max-w-4xl mx-auto leading-relaxed font-light">
                The creative minds behind India's most innovative career guidance platform
              </p>
            </div>

            {/* Illustrated Team Members */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
              {/* Founder 1 - Arjun */}
              <div className="text-center group">
                <div className="relative mb-8">
                  {/* Character Illustration */}
                  <div className="w-48 h-48 mx-auto bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    {/* Glasses */}
                    <div className="absolute top-16 w-20 h-8 border-4 border-gray-800 rounded-full bg-transparent"></div>
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-gray-800"></div>
                    {/* Eyes */}
                    <div className="absolute top-20 left-12 w-3 h-3 bg-gray-800 rounded-full"></div>
                    <div className="absolute top-20 right-12 w-3 h-3 bg-gray-800 rounded-full"></div>
                    {/* Smile */}
                    <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-8 h-4 border-b-4 border-gray-800 rounded-full"></div>
                    {/* Hair */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-16 bg-gray-800 rounded-t-full"></div>
                  </div>
                  {/* Briefcase Icon */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-gray-700 rounded flex items-center justify-center">
                    <div className="w-2 h-1 bg-yellow-400"></div>
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-2">ARJUN RAJESH</h3>
                <p className="text-yellow-300 font-bold text-lg mb-4 uppercase tracking-wide">CEO & Co-Founder</p>
                <p className="text-orange-100 leading-relaxed">
                  Former McKinsey consultant turned career transformation evangelist. Believes everyone deserves to love what they do.
                </p>
              </div>

              {/* Founder 2 - Priya */}
              <div className="text-center group">
                <div className="relative mb-8">
                  {/* Character Illustration */}
                  <div className="w-48 h-48 mx-auto bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    {/* Glasses */}
                    <div className="absolute top-16 w-20 h-8 border-4 border-gray-800 rounded-full bg-transparent"></div>
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-gray-800"></div>
                    {/* Eyes */}
                    <div className="absolute top-20 left-12 w-3 h-3 bg-gray-800 rounded-full"></div>
                    <div className="absolute top-20 right-12 w-3 h-3 bg-gray-800 rounded-full"></div>
                    {/* Smile */}
                    <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-8 h-4 border-b-4 border-gray-800 rounded-full"></div>
                    {/* Hair - longer for female character */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-28 h-20 bg-gray-800 rounded-t-full"></div>
                  </div>
                  {/* Laptop Icon */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-gray-700 rounded flex items-center justify-center">
                    <div className="w-6 h-4 bg-green-400 rounded-sm"></div>
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-2">PRIYA SHARMA</h3>
                <p className="text-yellow-300 font-bold text-lg mb-4 uppercase tracking-wide">CTO & Co-Founder</p>
                <p className="text-orange-100 leading-relaxed">
                  Ex-Google engineer who codes the future of career guidance. Makes AI work for human dreams.
                </p>
              </div>

              {/* Founder 3 - Vikram */}
              <div className="text-center group">
                <div className="relative mb-8">
                  {/* Character Illustration */}
                  <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    {/* Glasses */}
                    <div className="absolute top-16 w-20 h-8 border-4 border-gray-800 rounded-full bg-transparent"></div>
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-gray-800"></div>
                    {/* Eyes */}
                    <div className="absolute top-20 left-12 w-3 h-3 bg-gray-800 rounded-full"></div>
                    <div className="absolute top-20 right-12 w-3 h-3 bg-gray-800 rounded-full"></div>
                    {/* Smile */}
                    <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-8 h-4 border-b-4 border-gray-800 rounded-full"></div>
                    {/* Hair */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-16 bg-gray-800 rounded-t-full"></div>
                  </div>
                  {/* People Icon */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-gray-700 rounded flex items-center justify-center">
                    <Users className="text-blue-400" size={16} />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-2">VIKRAM KUMAR</h3>
                <p className="text-yellow-300 font-bold text-lg mb-4 uppercase tracking-wide">Head of Mentorship</p>
                <p className="text-orange-100 leading-relaxed">
                  Former Tata Group HR Director. Connects talented minds with their perfect mentors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About GUIDO Section */}
        <section className="py-24 bg-white relative overflow-hidden">
          {/* Decorative cityscape silhouette */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-800 to-transparent opacity-10">
            <div className="absolute bottom-0 left-10 w-8 h-20 bg-gray-600"></div>
            <div className="absolute bottom-0 left-24 w-12 h-16 bg-gray-700"></div>
            <div className="absolute bottom-0 left-44 w-10 h-24 bg-gray-600"></div>
            <div className="absolute bottom-0 left-64 w-16 h-12 bg-gray-700"></div>
            <div className="absolute bottom-0 right-10 w-8 h-18 bg-gray-600"></div>
            <div className="absolute bottom-0 right-32 w-14 h-20 bg-gray-700"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#FF6C4A] to-red-600 rounded-full mb-8">
                <Lightbulb className="text-white" size={40} />
              </div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">ABOUT GUIDO</h2>
              <div className="w-24 h-1 bg-[#FF6C4A] mx-auto mb-8"></div>
            </div>

            <div className="max-w-4xl mx-auto">
              <p className="text-2xl text-gray-700 leading-relaxed text-center mb-12 font-light">
                GUIDO is a human-sized team of passionate individuals dedicated to revolutionizing career guidance in India. We believe that every person deserves to find their perfect career match, and we're here to make that happen through innovative technology and personalized mentorship.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <div className="text-center p-8 bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl hover:shadow-lg transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FF6C4A] to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Target className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">OUR MISSION</h3>
                  <p className="text-gray-700 leading-relaxed">
                    To democratize career guidance and make expert mentorship accessible to every individual in India.
                  </p>
                </div>

                <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl hover:shadow-lg transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Rocket className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">OUR VISION</h3>
                  <p className="text-gray-700 leading-relaxed">
                    To become India's most trusted platform where dreams meet opportunities and careers are born.
                  </p>
                </div>

                <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl hover:shadow-lg transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Shield className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">OUR VALUES</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Integrity, empathy, innovation, and accessibility guide every decision we make.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-24 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-40 h-40 bg-[#FF6C4A] rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-32 h-32 bg-yellow-400 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-400 rounded-full animate-pulse delay-500"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6">OUR IMPACT</h2>
              <p className="text-2xl text-gray-300 font-light">Numbers that tell our story</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="text-6xl font-bold text-[#FF6C4A] mb-4 group-hover:scale-110 transition-transform">5000+</div>
                <div className="text-xl text-gray-300 uppercase tracking-wide">Dreams Guided</div>
              </div>
              <div className="group">
                <div className="text-6xl font-bold text-yellow-400 mb-4 group-hover:scale-110 transition-transform">500+</div>
                <div className="text-xl text-gray-300 uppercase tracking-wide">Expert Mentors</div>
              </div>
              <div className="group">
                <div className="text-6xl font-bold text-green-400 mb-4 group-hover:scale-110 transition-transform">98%</div>
                <div className="text-xl text-gray-300 uppercase tracking-wide">Success Rate</div>
              </div>
              <div className="group">
                <div className="text-6xl font-bold text-blue-400 mb-4 group-hover:scale-110 transition-transform">50+</div>
                <div className="text-xl text-gray-300 uppercase tracking-wide">Career Domains</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-gradient-to-r from-[#FF6C4A] via-red-500 to-pink-500 text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 border-4 border-white/20 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 border-4 border-white/20 rounded-full"></div>
          <div className="absolute top-1/2 left-20 w-16 h-16 border-4 border-white/20 rounded-full"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-5xl font-bold mb-8">READY TO FIND YOUR PATH?</h2>
            <p className="text-2xl mb-12 max-w-4xl mx-auto font-light leading-relaxed">
              Join thousands of individuals who have discovered their dream careers with GUIDO's personalized guidance and expert mentorship.
            </p>
            <button className="bg-white text-[#FF6C4A] px-12 py-6 rounded-full text-xl font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl">
              START YOUR JOURNEY
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}