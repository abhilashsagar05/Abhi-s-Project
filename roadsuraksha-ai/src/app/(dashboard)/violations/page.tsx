"use client";

import { useState } from "react";
import { 
  AlertOctagon, 
  Download, 
  Eye, 
  Filter, 
  Search, 
  Receipt,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  FileText
} from "lucide-react";
import { MOCK_VIOLATIONS } from "@/lib/mock-data";
import { VIOLATION_TYPES, CHALLAN_STATUS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useViolations } from "@/hooks/use-violations";

export default function ViolationsPage() {
  const [search, setSearch] = useState("");
  const [selectedViolation, setSelectedViolation] = useState<any | null>(null);
  const { data: violations, isLoading } = useViolations();

  const filteredViolations = violations.filter((v: any) => 
    v.plateNumber?.toLowerCase().includes(search.toLowerCase()) || 
    v.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Violations Registry</h1>
          <p className="text-muted-foreground mt-1">Manage and audit AI-detected traffic violations.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white">
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white">
            <Receipt className="w-4 h-4 mr-2" /> Batch Generate Challans
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 glass-dark p-4 rounded-2xl border-white/5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by plate number or ID..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-white/5 border-white/10"
          />
        </div>
        <Button variant="outline" className="border-white/10 hover:bg-white/5">
           <Filter className="w-4 h-4 mr-2" /> More Filters
        </Button>
      </div>

      {/* Violations Table */}
      <div className="glass-dark border-white/5 rounded-2xl overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-muted-foreground">ID</TableHead>
              <TableHead className="text-muted-foreground">Plate Number</TableHead>
              <TableHead className="text-muted-foreground">Violation Type</TableHead>
              <TableHead className="text-muted-foreground">Location</TableHead>
              <TableHead className="text-muted-foreground">Timestamp</TableHead>
              <TableHead className="text-muted-foreground">Confidence</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-right text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredViolations.map((v) => (
              <TableRow key={v.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                <TableCell className="font-mono text-xs text-muted-foreground">{v.id}</TableCell>
                <TableCell className="font-bold text-white">{v.plateNumber}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("bg-black/40", VIOLATION_TYPES[v.type as keyof typeof VIOLATION_TYPES].color)}>
                    {VIOLATION_TYPES[v.type as keyof typeof VIOLATION_TYPES].label}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{v.location}</TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(v.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                </TableCell>
                <TableCell>
                   <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                         <div className="h-full bg-primary" style={{ width: `${v.confidence * 100}%` }} />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{(v.confidence * 100).toFixed(0)}%</span>
                   </div>
                </TableCell>
                <TableCell>
                   <Badge className={cn(
                    "font-medium",
                    v.status === 'PAID' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : 
                    v.status === 'PENDING' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                    "bg-blue-500/10 text-blue-500 border-blue-500/20"
                  )}>
                    {v.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 hover:bg-primary/20 hover:text-primary"
                      onClick={() => setSelectedViolation(v)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8 hover:bg-white/10")}>
                        <MoreHorizontal className="w-4 h-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass-dark border-white/10">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem className="focus:bg-white/5"><FileText className="w-4 h-4 mr-2" /> Generate Challan</DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-white/5 text-emerald-400"><CheckCircle2 className="w-4 h-4 mr-2" /> Approve Violation</DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-white/5 text-rose-400"><XCircle className="w-4 h-4 mr-2" /> Dismiss Violation</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Evidence Modal */}
      <Dialog open={!!selectedViolation} onOpenChange={() => setSelectedViolation(null)}>
         <DialogContent className="max-w-4xl glass-dark border-white/10">
            <DialogHeader>
               <DialogTitle className="text-2xl font-bold">Violation Evidence</DialogTitle>
               <DialogDescription>
                  Detailed report for violation {selectedViolation?.id}
               </DialogDescription>
            </DialogHeader>
            
            {selectedViolation && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                 <div className="space-y-4">
                    <div className="aspect-video rounded-xl overflow-hidden border border-white/10 relative">
                       <img src={selectedViolation.evidenceUrl} alt="Evidence" className="w-full h-full object-cover" />
                       <div className="absolute top-4 left-4 bg-primary px-2 py-1 rounded text-[10px] font-bold">PLATE RECOGNIZED</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                       <img src={selectedViolation.evidenceUrl} className="aspect-square rounded-lg border border-white/10 object-cover" />
                       <div className="aspect-square rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-[10px] text-center p-2 text-muted-foreground">Thermal View (N/A)</div>
                       <div className="aspect-square rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-[10px] text-center p-2 text-muted-foreground">Wide Angle (N/A)</div>
                    </div>
                 </div>
                 
                 <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3">
                       <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-muted-foreground text-sm">Plate Number</span>
                          <span className="font-mono font-bold text-primary">{selectedViolation.plateNumber}</span>
                       </div>
                       <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-muted-foreground text-sm">Violation Type</span>
                          <span className="font-bold">{VIOLATION_TYPES[selectedViolation.type as keyof typeof VIOLATION_TYPES].label}</span>
                       </div>
                       <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-muted-foreground text-sm">Fine Amount</span>
                          <span className="font-bold text-amber-500">₹ {VIOLATION_TYPES[selectedViolation.type as keyof typeof VIOLATION_TYPES].fine}</span>
                       </div>
                       <div className="flex justify-between">
                          <span className="text-muted-foreground text-sm">Location</span>
                          <span className="text-sm">{selectedViolation.location}</span>
                       </div>
                    </div>
                    
                    <div className="space-y-2">
                       <p className="text-sm font-medium">AI Confidence Score</p>
                       <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
                          <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${selectedViolation.confidence * 100}%` }} />
                          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">{(selectedViolation.confidence * 100).toFixed(1)}% CERTAINTY</span>
                       </div>
                    </div>
                 </div>
              </div>
            )}
            
            <DialogFooter className="gap-2 sm:gap-0">
               <Button variant="ghost" onClick={() => setSelectedViolation(null)}>Close</Button>
               <Button className="bg-primary text-white">Generate Official Challan</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
    </div>
  );
}
