'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  Star,
  Calendar,
  Clock,
  Users,
  Award,
  TrendingUp,
  BookOpen,
  Video,
  MessageCircle,
  ChevronRight,
  ChevronLeft,
  User,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Heart,
  Share2,
  Eye,
  ThumbsUp,
  Briefcase,
  Zap,
  Target,
  X,
  CreditCard,
  Shield,
  ChevronDown,
  Check,
  AlertCircle,
  Play,
  FileText,
  Bell
} from 'lucide-react';
import AboutUsPage from '../components/AboutUsPage';
import CareersPage from '../components/CareersPage';
import ContactPage from '../components/ContactPage';

// TypeScript interfaces
interface Mentor {
  id: number;
  name: string;
  title: string;
  experience: string;
  rating: number;
  reviews: number;
  specializations: string[];
  price: string;
  duration: string;
  image: string;
  availability: string;
  verified: boolean;
  sessions: number;
  location: string;
  responseTime: string;
  liked: boolean;
  type: string;
  availableSlots: string[];
}

interface Category {
  name: string;
  count: number;
  icon: React.ReactElement;
  color: string;
}

interface UpcomingSession {
  id: number;
  mentor: string;
  topic: string;
  date: string;
  time: string;
  duration: string;
  type: string;
}

interface User {
  user_metadata?: {
    firstName?: string;
  };
}

interface MentorSliderProps {
  mentors: Mentor[];
  title: string;
  likedMentors: Set<number>;
  toggleLike: (mentorId: number) => void;
  icon: React.ReactElement;
  onBookSession: (mentor: Mentor) => void;
}

interface BookingModalProps {
  mentor: Mentor | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (mentorId: number, date: string, time: string) => void;
}

// Quick Actions Data
const quickActions = [
  {
    id: 1,
    title: "Start Learning Path",
    description: "Begin your personalized career journey",
    icon: <Play className="text-[#FF6C4A]" size={20} />,
    color: "bg-[#FF6C4A]/20",
    action: "Get Started"
  },
  {
    id: 2,
    title: "Schedule Assessment",
    description: "Get your skills evaluated by experts",
    icon: <FileText className="text-blue-500" size={20} />,
    color: "bg-blue-500/20",
    action: "Book Now"
  },
  {
    id: 3,
    title: "Join Workshop",
    description: "Attend live sessions with industry leaders",
    icon: <Users className="text-green-500" size={20} />,
    color: "bg-green-500/20",
    action: "Explore"
  },
  {
    id: 4,
    title: "Track Progress",
    description: "Monitor your growth and achievements",
    icon: <TrendingUp className="text-purple-500" size={20} />,
    color: "bg-purple-500/20",
    action: "View Progress"
  }
];

// Recent Activity Data
const recentActivities = [
  {
    id: 1,
    type: "session",
    message: "Completed session with Dr. Priya Sharma",
    time: "2 hours ago",
    icon: <CheckCircle className="text-green-500" size={16} />
  },
  {
    id: 2,
    type: "booking",
    message: "Booked Finance Career Workshop",
    time: "5 hours ago",
    icon: <Calendar className="text-blue-500" size={16} />
  },
  {
    id: 3,
    type: "achievement",
    message: "Unlocked 'Consistent Learner' badge",
    time: "1 day ago",
    icon: <Award className="text-yellow-500" size={16} />
  },
  {
    id: 4,
    type: "message",
    message: "New message from Rajesh Kumar",
    time: "2 days ago",
    icon: <MessageCircle className="text-[#FF6C4A]" size={16} />
  }
];

