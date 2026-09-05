"use client";

import Link from "next/link";
import { ArrowRight, Check, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import PageFrame from "@/components/PageFrame";
import { money } from "@/data/catalog";
import { STORAGE_KEYS } from "@/data/store";
import { useAppStore, type Order } from "@/store/AppStore";

export default function OrderSuccessPage() {
  const { orders } = useAppStore(); const [order, setOrder] = useState<Order | null>(null);
  useEffect(() => { const loadRecentOrder = window.setTimeout(() => { const id = new URLSearchParams(window.location.search).get("order"); const saved = window.localStorage.getItem(STORAGE_KEYS.recentOrder); const recent = saved ? JSON.parse(saved) as Order : null; setOrder((id && orders.find((item) => item.id === id)) || recent); }, 0); return () => window.clearTimeout(loadRecentOrder); }, [orders]);
  return <PageFrame><section className="success-page"><div className="container"><div className="success-panel">{order ? <><div className="success-icon"><Check size={32} /></div><span className="eyebrow success-eyebrow"><span /> Order confirmed</span><h1>Thank you for your order!</h1><p>We&apos;ve received your order and will start getting it ready right away.</p><div className="success-order-number"><small>Order number</small><strong>{order.id}</strong><span>{order.date} · {money(order.total)} · {order.payment}</span></div><div className="success-delivery"><div><Truck size={20} /><span><b>Expected delivery</b><small>{order.deliveryMethod === "Express delivery (same day)" ? "Today, before 8 PM" : "Within 1-2 business days"}</small></span></div><div><PackageCheck size={20} /><span><b>Delivery to</b><small>{order.address}</small></span></div></div><div className="success-actions"><Link className="primary-button" href="/orders">View my orders <ArrowRight size={17} /></Link><Link className="outline-button" href="/shop">Continue shopping</Link></div><small className="success-note"><ShieldCheck size={14} /> This is a demo order. No payment was processed.</small></> : <><div className="success-icon muted-success"><PackageCheck size={30} /></div><h1>No recent order to show</h1><p>Your order confirmation will appear here just after checkout.</p><Link className="primary-button" href="/shop">Start shopping <ArrowRight size={17} /></Link></>}</div></div></section></PageFrame>;
}
