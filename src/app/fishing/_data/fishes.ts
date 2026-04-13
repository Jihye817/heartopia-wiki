import { supabase } from "@/lib/supabase";

// ── Types ──────────────────────────────────────────────────────────────────────

export type FishType = "강" | "호수" | "바다";

export interface Fish {
  id: string;
  emoji: string;
  thumbnail?: string;
  name: string;
  desc?: string;
  level: number;
  availability: string;
  event?: string;
  weathers: string[];
  times: string[];
  location: string;
}

export interface FishGrade {
  stars: number;
  sellPrice: number;
  eventPrice: number;
}

export interface FishListItem extends Fish {
  fishType: FishType;
  shadowSize: string;
  sellMin: number;
  sellMax: number;
  fish_grades: FishGrade[];
}

export interface RelatedRecipe {
  id: string;
  name: string;
  thumbnail?: string;
}

export interface FishDetail extends Fish {
  fishType: FishType;
  shadowSize: string;
  sellMin: number;
  sellMax: number;
  grades: FishGrade[];
  relatedRecipes: RelatedRecipe[];
}

// ── Mappers ────────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapFish(row: any): Fish {
  return {
    id: row.id,
    name: row.name,
    emoji: "🐟",
    thumbnail: row.thumbnail ?? undefined,
    desc: row.description ?? undefined,
    level: row.level ?? 0,
    availability: row.availability ?? "always",
    event: row.event ?? undefined,
    weathers: row.weathers ?? [],
    times: row.times ?? [],
    location: row.location ?? "",
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapGrade(row: any): FishGrade {
  return {
    stars: row.stars,
    sellPrice: row.sell_price ?? 0,
    eventPrice: row.event_price ?? 0,
  };
}

// ── Fetch functions ────────────────────────────────────────────────────────────

export async function getFishes(): Promise<FishListItem[]> {
  const { data, error } = await supabase
    .from("fishes")
    .select("*, fish_grades(*)")
    .order("level", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => {
    const fish_grades = (row.fish_grades ?? [])
      .map(mapGrade)
      .sort((a: FishGrade, b: FishGrade) => a.stars - b.stars);
    return {
      ...mapFish(row),
      fishType: row.fish_type as FishType,
      shadowSize: row.shadow_size ?? "",
      sellMin: row.sell_min ?? 0,
      sellMax: row.sell_max ?? 0,
      fish_grades,
    };
  });
}

export async function getFishDetail(id: string): Promise<FishDetail | null> {
  const [fishRes, specificRes, groupRes] = await Promise.all([
    supabase.from("fishes").select("*, fish_grades(*)").eq("id", id).single(),
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

  if (fishRes.error || !fishRes.data) return null;

  const grades = (fishRes.data.fish_grades ?? [])
    .map(mapGrade)
    .sort((a: FishGrade, b: FishGrade) => a.stars - b.stars);

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
    ...mapFish(fishRes.data),
    fishType: fishRes.data.fish_type as FishType,
    shadowSize: fishRes.data.shadow_size ?? "",
    sellMin: fishRes.data.sell_min ?? 0,
    sellMax: fishRes.data.sell_max ?? 0,
    grades,
    relatedRecipes,
  };
}
