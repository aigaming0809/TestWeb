export const duelists = [
  {
    id: 1,
    name: "KAIZO VANTABLACK",
    title: "The Circuit Breaker",
    rank: "S-Class Duelist",
    winRate: 94,
    image: "/images/duelist-1.png",
    signatureCard: "Cyber Dragon Prime",
    bio: "A rogue netrunner-turned-duelist who hacks the arena's holo-grid mid-duel, bending probability fields to summon his mechanical dragons ahead of schedule.",
    element: "Cyber / Machine",
    color: "#00e5ff",
  },
  {
    id: 2,
    name: "LUNA NEONSTRIKE",
    title: "Phantom of the Grid",
    rank: "S-Class Duelist",
    winRate: 91,
    image: "/images/duelist-2.jpg",
    signatureCard: "Magenta Phoenix Array",
    bio: "Former champion of the underground duel circuits, Luna wields plasma-forged phoenixes that resurrect from ashes of data, punishing overconfident opponents.",
    element: "Plasma / Phoenix",
    color: "#ff2a6d",
  },
  {
    id: 3,
    name: "DRAKON ZERO",
    title: "The Dragon Tamer",
    rank: "A-Class Duelist",
    winRate: 88,
    image: "/images/duelist-3.jpg",
    signatureCard: "Wyrm of the Neon Abyss",
    bio: "Raised in the lower sectors of the cyber-metropolis, Drakon bonded with a rogue AI dragon construct, forming an unbreakable duel-link bond.",
    element: "Dragon / Cyber",
    color: "#00f5d4",
  },
  {
    id: 4,
    name: "MORGRAVE VOID",
    title: "Archon of Shadows",
    rank: "S-Class Duelist",
    winRate: 96,
    image: "/images/duelist-4.jpg",
    signatureCard: "Sovereign of the Null Sigil",
    bio: "A dark sorcerer duelist who manipulates corrupted data-magic, warping the duel field itself into a void of shifting shadows and forbidden spell circuits.",
    element: "Dark / Spellcaster",
    color: "#7b2dff",
  },
];

export type Rarity = "Common" | "Rare" | "Super Rare" | "Ultra Rare" | "Secret Rare";

export const rarityColor: Record<Rarity, string> = {
  Common: "#8aa0b8",
  Rare: "#00e5ff",
  "Super Rare": "#00f5d4",
  "Ultra Rare": "#7b2dff",
  "Secret Rare": "#ff2a6d",
};

export const cards = [
  {
    id: 1,
    name: "Cyber Dragon Prime",
    type: "Machine / Effect",
    atk: 3200,
    def: 2600,
    rarity: "Secret Rare" as Rarity,
    image: "/images/card-dragon.jpg",
    desc: "Overloads the grid with plasma breath, deleting all opposing holograms within range.",
  },
  {
    id: 2,
    name: "Magenta Phoenix Array",
    type: "Pyro / Effect",
    atk: 2800,
    def: 2100,
    rarity: "Ultra Rare" as Rarity,
    image: "/images/card-phoenix.jpg",
    desc: "Reboots from the ashcloud of destroyed data, returning to the field once per duel cycle.",
  },
  {
    id: 3,
    name: "Neon Circuit Sorceress",
    type: "Spellcaster / Effect",
    atk: 2400,
    def: 2000,
    rarity: "Super Rare" as Rarity,
    image: "/images/card-sorceress.jpg",
    desc: "Weaves holographic sigils that corrupt the opponent's spell/trap zone.",
  },
  {
    id: 4,
    name: "Mecha Knight Ascendant",
    type: "Warrior / Fusion",
    atk: 3000,
    def: 2500,
    rarity: "Rare" as Rarity,
    image: "/images/card-knight.jpg",
    desc: "A fusion of two mechanized warriors, wielding an overclocked plasma blade.",
  },
  {
    id: 5,
    name: "Cyber Dragon Prime",
    type: "Machine / Effect",
    atk: 3200,
    def: 2600,
    rarity: "Ultra Rare" as Rarity,
    image: "/images/card-dragon.jpg",
    desc: "A recompiled variant with amplified plasma breath output.",
  },
  {
    id: 6,
    name: "Ashfall Phoenix Node",
    type: "Pyro / Normal",
    atk: 2200,
    def: 1800,
    rarity: "Common" as Rarity,
    image: "/images/card-phoenix.jpg",
    desc: "A lesser node of the Phoenix Array network, self-repairing over time.",
  },
  {
    id: 7,
    name: "Void Circuit Enchantress",
    type: "Spellcaster / Effect",
    atk: 2600,
    def: 2200,
    rarity: "Secret Rare" as Rarity,
    image: "/images/card-sorceress.jpg",
    desc: "Channels forbidden data-magic banned from the official duel network.",
  },
  {
    id: 8,
    name: "Knight of the Broken Grid",
    type: "Warrior / Effect",
    atk: 2700,
    def: 2300,
    rarity: "Rare" as Rarity,
    image: "/images/card-knight.jpg",
    desc: "Forged from salvaged mech parts found in the lower sectors.",
  },
];

