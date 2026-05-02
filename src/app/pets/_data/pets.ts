import { supabase } from "@/lib/supabase";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface Pet {
  id: string;
  name: string;
  thumbnail?: string;
  type: string;
}

export interface PetEyeShape {
  id: string;
  name: string;
  image?: string;
}

export interface PetEyeColor {
  id: string;
  name: string;
  image?: string;
}

export interface PetPersonality {
  id: string;
  name: string;
  description?: string;
}

export interface GroupedPattern {
  id: string;
  color: string;
  images: string[];
}

export interface PetDetail extends Pet {
  eyeShapes: PetEyeShape[];
  eyeColors: PetEyeColor[];
  personalities: PetPersonality[];
  patterns: GroupedPattern[];
}

// ── Fetch functions ────────────────────────────────────────────────────────────

export async function getDogs(): Promise<Pet[]> {
  const { data, error } = await supabase
    .from("pets")
    .select("*")
    .eq("type", "dog")
    .order("name");
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    thumbnail: row.thumbnail ?? undefined,
    type: row.type,
  }));
}

export async function getCats(): Promise<Pet[]> {
  const { data, error } = await supabase
    .from("pets")
    .select("*")
    .eq("type", "cat")
    .order("name");
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    thumbnail: row.thumbnail ?? undefined,
    type: row.type,
  }));
}

export async function getPetDetail(id: string): Promise<PetDetail | null> {
  const petRes = await supabase.from("pets").select("*").eq("id", id).single();
  if (petRes.error || !petRes.data) return null;

  const petType = petRes.data.type;

  const [eyeShapesRes, eyeColorsRes, personalitiesRes, patternsRes] =
    await Promise.all([
      supabase.from("pet_eye_shapes").select("*").eq("pet_type", petType),
      supabase.from("pet_eye_colors").select("*").eq("pet_type", petType),
      supabase.from("pet_personalities").select("*").eq("pet_type", petType),
      supabase.from("pet_patterns").select("*").eq("pet_id", id),
    ]);

  const patterns: GroupedPattern[] = (patternsRes.data ?? []).map((p) => ({
    id: p.id,
    color: p.color,
    images: p.image ? [p.image] : [],
  }));

  return {
    id: petRes.data.id,
    name: petRes.data.name,
    thumbnail: petRes.data.thumbnail ?? undefined,
    type: petRes.data.type,
    eyeShapes: (eyeShapesRes.data ?? []).map((e) => ({
      id: e.id,
      name: e.name,
      image: e.image ?? undefined,
    })),
    eyeColors: (eyeColorsRes.data ?? []).map((e) => ({
      id: e.id,
      name: e.name,
      image: e.image ?? undefined,
    })),
    personalities: (personalitiesRes.data ?? []).map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description ?? undefined,
    })),
    patterns,
  };
}
