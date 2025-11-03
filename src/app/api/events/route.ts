import { NextRequest, NextResponse } from "next/server"
import { getAllMockEvents } from "@/lib/mock-data"
import { fetchLiveFootballMatches, fetchTodayFootballFixtures, fetchUpComingFootballFixtures, testAPIConnection } from "@/lib/api/football-api";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sport = searchParams.get("sport");
    const status = searchParams.get("status");
    const test = searchParams.get("test");

    // test endpoint
    if (test === "true") {
      const testResult = await testAPIConnection();
      return NextResponse.json({
        ...testResult,
        timestamp: new Date().toISOString(),
      });
    }

    let events = [];
    let isRealData = false;
    let errorMessage = null;

    // fetch football data
    if (sport === "football" || !sport) {
      try {
        if (status === "live") {
          // get only live matches
          events = await fetchLiveFootballMatches();
        } else if (status === "upcoming") {
          // get upcoming matches (next 3 days)
          events = await fetchUpComingFootballFixtures(3);
        } else if (status === "completed") {
          const todaysMatches = await fetchTodayFootballFixtures();
          events = todaysMatches.filter(match => match.status === "completed");
        } else {
          const [liveMatches, todaysFixtures, upcomingMatches] = await Promise.all([
            fetchLiveFootballMatches().catch(err => {
              return [];
            }),
            fetchTodayFootballFixtures().catch(err => {
              return [];
            }),
            fetchUpComingFootballFixtures(3).catch(err => {
              return [];
            })
          ]);

          // to combine all data and remove duplicates
          const allMatches = [...liveMatches, ...todaysFixtures, ...upcomingMatches];
          const uniqueMatches = allMatches.filter((match, index, self) => 
            index === self.findIndex(m => m.id === match.id)
          );

          events = uniqueMatches
        }

        isRealData = true;
      } catch (error) {
        errorMessage = error instanceof Error ? error.message : 'API error'

        // fallback to mock data
        const mockEvents = getAllMockEvents();
        events = mockEvents.filter(event => event.sport === 'football');

        if (status) {
          events = events.filter(event => event.status === status);
        }

        isRealData = false;
      }
    } else {
      const mockEvents = getAllMockEvents();

      if (sport === 'f1') {
        events = mockEvents.filter(event => event.sport === 'f1');
      } else if (sport === 'nba') {
        events = mockEvents.filter(event => event.sport === 'nba');
      } else {
        events = mockEvents;
      }
      
      if (status) {
        events = events.filter(event => event.status === status);
      }
      
      isRealData = false;
    }
    
    // Return response
    const response = {
      events,
      success: true,
      count: events.length,
      isRealData,
      sport: sport || 'all',
      status: status || 'all',
      timestamp: new Date().toISOString(),
      ...(errorMessage && { fallbackReason: errorMessage })
    };
    
    return NextResponse.json(response);
    
  } catch (error) {
    
    return NextResponse.json({
      error: 'Failed to fetch events',
      message: error instanceof Error ? error.message : 'Unknown error',
      success: false,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
