import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getFishDetail } from "../../_data/fishes";
import FishDetailClient from "./Client";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const fish = id ? await getFishDetail(id) : null;
  if (!fish) return {};
  return {
    title: `${fish.name} | 물고기 도감`,
    description: `${fish.name}의 어종, 그림자 크기, 위치, 성급별 판매 가격 정보를 확인할 수 있어요.`,
    alternates: { canonical: `/fishing/detail/${id}` },
  };
}

export default async function FishDetailPage({ params }: Props) {
  const { id } = await params;
  const fish = id ? await getFishDetail(id) : null;
  if (!fish) notFound();
  return <FishDetailClient fish={fish} />;
}
