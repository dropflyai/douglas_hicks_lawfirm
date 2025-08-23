'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { consultationHandler } from '@/lib/consultation-handler'
import { 
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
  Sparkles,
  Settings,
  Key,
  Bell,
  Globe,
  Lock
} from 'lucide-react'

export default function ClientOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isVisible, setIsVisible] = useState(false)
  const [onboardingData, setOnboardingData] = useState({
    // Step 1: Personal Information
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      dateOfBirth: '',
      emergencyContact: ''
    },
    // Step 2: Communication Preferences
    preferences: {
      preferredCommunication: 'email',
      language: 'english',
      timezone: 'PST',
      notificationFrequency: 'important',
      availabilityHours: 'business'
    },
    // Step 3: Security Setup
    security: {
      password: '',
      confirmPassword: '',
      securityQuestion: '',
      securityAnswer: '',
      twoFactorEnabled: false
    },
    // Step 4: Case Information Access
    caseAccess: {
      caseNumbers: [],
      authorizedViewers: [],
      documentSharing: true,
      billingAccess: true
    },
    // Step 5: Legal Team Introduction
    teamIntro: {
      primaryAttorney: '',
      caseManager: '',
      meetingScheduled: false,
      orientationCompleted: false
    }
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [onboardingComplete, setOnboardingComplete] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
    } else {
      completeOnboarding()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateOnboardingData = (section, data) => {
    setOnboardingData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }))
  }

  const completeOnboarding = async () => {
    setIsSubmitting(true)
    
    try {
      // Submit onboarding data to backend
      const response = await fetch('/api/client-onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...onboardingData,
          timestamp: new Date().toISOString(),
          status: 'completed'
        })
      })

      if (response.ok) {
        setOnboardingComplete(true)
      } else {
        throw new Error('Onboarding submission failed')
      }
    } catch (error) {
      console.error('Onboarding error:', error)
      alert('There was an issue completing your onboarding. Please contact our office.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-black text-white mb-4">Personal Information</h2>
              <p className="text-gray-400">Let&apos;s get your client profile set up</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">First Name *</label>
                <input
                  type="text"
                  value={onboardingData.personalInfo.firstName}
                  onChange={(e) => updateOnboardingData('personalInfo', { firstName: e.target.value })}
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Last Name *</label>
                <input
                  type="text"
                  value={onboardingData.personalInfo.lastName}
                  onChange={(e) => updateOnboardingData('personalInfo', { lastName: e.target.value })}
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  placeholder="Enter your last name"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  value={onboardingData.personalInfo.email}
                  onChange={(e) => updateOnboardingData('personalInfo', { email: e.target.value })}
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={onboardingData.personalInfo.phone}
                  onChange={(e) => updateOnboardingData('personalInfo', { phone: e.target.value })}
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-white font-semibold mb-2">Address</label>
                <input
                  type="text"
                  value={onboardingData.personalInfo.address}
                  onChange={(e) => updateOnboardingData('personalInfo', { address: e.target.value })}
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  placeholder="Street address, City, State, ZIP"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={onboardingData.personalInfo.dateOfBirth}
                  onChange={(e) => updateOnboardingData('personalInfo', { dateOfBirth: e.target.value })}
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Emergency Contact</label>
                <input
                  type="text"
                  value={onboardingData.personalInfo.emergencyContact}
                  onChange={(e) => updateOnboardingData('personalInfo', { emergencyContact: e.target.value })}
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  placeholder="Name and phone number"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-black text-white mb-4">Communication Preferences</h2>
              <p className="text-gray-400">How would you like us to keep you informed?</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-4">Preferred Communication Method</label>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { id: 'email', label: 'Email', icon: Mail, desc: 'Digital updates and documents' },
                    { id: 'phone', label: 'Phone Calls', icon: Phone, desc: 'Direct voice communication' },
                    { id: 'text', label: 'Text Messages', icon: MessageCircle, desc: 'Quick updates via SMS' }
                  ].map((method) => {
                    const Icon = method.icon
                    return (
                      <div
                        key={method.id}
                        onClick={() => updateOnboardingData('preferences', { preferredCommunication: method.id })}
                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
                          onboardingData.preferences.preferredCommunication === method.id
                            ? 'border-blue-500 bg-blue-600/20'
                            : 'border-gray-600 bg-gray-800/50 hover:border-blue-400'
                        }`}
                      >
                        <Icon className="w-8 h-8 text-blue-400 mb-3" />
                        <h3 className="text-white font-semibold mb-1">{method.label}</h3>
                        <p className="text-gray-400 text-sm">{method.desc}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-4">Notification Frequency</label>
                <div className="space-y-3">
                  {[
                    { id: 'immediate', label: 'Immediate - All updates', desc: 'Receive notifications for every case activity' },
                    { id: 'important', label: 'Important Only - Key milestones', desc: 'Only major case developments and deadlines' },
                    { id: 'weekly', label: 'Weekly Summary', desc: 'Consolidated weekly reports' },
                    { id: 'minimal', label: 'Minimal - Critical only', desc: 'Emergency and court-required communications only' }
                  ].map((freq) => (
                    <label key={freq.id} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="notificationFrequency"
                        value={freq.id}
                        checked={onboardingData.preferences.notificationFrequency === freq.id}
                        onChange={(e) => updateOnboardingData('preferences', { notificationFrequency: e.target.value })}
                        className="mt-1"
                      />
                      <div>
                        <span className="text-white font-semibold">{freq.label}</span>
                        <p className="text-gray-400 text-sm">{freq.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Preferred Language</label>
                  <select
                    value={onboardingData.preferences.language}
                    onChange={(e) => updateOnboardingData('preferences', { language: e.target.value })}
                    className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Español</option>
                    <option value="other">Other (specify in consultation)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Best Contact Hours</label>
                  <select
                    value={onboardingData.preferences.availabilityHours}
                    onChange={(e) => updateOnboardingData('preferences', { availabilityHours: e.target.value })}
                    className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  >
                    <option value="business">Business Hours (9 AM - 5 PM)</option>
                    <option value="extended">Extended Hours (8 AM - 7 PM)</option>
                    <option value="evening">Evening Hours (5 PM - 9 PM)</option>
                    <option value="anytime">Anytime (Emergencies only)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-black text-white mb-4">Security Setup</h2>
              <p className="text-gray-400">Protect your legal information with secure access</p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-blue-900/30 rounded-xl p-6 border border-blue-500/30">
                <div className="flex items-start gap-4">
                  <Shield className="w-8 h-8 text-blue-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Client Portal Security</h3>
                    <p className="text-gray-300 text-sm">
                      Your client portal provides secure access to case documents, communications, and billing information. 
                      Please create a strong password and security questions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Create Password *</label>
                  <input
                    type="password"
                    value={onboardingData.security.password}
                    onChange={(e) => updateOnboardingData('security', { password: e.target.value })}
                    className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                    placeholder="Minimum 8 characters"
                    required
                  />
                  <p className="text-gray-400 text-xs mt-1">Use letters, numbers, and special characters</p>
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Confirm Password *</label>
                  <input
                    type="password"
                    value={onboardingData.security.confirmPassword}
                    onChange={(e) => updateOnboardingData('security', { confirmPassword: e.target.value })}
                    className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                    placeholder="Re-enter password"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Security Question</label>
                <select
                  value={onboardingData.security.securityQuestion}
                  onChange={(e) => updateOnboardingData('security', { securityQuestion: e.target.value })}
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 mb-3"
                >
                  <option value="">Select a security question</option>
                  <option value="mother-maiden">What is your mother&apos;s maiden name?</option>
                  <option value="first-pet">What was the name of your first pet?</option>
                  <option value="birth-city">In what city were you born?</option>
                  <option value="school-name">What was the name of your elementary school?</option>
                  <option value="favorite-teacher">What was the name of your favorite teacher?</option>
                </select>
                <input
                  type="text"
                  value={onboardingData.security.securityAnswer}
                  onChange={(e) => updateOnboardingData('security', { securityAnswer: e.target.value })}
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  placeholder="Your answer"
                />
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onboardingData.security.twoFactorEnabled}
                    onChange={(e) => updateOnboardingData('security', { twoFactorEnabled: e.target.checked })}
                    className="mt-1"
                  />
                  <div>
                    <span className="text-white font-semibold">Enable Two-Factor Authentication (Recommended)</span>
                    <p className="text-gray-400 text-sm">
                      Add an extra layer of security by requiring a verification code sent to your phone
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-black text-white mb-4">Case Access & Permissions</h2>
              <p className="text-gray-400">Configure what information you can access</p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl p-6 border border-green-500/30">
                <h3 className="text-white font-bold mb-4">Your Case Access Permissions</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={onboardingData.caseAccess.documentSharing}
                      onChange={(e) => updateOnboardingData('caseAccess', { documentSharing: e.target.checked })}
                    />
                    <div>
                      <span className="text-white font-semibold">Document Access</span>
                      <p className="text-gray-400 text-sm">View case documents, evidence, and filings</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={onboardingData.caseAccess.billingAccess}
                      onChange={(e) => updateOnboardingData('caseAccess', { billingAccess: e.target.checked })}
                    />
                    <div>
                      <span className="text-white font-semibold">Billing Information</span>
                      <p className="text-gray-400 text-sm">Access invoices, payments, and billing history</p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-4">
                  Authorized Additional Viewers (Optional)
                </label>
                <p className="text-gray-400 text-sm mb-4">
                  Family members or trusted individuals who can access case information on your behalf
                </p>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Name and relationship (e.g., John Smith - Spouse)"
                    className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Their email address"
                    className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="bg-yellow-900/30 rounded-xl p-6 border border-yellow-500/30">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-8 h-8 text-yellow-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Privacy & Confidentiality</h3>
                    <p className="text-gray-300 text-sm">
                      All case information is protected by attorney-client privilege. You control who has access 
                      to your information and can modify these settings at any time through your client portal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-black text-white mb-4">Meet Your Legal Team</h2>
              <p className="text-gray-400">Get to know the attorneys and staff working on your case</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Primary Attorney Assignment */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-4 mb-6">
                  <Crown className="w-8 h-8 text-yellow-400" />
                  <h3 className="text-2xl font-bold text-white">Your Primary Attorney</h3>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="w-12 h-12 text-black" />
                  </div>
                  <div className="text-2xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text mb-2">
                    Carl E. Douglas
                  </div>
                  <p className="text-blue-400 font-semibold mb-4">Founding Partner | Dream Team Legacy</p>
                  <p className="text-gray-300 text-sm mb-4">
                    Lead attorney for your case with 30+ years of experience in high-stakes litigation, 
                    including the historic $4.9B verdict against General Motors.
                  </p>
                  <div className="flex gap-2 justify-center">
                    <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-xs">Civil Rights Expert</span>
                    <span className="px-3 py-1 bg-green-600/20 text-green-300 rounded-full text-xs">Dream Team Member</span>
                  </div>
                </div>
              </div>

              {/* Case Manager */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-4 mb-6">
                  <Users className="w-8 h-8 text-blue-400" />
                  <h3 className="text-2xl font-bold text-white">Your Case Manager</h3>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <div className="text-2xl font-black text-white mb-2">
                    Kristen Devezin
                  </div>
                  <p className="text-purple-400 font-semibold mb-4">Executive Administrator</p>
                  <p className="text-gray-300 text-sm mb-4">
                    Your primary point of contact for case updates, scheduling, and administrative needs. 
                    10+ years of experience ensuring exceptional client service.
                  </p>
                  <div className="flex gap-2 justify-center">
                    <span className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs">Client Relations</span>
                    <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-xs">Case Management</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Introduction Meeting */}
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-6">
              <h3 className="text-white font-bold mb-4">Schedule Your Team Introduction</h3>
              <p className="text-gray-300 mb-6">
                We&apos;ll arrange a 30-minute introduction call where you can meet your legal team, 
                discuss your case strategy, and ask any questions you may have.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-white font-semibold">Flexible Scheduling</div>
                  <div className="text-gray-400 text-sm">Choose a time that works for you</div>
                </div>
                <div className="text-center">
                  <MessageCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-white font-semibold">Q&A Session</div>
                  <div className="text-gray-400 text-sm">Get answers to all your questions</div>
                </div>
                <div className="text-center">
                  <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-white font-semibold">Strategy Overview</div>
                  <div className="text-gray-400 text-sm">Learn about your case approach</div>
                </div>
              </div>

              <div className="text-center mt-6">
                <label className="flex items-center justify-center gap-3">
                  <input
                    type="checkbox"
                    checked={onboardingData.teamIntro.meetingScheduled}
                    onChange={(e) => updateOnboardingData('teamIntro', { meetingScheduled: e.target.checked })}
                  />
                  <span className="text-white font-semibold">
                    Yes, I&apos;d like to schedule an introduction meeting
                  </span>
                </label>
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-black text-white mb-4">Welcome to Douglas Hicks Law</h2>
              <p className="text-gray-400">Your onboarding is complete! Here&apos;s what happens next.</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-xl p-8 border border-green-500">
              <div className="text-center mb-8">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-3xl font-black text-white mb-2">Onboarding Complete!</h3>
                <p className="text-green-400 font-semibold">You&apos;re now part of the Dream Team family</p>
              </div>
            </div>

            {/* Next Steps */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-400" />
                  Your Next Steps
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">1</div>
                    <div>
                      <div className="text-white font-semibold">Access Your Client Portal</div>
                      <div className="text-gray-400 text-sm">Log in to view your case status and documents</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">2</div>
                    <div>
                      <div className="text-white font-semibold">Meet Your Team</div>
                      <div className="text-gray-400 text-sm">Introduction call scheduled within 24 hours</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">3</div>
                    <div>
                      <div className="text-white font-semibold">Case Strategy Meeting</div>
                      <div className="text-gray-400 text-sm">Detailed strategy discussion within one week</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Phone className="w-6 h-6 text-green-400" />
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-white font-semibold">(323) 337-3636</div>
                      <div className="text-gray-400 text-sm">24/7 Emergency Line</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-green-400" />
                    <div>
                      <div className="text-white font-semibold">info@douglashickslaw.com</div>
                      <div className="text-gray-400 text-sm">General inquiries</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="text-white font-semibold">5120 W. Goldleaf Circle, Suite 140</div>
                      <div className="text-gray-400 text-sm">Los Angeles, CA 90056</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/portal/client"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:scale-105 transition-all"
                >
                  <Key className="w-5 h-5 mr-2" />
                  Access Client Portal
                </Link>
                <Link
                  href="/team"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-all"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Meet Your Team
                </Link>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (onboardingComplete) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="w-24 h-24 text-green-400 mx-auto mb-6" />
          <h1 className="text-4xl font-black text-white mb-4">Welcome to the Dream Team!</h1>
          <p className="text-gray-400 mb-8">Your onboarding has been completed successfully.</p>
          <Link
            href="/portal/client"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:scale-105 transition-all"
          >
            <Key className="w-5 h-5 mr-2" />
            Access Your Client Portal
          </Link>
        </div>
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
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/scraped/hero-1.jpg"
            alt="Client Onboarding"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
        </div>
        
        <div className={`max-w-4xl mx-auto relative text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <Users className="w-12 h-12 text-blue-400" />
            <Sparkles className="w-8 h-8 text-yellow-400" />
            <Shield className="w-12 h-12 text-blue-400" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            <span className="text-white">CLIENT</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
              ONBOARDING
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Welcome to the Dream Team family!<br />
            Let&apos;s get your client portal and legal services set up.
          </p>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="py-4 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white font-semibold">Step {currentStep} of 6</span>
            <span className="text-gray-400">Client Onboarding Progress</span>
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
                disabled={isSubmitting}
                className={`inline-flex items-center px-8 py-3 rounded-lg font-bold transition-all transform hover:scale-105 ${
                  isSubmitting
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                }`}
              >
                {currentStep === 6 ? (
                  isSubmitting ? (
                    <>
                      <Clock className="w-5 h-5 mr-2 animate-spin" />
                      Completing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Complete Onboarding
                    </>
                  )
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