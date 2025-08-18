'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Scale, 
  ArrowLeft,
  CheckCircle,
  DollarSign,
  Gavel,
  Award,
  TrendingUp,
  Star,
  Crown,
  Target,
  Zap,
  ShieldCheck,
  Users,
  Calendar,
  BookOpen,
  Building,
  Briefcase
} from 'lucide-react'

export default function ResultsPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const heroGradients = [
    'from-yellow-900 via-orange-900 to-red-900',
    'from-blue-900 via-purple-900 to-gray-900',
    'from-green-900 via-blue-900 to-purple-900',
    'from-red-900 via-orange-900 to-yellow-900',
    'from-purple-900 via-blue-900 to-gray-900'
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroGradients.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const majorVictories = [
    {
      amount: "$4.9 BILLION",
      case: "Historic General Motors Verdict",
      description: "Record-breaking product liability verdict that changed automotive safety standards forever",
      attorney: "Carl E. Douglas",
      year: "Career Defining",
      impact: "Largest verdict in automotive history",
      category: "Product Liability"
    },
    {
      amount: "$8.0 MILLION", 
      case: "Police Brutality Justice",
      description: "Landmark verdict against Los Angeles County for family of man killed by sheriff deputies",
      attorney: "Douglas Hicks Legal Team",
      year: "2024",
      impact: "Set new precedent for police accountability",
      category: "Civil Rights"
    },
    {
      amount: "$5.0 MILLION",
      case: "Wrongful Death Victory",
      description: "Major settlement securing justice and financial security for grieving family",
      attorney: "Jamon R. Hicks",
      year: "2023", 
      impact: "Life-changing compensation for survivors",
      category: "Wrongful Death"
    }
  ]

  const recentWins = [
    { amount: "$1.576M", case: "Disability Discrimination", company: "Greystar Management", type: "Civil Rights" },
    { amount: "$733K", case: "Employment Discrimination", company: "El Monte Union High School", type: "Employment" },
    { amount: "$425K", case: "Personal Injury Settlement", company: "Major Corporation", type: "Personal Injury" },
    { amount: "$312K", case: "Civil Rights Violation", company: "Government Entity", type: "Civil Rights" },
    { amount: "$185K", case: "Workplace Discrimination", company: "Private Company", type: "Employment" },
    { amount: "$157K", case: "Premises Liability", company: "Retail Chain", type: "Personal Injury" }
  ]

  const criminalVictories = [
    { verdict: "NOT GUILTY", case: "Murder for Hire", impact: "Celebrity esthetician - complete acquittal", severity: "Life Sentence Avoided" },
    { verdict: "NOT GUILTY", case: "Felony Assault w/ Deadly Weapon", impact: "Young professional - career saved", severity: "25 Years Avoided" },
    { verdict: "NOT GUILTY", case: "Felony Grand Theft", impact: "College student - future protected", severity: "15 Years Avoided" },
    { verdict: "NOT GUILTY", case: "Drug Trafficking", impact: "Father of three - family preserved", severity: "20 Years Avoided" },
    { verdict: "HUNG JURY", case: "DUI & Child Endangerment", impact: "Parental rights maintained", severity: "Prison Time Avoided" },
    { verdict: "NOT GUILTY", case: "Battery on Police Officer", impact: "Clean record maintained", severity: "Felony Conviction Avoided" }
  ]

  const practiceStats = [
    { area: "Civil Rights", cases: "150+", success: "95%", avg: "$2.3M", icon: Scale, color: "blue" },
    { area: "Personal Injury", cases: "300+", success: "92%", avg: "$850K", icon: ShieldCheck, color: "green" },
    { area: "Criminal Defense", cases: "200+", success: "88%", avg: "Acquittal", icon: Gavel, color: "purple" },
    { area: "Employment Law", cases: "100+", success: "90%", avg: "$500K", icon: Briefcase, color: "orange" }
  ]

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Cinematic Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Gradient Background */}
        <div className="absolute inset-0">
          {heroGradients.map((gradient, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-2000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className={`w-full h-full bg-gradient-to-br ${gradient}`}></div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
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
                <Link href="/#practice-areas" className="text-gray-300 hover:text-white transition-colors">
                  Practice Areas
                </Link>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
                <Link href="/results" className="text-white font-semibold border-b-2 border-gold-400">
                  Results
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

        {/* Hero Content */}
        <div className={`relative z-40 text-center max-w-6xl mx-auto px-4 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <Link 
            href="/"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 text-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="text-white">PROVEN</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
              VICTORIES
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-300 mb-12 font-light leading-relaxed">
            From the O.J. Simpson Dream Team to record-breaking verdicts,<br />
            we don&rsquo;t just practice law — we make history.
          </p>

          {/* Animated Stats */}
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="text-center transform hover:scale-105 transition-transform">
              <div className="text-5xl font-black text-yellow-400 mb-2">$4.9B+</div>
              <p className="text-gray-400 text-lg">Historic Verdicts</p>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform">
              <div className="text-5xl font-black text-green-400 mb-2">750+</div>
              <p className="text-gray-400 text-lg">Cases Won</p>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform">
              <div className="text-5xl font-black text-blue-400 mb-2">30+</div>
              <p className="text-gray-400 text-lg">Years Experience</p>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform">
              <div className="text-5xl font-black text-red-400 mb-2">95%</div>
              <p className="text-gray-400 text-lg">Success Rate</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/#contact"
              className="inline-flex items-center px-8 py-4 text-lg font-bold text-black bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:scale-105 shadow-2xl"
            >
              <Crown className="mr-2 h-5 w-5" />
              Get Championship Results
            </Link>
            <Link 
              href="#major-victories"
              className="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-transparent border-2 border-white rounded-lg hover:bg-white hover:text-black transition-all transform hover:scale-105"
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              See Our Victories
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Major Victories Showcase */}
      <section id="major-victories" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              LEGENDARY VICTORIES
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              These aren&rsquo;t just cases — they&rsquo;re legal landmarks that changed lives and set new standards for justice.
            </p>
          </div>

          <div className="space-y-12">
            {majorVictories.map((victory, index) => (
              <div key={index} className="group">
                <div className="grid lg:grid-cols-2 gap-8 items-center bg-gradient-to-r from-gray-900/80 to-black/80 rounded-3xl p-8 border border-gray-700 hover:border-yellow-500 transition-all duration-500 transform hover:scale-[1.02]">
                  <div className="order-2 lg:order-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full text-sm">
                        {victory.category}
                      </span>
                      <span className="text-gray-400">{victory.year}</span>
                    </div>
                    
                    <h3 className="text-6xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text mb-4">
                      {victory.amount}
                    </h3>
                    
                    <h4 className="text-2xl font-bold text-white mb-4">{victory.case}</h4>
                    
                    <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                      {victory.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Crown className="w-5 h-5 text-yellow-400" />
                        <span className="text-white font-semibold">Lead Attorney: {victory.attorney}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Target className="w-5 h-5 text-green-400" />
                        <span className="text-green-400 font-semibold">{victory.impact}</span>
                      </div>
                    </div>
                  </div>

                  <div className="order-1 lg:order-2">
                    <div className={`relative h-80 rounded-2xl overflow-hidden bg-gradient-to-br ${
                      index === 0 ? 'from-yellow-600 via-orange-600 to-red-600' :
                      index === 1 ? 'from-blue-600 via-purple-600 to-indigo-600' :
                      'from-green-600 via-teal-600 to-blue-600'
                    } group-hover:scale-105 transition-transform duration-500`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                            <Scale className="w-10 h-10 text-white" />
                          </div>
                          <p className="text-white font-bold text-lg opacity-80">Legal Victory</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Area Performance */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              DOMINATING EVERY FIELD
            </h2>
            <p className="text-xl text-gray-400">
              Unmatched expertise across all practice areas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {practiceStats.map((stat, index) => {
              const Icon = stat.icon
              const colorMap = {
                blue: 'from-blue-500 to-blue-700',
                green: 'from-green-500 to-green-700', 
                purple: 'from-purple-500 to-purple-700',
                orange: 'from-orange-500 to-orange-700'
              }
              
              return (
                <div key={index} className="group relative">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-gray-500 transition-all transform hover:scale-105 hover:-translate-y-2">
                    <div className={`w-16 h-16 bg-gradient-to-br ${colorMap[stat.color]} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-6 text-center">{stat.area}</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Cases Won:</span>
                        <span className="text-white font-bold text-lg">{stat.cases}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Success Rate:</span>
                        <span className="text-green-400 font-bold text-lg">{stat.success}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Avg Result:</span>
                        <span className="text-yellow-400 font-bold text-lg">{stat.avg}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Recent Victories Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              RECENT VICTORIES
            </h2>
            <p className="text-xl text-gray-400">
              Just a sample of our recent winning streak
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentWins.map((win, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-green-500 transition-all transform hover:scale-105">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-3xl font-black text-green-400">{win.amount}</span>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                    {win.type}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">{win.case}</h3>
                <p className="text-gray-400 text-sm">{win.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Criminal Defense Victories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              FREEDOM DEFENDED
            </h2>
            <p className="text-xl text-gray-400">
              Complete acquittals in the most serious criminal cases
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {criminalVictories.map((victory, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-green-400 transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400 group-hover:scale-110 transition-transform" />
                  <span className="text-2xl font-black text-green-400">{victory.verdict}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{victory.case}</h3>
                <p className="text-gray-400 mb-4">{victory.impact}</p>
                
                <div className="bg-red-900/30 border border-red-700 rounded-lg p-3">
                  <p className="text-red-400 text-sm font-semibold">
                    {victory.severity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-8">
            YOUR VICTORY STARTS HERE
          </h2>
          <p className="text-2xl text-white/90 mb-12 leading-relaxed">
            Don&rsquo;t settle for ordinary representation. Get the championship legal team that delivers historic results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/#contact"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-orange-600 bg-white rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
            >
              <Zap className="mr-3 h-6 w-6" />
              Get Your Free Championship Consultation
            </Link>
            <Link 
              href="/about"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-white bg-transparent border-4 border-white rounded-xl hover:bg-white hover:text-orange-600 transition-all transform hover:scale-105"
            >
              <Users className="mr-3 h-6 w-6" />
              Meet the Dream Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}