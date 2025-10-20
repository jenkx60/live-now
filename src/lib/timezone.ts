/**
 * Timezone conversion utilities for Global RaceTime
 */

/**
 * Get the user's local timezone
 */
export function getUserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

/**
 * Convert UTC date string to local time
 */
export function convertToLocalTime(utcDateString: string): Date {
  return new Date(utcDateString)
}

/**
 * Format date to local time string
 */
export function formatLocalDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date)
}

/**
 * Format date to short local time
 */
export function formatShortTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date)
}

/**
 * Format date to short date
 */
export function formatShortDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

/**
 * Check if event is upcoming (in the future)
 */
export function isUpcoming(date: Date): boolean {
  return date.getTime() > Date.now()
}

/**
 * Check if event is today
 */
export function isToday(date: Date): boolean {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

/**
 * Get relative time string (e.g., "in 2 hours", "tomorrow")
 */
export function getRelativeTime(date: Date): string {
  const now = Date.now()
  const diff = date.getTime() - now
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (diff < 0) return "Past event"
  if (hours < 1) return "Starting soon"
  if (hours < 24) return `In ${hours} hour${hours !== 1 ? "s" : ""}`
  if (days < 7) return `In ${days} day${days !== 1 ? "s" : ""}`
  return formatShortDate(date)
}

/**
 * Generate iCal format for calendar export
 */
export function generateICalLink(event: {
  title: string
  startTime: Date
  endTime?: Date
  description?: string
  location?: string
}): string {
  const formatICalDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  }

  const endTime = event.endTime || new Date(event.startTime.getTime() + 2 * 60 * 60 * 1000) // Default 2 hours

  const icalContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `DTSTART:${formatICalDate(event.startTime)}`,
    `DTEND:${formatICalDate(endTime)}`,
    `SUMMARY:${event.title}`,
    event.description ? `DESCRIPTION:${event.description}` : "",
    event.location ? `LOCATION:${event.location}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\n")

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(icalContent)}`
}

/**
 * Generate Google Calendar link
 */
export function generateGoogleCalendarLink(event: {
  title: string
  startTime: Date
  endTime?: Date
  description?: string
  location?: string
}): string {
  const formatGoogleDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  }

  const endTime = event.endTime || new Date(event.startTime.getTime() + 2 * 60 * 60 * 1000)

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${formatGoogleDate(event.startTime)}/${formatGoogleDate(endTime)}`,
    details: event.description || "",
    location: event.location || "",
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
