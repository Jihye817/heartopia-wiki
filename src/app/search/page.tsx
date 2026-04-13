import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import SearchClient, { type SearchResultGroup } from "./Client";

export const dynamic = "force-dynamic";

// ── Category config ────────────────────────────────────────────────────────────

const CATEGORY_CONFIG: Record<
  string,
  { label: string; emoji: string; bg: string; defaultEmoji: string }
> = {
  flower: {
    label: "원예 · 꽃",
    emoji: "🌸",
    bg: "var(--wiki-cat-garden-bg)",
    defaultEmoji: "🌸",
  },
  crop: {
    label: "원예 · 작물",
    emoji: "🌾",
    bg: "var(--wiki-cat-garden-bg)",
    defaultEmoji: "🌾",
  },
  fish: {
    label: "낚시",
    emoji: "🐟",
    bg: "var(--wiki-cat-fishing-bg)",
    defaultEmoji: "🐟",
  },
  bug: {
    label: "곤충 채집",
    emoji: "🦋",
    bg: "var(--wiki-cat-bugs-bg)",
    defaultEmoji: "🦋",
  },
  bird: {
    label: "새 관찰",
    emoji: "🐦",
    bg: "var(--wiki-cat-birds-bg)",
    defaultEmoji: "🐦",
  },
  food: {
    label: "요리",
    emoji: "🍳",
    bg: "var(--wiki-cat-cooking-bg)",
    defaultEmoji: "🍳",
  },
  product: {
    label: "생산품",
    emoji: "📦",
    bg: "var(--wiki-cat-others-bg)",
    defaultEmoji: "📦",
  },
};

const CATEGORY_ORDER = [
  "flower",
  "crop",
  "fish",
  "bug",
  "bird",
  "food",
  "product",
];

// ── Metadata ───────────────────────────────────────────────────────────────────

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q
      ? `"${q}" 검색 결과 | 두근두근타운 위키`
      : "검색 | 두근두근타운 위키",
    description: "두근두근타운 위키에서 아이템, 물고기, 레시피, 꽃, 곤충, 새 등을 검색해보세요.",
    alternates: { canonical: "/search" },
    robots: { index: false },
  };
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  let groups: SearchResultGroup[] = [];

  if (query) {
    const { data } = await supabase
      .from("search_index")
      .select("id, name, category, thumbnail, href")
      .ilike("name", `%${query}%`)
      .limit(200);

    const grouped = new Map<string, SearchResultGroup>();

    for (const row of data ?? []) {
      const cfg = CATEGORY_CONFIG[row.category as string];
      if (!cfg) continue;

      if (!grouped.has(row.category)) {
        grouped.set(row.category, {
          key: row.category,
          label: cfg.label,
          emoji: cfg.emoji,
          bg: cfg.bg,
          items: [],
        });
      }

      grouped.get(row.category)!.items.push({
        id: row.id,
        name: row.name,
        href: (row.href as string)
          .replace("/foraging/bugs/", "/bugs/")
          .replace("/foraging/birds/", "/birds/"),
        thumbnail: row.thumbnail ?? null,
        emoji: cfg.defaultEmoji,
      });
    }

    groups = CATEGORY_ORDER.map((k) => grouped.get(k)).filter(
      (g): g is SearchResultGroup => g !== undefined,
    );
  }

  const total = groups.reduce((sum, g) => sum + g.items.length, 0);

  return <SearchClient query={query} groups={groups} total={total} />;
}
