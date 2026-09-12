'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Train, MapPin, ArrowLeft, Loader2 } from 'lucide-react'
import { Station, POPULAR_STATIONS, searchStations } from '@/lib/stations'

interface StationSearchModalProps {
  isOpen: boolean
  title: string
  placeholder?: string
  stations: Station[]
  isLoading?: boolean
  selectedStation: Station | null
  otherSelectedStation: Station | null
  onSelect: (station: Station) => void
  onClose: () => void
}

export function StationSearchModal({
  isOpen,
  title,
  placeholder = 'Search by station name or code (e.g. NDLS, Delhi)',
  stations,
  isLoading = false,
  selectedStation,
  otherSelectedStation,
  onSelect,
  onClose,
}: StationSearchModalProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      // Small timeout for smooth slide-in before focusing
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Instant local filtering (only search when user enters text, no suggestions)
  const results = useMemo(() => {
    if (!query.trim()) {
      return []
    }
    return searchStations(stations, query, 50)
  }, [stations, query])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex flex-col bg-white station-search-modal">
        {/* Top Header & Search Bar */}
        <div className="sticky top-0 z-10 border-b border-blue-100 bg-white shadow-[0_2px_12px_-4px_rgba(21,101,192,0.08)]">
          <div className="flex items-center gap-2 px-3 pt-3 pb-2">
            <button
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-blue-50 active:bg-blue-100"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5 text-blue-900" />
            </button>
            <div className="flex-1">
              <h2 className="text-base font-bold text-blue-950">{title}</h2>
              <p className="text-[11px] font-medium text-slate-500">
                {stations.length > 0 ? `${stations.length.toLocaleString()} Indian Railway Stations` : 'Loading stations...'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-blue-50 active:bg-blue-100"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Search Input Box */}
          <div className="px-3 pb-3">
            <div className="relative flex items-center rounded-xl border border-blue-200 bg-[#F8FAFC] shadow-sm transition-all focus-within:border-[#1565C0] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#1565C0]/20">
              <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-[#1565C0]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="station-input h-11 w-full rounded-xl bg-transparent pl-10 pr-10 text-[14px] font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    inputRef.current?.focus()
                  }}
                  className="absolute right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300"
                  aria-label="Clear search text"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Section Indicator */}
          <div className="flex items-center justify-between bg-[#F0F6FF] px-4 py-1.5 text-[11px] font-semibold text-[#1565C0]">
            <span>{query.trim() ? `Search Results (${results.length})` : 'Search Station Name or Code'}</span>
          </div>
        </div>

        {/* Results / List Container */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-2 py-2">
          {isLoading && stations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-500">
              <Loader2 className="h-8 w-8 animate-spin text-[#1565C0]" />
              <p className="mt-3 text-sm font-medium">Loading railway stations...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {results.map((station) => {
                const isSelected = selectedStation?.code === station.code
                const isOtherSelected = otherSelectedStation?.code === station.code

                return (
                  <button
                    key={station.code}
                    type="button"
                    disabled={isOtherSelected}
                    onClick={() => {
                      if (!isOtherSelected) {
                        onSelect(station)
                        onClose()
                      }
                    }}
                    className={`station-result group flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                      isOtherSelected
                        ? 'cursor-not-allowed opacity-45 bg-slate-50'
                        : isSelected
                        ? 'bg-[#EAF3FF] border border-[#1565C0]/30'
                        : 'hover:bg-[#F4F8FF] active:bg-[#EAF3FF]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                          isSelected
                            ? 'bg-[#1565C0] text-white'
                            : 'bg-[#EAF3FF] text-[#1565C0] group-hover:bg-[#1565C0] group-hover:text-white'
                        }`}
                      >
                        <Train className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2">
                          <span
                            className={`station-name truncate text-[14px] font-bold ${
                              isSelected ? 'text-[#1565C0]' : 'text-slate-900'
                            }`}
                          >
                            {station.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 truncate mt-0.5">
                          {station.state && (
                            <>
                              <MapPin className="h-3 w-3 shrink-0 text-slate-400" />
                              <span className="truncate">{station.state}</span>
                            </>
                          )}
                          {isOtherSelected && (
                            <span className="text-red-500 font-semibold ml-1">
                              (Already selected as {title.includes('From') ? 'To' : 'From'})
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <span className="station-code rounded-lg bg-[#EAF3FF] px-2.5 py-1 text-xs font-bold tracking-wider text-[#1565C0] border border-blue-200/70">
                        {station.code}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          ) : !query.trim() ? (
            <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF3FF] text-[#1565C0]">
                <Search className="h-7 w-7" />
              </div>
              <h3 className="mt-3 text-base font-bold text-slate-800">Search Railway Stations</h3>
              <p className="mt-1 max-w-xs text-xs text-slate-500">
                Type the station name (e.g. <span className="font-semibold text-[#1565C0]">Delhi</span>, <span className="font-semibold text-[#1565C0]">Howrah</span>) or station code (e.g. <span className="font-semibold text-[#1565C0]">NDLS</span>, <span className="font-semibold text-[#1565C0]">NJP</span>) above.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-[#1565C0]">
                <Search className="h-7 w-7" />
              </div>
              <h3 className="mt-3 text-base font-bold text-slate-800">No stations found</h3>
              <p className="mt-1 max-w-xs text-xs text-slate-500">
                We couldn&apos;t find any station matching &quot;{query}&quot;. Try searching with the station code (e.g. <span className="font-semibold text-[#1565C0]">NDLS</span>, <span className="font-semibold text-[#1565C0]">NJP</span>) or city name.
              </p>
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    inputRef.current?.focus()
                  }}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-[#1565C0] bg-white px-4 py-2 text-xs font-semibold text-[#1565C0] hover:bg-[#EAF3FF]"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </AnimatePresence>
  )
}
