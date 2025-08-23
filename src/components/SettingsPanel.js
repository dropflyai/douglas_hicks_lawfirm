'use client';

import { useState, useEffect } from 'react';
import { 
  User, Lock, Bell, Palette, Building, Shield, 
  Save, Upload, Eye, EyeOff, Check, X, Mail,
  Phone, Globe, Calendar, Clock, DollarSign,
  FileText, Download, Trash2, Edit3, Plus,
  Monitor, Smartphone, Tablet, Sun, Moon,
  Volume2, VolumeX, Wifi, Database, Key,
  CreditCard, AlertTriangle, CheckCircle,
  Settings as SettingsIcon, ChevronRight
} from 'lucide-react';

export default function SettingsPanel() {
  const [activeSection, setActiveSection] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Profile Settings State
  const [profileData, setProfileData] = useState({
    firstName: 'Carl',
    lastName: 'Douglas',
    email: 'carl@douglasshicks.com',
    phone: '+1 (555) 123-4567',
    title: 'Founding Partner',
    bio: 'Experienced civil rights attorney with over 25 years of practice.',
    barNumber: 'CA123456',
    specialties: ['Civil Rights', 'Police Misconduct', 'Personal Injury'],
    avatar: null
  });

  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true,
    sessionTimeout: '30',
    loginNotifications: true,
    deviceTrust: true
  });

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    caseUpdates: true,
    clientMessages: true,
    billingSummary: true,
    deadlineReminders: true,
    courtDateAlerts: true,
    systemMaintenance: false,
    marketingEmails: false
  });

  // Firm Settings State
  const [firmSettings, setFirmSettings] = useState({
    firmName: 'Douglass & Hicks Law Firm',
    firmAddress: '123 Justice Blvd, Los Angeles, CA 90210',
    firmPhone: '+1 (555) 987-6543',
    firmEmail: 'info@douglasshicks.com',
    firmWebsite: 'www.douglasshicks.com',
    logo: null,
    primaryColor: '#3B82F6',
    secondaryColor: '#1E40AF',
    timezone: 'America/Los_Angeles',
    businessHours: {
      monday: { start: '09:00', end: '17:00', enabled: true },
      tuesday: { start: '09:00', end: '17:00', enabled: true },
      wednesday: { start: '09:00', end: '17:00', enabled: true },
      thursday: { start: '09:00', end: '17:00', enabled: true },
      friday: { start: '09:00', end: '17:00', enabled: true },
      saturday: { start: '10:00', end: '14:00', enabled: false },
      sunday: { start: '10:00', end: '14:00', enabled: false }
    }
  });

  // System Settings State
  const [systemSettings, setSystemSettings] = useState({
    theme: 'dark',
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12',
    currency: 'USD',
    autoSave: true,
    backupFrequency: 'daily',
    dataRetention: '7years'
  });

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'firm', label: 'Firm Settings', icon: Building },
    { id: 'system', label: 'System', icon: SettingsIcon },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'data', label: 'Data & Privacy', icon: Database }
  ];

  const handleSave = async (section) => {
    setSaveStatus('saving');
    setUnsavedChanges(false);
    
    // Simulate API call
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 2000);
    }, 1000);
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Personal Information</h3>
        
        {/* Avatar Upload */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Photo
            </button>
            <p className="text-gray-400 text-sm mt-2">JPG, PNG up to 5MB</p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 font-medium mb-2">First Name</label>
            <input
              type="text"
              value={profileData.firstName}
              onChange={(e) => {
                setProfileData({...profileData, firstName: e.target.value});
                setUnsavedChanges(true);
              }}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-medium mb-2">Last Name</label>
            <input
              type="text"
              value={profileData.lastName}
              onChange={(e) => {
                setProfileData({...profileData, lastName: e.target.value});
                setUnsavedChanges(true);
              }}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-medium mb-2">Email</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => {
                setProfileData({...profileData, email: e.target.value});
                setUnsavedChanges(true);
              }}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-medium mb-2">Phone</label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => {
                setProfileData({...profileData, phone: e.target.value});
                setUnsavedChanges(true);
              }}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-medium mb-2">Title</label>
            <input
              type="text"
              value={profileData.title}
              onChange={(e) => {
                setProfileData({...profileData, title: e.target.value});
                setUnsavedChanges(true);
              }}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-medium mb-2">Bar Number</label>
            <input
              type="text"
              value={profileData.barNumber}
              onChange={(e) => {
                setProfileData({...profileData, barNumber: e.target.value});
                setUnsavedChanges(true);
              }}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-gray-300 font-medium mb-2">Bio</label>
          <textarea
            rows={4}
            value={profileData.bio}
            onChange={(e) => {
              setProfileData({...profileData, bio: e.target.value});
              setUnsavedChanges(true);
            }}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            placeholder="Tell us about your experience and specialties..."
          />
        </div>

        <div className="mt-6">
          <label className="block text-gray-300 font-medium mb-2">Specialties</label>
          <div className="flex flex-wrap gap-2">
            {profileData.specialties.map((specialty, index) => (
              <span key={index} className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm flex items-center gap-2">
                {specialty}
                <button 
                  onClick={() => {
                    const newSpecialties = profileData.specialties.filter((_, i) => i !== index);
                    setProfileData({...profileData, specialties: newSpecialties});
                    setUnsavedChanges(true);
                  }}
                  className="hover:bg-blue-700 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button className="px-3 py-1 border border-gray-600 text-gray-400 rounded-full text-sm hover:bg-gray-700 transition-colors flex items-center gap-2">
              <Plus className="w-3 h-3" />
              Add Specialty
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Password & Authentication</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 font-medium mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={securitySettings.currentPassword}
                onChange={(e) => setSecuritySettings({...securitySettings, currentPassword: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">New Password</label>
            <input
              type="password"
              value={securitySettings.newPassword}
              onChange={(e) => setSecuritySettings({...securitySettings, newPassword: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">Confirm New Password</label>
            <input
              type="password"
              value={securitySettings.confirmPassword}
              onChange={(e) => setSecuritySettings({...securitySettings, confirmPassword: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-white font-semibold">Two-Factor Authentication</h4>
              <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
            </div>
            <button
              onClick={() => setSecuritySettings({...securitySettings, twoFactorEnabled: !securitySettings.twoFactorEnabled})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                securitySettings.twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-600'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                securitySettings.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
          {securitySettings.twoFactorEnabled && (
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              Configure 2FA
            </button>
          )}
        </div>

        <div className="mt-6">
          <label className="block text-gray-300 font-medium mb-2">Session Timeout (minutes)</label>
          <select
            value={securitySettings.sessionTimeout}
            onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500"
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="240">4 hours</option>
            <option value="480">8 hours</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Notification Preferences</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-700 rounded-lg">
              <h4 className="text-white font-semibold mb-4">Delivery Methods</h4>
              <div className="space-y-3">
                {[
                  { key: 'emailNotifications', label: 'Email', icon: Mail },
                  { key: 'pushNotifications', label: 'Push', icon: Bell },
                  { key: 'smsNotifications', label: 'SMS', icon: Phone }
                ].map(({ key, label, icon: Icon }) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">{label}</span>
                    </div>
                    <button
                      onClick={() => setNotificationSettings({...notificationSettings, [key]: !notificationSettings[key]})}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        notificationSettings[key] ? 'bg-blue-600' : 'bg-gray-600'
                      }`}
                    >
                      <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        notificationSettings[key] ? 'translate-x-5' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-gray-700 rounded-lg">
              <h4 className="text-white font-semibold mb-4">Case Notifications</h4>
              <div className="space-y-3">
                {[
                  { key: 'caseUpdates', label: 'Case Updates' },
                  { key: 'deadlineReminders', label: 'Deadline Reminders' },
                  { key: 'courtDateAlerts', label: 'Court Date Alerts' }
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-gray-300">{label}</span>
                    <button
                      onClick={() => setNotificationSettings({...notificationSettings, [key]: !notificationSettings[key]})}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        notificationSettings[key] ? 'bg-blue-600' : 'bg-gray-600'
                      }`}
                    >
                      <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        notificationSettings[key] ? 'translate-x-5' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-gray-700 rounded-lg">
              <h4 className="text-white font-semibold mb-4">Business Notifications</h4>
              <div className="space-y-3">
                {[
                  { key: 'clientMessages', label: 'Client Messages' },
                  { key: 'billingSummary', label: 'Billing Summary' },
                  { key: 'systemMaintenance', label: 'System Updates' }
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-gray-300">{label}</span>
                    <button
                      onClick={() => setNotificationSettings({...notificationSettings, [key]: !notificationSettings[key]})}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        notificationSettings[key] ? 'bg-blue-600' : 'bg-gray-600'
                      }`}
                    >
                      <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        notificationSettings[key] ? 'translate-x-5' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFirmSettings = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Firm Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 font-medium mb-2">Firm Name</label>
            <input
              type="text"
              value={firmSettings.firmName}
              onChange={(e) => setFirmSettings({...firmSettings, firmName: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-medium mb-2">Phone</label>
            <input
              type="tel"
              value={firmSettings.firmPhone}
              onChange={(e) => setFirmSettings({...firmSettings, firmPhone: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-medium mb-2">Email</label>
            <input
              type="email"
              value={firmSettings.firmEmail}
              onChange={(e) => setFirmSettings({...firmSettings, firmEmail: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-medium mb-2">Website</label>
            <input
              type="url"
              value={firmSettings.firmWebsite}
              onChange={(e) => setFirmSettings({...firmSettings, firmWebsite: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-gray-300 font-medium mb-2">Address</label>
          <textarea
            rows={3}
            value={firmSettings.firmAddress}
            onChange={(e) => setFirmSettings({...firmSettings, firmAddress: e.target.value})}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="mt-8">
          <h4 className="text-white font-semibold mb-4">Branding</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 font-medium mb-2">Primary Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={firmSettings.primaryColor}
                  onChange={(e) => setFirmSettings({...firmSettings, primaryColor: e.target.value})}
                  className="w-12 h-12 rounded-lg border border-gray-600"
                />
                <input
                  type="text"
                  value={firmSettings.primaryColor}
                  onChange={(e) => setFirmSettings({...firmSettings, primaryColor: e.target.value})}
                  className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-300 font-medium mb-2">Secondary Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={firmSettings.secondaryColor}
                  onChange={(e) => setFirmSettings({...firmSettings, secondaryColor: e.target.value})}
                  className="w-12 h-12 rounded-lg border border-gray-600"
                />
                <input
                  type="text"
                  value={firmSettings.secondaryColor}
                  onChange={(e) => setFirmSettings({...firmSettings, secondaryColor: e.target.value})}
                  className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        {unsavedChanges && (
          <div className="flex items-center gap-4">
            <span className="text-orange-400 text-sm">You have unsaved changes</span>
            <button
              onClick={() => handleSave(activeSection)}
              disabled={saveStatus === 'saving'}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {saveStatus === 'saving' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        )}
        {saveStatus === 'saved' && (
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle className="w-5 h-5" />
            <span>Changes saved successfully</span>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl p-4 sticky top-8">
            <nav className="space-y-2">
              {sections.map(section => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{section.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {activeSection === 'profile' && renderProfileSettings()}
          {activeSection === 'security' && renderSecuritySettings()}
          {activeSection === 'notifications' && renderNotificationSettings()}
          {activeSection === 'firm' && renderFirmSettings()}
          
          {/* Placeholder sections */}
          {activeSection === 'system' && (
            <div className="bg-gray-800 rounded-xl p-8 text-center">
              <SettingsIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">System Settings</h3>
              <p className="text-gray-400">Configure system preferences, themes, and regional settings</p>
            </div>
          )}
          
          {activeSection === 'billing' && (
            <div className="bg-gray-800 rounded-xl p-8 text-center">
              <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Billing Settings</h3>
              <p className="text-gray-400">Manage payment methods, subscriptions, and billing preferences</p>
            </div>
          )}
          
          {activeSection === 'data' && (
            <div className="bg-gray-800 rounded-xl p-8 text-center">
              <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Data & Privacy</h3>
              <p className="text-gray-400">Control your data, privacy settings, and export options</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}