import { useEffect, useRef } from "react";

interface EchoAuraProps {
  className?: string;
}

interface Ring {
  radius: number;
  opacity: number;
  maxRadius: number;
  isArc: boolean;
  arcStart: number;
  arcEnd: number;
  rotation: number;
  age: number;
  lifetime: number;
}

export function EchoAura({ className }: EchoAuraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ringsRef = useRef<Ring[]>([]);
  const animationFrameRef = useRef<number>();
  const lastSpawnRef = useRef<number>(0);
  const nextSpawnDelayRef = useRef<number>(8000 + Math.random() * 4000); // 8-12 seconds
  const globalRotationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create gradient for ring stroke
    const createGradient = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number, angle: number) => {
      const gradient = ctx.createLinearGradient(
        centerX + Math.cos(angle) * radius * 0.5,
        centerY + Math.sin(angle) * radius * 0.5,
        centerX - Math.cos(angle) * radius * 0.5,
        centerY - Math.sin(angle) * radius * 0.5
      );
      gradient.addColorStop(0, "rgba(77, 231, 255, 1)"); // cyan
      gradient.addColorStop(1, "rgba(124, 92, 255, 1)"); // violet
      return gradient;
    };

    // Spawn a new ring
    const spawnRing = () => {
      const isArc = Math.random() > 0.5; // 50% chance of being an arc
      const arcStart = Math.random() * Math.PI * 2;
      const arcEnd = arcStart + (Math.PI * 2 * (0.3 + Math.random() * 0.4)); // 30-70% of circle

      ringsRef.current.push({
        radius: 20,
        opacity: 0.07,
        maxRadius: 400 + Math.random() * 200, // 400-600px max radius
        isArc,
        arcStart,
        arcEnd,
        rotation: Math.random() * Math.PI * 2,
        age: 0,
        lifetime: 8000 + Math.random() * 4000, // 8-12 seconds
      });
    };

    // Initial rings - spawn a few at different stages
    const initialSpawn = () => {
      spawnRing();
      setTimeout(() => spawnRing(), 2000);
      setTimeout(() => spawnRing(), 4000);
    };
    initialSpawn();

    const centerX = canvas.width / 2;
    const centerY = canvas.height * 0.4; // Slightly above center

    let lastFrameTime = performance.now();

    const animate = () => {
      const currentTime = performance.now();
      
      // Spawn new ring every 8-12 seconds (randomized)
      if (currentTime - lastSpawnRef.current > nextSpawnDelayRef.current) {
        spawnRing();
        lastSpawnRef.current = currentTime;
        nextSpawnDelayRef.current = 8000 + Math.random() * 4000; // Next spawn in 8-12 seconds
      }

      // Clear canvas with subtle fade
      ctx.fillStyle = "rgba(7, 10, 18, 0.15)"; // Very subtle fade for trailing effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update global rotation (very slow drift)
      globalRotationRef.current += 0.0005;

        // Update and draw rings
        const deltaTime = currentTime - lastFrameTime;
        lastFrameTime = currentTime;

        ringsRef.current = ringsRef.current.filter((ring) => {
          ring.age += deltaTime;
          const progress = ring.age / ring.lifetime;

        // Expand radius
        ring.radius = ring.maxRadius * progress;

        // Fade opacity as it expands
        ring.opacity = 0.07 * (1 - progress);

        // Slight rotation drift
        ring.rotation += 0.0002;

        // Draw ring
        if (ring.opacity > 0.001 && ring.radius < ring.maxRadius * 1.1) {
          ctx.save();

          // Apply global rotation
          ctx.translate(centerX, centerY);
          ctx.rotate(globalRotationRef.current);
          ctx.translate(-centerX, -centerY);

          // Set stroke style with gradient
          const gradient = createGradient(ctx, centerX, centerY, ring.radius, ring.rotation);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = Math.min(ring.opacity, 0.07); // Cap at 7% max
          
          // Add subtle glow effect
          ctx.shadowBlur = 20;
          ctx.shadowColor = "rgba(77, 231, 255, 0.3)";

          // Draw ring or arc
          ctx.beginPath();
          if (ring.isArc) {
            ctx.arc(
              centerX,
              centerY,
              ring.radius,
              ring.arcStart + ring.rotation,
              ring.arcEnd + ring.rotation
            );
          } else {
            ctx.arc(centerX, centerY, ring.radius, 0, Math.PI * 2);
          }
          ctx.stroke();
          
          // Reset shadow
          ctx.shadowBlur = 0;
          ctx.shadowColor = "transparent";

          ctx.restore();
        }

        // Remove if faded out or too large
        return ring.opacity > 0.001 && ring.radius < ring.maxRadius * 1.2;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className || ""}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          filter: "blur(25px)",
          opacity: 1,
        }}
      />
      {/* Edge fade mask - creates atmospheric fade at edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, transparent 35%, rgba(7, 10, 18, 0.2) 60%, rgba(7, 10, 18, 0.6) 85%, rgba(7, 10, 18, 0.95) 100%)
          `,
        }}
      />
    </div>
  );
}
