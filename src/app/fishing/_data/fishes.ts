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

export interface FishDetail extends Fish {
  fishType: FishType;
  shadowSize: string;
  sellMin: number;
  sellMax: number;
  grades: FishGrade[];
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
  const { data, error } = await supabase
    .from("fishes")
    .select("*, fish_grades(*)")
    .eq("id", id)
    .single();
  if (error || !data) return null;

  const grades = (data.fish_grades ?? [])
    .map(mapGrade)
    .sort((a: FishGrade, b: FishGrade) => a.stars - b.stars);

  return {
    ...mapFish(data),
    fishType: data.fish_type as FishType,
    shadowSize: data.shadow_size ?? "",
    sellMin: data.sell_min ?? 0,
    sellMax: data.sell_max ?? 0,
    grades,
  };
}
