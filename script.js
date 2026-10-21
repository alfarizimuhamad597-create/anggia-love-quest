/* ===== EDIT DI SINI ===== */
const CONFIG = {
  name: "Anggia", nick: "Sayang",
  birthday: "2026-10-22T00:00:00+07:00", // WIB
  spotifyUrl: "https://open.spotify.com/track/1NzyVlr2fOWOfigbwDabme?si=1GNtWADJSzGQC5uVUDPEkQ&utm_source=copy-link",
  spotifyId: "1NzyVlr2fOWOfigbwDabme",
  photos: [ // file: assets/images/foto-1.jpg dst.
    {src:"assets/images/foto-1.jpg", cap:"Kita 💗"},
    {src:"assets/images/foto-2.jpg", cap:"Senyum favoritku"},
    {src:"assets/images/foto-3.jpg", cap:"Gemes banget"},
    {src:"assets/images/foto-4.jpg", cap:"Masih mau lagi 🥹"}],
  quiz: [
    {q:"Kalau aku bilang “kangen”, jawabanmu?", a:[["Aku juga 🥺","Aaa, jawaban paling manis. Aku meleleh 🫠"],["Ya udah ke sini 😤","Siap, Tuan Putri. Meluncur! 🛵💨"],["Kirim foto dulu 😏","Tenang, aku siap. Tapi aku bakal ikut kangen foto kamu juga 😳"]]},
    {q:"Hadiah ulang tahun paling enak itu…", a:[["Dipeluk lama 🤗","Noted. Pelukan lama sudah masuk daftar 📝"],["Ditraktir makan 🍜","Nah ini. Perut senang, hati juga 😋"],["Diucapin terus 🎉","Oke, aku ucapin sampai suaraku habis. Happy birthday! Happy birthday!"]]},
    {q:"Siapa yang paling gemes hari ini?", a:[["Aku dong 😎","Setuju. Tidak ada perdebatan."],["Kamu 🥰","Aduh, jangan gitu, nanti aku salting 🙈"],["Dua-duanya 😆","Jawaban aman, tapi aku suka 😌"]]},
    {q:"Kalau lagi ngambek, cara bujuknya…", a:[["Coklat 🍫","Catat: stok coklat selalu siaga 🍫"],["Pelukan 🫂","Pelukan datang! Sini, sini."],["Chat “maaf” 100x 😭","Siap, siap. Jari ini kuat kok 💪"]]}],
  letter: {
    greet: "Happy birthday, Sayanggg! 🎂💗",
    wish: "Semoga hari ini kamu banyak senyum, banyak tawa, dan semua hal baik datang ke kamu.",
    like: "Aku suka cara kamu bikin hari-hariku terasa lebih ringan. Kalau ada lomba bikin aku kangen, kamu juara dunia deh. Protes? Nggak bisa, aku juri sekaligus pesertanya 😭💗",
    memory: "", // ISI SENDIRI: kenangan spesial kalian. Kosongkan kalau belum mau tampil.
    thanks: "Makasih ya sudah hadir dan jadi kamu. Itu hadiah terbesar buat aku.",
    sign: "— Pacarmu 💗"},
  gifts: [
    {e:"🤗", t:"Voucher Pelukan", d:"Berlaku untuk 1x pelukan erat, kapan pun kamu minta. Tanpa syarat, tanpa batas waktu."},
    {e:"🍜", t:"Voucher Traktiran", d:"1x traktiran makanan favoritmu. Tinggal sebut mau apa. (Syarat: senyum dulu 😆)"},
    {e:"🤫", t:"Pesan Rahasia", d:"Kamu tuh alasan aku senyum-senyum sendiri sambil lihat HP 🙈"},
    {e:"🎂", t:"Hadiah Utama", d:"Ada satu kejutan terakhir buat kamu…", main:true}],
  finalMsg: "Sayang, makasih sudah main sampai akhir. Hadiah ini kecil, tapi semua dibuat sepenuh hati. Semoga umur barumu penuh bahagia, dan aku boleh terus ada di sisimu. Aku sayang kamu 💗",
  gameTargets: {catch:12, bombs:10}
};
/* ===== KODE ===== */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const rnd=(a,b)=>a+Math.random()*(b-a);
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const TOTAL=6;let cur=1;
$$('.nick').forEach(e=>e.textContent=CONFIG.nick);$$('.rname').forEach(e=>e.textContent=CONFIG.name);
$('#dots').innerHTML='<i></i>'.repeat(TOTAL);
function go(n,push=true){
  n=Math.max(1,Math.min(TOTAL,n));cur=n;
  $$('.scene').forEach(s=>s.classList.toggle('active',+s.dataset.s===n));
  $$('#dots i').forEach((d,i)=>{d.className=i+1===n?'on':i+1<n?'done':''});
  $('#back').style.visibility=n===1?'hidden':'visible';
  if(push)history.pushState({n},'','#'+n);
  scrollTo(0,0);stopGames();(enter[n]||(()=>{}))();
}
history.replaceState({n:1},'','#1');
addEventListener('popstate',e=>go((e.state&&e.state.n)||1,false));
$('#back').onclick=()=>history.length>1?history.back():go(cur-1);
$$('.next').forEach(b=>b.onclick=()=>go(cur+1));
/* floating hearts */
if(!reduce){const h=$('#hearts');for(let i=0;i<12;i++){const s=document.createElement('span');s.textContent=['💗','💕','🌸','✨','💖'][i%5];s.style.left=rnd(0,95)+'%';s.style.fontSize=rnd(16,30)+'px';s.style.animationDuration=rnd(11,20)+'s';s.style.animationDelay=-rnd(0,18)+'s';h.append(s)}}
function burst(el,x,y,em=['💗','✨','💖']){if(reduce)return;for(let i=0;i<6;i++){const f=document.createElement('span');f.className='fx';f.textContent=em[i%em.length];f.style.left=x+'px';f.style.top=y+'px';f.style.setProperty('--dx',rnd(-50,50)+'px');f.style.setProperty('--dy',rnd(-60,-10)+'px');el.append(f);setTimeout(()=>f.remove(),750)}}
/* confetti */
const cv=$('#confetti'),cx=cv.getContext('2d');let parts=[],raf=0;
function confetti(){if(reduce)return;cv.width=innerWidth;cv.height=innerHeight;const c=['#ffc2d1','#d6284f','#7a1f3d','#d98fa3','#fff6ec','#ff8fab'];
  parts=Array.from({length:110},()=>({x:rnd(0,cv.width),y:rnd(-cv.height,0),w:rnd(6,11),v:rnd(2,4.5),r:rnd(0,6),s:rnd(-.1,.1),c:c[Math.floor(rnd(0,6))],h:Math.random()<.3}));
  const end=Date.now()+4500;cancelAnimationFrame(raf);
  (function f(){cx.clearRect(0,0,cv.width,cv.height);parts.forEach(p=>{p.y+=p.v;p.r+=p.s;p.x+=Math.sin(p.r);cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;if(p.h){cx.font='16px sans-serif';cx.fillText('💗',0,0)}else cx.fillRect(0,0,p.w,p.w*.6);cx.restore()});
    if(Date.now()<end)raf=requestAnimationFrame(f);else cx.clearRect(0,0,cv.width,cv.height)})()}
