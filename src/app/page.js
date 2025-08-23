'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Shield, 
  Building,
  ArrowRight,
  Star,
  Sparkles,
  Play,
  CheckCircle,
  Eye,
  Lock,
  Key,
  Zap,
  Users
} from 'lucide-react'

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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
              <Link href="/platform" className="text-gray-300 hover:text-white transition-colors">
                Platform
              </Link>
              <Link href="/douglass-hicks" className="text-gray-300 hover:text-white transition-colors">
                Live Demo
              </Link>
              <Link href="mailto:demo@lawfly.pro" className="text-gray-300 hover:text-white transition-colors">
                Contact
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
            <span className="text-white">LAWFLY</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              PRO
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-300 mb-12 font-light leading-relaxed">
            The first legal platform built for firms that take security seriously.<br />
            Where security isn&apos;t an afterthought—it&apos;s the foundation.
          </p>

          {/* Two Main Options */}
          <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
            
            {/* Platform Overview */}
            <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-2xl p-8 border border-blue-500">
              <div className="text-center">
                <Shield className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Platform Overview</h3>
                <p className="text-gray-300 mb-6">
                  Learn about our security-first architecture, pricing, and competitive advantages
                </p>
                <Link 
                  href="/platform"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:scale-105 transition-all"
                >
                  <Shield className="mr-2 h-5 w-5" />
                  Explore Platform
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Live Demo */}
            <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-2xl p-8 border border-green-500">
              <div className="text-center">
                <Building className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Live Customer Demo</h3>
                <p className="text-gray-300 mb-6">
                  See our platform in action with Douglass Hicks Law Firm—a real customer showcase
                </p>
                <Link 
                  href="/douglass-hicks"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:scale-105 transition-all"
                >
                  <Building className="mr-2 h-5 w-5" />
                  Live Demo
                  <Play className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Key Security Features Quick Preview */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <Key className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
              <div className="text-lg font-bold text-white">BYOK</div>
              <p className="text-gray-400 text-sm">Customer-Controlled Encryption</p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 text-blue-400 mx-auto mb-3" />
              <div className="text-lg font-bold text-white">Zero-Trust</div>
              <p className="text-gray-400 text-sm">Continuous Verification</p>
            </div>
            <div className="text-center">
              <Lock className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <div className="text-lg font-bold text-white">Immutable</div>
              <p className="text-gray-400 text-sm">Tamper-Proof Audit Trail</p>
            </div>
            <div className="text-center">
              <Eye className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <div className="text-lg font-bold text-white">Provable</div>
              <p className="text-gray-400 text-sm">Tenant Isolation</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="mailto:demo@lawfly.pro"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-white bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-xl hover:scale-105 transition-all transform shadow-2xl"
            >
              <Shield className="mr-3 h-6 w-6" />
              Request Security Demo
            </Link>
            <Link 
              href="mailto:security@lawfly.pro"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-white bg-transparent border-4 border-white rounded-xl hover:bg-white hover:text-black transition-all transform hover:scale-105"
            >
              <Sparkles className="mr-3 h-6 w-6" />
              Security Questions
            </Link>
          </div>
        </div>
      </section>

      {/* Why LawFly Pro Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              WHY LAWFLY PRO?
            </h2>
            <p className="text-xl text-gray-400">
              We didn&apos;t add security to a legal platform. We built legal software into security.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Traditional Legal Platforms</h3>
                    <ul className="text-gray-400 space-y-1">
                      <li>• Security added as afterthought</li>
                      <li>• Vendor controls your encryption keys</li>
                      <li>• "Trust us" approach to data isolation</li>
                      <li>• Manual compliance preparation</li>
                      <li>• AI uses your data for training</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">LawFly Pro Difference</h3>
                    <ul className="text-gray-400 space-y-1">
                      <li>• <span className="text-green-400">Security-native architecture from day one</span></li>
                      <li>• <span className="text-blue-400">You control your own encryption keys (BYOK)</span></li>
                      <li>• <span className="text-purple-400">Cryptographically provable tenant isolation</span></li>
                      <li>• <span className="text-yellow-400">Automated compliance with real-time monitoring</span></li>
                      <li>• <span className="text-cyan-400">Your data never trains our models</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">Security Comparison</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-red-900/20 rounded-lg border border-red-700">
                  <span className="text-gray-300">Other Platforms</span>
                  <span className="text-red-400 font-bold">40-50% Security</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-900/20 rounded-lg border border-green-700">
                  <span className="text-gray-300">LawFly Pro</span>
                  <span className="text-green-400 font-bold">95% Security ✓</span>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Link 
                  href="/platform"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold"
                >
                  See Full Comparison
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 via-purple-900 to-cyan-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-8">
            <Users className="w-8 h-8 text-blue-400" />
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <Shield className="w-8 h-8 text-blue-400" />
          </div>
          
          <h2 className="text-5xl font-black text-white mb-8">
            READY TO GET SECURE?
          </h2>
          <p className="text-2xl text-white/90 mb-12 leading-relaxed">
            Join the law firms who choose security-first legal operations. See why we&apos;re the platform that security-conscious firms trust.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="mailto:demo@lawfly.pro"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl hover:scale-105 transition-all transform shadow-2xl"
            >
              <Shield className="mr-3 h-6 w-6" />
              Request Demo
            </Link>
            <Link 
              href="mailto:security@lawfly.pro"
              className="inline-flex items-center px-12 py-6 text-xl font-black text-white bg-transparent border-4 border-white rounded-xl hover:bg-white hover:text-blue-900 transition-all transform hover:scale-105"
            >
              <Users className="mr-3 h-6 w-6" />
              Talk to Security Team
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 mt-12 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Customer-Controlled Keys</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Zero-Trust Architecture</span>
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
                The first legal platform built for firms that take security seriously. Where security isn&apos;t an afterthought—it&apos;s the foundation.
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
                <li><Link href="/platform" className="hover:text-white transition-colors">Platform Overview</Link></li>
                <li><Link href="/douglass-hicks" className="hover:text-white transition-colors">Live Demo</Link></li>
                <li><Link href="mailto:demo@lawfly.pro" className="hover:text-white transition-colors">Request Demo</Link></li>
                <li><Link href="mailto:security@lawfly.pro" className="hover:text-white transition-colors">Security Questions</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="mailto:demo@lawfly.pro" className="hover:text-white transition-colors">Request Demo</Link></li>
                <li><Link href="mailto:security@lawfly.pro" className="hover:text-white transition-colors">Security Team</Link></li>
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