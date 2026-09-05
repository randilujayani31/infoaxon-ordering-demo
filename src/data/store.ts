import type { CartItem, Order, User } from "@/store/AppStore";
import { defaultCategories, defaultProducts } from "@/data/catalog";

export const DEMO_USER: User = {
  id: "demo-customer",
  name: "Nadeesha Perera",
  email: "customer@novamart.lk",
  mobile: "077 123 4567",
  password: "demo123",
  address: "24 Flower Road, Colombo 07",
};

export const sampleOrders: Order[] = [
  { id: "NM-240821-7842", date: "21 Aug 2026", total: 4890, items: 4, payment: "Cash on Delivery", status: "Delivered", cart: [], customerName: "Nadeesha Perera", address: "24 Flower Road, Colombo 07", deliveryMethod: "Standard delivery" },
  { id: "NM-240826-1935", date: "26 Aug 2026", total: 7450, items: 3, payment: "Bank Transfer", status: "Dispatched", cart: [], customerName: "Nadeesha Perera", address: "24 Flower Road, Colombo 07", deliveryMethod: "Standard delivery" },
];

export const STORAGE_KEYS = {
  cart: "novamart-cart",
  orders: "novamart-orders",
  users: "novamart-users",
  session: "novamart-session",
  recentOrder: "novamart-recent-order",
  products: "novamart-products",
  categories: "novamart-categories",
  adminSession: "novamart-admin-session",
  settings: "novamart-settings",
};

export type AdminUser = { email: string; name: string; role: "Administrator" };
export type StoreSettings = { storeName: string; tagline: string; email: string; phone: string; address: string; freeDeliveryThreshold: number; deliveryCharge: number; openingHours: string; currency: "LKR"; cashOnDelivery: boolean; bankTransfer: boolean; bankName: string; accountName: string; accountNumber: string; branch: string };
export const DEMO_ADMIN: AdminUser = { email: "admin@novamart.lk", name: "NovaMart Admin", role: "Administrator" };
export const defaultSettings: StoreSettings = { storeName: "NovaMart", tagline: "Everything you need, delivered", email: "hello@novamart.lk", phone: "+94 11 234 5678", address: "24 Flower Road, Colombo 07", freeDeliveryThreshold: 5000, deliveryCharge: 350, openingHours: "Mon - Sun, 8:00 AM - 8:00 PM", currency: "LKR", cashOnDelivery: true, bankTransfer: true, bankName: "Commercial Bank", accountName: "NovaMart (Pvt) Ltd", accountNumber: "0123456789", branch: "Colombo 07" };
export { defaultCategories, defaultProducts };

export const orderItemCount = (cart: CartItem[]) => cart.reduce((sum, item) => sum + item.quantity, 0);
