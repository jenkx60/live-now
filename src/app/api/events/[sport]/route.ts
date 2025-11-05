import { NextResponse } from "next/server"
import { getMockEventsBySport } from "@/lib/mock-data"

export async function GET(
  request: Request,
  { params }: { params: Promise <{ sport: string }> }
) {
  try {
    const { sport } = await params 
    
    const validSports = ["f1", "nba", "football", "ufc", "nfl"]
    
    if (!validSports.includes(sport)) {
      return NextResponse.json(
        { error: "Invalid sport parameter" }, 
        { status: 400 }
      )
    }

    // Check if getMockEventsBySport function exists
    if (typeof getMockEventsBySport !== 'function') {
      throw new Error('getMockEventsBySport is not a function')
    }

    const events = getMockEventsBySport(sport)

    return NextResponse.json({
      sport,
      events,
      count: events.length,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    const resolvedParams = await params;
    console.error(`Error fetching ${resolvedParams.sport || 'unknown'} events:`, error)
    
    return NextResponse.json(
      { 
        error: "Failed to fetch events",
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
}