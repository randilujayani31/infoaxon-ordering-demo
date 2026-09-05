"use client";

import { Bell, ChevronLeft, ChevronRight, CircleUserRound, LayoutDashboard, LogOut, Menu, Package, Settings, ShoppingCart, Store, Tags, Users, X, BarChart3 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { useAppStore } from "@/store/AppStore";

const navigation = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard }, { href: "/admin/products", label: "Products", icon: Package }, { href: "/admin/categories", label: "Categories", icon: Tags }, { href: "/admin/orders", label: "Orders", icon: ShoppingCart }, { href: "/admin/customers", label: "Customers", icon: Users }, { href: "/admin/reports", label: "Reports", icon: BarChart3 }, { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminShell({ children, title }: { children: ReactNode; title: string }) {
  const pathname = usePathname(); const router = useRouter(); const { admin, hydrated, adminLogout } = useAppStore(); const [sidebarOpen, setSidebarOpen] = useState(false); const [collapsed, setCollapsed] = useState(false);
  useEffect(() => { if (pathname !== "/admin/login" && hydrated && !admin) router.replace("/admin/login"); }, [admin, hydrated, pathname, router]);
  if (pathname === "/admin/login") return <>{children}</>;
  if (!hydrated || !admin) return <div className="admin-loading">Loading admin workspace...</div>;
  return <div className={`admin-shell ${collapsed ? "sidebar-collapsed" : ""}`}><aside className={`admin-sidebar ${sidebarOpen ? "mobile-open" : ""}`}><div className="admin-brand"><span className="admin-brand-mark"><Store size={19} /></span><span><strong>Nova<span>Mart</span></strong><small>Admin workspace</small></span><button className="admin-mobile-close" onClick={() => setSidebarOpen(false)}><X size={18} /></button></div><nav>{navigation.map(({ href, label, icon: Icon }) => <Link href={href} className={pathname === href || (href !== "/admin" && pathname.startsWith(`${href}/`)) ? "active" : ""} key={href} onClick={() => setSidebarOpen(false)}><Icon size={18} /><span>{label}</span></Link>)}</nav><div className="admin-sidebar-footer"><Link href="/"><Store size={17} /> <span>View customer store</span></Link><button onClick={() => { adminLogout(); router.push("/admin/login"); }}><LogOut size={17} /> <span>Log out</span></button></div></aside><div className="admin-main"><header className="admin-topbar"><button className="admin-menu-button" onClick={() => setSidebarOpen(true)} aria-label="Open admin navigation"><Menu size={21} /></button><button className="admin-collapse-button" onClick={() => setCollapsed((value) => !value)} aria-label="Toggle sidebar"><ChevronLeft size={18} /></button><div className="admin-page-title"><span>NovaMart Admin</span><h1>{title}</h1></div><div className="admin-top-actions"><label className="admin-global-search"><Package size={16} /><input placeholder="Search workspace" aria-label="Search workspace" /></label><button className="admin-icon-button" aria-label="Notifications"><Bell size={18} /><b>3</b></button><Link className="admin-view-store" href="/"><Store size={16} /> View store</Link><div className="admin-user"><CircleUserRound size={25} /><span><strong>{admin.name}</strong><small>Administrator</small></span><ChevronRight size={14} /></div></div></header><main className="admin-content">{children}</main></div></div>;
}