import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBirdDetail } from "../../_data/birds";
import BirdDetailClient from "./Client";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const bird = id ? await getBirdDetail(id) : null;
  if (!bird) return {};
  return {
    title: `${bird.name} | 새 도감`,
    description: `${bird.name}의 서식지, 위치, 거리, 시간, 날씨, 성급별 판매 가격 정보를 확인할 수 있어요.`,
    alternates: { canonical: `/birds/detail/${id}` },
  };
}

export default async function BirdDetailPage({ params }: Props) {
  const { id } = await params;
  const bird = id ? await getBirdDetail(id) : null;
  if (!bird) notFound();
  return <BirdDetailClient bird={bird} />;
}
