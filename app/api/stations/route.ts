import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export interface StationItem {
  name: string
  code: string
  state?: string
  address?: string
}

let cachedStations: StationItem[] | null = null

export async function GET() {
  if (!cachedStations) {
    try {
      const primaryPath = path.join(process.cwd(), 'train_station', 'stations.json')
      const fallbackPath = path.join(process.cwd(), 'public', 'train_station', 'stations.json')
      const targetPath = fs.existsSync(primaryPath) ? primaryPath : fallbackPath

      if (fs.existsSync(targetPath)) {
        const raw = fs.readFileSync(targetPath, 'utf8')
        const data = JSON.parse(raw)
        const seenCodes = new Set<string>()
        const cleanList: StationItem[] = []

        if (Array.isArray(data.features)) {
          for (const feat of data.features) {
            const prop = feat.properties
            if (!prop || !prop.name || !prop.code) continue
            const code = String(prop.code).trim().toUpperCase()
            const name = String(prop.name).trim()

            // Skip placeholder codes like XX-BECE, YY-BPLC
            if (code.startsWith('XX-') || code.startsWith('YY-')) continue
            if (seenCodes.has(code)) continue

            seenCodes.add(code)
            cleanList.push({
              name,
              code,
              state: prop.state ? String(prop.state).trim() : undefined,
              address: prop.address ? String(prop.address).trim() : undefined,
            })
          }
        }

        cachedStations = cleanList
      } else {
        cachedStations = []
      }
    } catch (err) {
      console.error('Failed to load stations data:', err)
      cachedStations = []
    }
  }

  return NextResponse.json(cachedStations, {
    headers: {
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  })
}
