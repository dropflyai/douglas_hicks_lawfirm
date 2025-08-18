'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Scale, 
  ArrowLeft,
  Shield,
  Users,
  Star,
  CheckCircle,
  Crown,
  Target,
  Trophy,
  Briefcase,
  Gavel,
  Heart,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  TrendingUp,
  Award,
  Zap,
  Car,
  Building,
  UserX,
  Handshake,
  ArrowRight
} from 'lucide-react'

export default function PracticeAreasPage() {
  const [selectedArea, setSelectedArea] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const practiceAreas = [
    {
      id: 'civil-rights',
      icon: Scale,
      title: "Civil Rights",
      subtitle: "Constitutional Protection",
      description: "Fighting against discrimination, police brutality, and constitutional violations with the fierce advocacy you deserve.",
      image: "/images/scraped/practice-1.jpg",
      specialties: ["Police Brutality", "Employment Discrimination", "Housing Rights", "Disability Rights"],
      recentVictory: "$8.0M Police Brutality Verdict",
      successRate: "95%",
      cases: "150+",
      avgSettlement: "$2.3M",
      link: "/practice-areas/civil-rights",
      attorneys: ["Carl E. Douglas", "A'ja Simplis"],
      keyFeatures: [
        "Record-breaking settlements",
        "Constitutional law expertise", 
        "Class action litigation",
        "Police accountability"
      ],
      color: "from-blue-600 to-purple-600"
    },
    {
      id: 'personal-injury',
      icon: Shield,
      title: "Personal Injury",
      subtitle: "Maximum Compensation",
      description: "Securing life-changing compensation for victims of accidents, medical malpractice, and negligence.",
      image: "/images/scraped/practice-2.jpg",
      specialties: ["Auto Accidents", "Medical Malpractice", "Workplace Injuries", "Product Liability"],
      recentVictory: "$4.9B GM Product Liability",
      successRate: "92%", 
      cases: "300+",
      avgSettlement: "$850K",
      link: "/practice-areas/personal-injury",
      attorneys: ["Carl E. Douglas", "Jamon R. Hicks"],
      keyFeatures: [
        "Billion-dollar verdicts",
        "Medical malpractice specialists",
        "Product liability experts",
        "Catastrophic injury focus"
      ],
      color: "from-green-600 to-emerald-600"
    },
    {
      id: 'criminal-defense',
      icon: Gavel,
      title: "Criminal Defense",
      subtitle: "Dream Team Legacy",
      description: "Aggressive defense strategies from the legendary O.J. Simpson Dream Team attorneys.",
      image: "/images/scraped/practice-3.jpg",
      specialties: ["White Collar Crimes", "Drug Charges", "Violent Crimes", "Appeals"],
      recentVictory: "Murder for Hire Acquittal",
      successRate: "88%",
      cases: "200+",
      avgSettlement: "Acquittal",
      link: "/practice-areas/criminal-defense",
      attorneys: ["Carl E. Douglas"],
      keyFeatures: [
        "O.J. Simpson Dream Team",
        "High-profile defense",
        "Celebrity representation",
        "Complete acquittals"
      ],
      color: "from-red-600 to-orange-600"
    },
    {
      id: 'employment-law',
      icon: Briefcase,
      title: "Employment Law", 
      subtitle: "Workplace Justice",
      description: "Protecting workers from discrimination, harassment, and wrongful termination.",
      image: "/images/scraped/practice-4.jpg",
      specialties: ["Wrongful Termination", "Harassment", "Wage Disputes", "Discrimination"],
      recentVictory: "$733K Discrimination Verdict",
      successRate: "90%",
      cases: "100+", 
      avgSettlement: "$500K",
      link: "/practice-areas/employment-law",
      attorneys: ["A'ja Simplis", "Bianca Perez"],
      keyFeatures: [
        "Workplace discrimination",
        "Executive wrongful termination",
        "Sexual harassment cases",
        "Wage and hour disputes"
      ],
      color: "from-purple-600 to-pink-600"
    },
    {
      id: 'wrongful-death',
      icon: Heart,
      title: "Wrongful Death",
      subtitle: "Justice for Families",
      description: "Fighting for justice and compensation when negligence takes a life.",
      image: "/images/scraped/practice-5.jpg",
      specialties: ["Medical Malpractice Death", "Auto Accident Death", "Workplace Death", "Product Liability Death"],
      recentVictory: "$5.0M Wrongful Death",
      successRate: "93%",
      cases: "75+",
      avgSettlement: "$1.8M",
      link: "/practice-areas/wrongful-death",
      attorneys: ["Jamon R. Hicks", "Carl E. Douglas"],
      keyFeatures: [
        "Compassionate representation",
        "Maximum damages recovery",
        "Expert witness network",
        "Family support services"
      ],
      color: "from-indigo-600 to-blue-600"
    },
    {
      id: 'product-liability',
      icon: Target,
      title: "Product Liability",
      subtitle: "Corporate Accountability",
      description: "Holding manufacturers accountable for dangerous and defective products.",
      image: "/images/scraped/practice-6.jpg",
      specialties: ["Defective Products", "Automotive Defects", "Medical Devices", "Consumer Protection"],
      recentVictory: "$4.9B GM Verdict Historic",
      successRate: "94%",
      cases: "50+",
      avgSettlement: "$3.2M",
      link: "/practice-areas/product-liability",
      attorneys: ["Carl E. Douglas"],
      keyFeatures: [
        "Record-breaking verdicts",
        "Automotive safety experts",
        "Medical device litigation",
        "Class action capabilities"
      ],
      color: "from-yellow-600 to-orange-600"
    }
  ]

  const overallStats = [
    { label: "Total Cases Won", value: "875+", icon: Trophy },
    { label: "Combined Success Rate", value: "93%", icon: Target },
    { label: "Total Recovered", value: "$4.9B+", icon: DollarSign },
    { label: "Years of Experience", value: "30+", icon: Calendar }
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
              <Link href="/practice-areas" className="text-white font-semibold border-b-2 border-blue-400">
                Practice Areas
              </Link>
              <Link href="/team" className="text-gray-300 hover:text-white transition-colors">
                Our Team
              </Link>
              <Link href="/results" className="text-gray-300 hover:text-white transition-colors">
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

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/scraped/hero-1.jpg"
            alt="Practice Areas"
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
              <span className="text-white">PRACTICE</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-green-500 bg-clip-text text-transparent">
                AREAS
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              From billion-dollar verdicts to complete acquittals,<br />
              we deliver championship results across all practice areas.
            </p>

            {/* Overall Stats */}
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {overallStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center transform hover:scale-105 transition-transform">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
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

      {/* Practice Areas Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              AREAS OF EXPERTISE
            </h2>
            <p className="text-xl text-gray-400">
              Championship legal representation across all practice areas
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {practiceAreas.map((area, index) => {
              const Icon = area.icon
              return (
                <div 
                  key={area.id} 
                  className="group cursor-pointer"
                  onClick={() => setSelectedArea(area)}
                >
                  <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-yellow-500 transition-all duration-500 transform hover:scale-[1.02]">
                    {/* Background Image */}
                    <div className="absolute inset-0 opacity-30">
                      <Image
                        src={area.image}
                        alt={area.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
                    </div>

                    <div className="relative p-8">
                      <div className="flex items-start gap-6 mb-6">
                        <div className={`w-16 h-16 bg-gradient-to-br ${area.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-3xl font-black text-white mb-2">{area.title}</h3>
                          <p className="text-blue-400 font-semibold text-lg mb-4">{area.subtitle}</p>
                          <p className="text-gray-300 mb-6 leading-relaxed">{area.description}</p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">{area.successRate}</div>
                          <div className="text-xs text-gray-400">Success Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-400">{area.cases}</div>
                          <div className="text-xs text-gray-400">Cases Won</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-400">{area.avgSettlement}</div>
                          <div className="text-xs text-gray-400">Avg Result</div>
                        </div>
                      </div>

                      {/* Recent Victory */}
                      <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 rounded-lg p-4 mb-6">
                        <div className="text-sm text-green-400 font-semibold mb-1">Recent Victory:</div>
                        <div className="text-white font-bold">{area.recentVictory}</div>
                      </div>

                      {/* Specialties */}
                      <div className="mb-6">
                        <div className="text-sm text-gray-400 mb-2">Specialties:</div>
                        <div className="flex flex-wrap gap-2">
                          {area.specialties.slice(0, 3).map((specialty, idx) => (
                            <span key={idx} className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-xs">
                              {specialty}
                            </span>
                          ))}
                          {area.specialties.length > 3 && (
                            <span className="px-3 py-1 bg-gray-600/20 text-gray-400 rounded-full text-xs">
                              +{area.specialties.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex gap-3">
                        <Link 
                          href={area.link}
                          className={`flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r ${area.color} text-white font-semibold rounded-lg hover:scale-105 transition-all`}
                        >
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                        <button className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Practice Area Detail Modal */}
      {selectedArea && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="relative">
              {/* Background */}
              <div className="absolute inset-0 opacity-30">
                <Image
                  src={selectedArea.image}
                  alt={selectedArea.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70"></div>
              </div>

              <div className="relative p-8">
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedArea(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  ✕
                </button>

                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-20 h-20 bg-gradient-to-br ${selectedArea.color} rounded-xl flex items-center justify-center`}>
                      <selectedArea.icon className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h2 className="text-4xl font-black text-white">{selectedArea.title}</h2>
                      <p className="text-blue-400 font-bold text-xl">{selectedArea.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">{selectedArea.description}</p>
                </div>

                {/* Details Grid */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Key Features</h3>
                    <div className="space-y-3 mb-6">
                      {selectedArea.keyFeatures.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4">Lead Attorneys</h3>
                    <div className="space-y-2 mb-6">
                      {selectedArea.attorneys.map((attorney, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Crown className="w-4 h-4 text-yellow-400" />
                          <span className="text-gray-300">{attorney}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">All Specialties</h3>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {selectedArea.specialties.map((specialty, idx) => (
                        <div key={idx} className="px-3 py-2 bg-blue-600/20 text-blue-300 rounded-lg text-sm text-center">
                          {specialty}
                        </div>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4">Success Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-green-900/50 to-green-700/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-400">{selectedArea.successRate}</div>
                        <div className="text-green-300 text-sm">Success Rate</div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-900/50 to-blue-700/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-400">{selectedArea.avgSettlement}</div>
                        <div className="text-blue-300 text-sm">Average Result</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-8">
                  <Link 
                    href={selectedArea.link}
                    className={`flex-1 inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r ${selectedArea.color} text-white font-bold rounded-lg hover:scale-105 transition-all`}
                  >
                    Explore {selectedArea.title}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                  <Link 
                    href="/#contact"
                    className="flex-1 inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-all"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Free Consultation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 via-purple-900 to-green-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-8">
            CHAMPIONSHIP RESULTS ACROSS ALL AREAS
          </h2>
          <p className="text-2xl text-white/90 mb-12 leading-relaxed">
            From billion-dollar verdicts to complete acquittals, get the championship legal team that dominates every practice area.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/#contact"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-blue-900 bg-white rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
            >
              <Phone className="mr-3 h-6 w-6" />
              Get Your Free Consultation
            </Link>
            <Link 
              href="/results"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-white bg-transparent border-4 border-white rounded-xl hover:bg-white hover:text-blue-900 transition-all transform hover:scale-105"
            >
              <Trophy className="mr-3 h-6 w-6" />
              See All Victories
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}