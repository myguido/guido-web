'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  User,
  Video,
  Filter,
  Plus,
  MapPin,
  ArrowLeft
} from 'lucide-react';

export default function CalendarPage() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 16)); // October 16, 2025
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 9, 16));
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

  // Sample sessions data
  const sessions = [
    {
      id: 1,
      date: '2025-10-15',
      time: '10:00 AM',
      duration: '1 hour',
      studentName: 'Rahul Kumar',
      type: 'Counselling',
      status: 'confirmed',
      mode: 'video'
    },
    {
      id: 2,
      date: '2025-10-15',
      time: '2:00 PM',
      duration: '45 mins',
      studentName: 'Priya Sharma',
      type: 'Expert Session',
      status: 'confirmed',
      mode: 'video'
    },
    {
      id: 3,
      date: '2025-10-16',
      time: '11:00 AM',
      duration: '1 hour',
      studentName: 'Amit Patel',
      type: 'Counselling',
      status: 'pending',
      mode: 'video'
    },
    {
      id: 4,
      date: '2025-10-17',
      time: '3:00 PM',
      duration: '1 hour',
      studentName: 'Sneha Gupta',
      type: 'Career Guidance',
      status: 'confirmed',
      mode: 'video'
    },
    {
      id: 5,
      date: '2025-10-18',
      time: '10:30 AM',
      duration: '1 hour',
      studentName: 'Vikram Singh',
      type: 'Alumni Session',
      status: 'confirmed',
      mode: 'video'
    }
  ];

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const hasSessionOnDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return sessions.some(session => session.date === dateStr);
  };

  const getSessionsForDate = (date: Date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return sessions.filter(session => session.date === dateStr);
  };

  const renderCalendar = () => {
    const days = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);
    const calendarDays = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className="aspect-square p-2"></div>
      );
    }

    // Actual days
    for (let day = 1; day <= days; day++) {
      const isToday = day === 16 && currentDate.getMonth() === 9;
      const isSelected = day === selectedDate.getDate() && 
                        currentDate.getMonth() === selectedDate.getMonth();
      const hasSessions = hasSessionOnDate(day);

      calendarDays.push(
        <button
          key={day}
          onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
          className={`aspect-square p-2 rounded-lg border transition-all relative
            ${isSelected ? 'bg-[#FF6C4A] border-[#FF6C4A] text-white' : 
              isToday ? 'border-[#FF6C4A] text-white' : 
              'border-gray-700 text-gray-300 hover:border-gray-600'}
          `}
        >
          <span className="text-sm font-medium">{day}</span>
          {hasSessions && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
              <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
            </div>
          )}
        </button>
      );
    }

    return calendarDays;
  };

  const selectedDateSessions = getSessionsForDate(selectedDate);

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
              <Calendar className="mr-3 text-[#FF6C4A]" size={36} />
              Calendar
            </h1>
            <p className="text-gray-400">Manage your appointments and schedule</p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-[#FF6C4A] hover:bg-[#FF6C4A]/90 text-white rounded-lg transition-colors flex items-center gap-2">
                <Plus size={18} />
                Add Availability
              </button>
              <button className="px-4 py-2 bg-[#1E1E1E] border border-gray-700 hover:border-[#FF6C4A] text-gray-300 hover:text-white rounded-lg transition-colors flex items-center gap-2">
                <Filter size={18} />
                Filter
              </button>
            </div>
            <div className="flex gap-2 bg-[#1E1E1E] p-1 rounded-lg border border-gray-700">
              <button
                onClick={() => setViewMode('month')}
                className={`px-4 py-1.5 rounded-md text-sm transition-colors ${
                  viewMode === 'month' ? 'bg-[#FF6C4A] text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-4 py-1.5 rounded-md text-sm transition-colors ${
                  viewMode === 'week' ? 'bg-[#FF6C4A] text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setViewMode('day')}
                className={`px-4 py-1.5 rounded-md text-sm transition-colors ${
                  viewMode === 'day' ? 'bg-[#FF6C4A] text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Day
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Calendar */}
            <div className="lg:col-span-2">
              <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6">
                
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={goToPreviousMonth}
                      className="p-2 bg-[#151515] border border-gray-700 hover:border-[#FF6C4A] rounded-lg transition-colors"
                    >
                      <ChevronLeft className="text-gray-300" size={20} />
                    </button>
                    <button
                      onClick={goToNextMonth}
                      className="p-2 bg-[#151515] border border-gray-700 hover:border-[#FF6C4A] rounded-lg transition-colors"
                    >
                      <ChevronRight className="text-gray-300" size={20} />
                    </button>
                  </div>
                </div>

                {/* Day Names */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-400 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {renderCalendar()}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-[#FF6C4A] rounded"></div>
                    <span className="text-sm text-gray-400">Today</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">Has Sessions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sessions for Selected Date */}
            <div className="lg:col-span-1">
              <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6 sticky top-24">
                <h3 className="text-xl font-bold text-white mb-4">
                  {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </h3>
                
                {selectedDateSessions.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDateSessions.map((session) => (
                      <div 
                        key={session.id}
                        className="bg-[#151515] p-4 rounded-lg border border-gray-700 hover:border-[#FF6C4A] transition-all"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Clock className="text-[#FF6C4A]" size={16} />
                            <span className="text-white font-medium text-sm">{session.time}</span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded ${
                            session.status === 'confirmed' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {session.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <User className="text-gray-400" size={14} />
                          <span className="text-gray-300 text-sm">{session.studentName}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                            {session.type}
                          </span>
                          <button className="text-[#FF6C4A] hover:text-[#FF6C4A]/80 text-xs font-medium">
                            View Details →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="mx-auto text-gray-600 mb-3" size={48} />
                    <p className="text-gray-400">No sessions scheduled</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}