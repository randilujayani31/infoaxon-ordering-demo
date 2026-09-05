export const categoryNames = ["Groceries", "Beverages", "Household", "Personal Care", "Electronics", "Stationery"] as const;

export type Category = string;
export type StockStatus = "In stock" | "Low stock";

export type Product = {
  id: string;
  name: string;
  category: Category;
  image: string;
  price: number;
  salePrice?: number;
  unit: string;
  stock: StockStatus;
  rating: number;
  description: string;
  tag?: string;
  sku?: string;
  stockQuantity?: number;
  active?: boolean;
  featured?: boolean;
};

export type StoreCategory = { name: string; icon: string; color: string; count: string; description: string; active?: boolean };

export const categories = [
  { name: "Groceries", icon: "🥬", color: "mint", count: "240+ items", description: "Fresh pantry staples for every kitchen." },
  { name: "Beverages", icon: "🧃", color: "peach", count: "85+ items", description: "Tea, coffee and refreshing favourites." },
  { name: "Household", icon: "🧺", color: "sky", count: "120+ items", description: "Simple essentials for a happy home." },
  { name: "Personal Care", icon: "🧴", color: "lavender", count: "160+ items", description: "Everyday care for you and your family." },
  { name: "Electronics", icon: "🎧", color: "yellow", count: "60+ items", description: "Useful tech for work, rest and play." },
  { name: "Stationery", icon: "✏️", color: "rose", count: "90+ items", description: "Bright tools for notes, plans and ideas." },
] as const;

