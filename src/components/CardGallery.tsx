import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cards, rarityColor, type Rarity } from "../data/content";

const rarities: (Rarity | "All")[] = ["All", "Common", "Rare", "Super Rare", "Ultra Rare", "Secret Rare"];

function GalleryCard({ card, onSelect }: { card: (typeof cards)[number]; onSelect: () => void }) {
  const [flipped, setFlipped] = useState(false);
  const color = rarityColor[card.rarity];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.35 }}
      className="perspective-1000 group relative"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      {/* particle glow on hover */}
      <div
        className="absolute -inset-3 -z-10 rounded-2xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: `radial-gradient(circle, ${color}66, transparent 70%)` }}
      />
      <div
        className="relative h-72 w-full cursor-pointer rounded-lg transition-transform duration-500"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        onClick={onSelect}
      >
        {/* front */}
        <div
          className="absolute inset-0 overflow-hidden rounded-lg border"
          style={{ backfaceVisibility: "hidden", borderColor: `${color}80`, boxShadow: `0 0 18px ${color}40` }}
        >
          <img src={card.image} alt={card.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
          <div className="animate-shimmer absolute inset-0 opacity-30" style={{ backgroundImage: `linear-gradient(120deg, transparent 30%, ${color}55 50%, transparent 70%)` }} />
          <div className="absolute left-2 top-2 rounded px-2 py-0.5 font-mono-cyber text-[9px] tracking-widest" style={{ background: `${color}22`, color, border: `1px solid ${color}66` }}>
            {card.rarity}
          </div>
          <div className="absolute inset-x-0 bottom-0 p-3">
            <h4 className="font-display text-sm font-bold text-white">{card.name}</h4>
            <p className="text-[11px] text-slate-400">{card.type}</p>
          </div>
        </div>

        {/* back */}
        <div
          className="glass-panel absolute inset-0 flex flex-col justify-between rounded-lg border p-4"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", borderColor: `${color}80` }}
        >
          <div>
            <div className="font-mono-cyber mb-2 text-[9px] tracking-widest" style={{ color }}>{card.rarity}</div>
            <h4 className="font-display text-sm font-bold text-white">{card.name}</h4>
            <p className="mt-2 text-[11px] leading-relaxed text-slate-300">{card.desc}</p>
          </div>
          <div className="flex items-center justify-between font-mono-cyber text-xs">
            <span className="text-cyan-300">ATK {card.atk}</span>
            <span className="text-[#ff2a6d]">DEF {card.def}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CardGallery() {
  const [filter, setFilter] = useState<Rarity | "All">("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<(typeof cards)[number] | null>(null);

  const filtered = useMemo(() => {
    return cards.filter((c) => {
      const matchesRarity = filter === "All" || c.rarity === filter;
      const matchesQuery = c.name.toLowerCase().includes(query.toLowerCase());
      return matchesRarity && matchesQuery;
    });
  }, [filter, query]);

  return (
    <section id="cards" className="relative py-28">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
        <div className="mb-12 text-center">
          <p className="font-mono-cyber mb-3 text-xs tracking-[0.4em] text-purple-400">// CARD DATABASE</p>
          <h2 className="section-heading text-3xl font-black uppercase text-white sm:text-5xl">
            Digital <span className="gradient-text">Card Gallery</span>
          </h2>
          <div className="divider-glow mx-auto mt-6 w-40" />
        </div>

        {/* controls */}
        <div className="glass mb-10 flex flex-col items-center justify-between gap-4 rounded-xl p-4 md:flex-row">
          <div className="relative w-full md:w-80">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH CARD DATABASE..."
              className="font-mono-cyber w-full rounded-md border border-cyan-400/30 bg-black/40 px-4 py-2 text-xs tracking-widest text-cyan-200 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400">⌕</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {rarities.map((r) => (
              <button
                key={r}
                onClick={() => setFilter(r)}
                className={`clip-notch rounded px-3 py-1.5 font-mono-cyber text-[10px] tracking-widest transition-all ${
                  filter === r
                    ? "border border-cyan-400 bg-cyan-400/10 text-cyan-300 box-glow-blue"
                    : "border border-white/10 text-slate-400 hover:border-white/30 hover:text-white"
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((card) => (
              <GalleryCard key={card.id} card={card} onSelect={() => setSelected(card)} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="py-16 text-center font-mono-cyber text-sm tracking-widest text-slate-500">
            NO CARD DATA FOUND // ADJUST QUERY
          </div>
        )}
      </div>

      {/* expanded card modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotateY: -30 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel relative flex w-full max-w-3xl flex-col overflow-hidden rounded-xl border md:flex-row"
              style={{ borderColor: `${rarityColor[selected.rarity]}80`, boxShadow: `0 0 60px ${rarityColor[selected.rarity]}55` }}
            >
              <img src={selected.image} className="h-64 w-full object-cover md:h-auto md:w-1/2" />
              <div className="flex flex-1 flex-col justify-center p-8">
                <div className="font-mono-cyber mb-2 text-xs tracking-widest" style={{ color: rarityColor[selected.rarity] }}>
                  {selected.rarity} // {selected.type}
                </div>
                <h3 className="font-display text-2xl font-black text-white">{selected.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">{selected.desc}</p>
                <div className="mt-6 flex gap-8 font-mono-cyber text-sm">
                  <div>
                    <div className="text-slate-500">ATK</div>
                    <div className="text-cyan-300">{selected.atk}</div>
                  </div>
                  <div>
                    <div className="text-slate-500">DEF</div>
                    <div className="text-[#ff2a6d]">{selected.def}</div>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="btn-cyber clip-notch mt-8 self-start border border-cyan-400/60 px-6 py-2 font-display text-xs tracking-widest text-cyan-300"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
