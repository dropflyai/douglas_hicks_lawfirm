'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Scale, 
  ArrowLeft,
  BookOpen,
  Search,
  Filter,
  Calendar,
  User,
  Clock,
  Eye,
  Download,
  Share,
  Star,
  ThumbsUp,
  MessageCircle,
  Bookmark,
  ArrowRight,
  TrendingUp,
  Award,
  Shield,
  Gavel,
  Users,
  Phone,
  Mail,
  Globe,
  FileText,
  Video,
  Headphones,
  Play,
  ExternalLink,
  CheckCircle
} from 'lucide-react'

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedResource, setSelectedResource] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const resourceCategories = [
    { id: 'all', label: 'All Resources', icon: Globe },
    { id: 'legal-guides', label: 'Legal Guides', icon: BookOpen },
    { id: 'case-studies', label: 'Case Studies', icon: Award },
    { id: 'news-updates', label: 'Legal News', icon: TrendingUp },
    { id: 'video-content', label: 'Video Content', icon: Video },
    { id: 'podcasts', label: 'Podcasts', icon: Headphones },
    { id: 'templates', label: 'Templates', icon: FileText }
  ]

  const resources = [
    {
      id: 'civil-rights-guide',
      category: 'legal-guides',
      type: 'Legal Guide',
      title: "Complete Guide to Civil Rights Claims",
      subtitle: "Everything You Need to Know About Fighting Discrimination",
      description: "Comprehensive guide covering police brutality, employment discrimination, housing rights, and disability discrimination claims. Written by our expert civil rights attorneys.",
      image: "/images/scraped/practice-1.jpg",
      author: "Carl E. Douglas & A'ja Simplis",
      publishDate: "March 15, 2024",
      readTime: "12 min read",
      downloads: 2847,
      views: 15420,
      rating: 4.9,
      featured: true,
      
      content: {
        sections: [
          "Understanding Your Civil Rights",
          "Types of Civil Rights Violations", 
          "When to File a Civil Rights Claim",
          "Evidence Collection and Documentation",
          "The Legal Process and Timeline",
          "Compensation and Damages Available",
          "How to Choose the Right Attorney"
        ],
        keyPoints: [
          "Know your rights under federal and state civil rights laws",
          "Document everything - photos, witnesses, medical records",
          "Act quickly - statutes of limitations apply", 
          "Civil rights violations can result in significant compensation"
        ]
      },
      
      tags: ["Civil Rights", "Discrimination", "Police Brutality", "Employment Law", "Housing Rights"],
      relatedCases: ["$8M Police Brutality Victory", "$1.576M Disability Discrimination"],
      downloadUrl: "/resources/civil-rights-guide.pdf"
    },
    {
      id: 'personal-injury-checklist',
      category: 'legal-guides',
      type: 'Legal Checklist',
      title: "Personal Injury Case Checklist",
      subtitle: "Essential Steps After an Accident",
      description: "Step-by-step checklist for personal injury victims covering immediate actions, evidence preservation, medical documentation, and legal strategy.",
      image: "/images/scraped/practice-2.jpg",
      author: "Jamon R. Hicks",
      publishDate: "March 10, 2024",
      readTime: "8 min read",
      downloads: 3521,
      views: 18905,
      rating: 4.8,
      featured: true,
      
      content: {
        sections: [
          "Immediate Post-Accident Actions",
          "Medical Documentation Requirements",
          "Evidence Collection and Preservation",
          "Insurance Company Communications",
          "Legal Timeline and Deadlines",
          "Maximizing Your Recovery",
          "When to Hire an Attorney"
        ],
        keyPoints: [
          "Seek medical attention immediately - even for minor injuries",
          "Never admit fault or sign anything without legal review",
          "Document everything with photos and witness statements",
          "Insurance companies are not on your side"
        ]
      },
      
      tags: ["Personal Injury", "Auto Accidents", "Medical Malpractice", "Insurance Claims"],
      relatedCases: ["$4.9B GM Product Liability", "$5M Wrongful Death"],
      downloadUrl: "/resources/personal-injury-checklist.pdf"
    },
    {
      id: 'criminal-defense-rights',
      category: 'legal-guides', 
      type: 'Legal Guide',
      title: "Your Rights in Criminal Defense",
      subtitle: "Protecting Yourself in the Criminal Justice System",
      description: "Essential guide to criminal defense rights, Miranda warnings, search and seizure laws, and how to interact with law enforcement. Based on Dream Team experience.",
      image: "/images/scraped/practice-3.jpg",
      author: "Carl E. Douglas",
      publishDate: "February 28, 2024",
      readTime: "15 min read",
      downloads: 4156,
      views: 22340,
      rating: 5.0,
      featured: true,
      
      content: {
        sections: [
          "Your Constitutional Rights",
          "Miranda Rights Explained",
          "Search and Seizure Laws",
          "How to Interact with Police",
          "The Criminal Defense Process",
          "Building a Strong Defense",
          "When to Contact an Attorney"
        ],
        keyPoints: [
          "You have the right to remain silent - use it",
          "Never consent to searches without a warrant",
          "Request an attorney immediately if arrested",
          "Quality legal representation can change everything"
        ]
      },
      
      tags: ["Criminal Defense", "Constitutional Rights", "Miranda Rights", "Police Interaction"],
      relatedCases: ["O.J. Simpson Dream Team", "Celebrity Defense Cases"],
      downloadUrl: "/resources/criminal-defense-rights.pdf"
    },
    {
      id: 'employment-discrimination-video',
      category: 'video-content',
      type: 'Video Series',
      title: "Employment Discrimination: Know Your Rights",
      subtitle: "5-Part Video Series on Workplace Rights",
      description: "Comprehensive video series covering workplace discrimination, harassment, wrongful termination, and wage disputes. Featuring real case examples and expert analysis.",
      image: "/images/scraped/practice-4.jpg",
      author: "A'ja Simplis & Bianca Perez",
      publishDate: "March 5, 2024",
      readTime: "45 min total",
      downloads: 1892,
      views: 12670,
      rating: 4.7,
      featured: false,
      
      content: {
        sections: [
          "Episode 1: Understanding Workplace Discrimination",
          "Episode 2: Sexual Harassment and Hostile Work Environment",
          "Episode 3: Wrongful Termination and Retaliation", 
          "Episode 4: Wage and Hour Violations",
          "Episode 5: Filing Claims and Legal Process"
        ],
        keyPoints: [
          "Document all incidents of discrimination or harassment",
          "Know your company's policies and complaint procedures",
          "Understand federal and state employment laws",
          "Seek legal advice before taking action"
        ]
      },
      
      tags: ["Employment Law", "Workplace Discrimination", "Sexual Harassment", "Wrongful Termination"],
      relatedCases: ["$733K Employment Discrimination Victory"],
      downloadUrl: "/resources/employment-discrimination-videos.zip"
    },
    {
      id: 'legal-news-march-2024',
      category: 'news-updates',
      type: 'Legal News',
      title: "Legal Updates: March 2024",
      subtitle: "Important Changes in Civil Rights and Personal Injury Law",
      description: "Monthly roundup of significant legal developments, new legislation, important court decisions, and their impact on civil rights and personal injury cases.",
      image: "/images/scraped/practice-5.jpg",
      author: "Douglas Hicks Legal Team",
      publishDate: "March 1, 2024",
      readTime: "6 min read",
      downloads: 945,
      views: 8230,
      rating: 4.6,
      featured: false,
      
      content: {
        sections: [
          "New Civil Rights Legislation",
          "Recent Court Decisions",
          "Changes in Personal Injury Law",
          "Updated Settlement Trends",
          "Upcoming Legal Deadlines",
          "Practice Area Updates"
        ],
        keyPoints: [
          "New federal civil rights protections expanded",
          "Personal injury damage caps increased in California",
          "Police accountability measures strengthened",
          "Employment discrimination claims on the rise"
        ]
      },
      
      tags: ["Legal News", "Legislation Updates", "Court Decisions", "Practice Updates"],
      relatedCases: [],
      downloadUrl: "/resources/legal-news-march-2024.pdf"
    },
    {
      id: 'dream-team-podcast',
      category: 'podcasts',
      type: 'Podcast Series',
      title: "Inside the Dream Team",
      subtitle: "Carl Douglas Shares Behind-the-Scenes Stories",
      description: "Exclusive podcast series where Carl E. Douglas shares never-before-told stories from the O.J. Simpson trial and other high-profile cases.",
      image: "/images/scraped/practice-6.jpg",
      author: "Carl E. Douglas",
      publishDate: "Weekly Series",
      readTime: "30-60 min episodes",
      downloads: 5643,
      views: 34520,
      rating: 4.9,
      featured: true,
      
      content: {
        sections: [
          "Episode 1: Joining the Dream Team",
          "Episode 2: The Trial Strategy",
          "Episode 3: Working with Johnnie Cochran",
          "Episode 4: Celebrity Defense Cases",
          "Episode 5: Lessons from High-Stakes Litigation",
          "Episode 6: The Future of Criminal Defense"
        ],
        keyPoints: [
          "Exclusive behind-the-scenes insights from the trial of the century",
          "Learn from one of America's most successful defense attorneys",
          "Real strategies used in high-profile cases",
          "Lessons applicable to any legal case"
        ]
      },
      
      tags: ["Podcast", "Dream Team", "O.J. Simpson", "Criminal Defense", "Legal Strategy"],
      relatedCases: ["O.J. Simpson Trial", "Celebrity Defense Cases"],
      downloadUrl: "/resources/dream-team-podcast-episodes.zip"
    },
    {
      id: 'legal-forms-templates',
      category: 'templates',
      type: 'Legal Templates',
      title: "Essential Legal Forms and Templates",
      subtitle: "Professional Legal Documents for Download",
      description: "Collection of essential legal forms and templates including intake forms, retainer agreements, demand letters, and case documentation templates.",
      image: "/images/scraped/hero-1.jpg",
      author: "Douglas Hicks Legal Team",
      publishDate: "Updated Monthly",
      readTime: "Reference Material",
      downloads: 7823,
      views: 25680,
      rating: 4.5,
      featured: false,
      
      content: {
        sections: [
          "Client Intake Forms",
          "Retainer Agreement Templates",
          "Demand Letter Templates",
          "Case Documentation Forms",
          "Settlement Agreement Templates",
          "Court Filing Templates"
        ],
        keyPoints: [
          "Professional legal forms used by our attorneys",
          "Customizable templates for various case types",
          "Updated to comply with current legal requirements",
          "Save time and ensure proper documentation"
        ]
      },
      
      tags: ["Legal Forms", "Templates", "Documentation", "Professional Tools"],
      relatedCases: [],
      downloadUrl: "/resources/legal-forms-templates.zip"
    }
  ]

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory)

  const searchedResources = searchQuery
    ? filteredResources.filter(resource => 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : filteredResources

  const featuredResources = resources.filter(resource => resource.featured)

  const stats = [
    { label: "Legal Resources", value: "50+", icon: BookOpen },
    { label: "Total Downloads", value: "25K+", icon: Download },
    { label: "Monthly Views", value: "75K+", icon: Eye },
    { label: "Expert Authors", value: "5", icon: Users }
  ]

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
              <Link href="/practice-areas" className="text-gray-300 hover:text-white transition-colors">
                Practice Areas
              </Link>
              <Link href="/team" className="text-gray-300 hover:text-white transition-colors">
                Our Team
              </Link>
              <Link href="/results" className="text-gray-300 hover:text-white transition-colors">
                Results
              </Link>
              <Link href="/case-studies" className="text-gray-300 hover:text-white transition-colors">
                Case Studies
              </Link>
              <Link href="/media" className="text-gray-300 hover:text-white transition-colors">
                Media
              </Link>
              <Link href="/testimonials" className="text-gray-300 hover:text-white transition-colors">
                Testimonials
              </Link>
              <Link href="/resources" className="text-white font-semibold border-b-2 border-blue-400">
                Resources
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
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/scraped/hero-3.jpg"
            alt="Legal Resources"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
        </div>
        
        <div className={`max-w-7xl mx-auto relative transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <Link 
            href="/"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 text-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
              <span className="text-white">LEGAL</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-green-500 to-purple-500 bg-clip-text text-transparent">
                RESOURCES
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Expert legal insights, guides, and tools from the attorneys<br />
              who&rsquo;ve won billions in verdicts and changed legal history.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search legal guides, case studies, videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-800/80 border border-gray-600 rounded-xl text-white text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center transform hover:scale-105 transition-transform">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                    <p className="text-gray-400">{stat.label}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {resourceCategories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {category.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              FEATURED RESOURCES
            </h2>
            <p className="text-xl text-gray-400">
              Our most popular legal guides and expert insights
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredResources.map((resource, index) => (
              <div 
                key={resource.id} 
                className="group cursor-pointer"
                onClick={() => setSelectedResource(resource)}
              >
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-500 transform hover:scale-[1.02]">
                  {/* Background Image */}
                  <div className="absolute inset-0 opacity-20">
                    <Image
                      src={resource.image}
                      alt={resource.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
                  </div>

                  <div className="relative p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-full text-sm">
                          {resource.type}
                        </span>
                        <h3 className="text-2xl font-bold text-white mt-4 mb-2">{resource.title}</h3>
                        <p className="text-blue-400 font-semibold">{resource.subtitle}</p>
                      </div>
                      {resource.category === 'video-content' && (
                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-white ml-1" />
                        </div>
                      )}
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {resource.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {resource.publishDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {resource.readTime}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-6 leading-relaxed">{resource.description}</p>

                    {/* Stats */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          {resource.downloads.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {resource.views.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-semibold">{resource.rating}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {resource.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-lg hover:scale-105 transition-all">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Read More
                      </button>
                      <button className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Resources */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              ALL RESOURCES
            </h2>
            <p className="text-xl text-gray-400">
              {searchQuery ? `Search results for "${searchQuery}"` : 'Complete library of legal expertise'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchedResources.map((resource, index) => (
              <div 
                key={resource.id} 
                className="group cursor-pointer"
                onClick={() => setSelectedResource(resource)}
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-105">
                  {/* Resource Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={resource.image}
                      alt={resource.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    
                    {/* Type Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-full text-sm">
                        {resource.type}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-semibold">{resource.rating}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight">{resource.title}</h3>
                    
                    {/* Meta */}
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                      <span>{resource.author}</span>
                      <span>•</span>
                      <span>{resource.readTime}</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {resource.description.substring(0, 100)}...
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          {resource.downloads.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {resource.views.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action */}
                    <div className="text-center">
                      <span className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold text-sm">
                        View Resource
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Detail Modal */}
      {selectedResource && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl max-w-4xl w-full border border-gray-700">
              {/* Close Button */}
              <button 
                onClick={() => setSelectedResource(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition-colors z-10"
              >
                ✕
              </button>

              <div className="p-8">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-full">
                      {selectedResource.type}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-white font-semibold">{selectedResource.rating}</span>
                    </div>
                  </div>
                  <h2 className="text-4xl font-black text-white mb-2">{selectedResource.title}</h2>
                  <p className="text-blue-400 font-semibold text-xl mb-4">{selectedResource.subtitle}</p>
                  <p className="text-gray-300 leading-relaxed">{selectedResource.description}</p>
                </div>

                {/* Resource Details */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Content Overview</h3>
                    <div className="space-y-3">
                      {selectedResource.content.sections.map((section, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{section}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Key Takeaways</h3>
                    <div className="space-y-3">
                      {selectedResource.content.keyPoints.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Star className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-1" />
                          <span className="text-gray-300 text-sm">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Meta Information */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <User className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-white font-semibold">{selectedResource.author}</div>
                    <div className="text-gray-400 text-sm">Expert Author</div>
                  </div>
                  <div className="text-center">
                    <Download className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-white font-semibold">{selectedResource.downloads.toLocaleString()}</div>
                    <div className="text-gray-400 text-sm">Downloads</div>
                  </div>
                  <div className="text-center">
                    <Eye className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-white font-semibold">{selectedResource.views.toLocaleString()}</div>
                    <div className="text-gray-400 text-sm">Views</div>
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-white mb-4">Topics Covered</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedResource.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button className="flex-1 inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-lg hover:scale-105 transition-all">
                    <Download className="w-5 h-5 mr-2" />
                    Download Resource
                  </button>
                  <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-all">
                    <Share className="w-5 h-5 mr-2" />
                    Share
                  </button>
                  <button className="px-8 py-4 border-2 border-yellow-400 text-yellow-400 font-bold rounded-lg hover:bg-yellow-400 hover:text-black transition-all">
                    <Bookmark className="w-5 h-5 mr-2" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 via-green-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-8">
            NEED EXPERT LEGAL GUIDANCE?
          </h2>
          <p className="text-2xl text-white/90 mb-12 leading-relaxed">
            These resources provide valuable insights, but every case is unique. Get personalized legal advice from the champions who wrote these guides.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/#contact"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-blue-900 bg-white rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
            >
              <Phone className="mr-3 h-6 w-6" />
              Get Expert Legal Consultation
            </Link>
            <Link 
              href="/team"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-white bg-transparent border-4 border-white rounded-xl hover:bg-white hover:text-blue-900 transition-all transform hover:scale-105"
            >
              <Users className="mr-3 h-6 w-6" />
              Meet the Expert Authors
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}