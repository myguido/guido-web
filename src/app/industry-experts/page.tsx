'use client';

import React, { useState } from 'react';
import { Star, MapPin, Calendar, Clock, Filter, Search, Video, MessageCircle, Award, Users, ChevronRight, TrendingUp, Building2, Briefcase, Play, ExternalLink, ArrowUpRight, Trophy, Target } from 'lucide-react';
import Image from 'next/image';
import Navbar from '../../components/Navbar';

const IndustryExpertsPage = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('experts');

  const industries = [
    { id: 'all', label: 'All Industries', count: 35, icon: Building2 },
    { id: 'tech', label: 'Technology', count: 12, icon: TrendingUp },
    { id: 'finance', label: 'Finance & Banking', count: 8, icon: Trophy },
    { id: 'healthcare', label: 'Healthcare', count: 6, icon: Target },
    { id: 'marketing', label: 'Marketing & Sales', count: 5, icon: Briefcase },
    { id: 'consulting', label: 'Consulting', count: 4, icon: Award }
  ];

  const experts = [
    {
      id: 1,
      name: "Sundar Pichai",
      title: "CEO, Google",
      company: "Google",
      industry: "tech",
      experience: "20+ years",
      rating: 5.0,
      reviews: 89,
      specialization: "Tech Leadership & Product Strategy",
      location: "Mountain View, CA",
      languages: ["English", "Hindi"],
      price: "₹15,000/session",
      availability: "Limited Slots Available",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      badge: "Industry Leader",
      achievements: ["CEO of Fortune 500", "Tech Visionary", "Leadership Expert"],
      sessions: 45,
      topics: ["Leadership", "Product Strategy", "Tech Innovation", "Team Building"],
      bio: "Leading one of the world's most innovative companies, bringing deep insights into tech leadership and strategic thinking.",
      nextAvailable: "Next Week"
    },
    {
      id: 2,
      name: "Priya Nair",
      title: "VP Engineering, Microsoft",
      company: "Microsoft",
      industry: "tech",
      experience: "15+ years",
      rating: 4.9,
      reviews: 156,
      specialization: "Software Engineering & Team Leadership",
      location: "Bangalore, India",
      languages: ["English", "Hindi", "Malayalam"],
      price: "₹8,000/session",
      availability: "Available This Week",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332336c?w=150&h=150&fit=crop&crop=face",
      badge: "Tech Leader",
      achievements: ["Engineering Excellence", "Diversity Advocate", "Mentor of 100+"],
      sessions: 234,
      topics: ["Software Architecture", "Engineering Management", "Career Growth", "Technical Skills"],
      bio: "Passionate about building great engineering teams and helping developers grow their careers in tech.",
      nextAvailable: "Tomorrow"
    },
    {
      id: 3,
      name: "Raghuram Rajan",
      title: "Former RBI Governor",
      company: "University of Chicago",
      industry: "finance",
      experience: "25+ years",
      rating: 5.0,
      reviews: 67,
      specialization: "Economics & Financial Policy",
      location: "Chicago, USA",
      languages: ["English", "Hindi"],
      price: "₹25,000/session",
      availability: "Very Limited",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      badge: "Global Expert",
      achievements: ["Former RBI Governor", "Economics Professor", "Policy Expert"],
      sessions: 28,
      topics: ["Economic Policy", "Financial Markets", "Banking", "Global Finance"],
      bio: "Former Governor of Reserve Bank of India with deep expertise in global economics and financial policy.",
      nextAvailable: "Next Month"
    },
    {
      id: 4,
      name: "Dr. Naresh Trehan",
      title: "Chairman, Medanta",
      company: "Medanta Hospital",
      industry: "healthcare",
      experience: "30+ years",
      rating: 4.8,
      reviews: 45,
      specialization: "Healthcare Leadership & Medical Innovation",
      location: "Delhi, India",
      languages: ["English", "Hindi"],
      price: "₹12,000/session",
      availability: "Available Next Week",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      badge: "Medical Expert",
      achievements: ["Renowned Surgeon", "Healthcare Innovator", "Medical Leadership"],
      sessions: 78,
      topics: ["Healthcare Management", "Medical Innovation", "Leadership", "Healthcare Policy"],
      bio: "Leading healthcare professional with expertise in building world-class medical institutions.",
      nextAvailable: "This Week"
    },
    {
      id: 5,
      name: "Peyush Bansal",
      title: "CEO & Founder, Lenskart",
      company: "Lenskart",
      industry: "marketing",
      experience: "12+ years",
      rating: 4.9,
      reviews: 198,
      specialization: "E-commerce & Brand Building",
      location: "Singapore",
      languages: ["English", "Hindi"],
      price: "₹10,000/session",
      availability: "Available This Month",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      badge: "Entrepreneur",
      achievements: ["Unicorn Founder", "Shark Tank Judge", "E-commerce Pioneer"],
      sessions: 167,
      topics: ["Entrepreneurship", "E-commerce", "Brand Building", "Marketing Strategy"],
      bio: "Serial entrepreneur who built Lenskart into a unicorn, sharing insights on building successful businesses.",
      nextAvailable: "Next Week"
    },
    {
      id: 6,
      name: "Kiran Mazumdar-Shaw",
      title: "Executive Chairperson, Biocon",
      company: "Biocon",
      industry: "healthcare",
      experience: "40+ years",
      rating: 5.0,
      reviews: 34,
      specialization: "Biotechnology & Women Leadership",
      location: "Bangalore, India",
      languages: ["English", "Hindi", "Kannada"],
      price: "₹18,000/session",
      availability: "Very Limited",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      badge: "Pioneer",
      achievements: ["Biotech Pioneer", "Women Leadership", "Innovation Leader"],
      sessions: 56,
      topics: ["Biotechnology", "Women in Leadership", "Innovation", "Entrepreneurship"],
      bio: "Pioneering biotechnology entrepreneur and advocate for women's leadership in science and business.",
      nextAvailable: "Next Month"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Leadership Masterclass",
      expert: "Priya Nair",
      date: "Dec 15, 2024",
      time: "6:00 PM IST",
      type: "Webinar",
      attendees: 1250,
      price: "₹499",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332336c?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Building Unicorn Startups",
      expert: "Peyush Bansal",
      date: "Dec 18, 2024",
      time: "7:30 PM IST",
      type: "Workshop",
      attendees: 850,
      price: "₹999",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Future of Healthcare",
      expert: "Dr. Naresh Trehan",
      date: "Dec 20, 2024",
      time: "5:00 PM IST",
      type: "Panel Discussion",
      attendees: 2100,
      price: "Free",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=200&fit=crop"
    }
  ];

  const filteredExperts = experts.filter(expert => {
    const matchesIndustry = selectedIndustry === 'all' || expert.industry === selectedIndustry;
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesIndustry && matchesSearch;
  });

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Industry Leader': return 'bg-gradient-to-r from-purple-600 to-purple-800';
      case 'Tech Leader': return 'bg-gradient-to-r from-blue-600 to-blue-800';
      case 'Global Expert': return 'bg-gradient-to-r from-green-600 to-green-800';
      case 'Medical Expert': return 'bg-gradient-to-r from-red-600 to-red-800';
      case 'Entrepreneur': return 'bg-gradient-to-r from-orange-600 to-orange-800';
      case 'Pioneer': return 'bg-gradient-to-r from-pink-600 to-pink-800';
      default: return 'bg-gradient-to-r from-[#FF6C4A] to-[#FF8A50]';
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content with padding-top to account for fixed navbar */}
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#151515] via-[#1F1F1F] to-[#151515] border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#FF6C4A]/20 to-[#FF8A50]/20 px-4 py-2 rounded-full border border-[#FF6C4A]/30 mb-6">
                <Trophy className="text-[#FF6C4A]" size={16} />
                <span className="text-sm font-medium">Learn from the Best</span>
              </div>
              <h1 className="text-5xl font-bold mb-6">
                Industry <span className="text-[#FF6C4A]">Experts</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
                Get exclusive access to leaders, founders, and visionaries who are shaping the future. 
                Learn directly from those who've built billion-dollar companies and transformed industries.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-8">
              <div className="bg-[#1F1F1F] border border-gray-700 rounded-lg p-1 flex">
                <button
                  onClick={() => setActiveTab('experts')}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'experts'
                      ? 'bg-[#FF6C4A] text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Expert Sessions
                </button>
                <button
                  onClick={() => setActiveTab('events')}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'events'
                      ? 'bg-[#FF6C4A] text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Upcoming Events
                </button>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center max-w-2xl mx-auto">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search experts, companies, or specializations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#1F1F1F] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-[#FF6C4A] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {activeTab === 'experts' && (
          <>
            {/* Industry Filter */}
            <div className="bg-[#151515] border-b border-gray-800">
              <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-wrap gap-3 justify-center">
                  {industries.map((industry) => {
                    const IconComponent = industry.icon;
                    return (
                      <button
                        key={industry.id}
                        onClick={() => setSelectedIndustry(industry.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedIndustry === industry.id
                            ? 'bg-[#FF6C4A] text-white'
                            : 'bg-[#1F1F1F] text-gray-300 hover:bg-[#2A2A2A] border border-gray-700'
                        }`}
                      >
                        <IconComponent size={16} />
                        <span>{industry.label}</span>
                        <span className="bg-black/20 px-2 py-0.5 rounded-full text-xs">
                          {industry.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-r from-[#FF6C4A]/10 to-[#FF8A50]/10 border-b border-gray-800">
              <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-[#FF6C4A]">35+</div>
                    <div className="text-gray-300 text-sm">Industry Leaders</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#FF6C4A]">500+</div>
                    <div className="text-gray-300 text-sm">Expert Sessions</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#FF6C4A]">50K+</div>
                    <div className="text-gray-300 text-sm">Students Mentored</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#FF6C4A]">₹1T+</div>
                    <div className="text-gray-300 text-sm">Combined Valuation</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Experts Grid */}
            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredExperts.map((expert) => (
                  <div
                    key={expert.id}
                    className="bg-[#151515] border border-gray-800 rounded-2xl overflow-hidden hover:border-[#FF6C4A]/50 transition-all transform hover:scale-105 hover:shadow-2xl"
                  >
                    {/* Card Header */}
                    <div className="relative">
                      <div className="bg-gradient-to-r from-[#FF6C4A]/20 to-[#FF8A50]/20 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className={`${getBadgeColor(expert.badge)} text-white text-xs px-3 py-1 rounded-full font-medium`}>
                            {expert.badge}
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-[#FF6C4A]">{expert.price}</div>
                            <div className="text-xs text-gray-400">per session</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <img
                            src={expert.image}
                            alt={expert.name}
                            className="w-20 h-20 rounded-full object-cover border-3 border-white/20"
                          />
                          <div>
                            <h3 className="text-xl font-bold">{expert.name}</h3>
                            <p className="text-[#FF6C4A] font-medium">{expert.title}</p>
                            <p className="text-gray-300 text-sm">{expert.company}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      {/* Bio */}
                      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                        {expert.bio}
                      </p>

                      {/* Achievements */}
                      <div className="mb-4">
                        <p className="text-white font-medium mb-2 text-sm">Key Achievements</p>
                        <div className="flex flex-wrap gap-1">
                          {expert.achievements.map((achievement, index) => (
                            <span
                              key={index}
                              className="bg-[#1F1F1F] text-gray-300 px-2 py-1 rounded text-xs border border-gray-700"
                            >
                              {achievement}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Topics */}
                      <div className="mb-4">
                        <p className="text-white font-medium mb-2 text-sm">Discussion Topics</p>
                        <div className="flex flex-wrap gap-1">
                          {expert.topics.slice(0, 3).map((topic, index) => (
                            <span
                              key={index}
                              className="bg-[#FF6C4A]/10 text-[#FF6C4A] px-2 py-1 rounded text-xs border border-[#FF6C4A]/20"
                            >
                              {topic}
                            </span>
                          ))}
                          {expert.topics.length > 3 && (
                            <span className="text-gray-400 text-xs px-2 py-1">
                              +{expert.topics.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between mb-6 text-sm">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Star className="text-yellow-400 fill-current" size={14} />
                            <span className="font-semibold">{expert.rating}</span>
                            <span className="text-gray-400">({expert.reviews})</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-400">
                            <Users size={14} />
                            <span>{expert.sessions}</span>
                          </div>
                        </div>
                        <div className="text-gray-400">
                          {expert.nextAvailable}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <button className="w-full bg-[#FF6C4A] hover:bg-[#FF5722] text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                          <Video size={16} />
                          <span>Book 1-on-1 Session</span>
                        </button>
                        <div className="grid grid-cols-2 gap-3">
                          <button className="bg-[#1F1F1F] hover:bg-[#2A2A2A] text-white py-2 px-4 rounded-lg font-medium transition-colors border border-gray-700 flex items-center justify-center space-x-2">
                            <MessageCircle size={14} />
                            <span>Message</span>
                          </button>
                          <button className="bg-[#1F1F1F] hover:bg-[#2A2A2A] text-white py-2 px-4 rounded-lg font-medium transition-colors border border-gray-700 flex items-center justify-center space-x-2">
                            <ExternalLink size={14} />
                            <span>Profile</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'events' && (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Upcoming Expert Events</h2>
              <p className="text-gray-400 text-lg">Join live sessions, workshops, and masterclasses with industry leaders</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-[#151515] border border-gray-800 rounded-2xl overflow-hidden hover:border-[#FF6C4A]/50 transition-all transform hover:scale-105"
                >
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#FF6C4A] text-white px-3 py-1 rounded-full text-sm font-medium">
                        {event.type}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <button className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
                        <Play size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-[#FF6C4A] font-medium mb-4">with {event.expert}</p>

                    <div className="space-y-2 mb-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Calendar size={14} />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock size={14} />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users size={14} />
                        <span>{event.attendees.toLocaleString()} registered</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-[#FF6C4A]">
                        {event.price}
                      </div>
                      <button className="bg-[#FF6C4A] hover:bg-[#FF5722] text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                        <span>Register</span>
                        <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Events */}
            <div className="text-center mt-12">
              <button className="bg-[#1F1F1F] hover:bg-[#2A2A2A] border border-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 mx-auto">
                <span>View All Events</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#FF6C4A] to-[#FF8A50] py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Learn from the Best?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Get direct access to industry leaders and transform your career with expert guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#FF6C4A] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Browse All Experts
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                View Upcoming Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryExpertsPage;