const ui={ru:{brand:'АРДАГАНИ',address:'Батуми · ул. Пиросмани, 7',sub:'Грузинская кухня',call:'Позвонить',map:'На карте',contact:'Телефон ресторана скоро появится.',menu:'Наше меню',currency:'Цены в лари · ₾',search:'Найти блюдо',note:'Цены указаны в грузинских лари. Цены через «/» соответствуют вариантам блюда или объёма.',unknown:'Уточните у официанта',unit:'Цена за штуку',viewPhoto:'Посмотреть фото',photo:'Фото для примера',empty:'Ничего не найдено. Попробуйте другое название.',top:'Наверх',footer:'Фотографии сгенерированы для примера.'},en:{brand:'ARDAGANI',address:'7 Pirosmani Street · Batumi',sub:'Georgian cuisine',call:'Call us',map:'Directions',contact:'The restaurant phone number will be added soon.',menu:'Our menu',currency:'Prices in GEL · ₾',search:'Find a dish',note:'Prices are in Georgian lari. Prices separated by “/” refer to dish or volume options.',unknown:'Ask your waiter',unit:'Price per piece',viewPhoto:'View photo',photo:'Illustrative photo',empty:'No dishes found. Try another name.',top:'Top',footer:'Photos are AI-generated illustrations.'},ka:{brand:'არდაგანი',address:'ბათუმი · ფიროსმანის ქუჩა 7',sub:'ქართული სამზარეულო',call:'დარეკვა',map:'რუკაზე',contact:'რესტორნის ტელეფონი მალე დაემატება.',menu:'ჩვენი მენიუ',currency:'ფასები ლარში · ₾',search:'მოძებნეთ კერძი',note:'ფასები მოცემულია ლარში. „/“-ით გამოყოფილი ფასები კერძის ან მოცულობის ვარიანტებს შეესაბამება.',unknown:'ჰკითხეთ მიმტანს',unit:'ერთი ცალის ფასი',viewPhoto:'ფოტოს ნახვა',photo:'საილუსტრაციო ფოტო',empty:'კერძი ვერ მოიძებნა. სცადეთ სხვა სახელი.',top:'ზემოთ',footer:'ფოტოები გენერირებულია ნიმუშისთვის.'}};
const $=id=>document.getElementById(id);let lang='ru';try{lang=localStorage.getItem('menu-language')||'ru'}catch{}if(!ui[lang])lang='ru';let observer;const languageIndex=()=>({ru:0,en:1,ka:2}[lang]);function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function priceBlock(d){const t=ui[lang],ix=languageIndex(),fmt=s=>lang==='en'?s.replaceAll(',','.'):s;
 if(d[6])return `<span class="price price-multi">${d[6].map((label,i)=>{const p=d[3]?d[3].split('/')[i].trim():null;return `<span class="price-variant"><span>${escapeHTML(label[ix])}</span><b>${p?escapeHTML(fmt(p))+' ₾':t.unknown}</b></span>`}).join('')}</span>`;
 return `<span class="price ${d[3]===null?'unknown':''}">${d[3]===null?t.unknown:escapeHTML(fmt(d[3]))+' ₾'}</span>`;}
