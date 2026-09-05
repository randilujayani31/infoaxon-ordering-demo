"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Plus, Star } from "lucide-react";
import { useAppStore } from "@/store/AppStore";
import { discountPercent, money, type Product } from "@/data/catalog";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useAppStore();
  return <article className="product-card"><Link className="product-image" href={`/product/${product.id}`}>{product.tag && <span className="product-tag">{product.tag}</span>}{product.salePrice && <span className="discount-badge">-{discountPercent(product)}%</span>}<span className="wishlist" aria-label={`Save ${product.name}`}><Heart size={17} /></span><Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 45vw, (max-width: 1000px) 25vw, 260px" /></Link><div className="product-info"><small className="product-category">{product.category}</small><Link href={`/product/${product.id}`}><h3>{product.name}</h3></Link><span className="rating"><Star size={13} fill="currentColor" /> {product.rating}</span><div className="product-price"><strong>{money(product.salePrice ?? product.price)}</strong>{product.salePrice && <del>{money(product.price)}</del>}<small>/ {product.unit}</small></div><div className="product-bottom"><span className={product.stock === "Low stock" ? "low-stock" : "in-stock"}><i /> {product.stock}</span><button className="add-button" onClick={() => addToCart(product)} aria-label={`Add ${product.name} to cart`}><Plus size={18} /></button></div></div></article>;
}
