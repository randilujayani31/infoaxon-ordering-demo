import type { CartItem, Order, User } from "@/store/AppStore";

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
};

export const orderItemCount = (cart: CartItem[]) => cart.reduce((sum, item) => sum + item.quantity, 0);
