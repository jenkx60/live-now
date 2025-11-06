// "use client"

// import { Card, CardContent } from "@/components/ui/card"
// import { useEffect, useRef, useState } from "react"

// interface AdBannerProps {
//   slot?: string
//   format?: "horizontal" | "vertical" | "rectangle"
//   className?: string
// }

// export function AdBanner({ slot = "default", format = "horizontal", className = "" }: AdBannerProps) {
//   const [isProduction, setIsProduction] = useState(false)
//   const [adLoaded, setAdLoaded] = useState(false)
//   const adContainerRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     setIsProduction(process.env.NODE_ENV === "production")

//     // In production, initialize Google AdSense
//     if (process.env.NODE_ENV === "production") {
//       try {
//         // @ts-expect-error: 'adsbygoogle' is not defined on the window object type
//         ;(window.adsbygoogle = window.adsbygoogle || []).push({})
//       } catch (err) {
//         console.error("AdSense error:", err)
//       }
//     }
//   }, [])

//   useEffect(() => {
//     // Only load ads in production and for horizontal format (728x90)
//     if (isProduction && format === "horizontal" && !adLoaded) {
//       loa
//     }
//   })

//   const loadHighPerformanceAd = () => {
//     try {
//       window.atOptions = {

//       }
//     }
//   }

//   const dimensions = {
//     horizontal: "h-[90px] md:h-[90px] w-full", // 728×90 leaderboard
//     vertical: "h-[600px] w-[300px]",           // 300×600 half page
//     rectangle: "h-[250px] w-[300px]",          // 300×250 medium rectangle
//   }

//   // Development placeholder
//   if (!isProduction) {
//     return (
//       <Card className={`${dimensions[format]} ${className} border-dashed`}>
//         <CardContent className="h-full flex items-center justify-center p-4">
//           <div className="text-center text-muted-foreground">
//             <p className="text-sm font-medium">Ad Space</p>
//             <p className="text-xs mt-1">Google AdSense will appear here in production</p>
//           </div>
//         </CardContent>
//       </Card>
//     )
//   }

//   // Production AdSense
//   return (
//     <div className={className}>
//       <ins
//         className="adsbygoogle"
//         style={{ display: "block" }}
//         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
//         data-ad-slot={slot}
//         data-ad-format="auto"
//         data-full-width-responsive="true"
//       />
//     </div>
//   )
// }

"use client"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState, useRef } from "react"

interface AdBannerProps {
  slot?: string
  format?: "horizontal" | "vertical" | "rectangle"
  className?: string
}

export function AdBanner({ slot = "default", format = "horizontal", className = "" }: AdBannerProps) {
  const [isProduction, setIsProduction] = useState(false)
  const [adLoaded, setAdLoaded] = useState(false)
  const adContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsProduction(process.env.NODE_ENV === "production")
  }, [])

  useEffect(() => {
    // Only load ads in production and for horizontal format (728x90)
    if (isProduction && format === "horizontal" && !adLoaded) {
      loadHighPerformanceAd()
    }
  }, [isProduction, format, adLoaded])

  const loadHighPerformanceAd = () => {
    try {
      // Set the ad configuration
      // @ts-expect-error: 'atOptions' is not defined on the window object type
      window.atOptions = {
        'key': '2747c9461883321cca25fdb26dfd624c',
        'format': 'iframe',
        'height': 90,
        'width': 728,
        'params': {}
      }

      // Create and inject the ad script
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = '//www.highperformanceformat.com/2747c9461883321cca25fdb26dfd624c/invoke.js'
      script.async = true
      
      // Add error handling
      script.onerror = () => {
        console.error('Failed to load High Performance Format ad script')
        setAdLoaded(false)
      }
      
      script.onload = () => {
        console.log('High Performance Format ad script loaded successfully')
        setAdLoaded(true)
      }

      // Append to the ad container or document head
      if (adContainerRef.current) {
        adContainerRef.current.appendChild(script)
      } else {
        document.head.appendChild(script)
      }

    } catch (err) {
      console.error("High Performance Format ad error:", err)
    }
  }

  const dimensions = {
    horizontal: "h-[90px] w-full max-w-[728px]", // 728×90 leaderboard
    vertical: "h-[600px] w-[300px]",             // 300×600 half page
    rectangle: "h-[250px] w-[300px]",            // 300×250 medium rectangle
  }

  // Development placeholder
  if (!isProduction) {
    return (
      <Card className={`${dimensions[format]} ${className} border-dashed mx-auto`}>
        <CardContent className="h-full flex items-center justify-center p-4">
          <div className="text-center text-muted-foreground">
            <p className="text-sm font-medium">Ad Space ({format})</p>
            <p className="text-xs mt-1">
              {format === "horizontal" ? "728×90 High Performance Format" : "Ad placeholder"} will appear here in production
            </p>
            {format === "horizontal" && (
              <p className="text-xs text-orange-400 mt-1">High Performance Format Ad</p>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Production ads
  if (format === "horizontal") {
    // High Performance Format ad for horizontal banners
    return (
      <div className={`${dimensions[format]} ${className} mx-auto`}>
        <div 
          ref={adContainerRef}
          className="w-full h-full flex items-center justify-center bg-gray-900/20 rounded border border-gray-800"
          style={{ minHeight: '90px', maxWidth: '728px' }}
        >
          {!adLoaded && (
            <div className="text-center text-gray-500 text-xs">
              Loading ad...
            </div>
          )}
        </div>
      </div>
    )
  }

  // Fallback for other formats (vertical/rectangle) - you can add other ad networks here
  return (
    <Card className={`${dimensions[format]} ${className} border-dashed mx-auto`}>
      <CardContent className="h-full flex items-center justify-center p-4">
        <div className="text-center text-muted-foreground">
          <p className="text-sm font-medium">Ad Space ({format})</p>
          <p className="text-xs mt-1">Ad network not configured for this format</p>
        </div>
      </CardContent>
    </Card>
  )
}