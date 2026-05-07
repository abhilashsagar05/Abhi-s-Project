"use client";

import { useState, useEffect } from "react";

export function useStats() {
  const [stats, setStats] = useState({
    totalViolations: 0,
    activeCameras: 0,
    pendingChallans: 0,
    accuracy: 99.2
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/stats");
        if (!response.ok) throw new Error("Stats API failed");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStats();
    
    // Refresh stats every 30 seconds for live feel
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return { stats, isLoading };
}
