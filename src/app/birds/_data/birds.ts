import { supabase } from "@/lib/supabase";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface Bird {
  id: string;
  emoji: string;
  thumbnail?: string;
  name: string;
  desc?: string;
  level: number;
  availability: string;
  habitat: string;
  location: string;
  distance: number;
  weathers: string[];
  times: string[];
}

export interface BirdGrade {
  stars: number;
  sellPrice: number;
  sellEventPrice: number;
}

export interface BirdListItem extends Bird {
  sellMin: number;
  sellMax: number;
  bird_grades: BirdGrade[];
}

export interface BirdDetail extends Bird {
  sellMin: number;
  sellMax: number;
  grades: BirdGrade[];
}

// ── Mappers ────────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapBird(row: any): Bird {
  return {
    id: row.id,
    name: row.name,
    emoji: "🐦",
    thumbnail: row.thumbnail ?? undefined,
    desc: row.description ?? undefined,
    level: row.level ?? 0,
    availability: row.availability ?? "always",
    habitat: row.habitat ?? "",
    location: row.location ?? "",
    distance: row.distance ?? 0,
    weathers: row.weathers ?? [],
    times: row.times ?? [],
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapGrade(row: any): BirdGrade {
  return {
    stars: row.stars,
    sellPrice: row.sell_price ?? 0,
    sellEventPrice: row.sell_event_price ?? 0,
  };
}

// ── Fetch functions ────────────────────────────────────────────────────────────

export async function getBirds(): Promise<BirdListItem[]> {
  const { data, error } = await supabase
    .from("birds")
    .select("*, bird_grades(*)")
    .order("level", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => {
    const bird_grades = (row.bird_grades ?? [])
      .map(mapGrade)
      .sort((a: BirdGrade, b: BirdGrade) => a.stars - b.stars);
    return {
      ...mapBird(row),
      sellMin: row.sell_min ?? 0,
      sellMax: row.sell_max ?? 0,
      bird_grades,
    };
  });
}

export async function getBirdDetail(id: string): Promise<BirdDetail | null> {
  const { data, error } = await supabase
    .from("birds")
    .select("*, bird_grades(*)")
    .eq("id", id)
    .single();
  if (error || !data) return null;

  const grades = (data.bird_grades ?? [])
    .map(mapGrade)
    .sort((a: BirdGrade, b: BirdGrade) => a.stars - b.stars);

  return {
    ...mapBird(data),
    sellMin: data.sell_min ?? 0,
    sellMax: data.sell_max ?? 0,
    grades,
  };
}
