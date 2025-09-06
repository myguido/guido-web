'use client';

import React, { useState } from 'react';
import { ArrowRight, Mail, Phone, Send, Sparkles } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [isHovered, setIsHovered] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, #151515 0%, #2a1f1a 50%, #151515 100%)'}}>
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }}
        ></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full blur-xl animate-pulse" style={{background: 'radial-gradient(circle, rgba(255, 108, 74, 0.3) 0%, rgba(255, 108, 74, 0.1) 70%)'}}></div>
        <div 
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full blur-xl animate-pulse" 
          style={{ 
            animationDelay: '1s',
            background: 'radial-gradient(circle, rgba(255, 135, 107, 0.3) 0%, rgba(255, 135, 107, 0.1) 70%)'
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full blur-xl animate-pulse" 
          style={{ 
            animationDelay: '2s',
            background: 'radial-gradient(circle, rgba(255, 182, 165, 0.3) 0%, rgba(255, 182, 165, 0.1) 70%)'
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 backdrop-blur-sm border rounded-full px-6 py-2 mb-6" style={{backgroundColor: 'rgba(248, 248, 248, 0.05)', borderColor: 'rgba(248, 248, 248, 0.1)'}}>
            <Sparkles className="w-4 h-4" style={{color: '#FF6C4A'}} />
            <span className="text-sm font-medium" style={{color: '#FF6C4A'}}>Let's Connect</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{background: 'linear-gradient(135deg, #F8F8F8 0%, #FF6C4A 50%, #FFB6A5 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'}}>
            Get In Touch
          </h2>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed" style={{color: '#FFB6A5'}}>
            Ready to bring your vision to life? Let's start a conversation and create something extraordinary together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <div className="group">
                <div className="flex items-start gap-4 p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:border-opacity-30" style={{backgroundColor: 'rgba(248, 248, 248, 0.05)', borderColor: 'rgba(248, 248, 248, 0.1)'}}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{background: 'linear-gradient(135deg, #FF6C4A 0%, #FF876B 100%)'}}>
                    <Mail className="w-6 h-6" style={{color: '#F8F8F8'}} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2" style={{color: '#F8F8F8'}}>Email Us</h4>
                    <p style={{color: '#FFB6A5'}}>contact@myguido.in</p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="flex items-start gap-4 p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:border-opacity-30" style={{backgroundColor: 'rgba(248, 248, 248, 0.05)', borderColor: 'rgba(248, 248, 248, 0.1)'}}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{background: 'linear-gradient(135deg, #FF876B 0%, #FFB6A5 100%)'}}>
                    <Phone className="w-6 h-6" style={{color: '#F8F8F8'}} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2" style={{color: '#F8F8F8'}}>Call Us</h4>
                    <p style={{color: '#FFB6A5'}}>+919575848503</p>
                  </div>
                </div>
              </div>

              {/* <div className="group">
                <div className="flex items-start gap-4 p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:border-opacity-30" style={{backgroundColor: 'rgba(248, 248, 248, 0.05)', borderColor: 'rgba(248, 248, 248, 0.1)'}}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{background: 'linear-gradient(135deg, #FFB6A5 0%, #FF6C4A 100%)'}}>
                    <MapPin className="w-6 h-6" style={{color: '#F8F8F8'}} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2" style={{color: '#F8F8F8'}}>Visit Us</h4>
                    <p style={{color: '#FFB6A5'}}>123 Business Ave, Suite 100<br />New York, NY 10001</p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="relative">
              {/* Glassmorphism Card */}
              <div className="backdrop-blur-xl border rounded-3xl p-8 md:p-10 shadow-2xl" style={{backgroundColor: 'rgba(248, 248, 248, 0.1)', borderColor: 'rgba(248, 248, 248, 0.2)'}}>
                <div className="absolute inset-0 rounded-3xl" style={{background: 'linear-gradient(135deg, rgba(248, 248, 248, 0.05) 0%, transparent 100%)'}}></div>
                
                <div className="relative space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2" style={{color: '#F8F8F8'}}>Send us a message</h3>
                    <p style={{color: '#FFB6A5'}}>We'll get back to you within 24 hours</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-medium mb-3" style={{color: '#F8F8F8'}}>First Name</label>
                      <div className="relative">
                        <input 
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 group-hover:border-opacity-50"
                          style={{
                            backgroundColor: 'rgba(248, 248, 248, 0.05)',
                            borderColor: 'rgba(248, 248, 248, 0.2)',
                            color: '#F8F8F8'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#FF6C4A';
                            e.target.style.boxShadow = '0 0 0 2px rgba(255, 108, 74, 0.2)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(248, 248, 248, 0.2)';
                            e.target.style.boxShadow = 'none';
                          }}
                          placeholder="John"
                        />
                        <div className="absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none" style={{background: 'linear-gradient(135deg, rgba(255, 108, 74, 0) 0%, rgba(255, 108, 74, 0) 50%, rgba(255, 182, 165, 0) 100%)'}}></div>
                      </div>
                    </div>
                    <div className="group">
                      <label className="block text-sm font-medium mb-3" style={{color: '#F8F8F8'}}>Last Name</label>
                      <div className="relative">
                        <input 
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 group-hover:border-opacity-50"
                          style={{
                            backgroundColor: 'rgba(248, 248, 248, 0.05)',
                            borderColor: 'rgba(248, 248, 248, 0.2)',
                            color: '#F8F8F8'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#FF6C4A';
                            e.target.style.boxShadow = '0 0 0 2px rgba(255, 108, 74, 0.2)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(248, 248, 248, 0.2)';
                            e.target.style.boxShadow = 'none';
                          }}
                          placeholder="Doe"
                        />
                        <div className="absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none" style={{background: 'linear-gradient(135deg, rgba(255, 108, 74, 0) 0%, rgba(255, 108, 74, 0) 50%, rgba(255, 182, 165, 0) 100%)'}}></div>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium mb-3" style={{color: '#F8F8F8'}}>Email Address</label>
                    <div className="relative">
                      <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 group-hover:border-opacity-50"
                        style={{
                          backgroundColor: 'rgba(248, 248, 248, 0.05)',
                          borderColor: 'rgba(248, 248, 248, 0.2)',
                          color: '#F8F8F8'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#FF6C4A';
                          e.target.style.boxShadow = '0 0 0 2px rgba(255, 108, 74, 0.2)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(248, 248, 248, 0.2)';
                          e.target.style.boxShadow = 'none';
                        }}
                        placeholder="john@example.com"
                      />
                      <div className="absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none" style={{background: 'linear-gradient(135deg, rgba(255, 108, 74, 0) 0%, rgba(255, 108, 74, 0) 50%, rgba(255, 182, 165, 0) 100%)'}}></div>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium mb-3" style={{color: '#F8F8F8'}}>Message</label>
                    <div className="relative">
                      <textarea 
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 group-hover:border-opacity-50 resize-none"
                        style={{
                          backgroundColor: 'rgba(248, 248, 248, 0.05)',
                          borderColor: 'rgba(248, 248, 248, 0.2)',
                          color: '#F8F8F8'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#FF6C4A';
                          e.target.style.boxShadow = '0 0 0 2px rgba(255, 108, 74, 0.2)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(248, 248, 248, 0.2)';
                          e.target.style.boxShadow = 'none';
                        }}
                        placeholder="Tell us about your project..."
                      />
                      <div className="absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none" style={{background: 'linear-gradient(135deg, rgba(255, 108, 74, 0) 0%, rgba(255, 108, 74, 0) 50%, rgba(255, 182, 165, 0) 100%)'}}></div>
                    </div>
                  </div>

                  <button 
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="group relative w-full py-4 px-8 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/25"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <div className="relative flex items-center justify-center gap-3">
                      <Send className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                      <span>Send Message</span>
                      <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}