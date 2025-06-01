'use client';

import React from 'react';
import { ArrowLeft, Users, Target, Award, Heart, Linkedin, Twitter, Mail } from 'lucide-react';
import Image from 'next/image';
import Navbar from '../components/Navbar';

export default function AboutUsPage({ onBack }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Include Navbar Component */}
      <Navbar />

      {/* Add padding-top to account for fixed navbar */}
      <div className="pt-20">
        {/* Back Button */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={onBack}
              className="flex items-center text-[#FF6C4A] hover:text-opacity-80 font-semibold transition-colors"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Home
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-[#151515] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              About <span className="text-[#FF6C4A]">GUIDO</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Empowering individuals to make informed, confident, and meaningful career choices through expert mentorship and innovative technology.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  GUIDO was born from a simple observation: too many talented individuals in India are making career decisions based on societal pressure rather than personal passion and potential. We witnessed countless students and professionals struggling with career confusion, lacking proper guidance at crucial decision points.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Our founders, having experienced this challenge firsthand, decided to create a solution that combines the wisdom of experienced mentors with the power of modern technology. GUIDO represents our commitment to democratizing career guidance and making expert mentorship accessible to everyone.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Today, we're proud to have helped thousands of individuals discover their true calling and build successful, fulfilling careers.
                </p>
              </div>
              <div className="relative">
                <img
                  src="/assets/GUIDO.png"
                  alt="Team collaboration"
                  className="w-full rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-[#FF6C4A] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  To empower individuals to make informed, confident, and meaningful career choices through expert one-on-one mentorship and innovative career mapping technology.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-[#FF6C4A] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To become India's most trusted career guidance platform, where every individual has access to personalized mentorship and the tools needed to build a fulfilling career.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-[#FF6C4A] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
                <p className="text-gray-700 leading-relaxed">
                  Integrity, empathy, innovation, and accessibility guide everything we do. We believe in putting our users first and creating genuine impact in their lives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Founders</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The visionaries behind GUIDO who are passionate about transforming career guidance in India.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Founder 1 */}
              <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-32 h-32 bg-gradient-to-br from-[#FF6C4A] to-red-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">AR</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Arjun Rajesh</h3>
                <p className="text-[#FF6C4A] font-semibold mb-4">Co-Founder & CEO</p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Former consultant at McKinsey with 8+ years in career development. Arjun's passion for mentorship stems from his own journey of career transformation from engineering to consulting.
                </p>
                <div className="flex justify-center space-x-4">
                  <button className="text-[#FF6C4A] hover:text-opacity-80">
                    <Linkedin size={24} />
                  </button>
                  <button className="text-[#FF6C4A] hover:text-opacity-80">
                    <Twitter size={24} />
                  </button>
                  <button className="text-[#FF6C4A] hover:text-opacity-80">
                    <Mail size={24} />
                  </button>
                </div>
              </div>

              {/* Founder 2 */}
              <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-32 h-32 bg-gradient-to-br from-[#FF6C4A] to-red-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">PS</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Priya Sharma</h3>
                <p className="text-[#FF6C4A] font-semibold mb-4">Co-Founder & CTO</p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Tech entrepreneur and former Google engineer. Priya brings deep expertise in AI and machine learning to create personalized career mapping solutions.
                </p>
                <div className="flex justify-center space-x-4">
                  <button className="text-[#FF6C4A] hover:text-opacity-80">
                    <Linkedin size={24} />
                  </button>
                  <button className="text-[#FF6C4A] hover:text-opacity-80">
                    <Twitter size={24} />
                  </button>
                  <button className="text-[#FF6C4A] hover:text-opacity-80">
                    <Mail size={24} />
                  </button>
                </div>
              </div>

              {/* Founder 3 */}
              <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-32 h-32 bg-gradient-to-br from-[#FF6C4A] to-red-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">VK</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Vikram Kumar</h3>
                <p className="text-[#FF6C4A] font-semibold mb-4">Co-Founder & Head of Mentorship</p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Former HR Director at Tata Group with 12+ years in talent development. Vikram leads our mentor network and ensures quality guidance for all users.
                </p>
                <div className="flex justify-center space-x-4">
                  <button className="text-[#FF6C4A] hover:text-opacity-80">
                    <Linkedin size={24} />
                  </button>
                  <button className="text-[#FF6C4A] hover:text-opacity-80">
                    <Twitter size={24} />
                  </button>
                  <button className="text-[#FF6C4A] hover:text-opacity-80">
                    <Mail size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Stats */}
        <section className="py-20 bg-[#151515] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
              <p className="text-xl text-gray-300">Numbers that reflect our commitment to your success</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-[#FF6C4A] mb-2">5000+</div>
                <div className="text-gray-300">Students Guided</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#FF6C4A] mb-2">500+</div>
                <div className="text-gray-300">Expert Mentors</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#FF6C4A] mb-2">98%</div>
                <div className="text-gray-300">Success Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#FF6C4A] mb-2">50+</div>
                <div className="text-gray-300">Career Domains</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-[#FF6C4A] to-red-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join thousands of individuals who have transformed their careers with GUIDO's personalized guidance.
            </p>
            <button className="bg-white text-[#FF6C4A] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started Today
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}