'use client';

import { useState, useEffect } from 'react';
import { 
  UserPlus, Users, Briefcase, Calendar, Clock, TrendingUp, CheckCircle,
  Plus, Edit3, Eye, Download, Search, Filter, X, ChevronRight, ChevronDown,
  ArrowUpRight, RefreshCw, Settings, Info, User, Building, Globe, Star,
  Flag, BookOpen, Archive, RotateCcw, Send, MessageSquare, Bookmark, Tag,
  Share2, Copy, ExternalLink, Trash2, Brain, Zap, Activity, BarChart3,
  PieChart, Target, Phone, Mail, MapPin, Shield, Award, DollarSign,
  FileText, Database, Calculator, CreditCard, Wallet, Heart, Umbrella,
  Baby, GraduationCap, Home, Car, Plane, Sun, Moon, Coffee, TreePine,
  AlertTriangle, Video, Mic, Upload, FileCheck, ClipboardCheck,
  ThumbsUp, ThumbsDown, MessageCircle, StarIcon, TrendingDown
} from 'lucide-react';

export default function RecruitmentManagement() {
  const [activeView, setActiveView] = useState('positions');
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [showPositionDetail, setShowPositionDetail] = useState(false);
  const [showCandidateDetail, setShowCandidateDetail] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showNewPosition, setShowNewPosition] = useState(false);

  // Comprehensive recruitment data
  const recruitmentMetrics = {
    activePositions: 5,
    totalCandidates: 127,
    inReview: 23,
    interviewed: 15,
    offers: 3,
    hires: 2,
    averageTimeToHire: 18, // days
    costPerHire: 4200,
    offerAcceptanceRate: 85,
    diversityHiring: 42 // percentage
  };

  const jobPositions = [
    {
      id: 1,
      title: 'Senior Associate Attorney',
      department: 'Legal',
      location: 'San Francisco, CA',
      type: 'Full-time',
      level: 'Senior',
      salary: {
        min: 160000,
        max: 200000,
        currency: 'USD'
      },
      status: 'active',
      openDate: '2025-12-01',
      targetCloseDate: '2025-02-15',
      urgency: 'high',
      applicants: 45,
      inReview: 12,
      interviewed: 8,
      offers: 1,
      hired: 0,
      description: 'Seeking an experienced attorney to join our growing litigation practice. Handle complex commercial disputes and provide strategic counsel to clients.',
      requirements: [
        'JD from accredited law school',
        '5-8 years litigation experience',
        'California Bar admission required',
        'Experience with commercial litigation',
        'Strong writing and oral advocacy skills',
        'Business development potential'
      ],
      responsibilities: [
        'Manage complex litigation matters from inception to resolution',
        'Draft pleadings, motions, and discovery documents',
        'Take and defend depositions',
        'Represent clients in court proceedings',
        'Collaborate with senior partners on case strategy',
        'Mentor junior associates and law clerks'
      ],
      hiring_manager: 'Douglas Hicks',
      recruiter: 'Sarah Mitchell',
      postings: [
        { platform: 'Company Website', status: 'active', posted: '2025-12-01' },
        { platform: 'LinkedIn', status: 'active', posted: '2025-12-02' },
        { platform: 'Indeed', status: 'active', posted: '2025-12-03' },
        { platform: 'Legal Jobs', status: 'active', posted: '2025-12-05' }
      ],
      workflow: {
        currentStep: 'active_recruiting',
        steps: [
          { step: 'requisition_approved', status: 'completed', date: '2025-11-28' },
          { step: 'job_posted', status: 'completed', date: '2025-12-01' },
          { step: 'active_recruiting', status: 'in_progress', date: '2025-12-01' },
          { step: 'offer_stage', status: 'pending', date: null },
          { step: 'filled', status: 'pending', date: null }
        ]
      }
    },
    {
      id: 2,
      title: 'Paralegal',
      department: 'Legal',
      location: 'San Francisco, CA',
      type: 'Full-time',
      level: 'Mid-level',
      salary: {
        min: 65000,
        max: 85000,
        currency: 'USD'
      },
      status: 'active',
      openDate: '2025-12-15',
      targetCloseDate: '2025-01-31',
      urgency: 'medium',
      applicants: 32,
      inReview: 8,
      interviewed: 5,
      offers: 1,
      hired: 0,
      description: 'Detail-oriented paralegal to support our legal team with case management, document preparation, and client communication.',
      requirements: [
        'Paralegal certificate or equivalent experience',
        '3-5 years paralegal experience',
        'Litigation support experience preferred',
        'Proficiency in legal research tools',
        'Strong organizational skills',
        'Excellent written communication'
      ],
      responsibilities: [
        'Assist attorneys with case preparation',
        'Conduct legal research and fact investigation',
        'Draft correspondence and legal documents',
        'Manage case files and documentation',
        'Coordinate with clients and opposing counsel',
        'Maintain case calendars and deadlines'
      ],
      hiring_manager: 'Michael Chen',
      recruiter: 'Sarah Mitchell',
      postings: [
        { platform: 'Company Website', status: 'active', posted: '2025-12-15' },
        { platform: 'Indeed', status: 'active', posted: '2025-12-16' },
        { platform: 'ZipRecruiter', status: 'active', posted: '2025-12-17' }
      ],
      workflow: {
        currentStep: 'offer_stage',
        steps: [
          { step: 'requisition_approved', status: 'completed', date: '2025-12-10' },
          { step: 'job_posted', status: 'completed', date: '2025-12-15' },
          { step: 'active_recruiting', status: 'completed', date: '2025-12-15' },
          { step: 'offer_stage', status: 'in_progress', date: '2025-01-10' },
          { step: 'filled', status: 'pending', date: null }
        ]
      }
    },
    {
      id: 3,
      title: 'Legal Administrative Assistant',
      department: 'Administration',
      location: 'San Francisco, CA',
      type: 'Full-time',
      level: 'Entry-level',
      salary: {
        min: 45000,
        max: 55000,
        currency: 'USD'
      },
      status: 'filled',
      openDate: '2025-11-01',
      targetCloseDate: '2025-12-15',
      urgency: 'low',
      applicants: 28,
      inReview: 6,
      interviewed: 3,
      offers: 1,
      hired: 1,
      description: 'Administrative support for legal team including calendar management, document preparation, and client communication.',
      requirements: [
        'High school diploma or equivalent',
        '2+ years administrative experience',
        'Legal office experience preferred',
        'Proficiency in Microsoft Office',
        'Strong attention to detail',
        'Professional communication skills'
      ],
      responsibilities: [
        'Provide administrative support to legal team',
        'Manage attorney calendars and appointments',
        'Prepare and format legal documents',
        'Handle client intake and communications',
        'Maintain filing systems and databases',
        'Coordinate meetings and court appearances'
      ],
      hiring_manager: 'Sarah Mitchell',
      recruiter: 'Sarah Mitchell',
      postings: [
        { platform: 'Company Website', status: 'closed', posted: '2025-11-01' },
        { platform: 'Indeed', status: 'closed', posted: '2025-11-02' }
      ],
      workflow: {
        currentStep: 'filled',
        steps: [
          { step: 'requisition_approved', status: 'completed', date: '2025-10-25' },
          { step: 'job_posted', status: 'completed', date: '2025-11-01' },
          { step: 'active_recruiting', status: 'completed', date: '2025-11-01' },
          { step: 'offer_stage', status: 'completed', date: '2025-11-20' },
          { step: 'filled', status: 'completed', date: '2025-12-01' }
        ]
      }
    }
  ];

  const candidates = [
    {
      id: 1,
      name: 'Alexandra Rodriguez',
      email: 'alexandra.rodriguez@email.com',
      phone: '(555) 123-4567',
      location: 'San Francisco, CA',
      positionId: 1,
      positionTitle: 'Senior Associate Attorney',
      source: 'LinkedIn',
      appliedDate: '2025-12-05',
      status: 'interview_scheduled',
      stage: 'phone_screen',
      experience: 7,
      currentRole: 'Associate Attorney at Wilson & Associates',
      salary_expectation: 180000,
      availability: '2 weeks notice',
      resume_url: '/resumes/alexandra_rodriguez.pdf',
      cover_letter: 'I am excited to apply for the Senior Associate position...',
      skills: [
        'Commercial Litigation',
        'Contract Disputes',
        'Discovery Management',
        'Oral Advocacy',
        'Client Relations',
        'Team Leadership'
      ],
      education: [
        {
          degree: 'JD',
          school: 'Stanford Law School',
          year: 2017,
          gpa: 3.8
        },
        {
          degree: 'BA Political Science',
          school: 'UC Berkeley',
          year: 2014,
          gpa: 3.9
        }
      ],
      work_history: [
        {
          company: 'Wilson & Associates',
          title: 'Associate Attorney',
          duration: '2020 - Present',
          description: 'Handle complex commercial litigation matters, manage discovery process, represent clients in depositions and court proceedings.'
        },
        {
          company: 'Smith & Partners LLP',
          title: 'Junior Associate',
          duration: '2017 - 2020',
          description: 'Supported senior attorneys in litigation matters, drafted pleadings and motions, conducted legal research.'
        }
      ],
      interview_history: [
        {
          type: 'phone_screen',
          interviewer: 'Sarah Mitchell',
          date: '2025-12-12',
          duration: 30,
          status: 'completed',
          rating: 4.5,
          notes: 'Strong candidate with excellent litigation experience. Very articulate and professional.',
          feedback: 'Definitely move forward to next round'
        },
        {
          type: 'panel_interview',
          interviewer: 'Douglas Hicks, Michael Chen',
          date: '2025-12-18',
          duration: 60,
          status: 'scheduled',
          rating: null,
          notes: null,
          feedback: null
        }
      ],
      assessments: [
        {
          type: 'legal_writing',
          score: 92,
          max_score: 100,
          completed_date: '2025-12-10',
          notes: 'Excellent legal writing skills, clear and persuasive arguments'
        }
      ],
      references: [
        {
          name: 'Robert Wilson',
          title: 'Senior Partner',
          company: 'Wilson & Associates',
          relationship: 'Direct Supervisor',
          contact_status: 'pending'
        },
        {
          name: 'Maria Santos',
          title: 'Associate',
          company: 'Wilson & Associates',
          relationship: 'Colleague',
          contact_status: 'not_contacted'
        }
      ],
      notes: [
        {
          author: 'Sarah Mitchell',
          date: '2025-12-05',
          content: 'Strong resume, excellent background. Moving to phone screen.'
        },
        {
          author: 'Sarah Mitchell',
          date: '2025-12-12',
          content: 'Phone screen went very well. Candidate is articulate and has strong litigation experience. Scheduling panel interview.'
        }
      ]
    },
    {
      id: 2,
      name: 'James Thompson',
      email: 'james.thompson@email.com',
      phone: '(555) 234-5678',
      location: 'Oakland, CA',
      positionId: 2,
      positionTitle: 'Paralegal',
      source: 'Indeed',
      appliedDate: '2025-12-18',
      status: 'offer_extended',
      stage: 'final_interview',
      experience: 5,
      currentRole: 'Senior Paralegal at Legal Services Inc',
      salary_expectation: 75000,
      availability: '3 weeks notice',
      resume_url: '/resumes/james_thompson.pdf',
      cover_letter: 'With five years of paralegal experience...',
      skills: [
        'Litigation Support',
        'Legal Research',
        'Document Management',
        'Client Communication',
        'Case Preparation',
        'E-Discovery'
      ],
      education: [
        {
          degree: 'Paralegal Certificate',
          school: 'UC Davis Extension',
          year: 2019,
          gpa: null
        },
        {
          degree: 'BA English',
          school: 'San Francisco State University',
          year: 2017,
          gpa: 3.6
        }
      ],
      work_history: [
        {
          company: 'Legal Services Inc',
          title: 'Senior Paralegal',
          duration: '2021 - Present',
          description: 'Lead paralegal supporting 3 attorneys, manage complex litigation files, coordinate discovery process.'
        },
        {
          company: 'Bay Area Legal Group',
          title: 'Paralegal',
          duration: '2019 - 2021',
          description: 'Supported personal injury attorneys, managed client communications, prepared court filings.'
        }
      ],
      interview_history: [
        {
          type: 'phone_screen',
          interviewer: 'Sarah Mitchell',
          date: '2025-12-20',
          duration: 30,
          status: 'completed',
          rating: 4.0,
          notes: 'Good experience, seems reliable and detail-oriented.',
          feedback: 'Move to next round'
        },
        {
          type: 'in_person',
          interviewer: 'Michael Chen',
          date: '2025-01-08',
          duration: 45,
          status: 'completed',
          rating: 4.5,
          notes: 'Very impressed with organizational skills and litigation support experience. Good cultural fit.',
          feedback: 'Strong recommendation to hire'
        }
      ],
      assessments: [
        {
          type: 'skills_assessment',
          score: 88,
          max_score: 100,
          completed_date: '2025-12-22',
          notes: 'Strong performance on legal research and document review tasks'
        }
      ],
      references: [
        {
          name: 'Linda Chen',
          title: 'Senior Attorney',
          company: 'Legal Services Inc',
          relationship: 'Direct Supervisor',
          contact_status: 'positive_feedback'
        }
      ],
      notes: [
        {
          author: 'Sarah Mitchell',
          date: '2025-12-18',
          content: 'Resume looks good, scheduling phone screen.'
        },
        {
          author: 'Michael Chen',
          date: '2025-01-08',
          content: 'Excellent interview. Candidate has strong experience and would be a great addition to the team. Recommending offer.'
        }
      ]
    },
    {
      id: 3,
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '(555) 345-6789',
      location: 'San Jose, CA',
      positionId: 1,
      positionTitle: 'Senior Associate Attorney',
      source: 'Company Website',
      appliedDate: '2025-12-08',
      status: 'under_review',
      stage: 'application_review',
      experience: 6,
      currentRole: 'Associate at Big Law Firm',
      salary_expectation: 195000,
      availability: '4 weeks notice',
      resume_url: '/resumes/maria_garcia.pdf',
      cover_letter: 'I am writing to express my interest...',
      skills: [
        'Securities Litigation',
        'Corporate Law',
        'Regulatory Compliance',
        'Due Diligence',
        'M&A Transactions',
        'Client Advisory'
      ],
      education: [
        {
          degree: 'JD',
          school: 'Harvard Law School',
          year: 2018,
          gpa: 3.7
        },
        {
          degree: 'MBA',
          school: 'Wharton Business School',
          year: 2015,
          gpa: 3.8
        }
      ],
      work_history: [
        {
          company: 'BigLaw Partners LLP',
          title: 'Associate',
          duration: '2018 - Present',
          description: 'Corporate and securities law practice, handle M&A transactions, regulatory compliance matters.'
        }
      ],
      interview_history: [],
      assessments: [],
      references: [],
      notes: [
        {
          author: 'Sarah Mitchell',
          date: '2025-12-08',
          content: 'Strong background but more corporate focused. Need to assess litigation experience.'
        }
      ]
    }
  ];

  const interviewSchedule = [
    {
      id: 1,
      candidateId: 1,
      candidateName: 'Alexandra Rodriguez',
      positionTitle: 'Senior Associate Attorney',
      type: 'panel_interview',
      date: '2025-12-18',
      time: '2:00 PM',
      duration: 60,
      location: 'Conference Room A',
      interviewers: ['Douglas Hicks', 'Michael Chen'],
      status: 'scheduled',
      agenda: [
        'Introduction and background review (10 min)',
        'Litigation experience discussion (20 min)',
        'Case study exercise (20 min)',
        'Questions from candidate (10 min)'
      ]
    },
    {
      id: 2,
      candidateId: 4,
      candidateName: 'Robert Kim',
      positionTitle: 'Senior Associate Attorney',
      type: 'phone_screen',
      date: '2025-12-19',
      time: '10:00 AM',
      duration: 30,
      location: 'Phone',
      interviewers: ['Sarah Mitchell'],
      status: 'scheduled',
      agenda: [
        'Background and motivation (10 min)',
        'Experience overview (15 min)',
        'Next steps discussion (5 min)'
      ]
    }
  ];

  const sourcingChannels = [
    {
      channel: 'LinkedIn',
      applications: 45,
      interviews: 12,
      hires: 3,
      cost: 2500,
      effectiveness: 85,
      timeToHire: 16
    },
    {
      channel: 'Indeed',
      applications: 32,
      interviews: 8,
      hires: 2,
      cost: 800,
      effectiveness: 78,
      timeToHire: 14
    },
    {
      channel: 'Company Website',
      applications: 28,
      interviews: 9,
      hires: 2,
      cost: 0,
      effectiveness: 82,
      timeToHire: 12
    },
    {
      channel: 'Employee Referral',
      applications: 15,
      interviews: 8,
      hires: 4,
      cost: 2000,
      effectiveness: 95,
      timeToHire: 10
    },
    {
      channel: 'Legal Job Boards',
      applications: 7,
      interviews: 3,
      hires: 1,
      cost: 1200,
      effectiveness: 88,
      timeToHire: 18
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'filled': return 'bg-blue-500/20 text-blue-400';
      case 'on_hold': return 'bg-yellow-500/20 text-yellow-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      case 'interview_scheduled': return 'bg-blue-500/20 text-blue-400';
      case 'offer_extended': return 'bg-purple-500/20 text-purple-400';
      case 'under_review': return 'bg-yellow-500/20 text-yellow-400';
      case 'rejected': return 'bg-red-500/20 text-red-400';
      case 'hired': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const renderJobPositions = () => (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search positions..."
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500"
            />
          </div>
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500">
            <option>All Status</option>
            <option>Active</option>
            <option>Filled</option>
            <option>On Hold</option>
          </select>
        </div>
        <button
          onClick={() => setShowNewPosition(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Position
        </button>
      </div>

      {/* Positions List */}
      <div className="space-y-4">
        {jobPositions.map(position => (
          <div key={position.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white">{position.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(position.status)}`}>
                    {position.status.replace('_', ' ').charAt(0).toUpperCase() + position.status.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getUrgencyColor(position.urgency)}`}>
                    {position.urgency.charAt(0).toUpperCase() + position.urgency.slice(1)}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                  <span>{position.department}</span>
                  <span>•</span>
                  <span>{position.location}</span>
                  <span>•</span>
                  <span>{position.type}</span>
                  <span>•</span>
                  <span>${position.salary.min.toLocaleString()} - ${position.salary.max.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedPosition(position);
                    setShowPositionDetail(true);
                  }}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-700 rounded-lg">
                <p className="text-2xl font-bold text-white">{position.applicants}</p>
                <p className="text-gray-400 text-sm">Applications</p>
              </div>
              <div className="text-center p-3 bg-gray-700 rounded-lg">
                <p className="text-2xl font-bold text-white">{position.inReview}</p>
                <p className="text-gray-400 text-sm">In Review</p>
              </div>
              <div className="text-center p-3 bg-gray-700 rounded-lg">
                <p className="text-2xl font-bold text-white">{position.interviewed}</p>
                <p className="text-gray-400 text-sm">Interviewed</p>
              </div>
              <div className="text-center p-3 bg-gray-700 rounded-lg">
                <p className="text-2xl font-bold text-white">{position.offers}</p>
                <p className="text-gray-400 text-sm">Offers</p>
              </div>
              <div className="text-center p-3 bg-gray-700 rounded-lg">
                <p className="text-2xl font-bold text-white">{position.hired}</p>
                <p className="text-gray-400 text-sm">Hired</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-400">Open: {position.openDate}</span>
                <span className="text-gray-400">Target Close: {position.targetCloseDate}</span>
                <span className="text-gray-400">Hiring Manager: {position.hiring_manager}</span>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                  View Candidates
                </button>
                <button className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-gray-600 transition-colors">
                  Edit Posting
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCandidates = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Candidate Pipeline</h2>
        <div className="flex gap-2">
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500">
            <option>All Positions</option>
            <option>Senior Associate Attorney</option>
            <option>Paralegal</option>
          </select>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Import Resumes
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {candidates.map(candidate => (
          <div key={candidate.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{candidate.name}</h3>
                  <p className="text-gray-400">{candidate.currentRole}</p>
                  <p className="text-gray-500 text-sm">Applied: {candidate.appliedDate} • Source: {candidate.source}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(candidate.status)}`}>
                  {candidate.status.replace('_', ' ').charAt(0).toUpperCase() + candidate.status.slice(1)}
                </span>
                <button
                  onClick={() => {
                    setSelectedCandidate(candidate);
                    setShowCandidateDetail(true);
                  }}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-gray-400 text-sm">Position</p>
                <p className="text-white font-semibold">{candidate.positionTitle}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Experience</p>
                <p className="text-white font-semibold">{candidate.experience} years</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Location</p>
                <p className="text-white font-semibold">{candidate.location}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Salary Expectation</p>
                <p className="text-white font-semibold">${candidate.salary_expectation?.toLocaleString() || 'Not specified'}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-2">Skills</p>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.slice(0, 6).map(skill => (
                  <span key={skill} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                    {skill}
                  </span>
                ))}
                {candidate.skills.length > 6 && (
                  <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                    +{candidate.skills.length - 6} more
                  </span>
                )}
              </div>
            </div>

            {candidate.interview_history.length > 0 && (
              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-2">Interview Progress</p>
                <div className="space-y-2">
                  {candidate.interview_history.map((interview, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 bg-gray-700 rounded-lg text-sm">
                      <div className={`w-2 h-2 rounded-full ${
                        interview.status === 'completed' ? 'bg-green-400' : 
                        interview.status === 'scheduled' ? 'bg-blue-400' : 'bg-gray-400'
                      }`} />
                      <span className="text-white">{interview.type.replace('_', ' ').charAt(0).toUpperCase() + interview.type.slice(1)}</span>
                      <span className="text-gray-400">• {interview.date}</span>
                      {interview.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span className="text-white">{interview.rating}/5</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-400">Stage: {candidate.stage.replace('_', ' ')}</span>
                <span className="text-gray-400">Availability: {candidate.availability}</span>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                  Schedule Interview
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                  Send Message
                </button>
                <button className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-gray-600 transition-colors">
                  Move Stage
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInterviews = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Interview Schedule</h2>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Schedule Interview
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">This Week</h3>
          <p className="text-3xl font-bold text-white mb-2">12</p>
          <p className="text-gray-400 text-sm">Scheduled interviews</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Pending Feedback</h3>
          <p className="text-3xl font-bold text-white mb-2">5</p>
          <p className="text-gray-400 text-sm">Awaiting interviewer feedback</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Average Rating</h3>
          <p className="text-3xl font-bold text-white mb-2">4.2</p>
          <p className="text-gray-400 text-sm">Out of 5.0</p>
        </div>
      </div>

      <div className="space-y-4">
        {interviewSchedule.map(interview => (
          <div key={interview.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{interview.candidateName}</h3>
                <p className="text-gray-400 mb-2">{interview.positionTitle}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{interview.type.replace('_', ' ').charAt(0).toUpperCase() + interview.type.slice(1)}</span>
                  <span>•</span>
                  <span>{interview.date} at {interview.time}</span>
                  <span>•</span>
                  <span>{interview.duration} minutes</span>
                  <span>•</span>
                  <span>{interview.location}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(interview.status)}`}>
                {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
              </span>
            </div>

            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-2">Interviewers</p>
              <div className="flex gap-2">
                {interview.interviewers.map(interviewer => (
                  <span key={interviewer} className="px-3 py-1 bg-gray-700 text-white rounded-lg text-sm">
                    {interviewer}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-2">Interview Agenda</p>
              <div className="space-y-1">
                {interview.agenda.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-700">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Join Video Call
              </button>
              <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm">
                Reschedule
              </button>
              <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm">
                Send Reminder
              </button>
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
          <p className="text-gray-400 text-sm mb-2">Time to Hire</p>
          <p className="text-3xl font-bold text-white">{recruitmentMetrics.averageTimeToHire}</p>
          <div className="flex items-center gap-2 mt-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm">days average</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Cost per Hire</p>
          <p className="text-3xl font-bold text-white">${recruitmentMetrics.costPerHire.toLocaleString()}</p>
          <div className="flex items-center gap-2 mt-2">
            <DollarSign className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">Below target</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Offer Acceptance</p>
          <p className="text-3xl font-bold text-white">{recruitmentMetrics.offerAcceptanceRate}%</p>
          <div className="flex items-center gap-2 mt-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">High rate</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Diversity Hiring</p>
          <p className="text-3xl font-bold text-white">{recruitmentMetrics.diversityHiring}%</p>
          <div className="flex items-center gap-2 mt-2">
            <Users className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-sm">Above target</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Sourcing Channel Effectiveness</h3>
          <div className="space-y-4">
            {sourcingChannels.map(channel => (
              <div key={channel.channel} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">{channel.channel}</span>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-white">{channel.applications} applications</span>
                    <span className="text-white">{channel.hires} hires</span>
                    <span className={`font-semibold ${
                      channel.effectiveness >= 90 ? 'text-green-400' :
                      channel.effectiveness >= 80 ? 'text-blue-400' :
                      'text-yellow-400'
                    }`}>
                      {channel.effectiveness}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${channel.effectiveness}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Cost: ${channel.cost.toLocaleString()}</span>
                  <span>Time to hire: {channel.timeToHire} days</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Recruitment Funnel</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <span className="text-white">Applications</span>
              <span className="text-white font-bold">{recruitmentMetrics.totalCandidates}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <span className="text-white">In Review</span>
              <span className="text-white font-bold">{recruitmentMetrics.inReview}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <span className="text-white">Interviewed</span>
              <span className="text-white font-bold">{recruitmentMetrics.interviewed}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <span className="text-white">Offers Extended</span>
              <span className="text-white font-bold">{recruitmentMetrics.offers}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-900/30 border border-green-500/30 rounded-lg">
              <span className="text-green-300">Hired</span>
              <span className="text-green-400 font-bold">{recruitmentMetrics.hires}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-white font-semibold mb-4">Position Performance</h3>
        <div className="grid lg:grid-cols-3 gap-6">
          {jobPositions.filter(p => p.status === 'active').map(position => (
            <div key={position.id} className="p-4 bg-gray-700 rounded-lg">
              <h4 className="text-white font-medium mb-3">{position.title}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Applications</span>
                  <span className="text-white">{position.applicants}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Conversion Rate</span>
                  <span className="text-white">{Math.round((position.interviewed / position.applicants) * 100)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Days Open</span>
                  <span className="text-white">
                    {Math.ceil((new Date() - new Date(position.openDate)) / (1000 * 60 * 60 * 24))}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* View Selector */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Recruitment & ATS</h1>
        <div className="flex gap-2 bg-gray-800 p-1 rounded-lg">
          {[
            { id: 'positions', label: 'Positions', icon: Briefcase },
            { id: 'candidates', label: 'Candidates', icon: Users },
            { id: 'interviews', label: 'Interviews', icon: Calendar },
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
      {activeView === 'positions' && renderJobPositions()}
      {activeView === 'candidates' && renderCandidates()}
      {activeView === 'interviews' && renderInterviews()}
      {activeView === 'analytics' && renderAnalytics()}

      {/* Position Detail Modal */}
      {showPositionDetail && selectedPosition && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedPosition.title}</h3>
                  <p className="text-gray-400 mt-1">{selectedPosition.department} • {selectedPosition.location}</p>
                </div>
                <button
                  onClick={() => setShowPositionDetail(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h4 className="text-white font-semibold mb-4">Job Description</h4>
                  <p className="text-gray-400 mb-6">{selectedPosition.description}</p>
                  
                  <h4 className="text-white font-semibold mb-4">Requirements</h4>
                  <div className="space-y-2 mb-6">
                    {selectedPosition.requirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{req}</span>
                      </div>
                    ))}
                  </div>
                  
                  <h4 className="text-white font-semibold mb-4">Responsibilities</h4>
                  <div className="space-y-2">
                    {selectedPosition.responsibilities.map((resp, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0 mt-2" />
                        <span className="text-gray-300">{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="bg-gray-800 rounded-xl p-6 mb-6">
                    <h4 className="text-white font-semibold mb-4">Position Details</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type</span>
                        <span className="text-white">{selectedPosition.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Level</span>
                        <span className="text-white">{selectedPosition.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Salary Range</span>
                        <span className="text-white">
                          ${selectedPosition.salary.min.toLocaleString()} - ${selectedPosition.salary.max.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Hiring Manager</span>
                        <span className="text-white">{selectedPosition.hiring_manager}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Recruiter</span>
                        <span className="text-white">{selectedPosition.recruiter}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 rounded-xl p-6 mb-6">
                    <h4 className="text-white font-semibold mb-4">Recruitment Progress</h4>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-white">{selectedPosition.applicants}</p>
                        <p className="text-gray-400 text-sm">Applications</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">{selectedPosition.interviewed}</p>
                        <p className="text-gray-400 text-sm">Interviewed</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">{selectedPosition.offers}</p>
                        <p className="text-gray-400 text-sm">Offers</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">{selectedPosition.hired}</p>
                        <p className="text-gray-400 text-sm">Hired</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 rounded-xl p-6">
                    <h4 className="text-white font-semibold mb-4">Active Postings</h4>
                    <div className="space-y-3">
                      {selectedPosition.postings.map((posting, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-gray-400">{posting.platform}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(posting.status)}`}>
                            {posting.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-700">
                <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                  View Candidates
                </button>
                <button className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold">
                  Edit Position
                </button>
                <button className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold">
                  Share Posting
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Candidate Detail Modal */}
      {showCandidateDetail && selectedCandidate && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedCandidate.name}</h3>
                    <p className="text-gray-400 mt-1">{selectedCandidate.currentRole}</p>
                    <p className="text-gray-500 text-sm">{selectedCandidate.location}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCandidateDetail(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h4 className="text-white font-semibold mb-4">Cover Letter</h4>
                  <p className="text-gray-400 mb-6">{selectedCandidate.cover_letter}</p>
                  
                  <h4 className="text-white font-semibold mb-4">Work Experience</h4>
                  <div className="space-y-4 mb-6">
                    {selectedCandidate.work_history.map((job, index) => (
                      <div key={index} className="p-4 bg-gray-800 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="text-white font-medium">{job.title}</h5>
                          <span className="text-gray-400 text-sm">{job.duration}</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">{job.company}</p>
                        <p className="text-gray-300 text-sm">{job.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <h4 className="text-white font-semibold mb-4">Education</h4>
                  <div className="space-y-3 mb-6">
                    {selectedCandidate.education.map((edu, index) => (
                      <div key={index} className="p-3 bg-gray-800 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="text-white font-medium">{edu.degree}</h5>
                            <p className="text-gray-400 text-sm">{edu.school}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-gray-400 text-sm">{edu.year}</span>
                            {edu.gpa && <p className="text-gray-500 text-xs">GPA: {edu.gpa}</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedCandidate.interview_history.length > 0 && (
                    <>
                      <h4 className="text-white font-semibold mb-4">Interview History</h4>
                      <div className="space-y-4">
                        {selectedCandidate.interview_history.map((interview, index) => (
                          <div key={index} className="p-4 bg-gray-800 rounded-lg">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h5 className="text-white font-medium">
                                  {interview.type.replace('_', ' ').charAt(0).toUpperCase() + interview.type.slice(1)}
                                </h5>
                                <p className="text-gray-400 text-sm">{interview.interviewer}</p>
                              </div>
                              <div className="text-right">
                                <span className="text-gray-400 text-sm">{interview.date}</span>
                                {interview.rating && (
                                  <div className="flex items-center gap-1 mt-1">
                                    <Star className="w-4 h-4 text-yellow-400" />
                                    <span className="text-white">{interview.rating}/5</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            {interview.notes && (
                              <p className="text-gray-300 text-sm">{interview.notes}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                <div>
                  <div className="bg-gray-800 rounded-xl p-6 mb-6">
                    <h4 className="text-white font-semibold mb-4">Contact Information</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-white">{selectedCandidate.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-white">{selectedCandidate.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-white">{selectedCandidate.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 rounded-xl p-6 mb-6">
                    <h4 className="text-white font-semibold mb-4">Application Details</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Position</span>
                        <span className="text-white">{selectedCandidate.positionTitle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Applied</span>
                        <span className="text-white">{selectedCandidate.appliedDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Source</span>
                        <span className="text-white">{selectedCandidate.source}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Experience</span>
                        <span className="text-white">{selectedCandidate.experience} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Salary Expectation</span>
                        <span className="text-white">${selectedCandidate.salary_expectation?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Availability</span>
                        <span className="text-white">{selectedCandidate.availability}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 rounded-xl p-6">
                    <h4 className="text-white font-semibold mb-4">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCandidate.skills.map(skill => (
                        <span key={skill} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-700">
                <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
                  Schedule Interview
                </button>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Send Message
                </button>
                <button className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold">
                  Download Resume
                </button>
                <button className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold">
                  Add Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}