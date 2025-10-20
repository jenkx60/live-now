import { NextResponse } from "next/server"
import { mockFootballEvents } from "@/lib/mock-data"
import { fetchLiveMatches, fetchTodayMatches } from "../../../../../action/football-action"

export async function GET() {
  try {
    // Check if API key is available
    const hasApiKey = process.env.NEXT_PUBLIC_FOOTBALL_API_KEY

    if (!hasApiKey) {
      // Return mock data if no API key
      return NextResponse.json({
        events: mockFootballEvents,
        source: "mock",
      })
    }

    // Fetch live and today's matches
    const [liveMatches, todayMatches] = await Promise.all([fetchLiveMatches(), fetchTodayMatches()])

    // Combine and deduplicate
    const allMatches = [...liveMatches, ...todayMatches]
    const uniqueMatches = Array.from(new Map(allMatches.map((match) => [match.id, match])).values())

    return NextResponse.json({
      events: uniqueMatches,
      source: "api",
    })
  } catch (error) {
    console.error("Error in fixtures API route:", error)

    // Fallback to mock data on error
    return NextResponse.json({
      events: mockFootballEvents,
      source: "mock",
      error: "Failed to fetch from API, using mock data",
    })
  }
}
