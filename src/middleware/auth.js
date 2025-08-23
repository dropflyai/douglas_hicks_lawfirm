// Enterprise Authentication & Authorization Middleware
// Douglas Hicks Law - HR Security System

import { NextResponse } from 'next/server';

// User roles and permissions
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  HR_ADMIN: 'hr_admin', 
  HR_MANAGER: 'hr_manager',
  HR_SPECIALIST: 'hr_specialist',
  ATTORNEY_PARTNER: 'attorney_partner',
  ATTORNEY_ASSOCIATE: 'attorney_associate',
  PARALEGAL: 'paralegal',
  LEGAL_SECRETARY: 'legal_secretary'
};

export const PERMISSIONS = {
  // HR Suite Access
  HR_FULL_ACCESS: 'hr_full_access',
  HR_READ_ONLY: 'hr_read_only',
  HR_RECRUITING: 'hr_recruiting',
  HR_COMPLIANCE: 'hr_compliance',
  HR_ANALYTICS: 'hr_analytics',
  HR_EMPLOYEE_DATA: 'hr_employee_data',
  
  // Attorney Portal Access
  ATTORNEY_PORTAL: 'attorney_portal',
  CASE_MANAGEMENT: 'case_management',
  CLIENT_DATA: 'client_data',
  BILLING: 'billing',
  
  // Administrative
  USER_MANAGEMENT: 'user_management',
  SYSTEM_ADMIN: 'system_admin',
  AUDIT_LOGS: 'audit_logs'
};

// Role-Permission Mapping
export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: [
    PERMISSIONS.HR_FULL_ACCESS,
    PERMISSIONS.ATTORNEY_PORTAL,
    PERMISSIONS.USER_MANAGEMENT,
    PERMISSIONS.SYSTEM_ADMIN,
    PERMISSIONS.AUDIT_LOGS,
    PERMISSIONS.CASE_MANAGEMENT,
    PERMISSIONS.CLIENT_DATA,
    PERMISSIONS.BILLING
  ],
  
  [ROLES.HR_ADMIN]: [
    PERMISSIONS.HR_FULL_ACCESS,
    PERMISSIONS.HR_RECRUITING,
    PERMISSIONS.HR_COMPLIANCE,
    PERMISSIONS.HR_ANALYTICS,
    PERMISSIONS.HR_EMPLOYEE_DATA,
    PERMISSIONS.USER_MANAGEMENT,
    PERMISSIONS.AUDIT_LOGS
  ],
  
  [ROLES.HR_MANAGER]: [
    PERMISSIONS.HR_RECRUITING,
    PERMISSIONS.HR_COMPLIANCE,
    PERMISSIONS.HR_ANALYTICS,
    PERMISSIONS.HR_EMPLOYEE_DATA,
    PERMISSIONS.AUDIT_LOGS
  ],
  
  [ROLES.HR_SPECIALIST]: [
    PERMISSIONS.HR_RECRUITING,
    PERMISSIONS.HR_COMPLIANCE,
    PERMISSIONS.HR_READ_ONLY
  ],
  
  [ROLES.ATTORNEY_PARTNER]: [
    PERMISSIONS.ATTORNEY_PORTAL,
    PERMISSIONS.CASE_MANAGEMENT,
    PERMISSIONS.CLIENT_DATA,
    PERMISSIONS.BILLING,
    PERMISSIONS.HR_ANALYTICS, // Partners can see HR analytics
    PERMISSIONS.AUDIT_LOGS
  ],
  
  [ROLES.ATTORNEY_ASSOCIATE]: [
    PERMISSIONS.ATTORNEY_PORTAL,
    PERMISSIONS.CASE_MANAGEMENT,
    PERMISSIONS.CLIENT_DATA
  ],
  
  [ROLES.PARALEGAL]: [
    PERMISSIONS.ATTORNEY_PORTAL,
    PERMISSIONS.CASE_MANAGEMENT
  ],
  
  [ROLES.LEGAL_SECRETARY]: [
    PERMISSIONS.ATTORNEY_PORTAL
  ]
};

// HR Protected Routes
const HR_ROUTES = [
  '/portal/hr',
  '/api/hr/',
  '/portal/hr/recruitment',
  '/portal/hr/analytics',
  '/portal/hr/compliance',
  '/portal/hr/employees'
];

