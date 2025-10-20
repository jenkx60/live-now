/**
 * Mock data for development
 * In production, this will be replaced with real API calls
 */

import type { F1Event, NBAEvent, UEFAEvent, UFCEvent, NFLEvent, FootballEvent } from "./types"

// Helper to generate dates relative to now
const addDays = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString()
}

const addHours = (hours: number) => {
  const date = new Date()
  date.setHours(date.getHours() + hours)
  return date.toISOString()
}

export const mockF1Events: F1Event[] = [
  {
    id: "f1-1",
    sport: "f1",
    title: "Monaco Grand Prix",
    description: "Formula 1 Race",
    startTime: addDays(7),
    location: "Monaco",
    venue: "Circuit de Monaco",
    round: 8,
    circuit: "Circuit de Monaco",
    country: "Monaco",
    sessionType: "race",
    status: "upcoming",
  },
  {
    id: "f1-2",
    sport: "f1",
    title: "Canadian Grand Prix - Qualifying",
    description: "Formula 1 Qualifying Session",
    startTime: addDays(14),
    location: "Montreal, Canada",
    venue: "Circuit Gilles Villeneuve",
    round: 9,
    circuit: "Circuit Gilles Villeneuve",
    country: "Canada",
    sessionType: "qualifying",
    status: "upcoming",
  },
  {
    id: "f1-3",
    sport: "f1",
    title: "Canadian Grand Prix",
    description: "Formula 1 Race",
    startTime: addDays(15),
    location: "Montreal, Canada",
    venue: "Circuit Gilles Villeneuve",
    round: 9,
    circuit: "Circuit Gilles Villeneuve",
    country: "Canada",
    sessionType: "race",
    status: "upcoming",
  },
]

export const mockNBAEvents: NBAEvent[] = [
  {
    id: "nba-1",
    sport: "nba",
    title: "Lakers vs Warriors",
    description: "NBA Regular Season",
    startTime: addHours(48),
    location: "Los Angeles, CA",
    venue: "Crypto.com Arena",
    homeTeam: "Los Angeles Lakers",
    awayTeam: "Golden State Warriors",
    teams: ["Los Angeles Lakers", "Golden State Warriors"],
    status: "upcoming",
  },
  {
    id: "nba-2",
    sport: "nba",
    title: "Celtics vs Heat",
    description: "NBA Regular Season",
    startTime: addDays(3),
    location: "Boston, MA",
    venue: "TD Garden",
    homeTeam: "Boston Celtics",
    awayTeam: "Miami Heat",
    teams: ["Boston Celtics", "Miami Heat"],
    status: "upcoming",
  },
  {
    id: "nba-3",
    sport: "nba",
    title: "Bucks vs Nets",
    description: "NBA Regular Season",
    startTime: addDays(5),
    location: "Milwaukee, WI",
    venue: "Fiserv Forum",
    homeTeam: "Milwaukee Bucks",
    awayTeam: "Brooklyn Nets",
    teams: ["Milwaukee Bucks", "Brooklyn Nets"],
    status: "upcoming",
  },
]

export const mockUEFAEvents: UEFAEvent[] = [
  {
    id: "uefa-1",
    sport: "uefa",
    title: "Real Madrid vs Manchester City",
    description: "UEFA Champions League Semi-Final",
    startTime: addDays(4),
    location: "Madrid, Spain",
    venue: "Santiago Bernabéu",
    homeTeam: "Real Madrid",
    awayTeam: "Manchester City",
    teams: ["Real Madrid", "Manchester City"],
    competition: "Champions League",
    status: "upcoming",
  },
  {
    id: "uefa-2",
    sport: "uefa",
    title: "Bayern Munich vs Barcelona",
    description: "UEFA Champions League Semi-Final",
    startTime: addDays(5),
    location: "Munich, Germany",
    venue: "Allianz Arena",
    homeTeam: "Bayern Munich",
    awayTeam: "Barcelona",
    teams: ["Bayern Munich", "Barcelona"],
    competition: "Champions League",
    status: "upcoming",
  },
]

export const mockUFCEvents: UFCEvent[] = [
  {
    id: "ufc-1",
    sport: "ufc",
    title: "UFC 300: Main Event",
    description: "UFC Pay-Per-View",
    startTime: addDays(10),
    location: "Las Vegas, NV",
    venue: "T-Mobile Arena",
    mainEvent: "Heavyweight Championship",
    fighters: ["Jon Jones", "Stipe Miocic"],
    weightClass: "Heavyweight",
    status: "upcoming",
  },
  {
    id: "ufc-2",
    sport: "ufc",
    title: "UFC Fight Night",
    description: "UFC Fight Night Event",
    startTime: addDays(17),
    location: "Abu Dhabi, UAE",
    venue: "Etihad Arena",
    mainEvent: "Middleweight Bout",
    fighters: ["Israel Adesanya", "Sean Strickland"],
    weightClass: "Middleweight",
    status: "upcoming",
  },
]

