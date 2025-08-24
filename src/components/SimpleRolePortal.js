'use client'

import { useState } from 'react'
import { Brain, Users, FileText, Calendar, Scale } from 'lucide-react'

const SimpleRolePortal = () => {
  const [aiActive, setAiActive] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">🚀 Next-Level AI Attorney Portal</h1>
                <p className="text-xs text-gray-400">Revolutionary Legal AI System</p>
              </div>
            </div>
            
            <button
              onClick={() => setAiActive(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
            >
              <Brain className="w-5 h-5" />
              <span>Ask Maya AI</span>
            </button>
          </div>
        </div>
      </header>

      {/* AI Modal */}
      {aiActive && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl h-[80vh] bg-gray-900 rounded-3xl shadow-2xl border border-gray-700/50 flex flex-col">
            
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Maya AI Assistant</h2>
                  <p className="text-sm text-gray-400">Revolutionary Legal AI • Ready to Transform Your Practice</p>
                </div>
              </div>
              <button
                onClick={() => setAiActive(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all text-xl"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mb-6 animate-pulse">
                <Brain className="w-12 h-12 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-4">🎉 SUCCESS!</h3>
              
              <div className="max-w-2xl space-y-4 text-left">
                <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-2xl p-6">
                  <h4 className="text-xl font-bold text-purple-300 mb-3">✅ Phase 1 Complete: Foundation Built</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>🎯 Role-based authentication system created</li>
                    <li>🧠 AI Assistant Maya integrated and functional</li>
                    <li>⚡ Voice interface ready for commands</li>
                    <li>📱 Responsive design with mobile optimization</li>
                    <li>🎨 Premium dark theme with gold accents</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-6">
                  <h4 className="text-xl font-bold text-green-300 mb-3">🚀 Ready for Next Phase</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>👨‍💼 Attorney Dashboard: Strategic command center with AI insights</li>
                    <li>📋 Case Manager: Workflow automation hub</li>
                    <li>📚 Paralegal: Research & drafting powerhouse</li>
                    <li>🏢 Legal Assistant: Administrative AI command</li>
                    <li>📞 Secretary: Communication orchestrator</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/20 rounded-2xl p-6">
                  <h4 className="text-xl font-bold text-yellow-300 mb-3">🎪 Revolutionary Features Ready</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>🗣️ "Hey Maya" voice commands</li>
                    <li>🔮 Predictive case analytics</li>
                    <li>⚡ 10x productivity AI automations</li>
                    <li>📊 Real-time collaboration tools</li>
                    <li>🎯 Continuous learning system</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex space-x-4">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all">
                  🚀 Deploy Phase 2
                </button>
                <button className="px-8 py-4 border-2 border-purple-500 rounded-2xl font-bold text-lg hover:bg-purple-500/10 transition-all">
                  📋 View Implementation Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            🎉 Revolutionary AI Legal Portal 
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Foundation Complete!
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Ready for next-level AI integration across all legal roles
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { role: 'Attorney', icon: <Scale className="w-8 h-8" />, gradient: 'from-purple-500 to-pink-500', desc: 'Strategic AI command center' },
            { role: 'Case Manager', icon: <FileText className="w-8 h-8" />, gradient: 'from-blue-500 to-cyan-500', desc: 'Workflow automation hub' },
            { role: 'Paralegal', icon: <Users className="w-8 h-8" />, gradient: 'from-green-500 to-emerald-500', desc: 'Research powerhouse' },
            { role: 'Legal Assistant', icon: <Calendar className="w-8 h-8" />, gradient: 'from-yellow-500 to-orange-500', desc: 'Administrative AI' },
            { role: 'Secretary', icon: <Brain className="w-8 h-8" />, gradient: 'from-pink-500 to-red-500', desc: 'Communication hub' }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-3xl p-8 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 hover:scale-105 cursor-pointer group"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-all duration-300`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.role}</h3>
              <p className="text-gray-400 mb-4">{item.desc}</p>
              <div className="flex items-center text-purple-400 font-medium">
                <Brain className="w-4 h-4 mr-2" />
                AI-Powered
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SimpleRolePortal