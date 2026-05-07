"use client";

import { useState } from "react";
import { Search, Receipt, ShieldCheck, Download, AlertCircle, CreditCard, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function CitizenPortal() {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicleNumber) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setResults([
        { id: "CHL-2026-9921", date: "2026-05-01", violation: "No Helmet", amount: 1000, status: "PENDING" },
        { id: "CHL-2026-8812", date: "2026-04-15", violation: "Red Signal Jump", amount: 5000, status: "PAID" },
      ]);
      setIsSearching(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/20 blur-[120px] -z-10 rounded-full" />
        
        <div className="container mx-auto px-4 text-center max-w-4xl">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="space-y-6"
           >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
                <ShieldCheck className="w-4 h-4" />
                <span>Official Government Traffic Portal</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                Check & Pay Your <br />
                <span className="text-primary neon-blue">E-Challans</span> Online
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Secure, transparent, and instant. Enter your vehicle registration number to view pending traffic violations and process payments.
              </p>

              {/* Search Form */}
              <form onSubmit={handleSearch} className="mt-12 relative max-w-2xl mx-auto">
                 <div className="glass-dark p-2 rounded-2xl border-white/10 flex items-center gap-2 shadow-2xl">
                    <div className="flex-1 relative">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                       <Input 
                         value={vehicleNumber}
                         onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                         placeholder="ENTER VEHICLE NUMBER (e.g. DL 01 AB 1234)" 
                         className="h-14 pl-12 bg-transparent border-none text-lg font-mono tracking-widest text-white placeholder:tracking-normal placeholder:text-muted-foreground/50 focus-visible:ring-0"
                       />
                    </div>
                    <Button 
                      type="submit" 
                      className="h-14 px-8 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-xl transition-all hover:scale-105 disabled:opacity-50"
                      disabled={isSearching}
                    >
                      {isSearching ? "SEARCHING..." : "SEARCH CHALLANS"}
                    </Button>
                 </div>
                 <p className="mt-4 text-xs text-muted-foreground flex items-center justify-center gap-2">
                    <AlertCircle className="w-3 h-3" /> Note: Only official registered vehicles will show up here.
                 </p>
              </form>
           </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section className="pb-24 container mx-auto px-4 max-w-4xl">
         <AnimatePresence mode="wait">
            {results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                 <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Found {results.length} Challans for <span className="text-primary">{vehicleNumber}</span></h3>
                    <Button variant="outline" size="sm" onClick={() => setResults(null)}>Clear Results</Button>
                 </div>

                 <div className="grid gap-4">
                    {results.map((chl) => (
                      <Card key={chl.id} className="p-6 glass-dark border-white/5 hover:border-white/20 transition-all group">
                         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-start gap-4">
                               <div className={cn(
                                 "p-3 rounded-xl",
                                 chl.status === 'PAID' ? "bg-emerald-500/10 text-emerald-500" : "bg-primary/10 text-primary"
                               )}>
                                  <Receipt className="w-6 h-6" />
                               </div>
                               <div>
                                  <p className="text-xs text-muted-foreground font-mono">{chl.id}</p>
                                  <h4 className="text-lg font-bold text-white mt-0.5">{chl.violation}</h4>
                                  <p className="text-sm text-muted-foreground">{chl.date} • Near Connaught Place</p>
                               </div>
                            </div>

                            <div className="flex items-center justify-between md:justify-end gap-8">
                               <div className="text-right">
                                  <p className="text-xs text-muted-foreground">Fine Amount</p>
                                  <p className="text-xl font-bold text-white">₹ {chl.amount}</p>
                               </div>
                               <div className="flex flex-col items-end gap-2">
                                  <Badge className={chl.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}>
                                     {chl.status}
                                  </Badge>
                                  {chl.status === 'PENDING' ? (
                                    <Button size="sm" className="bg-primary text-white">
                                       Pay Now <CreditCard className="w-3 h-3 ml-2" />
                                    </Button>
                                  ) : (
                                    <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/5">
                                       Receipt <Download className="w-3 h-3 ml-2" />
                                    </Button>
                                  )}
                               </div>
                            </div>
                         </div>
                      </Card>
                    ))}
                 </div>
                 
                 <div className="mt-12 p-8 rounded-3xl bg-primary/5 border border-primary/10 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center shrink-0">
                       <ShieldCheck className="w-10 h-10 text-primary" />
                    </div>
                    <div className="flex-1 space-y-2">
                       <h4 className="text-xl font-bold text-white">Safe & Secure Payments</h4>
                       <p className="text-muted-foreground">All payments are processed through government-authorized gateways with 256-bit encryption. Your data is always safe.</p>
                    </div>
                    <Button size="lg" variant="link" className="text-primary font-bold group">
                       Learn More <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Button>
                 </div>
              </motion.div>
            )}
         </AnimatePresence>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-black/20">
         <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground text-sm">© 2026 Ministry of Road Transport & Highways. All Rights Reserved.</p>
            <div className="flex justify-center gap-6 mt-4 text-xs text-muted-foreground">
               <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
               <a href="#" className="hover:text-primary transition-colors">Contact Support</a>
            </div>
         </div>
      </footer>
    </main>
  );
}
