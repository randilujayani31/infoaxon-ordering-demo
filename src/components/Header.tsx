"use client";

import { Menu, Search, ShoppingCart, ShoppingBag, UserRound, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAppStore } from "@/store/AppStore";

export default function Header() {
  const pathname = usePathname(); const router = useRouter(); const { cartCount, total, user, settings } = useAppStore();
  const [search, setSearch] = useState(""); const [menuOpen, setMenuOpen] = useState(false);
  const nav = [{ href: "/", label: "Home" }, { href: "/shop", label: "Shop" }, { href: "/categories", label: "Categories" }, { href: "/offers", label: "Offers" }, { href: "/orders", label: "My Orders" }];
  const submitSearch = (event: React.FormEvent) => { event.preventDefault(); router.push(search.trim() ? `/shop?search=${encodeURIComponent(search.trim())}` : "/shop"); setMenuOpen(false); };
  return <>
    <div className="announcement"><div className="container announcement-inner"><span><span className="announcement-dot" /> Free delivery on orders over Rs. {settings.freeDeliveryThreshold.toLocaleString("en-LK")}</span><span className="announcement-right">{settings.openingHours}</span></div></div>
    <header className="site-header"><div className="container header-inner">
      <button className="mobile-icon menu-trigger" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
      <Link className="brand" href="/" onClick={() => setMenuOpen(false)}><span className="brand-mark"><ShoppingBag size={20} /></span><span><strong>{settings.storeName.slice(0, -3)}<span>{settings.storeName.slice(-3)}</span></strong><small>{settings.tagline}</small></span></Link>
      <nav className={`desktop-nav ${menuOpen ? "open" : ""}`}>{nav.map((item) => <Link key={item.href} href={item.href} className={pathname === item.href ? "active" : ""} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}</nav>
      <div className="header-actions"><form className="header-search" onSubmit={submitSearch}><Search size={17} /><input aria-label="Search products" placeholder="Search products..." value={search} onChange={(event) => setSearch(event.target.value)} /><kbd>⌘ K</kbd></form><Link className="account-button" href={user ? "/account" : "/login"}><UserRound size={18} /><span>{user ? user.name.split(" ")[0] : "Account"}</span></Link><Link className="cart-button" href="/cart" aria-label={`Cart with ${cartCount} items`}><ShoppingCart size={20} /><span className="cart-label">Cart</span>{cartCount > 0 && <b>{cartCount}</b>}</Link></div>
    </div></header>
    {pathname !== "/" && <div className="header-total"><div className="container"><span>{cartCount} {cartCount === 1 ? "item" : "items"} in cart</span><Link href="/cart">{total ? `View cart · Rs. ${total.toLocaleString("en-LK")}` : "Your cart is empty"}</Link></div></div>}
  </>;
}