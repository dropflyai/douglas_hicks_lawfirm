'use client'

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
  CheckCircle
} from 'lucide-react'

export default function AboutPage() {
  const attorneys = [
    {
      name: "Carl E. Douglas",
      role: "Founding Partner",
      specialties: ["Criminal Defense", "Civil Rights", "Personal Injury"],
      bio: "Carl E. Douglas is a distinguished attorney who gained national recognition as a member of O.J. Simpson&rsquo;s criminal defense &lsquo;Dream Team.&rsquo; As former Managing Attorney at Johnnie L. Cochran, Jr.&rsquo;s law offices, Carl has represented high-profile celebrities including Michael Jackson, Jamie Foxx, and Queen Latifah. His most notable achievement includes securing a record-breaking $4.9 billion verdict against General Motors. With decades of experience in high-stakes litigation, Carl continues to fight for justice and civil rights.",
      achievements: [
        "$4.9B verdict against General Motors",
        "O.J. Simpson Dream Team member", 
        "Former Cochran Firm Managing Attorney",
        "Celebrity defense attorney",
        "30+ years of legal experience"
      ],
      education: "Juris Doctor, Law School",
      barAdmissions: ["California State Bar"]
    },
    {
      name: "Jamon R. Hicks", 
      role: "Partner",
      specialties: ["Civil Rights", "Wrongful Death", "Personal Injury", "Trial Advocacy"],
      bio: "Jamon R. Hicks joined the firm after working at the prestigious Cochran Firm, where he specialized in civil rights, wrongful death, and personal injury cases. As an accomplished trial advocate, Jamon has achieved multiple significant verdicts, including a $5 million wrongful death settlement. Beyond his practice, he shares his expertise as a trial advocacy professor at both Loyola Law School and West Los Angeles Law School, training the next generation of attorneys.",
      achievements: [
        "$5M wrongful death settlement",
        "Trial advocacy professor at Loyola Law School",
        "Former Cochran Firm attorney", 
        "Civil rights specialist",
        "Multiple significant verdicts"
      ],
      education: "Juris Doctor, Law School",
      barAdmissions: ["California State Bar"]
    },
    {
      name: "A'ja Simplis",
      role: "Senior Associate", 
      specialties: ["Civil Rights", "Personal Injury", "Employment Law"],
      bio: "A&rsquo;ja Simplis brings 15 years of comprehensive legal experience to the firm as a Senior Associate. Her extensive background spans multiple practice areas, with particular expertise in civil rights, personal injury, and employment law. A&rsquo;ja&rsquo;s dedication to client advocacy and her deep understanding of complex legal matters make her an invaluable member of the legal team.",
      achievements: [
        "15+ years legal experience",
        "Multi-practice expertise",
        "Senior Associate leadership",
        "Client advocacy specialist"
      ],
      education: "Juris Doctor, Law School", 
      barAdmissions: ["California State Bar"]
    },
    {
      name: "Bianca Perez",
      role: "Junior Associate",
      specialties: ["Employment Discrimination", "Civil Rights"],
      bio: "Bianca Perez is a dedicated Junior Associate who specializes in employment discrimination and civil rights cases. As an emerging talent in the legal field, Bianca brings fresh perspectives and unwavering commitment to fighting for justice. Her focus on employment law and civil rights aligns perfectly with the firm's mission of protecting those whose rights have been violated.",
      achievements: [
        "Employment discrimination specialist",
        "Civil rights advocate", 
        "Rising legal talent",
        "Client-focused approach"
      ],
      education: "Juris Doctor, Law School",
      barAdmissions: ["California State Bar"]
    },
    {
      name: "Kristen Devezin",
      role: "Executive Administrator",
      specialties: ["Case Management", "Client Relations", "Legal Operations"],
      bio: "Kristen Devezin serves as Executive Administrator with over 10 years of experience in the legal field. Her expertise in case management, client relations, and legal operations ensures that the firm runs smoothly and efficiently. Kristen's dedication to client service and operational excellence supports the attorneys in delivering the best possible representation.",
      achievements: [
        "10+ years legal field experience",
        "Executive leadership",
        "Operations specialist", 
        "Client service excellence"
      ],
      education: "Administrative Certification",
      certifications: ["Legal Administrative Professional"]
    }
  ]

  const firmValues = [
    {
      icon: Heart,
      title: "Compassionate Representation",
      description: "We understand that our clients are going through difficult times. We provide not just legal expertise, but emotional support throughout the process."
    },
    {
      icon: Scale,
      title: "Justice for All",
      description: "We believe everyone deserves quality legal representation, regardless of their background or circumstances. We fight for the underdog."
    },
    {
      icon: Award,
      title: "Proven Excellence", 
      description: "Our track record speaks for itself. From record-breaking verdicts to complete acquittals, we deliver results that change lives."
    },
    {
      icon: Users,
      title: "Client-Centered Approach",
      description: "Every client is unique, and so is every case. We tailor our approach to meet the specific needs and goals of each individual client."
    }
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
              <Link href="/#practice-areas" className="text-gray-300 hover:text-white transition-colors">
                Practice Areas
              </Link>
              <Link href="/about" className="text-white font-semibold">
                About Us
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
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-gray-900/20 to-blue-800/20"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">About</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Our Firm
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              A legacy of justice spanning decades, from the Dream Team to today&rsquo;s most challenging civil rights and personal injury cases.
            </p>
          </div>
        </div>
      </section>

      {/* Firm Mission */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Mission</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-300 mb-6">
                We represent people who have been personally injured and/or have had their civil rights violated. 
                Our mission is simple yet profound: we help people rebuild their lives, financially and emotionally.
              </p>
              <p className="text-lg text-gray-400">
                With a legacy rooted in the most high-profile cases in American legal history, we bring that same 
                level of dedication, expertise, and passion to every client we serve, regardless of the size of their case.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {firmValues.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="bg-black/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400 text-sm">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Attorney Profiles */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Legal Team</h2>
            <p className="text-xl text-gray-400">
              Meet the experienced attorneys and staff dedicated to fighting for justice
            </p>
          </div>

          <div className="space-y-12">
            {attorneys.map((attorney, index) => (
              <div key={index} className="bg-black/50 backdrop-blur-xl rounded-xl p-8 border border-gray-700">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="mb-6">
                      <h3 className="text-3xl font-bold text-white mb-2">{attorney.name}</h3>
                      <p className="text-blue-400 font-semibold text-lg mb-4">{attorney.role}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {attorney.specialties.map((specialty, idx) => (
                          <span key={idx} className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">{attorney.bio}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Education</h4>
                        <p className="text-gray-400">{attorney.education}</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Bar Admissions</h4>
                        {attorney.barAdmissions && attorney.barAdmissions.map((bar, idx) => (
                          <p key={idx} className="text-gray-400">{bar}</p>
                        ))}
                        {attorney.certifications && attorney.certifications.map((cert, idx) => (
                          <p key={idx} className="text-gray-400">{cert}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    <div className="bg-gray-900/50 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-white mb-4">Key Achievements</h4>
                      <div className="space-y-3">
                        {attorney.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <Star className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-1" />
                            <span className="text-gray-300 text-sm">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Fight for Your Rights?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Contact our experienced legal team for a free consultation about your case.
          </p>
          <Link 
            href="/#contact"
            className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all"
          >
            Get Free Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}