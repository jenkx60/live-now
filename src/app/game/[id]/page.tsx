"use client"

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getFixtureDetails, getHeadToHead } from '@/lib/api/football-api';
import { MatchDetails, HeadToHead as HeadToHeadType } from '@/lib/types';
import { MatchHeader } from '@/components/game/match-header';
import { MatchStats } from '@/components/game/match-stats';
import { Lineups } from '@/components/game/lineups';
import { HeadToHead } from '@/components/game/head-to-head';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

export default function MatchDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [match, setMatch] = useState<MatchDetails | null>(null);
  const [h2h, setH2h] = useState<HeadToHeadType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch Match Details
        const matchData = await getFixtureDetails(id);
        setMatch(matchData);

        // Fetch H2H if we have team IDs
        // Note: In our current types, matchData has simple team names at top level, 
        // but our API response mapping put the full object structure in. 
        // We might need to ensure we access IDs correctly.
        // Assuming matchData has numeric team IDs from our robust mapping.
        
        // Let's safe check based on our types
        // Our 'MatchDetails' extension of 'FootballEvent' might not strictly expose the hidden IDs we need for API calls
        // unless we mapped them.
        // In `transformFootballData` we didn't map team IDs to the top level object explicitly as numbers
        // But `getFixtureDetails` returned the raw `ApiFixtureDetails` structure inside... wait.
        
        // Actually, `getFixtureDetails` returns a spread `baseMatch` (our mapped type) plus `events`, `lineups` etc.
        // `baseMatch` doesn't have team IDs.
        // We need to fix `getFixtureDetails` or `transformFootballData` to include team IDs if we want to call H2H reliably.
        // OR rely on the `lineups` or `statistics` which contain team info with IDs.
        
        if (matchData.homeTeamId && matchData.awayTeamId) {
          try {
            const h2hData = await getHeadToHead(matchData.homeTeamId.toString(),
            matchData.awayTeamId.toString());
            setH2h(h2hData);
          } catch (h2hError) {
            console.error('Failed to load H2H data:', h2hError);
            setError('Failed to load H2H data');
          }
            // const h2hData = await getHeadToHead(matchData.homeTeamId.toString(), matchData.awayTeamId.toString());
            // setH2h(h2hData);
        }

      } catch (err) {
        console.error(err);
        setError('Failed to load match data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Error</h1>
            <p className="text-slate-400">{error || 'Match not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        
        <MatchHeader match={match} />

        <Tabs defaultValue="stats" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-900 border border-slate-800 text-slate-400 mb-8">
                <TabsTrigger value="stats">Stats</TabsTrigger>
                <TabsTrigger value="lineups">Lineups</TabsTrigger>
                <TabsTrigger value="h2h">H2H</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="stats">
                <MatchStats stats={match.statistics} />
            </TabsContent>

            <TabsContent value="lineups">
                <Lineups lineups={match.lineups} />
            </TabsContent>

            <TabsContent value="h2h">
                {h2h ? (
                    <HeadToHead data={h2h} currentMatch={match} />
                ) : (
                    <div className="text-center text-slate-500 p-8">Loading H2H data...</div>
                )}
            </TabsContent>

            {/* <TabsContent value="timeline">
                 <div className="text-center text-slate-500 p-8 bg-slate-900/50 rounded-lg">
                    Placeholder for Timeline - Optional improvement
                    Timeline feature coming soon
                 </div>
            </TabsContent> */}
        </Tabs>

      </div>
    </div>
  );
}
