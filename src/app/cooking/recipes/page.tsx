import type { Metadata } from "next";
import FoodsPageClient from "./Client";

export const metadata: Metadata = {
  title: "요리 도감",
  description: "두근두근타운 요리 레시피와 재료, 등급별 판매 가격 정보를 확인할 수 있는 요리 도감입니다.",
};

export default function FoodsPage() {
  return <FoodsPageClient />;
}
