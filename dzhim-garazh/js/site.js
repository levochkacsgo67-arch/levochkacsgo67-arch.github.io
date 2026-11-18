/* Джим Гараж: тропа (линия и остановки), появление блоков, статус «сейчас открыто» по времени Владивостока */
(()=>{
const trail=document.getElementById("trail");
if(trail){
  const stops=[...trail.querySelectorAll(".stop")];let live=false,raf=0;
  const upd=()=>{raf=0;const mark=innerHeight*.62;
    stops.forEach(s=>{const r=s.getBoundingClientRect();s.style.setProperty("--s",Math.max(0,Math.min(1,(mark-r.top-20)/Math.max(1,r.height))).toFixed(4));s.classList.toggle("on",r.top<mark)})};
  const req=()=>{if(live&&!raf)raf=requestAnimationFrame(upd)};
  if("IntersectionObserver"in window){new IntersectionObserver(es=>{live=es[0].isIntersecting;if(live)req()},{rootMargin:"200px 0px"}).observe(trail)}else{live=true}
  addEventListener("scroll",req,{passive:true});addEventListener("resize",req);upd();
}
/* мягкое появление */
const rv=document.querySelectorAll(".rv");
if("IntersectionObserver"in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{rootMargin:"0px 0px -8% 0px",threshold:.05});rv.forEach(e=>io.observe(e))}else rv.forEach(e=>e.classList.add("in"));
/* открыто ли сейчас: Пн-Сб 10:00-19:00, время Владивостока */
const now=document.getElementById("now");
if(now&&window.Intl){try{
  const f=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Vladivostok",weekday:"short",hour:"2-digit",minute:"2-digit",hour12:false}).formatToParts(new Date());
  const g=t=>f.find(x=>x.type===t).value;const d=g("weekday"),m=(+g("hour"))*60+(+g("minute"));
  const days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],i=days.indexOf(d);
  if(i>=0&&i<=5&&m>=600&&m<1140){now.textContent="Сейчас открыто, до 19:00"}
  else{now.classList.add("shut");const txt=(i<=5&&m<600)?"сегодня в 10:00":(i<=4?"завтра в 10:00":"в понедельник в 10:00");now.textContent="Сейчас закрыто, откроемся "+txt}
}catch(_){}}
})();
