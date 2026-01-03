import { GlassCard } from "@/components/ui/GlassCard";
import { roadmapData } from "@/lib/mockData";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function Roadmap() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-6 h-6 text-primary" />;
      case "active":
        return <Clock className="w-6 h-6 text-secondary animate-pulse" />;
      default:
        return <Circle className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return { text: "Completed", color: "text-primary bg-primary/10" };
      case "active":
        return { text: "In Progress", color: "text-secondary bg-secondary/10" };
      default:
        return { text: "Upcoming", color: "text-muted-foreground bg-muted" };
    }
  };

  return (
    <div className="page-enter container mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          PumpUSD <span className="text-gradient-primary">Roadmap</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Our journey to build the most powerful flywheel engine for token creators
        </p>
      </div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto relative">
        {/* Vertical line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-muted" />

        {roadmapData.map((phase, index) => {
          const status = getStatusLabel(phase.status);
          const isEven = index % 2 === 0;

          return (
            <div
              key={phase.phase}
              className={cn(
                "relative flex items-start gap-8 mb-12",
                "md:flex-row",
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              )}
            >
              {/* Timeline dot */}
              <div
                className={cn(
                  "absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full",
                  "bg-background border-2 flex items-center justify-center z-10",
                  phase.status === "completed" && "border-primary",
                  phase.status === "active" && "border-secondary",
                  phase.status === "upcoming" && "border-muted"
                )}
              >
                {getStatusIcon(phase.status)}
              </div>

              {/* Content */}
              <div
                className={cn(
                  "ml-24 md:ml-0 md:w-[calc(50%-3rem)]",
                  isEven ? "md:pr-12 md:text-right" : "md:pl-12"
                )}
              >
                <GlassCard
                  className={cn(
                    "p-6",
                    phase.status === "active" && "glass-card-glow"
                  )}
                  hover
                >
                  <div className={cn("flex items-center gap-3 mb-4", isEven && "md:flex-row-reverse")}>
                    <span className="text-sm font-medium text-muted-foreground">
                      {phase.phase}
                    </span>
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium",
                        status.color
                      )}
                    >
                      {status.text}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-4">{phase.title}</h3>

                  <ul className={cn("space-y-3", isEven && "md:text-right")}>
                    {phase.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className={cn(
                          "flex items-center gap-3 text-sm text-muted-foreground",
                          isEven && "md:flex-row-reverse"
                        )}
                      >
                        <div
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            phase.status === "completed" && "bg-primary",
                            phase.status === "active" && "bg-secondary",
                            phase.status === "upcoming" && "bg-muted-foreground"
                          )}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </div>

              {/* Spacer for opposite side */}
              <div className="hidden md:block md:w-[calc(50%-3rem)]" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
