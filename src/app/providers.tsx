"use client";

import type { ReactNode } from "react";
import { AppStoreProvider } from "@/store/AppStore";

export default function Providers({ children }: { children: ReactNode }) {
  return <AppStoreProvider>{children}</AppStoreProvider>;
}
