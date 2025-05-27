'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Paperclip, MoreVertical, Bot, User, ArrowLeft, Plus, MessageSquare, Trash2, Menu, X } from 'lucide-react';

const NaviPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm NAVI, your personal career guide. I'm here to help you navigate your career journey with personalized insights and recommendations. What would you like to explore today?",
      sender: 'navi',
      timestamp: new Date().toLocaleTimeString(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  try {
    const response = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: inputText }),
    });

    const data = await response.json();

    const naviResponse = {
      id: messages.length + 2,
      text: data.reply,
      sender: 'navi',
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, naviResponse]);
  } catch (error) {
    console.error('Error sending message:', error);
    setMessages(prev => [
      ...prev,
      {
        id: messages.length + 2,
        text: "Sorry, something went wrong. Please try again later.",
        sender: 'navi',
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  } finally {
    setIsTyping(false);
  }
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
    
    setMessages([
      {
        id: 1,
        text: "Hi! I'm NAVI, your personal career guide. I'm here to help you navigate your career journey with personalized insights and recommendations. What would you like to explore today?",
        sender: 'navi',
        timestamp: new Date().toLocaleTimeString(),
      }
    ]);
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

  const quickActions = [
    "Career Assessment",
    "Skill Gap Analysis", 
    "Industry Trends",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#1A1A1A] text-white flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-[#0A0A0A]/95 backdrop-blur-xl border-r border-gray-800/50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:block`}>
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
        {/* Header */}
        {/* <div className="sticky top-0 z-40 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-gray-800/30">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
                >
                  <Menu size={20} />
                </button>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#FF6C4A] to-[#FF8A50] rounded-full flex items-center justify-center shadow-lg">
                      <Bot size={20} className="text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-[#0A0A0A] rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h1 className="text-lg font-bold">NAVI</h1>
                    <p className="text-xs text-gray-400">AI Career Guide</p>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>
        </div> */}

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {/* Quick Actions - Only show when no messages or just initial message */}
            {messages.length <= 1 && (
              <div className="mb-8">
                <div className="max-w-2xl mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => setInputText(action)}
                        className="p-4 bg-gradient-to-br from-gray-800/30 to-gray-900/30 hover:from-[#FF6C4A]/20 hover:to-[#FF8A50]/20 border border-gray-700/50 hover:border-[#FF6C4A]/30 rounded-2xl text-sm transition-all transform hover:scale-[1.02] group"
                      >
                        <span className="group-hover:text-[#FF6C4A] transition-colors">{action}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

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
          <div className="sticky bottom-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/95 to-transparent p-4">
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
                    />
                  </div>
                  <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                    <Mic size={20} className="text-gray-400" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim()}
                    className={`p-2 rounded-lg transition-all transform ${
                      inputText.trim()
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

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default NaviPage;