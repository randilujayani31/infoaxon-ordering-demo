"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAppStore } from "@/store/AppStore";

export default function CategoryGrid() {
  const { categories } = useAppStore(); const visible = categories.filter((item) => item.active !== false);
  return <div className="category-grid">{visible.map((item) => <Link className="category-card" key={item.name} href={`/shop?category=${encodeURIComponent(item.name)}`}><span className={`category-icon ${item.color}`}>{item.icon}</span><strong>{item.name}</strong><small>{item.count}</small><ArrowRight size={16} /></Link>)}</div>;
}
