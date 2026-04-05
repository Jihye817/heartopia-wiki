import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BIRDS } from "../../_data/birds";
import BirdDetailClient from "./Client";

type PageProps = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return BIRDS.map((bird) => ({ id: bird.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const bird = BIRDS.find((b) => b.id === id);
  if (!bird) {
    return {
      title: "새 상세",
      description: "새 상세 정보를 확인할 수 있습니다.",
      alternates: { canonical: `/birds/detail/${id}` },
    };
  }
  return {
    title: `${bird.ko} | 새 도감`,
    description: `${bird.ko}의 서식지, 관찰 레벨, 위치, 성급별 판매 가격 정보를 확인할 수 있어요.`,
    alternates: { canonical: `/birds/detail/${id}` },
  };
}

export default async function BirdDetailPage({ params }: PageProps) {
  const { id } = await params;
  const bird = BIRDS.find((b) => b.id === id);
  if (!bird) notFound();
  return <BirdDetailClient bird={bird} />;
}
