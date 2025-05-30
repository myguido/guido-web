'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Star, MapPin, Calendar, Clock, Filter, Search, Video, MessageCircle, Award, Users, ChevronRight, Heart, Send, X, Phone, MoreVertical, Smile, Globe, Award as AwardIcon, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Navbar from '../../components/Navbar';

const CounsellorsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

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
      category: "career",
      isOnline: true,
      bio: "Experienced career counsellor specializing in technology and engineering careers. I help professionals navigate their career paths, from fresh graduates to senior executives looking for career transitions.",
      education: "PhD in Career Development, IIT Mumbai",
      certifications: ["Certified Career Coach", "Technology Career Specialist"],
      achievements: ["Top 10 Career Counsellors 2023", "500+ Successful Career Transitions"]
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
      category: "entrepreneurship",
      isOnline: false,
      bio: "Strategic business consultant with extensive experience in startup ecosystems. I guide entrepreneurs through business planning, funding strategies, and scaling operations.",
      education: "MBA from IIM Bangalore",
      certifications: ["Startup Mentor", "Business Strategy Expert"],
      achievements: ["Helped 100+ startups get funded", "Former startup founder"]
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
      category: "career",
      isOnline: true,
      bio: "International career coach helping professionals explore global opportunities. Specializing in overseas job placements, visa guidance, and cultural adaptation.",
      education: "Masters in International Relations",
      certifications: ["Global Career Coach", "Immigration Consultant"],
      achievements: ["300+ International Placements", "Multi-country expertise"]
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
      category: "academic",
      isOnline: true,
      bio: "Academic counsellor with deep expertise in higher education planning. I help students choose the right courses, universities, and career paths based on their interests and aptitude.",
      education: "PhD in Education Psychology",
      certifications: ["Academic Planning Specialist", "University Admissions Expert"],
      achievements: ["90% University Admission Success Rate", "Education Research Publications"]
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
      category: "skill",
      isOnline: false,
      bio: "Digital skills coach focusing on upskilling professionals for the modern workforce. I specialize in identifying skill gaps and creating personalized learning paths.",
      education: "Masters in Computer Science",
      certifications: ["Digital Skills Trainer", "Learning & Development Specialist"],
      achievements: ["180+ Professionals Upskilled", "Tech Industry Partnerships"]
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
      category: "wellness",
      isOnline: true,
      bio: "Career wellness counsellor focusing on work-life balance and mental health. I help professionals manage stress, prevent burnout, and create sustainable career paths.",
      education: "Masters in Psychology",
      certifications: ["Licensed Counsellor", "Workplace Wellness Expert"],
      achievements: ["350+ Wellness Sessions", "Corporate Wellness Programs"]
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

  const openChat = (counsellor) => {
    setSelectedCounsellor(counsellor);
    setIsChatOpen(true);
    // Initialize with a welcome message from counsellor
    setMessages([
      {
        id: 1,
        text: `Hello! I'm ${counsellor.name}. I'm excited to help you with your career journey. How can I assist you today?`,
        sender: 'counsellor',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setSelectedCounsellor(null);
    setMessages([]);
    setNewMessage('');
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      
      // Simulate counsellor response after a short delay
      setTimeout(() => {
        const counsellorResponse = {
          id: messages.length + 2,
          text: "Thank you for sharing that with me. I understand your concerns and I'm here to help guide you through this. Let me provide you with some personalized advice based on your situation.",
          sender: 'counsellor',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, counsellorResponse]);
      }, 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
                  <div className="relative">
                    <img
                      src={counsellor.image}
                      alt={counsellor.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#FF6C4A]"
                    />
                    <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                      counsellor.isOnline ? 'bg-green-500' : 'bg-gray-500'
                    }`}></div>
                  </div>
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

                {/* Action Button */}
                <button 
                  onClick={() => openChat(counsellor)}
                  className="w-full flex items-center justify-center space-x-2 bg-[#FF6C4A] hover:bg-[#FF5722] text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  <MessageCircle size={16} />
                  <span>Start Conversation</span>
                </button>
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
              Start a conversation with our expert counsellors and take the first step towards your dream career
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

      {/* Full Screen Chat Interface */}
      {isChatOpen && selectedCounsellor && (
        <div className="fixed inset-0 bg-[#0F0F0F] z-50 flex">
          {/* Counsellor Info Panel - 30% */}
          <div className="w-[30%] bg-[#151515] border-r border-gray-800 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Counsellor Profile</h2>
                <button 
                  onClick={closeChat}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Profile Section */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={selectedCounsellor.image}
                    alt={selectedCounsellor.name}
                    className="w-24 h-24 rounded-full border-4 border-[#FF6C4A] mx-auto"
                  />
                  <div className={`absolute bottom-2 right-2 w-5 h-5 rounded-full border-2 border-white ${
                    selectedCounsellor.isOnline ? 'bg-green-500' : 'bg-gray-500'
                  }`}></div>
                </div>
                <h3 className="text-2xl font-bold text-white mt-4">{selectedCounsellor.name}</h3>
                <p className="text-[#FF6C4A] font-semibold text-lg">{selectedCounsellor.title}</p>
                <p className="text-gray-400">{selectedCounsellor.experience}</p>
                
                {/* Badge */}
                <div className="mt-3">
                  <span className={`${getBadgeColor(selectedCounsellor.badge)} text-white text-sm px-4 py-2 rounded-full font-medium`}>
                    {selectedCounsellor.badge}
                  </span>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Bio */}
              <div>
                <h4 className="text-white font-semibold mb-3 flex items-center">
                  <MessageCircle className="mr-2 text-[#FF6C4A]" size={18} />
                  About
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">{selectedCounsellor.bio}</p>
              </div>

              {/* Specialization */}
              <div>
                <h4 className="text-white font-semibold mb-3 flex items-center">
                  <Award className="mr-2 text-[#FF6C4A]" size={18} />
                  Specialization
                </h4>
                <p className="text-gray-300 text-sm">{selectedCounsellor.specialization}</p>
              </div>

              {/* Education */}
              <div>
                <h4 className="text-white font-semibold mb-3 flex items-center">
                  <AwardIcon className="mr-2 text-[#FF6C4A]" size={18} />
                  Education
                </h4>
                <p className="text-gray-300 text-sm">{selectedCounsellor.education}</p>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="text-white font-semibold mb-3 flex items-center">
                  <CheckCircle className="mr-2 text-[#FF6C4A]" size={18} />
                  Certifications
                </h4>
                <div className="space-y-2">
                  {selectedCounsellor.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-300">
                      <CheckCircle className="mr-2 text-green-500" size={14} />
                      {cert}
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="text-white font-semibold mb-3 flex items-center">
                  <Star className="mr-2 text-[#FF6C4A]" size={18} />
                  Achievements
                </h4>
                <div className="space-y-2">
                  {selectedCounsellor.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-300">
                      <Star className="mr-2 text-yellow-500" size={14} />
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF6C4A]">{selectedCounsellor.rating}</div>
                  <div className="text-gray-400 text-xs">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF6C4A]">{selectedCounsellor.sessions}</div>
                  <div className="text-gray-400 text-xs">Sessions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF6C4A]">{selectedCounsellor.reviews}</div>
                  <div className="text-gray-400 text-xs">Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF6C4A]">{selectedCounsellor.price}</div>
                  <div className="text-gray-400 text-xs">Per Session</div>
                </div>
              </div>

              {/* Languages */}
              <div>
                <h4 className="text-white font-semibold mb-3 flex items-center">
                  <Globe className="mr-2 text-[#FF6C4A]" size={18} />
                  Languages
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCounsellor.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="bg-[#1F1F1F] text-gray-300 px-3 py-1 rounded-full text-xs border border-gray-700"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <h4 className="text-white font-semibold mb-3 flex items-center">
                  <MapPin className="mr-2 text-[#FF6C4A]" size={18} />
                  Location
                </h4>
                <p className="text-gray-300 text-sm">{selectedCounsellor.location}</p>
              </div>
            </div>
          </div>

          {/* Chat Section - 70% */}
          <div className="w-[70%] bg-[#0F0F0F] flex flex-col">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-[#FF6C4A] to-[#FF8A50] p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={selectedCounsellor.image}
                    alt={selectedCounsellor.name}
                    className="w-12 h-12 rounded-full border-2 border-white object-cover"
                  />
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    selectedCounsellor.isOnline ? 'bg-green-500' : 'bg-gray-500'
                  }`}></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">{selectedCounsellor.name}</h3>
                  <p className="text-white/80 text-sm">
                    {selectedCounsellor.isOnline ? 'Online' : 'Offline'} • {selectedCounsellor.title}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
                  <Video className="text-white" size={20} />
                </button>
                <button className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
                  <Phone className="text-white" size={20} />
                </button>
                <button className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
                  <MoreVertical className="text-white" size={20} />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#0F0F0F]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-md px-4 py-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-[#2A2A2A] text-white border border-gray-700'
                      : 'bg-[#FF6C4A] text-white'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-2 ${
                      message.sender === 'user' ? 'text-gray-400' : 'text-white/70'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-800 bg-[#151515]">
              <div className="flex items-end space-x-3">
                <button className="p-3 text-gray-400 hover:text-[#FF6C4A] transition-colors">
                  <Smile size={20} />
                </button>
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    rows="1"
                    className="w-full bg-[#1F1F1F] border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF6C4A] resize-none text-white placeholder-gray-500 min-h-[48px] max-h-32"
                    style={{ 
                      resize: 'none',
                      overflow: 'hidden',
                    }}
                    onInput={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
                    }}
                  />
                </div>
                <button 
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="p-3 bg-[#FF6C4A] hover:bg-[#FF5722] disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-xl transition-colors flex-shrink-0"
                >
                  <Send size={18} />
                </button>
              </div>
              
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 mt-3">
                <button 
                  onClick={() => setNewMessage("I'd like to know more about career opportunities in my field")}
                  className="bg-[#1F1F1F] hover:bg-[#2A2A2A] text-gray-300 text-xs px-3 py-2 rounded-full border border-gray-700 transition-colors"
                >
                  Career Opportunities
                </button>
                <button 
                  onClick={() => setNewMessage("Can you help me with resume building?")}
                  className="bg-[#1F1F1F] hover:bg-[#2A2A2A] text-gray-300 text-xs px-3 py-2 rounded-full border border-gray-700 transition-colors"
                >
                  Resume Help
                </button>
                <button 
                  onClick={() => setNewMessage("What skills should I develop for my career growth?")}
                  className="bg-[#1F1F1F] hover:bg-[#2A2A2A] text-gray-300 text-xs px-3 py-2 rounded-full border border-gray-700 transition-colors"
                >
                  Skill Development
                </button>
                <button 
                  onClick={() => setNewMessage("I need guidance on salary negotiation")}
                  className="bg-[#1F1F1F] hover:bg-[#2A2A2A] text-gray-300 text-xs px-3 py-2 rounded-full border border-gray-700 transition-colors"
                >
                  Salary Negotiation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CounsellorsPage;