import { notFound } from "next/navigation";
import { FLOWER_DETAILS } from "../../_data/flowers";
import FlowerDetailClient from "./Client";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const flower = id ? FLOWER_DETAILS[id] : null;
  if (!flower)
    return {
      title: "꽃 상세 | Heartopia Wiki",
      description: "꽃 상세 정보를 확인할 수 있습니다.",
    };
  return {
    title: `${flower.ko} | Heartopia Wiki`,
    description: `${flower.ko}의 상세 정보입니다.`,
  };
}

export default async function FlowerDetailPage({ params }: PageProps) {
  const { id } = await params;
  const flower = id ? FLOWER_DETAILS[id] : null;

  if (!flower) {
    notFound();
  }

  return <FlowerDetailClient flower={flower} />;
}
