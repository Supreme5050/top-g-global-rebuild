"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { styles } from "../auth.styles";

/** Temporary signed-in account-holder landing page; not a frozen Member Portal screen. */
export default function AccountHolderPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [applicationCount, setApplicationCount] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function check() {
      try {
        const r = await fetch("/api/auth/me", { cache: "no-store", credentials: "same-origin" });
        if (cancelled) return;
        if (!r.ok) { setSignedIn(false); return; }
        setSignedIn(true);
        const applications = await fetch("/api/applications/mine", { cache: "no-store", credentials: "same-origin" });
        if (!cancelled && applications.ok) {
          const result: unknown = await applications.json();
          if (typeof result === "object" && result !== null && "applications" in result && Array.isArray(result.applications)) {
            setApplicationCount(result.applications.length);
          }
        }
      } catch { if (!cancelled) setSignedIn(false); }
      finally { if (!cancelled) setLoading(false); }
    }
    void check();
    return () => { cancelled = true; };
  }, []);

  async function signOut() {
    setBusy(true);
    try {
      const r = await fetch("/api/auth/sign-out", { method: "POST", credentials: "same-origin" });
      if (r.ok) { router.replace("/auth/sign-in"); router.refresh(); }
    } finally { setBusy(false); }
  }

  return (
    <section className={styles.panel} aria-labelledby="account-title">
      <h2 id="account-title">Your Top G Account</h2>
      {loading ? <p className={styles.subtitle} role="status">Checking your session…</p>
      : !signedIn ? <><p className={styles.error}>You are not signed in.</p><a href="/auth/sign-in" className={styles.inlineLink}>Sign in</a></>
      : <>
        <p className={styles.subtitle}>You are signed in as an account holder. Membership requires a separate application and official approval.</p>
        <div className={styles.security}><strong>Membership application records</strong>{applicationCount === null ? "Records are temporarily unavailable." : `${applicationCount} application record(s) associated with this account.`}</div>
        <p style={{fontSize:14, color:"#626970", margin:"24px 0"}}>The frozen applicant journey will be connected after live RLS and application-start policy verification. This screen does not approve membership.</p>
        <button className={styles.outlineButton} type="button" onClick={signOut} disabled={busy}>{busy ? "Signing out…" : "Sign out"}</button>
      </>}
    </section>
  );
}
