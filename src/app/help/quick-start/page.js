'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft,
  CheckCircle,
  Clock,
  Play,
  Zap,
  Users,
  Settings,
  FileText,
  CreditCard,
  Shield,
  Bell,
  Eye,
  ArrowRight,
  Monitor,
  Smartphone,
  Globe
} from 'lucide-react'

export default function QuickStartGuide() {
  const [completedSteps, setCompletedSteps] = useState([])
  const [currentVideo, setCurrentVideo] = useState(null)

  const toggleStep = (stepId) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    )
  }

  const quickStartSteps = [
    {
      id: 'login',
      title: 'Log Into Your Portal',
      time: '1 min',
      description: 'Access your custom legal platform using the credentials sent to your email',
      videoId: 'login-tutorial',
      instructions: [
        'Check your email for login credentials',
        'Navigate to your custom portal URL (e.g., yourfirm.legalplatform.ai)',
        'Enter your username and password',
        'Complete two-factor authentication if enabled',
        'Familiarize yourself with the main dashboard'
      ]
    },
    {
      id: 'setup-profile',
      title: 'Complete Your Profile',
      time: '2 min',
      description: 'Set up your attorney profile and firm information',
      videoId: 'profile-setup',
      instructions: [
        'Click on your profile icon in the top right',
        'Upload your professional photo',
        'Add your bio and practice areas',
        'Set your contact preferences',
        'Review firm information and make any updates'
      ]
    },
    {
      id: 'add-first-client',
      title: 'Add Your First Client',
      time: '1.5 min',
      description: 'Create your first client profile and case',
      videoId: 'first-client',
      instructions: [
        'Navigate to Clients > Add New Client',
        'Enter client contact information',
        'Set up case details and practice area',
        'Upload initial documents if available',
        'Send client portal invitation'
      ]
    },
    {
      id: 'customize-portal',
      title: 'Customize Client Portal',
      time: '1 min',
      description: 'Brand your client portal with your firm&apos;s look and feel',
      videoId: 'portal-customization',
      instructions: [
        'Go to Settings > Portal Customization',
        'Upload your firm logo',
        'Choose your brand colors',
        'Customize email templates',
        'Preview client portal appearance'
      ]
    }
  ]

  const videoLibrary = {
    'login-tutorial': {
      title: 'Logging Into Your Portal',
      duration: '2:30',
      description: 'Step-by-step walkthrough of accessing your legal platform'
    },
    'profile-setup': {
      title: 'Setting Up Your Attorney Profile',
      duration: '3:15',
      description: 'Complete your professional profile and firm settings'
    },
    'first-client': {
      title: 'Adding Your First Client',
      duration: '4:45',
      description: 'Create client profiles and set up cases'
    },
    'portal-customization': {
      title: 'Customizing Your Client Portal',
      duration: '3:30',
      description: 'Brand your portal with logos, colors, and templates'
    }
  }

  const progressPercentage = (completedSteps.length / quickStartSteps.length) * 100

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/help" className="mr-4 p-2 text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-3xl font-black text-white">5-Minute Quick Start</h1>
                <p className="text-gray-400 mt-1">Get your legal platform ready in just 5 minutes</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center mb-2">
                <Clock className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-white font-semibold">~5 minutes</span>
              </div>
              <div className="w-48 bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-green-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="text-sm text-gray-400 mt-1">
                {completedSteps.length} of {quickStartSteps.length} steps completed
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Steps List */}
          <div className="lg:col-span-2 space-y-6">
            {quickStartSteps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.id)
              const isActive = !isCompleted && completedSteps.length === index
              
              return (
                <div 
                  key={step.id}
                  className={`rounded-xl border-2 transition-all ${
                    isCompleted 
                      ? 'border-green-600 bg-green-900/20' 
                      : isActive
                        ? 'border-blue-600 bg-blue-900/20'
                        : 'border-gray-700 bg-gray-900'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleStep(step.id)}
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 transition-all ${
                            isCompleted
                              ? 'border-green-600 bg-green-600'
                              : 'border-gray-600 hover:border-blue-600'
                          }`}
                        >
                          {isCompleted && <CheckCircle className="w-5 h-5 text-white" />}
                        </button>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">
                            Step {index + 1}: {step.title}
                          </h3>
                          <p className="text-gray-400">{step.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Clock className="w-4 h-4 mr-1" />
                        {step.time}
                      </div>
                    </div>

                    {/* Video Player */}
                    <div className="mb-6">
                      <button
                        onClick={() => setCurrentVideo(step.videoId)}
                        className="w-full h-48 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center hover:from-gray-600 hover:to-gray-700 transition-all group"
                      >
                        <div className="text-center">
                          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-700 transition-colors">
                            <Play className="w-8 h-8 text-white ml-1" />
                          </div>
                          <p className="text-white font-semibold">Watch Tutorial</p>
                          <p className="text-gray-400 text-sm">{videoLibrary[step.videoId]?.duration}</p>
                        </div>
                      </button>
                    </div>

                    {/* Instructions */}
                    <div>
                      <h4 className="text-white font-semibold mb-3">Step-by-Step Instructions:</h4>
                      <ol className="space-y-2">
                        {step.instructions.map((instruction, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                              {idx + 1}
                            </span>
                            <span className="text-gray-300">{instruction}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {!isCompleted && (
                      <button
                        onClick={() => toggleStep(step.id)}
                        className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:scale-105 transition-all"
                      >
                        Mark as Complete
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
              <h3 className="text-white font-bold mb-4">Your Progress</h3>
              <div className="text-center mb-4">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className="text-gray-700"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray={`${progressPercentage * 0.628} 62.8`}
                      className="text-blue-600"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{Math.round(progressPercentage)}%</span>
                  </div>
                </div>
                <p className="text-gray-400">
                  {completedSteps.length} of {quickStartSteps.length} steps completed
                </p>
              </div>
              
              {progressPercentage === 100 && (
                <div className="bg-green-900/30 border border-green-600 rounded-lg p-4 text-center">
                  <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-green-400 font-semibold">Quick Start Complete!</p>
                  <p className="text-green-300 text-sm">Your platform is ready to use</p>
                </div>
              )}
            </div>

            {/* Next Steps */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
              <h3 className="text-white font-bold mb-4">What&apos;s Next?</h3>
              <div className="space-y-3">
                <Link href="/help/first-client" className="block p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-blue-400 mr-3" />
                      <span className="text-white">Add More Clients</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </Link>
                
                <Link href="/help/document-setup" className="block p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-green-400 mr-3" />
                      <span className="text-white">Organize Documents</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </Link>
                
                <Link href="/help/payment-setup" className="block p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CreditCard className="w-5 h-5 text-yellow-400 mr-3" />
                      <span className="text-white">Setup Payments</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl p-6 border border-blue-700">
              <h3 className="text-white font-bold mb-2">Need Help?</h3>
              <p className="text-blue-200 text-sm mb-4">
                Our support team is here to help you get started
              </p>
              <button className="w-full py-2 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        {currentVideo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-xl max-w-4xl w-full">
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">
                    {videoLibrary[currentVideo]?.title}
                  </h3>
                  <button
                    onClick={() => setCurrentVideo(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="w-full h-96 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                    <p className="text-white font-semibold">Training Video Player</p>
                    <p className="text-gray-400 text-sm">{videoLibrary[currentVideo]?.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}