'use client'

import Link from 'next/link'
import Image from 'next/image'
import { 
  Scale, 
  FileText, 
  Gavel, 
  Shield, 
  Database, 
  Users, 
  Clock,
  CheckCircle,
  ArrowRight,
  PlayCircle,
  Star,
  BarChart3,
  Settings,
  Lock,
  Search,
  Calendar,
  DollarSign,
  Phone,
  Mail,
  MapPin,
  Award,
  Building,
  Heart
} from 'lucide-react'

export default function DouglassHicksLawPage() {
  const practiceAreas = [
    {
      icon: Shield,
      title: "Personal Injury",
      description: "Fighting for victims of accidents, medical malpractice, and negligence with compassionate representation.",
      highlights: ["Auto Accidents", "Medical Malpractice", "Workplace Injuries", "Product Liability"]
    },
    {
      icon: Scale,
      title: "Civil Rights",
      description: "Protecting fundamental rights and fighting discrimination with unwavering dedication to justice.",
      highlights: ["Police Brutality", "Employment Discrimination", "Housing Rights", "Disability Rights"]
    },
    {
      icon: Gavel,
      title: "Criminal Defense",
      description: "Aggressive defense strategies from a team with experience defending high-profile cases.",
      highlights: ["White Collar Crimes", "Drug Charges", "Violent Crimes", "Appeals"]
    },
    {
      icon: Building,
      title: "Employment Law",
      description: "Advocating for workers' rights and fighting workplace discrimination and harassment.",
      highlights: ["Wrongful Termination", "Wage & Hour", "Harassment", "Discrimination"]
    }
  ]

  const attorneys = [
    {
      name: "Carl E. Douglas",
      role: "Founding Partner",
      specialties: ["Criminal Defense", "Civil Rights", "Personal Injury"],
      description: "Former Managing Attorney at Johnnie L. Cochran, Jr.'s law offices and member of O.J. Simpson's criminal defense 'Dream Team'. Represented celebrities including Michael Jackson, Jamie Foxx, and Queen Latifah.",
      achievements: ["$4.9B verdict against General Motors", "O.J. Simpson Dream Team member", "Former Cochran Firm Managing Attorney", "Celebrity defense attorney"]
    },
    {
      name: "Jamon R. Hicks", 
      role: "Partner",
      specialties: ["Civil Rights", "Wrongful Death", "Personal Injury", "Trial Advocacy"],
      description: "Former attorney at the Cochran Firm specializing in civil rights, wrongful death, and personal injury cases. Teaches trial advocacy at Loyola Law School and West Los Angeles Law School.",
      achievements: ["$5M wrongful death settlement", "Trial advocacy professor at Loyola Law School", "Former Cochran Firm attorney", "Civil rights specialist"]
    },
    {
      name: "A'ja Simplis",
      role: "Senior Associate",
      specialties: ["Civil Rights", "Personal Injury", "Employment Law"],
      description: "Senior Associate with 15 years of comprehensive legal experience across multiple practice areas.",
      achievements: ["15+ years legal experience", "Senior Associate", "Multi-practice expertise"]
    },
    {
      name: "Bianca Perez",
      role: "Junior Associate", 
      specialties: ["Employment Discrimination", "Civil Rights"],
      description: "Junior Associate specializing in employment discrimination and civil rights cases.",
      achievements: ["Employment discrimination specialist", "Civil rights advocate", "Rising legal talent"]
    }
  ]

  const results = [
    {
      amount: "$8.0M",
      case: "Police Brutality Verdict",
      description: "Verdict against Los Angeles County for family of man choked to death by sheriff deputies"
    },
    {
      amount: "$1.576M",
      case: "Disability Discrimination",
      description: "Verdict against Greystar Management Company for Disability Discrimination"
    },
    {
      amount: "$733K",
      case: "Employment Discrimination",
      description: "Verdict for Superintendent against El Monte Union High School District"
    },
    {
      amount: "$4.9B",
      case: "Product Liability",
      description: "Record-breaking verdict against General Motors (Carl E. Douglas)"
    }
  ]

  const criminalResults = [
    "Not Guilty - Celebrity esthetician charged with murder for hire",
    "Not Guilty - Felony assault with deadly weapon",
    "Not Guilty - Felony grand theft",
    "Not Guilty - Resisting arrest",
    "Hung Jury - DUI and child endangerment",
    "Hung Jury - Battery on police officer"
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
                alt="Douglass Hicks Law Firm"
                width={40}
                height={40}
                className="mr-3"
              />
              <span className="text-xl font-bold text-white">
                Douglass Hicks Law Firm
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#practice-areas" className="text-gray-300 hover:text-white transition-colors">
                Practice Areas
              </Link>
              <Link href="/team" className="text-gray-300 hover:text-white transition-colors">
                Our Team
              </Link>
              <Link href="/results" className="text-gray-300 hover:text-white transition-colors">
                Results
              </Link>
              <Link href="#contact" className="text-gray-300 hover:text-white transition-colors">
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
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-gray-900/20 to-blue-800/20"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 rounded-full border border-blue-400/30 mb-6">
                <Award className="w-4 h-4 text-blue-400 mr-2" />
                <span className="text-sm text-gray-300">Dream Team Legacy</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white">
                  Fighting for
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                  Justice
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
                We represent people who have been personally injured and/or have had their civil rights violated. We help people rebuild their lives, financially and emotionally.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="#contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Free Consultation
                </Link>
                <Link 
                  href="/portal"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white border border-gray-400 rounded-lg hover:bg-white/10 transition-all"
                >
                  Client Portal
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
              
              <div className="mt-8 flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>30+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Dream Team Alumni</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Multi-Million Results</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-xl p-8 border border-gray-700">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Douglass Hicks Law Firm</h3>
                  <p className="text-gray-400 text-sm">Los Angeles • Since 1990</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                    <span className="text-gray-300 text-sm">Record Verdict</span>
                    <span className="text-green-400 font-semibold">$4.9B</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                    <span className="text-gray-300 text-sm">Cases Won</span>
                    <span className="text-blue-400 font-semibold">1,000+</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                    <span className="text-gray-300 text-sm">Client Satisfaction</span>
                    <span className="text-yellow-400 font-semibold">98%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                    <span className="text-gray-300 text-sm">Years of Service</span>
                    <span className="text-purple-400 font-semibold">30+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas Section */}
      <section id="practice-areas" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our Practice Areas
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Decades of experience fighting for justice across multiple areas of law
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {practiceAreas.map((area, index) => {
              const Icon = area.icon
              return (
                <div key={index} className="bg-black/50 backdrop-blur-xl rounded-xl p-8 border border-gray-700">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{area.title}</h3>
                  <p className="text-gray-400 mb-6">{area.description}</p>
                  <div className="space-y-2">
                    {area.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                        <span className="text-gray-300">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Attorneys Section */}
      <section id="attorneys" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our Legal Team
            </h2>
            <p className="text-xl text-gray-400">
              Award-winning attorneys with a legacy of justice
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {attorneys.map((attorney, index) => (
              <div key={index} className="bg-black/50 backdrop-blur-xl rounded-xl p-8 border border-gray-700">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{attorney.name}</h3>
                  <p className="text-blue-400 font-semibold mb-4">{attorney.role}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {attorney.specialties.map((specialty, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-400 mb-6">{attorney.description}</p>
                  <div className="space-y-2">
                    {attorney.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Proven Results
            </h2>
            <p className="text-xl text-gray-400">
              Recent victories and settlements for our clients
            </p>
          </div>
          
          {/* Civil Verdicts & Settlements */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Civil Verdicts & Settlements</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {results.map((result, index) => (
                <div key={index} className="bg-black/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-3">{result.amount}</div>
                  <h4 className="text-lg font-semibold text-white mb-2">{result.case}</h4>
                  <p className="text-gray-400 text-sm">{result.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Criminal Defense Victories */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Criminal Defense Victories</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {criminalResults.map((result, index) => (
                <div key={index} className="bg-black/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span className="text-lg font-semibold text-white">
                      {result.includes('Not Guilty') ? 'NOT GUILTY' : 'HUNG JURY'}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{result.replace(/^(Not Guilty|Hung Jury) - /, '')}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Contact Us Today
            </h2>
            <p className="text-xl text-gray-400">
              Free consultation for your case
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-blue-400 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Office Location</h3>
                    <p className="text-gray-400">
                      5120 W. Goldleaf Circle, Suite 140<br />
                      Los Angeles, CA 90056
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-blue-400 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
                    <p className="text-gray-400">(323) 733-1111</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-blue-400 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                    <p className="text-gray-400">info@douglashickslaw.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-black/50 backdrop-blur-xl rounded-xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">Free Case Evaluation</h3>
              <form className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <input 
                    type="tel" 
                    placeholder="Your Phone" 
                    className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Describe your case..." 
                    rows={4}
                    className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all"
                >
                  Get Free Consultation
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Image
                  src="/images/scraped/logo-main.png"
                  alt="Douglass Hicks Law Firm"
                  width={40}
                  height={40}
                  className="mr-3"
                />
                <span className="text-xl font-bold text-white">Douglass Hicks Law Firm</span>
              </div>
              <p className="text-gray-400 mb-4">
                Fighting for justice with David vs. Goliath representation since 1990.
              </p>
              <p className="text-gray-500 text-sm">
                © 2024 Douglass Hicks Law Firm. All rights reserved.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Practice Areas</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Personal Injury</li>
                <li>Civil Rights</li>
                <li>Criminal Defense</li>
                <li>Employment Law</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>5120 W. Goldleaf Circle, Suite 140</p>
                <p>Los Angeles, CA 90056</p>
                <p>(323) 733-1111</p>
                <p>info@douglashickslaw.com</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}