'use client'

import { useState, useEffect } from 'react'
import {
  Clock, GitBranch, User, Download, Eye, ArrowRight, 
  FileText, Shield, AlertTriangle, Check, X, 
  MoreVertical, Trash2, RotateCcw as Restore, Star,
  GitCompare, Lock, Unlock, Calendar, Tag, Filter,
  Activity, TrendingUp, AlertCircle, Info
} from 'lucide-react'

const DocumentVersionControl = ({ document, onVersionSelect, onClose }) => {
  const [versions, setVersions] = useState([])
  const [selectedVersions, setSelectedVersions] = useState([])
  const [auditLogs, setAuditLogs] = useState([])
  const [showAuditTrail, setShowAuditTrail] = useState(false)
  const [filterUser, setFilterUser] = useState('all')
  const [filterAction, setFilterAction] = useState('all')
  const [showCompare, setShowCompare] = useState(false)

  // Sample version history
  useEffect(() => {
    const sampleVersions = [
      {
        id: 'v1.0',
        version: '1.0',
        title: 'Initial Draft',
        author: 'Carl Douglas',
        timestamp: '2024-08-20T09:00:00',
        size: '2.1 MB',
        changes: 'Initial document creation',
        status: 'archived',
        isCurrent: false,
        annotations: 0,
        comments: 0,
        approvals: [],
        confidentiality: 'attorney-client',
        checksum: 'a1b2c3d4e5f6',
        locked: false
      },
      {
        id: 'v1.1',
        version: '1.1',
        title: 'Client Review Draft',
        author: 'Sarah Johnson',
        timestamp: '2024-08-21T14:30:00',
        size: '2.2 MB',
        changes: 'Added client feedback, revised section 3',
        status: 'reviewed',
        isCurrent: false,
        annotations: 5,
        comments: 12,
        approvals: ['Carl Douglas'],
        confidentiality: 'attorney-client',
        checksum: 'b2c3d4e5f6a1',
        locked: false
      },
      {
        id: 'v1.2',
        version: '1.2',
        title: 'Legal Review',
        author: 'Jamon Hicks',
        timestamp: '2024-08-22T11:15:00',
        size: '2.3 MB',
        changes: 'Legal compliance review, updated citations',
        status: 'under-review',
        isCurrent: false,
        annotations: 8,
        comments: 6,
        approvals: ['Carl Douglas', 'Sarah Johnson'],
        confidentiality: 'attorney-client',
        checksum: 'c3d4e5f6a1b2',
        locked: true
      },
      {
        id: 'v1.3',
        version: '1.3',
        title: 'Final Settlement Draft',
        author: 'Carl Douglas',
        timestamp: '2024-08-23T16:45:00',
        size: '2.3 MB',
        changes: 'Final revisions, ready for client signature',
        status: 'final',
        isCurrent: true,
        annotations: 12,
        comments: 3,
        approvals: ['Jamon Hicks', 'Sarah Johnson', 'Michael Chen'],
        confidentiality: 'attorney-client',
        checksum: 'd4e5f6a1b2c3',
        locked: false
      }
    ]

    const sampleAuditLogs = [
      {
        id: 1,
        timestamp: '2024-08-23T16:45:00',
        user: 'Carl Douglas',
        action: 'version_created',
        version: 'v1.3',
        details: 'Created version 1.3 - Final Settlement Draft',
        ipAddress: '192.168.1.100',
        userAgent: 'Chrome/116.0',
        severity: 'info'
      },
      {
        id: 2,
        timestamp: '2024-08-23T16:40:00',
        user: 'Michael Chen',
        action: 'document_approved',
        version: 'v1.3',
        details: 'Approved version 1.3 for final review',
        ipAddress: '192.168.1.101',
        userAgent: 'Chrome/116.0',
        severity: 'success'
      },
      {
        id: 3,
        timestamp: '2024-08-23T16:35:00',
        user: 'Sarah Johnson',
        action: 'annotation_added',
        version: 'v1.3',
        details: 'Added annotation: "Verify settlement amount with client"',
        ipAddress: '192.168.1.102',
        userAgent: 'Safari/17.0',
        severity: 'info'
      },
      {
        id: 4,
        timestamp: '2024-08-23T15:20:00',
        user: 'System',
        action: 'security_scan',
        version: 'v1.3',
        details: 'Automated security scan completed - No threats detected',
        ipAddress: 'system',
        userAgent: 'SecurityBot/1.0',
        severity: 'success'
      },
      {
        id: 5,
        timestamp: '2024-08-22T11:15:00',
        user: 'Jamon Hicks',
        action: 'version_locked',
        version: 'v1.2',
        details: 'Locked version 1.2 to prevent further changes during review',
        ipAddress: '192.168.1.103',
        userAgent: 'Chrome/116.0',
        severity: 'warning'
      },
      {
        id: 6,
        timestamp: '2024-08-21T14:30:00',
        user: 'Sarah Johnson',
        action: 'access_granted',
        version: 'v1.1',
        details: 'Granted document access to Michael Chen for paralegal review',
        ipAddress: '192.168.1.102',
        userAgent: 'Chrome/116.0',
        severity: 'info'
      },
      {
        id: 7,
        timestamp: '2024-08-20T09:00:00',
        user: 'Carl Douglas',
        action: 'document_created',
        version: 'v1.0',
        details: 'Initial document created with attorney-client privilege',
        ipAddress: '192.168.1.100',
        userAgent: 'Chrome/116.0',
        severity: 'info'
      }
    ]

    setVersions(sampleVersions)
    setAuditLogs(sampleAuditLogs)
  }, [document])

  const getStatusColor = (status) => {
    switch (status) {
      case 'final': return 'bg-green-500/10 text-green-400 border-green-500/20'
      case 'reviewed': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'under-review': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      case 'archived': return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'success': return 'text-green-400'
      case 'warning': return 'text-yellow-400'
      case 'error': return 'text-red-400'
      case 'info': return 'text-blue-400'
      default: return 'text-gray-400'
    }
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'success': return Check
      case 'warning': return AlertTriangle
      case 'error': return X
      case 'info': return Info
      default: return Activity
    }
  }

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString()
  }

  const handleVersionSelect = (version) => {
    if (selectedVersions.includes(version.id)) {
      setSelectedVersions(selectedVersions.filter(id => id !== version.id))
    } else {
      if (selectedVersions.length < 2) {
        setSelectedVersions([...selectedVersions, version.id])
      } else {
        setSelectedVersions([selectedVersions[1], version.id])
      }
    }
  }

  const handleCompareVersions = () => {
    if (selectedVersions.length === 2) {
      setShowCompare(true)
    }
  }

  const filteredAuditLogs = auditLogs.filter(log => {
    const userMatch = filterUser === 'all' || log.user === filterUser
    const actionMatch = filterAction === 'all' || log.action === filterAction
    return userMatch && actionMatch
  })

  const uniqueUsers = [...new Set(auditLogs.map(log => log.user))].filter(user => user !== 'System')
  const uniqueActions = [...new Set(auditLogs.map(log => log.action))]

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex">
      <div className="w-full max-w-6xl mx-auto bg-gray-900 border border-gray-700 rounded-xl m-4 flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center space-x-4">
            <GitBranch className="w-8 h-8 text-blue-400" />
            <div>
              <h2 className="text-2xl font-bold text-white">Document Version Control</h2>
              <p className="text-gray-400">{document?.name || 'Unknown Document'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAuditTrail(!showAuditTrail)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                showAuditTrail 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Activity className="w-5 h-5" />
              <span>Audit Trail</span>
            </button>

            {selectedVersions.length === 2 && (
              <button
                onClick={handleCompareVersions}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-all"
              >
                <GitCompare className="w-5 h-5" />
                <span>Compare</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          
          {/* Version History */}
          <div className={`${showAuditTrail ? 'w-1/2' : 'w-full'} flex flex-col border-r border-gray-800`}>
            <div className="p-4 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-2">Version History</h3>
              {selectedVersions.length > 0 && (
                <p className="text-sm text-gray-400">
                  {selectedVersions.length} version{selectedVersions.length > 1 ? 's' : ''} selected
                  {selectedVersions.length === 2 && ' (ready to compare)'}
                </p>
              )}
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-4">
              {versions.map((version, index) => (
                <div
                  key={version.id}
                  className={`bg-gray-800 border rounded-xl p-4 transition-all cursor-pointer ${
                    selectedVersions.includes(version.id)
                      ? 'border-blue-500 bg-blue-500/5'
                      : version.isCurrent
                        ? 'border-green-500/50 bg-green-500/5'
                        : 'border-gray-700 hover:border-gray-600 hover:bg-gray-800/50'
                  }`}
                  onClick={() => handleVersionSelect(version)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          version.isCurrent ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'
                        }`}>
                          {version.version}
                        </div>
                        {index < versions.length - 1 && (
                          <div className="w-px h-8 bg-gray-700 mt-2"></div>
                        )}
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-white">{version.title}</h4>
                          {version.isCurrent && (
                            <span className="px-2 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded text-xs font-medium">
                              CURRENT
                            </span>
                          )}
                          {version.locked && (
                            <Lock className="w-4 h-4 text-yellow-400" />
                          )}
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{version.changes}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                          <span className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>{version.author}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatTimestamp(version.timestamp)}</span>
                          </span>
                          <span>{version.size}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded border text-xs font-medium ${getStatusColor(version.status)}`}>
                        {version.status}
                      </span>
                      <button className="p-1 hover:bg-gray-700 rounded">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {/* Version Stats */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-4 text-gray-400">
                      <span className="flex items-center space-x-1">
                        <FileText className="w-3 h-3" />
                        <span>{version.annotations} annotations</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageSquare className="w-3 h-3" />
                        <span>{version.comments} comments</span>
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Shield className="w-3 h-3 text-red-400" />
                      <span className="text-red-400 text-xs">{version.confidentiality}</span>
                    </div>
                  </div>

                  {/* Approvals */}
                  {version.approvals.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <div className="text-xs text-gray-400 mb-1">Approved by:</div>
                      <div className="flex flex-wrap gap-1">
                        {version.approvals.map((approver, idx) => (
                          <span key={idx} className="px-2 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded text-xs">
                            <Check className="w-3 h-3 inline mr-1" />
                            {approver}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-4 flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onVersionSelect(version)
                      }}
                      className="flex items-center space-x-1 px-3 py-1 bg-blue-600/20 text-blue-400 rounded-md hover:bg-blue-600/30 transition-colors text-xs"
                    >
                      <Eye className="w-3 h-3" />
                      <span>View</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1 bg-gray-600/20 text-gray-400 rounded-md hover:bg-gray-600/30 transition-colors text-xs">
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </button>
                    {!version.isCurrent && (
                      <button className="flex items-center space-x-1 px-3 py-1 bg-green-600/20 text-green-400 rounded-md hover:bg-green-600/30 transition-colors text-xs">
                        <Restore className="w-3 h-3" />
                        <span>Restore</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Trail */}
          {showAuditTrail && (
            <div className="w-1/2 flex flex-col">
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Audit Trail</h3>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-gray-400">{filteredAuditLogs.length} entries</span>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex items-center space-x-3">
                  <select
                    value={filterUser}
                    onChange={(e) => setFilterUser(e.target.value)}
                    className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-sm text-white"
                  >
                    <option value="all">All Users</option>
                    {uniqueUsers.map(user => (
                      <option key={user} value={user}>{user}</option>
                    ))}
                  </select>
                  
                  <select
                    value={filterAction}
                    onChange={(e) => setFilterAction(e.target.value)}
                    className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-sm text-white"
                  >
                    <option value="all">All Actions</option>
                    {uniqueActions.map(action => (
                      <option key={action} value={action}>
                        {action.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-4">
                <div className="space-y-3">
                  {filteredAuditLogs.map((log, index) => {
                    const SeverityIcon = getSeverityIcon(log.severity)
                    return (
                      <div key={log.id} className="flex items-start space-x-3">
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            log.severity === 'success' ? 'bg-green-500/20 text-green-400' :
                            log.severity === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                            log.severity === 'error' ? 'bg-red-500/20 text-red-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            <SeverityIcon className="w-4 h-4" />
                          </div>
                          {index < filteredAuditLogs.length - 1 && (
                            <div className="w-px h-6 bg-gray-700 mt-2"></div>
                          )}
                        </div>
                        
                        <div className="flex-1 bg-gray-800 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-white text-sm">{log.user}</span>
                            <span className="text-xs text-gray-400">
                              {formatTimestamp(log.timestamp)}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-300 mb-2">{log.details}</p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span className="font-mono bg-gray-700 px-2 py-1 rounded">
                              {log.action.replace('_', ' ')}
                            </span>
                            {log.version && (
                              <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                                {log.version}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Compare Modal */}
        {showCompare && selectedVersions.length === 2 && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-2xl w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Compare Versions</h3>
                <button
                  onClick={() => setShowCompare(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {selectedVersions.map((versionId, idx) => {
                    const version = versions.find(v => v.id === versionId)
                    return (
                      <div key={versionId} className="bg-gray-800 rounded-lg p-4">
                        <h4 className="font-semibold text-white mb-2">
                          Version {version?.version} - {version?.title}
                        </h4>
                        <div className="text-sm text-gray-400 space-y-1">
                          <div>Author: {version?.author}</div>
                          <div>Date: {formatTimestamp(version?.timestamp)}</div>
                          <div>Size: {version?.size}</div>
                          <div>Status: {version?.status}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-400 mb-2">Comparison Options</h4>
                  <div className="space-y-2">
                    <button className="w-full px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                      Compare Content Side-by-Side
                    </button>
                    <button className="w-full px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                      Show Diff Highlights
                    </button>
                    <button className="w-full px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                      Export Comparison Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DocumentVersionControl