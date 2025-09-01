'use client';

import React, { useState } from 'react';
import { ChevronRight, Check, Star, Users, X } from 'lucide-react';
import Image from 'next/image';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import ContactForm from './contactform';
import Navbar from '../components/Navbar';
import AboutUsPage from '../components/AboutUsPage'; // Import the About Us component
import {
  UserCheck,
  CalendarCheck,
  TrendingUp,
  LifeBuoy,
  Wallet,
} from "lucide-react"

function TestimonialSlider() {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 24 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 32 },
      },
    },
    created(s) {
      s.moveToIdx(0, true)
    },
  }, [
    (slider) => {
      let timeout
      let mouseOver = false
      
      function clearNextTimeout() {
        clearTimeout(timeout)
      }
      
      function nextTimeout() {
        clearTimeout(timeout)
        if (mouseOver) return
        timeout = setTimeout(() => {
          slider.next()
        }, 2000) // Move every 3 seconds
      }
      
      slider.on("created", () => {
        slider.container.addEventListener("mouseover", () => {
          mouseOver = true
          clearNextTimeout()
        })
        slider.container.addEventListener("mouseout", () => {
          mouseOver = false
          nextTimeout()
        })
        nextTimeout()
      })
      
      slider.on("dragStarted", clearNextTimeout)
      slider.on("animationEnded", nextTimeout)
      slider.on("updated", nextTimeout)
    },
  ])

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CEO, TechStart Inc.",
      content:
        "GUIDO transformed our business with their innovative solutions. The results exceeded our expectations!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      position: "CTO, DataFlow Systems",
      content:
        "Exceptional service and support. The team at GUIDO truly understands what businesses need.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      position: "Founder, Creative Agency",
      content:
        "Working with GUIDO was a game-changer. Their expertise and dedication are unmatched.",
      rating: 5,
    },
    {
      name: "David Wilson",
      position: "VP Marketing, Global Corp",
      content:
        "Outstanding results and professional approach. GUIDO delivered exactly what we needed.",
      rating: 5,
    },
    {
      name: "Lisa Thompson",
      position: "Director, Innovation Labs",
      content:
        "The quality of work and attention to detail from GUIDO is simply impressive.",
      rating: 5,
    },
  ]

  return (
    <div className="w-full max-w-7xl mx-auto p-8 bg-[#151515]">
      <div ref={sliderRef} className="keen-slider">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="keen-slider__slide bg-[#151515] p-8 rounded-2xl border border-gray-700 hover:border-[#FF6C4A] transition-colors duration-300"
          >
            <div className="flex mb-4">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="text-[#FF6C4A] fill-current" size={20} />
              ))}
            </div>
            <p className="text-gray-300 mb-6 italic text-lg leading-relaxed">
              "{testimonial.content}"
            </p>
            <div>
              <div className="font-semibold text-white text-lg">{testimonial.name}</div>
              <div className="text-gray-400 text-sm">{testimonial.position}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <p className="text-gray-500 text-sm">
          Hover over testimonials to pause auto-scroll
        </p>
      </div>
    </div>
  )
}

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);

  // If About Us is selected, show the About Us page
  if (showAboutUs) {
    return <AboutUsPage onBack={() => setShowAboutUs(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Include Navbar Component */}
      <Navbar />

      {/* Add padding-top to account for fixed navbar (h-20 = 80px) */}
      <div className="pt-20">
        {/* Hero Section */}
        <section id="home" className="bg-[#151515] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Take charge of your career with <span style={{ color: '#FF6C4A' }}>GUIDO</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  To empower individuals to make informed, confident, and meaningful career choices through expert one-on-one mentorship.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => setIsLoginModalOpen(true)}
                    style={{ backgroundColor: '#FF6C4A' }}
                    className="hover:opacity-90 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center text-white"
                  >
                    Start Your Journey <ChevronRight className="ml-2" size={20} />
                  </button>
                </div>
              </div>

              {/* Right UI Simulation / Mock Widget */}
              <div className="relative">
                <div
                  style={{ background: 'linear-gradient(to right, #FF6C4A, #dc2626)' }}
                  className="rounded-2xl p-8 transform rotate-3 shadow-2xl"
                >
                  <div className="bg-white rounded-lg p-6 transform -rotate-3">
                    <div className="space-y-4">
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div
                        style={{ background: 'linear-gradient(to bottom right, #fed7aa, #fdba74)' }}
                        className="h-32 rounded"
                      ></div>
                      <div className="flex justify-between">
                        <div
                          className="h-4 rounded w-1/3"
                          style={{ backgroundColor: '#FF6C4A' }}
                        ></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-6 bg-[#151515]">
          <h2 className="text-3xl font-extrabold text-center text-[#FF6C4A] mb-12">
            Why Choose Guido?
          </h2>

          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            {[
              {
                title: "Personalized Guidance",
                desc: "Get a career plan tailored to your goals, strengths, and interests. Our AI matches you with advisors who understand your unique journey.",
                icon: <UserCheck size={28} className="text-[#FF6C4A] mx-auto mb-4" />,
              },
              {
                title: "Real Mentors",
                desc: "Engage in meaningful conversations with professionals who've navigated similar career paths and are here to help you succeed.",
                icon: <Users size={28} className="text-[#FF6C4A] mx-auto mb-4" />,
              },
              {
                title: "Workshops & Events",
                desc: "Learn from the best in industry-led sessions. Join live webinars, hands-on workshops, and Q&As to sharpen your skills.",
                icon: <CalendarCheck size={28} className="text-[#FF6C4A] mx-auto mb-4" />,
              },
              {
                title: "Progress Tracking",
                desc: "Stay on top of your goals with clear progress indicators, achievement milestones, and personalized next steps.",
                icon: <TrendingUp size={28} className="text-[#FF6C4A] mx-auto mb-4" />,
              },
              {
                title: "24/7 Support",
                desc: "Whenever you're stuck or need motivation, we're here. Chat support, community forums, and mentor messaging—available round the clock.",
                icon: <LifeBuoy size={28} className="text-[#FF6C4A] mx-auto mb-4" />,
              },
              {
                title: "Affordable Plans",
                desc: "Start for free with full core access. Upgrade only when you need more features or deeper engagement—no pressure, no hidden fees.",
                icon: <Wallet size={28} className="text-[#FF6C4A] mx-auto mb-4" />,
              },
            ].map(({ title, desc, icon }, i) => (
              <div
                key={i}
className="p-6 bg-[#1E1E1E] rounded-xl shadow hover:shadow-lg hover:border hover:border-[#FF6C4A] transition duration-300"
>

                {icon}
                <h3 className="text-xl font-semibold mb-3 text-[#FF6C4A]">{title}</h3>
                <p className="text-white-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-[#151515]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Text Content */}
              <div>
                <h2 className="text-4xl font-extrabold text-White-900 mb-6">
                  About <span className="text-[#FF6C4A]">GUIDO</span>
                </h2>

                <p className="text-lg text-white-700 mb-4 leading-relaxed">
                  <strong>GUIDO was born from a simple yet powerful idea</strong> — to help individuals navigate their career paths with clarity and confidence. Too often, career choices in India are driven by societal pressure rather than personal passion.
                </p>

                <p className="text-lg text-white-700 mb-6 leading-relaxed">
                  GUIDO's process starts with understanding your strengths, interests, and aspirations. Through one-on-one mentorship and data-driven career mapping, we provide clear, personalized guidance. Our continuous support ensures you make informed career choices with confidence.
                </p>

                <ul className="space-y-4 mt-6">
                  {[
                    "Personalized, expert-led mentorship",
                    "Data-driven career mapping technology",
                    "End-to-end support throughout your journey",
                  ].map((point, i) => (
                    <li key={i} className="flex items-center text-white-700">
                      <Check className="text-[#FF6C4A] mr-3" size={20} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image + Stat */}
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&crop=faces"
                  alt="Mentorship at GUIDO"
                  className="w-full rounded-3xl shadow-xl"
                />
                <div
                  style={{ backgroundColor: "#FF6C4A" }}
                  className="absolute -bottom-6 left-6 text-white p-5 rounded-xl shadow-lg"
                >
                  <div className="text-3xl font-bold">98%</div>
                  <div className="text-sm font-medium">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section id="services" className="py-20 bg-[#151515]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#FF6C4A] mb-4">What We Offer</h2>
              <p className="text-xl text-white max-w-3xl mx-auto">
                A complete ecosystem designed to help you explore, prepare, and thrive in your ideal career path.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Career Mapping",
                  description:
                    "We assess your strengths, passions, and goals to build a customized career roadmap.",
                  features: ["AI-Powered Assessments", "Tailored Career Plans", "Clear Milestones"]
                },
                {
                  title: "One-on-One Mentorship",
                  description:
                    "Connect with experienced mentors who guide you through real-world decisions and growth.",
                  features: ["Personalized Sessions", "Goal Tracking", "Ongoing Support"]
                },
                {
                  title: "Skill Building",
                  description:
                    "Access curated courses and live sessions that build the skills your future demands.",
                  features: ["Workshops", "Certification Pathways", "Industry-Ready Content"]
                },
                {
                  title: "Internship & Job Guidance",
                  description:
                    "From resume building to mock interviews, we prepare you to land your dream role.",
                  features: ["Resume Reviews", "Mock Interviews", "Placement Support"]
                },
                {
                  title: "Community & Networking",
                  description:
                    "Grow with peers, mentors, and industry experts in an inclusive, inspiring space.",
                  features: ["Interactive Forums", "Monthly Meetups", "Career Events"]
                },
                {
                  title: "24/7 Support",
                  description:
                    "We're with you throughout your journey — whether you need help, motivation, or advice.",
                  features: ["Live Chat", "Email Support", "Always Available"]
                }
              ].map((service, index) => (
                <div
                  key={index}
                  className="bg-[#1E1E1E] p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-2xl font-semibold text-[#FF6C4A] mb-4">
                    {service.title}
                  </h3>
                  <p className="text-white-600 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-white-700"
                      >
                        <Check className="text-[#FF6C4A] mr-2" size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-[#151515] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">They ❤️ Guido</h2>
              <p className="text-xl text-gray-300">
                Read the love notes from our incredible users.
              </p>
            </div>

            <TestimonialSlider />
          </div>
        </section>

        {/* Contact Section */}
        {/* <ContactForm /> */}

        {/* Footer */}
        <footer className="bg-[#151515] text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="mb-4">
                  <Image
                    src="/assets/Fulllogo.png"
                    alt="Guido Logo"
                    width={100}
                    height={40}
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
                  <li>Careers</li>
                  <li>Blog</li>
                  <li>Contact</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>LinkedIn</li>
                  <li>Twitter</li>
                  <li>Facebook</li>
                  <li>Instagram</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 GUIDO. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Login Modal - moved outside the pt-20 div so it's not affected by padding */}
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
    </div>
  );
}