'use client';
import { useState, useEffect } from 'react';
import { 
  FileText, Folder, Search, Filter, Plus, Upload, Download,
  Eye, Edit, Share, Trash2, Star, Clock, User, Calendar,
  CheckCircle, AlertCircle, Lock, Shield, Tag, Hash,
  ArrowUp, ArrowDown, MoreVertical, Copy, Move, Archive,
  Brain, Zap, Target, Award, Settings, RefreshCw,
  PaperClip, Image, FileVideo, FileAudio, FileSpreadsheet,
  BarChart3
} from 'lucide-react';

export default function DocumentManagement() {
  const [activeView, setActiveView] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [sortBy, setSortBy] = useState('modified');
  const [sortOrder, setSortOrder] = useState('desc');

  // Mock document data
  const documentData = {
    folders: [
      { id: 1, name: 'Active Cases', count: 247, icon: Folder, color: 'text-blue-400' },
      { id: 2, name: 'Client Communications', count: 156, icon: Folder, color: 'text-green-400' },
      { id: 3, name: 'Court Filings', count: 89, icon: Folder, color: 'text-purple-400' },
      { id: 4, name: 'Contracts & Agreements', count: 67, icon: Folder, color: 'text-orange-400' },
      { id: 5, name: 'Research & Memos', count: 134, icon: Folder, color: 'text-yellow-400' },
      { id: 6, name: 'Templates', count: 45, icon: Folder, color: 'text-pink-400' }
    ],
    recentDocuments: [
      {
        id: 1,
        name: 'Motion for Summary Judgment - Rodriguez v LAPD.docx',
        type: 'Word Document',
        size: '2.4 MB',
        modified: '2025-01-18 2:30 PM',
        author: 'Carl Douglas',
        case: 'Rodriguez v. LAPD',
        status: 'Draft',
        tags: ['Motion', 'Summary Judgment', 'Police Misconduct'],
        icon: FileText,
        color: 'text-blue-400',
        privileged: true,
        aiSummary: 'Motion arguing excessive force based on Graham v. Connor standard'
      },
      {
        id: 2,
        name: 'Expert Witness Report - Johnson Medical.pdf',
        type: 'PDF Document',
        size: '1.8 MB',
        modified: '2025-01-17 4:15 PM',
        author: 'Dr. Sarah Mitchell',
        case: 'Johnson Medical Malpractice',
        status: 'Final',
        tags: ['Expert Report', 'Medical Malpractice'],
        icon: FileText,
        color: 'text-red-400',
        privileged: true,
        aiSummary: 'Medical expert analysis confirming standard of care violations'
      },
      {
        id: 3,
        name: 'Settlement Agreement Draft - Williams Case.docx',
        type: 'Word Document',
        size: '892 KB',
        modified: '2025-01-17 11:20 AM',
        author: 'Jennifer Adams',
        case: 'Williams Civil Rights',
        status: 'Review',
        tags: ['Settlement', 'Agreement', 'Civil Rights'],
        icon: FileText,
        color: 'text-green-400',
        privileged: true,
        aiSummary: 'Comprehensive settlement terms including injunctive relief'
      },
      {
        id: 4,
        name: 'Discovery Response - Chen Employment.pdf',
        type: 'PDF Document',
        size: '3.2 MB',
        modified: '2025-01-16 3:45 PM',
        author: 'Legal Team',
        case: 'Chen Employment Discrimination',
        status: 'Sent',
        tags: ['Discovery', 'Employment Law'],
        icon: FileText,
        color: 'text-purple-400',
        privileged: true,
        aiSummary: 'Complete discovery responses with supporting documentation'
      },
      {
        id: 5,
        name: 'Client Interview Video - Rodriguez.mp4',
        type: 'Video File',
        size: '245 MB',
        modified: '2025-01-15 10:30 AM',
        author: 'Carl Douglas',
        case: 'Rodriguez v. LAPD',
        status: 'Confidential',
        tags: ['Client Interview', 'Video'],
        icon: FileVideo,
        color: 'text-orange-400',
        privileged: true,
        aiSummary: 'Initial client interview discussing incident details'
      },
      {
        id: 6,
        name: 'Case Research - Police Misconduct Precedents.docx',
        type: 'Word Document',
        size: '1.1 MB',
        modified: '2025-01-14 9:15 AM',
        author: 'Research Team',
        case: 'General Research',
        status: 'Complete',
        tags: ['Research', 'Precedents', 'Police Misconduct'],
        icon: FileText,
        color: 'text-yellow-400',
        privileged: false,
        aiSummary: 'Comprehensive analysis of relevant case law and precedents'
      }
    ]
  };

  // Document analytics
  const documentAnalytics = {
    totalDocuments: 1247,
    totalSize: '12.8 GB',
    privilegedDocs: 982,
    recentActivity: 47,
    storageUsed: 64.3,
    averageAccessTime: '1.2s',
    securityScore: 98.7,
    complianceStatus: 'Full'
  };

  // AI document insights
  const aiInsights = {
    missingDocuments: [
      { case: 'Rodriguez v. LAPD', missing: 'Witness statement from Officer Johnson', priority: 'High' },
      { case: 'Johnson Medical', missing: 'Updated medical records', priority: 'Medium' }
    ],
    duplicateRisk: [
      { doc: 'Settlement Template v1.docx', similarity: 94, action: 'Archive older version' }
    ],
    accessRecommendations: [
      { doc: 'Expert Report - Johnson', suggestion: 'Share with opposing counsel per discovery rules' },
      { doc: 'Motion - Rodriguez', suggestion: 'File with court by January 25th deadline' }
    ]
  };

  const getFileIcon = (type) => {
    if (type.includes('Word')) return FileText;
    if (type.includes('PDF')) return FileText;
    if (type.includes('Video')) return FileVideo;
    if (type.includes('Audio')) return FileAudio;
    if (type.includes('Spreadsheet')) return FileSpreadsheet;
    if (type.includes('Image')) return Image;
    return FileText;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Draft': return 'bg-blue-500/20 text-blue-400';
      case 'Review': return 'bg-yellow-500/20 text-yellow-400';
      case 'Final': return 'bg-green-500/20 text-green-400';
      case 'Sent': return 'bg-purple-500/20 text-purple-400';
      case 'Confidential': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const filteredDocuments = documentData.recentDocuments.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.case.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleDocumentSelection = (docId) => {
    setSelectedDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Document Overview */}
      {activeView === 'recent' && (
        <>
          {/* Document Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-blue-300 text-sm font-semibold">Total Documents</p>
                  <p className="text-3xl font-bold text-white">{documentAnalytics.totalDocuments.toLocaleString()}</p>
                </div>
                <FileText className="w-10 h-10 text-blue-400" />
              </div>
              <div className="flex items-center gap-2">
                <ArrowUp className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 text-sm font-semibold">{documentAnalytics.recentActivity} new</span>
                <span className="text-gray-400 text-sm">this week</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-green-300 text-sm font-semibold">Privileged Docs</p>
                  <p className="text-3xl font-bold text-white">{documentAnalytics.privilegedDocs}</p>
                </div>
                <Shield className="w-10 h-10 text-green-400" />
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm font-semibold">{documentAnalytics.complianceStatus}</span>
                <span className="text-gray-400 text-sm">compliance</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-purple-300 text-sm font-semibold">Storage Used</p>
                  <p className="text-3xl font-bold text-white">{documentAnalytics.storageUsed}%</p>
                </div>
                <Archive className="w-10 h-10 text-purple-400" />
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400 text-sm font-semibold">{documentAnalytics.totalSize}</span>
                <span className="text-gray-400 text-sm">total size</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-900/30 to-orange-800/30 border border-orange-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-orange-300 text-sm font-semibold">Security Score</p>
                  <p className="text-3xl font-bold text-white">{documentAnalytics.securityScore}%</p>
                </div>
                <Award className="w-10 h-10 text-orange-400" />
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400 text-sm font-semibold">{documentAnalytics.averageAccessTime}</span>
                <span className="text-gray-400 text-sm">avg access</span>
              </div>
            </div>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search documents..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#f4c900] focus:outline-none"
                />
              </div>
            </div>
            <div className="flex gap-3 ml-4">
              <button className="px-4 py-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-[#f4c900] to-[#b68600] rounded-lg text-black font-semibold hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Document
              </button>
            </div>
          </div>

          {/* Document List */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Recent Documents</h3>
              <div className="flex items-center gap-3">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-gray-700 rounded-lg text-white text-sm"
                >
                  <option value="modified">Modified Date</option>
                  <option value="name">Name</option>
                  <option value="size">Size</option>
                  <option value="case">Case</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors"
                >
                  {sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {filteredDocuments.map((doc) => {
                const FileIcon = getFileIcon(doc.type);
                const isSelected = selectedDocuments.includes(doc.id);
                return (
                  <div key={doc.id} className={`p-4 rounded-xl border transition-colors ${
                    isSelected ? 'bg-blue-900/30 border-blue-500/30' : 'bg-gray-900/50 border-gray-700 hover:border-gray-600'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleDocumentSelection(doc.id)}
                            className="w-4 h-4 text-[#f4c900] bg-gray-700 border-gray-600 rounded focus:ring-[#f4c900]"
                          />
                          <FileIcon className={`w-8 h-8 ${doc.color}`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-white font-semibold">{doc.name}</h4>
                            {doc.privileged && <Lock className="w-4 h-4 text-red-400" title="Attorney-Client Privileged" />}
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(doc.status)}`}>
                              {doc.status}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3 text-sm">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-300">{doc.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-300">{doc.modified}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Hash className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-300">{doc.case}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Archive className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-300">{doc.size}</span>
                            </div>
                          </div>
                          
                          {/* AI Summary */}
                          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-3 mb-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Brain className="w-4 h-4 text-purple-400" />
                              <span className="text-purple-300 font-semibold text-sm">AI Summary</span>
                            </div>
                            <p className="text-gray-300 text-sm">{doc.aiSummary}</p>
                          </div>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {doc.tags.map((tag, idx) => (
                              <span key={idx} className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 ml-4">
                        <button className="p-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors" title="Download">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors" title="Share">
                          <Share className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors" title="More">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Document Insights */}
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-8 h-8 text-purple-400" />
              <div>
                <h3 className="text-xl font-bold text-white">AI Document Intelligence</h3>
                <p className="text-gray-400 text-sm">Automated document analysis and recommendations</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Missing Documents */}
              <div>
                <h4 className="text-white font-bold mb-4">Missing Documents Alert</h4>
                <div className="space-y-3">
                  {aiInsights.missingDocuments.map((alert, idx) => (
                    <div key={idx} className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-red-400" />
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          alert.priority === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {alert.priority}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm font-semibold">{alert.case}</p>
                      <p className="text-gray-400 text-xs">{alert.missing}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Access Recommendations */}
              <div>
                <h4 className="text-white font-bold mb-4">Action Recommendations</h4>
                <div className="space-y-3">
                  {aiInsights.accessRecommendations.map((rec, idx) => (
                    <div key={idx} className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-300 font-semibold text-sm">Action Required</span>
                      </div>
                      <p className="text-gray-300 text-sm font-semibold">{rec.doc}</p>
                      <p className="text-gray-400 text-xs">{rec.suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Storage Optimization */}
              <div>
                <h4 className="text-white font-bold mb-4">Storage Optimization</h4>
                <div className="space-y-3">
                  {aiInsights.duplicateRisk.map((dup, idx) => (
                    <div key={idx} className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Copy className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-300 font-semibold text-sm">Duplicate Risk</span>
                      </div>
                      <p className="text-gray-300 text-sm font-semibold">{dup.doc}</p>
                      <p className="text-gray-400 text-xs">{dup.similarity}% similar - {dup.action}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Document View Selector */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-2">
          <div className="flex gap-2">
            {[
              { id: 'recent', label: 'Recent', icon: Clock },
              { id: 'folders', label: 'Folders', icon: Folder },
              { id: 'search', label: 'Advanced Search', icon: Search },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                    activeView === tab.id
                      ? 'bg-gradient-to-r from-[#f4c900] to-[#b68600] text-black'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}