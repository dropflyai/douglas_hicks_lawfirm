'use client';

import { useState, useEffect } from 'react';
import { 
  Award, Calendar, TrendingUp, Target, Users, Star, Clock, 
  FileText, BarChart3, PieChart, Eye, Edit3, Plus, Send,
  MessageSquare, ChevronDown, ChevronRight, Filter, Download,
  Upload, CheckCircle, AlertTriangle, Info, Zap, Brain,
  ThumbsUp, ThumbsDown, ArrowUp, ArrowDown, Minus, Circle,
  Activity, Globe, Shield, BookOpen, Lightbulb, Flag,
  Trophy, User, X
} from 'lucide-react';

export default function PerformanceManagement() {
  const [activeView, setActiveView] = useState('reviews');
  const [selectedReview, setSelectedReview] = useState(null);
  const [showNewReview, setShowNewReview] = useState(false);
  const [reviewFilters, setReviewFilters] = useState({
    period: 'all',
    status: 'all',
    department: 'all'
  });

  // Comprehensive performance data
  const performanceReviews = [
    {
      id: 1,
      employeeId: 1,
      employeeName: 'Michael Chen',
      position: 'Senior Associate Attorney',
      department: 'Legal',
      reviewPeriod: '2025 Annual Review',
      reviewType: 'Annual',
      status: 'completed',
      startDate: '2025-12-01',
      dueDate: '2025-12-31',
      completedDate: '2025-12-15',
      reviewer: 'Carl Douglas',
      selfReview: {
        completed: true,
        submittedDate: '2025-12-05',
        overallRating: 4.5,
        goals: [
          { goal: 'Increase case win rate to 90%', achievement: 'Achieved 92% win rate', rating: 5 },
          { goal: 'Mentor 2 junior attorneys', achievement: 'Successfully mentored Jennifer Davis and Alex Rodriguez', rating: 5 },
          { goal: 'Complete 1800 billable hours', achievement: 'Completed 1850 billable hours', rating: 4 }
        ],
        strengths: [
          'Exceptional case preparation and research skills',
          'Strong leadership and mentoring abilities',
          'Excellent client relationship management'
        ],
        improvements: [
          'Time management during busy periods',
          'Delegation of routine tasks'
        ],
        careerGoals: 'Seeking partnership track and expansion into complex civil rights cases'
      },
      managerReview: {
        completed: true,
        submittedDate: '2025-12-10',
        overallRating: 4.7,
        competencies: [
          { name: 'Legal Expertise', rating: 5, comments: 'Demonstrates exceptional legal knowledge and research skills' },
          { name: 'Client Service', rating: 5, comments: 'Clients consistently praise his communication and dedication' },
          { name: 'Leadership', rating: 4, comments: 'Natural leader, great mentor to junior staff' },
          { name: 'Teamwork', rating: 4, comments: 'Collaborative and supportive of colleagues' },
          { name: 'Innovation', rating: 4, comments: 'Brings fresh perspectives to case strategies' }
        ],
        achievements: [
          'Won 12 out of 13 cases this year',
          'Generated $2.1M in revenue',
          'Received excellent client feedback scores',
          'Successfully trained 2 new associates'
        ],
        developmentAreas: [
          'Strategic business development',
          'Advanced negotiation techniques'
        ],
        recommendations: 'Recommend for Senior Associate promotion and partnership track consideration'
      },
      peerFeedback: [
        {
          reviewer: 'Jennifer Davis',
          relationship: 'Direct Report',
          rating: 5,
          feedback: 'Michael is an excellent mentor. He provides clear guidance and is always available for questions. His legal expertise is outstanding.'
        },
        {
          reviewer: 'Sarah Mitchell',
          relationship: 'Colleague',
          rating: 4,
          feedback: 'Michael is highly professional and collaborative. He contributes valuable insights to our team discussions.'
        }
      ],
      goals2025: [
        {
          goal: 'Develop 3 new major clients',
          category: 'Business Development',
          target: 'Q4 2025',
          metrics: 'Client acquisition and revenue generation'
        },
        {
          goal: 'Complete Advanced Trial Advocacy certification',
          category: 'Professional Development',
          target: 'Q2 2025',
          metrics: 'Certification completion'
        },
        {
          goal: 'Lead firm diversity initiative',
          category: 'Leadership',
          target: 'Ongoing',
          metrics: 'Initiative launch and participation metrics'
        }
      ],
      finalRating: 4.6,
      promotionRecommended: true,
      salaryIncrease: 8.5,
      bonus: 15000
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: 'Jennifer Davis',
      position: 'Legal Assistant',
      department: 'Legal',
      reviewPeriod: '90-Day Review',
      reviewType: 'Probationary',
      status: 'in-progress',
      startDate: '2025-01-15',
      dueDate: '2025-02-01',
      completedDate: null,
      reviewer: 'Michael Chen',
      selfReview: {
        completed: true,
        submittedDate: '2025-01-18',
        overallRating: 4.0,
        goals: [
          { goal: 'Complete firm onboarding program', achievement: 'Completed all modules with 95% score', rating: 5 },
          { goal: 'Learn case management system', achievement: 'Proficient in all basic functions, learning advanced features', rating: 4 },
          { goal: 'Build client relationships', achievement: 'Received positive feedback from 8/10 clients', rating: 4 }
        ],
        strengths: [
          'Quick learner and adaptable',
          'Excellent attention to detail',
          'Strong communication skills'
        ],
        improvements: [
          'Legal terminology familiarity',
          'Time estimation for complex tasks'
        ],
        careerGoals: 'Become senior legal assistant and eventually pursue paralegal certification'
      },
      managerReview: {
        completed: false,
        submittedDate: null,
        overallRating: null,
        competencies: [],
        achievements: [],
        developmentAreas: [],
        recommendations: ''
      },
      peerFeedback: [],
      goals2025: [],
      finalRating: null,
      promotionRecommended: null,
      salaryIncrease: null,
      bonus: null
    },
    {
      id: 3,
      employeeId: 3,
      employeeName: 'Sarah Mitchell',
      position: 'HR Director',
      department: 'Human Resources',
      reviewPeriod: 'Q4 2025 Review',
      reviewType: 'Quarterly',
      status: 'scheduled',
      startDate: '2025-02-01',
      dueDate: '2025-02-15',
      completedDate: null,
      reviewer: 'Carl Douglas',
      selfReview: { completed: false },
      managerReview: { completed: false },
      peerFeedback: [],
      goals2025: [],
      finalRating: null,
      promotionRecommended: null,
      salaryIncrease: null,
      bonus: null
    }
  ];

  const performanceMetrics = {
    overallSatisfaction: 4.5,
    reviewCompletion: 85,
    goalAchievement: 78,
    promotionRate: 12,
    retentionRate: 94,
    averageRating: 4.3,
    feedbackParticipation: 92,
    developmentPlanCompletion: 71
  };

  const goalCategories = [
    'Professional Development',
    'Performance Improvement',
    'Leadership',
    'Business Development',
    'Technical Skills',
    'Client Service',
    'Innovation',
    'Teamwork'
  ];

  const competencyFramework = [
    {
      category: 'Core Competencies',
      items: [
        { name: 'Communication', description: 'Clear, effective verbal and written communication' },
        { name: 'Problem Solving', description: 'Analytical thinking and creative solutions' },
        { name: 'Teamwork', description: 'Collaboration and support of colleagues' },
        { name: 'Adaptability', description: 'Flexibility and resilience in changing situations' },
        { name: 'Ethics & Integrity', description: 'Honest, ethical behavior and decision-making' }
      ]
    },
    {
      category: 'Leadership Competencies',
      items: [
        { name: 'Vision & Strategy', description: 'Strategic thinking and vision setting' },
        { name: 'People Development', description: 'Mentoring and developing others' },
        { name: 'Decision Making', description: 'Sound judgment and timely decisions' },
        { name: 'Change Management', description: 'Leading and managing organizational change' }
      ]
    },
    {
      category: 'Technical Competencies',
      items: [
        { name: 'Legal Expertise', description: 'Specialized legal knowledge and skills' },
        { name: 'Technology Proficiency', description: 'Effective use of legal technology' },
        { name: 'Research Skills', description: 'Thorough and efficient legal research' },
        { name: 'Client Service', description: 'Client relationship management and service' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'in-progress': return 'bg-blue-500/20 text-blue-400';
      case 'scheduled': return 'bg-yellow-500/20 text-yellow-400';
      case 'overdue': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-green-400';
    if (rating >= 4.0) return 'text-blue-400';
    if (rating >= 3.5) return 'text-yellow-400';
    return 'text-red-400';
  };

  const renderReviewsList = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center gap-4">
        <select
          value={reviewFilters.period}
          onChange={(e) => setReviewFilters({...reviewFilters, period: e.target.value})}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500"
        >
          <option value="all">All Periods</option>
          <option value="2025">2025</option>
          <option value="q4-2025">Q4 2025</option>
          <option value="annual">Annual Reviews</option>
          <option value="quarterly">Quarterly Reviews</option>
        </select>
        <select
          value={reviewFilters.status}
          onChange={(e) => setReviewFilters({...reviewFilters, status: e.target.value})}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
          <option value="scheduled">Scheduled</option>
          <option value="overdue">Overdue</option>
        </select>
        <select
          value={reviewFilters.department}
          onChange={(e) => setReviewFilters({...reviewFilters, department: e.target.value})}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500"
        >
          <option value="all">All Departments</option>
          <option value="legal">Legal</option>
          <option value="hr">Human Resources</option>
          <option value="admin">Administration</option>
        </select>
        <button
          onClick={() => setShowNewReview(true)}
          className="ml-auto px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Review
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid gap-6">
        {performanceReviews.map(review => (
          <div
            key={review.id}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all cursor-pointer"
            onClick={() => setSelectedReview(review)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {review.employeeName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">{review.employeeName}</h3>
                  <p className="text-gray-400 text-sm">{review.position}</p>
                  <p className="text-purple-400 text-sm">{review.reviewPeriod}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(review.status)}`}>
                  {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                </span>
                {review.finalRating && (
                  <div className="mt-2">
                    <span className={`text-2xl font-bold ${getRatingColor(review.finalRating)}`}>
                      {review.finalRating}
                    </span>
                    <span className="text-gray-400 text-sm">/5.0</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <p className="text-gray-400 text-xs">Review Type</p>
                <p className="text-white font-semibold">{review.reviewType}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-xs">Due Date</p>
                <p className="text-white font-semibold">{new Date(review.dueDate).toLocaleDateString()}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-xs">Reviewer</p>
                <p className="text-white font-semibold">{review.reviewer}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-xs">Progress</p>
                <div className="flex items-center gap-1">
                  {review.selfReview.completed && <CheckCircle className="w-4 h-4 text-green-400" />}
                  {review.managerReview.completed && <CheckCircle className="w-4 h-4 text-blue-400" />}
                  {review.peerFeedback.length > 0 && <CheckCircle className="w-4 h-4 text-purple-400" />}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>Self: {review.selfReview.completed ? '✓' : '○'}</span>
                <span>Manager: {review.managerReview.completed ? '✓' : '○'}</span>
                <span>Peers: {review.peerFeedback.length > 0 ? '✓' : '○'}</span>
              </div>
              <button className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1">
                View Details <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReviewDetail = () => {
    if (!selectedReview) return null;

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 p-8 rounded-t-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">{selectedReview.employeeName}</h2>
                <p className="text-purple-200 text-lg">{selectedReview.reviewPeriod}</p>
                <div className="flex items-center gap-4 mt-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedReview.status)}`}>
                    {selectedReview.status.charAt(0).toUpperCase() + selectedReview.status.slice(1)}
                  </span>
                  {selectedReview.finalRating && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300">Final Rating:</span>
                      <span className={`text-2xl font-bold ${getRatingColor(selectedReview.finalRating)}`}>
                        {selectedReview.finalRating}/5.0
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedReview(null)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {selectedReview.status === 'completed' ? (
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Self Review */}
                {selectedReview.selfReview.completed && (
                  <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-400" />
                      Self Assessment
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Overall Rating</span>
                        <span className={`text-xl font-bold ${getRatingColor(selectedReview.selfReview.overallRating)}`}>
                          {selectedReview.selfReview.overallRating}/5.0
                        </span>
                      </div>
                      
                      <div>
                        <h4 className="text-white font-medium mb-3">Goals Achievement</h4>
                        <div className="space-y-2">
                          {selectedReview.selfReview.goals.map((goal, index) => (
                            <div key={index} className="p-3 bg-gray-700 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-white text-sm font-medium">{goal.goal}</p>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < goal.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-gray-400 text-sm">{goal.achievement}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2">Strengths</h4>
                        <ul className="space-y-1">
                          {selectedReview.selfReview.strengths.map((strength, index) => (
                            <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2">Areas for Improvement</h4>
                        <ul className="space-y-1">
                          {selectedReview.selfReview.improvements.map((improvement, index) => (
                            <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                              <Target className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                              {improvement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Manager Review */}
                {selectedReview.managerReview.completed && (
                  <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-purple-400" />
                      Manager Assessment
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Overall Rating</span>
                        <span className={`text-xl font-bold ${getRatingColor(selectedReview.managerReview.overallRating)}`}>
                          {selectedReview.managerReview.overallRating}/5.0
                        </span>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-3">Competency Ratings</h4>
                        <div className="space-y-3">
                          {selectedReview.managerReview.competencies.map((comp, index) => (
                            <div key={index} className="p-3 bg-gray-700 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-white font-medium">{comp.name}</span>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < comp.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-gray-400 text-sm">{comp.comments}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2">Key Achievements</h4>
                        <ul className="space-y-1">
                          {selectedReview.managerReview.achievements.map((achievement, index) => (
                            <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                              <Trophy className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Peer Feedback */}
                {selectedReview.peerFeedback.length > 0 && (
                  <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-green-400" />
                      360° Peer Feedback
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedReview.peerFeedback.map((feedback, index) => (
                        <div key={index} className="p-4 bg-gray-700 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p className="text-white font-medium">{feedback.reviewer}</p>
                              <p className="text-gray-400 text-sm">{feedback.relationship}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm">{feedback.feedback}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2025 Goals */}
                {selectedReview.goals2025.length > 0 && (
                  <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-400" />
                      2025 Goals & Development Plan
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {selectedReview.goals2025.map((goal, index) => (
                        <div key={index} className="p-4 bg-gray-700 rounded-lg">
                          <div className="mb-3">
                            <h4 className="text-white font-medium">{goal.goal}</h4>
                            <span className="text-purple-400 text-sm">{goal.category}</span>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-300">Target: {goal.target}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <BarChart3 className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-300">Metrics: {goal.metrics}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Final Outcomes */}
                {selectedReview.status === 'completed' && (
                  <div className="lg:col-span-2 bg-gradient-to-r from-green-900/20 to-green-800/20 border border-green-500/30 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      Review Outcomes
                    </h3>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-gray-400 text-sm">Final Rating</p>
                        <p className={`text-2xl font-bold ${getRatingColor(selectedReview.finalRating)}`}>
                          {selectedReview.finalRating}/5.0
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-sm">Promotion</p>
                        <p className={`text-lg font-semibold ${
                          selectedReview.promotionRecommended ? 'text-green-400' : 'text-gray-400'
                        }`}>
                          {selectedReview.promotionRecommended ? 'Recommended' : 'Not This Cycle'}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-sm">Salary Increase</p>
                        <p className="text-lg font-semibold text-blue-400">
                          {selectedReview.salaryIncrease}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-sm">Bonus</p>
                        <p className="text-lg font-semibold text-yellow-400">
                          ${selectedReview.bonus?.toLocaleString() || 'TBD'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Review In Progress</h3>
                <p className="text-gray-400">This review is still being completed by all participants.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(performanceMetrics).map(([key, value]) => (
          <div key={key} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <p className="text-gray-400 text-sm capitalize mb-2">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </p>
            <p className="text-2xl font-bold text-white">
              {typeof value === 'number' ? (
                key.includes('Rate') || key.includes('Completion') || key.includes('Participation') 
                  ? `${value}%` 
                  : value
              ) : value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Review Status Distribution</h3>
          <div className="space-y-4">
            {[
              { status: 'completed', count: 1, percentage: 33.3 },
              { status: 'in-progress', count: 1, percentage: 33.3 },
              { status: 'scheduled', count: 1, percentage: 33.3 }
            ].map(item => (
              <div key={item.status}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 capitalize">{item.status.replace('-', ' ')}</span>
                  <span className="text-white font-semibold">{item.count} reviews</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      item.status === 'completed' ? 'bg-green-500' :
                      item.status === 'in-progress' ? 'bg-blue-500' :
                      'bg-yellow-500'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Rating Distribution</h3>
          <div className="space-y-4">
            {[
              { range: '4.5 - 5.0', label: 'Exceptional', count: 1, color: 'bg-green-500' },
              { range: '4.0 - 4.4', label: 'Exceeds Expectations', count: 1, color: 'bg-blue-500' },
              { range: '3.5 - 3.9', label: 'Meets Expectations', count: 0, color: 'bg-yellow-500' },
              { range: 'Below 3.5', label: 'Needs Improvement', count: 0, color: 'bg-red-500' }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-white">{item.label}</span>
                    <span className="text-gray-400 text-sm ml-2">({item.range})</span>
                  </div>
                  <span className="text-white font-semibold">{item.count}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${item.color}`}
                    style={{ width: `${item.count > 0 ? (item.count / 2) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderGoalsTracking = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-white font-semibold mb-6">Organization Goals & Development Plans</h3>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Goals by Category */}
          <div>
            <h4 className="text-white font-medium mb-4">Goals by Category</h4>
            <div className="space-y-3">
              {goalCategories.map((category, index) => (
                <div key={index} className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{category}</span>
                    <span className="text-gray-400 text-sm">
                      {Math.floor(Math.random() * 10) + 1} goals
                    </span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${Math.floor(Math.random() * 100) + 1}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Competency Framework */}
          <div>
            <h4 className="text-white font-medium mb-4">Competency Framework</h4>
            <div className="space-y-4">
              {competencyFramework.map((framework, index) => (
                <div key={index} className="p-4 bg-gray-700 rounded-lg">
                  <h5 className="text-white font-medium mb-3">{framework.category}</h5>
                  <div className="space-y-2">
                    {framework.items.slice(0, 3).map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                        <div>
                          <p className="text-white text-sm font-medium">{item.name}</p>
                          <p className="text-gray-400 text-xs">{item.description}</p>
                        </div>
                      </div>
                    ))}
                    {framework.items.length > 3 && (
                      <button className="text-purple-400 text-sm hover:text-purple-300">
                        View all {framework.items.length} competencies →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* View Selector */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Performance Management</h1>
        <div className="flex gap-2 bg-gray-800 p-1 rounded-lg">
          {[
            { id: 'reviews', label: 'Reviews', icon: Award },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'goals', label: 'Goals', icon: Target },
            { id: 'calibration', label: 'Calibration', icon: Users }
          ].map(view => {
            const Icon = view.icon;
            return (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                  activeView === view.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{view.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active View */}
      {activeView === 'reviews' && renderReviewsList()}
      {activeView === 'analytics' && renderAnalytics()}
      {activeView === 'goals' && renderGoalsTracking()}
      {activeView === 'calibration' && (
        <div className="bg-gray-800 rounded-xl p-8 text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Performance Calibration</h3>
          <p className="text-gray-400">Cross-team performance calibration and consistency reviews</p>
        </div>
      )}

      {/* Review Detail Modal */}
      {selectedReview && renderReviewDetail()}
    </div>
  );
}