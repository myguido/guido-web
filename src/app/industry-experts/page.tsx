'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Star, 
  MapPin, 
  Calendar, 
  Clock, 
  Filter, 
  Search, 
  Video, 
  MessageCircle, 
  Award, 
  Users, 
  ChevronRight, 
  Heart, 
  Send, 
  X, 
  Phone, 
  MoreVertical, 
  Smile, 
  Globe, 
  CheckCircle2,
  GraduationCap,
  TrendingUp,
  Zap,
  Shield,
  Sparkles,
  Target,
  BookOpen,
  Brain,
  PlusCircle,
  ArrowRight,
  Briefcase,
  User,
  Trophy,
  Building2,
  ExternalLink,
  ArrowUpRight,
  Play
} from 'lucide-react';
import Image from 'next/image';
import Navbar from '../../components/Navbar';

const IndustryExpertsPage = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('experts');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const messagesEndRef = useRef(null);

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
      price: "₹15,000",
      priceLabel: "per session",
      availability: "Limited Slots Available",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      achievements: ["CEO of Fortune 500", "Tech Visionary", "Leadership Expert"],
      sessions: 45,
      topics: ["Leadership", "Product Strategy", "Tech Innovation", "Team Building"],
      bio: "Leading one of the world's most innovative companies, bringing deep insights into tech leadership and strategic thinking.",
      nextAvailable: "Next Week",
      isOnline: true,
      responseTime: "< 30 min",
      successRate: 98,
      education: "MS Computer Science, Stanford University",
      certifications: ["Global Tech Leader", "Innovation Strategist", "Executive Leadership"],
      category: "tech"
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
      price: "₹8,000",
      priceLabel: "per session",
      availability: "Available This Week",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332336c?w=150&h=150&fit=crop&crop=face",
     
      achievements: ["Engineering Excellence", "Diversity Advocate", "Mentor of 100+"],
      sessions: 234,
      topics: ["Software Architecture", "Engineering Management", "Career Growth", "Technical Skills"],
      bio: "Passionate about building great engineering teams and helping developers grow their careers in tech.",
      nextAvailable: "Tomorrow",
      isOnline: true,
      responseTime: "< 15 min",
      successRate: 94,
      education: "B.Tech Computer Science, IIT Madras",
      certifications: ["Microsoft Certified", "Engineering Leadership", "Tech Diversity Champion"],
      category: "tech"
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
      price: "₹25,000",
      priceLabel: "per session",
      availability: "Very Limited",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      badge: "Global Expert",
      achievements: ["Former RBI Governor", "Economics Professor", "Policy Expert"],
      sessions: 28,
      topics: ["Economic Policy", "Financial Markets", "Banking", "Global Finance"],
      bio: "Former Governor of Reserve Bank of India with deep expertise in global economics and financial policy.",
      nextAvailable: "Next Month",
      isOnline: false,
      responseTime: "< 2 hours",
      successRate: 97,
      education: "PhD Economics, MIT",
      certifications: ["Economic Policy Expert", "Financial Markets Specialist", "Global Finance Authority"],
      category: "finance"
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
      price: "₹12,000",
      priceLabel: "per session",
      availability: "Available Next Week",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      badge: "Medical Expert",
      achievements: ["Renowned Surgeon", "Healthcare Innovator", "Medical Leadership"],
      sessions: 78,
      topics: ["Healthcare Management", "Medical Innovation", "Leadership", "Healthcare Policy"],
      bio: "Leading healthcare professional with expertise in building world-class medical institutions.",
      nextAvailable: "This Week",
      isOnline: true,
      responseTime: "< 1 hour",
      successRate: 93,
      education: "MBBS, MS Cardiology, AIIMS",
      certifications: ["Medical Leadership", "Healthcare Innovation", "Hospital Management"],
      category: "healthcare"
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
      price: "₹10,000",
      priceLabel: "per session",
      availability: "Available This Month",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      badge: "Entrepreneur",
      achievements: ["Unicorn Founder", "Shark Tank Judge", "E-commerce Pioneer"],
      sessions: 167,
      topics: ["Entrepreneurship", "E-commerce", "Brand Building", "Marketing Strategy"],
      bio: "Serial entrepreneur who built Lenskart into a unicorn, sharing insights on building successful businesses.",
      nextAvailable: "Next Week",
      isOnline: true,
      responseTime: "< 20 min",
      successRate: 95,
      education: "MBA, IIM Bangalore",
      certifications: ["Entrepreneurship Expert", "E-commerce Specialist", "Brand Strategy"],
      category: "marketing"
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
      price: "₹18,000",
      priceLabel: "per session",
      availability: "Very Limited",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      badge: "Pioneer",
      achievements: ["Biotech Pioneer", "Women Leadership", "Innovation Leader"],
      sessions: 56,
      topics: ["Biotechnology", "Women in Leadership", "Innovation", "Entrepreneurship"],
      bio: "Pioneering biotechnology entrepreneur and advocate for women's leadership in science and business.",
      nextAvailable: "Next Month",
      isOnline: false,
      responseTime: "< 4 hours",
      successRate: 96,
      education: "Bachelor's in Zoology, Bangalore University",
      certifications: ["Biotech Pioneer", "Women Leadership Advocate", "Innovation Expert"],
      category: "healthcare"
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

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const openChat = (expert) => {
    setSelectedExpert(expert);
    setIsChatOpen(true);
    setMessages([
      {
        id: 1,
        text: `Hi! I'm ${expert.name}. I'm excited to share my industry experience with you. What specific challenge or goal would you like to discuss today?`,
        sender: 'expert',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setSelectedExpert(null);
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
      
      setTimeout(() => {
        const responses = [
          "That's an excellent question. Based on my experience in the industry, here's what I've learned...",
          "I've faced similar challenges throughout my career. Let me share some strategic insights that could help you.",
          "From my perspective as an industry leader, I'd recommend focusing on these key areas...",
          "That's a common concern I hear from professionals. Here's how I approach this challenge..."
        ];
        
        const expertResponse = {
          id: messages.length + 2,
          text: responses[Math.floor(Math.random() * responses.length)],
          sender: 'expert',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, expertResponse]);
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
      <Navbar />
      
      <div className="pt-20">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-[#151515] via-[#1A1A1A] to-[#0F0F0F] border-b border-gray-800/50">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF6C4A]/5 to-[#FF8A50]/5"></div>
          <div className="relative max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-[#FF6C4A]/10 border border-[#FF6C4A]/20 rounded-full px-6 py-2 mb-6">
                <Sparkles className="text-[#FF6C4A]" size={16} />
                <span className="text-[#FF6C4A] font-medium text-sm">Learn from the Best</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Industry
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6C4A] to-[#FF8A50]">
                  Experts
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                Get exclusive access to leaders, founders, and visionaries who are shaping the future. 
                Learn directly from those who've built billion-dollar companies and transformed industries.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-8">
              <div className="bg-[#1A1A1A]/80 backdrop-blur-sm border border-gray-700/50 rounded-lg p-1 flex">
                <button
                  onClick={() => setActiveTab('experts')}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'experts'
                      ? 'bg-gradient-to-r from-[#FF6C4A] to-[#FF8A50] text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Expert Sessions
                </button>
                <button
                  onClick={() => setActiveTab('events')}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'events'
                      ? 'bg-gradient-to-r from-[#FF6C4A] to-[#FF8A50] text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Upcoming Events
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search experts, companies, or specializations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#1A1A1A]/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl pl-14 pr-6 py-4 text-white placeholder-gray-400 focus:border-[#FF6C4A] focus:outline-none focus:ring-2 focus:ring-[#FF6C4A]/20 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {activeTab === 'experts' && (
          <>
            {/* Industry Filter */}
            <div className="bg-[#151515]/50 backdrop-blur-sm border-b border-gray-800/50">
              <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-wrap gap-3 justify-center">
                  {industries.map((industry) => {
                    const IconComponent = industry.icon;
                    return (
                      <button
                        key={industry.id}
                        onClick={() => setSelectedIndustry(industry.id)}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                          selectedIndustry === industry.id
                            ? 'bg-gradient-to-r from-[#FF6C4A] to-[#FF8A50] text-white shadow-lg shadow-[#FF6C4A]/25'
                            : 'bg-[#1A1A1A]/60 backdrop-blur-sm text-gray-300 hover:bg-[#1A1A1A] border border-gray-700/50 hover:border-gray-600'
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
            <div className="bg-gradient-to-r from-[#FF6C4A]/5 to-[#FF8A50]/5 border-b border-gray-800/50">
              <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { number: '35+', label: 'Industry Leaders', icon: Users },
                    { number: '500+', label: 'Expert Sessions', icon: TrendingUp },
                    { number: '50K+', label: 'Students Mentored', icon: Star },
                    { number: '₹1T+', label: 'Combined Valuation', icon: Target }
                  ].map((stat, index) => (
                    <div key={index} className="text-center group">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#FF6C4A] to-[#FF8A50] rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                        <stat.icon className="text-white" size={24} />
                      </div>
                      <div className="text-3xl font-bold text-[#FF6C4A] mb-2">{stat.number}</div>
                      <div className="text-gray-300 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Experts Grid */}
            <div className="max-w-7xl mx-auto px-4 py-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredExperts.map((expert) => (
                  <div
                    key={expert.id}
                    className="group bg-gradient-to-br from-[#151515] to-[#1A1A1A] border border-gray-800/50 rounded-3xl p-6 hover:border-[#FF6C4A]/30 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#FF6C4A]/10"
                  >
                    {/* Header with badge and favorite */}
                    <div className="flex justify-between items-start mb-4">
                      <div className={`${getBadgeColor(expert.badge)} text-white text-xs px-3 py-1 rounded-full font-medium`}>
                        {expert.badge}
                      </div>
                      <button 
                        onClick={() => toggleFavorite(expert.id)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Heart size={18} className={favorites.has(expert.id) ? 'fill-red-400 text-red-400' : ''} />
                      </button>
                    </div>

                    {/* Profile */}
                    <div className="text-center mb-5">
                      <div className="relative inline-block mb-4">
                        <img
                          src={expert.image}
                          alt={expert.name}
                          className="w-18 h-18 rounded-2xl object-cover border-2 border-[#FF6C4A]/50 group-hover:border-[#FF6C4A] transition-all"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[#151515] flex items-center justify-center ${
                          expert.isOnline ? 'bg-emerald-500' : 'bg-gray-500'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${expert.isOnline ? 'bg-white' : 'bg-gray-300'}`}></div>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-1">{expert.name}</h3>
                      <p className="text-[#FF6C4A] font-semibold text-sm mb-1">{expert.title}</p>
                      <p className="text-gray-400 text-xs font-medium">{expert.experience}</p>
                    </div>

                    {/* Specialization */}
                    <div className="bg-[#1A1A1A]/50 rounded-xl p-3 mb-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <Briefcase className="text-[#FF6C4A]" size={14} />
                        <span className="text-gray-300 font-medium text-xs">Specialization</span>
                      </div>
                      <p className="text-white text-sm font-medium">{expert.specialization}</p>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <Star className="text-yellow-400 fill-current" size={12} />
                          <span className="font-bold text-white text-xs">{expert.rating}</span>
                        </div>
                        <p className="text-gray-400 text-xs">{expert.reviews} reviews</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <Users className="text-[#FF6C4A]" size={12} />
                          <span className="font-bold text-white text-xs">{expert.sessions}</span>
                        </div>
                        <p className="text-gray-400 text-xs">sessions</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <Target className="text-emerald-500" size={12} />
                          <span className="font-bold text-white text-xs">{expert.successRate}%</span>
                        </div>
                        <p className="text-gray-400 text-xs">success</p>
                      </div>
                    </div>

                    {/* Quick Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2 text-gray-400">
                          <MapPin size={12} />
                          <span>{expert.location}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-emerald-400">
                          <Clock size={12} />
                          <span className="font-medium">{expert.responseTime}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {expert.languages.slice(0, 2).map((lang, index) => (
                          <span
                            key={index}
                            className="bg-[#1A1A1A] text-gray-300 px-2 py-0.5 rounded text-xs border border-gray-700/50"
                          >
                            {lang}
                          </span>
                        ))}
                        {expert.languages.length > 2 && (
                          <span className="bg-[#1A1A1A] text-gray-300 px-2 py-0.5 rounded text-xs border border-gray-700/50">
                            +{expert.languages.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Pricing and CTA */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-baseline space-x-1">
                            <span className="text-xl font-bold text-[#FF6C4A]">{expert.price}</span>
                            <span className="text-gray-400 text-xs">/{expert.priceLabel}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs">
                            <div className={`w-2 h-2 rounded-full ${
                              expert.availability.includes('Available Now') ? 'bg-emerald-500' : 'bg-yellow-500'
                            }`}></div>
                            <span className="text-gray-300 font-medium">{expert.availability}</span>
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => openChat(expert)}
                        className="w-full bg-gradient-to-r from-[#FF6C4A] to-[#FF8A50] hover:from-[#FF5722] hover:to-[#FF7043] text-white font-semibold py-3 px-5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#FF6C4A]/25 flex items-center justify-center space-x-2 text-sm"
                      >
                        <MessageCircle size={16} />
                        <span>Start Conversation</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-16">
                <button className="bg-gradient-to-r from-[#1A1A1A] to-[#151515] hover:from-[#2A2A2A] hover:to-[#1A1A1A] border border-gray-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 mx-auto group">
                  <PlusCircle size={20} className="group-hover:rotate-90 transition-transform" />
                  <span>Load More Experts</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
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
        <div className="relative bg-gradient-to-r from-[#FF6C4A] to-[#FF8A50] py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
          </div>
          
          <div className="relative max-w-5xl mx-auto text-center px-4">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
              <Sparkles className="text-white" size={16} />
              <span className="text-white font-medium">Start Your Journey Today</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Learn from the Best?
            </h2>
            <p className="text-white/90 text-xl mb-10 leading-relaxed max-w-3xl mx-auto">
              Get direct access to industry leaders and transform your career with expert guidance. Your breakthrough moment is just one conversation away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-[#FF6C4A] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-2">
                <Video size={20} />
                <span>Book Expert Session</span>
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                <Calendar size={20} />
                <span>View All Events</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp-style Chat Interface */}
      {isChatOpen && selectedExpert && (
        <div className="fixed inset-0 bg-[#FF6C4A] z-50 flex">
          {/* Compact Expert Info Panel - 20% */}
          <div className="w-[20%] bg-[#151515] border-r border-gray-800/50 flex flex-col">
            {/* Compact Header */}
            <div className="p-4 border-b border-gray-800/50 bg-gradient-to-br from-[#151515] to-[#1A1A1A]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-white">Expert Profile</h3>
                <button 
                  onClick={closeChat}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              
              {/* Compact Profile */}
              <div className="text-center">
                <div className="relative inline-block mb-3">
                  <img
                    src={selectedExpert.image}
                    alt={selectedExpert.name}
                    className="w-16 h-16 rounded-xl border-2 border-[#FF6C4A] object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[#151515] ${
                    selectedExpert.isOnline ? 'bg-emerald-500' : 'bg-gray-500'
                  }`}></div>
                </div>
                
                <div className={`${getBadgeColor(selectedExpert.badge)} text-white text-xs px-2 py-1 rounded-full font-medium mb-2 inline-block`}>
                  {selectedExpert.badge}
                </div>
                
                <h4 className="text-sm font-bold text-white mb-1">{selectedExpert.name}</h4>
                <p className="text-[#FF6C4A] font-medium text-xs mb-1">{selectedExpert.title}</p>
                <p className="text-gray-400 text-xs">{selectedExpert.company}</p>
              </div>
            </div>

            {/* Compact Info */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Basic Stats */}
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-[#1A1A1A]/50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-[#FF6C4A]">{selectedExpert.rating}</div>
                  <div className="text-gray-400 text-xs">Rating ({selectedExpert.reviews})</div>
                </div>
                <div className="bg-[#1A1A1A]/50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-[#FF6C4A]">{selectedExpert.sessions}</div>
                  <div className="text-gray-400 text-xs">Sessions</div>
                </div>
                <div className="bg-[#1A1A1A]/50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-[#FF6C4A]">{selectedExpert.successRate}%</div>
                  <div className="text-gray-400 text-xs">Success Rate</div>
                </div>
              </div>

              {/* Compact Bio */}
              <div>
                <h5 className="text-white font-medium mb-2 text-xs flex items-center">
                  <User className="mr-2 text-[#FF6C4A]" size={14} />
                  About
                </h5>
                <p className="text-gray-300 text-xs leading-relaxed">{selectedExpert.bio}</p>
              </div>

              {/* Specialization */}
              <div>
                <h5 className="text-white font-medium mb-2 text-xs flex items-center">
                  <Briefcase className="mr-2 text-[#FF6C4A]" size={14} />
                  Specialization
                </h5>
                <p className="text-gray-300 text-xs leading-relaxed">{selectedExpert.specialization}</p>
              </div>

              {/* Experience */}
              <div>
                <h5 className="text-white font-medium mb-2 text-xs flex items-center">
                  <Clock className="mr-2 text-[#FF6C4A]" size={14} />
                  Experience
                </h5>
                <p className="text-gray-300 text-xs">{selectedExpert.experience}</p>
              </div>

              {/* Education */}
              <div>
                <h5 className="text-white font-medium mb-2 text-xs flex items-center">
                  <GraduationCap className="mr-2 text-[#FF6C4A]" size={14} />
                  Education
                </h5>
                <p className="text-gray-300 text-xs">{selectedExpert.education}</p>
              </div>

              {/* Location */}
              <div>
                <h5 className="text-white font-medium mb-2 text-xs flex items-center">
                  <MapPin className="mr-2 text-[#FF6C4A]" size={14} />
                  Location
                </h5>
                <p className="text-gray-300 text-xs">{selectedExpert.location}</p>
              </div>

              {/* Languages */}
              <div>
                <h5 className="text-white font-medium mb-2 text-xs flex items-center">
                  <Globe className="mr-2 text-[#FF6C4A]" size={14} />
                  Languages
                </h5>
                <div className="flex flex-wrap gap-1">
                  {selectedExpert.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="bg-[#FF6C4A]/10 text-[#FF6C4A] px-2 py-1 rounded text-xs border border-[#FF6C4A]/20"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h5 className="text-white font-medium mb-2 text-xs flex items-center">
                  <Award className="mr-2 text-[#FF6C4A]" size={14} />
                  Achievements
                </h5>
                <div className="space-y-1">
                  {selectedExpert.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle2 className="text-emerald-500" size={12} />
                      <span className="text-gray-300 text-xs">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Topics */}
              <div>
                <h5 className="text-white font-medium mb-2 text-xs flex items-center">
                  <Brain className="mr-2 text-[#FF6C4A]" size={14} />
                  Discussion Topics
                </h5>
                <div className="flex flex-wrap gap-1">
                  {selectedExpert.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="bg-[#1A1A1A] text-gray-300 px-2 py-1 rounded text-xs border border-gray-700/50"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="bg-[#1A1A1A]/50 rounded-lg p-3">
                <div className="text-center">
                  <div className="text-xl font-bold text-[#FF6C4A]">{selectedExpert.price}</div>
                  <div className="text-gray-400 text-xs">per session</div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Section - 80% (WhatsApp style) */}
          <div className="w-[80%] bg-[#0F0F0F] flex flex-col">
            {/* Chat Header */}
            <div className="bg-[#151515] p-4 flex items-center justify-between border-b border-gray-700/50">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={selectedExpert.image}
                    alt={selectedExpert.name}
                    className="w-10 h-10 rounded-full border border-[#FF6C4A] object-cover"
                  />
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border border-[#151515] ${
                    selectedExpert.isOnline ? 'bg-emerald-500' : 'bg-gray-500'
                  }`}></div>
                </div>
                <div>
                  <h3 className="text-white font-medium">{selectedExpert.name}</h3>
                  <p className="text-gray-400 text-sm">
                    {selectedExpert.isOnline ? 'Online' : 'Offline'} • {selectedExpert.title}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors">
                  <Video size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors">
                  <Phone size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* Chat Messages - WhatsApp Style */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ 
              backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23ffffff' fill-opacity='0.02'%3e%3cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")` 
            }}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-md px-4 py-2 rounded-2xl shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-[#151515] text-white rounded-br-md'
                      : 'bg-[#FF6C4A] text-white rounded-bl-md'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-gray-300' : 'text-gray-100'
                    } text-right`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input - WhatsApp Style */}
            <div className="p-4 bg-[#151515] border-t border-gray-700/50">
              <div className="flex items-end space-x-3">
                <button className="p-2 text-gray-400 hover:text-[#FF6C4A] transition-colors">
                  <Smile size={20} />
                </button>
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    rows="1"
                    className="w-full bg-[#2a3942] border-none rounded-3xl px-4 py-2 focus:outline-none resize-none text-white placeholder-gray-400 min-h-[40px] max-h-32"
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
                  className="p-2 bg-[#FF6C4A] hover:bg-[#FF5722] disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-full transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
              
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 mt-3">
                {[
                  { text: "What's your advice for breaking into your industry?", label: "Industry Entry" },
                  { text: "Can you share insights about leadership in your field?", label: "Leadership" },
                  { text: "What trends should I watch in your industry?", label: "Industry Trends" },
                  { text: "How do you approach innovation and strategy?", label: "Strategy" }
                ].map((action, index) => (
                  <button 
                    key={index}
                    onClick={() => setNewMessage(action.text)}
                    className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-gray-300 hover:text-white text-xs px-3 py-1 rounded-full border border-gray-600/50 hover:border-gray-500 transition-all duration-200"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndustryExpertsPage;