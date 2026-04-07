import type { Metadata } from "next";
import { getFlowers } from "./_data/flowers";
import FlowersPageClient from "./Client";

export const metadata: Metadata = {
  title: "꽃 도감",
  description:
    "두근두근타운 꽃 종류와 교배 정보를 확인할 수 있는 꽃 도감입니다.",
  alternates: { canonical: "/gardening/flowers" },
};

export default async function FlowersPage() {
  const flowers = await getFlowers();
  return <FlowersPageClient flowers={flowers} />;
}
