"use client";

import { useState, useEffect } from "react";
import { MOCK_CAMERAS } from "@/lib/mock-data";

export function useCameras() {
  const [data, setData] = useState<any[]>(MOCK_CAMERAS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCameras() {
      try {
        const response = await fetch("/api/cameras");
        if (!response.ok) throw new Error("API Offline");
        const json = await response.json();
        setData(json);
      } catch (err) {
        setData(MOCK_CAMERAS);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCameras();
  }, []);

  return { data, isLoading };
}
