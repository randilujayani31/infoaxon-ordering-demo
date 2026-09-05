import Link from "next/link";
import PageFrame from "@/components/PageFrame";
import ProductDetail from "@/components/ProductDetail";
import { findProduct, products } from "@/data/catalog";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; const product = findProduct(id);
  if (!product) return <PageFrame><section className="listing-page"><div className="container"><div className="not-found-state"><span>404</span><h1>That product has moved on</h1><p>We couldn&apos;t find that item, but there are plenty more everyday favourites waiting for you.</p><Link className="primary-button" href="/shop">Back to shop</Link></div></div></section></PageFrame>;
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);
  return <PageFrame><ProductDetail product={product} related={related} /></PageFrame>;
}
