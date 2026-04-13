import { supabase } from "@/lib/supabase";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface Crop {
  id: string;
  name: string;
  thumbnail: string;
  level: number | null;
  availability: string;
  event?: string;
  grow_time: string;
  seed_cost: number;
  seed_npc: string;
  sell_min: number;
  sell_max: number;
}

export interface CropGrade {
  stars: number;
  sell_price: number | null;
}

export interface CropListItem extends Crop {
  crop_grades: CropGrade[];
}

export interface RelatedRecipe {
  id: string;
  name: string;
  thumbnail?: string;
}

export interface CropDetail extends Crop {
  grades: CropGrade[];
  relatedRecipes: RelatedRecipe[];
}

// ── Fetch functions ────────────────────────────────────────────────────────────

export async function getCrops(): Promise<CropListItem[]> {
  const { data, error } = await supabase
    .from("crops")
    .select("*, crop_grades(stars, sell_price)")
    .order("level", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []).map((c) => {
    const grades = c.crop_grades as CropGrade[];
    const seen = new Set<number>();
    const unique = grades
      .sort((a, b) => a.stars - b.stars)
      .filter((g) => (seen.has(g.stars) ? false : seen.add(g.stars) && true));
    return { ...c, crop_grades: unique };
  });
}

export async function getCropDetail(id: string): Promise<CropDetail | null> {
  const [cropRes, gradesRes, specificRes, groupRes] = await Promise.all([
    supabase.from("crops").select("*").eq("id", id).single(),
    supabase.from("crop_grades").select("*").eq("crop_id", id).order("stars"),
    supabase
      .from("food_ingredients")
      .select("foods(id, name, thumbnail)")
      .eq("type", "specific")
      .eq("item_id", id),
    supabase
      .from("food_ingredients")
      .select("foods(id, name, thumbnail)")
      .eq("type", "group")
      .filter("options", "cs", `[{"id": "${id}"}]`),
  ]);

  if (cropRes.error || !cropRes.data) return null;

  const seen = new Set<string>();
  const relatedRecipes: RelatedRecipe[] = [];
  for (const row of [...(specificRes.data ?? []), ...(groupRes.data ?? [])]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const food = (row as any).foods as {
      id: string;
      name: string;
      thumbnail?: string;
    } | null;
    if (food && !seen.has(food.id)) {
      seen.add(food.id);
      relatedRecipes.push({
        id: food.id,
        name: food.name,
        thumbnail: food.thumbnail ?? undefined,
      });
    }
  }

  return {
    ...cropRes.data,
    grades: gradesRes.data ?? [],
    relatedRecipes,
  };
}
