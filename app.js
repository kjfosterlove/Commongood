
const products = [
  {id:'laundry', name:'Laundry Detergent Powder', category:'Laundry', refill:true, pantry:true, unit:'oz', pricePerUnit:0.42, pantryPrice:14, pantrySize:'2 lb pouch', refillPricingModel:'product-only', pantryPricingModel:'format-cogs', pantryCogs:{productAmountCost:null,packagingCost:null,labelCost:null,laborCost:null,wasteBuffer:null,targetMargin:null}},
  {id:'dryerballs', name:'Wool Dryer Balls', category:'Laundry', refill:false, pantry:true, unit:'set', pantryPrice:18, pantrySize:'set of 3', pantryPricingModel:'format-cogs', pantryCogs:{productAmountCost:null,packagingCost:null,labelCost:null,laborCost:null,wasteBuffer:null,targetMargin:null}},
  {id:'dishwasher', name:'Dishwasher Detergent Powder', category:'Kitchen', refill:true, pantry:true, unit:'oz', pricePerUnit:0.48, pantryPrice:15, pantrySize:'2 lb pouch', refillPricingModel:'product-only', pantryPricingModel:'format-cogs', pantryCogs:{productAmountCost:null,packagingCost:null,labelCost:null,laborCost:null,wasteBuffer:null,targetMargin:null}},
  {id:'dishsoak', name:'Tough Dish Soak', category:'Kitchen', refill:true, pantry:true, unit:'oz', pricePerUnit:0.44, pantryPrice:13, pantrySize:'2 lb pouch', refillPricingModel:'product-only', pantryPricingModel:'format-cogs', pantryCogs:{productAmountCost:null,packagingCost:null,labelCost:null,laborCost:null,wasteBuffer:null,targetMargin:null}},
  {id:'solidsoap', name:'Solid Tallow Dish Soap', category:'Kitchen', refill:false, pantry:true, unit:'bar', pantryPrice:16, pantrySize:'1 bar', pantryPricingModel:'format-cogs', pantryCogs:{productAmountCost:null,packagingCost:null,labelCost:null,laborCost:null,wasteBuffer:null,targetMargin:null}},
  {id:'allpurpose', name:'All-Purpose Cleaner', category:'Home', refill:true, pantry:true, unit:'oz', pricePerUnit:0.55, pantryPrice:12, pantrySize:'16 oz bottle', refillPricingModel:'product-only', pantryPricingModel:'format-cogs', pantryCogs:{productAmountCost:null,packagingCost:null,labelCost:null,laborCost:null,wasteBuffer:null,targetMargin:null}},
  {id:'glasscleaner', name:'Glass Cleaner', category:'Home', refill:true, pantry:true, unit:'oz', pricePerUnit:0.50, pantryPrice:11, pantrySize:'16 oz bottle', refillPricingModel:'product-only', pantryPricingModel:'format-cogs', pantryCogs:{productAmountCost:null,packagingCost:null,labelCost:null,laborCost:null,wasteBuffer:null,targetMargin:null}},
  {id:'linen', name:'Room & Linen Spray', category:'Home', refill:true, pantry:true, unit:'oz', pricePerUnit:1.25, pantryPrice:18, pantrySize:'8 oz bottle', refillPricingModel:'product-only', pantryPricingModel:'format-cogs', pantryCogs:{productAmountCost:null,packagingCost:null,labelCost:null,laborCost:null,wasteBuffer:null,targetMargin:null}},
  {id:'miswak', name:'Miswak Toothbrush', category:'Personal Care', refill:false, pantry:true, unit:'each', pantryPrice:7, pantrySize:'1 toothbrush', pantryPricingModel:'format-cogs', pantryCogs:{productAmountCost:null,packagingCost:null,labelCost:null,laborCost:null,wasteBuffer:null,targetMargin:null}},
  {id:'beard', name:'Beard Oil Cream', category:'Eloah', refill:false, pantry:true, unit:'jar', pantryPrice:24, pantrySize:'1 jar', pantryPricingModel:'format-cogs', pantryCogs:{productAmountCost:null,packagingCost:null,labelCost:null,laborCost:null,wasteBuffer:null,targetMargin:null}},
  {id:'magnesium', name:'Magnesium Balm', category:'Eloah', refill:false, pantry:true, unit:'jar', pantryPrice:28, pantrySize:'1 jar', pantryPricingModel:'format-cogs', pantryCogs:{productAmountCost:null,packagingCost:null,labelCost:null,laborCost:null,wasteBuffer:null,targetMargin:null}},
  {id:'tallow', name:'Tallow Lotion', category:'Eloah', refill:false, pantry:true, unit:'jar', pantryPrice:20, pantrySize:'2 oz jar', pantryPricingModel:'format-cogs', pantryCogs:{productAmountCost:null,packagingCost:null,labelCost:null,laborCost:null,wasteBuffer:null,targetMargin:null}},
  {id:'lip', name:'Lip Balm', category:'Eloah', refill:false, pantry:true, unit:'tube', pantryPrice:15, pantrySize:'5 ml', pantryPricingModel:'format-cogs', pantryCogs:{productAmountCost:null,packagingCost:null,labelCost:null,laborCost:null,wasteBuffer:null,targetMargin:null}},
  {id:'callus', name:'Callus & Cuticle Balm', category:'Eloah', refill:false, pantry:true, unit:'jar', pantryPrice:30, pantrySize:'1.5 oz', pantryPricingModel:'format-cogs', pantryCogs:{productAmountCost:null,packagingCost:null,labelCost:null,laborCost:null,wasteBuffer:null,targetMargin:null}}
];
products.push(...getOwnerProducts());
applyProductOverrides();
restoreAssumedPricingSources();

const glass = [
  {id:'g1', name:'Vintage Clear Canister', price:14, tare:18.4, imageUrl:'', imageAlt:'Vintage clear glass canister'},
  {id:'g2', name:'Amber Pump Bottle', price:10, tare:9.2, imageUrl:'', imageAlt:'Amber glass pump bottle'},
  {id:'g3', name:'Wide Mouth Mason Jar', price:6, tare:12.8, imageUrl:'', imageAlt:'Wide mouth mason jar'},
  {id:'g4', name:'One-of-a-Kind Estate Jar', price:18, tare:21.1, imageUrl:'', imageAlt:'One-of-a-kind estate jar'}
];

let cart = JSON.parse(localStorage.getItem('cg_cart') || '[]');
let savedContainers = JSON.parse(localStorage.getItem('cg_containers') || '[]');
const ownerPassword='Refillery2026!';
const ownerSessionDays=90;
let adminUnlocked = ownerSessionActive();
const defaultHourlyLaborRate=30;

