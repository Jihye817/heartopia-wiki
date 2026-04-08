import type { Metadata } from "next";
import { getCrops } from "./_data/crops";
import CropsPageClient from "./Client";

export const metadata: Metadata = {
  title: "작물 도감",
  description: "두근두근타운 작물 재배 정보를 확인할 수 있는 작물 도감입니다.",
  alternates: { canonical: "/gardening/crops" },
};

export default async function CropsPage() {
  const crops = await getCrops();
  return <CropsPageClient crops={crops} />;
}