/* countdown (WIB) */
const T=new Date(CONFIG.birthday);
function tick(){const d=T-Date.now(),e=$('#cd');if(d<=0){e.textContent='🎂 Hari ini hari spesialmu, '+CONFIG.nick+'!';return}
  const p=n=>String(n).padStart(2,'0');e.textContent='⏳ '+Math.floor(d/864e5)+'h '+p(Math.floor(d/36e5)%24)+'j '+p(Math.floor(d/6e4)%60)+'m '+p(Math.floor(d/1e3)%60)+'d menuju hari spesialmu'}
tick();setInterval(tick,1000);
/* music (Audio Lokal) */
const audio = $('#bgAudio');

function openMusic() {
  const m = $('#music');
  m.hidden = false;
  if (audio) {
    audio.play();
  }
}

function closeMusic() {
  const m = $('#music');
  m.hidden = true;
  if (audio) {
    audio.pause();
  }
}

$('#musicBtn').onclick = () => $('#music').hidden ? openMusic() : closeMusic();
$('#musicClose').onclick = closeMusic;
$$('[data-music]').forEach(b => b.onclick = openMusic);

/* scene 1 */
$('#openGift').onclick=()=>{$('#env').classList.add('open');$('#openGift').disabled=true;burst($('#env'),125,40,['💗','🌸','✨']);setTimeout(()=>{go(2);$("#env").classList.remove("open");$("#openGift").disabled=false},1400)};
/* scene 2: games */
let G={t:[],raf:0,paused:false};
function stopGames(){G.t.forEach(clearInterval);G.t=[];cancelAnimationFrame(G.raf);G.live=false}
function over(box,html){box.innerHTML=html}
function initArcade(){stopGames();$('#g1').hidden=false;$('#g2').hidden=true;startG1(true)}
function startG1(first){
  const area=$('#g1area'),box=$('#g1msg'),T=CONFIG.gameTargets.catch;let sc=0,tm=20;
  $('#g1t').textContent=T;const upd=()=>{$('#g1s').textContent=sc;$('#g1tm').textContent=tm;$('#g1p').style.width=Math.min(100,sc/T*100)+'%'};upd();
  $$('.ht',area).forEach(e=>e.remove());
  box.innerHTML=`<div>Ketuk ${T} hati dalam 20 detik 💗</div><button class="btn" id="g1go">Mulai</button>`;
  $('#g1go').onclick=()=>{box.innerHTML='';sc=0;tm=20;upd();G.live=true;
    const end=w=>{stopGames();$$('.ht',area).forEach(e=>e.remove());
      box.innerHTML=w?`<div style="font-size:3rem">🥳</div><div>Waduh, semua hati kamu ambil. Hati aku juga sekalian, ya? 😳💗</div><button class="btn" id="g1n">Game berikutnya</button>`:`<div>Hampir! Hati-hatinya licin banget 🥹</div><button class="btn" id="g1r">Ulangi</button>`;
      if(w){confetti();$('#g1n').onclick=()=>{$('#g1').hidden=true;$('#g2').hidden=false;startG2()}}else $('#g1r').onclick=()=>startG1()};
    const spawn=()=>{const h=document.createElement('button');h.className='ht';h.setAttribute('aria-label','hati');h.textContent=['💗','💖','💕'][Math.floor(rnd(0,3))];h.style.left=rnd(2,calc(area,56))+'px';h.style.top=rnd(2,area.clientHeight-60)+'px';
      h.onpointerdown=e=>{e.preventDefault();if(!G.live)return;sc++;upd();burst(area,h.offsetLeft+28,h.offsetTop+20);h.remove();if(sc>=T)end(true)};area.append(h);setTimeout(()=>h.remove(),1500)};
    G.t.push(setInterval(()=>{tm--;upd();if(tm<=0)end(false)},1000),setInterval(spawn,600));spawn()}}
