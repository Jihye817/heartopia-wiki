import type { Metadata } from "next";
import { getBirds } from "./_data/birds";
import BirdsClient from "./Client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "새 도감",
  description:
    "두근두근타운에서 관찰할 수 있는 새의 서식지, 위치, 거리, 판매 가격을 확인할 수 있어요.",
  alternates: { canonical: "/birds" },
};

export default async function BirdsPage() {
  const birds = await getBirds();
  return <BirdsClient birds={birds} />;
}
