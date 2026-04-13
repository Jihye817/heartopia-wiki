import type { Metadata } from "next";
import { getFoods } from "../_data/foods";
import CalculatorClient from "./Client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "재료 계산기",
  description:
    "만들고 싶은 음식과 수량을 선택하면 필요한 재료를 자동으로 계산해요.",
  alternates: { canonical: "/cooking/calculator" },
};

export default async function CalculatorPage() {
  const foods = await getFoods();
  return <CalculatorClient foods={foods} />;
}
