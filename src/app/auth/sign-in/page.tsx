"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { styles } from "../auth.styles";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "same-origin",
        cache: "no-store",
      });
      if (!response.ok) {
        setError(response.status === 401 ? "Email or password is incorrect, or this account cannot sign in yet." : "Sign-in is unavailable. Please try again.");
        return;
      }
      router.replace("/auth/account");
      router.refresh();
    } catch {
      setError("Could not contact the server. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className={styles.panel} aria-labelledby="signin-title">
      <h2 id="signin-title">Welcome Back</h2>
      <p className={styles.subtitle}>Sign in to your Top G Global account.</p>
      <form className={styles.form} onSubmit={submit}>
        <label className={styles.field}>Email address
          <input className={styles.input} type="email" name="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required maxLength={254} />
        </label>
        <label className={styles.field}>Password
          <span className={styles.passrow}>
            <input className={styles.input} type={showPassword ? "text" : "password"} name="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} maxLength={1024} />
            <button className={styles.eye} type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button>
          </span>
        </label>
        <div className={styles.options}>
          <label className={styles.mutedCheckbox} title="Session persistence policy is not configured yet"><input type="checkbox" disabled />Remember me</label>
          <span title="Password-recovery route will be added after review">Forgot password? (next stage)</span>
        </div>
        {error && <p className={styles.error} role="alert">{error}</p>}
        <button className={styles.goldButton} type="submit" disabled={pending}>{pending ? "Signing in…" : "Sign In"}</button>
        <div className={styles.belowForm}><span>Don&apos;t have an account?</span><Link href="/auth/sign-up" className={styles.inlineLink}>Create account</Link></div>
      </form>
      <div className={styles.security}><strong>Security</strong>Your session and account information are protected. Account access does not constitute membership.</div>
    </section>
  );
}
