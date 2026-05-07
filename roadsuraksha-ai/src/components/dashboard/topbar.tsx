"use client";

import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="h-16 border-b border-white/5 glass-dark flex items-center justify-between px-8 z-20">
      <div className="relative w-96 max-w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Search violations, vehicles, or cameras..." 
          className="pl-10 bg-white/5 border-white/10 focus-visible:ring-primary/50 h-10"
        />
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative hover:bg-white/5">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
        </Button>

        <div className="h-8 w-px bg-white/10 mx-2" />

        <DropdownMenu>
          <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost" }), "p-0 hover:bg-transparent")}>
             <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-white">Abhilash Sagar</p>
                  <p className="text-xs text-muted-foreground">Super Admin</p>
                </div>
                <Avatar className="h-9 w-9 border border-primary/20">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
             </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glass-dark border-white/10">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="focus:bg-white/5">Profile</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-white/5">Settings</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-white/5 text-red-400 cursor-pointer" onClick={handleLogout}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
