import { notFound } from "next/navigation";
import { getPetDetail } from "../../../_data/pets";
import DogDetailClient from "./Client";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const dog = await getPetDetail(id);
  if (!dog) return {};
  return {
    title: `${dog.name} | 강아지`,
    description: `두근두근타운 ${dog.name} 정보를 확인해 보세요.`,
    alternates: { canonical: `/pets/dogs/detail/${id}` },
  };
}

export default async function DogDetailPage({ params }: PageProps) {
  const { id } = await params;
  const dog = await getPetDetail(id);
  if (!dog) notFound();
  return <DogDetailClient dog={dog} />;
}
