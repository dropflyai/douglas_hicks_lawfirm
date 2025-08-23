'use client';
import { useState, useEffect } from 'react';
import { 
  DollarSign, TrendingUp, TrendingDown, BarChart3, PieChart,
  Target, AlertCircle, CheckCircle, Calendar, Clock, Scale,
  Briefcase, Users, FileText, CreditCard, Banknote, Wallet,
  ArrowUp, ArrowDown, ArrowRight, Plus, Minus, Eye, Edit,
  Download, Upload, RefreshCw, Settings, Filter, Search,
  Brain, Zap, Award, Star, Building, Globe, Calculator,
  ChevronDown, ChevronRight, PlayCircle, PauseCircle
} from 'lucide-react';

export default function FinancialOptimization() {
  const [activeView, setActiveView] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState(null);

  // Financial analytics data
  const financialMetrics = {
    revenue: {
      current: 485000,
      target: 500000,
      growth: 15.7,
      trend: 'up',
      ytd: 4850000,
      projected: 5800000
    },
    billableHours: {
      current: 1247,
      target: 1300,
      utilization: 73.2,
      rate: 389,
      trend: 'up'
    },
    collections: {
      rate: 94.3,
      outstanding: 127500,
      averageDays: 28,
      trend: 'up',
      aging: {
        '0-30': 65000,
        '31-60': 35000,
        '61-90': 18000,
        '90+': 9500
      }
    },
    profitability: {
      margin: 68.4,
      expenses: 153200,
      netIncome: 331800,
      roi: 216.7,
      trend: 'up'
    }
  };

  // Practice area performance
  const practiceAreas = [
    {
      area: 'Police Misconduct',
      revenue: 189000,
      cases: 23,
      avgValue: 8217,
      growth: 23.4,
      margin: 72.1,
      trend: 'up',
      color: 'from-blue-600 to-blue-800'
    },
    {
      area: 'Personal Injury',
      revenue: 156000,
      cases: 34,
      avgValue: 4588,
      growth: 8.9,
      margin: 65.8,
      trend: 'up',
      color: 'from-green-600 to-green-800'
    },
    {
      area: 'Medical Malpractice',
      revenue: 98000,
      cases: 12,
      avgValue: 8167,
      growth: -2.1,
      margin: 69.4,
      trend: 'down',
      color: 'from-purple-600 to-purple-800'
    },
    {
      area: 'Employment Law',
      revenue: 42000,
      cases: 18,
      avgValue: 2333,
      growth: 12.3,
      margin: 58.2,
      trend: 'up',
      color: 'from-orange-600 to-orange-800'
    }
  ];

  // AI optimization insights
  const aiOptimizations = {
    rateOptimization: {
      current: 389,
      suggested: 425,
      increase: 36,
      impact: '+$45,000 annual',
      confidence: 89,
      justification: 'Market analysis shows 9.3% increase acceptable for your experience level'
    },
    timeAllocation: [
      {
        area: 'Police Misconduct',
        current: 35,
        suggested: 42,
        reason: 'Highest margin practice area with growing demand',
        impact: '+$28,000'
      },
      {
        area: 'Medical Malpractice',
        current: 25,
        suggested: 18,
        reason: 'Declining performance and longer case duration',
        impact: 'Focus on higher-value cases'
      }
    ],
    caseSelection: {
      minValue: 75000,
      currentAccepting: 25000,
      recommendation: 'Increase minimum case value to $50K',
      impact: '+15% efficiency, +$67K annual'
    },
    expenseOptimization: [
      {
        category: 'Expert Witnesses',
        current: 28000,
        suggested: 23000,
        savings: 5000,
        method: 'Negotiate bulk rates, use in-house expertise'
      },
      {
        category: 'Technology',
        current: 12000,
        suggested: 15000,
        investment: 3000,
        method: 'Upgrade to AI research tools for efficiency gains'
      }
    ]
  };

  // Monthly financial projections
  const monthlyProjections = [
    { month: 'Jan', actual: 420000, projected: 410000, target: 450000 },
    { month: 'Feb', actual: 445000, projected: 435000, target: 450000 },
    { month: 'Mar', actual: 485000, projected: 475000, target: 500000 },
    { month: 'Apr', actual: null, projected: 515000, target: 520000 },
    { month: 'May', actual: null, projected: 535000, target: 540000 },
    { month: 'Jun', actual: null, projected: 520000, target: 530000 }
  ];

  // Client payment analytics
  const clientPaymentData = [
    {
      client: 'Rodriguez Family',
      outstanding: 0,
      avgPayment: 15,
      reliability: 'Excellent',
      risk: 'Low',
      color: 'text-green-400'
    },
    {
      client: 'Johnson Construction',
      outstanding: 10000,
      avgPayment: 35,
      reliability: 'Good',
      risk: 'Medium',
      color: 'text-yellow-400'
    },
    {
      client: 'Tech Innovations',
      outstanding: 0,
      avgPayment: 10,
      reliability: 'Excellent',
      risk: 'Low',
      color: 'text-green-400'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getGrowthColor = (growth) => {
    if (growth > 0) return 'text-green-400';
    if (growth < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <ArrowUp className="w-4 h-4 text-green-400" />;
    if (trend === 'down') return <ArrowDown className="w-4 h-4 text-red-400" />;
    return <ArrowRight className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="space-y-6">
      {/* Financial Overview */}
      {activeView === 'overview' && (
        <>
          {/* Key Financial Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-green-300 text-sm font-semibold">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-white">{formatCurrency(financialMetrics.revenue.current)}</p>
                </div>
                <DollarSign className="w-10 h-10 text-green-400" />
              </div>
              <div className="flex items-center gap-2">
                <ArrowUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm font-semibold">+{financialMetrics.revenue.growth}%</span>
                <span className="text-gray-400 text-sm">vs last month</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-blue-300 text-sm font-semibold">Billable Hours</p>
                  <p className="text-3xl font-bold text-white">{financialMetrics.billableHours.current}</p>
                </div>
                <Clock className="w-10 h-10 text-blue-400" />
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 text-sm font-semibold">{financialMetrics.billableHours.utilization}%</span>
                <span className="text-gray-400 text-sm">utilization</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-purple-300 text-sm font-semibold">Collection Rate</p>
                  <p className="text-3xl font-bold text-white">{financialMetrics.collections.rate}%</p>
                </div>
                <CreditCard className="w-10 h-10 text-purple-400" />
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400 text-sm font-semibold">{financialMetrics.collections.averageDays} days</span>
                <span className="text-gray-400 text-sm">avg collection</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-900/30 to-orange-800/30 border border-orange-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-orange-300 text-sm font-semibold">Profit Margin</p>
                  <p className="text-3xl font-bold text-white">{financialMetrics.profitability.margin}%</p>
                </div>
                <TrendingUp className="w-10 h-10 text-orange-400" />
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400 text-sm font-semibold">{financialMetrics.profitability.roi}%</span>
                <span className="text-gray-400 text-sm">ROI</span>
              </div>
            </div>
          </div>

          {/* Revenue Trend Chart */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Revenue Trends & Projections</h3>
              <div className="flex gap-3">
                <select 
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="px-3 py-2 bg-gray-700 rounded-lg text-white text-sm"
                >
                  <option value="month">Monthly</option>
                  <option value="quarter">Quarterly</option>
                  <option value="year">Yearly</option>
                </select>
              </div>
            </div>
            
            {/* Simple bar chart representation */}
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

          {/* Practice Area Performance */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Practice Area Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {practiceAreas.map((area, idx) => (
                <div key={idx} className="p-4 bg-gray-900/50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-semibold">{area.area}</h4>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(area.trend)}
                      <span className={`text-sm font-bold ${getGrowthColor(area.growth)}`}>
                        {area.growth > 0 ? '+' : ''}{area.growth}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="text-center">
                      <p className="text-gray-400 text-xs">Revenue</p>
                      <p className="text-white font-bold text-sm">{formatCurrency(area.revenue)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-400 text-xs">Cases</p>
                      <p className="text-white font-bold text-sm">{area.cases}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-400 text-xs">Margin</p>
                      <p className="text-white font-bold text-sm">{area.margin}%</p>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${area.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${area.margin}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* AI Optimization View */}
      {activeView === 'optimization' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-8 h-8 text-purple-400" />
              <div>
                <h3 className="text-2xl font-bold text-white">AI Financial Optimization</h3>
                <p className="text-gray-400">Data-driven recommendations to maximize profitability</p>
              </div>
            </div>

            {/* Rate Optimization */}
            <div className="mb-8">
              <h4 className="text-white font-bold mb-4">Hourly Rate Optimization</h4>
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-green-300 font-semibold">Recommended Rate Increase</p>
                    <p className="text-gray-300 text-sm">{aiOptimizations.rateOptimization.justification}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">
                      ${aiOptimizations.rateOptimization.current} → ${aiOptimizations.rateOptimization.suggested}
                    </p>
                    <p className="text-green-400 font-semibold">{aiOptimizations.rateOptimization.impact}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-semibold">{aiOptimizations.rateOptimization.confidence}% confidence</span>
                  <span className="text-gray-400">based on market analysis</span>
                </div>
              </div>
            </div>

            {/* Time Allocation Optimization */}
            <div className="mb-8">
              <h4 className="text-white font-bold mb-4">Practice Area Time Allocation</h4>
              <div className="space-y-3">
                {aiOptimizations.timeAllocation.map((allocation, idx) => (
                  <div key={idx} className="p-4 bg-gray-900/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-white font-semibold">{allocation.area}</h5>
                      <div className="text-right">
                        <span className="text-white font-bold">{allocation.current}% → {allocation.suggested}%</span>
                        <p className="text-[#f4c900] text-sm font-semibold">{allocation.impact}</p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">{allocation.reason}</p>
                    <div className="flex gap-2 mt-2">
                      <div className="flex-1">
                        <div className="text-gray-400 text-xs mb-1">Current</div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gray-500 h-2 rounded-full"
                            style={{ width: `${allocation.current}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-400 text-xs mb-1">Suggested</div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-[#f4c900] to-[#b68600] h-2 rounded-full"
                            style={{ width: `${allocation.suggested}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Case Selection Optimization */}
            <div className="mb-8">
              <h4 className="text-white font-bold mb-4">Case Selection Strategy</h4>
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-blue-300 font-semibold">Minimum Case Value Recommendation</p>
                    <p className="text-gray-300 text-sm">{aiOptimizations.caseSelection.recommendation}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">
                      ${(aiOptimizations.caseSelection.currentAccepting / 1000).toFixed(0)}K → $50K
                    </p>
                    <p className="text-blue-400 font-semibold">{aiOptimizations.caseSelection.impact}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Expense Optimization */}
            <div>
              <h4 className="text-white font-bold mb-4">Expense Optimization</h4>
              <div className="space-y-3">
                {aiOptimizations.expenseOptimization.map((expense, idx) => (
                  <div key={idx} className="p-4 bg-gray-900/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-white font-semibold">{expense.category}</h5>
                      <div className="text-right">
                        {expense.savings ? (
                          <span className="text-green-400 font-bold">-${expense.savings.toLocaleString()} savings</span>
                        ) : (
                          <span className="text-blue-400 font-bold">+${expense.investment.toLocaleString()} investment</span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">{expense.method}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Collections View */}
      {activeView === 'collections' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Outstanding Balance Summary */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Outstanding Balances</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <span className="text-green-300 font-semibold">0-30 Days</span>
                  <span className="text-white font-bold">{formatCurrency(financialMetrics.collections.aging['0-30'])}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                  <span className="text-yellow-300 font-semibold">31-60 Days</span>
                  <span className="text-white font-bold">{formatCurrency(financialMetrics.collections.aging['31-60'])}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-900/20 border border-orange-500/30 rounded-lg">
                  <span className="text-orange-300 font-semibold">61-90 Days</span>
                  <span className="text-white font-bold">{formatCurrency(financialMetrics.collections.aging['61-90'])}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <span className="text-red-300 font-semibold">90+ Days</span>
                  <span className="text-white font-bold">{formatCurrency(financialMetrics.collections.aging['90+'])}</span>
                </div>
              </div>
            </div>

            {/* Client Payment Analysis */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Client Payment Analysis</h3>
              <div className="space-y-4">
                {clientPaymentData.map((client, idx) => (
                  <div key={idx} className="p-4 bg-gray-900/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-semibold">{client.client}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        client.risk === 'Low' ? 'bg-green-500/20 text-green-400' :
                        client.risk === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {client.risk} Risk
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-gray-400">Outstanding</p>
                        <p className="text-white font-semibold">{formatCurrency(client.outstanding)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Avg Payment</p>
                        <p className="text-white font-semibold">{client.avgPayment} days</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Reliability</p>
                        <p className={client.color + ' font-semibold'}>{client.reliability}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Financial View Selector */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-2">
          <div className="flex gap-2">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'optimization', label: 'AI Optimization', icon: Brain },
              { id: 'collections', label: 'Collections', icon: CreditCard },
              { id: 'projections', label: 'Projections', icon: TrendingUp }
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