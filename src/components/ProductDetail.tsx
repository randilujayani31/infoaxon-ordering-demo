"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { money, type Product } from "@/data/catalog";
import { useAppStore } from "@/store/AppStore";
import ProductGrid from "./ProductGrid";

export default function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const [quantity, setQuantity] = useState(1); const { addToCart, products } = useAppStore(); const current = products.find((item) => item.id === product.id && item.active !== false) ?? product; const currentRelated = related.map((item) => products.find((candidate) => candidate.id === item.id) ?? item).filter((item) => item.active !== false);
  return <section className="product-detail-page"><div className="container"><Link className="back-link" href="/shop"><ArrowLeft size={16} /> Back to shop</Link><div className="product-detail"><div className="detail-image"><Image src={current.image} alt={current.name} fill priority sizes="(max-width: 760px) 100vw, 50vw" /></div><div className="detail-copy"><span className="product-category">{current.category}</span><h1>{current.name}</h1><span className="detail-rating"><Star size={15} fill="currentColor" /> {current.rating} <small>Customer rating</small></span><p>{current.description}</p><div className="detail-price"><strong>{money(current.salePrice ?? current.price)}</strong>{current.salePrice && <del>{money(current.price)}</del>}<small>/ {current.unit}</small></div><span className={current.stock === "Low stock" ? "low-stock" : "in-stock"}><i /> {current.stock}</span><div className="detail-actions"><div className="quantity"><button aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={15} /></button><span>{quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)}><Plus size={15} /></button></div><button className="primary-button" onClick={() => addToCart(current, quantity)}>Add to cart <ShoppingCart size={17} /></button></div><div className="detail-note">Free delivery on orders over Rs. 5,000</div></div></div><div className="related-products"><div className="section-heading"><div><span className="eyebrow"><span /> You may also like</span><h2>More from {current.category}</h2></div></div><ProductGrid items={currentRelated} /></div></div></section>;
}
