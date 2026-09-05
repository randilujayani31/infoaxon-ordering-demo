"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { useAppStore } from "@/store/AppStore";

export default function EditProductPage() { const { id } = useParams<{ id: string }>(); const { products, hydrated } = useAppStore(); const product = products.find((item) => item.id === id); if (!hydrated) return <div className="admin-loading">Loading product...</div>; if (!product) return <div className="admin-not-found"><h2>Product not found</h2><p>This catalogue item may have been removed.</p><Link className="admin-button secondary" href="/admin/products">Back to products</Link></div>; return <ProductForm product={product} />; }
