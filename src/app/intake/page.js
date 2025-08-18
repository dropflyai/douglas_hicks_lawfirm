'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AIBrain } from '@/lib/ai-brain'
import { 
  Scale, 
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  Users,
  Shield,
  Phone,
  Mail,
  Calendar,
  FileText,
  Gavel,
  Target,
  Zap,
  Brain,
  MessageCircle,
  Star,
  Award,
  TrendingUp,
  Eye,
  Heart,
  Crown,
  Building,
  Car,
  Home,
  Briefcase,
  User,
  MapPin,
  CreditCard,
  Upload,
  Send,
  Sparkles
} from 'lucide-react'

export default function IntakePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    personalInfo: {},
    caseType: '',
    caseDetails: {},
    timeline: {},
    goals: {},
    urgency: '',
    budget: '',
    previousLegal: false
  })
  const [qualification, setQualification] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState(null)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const caseTypes = [
    {
      id: 'civil-rights',
      title: 'Civil Rights Violation',
      subtitle: 'Police brutality, discrimination, constitutional violations',
      icon: Shield,
      color: 'from-red-600 to-orange-600',
      potentialValue: '$500K - $8M+',
      expertise: 'Carl Douglas Dream Team experience',
      examples: ['Police brutality', 'Employment discrimination', 'Housing discrimination', 'Disability rights']
    },
    {
      id: 'product-liability',
      title: 'Product Liability',
      subtitle: 'Defective products, automotive safety, medical devices',
      icon: Car,
      color: 'from-blue-600 to-purple-600',
      potentialValue: '$1M - $4.9B+',
      expertise: 'Record-breaking $4.9B GM verdict',
      examples: ['Automotive defects', 'Medical devices', 'Pharmaceutical products', 'Consumer goods']
    },
    {
      id: 'wrongful-death',
      title: 'Wrongful Death',
      subtitle: 'Medical malpractice, negligence, preventable deaths',
      icon: Heart,
      color: 'from-purple-600 to-pink-600',
      potentialValue: '$2M - $10M+',
      expertise: 'Compassionate family advocacy',
      examples: ['Medical malpractice', 'Auto accidents', 'Workplace deaths', 'Negligence cases']
    },
    {
      id: 'personal-injury',
      title: 'Personal Injury',
      subtitle: 'Auto accidents, slip & fall, premises liability',
      icon: User,
      color: 'from-green-600 to-emerald-600',
      potentialValue: '$100K - $5M+',
      expertise: 'Maximum compensation recovery',
      examples: ['Auto accidents', 'Slip and fall', 'Premises liability', 'Construction accidents']
    },
    {
      id: 'employment',
      title: 'Employment Law',
      subtitle: 'Wrongful termination, harassment, wage disputes',
      icon: Briefcase,
      color: 'from-yellow-600 to-orange-600',
      potentialValue: '$50K - $1M+',
      expertise: 'Workplace justice advocacy',
      examples: ['Wrongful termination', 'Sexual harassment', 'Wage theft', 'Retaliation']
    },
    {
      id: 'criminal-defense',
      title: 'Criminal Defense',
      subtitle: 'Serious felonies, high-profile cases, appeals',
      icon: Gavel,
      color: 'from-gray-600 to-gray-800',
      potentialValue: 'Freedom & Reputation',
      expertise: 'O.J. Simpson Dream Team legacy',
      examples: ['Felony charges', 'White collar crimes', 'Appeals', 'High-profile defense']
    }
  ]

  const urgencyLevels = [
    {
      id: 'immediate',
      title: 'URGENT - Immediate Action Required',
      description: 'Statute of limitations concerns, active litigation, emergency situation',
      timeframe: 'Same day response',
      icon: Zap,
      color: 'bg-red-600'
    },
    {
      id: 'soon',
      title: 'Time-Sensitive - Action Needed Soon',
      description: 'Recent incident, preservation of evidence, upcoming deadlines',
      timeframe: '24-48 hour response',
      icon: Clock,
      color: 'bg-orange-600'
    },
    {
      id: 'planning',
      title: 'Planning Phase - Evaluating Options',
      description: 'Exploring legal options, gathering information, considering action',
      timeframe: '3-5 day response',
      icon: Brain,
      color: 'bg-blue-600'
    }
  ]

  const budgetRanges = [
    {
      id: 'contingency',
      title: 'Contingency Fee (No Upfront Cost)',
      description: 'We only get paid if you win your case',
      range: '0% upfront, 33-40% of recovery',
      recommended: true
    },
    {
      id: 'hourly-high',
      title: 'Hourly - Premium Service',
      description: 'For complex cases requiring extensive preparation',
      range: '$500-$750 per hour'
    },
    {
      id: 'flat-fee',
      title: 'Flat Fee Arrangement',
      description: 'Fixed cost for specific services',
      range: '$10K-$50K+ depending on case'
    },
    {
      id: 'discuss',
      title: 'Discuss During Consultation',
      description: 'Prefer to discuss options with attorney',
      range: 'Customized arrangement'
    }
  ]

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
    } else {
      analyzeCase()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (step, data) => {
    setFormData(prev => ({ ...prev, [step]: data }))
  }

  const analyzeCase = async () => {
    // Use advanced AI Brain for analysis
    const caseType = caseTypes.find(ct => ct.id === formData.caseType)
    const urgency = urgencyLevels.find(u => u.id === formData.urgency)
    
    // Prepare data for AI analysis
    const caseData = {
      caseType: formData.caseType,
      injurySeverity: formData.caseDetails?.injurySeverity || 'moderate',
      incidentDate: formData.timeline?.incidentDate,
      victimAge: formData.personalInfo?.age,
      annualIncome: formData.caseDetails?.income,
      medicalExpenses: formData.caseDetails?.medicalExpenses,
      liabilityClear: formData.caseDetails?.liability || 'partial',
      witnesses: formData.caseDetails?.witnesses || 0,
      documentation: formData.caseDetails?.documentation || [],
      defendantType: formData.caseDetails?.defendantType || 'individual',
      emotionalDistress: formData.caseDetails?.emotionalDistress || 'moderate',
      mediaAttention: formData.caseDetails?.mediaAttention || 'low',
      urgency: formData.urgency,
      ...formData.caseDetails
    }
    
    // Simulate AI processing time
    setTimeout(() => {
      // Get AI analysis
      const aiResult = AIBrain.analyzeCaseValue(caseData)
      
      // Determine recommended attorney based on case type and value
      let recommendedAttorney = 'Douglas Hicks Legal Team'
      if (aiResult.tier === 'PLATINUM' || caseType?.id === 'civil-rights') {
        recommendedAttorney = 'Carl E. Douglas'
      } else if (caseType?.id === 'wrongful-death' || caseType?.id === 'personal-injury') {
        recommendedAttorney = 'Jamon R. Hicks'
      } else if (caseType?.id === 'employment') {
        recommendedAttorney = "A'ja Simplis"
      }
      
      // Map AI results to display format
      const analysis = {
        score: Math.round(aiResult.confidence.replace('%', '')),
        viability: aiResult.tier,
        recommendedAttorney,
        estimatedValue: aiResult.estimatedValue,
        timeframe: urgency?.timeframe || `${aiResult.timeline.minimum}-${aiResult.timeline.expected} months`,
        nextSteps: [
          aiResult.recommendation,
          'Begin evidence preservation and documentation',
          'Schedule consultation with ' + recommendedAttorney,
          'Develop comprehensive case strategy based on precedents'
        ],
        strengths: aiResult.analysis.strengths.length > 0 ? aiResult.analysis.strengths : [
          'Strong case facts align with our expertise',
          'Favorable legal precedents exist',
          'Significant damages potential',
          'Clear liability indicators present'
        ],
        concerns: aiResult.analysis.weaknesses.length > 0 ? aiResult.analysis.weaknesses : [
          'Statute of limitations considerations',
          'Evidence preservation critical',
          'Multiple party complexity'
        ],
        precedents: aiResult.precedents,
        successProbability: aiResult.successProbability,
        narrative: aiResult.analysis.overallAssessment
      }
      
      setAiAnalysis(analysis)
      setQualification(aiResult.tier === 'BRONZE' ? 'REVIEW' : 'QUALIFIED')
      setShowResults(true)
    }, 3000) // Slightly longer for "AI processing"
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-black text-white mb-4">Personal Information</h2>
              <p className="text-gray-400">Help us understand how to best serve you</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">First Name *</label>
                <input
                  type="text"
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Last Name *</label>
                <input
                  type="text"
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  placeholder="Enter your last name"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-white font-semibold mb-2">Location (City, State) *</label>
                <input
                  type="text"
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  placeholder="Los Angeles, CA"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-black text-white mb-4">What Type of Legal Issue?</h2>
              <p className="text-gray-400">Select the category that best describes your situation</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseTypes.map((caseType) => {
                const Icon = caseType.icon
                return (
                  <div
                    key={caseType.id}
                    onClick={() => {
                      updateFormData('caseType', caseType.id)
                      setFormData(prev => ({ ...prev, caseType: caseType.id }))
                    }}
                    className={`cursor-pointer p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                      formData.caseType === caseType.id
                        ? 'border-blue-500 bg-blue-600/20'
                        : 'border-gray-600 bg-gray-800/50 hover:border-blue-400'
                    }`}
                  >
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${caseType.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{caseType.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{caseType.subtitle}</p>
                    <div className="space-y-2">
                      <div className="text-green-400 font-semibold text-sm">{caseType.potentialValue}</div>
                      <div className="text-blue-400 text-xs">{caseType.expertise}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-black text-white mb-4">Tell Us About Your Case</h2>
              <p className="text-gray-400">Provide details to help us understand your situation</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">What happened? *</label>
                <textarea
                  rows={6}
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  placeholder="Please describe what happened, when it occurred, and who was involved. Include as much detail as possible..."
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">When did this occur?</label>
                  <input
                    type="date"
                    className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Location where it occurred</label>
                  <input
                    type="text"
                    className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                    placeholder="City, State or specific location"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Other parties involved</label>
                <textarea
                  rows={3}
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  placeholder="Names, companies, organizations, or entities involved..."
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">What damages or injuries occurred?</label>
                <textarea
                  rows={4}
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  placeholder="Physical injuries, emotional trauma, financial losses, property damage, etc..."
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-black text-white mb-4">How Urgent Is Your Case?</h2>
              <p className="text-gray-400">Help us prioritize your consultation</p>
            </div>
            
            <div className="space-y-4">
              {urgencyLevels.map((level) => {
                const Icon = level.icon
                return (
                  <div
                    key={level.id}
                    onClick={() => {
                      updateFormData('urgency', level.id)
                      setFormData(prev => ({ ...prev, urgency: level.id }))
                    }}
                    className={`cursor-pointer p-6 rounded-xl border-2 transition-all hover:scale-[1.02] ${
                      formData.urgency === level.id
                        ? 'border-blue-500 bg-blue-600/20'
                        : 'border-gray-600 bg-gray-800/50 hover:border-blue-400'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 ${level.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{level.title}</h3>
                        <p className="text-gray-400 mb-2">{level.description}</p>
                        <div className="text-blue-400 font-semibold">{level.timeframe}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-black text-white mb-4">Fee Structure Preference</h2>
              <p className="text-gray-400">Select your preferred payment arrangement</p>
            </div>
            
            <div className="space-y-4">
              {budgetRanges.map((budget) => (
                <div
                  key={budget.id}
                  onClick={() => {
                    updateFormData('budget', budget.id)
                    setFormData(prev => ({ ...prev, budget: budget.id }))
                  }}
                  className={`cursor-pointer p-6 rounded-xl border-2 transition-all hover:scale-[1.02] relative ${
                    formData.budget === budget.id
                      ? 'border-blue-500 bg-blue-600/20'
                      : 'border-gray-600 bg-gray-800/50 hover:border-blue-400'
                  }`}
                >
                  {budget.recommended && (
                    <div className="absolute -top-3 left-6">
                      <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                        RECOMMENDED
                      </span>
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{budget.title}</h3>
                      <p className="text-gray-400 mb-2">{budget.description}</p>
                      <div className="text-green-400 font-semibold">{budget.range}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-black text-white mb-4">Final Details</h2>
              <p className="text-gray-400">Complete your case evaluation</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">What outcome are you seeking?</label>
                <textarea
                  rows={4}
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  placeholder="Compensation for damages, policy changes, accountability, etc..."
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Have you spoken with any other attorneys about this case?</label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="radio" name="previousLegal" className="mr-3" />
                    <span className="text-white">No, this is my first consultation</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="previousLegal" className="mr-3" />
                    <span className="text-white">Yes, but no one would take my case</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="previousLegal" className="mr-3" />
                    <span className="text-white">Yes, but I wasn&apos;t satisfied with their approach</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="previousLegal" className="mr-3" />
                    <span className="text-white">I&apos;m getting a second opinion</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Additional information or questions</label>
                <textarea
                  rows={4}
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  placeholder="Anything else you'd like us to know or any specific questions you have..."
                />
              </div>

              <div className="bg-blue-900/30 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Shield className="w-8 h-8 text-blue-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Confidentiality Notice</h3>
                    <p className="text-gray-300 text-sm">
                      All information you provide is confidential and protected by attorney-client privilege. 
                      Your case details will only be shared with authorized legal team members.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (showResults && aiAnalysis) {
    return (
      <div className="min-h-screen bg-black">
        {/* Navigation */}
        <nav className="relative bg-black/90 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/scraped/logo-main.png"
                  alt="Douglass Hicks Law"
                  width={40}
                  height={40}
                  className="mr-3"
                />
                <span className="text-xl font-bold text-white">
                  Douglass Hicks Law
                </span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Results Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* AI Analysis Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-black text-white">AI CASE ANALYSIS</h1>
                  <p className="text-green-400 font-semibold">Analysis Complete</p>
                </div>
              </div>
            </div>

            {/* Qualification Status */}
            <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-2xl p-8 border border-green-500 mb-8">
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h2 className="text-3xl font-black text-white mb-2">CASE QUALIFIED</h2>
                <p className="text-green-400 text-xl font-semibold mb-4">Strong Merit Score: {aiAnalysis.score}/100</p>
                <p className="text-gray-300">Your case shows strong potential for a successful outcome based on our analysis</p>
              </div>
            </div>

            {/* Analysis Grid */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Recommended Attorney */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-4 mb-6">
                  <Crown className="w-8 h-8 text-yellow-400" />
                  <h3 className="text-2xl font-bold text-white">Recommended Attorney</h3>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text mb-2">
                    {aiAnalysis.recommendedAttorney}
                  </div>
                  <p className="text-gray-400 mb-4">Best match for your case type and needs</p>
                  <div className="bg-blue-600/20 rounded-lg p-4">
                    <p className="text-blue-300 text-sm">
                      This attorney has extensive experience with similar cases and the highest success rate in this practice area.
                    </p>
                  </div>
                </div>
              </div>

              {/* Case Valuation */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-4 mb-6">
                  <TrendingUp className="w-8 h-8 text-green-400" />
                  <h3 className="text-2xl font-bold text-white">Estimated Case Value</h3>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text mb-2">
                    {aiAnalysis.estimatedValue}
                  </div>
                  <p className="text-gray-400 mb-4">Potential compensation range</p>
                  <div className="bg-green-600/20 rounded-lg p-4">
                    <p className="text-green-300 text-sm">
                      Based on similar cases and current legal precedents. Actual results may vary.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Strengths & Next Steps */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-400" />
                  Case Strengths
                </h3>
                <div className="space-y-3">
                  {aiAnalysis.strengths.map((strength, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-400" />
                  Next Steps
                </h3>
                <div className="space-y-3">
                  {aiAnalysis.nextSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <span className="text-gray-300">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center space-y-6">
              <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Move Forward?</h3>
                <p className="text-gray-300 mb-6">
                  Schedule your consultation with {aiAnalysis.recommendedAttorney} to discuss your case in detail.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:scale-105 transition-all"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Consultation
                  </Link>
                  <Link
                    href="/team"
                    className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-all"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Meet Your Attorney
                  </Link>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-400 text-sm mb-4">
                  Response Time: {aiAnalysis.timeframe}
                </p>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    Confidential
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    No Obligation
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Free Consultation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="relative bg-black/90 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/scraped/logo-main.png"
                alt="Douglass Hicks Law"
                width={40}
                height={40}
                className="mr-3"
              />
              <span className="text-xl font-bold text-white">
                Douglass Hicks Law
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/team" className="text-gray-300 hover:text-white transition-colors">
                Our Team
              </Link>
              <Link href="/#contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
              <Link 
                href="/portal"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
              >
                Client Portal
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/scraped/hero-1.jpg"
            alt="Legal Consultation"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
        </div>
        
        <div className={`max-w-4xl mx-auto relative text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <Link 
            href="/"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 text-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <Brain className="w-12 h-12 text-blue-400" />
            <Sparkles className="w-8 h-8 text-yellow-400" />
            <Gavel className="w-12 h-12 text-blue-400" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            <span className="text-white">AI-POWERED</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
              CASE EVALUATION
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Get instant case analysis and attorney matching<br />
            from the team that won $4.9 billion in verdicts
          </p>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>100% Confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>No Obligation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Free Analysis</span>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="py-4 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white font-semibold">Step {currentStep} of 6</span>
            <span className="text-gray-400">Case Evaluation Progress</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / 6) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${
                  currentStep === 1
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-600 text-white hover:bg-gray-500'
                }`}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Previous
              </button>

              <button
                onClick={handleNext}
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
              >
                {currentStep === 6 ? (
                  <>
                    <Brain className="w-5 h-5 mr-2" />
                    Analyze My Case
                  </>
                ) : (
                  <>
                    Next Step
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}