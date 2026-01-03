import { ReactNode } from "react";
import { EchoAura } from "./EchoAura";

interface BackgroundSystemProps {
  children: ReactNode;
  showEchoAura?: boolean;
  className?: string;
}

export function BackgroundSystem({ children, showEchoAura = false, className = "" }: BackgroundSystemProps) {
  return (
    <div className={`relative min-h-screen ${className}`}>
      {/* Radial gradient base */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 0%, rgba(184, 246, 196, 0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, rgba(184, 246, 196, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(11, 15, 20, 0.95) 0%, #0B0F14 100%)
          `,
        }}
      />

      {/* Subtle noise overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Faint grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(184, 246, 196, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(184, 246, 196, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Diagonal stream lines */}
      <svg
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.06]"
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="streamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B8F6C4" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#B8F6C4" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#B8F6C4" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45) % 360;
          const x1 = 50 + Math.cos((angle * Math.PI) / 180) * 100;
          const y1 = 50 + Math.sin((angle * Math.PI) / 180) * 100;
          const x2 = 50 + Math.cos(((angle + 180) * Math.PI) / 180) * 100;
          const y2 = 50 + Math.sin(((angle + 180) * Math.PI) / 180) * 100;
          return (
            <line
              key={i}
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="url(#streamGradient)"
              strokeWidth="1"
              style={{
                animation: `streamMove ${20 + i * 2}s linear infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          );
        })}
        <style>{`
          @keyframes streamMove {
            0% { opacity: 0; transform: translate(0, 0); }
            50% { opacity: 0.3; }
            100% { opacity: 0; transform: translate(${Math.cos(45 * Math.PI / 180) * 20}px, ${Math.sin(45 * Math.PI / 180) * 20}px); }
          }
        `}</style>
      </svg>

      {/* Echo Aura (only on hero sections) */}
      {showEchoAura && <EchoAura />}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}


