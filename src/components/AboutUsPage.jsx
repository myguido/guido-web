'use client';

import React from 'react';
import { ArrowLeft, Target, Rocket, Heart, Linkedin, Twitter, Mail, TrendingUp, Sparkles, Goal, Users } from 'lucide-react';

export default function AboutUsPage({ onBack }) {
  // Team members data - Updated with asset paths for your images
  const teamMembers = [
    {
      image: '/assets/ritsssss.jpg', // Replace with the actual path to your image
      name: 'Ritwaj Ranjan',
      title: 'CEO & Founder',
      bio: 'A visionary leader with a passion for leveraging technology to solve real-world challenges. Ritwaj drives the company\'s strategic direction.',
      skills: ['Strategy', 'Vision', 'Leadership'],
      gradient: 'from-[#FF7A59] to-[#FF9B82]'
    },
    {
      image: '/assets/dishaformal.jpeg', // Replace with the actual path to your image
      name: 'Disha Suryawanshi',
      title: 'Co-founder & CMO',
      bio: 'A creative powerhouse dedicated to building a brand that resonates. Disha crafts our narrative and connects Guido with the world.',
      skills: ['Marketing', 'Branding', 'Growth'],
      gradient: 'from-[#FF9B82] to-[#FFB29A]'
    }
  ];

  // Core values data
  const coreValues = [
    {
      icon: <Target size={32} />,
      title: 'Our Mission',
      description: 'To democratize career guidance, making personalized and insightful mentorship accessible to everyone, everywhere.'
    },
    {
      icon: <Rocket size={32} />,
      title: 'Our Vision',
      description: 'To create a world where every individual can discover their true potential and build a career they are passionate about.'
    },
    {
      icon: <Heart size={32} />,
      title: 'Our Values',
      description: 'Driven by empathy, integrity, and innovation, we are committed to empowering our users on their professional journey.'
    }
  ];

  const pageContent = (
    <div className="relative min-h-screen bg-[#121212] text-gray-200 font-sans overflow-x-hidden">
      {/* Background Gradient Effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-[#FF7A59]/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-[#FFB29A]/10 rounded-full filter blur-3xl animate-pulse-slow delay-1000"></div>
      </div>
      
      <main className="relative z-10">
        {/* Back Button Bar - Made sticky to stay at top on scroll */}
        <div className="sticky top-0 bg-[#121212]/80 backdrop-blur-md z-40 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={onBack}
              className="flex items-center text-[#FF8C70] hover:text-white font-semibold transition-colors duration-300 group"
            >
              <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" size={20} />
              Back to Home
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-32 md:py-48 text-center relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
              The People Behind The{' '}
              <span className="bg-gradient-to-r from-[#FF7A59] to-[#FFB29A] bg-clip-text text-transparent">
                Vision
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
              We are a team of passionate innovators, thinkers, and creators dedicated to revolutionizing the future of career guidance.
            </p>
          </div>
        </section>

        {/* Founders Section */}
        <section id="team" className="py-24 bg-black/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold">Meet Our Founders</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#FF7A59] to-[#FFB29A] mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {teamMembers.map((member, index) => (
                <div key={index} className="group relative bg-white/5 rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:border-[#FF8C70]/50 hover:bg-white/10">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-32 h-32 mb-6">
                      <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} rounded-full transition-transform duration-300 group-hover:scale-105`}></div>
                      <div className="absolute inset-1.5 bg-[#181818] rounded-full overflow-hidden">
                        <img
                          src={member.image}
                          alt={`Photo of ${member.name}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 rounded-full border-2 border-white/10 group-hover:border-[#FF8C70]/50 transition-colors duration-300"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                    <p className={`font-semibold text-transparent bg-clip-text bg-gradient-to-r ${member.gradient} mb-4`}>{member.title}</p>
                    <p className="text-gray-400 mb-6">{member.bio}</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {member.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our DNA Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold">Our Core Principles</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#FF7A59] to-[#FFB29A] mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {coreValues.map((value, index) => (
                <div key={index} className="bg-white/5 p-8 rounded-2xl border border-transparent hover:border-white/20 transition-colors duration-300">
                  <div className="flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-[#FF7A59] to-[#FFB29A] text-white rounded-xl">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="relative p-10 bg-gradient-to-br from-[#FF7A59]/80 to-[#FFB29A]/80 rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl font-bold mb-4 text-white">Ready to Shape Your Future?</h2>
                        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                            Join us on our mission to empower careers. Discover your potential and connect with the opportunities that await you.
                        </p>
                        <button className="bg-white text-[#FF7A59] px-8 py-3 rounded-full text-lg font-bold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            <span className="flex items-center">
                                Start Your Journey <Rocket className="ml-2" size={20} />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#121212] overflow-y-auto">
      {pageContent}
    </div>
  );
}

