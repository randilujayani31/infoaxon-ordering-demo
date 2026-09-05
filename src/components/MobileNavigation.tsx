"use client";

import { Home, LayoutGrid, PackageCheck, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/store/AppStore";

export default function MobileNavigation() {
  const pathname = usePathname(); const { cartCount } = useAppStore();
  const items = [{ href: "/", label: "Home", icon: Home }, { href: "/shop", label: "Shop", icon: LayoutGrid }, { href: "/orders", label: "Orders", icon: PackageCheck }, { href: "/account", label: "Account", icon: UserRound }, { href: "/cart", label: "Cart", icon: ShoppingCart }];
  return <nav className="mobile-nav">{items.map(({ href, label, icon: Icon }) => <Link className={pathname === href || (href === "/orders" && pathname.startsWith("/orders/")) ? "active" : ""} href={href} key={href}><span className={href === "/cart" ? "mobile-cart-icon" : ""}><Icon size={19} />{href === "/cart" && cartCount > 0 && <b>{cartCount}</b>}</span><span>{label}</span></Link>)}</nav>;
}
