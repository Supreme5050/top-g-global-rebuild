import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { styles, authCss } from "./auth.styles";

/** Frozen Batch 3 account shell: AUTH-01/02/03. */
export default function AccountLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <style data-top-g-auth-styles="v1">{authCss}</style>
      <div className={styles.viewport}>
      <div className={styles.content}>
        <aside className={styles.institution} aria-label="Top G Global institutional introduction">
          <Link href="/" className={styles.brand} aria-label="Top G Global home">
            <Image
              src="/brand/top-g-lockup-frozen-auth-reference.png"
              width={161}
              height={84}
              alt="Top G Global"
              priority
            />
          </Link>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>TOP G GLOBAL ACCOUNT</p>
            <h1>Secure access to your Top G account</h1>
            <p>Your account gives you access to the membership application and, after approval, the appropriate Top G portal.</p>
          </div>
        </aside>
        <div className={styles.main}>{children}</div>
      </div>
      <footer className={styles.footer}>
        <span>© 2026 Top G Global. All rights reserved.</span>
        <span>Privacy&nbsp; • &nbsp;Terms&nbsp; • &nbsp;Code of Conduct</span>
      </footer>
      </div>
    </>
  );
}
