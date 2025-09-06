"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Send, Mic, Plus, User, X, Home, Navigation, Users, Briefcase, Sparkles, MessageSquare, Trash2, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Navbar Component (unchanged as requested)
const Navbar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const pathname = usePathname();

  const navItems = useMemo(() => [
    { label: "Home", href: "/", icon: Home },
    { label: "Navi", href: "/Navi", icon: Navigation },
    { label: "Counsellors", href: "/counsellors", icon: Users },
    { label: "Industry Experts", href: "/industry-experts", icon: Briefcase }
  ], []);

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
  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: "New Chat", timestamp: "Just now", active: true },
    { id: 2, title: "Career Assessment Discussion", timestamp: "2 hours ago" },
    { id: 3, title: "Skill Gap Analysis", timestamp: "Yesterday" },
    { id: 4, title: "Industry Trends Overview", timestamp: "3 days ago" },
    { id: 5, title: "Salary Negotiation Tips", timestamp: "1 week ago" },
  ]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
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
    
    // Reset chat
    setMessages([]);
  };

  const handleChatSelect = (chatId) => {
    setChatHistory(prev => 
      prev.map(chat => ({ 
        ...chat, 
        active: chat.id === chatId 
      }))
    );
    
    // Reset messages for demo
    setMessages([]);
  };

  const handleDeleteChat = (chatId, e) => {
    e.stopPropagation();
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
  };

  return (
    <>
      <Navbar />
      
      {/* Add top spacing for the fixed navbar */}
      <div className="h-20 md:h-20"></div>
      
      <div className="min-h-screen bg-[#131314] text-white flex relative">
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-24 left-4 z-50 p-2 bg-[#1f1f20] hover:bg-[#2a2b2c] rounded-lg transition-all border border-[#2f3031] md:block"
        >
          <Menu size={20} className="text-[#e8eaed]" />
        </button>

        {/* Sidebar */}
        {sidebarOpen && (
          <>
            {/* Mobile Overlay */}
            <div 
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            
            {/* Sidebar Content */}
            <div className={`fixed top-20 left-0 h-[calc(100vh-80px)] w-80 bg-[#1f1f20] border-r border-[#2f3031] z-40 transform transition-transform ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:relative md:translate-x-0 md:top-0 md:h-[calc(100vh-80px)]`}>
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#2f3031]">
                <h2 className="text-lg font-semibold text-[#e8eaed]">NAVI</h2>
                <button
                  onClick={handleNewChat}
                  className="p-2 hover:bg-[#2a2b2c] rounded-lg transition-colors"
                >
                  <Plus size={18} className="text-[#9aa0a6]" />
                </button>
              </div>

              {/* Chat History */}
              <div className="flex-1 overflow-y-auto p-2">
                <div className="space-y-1">
                  {chatHistory.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => handleChatSelect(chat.id)}
                      className={`group relative p-3 rounded-lg cursor-pointer transition-all ${
                        chat.active ? 'bg-[#2f3031]' : 'hover:bg-[#2a2b2c]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <MessageSquare size={16} className="text-[#9aa0a6] flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-[#e8eaed] truncate">{chat.title}</p>
                            <p className="text-xs text-[#9aa0a6] mt-1">{chat.timestamp}</p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => handleDeleteChat(chat.id, e)}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[#3f4041] rounded transition-all"
                        >
                          <Trash2 size={12} className="text-[#9aa0a6]" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-0 relative">
          {messages.length === 0 && !isTyping ? (
            /* Welcome Screen - Gemini Style */
            <div className="flex-1 flex flex-col items-center justify-center px-4">
              <div className="w-full max-w-2xl mx-auto">
                {/* Greeting */}
                <div className="text-center mb-16">
                  <h1 className="text-4xl md:text-5xl font-light text-[#FF6C4A] mb-2">
                    Hello, Ritwaj
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
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
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
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
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
    </>
  );
};

export default NaviPage;