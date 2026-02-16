import React from 'react';
import { HeadToHead as HeadToHeadType, MatchDetails } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface HeadToHeadProps {
  data: HeadToHeadType;
  currentMatch: MatchDetails;
}

export const HeadToHead: React.FC<HeadToHeadProps> = ({ data, currentMatch }) => {
  if (!data || !data.lastMatches || data.lastMatches.length === 0) {
    return <div className="p-4 text-center text-slate-500">No head-to-head data available</div>;
  }

  // Helper to determine winner/result class
  const getResultBadge = (match: any) => {
      // Logic is simplified since we don't know "who" is "us" in the neutral H2H list easily without more context
      // So we just show the score.
      return (
        <Badge variant="outline" className="bg-slate-800 text-white border-slate-700">
            {match.score.fulltime.home} - {match.score.fulltime.away}
        </Badge>
      )
  };

  return (
    <Card className="border-none bg-slate-900/50">
      <CardHeader>
        <CardTitle className="text-white text-center">Last 5 Meetings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.lastMatches.map((match: any) => (
            <div key={match.fixture.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/40 hover:bg-slate-800/60 transition-colors">
                
                {/* Date / League */}
                <div className="flex flex-col w-24">
                    <span className="text-xs text-slate-400">
                        {format(new Date(match.fixture.date), 'dd MMM yyyy')}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase truncate">
                        {match.league.name}
                    </span>
                </div>

                {/* Matchup */}
                <div className="flex flex-1 items-center justify-between px-4">
                    <div className="flex items-center gap-2 flex-1 justify-end text-right">
                         <span className="text-sm font-medium text-slate-200 hidden sm:inline">{match.teams.home.name}</span>
                         <img src={match.teams.home.logo} alt={match.teams.home.name} className="w-6 h-6 object-contain" />
                    </div>

                    <div className="px-3">
                        {getResultBadge(match)}
                    </div>

                    <div className="flex items-center gap-2 flex-1 justify-start text-left">
                        <img src={match.teams.away.logo} alt={match.teams.away.name} className="w-6 h-6 object-contain" />
                         <span className="text-sm font-medium text-slate-200 hidden sm:inline">{match.teams.away.name}</span>
                    </div>
                </div>

            </div>
        ))}
      </CardContent>
    </Card>
  );
};
