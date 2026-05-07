"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Camera, 
  AlertOctagon, 
  Receipt, 
  BarChart3, 
  Map as MapIcon, 
  Users, 
  Settings,
  ShieldCheck,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Live Cameras", icon: Camera, href: "/dashboard/cameras" },
  { label: "Violations", icon: AlertOctagon, href: "/dashboard/violations" },
  { label: "E-Challans", icon: Receipt, href: "/dashboard/challans" },
  { label: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
  { label: "Map View", icon: MapIcon, href: "/dashboard/map" },
  { label: "User Management", icon: Users, href: "/dashboard/users" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "h-screen glass-dark border-r border-white/5 transition-all duration-300 flex flex-col z-30",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(var(--primary),0.4)]">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        {!collapsed && (
          <span className="text-xl font-bold tracking-tight text-white whitespace-nowrap">
            Road<span className="text-primary">Suraksha</span>
          </span>
        )}
      </div>

      <nav className="flex-1 px-3 space-y-1 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative",
                isActive 
                  ? "bg-primary text-white" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "group-hover:text-primary transition-colors")} />
              {!collapsed && <span className="font-medium">{item.label}</span>}
              {isActive && !collapsed && (
                <div className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex justify-center hover:bg-white/5"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </Button>
      </div>
    </aside>
  );
}
