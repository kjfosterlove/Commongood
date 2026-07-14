
const products = [
  {id:'laundry', name:'Laundry Detergent Powder', category:'Laundry', refill:true, pantry:true, unit:'oz', pricePerUnit:0.42, pantryPrice:14, pantrySize:'2 lb pouch'},
  {id:'dryerballs', name:'Wool Dryer Balls', category:'Laundry', refill:false, pantry:true, unit:'set', pantryPrice:18, pantrySize:'set of 3'},
  {id:'dishwasher', name:'Dishwasher Detergent Powder', category:'Kitchen', refill:true, pantry:true, unit:'oz', pricePerUnit:0.48, pantryPrice:15, pantrySize:'2 lb pouch'},
  {id:'dishsoak', name:'Tough Dish Soak', category:'Kitchen', refill:true, pantry:true, unit:'oz', pricePerUnit:0.44, pantryPrice:13, pantrySize:'2 lb pouch'},
  {id:'solidsoap', name:'Solid Tallow Dish Soap', category:'Kitchen', refill:false, pantry:true, unit:'bar', pantryPrice:16, pantrySize:'1 bar'},
  {id:'allpurpose', name:'All-Purpose Cleaner', category:'Home', refill:true, pantry:true, unit:'oz', pricePerUnit:0.55, pantryPrice:12, pantrySize:'16 oz bottle'},
  {id:'glasscleaner', name:'Glass Cleaner', category:'Home', refill:true, pantry:true, unit:'oz', pricePerUnit:0.50, pantryPrice:11, pantrySize:'16 oz bottle'},
  {id:'linen', name:'Room & Linen Spray', category:'Home', refill:true, pantry:true, unit:'oz', pricePerUnit:1.25, pantryPrice:18, pantrySize:'8 oz bottle'},
  {id:'miswak', name:'Miswak Toothbrush', category:'Personal Care', refill:false, pantry:true, unit:'each', pantryPrice:7, pantrySize:'1 toothbrush'},
  {id:'beard', name:'Beard Oil Cream', category:'Eloah', refill:false, pantry:true, unit:'jar', pantryPrice:24, pantrySize:'1 jar'},
  {id:'magnesium', name:'Magnesium Balm', category:'Eloah', refill:false, pantry:true, unit:'jar', pantryPrice:28, pantrySize:'1 jar'},
  {id:'tallow', name:'Tallow Lotion', category:'Eloah', refill:false, pantry:true, unit:'jar', pantryPrice:20, pantrySize:'2 oz jar'},
  {id:'lip', name:'Lip Balm', category:'Eloah', refill:false, pantry:true, unit:'tube', pantryPrice:15, pantrySize:'5 ml'},
  {id:'callus', name:'Callus & Cuticle Balm', category:'Eloah', refill:false, pantry:true, unit:'jar', pantryPrice:30, pantrySize:'1.5 oz'}
];

const glass = [
  {id:'g1', name:'Vintage Clear Canister', price:14, tare:18.4},
  {id:'g2', name:'Amber Pump Bottle', price:10, tare:9.2},
  {id:'g3', name:'Wide Mouth Mason Jar', price:6, tare:12.8},
  {id:'g4', name:'One-of-a-Kind Estate Jar', price:18, tare:21.1}
];

let cart = JSON.parse(localStorage.getItem('cg_cart') || '[]');
let savedContainers = JSON.parse(localStorage.getItem('cg_containers') || '[]');
let adminUnlocked = false;

