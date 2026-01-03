import { GlassCard } from "@/components/ui/GlassCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/lib/mockData";
import { 
  Download, 
  RefreshCw, 
  TrendingUp, 
  Droplets,
  Wallet,
  Rocket,
  Settings2,
  Activity,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { 
    id: 1, 
    label: "Capture", 
    description: "Monitor and collect fees from on-chain activity",
    icon: Download,
    color: "text-primary"
  },
  { 
    id: 2, 
    label: "Convert", 
    description: "Transform captured value according to your settings",
    icon: RefreshCw,
    color: "text-secondary"
  },
  { 
    id: 3, 
    label: "Apply", 
    description: "Execute buy pressure, LP additions, or burns",
    icon: TrendingUp,
    color: "text-accent"
  },
  { 
    id: 4, 
    label: "Reinforce", 
    description: "Strengthen momentum cycle for sustained growth",
    icon: Droplets,
    color: "text-primary"
  },
];

const gettingStartedSteps = [
  { icon: Wallet, label: "Connect wallet", description: "Link your preferred Solana wallet" },
  { icon: Rocket, label: "Launch or import token", description: "Create new or add existing token" },
  { icon: Settings2, label: "Configure mode", description: "Choose presets or customize settings" },
  { icon: Activity, label: "Activate + monitor", description: "Start the flywheel and track performance" },
];

export function Learn() {
  return (
    <div className="page-enter container mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Learn how <span className="text-gradient-primary">Echo</span> works
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A self-reinforcing cycle where actions echo back into the token, creating sustained momentum
        </p>
      </div>

      {/* Stepper */}
      <div className="max-w-4xl mx-auto mb-20">
        <GlassCard className="p-8" glow>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={step.id} className="relative text-center">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-border to-transparent" />
                )}
                
                {/* Step content */}
                <div className="relative z-10">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center",
                    "bg-muted/50 border border-border/50"
                  )}>
                    <step.icon className={cn("w-7 h-7", step.color)} />
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">Step {step.id}</div>
                  <h3 className="font-semibold mb-2">{step.label}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-8 mb-20">
        {/* Left: Two Phases */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Two Phases</h2>
          
          <GlassCard className="p-6 mb-4" hover>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-secondary">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Bonding Phase</h3>
                <p className="text-muted-foreground mb-4">
                  During early token lifecycle, the flywheel focuses on momentum building and price stability. 
                  Captured value is strategically allocated to build a strong foundation.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs bg-secondary/10 text-secondary">
                    Momentum Building
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs bg-secondary/10 text-secondary">
                    Price Stability
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6" hover>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Graduated Phase</h3>
                <p className="text-muted-foreground mb-4">
                  Once graduated, the focus shifts to liquidity reinforcement and sustained buy pressure. 
                  The flywheel maintains long-term strength and token value.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary">
                    Liquidity Reinforcement
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary">
                    Sustained Pressure
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right: Getting Started */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Getting Started</h2>
          
          <GlassCard className="p-6">
            <div className="space-y-6">
              {gettingStartedSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-muted-foreground">Step {index + 1}</span>
                      {index < gettingStartedSteps.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-muted-foreground/50" />
                      )}
                    </div>
                    <h4 className="font-medium mb-1">{step.label}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
        
        <GlassCard className="p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                <AccordionTrigger className="text-left hover:no-underline hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </GlassCard>
      </div>
    </div>
  );
}
