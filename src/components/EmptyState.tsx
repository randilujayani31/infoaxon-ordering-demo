import { PackageOpen, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function EmptyState({ type = "orders", title, description, action = "Start shopping", href = "/shop" }: { type?: "orders" | "cart"; title: string; description: string; action?: string; href?: string }) {
  return <div className="empty-page-state"><span>{type === "cart" ? <ShoppingCart size={30} /> : <PackageOpen size={30} />}</span><h2>{title}</h2><p>{description}</p><Link className="primary-button" href={href}>{action}</Link></div>;
}
