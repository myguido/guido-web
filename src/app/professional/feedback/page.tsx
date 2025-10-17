'use client';
import { useState } from 'react';
import { ArrowLeft, FileText, CheckCircle, AlertCircle, Send, Trash2, User, Target, Lightbulb, MessageSquare } from 'lucide-react';

export default function FeedbackPage() {
  const [selectedSession, setSelectedSession] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [recommendations, setRecommendations] = useState('');

  const completedSessions = [
    { id: '1', studentName: 'Rahul Kumar', date: '2025-10-10', type: 'Counselling' },
    { id: '2', studentName: 'Amit Patel', date: '2025-10-08', type: 'Counselling' },
    { id: '3', studentName: 'Sneha Reddy', date: '2025-10-05', type: 'Expert Session' }
  ];

  const interests = [
    'Cricket', 'Music', 'Engineering', 'Medicine', 'Arts', 'Business',
    'Technology', 'Sports', 'Teaching', 'Law', 'Design', 'Science'
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else if (selectedInterests.length < 3) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = () => {
    if (!selectedSession) {
      alert('Please select a session');
      return;
    }
    if (selectedInterests.length !== 3) {
      alert('Please select exactly 3 interests');
      return;
    }
    if (!feedback.trim()) {
      alert('Please provide feedback');
      return;
    }

    alert('Feedback submitted successfully!');
    
    setSelectedSession('');
    setSelectedInterests([]);
    setFeedback('');
    setRecommendations('');
  };

  const clearForm = () => {
    setSelectedSession('');
    setSelectedInterests([]);
    setFeedback('');
    setRecommendations('');
  };

  return (
    <div className="min-h-screen bg-[#151515]">
      {/* Header with Back Button */}
      <div className="bg-[#1E1E1E] border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <FileText className="mr-3 text-[#FF6C4A]" size={36} />
            Create Feedback Report
          </h1>
          <p className="text-gray-400 text-lg">Provide detailed feedback and career guidance for students</p>
        </div>

        {/* Select Session */}
        <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6 mb-6 hover:border-[#FF6C4A] transition-colors">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
              <User className="text-blue-500" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">1. Select Completed Session</h3>
              <p className="text-sm text-gray-400">Choose the session you want to provide feedback for</p>
            </div>
          </div>
          <select
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            className="w-full bg-[#151515] border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-[#FF6C4A] focus:outline-none transition-colors"
          >
            <option value="">Choose a session...</option>
            {completedSessions.map((session) => (
              <option key={session.id} value={session.id}>
                {session.studentName} - {session.date} ({session.type})
              </option>
            ))}
          </select>
        </div>

        {/* Interest Selection */}
        <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6 mb-6 hover:border-[#FF6C4A] transition-colors">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3">
              <Target className="text-purple-500" size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">2. Identify Top 3 Interest Areas</h3>
                  <p className="text-sm text-gray-400">Select areas where the student showed maximum interest</p>
                </div>
                {selectedInterests.length > 0 && (
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
                    {selectedInterests.length}/3 selected
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {interests.map((interest) => {
              const isSelected = selectedInterests.includes(interest);
              const isDisabled = !isSelected && selectedInterests.length >= 3;
              
              return (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  disabled={isDisabled}
                  className={`p-3 rounded-lg border-2 font-medium transition-all ${
                    isSelected
                      ? 'border-[#FF6C4A] bg-[#FF6C4A]/20 text-white'
                      : isDisabled
                      ? 'border-gray-700 bg-[#151515] text-gray-600 cursor-not-allowed'
                      : 'border-gray-600 bg-[#151515] text-gray-300 hover:border-[#FF6C4A] hover:bg-[#FF6C4A]/10'
                  }`}
                >
                  {isSelected && <CheckCircle className="inline mr-1" size={14} />}
                  {interest}
                </button>
              );
            })}
          </div>

          {selectedInterests.length === 3 && (
            <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-green-400">
                  Perfect! You've selected 3 interests. These will be shown to the student as career path cards.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Feedback */}
        <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6 mb-6 hover:border-[#FF6C4A] transition-colors">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mr-3">
              <MessageSquare className="text-green-500" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">3. Detailed Session Feedback</h3>
              <p className="text-sm text-gray-400">Comprehensive feedback about the session and student's profile</p>
            </div>
          </div>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={8}
            placeholder="Example: During the session, the student showed exceptional analytical thinking and problem-solving skills. They demonstrated strong interest in technology and innovation. However, they need to work on their communication skills and self-confidence..."
            className="w-full bg-[#151515] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#FF6C4A] focus:outline-none transition-colors resize-none"
          />
          <div className="flex justify-between items-center mt-3">
            <span className="text-sm text-gray-500">{feedback.length} characters</span>
            <span className={`text-sm ${feedback.length >= 200 ? 'text-green-500' : 'text-gray-500'}`}>
              {feedback.length >= 200 ? '✓ ' : ''}Minimum 200 characters recommended
            </span>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6 mb-6 hover:border-[#FF6C4A] transition-colors">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center mr-3">
              <Lightbulb className="text-yellow-500" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">4. Career Recommendations & Next Steps</h3>
              <p className="text-sm text-gray-400">Suggest specific actions, courses, or resources</p>
            </div>
          </div>
          <textarea
            value={recommendations}
            onChange={(e) => setRecommendations(e.target.value)}
            rows={6}
            placeholder="Example: Based on your interests, I recommend:&#10;1. Explore online courses in Data Science (Coursera, edX)&#10;2. Connect with industry experts in AI/ML field&#10;3. Start working on small coding projects&#10;4. Join local tech communities and hackathons&#10;5. Consider pursuing B.Tech in Computer Science"
            className="w-full bg-[#151515] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#FF6C4A] focus:outline-none transition-colors resize-none"
          />
        </div>

        {/* Important Notes */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6 mb-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle className="text-blue-400" size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">📌 Important Notes:</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start">
                  <span className="text-[#FF6C4A] mr-2">•</span>
                  <span>The 3 selected interests will be shown as cards to the student</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6C4A] mr-2">•</span>
                  <span>Student can select one card to explore that career path with industry experts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6C4A] mr-2">•</span>
                  <span>Your feedback will be permanently saved and shared with the student</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6C4A] mr-2">•</span>
                  <span>Make sure your feedback is constructive and actionable</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-[#FF6C4A] hover:bg-[#FF6C4A]/90 text-white py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
          >
            <Send size={20} />
            <span>Submit Feedback & Send to Student</span>
          </button>
          <button
            onClick={clearForm}
            className="px-8 py-4 bg-[#1E1E1E] border border-gray-600 hover:border-red-500 text-gray-300 hover:text-red-400 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Trash2 size={18} />
            <span>Clear</span>
          </button>
        </div>
      </div>
    </div>
  );
}