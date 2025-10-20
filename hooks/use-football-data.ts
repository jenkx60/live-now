import { mockFootballEvents } from "@/lib/mock-data";
import { FootballEvent } from "@/lib/types";
import { useEffect, useState } from "react";

export function useFootballData() {
    const [events, setEvents] = useState<FootballEvent[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);

                // tocheck if api is working
                const hasApiKey = process.env.NEXT_PUBLIC_FOOTBALL_API_KEY;

                if (!hasApiKey) {
                    // we use the mock data if no api key
                    console.log("Api key not found, using mock data")
                    setEvents(mockFootballEvents);
                    setIsLoading(false);
                    return;
                }

                // to fetch from the api
                const response = await fetch("/api/football/fixtures");

                if (!response.ok) {
                    throw new Error("Failed to fetch football data");
                }

                const data = await response.json();
                setEvents(data.events || []);
            } catch (err) {
                console.error("Error fetching football data:", err);
                setError("Error fetching football data");
                setEvents(mockFootballEvents); // Fallback to mock data
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();

        // to minimize the api calls lets refresh every 14 minutes
        const interval = setInterval(fetchData, 14 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return { events, isLoading, error };
};