function money(n){ return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n); }
function escapeHTML(value){
  return String(value ?? '').replace(/[&<>"']/g, char=>({
    '&':'&amp;',
    '<':'&lt;',
    '>':'&gt;',
    '"':'&quot;',
    "'":'&#039;'
  }[char]));
}
function productPricingSource(p){ return p.pricingSource || 'assumed'; }
function productCogsSource(p){ return p.cogsSource || 'missing'; }
const productStatusOptions=[
  {value:'active',label:'Active / customer visible'},
  {value:'testing',label:'Testing'},
  {value:'future',label:'Future product'},
  {value:'inactive',label:'Inactive for now'},
  {value:'discontinued',label:'Discontinued'}
];
function productStatus(p){
  if(p.status) return p.status;
  return p.active === false ? 'inactive' : 'active';
}
function productStatusLabel(status){
  return productStatusOptions.find(option=>option.value===status)?.label.replace(' / customer visible','') || 'Inactive';
}
function productStatusBadge(p){
  const status=productStatus(p);
  return `<span class="badge ${status}">${productStatusLabel(status)}</span>`;
}
function isProductActive(p){ return productStatus(p)==='active'; }
function getOwnerProducts(){ return JSON.parse(localStorage.getItem('cg_owner_products')||'[]'); }
function saveOwnerProducts(ownerProducts){ localStorage.setItem('cg_owner_products',JSON.stringify(ownerProducts)); }
function getProductOverrides(){ return JSON.parse(localStorage.getItem('cg_product_overrides')||'{}'); }
function saveProductOverrides(overrides){ localStorage.setItem('cg_product_overrides',JSON.stringify(overrides)); }
function applyProductOverrides(){
  const overrides=getProductOverrides();
  products.forEach(product=>{
    if(overrides[product.id]) Object.assign(product, overrides[product.id]);
  });
}
function restoreAssumedPricingSources(){
  let changed=false;
  const overrides=getProductOverrides();
  products.forEach(product=>{
    if(!product.ownerCreated && product.pricingSource==='entered' && !product.pricingManuallyConfirmed){
      product.pricingSource='assumed';
      overrides[product.id]={...(overrides[product.id] || {}), pricingSource:'assumed'};
      changed=true;
    }
  });
  if(changed) saveProductOverrides(overrides);
}
function persistProduct(product){
  const ownerProducts=getOwnerProducts();
  const ownerIndex=ownerProducts.findIndex(item=>item.id===product.id);
  if(ownerIndex>=0){
    ownerProducts[ownerIndex]={...ownerProducts[ownerIndex],...product};
    saveOwnerProducts(ownerProducts);
  } else {
    const overrides=getProductOverrides();
    overrides[product.id]={...overrides[product.id],...product};
    saveProductOverrides(overrides);
  }
}
function slugifyProductName(name){
  const base=(name || 'product').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') || 'product';
  let id=base;
  let n=2;
  while(products.some(product=>product.id===id)){
    id=`${base}-${n}`;
    n++;
  }
  return id;
}
function sourceLabel(source){
  if(source==='entered') return 'Entered from COGS';
  if(source==='customer') return 'Customer entered';
  if(source==='missing') return 'Not entered yet';
  return 'Assumed price';
}
function sourceBadge(source){ return `<span class="source-badge ${source}">${sourceLabel(source)}</span>`; }
function pantryCogsFormula(){ return 'Product amount + package + label + labor + waste buffer, then target margin'; }
function numberOrNull(value){
  const number=parseFloat(value);
  return Number.isFinite(number) ? number : null;
}
function pricingModelLabel(model){
  if(model==='format-cogs') return 'Format COGS';
  if(model==='product-only') return 'Product only';
  return 'Not set';
}
function pantryVariants(product){
  const saved=Array.isArray(product.pantryVariants) ? product.pantryVariants.filter(variant=>variant && variant.size) : [];
  if(saved.length) return saved.map((variant,index)=>({
    id:variant.id || `size-${index}`,
    size:variant.size,
    price:Number.isFinite(Number(variant.price)) ? Number(variant.price) : 0,
    packageCost:Number.isFinite(Number(variant.packageCost)) ? Number(variant.packageCost) : null,
    labelCost:Number.isFinite(Number(variant.labelCost)) ? Number(variant.labelCost) : null,
    notes:variant.notes || ''
  }));
  if(product.pantry) return [{id:'default',size:product.pantrySize || 'Pantry Ready',price:Number(product.pantryPrice) || 0,packageCost:null,labelCost:null,notes:''}];
  return [];
}
function variantKey(productId, variantId){ return `${productId}::${variantId}`; }
function findPantryVariant(productId, variantId){
  const product=products.find(item=>item.id===productId);
  const variant=product ? pantryVariants(product).find(item=>item.id===variantId) : null;
  return {product,variant};
}
function parseVariantKey(key){
  const [productId, variantId='default']=String(key || '').split('::');
  return findPantryVariant(productId, variantId);
}
function parsePantryVariantLines(text, defaultSize, defaultPrice){
  const variants=[];
  if(defaultSize) variants.push({id:'default',size:defaultSize,price:defaultPrice ?? 0,packageCost:null,labelCost:null,notes:''});
  (text || '').split(/\n+/).map(line=>line.trim()).filter(Boolean).forEach((line,index)=>{
    const [sizePart, pricePart]=line.split('|').map(part=>part?.trim());
    if(!sizePart) return;
    variants.push({
      id:`size-${index+1}`,
      size:sizePart,
      price:numberOrNull(pricePart) ?? 0,
      packageCost:null,
      labelCost:null,
      notes:''
    });
  });
  return variants;
}
function glassPhoto(g){
  return g.imageUrl
    ? `<img class="glass-photo" src="${g.imageUrl}" alt="${g.imageAlt || g.name}">`
    : `<div class="glass-photo glass-photo-empty" aria-hidden="true"></div>`;
}
function glassMeta(g){ return `Tare ${g.tare} oz · ${money(g.price)} ${sourceBadge('assumed')}`; }
function getSales(){ return JSON.parse(localStorage.getItem('cg_sales')||'[]'); }
function saveSales(sales){ localStorage.setItem('cg_sales',JSON.stringify(sales)); }
function getInventoryItems(){ return JSON.parse(localStorage.getItem('cg_inventory_items')||'[]'); }
function saveInventoryItems(items){ localStorage.setItem('cg_inventory_items',JSON.stringify(items)); }
function getMobileRefillRequests(){ return JSON.parse(localStorage.getItem('cg_mobile_refill_requests')||'[]'); }
function saveMobileRefillRequests(requests){ localStorage.setItem('cg_mobile_refill_requests',JSON.stringify(requests)); }
function getOwnerSettings(){ return JSON.parse(localStorage.getItem('cg_owner_settings')||'{}'); }
function saveOwnerSettings(settings){ localStorage.setItem('cg_owner_settings',JSON.stringify(settings)); }
function saveOwnerSettingsFromForm(){
  const settings={
    venmoHandle:document.getElementById('settingVenmoHandle')?.value.trim() || '',
    returnedCheckFee:document.getElementById('settingReturnedCheckFee')?.value.trim() || '',
    storeMode:document.getElementById('settingStoreMode')?.value || 'Self-service',
    alainaPhone:document.getElementById('settingAlainaPhone')?.value.trim() || '',
    kaeleaPhone:document.getElementById('settingKaeleaPhone')?.value.trim() || ''
  };
  saveOwnerSettings(settings);
  const message=document.getElementById('settingsMessage');
  if(message) message.textContent='Settings saved.';
  showAdmin('settings');
}
function ownerTextContacts(){
  const settings=getOwnerSettings();
  return [
    {name:'Kaelea',phone:settings.kaeleaPhone || ''},
    {name:'Alaina',phone:settings.alainaPhone || ''}
  ];
}
function smsHref(phone, body){
  const clean=normalizePhone(phone);
  return clean ? `sms:${clean}?body=${encodeURIComponent(body)}` : '';
}
function ownerSmsHrefForRequest(request){
  const numbers=ownerTextContacts().map(contact=>normalizePhone(contact.phone)).filter(Boolean);
  if(!numbers.length) return '';
  return `sms:${numbers.join(',')}?body=${encodeURIComponent(mobileRequestCopyText(request))}`;
}
function ownerTextLinksForRequest(request){
  const href=ownerSmsHrefForRequest(request);
  const missing=ownerTextContacts().filter(contact=>!normalizePhone(contact.phone)).map(contact=>contact.name);
  const individual=ownerTextContacts().map(contact=>{
    const contactHref=smsHref(contact.phone, mobileRequestCopyText(request));
    return contactHref ? `<a class="quiet text-link" href="${contactHref}">Text ${contact.name}</a>` : '';
  }).join('');
  if(href && !missing.length) return `<a class="secondary text-link" href="${href}">Text Kaelea and Alaina</a>${individual}<p class="small">If your phone only opens one recipient, use the individual text buttons too.</p>`;
  if(href) return `<a class="secondary text-link" href="${href}">Text saved owner numbers</a>${individual}<span class="small">${missing.join(' and ')} phone needed in Settings</span>`;
  return '<span class="small">Owner phone numbers needed in Settings before text links are ready.</span>';
}
function getCustomerProfiles(){ return JSON.parse(localStorage.getItem('cg_customer_profiles')||'{}'); }
function saveCustomerProfiles(profiles){ localStorage.setItem('cg_customer_profiles',JSON.stringify(profiles)); }
function normalizePhone(phone){ return String(phone || '').replace(/\D/g,''); }
function lastCustomerProfile(){
  const profiles=Object.values(getCustomerProfiles());
  return profiles.sort((a,b)=>new Date(b.updatedAt || 0)-new Date(a.updatedAt || 0))[0] || null;
}
function profileForPhone(phone){
  const key=normalizePhone(phone);
  return key ? getCustomerProfiles()[key] || null : null;
}
function rememberCustomerProfile(request){
  const key=normalizePhone(request.phone);
  if(!key) return;
  const profiles=getCustomerProfiles();
  profiles[key]={
    name:request.name,
    phone:request.phone,
    location:request.location || '',
    textUpdates:!!request.textUpdates,
    updatedAt:new Date().toISOString()
  };
  saveCustomerProfiles(profiles);
}
function prefillMobileCustomerFromPhone(){
  const phone=document.getElementById('mobilePhone')?.value;
  const profile=profileForPhone(phone);
  const note=document.getElementById('mobileProfileNote');
  if(!normalizePhone(phone)){
    if(note) note.textContent='Enter your phone number first. If it matches a previous Pantry Ready delivery request from this device, saved delivery details can fill in.';
    return;
  }
  if(!profile){
    if(note) note.textContent='No saved delivery details found for this phone number on this device.';
    return;
  }
  const name=document.getElementById('mobileName');
  const location=document.getElementById('mobileLocation');
  const textUpdates=document.getElementById('mobileTextUpdates');
  if(name && !name.value.trim()) name.value=profile.name || '';
  if(location && !location.value.trim()) location.value=profile.location || '';
  if(textUpdates) textUpdates.checked=profile.textUpdates !== false;
  if(note) note.textContent='Saved delivery details filled in for this phone number.';
}
function ownerSessionActive(){
  const expires=Number(localStorage.getItem('cg_owner_session_expires') || 0);
  return Date.now() < expires;
}
function rememberOwnerSession(){
  const expires=Date.now() + ownerSessionDays*24*60*60*1000;
  localStorage.setItem('cg_owner_session_expires',String(expires));
}
function requestStatusBadge(status){
  const key=(status || 'New').toLowerCase().replace(/\s+/g,'-');
  return `<span class="source-badge ${key}">${escapeHTML(status || 'New')}</span>`;
}
function mobileRequestStatusLabel(request){
  if(request.orderCompleted || request.status==='Completed') return 'Completed';
  if(request.delivered || request.status==='Delivered' || request.status==='Closed') return 'Delivered';
  if(request.scheduled || request.status==='Packed') return 'Scheduled';
  return request.status || 'New';
}
function mobileRequestOpen(request){ return !request.orderCompleted && !['Completed','Closed'].includes(request.status); }
function generatePasscode(){
  const words=['Olive','Fig','Vine','Lamp','Manna','Mercy','Grace','Cedar','Dove','Lily','Bread','Branch'];
  const word=words[Math.floor(Math.random()*words.length)];
  const number=Math.floor(100+Math.random()*900);
  return `${word}-${number}`;
}
function getCheckout(){
  if(!window.currentCheckout) window.currentCheckout={passcode:generatePasscode()};
  return window.currentCheckout;
}
function varianceStatus(expected, entered){
  if(!Number.isFinite(entered)) return 'Not counted';
  const variance=entered-expected;
  if(Math.abs(variance)<0.005) return 'Matched';
  return variance>0 ? 'Over' : 'Short';
}
function varianceBadge(expected, entered){
  const status=varianceStatus(expected, entered);
  const key=status.toLowerCase().replace(' ','-');
  return `<span class="source-badge ${key}">${status}</span>`;
}
function getMarketingConcepts(){ return JSON.parse(localStorage.getItem('cg_marketing_concepts')||'[]'); }
function saveMarketingConcepts(concepts){ localStorage.setItem('cg_marketing_concepts',JSON.stringify(concepts)); }
const backupKeys=[
  'cg_owner_products',
  'cg_product_overrides',
  'cg_owner_settings',
  'cg_inventory_items',
  'cg_sales',
  'cg_mobile_refill_requests',
  'cg_customer_profiles',
  'cg_marketing_concepts',
  'cg_post_kits',
  'cg_containers',
  'cg_cart'
];
function backupPayload(){
  const data={};
  backupKeys.forEach(key=>{ data[key]=localStorage.getItem(key); });
  return {app:'Common Good',version:1,exportedAt:new Date().toISOString(),data};
}
function downloadDataBackup(){
  const payload=JSON.stringify(backupPayload(),null,2);
  const blob=new Blob([payload],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download=`common-good-backup-${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  const message=document.getElementById('backupMessage');
  if(message) message.textContent='Backup downloaded. Keep that file somewhere safe.';
}
function restoreDataBackup(){
  const input=document.getElementById('restoreBackupFile');
  const file=input?.files?.[0];
  const message=document.getElementById('backupMessage');
  if(!file){
    if(message) message.textContent='Choose a backup file first.';
    return;
  }
  const reader=new FileReader();
  reader.onload=()=>{
    try{
      const backup=JSON.parse(reader.result);
      if(!backup?.data) throw new Error('Missing backup data.');
      backupKeys.forEach(key=>{
        if(Object.prototype.hasOwnProperty.call(backup.data,key)){
          if(backup.data[key]===null || backup.data[key]===undefined) localStorage.removeItem(key);
          else localStorage.setItem(key,backup.data[key]);
        }
      });
      alert('Backup restored. The app will reload so the restored data appears.');
      location.reload();
    } catch(error){
      if(message) message.textContent='That backup file could not be restored.';
    }
  };
  reader.readAsText(file);
}
function marketingWords(text){
  return (text||'').toLowerCase().replace(/[^a-z0-9 ]/g,' ').split(/\s+/).filter(word=>word.length>3);
}
function marketingSimilarity(a,b){
  const aWords=new Set(marketingWords(a));
  const bWords=new Set(marketingWords(b));
  if(!aWords.size || !bWords.size) return 0;
  let shared=0;
  aWords.forEach(word=>{ if(bWords.has(word)) shared++; });
  return shared / Math.min(aWords.size,bWords.size);
}
function marketingSeedDetails(product){
  return [
    `Show ${product.name} in a real Common Good setting, not a staged stock-photo scene.`,
    'Use warm natural light, useful glass, linen, wood, and quiet everyday surfaces.',
    'Avoid invented claims, exaggerated before/after promises, and fake label text.',
    'If the label matters, leave room for approved label artwork to be placed later.'
  ];
}
function marketingPick(list, seed){
  if(!list.length) return '';
  return list[Math.abs(seed) % list.length];
}
function marketingSeed(product, goal, platform, contentType){
  return `${product.id}|${goal}|${platform}|${contentType}|${Date.now()}`.split('').reduce((sum,char)=>sum+char.charCodeAt(0),0);
}
const marketingPostFocuses=[
  {id:'product', name:'Product', subject:'Product post', cue:'Sell or teach around a specific Common Good product.'},
  {id:'home', name:'Home Journal', subject:'Thoughtful home journal', cue:'Document the real rhythms around a thoughtful home, then let Common Good products fit naturally where they belong.'},
  {id:'market', name:'Market / Event', subject:'Market announcement', cue:'Help people know where Common Good will be, what to expect, and why to stop by.'},
  {id:'company', name:'Company / Brand', subject:'Common Good story', cue:'Tell the story, point of view, standards, or behind-the-scenes life of Common Good.'},
  {id:'education', name:'Education', subject:'Educational post', cue:'Teach something useful so the audience trusts Common Good more after reading.'},
  {id:'mission', name:'Mission', subject:'Mission post', cue:'Connect the post to the customer’s mission for their home, not only Common Good’s mission.'},
  {id:'founders', name:'Meet the Founders', subject:'Founder story', cue:'Make the people behind Common Good feel real, grounded, and trustworthy.'},
  {id:'reel', name:'Reel / Trend Idea', subject:'Reel concept', cue:'Create a short-form video concept with a hook, visual beats, audio direction, and caption.'},
  {id:'place', name:'Place / Community', subject:'Place-based post', cue:'Root the post in small-town Nebraska, local markets, and the surrounding community.'}
];
const marketingStoryRules=[
  'Tell a true story before trying to persuade.',
  'Each paragraph must introduce new information.',
  'Specific beats general: names, places, moments, decisions, and events stay in the story.',
  'Never replace factual details with abstract brand messaging.',
  'Document the building of a thoughtful home and business like a page from a journal.'
];
const marketingHomeJournalTopics=[
  'making broth',
  'organizing the pantry',
  'choosing jars',
  'drying herbs',
  'teaching laundry chemistry',
  'sharpening knives',
  'making lotion',
  'explaining amber glass',
  'market prep',
  'family meals',
  'seed starting',
  'bread baking',
  'preserving food'
];
function marketingFocusById(id){ return marketingPostFocuses.find(focus=>focus.id===id) || marketingPostFocuses[0]; }
function marketingSubjectFor(focus, product){
  if(focus.id==='product') return product;
  return {id:focus.id, name:focus.subject, category:'Common Good', pantry:false, refill:false};
}
function marketingHasSourceStory(goal){
  const text=(goal||'').trim();
  return text.length>180 || /(^|\s)(I|we|she|he)\s/i.test(text) || text.includes('"');
}
function marketingNormalizeStory(goal){
  return (goal||'')
    .trim()
    .replace(/\r/g,'')
    .replace(/[ \t]+\n/g,'\n')
    .replace(/\n{3,}/g,'\n\n');
}
function marketingStoryFrameworkCaption(goal, focus){
  const paragraphs=marketingNormalizeStory(goal).split(/\n\n+/).map(p=>p.trim()).filter(Boolean);
  const first=paragraphs[0] || 'Start with the first concrete moment.';
  const change=paragraphs[1] || 'Name what changed.';
  const middle=paragraphs.slice(2,-2).join('\n\n') || 'Show the middle of the story through actions, not explanation.';
  const decision=paragraphs.find(p=>/yes|decid|should|chose|kept|brought|moved/i.test(p)) || 'Name the decision someone had to make.';
  const ending=paragraphs.slice(-2,-1)[0] || paragraphs[paragraphs.length-1] || 'Show where the story landed.';
  const today=paragraphs[paragraphs.length-1] || 'Connect the story to what Common Good is building now.';
  return `Story draft based on your notes:\n\n${first}\n\nThen something changed:\n${change}\n\nIn the middle of it:\n${middle}\n\nThe decision point:\n${decision}\n\nWhere it landed:\n${ending}\n\nWhy it matters now:\n${today}`;
}
function marketingFounderOriginCaption(goal){
  const text=marketingNormalizeStory(goal);
  const lower=text.toLowerCase();
  const hasCommonGoodOrigin=lower.includes('alaina') && lower.includes('alaska') && lower.includes('nebraska') && lower.includes('tallow');
  if(!hasCommonGoodOrigin) return null;
  return `Before Common Good had a name, Alaina was building a refillery in Alaska.\n\nShe learned what worked by doing it. She saw what customers came back for, which products made the shelf easier to use, and how simple refills could change the way a home ran day after day.\n\nThen she moved to Nebraska.\n\nAround the same time, I was making tallow skincare by hand. I loved the process, but I kept thinking about the refillery Alaina had already built. It bothered me that a good idea could disappear just because life had moved to a new place.\n\nSo I kept bringing it up.\n\n"We should do this here."\n\nAt first, it was just a sentence that kept coming back. Then it became a conversation. Then it became something we had to decide whether to actually build.\n\nEventually, Alaina said yes.\n\nCommon Good started with that yes: her years of refillery experience, my work with tallow skincare, and the decision to bring both of those things to the same table in Nebraska.\n\nThat is why this matters today. Common Good is not an idea that appeared out of nowhere. It is a good thing from Alaska, a new season in Nebraska, and two people deciding not to let it disappear.`;
}
function marketingFocusCaption(subject, focus, strategy, goal, seed, depth='medium'){
  if(['founders','company','mission','place'].includes(focus.id) && marketingHasSourceStory(goal)){
    if(focus.id==='founders'){
      return marketingFounderOriginCaption(goal) || marketingStoryFrameworkCaption(goal, focus);
    }
    return marketingStoryFrameworkCaption(goal, focus);
  }
  const captions={
    market:[
      `We are packing up for market day.\n\nCome find Common Good for useful home staples, Pantry Ready options, glass, and the kind of simple restocks that are easier to choose in person.\n\nSave this so you know where to find us.`,
      `Market days are for meeting the people behind the products, asking questions, smelling things in person, and finding the staple you did not realize you were almost out of.\n\nCommon Good will be there with practical goods for thoughtful homes.`
    ],
    home:[
      `This is the kind of home Common Good belongs to: broth cooling on the stove, jars finding their place, laundry being solved one practical choice at a time, and ordinary routines becoming a little more cared for.\n\nThe product does not have to be the whole story. It only has to belong honestly inside the life being built around it.`,
      `A thoughtful home is built in small, repeated choices.\n\nSometimes that looks like bread on the counter. Sometimes it is herbs drying in the kitchen. Sometimes it is choosing the jar that will sit on the shelf every week.\n\nCommon Good fits best when it feels like part of that real rhythm.`
    ],
    company:[
      `Common Good is built around a simple idea: the everyday things in a home can be useful, beautiful, and chosen with care.\n\nNot complicated. Not performative. Just small, honest choices that make the ordinary routines feel a little more tended.`,
      `Behind every refill, jar, label, and batch is the same question: does this help someone build the kind of home they are trying to live in?\n\nThat is the heart of Common Good.`
    ],
    education:[
      `A little product knowledge goes a long way.\n\nThe goal is not to make home care more complicated. It is to understand what you are using, why it works, and how to choose the option that fits your actual routine.`,
      `Here is the kind of thing worth knowing before you buy: good home products should be understandable.\n\nClear purpose. Honest ingredients. A routine that makes sense after you bring it home.`
    ],
    mission:[
      `Every home has a quiet mission.\n\nMaybe yours is less waste, fewer mystery ingredients, calmer shelves, better routines, or teaching your children that small choices matter.\n\nCommon Good exists to support that kind of home, one practical choice at a time.`,
      `This is not about buying more things.\n\nIt is about choosing the things that help you build the home you are trying to live in: useful, thoughtful, rooted, and a little more peaceful.`
    ],
    founders:[
      `Hi, we are the people behind Common Good.\n\nWe are building this for real homes: the kind with laundry waiting, dishes in the sink, jars that get used again, and people trying to make better choices without making life harder.`,
      `Common Good did not start because we wanted a polished brand. It started because everyday home products should be easier to understand, more useful to keep around, and honest about what they are.`
    ],
    reel:[
      `Reel idea: start with the tiny real-life problem, show the Common Good answer in motion, then end with the simplest next step.\n\nKeep it warm, useful, and quick enough that someone can understand the point without turning the sound on.`,
      `Short-form idea: show the moment before and after.\n\nBefore: the routine feels annoying or cluttered.\nAfter: one Common Good choice makes it simpler, calmer, or easier to repeat.`
    ],
    place:[
      `Made for real homes, rooted in small-town Nebraska.\n\nCommon Good is shaped by local rhythms: market days, practical families, useful shelves, and the kind of home care that feels better when it is close to the people making it.`,
      `There is something grounding about buying from a place you can actually find on a map.\n\nCommon Good belongs to small-town Nebraska, local markets, and homes that want everyday things chosen with care.`
    ]
  };
  const options=captions[focus.id] || captions.company;
  return marketingPick(options, seed+17);
}
function marketingCaptionExpansion(subject, strategy, focus, depth){
  if(depth==='short') return '';
  const name=subject.name;
  const problem=strategy.detectedProblem;
  const focusExpansions={
    founders:{
      medium:`\n\nIt matters to know who is behind the things you bring into your home. Real people make real decisions here, and we want those decisions to be steady, honest, and worth trusting.`,
      long:`\n\nThe longer story is still unfolding. Common Good is being built out of ordinary needs: laundry that has to get done, dishes that pile up, shelves that need restocking, families trying to choose better without making life harder.\n\nThe founder story is not here to make the business look perfect. It is here to show the heart behind it: practical care, honest work, and a desire to help homes feel a little more grounded.\n\nIf you are new here, welcome. We are building this one useful choice at a time.`,
      education:`\n\nWhen you shop small, trust is part of the purchase. You are not only choosing a product. You are choosing the standards, judgment, and care of the person making decisions behind it.\n\nThat is why we want to be clear about what we believe, what we are learning, and what we will not pretend to know.`,
      story:`\n\nThere is a person behind the labels, the jars, the product testing, the late-night decisions, and the hope that this can become something useful for real homes.\n\nThat is the story worth telling here. Not a perfect brand story, but an honest one.`
    },
    market:{
      medium:`\n\nIf you have been meaning to try Common Good in person, this is your chance. Come see what is on the table, ask questions, and choose the thing that makes sense for your home right now.`,
      long:`\n\nMarket days are not just about selling things from a table. They are where people can smell products, hold the jars, ask questions, compare options, and understand Common Good in real life.\n\nIf you have been curious but unsure where to start, a market is a low-pressure way to meet us, see what is available, and choose one useful thing for your home.`,
      education:`\n\nBefore you come, here is what helps to know: bring questions, bring a list if you have one, and check what is available that day. Some market days are best for Pantry Ready staples, some for glass, some for seasonal items, and some for simply meeting us in person.`,
      story:`\n\nThe table gets packed one item at a time: jars, labels, staples, signage, and the hope that the right person finds the thing they needed that week.`
    },
    home:{
      medium:`\n\nThis kind of content should feel like someone stepped into the real work of home: useful, warm, a little beautiful, and not forced into a sales pitch. The product can appear when it helps the moment, not because every post has to close a sale.`,
      long:`\n\nCommon Good is not only documenting products. It is documenting what it looks like to build a thoughtful home.\n\nThat gives the content room to include broth, bread, seed starting, jars, pantry shelves, laundry chemistry, herbs, market prep, and the small repeated choices that make a home feel tended.\n\nThe sales psychology is still there, but it should work quietly. Instead of pushing a product into the center, show the world where the product naturally makes sense.`,
      education:`\n\nTeach from inside the home, not above it. Start with one useful thing someone is already doing or curious about, explain why it matters, and connect Common Good only where it genuinely helps the routine.`,
      story:`\n\nThe post should feel like a journal page: one real moment, one small change, one useful detail, and one reason it matters in the home being built.`
    },
    company:{
      medium:`\n\nCommon Good has a point of view: everyday products should be useful, understandable, and beautiful enough to enjoy using without becoming precious or complicated.`,
      long:`\n\nCommon Good is not trying to make home care feel more complicated. It is trying to make everyday choices feel clearer.\n\nThe heart of the company is simple: useful products, honest information, beautiful-but-practical tools, and a way to restock the home that feels less wasteful and less frantic.\n\nThat is the kind of business we are building.`,
      education:`\n\nOur standard is simple to say and harder to practice: make it useful, make it understandable, and do not hide the important details. If a product, package, or claim cannot hold up to that, it needs more work.`,
      story:`\n\nEvery business has a beginning. Ours is tied to the ordinary parts of home: the shelf, the sink, the laundry, the market bag, the jar that gets used again.`
    },
    education:{
      medium:`\n\nWhen you understand what something does and why it works, it becomes easier to choose with confidence. That is the whole point of teaching here: less guessing, more clarity.`,
      long:`\n\nThe goal of education is not to overwhelm anyone with information. It is to make one useful thing clearer.\n\nTeach the difference. Name the ingredient. Explain the process. Show the routine. Give people enough understanding to feel confident choosing what fits their home.`,
      education:`\n\nHere is the simple version: one concept, one practical example, one reason it matters, and one next step you can actually use in your home.`,
      story:`\n\nSometimes the best post starts with a question someone asked at market, over a label, or while trying to decide which product belongs in their home.`
    },
    mission:{
      medium:`\n\nThe mission only matters if it helps real homes. Less waste, clearer ingredients, calmer routines, better stewardship: those ideas have to become practical enough to live with.`,
      long:`\n\nThe mission is not to make people feel behind, guilty, or pressured to overhaul their whole home.\n\nIt is to make better choices feel possible in ordinary life. One refill. One jar used again. One product with a clear purpose. One shelf that feels less chaotic.\n\nThat is meaningful because small choices are often the ones we can actually keep making.`,
      education:`\n\nA mission is only real when it changes the decisions: what gets made, what gets packaged, what gets refilled, what claims stay off the label, and what is worth doing even when it costs more time.`,
      story:`\n\nMission shows up in the small decisions no one sees: what gets tested again, what packaging is worth paying for, what claims stay off the label, and what kind of home this is meant to serve.`
    },
    reel:{
      medium:`\n\nThe best short videos usually have one clear point: show the problem, show the motion, show the result, and let people understand the idea quickly.`,
      long:`\n\nFor a reel, think in scenes instead of paragraphs.\n\nScene one: the problem or curiosity hook.\nScene two: the Common Good process or product in motion.\nScene three: the result, shelf, routine, market table, or human moment.\n\nKeep the caption clear enough to support the video without repeating everything on screen.`,
      education:`\n\nA useful reel teaches one thing quickly: what changed, why it matters, and what someone can remember later. The audio should support the point, not distract from it.`,
      story:`\n\nA good reel can feel like a tiny window into the work: hands packing jars, labels going on, a market table coming together, or one household frustration being solved.`
    },
    place:{
      medium:`\n\nThis is not anonymous home care from nowhere. Common Good is rooted in a real place, shaped by local routines, market conversations, and the practical needs of nearby homes.`,
      long:`\n\nSmall-town Nebraska is not just a location tag. It shapes the pace, the practicality, the market conversations, and the kind of products that make sense here.\n\nCommon Good belongs to real homes, local routines, and people who want useful things without losing the warmth of buying close to home.`,
      education:`\n\nLocal should mean more than a pretty word. It should tell you where to find us, how to shop, what is made or packed nearby, and how this work connects back to the community around it.`,
      story:`\n\nPlace is the road to market, the familiar faces, the jars packed in boxes, and the feeling of building something useful close to home.`
    }
  };
  const focusCopy=focusExpansions[focus.id]?.[depth];
  if(focusCopy) return focusCopy;
  if(depth==='medium'){
    return `\n\nPeople do not need more noise on the shelf. They need a choice that makes the routine clearer, easier, or more worth repeating. ${name} gives that moment a practical place to land.`;
  }
  if(depth==='long'){
    return `\n\nHere is the longer story: most homes are built in tiny repeated choices. What gets restocked, what earns a place on the shelf, what feels good enough to use again tomorrow.\n\n${name} is part of that rhythm because it has a real job to do. It should make the routine clearer, easier, or more worth repeating, not just add one more thing to own.\n\nSave this for the next time that routine comes around.`;
  }
  if(depth==='education'){
    return `\n\nA quick note before you buy: ${problem ? `${problem.benefit}.` : `${name} should have a clear purpose in the routine.`} The point is not to make home care more complicated. It is to understand what the product is doing, why it belongs there, and how to use it in a way that actually fits real life.`;
  }
  if(depth==='story'){
    return `\n\nThe story starts in a real-life moment: the chore that keeps repeating, the shelf that needs restocking, the product that either earns its place or does not.\n\n${name} belongs in the story only if it makes that ordinary moment better. That is the bar.`;
  }
  return '';
}
function applyCaptionDepth(caption, subject, strategy, focus, depth, goal=''){
  if(['founders','company','mission','place'].includes(focus.id) && marketingHasSourceStory(goal)){
    return caption;
  }
  return `${caption}${marketingCaptionExpansion(subject, strategy, focus, depth)}`;
}
function marketingPromptDetail(goal, fallback){
  const clean=(goal||'')
    .replace(/\s+/g,' ')
    .replace(/^["']|["']$/g,'')
    .trim();
  if(!clean) return fallback;
  return clean.length>210 ? `${clean.slice(0,207).trim()}...` : clean;
}
function marketingNaturalProductLine(subject, contextProduct, focus){
  const productName=contextProduct?.name || subject.name;
  if(focus.id==='product') return `${productName} earns its place when it makes the routine clearer, easier, or more worth repeating.`;
  if(contextProduct?.name) return `${productName} can be one useful part of that bigger rhythm without needing to take over the whole story.`;
  return 'The useful thing belongs when it makes the real-life moment easier to repeat.';
}
function marketingLensParagraph(lens, subject, strategy, scene){
  const productName=subject.name;
  if(!lens) return `That is where the small choice matters: the routine becomes easier to understand, easier to repeat, and easier to trust.`;
  const problem=strategy.detectedProblem;
  const lines={
    outcome:`The win is simple: the routine feels easier after ${productName} earns its place.`,
    problem:problem ? `${marketingProblemMoment(problem)} is exactly the kind of little frustration that makes a better routine worth trying.` : `${scene} is the problem hiding in plain sight, and the right solution should make it easier.`,
    identity:`This is for the person building a thoughtful home, one useful choice at a time.`,
    values:`Clear ingredients, useful packaging, less waste, local trust, and no inflated promises can all live in the same small choice.`,
    emotion:`There is a quiet relief in choosing the thing that helps the day feel a little more settled.`,
    convenience:`Some days, the best product is the one that helps you keep moving without starting the whole errand over.`,
    financial:`Good value is not the cheapest thing on the shelf. It is the thing that keeps earning its place every time you use it.`,
    simplicity:`Fewer decisions, fewer bottles, fewer mystery products. Just one clearer routine.`,
    quality:`The difference shows up in the details: what it is made from, how it works, and whether it keeps doing its job.`,
    sensory:`Warm glass, clean labels, useful weight, soft light, and the small satisfaction of a shelf that finally makes sense.`,
    story:`A good product story starts with a real moment, a real choice, and a reason it still matters later.`,
    trust:`No mystery and no exaggerated promise. Just a clear product with a clear job in the home.`,
    transformation:`Before, the routine felt cluttered or annoying. After, the next step feels simpler and easier to repeat.`,
    aspiration:`This is the kind of small choice that helps build the home you keep picturing.`,
    belonging:`One refill, one jar, one better restock. Small choices add up faster when they are shared.`,
    scarcity:`If this batch is the one you have been waiting for, this is the moment to bring it home.`,
    curiosity:`The interesting question is not whether the product is pretty. It is why it belongs in the routine at all.`,
    education:`Once you understand the reason behind the product, the choice gets easier to make again next time.`,
    comparison:`Instead of adding another random bottle to the shelf, choose the thing with a clear job.`,
    'social-proof':`There is a reason people come back for the staples that make real life easier.`,
    heritage:`Some home rhythms are old for a reason: jars used again, recipes remembered, skills practiced, and useful things kept close.`,
    modernity:`Traditional sensibility still has to work inside a modern day with errands, laundry, dishes, and full hands.`,
    beauty:`Beauty matters most when it still has a job to do.`,
    environmental:`The impact is physical: fewer throwaways, more refills, and packaging chosen on purpose.`,
    'self-care':`Self care can look like making the repeating parts of the day feel less frantic and more tended.`,
    ritual:`The product belongs inside a ritual: the morning reset, the evening cleanup, the laundry rhythm, or the market restock.`,
    giftability:`A good gift is useful, beautiful, and easy to explain without making the receiver do extra work.`,
    place:`Small-town Nebraska, market days, nearby homes, and useful goods made close enough to ask questions.`,
    legacy:`The things used every day teach quietly: how to care, how to reuse, and what is worth keeping.`,
    mission:`The mission is the home she is trying to build, and this is one small choice that helps her keep building it.`
  };
  return lines[lens.id] || `Use the ${lens.name} lens so the caption has a clear buying reason.`;
}
function marketingContentTypeParagraph(contentType, focus){
  const type=(contentType||'').toLowerCase();
  if(type.includes('reel')) return 'Watch for the tiny before-and-after: the moment that feels annoying, the simple shift, and the routine feeling easier on the other side.';
  if(type.includes('story sequence')) return 'Slide one is the real-life moment. Slide two is the useful detail. Slide three is the small Common Good choice that makes the day feel easier.';
  if(type.includes('ad')) return 'If this is the kind of home you are trying to build, this is an easy place to start.';
  if(type.includes('education')) return 'Once you understand what you are using and why it works, the choice gets a lot easier.';
  if(type.includes('market')) return 'Come see it in person, ask the questions, hold the jars, and choose what actually fits your home this week.';
  if(type.includes('founder')) return 'This is one of the small pieces of the story behind what we are building.';
  if(type.includes('mission')) return 'The mission only matters if it helps the home you are actually trying to build.';
  if(type.includes('caption only')) return 'Here is the whole point: the ordinary routine can be more useful, more honest, and a little more beautiful.';
  return focus.id==='home'
    ? 'The scene matters because this is the life Common Good is meant to belong inside.'
    : 'Better choices have to work in the middle of real laundry, real dishes, real errands, and real weeks.';
}
function marketingEducationOpener(goal, productName){
  const text=(goal||'').toLowerCase();
  if(text.includes('laundry') || text.includes('detergent')){
    return `Laundry feels ordinary until you remember your clothes touch your skin all day.`;
  }
  if(text.includes('amber glass')){
    return `Amber glass is not just a pretty shelf choice. It has a practical job.`;
  }
  if(text.includes('tallow')){
    return `Tallow skincare makes more sense when you understand why the ingredient was used in the first place.`;
  }
  if(text.includes('washing soda') || text.includes('baking soda')){
    return `Washing soda and baking soda do different jobs, and knowing the difference makes cleaning easier.`;
  }
  return `${productName ? `${productName} is easier to choose` : 'A home product is easier to choose'} when you understand what it is supposed to do.`;
}
function marketingProductProof(goal, productName, problem){
  const text=(goal||'').toLowerCase();
  if(problem) return `${productName} earns its place because it ${problem.benefit}.`;
  if(text.includes('laundry') || text.includes('detergent')){
    return `That is why ${productName} is worth talking about: ingredients, amount used, rinse-out, scent, and residue all matter when something lives that close to your body.`;
  }
  if(text.includes('pantry ready') || text.includes('forgot') || text.includes('on the way home')){
    return `That is where Pantry Ready matters: it keeps the better choice available even when you forgot the jar or remembered the errand late.`;
  }
  return `${productName} is not the whole story. It is the useful piece that belongs in the routine when it makes real life easier.`;
}
function marketingQualityCaption(subject, contextProduct, focus, strategy, goal, seed, depth, contentType){
  if(['founders','company','mission','place'].includes(focus.id) && marketingHasSourceStory(goal)){
    return applyCaptionDepth(marketingFocusCaption(subject, focus, strategy, goal, seed, depth), subject, strategy, focus, depth, goal);
  }
  const captionSubject=contextProduct || subject;
  const productName=captionSubject.name;
  const lens=(strategy.selectedLenses||[])[0] || null;
  const fallbackScene=marketingPick([
    'a jar being chosen for the pantry shelf',
    'a kitchen counter in the middle of a normal restock day',
    'laundry, dishes, labels, jars, and the repeating work of home',
    'a market table being packed one useful item at a time'
  ], seed+23);
  const scene=marketingPromptDetail(goal, fallbackScene);
  const problem=strategy.detectedProblem;
  let opener='';
  if(problem){
    opener=`${marketingProblemMoment(problem)}.`;
  } else if(focus.id==='education' || (contentType||'').toLowerCase().includes('education')){
    opener=marketingEducationOpener(goal, productName);
  } else if(focus.id==='home'){
    opener=`This is the Common Good world in real life: ${scene}.`;
  } else if(focus.id==='education'){
    opener=`Here is the useful part: ${scene}.`;
  } else if(focus.id==='market'){
    opener=`Market posts work best when people can picture the stop before they make it: ${scene}.`;
  } else if(focus.id==='reel'){
    opener=`Start with the moment someone recognizes immediately: ${scene}.`;
  } else if(focus.id==='product'){
    opener=`The best product posts start with a real household moment: ${scene}.`;
  } else {
    opener=`Start with something real: ${scene}.`;
  }
  const proof=marketingProductProof(goal, productName, problem);
  const lensLine=marketingLensParagraph(lens, captionSubject, strategy, scene);
  const contentLine=marketingContentTypeParagraph(contentType, focus);
  const cta=(contentType||'').toLowerCase().includes('ad')
    ? `Try it through Common Good the next time this routine comes up.`
    : strategy.cta || 'Save this for the next time the routine comes around.';
  const storyLine=focus.id==='home'
    ? 'That is the point: document the life around the product so the purchase feels like it belongs there.'
    : `${productName} does not have to be loud to be useful. It just has to make sense in the routine.`;
  const educationLine=depth==='education'
    ? `A good rule for home products: if it touches your skin, your dishes, your counters, or your air, it is worth understanding what is in it and how it is meant to work.`
    : '';
  let paragraphs=[
    opener,
    contentLine,
    lensLine,
    proof,
    storyLine,
    educationLine,
    cta
  ].filter(Boolean);
  if(depth==='short'){
    paragraphs=[
      opener,
      problem ? proof : cta
    ];
  }
  if(depth==='medium'){
    paragraphs=[
      opener,
      lensLine,
      proof,
      cta
    ];
  }
  if(depth==='education'){
    paragraphs=[
      opener,
      `What to know: ${lensLine.charAt(0).toLowerCase()}${lensLine.slice(1)}`,
      proof,
      educationLine,
      cta
    ];
  }
  if(depth==='story' || depth==='long'){
    const change=problem ? proof : contentLine;
    paragraphs=[
      opener,
      change,
      lensLine,
      storyLine,
      proof,
      cta
    ];
  }
  return paragraphs.join('\n\n');
}
const marketingBuyingLenses=[
  {id:'outcome', name:'Outcome / Benefit', prompt:'What gets better after they own this?', cue:'Lead with the improved result the customer wants.'},
  {id:'problem', name:'Problem / Pain', prompt:'What frustrates, annoys, or costs them time?', cue:'Name the irritation clearly before presenting the product.'},
  {id:'identity', name:'Identity', prompt:'Who do they believe they are becoming or already are?', cue:'Speak to the homemaker, steward, minimalist, practical parent, or local shopper identity.'},
  {id:'values', name:'Values', prompt:'Why does this product exist?', cue:'Use local, handmade, low-waste, faith-rooted, transparent, or craft values when true.'},
  {id:'emotion', name:'Emotion', prompt:'How should they feel?', cue:'Sell peace, capability, nostalgia, calm, comfort, or pride.'},
  {id:'convenience', name:'Convenience', prompt:'How does this save time or reduce effort?', cue:'Show the fast, grab-and-go, refill-quickly, easy-storage path.'},
  {id:'financial', name:'Financial', prompt:'Where is the value over time?', cue:'Focus on value, concentration, reuse, refill savings, or lasting usefulness without sounding cheap.'},
  {id:'simplicity', name:'Simplicity', prompt:'What decisions or clutter disappear?', cue:'Emphasize fewer bottles, fewer ingredients, one product, or a cleaner routine.'},
  {id:'quality', name:'Quality', prompt:'Why is this actually better?', cue:'Point to ingredients, process, durability, standards, or craftsmanship.'},
  {id:'sensory', name:'Sensory Experience', prompt:'What can they smell, feel, see, hear, or hold?', cue:'Use texture, scent, warm glass, linen, weight, light, and visual details.'},
  {id:'story', name:'Story', prompt:'What memory or origin makes this stick?', cue:'Use founder, family, farm, customer, or why-it-was-created story cues.'},
  {id:'trust', name:'Trust', prompt:'How do we reduce risk?', cue:'Use clear ingredients, sourcing, demonstrations, testimonials, and label transparency.'},
  {id:'transformation', name:'Transformation', prompt:'What is the before and after?', cue:'Paint the old state and the new state in one clear contrast.'},
  {id:'aspiration', name:'Aspiration', prompt:'Who are they becoming?', cue:'Help them imagine the home, rhythm, or legacy they are building.'},
  {id:'belonging', name:'Belonging', prompt:'What movement or community are they joining?', cue:'Use refill community, shop local, slow living, and small choices adding up.'},
  {id:'scarcity', name:'Scarcity', prompt:'Is it truly limited?', cue:'Only mention seasonal, limited batch, harvest, or handmade quantity if true.'},
  {id:'curiosity', name:'Curiosity', prompt:'What information gap makes them stop scrolling?', cue:'Open a loop with a why/how question.'},
  {id:'education', name:'Education', prompt:'What can we teach?', cue:'Explain a useful product, ingredient, or process difference.'},
  {id:'comparison', name:'Comparison', prompt:'What is this a better alternative to?', cue:'Compare gently by naming what this includes or simplifies, not by attacking.'},
  {id:'social-proof', name:'Social Proof', prompt:'Who else trusts it?', cue:'Use customer favorite, repeat buyers, best seller, market favorite, or testimonial when true.'},
  {id:'heritage', name:'Heritage / Tradition', prompt:'What timeless method or memory does it carry?', cue:'Use old recipes, generations, grandma energy, and traditional know-how.'},
  {id:'modernity', name:'Modernity', prompt:'How does tradition fit modern life?', cue:'Balance traditional ingredients with today’s convenience and pace.'},
  {id:'beauty', name:'Beauty', prompt:'What makes it beautiful enough to want?', cue:'Use amber jars, clean labels, warm wood, linen, organized shelves, and quiet design.'},
  {id:'environmental', name:'Environmental Impact', prompt:'What physical waste or impact changes?', cue:'Use fewer bottles, refill instead of replace, reusable jars, compostable packaging.'},
  {id:'self-care', name:'Self Care', prompt:'How does this tend real life?', cue:'Frame small routines as care for the person, home, and day.'},
  {id:'ritual', name:'Ritual', prompt:'What repeatable moment does it belong to?', cue:'Sell the morning, evening, laundry, kitchen, or reset ritual around the product.'},
  {id:'giftability', name:'Giftability', prompt:'Who could this be given to?', cue:'Use hostess, housewarming, new baby, wedding, teacher, or thoughtful gift moments.'},
  {id:'place', name:'Place', prompt:'Where is this rooted?', cue:'Name small-town Nebraska, local markets, and the real Common Good setting.'},
  {id:'legacy', name:'Legacy', prompt:'What gets passed down?', cue:'Use children remembering, jars passed down, stewardship taught, traditions kept.'},
  {id:'mission', name:'Mission', prompt:'What meaningful thing does this help them do?', cue:'Make it about their mission for their home, not just Common Good’s mission.'}
];
function getSelectedMarketingLenses(){
  return [...document.querySelectorAll('input[name="marketingLens"]:checked')]
    .map(input=>marketingBuyingLenses.find(lens=>lens.id===input.value))
    .filter(Boolean);
}
function renderMarketingLensOptions(){
  return marketingBuyingLenses.map(lens=>`
    <label class="lens-option">
      <input type="checkbox" name="marketingLens" value="${lens.id}" onchange="enforceMarketingLensLimit()">
      <span><strong>${lens.name}</strong><small>${lens.prompt}</small></span>
    </label>`).join('');
}
function marketingLensNames(lenses){ return lenses.map(lens=>lens.name).join(', '); }
function selectedMarketingLensInputs(){
  return [...document.querySelectorAll('input[name="marketingLens"]:checked')];
}
function enforceMarketingLensLimit(){
  const selected=selectedMarketingLensInputs();
  const note=document.getElementById('marketingLensNote');
  if(selected.length>3){
    selected.slice(3).forEach(input=>{ input.checked=false; });
    if(note) note.textContent='Use up to 3 buying lenses so the caption has one clear job.';
    return;
  }
  if(note) note.textContent='Pick 1-3. More than that makes the post muddy.';
}
function marketingLensCue(lenses){
  if(!lenses.length) return 'Auto-selected by prompt';
  return lenses.slice(0,4).map(lens=>`${lens.name}: ${lens.cue}`).join(' ');
}
function marketingDetectedProblem(goal){
  const text=(goal||'').toLowerCase();
  const problems=[
    {keys:['static','cling','staticy','satin skirt'], label:'static cling', benefit:'helps reduce static cling so clothes feel easier to wear right out of the dryer'},
    {keys:['wrinkle','wrinkled'], label:'wrinkled laundry', benefit:'helps laundry tumble more freely so pieces come out less bunched and easier to manage'},
    {keys:['dry time','dry faster','dryer time'], label:'long dry times', benefit:'helps separate laundry in the dryer so loads can dry more efficiently'},
    {keys:['streak','streaky','glass marks'], label:'streaky surfaces', benefit:'helps leave everyday surfaces looking clearer and cleaner'},
    {keys:['residue','film','powder left'], label:'leftover residue', benefit:'helps make the cleaning routine feel more finished and reliable'},
    {keys:['odor','smell','stinky','musty'], label:'unwanted odor', benefit:'helps freshen the routine without making the product feel fussy'},
    {keys:['grease','grime','stuck on','stuck-on'], label:'stuck-on mess', benefit:'helps handle the kind of mess that makes you want to quit halfway through'},
    {keys:['dry skin','cracked','rough','chapped'], label:'dry or rough skin', benefit:'helps make daily care feel more comfortable and tended'}
  ];
  return problems.find(problem=>problem.keys.some(key=>text.includes(key))) || null;
}
function marketingNeedsEfficacyAngle(goal){
  return Boolean(marketingDetectedProblem(goal));
}
function marketingProblemMoment(problem){
  if(!problem) return 'that everyday product frustration';
  if(problem.label==='static cling') return 'Staticky skirt, clingy dress, laundry that will not behave';
  if(problem.label==='wrinkled laundry') return 'Clothes twisted together, wrinkled, and harder to put away';
  if(problem.label==='long dry times') return 'A dryer that keeps running while the load still feels damp';
  if(problem.label==='streaky surfaces') return 'Glass and counters that look streaky right after you cleaned them';
  if(problem.label==='leftover residue') return 'A routine that should feel done, but still leaves film behind';
  if(problem.label==='unwanted odor') return 'That moment when clean should actually smell clean';
  if(problem.label==='stuck-on mess') return 'The stuck-on mess that makes the whole chore feel bigger';
  if(problem.label==='dry or rough skin') return 'Skin that feels dry, rough, or overworked';
  return problem.label;
}
function marketingNeedsPantryReadyAngle(goal, product){
  const text=(goal||'').toLowerCase();
  return Boolean(product.pantry && (
    text.includes('pantry ready') ||
    text.includes('forgot') ||
    text.includes('no jar') ||
    text.includes('without a jar') ||
    text.includes('on the way home') ||
    text.includes('need it') ||
    text.includes('ran out') ||
    text.includes('running out') ||
    text.includes('busy week') ||
    text.includes('school week')
  ));
}
function marketingStrategy(product, goal, platform, contentType, seed, selectedLenses=[]){
  seed=seed ?? marketingSeed(product, goal, platform, contentType);
  const audiences=[
    'Busy homemakers who want a calmer, prettier, lower-waste reset without adding another complicated errand.',
    'Women building a thoughtful home through cooking, preserving, organizing, restocking, learning, and choosing useful things with care.',
    'Practical local families who care about value, simplicity, and buying from a place they can trust.',
    'Customers who love organized pantries, glass jars, warm neutral spaces, and products that look good sitting out.',
    'Refill-curious shoppers who need reassurance that the process is simple, clean, and worth trying once.',
    'Gift, market, and shelf-browsing shoppers who buy when the product feels useful, beautiful, and ready to take home.',
    'Customers who meant to refill but remembered too late, do not have their jar with them, and still need a staple tonight.',
    'Customers who buy when they immediately recognize a frustrating household problem and believe the product can help.'
  ];
  const psychology=[
    'Document before selling: show the life, routine, lesson, or moment first, then let the product fit naturally if it truly belongs.',
    'Reduce friction: make the next step feel simple, close by, and low pressure.',
    'Use identity: speak to the customer who wants her home to feel thoughtful, capable, and cared for.',
    'Build trust: show real materials, honest use, clear pricing, and no exaggerated promises.',
    'Create gentle urgency: connect the product to a season, routine, restock moment, or upcoming market day.',
    'Make the invisible value visible: packaging, refill savings, fewer throwaway purchases, and a calmer shelf.',
    'Capture the rescue moment: Pantry Ready keeps the customer from choosing a big-box backup when they forgot their jar.',
    'Lead with efficacy: name the irritation clearly, show the product as the practical fix, and keep the claim honest and easy to believe.'
  ];
  const brandCues=[
    'Warm, quiet, useful, refined, faith-rooted without being performative, natural materials, heirloom glass, practical beauty.',
    'Old-soul homemaking with clean modern restraint: cream paper, olive-brown logo tones, real counters, real hands, useful jars.',
    'Simple and grounded: less trend-chasing, more thoughtful stewardship, honest routines, and products that earn their spot.',
    'Beautiful but not precious: practical tools, clear labels, tidy shelves, soft window light, and a sense of home being tended.'
  ];
  const angles=[
    {name:'Thoughtful home journal', lead:`Make the post feel like a page from the broader Common Good world: home rhythms, useful skills, warm routines, and products that fit naturally instead of being forced.`},
    {name:'Problem relief', lead:`The easiest product to sell is the one that solves a small daily irritation. Make ${product.name} feel like the simple answer to a real household moment.`},
    {name:'Product efficacy', lead:`Make ${product.name} the practical answer to a specific, recognizable product problem rather than leading with sustainability or aesthetics.`},
    {name:'Before the shelf runs out', lead:`Center the moment before someone runs out, forgets to restock, or adds another plastic bottle to the list.`},
    {name:'Pantry beauty with a job', lead:`Make the visual beautiful, but let the caption prove the product is practical and useful.`},
    {name:'First refill confidence', lead:`Speak to someone who has never refilled before and needs it to feel normal, clean, and easy.`},
    {name:'Forgot the jar rescue', lead:`Pitch Pantry Ready as the practical staple for the customer who remembers on the way home, does not have a jar, but needs ${product.name} tonight.`},
    {name:'Local trust', lead:`Tie the product to Common Good as a local, hands-on source instead of an anonymous online cart.`},
    {name:'Stewardship without scolding', lead:`Frame lower-waste shopping as peaceful and doable, not guilt-based.`}
  ];
  const captionStructures=[
    'Open with a specific household moment, name the product naturally, then invite one clear action.',
    'Start with a question the customer would quietly say yes to, answer it with the product, then close warmly.',
    'Use a short story: scene, small frustration, simple Common Good solution, gentle call to action.',
    'Lead with the visual detail, connect it to the customer identity, then give the refill or Pantry Ready option.',
    'Use three short lines: practical need, beautiful solution, easy next step.',
    'Name the real-life problem first: remembered late, no jar in the car, still need the staple.',
    'Start with the frustration, show the product benefit, then invite the customer to try it in the next real-life moment.'
  ];
  const ctas=[
    'Bring a clean container, choose Pantry Ready, or add it to your next Common Good stop.',
    'Save this for your next restock day.',
    'Try it once in a jar you already own, or grab a Pantry Ready option when you need it today.',
    'Add it to your next refill list.',
    'Keep one on the shelf before the current one runs out.',
    'Grab Pantry Ready today, then bring the jar back for a refill next time.',
    'Try it in the next load, clean, or routine where the frustration usually shows up.'
  ];
  const detectedProblem=marketingDetectedProblem(goal);
  const selectedLensIds=selectedLenses.map(lens=>lens.id);
  const selectedPrimary=selectedLenses[0];
  const manualAngle=selectedPrimary
    ? {
      name:selectedPrimary.name,
      lead:`Use the ${selectedPrimary.name} buying lens. ${selectedPrimary.cue}`
    }
    : null;
  const angle=manualAngle
    || (marketingNeedsEfficacyAngle(goal)
    ? angles.find(item=>item.name==='Product efficacy')
    : marketingNeedsPantryReadyAngle(goal, product)
    ? angles.find(item=>item.name==='Forgot the jar rescue')
    : marketingPick(angles, seed));
  const lensCue=marketingLensCue(selectedLenses);
  return {
    audience:selectedLensIds.includes('giftability')
      ? 'Gift shoppers, hosts, teachers, new homeowners, and people looking for useful, beautiful gifts with a clear reason to buy.'
      : selectedLensIds.includes('identity')
      ? 'Customers who want the purchase to reinforce who they are: thoughtful homemakers, stewards, practical parents, local supporters, or slow-living shoppers.'
      : angle.name==='Product efficacy' ? audiences[audiences.length-1] : angle.name==='Forgot the jar rescue' ? audiences[audiences.length-2] : marketingPick(audiences, seed+1),
    psychology:selectedLenses.length
      ? `Selected buying lenses: ${marketingLensNames(selectedLenses)}. ${lensCue}`
      : angle.name==='Product efficacy' ? psychology[psychology.length-1] : angle.name==='Forgot the jar rescue' ? psychology[psychology.length-2] : marketingPick(psychology, seed+3),
    brandCues:marketingPick(brandCues, seed+5),
    angle:angle.name,
    angleDirection:detectedProblem ? `${angle.lead} Detected problem: ${detectedProblem.label}; benefit to communicate: ${detectedProblem.benefit}. ${lensCue}` : `${angle.lead} ${lensCue}`,
    captionStructure:marketingPick(captionStructures, seed+7),
    cta:angle.name==='Product efficacy' ? ctas[ctas.length-1] : marketingPick(ctas, seed+9),
    detectedProblem,
    selectedLenses
  };
}
function marketingCaption(product, strategy, goal, seed){
  const problem=strategy.detectedProblem;
  const selectedLenses=strategy.selectedLenses || [];
  const primaryLens=selectedLenses[0];
  if(primaryLens){
    const lensCaptions={
      outcome:`What gets better after ${product.name}? The routine feels easier, the shelf feels more useful, and the product earns its place because it does the job.\n\n${strategy.cta}`,
      problem:problem
        ? `${marketingProblemMoment(problem)}.\n\nThat is the frustration. ${product.name} is the simple answer to try next. It ${problem.benefit}.\n\n${strategy.cta}`
        : `There is usually one small household frustration that makes a product worth buying.\n\nFor that moment, ${product.name} is here to make the routine work better, not harder.`,
      identity:`For the kind of home where the useful things are chosen with care.\n\n${product.name} belongs in the routine of someone who wants fewer random purchases and more things that actually serve the day.`,
      values:`Small choices say something about what we value.\n\n${product.name} is a practical Common Good staple for customers who care about usefulness, honesty, and buying with intention.`,
      emotion:`Some home products do more than finish a chore. They make the day feel a little more settled.\n\n${product.name} brings that quiet, capable feeling to an ordinary routine.`,
      convenience:`For the day that needs the easy option: ${product.name} is ready to use, easy to restock, and simple to fit into the routine.\n\nLess figuring it out. More getting it done.`,
      financial:`Value is not about buying the cheapest thing. It is about buying the thing that keeps earning its place.\n\n${product.name} is a practical staple for a home that wants usefulness over waste.`,
      simplicity:`One good product. One clearer routine. Fewer decisions on the shelf.\n\n${product.name} keeps the everyday task simple enough to repeat.`,
      quality:`The difference is in the details: what it is made from, how it is prepared, and whether it actually earns a place in the home.\n\n${product.name} is made to be useful first.`,
      sensory:`The little details matter: the feel, the scent, the weight, the shelf, the way the routine slows down for a second.\n\n${product.name} belongs in that kind of Common Good moment.`,
      story:`This is the kind of product story people remember because it starts with real life.\n\nA household need, a better routine, and ${product.name} becoming part of the answer.`,
      trust:`No mystery, no overcomplicated promise.\n\n${product.name} should be easy to understand, easy to use, and easy to trust in the routine it was made for.`,
      transformation:`Before: the routine feels cluttered, rushed, or annoying.\n\nAfter: ${product.name} gives that moment a simpler, more useful place to land.`,
      aspiration:`Build the kind of home where the everyday things are thoughtful, useful, and worth keeping.\n\n${product.name} is one small part of that bigger rhythm.`,
      belonging:`Every small choice becomes part of a bigger way of living.\n\nChoosing ${product.name} is one more Common Good step toward a home that feels intentional and connected.`,
      curiosity:`Why does ${product.name} belong in a Common Good home?\n\nBecause sometimes the simplest product earns its place by solving the part of the routine everyone quietly notices.`,
      education:`A better routine starts with understanding what the product is actually doing.\n\n${product.name} helps make the everyday task more manageable, and that is the part worth teaching.`,
      comparison:`Instead of adding another random product to the shelf, choose one with a clear job.\n\n${product.name} is made to serve the routine simply and honestly.`,
      heritage:`Some home rhythms are worth keeping.\n\n${product.name} carries that old-soul Common Good feeling: useful, simple, and made for the kind of care that lasts.`,
      modernity:`Traditional sensibility, modern pace.\n\n${product.name} fits the home that wants honest basics without making the day more complicated.`,
      beauty:`Useful can still be beautiful.\n\n${product.name} brings practical function into a shelf, basket, jar, or routine you actually like seeing in your home.`,
      environmental:`A small shift in the everyday routine can mean fewer throwaway purchases over time.\n\n${product.name} helps make the lower-waste choice feel practical, not precious.`,
      'self-care':`Self care is not always a spa night. Sometimes it is making the ordinary parts of the day feel less irritating and more tended.\n\n${product.name} belongs there.`,
      ritual:`Do not just sell the product. Sell the moment it belongs to.\n\n${product.name} fits into the small household ritual that makes the day feel cared for.`,
      giftability:`A good gift is beautiful, useful, and easy to explain.\n\n${product.name} is the kind of Common Good staple that feels thoughtful without becoming complicated.`,
      place:`Rooted in small-town Nebraska and made for real homes.\n\n${product.name} is a Common Good staple with a sense of place behind it.`,
      legacy:`The things we use every day teach something quietly.\n\n${product.name} is one small way to pass down care, usefulness, and a more thoughtful rhythm at home.`,
      mission:`The point is not to own more products. It is to build a home where the things on the shelf have a real job.\n\n${product.name} earns its place when it helps that work feel clearer and easier to repeat.`
    };
    return lensCaptions[primaryLens.id] || `${product.name} has a clear role in the home.\n\nUse the ${primaryLens.name} lens to show why it matters and why the customer should care now.`;
  }
  const captionsByAngle={
    'Product efficacy':[
      problem
        ? `${marketingProblemMoment(problem)}: that is the kind of tiny frustration ${product.name} is made for.\n\nIt ${problem.benefit}, so the routine feels a little less annoying.\n\nTry it the next time that problem shows up.`
        : `${product.name} is not just pretty on the shelf. It is here to solve a real household problem.\n\nUse it when the everyday routine needs to work better, not just look better.`,
      problem
        ? `Some products sell themselves the second the problem shows up.\n\nFor ${problem.label}, ${product.name} gives you a simple way to make the routine work better without adding another complicated step.`
        : `The best product story is simple: here is the problem, here is the thing that helps.\n\n${product.name} belongs in the routine because it earns its place.`
    ],
    'Problem relief':[
      `That little household thing you keep meaning to restock? This is your nudge. ${product.name} is ready when you are, with refill and Pantry Ready options at Common Good.\n\n${strategy.cta}`,
      `A good home rhythm is built from small things that are easy to keep up with. ${product.name} is one of those basics worth having on the shelf.\n\nRefill what you have, or choose Pantry Ready when you need the simple option today.`
    ],
    'Before the shelf runs out':[
      `Before the jar is empty and the week gets full, add ${product.name} to your restock list.\n\nBring your container, choose a Common Good jar, or pick up Pantry Ready while you are here.`,
      `Restock day feels better when the basics are already thought through. ${product.name} is available for refill or Pantry Ready, so you can choose what fits the day.`
    ],
    'Pantry beauty with a job':[
      `Pretty shelves are nice. Useful shelves are better.\n\n${product.name} earns its place by doing real work in the home while still looking calm, simple, and put together.`,
      `The best kind of pantry reset is the kind that still works on a regular Tuesday. ${product.name} is practical, refillable, and ready for the shelf you actually use.`
    ],
    'First refill confidence':[
      `If you have wanted to try refilling but felt unsure where to start, start small.\n\nBring a clean container for ${product.name}, or choose Pantry Ready first and refill when you are ready.`,
      `Refilling does not have to be complicated. Choose ${product.name}, weigh your container, fill what you need, and check out at your own pace.`
    ],
    'Forgot the jar rescue':[
      `You know that moment when you remember on the way home that you are almost out?\n\nPantry Ready ${product.name} is for that exact day: no jar in the car, no extra stop, no starting over with something you do not really want.\n\nGrab it ready-to-go now, then bring the container back for a refill next time.`,
      `Forgot your jar but still need ${product.name} tonight? That is exactly why Pantry Ready belongs on the shelf.\n\nIt keeps the refill habit realistic for real life: take home what you need today, refill when you are prepared next time.`,
      `For the days when the list catches up with you in the car: Pantry Ready ${product.name} is already packed, labeled, and ready to take home.\n\nNo jar needed today. Just restock and keep moving.`
    ],
    'Local trust':[
      `A quieter way to restock the things your home actually uses.\n\n${product.name} is available through Common Good for local shoppers who want simple products, clear options, and less guesswork.`,
      `When you buy the basics locally, they feel a little more connected to real life. ${product.name} is here for your next refill, market stop, or Pantry Ready restock.`
    ],
    'Stewardship without scolding':[
      `Lower-waste living does not have to be loud or all-or-nothing.\n\nSometimes it is just choosing ${product.name}, filling a jar you already own, and taking one small faithful step toward a more thoughtful home.`,
      `A simple refill is still a meaningful choice.\n\n${product.name} gives you a practical way to use what you have, buy what you need, and keep the everyday shelf a little more intentional.`
    ]
  };
  const fallback=[
    `${product.name} is ready for your next Common Good restock.\n\nRefill your own container, choose one of ours, or grab Pantry Ready when you need the easy option.`,
    `One small, useful restock for a calmer home: ${product.name}.\n\nAvailable for Common Good shoppers who want practical products with a little more intention behind them.`
  ];
  return marketingPick(captionsByAngle[strategy.angle] || fallback, seed+11);
}
function marketingShortCaption(product, strategy, seed){
  const shortCaptions=[
    `${product.name}, restocked the Common Good way.`,
    `A calmer shelf starts with the next refill.`,
    `Useful, beautiful, and ready for the real home.`,
    `Refill when you can. Pantry Ready when you need it.`,
    `A simple restock for a more thoughtful home.`,
    `Forgot the jar? Pantry Ready has the day covered.`
  ];
  return marketingPick(shortCaptions, seed+13);
}
function marketingEditable(index, field, label, value){
  const text=Array.isArray(value) ? value.join(', ') : value;
  return `<div class="editable-brief" id="concept${index}-${field}">
    <div class="editable-head">
      <strong>${label}</strong>
      <button class="icon-button" type="button" title="Edit ${label}" aria-label="Edit ${label}" onclick="editMarketingConceptField(${index},'${field}')"><span aria-hidden="true">&#9998;</span></button>
    </div>
    <p>${escapeHTML(text || 'Not noted yet')}</p>
  </div>`;
}
function captionPreview(concept){
  const text=(concept.caption || concept.goal || concept.visual || 'Untitled idea').replace(/\s+/g,' ').trim();
  return text.length>130 ? `${text.slice(0,130)}...` : text;
}
function renderMarketingBankFilters(){
  return `<div class="bank-filters">
    <div><label>Search bank</label><input id="bankSearch" type="search" placeholder="Search captions, ideas, audio, hashtags..." oninput="renderMarketingBank()"></div>
    <div><label>Status</label><select id="bankStatus" onchange="renderMarketingBank()"><option value="all">All drafts</option><option value="banked">Banked only</option><option value="posted">Posted / used</option></select></div>
    <div><label>Post focus</label><select id="bankFocus" onchange="renderMarketingBank()"><option value="all">All focuses</option>${marketingPostFocuses.map(focus=>`<option value="${focus.id}">${focus.name}</option>`).join('')}</select></div>
    <div><label>Product / context</label><select id="bankProduct" onchange="renderMarketingBank()"><option value="all">All</option>${products.map(p=>`<option value="${p.id}">${p.name}</option>`).join('')}<option value="nonproduct">Non-product posts</option></select></div>
    <div><label>Buying lens</label><select id="bankLens" onchange="renderMarketingBank()"><option value="all">All lenses</option>${marketingBuyingLenses.map(lens=>`<option value="${lens.id}">${lens.name}</option>`).join('')}</select></div>
    <div><label>Sort / category</label><select id="bankSort" onchange="renderMarketingBank()"><option value="newest">Newest first</option><option value="caption">Caption A-Z</option><option value="focus">Group by focus</option><option value="status">Group by status</option></select></div>
  </div>`;
}
function marketingBankFieldText(concept){
  return [
    concept.caption,
    concept.goal,
    concept.visual,
    concept.subjectName,
    concept.focusName,
    concept.contentType,
    concept.platform,
    concept.targetAudience,
    concept.sellingPsychology,
    concept.trendNotes,
    ...(concept.hashtags||[]),
    ...(concept.audioIdeas||[]),
    ...(concept.adAngles||[]),
    ...(concept.buyingLenses||[]).map(lens=>lens.name)
  ].join(' ').toLowerCase();
}
function marketingBankGroupLabel(entry, sort){
  const concept=entry.concept;
  if(sort==='focus') return concept.focusName || (concept.productId ? 'Product' : 'Other');
  if(sort==='status') return concept.posted ? 'Posted / used' : 'Banked draft';
  if(sort==='caption') return captionPreview(concept) || 'No caption yet';
  return '';
}
function renderMarketingBank(){
  const el=document.getElementById('marketingBank');
  if(!el) return;
  const concepts=getMarketingConcepts();
  if(!concepts.length){
    el.innerHTML='<p class="small">No saved post ideas yet. Generate a brief to start the content bank.</p>';
    return;
  }
  const search=(document.getElementById('bankSearch')?.value || '').trim().toLowerCase();
  const status=document.getElementById('bankStatus')?.value || 'all';
  const focus=document.getElementById('bankFocus')?.value || 'all';
  const productFilter=document.getElementById('bankProduct')?.value || 'all';
  const lensFilter=document.getElementById('bankLens')?.value || 'all';
  const sort=document.getElementById('bankSort')?.value || 'newest';
  let entries=concepts.map((concept,index)=>({concept,index})).filter(({concept})=>{
    const matchesSearch=!search || marketingBankFieldText(concept).includes(search);
    const matchesStatus=status==='all' || (status==='posted' ? concept.posted : !concept.posted);
    const matchesFocus=focus==='all' || (concept.focusId || 'product')===focus;
    const matchesProduct=productFilter==='all'
      || (productFilter==='nonproduct' ? !concept.productId : concept.productId===productFilter);
    const matchesLens=lensFilter==='all' || (concept.buyingLenses||[]).some(lens=>lens.id===lensFilter);
    return matchesSearch && matchesStatus && matchesFocus && matchesProduct && matchesLens;
  });
  entries.sort((a,b)=>{
    if(sort==='caption') return captionPreview(a.concept).localeCompare(captionPreview(b.concept));
    if(sort==='focus') return marketingBankGroupLabel(a,'focus').localeCompare(marketingBankGroupLabel(b,'focus')) || new Date(b.concept.date)-new Date(a.concept.date);
    if(sort==='status') return marketingBankGroupLabel(a,'status').localeCompare(marketingBankGroupLabel(b,'status')) || new Date(b.concept.date)-new Date(a.concept.date);
    return new Date(b.concept.date)-new Date(a.concept.date);
  });
  if(!entries.length){
    el.innerHTML='<p class="small">No saved ideas match those filters.</p>';
    return;
  }
  let lastGroup='';
  el.innerHTML=`<div class="content-bank">${entries.map(({concept,index})=>{
    const product=products.find(p=>p.id===concept.productId);
    const title=concept.subjectName || product?.name || 'Post idea';
    const group=marketingBankGroupLabel({concept,index},sort);
    const groupHeader=group && group!==lastGroup ? `<h4 class="bank-group">${escapeHTML(group)}</h4>` : '';
    lastGroup=group || lastGroup;
    return `${groupHeader}<article class="content-idea ${concept.posted?'posted':''}">
      <label class="check-row">
        <input type="checkbox" ${concept.posted?'checked':''} onchange="toggleMarketingPosted(${index})">
        <span>${concept.posted?'Posted / used':'Banked draft'}</span>
      </label>
      <h3>${escapeHTML(captionPreview(concept))}</h3>
      <p class="small">${escapeHTML(title)} · ${formatSaleDate(concept.date)} · ${concept.focusName || 'Product'} · ${concept.platform} · ${concept.contentType} · ${concept.captionDepth || 'medium'} caption</p>
      <p>${escapeHTML(concept.goal || concept.visual)}</p>
      <div class="mini-actions"><button class="danger" type="button" onclick="deleteMarketingConcept(${index})">Delete brief</button></div>
      <details>
        <summary>View brief</summary>
        ${marketingEditable(index,'visual','Image / Reel Concept',concept.visual)}
        ${marketingEditable(index,'targetAudience','Target Audience',concept.targetAudience)}
        ${marketingEditable(index,'sellingPsychology','Selling Psychology',concept.sellingPsychology)}
        ${marketingEditable(index,'brandAesthetic','Brand Aesthetic',concept.brandAesthetic)}
        ${marketingEditable(index,'caption','Caption',concept.caption)}
        ${marketingEditable(index,'hashtags','Hashtags',concept.hashtags)}
        ${marketingEditable(index,'audioIdeas','Suggested Audio',concept.audioIdeas)}
        ${marketingEditable(index,'trendNotes','Trend / Reel Notes',concept.trendNotes)}
        ${marketingEditable(index,'adAngles','Ad Angles',concept.adAngles)}
        <p><strong>Buying lenses:</strong> ${escapeHTML((concept.buyingLenses||[]).map(lens=>lens.name).join(', ') || 'Auto-selected')}</p>
      </details>
    </article>`;
  }).join('')}</div>`;
}
function editMarketingConceptField(index, field){
  const concepts=getMarketingConcepts();
  const concept=concepts[index];
  const holder=document.getElementById(`concept${index}-${field}`);
  if(!concept || !holder) return;
  const value=Array.isArray(concept[field]) ? concept[field].join('\n') : (concept[field] || '');
  holder.innerHTML=`<div class="editable-head"><strong>Edit ${escapeHTML(field)}</strong></div>
    <textarea id="edit-${index}-${field}">${escapeHTML(value)}</textarea>
    <div class="mini-actions">
      <button class="primary" type="button" onclick="saveMarketingConceptField(${index},'${field}')">Save</button>
      <button class="secondary" type="button" onclick="renderMarketingBank()">Cancel</button>
    </div>`;
}
function saveMarketingConceptField(index, field){
  const concepts=getMarketingConcepts();
  const concept=concepts[index];
  const input=document.getElementById(`edit-${index}-${field}`);
  if(!concept || !input) return;
  const arrayFields=['hashtags','audioIdeas','adAngles','tags','locationTags'];
  concept[field]=arrayFields.includes(field)
    ? input.value.split(/\n|,/).map(item=>item.trim()).filter(Boolean)
    : input.value.trim();
  concept.updatedAt=new Date().toISOString();
  saveMarketingConcepts(concepts);
  renderMarketingBank();
}
function toggleMarketingPosted(index){
  const concepts=getMarketingConcepts();
  if(!concepts[index]) return;
  concepts[index].posted=!concepts[index].posted;
  concepts[index].postedDate=concepts[index].posted ? new Date().toISOString() : null;
  saveMarketingConcepts(concepts);
  renderMarketingBank();
}
function deleteMarketingConcept(index){
  const concepts=getMarketingConcepts();
  const concept=concepts[index];
  if(!concept) return;
  const preview=captionPreview(concept);
  if(!confirm(`Delete this saved brief?\n\n${preview}`)) return;
  concepts.splice(index,1);
  saveMarketingConcepts(concepts);
  renderMarketingBank();
}
function generateMarketingConcept(){
  const focusId=document.getElementById('marketingFocus')?.value || 'product';
  const focus=marketingFocusById(focusId);
  const productId=document.getElementById('marketingProduct')?.value;
  const platform=document.getElementById('marketingPlatform')?.value;
  const contentType=document.getElementById('marketingContentType')?.value;
  const captionDepth=document.getElementById('marketingCaptionDepth')?.value || 'medium';
  const goal=document.getElementById('marketingGoal')?.value.trim();
  const selectedLenses=getSelectedMarketingLenses();
  const selectedProduct=products.find(p=>p.id===productId) || products[0];
  const product=marketingSubjectFor(focus, selectedProduct);
  const concepts=getMarketingConcepts();
  const similarPosted=concepts.find(concept=>concept.posted && (concept.productId===product.id || concept.focusId===focus.id) && marketingSimilarity(goal,concept.goal)>0.55);
  const similarDraft=concepts.find(concept=>!concept.posted && (concept.productId===product.id || concept.focusId===focus.id) && marketingSimilarity(goal,concept.goal)>0.55);
  const uniqueness=similarPosted
    ? `<div class="notice warning"><strong>Check uniqueness:</strong> This sounds close to a posted ${product.name} idea from ${formatSaleDate(similarPosted.date)}. Revise the scene, angle, season, location, or customer problem before posting.</div>`
    : similarDraft
      ? `<div class="notice"><strong>Draft match:</strong> This sounds close to an unused saved idea. You can still use it, combine it, or mark one as posted later.</div>`
      : `<div class="notice"><strong>Freshness check:</strong> No close posted or saved match found on this device.</div>`;
  const seed=marketingSeed(product, goal, platform, contentType);
  const strategy=marketingStrategy(product, goal, platform, contentType, seed, selectedLenses);
  const caption=captionDepth==='self'
    ? marketingNormalizeStory(goal)
    : marketingQualityCaption(product, selectedProduct, focus, strategy, goal, seed, captionDepth, contentType);
  const shortCaption=marketingShortCaption(product, strategy, seed);
  const hashtags=focus.id==='product'
    ? ['#CommonGood','#Refillery','#LowWasteHome','#PantryReady','#NebraskaSmallBusiness','#SimpleHomeCare',`#${product.category.replace(/[^A-Za-z0-9]/g,'')}Care`]
    : ['#CommonGood','#SmallTownNebraska','#ShopLocalNebraska','#ThoughtfulHome','#Refillery','#SlowLiving','#CommonGoodHome'];
  const tags=['Common Good account','local makers','refill community','nearby homemaking accounts','local market partners'];
  const locationTags=['Common Good','Alvo, Nebraska','vendor market location','nearby small-town Nebraska community'];
  const audioIdeas=[
    'soft acoustic instrumental with a steady homemaking rhythm',
    'quiet morning routine audio with natural room sound',
    'gentle shop ambience with jars, scoops, and paper bags',
    'seasonal homemaking audio that feels warm, not trendy',
    'voiceover explaining one simple restock decision',
    'current low-volume reel audio that supports voiceover',
    'market prep time-lapse sound with light ambient noise'
  ];
  const trendNotes=focus.id==='reel'
    ? 'Reel structure: hook in the first 2 seconds, 3-5 quick visual beats, readable on-screen text, soft voiceover or trending low-volume audio, end with one clear save/share/comment prompt. Check Instagram/TikTok the day of posting for current audio before publishing.'
    : 'Trend fit: use repeatable formats like POV, restock with me, market prep, before/after, problem-to-solution, founder face-to-camera, or satisfying process shots. Confirm current audio inside the platform before posting.';
  const adAngles=[
    strategy.angle,
    'Product benefit proof',
    'Frustration-to-solution demonstration',
    `${focus.name} awareness`,
    'Founder or behind-the-scenes trust',
    'Educational authority builder',
    'First refill trial',
    'Pantry Ready rescue for forgotten jars',
    'On-the-way-home staple restock',
    'Local trust and repeat restock',
    'Beautiful shelf, practical product'
  ];
  const concept={
    date:new Date().toISOString(),
    focusId:focus.id,
    focusName:focus.name,
    productId:focus.id==='product' ? product.id : null,
    subjectName:product.name,
    platform,
    contentType,
    captionDepth,
    goal,
    visual:`Create a ${platform} ${contentType.toLowerCase()} for ${product.name}. ${goal || focus.cue || marketingSeedDetails(product)[0]} Creative angle: ${strategy.angle}. ${strategy.angleDirection} Brand aesthetic: ${strategy.brandCues}`,
    targetAudience:strategy.audience,
    sellingPsychology:strategy.psychology,
    brandAesthetic:strategy.brandCues,
    buyingLenses:selectedLenses.map(lens=>({id:lens.id,name:lens.name,prompt:lens.prompt})),
    creativeAngle:strategy.angle,
    captionStructure:strategy.captionStructure,
    caption,
    shortCaption,
    hashtags,
    tags,
    locationTags,
    audioIdeas,
    trendNotes,
    adAngles,
    posted:false,
    postedDate:null
  };
  concepts.unshift(concept);
  saveMarketingConcepts(concepts.slice(0,30));
  document.getElementById('marketingResult').innerHTML=`
    ${uniqueness}
    <div class="spacer"></div>
    <div class="grid grid-2">
      <div class="summary"><strong>Image concept</strong><p>${concept.visual}</p></div>
      <div class="summary"><strong>Target audience</strong><p>${concept.targetAudience}</p></div>
      <div class="summary"><strong>Selling psychology</strong><p>${concept.sellingPsychology}</p></div>
      <div class="summary"><strong>Brand aesthetic</strong><p>${concept.brandAesthetic}</p></div>
      <div class="summary"><strong>Buying lenses</strong><p>${concept.buyingLenses.length ? concept.buyingLenses.map(lens=>lens.name).join(', ') : 'Auto-selected from prompt'}</p></div>
      <div class="summary"><strong>Creative angle</strong><p>${concept.creativeAngle}</p><p class="small">${concept.captionStructure}</p></div>
      <div class="summary"><strong>Caption</strong><p>${caption}</p><p class="small">Depth: ${captionDepth}. ${captionDepth==='self'?'Caption kept as written.':'Short option: '+shortCaption}</p></div>
      <div class="summary"><strong>Hashtags</strong><p>${hashtags.join(' ')}</p></div>
      <div class="summary"><strong>Tags</strong><p>${tags.join(', ')}</p></div>
      <div class="summary"><strong>Location tags</strong><p>${locationTags.join(', ')}</p></div>
      <div class="summary"><strong>Suggested audio</strong><p>${audioIdeas.join(', ')}</p></div>
      <div class="summary"><strong>Trend / Reel notes</strong><p>${trendNotes}</p></div>
      <div class="summary"><strong>Ad copy opportunities</strong><p>${adAngles.join(', ')}</p></div>
      <div class="summary"><strong>Approval status</strong><p>Draft. Review product claims, labels, price, and availability before posting.</p></div>
    </div>`;
  renderMarketingBank();
}
function simpleSelectedMarketingLenses(){
  const checked=selectedMarketingLensInputs();
  const note=document.getElementById('marketingLensNote');
  if(checked.length>3 && note) note.textContent='Using the first 3 selected lenses so the caption stays focused.';
  return checked.slice(0,3)
    .map(input=>marketingBuyingLenses.find(lens=>lens.id===input.value))
    .filter(Boolean);
}
const advertisingGoals=[
  'Brand Awareness','Product Awareness','Product Launch','Event Promotion','Website Traffic','Email List Growth','First Purchase','Repeat Purchase','Restock Reminder','Educational Campaign','Community Building','Seasonal Promotion','Local Awareness'
];
const advertisingStages=['Cold','Warm','Hot','Existing Customer'];
const advertisingBudgetModes=['Organic first','Small paid test','Ready to scale'];
function getAdDirectorInput(){
  return {
    goal:document.getElementById('adBusinessGoal')?.value || 'Brand Awareness',
    stage:document.getElementById('adCustomerStage')?.value || 'Warm',
    budgetMode:document.getElementById('adBudgetMode')?.value || 'Organic first'
  };
}
function getPostKits(){ return JSON.parse(localStorage.getItem('cg_post_kits')||'[]'); }
function savePostKits(kits){ localStorage.setItem('cg_post_kits',JSON.stringify(kits)); }
function postKitPreview(kit){
  const text=(kit.caption || kit.imagePrompt || kit.goal || 'Saved post kit').replace(/\s+/g,' ').trim();
  return text.length>120 ? `${text.slice(0,120)}...` : text;
}
function renderEditablePostField(field, label, value){
  return `<section class="summary editable-post-field" id="postKit-${field}">
    <div class="editable-head">
      <strong>${label}</strong>
      <button class="icon-button" type="button" title="Edit ${label}" aria-label="Edit ${label}" onclick="editCurrentPostKitField('${field}')"><span aria-hidden="true">&#9998;</span></button>
    </div>
    <p>${escapeHTML(value).replace(/\n/g,'<br>')}</p>
  </section>`;
}
function editCurrentPostKitField(field){
  const kit=window.currentPostKit;
  const holder=document.getElementById(`postKit-${field}`);
  if(!kit || !holder) return;
  const label=field==='caption' ? 'Caption Draft' : 'Image Prompt';
  holder.innerHTML=`<div class="editable-head"><strong>Edit ${label}</strong></div>
    <textarea id="editPostKit-${field}" class="${field==='imagePrompt'?'image-prompt-box':''}">${escapeHTML(kit[field] || '')}</textarea>
    <div class="mini-actions">
      <button class="primary" type="button" onclick="saveCurrentPostKitField('${field}')">Save</button>
      <button class="secondary" type="button" onclick="renderCurrentPostKit()">Cancel</button>
    </div>`;
}
function saveCurrentPostKitField(field){
  const input=document.getElementById(`editPostKit-${field}`);
  if(!window.currentPostKit || !input) return;
  window.currentPostKit[field]=input.value.trim();
  renderCurrentPostKit();
}
function renderCurrentPostKit(){
  const kit=window.currentPostKit;
  const result=document.getElementById('marketingResult');
  if(!kit || !result) return;
  const captionBlock=kit.outputType!=='image' ? renderEditablePostField('caption','Caption Draft',kit.caption) : '';
  const imageBlock=kit.outputType!=='caption' ? renderEditablePostField('imagePrompt','Image Prompt',kit.imagePrompt) : '';
  result.innerHTML=`
    <div class="grid grid-2">${captionBlock}${imageBlock}</div>
    <div class="mini-actions">
      <button class="primary" type="button" onclick="approveCurrentPostKit()">Approve to bank</button>
      <button class="secondary" type="button" onclick="requestMarketingImageGeneration()">Request image generation</button>
      <span class="small" id="marketingImageStatus">Not requested yet.</span>
    </div>`;
}
function approveCurrentPostKit(){
  if(!window.currentPostKit) return;
  const kits=getPostKits();
  kits.unshift({...window.currentPostKit, id:`kit-${Date.now()}`, date:new Date().toISOString(), used:false});
  savePostKits(kits.slice(0,60));
  renderPostKitBank();
}
function togglePostKitUsed(index){
  const kits=getPostKits();
  if(!kits[index]) return;
  kits[index].used=!kits[index].used;
  savePostKits(kits);
  renderPostKitBank();
}
function postKitCopyText(kit){
  return `Caption:\n${kit.caption || ''}\n\nImage Prompt:\n${kit.imagePrompt || ''}`;
}
function copyPostKit(index){
  const kit=getPostKits()[index];
  if(!kit) return;
  const text=postKitCopyText(kit);
  if(navigator.clipboard?.writeText){
    navigator.clipboard.writeText(text).then(()=>alert('Prompt kit copied.'));
  } else {
    prompt('Copy this prompt kit:', text);
  }
}
function deletePostKit(index){
  const kits=getPostKits();
  const kit=kits[index];
  if(!kit) return;
  if(!confirm(`Delete this banked idea?\n\n${postKitPreview(kit)}`)) return;
  kits.splice(index,1);
  savePostKits(kits);
  renderPostKitBank();
}
function editBankedPostKit(index){
  const kits=getPostKits();
  const kit=kits[index];
  if(!kit) return;
  const article=document.getElementById(`bankedKit-${index}`);
  if(!article) return;
  article.innerHTML=`
    <div class="editable-head">
      <strong>Edit banked idea</strong>
      <button class="icon-button" type="button" title="Cancel" aria-label="Cancel" onclick="renderPostKitBank()">×</button>
    </div>
    <label>Caption</label><textarea id="bankCaption-${index}">${escapeHTML(kit.caption || '')}</textarea>
    <label>Image prompt</label><textarea id="bankPrompt-${index}" class="image-prompt-box">${escapeHTML(kit.imagePrompt || '')}</textarea>
    <div class="mini-actions">
      <button class="primary" type="button" onclick="saveBankedPostKit(${index})">Save</button>
      <button class="secondary" type="button" onclick="renderPostKitBank()">Cancel</button>
    </div>`;
}
function saveBankedPostKit(index){
  const kits=getPostKits();
  if(!kits[index]) return;
  kits[index].caption=document.getElementById(`bankCaption-${index}`)?.value.trim() || '';
  kits[index].imagePrompt=document.getElementById(`bankPrompt-${index}`)?.value.trim() || '';
  kits[index].updatedAt=new Date().toISOString();
  savePostKits(kits);
  renderPostKitBank();
}
function postKitStrategyDetails(kit){
  const lensIds=kit.lensIds || (kit.lenses||[]).map(name=>{
    const match=marketingBuyingLenses.find(lens=>lens.name===name);
    return match?.id || name;
  });
  const product=products.find(p=>p.id===kit.productId);
  const productName=kit.productName || product?.name || 'this idea';
  const lensText=(kit.lenses||[]).join(', ') || 'Natural buying reason';
  const adGoal=kit.adGoal || 'Brand Awareness';
  const customerStage=kit.customerStage || 'Warm';
  const budgetMode=kit.budgetMode || 'Organic first';
  const isLocal=['Event Promotion','Local Awareness','Community Building'].includes(adGoal) || ['market','place'].includes(kit.focusId);
  const isLaunch=['Product Launch','Seasonal Promotion'].includes(adGoal);
  const isConversion=['First Purchase','Repeat Purchase','Restock Reminder','Website Traffic'].includes(adGoal);
  const shouldAdvertise=budgetMode==='Ready to scale' || (budgetMode==='Small paid test' && (isLocal || isLaunch || isConversion || lensIds.includes('convenience') || lensIds.includes('social-proof')));
  const recommendedChannel=adGoal==='Email List Growth'
    ? 'Email list growth should be the priority. Use organic social and markets to earn signups, then consider a small local lead campaign only if the signup offer is clear.'
    : isLocal
    ? 'Facebook is strongest for local awareness, events, repeat customers, and community reach. Instagram can support the same campaign with visual storytelling.'
    : adGoal==='Website Traffic'
    ? 'Use Instagram or Facebook only if the post has already earned interest. Google may be better later for high-intent searches once the product pages are ready.'
    : customerStage==='Cold'
    ? 'Instagram and Facebook should introduce the story, founders, use case, or education before asking for a purchase.'
    : customerStage==='Existing Customer'
    ? 'Email, Facebook, and organic reminders should come before paid ads. Paid retargeting can help with refill, restock, or limited seasonal reminders.'
    : 'Instagram is best for lifestyle, product storytelling, Reels, and behind-the-scenes trust. Facebook is useful if the campaign needs local reach or repeat customers.';
  const campaignType=kit.focusId==='founders' ? 'Founder Story'
    : kit.focusId==='market' ? 'Market Announcement'
    : kit.focusId==='education' || lensIds.includes('education') ? 'Educational'
    : isLaunch ? 'Product Launch'
    : lensIds.includes('problem') ? 'Problem to Solution'
    : lensIds.includes('story') ? 'Behind the Scenes'
    : 'Product Awareness';
  const directorDecision=shouldAdvertise
    ? `Paid ads can be considered, but only as a controlled test. This should not receive the full budget until organic response proves the message is working.`
    : `Do not lead with paid ads yet. Use this organically first, watch saves, shares, comments, profile visits, questions, and in-store mentions, then decide whether it deserves money.`;
  const budgetPlan=budgetMode==='Ready to scale'
    ? 'Use the 60/20/10/10 rule: 60% to proven winners, 20% to one test variable, 10% brand awareness, 10% retargeting. Increase gradually only after results hold.'
    : budgetMode==='Small paid test'
    ? 'Use a small test budget only. Test one variable at a time: headline, image, audience, offer, landing page, or CTA. Do not test all of them at once.'
    : 'No paid spend recommended yet. Let this prove itself through organic content, email, market conversations, and existing customers first.';
  const audienceMindset=customerStage==='Cold'
    ? 'People who have not heard of Common Good yet. They need trust, story, education, and a reason to care before they need an offer.'
    : customerStage==='Hot'
    ? 'People ready to act: local shoppers, recent engagers, people asking product questions, market visitors, or customers who need a clear next step.'
    : customerStage==='Existing Customer'
    ? 'People who already bought, refilled, visited a market table, or follow closely. They are best reached with refills, restocks, classes, cross-sells, and loyalty-building content.'
    : 'People who know the brand or like this kind of home routine but still need confidence, education, and proof that the product fits real life.';
  const kpis=adGoal==='Email List Growth' ? 'Email signups, cost per signup, signup quality, future purchases.'
    : adGoal==='Event Promotion' ? 'Event responses, reach near the location, profile visits, messages, market attendance.'
    : isConversion ? 'Website visits, purchases, average order value, cost per acquisition, repeat purchase potential.'
    : adGoal==='Educational Campaign' ? 'Saves, shares, watch time, comments, questions asked, email signups.'
    : 'Reach, engagement, saves, shares, profile visits, local follows, and in-store mentions.';
  const killRules='Stop or revise if costs outrun expected profit, click-through is weak after enough views, comments show confusion, the offer is unclear, inventory cannot support demand, or the message starts feeling fear-based, manipulative, or off-brand.';
  const cta=lensIds.includes('convenience')
    ? `Try ${productName} for the next quick reset: pillows, linens, counters, laundry, or the routine named in the caption.`
    : lensIds.includes('education')
    ? `Save this post for the next time you are choosing what belongs in your home.`
    : lensIds.includes('social-proof')
    ? `Share this with someone who notices the little routines that make a house feel cared for.`
    : `Add ${productName} to your next Common Good restock or save this idea for later.`;
  const adSpend=lensIds.includes('social-proof') || lensIds.includes('convenience')
    ? 'Good candidate for a small boosted post after organic testing. Start with a low daily budget and only increase if saves, shares, comments, or profile visits show real interest.'
    : 'Best as organic content first. Consider boosting only if the image performs well or the caption earns saves/shares.';
  const demographics=[
    'Local shoppers within driving distance of Common Good or upcoming markets.',
    'Women and families interested in homemaking, low-waste living, natural home care, pantry organization, refill shops, farmers markets, handmade goods, or small-town Nebraska businesses.',
    product?.category ? `${product.category} shoppers and people already engaging with similar home routines.` : 'People already engaging with similar home routines.'
  ].join(' ');
  const psychology=[
    lensIds.includes('quality') ? 'Quality: make care, ingredients, packaging, and repeat usefulness feel visible.' : '',
    lensIds.includes('sensory') ? 'Sensory: lead with smell, texture, light, weight, sound, or the feeling of the room.' : '',
    lensIds.includes('belonging') ? 'Belonging: make the reader feel like this fits the home she is already trying to build.' : '',
    lensIds.includes('convenience') ? 'Convenience: show how quickly the product changes the moment.' : '',
    lensIds.includes('simplicity') ? 'Simplicity: reduce decisions, steps, clutter, or effort.' : '',
    lensIds.includes('social-proof') ? 'Social proof: imply recognition through familiar moments instead of claiming popularity.' : '',
    lensIds.includes('problem') ? 'Problem: name the tiny frustration before offering the better routine.' : ''
  ].filter(Boolean).join(' ');
  const details=[
    `Advertising Director decision: ${directorDecision}`,
    `Primary business goal: ${adGoal}. Do not mix this with a second primary objective in the same campaign.`,
    `Campaign type: ${campaignType}.`,
    `Audience mindset: ${audienceMindset}`,
    `Platform strategy: ${recommendedChannel}`,
    `Budget framework: ${budgetPlan}`,
    `Success metrics: ${kpis}`,
    `Kill rules: ${killRules}`,
    `CTA: ${cta}`,
    `Ad spend: ${adSpend}`,
    `Target demographics: ${demographics}`,
    `Sales psychology: ${psychology || `Use ${lensText} to make the post feel useful, specific, and worth saving.`}`,
    `Campaign notes: Works well as a ${kit.focusName || 'post'} for ${productName}. Reuse the concept later with a different image, season, room, or customer moment before repeating the same caption.`
  ];
  return details;
}
function renderPostKitBank(){
  const el=document.getElementById('postKitBank');
  if(!el) return;
  const search=(document.getElementById('postKitSearch')?.value || '').toLowerCase().trim();
  const captionSearch=(document.getElementById('postKitCaptionSearch')?.value || '').toLowerCase().trim();
  const status=document.getElementById('postKitStatus')?.value || 'all';
  const focus=document.getElementById('postKitFocus')?.value || 'all';
  const product=document.getElementById('postKitProduct')?.value || 'all';
  const lens=document.getElementById('postKitLens')?.value || 'all';
  const kits=getPostKits().map((kit,index)=>({kit,index})).filter(({kit})=>{
    const text=[kit.caption,kit.imagePrompt,kit.goal,kit.focusName,kit.productName,(kit.lenses||[]).join(' ')].join(' ').toLowerCase();
    const captionText=(kit.caption || '').toLowerCase();
    const productText=[kit.caption,kit.imagePrompt,kit.goal,kit.productName,kit.productId].join(' ').toLowerCase();
    const productObj=products.find(p=>p.id===product);
    const kitLensIds=kit.lensIds || (kit.lenses||[]).map(name=>{
      const match=marketingBuyingLenses.find(lensItem=>lensItem.name===name);
      return match?.id || name;
    });
    const matchesSearch=!search || text.includes(search);
    const matchesCaption=!captionSearch || captionText.includes(captionSearch);
    const matchesStatus=status==='all' || (status==='used' ? kit.used : !kit.used);
    const matchesFocus=focus==='all' || kit.focusId===focus;
    const matchesProduct=product==='all' || (productObj && (
      productText.includes(productObj.name.toLowerCase()) ||
      productText.includes(productObj.category.toLowerCase()) ||
      productText.includes(productObj.id.toLowerCase())
    ));
    const matchesLens=lens==='all' || kitLensIds.includes(lens);
    return matchesSearch && matchesCaption && matchesStatus && matchesFocus && matchesProduct && matchesLens;
  });
  if(!kits.length){
    el.innerHTML='<p class="small">No approved post kits match those filters.</p>';
    return;
  }
  el.innerHTML=`<div class="content-bank">${kits.map(({kit,index})=>`
    <article class="content-idea ${kit.used?'posted':''}" id="bankedKit-${index}">
      <div class="bank-card-head">
        <label class="check-row"><input type="checkbox" ${kit.used?'checked':''} onchange="togglePostKitUsed(${index})"><span>${kit.used?'Used':'Banked idea'}</span></label>
        <div class="bank-actions">
          <button class="icon-button" type="button" title="Edit" aria-label="Edit banked idea" onclick="editBankedPostKit(${index})"><span aria-hidden="true">&#9998;</span></button>
          <button class="icon-button" type="button" title="Copy" aria-label="Copy banked idea" onclick="copyPostKit(${index})"><span aria-hidden="true">Copy</span></button>
          <button class="icon-button danger-icon" type="button" title="Delete" aria-label="Delete banked idea" onclick="deletePostKit(${index})"><span aria-hidden="true">Del</span></button>
        </div>
      </div>
      <h3>${escapeHTML(postKitPreview(kit))}</h3>
      <p class="small">${escapeHTML(kit.focusName)}${kit.productName?' · '+escapeHTML(kit.productName):''} · ${kit.depth} · ${(kit.lenses||[]).join(', ') || 'No lenses'} · ${formatSaleDate(kit.date)}</p>
      <details><summary>View kit</summary>
        <div class="editable-brief"><strong>Caption</strong><p>${escapeHTML(kit.caption).replace(/\n/g,'<br>')}</p></div>
        <div class="editable-brief"><strong>Image prompt</strong><p>${escapeHTML(kit.imagePrompt).replace(/\n/g,'<br>')}</p></div>
      </details>
      <details><summary>Strategy details</summary>
        ${postKitStrategyDetails(kit).map(detail=>`<div class="editable-brief"><p>${escapeHTML(detail)}</p></div>`).join('')}
      </details>
    </article>`).join('')}</div>`;
}
function simpleMarketingToneFromLenses(lenses){
  if(!lenses.length) return 'Use the quiet Common Good point of view: practical, warm, specific, and not pushy.';
  return lenses.slice(0,3).map(lens=>lens.cue).join(' ');
}
function productSearchTerms(product){
  const custom={
    linen:['room linen spray','room/linen spray','room and linen spray','linen spray','room spray','spray','scent','smell','home scent'],
    laundry:['laundry detergent powder','laundry detergent','detergent powder','laundry powder','laundry soap','detergent'],
    dryerballs:['wool dryer balls','dryer balls','static','static cling'],
    dishwasher:['dishwasher detergent powder','dishwasher detergent','dishwasher powder'],
    dishsoak:['tough dish soak','dish soak'],
    solidsoap:['solid tallow dish soap','tallow dish soap','solid dish soap'],
    allpurpose:['all-purpose cleaner','all purpose cleaner','cleaner'],
    glasscleaner:['glass cleaner','window cleaner'],
    tallow:['tallow lotion','tallow cream','tallow skincare'],
    magnesium:['magnesium balm'],
    beard:['beard oil cream','beard cream'],
    lip:['lip balm'],
    callus:['callus balm','cuticle balm','callus and cuticle balm']
  };
  return [product.name.toLowerCase(), product.id.toLowerCase(), product.category.toLowerCase(), ...(custom[product.id] || [])];
}
function inferMarketingProduct(goal){
  const lower=(goal||'').toLowerCase().replace(/&/g,' and ');
  let best=null;
  let bestScore=0;
  products.forEach(product=>{
    const score=productSearchTerms(product).reduce((sum,term)=>sum+(lower.includes(term) ? term.length : 0),0);
    if(score>bestScore){ best=product; bestScore=score; }
  });
  return best;
}
function productMarketingProfile(product, lower){
  const n=product.name;
  const oldNew=lower.includes('wringer') || lower.includes('washer') || lower.includes('old with the new') || lower.includes('old and new') || lower.includes('honoring tradition') || lower.includes('clean ingredients');
  const profiles={
    laundry: oldNew ? {
      headline:'The tools changed. The purpose did not.',
      captionAngle:'For generations, homemaking meant making the most of what you had: the tools, the time, the ingredients, and the work in front of you. Modern convenience can carry those same values forward when it is paired with clean ingredients, refillable containers, products that work, and less waste.',
      visualAngle:'Create a visual contrast between old and new laundry tools so the image quietly says: progress can keep the old values.',
      shotDetails:`Best image: a laundry room with cream beadboard or plaster wall, a modern white washer on one side, an old wringer washer or galvanized laundry tub on the other, and ${n} in the foreground on a worn wood table. Add folded cotton towels, a wooden scoop with powder, amber bottles or a small glass jar on a shelf, and soft side-window light.`
    } : {
      headline:'Laundry is ordinary, but it stays close to the body all day.',
      captionAngle:`Laundry feels ordinary until you remember how close it stays to your home and your body. ${n} belongs in that decision because ingredients, residue, scent, amount used, and refillability all become part of the routine.`,
      visualAngle:'Make laundry feel clean, useful, and lived-in, with fabric texture and product details supporting the message.',
      shotDetails:`Best image: a calm laundry counter with ${n} in a useful jar or pouch, a wooden scoop, a small spill of powder, folded cotton towels, and the edge of a washer or laundry basket in the background.`
    },
    dryerballs:{
      headline:'The smallest laundry swap can change the whole load.',
      captionAngle:`${n} belong to the part of laundry everyone notices: static, dry time, wrinkles, and clothes that feel easier to fold and wear. They are simple, reusable, and quietly practical.`,
      visualAngle:'Show the dryer balls as a tactile, reusable solution inside a real laundry rhythm.',
      shotDetails:`Best image: ${n} in a basket with warm towels, a dryer door slightly open, natural wool texture visible, and a calm laundry room background. Include a skirt, blanket, or linen piece to hint at static and softness.`
    },
    dishwasher:{
      headline:'The kitchen reset starts before the sink is empty.',
      captionAngle:`${n} is for the end of the day moment when dishes need to feel truly done. It belongs to a kitchen routine that values clean tools, clear ingredients, and a simpler way to restock the basics.`,
      visualAngle:'Show a practical kitchen cleanup scene with clean dishes, powder, and a calm counter.',
      shotDetails:`Best image: ${n} beside an open dishwasher, clean plates, a wooden scoop, a small jar or pouch, cream dish towels, and warm kitchen light. Keep it useful rather than glossy.`
    },
    dishsoak:{
      headline:'Some dishes need a little patience before they come clean.',
      captionAngle:`${n} is made for the pan, pot, or baking dish that needs help before scrubbing. It turns the frustrating part of cleanup into a slower, simpler reset.`,
      visualAngle:'Show the product solving a real stuck-on kitchen problem without making the scene look harsh.',
      shotDetails:`Best image: a sink or enamel basin with a soaking pot, ${n} nearby in a jar or pouch, a wooden brush, linen towel, warm water, and soft kitchen light.`
    },
    solidsoap:{
      headline:'A dish soap can be beautiful because it is useful.',
      captionAngle:`${n} brings an older, simpler rhythm back to the sink: one solid bar, a brush, warm water, and dishes getting clean without another plastic bottle crowding the counter.`,
      visualAngle:'Show the solid soap as a practical sink-side tool with heritage and restraint.',
      shotDetails:`Best image: ${n} on a small dish or wood soap rest beside a dish brush, stacked plates, linen towel, and warm sink light. Let the bar look used, not staged.`
    },
    allpurpose:{
      headline:'One cleaner should earn its place in more than one room.',
      captionAngle:`${n} belongs to the daily wipe-downs: counters, tables, shelves, fingerprints, and the little messes that make a home feel unfinished. Simple products make repeated routines easier to keep.`,
      visualAngle:'Show a real reset moment across a common surface, not a sterile cleaning ad.',
      shotDetails:`Best image: ${n} in an amber or clear bottle on a kitchen table or counter with a cloth, crumbs or light mess, warm wood, and natural light.`
    },
    glasscleaner:{
      headline:'Clear glass changes the whole room.',
      captionAngle:`${n} is for the small details that make a space feel cared for: windows, mirrors, glass doors, and the streaks you notice when the light comes in.`,
      visualAngle:'Make clarity visible through window light, reflection, and a simple cleaning moment.',
      shotDetails:`Best image: ${n} beside a bright window or mirror with a linen cloth, soft reflection, warm light, and a clean but lived-in room behind it.`
    },
    linen:{
      headline:'Scent is one of the quickest ways a house starts to feel like home.',
      captionAngle:`${n} belongs to the small reset moments: smoothing the bed, folding the towels, opening the windows, or freshening the room before people walk back in. A familiar scent can make a home feel cared for before anyone says a word.`,
      visualAngle:'Make scent feel visible through atmosphere: soft fabric, open window light, a freshly made bed or folded linen, and one amber spray bottle placed naturally in reach.',
      shotDetails:`Best image: a calm bedroom, laundry room, or sitting room with ${n} in an amber bottle on a wood nightstand, linen-covered bed, or folded towel stack. Include soft morning window light, cream bedding or cotton towels, a small branch or dried herbs, and a subtle sense of air moving through the room.`
    },
    miswak:{
      headline:'A toothbrush can carry a very old kind of simplicity.',
      captionAngle:`${n} connects daily care to a traditional tool that is small, useful, and easy to keep close. It is a reminder that simple routines can still feel thoughtful.`,
      visualAngle:'Show the miswak as a natural personal-care tool with heritage and clean restraint.',
      shotDetails:`Best image: ${n} on cream linen or a small bathroom shelf with a ceramic cup, warm wood, natural light, and minimal personal-care objects.`
    },
    beard:{
      headline:'A grooming routine should feel useful, not fussy.',
      captionAngle:`${n} belongs to the everyday habit of looking cared for without making the routine complicated. It is practical, simple to reach for, and made for repeated use.`,
      visualAngle:'Show a grounded, masculine grooming moment with warm materials and simple care.',
      shotDetails:`Best image: ${n} on a wood counter beside a comb, towel, mirror edge, and warm morning light. Keep it refined but practical.`
    },
    magnesium:{
      headline:'Evening routines can help the whole day settle.',
      captionAngle:`${n} belongs to the quiet end of the day: tired hands, heavy legs, bedtime rhythms, and a small moment of care before rest.`,
      visualAngle:'Show calm evening self-care without making it look like a spa advertisement.',
      shotDetails:`Best image: ${n} on a nightstand or linen beside a book, warm lamp light, soft blanket, and a calm bedside setting.`
    },
    tallow:{
      headline:'Skin care can feel old-fashioned in the best way.',
      captionAngle:`${n} is simple, recognizable, and close to the source. Good skincare does not have to feel complicated to feel nourishing, useful, and cared for.`,
      visualAngle:'Show texture, jars, soft cloth, hands, warm light, and a calm but practical making or use moment.',
      shotDetails:`Best image: a small jar of ${n} on cream linen with a wooden spoon, soft texture visible, warm window light, and simple making tools in the background.`
    },
    lip:{
      headline:'The smallest things are often the ones we reach for most.',
      captionAngle:`${n} belongs in the pocket, the bag, the nightstand, and the car console: a tiny routine that makes daily care easier to keep close.`,
      visualAngle:'Show the lip balm as a small, useful everyday item with warmth and simplicity.',
      shotDetails:`Best image: ${n} near a linen pouch, book, keys, bedside table, or coat pocket with soft light and a practical everyday feel.`
    },
    callus:{
      headline:'Hard-working hands deserve practical care.',
      captionAngle:`${n} is for the hands, heels, and cuticles that show the work of real life: gardening, washing, making, cleaning, and keeping a home moving.`,
      visualAngle:'Show useful care for working hands without making it precious.',
      shotDetails:`Best image: ${n} beside garden gloves, a nail brush, linen towel, warm wood, or clean hands after work. Keep it honest and tactile.`
    }
  };
  return profiles[product.id] || null;
}
function applyLensToConcept(concept, productName, lensIds){
  if(lensIds.includes('sensory')) concept.visualAngle+=' Let texture, scent, light, and atmosphere do more of the selling than copy on the image.';
  if(lensIds.includes('convenience')) concept.shotDetails+=' Add one visual cue that this is quick to use or easy to keep within reach.';
  if(lensIds.includes('simplicity')) concept.shotDetails+=' Keep the scene spare enough that the viewer immediately understands what to do with it.';
  if(lensIds.includes('social-proof')) concept.visualAngle+=' Make it feel like a routine real homes already use, not a staged product launch.';
  if(lensIds.includes('quality')) concept.visualAngle+=' Show quality through restraint, materials, label clarity, and the product earning the center of the frame.';
  if(lensIds.includes('heritage')) concept.visualAngle+=' Include one quiet traditional detail if it fits naturally, while keeping the scene useful for modern life.';
  if(lensIds.includes('beauty')) concept.visualAngle+=' Make the image beautiful because it is useful, not decorative for its own sake.';
  if(lensIds.includes('education')) concept.shotDetails+=' Include the ingredient, tool, or process detail that makes the lesson visible.';
  return concept;
}
function simpleMarketingConcept(goal, focus, lenses){
  const raw=(goal||'').trim();
  const lower=raw.toLowerCase();
  const lensIds=lenses.map(lens=>lens.id);
  const product=inferMarketingProduct(raw);
  const productName=product?.name || 'the product';
  const baseScene=raw || 'an ordinary home routine becoming more useful, beautiful, and cared for';
  let headline='The ordinary routine becomes a place for better choices.';
  let captionAngle='Most homes are built in the small decisions no one else sees: what gets used, what gets kept, what gets refilled, and what earns a place in the routine.';
  let visualAngle='Show the real setting with one clear focal point, enough context to tell the story, and practical beauty in the details.';
  let shotDetails='A warm work surface with one useful Common Good product as the focal point, surrounded by a few real-life supporting objects: linen, glass, wood, a practical tool, and soft window light. Keep the background calm and lived-in.';
  const profile=product ? productMarketingProfile(product, lower) : null;
  if(profile){
    headline=profile.headline;
    captionAngle=profile.captionAngle;
    visualAngle=profile.visualAngle;
    shotDetails=profile.shotDetails;
  }
  if(product?.id==='linen' || lower.includes('smell') || lower.includes('scent')){
    headline='Scent is one of the quickest ways a house starts to feel like home.';
    captionAngle=`${productName} belongs to the small reset moments: smoothing the bed, folding the towels, opening the windows, or freshening the room before people walk back in. A familiar scent can make a home feel cared for before anyone says a word.`;
    visualAngle='Make scent feel visible through atmosphere: soft fabric, open window light, a freshly made bed or folded linen, and one amber spray bottle placed naturally in reach.';
    shotDetails=`Best image: a calm bedroom, laundry room, or sitting room with ${productName} in an amber bottle on a wood nightstand, linen-covered bed, or folded towel stack. Include soft morning window light, cream bedding or cotton towels, a small branch or dried herbs, and a subtle sense of air moving through the room. The bottle should feel useful and within reach, not staged like perfume.`;
    if(lensIds.includes('quality') && lensIds.includes('sensory') && lensIds.includes('belonging')){
      headline='Home has a scent.';
      captionAngle=`It is fresh linens drying in the afternoon sun, the chair you always curl up in, and a guest room made ready before someone arrives. ${productName} was created for those quiet moments: not to overpower a room, but to gently welcome you back to it. Quality is not only what you see. It is what you notice the moment you walk through the door.`;
      visualAngle='Make the image feel like a memory of home: soft linen, warm sunlight, a familiar chair, and one beautiful spray bottle that belongs naturally in the room.';
      shotDetails=`Best image: a peaceful room with ${productName} on a small wood table beside a familiar reading chair, fresh folded linens, a sunlit window, and soft cream fabric. Add one sensory cue like a lifted curtain, a linen stack, or a hand smoothing a pillow. The bottle should feel like part of a welcoming home, not a perfume ad.`;
    } else if(lensIds.includes('social-proof') && lensIds.includes('convenience') && lensIds.includes('simplicity')){
      headline='Some homes just have a scent you never forget.';
      captionAngle=`The kind that makes you exhale the moment you walk through the door. ${productName} was made for the small, easy resets: a quick spritz on pillows, blankets, curtains, or the guest room before company arrives, and the whole space feels calm, clean, and cared for in seconds. Simple to use. Easy to keep on hand. One of those little routines that quietly makes a house feel like home.`;
      visualAngle='Show the product as an easy, repeatable household habit that makes a room feel ready in seconds.';
      shotDetails=`Best image: ${productName} in use during a quick room reset: one hand lightly spraying a pillow, folded throw blanket, guest bed, or curtain near soft window light. Include a tidy but lived-in room, a favorite chair or guest bed, cream textiles, warm wood, and the amber bottle within reach. The scene should communicate quick, simple, welcoming, and already-loved by real homes.`;
    } else if(lensIds.includes('sensory')){
      headline='Soft linen. Warm sunlight. A familiar room.';
      captionAngle=`Scent has a remarkable way of grounding us in a place. ${productName} adds one more layer to the feeling of home: subtle, comforting, and made to be part of everyday life.`;
      visualAngle='Lean into texture, light, and atmosphere so the viewer can almost feel the room before reading the caption.';
      shotDetails=`Best image: close, sensory details: cream linen, warm window light, an amber bottle of ${productName}, a soft blanket, and a calm surface like a nightstand or laundry table. Keep the scene quiet and tactile.`;
    } else if(lensIds.includes('quality')){
      headline='Quality belongs in the little rituals too.';
      captionAngle=`The products used every day should be made with the same care you put into your home: thoughtfully selected ingredients, a balanced fragrance, and a bottle you can refill instead of replace. ${productName} brings that kind of quality into an ordinary room reset.`;
      visualAngle='Make quality visible through the bottle, label, materials, restraint, and clean composition.';
      shotDetails=`Best image: ${productName} as the clear focal point on a refined but practical surface, with folded linen, cream paper, amber glass, and warm wood. The scene should feel balanced, clean, and refill-minded without looking sterile.`;
    } else if(lensIds.includes('belonging')){
      headline='There are some homes that make you feel welcome before anyone says a word.';
      captionAngle=`They are warm. They are calm. They smell clean without trying too hard. That is the feeling ${productName} was made for: the bed you made this morning, the blanket your family reaches for, and the home you are building one small habit at a time.`;
      visualAngle='Show a room that feels welcoming, lived-in, and unmistakably cared for.';
      shotDetails=`Best image: ${productName} placed in a welcoming room with a made bed, a favorite chair, a folded blanket, or a guest-room detail. It should feel like someone is expected, loved, or returning home.`;
    } else if(lensIds.includes('convenience')){
      headline='Sometimes you do not have time to deep clean.';
      captionAngle=`But you can freshen the guest room, refresh yesterday's throw blanket, or make the bedroom feel calm before bedtime. ${productName} is one of those simple things that takes less than a minute but changes how your home feels.`;
      visualAngle='Show the fast before-company-arrives or before-bedtime reset.';
      shotDetails=`Best image: a quick-use scene with ${productName} near pillows, a throw blanket, curtains, or an entryway bench. Include a hand reaching for the bottle or a room that looks freshly reset in under a minute.`;
    }
  } else if(lower.includes('wringer') || lower.includes('washer') || lower.includes('old with the new') || lower.includes('old and new') || lower.includes('honoring tradition') || lower.includes('clean ingredients')){
    headline='The tools changed. The purpose did not.';
    captionAngle='For generations, homemaking meant making the most of what you had: the tools, the time, the ingredients, and the work in front of you. Modern convenience can carry those same values forward when it is paired with clean ingredients, refillable containers, products that work, and less waste.';
    visualAngle='Create a visual contrast between old and new laundry tools so the image quietly says: progress can keep the old values.';
    shotDetails='Best image: a laundry room with cream beadboard or plaster wall, a modern white washer on one side, an old wringer washer or galvanized laundry tub on the other, and a Common Good laundry jar in the foreground on a worn wood table. Add folded cotton towels, a wooden scoop with powder, amber bottles or a small glass jar on a shelf, and soft side-window light. The focal point should be the bridge between old and new, not just the product jar.';
  } else if(lower.includes('laundry')){
    headline='Laundry is ordinary, but it stays close to the body all day.';
    captionAngle='Laundry feels ordinary until you remember how close it stays to your home and your body. The ingredients, scent, residue, and container all become part of the routine, which makes the better choice worth thinking about before the basket is full.';
    visualAngle='Make the laundry scene feel clean, useful, and lived-in, with fabric texture and product details supporting the message.';
    shotDetails='Best image: a calm laundry counter with a labeled or blank-label Common Good laundry jar, a wooden scoop, a small spill of powder, folded natural cotton or linen towels, and the edge of a washer or laundry basket in the background. Use fabric texture and clean light to make the viewer think about what touches the skin all day.';
  } else if(lower.includes('pantry') || lower.includes('jar')){
    headline='A shelf can be useful and beautiful at the same time.';
    captionAngle='A good shelf is not about performance. It is about making the next ordinary day easier: knowing what you have, using what you bought, and keeping the useful things close enough to reach for again.';
    visualAngle='Focus on jars, labels, shelf rhythm, warm wood, and a useful pantry moment that feels attainable.';
    shotDetails='Best image: a reachable pantry shelf with mixed useful jars, one Common Good jar as the visual anchor, simple labels, warm wood, cream paper, a linen towel, and one human detail like a hand placing a jar back on the shelf. Keep it organized but not staged to perfection.';
  } else if(lower.includes('market')){
    headline='A market table is where people can understand the work in person.';
    captionAngle='Some things make more sense in person: the weight of the jar, the scent of the product, the label in your hand, and the chance to ask the question before you bring it home.';
    visualAngle='Show the table as warm, useful, and touchable, with products arranged like real goods instead of props.';
    shotDetails='Best image: a Common Good market table with amber bottles, refill jars, folded linen, small paper tags, wood crates, and a few hands reaching or arranging products. The table should feel local, touchable, and useful, with no crowded signage or fake text.';
  } else if(lower.includes('founder') || lower.includes('alaina')){
    headline='The story matters because real people made real decisions.';
    captionAngle='Common Good did not appear as a polished idea. It came from real decisions, real experience, and the stubborn feeling that a useful thing should not disappear just because life moved to a new place.';
    visualAngle='Use hands, work surfaces, notes, labels, jars, or making work to show founders through action instead of posing.';
    shotDetails='Best image: hands working at a table with jars, handwritten notes, labels, ingredients, and packing supplies. Include human presence through action rather than a posed portrait. The scene should feel like decisions are being made and something useful is being built.';
  } else if(lower.includes('tallow') || lower.includes('lotion') || lower.includes('skin')){
    headline='Skin care can feel old-fashioned in the best way: useful, simple, and close to the source.';
    captionAngle='Some ingredients stay useful because they are simple, recognizable, and close to the source. Good skincare does not have to feel complicated to feel cared for.';
    visualAngle='Show texture, jars, soft cloth, hands, warm light, and a calm but practical making or use moment.';
    shotDetails='Best image: a small jar of tallow skincare on cream linen with a wooden spoon, soft texture visible, warm window light, and simple making tools in the background. Include hands only if they make the scene feel practical and human.';
  }
  const concept=applyLensToConcept({headline, captionAngle, visualAngle, shotDetails}, productName, lensIds);
  return {scene:baseScene, headline:concept.headline, captionAngle:concept.captionAngle, visualAngle:concept.visualAngle, shotDetails:concept.shotDetails, product};
}
function simpleCaptionByDepth(focus, depth, goal, lenses){
  const concept=simpleMarketingConcept(goal, focus, lenses);
  const lensIds=lenses.map(lens=>lens.id);
  const leadLens=lensIds[0] || '';
  const productName=concept.product?.name || 'this';
  const productLine=concept.product ? `Our ${productName}` : 'This part of homemaking';
  const has=(id)=>lensIds.includes(id);
  const closeByLens=()=>{
    if(leadLens==='convenience') return `${productLine} is meant for that kind of moment: easy to reach for, simple to use, and useful before the day gets any more complicated.`;
    if(leadLens==='social-proof') return `It is the kind of small household habit people remember because it changes the feeling of the room without making a production of it.`;
    if(leadLens==='quality') return `That is where quality matters: not as a fancy word, but in the ingredients, the packaging, the usefulness, and whether it earns its place again tomorrow.`;
    if(leadLens==='sensory') return `The sale is not only in what it does. It is in what you notice: the texture, the scent, the light, the weight of the bottle, and the way the room feels after.`;
    if(leadLens==='problem') return `The point is not to add one more thing to manage. It is to solve the small frustration that keeps showing up.`;
    if(leadLens==='simplicity') return `Fewer steps. Fewer bottles. Fewer decisions sitting on the counter.`;
    if(leadLens==='belonging') return `Made for homes that feel lived in, loved, and unmistakably their own.`;
    if(leadLens==='heritage' || leadLens==='modernity') return `The tools can change without losing the purpose behind them.`;
    if(leadLens==='education') return `Once you understand the reason behind the product, the choice feels easier to repeat.`;
    return `Small routines shape a home more than one big overhaul ever could.`;
  };
  const middleByLens=()=>{
    if(leadLens==='problem') return `${concept.captionAngle}\n\nThat is the moment worth naming: the part of the routine that feels annoying, wasteful, fussy, or easier to ignore until it is right in front of you.`;
    if(leadLens==='convenience') return `${concept.captionAngle}\n\nNot every home-care choice needs a full afternoon. Sometimes the win is being able to fix the feeling of a room, a shelf, a sink, or a load of laundry in under a minute.`;
    if(leadLens==='social-proof') return `${concept.captionAngle}\n\nSome products become favorites because they fit so quietly into real life that people keep reaching for them without thinking twice.`;
    if(leadLens==='quality') return `${concept.captionAngle}\n\nQuality is easy to overcomplicate, but in a home it usually comes down to something simpler: does it work, does it feel honest, and does it make sense to keep?`;
    if(leadLens==='sensory') return `${concept.captionAngle}\n\nThis is the part a photo can almost say before the caption does: the clean fabric, the warm wood, the glass in your hand, the scent that makes a room feel familiar.`;
    if(leadLens==='simplicity') return `${concept.captionAngle}\n\nA good routine should remove friction, not add another tiny system you have to remember.`;
    if(leadLens==='heritage' || leadLens==='modernity') return `${concept.captionAngle}\n\nThere is room for both: the old value of using things well and the modern relief of products that make the work easier.`;
    if(leadLens==='education') return `${concept.captionAngle}\n\nThe more you understand what a product is doing, the easier it is to choose it for a reason instead of out of habit.`;
    return concept.captionAngle;
  };
  if(depth==='short'){
    return `${concept.headline}\n\n${middleByLens().split('\n\n')[0]}`;
  }
  if(depth==='education'){
    return `${concept.headline}\n\n${middleByLens()}\n\nHere is the useful question: what is this product actually helping with, and why does that matter in a real home?\n\n${closeByLens()}`;
  }
  if(depth==='story' || depth==='long'){
    return `${concept.headline}\n\n${middleByLens()}\n\nThat is the part of the story Common Good wants to document: not a perfect home, but a real one being tended in small repeated choices.\n\n${closeByLens()}`;
  }
  return `${concept.headline}\n\n${middleByLens()}\n\n${closeByLens()}`;
}
function simpleImagePrompt(focus, depth, goal, lenses){
  const concept=simpleMarketingConcept(goal, focus, lenses);
  const idea=concept.scene;
  const lensNames=lenses.map(lens=>lens.name).join(', ') || 'natural buying reason';
  const focusCue={
    product:'show the product in use as part of a real household routine',
    home:'document the thoughtful home first, with the product fitting naturally if it belongs',
    market:'show a warm market table or vendor prep moment with useful goods arranged clearly',
    company:'show behind-the-scenes work, hands, labels, batches, jars, or practical decisions',
    education:'show the teaching moment visually with clear ingredients, tools, or process details',
    mission:'show a home rhythm that feels useful, rooted, lower-waste, and calm',
    founders:'show real people building, packing, making, or deciding rather than posing like a brand shoot',
    reel:'create a visual sequence with a strong first frame and simple before/after motion',
    place:'root the scene in small-town Nebraska, local market rhythms, warm wood, glass, and real homes'
  };
  const depthCue={
    short:'single clear image, simple composition, immediate read',
    medium:'one polished editorial-style social image with a clear subject and useful context',
    long:'richer story image with foreground action, background context, and a lived-in sense of place',
    education:'instructional but beautiful, showing the useful detail clearly without looking clinical',
    story:'documentary-style image that feels like a real moment unfolding'
  };
  return `Create an original image concept for Common Good Refillery & More.\n\nLevel-up concept: ${concept.headline}\n\nWhat the image should contain: ${concept.shotDetails}\n\nVisual interpretation: ${concept.visualAngle}\n\nPost focus: ${focus.name}. Visual purpose: ${focusCue[focus.id] || focusCue.home}.\n\nBuying lens: ${lensNames}.\n\nComposition: ${depthCue[depth] || depthCue.medium}. Make the image feel like an editorial photograph from a real Common Good home, not a literal checklist of objects. Use warm natural window light, useful glass, linen, wood, cream paper, olive-brown brand tones, approved Common Good label artwork when available, amber glass where appropriate, and a refined but practical homemaking feel.\n\nLabel handling: if an approved product label or Common Good logo exists in the owner's Workroom, use that approved artwork as the label source. Do not invent new label wording, slogans, logos, or product names. If approved artwork cannot be used directly, leave a clean blank label area or a partially turned label so the approved artwork can be composited later.\n\nAvoid: emojis, cartoon style, fake brand labels, cluttered text, invented poster text, misspelled appliance text, luxury-for-luxury's-sake styling, stock-photo perfection, plastic-heavy scenes, exaggerated claims, direct replication of previous Common Good posts, or anything that looks like a generic influencer ad.\n\nMake it feel specific to Common Good: small-town Nebraska, useful beauty, honest home care, practical stewardship, warm restraint, and real routines.`;
}
function requestMarketingImageGeneration(){
  const prompt=(window.currentPostKit?.imagePrompt || '').trim();
  const status=document.getElementById('marketingImageStatus');
  if(!prompt){
    if(status) status.textContent='Add or generate an image prompt first.';
    return;
  }
  window.pendingMarketingImagePrompt=prompt;
  if(status) status.textContent='Prompt ready. Ask Codex to generate this image when you are happy with the edited prompt.';
}
function generateSimpleMarketingCaption(){
  const focus=marketingFocusById(document.getElementById('marketingFocus')?.value || 'home');
  const depth=document.getElementById('marketingCaptionDepth')?.value || 'medium';
  const outputType=document.getElementById('marketingOutputType')?.value || 'both';
  const goal=document.getElementById('marketingGoal')?.value || '';
  const lenses=simpleSelectedMarketingLenses();
  const adDirector=getAdDirectorInput();
  const concept=simpleMarketingConcept(goal, focus, lenses);
  const caption=simpleCaptionByDepth(focus, depth, goal, lenses);
  const imagePrompt=simpleImagePrompt(focus, depth, goal, lenses);
  window.currentPostKit={
    focusId:focus.id,
    focusName:focus.name,
    productId:concept.product?.id || null,
    productName:concept.product?.name || '',
    depth,
    outputType,
    goal,
    adGoal:adDirector.goal,
    customerStage:adDirector.stage,
    budgetMode:adDirector.budgetMode,
    lenses:lenses.map(lens=>lens.name),
    lensIds:lenses.map(lens=>lens.id),
    caption,
    imagePrompt
  };
  renderCurrentPostKit();
}
function save(){ localStorage.setItem('cg_cart', JSON.stringify(cart)); updateCartCount(); }
function updateCartCount(){ document.getElementById('cartCount').textContent = cart.length; }
function setTitle(t){ document.getElementById('pageTitle').textContent=t; }
function app(html){ document.getElementById('app').innerHTML=html; window.scrollTo(0,0); }

function showHome(){
  setTitle('Refill Station');
  app(`
    <section class="hero">
      <div class="eyebrow">WELCOME TO COMMON GOOD</div>
      <h2>How are you shopping today?</h2>
      <p>Choose one path. You can add several kinds of items to the same cart.</p>
    </section>
    <section class="grid grid-3">
      <article class="card action-card">
        <div><div class="path-label">By weight</div><h3>Refill</h3><p>Fill a Common Good glass container or one you brought from home.</p></div>
        <button class="primary full" onclick="showRefillProducts()">Start a refill</button>
      </article>
      <article class="card action-card">
        <div><div class="path-label">Ready now</div><h3>Pantry Ready</h3><p>Choose a product that is already packaged and ready to take home.</p></div>
        <button class="primary full" onclick="showPantry()">Shop Pantry Ready</button>
      </article>
      <article class="card action-card">
        <div><div class="path-label">Containers</div><h3>Glass Collection</h3><p>Shop vintage jars, bottles, canisters, and useful glass containers.</p></div>
        <button class="primary full" onclick="showGlass()">Browse glass</button>
      </article>
      <article class="card action-card">
        <div><div class="path-label">Pantry Ready delivery</div><h3>Request Pantry Ready</h3><p>Tell us what you want packed for delivery, porch drop-off, or market pickup.</p></div>
        <button class="primary full" onclick="showMobileRefillRequest()">Start request</button>
      </article>
    </section>
  `);
}

function showMobileRefillRequest(){
  setTitle('Pantry Ready Request');
  const pantryProducts=products.filter(p=>p.pantry && isProductActive(p));
  const pantryOptions=pantryProducts.flatMap(product=>pantryVariants(product).map(variant=>({product,variant})));
  app(`<section class="hero">
    <div class="eyebrow">PANTRY READY</div>
    <h2>Tell us what needs restocked.</h2>
    <p>Use this form for magnet, market, porch drop-off, and Pantry Ready delivery requests.</p>
  </section>
  <section class="card">
    <div class="notice">Delivery fee is not set yet. Common Good will confirm any delivery fee before scheduling your order.</div>
    <div class="spacer"></div>
    <div class="notice">Your request is saved to the Common Good request log. We will use your phone number to coordinate timing, delivery details, and any questions.</div>
    <div class="spacer"></div>
    <div class="form-grid">
      <div><label>Your name</label><input id="mobileName" autocomplete="name" placeholder="Name"></div>
      <div><label>Phone number</label><input id="mobilePhone" autocomplete="tel" inputmode="tel" placeholder="Best number for text/call" onblur="prefillMobileCustomerFromPhone()"></div>
      <div><label>Request type</label><select id="mobileType">
        <option>Pack Pantry Ready items</option>
        <option>Delivery or porch drop-off</option>
        <option>Bring to market pickup</option>
        <option>Pantry Ready plus possible add-ons</option>
        <option>Not sure yet</option>
      </select></div>
      <div><label>Preferred timing</label><input id="mobileTiming" placeholder="Example: before Saturday market, next week, flexible"></div>
      <div class="summary">
        <strong>Pantry Ready products needed</strong>
        <div class="request-product-grid">
          ${pantryOptions.map(({product,variant})=>`<label class="check-row"><input type="checkbox" name="mobileProducts" value="${variantKey(product.id,variant.id)}"><span>${product.name} · ${variant.size}</span></label>`).join('')}
        </div>
      </div>
      <div><label>Packaging / add-on notes</label><textarea id="mobileContainers" placeholder="Example: quantities, scent preferences, extra jars, glass pieces, labels, or things we might bring as add-ons."></textarea></div>
      <div><label>Pickup, delivery, or address notes</label><textarea id="mobileLocation" placeholder="Market pickup, porch drop-off area, delivery address, or best way to coordinate."></textarea><p id="mobileProfileNote" class="small">Enter your phone number first. If it matches a previous Pantry Ready delivery request from this device, saved delivery details can fill in.</p></div>
      <div class="summary">
        <strong>Text updates</strong>
        <label class="check-row"><input id="mobileTextUpdates" type="checkbox" checked><span>Text me updates about this request.</span></label>
        <p class="small">We will only use text updates for this request unless you ask to receive other updates later.</p>
      </div>
      <div><label>Anything else?</label><textarea id="mobileNotes" placeholder="Tell us quantities, scents, questions, or what you are almost out of."></textarea></div>
      <button class="primary full" onclick="submitMobileRefillRequest()">Submit request</button>
      <div id="mobileRequestMessage"></div>
    </div>
  </section>`);
}

function submitMobileRefillRequest(){
  const message=document.getElementById('mobileRequestMessage');
  const name=document.getElementById('mobileName')?.value.trim();
  const phone=document.getElementById('mobilePhone')?.value.trim();
  const selectedProducts=[...document.querySelectorAll('input[name="mobileProducts"]:checked')]
    .map(input=>parseVariantKey(input.value))
    .filter(({product,variant})=>product && variant)
    .map(({product,variant})=>({id:product.id,name:product.name,category:product.category,variantId:variant.id,size:variant.size,price:variant.price}));
  if(!name || !phone){
    if(message) message.innerHTML='<div class="notice warning">Add your name and phone number so Common Good can follow up.</div>';
    return;
  }
  if(!selectedProducts.length && !document.getElementById('mobileNotes')?.value.trim()){
    if(message) message.innerHTML='<div class="notice warning">Choose at least one product or add a note about what you need.</div>';
    return;
  }
  const request={
    id:`req-${Date.now()}`,
    date:new Date().toISOString(),
    status:'New',
    name,
    phone,
    requestType:document.getElementById('mobileType')?.value || 'Pantry Ready request',
    deliveryFee:'Unknown',
    textRecipients:['Kaelea','Alaina'],
    textUpdates:document.getElementById('mobileTextUpdates')?.checked || false,
    textUpdateStatus:'Text follow-up needed',
    scheduled:false,
    delivered:false,
    orderCompleted:false,
    timing:document.getElementById('mobileTiming')?.value.trim() || '',
    products:selectedProducts,
    containers:document.getElementById('mobileContainers')?.value.trim() || '',
    location:document.getElementById('mobileLocation')?.value.trim() || '',
    notes:document.getElementById('mobileNotes')?.value.trim() || '',
    ownerNotes:''
  };
  rememberCustomerProfile(request);
  const requests=getMobileRefillRequests();
  requests.unshift(request);
  saveMobileRefillRequests(requests);
  const ownerSmsHref=ownerSmsHrefForRequest(request);
  if(ownerSmsHref) request.textUpdateStatus='Owner text opened from customer request';
  saveMobileRefillRequests(requests);
  setTitle('Request Sent');
  app(`<section class="hero">
    <div class="eyebrow">REQUEST RECEIVED</div>
    <h2>Thank you, ${escapeHTML(name)}.</h2>
    <p>Common Good has your Pantry Ready request. We will use the phone number you provided to coordinate details.</p>
  </section>
  <section class="card">
    <div class="summary">
      <strong>Request type:</strong> ${escapeHTML(request.requestType)}<br>
      <strong>Products:</strong> ${selectedProducts.length ? selectedProducts.map(p=>escapeHTML(p.name)).join(', ') : 'See notes'}<br>
      <strong>Timing:</strong> ${escapeHTML(request.timing || 'Flexible')}<br>
      <strong>Delivery fee:</strong> Unknown until Common Good confirms scheduling
    </div>
    <div class="spacer"></div>
    <button class="primary" onclick="showHome()">Back to shop</button>
    ${ownerSmsHref ? '<p class="small">Your phone should open a text to Common Good. Please make sure both Kaelea and Alaina are listed before sending.</p>' : '<p class="small">Request saved. Common Good will review the request log.</p>'}
  </section>`);
  if(ownerSmsHref) window.location.href=ownerSmsHref;
}

function showRefillProducts(){
  setTitle('Choose a Refill Product');
  const rows = products.filter(p=>p.refill && isProductActive(p)).map(p=>`
    <div class="product-row">
      <div><strong>${p.name}</strong><div class="product-meta">${p.category} · ${money(p.pricePerUnit)} per ${p.unit}</div></div>
      <button class="primary" onclick="startRefill('${p.id}')">Select</button>
    </div>`).join('');
  app(`<div class="product-list">${rows}</div>`);
}

function startRefill(id){
  const p = products.find(x=>x.id===id);
  window.currentRefill={productId:id};
  setTitle(p.name);
  showContainerStep();
}

function stepHeader(step, title, text){
  return `<div class="step-header">
    <div class="step-kicker">Step ${step} of 3</div>
    <h2>${title}</h2>
    <p>${text}</p>
  </div>`;
}

function showContainerStep(){
  const p = products.find(x=>x.id===window.currentRefill.productId);
  setTitle(p.name);
  app(`
    <section class="card">
      ${stepHeader(1,'Choose a container','Tell us what the refill is going into.')}
      <div class="choice-list">
        <button class="choice-card" onclick="selectContainer('own')">
          <span>
            <strong>I brought my own</strong>
            <small>Weigh the empty container first.</small>
          </span>
        </button>
        <button class="choice-card" onclick="showCommonGlassStep()">
          <span>
            <strong>Common Good glass</strong>
            <small>Choose a glass container with a saved tare weight.</small>
          </span>
        </button>
        <button class="choice-card" onclick="showSavedContainerStep()">
          <span>
            <strong>Saved container</strong>
            <small>Use a container you saved before.</small>
          </span>
        </button>
      </div>
      <button class="quiet back-button" onclick="showRefillProducts()">Back to products</button>
    </section>
  `);
}

function showCommonGlassStep(){
  const p = products.find(x=>x.id===window.currentRefill.productId);
  setTitle(p.name);
  app(`
    <section class="card">
      ${stepHeader(1,'Choose Common Good glass','Pick the container being used for this refill.')}
      <div class="choice-list">
        ${glass.map(g=>`<button class="choice-card glass-choice" onclick="selectContainer('common','${g.id}')">
          ${glassPhoto(g)}
          <span class="glass-choice-copy">
            <strong>${g.name}</strong>
            <small>${glassMeta(g)}</small>
          </span>
        </button>`).join('')}
      </div>
      <button class="quiet back-button" onclick="showContainerStep()">Back</button>
    </section>
  `);
}

function showSavedContainerStep(){
  const p = products.find(x=>x.id===window.currentRefill.productId);
  setTitle(p.name);
  if(!savedContainers.length){
    app(`
      <section class="card">
        ${stepHeader(1,'Saved containers','No saved containers are on this device yet.')}
        <div class="notice">Use your own container this time. After adding the refill to your cart, you can save it for next time.</div>
        <div class="button-row">
          <button class="primary" onclick="selectContainer('own')">Use my own container</button>
          <button class="secondary" onclick="showContainerStep()">Back</button>
        </div>
      </section>
    `);
    return;
  }
  app(`
    <section class="card">
      ${stepHeader(1,'Choose a saved container','Pick the container being used for this refill.')}
      <div class="choice-list">
        ${savedContainers.map((g,i)=>`<button class="choice-card" onclick="selectContainer('saved',${i})">
          <span>
            <strong>${g.name}</strong>
            <small>Tare ${g.tare} oz</small>
          </span>
        </button>`).join('')}
      </div>
      <button class="quiet back-button" onclick="showContainerStep()">Back</button>
    </section>
  `);
}

function selectContainer(type, value){
  let container=null, tare=null;
  if(type==='common'){
    container=glass.find(g=>g.id===value);
    tare=container.tare;
  }
  if(type==='saved'){
    container=savedContainers[value];
    tare=container?.tare;
  }
  window.currentRefill={...window.currentRefill,type,container,tare};
  showWeightStep();
}

function showWeightStep(){
  const r=window.currentRefill;
  const p = products.find(x=>x.id===r.productId);
  const containerLine = r.type==='own'
    ? 'Enter the empty container weight, then the filled weight.'
    : `${r.container.name} · tare ${r.tare} oz`;
  setTitle(p.name);
  app(`
    <section class="card">
      ${stepHeader(2,'Enter weights',containerLine)}
      <div class="form-grid">
        ${r.type==='own'?`<div>
          <label for="tareWeight">Empty container weight / tare (ounces)</label>
          <input id="tareWeight" type="number" min="0" step=".01" placeholder="Example: 12.8">
        </div>`:`<div class="summary"><strong>Tare weight:</strong> ${r.tare} oz</div>`}
        <div>
          <label for="filledWeight">Filled weight (ounces)</label>
          <input id="filledWeight" type="number" min="0" step=".01" placeholder="Place filled container on scale">
        </div>
        <button class="primary full" onclick="calculateRefill()">Review refill</button>
        <div id="calcResult"></div>
      </div>
      <button class="quiet back-button" onclick="showContainerStep()">Back</button>
    </section>
  `);
}

function calculateRefill(){
  const r=window.currentRefill;
  const p = products.find(x=>x.id===r.productId);
  const type = r.type;
  const filled = parseFloat(document.getElementById('filledWeight').value);
  let tare = type==='own' ? parseFloat(document.getElementById('tareWeight')?.value) : r.tare;
  let container=r.container;
  if(!Number.isFinite(filled) || !Number.isFinite(tare) || filled<=tare){
    document.getElementById('calcResult').innerHTML=`<div class="notice warning">Check the filled and empty weights. Filled weight must be greater than tare weight.</div>`;
    return;
  }
  const net = filled-tare;
  const productPrice = net*p.pricePerUnit;
  const containerPrice = type==='common' ? container.price : 0;
  const total = productPrice+containerPrice;
  window.lastRefill={p,type,tare,filled,net,productPrice,container,containerPrice,total};
  setTitle('Review Refill');
  app(`<section class="card">
    ${stepHeader(3,'Review refill','Confirm the amount before adding it to the cart.')}
    <div class="summary">
      <div><strong>Product name:</strong> ${p.name}</div>
      <div><strong>Rate:</strong> ${money(p.pricePerUnit)} per ${p.unit}</div>
      <details class="customer-math">
        <summary>Show refill math</summary>
        <div><strong>Filled weight:</strong> ${filled.toFixed(2)} oz</div>
        <div><strong>Tare weight:</strong> ${tare.toFixed(2)} oz</div>
        <div><strong>Product weight:</strong> ${net.toFixed(2)} oz</div>
        <div><strong>Refill math:</strong> ${net.toFixed(2)} oz × ${money(p.pricePerUnit)} = ${money(productPrice)}</div>
      </details>
      ${containerPrice?`<div><strong>${container.name}:</strong> ${money(containerPrice)}</div>`:''}
      <div class="price">${money(total)}</div>
      <button class="primary full" onclick="addCalculatedRefill()">Add to cart</button>
    </div>
    <button class="quiet back-button" onclick="showWeightStep()">Back</button>
  </section>`);
}

function addCalculatedRefill(){
  const r=window.lastRefill;
  cart.push({type:'refill',name:r.p.name,detail:`${r.net.toFixed(2)} oz refill`,price:r.productPrice});
  if(r.containerPrice) cart.push({type:'glass',name:r.container.name,detail:'Common Good glass',price:r.containerPrice});
  save();
  if(r.type==='own'){
    app(`<section class="card">
      <h2>Added to cart</h2>
      <p>Would you like to save this container for next time?</p>
      <div class="summary">
        <div><strong>Tare weight:</strong> ${r.tare.toFixed(2)} oz</div>
      </div>
      <div class="spacer"></div>
      <label for="containerName">Container name</label>
      <input id="containerName" type="text" value="My refill jar" autocomplete="off">
      <div id="saveContainerMessage" class="small"></div>
      <div class="button-row">
        <button class="primary" onclick="saveOwnContainer(${r.tare})">Save container</button>
        <button class="secondary" onclick="showCart()">Not now</button>
      </div>
    </section>`);
  } else showCart();
}

function saveOwnContainer(tare){
  const input=document.getElementById('containerName');
  const message=document.getElementById('saveContainerMessage');
  const name=input?.value.trim();
  if(!name){
    message.textContent='Add a simple name so you can recognize this container next time.';
    input?.focus();
    return;
  }
  savedContainers.push({name,tare});
  localStorage.setItem('cg_containers',JSON.stringify(savedContainers));
  showCart();
}

function showPantry(){
  setTitle('Pantry Ready');
  const pantryOptions=products.filter(p=>p.pantry && isProductActive(p)).flatMap(product=>pantryVariants(product).map(variant=>({product,variant})));
  app(`<div class="notice">Pantry Ready items are already packaged and ready to take home.</div><div class="spacer"></div><div class="product-list">${pantryOptions.map(({product,variant})=>`
    <div class="product-row">
      <div><strong>${product.name}</strong><div class="product-meta">${variant.size} · ${money(variant.price)}</div></div>
      <button class="primary" onclick="addPantry('${product.id}','${variant.id}')">Add</button>
    </div>`).join('')}</div>`);
}
function addPantry(id, variantId='default'){
  const {product,variant}=findPantryVariant(id, variantId);
  if(!product || !variant) return;
  cart.push({type:'pantry',name:product.name,detail:variant.size,price:variant.price,productId:product.id,variantId:variant.id});
  save();
  showPantry();
}

function showGlass(){
  setTitle('Glass Collection');
  app(`<div class="notice">Common Good-supplied refill containers are glass only. Customers may bring their own clean containers of any suitable material. Photos are optional for glass inventory; prices and tare weights should be verified before they are used for checkout.</div><div class="spacer"></div>
  <div class="product-list">${glass.map(g=>`
    <div class="product-row glass-row">
      ${glassPhoto(g)}
      <div class="glass-row-copy"><strong>${g.name}</strong><div class="product-meta">${glassMeta(g)}</div></div>
      <button class="primary" onclick="addGlass('${g.id}')">Add</button>
    </div>`).join('')}</div>`);
}
function addGlass(id){
  const g=glass.find(x=>x.id===id);
  cart.push({type:'glass',name:g.name,detail:`tare ${g.tare} oz`,price:g.price});
  save(); showGlass();
}

function showCart(){
  setTitle('Your Cart');
  if(!cart.length){
    app(`<section class="card"><h2>Your cart is empty</h2><button class="primary" onclick="showHome()">Start shopping</button></section>`);
    return;
  }
  const total=cart.reduce((s,x)=>s+x.price,0);
  app(`<section class="card">
    ${cart.map((x,i)=>`<div class="line-item"><div><strong>${x.name}</strong><div class="small">${x.detail}</div></div><div>${money(x.price)}</div><button class="quiet" onclick="removeCart(${i})">Remove</button></div>`).join('')}
    <div class="total"><span>Total</span><span>${money(total)}</span></div>
    <button class="primary full" onclick="showCheckout()">Checkout</button>
  </section>`);
}
function removeCart(i){cart.splice(i,1);save();showCart();}

function showCheckout(){
  setTitle('Choose Payment');
  const checkout=getCheckout();
  app(`<section class="card">
    <h2>Payment passcode</h2>
    <div class="passcode">${checkout.passcode}</div>
    <p class="small">Write this on the cash envelope, check memo, or Venmo description so the payment can be matched in the Sales Ledger.</p>
  </section>
  <div class="spacer"></div>
  <section class="payment-grid">
    <article class="card payment-card"><div class="path-label">Envelope</div><h3>Cash</h3><button class="primary" onclick="showPayment('cash')">Select</button></article>
    <article class="card payment-card"><div class="path-label">Envelope</div><h3>Check</h3><button class="primary" onclick="showPayment('check')">Select</button></article>
    <article class="card payment-card"><div class="path-label">Mobile pay</div><h3>Venmo</h3><button class="primary" onclick="showPayment('venmo')">Select</button></article>
  </section>`);
}

function showPayment(type){
  setTitle(type[0].toUpperCase()+type.slice(1)+' Payment');
  const total=cart.reduce((s,x)=>s+x.price,0);
  const checkout=getCheckout();
  if(type==='cash'){
    app(`<section class="card"><h2>Cash total: ${money(total)}</h2>
      <div class="passcode">${checkout.passcode}</div>
      <div class="notice"><strong>1.</strong> Write this passcode on the payment slip.<br><strong>2.</strong> Place your cash and slip inside a silicone payment envelope.<br><strong>3.</strong> Place the sealed envelope in the cash box.</div>
      <div class="spacer"></div><button class="primary full" onclick="finishSale('Cash')">I deposited my payment</button></section>`);
  }
  if(type==='check'){
    app(`<section class="card"><h2>Check total: ${money(total)}</h2>
      <div class="passcode">${checkout.passcode}</div>
      <div class="notice"><strong>Make check payable to:</strong> Common Good<br><br>Write the passcode in the memo line, then place your check in a silicone payment envelope and deposit it in the cash box.</div>
      <p class="small">Returned checks are subject to the posted returned-check fee and any collection costs allowed by law. Final wording should be reviewed before launch.</p>
      <button class="primary full" onclick="finishSale('Check')">I deposited my check</button></section>`);
  }
  if(type==='venmo'){
    const settings=getOwnerSettings();
    const venmoHandle=settings.venmoHandle || '';
    app(`<section class="card" style="text-align:center"><h2>Venmo total: ${money(total)}</h2>
      <div class="passcode">${checkout.passcode}</div>
      <div class="qr" aria-label="Venmo QR code area"></div>
      <p><strong>${escapeHTML(venmoHandle || 'Add Venmo handle in Owner Settings')}</strong></p>
      <p class="small">Use the passcode in the Venmo description so this sale can be matched later.</p>
      <a class="primary" style="display:inline-block;text-decoration:none" href="https://venmo.com/" target="_blank">Open Venmo</a>
      <div class="spacer"></div><button class="secondary full" onclick="finishSale('Venmo')">I completed payment</button>
      ${venmoHandle?'':'<p class="small">Owner action needed: add the verified business Venmo handle in Settings before using Venmo checkout.</p>'}</section>`);
  }
}

function finishSale(method){
  const total=cart.reduce((s,x)=>s+x.price,0);
  const checkout=getCheckout();
  const sale={date:new Date().toISOString(),passcode:checkout.passcode,method,total,enteredAmount:null,items:[...cart]};
  const sales=getSales(); sales.push(sale); saveSales(sales);
  cart=[];save();
  window.currentCheckout=null;
  setTitle('Thank You');
  app(`<section class="hero"><h2>Thank you for shopping Common Good.</h2><p>Your ${method.toLowerCase()} purchase of <strong>${money(total)}</strong> has been recorded with passcode <strong>${sale.passcode}</strong>.</p><button class="primary" onclick="showHome()">Start a new purchase</button></section>`);
}

function showAccount(){
  setTitle('My Containers');
  app(`<section class="card"><h2>Saved containers</h2>
    ${savedContainers.length?savedContainers.map((c,i)=>`<div class="line-item"><div><strong>${c.name}</strong><div class="small">Tare ${c.tare} oz</div></div><div></div><button class="quiet" onclick="deleteContainer(${i})">Remove</button></div>`).join(''):`<p>No containers saved yet. You can save one after completing a refill with your own container.</p>`}
  </section>`);
}
function deleteContainer(i){savedContainers.splice(i,1);localStorage.setItem('cg_containers',JSON.stringify(savedContainers));showAccount();}

function showLogin(){
  setTitle('Owner Login');
  if(adminUnlocked){showAdmin();return;}
  app(`<section class="card" style="max-width:460px;margin:auto"><h2>Common Good Workroom</h2>
    <label>Password</label><input id="password" type="password" placeholder="Owner password" autocomplete="current-password" onkeydown="if(event.key==='Enter') login()">
    <div class="spacer"></div><button class="primary full" onclick="login()">Sign in</button>
    <p class="small">Owner access stays remembered on this device for 90 days.</p></section>`);
}
function login(){
  if(document.getElementById('password').value===ownerPassword){
    adminUnlocked=true;
    rememberOwnerSession();
    showAdmin();
  }
  else alert('Incorrect password.');
}

function saleExpectedTotal(sale){ return Number.isFinite(sale.total) ? sale.total : 0; }
function saleEnteredAmount(sale){
  const amount=Number(sale.enteredAmount);
  return Number.isFinite(amount) ? amount : null;
}
function saleVariance(sale){
  const entered=saleEnteredAmount(sale);
  if(entered===null) return null;
  return entered-saleExpectedTotal(sale);
}
function formatSaleDate(iso){
  if(!iso) return '';
  return new Date(iso).toLocaleString([], {month:'short',day:'numeric',hour:'numeric',minute:'2-digit'});
}
function updateSaleEnteredAmount(index){
  const input=document.getElementById(`enteredAmount${index}`);
  const sales=getSales();
  const raw=input?.value.trim();
  sales[index].enteredAmount=raw==='' ? null : parseFloat(raw);
  saveSales(sales);
  showAdmin('sales');
}
function deleteSale(index){
  const sales=getSales();
  const sale=sales[index];
  if(!sale) return;
  if(!confirm(`Delete sale ${sale.passcode || formatSaleDate(sale.date)}?`)) return;
  sales.splice(index,1);
  saveSales(sales);
  showAdmin('sales');
}
function deleteSelectedSales(){
  const checked=[...document.querySelectorAll('input[name="saleSelect"]:checked')].map(input=>Number(input.value));
  if(!checked.length){
    alert('Select at least one sale to delete.');
    return;
  }
  if(!confirm(`Delete ${checked.length} selected sale${checked.length===1?'':'s'}?`)) return;
  const remove=new Set(checked);
  const sales=getSales().filter((sale,index)=>!remove.has(index));
  saveSales(sales);
  showAdmin('sales');
}
function addTestSale(){
  const total=numberOrNull(document.getElementById('testSaleExpected')?.value);
  const enteredRaw=document.getElementById('testSaleEntered')?.value.trim();
  const entered=enteredRaw==='' ? null : numberOrNull(enteredRaw);
  const method=document.getElementById('testSaleMethod')?.value || 'Cash';
  const itemName=document.getElementById('testSaleItem')?.value.trim() || 'Test sale';
  const note=document.getElementById('testSaleNote')?.value.trim() || '';
  if(total===null){
    alert('Add an expected amount for the test sale.');
    return;
  }
  const sale={
    date:new Date().toISOString(),
    passcode:`TEST-${Math.floor(100+Math.random()*900)}`,
    method:`Test ${method}`,
    total,
    enteredAmount:entered,
    test:true,
    note,
    items:[{type:'test',name:itemName,detail:note || 'Owner-created test sale',price:total}]
  };
  const sales=getSales();
  sales.push(sale);
  saveSales(sales);
  showAdmin('sales');
}
function updateMobileRequestFlag(index, field){
  const requests=getMobileRefillRequests();
  if(!requests[index]) return;
  requests[index][field]=Boolean(document.getElementById(`request${field}${index}`)?.checked);
  if(field==='delivered' && requests[index].delivered) requests[index].scheduled=true;
  if(field==='orderCompleted' && requests[index].orderCompleted){
    requests[index].scheduled=true;
    requests[index].delivered=true;
  }
  requests[index].status=mobileRequestStatusLabel(requests[index]);
  requests[index].updatedAt=new Date().toISOString();
  saveMobileRefillRequests(requests);
  showAdmin('requests');
}
function updateMobileRequestOwnerNotes(index){
  const requests=getMobileRefillRequests();
  if(!requests[index]) return;
  requests[index].ownerNotes=document.getElementById(`requestOwnerNotes${index}`)?.value || '';
  requests[index].updatedAt=new Date().toISOString();
  saveMobileRefillRequests(requests);
}
function deleteMobileRequest(index){
  const requests=getMobileRefillRequests();
  const request=requests[index];
  if(!request) return;
  if(!confirm(`Delete this Pantry Ready request from ${request.name}?`)) return;
  requests.splice(index,1);
  saveMobileRefillRequests(requests);
  showAdmin('requests');
}
function mobileRequestCopyText(request){
  const products=(request.products||[]).map(p=>p.name).join(', ') || 'See notes';
  const recipients=ownerTextContacts().map(contact=>`${contact.name}${contact.phone ? ` (${contact.phone})` : ''}`).join(', ');
  return `Pantry Ready request\nName: ${request.name}\nPhone: ${request.phone}\nText recipients: ${recipients}\nType: ${request.requestType}\nDelivery fee: ${request.deliveryFee || 'Unknown'}\nScheduled: ${request.scheduled ? 'Yes' : 'No'}\nDelivered: ${request.delivered ? 'Yes' : 'No'}\nOrder completed: ${request.orderCompleted ? 'Yes' : 'No'}\nTiming: ${request.timing || 'Flexible'}\nProducts: ${products}\nPackaging/add-ons: ${request.containers || ''}\nLocation: ${request.location || ''}\nNotes: ${request.notes || ''}`;
}
function copyMobileRequest(index){
  const request=getMobileRefillRequests()[index];
  if(!request) return;
  const text=mobileRequestCopyText(request);
  if(navigator.clipboard?.writeText){
    navigator.clipboard.writeText(text).then(()=>alert('Request copied.'));
  } else {
    prompt('Copy this request:', text);
  }
}
function recipeLinesFromText(text){
  return (text || '').split(/\n+/).map(line=>line.trim()).filter(Boolean);
}
function parseRecipeLine(line){
  const match=line.match(/^([\d./]+)\s+([a-zA-Z]+)\s+(.+)$/);
  if(!match) return {amount:'',unit:'',item:line};
  return {amount:match[1],unit:match[2],item:match[3]};
}
function recipeNumber(value){
  const text=String(value ?? '').trim();
  if(text.includes('/')){
    const [top,bottom]=text.split('/').map(Number);
    return Number.isFinite(top) && Number.isFinite(bottom) && bottom!==0 ? top/bottom : NaN;
  }
  const number=Number(text);
  return Number.isFinite(number) ? number : NaN;
}
function recipeIngredientRows(product){
  const saved=Array.isArray(product.recipeIngredients) ? product.recipeIngredients : [];
  const savedByLine=new Map(saved.map(item=>[item.line,item]));
  const lines=recipeLinesFromText(product.recipeNotes);
  const rows=lines.length ? lines.map((line,index)=>({
    line,
    item:savedByLine.get(line)?.item || parseRecipeLine(line).item,
    recipeAmount:savedByLine.get(line)?.recipeAmount ?? parseRecipeLine(line).amount,
    recipeUnit:savedByLine.get(line)?.recipeUnit || parseRecipeLine(line).unit,
    containerCost:savedByLine.get(line)?.containerCost ?? '',
    containerSize:savedByLine.get(line)?.containerSize ?? '',
    containerUnit:savedByLine.get(line)?.containerUnit || 'oz',
    supplier:savedByLine.get(line)?.supplier || '',
    link:savedByLine.get(line)?.link || '',
    notes:savedByLine.get(line)?.notes || '',
    index
  })) : saved;
  return rows;
}
function ingredientRowCost(row){
  const amount=recipeNumber(row.recipeAmount);
  const containerCost=Number(row.containerCost);
  const containerSize=Number(row.containerSize);
  if(!Number.isFinite(amount) || !Number.isFinite(containerCost) || !Number.isFinite(containerSize) || containerSize<=0) return null;
  return amount * (containerCost/containerSize);
}
function productCogsSummary(product){
  const ingredients=recipeIngredientRows(product);
  const ingredientTotal=ingredients.reduce((sum,row)=>sum+(ingredientRowCost(row) || 0),0);
  const cogs=product.pantryCogs || {};
  const packaging=Number(cogs.packagingCost) || 0;
  const label=Number(cogs.labelCost) || 0;
  const hourlyRate=Number(product.hourlyLaborRate) || defaultHourlyLaborRate;
  const laborMinutes=Number(product.laborMinutes);
  const labor=Number.isFinite(laborMinutes) && laborMinutes>0 ? laborMinutes * (hourlyRate/60) : Number(cogs.laborCost) || 0;
  const waste=Number(cogs.wasteBuffer) || 0;
  const bulkTotal=ingredientTotal+waste;
  const batchYieldAmount=Number(product.batchYieldAmount);
  const pantryPackageCount=Number(product.pantryPackageCount);
  const refillUnitCost=Number.isFinite(batchYieldAmount) && batchYieldAmount>0 ? bulkTotal/batchYieldAmount : null;
  const bulkCostPerPackage=Number.isFinite(pantryPackageCount) && pantryPackageCount>0 ? bulkTotal/pantryPackageCount : null;
  const laborPerPackage=Number.isFinite(pantryPackageCount) && pantryPackageCount>0 ? labor/pantryPackageCount : null;
  const pantryPackageCost=bulkCostPerPackage===null || laborPerPackage===null ? null : bulkCostPerPackage+packaging+label+laborPerPackage;
  const pantryTotal=Number.isFinite(pantryPackageCount) && pantryPackageCount>0
    ? (bulkTotal+labor)+(packaging+label)*pantryPackageCount
    : bulkTotal+packaging+label+labor;
  const targetMargin=Number(cogs.targetMargin);
  const suggestedPantryPrice=Number.isFinite(targetMargin) && targetMargin>0 && targetMargin<1
    ? (pantryPackageCost!==null ? pantryPackageCost : pantryTotal)/(1-targetMargin)
    : null;
  return {ingredientTotal,packaging,label,labor,waste,bulkTotal,pantryTotal,batchYieldAmount,pantryPackageCount,refillUnitCost,pantryPackageCost,suggestedPantryPrice};
}
function renderRecipeIngredientRows(product){
  const rows=recipeIngredientRows(product);
  if(!rows.length) return '<p class="small">Add recipe lines on the Recipe tab first, then return here to price each ingredient.</p>';
  return rows.map((row,index)=>`<article class="summary cogs-line">
    <strong>${escapeHTML(row.line)}</strong>
    <div class="grid grid-3">
      <div><label>Recipe amount</label><input id="ingredientAmount${index}" value="${row.recipeAmount ?? ''}" placeholder="1 or 1/2"></div>
      <div><label>Recipe unit</label><input id="ingredientUnit${index}" value="${escapeHTML(row.recipeUnit || '')}" placeholder="cup, oz, g"></div>
      <div><label>Item name</label><input id="ingredientItem${index}" value="${escapeHTML(row.item || '')}" placeholder="Baking soda"></div>
      <div><label>Container price</label><input id="ingredientCost${index}" type="number" min="0" step=".01" value="${row.containerCost ?? ''}" placeholder="0.00"></div>
      <div><label>Container size</label><input id="ingredientSize${index}" type="number" min="0" step=".0001" value="${row.containerSize ?? ''}" placeholder="16"></div>
      <div><label>Container unit</label><input id="ingredientContainerUnit${index}" value="${escapeHTML(row.containerUnit || 'oz')}" placeholder="oz, lb, g"></div>
    </div>
    <div class="grid grid-2">
      <div><label>Supplier / store</label><input id="ingredientSupplier${index}" value="${escapeHTML(row.supplier || '')}" placeholder="Azure, Costco, local store..."></div>
      <div><label>Purchase link</label><input id="ingredientLink${index}" value="${escapeHTML(row.link || '')}" placeholder="https://..."></div>
    </div>
    <div><label>Ingredient notes</label><textarea id="ingredientNotes${index}" placeholder="Brand, organic/non-organic, substitute, price date...">${escapeHTML(row.notes || '')}</textarea></div>
    <p class="small">Estimated line cost: ${ingredientRowCost(row)===null?'Enter amount, container price, and container size':money(ingredientRowCost(row))}</p>
  </article>`).join('');
}
function renderPantryVariantEditor(product){
  const variants=pantryVariants(product);
  const rows=[...variants, {id:`size-${variants.length+1}`,size:'',price:'',packageCost:'',labelCost:'',notes:''}];
  return rows.map((variant,index)=>`<article class="summary cogs-line">
    <div class="grid grid-3">
      <div><label>Size / format</label><input id="variantSize${index}" value="${escapeHTML(variant.size || '')}" placeholder="1 oz jar"></div>
      <div><label>Retail price</label><input id="variantPrice${index}" type="number" min="0" step=".01" value="${variant.price ?? ''}" placeholder="0.00"></div>
      <div><label>Packaging cost</label><input id="variantPackageCost${index}" type="number" min="0" step=".01" value="${variant.packageCost ?? ''}" placeholder="Optional"></div>
      <div><label>Label cost</label><input id="variantLabelCost${index}" type="number" min="0" step=".01" value="${variant.labelCost ?? ''}" placeholder="Optional"></div>
      <div><label>Notes</label><input id="variantNotes${index}" value="${escapeHTML(variant.notes || '')}" placeholder="Jar type, lid, scent, etc."></div>
    </div>
  </article>`).join('');
}
function readPantryVariantEditor(product){
  const variants=[];
  let index=0;
  while(document.getElementById(`variantSize${index}`)){
    const size=document.getElementById(`variantSize${index}`)?.value.trim();
    if(size){
      variants.push({
        id:index===0 ? 'default' : `size-${index}`,
        size,
        price:numberOrNull(document.getElementById(`variantPrice${index}`)?.value) ?? 0,
        packageCost:numberOrNull(document.getElementById(`variantPackageCost${index}`)?.value),
        labelCost:numberOrNull(document.getElementById(`variantLabelCost${index}`)?.value),
        notes:document.getElementById(`variantNotes${index}`)?.value.trim() || ''
      });
    }
    index++;
  }
  return variants;
}
function saveNotebookCogsCalculator(activeTab='cogs'){
  const id=document.getElementById('notebookProduct')?.value;
  const product=products.find(item=>item.id===id);
  if(!product) return;
  const rows=recipeIngredientRows(product).map((row,index)=>({
    line:row.line,
    item:document.getElementById(`ingredientItem${index}`)?.value.trim() || row.item || row.line,
    recipeAmount:document.getElementById(`ingredientAmount${index}`)?.value.trim() || '',
    recipeUnit:document.getElementById(`ingredientUnit${index}`)?.value.trim() || '',
    containerCost:numberOrNull(document.getElementById(`ingredientCost${index}`)?.value),
    containerSize:numberOrNull(document.getElementById(`ingredientSize${index}`)?.value),
    containerUnit:document.getElementById(`ingredientContainerUnit${index}`)?.value.trim() || '',
    supplier:document.getElementById(`ingredientSupplier${index}`)?.value.trim() || '',
    link:document.getElementById(`ingredientLink${index}`)?.value.trim() || '',
    notes:document.getElementById(`ingredientNotes${index}`)?.value.trim() || ''
  }));
  product.recipeIngredients=rows;
  product.pantryCogs={
    ...(product.pantryCogs || {}),
    packagingCost:numberOrNull(document.getElementById('notebookPackagingCost')?.value),
    labelCost:numberOrNull(document.getElementById('notebookLabelCost')?.value),
    laborCost:null,
    wasteBuffer:numberOrNull(document.getElementById('notebookWasteBuffer')?.value),
    targetMargin:numberOrNull(document.getElementById('notebookTargetMargin')?.value)
  };
  product.laborMinutes=numberOrNull(document.getElementById('notebookLaborMinutes')?.value);
  product.hourlyLaborRate=numberOrNull(document.getElementById('notebookHourlyLaborRate')?.value);
  product.batchYieldAmount=numberOrNull(document.getElementById('notebookBatchYieldAmount')?.value);
  product.batchYieldUnit=document.getElementById('notebookBatchYieldUnit')?.value.trim() || product.unit || '';
  product.pantryPackageCount=numberOrNull(document.getElementById('notebookPantryPackageCount')?.value);
  if(document.getElementById('notebookRefillPrice')) product.pricePerUnit=numberOrNull(document.getElementById('notebookRefillPrice')?.value) ?? 0;
  if(document.getElementById('notebookPantryPrice')) product.pantryPrice=numberOrNull(document.getElementById('notebookPantryPrice')?.value) ?? 0;
  if(document.getElementById('notebookPantrySize')) product.pantrySize=document.getElementById('notebookPantrySize')?.value.trim() || 'Not set';
  if(document.getElementById('variantSize0')){
    product.pantryVariants=readPantryVariantEditor(product);
    const defaultVariant=product.pantryVariants[0];
    if(defaultVariant){
      product.pantrySize=defaultVariant.size;
      product.pantryPrice=defaultVariant.price;
    }
  }
  product.refillPricingNotes=document.getElementById('notebookRefillPricingNotes')?.value.trim() || product.refillPricingNotes || '';
  product.pantryPricingNotes=document.getElementById('notebookPantryPricingNotes')?.value.trim() || product.pantryPricingNotes || '';
  product.packagingPhoto=document.getElementById('notebookPackagingPhoto')?.value.trim() || '';
  product.packagingLinks=document.getElementById('notebookPackagingLinks')?.value.trim() || product.packagingLinks || '';
  product.cogsNotes=document.getElementById('notebookCogsNotes')?.value.trim() || '';
  product.cogsSource=rows.some(row=>ingredientRowCost(row)!==null) ? 'entered' : productCogsSource(product);
  if(document.getElementById('notebookRefillPrice') || document.getElementById('notebookPantryPrice')){
    product.pricingSource='entered';
    product.pricingManuallyConfirmed=true;
  }
  persistProduct(product);
  renderNotebook(activeTab==='pricing' || activeTab==='cogs' ? 'costs' : activeTab);
}
function saveBatchRecord(){
  const id=document.getElementById('notebookProduct')?.value;
  const product=products.find(item=>item.id===id);
  if(!product) return;
  const summary=productCogsSummary(product);
  const record={
    id:`batch-${Date.now()}`,
    date:document.getElementById('batchDate')?.value || new Date().toISOString().slice(0,10),
    batchSize:document.getElementById('batchSize')?.value.trim() || '',
    bulkAmount:document.getElementById('batchBulkAmount')?.value.trim() || '',
    pantryCount:document.getElementById('batchPantryCount')?.value.trim() || '',
    notes:document.getElementById('batchNotes')?.value.trim() || '',
    ingredientTotal:summary.ingredientTotal,
    bulkTotal:summary.bulkTotal,
    pantryTotal:summary.pantryTotal
  };
  product.batchRecords=[record,...(product.batchRecords || [])].slice(0,20);
  persistProduct(product);
  renderNotebook('cogs');
}
function saveNotebookProduct(activeTab='overview'){
  const id=document.getElementById('notebookProduct')?.value;
  const product=products.find(item=>item.id===id);
  if(!product) return;
  const readValue=(field)=>document.getElementById(field)?.value;
  const readChecked=(field)=>document.getElementById(field)?.checked;
  const updated={...product, pantryCogs:{...(product.pantryCogs || {})}};
  if(document.getElementById('notebookName')) updated.name=readValue('notebookName').trim() || product.name;
  if(document.getElementById('notebookCategory')) updated.category=readValue('notebookCategory').trim() || product.category;
  if(document.getElementById('notebookStatus')){
    updated.status=readValue('notebookStatus') || 'inactive';
    updated.active=updated.status==='active';
  }
  if(document.getElementById('notebookUnit')) updated.unit=readValue('notebookUnit') || product.unit;
  if(document.getElementById('notebookRefill')) updated.refill=readChecked('notebookRefill');
  if(document.getElementById('notebookPantry')) updated.pantry=readChecked('notebookPantry');
  if(document.getElementById('notebookLocations')) updated.locations=readValue('notebookLocations').trim();
  if(document.getElementById('notebookOwnerNotes')) updated.ownerNotes=readValue('notebookOwnerNotes').trim();
  if(document.getElementById('notebookRecipe')) updated.recipeNotes=readValue('notebookRecipe').trim();
  if(document.getElementById('notebookBatchNotes')) updated.batchNotes=readValue('notebookBatchNotes').trim();
  if(document.getElementById('notebookMaterialsCost')) updated.pantryCogs.productAmountCost=numberOrNull(readValue('notebookMaterialsCost'));
  if(document.getElementById('notebookPackagingCost')) updated.pantryCogs.packagingCost=numberOrNull(readValue('notebookPackagingCost'));
  if(document.getElementById('notebookLabelCost')) updated.pantryCogs.labelCost=numberOrNull(readValue('notebookLabelCost'));
  if(document.getElementById('notebookWasteBuffer')) updated.pantryCogs.wasteBuffer=numberOrNull(readValue('notebookWasteBuffer'));
  if(document.getElementById('notebookTargetMargin')) updated.pantryCogs.targetMargin=numberOrNull(readValue('notebookTargetMargin'));
  if(document.getElementById('notebookCogsNotes')) updated.cogsNotes=readValue('notebookCogsNotes').trim();
  if(document.getElementById('notebookRefillPrice')) updated.pricePerUnit=numberOrNull(readValue('notebookRefillPrice')) ?? 0;
  if(document.getElementById('notebookPantryPrice')) updated.pantryPrice=numberOrNull(readValue('notebookPantryPrice')) ?? 0;
  if(document.getElementById('notebookPantrySize')) updated.pantrySize=readValue('notebookPantrySize').trim() || 'Not set';
  if(document.getElementById('variantSize0')){
    updated.pantryVariants=readPantryVariantEditor(updated);
    const defaultVariant=updated.pantryVariants[0];
    if(defaultVariant){
      updated.pantrySize=defaultVariant.size;
      updated.pantryPrice=defaultVariant.price;
    }
  }
  if(document.getElementById('notebookRefillPricingNotes')) updated.refillPricingNotes=readValue('notebookRefillPricingNotes').trim();
  if(document.getElementById('notebookPantryPricingNotes')) updated.pantryPricingNotes=readValue('notebookPantryPricingNotes').trim();
  if(document.getElementById('notebookPackagingLinks')) updated.packagingLinks=readValue('notebookPackagingLinks').trim();
  if(document.getElementById('notebookPackagingPhoto')) updated.packagingPhoto=readValue('notebookPackagingPhoto').trim();
  if(document.getElementById('notebookInventorySplit')) updated.inventorySplit=readValue('notebookInventorySplit').trim();
  if(document.getElementById('notebookLabelNotes')) updated.labelNotes=readValue('notebookLabelNotes').trim();
  if(document.getElementById('notebookMarketingAspects')) updated.marketingAspects=readValue('notebookMarketingAspects').trim();
  if(document.getElementById('notebookPostAngles')) updated.postAngles=readValue('notebookPostAngles').trim();
  const hasCogs=Object.values(updated.pantryCogs || {}).some(value=>value!==null && value!=='');
  if(activeTab==='cogs') updated.cogsSource=hasCogs ? 'entered' : 'missing';
  if(activeTab==='pricing'){
    updated.pricingSource='entered';
    updated.pricingManuallyConfirmed=true;
  }
  updated.updatedAt=new Date().toISOString();
  Object.assign(product, updated);
  persistProduct(updated);
  const option=[...document.querySelectorAll('#notebookProduct option')].find(item=>item.value===product.id);
  if(option) option.textContent=updated.name;
  renderNotebook(activeTab);
}
function saveNewProduct(){
  const message=document.getElementById('newProductMessage');
  const name=document.getElementById('newProductName')?.value.trim();
  const category=document.getElementById('newProductCategory')?.value.trim();
  const refill=document.getElementById('newProductRefill')?.checked || false;
  const pantry=document.getElementById('newProductPantry')?.checked || false;
  const unit=document.getElementById('newProductUnit')?.value || 'oz';
  if(!name){
    if(message) message.innerHTML='<div class="notice warning">Add a product name first.</div>';
    return;
  }
  if(!category){
    if(message) message.innerHTML='<div class="notice warning">Add a department or category.</div>';
    return;
  }
  if(!refill && !pantry){
    if(message) message.innerHTML='<div class="notice warning">Choose at least one customer format.</div>';
    return;
  }
  const pricePerUnit=numberOrNull(document.getElementById('newProductRefillPrice')?.value);
  const pantryPrice=numberOrNull(document.getElementById('newProductPantryPrice')?.value);
  const pantrySize=document.getElementById('newProductPantrySize')?.value.trim() || 'Not set';
  const status=document.getElementById('newProductStatus')?.value || 'inactive';
  const pantryVariants=pantry ? parsePantryVariantLines(document.getElementById('newProductPantryVariants')?.value, pantrySize, pantryPrice ?? 0) : [];
  const pantryCogs={
    productAmountCost:numberOrNull(document.getElementById('newProductMaterialsCost')?.value),
    packagingCost:numberOrNull(document.getElementById('newProductPackagingCost')?.value),
    labelCost:numberOrNull(document.getElementById('newProductLabelCost')?.value),
    laborCost:numberOrNull(document.getElementById('newProductLaborCost')?.value),
    wasteBuffer:numberOrNull(document.getElementById('newProductWasteBuffer')?.value),
    targetMargin:numberOrNull(document.getElementById('newProductTargetMargin')?.value)
  };
  const hasCogs=Object.values(pantryCogs).some(value=>value!==null);
  const product={
    id:slugifyProductName(name),
    ownerCreated:true,
    status,
    active:status==='active',
    name,
    category,
    refill,
    pantry,
    unit,
    pricePerUnit:refill ? (pricePerUnit ?? 0) : null,
    pantryPrice:pantry ? (pantryPrice ?? 0) : null,
    pantrySize,
    pantryVariants,
    refillPricingModel:refill ? 'product-only' : null,
    pantryPricingModel:pantry ? 'format-cogs' : null,
    pricingSource:(pricePerUnit!==null || pantryPrice!==null) ? 'entered' : 'assumed',
    cogsSource:hasCogs ? 'entered' : 'missing',
    recipeNotes:document.getElementById('newProductRecipe')?.value.trim() || '',
    pantryCogs,
    locations:document.getElementById('newProductLocations')?.value.trim() || '',
    marketingAspects:document.getElementById('newProductMarketing')?.value.trim() || '',
    ownerNotes:document.getElementById('newProductNotes')?.value.trim() || '',
    createdAt:new Date().toISOString()
  };
  const ownerProducts=getOwnerProducts();
  ownerProducts.push(product);
  saveOwnerProducts(ownerProducts);
  products.push(product);
  showAdmin('products');
}

function openProductNotebook(productId){
  window.pendingNotebookProductId=productId;
  showAdmin('product');
}

function inventoryAmount(value){
  const number=Number(value);
  return Number.isFinite(number) ? number : null;
}
function inventoryDifference(item){
  const planned=inventoryAmount(item.plannedQuantity);
  const actual=inventoryAmount(item.quantity) ?? 0;
  if(planned===null) return null;
  return actual-planned;
}
function inventoryAmountLabel(value){
  const number=inventoryAmount(value);
  if(number===null) return 'Not planned';
  return Number.isInteger(number) ? String(number) : number.toFixed(2).replace(/\.?0+$/,'');
}
function inventoryStatusBadge(item){
  const difference=inventoryDifference(item);
  if(difference===null) return '<span class="source-badge not-counted">Not planned</span>';
  if(Math.abs(difference)<0.005) return '<span class="source-badge matched">On plan</span>';
  if(difference<0) return '<span class="source-badge short">Short</span>';
  return '<span class="source-badge over">Over</span>';
}
function inventoryMatchText(value){
  return String(value || '').toLowerCase().replace(/[^a-z0-9]/g,'');
}
function inventoryItemsForProduct(product){
  const productName=inventoryMatchText(product.name);
  return getInventoryItems().filter(item=>{
    if(item.productId===product.id) return true;
    const itemName=inventoryMatchText(item.name);
    return itemName && productName && (itemName.includes(productName) || productName.includes(itemName));
  });
}
function inventorySummaryForProduct(product){
  const items=inventoryItemsForProduct(product);
  const planned=items.reduce((sum,item)=>sum+(inventoryAmount(item.plannedQuantity) || 0),0);
  const actual=items.reduce((sum,item)=>sum+(inventoryAmount(item.quantity) || 0),0);
  const hasPlan=items.some(item=>inventoryAmount(item.plannedQuantity)!==null);
  const difference=hasPlan ? actual-planned : null;
  return {items,planned,actual,hasPlan,difference};
}
function productInventoryHTML(product){
  const summary=inventorySummaryForProduct(product);
  if(!summary.items.length) return '<span class="small">No linked inventory yet</span>';
  const status=summary.difference===null
    ? '<span class="source-badge not-counted">Not planned</span>'
    : summary.difference<0
      ? '<span class="source-badge short">Short</span>'
      : Math.abs(summary.difference)<0.005
        ? '<span class="source-badge matched">On plan</span>'
        : '<span class="source-badge over">Over</span>';
  const difference=summary.difference===null ? 'Not planned' : `${summary.difference>0?'+':''}${inventoryAmountLabel(summary.difference)}`;
  const units=[...new Set(summary.items.map(item=>item.unit).filter(Boolean))].join(', ') || 'units';
  return `<strong>${inventoryAmountLabel(summary.actual)} ${escapeHTML(units)}</strong><br><span class="small">Planned ${inventoryAmountLabel(summary.hasPlan?summary.planned:null)} · Difference ${escapeHTML(difference)}</span><br>${status}`;
}

function saveInventoryItem(){
  const name=document.getElementById('inventoryName')?.value.trim();
  const message=document.getElementById('inventoryMessage');
  if(!name){
    if(message) message.innerHTML='<div class="notice warning">Add an item name first.</div>';
    return;
  }
  const item={
    id:`inv-${Date.now()}`,
    name,
    productId:document.getElementById('inventoryProductId')?.value || '',
    category:document.getElementById('inventoryCategory')?.value || 'Raw ingredient',
    plannedQuantity:numberOrNull(document.getElementById('inventoryPlannedQuantity')?.value),
    quantity:numberOrNull(document.getElementById('inventoryActualQuantity')?.value) ?? 0,
    unit:document.getElementById('inventoryUnit')?.value.trim() || '',
    reorderPoint:numberOrNull(document.getElementById('inventoryReorder')?.value),
    location:document.getElementById('inventoryLocation')?.value.trim() || '',
    supplier:document.getElementById('inventorySupplier')?.value.trim() || '',
    link:document.getElementById('inventoryLink')?.value.trim() || '',
    notes:document.getElementById('inventoryNotes')?.value.trim() || '',
    updatedAt:new Date().toISOString()
  };
  const items=getInventoryItems();
  items.unshift(item);
  saveInventoryItems(items);
  showAdmin('inventory');
}

function updateInventoryItem(index, field){
  const items=getInventoryItems();
  if(!items[index]) return;
  const input=document.getElementById(`inventory${field}${index}`);
  if(!input) return;
  const numeric=['plannedQuantity','quantity','reorderPoint'].includes(field);
  items[index][field]=numeric ? numberOrNull(input.value) : input.value.trim();
  items[index].updatedAt=new Date().toISOString();
  saveInventoryItems(items);
  if(['plannedQuantity','quantity'].includes(field)) showAdmin('inventory');
}

function deleteInventoryItem(index){
  const items=getInventoryItems();
  const item=items[index];
  if(!item) return;
  if(!confirm(`Delete inventory item ${item.name}?`)) return;
  items.splice(index,1);
  saveInventoryItems(items);
  showAdmin('inventory');
}

function dashboardInventoryAlerts(){
  return getInventoryItems().filter(item=>{
    const actual=inventoryAmount(item.quantity) ?? 0;
    const difference=inventoryDifference(item);
    const reorder=inventoryAmount(item.reorderPoint);
    return (difference!==null && difference<0) || (reorder!==null && actual<=reorder);
  }).slice(0,6);
}
function dashboardProductPipeline(){
  const counts={active:0,testing:0,future:0,inactive:0,discontinued:0};
  products.forEach(product=>{ counts[productStatus(product)]=(counts[productStatus(product)] || 0)+1; });
  return counts;
}
function dashboardOpenRequestCards(requests){
  const open=requests.filter(mobileRequestOpen).slice(0,4);
  if(!open.length) return '<p class="small">No open Pantry Ready requests.</p>';
  return open.map(request=>{
    const productsText=(request.products||[]).map(product=>product.name).join(', ') || 'See notes';
    return `<article class="mini-row">
      <div><strong>${escapeHTML(request.name || 'Unnamed request')}</strong><p class="small">${formatSaleDate(request.date)} · ${escapeHTML(productsText)}</p></div>
      ${requestStatusBadge(mobileRequestStatusLabel(request))}
    </article>`;
  }).join('');
}
function dashboardRecentSales(sales){
  const recent=[...sales].sort((a,b)=>new Date(b.date || 0)-new Date(a.date || 0)).slice(0,5);
  if(!recent.length) return '<p class="small">No sales recorded yet.</p>';
  return recent.map(sale=>{
    const variance=saleVariance(sale);
    const entered=saleEnteredAmount(sale);
    return `<article class="mini-row">
      <div><strong>${money(saleExpectedTotal(sale))}</strong><p class="small">${formatSaleDate(sale.date)} · ${escapeHTML(sale.method || 'Payment')} · ${escapeHTML(sale.passcode || 'No code')}</p></div>
      <span class="small">${entered===null?'Not counted':`Variance ${money(variance || 0)}`}</span>
    </article>`;
  }).join('');
}
function dashboardInventoryAlertRows(items){
  if(!items.length) return '<p class="small">No inventory shortages or reorder alerts.</p>';
  return items.map(item=>{
    const difference=inventoryDifference(item);
    const actual=inventoryAmount(item.quantity) ?? 0;
    const unit=item.unit || 'units';
    const alertText=difference!==null && difference<0
      ? `Short ${inventoryAmountLabel(Math.abs(difference))} ${unit}`
      : `At reorder point: ${inventoryAmountLabel(actual)} ${unit}`;
    return `<article class="mini-row">
      <div><strong>${escapeHTML(item.name || 'Inventory item')}</strong><p class="small">${escapeHTML(item.location || 'No location')} · Planned ${inventoryAmountLabel(item.plannedQuantity)} · Actual ${inventoryAmountLabel(actual)}</p></div>
      <span class="source-badge short">${escapeHTML(alertText)}</span>
    </article>`;
  }).join('');
}

function showAdmin(tab='dashboard'){
  setTitle('Common Good Workroom');
  const tabs=`<div class="tabs">
    <button class="secondary" onclick="showAdmin('dashboard')">Dashboard</button>
    <button class="secondary" onclick="showAdmin('sales')">Sales Ledger</button>
    <button class="secondary" onclick="showAdmin('requests')">Pantry Requests</button>
    <button class="secondary" onclick="showAdmin('products')">Products</button>
    <button class="secondary" onclick="showAdmin('inventory')">Inventory</button>
    <button class="secondary" onclick="showAdmin('marketing')">AI Marketing Studio</button>
    <button class="secondary" onclick="showAdmin('settings')">Settings</button>
  </div>`;
  let body='';
  if(tab==='dashboard'){
    const sales=getSales();
    const requests=getMobileRefillRequests();
    const openRequests=requests.filter(mobileRequestOpen).length;
    const scheduledRequests=requests.filter(request=>request.scheduled && !request.delivered).length;
    const revenue=sales.reduce((s,x)=>s+x.total,0);
    const counted=sales.filter(s=>saleEnteredAmount(s)!==null).length;
    const uncounted=sales.length-counted;
    const countedVariance=sales.reduce((sum,sale)=>sum+(saleVariance(sale) ?? 0),0);
    const inventoryAlerts=dashboardInventoryAlerts();
    const pipeline=dashboardProductPipeline();
    const missingCogs=products.filter(product=>['active','testing'].includes(productStatus(product)) && productCogsSource(product)!=='entered').length;
    const missingOwnerPhones=ownerTextContacts().filter(contact=>!normalizePhone(contact.phone)).map(contact=>contact.name);
    body=`<section class="card dashboard-hero">
      <div>
        <div class="eyebrow">OWNER WORKROOM</div>
        <h2>Today at a glance</h2>
        <p class="small">Use this page first. Jump into the deeper tabs only when you need to edit, reconcile, or build something.</p>
      </div>
      <div class="button-row dashboard-actions">
        <button class="secondary" type="button" onclick="showAdmin('addProduct')">Add product</button>
        <button class="secondary" type="button" onclick="showAdmin('inventory')">Add inventory</button>
        <button class="secondary" type="button" onclick="showAdmin('sales')">Record sale</button>
        <button class="secondary" type="button" onclick="showAdmin('marketing')">Create post</button>
      </div>
    </section>
    <div class="grid grid-3 dashboard-metrics">
      <button class="card dashboard-card" type="button" onclick="showAdmin('sales')"><div class="small">Sales recorded</div><div class="price">${sales.length}</div><p class="small">${money(revenue)} expected total</p></button>
      <button class="card dashboard-card" type="button" onclick="showAdmin('sales')"><div class="small">Payments needing count</div><div class="price">${uncounted}</div><p class="small">Counted variance ${money(countedVariance)}</p></button>
      <button class="card dashboard-card" type="button" onclick="showAdmin('requests')"><div class="small">Open Pantry Ready</div><div class="price">${openRequests}</div><p class="small">${scheduledRequests} scheduled</p></button>
      <button class="card dashboard-card" type="button" onclick="showAdmin('inventory')"><div class="small">Inventory alerts</div><div class="price">${inventoryAlerts.length}</div><p class="small">Short or at reorder point</p></button>
      <button class="card dashboard-card" type="button" onclick="showAdmin('products')"><div class="small">Testing / future products</div><div class="price">${(pipeline.testing || 0)+(pipeline.future || 0)}</div><p class="small">${pipeline.active || 0} active products</p></button>
      <button class="card dashboard-card" type="button" onclick="showAdmin('products')"><div class="small">COGS to finish</div><div class="price">${missingCogs}</div><p class="small">Active or testing products</p></button>
    </div>
    ${missingOwnerPhones.length?`<div class="notice warning">Add ${missingOwnerPhones.join(' and ')}'s phone number in Settings so Pantry Ready request texts are ready.</div>`:''}
    <div class="grid grid-2 dashboard-panels">
      <section class="card">
        <div class="section-head"><h3>Open Pantry Ready Requests</h3><button class="quiet" type="button" onclick="showAdmin('requests')">View all</button></div>
        <div class="mini-list">${dashboardOpenRequestCards(requests)}</div>
      </section>
      <section class="card">
        <div class="section-head"><h3>Recent Sales</h3><button class="quiet" type="button" onclick="showAdmin('sales')">Open ledger</button></div>
        <div class="mini-list">${dashboardRecentSales(sales)}</div>
      </section>
      <section class="card">
        <div class="section-head"><h3>Inventory Needing Attention</h3><button class="quiet" type="button" onclick="showAdmin('inventory')">Open inventory</button></div>
        <div class="mini-list">${dashboardInventoryAlertRows(inventoryAlerts)}</div>
      </section>
      <section class="card">
        <div class="section-head"><h3>Product Pipeline</h3><button class="quiet" type="button" onclick="showAdmin('products')">Open products</button></div>
        <div class="pipeline-grid">
          <button class="summary dashboard-card" type="button" onclick="showAdmin('products')"><strong>Active</strong><div class="price">${pipeline.active || 0}</div></button>
          <button class="summary dashboard-card" type="button" onclick="showAdmin('products')"><strong>Testing</strong><div class="price">${pipeline.testing || 0}</div></button>
          <button class="summary dashboard-card" type="button" onclick="showAdmin('products')"><strong>Future</strong><div class="price">${pipeline.future || 0}</div></button>
          <button class="summary dashboard-card" type="button" onclick="showAdmin('products')"><strong>Inactive</strong><div class="price">${pipeline.inactive || 0}</div></button>
        </div>
      </section>
    </div>`;
  }
  if(tab==='sales'){
    const sales=getSales();
    const displayedSales=sales
      .map((sale,index)=>({sale,index}))
      .sort((a,b)=>new Date(b.sale.date || 0)-new Date(a.sale.date || 0));
    const expectedTotal=sales.reduce((sum,sale)=>sum+saleExpectedTotal(sale),0);
    const enteredTotal=sales.reduce((sum,sale)=>sum+(saleEnteredAmount(sale) ?? 0),0);
    const counted=sales.filter(sale=>saleEnteredAmount(sale)!==null);
    const variance=counted.reduce((sum,sale)=>sum+(saleVariance(sale) ?? 0),0);
    body=`<section class="card"><h2>Sales Ledger</h2>
      <div class="notice">This ledger records honor-system checkout activity. Enter the amount actually found in the envelope, check, or Venmo record to note shortages and overages.</div>
      <div class="spacer"></div>
      <div class="grid grid-3">
        <div class="summary"><strong>Expected</strong><div class="price">${money(expectedTotal)}</div></div>
        <div class="summary"><strong>Entered</strong><div class="price">${money(enteredTotal)}</div></div>
        <div class="summary"><strong>Variance counted</strong><div class="price">${money(variance)}</div></div>
      </div>
      <div class="spacer"></div>
      <details class="summary">
        <summary>Add a test sale</summary>
        <div class="form-grid">
          <div class="grid grid-3">
            <div><label>Payment method</label><select id="testSaleMethod"><option>Cash</option><option>Check</option><option>Venmo</option></select></div>
            <div><label>Expected amount</label><input id="testSaleExpected" type="number" min="0" step=".01" placeholder="12.00"></div>
            <div><label>Entered amount</label><input id="testSaleEntered" type="number" min="0" step=".01" placeholder="Optional"></div>
          </div>
          <div><label>Item / scenario</label><input id="testSaleItem" placeholder="Example: test Pantry Ready order"></div>
          <div><label>Notes</label><textarea id="testSaleNote" placeholder="What are you testing?"></textarea></div>
          <button class="primary" type="button" onclick="addTestSale()">Record test sale</button>
        </div>
      </details>
      ${sales.length?`<div class="ledger-tools"><button class="tiny-action" type="button" onclick="deleteSelectedSales()">Delete selected</button></div><div class="table-wrap"><table><tr><th></th><th>Date</th><th>Passcode</th><th>Method</th><th>Expected</th><th>Entered amount</th><th>Variance</th><th>Status</th><th>Items</th><th></th></tr>
        ${displayedSales.map(({sale,index})=>{
          const entered=saleEnteredAmount(sale);
          const saleVar=saleVariance(sale);
          const items=(sale.items||[]).map(item=>item.name).join(', ');
          return `<tr>
            <td><input class="sale-select" name="saleSelect" type="checkbox" value="${index}" aria-label="Select sale ${index+1}"></td>
            <td>${formatSaleDate(sale.date)}</td>
            <td><strong>${sale.passcode || 'No passcode'}</strong></td>
            <td>${sale.method}</td>
            <td>${money(saleExpectedTotal(sale))}</td>
            <td><input class="ledger-input" id="enteredAmount${index}" type="number" min="0" step=".01" value="${entered===null?'':entered.toFixed(2)}" onchange="updateSaleEnteredAmount(${index})"></td>
            <td>${saleVar===null?'—':money(saleVar)}</td>
            <td>${varianceBadge(saleExpectedTotal(sale), entered)}</td>
            <td class="small">${items}</td>
            <td><button class="icon-button danger-icon" type="button" title="Delete sale" aria-label="Delete sale" onclick="deleteSale(${index})"><span aria-hidden="true">Del</span></button></td>
          </tr>`;
        }).join('')}</table></div>`:`<p>No sales recorded yet.</p>`}
    </section>`;
  }
  if(tab==='requests'){
    const requests=getMobileRefillRequests();
    const openCount=requests.filter(mobileRequestOpen).length;
    const scheduledCount=requests.filter(request=>request.scheduled && !request.delivered).length;
    const deliveredCount=requests.filter(request=>request.delivered).length;
    const completedCount=requests.filter(request=>request.orderCompleted || request.status==='Completed').length;
    const missingOwnerPhones=ownerTextContacts().filter(contact=>!normalizePhone(contact.phone)).map(contact=>contact.name);
    body=`<section class="card"><h2>Pantry Ready Requests</h2>
      <div class="notice">The customer QR/magnet should lead directly to the Request page. New requests are stored here and can be sent by text to the owner phones saved in Settings.</div>
      ${missingOwnerPhones.length?`<div class="notice warning">Add ${missingOwnerPhones.join(' and ')}'s phone number in Settings so request text links are ready.</div>`:''}
      <div class="spacer"></div>
      <div class="grid grid-3">
        <div class="summary"><strong>Total requests</strong><div class="price">${requests.length}</div></div>
        <div class="summary"><strong>Open requests</strong><div class="price">${openCount}</div></div>
        <div class="summary"><strong>Scheduled</strong><div class="price">${scheduledCount}</div></div>
        <div class="summary"><strong>Delivered</strong><div class="price">${deliveredCount}</div></div>
        <div class="summary"><strong>Completed</strong><div class="price">${completedCount}</div></div>
        <div class="summary"><strong>Delivery fee</strong><p class="small">Unknown. Confirm before scheduling.</p></div>
        <div class="summary"><strong>Text alerts</strong><p class="small">Use the text buttons on each request to notify Kaelea and Alaina. Customer updates are tracked per request.</p></div>
      </div>
      <div class="spacer"></div>
      ${requests.length?`<div class="request-list">${requests.map((request,i)=>{
        const productList=(request.products||[]).map(p=>p.name).join(', ') || 'See notes';
        return `<article class="summary request-card">
          <div class="request-head">
            <div><h3>${escapeHTML(request.name)}</h3><p class="small">${formatSaleDate(request.date)} · ${requestStatusBadge(mobileRequestStatusLabel(request))}</p></div>
            <div class="bank-actions">
              <button class="icon-button" type="button" title="Copy" aria-label="Copy request" onclick="copyMobileRequest(${i})"><span aria-hidden="true">Copy</span></button>
              <button class="icon-button danger-icon" type="button" title="Delete" aria-label="Delete request" onclick="deleteMobileRequest(${i})"><span aria-hidden="true">Del</span></button>
            </div>
          </div>
          <div class="grid grid-2">
            <div><strong>Phone</strong><p>${escapeHTML(request.phone)}</p></div>
            <div><strong>Type</strong><p>${escapeHTML(request.requestType)}</p></div>
            <div><strong>Delivery fee</strong><p>${escapeHTML(request.deliveryFee || 'Unknown')}</p></div>
            <div><strong>Owner text recipients</strong><p>${ownerTextContacts().map(contact=>`${contact.name}: ${contact.phone || 'Add in Settings'}`).join('<br>')}</p></div>
            <div><strong>Customer text updates</strong><p>${request.textUpdates===false?'No opt-in recorded':'Opted in'} · ${escapeHTML(request.textUpdateStatus || 'Text follow-up needed')}</p></div>
            <div><strong>Timing</strong><p>${escapeHTML(request.timing || 'Flexible')}</p></div>
            <div><strong>Products</strong><p>${escapeHTML(productList)}</p></div>
            <div><strong>Packaging / add-on notes</strong><p>${escapeHTML(request.containers || 'None entered')}</p></div>
            <div><strong>Pickup / delivery notes</strong><p>${escapeHTML(request.location || 'None entered')}</p></div>
          </div>
          ${request.notes?`<div><strong>Customer notes</strong><p>${escapeHTML(request.notes)}</p></div>`:''}
          <div class="button-row">${ownerTextLinksForRequest(request)}</div>
          <div class="form-grid request-admin-grid">
            <div class="summary">
              <strong>Request log</strong>
              <label class="check-row"><input id="requestscheduled${i}" type="checkbox" ${request.scheduled?'checked':''} onchange="updateMobileRequestFlag(${i},'scheduled')"><span>Scheduled</span></label>
              <label class="check-row"><input id="requestdelivered${i}" type="checkbox" ${request.delivered?'checked':''} onchange="updateMobileRequestFlag(${i},'delivered')"><span>Delivered</span></label>
              <label class="check-row"><input id="requestorderCompleted${i}" type="checkbox" ${request.orderCompleted?'checked':''} onchange="updateMobileRequestFlag(${i},'orderCompleted')"><span>Order completed</span></label>
            </div>
            <div><label>Owner notes</label><textarea id="requestOwnerNotes${i}" onblur="updateMobileRequestOwnerNotes(${i})" placeholder="Follow-up, quote, delivery plan, market pickup notes...">${escapeHTML(request.ownerNotes || '')}</textarea></div>
          </div>
        </article>`;
      }).join('')}</div>`:`<p>No Pantry Ready requests yet.</p>`}
    </section>`;
  }
  if(tab==='products'){
    body=`<section class="card"><h2>Products</h2>
      <div class="notice">Use this as the quick product command center: status, inventory, refill COGS, Pantry Ready COGS, and selling price. Open a product to edit recipes, COGS, pricing, locations, and notes.</div>
      <div class="spacer"></div>
      <button class="primary" onclick="showAdmin('addProduct')">Add product</button>
      <div class="spacer"></div>
      <div class="table-wrap product-table"><table><tr><th>Product</th><th>Status</th><th>Inventory</th><th>Refill COGS</th><th>Pantry COGS</th><th>Selling price</th><th>Source</th></tr>
      ${products.map(p=>{
        const summary=productCogsSummary(p);
        const refillCogs=summary.refillUnitCost===null ? '<span class="small">Add batch yield</span>' : `${money(summary.refillUnitCost)} / ${escapeHTML(p.batchYieldUnit || p.unit || 'unit')}`;
        const pantryCogs=summary.pantryPackageCost===null ? '<span class="small">Add package count</span>' : `${money(summary.pantryPackageCost)} / package`;
        const prices=[
          p.refill ? `${money(p.pricePerUnit || 0)} / ${escapeHTML(p.unit || 'unit')} refill` : '',
          p.pantry ? pantryVariants(p).map(variant=>`${money(variant.price)} · ${escapeHTML(variant.size)}`).join('<br>') : ''
        ].filter(Boolean).join('<br>') || '—';
        return `<tr>
          <td><button class="link-button" type="button" onclick="openProductNotebook('${p.id}')">${p.name}</button><br><span class="small">${escapeHTML(p.category)}</span></td>
          <td>${productStatusBadge(p)}</td>
          <td>${productInventoryHTML(p)}</td>
          <td>${refillCogs}</td>
          <td>${pantryCogs}</td>
          <td>${prices}</td>
          <td><span class="small">${sourceBadge(productPricingSource(p))} ${sourceBadge(productCogsSource(p))}</span></td>
        </tr>`;
      }).join('')}</table></div></section>`;
  }
  if(tab==='addProduct'){
    body=`<section class="card"><h2>Add Product</h2>
      <div class="notice">Add the product once here, then mark it active when it is ready for customers. Inactive products stay in the Workroom and Product Notebook.</div>
      <div class="spacer"></div>
      <div class="form-grid">
        <div><label>Product name</label><input id="newProductName" placeholder="Example: Foaming Hand Soap"></div>
        <div><label>Department / category</label><input id="newProductCategory" placeholder="Laundry, Kitchen, Home, Eloah..."></div>
        <div><label>Status</label><select id="newProductStatus">${productStatusOptions.map(option=>`<option value="${option.value}" ${option.value==='inactive'?'selected':''}>${option.label}</option>`).join('')}</select></div>
        <div><label>Unit</label><select id="newProductUnit"><option value="oz">ounces</option><option value="g">grams</option><option value="each">each</option><option value="jar">jar</option><option value="bottle">bottle</option><option value="bar">bar</option><option value="set">set</option></select></div>
        <div class="summary">
          <strong>Customer formats</strong>
          <label class="check-row"><input id="newProductRefill" type="checkbox"><span>Refill by weight</span></label>
          <label class="check-row"><input id="newProductPantry" type="checkbox" checked><span>Pantry Ready</span></label>
        </div>
        <div class="grid grid-3">
          <div><label>Refill price per unit</label><input id="newProductRefillPrice" type="number" min="0" step=".01" placeholder="0.00"></div>
          <div><label>Default Pantry Ready price</label><input id="newProductPantryPrice" type="number" min="0" step=".01" placeholder="0.00"></div>
          <div><label>Default Pantry Ready size</label><input id="newProductPantrySize" placeholder="16 oz bottle, 2 lb pouch..."></div>
        </div>
        <div><label>Additional Pantry Ready sizes</label><textarea id="newProductPantryVariants" placeholder="One per line: 1 oz jar | 12.00&#10;2 oz jar | 20.00"></textarea><p class="small">Use this when one product has multiple packaged sizes.</p></div>
        <div><label>Recipe / materials</label><textarea id="newProductRecipe" placeholder="Ingredients, yield, supplier notes, batch notes"></textarea></div>
        <div class="grid grid-3">
          <div><label>Materials cost</label><input id="newProductMaterialsCost" type="number" min="0" step=".01" placeholder="0.00"></div>
          <div><label>Packaging cost</label><input id="newProductPackagingCost" type="number" min="0" step=".01" placeholder="0.00"></div>
          <div><label>Label cost</label><input id="newProductLabelCost" type="number" min="0" step=".01" placeholder="0.00"></div>
          <div><label>Labor cost</label><input id="newProductLaborCost" type="number" min="0" step=".01" placeholder="0.00"></div>
          <div><label>Waste buffer</label><input id="newProductWasteBuffer" type="number" min="0" step=".01" placeholder="0.00"></div>
          <div><label>Target margin</label><input id="newProductTargetMargin" type="number" min="0" step=".01" placeholder="Example: 0.55"></div>
        </div>
        <div><label>Locations</label><textarea id="newProductLocations" placeholder="Common Good, markets, trunk box, future locations..."></textarea></div>
        <div><label>Social media aspects</label><textarea id="newProductMarketing" placeholder="Buying lenses, sensory details, story, best use cases, customer pain points"></textarea></div>
        <div><label>Owner notes</label><textarea id="newProductNotes" placeholder="Anything else to remember before launch"></textarea></div>
        <button class="primary full" onclick="saveNewProduct()">Save product</button>
        <div id="newProductMessage"></div>
      </div>
    </section>`;
  }
  if(tab==='product'){
    body=`<section class="card"><h2>Product Notebook</h2>
      <label>Choose product</label><select id="notebookProduct" onchange="renderNotebook()">${products.map(p=>`<option value="${p.id}">${p.name}</option>`).join('')}</select>
      <div id="notebook"></div></section>`;
  }
  if(tab==='inventory'){
    const items=getInventoryItems();
    body=`<section class="card"><h2>Inventory</h2>
      <div class="notice">Track planned amounts against actual products on hand for raw ingredients, packaging, finished goods, Pantry Ready stock, refill-bin quantities, glass pieces, trunk boxes, and market allocations.</div>
      <div class="spacer"></div>
      <details class="summary" open>
        <summary>Add inventory item</summary>
        <div class="form-grid">
          <div class="grid grid-3">
            <div><label>Item name</label><input id="inventoryName" placeholder="Example: Baking soda, 8 oz amber bottle, Tallow Lotion 2 oz"></div>
            <div><label>Linked product</label><select id="inventoryProductId"><option value="">Not product-specific</option>${products.map(product=>`<option value="${product.id}">${product.name}</option>`).join('')}</select></div>
            <div><label>Category</label><select id="inventoryCategory"><option>Raw ingredient</option><option>Packaging</option><option>Label</option><option>Finished Pantry Ready</option><option>Refill bulk</option><option>Glass</option><option>Market stock</option><option>Trunk box</option><option>Other</option></select></div>
            <div><label>Location</label><input id="inventoryLocation" placeholder="Common Good, trunk box, market tote..."></div>
            <div><label>Planned amount</label><input id="inventoryPlannedQuantity" type="number" step=".01" placeholder="Target count or amount"></div>
            <div><label>Actual products on hand</label><input id="inventoryActualQuantity" type="number" step=".01" placeholder="What is actually there"></div>
            <div><label>Unit</label><input id="inventoryUnit" placeholder="oz, lb, each, bottles, jars"></div>
            <div><label>Reorder point</label><input id="inventoryReorder" type="number" step=".01" placeholder="Optional"></div>
          </div>
          <div class="grid grid-2">
            <div><label>Supplier / source</label><input id="inventorySupplier" placeholder="Azure, Costco, Uline, estate sale..."></div>
            <div><label>Purchase link</label><input id="inventoryLink" placeholder="https://..."></div>
          </div>
          <div><label>Notes</label><textarea id="inventoryNotes" placeholder="Lot, expiration, jar lid type, scent, batch, reorder notes, allocation notes..."></textarea></div>
          <button class="primary" type="button" onclick="saveInventoryItem()">Save inventory item</button>
          <div id="inventoryMessage"></div>
        </div>
      </details>
      <div class="spacer"></div>
      ${items.length?`<div class="table-wrap"><table><tr><th>Item</th><th>Product</th><th>Category</th><th>Planned</th><th>Actual</th><th>Unit</th><th>Difference</th><th>Status</th><th>Reorder</th><th>Location</th><th>Supplier</th><th>Notes</th><th></th></tr>
        ${items.map((item,index)=>{
          const difference=inventoryDifference(item);
          const differenceLabel=difference===null?'Not planned':`${difference>0?'+':''}${inventoryAmountLabel(difference)}`;
          return `<tr>
          <td><input id="inventoryname${index}" value="${escapeHTML(item.name || '')}" onchange="updateInventoryItem(${index},'name')"></td>
          <td><select id="inventoryproductId${index}" onchange="updateInventoryItem(${index},'productId')"><option value="">Not linked</option>${products.map(product=>`<option value="${product.id}" ${item.productId===product.id?'selected':''}>${product.name}</option>`).join('')}</select></td>
          <td><select id="inventorycategory${index}" onchange="updateInventoryItem(${index},'category')">${['Raw ingredient','Packaging','Label','Finished Pantry Ready','Refill bulk','Glass','Market stock','Trunk box','Other'].map(category=>`<option ${item.category===category?'selected':''}>${category}</option>`).join('')}</select></td>
          <td><input id="inventoryplannedQuantity${index}" type="number" step=".01" value="${item.plannedQuantity ?? ''}" onchange="updateInventoryItem(${index},'plannedQuantity')"></td>
          <td><input id="inventoryquantity${index}" type="number" step=".01" value="${item.quantity ?? ''}" onchange="updateInventoryItem(${index},'quantity')"></td>
          <td><input id="inventoryunit${index}" value="${escapeHTML(item.unit || '')}" onchange="updateInventoryItem(${index},'unit')"></td>
          <td>${escapeHTML(differenceLabel)}</td>
          <td>${inventoryStatusBadge(item)}</td>
          <td><input id="inventoryreorderPoint${index}" type="number" step=".01" value="${item.reorderPoint ?? ''}" onchange="updateInventoryItem(${index},'reorderPoint')"></td>
          <td><input id="inventorylocation${index}" value="${escapeHTML(item.location || '')}" onchange="updateInventoryItem(${index},'location')"></td>
          <td><input id="inventorysupplier${index}" value="${escapeHTML(item.supplier || '')}" onchange="updateInventoryItem(${index},'supplier')"></td>
          <td><textarea id="inventorynotes${index}" onchange="updateInventoryItem(${index},'notes')">${escapeHTML(item.notes || '')}</textarea></td>
          <td><button class="icon-button danger-icon" type="button" onclick="deleteInventoryItem(${index})">Del</button></td>
        </tr>`;
        }).join('')}
      </table></div>`:'<p>No inventory items recorded yet.</p>'}
    </section>`;
  }
  if(tab==='marketing'){
    body=`<section class="card"><h2>AI Marketing Studio</h2>
      <div class="spacer"></div>
      <div class="form-grid">
        <div><label>Post focus</label><select id="marketingFocus">${marketingPostFocuses.map(focus=>`<option value="${focus.id}">${focus.name}</option>`).join('')}</select></div>
        <div><label>Caption depth</label><select id="marketingCaptionDepth"><option value="medium">Medium</option><option value="short">Short</option><option value="long">Long</option><option value="education">Educational</option><option value="story">Story</option></select></div>
        <div><label>Generate</label><select id="marketingOutputType"><option value="both">Caption + image prompt</option><option value="caption">Caption only</option><option value="image">Image prompt only</option></select></div>
        <div class="lens-panel ad-director-panel">
          <div class="lens-panel-head">
            <strong>Advertising Director</strong>
            <span class="small">Optional owner strategy for banked ideas.</span>
          </div>
          <div class="form-grid">
            <div><label>Business goal</label><select id="adBusinessGoal">${advertisingGoals.map(goal=>`<option value="${goal}">${goal}</option>`).join('')}</select></div>
            <div><label>Customer stage</label><select id="adCustomerStage">${advertisingStages.map(stage=>`<option value="${stage}">${stage}</option>`).join('')}</select></div>
            <div><label>Budget posture</label><select id="adBudgetMode">${advertisingBudgetModes.map(mode=>`<option value="${mode}">${mode}</option>`).join('')}</select></div>
          </div>
        </div>
        <div class="lens-panel">
          <div class="lens-panel-head">
            <strong>Buying lenses</strong>
            <span class="small" id="marketingLensNote">Optional. Pick 1-3.</span>
          </div>
          <div class="lens-grid">${renderMarketingLensOptions()}</div>
        </div>
        <div><label>Scene or goal</label><textarea id="marketingGoal" placeholder="A real morning laundry scene with warm window light..."></textarea></div>
        <button class="primary" onclick="generateSimpleMarketingCaption()">Generate post kit</button>
        <div id="marketingResult"></div>
      </div>
      <div class="spacer"></div>
      <section class="summary">
        <h3>Approved Prompt Bank</h3>
        <p class="small">Approve post kits here when you want to save the idea for later. Check it off after you use it.</p>
        <div class="bank-filters">
          <div><label>Search all</label><input id="postKitSearch" type="search" placeholder="Search captions, prompts, lenses..." oninput="renderPostKitBank()"></div>
          <div><label>Caption keywords</label><input id="postKitCaptionSearch" type="search" placeholder="Search caption only..." oninput="renderPostKitBank()"></div>
          <div><label>Status</label><select id="postKitStatus" onchange="renderPostKitBank()"><option value="all">All</option><option value="unused">Unused</option><option value="used">Used</option></select></div>
          <div><label>Post focus</label><select id="postKitFocus" onchange="renderPostKitBank()"><option value="all">All focuses</option>${marketingPostFocuses.map(focus=>`<option value="${focus.id}">${focus.name}</option>`).join('')}</select></div>
          <div><label>Product / context</label><select id="postKitProduct" onchange="renderPostKitBank()"><option value="all">All products</option>${products.map(p=>`<option value="${p.id}">${p.name}</option>`).join('')}</select></div>
          <div><label>Buying lens</label><select id="postKitLens" onchange="renderPostKitBank()"><option value="all">All lenses</option>${marketingBuyingLenses.map(lens=>`<option value="${lens.id}">${lens.name}</option>`).join('')}</select></div>
        </div>
        <div id="postKitBank"></div>
      </section>
    </section>`;
  }
  if(tab==='settings'){
    const settings=getOwnerSettings();
    body=`<section class="card"><h2>Settings</h2>
      <label>Venmo business handle</label><input id="settingVenmoHandle" placeholder="Enter verified business Venmo handle" value="${escapeHTML(settings.venmoHandle || '')}">
      <label>Returned-check fee wording</label><textarea id="settingReturnedCheckFee">${escapeHTML(settings.returnedCheckFee || 'Returned checks are subject to the posted fee and collection costs allowed by law.')}</textarea>
      <label>Store mode</label><select id="settingStoreMode"><option ${settings.storeMode==='Self-service'?'selected':''}>Self-service</option><option ${settings.storeMode==='Staff-assisted'?'selected':''}>Staff-assisted</option><option ${settings.storeMode==='Market'?'selected':''}>Market</option></select>
      <div class="grid grid-2">
        <div><label>Alaina text number</label><input id="settingAlainaPhone" type="tel" inputmode="tel" placeholder="Add Alaina's phone number" value="${escapeHTML(settings.alainaPhone || '')}"></div>
        <div><label>Kaelea text number</label><input id="settingKaeleaPhone" type="tel" inputmode="tel" placeholder="Add Kaelea's phone number" value="${escapeHTML(settings.kaeleaPhone || '')}"></div>
      </div>
      <button class="primary" type="button" onclick="saveOwnerSettingsFromForm()">Save settings</button>
      <p id="settingsMessage" class="small"></p></section>
      <section class="card">
        <h2>Owner Reminders</h2>
        <div class="notice">Next build priorities to remember before this becomes a real operating system.</div>
        <ul>
          <li>Add Reports: sales by date range, product, location, payment method, Pantry Ready, variance, donations, and discrepancies.</li>
          <li>Build out Inventory: raw ingredients, packaging, finished goods, refill stock, trunk box, markets, reorder points, and one-of-a-kind glass.</li>
          <li>Connect real text updates: customer request updates plus owner alerts for Kaelea and Alaina.</li>
          <li>Owner security: replace device-remembered password access with real owner accounts when the app moves beyond static hosting.</li>
        </ul>
      </section>
      <section class="card">
        <h2>Text Updates</h2>
        <div class="notice">Customer requests record text-update permission and owner follow-up needs. The current version creates ready-to-send text links; automatic texting will require an SMS provider later.</div>
        <div class="grid grid-2">
          <div><label>Owner text recipients</label><input value="${escapeHTML(ownerTextContacts().map(contact=>`${contact.name}${contact.phone ? `: ${contact.phone}` : ''}`).join(' / '))}" readonly></div>
          <div><label>Customer update status</label><input value="Opt-in recorded on Pantry Ready requests"></div>
        </div>
      </section>
      <section class="card">
        <h2>Data Backup</h2>
        <div class="notice">Owner data is saved in this browser. Download a backup whenever you enter COGS, recipes, batch records, products, requests, containers, sales, or marketing ideas you care about.</div>
        <div class="button-row">
          <button class="primary" type="button" onclick="downloadDataBackup()">Download backup file</button>
        </div>
        <div class="spacer"></div>
        <label>Restore from backup</label>
        <input id="restoreBackupFile" type="file" accept="application/json">
        <div class="button-row">
          <button class="secondary" type="button" onclick="restoreDataBackup()">Restore backup</button>
        </div>
        <p id="backupMessage" class="small"></p>
      </section>`;
  }
  app(tabs+body);
  if(tab==='product'){
    if(window.pendingNotebookProductId){
      const select=document.getElementById('notebookProduct');
      if(select) select.value=window.pendingNotebookProductId;
      window.pendingNotebookProductId=null;
    }
    renderNotebook();
  }
  if(tab==='marketing') renderPostKitBank();
}

function notebookTabs(active='overview'){
  if(active==='cogs' || active==='pricing') active='costs';
  const tabs=[
    ['overview','Overview'],
    ['recipe','Recipe'],
    ['costs','Cost & Pricing'],
    ['packaging','Packaging & Labels'],
    ['marketing','Marketing']
  ];
  return `<div class="tabs notebook-tabs">${tabs.map(([id,label])=>`<button class="${active===id?'primary':'quiet'}" onclick="renderNotebook('${id}')">${label}</button>`).join('')}</div>`;
}
function renderNotebook(activeTab='overview'){
  if(activeTab==='cogs' || activeTab==='pricing') activeTab='costs';
  const id=document.getElementById('notebookProduct').value;
  const p=products.find(x=>x.id===id);
  if(!p) return;
  const cogs=p.pantryCogs || {};
  const cogsSummary=productCogsSummary(p);
  const statusBadge=productStatusBadge(p);
  const sections={
    overview:`<div class="form-grid">
      <div class="grid grid-3">
        <div><label>Product name</label><input id="notebookName" value="${escapeHTML(p.name)}"></div>
        <div><label>Department / category</label><input id="notebookCategory" value="${escapeHTML(p.category)}"></div>
        <div><label>Status</label><select id="notebookStatus">${productStatusOptions.map(option=>`<option value="${option.value}" ${productStatus(p)===option.value?'selected':''}>${option.label}</option>`).join('')}</select></div>
        <div><label>Unit</label><select id="notebookUnit">${['oz','g','each','jar','bottle','bar','set'].map(unit=>`<option value="${unit}" ${p.unit===unit?'selected':''}>${unit}</option>`).join('')}</select></div>
        <div class="summary">
          <strong>Customer formats</strong>
          <label class="check-row"><input id="notebookRefill" type="checkbox" ${p.refill?'checked':''}><span>Refill by weight</span></label>
          <label class="check-row"><input id="notebookPantry" type="checkbox" ${p.pantry?'checked':''}><span>Pantry Ready</span></label>
        </div>
        <div class="summary"><strong>Current status</strong><br>${statusBadge}<p>${sourceBadge(productPricingSource(p))} ${sourceBadge(productCogsSource(p))}</p></div>
      </div>
      <div class="summary"><strong>Inventory at a glance</strong><p>${productInventoryHTML(p)}</p><p class="small">Inventory can be linked from the Inventory tab by choosing this product.</p></div>
      <div><label>Locations offered</label><textarea id="notebookLocations" placeholder="Common Good, markets, trunk box, future locations...">${escapeHTML(p.locations || '')}</textarea></div>
      <div><label>Owner notes</label><textarea id="notebookOwnerNotes" placeholder="Anything else to remember before launch">${escapeHTML(p.ownerNotes || '')}</textarea></div>
      <button class="primary" type="button" onclick="saveNotebookProduct('overview')">Save overview</button>
    </div>`,
    recipe:`<div class="form-grid">
      <div><label>Recipe card</label><textarea id="notebookRecipe" placeholder="Ingredients, weights, percentages, process, yield, revision notes">${escapeHTML(p.recipeNotes || '')}</textarea></div>
      <div><label>Batch notes</label><textarea id="notebookBatchNotes" placeholder="Production runs, batch dates, lot numbers, quality notes">${escapeHTML(p.batchNotes || '')}</textarea></div>
      <button class="primary" type="button" onclick="saveNotebookProduct('recipe')">Save recipe</button>
    </div>`,
    costs:`<div class="form-grid">
      <div class="notice">Recipe lines come from the Recipe tab. For each ingredient, enter what the recipe uses, what the full container costs, and how much comes in that container.</div>
      <section>
        <h3>Recipe line items</h3>
        <div class="request-list">${renderRecipeIngredientRows(p)}</div>
      </section>
      <section class="summary">
        <h3>Production and packaging</h3>
        <div class="grid grid-3">
          <div><label>Time to produce (minutes)</label><input id="notebookLaborMinutes" type="number" min="0" step="1" value="${p.laborMinutes ?? ''}" placeholder="45"></div>
          <div><label>Hourly labor rate</label><input id="notebookHourlyLaborRate" type="number" min="0" step=".01" value="${p.hourlyLaborRate ?? defaultHourlyLaborRate.toFixed(2)}" placeholder="30.00"></div>
          <div class="summary"><strong>Calculated labor cost</strong><div class="price">${money(cogsSummary.labor)}</div><p class="small">Time to produce × hourly labor rate.</p></div>
          <div><label>Batch yield amount</label><input id="notebookBatchYieldAmount" type="number" min="0" step=".01" value="${p.batchYieldAmount ?? ''}" placeholder="Example: 128"></div>
          <div><label>Batch yield unit</label><input id="notebookBatchYieldUnit" value="${escapeHTML(p.batchYieldUnit || p.unit || 'oz')}" placeholder="oz, g, each"></div>
          <div><label>Pantry Ready packages made</label><input id="notebookPantryPackageCount" type="number" min="0" step="1" value="${p.pantryPackageCount ?? ''}" placeholder="Example: 8"></div>
          <div><label>Packaging cost per package</label><input id="notebookPackagingCost" type="number" min="0" step=".01" value="${cogs.packagingCost ?? ''}" placeholder="0.00"></div>
          <div><label>Label cost per package</label><input id="notebookLabelCost" type="number" min="0" step=".01" value="${cogs.labelCost ?? ''}" placeholder="0.00"></div>
          <div><label>Waste buffer for batch</label><input id="notebookWasteBuffer" type="number" min="0" step=".01" value="${cogs.wasteBuffer ?? ''}" placeholder="0.00"></div>
          <div><label>Target margin</label><input id="notebookTargetMargin" type="number" min="0" step=".01" value="${cogs.targetMargin ?? ''}" placeholder="Example: 0.55"></div>
        </div>
        <div class="grid grid-2">
          <div><label>Packaging photo link</label><input id="notebookPackagingPhoto" value="${escapeHTML(p.packagingPhoto || '')}" placeholder="Optional image URL or file note"></div>
          <div><label>Packaging purchase link</label><input id="notebookPackagingLinks" value="${escapeHTML(p.packagingLinks || '')}" placeholder="https://..."></div>
        </div>
      </section>
      <section class="grid grid-3">
        <div class="summary"><strong>Ingredient total</strong><div class="price">${money(cogsSummary.ingredientTotal)}</div></div>
        <div class="summary"><strong>Refill COGS per ${escapeHTML(p.batchYieldUnit || p.unit || 'unit')}</strong><div class="price">${cogsSummary.refillUnitCost===null?'—':money(cogsSummary.refillUnitCost)}</div><p class="small">Batch ingredients + waste divided by batch yield.</p></div>
        <div class="summary"><strong>Pantry COGS per package</strong><div class="price">${cogsSummary.pantryPackageCost===null?'—':money(cogsSummary.pantryPackageCost)}</div><p class="small">Product share + packaging + label + labor share.</p></div>
        <div class="summary"><strong>Suggested Pantry price</strong><div class="price">${cogsSummary.suggestedPantryPrice===null?'—':money(cogsSummary.suggestedPantryPrice)}</div><p class="small">Based on target margin when entered.</p></div>
      </div>
      <section class="summary">
        <h3>Selling prices</h3>
        <div class="grid grid-3">
          <div><label>Refill price per unit</label><input id="notebookRefillPrice" type="number" min="0" step=".01" value="${p.pricePerUnit ?? ''}" placeholder="0.00"></div>
          <div><label>Pantry Ready price</label><input id="notebookPantryPrice" type="number" min="0" step=".01" value="${p.pantryPrice ?? ''}" placeholder="0.00"></div>
          <div><label>Pantry Ready size</label><input id="notebookPantrySize" value="${escapeHTML(p.pantrySize || '')}" placeholder="16 oz bottle, 2 lb pouch..."></div>
        </div>
        <details>
          <summary>Pantry Ready size variants</summary>
          <p class="small">Use this when one product has multiple packaged sizes, such as 1 oz jar and 2 oz jar.</p>
          <div class="request-list">${renderPantryVariantEditor(p)}</div>
        </details>
        <div class="grid grid-2">
          <div><label>Refill pricing notes</label><textarea id="notebookRefillPricingNotes" placeholder="Product-only refill COGS, target margin, refill price per ounce or gram">${escapeHTML(p.refillPricingNotes || '')}</textarea></div>
          <div><label>Pantry Ready pricing notes</label><textarea id="notebookPantryPricingNotes" placeholder="${pantryCogsFormula()}">${escapeHTML(p.pantryPricingNotes || '')}</textarea></div>
        </div>
      </section>
      <div><label>Cost notes</label><textarea id="notebookCogsNotes" placeholder="Ingredient costs, packaging, labels, labor, waste, merchant fees">${escapeHTML(p.cogsNotes || '')}</textarea></div>
      <div class="button-row">
        <button class="primary" type="button" onclick="saveNotebookCogsCalculator('costs')">Save cost & pricing</button>
      </div>
      <section class="summary">
        <h3>Batch record</h3>
        <div class="grid grid-3">
          <div><label>Batch date</label><input id="batchDate" type="date" value="${new Date().toISOString().slice(0,10)}"></div>
          <div><label>Total batch size/yield</label><input id="batchSize" placeholder="Example: 5 lb, 12 jars"></div>
          <div><label>Bulk refill amount</label><input id="batchBulkAmount" placeholder="Example: 3 lb kept bulk"></div>
          <div><label>Pantry Ready count</label><input id="batchPantryCount" placeholder="Example: 8 bottles"></div>
        </div>
        <div><label>Batch notes</label><textarea id="batchNotes" placeholder="Supplier prices used, substitutions, problems, waste, who made it..."></textarea></div>
        <button class="primary" type="button" onclick="saveBatchRecord()">Save batch record</button>
        ${(p.batchRecords||[]).length?`<div class="spacer"></div><div class="request-list">${p.batchRecords.map(record=>`<div class="editable-brief"><strong>${escapeHTML(record.date)}</strong><p>Yield: ${escapeHTML(record.batchSize || 'Not entered')} · Bulk: ${escapeHTML(record.bulkAmount || 'Not entered')} · Pantry Ready: ${escapeHTML(record.pantryCount || 'Not entered')}</p><p class="small">Ingredient total ${money(record.ingredientTotal || 0)} · Bulk basis ${money(record.bulkTotal || 0)} · Pantry basis ${money(record.pantryTotal || 0)}</p>${record.notes?`<p>${escapeHTML(record.notes)}</p>`:''}</div>`).join('')}</div>`:''}
      </section>
    </div>`,
    pricing:`<div class="form-grid">
      <div class="grid grid-3">
        <div class="summary"><strong>Refill COGS per ${escapeHTML(p.batchYieldUnit || p.unit || 'unit')}</strong><div class="price">${cogsSummary.refillUnitCost===null?'—':money(cogsSummary.refillUnitCost)}</div><p class="small">Use this when pricing refill by ounce, gram, or unit.</p></div>
        <div class="summary"><strong>Pantry COGS per package</strong><div class="price">${cogsSummary.pantryPackageCost===null?'—':money(cogsSummary.pantryPackageCost)}</div><p class="small">Use this when pricing one Pantry Ready jar, pouch, bottle, bar, or set.</p></div>
        <div class="summary"><strong>Suggested Pantry price</strong><div class="price">${cogsSummary.suggestedPantryPrice===null?'—':money(cogsSummary.suggestedPantryPrice)}</div><p class="small">Appears when target margin is entered.</p></div>
      </div>
      <div class="grid grid-3">
        <div><label>Refill price per unit</label><input id="notebookRefillPrice" type="number" min="0" step=".01" value="${p.pricePerUnit ?? ''}" placeholder="0.00"></div>
        <div><label>Pantry Ready price</label><input id="notebookPantryPrice" type="number" min="0" step=".01" value="${p.pantryPrice ?? ''}" placeholder="0.00"></div>
        <div><label>Pantry Ready size</label><input id="notebookPantrySize" value="${escapeHTML(p.pantrySize || '')}" placeholder="16 oz bottle, 2 lb pouch..."></div>
      </div>
      <section>
        <h3>Pantry Ready size variants</h3>
        <p class="small">Use this when one product has multiple packaged sizes, such as 1 oz jar and 2 oz jar.</p>
        <div class="request-list">${renderPantryVariantEditor(p)}</div>
      </section>
      <div class="summary"><strong>Pricing formula</strong><p>${pantryCogsFormula()}</p></div>
      <div><label>Refill pricing notes</label><textarea id="notebookRefillPricingNotes" placeholder="Product-only refill COGS, target margin, refill price per ounce or gram">${escapeHTML(p.refillPricingNotes || '')}</textarea></div>
      <div><label>Pantry Ready pricing notes</label><textarea id="notebookPantryPricingNotes" placeholder="${pantryCogsFormula()}">${escapeHTML(p.pantryPricingNotes || '')}</textarea></div>
      <button class="primary" type="button" onclick="saveNotebookProduct('pricing')">Save pricing</button>
    </div>`,
    packaging:`<div class="form-grid">
      <div><label>Pantry Ready size</label><input id="notebookPantrySize" value="${escapeHTML(p.pantrySize || '')}" placeholder="16 oz bottle, 2 lb pouch..."></div>
      <div><label>Packaging photo link</label><input id="notebookPackagingPhoto" value="${escapeHTML(p.packagingPhoto || '')}" placeholder="Optional image URL or file note"></div>
      <div><label>Packaging links</label><textarea id="notebookPackagingLinks" placeholder="Supplier, SKU, purchase URL, MOQ, lead time">${escapeHTML(p.packagingLinks || '')}</textarea></div>
      <div><label>Inventory split</label><textarea id="notebookInventorySplit" placeholder="How much batch stays bulk refill, how much becomes Pantry Ready, trunk box minimums, market quantities">${escapeHTML(p.inventorySplit || '')}</textarea></div>
      <div class="summary">
        <strong>Approved labels and photos</strong>
        <input type="file" multiple>
        <p class="small">Marketing image prompts should reference approved Workroom assets instead of asking AI to invent label text.</p>
      </div>
      <div><label>Label notes</label><textarea id="notebookLabelNotes" placeholder="Label size, paper, scent variant, ingredients, warnings, batch/date placement">${escapeHTML(p.labelNotes || '')}</textarea></div>
      <button class="primary" type="button" onclick="saveNotebookProduct('packaging')">Save packaging & labels</button>
    </div>`,
    labels:`<div class="form-grid">
      <div><label>Approved labels and photos</label><input type="file" multiple><p class="small">Marketing image prompts should reference these approved Workroom assets instead of asking AI to invent label text.</p></div>
      <div><label>Label notes</label><textarea id="notebookLabelNotes" placeholder="Label size, paper, scent variant, ingredients, warnings, batch/date placement">${escapeHTML(p.labelNotes || '')}</textarea></div>
      <button class="primary" type="button" onclick="saveNotebookProduct('labels')">Save label notes</button>
    </div>`,
    marketing:`<div class="form-grid">
      <div><label>Social media aspects</label><textarea id="notebookMarketingAspects" placeholder="Buying lenses, sensory details, story, best use cases, customer pain points">${escapeHTML(p.marketingAspects || '')}</textarea></div>
      <div><label>Suggested post angles</label><textarea id="notebookPostAngles" placeholder="Outcome, problem, education, ritual, sensory, comparison, giftability...">${escapeHTML(p.postAngles || '')}</textarea></div>
      <button class="primary" type="button" onclick="saveNotebookProduct('marketing')">Save marketing notes</button>
      <button class="secondary" onclick="showAdmin('marketing')" type="button">Open AI Marketing Studio</button>
    </div>`
  };
  document.getElementById('notebook').innerHTML=`
    <div class="spacer"></div>
    ${notebookTabs(activeTab)}
    ${sections[activeTab] || sections.overview}`;
}

updateCartCount();
showHome();
