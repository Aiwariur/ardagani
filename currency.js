// Reference rates are foreign currency per one GEL. All ordering amounts stay in GEL.
const currencyCopy={
 ru:{label:'Примерная цена в вашей валюте',USD:'Доллары $',EUR:'Евро €',RUB:'Рубли ₽',base:'Цены и оплата в лари.',note:'Пересчёт примерный. Оплата в лари.',date:'Курс от',unavailable:'Курс сейчас недоступен. Цены показаны в лари.'},
 en:{label:'Estimated price in your currency',USD:'Dollars $',EUR:'Euros €',RUB:'Rubles ₽',base:'Prices and payment in Georgian lari.',note:'Conversion is approximate. Payment in lari.',date:'Rates dated',unavailable:'Exchange rates are unavailable. Prices are shown in lari.'},
 ka:{label:'სავარაუდო ფასი თქვენს ვალუტაში',USD:'დოლარი $',EUR:'ევრო €',RUB:'რუბლი ₽',base:'ფასები და გადახდა ლარშია.',note:'გადაყვანა მიახლოებითია. გადახდა ლარშია.',date:'კურსის თარიღი:',unavailable:'კურსი ამჟამად მიუწვდომელია. ფასები ნაჩვენებია ლარში.'}
};
const rateURL='https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/gel.json';
// Verified deployment snapshot; used during loading or a short network outage.
let exchangeRates={date:'2026-10-05',gel:{usd:0.38529756,eur:0.34452292,rub:32.31111607}};
let displayCurrency='USD',ratesRequested=false;
function validRates(data){
 if(!data||!/^\d{4}-\d{2}-\d{2}$/.test(data.date)||!data.gel)return false;
 const age=Date.now()-Date.parse(data.date+'T00:00:00Z');
 return Number.isFinite(age)&&age>=-86400000&&age<=7*86400000&&['usd','eur','rub'].every(key=>typeof data.gel[key]==='number'&&Number.isFinite(data.gel[key])&&data.gel[key]>0);
}
try{
 const preferred=localStorage.getItem('ardagani-currency-v1');if(['USD','EUR','RUB'].includes(preferred))displayCurrency=preferred;
 const cached=JSON.parse(localStorage.getItem('ardagani-rates-v1')||'null');if(validRates(cached)&&cached.date>=exchangeRates.date)exchangeRates=cached;
}catch{}
function equivalentText(prices){
 if(prices===null||prices===undefined||!validRates(exchangeRates))return '';
 const amounts=typeof prices==='number'?[prices]:String(prices).split('/').map(p=>Number(p.trim().replace(',','.')));
 if(!amounts.every(p=>Number.isFinite(p)&&p>=0))return '';
 const digits=displayCurrency==='RUB'?0:2,locale=lang==='ru'?'ru-RU':lang==='ka'?'ka-GE':'en-US';
 const formatted=amounts.map(p=>new Intl.NumberFormat(locale,{minimumFractionDigits:digits,maximumFractionDigits:digits}).format(p*exchangeRates.gel[displayCurrency.toLowerCase()]));
 return '≈ '+formatted.join(' / ')+' '+({USD:'$',EUR:'€',RUB:'₽'}[displayCurrency]);
}
function equivalentHTML(prices){const text=equivalentText(prices);return `<span class="price-equivalent" data-gel-prices="${prices===null?'':prices}" ${text?'':'hidden'}>${text}</span>`;}
function renderCurrency(){
 const t=currencyCopy[lang];document.getElementById('currency-label').textContent=t.label;
 document.querySelectorAll('[data-currency]').forEach(b=>{b.textContent=t[b.dataset.currency];b.setAttribute('aria-pressed',String(b.dataset.currency===displayCurrency));});
 const note=validRates(exchangeRates)?t.note+' '+t.date+' '+new Intl.DateTimeFormat(lang==='ru'?'ru-RU':lang==='ka'?'ka-GE':'en-US',{timeZone:'UTC'}).format(new Date(exchangeRates.date+'T00:00:00Z'))+'.':t.unavailable;
 document.getElementById('currency-note').textContent=note;
 document.querySelectorAll('[data-gel-prices]').forEach(el=>{const text=el.dataset.gelPrices===''?'':equivalentText(el.dataset.gelPrices);el.textContent=text;el.hidden=!text;});
 // Recalculate only display text; retain quantities and GEL totals.
 const total=selections.reduce((sum,row)=>sum+(dishOptions(row.id)[row.option].price||0)*row.quantity,0);
 const equivalent=equivalentText(total/100),el=document.getElementById('list-total-equivalent');el.textContent=equivalent;el.hidden=!selections.length||!equivalent;
 if(!ratesRequested)refreshRates();
}
async function refreshRates(){
 ratesRequested=true;
 try{
  const response=await fetch(rateURL,{signal:AbortSignal.timeout(8000)});if(!response.ok)throw new Error('Rate service unavailable');
  const data=await response.json();if(!validRates(data)||data.date<exchangeRates.date)throw new Error('Invalid or old rates');
  exchangeRates={date:data.date,gel:{usd:data.gel.usd,eur:data.gel.eur,rub:data.gel.rub}};
  try{localStorage.setItem('ardagani-rates-v1',JSON.stringify(exchangeRates));}catch{}
 }catch{}finally{renderCurrency();}
}
document.querySelectorAll('[data-currency]').forEach(b=>b.addEventListener('click',()=>{
 displayCurrency=b.dataset.currency;try{localStorage.setItem('ardagani-currency-v1',displayCurrency);}catch{}
 renderCurrency();
}));
