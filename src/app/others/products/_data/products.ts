// ── Types ─────────────────────────────────────────────────────────────────────

export type ProductCategory = "mushroom" | "fruit" | "wood" | "stone";

export interface Product {
  id: string;
  category: ProductCategory;
  ko: string;
  location: string;
  respawnTime: string;
  sellPrice: number;
  /** 공개 정적 이미지가 있을 때만 */
  thumbnail?: string;
  strange?: {
    thumbnail1?: string;
    thumbnail2?: string;
    thumbnail3?: string;
  };
  notes?: string;
  stamina?: number;
}

// ── Data ─────────────────────────────────────────────────────────────────────

export const PRODUCTS: Product[] = [
  // 버섯
  {
    id: "oyster-mushroom",
    category: "mushroom",
    ko: "느타리버섯",
    location: "온천산",
    respawnTime: "3분 30초",
    sellPrice: 100,
    thumbnail: "/images/others/mushrooms/mushroom_oyster.png",
    strange: {
      thumbnail1: "/images/others/mushrooms/mushroom_oyster_st1.png",
      thumbnail2: "/images/others/mushrooms/mushroom_oyster_st2.png",
      thumbnail3: "/images/others/mushrooms/mushroom_oyster_st3.png",
    },
  },
  {
    id: "shiitake-mushroom",
    category: "mushroom",
    ko: "표고버섯",
    location: "어촌",
    respawnTime: "3분 30초",
    thumbnail: "/images/others/mushrooms/mushroom_shiitake.png",
    sellPrice: 100,
    strange: {
      thumbnail1: "/images/others/mushrooms/mushroom_shiitake_st1.png",
      thumbnail2: "/images/others/mushrooms/mushroom_shiitake_st2.png",
      thumbnail3: "/images/others/mushrooms/mushroom_shiitake_st3.png",
    },
  },
  {
    id: "button-mushroom",
    category: "mushroom",
    ko: "양송이버섯",
    location: "꽃밭",
    respawnTime: "3분 30초",
    sellPrice: 100,
    thumbnail: "/images/others/mushrooms/mushroom_button.png",
    strange: {
      thumbnail1: "/images/others/mushrooms/mushroom_button_st1.png",
      thumbnail2: "/images/others/mushrooms/mushroom_button_st2.png",
      thumbnail3: "/images/others/mushrooms/mushroom_button_st3.png",
    },
  },
  {
    id: "porcini-mushroom",
    category: "mushroom",
    ko: "그물버섯",
    location: "숲",
    respawnTime: "3분 30초",
    sellPrice: 100,
    thumbnail: "/images/others/mushrooms/mushroom_porcini.png",
    strange: {
      thumbnail1: "/images/others/mushrooms/mushroom_porcini_st1.png",
      thumbnail2: "/images/others/mushrooms/mushroom_porcini_st2.png",
      thumbnail3: "/images/others/mushrooms/mushroom_porcini_st3.png",
    },
  },
  {
    id: "black-truffle",
    category: "mushroom",
    ko: "검은 트러플",
    location: "숲-숲속 섬",
    respawnTime: "12분",
    sellPrice: 100,
    thumbnail: "/images/others/mushrooms/mushroom_truffle.png",
  },
  {
    id: "pine-mushroom",
    category: "mushroom",
    ko: "송이버섯",
    location: "숲-영혼의 참나무 숲",
    respawnTime: "3분 30초",
    sellPrice: 100,
    thumbnail: "/images/others/mushrooms/mushroom_pine.png",
    notes: "이벤트 전용",
  },
  // 과일
  {
    id: "blueberry",
    category: "fruit",
    ko: "블루베리",
    location: "거주 구역 1 ~ 12",
    respawnTime: "2분",
    sellPrice: 100,
    thumbnail: "/images/others/fruits/blueberry.png",
  },
  {
    id: "raspberry",
    category: "fruit",
    ko: "라즈베리",
    location: "거주 구역 1 ~ 4",
    respawnTime: "2분",
    sellPrice: 100,
    thumbnail: "/images/others/fruits/raspberry.png",
  },
  {
    id: "apple",
    category: "fruit",
    ko: "사과",
    location: "거주 구역 7 ~ 12",
    respawnTime: "2분",
    sellPrice: 100,
    stamina: 1,
    thumbnail: "/images/others/fruits/apple.png",
  },
  {
    id: "orange",
    category: "fruit",
    ko: "오렌지",
    location: "거주 구역 1 ~ 6",
    respawnTime: "2분",
    sellPrice: 100,
    stamina: 1,
    thumbnail: "/images/others/fruits/orange.png",
  },
];
