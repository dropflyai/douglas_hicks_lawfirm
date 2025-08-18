'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Scale,
  ArrowLeft,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Shield,
  Users,
  Briefcase,
  Phone,
  MessageCircle,
  FileText,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  Star,
  Crown
} from 'lucide-react'

export default function PortalPage() {
  const [loginType, setLoginType] = useState('client') // 'client' or 'attorney'
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    caseNumber: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to appropriate dashboard
      if (loginType === 'client') {
        window.location.href = '/portal/client'
      } else {
        window.location.href = '/portal/attorney'
      }
    }, 2000)
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="relative bg-black/90 backdrop-blur-xl border-b border-gray-800">
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
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex min-h-screen">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            {/* Header */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  {loginType === 'client' ? (
                    <Users className="w-10 h-10 text-white" />
                  ) : (
                    <Briefcase className="w-10 h-10 text-white" />
                  )}
                </div>
              </div>
              <h2 className="text-4xl font-black text-white mb-2">
                {loginType === 'client' ? 'CLIENT PORTAL' : 'ATTORNEY PORTAL'}
              </h2>
              <p className="text-gray-400 text-lg">
                {loginType === 'client' 
                  ? 'Access your case information and legal documents'
                  : 'Manage cases and client communications'
                }
              </p>
            </div>

            {/* Login Type Toggle */}
            <div className="flex bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setLoginType('client')}
                className={`flex-1 py-3 px-4 rounded-md font-semibold transition-all ${
                  loginType === 'client'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Users className="w-5 h-5 mr-2 inline" />
                Client Login
              </button>
              <button
                onClick={() => setLoginType('attorney')}
                className={`flex-1 py-3 px-4 rounded-md font-semibold transition-all ${
                  loginType === 'attorney'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Briefcase className="w-5 h-5 mr-2 inline" />
                Attorney Login
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* Case Number Field (Client Only) */}
              {loginType === 'client' && (
                <div>
                  <label htmlFor="caseNumber" className="block text-sm font-semibold text-gray-300 mb-2">
                    Case Number
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      id="caseNumber"
                      name="caseNumber"
                      type="text"
                      required
                      value={formData.caseNumber}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="Enter your case number"
                    />
                  </div>
                </div>
              )}

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-300">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  `Sign In to ${loginType === 'client' ? 'Client' : 'Attorney'} Portal`
                )}
              </button>
            </form>

            {/* Additional Links */}
            <div className="text-center space-y-3">
              {loginType === 'client' && (
                <p className="text-gray-400">
                  Don&apos;t have access? 
                  <Link href="/#contact" className="text-blue-400 hover:text-blue-300 ml-1">
                    Contact your attorney
                  </Link>
                </p>
              )}
              
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <Link href="/resources" className="hover:text-white transition-colors">
                  Legal Resources
                </Link>
                <span>•</span>
                <Link href="/#contact" className="hover:text-white transition-colors">
                  Support
                </Link>
                <span>•</span>
                <Link href="/team" className="hover:text-white transition-colors">
                  Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Portal Benefits */}
        <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-gray-900 to-black items-center justify-center p-12">
          <div className="max-w-lg">
            <div className="text-center mb-12">
              <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
              <h3 className="text-3xl font-black text-white mb-4">
                {loginType === 'client' ? 'CHAMPIONSHIP CLIENT EXPERIENCE' : 'PROFESSIONAL CASE MANAGEMENT'}
              </h3>
              <p className="text-gray-400 text-lg">
                {loginType === 'client' 
                  ? 'Access your case 24/7 with our secure client portal'
                  : 'Manage your caseload with powerful attorney tools'
                }
              </p>
            </div>

            <div className="space-y-6">
              {loginType === 'client' ? (
                <>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-2">Case Documents</h4>
                      <p className="text-gray-400">Access all your legal documents, contracts, and case files instantly.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-2">Real-Time Updates</h4>
                      <p className="text-gray-400">Get instant notifications about case developments and deadlines.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-2">Direct Communication</h4>
                      <p className="text-gray-400">Message your legal team directly through secure channels.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-2">Billing & Payments</h4>
                      <p className="text-gray-400">View invoices, payment history, and make secure payments online.</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-2">Client Management</h4>
                      <p className="text-gray-400">Comprehensive client profiles, case histories, and communication logs.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-2">Calendar & Deadlines</h4>
                      <p className="text-gray-400">Track court dates, filing deadlines, and client appointments.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-2">Document Management</h4>
                      <p className="text-gray-400">Secure document storage, version control, and collaboration tools.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-2">Security & Compliance</h4>
                      <p className="text-gray-400">Bank-level encryption and compliance with legal industry standards.</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="mt-12 p-6 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl border border-blue-700/30">
              <div className="flex items-center mb-4">
                <Star className="w-6 h-6 text-yellow-400 mr-2" />
                <span className="text-white font-bold">Dream Team Technology</span>
              </div>
              <p className="text-gray-300 text-sm">
                Powered by the same excellence that delivered $4.9B in verdicts. 
                Secure, reliable, and designed for championship results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}