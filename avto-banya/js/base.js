/* СТАРТЕР: подключать в конце <body>: <script src="js/base.js?v=1"></script> */

/* меню: открыть/закрыть; закрывается само при прокрутке больше 6px, нажатии мимо, Escape и нажатии на пункт */
(()=>{const n=document.getElementById("nav"),b=document.getElementById("burger");if(!n||!b)return;let y0=0;
const set=o=>{n.classList.toggle("open",o);b.setAttribute("aria-expanded",o);b.textContent=o?"Закрыть":"Меню";if(o)y0=scrollY};
b.onclick=()=>set(!n.classList.contains("open"));
n.querySelector(".m").addEventListener("click",e=>{if(e.target.closest("a"))set(false)});
addEventListener("scroll",()=>{if(n.classList.contains("open")&&Math.abs(scrollY-y0)>6)set(false)},{passive:true});
document.addEventListener("pointerdown",e=>{if(n.classList.contains("open")&&!n.contains(e.target))set(false)},{passive:true});
document.addEventListener("keydown",e=>{if(e.key==="Escape")set(false)})})();

/* Telegram сразу в приложение (tg://), без промежуточной страницы t.me. TG_PHONE: номер без плюса, привязка к номеру. На телефоне запасного пути нет, на компьютере через 1.8с откроется сайт. */
const TG_PHONE="79089945777";
const MOB=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
function openTG(url){let t="";try{t=new URL(url,location.href).searchParams.get("text")||""}catch(_){}
const app="tg://resolve?phone="+TG_PHONE+(t?"&text="+encodeURIComponent(t):"");let left=false;const mark=()=>{left=true};
addEventListener("blur",mark,{once:true});addEventListener("pagehide",mark,{once:true});document.addEventListener("visibilitychange",mark,{once:true});
location.href=app;if(!MOB)setTimeout(()=>{if(!left&&!document.hidden)window.open("https://t.me/+"+TG_PHONE+(t?"?text="+encodeURIComponent(t):""),"_blank","noopener")},1800)}
document.addEventListener("click",e=>{const a=e.target.closest&&e.target.closest('a[href^="tg://resolve?phone="]');if(!a||e.defaultPrevented)return;e.preventDefault();openTG(a.getAttribute("href"))},true);

/* выбор из списка в форме: шторка сверху вниз (разметка: #svc > .selb + .selm > button[data-v] + input[type=hidden]) */
(()=>{const w=document.getElementById("svc");if(!w)return;const b=w.querySelector(".selb"),m=w.querySelector(".selm"),v=w.querySelector(".selv"),h=w.querySelector("input[type=hidden]");
const set=o=>{b.setAttribute("aria-expanded",o);w.classList.toggle("open",o)};
b.onclick=()=>set(!w.classList.contains("open"));
m.addEventListener("click",e=>{const o=e.target.closest("button[data-v]");if(!o)return;h.value=o.dataset.v;v.textContent=o.dataset.v;w.classList.add("has");b.classList.remove("err");m.querySelectorAll("button").forEach(x=>x.setAttribute("aria-selected",x===o));set(false)});
document.addEventListener("pointerdown",e=>{if(!w.contains(e.target))set(false)},{passive:true});
document.addEventListener("keydown",e=>{if(e.key==="Escape")set(false)});
/* отправка: ничего не уходит на сервер, открывается Telegram с готовым текстом; без выбранной услуги подсвечивается поле и раскрывается список */
const f=document.getElementById("lead");if(f)f.addEventListener("submit",e=>{e.preventDefault();const n=h.value.trim(),l=(f.l&&f.l.value||"").trim();if(!n){b.classList.add("err");set(true);return}
openTG("tg://resolve?phone="+TG_PHONE+"&text="+encodeURIComponent("Здравствуйте! Интересует: "+n+"."+(l?"\nКомментарий: "+l:"")))})})();

/* картинки ниже первого экрана: src ставится, когда блок подошёл к экрану (разметка: <img data-s="img/x.webp" alt="">) */
(()=>{const imgs=()=>document.querySelectorAll("img[data-s]");const put=i=>{const s=i.dataset.s;i.removeAttribute("data-s");const m=new Image();m.src=s;(m.decode?m.decode():Promise.reject()).then(()=>{i.src=s},()=>{i.src=s})};const load=()=>imgs().forEach(put);
if(!("IntersectionObserver"in window)){load();return}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll("img[data-s]").forEach(put);io.unobserve(e.target)}}),{rootMargin:"1200px 0px"});
document.querySelectorAll("[data-lazy]").forEach(e=>io.observe(e))})();

/* скорость: анимации стоят, пока блок не на экране (класс off); если кадров мало, включается лёгкий режим (класс lite на <html>) */
(()=>{const root=document.documentElement;
if("IntersectionObserver"in window){const io=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle("off",!e.isIntersecting)),{rootMargin:"60px"});document.querySelectorAll("[data-pause]").forEach(e=>io.observe(e))}
if(!root.classList.contains("lite")&&!/[?&]nolite/.test(location.search)){setTimeout(()=>{let n=0,t0=0,last=0,bad=0;const f=t=>{if(!t0)t0=t;else{n++;if(t-last>40)bad++}last=t;if(t-t0<1500)requestAnimationFrame(f);else if(n>10&&((t-t0)/n>42||bad/n>.5))root.classList.add("lite")};requestAnimationFrame(f)},2500)}})();

/* статус «открыто сейчас» по времени Владивостока (UTC+10); часы работы: каждый день 10:00-21:00 */
(()=>{const el=document.getElementById("liveT");if(!el)return;
try{const p=new Intl.DateTimeFormat("ru-RU",{timeZone:"Asia/Vladivostok",hour:"numeric",minute:"numeric",hourCycle:"h23"}).formatToParts(new Date());
const h=+p.find(x=>x.type==="hour").value,m=+p.find(x=>x.type==="minute").value,t=h*60+m;
if(t>=600&&t<1260){el.textContent="Открыто сейчас, до 21:00"}else{el.textContent=t<600?"Открываемся в 10:00":"Запись на завтра с 10:00"}}catch(_){}})();
