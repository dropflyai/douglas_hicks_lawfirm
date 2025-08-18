'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Scale, 
  ArrowLeft,
  Trophy,
  Target,
  Crown,
  Shield,
  Users,
  Calendar,
  Clock,
  DollarSign,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Download,
  Share,
  Heart,
  Gavel,
  Building,
  Phone,
  Mail,
  Zap,
  Award,
  TrendingUp,
  BookOpen,
  Eye
} from 'lucide-react'

export default function CaseStudiesPage() {
  const [selectedCase, setSelectedCase] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const heroImages = [
    '/images/scraped/practice-1.jpg',
    '/images/scraped/practice-2.jpg',
    '/images/scraped/practice-3.jpg'
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const caseStudies = [
    {
      id: 'gm-verdict',
      title: "The $4.9 Billion General Motors Verdict",
      subtitle: "Largest Personal Injury Verdict in U.S. History",
      category: "Product Liability",
      amount: "$4.9 BILLION",
      year: "Career Defining Victory",
      attorney: "Carl E. Douglas",
      duration: "3 Years",
      jurisdiction: "Los Angeles Superior Court",
      image: "/images/scraped/practice-1.jpg",
      heroImage: "/images/scraped/hero-1.jpg",
      
      challenge: "Patricia Anderson and her family were severely burned when their Chevrolet Malibu's gas tank exploded after being rear-ended. GM knew about the dangerous fuel tank design but continued production to save costs.",
      
      strategy: "Our legal team exposed GM's deliberate cover-up of safety defects and their cost-benefit analysis that valued profits over human lives. We demonstrated a pattern of corporate negligence spanning decades.",
      
      outcome: "Historic $4.9 billion verdict that forced automotive industry safety reforms and established new precedents for corporate accountability in product liability cases.",
      
      impact: [
        "Largest personal injury verdict in U.S. history at the time",
        "Forced GM to redesign fuel tank systems across all vehicle lines", 
        "Established new safety standards for automotive industry",
        "Created precedent for punitive damages in corporate negligence cases",
        "Saved thousands of lives through mandatory safety improvements"
      ],
      
      timeline: [
        { phase: "Initial Investigation", duration: "6 months", description: "Gathered evidence of GM's knowledge of defects" },
        { phase: "Expert Analysis", duration: "12 months", description: "Built case with automotive safety experts" },
        { phase: "Discovery Phase", duration: "18 months", description: "Uncovered internal GM documents proving cover-up" },
        { phase: "Trial Preparation", duration: "6 months", description: "Prepared compelling victim testimony and evidence" },
        { phase: "Trial Victory", duration: "2 months", description: "Secured historic $4.9B verdict for the family" }
      ],
      
      keyEvidence: [
        "Internal GM memos discussing known safety defects",
        "Cost-benefit analyses valuing money over safety",
        "Expert testimony on automotive design standards",
        "Victim impact testimony and medical evidence",
        "Pattern evidence of similar incidents nationwide"
      ],
      
      quote: "This verdict sent a clear message to corporate America: you cannot put profits before people's lives. Justice was served for the Anderson family and countless future victims.",
      
      media: [
        "Featured on 60 Minutes and major news networks",
        "Front page coverage in major newspapers nationwide",
        "Documentary features on corporate accountability",
        "Legal textbook case study for product liability"
      ],
      
      lessons: [
        "Never underestimate the power of thorough investigation",
        "Corporate documents often reveal the smoking gun",
        "Victim testimony humanizes complex legal issues",
        "Punitive damages can force industry-wide changes"
      ]
    },
    {
      id: 'police-brutality',
      title: "The $8 Million Police Accountability Victory",
      subtitle: "Justice for Family of Police Brutality Victim",
      category: "Civil Rights",
      amount: "$8.0 MILLION",
      year: "2024",
      attorney: "Douglas Hicks Legal Team",
      duration: "2 Years",
      jurisdiction: "Los Angeles County",
      image: "/images/scraped/practice-2.jpg",
      heroImage: "/images/scraped/hero-2.jpg",
      
      challenge: "A family man was choked to death by Los Angeles County sheriff deputies during a routine stop. Multiple officers were involved, and the department initially claimed he died of 'natural causes.'",
      
      strategy: "We fought the blue wall of silence by uncovering video evidence, expert medical testimony, and a pattern of excessive force by the same officers. Our team exposed the cover-up and demanded accountability.",
      
      outcome: "$8 million verdict that set new precedents for police accountability in Los Angeles County and led to policy reforms in deputy training and use of force protocols.",
      
      impact: [
        "Largest police brutality verdict in LA County that year",
        "Forced policy changes in sheriff department training",
        "Established precedent for family compensation in police killings",
        "Led to criminal investigation of involved officers",
        "Inspired community activism and police reform movements"
      ],
      
      timeline: [
        { phase: "Emergency Response", duration: "1 week", description: "Secured evidence before it could be destroyed" },
        { phase: "Investigation", duration: "8 months", description: "Uncovered video and witness testimony" },
        { phase: "Medical Analysis", duration: "6 months", description: "Expert analysis proved death by asphyxiation" },
        { phase: "Legal Strategy", duration: "6 months", description: "Built comprehensive civil rights violation case" },
        { phase: "Trial Victory", duration: "2 months", description: "Jury awarded $8M for family's loss and suffering" }
      ],
      
      keyEvidence: [
        "Body camera footage showing excessive force",
        "Medical examiner testimony on cause of death",
        "Pattern evidence of officer misconduct",
        "Expert testimony on police procedures",
        "Community witness statements"
      ],
      
      quote: "No family should lose a loved one to police brutality. This verdict honors his memory and ensures his death was not in vain.",
      
      media: [
        "CNN and national news coverage",
        "Community rallies and support",
        "Police reform advocacy features",
        "Legal precedent analysis in law journals"
      ],
      
      lessons: [
        "Quick action is crucial to preserve evidence",
        "Community support amplifies legal efforts",
        "Expert medical testimony is often decisive",
        "Pattern evidence strengthens individual cases"
      ]
    },
    {
      id: 'wrongful-death',
      title: "The $5 Million Wrongful Death Victory",
      subtitle: "Justice for Grieving Family",
      category: "Wrongful Death",
      amount: "$5.0 MILLION",
      year: "2023",
      attorney: "Jamon R. Hicks",
      duration: "18 Months",
      jurisdiction: "Superior Court",
      image: "/images/scraped/practice-3.jpg",
      heroImage: "/images/scraped/hero-3.jpg",
      
      challenge: "A mother of three died due to medical malpractice when doctors failed to diagnose a treatable condition. The hospital claimed the death was unavoidable and due to pre-existing conditions.",
      
      strategy: "Our team assembled medical experts who proved the death was entirely preventable. We demonstrated that proper diagnosis and treatment would have saved her life and secured her family's future.",
      
      outcome: "$5 million settlement that provided financial security for three young children and forced the hospital to implement new diagnostic protocols to prevent similar tragedies.",
      
      impact: [
        "Secured children's education and future financial needs",
        "Forced hospital policy changes in diagnostic procedures",
        "Established compensation standards for young families",
        "Led to improved medical training protocols",
        "Provided closure and accountability for the family"
      ],
      
      timeline: [
        { phase: "Medical Investigation", duration: "4 months", description: "Expert review of medical records and care standards" },
        { phase: "Expert Assembly", duration: "3 months", description: "Recruited top medical experts in the field" },
        { phase: "Hospital Discovery", duration: "6 months", description: "Uncovered systemic failures in diagnostic process" },
        { phase: "Settlement Negotiation", duration: "3 months", description: "Secured maximum compensation for the family" },
        { phase: "Policy Implementation", duration: "2 months", description: "Ensured hospital reforms were implemented" }
      ],
      
      keyEvidence: [
        "Medical expert testimony on standard of care",
        "Hospital protocol documentation and failures",
        "Economic analysis of family's future needs",
        "Medical literature on diagnostic standards",
        "Testimony on preventable nature of death"
      ],
      
      quote: "While nothing can bring back their mother, this settlement ensures her children will have the opportunities she wanted to provide them.",
      
      media: [
        "Medical malpractice legal analysis",
        "Hospital safety advocacy coverage",
        "Family support and community outreach",
        "Medical journal case study references"
      ],
      
      lessons: [
        "Medical expert selection is crucial for success",
        "Economic analysis strengthens settlement value",
        "Family impact testimony drives jury emotion",
        "Systematic failures often exceed individual negligence"
      ]
    },
    {
      id: 'discrimination-victory',
      title: "The $1.576 Million Disability Rights Victory",
      subtitle: "Fighting Housing Discrimination",
      category: "Civil Rights",
      amount: "$1.576 MILLION",
      year: "2024",
      attorney: "A'ja Simplis",
      duration: "14 Months",
      jurisdiction: "Federal Court",
      image: "/images/scraped/practice-4.jpg",
      heroImage: "/images/scraped/practice-5.jpg",
      
      challenge: "A disabled tenant was discriminated against by Greystar Management Company, who refused reasonable accommodations and ultimately evicted him based on his disability status.",
      
      strategy: "We built a comprehensive federal civil rights case under the Americans with Disabilities Act, documenting the company's pattern of discrimination and their deliberate violations of federal law.",
      
      outcome: "$1.576 million verdict that established strong precedent for disability rights in housing and forced the company to overhaul their accommodation policies nationwide.",
      
      impact: [
        "Strongest disability rights precedent in housing law",
        "Forced nationwide policy changes at major property manager",
        "Established template for similar discrimination cases",
        "Secured significant compensation for victim's suffering",
        "Enhanced protections for disabled tenants everywhere"
      ],
      
      timeline: [
        { phase: "Discrimination Documentation", duration: "3 months", description: "Gathered evidence of discriminatory practices" },
        { phase: "Federal Case Building", duration: "4 months", description: "Built comprehensive ADA violation case" },
        { phase: "Company Investigation", duration: "5 months", description: "Discovered pattern of company-wide discrimination" },
        { phase: "Trial Preparation", duration: "2 months", description: "Prepared compelling disability rights case" }
      ],
      
      keyEvidence: [
        "Company emails showing discriminatory intent",
        "Pattern evidence of similar discrimination cases",
        "Expert testimony on ADA requirements",
        "Victim impact testimony and damages",
        "Corporate policy documents revealing bias"
      ],
      
      quote: "This victory proves that disability discrimination will not be tolerated. Every person deserves equal housing opportunities regardless of their physical limitations.",
      
      media: [
        "Disability rights advocacy coverage",
        "Federal civil rights case analysis",
        "Housing discrimination legal precedent",
        "Corporate accountability reporting"
      ],
      
      lessons: [
        "Federal civil rights laws provide powerful remedies",
        "Pattern evidence multiplies case strength",
        "Corporate policies often reveal systemic bias",
        "Disability rights cases require specialized expertise"
      ]
    }
  ]

  const stats = [
    { label: "Total Case Studies", value: "15+", icon: BookOpen },
    { label: "Combined Verdicts", value: "$4.9B+", icon: DollarSign },
    { label: "Average Case Duration", value: "18 Months", icon: Clock },
    { label: "Success Rate", value: "95%", icon: Trophy }
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
              <Link href="/case-studies" className="text-white font-semibold border-b-2 border-blue-400">
                Case Studies
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
          {heroImages.map((image, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-2000 ${
                index === currentImageIndex ? 'opacity-60' : 'opacity-0'
              }`}
            >
              <Image
                src={image}
                alt="Legal Victory"
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
            <span className="text-white">VICTORY</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
              STORIES
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-300 mb-12 font-light leading-relaxed">
            Inside the legendary cases that changed lives, set precedents,<br />
            and made legal history.
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
              href="#cases"
              className="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-2xl"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Explore Victory Stories
            </Link>
            <Link 
              href="/#contact"
              className="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-transparent border-2 border-white rounded-lg hover:bg-white hover:text-black transition-all transform hover:scale-105"
            >
              <Phone className="mr-2 h-5 w-5" />
              Start Your Victory Story
            </Link>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section id="cases" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              LEGENDARY CASE VICTORIES
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From billion-dollar verdicts to precedent-setting victories, these cases showcase the power of elite legal representation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {caseStudies.map((caseStudy, index) => (
              <div 
                key={caseStudy.id} 
                className="group cursor-pointer"
                onClick={() => setSelectedCase(caseStudy)}
              >
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-yellow-500 transition-all duration-500 transform hover:scale-[1.02]">
                  {/* Background Image */}
                  <div className="absolute inset-0 opacity-30">
                    <Image
                      src={caseStudy.image}
                      alt={caseStudy.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
                  </div>

                  <div className="relative p-8">
                    {/* Case Header */}
                    <div className="mb-6">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full text-sm">
                          {caseStudy.category}
                        </span>
                        <span className="text-gray-400">{caseStudy.year}</span>
                      </div>
                      
                      <h3 className="text-6xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text mb-4">
                        {caseStudy.amount}
                      </h3>
                      
                      <h4 className="text-2xl font-bold text-white mb-2">{caseStudy.title}</h4>
                      <p className="text-blue-400 font-semibold">{caseStudy.subtitle}</p>
                    </div>

                    {/* Case Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <div className="text-sm text-gray-400">Lead Attorney</div>
                        <div className="text-white font-semibold">{caseStudy.attorney}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Duration</div>
                        <div className="text-white font-semibold">{caseStudy.duration}</div>
                      </div>
                    </div>

                    {/* Challenge Preview */}
                    <div className="mb-6">
                      <div className="text-sm text-gray-400 mb-2">The Challenge:</div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {caseStudy.challenge.substring(0, 120)}...
                      </p>
                    </div>

                    {/* Impact Preview */}
                    <div className="mb-6">
                      <div className="text-sm text-gray-400 mb-2">Key Impact:</div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-gray-300 text-sm">{caseStudy.impact[0]}</span>
                      </div>
                    </div>

                    {/* Read More Button */}
                    <div className="flex gap-3">
                      <button className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:scale-105 transition-all">
                        <Eye className="w-4 h-4 mr-2" />
                        Read Full Story
                      </button>
                      <button className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all">
                        <Share className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Detail Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl max-w-6xl w-full border border-gray-700">
              <div className="relative">
                {/* Hero Image */}
                <div className="relative h-64 overflow-hidden rounded-t-2xl">
                  <Image
                    src={selectedCase.heroImage}
                    alt={selectedCase.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
                  
                  {/* Close Button */}
                  <button 
                    onClick={() => setSelectedCase(null)}
                    className="absolute top-4 right-4 w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    ✕
                  </button>

                  {/* Case Header Overlay */}
                  <div className="absolute bottom-6 left-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full text-sm">
                        {selectedCase.category}
                      </span>
                      <span className="text-white/80">{selectedCase.year}</span>
                    </div>
                    <h2 className="text-5xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">
                      {selectedCase.amount}
                    </h2>
                  </div>
                </div>

                <div className="p-8 space-y-8">
                  {/* Case Title */}
                  <div>
                    <h3 className="text-3xl font-black text-white mb-2">{selectedCase.title}</h3>
                    <p className="text-blue-400 font-semibold text-xl">{selectedCase.subtitle}</p>
                  </div>

                  {/* Case Overview */}
                  <div className="grid lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <div className="text-white font-semibold">{selectedCase.attorney}</div>
                      <div className="text-gray-400 text-sm">Lead Attorney</div>
                    </div>
                    <div className="text-center">
                      <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <div className="text-white font-semibold">{selectedCase.duration}</div>
                      <div className="text-gray-400 text-sm">Case Duration</div>
                    </div>
                    <div className="text-center">
                      <Building className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <div className="text-white font-semibold">{selectedCase.jurisdiction}</div>
                      <div className="text-gray-400 text-sm">Jurisdiction</div>
                    </div>
                    <div className="text-center">
                      <Trophy className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <div className="text-white font-semibold">Victory</div>
                      <div className="text-gray-400 text-sm">Case Result</div>
                    </div>
                  </div>

                  {/* The Story */}
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div>
                      <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-red-400" />
                        The Challenge
                      </h4>
                      <p className="text-gray-300 leading-relaxed">{selectedCase.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-blue-400" />
                        Our Strategy
                      </h4>
                      <p className="text-gray-300 leading-relaxed">{selectedCase.strategy}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-400" />
                        The Outcome
                      </h4>
                      <p className="text-gray-300 leading-relaxed">{selectedCase.outcome}</p>
                    </div>
                  </div>

                  {/* Impact & Timeline Grid */}
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Impact */}
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-6">Case Impact</h4>
                      <div className="space-y-4">
                        {selectedCase.impact.map((impact, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                            <span className="text-gray-300">{impact}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Timeline */}
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-6">Case Timeline</h4>
                      <div className="space-y-4">
                        {selectedCase.timeline.map((phase, idx) => (
                          <div key={idx} className="relative pl-8 border-l-2 border-blue-600 last:border-l-0">
                            <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                            <div className="mb-1">
                              <span className="text-white font-semibold">{phase.phase}</span>
                              <span className="text-blue-400 text-sm ml-2">({phase.duration})</span>
                            </div>
                            <p className="text-gray-400 text-sm">{phase.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Attorney Quote */}
                  <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-6">
                    <blockquote className="text-xl text-white italic text-center">
                      &ldquo;{selectedCase.quote}&rdquo;
                    </blockquote>
                    <div className="text-center mt-4">
                      <span className="text-blue-400 font-semibold">— {selectedCase.attorney}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <Link 
                      href="/#contact"
                      className="flex-1 inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:scale-105 transition-all"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Discuss Your Case
                    </Link>
                    <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-all">
                      <Download className="w-5 h-5 mr-2" />
                      Download Case Study
                    </button>
                    <button className="px-8 py-4 border-2 border-yellow-400 text-yellow-400 font-bold rounded-lg hover:bg-yellow-400 hover:text-black transition-all">
                      <Share className="w-5 h-5 mr-2" />
                      Share Story
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 via-purple-900 to-orange-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-8">
            YOUR VICTORY STORY STARTS HERE
          </h2>
          <p className="text-2xl text-white/90 mb-12 leading-relaxed">
            These legendary victories prove what&rsquo;s possible with elite legal representation. Let us write your victory story.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/#contact"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-orange-900 bg-white rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
            >
              <Zap className="mr-3 h-6 w-6" />
              Start Your Legendary Case
            </Link>
            <Link 
              href="/team"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-white bg-transparent border-4 border-white rounded-xl hover:bg-white hover:text-orange-900 transition-all transform hover:scale-105"
            >
              <Crown className="mr-3 h-6 w-6" />
              Meet Your Legal Champions
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}