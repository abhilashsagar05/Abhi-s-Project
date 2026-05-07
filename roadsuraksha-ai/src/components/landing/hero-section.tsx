"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Shield, Activity, Camera } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <Activity className="w-4 h-4" />
            <span>Next-Gen Traffic Monitoring Active</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            Safeguarding Roads with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent neon-blue">
              AI Precision
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Empowering traffic authorities with real-time violation detection, automated e-challans, and deep analytics for a safer tomorrow.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/dashboard" 
              className={cn(
                buttonVariants({ size: "lg" }), 
                "h-12 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all hover:scale-105"
              )}
            >
              Launch Dashboard <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              href="/portal" 
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }), 
                "h-12 px-8 text-lg font-semibold border-primary/20 hover:bg-primary/10 transition-all"
              )}
            >
              Citizen Portal <Shield className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </motion.div>

        {/* Floating Mockup/UI Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-16 relative max-w-5xl mx-auto"
        >
          <div className="glass-dark rounded-2xl p-4 shadow-2xl border border-white/10">
             <div className="aspect-video rounded-xl bg-black/40 overflow-hidden relative border border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80" 
                  alt="Traffic Monitor" 
                  className="w-full h-full object-cover opacity-60"
                />
                
                {/* Simulated AI Overlays */}
                <div className="absolute top-1/4 left-1/3 w-32 h-48 border-2 border-primary/60 rounded-md animate-pulse">
                  <span className="absolute -top-6 left-0 bg-primary text-[10px] px-1 rounded uppercase font-bold text-white">Car: 98%</span>
                </div>
                
                <div className="absolute bottom-1/3 right-1/4 w-24 h-24 border-2 border-accent/60 rounded-md animate-pulse">
                  <span className="absolute -top-6 left-0 bg-accent text-[10px] px-1 rounded uppercase font-bold text-black">Violation: No Helmet</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/60">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                      <span>LIVE FEED: CP_NORTH_01</span>
                   </div>
                   <span>2026-05-07 21:18:20</span>
                </div>
             </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-8 -left-8 w-24 h-24 bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-accent/20 blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
