"use client";

import { 
  Users, 
  UserPlus, 
  Shield, 
  Mail, 
  MoreVertical, 
  Lock, 
  Trash2, 
  Edit2,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const MOCK_USERS = [
  { id: 1, name: "Abhilash Sagar", email: "admin@roadsuraksha.gov.in", role: "SUPER_ADMIN", status: "ACTIVE", avatar: "AS" },
  { id: 2, name: "Priya Sharma", email: "priya@traffichq.in", role: "TRAFFIC_ADMIN", status: "ACTIVE", avatar: "PS" },
  { id: 3, name: "Rajesh Kumar", email: "rajesh@cam-ops.com", role: "CAMERA_OPERATOR", status: "OFFLINE", avatar: "RK" },
  { id: 4, name: "Ananya Iyer", email: "ananya@analytics.gov.in", role: "ANALYST", status: "ACTIVE", avatar: "AI" },
  { id: 5, name: "Vikram Singh", email: "vikram@traffichq.in", role: "TRAFFIC_ADMIN", status: "INACTIVE", avatar: "VS" },
];

export default function UsersPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage administrative access and role-based permissions.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          <UserPlus className="w-4 h-4 mr-2" /> Invite New User
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="p-6 glass-dark border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
               <Shield className="w-6 h-6" />
            </div>
            <div>
               <p className="text-sm text-muted-foreground">Admin Roles</p>
               <h3 className="text-2xl font-bold text-white">12 Active</h3>
            </div>
         </Card>
         <Card className="p-6 glass-dark border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent border border-accent/20">
               <Users className="w-6 h-6" />
            </div>
            <div>
               <p className="text-sm text-muted-foreground">Total Personnel</p>
               <h3 className="text-2xl font-bold text-white">84 Total</h3>
            </div>
         </Card>
         <Card className="p-6 glass-dark border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
               <Lock className="w-6 h-6" />
            </div>
            <div>
               <p className="text-sm text-muted-foreground">Security Level</p>
               <h3 className="text-2xl font-bold text-white">Tier 1</h3>
            </div>
         </Card>
      </div>

      <Card className="glass-dark border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5">
           <div className="relative w-96 max-w-full">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search users by name or email..." className="pl-10 bg-white/5 border-white/10" />
           </div>
        </div>
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-muted-foreground">User</TableHead>
              <TableHead className="text-muted-foreground">Role</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Last Login</TableHead>
              <TableHead className="text-right text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_USERS.map((user) => (
              <TableRow key={user.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                <TableCell>
                   <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-white/10">
                         <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.avatar}`} />
                         <AvatarFallback>{user.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                         <p className="text-sm font-bold text-white">{user.name}</p>
                         <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                   </div>
                </TableCell>
                <TableCell>
                   <Badge variant="outline" className="bg-white/5 border-white/10 text-white/80">
                      {user.role.replace('_', ' ')}
                   </Badge>
                </TableCell>
                <TableCell>
                   <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        user.status === 'ACTIVE' ? "bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" : 
                        user.status === 'OFFLINE' ? "bg-slate-500" : "bg-rose-500"
                      )} />
                      <span className="text-sm text-muted-foreground">{user.status}</span>
                   </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">Today, 14:22</TableCell>
                <TableCell className="text-right">
                   <DropdownMenu>
                      <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8 hover:bg-white/10")}>
                         <MoreVertical className="w-4 h-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass-dark border-white/10">
                         <DropdownMenuItem className="focus:bg-white/5"><Edit2 className="w-4 h-4 mr-2" /> Edit User</DropdownMenuItem>
                         <DropdownMenuItem className="focus:bg-white/5"><Shield className="w-4 h-4 mr-2" /> Permissions</DropdownMenuItem>
                         <DropdownMenuSeparator className="bg-white/10" />
                         <DropdownMenuItem className="focus:bg-white/5 text-rose-400"><Trash2 className="w-4 h-4 mr-2" /> Remove Access</DropdownMenuItem>
                      </DropdownMenuContent>
                   </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
