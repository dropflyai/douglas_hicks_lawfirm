'use client';
import { ChevronLeft, ChevronRight, Home, Shield, History, User } from 'lucide-react';
import { useSecureNavigation } from '../hooks/useSecureNavigation';

export default function SecureNavigation({ showBreadcrumbs = true, showBackButton = true }) {
  const { 
    goBack, 
    canGoBack, 
    navigateToDefault, 
    getBreadcrumbs, 
    currentUser,
    clearHistory 
  } = useSecureNavigation();

  const breadcrumbs = getBreadcrumbs();

  const handleLogout = () => {
    clearHistory();
    localStorage.removeItem('currentUser');
    document.cookie = 'userEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/login';
  };

  if (!currentUser) return null;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between">
        {/* Left Side - Navigation Controls */}
        <div className="flex items-center gap-4">
          {/* Back Button */}
          {showBackButton && (
            <button
              onClick={goBack}
              disabled={!canGoBack}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                canGoBack
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
              title={canGoBack ? 'Go back to previous page' : 'No previous page available'}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back</span>
            </button>
          )}

          {/* Home Button */}
          <button
            onClick={navigateToDefault}
            className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-white"
            title="Go to your default portal"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">Home</span>
          </button>

          {/* History Indicator */}
          {breadcrumbs.length > 1 && (
            <div className="flex items-center gap-1 text-gray-400">
              <History className="w-4 h-4" />
              <span className="text-xs">{breadcrumbs.length} pages</span>
            </div>
          )}
        </div>

        {/* Center - Breadcrumbs */}
        {showBreadcrumbs && breadcrumbs.length > 1 && (
          <div className="flex items-center gap-2 flex-1 justify-center max-w-lg">
            <div className="flex items-center gap-1 overflow-x-auto">
              {breadcrumbs.map((crumb, index) => (
                <div key={`${crumb.path}-${crumb.timestamp}`} className="flex items-center gap-1">
                  <button
                    onClick={crumb.onClick}
                    disabled={crumb.isLast}
                    className={`px-2 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap ${
                      crumb.isLast
                        ? 'text-[#f4c900] bg-[#f4c900]/10'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                    title={`Go to ${crumb.title}`}
                  >
                    {crumb.title}
                  </button>
                  {!crumb.isLast && (
                    <ChevronRight className="w-3 h-3 text-gray-600 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Right Side - User Info & Controls */}
        <div className="flex items-center gap-3">
          {/* User Info */}
          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 bg-gradient-to-r from-[#f4c900] to-[#b68600] rounded-full flex items-center justify-center text-black font-bold text-xs">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="hidden md:block">
              <p className="text-white font-medium">{currentUser.name}</p>
              <p className="text-gray-400 text-xs">{currentUser.role}</p>
            </div>
          </div>

          {/* Security Indicator */}
          <div className="flex items-center gap-1 px-2 py-1 bg-green-900/30 border border-green-600 rounded-full">
            <Shield className="w-3 h-3 text-green-400" />
            <span className="text-green-300 text-xs font-medium">Secure</span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-red-300 text-sm transition-colors"
            title="Logout and clear session"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Navigation Security Notice */}
      <div className="mt-3 p-2 bg-blue-900/20 border border-blue-500/30 rounded-lg">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-400" />
          <p className="text-blue-300 text-xs">
            Navigation is secured and monitored. All page visits are logged for audit compliance.
          </p>
        </div>
      </div>
    </div>
  );
}