import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import { EchoWave } from "@/components/ui/EchoWave";
import { mockMetrics } from "@/lib/mockData";
import { 
  ArrowRight, 
  Settings2, 
  FileText, 
  RefreshCw,
  TrendingUp,
  Droplets,
  Flame
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        // Handle decimals properly
        if (value < 1) {
          setCount(Math.round(current * 100) / 100); // Round to 2 decimals
        } else {
          setCount(Math.floor(current));
        }
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const formatNumber = (num: number) => {
    // For decimal numbers (SOL values), show 2 decimal places
    if (num < 1 && num > 0) {
      return num.toFixed(2);
    }
    if (num >= 1000000) return (num / 1000000).toFixed(2) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toLocaleString();
  };

  return <span>{prefix}{formatNumber(count)}{suffix}</span>;
}

function StatTile({ label, value, prefix = "", suffix = "", showSparkline = false, highlight = false }: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  showSparkline?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="text-center relative">
      {/* Progress bar background */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
          style={{ width: "75%" }}
        />
      </div>
      
      <p className={cn(
        "text-3xl md:text-4xl font-bold mb-2",
        highlight ? "text-accent" : "text-foreground"
      )}>
        {prefix}
        <AnimatedCounter value={value} suffix={suffix} />
      </p>
      <p className="text-sm text-muted-foreground">{label}</p>
      
      {showSparkline && (
        <div className="mt-3 h-8 flex items-end justify-center gap-0.5">
          {[0.3, 0.5, 0.4, 0.7, 0.6, 0.8, 0.65, 0.9, 0.75, 0.85].map((h, i) => (
            <div
              key={i}
              className="w-1.5 bg-gradient-to-t from-primary to-secondary rounded-t"
              style={{ height: `${h * 100}%` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Overview() {
  const [lastUpdated, setLastUpdated] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-enter">
      {/* Hero Section with Echo Wave */}
      <section className="container mx-auto px-6 pt-32 pb-40 relative">
        <EchoWave className="absolute inset-0 -z-10" />
        
        <div className="max-w-5xl mx-auto text-center stagger-children relative z-10">
          {/* Headline */}
          <h1 className="text-[3.4rem] md:text-[5.5rem] lg:text-[7.3rem] font-extrabold tracking-tight leading-[0.95] mb-12">
            <span className="block text-foreground mb-2">The</span>
            <span className="block relative">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient text-[1.2em] relative z-10">
                Echo
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-30 blur-2xl -z-0" />
            </span>
            <span className="block text-foreground mt-2">Flywheel.</span>
          </h1>

          {/* Subhead */}
          <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed mb-8 max-w-3xl mx-auto font-normal">
            Convert creator activity into sustained buy pressure, liquidity reinforcement, and long-term strength.
          </p>

          {/* Microcopy */}
          <p className="text-lg text-muted-foreground/70 mb-16 max-w-2xl mx-auto">
            Observable on-chain actions. Configurable modes. Transparent logs.
          </p>

          {/* CTA Row */}
          <div className="flex flex-wrap items-center justify-center gap-5 -mb-16">
            <Link to="/dashboard">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 py-6 gap-2 shadow-[0_0_30px_-5px_rgba(255,122,24,0.5)] hover:shadow-[0_0_40px_-5px_rgba(255,122,24,0.7)] hover:scale-105 transition-all duration-300"
              >
                Launch Token
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 font-bold text-lg px-8 py-6 hover:shadow-[0_0_30px_-5px_rgba(77,231,255,0.4)] hover:scale-105 transition-all duration-300 bg-transparent"
                style={{
                  borderColor: "rgba(77, 231, 255, 0.6)",
                }}
              >
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Manage Tokens
                </span>
              </Button>
            </Link>
            <Link to="/learn">
              <Button 
                size="lg" 
                variant="ghost" 
                className="text-foreground/80 hover:text-foreground font-semibold text-lg px-6 py-6"
              >
                How it Works
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Protocol Metrics */}
      <section className="container mx-auto px-6 pb-24">
        <GlassCard className="p-8 md:p-12" glow>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <StatTile 
              label="Tokens Managed" 
              value={mockMetrics.tokensManaged} 
            />
            <StatTile 
              label="Graduated" 
              value={mockMetrics.graduated} 
            />
            <StatTile 
              label="Fees Captured" 
              value={mockMetrics.feesCaptured} 
              suffix=" SOL"
            />
            <StatTile 
              label="Echo Applied" 
              value={mockMetrics.momentumApplied} 
              suffix=" SOL"
              showSparkline={true}
              highlight={true}
            />
          </div>
          
          {/* Last updated */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-muted-foreground">
              Last updated: {lastUpdated} sec ago
            </p>
          </div>
        </GlassCard>
      </section>

      {/* Feature Cards */}
      <section className="container mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Flywheel Engine */}
          <GlassCard hover className="p-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <RefreshCw className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Flywheel Engine</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Capture → Convert → Apply → Reinforce. A perpetual cycle that transforms activity into momentum.
            </p>
            <div className="flex items-center gap-3 text-sm flex-wrap">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">Capture</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20">Convert</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <span className="px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">Apply</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">Reinforce</span>
            </div>
          </GlassCard>

          {/* Creator Controls */}
          <GlassCard hover className="p-8">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
              <Settings2 className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Creator Controls</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Choose from optimized presets or dive into advanced mode for granular control over every parameter.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>Buy pressure ratios</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Droplets className="w-4 h-4 text-primary" />
                <span>Liquidity allocation</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Flame className="w-4 h-4 text-accent" />
                <span>Burn intensity</span>
              </div>
            </div>
          </GlassCard>

          {/* Transparent Logs */}
          <GlassCard hover className="p-8">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
              <FileText className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Transparent Logs</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Every action is recorded on-chain. Export your activity history anytime for complete visibility.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-white/10">
                <span className="text-muted-foreground">Capture</span>
                <span className="text-primary font-mono">0.5 SOL</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/10">
                <span className="text-muted-foreground">Apply</span>
                <span className="text-primary font-mono">0.35 SOL</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground">Burn</span>
                <span className="text-accent font-mono">12,450</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
