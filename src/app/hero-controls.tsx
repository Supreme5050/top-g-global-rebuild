"use client";
import {useState} from "react";
const main=[{label:"Home",href:"/"},{label:"About"},{label:"Seven Realms"},{label:"What We Do"}];
const extra=["Five Focus Areas","Founder & Pioneers","Impact & Progress","Contact & FAQs"];
export default function HeroControls({header=false}:{header?:boolean}){
const [menu,setMenu]=useState(false),[dialog,setDialog]=useState("");
const upcoming=(name:string)=>{setMenu(false);setDialog(name)};
return <>{header?<>
<nav className="hero-nav" aria-label="Main navigation">
{main.map(n=>n.href?<a key={n.label} className="active" aria-current="page" href={n.href}>{n.label}</a>:<button key={n.label} type="button" onClick={()=>upcoming(n.label)}>{n.label}</button>)}
<div className="more-menu"><button type="button" aria-expanded={menu} aria-controls="more-items" onClick={()=>setMenu(!menu)}>More <span aria-hidden="true">⌄</span></button>{menu&&<div className="more-items" id="more-items">{extra.map(label=><button key={label} type="button" onClick={()=>upcoming(label)}>{label}</button>)}</div>}</div>
</nav><button className="header-join" onClick={()=>upcoming("Join Top G")}>Join Top G <span aria-hidden="true">↗</span></button>
<details className="mobile-nav"><summary aria-label="Open navigation">☰</summary><nav aria-label="Mobile navigation">{main.map(n=>n.href?<a key={n.label} href={n.href}>{n.label}</a>:<button key={n.label} type="button" onClick={()=>upcoming(n.label)}>{n.label}</button>)}{extra.map(label=><button key={label} type="button" onClick={()=>upcoming(label)}>{label}</button>)}<button type="button" onClick={()=>upcoming("Join Top G")}>Join Top G</button></nav></details>
</>:<div className="hero-ctas"><a className="explore-cta" href="#discover">Explore Top G <span aria-hidden="true">↗</span></a><button className="story-cta" type="button" onClick={()=>upcoming("Watch Our Story")}><span className="play-circle" aria-hidden="true">▶</span> Watch Our Story</button></div>}
{dialog&&<div className="preview-overlay" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setDialog("")}}><section role="dialog" aria-modal="true" aria-label={dialog} className="preview-modal"><button type="button" className="modal-close" onClick={()=>setDialog("")} aria-label="Close">×</button><span>TOP G GLOBAL · HERO REVIEW</span><h2>{dialog}</h2><p>{dialog==="Watch Our Story"?"Our official story film is not available yet. We will link approved media when it is ready.":"This page will be built after you approve the cinematic hero. No application or form is live yet."}</p><button type="button" className="modal-return" onClick={()=>setDialog("")}>Return to hero</button></section></div>}
</>}