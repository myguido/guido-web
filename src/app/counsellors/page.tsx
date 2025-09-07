'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Star, 
  MapPin, 
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
  Calendar,
  Clock
} from 'lucide-react';
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
  const [favorites, setFavorites] = useState(new Set());
  const messagesEndRef = useRef(null);

  const categories = [
    { id: 'all', label: 'All Experts', count: 24, icon: Users },
    { id: 'career', label: 'Career Guidance', count: 8, icon: TrendingUp },
    { id: 'academic', label: 'Academic Planning', count: 6, icon: GraduationCap },
    { id: 'skill', label: 'Skill Development', count: 5, icon: Zap },
    { id: 'entrepreneurship', label: 'Entrepreneurship', count: 3, icon: Target },
    { id: 'wellness', label: 'Career Wellness', count: 2, icon: Shield }
  ];

  const counsellors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      title: "Senior Career Strategist",
      specialization: "Technology & Engineering Careers",
      experience: "12+ years",
      rating: 4.9,
      reviews: 156,
      location: "Mumbai, India",
      languages: ["English", "Hindi", "Marathi"],
      price: "₹1,500",
      priceLabel: "per session",
      availability: "Available Now",
      image: "https://images.unsplash.com/photo-1594824708403-67b8bbf25bae?w=150&h=150&fit=crop&crop=face",
      sessions: 500,
      category: "career",
      isOnline: true,
      responseTime: "< 5 min",
      successRate: 95,
      bio: "Technology career strategist with 12+ years of experience guiding professionals from startups to Fortune 500 companies. Specialized in career transitions, leadership development, and strategic career planning.",
      education: "PhD in Career Development, IIT Mumbai",
      certifications: ["Certified Career Coach (CCC)", "Technology Leadership Specialist", "Executive Career Consultant"],
      achievements: ["Top 10 Career Strategists 2024", "500+ Successful Career Transitions", "Forbes Featured Career Expert"]
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      title: "Business Strategy Expert",
      specialization: "Entrepreneurship & Startup Ecosystems",
      experience: "15+ years",
      rating: 4.8,
      reviews: 203,
      location: "Bangalore, India",
      languages: ["English", "Hindi", "Kannada"],
      price: "₹2,000",
      priceLabel: "per session",
      availability: "Available Tomorrow",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      sessions: 750,
      category: "entrepreneurship",
      isOnline: false,
      responseTime: "< 10 min",
      successRate: 92,
      bio: "Strategic business consultant and former startup founder with deep expertise in scaling businesses. Mentored 100+ startups with combined valuations of $2B+.",
      education: "MBA Strategy, IIM Bangalore",
      certifications: ["Certified Startup Mentor", "Business Strategy Expert", "Venture Capital Advisor"],
      achievements: ["100+ Funded Startups", "Ex-Founder (₹50Cr Exit)", "TechStars Mentor"]
    },
    {
      id: 3,
      name: "Sarah Johnson",
      title: "Global Career Consultant",
      specialization: "International Opportunities & Relocation",
      experience: "10+ years",
      rating: 4.9,
      reviews: 89,
      location: "Delhi, India",
      languages: ["English", "Hindi"],
      price: "₹1,800",
      priceLabel: "per session",
      availability: "Available Now",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      sessions: 300,
      category: "career",
      isOnline: true,
      responseTime: "< 3 min",
      successRate: 96,
      bio: "International career consultant specializing in global mobility and cross-cultural career transitions. Expert in visa processes, cultural adaptation, and international job markets.",
      education: "Masters in International Relations, JNU",
      certifications: ["Global Mobility Specialist", "Immigration Consultant", "Cross-Cultural Career Coach"],
      achievements: ["300+ International Placements", "15+ Countries Expertise", "Global Career Summit Speaker"]
    },
    {
      id: 4,
      name: "Dr. Amit Patel",
      title: "Academic Strategy Advisor",
      specialization: "Higher Education & Research Pathways",
      experience: "8+ years",
      rating: 4.7,
      reviews: 124,
      location: "Pune, India",
      languages: ["English", "Hindi", "Gujarati"],
      price: "₹1,200",
      priceLabel: "per session",
      availability: "Available Today",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      sessions: 420,
      category: "academic",
      isOnline: true,
      responseTime: "< 8 min",
      successRate: 90,
      bio: "Academic strategist with expertise in research pathways, university admissions, and scholarship guidance. Specialized in STEM and research-oriented career planning.",
      education: "PhD in Education Psychology, University of Pune",
      certifications: ["Academic Planning Specialist", "Research Career Advisor", "University Admissions Expert"],
      achievements: ["90% Admission Success Rate", "₹2Cr+ Scholarships Secured", "Research Publication Mentor"]
    },
    {
      id: 5,
      name: "Meera Reddy",
      title: "Future Skills Architect",
      specialization: "Digital Transformation & Upskilling",
      experience: "6+ years",
      rating: 4.8,
      reviews: 67,
      location: "Hyderabad, India",
      languages: ["English", "Hindi", "Telugu"],
      price: "₹1,300",
      priceLabel: "per session",
      availability: "Today 6 PM",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332336c?w=150&h=150&fit=crop&crop=face",
      sessions: 180,
      category: "skill",
      isOnline: false,
      responseTime: "< 15 min",
      successRate: 88,
      bio: "Digital transformation specialist focusing on future-ready skills and career pivoting. Expert in identifying emerging trends and creating personalized upskilling roadmaps.",
      education: "Masters in Computer Science, IIIT Hyderabad",
      certifications: ["Digital Skills Strategist", "Learning & Development Expert", "Future of Work Specialist"],
      achievements: ["500+ Professionals Upskilled", "AI & ML Career Transitions", "Tech Industry Partnerships"]
    },
    {
      id: 6,
      name: "Vikram Singh",
      title: "Holistic Career Coach",
      specialization: "Work-Life Integration & Mental Wellness",
      experience: "9+ years",
      rating: 4.9,
      reviews: 98,
      location: "Chennai, India",
      languages: ["English", "Hindi", "Tamil"],
      price: "₹1,400",
      priceLabel: "per session",
      availability: "Available Tomorrow",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      sessions: 350,
      category: "wellness",
      isOnline: true,
      responseTime: "< 12 min",
      successRate: 94,
      bio: "Holistic career coach integrating mental wellness with professional growth. Specialized in sustainable career development, stress management, and work-life harmony.",
      education: "Masters in Applied Psychology, University of Madras",
      certifications: ["Licensed Career Counselor", "Workplace Wellness Expert", "Mindfulness Coach"],
      achievements: ["350+ Wellness Transformations", "Corporate Wellness Programs", "Mental Health Advocate"]
    }
  ];

  const filteredCounsellors = counsellors.filter(counsellor => {
    const matchesCategory = selectedCategory === 'all' || counsellor.category === selectedCategory;
    const matchesSearch = counsellor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         counsellor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const openChat = (counsellor) => {
    setSelectedCounsellor(counsellor);
    setIsChatOpen(true);
    setMessages([
      {
        id: 1,
        text: `Hi! I&apos;m ${counsellor.name}. I&apos;m excited to help you with your career journey. What specific challenge or goal would you like to work on today?`,
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
      
      setTimeout(() => {
        const responses = [
          "I understand your concern. Let me share some strategic insights that could help you navigate this situation effectively.",
          "That&apos;s a great question! Based on my experience with similar cases, here&apos;s what I&apos;d recommend...",
          "I appreciate you sharing that with me. Let&apos;s work together to create a personalized action plan.",
          "Your situation is quite common, and there are proven strategies we can implement. Here&apos;s my approach..."
        ];
        
        const counsellorResponse = {
          id: messages.length + 2,
          text: responses[Math.floor(Math.random() * responses.length)],
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
      <Navbar />
      
      <div className="pt-20">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-[#151515] via-[#1A1A1A] to-[#0F0F0F] border-b border-gray-800/50">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF6C4A]/5 to-[#FF8A50]/5"></div>
          <div className="relative max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-[#FF6C4A]/10 border border-[#FF6C4A]/20 rounded-full px-6 py-2 mb-6">
                <Sparkles className="text-[#FF6C4A]" size={16} />
                <span className="text-[#FF6C4A] font-medium text-sm">Premium Career Guidance</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Meet Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6C4A] to-[#FF8A50]">
                  Career Experts
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Connect with industry-leading professionals who understand your journey and can guide you towards your dream career with personalized strategies
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by name, specialization, or expertise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#1A1A1A]/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl pl-14 pr-6 py-4 text-white placeholder-gray-400 focus:border-[#FF6C4A] focus:outline-none focus:ring-2 focus:ring-[#FF6C4A]/20 transition-all"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-[#FF6C4A] to-[#FF8A50] text-white shadow-lg shadow-[#FF6C4A]/25'
                        : 'bg-[#1A1A1A]/60 backdrop-blur-sm text-gray-300 hover:bg-[#1A1A1A] border border-gray-700/50 hover:border-gray-600'
                    }`}
                  >
                    <IconComponent size={16} />
                    <span>{category.label}</span>
                    <span className="bg-black/20 px-2 py-0.5 rounded-full text-xs">
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-[#FF6C4A]/5 to-[#FF8A50]/5 border-b border-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '50+', label: 'Expert Counsellors', icon: Users },
                { number: '10K+', label: 'Success Stories', icon: TrendingUp },
                { number: '4.9', label: 'Average Rating', icon: Star },
                { number: '95%', label: 'Success Rate', icon: Target }
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

        {/* Counsellors Grid */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCounsellors.map((counsellor) => (
              <div
                key={counsellor.id}
                className="group bg-gradient-to-br from-[#151515] to-[#1A1A1A] border border-gray-800/50 rounded-3xl p-6 hover:border-[#FF6C4A]/30 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#FF6C4A]/10"
              >
                {/* Header with favorite only */}
                <div className="flex justify-end items-start mb-4">
                  <button 
                    onClick={() => toggleFavorite(counsellor.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Heart size={18} className={favorites.has(counsellor.id) ? 'fill-red-400 text-red-400' : ''} />
                  </button>
                </div>

                {/* Profile */}
                <div className="text-center mb-5">
                  <div className="relative inline-block mb-4">
                    <Image
                      src={counsellor.image}
                      alt={counsellor.name}
                      width={72}
                      height={72}
                      className="w-18 h-18 rounded-2xl object-cover border-2 border-[#FF6C4A]/50 group-hover:border-[#FF6C4A] transition-all"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[#151515] flex items-center justify-center ${
                      counsellor.isOnline ? 'bg-emerald-500' : 'bg-gray-500'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${counsellor.isOnline ? 'bg-white' : 'bg-gray-300'}`}></div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-1">{counsellor.name}</h3>
                  <p className="text-[#FF6C4A] font-semibold text-sm mb-1">{counsellor.title}</p>
                  <p className="text-gray-400 text-xs font-medium">{counsellor.experience}</p>
                </div>

                {/* Specialization */}
                <div className="bg-[#1A1A1A]/50 rounded-xl p-3 mb-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <Briefcase className="text-[#FF6C4A]" size={14} />
                    <span className="text-gray-300 font-medium text-xs">Specialization</span>
                  </div>
                  <p className="text-white text-sm font-medium">{counsellor.specialization}</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Star className="text-yellow-400 fill-current" size={12} />
                      <span className="font-bold text-white text-xs">{counsellor.rating}</span>
                    </div>
                    <p className="text-gray-400 text-xs">{counsellor.reviews} reviews</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Users className="text-[#FF6C4A]" size={12} />
                      <span className="font-bold text-white text-xs">{counsellor.sessions}</span>
                    </div>
                    <p className="text-gray-400 text-xs">sessions</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Target className="text-emerald-500" size={12} />
                      <span className="font-bold text-white text-xs">{counsellor.successRate}%</span>
                    </div>
                    <p className="text-gray-400 text-xs">success</p>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <MapPin size={12} />
                      <span>{counsellor.location}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-emerald-400">
                      <Clock size={12} />
                      <span className="font-medium">{counsellor.responseTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {counsellor.languages.slice(0, 2).map((lang, index) => (
                      <span
                        key={index}
                        className="bg-[#1A1A1A] text-gray-300 px-2 py-0.5 rounded text-xs border border-gray-700/50"
                      >
                        {lang}
                      </span>
                    ))}
                    {counsellor.languages.length > 2 && (
                      <span className="bg-[#1A1A1A] text-gray-300 px-2 py-0.5 rounded text-xs border border-gray-700/50">
                        +{counsellor.languages.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Pricing and CTA */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline space-x-1">
                        <span className="text-xl font-bold text-[#FF6C4A]">{counsellor.price}</span>
                        <span className="text-gray-400 text-xs">/{counsellor.priceLabel}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        <div className={`w-2 h-2 rounded-full ${
                          counsellor.availability.includes('Available Now') ? 'bg-emerald-500' : 'bg-yellow-500'
                        }`}></div>
                        <span className="text-gray-300 font-medium">{counsellor.availability}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => openChat(counsellor)}
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
              Ready to Transform Your Career?
            </h2>
            <p className="text-white/90 text-xl mb-10 leading-relaxed max-w-3xl mx-auto">
              Join thousands of professionals who&apos;ve already accelerated their careers with our expert guidance. Your dream career is just one conversation away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-[#FF6C4A] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-2">
                <Calendar size={20} />
                <span>Book Free Consultation</span>
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                <BookOpen size={20} />
                <span>Explore Services</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp-style Chat Interface */}
      {isChatOpen && selectedCounsellor && (
        <div className="fixed inset-0 bg-[#FF6C4A] z-50 flex">
          {/* Compact Counsellor Info Panel - 20% */}
          <div className="w-[20%] bg-[#151515] border-r border-gray-800/50 flex flex-col">
            {/* Compact Header */}
            <div className="p-4 border-b border-gray-800/50 bg-gradient-to-br from-[#151515] to-[#1A1A1A]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-white">Profile</h3>
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
                  <Image
                    src={selectedCounsellor.image}
                    alt={selectedCounsellor.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-xl border-2 border-[#FF6C4A] object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[#151515] ${
                    selectedCounsellor.isOnline ? 'bg-emerald-500' : 'bg-gray-500'
                  }`}></div>
                </div>
                
                <h4 className="text-sm font-bold text-white mb-1">{selectedCounsellor.name}</h4>
                <p className="text-[#FF6C4A] font-medium text-xs mb-1">{selectedCounsellor.title}</p>
                <p className="text-gray-400 text-xs">{selectedCounsellor.isOnline ? 'Online' : 'Offline'}</p>
              </div>
            </div>

            {/* Compact Info */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Basic Stats */}
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-[#1A1A1A]/50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-[#FF6C4A]">{selectedCounsellor.rating}</div>
                  <div className="text-gray-400 text-xs">Rating</div>
                </div>
                <div className="bg-[#1A1A1A]/50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-[#FF6C4A]">{selectedCounsellor.sessions}</div>
                  <div className="text-gray-400 text-xs">Sessions</div>
                </div>
              </div>

              {/* Compact Specialization */}
              <div>
                <h5 className="text-white font-medium mb-2 text-xs flex items-center">
                  <Briefcase className="mr-2 text-[#FF6C4A]" size={14} />
                  Specialization
                </h5>
                <p className="text-gray-300 text-xs leading-relaxed">{selectedCounsellor.specialization}</p>
              </div>

              {/* Experience */}
              <div>
                <h5 className="text-white font-medium mb-2 text-xs flex items-center">
                  <Clock className="mr-2 text-[#FF6C4A]" size={14} />
                  Experience
                </h5>
                <p className="text-gray-300 text-xs">{selectedCounsellor.experience}</p>
              </div>

              {/* Location */}
              <div>
                <h5 className="text-white font-medium mb-2 text-xs flex items-center">
                  <MapPin className="mr-2 text-[#FF6C4A]" size={14} />
                  Location
                </h5>
                <p className="text-gray-300 text-xs">{selectedCounsellor.location}</p>
              </div>

              {/* Languages */}
              <div>
                <h5 className="text-white font-medium mb-2 text-xs flex items-center">
                  <Globe className="mr-2 text-[#FF6C4A]" size={14} />
                  Languages
                </h5>
                <div className="flex flex-wrap gap-1">
                  {selectedCounsellor.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="bg-[#FF6C4A]/10 text-[#FF6C4A] px-2 py-1 rounded text-xs border border-[#FF6C4A]/20"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="bg-[#1A1A1A]/50 rounded-lg p-3">
                <div className="text-center">
                  <div className="text-xl font-bold text-[#FF6C4A]">{selectedCounsellor.price}</div>
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
                  <Image
                    src={selectedCounsellor.image}
                    alt={selectedCounsellor.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full border border-[#FF6C4A]-600 object-cover"
                  />
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border border-[#151515] ${
                    selectedCounsellor.isOnline ? 'bg-emerald-500' : 'bg-gray-500'
                  }`}></div>
                </div>
                <div>
                  <h3 className="text-white font-medium">{selectedCounsellor.name}</h3>
                  <p className="text-gray-400 text-sm">
                    {selectedCounsellor.isOnline ? 'Online' : 'Offline'} • {selectedCounsellor.title}
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
                      message.sender === 'user' ? 'text-gray-300' : 'text-gray-400'
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
                    rows={1}
                    className="w-full bg-[#2a3942] border-none rounded-3xl px-4 py-2 focus:outline-none resize-none text-white placeholder-gray-400 min-h-[40px] max-h-32"
                    style={{ 
                      resize: 'none',
                      overflow: 'hidden',
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                    }}
                  />
                </div>
                <button 
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 bg-[#151515] hover:bg-[#151515] disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-full transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
              
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 mt-3">
                {[
                  { text: "I&apos;d like to explore career opportunities in my field", label: "Career Opportunities" },
                  { text: "Can you help me create a standout resume?", label: "Resume Building" },
                  { text: "What skills should I develop for career growth?", label: "Skill Development" },
                  { text: "I need guidance on salary negotiation", label: "Salary Strategy" }
                ].map((action, index) => (
                  <button 
                    key={index}
                    onClick={() => setNewMessage(action.text)}
                    className="bg-[#151515] hover:bg-[#151515] text-gray-300 hover:text-white text-xs px-3 py-1 rounded-full border border-gray-600/50 hover:border-gray-500 transition-all duration-200"
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

export default CounsellorsPage;