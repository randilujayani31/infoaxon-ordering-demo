"use client";

import PageFrame from "@/components/PageFrame";
import ProductGrid from "@/components/ProductGrid";
import { useAppStore } from "@/store/AppStore";

export default function OffersPage() {
  const { products } = useAppStore(); const saleProducts = products.filter((product) => product.active !== false && product.salePrice);
  return <PageFrame><section className="listing-page offers-page"><div className="container"><div className="offer-page-banner"><div><span className="eyebrow light"><span /> Limited-time savings</span><h1>Better prices,<br /><em>brighter days.</em></h1><p>Save on the things you reach for every day. Offers change often, so there is always something new to discover.</p></div><span className="offer-page-badge">SAVE<br /><strong>UP TO<br />25%</strong></span></div><div className="page-heading compact-heading"><div><span className="eyebrow"><span /> Handpicked deals</span><h2>Offers worth opening your basket for</h2></div><span className="result-count">{saleProducts.length} deals</span></div><ProductGrid items={saleProducts} /></div></section></PageFrame>;
}
