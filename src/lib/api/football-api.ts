/**
 * Football API Integration
 * Using API-Football (v3.football.api-sports.io)
 * Free tier: 100 requests/day
 */

const NEXT_PUBLIC_FOOTBALL_API_KEY = process.env.NEXT_PUBLIC_FOOTBALL_API_KEY || ""
const BASE_URL = "https://v3.football.api-sports.io"
const API_HOST = "v3.football.api-sports.io"

export interface ApiFootballFixture {
  fixture: {
    id: number
    date: string
    status: {
      short: string // 'NS', 'LIVE', 'FT', 'HT', etc.
      elapsed: number | null
    }
    venue: {
      name: string
      city: string
    }
  }
  league: {
    id: number
    name: string
    country: string
    logo: string
  }
  teams: {
    home: {
      id: number
      name: string
      logo: string
    }
    away: {
      id: number
      name: string
      logo: string
    }
  }
  goals: {
    home: number | null
    away: number | null
  }
  score: {
    halftime: {
      home: number | null
      away: number | null
    }
    fulltime: {
      home: number | null
      away: number | null
    }
  }
}

export interface ApiResponse<T> {
  response: T[]
  results: number
}

async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  const url = `${BASE_URL}${endpoint}`

  const response = await fetch(url, {
    headers: {
      "x-apisports-key": NEXT_PUBLIC_FOOTBALL_API_KEY,
      "x-apisports-host": API_HOST,
    },
    next: { revalidate: 120 }, // Cache for 60 seconds
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`)
  }

  return response.json()
}

// Major league IDs from API-Football
export const LEAGUE_IDS = {
  PREMIER_LEAGUE: 39,
  LA_LIGA: 140,
  SERIE_A: 135,
  BUNDESLIGA: 78,
  LIGUE_1: 61,
  CHAMPIONS_LEAGUE: 2,
  EUROPA_LEAGUE: 3,
  MLS: 253,
}

export async function getLiveFixtures() {
  try {
    const data = await fetchFromAPI<ApiResponse<ApiFootballFixture>>("/fixtures?live=all")
    return data.response
  } catch (error) {
    console.error("Error fetching live fixtures:", error)
    return []
  }
}

export async function getFixturesByDate(date: string) {
  try {
    const data = await fetchFromAPI<ApiResponse<ApiFootballFixture>>(`/fixtures?date=${date}`)
    return data.response
  } catch (error) {
    console.error("Error fetching fixtures by date:", error)
    return []
  }
}

export async function getFixturesByLeague(leagueId: number, season = 2024) {
  try {
    const data = await fetchFromAPI<ApiResponse<ApiFootballFixture>>(
      `/fixtures?league=${leagueId}&season=${season}&next=10`,
    )
    return data.response
  } catch (error) {
    console.error("Error fetching fixtures by league:", error)
    return []
  }
}

export async function getTodayFixtures() {
  const today = new Date().toISOString().split("T")[0]
  return getFixturesByDate(today)
}
