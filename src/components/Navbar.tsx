import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "../data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (item: string) => {
    setMenuOpen(false);
    const id = item.toLowerCase().replace(/\s+/g, "-");

    if (item === "Home") {
      if (location.pathname !== "/") {
        navigate("/");
      } else {
        document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate home first, then scroll to the requested section once it mounts
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "glass py-2 shadow-[0_0_30px_rgba(0,229,255,0.08)]" : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center">
            <div
              className="absolute inset-0 animate-spin-slow rounded-md border-2 border-cyan-400/60"
              style={{ clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)" }}
            />
            <span className="font-display text-lg font-black text-cyan-300 text-glow-blue">E</span>
          </div>
          <div className="font-display leading-none">
            <div className="text-lg font-bold tracking-[0.2em] text-white">
              ETERNAL <span className="text-glow-magenta text-[#ff2a6d]">ECHOES</span>
            </div>
            <div className="font-mono-cyber text-[9px] tracking-[0.3em] text-cyan-400/70">COMMUNITY</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => {
            const isCards = item === "Cards";

            if (isCards) {
              return (
                <Link
                  key={item}
                  to="/cards"
                  className="group relative px-3.5 py-2 font-display text-[11px] font-medium tracking-[0.12em] uppercase transition-colors duration-300 text-slate-300 hover:text-cyan-300"
                >
                  {item}
                  <span className="absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 w-0 group-hover:w-3/4 transition-all duration-300"
                    style={{ background: "linear-gradient(90deg,#00e5ff,#7b2dff,#ff2a6d)" }}
                  />
                </Link>
              );
            }

            return (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="group relative px-3.5 py-2 font-display text-[11px] font-medium tracking-[0.12em] uppercase transition-colors duration-300 text-slate-300 hover:text-cyan-300"
              >
                {item}
                <span className="absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 w-0 group-hover:w-3/4 transition-all duration-300"
                  style={{ background: "linear-gradient(90deg,#00e5ff,#7b2dff,#ff2a6d)" }}
                />
              </button>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <button
            onClick={() => handleNavClick("Downloads")}
            className="btn-cyber clip-notch relative border border-cyan-400/70 bg-cyan-400/5 px-5 py-2 font-display text-[11px] font-bold tracking-[0.15em] text-cyan-300 box-glow-blue"
          >
            DOWNLOAD
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 xl:hidden"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={`h-[2px] w-6 bg-cyan-300 transition-all ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-[2px] w-6 bg-cyan-300 transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`h-[2px] w-6 bg-cyan-300 transition-all ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden xl:hidden"
          >
            <div className="glass flex flex-col gap-1 px-6 py-4">
              {navItems.map((item) => {
                const isCards = item === "Cards";
                if (isCards) {
                  return (
                    <Link
                      key={item}
                      to="/cards"
                      className="py-2 text-left font-display text-sm tracking-wider uppercase text-slate-300 hover:text-cyan-300"
                    >
                      {item}
                    </Link>
                  );
                }
                return (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    className="py-2 text-left font-display text-sm tracking-wider uppercase text-slate-300"
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
