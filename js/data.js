/* ============================================================
   data.js — Content layer for Pashmak's Persian Playground
   ------------------------------------------------------------
   All vocabulary, categories, and sticker rewards live here.
   To add words or categories, edit ONLY this file — no logic
   changes needed. app.js reads CATS / STICKERS / STARS_PER_STICKER
   as globals (loaded before app.js in index.html).

   Item shape:
     { emoji:'🐱', fa:'گربه', tl:'gorbeh', en:'cat', image:'images/animals/cat.jpg', audio:'audio/animals/cat.m4a' }
   Colors use `swatch:'#hex'` instead of `emoji`.
   `image` points to an optional real photo/illustration. If missing
   or fails to load, app.js falls back to `swatch` (colors) or `emoji`
   (everything else).
   `audio` points to a recorded pronunciation file. If it's missing,
   app.js automatically falls back to speech synthesis.
   ============================================================ */

/* ================= LEVELS ================= */
/* A level is "ready" (has real content) whenever at least one category
   in CATS below is tagged with that level key — checked dynamically in
   app.js, so adding a category to a level is enough to light it up. */
const LEVELS = [
  { key:'beginner',     name:'Beginner',     fa:'مبتدی',    emoji:'🌱' },
  { key:'intermediate', name:'Intermediate', fa:'متوسط',    emoji:'🌿' },
  { key:'advanced',     name:'Advanced',     fa:'پیشرفته',  emoji:'🌳' }
];

/* Persian letters take different shapes depending on position in a word.
   A tatweel (ـ, U+0640) forces the browser's Arabic-script shaping to
   render the correct joined form on either side of the base letter. */
function formsOf(ch){
  const T='ـ';
  return { isolated:ch, initial:ch+T, medial:T+ch+T, final:T+ch };
}

