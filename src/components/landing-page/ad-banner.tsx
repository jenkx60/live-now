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
  const [isMobile, setIsMobile] = useState(false)
  const adContainerRef = useRef<HTMLDivElement>(null)
  const scriptLoadedRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    setIsProduction(process.env.NODE_ENV === "production")

    // to check if its mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isProduction && !adLoaded) {
      loadAppropriateAd()
    }
  }, [isProduction, isMobile, format, adLoaded])

  const loadAppropriateAd = () => {
    if (isMobile) {
      if (format === "horizontal") {
        // using rectangle ad for mobile instead of horizontal
        loadHighPerformanceAd('rectangle')
      } else if (format === "rectangle") {
        loadHighPerformanceAd('rectangle')
      }
    } else {
      // desktop format
      if (format === "horizontal") {
        loadHighPerformanceAd('horizontal')
      } else if (format === "rectangle") {
        loadHighPerformanceAd('rectangle')
      }
    }
  }

  const loadHighPerformanceAd = (adFormat: 'horizontal' | 'rectangle') => {
    const adConfig = {
      horizontal: {
        key: '2747c9461883321cca25fdb26dfd624c',
        height: 90,
        width: 728,
      },
      rectangle: {
        key: '688b96731826738689322ac5cc031df0',
        height: 250,
        width: 300,
      }
    }

    const config = adConfig[adFormat]
    const scriptId = `highperf-ad-${config.key}`

    if (scriptLoadedRef.current.has(scriptId)) {
      setAdLoaded(true)
      return
    }

    try {
      // create a unique varaible on window for ad config
      const globalVarName = `atOptions_${config.key.slice(-8)}`

      // @ts-expect-error: dynamically setting window property
      window[globalVarName] = {
        key: config.key,
        format: 'iframe',
        height: config.height,
        width: config.width,
        params: {}
      }

      // Create and inject the ad script
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `//www.highperformanceformat.com/${config.key}/invoke.js`
      script.async = true
      script.id = scriptId

      script.onerror = () => {
        console.error('Failed to load ad script')
        setAdLoaded(false)
      }

      script.onload = () => {
        console.log('Ad script loaded successfully')
        setAdLoaded(true)
        scriptLoadedRef.current.add(scriptId)
      }

      document.head.appendChild(script)
    } catch (err) {
      console.error("High Performance Format ad error:", err)
    }
  }

  // const loadHighPerformanceAdr = () => {
  //   try {
  //     // @ts-expect-error: 'atOptions' is not defined on the window object type
  //     window.atOptions = {
  //       'key': '688b96731826738689322ac5cc031df0',
  //       'format': 'iframe',
  //       'height': 250,
  //       'width': 300,
  //       'params': {}
  //     }

  //     // Create and inject the ad script
  //     const script = document.createElement('script')
  //     script.type = 'text/javascript'
  //     script.src = '//www.highperformanceformat.com/688b96731826738689322ac5cc031df0/invoke.js'
  //     script.async = true
      
  //     // Add error handling
  //     script.onerror = () => {
  //       console.error('Failed to load High Performance Format ad script')
  //       setAdLoaded(false)
  //     }
      
  //     script.onload = () => {
  //       console.log('High Performance Format ad script loaded successfully')
  //       setAdLoaded(true)
  //     }

  //     // Append to the ad container or document head
  //     if (adContainerRef.current) {
  //       adContainerRef.current.appendChild(script)
  //     } else {
  //       document.head.appendChild(script)
  //     }
  //   } catch (err) {
  //     console.error("High Performance Format ad error:", err)
  //   }
  // }

  // const loadHighPerformanceAdh = () => {
  //   try {
  //     // Set the ad configuration
  //     // @ts-expect-error: 'atOptions' is not defined on the window object type
  //     window.atOptions = {
  //       'key': '2747c9461883321cca25fdb26dfd624c',
  //       'format': 'iframe',
  //       'height': 90,
  //       'width': 728,
  //       'params': {}
  //     }

  //     // Create and inject the ad script
  //     const script = document.createElement('script')
  //     script.type = 'text/javascript'
  //     script.src = '//www.highperformanceformat.com/2747c9461883321cca25fdb26dfd624c/invoke.js'
  //     script.async = true
      
  //     // Add error handling
  //     script.onerror = () => {
  //       console.error('Failed to load High Performance Format ad script')
  //       setAdLoaded(false)
  //     }
      
  //     script.onload = () => {
  //       console.log('High Performance Format ad script loaded successfully')
  //       setAdLoaded(true)
  //     }

  //     // Append to the ad container or document head
  //     if (adContainerRef.current) {
  //       adContainerRef.current.appendChild(script)
  //     } else {
  //       document.head.appendChild(script)
  //     }

  //   } catch (err) {
  //     console.error("High Performance Format ad error:", err)
  //   }
  // }

  const dimensions = {
    horizontal: isMobile ? "h-[250px] w-[300px]" : "h-[90px] w-full max-w-[728px]", // 728×90 leaderboard
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
              {format === "horizontal" 
                ? (isMobile ? "300×250 (Mobile)" : "728×90 (Desktop)")
                : format === "rectangle" 
                  ? "300×250"
                  : "Ad placeholder"
              } will appear here in production
            </p>
            <p className="text-xs text-orange-400 mt-1">
              Device: {isMobile ? "Mobile" : "Desktop"}
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Production ads
  if (format === "rectangle") {
    // High Performance Format ad for horizontal banners
    return (
      <div className={`${dimensions[format]} ${className} mx-auto`}>
        <div 
          ref={adContainerRef}
          className="w-full h-full flex items-center justify-center bg-gray-900/20 rounded border border-gray-800"
          style={{ 
            minHeight: isMobile || format === "rectangle" ? '250px' : '90px',
            maxWidth: isMobile || format === "rectangle" ? '300px' : '728px'
          }}
        >
          {!adLoaded && (
            <div className="text-center text-gray-500 text-xs">
              Loading {isMobile ? 'mobile' : 'desktop'} ad...
            </div>
          )}
        </div>
      </div>
    )
  }

  if (format === "horizontal") {
    // High Performance Format ad for rectangle banners (300×250)
    return (
      <div className={`${dimensions[format]} ${className} mx-auto`}>
        <div 
          ref={adContainerRef}
          className="w-full h-full flex items-center justify-center bg-gray-900/20 rounded border border-gray-800"
          style={{ minHeight: '250px', maxWidth: '300px' }}
        >
          {!adLoaded && (
            <div className="text-center text-gray-500 text-xs">
              Loading rectangle ad...
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