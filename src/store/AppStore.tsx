"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { type Product } from "@/data/catalog";
import { DEMO_USER, sampleOrders, STORAGE_KEYS } from "@/data/store";

export type CartItem = { product: Product; quantity: number };
export type User = { id: string; name: string; email: string; mobile: string; password: string; address?: string };
export type OrderStatus = "Confirmed" | "Preparing" | "Dispatched" | "Delivered";
export type Order = { id: string; date: string; total: number; items: number; payment: string; status: OrderStatus; cart: CartItem[]; customerName: string; address: string; deliveryMethod: string; notes?: string };

type CheckoutDetails = { name: string; mobile: string; email: string; address: string; city: string; deliveryMethod: string; payment: string; notes?: string };
type AppContextValue = {
  cart: CartItem[];
  orders: Order[];
  user: User | null;
  users: User[];
  hydrated: boolean;
  cartCount: number;
  subtotal: number;
  delivery: number;
  total: number;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (id: string, change: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  placeOrder: (details: CheckoutDetails) => Order;
  login: (email: string, password: string) => boolean;
  register: (details: Omit<User, "id">) => { ok: boolean; error?: string };
  updateProfile: (details: Pick<User, "name" | "mobile" | "address">) => void;
  logout: () => void;
  getOrder: (id: string) => Order | undefined;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [users, setUsers] = useState<User[]>([DEMO_USER]);
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const hydrate = window.setTimeout(() => {
      const savedCart = window.localStorage.getItem(STORAGE_KEYS.cart);
      const savedOrders = window.localStorage.getItem(STORAGE_KEYS.orders);
      const savedUsers = window.localStorage.getItem(STORAGE_KEYS.users);
      const savedSession = window.localStorage.getItem(STORAGE_KEYS.session);
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedOrders) setOrders([...sampleOrders, ...JSON.parse(savedOrders)]);
      if (savedUsers) setUsers([DEMO_USER, ...JSON.parse(savedUsers)]);
      if (savedSession) setUser(JSON.parse(savedSession));
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(hydrate);
  }, []);

  useEffect(() => { if (hydrated) window.localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart)); }, [cart, hydrated]);
  useEffect(() => { if (hydrated) window.localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users.filter((item) => item.id !== DEMO_USER.id))); }, [users, hydrated]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.product.salePrice ?? item.product.price) * item.quantity, 0);
  const delivery = subtotal === 0 || subtotal >= 5000 ? 0 : 350;
  const total = subtotal + delivery;

  const addToCart = (product: Product, quantity = 1) => setCart((current) => {
    const existing = current.find((item) => item.product.id === product.id);
    return existing ? current.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item) : [...current, { product, quantity }];
  });
  const updateQuantity = (id: string, change: number) => setCart((current) => current.map((item) => item.product.id === id ? { ...item, quantity: item.quantity + change } : item).filter((item) => item.quantity > 0));
  const removeFromCart = (id: string) => setCart((current) => current.filter((item) => item.product.id !== id));
  const clearCart = () => setCart([]);
  const placeOrder = (details: CheckoutDetails) => {
    const order: Order = { id: `NM-${Date.now().toString().slice(-8)}`, date: new Intl.DateTimeFormat("en-LK", { day: "2-digit", month: "short", year: "numeric" }).format(new Date()), total, items: cartCount, payment: details.payment, status: "Confirmed", cart, customerName: details.name, address: `${details.address}, ${details.city}`, deliveryMethod: details.deliveryMethod, notes: details.notes };
    const customerOrders = [...orders.filter((item) => !sampleOrders.some((sample) => sample.id === item.id)), order];
    setOrders([...sampleOrders, ...customerOrders]);
    window.localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(customerOrders));
    window.localStorage.setItem(STORAGE_KEYS.recentOrder, JSON.stringify(order));
    clearCart();
    return order;
  };
  const login = (email: string, password: string) => { const match = users.find((item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password); if (!match) return false; setUser(match); window.localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(match)); return true; };
  const register = (details: Omit<User, "id">) => { if (users.some((item) => item.email.toLowerCase() === details.email.trim().toLowerCase())) return { ok: false, error: "An account with this email already exists." }; const newUser = { ...details, id: `customer-${Date.now()}` }; setUsers((current) => [...current, newUser]); setUser(newUser); window.localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(newUser)); return { ok: true }; };
  const updateProfile = (details: Pick<User, "name" | "mobile" | "address">) => { if (!user) return; const updated = { ...user, ...details }; setUser(updated); setUsers((current) => current.map((item) => item.id === user.id ? updated : item)); window.localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(updated)); };
  const logout = () => { setUser(null); window.localStorage.removeItem(STORAGE_KEYS.session); };
  const getOrder = (id: string) => orders.find((order) => order.id === id);

  const value = { cart, orders, user, users, hydrated, cartCount, subtotal, delivery, total, addToCart, updateQuantity, removeFromCart, clearCart, placeOrder, login, register, updateProfile, logout, getOrder };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore() { const context = useContext(AppContext); if (!context) throw new Error("useAppStore must be used inside AppStoreProvider"); return context; }