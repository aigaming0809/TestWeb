import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CharacterShowcase from "../components/CharacterShowcase";
import PatchNotes from "../components/PatchNotes";
import CommunityDownloads from "../components/CommunityDownloads";

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      // Give the page a tick to render before scrolling to the section.
      const timer = setTimeout(() => {
        document.getElementById(state.scrollTo!)?.scrollIntoView({ behavior: "smooth" });
        // Clear the state so refresh / back-forward doesn't re-trigger the scroll.
        navigate(location.pathname, { replace: true, state: {} });
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
