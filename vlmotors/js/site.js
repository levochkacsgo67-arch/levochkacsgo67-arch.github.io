/* VLmotors: вкладки систем, проверка марки, статус «открыто» */
(()=>{
/* вкладки */
const rows=[...document.querySelectorAll("#rows .row")],fig=document.getElementById("fig");
if(rows.length&&fig){const imgs=[...fig.querySelectorAll("img")];
const pick=i=>{rows.forEach((r,k)=>r.setAttribute("aria-selected",k===i));imgs.forEach((m,k)=>m.classList.toggle("on",k===i))};
rows.forEach((r,i)=>{r.addEventListener("click",()=>pick(i));
r.addEventListener("keydown",e=>{if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();const j=(i+(e.key==="ArrowDown"?1:rows.length-1))%rows.length;pick(j);rows[j].focus()}})})}

/* марки */
const G=[["Японские",["Acura","Daihatsu","Datsun","Honda","Infiniti","Isuzu","Lexus","Mazda","Mitsubishi","Nissan","Subaru","Suzuki","Toyota"]],
["Корейские",["Daewoo","Hyundai","Kia","SsangYong"]],
["Китайские",["Brilliance","BYD","Changan","Chery","Dongfeng","Exeed","FAW","GAC","Geely","Great Wall","Haima","Haval","Hawtai","JAC","Lifan","Luxgen","Maxus","OMODA","Tianye","Voyah","Zotye"]],
["Европейские",["Audi","BMW","Citroen","Fiat","Jaguar","Lancia","Land Rover","Mercedes-Benz","MINI","Opel","Peugeot","Porsche","Renault","Rover","Saab","SEAT","Skoda","Smart","Volkswagen","Volvo"]],
["Американские",["Cadillac","Chevrolet","Chrysler","Dodge","Ford","GMC","Hummer","Jeep","Lincoln"]],
["Другие",["Ravon","Sollers","Vortex"]]];
const total=G.reduce((a,g)=>a+g[1].length,0);
document.querySelectorAll("[data-brands]").forEach(e=>e.textContent=total);
const box=document.getElementById("groups"),q=document.getElementById("q"),vd=document.getElementById("verdict");
if(box){const all=[];
const cols=[[0],[2],[3],[1,4,5]];
cols.forEach(ix=>{const col=document.createElement("div");col.className="col";ix.forEach(k=>{const [t,l]=G[k];const d=document.createElement("div");d.className="grp";d.innerHTML='<h3>'+t+'<span class="mono">'+l.length+'</span></h3>';
const c=document.createElement("div");c.className="chips";l.forEach(n=>{const s=document.createElement("span");s.className="chip";s.textContent=n;c.appendChild(s);all.push(s)});d.appendChild(c);col.appendChild(d)});box.appendChild(col)});
const norm=s=>s.toLowerCase().replace(/[^a-zа-я0-9]/g,"");
const map={"тойота":"toyota","хонда":"honda","ниссан":"nissan","мазда":"mazda","субару":"subaru","сузуки":"suzuki","мицубиси":"mitsubishi","лексус":"lexus","хёндай":"hyundai","хендай":"hyundai","хундай":"hyundai","киа":"kia","ссангйонг":"ssangyong","санг":"ssangyong","хавал":"haval","чери":"chery","джили":"geely","геликс":"geely","бмв":"bmw","ауди":"audi","мерседес":"mercedesbenz","фольксваген":"volkswagen","шкода":"skoda","вольво":"volvo","опель":"opel","рено":"renault","пежо":"peugeot","ситроен":"citroen","форд":"ford","шевроле":"chevrolet","джип":"jeep","порше":"porsche","чанган":"changan","омода":"omoda","эксид":"exeed","бид":"byd","инфинити":"infiniti","додж":"dodge","крайслер":"chrysler","кадиллак":"cadillac","ленд ровер":"landrover","лендровер":"landrover","мини":"mini","фиат":"fiat","ягуар":"jaguar","сеат":"seat","смарт":"smart","дэу":"daewoo","дэо":"daewoo","грейтвол":"greatwall","грейт вол":"greatwall","гелли":"geely"};
const bind=(inp,out,hl)=>{if(!inp||!out)return;inp.addEventListener("input",()=>{let v=norm(inp.value);const w=inp.value.trim().toLowerCase();if(map[w])v=map[w];else if(map[v])v=map[v];
const hits=all.filter(s=>v&&norm(s.textContent).includes(v));
if(hl){document.querySelectorAll(".chips").forEach(c=>c.classList.toggle("dim-all",!!v));all.forEach(s=>s.classList.toggle("hit",hits.includes(s)))}
if(!v)out.textContent="";else if(hits.length)out.innerHTML="<b>"+hits.map(s=>s.textContent).slice(0,3).join(", ")+"</b>: берём в работу.";else out.textContent="Такой марки нет в списке. Позвоните или напишите, подскажем."})};
bind(q,vd,true);bind(document.getElementById("q2"),document.getElementById("v2"),false)}

})();