const calc=(a,s)=>a.clientWidth-s-2;
function startG2(){
  const area=$('#g2area'),box=$('#g2msg'),T=CONFIG.gameTargets.bombs;let sc,lives,items,px,last,sp;
  $('#g2t').textContent=T;box.innerHTML=`<div>Geser jempol untuk gerakkan keranjang 🧺<br>Tangkap ${T} 💗, hindari 💣 (nyawa 3)</div><button class="btn" id="g2go">Mulai</button>`;
  $('#g2pause').onclick=()=>{if(!G.live&&!G.paused)return;G.paused=!G.paused;$('#g2pause').textContent=G.paused?'▶ Lanjut':'⏸ Jeda';if(!G.paused){last=performance.now();G.raf=requestAnimationFrame(loop)}else cancelAnimationFrame(G.raf)};
  $('#g2go').onclick=()=>{box.innerHTML='';area.innerHTML='';area.append(box);sc=0;lives=3;items=[];G.paused=false;G.live=true;
    const pl=document.createElement('div');pl.id='pl';pl.textContent='🧺';area.append(pl);px=area.clientWidth/2-22;
    const mv=e=>{const r=area.getBoundingClientRect();px=Math.max(0,Math.min(area.clientWidth-44,e.clientX-r.left-22))};
    area.onpointerdown=area.onpointermove=mv;
    const upd=()=>{$('#g2s').textContent=sc;$('#g2l').textContent='❤️'.repeat(lives)+'🖤'.repeat(3-lives);$('#g2p').style.width=sc/T*100+'%'};upd();
    const end=w=>{G.live=false;stopGames();box.innerHTML=w?`<div style="font-size:3rem">🏆</div><div>Menang! Kamu jago banget, Sayang 💗</div><button class="btn" id="g2n">Lanjut petualangan 💗</button>`:`<div>Yah, kena bom 💣 Coba lagi, ya!</div><button class="btn" id="g2r">Ulangi</button>`;
      if(w){confetti();$('#g2n').onclick=()=>go(3)}else $('#g2r').onclick=startG2};
    sp=0;last=performance.now();
    function loop(now){if(G.paused)return;const dt=Math.min(.05,(now-last)/1e3);last=now;sp+=dt;
      if(sp>.85){sp=0;const bomb=Math.random()<.3,el=document.createElement('div');el.className='item';el.textContent=bomb?'💣':'💗';area.append(el);items.push({el,b:bomb,x:rnd(0,area.clientWidth-36),y:-40})}
      const H=area.clientHeight;
      items=items.filter(i=>{i.y+=120*dt;i.el.style.transform=`translate(${i.x}px,${i.y}px)`;
        if(i.y>H-56&&i.y<H-10&&Math.abs(i.x-px+4)<44){i.el.remove();if(i.b){lives--;area.classList.add('shake');setTimeout(()=>area.classList.remove('shake'),350)}else{sc++;burst(area,i.x+16,H-50)}upd();if(sc>=T)end(true);else if(lives<=0)end(false);return false}
        if(i.y>H){i.el.remove();return false}return true});
      pl.style.transform=`translateX(${px}px)`;if(G.live)G.raf=requestAnimationFrame(loop)}
    G.raf=requestAnimationFrame(loop)}}
