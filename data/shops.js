/* 店家資料：新增店家時，只改這個檔案。欄位規則見 CLAUDE.md。
   types 可填多個：bookstore 書店 / cafe 咖啡廳 / gallery 藝廊 / fashion 特色服飾店
   不知道的欄位填 ""、[] 或 null，網頁會顯示「待補」。新店家加在陣列最前面。 */
const SHOPS = [
  {
    id: "patrol",
    name: "Patrol",
    types: ["bookstore", "fashion"],
    region: "台北・大同區",
    address: "台北市大同區南京西路155巷30號",
    rating: null,
    tagline: "複合型藝術書店與文化空間，同時有選品服飾。",
    note: "",
    tags: ["藝術書店", "文化空間", "選品服飾"],
    image: ""
  },
  {
    id: "mountain-coffee",
    name: "MOUNTAIN COFFEE 山咖啡 ESPRESSO BAR",
    types: ["cafe"],
    region: "屏東・屏東市",
    address: "屏東縣屏東市空翔里洛陽街65巷6號", rating: null,
    tagline: "結合咖啡與民宿的黑色系空間。",
    note: "咖啡與民宿合而為一的空間，黑色系的內裝設計很有個性。咖啡口味特別，而且好喝。",
    tags: ["咖啡", "民宿", "黑色系"], image: ""
  },
  {
    id: "yu-hsiu-museum",
    name: "毓繡美術館",
    types: ["gallery"],
    region: "南投・草屯",
    address: "南投縣草屯鎮健行路150巷26號", rating: null,
    tagline: "九九峰山邊的清水模私人美術館，參觀需先預約。", note: "", tags: ["清水模建築", "私人美術館", "需預約"], image: ""
  },
  {
    id: "shalu-buffer-tea",
    name: "沙鹿緩衝茶館",
    types: ["cafe"],
    region: "台中・沙鹿",
    address: "台中市沙鹿區台灣大道六段765號", rating: null,
    tagline: "日系木質空間與柔黃燈光，營業到午夜的茶館。", note: "", tags: ["茶館", "夜間營業", "日系木質"], image: ""
  },
  {
    id: "wuqi-fico-sandwich",
    name: "梧棲 fico sandwich cafe",
    types: ["cafe"],
    region: "台中・梧棲",
    address: "台中市梧棲區大智路二段392號1樓", rating: null,
    tagline: "道地的佛卡夏三明治，製作過程全透明。",
    note: "佛卡夏三明治道地好吃，常有外國顧客造訪。製作過程完全透明，看起來新奇有趣；空間可愛，環境也很舒適。",
    tags: ["佛卡夏", "三明治", "透明製作"], image: ""
  }
];
