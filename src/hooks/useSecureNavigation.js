'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

export const useSecureNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [navigationHistory, setNavigationHistory] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [canGoBack, setCanGoBack] = useState(false);

  // Initialize user and navigation history
  useEffect(() => {
    const initializeNavigation = () => {
      // Get current user
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        setCurrentUser(JSON.parse(userData));
      }

      // Get navigation history
      const savedHistory = sessionStorage.getItem('secureNavigationHistory');
      if (savedHistory) {
        const history = JSON.parse(savedHistory);
        setNavigationHistory(history);
        setCanGoBack(history.length > 1);
      }
    };

    initializeNavigation();
  }, []);

  // Track page visits securely
  useEffect(() => {
    if (pathname && currentUser) {
      // Check if user has access to current route
      const hasAccess = checkRouteAccess(pathname, currentUser);
      
      if (hasAccess) {
        // Add to secure navigation history
        const newHistory = [...navigationHistory];
        
        // Don't duplicate consecutive same routes
        if (newHistory[newHistory.length - 1]?.path !== pathname) {
          newHistory.push({
            path: pathname,
            timestamp: Date.now(),
            userRole: currentUser.role,
            title: getPageTitle(pathname)
          });
          
          // Limit history to last 10 pages for performance
          if (newHistory.length > 10) {
            newHistory.shift();
          }
          
          setNavigationHistory(newHistory);
          setCanGoBack(newHistory.length > 1);
          
          // Save to session storage
          sessionStorage.setItem('secureNavigationHistory', JSON.stringify(newHistory));
          
          // Log navigation for audit
          console.log(`Navigation: ${currentUser.email} visited ${pathname} at ${new Date().toISOString()}`);
        }
      }
    }
  }, [pathname, currentUser, navigationHistory]);

  // Check if user has access to a specific route
  const checkRouteAccess = useCallback((path, user) => {
    if (!user) return false;

    const hrRoles = ['Super Admin', 'HR Administrator', 'HR Manager', 'HR Specialist'];
    const attorneyRoles = ['Super Admin', 'Partner Attorney', 'Associate Attorney', 'Paralegal', 'Legal Secretary'];
    
    // HR routes
    if (path.startsWith('/portal/hr')) {
      return hrRoles.includes(user.role) || user.role === 'Partner Attorney';
    }
    
    // Attorney routes
    if (path.startsWith('/portal/attorney')) {
      return attorneyRoles.includes(user.role);
    }
    
    // Public routes
    if (['/login', '/unauthorized', '/'].includes(path)) {
      return true;
    }
    
    return false;
  }, []);

  // Get page title for breadcrumbs
  const getPageTitle = useCallback((path) => {
    const titleMap = {
      '/': 'Home',
      '/login': 'Login',
      '/portal/attorney': 'Attorney Portal',
      '/portal/hr': 'HR Management Suite',
      '/unauthorized': 'Access Denied'
    };
    
    // Check for query parameters (HR module tabs)
    if (path.includes('/portal/hr')) {
      const url = new URL(path, window.location.origin);
      const tab = url.searchParams.get('tab');
      if (tab) {
        const tabTitles = {
          'dashboard': 'HR Dashboard',
          'recruitment': 'AI Recruitment Hub',
          'analytics': 'HR Analytics',
          'compliance': 'Compliance Center',
          'security': 'Security Vault',
          'employee-portal': 'Employee Portal',
          'legal-specific': 'Legal Industry Tools',
          'integrations': 'Integration Platform'
        };
        return tabTitles[tab] || 'HR Management Suite';
      }
    }
    
    return titleMap[path] || 'Page';
  }, []);

  // Secure back navigation
  const goBack = useCallback(() => {
    if (navigationHistory.length > 1) {
      // Remove current page
      const newHistory = [...navigationHistory];
      newHistory.pop();
      
      // Get previous page
      const previousPage = newHistory[newHistory.length - 1];
      
      if (previousPage && checkRouteAccess(previousPage.path, currentUser)) {
        // Update history
        setNavigationHistory(newHistory);
        sessionStorage.setItem('secureNavigationHistory', JSON.stringify(newHistory));
        
        // Navigate securely
        router.push(previousPage.path);
        
        // Log secure navigation
        console.log(`Secure Back Navigation: ${currentUser.email} returned to ${previousPage.path}`);
      } else {
        // Fallback to safe default
        navigateToDefault();
      }
    } else {
      navigateToDefault();
    }
  }, [navigationHistory, currentUser, router, checkRouteAccess]);

  // Navigate to user's default portal
  const navigateToDefault = useCallback(() => {
    if (!currentUser) {
      router.push('/login');
      return;
    }

    const hrRoles = ['Super Admin', 'HR Administrator', 'HR Manager', 'HR Specialist'];
    const defaultRoute = hrRoles.includes(currentUser.role) ? '/portal/hr' : '/portal/attorney';
    
    router.push(defaultRoute);
    
    // Reset navigation history
    const newHistory = [{
      path: defaultRoute,
      timestamp: Date.now(),
      userRole: currentUser.role,
      title: getPageTitle(defaultRoute)
    }];
    
    setNavigationHistory(newHistory);
    sessionStorage.setItem('secureNavigationHistory', JSON.stringify(newHistory));
  }, [currentUser, router, getPageTitle]);

  // Secure navigation to specific route
  const navigateTo = useCallback((path) => {
    if (checkRouteAccess(path, currentUser)) {
      router.push(path);
    } else {
      console.warn(`Access denied: ${currentUser?.email} attempted to access ${path}`);
      router.push('/unauthorized');
    }
  }, [currentUser, router, checkRouteAccess]);

  // Get breadcrumb trail
  const getBreadcrumbs = useCallback(() => {
    return navigationHistory.slice(-5).map((item, index) => ({
      ...item,
      isLast: index === navigationHistory.length - 1,
      onClick: () => {
        if (index < navigationHistory.length - 1) {
          // Navigate to specific history point
          const targetHistory = navigationHistory.slice(0, index + 1);
          setNavigationHistory(targetHistory);
          sessionStorage.setItem('secureNavigationHistory', JSON.stringify(targetHistory));
          router.push(item.path);
        }
      }
    }));
  }, [navigationHistory, router]);

  // Clear navigation history (for logout)
  const clearHistory = useCallback(() => {
    setNavigationHistory([]);
    setCanGoBack(false);
    sessionStorage.removeItem('secureNavigationHistory');
  }, []);

  return {
    goBack,
    canGoBack,
    navigateTo,
    navigateToDefault,
    getBreadcrumbs,
    clearHistory,
    currentPath: pathname,
    navigationHistory,
    currentUser
  };
};

export default useSecureNavigation;