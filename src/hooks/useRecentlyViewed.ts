const STORAGE_KEY = "nest-recently-viewed";
const MAX_ITEMS = 10;

export interface RecentlyViewedItem {
  id: string;
  name: string;
  main_image: string;
  price: number;
}

export function getRecentlyViewed(): RecentlyViewedItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addRecentlyViewed(item: RecentlyViewedItem) {
  try {
    const existing = getRecentlyViewed().filter((p) => p.id !== item.id);
    const next = [item, ...existing].slice(0, MAX_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage yo'q yoki to'lib qolgan bo'lsa, jim o'tkazib yuboramiz
  }
}
