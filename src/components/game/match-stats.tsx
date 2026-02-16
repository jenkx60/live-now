import React from 'react';
import { TeamStatistics } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MatchStatsProps {
  stats: TeamStatistics[];
}

export const MatchStats: React.FC<MatchStatsProps> = ({ stats }) => {
  if (!stats || stats.length < 2) return <div className="p-4 text-center text-slate-500">No statistics available</div>;

  const homeStats = stats[0].statistics;
  const awayStats = stats[1].statistics;
  const homeTeam = stats[0].team;
  const awayTeam = stats[1].team;

  // Helper to find stat value by type
  const getStatValue = (statistics: any[], type: string) => {
    const stat = statistics.find(s => s.type === type);
    return stat ? stat.value : 0;
  };

  // Common stats to display
  const statTypes = [
    'Ball Possession',
    'Shots on Goal',
    'Total Shots',
    'Corner Kicks',
    'Offsides',
    'Fouls',
    'Yellow Cards',
    'Red Cards',
    'Goalkeeper Saves',
    'Total passes',
    'Passes accurate',
  ];

  return (
    <Card className="border-none bg-slate-800/50">
      <CardHeader>
        <CardTitle className="text-center text-white">Match Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
         {/* Team Names Header */}
         <div className="flex justify-between items-center text-sm font-bold text-slate-300 mb-4 px-2">
            <div className="flex items-center gap-2">
                <img src={homeTeam.logo} alt={homeTeam.name} className="w-6 h-6 object-contain" />
                <span className="hidden sm:inline">{homeTeam.name}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="hidden sm:inline">{awayTeam.name}</span>
                <img src={awayTeam.logo} alt={awayTeam.name} className="w-6 h-6 object-contain" />
            </div>
         </div>

         {statTypes.map((type) => {
           let homeValue = getStatValue(homeStats, type);
           let awayValue = getStatValue(awayStats, type);
           
           // Format percentages (e.g. 50%)
           const isPercent = typeof homeValue === 'string' && homeValue.includes('%');
           const homeNum = isPercent ? parseInt(homeValue as string) : Number(homeValue || 0);
           const awayNum = isPercent ? parseInt(awayValue as string) : Number(awayValue || 0);
           const total = homeNum + awayNum;
           
           // Calculate percentage for bar width
           const homeBarWidth = total === 0 ? 50 : (homeNum / total) * 100;
           
           return (
             <div key={type} className="space-y-1">
               <div className="flex justify-between text-xs text-slate-400">
                  <span className="font-semibold text-white">{homeValue ?? 0}</span>
                  <span>{type}</span>
                  <span className="font-semibold text-white">{awayValue ?? 0}</span>
               </div>
               
               <div className="flex h-2 w-full overflow-hidden rounded-full bg-slate-700">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-500" 
                    style={{ width: `${homeBarWidth}%` }}
                  />
                  <div 
                    className="h-full bg-red-500 transition-all duration-500" 
                    style={{ width: `${100 - homeBarWidth}%` }}
                  />
               </div>
             </div>
           );
         })}
      </CardContent>
    </Card>
  );
};
