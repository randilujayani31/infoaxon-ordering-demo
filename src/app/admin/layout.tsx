"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const title = pathname === "/admin" ? "Dashboard" : pathname.startsWith("/admin/products") ? "Products" : pathname.startsWith("/admin/categories") ? "Categories" : pathname.startsWith("/admin/orders") ? "Orders" : pathname.startsWith("/admin/customers") ? "Customers" : pathname.startsWith("/admin/reports") ? "Reports" : pathname.startsWith("/admin/settings") ? "Settings" : "Admin workspace";
  return <AdminShell title={title}>{children}</AdminShell>;
}