function money(n){ return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n); }
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
        <div><div class="icon">⚖️</div><h3>Refill</h3><p>Fill a Common Good glass container or one you brought from home.</p></div>
        <button class="primary full" onclick="showRefillProducts()">Start a refill</button>
      </article>
      <article class="card action-card">
        <div><div class="icon">🛍️</div><h3>Pantry Ready</h3><p>Choose a product that is already packaged and ready to take home.</p></div>
        <button class="primary full" onclick="showPantry()">Shop Pantry Ready</button>
      </article>
      <article class="card action-card">
        <div><div class="icon">🫙</div><h3>Glass Collection</h3><p>Shop vintage jars, bottles, canisters, and useful glass containers.</p></div>
        <button class="primary full" onclick="showGlass()">Browse glass</button>
      </article>
    </section>
  `);
}

function showRefillProducts(){
  setTitle('Choose a Refill Product');
  const rows = products.filter(p=>p.refill).map(p=>`
    <div class="product-row">
      <div><strong>${p.name}</strong><div class="product-meta">${p.category} · ${money(p.pricePerUnit)} per ${p.unit}</div></div>
      <button class="primary" onclick="startRefill('${p.id}')">Select</button>
    </div>`).join('');
  app(`<div class="product-list">${rows}</div>`);
}

function startRefill(id){
  const p = products.find(x=>x.id===id);
  setTitle(p.name);
  app(`
    <section class="card">
      <h2>${p.name}</h2>
      <div class="form-grid">
        <div>
          <label>Which container are you using?</label>
          <select id="containerType" onchange="toggleContainerFields()">
            <option value="own">I brought my own</option>
            <option value="common">Common Good glass</option>
            <option value="saved">A container saved to my account</option>
          </select>
        </div>
        <div id="containerFields"></div>
        <div>
          <label>Filled weight (ounces)</label>
          <input id="filledWeight" type="number" min="0" step=".01" placeholder="Place filled container on scale">
        </div>
        <button class="secondary" onclick="calculateRefill('${id}')">Calculate</button>
        <div id="calcResult"></div>
      </div>
    </section>
  `);
  toggleContainerFields();
}

function toggleContainerFields(){
  const type = document.getElementById('containerType').value;
  const el = document.getElementById('containerFields');
  if(type==='own'){
    el.innerHTML = `<label>Empty container weight / tare (ounces)</label><input id="tareWeight" type="number" min="0" step=".01" placeholder="Weigh empty container">`;
  } else if(type==='common'){
    el.innerHTML = `<label>Select Common Good glass</label><select id="containerSelect">${glass.map(g=>`<option value="${g.id}">${g.name} · tare ${g.tare} oz · ${money(g.price)}</option>`).join('')}</select>`;
  } else {
    el.innerHTML = savedContainers.length
      ? `<label>Select saved container</label><select id="savedSelect">${savedContainers.map((g,i)=>`<option value="${i}">${g.name} · tare ${g.tare} oz</option>`).join('')}</select>`
      : `<div class="notice">You do not have any saved containers yet. Use “I brought my own” this time and save it after adding the refill.</div>`;
  }
}

function calculateRefill(id){
  const p = products.find(x=>x.id===id);
  const type = document.getElementById('containerType').value;
  const filled = parseFloat(document.getElementById('filledWeight').value);
  let tare = 0, container=null;
  if(type==='own') tare = parseFloat(document.getElementById('tareWeight')?.value);
  if(type==='common'){
    container = glass.find(g=>g.id===document.getElementById('containerSelect').value);
    tare = container.tare;
  }
  if(type==='saved'){
    container = savedContainers[parseInt(document.getElementById('savedSelect')?.value)];
    tare = container?.tare;
  }
  if(!Number.isFinite(filled) || !Number.isFinite(tare) || filled<=tare){
    document.getElementById('calcResult').innerHTML=`<div class="notice warning">Check the filled and empty weights. Filled weight must be greater than tare weight.</div>`;
    return;
  }
  const net = filled-tare;
  const productPrice = net*p.pricePerUnit;
  const containerPrice = type==='common' ? container.price : 0;
  const total = productPrice+containerPrice;
  window.lastRefill={p,type,tare,filled,net,productPrice,container,containerPrice,total};
  document.getElementById('calcResult').innerHTML=`
    <div class="summary">
      <div><strong>Product weight:</strong> ${net.toFixed(2)} oz</div>
      <div><strong>Refill:</strong> ${money(productPrice)}</div>
      ${containerPrice?`<div><strong>${container.name}:</strong> ${money(containerPrice)}</div>`:''}
      <div class="price">${money(total)}</div>
      <button class="primary full" onclick="addCalculatedRefill()">Add to cart</button>
    </div>`;
}

function addCalculatedRefill(){
  const r=window.lastRefill;
  cart.push({type:'refill',name:r.p.name,detail:`${r.net.toFixed(2)} oz refill`,price:r.productPrice});
  if(r.containerPrice) cart.push({type:'glass',name:r.container.name,detail:'Common Good glass',price:r.containerPrice});
  save();
  if(r.type==='own'){
    app(`<section class="card"><h2>Added to cart</h2><p>Would you like to save this container for next time?</p>
      <button class="primary" onclick="saveOwnContainer(${r.tare})">Save container</button>
      <button class="secondary" onclick="showHome()">Not now</button></section>`);
  } else showCart();
}

function saveOwnContainer(tare){
  const name=prompt('What would you like to call this container?','My refill jar');
  if(name){ savedContainers.push({name,tare}); localStorage.setItem('cg_containers',JSON.stringify(savedContainers)); }
  showCart();
}

function showPantry(){
  setTitle('Pantry Ready');
  app(`<div class="product-list">${products.filter(p=>p.pantry).map(p=>`
    <div class="product-row">
      <div><strong>${p.name}</strong><div class="product-meta">${p.pantrySize} · ${money(p.pantryPrice)}</div></div>
      <button class="primary" onclick="addPantry('${p.id}')">Add</button>
    </div>`).join('')}</div>`);
}
function addPantry(id){
  const p=products.find(x=>x.id===id);
  cart.push({type:'pantry',name:p.name,detail:p.pantrySize,price:p.pantryPrice});
  save();
  showPantry();
}

function showGlass(){
  setTitle('Glass Collection');
  app(`<div class="notice">Common Good-supplied refill containers are glass only. Customers may bring their own clean containers of any suitable material.</div><div class="spacer"></div>
  <div class="product-list">${glass.map(g=>`
    <div class="product-row">
      <div><strong>${g.name}</strong><div class="product-meta">Tare ${g.tare} oz · ${money(g.price)}</div></div>
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
  app(`<section class="payment-grid">
    <article class="card payment-card"><div class="icon">💵</div><h3>Cash</h3><button class="primary" onclick="showPayment('cash')">Select</button></article>
    <article class="card payment-card"><div class="icon">🧾</div><h3>Check</h3><button class="primary" onclick="showPayment('check')">Select</button></article>
    <article class="card payment-card"><div class="icon">📱</div><h3>Venmo</h3><button class="primary" onclick="showPayment('venmo')">Select</button></article>
  </section>`);
}

function showPayment(type){
  setTitle(type[0].toUpperCase()+type.slice(1)+' Payment');
  const total=cart.reduce((s,x)=>s+x.price,0);
  if(type==='cash'){
    app(`<section class="card"><h2>Cash total: ${money(total)}</h2>
      <div class="notice"><strong>1.</strong> Place your cash inside a silicone payment envelope.<br><strong>2.</strong> Write your name or receipt number on the envelope if requested.<br><strong>3.</strong> Place the sealed envelope in the cash box.</div>
      <div class="spacer"></div><button class="primary full" onclick="finishSale('Cash')">I deposited my payment</button></section>`);
  }
  if(type==='check'){
    app(`<section class="card"><h2>Check total: ${money(total)}</h2>
      <div class="notice"><strong>Make check payable to:</strong> Common Good<br><br>Place your check in a silicone payment envelope and deposit it in the cash box.</div>
      <p class="small">Returned checks are subject to the posted returned-check fee and any collection costs allowed by law. Final wording should be reviewed before launch.</p>
      <button class="primary full" onclick="finishSale('Check')">I deposited my check</button></section>`);
  }
  if(type==='venmo'){
    app(`<section class="card" style="text-align:center"><h2>Venmo total: ${money(total)}</h2>
      <div class="qr" aria-label="Placeholder Venmo QR code"></div>
      <p><strong>@CommonGoodPlaceholder</strong></p>
      <a class="primary" style="display:inline-block;text-decoration:none" href="https://venmo.com/" target="_blank">Open Venmo</a>
      <div class="spacer"></div><button class="secondary full" onclick="finishSale('Venmo')">I completed payment</button>
      <p class="small">Replace the placeholder handle and QR code with your verified business Venmo details before use.</p></section>`);
  }
}

function finishSale(method){
  const total=cart.reduce((s,x)=>s+x.price,0);
  const sale={date:new Date().toISOString(),method,total,items:cart};
  const sales=JSON.parse(localStorage.getItem('cg_sales')||'[]'); sales.push(sale); localStorage.setItem('cg_sales',JSON.stringify(sales));
  cart=[];save();
  setTitle('Thank You');
  app(`<section class="hero"><h2>Thank you for shopping Common Good.</h2><p>Your ${method.toLowerCase()} purchase of <strong>${money(total)}</strong> has been recorded.</p><button class="primary" onclick="showHome()">Start a new purchase</button></section>`);
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
    <label>Password</label><input id="password" type="password" placeholder="Prototype password: common">
    <div class="spacer"></div><button class="primary full" onclick="login()">Sign in</button>
    <p class="small">This prototype uses a demonstration password only. Production will require secure authentication.</p></section>`);
}
function login(){
  if(document.getElementById('password').value==='common'){adminUnlocked=true;showAdmin();}
  else alert('Incorrect password. Prototype password: common');
}

