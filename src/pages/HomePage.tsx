import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CharacterShowcase from "../components/CharacterShowcase";
import PatchNotes from "../components/PatchNotes";
import CommunityDownloads from "../components/CommunityDownloads";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      // wait a tick for the page/sections to mount before scrolling
      const timer = setTimeout(() => {
        document.getElementById(state.scrollTo!)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <>
      <CharacterShowcase />
      <PatchNotes />
      <CommunityDownloads />
    </>
  );
}
