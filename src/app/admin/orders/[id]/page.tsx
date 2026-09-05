"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Printer, Save } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { AdminPageHeader, AdminToast, StatusBadge } from "@/components/admin/AdminPrimitives";
import OrderProgress from "@/components/OrderProgress";
import { money } from "@/data/catalog";
import { type OrderStatus, useAppStore } from "@/store/AppStore";

const statuses: OrderStatus[] = ["New", "Confirmed", "Preparing", "Dispatched", "Delivered", "Cancelled"];

export default function AdminOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { getOrder, updateOrderStatus, hydrated } = useAppStore();
  const order = getOrder(decodeURIComponent(id));
  const [status, setStatus] = useState<OrderStatus>(order?.status ?? "New");
  const [toast, setToast] = useState("");

  if (!hydrated) return <div className="admin-loading">Loading order...</div>;
  if (!order) return <div className="admin-not-found"><h2>Order not found</h2><p>This order may not exist in the demo data.</p><Link href="/admin/orders" className="admin-button secondary">Back to orders</Link></div>;
  const save = () => { updateOrderStatus(order.id, status); setToast(`Order ${order.id} updated to ${status}.`); };
  const backToOrders = () => router.push("/admin/orders");

  return <div className="admin-route"><button className="admin-back-link admin-back-button" onClick={backToOrders}><ArrowLeft size={15} /> Back to orders</button><AdminPageHeader eyebrow="Order detail" title={order.id} description={`${order.date} · ${order.items} items · ${order.payment}`} action={<div className="admin-header-actions"><button className="admin-button secondary" onClick={() => window.print()}><Printer size={16} /> Print order</button><button className="admin-button primary" onClick={save}><Save size={16} /> Save status</button></div>} /><div className="admin-order-detail-grid"><div className="admin-order-main"><section className="admin-panel"><div className="admin-panel-heading"><div><span className="admin-eyebrow">Fulfilment status</span><h3><StatusBadge status={status} /></h3></div><select className="admin-status-select" value={status} onChange={(event) => setStatus(event.target.value as OrderStatus)}>{statuses.map((item) => <option key={item}>{item}</option>)}</select></div><OrderProgress status={status} /></section><section className="admin-panel"><div className="admin-panel-heading"><div><span className="admin-eyebrow">Order contents</span><h3>{order.items} items</h3></div></div>{order.cart.length ? order.cart.map((item) => <div className="admin-detail-item" key={item.product.id}><span>{item.product.image && <Image src={item.product.image} alt="" fill sizes="56px" />}</span><div><b>{item.product.name}</b><small>{item.quantity} × {item.product.unit}</small></div><strong>{money((item.product.salePrice ?? item.product.price) * item.quantity)}</strong></div>) : <p className="admin-muted">This is a seeded sample order with no item snapshot.</p>}<div className="admin-order-total-lines"><div><span>Subtotal</span><b>{money(order.total)}</b></div><div><span>Delivery</span><b>Included</b></div><div className="admin-total-line"><span>Total</span><strong>{money(order.total)}</strong></div></div></section></div><aside className="admin-order-side"><section className="admin-panel"><span className="admin-eyebrow">Customer</span><h3>{order.customerName}</h3><p className="admin-muted">{order.address}</p><span className="admin-info-line">{order.deliveryMethod}</span></section><section className="admin-panel"><span className="admin-eyebrow">Payment</span><h3>{order.payment}</h3><p className="admin-muted">Demo payment method. No transaction was processed.</p>{order.notes && <><span className="admin-eyebrow">Order notes</span><p>{order.notes}</p></>}</section></aside></div>{toast && <AdminToast message={toast} onClose={() => setToast("")} />}</div>;
}
