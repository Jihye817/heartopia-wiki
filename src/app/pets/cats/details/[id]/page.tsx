import { notFound } from "next/navigation";
import { getPetDetail } from "../../../_data/pets";
import CatDetailClient from "./Client";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const cat = await getPetDetail(id);
  if (!cat) return {};
  return {
    title: `${cat.name} | 고양이`,
    description: `두근두근타운 ${cat.name} 정보를 확인해 보세요.`,
    alternates: { canonical: `/pets/cats/details/${id}` },
  };
}

export default async function CatDetailPage({ params }: PageProps) {
  const { id } = await params;
  const cat = await getPetDetail(id);
  if (!cat) notFound();
  return <CatDetailClient cat={cat} />;
}
