import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PublicBrand } from "@/components/public/PublicSiteShell";
import "@/components/public/public-site.css";

export const metadata: Metadata = { title: "Join Top G Global", description: "Learn about joining Top G Global and beginning the membership application." };
const pathway = ["Introduction", "Account", "Application", "Review", "Submitted"];
const benefits = [
  ["Faith-Rooted Leadership", "Build your life and leadership on unshakable values."],
  ["Serve & Empower Communities", "Be the change that strengthens nations."],
  ["Grow & Master Your Purpose", "Access resources, training and mentorship."],
  ["Connect with Like-Minded Leaders", "Join a global network of high-impact leaders."],
  ["Create Generational Impact", "Build a legacy that outlives you."],
] as const;

export default function JoinIntroductionPage() {
 return <div className="tgg-public tgg-join-outer"><div className="tgg-join-shell">
   <header className="tgg-join-header"><PublicBrand /><ol className="tgg-stepper" aria-label="Application stages">{pathway.map((step, i) => <li key={step} className={i === 0 ? "tgg-step-current" : ""}><span>{i+1}</span><small>{step}</small></li>)}</ol><Link className="tgg-btn tgg-btn-outline" href="/auth/sign-in">◎ Login</Link></header>
   <main className="tgg-join-main"><div className="tgg-join-overview"><section className="tgg-join-copy"><h1>Join a Global Community<br/>of <span>Purpose-Driven Giants</span></h1><p>Top G Global is a transformational journey that equips you to lead with faith, expand your capacity, and create lasting impact in your world and the world.</p><ul>{benefits.map(([title, desc], i) => <li key={title}><span className="tgg-benefit-icon" aria-hidden="true">{["♡","♙","▤","◎","☆"][i]}</span><div><strong>{title}</strong><small>{desc}</small></div></li>)}</ul></section>
    <div className="tgg-join-collage"><Image src="/frozen/public-v1/join-collage-approved-crop.webp" width={685} height={489} alt="Community, leadership and service imagery from the frozen Join introduction" priority /></div></div>
    <section className="tgg-admission"><div><h2>ADMISSION REQUIREMENTS</h2><ul><li>Commitment to our values and mission</li><li>Willingness to grow and be developed</li><li>Desire to serve and make impact</li><li>Acceptance of our Code of Conduct</li></ul></div><div className="tgg-admission-action"><Link className="tgg-btn tgg-btn-gold" href="/auth/sign-up">START YOUR APPLICATION <span aria-hidden="true">→</span></Link><p>Already have an account? <Link href="/auth/sign-in">Login</Link></p><small>Creating an account does not automatically grant membership.</small></div></section>
    <section className="tgg-join-values"><article><strong>Christ-Centered</strong><p>Biblical foundation guides everything we do.</p></article><article><strong>Excellence</strong><p>We pursue greatness in all we do.</p></article><article><strong>Integrity</strong><p>We lead with honesty, humility and accountability.</p></article><article><strong>Impact</strong><p>We exist to create lasting change for generations.</p></article></section>
   </main>
 </div></div>;
}
