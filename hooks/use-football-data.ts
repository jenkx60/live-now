import { useState, useEffect, useCallback } from 'react';
import { Event, APIResponse, FootballEvent } from '@/lib/types';

interface UseFootballDataReturn {
  data: FootballEvent[];
  loading: boolean;
  error: string | null;
  isRealData: boolean;
  refetch: () => Promise<void>;
  lastUpdated: Date | null;
  apiStatus: 'connected' | 'fallback' | 'error';
}

export const useFootballData = (
  sport?: string, 
  status?: string,
  autoRefresh: boolean = true,
  refreshInterval: number = 15 * 60 * 1000 // 30 seconds for live data
): UseFootballDataReturn => {
  const [data, setData] = useState<FootballEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRealData, setIsRealData] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [apiStatus, setApiStatus] = useState<'connected' | 'fallback' | 'error'>('error');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`Hook fetching: sport=${sport}, status=${status}`);
      
      const params = new URLSearchParams();
      if (sport) params.append('sport', sport);
      if (status) params.append('status', status);

      const response = await fetch(`/api/events?${params.toString()}`);
      
      // const url = `/api/events?${params.toString()}`;
      // console.log(`Calling: ${url}`);
      
      // const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setData(result.events as FootballEvent[]);
        setIsRealData(result.isRealData);
        setLastUpdated(new Date());
        
        // Set API status
        if (result.isRealData) {
          setApiStatus('connected');
          console.log(' Using real API data');
        } else {
          setApiStatus('fallback');
          console.log('Using fallback data:', result.fallbackReason);
        }
        
        console.log(`Hook received ${result.events.length} events`);
      } else {
        throw new Error(result.message || 'API returned success: false');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Network error';
      setError(errorMessage);
      setApiStatus('error');
      console.error('Hook fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [sport, status]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh for live data
  useEffect(() => {
    if (!autoRefresh || status !== 'live' || !isRealData) {
      return; // Only auto-refresh for live real data
    }

    console.log(`Setting up auto-refresh every ${refreshInterval/1000}s for live data`);
    
    const interval = setInterval(() => {
      console.log('Auto-refreshing live data...');
      fetchData();
    }, refreshInterval);

    return () => {
      console.log('Clearing auto-refresh interval');
      clearInterval(interval);
    };
  }, [autoRefresh, status, refreshInterval, fetchData, isRealData]);

  return { 
    data, 
    loading, 
    error, 
    isRealData,
    refetch: fetchData,
    lastUpdated,
    apiStatus
  };
};

// Hook to test API connection
export const useAPITest = () => {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const testAPI = useCallback(async () => {
    setTesting(true);
    try {
      const response = await fetch('/api/events?test=true');
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Test failed'
      });
    } finally {
      setTesting(false);
    }
  }, []);

  return { testAPI, testing, result };
};