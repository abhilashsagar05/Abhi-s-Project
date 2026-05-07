import Navbar from "@/components/landing/navbar";
import HeroSection from "@/components/landing/hero-section";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      
      {/* Additional sections will go here */}
      <section id="features" className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Core AI Capabilities</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our advanced neural networks are trained specifically for Indian road conditions and traffic patterns.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: "Helmet Detection", desc: "Real-time detection of riders without helmets with 99.2% accuracy.", icon: "Shield" },
             { title: "Triple Riding", desc: "Identifies multiple riders on two-wheelers in crowded junctions.", icon: "Users" },
             { title: "Red Light Jump", desc: "Automated violation capture synchronized with traffic signal state.", icon: "Signal" },
             { title: "Wrong Side Driving", desc: "Detects vehicles moving against traffic flow instantly.", icon: "AlertTriangle" },
             { title: "Number Plate OCR", desc: "High-speed recognition of Indian license plates in varied light.", icon: "Type" },
             { title: "Traffic Heatmaps", desc: "Visualizes congestion patterns to optimize city planning.", icon: "Map" }
           ].map((feature, i) => (
             <div key={i} className="glass-dark p-8 rounded-2xl border-white/5 hover:border-primary/50 transition-colors group">
               <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <div className="w-6 h-6 text-primary" />
               </div>
               <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
             </div>
           ))}
        </div>
      </section>
    </main>
  );
}