function showAdmin(tab='dashboard'){
  setTitle('Common Good Workroom');
  const tabs=`<div class="tabs">
    <button class="secondary" onclick="showAdmin('dashboard')">Dashboard</button>
    <button class="secondary" onclick="showAdmin('products')">Products</button>
    <button class="secondary" onclick="showAdmin('product')">Product Notebook</button>
    <button class="secondary" onclick="showAdmin('inventory')">Inventory</button>
    <button class="secondary" onclick="showAdmin('marketing')">AI Marketing Studio</button>
    <button class="secondary" onclick="showAdmin('settings')">Settings</button>
  </div>`;
  let body='';
  if(tab==='dashboard'){
    const sales=JSON.parse(localStorage.getItem('cg_sales')||'[]');
    const revenue=sales.reduce((s,x)=>s+x.total,0);
    body=`<div class="grid grid-3">
      <div class="card"><div class="small">Recorded sales</div><div class="price">${sales.length}</div></div>
      <div class="card"><div class="small">Revenue</div><div class="price">${money(revenue)}</div></div>
      <div class="card"><div class="small">Products</div><div class="price">${products.length}</div></div>
    </div>`;
  }
  if(tab==='products'){
    body=`<section class="card"><h2>Products</h2><div class="table-wrap"><table><tr><th>Product</th><th>Category</th><th>Refill</th><th>Pantry Ready</th><th>Retail</th></tr>
      ${products.map(p=>`<tr><td>${p.name}</td><td>${p.category}</td><td>${p.refill?'Yes':'—'}</td><td>${p.pantry?'Yes':'—'}</td><td>${p.refill?money(p.pricePerUnit)+'/'+p.unit:money(p.pantryPrice)}</td></tr>`).join('')}</table></div></section>`;
  }
  if(tab==='product'){
    body=`<section class="card"><h2>Product Notebook</h2>
      <label>Choose product</label><select id="notebookProduct" onchange="renderNotebook()">${products.map(p=>`<option value="${p.id}">${p.name}</option>`).join('')}</select>
      <div id="notebook"></div></section>`;
  }
  if(tab==='inventory'){
    body=`<section class="card"><h2>Inventory</h2><p>This area will track raw ingredients, packaging, finished goods, Pantry Ready stock, refill-bin quantities, glass pieces, reorder points, and vendor-market allocations.</p>
    <button class="primary">Add inventory item</button></section>`;
  }
  if(tab==='marketing'){
    body=`<section class="card"><h2>AI Marketing Studio</h2>
      <div class="notice"><strong>Brand Brain:</strong> Store your brand guide, approved labels, logos, product dimensions, photography rules, words to use, words to avoid, and approved examples.</div>
      <div class="spacer"></div>
      <div class="form-grid">
        <div><label>Product</label><select>${products.map(p=>`<option>${p.name}</option>`).join('')}</select></div>
        <div><label>Platform</label><select><option>Instagram 4:5</option><option>Instagram Story</option><option>Facebook</option><option>Market Sign</option></select></div>
        <div><label>Scene or goal</label><textarea placeholder="A real morning laundry scene with warm window light..."></textarea></div>
        <button class="primary">Generate image concept</button>
      </div>
      <p class="small">The production version should generate the scene and then place approved label artwork as a locked overlay so text and labels remain accurate.</p>
    </section>`;
  }
  if(tab==='settings'){
    body=`<section class="card"><h2>Settings</h2>
      <label>Venmo business handle</label><input value="@CommonGoodPlaceholder">
      <label>Returned-check fee wording</label><textarea>Returned checks are subject to the posted fee and collection costs allowed by law.</textarea>
      <label>Store mode</label><select><option>Self-service</option><option>Staff-assisted</option><option>Market</option></select>
      <button class="primary">Save settings</button></section>`;
  }
  app(tabs+body);
  if(tab==='product') renderNotebook();
}

