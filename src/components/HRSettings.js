'use client';

import { useState, useEffect } from 'react';
import { 
  Settings, Shield, Users, Clock, DollarSign, Bell, Mail, Calendar,
  Database, Lock, Key, Globe, Smartphone, Monitor, FileText, Download,
  Upload, RefreshCw, AlertTriangle, CheckCircle, Info, Eye, EyeOff,
  Save, X, Plus, Edit3, Trash2, Copy, ExternalLink, Search, Filter,
  Building, MapPin, Phone, Briefcase, GraduationCap, Star, Target,
  Zap, Activity, BarChart3, PieChart, TrendingUp, Award, Flag,
  Bookmark, Tag, Share2, MessageSquare, Heart, Stethoscope
} from 'lucide-react';

export default function HRSettings() {
  const [activeSection, setActiveSection] = useState('general');
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [settingsChanged, setSettingsChanged] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  // Settings Data
  const [generalSettings, setGeneralSettings] = useState({
    companyName: 'Douglas & Hicks Law Firm',
    companyAddress: '123 Legal Plaza, Los Angeles, CA 90210',
    companyPhone: '(555) 123-4567',
    companyEmail: 'hr@douglashickslaw.com',
    companyWebsite: 'https://www.douglashickslaw.com',
    fiscalYearStart: 'January',
    timezone: 'Pacific/Los_Angeles',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12-hour',
    currency: 'USD',
    language: 'English'
  });

  const [securitySettings, setSecuritySettings] = useState({
    passwordPolicy: {
      minLength: 12,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      passwordExpiry: 90,
      preventReuse: 5
    },
    twoFactorAuth: true,
    sessionTimeout: 30,
    maxFailedLogins: 5,
    accountLockoutDuration: 15,
    ipWhitelist: [],
    auditLogging: true,
    dataEncryption: true,
    sslRequired: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: {
      newHires: true,
      payrollReminders: true,
      benefitsDeadlines: true,
      complianceAlerts: true,
      performanceReviews: true,
      timeOffRequests: true,
      birthdaysAnniversaries: true,
      systemUpdates: false
    },
    smsNotifications: {
      urgentAlerts: true,
      approvalRequests: false,
      reminders: false
    },
    inAppNotifications: {
      realTimeUpdates: true,
      weeklyDigest: true,
      monthlyReports: true
    }
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    payrollProvider: 'ADP',
    timekeepingSystem: 'Kronos',
    benefitsProvider: 'Multiple',
    backgroundCheckProvider: 'First Advantage',
    learningManagement: 'Cornerstone OnDemand',
    applicantTracking: 'Workday',
    googleWorkspace: true,
    microsoftOffice: true,
    slackIntegration: false,
    zoomIntegration: true
  });

  const [complianceSettings, setComplianceSettings] = useState({
    retentionPolicies: {
      employeeRecords: 7, // years
      payrollRecords: 4,
      benefitsRecords: 6,
      performanceReviews: 3,
      disciplinaryActions: 7,
      trainingRecords: 5
    },
    auditSettings: {
      autoAuditSchedule: 'quarterly',
      auditNotificationDays: 30,
      complianceReporting: true,
      thirdPartyAudits: true,
      lastAudit: '2025-06-15',
      nextAudit: '2025-09-15'
    },
    hipaaCompliance: {
      enabled: true,
      riskAssessmentFrequency: 'annual',
      businessAssociateAgreements: true,
      employeeTraining: true,
      incidentReporting: true,
      lastRiskAssessment: '2025-01-15',
      nextRiskAssessment: '2026-01-15'
    }
  });

  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    backupRetention: 30, // days
    encryptBackups: true,
    offSiteBackup: true,
    backupVerification: true,
    lastBackup: '2025-08-18 19:00:00',
    backupLocation: 'AWS S3 (Encrypted)'
  });

  const settingSections = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'compliance', label: 'Compliance', icon: FileText },
    { id: 'backup', label: 'Backup & Recovery', icon: Database },
    { id: 'audit', label: 'Audit Logs', icon: Activity }
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6">Company Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 font-medium mb-2">Company Name</label>
            <input
              type="text"
              value={generalSettings.companyName}
              onChange={(e) => setGeneralSettings({...generalSettings, companyName: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-medium mb-2">Company Email</label>
            <input
              type="email"
              value={generalSettings.companyEmail}
              onChange={(e) => setGeneralSettings({...generalSettings, companyEmail: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-300 font-medium mb-2">Company Address</label>
            <input
              type="text"
              value={generalSettings.companyAddress}
              onChange={(e) => setGeneralSettings({...generalSettings, companyAddress: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              value={generalSettings.companyPhone}
              onChange={(e) => setGeneralSettings({...generalSettings, companyPhone: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-medium mb-2">Website</label>
            <input
              type="url"
              value={generalSettings.companyWebsite}
              onChange={(e) => setGeneralSettings({...generalSettings, companyWebsite: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6">Regional Settings</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-300 font-medium mb-2">Timezone</label>
            <select
              value={generalSettings.timezone}
              onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Pacific/Los_Angeles">Pacific Time</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-300 font-medium mb-2">Date Format</label>
            <select
              value={generalSettings.dateFormat}
              onChange={(e) => setGeneralSettings({...generalSettings, dateFormat: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-300 font-medium mb-2">Currency</label>
            <select
              value={generalSettings.currency}
              onChange={(e) => setGeneralSettings({...generalSettings, currency: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="CAD">CAD - Canadian Dollar</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6">Password Policy</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 font-medium mb-2">Minimum Length</label>
            <input
              type="number"
              value={securitySettings.passwordPolicy.minLength}
              onChange={(e) => setSecuritySettings({
                ...securitySettings,
                passwordPolicy: {...securitySettings.passwordPolicy, minLength: parseInt(e.target.value)}
              })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-medium mb-2">Password Expiry (days)</label>
            <input
              type="number"
              value={securitySettings.passwordPolicy.passwordExpiry}
              onChange={(e) => setSecuritySettings({
                ...securitySettings,
                passwordPolicy: {...securitySettings.passwordPolicy, passwordExpiry: parseInt(e.target.value)}
              })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {[
            { key: 'requireUppercase', label: 'Require Uppercase' },
            { key: 'requireLowercase', label: 'Require Lowercase' },
            { key: 'requireNumbers', label: 'Require Numbers' },
            { key: 'requireSpecialChars', label: 'Require Special Characters' }
          ].map(({key, label}) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={securitySettings.passwordPolicy[key]}
                onChange={(e) => setSecuritySettings({
                  ...securitySettings,
                  passwordPolicy: {...securitySettings.passwordPolicy, [key]: e.target.checked}
                })}
                className="w-5 h-5 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
              />
              <span className="text-gray-300">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6">Access Security</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-gray-300 font-medium">Two-Factor Authentication</span>
              <p className="text-gray-500 text-sm">Require 2FA for all users</p>
            </div>
            <input
              type="checkbox"
              checked={securitySettings.twoFactorAuth}
              onChange={(e) => setSecuritySettings({...securitySettings, twoFactorAuth: e.target.checked})}
              className="w-6 h-6 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
            />
          </label>
          
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-gray-300 font-medium">SSL Required</span>
              <p className="text-gray-500 text-sm">Force HTTPS connections</p>
            </div>
            <input
              type="checkbox"
              checked={securitySettings.sslRequired}
              onChange={(e) => setSecuritySettings({...securitySettings, sslRequired: e.target.checked})}
              className="w-6 h-6 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
            />
          </label>
          
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-gray-300 font-medium">Audit Logging</span>
              <p className="text-gray-500 text-sm">Log all user activities</p>
            </div>
            <input
              type="checkbox"
              checked={securitySettings.auditLogging}
              onChange={(e) => setSecuritySettings({...securitySettings, auditLogging: e.target.checked})}
              className="w-6 h-6 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
            />
          </label>
        </div>
      </div>
    </div>
  );

  const renderComplianceSettings = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6">HIPAA Compliance</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-gray-300 font-medium">HIPAA Compliance Enabled</span>
              <p className="text-gray-500 text-sm">Enable HIPAA privacy and security controls</p>
            </div>
            <input
              type="checkbox"
              checked={complianceSettings.hipaaCompliance.enabled}
              onChange={(e) => setComplianceSettings({
                ...complianceSettings,
                hipaaCompliance: {...complianceSettings.hipaaCompliance, enabled: e.target.checked}
              })}
              className="w-6 h-6 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
            />
          </label>
          
          <div>
            <label className="block text-gray-300 font-medium mb-2">Risk Assessment Frequency</label>
            <select
              value={complianceSettings.hipaaCompliance.riskAssessmentFrequency}
              onChange={(e) => setComplianceSettings({
                ...complianceSettings,
                hipaaCompliance: {...complianceSettings.hipaaCompliance, riskAssessmentFrequency: e.target.value}
              })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="quarterly">Quarterly</option>
              <option value="annual">Annual</option>
              <option value="biannual">Bi-Annual</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6">Data Retention Policies</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(complianceSettings.retentionPolicies).map(([policy, years]) => (
            <div key={policy}>
              <label className="block text-gray-300 font-medium mb-2 capitalize">
                {policy.replace(/([A-Z])/g, ' $1')} (Years)
              </label>
              <input
                type="number"
                value={years}
                onChange={(e) => setComplianceSettings({
                  ...complianceSettings,
                  retentionPolicies: {...complianceSettings.retentionPolicies, [policy]: parseInt(e.target.value)}
                })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBackupSettings = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6">Backup Configuration</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-300 font-medium mb-2">Backup Frequency</label>
            <select
              value={backupSettings.backupFrequency}
              onChange={(e) => setBackupSettings({...backupSettings, backupFrequency: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-300 font-medium mb-2">Retention Period (Days)</label>
            <input
              type="number"
              value={backupSettings.backupRetention}
              onChange={(e) => setBackupSettings({...backupSettings, backupRetention: parseInt(e.target.value)})}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {[
            { key: 'autoBackup', label: 'Automatic Backup', desc: 'Enable scheduled automatic backups' },
            { key: 'encryptBackups', label: 'Encrypt Backups', desc: 'Encrypt all backup files' },
            { key: 'offSiteBackup', label: 'Off-site Backup', desc: 'Store backups in remote location' },
            { key: 'backupVerification', label: 'Backup Verification', desc: 'Verify backup integrity automatically' }
          ].map(({key, label, desc}) => (
            <label key={key} className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-gray-300 font-medium">{label}</span>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
              <input
                type="checkbox"
                checked={backupSettings[key]}
                onChange={(e) => setBackupSettings({...backupSettings, [key]: e.target.checked})}
                className="w-6 h-6 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
              />
            </label>
          ))}
        </div>

        <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <div>
              <p className="text-green-400 font-semibold">Last Backup Successful</p>
              <p className="text-green-300 text-sm">{backupSettings.lastBackup}</p>
              <p className="text-green-300 text-sm">Location: {backupSettings.backupLocation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">HR System Settings</h1>
        <button
          onClick={() => setShowSaveModal(true)}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 font-semibold"
        >
          <Save className="w-5 h-5" />
          Save All Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 sticky top-6">
            <h3 className="text-white font-semibold mb-4">Settings Categories</h3>
            <nav className="space-y-2">
              {settingSections.map(section => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {activeSection === 'general' && renderGeneralSettings()}
          {activeSection === 'security' && renderSecuritySettings()}
          {activeSection === 'compliance' && renderComplianceSettings()}
          {activeSection === 'backup' && renderBackupSettings()}
          
          {/* Placeholder sections */}
          {['users', 'notifications', 'integrations', 'audit'].includes(activeSection) && (
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
              <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                {settingSections.find(s => s.id === activeSection)?.label} Settings
              </h3>
              <p className="text-gray-400">Advanced configuration options will be available here</p>
            </div>
          )}
        </div>
      </div>

      {/* Save Confirmation Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="text-center mb-6">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Save Settings</h3>
                <p className="text-gray-400">Are you sure you want to save all changes?</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowSaveModal(false);
                    setSettingsChanged(false);
                    // Save logic would go here
                  }}
                  className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}