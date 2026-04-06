import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BUGS } from "../../_data/bugs";
import BugDetailClient from "./Client";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return BUGS.map((bug) => ({ id: bug.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const bug = BUGS.find((b) => b.id === id);
  if (!bug) return {};
  return {
    title: `${bug.ko} | 곤충 도감`,
    description: `${bug.ko}의 서식지, 위치, 시간, 날씨, 성급별 판매 가격 정보를 확인할 수 있어요.`,
    alternates: { canonical: `/bugs/detail/${id}` },
  };
}

export default async function BugDetailPage({ params }: Props) {
  const { id } = await params;
  const bug = BUGS.find((b) => b.id === id);
  if (!bug) notFound();
  return <BugDetailClient bug={bug} />;
}
