'use client';

import { useState, useEffect } from 'react';
import { 
  DollarSign, Calendar, Clock, Download, Upload, Eye, Edit3,
  CreditCard, Building, Users, Star, TrendingUp, BarChart3,
  FileText, CheckCircle, AlertTriangle, Info, Shield, Plus,
  Minus, Calculator, PieChart, Target, Activity, Briefcase,
  MapPin, Phone, Mail, Globe, Flag, Award, Zap, Brain,
  ChevronRight, ChevronDown, Filter, Search, Send, X,
  ArrowUpRight, ArrowDownRight, Circle, Play, Pause
} from 'lucide-react';

export default function PayrollManagement() {
  const [activeView, setActiveView] = useState('payroll');
  const [selectedPayPeriod, setSelectedPayPeriod] = useState('current');
  const [showPayrollDetail, setShowPayrollDetail] = useState(null);
  const [showTaxCalculator, setShowTaxCalculator] = useState(false);

  // Comprehensive payroll data
  const payrollPeriods = [
    {
      id: 'current',
      period: 'January 16-31, 2025',
      status: 'processing',
      payDate: '2025-02-05',
      totalGross: 52750,
      totalNet: 39562.50,
      totalTaxes: 13187.50,
      employeeCount: 3,
      hoursWorked: 360,
      overtime: 12,
      bonuses: 5000,
      deductions: 3250
    },
    {
      id: 'previous',
      period: 'January 1-15, 2025',
      status: 'completed',
      payDate: '2025-01-20',
      totalGross: 48500,
      totalNet: 36375,
      totalTaxes: 12125,
      employeeCount: 3,
      hoursWorked: 340,
      overtime: 8,
      bonuses: 2000,
      deductions: 3100
    }
  ];

  const payrollDetails = [
    {
      employeeId: 1,
      employeeName: 'Michael Chen',
      position: 'Senior Associate Attorney',
      department: 'Legal',
      employeeType: 'salary',
      baseSalary: 125000,
      payPeriod: 'current',
      hoursWorked: 80,
      regularHours: 80,
      overtimeHours: 0,
      regularRate: 60.10,
      overtimeRate: 90.15,
      grossPay: 4808.00,
      bonuses: 2000,
      commissions: 0,
      totalGross: 6808.00,
      taxes: {
        federal: 1361.60,
        state: 340.40,
        medicare: 98.72,
        socialSecurity: 422.10,
        sdi: 68.08,
        total: 2290.90
      },
      deductions: {
        healthInsurance: 420,
        dental: 45,
        vision: 15,
        retirement401k: 680.80,
        lifeInsurance: 25,
        parking: 50,
        total: 1235.80
      },
      netPay: 3281.30,
      directDeposit: {
        enabled: true,
        primary: {
          accountType: 'checking',
          routingNumber: '****1234',
          accountNumber: '****5678',
          percentage: 100
        }
      },
      payStubItems: [
        { description: 'Regular Hours (80)', amount: 4808.00, type: 'earning' },
        { description: 'Performance Bonus', amount: 2000.00, type: 'earning' },
        { description: 'Federal Tax', amount: -1361.60, type: 'tax' },
        { description: 'State Tax (CA)', amount: -340.40, type: 'tax' },
        { description: 'Medicare', amount: -98.72, type: 'tax' },
        { description: 'Social Security', amount: -422.10, type: 'tax' },
        { description: 'CA SDI', amount: -68.08, type: 'tax' },
        { description: 'Health Insurance', amount: -420.00, type: 'deduction' },
        { description: '401(k)', amount: -680.80, type: 'deduction' },
        { description: 'Other Deductions', amount: -135.00, type: 'deduction' }
      ],
      ytdEarnings: {
        grossPay: 15616.00,
        netPay: 11237.80,
        federalTax: 3123.20,
        stateTax: 780.80,
        medicare: 226.43,
        socialSecurity: 967.39,
        retirement401k: 1561.60
      }
    },
    {
      employeeId: 2,
      employeeName: 'Jennifer Davis',
      position: 'Legal Assistant',
      department: 'Legal',
      employeeType: 'hourly',
      hourlyRate: 31.25,
      payPeriod: 'current',
      hoursWorked: 84,
      regularHours: 80,
      overtimeHours: 4,
      regularRate: 31.25,
      overtimeRate: 46.88,
      grossPay: 2687.50,
      bonuses: 500,
      commissions: 0,
      totalGross: 3187.50,
      taxes: {
        federal: 478.13,
        state: 159.38,
        medicare: 46.22,
        socialSecurity: 197.63,
        sdi: 31.88,
        total: 913.24
      },
      deductions: {
        healthInsurance: 280,
        dental: 30,
        vision: 10,
        retirement401k: 159.38,
        lifeInsurance: 15,
        parking: 50,
        total: 544.38
      },
      netPay: 1729.88,
      directDeposit: {
        enabled: true,
        primary: {
          accountType: 'checking',
          routingNumber: '****5678',
          accountNumber: '****9012',
          percentage: 100
        }
      },
      payStubItems: [
        { description: 'Regular Hours (80)', amount: 2500.00, type: 'earning' },
        { description: 'Overtime Hours (4)', amount: 187.50, type: 'earning' },
        { description: 'New Hire Bonus', amount: 500.00, type: 'earning' },
        { description: 'Federal Tax', amount: -478.13, type: 'tax' },
        { description: 'State Tax (CA)', amount: -159.38, type: 'tax' },
        { description: 'Medicare', amount: -46.22, type: 'tax' },
        { description: 'Social Security', amount: -197.63, type: 'tax' },
        { description: 'CA SDI', amount: -31.88, type: 'tax' },
        { description: 'Health Insurance', amount: -280.00, type: 'deduction' },
        { description: '401(k)', amount: -159.38, type: 'deduction' },
        { description: 'Other Deductions', amount: -105.00, type: 'deduction' }
      ],
      ytdEarnings: {
        grossPay: 6375.00,
        netPay: 4114.63,
        federalTax: 956.25,
        stateTax: 318.75,
        medicare: 92.44,
        socialSecurity: 395.25,
        retirement401k: 318.75
      }
    },
    {
      employeeId: 3,
      employeeName: 'Sarah Mitchell',
      position: 'HR Director',
      department: 'Human Resources',
      employeeType: 'salary',
      baseSalary: 95000,
      payPeriod: 'current',
      hoursWorked: 80,
      regularHours: 80,
      overtimeHours: 0,
      regularRate: 45.67,
      overtimeRate: 68.51,
      grossPay: 3653.85,
      bonuses: 2500,
      commissions: 0,
      totalGross: 6153.85,
      taxes: {
        federal: 1230.77,
        state: 307.69,
        medicare: 89.23,
        socialSecurity: 381.54,
        sdi: 61.54,
      total: 2070.77
      },
      deductions: {
        healthInsurance: 350,
        dental: 40,
        vision: 12,
        retirement401k: 615.39,
        lifeInsurance: 20,
        parking: 50,
        total: 1087.39
      },
      netPay: 2995.69,
      directDeposit: {
        enabled: true,
        primary: {
          accountType: 'checking',
          routingNumber: '****9012',
          accountNumber: '****3456',
          percentage: 90
        },
        secondary: {
          accountType: 'savings',
          routingNumber: '****9012',
          accountNumber: '****7890',
          percentage: 10
        }
      },
      payStubItems: [
        { description: 'Regular Hours (80)', amount: 3653.85, type: 'earning' },
        { description: 'Leadership Bonus', amount: 2500.00, type: 'earning' },
        { description: 'Federal Tax', amount: -1230.77, type: 'tax' },
        { description: 'State Tax (CA)', amount: -307.69, type: 'tax' },
        { description: 'Medicare', amount: -89.23, type: 'tax' },
        { description: 'Social Security', amount: -381.54, type: 'tax' },
        { description: 'CA SDI', amount: -61.54, type: 'tax' },
        { description: 'Health Insurance', amount: -350.00, type: 'deduction' },
        { description: '401(k)', amount: -615.39, type: 'deduction' },
        { description: 'Other Deductions', amount: -122.00, type: 'deduction' }
      ],
      ytdEarnings: {
        grossPay: 13307.70,
        netPay: 9541.23,
        federalTax: 2661.54,
        stateTax: 665.39,
        medicare: 192.96,
        socialSecurity: 825.08,
        retirement401k: 1330.77
      }
    }
  ];

  const taxRates = {
    federal: {
      brackets: [
        { min: 0, max: 11000, rate: 0.10 },
        { min: 11000, max: 44725, rate: 0.12 },
        { min: 44725, max: 95375, rate: 0.22 },
        { min: 95375, max: 197050, rate: 0.24 }
      ]
    },
    california: {
      rate: 0.05, // Simplified
      sdi: 0.009,
      disability: 0.009
    },
    medicare: 0.0145,
    socialSecurity: 0.062,
    unemployment: 0.006
  };

  const complianceItems = [
    {
      type: 'tax_filing',
      title: 'Q4 2025 941 Filing',
      dueDate: '2025-01-31',
      status: 'completed',
      description: 'Federal quarterly tax return'
    },
    {
      type: 'state_filing',
      title: 'CA DE 9 Filing',
      dueDate: '2025-01-31',
      status: 'pending',
      description: 'California quarterly payroll tax return'
    },
    {
      type: 'annual_filing',
      title: 'W-2 Distribution',
      dueDate: '2025-01-31',
      status: 'in_progress',
      description: 'Distribute W-2s to all employees'
    },
    {
      type: 'audit',
      title: 'Workers Comp Audit',
      dueDate: '2025-03-15',
      status: 'scheduled',
      description: 'Annual workers compensation audit'
    }
  ];

  const renderPayrollOverview = () => (
    <div className="space-y-6">
      {/* Current Payroll Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-green-300 text-sm font-semibold">Total Gross Pay</p>
              <p className="text-3xl font-bold text-white">${payrollPeriods[0].totalGross.toLocaleString()}</p>
            </div>
            <DollarSign className="w-10 h-10 text-green-400" />
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-semibold">+8.8%</span>
            <span className="text-gray-400 text-sm">vs last period</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-blue-300 text-sm font-semibold">Net Payroll</p>
              <p className="text-3xl font-bold text-white">${payrollPeriods[0].totalNet.toLocaleString()}</p>
            </div>
            <CreditCard className="w-10 h-10 text-blue-400" />
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-semibold">Due {payrollPeriods[0].payDate}</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-purple-300 text-sm font-semibold">Total Taxes</p>
              <p className="text-3xl font-bold text-white">${payrollPeriods[0].totalTaxes.toLocaleString()}</p>
            </div>
            <Shield className="w-10 h-10 text-purple-400" />
          </div>
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-sm font-semibold">25.0%</span>
            <span className="text-gray-400 text-sm">effective rate</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-900/30 to-orange-800/30 border border-orange-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-orange-300 text-sm font-semibold">Employees Paid</p>
              <p className="text-3xl font-bold text-white">{payrollPeriods[0].employeeCount}</p>
            </div>
            <Users className="w-10 h-10 text-orange-400" />
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 text-sm font-semibold">{payrollPeriods[0].hoursWorked}</span>
            <span className="text-gray-400 text-sm">total hours</span>
          </div>
        </div>
      </div>

      {/* Payroll Periods */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6">Payroll Periods</h3>
        <div className="space-y-4">
          {payrollPeriods.map(period => (
            <div
              key={period.id}
              className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
              onClick={() => setShowPayrollDetail(period)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="text-white font-semibold">{period.period}</h4>
                    <p className="text-gray-400 text-sm">Pay Date: {period.payDate}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    period.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    period.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {period.status.charAt(0).toUpperCase() + period.status.slice(1)}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Gross Pay</p>
                  <p className="text-white font-semibold">${period.totalGross.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Net Pay</p>
                  <p className="text-white font-semibold">${period.totalNet.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Employees</p>
                  <p className="text-white font-semibold">{period.employeeCount}</p>
                </div>
                <div>
                  <p className="text-gray-400">Hours</p>
                  <p className="text-white font-semibold">{period.hoursWorked}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Employee Payroll Details */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Current Period Details</h3>
          <div className="flex gap-3">
            <button
              onClick={() => setShowTaxCalculator(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              Tax Calculator
            </button>
            <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Payroll
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {payrollDetails.filter(p => p.payPeriod === 'current').map(employee => (
            <div key={employee.employeeId} className="p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {employee.employeeName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{employee.employeeName}</h4>
                    <p className="text-gray-400 text-sm">{employee.position}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-lg">${employee.netPay.toLocaleString()}</p>
                  <p className="text-gray-400 text-sm">Net Pay</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Gross Pay</p>
                  <p className="text-white font-semibold">${employee.totalGross.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Taxes</p>
                  <p className="text-white font-semibold">${employee.taxes.total.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Deductions</p>
                  <p className="text-white font-semibold">${employee.deductions.total.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Hours</p>
                  <p className="text-white font-semibold">{employee.hoursWorked}</p>
                </div>
                <div>
                  <p className="text-gray-400">Direct Deposit</p>
                  <p className={`font-semibold ${employee.directDeposit.enabled ? 'text-green-400' : 'text-red-400'}`}>
                    {employee.directDeposit.enabled ? 'Enabled' : 'Check'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-600">
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                    View Paystub
                  </button>
                  <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-500 transition-colors">
                    Edit
                  </button>
                </div>
                <span className="text-gray-400 text-sm">
                  YTD: ${employee.ytdEarnings.grossPay.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderComplianceCenter = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6">Tax & Compliance Dashboard</h3>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Compliance Items */}
          <div>
            <h4 className="text-white font-semibold mb-4">Upcoming Compliance Items</h4>
            <div className="space-y-3">
              {complianceItems.map((item, index) => (
                <div key={index} className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-white font-medium">{item.title}</h5>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      item.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
                      item.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {item.status.replace('_', ' ').charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{item.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">Due: {item.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tax Summary */}
          <div>
            <h4 className="text-white font-semibold mb-4">YTD Tax Summary</h4>
            <div className="space-y-4">
              <div className="p-4 bg-gray-700 rounded-lg">
                <h5 className="text-white font-medium mb-3">Federal Taxes</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Income Tax Withheld</span>
                    <span className="text-white">$6,741.08</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Social Security</span>
                    <span className="text-white">$2,187.72</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Medicare</span>
                    <span className="text-white">$511.83</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-white">Total Federal</span>
                    <span className="text-white">$9,440.63</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-700 rounded-lg">
                <h5 className="text-white font-medium mb-3">State Taxes (California)</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Income Tax Withheld</span>
                    <span className="text-white">$1,764.94</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">SDI</span>
                    <span className="text-white">$317.33</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-white">Total State</span>
                    <span className="text-white">$2,082.27</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-900/30 border border-purple-500/30 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-purple-300 font-semibold">Total Tax Liability</span>
                  <span className="text-white font-bold text-lg">$11,522.90</span>
                </div>
              </div>
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
          <p className="text-gray-400 text-sm mb-2">Average Salary</p>
          <p className="text-2xl font-bold text-white">$95,000</p>
          <div className="flex items-center gap-2 mt-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">+5.2%</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Payroll Efficiency</p>
          <p className="text-2xl font-bold text-white">94%</p>
          <div className="flex items-center gap-2 mt-2">
            <Target className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm">On Target</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Overtime Hours</p>
          <p className="text-2xl font-bold text-white">12</p>
          <div className="flex items-center gap-2 mt-2">
            <Clock className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 text-sm">Current Period</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Benefits Cost</p>
          <p className="text-2xl font-bold text-white">$2,867</p>
          <div className="flex items-center gap-2 mt-2">
            <Shield className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-sm">Per Period</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Payroll Trends</h3>
          <div className="h-64 flex items-center justify-center">
            <BarChart3 className="w-16 h-16 text-gray-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Cost Distribution</h3>
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
        <h1 className="text-3xl font-bold text-white">Payroll Management</h1>
        <div className="flex gap-2 bg-gray-800 p-1 rounded-lg">
          {[
            { id: 'payroll', label: 'Payroll', icon: DollarSign },
            { id: 'compliance', label: 'Compliance', icon: Shield },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'benefits', label: 'Benefits', icon: Award }
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
      {activeView === 'payroll' && renderPayrollOverview()}
      {activeView === 'compliance' && renderComplianceCenter()}
      {activeView === 'analytics' && renderAnalytics()}
      {activeView === 'benefits' && (
        <div className="bg-gray-800 rounded-xl p-8 text-center">
          <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Benefits Administration</h3>
          <p className="text-gray-400">Comprehensive benefits management and enrollment system</p>
        </div>
      )}

      {/* Tax Calculator Modal */}
      {showTaxCalculator && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Tax Calculator</h3>
                <button
                  onClick={() => setShowTaxCalculator(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Annual Salary</label>
                  <input
                    type="number"
                    placeholder="125000"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Filing Status</label>
                  <select className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500">
                    <option>Single</option>
                    <option>Married Filing Jointly</option>
                    <option>Married Filing Separately</option>
                    <option>Head of Household</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-2">State</label>
                  <select className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500">
                    <option>California</option>
                    <option>New York</option>
                    <option>Texas</option>
                    <option>Florida</option>
                  </select>
                </div>
                <button className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                  Calculate Taxes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}