'use client';

import { useState, useEffect } from 'react';
import { 
  Calendar, Clock, Users, TrendingUp, CheckCircle, AlertTriangle,
  Plus, Edit3, Eye, Download, Search, Filter, X, ChevronRight,
  ChevronDown, ArrowUpRight, RefreshCw, Settings, Info, User,
  Building, Globe, Star, Flag, BookOpen, Archive, RotateCcw,
  Send, MessageSquare, Bookmark, Tag, Share2, Copy, ExternalLink,
  Trash2, Brain, Zap, Activity, BarChart3, PieChart, Target,
  Briefcase, Phone, Mail, MapPin, Shield, Award, DollarSign,
  FileText, Database, Calculator, CreditCard, Wallet, Banknote,
  Receipt, Heart, Umbrella, Baby, GraduationCap, Home, Car,
  Plane, Sun, Moon, Coffee, TreePine, Snowflake, Waves
} from 'lucide-react';

export default function TimeOffManagement() {
  const [activeView, setActiveView] = useState('requests');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showBalanceDetail, setShowBalanceDetail] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [calendarView, setCalendarView] = useState('month');

  // Comprehensive leave data
  const leaveTypes = [
    {
      id: 1,
      name: 'Vacation',
      code: 'VAC',
      category: 'paid',
      accrualRate: 20, // days per year
      maxAccrual: 40,
      carryoverLimit: 5,
      color: 'blue',
      icon: Sun,
      description: 'Paid vacation time for rest and recreation',
      eligibility: 'All full-time employees',
      waitingPeriod: 90, // days
      advanceNotice: 14, // days
      maxConsecutive: 15, // days
      status: 'active'
    },
    {
      id: 2,
      name: 'Sick Leave',
      code: 'SICK',
      category: 'paid',
      accrualRate: 12, // days per year
      maxAccrual: 30,
      carryoverLimit: 10,
      color: 'red',
      icon: Heart,
      description: 'Paid sick leave for health-related absences',
      eligibility: 'All employees',
      waitingPeriod: 0,
      advanceNotice: 0, // emergency use
      maxConsecutive: 30, // days
      status: 'active'
    },
    {
      id: 3,
      name: 'Personal Leave',
      code: 'PERS',
      category: 'paid',
      accrualRate: 5, // days per year
      maxAccrual: 10,
      carryoverLimit: 2,
      color: 'green',
      icon: Coffee,
      description: 'Personal time off for individual needs',
      eligibility: 'Full-time employees after 1 year',
      waitingPeriod: 365,
      advanceNotice: 7,
      maxConsecutive: 5,
      status: 'active'
    },
    {
      id: 4,
      name: 'Parental Leave',
      code: 'PARENT',
      category: 'unpaid',
      accrualRate: 0,
      maxAccrual: 84, // 12 weeks
      carryoverLimit: 0,
      color: 'purple',
      icon: Baby,
      description: 'Family and Medical Leave Act (FMLA) compliant parental leave',
      eligibility: 'Eligible employees under FMLA',
      waitingPeriod: 365,
      advanceNotice: 30,
      maxConsecutive: 84,
      status: 'active'
    },
    {
      id: 5,
      name: 'Bereavement',
      code: 'BEREAVE',
      category: 'paid',
      accrualRate: 0,
      maxAccrual: 5,
      carryoverLimit: 0,
      color: 'gray',
      icon: Umbrella,
      description: 'Paid leave for loss of family member',
      eligibility: 'All employees',
      waitingPeriod: 0,
      advanceNotice: 0,
      maxConsecutive: 5,
      status: 'active'
    },
    {
      id: 6,
      name: 'Jury Duty',
      code: 'JURY',
      category: 'paid',
      accrualRate: 0,
      maxAccrual: 30,
      carryoverLimit: 0,
      color: 'indigo',
      icon: Shield,
      description: 'Paid leave for jury duty service',
      eligibility: 'All employees',
      waitingPeriod: 0,
      advanceNotice: 1,
      maxConsecutive: 30,
      status: 'active'
    }
  ];

  const leaveRequests = [
    {
      id: 1,
      employeeId: 1,
      employeeName: 'Michael Chen',
      position: 'Senior Associate',
      leaveType: 'Vacation',
      leaveTypeId: 1,
      startDate: '2025-02-15',
      endDate: '2025-02-19',
      days: 5,
      hours: 40,
      reason: 'Family vacation to Hawaii',
      status: 'pending',
      requestDate: '2025-01-10',
      approver: 'Douglas Hicks',
      urgency: 'normal',
      documents: [],
      comments: [
        {
          author: 'Michael Chen',
          date: '2025-01-10',
          message: 'Planning a family vacation during Presidents Day week. All cases will be covered by Jennifer Davis.'
        }
      ],
      coverage: [
        {
          employee: 'Jennifer Davis',
          responsibilities: 'Handle ongoing cases and client calls',
          confirmed: true
        }
      ],
      workflow: {
        currentStep: 'manager_review',
        steps: [
          { step: 'submitted', status: 'completed', date: '2025-01-10', user: 'Michael Chen' },
          { step: 'manager_review', status: 'pending', date: null, user: 'Douglas Hicks' },
          { step: 'approved', status: 'pending', date: null, user: null }
        ]
      }
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: 'Jennifer Davis',
      position: 'Legal Assistant',
      leaveType: 'Sick Leave',
      leaveTypeId: 2,
      startDate: '2025-01-20',
      endDate: '2025-01-22',
      days: 3,
      hours: 24,
      reason: 'Medical appointment and recovery',
      status: 'approved',
      requestDate: '2025-01-18',
      approver: 'Sarah Mitchell',
      urgency: 'urgent',
      documents: ['medical_note.pdf'],
      comments: [
        {
          author: 'Jennifer Davis',
          date: '2025-01-18',
          message: 'Minor surgical procedure scheduled. Will provide medical documentation.'
        },
        {
          author: 'Sarah Mitchell',
          date: '2025-01-18',
          message: 'Approved. Take care and rest well. Michael will cover urgent matters.'
        }
      ],
      coverage: [
        {
          employee: 'Michael Chen',
          responsibilities: 'Cover urgent administrative tasks',
          confirmed: true
        }
      ],
      workflow: {
        currentStep: 'approved',
        steps: [
          { step: 'submitted', status: 'completed', date: '2025-01-18', user: 'Jennifer Davis' },
          { step: 'manager_review', status: 'completed', date: '2025-01-18', user: 'Sarah Mitchell' },
          { step: 'approved', status: 'completed', date: '2025-01-18', user: 'Sarah Mitchell' }
        ]
      }
    },
    {
      id: 3,
      employeeId: 3,
      employeeName: 'Sarah Mitchell',
      position: 'HR Director',
      leaveType: 'Personal Leave',
      leaveTypeId: 3,
      startDate: '2025-03-01',
      endDate: '2025-03-01',
      days: 1,
      hours: 8,
      reason: 'Personal appointment',
      status: 'approved',
      requestDate: '2025-01-15',
      approver: 'Douglas Hicks',
      urgency: 'normal',
      documents: [],
      comments: [
        {
          author: 'Sarah Mitchell',
          date: '2025-01-15',
          message: 'Need to attend to personal matters. Will be available via phone if urgent.'
        }
      ],
      coverage: [],
      workflow: {
        currentStep: 'approved',
        steps: [
          { step: 'submitted', status: 'completed', date: '2025-01-15', user: 'Sarah Mitchell' },
          { step: 'manager_review', status: 'completed', date: '2025-01-15', user: 'Douglas Hicks' },
          { step: 'approved', status: 'completed', date: '2025-01-15', user: 'Douglas Hicks' }
        ]
      }
    }
  ];

  const employeeBalances = [
    {
      employeeId: 1,
      employeeName: 'Michael Chen',
      position: 'Senior Associate',
      hireDate: '2022-03-15',
      employment: 'full-time',
      balances: [
        {
          leaveTypeId: 1,
          leaveType: 'Vacation',
          accrued: 18.5,
          used: 12.0,
          available: 6.5,
          pending: 5.0,
          projected: 20.0,
          expiresAt: '2025-12-31',
          carryover: 5.0
        },
        {
          leaveTypeId: 2,
          leaveType: 'Sick Leave',
          accrued: 10.5,
          used: 3.0,
          available: 7.5,
          pending: 3.0,
          projected: 12.0,
          expiresAt: null,
          carryover: 8.0
        },
        {
          leaveTypeId: 3,
          leaveType: 'Personal Leave',
          accrued: 4.2,
          used: 1.0,
          available: 3.2,
          pending: 0,
          projected: 5.0,
          expiresAt: '2025-12-31',
          carryover: 2.0
        }
      ],
      ytdUsage: {
        totalDays: 16.0,
        breakdown: {
          'Vacation': 12.0,
          'Sick Leave': 3.0,
          'Personal Leave': 1.0
        }
      },
      lastUpdated: '2025-01-15'
    },
    {
      employeeId: 2,
      employeeName: 'Jennifer Davis',
      position: 'Legal Assistant',
      hireDate: '2025-11-01',
      employment: 'full-time',
      balances: [
        {
          leaveTypeId: 1,
          leaveType: 'Vacation',
          accrued: 3.5,
          used: 0,
          available: 3.5,
          pending: 0,
          projected: 20.0,
          expiresAt: '2025-12-31',
          carryover: 0
        },
        {
          leaveTypeId: 2,
          leaveType: 'Sick Leave',
          accrued: 2.0,
          used: 3.0,
          available: -1.0, // advanced
          pending: 0,
          projected: 12.0,
          expiresAt: null,
          carryover: 0
        }
      ],
      ytdUsage: {
        totalDays: 3.0,
        breakdown: {
          'Sick Leave': 3.0
        }
      },
      lastUpdated: '2025-01-18'
    },
    {
      employeeId: 3,
      employeeName: 'Sarah Mitchell',
      position: 'HR Director',
      hireDate: '2020-06-01',
      employment: 'full-time',
      balances: [
        {
          leaveTypeId: 1,
          leaveType: 'Vacation',
          accrued: 40.0, // at max
          used: 15.0,
          available: 25.0,
          pending: 0,
          projected: 20.0,
          expiresAt: '2025-12-31',
          carryover: 5.0
        },
        {
          leaveTypeId: 2,
          leaveType: 'Sick Leave',
          accrued: 25.0,
          used: 2.0,
          available: 23.0,
          pending: 0,
          projected: 12.0,
          expiresAt: null,
          carryover: 15.0
        },
        {
          leaveTypeId: 3,
          leaveType: 'Personal Leave',
          accrued: 5.0,
          used: 2.0,
          available: 3.0,
          pending: 1.0,
          projected: 5.0,
          expiresAt: '2025-12-31',
          carryover: 2.0
        }
      ],
      ytdUsage: {
        totalDays: 17.0,
        breakdown: {
          'Vacation': 15.0,
          'Sick Leave': 2.0
        }
      },
      lastUpdated: '2025-01-15'
    }
  ];

  const complianceItems = [
    {
      type: 'fmla',
      title: 'FMLA Eligibility Review',
      description: 'Annual review of employee FMLA eligibility status',
      dueDate: '2025-03-01',
      status: 'pending',
      employees: 12
    },
    {
      type: 'state_leave',
      title: 'California Sick Leave Compliance',
      description: 'Verify compliance with CA Healthy Workplaces, Healthy Families Act',
      dueDate: '2025-02-15',
      status: 'in_progress',
      employees: 47
    },
    {
      type: 'policy_update',
      title: 'Leave Policy Annual Review',
      description: 'Review and update leave policies for 2025',
      dueDate: '2025-01-31',
      status: 'completed',
      employees: null
    }
  ];

  const leaveCalendar = [
    {
      date: '2025-01-20',
      employees: [
        { name: 'Jennifer Davis', type: 'Sick Leave', status: 'approved' }
      ]
    },
    {
      date: '2025-01-21',
      employees: [
        { name: 'Jennifer Davis', type: 'Sick Leave', status: 'approved' }
      ]
    },
    {
      date: '2025-01-22',
      employees: [
        { name: 'Jennifer Davis', type: 'Sick Leave', status: 'approved' }
      ]
    },
    {
      date: '2025-02-15',
      employees: [
        { name: 'Michael Chen', type: 'Vacation', status: 'pending' }
      ]
    },
    {
      date: '2025-02-16',
      employees: [
        { name: 'Michael Chen', type: 'Vacation', status: 'pending' }
      ]
    },
    {
      date: '2025-02-17',
      employees: [
        { name: 'Michael Chen', type: 'Vacation', status: 'pending' }
      ]
    },
    {
      date: '2025-02-18',
      employees: [
        { name: 'Michael Chen', type: 'Vacation', status: 'pending' }
      ]
    },
    {
      date: '2025-02-19',
      employees: [
        { name: 'Michael Chen', type: 'Vacation', status: 'pending' }
      ]
    },
    {
      date: '2025-03-01',
      employees: [
        { name: 'Sarah Mitchell', type: 'Personal Leave', status: 'approved' }
      ]
    }
  ];

  const analyticsData = {
    totalRequests: 156,
    approvalRate: 94,
    averageProcessingTime: 1.2, // days
    mostUsedLeaveType: 'Vacation',
    peakUsageMonths: ['July', 'December'],
    utilizationByType: {
      'Vacation': 78,
      'Sick Leave': 45,
      'Personal Leave': 62,
      'Parental Leave': 12
    },
    trends: {
      currentYear: 156,
      previousYear: 142,
      growth: 9.9
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-500/20 text-green-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'denied': return 'bg-red-500/20 text-red-400';
      case 'cancelled': return 'bg-gray-500/20 text-gray-400';
      case 'in_progress': return 'bg-blue-500/20 text-blue-400';
      case 'completed': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getLeaveTypeColor = (leaveType) => {
    const colors = {
      'Vacation': 'bg-blue-500/20 text-blue-400',
      'Sick Leave': 'bg-red-500/20 text-red-400',
      'Personal Leave': 'bg-green-500/20 text-green-400',
      'Parental Leave': 'bg-purple-500/20 text-purple-400',
      'Bereavement': 'bg-gray-500/20 text-gray-400',
      'Jury Duty': 'bg-indigo-500/20 text-indigo-400'
    };
    return colors[leaveType] || 'bg-gray-500/20 text-gray-400';
  };

  const renderLeaveRequests = () => (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search requests..."
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500"
            />
          </div>
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500">
            <option>All Status</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Denied</option>
          </select>
        </div>
        <button
          onClick={() => setShowRequestModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Request
        </button>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {leaveRequests.map(request => (
          <div key={request.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {request.employeeName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{request.employeeName}</h3>
                  <p className="text-gray-400">{request.position}</p>
                  <p className="text-gray-500 text-sm">Requested: {request.requestDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
                <button
                  onClick={() => {
                    setSelectedRequest(request);
                    setShowRequestModal(true);
                  }}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-gray-400 text-sm">Leave Type</p>
                <span className={`px-2 py-1 rounded text-sm font-medium ${getLeaveTypeColor(request.leaveType)}`}>
                  {request.leaveType}
                </span>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Duration</p>
                <p className="text-white font-semibold">{request.days} days</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Start Date</p>
                <p className="text-white font-semibold">{request.startDate}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">End Date</p>
                <p className="text-white font-semibold">{request.endDate}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-2">Reason</p>
              <p className="text-white">{request.reason}</p>
            </div>

            {request.coverage.length > 0 && (
              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-2">Coverage Arrangements</p>
                <div className="space-y-2">
                  {request.coverage.map((coverage, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="text-white font-medium">{coverage.employee}</p>
                        <p className="text-gray-400 text-sm">{coverage.responsibilities}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  request.urgency === 'urgent' ? 'bg-red-500/20 text-red-400' :
                  request.urgency === 'normal' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
                </span>
                <span className="text-gray-400 text-sm">Approver: {request.approver}</span>
              </div>
              
              {request.status === 'pending' && (
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                    Approve
                  </button>
                  <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors">
                    Deny
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEmployeeBalances = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Employee Balances</h2>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Recalculate All
        </button>
      </div>

      <div className="space-y-6">
        {employeeBalances.map(employee => (
          <div key={employee.employeeId} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {employee.employeeName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{employee.employeeName}</h3>
                  <p className="text-gray-400">{employee.position}</p>
                  <p className="text-gray-500 text-sm">Hire Date: {employee.hireDate}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-lg">{employee.ytdUsage.totalDays} days</p>
                <p className="text-gray-400 text-sm">YTD Usage</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {employee.balances.map(balance => (
                <div key={balance.leaveTypeId} className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-semibold">{balance.leaveType}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getLeaveTypeColor(balance.leaveType)}`}>
                      {balance.available} days
                    </span>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Accrued</span>
                      <span className="text-white">{balance.accrued}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Used</span>
                      <span className="text-white">{balance.used}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Available</span>
                      <span className={`font-semibold ${balance.available < 0 ? 'text-red-400' : 'text-green-400'}`}>
                        {balance.available}
                      </span>
                    </div>
                    {balance.pending > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Pending</span>
                        <span className="text-yellow-400">{balance.pending}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-600">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Projected: {balance.projected}</span>
                      {balance.expiresAt && (
                        <span className="text-gray-500">Expires: {balance.expiresAt}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-600">
              <h5 className="text-white font-semibold mb-3">YTD Usage Breakdown</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(employee.ytdUsage.breakdown).map(([type, days]) => (
                  <div key={type} className="text-center p-3 bg-gray-700 rounded-lg">
                    <p className="text-white font-bold">{days}</p>
                    <p className="text-gray-400 text-sm">{type}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLeaveCalendar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Leave Calendar</h2>
        <div className="flex gap-2">
          <select 
            value={calendarView} 
            onChange={(e) => setCalendarView(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500"
          >
            <option value="month">Month View</option>
            <option value="week">Week View</option>
            <option value="year">Year View</option>
          </select>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Export Calendar
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-3 text-center text-gray-400 font-semibold">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }, (_, index) => {
            const date = new Date(2025, 0, index - 6); // January 2025 calendar
            const dateStr = date.toISOString().split('T')[0];
            const dayEvents = leaveCalendar.filter(event => event.date === dateStr);
            const isToday = dateStr === new Date().toISOString().split('T')[0];
            const isCurrentMonth = date.getMonth() === 0;

            return (
              <div
                key={index}
                className={`min-h-[120px] p-2 border border-gray-700 rounded-lg ${
                  isToday ? 'bg-purple-900/30 border-purple-500' :
                  isCurrentMonth ? 'bg-gray-700' : 'bg-gray-800'
                }`}
              >
                <div className={`text-sm font-semibold mb-2 ${
                  isCurrentMonth ? 'text-white' : 'text-gray-500'
                }`}>
                  {date.getDate()}
                </div>
                
                <div className="space-y-1">
                  {dayEvents.map((event, eventIndex) => (
                    <div key={eventIndex}>
                      {event.employees.map((emp, empIndex) => (
                        <div
                          key={empIndex}
                          className={`text-xs p-1 rounded ${getLeaveTypeColor(emp.type)} text-center`}
                        >
                          {emp.name.split(' ')[0]}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Today's Leave</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-700 rounded-lg">
              <p className="text-white font-medium">No employees on leave today</p>
              <p className="text-gray-400 text-sm">All staff present</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Upcoming Leave</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-700 rounded-lg">
              <p className="text-white font-medium">Michael Chen</p>
              <p className="text-gray-400 text-sm">Vacation • Feb 15-19</p>
            </div>
            <div className="p-3 bg-gray-700 rounded-lg">
              <p className="text-white font-medium">Sarah Mitchell</p>
              <p className="text-gray-400 text-sm">Personal • Mar 1</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Coverage Needed</h3>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
              <p className="text-white font-medium">Michael Chen's Vacation</p>
              <p className="text-yellow-400 text-sm">Feb 15-19 • Coverage arranged</p>
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
          <p className="text-gray-400 text-sm mb-2">Total Requests</p>
          <p className="text-3xl font-bold text-white">{analyticsData.totalRequests}</p>
          <div className="flex items-center gap-2 mt-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">+{analyticsData.trends.growth}% YoY</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Approval Rate</p>
          <p className="text-3xl font-bold text-white">{analyticsData.approvalRate}%</p>
          <div className="flex items-center gap-2 mt-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">High approval</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Avg Processing Time</p>
          <p className="text-3xl font-bold text-white">{analyticsData.averageProcessingTime}</p>
          <div className="flex items-center gap-2 mt-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm">days</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Most Used Type</p>
          <p className="text-2xl font-bold text-white">{analyticsData.mostUsedLeaveType}</p>
          <div className="flex items-center gap-2 mt-2">
            <Sun className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 text-sm">78% utilization</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Leave Type Utilization</h3>
          <div className="space-y-4">
            {Object.entries(analyticsData.utilizationByType).map(([type, percentage]) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-gray-400">{type}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-white font-semibold w-12">{percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Monthly Trends</h3>
          <div className="h-64 flex items-center justify-center">
            <BarChart3 className="w-16 h-16 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-white font-semibold mb-4">Compliance Status</h3>
        <div className="grid lg:grid-cols-3 gap-6">
          {complianceItems.map((item, index) => (
            <div key={index} className="p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-medium">{item.title}</h4>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                  {item.status.replace('_', ' ').charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-3">{item.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Due: {item.dueDate}</span>
                {item.employees && (
                  <span className="text-gray-500">{item.employees} employees</span>
                )}
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
        <h1 className="text-3xl font-bold text-white">Time-off & Leave Management</h1>
        <div className="flex gap-2 bg-gray-800 p-1 rounded-lg">
          {[
            { id: 'requests', label: 'Requests', icon: FileText },
            { id: 'balances', label: 'Balances', icon: Calculator },
            { id: 'calendar', label: 'Calendar', icon: Calendar },
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
      {activeView === 'requests' && renderLeaveRequests()}
      {activeView === 'balances' && renderEmployeeBalances()}
      {activeView === 'calendar' && renderLeaveCalendar()}
      {activeView === 'analytics' && renderAnalytics()}
    </div>
  );
}