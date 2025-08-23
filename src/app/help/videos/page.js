'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft,
  Play,
  Clock,
  Eye,
  Star,
  CheckCircle,
  Search,
  Filter,
  Grid,
  List,
  Bookmark,
  Share,
  Download,
  Users,
  FileText,
  CreditCard,
  Settings,
  Shield,
  Zap,
  Calendar,
  MessageCircle,
  Video,
  PlayCircle,
  Pause,
  Volume2,
  Maximize,
  RotateCcw,
  FastForward
} from 'lucide-react'

export default function TrainingVideos() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [currentVideo, setCurrentVideo] = useState(null)
  const [watchedVideos, setWatchedVideos] = useState([])
  const [bookmarkedVideos, setBookmarkedVideos] = useState([])

  const categories = [
    { id: 'all', name: 'All Videos', count: 24 },
    { id: 'getting-started', name: 'Getting Started', count: 8 },
    { id: 'client-management', name: 'Client Management', count: 6 },
    { id: 'documents', name: 'Documents', count: 4 },
    { id: 'billing', name: 'Billing & Payments', count: 3 },
    { id: 'customization', name: 'Customization', count: 2 },
    { id: 'security', name: 'Security', count: 1 }
  ]

  const trainingVideos = [
    {
      id: 'platform-overview',
      title: 'Platform Overview & Navigation',
      description: 'Complete walkthrough of your legal platform dashboard, navigation, and key features',
      duration: '8:45',
      category: 'getting-started',
      difficulty: 'Beginner',
      views: '2,156',
      rating: 4.9,
      thumbnail: '/images/training/overview.jpg',
      tags: ['dashboard', 'navigation', 'overview'],
      transcript: 'Welcome to your legal platform. In this video, we\'ll explore the main dashboard...',
      chapters: [
        { time: '0:00', title: 'Introduction' },
        { time: '1:30', title: 'Dashboard Overview' },
        { time: '3:45', title: 'Navigation Menu' },
        { time: '6:20', title: 'Quick Actions' }
      ]
    },
    {
      id: 'client-onboarding',
      title: 'Client Onboarding Process',
      description: 'Step-by-step guide to onboarding new clients and setting up their portal access',
      duration: '12:30',
      category: 'client-management',
      difficulty: 'Beginner',
      views: '1,843',
      rating: 4.8,
      thumbnail: '/images/training/client-onboarding.jpg',
      tags: ['clients', 'onboarding', 'portal'],
      transcript: 'Adding new clients to your platform is simple. Let\'s start by...',
      chapters: [
        { time: '0:00', title: 'Creating Client Profile' },
        { time: '3:15', title: 'Case Setup' },
        { time: '7:45', title: 'Portal Invitation' },
        { time: '10:20', title: 'Client Communication' }
      ]
    },
    {
      id: 'document-management',
      title: 'Document Upload & Organization',
      description: 'Learn how to upload, organize, and share documents securely with clients',
      duration: '9:15',
      category: 'documents',
      difficulty: 'Intermediate',
      views: '1,567',
      rating: 4.7,
      thumbnail: '/images/training/documents.jpg',
      tags: ['documents', 'upload', 'sharing'],
      transcript: 'Document management is crucial for legal practices. Here\'s how to...',
      chapters: [
        { time: '0:00', title: 'Document Upload' },
        { time: '2:30', title: 'Folder Organization' },
        { time: '5:45', title: 'Client Sharing' },
        { time: '7:30', title: 'Permission Settings' }
      ]
    },
    {
      id: 'payment-processing',
      title: 'Setting Up Payment Processing',
      description: 'Configure payment methods, create invoices, and manage client billing',
      duration: '11:20',
      category: 'billing',
      difficulty: 'Intermediate',
      views: '1,234',
      rating: 4.9,
      thumbnail: '/images/training/payments.jpg',
      tags: ['payments', 'billing', 'invoices'],
      transcript: 'Setting up payments is essential for your practice. Let\'s configure...',
      chapters: [
        { time: '0:00', title: 'Payment Gateway Setup' },
        { time: '3:45', title: 'Invoice Creation' },
        { time: '6:30', title: 'Recurring Billing' },
        { time: '9:15', title: 'Payment Reports' }
      ]
    },
    {
      id: 'portal-customization',
      title: 'Customizing Your Client Portal',
      description: 'Personalize your client portal with branding, colors, and custom templates',
      duration: '7:30',
      category: 'customization',
      difficulty: 'Advanced',
      views: '987',
      rating: 4.6,
      thumbnail: '/images/training/customization.jpg',
      tags: ['branding', 'customization', 'portal'],
      transcript: 'Make your portal uniquely yours. Here\'s how to customize...',
      chapters: [
        { time: '0:00', title: 'Logo Upload' },
        { time: '2:15', title: 'Color Schemes' },
        { time: '4:30', title: 'Email Templates' },
        { time: '6:00', title: 'Preview & Test' }
      ]
    },
    {
      id: 'security-setup',
      title: 'Security Best Practices',
      description: 'Essential security settings, two-factor authentication, and compliance features',
      duration: '6:45',
      category: 'security',
      difficulty: 'Advanced',
      views: '756',
      rating: 4.8,
      thumbnail: '/images/training/security.jpg',
      tags: ['security', 'compliance', '2fa'],
      transcript: 'Security is paramount in legal practice. Let\'s review...',
      chapters: [
        { time: '0:00', title: 'Two-Factor Authentication' },
        { time: '2:30', title: 'User Permissions' },
        { time: '4:15', title: 'Data Encryption' },
        { time: '5:45', title: 'Compliance Features' }
      ]
    }
  ]

  const filteredVideos = trainingVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const toggleBookmark = (videoId) => {
    setBookmarkedVideos(prev =>
      prev.includes(videoId)
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    )
  }

  const markAsWatched = (videoId) => {
    if (!watchedVideos.includes(videoId)) {
      setWatchedVideos(prev => [...prev, videoId])
    }
  }

  const formatDuration = (duration) => {
    return duration
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'text-green-400'
      case 'Intermediate': return 'text-yellow-400'
      case 'Advanced': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

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
                <h1 className="text-3xl font-black text-white">Training Videos</h1>
                <p className="text-gray-400 mt-1">Master your legal platform with step-by-step tutorials</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mt-6 flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search videos by title, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div className="flex space-x-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 text-xs opacity-75">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Video Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map(video => (
              <div key={video.id} className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all group">
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                    <Video className="w-12 h-12 text-gray-400" />
                  </div>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => { setCurrentVideo(video); markAsWatched(video.id); }}
                      className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                    >
                      <Play className="w-8 h-8 text-white ml-1" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                    {video.duration}
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(video.difficulty)} bg-black/70`}>
                      {video.difficulty}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleBookmark(video.id)}
                    className="absolute top-2 right-2 p-2 bg-black/70 rounded hover:bg-black/90 transition-colors"
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarkedVideos.includes(video.id) ? 'text-yellow-400 fill-current' : 'text-white'}`} />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-white font-bold mb-2 line-clamp-2">{video.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{video.description}</p>
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
                  {watchedVideos.includes(video.id) && (
                    <div className="mt-2 flex items-center text-green-400 text-xs">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Watched
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredVideos.map(video => (
              <div key={video.id} className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all">
                <div className="flex items-start space-x-6">
                  <div className="relative flex-shrink-0">
                    <div className="w-32 h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
                      <Video className="w-8 h-8 text-gray-400" />
                    </div>
                    <button 
                      onClick={() => { setCurrentVideo(video); markAsWatched(video.id); }}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors rounded-lg"
                    >
                      <Play className="w-6 h-6 text-white" />
                    </button>
                    <div className="absolute bottom-1 right-1 bg-black/70 px-1 py-0.5 rounded text-xs text-white">
                      {video.duration}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">{video.title}</h3>
                      <button
                        onClick={() => toggleBookmark(video.id)}
                        className="p-1 hover:bg-gray-800 rounded transition-colors"
                      >
                        <Bookmark className={`w-5 h-5 ${bookmarkedVideos.includes(video.id) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                      </button>
                    </div>
                    <p className="text-gray-400 mb-3">{video.description}</p>
                    <div className="flex items-center space-x-6 text-sm">
                      <span className={`font-semibold ${getDifficultyColor(video.difficulty)}`}>
                        {video.difficulty}
                      </span>
                      <div className="flex items-center text-gray-500">
                        <Eye className="w-4 h-4 mr-1" />
                        {video.views} views
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Star className="w-4 h-4 mr-1 text-yellow-400" />
                        {video.rating}
                      </div>
                      {watchedVideos.includes(video.id) && (
                        <div className="flex items-center text-green-400">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Watched
                        </div>
                      )}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {video.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No videos found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Video Player Modal */}
      {currentVideo && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">{currentVideo.title}</h2>
                  <p className="text-gray-400 mt-1">{currentVideo.description}</p>
                </div>
                <button
                  onClick={() => setCurrentVideo(null)}
                  className="text-gray-400 hover:text-white transition-colors text-2xl"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="w-full h-96 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center mb-6">
                    <div className="text-center">
                      <PlayCircle className="w-20 h-20 text-blue-400 mx-auto mb-4" />
                      <p className="text-white font-semibold text-lg">{currentVideo.title}</p>
                      <p className="text-gray-400">{currentVideo.duration}</p>
                    </div>
                  </div>
                  
                  {/* Video Controls */}
                  <div className="bg-gray-800 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="text-white hover:text-blue-400 transition-colors">
                          <Play className="w-6 h-6" />
                        </button>
                        <button className="text-white hover:text-blue-400 transition-colors">
                          <RotateCcw className="w-5 h-5" />
                        </button>
                        <button className="text-white hover:text-blue-400 transition-colors">
                          <FastForward className="w-5 h-5" />
                        </button>
                        <button className="text-white hover:text-blue-400 transition-colors">
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-400 text-sm">0:00 / {currentVideo.duration}</span>
                        <button className="text-white hover:text-blue-400 transition-colors">
                          <Maximize className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-600 rounded-full h-2 w-1/4"></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  {/* Video Info */}
                  <div className="bg-gray-800 rounded-lg p-4 mb-6">
                    <h3 className="text-white font-bold mb-3">Video Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Duration:</span>
                        <span className="text-white">{currentVideo.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Difficulty:</span>
                        <span className={getDifficultyColor(currentVideo.difficulty)}>{currentVideo.difficulty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Views:</span>
                        <span className="text-white">{currentVideo.views}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Rating:</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-white">{currentVideo.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chapters */}
                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="text-white font-bold mb-3">Chapters</h3>
                    <div className="space-y-2">
                      {currentVideo.chapters.map((chapter, index) => (
                        <button
                          key={index}
                          className="w-full text-left p-2 hover:bg-gray-700 rounded transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-white text-sm">{chapter.title}</span>
                            <span className="text-gray-400 text-xs">{chapter.time}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}