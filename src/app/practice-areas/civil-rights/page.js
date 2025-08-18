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
  Search
} from 'lucide-react'

export default function CivilRightsPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const practiceImages = [
    '/images/scraped/practice-1.jpg',
    '/images/scraped/practice-2.jpg',
    '/images/scraped/practice-3.jpg'
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % practiceImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const majorVictories = [
    {
      amount: "$8.0 MILLION",
      case: "Police Brutality Verdict",
      description: "Landmark verdict against Los Angeles County for family of man choked to death by sheriff deputies",
      year: "2024",
      impact: "Set new precedent for police accountability"
    },
    {
      amount: "$1.576 MILLION", 
      case: "Disability Discrimination",
      description: "Verdict against Greystar Management Company for Disability Discrimination",
      year: "2024",
      impact: "Protected disabled tenant rights"
    },
    {
      amount: "$733,000",
      case: "Employment Discrimination",
      description: "Verdict for Superintendent against El Monte Union High School District", 
      year: "2024",
      impact: "Stopped workplace discrimination"
    }
  ]

  const services = [
    {
      icon: Shield,
      title: "Police Brutality",
      description: "Fighting against excessive force and misconduct by law enforcement officers",
      cases: ["Wrongful death by police", "Excessive force incidents", "False arrest claims", "Police misconduct"]
    },
    {
      icon: Users,
      title: "Employment Discrimination", 
      description: "Protecting workers from discrimination based on race, gender, age, and disability",
      cases: ["Workplace harassment", "Wrongful termination", "Pay discrimination", "Hostile work environment"]
    },
    {
      icon: Scale,
      title: "Housing Rights",
      description: "Ensuring fair housing practices and fighting discrimination in housing",
      cases: ["Housing discrimination", "Landlord retaliation", "Accessibility violations", "Fair housing violations"]
    },
    {
      icon: Heart,
      title: "Disability Rights",
      description: "Protecting the rights of individuals with disabilities under the ADA",
      cases: ["ADA violations", "Reasonable accommodations", "Accessibility issues", "Disability discrimination"]
    },
    {
      icon: Gavel,
      title: "Constitutional Rights",
      description: "Defending fundamental constitutional rights and civil liberties", 
      cases: ["First Amendment violations", "Due process violations", "Equal protection claims", "Constitutional violations"]
    },
    {
      icon: Award,
      title: "Class Action Litigation",
      description: "Representing groups in large-scale civil rights violations",
      cases: ["Systemic discrimination", "Pattern and practice cases", "Institutional violations", "Group litigation"]
    }
  ]

  const attorneys = [
    {
      name: "Carl E. Douglas",
      image: "/images/attorneys/carl-douglas.jpg",
      role: "Lead Civil Rights Attorney",
      experience: "30+ years of civil rights litigation",
      specialty: "High-profile constitutional cases"
    },
    {
      name: "A'ja Simplis", 
      image: "/images/attorneys/aja-simplis.jpg",
      role: "Senior Civil Rights Associate",
      experience: "15+ years employment discrimination",
      specialty: "Workplace civil rights violations"
    }
  ]

  const process = [
    {
      step: "1",
      title: "Free Consultation",
      description: "We listen to your story and evaluate your civil rights claim",
      icon: Phone
    },
    {
      step: "2", 
      title: "Investigation",
      description: "Our team thoroughly investigates the facts and evidence",
      icon: Search
    },
    {
      step: "3",
      title: "Legal Strategy",
      description: "We develop a powerful legal strategy tailored to your case",
      icon: Target
    },
    {
      step: "4",
      title: "Fight for Justice",
      description: "We aggressively pursue maximum compensation and accountability",
      icon: Gavel
    }
  ]

  const stats = [
    { label: "Civil Rights Cases Won", value: "150+", icon: Trophy },
    { label: "Success Rate", value: "95%", icon: Target },
    { label: "Average Settlement", value: "$2.3M", icon: DollarSign },
    { label: "Years Experience", value: "30+", icon: Calendar }
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
              <Link href="/#practice-areas" className="text-white font-semibold border-b-2 border-blue-400">
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
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          {practiceImages.map((image, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-2000 ${
                index === currentImageIndex ? 'opacity-60' : 'opacity-0'
              }`}
            >
              <Image
                src={image}
                alt="Civil Rights"
                fill
                className="object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
        </div>

        <div className={`relative z-40 text-center max-w-6xl mx-auto px-4 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <Link 
            href="/"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 text-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="text-white">CIVIL</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              RIGHTS
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-300 mb-12 font-light leading-relaxed">
            Fighting for justice, equality, and constitutional rights<br />
            with the fierce advocacy you deserve.
          </p>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {stats.map((stat, index) => {
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#contact"
              className="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-2xl"
            >
              <Shield className="mr-2 h-5 w-5" />
              Get Free Civil Rights Consultation
            </Link>
            <Link 
              href="#victories"
              className="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-transparent border-2 border-white rounded-lg hover:bg-white hover:text-black transition-all transform hover:scale-105"
            >
              <Trophy className="mr-2 h-5 w-5" />
              See Our Victories
            </Link>
          </div>
        </div>
      </section>

      {/* Major Victories */}
      <section id="victories" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              CIVIL RIGHTS VICTORIES
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Recent landmark victories that have changed lives and set new precedents for civil rights protection.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {majorVictories.map((victory, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all transform hover:scale-105">
                <div className="mb-4">
                  <span className="text-4xl font-black text-green-400">{victory.amount}</span>
                  <span className="text-sm text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full ml-2">{victory.year}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{victory.case}</h3>
                <p className="text-gray-400 mb-4">{victory.description}</p>
                
                <div className="bg-green-900/30 border border-green-700 rounded-lg p-3">
                  <p className="text-green-400 text-sm font-semibold">
                    Impact: {victory.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              AREAS OF EXPERTISE
            </h2>
            <p className="text-xl text-gray-400">
              Comprehensive civil rights representation across all areas of law
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all transform hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  
                  <div className="space-y-2">
                    {service.cases.map((caseType, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{caseType}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              OUR PROVEN PROCESS
            </h2>
            <p className="text-xl text-gray-400">
              How we fight for your civil rights from consultation to victory
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-sm">{step.step}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Attorney Team */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              YOUR CIVIL RIGHTS CHAMPIONS
            </h2>
            <p className="text-xl text-gray-400">
              Meet the attorneys who will fight for your constitutional rights
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {attorneys.map((attorney, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all transform hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden">
                    <Image
                      src={attorney.image}
                      alt={attorney.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{attorney.name}</h3>
                    <p className="text-blue-400 font-semibold">{attorney.role}</p>
                  </div>
                </div>
                
                <p className="text-gray-400 mb-2">{attorney.experience}</p>
                <p className="text-gray-300 text-sm font-medium">{attorney.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-8">
            YOUR RIGHTS MATTER
          </h2>
          <p className="text-2xl text-white/90 mb-12 leading-relaxed">
            Don&rsquo;t let civil rights violations go unpunished. Get the fierce advocacy you deserve from attorneys who have won $8M+ in civil rights cases.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/#contact"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-blue-900 bg-white rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
            >
              <Phone className="mr-3 h-6 w-6" />
              Call Now for Free Consultation
            </Link>
            <Link 
              href="/team"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-white bg-transparent border-4 border-white rounded-xl hover:bg-white hover:text-blue-900 transition-all transform hover:scale-105"
            >
              <Users className="mr-3 h-6 w-6" />
              Meet Your Legal Champions
            </Link>
          </div>

          <div className="mt-12 p-6 bg-black/30 rounded-xl">
            <p className="text-white font-semibold mb-2">No Fees Unless We Win</p>
            <p className="text-gray-300">We fight for justice on a contingency basis - you pay nothing unless we recover compensation for you.</p>
          </div>
        </div>
      </section>
    </div>
  )
}