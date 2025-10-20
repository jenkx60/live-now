"use server"

import {
  getLiveFixtures,
  getTodayFixtures,
  getFixturesByLeague,
  LEAGUE_IDS,
  type ApiFootballFixture,
} from "@/lib/api/football-api"
import type { FootballEvent } from "@/lib/types"

function mapApiFixtureToEvent(fixture: ApiFootballFixture): FootballEvent {
  const isLive =
    fixture.fixture.status.short === "LIVE" ||
    fixture.fixture.status.short === "1H" ||
    fixture.fixture.status.short === "2H" ||
    fixture.fixture.status.short === "HT"

  const isFinished = fixture.fixture.status.short === "FT"

  return {
    id: `fb-${fixture.fixture.id}`,
    sport: "football",
    title: `${fixture.teams.home.name} vs ${fixture.teams.away.name}`,
    description: `${fixture.league.name}`,
    startTime: fixture.fixture.date,
    location: `${fixture.fixture.venue.city}, ${fixture.league.country}`,
    venue: fixture.fixture.venue.name,
    homeTeam: fixture.teams.home.name,
    awayTeam: fixture.teams.away.name,
    teams: [fixture.teams.home.name, fixture.teams.away.name],
    competition: fixture.league.name,
    league: fixture.league.name,
    homeScore: fixture.goals.home,
    awayScore: fixture.goals.away,
    minute: fixture.fixture.status.elapsed,
    status: isLive ? "live" : isFinished ? "completed" : "upcoming",
  }
}

export async function fetchLiveMatches(): Promise<FootballEvent[]> {
  try {
    const fixtures = await getLiveFixtures()
    return fixtures.map(mapApiFixtureToEvent)
  } catch (error) {
    console.error("Error in fetchLiveMatches:", error)
    return []
  }
}

export async function fetchTodayMatches(): Promise<FootballEvent[]> {
  try {
    const fixtures = await getTodayFixtures()
    return fixtures.map(mapApiFixtureToEvent)
  } catch (error) {
    console.error("Error in fetchTodayMatches:", error)
    return []
  }
}

export async function fetchUpcomingMatches(): Promise<FootballEvent[]> {
  try {
    // Fetch from major leagues
    const leagues = [
      LEAGUE_IDS.PREMIER_LEAGUE,
      LEAGUE_IDS.LA_LIGA,
      LEAGUE_IDS.SERIE_A,
      LEAGUE_IDS.BUNDESLIGA,
      LEAGUE_IDS.LIGUE_1,
      LEAGUE_IDS.CHAMPIONS_LEAGUE,
    ]

    const allFixtures = await Promise.all(leagues.map((leagueId) => getFixturesByLeague(leagueId)))

    const fixtures = allFixtures.flat()
    return fixtures.map(mapApiFixtureToEvent)
  } catch (error) {
    console.error("Error in fetchUpcomingMatches:", error)
    return []
  }
}
