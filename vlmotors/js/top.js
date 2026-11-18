/* СТАРТЕР: подключать в <head> первым скриптом: <script src="js/top.js?v=1"></script>
   Делает: запрет приближения щипком, обновление страницы всегда с главного экрана, лёгкий режим для слабых устройств, скрытие страницы до загрузки своих шрифтов. */
["gesturestart","gesturechange","gestureend"].forEach(function(n){document.addEventListener(n,function(e){e.preventDefault()})});
document.addEventListener("touchmove",function(e){if(e.touches&&e.touches.length>1)e.preventDefault()},{passive:false});

/* обновление страницы: без прыжка к блоку из #якоря */
(function(){var n=performance.getEntriesByType&&performance.getEntriesByType("navigation")[0];
var reload=n?n.type==="reload":(performance.navigation&&performance.navigation.type===1);
if(!reload)return;
try{history.scrollRestoration="manual"}catch(e){}
if(location.hash){try{history.replaceState(null,"",location.pathname+location.search)}catch(e){}}
function top(){try{scrollTo({top:0,left:0,behavior:"instant"})}catch(e){scrollTo(0,0)}}
top();addEventListener("DOMContentLoaded",top);
addEventListener("load",function(){top();setTimeout(top,60);setTimeout(top,300)});
addEventListener("pageshow",function(e){if(e.persisted)top()})})();

/* шрифты: пока свои не загрузились, страницу не показываем (иначе мелькает тонкий запасной). Список ниже заполнить своими шрифтами.
   Нужно ещё: <link rel="preload" as="font" type="font/woff2" crossorigin> на каждый шрифт первого экрана, font-display:block в @font-face (см. css/base.css). Страховка 3с. */
var FONT_LOADS=["600 40px Geologica","400 18px \"IBM Plex Sans\"","500 12px \"IBM Plex Mono\""]; /* например: ["800 40px Заголовки", "400 18px Текст"] */
(function(){var d=document.documentElement,done=false;
function go(){if(done)return;done=true;d.classList.remove("fl")}
if(!FONT_LOADS.length||!document.fonts||!document.fonts.load){return}
d.classList.add("fl");setTimeout(go,3000);
addEventListener("DOMContentLoaded",function(){Promise.all(FONT_LOADS.map(function(f){return document.fonts.load(f,"Аа Aa")})).then(go,go)})})();

/* лёгкий режим для слабых устройств (мало ядер или памяти, экономия трафика, «уменьшить движение», ?lite): без вечных анимаций и тяжёлого размытия, ВИД ТОТ ЖЕ */
(function(){var d=document.documentElement,n=navigator,c=n.connection||{};
var low=(n.deviceMemory&&n.deviceMemory<=4)||(n.hardwareConcurrency&&n.hardwareConcurrency<=4)||c.saveData||(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)||/[?&]lite/.test(location.search);
if(low&&!/[?&]nolite/.test(location.search))d.classList.add("lite")})();
