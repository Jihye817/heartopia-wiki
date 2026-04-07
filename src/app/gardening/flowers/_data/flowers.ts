import { supabase } from "@/lib/supabase";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface Flower {
  id: string;
  name: string;
  thumbnail: string;
  description?: string;
  level: number;
  stages: number;
  availability: string;
  event?: string;
  grow_time: string;
  seed_cost: number;
  seed_npc: string;
  seed_colors: string[];
  sell_min: number;
  sell_max: number;
}

export interface GradeColor {
  stars: number;
  color: string;
  image?: string;
  sell_price?: number;
  event_price?: number;
}

export interface CrossItem {
  name: string;
  stars?: number;
  image?: string;
  hex?: string;
  emoji?: string;
}

export interface CrossCombination {
  result: CrossItem;
  a: CrossItem[];
  b: CrossItem[];
  note?: string;
}

export interface CrossStep {
  step: number;
  combinations: CrossCombination[];
}

export interface FlowerListItem extends Flower {
  flower_grades: Array<{ stars: number; sell_price: number | null }>;
}

export interface FlowerDetail extends Flower {
  grades: GradeColor[];
  cross: CrossStep[];
}

// ── Fetch functions ────────────────────────────────────────────────────────────

export async function getFlowers(): Promise<FlowerListItem[]> {
  const { data, error } = await supabase
    .from("flowers")
    .select("*, flower_grades(stars, sell_price)")
    .order("level", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []).map((f) => {
    const grades = f.flower_grades as FlowerListItem["flower_grades"];
    const seen = new Set<number>();
    const unique = grades
      .sort((a, b) => a.stars - b.stars)
      .filter((g) => (seen.has(g.stars) ? false : seen.add(g.stars) && true));
    return { ...f, flower_grades: unique };
  });
}

export async function getFlowerDetail(
  id: string,
): Promise<FlowerDetail | null> {
  const [flowerRes, gradesRes, crossRes] = await Promise.all([
    supabase.from("flowers").select("*").eq("id", id).single(),
    supabase
      .from("flower_grades")
      .select("*")
      .eq("flower_id", id)
      .order("stars"),
    supabase.from("flower_cross").select("*").eq("flower_id", id).order("step"),
  ]);

  if (flowerRes.error || !flowerRes.data) return null;

  const stepsMap = new Map<number, CrossCombination[]>();
  for (const row of crossRes.data ?? []) {
    const combo: CrossCombination = {
      result: {
        name: row.result_color,
        stars: row.result_stars ?? undefined,
        image: row.result_image ?? undefined,
      },
      a: row.parent_a ?? [],
      b: row.parent_b ?? [],
    };
    if (!stepsMap.has(row.step)) stepsMap.set(row.step, []);
    stepsMap.get(row.step)!.push(combo);
  }
  const cross: CrossStep[] = Array.from(stepsMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([step, combinations]) => ({ step, combinations }));

  return {
    ...flowerRes.data,
    grades: gradesRes.data ?? [],
    cross,
  };
}