// Mock user database (replace with real authentication)
const MOCK_USERS = {
  'douglas.hicks@lawfirm.com': {
    id: 1,
    name: 'Douglas Hicks',
    email: 'douglas.hicks@lawfirm.com',
    role: ROLES.SUPER_ADMIN,
    department: 'Executive',
    permissions: ROLE_PERMISSIONS[ROLES.SUPER_ADMIN]
  },
  'hr.admin@lawfirm.com': {
    id: 2,
    name: 'Sarah Wilson',
    email: 'hr.admin@lawfirm.com',
    role: ROLES.HR_ADMIN,
    department: 'Human Resources',
    permissions: ROLE_PERMISSIONS[ROLES.HR_ADMIN]
  },
  'hr.manager@lawfirm.com': {
    id: 3,
    name: 'Lisa Martinez',
    email: 'hr.manager@lawfirm.com',
    role: ROLES.HR_MANAGER,
    department: 'Human Resources',
    permissions: ROLE_PERMISSIONS[ROLES.HR_MANAGER]
  },
  'hr.specialist@lawfirm.com': {
    id: 4,
    name: 'Jennifer Adams',
    email: 'hr.specialist@lawfirm.com',
    role: ROLES.HR_SPECIALIST,
    department: 'Human Resources',
    permissions: ROLE_PERMISSIONS[ROLES.HR_SPECIALIST]
  },
  'jamon.hicks@lawfirm.com': {
    id: 5,
    name: 'Jamon Hicks',
    email: 'jamon.hicks@lawfirm.com',
    role: ROLES.ATTORNEY_PARTNER,
    department: 'Legal',
    permissions: ROLE_PERMISSIONS[ROLES.ATTORNEY_PARTNER]
  },
  'attorney@lawfirm.com': {
    id: 6,
    name: 'James Wilson',
    email: 'attorney@lawfirm.com',
    role: ROLES.ATTORNEY_ASSOCIATE,
    department: 'Legal',
    permissions: ROLE_PERMISSIONS[ROLES.ATTORNEY_ASSOCIATE]
  }
};

// Authentication Functions
export function getCurrentUser(request) {
  // In production, this would check JWT tokens, sessions, etc.
  // For demo, we'll use a simple email-based mock
  const userEmail = request.headers.get('x-user-email') || 'douglas.hicks@lawfirm.com';
  return MOCK_USERS[userEmail] || null;
}

export function hasPermission(user, permission) {
  if (!user || !user.permissions) return false;
  return user.permissions.includes(permission);
}

export function hasRole(user, role) {
  if (!user) return false;
  return user.role === role;
}

export function canAccessHR(user) {
  return hasPermission(user, PERMISSIONS.HR_FULL_ACCESS) ||
         hasPermission(user, PERMISSIONS.HR_READ_ONLY) ||
         hasPermission(user, PERMISSIONS.HR_RECRUITING) ||
         hasPermission(user, PERMISSIONS.HR_COMPLIANCE) ||
         hasPermission(user, PERMISSIONS.HR_ANALYTICS);
}

export function isHRRoute(pathname) {
  return HR_ROUTES.some(route => pathname.startsWith(route));
}

// Middleware for Next.js
export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for public routes
  if (pathname.startsWith('/_next') || 
      pathname.startsWith('/api/public') ||
      pathname === '/login' ||
      pathname === '/') {
    return NextResponse.next();
  }
  
  // Get current user
  const user = getCurrentUser(request);
  
  // Check if accessing HR routes
  if (isHRRoute(pathname)) {
    if (!user) {
      // Redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    if (!canAccessHR(user)) {
      // Access denied - redirect to unauthorized page
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
    
    // Log HR access for audit trail
    console.log(`HR Access: ${user.email} (${user.role}) accessed ${pathname} at ${new Date().toISOString()}`);
  }
  
  // Allow access
  return NextResponse.next();
}

// Configuration for Next.js middleware
export const config = {
  matcher: [
    '/portal/:path*',
    '/api/:path*'
  ]
};

// Utility functions for components
export function getUserDisplayInfo(user) {
  if (!user) return null;
  
  return {
    name: user.name,
    email: user.email,
    role: user.role,
    department: user.department,
    initials: user.name.split(' ').map(n => n[0]).join(''),
    isHRUser: canAccessHR(user),
    isAdmin: hasRole(user, ROLES.SUPER_ADMIN) || hasRole(user, ROLES.HR_ADMIN)
  };
}

export function getAvailableModules(user) {
  if (!user) return [];
  
  const modules = [];
  
  // Attorney Portal modules
  if (hasPermission(user, PERMISSIONS.ATTORNEY_PORTAL)) {
    modules.push({
      id: 'attorney-portal',
      name: 'Attorney Portal',
      path: '/portal/attorney',
      icon: 'Scale'
    });
  }
  
  // HR modules based on permissions
  if (canAccessHR(user)) {
    if (hasPermission(user, PERMISSIONS.HR_FULL_ACCESS) || hasPermission(user, PERMISSIONS.HR_RECRUITING)) {
      modules.push({
        id: 'hr-recruitment',
        name: 'HR Recruitment',
        path: '/portal/hr?tab=recruitment',
        icon: 'Brain'
      });
    }
    
    if (hasPermission(user, PERMISSIONS.HR_FULL_ACCESS) || hasPermission(user, PERMISSIONS.HR_ANALYTICS)) {
      modules.push({
        id: 'hr-analytics',
        name: 'HR Analytics',
        path: '/portal/hr?tab=analytics',
        icon: 'BarChart3'
      });
    }
    
    if (hasPermission(user, PERMISSIONS.HR_FULL_ACCESS) || hasPermission(user, PERMISSIONS.HR_COMPLIANCE)) {
      modules.push({
        id: 'hr-compliance',
        name: 'HR Compliance',
        path: '/portal/hr?tab=compliance',
        icon: 'Shield'
      });
    }
    
    // Full HR suite access
    if (hasPermission(user, PERMISSIONS.HR_FULL_ACCESS)) {
      modules.push({
        id: 'hr-suite',
        name: 'Complete HR Suite',
        path: '/portal/hr',
        icon: 'Crown'
      });
    }
  }
  
  return modules;
}