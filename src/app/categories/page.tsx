"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageFrame from "@/components/PageFrame";
import { useAppStore } from "@/store/AppStore";

export default function CategoriesPage() {
  const { categories } = useAppStore(); const visible = categories.filter((item) => item.active !== false);
  return <PageFrame><section className="listing-page"><div className="container"><div className="page-heading"><div><span className="eyebrow"><span /> Find your next favourite</span><h1>Browse categories</h1><p>From pantry staples to clever little upgrades for daily life.</p></div></div><div className="category-page-grid">{visible.map((item) => <Link className="category-feature-card" href={`/shop?category=${encodeURIComponent(item.name)}`} key={item.name}><span className={`category-icon ${item.color}`}>{item.icon}</span><div><span className="eyebrow">{item.count}</span><h2>{item.name}</h2><p>{item.description}</p><span className="category-link">Explore category <ArrowRight size={15} /></span></div></Link>)}</div></div></section></PageFrame>;
}
