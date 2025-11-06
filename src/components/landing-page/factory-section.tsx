"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AdBanner } from './ad-banner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Card, CardContent } from '../ui/card'
// import { mockFootballEvents } from '@/lib/mock-data'
import { Badge } from '../ui/badge'
import { formatDate, formatTime } from '@/lib/utils'
import BuyCoffee from '../shared/buy-coffee'
import { motion } from 'framer-motion'
import { Variants } from 'framer-motion'
import { useFootballData } from '../../../hooks/use-football-data'
import { AlertCircle, ChevronLeft, Filter, Loader2, RefreshCw, Search, Wifi, WifiOff, X } from 'lucide-react'
import { Button } from '../ui/button'
import { FootballEvent } from '@/lib/types'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { totalmem } from 'os'

const FactorySection = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLeague, setSelectedLeague] = useState<string>("all");
    const [selectedStatus, setSelectedStatus] = useState<string>("all");
    const [showFilters, setShowFilters] = useState<boolean>(false);
    // const [displayedMatches, setDisplayedMatches] = useState<{
    //     live: FootballEvent[];
    //     upcoming: FootballEvent[];
    //     league: Record<string, FootballEvent[]>;
    // }>({
    //     live: [],
    //     upcoming: [],
    //     league: {}
    // });
    const [currentPage, setCurrentPage] = useState({
        live: 1,
        upcoming: 1,
        league: 1
    });

    const ITEMS_PER_PAGE = 20;

    // const [isAutoScrolling, setIsAutoScrolling] = useState(true);
    // const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // use api data instea of mock data when api is working
    const {
        data: allMatches,
        loading,
        error,
        isRealData,
        lastUpdated,
        refetch,
        apiStatus
    } = useFootballData("football", undefined, true, 15 * 60 * 1000); // refresh every 15 minutes

    // To ensure we're working with FootballEvent
    const footballMatches = allMatches as FootballEvent[];

    // api testing logs for debugging
    // const { testAPI, testing, result } = useAPITest();

    //league and status filters
    const availableLeagues = useMemo(() => {
        const leagues = new Set(footballMatches.map(match => match.league || match.competition || 'Other'))
        return Array.from(leagues).sort();
    }, [footballMatches]);

    // filtering logic
    const filteredMatches = useMemo(() => {
        return footballMatches.filter(match => {
            const matchesSearch = searchTerm === "" ||
                match.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
                match.awayTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (match.league || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                (match.competition || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                (match.venue || "").toLowerCase().includes(searchTerm.toLowerCase());

            const matchesLeague = selectedLeague === "all" || 
                match.league === selectedLeague ||
                match.competition === selectedLeague;
            
            const matchesStatus = selectedLeague === "all" || match.status === selectedStatus;

            return matchesSearch && matchesLeague && matchesStatus;
        });
    }, [footballMatches, searchTerm, selectedLeague, selectedStatus]);

    // filter matches by status
    const liveMatches = filteredMatches.filter(event => event.status === "live");
    const upcomingMatches = filteredMatches.filter(event => event.status === "upcoming");
    const completedMatches = filteredMatches.filter(event => event.status === "completed");

    // group matches by league
    const matchesByLeague = filteredMatches.reduce((acc, match) => {
        const league = match.league || match.competition || "Other";
        if (!acc[league]) {
            acc[league] = [];
        }
        acc[league].push(match);
        return acc;
    }, {} as Record<string, FootballEvent[]>)

    const getPaginatedData = (data: FootballEvent[], page: number) => {
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return data.slice(startIndex, endIndex);
    };

    const getTotalPages = (dataLength: number) => {
        return Math.ceil(dataLength / ITEMS_PER_PAGE);
    };

    useEffect(() => {
        setCurrentPage({
            live: 1,
            upcoming: 1,
            league: 1
        });
    }, [searchTerm, selectedLeague, selectedStatus])


    // useEffect(() => {
    //     if (!isAutoScrolling || filteredMatches.length === 0 ) return;

    //     setDisplayedMatches({
    //         live: liveMatches.slice(0, ITEMS_PER_BATCH),
    //         upcoming: upcomingMatches.slice(0, ITEMS_PER_BATCH),
    //         league: Object.fromEntries(
    //             Object.entries(matchesByLeague).map(([league, matches]) => [
    //                 league,
    //                 matches.slice(0, ITEMS_PER_BATCH)
    //             ])
    //         )
    //     });

    //     // set up auto-scrolling interval
    //     intervalRef.current = setInterval(() => {
    //         setCurrentIndex(prev => {
    //             const newIndex = {
    //                 live: liveMatches.length > ITEMS_PER_BATCH
    //                     ? (prev.live + ITEMS_PER_BATCH) % liveMatches.length
    //                     : 0,
    //                 upcoming: upcomingMatches.length > ITEMS_PER_BATCH
    //                     ? (prev.upcoming + ITEMS_PER_BATCH) % upcomingMatches.length
    //                     : 0,
    //                 league: prev.league // for league, we will not auto scroll for now
    //             };
                
    //             // update displayed matches 
    //             setDisplayedMatches({
    //                 live: liveMatches.slice(newIndex.live, newIndex.live + ITEMS_PER_BATCH),
    //                 upcoming: upcomingMatches.slice(newIndex.upcoming, newIndex.upcoming + ITEMS_PER_BATCH),
    //                 league: Object.fromEntries(
    //                     Object.entries(matchesByLeague).map(([league, matches]) => [
    //                         league,
    //                         matches.slice(0, ITEMS_PER_BATCH)
    //                     ])
    //                 )
    //             });
    //             return newIndex;
    //         });
    //     }, SCROLL_INTERVAL);

    //     return () => {
    //         if (intervalRef.current) {
    //             clearInterval(intervalRef.current);
    //         }
    //     };
    // }, [filteredMatches, liveMatches, upcomingMatches, matchesByLeague, isAutoScrolling]);

    // Clear all filters function
    const clearFilters = () => {
        setSearchTerm("");
        setSelectedLeague("all");
        setSelectedStatus("all");
        setCurrentPage({
            live: 1,
            upcoming: 1,
            league: 1
        });
    };

    const handlePageChange = (tab: 'live' | 'upcoming' | 'league' , page: number) => {
        setCurrentPage(prev => ({
            ...prev,
            [tab]: page
        }));
    };

    // pagination component
    const PaginationControls = ({
        currentPage,
        totalPages,
        onPageChange,
        totalItems,
        tab
    }: {
        currentPage: number;
        totalPages: number;
        onPageChange: (page: number) => void;
        totalItems: number;
        tab: string;
    }) => {
        if (totalPages <= 1) return null;

        const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
        const endItem = Math.min(startItem + ITEMS_PER_PAGE - 1, totalItems);

        return (
            <div className='flex flex-col items-center justify-between gap-4 mt-6 p-3 md:p-4 rounded-lg'>
                <div className='text-xs md:text-sm text-white order-2 md:order-1'>
                    Showing {startItem}-{endItem} of {totalItems} matches
                </div>

                <div className='flex items-centergap-1 md:gap-2 order-1 md:order-2'>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className='text-white disabled:opacity-50 text-xs md:text-sm'
                    >
                        <ChevronLeft className='w-3 h-3 md:w-4 md:h-4' />
                        Previous
                    </Button>

                    <div className='flex items-center gap-1'>
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNumber;
                            if (totalPages <= 5) {
                                pageNumber = i + 1;
                            } else if (currentPage <= 3) {
                                pageNumber = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                pageNumber = totalPages - 4 + i;
                            } else {
                                pageNumber = currentPage - 2 + i;
                            }

                            return (
                                <Button
                                    key={pageNumber}
                                    variant={currentPage === pageNumber ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => onPageChange(pageNumber)}
                                    className={`w-6 h-6 md:w-8 md:h-8 p-0 text-xs md:text-sm ${
                                        currentPage === pageNumber 
                                            ? 'bg-orange-400 text-black border-orange-400 hover:bg-orange-500'
                                            : 'text-white border-gray-700 hover:text-white hover:bg-gray-700'
                                    }`}
                                >
                                    {pageNumber}
                                </Button>
                            )
                        })}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className='text-white disabled:opacity-50 text-xs md:text-sm'
                    >
                        Next
                        <ChevronLeft className='w-3 h-3 md:w-4 md:h-4 rotate-180' />
                    </Button>
                </div>
            </div>
        )
    }

    // const pauseAutoScroll = () => {
    //     setIsAutoScrolling(false);
    //     if (intervalRef.current) {
    //         clearInterval(intervalRef.current);
    //     }
    // };

    // const resumeAutoScroll = () => {
    //     setIsAutoScrolling(true);
    // }

    // const loadMoreMatches = (type: 'live' | 'upcoming') => {
    //     pauseAutoScroll();

    //     if (type === 'live') {
    //         const nextBatch = liveMatches.slice(
    //             displayedMatches.live.length,
    //             displayedMatches.live.length + ITEMS_PER_BATCH
    //         );
    //         setDisplayedMatches(prev => ({
    //             ...prev,
    //             live: [...prev.live, ...nextBatch]
    //         }));
    //     } else {
    //         const nextBatch = upcomingMatches.slice(
    //             displayedMatches.upcoming.length,
    //             displayedMatches.upcoming.length + ITEMS_PER_BATCH
    //         );
    //         setDisplayedMatches(prev => ({
    //             ...prev,
    //             upcoming: [...prev.upcoming, ...nextBatch]
    //         }));
    //     }
    // };

    // const liveMatches = mockFootballEvents.filter(event => event.status === 'live')
    // const upcomingMatches = mockFootballEvents.filter(event => event.status === 'upcoming')

    // const matchesByLeague = mockFootballEvents.reduce((acc, match) => {
    //     const league = match.league || match.competition

    //     if (!acc[league]) {
    //         acc[league] = []
    //     }
    //     acc[league].push(match)
    //     return acc
    // }, {} as Record<string, typeof mockFootballEvents>)

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            }
        }
    }

    const itemVariants: Variants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    }

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
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        }
    }

    const StatusIndicator = () => (
        <div className='flex items-center justify-center gap-2 mb-2'>
            {apiStatus === "connected" && (
                <>
                    <Wifi className='text-green-400 w-4 h-4 md:w-5 md:h-5' />
                    <span className='text-green-400 font-medium text-sm md:text-base'>Online</span>
                </>
            )}
            {apiStatus === "fallback" && (
                <>
                    <WifiOff className='text-yellow-400 w-4 h-4 md:w-5 md:h-5' />
                    <span className='text-yellow-400 font-medium text-sm md:text-base'>Offline</span>
                </>
            )}
            {apiStatus === "error" && (
                <>
                    <AlertCircle className='text-red-400 w-4 h-4 md:w-5 md:h-5' />
                    <span className='text-red-400 font-medium text-sm md:text-base'>Network Error</span>
                </>
            )}
        </div>
    )

    if (loading) {
        return (
            <section className='bg-black flex flex-col space-y-6 md:space-y-10 min-h-[60vh] justify-center border-y-2 p-4 md:p-6 lg:p-10'>
                <div className='max-w-6xl mx-auto px-2 md:px-5 py-6 md:py-10 text-center w-full'>
                    <div className='flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-3'>
                        <Loader2 className='animate-spin text-primary w-6 h-6 md:w-8 md:h-8' />
                        <span className='text-white text-base md:text-lg'>Loading live football</span>
                    </div>
                    <p className='text-sm md:text-base'>Getting the latest scores and fixtures</p>
                </div>
            </section>
        )
    }

  return (
    // <motion.section 
        <section className='bg-black flex flex-col space-y-6 md:space-y-8 lg:space-y-10 min-h-[60vh] justify-center border-y-2 p-4 md:p-6 lg:p-10'
        // initial='hidden'
        // whileInView='visible'
        // viewport={{ once: true, amount: 0.2 }}
        // variants={containerVariants}
    >
        <div className='max-w-6xl mx-auto px-2 md:px-5 py-6 md:py-10 text-center w-full gap-6 md:gap-8 lg:gap-10 flex flex-col'>
            <motion.div 
                className='text-center space-y-4 mb-6 md:mb-10'
                variants={itemVariants}
            >
                <motion.h1 variants={itemVariants} className='font-bold text-white text-2xl md:text-4xl'>Football Live Scores</motion.h1>
                <StatusIndicator />
                <motion.p 
                    className='text-gray-400 text-sm md:text-base'
                    variants={itemVariants}
                >
                    Real-time updates from all major leagues worldwide
                </motion.p>

                {/* Last Updated Info */}
                {lastUpdated && (
                    <motion.div 
                        className='text-xs text-gray-500 flex flex-col md:flex-row items-center justify-center gap-2'
                        variants={itemVariants}
                    >
                        <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
                        <motion.button
                            onClick={refetch}
                            className='text-orange-400 hover:text-orange-300 transition-colors cursor-pointer'
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Refresh data"
                        >
                            <RefreshCw className='w-3 h-3' />
                        </motion.button>
                    </motion.div>
                )}

                {/* ✅ Error Display */}
                {error && (
                    <motion.div 
                        className='bg-red-900/20 border border-red-500/30 rounded-lg p-3 max-w-md mx-auto'
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        <p className='text-red-400 text-sm'>{error}</p>
                        <Button 
                            onClick={refetch}
                            className='text-orange-400 text-xs underline mt-1 hover:text-orange-300 cursor-pointer p-0 h-auto'
                        >
                            Try again
                        </Button>
                    </motion.div>
                )}
            </motion.div>

            <motion.div variants={itemVariants}>
                <AdBanner slot="1234567890" format="horizontal" className="my-4 mx-auto w-full " />
            </motion.div>
            <div className='grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 md:gap-8'>
                <motion.div variants={itemVariants}>
                    <Tabs defaultValue='live' className='w-full'>
                        <motion.div
                            className='space-y-4'
                            variants={itemVariants}
                        >
                            {/* Search and Filters */}
                            <div className='relative'>
                                <Search className='absolute left-3 bottom-8 transform translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-primary' />
                                <Input
                                    type='text'
                                    placeholder='Search teams, leagues, or venues...'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className='pl-10 w-full mb-4 bg-transparent border-gray-700 text-white placeholder-gray-500 focus:border-orange-400 text-sm md:text-base' 
                                />
            
                                {searchTerm && (
                                    <Button
                                        onClick={() => setSearchTerm("")}
                                        className='absolute right-3 -bottom-1 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors bg-transparent hover:bg-transparent cursor-pointer'
                                    >
                                        <X className='w-6 h-6' />
                                    </Button>
                                )}
                            </div>
                        </motion.div>
                        {/* Filter Toggle Button */}
                            <div className='flex justify-between p-2 items-center'>
                                <div>
                                    {/* Advanced Filters */}
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            height: showFilters ? "auto" : 0,
                                            opacity: showFilters ? 1 : 0
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className='overflow-hidden'
                                    >
                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-4'>
                                            {/* League Filter */}
                                            <div className='space-y-2'>
                                                <Label className='text-sm text-gray-400'>Filter by League</Label>
                                                <Select value={selectedLeague} onValueChange={setSelectedLeague}>
                                                    <SelectTrigger className='text-white'>
                                                        <SelectValue placeholder="All Leagues" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value='all'>All Leagues</SelectItem>
                                                        {availableLeagues.map(league => (
                                                            <SelectItem key={league} value={league} className='text-white'>{league}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {/* Status Filter */}
                                            <div className='space-y-2'>
                                                <Label className='text-sm text-gray-400'>Filter by Status</Label>
                                                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                                    <SelectTrigger className='text-white cursor-pointer'>
                                                        <SelectValue placeholder="All Matches" />
                                                    </SelectTrigger>
                                                    <SelectContent className='text-white cursor-pointer'>
                                                        <SelectItem value='all'>All Matches</SelectItem>
                                                        <SelectItem value='live'>Live Matches</SelectItem>
                                                        <SelectItem value='upcoming'>Upcoming Matches</SelectItem>
                                                        <SelectItem value='completed'>Completed Matches</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                                <div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShowFilters(!showFilters)}
                                        className='text-gray-400 border-gray-700 hover:text-white hover:border-orange-400 cursor-pointer'
                                    >
                                        <Filter className='w-4 h-4 mr-2' />
                                        {showFilters ? "Hide Filters" : "Show Filters"}
                                    </Button>

                                    
                                </div>
                            </div>


                        <TabsList className='grid grid-cols-3 mb-6 md:mb-8 w-full text-xs md:text-sm'>
                            <TabsTrigger value='live' className="relative">
                                <span className='hidden sm:inline'>Live Matches ({liveMatches.length})</span>
                                <span className='sm:hidden'>Live({liveMatches.length})</span>
                                {liveMatches.length > 0 && (
                                    <motion.div 
                                        className='w-2 h-2 bg-red-500 rounded-full ml-1 md:ml-2'
                                        animate={{ 
                                            scale: [1, 1.2, 1],
                                            opacity: [1, 0.5, 1] 
                                        }}
                                        transition={{ 
                                            duration: 1,
                                            repeat: Infinity 
                                        }}
                                    />
                                )}
                            </TabsTrigger>
                            <TabsTrigger value='upcoming'>
                                <span className='hidden sm:inline'>Upcoming ({upcomingMatches.length})</span>
                                <span className='sm:hidden'>Upcoming ({upcomingMatches.length})</span>
                            </TabsTrigger>
                            <TabsTrigger value='league'>
                                <span className='hidden sm:inline'>By League ({Object.keys(matchesByLeague).length})</span>
                                <span className='sm:hidden'>League ({Object.keys(matchesByLeague).length})</span>
                            </TabsTrigger>
                        </TabsList>
                            <div className='flex justify-between'>
                                {/* Active Filters Display */}
                                {(searchTerm || selectedLeague !== 'all' || selectedStatus !== 'all') && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className='flex flex-wrap gap-2 cursor-pointer'
                                    >
                                        {searchTerm && (
                                            <Badge variant="secondary" className='flex items-center gap-1 text-xs'>
                                                Search: "{searchTerm}"
                                                <span onClick={() => setSearchTerm("")} className='ml-1 hover:text-red-400 cursor-pointer'>
                                                    <X className='w-3 h-3' />
                                                </span>
                                            </Badge>
                                        )}

                                        {selectedLeague !== 'all' && (
                                            <Badge variant="secondary" className='flex items-center gap-1 text-xs'>
                                                League: {selectedLeague}
                                                <span onClick={() => setSelectedLeague("all")} className='ml-1 hover:text-red-400 cursor-pointer'>
                                                    <X className='w-3 h-3' />
                                                </span>
                                            </Badge>
                                        )}

                                        {selectedStatus !== 'all' && (
                                            <Badge variant="secondary" className='flex items-center gap-1 text-xs'>
                                                Status: {selectedStatus}
                                                <span onClick={() => setSelectedStatus("all")} className='ml-1 hover:text-red-400 cursor-pointer'>
                                                    <X className='w-3 h-3' />
                                                </span>
                                            </Badge>
                                        )}
                                    </motion.div>
                                )}

                                {/* Active Filters Indicator */}
                                    {(searchTerm || selectedLeague !== "all" || selectedStatus !== "all") && (
                                        <div className='flex items-center gap-2'>
                                            <span className='text-xs text-gray-500'>
                                                {filteredMatches.length} of {footballMatches.length} matches found
                                            </span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={clearFilters}
                                                className='text-gray-400 hover:text-white underline'>
                                                Clear All
                                            </Button>
                                        </div>
                                    )}
                            </div>

                            <TabsContent value='live' className='space-y-4'>
                                {liveMatches.length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className='text-center py-8'
                                    >
                                        <p className="text-gray-400 text-sm md:text-base">
                                            {searchTerm || selectedLeague !== 'all' || selectedStatus !== 'all' 
                                                ? 'No live matches found with current filters' 
                                                : 'No live matches at the moment'
                                            }
                                        </p>
                                        <p className="text-gray-500 text-xs md:text-sm mt-2">
                                            {searchTerm || selectedLeague !== 'all' || selectedStatus !== 'all'
                                                ? 'Try adjusting your search or filters'
                                                : 'Check back later for live action!'
                                            }
                                        </p>
                                    </motion.div>
                                ) : (

                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={containerVariants}
                                    className='space-y-4'
                                >
                                    {getPaginatedData(liveMatches, currentPage.live).map((match, index) => (
                                        <motion.div
                                            key={match.id}
                                            variants={cardVariants}
                                            whileHover="hover"
                                            custom={index}
                                        >
                                            <Card>
                                                <CardContent>
                                                    <div className='flex items-center justify-between'>
                                                        <div className='flex flex-col w-full gap-8'>
                                                            <div className='flex justify-between gap-2 mb-2 items-center'>
                                                                    <p className='text-gray-400 text-sm'>{match.league}</p>
                                                                    <motion.div
                                                                        animate={{ 
                                                                            scale: [1, 1.1, 1], opacity: [1, 0.8, 1] 
                                                                        }}
                                                                        transition={{
                                                                            duration: 1.5,
                                                                            repeat: Infinity
                                                                        }}
                                                                    >
                                                                        <Badge variant="destructive" className='animate-pulse'>LIVE {match.minute}&apos;</Badge>
                                                                    </motion.div>
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
                                        </motion.div>
                                    ))}
                                </motion.div>
                                )}
                                <PaginationControls 
                                    currentPage={currentPage.live}
                                    totalPages={getTotalPages(liveMatches.length)}
                                    onPageChange={(page) => handlePageChange('live', page)}
                                    totalItems={liveMatches.length}
                                    tab='live'
                                />
                            </TabsContent>

                            <TabsContent value='upcoming' className='space-y-4'>
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={containerVariants}
                                    className='space-y-4'
                                >
                                    {getPaginatedData(upcomingMatches, currentPage.upcoming).map((match, index) => (
                                        <motion.div 
                                            key={match.id}
                                            variants={cardVariants}
                                            whileHover="hover"
                                            custom={index}
                                        >
                                            <Card>
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
                                        </motion.div>
                                    ))}
                                </motion.div>
                                <PaginationControls 
                                    currentPage={currentPage.upcoming}
                                    totalPages={getTotalPages(upcomingMatches.length)}
                                    onPageChange={(page) => handlePageChange('upcoming', page)}
                                    totalItems={upcomingMatches.length}
                                    tab='upcoming'
                                />
                            </TabsContent>

                            <TabsContent value='league' className='space-y-10'>
                                {Object.keys(matchesByLeague).length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center py-8"
                                    >
                                        <p className="text-gray-400 text-sm md:text-base">
                                            {searchTerm || selectedLeague !== 'all' || selectedStatus !== 'all' 
                                                ? 'No matches found with current filters' 
                                                : 'No matches available'
                                            }
                                        </p>
                                        <p className="text-gray-500 text-xs md:text-sm mt-2">
                                            {searchTerm || selectedLeague !== 'all' || selectedStatus !== 'all'
                                                ? 'Try adjusting your search or filters'
                                                : 'Check back later for new fixtures!'
                                            }
                                        </p>
                                    </motion.div>
                                ) : (
                                    <>
                                        <motion.div
                                            initial="hidden"
                                            animate="visible"
                                            variants={containerVariants}
                                        >
                                            {Object.entries(matchesByLeague)
                                                .slice((currentPage.league - 1) * 5, currentPage.league * 5)
                                                .map(([league, matches], leagueIndex) => (
                                                <motion.div 
                                                    key={league}
                                                    variants={itemVariants}
                                                    custom={leagueIndex}
                                                >
                                                    <motion.h3 
                                                        className='text-white font-bold text-xl text-left mb-5'
                                                        whileHover={{ x: 10, color: "#fb923c" }}
                                                        transition={{ type: "spring", stiffness: 300 }}
                                                    >
                                                        {league}
                                                    </motion.h3>
                                                    <motion.div className='space-y-3' variants={containerVariants}>
                                                        {matches.map((match, matchIndex) => (
                                                            <motion.div  
                                                                key={match.id}
                                                                variants={cardVariants}
                                                                whileHover="hover"
                                                                custom={matchIndex}
                                                            >
                                                                <Card>
                                                                    <CardContent className='p-4'>
                                                                        <div className='flex flex-col items-center justify-between space-y-5'>
                                                                            <div className='flex flex-col w-full gap-1'>
                                                                                <div className='flex items-center justify-end gap-2 mb-1'>
                                                                                    {match.status === 'live' && (
                                                                                        <motion.div
                                                                                            animate={{ 
                                                                                                scale: [1, 1.1, 1],
                                                                                                opacity: [1, 0.8, 1]
                                                                                            }}
                                                                                            transition={{
                                                                                                duration: 1.5,
                                                                                                repeat: Infinity
                                                                                            }}
                                                                                        >
                                                                                            <Badge variant="destructive" className='animate-pulse text-xs'>LIVE {match.minute}&apos;</Badge>
                                                                                        </motion.div>
                                                                                    )}
                                                                                    {match.status === 'upcoming' && (
                                                                                        <Badge variant="secondary" className='text-xs'>{formatDate(match.startTime)}</Badge>
                                                                                    )}
                                                                                    {match.status === 'completed' && (
                                                                                        <Badge variant="default" className='text-xs'>FT</Badge>
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
                                                            </motion.div>
                                                        ))}
                                                    </motion.div>

                                                    {matches.length > 10 && (
                                                        <div>
                                                            <span>
                                                                Showing 10 of {matches.length} matches
                                                            </span>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </motion.div>

                                        {Object.keys(matchesByLeague).length > 5 && (
                                            <PaginationControls
                                                currentPage={currentPage.league}
                                                totalPages={Math.ceil(Object.keys(matchesByLeague).length / 5)}
                                                onPageChange={(page) => handlePageChange('league', page)}
                                                totalItems={Object.keys(matchesByLeague).length}
                                                tab='league' 
                                            />
                                        )}
                                    </>
                                )}
                            </TabsContent>
                    </Tabs>
                </motion.div>
                <motion.div
                    className='space-y-4'
                    variants={itemVariants}
                >
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <AdBanner slot="0987654321" format="rectangle" className="my-4 mx-auto w-full max-w-4xl" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6}}
                    >
                        <BuyCoffee />
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <AdBanner slot="0987654321" format="rectangle" className="my-4 mx-auto w-full max-w-4xl" />
                    </motion.div>
                </motion.div>
            </div>
        </div>
        </section>
    // </motion.section>

  )
}

export default FactorySection