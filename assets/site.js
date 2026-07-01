
document.querySelectorAll('#yr').forEach(e=>e.textContent=new Date().getFullYear());
const nav=document.getElementById('nav');
function onScroll(){nav.classList.toggle('scrolled',window.scrollY>40);const pr=document.getElementById('progress');
if(pr){const h=document.documentElement.scrollHeight-window.innerHeight;pr.style.width=(h>0?(window.scrollY/h*100):0)+'%';}
const tt=document.getElementById('totop');if(tt)tt.classList.toggle('show',window.scrollY>600);}
onScroll();window.addEventListener('scroll',onScroll,{passive:true});
const tg=document.getElementById('menuToggle'),lk=document.getElementById('navLinks');
if(tg){tg.addEventListener('click',()=>{const o=lk.classList.toggle('show');tg.setAttribute('aria-expanded',o);});
lk.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>lk.classList.remove('show')));}
const tt=document.getElementById('totop');if(tt)tt.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
const io=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');
e.target.querySelectorAll('[data-count]').forEach(runCount);io.unobserve(e.target);}});},{threshold:.14,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
function runCount(el){const to=parseFloat(el.dataset.count),dec=parseInt(el.dataset.dec||'0'),dur=1300;let s=null;
function f(t){if(!s)s=t;const p=Math.min((t-s)/dur,1),e=1-Math.pow(1-p,3);el.textContent=(to*e).toFixed(dec);
if(p<1)requestAnimationFrame(f);else el.textContent=to.toFixed(dec);}requestAnimationFrame(f);}
(function(){const reduced=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
const DPR=Math.min(window.devicePixelRatio||1,2);const S='15,169,155',V='106,87,232';
document.querySelectorAll('canvas.mesh').forEach(canvas=>{const ctx=canvas.getContext('2d');
let W,H,nodes=[],packets=[],raf=null,mouse={x:-999,y:-999};const host=canvas.closest('.mesh-host')||canvas.parentElement;
function cnt(){const w=host.clientWidth;const d=parseFloat(canvas.dataset.density||'1');return Math.round((w<620?18:w<1000?30:46)*d);}
function resize(){W=host.clientWidth;H=host.clientHeight;canvas.width=W*DPR;canvas.height=H*DPR;ctx.setTransform(DPR,0,0,DPR,0,0);}
function seed(){nodes=[];const n=cnt();for(let i=0;i<n;i++)nodes.push({x:Math.random()*W,y:Math.random()*H,
vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,r:Math.random()*1.5+1,hue:Math.random()<.16?V:S});packets=[];}
const LINK=148;function frame(){ctx.clearRect(0,0,W,H);
for(const p of nodes){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
const dx=p.x-mouse.x,dy=p.y-mouse.y,d=Math.hypot(dx,dy);if(d<110){p.x+=dx/d*.6;p.y+=dy/d*.6;}}
for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){const a=nodes[i],b=nodes[j],
dx=a.x-b.x,dy=a.y-b.y,dist=Math.hypot(dx,dy);if(dist<LINK){const near=Math.min(Math.hypot((a.x+b.x)/2-mouse.x,(a.y+b.y)/2-mouse.y),240);
const boost=1-near/240,op=(1-dist/LINK)*(.10+boost*.30);ctx.strokeStyle='rgba('+S+','+op.toFixed(3)+')';ctx.lineWidth=1;
ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
if(!reduced&&Math.random()<.0006&&packets.length<12)packets.push({a,b,t:0,sp:.006+Math.random()*.01});}}
for(let k=packets.length-1;k>=0;k--){const pk=packets[k];pk.t+=pk.sp;if(pk.t>=1){packets.splice(k,1);continue;}
const x=pk.a.x+(pk.b.x-pk.a.x)*pk.t,y=pk.a.y+(pk.b.y-pk.a.y)*pk.t;const g=ctx.createRadialGradient(x,y,0,x,y,7);
g.addColorStop(0,'rgba('+S+',.9)');g.addColorStop(1,'rgba('+S+',0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,7,0,7);ctx.fill();
ctx.fillStyle='rgba('+S+',1)';ctx.beginPath();ctx.arc(x,y,1.5,0,7);ctx.fill();}
for(const p of nodes){ctx.fillStyle='rgba('+p.hue+',.85)';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,7);ctx.fill();
ctx.fillStyle='rgba('+p.hue+',.10)';ctx.beginPath();ctx.arc(p.x,p.y,p.r*3,0,7);ctx.fill();}
if(!reduced)raf=requestAnimationFrame(frame);}
function start(){cancelAnimationFrame(raf);resize();seed();frame();}
host.addEventListener('mousemove',e=>{const r=canvas.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top;});
host.addEventListener('mouseleave',()=>{mouse.x=-999;mouse.y=-999;});
let rt;window.addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(start,180);});
const vio=new IntersectionObserver(([e])=>{if(reduced)return;if(e.isIntersecting){if(!raf)frame();}else{cancelAnimationFrame(raf);raf=null;}},{threshold:0});
vio.observe(host);start();});})();
