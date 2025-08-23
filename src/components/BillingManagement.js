'use client';
import { useState, useEffect } from 'react';
import { 
  DollarSign, CreditCard, Calendar, Clock, FileText, User,
  TrendingUp, TrendingDown, BarChart3, PieChart, Target,
  CheckCircle, AlertCircle, Eye, Edit, Send, Download,
  Plus, Search, Filter, RefreshCw, Settings, Award,
  ArrowUp, ArrowDown, ArrowRight, Banknote, Wallet,
  Calculator, Receipt, Building, Globe, Phone, Mail,
  Brain, Zap, Star, Shield, Crown, Scale
} from 'lucide-react';

export default function BillingManagement() {
  const [activeView, setActiveView] = useState('overview');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [dateRange, setDateRange] = useState('month');

  // Billing analytics data
  const billingMetrics = {
    revenue: {
      thisMonth: 485000,
      lastMonth: 421000,
      growth: 15.2,
      ytd: 4850000,
      target: 500000
    },
    outstanding: {
      total: 127500,
      overdue: 38000,
      current: 89500,
      averageDays: 28
    },
    billableHours: {
      recorded: 1247,
      billed: 1189,
      unbilled: 58,
      rate: 389
    },
    collections: {
      rate: 94.3,
      speed: 22,
      efficiency: 89.7
    }
  };

  // Invoice data
  const invoices = [
    {
      id: 'INV-2025-0156',
      client: 'Rodriguez Family',
      case: 'Rodriguez v. LAPD',
      amount: 45000,
      issued: '2025-01-15',
      due: '2025-02-14',
      status: 'Paid',
      paymentDate: '2025-01-28',
      hours: 115.5,
      rate: 389,
      description: 'Legal services for police misconduct case - Discovery phase',
      items: [
        { description: 'Legal Research - Excessive Force Precedents', hours: 24.5, rate: 389, amount: 9530.50 },
        { description: 'Client Meetings and Case Strategy', hours: 18.0, rate: 389, amount: 7002.00 },
        { description: 'Document Review and Analysis', hours: 32.0, rate: 389, amount: 12448.00 },
        { description: 'Motion Preparation', hours: 28.5, rate: 389, amount: 11086.50 },
        { description: 'Court Appearances', hours: 12.5, rate: 389, amount: 4862.50 }
      ],
      expenses: [
        { description: 'Court Filing Fees', amount: 350.00 },
        { description: 'Expert Witness Consultation', amount: 2500.00 },
        { description: 'Document Production Costs', amount: 186.50 }
      ]
    },
    {
      id: 'INV-2025-0147',
      client: 'Johnson Construction LLC',
      case: 'Johnson Medical Malpractice',
      amount: 32750,
      issued: '2025-01-10',
      due: '2025-02-09',
      status: 'Outstanding',
      paymentDate: null,
      hours: 84.2,
      rate: 389,
      description: 'Legal services for medical malpractice case - Expert review phase',
      items: [
        { description: 'Medical Record Review', hours: 28.0, rate: 389, amount: 10892.00 },
        { description: 'Expert Witness Coordination', hours: 16.5, rate: 389, amount: 6418.50 },
        { description: 'Settlement Negotiations', hours: 22.2, rate: 389, amount: 8635.80 },
        { description: 'Legal Research - Medical Standards', hours: 17.5, rate: 389, amount: 6807.50 }
      ],
      expenses: [
        { description: 'Medical Expert Consultation', amount: 5000.00 },
        { description: 'Medical Records Acquisition', amount: 450.00 },
        { description: 'Travel Expenses', amount: 286.20 }
      ]
    },
    {
      id: 'INV-2025-0138',
      client: 'Tech Innovations Inc',
      case: 'Chen Employment Discrimination',
      amount: 28900,
      issued: '2025-01-05',
      due: '2025-02-04',
      status: 'Overdue',
      paymentDate: null,
      hours: 74.3,
      rate: 389,
      description: 'Legal services for employment discrimination case - Discovery phase',
      items: [
        { description: 'Employment Law Research', hours: 22.0, rate: 389, amount: 8558.00 },
        { description: 'Discovery Request Preparation', hours: 18.5, rate: 389, amount: 7196.50 },
        { description: 'Witness Interviews', hours: 15.8, rate: 389, amount: 6146.20 },
        { description: 'Case Strategy Development', hours: 18.0, rate: 389, amount: 7002.00 }
      ],
      expenses: [
        { description: 'Deposition Costs', amount: 1200.00 },
        { description: 'Document Production', amount: 325.50 },
        { description: 'Expert Consultation', amount: 1500.00 }
      ]
    }
  ];

  // AI billing insights
  const aiInsights = {
    rateOptimization: {
      currentRate: 389,
      suggestedRate: 425,
      increase: 36,
      justification: 'Market analysis shows 9.3% rate increase is justified for your experience level',
      confidence: 89,
      impact: '+$45,000 annual revenue'
    },
    collectionOptimization: [
      {
        client: 'Tech Innovations Inc',
        suggestion: 'Follow up on overdue invoice INV-2025-0138',
        urgency: 'High',
        impact: 'Prevent further aging of $28,900 receivable'
      },
      {
        client: 'Johnson Construction LLC',
        suggestion: 'Send payment reminder for invoice due in 12 days',
        urgency: 'Medium',
        impact: 'Maintain good payment relationship'
      }
    ],
    billingEfficiency: [
      {
        metric: 'Time Entry Delays',
        current: '2.3 days average',
        target: '1 day',
        improvement: 'Implement daily time entry reminders'
      },
      {
        metric: 'Invoice Processing Time',
        current: '3.5 days',
        target: '1 day',
        improvement: 'Automate invoice generation from time entries'
      }
    ]
  };

  // Monthly billing projections
  const monthlyProjections = [
    { month: 'Jan', actual: 485000, projected: 485000, target: 500000 },
    { month: 'Feb', actual: null, projected: 515000, target: 520000 },
    { month: 'Mar', actual: null, projected: 535000, target: 540000 },
    { month: 'Apr', actual: null, projected: 520000, target: 530000 },
    { month: 'May', actual: null, projected: 545000, target: 550000 },
    { month: 'Jun', actual: null, projected: 525000, target: 535000 }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-500/20 text-green-400';
      case 'Outstanding': return 'bg-blue-500/20 text-blue-400';
      case 'Overdue': return 'bg-red-500/20 text-red-400';
      case 'Draft': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getDaysOverdue = (dueDate) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = today - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="space-y-6">
      {/* Billing Overview */}
      {activeView === 'overview' && (
        <>
          {/* Key Billing Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-green-300 text-sm font-semibold">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-white">{formatCurrency(billingMetrics.revenue.thisMonth)}</p>
                </div>
                <DollarSign className="w-10 h-10 text-green-400" />
              </div>
              <div className="flex items-center gap-2">
                <ArrowUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm font-semibold">+{billingMetrics.revenue.growth}%</span>
                <span className="text-gray-400 text-sm">vs last month</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-blue-300 text-sm font-semibold">Outstanding</p>
                  <p className="text-3xl font-bold text-white">{formatCurrency(billingMetrics.outstanding.total)}</p>
                </div>
                <CreditCard className="w-10 h-10 text-blue-400" />
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 text-sm font-semibold">{billingMetrics.outstanding.averageDays} days</span>
                <span className="text-gray-400 text-sm">avg collection</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-purple-300 text-sm font-semibold">Billable Hours</p>
                  <p className="text-3xl font-bold text-white">{billingMetrics.billableHours.recorded}</p>
                </div>
                <Clock className="w-10 h-10 text-purple-400" />
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400 text-sm font-semibold">{billingMetrics.billableHours.unbilled} unbilled</span>
                <span className="text-gray-400 text-sm">hours</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-900/30 to-orange-800/30 border border-orange-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-orange-300 text-sm font-semibold">Collection Rate</p>
                  <p className="text-3xl font-bold text-white">{billingMetrics.collections.rate}%</p>
                </div>
                <TrendingUp className="w-10 h-10 text-orange-400" />
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400 text-sm font-semibold">{billingMetrics.collections.efficiency}%</span>
                <span className="text-gray-400 text-sm">efficiency</span>
              </div>
            </div>
          </div>

          {/* Revenue Projections */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Revenue Projections</h3>
              <div className="flex gap-3">
                <select 
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-2 bg-gray-700 rounded-lg text-white text-sm"
                >
                  <option value="month">Monthly</option>
                  <option value="quarter">Quarterly</option>
                  <option value="year">Yearly</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              {monthlyProjections.map((month, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-12 text-gray-400 text-sm font-semibold">{month.month}</div>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 bg-gray-700 rounded-full h-6 relative">
                      {month.actual && (
                        <div 
                          className="bg-gradient-to-r from-[#f4c900] to-[#b68600] h-6 rounded-full flex items-center justify-center text-black text-xs font-bold"
                          style={{ width: `${(month.actual / 600000) * 100}%` }}
                        >
                          Actual
                        </div>
                      )}
                      {!month.actual && (
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-blue-800 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ width: `${(month.projected / 600000) * 100}%` }}
                        >
                          Projected
                        </div>
                      )}
                      <div 
                        className="absolute top-0 border-r-2 border-white h-6"
                        style={{ left: `${(month.target / 600000) * 100}%` }}
                        title="Target"
                      />
                    </div>
                    <div className="text-right w-24">
                      <div className="text-white font-bold text-sm">
                        {formatCurrency(month.actual || month.projected)}
                      </div>
                      <div className="text-gray-400 text-xs">
                        Target: {formatCurrency(month.target)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Invoices View */}
      {activeView === 'invoices' && (
        <div className="space-y-6">
          {/* Invoice Actions */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Invoice Management</h2>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-[#f4c900] to-[#b68600] rounded-lg text-black font-semibold hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Invoice
              </button>
            </div>
          </div>

          {/* Invoice List */}
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{invoice.id}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                        {invoice.status === 'Overdue' && ` (${getDaysOverdue(invoice.due)} days)`}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-400">Client</p>
                        <p className="text-white font-semibold">{invoice.client}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Case</p>
                        <p className="text-white font-semibold">{invoice.case}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Issued</p>
                        <p className="text-white font-semibold">{invoice.issued}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Due Date</p>
                        <p className="text-white font-semibold">{invoice.due}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">{invoice.description}</p>
                  </div>
                  <div className="text-right ml-6">
                    <p className="text-3xl font-bold text-white">{formatCurrency(invoice.amount)}</p>
                    <p className="text-gray-400 text-sm">{invoice.hours} hours @ ${invoice.rate}/hr</p>
                    {invoice.paymentDate && (
                      <p className="text-green-400 text-sm">Paid: {invoice.paymentDate}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => setSelectedInvoice(invoice)}
                    className="px-4 py-2 bg-gradient-to-r from-[#f4c900] to-[#b68600] text-black rounded-lg font-semibold hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300 flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button className="px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  {invoice.status !== 'Paid' && (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Optimization View */}
      {activeView === 'optimization' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-8 h-8 text-purple-400" />
              <div>
                <h3 className="text-2xl font-bold text-white">AI Billing Optimization</h3>
                <p className="text-gray-400">Data-driven recommendations to maximize revenue and collections</p>
              </div>
            </div>

            {/* Rate Optimization */}
            <div className="mb-8">
              <h4 className="text-white font-bold mb-4">Hourly Rate Analysis</h4>
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-green-300 font-semibold">Recommended Rate Increase</p>
                    <p className="text-gray-300 text-sm">{aiInsights.rateOptimization.justification}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">
                      ${aiInsights.rateOptimization.currentRate} → ${aiInsights.rateOptimization.suggestedRate}
                    </p>
                    <p className="text-green-400 font-semibold">{aiInsights.rateOptimization.impact}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-semibold">{aiInsights.rateOptimization.confidence}% confidence</span>
                  <span className="text-gray-400">based on market analysis</span>
                </div>
              </div>
            </div>

            {/* Collection Optimization */}
            <div className="mb-8">
              <h4 className="text-white font-bold mb-4">Collection Recommendations</h4>
              <div className="space-y-3">
                {aiInsights.collectionOptimization.map((rec, idx) => (
                  <div key={idx} className="p-4 bg-gray-900/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-white font-semibold">{rec.client}</h5>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        rec.urgency === 'High' ? 'bg-red-500/20 text-red-400' :
                        rec.urgency === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {rec.urgency} Priority
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{rec.suggestion}</p>
                    <p className="text-gray-400 text-xs">{rec.impact}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Efficiency Improvements */}
            <div>
              <h4 className="text-white font-bold mb-4">Billing Efficiency</h4>
              <div className="space-y-3">
                {aiInsights.billingEfficiency.map((eff, idx) => (
                  <div key={idx} className="p-4 bg-gray-900/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-white font-semibold">{eff.metric}</h5>
                      <div className="text-right">
                        <span className="text-red-400">{eff.current}</span>
                        <span className="text-gray-400 mx-2">→</span>
                        <span className="text-green-400">{eff.target}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">{eff.improvement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Invoice Header */}
              <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedInvoice.id}</h2>
                  <p className="text-gray-400">{selectedInvoice.client} • {selectedInvoice.case}</p>
                </div>
                <div className="text-right">
                  <button 
                    onClick={() => setSelectedInvoice(null)}
                    className="p-2 text-gray-400 hover:text-white transition-colors mb-4"
                  >
                    ✕
                  </button>
                  <p className="text-3xl font-bold text-white">{formatCurrency(selectedInvoice.amount)}</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedInvoice.status)}`}>
                    {selectedInvoice.status}
                  </span>
                </div>
              </div>

              {/* Invoice Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-white font-bold mb-3">Invoice Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Issue Date:</span>
                      <span className="text-white">{selectedInvoice.issued}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Due Date:</span>
                      <span className="text-white">{selectedInvoice.due}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Hours:</span>
                      <span className="text-white">{selectedInvoice.hours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Hourly Rate:</span>
                      <span className="text-white">${selectedInvoice.rate}</span>
                    </div>
                  </div>
                </div>

                {selectedInvoice.paymentDate && (
                  <div>
                    <h3 className="text-white font-bold mb-3">Payment Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Payment Date:</span>
                        <span className="text-green-400">{selectedInvoice.paymentDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Amount Paid:</span>
                        <span className="text-green-400">{formatCurrency(selectedInvoice.amount)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Line Items */}
              <div className="mb-6">
                <h3 className="text-white font-bold mb-4">Services</h3>
                <div className="space-y-2">
                  {selectedInvoice.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-white font-medium">{item.description}</p>
                        <p className="text-gray-400 text-sm">{item.hours} hours @ ${item.rate}/hr</p>
                      </div>
                      <p className="text-white font-bold">{formatCurrency(item.amount)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expenses */}
              {selectedInvoice.expenses && selectedInvoice.expenses.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-white font-bold mb-4">Expenses</h3>
                  <div className="space-y-2">
                    {selectedInvoice.expenses.map((expense, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <p className="text-white font-medium">{expense.description}</p>
                        <p className="text-white font-bold">{formatCurrency(expense.amount)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-700">
                <button className="px-4 py-2 bg-gradient-to-r from-[#f4c900] to-[#b68600] text-black rounded-lg font-semibold hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Send to Client
                </button>
                <button className="px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Billing View Selector */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-2">
          <div className="flex gap-2">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'invoices', label: 'Invoices', icon: Receipt },
              { id: 'optimization', label: 'AI Optimization', icon: Brain },
              { id: 'reports', label: 'Reports', icon: FileText }
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