'use client';
import { useState, useEffect } from 'react';
import { 
  Clock, Play, Pause, Square, Timer, Calendar, BarChart3,
  Target, TrendingUp, DollarSign, Briefcase, FileText,
  Users, Scale, Gavel, Search, Brain, Zap, AlertCircle,
  CheckCircle, ArrowUp, ArrowDown, Plus, Edit, Filter,
  Download, Upload, RefreshCw, Eye, Settings, Award,
  ChevronDown, ChevronRight, Star, BookOpen, MessageSquare
} from 'lucide-react';

export default function IntelligentTimeTracking() {
  const [activeView, setActiveView] = useState('tracker');
  const [isTracking, setIsTracking] = useState(false);
  const [currentTask, setCurrentTask] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [selectedCase, setSelectedCase] = useState(null);
  const [aiSuggestions, setAiSuggestions] = useState([]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTracking) {
      interval = setInterval(() => {
        setElapsedTime(time => time + 1);
      }, 1000);
    } else if (!isTracking && elapsedTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTracking, elapsedTime]);

  // Mock active cases
  const activeCases = [
    { id: 1, name: 'Rodriguez v. LAPD', client: 'Maria Rodriguez', type: 'Police Misconduct' },
    { id: 2, name: 'Johnson Medical Malpractice', client: 'Robert Johnson', type: 'Medical Malpractice' },
    { id: 3, name: 'Chen Employment Discrimination', client: 'Susan Chen', type: 'Employment Law' }
  ];

  // Mock time tracking data with AI categorization
  const timeEntries = [
    {
      id: 1,
      date: '2025-01-18',
      case: 'Rodriguez v. LAPD',
      client: 'Maria Rodriguez',
      task: 'Research excessive force precedents and draft motion to compel',
      duration: 3.5,
      category: 'Legal Research',
      aiCategory: 'Research & Analysis',
      billable: true,
      rate: 450,
      amount: 1575,
      aiConfidence: 95,
      tags: ['Research', 'Motion', 'Police Misconduct'],
      notes: 'AI categorized based on keywords: research, precedents, draft motion'
    },
    {
      id: 2,
      date: '2025-01-18',
      case: 'Johnson Medical Malpractice',
      client: 'Robert Johnson',
      task: 'Client meeting to discuss settlement strategy',
      duration: 1.25,
      category: 'Client Communication',
      aiCategory: 'Client Relations',
      billable: true,
      rate: 450,
      amount: 562.50,
      aiConfidence: 92,
      tags: ['Meeting', 'Settlement', 'Strategy'],
      notes: 'AI detected client interaction and strategic discussion'
    },
    {
      id: 3,
      date: '2025-01-17',
      case: 'General Admin',
      client: 'Firm Management',
      task: 'Review and update firm policies',
      duration: 2.0,
      category: 'Administration',
      aiCategory: 'Administrative',
      billable: false,
      rate: 0,
      amount: 0,
      aiConfidence: 88,
      tags: ['Admin', 'Policies', 'Management'],
      notes: 'AI identified as non-billable administrative work'
    },
    {
      id: 4,
      date: '2025-01-17',
      case: 'Chen Employment Discrimination',
      client: 'Susan Chen',
      task: 'Prepare witnesses for deposition',
      duration: 2.75,
      category: 'Case Preparation',
      aiCategory: 'Trial Preparation',
      billable: true,
      rate: 450,
      amount: 1237.50,
      aiConfidence: 97,
      tags: ['Deposition', 'Witnesses', 'Preparation'],
      notes: 'AI recognized trial preparation activities'
    }
  ];

  // AI productivity insights
  const productivityInsights = {
    todaysHours: 7.5,
    billableHours: 5.5,
    billableRate: 73.3,
    totalRevenue: 3375,
    avgHourlyRate: 450,
    efficiency: {
      score: 87,
      trend: '+5.2%',
      comparison: 'Above firm average'
    },
    timeDistribution: {
      'Legal Research': 35,
      'Client Relations': 25,
      'Trial Preparation': 22,
      'Administrative': 18
    },
    aiAccuracy: 94.2,
    suggestions: [
      {
        type: 'optimization',
        title: 'Batch Similar Tasks',
        description: 'Group legal research tasks to improve focus and reduce context switching',
        impact: '+15% efficiency',
        priority: 'High'
      },
      {
        type: 'billing',
        title: 'Increase Settlement Meeting Rate',
        description: 'Settlement conferences could be billed at premium rate (+$100/hr)',
        impact: '+$250/day average',
        priority: 'Medium'
      },
      {
        type: 'automation',
        title: 'Auto-categorize Admin Tasks',
        description: 'Set up AI rules to automatically mark policy reviews as non-billable',
        impact: '100% accuracy',
        priority: 'Low'
      }
    ]
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (hours) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  const startTracking = () => {
    setIsTracking(true);
    setElapsedTime(0);
    
    // AI suggestions for current task
    if (currentTask) {
      setAiSuggestions([
        {
          category: 'Legal Research',
          confidence: 85,
          reason: 'Keywords: research, precedents detected'
        },
        {
          category: 'Case Preparation', 
          confidence: 70,
          reason: 'Motion drafting suggests case preparation'
        }
      ]);
    }
  };

  const stopTracking = () => {
    setIsTracking(false);
    // In production, this would save the time entry with AI categorization
    alert(`Time entry saved: ${formatTime(elapsedTime)} - AI categorized as "Legal Research" with 92% confidence`);
  };

  return (
    <div className="space-y-6">
      {/* Active Timer */}
      {activeView === 'tracker' && (
        <>
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-xl p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-[#f4c900] to-[#b68600] rounded-full flex items-center justify-center">
                  <Timer className="w-8 h-8 text-black" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Intelligent Time Tracker</h2>
                  <p className="text-gray-400">AI-powered task categorization and billing optimization</p>
                </div>
              </div>
              
              {/* Timer Display */}
              <div className="text-6xl font-mono font-bold text-white mb-4">
                {formatTime(elapsedTime)}
              </div>
              
              <div className={`text-lg font-semibold ${isTracking ? 'text-green-400' : 'text-gray-400'}`}>
                {isTracking ? 'Currently Tracking' : 'Timer Stopped'}
              </div>
            </div>

            {/* Current Task Input */}
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-white font-semibold mb-2">Current Task</label>
                <input
                  type="text"
                  value={currentTask}
                  onChange={(e) => setCurrentTask(e.target.value)}
                  placeholder="Describe what you're working on..."
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#f4c900] focus:outline-none"
                />
              </div>

              {/* Case Selection */}
              <div>
                <label className="block text-white font-semibold mb-2">Associated Case</label>
                <select 
                  value={selectedCase || ''}
                  onChange={(e) => setSelectedCase(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:border-[#f4c900] focus:outline-none"
                >
                  <option value="">Select a case...</option>
                  {activeCases.map(caseItem => (
                    <option key={caseItem.id} value={caseItem.name}>
                      {caseItem.name} - {caseItem.client}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex justify-center gap-4 mb-6">
              {!isTracking ? (
                <button
                  onClick={startTracking}
                  disabled={!currentTask}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 ${
                    currentTask 
                      ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:shadow-xl hover:shadow-green-500/20'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Play className="w-6 h-6" />
                  Start Timer
                </button>
              ) : (
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsTracking(false)}
                    className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300 flex items-center gap-3"
                  >
                    <Pause className="w-6 h-6" />
                    Pause
                  </button>
                  <button
                    onClick={stopTracking}
                    className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-red-500/20 transition-all duration-300 flex items-center gap-3"
                  >
                    <Square className="w-6 h-6" />
                    Stop & Save
                  </button>
                </div>
              )}
            </div>

            {/* AI Suggestions */}
            {aiSuggestions.length > 0 && (
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <h4 className="text-purple-300 font-semibold">AI Category Suggestions</h4>
                </div>
                <div className="space-y-2">
                  {aiSuggestions.map((suggestion, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-gray-800/50 rounded">
                      <div>
                        <span className="text-white font-medium">{suggestion.category}</span>
                        <p className="text-gray-400 text-sm">{suggestion.reason}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-400 font-bold">{suggestion.confidence}%</span>
                        <button className="px-3 py-1 bg-[#f4c900] text-black rounded text-sm font-semibold">
                          Accept
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Today's Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-green-300 text-sm font-semibold">Billable Hours</p>
                  <p className="text-3xl font-bold text-white">{productivityInsights.billableHours}</p>
                </div>
                <Clock className="w-10 h-10 text-green-400" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400 text-sm font-semibold">{productivityInsights.billableRate}%</span>
                <span className="text-gray-400 text-sm">of total time</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-blue-300 text-sm font-semibold">Revenue Generated</p>
                  <p className="text-3xl font-bold text-white">${productivityInsights.totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-10 h-10 text-blue-400" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-400 text-sm font-semibold">${productivityInsights.avgHourlyRate}/hr</span>
                <span className="text-gray-400 text-sm">average rate</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-purple-300 text-sm font-semibold">Efficiency Score</p>
                  <p className="text-3xl font-bold text-white">{productivityInsights.efficiency.score}</p>
                </div>
                <Target className="w-10 h-10 text-purple-400" />
              </div>
              <div className="flex items-center gap-2">
                <ArrowUp className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400 text-sm font-semibold">{productivityInsights.efficiency.trend}</span>
                <span className="text-gray-400 text-sm">vs last week</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-900/30 to-orange-800/30 border border-orange-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-orange-300 text-sm font-semibold">AI Accuracy</p>
                  <p className="text-3xl font-bold text-white">{productivityInsights.aiAccuracy}%</p>
                </div>
                <Brain className="w-10 h-10 text-orange-400" />
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400 text-sm font-semibold">Auto-categorized</span>
                <span className="text-gray-400 text-sm">last 30 days</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Time Entries View */}
      {activeView === 'entries' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Time Entries</h2>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-[#f4c900] to-[#b68600] rounded-lg text-black font-semibold hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {timeEntries.map((entry) => (
              <div key={entry.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white">{entry.task}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        entry.billable ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {entry.billable ? 'Billable' : 'Non-billable'}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-400 mb-3">
                      <span>Case: {entry.case}</span>
                      <span>Client: {entry.client}</span>
                      <span>Date: {entry.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">{formatDuration(entry.duration)}</p>
                    {entry.billable && (
                      <p className="text-green-400 font-semibold">${entry.amount.toFixed(2)}</p>
                    )}
                  </div>
                </div>

                {/* AI Categorization */}
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-purple-400" />
                      <span className="text-purple-300 font-semibold">AI Category: {entry.aiCategory}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400 font-bold">{entry.aiConfidence}% confidence</span>
                      {entry.aiConfidence >= 90 && <CheckCircle className="w-5 h-5 text-green-400" />}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{entry.notes}</p>
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-gradient-to-r from-[#f4c900] to-[#b68600] text-black rounded-lg font-semibold hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300 flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button className="px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Details
                  </button>
                  <button className="px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Recategorize
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Insights View */}
      {activeView === 'insights' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-8 h-8 text-purple-400" />
              <div>
                <h2 className="text-2xl font-bold text-white">AI Productivity Insights</h2>
                <p className="text-gray-400">Personalized recommendations to optimize your time</p>
              </div>
            </div>

            {/* Time Distribution Chart */}
            <div className="mb-8">
              <h3 className="text-white font-bold mb-4">Time Distribution Analysis</h3>
              <div className="space-y-3">
                {Object.entries(productivityInsights.timeDistribution).map(([category, percentage]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-gray-300">{category}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-[#f4c900] to-[#b68600] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-white font-semibold w-12 text-right">{percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            <div>
              <h3 className="text-white font-bold mb-4">AI Recommendations</h3>
              <div className="space-y-4">
                {productivityInsights.suggestions.map((suggestion, idx) => (
                  <div key={idx} className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-2 h-2 rounded-full ${
                            suggestion.priority === 'High' ? 'bg-red-400' :
                            suggestion.priority === 'Medium' ? 'bg-yellow-400' : 'bg-green-400'
                          }`} />
                          <h4 className="text-white font-semibold">{suggestion.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            suggestion.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                            suggestion.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {suggestion.priority}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{suggestion.description}</p>
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-[#f4c900]" />
                          <span className="text-[#f4c900] text-sm font-semibold">Impact: {suggestion.impact}</span>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-[#f4c900] to-[#b68600] text-black rounded-lg font-semibold hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300">
                        Apply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Time Tracking View Selector */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-2">
          <div className="flex gap-2">
            {[
              { id: 'tracker', label: 'Timer', icon: Timer },
              { id: 'entries', label: 'Entries', icon: Clock },
              { id: 'insights', label: 'AI Insights', icon: Brain },
              { id: 'reports', label: 'Reports', icon: BarChart3 }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                    activeView === tab.id
                      ? 'bg-gradient-to-r from-[#f4c900] to-[#b68600] text-black'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}