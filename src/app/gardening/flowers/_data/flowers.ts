// ── Types ─────────────────────────────────────────────────────────────────────

export type Rarity = "common" | "rare" | "exotic" | "seasonal";

export interface Flower {
  id: string;
  emoji: string;
  thumbnail: string;
  name: string;
  ko: string;
  desc?: string;
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
  /** 성급별 꽃 이미지 경로 */
  image?: string;
  /** 성급별 판매 가격(G). 없으면 기본가 × 성급 배율로 계산 */
  sellPrice?: number;
}

export interface CrossItem {
  name: string;
  nameEn: string;
  hex: string;
  /** 해당 색상의 성급 (1~5, 표시용) */
  stars?: number;
  /** 색상별 꽃 이미지 경로 (없으면 이모지/hex로 표시) */
  image?: string;
  emoji?: string;
}

export interface CrossCombination {
  a: CrossItem;
  b: CrossItem;
  result: CrossItem;
  note?: string;
}

export interface CrossStep {
  combinations: CrossCombination[];
}

export interface FlowerDetail extends Flower {
  thumbnail: string;
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
    thumbnail: "/images/flowers/daisy_big.png",
    name: "Daisy",
    ko: "데이지",
    rarity: "common",
    stages: 6,
    season: "봄/여름",
  },
  {
    id: "pansy",
    emoji: "🌷",
    thumbnail: "/images/flowers/pansy_big.png",
    name: "Pansy",
    ko: "팬지",
    rarity: "common",
    stages: 5,
    season: "봄",
  },
  {
    id: "anthurium",
    emoji: "🌺",
    thumbnail: "/images/flowers/anthurium_big.png",
    name: "Anthurium",
    ko: "안스리움",
    rarity: "common",
    stages: 5,
    season: "봄/여름",
  },
  {
    id: "poppy",
    emoji: "🌺",
    thumbnail: "/images/flowers/poppy_big.png",
    name: "Poppy",
    ko: "꽃양귀비",
    rarity: "common",
    stages: 5,
    season: "여름",
  },
  {
    id: "calla",
    emoji: "💐",
    thumbnail: "/images/flowers/calla_big.png",
    name: "Calla",
    ko: "칼라",
    rarity: "common",
    stages: 5,
    season: "봄",
  },
  {
    id: "morning-glory",
    emoji: "🌷",
    thumbnail: "/images/flowers/morningglory_big.png",
    name: "Morning Glory",
    ko: "나팔꽃",
    rarity: "common",
    stages: 4,
    season: "여름",
  },
  {
    id: "carnation",
    emoji: "💐",
    thumbnail: "/images/flowers/carnation_big.png",
    name: "Carnation",
    ko: "카네이션",
    rarity: "common",
    stages: 6,
    season: "봄",
  },
  {
    id: "tulip",
    emoji: "🌸",
    thumbnail: "/images/flowers/tulip_big.png",
    name: "Tulip",
    ko: "튤립",
    rarity: "common",
    stages: 4,
    season: "봄",
  },
  {
    id: "lily",
    emoji: "🌸",
    thumbnail: "/images/flowers/lily_big.png",
    name: "Lily",
    ko: "백합",
    rarity: "common",
    stages: 6,
    season: "여름",
  },
  {
    id: "rose",
    emoji: "🌹",
    thumbnail: "/images/flowers/rose_big.png",
    name: "Rose",
    ko: "장미",
    rarity: "common",
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
  items: Array<{
    color: keyof typeof GRADE_COLORS;
    stars: number;
    image: string;
    sellPrice?: number;
  }>,
): GradeColor[] {
  return items.map(({ color, stars, image, sellPrice }) => ({
    stars,
    color,
    image,
    sellPrice,
    ...GRADE_COLORS[color],
  }));
}

