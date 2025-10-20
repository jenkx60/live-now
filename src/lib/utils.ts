import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-us", {
    hour: "2-digit",
    minute: "2-digit"
  })
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-us", {
    month: "short",
    day: "numeric"
  })
}