/* Original low-overhead cinematic dust and gold horizon. No images or video.
 * Reduced motion, data saver, visibility and mobile devices are respected.
 */
(() => {
  const canvas = document.querySelector('[data-cinematic-atmosphere]');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', {alpha:true});
  if (!ctx) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const low = innerWidth < 700 || !!navigator.connection?.saveData;
  let seed = 18737;
  const random = () => ((seed = (Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
  const stars = Array.from({length:low?95:205}, () => ({
    x:random(), y:.05+random()*.92, r:.4+random()*1.7,
    phase:random()*6.283, speed:.1+random()*.4,
    opacity:.35+random()*.58
  }));
  const ground = Array.from({length:low?150:350}, () => ({
    x:random(), y:random(), alpha:.16+random()*.8,
    r:.3+random()*1.5, phase:random()*6.283
  }));
  let alive=true,visible=true,frame=0,last=0;
  const observer=new IntersectionObserver(entries=>{
    visible=entries[0]?.isIntersecting??false;
    if(visible&&!frame)frame=requestAnimationFrame(render);
  },{threshold:.02});
  observer.observe(canvas);
  function dot(x,y,r,a,light=false){
    ctx.fillStyle=light?`rgba(255,216,147,${a})`:`rgba(217,141,64,${a})`;
    ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
  }
  function render(ms){
    frame=0;
    if(!alive||!visible||document.hidden)return;
    if(!reduced && ms-last<36){frame=requestAnimationFrame(render);return;}
    last=ms;
    const dpr=Math.min(devicePixelRatio||1,low?1:1.35);
    const w=Math.max(1,Math.round(canvas.clientWidth*dpr));
    const h=Math.max(1,Math.round(canvas.clientHeight*dpr));
    if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}
    ctx.clearRect(0,0,w,h);
    const t=reduced?0:ms*.001;
    for(const s of stars){
      const x=s.x*w,y=s.y*h+Math.sin(t*s.speed+s.phase)*h*.008;
      const alpha=s.opacity*(.57+.43*Math.sin(t*(.34+s.speed)+s.phase));
      if(s.r>1.4){
        const radius=s.r*5*dpr;
        const glow=ctx.createRadialGradient(x,y,0,x,y,radius);
        glow.addColorStop(0,`rgba(255,183,99,${alpha*.20})`);
        glow.addColorStop(1,'rgba(255,183,99,0)');
        ctx.fillStyle=glow;ctx.fillRect(x-radius,y-radius,radius*2,radius*2);
      }
      dot(x,y,s.r*dpr*.7,alpha*.8,s.r>1.3);
    }
    for(const p of ground){
      const x=p.x*w+Math.sin(t*.21+p.phase)*w*.003;
      const y=h*.84+h*.22*Math.pow(p.y,1.45);
      const alpha=p.alpha*(.57+.43*Math.sin(t*.37+p.phase));
      dot(x,y,p.r*dpr,alpha*.7,y>h*.92);
    }
    const rim=ctx.createLinearGradient(0,0,w,0);
    rim.addColorStop(0,'rgba(195,107,44,0)');
    rim.addColorStop(.38,'rgba(222,138,55,.22)');
    rim.addColorStop(.7,'rgba(255,192,102,.40)');
    rim.addColorStop(1,'rgba(209,117,45,.14)');
    const y=h*.965;
    ctx.strokeStyle=rim;ctx.lineWidth=Math.max(1,dpr*.8);
    ctx.beginPath();ctx.moveTo(0,y);
    ctx.bezierCurveTo(w*.28,y-h*.03,w*.62,y+h*.025,w,y-h*.03);
    ctx.stroke();
    if(!reduced)frame=requestAnimationFrame(render);
  }
  const visibility=()=>{if(!document.hidden&&visible&&!frame)frame=requestAnimationFrame(render);};
  document.addEventListener('visibilitychange',visibility);
  addEventListener('pagehide',()=>{
    alive=false;if(frame)cancelAnimationFrame(frame);
    observer.disconnect();document.removeEventListener('visibilitychange',visibility);
  },{once:true});
  frame=requestAnimationFrame(render);
})();
