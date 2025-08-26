'use client'

import { useState, useRef, useEffect } from 'react'
import { Move, Settings, Minimize2, Maximize2, X } from 'lucide-react'

const FloatingRoleSwitcher = ({ userRole }) => {
  const [position, setPosition] = useState({ x: 20, y: 200 })
  const [isDragging, setIsDragging] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const dragRef = useRef(null)
  const dragOffset = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return
      
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  const handleMouseDown = (e) => {
    if (!dragRef.current) return
    
    const rect = dragRef.current.getBoundingClientRect()
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
    setIsDragging(true)
  }

  // Always show the role switcher (removed dev-only restriction)

  return (
    <>
      {/* Minimized State */}
      {isMinimized && (
        <div
          className="fixed z-50 cursor-move"
          style={{ left: position.x, top: position.y }}
          ref={dragRef}
          onMouseDown={handleMouseDown}
        >
          <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-full p-3 shadow-xl hover:shadow-2xl transition-all">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-gray-300">{userRole?.title?.split(' ')[0]}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsMinimized(false)
                }}
                className="p-1 hover:bg-gray-700 rounded-full transition-colors"
              >
                <Maximize2 className="w-3 h-3 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Expanded State */}
      {!isMinimized && (
        <div
          className="fixed z-50"
          style={{ left: position.x, top: position.y }}
        >
          <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-2xl">
            {/* Header with Drag Handle */}
            <div
              className="flex items-center justify-between p-3 border-b border-gray-700/50 cursor-move"
              ref={dragRef}
              onMouseDown={handleMouseDown}
            >
              <div className="flex items-center space-x-2">
                <Move className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-white">Role Switcher</span>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1 hover:bg-gray-700 rounded transition-colors"
                >
                  <Settings className="w-3 h-3 text-gray-400" />
                </button>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 hover:bg-gray-700 rounded transition-colors"
                >
                  <Minimize2 className="w-3 h-3 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-3 min-w-[200px]">
              {/* Current Role Display */}
              <div className="mb-3">
                <div className="flex items-center space-x-3 p-2 bg-gray-800/50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">
                      {userRole?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-white text-sm">{userRole?.name}</div>
                    <div className="text-xs text-gray-400">{userRole?.title}</div>
                  </div>
                </div>
              </div>

              {/* Role Selector */}
              <div className="mb-3">
                <label className="text-xs text-gray-400 block mb-1">Switch Role</label>
                <select
                  value={userRole?.id || ''}
                  onChange={(e) => {
                    if (e.target.value === 'hr') {
                      window.open('/portal/hr', '_blank')
                    } else {
                      const newUrl = new URL(window.location)
                      newUrl.searchParams.set('role', e.target.value)
                      window.location.href = newUrl.toString()
                    }
                  }}
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg text-sm border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  <option value="attorney">👨‍💼 Senior Partner</option>
                  <option value="case_manager">📋 Case Manager</option>
                  <option value="paralegal">📚 Paralegal</option>
                  <option value="legal_assistant">🏢 Legal Assistant</option>
                  <option value="secretary">📞 Secretary</option>
                  <option value="hr">👥 HR Manager</option>
                  <option value="admin">🔐 Administrator</option>
                </select>
              </div>

              {/* Quick Actions (when expanded) */}
              {isExpanded && (
                <div className="space-y-2">
                  <div className="text-xs text-gray-400 mb-2">Quick Actions</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-xs hover:bg-blue-600/30 transition-colors">
                      Portal
                    </button>
                    <button className="px-2 py-1 bg-green-600/20 text-green-400 rounded text-xs hover:bg-green-600/30 transition-colors">
                      Cases
                    </button>
                    <button className="px-2 py-1 bg-purple-600/20 text-purple-400 rounded text-xs hover:bg-purple-600/30 transition-colors">
                      Maya AI
                    </button>
                    <button className="px-2 py-1 bg-orange-600/20 text-orange-400 rounded text-xs hover:bg-orange-600/30 transition-colors">
                      Reports
                    </button>
                  </div>
                </div>
              )}

              {/* Status */}
              <div className="mt-3 pt-2 border-t border-gray-700/50">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-400">Dev Mode</span>
                  </div>
                  <span className="text-gray-500">{userRole?.department}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FloatingRoleSwitcher