import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getNpcDetail } from "../../_data/npcs";
import NpcDetailClient from "./Client";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const npc = id ? await getNpcDetail(id) : null;
  if (!npc) return {};
  return {
    title: `${npc.name} | NPC 도감`,
    description:
      npc.description ?? `${npc.name}의 위치와 정보를 확인할 수 있어요.`,
    alternates: { canonical: `/npc/detail/${id}` },
  };
}

export default async function NpcDetailPage({ params }: Props) {
  const { id } = await params;
  const npc = id ? await getNpcDetail(id) : null;
  if (!npc) notFound();
  return <NpcDetailClient npc={npc} />;
}
