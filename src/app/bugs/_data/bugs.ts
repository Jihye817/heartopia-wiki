import { supabase } from "@/lib/supabase";

// ── Types ──────────────────────────────────────────────────────────────────────

export type BugHabitat =
  | "도시"
  | "어촌"
  | "온천산"
  | "숲"
  | "꽃밭"
  | "물가"
  | "바닷가"
  | "초원"
  | "해안"
  | "곤충 유인"
  | "에어벌 유인장치"
  | "기타";

export interface Bug {
  id: string;
  emoji: string;
  thumbnail?: string;
  name: string;
  desc?: string;
  level: number;
  availability: string;
  habitat: string;
  location: string;
  weathers: string[];
  times: string[];
}

export interface BugGrade {
  stars: number;
  sellPrice: number;
  sellEventPrice: number;
}

export interface BugListItem extends Bug {
  sellMin: number;
  sellMax: number;
  bug_grades: BugGrade[];
}

export interface BugDetail extends Bug {
  sellMin: number;
  sellMax: number;
  grades: BugGrade[];
}

// ── Mappers ────────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapBug(row: any): Bug {
  return {
    id: row.id,
    name: row.name,
    emoji: "🦋",
    thumbnail: row.thumbnail ?? undefined,
    desc: row.description ?? undefined,
    level: row.level ?? 0,
    availability: row.availability ?? "always",
    habitat: row.habitat ?? "",
    location: row.location ?? "",
    weathers: row.weathers ?? [],
    times: row.times ?? [],
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapGrade(row: any): BugGrade {
  return {
    stars: row.stars,
    sellPrice: row.sell_price ?? 0,
    sellEventPrice: row.sell_event_price ?? 0,
  };
}

// ── Fetch functions ────────────────────────────────────────────────────────────

export async function getBugs(): Promise<BugListItem[]> {
  const { data, error } = await supabase
    .from("bugs")
    .select("*, bug_grades(*)")
    .order("level", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => {
    const bug_grades = (row.bug_grades ?? [])
      .map(mapGrade)
      .sort((a: BugGrade, b: BugGrade) => a.stars - b.stars);
    return {
      ...mapBug(row),
      sellMin: row.sell_min ?? 0,
      sellMax: row.sell_max ?? 0,
      bug_grades,
    };
  });
}

export async function getBugDetail(id: string): Promise<BugDetail | null> {
  const { data, error } = await supabase
    .from("bugs")
    .select("*, bug_grades(*)")
    .eq("id", id)
    .single();
  if (error || !data) return null;

  const grades = (data.bug_grades ?? [])
    .map(mapGrade)
    .sort((a: BugGrade, b: BugGrade) => a.stars - b.stars);

  return {
    ...mapBug(data),
    sellMin: data.sell_min ?? 0,
    sellMax: data.sell_max ?? 0,
    grades,
  };
}
