'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Scale, 
  Shield, 
  Clock,
  Users,
  Award,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Check,
  Star,
  Quote,
  FileText,
  Gavel,
  Heart,
  Building,
  Calendar,
  AlertCircle
} from 'lucide-react'

export default function DouglassHicksDemo() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const practiceAreas = [
    {
      icon: Heart,
      title: 'Civil Rights',
      description: 'Protecting your constitutional rights and fighting discrimination',
      cases: '150+ Cases Won'
    },
    {
      icon: Gavel,
      title: 'Personal Injury',
      description: 'Maximum compensation for accidents and medical malpractice',
      cases: '200+ Settlements'
    },
    {
      icon: Building,
      title: 'Business Law',
      description: 'Corporate litigation and commercial dispute resolution',
      cases: '75+ Businesses'
    },
    {
      icon: FileText,
      title: 'Employment Law',
      description: 'Workplace discrimination and wrongful termination',
      cases: '100+ Employees'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      case: 'Civil Rights Settlement',
      text: 'Mr. Hicks secured a $2.3M settlement for my discrimination case. His attention to detail and fierce advocacy made all the difference.',
      rating: 5,
      amount: '$2.3M Settlement'
    },
    {
      name: 'Michael Rodriguez',
      case: 'Personal Injury',
      text: 'After my accident, Douglass Hicks Law Firm fought tirelessly to get me the compensation I deserved. Excellent service!',
      rating: 5,
      amount: '$850K Recovery'
    },
    {
      name: 'Jennifer Chen',
      case: 'Employment Discrimination',
      text: 'Professional, knowledgeable, and results-driven. They made a difficult process manageable and successful.',
      rating: 5,
      amount: '$445K Settlement'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Security Badge - LawFly Pro Integration */}
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg border border-green-400">
          <div className="flex items-center gap-2 text-sm font-bold">
            <Shield className="w-4 h-4" />
            <span>Powered by LawFly Pro</span>
          </div>
          <div className="text-xs opacity-90">Enterprise Security Active</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative bg-slate-900/95 backdrop-blur-xl border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/douglass-hicks" className="flex items-center">
              <Scale className="w-8 h-8 text-amber-500 mr-3" />
              <span className="text-2xl font-bold text-white">
                Douglass Hicks Law
              </span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#about" className="text-slate-300 hover:text-white transition-colors">About</Link>
              <Link href="#practice-areas" className="text-slate-300 hover:text-white transition-colors">Practice Areas</Link>
              <Link href="#results" className="text-slate-300 hover:text-white transition-colors">Results</Link>
              <Link href="#testimonials" className="text-slate-300 hover:text-white transition-colors">Testimonials</Link>
              <Link href="#contact" className="text-slate-300 hover:text-white transition-colors">Contact</Link>
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
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10"></div>
        
        <div className={`relative z-10 text-center max-w-6xl mx-auto px-4 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="inline-flex items-center gap-3 mb-8">
            <Award className="w-8 h-8 text-amber-400" />
            <span className="text-amber-400 font-bold text-lg">SERVING CLIENTS SINCE 1995</span>
            <Award className="w-8 h-8 text-amber-400" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="text-white">FIGHTING FOR</span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              JUSTICE
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-slate-300 mb-12 font-light leading-relaxed">
            Experienced civil rights and personal injury attorneys.<br />
            We don&apos;t get paid unless you win.
          </p>

          {/* Key Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-black text-amber-400 mb-2">$47M+</div>
              <p className="text-slate-300">Recovered for Clients</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-orange-400 mb-2">500+</div>
              <p className="text-slate-300">Cases Won</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-red-400 mb-2">28</div>
              <p className="text-slate-300">Years Experience</p>
            </div>
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
              href="#contact"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-white bg-transparent border-4 border-white rounded-xl hover:bg-white hover:text-slate-900 transition-all transform hover:scale-105"
            >
              <Calendar className="mr-3 h-6 w-6" />
              Schedule Meeting
            </Link>
          </div>

          {/* Free Consultation Note */}
          <div className="mt-8 text-amber-400 font-bold text-lg">
            24/7 Available • No Fee Unless We Win • Free Case Review
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              ABOUT DOUGLASS HICKS
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              For nearly three decades, our law firm has been a beacon of hope for those facing injustice. We combine legal expertise with unwavering dedication to achieve results that change lives.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 border border-slate-600">
                <h3 className="text-3xl font-bold text-white mb-6">Why Choose Our Firm?</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Check className="w-6 h-6 text-green-400 mt-1" />
                    <div>
                      <h4 className="text-lg font-bold text-white">Proven Track Record</h4>
                      <p className="text-slate-400">Over $47 million recovered for clients in the last decade</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Check className="w-6 h-6 text-green-400 mt-1" />
                    <div>
                      <h4 className="text-lg font-bold text-white">Personal Attention</h4>
                      <p className="text-slate-400">Every client receives direct access to experienced attorneys</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Check className="w-6 h-6 text-green-400 mt-1" />
                    <div>
                      <h4 className="text-lg font-bold text-white">No Fee Unless We Win</h4>
                      <p className="text-slate-400">Contingency fee structure means we only succeed when you do</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Check className="w-6 h-6 text-green-400 mt-1" />
                    <div>
                      <h4 className="text-lg font-bold text-white">24/7 Availability</h4>
                      <p className="text-slate-400">Legal emergencies don&apos;t wait for business hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-white/90 text-lg leading-relaxed">
                  &quot;To provide exceptional legal representation that levels the playing field between individuals and powerful institutions, ensuring that justice is not just for those who can afford it.&quot;
                </p>
                <div className="mt-6 text-right">
                  <div className="text-white font-bold">— Douglass Hicks</div>
                  <div className="text-white/80">Managing Partner</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-slate-700 rounded-xl">
                  <div className="text-3xl font-black text-amber-400 mb-2">98%</div>
                  <p className="text-slate-300">Success Rate</p>
                </div>
                <div className="text-center p-6 bg-slate-700 rounded-xl">
                  <div className="text-3xl font-black text-orange-400 mb-2">A+</div>
                  <p className="text-slate-300">BBB Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section id="practice-areas" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              PRACTICE AREAS
            </h2>
            <p className="text-xl text-slate-400">
              Comprehensive legal services to protect your rights and secure your future
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {practiceAreas.map((area, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 border border-slate-600 hover:border-amber-500 transition-all hover:scale-105">
                <area.icon className="w-16 h-16 text-amber-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">{area.title}</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">{area.description}</p>
                <div className="text-amber-400 font-bold">{area.cases}</div>
                <Link 
                  href={`#contact`}
                  className="inline-flex items-center text-orange-400 hover:text-orange-300 font-semibold mt-4"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              RECENT VICTORIES
            </h2>
            <p className="text-xl text-slate-400">
              Real results for real people facing real challenges
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-8 text-center">
              <div className="text-4xl font-black text-white mb-2">$2.3M</div>
              <div className="text-lg font-bold text-white mb-2">Civil Rights Settlement</div>
              <p className="text-white/80">Employment discrimination case against Fortune 500 company</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 text-center">
              <div className="text-4xl font-black text-white mb-2">$1.8M</div>
              <div className="text-lg font-bold text-white mb-2">Medical Malpractice</div>
              <p className="text-white/80">Surgical error resulting in permanent disability</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-center">
              <div className="text-4xl font-black text-white mb-2">$1.2M</div>
              <div className="text-lg font-bold text-white mb-2">Auto Accident</div>
              <p className="text-white/80">Truck collision with multiple injuries</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Justice Doesn&apos;t Wait</h3>
            <p className="text-xl text-white/90 mb-6">
              Every case is important. Every client deserves our best effort. Every victory moves us closer to a more just society.
            </p>
            <Link 
              href="tel:+1-555-LAW-FIRM"
              className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:scale-105 transition-all"
            >
              <Phone className="mr-2 h-5 w-5" />
              Discuss Your Case
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              CLIENT TESTIMONIALS
            </h2>
            <p className="text-xl text-slate-400">
              Hear from clients whose lives we&apos;ve helped transform
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 border border-slate-600">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <Quote className="w-8 h-8 text-amber-400 mb-4" />
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  &quot;{testimonial.text}&quot;
                </p>
                
                <div className="border-t border-slate-600 pt-6">
                  <div className="font-bold text-white text-lg">{testimonial.name}</div>
                  <div className="text-slate-400">{testimonial.case}</div>
                  <div className="text-green-400 font-bold mt-2">{testimonial.amount}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-900 via-orange-900 to-red-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black text-white mb-6">
              GET YOUR FREE CONSULTATION
            </h2>
            <p className="text-2xl text-white/90 leading-relaxed">
              Don&apos;t wait. Justice delayed is justice denied. Call now for your free, confidential case evaluation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-amber-400" />
                  <div>
                    <div className="font-bold text-white">(555) LAW-FIRM</div>
                    <div className="text-white/80">24/7 Emergency Line</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-amber-400" />
                  <div>
                    <div className="font-bold text-white">info@douglasshicks.law</div>
                    <div className="text-white/80">General Inquiries</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-amber-400" />
                  <div>
                    <div className="font-bold text-white">123 Justice Boulevard</div>
                    <div className="text-white/80">Downtown Legal District</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Clock className="w-6 h-6 text-amber-400" />
                  <div>
                    <div className="font-bold text-white">Available 24/7</div>
                    <div className="text-white/80">Emergency consultations</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Why Call Now?</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                  <div className="text-white">Statutes of limitations apply</div>
                </div>
                <div className="flex items-center gap-4">
                  <Users className="w-6 h-6 text-blue-400" />
                  <div className="text-white">Evidence preservation is critical</div>
                </div>
                <div className="flex items-center gap-4">
                  <Shield className="w-6 h-6 text-green-400" />
                  <div className="text-white">Free consultation, no obligation</div>
                </div>
                <div className="flex items-center gap-4">
                  <Award className="w-6 h-6 text-yellow-400" />
                  <div className="text-white">28 years of experience</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="mb-6">
              <Link 
                href="tel:+1-555-LAW-FIRM"
                className="inline-flex items-center px-16 py-8 text-3xl font-black text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl hover:scale-105 transition-all transform shadow-2xl"
              >
                <Phone className="mr-4 h-8 w-8" />
                CALL NOW: (555) LAW-FIRM
              </Link>
            </div>
            
            <div className="text-white/80 text-lg">
              Free consultation • No fee unless we win • Available 24/7
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
                Fighting for justice since 1995. We don&apos;t get paid unless you win.
              </p>
              <div className="flex items-center gap-4">
                <div className="text-amber-400 font-bold">Civil Rights</div>
                <div className="text-orange-400 font-bold">Personal Injury</div>
                <div className="text-red-400 font-bold">Employment Law</div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Practice Areas</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="#practice-areas" className="hover:text-white transition-colors">Civil Rights</Link></li>
                <li><Link href="#practice-areas" className="hover:text-white transition-colors">Personal Injury</Link></li>
                <li><Link href="#practice-areas" className="hover:text-white transition-colors">Business Law</Link></li>
                <li><Link href="#practice-areas" className="hover:text-white transition-colors">Employment Law</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="tel:+1-555-LAW-FIRM" className="hover:text-white transition-colors">(555) LAW-FIRM</Link></li>
                <li><Link href="mailto:info@douglasshicks.law" className="hover:text-white transition-colors">info@douglasshicks.law</Link></li>
                <li><span>123 Justice Boulevard</span></li>
                <li><span>Available 24/7</span></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-500 text-sm mb-4 md:mb-0">
                © 2025 Douglass Hicks Law Firm. All rights reserved.
              </p>
              
              {/* LawFly Pro Platform Credit */}
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-green-400" />
                <Link href="/" className="text-green-400 hover:text-green-300 font-medium">
                  Powered by LawFly Pro Platform
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}