import HeroControls from "./hero-controls";

export default function Home() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <header className="navigation">
          <a href="/" className="brand" aria-label="Top G Global home">
            <img src="/brand/top-g-official-preview.png" width="100" height="100" alt="Top G Global official gold logo" />
          </a>
          <HeroControls header />
        </header>
        <div className="ambient-backdrop" aria-hidden="true" />
        <canvas data-cinematic-atmosphere className="cinematic-atmosphere" aria-hidden="true" />
        <div className="sculpture" aria-hidden="true"><canvas data-cinematic-sculpture /></div>
        <div className="cinematic-floor" aria-hidden="true" />
        <div className="hero-content">
          <h1 id="hero-title">Transforming<br /><em>ordinary people</em><br />into <strong>giants.</strong></h1>
          <span className="gold-divider" aria-hidden="true" />
          <HeroControls />
        </div>
      </section>
      <section id="discover" className="next-chapter" aria-labelledby="chapter-title">
        <span className="eyebrow">TOP G GLOBAL · NEXT CHAPTER</span>
        <h2 id="chapter-title">Greatness is developed.</h2>
        <p>The next section will be built after the cinematic hero is approved.</p>
      </section>
    </main>
  );
}
