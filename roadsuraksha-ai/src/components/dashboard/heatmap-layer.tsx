"use client";

import { Circle, Tooltip } from "react-leaflet";

interface Hotspot {
  id: string;
  lat: number;
  lng: number;
  intensity: number; // 0 to 1
  label: string;
  violations: number;
}

interface HeatmapLayerProps {
  hotspots: Hotspot[];
}

export default function HeatmapLayer({ hotspots }: HeatmapLayerProps) {
  return (
    <>
      {hotspots.map((spot) => (
        <Circle
          key={spot.id}
          center={[spot.lat, spot.lng]}
          radius={150 + (spot.intensity * 300)}
          pathOptions={{
            fillColor: spot.intensity > 0.7 ? "#ef4444" : "#f59e0b",
            fillOpacity: 0.2 + (spot.intensity * 0.4),
            color: "transparent",
            weight: 0,
          }}
          className="animate-pulse-slow"
        >
          <Tooltip direction="top" offset={[0, -10]} opacity={1}>
            <div className="bg-black/80 text-white p-2 rounded-lg border border-white/10 backdrop-blur-md">
              <p className="font-bold text-sm">{spot.label}</p>
              <p className="text-xs text-rose-400 font-mono mt-1">{spot.violations} Violations Detected</p>
              <p className="text-[10px] text-muted-foreground mt-1">High Intensity Zone</p>
            </div>
          </Tooltip>
        </Circle>
      ))}
    </>
  );
}
