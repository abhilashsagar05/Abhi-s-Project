"use client";

import { useState, useEffect } from "react";
import { MOCK_VIOLATIONS } from "@/lib/mock-data";

export function useViolations() {
  const [data, setData] = useState<any[]>(MOCK_VIOLATIONS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchViolations() {
      try {
        const response = await fetch("/api/violations");
        if (!response.ok) throw new Error("API Offline");
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.warn("Using mock data as API is unavailable.");
        setData(MOCK_VIOLATIONS);
      } finally {
        setIsLoading(false);
      }
    }

    fetchViolations();
  }, []);

  return { data, isLoading, error };
}
