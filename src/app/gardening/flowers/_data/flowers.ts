// ── Types ─────────────────────────────────────────────────────────────────────

export interface Flower {
  id: string;
  emoji: string;
  thumbnail: string;
  name: string;
  ko: string;
  desc?: string;
  level: number;
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

/**
 * 결과 하나에 대한 부모 색상 그룹.
 * a 중 하나 + b 중 하나 조합으로 해당 결과를 만들 수 있음.
 * a, b 각각 1개 이상의 색상을 가질 수 있음.
 */
export interface CrossCombination {
  result: CrossItem;
  /** 부모 색상 그룹 (첫 번째) */
  a: CrossItem[];
  /** 부모 색상 그룹 (두 번째) */
  b: CrossItem[];
  note?: string;
}

export interface CrossStep {
  combinations: CrossCombination[];
}

export interface FlowerDetail extends Flower {
  thumbnail: string;
  sellMin: number;
  sellMax: number;
  growTime: string;
  grades: GradeColor[];
  cross: CrossStep[];
  seedCost: number;
  seedColors: string[];
  seedNPC: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

// ── Data ─────────────────────────────────────────────────────────────────────

export const FLOWERS: Flower[] = [
  {
    id: "daisy",
    emoji: "🌼",
    thumbnail: "/images/flowers/daisy_big.png",
    name: "Daisy",
    ko: "데이지",
    level: 3,
    stages: 6,
    season: "일상",
  },
  {
    id: "pansy",
    emoji: "🌷",
    thumbnail: "/images/flowers/pansy_big.png",
    name: "Pansy",
    ko: "팬지",
    level: 4,
    stages: 6,
    season: "일상",
  },
  {
    id: "anthurium",
    emoji: "🌺",
    thumbnail: "/images/flowers/anthurium_big.png",
    name: "Anthurium",
    ko: "안스리움",
    level: 5,
    stages: 8,
    season: "일상",
  },
  {
    id: "poppy",
    emoji: "🌺",
    thumbnail: "/images/flowers/poppy_big.png",
    name: "Poppy",
    ko: "꽃양귀비",
    level: 5,
    stages: 8,
    season: "일상",
  },
  {
    id: "calla",
    emoji: "💐",
    thumbnail: "/images/flowers/calla_big.png",
    name: "Calla",
    ko: "칼라",
    level: 6,
    stages: 9,
    season: "일상",
  },
  {
    id: "morning-glory",
    emoji: "🌷",
    thumbnail: "/images/flowers/morningglory_big.png",
    name: "Morning Glory",
    ko: "나팔꽃",
    level: 6,
    stages: 9,
    season: "일상",
  },
  {
    id: "carnation",
    emoji: "💐",
    thumbnail: "/images/flowers/carnation_big.png",
    name: "Carnation",
    ko: "카네이션",
    level: 7,
    stages: 9,
    season: "일상",
  },
  {
    id: "tulip",
    emoji: "🌸",
    thumbnail: "/images/flowers/tulip_big.png",
    name: "Tulip",
    ko: "튤립",
    level: 8,
    stages: 10,
    season: "일상",
  },
  {
    id: "lily",
    emoji: "🌸",
    thumbnail: "/images/flowers/lily_big.png",
    name: "Lily",
    ko: "백합",
    level: 9,
    stages: 10,
    season: "일상",
  },
  {
    id: "rose",
    emoji: "🌹",
    thumbnail: "/images/flowers/rose_big.png",
    name: "Rose",
    ko: "장미",
    level: 10,
    stages: 11,
    season: "일상",
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

const COLOR_SUFFIX: Record<string, string> = {
  빨간색: "red",
  노란색: "yellow",
  흰색: "white",
  분홍색: "pink",
  연분홍색: "ltpink",
  주황색: "orange",
  검은색: "black",
  보라색: "purple",
  초록색: "green",
  야광: "light",
  노을빛: "sunset",
  파란색: "blue",
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

/** 교배 테이블용 CrossItem 생성 (flower 이미지 prefix, 색상명, 성급) */
function ci(
  prefix: string,
  color: keyof typeof GRADE_COLORS,
  stars: number,
): CrossItem {
  const suffix = COLOR_SUFFIX[color] ?? color;
  return {
    name: color,
    nameEn: GRADE_COLORS[color].colorEn,
    hex: GRADE_COLORS[color].hex,
    stars,
    image: `/images/flowers/${prefix}_${suffix}.png`,
  };
}

export const FLOWER_DETAILS: Record<string, FlowerDetail> = {
  daisy: {
    id: "daisy",
    emoji: "🌼",
    thumbnail: "/images/flowers/daisy_big.png",
    name: "Daisy",
    ko: "데이지",
    desc: "화단에서 흔히 볼 수 있는 작은 태양, 순수함과 천진난만함의 화신이다.",
    stages: 6,
    season: "일상",
    sellMin: 100,
    sellMax: 400,
    level: 3,
    growTime: "18시간",
    seedCost: 30,
    seedColors: ["빨간색", "흰색"],
    seedNPC: "블랑코",
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
            result: {
              name: "분홍색",
              nameEn: "Pink",
              hex: "#fbcfe8",
              stars: 2,
              image: "/images/flowers/daisy_pink.png",
            },
            a: [
              {
                name: "빨간색",
                nameEn: "Red",
                hex: "#fca5a5",
                stars: 1,
                image: "/images/flowers/daisy_red.png",
              },
            ],
            b: [
              {
                name: "흰색",
                nameEn: "White",
                hex: "#fde68a",
                stars: 1,
                image: "/images/flowers/daisy_white.png",
              },
            ],
          },
          {
            result: {
              name: "연분홍색",
              nameEn: "Light Pink",
              hex: "#fbcfe8",
              stars: 3,
              image: "/images/flowers/daisy_ltpink.png",
            },
            a: [
              {
                name: "분홍색",
                nameEn: "Pink",
                hex: "#fbcfe8",
                stars: 2,
                image: "/images/flowers/daisy_pink.png",
              },
            ],
            b: [
              {
                name: "빨간색",
                nameEn: "Red",
                hex: "#fca5a5",
                stars: 1,
                image: "/images/flowers/daisy_red.png",
              },
              {
                name: "분홍색",
                nameEn: "Pink",
                hex: "#fbcfe8",
                stars: 2,
                image: "/images/flowers/daisy_pink.png",
              },
            ],
          },
          {
            result: {
              name: "초록색",
              nameEn: "Green",
              hex: "#6ee7b7",
              stars: 4,
              image: "/images/flowers/daisy_green.png",
            },
            a: [
              {
                name: "연분홍색",
                nameEn: "Light Pink",
                hex: "#fbcfe8",
                stars: 3,
                image: "/images/flowers/daisy_ltpink.png",
              },
            ],
            b: [
              {
                name: "분홍색",
                nameEn: "Pink",
                hex: "#fbcfe8",
                stars: 2,
                image: "/images/flowers/daisy_pink.png",
              },
              {
                name: "연분홍색",
                nameEn: "Light Pink",
                hex: "#fbcfe8",
                stars: 3,
                image: "/images/flowers/daisy_ltpink.png",
              },
            ],
          },
          {
            result: {
              name: "야광",
              nameEn: "Glow",
              hex: "#a78bfa",
              stars: 5,
              image: "/images/flowers/daisy_light.png",
            },
            a: [
              {
                name: "초록색",
                nameEn: "Green",
                hex: "#6ee7b7",
                stars: 4,
                image: "/images/flowers/daisy_green.png",
              },
            ],
            b: [
              {
                name: "연분홍색",
                nameEn: "Light Pink",
                hex: "#fbcfe8",
                stars: 3,
                image: "/images/flowers/daisy_ltpink.png",
              },
              {
                name: "초록색",
                nameEn: "Green",
                hex: "#6ee7b7",
                stars: 4,
                image: "/images/flowers/daisy_green.png",
              },
            ],
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
    level: 4,
    stages: 5,
    season: "일상",
    sellMin: 100,
    sellMax: 400,
    growTime: "18시간",
    seedCost: 30,
    seedColors: ["빨간색", "노란색"],
    seedNPC: "블랑코",
    grades: buildGrades([
      {
        color: "빨간색",
        stars: 1,
        image: "/images/flowers/pansy_red.png",
        sellPrice: 100,
      },
      {
        color: "노란색",
        stars: 1,
        image: "/images/flowers/pansy_yellow.png",
        sellPrice: 100,
      },
      {
        color: "주황색",
        stars: 2,
        image: "/images/flowers/pansy_orange.png",
        sellPrice: 150,
      },
      {
        color: "검은색",
        stars: 3,
        image: "/images/flowers/pansy_black.png",
        sellPrice: 200,
      },
      {
        color: "보라색",
        stars: 4,
        image: "/images/flowers/pansy_purple.png",
        sellPrice: 250,
      },
      {
        color: "노을빛",
        stars: 5,
        image: "/images/flowers/pansy_sunset.png",
        sellPrice: 400,
      },
    ]),
    cross: [
      {
        combinations: [
          {
            result: ci("pansy", "주황색", 2),
            a: [ci("pansy", "빨간색", 1)],
            b: [ci("pansy", "노란색", 1)],
          },
          {
            result: ci("pansy", "검은색", 3),
            a: [ci("pansy", "주황색", 2)],
            b: [ci("pansy", "빨간색", 1), ci("pansy", "주황색", 2)],
          },
          {
            result: ci("pansy", "보라색", 4),
            a: [ci("pansy", "검은색", 3)],
            b: [ci("pansy", "주황색", 2), ci("pansy", "검은색", 3)],
          },
          {
            result: ci("pansy", "노을빛", 5),
            a: [ci("pansy", "보라색", 4)],
            b: [ci("pansy", "검은색", 3), ci("pansy", "보라색", 4)],
          },
        ],
      },
    ],
  },
  anthurium: {
    id: "anthurium",
    emoji: "🌺",
    thumbnail: "/images/flowers/anthurium_big.png",
    name: "Anthurium",
    ko: "안스리움",
    level: 5,
    stages: 5,
    season: "일상",
    sellMin: 185,
    sellMax: 740,
    growTime: "24시간",
    seedCost: 60,
    seedColors: ["빨간색", "노란색", "흰색"],
    seedNPC: "블랑코",
    grades: buildGrades([
      {
        color: "빨간색",
        stars: 1,
        image: "/images/flowers/anthurium_red.png",
        sellPrice: 185,
      },
      {
        color: "노란색",
        stars: 1,
        image: "/images/flowers/anthurium_yellow.png",
        sellPrice: 185,
      },
      {
        color: "흰색",
        stars: 1,
        image: "/images/flowers/anthurium_white.png",
        sellPrice: 185,
      },
      {
        color: "주황색",
        stars: 2,
        image: "/images/flowers/anthurium_orange.png",
        sellPrice: 280,
      },
      {
        color: "분홍색",
        stars: 2,
        image: "/images/flowers/anthurium_pink.png",
        sellPrice: 280,
      },
      {
        color: "연분홍색",
        stars: 3,
        image: "/images/flowers/anthurium_ltpink.png",
        sellPrice: 370,
      },
      {
        color: "초록색",
        stars: 4,
        image: "/images/flowers/anthurium_green.png",
        sellPrice: 465,
      },
      {
        color: "야광",
        stars: 5,
        image: "/images/flowers/anthurium_light.png",
        sellPrice: 740,
      },
    ]),
    cross: [
      {
        combinations: [
          {
            result: ci("anthurium", "분홍색", 2),
            a: [ci("anthurium", "빨간색", 1)],
            b: [ci("anthurium", "흰색", 1)],
          },
          {
            result: ci("anthurium", "주황색", 2),
            a: [ci("anthurium", "빨간색", 1)],
            b: [ci("anthurium", "노란색", 1)],
          },
          {
            result: ci("anthurium", "연분홍색", 3),
            a: [ci("anthurium", "분홍색", 2)],
            b: [ci("anthurium", "빨간색", 1), ci("anthurium", "분홍색", 2)],
          },
          {
            result: ci("anthurium", "초록색", 4),
            a: [ci("anthurium", "연분홍색", 3)],
            b: [ci("anthurium", "분홍색", 2), ci("anthurium", "연분홍색", 3)],
          },
          {
            result: ci("anthurium", "야광", 5),
            a: [ci("anthurium", "초록색", 4)],
            b: [ci("anthurium", "연분홍색", 3), ci("anthurium", "초록색", 4)],
          },
        ],
      },
    ],
  },
  poppy: {
    id: "poppy",
    emoji: "🌺",
    thumbnail: "/images/flowers/poppy_big.png",
    name: "Poppy",
    ko: "꽃양귀비",
    level: 5,
    stages: 5,
    season: "일상",
    sellMin: 185,
    sellMax: 740,
    growTime: "24시간",
    seedCost: 60,
    seedColors: ["빨간색", "노란색", "흰색"],
    seedNPC: "블랑코",
    grades: buildGrades([
      {
        color: "빨간색",
        stars: 1,
        image: "/images/flowers/poppy_red.png",
        sellPrice: 185,
      },
      {
        color: "노란색",
        stars: 1,
        image: "/images/flowers/poppy_yellow.png",
        sellPrice: 185,
      },
      {
        color: "흰색",
        stars: 1,
        image: "/images/flowers/poppy_white.png",
        sellPrice: 185,
      },
      {
        color: "주황색",
        stars: 2,
        image: "/images/flowers/poppy_orange.png",
        sellPrice: 280,
      },
      {
        color: "분홍색",
        stars: 2,
        image: "/images/flowers/poppy_pink.png",
        sellPrice: 280,
      },
      {
        color: "검은색",
        stars: 3,
        image: "/images/flowers/poppy_black.png",
        sellPrice: 370,
      },
      {
        color: "보라색",
        stars: 4,
        image: "/images/flowers/poppy_purple.png",
        sellPrice: 465,
      },
      {
        color: "노을빛",
        stars: 5,
        image: "/images/flowers/poppy_sunset.png",
        sellPrice: 740,
      },
    ]),
    cross: [
      {
        combinations: [
          {
            result: ci("poppy", "분홍색", 2),
            a: [ci("poppy", "빨간색", 1)],
            b: [ci("poppy", "흰색", 1)],
          },
          {
            result: ci("poppy", "주황색", 2),
            a: [ci("poppy", "빨간색", 1)],
            b: [ci("poppy", "노란색", 1)],
          },
          {
            result: ci("poppy", "검은색", 3),
            a: [ci("poppy", "주황색", 2)],
            b: [ci("poppy", "빨간색", 1), ci("poppy", "주황색", 2)],
          },
          {
            result: ci("poppy", "보라색", 4),
            a: [ci("poppy", "검은색", 3)],
            b: [ci("poppy", "주황색", 2), ci("poppy", "검은색", 3)],
          },
          {
            result: ci("poppy", "노을빛", 5),
            a: [ci("poppy", "보라색", 4)],
            b: [ci("poppy", "검은색", 3), ci("poppy", "보라색", 4)],
          },
        ],
      },
    ],
  },
  calla: {
    id: "calla",
    emoji: "💐",
    thumbnail: "/images/flowers/calla_big.png",
    name: "Calla",
    ko: "칼라",
    level: 6,
    stages: 5,
    season: "일상",
    sellMin: 250,
    sellMax: 1000,
    growTime: "30시간",
    seedCost: 90,
    seedColors: ["빨간색", "노란색", "흰색"],
    seedNPC: "블랑코",
    grades: buildGrades([
      {
        color: "빨간색",
        stars: 1,
        image: "/images/flowers/calla_red.png",
        sellPrice: 250,
      },
      {
        color: "노란색",
        stars: 1,
        image: "/images/flowers/calla_yellow.png",
        sellPrice: 250,
      },
      {
        color: "흰색",
        stars: 1,
        image: "/images/flowers/calla_white.png",
        sellPrice: 250,
      },
      {
        color: "주황색",
        stars: 2,
        image: "/images/flowers/calla_orange.png",
        sellPrice: 375,
      },
      {
        color: "분홍색",
        stars: 2,
        image: "/images/flowers/calla_pink.png",
        sellPrice: 375,
      },
      {
        color: "검은색",
        stars: 3,
        image: "/images/flowers/calla_black.png",
        sellPrice: 500,
      },
      {
        color: "연분홍색",
        stars: 3,
        image: "/images/flowers/calla_ltpink.png",
        sellPrice: 500,
      },
      {
        color: "보라색",
        stars: 4,
        image: "/images/flowers/calla_purple.png",
        sellPrice: 625,
      },
      {
        color: "노을빛",
        stars: 5,
        image: "/images/flowers/calla_sunset.png",
        sellPrice: 1000,
      },
    ]),
    cross: [
      {
        combinations: [
          {
            result: ci("calla", "분홍색", 2),
            a: [ci("calla", "빨간색", 1)],
            b: [ci("calla", "흰색", 1)],
          },
          {
            result: ci("calla", "주황색", 2),
            a: [ci("calla", "빨간색", 1)],
            b: [ci("calla", "노란색", 1)],
          },
          {
            result: ci("calla", "연분홍색", 3),
            a: [ci("calla", "분홍색", 2)],
            b: [ci("calla", "빨간색", 1), ci("calla", "분홍색", 2)],
          },
          {
            result: ci("calla", "검은색", 3),
            a: [ci("calla", "주황색", 2)],
            b: [ci("calla", "빨간색", 1), ci("calla", "주황색", 2)],
          },
          {
            result: ci("calla", "보라색", 4),
            a: [ci("calla", "검은색", 3)],
            b: [ci("calla", "주황색", 2), ci("calla", "검은색", 3)],
          },
          {
            result: ci("calla", "노을빛", 5),
            a: [ci("calla", "보라색", 4)],
            b: [ci("calla", "검은색", 3), ci("calla", "보라색", 4)],
          },
        ],
      },
    ],
  },
  "morning-glory": {
    id: "morning-glory",
    emoji: "🌷",
    thumbnail: "/images/flowers/morningglory_big.png",
    name: "Morning Glory",
    ko: "나팔꽃",
    level: 6,
    stages: 4,
    season: "일상",
    sellMin: 250,
    sellMax: 1000,
    growTime: "30시간",
    seedCost: 90,
    seedColors: ["빨간색", "노란색", "흰색"],
    seedNPC: "블랑코",
    grades: buildGrades([
      {
        color: "빨간색",
        stars: 1,
        image: "/images/flowers/morningglory_red.png",
        sellPrice: 250,
      },
      {
        color: "노란색",
        stars: 1,
        image: "/images/flowers/morningglory_yellow.png",
        sellPrice: 250,
      },
      {
        color: "흰색",
        stars: 1,
        image: "/images/flowers/morningglory_white.png",
        sellPrice: 250,
      },
      {
        color: "주황색",
        stars: 2,
        image: "/images/flowers/morningglory_orange.png",
        sellPrice: 375,
      },
      {
        color: "분홍색",
        stars: 2,
        image: "/images/flowers/morningglory_pink.png",
        sellPrice: 375,
      },
      {
        color: "검은색",
        stars: 3,
        image: "/images/flowers/morningglory_black.png",
        sellPrice: 500,
      },
      {
        color: "연분홍색",
        stars: 3,
        image: "/images/flowers/morningglory_ltpink.png",
        sellPrice: 500,
      },
      {
        color: "보라색",
        stars: 4,
        image: "/images/flowers/morningglory_purple.png",
        sellPrice: 625,
      },
      {
        color: "야광",
        stars: 5,
        image: "/images/flowers/morningglory_light.png",
        sellPrice: 1000,
      },
    ]),
    cross: [
      {
        combinations: [
          {
            result: ci("morningglory", "분홍색", 2),
            a: [ci("morningglory", "빨간색", 1)],
            b: [ci("morningglory", "흰색", 1)],
          },
          {
            result: ci("morningglory", "주황색", 2),
            a: [ci("morningglory", "빨간색", 1)],
            b: [ci("morningglory", "노란색", 1)],
          },
          {
            result: ci("morningglory", "연분홍색", 3),
            a: [ci("morningglory", "분홍색", 2)],
            b: [
              ci("morningglory", "빨간색", 1),
              ci("morningglory", "분홍색", 2),
            ],
          },
          {
            result: ci("morningglory", "검은색", 3),
            a: [ci("morningglory", "주황색", 2)],
            b: [
              ci("morningglory", "빨간색", 1),
              ci("morningglory", "주황색", 2),
            ],
          },
          {
            result: ci("morningglory", "보라색", 4),
            a: [ci("morningglory", "검은색", 3)],
            b: [
              ci("morningglory", "주황색", 2),
              ci("morningglory", "검은색", 3),
            ],
          },
          {
            result: ci("morningglory", "야광", 5),
            a: [ci("morningglory", "보라색", 4)],
            b: [
              ci("morningglory", "검은색", 3),
              ci("morningglory", "보라색", 4),
            ],
          },
        ],
      },
    ],
  },
  carnation: {
    id: "carnation",
    emoji: "💐",
    thumbnail: "/images/flowers/carnation_big.png",
    name: "Carnation",
    ko: "카네이션",
    level: 7,
    stages: 6,
    season: "일상",
    sellMin: 305,
    sellMax: 1220,
    growTime: "30시간",
    seedCost: 120,
    seedColors: ["빨간색", "노란색", "흰색"],
    seedNPC: "블랑코",
    grades: buildGrades([
      {
        color: "빨간색",
        stars: 1,
        image: "/images/flowers/carnation_red.png",
        sellPrice: 305,
      },
      {
        color: "노란색",
        stars: 1,
        image: "/images/flowers/carnation_yellow.png",
        sellPrice: 305,
      },
      {
        color: "흰색",
        stars: 1,
        image: "/images/flowers/carnation_white.png",
        sellPrice: 305,
      },
      {
        color: "주황색",
        stars: 2,
        image: "/images/flowers/carnation_orange.png",
        sellPrice: 460,
      },
      {
        color: "분홍색",
        stars: 2,
        image: "/images/flowers/carnation_pink.png",
        sellPrice: 460,
      },
      {
        color: "검은색",
        stars: 3,
        image: "/images/flowers/carnation_black.png",
        sellPrice: 610,
      },
      {
        color: "연분홍색",
        stars: 3,
        image: "/images/flowers/carnation_ltpink.png",
        sellPrice: 610,
      },
      {
        color: "초록색",
        stars: 4,
        image: "/images/flowers/carnation_green.png",
        sellPrice: 765,
      },
      {
        color: "야광",
        stars: 5,
        image: "/images/flowers/carnation_light.png",
        sellPrice: 1220,
      },
    ]),
    cross: [
      {
        combinations: [
          {
            result: ci("carnation", "분홍색", 2),
            a: [ci("carnation", "빨간색", 1)],
            b: [ci("carnation", "흰색", 1)],
          },
          {
            result: ci("carnation", "주황색", 2),
            a: [ci("carnation", "빨간색", 1)],
            b: [ci("carnation", "노란색", 1)],
          },
          {
            result: ci("carnation", "검은색", 3),
            a: [ci("carnation", "주황색", 2)],
            b: [ci("carnation", "빨간색", 1), ci("carnation", "주황색", 2)],
          },
          {
            result: ci("carnation", "연분홍색", 3),
            a: [ci("carnation", "분홍색", 2)],
            b: [ci("carnation", "빨간색", 1), ci("carnation", "분홍색", 2)],
          },
          {
            result: ci("carnation", "초록색", 4),
            a: [ci("carnation", "연분홍색", 3)],
            b: [ci("carnation", "분홍색", 2), ci("carnation", "연분홍색", 3)],
          },
          {
            result: ci("carnation", "야광", 5),
            a: [ci("carnation", "초록색", 4)],
            b: [ci("carnation", "연분홍색", 3), ci("carnation", "초록색", 4)],
          },
        ],
      },
    ],
  },
  tulip: {
    id: "tulip",
    emoji: "🌸",
    thumbnail: "/images/flowers/tulip_big.png",
    name: "Tulip",
    ko: "튤립",
    stages: 4,
    level: 8,
    season: "일상",
    sellMin: 330,
    sellMax: 990,
    growTime: "48시간",
    seedCost: 150,
    seedColors: ["빨간색", "노란색", "흰색"],
    seedNPC: "블랑코",
    grades: buildGrades([
      {
        color: "빨간색",
        stars: 1,
        image: "/images/flowers/tulip_red.png",
        sellPrice: 330,
      },
      {
        color: "노란색",
        stars: 1,
        image: "/images/flowers/tulip_yellow.png",
        sellPrice: 330,
      },
      {
        color: "흰색",
        stars: 1,
        image: "/images/flowers/tulip_white.png",
        sellPrice: 330,
      },
      {
        color: "주황색",
        stars: 2,
        image: "/images/flowers/tulip_orange.png",
        sellPrice: 442,
      },
      {
        color: "분홍색",
        stars: 2,
        image: "/images/flowers/tulip_pink.png",
        sellPrice: 442,
      },
      {
        color: "검은색",
        stars: 3,
        image: "/images/flowers/tulip_black.png",
        sellPrice: 551,
      },
      {
        color: "연분홍색",
        stars: 3,
        image: "/images/flowers/tulip_ltpink.png",
        sellPrice: 551,
      },
      {
        color: "보라색",
        stars: 4,
        image: "/images/flowers/tulip_purple.png",
        sellPrice: 660,
      },
      {
        color: "파란색",
        stars: 4,
        image: "/images/flowers/tulip_blue.png",
        sellPrice: 660,
      },
      {
        color: "노을빛",
        stars: 5,
        image: "/images/flowers/tulip_sunset.png",
        sellPrice: 990,
      },
    ]),
    cross: [
      {
        combinations: [
          {
            result: ci("tulip", "분홍색", 2),
            a: [ci("tulip", "빨간색", 1)],
            b: [ci("tulip", "흰색", 1)],
          },
          {
            result: ci("tulip", "주황색", 2),
            a: [ci("tulip", "빨간색", 1)],
            b: [ci("tulip", "노란색", 1)],
          },
          {
            result: ci("tulip", "검은색", 3),
            a: [ci("tulip", "주황색", 2)],
            b: [ci("tulip", "빨간색", 1), ci("tulip", "주황색", 2)],
          },
          {
            result: ci("tulip", "연분홍색", 3),
            a: [ci("tulip", "분홍색", 2)],
            b: [ci("tulip", "빨간색", 1), ci("tulip", "분홍색", 2)],
          },
          {
            result: ci("tulip", "파란색", 4),
            a: [ci("tulip", "연분홍색", 3)],
            b: [ci("tulip", "분홍색", 2), ci("tulip", "연분홍색", 3)],
          },
          {
            result: ci("tulip", "보라색", 4),
            a: [ci("tulip", "검은색", 3)],
            b: [ci("tulip", "주황색", 2), ci("tulip", "검은색", 3)],
          },
          {
            result: ci("tulip", "노을빛", 5),
            a: [ci("tulip", "보라색", 4), ci("tulip", "파란색", 4)],
            b: [ci("tulip", "보라색", 4), ci("tulip", "파란색", 4)],
          },
        ],
      },
    ],
  },
  lily: {
    id: "lily",
    emoji: "🌸",
    thumbnail: "/images/flowers/lily_big.png",
    name: "Lily",
    ko: "백합",
    level: 9,
    stages: 6,
    season: "일상",
    sellMin: 415,
    sellMax: 1660,
    growTime: "48시간",
    seedCost: 200,
    seedColors: ["빨간색", "노란색", "흰색"],
    seedNPC: "블랑코",
    grades: buildGrades([
      {
        color: "빨간색",
        stars: 1,
        image: "/images/flowers/lily_red.png",
        sellPrice: 415,
      },
      {
        color: "노란색",
        stars: 1,
        image: "/images/flowers/lily_yellow.png",
        sellPrice: 415,
      },
      {
        color: "흰색",
        stars: 1,
        image: "/images/flowers/lily_white.png",
        sellPrice: 415,
      },
      {
        color: "주황색",
        stars: 2,
        image: "/images/flowers/lily_orange.png",
        sellPrice: 625,
      },
      {
        color: "분홍색",
        stars: 2,
        image: "/images/flowers/lily_pink.png",
        sellPrice: 625,
      },
      {
        color: "검은색",
        stars: 3,
        image: "/images/flowers/lily_black.png",
        sellPrice: 830,
      },
      {
        color: "연분홍색",
        stars: 3,
        image: "/images/flowers/lily_ltpink.png",
        sellPrice: 830,
      },
      {
        color: "보라색",
        stars: 4,
        image: "/images/flowers/lily_purple.png",
        sellPrice: 1040,
      },
      {
        color: "초록색",
        stars: 4,
        image: "/images/flowers/lily_green.png",
        sellPrice: 1040,
      },
      {
        color: "야광",
        stars: 5,
        image: "/images/flowers/lily_light.png",
        sellPrice: 1660,
      },
    ]),
    cross: [
      {
        combinations: [
          {
            result: ci("lily", "분홍색", 2),
            a: [ci("lily", "빨간색", 1)],
            b: [ci("lily", "흰색", 1)],
          },
          {
            result: ci("lily", "주황색", 2),
            a: [ci("lily", "빨간색", 1)],
            b: [ci("lily", "노란색", 1)],
          },
          {
            result: ci("lily", "연분홍색", 3),
            a: [ci("lily", "분홍색", 2)],
            b: [ci("lily", "빨간색", 1), ci("lily", "분홍색", 2)],
          },
          {
            result: ci("lily", "검은색", 3),
            a: [ci("lily", "주황색", 2)],
            b: [ci("lily", "빨간색", 1), ci("lily", "주황색", 2)],
          },
          {
            result: ci("lily", "보라색", 4),
            a: [ci("lily", "검은색", 3)],
            b: [ci("lily", "주황색", 2), ci("lily", "검은색", 3)],
          },
          {
            result: ci("lily", "초록색", 4),
            a: [ci("lily", "연분홍색", 3)],
            b: [ci("lily", "분홍색", 2), ci("lily", "연분홍색", 3)],
          },
          {
            result: ci("lily", "야광", 5),
            a: [ci("lily", "보라색", 4), ci("lily", "초록색", 4)],
            b: [ci("lily", "보라색", 4), ci("lily", "초록색", 4)],
          },
        ],
      },
    ],
  },
  rose: {
    id: "rose",
    emoji: "🌹",
    thumbnail: "/images/flowers/rose_big.png",
    name: "Rose",
    ko: "장미",
    desc: "로맨틱한 꽃",
    level: 10,
    stages: 7,
    season: "일상",
    sellMin: 485,
    sellMax: 1945,
    growTime: "72시간",
    seedCost: 300,
    seedColors: ["빨간색", "노란색", "흰색"],
    seedNPC: "블랑코",
    grades: buildGrades([
      {
        color: "빨간색",
        stars: 1,
        image: "/images/flowers/rose_red.png",
        sellPrice: 485,
      },
      {
        color: "노란색",
        stars: 1,
        image: "/images/flowers/rose_yellow.png",
        sellPrice: 485,
      },
      {
        color: "흰색",
        stars: 1,
        image: "/images/flowers/rose_white.png",
        sellPrice: 485,
      },
      {
        color: "주황색",
        stars: 2,
        image: "/images/flowers/rose_orange.png",
        sellPrice: 730,
      },
      {
        color: "분홍색",
        stars: 2,
        image: "/images/flowers/rose_pink.png",
        sellPrice: 730,
      },
      {
        color: "검은색",
        stars: 3,
        image: "/images/flowers/rose_black.png",
        sellPrice: 970,
      },
      {
        color: "연분홍색",
        stars: 3,
        image: "/images/flowers/rose_ltpink.png",
        sellPrice: 970,
      },
      {
        color: "보라색",
        stars: 4,
        image: "/images/flowers/rose_purple.png",
        sellPrice: 1215,
      },
      {
        color: "파란색",
        stars: 4,
        image: "/images/flowers/rose_blue.png",
        sellPrice: 1215,
      },
      {
        color: "노을빛",
        stars: 5,
        image: "/images/flowers/rose_sunset.png",
        sellPrice: 1945,
      },
      {
        color: "야광",
        stars: 5,
        image: "/images/flowers/rose_light.png",
        sellPrice: 1945,
      },
    ]),
    cross: [
      {
        combinations: [
          {
            result: ci("rose", "분홍색", 2),
            a: [ci("rose", "빨간색", 1)],
            b: [ci("rose", "흰색", 1), ci("rose", "노란색", 1)],
          },
          {
            result: ci("rose", "검은색", 3),
            a: [ci("rose", "주황색", 2)],
            b: [ci("rose", "빨간색", 1), ci("rose", "주황색", 2)],
          },
          {
            result: ci("rose", "연분홍색", 3),
            a: [ci("rose", "분홍색", 2)],
            b: [ci("rose", "빨간색", 1), ci("rose", "분홍색", 2)],
          },
          {
            result: ci("rose", "보라색", 4),
            a: [ci("rose", "검은색", 3)],
            b: [ci("rose", "주황색", 2), ci("rose", "검은색", 3)],
          },
          {
            result: ci("rose", "파란색", 4),
            a: [ci("rose", "연분홍색", 3)],
            b: [ci("rose", "분홍색", 2), ci("rose", "연분홍색", 3)],
          },
          {
            result: ci("rose", "야광", 5),
            a: [ci("rose", "파란색", 4), ci("rose", "보라색", 4)],
            b: [ci("rose", "파란색", 4), ci("rose", "보라색", 4)],
          },
          {
            result: ci("rose", "노을빛", 5),
            a: [ci("rose", "파란색", 4), ci("rose", "보라색", 4)],
            b: [ci("rose", "파란색", 4), ci("rose", "보라색", 4)],
          },
        ],
      },
    ],
  },
};
