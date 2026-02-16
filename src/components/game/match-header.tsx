import React from 'react';
import { MatchDetails } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { format } from 'date-fns';

interface MatchHeaderProps {
  match: MatchDetails;
}

export const MatchHeader: React.FC<MatchHeaderProps> = ({ match }) => {
  const isLive = match.status === 'live';
  const isCompleted = match.status === 'completed';

  return (
    <Card className="w-full bg-slate-900 border-none text-white overflow-hidden relative mb-6">
       {/* Background Image / Overlay - Optional */}
      <div className="absolute inset-0 bg-linear-to-b from-blue-900/20 to-slate-900 z-0" />
      
      <CardContent className="p-6 relative z-10">
        <div className="flex flex-col items-center">
          
          {/* League Info */}
          <div className="flex items-center gap-2 mb-6">
             {match.leagueLogo && (
              <img src={match.leagueLogo} alt="League" className="w-6 h-6 object-contain" />
             )}
             <span className="text-sm font-medium text-slate-300 uppercase tracking-wider">
               {match.league}
             </span>
          </div>

          <div className="flex items-center justify-between w-full max-w-4xl mx-auto">
            
            {/* Home Team */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-20 h-20 md:w-28 md:h-28 relative mb-4">
                 <img 
                   src={match.homeTeamLogo || '/placeholder-team.png'} 
                   alt={match.homeTeam} 
                   className="w-full h-full object-contain drop-shadow-lg"
                 />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-center">{match.homeTeam}</h2>
            </div>

            {/* Score / Status */}
            <div className="flex flex-col items-center px-8">
              {isLive || isCompleted ? (
                <div className="text-5xl md:text-7xl font-bold tracking-tighter mb-2">
                  {match.homeScore ?? 0} - {match.awayScore ?? 0}
                </div>
              ) : (
                <div className="text-4xl md:text-6xl font-black tracking-tighter mb-2 text-slate-400">
                  VS
                </div>
              )}
              
              <Badge 
                variant={isLive ? "destructive" : "secondary"}
                className={`text-sm px-3 py-1 ${isLive ? 'animate-pulse' : ''}`}
              >
                {isLive ? `${match.minute}'` : match.status.toUpperCase()}
              </Badge>
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center flex-1">
               <div className="w-20 h-20 md:w-28 md:h-28 relative mb-4">
                 <img 
                   src={match.awayTeamLogo || '/placeholder-team.png'} 
                   alt={match.awayTeam} 
                   className="w-full h-full object-contain drop-shadow-lg"
                 />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-center">{match.awayTeam}</h2>
            </div>

          </div>

          {/* Details Footer */}
          <div className="mt-8 flex flex-col md:flex-row items-center gap-4 text-slate-400 text-sm">
             <div className="flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
               </svg>
               {match.startTime ? format(new Date(match.startTime), 'PPP p') : 'TBD'}
             </div>
             {match.venue && (
               <>
                 <span className="hidden md:inline">•</span>
                 <div className="flex items-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                   </svg>
                   {match.venue}, {match.location}
                 </div>
               </>
             )}
          </div>

        </div>
      </CardContent>
    </Card>
  );
};
