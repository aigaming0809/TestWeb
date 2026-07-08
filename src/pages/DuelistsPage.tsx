import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  DUELIST_DATABASE,
  DUELIST_CATEGORIES,
  DUELIST_FIELDS,
  DUELIST_SORT_OPTIONS,
  type Duelist,
  type DuelistCategory,
} from "../data/duelistDatabase";

const DROP_RARITY_COLOR: Record<string, string> = {
  common: "#8aa0b8",
  rare: "#00e5ff",
  ultra: "#7b2dff",
};

const FAVORITES_KEY = "ee-duelist-favorites";

function loadFavorites(): Set<number> {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return new Set(raw ? (JSON.parse(raw) as number[]) : []);
  } catch {
    return new Set();
  }
}

function saveFavorites(favs: Set<number>) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favs]));
  } catch {
    /* storage unavailable — ignore */
  }
}

function diffStars(n: number) {
  return "★".repeat(n);
}

function padId(n: number) {
  return String(n).padStart(3, "0");
}

function hideBrokenImage(e: React.SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.style.display = "none";
}

// ─────────────────────────────────────────────
// GRID CARD
// ─────────────────────────────────────────────
function DuelistCardTile({
  duelist,
  isFavorite,
  onToggleFavorite,
  onSelect,
}: {
  duelist: Duelist;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onSelect: () => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const info = DUELIST_CATEGORIES[duelist.category];
  const color = info.color;

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
      <div
        className="absolute -inset-3 -z-10 rounded-2xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: `radial-gradient(circle, ${color}66, transparent 70%)` }}
      />

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        className={`absolute right-2 top-2 z-20 flex h-7 w-7 items-center justify-center rounded-full border text-xs transition-all ${
          isFavorite
            ? "border-[#ff2a6d] bg-[#ff2a6d]/20 text-[#ff2a6d]"
            : "border-white/20 bg-black/40 text-white/50 hover:text-white"
        }`}
      >
        ♥
      </button>

      <div
        className="relative h-80 w-full cursor-pointer rounded-lg transition-transform duration-500"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        onClick={onSelect}
      >
        {/* front */}
        <div
          className="absolute inset-0 overflow-hidden rounded-lg border"
          style={{ backfaceVisibility: "hidden", borderColor: `${color}80`, boxShadow: `0 0 18px ${color}40` }}
        >
          <img src={duelist.image} alt={duelist.name} className="h-full w-full object-cover" onError={hideBrokenImage} />
          <div className="card-art-placeholder absolute inset-0 flex items-center justify-center text-5xl opacity-10">
            {info.icon}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
          <div
            className="absolute left-2 top-2 rounded px-2 py-0.5 font-mono-cyber text-[9px] tracking-widest"
            style={{ background: `${color}22`, color, border: `1px solid ${color}66` }}
          >
            {info.icon} {info.label.toUpperCase()}
          </div>
          <div className="absolute inset-x-0 bottom-0 p-4">
            <div className="mb-1 font-mono-cyber text-[10px]" style={{ color }}>
              {diffStars(duelist.difficulty)}
            </div>
            <h4 className="font-display text-base font-bold text-white">{duelist.name}</h4>
            <p className="text-xs text-slate-400">{duelist.title}</p>
          </div>
        </div>

        {/* back */}
        <div
          className="glass-panel absolute inset-0 flex flex-col justify-between rounded-lg border p-5"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", borderColor: `${color}80` }}
        >
          <div>
            <div className="font-mono-cyber mb-2 text-[9px] tracking-widest" style={{ color }}>
              {duelist.field.toUpperCase()} FIELD // #{padId(duelist.id)}
            </div>
            <h4 className="font-display text-base font-bold text-white">{duelist.name}</h4>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">{duelist.deckType}</p>
            <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
              <span className="text-slate-500">LOCATION </span>
              {duelist.location}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
              <span className="text-slate-500">WEAKNESS </span>
              {duelist.weakness}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between font-mono-cyber text-[11px]">
            <span className="text-slate-400">SIGNATURE</span>
            <span style={{ color }} className="font-semibold">
              {duelist.signatureCards[0]}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// PROFILE MODAL
// ─────────────────────────────────────────────
const TABS = [
  { id: "profile", label: "Profile" },
  { id: "deck", label: "Deck" },
  { id: "drops", label: "Drops" },
  { id: "farming", label: "Farming" },
] as const;
type TabId = (typeof TABS)[number]["id"];

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono-cyber text-[10px] tracking-widest text-slate-500">{label.toUpperCase()}</div>
      <div className="mt-1 text-sm text-white">{value}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 font-mono-cyber text-[10px] tracking-[0.2em] text-cyan-400">{title.toUpperCase()}</div>
      {children}
    </div>
  );
}

