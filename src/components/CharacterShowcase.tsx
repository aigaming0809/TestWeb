import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { duelists } from "../data/content";

function DuelistCard({ d, index }: { d: (typeof duelists)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -14, y: px * 14 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="perspective-1000"
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setTilt({ x: 0, y: 0 });
        }}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.04 : 1})`,
          transformStyle: "preserve-3d",
        }}
        className="group relative h-[420px] w-full overflow-hidden rounded-xl border border-white/10 transition-transform duration-200 ease-out"
      >
        {/* energy aura */}
        <div
          className="absolute -inset-1 rounded-xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70"
          style={{ background: `radial-gradient(circle at 50% 30%, ${d.color}55, transparent 70%)` }}
        />

        <img src={d.image} alt={d.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="scanlines absolute inset-0" />

        {/* holographic border */}
        <div className="border-flow pointer-events-none absolute inset-0 rounded-xl p-[1px] opacity-60 [mask-composite:exclude] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]" />

        {/* base info */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="font-mono-cyber mb-1 flex items-center gap-2 text-[10px] tracking-[0.2em]" style={{ color: d.color }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: d.color, boxShadow: `0 0 8px ${d.color}` }} />
            {d.rank}
          </div>
          <h3 className="font-display text-xl font-bold tracking-wide text-white">{d.name}</h3>
          <p className="text-sm text-slate-400">{d.title}</p>
        </div>

        {/* hover reveal panel */}
        <div className="glass-panel absolute inset-0 flex translate-y-full flex-col justify-end p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="font-mono-cyber mb-2 text-[10px] tracking-[0.2em]" style={{ color: d.color }}>
            {d.element}
          </div>
          <h3 className="font-display text-lg font-bold text-white">{d.name}</h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-300">{d.bio}</p>

          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-slate-400">Signature Card</span>
            <span style={{ color: d.color }} className="font-semibold">{d.signatureCard}</span>
          </div>

          <div className="mt-2">
            <div className="mb-1 flex justify-between text-[10px] text-slate-400">
              <span>WIN RATE</span>
              <span style={{ color: d.color }}>{d.winRate}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${d.winRate}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${d.color}, #fff)`, boxShadow: `0 0 10px ${d.color}` }}
              />
            </div>
          </div>
        </div>

        {/* corner accents */}
        <div className="absolute left-2 top-2 h-4 w-4 border-l-2 border-t-2" style={{ borderColor: d.color }} />
        <div className="absolute right-2 top-2 h-4 w-4 border-r-2 border-t-2" style={{ borderColor: d.color }} />
        <div className="absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2" style={{ borderColor: d.color }} />
        <div className="absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2" style={{ borderColor: d.color }} />
      </div>
    </motion.div>
  );
}

export default function CharacterShowcase() {
  return (
    <section id="characters" className="relative py-28">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
        <div className="mb-14 text-center">
          <p className="font-mono-cyber mb-3 text-xs tracking-[0.4em] text-cyan-400">// LEGENDARY ROSTER</p>
          <h2 className="section-heading text-3xl font-black uppercase text-white sm:text-5xl">
            Iconic <span className="gradient-text">Duelists</span>
          </h2>
          <div className="divider-glow mx-auto mt-6 w-40" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {duelists.map((d, i) => (
            <DuelistCard key={d.id} d={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
