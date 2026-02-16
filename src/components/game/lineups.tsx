import React from 'react';
import { Lineup, Player } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface LineupsProps {
  lineups: Lineup[];
}

export const Lineups: React.FC<LineupsProps> = ({ lineups }) => {
  if (!lineups || lineups.length < 2) return <div className="p-4 text-center text-slate-500">No lineup information available</div>;

  const homeLineup = lineups[0];
  const awayLineup = lineups[1];

  const PlayerList = ({ players }: { players: { player: Player }[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {players.map(({ player }) => (
            <div key={player.id} className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50 text-slate-200">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-700 font-bold text-xs text-white">
                    {player.number}
                </div>
                <div className="flex flex-col">
                    <span className="font-medium text-sm">{player.name}</span>
                    <span className="text-xs text-slate-400 uppercase">{player.pos}</span>
                </div>
            </div>
        ))}
    </div>
  );

  const CoachDisplay = ({ coach }: { coach: { name: string, photo?: string } }) => (
    <div className="mt-8 pt-4 border-t border-slate-700/50">
        <div className="mb-3 text-xs text-slate-500 font-bold uppercase tracking-wider">Coach</div>
        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 text-slate-200 w-full md:w-1/2">
            <div>
                {coach.photo ? (
                    <img src={coach.photo} alt={coach.name} className="w-full h-full object-cover"/>
                ): (
                    <span className="font-bold text-xs">C</span>
                )}
            </div>
            <span className="font-medium">{coach.name}</span>
        </div>
    </div>
  )

  return (
    <Card className="border-none bg-slate-900/50">
        <CardHeader>
           <CardTitle className="text-white text-center">Team Lineups</CardTitle>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="home" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-slate-800">
                    <TabsTrigger value="home">{homeLineup.team.name}</TabsTrigger>
                    <TabsTrigger value="away">{awayLineup.team.name}</TabsTrigger>
                </TabsList>
                
                {/* Home Team */}
                <TabsContent value="home" className="space-y-6 mt-6">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Formation: {homeLineup.formation}</h3>
                        <div className="mb-2 text-xs text-blue-400 font-bold">STARTING XI</div>
                        <PlayerList players={homeLineup.startXI} />
                    </div>
                     <div>
                        <div className="mb-2 text-xs text-slate-500 font-bold mt-6">SUBSTITUTES</div>
                        <PlayerList players={homeLineup.substitutes} />
                    </div>
                    <CoachDisplay coach={homeLineup.coach} />
                </TabsContent>

                {/* Away Team */}
                <TabsContent value="away" className="space-y-6 mt-6">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Formation: {awayLineup.formation}</h3>
                        <div className="mb-2 text-xs text-red-400 font-bold">STARTING XI</div>
                        <PlayerList players={awayLineup.startXI} />
                    </div>
                    <div>
                        <div className="mb-2 text-xs text-slate-500 font-bold mt-6">SUBSTITUTES</div>
                        <PlayerList players={awayLineup.substitutes} />
                    </div>
                    <CoachDisplay coach={awayLineup.coach} />
                </TabsContent>
            </Tabs>
        </CardContent>
    </Card>
  );
};
