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
  Clock,
  ArrowLeft,
  Info,
  ChevronDown,
  ChevronLeft,
  CreditCard,
  Check,
  Eye,
  Paperclip
} from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'counsellor';
  timestamp: string;
}

interface Counsellor {
  id: number;
  name: string;
  title: string;
  specialization: string;
  experience: string;
  rating: number;
  reviews: number;
  location: string;
  languages: string[];
  price: string;
  priceLabel: string;
  availability: string;
  image: string;
  sessions: number;
  category: string;
  isOnline: boolean;
  responseTime: string;
  successRate: number;
  bio: string;
  education: string;
  certifications: string[];
  achievements: string[];
  duration: string;
  availableSlots: string[];
}

interface BookingModalProps {
  counsellor: Counsellor | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (counsellorId: number, date: string, time: string) => void;
}

// Booking Modal Component
function BookingModal({ counsellor, isOpen, onClose, onConfirmBooking }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  if (!isOpen || !counsellor) return null;

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleProceedToPayment = () => {
    if (selectedDate && selectedTime) {
      setShowPayment(true);
    }
  };

  const handleConfirmPayment = () => {
    onConfirmBooking(counsellor.id, selectedDate, selectedTime);
    onClose();
    setShowPayment(false);
    setSelectedDate('');
    setSelectedTime('');
  };

  const getNextDays = (count: number) => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < count; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const availableTimes = [
    "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", 
    "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"
  ];

  const nextDays = getNextDays(7);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1A1A1A] rounded-xl border border-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {!showPayment ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div className="flex items-center">
                <img
                  src={counsellor.image}
                  alt={counsellor.name}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">{counsellor.name}</h3>
                  <p className="text-sm text-gray-400">{counsellor.title}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="text-gray-400" size={20} />
              </button>
            </div>

            {/* Session Details */}
            <div className="p-6 border-b border-gray-800">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Clock className="text-[#FF6B4A] mr-2" size={16} />
                  <span className="text-sm text-gray-300">Duration: {counsellor.duration}</span>
                </div>
                <div className="flex items-center">
                  <CreditCard className="text-green-500 mr-2" size={16} />
                  <span className="text-sm text-gray-300">Price: {counsellor.price}</span>
                </div>
                <div className="flex items-center">
                  <Video className="text-blue-500 mr-2" size={16} />
                  <span className="text-sm text-gray-300">Video Call Session</span>
                </div>
                <div className="flex items-center">
                  <Shield className="text-purple-500 mr-2" size={16} />
                  <span className="text-sm text-gray-300">Secure Payment</span>
                </div>
              </div>
            </div>

            {/* Date Selection */}
            <div className="p-6 border-b border-gray-800">
              <h4 className="text-white font-medium mb-4">Select Date</h4>
              <div className="grid grid-cols-7 gap-2">
                {nextDays.map((date, index) => {
                  const dateStr = date.toISOString().split('T')[0];
                  const isSelected = selectedDate === dateStr;
                  const isToday = index === 0;
                  
                  return (
                    <button
                      key={dateStr}
                      onClick={() => handleDateSelect(dateStr)}
                      className={`p-3 rounded-lg text-center transition-colors ${
                        isSelected
                          ? 'bg-[#FF6B4A] text-white'
                          : 'bg-[#252525] text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      <div className="text-xs">{date.toLocaleDateString('en', { weekday: 'short' })}</div>
                      <div className="text-sm font-medium">{date.getDate()}</div>
                      {isToday && <div className="text-xs text-[#FF6B4A]">Today</div>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <div className="p-6 border-b border-gray-800">
                <h4 className="text-white font-medium mb-4">Select Time</h4>
                <div className="grid grid-cols-4 gap-2">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={`p-3 rounded-lg text-center transition-colors ${
                        selectedTime === time
                          ? 'bg-[#FF6B4A] text-white'
                          : 'bg-[#252525] text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="p-6 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleProceedToPayment}
                disabled={!selectedDate || !selectedTime}
                className="flex-1 px-4 py-2 bg-[#FF6B4A] text-white rounded-lg hover:bg-[#FF5722] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Payment
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Payment Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white">Complete Payment</h3>
              <button
                onClick={() => setShowPayment(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ChevronLeft className="text-gray-400" size={20} />
              </button>
            </div>

            {/* Booking Summary */}
            <div className="p-6 border-b border-gray-800">
              <div className="bg-[#252525] p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">Booking Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Counsellor:</span>
                    <span className="text-white">{counsellor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date:</span>
                    <span className="text-white">{new Date(selectedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Time:</span>
                    <span className="text-white">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-white">{counsellor.duration}</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t border-gray-700">
                    <span className="text-white">Total:</span>
                    <span className="text-[#FF6B4A]">{counsellor.price}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="p-6 border-b border-gray-800">
              <h4 className="text-white font-medium mb-4">Payment Method</h4>
              <div className="space-y-3">
                <label className="flex items-center p-3 bg-[#252525] rounded-lg cursor-pointer hover:bg-gray-800">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <CreditCard className="text-blue-500 mr-3" size={20} />
                  <span className="text-white">Credit/Debit Card</span>
                </label>
                <label className="flex items-center p-3 bg-[#252525] rounded-lg cursor-pointer hover:bg-gray-800">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <Phone className="text-green-500 mr-3" size={20} />
                  <span className="text-white">UPI Payment</span>
                </label>
              </div>
            </div>

            {/* Payment Actions */}
            <div className="p-6 flex gap-3">
              <button
                onClick={() => setShowPayment(false)}
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleConfirmPayment}
                className="flex-1 px-4 py-2 bg-[#FF6B4A] text-white rounded-lg hover:bg-[#FF5722] transition-colors flex items-center justify-center"
              >
                <Shield className="mr-2" size={16} />
                Pay {counsellor.price}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const CounsellorsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedCounsellor, setSelectedCounsellor] = useState<Counsellor | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [favorites, setFavorites] = useState(new Set<number>());
  const [showBookingModal, setShowBookingModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: 'All Experts', count: 24, icon: Users },
    { id: 'career', label: 'Career Guidance', count: 8, icon: TrendingUp },
    { id: 'academic', label: 'Academic Planning', count: 6, icon: GraduationCap },
    { id: 'skill', label: 'Skill Development', count: 5, icon: Zap },
    { id: 'entrepreneurship', label: 'Entrepreneurship', count: 3, icon: Target },
    { id: 'wellness', label: 'Career Wellness', count: 2, icon: Shield }
  ];

  const counsellors: Counsellor[] = [
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
      achievements: ["Top 10 Career Strategists 2024", "500+ Successful Career Transitions", "Forbes Featured Career Expert"],
      duration: "60 min",
      availableSlots: ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"]
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
      achievements: ["100+ Funded Startups", "Ex-Founder (₹50Cr Exit)", "TechStars Mentor"],
      duration: "45 min",
      availableSlots: ["10:00 AM", "02:00 PM", "04:00 PM", "06:00 PM"]
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
      achievements: ["300+ International Placements", "15+ Countries Expertise", "Global Career Summit Speaker"],
      duration: "50 min",
      availableSlots: ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM"]
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
      achievements: ["90% Admission Success Rate", "₹2Cr+ Scholarships Secured", "Research Publication Mentor"],
      duration: "55 min",
      availableSlots: ["10:00 AM", "12:00 PM", "02:00 PM", "05:00 PM"]
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
      achievements: ["500+ Professionals Upskilled", "AI & ML Career Transitions", "Tech Industry Partnerships"],
      duration: "60 min",
      availableSlots: ["09:00 AM", "11:00 AM", "02:00 PM", "06:00 PM"]
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
      achievements: ["350+ Wellness Transformations", "Corporate Wellness Programs", "Mental Health Advocate"],
      duration: "70 min",
      availableSlots: ["10:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"]
    }
  ];

  const filteredCounsellors = counsellors.filter(counsellor => {
    const matchesCategory = selectedCategory === 'all' || counsellor.category === selectedCategory;
    const matchesSearch = counsellor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         counsellor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const openChat = (counsellor: Counsellor) => {
    setSelectedCounsellor(counsellor);
    setIsChatOpen(true);
    setMessages([
      {
        id: 1,
        text: `Hi! I'm ${counsellor.name}. I'm excited to help you with your career journey. What specific challenge or goal would you like to work on today?`,
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
    setShowProfile(false);
  };

  const handleBookSession = (counsellor: Counsellor) => {
    setSelectedCounsellor(counsellor);
    setShowBookingModal(true);
  };

  const handleCloseBookingModal = () => {
    setShowBookingModal(false);
    setSelectedCounsellor(null);
  };

  const handleConfirmBooking = (counsellorId: number, date: string, time: string) => {
    console.log('Booking confirmed:', { counsellorId, date, time });
    alert('Session booked successfully! You will receive a confirmation email shortly.');
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
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
          "That's a great question! Based on my experience with similar cases, here's what I'd recommend...",
          "I appreciate you sharing that with me. Let's work together to create a personalized action plan.",
          "Your situation is quite common, and there are proven strategies we can implement. Here's my approach..."
        ];
        
        const counsellorResponse: Message = {
          id: messages.length + 2,
          text: responses[Math.floor(Math.random() * responses.length)],
          sender: 'counsellor',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, counsellorResponse]);
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {!isChatOpen && (
        <div className="pt-20">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-[#121212] via-[#0F0F0F] to-[#0A0A0A] border-b border-gray-900">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B4A]/5 to-[#FF8A50]/5"></div>
            <div className="relative max-w-7xl mx-auto px-4 py-16">
              <div className="text-center mb-12">
                <div className="inline-flex items-center space-x-2 bg-[#FF6B4A]/10 border border-[#FF6B4A]/20 rounded-full px-6 py-2 mb-6">
                  <Sparkles className="text-[#FF6B4A]" size={16} />
                  <span className="text-[#FF6B4A] font-medium text-sm">Premium Career Guidance</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Meet Your
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B4A] to-[#FF8A50]">
                    Career Experts
                  </span>
                </h1>
                
                <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                  Connect with industry-leading professionals who understand your journey and can guide you towards your dream career with personalized strategies
                </p>
              </div>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type="text"
                    placeholder="Search by name, specialization, or expertise..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-gray-800 rounded-2xl pl-14 pr-6 py-4 text-white placeholder-gray-500 focus:border-[#FF6B4A] focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]/20 transition-all"
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
                          ? 'bg-[#FF6B4A] text-white shadow-lg shadow-[#FF6B4A]/25'
                          : 'bg-[#1A1A1A] text-gray-400 hover:bg-[#252525] border border-gray-800 hover:border-gray-700'
                      }`}
                    >
                      <IconComponent size={16} />
                      <span>{category.label}</span>
                      <span className="bg-black/30 px-2 py-0.5 rounded-full text-xs">
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-[#0F0F0F] border-b border-gray-900">
            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { number: '50+', label: 'Expert Counsellors', icon: Users },
                  { number: '10K+', label: 'Success Stories', icon: TrendingUp },
                  { number: '4.9', label: 'Average Rating', icon: Star },
                  { number: '95%', label: 'Success Rate', icon: Target }
                ].map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#FF6B4A] to-[#FF8A50] rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                      <stat.icon className="text-white" size={24} />
                    </div>
                    <div className="text-3xl font-bold text-[#FF6B4A] mb-2">{stat.number}</div>
                    <div className="text-gray-400 font-medium">{stat.label}</div>
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
                  className="group bg-[#141414] border border-gray-800 rounded-2xl p-6 hover:border-[#FF6B4A]/50 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-[#FF6B4A]/10"
                >
                  {/* Header with favorite only */}
                  <div className="flex justify-end items-start mb-4">
                    <button 
                      onClick={() => toggleFavorite(counsellor.id)}
                      className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Heart size={18} className={favorites.has(counsellor.id) ? 'fill-red-500 text-red-500' : ''} />
                    </button>
                  </div>

                  {/* Profile */}
                  <div className="text-center mb-5">
                    <div className="relative inline-block mb-4">
                      <img
                        src={counsellor.image}
                        alt={counsellor.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-[#FF6B4A]/50 group-hover:border-[#FF6B4A] transition-all"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[#141414] flex items-center justify-center ${
                        counsellor.isOnline ? 'bg-emerald-500' : 'bg-gray-600'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${counsellor.isOnline ? 'bg-white' : 'bg-gray-400'}`}></div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-1">{counsellor.name}</h3>
                    <p className="text-[#FF6B4A] font-semibold text-sm mb-1">{counsellor.title}</p>
                    <p className="text-gray-500 text-xs font-medium">{counsellor.experience}</p>
                  </div>

                  {/* Specialization */}
                  <div className="bg-[#1A1A1A] rounded-xl p-3 mb-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <Briefcase className="text-[#FF6B4A]" size={14} />
                      <span className="text-gray-400 font-medium text-xs">Specialization</span>
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
                      <p className="text-gray-500 text-xs">{counsellor.reviews} reviews</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Users className="text-[#FF6B4A]" size={12} />
                        <span className="font-bold text-white text-xs">{counsellor.sessions}</span>
                      </div>
                      <p className="text-gray-500 text-xs">sessions</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Target className="text-emerald-500" size={12} />
                        <span className="font-bold text-white text-xs">{counsellor.successRate}%</span>
                      </div>
                      <p className="text-gray-500 text-xs">success</p>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2 text-gray-500">
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
                          className="bg-[#1A1A1A] text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-800"
                        >
                          {lang}
                        </span>
                      ))}
                      {counsellor.languages.length > 2 && (
                        <span className="bg-[#1A1A1A] text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-800">
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
                          <span className="text-xl font-bold text-[#FF6B4A]">{counsellor.price}</span>
                          <span className="text-gray-500 text-xs">/{counsellor.priceLabel}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs">
                          <div className={`w-2 h-2 rounded-full ${
                            counsellor.availability.includes('Available Now') ? 'bg-emerald-500' : 'bg-yellow-500'
                          }`}></div>
                          <span className="text-gray-400 font-medium">{counsellor.availability}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleBookSession(counsellor)}
                        className="flex-1 bg-[#FF6B4A] hover:bg-[#FF5722] text-white font-semibold py-3 px-5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#FF6B4A]/25 flex items-center justify-center space-x-2 text-sm"
                      >
                        <Calendar size={16} />
                        <span>Book Now</span>
                      </button>
                      <button 
                        onClick={() => openChat(counsellor)}
                        className="p-3 bg-[#1A1A1A] border border-gray-700 text-white rounded-xl hover:border-[#FF6B4A] transition-colors"
                      >
                        <MessageCircle size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-16">
              <button className="bg-[#1A1A1A] hover:bg-[#252525] border border-gray-800 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 mx-auto group">
                <PlusCircle size={20} className="group-hover:rotate-90 transition-transform" />
                <span>Load More Experts</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative bg-gradient-to-r from-[#FF6B4A] to-[#FF8A50] py-20 overflow-hidden">
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
                Join thousands of professionals who have already accelerated their careers with our expert guidance. Your dream career is just one conversation away.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="bg-white text-[#FF6B4A] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-2">
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
      )}

      {/* Booking Modal */}
      <BookingModal
        counsellor={selectedCounsellor}
        isOpen={showBookingModal}
        onClose={handleCloseBookingModal}
        onConfirmBooking={handleConfirmBooking}
      />

      {/* Chat Interface - Sidebar Style */}
      {isChatOpen && selectedCounsellor && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A1D21] w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl flex overflow-hidden border border-gray-800">
            
            {/* Chat Main Area */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="bg-[#23272B] px-6 py-4 flex items-center justify-between border-b border-gray-800">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={closeChat}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X size={22} />
                  </button>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={selectedCounsellor.image}
                        alt={selectedCounsellor.name}
                        className="w-11 h-11 rounded-full object-cover border-2 border-[#FF6B4A]"
                      />
                      {selectedCounsellor.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#23272B]"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-base">{selectedCounsellor.name}</h3>
                      <p className="text-gray-400 text-xs">
                        {selectedCounsellor.isOnline ? 'Active now' : 'Offline'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setShowProfile(!showProfile)}
                    className="p-2.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Info size={20} />
                  </button>
                  <button className="p-2.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                    <Video size={20} />
                  </button>
                  <button className="p-2.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                    <Phone size={20} />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div 
                className="flex-1 overflow-y-auto px-6 py-6 space-y-4"
                style={{ 
                  backgroundColor: '#1A1D21'
                }}
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${
                      message.sender === 'user'
                        ? 'bg-[#FF6B4A] text-white rounded-2xl rounded-tr-sm'
                        : 'bg-[#2A2E32] text-white rounded-2xl rounded-tl-sm'
                    } px-4 py-3 shadow-lg`}>
                      <p className="text-sm leading-relaxed break-words">{message.text}</p>
                      <p className={`text-[10px] mt-1.5 flex items-center justify-end space-x-1 ${
                        message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        <span>{message.timestamp}</span>
                        {message.sender === 'user' && (
                          <CheckCircle2 size={12} className="text-white/80" />
                        )}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="bg-[#23272B] px-6 py-4 border-t border-gray-800">
                <div className="flex items-end space-x-3">
                  <button className="p-2.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                    <Paperclip size={20} />
                  </button>
                  <div className="flex-1 relative bg-[#2A2E32] rounded-xl border border-gray-700 focus-within:border-[#FF6B4A] transition-colors">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      rows={1}
                      className="w-full bg-transparent px-4 py-3 focus:outline-none resize-none text-white placeholder-gray-500 text-sm max-h-32"
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
                  <button className="p-2.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                    <Smile size={20} />
                  </button>
                  <button 
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className={`p-3 rounded-xl transition-all ${
                      newMessage.trim() 
                        ? 'bg-[#FF6B4A] hover:bg-[#FF5722] text-white shadow-lg shadow-[#FF6B4A]/30' 
                        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Sidebar */}
            {showProfile && (
              <div className="w-80 bg-[#23272B] border-l border-gray-800 overflow-y-auto">
                {/* Profile Header */}
                <div className="p-6 border-b border-gray-800">
                  <div className="text-center">
                    <img
                      src={selectedCounsellor.image}
                      alt={selectedCounsellor.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-3 border-[#FF6B4A]"
                    />
                    <h2 className="text-white font-bold text-xl mb-1">{selectedCounsellor.name}</h2>
                    <p className="text-[#FF6B4A] text-sm font-medium mb-1">{selectedCounsellor.title}</p>
                    <p className="text-gray-500 text-xs">{selectedCounsellor.experience}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="p-6 border-b border-gray-800">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Star className="text-yellow-400 fill-current" size={14} />
                        <span className="font-bold text-white text-sm">{selectedCounsellor.rating}</span>
                      </div>
                      <p className="text-gray-500 text-xs">{selectedCounsellor.reviews} reviews</p>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-white text-sm mb-1">{selectedCounsellor.sessions}</div>
                      <p className="text-gray-500 text-xs">Sessions</p>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-white text-sm mb-1">{selectedCounsellor.successRate}%</div>
                      <p className="text-gray-500 text-xs">Success</p>
                    </div>
                  </div>
                </div>

                {/* About */}
                <div className="p-6 border-b border-gray-800">
                  <h4 className="text-white font-semibold mb-3 text-sm">About</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{selectedCounsellor.bio}</p>
                </div>

                {/* Specialization */}
                <div className="p-6 border-b border-gray-800">
                  <h4 className="text-white font-semibold mb-3 text-sm">Specialization</h4>
                  <div className="flex items-center space-x-2">
                    <Briefcase className="text-[#FF6B4A]" size={16} />
                    <p className="text-gray-300 text-sm">{selectedCounsellor.specialization}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="p-6 border-b border-gray-800">
                  <h4 className="text-white font-semibold mb-3 text-sm">Location</h4>
                  <div className="flex items-center space-x-2">
                    <MapPin className="text-[#FF6B4A]" size={16} />
                    <p className="text-gray-300 text-sm">{selectedCounsellor.location}</p>
                  </div>
                </div>

                {/* Languages */}
                <div className="p-6 border-b border-gray-800">
                  <h4 className="text-white font-semibold mb-3 text-sm">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCounsellor.languages.map((lang, index) => (
                      <span
                        key={index}
                        className="bg-[#2A2E32] text-gray-300 px-3 py-1.5 rounded-lg text-xs border border-gray-700"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="p-6 border-b border-gray-800">
                  <h4 className="text-white font-semibold mb-3 text-sm">Key Achievements</h4>
                  <div className="space-y-2">
                    {selectedCounsellor.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle2 className="text-emerald-500 mt-0.5 flex-shrink-0" size={14} />
                        <p className="text-gray-400 text-xs">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="p-6 border-b border-gray-800">
                  <h4 className="text-white font-semibold mb-3 text-sm">Session Fee</h4>
                  <div className="bg-[#2A2E32] rounded-lg p-4 text-center border border-gray-700">
                    <div className="text-2xl font-bold text-[#FF6B4A] mb-1">{selectedCounsellor.price}</div>
                    <p className="text-gray-500 text-xs">per session ({selectedCounsellor.duration})</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 space-y-3">
                  <button 
                    onClick={() => {
                      setShowProfile(false);
                      handleBookSession(selectedCounsellor);
                    }}
                    className="w-full bg-[#FF6B4A] hover:bg-[#FF5722] text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[#FF6B4A]/30"
                  >
                    <Calendar size={18} />
                    <span>Book Session</span>
                  </button>
                  <button className="w-full bg-[#2A2E32] hover:bg-[#333740] text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center space-x-2 border border-gray-700">
                    <Video size={18} />
                    <span>Video Call</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CounsellorsPage;