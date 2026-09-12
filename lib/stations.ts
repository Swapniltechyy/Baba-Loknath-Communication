export interface Station {
  name: string
  code: string
  state?: string
  address?: string
}

// Popular stations for quick selection, prioritizing Eastern India / Siliguri hub & major transit hubs
export const POPULAR_STATIONS: Station[] = [
  { name: 'NEW JALPAIGURI', code: 'NJP', state: 'West Bengal' },
  { name: 'SILIGURI JN', code: 'SGUJ', state: 'West Bengal' },
  { name: 'HOWRAH JN', code: 'HWH', state: 'West Bengal' },
  { name: 'SEALDAH', code: 'SDAH', state: 'West Bengal' },
  { name: 'NEW DELHI', code: 'NDLS', state: 'Delhi NCT' },
  { name: 'GUWAHATI', code: 'GHY', state: 'Assam' },
  { name: 'PATNA JN', code: 'PNBE', state: 'Bihar' },
  { name: 'MALDA TOWN', code: 'MLDT', state: 'West Bengal' },
  { name: 'KOLKATA', code: 'KOAA', state: 'West Bengal' },
  { name: 'ALIPUR DUAR JN', code: 'APDJ', state: 'West Bengal' },
  { name: 'DELHI JN (OLD DELHI)', code: 'DLI', state: 'Delhi NCT' },
  { name: 'KATIHAR JN', code: 'KIR', state: 'Bihar' },
  { name: 'MUMBAI CENTRAL', code: 'MMCT', state: 'Maharashtra' },
  { name: 'KSR BENGALURU', code: 'SBC', state: 'Karnataka' },
  { name: 'MGR CHENNAI CTL', code: 'MAS', state: 'Tamil Nadu' },
]

let clientCache: Station[] | null = null
let fetchPromise: Promise<Station[]> | null = null

export async function loadStations(): Promise<Station[]> {
  if (clientCache && clientCache.length > 0) {
    return clientCache
  }

  if (fetchPromise) {
    return fetchPromise
  }

  fetchPromise = (async () => {
    try {
      const res = await fetch('/api/stations')
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) {
          clientCache = data
          return clientCache
        }
      }
    } catch (e) {
      console.warn('API route /api/stations failed, trying direct fallback...', e)
    }

    try {
      const res = await fetch('/train_station/stations.json')
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data?.features)) {
          const list: Station[] = []
          const seen = new Set<string>()
          for (const f of data.features) {
            const p = f.properties
            if (!p || !p.name || !p.code) continue
            const code = String(p.code).trim().toUpperCase()
            const name = String(p.name).trim()
            if (code.startsWith('XX-') || code.startsWith('YY-')) continue
            if (seen.has(code)) continue
            seen.add(code)
            list.push({
              name,
              code,
              state: p.state || undefined,
              address: p.address || undefined,
            })
          }
          clientCache = list
          return clientCache
        }
      }
    } catch (err) {
      console.error('Failed to load stations fallback:', err)
    }

    // Default fallback to popular stations if both fail
    clientCache = POPULAR_STATIONS
    return clientCache
  })()

  return fetchPromise
}

export function searchStations(stations: Station[], rawQuery: string, limit = 60): Station[] {
  const query = rawQuery.trim().toLowerCase()
  if (!query) {
    return POPULAR_STATIONS
  }

  // Exact code match
  const exactCodeMatches: Station[] = []
  // Code starts with query
  const codePrefixMatches: Station[] = []
  // Name starts with query
  const namePrefixMatches: Station[] = []
  // Word in name starts with query
  const wordPrefixMatches: Station[] = []
  // General contains
  const otherMatches: Station[] = []

  const seen = new Set<string>()

  for (const s of stations) {
    const sCode = s.code.toLowerCase()
    const sName = s.name.toLowerCase()

    if (sCode === query) {
      exactCodeMatches.push(s)
      seen.add(s.code)
    } else if (sCode.startsWith(query)) {
      if (!seen.has(s.code)) {
        codePrefixMatches.push(s)
        seen.add(s.code)
      }
    } else if (sName.startsWith(query)) {
      if (!seen.has(s.code)) {
        namePrefixMatches.push(s)
        seen.add(s.code)
      }
    } else {
      const words = sName.split(/\s+/)
      const wordMatch = words.some(w => w.startsWith(query))
      if (wordMatch) {
        if (!seen.has(s.code)) {
          wordPrefixMatches.push(s)
          seen.add(s.code)
        }
      } else if (sName.includes(query) || sCode.includes(query)) {
        if (!seen.has(s.code)) {
          otherMatches.push(s)
          seen.add(s.code)
        }
      }
    }

    if (
      exactCodeMatches.length +
      codePrefixMatches.length +
      namePrefixMatches.length +
      wordPrefixMatches.length +
      otherMatches.length >= limit * 2
    ) {
      break
    }
  }

  return [
    ...exactCodeMatches,
    ...codePrefixMatches,
    ...namePrefixMatches,
    ...wordPrefixMatches,
    ...otherMatches,
  ].slice(0, limit)
}