export const mockNFLEvents: NFLEvent[] = [
  {
    id: "nfl-1",
    sport: "nfl",
    title: "Chiefs vs Bills",
    description: "NFL Regular Season - Week 12",
    startTime: addDays(6),
    location: "Kansas City, MO",
    venue: "Arrowhead Stadium",
    homeTeam: "Kansas City Chiefs",
    awayTeam: "Buffalo Bills",
    teams: ["Kansas City Chiefs", "Buffalo Bills"],
    week: 12,
    status: "upcoming",
  },
  {
    id: "nfl-2",
    sport: "nfl",
    title: "49ers vs Cowboys",
    description: "NFL Regular Season - Week 12",
    startTime: addDays(7),
    location: "San Francisco, CA",
    venue: "Levi's Stadium",
    homeTeam: "San Francisco 49ers",
    awayTeam: "Dallas Cowboys",
    teams: ["San Francisco 49ers", "Dallas Cowboys"],
    week: 12,
    status: "upcoming",
  },
]

export const mockFootballEvents: FootballEvent[] = [
  // Premier League - Live Matches
  {
    id: "fb-1",
    sport: "football",
    title: "Manchester City vs Arsenal",
    description: "Premier League Matchday 15",
    startTime: addHours(-1),
    location: "Manchester, England",
    venue: "Etihad Stadium",
    homeTeam: "Manchester City",
    awayTeam: "Arsenal",
    teams: ["Manchester City", "Arsenal"],
    competition: "Premier League",
    league: "Premier League",
    homeScore: 2,
    awayScore: 1,
    minute: 67,
    status: "live",
  },
  {
    id: "fb-2",
    sport: "football",
    title: "Liverpool vs Chelsea",
    description: "Premier League Matchday 15",
    startTime: addHours(-1),
    location: "Liverpool, England",
    venue: "Anfield",
    homeTeam: "Liverpool",
    awayTeam: "Chelsea",
    teams: ["Liverpool", "Chelsea"],
    competition: "Premier League",
    league: "Premier League",
    homeScore: 1,
    awayScore: 1,
    minute: 72,
    status: "live",
  },
  // La Liga - Live Match
  {
    id: "fb-3",
    sport: "football",
    title: "Real Madrid vs Barcelona",
    description: "La Liga Matchday 16",
    startTime: addHours(-0.5),
    location: "Madrid, Spain",
    venue: "Santiago Bernabéu",
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    teams: ["Real Madrid", "Barcelona"],
    competition: "La Liga",
    league: "La Liga",
    homeScore: 0,
    awayScore: 0,
    minute: 38,
    status: "live",
  },
  // Serie A - Upcoming
  {
    id: "fb-4",
    sport: "football",
    title: "Inter Milan vs AC Milan",
    description: "Serie A Matchday 14",
    startTime: addHours(2),
    location: "Milan, Italy",
    venue: "San Siro",
    homeTeam: "Inter Milan",
    awayTeam: "AC Milan",
    teams: ["Inter Milan", "AC Milan"],
    competition: "Serie A",
    league: "Serie A",
    status: "upcoming",
  },
  {
    id: "fb-5",
    sport: "football",
    title: "Juventus vs Napoli",
    description: "Serie A Matchday 14",
    startTime: addHours(4),
    location: "Turin, Italy",
    venue: "Allianz Stadium",
    homeTeam: "Juventus",
    awayTeam: "Napoli",
    teams: ["Juventus", "Napoli"],
    competition: "Serie A",
    league: "Serie A",
    status: "upcoming",
  },
  // Bundesliga - Upcoming
  {
    id: "fb-6",
    sport: "football",
    title: "Bayern Munich vs Borussia Dortmund",
    description: "Bundesliga Matchday 13",
    startTime: addDays(1),
    location: "Munich, Germany",
    venue: "Allianz Arena",
    homeTeam: "Bayern Munich",
    awayTeam: "Borussia Dortmund",
    teams: ["Bayern Munich", "Borussia Dortmund"],
    competition: "Bundesliga",
    league: "Bundesliga",
    status: "upcoming",
  },
  {
    id: "fb-7",
    sport: "football",
    title: "RB Leipzig vs Bayer Leverkusen",
    description: "Bundesliga Matchday 13",
    startTime: addDays(1),
    location: "Leipzig, Germany",
    venue: "Red Bull Arena",
    homeTeam: "RB Leipzig",
    awayTeam: "Bayer Leverkusen",
    teams: ["RB Leipzig", "Bayer Leverkusen"],
    competition: "Bundesliga",
    league: "Bundesliga",
    status: "upcoming",
  },
  // Ligue 1 - Upcoming
  {
    id: "fb-8",
    sport: "football",
    title: "PSG vs Marseille",
    description: "Ligue 1 Matchday 14",
    startTime: addDays(2),
    location: "Paris, France",
    venue: "Parc des Princes",
    homeTeam: "Paris Saint-Germain",
    awayTeam: "Marseille",
    teams: ["Paris Saint-Germain", "Marseille"],
    competition: "Ligue 1",
    league: "Ligue 1",
    status: "upcoming",
  },
  // Champions League - Upcoming
  {
    id: "fb-9",
    sport: "football",
    title: "Manchester United vs Bayern Munich",
    description: "UEFA Champions League Group Stage",
    startTime: addDays(3),
    location: "Manchester, England",
    venue: "Old Trafford",
    homeTeam: "Manchester United",
    awayTeam: "Bayern Munich",
    teams: ["Manchester United", "Bayern Munich"],
    competition: "Champions League",
    league: "Champions League",
    status: "upcoming",
  },
  {
    id: "fb-10",
    sport: "football",
    title: "Atletico Madrid vs Inter Milan",
    description: "UEFA Champions League Group Stage",
    startTime: addDays(3),
    location: "Madrid, Spain",
    venue: "Wanda Metropolitano",
    homeTeam: "Atletico Madrid",
    awayTeam: "Inter Milan",
    teams: ["Atletico Madrid", "Inter Milan"],
    competition: "Champions League",
    league: "Champions League",
    status: "upcoming",
  },
  // Europa League - Upcoming
  {
    id: "fb-11",
    sport: "football",
    title: "Sevilla vs Roma",
    description: "UEFA Europa League Group Stage",
    startTime: addDays(4),
    location: "Seville, Spain",
    venue: "Ramón Sánchez Pizjuán",
    homeTeam: "Sevilla",
    awayTeam: "Roma",
    teams: ["Sevilla", "Roma"],
    competition: "Europa League",
    league: "Europa League",
    status: "upcoming",
  },
  // MLS - Upcoming
  {
    id: "fb-12",
    sport: "football",
    title: "LA Galaxy vs Seattle Sounders",
    description: "MLS Regular Season",
    startTime: addDays(5),
    location: "Los Angeles, CA",
    venue: "Dignity Health Sports Park",
    homeTeam: "LA Galaxy",
    awayTeam: "Seattle Sounders",
    teams: ["LA Galaxy", "Seattle Sounders"],
    competition: "MLS",
    league: "MLS",
    status: "upcoming",
  },
  // More Premier League fixtures
  {
    id: "fb-13",
    sport: "football",
    title: "Tottenham vs Newcastle",
    description: "Premier League Matchday 16",
    startTime: addDays(6),
    location: "London, England",
    venue: "Tottenham Hotspur Stadium",
    homeTeam: "Tottenham Hotspur",
    awayTeam: "Newcastle United",
    teams: ["Tottenham Hotspur", "Newcastle United"],
    competition: "Premier League",
    league: "Premier League",
    status: "upcoming",
  },
  {
    id: "fb-14",
    sport: "football",
    title: "Manchester United vs Aston Villa",
    description: "Premier League Matchday 16",
    startTime: addDays(7),
    location: "Manchester, England",
    venue: "Old Trafford",
    homeTeam: "Manchester United",
    awayTeam: "Aston Villa",
    teams: ["Manchester United", "Aston Villa"],
    competition: "Premier League",
    league: "Premier League",
    status: "upcoming",
  },
]

export function getMockEventsBySport(sport: string) {
  switch (sport) {
    case "f1":
      return mockF1Events
    case "nba":
      return mockNBAEvents
    case "uefa":
    case "football": // Added football alias
      return mockFootballEvents
    case "ufc":
      return mockUFCEvents
    case "nfl":
      return mockNFLEvents
    default:
      return []
  }
}

export function getAllMockEvents() {
  return [
    ...mockF1Events,
    ...mockNBAEvents,
    ...mockUEFAEvents,
    ...mockUFCEvents,
    ...mockNFLEvents,
    ...mockFootballEvents,
  ]
}
