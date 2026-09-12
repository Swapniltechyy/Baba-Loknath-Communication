'use client'

import React, { useState, useEffect, useId, useRef } from 'react'
import { motion } from 'framer-motion'
import { Train, ArrowUpDown, Calendar, AlertCircle, Layers, ChevronDown, Send, Check, Users, Plus, Minus } from 'lucide-react'
import { Station, loadStations } from '@/lib/stations'
import { StationSearchModal } from '@/components/station-search-modal'

export interface PassengerDetail {
  name: string
  age: string
  gender: 'M' | 'F' | ''
  type: 'Adult' | 'Child' | 'Senior Citizen'
}

export interface TrainEnquiryData {
  fromStation: Station
  toStation: Station
  journeyDate: string
  travelClass: string
  passengers?: {
    adults: number
    children: number
    seniorCitizens: number
    total: number
    summary: string
    details?: PassengerDetail[]
  }
  submittedAt: string
}

interface TrainSearchFormProps {
  onSearch?: (
    from: Station,
    to: Station,
    date: string,
    travelClass?: string,
    passengers?: string,
    details?: PassengerDetail[]
  ) => void
  onSubmitEnquiry?: (enquiry: TrainEnquiryData) => void
  className?: string
}

const TRAIN_CLASSES = [
  { value: 'Select Class', label: 'Select Class' },
  { value: 'Sleeper (SL)', label: 'Sleeper (SL)' },
  { value: 'AC 3 Tier (3A)', label: 'AC 3 Tier (3A)' },
  { value: 'AC 2 Tier (2A)', label: 'AC 2 Tier (2A)' },
  { value: 'AC 1st Class (1A)', label: 'AC 1st Class (1A)' },
  { value: 'AC 3 Economy (3E)', label: 'AC 3 Economy (3E)' },
  { value: 'AC Chair Car (CC)', label: 'AC Chair Car (CC)' },
  { value: 'Second Sitting (2S)', label: 'Second Sitting (2S)' },
]

