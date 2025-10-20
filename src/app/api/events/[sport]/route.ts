import { NextResponse } from "next/server"
import { getMockEventsBySport } from "@/lib/mock-data"

export async function GET(request: Request, { params }: { params: { sport: string } }) {
  const { sport } = params

  const validSports = ["f1", "nba", "football", "ufc", "nfl"]
  if (!validSports.includes(sport)) {
    return NextResponse.json({ error: "Invalid sport" }, { status: 400 })
  }

  try {
    // In production, this would fetch from real APIs (RapidAPI, etc.)
    // For now, return mock data
    const events = getMockEventsBySport(sport)

    return NextResponse.json({
      sport,
      events,
      count: events.length,
    })
  } catch (error) {
    console.error(`Error fetching ${sport} events:`, error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}
