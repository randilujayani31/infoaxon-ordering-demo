"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { defaultCategories, defaultProducts, type Product, type StoreCategory } from "@/data/catalog";
import { DEMO_ADMIN, DEMO_USER, defaultSettings, sampleOrders, STORAGE_KEYS, type AdminUser, type StoreSettings } from "@/data/store";

export type CartItem = { product: Product; quantity: number };
export type User = { id: string; name: string; email: string; mobile: string; password: string; address?: string };
export type OrderStatus = "New" | "Confirmed" | "Preparing" | "Dispatched" | "Delivered" | "Cancelled";
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
  products: Product[];
  categories: StoreCategory[];
  settings: StoreSettings;
  admin: AdminUser | null;
  updateProduct: (product: Product) => { ok: boolean; error?: string };
  deleteProduct: (id: string) => void;
  toggleProduct: (id: string) => void;
  addProduct: (product: Product) => { ok: boolean; error?: string };
  updateCategory: (category: StoreCategory, previousName?: string) => { ok: boolean; error?: string };
  deleteCategory: (name: string) => { ok: boolean; error?: string };
  toggleCategory: (name: string) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  adminLogin: (email: string, password: string) => boolean;
  adminLogout: () => void;
  updateSettings: (settings: StoreSettings) => void;
  resetDemoData: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [users, setUsers] = useState<User[]>([DEMO_USER]);
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [categories, setCategories] = useState<StoreCategory[]>(defaultCategories);
  const [settings, setSettings] = useState<StoreSettings>(defaultSettings);
  const [admin, setAdmin] = useState<AdminUser | null>(null);

  useEffect(() => {
    const hydrate = window.setTimeout(() => {
      const savedCart = window.localStorage.getItem(STORAGE_KEYS.cart);
      const savedOrders = window.localStorage.getItem(STORAGE_KEYS.orders);
      const savedUsers = window.localStorage.getItem(STORAGE_KEYS.users);
      const savedSession = window.localStorage.getItem(STORAGE_KEYS.session);
      const savedProducts = window.localStorage.getItem(STORAGE_KEYS.products);
      const savedCategories = window.localStorage.getItem(STORAGE_KEYS.categories);
      const savedSettings = window.localStorage.getItem(STORAGE_KEYS.settings);
      const savedAdmin = window.localStorage.getItem(STORAGE_KEYS.adminSession);
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedOrders) { const parsedOrders = JSON.parse(savedOrders) as Order[]; setOrders([...sampleOrders.map((sample) => parsedOrders.find((order) => order.id === sample.id) ?? sample), ...parsedOrders.filter((order) => !sampleOrders.some((sample) => sample.id === order.id))]); }
      if (savedUsers) setUsers([DEMO_USER, ...JSON.parse(savedUsers)]);
      if (savedSession) setUser(JSON.parse(savedSession));
      if (savedProducts) setProducts(JSON.parse(savedProducts));
      if (savedCategories) setCategories(JSON.parse(savedCategories));
      if (savedSettings) setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) });
      if (savedAdmin) setAdmin(JSON.parse(savedAdmin));
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(hydrate);
  }, []);

  useEffect(() => { if (hydrated) window.localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart)); }, [cart, hydrated]);
  useEffect(() => { if (hydrated) window.localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users.filter((item) => item.id !== DEMO_USER.id))); }, [users, hydrated]);
  useEffect(() => { if (hydrated) window.localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products)); }, [products, hydrated]);
  useEffect(() => { if (hydrated) window.localStorage.setItem(STORAGE_KEYS.categories, JSON.stringify(categories)); }, [categories, hydrated]);
  useEffect(() => { if (hydrated) window.localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings)); }, [settings, hydrated]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.product.salePrice ?? item.product.price) * item.quantity, 0);
  const delivery = subtotal === 0 || subtotal >= settings.freeDeliveryThreshold ? 0 : settings.deliveryCharge;
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
  const addProduct = (product: Product) => { if (products.some((item) => item.sku && item.sku === product.sku)) return { ok: false, error: "That SKU is already in use." }; const normalized = { ...product, id: product.id || `product-${Date.now()}`, stock: (product.stockQuantity ?? 0) <= 5 ? "Low stock" as const : "In stock" as const, active: product.active ?? true }; setProducts((current) => [...current, normalized]); return { ok: true }; };
  const updateProduct = (product: Product) => { if (products.some((item) => item.sku && item.sku === product.sku && item.id !== product.id)) return { ok: false, error: "That SKU is already in use." }; const normalized = { ...product, stock: (product.stockQuantity ?? 0) <= 5 ? "Low stock" as const : "In stock" as const }; setProducts((current) => current.map((item) => item.id === product.id ? normalized : item)); setCart((current) => current.map((item) => { const updated = normalized.id === item.product.id ? normalized : item.product; return { ...item, product: updated }; })); return { ok: true }; };
  const deleteProduct = (id: string) => setProducts((current) => current.filter((item) => item.id !== id));
  const toggleProduct = (id: string) => setProducts((current) => current.map((item) => item.id === id ? { ...item, active: item.active === false } : item));
  const updateCategory = (category: StoreCategory, previousName?: string) => { if (categories.some((item) => item.name.toLowerCase() === category.name.toLowerCase() && item.name !== previousName)) return { ok: false, error: "That category already exists." }; setCategories((current) => previousName ? current.map((item) => item.name === previousName ? category : item) : [...current, category]); if (previousName && previousName !== category.name) setProducts((current) => current.map((item) => item.category === previousName ? { ...item, category: category.name } : item)); return { ok: true }; };
  const deleteCategory = (name: string) => { if (products.some((item) => item.category === name)) return { ok: false, error: "Reassign products before deleting this category." }; setCategories((current) => current.filter((item) => item.name !== name)); return { ok: true }; };
  const toggleCategory = (name: string) => setCategories((current) => current.map((item) => item.name === name ? { ...item, active: item.active === false } : item));
  const updateOrderStatus = (id: string, status: OrderStatus) => { const updated = orders.map((order) => order.id === id ? { ...order, status } : order); setOrders(updated); window.localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(updated)); };
  const adminLogin = (email: string, password: string) => { if (email.trim().toLowerCase() !== "admin@novamart.lk" || password !== "admin123") return false; setAdmin(DEMO_ADMIN); window.localStorage.setItem(STORAGE_KEYS.adminSession, JSON.stringify(DEMO_ADMIN)); return true; };
  const adminLogout = () => { setAdmin(null); window.localStorage.removeItem(STORAGE_KEYS.adminSession); };
  const updateSettings = (next: StoreSettings) => setSettings(next);
  const resetDemoData = () => { setProducts(defaultProducts); setCategories(defaultCategories); setSettings(defaultSettings); setOrders(sampleOrders); setUsers([DEMO_USER]); setCart([]); setUser(null); window.localStorage.removeItem(STORAGE_KEYS.session); [STORAGE_KEYS.products, STORAGE_KEYS.categories, STORAGE_KEYS.settings, STORAGE_KEYS.orders, STORAGE_KEYS.users, STORAGE_KEYS.cart, STORAGE_KEYS.recentOrder].forEach((key) => window.localStorage.removeItem(key)); };

  const value = { cart, orders, user, users, hydrated, cartCount, subtotal, delivery, total, addToCart, updateQuantity, removeFromCart, clearCart, placeOrder, login, register, updateProfile, logout, getOrder, products, categories, settings, admin, updateProduct, deleteProduct, toggleProduct, addProduct, updateCategory, deleteCategory, toggleCategory, updateOrderStatus, adminLogin, adminLogout, updateSettings, resetDemoData };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore() { const context = useContext(AppContext); if (!context) throw new Error("useAppStore must be used inside AppStoreProvider"); return context; }