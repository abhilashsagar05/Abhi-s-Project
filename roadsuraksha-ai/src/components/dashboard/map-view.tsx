"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCameras } from "@/hooks/use-cameras";

export default function MapView() {
  const { data: cameras } = useCameras();
  const [icon, setIcon] = useState<L.Icon | null>(null);

  useEffect(() => {
    // Fix for default marker icons in Leaflet + Next.js
    const LeafletIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
    setIcon(LeafletIcon);
  }, []);

  if (typeof window === "undefined") return null;

  return (
    <MapContainer 
      center={[20.5937, 78.9629]} 
      zoom={5} 
      style={{ height: "100%", width: "100%", background: "#0a0a0a" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      
      {cameras.map((cam: any) => (
        <Marker key={cam.id} position={[cam.lat, cam.lng]} icon={icon || undefined}>
          <Popup className="custom-popup">
            <div className="p-2 min-w-[200px]">
              <h3 className="font-bold text-lg mb-1">{cam.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{cam.location}</p>
              <div className="flex items-center justify-between">
                 <Badge className={cam.status === 'ONLINE' ? 'bg-emerald-500' : 'bg-rose-500'}>
                    {cam.status}
                 </Badge>
                 <Button size="sm" variant="link" className="text-primary p-0">View Feed</Button>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
