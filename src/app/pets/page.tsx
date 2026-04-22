import type { Metadata } from "next";
import PetsClient from "./Client";

export const metadata: Metadata = {
  title: "반려동물",
  description:
    "두근두근타운에서 함께할 수 있는 강아지, 고양이 정보를 확인할 수 있어요.",
  alternates: { canonical: "/pets" },
};

export default function PetsPage() {
  return <PetsClient />;
}
