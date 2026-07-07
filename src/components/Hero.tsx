import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24">
      {/* background image */}
      <div className="absolute inset-0 -z-10">
        <img src="/images/hero-bg.jpg" alt="Cyberpunk duel arena skyline" className="h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/60 to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/80" />
      </div>

      {/* holographic dragon */}
      <motion.img
        src="/images/dragon-hologram.png"
        alt="Holographic dragon"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.55, scale: 1 }}
        transition={{ duration: 2 }}
        className="animate-float-slow pointer-events-none absolute right-[-5%] top-1/2 -z-[5] w-[55%] max-w-[800px] -translate-y-1/2 mix-blend-screen md:right-[0%]"
      />

      {/* energy beams */}
      <div className="pointer-events-none absolute inset-0 -z-[4] overflow-hidden">
        <div className="absolute left-1/4 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent" />
        <div className="absolute left-2/4 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-purple-400/30 to-transparent" />
        <div className="absolute left-3/4 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-magenta-400/30 to-transparent" style={{ background: "linear-gradient(to bottom, transparent, #ff2a6d55, transparent)" }} />
      </div>

      {/* floating cards */}
      <motion.div
        className="pointer-events-none absolute left-[6%] top-[22%] hidden w-40 rotate-[-12deg] lg:block"
        animate={{ y: [0, -22, 0], rotate: [-12, -8, -12] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="clip-notch overflow-hidden rounded-lg border border-cyan-400/50 box-glow-blue">
          <img src="/images/yami_marik.png" className="h-56 w-full object-cover opacity-90" />
        </div>
      </motion.div>
      <motion.div
        className="pointer-events-none absolute bottom-[18%] left-[16%] hidden w-32 rotate-[8deg] lg:block"
        animate={{ y: [0, -16, 0], rotate: [8, 12, 8] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      >
        <div className="clip-notch overflow-hidden rounded-lg border box-glow-magenta" style={{ borderColor: "#ff2a6d80" }}>
          <img src="/images/yami_yugi.png" className="h-44 w-full object-cover opacity-90" />
        </div>
      </motion.div>

      {/* content */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass mb-6 flex items-center gap-2 rounded-full px-4 py-1.5 font-mono-cyber text-[11px] tracking-[0.3em] text-cyan-300"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_8px_#00e5ff]" />
          Now Launch Version v 1.0 BETA
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="font-display text-4xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          Enter the{" "}
          <span className="gradient-text text-glow-blue">Digital Duel</span>
          <br /> Dimension
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 max-w-2xl text-base font-light tracking-wide text-slate-300 sm:text-lg"
        >
          Challenge legendary duelists, collect powerful cards, and dominate the cyber arena
          in a next-generation holographic dueling network.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo("downloads")}
            className="btn-cyber clip-notch box-glow-blue relative border border-cyan-400 bg-gradient-to-r from-cyan-500/20 to-cyan-400/10 px-8 py-3.5 font-display text-sm font-bold tracking-[0.15em] text-cyan-200 hover:scale-105"
          >
            ⚡ DOWNLOAD NOW
          </button>
          <button
            onClick={() => navigate("/cards")}
            className="btn-cyber clip-notch relative border border-purple-400/70 bg-purple-400/5 px-8 py-3.5 font-display text-sm font-bold tracking-[0.15em] text-purple-200 box-glow-purple hover:scale-105"
          >
            CARD DATABASE
          </button>
          <button
            onClick={() => scrollTo("patch-notes")}
            className="btn-cyber clip-notch relative border bg-[#ff2a6d0d] px-8 py-3.5 font-display text-sm font-bold tracking-[0.15em] text-[#ff9dbc] box-glow-magenta hover:scale-105"
            style={{ borderColor: "#ff2a6db3" }}
          >
            PATCH NOTES
          </button>
          <button
            onClick={() => scrollTo("characters")}
            className="btn-cyber clip-notch relative border border-slate-500/60 bg-white/5 px-8 py-3.5 font-display text-sm font-bold tracking-[0.15em] text-slate-200 hover:scale-105"
          >
            CHARACTERS
          </button>
        </motion.div>
      </div>
    </section>
  );
}
