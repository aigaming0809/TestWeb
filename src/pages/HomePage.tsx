import CharacterShowcase from "../components/CharacterShowcase";
import PatchNotes from "../components/PatchNotes";
import CommunityDownloads from "../components/CommunityDownloads";

export default function HomePage() {
  return (
    <>
      <CharacterShowcase />
      <PatchNotes />
      <CommunityDownloads />
    </>
  );
}