/* scene 3: gallery */
const gal=$('#gallery'),lb=$('#lightbox');
CONFIG.photos.forEach(p=>{const b=document.createElement('button');b.className='pol';const img=new Image();img.alt=p.cap;img.loading='lazy';img.src=p.src;
  const ph=()=>{const d=document.createElement('div');d.className='ph';d.textContent='💗';img.replaceWith(d)};img.onerror=ph;
  b.append(img);b.insertAdjacentHTML('beforeend',`<small>${p.cap}</small>`);
  b.onclick=()=>{const f=$('figure',lb);$('img,.ph',f).remove();const c=img.isConnected&&!img.error&&img.naturalWidth?img.cloneNode():Object.assign(document.createElement('div'),{className:'ph',textContent:'💗'});f.prepend(c);$('figcaption',f).textContent=p.cap;lb.hidden=false};gal.append(b)});
lb.onclick=()=>lb.hidden=true;
/* scene 4: quiz + letter */
let qi=0;
function showQ(){const q=CONFIG.quiz[qi],card=$('#quiz');$('#qn').textContent=`Pertanyaan ${qi+1} dari ${CONFIG.quiz.length}`;
  card.innerHTML=`<b>${q.q}</b>`;q.a.forEach(([t,r])=>{const o=document.createElement('button');o.className='opt';o.textContent=t;o.onclick=()=>{$$('.opt',card).forEach(x=>x.disabled=true);o.classList.add('sel');card.insertAdjacentHTML('beforeend',`<p class="resp">${r}</p>`);const n=document.createElement('button');n.className='btn';n.style.marginTop='10px';n.textContent=qi<CONFIG.quiz.length-1?'Lanjut':'Selesai 💌';n.onclick=()=>{if(qi<CONFIG.quiz.length-1){qi++;showQ()}else{$('#quizPart').hidden=true;$('#letterPart').hidden=false;scrollTo(0,0)}};card.append(n)};card.append(o)})}
function openLetter(){const L=CONFIG.letter,el=$('#letter');if(!el.hidden)return;$('#lenv').classList.add('open');$('#letterHint').hidden=true;
  setTimeout(()=>{$('#lenv').hidden=true;el.hidden=false;const lines=[L.greet,L.wish,L.like,L.memory,L.thanks].filter(Boolean);
    el.innerHTML=lines.map((t,i)=>`<p style="animation-delay:${i*.9}s">${t}</p>`).join('')+`<p class="sign" style="animation-delay:${lines.length*.9}s">${L.sign}</p>`;confetti();
    setTimeout(()=>{$('#toGifts').hidden=false},lines.length*900+600)},1300)}
$('#lenv').onclick=openLetter;$('#lenv').onkeydown=e=>{if(e.key==='Enter'||e.key===' ')openLetter()};
$('#toGifts').onclick=()=>go(5);
/* scene 5: gifts */
const gf=$('#gifts'),md=$('#modal');
CONFIG.gifts.forEach(g=>{const b=document.createElement('button');b.className='gift';b.innerHTML=`<div class="box"><div class="lid"></div><span class="st">${g.main?'⭐':'💖'}</span></div>${g.main?'Hadiah Utama':'Kotak Misteri'}`;
  b.onclick=()=>{b.classList.add('open');setTimeout(()=>{$('#modalBody').innerHTML=`<div class="em">${g.e}</div><h3 class="script">${g.t}</h3><p>${g.d}</p>`;md.hidden=false;confetti();$('#modalClose').dataset.main=g.main?1:''},450)};gf.append(b)});
$('#modalClose').onclick=e=>{md.hidden=true;if(e.target.dataset.main)go(6)};
/* scene 6 */
const fm=$('#finalMsg');fm.textContent=CONFIG.finalMsg;
$('#openLast').onclick=()=>{fm.hidden=!fm.hidden;$('#openLast').textContent=fm.hidden?'Buka pesan terakhir 💌':'Tutup pesan 💌';if(!fm.hidden){confetti();fm.scrollIntoView({behavior:'smooth',block:'center'})}};
$('#again').onclick=()=>{qi=0;showQ();$('#quizPart').hidden=false;$('#letterPart').hidden=true;$('#letter').hidden=true;$('#lenv').hidden=false;$('#lenv').classList.remove('open');$('#letterHint').hidden=false;$('#toGifts').hidden=true;$$('.gift').forEach(g=>g.classList.remove('open'));fm.hidden=true;$('#openLast').textContent='Buka pesan terakhir 💌';go(1)};
const enter={2:initArcade,6:()=>{confetti()}};
showQ();$('#back').style.visibility='hidden';go(1,false);
