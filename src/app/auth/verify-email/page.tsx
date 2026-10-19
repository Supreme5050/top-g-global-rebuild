"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { styles } from "../auth.styles";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    let active = true;
    let stored = "";
    try { stored = sessionStorage.getItem("tgg.signup.email") ?? ""; } catch { /* optional */ }
    queueMicrotask(() => { if (active) setEmail(stored); });
    return () => { active = false; };
  }, []);

  async function resend() {
    if (!email || pending) return;
    setPending(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST", headers: { "Content-Type": "application/json" },
        credentials: "same-origin", cache: "no-store", body: JSON.stringify({ email }),
      });
      if (!response.ok) { setError("Could not request another email. Please wait before trying again."); return; }
      setNotice("If your address is eligible, another verification email has been requested.");
    } catch { setError("Could not contact the server."); }
    finally { setPending(false); }
  }

  async function proceed() {
    setError("");
    try {
      const response = await fetch("/api/auth/me", { cache: "no-store", credentials: "same-origin" });
      if (response.ok) { router.replace("/auth/account"); router.refresh(); return; }
      setNotice("After confirming your email, sign in with your new account credentials.");
      router.push("/auth/sign-in");
    } catch { setError("Could not verify your account session. Try signing in again."); }
  }

  return (
    <section className={styles.panel} aria-labelledby="verify-title">
      <h2 id="verify-title">Verify Your Email</h2>
      <p className={styles.subtitle}>Confirm your email address before starting the application, if confirmation is required.</p>
      <div className={styles.verifyBox}>
        <div className={styles.mailCircle} aria-hidden="true">✉</div>
        <h3>Check your inbox</h3>
        <p>If email confirmation is enabled, a verification link has been requested for:</p>
        <p className={styles.emailDisplay}>{email || "the email address you registered"}</p>
        <p>Follow the verification link to continue. If your email is already verified, continue to your account.</p>
        <div className={styles.verifyActions}>
          <button className={styles.outlineButton} type="button" onClick={resend} disabled={!email || pending}>{pending ? "Requesting…" : "Resend Verification"}</button>
          <button className={styles.goldButton} type="button" onClick={proceed}>Continue to Account</button>
          <div className={styles.belowForm}><span>Need a different address?</span><Link className={styles.inlineLink} href="/auth/sign-up">Create account</Link></div>
          {notice && <p className={styles.success} role="status">{notice}</p>}
          {error && <p className={styles.error} role="alert">{error}</p>}
        </div>
      </div>
    </section>
  );
}
