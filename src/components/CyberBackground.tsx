import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: string;
  alpha: number;
}

const COLORS = ["#00e5ff", "#7b2dff", "#00f5d4", "#ff2a6d"];

export default function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const count = Math.min(90, Math.floor((width * height) / 18000));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 2 + 0.6,
        hue: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouse);

    let raf = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // connecting lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // slight attraction to mouse
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          p.x -= dx * 0.0015;
          p.y -= dy * 0.0015;
        }

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const ddx = p.x - q.x;
          const ddy = p.y - q.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < 120) {
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.12 * (1 - d / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = p.hue;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.hue;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#050505]">
      {/* base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0b1020_0%,_#050505_60%)]" />
      {/* grid */}
      <div className="cyber-grid absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_75%)]" />
      {/* canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* data rain columns */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="font-mono-cyber absolute top-0 text-[10px] text-cyan-300"
            style={{
              left: `${(i / 24) * 100}%`,
              animation: `data-rain ${6 + (i % 7)}s linear infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            {Array.from({ length: 18 }).map((__, j) => (
              <div key={j}>{Math.round(Math.random())}</div>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
