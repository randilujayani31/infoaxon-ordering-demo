import { Check, Home, PackageCheck, Truck } from "lucide-react";
import type { OrderStatus } from "@/store/AppStore";

const steps = [{ label: "Confirmed", icon: Check }, { label: "Preparing", icon: PackageCheck }, { label: "Dispatched", icon: Truck }, { label: "Delivered", icon: Home }];
export default function OrderProgress({ status }: { status: OrderStatus }) {
  const current = steps.findIndex((step) => step.label === status);
  return <><div className="progress order-progress">{steps.map((step, index) => { const Icon = step.icon; return <span key={step.label} className={index <= current ? "complete" : "pending"}><Icon size={13} /></span>; }).flatMap((step, index) => index < steps.length - 1 ? [step, <i className={index < current ? "done" : ""} key={`line-${index}`} />] : [step])}</div><div className="progress-labels order-progress-labels">{steps.map((step) => <span key={step.label}>{step.label}</span>)}</div></>;
}
