'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BarChart3, 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Clock,
  Star,
  Calendar,
  Download,
  Eye,
  Target,
  Award,
  ChevronDown,
  ArrowLeft
} from 'lucide-react';

export default function AnalyticsPage() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  // Sample data
  const overviewStats = {
    totalRevenue: 94500,
    revenueChange: 12.5,
    totalSessions: 45,
    sessionsChange: 8.3,
    avgRating: 4.8,
    ratingChange: 0.2,
    responseTime: 2.5,
    timeChange: -15.2
  };

  const monthlyRevenue = [
    { month: 'Jan', revenue: 65000 },
    { month: 'Feb', revenue: 72000 },
    { month: 'Mar', revenue: 68000 },
    { month: 'Apr', revenue: 78000 },
    { month: 'May', revenue: 85000 },
    { month: 'Jun', revenue: 82000 },
    { month: 'Jul', revenue: 88000 },
    { month: 'Aug', revenue: 92000 },
    { month: 'Sep', revenue: 89000 },
    { month: 'Oct', revenue: 94500 }
  ];

  const sessionsByType = [
    { type: 'Counselling', count: 24, percentage: 53 },
    { type: 'Expert Session', count: 12, percentage: 27 },
    { type: 'Career Guidance', count: 6, percentage: 13 },
    { type: 'Alumni Session', count: 3, percentage: 7 }
  ];

  const topStudents = [
    { name: 'Rahul Kumar', sessions: 5, revenue: 12500, rating: 5.0 },
    { name: 'Priya Sharma', sessions: 4, revenue: 10000, rating: 4.9 },
    { name: 'Amit Patel', sessions: 3, revenue: 7500, rating: 4.8 },
    { name: 'Sneha Gupta', sessions: 3, revenue: 7500, rating: 4.7 }
  ];

  const recentReviews = [
    { student: 'Vikram Singh', rating: 5, comment: 'Excellent guidance! Very professional.', date: '2 days ago' },
    { student: 'Anjali Reddy', rating: 5, comment: 'Great insights on MBA programs!', date: '3 days ago' },
    { student: 'Karan Mehta', rating: 4, comment: 'Very informative session.', date: '5 days ago' }
  ];

  const getMaxRevenue = () => Math.max(...monthlyRevenue.map(m => m.revenue));

  return (
    <div className="min-h-screen bg-[#151515]">
      <div className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Button */}
          <button
            onClick={() => router.push('/professional/dashboard')}
            className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Dashboard</span>
          </button>

          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
                  <BarChart3 className="mr-3 text-[#FF6C4A]" size={36} />
                  Analytics
                </h1>
                <p className="text-gray-400">Track your performance and insights</p>
              </div>
              <div className="flex gap-2">
                <div className="flex gap-2 bg-[#1E1E1E] p-1 rounded-lg border border-gray-700">
                  <button
                    onClick={() => setTimeRange('week')}
                    className={`px-4 py-2 rounded-md text-sm transition-colors ${
                      timeRange === 'week' ? 'bg-[#FF6C4A] text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setTimeRange('month')}
                    className={`px-4 py-2 rounded-md text-sm transition-colors ${
                      timeRange === 'month' ? 'bg-[#FF6C4A] text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => setTimeRange('year')}
                    className={`px-4 py-2 rounded-md text-sm transition-colors ${
                      timeRange === 'year' ? 'bg-[#FF6C4A] text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Year
                  </button>
                </div>
                <button className="px-4 py-2 bg-[#FF6C4A] hover:bg-[#FF6C4A]/90 text-white rounded-lg transition-colors flex items-center gap-2">
                  <Download size={18} />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Revenue */}
            <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="text-green-500" size={24} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${overviewStats.revenueChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {overviewStats.revenueChange > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {Math.abs(overviewStats.revenueChange)}%
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-white">₹{overviewStats.totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-2">vs last month</p>
            </div>

            {/* Total Sessions */}
            <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Users className="text-blue-500" size={24} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${overviewStats.sessionsChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {overviewStats.sessionsChange > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {Math.abs(overviewStats.sessionsChange)}%
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-1">Total Sessions</p>
              <p className="text-3xl font-bold text-white">{overviewStats.totalSessions}</p>
              <p className="text-xs text-gray-500 mt-2">vs last month</p>
            </div>

            {/* Average Rating */}
            <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Star className="text-yellow-500" size={24} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${overviewStats.ratingChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {overviewStats.ratingChange > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {Math.abs(overviewStats.ratingChange)}
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-1">Average Rating</p>
              <p className="text-3xl font-bold text-white">{overviewStats.avgRating}</p>
              <p className="text-xs text-gray-500 mt-2">vs last month</p>
            </div>

            {/* Response Time */}
            <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="text-purple-500" size={24} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${overviewStats.timeChange < 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {overviewStats.timeChange < 0 ? <TrendingDown size={16} /> : <TrendingUp size={16} />}
                  {Math.abs(overviewStats.timeChange)}%
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-1">Response Time</p>
              <p className="text-3xl font-bold text-white">{overviewStats.responseTime}h</p>
              <p className="text-xs text-gray-500 mt-2">vs last month</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Revenue Chart */}
            <div className="lg:col-span-2 bg-[#1E1E1E] rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Revenue Overview</h3>
                <button className="text-sm text-gray-400 hover:text-white flex items-center gap-1">
                  View Details
                  <ChevronDown size={16} />
                </button>
              </div>
              
              {/* Custom Bar Chart */}
              <div className="space-y-3">
                {monthlyRevenue.map((data, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-sm text-gray-400 w-8">{data.month}</span>
                    <div className="flex-1 h-8 bg-[#151515] rounded-lg overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#FF6C4A] to-[#dc2626] rounded-lg transition-all duration-500 flex items-center justify-end pr-3"
                        style={{ width: `${(data.revenue / getMaxRevenue()) * 100}%` }}
                      >
                        <span className="text-xs text-white font-medium">
                          ₹{(data.revenue / 1000).toFixed(0)}k
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sessions by Type */}
            <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Sessions by Type</h3>
              <div className="space-y-4">
                {sessionsByType.map((session, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-300">{session.type}</span>
                      <span className="text-sm font-medium text-white">{session.count}</span>
                    </div>
                    <div className="w-full bg-[#151515] rounded-full h-2">
                      <div
                        className="bg-[#FF6C4A] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${session.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Top Students */}
            <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Award className="mr-2 text-[#FF6C4A]" size={20} />
                Top Students
              </h3>
              <div className="space-y-4">
                {topStudents.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-[#151515] rounded-lg border border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-white">{student.name}</p>
                        <p className="text-sm text-gray-400">{student.sessions} sessions</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white">₹{student.revenue.toLocaleString()}</p>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Star className="text-yellow-400 fill-current" size={12} />
                        {student.rating}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Star className="mr-2 text-[#FF6C4A]" size={20} />
                Recent Reviews
              </h3>
              <div className="space-y-4">
                {recentReviews.map((review, index) => (
                  <div key={index} className="p-4 bg-[#151515] rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-white">{review.student}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="text-yellow-400 fill-current" size={14} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-2 italic">"{review.comment}"</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}