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
  Play,
  ArrowLeft,
  Info,
  ChevronDown,
  ChevronLeft,
  CreditCard,
  Check,
  Eye,
  Paperclip
} from 'lucide-react';

type BadgeType = 'Industry Leader' | 'Tech Leader' | 'Global Expert' | 'Medical Expert' | 'Entrepreneur' | 'Pioneer';

interface Expert {
  id: number;
  name: string;
  title: string;
  company: string;
  industry: string;
  experience: string;
  rating: number;
  reviews: number;
  specialization: string;
  location: string;
  languages: string[];
  price: string;
  priceLabel: string;
  availability: string;
  image: string;
  badge?: BadgeType;
  achievements: string[];
  sessions: number;
  topics: string[];
  bio: string;
  nextAvailable: string;
  isOnline: boolean;
  responseTime: string;
  successRate: number;
  education: string;
  certifications: string[];
  category: string;
  duration: string;
  availableSlots: string[];
}

interface Industry {
  id: string;
  label: string;
  count: number;
  icon: any;
}

interface Event {
  id: number;
  title: string;
  expert: string;
  date: string;
  time: string;
  type: string;
  attendees: number;
  price: string;
  image: string;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'expert';
  timestamp: string;
}

interface BookingModalProps {
  expert: Expert | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (expertId: number, date: string, time: string) => void;
}

