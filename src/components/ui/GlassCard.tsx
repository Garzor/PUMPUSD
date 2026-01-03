import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
}

export function GlassCard({ children, className, glow = false, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        glow ? "glass-card-glow" : "glass-card",
        hover && "hover-lift cursor-pointer",
        "p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
