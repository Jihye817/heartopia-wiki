import { getDogs } from "../_data/pets";
import DogsClient from "./Client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "강아지 | 반려동물",
  description: "두근두근타운 강아지 종류를 확인해 보세요.",
  alternates: { canonical: "/pets/dogs" },
};

export default async function DogsPage() {
  const dogs = await getDogs();
  return <DogsClient dogs={dogs} />;
}
