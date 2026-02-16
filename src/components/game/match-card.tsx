import { motion, Variants } from 'framer-motion'
import { FootballEvent } from '@/lib/types'
import React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'

const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.9
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 15
        }
    },
    hover: {
        y: -5,
        scale: 1.02,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 20
        }
    }
}

interface MatchCardProps {
    match: FootballEvent
}

const MatchCard = ({match}: MatchCardProps) => {
  return (
    <motion.div
        variants={cardVariants}
        whileHover="hover"
        layout
    >
        <Link href={`/game/${match.id}`} className='block h-full'>
            <Card className='h-full cursor-pointer'>
                <CardContent className='p-4 space-y-4'>
                    <div className='flex flex-col gap-4'>
                        {/* Status Header */}
                        <div className='flex justify-between items-center text-xs'>
                            <span className='text-slate-400 font-medium'>{match.league}</span>
                            {match.status === "live" && (
                                <Badge variant="destructive" className="animate-pulse px-1.5 py-0.5 text-[10px]">LIVE {match.minute}'</Badge>
                            )}
                            {match.status === "upcoming" && (
                                <span className='text-slate-500'>{formatDate(match.startTime)}</span>
                            )}
                            {match.status === "completed" && (
                                <span className='text-slate-500'>FT</span>
                            )}
                        </div>
                    </div>

                    {/* Teams & Score */}
                    <div className='flex flex-col gap-3'>
                        {/* Home Team */}
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-3'>
                                {/* Logo */}
                                {match.homeTeamLogo ? (
                                    <img 
                                        src={match.homeTeamLogo}
                                        alt={match.homeTeam}
                                        width={40}
                                        height={40}
                                        className='rounded-full object-contain'
                                    />
                                ) : (
                                    <div className='w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-xs font-bold text-slate-300'>{match.homeTeam.substring(0, 1).toUpperCase()}</div>
                                )}
                                <span className='text-white font-semibold text-sm md:text-base group-hover:text-orange-400 transition-colors'>{match.homeTeam}</span>
                            </div>
                            <span className='text-white font-bold text-lg'>{match.homeScore ?? (match.status === "live" ? 0 : "-")}</span>
                        </div>

                        {/* Away Team */}
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-3'>
                                {match.awayTeamLogo ? (
                                    <img
                                        src={match.awayTeamLogo}
                                        alt={match.awayTeam}
                                        width={40}
                                        height={40}
                                        className='rounded-full object-contain' 
                                    />
                                ) : (
                                    <div className='w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-xs font-bold text-slate-300'>{match.awayTeam.substring(0, 1).toUpperCase()}</div>
                                )}
                                <span className='text-white font-semibold text-sm md:text-base group-hover:text-orange-400 transition-colors'>{match.awayTeam}</span>
                            </div>
                            <span className='text-white font-bold text-lg'>{match.awayScore ?? (match.status === "live" ? 0 : "-")}</span>
                        </div>
                    </div>

                    {/* Footer Card Info */}
                    <div className='mt-2 pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500'>
                        <span className='truncate max-w-[150px]'>{match.venue}</span>
                        {match.status === "upcoming" && (
                            <span>{formatDate(match.startTime)}</span>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    </motion.div>
  )
}

export default MatchCard