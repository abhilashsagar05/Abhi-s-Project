"use client";

import { useState, useEffect } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  Clock, 
  Trophy,
  Filter,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function ReportsManagementPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const response = await fetch("/api/citizen/report");
        if (response.ok) {
          const data = await response.json();
          setReports(data);
        }
      } catch (error) {
        console.error("Failed to fetch reports");
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  const handleAction = async (id: string, action: "APPROVED" | "REJECTED") => {
    // In a real app, we'd call an API here
    setReports(reports.map(r => r.id === id ? { ...r, status: action } : r));
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Citizen Reports</h1>
          <p className="text-muted-foreground mt-1">Review and approve traffic violations reported by the public.</p>
        </div>
        <div className="flex items-center gap-3">
          <Card className="flex items-center px-4 py-2 bg-primary/10 border-primary/20 gap-3">
            <Trophy className="w-5 h-5 text-primary" />
            <div>
              <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Total Points Awarded</p>
              <p className="text-lg font-bold text-white leading-none">12,500</p>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by reporter name or email..." 
            className="pl-10 bg-black/20 border-white/10"
          />
        </div>
        <Button variant="outline" className="border-white/10 gap-2">
          <Filter className="w-4 h-4" /> Filter
        </Button>
      </div>

      <Card className="glass-dark border-white/5 overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-white font-bold">Reporter</TableHead>
              <TableHead className="text-white font-bold">Violation</TableHead>
              <TableHead className="text-white font-bold">Location</TableHead>
              <TableHead className="text-white font-bold">Submitted</TableHead>
              <TableHead className="text-white font-bold text-center">Status</TableHead>
              <TableHead className="text-white font-bold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-20 text-muted-foreground">
                  Loading reports...
                </TableCell>
              </TableRow>
            ) : reports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-20 text-muted-foreground">
                  No citizen reports found.
                </TableCell>
              </TableRow>
            ) : (
              reports.map((report) => (
                <TableRow key={report.id} className="border-white/5 hover:bg-white/5 transition-colors">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-white font-medium">{report.reporterName}</span>
                      <span className="text-[10px] text-muted-foreground">{report.reporterEmail}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-black/40 text-primary border-primary/20">
                      {report.violationType.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{report.location}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={cn(
                      "font-bold text-[10px]",
                      report.status === "PENDING" ? "bg-amber-500/10 text-amber-500" :
                      report.status === "APPROVED" ? "bg-emerald-500/10 text-emerald-500" :
                      "bg-rose-500/10 text-rose-500"
                    )}>
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {report.status === "PENDING" && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 hover:bg-emerald-500/20 text-emerald-500"
                            onClick={() => handleAction(report.id, "APPROVED")}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 hover:bg-rose-500/20 text-rose-500"
                            onClick={() => handleAction(report.id, "REJECTED")}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
