'use client';

import { useState, useEffect } from 'react';
import { 
  Users, Search, Plus, Filter, Download, Upload, Eye, Edit3, Trash2, 
  Mail, Phone, MapPin, Calendar, DollarSign, Award, Clock, Building,
  Briefcase, GraduationCap, Heart, Shield, AlertTriangle, CheckCircle,
  Star, TrendingUp, UserPlus, UserCheck, FileText, ChevronRight,
  MoreVertical, X, Camera, Linkedin, Github, Globe, Copy, Share2,
  Activity, BarChart3, PieChart, Target, Zap, Info, MessageSquare,
  Video, Send, Paperclip, ArrowUpRight, ArrowDownRight, Minus
} from 'lucide-react';

export default function EmployeeManagement() {
  const [activeView, setActiveView] = useState('directory');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  // Comprehensive employee data
  const employees = [
    {
      id: 1,
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@douglasshicks.com',
      phone: '+1 (555) 234-5678',
      position: 'Senior Associate Attorney',
      department: 'Legal',
      location: 'Los Angeles, CA',
      employeeId: 'EMP-2019-001',
      startDate: '2019-03-15',
      salary: 125000,
      status: 'active',
      manager: 'Carl Douglas',
      avatar: null,
      bio: 'Experienced attorney specializing in civil rights and employment law.',
      skills: ['Litigation', 'Legal Research', 'Contract Law', 'Employment Law'],
      certifications: ['California Bar', 'Federal Court Admission'],
      performanceRating: 4.5,
      lastReview: '2025-12-15',
      nextReview: '2025-06-15',
      timeOffBalance: { vacation: 15, sick: 8, personal: 3 },
      benefits: ['Health Insurance', '401k', 'Life Insurance', 'Legal Services'],
      emergencyContact: {
        name: 'Sarah Chen',
        relationship: 'Spouse',
        phone: '+1 (555) 234-5679'
      },
      workHistory: [
        { company: 'Douglass & Hicks', position: 'Senior Associate', startDate: '2022-01-01', current: true },
        { company: 'Douglass & Hicks', position: 'Associate Attorney', startDate: '2019-03-15', endDate: '2021-12-31' }
      ],
      education: [
        { degree: 'JD', school: 'UCLA School of Law', year: '2018' },
        { degree: 'BA Political Science', school: 'UC Berkeley', year: '2015' }
      ],
      documents: [
        { type: 'Contract', name: 'Employment Agreement', date: '2019-03-15', status: 'signed' },
        { type: 'Review', name: 'Annual Performance Review 2025', date: '2025-12-15', status: 'completed' },
        { type: 'Certification', name: 'California Bar License', date: '2018-11-20', status: 'verified' }
      ],
      projects: [
        { name: 'Rodriguez v. LAPD', role: 'Lead Attorney', status: 'active', hours: 156 },
        { name: 'Chen Employment Case', role: 'Support', status: 'completed', hours: 89 }
      ],
      metrics: {
        billableHours: { current: 1850, target: 2000, trend: '+5%' },
        casesWon: { current: 12, total: 14, rate: '85.7%' },
        clientSatisfaction: { score: 4.8, reviews: 23 },
        productivity: { score: 92, trend: '+3%' }
      }
    },
    {
      id: 2,
      firstName: 'Jennifer',
      lastName: 'Davis',
      email: 'jennifer.davis@douglasshicks.com',
      phone: '+1 (555) 345-6789',
      position: 'Legal Assistant',
      department: 'Legal',
      location: 'Los Angeles, CA',
      employeeId: 'EMP-2025-018',
      startDate: '2025-11-01',
      salary: 65000,
      status: 'active',
      manager: 'Michael Chen',
      avatar: null,
      bio: 'Detail-oriented legal assistant with expertise in case management and client relations.',
      skills: ['Document Management', 'Client Communication', 'Legal Research', 'Case Filing'],
      certifications: ['Paralegal Certificate', 'Notary Public'],
      performanceRating: 4.2,
      lastReview: 'N/A',
      nextReview: '2025-05-01',
      timeOffBalance: { vacation: 10, sick: 5, personal: 2 },
      benefits: ['Health Insurance', '401k', 'Transit Pass'],
      emergencyContact: {
        name: 'Robert Davis',
        relationship: 'Father',
        phone: '+1 (555) 345-6790'
      },
      workHistory: [
        { company: 'Douglass & Hicks', position: 'Legal Assistant', startDate: '2025-11-01', current: true },
        { company: 'Smith & Associates', position: 'Paralegal', startDate: '2022-06-01', endDate: '2025-10-15' }
      ],
      education: [
        { degree: 'Paralegal Certificate', school: 'UCLA Extension', year: '2022' },
        { degree: 'BA English', school: 'USC', year: '2020' }
      ],
      documents: [
        { type: 'Contract', name: 'Employment Agreement', date: '2025-11-01', status: 'signed' },
        { type: 'Training', name: 'Onboarding Checklist', date: '2025-11-15', status: 'completed' }
      ],
      projects: [
        { name: 'Document Digitization', role: 'Lead', status: 'active', hours: 45 },
        { name: 'Client Portal Setup', role: 'Support', status: 'active', hours: 23 }
      ],
      metrics: {
        tasksCompleted: { current: 156, target: 150, trend: '+12%' },
        responseTime: { average: '2.3 hrs', target: '4 hrs', performance: 'excellent' },
        accuracy: { score: 98.5, trend: '+1.5%' },
        clientFeedback: { score: 4.9, reviews: 12 }
      }
    },
    {
      id: 3,
      firstName: 'Sarah',
      lastName: 'Mitchell',
      email: 'sarah.mitchell@douglasshicks.com',
      phone: '+1 (555) 456-7890',
      position: 'HR Director',
      department: 'Human Resources',
      location: 'Los Angeles, CA',
      employeeId: 'EMP-2020-005',
      startDate: '2020-06-01',
      salary: 95000,
      status: 'active',
      manager: 'Carl Douglas',
      avatar: null,
      bio: 'Strategic HR leader with 10+ years experience in law firm administration.',
      skills: ['HR Management', 'Recruitment', 'Performance Management', 'Compliance'],
      certifications: ['SHRM-CP', 'PHR', 'CEBS'],
      performanceRating: 4.7,
      lastReview: '2025-11-01',
      nextReview: '2025-05-01',
      timeOffBalance: { vacation: 18, sick: 10, personal: 5 },
      benefits: ['Health Insurance', '401k', 'Life Insurance', 'Professional Development'],
      emergencyContact: {
        name: 'James Mitchell',
        relationship: 'Spouse',
        phone: '+1 (555) 456-7891'
      },
      workHistory: [
        { company: 'Douglass & Hicks', position: 'HR Director', startDate: '2023-01-01', current: true },
        { company: 'Douglass & Hicks', position: 'HR Manager', startDate: '2020-06-01', endDate: '2022-12-31' }
      ],
      education: [
        { degree: 'MBA Human Resources', school: 'Pepperdine University', year: '2019' },
        { degree: 'BA Psychology', school: 'UCLA', year: '2014' }
      ],
      documents: [
        { type: 'Contract', name: 'Director Agreement', date: '2023-01-01', status: 'signed' },
        { type: 'Certification', name: 'SHRM-CP Certification', date: '2021-08-15', status: 'verified' }
      ],
      projects: [
        { name: 'HR Digital Transformation', role: 'Project Lead', status: 'active', hours: 234 },
        { name: 'Employee Wellness Program', role: 'Sponsor', status: 'completed', hours: 89 }
      ],
      metrics: {
        employeeSatisfaction: { score: 4.6, target: 4.5, trend: '+0.3' },
        retention: { rate: 92, target: 90, trend: '+2%' },
        hiringTime: { days: 28, target: 35, performance: 'excellent' },
        compliance: { score: 100, audits: 4 }
      }
    }
  ];

  const departments = [
    { id: 'all', name: 'All Departments', count: employees.length },
    { id: 'legal', name: 'Legal', count: employees.filter(e => e.department === 'Legal').length },
    { id: 'hr', name: 'Human Resources', count: employees.filter(e => e.department === 'Human Resources').length },
    { id: 'admin', name: 'Administration', count: 0 },
    { id: 'it', name: 'IT', count: 0 },
    { id: 'finance', name: 'Finance', count: 0 }
  ];

  const organizationMetrics = {
    totalEmployees: employees.length,
    activeEmployees: employees.filter(e => e.status === 'active').length,
    avgTenure: '3.2 years',
    turnoverRate: '8%',
    avgSalary: '$95,000',
    diversityScore: '78%',
    engagementScore: '4.5/5',
    trainingHours: '42 hrs/employee'
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = 
      filterDepartment === 'all' || 
      employee.department.toLowerCase() === filterDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  const toggleEmployeeSelection = (employeeId) => {
    setSelectedEmployees(prev =>
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const renderEmployeeDirectory = () => (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white w-96 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
          </div>
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500"
          >
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>
                {dept.name} ({dept.count})
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3">
          {selectedEmployees.length > 0 && (
            <button
              onClick={() => setShowBulkActions(!showBulkActions)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              {selectedEmployees.length} Selected
            </button>
          )}
          <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Import
          </button>
          <button
            onClick={() => setShowAddEmployee(true)}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Employee Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map(employee => (
          <div
            key={employee.id}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all cursor-pointer group"
            onClick={() => setSelectedEmployee(employee)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {employee.firstName[0]}{employee.lastName[0]}
                    </span>
                  </div>
                  <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-gray-800 ${
                    employee.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                  }`} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    {employee.firstName} {employee.lastName}
                  </h3>
                  <p className="text-gray-400 text-sm">{employee.position}</p>
                  <p className="text-purple-400 text-xs mt-1">{employee.department}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedEmployees.includes(employee.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleEmployeeSelection(employee.id);
                  }}
                  className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // More actions menu
                  }}
                  className="p-1 hover:bg-gray-700 rounded transition-colors"
                >
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4" />
                <span className="truncate">{employee.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4" />
                <span>{employee.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>{employee.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Started {new Date(employee.startDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(employee.performanceRating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-400 ml-1">{employee.performanceRating}</span>
                </div>
                <button className="text-purple-400 hover:text-purple-300 text-sm font-medium group-hover:underline">
                  View Profile →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEmployeeProfile = () => {
    if (!selectedEmployee) return null;

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 p-8 rounded-t-2xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-3xl">
                      {selectedEmployee.firstName[0]}{selectedEmployee.lastName[0]}
                    </span>
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    {selectedEmployee.firstName} {selectedEmployee.lastName}
                  </h2>
                  <p className="text-purple-200 text-lg">{selectedEmployee.position}</p>
                  <p className="text-gray-300 mt-2">{selectedEmployee.bio}</p>
                  <div className="flex items-center gap-4 mt-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedEmployee.status === 'active'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {selectedEmployee.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-gray-400 text-sm">ID: {selectedEmployee.employeeId}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedEmployee(null)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Contact & Personal Info */}
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-gray-400 text-xs">Email</p>
                        <p className="text-white">{selectedEmployee.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-gray-400 text-xs">Phone</p>
                        <p className="text-white">{selectedEmployee.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-gray-400 text-xs">Location</p>
                        <p className="text-white">{selectedEmployee.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">Employment Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-400 text-xs">Department</p>
                      <p className="text-white">{selectedEmployee.department}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Manager</p>
                      <p className="text-white">{selectedEmployee.manager}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Start Date</p>
                      <p className="text-white">{new Date(selectedEmployee.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Salary</p>
                      <p className="text-white">${selectedEmployee.salary.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">Emergency Contact</h3>
                  <div className="space-y-2">
                    <p className="text-white">{selectedEmployee.emergencyContact.name}</p>
                    <p className="text-gray-400 text-sm">{selectedEmployee.emergencyContact.relationship}</p>
                    <p className="text-gray-400 text-sm">{selectedEmployee.emergencyContact.phone}</p>
                  </div>
                </div>
              </div>

              {/* Middle Column - Performance & Projects */}
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">Performance Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Performance Rating</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(selectedEmployee.performanceRating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-600'
                              }`}
                            />
                          ))}
                          <span className="text-white ml-2">{selectedEmployee.performanceRating}</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        Last Review: {selectedEmployee.lastReview}
                      </div>
                      <div className="text-xs text-gray-400">
                        Next Review: {selectedEmployee.nextReview}
                      </div>
                    </div>

                    {selectedEmployee.metrics && (
                      <div className="space-y-3 pt-3 border-t border-gray-700">
                        {Object.entries(selectedEmployee.metrics).map(([key, value]) => (
                          <div key={key}>
                            <p className="text-gray-400 text-xs capitalize mb-1">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                            <div className="bg-gray-700 rounded-lg p-2">
                              {typeof value === 'object' ? (
                                <div className="text-sm text-white">
                                  {Object.entries(value).map(([k, v]) => (
                                    <span key={k} className="mr-3">
                                      {k}: <span className="font-semibold">{v}</span>
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-white">{value}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">Active Projects</h3>
                  <div className="space-y-3">
                    {selectedEmployee.projects.map((project, index) => (
                      <div key={index} className="p-3 bg-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-medium">{project.name}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            project.status === 'active'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Role: {project.role}</span>
                          <span className="text-gray-400">{project.hours} hours</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">Time Off Balance</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Vacation</span>
                      <span className="text-white font-semibold">{selectedEmployee.timeOffBalance.vacation} days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Sick Leave</span>
                      <span className="text-white font-semibold">{selectedEmployee.timeOffBalance.sick} days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Personal</span>
                      <span className="text-white font-semibold">{selectedEmployee.timeOffBalance.personal} days</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - History & Documents */}
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">Work History</h3>
                  <div className="space-y-3">
                    {selectedEmployee.workHistory.map((job, index) => (
                      <div key={index} className="relative pl-6">
                        <div className="absolute left-0 top-2 w-2 h-2 bg-purple-500 rounded-full" />
                        <div className="absolute left-1 top-4 bottom-0 w-px bg-gray-700" />
                        <div>
                          <h4 className="text-white font-medium">{job.position}</h4>
                          <p className="text-gray-400 text-sm">{job.company}</p>
                          <p className="text-gray-500 text-xs">
                            {job.startDate} - {job.current ? 'Present' : job.endDate}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">Education</h3>
                  <div className="space-y-3">
                    {selectedEmployee.education.map((edu, index) => (
                      <div key={index} className="p-3 bg-gray-700 rounded-lg">
                        <h4 className="text-white font-medium">{edu.degree}</h4>
                        <p className="text-gray-400 text-sm">{edu.school}</p>
                        <p className="text-gray-500 text-xs">Class of {edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">Documents</h3>
                  <div className="space-y-2">
                    {selectedEmployee.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-purple-400" />
                          <div>
                            <p className="text-white text-sm">{doc.name}</p>
                            <p className="text-gray-500 text-xs">{doc.type} • {doc.date}</p>
                          </div>
                        </div>
                        <Eye className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                    Upload Document
                  </button>
                </div>

                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">Skills & Certifications</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-400 text-xs mb-2">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedEmployee.skills.map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-2">Certifications</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedEmployee.certifications.map((cert, index) => (
                          <span key={index} className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-700">
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>
                <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Send Message
                </button>
                <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Schedule Meeting
                </button>
                <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Profile
                </button>
              </div>
              <button className="px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Deactivate Employee
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOrganizationChart = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Organization Structure</h3>
        <div className="flex flex-col items-center">
          {/* CEO Level */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-4 text-white mb-8">
            <div className="text-center">
              <h4 className="font-semibold">Carl E. Douglas</h4>
              <p className="text-sm opacity-90">Founding Partner</p>
            </div>
          </div>
          
          {/* Department Heads */}
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div className="bg-gray-700 rounded-xl p-4 text-center">
              <h4 className="text-white font-semibold">Legal Department</h4>
              <p className="text-gray-400 text-sm">Michael Chen</p>
              <p className="text-gray-500 text-xs">Senior Associate</p>
            </div>
            <div className="bg-gray-700 rounded-xl p-4 text-center">
              <h4 className="text-white font-semibold">HR Department</h4>
              <p className="text-gray-400 text-sm">Sarah Mitchell</p>
              <p className="text-gray-500 text-xs">HR Director</p>
            </div>
            <div className="bg-gray-700 rounded-xl p-4 text-center">
              <h4 className="text-white font-semibold">Administration</h4>
              <p className="text-gray-400 text-sm">Vacant</p>
              <p className="text-gray-500 text-xs">Admin Director</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(organizationMetrics).map(([key, value]) => (
          <div key={key} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <p className="text-gray-400 text-sm capitalize mb-2">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </p>
            <p className="text-2xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Department Distribution</h3>
          <div className="space-y-4">
            {departments.filter(d => d.id !== 'all' && d.count > 0).map(dept => (
              <div key={dept.id}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">{dept.name}</span>
                  <span className="text-white font-semibold">{dept.count} employees</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                    style={{ width: `${(dept.count / employees.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Performance Distribution</h3>
          <div className="space-y-4">
            {[
              { rating: '4.5 - 5.0', count: 2, label: 'Exceptional' },
              { rating: '4.0 - 4.4', count: 1, label: 'Exceeds Expectations' },
              { rating: '3.5 - 3.9', count: 0, label: 'Meets Expectations' },
              { rating: 'Below 3.5', count: 0, label: 'Needs Improvement' }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-white">{item.label}</span>
                    <span className="text-gray-400 text-sm ml-2">({item.rating})</span>
                  </div>
                  <span className="text-white font-semibold">{item.count}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      index === 0 ? 'bg-green-500' :
                      index === 1 ? 'bg-blue-500' :
                      index === 2 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${(item.count / employees.length) * 100}%` }}
                  />
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
        <h1 className="text-3xl font-bold text-white">Employee Management</h1>
        <div className="flex gap-2 bg-gray-800 p-1 rounded-lg">
          {[
            { id: 'directory', label: 'Directory', icon: Users },
            { id: 'org-chart', label: 'Org Chart', icon: Building },
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
      {activeView === 'directory' && renderEmployeeDirectory()}
      {activeView === 'org-chart' && renderOrganizationChart()}
      {activeView === 'analytics' && renderAnalytics()}

      {/* Employee Profile Modal */}
      {selectedEmployee && renderEmployeeProfile()}
    </div>
  );
}