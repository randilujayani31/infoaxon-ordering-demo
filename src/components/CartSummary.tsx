"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { money } from "@/data/catalog";
import { useAppStore } from "@/store/AppStore";

export default function CartSummary({ checkout = false }: { checkout?: boolean }) {
  const { subtotal, delivery, total } = useAppStore();
  return <aside className="cart-summary page-cart-summary"><h3>{checkout ? "Order summary" : "Cart summary"}</h3><div><span>Subtotal</span><b>{money(subtotal)}</b></div><div><span>Delivery</span><b>{delivery ? money(delivery) : "Free"}</b></div><div><span>Discount</span><b className="discount-text">Included</b></div><div className="summary-total"><span>Total</span><strong>{money(total)}</strong></div>{checkout ? <button className="primary-button place-order" form="checkout-form" type="submit">Place order <span>→</span></button> : <Link className="primary-button checkout-button" href="/checkout">Proceed to checkout <span>→</span></Link>}<p className="demo-note"><ShieldCheck size={14} /> Secure demo checkout</p></aside>;
}
