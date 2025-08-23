'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Shield, 
  Lock,
  Key,
  Eye,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Zap,
  Building,
  Award,
  TrendingUp,
  ChevronRight,
  Play,
  Sparkles,
  Database,
  Cloud,
  FileCheck,
  AlertTriangle
} from 'lucide-react'

export default function LawFlyPlatform() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)

  const securityFeatures = [
    {
      icon: Key,
      title: 'Customer-Controlled Encryption (BYOK)',
      description: 'You own your encryption keys, not us. Complete control over your data.',
      benefit: 'True data ownership',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      icon: Shield,
      title: 'Zero-Trust Architecture',
      description: 'Continuous verification, never trust. Every request is authenticated.',
      benefit: 'Maximum security',
      color: 'from-purple-600 to-pink-600'
    },
    {
      icon: Lock,
      title: 'Immutable Audit Trail',
      description: 'Tamper-proof logging with hash-chain verification.',
      benefit: 'Legal-grade evidence',
      color: 'from-green-600 to-emerald-600'
    },
    {
      icon: Eye,
      title: 'Provable Tenant Isolation',
      description: 'Cryptographically verified data separation between clients.',
      benefit: 'Absolute privacy',
      color: 'from-orange-600 to-red-600'
    }
  ]

  const pricingTiers = [
    {
      name: 'Essential Bundle',
      price: '$400',
      period: 'attorney/month',
      description: 'Security-first legal operations',
      features: [
        'Core platform with standard security',
        'Basic AI features and workflow',
        'Standard audit logging',
        'Multi-factor authentication',
        'Email support'
      ],
      highlighted: false,
      color: 'from-gray-600 to-gray-700'
    },
    {
      name: 'Professional Bundle',
      price: '$750',
      period: 'attorney/month',
      description: 'Most Popular - Complete security suite',
      features: [
        'Advanced AI features and custom workflows',
        'BYOK customer-controlled encryption',
        'Real-time compliance dashboard',
        'Immutable audit trail with hash verification',
        'Priority support with dedicated CSM'
      ],
      highlighted: true,
      color: 'from-blue-600 to-purple-600'
    },
    {
      name: 'Enterprise Bundle',
      price: '$1,200',
      period: 'attorney/month',
      description: 'Maximum security and isolation',
      features: [
        'VPC isolation per tenant',
        'Hardware Security Module (HSM)',
        'White-glove migration and onboarding',
        'Dedicated security engineer',
        'Custom integrations and development'
      ],
      highlighted: false,
      color: 'from-yellow-600 to-orange-600'
    }
  ]

  const competitors = [
    {
      name: 'Clio',
      security: 'Basic',
      byok: 'No',
      isolation: 'Trust Us',
      audit: 'Standard',
      score: '40%'
    },
    {
      name: 'PracticePanther',
      security: 'Standard',
      byok: 'No',
      isolation: 'Shared',
      audit: 'Basic',
      score: '45%'
    },
    {
      name: 'LexisNexis',
      security: 'Legacy',
      byok: 'No',
      isolation: 'Unknown',
      audit: 'Traditional',
      score: '50%'
    },
    {
      name: 'LawFly Pro',
      security: 'Security-First',
      byok: 'Yes',
      isolation: 'Provable',
      audit: 'Immutable',
      score: '95%'
    }
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % securityFeatures.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const currentSecurityFeature = securityFeatures[currentFeature]

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="relative bg-black/90 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Shield className="w-8 h-8 text-blue-500 mr-3" />
              <span className="text-2xl font-bold text-white">
                LawFly Pro
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#security" className="text-gray-300 hover:text-white transition-colors">
                Security
              </Link>
              <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="#demo" className="text-gray-300 hover:text-white transition-colors">
                Demo
              </Link>
              <Link href="/douglass-hicks" className="text-gray-300 hover:text-white transition-colors">
                Case Study
              </Link>
              <Link 
                href="mailto:demo@lawfly.pro"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:scale-105 transition-all font-semibold"
              >
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-blue-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10"></div>
        
        <div className={`relative z-10 text-center max-w-6xl mx-auto px-4 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="inline-flex items-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-blue-400" />
            <span className="text-blue-400 font-bold text-lg">SECURITY-FIRST LEGAL PLATFORM</span>
            <Shield className="w-8 h-8 text-blue-400" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="text-white">THE FIRST</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              SECURE
            </span>
            <br />
            <span className="text-white">LEGAL PLATFORM</span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-300 mb-12 font-light leading-relaxed">
            Built for firms that take security seriously.<br />
            Where security isn&apos;t an afterthought—it&apos;s the foundation.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link 
              href="mailto:demo@lawfly.pro"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-white bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-xl hover:scale-105 transition-all transform shadow-2xl"
            >
              <Shield className="mr-3 h-6 w-6" />
              Request Security Demo
            </Link>
            <Link 
              href="/douglass-hicks"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-white bg-transparent border-4 border-white rounded-xl hover:bg-white hover:text-black transition-all transform hover:scale-105"
            >
              <Building className="mr-3 h-6 w-6" />
              See Live Demo
            </Link>
          </div>

          {/* Key Stats */}
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-black text-blue-400 mb-2">2-3x</div>
              <p className="text-gray-400">More Secure Than Competitors</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-purple-400 mb-2">100%</div>
              <p className="text-gray-400">Customer-Controlled Keys</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-cyan-400 mb-2">Zero</div>
              <p className="text-gray-400">Trust Architecture</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-green-400 mb-2">99.9%</div>
              <p className="text-gray-400">Compliance Ready</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features Showcase */}
      <section id="security" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              SECURITY-FIRST ARCHITECTURE
            </h2>
            <p className="text-xl text-gray-400">
              Built from the ground up with enterprise-grade security
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Dynamic Feature Display */}
            <div className="relative">
              <div className={`bg-gradient-to-br ${currentSecurityFeature.color} rounded-2xl p-8 min-h-[400px] flex flex-col justify-center transition-all duration-500`}>
                <div className="text-center">
                  <currentSecurityFeature.icon className="w-20 h-20 text-white mx-auto mb-6" />
                  <h3 className="text-3xl font-bold text-white mb-4">{currentSecurityFeature.title}</h3>
                  <p className="text-xl text-white/90 mb-6">{currentSecurityFeature.description}</p>
                  <div className="inline-block bg-white/20 px-4 py-2 rounded-full">
                    <span className="text-white font-semibold">{currentSecurityFeature.benefit}</span>
                  </div>
                </div>
              </div>
              
              {/* Feature Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {securityFeatures.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFeature(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentFeature ? 'bg-blue-400' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Security Benefits List */}
            <div className="space-y-8">
              {securityFeatures.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div 
                    key={index}
                    className={`flex items-start gap-4 p-6 rounded-xl transition-all cursor-pointer ${
                      index === currentFeature 
                        ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500' 
                        : 'bg-gray-800/50 hover:bg-gray-700/50'
                    }`}
                    onClick={() => setCurrentFeature(index)}
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                      <p className="text-gray-400">{feature.description}</p>
                      <div className="text-sm text-blue-400 mt-2 font-semibold">
                        ✓ {feature.benefit}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Comparison */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              WHY CHOOSE LAWFLY PRO?
            </h2>
            <p className="text-xl text-gray-400">
              See how we compare to traditional legal platforms
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="text-left p-6 text-white font-bold">Platform</th>
                    <th className="text-center p-6 text-white font-bold">Security Approach</th>
                    <th className="text-center p-6 text-white font-bold">Customer Keys</th>
                    <th className="text-center p-6 text-white font-bold">Tenant Isolation</th>
                    <th className="text-center p-6 text-white font-bold">Audit Trail</th>
                    <th className="text-center p-6 text-white font-bold">Security Score</th>
                  </tr>
                </thead>
                <tbody>
                  {competitors.map((competitor, index) => (
                    <tr key={index} className={`${competitor.name === 'LawFly Pro' ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-t border-b border-blue-500' : 'border-b border-gray-700'}`}>
                      <td className="p-6">
                        <div className="font-bold text-white text-lg">{competitor.name}</div>
                        {competitor.name === 'LawFly Pro' && (
                          <div className="text-blue-400 text-sm font-semibold">← Security-First Platform</div>
                        )}
                      </td>
                      <td className="text-center p-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          competitor.security === 'Security-First' 
                            ? 'bg-green-900 text-green-400' 
                            : 'bg-gray-700 text-gray-400'
                        }`}>
                          {competitor.security}
                        </span>
                      </td>
                      <td className="text-center p-6">
                        {competitor.byok === 'Yes' ? (
                          <CheckCircle className="w-6 h-6 text-green-400 mx-auto" />
                        ) : (
                          <span className="text-red-400 font-semibold">✗</span>
                        )}
                      </td>
                      <td className="text-center p-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          competitor.isolation === 'Provable' 
                            ? 'bg-green-900 text-green-400' 
                            : 'bg-red-900 text-red-400'
                        }`}>
                          {competitor.isolation}
                        </span>
                      </td>
                      <td className="text-center p-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          competitor.audit === 'Immutable' 
                            ? 'bg-green-900 text-green-400' 
                            : 'bg-gray-700 text-gray-400'
                        }`}>
                          {competitor.audit}
                        </span>
                      </td>
                      <td className="text-center p-6">
                        <div className={`text-2xl font-bold ${
                          competitor.score === '95%' 
                            ? 'text-green-400' 
                            : 'text-gray-400'
                        }`}>
                          {competitor.score}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              SECURITY-FIRST PRICING
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Premium pricing for premium security. Complete legal operations partner.
            </p>
            <div className="inline-block bg-blue-900/30 border border-blue-500 rounded-full px-6 py-2">
              <span className="text-blue-400 font-semibold">80% margins through service integration</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div key={index} className={`relative rounded-2xl overflow-hidden ${
                tier.highlighted 
                  ? 'bg-gradient-to-br from-blue-900 to-purple-900 border-2 border-blue-500 transform scale-105' 
                  : 'bg-gray-800 border border-gray-700'
              }`}>
                {tier.highlighted && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                      MOST POPULAR
                    </div>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                    <p className="text-gray-400 mb-4">{tier.description}</p>
                    <div className="flex items-end justify-center gap-2">
                      <span className={`text-5xl font-black ${tier.highlighted ? 'text-white' : 'text-blue-400'}`}>
                        {tier.price}
                      </span>
                      <span className="text-gray-400 pb-2">/{tier.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    href="mailto:sales@lawfly.pro"
                    className={`block w-full text-center py-4 rounded-lg font-bold transition-all ${
                      tier.highlighted
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">
              All plans include our security-first foundation. No hidden fees.
            </p>
            <Link 
              href="mailto:enterprise@lawfly.pro"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold"
            >
              Need custom enterprise pricing?
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Live Demo CTA */}
      <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 via-purple-900 to-cyan-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-8">
            <Play className="w-8 h-8 text-blue-400" />
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <Building className="w-8 h-8 text-blue-400" />
          </div>
          
          <h2 className="text-5xl font-black text-white mb-8">
            SEE SECURITY IN ACTION
          </h2>
          <p className="text-2xl text-white/90 mb-12 leading-relaxed">
            Experience our security-first platform with a live demo featuring Douglass Hicks Law Firm—a real customer showcase.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/douglass-hicks"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl hover:scale-105 transition-all transform shadow-2xl"
            >
              <Building className="mr-3 h-6 w-6" />
              Live Customer Demo
            </Link>
            <Link 
              href="mailto:demo@lawfly.pro"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-white bg-transparent border-4 border-white rounded-xl hover:bg-white hover:text-blue-900 transition-all transform hover:scale-105"
            >
              <Shield className="mr-3 h-6 w-6" />
              Request Private Demo
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 mt-12 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Interactive Security Features</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Real Customer Data</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Live BYOK Demonstration</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Shield className="w-8 h-8 text-blue-500 mr-3" />
                <span className="text-2xl font-bold text-white">LawFly Pro</span>
              </div>
              <p className="text-gray-400 mb-4">
                The first legal platform built for firms that take security seriously. Where security isn't an afterthought—it's the foundation.
              </p>
              <div className="flex items-center gap-4">
                <div className="text-blue-400 font-bold">Security-First</div>
                <div className="text-purple-400 font-bold">BYOK Encryption</div>
                <div className="text-cyan-400 font-bold">Zero-Trust</div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#security" className="hover:text-white transition-colors">Security Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/douglass-hicks" className="hover:text-white transition-colors">Live Demo</Link></li>
                <li><Link href="mailto:demo@lawfly.pro" className="hover:text-white transition-colors">Request Demo</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="mailto:demo@lawfly.pro" className="hover:text-white transition-colors">Request Demo</Link></li>
                <li><Link href="mailto:security@lawfly.pro" className="hover:text-white transition-colors">Security Questions</Link></li>
                <li><Link href="mailto:sales@lawfly.pro" className="hover:text-white transition-colors">Sales Inquiries</Link></li>
                <li><Link href="mailto:support@lawfly.pro" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 LawFly Pro. All rights reserved. | Security-First Legal Platform | Built with Enterprise Architecture
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}