/* ================= DATA ================= */
const CATS = {
  alphabet:{ name:'Alphabet', fa:'الفبا', tl:'alefbâ', emoji:'🔤', level:'intermediate', tileClass:'t-alphabet',
    items:[
      {emoji:'ا', fa:'ا', tl:'alef',           en:'Alef (ا)',   forms:formsOf('ا'), image:'images/alphabet/alef.jpg',        audio:'audio/alphabet/alef.m4a'},
      {emoji:'ب', fa:'ب', tl:'be',             en:'Be (ب)',     forms:formsOf('ب'), image:'images/alphabet/be.jpg',          audio:'audio/alphabet/be.m4a'},
      {emoji:'پ', fa:'پ', tl:'pe',             en:'Pe (پ)',     forms:formsOf('پ'), image:'images/alphabet/pe.jpg',          audio:'audio/alphabet/pe.m4a'},
      {emoji:'ت', fa:'ت', tl:'te',             en:'Te (ت)',     forms:formsOf('ت'), image:'images/alphabet/te.jpg',          audio:'audio/alphabet/te.m4a'},
      {emoji:'ث', fa:'ث', tl:'se',             en:'Se (ث)',     forms:formsOf('ث'), image:'images/alphabet/se.jpg',          audio:'audio/alphabet/se.m4a'},
      {emoji:'ج', fa:'ج', tl:'jim',            en:'Jim (ج)',    forms:formsOf('ج'), image:'images/alphabet/jim.jpg',         audio:'audio/alphabet/jim.m4a'},
      {emoji:'چ', fa:'چ', tl:'che',            en:'Che (چ)',    forms:formsOf('چ'), image:'images/alphabet/che.jpg',         audio:'audio/alphabet/che.m4a'},
      {emoji:'ح', fa:'ح', tl:'he-ye jimi',     en:'He (ح)',     forms:formsOf('ح'), image:'images/alphabet/he-jimi.jpg',     audio:'audio/alphabet/he-jimi.m4a'},
      {emoji:'خ', fa:'خ', tl:'khe',            en:'Khe (خ)',    forms:formsOf('خ'), image:'images/alphabet/khe.jpg',         audio:'audio/alphabet/khe.m4a'},
      {emoji:'د', fa:'د', tl:'dâl',            en:'Dal (د)',    forms:formsOf('د'), image:'images/alphabet/dal.jpg',         audio:'audio/alphabet/dal.m4a'},
      {emoji:'ذ', fa:'ذ', tl:'zâl',            en:'Zal (ذ)',    forms:formsOf('ذ'), image:'images/alphabet/zal.jpg',         audio:'audio/alphabet/zal.m4a'},
      {emoji:'ر', fa:'ر', tl:'re',             en:'Re (ر)',     forms:formsOf('ر'), image:'images/alphabet/re.jpg',          audio:'audio/alphabet/re.m4a'},
      {emoji:'ز', fa:'ز', tl:'ze',             en:'Ze (ز)',     forms:formsOf('ز'), image:'images/alphabet/ze.jpg',          audio:'audio/alphabet/ze.m4a'},
      {emoji:'ژ', fa:'ژ', tl:'zhe',            en:'Zhe (ژ)',    forms:formsOf('ژ'), image:'images/alphabet/zhe.jpg',         audio:'audio/alphabet/zhe.m4a'},
      {emoji:'س', fa:'س', tl:'sin',            en:'Sin (س)',    forms:formsOf('س'), image:'images/alphabet/sin.jpg',         audio:'audio/alphabet/sin.m4a'},
      {emoji:'ش', fa:'ش', tl:'shin',           en:'Shin (ش)',   forms:formsOf('ش'), image:'images/alphabet/shin.jpg',        audio:'audio/alphabet/shin.m4a'},
      {emoji:'ص', fa:'ص', tl:'sâd',            en:'Sad (ص)',    forms:formsOf('ص'), image:'images/alphabet/sad.jpg',         audio:'audio/alphabet/sad.m4a'},
      {emoji:'ض', fa:'ض', tl:'zâd',            en:'Zad (ض)',    forms:formsOf('ض'), image:'images/alphabet/zad.jpg',         audio:'audio/alphabet/zad.m4a'},
      {emoji:'ط', fa:'ط', tl:'tâ',             en:'Ta (ط)',     forms:formsOf('ط'), image:'images/alphabet/ta.jpg',          audio:'audio/alphabet/ta.m4a'},
      {emoji:'ظ', fa:'ظ', tl:'zâ',             en:'Za (ظ)',     forms:formsOf('ظ'), image:'images/alphabet/za.jpg',          audio:'audio/alphabet/za.m4a'},
      {emoji:'ع', fa:'ع', tl:'eyn',            en:'Eyn (ع)',    forms:formsOf('ع'), image:'images/alphabet/eyn.jpg',         audio:'audio/alphabet/eyn.m4a'},
      {emoji:'غ', fa:'غ', tl:'gheyn',          en:'Gheyn (غ)',  forms:formsOf('غ'), image:'images/alphabet/gheyn.jpg',       audio:'audio/alphabet/gheyn.m4a'},
      {emoji:'ف', fa:'ف', tl:'fe',             en:'Fe (ف)',     forms:formsOf('ف'), image:'images/alphabet/fe.jpg',          audio:'audio/alphabet/fe.m4a'},
      {emoji:'ق', fa:'ق', tl:'qâf',            en:'Qaf (ق)',    forms:formsOf('ق'), image:'images/alphabet/qaf.jpg',         audio:'audio/alphabet/qaf.m4a'},
      {emoji:'ک', fa:'ک', tl:'kâf',            en:'Kaf (ک)',    forms:formsOf('ک'), image:'images/alphabet/kaf.jpg',         audio:'audio/alphabet/kaf.m4a'},
      {emoji:'گ', fa:'گ', tl:'gâf',            en:'Gaf (گ)',    forms:formsOf('گ'), image:'images/alphabet/gaf.jpg',         audio:'audio/alphabet/gaf.m4a'},
      {emoji:'ل', fa:'ل', tl:'lâm',            en:'Lam (ل)',    forms:formsOf('ل'), image:'images/alphabet/lam.jpg',         audio:'audio/alphabet/lam.m4a'},
      {emoji:'م', fa:'م', tl:'mim',            en:'Mim (م)',    forms:formsOf('م'), image:'images/alphabet/mim.jpg',         audio:'audio/alphabet/mim.m4a'},
      {emoji:'ن', fa:'ن', tl:'nun',            en:'Nun (ن)',    forms:formsOf('ن'), image:'images/alphabet/nun.jpg',         audio:'audio/alphabet/nun.m4a'},
      {emoji:'و', fa:'و', tl:'vâv',            en:'Vav (و)',    forms:formsOf('و'), image:'images/alphabet/vav.jpg',         audio:'audio/alphabet/vav.m4a'},
      {emoji:'ه', fa:'ه', tl:'he-ye do-cheshm',en:'He (ه)',     forms:formsOf('ه'), image:'images/alphabet/he-docheshm.jpg', audio:'audio/alphabet/he-docheshm.m4a'},
      {emoji:'ی', fa:'ی', tl:'ye',             en:'Ye (ی)',     forms:formsOf('ی'), image:'images/alphabet/ye.jpg',          audio:'audio/alphabet/ye.m4a'}
    ]},
  sentences:{ name:'Sentences', fa:'جمله‌ها', tl:'jomleh-hâ', emoji:'💬', level:'intermediate', tileClass:'t-sentences', isSentence:true,
    items:[
      {emoji:'🐱', fa:'این گربه است.',                 tl:'in gorbeh ast',                en:'This is a cat.',                    image:'images/sentences/this-is-a-cat.jpg',  audio:'audio/sentences/this-is-a-cat.m4a'},
      {emoji:'🐶', fa:'سگ بزرگ است.',                  tl:'sag bozorg ast',               en:'The dog is big.',                   image:'images/sentences/dog-is-big.jpg',     audio:'audio/sentences/dog-is-big.m4a'},
      {emoji:'🍎', fa:'من سیب دوست دارم.',             tl:'man sib doost dâram',          en:'I like apples.',                    image:'images/sentences/like-apples.jpg',    audio:'audio/sentences/like-apples.m4a'},
      {emoji:'😊', fa:'مامانم خوشحال است.',            tl:'mâmânam khoshhâl ast',         en:'My mom is happy.',                  image:'images/sentences/mom-is-happy.jpg',   audio:'audio/sentences/mom-is-happy.m4a'},
      {emoji:'🔵', fa:'آسمان آبی است.',                tl:'âsemân âbi ast',               en:'The sky is blue.',                  image:'images/sentences/sky-is-blue.jpg',    audio:'audio/sentences/sky-is-blue.m4a'},
      {emoji:'✋', fa:'من دو دست دارم.',                tl:'man do dast dâram',            en:'I have two hands.',                 image:'images/sentences/two-hands.jpg',      audio:'audio/sentences/two-hands.m4a'},
      {emoji:'🐦', fa:'پرنده پرواز می‌کند.',            tl:'parandeh parvâz mikonad',      en:'The bird flies.',                   image:'images/sentences/bird-flies.jpg',     audio:'audio/sentences/bird-flies.m4a'},
      {emoji:'💧', fa:'من آب می‌خواهم.',                tl:'man âb mikhâham',              en:'I want water.',                     image:'images/sentences/want-water.jpg',     audio:'audio/sentences/want-water.m4a'},
      {emoji:'☀️', fa:'آفتاب گرم است.',                tl:'âftâb garm ast',               en:'The sun is hot.',                   image:'images/sentences/sun-is-hot.jpg',     audio:'audio/sentences/sun-is-hot.m4a'},
      {emoji:'👨', fa:'بابام بلند است.',               tl:'bâbam boland ast',             en:'My dad is tall.',                   image:'images/sentences/dad-is-tall.jpg',    audio:'audio/sentences/dad-is-tall.m4a'},
      {emoji:'🐘', fa:'فیل بزرگ است و موش کوچک است.',  tl:'fil bozorg ast, mush kuchak ast', en:'The elephant is big, the mouse is small.', image:'images/sentences/elephant-mouse.jpg', audio:'audio/sentences/elephant-mouse.m4a'},
      {emoji:'👪', fa:'من خانواده‌ام را دوست دارم.',    tl:'man khânevâdeam râ doost dâram', en:'I love my family.',                image:'images/sentences/love-family.jpg',    audio:'audio/sentences/love-family.m4a'},
      {emoji:'🚗', fa:'ماشین سریع است.',               tl:'mâshin sari\' ast',            en:'The car is fast.',                  image:'images/sentences/car-is-fast.jpg',    audio:'audio/sentences/car-is-fast.m4a'},
      {emoji:'📖', fa:'من کتاب می‌خوانم.',              tl:'man ketâb mikhânam',           en:'I am reading a book.',              image:'images/sentences/reading-book.jpg',   audio:'audio/sentences/reading-book.m4a'},
      {emoji:'🌙', fa:'شب بخیر، فردا می‌بینمت.',        tl:'shab bekheir, fardâ mibinamet', en:'Good night, see you tomorrow.',    image:'images/sentences/good-night.jpg',     audio:'audio/sentences/good-night.m4a'}
    ]},
  animals:{ name:'Animals', fa:'حیوان‌ها', tl:'heyvân-hâ', emoji:'🦁', level:'beginner', tileClass:'t-animals',
    items:[
      {emoji:'🐱', fa:'گربه',   tl:'gorbeh',   en:'cat',      image:'images/animals/cat.jpg', audio:'audio/animals/cat.m4a'},
      {emoji:'🐶', fa:'سگ',     tl:'sag',      en:'dog',      image:'images/animals/dog.jpg', audio:'audio/animals/dog.m4a'},
      {emoji:'🐦', fa:'پرنده',  tl:'parandeh', en:'bird',     image:'images/animals/bird.jpg', audio:'audio/animals/bird.m4a'},
      {emoji:'🐟', fa:'ماهی',   tl:'mâhi',     en:'fish',     image:'images/animals/fish.jpg', audio:'audio/animals/fish.m4a'},
      {emoji:'🐴', fa:'اسب',    tl:'asb',      en:'horse',    image:'images/animals/horse.jpg', audio:'audio/animals/horse.m4a'},
      {emoji:'🐰', fa:'خرگوش',  tl:'khargush', en:'rabbit',   image:'images/animals/rabbit.jpg', audio:'audio/animals/rabbit.m4a'},
      {emoji:'🐘', fa:'فیل',    tl:'fil',      en:'elephant', image:'images/animals/elephant.jpg', audio:'audio/animals/elephant.m4a'},
      {emoji:'🦁', fa:'شیر',    tl:'shir',     en:'lion',     image:'images/animals/lion.jpg', audio:'audio/animals/lion.m4a'},
      {emoji:'🐢', fa:'لاک‌پشت', tl:'lâkposht', en:'turtle',   image:'images/animals/turtle.jpg', audio:'audio/animals/turtle.m4a'},
      {emoji:'🐸', fa:'قورباغه', tl:'ghurbâgheh', en:'frog',   image:'images/animals/frog.jpg', audio:'audio/animals/frog.m4a'},
      {emoji:'🐍', fa:'مار',    tl:'mâr',      en:'snake',    image:'images/animals/snake.jpg', audio:'audio/animals/snake.m4a'},
      {emoji:'🦉', fa:'جغد',    tl:'joghd',    en:'owl',      image:'images/animals/owl.jpg', audio:'audio/animals/owl.m4a'},
      {emoji:'🐝', fa:'زنبور',  tl:'zanbur',   en:'bee',      image:'images/animals/bee.jpg', audio:'audio/animals/bee.m4a'},
      {emoji:'🦋', fa:'پروانه', tl:'parvâneh', en:'butterfly',image:'images/animals/butterfly.jpg', audio:'audio/animals/butterfly.m4a'}
    ]},
  colors:{ name:'Colors', fa:'رنگ‌ها', tl:'rang-hâ', emoji:'🌈', level:'beginner', tileClass:'t-colors',
    items:[
      {swatch:'#E63946', fa:'قرمز',   tl:'ghermez', en:'red',    image:'images/colors/red.jpg', audio:'audio/colors/red.m4a'},
      {swatch:'#2D7DD2', fa:'آبی',    tl:'âbi',     en:'blue',   image:'images/colors/blue.jpg', audio:'audio/colors/blue.m4a'},
      {swatch:'#FFD23F', fa:'زرد',    tl:'zard',    en:'yellow', image:'images/colors/yellow.jpg', audio:'audio/colors/yellow.m4a'},
      {swatch:'#4CAF50', fa:'سبز',    tl:'sabz',    en:'green',  image:'images/colors/green.jpg', audio:'audio/colors/green.m4a'},
      {swatch:'#FF8C42', fa:'نارنجی', tl:'nârenji', en:'orange', image:'images/colors/orange.jpg', audio:'audio/colors/orange.m4a'},
      {swatch:'#F48FB1', fa:'صورتی',  tl:'surati',  en:'pink',   image:'images/colors/pink.jpg', audio:'audio/colors/pink.m4a'}
    ]},
  numbers:{ name:'Numbers', fa:'عددها', tl:'adad-hâ', emoji:'🔢', level:'beginner', tileClass:'t-numbers',
    items:[
      {emoji:'1️⃣', fa:'یک',    tl:'yek',    en:'one',   image:'images/numbers/one.jpg', audio:'audio/numbers/one.m4a'},
      {emoji:'2️⃣', fa:'دو',    tl:'do',     en:'two',   image:'images/numbers/two.jpg', audio:'audio/numbers/two.m4a'},
      {emoji:'3️⃣', fa:'سه',    tl:'se',     en:'three', image:'images/numbers/three.jpg', audio:'audio/numbers/three.m4a'},
      {emoji:'4️⃣', fa:'چهار',  tl:'chahâr', en:'four',  image:'images/numbers/four.jpg', audio:'audio/numbers/four.m4a'},
      {emoji:'5️⃣', fa:'پنج',   tl:'panj',   en:'five',  image:'images/numbers/five.jpg', audio:'audio/numbers/five.m4a'},
      {emoji:'6️⃣', fa:'شش',    tl:'shesh',  en:'six',   image:'images/numbers/six.jpg', audio:'audio/numbers/six.m4a'},
      {emoji:'7️⃣', fa:'هفت',   tl:'haft',   en:'seven', image:'images/numbers/seven.jpg', audio:'audio/numbers/seven.m4a'},
      {emoji:'8️⃣', fa:'هشت',   tl:'hasht',  en:'eight', image:'images/numbers/eight.jpg', audio:'audio/numbers/eight.m4a'},
      {emoji:'9️⃣', fa:'نه',    tl:'noh',    en:'nine',  image:'images/numbers/nine.jpg', audio:'audio/numbers/nine.m4a'},
      {emoji:'🔟', fa:'ده',     tl:'dah',    en:'ten',   image:'images/numbers/ten.jpg', audio:'audio/numbers/ten.m4a'}
    ]},
  numbersAdvanced:{ name:'Big Numbers', fa:'اعداد بزرگ', tl:'adad-e bozorg', emoji:'🔢', level:'intermediate', tileClass:'t-numbersAdvanced',
    items:[
      {emoji:'1️⃣1️⃣', fa:'یازده',  tl:'yâzdah',   en:'eleven',      image:'images/numbersAdvanced/eleven.jpg',      audio:'audio/numbersAdvanced/eleven.m4a'},
      {emoji:'1️⃣2️⃣', fa:'دوازده', tl:'davâzdah', en:'twelve',      image:'images/numbersAdvanced/twelve.jpg',      audio:'audio/numbersAdvanced/twelve.m4a'},
      {emoji:'1️⃣3️⃣', fa:'سیزده',  tl:'sizdah',   en:'thirteen',    image:'images/numbersAdvanced/thirteen.jpg',    audio:'audio/numbersAdvanced/thirteen.m4a'},
      {emoji:'1️⃣4️⃣', fa:'چهارده', tl:'chahârdah',en:'fourteen',    image:'images/numbersAdvanced/fourteen.jpg',    audio:'audio/numbersAdvanced/fourteen.m4a'},
      {emoji:'1️⃣5️⃣', fa:'پانزده', tl:'pânzdah',  en:'fifteen',     image:'images/numbersAdvanced/fifteen.jpg',     audio:'audio/numbersAdvanced/fifteen.m4a'},
      {emoji:'1️⃣6️⃣', fa:'شانزده', tl:'shânzdah', en:'sixteen',     image:'images/numbersAdvanced/sixteen.jpg',     audio:'audio/numbersAdvanced/sixteen.m4a'},
      {emoji:'1️⃣7️⃣', fa:'هفده',   tl:'hefdah',   en:'seventeen',   image:'images/numbersAdvanced/seventeen.jpg',   audio:'audio/numbersAdvanced/seventeen.m4a'},
      {emoji:'1️⃣8️⃣', fa:'هجده',   tl:'hejdah',   en:'eighteen',    image:'images/numbersAdvanced/eighteen.jpg',    audio:'audio/numbersAdvanced/eighteen.m4a'},
      {emoji:'1️⃣9️⃣', fa:'نوزده',  tl:'nuzdah',   en:'nineteen',    image:'images/numbersAdvanced/nineteen.jpg',    audio:'audio/numbersAdvanced/nineteen.m4a'},
      {emoji:'2️⃣0️⃣', fa:'بیست',   tl:'bist',     en:'twenty',      image:'images/numbersAdvanced/twenty.jpg',      audio:'audio/numbersAdvanced/twenty.m4a'},
      {emoji:'3️⃣0️⃣', fa:'سی',     tl:'si',       en:'thirty',      image:'images/numbersAdvanced/thirty.jpg',      audio:'audio/numbersAdvanced/thirty.m4a'},
      {emoji:'4️⃣0️⃣', fa:'چهل',    tl:'chehel',   en:'forty',       image:'images/numbersAdvanced/forty.jpg',       audio:'audio/numbersAdvanced/forty.m4a'},
      {emoji:'5️⃣0️⃣', fa:'پنجاه',  tl:'panjâh',   en:'fifty',       image:'images/numbersAdvanced/fifty.jpg',       audio:'audio/numbersAdvanced/fifty.m4a'},
      {emoji:'6️⃣0️⃣', fa:'شصت',    tl:'shast',    en:'sixty',       image:'images/numbersAdvanced/sixty.jpg',       audio:'audio/numbersAdvanced/sixty.m4a'},
      {emoji:'7️⃣0️⃣', fa:'هفتاد',  tl:'haftâd',   en:'seventy',     image:'images/numbersAdvanced/seventy.jpg',     audio:'audio/numbersAdvanced/seventy.m4a'},
      {emoji:'8️⃣0️⃣', fa:'هشتاد',  tl:'hashtâd',  en:'eighty',      image:'images/numbersAdvanced/eighty.jpg',      audio:'audio/numbersAdvanced/eighty.m4a'},
      {emoji:'9️⃣0️⃣', fa:'نود',    tl:'navad',    en:'ninety',      image:'images/numbersAdvanced/ninety.jpg',      audio:'audio/numbersAdvanced/ninety.m4a'},
      {emoji:'💯',     fa:'صد',     tl:'sad',      en:'one hundred', image:'images/numbersAdvanced/one-hundred.jpg', audio:'audio/numbersAdvanced/one-hundred.m4a'},
      {emoji:'1️⃣0️⃣0️⃣0️⃣', fa:'هزار', tl:'hezâr',  en:'one thousand',image:'images/numbersAdvanced/one-thousand.jpg',audio:'audio/numbersAdvanced/one-thousand.m4a'}
    ]},
  food:{ name:'Yummy Food', fa:'خوراکی‌ها', tl:'khorâki-hâ', emoji:'🍎', level:'beginner', tileClass:'t-food',
    items:[
      {emoji:'🍎', fa:'سیب',  tl:'sib',    en:'apple',  image:'images/food/apple.jpg', audio:'audio/food/apple.m4a'},
      {emoji:'🍌', fa:'موز',  tl:'moz',    en:'banana', image:'images/food/banana.jpg', audio:'audio/food/banana.m4a'},
      {emoji:'🍞', fa:'نان',  tl:'nân',    en:'bread',  image:'images/food/bread.jpg', audio:'audio/food/bread.m4a'},
      {emoji:'🥛', fa:'شیر',  tl:'shir',   en:'milk',   image:'images/food/milk.jpg', audio:'audio/food/milk.m4a'},
      {emoji:'💧', fa:'آب',   tl:'âb',     en:'water',  image:'images/food/water.jpg', audio:'audio/food/water.m4a'},
      {emoji:'🍚', fa:'برنج', tl:'berenj', en:'rice',   image:'images/food/rice.jpg', audio:'audio/food/rice.m4a'}
    ]},
  family:{ name:'Family', fa:'خانواده', tl:'khânevâdeh', emoji:'👪', level:'beginner', tileClass:'t-family',
    items:[
      {emoji:'👵', fa:'مادربزرگ', tl:'mâdarbozorg', en:'grandma', image:'images/family/grandma.jpg', audio:'audio/family/grandma.m4a'},
      {emoji:'👴', fa:'پدربزرگ',  tl:'pedarbozorg',  en:'grandpa', image:'images/family/grandpa.jpg', audio:'audio/family/grandpa.m4a'},
      {emoji:'👧', fa:'خواهر',    tl:'khâhar',       en:'sister',  image:'images/family/sister.jpg', audio:'audio/family/sister.m4a'},
      {emoji:'👦', fa:'برادر',    tl:'barâdar',      en:'brother', image:'images/family/brother.jpg', audio:'audio/family/brother.m4a'},
      {emoji:'👶', fa:'نی‌نی',    tl:'nini',         en:'baby',    image:'images/family/baby.jpg', audio:'audio/family/baby.m4a'},
      {emoji:'👩', fa:'خاله',     tl:'khâleh',       en:'aunt',    image:'images/family/aunt.jpg', audio:'audio/family/aunt.m4a'},
      {emoji:'👨', fa:'عمو',      tl:'amoo',         en:'uncle',   image:'images/family/uncle.jpg', audio:'audio/family/uncle.m4a'}
    ]},
  house:{ name:'My House', fa:'خانه', tl:'khâneh', emoji:'🏠', level:'beginner', tileClass:'t-house',
    items:[
      {emoji:'🛏️', fa:'اتاق خواب',   tl:'otâgh-e khâb',      en:'bedroom',     image:'images/house/bedroom.jpg', audio:'audio/house/bedroom.m4a'},
      {emoji:'🍳', fa:'آشپزخانه',    tl:'âshpazkhâneh',      en:'kitchen',     image:'images/house/kitchen.jpg', audio:'audio/house/kitchen.m4a'},
      {emoji:'🛁', fa:'حمام',        tl:'hammâm',            en:'bathroom',    image:'images/house/bathroom.jpg', audio:'audio/house/bathroom.m4a'},
      {emoji:'🛋️', fa:'اتاق نشیمن',  tl:'otâgh-e neshiman',  en:'living room', image:'images/house/living-room.jpg', audio:'audio/house/living-room.m4a'},
      {emoji:'🚪', fa:'در',          tl:'dar',               en:'door',        image:'images/house/door.jpg', audio:'audio/house/door.m4a'},
      {emoji:'🪟', fa:'پنجره',       tl:'panjareh',          en:'window',      image:'images/house/window.jpg', audio:'audio/house/window.m4a'}
    ]},
  school:{ name:'School', fa:'مدرسه', tl:'madreseh', emoji:'🎒', level:'beginner', tileClass:'t-school',
    items:[
      {emoji:'📚', fa:'کتاب',       tl:'ketâb',       en:'book',     image:'images/school/book.jpg', audio:'audio/school/book.m4a'},
      {emoji:'✏️', fa:'مداد',       tl:'medâd',       en:'pencil',   image:'images/school/pencil.jpg', audio:'audio/school/pencil.m4a'},
      {emoji:'🎒', fa:'کوله‌پشتی',  tl:'kolehposhti', en:'backpack', image:'images/school/backpack.jpg', audio:'audio/school/backpack.m4a'},
      {emoji:'✂️', fa:'قیچی',       tl:'gheychi',     en:'scissors', image:'images/school/scissors.jpg', audio:'audio/school/scissors.m4a'},
      {emoji:'🖍️', fa:'مدادرنگی',   tl:'medâd-rangi', en:'crayon',   image:'images/school/crayon.jpg', audio:'audio/school/crayon.m4a'},
      {emoji:'🪑', fa:'صندلی',      tl:'sandali',     en:'chair',    image:'images/school/chair.jpg', audio:'audio/school/chair.m4a'}
    ]},
  clothes:{ name:'Clothes', fa:'لباس‌ها', tl:'lebâs-hâ', emoji:'👕', level:'beginner', tileClass:'t-clothes',
    items:[
      {emoji:'👕', fa:'پیراهن', tl:'pirâhan', en:'shirt', image:'images/clothes/shirt.jpg', audio:'audio/clothes/shirt.m4a'},
      {emoji:'👖', fa:'شلوار',  tl:'shalvâr', en:'pants', image:'images/clothes/pants.jpg', audio:'audio/clothes/pants.m4a'},
      {emoji:'👟', fa:'کفش',    tl:'kafsh',   en:'shoes', image:'images/clothes/shoes.jpg', audio:'audio/clothes/shoes.m4a'},
      {emoji:'🧢', fa:'کلاه',   tl:'kolâh',   en:'hat',   image:'images/clothes/hat.jpg', audio:'audio/clothes/hat.m4a'},
      {emoji:'🧦', fa:'جوراب',  tl:'jurâb',   en:'socks', image:'images/clothes/socks.jpg', audio:'audio/clothes/socks.m4a'},
      {emoji:'🧥', fa:'کاپشن',  tl:'kâpshen', en:'jacket',image:'images/clothes/jacket.jpg', audio:'audio/clothes/jacket.m4a'}
    ]},
  weather:{ name:'Weather', fa:'آب و هوا', tl:'âb-o-havâ', emoji:'⛅', level:'beginner', tileClass:'t-weather',
    items:[
      {emoji:'☀️', fa:'آفتاب',       tl:'âftâb',       en:'sun',     image:'images/weather/sun.jpg', audio:'audio/weather/sun.m4a'},
      {emoji:'🌧️', fa:'باران',       tl:'bârân',       en:'rain',    image:'images/weather/rain.jpg', audio:'audio/weather/rain.m4a'},
      {emoji:'❄️', fa:'برف',         tl:'barf',        en:'snow',    image:'images/weather/snow.jpg', audio:'audio/weather/snow.m4a'},
      {emoji:'☁️', fa:'ابر',         tl:'abr',         en:'cloud',   image:'images/weather/cloud.jpg', audio:'audio/weather/cloud.m4a'},
      {emoji:'💨', fa:'باد',         tl:'bâd',         en:'wind',    image:'images/weather/wind.jpg', audio:'audio/weather/wind.m4a'},
      {emoji:'🌈', fa:'رنگین‌کمان',  tl:'rangin-kamân',en:'rainbow', image:'images/weather/rainbow.jpg', audio:'audio/weather/rainbow.m4a'}
    ]},
  nature:{ name:'Nature', fa:'طبیعت', tl:'tabi\'at', emoji:'⛰️', level:'beginner', tileClass:'t-nature',
    items:[
      {emoji:'⛰️', fa:'کوه',       tl:'kuh',       en:'mountain', image:'images/nature/mountain.jpg', audio:'audio/nature/mountain.m4a'},
      {emoji:'🏞️', fa:'رودخانه',   tl:'rudkhâneh', en:'river',    image:'images/nature/river.jpg', audio:'audio/nature/river.m4a'},
      {emoji:'🌊', fa:'دریا',      tl:'daryâ',     en:'sea',      image:'images/nature/sea.jpg', audio:'audio/nature/sea.m4a'},
      {emoji:'🌲', fa:'جنگل',      tl:'jangal',    en:'forest',   image:'images/nature/forest.jpg', audio:'audio/nature/forest.m4a'},
      {emoji:'🏜️', fa:'کویر',      tl:'kavir',     en:'desert',   image:'images/nature/desert.jpg', audio:'audio/nature/desert.m4a'},
      {emoji:'🛶', fa:'دریاچه',    tl:'daryâcheh', en:'lake',     image:'images/nature/lake.jpg', audio:'audio/nature/lake.m4a'}
    ]},
  body:{ name:'Body Parts', fa:'اعضای بدن', tl:'a\'zâ-ye badan', emoji:'🧍', level:'beginner', tileClass:'t-body',
    items:[
      {emoji:'👤', fa:'سر',    tl:'sar',         en:'head',     image:'images/body/head.jpg',     audio:'audio/body/head.m4a'},
      {emoji:'🦱', fa:'مو',    tl:'mu',          en:'hair',     image:'images/body/hair.jpg',     audio:'audio/body/hair.m4a'},
      {emoji:'😊', fa:'صورت',  tl:'surat',       en:'face',     image:'images/body/face.jpg',     audio:'audio/body/face.m4a'},
      {emoji:'👁️', fa:'چشم',   tl:'cheshm',      en:'eye',      image:'images/body/eye.jpg',      audio:'audio/body/eye.m4a'},
      {emoji:'👂', fa:'گوش',   tl:'gush',        en:'ear',      image:'images/body/ear.jpg',      audio:'audio/body/ear.m4a'},
      {emoji:'👃', fa:'بینی',  tl:'bini',        en:'nose',     image:'images/body/nose.jpg',     audio:'audio/body/nose.m4a'},
      {emoji:'👄', fa:'دهان',  tl:'dahân',       en:'mouth',    image:'images/body/mouth.jpg',    audio:'audio/body/mouth.m4a'},
      {emoji:'🦷', fa:'دندان', tl:'dandân',      en:'teeth',    image:'images/body/teeth.jpg',    audio:'audio/body/teeth.m4a'},
      {emoji:'👅', fa:'زبان',  tl:'zabân',       en:'tongue',   image:'images/body/tongue.jpg',   audio:'audio/body/tongue.m4a'},
      {emoji:'🤷', fa:'شانه',  tl:'shâneh',      en:'shoulder', image:'images/body/shoulder.jpg', audio:'audio/body/shoulder.m4a'},
      {emoji:'💪', fa:'بازو',  tl:'bâzu',        en:'arm',      image:'images/body/arm.jpg',      audio:'audio/body/arm.m4a'},
      {emoji:'✋', fa:'دست',   tl:'dast',        en:'hand',     image:'images/body/hand.jpg',     audio:'audio/body/hand.m4a'},
      {emoji:'☝️', fa:'انگشت', tl:'angosht',     en:'finger',   image:'images/body/finger.jpg',   audio:'audio/body/finger.m4a'},
      {emoji:'🦵', fa:'پا',    tl:'pâ',          en:'leg',      image:'images/body/leg.jpg',      audio:'audio/body/leg.m4a'},
      {emoji:'🧎', fa:'زانو',  tl:'zânu',        en:'knee',     image:'images/body/knee.jpg',     audio:'audio/body/knee.m4a'},
      {emoji:'🦶', fa:'کف پا', tl:'kaf-e pâ',    en:'foot',     image:'images/body/foot.jpg',     audio:'audio/body/foot.m4a'},
      {emoji:'👣', fa:'انگشت پا', tl:'angosht-e pâ', en:'toe',  image:'images/body/toe.jpg',      audio:'audio/body/toe.m4a'}
    ]},
  actions:{ name:'Actions', fa:'فعل‌ها', tl:'fe\'l-hâ', emoji:'🏃', level:'beginner', tileClass:'t-actions',
    items:[
      {emoji:'🏃', fa:'دویدن',       tl:'davidan',     en:'run',   image:'images/actions/run.jpg', audio:'audio/actions/run.m4a'},
      {emoji:'🍽️', fa:'خوردن',       tl:'khordan',     en:'eat',   image:'images/actions/eat.jpg', audio:'audio/actions/eat.m4a'},
      {emoji:'😴', fa:'خوابیدن',     tl:'khâbidan',    en:'sleep', image:'images/actions/sleep.jpg', audio:'audio/actions/sleep.m4a'},
      {emoji:'🤸', fa:'پریدن',       tl:'paridan',     en:'jump',  image:'images/actions/jump.jpg', audio:'audio/actions/jump.m4a'},
      {emoji:'🥤', fa:'نوشیدن',      tl:'nushidan',    en:'drink', image:'images/actions/drink.jpg', audio:'audio/actions/drink.m4a'},
      {emoji:'🎲', fa:'بازی کردن',   tl:'bâzi kardan', en:'play',  image:'images/actions/play.jpg', audio:'audio/actions/play.m4a'},
      {emoji:'📖', fa:'خواندن',      tl:'khândan',     en:'read',  image:'images/actions/read.jpg', audio:'audio/actions/read.m4a'},
      {emoji:'🚶', fa:'راه رفتن',    tl:'râh raftan',  en:'walk',  image:'images/actions/walk.jpg', audio:'audio/actions/walk.m4a'}
    ]},
  emotions:{ name:'Emotions', fa:'احساسات', tl:'ehsâsât', emoji:'😄', level:'beginner', tileClass:'t-emotions',
    items:[
      {emoji:'😄', fa:'خوشحال',  tl:'khoshhâl', en:'happy',     image:'images/emotions/happy.jpg', audio:'audio/emotions/happy.m4a'},
      {emoji:'😢', fa:'ناراحت',  tl:'nârâhat',  en:'sad',       image:'images/emotions/sad.jpg', audio:'audio/emotions/sad.m4a'},
      {emoji:'😠', fa:'عصبانی',  tl:'asabâni',  en:'angry',     image:'images/emotions/angry.jpg', audio:'audio/emotions/angry.m4a'},
      {emoji:'😨', fa:'ترسیده',  tl:'tarsideh', en:'scared',    image:'images/emotions/scared.jpg', audio:'audio/emotions/scared.m4a'},
      {emoji:'🥱', fa:'خسته',    tl:'khasteh',  en:'tired',     image:'images/emotions/tired.jpg', audio:'audio/emotions/tired.m4a'},
      {emoji:'😲', fa:'متعجب',   tl:'mote\'ajjeb', en:'surprised', image:'images/emotions/surprised.jpg', audio:'audio/emotions/surprised.m4a'}
    ]},
  shapes:{ name:'Shapes', fa:'شکل‌ها', tl:'shekl-hâ', emoji:'⭐', level:'beginner', tileClass:'t-shapes',
    items:[
      {emoji:'⭕', fa:'دایره',  tl:'dâyereh', en:'circle',   image:'images/shapes/circle.jpg', audio:'audio/shapes/circle.m4a'},
      {emoji:'🟦', fa:'مربع',   tl:'morabba', en:'square',   image:'images/shapes/square.jpg', audio:'audio/shapes/square.m4a'},
      {emoji:'🔺', fa:'مثلث',   tl:'mosallas',en:'triangle', image:'images/shapes/triangle.jpg', audio:'audio/shapes/triangle.m4a'},
      {emoji:'⭐', fa:'ستاره',  tl:'setâreh', en:'star',     image:'images/shapes/star.jpg', audio:'audio/shapes/star.m4a'},
      {emoji:'❤️', fa:'قلب',    tl:'ghalb',   en:'heart',    image:'images/shapes/heart.jpg', audio:'audio/shapes/heart.m4a'}
    ]},
  sizes:{ name:'Sizes', fa:'اندازه‌ها', tl:'andâzeh-hâ', emoji:'📏', level:'beginner', tileClass:'t-sizes',
    items:[
      {emoji:'🐘', fa:'بزرگ',  tl:'bozorg',  en:'big',   image:'images/sizes/big.jpg', audio:'audio/sizes/big.m4a'},
      {emoji:'🐭', fa:'کوچک',  tl:'kuchak',  en:'small', image:'images/sizes/small.jpg', audio:'audio/sizes/small.m4a'},
      {emoji:'🦒', fa:'بلند',  tl:'boland',  en:'tall',  image:'images/sizes/tall.jpg', audio:'audio/sizes/tall.m4a'},
      {emoji:'🐢', fa:'کوتاه', tl:'kutâh',   en:'short', image:'images/sizes/short.jpg', audio:'audio/sizes/short.m4a'},
      {emoji:'🐇', fa:'سریع',  tl:'sari\'',  en:'fast',  image:'images/sizes/fast.jpg', audio:'audio/sizes/fast.m4a'},
      {emoji:'🐌', fa:'آهسته', tl:'âhesteh', en:'slow',  image:'images/sizes/slow.jpg', audio:'audio/sizes/slow.m4a'}
    ]},
  vehicles:{ name:'Vehicles', fa:'وسایل نقلیه', tl:'vasâyel-e naghlieh', emoji:'🚗', level:'beginner', tileClass:'t-vehicles',
    items:[
      {emoji:'🚗', fa:'ماشین',              tl:'mâshin',                en:'car',        image:'images/vehicles/car.jpg', audio:'audio/vehicles/car.m4a'},
      {emoji:'🚌', fa:'اتوبوس',             tl:'otobus',                en:'bus',        image:'images/vehicles/bus.jpg', audio:'audio/vehicles/bus.m4a'},
      {emoji:'🚂', fa:'قطار',               tl:'ghatâr',                en:'train',      image:'images/vehicles/train.jpg', audio:'audio/vehicles/train.m4a'},
      {emoji:'✈️', fa:'هواپیما',            tl:'havâpeymâ',             en:'airplane',   image:'images/vehicles/airplane.jpg', audio:'audio/vehicles/airplane.m4a'},
      {emoji:'🚲', fa:'دوچرخه',             tl:'docharkheh',            en:'bicycle',    image:'images/vehicles/bicycle.jpg', audio:'audio/vehicles/bicycle.m4a'},
      {emoji:'⛵', fa:'قایق',               tl:'ghâyegh',               en:'boat',       image:'images/vehicles/boat.jpg', audio:'audio/vehicles/boat.m4a'},
      {emoji:'🚚', fa:'کامیون',             tl:'kâmyun',                en:'truck',      image:'images/vehicles/truck.jpg', audio:'audio/vehicles/truck.m4a'},
      {emoji:'🏍️', fa:'موتور',              tl:'motor',                 en:'motorcycle', image:'images/vehicles/motorcycle.jpg', audio:'audio/vehicles/motorcycle.m4a'},
      {emoji:'🚁', fa:'هلیکوپتر',           tl:'helikopter',            en:'helicopter', image:'images/vehicles/helicopter.jpg', audio:'audio/vehicles/helicopter.m4a'},
      {emoji:'🚑', fa:'آمبولانس',           tl:'âmbulâns',              en:'ambulance',  image:'images/vehicles/ambulance.jpg', audio:'audio/vehicles/ambulance.m4a'}
    ]},
  hello:{ name:'Hello Words', fa:'سلام و بای‌بای', tl:'salâm words', emoji:'👋', level:'beginner', tileClass:'t-hello',
    items:[
      {emoji:'👋', fa:'سلام',    tl:'salâm',      en:'hello',     image:'images/hello/hello.jpg', audio:'audio/hello/hello.m4a'},
      {emoji:'🫶', fa:'مرسی',    tl:'mersi',      en:'thank you', image:'images/hello/thank-you.jpg', audio:'audio/hello/thank-you.m4a'},
      {emoji:'✅', fa:'بله',     tl:'baleh',      en:'yes',       image:'images/hello/yes.jpg', audio:'audio/hello/yes.m4a'},
      {emoji:'❌', fa:'نه',      tl:'na',         en:'no',        image:'images/hello/no.jpg', audio:'audio/hello/no.m4a'},
      {emoji:'👩', fa:'مامان',   tl:'mâmân',      en:'mom',       image:'images/hello/mom.jpg', audio:'audio/hello/mom.m4a'},
      {emoji:'👨', fa:'بابا',    tl:'bâbâ',       en:'dad',       image:'images/hello/dad.jpg', audio:'audio/hello/dad.m4a'},
      {emoji:'🌙', fa:'خداحافظ', tl:'khodâhâfez', en:'goodbye',   image:'images/hello/goodbye.jpg', audio:'audio/hello/goodbye.m4a'}
    ]}
};

const STICKERS = [
  {emoji:'🐱', label:'Pashmak'},
  {emoji:'🌷', label:'Tulip'},
  {emoji:'🫖', label:'Tea pot'},
  {emoji:'🍉', label:'Watermelon'},
  {emoji:'🐦', label:'Bulbul bird'},
  {emoji:'🏔️', label:'Damavand'},
  {emoji:'🐠', label:'Goldfish'},
  {emoji:'👑', label:'Golden crown'}
];
const STARS_PER_STICKER = 5;
