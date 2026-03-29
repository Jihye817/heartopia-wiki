// ── Types ─────────────────────────────────────────────────────────────────────

export type FoodAvailability = "always" | "event";

// 재료 단일 아이템
export interface IngredientItem {
  id: string;
  name: string;
  ko: string;
  thumbnail?: string;
  href?: string;
}

// 재료 슬롯
export interface IngredientSlot {
  amount: number;
  specific?: IngredientItem;
  groupLabel?: string;
  groupEmoji?: string;
  options?: IngredientItem[];
}

export interface Food {
  id: string;
  emoji: string;
  thumbnail?: string;
  name: string;
  ko: string;
  desc?: string;
  level: number;
  sellMin: number;
  sellMax: number;
  availability: FoodAvailability;
}

export interface FoodGrade {
  stars: number;
  sellPrice: number;
  sellEventPrice: number;
}

export interface FoodDetail extends Food {
  ingredients: IngredientSlot[];
  grades: FoodGrade[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function grades(prices: [number, number, number, number, number]): FoodGrade[] {
  return prices.map((price, i) => ({
    stars: i + 1,
    sellPrice: price,
    sellEventPrice: 0,
  }));
}

// ── Data ──────────────────────────────────────────────────────────────────────
export const FOODS: FoodDetail[] = [
  {
    id: "veggie-salad",
    emoji: "🥗",
    thumbnail: "/images/foods/veggie_salad.png",
    name: "Veggie Salad",
    ko: "베지 샐러드",
    level: 1,
    sellMin: 90,
    sellMax: 720,
    availability: "always",
    ingredients: [
      {
        amount: 2,
        groupLabel: "채소 (어떤 채소든 상관없음)",
        groupEmoji: "🥬",
        options: [
          {
            id: "tomato",
            name: "Tomato",
            ko: "토마토",
            thumbnail: "/images/crops/tomato_big.png",
            href: "/gardening/crops/detail/tomato",
          },
          {
            id: "lettuce",
            name: "Lettuce",
            ko: "양상추",
            thumbnail: "/images/crops/lettuce_big.png",
            href: "/gardening/crops/detail/lettuce",
          },
          {
            id: "potato",
            name: "Potato",
            ko: "감자",
            thumbnail: "/images/crops/potato_big.png",
            href: "/gardening/crops/detail/potato",
          },
          {
            id: "corn",
            name: "Corn",
            ko: "옥수수",
            thumbnail: "/images/crops/corn_big.png",
            href: "/gardening/crops/detail/corn",
          },
          {
            id: "carrot",
            name: "Carrot",
            ko: "당근",
            thumbnail: "/images/crops/carrot_big.png",
            href: "/gardening/crops/detail/carrot",
          },
          {
            id: "wheat",
            name: "Wheat",
            ko: "밀",
            thumbnail: "/images/crops/wheat_big.png",
            href: "/gardening/crops/detail/wheat",
          },
          {
            id: "eggplant",
            name: "Eggplant",
            ko: "가지",
            thumbnail: "/images/crops/eggplant_big.png",
            href: "/gardening/crops/detail/eggplant",
          },
        ],
      },
    ],
    grades: grades([90, 135, 180, 360, 720]),
  },
  {
    id: "mixed-jam",
    emoji: "🍯",
    thumbnail: "/images/foods/mixed_jam.png",
    name: "Mixed Jam",
    ko: "믹스드 잼",
    level: 1,
    sellMin: 160,
    sellMax: 1280,
    availability: "always",
    ingredients: [
      {
        amount: 4,
        groupLabel: "잼 재료 (어떤 잼 재료든 상관없음)",
        groupEmoji: "🍎",
        options: [
          {
            id: "blueberry",
            name: "Blueberry",
            ko: "블루베리",
            thumbnail: "/images/others/fruits/blueberry.png",
            href: "/others/products/detail/blueberry",
          },
          {
            id: "raspberry",
            name: "Raspberry",
            ko: "라즈베리",
            thumbnail: "/images/others/fruits/raspberry.png",
            href: "/others/products/detail/raspberry",
          },
          {
            id: "tomato",
            name: "Tomato",
            ko: "토마토",
            thumbnail: "/images/crops/tomato_big.png",
            href: "/gardening/crops/detail/tomato",
          },
          {
            id: "apple",
            name: "Apple",
            ko: "사과",
            thumbnail: "/images/others/fruits/apple.png",
            href: "/others/products/detail/apple",
          },
          {
            id: "orange",
            name: "Orange",
            ko: "오렌지",
            thumbnail: "/images/others/fruits/orange.png",
            href: "/others/products/detail/orange",
          },
          {
            id: "strawberry",
            name: "Strawberry",
            ko: "딸기",
            thumbnail: "/images/crops/strawberry_big.png",
            href: "/gardening/crops/detail/strawberry",
          },
          {
            id: "pineapple",
            name: "Pineapple",
            ko: "파인애플",
            thumbnail: "/images/crops/pineapple_big.png",
            href: "/gardening/crops/detail/pineapple",
          },
          {
            id: "grape",
            name: "Grape",
            ko: "포도",
            thumbnail: "/images/crops/grape_big.png",
            href: "/gardening/crops/detail/grape",
          },
        ],
      },
    ],
    grades: grades([160, 240, 320, 640, 1280]),
  },
  {
    id: "raspberry-jam",
    emoji: "🍯",
    thumbnail: "/images/foods/raspberry_jam.png",
    name: "Raspberry Jam",
    ko: "라즈베리 잼",
    level: 1,
    sellMin: 250,
    sellMax: 2000,
    availability: "always",
    desc: "믹스드 잼에 라즈베리 4개를 넣어 해금",
    ingredients: [
      {
        amount: 4,
        specific: {
          id: "raspberry",
          name: "Raspberry",
          ko: "라즈베리",
          thumbnail: "/images/others/fruits/raspberry.png",
          href: "/others/products/detail/raspberry",
        },
      },
    ],
    grades: grades([250, 375, 500, 1000, 2000]),
  },
  {
    id: "ketchup",
    emoji: "🍅",
    thumbnail: "/images/foods/ketchup.png",
    name: "Ketchup",
    ko: "케첩",
    level: 1,
    sellMin: 180,
    sellMax: 1440,
    availability: "always",
    desc: "믹스드 잼에 토마토 4개를 넣어 해금",
    ingredients: [
      {
        amount: 4,
        specific: {
          id: "tomato",
          name: "Tomato",
          ko: "토마토",
          thumbnail: "/images/crops/tomato_big.png",
          href: "/gardening/crops/detail/tomato",
        },
      },
    ],
    grades: grades([180, 270, 360, 720, 1440]),
  },
  {
    id: "blueberry-jam",
    emoji: "🍯",
    thumbnail: "/images/foods/blueberry_jam.png",
    name: "Blueberry Jam",
    ko: "블루베리 잼",
    level: 1,
    sellMin: 170,
    sellMax: 1360,
    availability: "always",
    desc: "믹스드 잼에 블루베리 4개를 넣어 해금",
    ingredients: [
      {
        amount: 4,
        specific: {
          id: "blueberry",
          name: "Blueberry",
          ko: "블루베리",
          thumbnail: "/images/others/fruits/blueberry.png",
          href: "/others/products/detail/blueberry",
        },
      },
    ],
    grades: grades([170, 255, 340, 680, 1360]),
  },
  {
    id: "apple-jam",
    emoji: "🍯",
    thumbnail: "/images/foods/apple_jam.png",
    name: "Apple Jam",
    ko: "사과 잼",
    level: 1,
    sellMin: 270,
    sellMax: 2160,
    availability: "always",
    desc: "믹스드 잼에 사과 4개를 넣어 해금",
    ingredients: [
      {
        amount: 4,
        specific: {
          id: "apple",
          name: "Apple",
          ko: "사과",
          thumbnail: "/images/others/fruits/apple.png",
          href: "/others/products/detail/apple",
        },
      },
    ],
    grades: grades([270, 405, 540, 1080, 2160]),
  },
  {
    id: "orange-jam",
    emoji: "🍯",
    thumbnail: "/images/foods/orange_jam.png",
    name: "Orange Jam",
    ko: "오렌지 잼",
    level: 1,
    sellMin: 270,
    sellMax: 2160,
    availability: "always",
    desc: "믹스드 잼에 오렌지 4개를 넣어 해금",
    ingredients: [
      {
        amount: 4,
        specific: {
          id: "orange",
          name: "Orange",
          ko: "오렌지",
          thumbnail: "/images/others/fruits/orange.png",
          href: "/others/products/detail/orange",
        },
      },
    ],
    grades: grades([270, 405, 540, 1080, 2160]),
  },
  {
    id: "strawberry-jam",
    emoji: "🍯",
    thumbnail: "/images/foods/strawberry_jam.png",
    name: "Strawberry Jam",
    ko: "딸기 잼",
    level: 1,
    sellMin: 1580,
    sellMax: 12640,
    availability: "always",
    desc: "믹스드 잼에 딸기 4개를 넣어 해금",
    ingredients: [
      {
        amount: 4,
        specific: {
          id: "strawberry",
          name: "Strawberry",
          ko: "딸기",
          thumbnail: "/images/crops/strawberry_big.png",
          href: "/gardening/crops/detail/strawberry",
        },
      },
    ],
    grades: grades([1580, 2370, 3160, 6320, 12640]),
  },
  {
    id: "pineapple-jam",
    emoji: "🍯",
    // thumbnail: "/images/foods/pineapple_jam.png",
    name: "Pineapple Jam",
    ko: "파인애플 잼",
    level: 1,
    sellMin: 380,
    sellMax: 3040,
    availability: "always",
    desc: "믹스드 잼에 파인애플 4개를 넣어 해금",
    ingredients: [
      {
        amount: 4,
        specific: {
          id: "pineapple",
          name: "Pineapple",
          ko: "파인애플",
          thumbnail: "/images/crops/pineapple_big.png",
          href: "/gardening/crops/detail/pineapple",
        },
      },
    ],
    grades: grades([380, 570, 760, 1520, 3040]),
  },
  {
    id: "grape-jam",
    emoji: "🍯",
    // thumbnail: "/images/foods/grape_jam.png",
    name: "Grape Jam",
    ko: "포도 잼",
    level: 1,
    sellMin: 2020,
    sellMax: 16160,
    availability: "always",
    desc: "믹스드 잼에 포도 4개를 넣어 해금",
    ingredients: [
      {
        amount: 4,
        specific: {
          id: "grape",
          name: "Grape",
          ko: "포도",
          thumbnail: "/images/crops/grape_big.png",
          href: "/gardening/crops/detail/grape",
        },
      },
    ],
    grades: grades([2020, 3030, 4040, 8080, 16160]),
  },
  {
    id: "fish-and-chips",
    emoji: "🐟",
    thumbnail: "/images/foods/fish_and_chips.png",
    name: "Fish and Chips",
    ko: "피시 앤 칩스",
    level: 1,
    sellMin: 310,
    sellMax: 2480,
    availability: "always",
    ingredients: [
      {
        amount: 2,
        groupLabel: "물고기 (어떤 생선이든 상관없음)",
        groupEmoji: "🐟",
        options: [],
      },
      {
        amount: 2,
        specific: {
          id: "potato",
          name: "Potato",
          ko: "감자",
          thumbnail: "/images/crops/potato_big.png",
          href: "/gardening/crops/detail/potato",
        },
      },
    ],
    grades: grades([310, 465, 620, 1240, 2480]),
  },
  {
    id: "strange-food",
    emoji: "🍽️",
    thumbnail: "/images/foods/strange_food.png",
    name: "Strange Food",
    ko: "괴상한 음식",
    level: 1,
    sellMin: 30,
    sellMax: 30,
    availability: "always",
    desc: "음식이 완성되기 전에 클릭",
    ingredients: [
      {
        amount: 1,
        groupLabel: "음식 (어떤 음식이든 상관없음)",
        groupEmoji: "🍽️",
        options: [],
      },
    ],
    grades: grades([30, 30, 30, 30, 30]),
  },
  {
    id: "strange-drink",
    emoji: "🥤",
    thumbnail: "/images/foods/strange_drink.png",
    name: "Strange Drink",
    ko: "괴상한 음료",
    level: 1,
    sellMin: 30,
    sellMax: 30,
    availability: "always",
    desc: "음료가 완성되기 전에 클릭",
    ingredients: [
      {
        amount: 1,
        groupLabel: "음료 (어떤 음료이든 상관없음)",
        groupEmoji: "🥤",
        options: [],
      },
    ],
    grades: grades([30, 30, 30, 30, 30]),
  },
  {
    id: "chocolate-sauce",
    emoji: "🍫",
    // thumbnail: "/images/foods/chocolate_sauce.png",
    name: "Chocolate Sauce",
    ko: "초콜릿 소스",
    level: 1,
    sellMin: 0,
    sellMax: 0,
    availability: "always",
    ingredients: [
      {
        amount: 4,
        specific: {
          id: "cocoa",
          name: "Cocoa",
          ko: "코코아",
        },
      },
    ],
    grades: grades([0, 0, 0, 0, 0]),
  },
  {
    id: "cheesecake",
    emoji: "🍰",
    thumbnail: "/images/foods/cheesecake.png",
    name: "Cheesecake",
    ko: "치즈케이크",
    level: 1,
    sellMin: 480,
    sellMax: 3840,
    availability: "always",
    ingredients: [
      {
        amount: 1,
        specific: {
          id: "cheese",
          name: "Cheese",
          ko: "치즈",
        },
      },
      {
        amount: 1,
        specific: {
          id: "milk",
          name: "Milk",
          ko: "우유",
        },
      },
      {
        amount: 1,
        specific: {
          id: "wheat",
          name: "Wheat",
          ko: "밀",
          thumbnail: "/images/crops/wheat_big.png",
          href: "/gardening/crops/detail/wheat",
        },
      },
    ],
    grades: grades([480, 720, 960, 1920, 3840]),
  },
  {
    id: "original-roll-cake",
    emoji: "🍥",
    thumbnail: "/images/foods/original_roll_cake.png",
    name: "Original Roll Cake",
    ko: "오리지널 롤케이크",
    level: 1,
    sellMin: 550,
    sellMax: 4400,
    availability: "always",
    ingredients: [
      {
        amount: 1,
        specific: {
          id: "egg",
          name: "Egg",
          ko: "달걀",
        },
      },
      {
        amount: 1,
        specific: {
          id: "milk",
          name: "Milk",
          ko: "우유",
        },
      },
      {
        amount: 2,
        groupLabel: "무지개 사탕 (어떤 무지개 사탕이든 상관없음)",
        groupEmoji: "🍬",
        options: [],
      },
    ],
    grades: grades([550, 825, 1100, 2200, 4400]),
  },
  {
    id: "red-roll-cake",
    emoji: "🍥",
    // thumbnail: "/images/foods/red_roll_cake.png",
    name: "Red Roll Cake",
    ko: "레드 롤케이크",
    level: 1,
    sellMin: 670,
    sellMax: 5360,
    availability: "always",
    desc: "오리지널 롤케이크에 빨간색 사탕 2개를 넣어 해금",
    ingredients: [
      {
        amount: 1,
        specific: {
          id: "egg",
          name: "Egg",
          ko: "달걀",
        },
      },
      {
        amount: 1,
        specific: {
          id: "milk",
          name: "Milk",
          ko: "우유",
        },
      },
      {
        amount: 2,
        specific: {
          id: "red-candy",
          name: "Red Candy",
          ko: "빨간색 사탕",
        },
      },
    ],
    grades: grades([670, 1005, 1340, 2680, 5360]),
  },
  {
    id: "orange-roll-cake",
    emoji: "🍥",
    // thumbnail: "/images/foods/orange_roll_cake.png",
    name: "Orange Roll Cake",
    ko: "오렌지 롤케이크",
    level: 1,
    sellMin: 670,
    sellMax: 5360,
    availability: "always",
    desc: "오리지널 롤케이크에 주황색 사탕 2개를 넣어 해금",
    ingredients: [
      { amount: 1, specific: { id: "egg", name: "Egg", ko: "달걀" } },
      { amount: 1, specific: { id: "milk", name: "Milk", ko: "우유" } },
      {
        amount: 2,
        specific: {
          id: "orange-candy",
          name: "Orange Candy",
          ko: "주황색 사탕",
        },
      },
    ],
    grades: grades([670, 1005, 1340, 2680, 5360]),
  },
  {
    id: "yellow-roll-cake",
    emoji: "🍥",
    // thumbnail: "/images/foods/yellow_roll_cake.png",
    name: "Yellow Roll Cake",
    ko: "옐로우 롤케이크",
    level: 1,
    sellMin: 670,
    sellMax: 5360,
    availability: "always",
    desc: "오리지널 롤케이크에 노란색 사탕 2개를 넣어 해금",
    ingredients: [
      { amount: 1, specific: { id: "egg", name: "Egg", ko: "달걀" } },
      { amount: 1, specific: { id: "milk", name: "Milk", ko: "우유" } },
      {
        amount: 2,
        specific: {
          id: "yellow-candy",
          name: "Yellow Candy",
          ko: "노란색 사탕",
        },
      },
    ],
    grades: grades([670, 1005, 1340, 2680, 5360]),
  },
  {
    id: "green-roll-cake",
    emoji: "🍥",
    // thumbnail: "/images/foods/green_roll_cake.png",
    name: "Green Roll Cake",
    ko: "그린 롤케이크",
    level: 1,
    sellMin: 670,
    sellMax: 5360,
    availability: "always",
    desc: "오리지널 롤케이크에 초록색 사탕 2개를 넣어 해금",
    ingredients: [
      { amount: 1, specific: { id: "egg", name: "Egg", ko: "달걀" } },
      { amount: 1, specific: { id: "milk", name: "Milk", ko: "우유" } },
      {
        amount: 2,
        specific: {
          id: "green-candy",
          name: "Green Candy",
          ko: "초록색 사탕",
        },
      },
    ],
    grades: grades([670, 1005, 1340, 2680, 5360]),
  },
  {
    id: "sky-roll-cake",
    emoji: "🍥",
    // thumbnail: "/images/foods/sky_roll_cake.png",
    name: "Sky Roll Cake",
    ko: "스카이 롤케이크",
    level: 1,
    sellMin: 570,
    sellMax: 4560,
    availability: "always",
    desc: "오리지널 롤케이크에 파란색 사탕 2개를 넣어 해금",
    ingredients: [
      { amount: 1, specific: { id: "egg", name: "Egg", ko: "달걀" } },
      { amount: 1, specific: { id: "milk", name: "Milk", ko: "우유" } },
      {
        amount: 2,
        specific: {
          id: "sky-candy",
          name: "Sky Candy",
          ko: "파란색 사탕",
        },
      },
    ],
    grades: grades([570, 855, 1140, 2280, 4560]),
  },
  {
    id: "blue-roll-cake",
    emoji: "🍥",
    // thumbnail: "/images/foods/blue_roll_cake.png",
    name: "Blue Roll Cake",
    ko: "블루 롤케이크",
    level: 1,
    sellMin: 570,
    sellMax: 4560,
    availability: "always",
    desc: "오리지널 롤케이크에 남색 사탕 2개를 넣어 해금",
    ingredients: [
      { amount: 1, specific: { id: "egg", name: "Egg", ko: "달걀" } },
      { amount: 1, specific: { id: "milk", name: "Milk", ko: "우유" } },
      {
        amount: 2,
        specific: {
          id: "blue-candy",
          name: "Blue Candy",
          ko: "남색 사탕",
        },
      },
    ],
    grades: grades([570, 855, 1140, 2280, 4560]),
  },
  {
    id: "purple-roll-cake",
    emoji: "🍥",
    // thumbnail: "/images/foods/purple_roll_cake.png",
    name: "Purple Roll Cake",
    ko: "퍼플 롤케이크",
    level: 1,
    sellMin: 570,
    sellMax: 4560,
    availability: "always",
    desc: "오리지널 롤케이크에 보라색 사탕 2개를 넣어 해금",
    ingredients: [
      {
        amount: 1,
        specific: {
          id: "egg",
          name: "Egg",
          ko: "달걀",
        },
      },
      {
        amount: 1,
        specific: {
          id: "milk",
          name: "Milk",
          ko: "우유",
        },
      },
      {
        amount: 2,
        specific: {
          id: "purple-candy",
          name: "Purple Candy",
          ko: "보라색 사탕",
        },
      },
    ],
    grades: grades([570, 855, 1140, 2280, 4560]),
  },
  {
    id: "mushroom-pie",
    emoji: "🥧",
    thumbnail: "/images/foods/mushroom_pie.png",
    name: "Mushroom Pie",
    ko: "버섯 파이",
    level: 1,
    sellMin: 500,
    sellMax: 4000,
    availability: "always",
    ingredients: [
      {
        amount: 2,
        groupLabel: "버섯 (어떤 버섯이든 상관없음)",
        groupEmoji: "🍄",
        options: [
          {
            id: "oyster-mushroom",
            name: "Oyster Mushroom",
            ko: "느타리버섯",
            thumbnail: "/images/others/mushrooms/mushroom_oyster.png",
            href: "/others/products/detail/oyster-mushroom",
          },
          {
            id: "shiitake-mushroom",
            name: "Shiitake Mushroom",
            ko: "표고버섯",
            thumbnail: "/images/others/mushrooms/mushroom_shiitake.png",
            href: "/others/products/detail/shiitake-mushroom",
          },
          {
            id: "button-mushroom",
            name: "Button Mushroom",
            ko: "양송이버섯",
            thumbnail: "/images/others/mushrooms/mushroom_button.png",
            href: "/others/products/detail/button-mushroom",
          },
          {
            id: "porcini-mushroom",
            name: "Porcini Mushroom",
            ko: "그물버섯",
            thumbnail: "/images/others/mushrooms/mushroom_porcini.png",
            href: "/others/products/detail/porcini-mushroom",
          },
          {
            id: "black-truffle",
            name: "Black Truffle",
            ko: "검은 트러플",
            thumbnail: "/images/others/mushrooms/mushroom_truffle.png",
            href: "/others/products/detail/black-truffle",
          },
        ],
      },
      {
        amount: 1,
        specific: {
          id: "wheat",
          name: "Wheat",
          ko: "밀",
          thumbnail: "/images/crops/wheat_big.png",
          href: "/gardening/crops/detail/wheat",
        },
      },
      {
        amount: 1,
        specific: {
          id: "egg",
          name: "Egg",
          ko: "달걀",
        },
      },
    ],
    grades: grades([500, 750, 1000, 2000, 4000]),
  },
  {
    id: "oyster-mushroom-pie",
    emoji: "🥧",
    thumbnail: "/images/foods/oyster_mushroom_pie.png",
    name: "Oyster Mushroom Pie",
    ko: "느타리버섯 파이",
    level: 1,
    sellMin: 500,
    sellMax: 4000,
    availability: "always",
    desc: "버섯 파이에 느타리버섯 2개를 넣어 해금",
    ingredients: [
      {
        amount: 2,
        specific: {
          id: "oyster-mushroom",
          name: "Oyster Mushroom",
          ko: "느타리버섯",
          thumbnail: "/images/others/mushrooms/mushroom_oyster.png",
          href: "/others/products/detail/oyster-mushroom",
        },
      },
      {
        amount: 1,
        specific: {
          id: "wheat",
          name: "Wheat",
          ko: "밀",
          thumbnail: "/images/crops/wheat_big.png",
          href: "/gardening/crops/detail/wheat",
        },
      },
      {
        amount: 1,
        specific: {
          id: "egg",
          name: "Egg",
          ko: "달걀",
        },
      },
    ],
    grades: grades([500, 750, 1000, 2000, 4000]),
  },
  {
    id: "shiitake-mushroom-pie",
    emoji: "🥧",
    thumbnail: "/images/foods/shiitake_mushroom_pie.png",
    name: "Shiitake Mushroom Pie",
    ko: "표고버섯 파이",
    level: 1,
    sellMin: 500,
    sellMax: 4000,
    availability: "always",
    desc: "버섯 파이에 표고버섯 2개를 넣어 해금",
    ingredients: [
      {
        amount: 2,
        specific: {
          id: "shiitake-mushroom",
          name: "Shiitake Mushroom",
          ko: "표고버섯",
          thumbnail: "/images/others/mushrooms/mushroom_shiitake.png",
          href: "/others/products/detail/shiitake-mushroom",
        },
      },
      {
        amount: 1,
        specific: {
          id: "wheat",
          name: "Wheat",
          ko: "밀",
          thumbnail: "/images/crops/wheat_big.png",
          href: "/gardening/crops/detail/wheat",
        },
      },
      {
        amount: 1,
        specific: {
          id: "egg",
          name: "Egg",
          ko: "달걀",
        },
      },
    ],
    grades: grades([500, 750, 1000, 2000, 4000]),
  },
  {
    id: "porcini-mushroom-pie",
    emoji: "🥧",
    thumbnail: "/images/foods/porcini_mushroom_pie.png",
    name: "Porcini Mushroom Pie",
    ko: "그물버섯 파이",
    level: 1,
    sellMin: 500,
    sellMax: 4000,
    availability: "always",
    desc: "버섯 파이에 그물버섯 2개를 넣어 해금",
    ingredients: [
      {
        amount: 2,
        specific: {
          id: "porcini-mushroom",
          name: "Porcini Mushroom",
          ko: "그물버섯",
          thumbnail: "/images/others/mushrooms/mushroom_porcini.png",
          href: "/others/products/detail/porcini-mushroom",
        },
      },
      {
        amount: 1,
        specific: {
          id: "wheat",
          name: "Wheat",
          ko: "밀",
          thumbnail: "/images/crops/wheat_big.png",
          href: "/gardening/crops/detail/wheat",
        },
      },
      {
        amount: 1,
        specific: {
          id: "egg",
          name: "Egg",
          ko: "달걀",
        },
      },
    ],
    grades: grades([500, 750, 1000, 2000, 4000]),
  },
  {
    id: "button-mushroom-pie",
    emoji: "🥧",
    thumbnail: "/images/foods/button_mushroom_pie.png",
    name: "Button Mushroom Pie",
    ko: "양송이버섯 파이",
    level: 1,
    sellMin: 500,
    sellMax: 4000,
    availability: "always",
    desc: "버섯 파이에 양송이버섯 2개를 넣어 해금",
    ingredients: [
      {
        amount: 2,
        specific: {
          id: "button-mushroom",
          name: "Button Mushroom",
          ko: "양송이버섯",
          thumbnail: "/images/others/mushrooms/mushroom_button.png",
          href: "/others/products/detail/button-mushroom",
        },
      },
      {
        amount: 1,
        specific: {
          id: "wheat",
          name: "Wheat",
          ko: "밀",
          thumbnail: "/images/crops/wheat_big.png",
          href: "/gardening/crops/detail/wheat",
        },
      },
      {
        amount: 1,
        specific: {
          id: "egg",
          name: "Egg",
          ko: "달걀",
        },
      },
    ],
    grades: grades([500, 750, 1000, 2000, 4000]),
  },
  {
    id: "black-truffle-pie",
    emoji: "🥧",
    thumbnail: "/images/foods/black_truffle_pie.png",
    name: "Black Truffle Pie",
    ko: "검은 트러플 파이",
    level: 1,
    sellMin: 830,
    sellMax: 6640,
    availability: "always",
    desc: "버섯 파이에 검은 트러플 2개를 넣어 해금",
    ingredients: [
      {
        amount: 2,
        specific: {
          id: "black-truffle",
          name: "Black Truffle",
          ko: "검은 트러플",
          thumbnail: "/images/others/mushrooms/mushroom_truffle.png",
          href: "/others/products/detail/black-truffle",
        },
      },
      {
        amount: 1,
        specific: {
          id: "wheat",
          name: "Wheat",
          ko: "밀",
          thumbnail: "/images/crops/wheat_big.png",
          href: "/gardening/crops/detail/wheat",
        },
      },
      {
        amount: 1,
        specific: {
          id: "egg",
          name: "Egg",
          ko: "달걀",
        },
      },
    ],
    grades: grades([830, 1245, 1660, 3320, 6640]),
  },
  {
    id: "grilled-mushroom",
    emoji: "🍄",
    thumbnail: "/images/foods/grilled_mushroom.png",
    name: "Grilled Mushroom",
    ko: "구운 버섯",
    level: 1,
    sellMin: 180,
    sellMax: 1440,
    availability: "always",
    ingredients: [
      {
        amount: 4,
        groupLabel: "버섯 (어떤 버섯이든 상관없음)",
        groupEmoji: "🍄",
        options: [
          {
            id: "oyster-mushroom",
            name: "Oyster Mushroom",
            ko: "느타리버섯",
            thumbnail: "/images/others/mushrooms/mushroom_oyster.png",
            href: "/others/products/detail/oyster-mushroom",
          },
          {
            id: "shiitake-mushroom",
            name: "Shiitake Mushroom",
            ko: "표고버섯",
            thumbnail: "/images/others/mushrooms/mushroom_shiitake.png",
            href: "/others/products/detail/shiitake-mushroom",
          },
          {
            id: "button-mushroom",
            name: "Button Mushroom",
            ko: "양송이버섯",
            thumbnail: "/images/others/mushrooms/mushroom_button.png",
            href: "/others/products/detail/button-mushroom",
          },
          {
            id: "porcini-mushroom",
            name: "Porcini Mushroom",
            ko: "그물버섯",
            thumbnail: "/images/others/mushrooms/mushroom_porcini.png",
            href: "/others/products/detail/porcini-mushroom",
          },
        ],
      },
    ],
    grades: grades([180, 270, 360, 720, 1440]),
  },
  {
    id: "grilled-oyster-mushroom",
    emoji: "🍄",
    thumbnail: "/images/foods/grilled_oyster_mushroom.png",
    name: "Grilled Oyster Mushroom",
    ko: "구운 느타리버섯",
    level: 1,
    sellMin: 180,
    sellMax: 1440,
    availability: "always",
    desc: "구운 버섯에 느타리버섯 4개를 넣어 해금",
    ingredients: [
      {
        amount: 4,
        specific: {
          id: "oyster-mushroom",
          name: "Oyster Mushroom",
          ko: "느타리버섯",
          thumbnail: "/images/others/mushrooms/mushroom_oyster.png",
          href: "/others/products/detail/oyster-mushroom",
        },
      },
    ],
    grades: grades([180, 270, 360, 720, 1440]),
  },
  {
    id: "grilled-shiitake-mushroom",
    emoji: "🍄",
    thumbnail: "/images/foods/grilled_shiitake_mushroom.png",
    name: "Grilled Shiitake Mushroom",
    ko: "구운 표고버섯",
    level: 1,
    sellMin: 180,
    sellMax: 1440,
    availability: "always",
    desc: "구운 버섯에 표고버섯 4개를 넣어 해금",
    ingredients: [
      {
        amount: 4,
        specific: {
          id: "shiitake-mushroom",
          name: "Shiitake Mushroom",
          ko: "표고버섯",
          thumbnail: "/images/others/mushrooms/mushroom_shiitake.png",
          href: "/others/products/detail/shiitake-mushroom",
        },
      },
    ],
    grades: grades([180, 270, 360, 720, 1440]),
  },
  {
    id: "grilled-porcini-mushroom",
    emoji: "🍄",
    thumbnail: "/images/foods/grilled_porcini_mushroom.png",
    name: "Grilled Porcini Mushroom",
    ko: "구운 그물버섯",
    level: 1,
    sellMin: 180,
    sellMax: 1440,
    availability: "always",
    desc: "구운 버섯에 그물버섯 4개를 넣어 해금",
    ingredients: [
      {
        amount: 4,
        specific: {
          id: "porcini-mushroom",
          name: "Porcini Mushroom",
          ko: "그물버섯",
          thumbnail: "/images/others/mushrooms/mushroom_porcini.png",
          href: "/others/products/detail/porcini-mushroom",
        },
      },
    ],
    grades: grades([180, 270, 360, 720, 1440]),
  },
  {
    id: "grilled-button-mushroom",
    emoji: "🍄",
    thumbnail: "/images/foods/grilled_button_mushroom.png",
    name: "Grilled Button Mushroom",
    ko: "구운 양송이버섯",
    level: 1,
    sellMin: 180,
    sellMax: 1440,
    availability: "always",
    desc: "구운 버섯에 양송이버섯 4개를 넣어 해금",
    ingredients: [
      {
        amount: 4,
        specific: {
          id: "button-mushroom",
          name: "Button Mushroom",
          ko: "양송이버섯",
          thumbnail: "/images/others/mushrooms/mushroom_button.png",
          href: "/others/products/detail/button-mushroom",
        },
      },
    ],
    grades: grades([180, 270, 360, 720, 1440]),
  },
  {
    id: "coffee",
    emoji: "☕",
    thumbnail: "/images/foods/coffee.png",
    name: "Coffee",
    ko: "커피",
    level: 2,
    sellMin: 290,
    sellMax: 2320,
    availability: "always",
    ingredients: [
      {
        amount: 4,
        specific: {
          id: "coffee-bean",
          name: "Coffee Bean",
          ko: "커피 콩",
        },
      },
    ],
    grades: grades([290, 435, 580, 1160, 2320]),
  },
  {
    id: "cafe-latte",
    emoji: "🥛",
    thumbnail: "/images/foods/cafe_latte.png",
    name: "Cafe Latte",
    ko: "카페라떼",
    level: 2,
    sellMin: 300,
    sellMax: 2400,
    availability: "always",
    ingredients: [
      {
        amount: 2,
        specific: {
          id: "coffee-bean",
          name: "Coffee Bean",
          ko: "커피 콩",
        },
      },
      {
        amount: 2,
        specific: {
          id: "milk",
          name: "Milk",
          ko: "우유",
        },
      },
    ],
    grades: grades([300, 450, 600, 1200, 2400]),
  },
  {
    id: "smoked-salmon-bagel",
    emoji: "🥯",
    // thumbnail: "/images/foods/smoked_salmon_bagel.png",
    name: "Smoked Salmon Bagel",
    ko: "훈제 연어 베이글",
    level: 2,
    sellMin: 520,
    sellMax: 4160,
    availability: "always",
    ingredients: [
      {
        amount: 1,
        groupLabel: "물고기 (어떤 생선이든 상관없음)",
        groupEmoji: "🐟",
        options: [],
      },
      {
        amount: 1,
        specific: {
          id: "cheese",
          name: "Cheese",
          ko: "치즈",
        },
      },
      {
        amount: 1,
        groupLabel: "채소 (어떤 채소든 상관없음)",
        groupEmoji: "🥬",
        options: [
          {
            id: "tomato",
            name: "Tomato",
            ko: "토마토",
            thumbnail: "/images/crops/tomato_big.png",
            href: "/gardening/crops/detail/tomato",
          },
          {
            id: "lettuce",
            name: "Lettuce",
            ko: "양상추",
            thumbnail: "/images/crops/lettuce_big.png",
            href: "/gardening/crops/detail/lettuce",
          },
          {
            id: "potato",
            name: "Potato",
            ko: "감자",
            thumbnail: "/images/crops/potato_big.png",
            href: "/gardening/crops/detail/potato",
          },
          {
            id: "corn",
            name: "Corn",
            ko: "옥수수",
            thumbnail: "/images/crops/corn_big.png",
            href: "/gardening/crops/detail/corn",
          },
          {
            id: "carrot",
            name: "Carrot",
            ko: "당근",
            thumbnail: "/images/crops/carrot_big.png",
            href: "/gardening/crops/detail/carrot",
          },
          {
            id: "wheat",
            name: "Wheat",
            ko: "밀",
            thumbnail: "/images/crops/wheat_big.png",
            href: "/gardening/crops/detail/wheat",
          },
          {
            id: "eggplant",
            name: "Eggplant",
            ko: "가지",
            thumbnail: "/images/crops/eggplant_big.png",
            href: "/gardening/crops/detail/eggplant",
          },
        ],
      },
      {
        amount: 1,
        specific: {
          id: "wheat",
          name: "Wheat",
          ko: "밀",
          thumbnail: "/images/crops/wheat_big.png",
          href: "/gardening/crops/detail/wheat",
        },
      },
    ],
    grades: grades([520, 780, 1040, 2080, 4160]),
  },
  {
    id: "seafood-rice-bowl",
    emoji: "🍚",
    // thumbnail: "/images/foods/seafood_rice_bowl.png",
    name: "Seafood Rice Bowl",
    ko: "씨푸드 덮밥",
    level: 3,
    sellMin: 490,
    sellMax: 3920,
    availability: "always",
    ingredients: [
      {
        amount: 2,
        groupLabel: "해산물 (어떤 해산물이든 상관없음)",
        groupEmoji: "🦪",
        options: [],
      },
      {
        amount: 1,
        specific: {
          id: "wheat",
          name: "Wheat",
          ko: "밀",
          thumbnail: "/images/crops/wheat_big.png",
          href: "/gardening/crops/detail/wheat",
        },
      },
      {
        amount: 1,
        specific: {
          id: "tomato",
          name: "Tomato",
          ko: "토마토",
          thumbnail: "/images/crops/tomato_big.png",
          href: "/gardening/crops/detail/tomato",
        },
      },
    ],
    grades: grades([490, 735, 980, 1960, 3920]),
  },
  {
    id: "country-stew",
    emoji: "🍲",
    // thumbnail: "/images/foods/country_stew.png",
    name: "Country Stew",
    ko: "컨트리 스튜",
    level: 3,
    sellMin: 640,
    sellMax: 5120,
    availability: "always",
    ingredients: [
      {
        amount: 1,
        specific: {
          id: "tomato",
          name: "Tomato",
          ko: "토마토",
          thumbnail: "/images/crops/tomato_big.png",
          href: "/gardening/crops/detail/tomato",
        },
      },
      {
        amount: 1,
        specific: {
          id: "potato",
          name: "Potato",
          ko: "감자",
          thumbnail: "/images/crops/potato_big.png",
          href: "/gardening/crops/detail/potato",
        },
      },
      {
        amount: 1,
        specific: {
          id: "lettuce",
          name: "Lettuce",
          ko: "양상추",
          thumbnail: "/images/crops/lettuce_big.png",
          href: "/gardening/crops/detail/lettuce",
        },
      },
    ],
    grades: grades([640, 960, 1280, 2560, 5120]),
  },
  {
    id: "black-truffle-cream-pasta",
    emoji: "🍝",
    thumbnail: "/images/foods/black_truffle_cream_pasta.png",
    name: "Black Truffle Cream Pasta",
    ko: "검은 트러플 크림 파스타",
    level: 3,
    sellMin: 900,
    sellMax: 7200,
    availability: "always",
    ingredients: [
      {
        amount: 1,
        specific: {
          id: "black-truffle",
          name: "Black Truffle",
          ko: "검은 트러플",
          thumbnail: "/images/others/mushrooms/mushroom_truffle.png",
          href: "/others/products/detail/black-truffle",
        },
      },
      {
        amount: 1,
        specific: {
          id: "wheat",
          name: "Wheat",
          ko: "밀",
          thumbnail: "/images/crops/wheat_big.png",
          href: "/gardening/crops/detail/wheat",
        },
      },
      {
        amount: 1,
        specific: {
          id: "milk",
          name: "Milk",
          ko: "우유",
        },
      },
    ],
    grades: grades([900, 1350, 1800, 3600, 7200]),
  },
  {
    id: "seafood-pizza",
    emoji: "🍕",
    // thumbnail: "/images/foods/seafood_pizza.png",
    name: "Seafood Pizza",
    ko: "씨푸드 피자",
    level: 4,
    sellMin: 780,
    sellMax: 6240,
    availability: "always",
    ingredients: [
      {
        amount: 1,
        specific: { id: "cheese", name: "Cheese", ko: "치즈" },
      },
      {
        amount: 1,
        specific: { id: "ketchup", name: "Ketchup", ko: "케첩" },
      },
      {
        amount: 1,
        specific: {
          id: "wheat",
          name: "Wheat",
          ko: "밀",
          thumbnail: "/images/crops/wheat_big.png",
          href: "/gardening/crops/detail/wheat",
        },
      },
      {
        amount: 1,
        groupLabel: "물고기 (어떤 생선이든 상관없음)",
        groupEmoji: "🐟",
        options: [],
      },
    ],
    grades: grades([780, 1170, 1560, 3120, 6240]),
  },
  {
    id: "meat-sauce-pasta",
    emoji: "🍝",
    // thumbnail: "/images/foods/meat_sauce_pasta.png",
    name: "Meat Sauce Pasta",
    ko: "미트소스 파스타",
    level: 4,
    sellMin: 670,
    sellMax: 5360,
    availability: "always",
    ingredients: [
      {
        amount: 1,
        specific: { id: "meat", name: "Meat", ko: "고기" },
      },
      {
        amount: 1,
        specific: {
          id: "wheat",
          name: "Wheat",
          ko: "밀",
          thumbnail: "/images/crops/wheat_big.png",
          href: "/gardening/crops/detail/wheat",
        },
      },
      {
        amount: 1,
        specific: {
          id: "tomato",
          name: "Tomato",
          ko: "토마토",
          thumbnail: "/images/crops/tomato_big.png",
          href: "/gardening/crops/detail/tomato",
        },
      },
      {
        amount: 1,
        specific: { id: "cheese", name: "Cheese", ko: "치즈" },
      },
    ],
    grades: grades([670, 1005, 1340, 2680, 5360]),
  },
  {
    id: "apple-pie",
    emoji: "🥧",
    // thumbnail: "/images/foods/apple_pie.png",
    name: "Apple Pie",
    ko: "애플파이",
    level: 5,
    sellMin: 730,
    sellMax: 5840,
    availability: "always",
    ingredients: [
      {
        amount: 1,
        specific: {
          id: "apple",
          name: "Apple",
          ko: "사과",
          thumbnail: "/images/others/fruits/apple.png",
          href: "/others/products/detail/apple",
        },
      },
      {
        amount: 1,
        specific: {
          id: "wheat",
          name: "Wheat",
          ko: "밀",
          thumbnail: "/images/crops/wheat_big.png",
          href: "/gardening/crops/detail/wheat",
        },
      },
      {
        amount: 1,
        specific: { id: "egg", name: "Egg", ko: "달걀" },
      },
      {
        amount: 1,
        specific: { id: "butter", name: "Butter", ko: "버터" },
      },
    ],
    grades: grades([730, 1095, 1460, 2920, 5840]),
  },
  {
    id: "carrot-cake",
    emoji: "🎂",
    // thumbnail: "/images/foods/carrot_cake.png",
    name: "Carrot Cake",
    ko: "당근 케이크",
    level: 5,
    sellMin: 840,
    sellMax: 6720,
    availability: "always",
    ingredients: [
      {
        amount: 1,
        specific: { id: "egg", name: "Egg", ko: "달걀" },
      },
      {
        amount: 1,
        specific: {
          id: "wheat",
          name: "Wheat",
          ko: "밀",
          thumbnail: "/images/crops/wheat_big.png",
          href: "/gardening/crops/detail/wheat",
        },
      },
      {
        amount: 2,
        specific: {
          id: "carrot",
          name: "Carrot",
          ko: "당근",
          thumbnail: "/images/crops/carrot_big.png",
          href: "/gardening/crops/detail/carrot",
        },
      },
    ],
    grades: grades([840, 1260, 1680, 3360, 6720]),
  },
  {
    id: "corn-soup",
    emoji: "🍵",
    // thumbnail: "/images/foods/corn_soup.png",
    name: "Corn Soup",
    ko: "콘수프",
    level: 5,
    sellMin: 1340,
    sellMax: 10720,
    availability: "always",
    ingredients: [
      {
        amount: 1,
        specific: { id: "milk", name: "Milk", ko: "우유" },
      },
      {
        amount: 1,
        specific: { id: "butter", name: "Butter", ko: "버터" },
      },
      {
        amount: 2,
        specific: {
          id: "corn",
          name: "Corn",
          ko: "옥수수",
          thumbnail: "/images/crops/corn_big.png",
          href: "/gardening/crops/detail/corn",
        },
      },
    ],
    grades: grades([1340, 2010, 2680, 5360, 10720]),
  },
  {
    id: "luxury-seafood-platter",
    emoji: "🦞",
    // thumbnail: "/images/foods/luxury_seafood_platter.png",
    name: "Luxury Seafood Platter",
    ko: "럭셔리 씨푸드 플래터",
    level: 6,
    sellMin: 410,
    sellMax: 3280,
    availability: "always",
    ingredients: [
      {
        amount: 2,
        specific: {
          id: "european-crayfish",
          name: "European Crayfish",
          ko: "유럽민물가재",
          href: "/fishing/detail/european-crayfish",
        },
      },
      {
        amount: 2,
        groupLabel: "물고기 (어떤 생선이든 상관없음)",
        groupEmoji: "🐟",
        options: [],
      },
    ],
    grades: grades([410, 615, 820, 1640, 3280]),
  },
  {
    id: "tiramisu",
    emoji: "🍰",
    // thumbnail: "/images/foods/tiramisu.png",
    name: "Tiramisu",
    ko: "티라미수",
    level: 6,
    sellMin: 530,
    sellMax: 4240,
    availability: "always",
    ingredients: [
      {
        amount: 1,
        specific: {
          id: "coffee-grounds",
          name: "Coffee Grounds",
          ko: "커피 원두",
        },
      },
      {
        amount: 1,
        specific: { id: "egg", name: "Egg", ko: "달걀" },
      },
      {
        amount: 1,
        specific: { id: "milk", name: "Milk", ko: "우유" },
      },
      {
        amount: 1,
        specific: { id: "cheese", name: "Cheese", ko: "치즈" },
      },
    ],
    grades: grades([530, 795, 1060, 2120, 4240]),
  },
  {
    id: "camping-set",
    emoji: "🏕️",
    // thumbnail: "/images/foods/camping_set.png",
    name: "Camping Set",
    ko: "캠핑 세트",
    level: 7,
    sellMin: 2260,
    sellMax: 18080,
    availability: "always",
    ingredients: [
      {
        amount: 1,
        groupLabel: "커피 (어떤 커피든 상관없음)",
        groupEmoji: "☕",
        options: [
          { id: "coffee", name: "Coffee", ko: "커피" },
          { id: "cafe-latte", name: "Cafe Latte", ko: "카페라떼" },
        ],
      },
      {
        amount: 1,
        specific: {
          id: "seafood-pizza",
          name: "Seafood Pizza",
          ko: "씨푸드 피자",
        },
      },
      {
        amount: 1,
        specific: { id: "apple-pie", name: "Apple Pie", ko: "애플파이" },
      },
      {
        amount: 1,
        specific: {
          id: "fish-and-chips",
          name: "Fish and Chips",
          ko: "피시 앤 칩스",
        },
      },
    ],
    grades: grades([2260, 3390, 4520, 9040, 18080]),
  },
  {
    id: "english-afternoon-tea",
    emoji: "🫖",
    // thumbnail: "/images/foods/english_afternoon_tea.png",
    name: "English Afternoon Tea",
    ko: "잉글리시 애프터눈 티",
    level: 7,
    sellMin: 710,
    sellMax: 5680,
    availability: "always",
    ingredients: [
      {
        amount: 1,
        specific: { id: "tiramisu", name: "Tiramisu", ko: "티라미수" },
      },
      {
        amount: 1,
        groupLabel: "잼 (어떤 잼이든 상관없음)",
        groupEmoji: "🍯",
        options: [
          { id: "mixed-jam", name: "Mixed Jam", ko: "믹스드 잼" },
          { id: "blueberry-jam", name: "Blueberry Jam", ko: "블루베리 잼" },
          { id: "raspberry-jam", name: "Raspberry Jam", ko: "라즈베리 잼" },
          { id: "apple-jam", name: "Apple Jam", ko: "사과 잼" },
          { id: "orange-jam", name: "Orange Jam", ko: "오렌지 잼" },
          { id: "strawberry-jam", name: "Strawberry Jam", ko: "딸기 잼" },
          { id: "pineapple-jam", name: "Pineapple Jam", ko: "파인애플 잼" },
          { id: "grape-jam", name: "Grape Jam", ko: "포도 잼" },
        ],
      },
    ],
    grades: grades([710, 1065, 1420, 2840, 5680]),
  },
  {
    id: "meat-burger",
    emoji: "🍔",
    // thumbnail: "/images/foods/meat_burger.png",
    name: "Meat Burger",
    ko: "미트버거",
    level: 8,
    sellMin: 1350,
    sellMax: 10800,
    availability: "always",
    ingredients: [
      {
        amount: 1,
        specific: {
          id: "wheat",
          name: "Wheat",
          ko: "밀",
          thumbnail: "/images/crops/wheat_big.png",
          href: "/gardening/crops/detail/wheat",
        },
      },
      {
        amount: 1,
        specific: {
          id: "lettuce",
          name: "Lettuce",
          ko: "양상추",
          thumbnail: "/images/crops/lettuce_big.png",
          href: "/gardening/crops/detail/lettuce",
        },
      },
      {
        amount: 1,
        specific: { id: "meat", name: "Meat", ko: "고기" },
      },
      {
        amount: 1,
        specific: { id: "ketchup", name: "Ketchup", ko: "케첩" },
      },
    ],
    grades: grades([1350, 2025, 2700, 5400, 10800]),
  },
  {
    id: "lobster-cold-dish",
    emoji: "🦞",
    // thumbnail: "/images/foods/lobster_cold_dish.png",
    name: "Lobster Cold Dish",
    ko: "랍스터 냉채",
    level: 8,
    sellMin: 850,
    sellMax: 6800,
    availability: "always",
    ingredients: [
      {
        amount: 3,
        groupLabel: "랍스터 (어떤 랍스터이든 상관없음)",
        groupEmoji: "🦞",
        options: [
          {
            id: "european-lobster",
            name: "European Lobster",
            ko: "유럽가재",
            href: "/fishing/detail/european-lobster",
          },
          {
            id: "northern-blue-crayfish",
            name: "Northern Blue Crayfish",
            ko: "북유럽파란가재",
            href: "/fishing/detail/northern-blue-crayfish",
          },
        ],
      },
      {
        amount: 1,
        specific: {
          id: "lettuce",
          name: "Lettuce",
          ko: "양상추",
          thumbnail: "/images/crops/lettuce_big.png",
          href: "/gardening/crops/detail/lettuce",
        },
      },
    ],
    grades: grades([850, 1275, 1700, 3400, 6800]),
  },
  {
    id: "meat-sauce-eggplant-gratin",
    emoji: "🍆",
    // thumbnail: "/images/foods/meat_sauce_eggplant_gratin.png",
    name: "Meat Sauce Eggplant Gratin",
    ko: "미트소스 가지 그라탱",
    level: 9,
    sellMin: 1230,
    sellMax: 9840,
    availability: "always",
    ingredients: [
      {
        amount: 1,
        specific: {
          id: "eggplant",
          name: "Eggplant",
          ko: "가지",
          thumbnail: "/images/crops/eggplant_big.png",
          href: "/gardening/crops/detail/eggplant",
        },
      },
      {
        amount: 1,
        specific: { id: "meat", name: "Meat", ko: "고기" },
      },
      {
        amount: 1,
        specific: { id: "cooking-oil", name: "Cooking Oil", ko: "식용유" },
      },
      {
        amount: 1,
        specific: { id: "ketchup", name: "Ketchup", ko: "케첩" },
      },
    ],
    grades: grades([1230, 1845, 2460, 4920, 9840]),
  },
  {
    id: "candlelight-dinner",
    emoji: "🕯️",
    // thumbnail: "/images/foods/candlelight_dinner.png",
    name: "Candlelight Dinner",
    ko: "캔들라이트 디너",
    level: 9,
    sellMin: 1760,
    sellMax: 14080,
    availability: "always",
    ingredients: [
      {
        amount: 1,
        specific: {
          id: "veggie-salad",
          name: "Veggie Salad",
          ko: "베지 샐러드",
        },
      },
      {
        amount: 1,
        specific: {
          id: "smoked-salmon-bagel",
          name: "Smoked Salmon Bagel",
          ko: "훈제 연어 베이글",
        },
      },
      {
        amount: 1,
        specific: {
          id: "seafood-rice-bowl",
          name: "Seafood Rice Bowl",
          ko: "씨푸드 덮밥",
        },
      },
      {
        amount: 1,
        specific: { id: "tiramisu", name: "Tiramisu", ko: "티라미수" },
      },
    ],
    grades: grades([1760, 2640, 3520, 7040, 14080]),
  },
  {
    id: "steamed-king-crab",
    emoji: "🦀",
    // thumbnail: "/images/foods/steamed_king_crab.png",
    name: "Steamed King Crab",
    ko: "킹크랩 찜",
    level: 10,
    sellMin: 1987,
    sellMax: 15896,
    availability: "always",
    ingredients: [
      {
        amount: 3,
        groupLabel: "킹크랩 (어떤 킹크랩이든 상관없음)",
        groupEmoji: "🦀",
        options: [
          {
            id: "king-crab",
            name: "King Crab",
            ko: "킹크랩",
            href: "/fishing/detail/king-crab",
          },
          {
            id: "golden-king-crab",
            name: "Golden King Crab",
            ko: "황금 킹크랩",
            href: "/fishing/detail/golden-king-crab",
          },
        ],
      },
      {
        amount: 1,
        specific: { id: "butter", name: "Butter", ko: "버터" },
      },
    ],
    grades: grades([1987, 2980, 3974, 7948, 15896]),
  },
];
