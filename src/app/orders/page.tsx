"use client";

import Link from "next/link";
import { ArrowRight, Repeat2 } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PageFrame from "@/components/PageFrame";
import EmptyState from "@/components/EmptyState";
import OrderProgress from "@/components/OrderProgress";
import { money } from "@/data/catalog";
import { useAppStore } from "@/store/AppStore";

export default function OrdersPage() {
  const router = useRouter(); const { orders, user, hydrated, addToCart } = useAppStore();
  useEffect(() => { if (hydrated && !user) router.replace("/login"); }, [hydrated, user, router]);
  if (!hydrated || !user) return <PageFrame><section className="listing-page"><div className="container loading-state">Loading your orders...</div></section></PageFrame>;
  const repeat = (order: (typeof orders)[number]) => { if (!order.cart.length) { router.push("/shop"); return; } order.cart.forEach((item) => addToCart(item.product, item.quantity)); router.push("/cart"); };
  return <PageFrame><section className="listing-page orders-page"><div className="container"><div className="page-heading"><div><span className="eyebrow"><span /> Your NovaMart history</span><h1>My orders</h1><p>Track your latest deliveries and find something to love again.</p></div><Link className="primary-button" href="/shop">Shop again <ArrowRight size={16} /></Link></div>{orders.length === 0 ? <EmptyState title="No orders yet" description="Your first order will appear here after checkout." /> : <div className="orders-list">{orders.map((order) => <article className="order-card" key={order.id}><div className="order-top"><div><span className="order-status"><i /> {order.status}</span><h2>{order.id}</h2><p>{order.date} · {order.items} items · {order.payment}</p></div><div className="order-total"><strong>{money(order.total)}</strong><div className="order-actions"><Link href={`/orders/${encodeURIComponent(order.id)}`}>View details <ArrowRight size={14} /></Link><button onClick={() => repeat(order)}><Repeat2 size={14} /> Repeat order</button></div></div></div><OrderProgress status={order.status} /></article>)}</div>}</div></section></PageFrame>;
}
