'use client'

import { useState, useEffect } from 'react'
import { 
  Building, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Users, 
  Shield, 
  Zap,
  Star,
  Crown,
  Globe,
  Smartphone,
  FileText,
  Settings,
  Database,
  Cloud,
  Lock,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  Upload,
  Eye,
  Palette,
  Code,
  Server,
  Gauge,
  Scale,
  Gavel
} from 'lucide-react'

export default function LawFirmOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState('professional')
  const [formData, setFormData] = useState({
    // Firm Information
    firmName: '',
    firmType: 'personal-injury', // personal-injury, civil-rights, employment, criminal, general
    website: '',
    phone: '',
    email: '',
    address: '',
    
    // Contact Person
    contactName: '',
    contactTitle: '',
    contactEmail: '',
    contactPhone: '',
    
    // Practice Areas
    practiceAreas: [],
    
    // Technical Setup
    customDomain: '',
    emailProvider: 'sendgrid', // sendgrid, mailgun, ses
    paymentProcessor: 'stripe', // stripe, square, paypal
    
    // Branding
    primaryColor: '#1e40af',
    logoFile: null,
    
    // Team Size
    attorneys: 1,
    staff: 1,
    expectedClients: 'under-100'
  })

  const steps = [
    { id: 1, title: 'Plan Selection', icon: Crown },
    { id: 2, title: 'Firm Information', icon: Building },
    { id: 3, title: 'Practice Areas', icon: Scale },
    { id: 4, title: 'Technical Setup', icon: Settings },
    { id: 5, title: 'Branding & Design', icon: Palette },
    { id: 6, title: 'Team Setup', icon: Users },
    { id: 7, title: 'Payment & Launch', icon: CreditCard }
  ]

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$297',
      period: '/month',
      description: 'Perfect for solo practitioners and small firms',
      features: [
        'Up to 3 attorneys',
        'Up to 100 clients',
        'Basic client portal',
        'Email support',
        'Standard templates',
        '10GB storage'
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional', 
      price: '$597',
      period: '/month',
      description: 'Ideal for growing law firms with advanced needs',
      features: [
        'Up to 15 attorneys',
        'Up to 500 clients',
        'Advanced client portal',
        'AI case analysis',
        'Custom branding',
        'Priority support',
        '100GB storage',
        'API integrations'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$1,497',
      period: '/month',
      description: 'For large firms requiring custom solutions',
      features: [
        'Unlimited attorneys',
        'Unlimited clients',
        'White-label solution',
        'Custom integrations',
        'Dedicated support',
        'Advanced analytics',
        '1TB storage',
        'Multi-location support'
      ],
      popular: false
    }
  ]

  const practiceAreaOptions = [
    { id: 'personal-injury', name: 'Personal Injury', icon: '🚗' },
    { id: 'civil-rights', name: 'Civil Rights', icon: '⚖️' },
    { id: 'employment', name: 'Employment Law', icon: '💼' },
    { id: 'criminal-defense', name: 'Criminal Defense', icon: '🛡️' },
    { id: 'family-law', name: 'Family Law', icon: '👨‍👩‍👧‍👦' },
    { id: 'immigration', name: 'Immigration', icon: '🌍' },
    { id: 'business-law', name: 'Business Law', icon: '🏢' },
    { id: 'real-estate', name: 'Real Estate', icon: '🏠' },
    { id: 'bankruptcy', name: 'Bankruptcy', icon: '💰' },
    { id: 'intellectual-property', name: 'Intellectual Property', icon: '💡' }
  ]

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const togglePracticeArea = (areaId) => {
    setFormData(prev => ({
      ...prev,
      practiceAreas: prev.practiceAreas.includes(areaId)
        ? prev.practiceAreas.filter(id => id !== areaId)
        : [...prev.practiceAreas, areaId]
    }))
  }

  const handleSubmit = async () => {
    // Submit onboarding data
    const onboardingData = {
      ...formData,
      selectedPlan,
      timestamp: new Date().toISOString()
    }
    
    console.log('Law firm onboarding data:', onboardingData)
    
    // In production: call API to create law firm instance
    // await fetch('/api/law-firm-onboarding', { ... })
    
    alert('Law firm onboarding submitted! Our team will contact you within 24 hours.')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-white">Law Firm Onboarding</h1>
              <p className="text-gray-400 mt-1">Set up your dream team legal platform in minutes</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Step {currentStep} of {steps.length}</p>
              <div className="w-48 bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-gray-900/50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between">
            {steps.map((step) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isCompleted 
                      ? 'bg-green-600 border-green-600 text-white'
                      : isActive 
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-gray-600 text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-white' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Step 1: Plan Selection */}
        {currentStep === 1 && (
          <div className="space-y-8">
            <div className="text-center">
              <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-3xl font-black text-white mb-4">Choose Your Plan</h2>
              <p className="text-gray-400 text-lg">Select the perfect plan for your law firm&apos;s needs</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <div 
                  key={plan.id}
                  className={`relative rounded-2xl p-8 border-2 cursor-pointer transition-all ${
                    selectedPlan === plan.id
                      ? 'border-blue-600 bg-blue-900/20'
                      : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-black text-white">{plan.price}</span>
                      <span className="text-gray-400">{plan.period}</span>
                    </div>
                    <p className="text-gray-400 mb-6">{plan.description}</p>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {selectedPlan === plan.id && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle className="w-6 h-6 text-blue-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Firm Information */}
        {currentStep === 2 && (
          <div className="space-y-8">
            <div className="text-center">
              <Building className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h2 className="text-3xl font-black text-white mb-4">Firm Information</h2>
              <p className="text-gray-400 text-lg">Tell us about your law firm</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Law Firm Name *
                </label>
                <input
                  type="text"
                  value={formData.firmName}
                  onChange={(e) => handleInputChange('firmName', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Enter your firm name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Primary Practice Area *
                </label>
                <select
                  value={formData.firmType}
                  onChange={(e) => handleInputChange('firmType', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="personal-injury">Personal Injury</option>
                  <option value="civil-rights">Civil Rights</option>
                  <option value="employment">Employment Law</option>
                  <option value="criminal">Criminal Defense</option>
                  <option value="family">Family Law</option>
                  <option value="general">General Practice</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="https://yourfirm.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="123 Main St, City, State 12345"
                />
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-4">Primary Contact</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.contactTitle}
                    onChange={(e) => handleInputChange('contactTitle', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                    placeholder="Managing Partner"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                    placeholder="john@lawfirm.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Practice Areas */}
        {currentStep === 3 && (
          <div className="space-y-8">
            <div className="text-center">
              <Gavel className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h2 className="text-3xl font-black text-white mb-4">Practice Areas</h2>
              <p className="text-gray-400 text-lg">Select all practice areas your firm handles</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {practiceAreaOptions.map((area) => (
                <div
                  key={area.id}
                  onClick={() => togglePracticeArea(area.id)}
                  className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.practiceAreas.includes(area.id)
                      ? 'border-blue-600 bg-blue-900/20'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">{area.icon}</div>
                    <h3 className="text-white font-semibold">{area.name}</h3>
                    {formData.practiceAreas.includes(area.id) && (
                      <CheckCircle className="w-6 h-6 text-blue-400 mx-auto mt-2" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-12">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {currentStep === steps.length ? (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:scale-105 transition-all"
            >
              Launch My Firm
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:scale-105 transition-all"
            >
              Next Step
              <ArrowRight className="w-4 h-4 ml-2 inline" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}