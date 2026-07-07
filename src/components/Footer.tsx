const socials = [
  { name: "Discord", icon: "💬" },
  { name: "Whatsapp", icon: "🟢" },
];

const columns = [
  {
    title: "GAME",
    links: ["Cards", "Characters", "Patch Notes", "Download"],
  },
  {
    title: "COMMUNITY",
    links: ["Forums", "Discord", "Fan Art"],
  },
  {
    title: "SUPPORT",
    links: ["Whatsapp"],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 pt-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,_rgba(0,229,255,0.08)_0%,_transparent_60%)]" />
      <div className="cyber-grid pointer-events-none absolute inset-0 -z-10 opacity-10 [mask-image:linear-gradient(to_top,black,transparent)]" />

      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
        <div className="divider-glow mb-14" />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="font-display text-2xl font-black tracking-[0.2em] text-white">
              ETERNAL <span style={{ color: "#ff2a6d" }} className="text-glow-magenta">ECHOES</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Eternal Echoes Community — a next-generation cyberpunk dueling network. Enter the grid, forge your
              legend, and dominate the digital duel dimension.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <button
                  key={s.name}
                  title={s.name}
                  className="glass flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/20 text-sm text-cyan-300 transition-all hover:scale-110 hover:border-cyan-400 hover:box-glow-blue"
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono-cyber mb-4 text-xs tracking-[0.25em] text-cyan-400">{col.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-slate-400 transition-colors hover:text-cyan-300">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 py-8 text-center font-mono-cyber text-[11px] text-slate-500 md:flex-row">
          <span>© 2099 ETERNAL ECHOES COMMUNITY. ALL DATA RIGHTS RESERVED.</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
            GRID STATUS: OPERATIONAL
          </span>
        </div>
      </div>
    </footer>
  );
}
