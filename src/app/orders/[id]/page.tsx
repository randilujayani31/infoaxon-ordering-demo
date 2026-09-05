"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Repeat2 } from "lucide-react";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import PageFrame from "@/components/PageFrame";
import OrderProgress from "@/components/OrderProgress";
import { money } from "@/data/catalog";
import { useAppStore } from "@/store/AppStore";

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>(); const router = useRouter(); const { getOrder, user, hydrated, addToCart } = useAppStore();
  useEffect(() => { if (hydrated && !user) router.replace("/login"); }, [hydrated, user, router]);
  if (!hydrated || !user) return <PageFrame><section className="listing-page"><div className="container loading-state">Loading order details...</div></section></PageFrame>;
  const order = getOrder(decodeURIComponent(params.id));
  if (!order) return <PageFrame><section className="listing-page"><div className="container"><div className="not-found-state"><span>404</span><h1>Order not found</h1><p>We could not find that order in your NovaMart history.</p><Link className="primary-button" href="/orders">Back to my orders</Link></div></div></section></PageFrame>;
  const repeat = () => { order.cart.forEach((item) => addToCart(item.product, item.quantity)); router.push(order.cart.length ? "/cart" : "/shop"); };
  return <PageFrame><section className="listing-page order-detail-page"><div className="container"><Link className="back-link" href="/orders"><ArrowLeft size={16} /> Back to my orders</Link><div className="detail-order-header"><div><span className="eyebrow"><span /> Order details</span><h1>{order.id}</h1><p>{order.date} · {order.payment}</p></div><button className="outline-button" onClick={repeat}><Repeat2 size={15} /> Repeat order</button></div><div className="order-detail-grid"><div><section className="account-card order-timeline-card"><div className="card-heading"><div><small>Delivery status</small><h2>{order.status}</h2></div></div><OrderProgress status={order.status} /></section><section className="account-card order-items-card"><div className="card-heading"><div><small>{order.items} items</small><h2>What&apos;s in your order</h2></div></div>{order.cart.length ? order.cart.map((item) => <div className="detail-item" key={item.product.id}><div className="detail-item-image"><Image src={item.product.image} alt={item.product.name} fill sizes="64px" /></div><div><strong>{item.product.name}</strong><small>{item.quantity} × {item.product.unit}</small></div><b>{money((item.product.salePrice ?? item.product.price) * item.quantity)}</b></div>) : <p className="muted-copy">This sample order was imported from your previous shopping history.</p>}</section></div><aside className="order-info-stack"><div className="account-card"><small>Delivery to</small><h2>{order.customerName}</h2><p>{order.address}</p><span className="order-info-line">{order.deliveryMethod}</span></div><div className="account-card order-totals"><h2>Payment summary</h2><div><span>Subtotal</span><b>{money(order.total)}</b></div><div><span>Delivery</span><b>Included</b></div><div className="summary-total"><span>Total</span><strong>{money(order.total)}</strong></div><p>Paid with {order.payment}</p></div></aside></div><Link className="back-link" href="/shop">Continue shopping <ArrowRight size={15} /></Link></div></section></PageFrame>;
}
