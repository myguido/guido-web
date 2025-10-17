'use client';
import { useState } from 'react';
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, Clock, CheckCircle, AlertCircle, Download, BarChart3 } from 'lucide-react';

export default function EarningsPage() {
  const [earningsData] = useState({
    totalEarnings: 94500,
    thisMonth: 28000,
    lastMonth: 35000,
    pendingPayout: 19600,
    availableForWithdrawal: 74900,
    nextPayoutDate: '2025-10-25'
  });

  const [transactions] = useState([
    {
      id: 1,
      studentName: 'Rahul Kumar',
      type: 'Counselling',
      date: '2025-10-10',
      sessionAmount: 2000,
      platformFee: 600,
      yourEarning: 1400,
      status: 'completed'
    },
    {
      id: 2,
      studentName: 'Priya Sharma',
      type: 'Expert Session',
      date: '2025-10-08',
      sessionAmount: 3000,
      platformFee: 900,
      yourEarning: 2100,
      status: 'completed'
    },
    {
      id: 3,
      studentName: 'Amit Patel',
      type: 'Counselling',
      date: '2025-10-05',
      sessionAmount: 2000,
      platformFee: 600,
      yourEarning: 1400,
      status: 'paid'
    },
    {
      id: 4,
      studentName: 'Sneha Reddy',
      type: 'Alumni Connect',
      date: '2025-09-28',
      sessionAmount: 1500,
      platformFee: 450,
      yourEarning: 1050,
      status: 'paid'
    },
    {
      id: 5,
      studentName: 'Vikram Singh',
      type: 'Counselling',
      date: '2025-09-25',
      sessionAmount: 2000,
      platformFee: 600,
      yourEarning: 1400,
      status: 'paid'
    }
  ]);

  const monthlyData = [
    { month: 'Apr', earnings: 18000 },
    { month: 'May', earnings: 22000 },
    { month: 'Jun', earnings: 28000 },
    { month: 'Jul', earnings: 31000 },
    { month: 'Aug', earnings: 25000 },
    { month: 'Sep', earnings: 35000 },
    { month: 'Oct', earnings: 28000 }
  ];

  const monthChange = ((earningsData.thisMonth - earningsData.lastMonth) / earningsData.lastMonth * 100).toFixed(1);

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
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors flex items-center space-x-2">
              <Download size={18} />
              <span>Withdraw Funds</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <DollarSign className="mr-3 text-[#FF6C4A]" size={36} />
            Earnings & Payouts
          </h1>
          <p className="text-gray-400 text-lg">Track your income and manage withdrawals</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-purple-500/30 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-purple-400" size={24} />
              </div>
              <TrendingUp className="text-green-400" size={20} />
            </div>
            <p className="text-purple-300 text-sm mb-1">Total Earnings</p>
            <p className="text-3xl font-bold text-white">₹{earningsData.totalEarnings.toLocaleString()}</p>
            <p className="text-purple-300 text-xs mt-2">All-time</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6 hover:border-blue-500 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-blue-500/30 rounded-lg flex items-center justify-center">
                <DollarSign className="text-blue-400" size={24} />
              </div>
              {parseFloat(monthChange) > 0 ? (
                <TrendingUp className="text-green-400" size={20} />
              ) : (
                <TrendingDown className="text-red-400" size={20} />
              )}
            </div>
            <p className="text-blue-300 text-sm mb-1">This Month</p>
            <p className="text-3xl font-bold text-white">₹{earningsData.thisMonth.toLocaleString()}</p>
            <p className={`text-xs mt-2 ${parseFloat(monthChange) > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {parseFloat(monthChange) > 0 ? '↑' : '↓'} {Math.abs(parseFloat(monthChange))}% vs last month
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-xl p-6 hover:border-orange-500 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-orange-500/30 rounded-lg flex items-center justify-center">
                <Clock className="text-orange-400" size={24} />
              </div>
              <AlertCircle className="text-orange-400" size={20} />
            </div>
            <p className="text-orange-300 text-sm mb-1">Pending Payout</p>
            <p className="text-3xl font-bold text-white">₹{earningsData.pendingPayout.toLocaleString()}</p>
            <p className="text-orange-300 text-xs mt-2">Next: {earningsData.nextPayoutDate}</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6 hover:border-green-500 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-green-500/30 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-green-400" size={24} />
              </div>
              <TrendingUp className="text-green-400" size={20} />
            </div>
            <p className="text-green-300 text-sm mb-1">Available</p>
            <p className="text-3xl font-bold text-white">₹{earningsData.availableForWithdrawal.toLocaleString()}</p>
            <p className="text-green-300 text-xs mt-2">Ready to withdraw</p>
          </div>
        </div>

        {/* Monthly Chart */}
        <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 p-6 mb-8">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <BarChart3 className="mr-2 text-[#FF6C4A]" size={20} />
            Monthly Earnings Trend
          </h3>
          <div className="flex items-end justify-between h-64 gap-4">
            {monthlyData.map((data, index) => {
              const maxEarning = Math.max(...monthlyData.map(d => d.earnings));
              const height = (data.earnings / maxEarning) * 100;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  <div className="w-full bg-[#151515] rounded-t-lg relative border border-gray-700" style={{ height: '100%' }}>
                    <div 
                      className="absolute bottom-0 w-full bg-gradient-to-t from-[#FF6C4A] to-purple-500 rounded-t-lg transition-all duration-500 hover:from-[#FF6C4A]/90 hover:to-purple-600 cursor-pointer"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1E1E1E] px-3 py-1 rounded-lg border border-gray-600 whitespace-nowrap">
                        <p className="text-xs font-semibold text-white">₹{data.earnings.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-3 font-medium">{data.month}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fee Breakdown Info */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <DollarSign className="text-blue-400" size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-white mb-4">💡 Payment Structure</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-[#1E1E1E] rounded-lg p-4 border border-gray-700">
                  <p className="font-medium text-white mb-1">Platform Fee: 30%</p>
                  <p className="text-xs text-gray-400">Covers platform maintenance & support</p>
                </div>
                <div className="bg-[#1E1E1E] rounded-lg p-4 border border-gray-700">
                  <p className="font-medium text-white mb-1">Your Share: 70%</p>
                  <p className="text-xs text-gray-400">Direct earnings from sessions</p>
                </div>
                <div className="bg-[#1E1E1E] rounded-lg p-4 border border-gray-700">
                  <p className="font-medium text-white mb-1">Payout Cycle: 15 days</p>
                  <p className="text-xs text-gray-400">Twice monthly on 10th & 25th</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-[#1E1E1E] rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <Clock className="mr-2 text-[#FF6C4A]" size={20} />
              Transaction History
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#151515]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Platform Fee</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Your Earning</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-[#151515] transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-400">{transaction.date}</td>
                    <td className="px-6 py-4 font-medium text-white">{transaction.studentName}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium">
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">₹{transaction.sessionAmount}</td>
                    <td className="px-6 py-4 text-red-400">-₹{transaction.platformFee}</td>
                    <td className="px-6 py-4 font-semibold text-green-400">₹{transaction.yourEarning}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        transaction.status === 'paid' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}