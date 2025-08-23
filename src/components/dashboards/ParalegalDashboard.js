'use client'

import { useState } from 'react'

const ParalegalDashboard = ({ userRole, aiActive, setAiActive }) => {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Paralegal Dashboard</h1>
        <p className="text-gray-400 mb-8">Welcome, {userRole?.name} - {userRole?.title}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-900 p-6 rounded-3xl border border-gray-700">
            <h3 className="font-semibold mb-2">Research Tasks</h3>
            <div className="text-2xl font-bold text-blue-400">8</div>
          </div>
          <div className="bg-gray-900 p-6 rounded-3xl border border-gray-700">
            <h3 className="font-semibold mb-2">Documents Draft</h3>
            <div className="text-2xl font-bold text-yellow-400">5</div>
          </div>
          <div className="bg-gray-900 p-6 rounded-3xl border border-gray-700">
            <h3 className="font-semibold mb-2">Evidence Files</h3>
            <div className="text-2xl font-bold text-green-400">127</div>
          </div>
          <div className="bg-gray-900 p-6 rounded-3xl border border-gray-700">
            <h3 className="font-semibold mb-2">Citations Verified</h3>
            <div className="text-2xl font-bold text-purple-400">45</div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => setAiActive(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-semibold hover:shadow-lg transition-all"
          >
            🧠 Ask LEX AI - Legal Research
          </button>
        </div>
      </div>
    </div>
  )
}

export default ParalegalDashboard