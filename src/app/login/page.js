'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Crown, Users, Scale, Lock, CheckCircle } from 'lucide-react';

export default function LoginPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const router = useRouter();

  // Mock users for demo (in production this would be a real login form)
  const mockUsers = [
    {
      id: 1,
      name: 'Douglas Hicks',
      email: 'douglas.hicks@lawfirm.com',
      role: 'Super Admin',
      department: 'Executive',
      avatar: 'DH',
      color: 'from-purple-600 to-purple-800',
      icon: Crown,
      description: 'Full system access - All modules available'
    },
    {
      id: 2,
      name: 'Sarah Wilson', 
      email: 'hr.admin@lawfirm.com',
      role: 'HR Administrator',
      department: 'Human Resources',
      avatar: 'SW',
      color: 'from-blue-600 to-blue-800',
      icon: Shield,
      description: 'Complete HR suite access + User management'
    },
    {
      id: 3,
      name: 'Lisa Martinez',
      email: 'hr.manager@lawfirm.com', 
      role: 'HR Manager',
      department: 'Human Resources',
      avatar: 'LM',
      color: 'from-green-600 to-green-800',
      icon: Users,
      description: 'HR recruitment, compliance & analytics access'
    },
    {
      id: 4,
      name: 'Jennifer Adams',
      email: 'hr.specialist@lawfirm.com',
      role: 'HR Specialist', 
      department: 'Human Resources',
      avatar: 'JA',
      color: 'from-orange-600 to-orange-800',
      icon: Users,
      description: 'HR recruitment & compliance (read-only analytics)'
    },
    {
      id: 5,
      name: 'Jamon Hicks',
      email: 'jamon.hicks@lawfirm.com',
      role: 'Partner Attorney',
      department: 'Legal',
      avatar: 'JH', 
      color: 'from-yellow-600 to-yellow-800',
      icon: Scale,
      description: 'Attorney portal + HR analytics access'
    },
    {
      id: 6,
      name: 'James Wilson',
      email: 'attorney@lawfirm.com',
      role: 'Associate Attorney',
      department: 'Legal', 
      avatar: 'JW',
      color: 'from-gray-600 to-gray-800',
      icon: Scale,
      description: 'Attorney portal access only'
    }
  ];

  const handleLogin = (user) => {
    // In production, this would set JWT tokens, sessions, etc.
    // For demo, we'll use localStorage and cookies
    localStorage.setItem('currentUser', JSON.stringify(user));
    document.cookie = `userEmail=${user.email}; path=/`;
    
    // Clear any existing navigation history for security
    sessionStorage.removeItem('secureNavigationHistory');
    
    // Redirect based on role
    if (user.role.includes('HR') || user.role === 'Super Admin') {
      router.push('/portal/hr');
    } else {
      router.push('/portal/attorney');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-[#f4c900] to-[#b68600] rounded-xl flex items-center justify-center">
              <Scale className="w-8 h-8 text-black" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#f4c900] to-[#b68600] bg-clip-text text-transparent">
                Douglas Hicks Law
              </h1>
              <p className="text-gray-400 text-lg">Enterprise Portal Access</p>
            </div>
          </div>
          <div className="max-w-2xl mx-auto">
            <p className="text-white text-xl mb-2">Secure Role-Based Access Control</p>
            <p className="text-gray-400">Select your user profile to access the appropriate portal and features</p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-red-400" />
            <div>
              <h3 className="text-red-300 font-semibold">Enterprise Security Notice</h3>
              <p className="text-gray-300 text-sm">
                This is a demo environment. In production, users would authenticate with secure credentials. 
                All HR data access is logged and monitored for compliance.
              </p>
            </div>
          </div>
        </div>

        {/* User Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {mockUsers.map((user) => {
            const Icon = user.icon;
            return (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`relative p-6 bg-gray-800/50 backdrop-blur-sm border rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  selectedUser?.id === user.id
                    ? 'border-[#f4c900] shadow-xl shadow-[#f4c900]/20'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                {selectedUser?.id === user.id && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#f4c900] to-[#b68600] rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-black" />
                  </div>
                )}
                
                <div className="text-center">
                  {/* Avatar */}
                  <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-r ${user.color} rounded-full flex items-center justify-center text-white text-xl font-bold`}>
                    {user.avatar}
                  </div>
                  
                  {/* User Info */}
                  <h3 className="text-xl font-bold text-white mb-1">{user.name}</h3>
                  <p className="text-[#f4c900] font-semibold mb-1">{user.role}</p>
                  <p className="text-gray-400 text-sm mb-4">{user.department}</p>
                  
                  {/* Icon & Description */}
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Icon className="w-5 h-5 text-[#f4c900]" />
                    <span className="text-gray-300 text-sm font-medium">Access Level</span>
                  </div>
                  <p className="text-gray-400 text-xs">{user.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Login Button */}
        {selectedUser && (
          <div className="text-center mt-8">
            <button
              onClick={() => handleLogin(selectedUser)}
              className="px-8 py-4 bg-gradient-to-r from-[#f4c900] to-[#b68600] rounded-xl font-bold text-lg text-black hover:shadow-xl hover:shadow-[#f4c900]/30 transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              <Shield className="w-6 h-6" />
              Access Portal as {selectedUser.name}
            </button>
            <p className="text-gray-400 text-sm mt-3">
              You will be redirected to the appropriate portal based on your role permissions
            </p>
          </div>
        )}

        {/* Role Permissions Info */}
        <div className="mt-12 max-w-4xl mx-auto">
          <h3 className="text-white text-xl font-bold mb-6 text-center">Access Control Matrix</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4">
              <h4 className="text-[#f4c900] font-semibold mb-3">HR Suite Access</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• <span className="text-purple-400">Super Admin:</span> Complete access to all modules</li>
                <li>• <span className="text-blue-400">HR Admin:</span> Full HR suite + user management</li>
                <li>• <span className="text-green-400">HR Manager:</span> Recruitment, compliance, analytics</li>
                <li>• <span className="text-orange-400">HR Specialist:</span> Recruitment + compliance only</li>
              </ul>
            </div>
            <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4">
              <h4 className="text-[#f4c900] font-semibold mb-3">Attorney Portal Access</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• <span className="text-yellow-400">Partners:</span> Full attorney portal + HR analytics</li>
                <li>• <span className="text-gray-400">Associates:</span> Attorney portal + case management</li>
                <li>• <span className="text-gray-400">Paralegals:</span> Limited attorney portal access</li>
                <li>• <span className="text-gray-400">Secretaries:</span> Basic attorney portal only</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}