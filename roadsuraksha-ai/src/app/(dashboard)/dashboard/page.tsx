"use client";

import { 
  Camera, 
  AlertOctagon, 
  Receipt, 
  TrendingUp, 
  Activity, 
  MapPin,
  Clock,
  ArrowUpRight,
  MoreVertical
} from "lucide-react";
import StatCard from "@/components/dashboard/stat-card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { MOCK_ANALYTICS, MOCK_VIOLATIONS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { VIOLATION_TYPES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useViolations } from "@/hooks/use-violations";
import { useStats } from "@/hooks/use-stats";

export default function DashboardPage() {
  const { data: recentViolations } = useViolations();
  const { stats } = useStats();

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold text-white">System Overview</h1>
        <p className="text-muted-foreground mt-1">Real-time traffic health and AI detection metrics.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Active Cameras" 
          value={stats.activeCameras.toString()} 
          subValue="Stable" 
          icon={Camera} 
          trend="neutral" 
          color="primary" 
        />
        <StatCard 
          label="Today's Violations" 
          value={stats.totalViolations.toLocaleString()} 
          subValue="+2.5% from yesterday" 
          icon={AlertOctagon} 
          trend="up" 
          color="rose" 
        />
        <StatCard 
          label="Pending Challans" 
          value={stats.pendingChallans.toString()} 
          subValue="Action required" 
          icon={Receipt} 
          trend="neutral" 
          color="accent" 
        />
        <StatCard 
          label="AI Accuracy" 
          value={`${stats.accuracy}%`} 
          subValue="Real-time OCR confidence" 
          icon={Activity} 
          trend="up" 
          color="amber" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2 p-6 glass-dark border-white/5">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-white">Violation Trends</h3>
              <p className="text-sm text-muted-foreground">Weekly violation frequency</p>
            </div>
            <div className="flex gap-2">
               <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary">Live</Badge>
               <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="w-4 h-4" /></Button>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_ANALYTICS.violationsByDay}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.6 0.2 250)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="oklch(0.6 0.2 250)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: 'white' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="oklch(0.6 0.2 250)" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorCount)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Secondary Chart */}
        <Card className="p-6 glass-dark border-white/5">
          <h3 className="text-xl font-bold text-white mb-6">Violation Types</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_ANALYTICS.violationTypes} layout="vertical">
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                  width={100}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {MOCK_ANALYTICS.violationTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? 'oklch(0.6 0.2 250)' : 'rgba(255,255,255,0.2)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 space-y-4">
             <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" /> No Helmet
                </span>
                <span className="font-bold text-white">40%</span>
             </div>
             <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/20" /> Red Light Jump
                </span>
                <span className="font-bold text-white">25%</span>
             </div>
          </div>
        </Card>
      </div>

      {/* Recent Violations */}
      <Card className="glass-dark border-white/5 overflow-hidden">
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <h3 className="text-xl font-bold text-white">Recent Violations</h3>
          <Button variant="link" className="text-primary hover:text-primary/80 h-auto p-0">View All <ArrowUpRight className="ml-1 w-4 h-4" /></Button>
        </div>
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium">Plate Number</TableHead>
              <TableHead className="text-muted-foreground font-medium">Violation Type</TableHead>
              <TableHead className="text-muted-foreground font-medium">Confidence</TableHead>
              <TableHead className="text-muted-foreground font-medium">Time</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentViolations.slice(0, 5).map((violation: any) => (
              <TableRow key={violation.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                <TableCell className="font-mono text-white font-medium">{violation.plateNumber}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_5px_rgba(var(--primary),0.5)]" />
                    {VIOLATION_TYPES[violation.type as keyof typeof VIOLATION_TYPES].label}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                     <div className="flex-1 h-1.5 w-16 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${violation.confidence * 100}%` }} />
                     </div>
                     <span className="text-xs text-muted-foreground">{(violation.confidence * 100).toFixed(1)}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground flex items-center gap-2">
                   <Clock className="w-3.5 h-3.5" />
                   {new Date(violation.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </TableCell>
                <TableCell className="text-right">
                  <Badge className={cn(
                    "font-medium",
                    violation.status === 'PAID' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : 
                    violation.status === 'PENDING' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                    "bg-blue-500/10 text-blue-500 border-blue-500/20"
                  )}>
                    {violation.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
