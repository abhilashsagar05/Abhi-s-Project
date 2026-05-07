import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  subValue: string;
  icon: LucideIcon;
  trend: "up" | "down" | "neutral";
  color: "primary" | "accent" | "amber" | "rose";
}

const colorMap = {
  primary: "text-primary border-primary/20 bg-primary/5 shadow-primary/10",
  accent: "text-accent border-accent/20 bg-accent/5 shadow-accent/10",
  amber: "text-amber-500 border-amber-500/20 bg-amber-500/5 shadow-amber-500/10",
  rose: "text-rose-500 border-rose-500/20 bg-rose-500/5 shadow-rose-500/10",
};

export default function StatCard({ label, value, subValue, icon: Icon, trend, color }: StatCardProps) {
  return (
    <Card className={cn(
      "p-6 glass-dark border-white/5 relative overflow-hidden group hover:border-white/20 transition-all",
    )}>
      <div className={cn(
        "absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-20 transition-opacity group-hover:opacity-40",
        color === "primary" && "bg-primary",
        color === "accent" && "bg-accent",
        color === "amber" && "bg-amber-500",
        color === "rose" && "bg-rose-500",
      )} />
      
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <h3 className="text-3xl font-bold mt-1 text-white">{value}</h3>
          <p className={cn(
            "text-xs mt-1 font-medium",
            trend === "up" ? "text-emerald-400" : trend === "down" ? "text-rose-400" : "text-muted-foreground"
          )}>
            {subValue}
          </p>
        </div>
        
        <div className={cn(
          "w-12 h-12 rounded-xl border flex items-center justify-center",
          colorMap[color]
        )}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
}