function BookingModal({ expert, isOpen, onClose, onConfirmBooking }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  if (!isOpen || !expert) return null;

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
    onConfirmBooking(expert.id, selectedDate, selectedTime);
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
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div className="flex items-center">
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">{expert.name}</h3>
                  <p className="text-sm text-gray-400">{expert.title}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="text-gray-400" size={20} />
              </button>
            </div>

            <div className="p-6 border-b border-gray-800">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Clock className="text-[#FF6C4A] mr-2" size={16} />
                  <span className="text-sm text-gray-300">Duration: {expert.duration}</span>
                </div>
                <div className="flex items-center">
                  <CreditCard className="text-green-500 mr-2" size={16} />
                  <span className="text-sm text-gray-300">Price: {expert.price}</span>
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
                          ? 'bg-[#FF6C4A] text-white'
                          : 'bg-[#252525] text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      <div className="text-xs">{date.toLocaleDateString('en', { weekday: 'short' })}</div>
                      <div className="text-sm font-medium">{date.getDate()}</div>
                      {isToday && <div className="text-xs text-[#FF6C4A]">Today</div>}
                    </button>
                  );
                })}
              </div>
            </div>

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
                          ? 'bg-[#FF6C4A] text-white'
                          : 'bg-[#252525] text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

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
                className="flex-1 px-4 py-2 bg-[#FF6C4A] text-white rounded-lg hover:bg-[#FF5722] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Payment
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white">Complete Payment</h3>
              <button
                onClick={() => setShowPayment(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ChevronLeft className="text-gray-400" size={20} />
              </button>
            </div>

            <div className="p-6 border-b border-gray-800">
              <div className="bg-[#252525] p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">Booking Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Expert:</span>
                    <span className="text-white">{expert.name}</span>
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
                    <span className="text-white">{expert.duration}</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t border-gray-700">
                    <span className="text-white">Total:</span>
                    <span className="text-[#FF6C4A]">{expert.price}</span>
                  </div>
                </div>
              </div>
            </div>

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

            <div className="p-6 flex gap-3">
              <button
                onClick={() => setShowPayment(false)}
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleConfirmPayment}
                className="flex-1 px-4 py-2 bg-[#FF6C4A] text-white rounded-lg hover:bg-[#FF5722] transition-colors flex items-center justify-center"
              >
                <Shield className="mr-2" size={16} />
                Pay {expert.price}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const IndustryExpertsPage = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('experts');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const industries: Industry[] = [
    { id: 'all', label: 'All Industries', count: 35, icon: Building2 },
    { id: 'tech', label: 'Technology', count: 12, icon: TrendingUp },
    { id: 'finance', label: 'Finance & Banking', count: 8, icon: Trophy },
    { id: 'healthcare', label: 'Healthcare', count: 6, icon: Target },
    { id: 'marketing', label: 'Marketing & Sales', count: 5, icon: Briefcase },
    { id: 'consulting', label: 'Consulting', count: 4, icon: Award }
  ];

  const experts: Expert[] = [
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
      category: "tech",
      duration: "90 min",
      availableSlots: ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"],
      badge: "Tech Leader"
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
      category: "tech",
      duration: "60 min",
      availableSlots: ["10:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"],
      badge: "Tech Leader"
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
      category: "finance",
      duration: "75 min",
      availableSlots: ["11:00 AM", "02:00 PM", "04:00 PM", "06:00 PM"]
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
      category: "healthcare",
      duration: "60 min",
      availableSlots: ["09:00 AM", "11:00 AM", "02:00 PM", "05:00 PM"]
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
      category: "marketing",
      duration: "70 min",
      availableSlots: ["10:00 AM", "12:00 PM", "03:00 PM", "06:00 PM"]
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
      category: "healthcare",
      duration: "80 min",
      availableSlots: ["09:00 AM", "11:00 AM", "01:00 PM", "04:00 PM"]
    }
  ];

  const upcomingEvents: Event[] = [
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

  const getBadgeColor = (badge?: BadgeType): string => {
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

  const toggleFavorite = (id: number): void => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const openChat = (expert: Expert): void => {
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

  const closeChat = (): void => {
    setIsChatOpen(false);
    setSelectedExpert(null);
    setMessages([]);
    setNewMessage('');
    setShowProfile(false);
  };

  const handleBookSession = (expert: Expert): void => {
    setSelectedExpert(expert);
    setShowBookingModal(true);
  };

  const handleCloseBookingModal = (): void => {
    setShowBookingModal(false);
    setSelectedExpert(null);
  };

  const handleConfirmBooking = (expertId: number, date: string, time: string): void => {
    console.log('Booking confirmed:', { expertId, date, time });
    alert('Session booked successfully! You will receive a confirmation email shortly.');
  };

  const sendMessage = (): void => {
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
          "That's an excellent question. Based on my experience in the industry, here's what I've learned...",
          "I've faced similar challenges throughout my career. Let me share some strategic insights that could help you.",
          "From my perspective as an industry leader, I'd recommend focusing on these key areas...",
          "That's a common concern I hear from professionals. Here's how I approach this challenge..."
        ];
        
        const expertResponse: Message = {
          id: messages.length + 2,
          text: responses[Math.floor(Math.random() * responses.length)],
          sender: 'expert',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, expertResponse]);
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
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
          <div className="relative bg-gradient-to-br from-[#121212] via-[#0F0F0F] to-[#0A0A0A] border-b border-gray-900">
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
                
                <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-8">
                  Get exclusive access to leaders, founders, and visionaries who are shaping the future. 
                  Learn directly from those who've built billion-dollar companies and transformed industries.
                </p>
              </div>

              <div className="flex justify-center mb-8">
                <div className="bg-[#1A1A1A]/80 backdrop-blur-sm border border-gray-800 rounded-lg p-1 flex">
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

              <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type="text"
                    placeholder="Search experts, companies, or specializations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-gray-800 rounded-2xl pl-14 pr-6 py-4 text-white placeholder-gray-500 focus:border-[#FF6C4A] focus:outline-none focus:ring-2 focus:ring-[#FF6C4A]/20 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {activeTab === 'experts' && (
            <>
              <div className="bg-[#0F0F0F] border-b border-gray-900">
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
                              ? 'bg-[#FF6C4A] text-white shadow-lg shadow-[#FF6C4A]/25'
                              : 'bg-[#1A1A1A] text-gray-400 hover:bg-[#252525] border border-gray-800 hover:border-gray-700'
                          }`}
                        >
                          <IconComponent size={16} />
                          <span>{industry.label}</span>
                          <span className="bg-black/30 px-2 py-0.5 rounded-full text-xs">
                            {industry.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="bg-[#0F0F0F] border-b border-gray-900">
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
                        <div className="text-gray-400 font-medium">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredExperts.map((expert) => (
                    <div
                      key={expert.id}
                      className="group bg-[#141414] border border-gray-800 rounded-2xl p-6 hover:border-[#FF6C4A]/50 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-[#FF6C4A]/10"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className={`${getBadgeColor(expert.badge)} text-white text-xs px-3 py-1 rounded-full font-medium`}>
                          {expert.badge || 'Expert'}
                        </div>
                        <button 
                          onClick={() => toggleFavorite(expert.id)}
                          className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <Heart size={18} className={favorites.has(expert.id) ? 'fill-red-500 text-red-500' : ''} />
                        </button>
                      </div>

                      <div className="text-center mb-5">
                        <div className="relative inline-block mb-4">
                          <img
                            src={expert.image}
                            alt={expert.name}
                            className="w-20 h-20 rounded-full object-cover border-2 border-[#FF6C4A]/50 group-hover:border-[#FF6C4A] transition-all"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[#141414] flex items-center justify-center ${
                            expert.isOnline ? 'bg-emerald-500' : 'bg-gray-600'
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${expert.isOnline ? 'bg-white' : 'bg-gray-400'}`}></div>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-bold text-white mb-1">{expert.name}</h3>
                        <p className="text-[#FF6C4A] font-semibold text-sm mb-1">{expert.title}</p>
                        <p className="text-gray-500 text-xs font-medium">{expert.company}</p>
                      </div>

                      <div className="bg-[#1A1A1A] rounded-xl p-3 mb-4">
                        <div className="flex items-center space-x-2 mb-1">
                          <Briefcase className="text-[#FF6C4A]" size={14} />
                          <span className="text-gray-400 font-medium text-xs">Specialization</span>
                        </div>
                        <p className="text-white text-sm font-medium">{expert.specialization}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-1 mb-1">
                            <Star className="text-yellow-400 fill-current" size={12} />
                            <span className="font-bold text-white text-xs">{expert.rating}</span>
                          </div>
                          <p className="text-gray-500 text-xs">{expert.reviews} reviews</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-1 mb-1">
                            <Users className="text-[#FF6C4A]" size={12} />
                            <span className="font-bold text-white text-xs">{expert.sessions}</span>
                          </div>
                          <p className="text-gray-500 text-xs">sessions</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-1 mb-1">
                            <Target className="text-emerald-500" size={12} />
                            <span className="font-bold text-white text-xs">{expert.successRate}%</span>
                          </div>
                          <p className="text-gray-500 text-xs">success</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-2 text-gray-500">
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
                              className="bg-[#1A1A1A] text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-800"
                            >
                              {lang}
                            </span>
                          ))}
                          {expert.languages.length > 2 && (
                            <span className="bg-[#1A1A1A] text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-800">
                              +{expert.languages.length - 2}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-baseline space-x-1">
                              <span className="text-xl font-bold text-[#FF6C4A]">{expert.price}</span>
                              <span className="text-gray-500 text-xs">/{expert.priceLabel}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs">
                              <div className={`w-2 h-2 rounded-full ${
                                expert.availability.includes('Available Now') || expert.availability.includes('Available This') ? 'bg-emerald-500' : 'bg-yellow-500'
                              }`}></div>
                              <span className="text-gray-400 font-medium">{expert.availability}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleBookSession(expert)}
                            className="flex-1 bg-[#FF6C4A] hover:bg-[#FF5722] text-white font-semibold py-3 px-5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#FF6C4A]/25 flex items-center justify-center space-x-2 text-sm"
                          >
                            <Calendar size={16} />
                            <span>Book Now</span>
                          </button>
                          <button 
                            onClick={() => openChat(expert)}
                            className="p-3 bg-[#1A1A1A] border border-gray-700 text-white rounded-xl hover:border-[#FF6C4A] transition-colors"
                          >
                            <MessageCircle size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-16">
                  <button className="bg-[#1A1A1A] hover:bg-[#252525] border border-gray-800 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 mx-auto group">
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
                    className="bg-[#141414] border border-gray-800 rounded-2xl overflow-hidden hover:border-[#FF6C4A]/50 transition-all transform hover:scale-105"
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

              <div className="text-center mt-12">
                <button className="bg-[#1A1A1A] hover:bg-[#252525] border border-gray-800 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 mx-auto">
                  <span>View All Events</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

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
      )}

      <BookingModal
        expert={selectedExpert}
        isOpen={showBookingModal}
        onClose={handleCloseBookingModal}
        onConfirmBooking={handleConfirmBooking}
      />

      {isChatOpen && selectedExpert && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A1D21] w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl flex overflow-hidden border border-gray-800">
            
            <div className="flex-1 flex flex-col">
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
                        src={selectedExpert.image}
                        alt={selectedExpert.name}
                        className="w-11 h-11 rounded-full object-cover border-2 border-[#FF6C4A]"
                      />
                      {selectedExpert.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#23272B]"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-base">{selectedExpert.name}</h3>
                      <p className="text-gray-400 text-xs">
                        {selectedExpert.isOnline ? 'Active now' : 'Offline'}
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
                        ? 'bg-[#FF6C4A] text-white rounded-2xl rounded-tr-sm'
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

              <div className="bg-[#23272B] px-6 py-4 border-t border-gray-800">
                <div className="flex items-end space-x-3">
                  <button className="p-2.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                    <Paperclip size={20} />
                  </button>
                  <div className="flex-1 relative bg-[#2A2E32] rounded-xl border border-gray-700 focus-within:border-[#FF6C4A] transition-colors">
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
                        ? 'bg-[#FF6C4A] hover:bg-[#FF5722] text-white shadow-lg shadow-[#FF6C4A]/30' 
                        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>

            {showProfile && (
              <div className="w-80 bg-[#23272B] border-l border-gray-800 overflow-y-auto">
                <div className="p-6 border-b border-gray-800">
                  <div className="text-center">
                    <img
                      src={selectedExpert.image}
                      alt={selectedExpert.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-3 border-[#FF6C4A]"
                    />
                    <h2 className="text-white font-bold text-xl mb-1">{selectedExpert.name}</h2>
                    <p className="text-[#FF6C4A] text-sm font-medium mb-1">{selectedExpert.title}</p>
                    <p className="text-gray-500 text-xs">{selectedExpert.company} • {selectedExpert.experience}</p>
                  </div>
                </div>

                <div className="p-6 border-b border-gray-800">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Star className="text-yellow-400 fill-current" size={14} />
                        <span className="font-bold text-white text-sm">{selectedExpert.rating}</span>
                      </div>
                      <p className="text-gray-500 text-xs">{selectedExpert.reviews} reviews</p>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-white text-sm mb-1">{selectedExpert.sessions}</div>
                      <p className="text-gray-500 text-xs">Sessions</p>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-white text-sm mb-1">{selectedExpert.successRate}%</div>
                      <p className="text-gray-500 text-xs">Success</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-b border-gray-800">
                  <h4 className="text-white font-semibold mb-3 text-sm">About</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{selectedExpert.bio}</p>
                </div>

                <div className="p-6 border-b border-gray-800">
                  <h4 className="text-white font-semibold mb-3 text-sm">Specialization</h4>
                  <div className="flex items-center space-x-2">
                    <Briefcase className="text-[#FF6C4A]" size={16} />
                    <p className="text-gray-300 text-sm">{selectedExpert.specialization}</p>
                  </div>
                </div>

                <div className="p-6 border-b border-gray-800">
                  <h4 className="text-white font-semibold mb-3 text-sm">Company</h4>
                  <div className="flex items-center space-x-2">
                    <Building2 className="text-[#FF6C4A]" size={16} />
                    <p className="text-gray-300 text-sm">{selectedExpert.company}</p>
                  </div>
                </div>

                <div className="p-6 border-b border-gray-800">
                  <h4 className="text-white font-semibold mb-3 text-sm">Education</h4>
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="text-[#FF6C4A]" size={16} />
                    <p className="text-gray-300 text-sm">{selectedExpert.education}</p>
                  </div>
                </div>

                <div className="p-6 border-b border-gray-800">
                  <h4 className="text-white font-semibold mb-3 text-sm">Location</h4>
                  <div className="flex items-center space-x-2">
                    <MapPin className="text-[#FF6C4A]" size={16} />
                    <p className="text-gray-300 text-sm">{selectedExpert.location}</p>
                  </div>
                </div>

                <div className="p-6 border-b border-gray-800">
                  <h4 className="text-white font-semibold mb-3 text-sm">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedExpert.languages.map((lang, index) => (
                      <span
                        key={index}
                        className="bg-[#2A2E32] text-gray-300 px-3 py-1.5 rounded-lg text-xs border border-gray-700"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 border-b border-gray-800">
                  <h4 className="text-white font-semibold mb-3 text-sm">Discussion Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedExpert.topics.map((topic, index) => (
                      <span
                        key={index}
                        className="bg-[#FF6C4A]/10 text-[#FF6C4A] px-3 py-1.5 rounded-lg text-xs border border-[#FF6C4A]/20"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 border-b border-gray-800">
                  <h4 className="text-white font-semibold mb-3 text-sm">Key Achievements</h4>
                  <div className="space-y-2">
                    {selectedExpert.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle2 className="text-emerald-500 mt-0.5 flex-shrink-0" size={14} />
                        <p className="text-gray-400 text-xs">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 border-b border-gray-800">
                  <h4 className="text-white font-semibold mb-3 text-sm">Certifications</h4>
                  <div className="space-y-2">
                    {selectedExpert.certifications.map((cert, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Award className="text-[#FF6C4A] mt-0.5 flex-shrink-0" size={14} />
                        <p className="text-gray-400 text-xs">{cert}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 border-b border-gray-800">
                  <h4 className="text-white font-semibold mb-3 text-sm">Session Fee</h4>
                  <div className="bg-[#2A2E32] rounded-lg p-4 text-center border border-gray-700">
                    <div className="text-2xl font-bold text-[#FF6C4A] mb-1">{selectedExpert.price}</div>
                    <p className="text-gray-500 text-xs">per session ({selectedExpert.duration})</p>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <button 
                    onClick={() => {
                      setShowProfile(false);
                      handleBookSession(selectedExpert);
                    }}
                    className="w-full bg-[#FF6C4A] hover:bg-[#FF5722] text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[#FF6C4A]/30"
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

export default IndustryExpertsPage;