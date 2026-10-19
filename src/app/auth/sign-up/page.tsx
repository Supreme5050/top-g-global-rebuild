"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { styles } from "../auth.styles";

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (!acknowledged) { setError("Please acknowledge the Terms and Privacy Notice before proceeding."); return; }
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
        credentials: "same-origin",
        cache: "no-store",
      });
      if (!response.ok) {
        setError(response.status === 400 ? "Please review your name, email and password, or try another address." : "Account creation is unavailable. Please try again.");
        return;
      }
      // Only display the address locally; do not include it in the URL or logs.
      try { sessionStorage.setItem("tgg.signup.email", email.trim()); } catch { /* storage is optional */ }
      router.replace("/auth/verify-email");
    } catch {
      setError("Could not contact the server. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className={styles.panel} aria-labelledby="signup-title">
      <h2 id="signup-title">Create Your Account</h2>
      <p className={styles.subtitle}>Create an account to begin your membership application.</p>
      <form className={styles.form} onSubmit={submit}>
        <label className={styles.field}>Full name<input className={styles.input} type="text" autoComplete="name" minLength={2} maxLength={150} required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" /></label>
        <label className={styles.field}>Email address<input className={styles.input} type="email" autoComplete="email" required maxLength={254} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /></label>
        <label className={styles.field}>Password
          <span className={styles.passrow}>
            <input className={styles.input} type={showPassword ? "text" : "password"} autoComplete="new-password" minLength={8} maxLength={1024} required value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" className={styles.eye} onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? "Hide" : "Show"}</button>
          </span>
          <span className={styles.hint}>Use at least 8 characters. Your Supabase project may apply additional password rules.</span>
        </label>
        <label className={styles.field}>Confirm password<input className={styles.input} type={showPassword ? "text" : "password"} autoComplete="new-password" minLength={8} maxLength={1024} required value={confirm} onChange={(e) => setConfirm(e.target.value)} /></label>
        <label className={styles.mutedCheckbox}><input type="checkbox" checked={acknowledged} onChange={(e) => setAcknowledged(e.target.checked)} required />I acknowledge the Terms of Use and Privacy Notice.</label>
        <div className={styles.notice}><strong>Important</strong>Creating an account lets you start a Top G membership application. It does not automatically make you a member.</div>
        {error && <p className={styles.error} role="alert">{error}</p>}
        <button className={styles.goldButton} type="submit" disabled={pending}>{pending ? "Creating account…" : "Create Account"}</button>
      </form>
      <div className={styles.belowForm} style={{marginTop:16}}><span>Already have an account?</span><Link href="/auth/sign-in" className={styles.inlineLink}>Sign in</Link></div>
    </section>
  );
}
