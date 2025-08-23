'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Scale, 
  Shield, 
  Gavel, 
  Crown,
  Star,
  ArrowRight,
  PlayCircle,
  CheckCircle,
  Phone,
  Calendar,
  DollarSign,
  Award,
  Trophy,
  Target,
  Users,
  Heart,
  Zap,
  Building,
  Car,
  Briefcase,
  Eye,
  TrendingUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Mail,
  Clock,
  Sparkles,
  Brain,
  MessageCircle,
  Send,
  Loader
} from 'lucide-react'
import { consultationHandler } from '@/lib/consultation-handler'

export default function HomePage() {
  const [currentHeroImage, setCurrentHeroImage] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [currentVictoryIndex, setCurrentVictoryIndex] = useState(0)
  
  // Consultation form state
  const [consultationForm, setConsultationForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmittingConsultation, setIsSubmittingConsultation] = useState(false)
  const [consultationSubmitted, setConsultationSubmitted] = useState(false)
  const [consultationResult, setConsultationResult] = useState(null)

  const heroImages = [
    '/images/scraped/hero-2.jpg', 
    '/images/scraped/hero-3.jpg'
  ]

  const majorVictories = [
    {
      amount: '$4.9 BILLION',
      title: 'Product Liability Victory',
      subtitle: 'Largest Personal Injury Verdict in U.S. History',
      description: 'Carl E. Douglas secured this record-breaking verdict against General Motors, changing automotive safety forever.',
      image: '/images/scraped/practice-1.jpg',
      attorney: 'Carl E. Douglas',
      year: 'Career Defining',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      amount: '$8.0 MILLION',
      title: 'Police Brutality Justice',
      subtitle: 'Accountability for Law Enforcement',
      description: 'Historic verdict against Los Angeles County that set new precedents for police accountability.',
      image: '/images/scraped/practice-2.jpg',
      attorney: 'Douglas Hicks Team',
      year: '2025',
      color: 'from-red-400 to-pink-500'
    },
    {
      amount: '$5.0 MILLION',
      title: 'Wrongful Death Settlement',
      subtitle: 'Justice for Family',
      description: 'Secured financial future for three children after preventable medical malpractice death.',
      image: '/images/scraped/practice-3.jpg',
      attorney: 'Jamon R. Hicks',
      year: '2023',
      color: 'from-purple-400 to-blue-500'
    },
    {
      amount: '$1.576 MILLION',
      title: 'Disability Rights Victory',
      subtitle: 'Fighting Discrimination',
      description: 'Federal court verdict that forced nationwide policy changes for disabled tenants.',
      image: '/images/scraped/practice-4.jpg',
      attorney: "A'ja Simplis",
      year: '2025',
      color: 'from-green-400 to-emerald-500'
    }
  ]

  const testimonials = [
    {
      quote: "Carl Douglas didn't just win our case - he changed the entire automotive industry. The $4.9 billion verdict means accountability and protection for every family.",
      client: "Patricia Anderson Family",
      case: "$4.9B GM Verdict",
      image: "/images/scraped/practice-1.jpg"
    },
    {
      quote: "This verdict honors our son's memory and ensures his death wasn't in vain. The Douglas Hicks team fought when no one else would.",
      client: "Johnson Family",
      case: "$8M Police Brutality Victory",
      image: "/images/scraped/practice-2.jpg"
    },
    {
      quote: "Jamon Hicks secured our children's futures and forced the hospital to change so no other family goes through this.",
      client: "Martinez Family", 
      case: "$5M Wrongful Death",
      image: "/images/scraped/practice-3.jpg"
    }
  ]

  const practiceAreas = [
    {
      title: 'Civil Rights',
      subtitle: 'Police brutality, discrimination, constitutional violations',
      icon: Shield,
      image: '/images/scraped/practice-2.jpg',
      results: '$8M+ Recent Victories',
      expertise: 'Dream Team Experience',
      color: 'from-red-600 to-orange-600'
    },
    {
      title: 'Personal Injury',
      subtitle: 'Auto accidents, medical malpractice, product liability',
      icon: Car,
      image: '/images/scraped/practice-1.jpg',
      results: '$4.9B Record Verdict',
      expertise: 'Maximum Recovery',
      color: 'from-blue-600 to-purple-600'
    },
    {
      title: 'Wrongful Death',
      subtitle: 'Medical malpractice, negligence, family advocacy',
      icon: Heart,
      image: '/images/scraped/practice-3.jpg',
      results: '$5M+ Settlements',
      expertise: 'Compassionate Representation',
      color: 'from-purple-600 to-pink-600'
    },
    {
      title: 'Criminal Defense',
      subtitle: 'High-profile cases, serious felonies, appeals',
      icon: Gavel,
      image: '/images/scraped/practice-4.jpg',
      results: 'Not Guilty Verdicts',
      expertise: 'O.J. Simpson Dream Team',
      color: 'from-gray-600 to-gray-800'
    }
  ]

  // Handle consultation form submission
  const handleConsultationSubmit = async (e) => {
    e.preventDefault()
    setIsSubmittingConsultation(true)
    
    try {
      const result = await consultationHandler.submitConsultationRequest(consultationForm)
      setConsultationResult(result)
      setConsultationSubmitted(true)
      
      // Reset form
      setConsultationForm({
        name: '',
        email: '',
        phone: '',
        message: ''
      })
    } catch (error) {
      console.error('Consultation submission failed:', error)
      // Show error message or fallback
      alert('There was an issue submitting your consultation request. Please call us directly at (323) 337-3636.')
    } finally {
      setIsSubmittingConsultation(false)
    }
  }

  const updateConsultationForm = (field, value) => {
    setConsultationForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  useEffect(() => {
    setIsVisible(true)
    const heroInterval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 8000)

    return () => {
      clearInterval(heroInterval)
      clearInterval(testimonialInterval)
    }
  }, [])

  const nextVictory = () => {
    setCurrentVictoryIndex((prev) => (prev + 1) % majorVictories.length)
  }

  const prevVictory = () => {
    setCurrentVictoryIndex((prev) => (prev - 1 + majorVictories.length) % majorVictories.length)
  }

  const currentVictory = majorVictories[currentVictoryIndex]

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
              <Link href="/team" className="text-gray-300 hover:text-white transition-colors">
                Our Team
              </Link>
              <Link href="/case-studies" className="text-gray-300 hover:text-white transition-colors">
                Case Studies
              </Link>
              <Link href="/results" className="text-gray-300 hover:text-white transition-colors">
                Results
              </Link>
              <Link href="/testimonials" className="text-gray-300 hover:text-white transition-colors">
                Testimonials
              </Link>
              <Link href="/media" className="text-gray-300 hover:text-white transition-colors">
                Media
              </Link>
              <Link href="/resources" className="text-gray-300 hover:text-white transition-colors">
                Resources
              </Link>
              <Link href="#contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
              <Link 
                href="/portal"
                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:scale-105 transition-all font-semibold"
              >
                Sign In
              </Link>
              <Link 
                href="/intake"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:scale-105 transition-all font-semibold"
              >
                Free Case Review
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Dynamic Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Image Backgrounds - Professional Lawyer Photos */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-5000 ${
                index === currentHeroImage ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image}
                alt={`Professional attorney ${index + 1}`}
                fill
                className={`object-cover ${index === 0 ? 'brightness-125 contrast-110' : ''}`}
                priority={index === 0}
              />
              <div className={`absolute inset-0 ${
                index === 0 
                  ? 'bg-gradient-to-r from-black/70 via-black/50 to-black/70' 
                  : 'bg-gradient-to-r from-black/80 via-black/60 to-black/80'
              }`}></div>
              <div className={`absolute inset-0 ${
                index === 0
                  ? 'bg-gradient-to-t from-black/60 via-transparent to-black/40'
                  : 'bg-gradient-to-t from-black/70 via-transparent to-black/50'
              }`}></div>
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className={`relative z-40 text-center max-w-6xl mx-auto px-4 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="inline-flex items-center gap-3 mb-8">
            <Crown className="w-8 h-8 text-yellow-400" />
            <span className="text-yellow-400 font-bold text-lg">DREAM TEAM LEGEND</span>
            <Crown className="w-8 h-8 text-yellow-400" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="text-white">BILLION</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
              DOLLAR
            </span>
            <br />
            <span className="text-white">LAWYERS</span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-300 mb-12 font-light leading-relaxed">
            From O.J. Simpson&apos;s Dream Team to $4.9B verdicts,<br />
            we deliver legendary legal representation.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link 
              href="/intake"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-xl hover:scale-105 transition-all transform shadow-2xl"
            >
              <Zap className="mr-3 h-6 w-6" />
              FREE AI Case Analysis
            </Link>
            <Link 
              href="/portal"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:scale-105 transition-all transform shadow-2xl"
            >
              <Shield className="mr-3 h-6 w-6" />
              Sign In
            </Link>
            <button className="inline-flex items-center px-12 py-6 text-xl font-black text-white bg-transparent border-4 border-white rounded-xl hover:bg-white hover:text-black transition-all transform hover:scale-105">
              <PlayCircle className="mr-3 h-6 w-6" />
              Watch Our Story
            </button>
          </div>

          {/* Hero Stats */}
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-black text-yellow-400 mb-2">$4.9B</div>
              <p className="text-gray-400">Record Verdict</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-green-400 mb-2">30+</div>
              <p className="text-gray-400">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-blue-400 mb-2">1,100+</div>
              <p className="text-gray-400">Cases Won</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-purple-400 mb-2">98%</div>
              <p className="text-gray-400">Client Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </section>

      {/* Major Victory Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              LEGENDARY VICTORIES
            </h2>
            <p className="text-xl text-gray-400">
              Record-breaking verdicts that changed legal history
            </p>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Victory Visual */}
                <div className="relative h-96 lg:h-auto">
                  <div className={`w-full h-full bg-gradient-to-br ${currentVictory.color} flex items-center justify-center`}>
                    <div className="text-center p-8">
                      <div className="text-8xl font-black text-white/20 mb-4">
                        {currentVictory.amount.includes('4.9B') ? '$4.9B' :
                         currentVictory.amount.includes('8.0') ? '$8M' :
                         currentVictory.amount.includes('5.0') ? '$5M' :
                         '$1.576M'}
                      </div>
                      <div className="text-white font-bold text-xl opacity-80">
                        {currentVictory.year}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Victory Details */}
                <div className="p-12 flex flex-col justify-center">
                  <div className={`text-6xl font-black bg-gradient-to-r ${currentVictory.color} bg-clip-text text-transparent mb-4`}>
                    {currentVictory.amount}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">{currentVictory.title}</h3>
                  <p className="text-blue-400 font-semibold text-lg mb-4">{currentVictory.subtitle}</p>
                  <p className="text-gray-300 mb-6 leading-relaxed">{currentVictory.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-sm text-gray-400">Lead Attorney</div>
                      <div className="text-white font-semibold">{currentVictory.attorney}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Year</div>
                      <div className="text-white font-semibold">{currentVictory.year}</div>
                    </div>
                  </div>

                  <Link 
                    href="/case-studies"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Read Full Case Study
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={prevVictory}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextVictory}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Victory Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {majorVictories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentVictoryIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentVictoryIndex ? 'bg-blue-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              LEGAL EXPERTISE
            </h2>
            <p className="text-xl text-gray-400">
              Elite representation across all major practice areas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {practiceAreas.map((area, index) => {
              const Icon = area.icon
              return (
                <div key={index} className="group cursor-pointer">
                  <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-500 transform hover:scale-[1.02]">
                    {/* Clean Gradient Background */}
                    <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${area.color}`}></div>

                    <div className="relative p-8">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${area.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-2">{area.title}</h3>
                      <p className="text-gray-400 mb-4">{area.subtitle}</p>
                      
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <div className="text-green-400 font-semibold text-sm">{area.results}</div>
                          <div className="text-blue-400 text-xs">{area.expertise}</div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Dream Team Legacy */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <Crown className="w-8 h-8 text-yellow-400" />
                <span className="text-yellow-400 font-bold text-lg">DREAM TEAM LEGACY</span>
              </div>
              
              <h2 className="text-5xl font-black text-white mb-6">
                FROM THE TRIAL OF THE CENTURY
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Carl E. Douglas, founding partner and Dream Team coordinator, brings legendary experience from the most watched criminal trial in American history to every case we handle.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300">O.J. Simpson Defense Team Coordinator</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300">Former Cochran Firm Managing Attorney</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300">Celebrity Defense Attorney</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300">$4.9B Record Verdict Winner</span>
                </div>
              </div>

              <Link 
                href="/team"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:scale-105 transition-all"
              >
                <Users className="w-5 h-5 mr-2" />
                Meet the Dream Team
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-br from-yellow-600 to-orange-600 flex items-center justify-center">
                  <div className="text-center">
                    <Crown className="w-16 h-16 text-white/80 mx-auto mb-4" />
                    <div className="text-white font-bold text-lg">Dream Team</div>
                    <div className="text-white/80 text-sm">O.J. Simpson Trial</div>
                  </div>
                </div>
                <div className="relative h-32 rounded-xl overflow-hidden bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                  <div className="text-center">
                    <DollarSign className="w-12 h-12 text-white/80 mx-auto mb-2" />
                    <div className="text-white font-bold">$4.9B Record</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="relative h-32 rounded-xl overflow-hidden bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center">
                  <div className="text-center">
                    <Shield className="w-12 h-12 text-white/80 mx-auto mb-2" />
                    <div className="text-white font-bold">Civil Rights</div>
                  </div>
                </div>
                <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <div className="text-center">
                    <Users className="w-16 h-16 text-white/80 mx-auto mb-4" />
                    <div className="text-white font-bold text-lg">Expert Team</div>
                    <div className="text-white/80 text-sm">30+ Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              CLIENT VICTORIES
            </h2>
            <p className="text-xl text-gray-400">
              Real stories from real families whose lives we&apos;ve changed
            </p>
          </div>

          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`transition-all duration-1000 ${
                  index === currentTestimonial ? 'opacity-100 translate-x-0' : 'opacity-0 absolute inset-0 translate-x-8'
                }`}
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-12 border border-gray-700">
                  <div className="grid lg:grid-cols-3 gap-8 items-center">
                    <div className="lg:col-span-2">
                      <div className="text-4xl text-blue-400 mb-6">&ldquo;</div>
                      <blockquote className="text-2xl text-white italic mb-8 leading-relaxed">
                        {testimonial.quote}
                      </blockquote>
                      <div>
                        <div className="text-lg font-bold text-white">{testimonial.client}</div>
                        <div className="text-blue-400 font-semibold">{testimonial.case}</div>
                      </div>
                    </div>
                    <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                      <div className="text-center">
                        <Trophy className="w-20 h-20 text-white/80 mx-auto mb-4" />
                        <div className="text-white font-bold text-xl">{testimonial.case.split(' ')[0]}</div>
                        <div className="text-white/80 text-sm">Victory</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Testimonial Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-blue-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-8">
            <Brain className="w-8 h-8 text-blue-400" />
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <Gavel className="w-8 h-8 text-blue-400" />
          </div>
          
          <h2 className="text-5xl font-black text-white mb-8">
            GET INSTANT CASE ANALYSIS
          </h2>
          <p className="text-2xl text-white/90 mb-12 leading-relaxed">
            Our AI-powered system will analyze your case, match you with the right attorney, and provide an estimated case value - all in minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/intake"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-xl hover:scale-105 transition-all transform shadow-2xl"
            >
              <Brain className="mr-3 h-6 w-6" />
              Start AI Case Analysis
            </Link>
            <button className="inline-flex items-center px-12 py-6 text-xl font-black text-white bg-transparent border-4 border-white rounded-xl hover:bg-white hover:text-blue-900 transition-all transform hover:scale-105">
              <MessageCircle className="mr-3 h-6 w-6" />
              Chat with Maya AI
            </button>
          </div>

          <div className="flex items-center justify-center gap-8 mt-12 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>100% Confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>No Obligation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Free Analysis</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              READY TO WIN?
            </h2>
            <p className="text-xl text-gray-400">
              Contact the billion-dollar legal team today
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">24/7 Emergency Line</h3>
                    <p className="text-2xl font-black text-blue-400">(213) 995-3991</p>
                    <p className="text-gray-400">Immediate response for urgent legal matters</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Los Angeles Office</h3>
                    <p className="text-gray-400">
                      5120 W. Goldleaf Circle, Suite 140<br />
                      Los Angeles, CA 90056
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
                    <p className="text-blue-400 font-semibold">info@douglashickslaw.com</p>
                    <p className="text-gray-400">We respond within hours</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">Free Case Evaluation</h3>
              
              {consultationSubmitted ? (
                <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-xl p-6 border border-green-500">
                  <div className="text-center">
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h4 className="text-2xl font-bold text-white mb-2">Consultation Request Submitted!</h4>
                    <p className="text-green-400 font-semibold mb-4">
                      {consultationResult?.consultation_id && `Consultation ID: ${consultationResult.consultation_id}`}
                    </p>
                    <p className="text-gray-300 mb-4">
                      Your case has been assigned to: <span className="text-white font-bold">{consultationResult?.recommended_attorney}</span>
                    </p>
                    <p className="text-gray-400 text-sm mb-4">
                      Expected response: {consultationResult?.response_timeframe}
                    </p>
                    <button 
                      onClick={() => setConsultationSubmitted(false)}
                      className="text-blue-400 hover:text-blue-300 font-semibold"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleConsultationSubmit} className="space-y-6">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Your Name *" 
                      value={consultationForm.name}
                      onChange={(e) => updateConsultationForm('name', e.target.value)}
                      required
                      className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Your Email *" 
                      value={consultationForm.email}
                      onChange={(e) => updateConsultationForm('email', e.target.value)}
                      required
                      className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <input 
                      type="tel" 
                      placeholder="Your Phone *" 
                      value={consultationForm.phone}
                      onChange={(e) => updateConsultationForm('phone', e.target.value)}
                      required
                      className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <textarea 
                      placeholder="Tell us about your case... *" 
                      rows={4}
                      value={consultationForm.message}
                      onChange={(e) => updateConsultationForm('message', e.target.value)}
                      required
                      className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmittingConsultation}
                    className={`w-full py-4 rounded-lg font-bold transition-all ${
                      isSubmittingConsultation 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105'
                    }`}
                  >
                    {isSubmittingConsultation ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader className="w-5 h-5 animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-5 h-5" />
                        Get Free Consultation
                      </span>
                    )}
                  </button>
                  <p className="text-gray-400 text-xs text-center">
                    * Required fields. All information is confidential and protected by attorney-client privilege.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Image
                  src="/images/scraped/logo-main.png"
                  alt="Douglass Hicks Law"
                  width={40}
                  height={40}
                  className="mr-3"
                />
                <span className="text-xl font-bold text-white">Douglass Hicks Law</span>
              </div>
              <p className="text-gray-400 mb-4">
                Billion-dollar legal representation from the O.J. Simpson Dream Team. Fighting for justice since 1990.
              </p>
              <div className="flex items-center gap-4">
                <div className="text-yellow-400 font-bold">$4.9B Record Verdict</div>
                <div className="text-blue-400 font-bold">Dream Team Legacy</div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Practice Areas</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/practice-areas/civil-rights" className="hover:text-white transition-colors">Civil Rights</Link></li>
                <li><Link href="/practice-areas/personal-injury" className="hover:text-white transition-colors">Personal Injury</Link></li>
                <li><Link href="/practice-areas/criminal-defense" className="hover:text-white transition-colors">Criminal Defense</Link></li>
                <li><Link href="/practice-areas/wrongful-death" className="hover:text-white transition-colors">Wrongful Death</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/team" className="hover:text-white transition-colors">Our Team</Link></li>
                <li><Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
                <li><Link href="/testimonials" className="hover:text-white transition-colors">Testimonials</Link></li>
                <li><Link href="/intake" className="hover:text-white transition-colors">Free Case Review</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 Douglass Hicks Law. All rights reserved. | Dream Team Legacy | $4.9B Record Verdict
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}