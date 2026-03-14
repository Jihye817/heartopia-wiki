// ── Types ─────────────────────────────────────────────────────────────────────

export type Rarity = "common" | "rare" | "exotic" | "seasonal";

export interface Flower {
  id: string;
  emoji: string;
  name: string;
  ko: string;
  desc: string;
  rarity: Rarity;
  stages: number;
  season: string;
}

export interface GradeColor {
  stars: number;
  emoji: string;
  color: string;
  colorEn: string;
  hex: string;
  /** 성급별 판매 가격(G). 없으면 기본가 × 성급 배율로 계산 */
  sellPrice?: number;
}

export interface CrossItem {
  name: string;
  nameEn: string;
  hex: string;
  emoji: string;
}

export interface CrossCombination {
  a: CrossItem;
  b: CrossItem;
  result: CrossItem;
  note?: string;
}

export interface CrossStep {
  step: number;
  combinations: CrossCombination[];
}

export interface FlowerDetail extends Flower {
  sell: number;
  growTime: string;
  grades: GradeColor[];
  cross: CrossStep[];
}

// ── Constants ─────────────────────────────────────────────────────────────────

export const RARITY_LABEL: Record<Rarity, string> = {
  common: "일반",
  rare: "희귀",
  exotic: "특별",
  seasonal: "계절한정",
};

export const RARITY_STYLE: Record<Rarity, string> = {
  common: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rare: "bg-sky-50 text-sky-700 border-sky-200",
  exotic: "bg-rose-50 text-rose-600 border-rose-200",
  seasonal: "bg-amber-50 text-amber-700 border-amber-200",
};

// ── Data ─────────────────────────────────────────────────────────────────────

export const FLOWERS: Flower[] = [
  {
    id: "daisy",
    emoji: "🌼",
    name: "Daisy",
    ko: "데이지",
    desc: "기본 꽃 계열",
    rarity: "common",
    stages: 6,
    season: "봄/여름",
  },
  {
    id: "pansy",
    emoji: "🌷",
    name: "Pansy",
    ko: "팬지",
    desc: "다양한 색감의 봄꽃",
    rarity: "common",
    stages: 5,
    season: "봄",
  },
  {
    id: "anthurium",
    emoji: "🌺",
    name: "Anthurium",
    ko: "안스리움",
    desc: "열대 원산의 관상용 꽃",
    rarity: "exotic",
    stages: 5,
    season: "봄/여름",
  },
  {
    id: "poppy",
    emoji: "🌺",
    name: "Poppy",
    ko: "꽃양귀비",
    desc: "화려한 색상의 꽃",
    rarity: "common",
    stages: 5,
    season: "여름",
  },
  {
    id: "calla",
    emoji: "💐",
    name: "Calla",
    ko: "칼라",
    desc: "희귀 꽃 계열",
    rarity: "rare",
    stages: 5,
    season: "봄",
  },
  {
    id: "morning-glory",
    emoji: "🌷",
    name: "Morning Glory",
    ko: "나팔꽃",
    desc: "아침에 피는 덩굴꽃",
    rarity: "common",
    stages: 4,
    season: "여름",
  },
  {
    id: "carnation",
    emoji: "💐",
    name: "Carnation",
    ko: "카네이션",
    desc: "사랑과 감사의 꽃",
    rarity: "rare",
    stages: 6,
    season: "봄",
  },
  {
    id: "tulip",
    emoji: "🌸",
    name: "Tulip",
    ko: "튤립",
    desc: "봄의 전령사",
    rarity: "seasonal",
    stages: 4,
    season: "봄",
  },
  {
    id: "lily",
    emoji: "🌸",
    name: "Lily",
    ko: "백합",
    desc: "순수하고 우아한 꽃",
    rarity: "rare",
    stages: 6,
    season: "여름",
  },
  {
    id: "rose",
    emoji: "🌹",
    name: "Rose",
    ko: "장미",
    desc: "로맨틱한 꽃",
    rarity: "rare",
    stages: 7,
    season: "봄/가을",
  },
];

const GRADE_COLORS: Record<
  string,
  Pick<GradeColor, "emoji" | "colorEn" | "hex">
> = {
  빨간색: { emoji: "🌹", colorEn: "Red", hex: "#ef4444" },
  흰색: { emoji: "🤍", colorEn: "White", hex: "#ffffff" },
  분홍색: { emoji: "🌸", colorEn: "Pink", hex: "#ec4899" },
  연분홍색: { emoji: "🌷", colorEn: "Light Pink", hex: "#fbcfe8" },
  초록색: { emoji: "🌿", colorEn: "Green", hex: "#22c55e" },
  야광: { emoji: "✨", colorEn: "Glow", hex: "#a78bfa" },
  노란색: { emoji: "🌼", colorEn: "Yellow", hex: "#eab308" },
  주황색: { emoji: "🧡", colorEn: "Orange", hex: "#f97316" },
  검은색: { emoji: "🖤", colorEn: "Black", hex: "#374151" },
  보라색: { emoji: "💜", colorEn: "Purple", hex: "#a855f7" },
  노을빛: { emoji: "🌅", colorEn: "Sunset", hex: "#fb923c" },
  파란색: { emoji: "💙", colorEn: "Blue", hex: "#3b82f6" },
};

