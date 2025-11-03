/**
 * Football API Integration
 * Using API-Football (v3.football.api-sports.io)
 * Free tier: 100 requests/day
 */

const NEXT_PUBLIC_FOOTBALL_API_KEY = process.env.NEXT_PUBLIC_FOOTBALL_API_KEY
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

  const apiKey = NEXT_PUBLIC_FOOTBALL_API_KEY
  if (!apiKey) {
    throw new Error("Missing NEXT_PUBLIC_FOOTBALL_API_KEY environment variable")
  }

  const response = await fetch(url, {
    headers: {
      "x-apisports-key": apiKey,
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

interface RapidAPIFootballMatch {
  fixture: {
    id: number;
    date: string;
    status: {
      long: string;
      short: string;
      elapsed: number | null;
    };
    venue: {
      name: string;
      city: string;
    };
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
    };
    away: {
      id: number;
      name: string;
      logo: string;
    };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  score: {
    halftime: {
      home: number | null;
      away: number | null;
    };
    fulltime: {
      home: number | null;
      away: number | null;
    };
  };
}

interface RapidAPIResponse {
  response: RapidAPIFootballMatch[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
}

// Helper function to make API calls
async function makeRapidAPICall(endpoint: string): Promise<RapidAPIResponse> {
  if (!NEXT_PUBLIC_FOOTBALL_API_KEY) {
    throw new Error("Missing NEXT_PUBLIC_FOOTBALL_API_KEY environment variable")
  }

  console.log(`Fetching Data from: ${BASE_URL}${endpoint}`);

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "x-apisports-key": NEXT_PUBLIC_FOOTBALL_API_KEY,
      "x-apisports-host": API_HOST,
    },
  });

  if (!response.ok) {
    throw new Error(`RapidAPI request failed: ${response.statusText}`);
  }

  const data: RapidAPIResponse = await response.json();
  return data;
}

// translate API status to match our format
function getMatchStatus(apiStatus: string): 'live' | 'upcoming' | 'completed' {
  switch (apiStatus) {
    // for our live matche status
    case '1H':
    case 'HT':
    case '2H':
    case 'ET':
    case 'PEN':
    case 'SUSP':
    case 'LIVE':
      return 'live';

    // for upcoming matches
    case 'NS':
    case 'TBD':
    case 'PST':
    case 'CANC':
      return 'upcoming';

    // for completed matches
    case 'FT':
    case 'AET':
    case 'PEN':
      return 'completed';

    default:
      return 'upcoming';
  }
}

// convert api to our match format
function transformFootballData(matches: RapidAPIFootballMatch[]) {
  return matches.map((match) => ({
    id: match.fixture.id.toString(),
    sport: 'football',
    title: `${match.teams.home.name} vs ${match.teams.away.name}`,
    description: `${match.league.name} Match`,
    startTime: match.fixture.date,
    location: `${match.fixture.venue.city}, ${match.league.country}`,
    venue: match.fixture.venue.name || 'TBD',
    homeTeam: match.teams.home.name,
    awayTeam: match.teams.away.name,
    homeScore: match.goals.home,
    awayScore: match.goals.away,
    status: getMatchStatus(match.fixture.status.short),
    league: match.league.name,
    competition: match.league.name,
    teams: [match.teams.home.name, match.teams.away.name],
    minute: match.fixture.status.elapsed,
    homeTeamLogo: match.teams.home.logo,
    awayTeamLogo: match.teams.away.logo,
    LeagueLogo: match.league.logo,
    countryFlag: match.league.flag,
  }));
}

// to get the live matches
export async function fetchLiveFootballMatches() {
  try {
    const data = await makeRapidAPICall('/fixtures?live=all');
    const transformedMatches = transformFootballData(data.response);
    return transformedMatches;
  } catch (error) {
    console.error("Error fetching live football matches:", error);
    throw error;
  }
}

// to get fixtures for a specific date
export async function fetchFootballFixturesByDate(date: string) {
  try {
    const data = await makeRapidAPICall(`/fixtures?date=${date}`);
    const transformedMatches = transformFootballData(data.response);
    return transformedMatches;
  } catch (error) {
    console.error("Error fetching football fixtures by date:", error);
    throw error;
  }
}

// to get fixtures for today's date
export async function fetchTodayFootballFixtures() {
  const today = new Date().toISOString().split("T")[0];
  return fetchFootballFixturesByDate(today);
}

// upcoming fixtures for the next few days
export async function fetchUpComingFootballFixtures(days: number = 1) {
  try {
    const promises = [];
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dateString = date.toISOString().split("T")[0];
      promises.push(fetchFootballFixturesByDate(dateString));
    }

    const results = await Promise.all(promises);
    const allFixtures = results.flat();
    const upcomingFixtures = allFixtures.filter(fixture => fixture.status === 'upcoming');
    return upcomingFixtures;
  } catch (error) {
    console.error("Error fetching upcoming football fixtures:", error);
    throw error;
  }
}

// get fixtures by upcoming leauges
export async function fetchLeagueFixtures(leagueId: number, season: number = 2020) {
  try {
    const data = await makeRapidAPICall(`/fixtures?league=${leagueId}&season=${season}&next=10`);
    const transformedMatches = transformFootballData(data.response);
    return transformedMatches;
  } catch (error) {
    console.error("Error fetching league fixtures:", error);
    throw error;
  }
}

// popular leagues id from api-football
export const POPULAR_LEAGUES = {
  PREMIER_LEAUGE: 39,
  LA_LIGA: 140,
  SERIE_A: 135,
  BUNDESLIGA: 78,
  LIGUE_1: 61,
  CHAMPIONS_LEAGUE: 2,
  EUROPA_LEAGUE: 3,
  MLS: 253,
  WORLD_CUP: 1,
  AFCON: 4,
  FA_CUP: 45,
  EFL_CUP: 46,
  COMMUNITY_SHIELD: 47,
  COPA_DEL_REY: 143,
}

export async function fetchPopularLeaguesFixtures() {
  try {
    const leaugeIds = [
      POPULAR_LEAGUES.PREMIER_LEAUGE,
      POPULAR_LEAGUES.EUROPA_LEAGUE,
      POPULAR_LEAGUES.AFCON,
      POPULAR_LEAGUES.FA_CUP,
      POPULAR_LEAGUES.EFL_CUP,
      POPULAR_LEAGUES.COMMUNITY_SHIELD,
      POPULAR_LEAGUES.COPA_DEL_REY,
      POPULAR_LEAGUES.MLS,
      POPULAR_LEAGUES.WORLD_CUP,
      POPULAR_LEAGUES.LA_LIGA,
      POPULAR_LEAGUES.SERIE_A,
      POPULAR_LEAGUES.BUNDESLIGA,
      POPULAR_LEAGUES.LIGUE_1,
      POPULAR_LEAGUES.CHAMPIONS_LEAGUE,
    ];

    const promises = leaugeIds.map((id) => fetchLeagueFixtures(id).catch(error => {
      console.warn(`Error fetching fixtures for league ID ${id}:`, error);
      return [];
    }));

    const results = await Promise.all(promises);
    const allMatches = results.flat();
    return allMatches;
  } catch (error) {
    console.error("Error fetching popular leagues fixtures:", error);
    throw error;
  }
}

// Health check function (Test if API is working)
export async function testAPIConnection() {
  try {
    console.log('Testing API connection...');
    const data = await makeRapidAPICall('/fixtures?live=all&last=1');
    console.log('API connection successful!');
    return { success: true, message: 'API is working properly' };
  } catch (error) {
    console.error('API connection failed:', error);
    return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
  }
}