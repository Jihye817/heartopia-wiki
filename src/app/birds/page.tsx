import type { Metadata } from "next";
import { BIRDS } from "./_data/birds";
import BirdsClient from "./Client";

export const metadata: Metadata = {
  title: "새 도감",
  description:
    "두근두근타운에서 관찰할 수 있는 새의 서식지, 희귀도, 위치, 판매 가격을 확인할 수 있어요.",
  alternates: { canonical: "/birds" },
};

export default function BirdsPage() {
  return <BirdsClient birds={BIRDS} />;
}
