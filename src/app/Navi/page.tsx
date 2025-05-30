"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Send, Mic, Paperclip, Bot, User, Plus, MessageSquare, Trash2, Menu, X, Home, Navigation, Users, Briefcase } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Navbar Component
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const pathname = usePathname();

  // Memoize navigation items with icons for bottom nav
  const navItems = useMemo(() => [
    { label: "Home", href: "/", icon: Home },
    { label: "Navi", href: "/Navi", icon: Navigation },
    { label: "Counsellors", href: "/counsellors", icon: Users },
    { label: "Industry Experts", href: "/industry-experts", icon: Briefcase }
  ], []);

  // Memoize active route check to prevent recalculating on every render
  const isActiveRoute = useMemo(() => (href) => {
    return pathname === href;
  }, [pathname]);

  return (
    <>
      {/* Desktop Navigation - Fixed and Sticky */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 bg-[#151515] shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/assets/Fulllogo.png"
                  alt="Guido Logo"
                  width={180}
                  height={50}
                  priority
                  className="cursor-pointer"
                />
              </Link>
            </div>

            {/* Desktop Navigation with Pill Styling */}
            <div className="flex items-center">
              <div className="flex bg-[#1F1F1F] border border-gray-600 rounded-lg px-2 py-1 space-x-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-1 text-sm font-medium rounded-full transition-all ${
                      isActiveRoute(item.href)
                        ? "bg-[#FF6C4A] rounded-lg text-white" 
                        : "text-white hover:bg-gray-700 rounded-lg"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Login Button */}
            <div>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-[#FF6C4A] hover:opacity-90 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar with Logo */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#151515] shadow-md z-50">
        <div className="flex justify-between items-center h-16 px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/Fulllogo.png"
              alt="Guido Logo"
              width={140}
              height={40}
              priority
              className="cursor-pointer"
            />
          </Link>
          
          {/* Login Button */}
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="bg-[#FF6C4A] hover:opacity-90 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
          >
            <User size={16} className="inline mr-1" />
            Login
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#151515] border-t border-gray-700 z-50">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = isActiveRoute(item.href);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-[#FF6C4A] text-white" 
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                <IconComponent size={20} className="mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Login</h2>
              <button 
                onClick={() => setIsLoginModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  placeholder="Enter your email"
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #FF6C4A'}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  placeholder="Enter your password"
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #FF6C4A'}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 focus:ring-2"
                    style={{ accentColor: '#FF6C4A' }}
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a 
                  href="#" 
                  className="text-sm hover:opacity-80"
                  style={{ color: '#FF6C4A' }}
                >
                  Forgot password?
                </a>
              </div>
              
              <button 
                style={{ backgroundColor: '#FF6C4A' }}
                className="w-full hover:opacity-90 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
              >
                Sign In
              </button>
              
              <div className="text-center">
                <span className="text-sm text-gray-600">Don't have an account? </span>
                <a 
                  href="#" 
                  className="text-sm font-medium hover:opacity-80"
                  style={{ color: '#FF6C4A' }}
                >
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Main NAVI Chat Component
const NaviPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: "Career Assessment Discussion", timestamp: "2 hours ago", active: true },
    { id: 2, title: "Skill Gap Analysis", timestamp: "Yesterday" },
    { id: 3, title: "Industry Trends Overview", timestamp: "3 days ago" },
    { id: 4, title: "Salary Negotiation Tips", timestamp: "1 week ago" },
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Initialize chat with delayed messages
  useEffect(() => {
    if (!hasInitialized) {
      setHasInitialized(true);
      
      // Start typing immediately
      setIsTyping(true);
      
      // First message after 2 seconds
      setTimeout(() => {
        const greeting = getGreeting();
        const firstMessage = {
          id: 1,
          text: `${greeting}! I'm NAVI, your personal career guide. I'm here to help you navigate your career journey with personalized insights and recommendations.`,
          sender: 'navi',
          timestamp: new Date().toLocaleTimeString(),
        };
        
        setMessages([firstMessage]);
        setIsTyping(true); // Continue typing for second message
        
        // Second message after another 2 seconds
        setTimeout(() => {
          const secondMessage = {
            id: 2,
            text: "How can I help you today? Feel free to ask me about career planning, skill development, industry insights, or anything else related to your professional journey.",
            sender: 'navi',
            timestamp: new Date().toLocaleTimeString(),
          };
          
          setMessages(prev => [...prev, secondMessage]);
          setIsTyping(false);
        }, 2000);
      }, 2000);
    }
  }, [hasInitialized]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate API response for demo
    setTimeout(() => {
      const naviResponse = {
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
    const newChat = {
      id: newChatId,
      title: "New Chat",
      timestamp: "Just now",
      active: true
    };
    
    setChatHistory(prev => [
      newChat,
      ...prev.map(chat => ({ ...chat, active: false }))
    ]);
    
    // Reset chat and reinitialize
    setMessages([]);
    setHasInitialized(false);
    setSidebarOpen(false);
  };

  const handleChatSelect = (chatId) => {
    setChatHistory(prev => 
      prev.map(chat => ({ 
        ...chat, 
        active: chat.id === chatId 
      }))
    );
    setSidebarOpen(false);
  };

  const handleDeleteChat = (chatId, e) => {
    e.stopPropagation();
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
  };

  return (
    <>
      {/* Include the Navbar */}
      <Navbar />
      
      {/* Add top spacing for the fixed navbar */}
      <div className="h-20 md:h-20"></div>
      
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#1A1A1A] text-white flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-40 w-80 bg-[#0A0A0A]/95 backdrop-blur-xl border-r border-gray-800/50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:block`} style={{ top: '80px' }}>
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-gray-800/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold bg-gradient-to-r from-[#FF6C4A] to-[#FF8A50] bg-clip-text text-transparent">
                  NAVI Chat
                </h2>
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <button
                onClick={handleNewChat}
                className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-[#FF6C4A] to-[#FF8A50] hover:from-[#FF5722] hover:to-[#FF7043] rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Plus size={18} />
                <span className="font-medium">New Chat</span>
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4">
              <h3 className="text-sm font-medium text-gray-400 mb-4 px-2">Recent Chats</h3>
              <div className="space-y-2">
                {chatHistory.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => handleChatSelect(chat.id)}
                    className={`group relative p-3 rounded-xl cursor-pointer transition-all hover:bg-gray-800/50 ${
                      chat.active ? 'bg-[#FF6C4A]/20 border border-[#FF6C4A]/30' : 'hover:bg-gray-800/30'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <MessageSquare size={16} className={`mt-1 flex-shrink-0 ${chat.active ? 'text-[#FF6C4A]' : 'text-gray-400'}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${chat.active ? 'text-white' : 'text-gray-300'}`}>
                          {chat.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{chat.timestamp}</p>
                      </div>
                      <button
                        onClick={(e) => handleDeleteChat(chat.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"
                      >
                        <Trash2 size={12} className="text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:ml-0">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto px-4 py-6">
              {/* Messages */}
              <div className="max-w-4xl mx-auto space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                        message.sender === 'user' 
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                          : 'bg-gradient-to-r from-[#FF6C4A] to-[#FF8A50]'
                      }`}>
                        {message.sender === 'user' ? (
                          <User size={16} className="text-white" />
                        ) : (
                          <Bot size={16} className="text-white" />
                        )}
                      </div>
                      <div className={`rounded-2xl px-4 py-3 shadow-lg ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                          : 'bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <p className={`text-xs mt-2 ${
                          message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3 max-w-[80%]">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#FF6C4A] to-[#FF8A50] rounded-full flex items-center justify-center shadow-lg">
                        <Bot size={16} className="text-white" />
                      </div>
                      <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl px-4 py-3 shadow-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-[#FF6C4A] rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-[#FF6C4A] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-[#FF6C4A] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Section */}
            <div className="sticky bottom-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/95 to-transparent p-4 mb-16 md:mb-0">
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 shadow-2xl">
                  <div className="flex items-end space-x-3">
                    <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                      <Paperclip size={20} className="text-gray-400" />
                    </button>
                    <div className="flex-1">
                      <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        placeholder="Ask NAVI about your career..."
                        className="w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none max-h-32"
                        rows="1"
                        disabled={isTyping}
                      />
                    </div>
                    <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                      <Mic size={20} className="text-gray-400" />
                    </button>
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputText.trim() || isTyping}
                      className={`p-2 rounded-lg transition-all transform ${
                        inputText.trim() && !isTyping
                          ? 'bg-gradient-to-r from-[#FF6C4A] to-[#FF8A50] hover:from-[#FF5722] hover:to-[#FF7043] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
                          : 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default NaviPage;