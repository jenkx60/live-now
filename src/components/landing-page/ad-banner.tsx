"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface AdBannerProps {
  slot?: string
  format?: "horizontal" | "vertical" | "rectangle"
  className?: string
}

export function AdBanner({ slot = "default", format = "horizontal", className = "" }: AdBannerProps) {
  const [isProduction, setIsProduction] = useState(false)

  useEffect(() => {
    setIsProduction(process.env.NODE_ENV === "production")

    // In production, initialize Google AdSense
    if (process.env.NODE_ENV === "production") {
      try {
        // @ts-expect-error: 'adsbygoogle' is not defined on the window object type
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (err) {
        console.error("AdSense error:", err)
      }
    }
  }, [])

  const dimensions = {
    horizontal: "h-[90px] md:h-[90px] w-full", // 728×90 leaderboard
    vertical: "h-[600px] w-[300px]",           // 300×600 half page
    rectangle: "h-[250px] w-[300px]",          // 300×250 medium rectangle
  }

  // Development placeholder
  if (!isProduction) {
    return (
      <Card className={`${dimensions[format]} ${className} border-dashed`}>
        <CardContent className="h-full flex items-center justify-center p-4">
          <div className="text-center text-muted-foreground">
            <p className="text-sm font-medium">Ad Space</p>
            <p className="text-xs mt-1">Google AdSense will appear here in production</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Production AdSense
  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
