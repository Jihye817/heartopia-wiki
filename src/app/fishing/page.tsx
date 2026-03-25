import type { Metadata } from "next";
import { FISHES } from "./_data/fishes";
import FishingClient from "./Client";

export const metadata: Metadata = {
  title: "물고기 도감 | Heartopia Wiki",
  description:
    "두근두근타운에서 낚시로 잡을 수 있는 물고기의 어종, 그림자 크기, 위치, 판매 가격을 확인할 수 있어요.",
};

export default function FishingPage() {
  return <FishingClient fishes={FISHES} />;
}
