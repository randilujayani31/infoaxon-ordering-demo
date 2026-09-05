"use client";

import Link from "next/link";
import { ArrowRight, Eye, EyeOff, LockKeyhole, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageFrame from "@/components/PageFrame";
import { useAppStore } from "@/store/AppStore";

export default function LoginPage() {
  const router = useRouter(); const { login, user, hydrated } = useAppStore(); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [showPassword, setShowPassword] = useState(false); const [error, setError] = useState("");
  useEffect(() => { if (hydrated && user) router.replace("/account"); }, [hydrated, user, router]);
  const submit = (event: React.FormEvent) => { event.preventDefault(); if (!email || !password) { setError("Enter your email and password to continue."); return; } if (!login(email, password)) { setError("Those details didn't match an account. Try the demo credentials below."); return; } router.push("/account"); };
  return <PageFrame><section className="auth-page"><div className="auth-card"><div className="auth-brand"><span className="brand-mark"><ShoppingBag size={22} /></span><span><strong>Nova<span>Mart</span></strong><small>Everything you need, delivered</small></span></div><span className="eyebrow"><span /> Welcome back</span><h1>Good to see you.</h1><p>Log in to view your orders and make checkout even easier.</p><form onSubmit={submit} className="auth-form"><label>Email address<input type="email" value={email} onChange={(event) => { setEmail(event.target.value); setError(""); }} placeholder="you@example.com" /></label><label>Password<span className="password-field"><input type={showPassword ? "text" : "password"} value={password} onChange={(event) => { setPassword(event.target.value); setError(""); }} placeholder="Your password" /><button type="button" onClick={() => setShowPassword((shown) => !shown)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></span></label>{error && <p className="auth-error">{error}</p>}<button className="primary-button auth-submit" type="submit">Log in <ArrowRight size={17} /></button></form><div className="demo-credentials"><LockKeyhole size={15} /><span><b>Demo access</b><small>customer@novamart.lk · demo123</small></span></div><p className="auth-switch">New to NovaMart? <Link href="/register">Create an account</Link></p></div></section></PageFrame>;
}
