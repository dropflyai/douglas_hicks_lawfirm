'use client'

import React, { useState, useEffect } from 'react'
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
  MessageCircle
} from 'lucide-react'

export default function HomePage() {
  const [currentHeroImage, setCurrentHeroImage] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [currentVictoryIndex, setCurrentVictoryIndex] = useState(0)

  const heroImages = [
    '/images/scraped/hero-2.jpg', 
    '/images/scraped/hero-3.jpg'
  ]

  const victories = [
    {
      case: "$4.9 BILLION GM VERDICT",
      description: "Historic ignition switch case - Largest personal injury verdict in Los Angeles history",
      icon: Car,
      color: "from-emerald-500 to-green-600"
    },
    {
      case: "$8.1 MILLION SHERIFF SETTLEMENT", 
      description: "Police brutality case - Record settlement for excessive force",
      icon: Shield,
      color: "from-blue-500 to-cyan-600"
    },
    {
      case: "$5.2 MILLION MEDICAL MALPRACTICE",
      description: "Surgical negligence - Maximum compensation for permanent disability", 
      icon: Heart,
      color: "from-red-500 to-pink-600"
    }
  ]

  const testimonials = [
    {
      name: "Maria Rodriguez",
      case: "GM Ignition Switch Case",
      quote: "Douglass Hicks fought GM's army of lawyers and won us $4.9 billion. Justice served.",
      amount: "$4.9B Settlement",
      image: "/images/attorneys/douglass-hicks.jpg"
    },
    {
      name: "Robert Johnson", 
      case: "Police Brutality Settlement",
      quote: "They never gave up on my case. $8.1 million won't bring back what I lost, but it's justice.",
      amount: "$8.1M Recovery",
      image: "/images/attorneys/carl-douglas.jpg"
    },
    {
      name: "Jennifer Chen",
      case: "Medical Malpractice Victory",
      quote: "The hospital said it wasn't their fault. Douglass Hicks proved them wrong - $5.2 million.",
      amount: "$5.2M Verdict",
      image: "/images/attorneys/jamon-hicks.jpg"
    }
  ]

  const practiceAreas = [
    {
      icon: Car,
      title: 'Personal Injury',
      description: 'Record-breaking settlements for auto accidents, medical malpractice, and product liability',
      cases: '$4.9B+ Recovered',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      icon: Shield,
      title: 'Civil Rights',
      description: 'Fighting police brutality, discrimination, and constitutional violations',
      cases: '$8M+ Settlements',
      color: 'from-green-600 to-emerald-600'
    },
    {
      icon: Gavel,
      title: 'Criminal Defense',
      description: 'High-stakes criminal defense with a track record of acquittals',
      cases: '200+ Cases Won',
      color: 'from-purple-600 to-violet-600'
    },
    {
      icon: Briefcase,
      title: 'Employment Law',
      description: 'Workplace discrimination, wrongful termination, and harassment cases',
      cases: '150+ Victories',
      color: 'from-amber-600 to-orange-600'
    }
  ]

  const stats = [
    { value: '$4.9B+', label: 'Recovered for Clients', icon: DollarSign },
    { value: '500+', label: 'Cases Won', icon: Trophy },
    { value: '30+', label: 'Years Experience', icon: Award },
    { value: '98%', label: 'Success Rate', icon: Target }
  ]

  useEffect(() => {
    setIsVisible(true)
    
    const heroTimer = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 8000)

    const victoryTimer = setInterval(() => {
      setCurrentVictoryIndex((prev) => (prev + 1) % victories.length)
    }, 6000)

    return () => {
      clearInterval(heroTimer)
      clearInterval(testimonialTimer) 
      clearInterval(victoryTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Navigation */}
      <nav className="relative bg-slate-900/95 backdrop-blur-xl border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Scale className="w-8 h-8 text-amber-500 mr-3" />
              <span className="text-2xl font-bold text-white">
                Douglass Hicks Law
              </span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/about" className="text-slate-300 hover:text-white transition-colors">About</Link>
              <Link href="/practice-areas" className="text-slate-300 hover:text-white transition-colors">Practice Areas</Link>
              <Link href="/results" className="text-slate-300 hover:text-white transition-colors">Results</Link>
              <Link href="/team" className="text-slate-300 hover:text-white transition-colors">Team</Link>
              <Link href="/testimonials" className="text-slate-300 hover:text-white transition-colors">Testimonials</Link>
              <Link href="/portal" className="text-slate-300 hover:text-white transition-colors">Portal</Link>
              <Link 
                href="tel:+1-555-LAW-FIRM"
                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:scale-105 transition-all font-semibold"
              >
                Call Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Images with Crossfade */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div 
              key={image}
              className={`absolute inset-0 transition-opacity duration-2000 ${
                index === currentHeroImage ? 'opacity-30' : 'opacity-0'
              }`}
            >
              <Image
                src={image}
                alt="Legal victory"
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-blue-900/80 to-slate-900/90"></div>
        </div>

        {/* Floating Victory Cards */}
        <div className="absolute top-20 left-10 hidden lg:block">
          <div className={`bg-gradient-to-r ${victories[currentVictoryIndex].color} p-4 rounded-xl shadow-2xl transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex items-center gap-3 text-white">
              {React.createElement(victories[currentVictoryIndex].icon, { className: "w-8 h-8" })}
              <div>
                <div className="font-black text-lg">{victories[currentVictoryIndex].case}</div>
                <div className="text-sm opacity-90">{victories[currentVictoryIndex].description}</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Integration Badge */}
        <div className="absolute top-20 right-10 hidden lg:block">
          <div className={`bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-xl shadow-2xl transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex items-center gap-3 text-white">
              <Brain className="w-8 h-8" />
              <div>
                <div className="font-black text-lg">AI-POWERED</div>
                <div className="text-sm opacity-90">Legal Analysis & Research</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`relative z-10 text-center max-w-6xl mx-auto px-4 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="inline-flex items-center gap-3 mb-8">
            <Crown className="w-8 h-8 text-amber-400" />
            <span className="text-amber-400 font-bold text-lg">$4.9 BILLION RECOVERED • 30+ YEARS</span>
            <Crown className="w-8 h-8 text-amber-400" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="text-white">🚨 TEST DEPLOYMENT</span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              ENTERPRISE SYSTEM ACTIVE
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-slate-300 mb-12 font-light leading-relaxed">
            Record-breaking verdicts. Unmatched experience. AI-powered legal research.<br />
            We don't just win cases—we make history.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className={`text-center transform transition-all duration-700 delay-${index * 200} ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                <stat.icon className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                <p className="text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="tel:+1-555-LAW-FIRM"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-white bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-xl hover:scale-105 transition-all transform shadow-2xl"
            >
              <Phone className="mr-3 h-6 w-6" />
              FREE Consultation
            </Link>
            <Link 
              href="/portal"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-white bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-xl hover:scale-105 transition-all transform shadow-2xl"
            >
              <Users className="mr-3 h-6 w-6" />
              Client Portal
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-8 mt-12 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>No Fee Unless We Win</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>24/7 Available</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Free Case Review</span>
            </div>
          </div>
        </div>
      </section>

      {/* Record Verdicts Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              RECORD-BREAKING VICTORIES
            </h2>
            <p className="text-xl text-slate-400">
              When billion-dollar corporations think they're untouchable, we prove them wrong
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {victories.map((victory, index) => (
              <div key={index} className={`bg-gradient-to-br ${victory.color} rounded-2xl p-8 text-center transform hover:scale-105 transition-all`}>
                <victory.icon className="w-16 h-16 text-white mx-auto mb-6" />
                <h3 className="text-2xl font-black text-white mb-4">{victory.case}</h3>
                <p className="text-white/90 leading-relaxed">{victory.description}</p>
                <Link 
                  href="/results"
                  className="inline-flex items-center mt-6 text-white font-bold hover:text-yellow-300 transition-colors"
                >
                  Read Case Details
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/results"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-lg hover:scale-105 transition-all"
            >
              <Trophy className="mr-2 h-5 w-5" />
              View All Victories
            </Link>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              PRACTICE AREAS
            </h2>
            <p className="text-xl text-slate-400">
              Comprehensive legal services with a proven track record of success
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {practiceAreas.map((area, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 border border-slate-600 hover:border-amber-500 transition-all hover:scale-105 group">
                <div className={`w-16 h-16 bg-gradient-to-r ${area.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <area.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{area.title}</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">{area.description}</p>
                <div className="text-amber-400 font-bold mb-4">{area.cases}</div>
                <Link 
                  href="/practice-areas"
                  className="inline-flex items-center text-orange-400 hover:text-orange-300 font-semibold"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              CLIENT TESTIMONIALS
            </h2>
            <p className="text-xl text-slate-400">
              Hear from clients whose lives we've transformed through justice
            </p>
          </div>

          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`transition-all duration-1000 ${
                  index === currentTestimonial ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-full absolute inset-0'
                }`}
              >
                <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 border border-slate-600">
                  <div className="flex items-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-2xl text-white font-light leading-relaxed mb-8">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-xl">{testimonial.name}</div>
                      <div className="text-slate-400">{testimonial.case}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-green-400">{testimonial.amount}</div>
                      <div className="text-slate-400 text-sm">Settlement/Verdict</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation dots */}
            <div className="flex justify-center mt-8 gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-amber-400 scale-125' : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Integration Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900 via-blue-900 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-3 mb-8">
                <Brain className="w-8 h-8 text-purple-400" />
                <span className="text-purple-400 font-bold text-lg">AI-POWERED LEGAL TECHNOLOGY</span>
              </div>
              
              <h2 className="text-5xl font-black text-white mb-8">
                THE FUTURE OF LAW IS HERE
              </h2>
              
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Our proprietary AI system analyzes millions of legal precedents in seconds, 
                giving us an unprecedented advantage in building winning cases.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-black text-purple-400 mb-2">2.4s</div>
                  <p className="text-slate-400">Average AI Response Time</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-blue-400 mb-2">98.7%</div>
                  <p className="text-slate-400">Legal Analysis Accuracy</p>
                </div>
              </div>
              
              <Link 
                href="/portal"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:scale-105 transition-all"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Try AI Legal Assistant
              </Link>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-600">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-slate-400 text-sm ml-4">AI Legal Research Terminal</span>
                </div>
                
                <div className="space-y-4 text-sm">
                  <div className="text-green-400">$ analyze-precedent --case="product-liability" --jurisdiction="california"</div>
                  <div className="text-slate-300">Analyzing 47,392 similar cases...</div>
                  <div className="text-slate-300">Found 23 winning precedents with $4.9B+ recoveries</div>
                  <div className="text-blue-400">Strongest argument: Manufacturing defect pattern (87% win rate)</div>
                  <div className="text-purple-400">Recommended strategy: Class action with individual settlements</div>
                  <div className="text-amber-400">Estimated case value: $2.1B - $4.9B</div>
                  <div className="text-green-400">$ </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-900 via-orange-900 to-red-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-8">
            <Scale className="w-8 h-8 text-amber-400" />
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <Gavel className="w-8 h-8 text-amber-400" />
          </div>
          
          <h2 className="text-5xl font-black text-white mb-8">
            READY TO MAKE HISTORY?
          </h2>
          <p className="text-2xl text-white/90 mb-12 leading-relaxed">
            Don't let corporations get away with it. Join the hundreds of clients who've won life-changing settlements. 
            Your fight for justice starts with one phone call.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link 
              href="tel:+1-555-LAW-FIRM"
              className="inline-flex items-center px-16 py-8 text-3xl font-black text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl hover:scale-105 transition-all transform shadow-2xl"
            >
              <Phone className="mr-4 h-8 w-8" />
              CALL NOW: (555) LAW-FIRM
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <Phone className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <div className="font-bold text-white text-lg">(555) LAW-FIRM</div>
              <div className="text-white/80">24/7 Emergency Line</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <Calendar className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <div className="font-bold text-white text-lg">Free Consultation</div>
              <div className="text-white/80">No obligation case review</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <DollarSign className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <div className="font-bold text-white text-lg">No Fee Unless We Win</div>
              <div className="text-white/80">You pay nothing upfront</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Scale className="w-8 h-8 text-amber-500 mr-3" />
                <span className="text-2xl font-bold text-white">Douglass Hicks Law</span>
              </div>
              <p className="text-slate-400 mb-4">
                Record-breaking verdicts. Unmatched experience. We don't just win cases—we make history.
              </p>
              <div className="flex items-center gap-4">
                <div className="text-amber-400 font-bold">$4.9B+ Recovered</div>
                <div className="text-green-400 font-bold">500+ Cases Won</div>
                <div className="text-blue-400 font-bold">AI-Powered</div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Practice Areas</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/practice-areas" className="hover:text-white transition-colors">Personal Injury</Link></li>
                <li><Link href="/practice-areas" className="hover:text-white transition-colors">Civil Rights</Link></li>
                <li><Link href="/practice-areas" className="hover:text-white transition-colors">Criminal Defense</Link></li>
                <li><Link href="/practice-areas" className="hover:text-white transition-colors">Employment Law</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/results" className="hover:text-white transition-colors">Case Results</Link></li>
                <li><Link href="/team" className="hover:text-white transition-colors">Legal Team</Link></li>
                <li><Link href="/testimonials" className="hover:text-white transition-colors">Testimonials</Link></li>
                <li><Link href="/portal" className="hover:text-white transition-colors">Client Portal</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center">
            <p className="text-slate-500 text-sm">
              © 2024 Douglass Hicks Law Firm. All rights reserved. | Fighting for Justice Since 1995
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}