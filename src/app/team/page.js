'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Scale, 
  ArrowLeft,
  Award,
  Building,
  Star,
  Gavel,
  Heart,
  Users,
  CheckCircle,
  Crown,
  Target,
  Trophy,
  Briefcase,
  GraduationCap,
  Shield,
  Zap,
  Phone,
  Mail,
  MapPin,
  Calendar,
  BookOpen,
  TrendingUp,
  Globe
} from 'lucide-react'

export default function TeamPage() {
  const [selectedAttorney, setSelectedAttorney] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const attorneys = [
    {
      id: 'carl-douglas',
      name: "Carl E. Douglas",
      role: "Founding Partner",
      title: "Dream Team Legend",
      image: "/images/attorneys/carl-douglas.jpg",
      backgroundImage: "/images/scraped/practice-1.jpg",
      specialties: ["Criminal Defense", "Civil Rights", "Personal Injury", "Product Liability"],
      bio: "Carl E. Douglas is a distinguished attorney who gained national recognition as a member of O.J. Simpson's criminal defense 'Dream Team.' As former Managing Attorney at Johnnie L. Cochran, Jr.'s law offices, Carl has represented high-profile celebrities including Michael Jackson, Jamie Foxx, and Queen Latifah. His most notable achievement includes securing a record-breaking $4.9 billion verdict against General Motors - the largest personal injury verdict in U.S. history at the time.",
      achievements: [
        "$4.9B verdict against General Motors",
        "O.J. Simpson Dream Team member", 
        "Former Cochran Firm Managing Attorney",
        "Celebrity defense attorney",
        "30+ years of legal experience",
        "National legal icon"
      ],
      education: "Juris Doctor, UC Berkeley School of Law; BA Northwestern University",
      barAdmissions: ["California State Bar", "Federal Courts"],
      experience: "30+ Years",
      cases: "500+",
      successRate: "95%",
      specialization: "High-Stakes Litigation",
      quote: "Justice isn't just a concept—it's a commitment we make to every client, every case, every day.",
      notableClients: ["Michael Jackson", "Jamie Foxx", "Queen Latifah", "Tupac Shakur"],
      mediaAppearances: ["CNN", "Fox News", "NBC", "ESPN", "Court TV"],
      awards: ["Consumer Attorneys Hall of Fame", "Trial Lawyer of the Year", "Super Lawyers"]
    },
    {
      id: 'jamon-hicks',
      name: "Jamon R. Hicks", 
      role: "Partner",
      title: "Trial Advocacy Master",
      image: "/images/attorneys/jamon-hicks.jpg",
      backgroundImage: "/images/scraped/practice-2.jpg",
      specialties: ["Civil Rights", "Wrongful Death", "Personal Injury", "Trial Advocacy"],
      bio: "Jamon R. Hicks joined the firm after working at the prestigious Cochran Firm, where he specialized in civil rights, wrongful death, and personal injury cases. As an accomplished trial advocate, Jamon has achieved multiple significant verdicts, including a $5 million wrongful death settlement. Beyond his practice, he shares his expertise as a trial advocacy professor at both Loyola Law School and West Los Angeles Law School, training the next generation of attorneys.",
      achievements: [
        "$5M wrongful death settlement",
        "Trial advocacy professor at Loyola Law School",
        "Former Cochran Firm attorney", 
        "Youngest CABL President in history",
        "Super Lawyers recognition",
        "National Trial Advocacy Team"
      ],
      education: "JD Loyola Law School (2004); BA UC Berkeley (2001) with honors",
      barAdmissions: ["California State Bar", "Federal Courts"],
      experience: "20+ Years",
      cases: "300+",
      successRate: "92%",
      specialization: "Complex Civil Litigation",
      quote: "Every case is a story of someone who needs justice. We're here to tell that story and win.",
      leadership: ["President, John M. Langston Bar Association", "President, California Association of Black Lawyers"],
      teaching: ["Trial Advocacy - Loyola Law School", "Evidence - West Los Angeles Law School"],
      recognition: ["Super Lawyers 2014-2022", "Rising Stars 2009-2013", "Trial Advocacy Excellence Award"]
    },
    {
      id: 'aja-simplis',
      name: "A&rsquo;ja Simplis",
      role: "Senior Associate", 
      title: "Civil Rights Champion",
      image: "/images/attorneys/aja-simplis.jpg",
      backgroundImage: "/images/scraped/practice-3.jpg",
      specialties: ["Civil Rights", "Personal Injury", "Employment Law", "Discrimination"],
      bio: "A&rsquo;ja Simplis brings 15 years of comprehensive legal experience to the firm as a Senior Associate. Her extensive background spans multiple practice areas, with particular expertise in civil rights, personal injury, and employment law. A&rsquo;ja&rsquo;s dedication to client advocacy and her deep understanding of complex legal matters make her an invaluable member of the legal team.",
      achievements: [
        "15+ years legal experience",
        "Multi-practice expertise",
        "Senior Associate leadership",
        "Client advocacy specialist",
        "Employment law expert",
        "Civil rights champion"
      ],
      education: "Juris Doctor, Law School; Undergraduate Degree", 
      barAdmissions: ["California State Bar"],
      experience: "15+ Years",
      cases: "200+",
      successRate: "90%",
      specialization: "Employment & Civil Rights",
      quote: "Fighting discrimination and protecting civil rights isn't just my job—it's my calling.",
      focus: ["Workplace Discrimination", "Civil Rights Violations", "Personal Injury Claims"],
      approach: "Compassionate yet aggressive representation for those whose rights have been violated"
    },
    {
      id: 'bianca-perez',
      name: "Bianca Perez",
      role: "Junior Associate",
      title: "Rising Star",
      image: "/images/attorneys/bianca-perez.jpg",
      backgroundImage: "/images/scraped/practice-4.jpg",
      specialties: ["Employment Discrimination", "Civil Rights", "Immigration Law"],
      bio: "Bianca Perez is a dedicated Junior Associate who specializes in employment discrimination and civil rights cases. As an emerging talent in the legal field, Bianca brings fresh perspectives and unwavering commitment to fighting for justice. Her focus on employment law and civil rights aligns perfectly with the firm's mission of protecting those whose rights have been violated.",
      achievements: [
        "Employment discrimination specialist",
        "Civil rights advocate", 
        "Rising legal talent",
        "Client-focused approach",
        "Bilingual representation",
        "Community advocate"
      ],
      education: "Juris Doctor, Law School; Undergraduate Degree",
      barAdmissions: ["California State Bar"],
      experience: "5+ Years",
      cases: "100+",
      successRate: "88%",
      specialization: "Employment & Immigration",
      quote: "Every client deserves fierce advocacy. I fight for those who need their voices heard.",
      languages: ["English", "Spanish"],
      communityWork: "Pro bono immigration and civil rights cases"
    },
    {
      id: 'kristen-devezin',
      name: "Kristen Devezin",
      role: "Executive Administrator",
      title: "Operations Expert",
      image: "/images/attorneys/kristen-devezin.jpg",
      backgroundImage: "/images/scraped/practice-5.jpg",
      specialties: ["Case Management", "Client Relations", "Legal Operations", "Administration"],
      bio: "Kristen Devezin serves as Executive Administrator with over 10 years of experience in the legal field. Her expertise in case management, client relations, and legal operations ensures that the firm runs smoothly and efficiently. Kristen's dedication to client service and operational excellence supports the attorneys in delivering the best possible representation.",
      achievements: [
        "10+ years legal field experience",
        "Executive leadership",
        "Operations specialist", 
        "Client service excellence",
        "Case management expert",
        "Administrative leadership"
      ],
      education: "Administrative Certification; Legal Studies",
      certifications: ["Legal Administrative Professional", "Case Management Specialist"],
      experience: "10+ Years",
      department: "Operations",
      role_focus: "Client Experience",
      specialization: "Legal Operations",
      quote: "Behind every great legal victory is exceptional client service and seamless operations.",
      expertise: ["Client Relations", "Case Coordination", "Legal Technology", "Office Management"],
      impact: "Ensures every client receives world-class service from first contact to case resolution"
    }
  ]

  const teamStats = [
    { label: "Combined Experience", value: "80+ Years", icon: Calendar },
    { label: "Cases Won", value: "1,100+", icon: Trophy },
    { label: "Client Satisfaction", value: "98%", icon: Heart },
    { label: "Success Rate", value: "94%", icon: Target }
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
              <Link href="/#practice-areas" className="text-gray-300 hover:text-white transition-colors">
                Practice Areas
              </Link>
              <Link href="/team" className="text-white font-semibold border-b-2 border-gold-400">
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
            src="/images/scraped/hero-2.jpg"
            alt="Legal Team"
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
              <span className="text-white">MEET THE</span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                DREAM TEAM
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              From O.J. Simpson&rsquo;s legendary defense to record-breaking verdicts,<br />
              meet the attorneys who make legal history.
            </p>

            {/* Team Stats */}
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {teamStats.map((stat, index) => {
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

      {/* Attorney Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {attorneys.map((attorney, index) => (
              <div 
                key={attorney.id} 
                className="group cursor-pointer"
                onClick={() => setSelectedAttorney(attorney)}
              >
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-yellow-500 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2">
                  {/* Clean Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-gray-900/20"></div>

                  <div className="relative p-8">
                    {/* Attorney Photo */}
                    <div className="relative mb-6">
                      <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gradient-to-r from-yellow-400 to-orange-500 group-hover:scale-110 transition-transform">
                        <Image
                          src={attorney.image}
                          alt={attorney.name}
                          width={128}
                          height={128}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      {attorney.role === "Founding Partner" && (
                        <div className="absolute -top-2 -right-2">
                          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                            <Crown className="w-6 h-6 text-black" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Attorney Info */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{attorney.name}</h3>
                      <p className="text-blue-400 font-semibold text-lg mb-1">{attorney.role}</p>
                      <p className="text-yellow-400 font-medium text-sm">{attorney.title}</p>
                    </div>

                    {/* Specialties */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {attorney.specialties.slice(0, 3).map((specialty, idx) => (
                          <span key={idx} className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-xs">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{attorney.successRate}</div>
                        <div className="text-xs text-gray-400">Success Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{attorney.experience}</div>
                        <div className="text-xs text-gray-400">Experience</div>
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="text-center mb-6">
                      <p className="text-gray-300 text-sm italic">&ldquo;{attorney.quote}&rdquo;</p>
                    </div>

                    {/* View Profile Button */}
                    <div className="text-center">
                      <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all group-hover:scale-105">
                        <Users className="w-4 h-4 mr-2" />
                        View Full Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Attorney Detail Modal */}
      {selectedAttorney && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="relative">
              {/* Clean Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-gray-900/30"></div>

              <div className="relative p-8">
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedAttorney(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  ✕
                </button>

                {/* Attorney Header */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 mb-8">
                  <div className="relative">
                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gradient-to-r from-yellow-400 to-orange-500">
                      <Image
                        src={selectedAttorney.image}
                        alt={selectedAttorney.name}
                        width={192}
                        height={192}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {selectedAttorney.role === "Founding Partner" && (
                      <div className="absolute -top-4 -right-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                          <Crown className="w-8 h-8 text-black" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-4xl font-black text-white mb-2">{selectedAttorney.name}</h2>
                    <p className="text-blue-400 font-bold text-xl mb-2">{selectedAttorney.role}</p>
                    <p className="text-yellow-400 font-semibold text-lg mb-4">{selectedAttorney.title}</p>
                    
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                      {selectedAttorney.specialties.map((specialty, idx) => (
                        <span key={idx} className="px-4 py-2 bg-blue-600/20 text-blue-300 rounded-full text-sm">
                          {specialty}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{selectedAttorney.successRate}</div>
                        <div className="text-xs text-gray-400">Success Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{selectedAttorney.experience}</div>
                        <div className="text-xs text-gray-400">Experience</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">{selectedAttorney.cases}</div>
                        <div className="text-xs text-gray-400">Cases</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-400">{selectedAttorney.specialization}</div>
                        <div className="text-xs text-gray-400">Focus</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Attorney Details */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Biography</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">{selectedAttorney.bio}</p>

                    <h3 className="text-xl font-bold text-white mb-4">Education</h3>
                    <p className="text-gray-300 mb-6">{selectedAttorney.education}</p>

                    <h3 className="text-xl font-bold text-white mb-4">Bar Admissions</h3>
                    <ul className="text-gray-300 mb-6">
                      {selectedAttorney.barAdmissions?.map((bar, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          {bar}
                        </li>
                      )) || <li className="text-gray-400">No bar admissions listed</li>}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Key Achievements</h3>
                    <div className="space-y-3 mb-6">
                      {selectedAttorney.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                          <span className="text-gray-300">{achievement}</span>
                        </div>
                      ))}
                    </div>

                    {selectedAttorney.notableClients && (
                      <>
                        <h3 className="text-xl font-bold text-white mb-4">Notable Clients</h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {selectedAttorney.notableClients.map((client, idx) => (
                            <span key={idx} className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm">
                              {client}
                            </span>
                          ))}
                        </div>
                      </>
                    )}

                    {selectedAttorney.teaching && (
                      <>
                        <h3 className="text-xl font-bold text-white mb-4">Teaching</h3>
                        <ul className="text-gray-300 mb-6">
                          {selectedAttorney.teaching.map((course, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <GraduationCap className="w-4 h-4 text-blue-400" />
                              {course}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>

                {/* Quote */}
                <div className="text-center mt-8 p-6 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl">
                  <blockquote className="text-xl text-white italic">&ldquo;{selectedAttorney.quote}&rdquo;</blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-8">
            READY TO WIN WITH THE DREAM TEAM?
          </h2>
          <p className="text-2xl text-white/90 mb-12 leading-relaxed">
            Get the legendary legal representation that has delivered billions in verdicts and countless victories.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/#contact"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-blue-900 bg-white rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
            >
              <Zap className="mr-3 h-6 w-6" />
              Schedule Your Championship Consultation
            </Link>
            <Link 
              href="/results"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-white bg-transparent border-4 border-white rounded-xl hover:bg-white hover:text-blue-900 transition-all transform hover:scale-105"
            >
              <Trophy className="mr-3 h-6 w-6" />
              See Our Victories
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}