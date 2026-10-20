import type { Metadata } from "next";
import Image from "next/image";
import { PublicFrame } from "@/components/public/PublicSiteShell";

export const metadata: Metadata = { title: "About Top G Global", description: "Learn about Top G Global and its mission, values and institutional purpose." };

export default function AboutPage() {
  return <PublicFrame current="about"><main className="tgg-about-page">
    <section className="tgg-about-banner"><div className="tgg-about-banner-inner"><p className="tgg-kicker">ABOUT TOP G GLOBAL</p><h1>Who We Are</h1><p>Top G Global is a global Christian leadership, development and impact organization committed to raising people in spiritual character, intellectual excellence, leadership capacity, enterprise and service.</p></div></section>
    <div className="tgg-about-body">
      <section className="tgg-about-intro" id="mission"><div className="tgg-about-statement"><h2>Institutional Introduction</h2><p>Top G is building durable institutional infrastructure around identity, membership, formation, governance, operations, geography, programs and impact.</p><blockquote>“Transforming Ordinary People into Giants.”</blockquote></div><div className="tgg-about-collage"><Image src="/frozen/public-v1/about-visual-approved-crop.webp" width={570} height={191} alt="Top G community and leadership imagery from the frozen About screen" /></div></section>
      <section className="tgg-about-values" id="pillars" aria-label="Institutional values"><article><h2>Built in Spirit</h2><p>Christian identity, spiritual character and service.</p></article><article><h2>Strong in Mind</h2><p>Intellectual excellence, leadership capacity and disciplined thinking.</p></article><article><h2>Wealthy in Purpose</h2><p>Enterprise, service and practical impact.</p></article></section>
      <section className="tgg-about-global" id="global-ambition"><h2>Our Global Ambition</h2><p>Top G Global is building a coherent international community across regions, countries, chapters, sectors, programs and future initiatives.</p></section>
    </div>
  </main></PublicFrame>;
}