const image = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=85`;

export const products: Product[] = [
  { id: "rice", name: "Keeri Samba Rice", category: "Groceries", image: image("photo-1586201375761-83865001e31c"), price: 485, salePrice: 445, unit: "5 kg", stock: "In stock", rating: 4.8, description: "Premium locally sourced samba rice with a soft, fragrant finish.", tag: "Best seller" },
  { id: "coconut", name: "Coconut Oil", category: "Groceries", image: image("photo-1474979266404-7eaacbcd87c5"), price: 850, unit: "750 ml", stock: "In stock", rating: 4.7, description: "Cold-pressed coconut oil for cooking, baking and everyday Sri Lankan meals." },
  { id: "dhal", name: "Red Lentils", category: "Groceries", image: image("photo-1515543904379-3d757afe72e4"), price: 780, unit: "1 kg", stock: "In stock", rating: 4.6, description: "Clean, wholesome red lentils that cook quickly into comforting meals." },
  { id: "honey", name: "Island Blossom Honey", category: "Groceries", image: image("photo-1587049352846-4a222e784d38"), price: 1250, salePrice: 1090, unit: "500 g", stock: "Low stock", rating: 4.8, description: "Naturally sweet Sri Lankan honey collected from tropical blossoms.", tag: "Save Rs. 160" },
  { id: "tea", name: "Ceylon Breakfast Tea", category: "Beverages", image: image("photo-1594631252845-29fc4cc8cde9"), price: 620, salePrice: 575, unit: "100 tea bags", stock: "In stock", rating: 4.9, description: "Bright and aromatic high-grown Ceylon tea for a perfect morning cup.", tag: "Popular" },
  { id: "juice", name: "Mango Nectar", category: "Beverages", image: image("photo-1600271886742-f049cd451bba"), price: 390, unit: "1 L", stock: "Low stock", rating: 4.6, description: "Smooth tropical mango nectar made with ripe, sun-kissed fruit." },
  { id: "coffee", name: "Roasted Ceylon Coffee", category: "Beverages", image: image("photo-1495474472287-4d71bcdd2085"), price: 980, unit: "250 g", stock: "In stock", rating: 4.7, description: "Small-batch roasted coffee with a warm aroma and smooth finish." },
  { id: "sparkling", name: "Lime Sparkling Water", category: "Beverages", image: image("photo-1544145945-f90425340c7e"), price: 260, salePrice: 225, unit: "6 × 330 ml", stock: "In stock", rating: 4.5, description: "Lightly sparkling lime water for a refreshing break.", tag: "Great value" },
  { id: "laundry", name: "FreshCare Laundry Liquid", category: "Household", image: image("photo-1585832770485-e68a5dbfad52"), price: 1450, salePrice: 1290, unit: "2 L", stock: "In stock", rating: 4.7, description: "Powerful everyday cleaning with a fresh, long-lasting fragrance.", tag: "Save Rs. 160" },
  { id: "towels", name: "Everyday Kitchen Towels", category: "Household", image: image("photo-1584622650111-993a426fbf0a"), price: 680, unit: "Pack of 4", stock: "In stock", rating: 4.5, description: "Soft, absorbent cotton towels for a spotless and happy kitchen." },
  { id: "cleaner", name: "Lemon Surface Cleaner", category: "Household", image: image("photo-1563453392212-326f5e854473"), price: 720, unit: "750 ml", stock: "In stock", rating: 4.6, description: "A bright citrus cleaner for counters, tables and everyday messes." },
  { id: "storage", name: "Bamboo Storage Baskets", category: "Household", image: image("photo-1618220179428-22790b461013"), price: 1850, salePrice: 1590, unit: "Set of 2", stock: "Low stock", rating: 4.8, description: "Natural woven baskets to keep living spaces calm and organised.", tag: "New" },
  { id: "shampoo", name: "Herbal Care Shampoo", category: "Personal Care", image: image("photo-1556228578-8c89e6adf883"), price: 1100, salePrice: 960, unit: "650 ml", stock: "In stock", rating: 4.8, description: "A gentle herbal blend that leaves hair clean, soft and nourished." },
  { id: "skincare", name: "Aloe Glow Face Wash", category: "Personal Care", image: image("photo-1556228720-195a672e8a03"), price: 790, unit: "150 ml", stock: "In stock", rating: 4.6, description: "Refreshing aloe and cucumber face wash for a clean, balanced glow." },
  { id: "suncream", name: "Daily Shield Sunscreen", category: "Personal Care", image: image("photo-1556229010-6c3f2c9ca5f8"), price: 1850, salePrice: 1690, unit: "50 ml", stock: "In stock", rating: 4.7, description: "Lightweight daily SPF protection with a comfortable, non-sticky finish.", tag: "Save Rs. 160" },
  { id: "earbuds", name: "SoundPod Wireless Earbuds", category: "Electronics", image: image("photo-1606220945770-b5b6c2c55bf1"), price: 6950, salePrice: 5990, unit: "1 set", stock: "Low stock", rating: 4.8, description: "Clear calls, rich sound and a pocket-sized charging case for every day.", tag: "New" },
  { id: "lamp", name: "Focus LED Desk Lamp", category: "Electronics", image: image("photo-1507473885765-e6ed057f782c"), price: 4250, unit: "1 unit", stock: "In stock", rating: 4.5, description: "A warm, adjustable desk lamp designed for comfortable late-night focus." },
  { id: "powerbank", name: "TravelCharge Power Bank", category: "Electronics", image: image("photo-1511707171634-5f897ff02aa9"), price: 3850, salePrice: 3290, unit: "10,000 mAh", stock: "In stock", rating: 4.6, description: "A compact backup charge for commutes, travel and busy days.", tag: "Popular" },
  { id: "notebook", name: "A5 Kraft Notebook", category: "Stationery", image: image("photo-1456324504439-367cee3b3c32"), price: 450, salePrice: 375, unit: "1 book", stock: "In stock", rating: 4.7, description: "A sturdy, beautifully simple notebook with 120 lined pages.", tag: "Great value" },
  { id: "pens", name: "SmoothWrite Gel Pens", category: "Stationery", image: image("photo-1583485088034-697b5bc54ccd"), price: 540, unit: "Pack of 5", stock: "In stock", rating: 4.6, description: "Smooth-flowing gel pens in five vivid colours for notes and ideas." },
  { id: "planner", name: "Weekmaker Desk Planner", category: "Stationery", image: image("photo-1499951360447-b19be8fe80f5"), price: 1250, salePrice: 990, unit: "2026 planner", stock: "In stock", rating: 4.8, description: "A calm, spacious weekly planner for making room for what matters.", tag: "New" },
  { id: "markers", name: "ColourPop Markers", category: "Stationery", image: image("photo-1517842645767-c639042777db"), price: 690, unit: "Pack of 8", stock: "In stock", rating: 4.5, description: "Bright, quick-drying markers for study notes and creative projects." },
];

export const defaultProducts = products.map((product, index) => ({ ...product, sku: `NM-${String(index + 1).padStart(3, "0")}`, stockQuantity: product.stock === "Low stock" ? 4 : 24, active: true, featured: index < 8 }));
export const defaultCategories: StoreCategory[] = categories.map((category) => ({ ...category, active: true }));

export const findProduct = (id: string) => products.find((product) => product.id === id);
export const discountPercent = (product: Product) => product.salePrice ? Math.round((1 - product.salePrice / product.price) * 100) : 0;
export const money = (value: number) => `Rs. ${value.toLocaleString("en-LK")}`;
