"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import PageFrame from "@/components/PageFrame";
import ProductDetail from "@/components/ProductDetail";
import { useAppStore } from "@/store/AppStore";

export default function ProductPage() { const { id } = useParams<{ id: string }>(); const { products, hydrated } = useAppStore(); const product = products.find((item) => item.id === id && item.active !== false); if (!hydrated) return <PageFrame><section className="listing-page"><div className="container loading-state">Loading product...</div></section></PageFrame>; if (!product) return <PageFrame><section className="listing-page"><div className="container"><div className="not-found-state"><span>404</span><h1>That product has moved on</h1><p>We couldn&apos;t find that item, but there are plenty more everyday favourites waiting for you.</p><Link className="primary-button" href="/shop">Back to shop</Link></div></div></section></PageFrame>; return <PageFrame><ProductDetail product={product} related={products.filter((item) => item.category === product.category && item.id !== product.id && item.active !== false).slice(0, 4)} /></PageFrame>; }
