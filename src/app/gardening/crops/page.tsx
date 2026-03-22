import type { Metadata } from "next";
import { CROPS } from "./_data/crops";
import CropsPageClient from "./Client";

export const metadata: Metadata = {
  title: "작물 도감 | Heartopia Wiki",
  description: "두근두근타운 작물 재배 정보를 확인할 수 있는 작물 도감입니다.",
};

export default function CropsPage() {
  return <CropsPageClient crops={CROPS} />;
}
