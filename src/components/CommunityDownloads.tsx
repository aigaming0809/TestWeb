import { motion } from "framer-motion";

const platforms = [
  { name: "PC", icon: "🖥️", size: "400MB+", version: "V1.0 BETA", link: "https://drive.google.com/file/d/1fAoHZHYlrXjb_814l2BwhkhFVLPWRi4H/view?usp=sharing" },
  { name: "MOBILE", icon: "📱", size: "400MB+", version: "V1.0 BETA", link: "https://drive.google.com/file/d/1wBIShdDLHwvzv_fwkEqSqVASAwcHbRsF/view?usp=sharing" },
];

const specs = [
  { label: "MINIMUM", color: "#8aa0b8", specs: ["OS: Windows 10 64-bit", "RAM: 4 GB", "GPU: Intel HD 620 / equivalent", "Storage: 500 MB"] },
  { label: "RECOMMENDED", color: "#00e5ff", specs: ["OS: Windows 11 64-bit", "RAM: 8 GB", "GPU: GTX 1050 / equivalent", "Storage: 1 GB SSD"] },
];

const community = [
  { name: "Discord Server", members: "1.2K", icon: "💬", color: "#7b2dff", link: "https://discord.gg/mDnMNaXXA" },
  { name: "WhatsApp Group", members: "500", icon: "📱", color: "#00e5ff", link: "https://chat.whatsapp.com/your-group-invite" },
];

export default function CommunityDownloads() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ambient blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(123,45,255,0.15)_0%,_transparent_60%)]" />

      {/* ============ COMMUNITY SECTION ============ */}
      <section id="community" className="relative py-28">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
          <div className="mb-14 text-center">
            <p className="font-mono-cyber mb-3 text-xs tracking-[0.4em] text-cyan-400">// JOIN THE NETWORK</p>
            <h2 className="section-heading text-3xl font-black uppercase text-white sm:text-5xl">
              The <span className="gradient-text">Community</span>
            </h2>
            <div className="divider-glow mx-auto mt-6 w-40" />
          </div>

          <div className="mx-auto grid max-w-xl grid-cols-1 gap-6 sm:grid-cols-2">
            {community.map((c, i) => (
              <motion.a
                key={c.name}
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-panel clip-notch group relative block overflow-hidden p-6 text-center no-underline transition-transform hover:-translate-y-1"
              >
                <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40" style={{ background: c.color }} />
                <div className="mb-3 text-4xl transition-transform group-hover:scale-110">{c.icon}</div>
                <h3 className="font-display text-sm font-bold text-white">{c.name}</h3>
                <p className="font-mono-cyber mt-1 text-xs" style={{ color: c.color }}>
                  {c.members} MEMBERS
                </p>
                <p className="font-mono-cyber mt-2 text-[10px] text-slate-500 transition-colors group-hover:text-slate-300">
                  CLICK TO JOIN →
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DOWNLOADS SECTION ============ */}
      <section id="downloads" className="relative overflow-hidden py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(0,229,255,0.12)_0%,_transparent_60%)]" />
        <div className="cyber-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

        <div className="mx-auto max-w-[1200px] px-6 text-center lg:px-10">
          <div className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono-cyber text-[11px] tracking-[0.3em] text-cyan-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_8px_#00e5ff]" />
            LATEST BUILD: V1.0 BETA — READY TO DEPLOY
          </div>
          <p className="font-mono-cyber mb-3 text-xs tracking-[0.4em]" style={{ color: "#ff2a6d" }}>
            // GET CONNECTED
          </p>
          <h2 className="section-heading text-3xl font-black uppercase text-white sm:text-5xl">
            Download the <span className="gradient-text">Experience</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-slate-400">
            Enter the digital duel dimension. Free to download. Cross-platform progression. Install now and step into the grid.
          </p>
          <div className="divider-glow mx-auto mt-6 w-40" />

          {/* big primary CTA — fixed: added missing <a> opening tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-panel clip-notch mx-auto mt-12 flex max-w-2xl flex-col items-center gap-4 p-8 md:flex-row md:justify-between md:text-left"
          >
            <div>
              <h3 className="font-display text-xl font-black text-white">ETERNAL ECHOES // V1.0 BETA</h3>
              <p className="mt-1 font-mono-cyber text-xs text-slate-400">FREE TO PLAY • CROSS-PLATFORM • 400MB+</p>
            </div>
            <a
              href={platforms[0].link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cyber clip-notch box-glow-blue inline-flex items-center justify-center border border-cyan-400 bg-gradient-to-r from-cyan-500/30 to-cyan-400/10 px-10 py-4 font-display text-sm font-bold tracking-[0.15em] text-cyan-200 no-underline hover:scale-105"
            >
              ⚡ DOWNLOAD NOW
            </a>
          </motion.div>

          {/* platform grid */}
          <div className="mx-auto mt-10 grid max-w-xl grid-cols-1 gap-6 sm:grid-cols-2">
            {platforms.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="btn-cyber clip-notch glass group relative flex flex-col items-center gap-2 border border-cyan-400/20 p-6 no-underline transition-all hover:border-cyan-400/70 hover:box-glow-blue"
              >
                <span className="text-4xl transition-transform group-hover:scale-110">{p.icon}</span>
                <span className="font-display text-sm font-bold text-white">{p.name}</span>
                <span className="font-mono-cyber text-[10px] text-cyan-400">{p.version}</span>
                <span className="font-mono-cyber text-[10px] text-slate-500">{p.size}</span>
                <span className="font-mono-cyber mt-1 text-[10px] text-slate-400 opacity-0 transition-opacity group-hover:opacity-100">
                  GET IT NOW →
                </span>
              </motion.a>
            ))}
          </div>

          {/* system requirements */}
          <div className="mt-12 grid grid-cols-1 gap-6 text-left md:grid-cols-2">
            {specs.map((s) => (
              <div key={s.label} className="glass-panel clip-notch p-6">
                <div className="mb-4 flex items-center gap-2">
                  <span className="font-display text-sm font-bold" style={{ color: s.color }}>
                    {s.label}
                  </span>
                  <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${s.color}55, transparent)` }} />
                </div>
                <ul className="flex flex-col gap-2">
                  {s.specs.map((spec) => (
                    <li key={spec} className="font-mono-cyber flex items-center gap-2 text-xs text-slate-300">
                      <span className="text-cyan-400">▸</span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
