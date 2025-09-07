"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Send, Mic, Plus, X, MessageSquare, Trash2, Settings, Sparkles, Edit, Search, Gem, Star, MoreVertical } from 'lucide-react';

// Define types for better TypeScript support
interface User {
  email?: string;
  user_metadata?: {
    firstName?: string;
    first_name?: string;
    name?: string;
    full_name?: string;
  };
}

interface AuthContext {
  user?: User | null;
}

// Mock useAuth hook - replace this with your actual auth implementation
const useAuth = (): AuthContext => {
  // This is a mock implementation - replace with your actual auth logic
  return {
    user: {
      email: "user@example.com",
      user_metadata: {
        firstName: "User"
      }
    }
  };
};

// Mock Navbar component - replace with your actual implementation
const Navbar = () => {
  return (
    <div className="h-16 bg-[#1a1a1b] border-b border-[#2f3031] flex items-center px-4">
      <span className="text-white">Navigation</span>
    </div>
  );
};

// Mock ProtectedRoute component - replace with your actual implementation
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'navi';
  timestamp: string;
}

interface ChatHistoryItem {
  id: number;
  title: string;
  timestamp: string;
  active: boolean;
  pinned: boolean;
}

// Main NAVI Chat Component
const NaviPage = () => {
  const authContext = useAuth();
  const user = authContext?.user; // Safe access to user property
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default to open on desktop
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([
    { id: 1, title: "Website First Page Review and Feedback", timestamp: "Just now", active: true, pinned: false },
    { id: 2, title: "Video Editing Plan for Space Documentary", timestamp: "2 hours ago", active: false, pinned: false },
    { id: 3, title: "रायका बाग का प्रश्न", timestamp: "Yesterday", active: false, pinned: false },
    { id: 4, title: "Asteroid's Safe Earth Flyby Analysis", timestamp: "2 days ago", active: false, pinned: false },
    { id: 5, title: "Primordial Black Hole Image Generation", timestamp: "3 days ago", active: false, pinned: false },
    { id: 6, title: "Frontend Login State Management", timestamp: "4 days ago", active: false, pinned: false },
    { id: 7, title: "LinkedIn Profile Enhancement Tips", timestamp: "1 week ago", active: false, pinned: false },
    { id: 8, title: "Career Development Strategy", timestamp: "1 week ago", active: false, pinned: false },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getGreeting = () => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Time-based greetings with variations
    const morningGreetings = [
      "Good morning",
      "Morning",
      "Rise and shine",
      "Hope you're having a good morning"
    ];
    
    const afternoonGreetings = [
      "Good afternoon",
      "Hope you're having a great afternoon",
      "Afternoon",
      "Hope your day is going well"
    ];
    
    const eveningGreetings = [
      "Good evening",
      "Evening",
      "Hope you're having a lovely evening",
      "Hope your evening is going well"
    ];
    
    const lateNightGreetings = [
      "Working late",
      "Up late tonight",
      "Burning the midnight oil",
      "Late night session"
    ];
    
    // Weekend specific greetings
    const weekendMorningGreetings = [
      "Happy weekend",
      "Hope you're enjoying your weekend morning",
      "Weekend vibes",
      "Relaxing weekend morning"
    ];
    
    const weekendAfternoonGreetings = [
      "Happy weekend",
      "Hope you're having a great weekend",
      "Weekend mode activated",
      "Enjoying the weekend"
    ];
    
    // Special day considerations
    const isWeekend = day === 0 || day === 6; // Sunday or Saturday
    const isFriday = day === 5;
    const isMonday = day === 1;
    
    // Random selection helper
    const getRandomGreeting = (greetings: string[]) => {
      return greetings[Math.floor(Math.random() * greetings.length)];
    };
    
    // Special cases for specific times and days
    if (hour >= 0 && hour < 5) {
      return getRandomGreeting(lateNightGreetings);
    } else if (hour >= 5 && hour < 12) {
      if (isWeekend) {
        return getRandomGreeting(weekendMorningGreetings);
      } else if (isMonday) {
        return Math.random() > 0.5 ? "Good morning" : "Starting the week strong";
      } else if (isFriday) {
        return Math.random() > 0.5 ? "Good morning" : "Friday morning energy";
      }
      return getRandomGreeting(morningGreetings);
    } else if (hour >= 12 && hour < 17) {
      if (isWeekend) {
        return getRandomGreeting(weekendAfternoonGreetings);
      } else if (isFriday) {
        return Math.random() > 0.5 ? "Good afternoon" : "Friday afternoon vibes";
      }
      return getRandomGreeting(afternoonGreetings);
    } else {
      if (isFriday && hour >= 17) {
        return Math.random() > 0.5 ? "Good evening" : "TGIF";
      } else if (isWeekend) {
        return Math.random() > 0.5 ? "Good evening" : "Weekend evening";
      }
      return getRandomGreeting(eveningGreetings);
    }
  };

  // Get user's proper name from user object
  const getUserName = () => {
    if (user) {
      // Try different possible name fields
      return user.user_metadata?.firstName || 
             user.user_metadata?.first_name || 
             user.user_metadata?.name || 
             user.user_metadata?.full_name || 
             user.email?.split('@')[0] || 
             'there';
    }
    return 'there';
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate API response
    setTimeout(() => {
      const naviResponse: ChatMessage = {
        id: messages.length + 2,
        text: "I understand your question. Let me help you with that! This is a demo response - in the real implementation, this would connect to your backend API for personalized career guidance.",
        sender: 'navi',
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages(prev => [...prev, naviResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleNewChat = () => {
    const newChatId = chatHistory.length + 1;
    const newChat: ChatHistoryItem = {
      id: newChatId,
      title: "New Chat",
      timestamp: "Just now",
      active: true,
      pinned: false
    };
    
    setChatHistory(prev => [
      newChat,
      ...prev.map(chat => ({ ...chat, active: false }))
    ]);
    
    // Reset chat
    setMessages([]);
  };

  const handleChatSelect = (chatId: number) => {
    setChatHistory(prev => 
      prev.map(chat => ({ 
        ...chat, 
        active: chat.id === chatId 
      }))
    );
    
    // Reset messages for demo
    setMessages([]);
  };

  const handleDeleteChat = (chatId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
  };

  const handlePinChat = (chatId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setChatHistory(prev => 
      prev.map(chat => 
        chat.id === chatId ? { ...chat, pinned: !chat.pinned } : chat
      )
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#131314] text-white">
        <Navbar />
        
        <div className="min-h-screen bg-[#131314] text-white flex relative">
          {/* Sidebar Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="fixed top-24 left-4 z-50 p-2 bg-[#1f1f20] hover:bg-[#2a2b2c] rounded-lg transition-all border border-[#2f3031] md:hidden"
          >
            <X size={20} className="text-[#e8eaed]" />
          </button>

          {/* Sidebar */}
          <div className={`fixed top-20 left-0 h-[calc(100vh-80px)] w-80 bg-[#1a1a1b] border-r border-[#2f3031] z-40 transform transition-transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:relative md:translate-x-0 md:top-0 md:h-screen md:block`}>
            
            {/* Mobile Overlay */}
            {sidebarOpen && (
              <div 
                className="fixed inset-0 bg-black/50 z-30 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
            
            {/* Sidebar Content */}
            <div className="relative h-full flex flex-col bg-[#1a1a1b] z-40">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#2f3031]">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-[#FF6C4A] rounded-full flex items-center justify-center">
                      <Sparkles size={12} className="text-white" />
                    </div>
                    <span className="text-lg font-normal text-[#e8eaed]">NAVI</span>
                  </div>
                  <div className="bg-[#2a2b2c] px-2 py-1 rounded text-xs text-[#9aa0a6]">
                    2.5 Flash ▼
                  </div>
                </div>
              </div>

              {/* New Chat Button */}
              <div className="p-4">
                <button
                  onClick={handleNewChat}
                  className="w-full flex items-center gap-3 p-3 bg-transparent border border-[#3c4043] rounded-lg hover:bg-[#2a2b2c] transition-colors text-[#e8eaed]"
                >
                  <Edit size={18} className="text-[#9aa0a6]" />
                  <span className="text-sm">New chat</span>
                </button>
              </div>

              {/* Recent Section */}
              <div className="flex-1 overflow-y-auto px-4">
                <div className="text-[#e8eaed] font-medium mb-3 text-sm">Recent</div>
                <div className="space-y-1">
                  {chatHistory.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => handleChatSelect(chat.id)}
                      className={`group relative p-3 rounded-lg cursor-pointer transition-all ${
                        chat.active 
                          ? 'bg-[#1e3a8a] text-white' 
                          : 'hover:bg-[#2a2b2c] text-[#e8eaed]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0 pr-2">
                          <p className={`text-sm truncate leading-tight ${
                            chat.active ? 'text-white' : 'text-[#e8eaed]'
                          }`}>
                            {chat.title}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => handlePinChat(chat.id, e)}
                            className="p-1 hover:bg-[#3f4041] rounded transition-all"
                            title={chat.pinned ? "Unpin" : "Pin"}
                          >
                            <Star 
                              size={12} 
                              className={`${chat.pinned ? 'text-yellow-400 fill-current' : 'text-[#9aa0a6]'}`} 
                            />
                          </button>
                          <button
                            onClick={(e) => handleDeleteChat(chat.id, e)}
                            className="p-1 hover:bg-[#3f4041] rounded transition-all"
                          >
                            <Trash2 size={12} className="text-[#9aa0a6]" />
                          </button>
                          <button className="p-1 hover:bg-[#3f4041] rounded transition-all">
                            <MoreVertical size={12} className="text-[#9aa0a6]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Settings */}
              <div className="p-4 border-t border-[#2f3031]">
                <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#2a2b2c] transition-colors w-full">
                  <Settings size={16} className="text-[#9aa0a6]" />
                  <span className="text-sm text-[#e8eaed]">Settings & help</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className={`flex-1 flex flex-col min-h-screen transition-all ${
            sidebarOpen ? 'md:ml-0' : 'ml-0'
          }`}>
            {messages.length === 0 && !isTyping ? (
              /* Welcome Screen - Gemini Style */
              <div className="flex-1 flex flex-col items-center justify-center px-4">
                <div className="w-full max-w-2xl mx-auto">
                  {/* Greeting */}
                  <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-light text-[#FF6C4A] mb-2">
                      {getGreeting()}, {getUserName()}
                    </h1>
                  </div>
                  
                  {/* Centered Input Box */}
                  <div className="w-full max-w-2xl mx-auto">
                    <div className="bg-[#1f1f20] border border-[#2f3031] rounded-full px-6 py-4 shadow-lg hover:shadow-xl transition-all">
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <input
                            ref={inputRef}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask NAVI"
                            className="w-full bg-transparent text-[#e8eaed] placeholder-[#9aa0a6] focus:outline-none text-base"
                            disabled={isTyping}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-[#2a2b2c] rounded-full transition-colors">
                            <Mic size={20} className="text-[#9aa0a6]" />
                          </button>
                          <button
                            onClick={handleSendMessage}
                            disabled={!inputText.trim() || isTyping}
                            className={`p-2 rounded-full transition-all ${
                              inputText.trim() && !isTyping
                                ? 'bg-[#661F13] hover:bg-[#7a241a] text-white'
                                : 'text-[#5f6368] cursor-not-allowed'
                            }`}
                          >
                            <Send size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tools Button */}
                    <div className="flex justify-center mt-4">
                      <button className="flex items-center gap-2 px-4 py-2 bg-[#1f1f20] border border-[#2f3031] rounded-full hover:bg-[#2a2b2c] transition-colors">
                        <Settings size={16} className="text-[#9aa0a6]" />
                        <span className="text-sm text-[#9aa0a6]">Tools</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Chat Messages */
              <>
                <div className="flex-1 overflow-y-auto">
                  <div className="max-w-4xl mx-auto px-6 py-8">
                    <div className="space-y-8">
                      {messages.map((message) => (
                        <div key={message.id}>
                          {message.sender === 'user' ? (
                            /* User Message - Right aligned with background */
                            <div className="flex justify-end mb-6">
                              <div className="flex items-end gap-3 max-w-2xl">
                                <div className="bg-[#1f1f20] border border-[#2f3031] rounded-2xl rounded-br-md px-5 py-3">
                                  <p className="text-[#e8eaed] text-base leading-relaxed">{message.text}</p>
                                </div>
                                <div className="text-xs text-[#9aa0a6] mb-1 whitespace-nowrap">You</div>
                              </div>
                            </div>
                          ) : (
                            /* NAVI Message - Left aligned with avatar */
                            <div className="flex items-start gap-4 mb-6">
                              {/* NAVI Avatar */}
                              <div className="w-8 h-8 bg-[#FF6C4A] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <Sparkles size={16} className="text-white" />
                              </div>
                              
                              {/* Message Content */}
                              <div className="flex-1 max-w-3xl">
                                <div className="text-sm font-medium text-[#e8eaed] mb-2">NAVI</div>
                                <div className="text-[#e8eaed] text-base leading-relaxed">
                                  {message.text}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {isTyping && (
                        <div className="flex items-start gap-4 mb-6">
                          <div className="w-8 h-8 bg-[#FF6C4A] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <Sparkles size={16} className="text-white" />
                          </div>
                          <div className="flex-1 max-w-3xl">
                            <div className="text-sm font-medium text-[#e8eaed] mb-2">NAVI</div>
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-[#9aa0a6] rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-[#9aa0a6] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-[#9aa0a6] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                </div>

                {/* Input Section - Fixed at bottom during conversation */}
                <div className="border-t border-[#2f3031] bg-[#131314] p-4">
                  <div className="max-w-3xl mx-auto">
                    <div className="bg-[#1f1f20] border border-[#2f3031] rounded-full px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <input
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask NAVI"
                            className="w-full bg-transparent text-[#e8eaed] placeholder-[#9aa0a6] focus:outline-none text-base"
                            disabled={isTyping}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-[#2a2b2c] rounded-full transition-colors">
                            <Mic size={20} className="text-[#9aa0a6]" />
                          </button>
                          <button
                            onClick={handleSendMessage}
                            disabled={!inputText.trim() || isTyping}
                            className={`p-2 rounded-full transition-all ${
                              inputText.trim() && !isTyping
                                ? 'bg-[#661F13] hover:bg-[#7a241a] text-white'
                                : 'text-[#5f6368] cursor-not-allowed'
                            }`}
                          >
                            <Send size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default NaviPage;