function renderRecommendations(ix,query){
 const t=ui[lang];
 const copy={ru:['Рекомендуем попробовать','Три вкуса Грузии','Классика грузинского застолья','Хинкали «Калакури»','Чакапули','Шашлык из свинины'],en:['Recommended dishes','Three tastes of Georgia','Georgian table classics','Kalakuri khinkali','Chakapuli','Pork shashlik'],ka:['გირჩევთ გასინჯოთ','საქართველოს სამი გემო','ქართული სუფრის კლასიკა','ქალაქური ხინკალი','ჩაქაფული','ღორის მწვადი']}[lang];
 const picks=[['khinkali',0,'khinkali'],['soups',0,'soups'],['grill',0,'grill']];
 $('recommendations').hidden=!!query;
 $('recommendations').innerHTML=`<div class="recommend-heading"><p>${copy[1]}</p><h2 id="recommend-title">${copy[0]}</h2><span>${copy[2]}</span></div><div class="recommend-grid">${picks.map(([category,index,drawing],i)=>{
 const d=categories.find(c=>c[0]===category)[4][index];
 const price=d[3]===null?t.unknown:escapeHTML(lang==='en'?d[3].replaceAll(',','.'):d[3])+' ₾';
 return `<a class="recommend-card" href="#dish-${category}-${index}">${icon(drawing)}<span class="recommend-name">${copy[i+3]}</span><span class="recommend-price ${d[3]===null?'unknown':''}">${price}</span>${equivalentHTML(d[3])}${category==='khinkali'?`<span class="recommend-unit">${t.unit}</span>`:''}<span class="recommend-arrow" aria-hidden="true">↗</span></a>`;
 }).join('')}</div>`;
}
function render(){const t=ui[lang],ix=languageIndex(),query=$('search').value.trim().toLocaleLowerCase();renderRecommendations(ix,query);document.documentElement.lang=lang;document.title=t.brand+' · '+t.menu;for(const [id,k] of [['brand','brand'],['subtitle','sub'],['address','address'],['call','call'],['map','map'],['contact-note','contact'],['menu-label','menu'],['currency','currency'],['note','note'],['top','top'],['footer-note','footer'],['empty','empty']])$(id).textContent=t[k];$('call').innerHTML=icon('phone')+'<span>'+t.call+'</span>';$('map').innerHTML=icon('map')+'<span>'+t.map+'</span>';$('top').innerHTML=icon('up')+'<span>'+t.top+'</span>';$('search-icon').innerHTML=icon('search');$('clear').innerHTML=icon('close');$('search').placeholder=t.search;$('search').setAttribute('aria-label',t.search);$('section-select').setAttribute('aria-label',t.menu);$('categories').setAttribute('aria-label',t.menu);$('clear').setAttribute('aria-label',lang==='ru'?'Очистить поиск':lang==='en'?'Clear search':'ძიების გასუფთავება');document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===lang)));let visible=[];let count=0;const html=categories.map((c,i)=>{const dishes=c[4].filter(d=>!query||[...d.slice(0,3),...(d[4]||[]),...(d[6]||[]).flat(),...c.slice(1,4)].join(' ').toLocaleLowerCase().includes(query));if(!dishes.length)return '';visible.push(c);count+=dishes.length;return `<section id="${c[0]}"><div class="section-title">${icon(c[0])}<h2>${escapeHTML(c[ix+1])}</h2><small>${String(i+1).padStart(2,'0')}</small></div>${dishes.map(d=>`<article id="dish-${c[0]}-${c[4].indexOf(d)}" class="dish ${d[5]?'with-photo':''}"><div class="dish-copy"><h3>${escapeHTML(d[ix])}</h3>${d[4]?`<p>${escapeHTML(d[4][ix])}</p>`:''}${c[0]==='khinkali'?`<p>${t.unit}</p>`:''}</div><div class="dish-actions">${priceBlock(d)}${equivalentHTML(d[3])}${addButton(c[0]+':'+c[4].indexOf(d))}</div>${d[5]?`<details class="dish-photo"><summary>${icon('photo')} ${t.viewPhoto}</summary><figure><img src="assets/${d[5].includes('.')?d[5]:d[5]+'.png'}" alt="${escapeHTML(d[ix])}" loading="lazy" width="1536" height="1024"><figcaption>${t.photo}</figcaption></figure></details>`:''}</article>`).join('')}</section>`}).join('');$('menu').innerHTML=html;$('categories').innerHTML=visible.map(c=>`<a href="#${c[0]}">${icon(c[0])}<span>${escapeHTML(c[ix+1])}</span></a>`).join('');$('section-select').innerHTML=visible.map(c=>`<option value="${c[0]}">${escapeHTML(c[ix+1])}</option>`).join('');$('empty').hidden=count>0;$('clear').hidden=!query;$('section-select').disabled=!count;if(observer)observer.disconnect();observer=new IntersectionObserver(entries=>{const entry=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];if(!entry)return;const id=entry.target.id;$('section-select').value=id;document.querySelectorAll('#categories a').forEach(a=>{const active=a.hash==='#'+id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})},{rootMargin:'-80px 0px -55% 0px',threshold:0});document.querySelectorAll('section').forEach(s=>observer.observe(s));renderList();renderCurrency();}
$('search').addEventListener('input',render);$('clear').onclick=()=>{$('search').value='';render();$('search').focus()};document.querySelectorAll('[data-lang]').forEach(b=>b.onclick=()=>{lang=b.dataset.lang;try{localStorage.setItem('menu-language',lang)}catch{}render()});$('section-select').onchange=e=>{hideNavigation();document.getElementById(e.target.value)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})};$('top').onclick=e=>{e.preventDefault();window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})};render();

const sticky=document.querySelector('.sticky');
const navMarker=$('nav-marker');
let lastScrollY=Math.max(0,window.scrollY),direction=0,travel=0,scrollScheduled=false;
function hideNavigation(){sticky.classList.add('is-hidden');sticky.inert=true;}
function showNavigation(){sticky.classList.remove('is-hidden');sticky.inert=false;}
function updateNavigation(){scrollScheduled=false;const y=Math.max(0,window.scrollY),delta=y-lastScrollY;lastScrollY=y;
 if(navMarker.getBoundingClientRect().top>0||y===0){showNavigation();direction=0;travel=0;return;}
 if(!delta)return;const nextDirection=Math.sign(delta);if(nextDirection!==direction){direction=nextDirection;travel=0;}travel+=Math.abs(delta);
 if(travel>=8){if(direction>0)hideNavigation();else showNavigation();travel=0;}
}
window.addEventListener('scroll',()=>{if(!scrollScheduled){scrollScheduled=true;requestAnimationFrame(updateNavigation)}},{passive:true});
$('categories').addEventListener('click',e=>{if(e.target.closest('a'))hideNavigation()});

// Pause ornament motion outside the viewport and while the tab is hidden.
const animatedHeader=document.querySelector('header');
let headerVisible=false;
function syncHeaderMotion(){
 if(headerVisible&&!document.hidden)animatedHeader.classList.add('motion-active');
 else animatedHeader.classList.remove('motion-active');
}
const headerMotionObserver=new IntersectionObserver(entries=>{
 headerVisible=entries[0].isIntersecting;
 syncHeaderMotion();
},{threshold:0});
headerMotionObserver.observe(animatedHeader);
document.addEventListener('visibilitychange',syncHeaderMotion);

$('recommendations').addEventListener('click',e=>{if(e.target.closest('a'))hideNavigation()});
