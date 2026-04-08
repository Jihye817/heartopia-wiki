import { notFound } from "next/navigation";
import { getCropDetail } from "../../_data/crops";
import CropDetailClient from "./Client";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const crop = id ? await getCropDetail(id) : null;
  if (!crop) {
    return {
      title: "작물 상세",
      description: "작물 상세 정보를 확인할 수 있습니다.",
      alternates: { canonical: `/gardening/crops/detail/${id}` },
    };
  }
  return {
    title: `${crop.name}`,
    description: `${crop.name}의 재배·판매 정보입니다.`,
    alternates: { canonical: `/gardening/crops/detail/${id}` },
  };
}

export default async function CropDetailPage({ params }: PageProps) {
  const { id } = await params;
  const crop = id ? await getCropDetail(id) : null;

  if (!crop) {
    notFound();
  }

  return <CropDetailClient crop={crop} />;
}