export const leaderboard = [
  { rank: 1, name: "MORGRAVE VOID", winRate: 96, deck: "Shadow Circuit", image: "/images/duelist-4.jpg", medal: "🏆" },
  { rank: 2, name: "KAIZO VANTABLACK", winRate: 94, deck: "Cyber Machine", image: "/images/duelist-1.jpg", medal: "🥈" },
  { rank: 3, name: "LUNA NEONSTRIKE", winRate: 91, deck: "Plasma Phoenix", image: "/images/duelist-2.jpg", medal: "🥉" },
  { rank: 4, name: "DRAKON ZERO", winRate: 88, deck: "Neon Dragon", image: "/images/duelist-3.jpg", medal: "⭐" },
  { rank: 5, name: "NULLBYTE RAZE", winRate: 85, deck: "Void Spellcaster", image: "/images/duelist-4.jpg", medal: "⭐" },
];

export const news = [
  {
    id: 1,
    tag: "TOURNAMENT",
    title: "The Neon Colosseum Championship Kicks Off Season 7",
    excerpt: "Top-ranked duelists across the grid converge for the biggest cyber tournament of the year, with a prize pool of 2M credits.",
    image: "/images/hero-bg.jpg",
    date: "12.04.2099",
  },
  {
    id: 2,
    tag: "UPDATE",
    title: "Patch 4.7 Introduces Fusion Overclock Mechanics",
    excerpt: "New overclock system lets duelists fuse monsters mid-battle for devastating combo chains.",
    image: "/images/card-dragon.jpg",
    date: "10.28.2099",
  },
  {
    id: 3,
    tag: "LORE",
    title: "Who Is Morgrave Void? The Archon of Shadows Explained",
    excerpt: "A deep dive into the mysterious S-Class duelist dominating the leaderboard this cycle.",
    image: "/images/duelist-4.jpg",
    date: "10.15.2099",
  },
  {
    id: 4,
    tag: "COMMUNITY",
    title: "Deck Builder Spotlight: Top 5 Community Cyber-Decks",
    excerpt: "We break down the community's most devastating deck archetypes climbing the ranked ladder.",
    image: "/images/card-sorceress.jpg",
    date: "10.02.2099",
  },
];

export const navItems = [
  "Home",
  "Cards",
  "Characters",
  "Patch Notes",
  "Community",
  "Downloads",
];

export const patchNotes = [
  {
    id: 1,
    version: "v4.7.2",
    date: "12.04.2099",
    tag: "MAJOR UPDATE",
    title: "Overclock Fusion System",
    image: "/images/card-dragon.jpg",
    color: "#00e5ff",
    summary:
      "Introducing the all-new Fusion Overclock mechanic — fuse monsters mid-battle for devastating combo chains. Plus a brand new arena and balance tuning.",
    highlights: [
      {
        category: "NEW FEATURES",
        icon: "✦",
        items: [
          "Added Fusion Overclock mechanic for mid-battle monster fusion",
          "New playable duelist: MORGRAVE VOID — The Archon of Shadows",
          "Neon Colosseum arena now available in ranked rotation",
          "Holographic shimmer upgraded for Secret Rare cards",
        ],
      },
      {
        category: "BALANCE",
        icon: "⚖",
        items: [
          "Cyber Dragon Prime ATK reduced 3200 → 3050",
          "Magenta Phoenix Array respawn cooldown increased to 2 cycles",
          "Void Sigil effect no longer stacks beyond 3 links",
        ],
      },
      {
        category: "BUG FIXES",
        icon: "✔",
        items: [
          "Fixed holographic shimmer glitch on low-end devices",
          "Resolved disconnect issue occurring on turn 9",
          "Fixed ranked point calculation on ranked surrender",
        ],
      },
    ],
  },
  {
    id: 2,
    version: "v4.6.0",
    date: "10.28.2099",
    tag: "PATCH",
    title: "Cyber Grid Expansion",
    image: "/images/card-phoenix.jpg",
    color: "#ff2a6d",
    summary:
      "Expanded the card database with 40 new cards and introduced the Plasma Phoenix archetype to the meta.",
    highlights: [
      {
        category: "NEW FEATURES",
        icon: "✦",
        items: [
          "Added 40 new cards including the Plasma Phoenix archetype",
          "Deck Builder neural analysis engine updated",
          "New community tournament system beta",
        ],
      },
      {
        category: "BALANCE",
        icon: "⚖",
        items: [
          "Mecha Knight Ascendant DEF increased 2500 → 2700",
          "Reduced energy cost for DEFENSE MODE activation",
        ],
      },
      {
        category: "BUG FIXES",
        icon: "✔",
        items: [
          "Fixed visual glitch when summoning during lightning phase",
          "Corrected leaderboard medal display order",
        ],
      },
    ],
  },
  {
    id: 3,
    version: "v4.5.1",
    date: "09.15.2099",
    tag: "HOTFIX",
    title: "Arena Stability Patch",
    image: "/images/card-knight.jpg",
    color: "#00f5d4",
    summary:
      "Critical stability fixes addressing server-side duel crashes and connection drops during ranked matches.",
    highlights: [
      {
        category: "BUG FIXES",
        icon: "✔",
        items: [
          "Resolved critical server crash during ranked matchmaking",
          "Fixed connection drop when entering Duel Arena",
          "Addressed memory leak in holographic rendering",
        ],
      },
      {
        category: "PERFORMANCE",
        icon: "⚡",
        items: [
          "Reduced arena load time by 35%",
          "Optimized particle system for smoother 60fps on mobile",
        ],
      },
    ],
  },
];
