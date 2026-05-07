"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Camera, Upload, ShieldCheck, MapPin, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function CitizenReportPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Report Submitted!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for contributing to road safety. Our team will review your report. 
            Once approved, you will receive 500 reward points!
          </p>
          <Button onClick={() => window.location.reload()} className="w-full h-12 bg-primary hover:bg-primary/90">
            Submit Another Report
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10 text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Citizen Reporting Portal</Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Report a Violation</h1>
          <p className="text-muted-foreground">Help us make our roads safer and earn rewards for every verified report.</p>
        </div>

        <Card className="glass-dark border-white/5 overflow-hidden">
          <div className="h-1 bg-white/5 w-full">
            <motion.div 
              className="h-full bg-primary" 
              initial={{ width: "33%" }}
              animate={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
            />
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <Label>Violation Type</Label>
                    <Select>
                      <SelectTrigger className="bg-white/5 border-white/10 h-12">
                        <SelectValue placeholder="Select the type of violation" />
                      </SelectTrigger>
                      <SelectContent className="glass-dark border-white/10">
                        <SelectItem value="NO_HELMET">No Helmet</SelectItem>
                        <SelectItem value="TRIPLE_RIDING">Triple Riding</SelectItem>
                        <SelectItem value="RED_SIGNAL">Red Signal Jumping</SelectItem>
                        <SelectItem value="WRONG_WAY">Wrong Way Driving</SelectItem>
                        <SelectItem value="PHONE_USE">Mobile Phone Usage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label>Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        placeholder="Enter the location of the incident" 
                        className="bg-white/5 border-white/10 pl-10 h-12"
                      />
                    </div>
                  </div>

                  <Button type="button" onClick={() => setStep(2)} className="w-full h-12 bg-primary">
                    Next Step
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <Label>Evidence (Photo/Video)</Label>
                    <div className="border-2 border-dashed border-white/10 rounded-xl p-12 text-center hover:bg-white/5 transition-colors cursor-pointer group">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Camera className="w-8 h-8 text-primary" />
                      </div>
                      <p className="font-medium">Click to upload or drag & drop</p>
                      <p className="text-xs text-muted-foreground mt-2">Maximum file size: 50MB</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 h-12 border-white/10">
                      Back
                    </Button>
                    <Button type="button" onClick={() => setStep(3)} className="flex-1 h-12 bg-primary">
                      Next Step
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <Label>Your Information</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="Full Name" className="bg-white/5 border-white/10 h-12" />
                      <Input placeholder="Email Address" type="email" className="bg-white/5 border-white/10 h-12" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Additional Details (Optional)</Label>
                    <Textarea 
                      placeholder="Tell us more about what happened..." 
                      className="bg-white/5 border-white/10 min-h-[100px]"
                    />
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg flex gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                    <p className="text-xs text-amber-500/80 leading-relaxed">
                      By submitting, you confirm that the information provided is accurate. 
                      Filing false reports may result in account suspension.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1 h-12 border-white/10">
                      Back
                    </Button>
                    <Button type="submit" disabled={loading} className="flex-1 h-12 bg-primary">
                      {loading ? "Submitting..." : "Complete Report"}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Card>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-primary font-bold">1</span>
            </div>
            <h4 className="font-bold text-sm">Capture</h4>
            <p className="text-[10px] text-muted-foreground mt-1">Take a clear photo or video of the violation.</p>
          </div>
          <div className="text-center p-4">
             <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-primary font-bold">2</span>
            </div>
            <h4 className="font-bold text-sm">Upload</h4>
            <p className="text-[10px] text-muted-foreground mt-1">Submit the details through our secure portal.</p>
          </div>
          <div className="text-center p-4">
             <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-primary font-bold">3</span>
            </div>
            <h4 className="font-bold text-sm">Earn</h4>
            <p className="text-[10px] text-muted-foreground mt-1">Receive reward points for every verified report.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", className)}>
      {children}
    </span>
  );
}
