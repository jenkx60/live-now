import { NextResponse } from "next/server"
import { getAllMockEvents } from "@/lib/mock-data"

export async function GET() {
  try {
    // In production, this would fetch from real APIs
    // For now, return all mock data
    const events = getAllMockEvents()

    return NextResponse.json({
      events,
      count: events.length,
    })
  } catch (error) {
    console.error("Error fetching all events:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}