function ChipGrid({ items, highlight, color }: { items: string[]; highlight?: string[]; color: string }) {
  if (!items.length) return <p className="text-xs text-slate-500">— none logged —</p>;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => {
        const isSig = highlight?.includes(item);
        return (
          <span
            key={`${item}-${i}`}
            className="rounded px-2.5 py-1 font-mono-cyber text-[10px]"
            style={
              isSig
                ? { background: `${color}22`, color, border: `1px solid ${color}80` }
                : { background: "rgba(255,255,255,0.05)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.1)" }
            }
          >
            {item}
          </span>
        );
      })}
    </div>
  );
}

function DuelistModal({ duelist, onClose }: { duelist: Duelist; onClose: () => void }) {
  const [tab, setTab] = useState<TabId>("profile");
  const info = DUELIST_CATEGORIES[duelist.category];
  const color = info.color;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0, rotateY: -20 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-panel relative flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border"
        style={{ borderColor: `${color}80`, boxShadow: `0 0 60px ${color}40` }}
      >
        {/* hero */}
        <div className="relative flex flex-col gap-5 border-b border-white/5 p-6 sm:flex-row sm:items-end">
          <button
            onClick={onClose}
            className="btn-cyber clip-notch absolute right-4 top-4 z-10 border border-white/20 px-3 py-1 font-display text-[10px] tracking-widest text-slate-300"
          >
            CLOSE
          </button>

          <div
            className="relative h-40 w-32 flex-shrink-0 overflow-hidden rounded-lg border"
            style={{ borderColor: `${color}60` }}
          >
            <img src={duelist.image} alt={duelist.name} className="h-full w-full object-cover" onError={hideBrokenImage} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>

          <div className="min-w-0 flex-1 pr-16 sm:pr-0">
            <span
              className="inline-block rounded px-2 py-0.5 font-mono-cyber text-[9px] tracking-widest"
              style={{ background: `${color}22`, color, border: `1px solid ${color}66` }}
            >
              {info.icon} {info.label.toUpperCase()}
            </span>
            <h3 className="mt-2 font-display text-2xl font-black text-white">{duelist.name}</h3>
            <p className="text-sm text-slate-400">{duelist.title}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 font-mono-cyber text-[11px] sm:grid-cols-4">
              <div>
                <div className="text-slate-500">DIFFICULTY</div>
                <div style={{ color }}>{diffStars(duelist.difficulty)}</div>
              </div>
              <div>
                <div className="text-slate-500">FIELD</div>
                <div className="text-white">{duelist.field}</div>
              </div>
              <div>
                <div className="text-slate-500">GUARDIAN ★</div>
                <div className="text-white">{duelist.guardianStar.join(" / ")}</div>
              </div>
              <div>
                <div className="text-slate-500">ID</div>
                <div className="text-white">#{padId(duelist.id)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* tabs */}
        <div className="flex border-b border-white/5 font-mono-cyber text-[11px] tracking-widest">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="relative flex-1 px-3 py-3 text-slate-400 transition-colors"
              style={tab === t.id ? { color } : undefined}
            >
              {t.label.toUpperCase()}
              {tab === t.id && (
                <motion.div layoutId="duelist-tab-underline" className="absolute inset-x-0 bottom-0 h-[2px]" style={{ background: color }} />
              )}
            </button>
          ))}
        </div>

        {/* content */}
        <div className="flex-1 overflow-y-auto p-6">
          {tab === "profile" && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InfoItem label="Deck Type" value={duelist.deckType} />
                <InfoItem label="Location" value={duelist.location} />
                <InfoItem label="Signature Card" value={duelist.signatureCards[0] ?? "—"} />
                <InfoItem label="Weakness" value={duelist.weakness} />
              </div>
              <Section title="Lore">
                <p className="text-xs italic leading-relaxed text-slate-400">{duelist.lore}</p>
              </Section>
              <Section title="Description">
                <p className="text-xs leading-relaxed text-slate-300">{duelist.description}</p>
              </Section>
              <Section title="Signature Combo">
                <p className="text-xs leading-relaxed text-slate-300">{duelist.signatureCombo}</p>
              </Section>
              {duelist.quotes.length > 0 && (
                <Section title="Quotes">
                  <div className="flex flex-col gap-3">
                    {duelist.quotes.map((q, i) => (
                      <div key={i} className="border-l-2 pl-3" style={{ borderColor: `${color}80` }}>
                        <p className="text-xs italic text-slate-300">&ldquo;{q.text}&rdquo;</p>
                        <p className="mt-1 text-[10px] text-slate-500">— {q.context}</p>
                      </div>
                    ))}
                  </div>
                </Section>
              )}
              <Section title="Guardian Stars">
                <div className="flex gap-3">
                  {duelist.guardianStar.map((g) => (
                    <span
                      key={g}
                      className="rounded px-3 py-1.5 font-mono-cyber text-[10px]"
                      style={{ background: `${color}15`, color, border: `1px solid ${color}55` }}
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </Section>
            </div>
          )}

          {tab === "deck" && (
            <div className="flex flex-col gap-6">
              <Section title={`Deck List (${duelist.deckList.length} Cards)`}>
                <ChipGrid items={duelist.deckList} highlight={duelist.signatureCards} color={color} />
              </Section>
              <Section title="SA POW Targets">
                <ChipGrid items={duelist.saPow} highlight={duelist.saPow} color={color} />
              </Section>
              <Section title="SA TEC Targets">
                <ChipGrid items={duelist.saTec} color={color} />
              </Section>
              <Section title="Strong Cards">
                <ChipGrid items={duelist.strongCards} color={color} />
              </Section>
            </div>
          )}

          {tab === "drops" && (
            <Section title="Drop Table">
              <table className="w-full border-collapse text-left font-mono-cyber text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-500">
                    <th className="pb-2 font-normal">CARD</th>
                    <th className="pb-2 font-normal">DROP RATE</th>
                    <th className="pb-2 font-normal">RARITY</th>
                  </tr>
                </thead>
                <tbody>
                  {duelist.drops.map((d, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-2 text-slate-300">{d.card}</td>
                      <td className="py-2" style={{ color: DROP_RARITY_COLOR[d.rarity] }}>
                        {d.pct}
                      </td>
                      <td className="py-2 text-slate-500">{d.rarity.toUpperCase()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>
          )}

          {tab === "farming" && (
            <Section title="Farming Guide">
              <div className="flex flex-col gap-3">
                {duelist.farmingTips.map((tip, i) => (
                  <div key={i} className="flex gap-2 text-xs leading-relaxed text-slate-300">
                    <span style={{ color }}>▶</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
type CategoryFilter = "all" | DuelistCategory;

export default function DuelistsPage() {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [field, setField] = useState<string>("all");
  const [difficulty, setDifficulty] = useState<string>("all");
  const [sort, setSort] = useState<string>("id");
  const [query, setQuery] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(() => loadFavorites());
  const [selected, setSelected] = useState<Duelist | null>(null);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveFavorites(next);
      return next;
    });
  };

  const difficulties = useMemo(
    () => Array.from(new Set(DUELIST_DATABASE.map((d) => d.difficulty))).sort((a, b) => a - b),
    []
  );

  const filtered = useMemo(() => {
    let list = [...DUELIST_DATABASE];

    if (favoritesOnly) list = list.filter((d) => favorites.has(d.id));
    if (category !== "all") list = list.filter((d) => d.category === category);
    if (field !== "all") list = list.filter((d) => d.field === field);
    if (difficulty !== "all") list = list.filter((d) => d.difficulty === Number(difficulty));

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.title.toLowerCase().includes(q) ||
          d.deckType.toLowerCase().includes(q) ||
          d.field.toLowerCase().includes(q) ||
          d.deckList.some((c) => c.toLowerCase().includes(q)) ||
          d.drops.some((dr) => dr.card.toLowerCase().includes(q))
      );
    }

    const sorters: Record<string, (a: Duelist, b: Duelist) => number> = {
      id: (a, b) => a.id - b.id,
      name: (a, b) => a.name.localeCompare(b.name),
      "diff-asc": (a, b) => a.difficulty - b.difficulty,
      "diff-desc": (a, b) => b.difficulty - a.difficulty,
      category: (a, b) => a.category.localeCompare(b.category),
    };
    list.sort(sorters[sort] ?? sorters.id);
    return list;
  }, [category, field, difficulty, sort, query, favoritesOnly, favorites]);

  return (
    <div className="min-h-screen pt-28">
      {/* hero header */}
      <div className="relative overflow-hidden border-b border-white/5 py-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(0,229,255,0.15)_0%,_transparent_60%)]" />
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10 text-center">
          <Link to="/" className="font-mono-cyber mb-4 inline-block text-xs tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors">
            ← BACK TO HOME
          </Link>
          <p className="font-mono-cyber mb-3 text-xs tracking-[0.4em] text-cyan-400">// DUELIST ARCHIVES</p>
          <h1 className="section-heading text-4xl font-black uppercase text-white sm:text-6xl">
            Duelist <span className="gradient-text">Database</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-slate-400">
            {DUELIST_DATABASE.length} duelists catalogued across the grid. Search, filter, and study every deck,
            drop table, and farming route.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-6 lg:px-10 py-12">
        {/* controls */}
        <div className="glass mb-8 flex flex-col gap-4 rounded-xl p-4">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <div className="relative w-full md:w-80">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="SEARCH NAME, DECK, CARD..."
                className="font-mono-cyber w-full rounded-md border border-cyan-400/30 bg-black/40 px-4 py-2 text-xs tracking-widest text-cyan-200 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400">⌕</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <select
                value={field}
                onChange={(e) => setField(e.target.value)}
                className="font-mono-cyber rounded border border-white/10 bg-black/40 px-3 py-2 text-[10px] tracking-widest text-slate-300 focus:border-cyan-400 focus:outline-none"
              >
                <option value="all">ALL FIELDS</option>
                {DUELIST_FIELDS.map((f) => (
                  <option key={f} value={f}>
                    {f.toUpperCase()}
                  </option>
                ))}
              </select>

              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="font-mono-cyber rounded border border-white/10 bg-black/40 px-3 py-2 text-[10px] tracking-widest text-slate-300 focus:border-cyan-400 focus:outline-none"
              >
                <option value="all">ALL DIFFICULTY</option>
                {difficulties.map((d) => (
                  <option key={d} value={d}>
                    {"★".repeat(d)}
                  </option>
                ))}
              </select>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="font-mono-cyber rounded border border-white/10 bg-black/40 px-3 py-2 text-[10px] tracking-widest text-slate-300 focus:border-cyan-400 focus:outline-none"
              >
                {DUELIST_SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label.toUpperCase()}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setFavoritesOnly((v) => !v)}
                className={`clip-notch rounded px-3 py-2 font-mono-cyber text-[10px] tracking-widest transition-all ${
                  favoritesOnly
                    ? "border border-[#ff2a6d] bg-[#ff2a6d]/10 text-[#ff2a6d]"
                    : "border border-white/10 text-slate-400 hover:border-white/30 hover:text-white"
                }`}
              >
                ♥ FAVORITES
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setCategory("all")}
              className={`clip-notch rounded px-3 py-1.5 font-mono-cyber text-[10px] tracking-widest transition-all ${
                category === "all"
                  ? "border border-cyan-400 bg-cyan-400/10 text-cyan-300 box-glow-blue"
                  : "border border-white/10 text-slate-400 hover:border-white/30 hover:text-white"
              }`}
            >
              ALL
            </button>
            {(Object.keys(DUELIST_CATEGORIES) as DuelistCategory[]).map((key) => {
              const info = DUELIST_CATEGORIES[key];
              const active = category === key;
              return (
                <button
                  key={key}
                  onClick={() => setCategory(key)}
                  className="clip-notch rounded px-3 py-1.5 font-mono-cyber text-[10px] tracking-widest transition-all"
                  style={
                    active
                      ? { border: `1px solid ${info.color}`, background: `${info.color}1a`, color: info.color, boxShadow: `0 0 14px ${info.color}55` }
                      : { border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8" }
                  }
                >
                  {info.icon} {info.label.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-6 font-mono-cyber text-xs text-slate-500">
          SHOWING {filtered.length} OF {DUELIST_DATABASE.length} DUELISTS
        </div>

        <motion.div layout className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((d) => (
            <DuelistCardTile
              key={d.id}
              duelist={d}
              isFavorite={favorites.has(d.id)}
              onToggleFavorite={() => toggleFavorite(d.id)}
              onSelect={() => setSelected(d)}
            />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="py-20 text-center font-mono-cyber text-sm tracking-widest text-slate-500">
            NO DUELIST DATA FOUND // ADJUST QUERY
          </div>
        )}
      </div>

      <AnimatePresence>{selected && <DuelistModal duelist={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </div>
  );
}
