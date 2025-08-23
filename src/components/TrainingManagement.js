'use client';

import { useState, useEffect } from 'react';
import { 
  GraduationCap, BookOpen, Play, Award, Target, Clock, Users,
  Star, TrendingUp, BarChart3, Calendar, Search, Filter, Plus,
  ChevronRight, ChevronDown, Eye, Edit3, Download, Upload,
  CheckCircle, AlertTriangle, Info, User, Building, Globe,
  Bookmark, Tag, Share2, Copy, ExternalLink, Trash2, Settings,
  Brain, Zap, Activity, MessageSquare, Video, FileText,
  Headphones, Monitor, Smartphone, Tablet, Trophy, Flag,
  Shield, Lock, Unlock, Bell, Mail, Phone, MapPin, Briefcase,
  Circle, X, ArrowUpRight, RefreshCw, Database, PieChart
} from 'lucide-react';

export default function TrainingManagement() {
  const [activeView, setActiveView] = useState('courses');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseDetail, setShowCourseDetail] = useState(false);
  const [showNewCourse, setShowNewCourse] = useState(false);
  const [showAssignments, setShowAssignments] = useState(false);

  // Comprehensive training data
  const trainingCategories = [
    { id: 'all', name: 'All Courses', count: 18, color: 'blue' },
    { id: 'legal', name: 'Legal Skills', count: 6, color: 'purple' },
    { id: 'compliance', name: 'Compliance', count: 4, color: 'red' },
    { id: 'technology', name: 'Technology', count: 3, color: 'green' },
    { id: 'leadership', name: 'Leadership', count: 3, color: 'orange' },
    { id: 'communication', name: 'Communication', count: 2, color: 'teal' }
  ];

  const courses = [
    {
      id: 1,
      title: 'Legal Research Fundamentals',
      category: 'legal',
      type: 'self_paced',
      level: 'beginner',
      duration: '4 hours',
      modules: 8,
      status: 'active',
      instructor: 'Michael Chen',
      description: 'Master the fundamentals of legal research including database navigation, case law analysis, and statutory interpretation.',
      thumbnail: '/api/placeholder/400/250',
      rating: 4.8,
      reviews: 24,
      enrolled: 35,
      completed: 28,
      completionRate: 80,
      createdDate: '2025-11-01',
      lastUpdated: '2025-12-15',
      tags: ['research', 'databases', 'case law', 'statutory'],
      skills: ['Legal Research', 'Case Analysis', 'Database Navigation', 'Citation'],
      prerequisites: [],
      certificationType: 'completion',
      cpdCredits: 4,
      content: {
        modules: [
          {
            id: 1,
            title: 'Introduction to Legal Research',
            duration: '30 min',
            type: 'video',
            completed: true,
            lessons: [
              { title: 'Overview of Legal Sources', duration: '10 min', type: 'video' },
              { title: 'Research Strategy Planning', duration: '15 min', type: 'interactive' },
              { title: 'Knowledge Check', duration: '5 min', type: 'quiz' }
            ]
          },
          {
            id: 2,
            title: 'Primary vs Secondary Sources',
            duration: '45 min',
            type: 'interactive',
            completed: true,
            lessons: [
              { title: 'Understanding Primary Sources', duration: '20 min', type: 'video' },
              { title: 'Secondary Source Analysis', duration: '20 min', type: 'reading' },
              { title: 'Practice Exercise', duration: '5 min', type: 'exercise' }
            ]
          },
          {
            id: 3,
            title: 'Database Navigation',
            duration: '60 min',
            type: 'hands_on',
            completed: false,
            lessons: [
              { title: 'Westlaw Basics', duration: '25 min', type: 'demo' },
              { title: 'LexisNexis Navigation', duration: '25 min', type: 'demo' },
              { title: 'Hands-on Practice', duration: '10 min', type: 'exercise' }
            ]
          }
        ]
      },
      assessments: [
        { type: 'quiz', title: 'Module 1 Quiz', passingScore: 80, attempts: 3 },
        { type: 'practical', title: 'Research Exercise', passingScore: 75, attempts: 2 },
        { type: 'final', title: 'Comprehensive Assessment', passingScore: 85, attempts: 1 }
      ],
      progress: {
        enrolled: 35,
        inProgress: 7,
        completed: 28,
        averageScore: 87,
        averageTime: '3.8 hours'
      }
    },
    {
      id: 2,
      title: 'Anti-Money Laundering (AML) Training',
      category: 'compliance',
      type: 'mandatory',
      level: 'intermediate',
      duration: '2 hours',
      modules: 4,
      status: 'active',
      instructor: 'Sarah Mitchell',
      description: 'Essential AML compliance training covering identification, reporting, and prevention of money laundering activities.',
      thumbnail: '/api/placeholder/400/250',
      rating: 4.6,
      reviews: 18,
      enrolled: 47,
      completed: 42,
      completionRate: 89,
      createdDate: '2025-10-15',
      lastUpdated: '2025-12-01',
      tags: ['AML', 'compliance', 'mandatory', 'reporting'],
      skills: ['AML Compliance', 'Risk Assessment', 'Reporting Procedures'],
      prerequisites: [],
      certificationType: 'certification',
      cpdCredits: 2,
      dueDate: '2025-02-01',
      renewalPeriod: '12 months',
      content: {
        modules: [
          {
            id: 1,
            title: 'AML Fundamentals',
            duration: '30 min',
            type: 'video',
            completed: true,
            lessons: [
              { title: 'What is Money Laundering?', duration: '15 min', type: 'video' },
              { title: 'Legal Framework', duration: '10 min', type: 'reading' },
              { title: 'Quiz: Fundamentals', duration: '5 min', type: 'quiz' }
            ]
          },
          {
            id: 2,
            title: 'Red Flags and Detection',
            duration: '45 min',
            type: 'interactive',
            completed: true,
            lessons: [
              { title: 'Common Red Flags', duration: '20 min', type: 'interactive' },
              { title: 'Case Studies', duration: '20 min', type: 'case_study' },
              { title: 'Detection Exercise', duration: '5 min', type: 'exercise' }
            ]
          }
        ]
      },
      assessments: [
        { type: 'quiz', title: 'Knowledge Check', passingScore: 90, attempts: 2 },
        { type: 'scenario', title: 'Scenario Analysis', passingScore: 85, attempts: 2 },
        { type: 'certification', title: 'AML Certification Exam', passingScore: 90, attempts: 1 }
      ],
      progress: {
        enrolled: 47,
        inProgress: 5,
        completed: 42,
        averageScore: 91,
        averageTime: '1.9 hours'
      }
    },
    {
      id: 3,
      title: 'Microsoft 365 for Legal Professionals',
      category: 'technology',
      type: 'self_paced',
      level: 'beginner',
      duration: '6 hours',
      modules: 12,
      status: 'active',
      instructor: 'Jennifer Davis',
      description: 'Comprehensive guide to using Microsoft 365 tools effectively in a legal environment.',
      thumbnail: '/api/placeholder/400/250',
      rating: 4.5,
      reviews: 22,
      enrolled: 29,
      completed: 19,
      completionRate: 66,
      createdDate: '2025-09-01',
      lastUpdated: '2025-11-30',
      tags: ['microsoft', 'office', 'productivity', 'collaboration'],
      skills: ['Word Advanced', 'Excel Analytics', 'Teams Collaboration', 'SharePoint'],
      prerequisites: ['Basic Computer Skills'],
      certificationType: 'completion',
      cpdCredits: 6,
      content: {
        modules: [
          {
            id: 1,
            title: 'Word for Legal Documents',
            duration: '60 min',
            type: 'hands_on',
            completed: false,
            lessons: [
              { title: 'Document Templates', duration: '20 min', type: 'demo' },
              { title: 'Track Changes & Comments', duration: '20 min', type: 'hands_on' },
              { title: 'Mail Merge for Legal', duration: '20 min', type: 'hands_on' }
            ]
          },
          {
            id: 2,
            title: 'Excel for Case Management',
            duration: '45 min',
            type: 'hands_on',
            completed: false,
            lessons: [
              { title: 'Data Organization', duration: '15 min', type: 'demo' },
              { title: 'Formulas & Functions', duration: '20 min', type: 'hands_on' },
              { title: 'Charts & Reporting', duration: '10 min', type: 'demo' }
            ]
          }
        ]
      },
      assessments: [
        { type: 'practical', title: 'Word Exercise', passingScore: 80, attempts: 3 },
        { type: 'practical', title: 'Excel Project', passingScore: 80, attempts: 3 },
        { type: 'final', title: 'Comprehensive Project', passingScore: 85, attempts: 2 }
      ],
      progress: {
        enrolled: 29,
        inProgress: 10,
        completed: 19,
        averageScore: 83,
        averageTime: '5.2 hours'
      }
    },
    {
      id: 4,
      title: 'Leadership in Legal Practice',
      category: 'leadership',
      type: 'instructor_led',
      level: 'advanced',
      duration: '8 hours',
      modules: 6,
      status: 'scheduled',
      instructor: 'Douglas Hicks',
      description: 'Advanced leadership skills for legal professionals including team management, client relations, and business development.',
      thumbnail: '/api/placeholder/400/250',
      rating: 4.9,
      reviews: 12,
      enrolled: 15,
      completed: 8,
      completionRate: 53,
      createdDate: '2025-08-15',
      lastUpdated: '2025-12-10',
      scheduledDates: ['2025-02-15', '2025-03-15', '2025-04-15'],
      tags: ['leadership', 'management', 'business development', 'advanced'],
      skills: ['Team Leadership', 'Client Management', 'Business Development', 'Strategic Thinking'],
      prerequisites: ['5+ years legal experience', 'Management role or aspiration'],
      certificationType: 'certification',
      cpdCredits: 8,
      content: {
        modules: [
          {
            id: 1,
            title: 'Leadership Foundations',
            duration: '90 min',
            type: 'workshop',
            completed: false,
            lessons: [
              { title: 'Leadership Styles Assessment', duration: '30 min', type: 'assessment' },
              { title: 'Vision and Strategy', duration: '45 min', type: 'workshop' },
              { title: 'Action Planning', duration: '15 min', type: 'planning' }
            ]
          }
        ]
      },
      assessments: [
        { type: 'presentation', title: 'Leadership Plan Presentation', passingScore: 85, attempts: 1 },
        { type: 'peer_review', title: 'Peer Leadership Evaluation', passingScore: 80, attempts: 1 },
        { type: 'capstone', title: 'Leadership Project', passingScore: 90, attempts: 1 }
      ],
      progress: {
        enrolled: 15,
        inProgress: 7,
        completed: 8,
        averageScore: 89,
        averageTime: '7.5 hours'
      }
    },
    {
      id: 5,
      title: 'Effective Client Communication',
      category: 'communication',
      type: 'blended',
      level: 'intermediate',
      duration: '3 hours',
      modules: 5,
      status: 'active',
      instructor: 'Sarah Mitchell',
      description: 'Master the art of client communication including difficult conversations, expectation management, and relationship building.',
      thumbnail: '/api/placeholder/400/250',
      rating: 4.7,
      reviews: 16,
      enrolled: 32,
      completed: 24,
      completionRate: 75,
      createdDate: '2025-07-01',
      lastUpdated: '2025-11-15',
      tags: ['communication', 'client relations', 'soft skills'],
      skills: ['Active Listening', 'Difficult Conversations', 'Expectation Management'],
      prerequisites: ['Client-facing role'],
      certificationType: 'completion',
      cpdCredits: 3,
      content: {
        modules: [
          {
            id: 1,
            title: 'Communication Fundamentals',
            duration: '40 min',
            type: 'video',
            completed: true,
            lessons: [
              { title: 'Active Listening Techniques', duration: '20 min', type: 'video' },
              { title: 'Non-Verbal Communication', duration: '15 min', type: 'interactive' },
              { title: 'Practice Scenarios', duration: '5 min', type: 'exercise' }
            ]
          }
        ]
      },
      assessments: [
        { type: 'role_play', title: 'Client Interaction Simulation', passingScore: 80, attempts: 2 },
        { type: 'reflection', title: 'Communication Reflection Paper', passingScore: 75, attempts: 1 }
      ],
      progress: {
        enrolled: 32,
        inProgress: 8,
        completed: 24,
        averageScore: 86,
        averageTime: '2.8 hours'
      }
    }
  ];

  const learningPaths = [
    {
      id: 1,
      title: 'New Associate Onboarding',
      description: 'Comprehensive training path for new legal associates',
      courses: [1, 2, 3, 5],
      duration: '15 hours',
      participants: 12,
      completionRate: 83,
      status: 'active'
    },
    {
      id: 2,
      title: 'Leadership Development Track',
      description: 'Advanced leadership skills for senior professionals',
      courses: [4, 5],
      duration: '11 hours',
      participants: 8,
      completionRate: 62,
      status: 'active'
    },
    {
      id: 3,
      title: 'Technology Proficiency',
      description: 'Essential technology skills for modern legal practice',
      courses: [3],
      duration: '6 hours',
      participants: 15,
      completionRate: 66,
      status: 'active'
    }
  ];

  const certifications = [
    {
      id: 1,
      title: 'Legal Research Specialist',
      description: 'Professional certification in legal research methodologies',
      requirements: ['Complete Legal Research Fundamentals', 'Pass certification exam'],
      earned: 18,
      expiration: '2 years',
      cpdCredits: 10,
      status: 'active'
    },
    {
      id: 2,
      title: 'AML Compliance Officer',
      description: 'Certified anti-money laundering compliance professional',
      requirements: ['Complete AML Training', 'Pass certification exam', '1 year renewal'],
      earned: 34,
      expiration: '1 year',
      cpdCredits: 5,
      status: 'mandatory'
    },
    {
      id: 3,
      title: 'Technology Integration Leader',
      description: 'Advanced certification in legal technology implementation',
      requirements: ['Complete Technology courses', 'Lead implementation project'],
      earned: 6,
      expiration: '3 years',
      cpdCredits: 15,
      status: 'active'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'scheduled': return 'bg-blue-500/20 text-blue-400';
      case 'draft': return 'bg-yellow-500/20 text-yellow-400';
      case 'archived': return 'bg-gray-500/20 text-gray-400';
      case 'mandatory': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'legal': 'bg-purple-500/20 text-purple-400',
      'compliance': 'bg-red-500/20 text-red-400',
      'technology': 'bg-green-500/20 text-green-400',
      'leadership': 'bg-orange-500/20 text-orange-400',
      'communication': 'bg-teal-500/20 text-teal-400'
    };
    return colors[category] || 'bg-gray-500/20 text-gray-400';
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderCourseLibrary = () => (
    <div className="space-y-6">
      {/* Course Categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {trainingCategories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`p-4 rounded-xl border text-center transition-all duration-200 ${
              selectedCategory === category.id
                ? 'border-purple-500 bg-purple-900/30'
                : 'border-gray-700 bg-gray-800 hover:border-gray-600'
            }`}
          >
            <div className="text-2xl font-bold text-white">{category.count}</div>
            <div className="text-sm text-gray-400">{category.name}</div>
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500"
            />
          </div>
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500">
            <option>All Levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
        <button
          onClick={() => setShowNewCourse(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Course
        </button>
      </div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <div key={course.id} className="bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-purple-900/30 to-blue-900/30 flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-gray-400" />
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">{course.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(course.status)}`}>
                      {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(course.category)}`}>
                      {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-white">{course.rating}</span>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white ml-1">{course.duration}</span>
                </div>
                <div>
                  <span className="text-gray-400">Level:</span>
                  <span className="text-white ml-1 capitalize">{course.level}</span>
                </div>
                <div>
                  <span className="text-gray-400">Modules:</span>
                  <span className="text-white ml-1">{course.modules}</span>
                </div>
                <div>
                  <span className="text-gray-400">Enrolled:</span>
                  <span className="text-white ml-1">{course.enrolled}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Completion Rate</span>
                  <span className="text-white">{course.completionRate}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${course.completionRate}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedCourse(course);
                    setShowCourseDetail(true);
                  }}
                  className="flex-1 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold"
                >
                  View Course
                </button>
                <button className="px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                  <Play className="w-4 h-4" />
                </button>
              </div>

              {course.tags && (
                <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-gray-700">
                  {course.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                  {course.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                      +{course.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLearningPaths = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Learning Paths</h2>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Path
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {learningPaths.map(path => (
          <div key={path.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{path.title}</h3>
                <p className="text-gray-400">{path.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(path.status)}`}>
                {path.status.charAt(0).toUpperCase() + path.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{path.courses.length}</p>
                <p className="text-sm text-gray-400">Courses</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{path.participants}</p>
                <p className="text-sm text-gray-400">Participants</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{path.completionRate}%</p>
                <p className="text-sm text-gray-400">Completion</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <h4 className="text-white font-semibold">Included Courses:</h4>
              {path.courses.map((courseId, index) => {
                const course = courses.find(c => c.id === courseId);
                return (
                  <div key={courseId} className="flex items-center gap-3 p-2 bg-gray-700 rounded-lg">
                    <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="text-white flex-1">{course?.title}</span>
                    <span className="text-gray-400 text-sm">{course?.duration}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                Enroll Users
              </button>
              <button className="px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCertifications = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Certifications</h2>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
          <Award className="w-4 h-4" />
          New Certification
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {certifications.map(cert => (
          <div key={cert.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{cert.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(cert.status)}`}>
                    {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-400 mb-6">{cert.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-400 text-sm">Earned By</p>
                <p className="text-2xl font-bold text-white">{cert.earned}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">CPD Credits</p>
                <p className="text-2xl font-bold text-white">{cert.cpdCredits}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <h4 className="text-white font-semibold">Requirements:</h4>
              {cert.requirements.map((req, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300 text-sm">{req}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <span className="text-gray-400">Expiration:</span>
              <span className="text-white font-semibold">{cert.expiration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Total Courses</p>
          <p className="text-3xl font-bold text-white">{courses.length}</p>
          <div className="flex items-center gap-2 mt-2">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm">Active</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Total Enrollments</p>
          <p className="text-3xl font-bold text-white">158</p>
          <div className="flex items-center gap-2 mt-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">+15% this month</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Avg. Completion Rate</p>
          <p className="text-3xl font-bold text-white">74%</p>
          <div className="flex items-center gap-2 mt-2">
            <Target className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-sm">Above target</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">CPD Credits Earned</p>
          <p className="text-3xl font-bold text-white">342</p>
          <div className="flex items-center gap-2 mt-2">
            <Award className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 text-sm">This year</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Course Popularity</h3>
          <div className="space-y-4">
            {courses.slice(0, 5).map(course => (
              <div key={course.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-white font-medium">{course.title}</p>
                  <p className="text-gray-400 text-sm">{course.enrolled} enrollments</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${(course.enrolled / 50) * 100}%` }}
                    />
                  </div>
                  <span className="text-white font-semibold w-8">{course.enrolled}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Learning Progress</h3>
          <div className="h-64 flex items-center justify-center">
            <PieChart className="w-16 h-16 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* View Selector */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Training & Development</h1>
        <div className="flex gap-2 bg-gray-800 p-1 rounded-lg">
          {[
            { id: 'courses', label: 'Courses', icon: BookOpen },
            { id: 'paths', label: 'Learning Paths', icon: Target },
            { id: 'certifications', label: 'Certifications', icon: Award },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 }
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
      {activeView === 'courses' && renderCourseLibrary()}
      {activeView === 'paths' && renderLearningPaths()}
      {activeView === 'certifications' && renderCertifications()}
      {activeView === 'analytics' && renderAnalytics()}

      {/* Course Detail Modal */}
      {showCourseDetail && selectedCourse && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedCourse.title}</h3>
                  <p className="text-gray-400 mt-1">By {selectedCourse.instructor}</p>
                </div>
                <button
                  onClick={() => setShowCourseDetail(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="h-64 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                    <BookOpen className="w-24 h-24 text-gray-400" />
                  </div>
                  
                  <h4 className="text-white font-semibold mb-4">Course Description</h4>
                  <p className="text-gray-400 mb-6">{selectedCourse.description}</p>
                  
                  <h4 className="text-white font-semibold mb-4">Course Modules</h4>
                  <div className="space-y-3">
                    {selectedCourse.content.modules.map((module, index) => (
                      <div key={module.id} className="p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-white font-medium">{module.title}</h5>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400 text-sm">{module.duration}</span>
                            {module.completed ? (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                        <div className="space-y-2">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div key={lessonIndex} className="flex items-center justify-between text-sm">
                              <span className="text-gray-400">{lesson.title}</span>
                              <span className="text-gray-500">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="bg-gray-800 rounded-xl p-6 mb-6">
                    <h4 className="text-white font-semibold mb-4">Course Information</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Duration</span>
                        <span className="text-white">{selectedCourse.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Level</span>
                        <span className="text-white capitalize">{selectedCourse.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type</span>
                        <span className="text-white capitalize">{selectedCourse.type.replace('_', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">CPD Credits</span>
                        <span className="text-white">{selectedCourse.cpdCredits}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Rating</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white">{selectedCourse.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 rounded-xl p-6 mb-6">
                    <h4 className="text-white font-semibold mb-4">Progress Stats</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-400">Completion Rate</span>
                          <span className="text-white">{selectedCourse.completionRate}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${selectedCourse.completionRate}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-xl font-bold text-white">{selectedCourse.enrolled}</p>
                          <p className="text-gray-400 text-sm">Enrolled</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-white">{selectedCourse.completed}</p>
                          <p className="text-gray-400 text-sm">Completed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <button className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                      Enroll Users
                    </button>
                    <button className="w-full py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold">
                      Preview Course
                    </button>
                    <button className="w-full py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold">
                      Download Materials
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}