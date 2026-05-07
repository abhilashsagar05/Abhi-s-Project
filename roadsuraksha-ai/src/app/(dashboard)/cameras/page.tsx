"use client";

import { useState } from "react";
import { Camera, Filter, Grid, LayoutList, Search, Plus } from "lucide-react";
import { MOCK_CAMERAS } from "@/lib/mock-data";
import CameraFeedCard from "@/components/dashboard/camera-feed-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCameras } from "@/hooks/use-cameras";
import { INDIAN_CITIES } from "@/lib/constants";

export default function CamerasPage() {
  const { data: cameras, isLoading } = useCameras();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [city, setCity] = useState("all");

  const filteredCameras = (cameras || MOCK_CAMERAS).filter(cam => {
    const matchesSearch = cam.name.toLowerCase().includes(search.toLowerCase()) || 
                         cam.id.toLowerCase().includes(search.toLowerCase());
    const matchesCity = city === "all" || cam.city === city;
    return matchesSearch && matchesCity;
  });

  const cameraImages = [
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    "https://images.unsplash.com/photo-1444491741275-3747c53c99b4?w=800&q=80",
    "https://images.unsplash.com/photo-1545143333-11bb24019ea2?w=800&q=80",
    "https://images.unsplash.com/photo-1494522358652-f30e61a60313?w=800&q=80",
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Live Monitoring</h1>
          <p className="text-muted-foreground mt-1">Direct access to {MOCK_CAMERAS.length} AI-enabled camera streams.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          <Plus className="w-4 h-4 mr-2" /> Register New Camera
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 glass-dark p-4 rounded-2xl border-white/5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Filter by name or ID..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-white/5 border-white/10"
          />
        </div>
        <div className="flex gap-4">
           <Select value={city} onValueChange={(val) => setCity(val || "all")}>
              <SelectTrigger className="w-[180px] bg-white/5 border-white/10">
                 <SelectValue placeholder="All Cities" />
              </SelectTrigger>
              <SelectContent className="glass-dark border-white/10">
                 <SelectItem value="all">All Cities</SelectItem>
                 {INDIAN_CITIES.map(c => (
                   <SelectItem key={c} value={c}>{c}</SelectItem>
                 ))}
              </SelectContent>
           </Select>
           
           <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1 border border-white/10">
              <Button variant="ghost" size="icon" className="h-8 w-8 bg-primary text-white hover:bg-primary"><Grid className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-white/5"><LayoutList className="w-4 h-4" /></Button>
           </div>
           
           <Button variant="outline" size="icon" className="border-white/10 hover:bg-white/5">
              <Filter className="w-4 h-4" />
           </Button>
        </div>
      </div>

      {/* Cameras Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCameras.map((cam, i) => (
          <CameraFeedCard 
            key={cam.id}
            {...cam}
            imageUrl={cameraImages[i % cameraImages.length]}
          />
        ))}
      </div>
      
      {filteredCameras.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
           <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
              <Camera className="w-8 h-8 text-muted-foreground" />
           </div>
           <h3 className="text-xl font-bold text-white">No cameras found</h3>
           <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
