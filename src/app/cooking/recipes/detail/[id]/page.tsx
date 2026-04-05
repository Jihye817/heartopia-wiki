import { notFound } from "next/navigation";
import { FOODS } from "../../../_data/foods";
import FoodDetailClient from "./Client";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const food = FOODS.find((f) => f.id === id);
  if (!food) {
    return {
      title: "요리 상세",
      description: "요리 상세 정보를 확인할 수 있습니다.",
      alternates: { canonical: `/cooking/recipes/detail/${id}` },
    };
  }
  return {
    title: `${food.ko}`,
    description: `${food.ko}의 레시피와 등급별 판매 정보입니다.`,
    alternates: { canonical: `/cooking/recipes/detail/${id}` },
  };
}

export default async function FoodDetailPage({ params }: PageProps) {
  const { id } = await params;
  const food = FOODS.find((f) => f.id === id);

  if (!food) {
    notFound();
  }

  return <FoodDetailClient food={food} />;
}
