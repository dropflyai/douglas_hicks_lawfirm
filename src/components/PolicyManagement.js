'use client';

import { useState, useEffect } from 'react';
import { 
  FileText, Plus, Edit3, Eye, Download, Upload, Clock, Check,
  X, ChevronDown, ChevronRight, Search, Filter, AlertTriangle,
  CheckCircle, Calendar, User, Users, Building, Shield, Globe,
  Star, Flag, BookOpen, Archive, RotateCcw, Send, MessageSquare,
  Bookmark, Tag, Share2, Copy, ExternalLink, Trash2, History,
  Lock, Unlock, Bell, Award, Target, Zap, Activity, BarChart3,
  Settings, Info, HelpCircle, TrendingUp, ArrowUpRight, Play,
  Pause, RefreshCw, Database, Mail, Phone, MapPin, Briefcase
} from 'lucide-react';

export default function PolicyManagement() {
  const [activeView, setActiveView] = useState('policies');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [showPolicyDetail, setShowPolicyDetail] = useState(false);
  const [showNewPolicy, setShowNewPolicy] = useState(false);
  const [showApprovalWorkflow, setShowApprovalWorkflow] = useState(false);

  // Comprehensive policy data
  const policyCategories = [
    { id: 'all', name: 'All Policies', count: 24, color: 'blue' },
    { id: 'employment', name: 'Employment', count: 8, color: 'green' },
    { id: 'compliance', name: 'Compliance', count: 6, color: 'red' },
    { id: 'security', name: 'Security', count: 4, color: 'purple' },
    { id: 'workplace', name: 'Workplace', count: 3, color: 'orange' },
    { id: 'benefits', name: 'Benefits', count: 3, color: 'teal' }
  ];

  const policies = [
    {
      id: 1,
      title: 'Employee Handbook',
      category: 'employment',
      version: '3.2',
      status: 'active',
      lastUpdated: '2025-12-15',
      nextReview: '2025-06-15',
      author: 'Sarah Mitchell',
      approvedBy: 'Douglas Hicks',
      approvalDate: '2025-12-20',
      effectiveDate: '2025-01-01',
      description: 'Comprehensive guide covering all employment policies, procedures, and expectations.',
      pages: 45,
      downloads: 127,
      acknowledgments: 42,
      pendingAcknowledgments: 5,
      tags: ['employment', 'onboarding', 'general'],
      compliance: ['Equal Employment Opportunity', 'Fair Labor Standards Act'],
      versions: [
        { version: '3.2', date: '2025-12-15', author: 'Sarah Mitchell', status: 'current' },
        { version: '3.1', date: '2025-08-10', author: 'Sarah Mitchell', status: 'archived' },
        { version: '3.0', date: '2025-01-15', author: 'Michael Chen', status: 'archived' }
      ],
      content: {
        sections: [
          'Welcome & Introduction',
          'Employment Policies',
          'Code of Conduct',
          'Benefits Overview',
          'Leave Policies',
          'Safety & Security',
          'Technology Use',
          'Disciplinary Procedures'
        ],
        wordCount: 12450
      },
      workflow: {
        currentStep: 'approved',
        steps: [
          { step: 'draft', status: 'completed', date: '2025-12-10', user: 'Sarah Mitchell' },
          { step: 'legal_review', status: 'completed', date: '2025-12-12', user: 'Michael Chen' },
          { step: 'management_approval', status: 'completed', date: '2025-12-15', user: 'Douglas Hicks' },
          { step: 'published', status: 'completed', date: '2025-12-20', user: 'Sarah Mitchell' }
        ]
      }
    },
    {
      id: 2,
      title: 'Remote Work Policy',
      category: 'workplace',
      version: '2.1',
      status: 'active',
      lastUpdated: '2025-11-20',
      nextReview: '2025-05-20',
      author: 'Jennifer Davis',
      approvedBy: 'Sarah Mitchell',
      approvalDate: '2025-11-25',
      effectiveDate: '2025-12-01',
      description: 'Guidelines and requirements for remote work arrangements and hybrid schedules.',
      pages: 12,
      downloads: 89,
      acknowledgments: 38,
      pendingAcknowledgments: 9,
      tags: ['remote', 'workplace', 'flexibility'],
      compliance: ['California Labor Code', 'OSHA Guidelines'],
      versions: [
        { version: '2.1', date: '2025-11-20', author: 'Jennifer Davis', status: 'current' },
        { version: '2.0', date: '2025-06-15', author: 'Sarah Mitchell', status: 'archived' },
        { version: '1.0', date: '2023-03-01', author: 'Sarah Mitchell', status: 'archived' }
      ],
      content: {
        sections: [
          'Eligibility Requirements',
          'Application Process',
          'Work Schedule Guidelines',
          'Technology & Equipment',
          'Communication Standards',
          'Performance Expectations',
          'Security Requirements'
        ],
        wordCount: 4200
      },
      workflow: {
        currentStep: 'approved',
        steps: [
          { step: 'draft', status: 'completed', date: '2025-11-15', user: 'Jennifer Davis' },
          { step: 'hr_review', status: 'completed', date: '2025-11-18', user: 'Sarah Mitchell' },
          { step: 'management_approval', status: 'completed', date: '2025-11-20', user: 'Sarah Mitchell' },
          { step: 'published', status: 'completed', date: '2025-11-25', user: 'Jennifer Davis' }
        ]
      }
    },
    {
      id: 3,
      title: 'Information Security Policy',
      category: 'security',
      version: '4.0',
      status: 'draft',
      lastUpdated: '2025-01-10',
      nextReview: '2025-07-10',
      author: 'Michael Chen',
      approvedBy: null,
      approvalDate: null,
      effectiveDate: '2025-02-01',
      description: 'Comprehensive cybersecurity guidelines covering data protection, access controls, and incident response.',
      pages: 28,
      downloads: 0,
      acknowledgments: 0,
      pendingAcknowledgments: 0,
      tags: ['security', 'cybersecurity', 'data protection'],
      compliance: ['CCPA', 'GDPR', 'SOX', 'HIPAA'],
      versions: [
        { version: '4.0', date: '2025-01-10', author: 'Michael Chen', status: 'draft' },
        { version: '3.8', date: '2025-09-01', author: 'IT Department', status: 'archived' }
      ],
      content: {
        sections: [
          'Security Framework',
          'Access Control',
          'Data Classification',
          'Password Requirements',
          'Incident Response',
          'Third-Party Security',
          'Training Requirements',
          'Compliance Monitoring'
        ],
        wordCount: 8900
      },
      workflow: {
        currentStep: 'legal_review',
        steps: [
          { step: 'draft', status: 'completed', date: '2025-01-10', user: 'Michael Chen' },
          { step: 'legal_review', status: 'in_progress', date: null, user: 'Legal Department' },
          { step: 'it_review', status: 'pending', date: null, user: null },
          { step: 'management_approval', status: 'pending', date: null, user: null },
          { step: 'published', status: 'pending', date: null, user: null }
        ]
      }
    },
    {
      id: 4,
      title: 'Code of Conduct',
      category: 'compliance',
      version: '1.5',
      status: 'active',
      lastUpdated: '2025-10-01',
      nextReview: '2025-10-01',
      author: 'Douglas Hicks',
      approvedBy: 'Douglas Hicks',
      approvalDate: '2025-10-05',
      effectiveDate: '2025-10-15',
      description: 'Professional standards and ethical guidelines for all employees.',
      pages: 18,
      downloads: 156,
      acknowledgments: 47,
      pendingAcknowledgments: 0,
      tags: ['ethics', 'conduct', 'compliance'],
      compliance: ['Bar Association Rules', 'State Ethics Guidelines'],
      versions: [
        { version: '1.5', date: '2025-10-01', author: 'Douglas Hicks', status: 'current' },
        { version: '1.4', date: '2025-01-01', author: 'Douglas Hicks', status: 'archived' }
      ],
      content: {
        sections: [
          'Professional Standards',
          'Client Confidentiality',
          'Conflict of Interest',
          'Communication Guidelines',
          'Reporting Procedures',
          'Disciplinary Actions'
        ],
        wordCount: 6750
      },
      workflow: {
        currentStep: 'approved',
        steps: [
          { step: 'draft', status: 'completed', date: '2025-09-25', user: 'Douglas Hicks' },
          { step: 'legal_review', status: 'completed', date: '2025-09-28', user: 'Michael Chen' },
          { step: 'management_approval', status: 'completed', date: '2025-10-01', user: 'Douglas Hicks' },
          { step: 'published', status: 'completed', date: '2025-10-05', user: 'Sarah Mitchell' }
        ]
      }
    },
    {
      id: 5,
      title: 'Anti-Harassment Policy',
      category: 'compliance',
      version: '2.3',
      status: 'review_required',
      lastUpdated: '2025-07-15',
      nextReview: '2025-01-15',
      author: 'Sarah Mitchell',
      approvedBy: 'Douglas Hicks',
      approvalDate: '2025-07-20',
      effectiveDate: '2025-08-01',
      description: 'Zero-tolerance policy for harassment and discrimination with reporting procedures.',
      pages: 15,
      downloads: 98,
      acknowledgments: 47,
      pendingAcknowledgments: 0,
      tags: ['harassment', 'discrimination', 'workplace safety'],
      compliance: ['Title VII', 'FEHA', 'ADA'],
      versions: [
        { version: '2.3', date: '2025-07-15', author: 'Sarah Mitchell', status: 'current' },
        { version: '2.2', date: '2023-12-01', author: 'Sarah Mitchell', status: 'archived' }
      ],
      content: {
        sections: [
          'Policy Statement',
          'Prohibited Conduct',
          'Reporting Procedures',
          'Investigation Process',
          'Corrective Actions',
          'Non-Retaliation'
        ],
        wordCount: 5400
      },
      workflow: {
        currentStep: 'review_required',
        steps: [
          { step: 'scheduled_review', status: 'pending', date: null, user: 'Sarah Mitchell' }
        ]
      }
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'draft': return 'bg-blue-500/20 text-blue-400';
      case 'review_required': return 'bg-yellow-500/20 text-yellow-400';
      case 'archived': return 'bg-gray-500/20 text-gray-400';
      case 'pending_approval': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'employment': 'bg-green-500/20 text-green-400',
      'compliance': 'bg-red-500/20 text-red-400',
      'security': 'bg-purple-500/20 text-purple-400',
      'workplace': 'bg-orange-500/20 text-orange-400',
      'benefits': 'bg-teal-500/20 text-teal-400'
    };
    return colors[category] || 'bg-gray-500/20 text-gray-400';
  };

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || policy.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderPolicyList = () => (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search policies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500"
          >
            {policyCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name} ({category.count})
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setShowNewPolicy(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Policy
        </button>
      </div>

      {/* Policy Categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {policyCategories.map(category => (
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

      {/* Policy List */}
      <div className="space-y-4">
        {filteredPolicies.map(policy => (
          <div key={policy.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white">{policy.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(policy.status)}`}>
                    {policy.status.replace('_', ' ').charAt(0).toUpperCase() + policy.status.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(policy.category)}`}>
                    {policy.category.charAt(0).toUpperCase() + policy.category.slice(1)}
                  </span>
                </div>
                <p className="text-gray-400 mb-3">{policy.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Version {policy.version}</span>
                  <span>•</span>
                  <span>{policy.pages} pages</span>
                  <span>•</span>
                  <span>Updated {policy.lastUpdated}</span>
                  <span>•</span>
                  <span>By {policy.author}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedPolicy(policy);
                    setShowPolicyDetail(true);
                  }}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-400">
                  {policy.acknowledgments}/{policy.acknowledgments + policy.pendingAcknowledgments} acknowledged
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-400">{policy.downloads} downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-400">Review due {policy.nextReview}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-400">Approved by {policy.approvedBy || 'Pending'}</span>
              </div>
            </div>

            {policy.tags && (
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-700">
                <Tag className="w-4 h-4 text-gray-400" />
                <div className="flex gap-2">
                  {policy.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderWorkflowManagement = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6">Approval Workflows</h3>
        <div className="space-y-4">
          {policies.filter(p => p.status === 'draft' || p.workflow.currentStep !== 'approved').map(policy => (
            <div key={policy.id} className="p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-white font-semibold">{policy.title}</h4>
                  <p className="text-gray-400 text-sm">Version {policy.version}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(policy.status)}`}>
                  {policy.workflow.currentStep.replace('_', ' ').charAt(0).toUpperCase() + policy.workflow.currentStep.slice(1)}
                </span>
              </div>

              <div className="flex items-center gap-4">
                {policy.workflow.steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.status === 'completed' ? 'bg-green-500' :
                      step.status === 'in_progress' ? 'bg-blue-500' :
                      'bg-gray-600'
                    }`}>
                      {step.status === 'completed' ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : step.status === 'in_progress' ? (
                        <Clock className="w-4 h-4 text-white" />
                      ) : (
                        <span className="text-white text-xs">{index + 1}</span>
                      )}
                    </div>
                    <div className="text-sm">
                      <p className="text-white">{step.step.replace('_', ' ').charAt(0).toUpperCase() + step.step.slice(1)}</p>
                      {step.date && <p className="text-gray-400">{step.date}</p>}
                    </div>
                    {index < policy.workflow.steps.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-4">
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                  View Details
                </button>
                <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                  Approve
                </button>
                <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors">
                  Request Changes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderComplianceTracking = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Active Policies</p>
          <p className="text-3xl font-bold text-white">18</p>
          <div className="flex items-center gap-2 mt-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">All compliant</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Pending Reviews</p>
          <p className="text-3xl font-bold text-white">3</p>
          <div className="flex items-center gap-2 mt-2">
            <Clock className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 text-sm">Due this month</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Acknowledgment Rate</p>
          <p className="text-3xl font-bold text-white">94%</p>
          <div className="flex items-center gap-2 mt-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">Above target</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Compliance Score</p>
          <p className="text-3xl font-bold text-white">98%</p>
          <div className="flex items-center gap-2 mt-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">Excellent</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6">Compliance Requirements</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-semibold">CCPA Compliance</h4>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium">
                Compliant
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-3">California Consumer Privacy Act requirements covered in Information Security Policy</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-500">Last Audit: Dec 2025</span>
              <span className="text-gray-500">Next Review: Jun 2025</span>
            </div>
          </div>

          <div className="p-4 bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-semibold">Employment Law Compliance</h4>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium">
                Compliant
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-3">Federal and state employment laws covered across multiple policies</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-500">Policies: 6</span>
              <span className="text-gray-500">Coverage: 100%</span>
            </div>
          </div>

          <div className="p-4 bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-semibold">Legal Ethics Requirements</h4>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium">
                Compliant
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-3">State Bar requirements and professional conduct standards</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-500">Coverage: Code of Conduct</span>
              <span className="text-gray-500">Acknowledgment: 100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Total Downloads</p>
          <p className="text-3xl font-bold text-white">1,247</p>
          <div className="flex items-center gap-2 mt-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">+12% this month</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Avg. Response Time</p>
          <p className="text-3xl font-bold text-white">2.3 days</p>
          <div className="flex items-center gap-2 mt-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm">Approval time</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Most Accessed</p>
          <p className="text-xl font-bold text-white">Employee Handbook</p>
          <div className="flex items-center gap-2 mt-2">
            <Eye className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-sm">127 downloads</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Update Frequency</p>
          <p className="text-3xl font-bold text-white">2.1</p>
          <div className="flex items-center gap-2 mt-2">
            <RefreshCw className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 text-sm">Updates/year</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Policy Usage Trends</h3>
          <div className="h-64 flex items-center justify-center">
            <BarChart3 className="w-16 h-16 text-gray-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Category Distribution</h3>
          <div className="space-y-3">
            {policyCategories.filter(c => c.id !== 'all').map(category => (
              <div key={category.id} className="flex items-center justify-between">
                <span className="text-gray-400">{category.name}</span>
                <div className="flex items-center gap-3">
                  <div className="w-20 bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${(category.count / 24) * 100}%` }}
                    />
                  </div>
                  <span className="text-white font-semibold w-8">{category.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* View Selector */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Policy Management</h1>
        <div className="flex gap-2 bg-gray-800 p-1 rounded-lg">
          {[
            { id: 'policies', label: 'Policies', icon: FileText },
            { id: 'workflow', label: 'Workflow', icon: Clock },
            { id: 'compliance', label: 'Compliance', icon: Shield },
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
      {activeView === 'policies' && renderPolicyList()}
      {activeView === 'workflow' && renderWorkflowManagement()}
      {activeView === 'compliance' && renderComplianceTracking()}
      {activeView === 'analytics' && renderAnalytics()}

      {/* Policy Detail Modal */}
      {showPolicyDetail && selectedPolicy && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedPolicy.title}</h3>
                  <p className="text-gray-400 mt-1">Version {selectedPolicy.version}</p>
                </div>
                <button
                  onClick={() => setShowPolicyDetail(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-white font-semibold mb-4">Policy Information</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedPolicy.status)}`}>
                        {selectedPolicy.status.replace('_', ' ').charAt(0).toUpperCase() + selectedPolicy.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Category</span>
                      <span className="text-white">{selectedPolicy.category.charAt(0).toUpperCase() + selectedPolicy.category.slice(1)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Author</span>
                      <span className="text-white">{selectedPolicy.author}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Updated</span>
                      <span className="text-white">{selectedPolicy.lastUpdated}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Next Review</span>
                      <span className="text-white">{selectedPolicy.nextReview}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Pages</span>
                      <span className="text-white">{selectedPolicy.pages}</span>
                    </div>
                  </div>
                  
                  <h4 className="text-white font-semibold mt-6 mb-4">Content Sections</h4>
                  <div className="space-y-2">
                    {selectedPolicy.content.sections.map((section, index) => (
                      <div key={index} className="p-3 bg-gray-800 rounded-lg">
                        <span className="text-white">{section}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-4">Version History</h4>
                  <div className="space-y-3">
                    {selectedPolicy.versions.map((version, index) => (
                      <div key={index} className="p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">Version {version.version}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            version.status === 'current' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {version.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-400">
                          <p>{version.date} • {version.author}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <h4 className="text-white font-semibold mt-6 mb-4">Acknowledgments</h4>
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white font-semibold">
                        {selectedPolicy.acknowledgments}/{selectedPolicy.acknowledgments + selectedPolicy.pendingAcknowledgments}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ 
                          width: `${(selectedPolicy.acknowledgments / (selectedPolicy.acknowledgments + selectedPolicy.pendingAcknowledgments)) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-700">
                <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                  Download PDF
                </button>
                <button className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold">
                  Edit Policy
                </button>
                <button className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold">
                  Send for Acknowledgment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}