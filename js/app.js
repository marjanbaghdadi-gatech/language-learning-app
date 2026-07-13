/* ============================================================
   app.js — Application logic for LILLEO's Games
   ------------------------------------------------------------
   Depends on: js/data.js (CATS, STICKERS, STARS_PER_STICKER)
   Sections: state · audio (TTS + chimes) · helpers ·
             home tiles · learn mode · game mode · stickers · wiring
   ============================================================ */

/* ================= STATE ================= */
let stars = 0;
let stickersWon = 0;
let learnCat = 'animals', learnIdx = 0;
let gameCat = 'animals', answer = null, locked = false;
let gameMode = 'match';
let gameModeRounds = 0;
const ROUNDS_PER_GAME_MODE = 3;
const GAME_MODES = ['match','bubble','memory','pronounce'];
let memFlipped = [], memBusy = false, memMatchedPairs = 0, memTotalPairs = 0;
let mediaRecorder = null, micChunks = [], micBlobUrl = null, micStream = null, micState = 'idle', micAutoStopTimer = null;
let currentLevel = 'beginner';
let categoriesOpen = false;

/* ================= AUDIO ================= */
let faVoice = null;
function pickVoice(){
  const vs = speechSynthesis.getVoices();
  faVoice = vs.find(v=>v.lang && v.lang.toLowerCase().startsWith('fa')) || null;
}
if ('speechSynthesis' in window){
  pickVoice();
  speechSynthesis.onvoiceschanged = pickVoice;
}
let currentAudio = null;
function stopAudio(){
  if (currentAudio){ currentAudio.pause(); currentAudio.currentTime = 0; currentAudio = null; }
}
function speak(item){
  stopAudio();
  if (window.speechSynthesis) speechSynthesis.cancel();
  if (item.audio){
    let fellBack = false;
    const fallback = () => { if (fellBack) return; fellBack = true; speakTTS(item); };
    const a = new Audio(item.audio);
    currentAudio = a;
    a.addEventListener('error', fallback);
    a.play().catch(fallback);
    return;
  }
  speakTTS(item);
}
function speakTTS(item){
  if(!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(item.fa);
  u.lang = 'fa-IR';
  if (faVoice) u.voice = faVoice;
  else { u.text = item.tl.replace(/â/g,'aa'); u.lang = 'en-US'; } // fallback: say transliteration
  u.rate = 0.82; u.pitch = 1.15;
  speechSynthesis.speak(u);
}

let actx = null;
function tone(freqs, dur=0.12, type='sine', gainV=0.15){
  try{
    actx = actx || new (window.AudioContext||window.webkitAudioContext)();
    let t = actx.currentTime;
    freqs.forEach(f=>{
      const o=actx.createOscillator(), g=actx.createGain();
      o.type=type; o.frequency.value=f;
      g.gain.setValueAtTime(gainV,t); g.gain.exponentialRampToValueAtTime(0.001,t+dur);
      o.connect(g); g.connect(actx.destination);
      o.start(t); o.stop(t+dur);
      t += dur*0.85;
    });
  }catch(e){}
}
const dingYes = ()=>tone([523,659,784,1047],0.14,'triangle');
const dingNo  = ()=>tone([220,185],0.18,'sawtooth',0.06);
const dingStar= ()=>tone([784,988,1175,1568],0.13,'triangle');

/* ================= HELPERS ================= */
const $ = id=>document.getElementById(id);
function renderVisual(container, it, swatchClass){
  container.innerHTML='';
  container.classList.remove('fa');
  const showFallback = () => {
    if (it.swatch){
      const d=document.createElement('div');
      d.className=swatchClass;
      d.style.background=it.swatch;
      container.appendChild(d);
    } else {
      container.classList.add('fa');
      container.textContent=it.emoji;
    }
  };
  if (it.image){
    const img=document.createElement('img');
    img.className='item-img';
    img.alt=it.en;
    img.src=it.image;
    img.onerror=()=>{ img.remove(); showFallback(); };
    container.appendChild(img);
    return;
  }
  showFallback();
}
function show(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  $(id).classList.add('active');
  stopAudio();
  if(window.speechSynthesis) speechSynthesis.cancel();
  stopMicIfActive();
}
function shuffle(a){ a=[...a]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }

function confettiBurst(n=16){
  const box = $('confetti');
  const bits = ['⭐','🌟','✨','🎈','🌷'];
  for(let i=0;i<n;i++){
    const s=document.createElement('span');
    s.className='cf';
    s.textContent=bits[Math.floor(Math.random()*bits.length)];
    s.style.left=Math.random()*100+'vw';
    s.style.animationDelay=(Math.random()*0.25)+'s';
    s.style.fontSize=(1.1+Math.random()*1.2)+'rem';
    box.appendChild(s);
    setTimeout(()=>s.remove(),1800);
  }
}

function addStar(){
  stars++;
  $('starCount').textContent = stars;
  const pill=$('starPill'); pill.classList.remove('pop'); void pill.offsetWidth; pill.classList.add('pop');
  const shouldHave = Math.min(STICKERS.length, Math.floor(stars/STARS_PER_STICKER));
  if (shouldHave > stickersWon){
    stickersWon = shouldHave;
    const st = STICKERS[stickersWon-1];
    setTimeout(()=>{
      dingStar();
      $('rEmoji').textContent = st.emoji;
      $('rTitle').textContent = 'New sticker! · آفرین!';
      $('rText').textContent  = `You won the ${st.label} sticker!`;
      $('reward').classList.add('show');
      confettiBurst(26);
    }, 650);
  }
}

/* ================= HOME ================= */
function catsAtLevel(level){
  return Object.entries(CATS).filter(([,c])=>c.level===level);
}
function isLevelReady(key){
  const lvl=LEVELS.find(l=>l.key===key);
  return lvl.ready!==false && catsAtLevel(key).length>0;
}
function buildTiles(){
  const box=$('tiles'); box.innerHTML='';
  catsAtLevel(currentLevel).forEach(([key,c])=>{
    const b=document.createElement('button');
    b.className='tile-btn '+c.tileClass;
    b.innerHTML=`<span class="t-emoji">${c.emoji}</span><span class="t-fa fa">${c.fa}</span><span class="t-en">${c.name}</span>`;
    b.onclick=()=>{ tone([440,554],0.09,'triangle',0.08); openLearn(key); };
    box.appendChild(b);
  });
}

/* ================= LEVELS ================= */
function buildLevelTabs(){
  const box=$('levelTabs'); box.innerHTML='';
  LEVELS.forEach(lvl=>{
    const ready=isLevelReady(lvl.key);
    const b=document.createElement('button');
    b.className='level-tab'+(lvl.key===currentLevel?' active':'')+(ready?'':' locked');
    b.innerHTML=`<span class="lt-badge">${lvl.emoji}</span><span class="lt-label">${lvl.name}</span>`;
    b.onclick=()=>selectLevel(lvl.key);
    box.appendChild(b);
  });
}
function selectLevel(key){
  currentLevel=key;
  tone([440,554],0.09,'triangle',0.08);
  buildLevelTabs();
  buildTiles();
  updateHomeVisibility();
}
function updateHomeVisibility(){
  const lvl=LEVELS.find(l=>l.key===currentLevel);
  const ready=isLevelReady(currentLevel);
  const showCats = ready && categoriesOpen;
  $('tiles').style.display = showCats ? '' : 'none';
  $('subtitle').style.display = showCats ? '' : 'none';
  $('modeRow').style.display = ready ? '' : 'none';
  $('underConstruction').classList.toggle('show', !ready);
  if (!ready) $('ucTitle').textContent = `${lvl.name} · ${lvl.fa} — زیر ساخت 🚧`;
  $('btnLearnAll').classList.toggle('active', showCats);
}

/* ================= LEARN ================= */
function openLearn(cat){
  learnCat=cat; learnIdx=0;
  renderLearn(); show('scrLearn');
  setTimeout(()=>speak(CATS[learnCat].items[learnIdx]),350);
}
function renderLearn(){
  const c=CATS[learnCat], it=c.items[learnIdx];
  $('learnCatLabel').textContent=`${c.emoji} ${c.name} · `;
  const faSpan=document.createElement('span'); faSpan.className='fa'; faSpan.textContent=c.fa;
  $('learnCatLabel').appendChild(faSpan);
  $('learnCard').classList.toggle('sentence-mode', !!c.isSentence);
  renderVisual($('lcEmoji'), it, 'swatch');
  $('lcFa').textContent=it.fa;
  $('lcTl').textContent=it.tl;
  $('lcEn').textContent=it.en;
  $('letterForms').classList.toggle('show', !!it.forms);
  if (it.forms){
    $('lfIsolated').textContent=it.forms.isolated;
    $('lfInitial').textContent=it.forms.initial;
    $('lfMedial').textContent=it.forms.medial;
    $('lfFinal').textContent=it.forms.final;
  }
  const dots=$('dots'); dots.innerHTML='';
  c.items.forEach((_,i)=>{
    const d=document.createElement('span');
    d.className='dot'+(i===learnIdx?' on':''); dots.appendChild(d);
  });
}
function speakCurrent(){
  const card=$('learnCard');
  card.classList.remove('speaking'); void card.offsetWidth; card.classList.add('speaking');
  speak(CATS[learnCat].items[learnIdx]);
}
$('learnCard').onclick=speakCurrent;
$('btnSpeak').onclick=speakCurrent;
$('btnPrev').onclick=()=>{ const n=CATS[learnCat].items.length; learnIdx=(learnIdx-1+n)%n; renderLearn(); speakCurrent(); };
$('btnNext').onclick=()=>{ const n=CATS[learnCat].items.length; learnIdx=(learnIdx+1)%n; renderLearn(); speakCurrent(); };
$('btnLearnToPlay').onclick=()=>openGame(learnCat);

/* ================= GAME ================= */
function pickNextCategory(excludeKey){
  const level=CATS[excludeKey].level;
  const keys=Object.keys(CATS).filter(k=>k!==excludeKey && CATS[k].level===level);
  if (!keys.length) return excludeKey;
  return keys[Math.floor(Math.random()*keys.length)];
}
function openGame(cat){
  gameCat=cat; gameMode='match'; gameModeRounds=0; show('scrGame'); nextRound();
}
function renderChoices(opts){
  const box=$('choices'); box.innerHTML='';
  opts.forEach(it=>{
    const b=document.createElement('button');
    b.className='choice';
    renderVisual(b, it, 'c-swatch');
    b.onclick=()=>pick(b,it);
    box.appendChild(b);
  });
}
function renderBubbles(opts){
  const box=$('bubblePlay'); box.innerHTML='';
  const slots=[3,34,64];
  opts.forEach((it,i)=>{
    const b=document.createElement('div');
    b.className='game-bubble';
    b.style.left=(slots[i]!==undefined?slots[i]:10+i*35)+'%';
    const dur=(10+Math.random()*4).toFixed(1);
    b.style.setProperty('--dur', dur+'s');
    b.style.setProperty('--delay', (-(Math.random()*dur)).toFixed(1)+'s');
    renderVisual(b, it, 'c-swatch');
    b.onclick=()=>pick(b,it);
    box.appendChild(b);
  });
}
function renderMemory(opts){
  const box=$('memoryGrid'); box.innerHTML='';
  memFlipped=[]; memBusy=false; memMatchedPairs=0; memTotalPairs=opts.length;
  let cards=[];
  opts.forEach((it,idx)=>{
    cards.push({it, idx, kind:'pic'});
    cards.push({it, idx, kind:'word'});
  });
  cards=shuffle(cards);
  box.style.gridTemplateColumns = cards.length<=4 ? 'repeat(2,1fr)' : 'repeat(3,1fr)';
  cards.forEach(cardData=>{
    const cardEl=document.createElement('button');
    cardEl.type='button';
    cardEl.className='mem-card';
    const back=document.createElement('span'); back.className='mem-face mem-back'; back.textContent='🐾';
    const front=document.createElement('span'); front.className='mem-face mem-front';
    if (cardData.kind==='pic') renderVisual(front, cardData.it, 'c-swatch');
    else { front.classList.add('fa','mem-word'); front.textContent=cardData.it.fa; }
    cardEl.appendChild(back); cardEl.appendChild(front);
    cardEl.onclick=()=>flipMemCard(cardEl, cardData);
    box.appendChild(cardEl);
  });
}
function flipMemCard(cardEl, cardData){
  if (memBusy || cardEl.classList.contains('revealed') || cardEl.classList.contains('matched')) return;
  cardEl.classList.add('revealed');
  memFlipped.push({cardEl, cardData});
  if (memFlipped.length<2) return;
  memBusy=true;
  const [a,b]=memFlipped;
  const isMatch = a.cardData.idx===b.cardData.idx && a.cardData.kind!==b.cardData.kind;
  if (isMatch){
    dingYes();
    a.cardEl.classList.add('matched'); b.cardEl.classList.add('matched');
    speak(a.cardData.it);
    addStar();
    memMatchedPairs++;
    memFlipped=[]; memBusy=false;
    if (memMatchedPairs>=memTotalPairs){
      $('gameMsg').textContent='Âfarin! آفرین 🎉';
      confettiBurst();
      setTimeout(()=>advanceGameProgress(true),1400);
    }
  } else {
    dingNo();
    a.cardEl.classList.add('mismatch'); b.cardEl.classList.add('mismatch');
    setTimeout(()=>{
      a.cardEl.classList.remove('revealed','mismatch');
      b.cardEl.classList.remove('revealed','mismatch');
      memFlipped=[]; memBusy=false;
    },900);
  }
}
function nextRound(){
  locked=false;
  const c=CATS[gameCat];
  $('gameCatLabel').textContent=`🎮 ${c.name}`;
  $('choices').style.display='none';
  $('bubblePlay').classList.remove('show'); $('bubblePlay').innerHTML='';
  $('memoryGrid').classList.remove('show'); $('memoryGrid').innerHTML='';
  $('pronouncePlay').classList.remove('show');
  stopMicIfActive();
  resetMicUI();
  const pool=shuffle(c.items);
  if (gameMode==='memory'){
    const pairCount = c.level==='beginner' ? 2 : 3;
    const memOpts=shuffle(pool.slice(0,pairCount));
    answer=null;
    $('promptCard').classList.remove('sentence-mode');
    $('pLabel').textContent='Memory · حافظه';
    $('pFa').textContent='جفت‌ها را پیدا کن';
    $('pTl').textContent='jeft-hâ râ peydâ kon · Match the pairs!';
    $('gameMsg').textContent='';
    $('memoryGrid').classList.add('show');
    renderMemory(memOpts);
    return;
  }
  const opts=shuffle(pool.slice(0,3));
  answer=pool[0];
  $('promptCard').classList.toggle('sentence-mode', !!c.isSentence);
  $('pFa').textContent=answer.fa;
  $('pTl').textContent=answer.tl+' · '+answer.en;
  $('gameMsg').textContent='';
  if (gameMode==='pronounce'){
    $('pLabel').textContent='Say it! · تکرار کن';
    $('pronouncePlay').classList.add('show');
  } else {
    $('pLabel').textContent='Find… · پیدا کن';
    if (gameMode==='match'){ $('choices').style.display=''; renderChoices(opts); }
    else { $('bubblePlay').classList.add('show'); renderBubbles(opts); }
  }
  setTimeout(()=>speak(answer),400);
}

/* ---- pronunciation (record & compare) ---- */
function stopMicIfActive(){
  clearTimeout(micAutoStopTimer);
  if (mediaRecorder){
    if (mediaRecorder.state==='recording'){
      mediaRecorder.onstop=null;
      try{ mediaRecorder.stop(); }catch(e){}
    }
    mediaRecorder=null;
  }
  if (micStream){ micStream.getTracks().forEach(t=>t.stop()); micStream=null; }
  micState='idle';
}
function micStarBurst(){
  const host=$('micMascotWrap');
  const bits=['⭐','🌟','✨'];
  const n=8;
  for(let i=0;i<n;i++){
    const s=document.createElement('span');
    s.className='mic-spark';
    s.textContent=bits[Math.floor(Math.random()*bits.length)];
    const angle=(Math.PI*2*i/n)+(Math.random()*0.5-0.25);
    const dist=55+Math.random()*35;
    s.style.setProperty('--dx', Math.cos(angle)*dist+'px');
    s.style.setProperty('--dy', Math.sin(angle)*dist+'px');
    s.style.setProperty('--rot', (Math.random()*70-35)+'deg');
    s.style.animationDelay=(Math.random()*0.12)+'s';
    host.appendChild(s);
    setTimeout(()=>s.remove(),1000);
  }
}
function playMyRecording(){
  if (!micBlobUrl) return;
  const celebrate=()=>{ dingYes(); micStarBurst(); };
  const a=new Audio(micBlobUrl);
  a.addEventListener('ended', celebrate, {once:true});
  a.play().catch(celebrate);
}
function resetMicUI(){
  micState='idle';
  $('micBtn').classList.remove('recording');
  $('micBtn').textContent='Tap to record';
  $('micEmojiBadge').textContent='🎤';
  $('micEmojiBadge').classList.remove('pulse');
  $('micStatus').textContent='Tap the mic and say it! · دکمه را بزن و بگو';
  $('micActions').classList.remove('show');
  $('btnMicRetry').style.display='';
  if (micBlobUrl){ URL.revokeObjectURL(micBlobUrl); micBlobUrl=null; }
  micChunks=[];
}
async function startMicRecording(){
  if (micState==='recording') return;
  if (!navigator.mediaDevices || !window.MediaRecorder){
    $('micStatus').textContent="Recording isn't supported on this browser — tap Next to continue.";
    $('micActions').classList.add('show');
    $('btnMicRetry').style.display='none';
    return;
  }
  try{
    micStream = await navigator.mediaDevices.getUserMedia({audio:true});
  }catch(e){
    $('micStatus').textContent='Mic permission needed · اجازه میکروفون — tap Next to continue.';
    $('micActions').classList.add('show');
    $('btnMicRetry').style.display='none';
    return;
  }
  micChunks=[];
  mediaRecorder = new MediaRecorder(micStream);
  mediaRecorder.ondataavailable = e=>{ if(e.data.size>0) micChunks.push(e.data); };
  mediaRecorder.onstop = ()=>{
    if (micStream){ micStream.getTracks().forEach(t=>t.stop()); micStream=null; }
    if (micState!=='recording') return;
    const blob = new Blob(micChunks, {type:'audio/webm'});
    micBlobUrl = URL.createObjectURL(blob);
    micState='recorded';
    $('micBtn').classList.remove('recording');
    $('micBtn').textContent='Tap to hear it again';
    $('micEmojiBadge').textContent='🔊';
    $('micEmojiBadge').classList.remove('pulse');
    $('micStatus').textContent='Listen to yourself! Tap 🎤 to hear it again · صدای خودت';
    $('micActions').classList.add('show');
    $('btnMicRetry').style.display='';
    playMyRecording();
  };
  mediaRecorder.start();
  micState='recording';
  $('micBtn').classList.add('recording');
  $('micBtn').textContent='Recording… tap to stop';
  $('micEmojiBadge').textContent='⏺️';
  $('micEmojiBadge').classList.add('pulse');
  $('micStatus').textContent='Recording… tap to stop · صدا ضبط می‌شود';
  clearTimeout(micAutoStopTimer);
  micAutoStopTimer=setTimeout(()=>stopMicRecording(),3000);
}
function stopMicRecording(){
  clearTimeout(micAutoStopTimer);
  if (mediaRecorder && mediaRecorder.state==='recording') mediaRecorder.stop();
}
$('micBtn').onclick=()=>{
  if (micState==='idle') startMicRecording();
  else if (micState==='recording') stopMicRecording();
  else playMyRecording();
};
$('btnMicRetry').onclick=()=>resetMicUI();
$('btnMicNext').onclick=()=>{
  dingYes(); confettiBurst();
  $('gameMsg').textContent='Âfarin! آفرین 🎉';
  addStar();
  setTimeout(()=>advanceGameProgress(false),1200);
};
function nextGameMode(m){ return GAME_MODES[(GAME_MODES.indexOf(m)+1)%GAME_MODES.length]; }
function advanceGameProgress(forceSwitch){
  gameCat=pickNextCategory(gameCat);
  if (forceSwitch){
    gameMode=nextGameMode(gameMode); gameModeRounds=0;
  } else {
    gameModeRounds++;
    if (gameModeRounds>=ROUNDS_PER_GAME_MODE){ gameMode=nextGameMode(gameMode); gameModeRounds=0; }
  }
  nextRound();
}
function pick(btn,it){
  if(locked) return;
  if(it===answer){
    locked=true;
    btn.classList.add('right');
    dingYes(); confettiBurst();
    $('gameMsg').textContent='Âfarin! آفرین 🎉';
    addStar();
    setTimeout(()=>advanceGameProgress(false),1400);
  } else {
    btn.classList.add('wrong');
    dingNo();
    $('gameMsg').textContent='Try again! دوباره 💪';
    setTimeout(()=>btn.classList.remove('wrong'),450);
    setTimeout(()=>speak(answer),500);
  }
}
$('promptCard').onclick=()=>answer&&speak(answer);

/* ================= STICKERS ================= */
function renderStickers(){
  const g=$('stickerGrid'); g.innerHTML='';
  STICKERS.forEach((s,i)=>{
    const d=document.createElement('div');
    const won=i<stickersWon;
    d.className='sticker '+(won?'won':'locked');
    d.innerHTML=`<span>${s.emoji}</span>`;
    g.appendChild(d);
  });
  const need = STARS_PER_STICKER - (stars % STARS_PER_STICKER);
  $('stickerNote').textContent = stickersWon>=STICKERS.length
    ? 'You collected them all! تو یک قهرمانی! 🏆'
    : `⭐ ${stars} stars · ${need} more star${need===1?'':'s'} for the next sticker!`;
}

/* ================= WIRING ================= */
$('btnHome').onclick=()=>show('scrHome');
$('starPill').onclick=()=>{ renderStickers(); show('scrStickers'); };
$('btnLearnAll').onclick=()=>{
  categoriesOpen=!categoriesOpen;
  tone([440,554],0.09,'triangle',0.08);
  updateHomeVisibility();
};
$('btnPlayAll').onclick=()=>{
  const keys=catsAtLevel(currentLevel).map(([key])=>key);
  openGame(keys[Math.floor(Math.random()*keys.length)]);
};
$('rBtn').onclick=()=>$('reward').classList.remove('show');
$('mascotHome').onclick=()=>{ speak({fa:'سلام', tl:'salâm'}); tone([523,659],0.1,'triangle',0.08); };

buildTiles();
buildLevelTabs();
updateHomeVisibility();
