'use client'

import Link from 'next/link'
import { 
  Scale, 
  ArrowLeft,
  CheckCircle,
  DollarSign,
  Gavel,
  Award,
  TrendingUp
} from 'lucide-react'

export default function ResultsPage() {
  const civilResults = [
    {
      amount: "$8.0 Million",
      case: "Police Brutality Verdict",
      description: "Verdict against Los Angeles County for family of man choked to death by sheriff deputies",
      year: "2024",
      type: "Civil Rights"
    },
    {
      amount: "$4.9 Billion", 
      case: "Product Liability Verdict",
      description: "Record-breaking verdict against General Motors (Carl E. Douglas)",
      year: "Career Highlight",
      type: "Product Liability"
    },
    {
      amount: "$5.0 Million",
      case: "Wrongful Death Settlement", 
      description: "Major settlement for family in wrongful death case (Jamon R. Hicks)",
      year: "2023",
      type: "Wrongful Death"
    },
    {
      amount: "$1.576 Million",
      case: "Disability Discrimination",
      description: "Verdict against Greystar Management Company for Disability Discrimination",
      year: "2024", 
      type: "Civil Rights"
    },
    {
      amount: "$733,000",
      case: "Employment Discrimination",
      description: "Verdict for Superintendent against El Monte Union High School District",
      year: "2024",
      type: "Employment Law"
    },
    {
      amount: "$157,000",
      case: "Premises Liability",
      description: "Verdict against grocery store for slip and fall injuries",
      year: "2024",
      type: "Personal Injury"
    }
  ]

  const criminalResults = [
    {
      verdict: "NOT GUILTY",
      case: "Murder for Hire",
      description: "Celebrity esthetician charged with murder for hire - complete acquittal",
      significance: "High-profile case with extensive media coverage"
    },
    {
      verdict: "NOT GUILTY", 
      case: "Felony Assault with Deadly Weapon",
      description: "Defendant faced serious felony charges - achieved complete acquittal",
      significance: "Avoided potential life sentence"
    },
    {
      verdict: "NOT GUILTY",
      case: "Felony Grand Theft", 
      description: "Young woman charged with felony grand theft - complete acquittal",
      significance: "Protected client's future and career prospects"
    },
    {
      verdict: "NOT GUILTY",
      case: "Resisting Arrest",
      description: "Young man charged with resisting arrest - complete acquittal", 
      significance: "Prevented criminal record for young client"
    },
    {
      verdict: "HUNG JURY",
      case: "DUI and Child Endangerment",
      description: "Achieved hung jury in DUI and child endangerment case",
      significance: "Avoided conviction on serious charges affecting parental rights"
    },
    {
      verdict: "HUNG JURY", 
      case: "Battery on Police Officer",
      description: "Achieved hung jury in battery on officer case",
      significance: "Prevented felony conviction and potential prison sentence"
    }
  ]

  const practiceAreaStats = [
    {
      area: "Civil Rights",
      cases: "150+",
      successRate: "95%",
      avgSettlement: "$2.3M",
      icon: Scale
    },
    {
      area: "Personal Injury",
      cases: "300+", 
      successRate: "92%",
      avgSettlement: "$850K",
      icon: DollarSign
    },
    {
      area: "Criminal Defense",
      cases: "200+",
      successRate: "88%",
      avgSettlement: "Acquittal",
      icon: Gavel
    },
    {
      area: "Employment Law",
      cases: "100+",
      successRate: "90%", 
      avgSettlement: "$500K",
      icon: Award
    }
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="relative bg-black/90 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Scale className="w-8 h-8 text-blue-400 mr-3" />
              <span className="text-xl font-bold text-white">
                Douglass Hicks Law Firm
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#practice-areas" className="text-gray-300 hover:text-white transition-colors">
                Practice Areas
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/results" className="text-white font-semibold">
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
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-gray-900/20 to-blue-800/20"></div>
        
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
              <span className="text-white">Proven</span>
              <br />
              <span className="bg-gradient-to-r from-green-400 via-blue-500 to-green-600 bg-clip-text text-transparent">
                Results
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Our track record speaks for itself. From record-breaking verdicts to complete acquittals, 
              we deliver results that change lives.
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">$4.9B+</div>
                <p className="text-gray-400">Total Verdicts & Settlements</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">750+</div>
                <p className="text-gray-400">Cases Successfully Handled</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">30+</div>
                <p className="text-gray-400">Years of Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Area Statistics */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Success by Practice Area</h2>
            <p className="text-xl text-gray-400">
              Our proven track record across all areas of legal practice
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {practiceAreaStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="bg-black/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{stat.area}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cases:</span>
                      <span className="text-white font-semibold">{stat.cases}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Success Rate:</span>
                      <span className="text-green-400 font-semibold">{stat.successRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Avg Result:</span>
                      <span className="text-blue-400 font-semibold">{stat.avgSettlement}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Civil Verdicts & Settlements */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Civil Verdicts & Settlements</h2>
            <p className="text-xl text-gray-400">
              Recent victories in civil rights, personal injury, and employment law
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {civilResults.map((result, index) => (
              <div key={index} className="bg-black/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-3xl font-bold text-green-400">{result.amount}</span>
                    <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded">{result.year}</span>
                  </div>
                  <span className="text-sm text-gray-400 bg-gray-700/50 px-2 py-1 rounded">{result.type}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-3">{result.case}</h3>
                <p className="text-gray-400 text-sm">{result.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Criminal Defense Victories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Criminal Defense Victories</h2>
            <p className="text-xl text-gray-400">
              Complete acquittals and favorable outcomes in serious criminal cases
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {criminalResults.map((result, index) => (
              <div key={index} className="bg-black/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-xl font-bold text-green-400">{result.verdict}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-3">{result.case}</h3>
                <p className="text-gray-400 text-sm mb-4">{result.description}</p>
                
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-xs text-gray-300">
                    <span className="font-semibold">Significance:</span> {result.significance}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notable Recognition */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Notable Recognition</h2>
            <p className="text-xl text-gray-400">
              Our attorneys&rsquo; achievements and recognition in the legal community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-black/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700 text-center">
              <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">O.J. Simpson Dream Team</h3>
              <p className="text-gray-400 text-sm">Carl E. Douglas served as a key member of the legendary defense team</p>
            </div>

            <div className="bg-black/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700 text-center">
              <TrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Record-Breaking Verdicts</h3>
              <p className="text-gray-400 text-sm">$4.9 billion verdict against General Motors stands as a historic achievement</p>
            </div>

            <div className="bg-black/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700 text-center">
              <Gavel className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Legal Education</h3>
              <p className="text-gray-400 text-sm">Jamon R. Hicks teaches trial advocacy at prestigious law schools</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Get Results Like These for Your Case
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Contact our proven legal team for a free consultation about your case.
          </p>
          <Link 
            href="/#contact"
            className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all"
          >
            Get Free Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}