function buildGrades(
  items: Array<{ color: keyof typeof GRADE_COLORS; stars: number }>
): GradeColor[] {
  return items.map(({ color, stars }) => ({
    stars,
    color,
    ...GRADE_COLORS[color],
  }));
}

export const FLOWER_DETAILS: Record<string, FlowerDetail> = {
  daisy: {
    id: "daisy",
    emoji: "🌼",
    name: "Daisy",
    ko: "데이지",
    desc: "두근두근타운에서 가장 흔하게 볼 수 있는 꽃이에요. 다양한 교배를 통해 희귀한 색상을 만들어낼 수 있어요.",
    rarity: "common",
    stages: 6,
    season: "봄/여름",
    sell: 120,
    growTime: "3일",
    grades: buildGrades([
      { color: "빨간색", stars: 1 },
      { color: "흰색", stars: 1 },
      { color: "분홍색", stars: 2 },
      { color: "연분홍색", stars: 3 },
      { color: "초록색", stars: 4 },
      { color: "야광", stars: 5 },
    ]),
    cross: [
      {
        step: 1,
        combinations: [
          {
            a: { name: "빨강", nameEn: "Red", hex: "#fca5a5", emoji: "🌼" },
            b: {
              name: "연노랑",
              nameEn: "Yellow",
              hex: "#fde68a",
              emoji: "🌼",
            },
            result: {
              name: "연핑크",
              nameEn: "Lt.Pink",
              hex: "#fbcfe8",
              emoji: "🌸",
            },
            note: "확률 25%",
          },
        ],
      },
      {
        step: 2,
        combinations: [
          {
            a: {
              name: "연핑크",
              nameEn: "Lt.Pink",
              hex: "#fbcfe8",
              emoji: "🌸",
            },
            b: { name: "빨강", nameEn: "Red", hex: "#fca5a5", emoji: "🌼" },
            result: {
              name: "진핑크",
              nameEn: "Dk.Pink",
              hex: "#f472b6",
              emoji: "🌺",
            },
            note: "확률 50%",
          },
          {
            a: {
              name: "연노랑",
              nameEn: "Yellow",
              hex: "#fde68a",
              emoji: "🌼",
            },
            b: { name: "빨강", nameEn: "Red", hex: "#fca5a5", emoji: "🌼" },
            result: {
              name: "진핑크",
              nameEn: "Dk.Pink",
              hex: "#f472b6",
              emoji: "🌺",
            },
            note: "확률 50%",
          },
        ],
      },
      {
        step: 3,
        combinations: [
          {
            a: {
              name: "진핑크",
              nameEn: "Dk.Pink",
              hex: "#f472b6",
              emoji: "🌺",
            },
            b: {
              name: "연핑크",
              nameEn: "Lt.Pink",
              hex: "#fbcfe8",
              emoji: "🌸",
            },
            result: {
              name: "초록",
              nameEn: "Green",
              hex: "#6ee7b7",
              emoji: "🌿",
            },
            note: "확률 25%",
          },
        ],
      },
      {
        step: 4,
        combinations: [
          {
            a: { name: "초록", nameEn: "Green", hex: "#6ee7b7", emoji: "🌿" },
            b: {
              name: "진핑크",
              nameEn: "Dk.Pink",
              hex: "#f472b6",
              emoji: "🌺",
            },
            result: {
              name: "하늘",
              nameEn: "Sky",
              hex: "#7dd3fc",
              emoji: "💙",
            },
            note: "확률 12.5%",
          },
        ],
      },
    ],
  },
  pansy: {
    id: "pansy",
    emoji: "🌷",
    name: "Pansy",
    ko: "팬지",
    desc: "다양한 색감의 봄꽃",
    rarity: "common",
    stages: 5,
    season: "봄",
    sell: 150,
    growTime: "3일",
    grades: buildGrades([
      { color: "빨간색", stars: 1 },
      { color: "노란색", stars: 1 },
      { color: "주황색", stars: 2 },
      { color: "검은색", stars: 3 },
      { color: "보라색", stars: 4 },
      { color: "노을빛", stars: 5 },
    ]),
    cross: [],
  },
  anthurium: {
    id: "anthurium",
    emoji: "🌺",
    name: "Anthurium",
    ko: "안스리움",
    desc: "열대 원산의 관상용 꽃",
    rarity: "exotic",
    stages: 5,
    season: "봄/여름",
    sell: 200,
    growTime: "4일",
    grades: buildGrades([
      { color: "빨간색", stars: 1 },
      { color: "노란색", stars: 1 },
      { color: "흰색", stars: 1 },
      { color: "주황색", stars: 2 },
      { color: "분홍색", stars: 2 },
      { color: "연분홍색", stars: 3 },
      { color: "초록색", stars: 4 },
      { color: "야광", stars: 5 },
    ]),
    cross: [],
  },
  poppy: {
    id: "poppy",
    emoji: "🌺",
    name: "Poppy",
    ko: "꽃양귀비",
    desc: "화려한 색상의 꽃",
    rarity: "common",
    stages: 5,
    season: "여름",
    sell: 140,
    growTime: "3일",
    grades: buildGrades([
      { color: "빨간색", stars: 1 },
      { color: "노란색", stars: 1 },
      { color: "흰색", stars: 1 },
      { color: "주황색", stars: 2 },
      { color: "분홍색", stars: 2 },
      { color: "검은색", stars: 3 },
      { color: "보라색", stars: 4 },
      { color: "노을빛", stars: 5 },
    ]),
    cross: [],
  },
  calla: {
    id: "calla",
    emoji: "💐",
    name: "Calla",
    ko: "칼라",
    desc: "희귀 꽃 계열",
    rarity: "rare",
    stages: 5,
    season: "봄",
    sell: 180,
    growTime: "4일",
    grades: buildGrades([
      { color: "빨간색", stars: 1 },
      { color: "노란색", stars: 1 },
      { color: "흰색", stars: 1 },
      { color: "주황색", stars: 2 },
      { color: "분홍색", stars: 2 },
      { color: "검은색", stars: 3 },
      { color: "연분홍색", stars: 3 },
      { color: "보라색", stars: 4 },
      { color: "노을빛", stars: 5 },
    ]),
    cross: [],
  },
  "morning-glory": {
    id: "morning-glory",
    emoji: "🌷",
    name: "Morning Glory",
    ko: "나팔꽃",
    desc: "아침에 피는 덩굴꽃",
    rarity: "common",
    stages: 4,
    season: "여름",
    sell: 130,
    growTime: "2일",
    grades: buildGrades([
      { color: "빨간색", stars: 1 },
      { color: "노란색", stars: 1 },
      { color: "흰색", stars: 1 },
      { color: "주황색", stars: 2 },
      { color: "분홍색", stars: 2 },
      { color: "검은색", stars: 3 },
      { color: "연분홍색", stars: 3 },
      { color: "보라색", stars: 4 },
      { color: "야광", stars: 5 },
    ]),
    cross: [],
  },
  carnation: {
    id: "carnation",
    emoji: "💐",
    name: "Carnation",
    ko: "카네이션",
    desc: "사랑과 감사의 꽃",
    rarity: "rare",
    stages: 6,
    season: "봄",
    sell: 160,
    growTime: "3일",
    grades: buildGrades([
      { color: "빨간색", stars: 1 },
      { color: "노란색", stars: 1 },
      { color: "흰색", stars: 1 },
      { color: "주황색", stars: 2 },
      { color: "분홍색", stars: 2 },
      { color: "검은색", stars: 3 },
      { color: "연분홍색", stars: 3 },
      { color: "초록색", stars: 4 },
      { color: "야광", stars: 5 },
    ]),
    cross: [],
  },
  tulip: {
    id: "tulip",
    emoji: "🌸",
    name: "Tulip",
    ko: "튤립",
    desc: "봄의 전령사",
    rarity: "seasonal",
    stages: 4,
    season: "봄",
    sell: 170,
    growTime: "3일",
    grades: buildGrades([
      { color: "빨간색", stars: 1 },
      { color: "노란색", stars: 1 },
      { color: "흰색", stars: 1 },
      { color: "주황색", stars: 2 },
      { color: "분홍색", stars: 2 },
      { color: "검은색", stars: 3 },
      { color: "연분홍색", stars: 3 },
      { color: "보라색", stars: 4 },
      { color: "파란색", stars: 4 },
      { color: "노을빛", stars: 5 },
    ]),
    cross: [],
  },
  lily: {
    id: "lily",
    emoji: "🌸",
    name: "Lily",
    ko: "백합",
    desc: "순수하고 우아한 꽃",
    rarity: "rare",
    stages: 6,
    season: "여름",
    sell: 190,
    growTime: "4일",
    grades: buildGrades([
      { color: "빨간색", stars: 1 },
      { color: "노란색", stars: 1 },
      { color: "흰색", stars: 1 },
      { color: "주황색", stars: 2 },
      { color: "분홍색", stars: 2 },
      { color: "검은색", stars: 3 },
      { color: "연분홍색", stars: 3 },
      { color: "보라색", stars: 4 },
      { color: "초록색", stars: 4 },
      { color: "야광", stars: 5 },
    ]),
    cross: [],
  },
  rose: {
    id: "rose",
    emoji: "🌹",
    name: "Rose",
    ko: "장미",
    desc: "로맨틱한 꽃",
    rarity: "rare",
    stages: 7,
    season: "봄/가을",
    sell: 220,
    growTime: "5일",
    grades: buildGrades([
      { color: "빨간색", stars: 1 },
      { color: "노란색", stars: 1 },
      { color: "흰색", stars: 1 },
      { color: "주황색", stars: 2 },
      { color: "분홍색", stars: 2 },
      { color: "검은색", stars: 3 },
      { color: "연분홍색", stars: 3 },
      { color: "보라색", stars: 4 },
      { color: "파란색", stars: 4 },
      { color: "노을빛", stars: 5 },
      { color: "야광", stars: 5 },
    ]),
    cross: [],
  },
};
