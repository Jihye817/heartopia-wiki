import { getNpcs } from "./_data/npcs";
import NpcPageClient from "./Client";

export const metadata = {
  title: "NPC 도감 | Heartopia Wiki",
  description: "마을 주민과 캐릭터 정보",
};

export default async function NpcPage() {
  const npcs = await getNpcs();
  return <NpcPageClient npcs={npcs} />;
}
