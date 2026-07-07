import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { patchNotes } from "../data/content";

export default function PatchNotes() {
  const [openId, setOpenId] = useState<number | null>(patchNotes[0]?.id ?? null);

  return (
    <section id="patch-notes" className="relative py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(0,229,255,0.08)_0%,_transparent_60%)]" />
      <div className="mx-auto max-w-[900px] px-6 lg:px-10">
        <div className="mb-14 text-center">
          <p className="font-mono-cyber mb-3 text-xs tracking-[0.4em] text-cyan-400">// SYSTEM UPDATES</p>
          <h2 className="section-heading text-3xl font-black uppercase text-white sm:text-5xl">
            Patch <span className="gradient-text">Notes</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-slate-400">
            Stay synced with the grid. Track every balance change, new feature, and bug fix shipped to the duel network.
          </p>
          <div className="divider-glow mx-auto mt-6 w-40" />
        </div>

        <div className="relative flex flex-col gap-6">
          {/* timeline line */}
          <div className="absolute bottom-0 left-5 top-0 w-[2px] bg-gradient-to-b from-cyan-400/60 via-purple-500/40 to-transparent sm:left-6" />

          {patchNotes.map((note, i) => {
            const open = openId === note.id;
            return (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative pl-14 sm:pl-16"
              >
                {/* timeline node */}
                <div
                  className="absolute left-0 top-5 flex h-11 w-11 items-center justify-center rounded-full border-2 bg-[#050505] sm:h-12 sm:w-12"
                  style={{ borderColor: note.color, boxShadow: `0 0 16px ${note.color}66` }}
                >
                  <span className="font-display text-[10px] font-black" style={{ color: note.color }}>
                    {note.version.replace("v", "")}
                  </span>
                </div>

                <div
                  className="glass-panel clip-notch overflow-hidden rounded-xl transition-all duration-300"
                  style={{ borderColor: open ? `${note.color}80` : "rgba(255,255,255,0.08)" }}
                >
                  {/* header */}
                  <button
                    onClick={() => setOpenId(open ? null : note.id)}
                    className="flex w-full items-center gap-5 p-5 text-left"
                  >
                    <div className="relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-lg border" style={{ borderColor: `${note.color}40` }}>
                      <img src={note.image} alt={note.title} className="h-full w-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/70 to-transparent" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span
                          className="rounded px-2 py-0.5 font-mono-cyber text-[9px] tracking-widest"
                          style={{ background: `${note.color}22`, color: note.color, border: `1px solid ${note.color}66` }}
                        >
                          {note.tag}
                        </span>
                        <span className="font-mono-cyber text-[10px] text-slate-500">{note.date}</span>
                      </div>
                      <h3 className="font-display text-base font-bold text-white sm:text-lg">
                        <span style={{ color: note.color }}>{note.version}</span> — {note.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs text-slate-400">{note.summary}</p>
                    </div>

                    {/* expand chevron */}
                    <div
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border text-cyan-300 transition-transform duration-300"
                      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", borderColor: `${note.color}55` }}
                    >
                      ▾
                    </div>
                  </button>

                  {/* expandable detail */}
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/5 p-5">
                          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {note.highlights.map((group) => (
                              <div key={group.category}>
                                <div className="mb-3 flex items-center gap-2 font-mono-cyber text-[10px] tracking-[0.2em]" style={{ color: note.color }}>
                                  <span>{group.icon}</span>
                                  {group.category}
                                </div>
                                <ul className="flex flex-col gap-2">
                                  {group.items.map((item, idx) => (
                                    <li key={idx} className="flex gap-2 text-xs leading-relaxed text-slate-300">
                                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full" style={{ background: note.color }} />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>

                          <div className="mt-5 flex flex-wrap items-center gap-3">
                            <a
                              href="#downloads"
                              onClick={(e) => {
                                e.preventDefault();
                                document.getElementById("downloads")?.scrollIntoView({ behavior: "smooth" });
                              }}
                              className="btn-cyber clip-notch border px-5 py-2 font-display text-[11px] font-bold tracking-widest"
                              style={{ borderColor: `${note.color}80`, color: note.color, background: `${note.color}11` }}
                            >
                              DOWNLOAD {note.version}
                            </a>
                            <span className="font-mono-cyber text-[10px] text-slate-500">FULL CHANGELOG →</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
