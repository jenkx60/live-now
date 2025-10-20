/**
 * Type definitions for Global RaceTime
 */

export interface SportEvent {
  id: string
  sport: "f1" | "nba" | "uefa" | "ufc" | "nfl" | "football"
  title: string
  description?: string
  startTime: string // ISO 8601 UTC string
  endTime?: string
  location?: string
  venue?: string
  teams?: string[]
  status: "upcoming" | "live" | "completed"
  imageUrl?: string
}

export interface F1Event extends SportEvent {
  sport: "f1"
  round: number
  circuit: string
  country: string
  sessionType: "race" | "qualifying" | "practice"
}

export interface NBAEvent extends SportEvent {
  sport: "nba"
  homeTeam: string
  awayTeam: string
  homeScore?: number
  awayScore?: number
}

export interface UEFAEvent extends SportEvent {
  sport: "uefa"
  homeTeam: string
  awayTeam: string
  competition: string
  homeScore?: number
  awayScore?: number
}

export interface UFCEvent extends SportEvent {
  sport: "ufc"
  mainEvent: string
  fighters: string[]
  weightClass?: string
}

export interface NFLEvent extends SportEvent {
  sport: "nfl"
  homeTeam: string
  awayTeam: string
  homeScore?: number
  awayScore?: number
  week?: number
}

export interface FootballEvent extends SportEvent {
  sport: "football"
  homeTeam: string
  awayTeam: string
  competition: string
  league: string
  homeScore?: number | null
  awayScore?: number | null
  minute?: number | null
  halfTime?: boolean 
  fullTime?: boolean
}

export interface LiveScore {
  matchId: string
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  minute: number
  status: "live" | "halftime" | "fulltime" | "upcoming"
  league: string
  competition: string
}

export type FootballLeague =
  | "Premier League"
  | "La Liga"
  | "Serie A"
  | "Bundesliga"
  | "Ligue 1"
  | "Champions League"
  | "Europa League"
  | "Conference League"
  | "MLS"
  | "Liga MX"
  | "Eredivisie"
  | "Primeira Liga"
