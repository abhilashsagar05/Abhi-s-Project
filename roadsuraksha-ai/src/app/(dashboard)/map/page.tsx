"use client";

import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { Camera, MapPin, AlertOctagon, Layers, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

const MapView = dynamic(
  () => import("@/components/dashboard/map-view"),
  { 
    ssr: false,
    loading: () => <div className="w-full h-full bg-black/40 animate-pulse flex items-center justify-center text-muted-foreground">Loading Map System...</div>
  }
);

export default function MapPage() {
  return (
    <div className="h-[calc(100vh-120px)] flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Live Violation Map</h1>
          <p className="text-muted-foreground mt-1">Geospatial visualization of cameras and recent incidents.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="border-white/10 hover:bg-white/5">
              <Layers className="w-4 h-4 mr-2" /> Layers
           </Button>
           <Button className="bg-primary text-white">
              <Navigation className="w-4 h-4 mr-2" /> Center Map
           </Button>
        </div>
      </div>

      <div className="flex-1 relative rounded-2xl overflow-hidden border border-white/5 glass-dark shadow-2xl">
        <MapView />

        {/* Floating Controls Overlay */}
        <div className="absolute top-6 right-6 z-[1000] space-y-4 w-64">
           <Card className="p-4 glass-dark border-white/10 shadow-2xl">
              <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
                 <AlertOctagon className="w-4 h-4 text-rose-500" /> Recent Alerts
              </h4>
              <div className="space-y-3">
                 {[
                   { id: "VIO-1", type: "No Helmet", time: "2m ago" },
                   { id: "VIO-2", type: "Red Light", time: "5m ago" },
                 ].map((alert) => (
                   <div key={alert.id} className="text-xs p-2 rounded bg-white/5 border border-white/5 flex justify-between items-center">
                      <div>
                         <p className="font-medium text-white">{alert.type}</p>
                         <p className="text-muted-foreground">{alert.time}</p>
                      </div>
                      <Button size="icon" variant="ghost" className="h-6 w-6"><MapPin className="w-3 h-3 text-primary" /></Button>
                   </div>
                 ))}
              </div>
           </Card>

           <Card className="p-4 glass-dark border-white/10 shadow-2xl">
              <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
                 <Camera className="w-4 h-4 text-primary" /> Camera Status
              </h4>
              <div className="flex items-center justify-between text-xs mb-2">
                 <span className="text-muted-foreground">Online</span>
                 <span className="text-emerald-400 font-bold">1,142</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-emerald-500" style={{ width: "89%" }} />
              </div>
           </Card>
        </div>

        {/* Legend Overlay */}
        <div className="absolute bottom-6 left-6 z-[1000]">
           <div className="flex gap-4 p-3 glass-dark rounded-xl border border-white/10 text-[10px] font-bold tracking-wider uppercase text-white/60 shadow-2xl">
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-primary rounded-full" /> Camera Active
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-rose-500 rounded-full" /> High Violation Zone
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
