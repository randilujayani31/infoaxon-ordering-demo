import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import MobileNavigation from "./MobileNavigation";

export default function PageFrame({ children }: { children: ReactNode }) {
  return <main className="site-shell"><Header />{children}<Footer /><MobileNavigation /></main>;
}
