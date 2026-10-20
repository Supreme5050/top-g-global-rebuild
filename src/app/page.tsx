import Image from "next/image";
import Link from "next/link";
import { PublicFrame } from "@/components/public/PublicSiteShell";

const realms = ["Refining Realm", "Alpha Realm", "Eagle Realm", "Dominion Realm", "Priesthood Realm", "Realm of Legends", "Realm of Elites"];

export default function HomePage() {
  return (
    <PublicFrame current="home">
      <main>
        <section className="tgg-hero" aria-labelledby="tgg-hero-title">
          <div className="tgg-hero-photo" aria-hidden="true" />
          <div className="tgg-hero-copy">
            <h1 id="tgg-hero-title">TRANSFORMING<br/>ORDINARY PEOPLE<br/>INTO <span>GIANTS</span></h1>
            <p>Top G Global is a global Christian leadership, development and impact organization raising a generation of purpose-driven leaders and influencers.</p>
            <div className="tgg-hero-actions">
              <Link className="tgg-btn tgg-btn-gold" href="/join">JOIN TOP G <span aria-hidden="true">→</span></Link>
              <Link className="tgg-btn tgg-btn-outline" href="/about">LEARN MORE <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>
        <section className="tgg-pillars" aria-label="Top G institutional identity">
          <div className="tgg-pillar"><span className="tgg-pillar-icon" aria-hidden="true">◎</span><div><strong>7</strong><b>REALMS</b><small>Growth Pathway</small></div></div>
          <div className="tgg-pillar"><span className="tgg-pillar-icon" aria-hidden="true">◎</span><div><strong>GLOBAL</strong><b>PRESENCE</b><small>Across Nations</small></div></div>
          <div className="tgg-pillar"><span className="tgg-pillar-icon" aria-hidden="true">✦</span><div><strong>PURPOSE</strong><b>DRIVEN</b><small>Built on Values</small></div></div>
          <div className="tgg-pillar"><span className="tgg-pillar-icon" aria-hidden="true">♛</span><div><strong>KINGDOM</strong><b>IMPACT</b><small>For Generations</small></div></div>
        </section>
        <section className="tgg-founder" aria-labelledby="tgg-founder-title">
          <div className="tgg-founder-portrait"><Image src="/frozen/public-v1/founder-approved-crop.webp" width={224} height={157} alt="Founder profile image from the approved public homepage reference" /></div>
          <div className="tgg-founder-copy"><p className="tgg-kicker">FOUNDER &amp; VISIONARY</p><h2 id="tgg-founder-title">PRIEST SAMUEL</h2><p>Called to raise Giants who will transform their world. Through Kingdom principles, excellence, innovation and impact, we are building a legacy that outlives us.</p><Link className="tgg-mini-outline" href="/about">ABOUT THE FOUNDER →</Link></div>
          <div className="tgg-founder-map" aria-hidden="true"><Image src="/frozen/public-v1/global-presence-approved-crop.webp" width={505} height={158} alt="" /></div>
        </section>
        <div className="tgg-home-feature-grid">
          <section className="tgg-feature-panel" id="realms" aria-labelledby="tgg-realms-title">
            <div><h2 id="tgg-realms-title">THE SEVEN REALMS</h2><p>A holistic growth pathway for every Giant.</p><Link className="tgg-gold-link" href="/join">Explore Realms →</Link></div>
            <div className="tgg-realm-grid">{realms.map((realm, i) => <div className="tgg-realm" key={realm}><span aria-hidden="true">{i + 1}</span><strong>{realm.replace(" Realm", "").replace("Realm of ", "")}</strong></div>)}</div>
          </section>
          <section className="tgg-feature-panel tgg-program-panel" id="programs" aria-labelledby="tgg-programs-title">
            <div className="tgg-program-content"><h2 id="tgg-programs-title">OUR PROGRAMS &amp; IMPACT</h2><p>Empowering leaders. Transforming communities. Impacting nations.</p><Link className="tgg-gold-link" href="/about#global-ambition">Explore Programs →</Link>
              <div className="tgg-program-chips" id="impact"><span>◈ <b>LEADERSHIP</b><small>Equipping leaders</small></span><span>♡ <b>COMMUNITY</b><small>Transforming lives</small></span><span>◎ <b>GLOBAL IMPACT</b><small>Across nations</small></span></div>
            </div>
            <Image src="/frozen/public-v1/programs-approved-crop.webp" width={282} height={153} alt="Leadership gathering from the approved Top G homepage reference" />
          </section>
        </div>
      </main>
    </PublicFrame>
  );
}
