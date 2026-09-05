"use client";

import { Heart, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import Link from "next/link";
import { useAppStore } from "@/store/AppStore";

export default function Footer() {
  const { settings } = useAppStore();
  return <footer className="footer"><div className="container footer-grid"><div className="footer-brand"><Link className="brand" href="/"><span className="brand-mark"><ShoppingBag size={20} /></span><span><strong>{settings.storeName.slice(0, -3)}<span>{settings.storeName.slice(-3)}</span></strong><small>{settings.tagline}</small></span></Link><p>Your trusted everyday retail partner in Sri Lanka.</p><div className="socials"><a aria-label="Facebook" href="https://facebook.com" target="_blank" rel="noreferrer">f</a><a aria-label="Instagram" href="https://instagram.com" target="_blank" rel="noreferrer">◎</a><a aria-label="WhatsApp" href="https://wa.me/94112345678" target="_blank" rel="noreferrer">◔</a></div></div><div><h4>Explore</h4><Link href="/shop">Shop all</Link><Link href="/offers">Offers</Link><Link href="/orders">My orders</Link></div><div><h4>Need help?</h4><a href={`tel:${settings.phone}`}>{settings.phone}</a><a href={`mailto:${settings.email}`}>{settings.email}</a><span>{settings.openingHours}</span></div><div><h4>Our promise</h4><span className="promise"><ShieldCheck size={18} /> Secure payments</span><span className="promise"><Truck size={18} /> Islandwide delivery</span><span className="promise"><Heart size={17} /> Made for you</span></div></div><div className="container footer-bottom"><span>© 2026 {settings.storeName}. Demo store for illustration.</span><span>Terms &nbsp; Privacy &nbsp; Help centre</span></div></footer>;
}
