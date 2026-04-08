import type { Metadata } from "next";
import { getBugs } from "./_data/bugs";
import BugsClient from "./Client";

export const metadata: Metadata = {
  title: "곤충 도감",
  description:
    "두근두근타운에서 채집할 수 있는 곤충의 서식지, 희귀도, 위치, 판매 가격을 확인할 수 있어요.",
  alternates: { canonical: "/bugs" },
};

export default async function BugsPage() {
  const bugs = await getBugs();
  return <BugsClient bugs={bugs} />;
}
