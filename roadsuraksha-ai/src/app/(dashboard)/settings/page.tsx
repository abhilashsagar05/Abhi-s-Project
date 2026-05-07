"use client";

import { 
  Settings, 
  User, 
  Bell, 
  Lock, 
  Eye, 
  Camera, 
  Database, 
  Globe,
  Save,
  Moon,
  Sun,
  AlertCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="space-y-8 pb-10 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-white">System Settings</h1>
        <p className="text-muted-foreground mt-1">Configure your personal preferences and system-wide parameters.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1">
          <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <User className="w-4 h-4 mr-2" /> Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <Bell className="w-4 h-4 mr-2" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <Lock className="w-4 h-4 mr-2" /> Security
          </TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <Settings className="w-4 h-4 mr-2" /> System
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
           <Card className="p-8 glass-dark border-white/5 space-y-8">
              <div className="flex items-center gap-6">
                 <div className="relative group">
                    <div className="w-24 h-24 rounded-2xl bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden">
                       <User className="w-10 h-10 text-muted-foreground" />
                       <img src="https://github.com/shadcn.png" className="absolute inset-0 w-full h-full object-cover group-hover:opacity-40 transition-opacity" />
                    </div>
                    <Button size="icon" variant="ghost" className="absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity">
                       <EditIcon className="w-4 h-4 text-white" />
                    </Button>
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-white">Abhilash Sagar</h3>
                    <p className="text-sm text-muted-foreground">admin@roadsuraksha.gov.in</p>
                    <div className="flex gap-2 mt-2">
                       <Badge className="bg-primary/10 text-primary border-primary/20">Super Admin</Badge>
                       <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Verified</Badge>
                    </div>
                 </div>
              </div>

              <Separator className="bg-white/5" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label className="text-muted-foreground">Full Name</Label>
                    <Input defaultValue="Abhilash Sagar" className="bg-white/5 border-white/10 text-white" />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-muted-foreground">Email Address</Label>
                    <Input defaultValue="admin@roadsuraksha.gov.in" className="bg-white/5 border-white/10 text-white" />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-muted-foreground">Designation</Label>
                    <Input defaultValue="Chief Administrative Officer" className="bg-white/5 border-white/10 text-white" />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-muted-foreground">Department</Label>
                    <Input defaultValue="Traffic Control Bureau" className="bg-white/5 border-white/10 text-white" />
                 </div>
              </div>

              <div className="flex justify-end pt-4">
                 <Button className="bg-primary text-white">
                    <Save className="w-4 h-4 mr-2" /> Save Changes
                 </Button>
              </div>
           </Card>
        </TabsContent>

        <TabsContent value="notifications">
           <Card className="p-8 glass-dark border-white/5 space-y-6">
              <h3 className="text-xl font-bold text-white">Notification Preferences</h3>
              <div className="space-y-6">
                 {[
                   { label: "New Violation Alerts", desc: "Receive instant notifications for high-confidence AI detections.", icon: AlertCircle },
                   { label: "Financial Reports", desc: "Weekly summaries of revenue collection and challan stats.", icon: Database },
                   { label: "System Maintenance", desc: "Updates about camera downtime and software upgrades.", icon: Camera },
                   { label: "User Activity Logs", desc: "Monitor login attempts and administrative actions.", icon: Globe }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between">
                      <div className="flex gap-4">
                         <div className="p-2 h-fit rounded-lg bg-white/5 border border-white/10">
                            <item.icon className="w-4 h-4 text-primary" />
                         </div>
                         <div>
                            <p className="text-sm font-medium text-white">{item.label}</p>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                         </div>
                      </div>
                      <Switch defaultChecked />
                   </div>
                 ))}
              </div>
           </Card>
        </TabsContent>

        <TabsContent value="system">
           <Card className="p-8 glass-dark border-white/5 space-y-6">
              <h3 className="text-xl font-bold text-white">Global Configuration</h3>
              <div className="space-y-6">
                 <div className="flex items-center justify-between">
                    <div>
                       <p className="text-sm font-medium text-white">Automatic Challan Generation</p>
                       <p className="text-xs text-muted-foreground">Issue challans automatically for violations with &gt;95% confidence.</p>
                    </div>
                    <Switch />
                 </div>
                 <div className="flex items-center justify-between">
                    <div>
                       <p className="text-sm font-medium text-white">Dark Mode (Forced)</p>
                       <p className="text-xs text-muted-foreground">Enforce the futuristic dark theme across all administrative panels.</p>
                    </div>
                    <Switch defaultChecked />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-muted-foreground">Base Fine Amount (Global Override)</Label>
                    <div className="flex gap-2">
                       <div className="relative flex-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                          <Input type="number" defaultValue="1000" className="pl-8 bg-white/5 border-white/10" />
                       </div>
                       <Button variant="outline" className="border-white/10">Update</Button>
                    </div>
                 </div>
              </div>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EditIcon(props: any) {
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
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  )
}
