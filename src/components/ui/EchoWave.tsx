import { useEffect, useRef } from "react";

interface EchoWaveProps {
  className?: string;
}

interface Wave {
  radius: number;
  opacity: number;
  maxRadius: number;
  age: number;
  lifetime: number;
  centerX: number;
  centerY: number;
  segments: number[]; // Array of segment lengths (for broken/imperfect rings)
}

export function EchoWave({ className }: EchoWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wavesRef = useRef<Wave[]>([]);
  const animationFrameRef = useRef<number>();
  const lastSpawnRef = useRef<number>(0);
  const nextSpawnDelayRef = useRef<number>(8000 + Math.random() * 4000);

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

    // Create a wave with slightly imperfect/broken segments
    const createWaveSegments = (): number[] => {
      const segments: number[] = [];
      const totalSegments = 8 + Math.floor(Math.random() * 4); // 8-12 segments
      const segmentLength = (Math.PI * 2) / totalSegments;
      
      for (let i = 0; i < totalSegments; i++) {
        // Each segment is slightly shorter or longer for imperfection
        const variation = 0.7 + Math.random() * 0.6; // 70-130% of normal length
        segments.push(segmentLength * variation);
      }
      
      return segments;
    };

    // Spawn a new wave
    const spawnWave = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.4; // Slightly above center
      
      wavesRef.current.push({
        radius: 10,
        opacity: 0.05, // Start at 5% opacity
        maxRadius: Math.max(canvas.width, canvas.height) * 1.2, // 120% of viewport
        age: 0,
        lifetime: 10000 + Math.random() * 4000, // 10-14 seconds
        centerX,
        centerY,
        segments: createWaveSegments(),
      });
    };

    // Initial waves
    const initialSpawn = () => {
      spawnWave();
      setTimeout(() => spawnWave(), 3000);
      setTimeout(() => spawnWave(), 6000);
    };
    initialSpawn();

    let lastFrameTime = performance.now();

    const animate = () => {
      const currentTime = performance.now();
      
      // Spawn new wave every 8-12 seconds
      if (currentTime - lastSpawnRef.current > nextSpawnDelayRef.current) {
        spawnWave();
        lastSpawnRef.current = currentTime;
        nextSpawnDelayRef.current = 8000 + Math.random() * 4000;
      }

      // Clear canvas with very subtle fade
      ctx.fillStyle = "rgba(7, 10, 18, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw waves
      const deltaTime = currentTime - lastFrameTime;
      lastFrameTime = currentTime;

      wavesRef.current = wavesRef.current.filter((wave) => {
        wave.age += deltaTime;
        const progress = wave.age / wave.lifetime;

        // Expand radius
        wave.radius = wave.maxRadius * progress;

        // Fade opacity as it expands (2-5% range)
        wave.opacity = Math.max(0.02, 0.05 * (1 - progress * 0.6)); // Fade from 5% to 2%

        // Draw wave if still visible
        if (wave.opacity > 0.001 && wave.radius < wave.maxRadius * 1.1) {
          ctx.save();
          
          // Set stroke style - very subtle cyan/violet gradient
          const gradient = ctx.createRadialGradient(
            wave.centerX,
            wave.centerY,
            wave.radius * 0.3,
            wave.centerX,
            wave.centerY,
            wave.radius
          );
          gradient.addColorStop(0, `rgba(77, 231, 255, ${wave.opacity})`); // cyan
          gradient.addColorStop(1, `rgba(124, 92, 255, ${wave.opacity * 0.7})`); // violet
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = 1;

          // Draw broken/imperfect ring segments
          let currentAngle = 0;
          for (const segmentLength of wave.segments) {
            ctx.beginPath();
            ctx.arc(
              wave.centerX,
              wave.centerY,
              wave.radius,
              currentAngle,
              currentAngle + segmentLength
            );
            ctx.stroke();
            
            currentAngle += segmentLength;
            
            // Small gap between segments for broken ring effect
            currentAngle += 0.05;
          }

          ctx.restore();
        }

        // Remove if faded out or too large
        return wave.opacity > 0.001 && wave.radius < wave.maxRadius * 1.2;
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
          opacity: 1,
        }}
      />
      {/* Edge fade mask */}
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


