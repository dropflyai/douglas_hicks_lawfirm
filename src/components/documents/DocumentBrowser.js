'use client'

import { useState, useEffect, useRef } from 'react'
import {
  FileText, Image, FileVideo, Archive, Search, Filter, Grid,
  List, Eye, Edit3, MessageSquare, Share, Download, Upload,
  Folder, Star, Clock, User, Tag, ChevronRight, Plus,
  Highlight, Pen, Eraser, MousePointer, Square, Circle,
  Type, Undo, Redo, ZoomIn, ZoomOut, RotateCw, Save,
  Users, Lock, Shield, AlertTriangle, CheckCircle
} from 'lucide-react'

const DocumentBrowser = ({ caseId, userRole, onDocumentSelect }) => {
  const [documents, setDocuments] = useState([])
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [viewMode, setViewMode] = useState('grid') // grid, list
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [showUpload, setShowUpload] = useState(false)
  const [annotations, setAnnotations] = useState([])
  const [selectedTool, setSelectedTool] = useState('pointer')
  const [collaborators, setCollaborators] = useState([])
  
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)

  // Sample documents for demonstration
  useEffect(() => {
    const sampleDocs = [
      {
        id: 1,
        name: 'Complaint - Johnson v Metro.pdf',
        type: 'pdf',
        size: '2.3 MB',
        modified: '2024-08-23T14:30:00',
        author: 'Carl Douglas',
        tags: ['litigation', 'complaint', 'priority'],
        status: 'reviewed',
        annotations: 12,
        collaborators: ['Sarah Johnson', 'Michael Chen'],
        confidentiality: 'attorney-client',
        preview: '/documents/thumbnails/complaint.jpg'
      },
      {
        id: 2,
        name: 'Medical Records - Williams.pdf',
        type: 'pdf',
        size: '15.7 MB',
        modified: '2024-08-23T11:15:00',
        author: 'Jennifer Davis',
        tags: ['medical', 'evidence', 'confidential'],
        status: 'under-review',
        annotations: 8,
        collaborators: ['Maria Rodriguez'],
        confidentiality: 'privileged',
        preview: '/documents/thumbnails/medical.jpg'
      },
      {
        id: 3,
        name: 'Deposition Transcript - Chen.docx',
        type: 'docx',
        size: '1.1 MB',
        modified: '2024-08-22T16:45:00',
        author: 'Jamon Hicks',
        tags: ['deposition', 'testimony', 'draft'],
        status: 'draft',
        annotations: 25,
        collaborators: ['Carl Douglas', 'Sarah Johnson'],
        confidentiality: 'work-product',
        preview: '/documents/thumbnails/transcript.jpg'
      },
      {
        id: 4,
        name: 'Contract Analysis - Davis Construction.pdf',
        type: 'pdf',
        size: '4.2 MB',
        modified: '2024-08-21T09:20:00',
        author: 'Michael Chen',
        tags: ['contract', 'analysis', 'corporate'],
        status: 'final',
        annotations: 6,
        collaborators: ['Jennifer Davis'],
        confidentiality: 'confidential',
        preview: '/documents/thumbnails/contract.jpg'
      },
      {
        id: 5,
        name: 'Evidence Photos - Accident Scene.zip',
        type: 'archive',
        size: '156 MB',
        modified: '2024-08-20T13:10:00',
        author: 'Private Investigator',
        tags: ['evidence', 'photos', 'scene'],
        status: 'processed',
        annotations: 3,
        collaborators: ['Carl Douglas'],
        confidentiality: 'privileged',
        preview: '/documents/thumbnails/photos.jpg'
      }
    ]
    setDocuments(sampleDocs)
  }, [caseId])

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesFilter = filterType === 'all' || doc.type === filterType
    return matchesSearch && matchesFilter
  })

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return <FileText className="w-6 h-6 text-red-500" />
      case 'docx': return <FileText className="w-6 h-6 text-blue-500" />
      case 'image': return <Image className="w-6 h-6 text-green-500" />
      case 'video': return <FileVideo className="w-6 h-6 text-purple-500" />
      case 'archive': return <Archive className="w-6 h-6 text-orange-500" />
      default: return <FileText className="w-6 h-6 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'reviewed': return 'text-green-400 bg-green-400/10'
      case 'under-review': return 'text-yellow-400 bg-yellow-400/10'
      case 'draft': return 'text-blue-400 bg-blue-400/10'
      case 'final': return 'text-purple-400 bg-purple-400/10'
      case 'processed': return 'text-green-400 bg-green-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getConfidentialityColor = (level) => {
    switch (level) {
      case 'attorney-client': return 'text-red-400 bg-red-400/10'
      case 'privileged': return 'text-orange-400 bg-orange-400/10'
      case 'work-product': return 'text-yellow-400 bg-yellow-400/10'
      case 'confidential': return 'text-blue-400 bg-blue-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const handleDocumentClick = (doc) => {
    setSelectedDoc(doc)
    if (onDocumentSelect) {
      onDocumentSelect(doc)
    }
  }

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    // Handle file upload logic here
    console.log('Uploading files:', files)
    setShowUpload(false)
  }

  return (
    <div className="h-full bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <Folder className="w-8 h-8 text-yellow-400" />
          <div>
            <h2 className="text-2xl font-bold text-white">Document Browser</h2>
            <p className="text-gray-400">Case ID: {caseId} • {documents.length} documents</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Upload Button */}
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all"
          >
            <Upload className="w-5 h-5" />
            <span>Upload</span>
          </button>

          {/* View Mode Toggle */}
          <div className="flex border border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4 p-6 border-b border-gray-800">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents, tags, content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
        >
          <option value="all">All Types</option>
          <option value="pdf">PDF Documents</option>
          <option value="docx">Word Documents</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
          <option value="archive">Archives</option>
        </select>

        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors">
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Upload Documents</h3>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-300 mb-2">Click to select files</p>
              <p className="text-sm text-gray-500">Supported: PDF, DOC, DOCX, Images, ZIP</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip,.rar"
            />
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowUpload(false)}
                className="flex-1 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Grid/List */}
      <div className="flex-1 overflow-auto p-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                onClick={() => handleDocumentClick(doc)}
                className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-blue-500/50 hover:bg-gray-800/50 cursor-pointer transition-all group"
              >
                {/* Document Preview */}
                <div className="aspect-square bg-gray-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  {doc.preview ? (
                    <img src={doc.preview} alt={doc.name} className="w-full h-full object-cover" />
                  ) : (
                    getFileIcon(doc.type)
                  )}
                </div>

                {/* Document Info */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
                    {doc.name}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{doc.size}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                  </div>

                  <div className={`px-2 py-1 rounded text-xs font-medium ${getConfidentialityColor(doc.confidentiality)}`}>
                    <Shield className="w-3 h-3 inline mr-1" />
                    {doc.confidentiality}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{doc.author}</span>
                    <span>{new Date(doc.modified).toLocaleDateString()}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {doc.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                    {doc.tags.length > 2 && (
                      <span className="text-xs text-gray-500">+{doc.tags.length - 2}</span>
                    )}
                  </div>

                  {/* Collaboration Info */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-400">{doc.annotations}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-400">{doc.collaborators.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                onClick={() => handleDocumentClick(doc)}
                className="flex items-center space-x-4 p-4 bg-gray-900 border border-gray-800 rounded-lg hover:border-blue-500/50 hover:bg-gray-800/50 cursor-pointer transition-all"
              >
                {getFileIcon(doc.type)}
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{doc.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>{doc.size}</span>
                    <span>{doc.author}</span>
                    <span>{new Date(doc.modified).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(doc.status)}`}>
                    {doc.status}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getConfidentialityColor(doc.confidentiality)}`}>
                    <Shield className="w-3 h-3 inline mr-1" />
                    {doc.confidentiality}
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{doc.annotations}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{doc.collaborators.length}</span>
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Document Preview */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex">
          <div className="w-full h-full flex flex-col">
            {/* Document Viewer Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <div className="flex items-center space-x-4">
                {getFileIcon(selectedDoc.type)}
                <div>
                  <h3 className="font-semibold text-white">{selectedDoc.name}</h3>
                  <p className="text-sm text-gray-400">
                    {selectedDoc.author} • {new Date(selectedDoc.modified).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-800 rounded-lg">
                  <Download className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-800 rounded-lg">
                  <Share className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="p-2 hover:bg-gray-800 rounded-lg text-red-400"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Document Viewer will be implemented in DocumentViewer component */}
            <div className="flex-1 bg-gray-900 flex items-center justify-center">
              <div className="text-center">
                <Eye className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h4 className="text-xl text-gray-400 mb-2">Document Viewer</h4>
                <p className="text-gray-500">Full document viewer with annotation tools will be implemented here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DocumentBrowser