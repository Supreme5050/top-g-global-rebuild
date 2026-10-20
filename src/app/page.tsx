import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PublicBrand } from "@/components/public/PublicSiteShell";
import { CinematicMotion } from "@/components/public/CinematicMotion";
import "@/components/public/cinematic-home.css";

export const metadata: Metadata = {
  title: "Top G Global — Transforming Ordinary People into Giants",
  description:
    "Top G Global is a global Christian leadership, development and impact organization committed to raising people in spiritual character, intellectual excellence, leadership capacity, enterprise and service.",
};

const realms = [
  { name: "Refining", summary: "Foundation, identity & values" },
  { name: "Alpha", summary: "Discipline & responsible leadership" },
  { name: "Eagle", summary: "Vision & strategic thinking" },
  { name: "Dominion", summary: "Stewardship & lasting impact" },
  { name: "Priesthood", summary: "Spiritual formation & service" },
  { name: "Legends", summary: "Legacy & mentorship" },
  { name: "Elites", summary: "Excellence & global responsibility" },
] as const;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span className="cinema-arrow" aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function Header() {
  return (
    <header className="cinema-header">
      <div className="cinema-header-inner">
        <PublicBrand />
        <nav className="cinema-desktop-nav" aria-label="Main navigation">
          <Link href="/" aria-current="page">Home</Link>
          <Link href="/about">Our institution</Link>
          <Link href="/#realms">The Seven Realms</Link>
          <Link href="/#founder">Founder</Link>
          <Link href="/#impact">Our impact</Link>
        </nav>
        <div className="cinema-header-actions">
          <Link className="cinema-header-login" href="/auth/sign-in">Member sign in</Link>
          <Link className="cinema-action cinema-action-gold cinema-header-join" href="/join">Join Top G <Arrow diagonal /></Link>
        </div>
        <details className="cinema-mobile-menu">
          <summary aria-label="Open navigation menu"><span/><span/><span/></summary>
          <nav aria-label="Mobile navigation">
            <Link href="/">Home</Link><Link href="/about">Our institution</Link>
            <Link href="/#realms">The Seven Realms</Link><Link href="/#founder">Founder</Link>
            <Link href="/#impact">Our impact</Link><Link href="/join">Join Top G</Link>
            <Link href="/auth/sign-in">Member sign in</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="cinema-hero" aria-labelledby="cinema-title">
      <div className="cinema-hero-media" aria-hidden="true">
        <Image
          src="/frozen/public-v1/home-hero-approved-crop.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="cinema-hero-image"
        />
      </div>
      <div className="cinema-hero-shading" aria-hidden="true" />
      <div className="cinema-hero-content">
        <div className="cinema-eyebrow cinema-hero-eyebrow"><span className="cinema-eyebrow-line" /> A GLOBAL MOVEMENT OF PURPOSE</div>
        <h1 id="cinema-title">TRANSFORMING<br/>ORDINARY PEOPLE<br/>INTO <em>GIANTS.</em></h1>
        <p>
          Raising people in spiritual character, intellectual excellence,
          leadership capacity, enterprise and service.
        </p>
        <div className="cinema-hero-actions">
          <Link className="cinema-action cinema-action-gold" href="/join">Begin your journey <Arrow diagonal /></Link>
          <Link className="cinema-action cinema-action-ghost" href="/about">Discover Top G <Arrow /></Link>
        </div>
      </div>
      <div className="cinema-hero-bottom" aria-hidden="true">
        <span><span className="cinema-hero-scroll-line" /> SCROLL TO EXPLORE</span>
        <span className="cinema-chapter-number">01 <i /> 05</span>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="cinema-manifesto cinema-section" id="mission" aria-labelledby="cinema-manifesto-title">
      <div className="cinema-section-topline" data-cinematic-reveal><span>01 / THE MOVEMENT</span><span>IDENTITY • FORMATION • IMPACT</span></div>
      <div className="cinema-manifesto-main">
        <div data-cinematic-reveal>
          <p className="cinema-kicker">MORE THAN A PLATFORM</p>
          <h2 id="cinema-manifesto-title">An institution<br/>built for <em>purpose.</em></h2>
        </div>
        <div className="cinema-manifesto-copy" data-cinematic-reveal>
          <p className="cinema-manifesto-lead">Top G Global is a global Christian leadership, development and impact organization.</p>
          <p>We are building a durable institution where formation, leadership, service and enterprise meet—transforming lives today while preserving a legacy for generations.</p>
          <Link className="cinema-text-link" href="/about">Discover our institution <Arrow diagonal /></Link>
        </div>
      </div>
      <div className="cinema-principles" data-cinematic-reveal aria-label="Institutional expression">
        <span>BUILT IN <strong>SPIRIT.</strong></span>
        <span>STRONG IN <strong>MIND.</strong></span>
        <span>WEALTHY IN <strong>PURPOSE.</strong></span>
      </div>
    </section>
  );
}

function Realms() {
  return (
    <section className="cinema-realms cinema-section" id="realms" aria-labelledby="cinema-realms-title">
      <div className="cinema-section-topline" data-cinematic-reveal><span>02 / FORMATION</span><span>SEVEN REALMS • ONE JOURNEY</span></div>
      <div className="cinema-realms-heading" data-cinematic-reveal>
        <div><p className="cinema-kicker">THE SEVEN REALMS</p><h2 id="cinema-realms-title">Growth is<br/><em>intentional.</em></h2></div>
        <p>Formation is a lifelong journey of values, character, competence and service—not a shortcut to rank or authority.</p>
      </div>
      <ol className="cinema-realm-list" aria-label="The Seven Realms">
        {realms.map((realm, index) => (
          <li key={realm.name} data-cinematic-reveal>
            <span className="cinema-realm-number">0{index + 1}</span>
            <div className="cinema-realm-name">{realm.name}</div>
            <p>{realm.summary}</p>
            <span className="cinema-realm-mark" aria-hidden="true">↗</span>
          </li>
        ))}
      </ol>
      <p className="cinema-realms-note">The Seven Realms are a formation journey. They do not independently grant an administrative role, governance office or permission.</p>
    </section>
  );
}

