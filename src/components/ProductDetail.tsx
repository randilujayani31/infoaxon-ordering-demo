"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { money, type Product } from "@/data/catalog";
import { useAppStore } from "@/store/AppStore";
import ProductGrid from "./ProductGrid";

export default function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const [quantity, setQuantity] = useState(1); const { addToCart } = useAppStore();
  return <section className="product-detail-page"><div className="container"><Link className="back-link" href="/shop"><ArrowLeft size={16} /> Back to shop</Link><div className="product-detail"><div className="detail-image"><Image src={product.image} alt={product.name} fill priority sizes="(max-width: 760px) 100vw, 50vw" /></div><div className="detail-copy"><span className="product-category">{product.category}</span><h1>{product.name}</h1><span className="detail-rating"><Star size={15} fill="currentColor" /> {product.rating} <small>Customer rating</small></span><p>{product.description}</p><div className="detail-price"><strong>{money(product.salePrice ?? product.price)}</strong>{product.salePrice && <del>{money(product.price)}</del>}<small>/ {product.unit}</small></div><span className={product.stock === "Low stock" ? "low-stock" : "in-stock"}><i /> {product.stock}</span><div className="detail-actions"><div className="quantity"><button aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={15} /></button><span>{quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)}><Plus size={15} /></button></div><button className="primary-button" onClick={() => addToCart(product, quantity)}>Add to cart <ShoppingCart size={17} /></button></div><div className="detail-note">Free delivery on orders over Rs. 5,000</div></div></div><div className="related-products"><div className="section-heading"><div><span className="eyebrow"><span /> You may also like</span><h2>More from {product.category}</h2></div></div><ProductGrid items={related} /></div></div></section>;
}
