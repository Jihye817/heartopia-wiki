import { notFound } from "next/navigation";
import { getFlowerDetail } from "../../_data/flowers";
import FlowerDetailClient from "./Client";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const flower = id ? await getFlowerDetail(id) : null;
  if (!flower)
    return {
      title: "꽃 상세",
      description: "꽃 상세 정보를 확인할 수 있습니다.",
      alternates: { canonical: `/gardening/flowers/detail/${id}` },
    };
  return {
    title: `${flower.name}`,
    description: `${flower.name}의 상세 정보입니다.`,
    alternates: { canonical: `/gardening/flowers/detail/${id}` },
  };
}

export default async function FlowerDetailPage({ params }: PageProps) {
  const { id } = await params;
  const flower = id ? await getFlowerDetail(id) : null;

  if (!flower) {
    notFound();
  }

  return <FlowerDetailClient flower={flower} />;
}
