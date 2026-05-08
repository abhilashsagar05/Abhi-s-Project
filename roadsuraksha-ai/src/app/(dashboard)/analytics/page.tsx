"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line,
  AreaChart,
  Area
} from "recharts";
import { Card } from "@/components/ui/card";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  Calendar,
  Download,
  Filter,
  MapPin,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useViolations } from "@/hooks/use-violations";
import { useStats } from "@/hooks/use-stats";
import { useEffect, useState } from "react";
import { MOCK_ANALYTICS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const COLORS = ['oklch(0.6 0.2 250)', 'oklch(0.75 0.15 190)', 'oklch(0.7 0.15 150)', 'oklch(0.5 0.2 25)', 'oklch(0.8 0.15 80)'];

const hourlyData = [
  { hour: "00:00", count: 120 }, { hour: "02:00", count: 80 }, { hour: "04:00", count: 150 },
  { hour: "06:00", count: 450 }, { hour: "08:00", count: 980 }, { hour: "10:00", count: 820 },
  { hour: "12:00", count: 650 }, { hour: "14:00", count: 590 }, { hour: "16:00", count: 880 },
  { hour: "18:00", count: 1100 }, { hour: "20:00", count: 750 }, { hour: "22:00", count: 320 },
];

export default function AnalyticsPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>;
  }
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">System Analytics</h1>
          <p className="text-muted-foreground mt-1">Deep insights into city traffic patterns and violation trends.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white">
            <Download className="w-4 h-4 mr-2" /> Export Report
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white">
            <Calendar className="w-4 h-4 mr-2" /> Select Range
          </Button>
        </div>
      </div>

      {/* Key Insights Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="p-6 glass-dark border-white/5 space-y-4">
            <div className="flex items-center justify-between">
               <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <TrendingDown className="w-5 h-5" />
               </div>
               <Badge className="bg-emerald-500/10 text-emerald-500">-12.4%</Badge>
            </div>
            <div>
               <h4 className="text-sm font-medium text-muted-foreground">Helmet Compliance</h4>
               <p className="text-2xl font-bold text-white">88.5%</p>
               <p className="text-xs text-muted-foreground mt-1">Steady improvement in residential zones.</p>
            </div>
         </Card>
         <Card className="p-6 glass-dark border-white/5 space-y-4">
            <div className="flex items-center justify-between">
               <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500 border border-rose-500/20">
                  <TrendingUp className="w-5 h-5" />
               </div>
               <Badge className="bg-rose-500/10 text-rose-500">+5.2%</Badge>
            </div>
            <div>
               <h4 className="text-sm font-medium text-muted-foreground">Signal Violations</h4>
               <p className="text-2xl font-bold text-white">2.4k</p>
               <p className="text-xs text-muted-foreground mt-1">Increasing at Silk Board & CP North.</p>
            </div>
         </Card>
         <Card className="p-6 glass-dark border-white/5 space-y-4">
            <div className="flex items-center justify-between">
               <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  <AlertCircle className="w-5 h-5" />
               </div>
               <Badge className="bg-amber-500/10 text-amber-500">Critical</Badge>
            </div>
            <div>
               <h4 className="text-sm font-medium text-muted-foreground">Highest Peak Hour</h4>
               <p className="text-2xl font-bold text-white">18:00 - 19:00</p>
               <p className="text-xs text-muted-foreground mt-1">1,100+ violations detected per hour.</p>
            </div>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Trend Chart */}
        <Card className="p-6 glass-dark border-white/5">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                 <Clock className="w-5 h-5 text-primary" /> Hourly Violation Peak
              </h3>
           </div>
           <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={hourlyData}>
                    <defs>
                       <linearGradient id="colorPeak" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="oklch(0.75 0.15 190)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="oklch(0.75 0.15 190)" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: 'black', border: '1px solid rgba(255,255,255,0.1)' }} />
                    <Area type="monotone" dataKey="count" stroke="oklch(0.75 0.15 190)" strokeWidth={3} fillOpacity={1} fill="url(#colorPeak)" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </Card>

        {/* Revenue Growth Chart */}
        <Card className="p-6 glass-dark border-white/5">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                 <TrendingUp className="w-5 h-5 text-emerald-400" /> Revenue Forecast
              </h3>
           </div>
           <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={MOCK_ANALYTICS.revenueByMonth}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: 'black', border: '1px solid rgba(255,255,255,0.1)' }} />
                    <Bar dataKey="amount" fill="oklch(0.6 0.2 250)" radius={[4, 4, 0, 0]} barSize={40} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </Card>

        {/* Distribution Pie Chart */}
        <Card className="p-6 glass-dark border-white/5">
           <h3 className="text-xl font-bold text-white mb-8">Violation Distribution</h3>
           <div className="flex flex-col md:flex-row items-center">
              <div className="h-[300px] w-full md:w-1/2">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie
                          data={MOCK_ANALYTICS.violationTypes}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                       >
                          {MOCK_ANALYTICS.violationTypes.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                       </Pie>
                       <Tooltip />
                    </PieChart>
                 </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                 {MOCK_ANALYTICS.violationTypes.map((entry, index) => (
                   <div key={entry.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                         <span className="text-sm text-muted-foreground">{entry.name}</span>
                      </div>
                      <span className="text-sm font-bold text-white">{entry.value}%</span>
                   </div>
                 ))}
              </div>
           </div>
        </Card>

        {/* Hotspots / City Breakdown */}
        <Card className="p-6 glass-dark border-white/5">
           <h3 className="text-xl font-bold text-white mb-6">Regional Performance</h3>
           <div className="space-y-6">
              {[
                { city: "Delhi", count: 2450, growth: "+12%", color: "bg-primary" },
                { city: "Mumbai", count: 1820, growth: "-4%", color: "bg-accent" },
                { city: "Bangalore", count: 2100, growth: "+8%", color: "bg-emerald-400" },
                { city: "Chennai", count: 1400, growth: "+2%", color: "bg-amber-400" }
              ].map((item) => (
                <div key={item.city} className="space-y-2">
                   <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-white flex items-center gap-2">
                         <MapPin className="w-4 h-4 text-muted-foreground" /> {item.city}
                      </span>
                      <span className="text-muted-foreground">{item.count} violations <span className={cn(item.growth.startsWith('+') ? 'text-rose-400' : 'text-emerald-400')}>{item.growth}</span></span>
                   </div>
                   <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", item.color)} style={{ width: `${(item.count / 2500) * 100}%` }} />
                   </div>
                </div>
              ))}
           </div>
        </Card>
      </div>
    </div>
  );
}
