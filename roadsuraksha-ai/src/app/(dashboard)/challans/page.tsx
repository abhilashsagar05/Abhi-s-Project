"use client";

import { useState } from "react";
import { 
  Receipt, 
  Search, 
  Filter, 
  Download, 
  FileText, 
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreVertical,
  CreditCard
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MOCK_CHALLANS = [
  { id: "CHL-9921", plate: "DL 01 AB 1234", amount: 1000, status: "PENDING", date: "2026-05-01", type: "No Helmet" },
  { id: "CHL-8822", plate: "MH 02 CD 5678", amount: 5000, status: "PAID", date: "2026-04-28", type: "Red Signal" },
  { id: "CHL-7711", plate: "KA 03 EF 9012", amount: 2000, status: "REJECTED", date: "2026-04-25", type: "Triple Riding" },
  { id: "CHL-6655", plate: "TS 08 GH 3456", amount: 5000, status: "PENDING", date: "2026-05-02", type: "Wrong Side" },
  { id: "CHL-5544", plate: "TN 07 IJ 7890", amount: 1000, status: "UNDER_REVIEW", date: "2026-04-30", type: "No Seatbelt" },
];

export default function ChallansPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">E-Challan Management</h1>
          <p className="text-muted-foreground mt-1">Track payments, issue new fines, and handle appeals.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white">
            <Download className="w-4 h-4 mr-2" /> Financial Export
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white">
            <PlusIcon className="w-4 h-4 mr-2" /> Manual Challan
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <Card className="p-4 glass-dark border-white/5">
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Pending Collection</p>
            <h3 className="text-2xl font-bold text-white mt-1">₹ 4.2M</h3>
            <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-amber-500" style={{ width: "65%" }} />
            </div>
         </Card>
         <Card className="p-4 glass-dark border-white/5">
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Paid Today</p>
            <h3 className="text-2xl font-bold text-emerald-400 mt-1">₹ 840k</h3>
            <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-emerald-500" style={{ width: "40%" }} />
            </div>
         </Card>
         <Card className="p-4 glass-dark border-white/5">
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Under Appeal</p>
            <h3 className="text-2xl font-bold text-blue-400 mt-1">142</h3>
            <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-blue-500" style={{ width: "25%" }} />
            </div>
         </Card>
         <Card className="p-4 glass-dark border-white/5">
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Rejection Rate</p>
            <h3 className="text-2xl font-bold text-rose-400 mt-1">2.1%</h3>
            <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-rose-500" style={{ width: "10%" }} />
            </div>
         </Card>
      </div>

      {/* Search & Table */}
      <Card className="glass-dark border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex flex-col md:flex-row gap-4">
           <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search by challan ID or vehicle number..." 
                className="pl-10 bg-white/5 border-white/10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
           </div>
           <div className="flex gap-2">
              <Button variant="outline" className="border-white/10">Status: All</Button>
              <Button variant="outline" className="border-white/10"><Filter className="w-4 h-4" /></Button>
           </div>
        </div>
        
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-muted-foreground">Challan ID</TableHead>
              <TableHead className="text-muted-foreground">Vehicle</TableHead>
              <TableHead className="text-muted-foreground">Violation</TableHead>
              <TableHead className="text-muted-foreground">Date</TableHead>
              <TableHead className="text-muted-foreground">Amount</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-right text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_CHALLANS.map((chl) => (
              <TableRow key={chl.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                <TableCell className="font-mono text-xs text-muted-foreground">{chl.id}</TableCell>
                <TableCell className="font-bold text-white">{chl.plate}</TableCell>
                <TableCell className="text-sm text-white/80">{chl.type}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{chl.date}</TableCell>
                <TableCell className="font-bold text-white">₹ {chl.amount}</TableCell>
                <TableCell>
                  <Badge className={cn(
                    "font-medium",
                    chl.status === 'PAID' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : 
                    chl.status === 'PENDING' ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                    chl.status === 'REJECTED' ? "bg-rose-500/10 text-rose-400 border-rose-500/20" :
                    "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  )}>
                    {chl.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10"><FileText className="w-4 h-4" /></Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8 hover:bg-white/10")}>
                        <MoreVertical className="w-4 h-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass-dark border-white/10">
                        <DropdownMenuItem className="focus:bg-white/5"><ExternalLink className="w-4 h-4 mr-2" /> View Details</DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-white/5"><Download className="w-4 h-4 mr-2" /> Download PDF</DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem className="focus:bg-white/5 text-primary"><CreditCard className="w-4 h-4 mr-2" /> Mark as Paid</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