function Founder() {
  return (
    <section className="cinema-founder cinema-section" id="founder" aria-labelledby="cinema-founder-title">
      <div className="cinema-section-topline" data-cinematic-reveal><span>03 / OUR FOUNDER</span><span>VISION &amp; INSTITUTIONAL CONTINUITY</span></div>
      <div className="cinema-founder-body">
        <div className="cinema-founder-visual" data-cinematic-reveal>
          <div className="cinema-founder-frame">
            <Image
              src="/frozen/public-v1/founder-approved-crop.webp"
              alt="Approved Founder profile portrait from the frozen Top G Global visual reference"
              fill
              sizes="(max-width: 720px) 85vw, 38vw"
              className="cinema-founder-photo"
            />
          </div>
          <span className="cinema-founder-photo-note">TOP G GLOBAL / THE FOUNDER</span>
        </div>
        <div className="cinema-founder-copy" data-cinematic-reveal>
          <span className="cinema-founder-identity">THE VISION BEHIND THE MOVEMENT</span>
          <h2 id="cinema-founder-title">Priest<br/><em>Samuel.</em></h2>
          <p className="cinema-founder-role">FOUNDER OF TOP G GLOBAL <span>•</span> G-1</p>
          <p>Leadership with responsibility. Faith with purpose. An institution built to develop people who will transform their world through character, excellence and service.</p>
          <Link className="cinema-text-link" href="/about">Discover Top G Global <Arrow diagonal /></Link>
        </div>
      </div>
    </section>
  );
}

function Impact() {
  return (
    <section className="cinema-impact cinema-section" id="impact" aria-labelledby="cinema-impact-title">
      <div className="cinema-section-topline" data-cinematic-reveal><span>04 / PURPOSE IN ACTION</span><span>LEADERSHIP • SERVICE • ENTERPRISE</span></div>
      <div className="cinema-impact-main">
        <div className="cinema-impact-photo" data-cinematic-reveal>
          <Image src="/frozen/public-v1/join-collage-approved-crop.webp" alt="Approved imagery depicting leadership, gathering and service" fill sizes="(max-width: 800px) 100vw, 55vw" />
          <span>BEYOND WORDS. INTO IMPACT.</span>
        </div>
        <div className="cinema-impact-copy" data-cinematic-reveal>
          <p className="cinema-kicker">OUR PURPOSE</p>
          <h2 id="cinema-impact-title">Called to lead.<br/><em>Built to serve.</em></h2>
          <p>From personal growth to community transformation, Top G connects formation with meaningful action through leadership, programs, operational sectors and service.</p>
          <div className="cinema-impact-themes">
            <span><b>01</b> Character &amp; formation</span>
            <span><b>02</b> Enterprise &amp; innovation</span>
            <span><b>03</b> Service &amp; community impact</span>
          </div>
          <Link href="/join" className="cinema-text-link">Explore belonging to Top G <Arrow diagonal /></Link>
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="cinema-closing" aria-labelledby="cinema-closing-title">
      <div className="cinema-closing-glow" aria-hidden="true" />
      <p className="cinema-kicker" data-cinematic-reveal>05 / THE INVITATION</p>
      <h2 id="cinema-closing-title" data-cinematic-reveal>YOUR PURPOSE.<br/><em>YOUR JOURNEY.</em></h2>
      <p data-cinematic-reveal>Discover an institution committed to developing people of character, competence and lasting impact.</p>
      <Link href="/join" className="cinema-action cinema-action-gold" data-cinematic-reveal>Discover membership <Arrow diagonal /></Link>
      <p className="cinema-closing-fine">Account creation does not constitute membership. Membership is subject to an approved application process.</p>
    </section>
  );
}

function Footer() {
  return <footer className="cinema-footer">
    <div className="cinema-footer-grid">
      <div className="cinema-footer-brand"><PublicBrand /><p>Transforming Ordinary People into Giants.</p><small>Built in Spirit. Strong in Mind. Wealthy in Purpose.</small></div>
      <div className="cinema-footer-links"><h3>EXPLORE</h3><Link href="/about">Our institution</Link><Link href="/#realms">Seven Realms</Link><Link href="/#founder">Founder</Link><Link href="/#impact">Our impact</Link></div>
      <div className="cinema-footer-links"><h3>CONNECT</h3><Link href="/join">Join Top G</Link><Link href="/auth/sign-in">Member sign in</Link><Link href="/auth/sign-up">Create an account</Link></div>
      <div className="cinema-footer-statement">AN INSTITUTION<br/>FOR <em>GENERATIONS.</em></div>
    </div>
    <div className="cinema-footer-bottom"><span>© 2026 Top G Global</span><span>Official institutional digital platform</span></div>
  </footer>;
}

export default function HomePage() {
  return <div className="tgg-public tgg-cinema" data-cinematic-root>
    <CinematicMotion />
    <Header />
    <main id="main-content">
      <Hero />
      <Manifesto />
      <Realms />
      <Founder />
      <Impact />
      <Closing />
    </main>
    <Footer />
  </div>;
}
