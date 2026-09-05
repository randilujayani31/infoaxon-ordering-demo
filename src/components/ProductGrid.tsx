"use client";

import { type Product } from "@/data/catalog";
import { useAppStore } from "@/store/AppStore";
import ProductCard from "./ProductCard";

export default function ProductGrid({ items }: { items: Product[] }) {
  const { products } = useAppStore();
  const currentItems = items.map((item) => products.find((product) => product.id === item.id) ?? item).filter((product) => product.active !== false);
  if (!currentItems.length) return <div className="empty-products">No products found. Try a different search or category.</div>;
  return <div className="product-grid">{currentItems.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}
