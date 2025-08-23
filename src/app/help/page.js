'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Search,
  Book,
  Play,
  FileText,
  MessageCircle,
  Phone,
  Mail,
  ChevronRight,
  ChevronDown,
  Star,
  Clock,
  Users,
  Shield,
  Zap,
  Settings,
  CreditCard,
  Upload,
  Download,
  Eye,
  Calendar,
  Bell,
  Lock,
  Globe,
  Smartphone,
  Monitor,
  HelpCircle,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Video,
  Headphones,
  LifeBuoy
} from 'lucide-react'

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const helpCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Play,
      description: 'Learn the basics of using your legal platform',
      color: 'blue',
      articles: 12,
      videos: 8
    },
    {
      id: 'client-management',
      title: 'Client Management',
      icon: Users,
      description: 'Managing clients, cases, and communications',
      color: 'green',
      articles: 15,
      videos: 12
    },
    {
      id: 'document-management',
      title: 'Document Management',
      icon: FileText,
      description: 'Organizing, sharing, and collaborating on documents',
      color: 'purple',
      articles: 18,
      videos: 10
    },
    {
      id: 'billing-payments',
      title: 'Billing & Payments',
      icon: CreditCard,
      description: 'Processing payments and managing invoices',
      color: 'yellow',
      articles: 10,
      videos: 6
    },
    {
      id: 'portal-setup',
      title: 'Portal Setup',
      icon: Settings,
      description: 'Customizing your client portal and settings',
      color: 'red',
      articles: 8,
      videos: 5
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: Shield,
      description: 'Keeping your data safe and compliant',
      color: 'gray',
      articles: 6,
      videos: 4
    }
  ]

  const trainingVideos = [
    {
      id: 'platform-overview',
      title: 'Platform Overview & Navigation',
      description: 'Get familiar with the main dashboard and navigation',
      duration: '8:45',
      thumbnail: '/images/training/overview-thumb.jpg',
      category: 'getting-started',
      views: '2.1k',
      rating: 4.9
    },
    {
      id: 'client-onboarding',
      title: 'Onboarding New Clients',
      description: 'Step-by-step guide to adding and setting up new clients',
      duration: '12:30',
      thumbnail: '/images/training/client-onboarding-thumb.jpg',
      category: 'client-management',
      views: '1.8k',
      rating: 4.8
    },
    {
      id: 'document-upload',
      title: 'Document Upload & Organization',
      description: 'Learn how to upload, organize, and share documents',
      duration: '6:20',
      thumbnail: '/images/training/documents-thumb.jpg',
      category: 'document-management',
      views: '1.5k',
      rating: 4.7
    },
    {
      id: 'payment-setup',
      title: 'Setting Up Payment Processing',
      description: 'Configure payment methods and invoice settings',
      duration: '10:15',
      thumbnail: '/images/training/payments-thumb.jpg',
      category: 'billing-payments',
      views: '956',
      rating: 4.9
    },
    {
      id: 'portal-customization',
      title: 'Customizing Your Client Portal',
      description: 'Personalize branding, colors, and portal features',
      duration: '7:30',
      thumbnail: '/images/training/customization-thumb.jpg',
      category: 'portal-setup',
      views: '743',
      rating: 4.6
    },
    {
      id: 'security-best-practices',
      title: 'Security Best Practices',
      description: 'Essential security settings and compliance features',
      duration: '9:45',
      thumbnail: '/images/training/security-thumb.jpg',
      category: 'security',
      views: '612',
      rating: 4.8
    }
  ]

  const quickStartGuides = [
    {
      title: '5-Minute Quick Start',
      description: 'Get up and running with your platform in 5 minutes',
      icon: Zap,
      link: '/help/quick-start',
      time: '5 min'
    },
    {
      title: 'First Client Setup',
      description: 'Add your first client and create their portal access',
      icon: Users,
      link: '/help/first-client',
      time: '10 min'
    },
    {
      title: 'Document Organization',
      description: 'Set up your document folders and sharing permissions',
      icon: FileText,
      link: '/help/document-setup',
      time: '8 min'
    },
    {
      title: 'Payment Configuration',
      description: 'Connect your payment processor and create invoice templates',
      icon: CreditCard,
      link: '/help/payment-setup',
      time: '12 min'
    }
  ]

  const faqs = [
    {
      category: 'getting-started',
      question: 'How do I access my client portal for the first time?',
      answer: 'You&apos;ll receive login credentials via email after your platform is set up. Use these credentials at your custom portal URL (e.g., yourfirm.legalplatform.ai) to access your dashboard.'
    },
    {
      category: 'client-management',
      question: 'Can I import my existing client list?',
      answer: 'Yes! We provide data migration services to import your existing client data. Contact our support team to schedule a migration session, or use our CSV import tool in the Settings > Data Import section.'
    },
    {
      category: 'billing-payments',
      question: 'What payment methods are supported?',
      answer: 'We support all major credit cards, ACH bank transfers, and digital wallets through Stripe, Square, or PayPal. You can enable multiple payment methods for client convenience.'
    },
    {
      category: 'document-management',
      question: 'Is there a limit on document storage?',
      answer: 'Storage limits depend on your plan: Starter (10GB), Professional (100GB), Enterprise (1TB). All documents are encrypted and backed up automatically.'
    },
    {
      category: 'security',
      question: 'How secure is my client data?',
      answer: 'We use bank-level AES-256 encryption, SOC 2 Type II compliance, and regular security audits. All data is stored in secure, HIPAA-compliant data centers with automatic backups.'
    },
    {
      category: 'portal-setup',
      question: 'Can I customize the look of my client portal?',
      answer: 'Absolutely! You can upload your logo, customize colors, add your branding, and personalize email templates. Professional and Enterprise plans include full white-label customization.'
    }
  ]

  const supportOptions = [
    {
      title: 'Live Chat Support',
      description: 'Get instant help from our support team',
      icon: MessageCircle,
      availability: '9 AM - 6 PM PST',
      response: 'Instant',
      action: 'Start Chat'
    },
    {
      title: 'Phone Support',
      description: 'Speak directly with a support specialist',
      icon: Phone,
      availability: '9 AM - 6 PM PST',
      response: 'Immediate',
      action: 'Call Now'
    },
    {
      title: 'Email Support',
      description: 'Send detailed questions via email',
      icon: Mail,
      availability: '24/7',
      response: '< 4 hours',
      action: 'Send Email'
    },
    {
      title: 'Screen Sharing',
      description: 'Get personalized help with screen sharing',
      icon: Monitor,
      availability: 'By appointment',
      response: 'Scheduled',
      action: 'Book Session'
    }
  ]

  const filteredVideos = selectedCategory === 'all' 
    ? trainingVideos 
    : trainingVideos.filter(video => video.category === selectedCategory)

  const filteredFaqs = selectedCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <LifeBuoy className="w-16 h-16 text-blue-300 mx-auto mb-4" />
            <h1 className="text-4xl font-black text-white mb-4">Help & Training Center</h1>
            <p className="text-blue-200 text-xl mb-8">Everything you need to master your legal platform</p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search help articles, videos, and guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur border border-blue-400/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Start Guides */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-white mb-8">Quick Start Guides</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStartGuides.map((guide, index) => {
              const Icon = guide.icon
              return (
                <Link
                  key={index}
                  href={guide.link}
                  className="group p-6 bg-gray-900 rounded-xl border border-gray-700 hover:border-blue-500 transition-all hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-8 h-8 text-blue-400" />
                    <span className="text-sm text-gray-400">{guide.time}</span>
                  </div>
                  <h3 className="text-white font-bold mb-2 group-hover:text-blue-400 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{guide.description}</p>
                  <ArrowRight className="w-4 h-4 text-blue-400 mt-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              )
            })}
          </div>
        </div>

        {/* Help Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-white mb-8">Browse by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category) => {
              const Icon = category.icon
              return (
                <div
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all hover:scale-105 ${
                    selectedCategory === category.id
                      ? 'border-blue-500 bg-blue-900/20'
                      : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                  }`}
                >
                  <Icon className={`w-8 h-8 mb-4 ${
                    category.color === 'blue' ? 'text-blue-400' :
                    category.color === 'green' ? 'text-green-400' :
                    category.color === 'purple' ? 'text-purple-400' :
                    category.color === 'yellow' ? 'text-yellow-400' :
                    category.color === 'red' ? 'text-red-400' :
                    'text-gray-400'
                  }`} />
                  <h3 className="text-white font-bold mb-2">{category.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{category.description}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{category.articles} articles</span>
                    <span>{category.videos} videos</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Training Videos */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-white mb-8">Training Videos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div key={video.id} className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all group">
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                    <Video className="w-12 h-12 text-gray-400" />
                  </div>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                    {video.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-white font-bold mb-2">{video.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{video.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {video.views}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-400" />
                      {video.rating}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-white mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div key={index} className="bg-gray-900 rounded-xl border border-gray-700">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800 transition-colors"
                >
                  <span className="text-white font-semibold">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Support Options */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-white mb-8">Get Personal Support</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, index) => {
              const Icon = option.icon
              return (
                <div key={index} className="p-6 bg-gray-900 rounded-xl border border-gray-700 hover:border-blue-500 transition-all">
                  <Icon className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-white font-bold mb-2">{option.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{option.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Available:</span>
                      <span className="text-white">{option.availability}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Response:</span>
                      <span className="text-green-400">{option.response}</span>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    {option.action}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
          <div className="text-center">
            <BookOpen className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Need More Help?</h3>
            <p className="text-gray-300 mb-6">
              Our team is here to help you succeed. Schedule a free consultation or browse our extended resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Schedule Free Consultation
              </button>
              <button className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                Download User Manual
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}