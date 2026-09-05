import { type Product } from "@/data/catalog";
import ProductCard from "./ProductCard";

export default function ProductGrid({ items }: { items: Product[] }) {
  if (!items.length) return <div className="empty-products">No products found. Try a different search or category.</div>;
  return <div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}