export const FLOWER_DETAILS: Record<string, FlowerDetail> = {
  daisy: {
    id: "daisy",
    emoji: "🌼",
    thumbnail: "/images/flowers/daisy_big.png",
    name: "Daisy",
    ko: "데이지",
    desc: "두근두근타운에서 가장 흔하게 볼 수 있는 꽃이에요. 다양한 교배를 통해 희귀한 색상을 만들어낼 수 있어요.",
    rarity: "common",
    stages: 6,
    season: "봄/여름",
    sell: 120,
    growTime: "3일",
    grades: buildGrades([
      {
        color: "빨간색",
        stars: 1,
        image: "/images/flowers/daisy_red.png",
        sellPrice: 100,
      },
      {
        color: "흰색",
        stars: 1,
        image: "/images/flowers/daisy_white.png",
        sellPrice: 100,
      },
      {
        color: "분홍색",
        stars: 2,
        image: "/images/flowers/daisy_pink.png",
        sellPrice: 150,
      },
      {
        color: "연분홍색",
        stars: 3,
        image: "/images/flowers/daisy_ltpink.png",
        sellPrice: 200,
      },
      {
        color: "초록색",
        stars: 4,
        image: "/images/flowers/daisy_green.png",
        sellPrice: 250,
      },
      {
        color: "야광",
        stars: 5,
        image: "/images/flowers/daisy_light.png",
        sellPrice: 400,
      },
    ]),
    cross: [
      {
        combinations: [
          {
            a: {
              name: "빨강",
              nameEn: "Red",
              hex: "#fca5a5",
              stars: 1,
              image: "/images/flowers/daisy_red.png",
            },
            b: {
              name: "흰색",
              nameEn: "White",
              hex: "#fde68a",
              stars: 1,
              image: "/images/flowers/daisy_white.png",
            },
            result: {
              name: "핑크",
              nameEn: "Pink",
              hex: "#fbcfe8",
              stars: 2,
              image: "/images/flowers/daisy_pink.png",
            },
          },
          {
            a: {
              name: "빨강",
              nameEn: "Red",
              hex: "#fca5a5",
              stars: 1,
              image: "/images/flowers/daisy_red.png",
            },
            b: {
              name: "핑크",
              nameEn: "Pink",
              hex: "#fbcfe8",
              stars: 2,
              image: "/images/flowers/daisy_pink.png",
            },
            result: {
              name: "연핑크",
              nameEn: "Light Pink",
              hex: "#fbcfe8",
              stars: 3,
              image: "/images/flowers/daisy_ltpink.png",
            },
          },
          {
            a: {
              name: "핑크",
              nameEn: "Pink",
              hex: "#fbcfe8",
              stars: 2,
              image: "/images/flowers/daisy_pink.png",
            },
            b: {
              name: "핑크",
              nameEn: "Pink",
              hex: "#fbcfe8",
              stars: 2,
              image: "/images/flowers/daisy_pink.png",
            },
            result: {
              name: "연핑크",
              nameEn: "Light Pink",
              hex: "#f472b6",
              stars: 3,
              image: "/images/flowers/daisy_ltpink.png",
            },
          },
          {
            a: {
              name: "연핑크",
              nameEn: "Light Pink",
              hex: "#fbcfe8",
              stars: 3,
              image: "/images/flowers/daisy_ltpink.png",
            },
            b: {
              name: "연핑크",
              nameEn: "Light Pink",
              hex: "#fbcfe8",
              stars: 3,
              image: "/images/flowers/daisy_ltpink.png",
            },
            result: {
              name: "초록",
              nameEn: "Green",
              hex: "#6ee7b7",
              stars: 4,
              image: "/images/flowers/daisy_green.png",
            },
          },
          {
            a: {
              name: "초록",
              nameEn: "Green",
              hex: "#6ee7b7",
              stars: 4,
              image: "/images/flowers/daisy_green.png",
            },
            b: {
              name: "초록",
              nameEn: "Green",
              hex: "#6ee7b7",
              stars: 4,
              image: "/images/flowers/daisy_green.png",
            },
            result: {
              name: "야광",
              nameEn: "Glow",
              hex: "#a78bfa",
              stars: 5,
              image: "/images/flowers/daisy_light.png",
            },
          },
        ],
      },
    ],
  },
  pansy: {
    id: "pansy",
    emoji: "🌷",
    thumbnail: "/images/flowers/pansy_big.png",
    name: "Pansy",
    ko: "팬지",
    rarity: "common",
    stages: 5,
    season: "봄",
    sell: 150,
    growTime: "3일",
    grades: buildGrades([
      { color: "빨간색", stars: 1, image: "/images/flowers/pansy_red.png" },
      { color: "노란색", stars: 1, image: "/images/flowers/pansy_yellow.png" },
      { color: "주황색", stars: 2, image: "/images/flowers/pansy_orange.png" },
      { color: "검은색", stars: 3, image: "/images/flowers/pansy_black.png" },
      { color: "보라색", stars: 4, image: "/images/flowers/pansy_purple.png" },
      { color: "노을빛", stars: 5, image: "/images/flowers/pansy_sunset.png" },
    ]),
    cross: [],
  },
  anthurium: {
    id: "anthurium",
    emoji: "🌺",
    thumbnail: "/images/flowers/anthurium_big.png",
    name: "Anthurium",
    ko: "안스리움",
    rarity: "exotic",
    stages: 5,
    season: "봄/여름",
    sell: 200,
    growTime: "4일",
    grades: buildGrades([
      { color: "빨간색", stars: 1, image: "/images/flowers/anthurium_red.png" },
      {
        color: "노란색",
        stars: 1,
        image: "/images/flowers/anthurium_yellow.png",
      },
      { color: "흰색", stars: 1, image: "/images/flowers/anthurium_white.png" },
      {
        color: "주황색",
        stars: 2,
        image: "/images/flowers/anthurium_orange.png",
      },
      {
        color: "분홍색",
        stars: 2,
        image: "/images/flowers/anthurium_pink.png",
      },
      {
        color: "연분홍색",
        stars: 3,
        image: "/images/flowers/anthurium_ltpink.png",
      },
      {
        color: "초록색",
        stars: 4,
        image: "/images/flowers/anthurium_green.png",
      },
      { color: "야광", stars: 5, image: "/images/flowers/anthurium_light.png" },
    ]),
    cross: [],
  },
  poppy: {
    id: "poppy",
    emoji: "🌺",
    thumbnail: "/images/flowers/poppy_big.png",
    name: "Poppy",
    ko: "꽃양귀비",
    rarity: "common",
    stages: 5,
    season: "여름",
    sell: 140,
    growTime: "3일",
    grades: buildGrades([
      { color: "빨간색", stars: 1, image: "/images/flowers/poppy_red.png" },
      { color: "노란색", stars: 1, image: "/images/flowers/poppy_yellow.png" },
      { color: "흰색", stars: 1, image: "/images/flowers/poppy_white.png" },
      { color: "주황색", stars: 2, image: "/images/flowers/poppy_orange.png" },
      { color: "분홍색", stars: 2, image: "/images/flowers/poppy_pink.png" },
      { color: "검은색", stars: 3, image: "/images/flowers/poppy_black.png" },
      { color: "보라색", stars: 4, image: "/images/flowers/poppy_purple.png" },
      { color: "노을빛", stars: 5, image: "/images/flowers/poppy_sunset.png" },
    ]),
    cross: [],
  },
  calla: {
    id: "calla",
    emoji: "💐",
    thumbnail: "/images/flowers/calla_big.png",
    name: "Calla",
    ko: "칼라",
    rarity: "rare",
    stages: 5,
    season: "봄",
    sell: 180,
    growTime: "4일",
    grades: buildGrades([
      { color: "빨간색", stars: 1, image: "/images/flowers/calla_red.png" },
      { color: "노란색", stars: 1, image: "/images/flowers/calla_yellow.png" },
      { color: "흰색", stars: 1, image: "/images/flowers/calla_white.png" },
      { color: "주황색", stars: 2, image: "/images/flowers/calla_orange.png" },
      { color: "분홍색", stars: 2, image: "/images/flowers/calla_pink.png" },
      { color: "검은색", stars: 3, image: "/images/flowers/calla_black.png" },
      {
        color: "연분홍색",
        stars: 3,
        image: "/images/flowers/calla_ltpink.png",
      },
      { color: "보라색", stars: 4, image: "/images/flowers/calla_purple.png" },
      { color: "노을빛", stars: 5, image: "/images/flowers/calla_sunset.png" },
    ]),
    cross: [],
  },
  "morning-glory": {
    id: "morning-glory",
    emoji: "🌷",
    thumbnail: "/images/flowers/morningglory_big.png",
    name: "Morning Glory",
    ko: "나팔꽃",
    rarity: "common",
    stages: 4,
    season: "여름",
    sell: 130,
    growTime: "2일",
    grades: buildGrades([
      {
        color: "빨간색",
        stars: 1,
        image: "/images/flowers/morningglory_red.png",
      },
      {
        color: "노란색",
        stars: 1,
        image: "/images/flowers/morningglory_yellow.png",
      },
      {
        color: "흰색",
        stars: 1,
        image: "/images/flowers/morningglory_white.png",
      },
      {
        color: "주황색",
        stars: 2,
        image: "/images/flowers/morningglory_orange.png",
      },
      {
        color: "분홍색",
        stars: 2,
        image: "/images/flowers/morningglory_pink.png",
      },
      {
        color: "검은색",
        stars: 3,
        image: "/images/flowers/morningglory_black.png",
      },
      {
        color: "연분홍색",
        stars: 3,
        image: "/images/flowers/morningglory_ltpink.png",
      },
      {
        color: "보라색",
        stars: 4,
        image: "/images/flowers/morningglory_purple.png",
      },
    ]),
    cross: [],
  },
  carnation: {
    id: "carnation",
    emoji: "💐",
    thumbnail: "/images/flowers/carnation_big.png",
    name: "Carnation",
    ko: "카네이션",
    rarity: "rare",
    stages: 6,
    season: "봄",
    sell: 160,
    growTime: "3일",
    grades: buildGrades([
      { color: "빨간색", stars: 1, image: "/images/flowers/carnation_red.png" },
      {
        color: "노란색",
        stars: 1,
        image: "/images/flowers/carnation_yellow.png",
      },
      { color: "흰색", stars: 1, image: "/images/flowers/carnation_white.png" },
      {
        color: "주황색",
        stars: 2,
        image: "/images/flowers/carnation_orange.png",
      },
      {
        color: "분홍색",
        stars: 2,
        image: "/images/flowers/carnation_pink.png",
      },
      {
        color: "검은색",
        stars: 3,
        image: "/images/flowers/carnation_black.png",
      },
      {
        color: "연분홍색",
        stars: 3,
        image: "/images/flowers/carnation_ltpink.png",
      },
      {
        color: "초록색",
        stars: 4,
        image: "/images/flowers/carnation_green.png",
      },
      {
        color: "야광",
        stars: 5,
        image: "/images/flowers/carnation_light.png",
      },
    ]),
    cross: [],
  },
  tulip: {
    id: "tulip",
    emoji: "🌸",
    thumbnail: "/images/flowers/tulip_big.png",
    name: "Tulip",
    ko: "튤립",
    rarity: "seasonal",
    stages: 4,
    season: "봄",
    sell: 170,
    growTime: "3일",
    grades: buildGrades([
      { color: "빨간색", stars: 1, image: "/images/flowers/tulip_red.png" },
      { color: "노란색", stars: 1, image: "/images/flowers/tulip_yellow.png" },
      { color: "흰색", stars: 1, image: "/images/flowers/tulip_white.png" },
      { color: "주황색", stars: 2, image: "/images/flowers/tulip_orange.png" },
      { color: "분홍색", stars: 2, image: "/images/flowers/tulip_pink.png" },
      { color: "검은색", stars: 3, image: "/images/flowers/tulip_black.png" },
      {
        color: "연분홍색",
        stars: 3,
        image: "/images/flowers/tulip_ltpink.png",
      },
      { color: "보라색", stars: 4, image: "/images/flowers/tulip_purple.png" },
      { color: "파란색", stars: 4, image: "/images/flowers/tulip_blue.png" },
      { color: "노을빛", stars: 5, image: "/images/flowers/tulip_sunset.png" },
    ]),
    cross: [],
  },
  lily: {
    id: "lily",
    emoji: "🌸",
    thumbnail: "/images/flowers/lily_big.png",
    name: "Lily",
    ko: "백합",
    rarity: "rare",
    stages: 6,
    season: "여름",
    sell: 190,
    growTime: "4일",
    grades: buildGrades([
      { color: "빨간색", stars: 1, image: "/images/flowers/lily_red.png" },
      { color: "노란색", stars: 1, image: "/images/flowers/lily_yellow.png" },
      { color: "흰색", stars: 1, image: "/images/flowers/lily_white.png" },
      { color: "주황색", stars: 2, image: "/images/flowers/lily_orange.png" },
      { color: "분홍색", stars: 2, image: "/images/flowers/lily_pink.png" },
      { color: "검은색", stars: 3, image: "/images/flowers/lily_black.png" },
      {
        color: "연분홍색",
        stars: 3,
        image: "/images/flowers/lily_ltpink.png",
      },
      { color: "보라색", stars: 4, image: "/images/flowers/lily_purple.png" },
      { color: "초록색", stars: 4, image: "/images/flowers/lily_green.png" },
      { color: "야광", stars: 5, image: "/images/flowers/lily_light.png" },
    ]),
    cross: [],
  },
  rose: {
    id: "rose",
    emoji: "🌹",
    thumbnail: "/images/flowers/rose_big.png",
    name: "Rose",
    ko: "장미",
    desc: "로맨틱한 꽃",
    rarity: "rare",
    stages: 7,
    season: "봄/가을",
    sell: 220,
    growTime: "5일",
    grades: buildGrades([
      { color: "빨간색", stars: 1, image: "/images/flowers/rose_red.png" },
      { color: "노란색", stars: 1, image: "/images/flowers/rose_yellow.png" },
      { color: "흰색", stars: 1, image: "/images/flowers/rose_white.png" },
      { color: "주황색", stars: 2, image: "/images/flowers/rose_orange.png" },
      { color: "분홍색", stars: 2, image: "/images/flowers/rose_pink.png" },
      { color: "검은색", stars: 3, image: "/images/flowers/rose_black.png" },
      {
        color: "연분홍색",
        stars: 3,
        image: "/images/flowers/rose_ltpink.png",
      },
      { color: "보라색", stars: 4, image: "/images/flowers/rose_purple.png" },
      { color: "파란색", stars: 4, image: "/images/flowers/rose_blue.png" },
      { color: "노을빛", stars: 5, image: "/images/flowers/rose_sunset.png" },
      { color: "야광", stars: 5, image: "/images/flowers/rose_light.png" },
    ]),
    cross: [],
  },
};
