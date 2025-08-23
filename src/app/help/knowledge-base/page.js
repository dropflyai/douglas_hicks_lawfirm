'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft,
  Search,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Clock,
  Eye,
  ThumbsUp,
  Share,
  Printer,
  Download,
  Tag,
  User,
  Calendar,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  Info,
  Lightbulb,
  Star,
  MessageCircle,
  FileText,
  CreditCard,
  Settings,
  ThumbsDown
} from 'lucide-react'

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [likedArticles, setLikedArticles] = useState([])

  const categories = [
    { id: 'all', name: 'All Articles', count: 45, icon: BookOpen },
    { id: 'getting-started', name: 'Getting Started', count: 12, icon: Lightbulb },
    { id: 'client-management', name: 'Client Management', count: 15, icon: User },
    { id: 'documents', name: 'Document Management', count: 8, icon: FileText },
    { id: 'billing', name: 'Billing & Payments', count: 6, icon: CreditCard },
    { id: 'customization', name: 'Customization', count: 3, icon: Settings },
    { id: 'troubleshooting', name: 'Troubleshooting', count: 1, icon: AlertCircle }
  ]

  const knowledgeArticles = [
    {
      id: 'setup-first-client',
      title: 'Setting Up Your First Client',
      summary: 'Complete guide to adding your first client and configuring their portal access',
      category: 'getting-started',
      difficulty: 'Beginner',
      readTime: '5 min',
      views: 1234,
      likes: 89,
      lastUpdated: '2025-08-15',
      tags: ['clients', 'setup', 'portal'],
      content: `
# Setting Up Your First Client

Adding your first client to the platform is straightforward. Follow these steps to get started:

## Step 1: Navigate to Client Management
1. From your dashboard, click on **Clients** in the main navigation
2. Click the **Add New Client** button in the top right

## Step 2: Enter Client Information
Fill out the client information form with the following details:
- **Full Name**: Client's legal name
- **Email Address**: Primary contact email
- **Phone Number**: Primary phone number
- **Address**: Complete mailing address

## Step 3: Set Up Case Information
- **Case Type**: Select the appropriate practice area
- **Case Description**: Brief summary of the legal matter
- **Priority Level**: Set urgency (High, Medium, Low)
- **Expected Timeline**: Estimated case duration

## Step 4: Configure Portal Access
- **Portal Permissions**: Choose what clients can access
- **Communication Preferences**: Set notification settings
- **Document Sharing**: Configure sharing permissions

## Step 5: Send Invitation
- Review all information for accuracy
- Click **Send Portal Invitation**
- Client will receive login credentials via email

## Best Practices
- Always verify email addresses before sending invitations
- Set clear expectations about portal usage
- Customize welcome messages for each client
- Test portal access before client meetings

## Troubleshooting
If clients report issues accessing their portal:
1. Verify email address is correct
2. Check spam/junk folders
3. Resend invitation if needed
4. Contact support for persistent issues

---
*Last updated: August 15, 2025*
      `
    },
    {
      id: 'document-organization',
      title: 'Best Practices for Document Organization',
      summary: 'Learn how to organize, categorize, and manage legal documents effectively',
      category: 'documents',
      difficulty: 'Intermediate',
      readTime: '8 min',
      views: 967,
      likes: 72,
      lastUpdated: '2025-08-12',
      tags: ['documents', 'organization', 'folders'],
      content: `
# Best Practices for Document Organization

Proper document organization is crucial for legal practice efficiency. Here's how to set up an effective system:

## Folder Structure
Create a hierarchical folder structure:
- **Client Name**
  - **Case Files**
    - Pleadings
    - Discovery
    - Correspondence
    - Evidence
  - **Billing**
  - **Administrative**

## File Naming Conventions
Use consistent naming patterns:
- **Date Format**: YYYY-MM-DD
- **Document Type**: Brief, Motion, Letter, etc.
- **Version Control**: v1, v2, v3, etc.

Example: "2025-08-15_Motion_Summary_Judgment_v2.pdf"

## Security Considerations
- Set appropriate access permissions
- Use encryption for sensitive documents
- Regularly backup important files
- Maintain audit trails

## Client Sharing Guidelines
- Only share relevant documents
- Use expiring links when appropriate
- Require client authentication
- Monitor download activity

## Version Control
- Keep original documents unchanged
- Create new versions for edits
- Use clear version numbering
- Archive old versions appropriately

---
*Last updated: August 12, 2025*
      `
    },
    {
      id: 'payment-setup-guide',
      title: 'Complete Payment Setup Guide',
      summary: 'Configure payment processing, create invoices, and manage client billing',
      category: 'billing',
      difficulty: 'Intermediate',
      readTime: '12 min',
      views: 756,
      likes: 91,
      lastUpdated: '2025-08-10',
      tags: ['payments', 'billing', 'invoices', 'stripe'],
      content: `
# Complete Payment Setup Guide

Setting up payment processing enables you to collect fees directly through your platform.

## Supported Payment Processors
- **Stripe**: Credit cards, ACH, digital wallets
- **Square**: Credit cards, mobile payments
- **PayPal**: PayPal accounts, credit cards

## Initial Setup
1. Navigate to **Settings > Billing & Payments**
2. Select your preferred payment processor
3. Enter API credentials
4. Configure payment methods
5. Test with small transaction

## Creating Invoice Templates
- Set up firm letterhead
- Include payment terms
- Add tax information
- Configure automatic calculations

## Recurring Billing
- Set up retainer agreements
- Configure automatic charges
- Set reminder schedules
- Handle failed payments

## Client Payment Experience
- Secure payment portal
- Multiple payment options
- Automatic receipts
- Payment history access

## Compliance & Security
- PCI DSS compliance
- Secure data handling
- Regular security audits
- Fraud protection

---
*Last updated: August 10, 2025*
      `
    }
  ]

  const faqs = [
    {
      category: 'getting-started',
      question: 'How do I reset my password?',
      answer: 'To reset your password, click the "Forgot Password" link on the login page. Enter your email address and follow the instructions sent to your email. If you don\'t receive an email within 10 minutes, check your spam folder or contact support.',
      helpful: 156,
      notHelpful: 12
    },
    {
      category: 'client-management',
      question: 'Can I import clients from another system?',
      answer: 'Yes! We support importing client data from CSV files or directly from popular legal software like Clio, MyCase, and PracticePanther. Go to Settings > Data Import to access the import wizard. Our support team can also help with custom migrations.',
      helpful: 143,
      notHelpful: 8
    },
    {
      category: 'billing',
      question: 'What payment methods do you support?',
      answer: 'We support all major credit cards (Visa, MasterCard, American Express), ACH bank transfers, PayPal, and digital wallets like Apple Pay and Google Pay. You can enable multiple payment methods to give clients flexibility.',
      helpful: 189,
      notHelpful: 5
    },
    {
      category: 'documents',
      question: 'Is there a file size limit for document uploads?',
      answer: 'Individual files can be up to 100MB each. Your total storage depends on your plan: Starter (10GB), Professional (100GB), Enterprise (1TB). Large files are automatically compressed and encrypted for security.',
      helpful: 167,
      notHelpful: 15
    },
    {
      category: 'customization',
      question: 'Can I use my own domain for the client portal?',
      answer: 'Yes! Professional and Enterprise plans include custom domain support. You can set up portal.yourfirm.com or any subdomain. We provide SSL certificates and handle all technical setup. Contact support to configure your custom domain.',
      helpful: 134,
      notHelpful: 7
    }
  ]

  const filteredArticles = knowledgeArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const filteredFaqs = faqs.filter(faq => 
    selectedCategory === 'all' || faq.category === selectedCategory
  )

  const toggleLike = (articleId) => {
    setLikedArticles(prev =>
      prev.includes(articleId)
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    )
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-900/20'
      case 'Intermediate': return 'text-yellow-400 bg-yellow-900/20'
      case 'Advanced': return 'text-red-400 bg-red-900/20'
      default: return 'text-gray-400 bg-gray-900/20'
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <Link href="/help" className="mr-4 p-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-3xl font-black text-white">Knowledge Base</h1>
              <p className="text-gray-400 mt-1">Comprehensive guides and frequently asked questions</p>
            </div>
          </div>

          {/* Search */}
          <div className="mt-6 relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles and FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 sticky top-8">
              <h3 className="text-white font-bold mb-4">Categories</h3>
              <nav className="space-y-2">
                {categories.map(category => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center">
                        <Icon className="w-5 h-5 mr-3" />
                        <span>{category.name}</span>
                      </div>
                      <span className="text-sm opacity-75">({category.count})</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Articles Section */}
            <div>
              <h2 className="text-2xl font-black text-white mb-6">Articles & Guides</h2>
              <div className="space-y-6">
                {filteredArticles.map(article => (
                  <article key={article.id} className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-white hover:text-blue-400 cursor-pointer">
                            {article.title}
                          </h3>
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(article.difficulty)}`}>
                            {article.difficulty}
                          </span>
                        </div>
                        <p className="text-gray-400 mb-3">{article.summary}</p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {article.readTime}
                          </div>
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {article.views} views
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Updated {article.lastUpdated}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {article.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => toggleLike(article.id)}
                          className={`flex items-center p-2 rounded transition-colors ${
                            likedArticles.includes(article.id)
                              ? 'text-blue-400 bg-blue-900/20'
                              : 'text-gray-400 hover:text-blue-400 hover:bg-gray-800'
                          }`}
                        >
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          <span className="text-sm">{article.likes + (likedArticles.includes(article.id) ? 1 : 0)}</span>
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
                          <Share className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Article preview */}
                    <div className="bg-gray-800 rounded-lg p-4 prose prose-invert max-w-none">
                      <div className="text-gray-300 text-sm leading-relaxed">
                        {article.content.split('\n').slice(0, 5).join('\n')}...
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <Link
                        href={`/help/knowledge-base/${article.id}`}
                        className="text-blue-400 hover:text-blue-300 font-semibold flex items-center"
                      >
                        Read Full Article
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
                          <Printer className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="text-2xl font-black text-white mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <div key={index} className="bg-gray-900 rounded-xl border border-gray-700">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800 transition-colors rounded-t-xl"
                    >
                      <div className="flex items-center">
                        <HelpCircle className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                        <span className="text-white font-semibold">{faq.question}</span>
                      </div>
                      {expandedFaq === index ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-300 leading-relaxed mb-4">{faq.answer}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <button className="flex items-center text-sm text-gray-400 hover:text-green-400 transition-colors">
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              Helpful ({faq.helpful})
                            </button>
                            <button className="flex items-center text-sm text-gray-400 hover:text-red-400 transition-colors">
                              <ThumbsDown className="w-4 h-4 mr-1" />
                              Not Helpful ({faq.notHelpful})
                            </button>
                          </div>
                          <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                            Suggest an edit
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* No Results */}
            {filteredArticles.length === 0 && filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search terms or browse different categories</p>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Contact Support
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}