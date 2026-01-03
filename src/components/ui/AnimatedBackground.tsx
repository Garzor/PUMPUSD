import { useEffect, useRef } from "react";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const drawWave = (
      yOffset: number,
      amplitude: number,
      frequency: number,
      speed: number,
      opacity: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2 + yOffset);

      for (let x = 0; x <= canvas.width; x += 2) {
        const y =
          canvas.height / 2 +
          yOffset +
          Math.sin(x * frequency + time * speed) * amplitude +
          Math.sin(x * frequency * 0.5 + time * speed * 0.7) * amplitude * 0.5;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = `rgba(77, 231, 255, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const drawGrid = () => {
      const gridSize = 60;
      ctx.strokeStyle = "rgba(77, 231, 255, 0.03)";
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const drawParticles = () => {
      const particleCount = 30;
      for (let i = 0; i < particleCount; i++) {
        const x = ((i * 137.5 + time * 0.1) % canvas.width);
        const y = ((i * 97.3 + time * 0.05) % canvas.height);
        const size = 1 + Math.sin(time * 0.02 + i) * 0.5;
        const opacity = 0.1 + Math.sin(time * 0.01 + i * 0.5) * 0.05;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124, 92, 255, ${opacity})`;
        ctx.fill();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawGrid();
      drawParticles();
      
      // Multiple wave layers
      drawWave(-100, 30, 0.003, 0.5, 0.08);
      drawWave(0, 20, 0.004, 0.3, 0.05);
      drawWave(100, 25, 0.0035, 0.4, 0.06);

      time += 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}
