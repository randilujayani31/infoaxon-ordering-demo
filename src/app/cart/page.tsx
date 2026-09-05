"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import PageFrame from "@/components/PageFrame";
import EmptyState from "@/components/EmptyState";
import CartSummary from "@/components/CartSummary";
import { money } from "@/data/catalog";
import { useAppStore } from "@/store/AppStore";

export default function CartPage() {
  const { cart, hydrated, updateQuantity, removeFromCart, clearCart } = useAppStore();
  if (!hydrated) return <PageFrame><section className="listing-page"><div className="container loading-state">Loading your basket...</div></section></PageFrame>;
  return <PageFrame><section className="listing-page cart-page"><div className="container"><div className="page-heading"><div><span className="eyebrow"><span /> Ready when you are</span><h1>Your shopping cart</h1><p>Review your essentials before you head to checkout.</p></div>{cart.length > 0 && <button className="clear-cart" onClick={() => { if (window.confirm("Remove all items from your cart?")) clearCart(); }}><Trash2 size={15} /> Clear cart</button>}</div>{cart.length === 0 ? <EmptyState type="cart" title="Your basket is waiting" description="Add a few everyday favourites and they will appear here." /> : <div className="cart-layout"><div className="cart-list">{cart.map(({ product, quantity }) => <article className="cart-page-item" key={product.id}><Link className="cart-page-thumb" href={`/product/${product.id}`}><Image src={product.image} alt={product.name} fill sizes="110px" /></Link><div className="cart-page-info"><small>{product.category}</small><Link href={`/product/${product.id}`}><h2>{product.name}</h2></Link><p>{product.unit}</p><div className="cart-page-bottom"><div className="quantity"><button onClick={() => updateQuantity(product.id, -1)} aria-label="Decrease quantity"><Minus size={14} /></button><span>{quantity}</span><button onClick={() => updateQuantity(product.id, 1)} aria-label="Increase quantity"><Plus size={14} /></button></div><strong>{money((product.salePrice ?? product.price) * quantity)}</strong></div></div><button className="remove-cart-item" onClick={() => removeFromCart(product.id)} aria-label={`Remove ${product.name}`}><Trash2 size={17} /></button></article>)}</div><CartSummary /></div>}<Link className="back-link cart-back" href="/shop"><ArrowLeft size={16} /> Continue shopping</Link></div></section></PageFrame>;
}
