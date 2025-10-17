'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Video, 
  Clock,
  User,
  Calendar,
  Search,
  Filter,
  ChevronDown,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageCircle,
  Star,
  Download,
  Eye,
  ArrowLeft
} from 'lucide-react';

interface SessionBase {
  id: number;
  studentName: string;
  studentImage: null;
  date: string;
  time: string;
  duration: string;
  type: string;
  status: string;
  mode: string;
  fee: number;
  notes: string;
}

interface UpcomingSession extends SessionBase {
  status: 'confirmed' | 'pending';
}

interface CompletedSession extends SessionBase {
  status: 'completed';
  rating: number;
  review: string;
}

interface CancelledSession extends SessionBase {
  status: 'cancelled';
  cancelReason: string;
  cancelledBy: string;
}

type Session = UpcomingSession | CompletedSession | CancelledSession;

interface SessionData {
  upcoming: UpcomingSession[];
  completed: CompletedSession[];
  cancelled: CancelledSession[];
}

type TabType = 'upcoming' | 'completed' | 'cancelled';

export default function SessionsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  const sessions: SessionData = {
    upcoming: [
      {
        id: 1,
        studentName: 'Rahul Kumar',
        studentImage: null,
        date: '2025-10-16',
        time: '10:00 AM',
        duration: '1 hour',
        type: 'Counselling',
        status: 'confirmed',
        mode: 'video',
        fee: 2500,
        notes: 'First session - Career guidance for engineering'
      },
      {
        id: 2,
        studentName: 'Priya Sharma',
        studentImage: null,
        date: '2025-10-16',
        time: '2:00 PM',
        duration: '45 mins',
        type: 'Expert Session',
        status: 'confirmed',
        mode: 'video',
        fee: 2000,
        notes: 'Discuss MBA preparation strategy'
      },
      {
        id: 3,
        studentName: 'Amit Patel',
        studentImage: null,
        date: '2025-10-17',
        time: '11:00 AM',
        duration: '1 hour',
        type: 'Counselling',
        status: 'pending',
        mode: 'video',
        fee: 2500,
        notes: 'Career switch consultation'
      },
      {
        id: 4,
        studentName: 'Sneha Gupta',
        studentImage: null,
        date: '2025-10-17',
        time: '3:00 PM',
        duration: '1 hour',
        type: 'Career Guidance',
        status: 'confirmed',
        mode: 'video',
        fee: 2500,
        notes: 'College selection guidance'
      }
    ],
    completed: [
      {
        id: 5,
        studentName: 'Vikram Singh',
        studentImage: null,
        date: '2025-10-14',
        time: '10:00 AM',
        duration: '1 hour',
        type: 'Counselling',
        status: 'completed',
        mode: 'video',
        fee: 2500,
        rating: 5,
        review: 'Excellent session! Very helpful guidance.',
        notes: 'Career transition advice provided'
      },
      {
        id: 6,
        studentName: 'Anjali Reddy',
        studentImage: null,
        date: '2025-10-13',
        time: '2:30 PM',
        duration: '45 mins',
        type: 'Expert Session',
        status: 'completed',
        mode: 'video',
        fee: 2000,
        rating: 5,
        review: 'Great insights on MBA programs!',
        notes: 'MBA college list shared'
      },
      {
        id: 7,
        studentName: 'Karan Mehta',
        studentImage: null,
        date: '2025-10-12',
        time: '11:00 AM',
        duration: '1 hour',
        type: 'Counselling',
        status: 'completed',
        mode: 'video',
        fee: 2500,
        rating: 4,
        review: 'Very informative session.',
        notes: 'Engineering branch selection discussed'
      }
    ],
    cancelled: [
      {
        id: 8,
        studentName: 'Neha Kapoor',
        studentImage: null,
        date: '2025-10-11',
        time: '4:00 PM',
        duration: '1 hour',
        type: 'Counselling',
        status: 'cancelled',
        mode: 'video',
        fee: 2500,
        cancelReason: 'Student requested reschedule',
        cancelledBy: 'student',
        notes: ''
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/20 text-green-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'completed':
        return 'bg-blue-500/20 text-blue-400';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={14} />;
      case 'pending':
        return <AlertCircle size={14} />;
      case 'completed':
        return <CheckCircle size={14} />;
      case 'cancelled':
        return <XCircle size={14} />;
      default:
        return null;
    }
  };

  const filteredSessions = sessions[activeTab].filter(session =>
    session.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
              <Video className="mr-3 text-[#FF6C4A]" size={36} />
              Sessions
            </h1>
            <p className="text-gray-400">Manage and track your consultation sessions</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="text-orange-500" size={24} />
                <span className="text-2xl font-bold text-white">{sessions.upcoming.length}</span>
              </div>
              <p className="text-sm text-gray-400">Upcoming</p>
            </div>
            <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="text-green-500" size={24} />
                <span className="text-2xl font-bold text-white">{sessions.completed.length}</span>
              </div>
              <p className="text-sm text-gray-400">Completed</p>
            </div>
            <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <XCircle className="text-red-500" size={24} />
                <span className="text-2xl font-bold text-white">{sessions.cancelled.length}</span>
              </div>
              <p className="text-sm text-gray-400">Cancelled</p>
            </div>
            <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <Star className="text-yellow-500" size={24} />
                <span className="text-2xl font-bold text-white">4.8</span>
              </div>
              <p className="text-sm text-gray-400">Avg Rating</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by student name or session type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#1E1E1E] border border-gray-700 rounded-lg text-white focus:border-[#FF6C4A] focus:outline-none"
              />
            </div>
            <button className="px-6 py-3 bg-[#1E1E1E] border border-gray-700 hover:border-[#FF6C4A] text-gray-300 hover:text-white rounded-lg transition-colors flex items-center gap-2">
              <Filter size={20} />
              Filter
              <ChevronDown size={16} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-700">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === 'upcoming'
                  ? 'text-[#FF6C4A] border-b-2 border-[#FF6C4A]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Upcoming ({sessions.upcoming.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === 'completed'
                  ? 'text-[#FF6C4A] border-b-2 border-[#FF6C4A]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Completed ({sessions.completed.length})
            </button>
            <button
              onClick={() => setActiveTab('cancelled')}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === 'cancelled'
                  ? 'text-[#FF6C4A] border-b-2 border-[#FF6C4A]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Cancelled ({sessions.cancelled.length})
            </button>
          </div>

          {/* Sessions List */}
          <div className="space-y-4">
            {filteredSessions.length > 0 ? (
              filteredSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-[#1E1E1E] rounded-xl border border-gray-700 hover:border-[#FF6C4A] transition-all p-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left Side - Student Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="text-white" size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-white">{session.studentName}</h3>
                          <span className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${getStatusColor(session.status)}`}>
                            {getStatusIcon(session.status)}
                            {session.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {session.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {session.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Video size={14} />
                            {session.duration}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                            {session.type}
                          </span>
                          <span className="text-xs text-gray-400">₹{session.fee}</span>
                        </div>
                        {session.notes && (
                          <p className="text-sm text-gray-400 mt-2 italic">Note: {session.notes}</p>
                        )}
                        {'rating' in session && session.rating && (
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1">
                              {[...Array(session.rating)].map((_, i) => (
                                <Star key={i} className="text-yellow-400 fill-current" size={14} />
                              ))}
                            </div>
                            {session.review && (
                              <p className="text-sm text-gray-400 italic">&quot;{session.review}&quot;</p>
                            )}
                          </div>
                        )}
                        {'cancelReason' in session && session.cancelReason && (
                          <p className="text-sm text-red-400 mt-2">Reason: {session.cancelReason}</p>
                        )}
                      </div>
                    </div>

                    {/* Right Side - Actions */}
                    <div className="flex flex-wrap gap-2">
                      {activeTab === 'upcoming' && (
                        <>
                          {session.status === 'confirmed' && (
                            <button className="px-4 py-2 bg-[#FF6C4A] hover:bg-[#FF6C4A]/90 text-white rounded-lg transition-colors flex items-center gap-2">
                              <Video size={16} />
                              Join Session
                            </button>
                          )}
                          <button className="px-4 py-2 bg-[#151515] border border-gray-700 hover:border-[#FF6C4A] text-gray-300 hover:text-white rounded-lg transition-colors flex items-center gap-2">
                            <MessageCircle size={16} />
                            Message
                          </button>
                          <button className="px-4 py-2 bg-[#151515] border border-gray-700 hover:border-[#FF6C4A] text-gray-300 hover:text-white rounded-lg transition-colors flex items-center gap-2">
                            <Eye size={16} />
                            Details
                          </button>
                        </>
                      )}
                      {activeTab === 'completed' && (
                        <>
                          <button className="px-4 py-2 bg-[#151515] border border-gray-700 hover:border-[#FF6C4A] text-gray-300 hover:text-white rounded-lg transition-colors flex items-center gap-2">
                            <Download size={16} />
                            Report
                          </button>
                          <button className="px-4 py-2 bg-[#151515] border border-gray-700 hover:border-[#FF6C4A] text-gray-300 hover:text-white rounded-lg transition-colors flex items-center gap-2">
                            <Eye size={16} />
                            Details
                          </button>
                        </>
                      )}
                      {activeTab === 'cancelled' && (
                        <button className="px-4 py-2 bg-[#151515] border border-gray-700 hover:border-[#FF6C4A] text-gray-300 hover:text-white rounded-lg transition-colors flex items-center gap-2">
                          <Eye size={16} />
                          Details
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-[#1E1E1E] rounded-xl border border-gray-700">
                <Video className="mx-auto text-gray-600 mb-3" size={48} />
                <p className="text-gray-400">No sessions found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}