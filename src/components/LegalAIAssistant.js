'use client';
import { useState, useEffect } from 'react';
import { 
  Search, Brain, FileText, Scale, Gavel, Clock, Target,
  TrendingUp, Users, DollarSign, AlertCircle, CheckCircle,
  Sparkles, Zap, Database, BarChart3, MessageSquare,
  BookOpen, Shield, Award, Briefcase, Eye, Download,
  Upload, Edit, Plus, Filter, Star, ArrowRight,
  ChevronDown, ChevronRight, Play, Pause, RefreshCw
} from 'lucide-react';

export default function LegalAIAssistant() {
  const [activeModule, setActiveModule] = useState('research');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  // AI Legal Research Module
  const aiModules = [
    { 
      id: 'research', 
      label: 'AI Legal Research', 
      icon: Search, 
      color: 'text-blue-400',
      description: 'Natural language case law search and analysis'
    },
    { 
      id: 'documents', 
      label: 'Smart Documents', 
      icon: FileText, 
      color: 'text-green-400',
      description: 'AI-powered document generation and review'
    },
    { 
      id: 'analytics', 
      label: 'Case Analytics', 
      icon: BarChart3, 
      color: 'text-purple-400',
      description: 'Win rate analysis and strategy optimization'
    },
    { 
      id: 'intelligence', 
      label: 'Legal Intelligence', 
      icon: Brain, 
      color: 'text-orange-400',
      description: 'Opposing counsel and judge research'
    },
    { 
      id: 'time-ai', 
      label: 'Smart Time Tracking', 
      icon: Clock, 
      color: 'text-yellow-400',
      description: 'AI-categorized billable time optimization'
    },
    { 
      id: 'client-ai', 
      label: 'Client Intelligence', 
      icon: Users, 
      color: 'text-pink-400',
      description: 'Relationship insights and communication optimization'
    }
  ];

  // Mock AI analysis results
  const mockAnalysisResults = {
    research: {
      query: 'police misconduct excessive force California',
      results: [
        {
          case: 'Graham v. Connor (1989)',
          relevance: 95,
          citation: '490 U.S. 386',
          summary: 'Established objective reasonableness standard for excessive force claims',
          keyPoints: ['Fourth Amendment standard', 'Objective reasonableness test', 'Split-second decisions'],
          outcome: 'Defendant victory',
          application: 'Critical precedent for use of force cases'
        },
        {
          case: 'Tennessee v. Garner (1985)',
          relevance: 88,
          citation: '471 U.S. 1',
          summary: 'Limits use of deadly force in fleeing felon situations',
          keyPoints: ['Deadly force limitations', 'Imminent threat requirement', 'Fleeing suspects'],
          outcome: 'Plaintiff victory',
          application: 'Relevant for deadly force analysis'
        },
        {
          case: 'Monell v. Department of Social Services (1978)',
          relevance: 82,
          citation: '436 U.S. 658',
          summary: 'Municipal liability under Section 1983',
          keyPoints: ['Municipal liability', 'Policy or custom requirement', 'Section 1983 claims'],
          outcome: 'Mixed',
          application: 'Important for municipal defendant cases'
        }
      ],
      insights: {
        strategy: 'Focus on objective reasonableness standard from Graham v. Connor',
        strengths: 'Strong precedent for excessive force claims',
        weaknesses: 'High burden for municipal liability',
        nextSteps: ['Research local jurisdiction applications', 'Analyze specific force circumstances', 'Review municipal policies']
      }
    }
  };

  // AI Research Function
  const performAIResearch = async (query) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis (in production, this calls N8N workflow)
    setTimeout(() => {
      setAnalysisResults(mockAnalysisResults.research);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* AI Module Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {aiModules.map((module) => {
          const Icon = module.icon;
          return (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`p-6 rounded-xl transition-all duration-300 border text-left ${
                activeModule === module.id
                  ? 'bg-gradient-to-r from-[#f4c900] to-[#b68600] border-[#f4c900] text-black'
                  : 'bg-gray-800/50 border-gray-700 hover:border-gray-600 text-white hover:bg-gray-800/70'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon className={`w-8 h-8 ${activeModule === module.id ? 'text-black' : module.color}`} />
                <h3 className="text-lg font-bold">{module.label}</h3>
              </div>
              <p className={`text-sm ${activeModule === module.id ? 'text-black/80' : 'text-gray-400'}`}>
                {module.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* AI Legal Research Module */}
      {activeModule === 'research' && (
        <div className="space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">AI Legal Research Assistant</h2>
                <p className="text-gray-400">Natural language case law search powered by GPT-4</p>
              </div>
            </div>

            {/* Search Interface */}
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask anything: 'Find cases about police misconduct in California since 2020'"
                  className="w-full px-4 py-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#f4c900] focus:outline-none text-lg"
                />
                <button
                  onClick={() => performAIResearch(searchQuery)}
                  disabled={!searchQuery || isAnalyzing}
                  className={`absolute right-2 top-2 px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                    searchQuery && !isAnalyzing
                      ? 'bg-gradient-to-r from-[#f4c900] to-[#b68600] text-black hover:shadow-xl hover:shadow-yellow-500/20'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4" />
                      Research
                    </>
                  )}
                </button>
              </div>

              {/* Quick Research Templates */}
              <div className="flex flex-wrap gap-2">
                {[
                  'Police misconduct excessive force',
                  'Contract breach remedies',
                  'Personal injury settlement ranges',
                  'Employment discrimination cases',
                  'Medical malpractice standards'
                ].map((template, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSearchQuery(template)}
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-full text-sm text-gray-300 transition-colors"
                  >
                    {template}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Analysis Results */}
          {analysisResults && (
            <div className="space-y-6">
              {/* AI Insights Summary */}
              <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-bold text-white">AI Strategic Insights</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-purple-300 font-semibold mb-1">Recommended Strategy</h4>
                      <p className="text-gray-300 text-sm">{analysisResults.insights.strategy}</p>
                    </div>
                    <div>
                      <h4 className="text-green-300 font-semibold mb-1">Case Strengths</h4>
                      <p className="text-gray-300 text-sm">{analysisResults.insights.strengths}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-orange-300 font-semibold mb-1">Potential Weaknesses</h4>
                      <p className="text-gray-300 text-sm">{analysisResults.insights.weaknesses}</p>
                    </div>
                    <div>
                      <h4 className="text-blue-300 font-semibold mb-1">Next Steps</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        {analysisResults.insights.nextSteps.map((step, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <ArrowRight className="w-3 h-3 text-blue-400" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Case Results */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Relevant Case Law</h3>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                    {analysisResults.results.length} cases found
                  </span>
                </div>

                <div className="space-y-4">
                  {analysisResults.results.map((caseResult, idx) => (
                    <div key={idx} className="p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-bold text-white">{caseResult.case}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              caseResult.relevance >= 90 ? 'bg-green-500/20 text-green-400' :
                              caseResult.relevance >= 80 ? 'bg-blue-500/20 text-blue-400' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {caseResult.relevance}% relevant
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mb-2">{caseResult.citation}</p>
                          <p className="text-gray-300 mb-3">{caseResult.summary}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <h5 className="text-white font-semibold mb-2">Key Points</h5>
                          <ul className="space-y-1">
                            {caseResult.keyPoints.map((point, pointIdx) => (
                              <li key={pointIdx} className="text-gray-400 text-sm flex items-center gap-2">
                                <div className="w-1 h-1 bg-[#f4c900] rounded-full" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-white font-semibold mb-2">Outcome</h5>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            caseResult.outcome === 'Plaintiff victory' ? 'bg-green-500/20 text-green-400' :
                            caseResult.outcome === 'Defendant victory' ? 'bg-red-500/20 text-red-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {caseResult.outcome}
                          </span>
                        </div>
                        <div>
                          <h5 className="text-white font-semibold mb-2">Application</h5>
                          <p className="text-gray-400 text-sm">{caseResult.application}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button className="px-4 py-2 bg-[#f4c900] text-black rounded-lg font-semibold hover:bg-[#b68600] transition-colors flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Full Text
                        </button>
                        <button className="px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center gap-2">
                          <Plus className="w-4 h-4" />
                          Add to Brief
                        </button>
                        <button className="px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center gap-2">
                          <Star className="w-4 h-4" />
                          Bookmark
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI-Generated Research Memo */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">AI-Generated Research Memo</h3>
                  <button className="px-4 py-2 bg-gradient-to-r from-[#f4c900] to-[#b68600] text-black rounded-lg font-semibold hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export Memo
                  </button>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-600">
                  <div className="prose prose-invert max-w-none">
                    <h4 className="text-[#f4c900] mb-3">Legal Research Memorandum</h4>
                    <p className="text-gray-300 mb-4">
                      <strong>Research Query:</strong> {analysisResults.query}
                    </p>
                    <p className="text-gray-300 mb-4">
                      Based on the comprehensive legal research conducted, the following analysis provides strategic guidance for cases involving police misconduct and excessive force in California jurisdiction.
                    </p>
                    <p className="text-gray-300">
                      The primary controlling precedent is <em>Graham v. Connor</em> (1989), which establishes the objective reasonableness standard under the Fourth Amendment. This case is highly favorable for establishing the legal framework and should be cited prominently in any motion or brief...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* AI Document Generation Module */}
      {activeModule === 'documents' && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-800 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Smart Document Generation</h2>
              <p className="text-gray-400">AI-powered legal document creation and review</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { type: 'Motion to Dismiss', icon: Gavel, description: 'Generate dismissal motions with case-specific arguments' },
              { type: 'Settlement Agreement', icon: Scale, description: 'Create comprehensive settlement documents' },
              { type: 'Discovery Request', icon: Search, description: 'AI-optimized interrogatories and document requests' },
              { type: 'Client Contract', icon: FileText, description: 'Retainer agreements with custom terms' },
              { type: 'Demand Letter', icon: MessageSquare, description: 'Persuasive demand letters with case law support' },
              { type: 'Brief Template', icon: BookOpen, description: 'Court briefs with automatic citation formatting' }
            ].map((doc, idx) => {
              const Icon = doc.icon;
              return (
                <div key={idx} className="p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-[#f4c900] transition-colors cursor-pointer">
                  <Icon className="w-8 h-8 text-green-400 mb-3" />
                  <h3 className="text-white font-bold mb-2">{doc.type}</h3>
                  <p className="text-gray-400 text-sm mb-4">{doc.description}</p>
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-[#f4c900] to-[#b68600] text-black rounded-lg font-semibold hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300">
                    Generate Document
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Other modules would be implemented similarly */}
      {activeModule !== 'research' && activeModule !== 'documents' && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-12 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#f4c900] to-[#b68600] rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-black" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">AI Module Coming Soon</h3>
          <p className="text-gray-400">This advanced AI feature is being developed with N8N workflows integration.</p>
        </div>
      )}
    </div>
  );
}