function renderNotebook(){
  const id=document.getElementById('notebookProduct').value;
  const p=products.find(x=>x.id===id);
  document.getElementById('notebook').innerHTML=`
    <div class="spacer"></div>
    <div class="tabs"><button class="quiet">Overview</button><button class="quiet">Recipe</button><button class="quiet">COGS</button><button class="quiet">Pricing</button><button class="quiet">Packaging</button><button class="quiet">Labels</button><button class="quiet">Marketing</button></div>
    <div class="grid grid-2">
      <div class="summary"><strong>Status</strong><br><span class="badge">Active</span><p>${p.category}</p></div>
      <div class="summary"><strong>Current customer formats</strong><p>${p.refill?'Refill by weight<br>':''}${p.pantry?'Pantry Ready':''}</p></div>
    </div>
    <div class="spacer"></div>
    <div class="form-grid">
      <div><label>Recipe card</label><textarea placeholder="Ingredients, weights, percentages, process, yield, revision notes"></textarea></div>
      <div><label>COGS inputs</label><textarea placeholder="Ingredient costs, packaging, labels, labor, waste, merchant fees"></textarea></div>
      <div><label>Packaging links</label><textarea placeholder="Supplier, SKU, purchase URL, MOQ, lead time"></textarea></div>
      <div><label>Approved labels and photos</label><input type="file" multiple></div>
      <button class="primary">Save product notebook</button>
    </div>`;
}

updateCartCount();
showHome();
