'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Scale, 
  ArrowLeft,
  Trophy,
  Crown,
  Star,
  Play,
  Eye,
  Calendar,
  Users,
  Award,
  Tv,
  Radio,
  Newspaper,
  Globe,
  Camera,
  Mic,
  Video,
  BookOpen,
  Quote,
  TrendingUp,
  Phone,
  Mail,
  ExternalLink,
  Download,
  Share
} from 'lucide-react'

export default function MediaPage() {
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const mediaHighlights = [
    {
      id: 'oj-dream-team',
      category: 'documentary',
      type: 'Documentary Feature',
      title: "The O.J. Simpson Dream Team",
      subtitle: "Inside the Trial of the Century",
      description: "Carl E. Douglas featured prominently in multiple documentaries about the O.J. Simpson trial, including 'O.J.: Made in America' and 'The People vs. O.J. Simpson'",
      image: "/images/scraped/practice-1.jpg",
      year: "1995-2025",
      network: "ESPN, Netflix, CNN",
      role: "Defense Team Coordinator",
      impact: "Most watched criminal trial in American history",
      quotes: [
        "We fought for justice and proved that every defendant deserves zealous representation.",
        "The Dream Team showed America what elite legal advocacy looks like."
      ],
      appearances: [
        "O.J.: Made in America (ESPN 30 for 30)",
        "The People vs. O.J. Simpson (FX)", 
        "American Crime Story",
        "60 Minutes",
        "CNN Special Reports"
      ]
    },
    {
      id: 'gm-verdict-coverage',
      category: 'news',
      type: 'Breaking News Coverage',
      title: "$4.9 Billion GM Verdict",
      subtitle: "Largest Personal Injury Verdict in History",
      description: "National media coverage of the historic General Motors verdict that changed automotive safety standards forever",
      image: "/images/scraped/practice-2.jpg",
      year: "2025",
      network: "CNN, Fox News, NBC",
      role: "Lead Attorney Carl E. Douglas",
      impact: "Changed automotive industry safety standards",
      quotes: [
        "This verdict sends a clear message: corporate profits cannot come before human lives.",
        "We held GM accountable for decades of putting money over safety."
      ],
      appearances: [
        "CNN Breaking News",
        "Fox Business Network",
        "NBC Nightly News",
        "Wall Street Journal",
        "Los Angeles Times"
      ]
    },
    {
      id: 'police-brutality-coverage',
      category: 'news',
      type: 'Civil Rights Coverage', 
      title: "$8M Police Accountability Victory",
      subtitle: "Fighting for Justice Against Police Brutality",
      description: "Extensive media coverage of the landmark police brutality verdict that set new precedents for law enforcement accountability",
      image: "/images/scraped/practice-3.jpg",
      year: "2025",
      network: "CNN, MSNBC, Local News",
      role: "Douglas Hicks Legal Team",
      impact: "New precedent for police accountability",
      quotes: [
        "No family should lose a loved one to police brutality and receive no justice.",
        "This verdict honors his memory and protects future victims."
      ],
      appearances: [
        "CNN Anderson Cooper 360",
        "MSNBC Prime Time",
        "ABC World News Tonight",
        "BET News",
        "Local LA News Stations"
      ]
    },
    {
      id: 'legal-commentary',
      category: 'interview',
      type: 'Legal Expert Commentary',
      title: "High-Profile Legal Analysis",
      subtitle: "Regular Expert Commentary on Major Cases",
      description: "Carl Douglas frequently appears as a legal expert commentator on high-profile criminal and civil cases nationwide",
      image: "/images/scraped/practice-4.jpg",
      year: "2020-2025",
      network: "CNN, Fox News, Court TV",
      role: "Legal Expert Analyst",
      impact: "Educating public on complex legal issues",
      quotes: [
        "My experience on the Dream Team gives me unique insights into high-stakes litigation.",
        "Every case teaches us something about justice and the American legal system."
      ],
      appearances: [
        "CNN Legal Analysis",
        "Fox News Legal Commentary",
        "Court TV Expert Panel",
        "HLN Prime Time",
        "NewsNation"
      ]
    },
    {
      id: 'cochran-firm-legacy',
      category: 'documentary',
      type: 'Legal Legacy Feature',
      title: "The Cochran Firm Legacy",
      subtitle: "Carrying Forward Johnnie Cochran's Mission",
      description: "Features about Carl Douglas's role as Managing Attorney at the Cochran Firm and continuing Johnnie Cochran's legacy of fighting for justice",
      image: "/images/scraped/practice-5.jpg",
      year: "2005-2025",
      network: "BET, CNN, Legal Documentaries",
      role: "Former Managing Attorney",
      impact: "Continuing civil rights advocacy legacy",
      quotes: [
        "Johnnie taught me that law is about fighting for those who can't fight for themselves.",
        "We carry forward his mission of making justice accessible to everyone."
      ],
      appearances: [
        "BET Honors Tribute",
        "CNN Civil Rights Special",
        "Legal Documentary Features",
        "Bar Association Panels",
        "Law School Lectures"
      ]
    },
    {
      id: 'celebrity-defense',
      category: 'news',
      type: 'Celebrity Legal Defense',
      title: "High-Profile Celebrity Cases",
      subtitle: "Defending Entertainment Industry Icons",
      description: "Media coverage of Carl Douglas representing major celebrities including Michael Jackson, Jamie Foxx, and Queen Latifah",
      image: "/images/scraped/practice-6.jpg",
      year: "2000-2025",
      network: "Entertainment Tonight, TMZ, E!",
      role: "Celebrity Defense Attorney",
      impact: "Protecting entertainment industry figures",
      quotes: [
        "Celebrities deserve the same zealous advocacy as any other client.",
        "Fame doesn't mean you sacrifice your right to quality legal representation."
      ],
      appearances: [
        "Entertainment Tonight",
        "TMZ Live",
        "E! News",
        "Access Hollywood",
        "Extra"
      ]
    }
  ]

  const pressReleases = [
    {
      date: "March 15, 2025",
      title: "Douglas Hicks Law Secures $8 Million Verdict in Police Brutality Case",
      summary: "Landmark verdict against Los Angeles County sets new precedent for police accountability"
    },
    {
      date: "February 28, 2025", 
      title: "Carl E. Douglas Inducted into Consumer Attorneys Hall of Fame",
      summary: "Recognition for lifetime achievement in personal injury and civil rights litigation"
    },
    {
      date: "January 10, 2025",
      title: "$1.576 Million Disability Rights Victory Against Greystar Management",
      summary: "Federal court verdict establishes strong precedent for housing discrimination cases"
    },
    {
      date: "December 5, 2023",
      title: "Jamon R. Hicks Secures $5 Million Wrongful Death Settlement",
      summary: "Major medical malpractice settlement provides security for three young children"
    }
  ]

  const awards = [
    {
      award: "Consumer Attorneys Association Hall of Fame",
      recipient: "Carl E. Douglas",
      year: "2023",
      description: "Lifetime achievement in consumer protection and personal injury law"
    },
    {
      award: "Super Lawyers Recognition",
      recipient: "Jamon R. Hicks", 
      year: "2014-2022",
      description: "Consecutive years of recognition for excellence in civil litigation"
    },
    {
      award: "Trial Advocacy Excellence Award",
      recipient: "Jamon R. Hicks",
      year: "2004",
      description: "Outstanding performance in trial advocacy at Loyola Law School"
    },
    {
      award: "Youngest President Recognition",
      recipient: "Jamon R. Hicks",
      year: "2009-2012",
      description: "Youngest president in John M. Langston Bar Association and CABL history"
    }
  ]

  const categories = [
    { id: 'all', label: 'All Media', icon: Globe },
    { id: 'documentary', label: 'Documentaries', icon: Video },
    { id: 'news', label: 'News Coverage', icon: Tv },
    { id: 'interview', label: 'Interviews', icon: Mic },
    { id: 'print', label: 'Print Media', icon: Newspaper }
  ]

  const filteredMedia = activeCategory === 'all' 
    ? mediaHighlights 
    : mediaHighlights.filter(item => item.category === activeCategory)

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
              <Link href="/media" className="text-white font-semibold border-b-2 border-blue-400">
                Media
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
            src="/images/scraped/hero-1.jpg"
            alt="Media Coverage"
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
              <span className="text-white">MEDIA &</span>
              <br />
              <span className="bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                PRESS
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              From the O.J. Simpson Dream Team to today&rsquo;s biggest cases,<br />
              see how we&rsquo;ve shaped legal history in the spotlight.
            </p>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Tv className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-black text-white mb-2">50+</div>
                <p className="text-gray-400">TV Appearances</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Newspaper className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-black text-white mb-2">100+</div>
                <p className="text-gray-400">Press Features</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-black text-white mb-2">15+</div>
                <p className="text-gray-400">Awards</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-black text-white mb-2">30+</div>
                <p className="text-gray-400">Years in Spotlight</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Category Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
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

      {/* Media Highlights */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              MEDIA HIGHLIGHTS
            </h2>
            <p className="text-xl text-gray-400">
              Featured coverage of our most significant cases and legal achievements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMedia.map((media, index) => (
              <div 
                key={media.id} 
                className="group cursor-pointer"
                onClick={() => setSelectedMedia(media)}
              >
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-orange-500 transition-all duration-500 transform hover:scale-105">
                  {/* Media Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={media.image}
                      alt={media.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
                    
                    {/* Media Type Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-full text-sm">
                        {media.type}
                      </span>
                    </div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-orange-400 font-semibold text-sm">{media.network}</span>
                      <span className="text-gray-400 text-sm">{media.year}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{media.title}</h3>
                    <p className="text-blue-400 font-semibold text-sm mb-3">{media.subtitle}</p>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {media.description.substring(0, 120)}...
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm font-medium">{media.role}</span>
                      <button className="inline-flex items-center text-orange-400 hover:text-orange-300 font-semibold text-sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Watch
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              AWARDS & RECOGNITION
            </h2>
            <p className="text-xl text-gray-400">
              Honored for excellence in legal advocacy and community service
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {awards.map((award, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{award.award}</h3>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-blue-400 font-semibold">{award.recipient}</span>
                      <span className="text-gray-400">{award.year}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{award.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              RECENT PRESS RELEASES
            </h2>
            <p className="text-xl text-gray-400">
              Latest news and announcements from our legal victories
            </p>
          </div>

          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-blue-400 font-semibold">{release.date}</span>
                      <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm">Press Release</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{release.title}</h3>
                    <p className="text-gray-400">{release.summary}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button className="p-2 border border-gray-600 rounded-lg hover:border-blue-500 transition-colors">
                      <Download className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-2 border border-gray-600 rounded-lg hover:border-blue-500 transition-colors">
                      <Share className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-2 border border-gray-600 rounded-lg hover:border-blue-500 transition-colors">
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Detail Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl max-w-4xl w-full border border-gray-700">
              {/* Close Button */}
              <button 
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition-colors z-10"
              >
                ✕
              </button>

              <div className="p-8">
                {/* Media Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-full">
                      {selectedMedia.type}
                    </span>
                    <span className="text-gray-400">{selectedMedia.year}</span>
                  </div>
                  <h2 className="text-4xl font-black text-white mb-2">{selectedMedia.title}</h2>
                  <p className="text-blue-400 font-semibold text-xl mb-4">{selectedMedia.subtitle}</p>
                  <p className="text-gray-300 leading-relaxed">{selectedMedia.description}</p>
                </div>

                {/* Media Details */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Coverage Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Network:</span>
                        <span className="text-white font-semibold">{selectedMedia.network}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Role:</span>
                        <span className="text-white font-semibold">{selectedMedia.role}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Impact:</span>
                        <span className="text-white font-semibold">{selectedMedia.impact}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Media Appearances</h3>
                    <div className="space-y-2">
                      {selectedMedia.appearances.map((appearance, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{appearance}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Notable Quotes */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Notable Quotes</h3>
                  {selectedMedia.quotes.map((quote, idx) => (
                    <blockquote key={idx} className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-4 mb-4">
                      <Quote className="w-6 h-6 text-blue-400 mb-2" />
                      <p className="text-white italic text-lg">&ldquo;{quote}&rdquo;</p>
                    </blockquote>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <Link 
                    href="/#contact"
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:scale-105 transition-all"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Request Media Interview
                  </Link>
                  <button className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-all">
                    <Share className="w-5 h-5 mr-2" />
                    Share Coverage
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-900 via-orange-900 to-yellow-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-8">
            READY FOR YOUR MEDIA MOMENT?
          </h2>
          <p className="text-2xl text-white/90 mb-12 leading-relaxed">
            From Dream Team legends to today&rsquo;s biggest victories, we know how to win in the courtroom and in the court of public opinion.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/#contact"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-orange-900 bg-white rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
            >
              <Camera className="mr-3 h-6 w-6" />
              Book Your Legal Legends
            </Link>
            <Link 
              href="/case-studies"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-white bg-transparent border-4 border-white rounded-xl hover:bg-white hover:text-orange-900 transition-all transform hover:scale-105"
            >
              <Trophy className="mr-3 h-6 w-6" />
              See Victory Stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}