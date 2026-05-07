"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Camera, Shield } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between glass rounded-2xl px-6 py-3 border-white/5">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary),0.4)] group-hover:scale-110 transition-transform">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Road<span className="text-primary">Suraksha</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="#solutions" className="hover:text-primary transition-colors">Solutions</Link>
          <Link href="#about" className="hover:text-primary transition-colors">About</Link>
          <Link href="/portal" className="hover:text-primary transition-colors">Citizen Portal</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link 
            href="/sign-in" 
            className={cn(buttonVariants({ variant: "ghost" }), "text-white hover:bg-white/5")}
          >
            Log In
          </Link>
          <Link 
            href="/dashboard" 
            className={cn(buttonVariants({ variant: "default" }), "bg-primary hover:bg-primary/90 text-white")}
          >
            Dashboard <Shield className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
