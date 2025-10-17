'use client';

import React, { useEffect, useState } from 'react';
import { authHelpers } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Star, 
  Clock,
  Video,
  CheckCircle,
  AlertCircle,
  Edit,
  BarChart3,
  Zap,
  ChevronRight,
  User,
  Award,
  Target,
  Bell,
  Calendar,
  MessageCircle
} from 'lucide-react';

interface ProfessionalProfile {
  first_name?: string;
  last_name?: string;
  bio?: string;
  qualifications?: string;
  experience_years?: number;
  consultation_fee?: number;
  rating?: number;
  total_reviews?: number;
  is_verified?: boolean;
}

interface Session {
  id: number;
  studentName: string;
  date: string;
  time: string;
  type: string;
  status: string;
}

interface Activity {
  id: number;
  type: string;
  message: string;
  time: string;
  icon: React.ReactNode;
}

interface QuickAction {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  action: () => void;
}

export default function ProfessionalDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string>('');
  const [profile, setProfile] = useState<ProfessionalProfile | null>(null);

  // Stats state
  const [stats] = useState({
    totalSessions: 45,
    upcomingSessions: 8,
    completedThisMonth: 12,
    totalEarnings: 94500,
  });

  // Sample upcoming sessions
  const [upcomingSessions] = useState<Session[]>([
    {
      id: 1,
      studentName: 'Rahul Kumar',
      date: '2025-10-15',
      time: '10:00 AM',
      type: 'Counselling',
      status: 'confirmed'
    },
    {
      id: 2,
      studentName: 'Priya Sharma',
      date: '2025-10-15',
      time: '2:00 PM',
      type: 'Expert Session',
      status: 'confirmed'
    },
    {
      id: 3,
      studentName: 'Amit Patel',
      date: '2025-10-16',
      time: '11:00 AM',
      type: 'Counselling',
      status: 'pending'
    }
  ]);

  // Quick actions with proper redirections
  const quickActions: QuickAction[] = [
    {
      id: 1,
      title: "Edit Profile",
      description: "Update your professional information",
      icon: <Edit className="text-[#FF6C4A]" size={20} />,
      color: "bg-[#FF6C4A]/20",
      action: () => router.push('/professional/profile')
    },
    {
      id: 2,
      title: "View Schedule",
      description: "Manage your appointments",
      icon: <Calendar className="text-blue-500" size={20} />,
      color: "bg-blue-500/20",
      action: () => router.push('/professional/calendar')
    },
    {
      id: 3,
      title: "Messages",
      description: "Connect with students",
      icon: <MessageCircle className="text-green-500" size={20} />,
      color: "bg-green-500/20",
      action: () => router.push('/professional/sessions')
    },
    {
      id: 4,
      title: "Analytics",
      description: "Track your performance",
      icon: <BarChart3 className="text-purple-500" size={20} />,
      color: "bg-purple-500/20",
      action: () => router.push('/professional/analytics')
    }
  ];

  // Recent activities
  const recentActivities: Activity[] = [
    {
      id: 1,
      type: "session",
      message: "Completed session with Rahul Kumar",
      time: "2 hours ago",
      icon: <CheckCircle className="text-green-500" size={16} />
    },
    {
      id: 2,
      type: "review",
      message: "New 5-star review from Priya Sharma",
      time: "5 hours ago",
      icon: <Star className="text-yellow-500" size={16} />
    },
    {
      id: 3,
      type: "booking",
      message: "New booking request from Amit Patel",
      time: "1 day ago",
      icon: <Calendar className="text-blue-500" size={16} />
    },
    {
      id: 4,
      type: "payment",
      message: "Payment received: ₹2,500",
      time: "2 days ago",
      icon: <DollarSign className="text-green-500" size={16} />
    }
  ];

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Get current user
      const { user: currentUser, error: userError } = await authHelpers.getCurrentUser();
      
      if (userError || !currentUser) {
        router.push('/');
        return;
      }

      setUser(currentUser);

      // Get user role
      const { role, error: roleError } = await authHelpers.getUserRole(currentUser.id);
      
      if (roleError || !role) {
        router.push('/');
        return;
      }

      setUserRole(role);

      // Check if professional
      if (!['counsellor', 'expert', 'alumni'].includes(role)) {
        router.push('/AuthenticatedDashboard');
        return;
      }

      // Get profile data
      const { profile: userProfile, error: profileError } = await authHelpers.getUserProfile(currentUser.id);
      
      if (!profileError && userProfile) {
        const rawProfile = userProfile as unknown as Record<string, any>;
        setProfile({
          first_name: rawProfile['first_name'] || currentUser.user_metadata?.first_name || '',
          last_name: rawProfile['last_name'] || currentUser.user_metadata?.last_name || '',
          bio: rawProfile['bio'] || '',
          qualifications: rawProfile['qualifications'] || '',
          experience_years: rawProfile['experience_years'] || 0,
          consultation_fee: rawProfile['consultation_fee'] || 0,
          rating: rawProfile['rating'] || 5.0,
          total_reviews: rawProfile['total_reviews'] || 0,
          is_verified: rawProfile['is_verified'] || false,
        });
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFullName = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    if (user?.user_metadata?.first_name && user?.user_metadata?.last_name) {
      return `${user.user_metadata.first_name} ${user.user_metadata.last_name}`;
    }
    return user?.email?.split('@')[0] || 'Professional';
  };

  const getRoleTitle = () => {
    const titles: { [key: string]: string } = {
      counsellor: 'Career Counsellor',
      expert: 'Industry Expert',
      alumni: 'Alumni Mentor'
    };
    return titles[userRole] || 'Professional';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#151515]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6C4A] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#151515]">
      {/* Main Content - Layout handles navbar and padding */}
      <div className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Welcome back, {getFullName()}! 👋
                </h1>
                <div className="flex items-center space-x-3">
                  <p className="text-xl text-gray-300">{getRoleTitle()}</p>
                  {profile?.is_verified && (
                    <span className="flex items-center px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full">
                      <CheckCircle size={14} className="mr-1" />
                      Verified
                    </span>
                  )}
                </div>
              </div>
              <div className="hidden md:block">
                <div className="bg-gradient-to-br from-[#FF6C4A] to-[#dc2626] p-1 rounded-2xl">
                  <div className="bg-[#1E1E1E] px-6 py-4 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Star className="text-yellow-400 fill-current" size={20} />
                        <span className="text-2xl font-bold text-white ml-2">
                          {profile?.rating?.toFixed(1) || '5.0'}
                        </span>
                      </div>
                      <div className="h-8 w-px bg-gray-700"></div>
                      <div>
                        <p className="text-sm text-gray-400">Rating</p>
                        <p className="text-sm text-gray-300">{profile?.total_reviews || 0} reviews</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Sessions */}
            <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6 hover:border-[#FF6C4A] transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Users className="text-blue-500" size={24} />
                </div>
                <TrendingUp className="text-green-500" size={16} />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Sessions</p>
                <p className="text-3xl font-bold text-white">{stats.totalSessions}</p>
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6 hover:border-[#FF6C4A] transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="text-orange-500" size={24} />
                </div>
                <AlertCircle className="text-orange-500" size={16} />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Upcoming</p>
                <p className="text-3xl font-bold text-white">{stats.upcomingSessions}</p>
              </div>
            </div>

            {/* This Month */}
            <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6 hover:border-[#FF6C4A] transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="text-green-500" size={24} />
                </div>
                <Target className="text-green-500" size={16} />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">This Month</p>
                <p className="text-3xl font-bold text-white">{stats.completedThisMonth}</p>
              </div>
            </div>

            {/* Total Earnings */}
            <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6 hover:border-[#FF6C4A] transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="text-purple-500" size={24} />
                </div>
                <TrendingUp className="text-green-500" size={16} />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Earnings</p>
                <p className="text-3xl font-bold text-white">₹{stats.totalEarnings.toLocaleString()}</p>
              </div>
            </div>
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
                  <button
                    key={action.id}
                    onClick={action.action}
                    className="bg-[#1E1E1E] p-5 rounded-xl border border-gray-700 hover:border-[#FF6C4A] transition-colors group text-left"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                        {action.icon}
                      </div>
                      <ChevronRight className="text-gray-400 group-hover:text-[#FF6C4A] transition-colors" size={18} />
                    </div>
                    <h4 className="text-white font-medium mb-1">{action.title}</h4>
                    <p className="text-gray-400 text-sm">{action.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Bell className="mr-2 text-[#FF6C4A]" size={20} />
                Recent Activity
              </h3>
              <div className="bg-[#1E1E1E] p-5 rounded-xl border border-gray-700">
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
          <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white flex items-center">
                <Calendar className="mr-2 text-[#FF6C4A]" size={20} />
                Upcoming Sessions
              </h3>
              <button className="text-[#FF6C4A] text-sm font-medium hover:text-[#FF6C4A]/80 transition-colors">
                View All →
              </button>
            </div>
            
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div 
                  key={session.id} 
                  className="flex items-center justify-between p-4 bg-[#151515] rounded-xl border border-gray-700 hover:border-[#FF6C4A] transition-all group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-[#FF6C4A] transition-colors">
                        {session.studentName}
                      </h4>
                      <p className="text-sm text-gray-400 mt-0.5">
                        {session.date} at {session.time}
                      </p>
                      <div className="flex items-center mt-1 space-x-2">
                        <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">
                          {session.type}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          session.status === 'confirmed' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {session.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-[#FF6C4A] hover:bg-[#FF6C4A]/90 text-white rounded-lg transition-colors flex items-center space-x-2">
                      <Video size={16} />
                      <span>Join</span>
                    </button>
                    <button className="px-4 py-2 bg-[#151515] border border-gray-600 hover:border-[#FF6C4A] text-gray-300 hover:text-white rounded-lg transition-colors">
                      Reschedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Completion */}
          {(!profile?.bio || !profile?.qualifications) && (
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-6 mb-8">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="text-orange-500" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Complete Your Profile</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Add your bio and qualifications to attract more students and increase bookings.
                    </p>
                    <button 
                      onClick={() => router.push('/professional/profile')}
                      className="px-4 py-2 bg-[#FF6C4A] hover:bg-[#FF6C4A]/90 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      Complete Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Performance Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Session Stats */}
            <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-semibold">Session Stats</h4>
                <BarChart3 className="text-[#FF6C4A]" size={20} />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Completion Rate</span>
                  <span className="text-sm font-medium text-white">96%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-semibold">Avg Response Time</h4>
                <Clock className="text-blue-500" size={20} />
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white mb-1">2.5</p>
                <p className="text-sm text-gray-400">hours</p>
              </div>
            </div>

            {/* Student Satisfaction */}
            <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-semibold">Satisfaction</h4>
                <Award className="text-yellow-500" size={20} />
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={16} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-400">Excellent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                  <button className="hover:text-white transition-colors text-left">
                    About Us
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors text-left">
                    Careers
                  </button>
                </li>
                <li>Blog</li>
                <li>
                  <button className="hover:text-white transition-colors text-left">
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
                  <a href="https://www.instagram.com/myguido.in?igsh=M3huZjE5eDY3OGdz&utm_source=qr" className="hover:text-white transition-colors">
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
    </div>
  );
}