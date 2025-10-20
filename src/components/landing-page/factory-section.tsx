import React from 'react'
import { AdBanner } from './ad-banner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Card, CardContent } from '../ui/card'
import { mockFootballEvents } from '@/lib/mock-data'
import { Badge } from '../ui/badge'
import { formatDate, formatTime } from '@/lib/utils'
import BuyCoffee from '../shared/buy-coffee'

const FactorySection = () => {
    const liveMatches = mockFootballEvents.filter(event => event.status === 'live')
    const upcomingMatches = mockFootballEvents.filter(event => event.status === 'upcoming')

    const matchesByLeague = mockFootballEvents.reduce((acc, match) => {
        const league = match.league || match.competition

        if (!acc[league]) {
            acc[league] = []
        }
        acc[league].push(match)
        return acc
    }, {} as Record<string, typeof mockFootballEvents>)
  return (
    <section className='bg-black flex flex-col space-y-10 min-h-[60vh] justify-center border-y-2 p-10'>
        <div className='max-w-6xl mx-auto px-5 py-10 text-center w-full gap-10 flex flex-col'>
            <div className='text-center space-y-4 mb-10'>
                <h1 className='font-bold text-white text-4xl'>Football Live Scores</h1>
                <p className='text-gray-400'>Real-time updates from all major leagues worldwide</p>
            </div>
            <AdBanner slot="1234567890" format="horizontal" className="my-4 mx-auto w-full " />
            <div className='grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8'>
                <div>
                    <Tabs defaultValue='live' className='w-full'>
                        <TabsList className='grid grid-cols-3 mb-8 w-full'>
                            <TabsTrigger value='live'>Live Matches</TabsTrigger>
                            <TabsTrigger value='upcoming'>Upcoming</TabsTrigger>
                            <TabsTrigger value='league'>By League</TabsTrigger>
                        </TabsList>
                        <TabsContent value='live' className='space-y-4'>
                            {liveMatches.map((match) => (
                                <Card key={match.id}>
                                    <CardContent>
                                        <div className='flex items-center justify-between'>
                                            <div className='flex flex-col w-full gap-8'>
                                                <div className='flex justify-between gap-2 mb-2 items-center'>
                                                        <p className='text-gray-400 text-sm'>{match.league}</p>
                                                        <Badge variant="destructive" className='animate-pulse'>LIVE {match.minute}&apos;</Badge>
                                                </div>
                                                <div className='text-white font-bold flex flex-col gap-2'>
                                                    <p>{match.homeTeam} vs {match.awayTeam}</p>
                                                    <p>{match.homeScore} - {match.awayScore}</p>
                                                </div>
                                                <div className='text-gray-400 text-sm'>{match.venue}</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </TabsContent>

                        <TabsContent value='upcoming' className='space-y-4'>
                            {upcomingMatches.map((match) => (
                                <Card key={match.id}>
                                    <CardContent>
                                        <div className='flex items-center justify-between'>
                                            <div className='flex flex-col w-full gap-8'>
                                                <div className='flex justify-between gap-2 mb-2 items-center'>
                                                    <p className='text-gray-400 text-sm'>{match.league}</p>
                                                    <Badge variant="secondary" className=''>{formatDate(match.startTime)}</Badge>
                                                </div>
                                                <div className='text-white font-bold flex flex-col gap-2'>
                                                    <p>{match.homeTeam} vs {match.awayTeam}</p>
                                                    <p>{match.homeScore} - {match.awayScore}</p>
                                                </div>
                                                <div className='text-gray-400 text-sm'>{match.venue}</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </TabsContent>

                        <TabsContent value='league' className='space-y-10'>
                            {Object.entries(matchesByLeague).map(([league, matches]) => (
                                <div key={league}>
                                    <h3 className='text-white font-bold text-xl text-left mb-5'>{league}</h3>
                                    <div className='space-y-3'>
                                        {matches.map((match) => (
                                            <Card key={match.id}>
                                                <CardContent className='p-4'>
                                                    <div className='flex flex-col items-center justify-between space-y-5'>
                                                        <div className='flex flex-col w-full gap-1'>
                                                            <div className='flex items-center justify-end gap-2 mb-1'>
                                                                {match.status === 'live' && (
                                                                    <>
                                                                        <Badge variant="destructive" className='animate-pulse text-xs'>LIVE {match.minute}&apos;</Badge>
                                                                    </>
                                                                )}
                                                                {match.status === 'upcoming' && (
                                                                    <Badge variant="secondary" className='text-xs'>{formatDate(match.startTime)}</Badge>
                                                                )}
                                                            </div>
                                                            <div className='text-white font-semibold text-sm'>
                                                                {match.homeTeam} vs {match.awayTeam}
                                                            </div>
                                                        </div>
                                                        <div className='text-right'>
                                                            {match.status === 'live' ? (
                                                                <div className='text-lg font-bold text-white'>
                                                                    <p>{match.homeScore} - {match.awayScore}</p>
                                                                </div>
                                                            ) : (
                                                                <div className='text-sm font-semibold text-orange-400'>
                                                                    {formatTime(match.startTime)}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </TabsContent>
                    </Tabs>
                </div>
                <div>
                    <AdBanner slot="0987654321" format="vertical" className="my-4 mx-auto w-full max-w-4xl" />
                    <BuyCoffee />
                    <AdBanner slot="0987654321" format="vertical" className="my-4 mx-auto w-full max-w-4xl" />
                </div>
            </div>
        </div>
    </section>
  )
}

export default FactorySection