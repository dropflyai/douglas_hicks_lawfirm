'use client';
import { useRouter } from 'next/navigation';
import { Shield, AlertTriangle, ArrowLeft, Lock, Scale } from 'lucide-react';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-[#f4c900] to-[#b68600] rounded-xl flex items-center justify-center">
            <Scale className="w-8 h-8 text-black" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#f4c900] to-[#b68600] bg-clip-text text-transparent">
              Douglas Hicks Law
            </h1>
            <p className="text-gray-400">Enterprise Security</p>
          </div>
        </div>

        {/* Main Error Display */}
        <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center">
              <Shield className="w-12 h-12 text-red-400" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-red-300 text-lg mb-6">
            You do not have permission to access the HR Management Suite
          </p>
          
          <div className="bg-black/30 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-yellow-400" />
              <h3 className="text-yellow-300 font-semibold">Security Information</h3>
            </div>
            <div className="text-left space-y-3 text-gray-300">
              <p className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                <span>HR data access requires specific role permissions</span>
              </p>
              <p className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                <span>This access attempt has been logged for security audit</span>
              </p>
              <p className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                <span>Contact HR Administrator for access requests</span>
              </p>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-4">
            <h4 className="text-white font-semibold mb-3">Authorized Roles for HR Access:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-purple-400">• Super Administrator</div>
              <div className="text-blue-400">• HR Administrator</div>
              <div className="text-green-400">• HR Manager</div>
              <div className="text-orange-400">• HR Specialist</div>
              <div className="text-yellow-400">• Partner Attorney (Analytics Only)</div>
              <div className="text-gray-400">• Contact IT for role updates</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/login')}
            className="px-6 py-3 bg-gradient-to-r from-[#f4c900] to-[#b68600] rounded-xl font-semibold text-black hover:shadow-xl hover:shadow-[#f4c900]/20 transition-all duration-300 flex items-center gap-2 justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
            Return to Login
          </button>
          
          <button
            onClick={() => router.push('/portal/attorney')}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold transition-colors flex items-center gap-2 justify-center"
          >
            <Scale className="w-5 h-5" />
            Attorney Portal
          </button>
        </div>

        {/* Contact Information */}
        <div className="mt-8 p-4 bg-gray-800/30 rounded-xl">
          <h4 className="text-white font-semibold mb-2">Need HR Access?</h4>
          <p className="text-gray-400 text-sm mb-3">
            Contact the HR Administrator to request appropriate role permissions
          </p>
          <div className="text-sm text-gray-300">
            <p>📧 hr.admin@douglashickslaw.com</p>
            <p>📞 (555) 123-4567 ext. 200</p>
          </div>
        </div>
      </div>
    </div>
  );
}