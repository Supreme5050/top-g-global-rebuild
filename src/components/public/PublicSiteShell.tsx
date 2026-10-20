import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import "./public-site.css";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Realms", href: "/#realms" },
  { label: "Sectors", href: "/#sectors" },
  { label: "Programs", href: "/#programs" },
  { label: "Events", href: "/#events" },
  { label: "Impact", href: "/#impact" },
  { label: "News", href: "/#news" },
  { label: "Contact", href: "/#contact" },
] as const;

export function PublicBrand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className={`tgg-brand ${compact ? "tgg-brand-small" : ""}`} aria-label="Top G Global homepage">
      <Image src="/frozen/public-v1/top-g-reference-lockup.png" alt="Top G Global" width={161} height={84} priority={!compact} />
    </Link>
  );
}

export function PublicHeader({ current = "home" }: { current?: "home" | "about" }) {
  return (
    <header className="tgg-public-header">
      <PublicBrand />
      <nav className="tgg-public-nav" aria-label="Main navigation">
        {navigation.map((item) => (
          <Link key={item.label} href={item.href} className={((current === "home" && item.label === "Home") || (current === "about" && item.label === "About")) ? "tgg-nav-current" : ""}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="tgg-public-actions">
        <Link className="tgg-btn tgg-btn-gold tgg-header-join" href="/join">Join Top G</Link>
        <Link className="tgg-btn tgg-btn-outline tgg-login" href="/auth/sign-in">◎ <span>Login</span></Link>
      </div>
      <details className="tgg-public-mobile-nav">
        <summary aria-label="Toggle navigation"><span /><span /><span /></summary>
        <nav aria-label="Mobile navigation">
          {navigation.map(item => <Link key={item.label} href={item.href}>{item.label}</Link>)}
          <Link href="/auth/sign-in">Sign In</Link>
        </nav>
      </details>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="tgg-public-footer" id="contact">
      <div className="tgg-footer-main">
        <div className="tgg-footer-identity">
          <PublicBrand compact />
          <p>Raising a generation of purpose-driven leaders who will transform their world and impact generations.</p>
        </div>
        <div className="tgg-footer-links">
          <div><h3>ABOUT</h3><Link href="/about">About Us</Link><Link href="/about#mission">Our Vision</Link><Link href="/about#pillars">Our Values</Link><Link href="/about">Our Team</Link></div>
          <div><h3>REALMS</h3><Link href="/#realms">The Seven Realms</Link><Link href="/#realms">Realm Overview</Link><Link href="/join">Growth Pathway</Link></div>
          <div id="sectors"><h3>SECTORS</h3><Link href="/about#global-ambition">Primary Sectors</Link><Link href="/about#global-ambition">Innovation &amp; Tech</Link><Link href="/about#global-ambition">Enterprise &amp; Economy</Link></div>
          <div id="events"><h3>PROGRAMS</h3><Link href="/#programs">Leadership Programs</Link><Link href="/#programs">Training &amp; Courses</Link><Link href="/#impact">Global Initiatives</Link><span className="tgg-footer-muted">Events: updates pending</span></div>
          <div><h3>SUPPORT</h3><Link href="/join">Partner With Us</Link><Link href="/join">Volunteer</Link><Link href="/about">FAQs / Contact</Link></div>
        </div>
        <div className="tgg-footer-subscribe" id="news">
          <h3>STAY CONNECTED</h3>
          <p>Get the latest updates, events and inspiration from Top G Global.</p>
          <div className="tgg-subscribe-ui"><input aria-label="Email for future updates" type="email" placeholder="Enter your email" disabled /><button disabled type="button" title="Newsletter signup is not yet available">SUBSCRIBE →</button></div>
          <small>Newsletter enrollment will be enabled once approved.</small>
        </div>
      </div>
      <div className="tgg-footer-bottom"><span>© 2026 Top G Global. All rights reserved.</span><span>Built in Spirit. Strong in Mind. Wealthy in Purpose.</span></div>
    </footer>
  );
}

export function PublicFrame({ children, current = "home" }: { children: ReactNode; current?: "home" | "about" }) {
  return <div className="tgg-public"><div className="tgg-public-container"><PublicHeader current={current}/>{children}<PublicFooter/></div></div>;
}
