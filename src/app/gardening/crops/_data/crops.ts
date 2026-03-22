// ── Types ─────────────────────────────────────────────────────────────────────

export interface Crop {
  id: string;
  emoji: string;
  thumbnail: string;
  name: string;
  ko: string;
  desc?: string;
  level: number;
  season: string;
}

/** 작물은 색상 구분 없이 성급(1~5)만 존재한다. 성급별 이미지는 없고 썸네일만 쓴다. */
export interface CropGrade {
  stars: number;
  sellPrice: number;
}

export interface CropDetail extends Crop {
  thumbnail: string;
  sellMin: number;
  sellMax: number;
  growTime: string;
  grades: CropGrade[];
  seedCost: number;
  seedNPC: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** 성급별 판매가는 작물마다 직접 기입 (배율 계산 없음). */
const cropGrades = (
  sellPrice1: number,
  sellPrice2: number,
  sellPrice3: number,
  sellPrice4: number,
  sellPrice5: number,
): CropGrade[] => [
  { stars: 1, sellPrice: sellPrice1 },
  { stars: 2, sellPrice: sellPrice2 },
  { stars: 3, sellPrice: sellPrice3 },
  { stars: 4, sellPrice: sellPrice4 },
  { stars: 5, sellPrice: sellPrice5 },
];

/** 목록 요약용 sellMin·sellMax는 항상 1성·5성 판매가와 동일하게 둔다. */
const gradesWithBookendRange = (
  sellPrice1: number,
  sellPrice2: number,
  sellPrice3: number,
  sellPrice4: number,
  sellPrice5: number,
): Pick<CropDetail, "sellMin" | "sellMax" | "grades"> => ({
  sellMin: sellPrice1,
  sellMax: sellPrice5,
  grades: cropGrades(
    sellPrice1,
    sellPrice2,
    sellPrice3,
    sellPrice4,
    sellPrice5,
  ),
});

// ── List (요약) ───────────────────────────────────────────────────────────────

export const CROPS: Crop[] = [
  {
    id: "tomato",
    emoji: "🍅",
    thumbnail: "/images/crops/tomato_big.png",
    name: "Tomato",
    ko: "토마토",
    level: 1,
    season: "일상",
  },
  {
    id: "potato",
    emoji: "🥔",
    thumbnail: "/images/crops/potato_big.png",
    name: "Potato",
    ko: "감자",
    level: 1,
    season: "일상",
  },
  {
    id: "wheat",
    emoji: "🌾",
    thumbnail: "/images/crops/wheat_big.png",
    name: "Wheat",
    ko: "밀",
    level: 2,
    season: "일상",
  },
  {
    id: "lettuce",
    emoji: "🥬",
    thumbnail: "/images/crops/lettuce_big.png",
    name: "Lettuce",
    ko: "양상추",
    level: 3,
    season: "일상",
  },
  {
    id: "pineapple",
    emoji: "🍍",
    thumbnail: "/images/crops/pineapple_big.png",
    name: "Pineapple",
    ko: "파인애플",
    level: 4,
    season: "일상",
  },
  {
    id: "carrot",
    emoji: "🥕",
    thumbnail: "/images/crops/carrot_big.png",
    name: "Carrot",
    ko: "당근",
    level: 5,
    season: "일상",
  },
  {
    id: "strawberry",
    emoji: "🍓",
    thumbnail: "/images/crops/strawberry_big.png",
    name: "Strawberry",
    ko: "딸기",
    level: 6,
    season: "일상",
  },
  {
    id: "corn",
    emoji: "🌽",
    thumbnail: "/images/crops/corn_big.png",
    name: "Corn",
    ko: "옥수수",
    level: 6,
    season: "일상",
  },
  {
    id: "grape",
    emoji: "🍇",
    thumbnail: "/images/crops/grape_big.png",
    name: "Grape",
    ko: "포도",
    level: 7,
    season: "일상",
  },
  {
    id: "eggplant",
    emoji: "🍆",
    thumbnail: "/images/crops/eggplant_big.png",
    name: "Eggplant",
    ko: "가지",
    level: 8,
    season: "일상",
  },
];

// ── Detail ───────────────────────────────────────────────────────────────────

const findCrop = (id: string): Crop => {
  const crop = CROPS.find((item) => item.id === id);
  if (!crop) {
    throw new Error(`Unknown crop id: ${id}`);
  }
  return crop;
};

export const CROP_DETAILS: Record<string, CropDetail> = {
  tomato: {
    ...findCrop("tomato"),
    ...gradesWithBookendRange(30, 40, 50, 60, 90),
    growTime: "8시간",
    seedCost: 10,
    seedNPC: "블랑코",
  },
  potato: {
    ...findCrop("potato"),
    ...gradesWithBookendRange(90, 120, 150, 180, 270),
    growTime: "8시간",
    seedCost: 30,
    seedNPC: "블랑코",
  },
  wheat: {
    ...findCrop("wheat"),
    ...gradesWithBookendRange(285, 381, 475, 570, 855),
    growTime: "10시간",
    seedCost: 95,
    seedNPC: "블랑코",
  },
  lettuce: {
    ...findCrop("lettuce"),
    ...gradesWithBookendRange(435, 582, 726, 870, 1305),
    growTime: "12시간",
    seedCost: 145,
    seedNPC: "블랑코",
  },
  pineapple: {
    ...findCrop("pineapple"),
    ...gradesWithBookendRange(52, 69, 86, 104, 156),
    growTime: "24시간",
    seedCost: 15,
    seedNPC: "블랑코",
  },
  carrot: {
    ...findCrop("carrot"),
    ...gradesWithBookendRange(155, 207, 258, 310, 465),
    growTime: "14시간",
    seedCost: 50,
    seedNPC: "블랑코",
  },
  strawberry: {
    ...findCrop("strawberry"),
    ...gradesWithBookendRange(375, 502, 626, 750, 1125),
    growTime: "16시간",
    seedCost: 125,
    seedNPC: "블랑코",
  },
  corn: {
    ...findCrop("corn"),
    ...gradesWithBookendRange(515, 690, 860, 1030, 1545),
    growTime: "16시간",
    seedCost: 170,
    seedNPC: "블랑코",
  },
  grape: {
    ...findCrop("grape"),
    ...gradesWithBookendRange(480, 643, 801, 960, 1440),
    growTime: "20시간",
    seedCost: 160,
    seedNPC: "블랑코",
  },
  eggplant: {
    ...findCrop("eggplant"),
    ...gradesWithBookendRange(406, 544, 677, 812, 1218),
    growTime: "18시간",
    seedCost: 135,
    seedNPC: "블랑코",
  },
};
