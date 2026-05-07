"use client";

import { motion } from "framer-motion";
import { Camera, MapPin, Activity, Maximize2, MoreHorizontal, AlertOctagon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CAMERA_STATUS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface CameraFeedCardProps {
  id: string;
  name: string;
  location: string;
  status: keyof typeof CAMERA_STATUS;
  city: string;
  imageUrl: string;
}

export default function CameraFeedCard({ id, name, location, status, city, imageUrl }: CameraFeedCardProps) {
  return (
    <Card className="glass-dark border-white/5 overflow-hidden group hover:border-primary/30 transition-all flex flex-col">
      {/* Video Feed Area */}
      <div className="relative aspect-video bg-black overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" 
        />
        
        {/* Overlay Grid */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 opacity-20 pointer-events-none">
           {[...Array(12)].map((_, i) => (
             <div key={i} className="border-[0.5px] border-white/20" />
           ))}
        </div>

        {/* AI Bounding Boxes (Simulated) */}
        <motion.div 
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-1/4 h-1/3 border-2 border-primary/50 rounded flex items-start justify-start p-1"
        >
          <span className="bg-primary text-[8px] font-bold text-white px-1 uppercase leading-none">Car 94%</span>
        </motion.div>

        <motion.div 
          animate={{ scale: [1, 0.98, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-1/3 right-1/4 w-1/6 h-1/4 border-2 border-rose-500/50 rounded flex items-start justify-start p-1"
        >
          <span className="bg-rose-500 text-[8px] font-bold text-white px-1 uppercase leading-none">Bike 88%</span>
        </motion.div>

        {/* Status Indicators */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
           <Badge className={cn(
             "h-5 text-[10px] font-bold px-1.5",
             status === 'ONLINE' ? "bg-emerald-500 text-white" : 
             status === 'OFFLINE' ? "bg-rose-500 text-white" : "bg-amber-500 text-white"
           )}>
             {status}
           </Badge>
           <Badge variant="outline" className="h-5 text-[10px] bg-black/40 border-white/20 text-white backdrop-blur-sm">
             4K LIVE
           </Badge>
        </div>

        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
           <Button variant="ghost" size="icon" className="h-7 w-7 bg-black/40 hover:bg-black/60 text-white">
              <Maximize2 className="w-3.5 h-3.5" />
           </Button>
        </div>

        {/* Bottom Metadata */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent flex items-end justify-between">
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-mono text-white/80">{id}</span>
           </div>
           <span className="text-[10px] font-mono text-white/60">FPS: 30.2</span>
        </div>
      </div>

      {/* Info Area */}
      <div className="p-4 space-y-3">
         <div className="flex items-start justify-between">
            <div>
               <h4 className="font-bold text-white group-hover:text-primary transition-colors">{name}</h4>
               <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" /> {location}, {city}
               </p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/5">
               <MoreHorizontal className="w-4 h-4" />
            </Button>
         </div>
         
         <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4 text-[10px]">
               <div className="flex items-center gap-1 text-muted-foreground">
                  <Activity className="w-3 h-3 text-emerald-400" /> 24h Uptime
               </div>
               <div className="flex items-center gap-1 text-muted-foreground">
                  <AlertOctagon className="w-3 h-3 text-rose-400" /> 12 Violations today
               </div>
            </div>
         </div>
      </div>
    </Card>
  );
}
