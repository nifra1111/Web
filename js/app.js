const WA='628xxxxxxxxxx',wa=t=>'https://wa.me/'+WA+'?text='+encodeURIComponent(t),$=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s),rm=matchMedia('(prefers-reduced-motion:reduce)').matches,G=!!window.gsap&&!rm;
$$('[data-wa]').forEach(a=>{a.href=wa(a.dataset.wa)});
$('#yr').textContent=new Date().getFullYear();
const mqt=['DED','PBG','SLF','SNI','KDB','KLB','KDH','HYDRANT','CCTV','DWG','CTB','AUTOCAD'].map(x=>'<span class="px-5">'+x+'</span><i class="text-cy not-italic">◆</i>').join('');
$('#mq').innerHTML=mqt+mqt;

document.addEventListener('pointermove',e=>{const c=e.target.closest&&e.target.closest('.card');if(c){const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')}});

/* ---------- CAD WORKSPACE ---------- */
const st={f:1,sp:'m',furn:1,dim:1,mep:1,lbl:1};
const cad=$('#cad'),chv=$('#chv'),chh=$('#chh'),chd=$('#chd'),cht=$('#cht'),rd=$('#rd'),rh=$('#rh'),tip=$('#tip'),cw=$('#cw');
let hT;
const ROOMS={
 1:[['Ruang Tamu',60,50,240,160],['Carport',60,210,240,160],['Dapur & R. Makan',300,50,240,140],['Tangga',300,190,120,180],['KM / WC',420,190,120,180]],
 2:[['Kamar Utama',60,50,240,160],['Kamar 2',60,210,240,160],['R. Keluarga',300,50,240,140],['Void / Tangga',300,190,120,180],['KM / WC',420,190,120,180]]
};
function draw(sel){
 const p=st.sp==='p';
 $$('#cad [data-l]').forEach(g=>{const f=g.dataset.f;g.style.display=(st[g.dataset.l]&&(!f||+f===st.f))?'':'none'});
 $$('[data-fl]').forEach(b=>b.classList.toggle('on',+b.dataset.fl===st.f));
 $$('[data-sp]').forEach(b=>b.classList.toggle('on',b.dataset.sp===st.sp));
 $$('[data-ly]').forEach(b=>{const on=!!st[b.dataset.ly];b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});
 cad.classList.toggle('pp',p);
 cw.classList.toggle('pp-mob',p);
 $('#pphint').classList.toggle('hidden',!p);
 $('#pphint').classList.toggle('flex',p);
 cad.setAttribute('viewBox',p?'0 0 760 420':'0 0 600 420');
 $('#fn').textContent='RRR-DENAH-LT0'+st.f+(p?' · LAYOUT-A3':'.dwg');
 $('#tbt').textContent='DENAH LANTAI 0'+st.f;
 $('#tbn').textContent='A-10'+st.f;
 if(sel&&G)gsap.fromTo(sel+' > *',{opacity:0},{opacity:1,duration:.5,stagger:.02,clearProps:'opacity'});
}
function hide(){chv.style.display=chh.style.display=chd.style.display=cht.style.display='none';rh.style.display='none';tip.style.opacity=0}
function roomAt(x,y){return ROOMS[st.f].find(r=>x>=r[1]&&x<r[1]+r[3]&&y>=r[2]&&y<r[2]+r[4])}
function mv(e){
 clearTimeout(hT);
 const r=cad.getBoundingClientRect(),vb=cad.viewBox.baseVal,x=(e.clientX-r.left)*vb.width/r.width,y=(e.clientY-r.top)*vb.height/r.height,tx=((x-60)/40).toFixed(2),ty=((370-y)/40).toFixed(2);
 chv.setAttribute('x1',x);chv.setAttribute('x2',x);chh.setAttribute('x2',vb.width);chh.setAttribute('y1',y);chh.setAttribute('y2',y);
 chd.setAttribute('cx',x);chd.setAttribute('cy',y);
 cht.setAttribute('x',x>vb.width-140?x-10:x+10);cht.setAttribute('y',y>30?y-8:y+16);cht.style.textAnchor=x>vb.width-140?'end':'start';cht.textContent=tx+', '+ty;
 chv.style.display=chh.style.display=chd.style.display=cht.style.display='';
 rd.textContent='X: '+tx+'  Y: '+ty+' m';
 const m=roomAt(x,y);
 if(m){
  const w=m[3]/40,h=m[4]/40;
  rh.setAttribute('x',m[1]);rh.setAttribute('y',m[2]);rh.setAttribute('width',m[3]);rh.setAttribute('height',m[4]);rh.style.display='';
  tip.innerHTML='<b class="text-cy">'+m[0]+'</b><span>'+w.toFixed(2)+' × '+h.toFixed(2)+' m</span><span class="text-ind">'+(w*h).toFixed(2)+' m²</span>';
  const wr=cw.getBoundingClientRect(),px=e.clientX-wr.left+cw.scrollLeft,py=e.clientY-wr.top;
  let ty2=py-tip.offsetHeight-12;if(ty2<6)ty2=py+18;
  tip.style.left=Math.max(6,px+14)+'px';tip.style.top=ty2+'px';tip.style.opacity=1;
 }else{rh.style.display='none';tip.style.opacity=0}
}
cad.addEventListener('pointermove',mv);
cad.addEventListener('pointerdown',mv);
cad.addEventListener('pointerleave',e=>{clearTimeout(hT);if(e.pointerType==='touch')hT=setTimeout(hide,2500);else hide()});
$$('[data-fl]').forEach(b=>b.onclick=()=>{st.f=+b.dataset.fl;hide();draw('#cad [data-f="'+st.f+'"]')});
$$('[data-ly]').forEach(b=>b.onclick=()=>{const k=b.dataset.ly;st[k]=st[k]?0:1;draw(st[k]?'#cad [data-l="'+k+'"]':'')});
$$('[data-sp]').forEach(b=>b.onclick=()=>{
 if(st.sp===b.dataset.sp)return;
 st.sp=b.dataset.sp;hide();draw();
 if(G){
  if(st.sp==='p'){gsap.from('#pap',{opacity:0,duration:.5});gsap.from('#tb > *',{opacity:0,x:18,duration:.45,stagger:.03,clearProps:'all'})}
  else gsap.from('#wl > *',{opacity:.2,duration:.5,clearProps:'opacity'});
 }
});
draw();

/* ---------- KATALOG + MODAL ---------- */
const SV=[
{id:1,c:'kerja',ic:'ruler',tag:'PAKET 01',t:'Gambar Kerja Arsitektur / DED',d:'Set gambar kerja lengkap untuk pelaksanaan dan tender, siap dipakai kontraktor.',l:['Denah tata ruang per lantai','Tampak depan, belakang, kiri, dan kanan (4 tampak)','Potongan memanjang dan melintang','Detail kusen pintu dan jendela','Rencana plafon dan detail plafon','Title block, legenda, dan skala standar','File master DWG dan PDF']},
{id:2,c:'izin',ic:'file-check-2',tag:'PAKET 02',t:'Dokumen Teknis Perizinan PBG & SLF',d:'Kelengkapan teknis pengajuan PBG dan SLF sesuai standar SNI.',l:['Perhitungan intensitas KDB, KLB, dan KDH','Site plan dan rencana tapak','Gambar utilitas dan sanitasi','Skema proteksi kebakaran dan hydrant sesuai SNI','Layout titik CCTV','Rekap lembar dokumen teknis pengajuan','File master DWG dan PDF']},
{id:3,c:'redraw',ic:'layers',tag:'PAKET 03',t:'Redraw & Optimasi Denah',d:'Ubah sketsa tangan atau PDF lama menjadi file AutoCAD yang terstruktur.',l:['Konversi sketsa tangan atau PDF lama ke DWG','Manajemen layer yang konsisten','Plot style CTB standar','Optimasi dan perapian denah','Dimensi dan penamaan ruang','File master DWG dan PDF']}];
let cat='all';
function render(){
 $('#grid').innerHTML=SV.filter(s=>cat==='all'||s.c===cat).map(s=>`<article class="card group p-6 flex flex-col hover:-translate-y-1.5"><div class="flex items-center justify-between"><span class="w-11 h-11 rounded-xl bg-cy/10 border border-cy/30 grid place-items-center text-cy transition group-hover:scale-110 group-hover:rotate-6"><i data-lucide="${s.ic}" class="w-5 h-5"></i></span><span class="mono text-[10px] text-ind tracking-widest">${s.tag}</span></div><h3 class="font-bold text-lg mt-5">${s.t}</h3><p class="text-sm text-slate-400 mt-2 mb-6">${s.d}</p><button data-op="${s.id}" class="btn btn-g mt-auto"><i data-lucide="list-checks" class="w-4 h-4"></i>Lihat Daftar Lembar</button></article>`).join('');
 lucide.createIcons();
 $$('#grid [data-op]').forEach(b=>b.onclick=()=>openM(+b.dataset.op));
 if(G)gsap.from('#grid article',{y:30,opacity:0,scale:.96,duration:.6,stagger:.12,ease:'back.out(1.4)',clearProps:'transform,opacity'});
}
$$('#tabs [data-c]').forEach(b=>b.onclick=()=>{cat=b.dataset.c;$$('#tabs .chip').forEach(x=>x.classList.toggle('on',x===b));render()});
function openM(id){
 const s=SV.find(x=>x.id===id);
 $('#mt').textContent=s.tag;$('#mh').textContent=s.t;
 $('#ml').innerHTML=s.l.map(i=>`<li class="flex gap-3"><i data-lucide="check" class="w-4 h-4 text-cy mt-0.5 shrink-0"></i><span>${i}</span></li>`).join('');
 $('#mw').href=wa('Halo Raan Rancang Ruang, saya tertarik dengan '+s.tag+': '+s.t+'. Mohon info lebih lanjut.');
 $('#md').classList.replace('hidden','flex');document.body.style.overflow='hidden';lucide.createIcons();
 if(G){gsap.from('#md',{opacity:0,duration:.25});gsap.from('#mb',{y:40,opacity:0,scale:.95,duration:.4,ease:'back.out(1.5)'});gsap.from('#ml li',{x:-16,opacity:0,stagger:.05,delay:.15,clearProps:'all'})}
}
function closeM(){$('#md').classList.replace('flex','hidden');$('#lbx').classList.replace('flex','hidden');document.body.style.overflow=''}
$('#mx').onclick=closeM;$('#md').onclick=e=>{if(e.target.id==='md')closeM()};
$('#lbxx').onclick=closeM;$('#lbx').onclick=e=>{if(e.target.id==='lbx')closeM()};
addEventListener('keydown',e=>{if(e.key==='Escape')closeM()});

/* ---------- SAMPEL OUTPUT LEMBAR KERJA + LIGHTBOX ---------- */
const WM='<g opacity=".13" transform="rotate(-22 180 120)"><text x="180" y="105" text-anchor="middle" style="font:800 22px 'JetBrains Mono',monospace;fill:#38bdf8;letter-spacing:.25em">SAMPLE · NFR</text><text x="180" y="145" text-anchor="middle" style="font:700 12px 'JetBrains Mono',monospace;fill:#818cf8;letter-spacing:.2em">RAAN RANCANG RUANG</text></g>';
const SM=[
{k:'A-101 · SKALA 1:100',t:'Denah & Tata Ruang',d:'Lengkap dengan garis as kolom, dimensi berantai, notasi elevasi lantai (±0.00), dan kode kusen.',svg:`<svg viewBox="0 0 360 240" class="w-full h-auto block bg-[#0a0f18]"><rect x="45" y="32" width="270" height="176" fill="none" stroke="#e2e8f0" stroke-width="3"/><path d="M45 120H180M180 32V208M180 95H315M245 95V208" fill="none" stroke="#e2e8f0" stroke-width="2"/><path d="M90 32H145M210 32H275M45 65V105" fill="none" stroke="#38bdf8" stroke-width="2.5"/><path d="M45 20H315M45 16V24M180 16V24M315 16V24M330 32V208M326 32H334M326 208H334" fill="none" stroke="#818cf8" stroke-width=".8"/><text class="ax" x="112" y="14">6.00</text><text class="ax" x="248" y="14">6.00</text><text class="lb" x="112" y="75">R. TAMU ±0.00</text><text class="lb" x="112" y="165">CARPORT -0.15</text><text class="lb" x="248" y="65">DAPUR ±0.00</text><text class="lb" x="212" y="155">TANGGA</text><text class="lb" x="280" y="155">KM -0.05</text>${WM}</svg>`},
{k:'A-201 · SKALA 1:100',t:'Potongan Arsitektur A–A',d:'Menunjukkan ketinggian peil lantai, struktur sloof-kolom-ring balok, rangka atap, dan kemiringan penutup atap.',svg:`<svg viewBox="0 0 360 240" class="w-full h-auto block bg-[#0a0f18]"><line x1="20" y1="196" x2="340" y2="196" stroke="#64748b" stroke-width="1.5"/><rect x="55" y="132" width="250" height="64" fill="none" stroke="#e2e8f0" stroke-width="2.2"/><line x1="55" y1="132" x2="305" y2="132" stroke="#38bdf8" stroke-width="2.5"/><path d="M35 132L180 58L325 132" fill="none" stroke="#e2e8f0" stroke-width="2.5"/><path d="M180 58V132M115 95V132M245 95V132M115 132L180 95L245 132" fill="none" stroke="#818cf8" stroke-width="1"/><path d="M180 132V196M110 155H155V196H110Z" fill="none" stroke="#94a3b8" stroke-width="1.2"/><text class="ax" x="325" y="193">+0.00</text><text class="ax" x="325" y="130">+3.80</text><text class="ax" x="180" y="48">+7.20</text><text class="lb" x="180" y="118">KUDA-KUDA BAJA RINGAN</text>${WM}</svg>`},
{k:'A-301 · SKALA 1:20',t:'Detail Kusen Pintu & Jendela',d:'Tampak depan dan potongan profil kusen aluminium/kayu lengkap dengan spesifikasi kaca, engsel, dan handle.',svg:`<svg viewBox="0 0 360 240" class="w-full h-auto block bg-[#0a0f18]"><rect x="45" y="34" width="110" height="172" fill="none" stroke="#e2e8f0" stroke-width="2.2"/><rect x="52" y="41" width="52" height="165" fill="none" stroke="#38bdf8" stroke-width="1.2"/><rect x="108" y="41" width="40" height="105" fill="none" stroke="#818cf8" stroke-width="1.2"/><path d="M52 124L104 41M52 124L104 206" fill="none" stroke="#38bdf8" stroke-width=".7" stroke-dasharray="3 3"/><rect x="205" y="34" width="110" height="172" fill="none" stroke="#e2e8f0" stroke-width="2.2"/><line x1="260" y1="34" x2="260" y2="206" stroke="#38bdf8" stroke-width="1.2"/><line x1="205" y1="120" x2="315" y2="120" stroke="#38bdf8" stroke-width="1.2"/><text class="ax" x="100" y="24">PJ-01 (1500×2400)</text><text class="ax" x="260" y="24">J-02 (1500×2400)</text><text class="lb" x="100" y="224">KUSEN ALUM. 4" + KACA 6MM</text><text class="lb" x="260" y="224">JENDELA CASEMENT</text>${WM}</svg>`},
{k:'M-401 · STANDAR SNI',t:'Skema Proteksi Kebakaran & CCTV',d:'Jalur pipa hydrant Ø65, titik APAR, sprinkler, serta sudut jangkauan kamera CCTV untuk kelengkapan PBG & SLF.',svg:`<svg viewBox="0 0 360 240" class="w-full h-auto block bg-[#0a0f18]"><rect x="40" y="30" width="280" height="180" fill="none" stroke="#475569" stroke-width="2"/><path d="M180 30V210M40 120H320" fill="none" stroke="#475569" stroke-width="1.2"/><path class="fw" d="M58 195H175V85H285" fill="none" stroke="#f87171" stroke-width="1.8"/><circle cx="58" cy="182" r="9" fill="none" stroke="#f87171" stroke-width="1.5"/><text class="ax r" x="58" y="185">H</text><text class="ax r" x="120" y="188" style="font-size:7.5px">PIPA HYDRANT Ø65</text><path d="M46 36L125 55L90 110Z" fill="#38bdf8" fill-opacity=".16" stroke="#38bdf8" stroke-dasharray="3 3"/><circle cx="46" cy="36" r="4" fill="#38bdf8"/><path d="M314 204L235 185L270 130Z" fill="#38bdf8" fill-opacity=".16" stroke="#38bdf8" stroke-dasharray="3 3"/><circle cx="314" cy="204" r="4" fill="#38bdf8"/><text class="ax" x="102" y="65" style="font-size:7.5px">CCTV-01</text><text class="ax" x="255" y="178" style="font-size:7.5px">CCTV-02</text>${WM}</svg>`}
];
$('#sgrid').innerHTML=SM.map((s,i)=>`<button type="button" data-sm="${i}" class="card group text-left overflow-hidden flex flex-col hover:-translate-y-1.5"><div class="relative border-b border-cy/10 overflow-hidden">${s.svg}<span class="absolute bottom-2 right-2 mono text-[10px] px-2 py-1 rounded bg-ink/90 border border-cy/30 text-cy flex items-center gap-1 opacity-90 group-hover:opacity-100"><i data-lucide="zoom-in" class="w-3 h-3"></i>Zoom</span></div><div class="p-4"><p class="mono text-[10px] text-ind">${s.k}</p><h3 class="font-bold text-base mt-1">${s.t}</h3><p class="text-xs text-slate-400 mt-1.5 line-clamp-2">${s.d}</p></div></button>`).join('');
$$('[data-sm]').forEach(b=>b.onclick=()=>{
 const s=SM[+b.dataset.sm];
 $('#lbxk').textContent=s.k;$('#lbxt').textContent=s.t;$('#lbxd').textContent=s.d;$('#lbxv').innerHTML=s.svg;
 $('#lbxw').href=wa('Halo Raan Rancang Ruang, saya melihat sampel gambar '+s.k+' ('+s.t+') dan ingin konsultasi kebutuhan proyek saya.');
 $('#lbx').classList.replace('hidden','flex');document.body.style.overflow='hidden';lucide.createIcons();
 if(G)gsap.from('#lbxb',{y:30,opacity:0,scale:.96,duration:.35,ease:'back.out(1.4)'});
});

/* ---------- BEFORE / AFTER ---------- */
const bi=$('#bi');let demo;
function setBA(v){bi.value=v;$('#bef').style.clipPath='inset(0 '+(100-v)+'% 0 0)';$('#bh').style.left=v+'%'}
bi.addEventListener('input',e=>{demo&&demo.kill();setBA(e.target.value)});
bi.addEventListener('pointerdown',()=>demo&&demo.kill());

/* ---------- TAB KALKULATOR ---------- */
$$('#ktabs [data-kt]').forEach(b=>b.onclick=()=>{
 const t=b.dataset.kt;
 $$('#ktabs .chip').forEach(x=>x.classList.toggle('on',x===b));
 $('#kp-biaya').classList.toggle('hidden',t!=='biaya');
 $('#kp-kdb').classList.toggle('hidden',t!=='kdb');
});

/* ---------- KALKULATOR BIAYA ---------- */
const PK=[{n:'01 Gambar Kerja Arsitektur / DED',r:45000,sb:10,sf:4,sa:30,db:7,da:25},{n:'02 Dokumen Teknis Perizinan PBG & SLF',r:32000,sb:8,sf:3,sa:40,db:6,da:35},{n:'03 Redraw & Optimasi Denah',r:15000,sb:3,sf:2,sa:60,db:2,da:80}];
const q={p:0},cur={c:0,s:0,d:0},rp=n=>'Rp '+n.toLocaleString('id-ID');
function paint(){const d=Math.round(cur.d);$('#rp').textContent=rp(Math.round(cur.c/1e3)*1e3);$('#rs').textContent='± '+Math.round(cur.s)+' lembar';$('#rd2').textContent=d+'–'+(d+Math.ceil(d*.25))+' hari'}
function calc(now){
 const A=$('#qa'),F=$('#qf'),a=+A.value,f=+F.value,fire=$('#qfire').checked,cctv=$('#qcctv').checked,k=PK[q.p];
 [A,F].forEach(e=>e.style.setProperty('--v',(e.value-e.min)/(e.max-e.min)*100+'%'));
 let c=a*k.r*(1+(f-1)*.08)+(fire?a*8000:0)+(cctv?a*3000:0);
 c=Math.round(Math.max(c,1500000)/50000)*50000;
 const sh=k.sb+f*k.sf+Math.ceil(a/k.sa)+(fire?4+f:0)+(cctv?2+f:0),
 d=k.db+Math.ceil(a/k.da)+f+(fire?2:0)+(cctv?1:0),d2=d+Math.ceil(d*.25);
 $('#qav').textContent=a+' m²';$('#qfv').textContent=f+' lantai';
 $('#rr').textContent='Kisaran '+rp(Math.round(c*.9/10000)*10000)+' – '+rp(Math.round(c*1.1/10000)*10000);
 if(G&&!now){gsap.to(cur,{c,s:sh,d,duration:.7,ease:'power2.out',overwrite:true,onUpdate:paint});gsap.fromTo('#rp',{scale:1.05},{scale:1,duration:.4,clearProps:'transform'})}
 else{Object.assign(cur,{c,s:sh,d});paint()}
 $('#qw').href=wa(['Halo Raan Rancang Ruang, berikut simulasi estimasi proyek saya:','• Paket: '+k.n,'• Luas bangunan: '+a+' m²','• Jumlah lantai: '+f,'• Proteksi kebakaran SNI: '+(fire?'Ya':'Tidak'),'• Layout CCTV: '+(cctv?'Ya':'Tidak'),'• Estimasi biaya: '+rp(c),'• Perkiraan lembar A3: '+sh,'• Durasi kerja: '+d+'–'+d2+' hari kerja','Mohon dikonfirmasi dan dibantu penawaran resminya.'].join('
'));
}
['#qa','#qf','#qfire','#qcctv'].forEach(s=>$(s).addEventListener('input',()=>calc()));
$$('#qp [data-p]').forEach(b=>b.onclick=()=>{q.p=+b.dataset.p;$$('#qp .chip').forEach(x=>x.classList.toggle('on',x===b));calc()});
calc(true);

/* ---------- KALKULATOR KDB / KLB / KDH (PASAL 133-134) ---------- */
let kManual=false;
function ruleKDB(lahan,lantai){
 if(lahan<60)return lantai<=2?[100,2.0,0]:[90,3.6,0];
 if(lahan<=120)return lantai===1?[90,0.9,0]:[80,3.2,10];
 if(lahan<=240)return lantai===1?[80,0.8,10]:[60,2.4,20];
 if(lahan<=400)return lantai===1?[60,0.6,20]:[50,2.0,20];
 return lantai===1?[60,0.6,20]:[40,1.6,20];
}
function calcKDB(autoApply){
 const L=$('#klahan'),F=$('#klantai'),K=$('#kkdb'),B=$('#kklb'),H=$('#kkdh');
 const lahan=+L.value,lantai=+F.value;
 if(autoApply&&!kManual){
  const [rk,rb,rh2]=ruleKDB(lahan,lantai);
  K.value=rk;B.value=rb;H.value=rh2;
 }
 [L,F,K,B,H].forEach(e=>e.style.setProperty('--v',(e.value-e.min)/(e.max-e.min)*100+'%'));
 const kdb=+K.value,klb=+B.value,kdh=+H.value;
 const maxDasar=+(lahan*(kdb/100)).toFixed(1);
 const maxTotal=+(lahan*klb).toFixed(1);
 const minHijau=+(lahan*(kdh/100)).toFixed(1);
 $('#klahanv').textContent=lahan+' m²';
 $('#klantaiv').textContent=lantai+' lantai';
 $('#kkdbv').textContent=kdb+'%';
 $('#kklbv').textContent=klb.toFixed(1);
 $('#kkdhv').textContent=kdh+'%';
 $('#ktot').textContent=maxTotal.toLocaleString('id-ID')+' m²';
 $('#ksub').textContent='Lahan '+lahan+' m² × KLB '+klb.toFixed(1)+' ('+lantai+' lantai)';
 $('#kdasar').textContent=maxDasar.toLocaleString('id-ID')+' m²';
 $('#khijau').textContent=minHijau.toLocaleString('id-ID')+' m²';
 $('#kbadge').textContent=kManual?'CUSTOM KRK':'AUTO · PASAL 133–134';
 $('#kwa').href=wa(['Halo Raan Rancang Ruang, berikut simulasi KDB/KLB proyek PBG saya:','• Luas lahan: '+lahan+' m²','• Rencana jumlah lantai: '+lantai+' lantai','• KDB Maksimal: '+kdb+'% ('+maxDasar+' m²)','• KLB Maksimal: '+klb.toFixed(1)+' (Total '+maxTotal+' m²)','• KDH Minimal: '+kdh+'% ('+minHijau+' m²)','Mohon dibantu konsultasi dokumen teknis PBG-nya.'].join('
'));
}
['#klahan','#klantai'].forEach(s=>$(s).addEventListener('input',()=>calcKDB(true)));
['#kkdb','#kklb','#kkdh'].forEach(s=>$(s).addEventListener('input',()=>{kManual=true;calcKDB(false)}));
$('#kreset').onclick=()=>{kManual=false;calcKDB(true)};
calcKDB(true);

/* ---------- FAQ ACCORDION ---------- */
const FQ=[
['Berapa jatah revisi gambar?','Setiap paket sudah termasuk 2 putaran revisi minor, yaitu perubahan tata letak, dimensi, atau notasi yang masih sesuai brief awal. Perubahan konsep besar atau penambahan ruang lingkup dihitung sebagai pekerjaan tambahan dengan penawaran terpisah. Setiap putaran revisi kami kerjakan maksimal 2 hari kerja.'],
['Format file apa yang bisa dikirim dan diterima?','Anda bisa mengirim DWG (AutoCAD 2010 ke atas), DXF, PDF, atau foto dan scan sketsa tangan. Hasil akhir berupa file master DWG yang rapi lengkap dengan CTB (plot style) standar, serta PDF siap plot ukuran A3 dengan skala dan ketebalan garis yang sudah diatur.'],
['Apa saja kelengkapan teknis untuk PBG dan SLF?','Paket 02 memuat perhitungan intensitas bangunan (KDB, KLB, KDH, dan GSB), site plan, gambar utilitas dan sanitasi, skema proteksi kebakaran dan hydrant sesuai SNI, serta layout titik CCTV. Seluruh gambar disusun agar siap diunggah ke proses pengajuan. Verifikasi dan penerbitan tetap menjadi kewenangan instansi terkait.'],
['Bagaimana sistem pembayarannya?','Pembayaran dibagi bertahap: DP 40% saat lingkup pekerjaan disepakati, 40% saat draft gambar disetujui, dan pelunasan 20% sebelum file master final diserahkan. Rincian termin dan jadwal tertulis jelas di penawaran sebelum pekerjaan dimulai.']];
$('#fq').innerHTML=FQ.map((f,i)=>`<div class="card"><button class="fq w-full flex items-center justify-between gap-4 p-5 text-left font-semibold" aria-expanded="false" aria-controls="fa${i}"><span class="flex items-center gap-3"><b class="mono text-cy text-xs">0${i+1}</b><span>${f[0]}</span></span><i data-lucide="chevron-down" class="w-5 h-5 text-cy shrink-0"></i></button><div id="fa${i}" class="ac" role="region"><div class="overflow-hidden"><p class="px-5 pb-5 text-sm text-slate-400 leading-relaxed">${f[1]}</p></div></div></div>`).join('');
$$('.fq').forEach(b=>b.onclick=()=>{
 const open=b.getAttribute('aria-expanded')==='true';
 $$('.fq').forEach(x=>{x.setAttribute('aria-expanded','false');x.nextElementSibling.classList.remove('open')});
 if(!open){b.setAttribute('aria-expanded','true');b.nextElementSibling.classList.add('open')}
});
$$('.fq')[0].click();

/* ---------- INIT + GSAP ---------- */
render();lucide.createIcons();
if(G){
 gsap.registerPlugin(ScrollTrigger);
 gsap.to('#pg',{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.3}});
 gsap.from('.aur',{opacity:0,duration:2});
 gsap.timeline({defaults:{ease:'power3.out'}})
  .from('.ln-i',{yPercent:110,duration:1,stagger:.15})
  .from('.hi',{y:26,opacity:0,duration:.8,stagger:.1,clearProps:'all'},'-=.7')
  .fromTo('#wl>*',{strokeDasharray:'1 1',strokeDashoffset:1},{strokeDashoffset:0,duration:1.6,stagger:.2,ease:'power2.inOut',clearProps:'strokeDasharray,strokeDashoffset'},'-=.9')
  .from('#cad g[data-l]',{opacity:0,duration:.8,stagger:.15,clearProps:'opacity'},'-=.8');
 $('#sc').style.display='';
 gsap.fromTo('#sc',{x:60},{x:540,duration:4,delay:2.5,ease:'none',repeat:-1,repeatDelay:2});
 gsap.from('#sb',{yPercent:100,duration:.6,delay:1.4,ease:'power3.out',clearProps:'transform'});
 gsap.utils.toArray('.rv').forEach(el=>gsap.from(el,{y:40,opacity:0,duration:.8,ease:'power3.out',clearProps:'transform,opacity',scrollTrigger:{trigger:el,start:'top 88%',once:true}}));
 const o={v:50},t=(v,d)=>({v,duration:d,ease:'power2.inOut',onUpdate:()=>setBA(o.v)});
 demo=gsap.timeline({paused:true}).to(o,t(10,1)).to(o,t(90,1.8)).to(o,t(50,1));
 ScrollTrigger.create({trigger:'#ba',start:'top 70%',once:true,onEnter:()=>demo.play()});
 ScrollTrigger.create({trigger:'#kalkulator',start:'top 70%',once:true,onEnter:()=>gsap.from(cur,{c:0,s:0,d:0,duration:1.4,ease:'power2.out',onUpdate:paint})});
 addEventListener('load',()=>ScrollTrigger.refresh());
}
