import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, PackageCheck, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import PageFrame from "@/components/PageFrame";
import ProductGrid from "@/components/ProductGrid";
import CategoryGrid from "@/components/CategoryGrid";
import { products } from "@/data/catalog";

function SectionHeading({ eyebrow, title, href, label }: { eyebrow: string; title: string; href: string; label: string }) {
  return <div className="section-heading"><div><span className="eyebrow"><span /> {eyebrow}</span><h2>{title}</h2></div><Link className="outline-button" href={href}>{label} <ArrowRight size={16} /></Link></div>;
}

export default function Home() {
  return <PageFrame>
    <section className="hero" id="home"><div className="container hero-grid"><div className="hero-copy"><div className="eyebrow"><span /> Your everyday essentials, made easy</div><h1>Shop smarter.<br /><em>Live better.</em></h1><p>From pantry staples to little things that make life brighter, find everything you need in one happy place.</p><div className="hero-actions"><Link className="primary-button" href="/shop">Shop now <ArrowRight size={17} /></Link><Link className="text-button" href="/offers">View offers <ArrowRight size={18} /></Link></div><div className="hero-meta"><span><span className="avatar-stack"><i>👩🏽</i><i>👨🏽</i><i>👩🏾</i></span><b>4.9/5</b> from 2,000+ shoppers</span></div></div><div className="hero-visual"><div className="hero-shape" /><div className="hero-image"><Image src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=85" alt="Fresh produce at NovaMart" fill priority sizes="(max-width: 800px) 90vw, 50vw" /></div><div className="floating-card delivery-card"><span className="floating-icon orange"><Truck size={20} /></span><span><strong>Same-day delivery</strong><small>For orders before 4 PM</small></span><Check size={18} className="check" /></div><div className="floating-card order-card"><span className="floating-icon blue"><PackageCheck size={19} /></span><span><strong>Order #NM-2408</strong><small>On its way to you</small></span></div></div></div></section>
    <section className="benefits"><div className="container benefits-grid"><Benefit icon={<Truck />} title="Fast delivery" text="At your doorstep, on time" /><Benefit icon={<ShieldCheck />} title="Secure ordering" text="Your trust is our priority" /><Benefit icon={<ShoppingBag />} title="Here to help" text="Friendly support, always" /></div></section>
    <section className="section category-section"><div className="container"><SectionHeading eyebrow="Browse by category" title="A little bit of everything" href="/categories" label="View all" /><CategoryGrid /></div></section>
    <section className="section products-section"><div className="container"><SectionHeading eyebrow="Picked for you" title="Featured products" href="/shop" label="Shop all products" /><ProductGrid items={products.slice(0, 4)} /></div></section>
    <section className="offer-band"><div className="container offer-inner"><div><span className="eyebrow light"><span /> Weekend special</span><h2>Good things come<br />with <em>better prices.</em></h2><p>Save up to 25% on selected everyday favourites.</p><Link className="light-button" href="/offers">Explore offers <ArrowRight size={17} /></Link></div><div className="offer-art"><div className="offer-sun" /><div className="offer-product one">🥫</div><div className="offer-product two">🧴</div><div className="offer-product three">🫙</div><span className="offer-sticker">UP TO<br /><strong>25%</strong><br />OFF</span></div></div></section>
    <section className="section products-section"><div className="container"><SectionHeading eyebrow="What shoppers love" title="Popular right now" href="/shop" label="See all" /><ProductGrid items={products.slice(8, 12)} /></div></section>
  </PageFrame>;
}

function Benefit({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="benefit"><span>{icon}</span><div><strong>{title}</strong><small>{text}</small></div></div>; }
