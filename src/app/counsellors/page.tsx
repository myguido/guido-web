'use client';

import React, { useState } from 'react';
import { Star, MapPin, Calendar, Clock, Filter, Search, Video, MessageCircle, Award, Users, ChevronRight, Heart } from 'lucide-react';
import Image from 'next/image';
import Navbar from '../../components/Navbar';

const CounsellorsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', label: 'All Counsellors', count: 24 },
    { id: 'career', label: 'Career Guidance', count: 8 },
    { id: 'academic', label: 'Academic Planning', count: 6 },
    { id: 'skill', label: 'Skill Development', count: 5 },
    { id: 'entrepreneurship', label: 'Entrepreneurship', count: 3 },
    { id: 'wellness', label: 'Career Wellness', count: 2 }
  ];

  const counsellors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      title: "Senior Career Counsellor",
      specialization: "Tech & Engineering Careers",
      experience: "12+ years",
      rating: 4.9,
      reviews: 156,
      location: "Mumbai, India",
      languages: ["English", "Hindi", "Marathi"],
      price: "₹1,500/session",
      availability: "Available Today",
      image: "https://images.unsplash.com/photo-1594824708403-67b8bbf25bae?w=150&h=150&fit=crop&crop=face",
      badge: "Top Rated",
      sessions: 500,
      category: "career"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      title: "Business Strategy Consultant",
      specialization: "Entrepreneurship & Startups",
      experience: "15+ years",
      rating: 4.8,
      reviews: 203,
      location: "Bangalore, India",
      languages: ["English", "Hindi", "Kannada"],
      price: "₹2,000/session",
      availability: "Next Available: Tomorrow",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      badge: "Expert",
      sessions: 750,
      category: "entrepreneurship"
    },
    {
      id: 3,
      name: "Sarah Johnson",
      title: "International Career Coach",
      specialization: "Global Opportunities",
      experience: "10+ years",
      rating: 4.9,
      reviews: 89,
      location: "Delhi, India",
      languages: ["English", "Hindi"],
      price: "₹1,800/session",
      availability: "Available Now",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      badge: "International",
      sessions: 300,
      category: "career"
    },
    {
      id: 4,
      name: "Dr. Amit Patel",
      title: "Academic Counsellor",
      specialization: "Higher Education Planning",
      experience: "8+ years",
      rating: 4.7,
      reviews: 124,
      location: "Pune, India",
      languages: ["English", "Hindi", "Gujarati"],
      price: "₹1,200/session",
      availability: "Available Today",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      badge: "Academic Expert",
      sessions: 420,
      category: "academic"
    },
    {
      id: 5,
      name: "Meera Reddy",
      title: "Skill Development Coach",
      specialization: "Digital Skills & Upskilling",
      experience: "6+ years",
      rating: 4.8,
      reviews: 67,
      location: "Hyderabad, India",
      languages: ["English", "Hindi", "Telugu"],
      price: "₹1,300/session",
      availability: "Next Available: Today 6 PM",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332336c?w=150&h=150&fit=crop&crop=face",
      badge: "Rising Star",
      sessions: 180,
      category: "skill"
    },
    {
      id: 6,
      name: "Vikram Singh",
      title: "Career Wellness Counsellor",
      specialization: "Work-Life Balance & Mental Health",
      experience: "9+ years",
      rating: 4.9,
      reviews: 98,
      location: "Chennai, India",
      languages: ["English", "Hindi", "Tamil"],
      price: "₹1,400/session",
      availability: "Available Tomorrow",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      badge: "Wellness Expert",
      sessions: 350,
      category: "wellness"
    }
  ];

  const filteredCounsellors = counsellors.filter(counsellor => {
    const matchesCategory = selectedCategory === 'all' || counsellor.category === selectedCategory;
    const matchesSearch = counsellor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         counsellor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Top Rated': return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 'Expert': return 'bg-gradient-to-r from-purple-500 to-purple-700';
      case 'International': return 'bg-gradient-to-r from-blue-500 to-blue-700';
      case 'Academic Expert': return 'bg-gradient-to-r from-green-500 to-green-700';
      case 'Rising Star': return 'bg-gradient-to-r from-pink-500 to-pink-700';
      case 'Wellness Expert': return 'bg-gradient-to-r from-teal-500 to-teal-700';
      default: return 'bg-gradient-to-r from-[#FF6C4A] to-[#FF8A50]';
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content with proper spacing for fixed navbar */}
      <div className="pt-20">
        {/* Header */}
        <div className="bg-[#151515] border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">
                Meet Your <span className="text-[#FF6C4A]">Career Counsellors</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Connect with experienced professionals who understand your journey and can guide you towards your dream career
              </p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search counsellors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#1F1F1F] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-[#FF6C4A] focus:outline-none"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-[#1F1F1F] border border-gray-700 px-4 py-3 rounded-lg hover:border-[#FF6C4A] transition-colors"
              >
                <Filter size={20} />
                <span>Filters</span>
              </button>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mt-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-[#FF6C4A] text-white'
                      : 'bg-[#1F1F1F] text-gray-300 hover:bg-[#2A2A2A] border border-gray-700'
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-[#FF6C4A]/10 to-[#FF8A50]/10 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-[#FF6C4A]">50+</div>
                <div className="text-gray-300 text-sm">Expert Counsellors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#FF6C4A]">10K+</div>
                <div className="text-gray-300 text-sm">Sessions Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#FF6C4A]">4.8</div>
                <div className="text-gray-300 text-sm">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#FF6C4A]">95%</div>
                <div className="text-gray-300 text-sm">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Counsellors Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCounsellors.map((counsellor) => (
              <div
                key={counsellor.id}
                className="bg-[#151515] border border-gray-800 rounded-2xl p-6 hover:border-[#FF6C4A]/50 transition-all transform hover:scale-105 hover:shadow-2xl"
              >
                {/* Badge */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`${getBadgeColor(counsellor.badge)} text-white text-xs px-3 py-1 rounded-full font-medium`}>
                    {counsellor.badge}
                  </div>
                  <button className="text-gray-400 hover:text-[#FF6C4A] transition-colors">
                    <Heart size={20} />
                  </button>
                </div>

                {/* Profile */}
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={counsellor.image}
                    alt={counsellor.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#FF6C4A]"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{counsellor.name}</h3>
                    <p className="text-[#FF6C4A] font-medium">{counsellor.title}</p>
                    <p className="text-gray-400 text-sm">{counsellor.experience}</p>
                  </div>
                </div>

                {/* Specialization */}
                <div className="mb-4">
                  <p className="text-gray-300 font-medium mb-2">Specialization</p>
                  <p className="text-white">{counsellor.specialization}</p>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="font-semibold">{counsellor.rating}</span>
                    <span className="text-gray-400 text-sm">({counsellor.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400 text-sm">
                    <Users size={16} />
                    <span>{counsellor.sessions} sessions</span>
                  </div>
                </div>

                {/* Location and Languages */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <MapPin size={16} />
                    <span>{counsellor.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {counsellor.languages.map((lang, index) => (
                      <span
                        key={index}
                        className="bg-[#1F1F1F] text-gray-300 px-2 py-1 rounded text-xs"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Availability and Price */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-2xl font-bold text-[#FF6C4A]">{counsellor.price}</div>
                    <div className="text-xs text-gray-400">{counsellor.availability}</div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    counsellor.availability.includes('Available Now') || counsellor.availability.includes('Available Today')
                      ? 'bg-green-500'
                      : 'bg-yellow-500'
                  }`}></div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center space-x-2 bg-[#FF6C4A] hover:bg-[#FF5722] text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    <Video size={16} />
                    <span>Book Session</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 bg-[#1F1F1F] hover:bg-[#2A2A2A] text-white py-2 px-4 rounded-lg font-medium transition-colors border border-gray-700">
                    <MessageCircle size={16} />
                    <span>Message</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-[#1F1F1F] hover:bg-[#2A2A2A] border border-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 mx-auto">
              <span>Load More Counsellors</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#FF6C4A] to-[#FF8A50] py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Career?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Book a session with our expert counsellors and take the first step towards your dream career
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#FF6C4A] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Book Free Consultation
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounsellorsPage;