'use client'

import React, { useState, useEffect, useId, useRef } from 'react'
import { motion } from 'framer-motion'
import { Train, ArrowUpDown, Calendar, AlertCircle, Layers, ChevronDown, Send, Check } from 'lucide-react'
import { Station, loadStations } from '@/lib/stations'
import { StationSearchModal } from '@/components/station-search-modal'

export interface TrainEnquiryData {
  fromStation: Station
  toStation: Station
  journeyDate: string
  travelClass: string
  submittedAt: string
}

interface TrainSearchFormProps {
  onSearch?: (from: Station, to: Station, date: string, travelClass?: string) => void
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
    const formattedDate = formatDateDisplay(selectedDate)

    const enquiryPayload: TrainEnquiryData = {
      fromStation,
      toStation,
      journeyDate: formattedDate,
      travelClass,
      submittedAt: new Date().toISOString(),
    }

    if (onSubmitEnquiry) {
      onSubmitEnquiry(enquiryPayload)
      return
    }

    if (onSearch) {
      onSearch(fromStation, toStation, formattedDate, travelClass)
    } else {
      // Direct WhatsApp enquiry prefilled for Baba Loknath Communication
      const message = encodeURIComponent(
        `Hello Baba Loknath Communication, I would like to submit a train ticket enquiry:\n\n🚉 *From:* ${fromStation.name} (${fromStation.code})\n🏁 *To:* ${toStation.name} (${toStation.code})\n📅 *Departure Date:* ${formattedDate}\n💺 *Preferred Class:* ${travelClass}\n\nPlease check seat availability and booking details.`
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
            onClick={() => setIsClassDropdownOpen((prev) => !prev)}
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
