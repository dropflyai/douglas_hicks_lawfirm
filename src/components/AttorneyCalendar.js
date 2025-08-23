'use client'

import { useState, useEffect } from 'react'
import { 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Users,
  Phone,
  Video,
  Scale,
  AlertCircle,
  CheckCircle,
  Clock3,
  User,
  Building,
  FileText,
  Briefcase,
  Gavel,
  UserCheck,
  CalendarDays,
  Filter,
  Search,
  Settings,
  Share,
  Download,
  Upload,
  RefreshCw,
  Bell,
  Star,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Eye,
  ExternalLink,
  Zap,
  Bot,
  Target,
  TrendingUp
} from 'lucide-react'

export default function AttorneyCalendar({ attorneyData }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState('month') // month, week, day, agenda
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [events, setEvents] = useState([])
  const [showNewEvent, setShowNewEvent] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [calendarSync, setCalendarSync] = useState({
    google: true,
    outlook: true,
    apple: false
  })
  const [filters, setFilters] = useState({
    courtDates: true,
    depositions: true,
    clientMeetings: true,
    deadlines: true,
    personalEvents: true
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [aiSuggestions, setAiSuggestions] = useState([])
  const [conflictAlerts, setConflictAlerts] = useState([])
  const [teamAvailability, setTeamAvailability] = useState({})
  const [showTeamSchedule, setShowTeamSchedule] = useState(false)

  // Sample events with legal-specific data
  const sampleEvents = [
    {
      id: 1,
      title: 'GM Case Settlement Conference',
      type: 'court_hearing',
      date: '2025-03-20',
      time: '10:00 AM',
      endTime: '12:00 PM',
      location: 'LA Superior Court - Dept 42',
      caseId: 'DHL-1999-001',
      caseValue: '$4.9B',
      judge: 'Hon. Sarah Martinez',
      participants: ['Carl E. Douglas', 'A\'ja Simplis', 'Opposing Counsel'],
      priority: 'critical',
      preparation: [
        'Review settlement authority',
        'Prepare opening statement',
        'Organize exhibit binders'
      ],
      documents: ['Settlement Brief.pdf', 'Damage Calculations.xlsx'],
      notes: 'Key hearing for $4.9B GM case. Judge expects detailed settlement framework.',
      status: 'confirmed',
      reminders: ['1 week', '1 day', '2 hours'],
      aiInsights: {
        preparation_time: '4 hours',
        success_probability: '87%',
        similar_cases: 3
      }
    },
    {
      id: 2,
      title: 'Client Deposition - Sarah Johnson',
      type: 'deposition',
      date: '2025-03-22',
      time: '2:00 PM',
      endTime: '5:00 PM',
      location: 'Douglas Hicks Law - Conference Room A',
      caseId: 'DHL-2025-156',
      client: 'Sarah Johnson',
      participants: ['Jamon R. Hicks', 'Court Reporter', 'Defense Attorney'],
      priority: 'high',
      preparation: [
        'Client prep session - 1 hour',
        'Review medical records',
        'Prepare question outline'
      ],
      documents: ['Medical Records.pdf', 'Accident Report.pdf'],
      status: 'confirmed',
      type_details: {
        court_reporter: 'Maria Santos',
        estimated_duration: '3 hours',
        recording: 'Video + Audio'
      }
    },
    {
      id: 3,
      title: 'Motion Filing Deadline - Chen Case',
      type: 'deadline',
      date: '2025-03-25',
      time: '5:00 PM',
      location: 'Electronic Filing',
      caseId: 'DHL-2025-089',
      priority: 'critical',
      countdown: '5 days',
      assignedTo: 'Kristen DeVezin',
      documents: ['Motion for Summary Judgment.docx'],
      status: 'in_progress',
      completion: '75%'
    },
    {
      id: 4,
      title: 'Team Strategy Meeting - Police Brutality Cases',
      type: 'internal_meeting',
      date: '2025-03-21',
      time: '3:00 PM',
      endTime: '4:30 PM',
      location: 'Douglas Hicks Law - Conference Room B',
      participants: ['Douglas Hicks', 'Carl E. Douglas', 'Jamon R. Hicks', 'A\'ja Simplis'],
      agenda: [
        'Review $8M settlement strategy',
        'Discuss upcoming depositions',
        'Coordinate expert witness schedules'
      ],
      priority: 'high',
      caseValue: '$8M+',
      status: 'confirmed'
    },
    {
      id: 5,
      title: 'Expert Witness Meeting - Dr. Martinez',
      type: 'expert_meeting',
      date: '2025-03-23',
      time: '11:00 AM',
      endTime: '12:30 PM',
      location: 'UCLA Medical Center',
      expert: 'Dr. Sarah Martinez',
      specialty: 'Trauma Surgery',
      caseId: 'DHL-2023-789',
      hourlyRate: '$750',
      participants: ['Jamon R. Hicks'],
      preparation: [
        'Review medical records',
        'Prepare questions list',
        'Discuss testimony strategy'
      ],
      priority: 'medium',
      status: 'confirmed'
    },
    {
      id: 6,
      title: 'CLE Training - Ethics Update',
      type: 'training',
      date: '2025-03-26',
      time: '9:00 AM',
      endTime: '5:00 PM',
      location: 'State Bar Convention Center',
      credits: '8 CLE Credits',
      category: 'Ethics',
      mandatory: true,
      participants: ['All Attorneys'],
      registration: 'Required',
      status: 'registered'
    }
  ]

  useEffect(() => {
    setEvents(sampleEvents)
    
    // AI-powered scheduling suggestions
    setAiSuggestions([
      {
        type: 'conflict_resolution',
        message: 'Potential scheduling conflict detected for March 22nd',
        action: 'Suggest alternative times',
        priority: 'medium'
      },
      {
        type: 'preparation_time',
        message: 'GM Settlement Conference needs 4 hours prep time',
        action: 'Block calendar time',
        priority: 'high'
      },
      {
        type: 'travel_time',
        message: 'Add 30min travel time to Superior Court events',
        action: 'Auto-adjust scheduling',
        priority: 'low'
      }
    ])

    // Conflict detection
    setConflictAlerts([
      {
        id: 1,
        type: 'scheduling_conflict',
        message: 'Dr. Martinez meeting overlaps with court preparation time',
        events: [2, 5],
        severity: 'medium',
        suggestion: 'Reschedule expert meeting to 2:00 PM'
      }
    ])

    // Team availability simulation
    setTeamAvailability({
      'Douglas Hicks': {
        available: ['2025-03-20 10:00', '2025-03-21 14:00', '2025-03-22 09:00'],
        busy: ['2025-03-20 14:00', '2025-03-21 10:00'],
        status: 'available'
      },
      'Jamon R. Hicks': {
        available: ['2025-03-20 11:00', '2025-03-21 15:00', '2025-03-23 10:00'],
        busy: ['2025-03-22 14:00', '2025-03-23 16:00'],
        status: 'busy'
      },
      'Carl E. Douglas': {
        available: ['2025-03-20 09:00', '2025-03-21 11:00', '2025-03-22 15:00'],
        busy: ['2025-03-20 15:00', '2025-03-22 10:00'],
        status: 'available'
      },
      'A\'ja Simplis': {
        available: ['2025-03-21 09:00', '2025-03-22 11:00', '2025-03-23 14:00'],
        busy: ['2025-03-20 16:00', '2025-03-21 16:00'],
        status: 'available'
      }
    })
  }, [])

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getEventTypeIcon = (type) => {
    switch(type) {
      case 'court_hearing': return <Scale className="w-4 h-4 text-red-400" />
      case 'deposition': return <UserCheck className="w-4 h-4 text-blue-400" />
      case 'deadline': return <AlertCircle className="w-4 h-4 text-orange-400" />
      case 'client_meeting': return <User className="w-4 h-4 text-green-400" />
      case 'internal_meeting': return <Users className="w-4 h-4 text-purple-400" />
      case 'expert_meeting': return <Briefcase className="w-4 h-4 text-yellow-400" />
      case 'training': return <FileText className="w-4 h-4 text-indigo-400" />
      default: return <Calendar className="w-4 h-4 text-gray-400" />
    }
  }

  const getEventTypeColor = (type) => {
    switch(type) {
      case 'court_hearing': return 'border-red-500 bg-red-900/30'
      case 'deposition': return 'border-blue-500 bg-blue-900/30'
      case 'deadline': return 'border-orange-500 bg-orange-900/30'
      case 'client_meeting': return 'border-green-500 bg-green-900/30'
      case 'internal_meeting': return 'border-purple-500 bg-purple-900/30'
      case 'expert_meeting': return 'border-yellow-500 bg-yellow-900/30'
      case 'training': return 'border-indigo-500 bg-indigo-900/30'
      default: return 'border-gray-500 bg-gray-900/30'
    }
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'critical': return 'text-red-400 border-red-500'
      case 'high': return 'text-orange-400 border-orange-500'
      case 'medium': return 'text-yellow-400 border-yellow-500'
      case 'low': return 'text-green-400 border-green-500'
      default: return 'text-gray-400 border-gray-500'
    }
  }

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const firstDayOfWeek = firstDay.getDay()
    const daysInMonth = lastDay.getDate()
    
    const days = []
    
    // Previous month days
    const prevMonth = new Date(year, month - 1, 0)
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonth.getDate() - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonth.getDate() - i)
      })
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        date: new Date(year, month, day)
      })
    }
    
    // Next month days
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        date: new Date(year, month + 1, day)
      })
    }
    
    return days
  }

  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.toDateString() === date.toDateString()
    })
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const isToday = (date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const formatEventTime = (event) => {
    if (event.endTime) {
      return `${event.time} - ${event.endTime}`
    }
    return event.time
  }

  const syncCalendar = async (provider) => {
    // Simulate real calendar API integration
    const wasEnabled = calendarSync[provider]
    
    // Show loading state
    setCalendarSync(prev => ({ ...prev, [provider]: 'syncing' }))
    
    // Simulate API call delay
    setTimeout(() => {
      setCalendarSync(prev => ({ ...prev, [provider]: !wasEnabled }))
      
      // Add synced events for demo
      if (!wasEnabled) {
        const syncedEvents = [
          {
            id: Date.now() + 1,
            title: `${provider.charAt(0).toUpperCase() + provider.slice(1)} Synced Event`,
            type: 'client_meeting',
            date: '2025-03-27',
            time: '10:00 AM',
            endTime: '11:00 AM',
            location: 'Video Conference',
            status: 'confirmed',
            synced: true,
            syncSource: provider
          }
        ]
        
        setEvents(prev => [...prev, ...syncedEvents])
      }
      
      // Show success notification
      const message = wasEnabled 
        ? `${provider.charAt(0).toUpperCase() + provider.slice(1)} Calendar sync disabled`
        : `${provider.charAt(0).toUpperCase() + provider.slice(1)} Calendar synced successfully! Events imported.`
      
      alert(message)
    }, 2000)
  }

  const createNewEvent = () => {
    setShowNewEvent(true)
  }

  const AgendaView = () => {
    const upcomingEvents = events
      .filter(event => new Date(event.date) >= new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 10)

    return (
      <div className="space-y-4">
        {upcomingEvents.map(event => (
          <div
            key={event.id}
            className={`p-4 rounded-lg border-l-4 ${getEventTypeColor(event.type)} cursor-pointer hover:bg-gray-700 transition-colors`}
            onClick={() => setSelectedEvent(event)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  {getEventTypeIcon(event.type)}
                  <h3 className="text-white font-semibold">{event.title}</h3>
                  {event.priority === 'critical' && (
                    <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full">CRITICAL</span>
                  )}
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{formatEventTime(event)}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  )}
                </div>

                {event.caseId && (
                  <div className="mt-2 flex items-center space-x-4 text-sm">
                    <span className="text-blue-400">Case: {event.caseId}</span>
                    {event.caseValue && (
                      <span className="text-green-400 font-semibold">{event.caseValue}</span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {event.status === 'confirmed' && (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                )}
                {event.aiInsights && (
                  <div className="flex items-center space-x-1 text-blue-400">
                    <Bot className="w-4 h-4" />
                    <span className="text-xs">{event.aiInsights.success_probability}</span>
                  </div>
                )}
                <button className="p-1 text-gray-400 hover:text-white rounded">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const TeamView = () => {
    const attorneys = Object.keys(teamAvailability)
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Team Schedule & Availability</h3>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Find Common Time
          </button>
        </div>

        <div className="grid gap-4">
          {attorneys.map((attorney) => {
            const availability = teamAvailability[attorney]
            return (
              <div key={attorney} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full flex items-center justify-center mr-3">
                      {attorney === 'Douglas Hicks' ? '👨‍💼' : 
                       attorney === 'Carl E. Douglas' ? '👑' : 
                       attorney === 'Jamon R. Hicks' ? '⚖️' : '👩‍💼'}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{attorney}</h4>
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          availability.status === 'available' ? 'bg-green-400' :
                          availability.status === 'busy' ? 'bg-red-400' : 'bg-yellow-400'
                        }`} />
                        <span className={`text-sm capitalize ${
                          availability.status === 'available' ? 'text-green-400' :
                          availability.status === 'busy' ? 'text-red-400' : 'text-yellow-400'
                        }`}>
                          {availability.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                    Schedule Meeting
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-green-400 font-semibold mb-2">Available Times</h5>
                    <div className="space-y-1">
                      {availability.available.map((time, idx) => (
                        <div key={idx} className="text-sm text-gray-300 p-2 bg-green-900/30 border border-green-600 rounded">
                          {new Date(time).toLocaleDateString()} at {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-red-400 font-semibold mb-2">Busy Times</h5>
                    <div className="space-y-1">
                      {availability.busy.map((time, idx) => (
                        <div key={idx} className="text-sm text-gray-300 p-2 bg-red-900/30 border border-red-600 rounded">
                          {new Date(time).toLocaleDateString()} at {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Team Meeting Suggestions */}
        <div className="p-4 bg-blue-900/20 border border-blue-600 rounded-lg">
          <div className="flex items-center mb-3">
            <Users className="w-5 h-5 text-blue-400 mr-2" />
            <h4 className="text-blue-300 font-semibold">AI Team Meeting Suggestions</h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-blue-900/30 rounded">
              <div>
                <p className="text-white font-semibold">GM Case Strategy Meeting</p>
                <p className="text-blue-200 text-sm">All 4 attorneys available: Tomorrow 2:00 PM</p>
              </div>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                Schedule
              </button>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-900/30 rounded">
              <div>
                <p className="text-white font-semibold">Weekly Partner Review</p>
                <p className="text-blue-200 text-sm">Partners available: Friday 4:00 PM</p>
              </div>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700 p-6 h-full">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Calendar className="w-8 h-8 mr-3 text-blue-400" />
            Legal Calendar
          </h2>
          
          {/* Calendar Sync Status */}
          <div className="flex items-center space-x-2">
            {calendarSync.google && (
              <div className="flex items-center px-2 py-1 bg-green-900/30 border border-green-600 rounded-full">
                <RefreshCw className="w-3 h-3 text-green-400 mr-1" />
                <span className="text-green-300 text-xs">Google</span>
              </div>
            )}
            {calendarSync.outlook && (
              <div className="flex items-center px-2 py-1 bg-blue-900/30 border border-blue-600 rounded-full">
                <RefreshCw className="w-3 h-3 text-blue-400 mr-1" />
                <span className="text-blue-300 text-xs">Outlook</span>
              </div>
            )}
            {calendarSync.apple && (
              <div className="flex items-center px-2 py-1 bg-gray-700 border border-gray-600 rounded-full">
                <RefreshCw className="w-3 h-3 text-gray-400 mr-1" />
                <span className="text-gray-300 text-xs">Apple</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* View Selector */}
          <div className="flex bg-gray-800 rounded-lg p-1">
            {['month', 'week', 'day', 'agenda', 'team'].map((viewType) => (
              <button
                key={viewType}
                onClick={() => setView(viewType)}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                  view === viewType
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
              </button>
            ))}
          </div>

          {/* Actions */}
          <button
            onClick={createNewEvent}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:scale-105 transition-all flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Event</span>
          </button>

          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* AI Insights & Conflicts */}
      {(aiSuggestions.length > 0 || conflictAlerts.length > 0) && (
        <div className="mb-6 space-y-3">
          {/* AI Suggestions */}
          {aiSuggestions.length > 0 && (
            <div className="p-4 bg-blue-900/20 border border-blue-600 rounded-lg">
              <div className="flex items-center mb-3">
                <Bot className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-blue-300 font-semibold">AI Scheduling Assistant</span>
              </div>
              <div className="space-y-2">
                {aiSuggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-blue-200">{suggestion.message}</span>
                    <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full hover:bg-blue-700 transition-colors">
                      {suggestion.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conflict Alerts */}
          {conflictAlerts.length > 0 && (
            <div className="p-4 bg-orange-900/20 border border-orange-600 rounded-lg">
              <div className="flex items-center mb-3">
                <AlertCircle className="w-5 h-5 text-orange-400 mr-2" />
                <span className="text-orange-300 font-semibold">Scheduling Conflicts</span>
              </div>
              <div className="space-y-2">
                {conflictAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between text-sm">
                    <span className="text-orange-200">{alert.message}</span>
                    <button className="px-3 py-1 bg-orange-600 text-white text-xs rounded-full hover:bg-orange-700 transition-colors">
                      Resolve
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Calendar Navigation */}
      {view !== 'agenda' && (
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <h3 className="text-xl font-bold text-white">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Calendar Content */}
      {view === 'agenda' ? (
        <AgendaView />
      ) : view === 'team' ? (
        <TeamView />
      ) : view === 'month' ? (
        <>
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {daysOfWeek.map(day => (
              <div key={day} className="text-center text-gray-400 font-semibold py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {getDaysInMonth(currentDate).map((dayObj, index) => {
              const dayEvents = getEventsForDate(dayObj.date)
              const isSelected = selectedDate.toDateString() === dayObj.date.toDateString()
              
              return (
                <div
                  key={index}
                  onClick={() => setSelectedDate(dayObj.date)}
                  className={`min-h-[120px] p-2 rounded-lg border transition-all cursor-pointer ${
                    dayObj.isCurrentMonth
                      ? isSelected
                        ? 'bg-blue-600 border-blue-500'
                        : 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                      : 'bg-gray-900 border-gray-800 text-gray-500'
                  } ${isToday(dayObj.date) ? 'ring-2 ring-yellow-400' : ''}`}
                >
                  <div className={`text-sm font-semibold mb-2 ${
                    isToday(dayObj.date) ? 'text-yellow-400' : 
                    dayObj.isCurrentMonth ? 'text-white' : 'text-gray-500'
                  }`}>
                    {dayObj.day}
                  </div>
                  
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map(event => (
                      <div
                        key={event.id}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedEvent(event)
                        }}
                        className={`p-1 rounded text-xs font-medium cursor-pointer border-l-2 ${getEventTypeColor(event.type)} hover:opacity-80 transition-opacity`}
                      >
                        <div className="flex items-center space-x-1">
                          {getEventTypeIcon(event.type)}
                          <span className="truncate text-white">{event.title}</span>
                        </div>
                        {event.time && (
                          <div className="text-gray-300 mt-1">{event.time}</div>
                        )}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-gray-400 text-center">
                        +{dayEvents.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-400 py-12">
          <Calendar className="w-12 h-12 mx-auto mb-4" />
          <p>Week and Day views coming soon!</p>
        </div>
      )}

      {/* Calendar Sync Modal */}
      <div className="mt-6 flex items-center justify-between p-4 bg-gray-800 rounded-lg">
        <div>
          <h4 className="text-white font-semibold mb-1">Calendar Sync</h4>
          <p className="text-gray-400 text-sm">Connect external calendars for seamless scheduling</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => syncCalendar('google')}
            disabled={calendarSync.google === 'syncing'}
            className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center ${
              calendarSync.google === 'syncing'
                ? 'bg-yellow-600 text-white cursor-not-allowed'
                : calendarSync.google
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {calendarSync.google === 'syncing' ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Syncing...
              </>
            ) : (
              'Google Calendar'
            )}
          </button>
          <button
            onClick={() => syncCalendar('outlook')}
            disabled={calendarSync.outlook === 'syncing'}
            className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center ${
              calendarSync.outlook === 'syncing'
                ? 'bg-yellow-600 text-white cursor-not-allowed'
                : calendarSync.outlook
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {calendarSync.outlook === 'syncing' ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Syncing...
              </>
            ) : (
              'Outlook'
            )}
          </button>
          <button
            onClick={() => syncCalendar('apple')}
            disabled={calendarSync.apple === 'syncing'}
            className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center ${
              calendarSync.apple === 'syncing'
                ? 'bg-yellow-600 text-white cursor-not-allowed'
                : calendarSync.apple
                ? 'bg-gray-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {calendarSync.apple === 'syncing' ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Syncing...
              </>
            ) : (
              'Apple Calendar'
            )}
          </button>
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  {getEventTypeIcon(selectedEvent.type)}
                  <h3 className="text-xl font-bold text-white">{selectedEvent.title}</h3>
                  {selectedEvent.priority === 'critical' && (
                    <span className="px-3 py-1 bg-red-600 text-white text-sm rounded-full">CRITICAL</span>
                  )}
                </div>
                <p className="text-gray-400 capitalize">{selectedEvent.type.replace('_', ' ')}</p>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Event Details */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-semibold mb-2">Event Details</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300">{new Date(selectedEvent.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300">{formatEventTime(selectedEvent)}</span>
                    </div>
                    {selectedEvent.location && (
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-300">{selectedEvent.location}</span>
                      </div>
                    )}
                    {selectedEvent.caseId && (
                      <div className="flex items-center space-x-3">
                        <Briefcase className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300">Case: {selectedEvent.caseId}</span>
                        {selectedEvent.caseValue && (
                          <span className="text-green-400 font-semibold">({selectedEvent.caseValue})</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {selectedEvent.participants && (
                  <div>
                    <h4 className="text-white font-semibold mb-2">Participants</h4>
                    <div className="space-y-1">
                      {selectedEvent.participants.map((participant, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                          <User className="w-3 h-3" />
                          <span>{participant}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedEvent.documents && (
                  <div>
                    <h4 className="text-white font-semibold mb-2">Documents</h4>
                    <div className="space-y-2">
                      {selectedEvent.documents.map((doc, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-gray-700 rounded">
                          <FileText className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-300 text-sm flex-1">{doc}</span>
                          <button className="p-1 text-gray-400 hover:text-white">
                            <Download className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Preparation & AI Insights */}
              <div className="space-y-4">
                {selectedEvent.preparation && (
                  <div>
                    <h4 className="text-white font-semibold mb-2">Preparation Tasks</h4>
                    <div className="space-y-2">
                      {selectedEvent.preparation.map((task, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedEvent.aiInsights && (
                  <div className="p-4 bg-blue-900/20 border border-blue-600 rounded-lg">
                    <h4 className="text-blue-300 font-semibold mb-3 flex items-center">
                      <Bot className="w-4 h-4 mr-2" />
                      AI Insights
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-200">Prep Time Needed:</span>
                        <span className="text-white">{selectedEvent.aiInsights.preparation_time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-200">Success Probability:</span>
                        <span className="text-green-400">{selectedEvent.aiInsights.success_probability}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-200">Similar Cases:</span>
                        <span className="text-white">{selectedEvent.aiInsights.similar_cases}</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedEvent.notes && (
                  <div>
                    <h4 className="text-white font-semibold mb-2">Notes</h4>
                    <div className="p-3 bg-gray-700 rounded text-sm text-gray-300">
                      {selectedEvent.notes}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-700">
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getPriorityColor(selectedEvent.priority)}`}>
                  {selectedEvent.priority?.toUpperCase()}
                </span>
                {selectedEvent.status === 'confirmed' && (
                  <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full">CONFIRMED</span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Edit Event
                </button>
                <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}