// Helpers for dates: returns short format like "Sun, 13 Sep"
function formatDateDisplay(d: Date): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`
}

function toISODate(d: Date): string {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Validation for passenger age ranges: Child <= 12, Adult 13-57, Senior Citizen > 57
function getAgeWarning(
  type: 'Adult' | 'Child' | 'Senior Citizen',
  ageStr: string,
  isBlurred: boolean = false
): string | null {
  const trimmed = ageStr.trim()
  if (!trimmed) return null
  const age = parseInt(trimmed, 10)
  if (isNaN(age)) return null

  if (type === 'Child') {
    // Child: <= 12
    if (age > 12) {
      return 'Child age must be 12 or below.'
    }
    if (isBlurred && age < 1) {
      return 'Child age must be at least 1.'
    }
  } else if (type === 'Adult') {
    // Adult: 13 - 57
    if (age > 57) {
      return 'Adult age must be between 13 and 57.'
    }
    if (trimmed.length >= 2 && age < 13) {
      return 'Adult age must be between 13 and 57.'
    }
    if (isBlurred && age < 13) {
      return 'Adult age must be between 13 and 57.'
    }
  } else if (type === 'Senior Citizen') {
    // Senior citizen: above 57 (58+)
    if (trimmed.length >= 2 && age <= 57) {
      return 'Senior Citizen age must be above 57 (58+).'
    }
    if (isBlurred && age <= 57) {
      return 'Senior Citizen age must be above 57 (58+).'
    }
  }

  return null
}

export function TrainSearchForm({ onSearch, onSubmitEnquiry, className = '' }: TrainSearchFormProps) {
  // Empty stations initially (user selects their own station)
  const [fromStation, setFromStation] = useState<Station | null>(null)
  const [toStation, setToStation] = useState<Station | null>(null)

  // Stations data from JSON
  const [stations, setStations] = useState<Station[]>([])
  const [isLoadingStations, setIsLoadingStations] = useState(true)

  // Active modal state: 'from' | 'to' | null
  const [searchTarget, setSearchTarget] = useState<'from' | 'to' | null>(null)

  // Swap animation state
  const [swapRotation, setSwapRotation] = useState(0)

  // Validation error state
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Date management: default to present day & date (auto changes everyday)
  const today = new Date()
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date())
  const [hasSelectedDate, setHasSelectedDate] = useState(false)

  // Passenger(s) management
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [seniorCitizens, setSeniorCitizens] = useState(0)
  const [isPassengersOpen, setIsPassengersOpen] = useState(false)
  const passengersDropdownRef = useRef<HTMLDivElement>(null)

  const totalPassengers = adults + children + seniorCitizens
  const MAX_PASSENGERS = 6

  const getPassengersSummary = () => {
    const parts: string[] = []
    if (adults > 0) parts.push(`${adults} Adult${adults > 1 ? 's' : ''}`)
    if (children > 0) parts.push(`${children} Child${children > 1 ? 'ren' : ''}`)
    if (seniorCitizens > 0) parts.push(`${seniorCitizens} Senior Citizen${seniorCitizens > 1 ? 's' : ''}`)
    return parts.join(', ') || '1 Adult'
  }

  // Passenger details list (Name, Age, Gender)
  const [passengerDetails, setPassengerDetails] = useState<PassengerDetail[]>([
    { name: '', age: '', gender: '', type: 'Adult' },
  ])

  // Synchronize passenger details list with adults, children, seniorCitizens counts
  useEffect(() => {
    const desiredTypes: ('Adult' | 'Child' | 'Senior Citizen')[] = [
      ...Array(adults).fill('Adult'),
      ...Array(children).fill('Child'),
      ...Array(seniorCitizens).fill('Senior Citizen'),
    ]

    setPassengerDetails((prev) => {
      return desiredTypes.map((type, index) => {
        const existing = prev[index]
        if (existing) {
          return {
            ...existing,
            type,
          }
        }
        return {
          name: '',
          age: '',
          gender: '',
          type,
        }
      })
    })
  }, [adults, children, seniorCitizens])

  const handlePassengerChange = (
    index: number,
    field: keyof PassengerDetail,
    value: string
  ) => {
    let cleanValue = value
    if (field === 'name') {
      // Only accept characters (letters and spaces), no numbers, and convert to capital letters
      cleanValue = value.replace(/[^a-zA-Z\s]/g, '').toUpperCase()
    } else if (field === 'age') {
      // Only numbers, maximum 2 digits
      cleanValue = value.replace(/\D/g, '').slice(0, 2)
    }

    setPassengerDetails((prev) => {
      const next = [...prev]
      if (next[index]) {
        next[index] = {
          ...next[index],
          [field]: cleanValue,
        }
      }
      return next
    })
  }

  // Track blurred age fields for validation
  const [blurredAges, setBlurredAges] = useState<{ [index: number]: boolean }>({})

  const handleAgeBlur = (index: number) => {
    setBlurredAges((prev) => ({ ...prev, [index]: true }))
  }

  // Close passengers dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (passengersDropdownRef.current && !passengersDropdownRef.current.contains(e.target as Node)) {
        setIsPassengersOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Travel class management
  const [travelClass, setTravelClass] = useState<string>('Select Class')
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false)
  const classDropdownRef = useRef<HTMLDivElement>(null)

  // Close class dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (classDropdownRef.current && !classDropdownRef.current.contains(e.target as Node)) {
        setIsClassDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const datePickerInputId = useId()
  const dateInputRef = useRef<HTMLInputElement>(null)



  // Load stations on component mount
  useEffect(() => {
    let isMounted = true
    loadStations()
      .then((data) => {
        if (isMounted) {
          setStations(data)
          setIsLoadingStations(false)
        }
      })
      .catch((err) => {
        console.error('Error loading stations:', err)
        if (isMounted) {
          setIsLoadingStations(false)
        }
      })
    return () => {
      isMounted = false
    }
  }, [])

  // Swap From and To stations
  const handleSwapStations = () => {
    setSwapRotation((prev) => prev + 180)
    setFromStation(toStation)
    setToStation(fromStation)
    setErrorMessage(null)
  }

  // Custom date selection from native picker
  const handleCustomDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (!val) return
    const [y, m, d] = val.split('-').map(Number)
    const newDate = new Date(y, m - 1, d)
    setSelectedDate(newDate)
    setHasSelectedDate(true)
  }

  // Handle station selection with same-station validation
  const handleSelectStation = (station: Station) => {
    setErrorMessage(null)
    if (searchTarget === 'from') {
      if (toStation && toStation.code === station.code) {
        setErrorMessage('From and To stations cannot be identical.')
        return
      }
      setFromStation(station)
    } else if (searchTarget === 'to') {
      if (fromStation && fromStation.code === station.code) {
        setErrorMessage('To station cannot be identical to From station.')
        return
      }
      setToStation(station)
    }
  }

  // Submit enquiry
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!fromStation) {
      setErrorMessage('Please select a departure (From) station.')
      return
    }
    if (!toStation) {
      setErrorMessage('Please select an arrival (To) station.')
      return
    }
    if (fromStation.code === toStation.code) {
      setErrorMessage('From and To stations cannot be the same.')
      return
    }

    setErrorMessage(null)

    // Validate passenger age ranges if entered
    for (let i = 0; i < passengerDetails.length; i++) {
      const p = passengerDetails[i]
      if (p.age.trim()) {
        const warning = getAgeWarning(p.type, p.age, true)
        if (warning) {
          setErrorMessage(`Passenger ${i + 1} (${p.type}): ${warning}`)
          setBlurredAges((prev) => ({ ...prev, [i]: true }))
          return
        }
      }
    }

    const formattedDate = formatDateDisplay(selectedDate)
    const passengersSummary = getPassengersSummary()

    // Format passenger details (e.g. Swapnil Mitra, 23, M)
    const hasAnyDetails = passengerDetails.some((p) => p.name.trim() || p.age.trim() || p.gender)
    const formattedDetailsList = passengerDetails
      .map((p, idx) => {
        const parts = []
        if (p.name.trim()) parts.push(p.name.trim())
        if (p.age.trim()) parts.push(p.age.trim())
        if (p.gender) parts.push(p.gender)
        const detailsString = parts.length > 0 ? parts.join(', ') : `Passenger ${idx + 1}`
        return `${idx + 1}. ${detailsString} (${p.type})`
      })
      .join('\n')

    const enquiryPayload: TrainEnquiryData = {
      fromStation,
      toStation,
      journeyDate: formattedDate,
      travelClass,
      passengers: {
        adults,
        children,
        seniorCitizens,
        total: totalPassengers,
        summary: passengersSummary,
        details: passengerDetails,
      },
      submittedAt: new Date().toISOString(),
    }

    if (onSubmitEnquiry) {
      onSubmitEnquiry(enquiryPayload)
      return
    }

    if (onSearch) {
      onSearch(fromStation, toStation, formattedDate, travelClass, passengersSummary, passengerDetails)
    } else {
      const detailsSection = hasAnyDetails
        ? `\n\n📝 *Passenger Details:*\n${formattedDetailsList}`
        : ''

      // Direct WhatsApp enquiry prefilled for Baba Loknath Communication
      const message = encodeURIComponent(
        `Hello Baba Loknath Communication, I would like to submit a train ticket enquiry:\n\n🚉 *From:* ${fromStation.name} (${fromStation.code})\n🏁 *To:* ${toStation.name} (${toStation.code})\n📅 *Departure Date:* ${formattedDate}\n💺 *Preferred Class:* ${travelClass}\n👥 *Passengers:* ${passengersSummary}${detailsSection}\n\nPlease check seat availability and booking details.`
      )
      window.open(`https://wa.me/919732367890?text=${message}`, '_blank')
    }
  }

  return (
    <div className={`train-search-form relative w-full rounded-2xl bg-white p-4 shadow-[0_8px_30px_rgb(21,101,192,0.08)] ring-1 ring-blue-100 ${className}`}>
      {/* Validation alert */}
      {errorMessage && (
        <div className="mb-3 flex items-center gap-2 rounded-xl bg-blue-50 border border-blue-200 px-3 py-2 text-xs font-medium text-[#1565C0]">
          <AlertCircle className="h-4 w-4 shrink-0 text-[#1565C0]" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSearchSubmit} className="flex flex-col gap-0">
        {/* Stations Container with Swap Button */}
        <div className="relative flex flex-col rounded-xl border border-blue-100 bg-[#F8FAFC]/50 overflow-hidden">
          {/* FROM STATION FIELD */}
          <button
            type="button"
            onClick={() => {
              setSearchTarget('from')
              setErrorMessage(null)
            }}
            className="station-field group flex w-full items-center gap-3.5 px-3.5 py-3 text-left transition-colors hover:bg-blue-50/40 active:bg-blue-50"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1565C0] group-hover:bg-[#1565C0] group-hover:text-white transition-colors">
              <Train className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1 pr-12">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[#1565C0]">From</span>
              {fromStation ? (
                <div className="flex items-baseline justify-between gap-1 mt-0.5">
                  <span className="station-name truncate text-[15px] font-bold text-slate-900 leading-tight">
                    {fromStation.name}
                  </span>
                  <span className="station-code ml-1.5 shrink-0 rounded bg-blue-100/70 px-1.5 py-0.5 text-[11px] font-bold text-[#1565C0]">
                    {fromStation.code}
                  </span>
                </div>
              ) : (
                <span className="station-input text-[14px] font-medium text-slate-400">Enter From Station</span>
              )}
            </div>
          </button>

          {/* Divider with Center-Right Circular Swap Button */}
          <div className="relative flex h-px w-full bg-blue-100">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleSwapStations()
              }}
              className="swap-stations-btn absolute right-3 -top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white bg-[#1565C0] text-white shadow-sm transition-all active:scale-90 hover:bg-[#0D47A1] focus:outline-none focus:ring-2 focus:ring-[#1565C0]/40 before:absolute before:-inset-2 before:content-['']"
              aria-label="Swap From and To stations"
            >
              <motion.div
                animate={{ rotate: swapRotation }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="flex items-center justify-center"
              >
                <ArrowUpDown className="h-4 w-4" />
              </motion.div>
            </button>
          </div>

          {/* TO STATION FIELD */}
          <button
            type="button"
            onClick={() => {
              setSearchTarget('to')
              setErrorMessage(null)
            }}
            className="station-field group flex w-full items-center gap-3.5 px-3.5 py-3 text-left transition-colors hover:bg-blue-50/40 active:bg-blue-50"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1565C0] group-hover:bg-[#1565C0] group-hover:text-white transition-colors">
              <Train className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1 pr-12">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[#1565C0]">To</span>
              {toStation ? (
                <div className="flex items-baseline justify-between gap-1 mt-0.5">
                  <span className="station-name truncate text-[15px] font-bold text-slate-900 leading-tight">
                    {toStation.name}
                  </span>
                  <span className="station-code ml-1.5 shrink-0 rounded bg-blue-100/70 px-1.5 py-0.5 text-[11px] font-bold text-[#1565C0]">
                    {toStation.code}
                  </span>
                </div>
              ) : (
                <span className="station-input text-[14px] font-medium text-slate-400">Enter To Station</span>
              )}
            </div>
          </button>
        </div>

        {/* DEPARTURE DATE SECTION */}
        <div className="journey-date group relative mt-3.5 flex items-center justify-between rounded-xl border border-blue-100 bg-[#F8FAFC]/50 p-3 transition-colors hover:bg-blue-50/40 active:bg-blue-50">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#1565C0] group-hover:bg-[#1565C0] group-hover:text-white transition-colors">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Departure Date
              </span>
              <span
                className={`text-[14px] leading-tight transition-colors ${
                  hasSelectedDate
                    ? 'font-bold text-slate-900'
                    : 'font-medium text-slate-400 group-hover:text-slate-600'
                }`}
              >
                {formatDateDisplay(selectedDate)}
              </span>
            </div>
          </div>

          {/* HTML5 Native Date Picker (Safari iOS/macOS, Chrome, Android compatible) */}
          <input
            id={datePickerInputId}
            ref={dateInputRef}
            type="date"
            min={toISODate(today)}
            value={toISODate(selectedDate)}
            onChange={handleCustomDateChange}
            onClick={(e) => {
              try {
                e.currentTarget.showPicker?.()
              } catch {}
            }}
            aria-label="Select Departure Date"
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0 z-10"
          />
        </div>

        {/* PREFERRED CLASS FIELD */}
        <div ref={classDropdownRef} className="travel-class relative mt-3.5 flex flex-col rounded-xl border border-blue-100 bg-[#F8FAFC]/50 p-3">
          <button
            type="button"
            onClick={() => {
              setIsClassDropdownOpen((prev) => !prev)
              setIsPassengersOpen(false)
            }}
            className="flex w-full items-center justify-between text-left cursor-pointer focus:outline-none"
            aria-haspopup="listbox"
            aria-expanded={isClassDropdownOpen}
          >
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#1565C0]">
                <Layers className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Preferred Class
                </span>
                <span
                  className={`text-[14px] leading-tight transition-colors ${
                    travelClass !== 'Select Class'
                      ? 'font-bold text-slate-900'
                      : 'font-medium text-slate-400'
                  }`}
                >
                  {travelClass}
                </span>
              </div>
            </div>
            <ChevronDown className={`h-4 w-4 text-[#1565C0] shrink-0 transition-transform duration-200 ${isClassDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Custom Dropdown Menu with comfortable left padding */}
          {isClassDropdownOpen && (
            <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-64 overflow-y-auto rounded-xl border border-blue-100 bg-white p-1.5 shadow-2xl ring-1 ring-blue-50">
              {TRAIN_CLASSES.map((c) => {
                const isSelected = travelClass === c.value
                return (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => {
                      setTravelClass(c.value)
                      setIsClassDropdownOpen(false)
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left text-[14px] transition-colors ${
                      isSelected
                        ? 'bg-blue-50 font-bold text-[#1565C0]'
                        : 'font-medium text-slate-700 hover:bg-slate-50 hover:text-[#1565C0]'
                    }`}
                  >
                    <span className="pl-1.5">{c.label}</span>
                    {isSelected && <Check className="h-4 w-4 text-[#1565C0] shrink-0" />}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* PASSENGER(S) DROPDOWN FIELD (After PREFERRED CLASS) */}
        <div ref={passengersDropdownRef} className="passengers-field relative mt-3.5 flex flex-col rounded-xl border border-blue-100 bg-[#F8FAFC]/50 p-3">
          <button
            type="button"
            onClick={() => {
              setIsPassengersOpen((prev) => !prev)
              setIsClassDropdownOpen(false)
            }}
            className="flex w-full items-center justify-between text-left cursor-pointer focus:outline-none"
            aria-haspopup="dialog"
            aria-expanded={isPassengersOpen}
          >
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#1565C0]">
                <Users className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Passenger(s)
                </span>
                <span className="truncate block text-[14px] font-bold text-slate-900 leading-tight">
                  {getPassengersSummary()}
                </span>
              </div>
            </div>
            <ChevronDown className={`h-4 w-4 text-[#1565C0] shrink-0 transition-transform duration-200 ${isPassengersOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Passenger Selector Popup */}
          {isPassengersOpen && (
            <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 rounded-2xl border border-blue-100 bg-white p-3.5 shadow-2xl ring-1 ring-blue-50">
              <div className="space-y-3">
                {/* Adults */}
                <div className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-50/80 transition-colors">
                  <div>
                    <div className="text-[14px] font-bold text-slate-800">Adults</div>
                    <div className="text-[11px] font-medium text-slate-400">12+ Years</div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      disabled={adults <= 0 || (adults === 1 && seniorCitizens === 0)}
                      onClick={() => setAdults((prev) => Math.max(0, prev - 1))}
                      className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                        adults <= 0 || (adults === 1 && seniorCitizens === 0)
                          ? 'border border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50/50'
                          : 'border border-[#1565C0] text-[#1565C0] hover:bg-blue-50 active:scale-95 cursor-pointer'
                      }`}
                      aria-label="Decrease Adults"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-6 text-center text-[15px] font-bold text-slate-800 select-none">
                      {adults}
                    </span>
                    <button
                      type="button"
                      disabled={totalPassengers >= MAX_PASSENGERS}
                      onClick={() => setAdults((prev) => prev + 1)}
                      className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                        totalPassengers >= MAX_PASSENGERS
                          ? 'border border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50/50'
                          : 'border border-[#1565C0] text-[#1565C0] hover:bg-blue-50 active:scale-95 cursor-pointer'
                      }`}
                      aria-label="Increase Adults"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-50/80 transition-colors">
                  <div>
                    <div className="text-[14px] font-bold text-slate-800">Children</div>
                    <div className="text-[11px] font-medium text-slate-400">2 - 12 yrs</div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      disabled={children <= 0}
                      onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                      className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                        children <= 0
                          ? 'border border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50/50'
                          : 'border border-[#1565C0] text-[#1565C0] hover:bg-blue-50 active:scale-95 cursor-pointer'
                      }`}
                      aria-label="Decrease Children"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-6 text-center text-[15px] font-bold text-slate-800 select-none">
                      {children}
                    </span>
                    <button
                      type="button"
                      disabled={totalPassengers >= MAX_PASSENGERS}
                      onClick={() => setChildren((prev) => prev + 1)}
                      className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                        totalPassengers >= MAX_PASSENGERS
                          ? 'border border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50/50'
                          : 'border border-[#1565C0] text-[#1565C0] hover:bg-blue-50 active:scale-95 cursor-pointer'
                      }`}
                      aria-label="Increase Children"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Senior Citizen */}
                <div className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-50/80 transition-colors">
                  <div>
                    <div className="text-[14px] font-bold text-slate-800">Senior Citizen</div>
                    <div className="text-[11px] font-medium text-slate-400">58+ Years</div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      disabled={seniorCitizens <= 0 || (seniorCitizens === 1 && adults === 0)}
                      onClick={() => setSeniorCitizens((prev) => Math.max(0, prev - 1))}
                      className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                        seniorCitizens <= 0 || (seniorCitizens === 1 && adults === 0)
                          ? 'border border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50/50'
                          : 'border border-[#1565C0] text-[#1565C0] hover:bg-blue-50 active:scale-95 cursor-pointer'
                      }`}
                      aria-label="Decrease Senior Citizens"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-6 text-center text-[15px] font-bold text-slate-800 select-none">
                      {seniorCitizens}
                    </span>
                    <button
                      type="button"
                      disabled={totalPassengers >= MAX_PASSENGERS}
                      onClick={() => setSeniorCitizens((prev) => prev + 1)}
                      className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                        totalPassengers >= MAX_PASSENGERS
                          ? 'border border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50/50'
                          : 'border border-[#1565C0] text-[#1565C0] hover:bg-blue-50 active:scale-95 cursor-pointer'
                      }`}
                      aria-label="Increase Senior Citizens"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom bar with total and Done button */}
              <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  Total: <strong className="text-slate-800 font-semibold">{totalPassengers}</strong> / {MAX_PASSENGERS}
                </span>
                <button
                  type="button"
                  onClick={() => setIsPassengersOpen(false)}
                  className="rounded-lg bg-[#1565C0] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#0D47A1] transition-colors active:scale-95 cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* PASSENGER DETAILS FIELDS (Opens based on passenger selection) */}
        <div className="passenger-details-section mt-3.5 flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Passenger Details
            </span>
            <span className="text-[11px] font-semibold text-[#1565C0] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
              {totalPassengers} {totalPassengers === 1 ? 'Passenger' : 'Passengers'}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {passengerDetails.map((passenger, index) => {
              const ageWarning = getAgeWarning(
                passenger.type,
                passenger.age,
                blurredAges[index]
              )

              return (
                <div
                  key={index}
                  className={`flex flex-col gap-1.5 rounded-xl border p-2.5 transition-colors ${
                    ageWarning
                      ? 'border-amber-300 bg-amber-50/20'
                      : 'border-blue-100 bg-[#F8FAFC]/60 hover:bg-blue-50/30'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-800">
                      Passenger {index + 1}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        passenger.type === 'Senior Citizen'
                          ? 'bg-amber-100/70 text-amber-800 border border-amber-200/60'
                          : passenger.type === 'Child'
                          ? 'bg-emerald-100/70 text-emerald-800 border border-emerald-200/60'
                          : 'bg-blue-100/70 text-[#1565C0] border border-blue-200/60'
                      }`}
                    >
                      {passenger.type}
                    </span>
                  </div>

                  {/* Single line field: Name, Age, Gender */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {/* Name Input */}
                    <div className="flex-1 min-w-0">
                      <input
                        type="text"
                        placeholder="Name"
                        value={passenger.name}
                        onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-[13px] font-medium text-slate-900 uppercase placeholder:normal-case placeholder:text-slate-400 focus:border-[#1565C0] focus:outline-none focus:ring-1 focus:ring-[#1565C0] transition-colors"
                        aria-label={`Passenger ${index + 1} Name`}
                      />
                    </div>

                    {/* Age Input (Max 2 numbers only with range validation) */}
                    <div className="w-16 shrink-0">
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={2}
                        placeholder="Age"
                        value={passenger.age}
                        onBlur={() => handleAgeBlur(index)}
                        onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                        className={`w-full rounded-lg border bg-white px-1.5 py-2 text-center text-[13px] font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors ${
                          ageWarning
                            ? 'border-amber-500 focus:border-amber-600 focus:ring-1 focus:ring-amber-500 text-amber-900'
                            : 'border-slate-200 focus:border-[#1565C0] focus:ring-1 focus:ring-[#1565C0]'
                        }`}
                        aria-label={`Passenger ${index + 1} Age`}
                      />
                    </div>

                    {/* Gender Dropdown (No default M, select M / F) */}
                    <div className="relative w-[90px] shrink-0">
                      <select
                        value={passenger.gender}
                        onChange={(e) => handlePassengerChange(index, 'gender', e.target.value as 'M' | 'F')}
                        className={`w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-2.5 pr-6 text-[13px] font-bold focus:border-[#1565C0] focus:outline-none focus:ring-1 focus:ring-[#1565C0] transition-colors cursor-pointer ${
                          passenger.gender ? 'text-slate-900' : 'text-slate-400 font-medium'
                        }`}
                        aria-label={`Passenger ${index + 1} Gender`}
                      >
                        <option value="" disabled hidden>
                          Gender
                        </option>
                        <option value="M" className="text-slate-900 font-bold">M</option>
                        <option value="F" className="text-slate-900 font-bold">F</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    </div>
                  </div>

                  {/* Warning Prompt if age is out of range */}
                  {ageWarning && (
                    <div className="mt-1 flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-2 py-1 text-[11px] font-semibold text-amber-800 animate-in fade-in duration-150">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber-600" />
                      <span>{ageWarning}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA SUBMIT BUTTON - Send Enquiry */}
        <button
          type="submit"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1565C0] py-3.5 text-[15px] font-bold text-white shadow-lg shadow-[#1565C0]/25 transition-all hover:bg-[#0D47A1] active:scale-[0.98]"
        >
          <Send className="h-4 w-4" />
          <span>Send Enquiry</span>
        </button>
      </form>

      {/* Station Search Modal */}
      <StationSearchModal
        isOpen={searchTarget !== null}
        title={searchTarget === 'from' ? 'Select From Station' : 'Select To Station'}
        placeholder={
          searchTarget === 'from'
            ? 'Search departure station (e.g. NJP, New Delhi)'
            : 'Search arrival station (e.g. HWH, Howrah)'
        }
        stations={stations}
        isLoading={isLoadingStations}
        selectedStation={searchTarget === 'from' ? fromStation : toStation}
        otherSelectedStation={searchTarget === 'from' ? toStation : fromStation}
        onSelect={handleSelectStation}
        onClose={() => setSearchTarget(null)}
      />
    </div>
  )
}