// Booking Modal Component
function BookingModal({ mentor, isOpen, onClose, onConfirmBooking }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  if (!isOpen || !mentor) return null;

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
    onConfirmBooking(mentor.id, selectedDate, selectedTime);
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {!showPayment ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">{mentor.name}</h3>
                  <p className="text-sm text-gray-400">{mentor.title}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="text-gray-400" size={20} />
              </button>
            </div>

            {/* Session Details */}
            <div className="p-6 border-b border-gray-700">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Clock className="text-[#FF6C4A] mr-2" size={16} />
                  <span className="text-sm text-gray-300">Duration: {mentor.duration}</span>
                </div>
                <div className="flex items-center">
                  <CreditCard className="text-green-500 mr-2" size={16} />
                  <span className="text-sm text-gray-300">Price: {mentor.price}</span>
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
            <div className="p-6 border-b border-gray-700">
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
                          : 'bg-[#151515] text-gray-300 hover:bg-gray-700'
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

            {/* Time Selection */}
            {selectedDate && (
              <div className="p-6 border-b border-gray-700">
                <h4 className="text-white font-medium mb-4">Select Time</h4>
                <div className="grid grid-cols-4 gap-2">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={`p-3 rounded-lg text-center transition-colors ${
                        selectedTime === time
                          ? 'bg-[#FF6C4A] text-white'
                          : 'bg-[#151515] text-gray-300 hover:bg-gray-700'
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
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleProceedToPayment}
                disabled={!selectedDate || !selectedTime}
                className="flex-1 px-4 py-2 bg-[#FF6C4A] text-white rounded-lg hover:bg-[#FF6C4A]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Payment
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Payment Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Complete Payment</h3>
              <button
                onClick={() => setShowPayment(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ChevronLeft className="text-gray-400" size={20} />
              </button>
            </div>

            {/* Booking Summary */}
            <div className="p-6 border-b border-gray-700">
              <div className="bg-[#151515] p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">Booking Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Mentor:</span>
                    <span className="text-white">{mentor.name}</span>
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
                    <span className="text-white">{mentor.duration}</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t border-gray-600">
                    <span className="text-white">Total:</span>
                    <span className="text-[#FF6C4A]">{mentor.price}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="p-6 border-b border-gray-700">
              <h4 className="text-white font-medium mb-4">Payment Method</h4>
              <div className="space-y-3">
                <label className="flex items-center p-3 bg-[#151515] rounded-lg cursor-pointer">
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
                <label className="flex items-center p-3 bg-[#151515] rounded-lg cursor-pointer">
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
                <label className="flex items-center p-3 bg-[#151515] rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="wallet"
                    checked={paymentMethod === 'wallet'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <CreditCard className="text-purple-500 mr-3" size={20} />
                  <span className="text-white">Digital Wallet</span>
                </label>
              </div>
            </div>

            {/* Payment Form */}
            <div className="p-6 border-b border-gray-700">
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-3 bg-[#151515] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6C4A]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full p-3 bg-[#151515] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6C4A]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full p-3 bg-[#151515] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6C4A]"
                      />
                    </div>
                  </div>
                </div>
              )}
              {paymentMethod === 'upi' && (
                <div>
                  <label className="block text-sm text-gray-400 mb-2">UPI ID</label>
                  <input
                    type="text"
                    placeholder="your-upi@bank"
                    className="w-full p-3 bg-[#151515] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6C4A]"
                  />
                </div>
              )}
              {paymentMethod === 'wallet' && (
                <div className="text-center py-4">
                  <div className="text-gray-400 mb-2">You will be redirected to your wallet</div>
                  <div className="text-sm text-gray-500">Complete payment securely</div>
                </div>
              )}
            </div>

            {/* Payment Actions */}
            <div className="p-6 flex gap-3">
              <button
                onClick={() => setShowPayment(false)}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleConfirmPayment}
                className="flex-1 px-4 py-2 bg-[#FF6C4A] text-white rounded-lg hover:bg-[#FF6C4A]/90 transition-colors flex items-center justify-center"
              >
                <Shield className="mr-2" size={16} />
                Pay {mentor.price}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Career Counsellors
const counsellors: Mentor[] = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    title: "Senior Career Counsellor",
    experience: "8+ years",
    rating: 4.9,
    reviews: 234,
    specializations: ["Technology", "Engineering", "Data Science"],
    price: "₹2,500",
    duration: "60 min",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
    availability: "Available Today",
    verified: true,
    sessions: 1200,
    location: "Mumbai",
    responseTime: "< 2 hours",
    liked: false,
    type: "counsellor",
    availableSlots: ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"]
  },
  {
    id: 3,
    name: "Anita Desai",
    title: "Healthcare Career Guide",
    experience: "10+ years",
    rating: 4.9,
    reviews: 156,
    specializations: ["Healthcare", "Medicine", "Research"],
    price: "₹2,200",
    duration: "50 min",
    image: "https://images.unsplash.com/photo-1594824947037-90748b15c700?w=300&h=300&fit=crop&crop=face",
    availability: "Available Today",
    verified: true,
    sessions: 650,
    location: "Bangalore",
    responseTime: "< 30 min",
    liked: true,
    type: "counsellor",
    availableSlots: ["10:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"]
  },
  {
    id: 5,
    name: "Sneha Patel",
    title: "Creative Industries Counsellor",
    experience: "7+ years",
    rating: 4.8,
    reviews: 167,
    specializations: ["Design", "Media", "Arts"],
    price: "₹2,800",
    duration: "60 min",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    availability: "Available Today",
    verified: true,
    sessions: 380,
    location: "Chennai",
    responseTime: "< 1 hour",
    liked: false,
    type: "counsellor",
    availableSlots: ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"]
  },
  {
    id: 6,
    name: "Amit Agarwal",
    title: "Education Consultant",
    experience: "11+ years",
    rating: 4.9,
    reviews: 203,
    specializations: ["Higher Education", "Study Abroad", "Academia"],
    price: "₹2,600",
    duration: "55 min",
    image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=300&h=300&fit=crop&crop=face",
    availability: "Available Tomorrow",
    verified: true,
    sessions: 720,
    location: "Hyderabad",
    responseTime: "< 2 hours",
    liked: true,
    type: "counsellor",
    availableSlots: ["10:00 AM", "12:00 PM", "03:00 PM", "06:00 PM"]
  },
  {
    id: 21,
    name: "Kavya Reddy",
    title: "Psychology Career Counsellor",
    experience: "9+ years",
    rating: 4.8,
    reviews: 198,
    specializations: ["Psychology", "Mental Health", "Research"],
    price: "₹2,400",
    duration: "60 min",
    image: "https://images.unsplash.com/photo-1494790108755-2616c27c7923?w=300&h=300&fit=crop&crop=face",
    availability: "Available Today",
    verified: true,
    sessions: 542,
    location: "Pune",
    responseTime: "< 1 hour",
    liked: false,
    type: "counsellor",
    availableSlots: ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"]
  },
  {
    id: 22,
    name: "Rohit Mehta",
    title: "Engineering Career Guide",
    experience: "12+ years",
    rating: 4.9,
    reviews: 276,
    specializations: ["Mechanical", "Civil", "Aerospace"],
    price: "₹2,700",
    duration: "65 min",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    availability: "Available Tomorrow",
    verified: true,
    sessions: 834,
    location: "Delhi",
    responseTime: "< 3 hours",
    liked: false,
    type: "counsellor",
    availableSlots: ["10:00 AM", "12:00 PM", "03:00 PM", "05:00 PM"]
  }
];

// Industry Experts
const industryExperts: Mentor[] = [
  {
    id: 2,
    name: "Rajesh Kumar",
    title: "Finance Industry Expert",
    experience: "12+ years",
    rating: 4.8,
    reviews: 189,
    specializations: ["Finance", "Banking", "Investment"],
    price: "₹3,000",
    duration: "45 min",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    availability: "Available Tomorrow",
    verified: true,
    sessions: 890,
    location: "Delhi",
    responseTime: "< 1 hour",
    liked: false,
    type: "expert",
    availableSlots: ["10:00 AM", "02:00 PM", "04:00 PM", "06:00 PM"]
  },
  {
    id: 4,
    name: "Vikram Singh",
    title: "Startup Mentor",
    experience: "15+ years",
    rating: 4.7,
    reviews: 298,
    specializations: ["Entrepreneurship", "Business", "Startups"],
    price: "₹4,000",
    duration: "90 min",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    availability: "Available in 2 days",
    verified: true,
    sessions: 450,
    location: "Pune",
    responseTime: "< 3 hours",
    liked: false,
    type: "expert",
    availableSlots: ["11:00 AM", "02:00 PM", "04:00 PM", "06:00 PM"]
  },
  {
    id: 7,
    name: "Meera Shah",
    title: "Marketing Strategist",
    experience: "9+ years",
    rating: 4.8,
    reviews: 145,
    specializations: ["Digital Marketing", "Brand Strategy", "Growth"],
    price: "₹3,200",
    duration: "75 min",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
    availability: "Available Today",
    verified: true,
    sessions: 520,
    location: "Mumbai",
    responseTime: "< 1 hour",
    liked: false,
    type: "expert",
    availableSlots: ["09:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"]
  },
  {
    id: 8,
    name: "Arjun Nair",
    title: "Data Science Lead",
    experience: "6+ years",
    rating: 4.9,
    reviews: 178,
    specializations: ["Machine Learning", "AI", "Analytics"],
    price: "₹3,500",
    duration: "60 min",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face",
    availability: "Available Tomorrow",
    verified: true,
    sessions: 290,
    location: "Bangalore",
    responseTime: "< 4 hours",
    liked: false,
    type: "expert",
    availableSlots: ["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM"]
  },
  {
    id: 23,
    name: "Sanjana Gupta",
    title: "HR Industry Expert",
    experience: "11+ years",
    rating: 4.8,
    reviews: 223,
    specializations: ["Human Resources", "Talent Acquisition", "Leadership"],
    price: "₹2,900",
    duration: "50 min",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
    availability: "Available Today",
    verified: true,
    sessions: 672,
    location: "Gurgaon",
    responseTime: "< 2 hours",
    liked: false,
    type: "expert",
    availableSlots: ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM"]
  },
  {
    id: 24,
    name: "Deepak Sharma",
    title: "Product Management Expert",
    experience: "13+ years",
    rating: 4.9,
    reviews: 312,
    specializations: ["Product Management", "Strategy", "UX Design"],
    price: "₹3,800",
    duration: "80 min",
    image: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?w=300&h=300&fit=crop&crop=face",
    availability: "Available Tomorrow",
    verified: true,
    sessions: 445,
    location: "Bangalore",
    responseTime: "< 2 hours",
    liked: true,
    type: "expert",
    availableSlots: ["10:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"]
  }
];

// Life Coaches
const lifeCoaches: Mentor[] = [
  {
    id: 9,
    name: "Dr. Neha Kapoor",
    title: "Executive Life Coach",
    experience: "14+ years",
    rating: 4.9,
    reviews: 267,
    specializations: ["Leadership", "Personal Growth", "Work-Life Balance"],
    price: "₹3,500",
    duration: "60 min",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&h=300&fit=crop&crop=face",
    availability: "Available Today",
    verified: true,
    sessions: 892,
    location: "Mumbai",
    responseTime: "< 1 hour",
    liked: false,
    type: "coach",
    availableSlots: ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"]
  },
  {
    id: 10,
    name: "Ravi Krishnan",
    title: "Performance Coach",
    experience: "10+ years",
    rating: 4.8,
    reviews: 198,
    specializations: ["Goal Setting", "Productivity", "Success Mindset"],
    price: "₹3,200",
    duration: "75 min",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
    availability: "Available Tomorrow",
    verified: true,
    sessions: 634,
    location: "Bangalore",
    responseTime: "< 2 hours",
    liked: true,
    type: "coach",
    availableSlots: ["10:00 AM", "12:00 PM", "03:00 PM", "05:00 PM"]
  },
  {
    id: 11,
    name: "Priya Menon",
    title: "Wellness & Mindfulness Coach",
    experience: "8+ years",
    rating: 4.9,
    reviews: 178,
    specializations: ["Mindfulness", "Stress Management", "Wellness"],
    price: "₹2,800",
    duration: "55 min",
    image: "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?w=300&h=300&fit=crop&crop=face",
    availability: "Available Today",
    verified: true,
    sessions: 423,
    location: "Kerala",
    responseTime: "< 30 min",
    liked: false,
    type: "coach",
    availableSlots: ["09:00 AM", "11:00 AM", "01:00 PM", "04:00 PM"]
  },
  {
    id: 12,
    name: "Kartik Joshi",
    title: "Career Transition Coach",
    experience: "12+ years",
    rating: 4.8,
    reviews: 245,
    specializations: ["Career Change", "Skill Development", "Confidence Building"],
    price: "₹3,100",
    duration: "70 min",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face",
    availability: "Available Tomorrow",
    verified: true,
    sessions: 567,
    location: "Delhi",
    responseTime: "< 3 hours",
    liked: false,
    type: "coach",
    availableSlots: ["10:00 AM", "01:00 PM", "03:00 PM", "06:00 PM"]
  },
  {
    id: 25,
    name: "Shruti Agarwal",
    title: "Communication Coach",
    experience: "9+ years",
    rating: 4.8,
    reviews: 189,
    specializations: ["Public Speaking", "Communication", "Presentation Skills"],
    price: "₹2,700",
    duration: "60 min",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
    availability: "Available Today",
    verified: true,
    sessions: 378,
    location: "Chennai",
    responseTime: "< 1 hour",
    liked: false,
    type: "coach",
    availableSlots: ["09:00 AM", "11:00 AM", "02:00 PM", "05:00 PM"]
  },
  {
    id: 26,
    name: "Manish Verma",
    title: "Leadership Development Coach",
    experience: "16+ years",
    rating: 4.9,
    reviews: 334,
    specializations: ["Leadership", "Team Management", "Strategic Thinking"],
    price: "₹4,200",
    duration: "90 min",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    availability: "Available in 2 days",
    verified: true,
    sessions: 723,
    location: "Mumbai",
    responseTime: "< 4 hours",
    liked: true,
    type: "coach",
    availableSlots: ["11:00 AM", "02:00 PM", "04:00 PM", "06:00 PM"]
  }
];

const categories: Category[] = [
  { name: "Technology", count: 45, icon: <BookOpen size={24} />, color: "bg-blue-500" },
  { name: "Finance", count: 32, icon: <TrendingUp size={24} />, color: "bg-green-500" },
  { name: "Healthcare", count: 28, icon: <Award size={24} />, color: "bg-red-500" },
  { name: "Education", count: 38, icon: <Users size={24} />, color: "bg-purple-500" },
  { name: "Creative", count: 24, icon: <Video size={24} />, color: "bg-pink-500" },
  { name: "Business", count: 41, icon: <MessageCircle size={24} />, color: "bg-yellow-500" }
];

const upcomingSessions: UpcomingSession[] = [
  {
    id: 1,
    mentor: "Dr. Priya Sharma",
    topic: "Career Planning in Tech",
    date: "Today",
    time: "3:00 PM",
    duration: "60 min",
    type: "1-on-1 Session"
  },
  {
    id: 2,
    mentor: "Rajesh Kumar",
    topic: "Finance Career Workshop",
    date: "Tomorrow",
    time: "11:00 AM",
    duration: "45 min",
    type: "Group Session"
  }
];

// Slider Component
function MentorSlider({ mentors, title, likedMentors, toggleLike, icon, onBookSession }: MentorSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(mentors.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const currentMentors = mentors.slice(
    currentSlide * itemsPerSlide,
    (currentSlide + 1) * itemsPerSlide
  );

  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-[#FF6C4A]/20 rounded-lg flex items-center justify-center mr-3">
            {icon}
          </div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            disabled={totalSlides <= 1}
            className="p-2 bg-[#1E1E1E] border border-gray-700 text-white rounded-lg hover:border-[#FF6C4A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            disabled={totalSlides <= 1}
            className="p-2 bg-[#1E1E1E] border border-gray-700 text-white rounded-lg hover:border-[#FF6C4A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-[#1E1E1E] rounded-xl border border-gray-700 overflow-hidden hover:border-[#FF6C4A] transition-colors relative"
          >
            {/* Like Button */}
            <button
              onClick={() => toggleLike(mentor.id)}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              <Heart
                size={16}
                className={likedMentors.has(mentor.id) ? 'text-red-500 fill-current' : 'text-white'}
              />
            </button>

            {/* Card Header */}
            <div className="p-4">
              <div className="flex items-start mb-3">
                <div className="flex items-center w-full">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-12 h-12 rounded-full object-cover mr-3 flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center">
                      <h3 className="text-sm font-semibold text-white truncate">{mentor.name}</h3>
                      {mentor.verified && (
                        <CheckCircle className="ml-1 text-blue-400 flex-shrink-0" size={12} />
                      )}
                    </div>
                    <p className="text-xs text-gray-400 truncate">{mentor.title}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-0.5">
                      <MapPin size={10} className="mr-1" />
                      <span>{mentor.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center justify-between mb-3 text-xs">
                <div className="flex items-center">
                  <Star className="text-yellow-400 fill-current" size={12} />
                  <span className="text-white font-medium ml-1">{mentor.rating}</span>
                  <span className="text-gray-400 ml-1">({mentor.reviews})</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Eye size={10} className="mr-1" />
                  <span>{mentor.sessions}</span>
                </div>
              </div>

              {/* Response Time */}
              <div className="flex items-center mb-3">
                <Clock size={10} className="text-green-400 mr-1" />
                <span className="text-xs text-green-400">Responds {mentor.responseTime}</span>
              </div>

              {/* Specializations */}
              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {mentor.specializations.slice(0, 2).map((spec, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-[#FF6C4A]/20 text-[#FF6C4A] text-xs rounded-full text-center"
                    >
                      {spec}
                    </span>
                  ))}
                  {mentor.specializations.length > 2 && (
                    <span className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded-full">
                      +{mentor.specializations.length - 2}
                    </span>
                  )}
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center mb-3">
                <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
                  mentor.availability.includes('Today') ? 'bg-green-400' : 'bg-yellow-400'
                }`}></div>
                <span className="text-xs text-gray-300">{mentor.availability}</span>
              </div>

              {/* Price and Duration */}
              <div className="mb-3">
                <span className="text-lg font-bold text-white">{mentor.price}</span>
                <span className="text-gray-400 text-xs ml-1">/ {mentor.duration}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button 
                  onClick={() => onBookSession(mentor)}
                  className="flex-1 bg-[#FF6C4A] hover:bg-[#FF6C4A]/90 text-white py-2 px-3 rounded-lg font-medium transition-colors text-xs"
                >
                  Book Now
                </button>
                <button className="p-2 bg-[#151515] border border-gray-600 text-white rounded-lg hover:border-[#FF6C4A] transition-colors">
                  <MessageCircle size={14} />
                </button>
                <button className="p-2 bg-[#151515] border border-gray-600 text-white rounded-lg hover:border-[#FF6C4A] transition-colors">
                  <Share2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      {totalSlides > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalSlides }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentSlide === index ? 'bg-[#FF6C4A]' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface AuthenticatedDashboardProps {
  user?: User;
}

function AuthenticatedDashboard({ user }: AuthenticatedDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [likedMentors, setLikedMentors] = useState(new Set([3, 6, 10, 24, 26]));
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showCareers, setShowCareers] = useState(false);

  const toggleLike = (mentorId: number) => {
    const newLikedMentors = new Set(likedMentors);
    if (newLikedMentors.has(mentorId)) {
      newLikedMentors.delete(mentorId);
    } else {
      newLikedMentors.add(mentorId);
    }
    setLikedMentors(newLikedMentors);
  };

  const handleBookSession = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setShowBookingModal(true);
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
    setSelectedMentor(null);
  };

  const handleConfirmBooking = (mentorId: number, date: string, time: string) => {
    // Here you would typically send the booking data to your backend
    console.log('Booking confirmed:', { mentorId, date, time });
    // Show success message or redirect
    alert('Session booked successfully! You will receive a confirmation email shortly.');
  };

  return (
    <div className="min-h-screen bg-[#151515]" style={{fontFamily: 'Helvetica, Arial, sans-serif'}}>
      <div className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 font-display">
              Welcome back, {user?.user_metadata?.firstName || 'there'}! 👋
            </h1>
            <p className="text-xl text-gray-300 font-sans">
              Connect with expert mentors and accelerate your career growth
            </p>
          </div>

          {/* Quick Actions and Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Zap className="mr-2 text-[#FF6C4A]" size={20} />
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action) => (
                  <div key={action.id} className="bg-[#1E1E1E] p-4 rounded-xl border border-gray-700 hover:border-[#FF6C4A] transition-colors group cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                        {action.icon}
                      </div>
                      <ChevronRight className="text-gray-400 group-hover:text-[#FF6C4A] transition-colors" size={16} />
                    </div>
                    <h4 className="text-white font-medium mb-1">{action.title}</h4>
                    <p className="text-gray-400 text-sm mb-3">{action.description}</p>
                    <button className="text-[#FF6C4A] text-sm font-medium hover:text-[#FF6C4A]/80 transition-colors">
                      {action.action} →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Bell className="mr-2 text-[#FF6C4A]" size={20} />
                Recent Activity
              </h3>
              <div className="bg-[#1E1E1E] p-4 rounded-xl border border-gray-700">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {activity.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-300">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-[#FF6C4A] text-sm font-medium hover:text-[#FF6C4A]/80 transition-colors">
                  View All Activity →
                </button>
              </div>
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="bg-[#1E1E1E] p-6 rounded-xl border border-gray-700 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Calendar className="mr-2 text-[#FF6C4A]" size={20} />
              Upcoming Sessions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="bg-[#151515] p-4 rounded-lg border border-gray-600">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-white">{session.topic}</h4>
                    <span className="text-xs bg-[#FF6C4A] text-white px-2 py-1 rounded">
                      {session.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-1">with {session.mentor}</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#FF6C4A]">{session.date} at {session.time}</span>
                    <span className="text-gray-400">{session.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search mentors, specializations, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#1E1E1E] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#FF6C4A]"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-3 bg-[#1E1E1E] border border-gray-700 rounded-lg text-white hover:border-[#FF6C4A] transition-colors flex items-center"
              >
                <Filter className="mr-2" size={20} />
                Filters
              </button>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'All'
                    ? 'bg-[#FF6C4A] text-white'
                    : 'bg-[#1E1E1E] text-gray-300 hover:bg-[#FF6C4A]/20'
                }`}
              >
                All Experts
              </button>
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
                    selectedCategory === category.name
                      ? 'bg-[#FF6C4A] text-white'
                      : 'bg-[#1E1E1E] text-gray-300 hover:bg-[#FF6C4A]/20'
                  }`}
                >
                  <span className="mr-2">{React.cloneElement(category.icon as React.ReactElement<any>, { size: 16 })}</span>
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Career Counsellors Section */}
          <MentorSlider 
            mentors={counsellors} 
            title="Career Counsellors" 
            likedMentors={likedMentors}
            toggleLike={toggleLike}
            icon={<Users className="text-[#FF6C4A]" size={20} />}
            onBookSession={handleBookSession}
          />

          {/* Industry Experts Section */}
          <MentorSlider 
            mentors={industryExperts} 
            title="Industry Experts" 
            likedMentors={likedMentors}
            toggleLike={toggleLike}
            icon={<Briefcase className="text-[#FF6C4A]" size={20} />}
            onBookSession={handleBookSession}
          />

          {/* Life Coaches Section */}
          <MentorSlider 
            mentors={lifeCoaches} 
            title="Life Coaches & Personal Development" 
            likedMentors={likedMentors}
            toggleLike={toggleLike}
            icon={<Target className="text-[#FF6C4A]" size={20} />}
            onBookSession={handleBookSession}
          />

        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        mentor={selectedMentor}
        isOpen={showBookingModal}
        onClose={handleCloseModal}
        onConfirmBooking={handleConfirmBooking}
      />

      {/* Footer */}
      <footer className="bg-[#151515] text-white py-8 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="mb-4">
                <img
                  src="/assets/Fulllogo.png"
                  alt="Guido Logo"
                  className="h-10 w-auto"
                />
              </h3>
              <p className="text-gray-400">
                Guiding you right
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Personalized Guidance</li>
                <li>Real Mentors</li>
                <li>Workshops & Events</li>
                <li>Progress Tracking</li>
                <li>24/7 Support</li>
                <li>Affordable Plans</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <button 
                      onClick={() => setShowAboutUs(true)}
                      className="hover:text-white transition-colors text-left"
                    >
                      About Us
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setShowCareers(true)}
                      className="hover:text-white transition-colors text-left"
                    >
                      Careers
                    </button>
                  </li>
                  <li>Blog</li>
                  <li>
                    <button 
                      onClick={() => setShowContact(true)}
                      className="hover:text-white transition-colors text-left"
                    >
                      Contact
                    </button>
                  </li>
                </ul>
              </div>
              <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="https://www.linkedin.com/company/myguido" className="hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-400">
            <p>&copy; 2025 GUIDO. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modal Components - Fixed prop names */}
              {showAboutUs && (
                <AboutUsPage onBack={() => setShowAboutUs(false)} />
              )}
      
              {showContact && (
                <ContactPage 
                  onBack={() => setShowContact(false)} 
                  isModal={true} 
                />
              )}
      
              {showCareers && (
                <CareersPage 
                  onClose={() => setShowCareers(false)} 
                  onBack={() => setShowCareers(false)} 
                  isModal={true} 
                />
              )}
            </div>
    
  );
}

export default AuthenticatedDashboard;