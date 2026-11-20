/* меню */
(()=>{const n=document.getElementById("nav"),b=document.getElementById("burger");if(!n||!b)return;let y0=0;
const set=o=>{n.classList.toggle("open",o);b.setAttribute("aria-expanded",o);b.textContent=o?"Закрыть":"Меню";if(o)y0=scrollY};
b.onclick=()=>set(!n.classList.contains("open"));
n.querySelector(".m").addEventListener("click",e=>{if(e.target.closest("a"))set(false)});
addEventListener("scroll",()=>{if(n.classList.contains("open")&&Math.abs(scrollY-y0)>6)set(false)},{passive:true});
document.addEventListener("pointerdown",e=>{if(n.classList.contains("open")&&!n.contains(e.target))set(false)},{passive:true});
document.addEventListener("keydown",e=>{if(e.key==="Escape")set(false)})})();

/* первый экран: схождение доходит от -0,5 до 0,0 */
(()=>{const g=document.getElementById("gg"),v=document.getElementById("gv"),p=document.getElementById("gp");if(!g)return;
const fin=()=>{v.textContent="0,0°";p.style.left="50%";g.classList.add("done")};
if(matchMedia("(prefers-reduced-motion: reduce)").matches){fin();return}
const T=2400,D=700;let t0=null;
const ease=x=>1-Math.pow(1-x,3);
function step(t){if(t0===null)t0=t;const k=Math.min(1,Math.max(0,(t-t0-D)/T)),e=ease(k),val=-0.5*(1-e);
 p.style.left=(50+val*50)+"%";v.textContent=(k>=1?"0,0":(val).toFixed(1).replace(".",","))+"°";
 if(k<1)requestAnimationFrame(step);else fin()}
addEventListener("load",()=>requestAnimationFrame(step))})();

/* выбор по узлу: вкладки-таблетки, отмеченные работы собираются в сообщение WhatsApp */
(()=>{const root=document.getElementById("uslugi");if(!root)return;
const tabs=[...root.querySelectorAll(".pills [data-go]")],items=[...root.querySelectorAll("#items li")],pics=[...root.querySelectorAll(".pics figure")],
sum=document.getElementById("sum"),car=document.getElementById("car"),go=document.getElementById("go");
const chosen=new Set();
function show(k){tabs.forEach(t=>t.setAttribute("aria-selected",t.dataset.go===k));items.forEach(li=>li.hidden=li.dataset.g!==k);pics.forEach(p=>p.classList.toggle("on",p.dataset.p===k))}
tabs.forEach(el=>el.addEventListener("click",()=>show(el.dataset.go)));
function counts(){tabs.forEach(t=>{const k=t.dataset.go,c=items.filter(li=>li.dataset.g===k&&chosen.has(li.firstElementChild.dataset.v)).length,u=t.querySelector("u");u.textContent=c;u.classList.toggle("has",c>0)})}
function update(){const list=[...chosen],c=(car.value||"").trim();
 let t="Здравствуйте! Хочу записаться";if(list.length)t+=": "+list.join(", ");t+=".";if(c)t+=" Машина: "+c+".";
 go.href="https://wa.me/79147078152?text="+encodeURIComponent(t);
 sum.textContent=list.length?"Выбрано: "+list.join(", ")+".":"Пока ничего не выбрано. Можно просто написать.";counts()}
root.querySelector("#items").addEventListener("click",e=>{const b=e.target.closest("button[data-v]");if(!b)return;const v=b.dataset.v,on=!chosen.has(v);on?chosen.add(v):chosen.delete(v);b.setAttribute("aria-checked",on);update()});
car.addEventListener("input",update);update()})();

/* отзывы: три сами сменяются, точки переключают вручную */
(()=>{const r=document.getElementById("rot");if(!r)return;
const sl=[...r.querySelectorAll(".sl")],dots=[...r.querySelectorAll(".dots button")];let i=0,timer=null,vis=false,hold=false;
function go(n){i=(n+sl.length)%sl.length;sl.forEach((s,k)=>s.classList.toggle("on",k===i));dots.forEach((d,k)=>d.setAttribute("aria-selected",k===i))}
function run(){clearInterval(timer);if(vis&&!hold)timer=setInterval(()=>go(i+1),7000)}
dots.forEach((d,k)=>d.addEventListener("click",()=>{go(k);run()}));
r.addEventListener("pointerenter",()=>{hold=true;run()});r.addEventListener("pointerleave",()=>{hold=false;run()});
r.addEventListener("focusin",()=>{hold=true;run()});r.addEventListener("focusout",()=>{hold=false;run()});
new IntersectionObserver(es=>es.forEach(e=>{vis=e.isIntersecting;run()})).observe(r)})();

/* появление блоков и пауза анимаций вне экрана */
(()=>{const d=document.documentElement;d.classList.add("js");
const els=document.querySelectorAll(".tri,.defs,.prove>*,.ph,.pills,.pgrid>*,.send,.rgrid>*,.cgrid>*");els.forEach(e=>e.classList.add("rv"));
if(!("IntersectionObserver"in window)){els.forEach(e=>e.classList.add("in"));return}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{rootMargin:"0px 0px -6% 0px",threshold:.05});els.forEach(e=>io.observe(e));
setTimeout(()=>els.forEach(e=>e.classList.add("in")),4000);
const po=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle("off",!e.isIntersecting)),{rootMargin:"60px"});document.querySelectorAll("[data-pause],.angles,.contact").forEach(e=>po.observe(e))})();
