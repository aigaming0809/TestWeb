import { useEffect, useRef } from "react";

export default function CursorTrail() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let ringX = 0,
      ringY = 0;
    let mouseX = 0,
      mouseY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    let raf = 0;
    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      <div
        ref={dotRef}
        className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300"
        style={{ boxShadow: "0 0 8px #00e5ff, 0 0 16px #00e5ff" }}
      />
      <div
        ref={ringRef}
        className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/50"
        style={{ boxShadow: "0 0 12px #00e5ff33" }}
      />
    </div>
  );
}
