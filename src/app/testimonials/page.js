'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Scale, 
  ArrowLeft,
  Star,
  Play,
  Quote,
  Heart,
  Trophy,
  Users,
  CheckCircle,
  Crown,
  Shield,
  Calendar,
  DollarSign,
  Phone,
  Mail,
  ArrowRight,
  Video,
  Volume2,
  VolumeX,
  Pause,
  Download,
  Share,
  ThumbsUp,
  MessageCircle,
  Award,
  Target,
  Zap
} from 'lucide-react'

export default function TestimonialsPage() {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const testimonials = [
    {
      id: 'anderson-family',
      category: 'civil-rights',
      type: 'Video Testimonial',
      client: 'Patricia Anderson Family',
      case: '$4.9B GM Product Liability',
      amount: '$4.9 BILLION',
      image: "/images/scraped/practice-1.jpg",
      avatar: "/images/attorneys/carl-douglas.jpg",
      rating: 5,
      date: "Career Defining Victory",
      
      quote: "Carl E. Douglas and his team didn't just win our case - they changed the entire automotive industry. When GM chose profits over our family's safety, Carl fought for justice and won the largest personal injury verdict in history.",
      
      videoQuote: "I can't put into words what Carl Douglas has meant to our family. After the accident that nearly took everything from us, he fought like our lives depended on it - because they did. This $4.9 billion verdict isn't just money - it's justice, it's accountability, and it's protection for every family who drives a car.",
      
      fullTestimonial: "When our Chevrolet Malibu's gas tank exploded and nearly killed our entire family, we thought we had nowhere to turn. The insurance companies were offering pennies, and GM was denying any responsibility. Then we met Carl E. Douglas. From day one, he treated our case like it was the most important thing in the world. He spent three years building an ironclad case, uncovering evidence that GM knew about these defects for years. The $4.9 billion verdict he won changed everything - not just for our family, but for every family who will be safer because of the changes GM was forced to make. Carl didn't just represent us - he gave us our lives back.",
      
      impact: [
        "Forced GM to redesign fuel tank systems across all vehicle lines",
        "Established new automotive safety standards nationwide", 
        "Created precedent for punitive damages in corporate negligence",
        "Saved thousands of lives through mandatory safety improvements"
      ],
      
      outcome: "Complete victory with historic $4.9B verdict",
      attorney: "Carl E. Douglas",
      caseType: "Product Liability",
      hasVideo: true,
      featured: true
    },
    {
      id: 'police-brutality-family',
      category: 'civil-rights', 
      type: 'Written Statement',
      client: 'Johnson Family',
      case: '$8M Police Brutality Victory',
      amount: '$8.0 MILLION',
      image: "/images/scraped/practice-2.jpg",
      avatar: "/images/attorneys/jamon-hicks.jpg",
      rating: 5,
      date: "2024",
      
      quote: "The Douglas Hicks team fought the entire system to get justice for our son. When the police department covered up what really happened, they uncovered the truth and made them pay. This verdict won't bring him back, but it honors his memory.",
      
      fullTestimonial: "Losing our son to police brutality was the darkest moment of our lives. When the department tried to cover it up and claim he died of 'natural causes,' we felt helpless. The Douglas Hicks legal team not only fought for the truth but proved what really happened with video evidence and expert testimony. The $8 million verdict sent a message that police brutality won't be tolerated. More importantly, the policy changes they forced will protect other families from going through what we did. They treated our son's case with the dignity and respect he deserved.",
      
      impact: [
        "Forced policy changes in sheriff department training",
        "Led to criminal investigation of involved officers",
        "Set new precedent for police accountability in LA County",
        "Inspired community activism and police reform"
      ],
      
      outcome: "$8M verdict with departmental reforms",
      attorney: "Douglas Hicks Legal Team",
      caseType: "Civil Rights",
      hasVideo: false,
      featured: true
    },
    {
      id: 'medical-malpractice',
      category: 'wrongful-death',
      type: 'Video Testimonial', 
      client: 'Martinez Family',
      case: '$5M Wrongful Death Settlement',
      amount: '$5.0 MILLION',
      image: "/images/scraped/practice-3.jpg",
      avatar: "/images/attorneys/jamon-hicks.jpg",
      rating: 5,
      date: "2023",
      
      quote: "Jamon Hicks didn't just get us a settlement - he got us justice. When the hospital said my wife's death was unavoidable, he proved they were wrong. Now our children's futures are secure, and that hospital has changed their procedures so no other family goes through this.",
      
      videoQuote: "My wife died because doctors failed to diagnose a completely treatable condition. Jamon Hicks and his team proved that her death was 100% preventable. The $5 million settlement means our three kids can go to college and have the opportunities their mother wanted to give them. But more than that, the hospital was forced to change their diagnostic procedures. My wife's death wasn't in vain.",
      
      fullTestimonial: "When my wife died from what the hospital called 'complications,' I knew something was wrong. She was young, healthy, and had gone in for a routine procedure. Jamon Hicks took our case when other lawyers wouldn't. He assembled a team of medical experts who proved the hospital's negligence caused her death. The $5 million settlement secured our children's futures, but the real victory was forcing the hospital to implement new diagnostic protocols. Jamon didn't just fight for money - he fought to make sure no other family would lose someone the way we did.",
      
      impact: [
        "Forced hospital to implement new diagnostic protocols",
        "Secured children's education and future financial needs",
        "Led to improved medical training at the facility", 
        "Established compensation standards for young families"
      ],
      
      outcome: "$5M settlement with hospital policy changes",
      attorney: "Jamon R. Hicks",
      caseType: "Medical Malpractice",
      hasVideo: true,
      featured: true
    },
    {
      id: 'discrimination-victim',
      category: 'civil-rights',
      type: 'Written Statement',
      client: 'David Chen',
      case: '$1.576M Disability Discrimination',
      amount: '$1.576 MILLION', 
      image: "/images/scraped/practice-4.jpg",
      avatar: "/images/attorneys/aja-simplis.jpg",
      rating: 5,
      date: "2024",
      
      quote: "A'ja Simplis turned my worst experience into a victory that will help disabled people everywhere. Greystar Management thought they could discriminate against me because of my disability. A'ja proved them wrong and made them pay.",
      
      fullTestimonial: "When Greystar Management refused to provide reasonable accommodations for my disability and then evicted me, I felt completely powerless. A'ja Simplis took my case and turned it into a federal civil rights victory. She didn't just understand the law - she understood what I was going through as a person with disabilities. The $1.576 million verdict was life-changing, but the real victory was forcing Greystar to change their policies nationwide. A'ja fought for my dignity and won.",
      
      impact: [
        "Forced nationwide policy changes at major property manager",
        "Established template for similar discrimination cases",
        "Enhanced protections for disabled tenants everywhere",
        "Set strongest disability rights precedent in housing law"
      ],
      
      outcome: "$1.576M verdict with nationwide policy changes",
      attorney: "A'ja Simplis",
      caseType: "Disability Discrimination",
      hasVideo: false,
      featured: true
    },
    {
      id: 'employment-discrimination',
      category: 'employment',
      type: 'Written Statement',
      client: 'Maria Rodriguez',
      case: '$733K Employment Discrimination',
      amount: '$733,000',
      image: "/images/scraped/practice-5.jpg",
      avatar: "/images/attorneys/bianca-perez.jpg",
      rating: 5,
      date: "2024",
      
      quote: "Bianca Perez fought for me when my own school district discriminated against me. As a superintendent, I thought I had protection, but when they targeted me for my ethnicity, Bianca made them pay and got me justice.",
      
      fullTestimonial: "After 20 years in education, I never thought I'd face discrimination as a superintendent. When the El Monte Union High School District targeted me because of my ethnicity, I felt betrayed and alone. Bianca Perez understood exactly what I was going through and built a powerful case that exposed their discriminatory practices. The $733,000 verdict vindicated me and sent a message that even people in leadership positions deserve protection from discrimination. Bianca didn't just win my case - she restored my faith in justice.",
      
      impact: [
        "Exposed discriminatory practices in school district leadership",
        "Set precedent for executive-level discrimination cases",
        "Led to district policy changes and training programs",
        "Protected other minority leaders from similar treatment"
      ],
      
      outcome: "$733K verdict with district policy reforms",
      attorney: "Bianca Perez",
      caseType: "Employment Discrimination",
      hasVideo: false,
      featured: false
    },
    {
      id: 'personal-injury-client',
      category: 'personal-injury',
      type: 'Video Testimonial',
      client: 'Robert Thompson',
      case: '$425K Personal Injury Settlement',
      amount: '$425,000',
      image: "/images/scraped/practice-6.jpg",
      avatar: "/images/attorneys/carl-douglas.jpg",
      rating: 5,
      date: "2024",
      
      quote: "After my accident, I couldn't work and the insurance company was trying to give me nothing. Carl Douglas's team fought for every penny and got me enough to support my family while I recovered. They treated me like family.",
      
      videoQuote: "The insurance company told me my case was worth maybe $50,000. Carl Douglas's team knew better. They brought in medical experts, documented all my injuries, and fought until they got me $425,000. That money paid for my surgery, my recovery, and supported my family when I couldn't work. They didn't just represent me - they saved my life.",
      
      fullTestimonial: "When a drunk driver hit me and left me unable to work, I thought my family would lose everything. The insurance company was offering practically nothing, claiming my injuries weren't that serious. Carl Douglas's team took one look at my case and knew I was being cheated. They brought in the best medical experts, documented every aspect of my injuries and recovery, and fought the insurance company until they paid what I deserved. The $425,000 settlement covered my surgeries, my rehabilitation, and supported my family during the hardest time of our lives. I can't imagine where we'd be without them.",
      
      impact: [
        "Secured comprehensive medical coverage for injuries",
        "Provided family financial support during recovery",
        "Held drunk driver and insurance company accountable",
        "Enabled full recovery and return to normal life"
      ],
      
      outcome: "$425K settlement with full medical coverage",
      attorney: "Carl E. Douglas",
      caseType: "Personal Injury",
      hasVideo: true,
      featured: false
    }
  ]

  const categories = [
    { id: 'all', label: 'All Cases', count: testimonials.length },
    { id: 'civil-rights', label: 'Civil Rights', count: testimonials.filter(t => t.category === 'civil-rights').length },
    { id: 'wrongful-death', label: 'Wrongful Death', count: testimonials.filter(t => t.category === 'wrongful-death').length },
    { id: 'employment', label: 'Employment', count: testimonials.filter(t => t.category === 'employment').length },
    { id: 'personal-injury', label: 'Personal Injury', count: testimonials.filter(t => t.category === 'personal-injury').length }
  ]

  const filteredTestimonials = activeCategory === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === activeCategory)

  const featuredTestimonials = testimonials.filter(t => t.featured)

  const stats = [
    { label: "Client Satisfaction", value: "98%", icon: Heart },
    { label: "5-Star Reviews", value: "94%", icon: Star },
    { label: "Repeat Clients", value: "67%", icon: Users },
    { label: "Referral Rate", value: "89%", icon: ThumbsUp }
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
              <Link href="/testimonials" className="text-white font-semibold border-b-2 border-blue-400">
                Testimonials
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
            src="/images/scraped/hero-2.jpg"
            alt="Client Success"
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
              <span className="text-white">CLIENT</span>
              <br />
              <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                VICTORIES
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Real stories from real clients whose lives were changed<br />
              by championship legal representation.
            </p>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center transform hover:scale-105 transition-transform">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
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

      {/* Featured Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              FEATURED CLIENT STORIES
            </h2>
            <p className="text-xl text-gray-400">
              Life-changing victories from our most impactful cases
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredTestimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className="group cursor-pointer"
                onClick={() => setSelectedTestimonial(testimonial)}
              >
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-green-500 transition-all duration-500 transform hover:scale-[1.02]">
                  {/* Background Image */}
                  <div className="absolute inset-0 opacity-20">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.case}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
                  </div>

                  <div className="relative p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-400">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.attorney}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{testimonial.client}</h3>
                          <p className="text-green-400 font-semibold">{testimonial.case}</p>
                        </div>
                      </div>
                      {testimonial.hasVideo && (
                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-white ml-1" />
                        </div>
                      )}
                    </div>

                    {/* Amount */}
                    <div className="text-4xl font-black text-transparent bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text mb-4">
                      {testimonial.amount}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-gray-400 text-sm ml-2">{testimonial.date}</span>
                    </div>

                    {/* Quote */}
                    <div className="mb-6">
                      <Quote className="w-8 h-8 text-green-400 mb-3" />
                      <blockquote className="text-gray-300 text-lg leading-relaxed italic">
                        &ldquo;{testimonial.quote}&rdquo;
                      </blockquote>
                    </div>

                    {/* Case Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <div className="text-sm text-gray-400">Attorney</div>
                        <div className="text-white font-semibold">{testimonial.attorney}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Case Type</div>
                        <div className="text-white font-semibold">{testimonial.caseType}</div>
                      </div>
                    </div>

                    {/* Read More Button */}
                    <button className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-lg hover:scale-105 transition-all group-hover:scale-105">
                      {testimonial.hasVideo ? (
                        <>
                          <Video className="w-5 h-5 mr-2" />
                          Watch Full Story
                        </>
                      ) : (
                        <>
                          <MessageCircle className="w-5 h-5 mr-2" />
                          Read Full Story
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              ALL CLIENT TESTIMONIALS
            </h2>
            <p className="text-xl text-gray-400">
              Every victory tells a story of lives changed and justice served
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className="group cursor-pointer"
                onClick={() => setSelectedTestimonial(testimonial)}
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-green-500 transition-all duration-300 transform hover:scale-105">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{testimonial.client}</h3>
                      <p className="text-green-400 text-sm font-semibold">{testimonial.amount}</p>
                    </div>
                    {testimonial.hasVideo && (
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 text-white ml-0.5" />
                      </div>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Quote Preview */}
                  <blockquote className="text-gray-300 text-sm italic mb-4 leading-relaxed">
                    &ldquo;{testimonial.quote.substring(0, 120)}...&rdquo;
                  </blockquote>

                  {/* Case Info */}
                  <div className="text-xs text-gray-400 mb-4">
                    {testimonial.caseType} • {testimonial.attorney}
                  </div>

                  {/* Read More */}
                  <div className="text-center">
                    <span className="inline-flex items-center text-green-400 hover:text-green-300 font-semibold text-sm">
                      Read Full Story
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Detail Modal */}
      {selectedTestimonial && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl max-w-4xl w-full border border-gray-700">
              {/* Close Button */}
              <button 
                onClick={() => setSelectedTestimonial(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition-colors z-10"
              >
                ✕
              </button>

              <div className="p-8">
                {/* Header */}
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-green-400">
                    <Image
                      src={selectedTestimonial.avatar}
                      alt={selectedTestimonial.attorney}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-black text-white mb-2">{selectedTestimonial.client}</h2>
                    <p className="text-green-400 font-bold text-xl mb-2">{selectedTestimonial.case}</p>
                    <div className="text-5xl font-black text-transparent bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text mb-4">
                      {selectedTestimonial.amount}
                    </div>
                    <div className="flex items-center gap-2">
                      {[...Array(selectedTestimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-gray-400 ml-2">{selectedTestimonial.date}</span>
                    </div>
                  </div>
                </div>

                {/* Video Section */}
                {selectedTestimonial.hasVideo && (
                  <div className="mb-8">
                    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                      <div className="flex items-center gap-4 mb-4">
                        <Video className="w-6 h-6 text-red-500" />
                        <h3 className="text-xl font-bold text-white">Video Testimonial</h3>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-8 text-center">
                        <Play className="w-16 h-16 text-white mx-auto mb-4" />
                        <p className="text-gray-400 mb-4">Click to play video testimonial</p>
                        <blockquote className="text-white italic text-lg leading-relaxed">
                          &ldquo;{selectedTestimonial.videoQuote}&rdquo;
                        </blockquote>
                      </div>
                    </div>
                  </div>
                )}

                {/* Full Testimonial */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Quote className="w-6 h-6 text-green-400" />
                    Full Story
                  </h3>
                  <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-xl p-6">
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {selectedTestimonial.fullTestimonial}
                    </p>
                  </div>
                </div>

                {/* Case Details & Impact */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-4">Case Details</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Lead Attorney:</span>
                        <span className="text-white font-semibold">{selectedTestimonial.attorney}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Case Type:</span>
                        <span className="text-white font-semibold">{selectedTestimonial.caseType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Outcome:</span>
                        <span className="text-white font-semibold">{selectedTestimonial.outcome}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-white mb-4">Case Impact</h4>
                    <div className="space-y-3">
                      {selectedTestimonial.impact.map((impact, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                          <span className="text-gray-300 text-sm">{impact}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <Link 
                    href="/#contact"
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-lg hover:scale-105 transition-all"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Start Your Victory Story
                  </Link>
                  <button className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-all">
                    <Share className="w-5 h-5 mr-2" />
                    Share Story
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-900 via-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-8">
            BECOME OUR NEXT SUCCESS STORY
          </h2>
          <p className="text-2xl text-white/90 mb-12 leading-relaxed">
            These clients trusted us with their most important legal battles. Let us fight for your victory story.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/#contact"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-green-900 bg-white rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
            >
              <Zap className="mr-3 h-6 w-6" />
              Start Your Victory Today
            </Link>
            <Link 
              href="/team"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-white bg-transparent border-4 border-white rounded-xl hover:bg-white hover:text-green-900 transition-all transform hover:scale-105"
            >
              <Crown className="mr-3 h-6 w-6" />
              Meet Your Champions
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}