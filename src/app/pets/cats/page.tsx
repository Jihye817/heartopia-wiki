import { getCats } from "../_data/pets";
import CatsClient from "./Client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "고양이 | 반려동물",
  description: "두근두근타운 고양이 종류를 확인해 보세요.",
  alternates: { canonical: "/pets/cats" },
};

export default async function CatsPage() {
  const cats = await getCats();
  return <CatsClient cats={cats} />;
}
