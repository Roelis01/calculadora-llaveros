# calculadora-llaveros
<!doctype html>

<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Calculadora — Llaveros 3D (PWA / Installable)</title>
  <meta name="theme-color" content="#071023">
  <style>
    :root{--bg:#071023;--card:#0b1624;--muted:#9fb0c8;--accent:#06b6d4;--text:#e6eef8}
    html,body{height:100%;margin:0;font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial;color:var(--text);background:linear-gradient(180deg,#020617 0%,#071026 60%);} 
    .wrap{max-width:1100px;margin:28px auto;padding:20px}
    header{display:flex;align-items:center;justify-content:space-between;gap:12px}
    h1{font-size:1.25rem;margin:0}
    p.lead{margin:0;color:var(--muted);font-size:0.92rem}
    .grid{display:grid;grid-template-columns:1fr 420px;gap:18px;margin-top:18px}
    @media (max-width:880px){.grid{grid-template-columns:1fr;}}
    .card{background:linear-gradient(180deg,var(--card),#041022);border:1px solid rgba(255,255,255,0.03);padding:18px;border-radius:12px;box-shadow:0 6px 18px rgba(2,6,23,0.6)}
    label{display:block;font-size:0.9rem;margin-bottom:6px;color:#cfe8f5}
    input[type=number], input[type=text]{width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.04);background:transparent;color:var(--text);box-sizing:border-box}
    .row{display:flex;gap:10px}
    .row .col{flex:1}
    .small{font-size:0.82rem;color:var(--muted)}
    .actions{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}
    button{background:var(--accent);color:#012;border:none;padding:10px 12px;border-radius:10px;font-weight:600;cursor:pointer}
    button.alt{background:transparent;border:1px solid rgba(255,255,255,0.06);color:var(--text)}
    .result{background:linear-gradient(180deg,#031225,#04182a);padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,0.03)}
    .result .line{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px dashed rgba(255,255,255,0.02)}
    .result .line:last-child{border-bottom:none}
    .big{font-size:1.05rem;font-weight:700}
    .muted{color:var(--muted)}
    .note{font-size:0.8rem;color:var(--muted);margin-top:8px}
    .badge{display:inline-block;padding:6px 8px;border-radius:999px;background:rgba(255,255,255,0.03);font-size:0.78rem;color:var(--muted)}
  </style>
</head>
<body>
  <div class="wrap">
    <header>
      <div>
        <h1>Calculadora — Llaveros 3D (PWA)</h1>
        <p class="lead">Instalable en Android como app: abre en navegador desde un hosting HTTPS para instalar. Incluye export CSV y modo offline.</p>
      </div>
      <div>
        <button id="btnInstall" class="alt" style="display:none">Instalar app</button>
      </div>
    </header><main class="grid">
  <section class="card" aria-labelledby="inputs-title">
    <h2 id="inputs-title" style="font-size:1rem;margin-bottom:8px">Entradas — parámetros</h2>

    <div>
      <label>Precio filamento (MXN / kg)</label>
      <input id="precioFilamento" type="number" step="0.01" value="350" required>
    </div>

    <div class="row" style="margin-top:10px">
      <div class="col">
        <label>Peso por llavero (g)</label>
        <input id="pesoLlaveros" type="number" step="0.1" value="10" required>
      </div>
      <div class="col">
        <label>Desperdicio (%)</label>
        <input id="desperdicio" type="number" step="0.1" value="5">
      </div>
    </div>

    <div style="margin-top:10px">
      <label>Potencia (W) / Tiempo (h) / Tarifa (MXN/kWh)</label>
      <div class="row">
        <input id="potencia" type="number" step="1" value="225" style="flex:0 0 120px">
        <input id="tiempoImpresion" type="number" step="0.01" value="1" style="flex:0 0 120px">
        <input id="tarifa" type="number" step="0.01" value="1.2" style="flex:1">
      </div>
    </div>

    <div style="margin-top:10px" class="row">
      <input id="costoImpresora" type="number" value="8000" placeholder="Costo impresora (MXN)">
      <input id="vidaUtil" type="number" value="2500" placeholder="Vida útil (h)">
    </div>

    <div style="margin-top:10px" class="row">
      <input id="mantMensual" type="number" value="200" placeholder="Mantenimiento mensual (MXN)">
      <input id="horasMens" type="number" value="100" placeholder="Horas uso mensual">
    </div>

    <div style="margin-top:10px" class="row">
      <input id="costoHora" type="number" value="100" placeholder="Costo hora operador (MXN/h)">
      <input id="tiempoTotalMin" type="number" value="35" placeholder="Tiempo total (min)">
    </div>

    <div style="margin-top:10px" class="row">
      <input id="matPost" type="number" step="0.01" value="5" placeholder="Materiales post (MXN)">
      <input id="embalaje" type="number" step="0.01" value="3" placeholder="Embalaje (MXN)">
      <input id="envio" type="number" step="0.01" value="10" placeholder="Envio (MXN)">
    </div>

    <div style="margin-top:10px" class="row">
      <input id="margen" type="number" step="0.1" value="20" placeholder="Margen %">
      <input id="umbral" type="number" value="10" placeholder="Umbral descuento">
      <input id="pctDescuento" type="number" step="0.1" value="10" placeholder="% Descuento">
    </div>

    <div class="actions">
      <button id="btnCalcular" type="button">Calcular</button>
      <button id="btnExportCSV" type="button" class="alt">Exportar CSV</button>
      <button id="btnCopiar" type="button" class="alt">Copiar resultado</button>
      <button id="btnReset" type="button" class="alt">Restablecer</button>
    </div>

    <div class="note">Para instalar en Android y que el app funcione offline plenamente: hospeda este HTML (y los archivos que genere) en un hosting HTTPS (GitHub Pages, Netlify, Vercel, etc.). Luego Chrome ofrecerá "Añadir a pantalla principal" o podrás usar PWABuilder para crear un APK.</div>
  </section>

  <aside class="card">
    <h2 style="font-size:1rem;margin-bottom:10px">Desglose & resultados</h2>
    <div class="result">
      <div class="line"><div class="muted">Costo material</div><div id="rMaterial">—</div></div>
      <div class="line"><div class="muted">Costo energía</div><div id="rEnergia">—</div></div>
      <div class="line"><div class="muted">Amortización</div><div id="rAmort">—</div></div>
      <div class="line"><div class="muted">Mantenimiento</div><div id="rMant">—</div></div>
      <div class="line"><div class="muted">Mano de obra</div><div id="rMano">—</div></div>
      <div class="line"><div class="muted">Post-proceso</div><div id="rPostMat">—</div></div>
      <div class="line"><div class="muted">Embalaje+envío</div><div id="rEnvio">—</div></div>
      <hr style="border:none;border-top:1px solid rgba(255,255,255,0.04);margin:8px 0">
      <div class="line big"><div>Costo total / unidad</div><div id="rTotal">—</div></div>
      <div class="line big"><div>Precio venta</div><div id="rPrecio">—</div></div>
      <div class="line"><div>Precio con descuento</div><div id="rPrecioDesc">—</div></div>
    </div>
    <div class="note" style="margin-top:10px">Si quieres que yo prepare el ZIP listo para subir a PWABuilder (genera APK gratuito), dímelo — lo crearé con manifest, iconos y service worker.</div>
  </aside>
</main>

  </div>  <script>
    // --- PWA: crear manifest y registrar service worker (mejor esfuerzo) ---
    (function createManifestAndSW(){
      try{
        // Crear un ícono SVG simple embebido como data URL (manifest necesita iconos)
        const svg = encodeURIComponent(`<?xml version="1.0" encoding="UTF-8"?><svg xmlns='http://www.w3.org/2000/svg' width='512' height='512'><rect width='100%' height='100%' fill='%23061723'/><circle cx='256' cy='200' r='120' fill='%2310b981'/><rect x='200' y='320' width='112' height='112' rx='24' fill='%2306b6d4'/></svg>`);
        const iconData = 'data:image/svg+xml;utf8,' + svg;

        const manifest = {
          name: 'Calculadora Llaveros 3D',
          short_name: 'Llaveros3D',
          start_url: '.',
          display: 'standalone',
          background_color: '#071023',
          theme_color: '#071023',
          icons: [
            {src: iconData, sizes: '512x512', type: 'image/svg+xml'}
          ]
        };

        const manifestBlob = new Blob([JSON.stringify(manifest)], {type: 'application/json'});
        const manifestURL = URL.createObjectURL(manifestBlob);
        const link = document.createElement('link');
        link.rel = 'manifest';
        link.href = manifestURL;
        document.head.appendChild(link);

        // Crear service worker como blob — algunos navegadores permiten registrar blob URL
        const swCode = `self.addEventListener('install', e => { self.skipWaiting(); });
        self.addEventListener('activate', e => { clients.claim(); });
        self.addEventListener('fetch', e => {
          // Simple cache-first strategy for app shell assets
          e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
        });`;

        const swBlob = new Blob([swCode], {type: 'text/javascript'});
        const swURL = URL.createObjectURL(swBlob);

        if('serviceWorker' in navigator){
          navigator.serviceWorker.register(swURL).then(reg => {
            console.log('Service worker registrado (blob):', reg);
          }).catch(err => {
            console.warn('Registro de SW mediante blob falló — si hospedas en HTTPS crea sw.js separado. Error:', err);
          });
        }
      }catch(e){ console.warn('No se pudo crear manifest/worker automáticamente:', e); }
    })();

    // Manejar evento beforeinstallprompt para mostrar botón de instalar en Android/Chrome
    let deferredPrompt = null;
    window.addEventListener('beforeinstallprompt', (e)=>{
      e.preventDefault();
      deferredPrompt = e;
      const btn = document.getElementById('btnInstall');
      btn.style.display = 'inline-block';
      btn.addEventListener('click', async ()=>{
        btn.style.display = 'none';
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if(choice.outcome === 'accepted') alert('App instalada (o añadida a la pantalla de inicio)');
        deferredPrompt = null;
      });
    });

    // --- Calculadora (mismo código mejorado) ---
    const fmt = v => (isFinite(v) ? '$' + Number(v).toFixed(2) : '-');
    function getInputs(){
      const g = id => document.getElementById(id);
      const cantidadElem = document.getElementById('cantidadPedido');
      return {
        precioFil: Number(g('precioFilamento').value) || 0,
        peso: Number(g('pesoLlaveros').value) || 0,
        desperd: Number(g('desperdicio').value) || 0,
        potencia: Number(g('potencia').value) || 0,
        tiempo: Number(g('tiempoImpresion').value) || 0,
        tarifa: Number(g('tarifa').value) || 0,
        costoImp: Number(g('costoImpresora').value) || 0,
        vida: Number(g('vidaUtil').value) || 1,
        mantMens: Number(g('mantMensual').value) || 0,
        horasMens: Number(g('horasMens').value) || 1,
        costoHora: Number(g('costoHora').value) || 0,
        tiempoTotalMin: Number(g('tiempoTotalMin').value) || 0,
        matPost: Number(g('matPost').value) || 0,
        embalaje: Number(g('embalaje').value) || 0,
        envio: Number(g('envio').value) || 0,
        margen: Number(g('margen').value) || 0,
        umbral: Number(g('umbral').value) || 0,
        pctDesc: Number(g('pctDescuento').value) || 0,
        cantidad: Number(cantidadElem ? cantidadElem.value : 1) || 1
      };
    }

    function calcular(){
      const inps = getInputs();
      const pesoReal = inps.peso * (1 + inps.desperd/100);
      const costoMaterial = (inps.precioFil/1000) * pesoReal;
      const energia = (inps.potencia/1000) * inps.tiempo * inps.tarifa;
      const costoHoraAmort = inps.costoImp / Math.max(inps.vida,1);
      const amortUnidad = costoHoraAmort * inps.tiempo;
      const mantHora = inps.horasMens > 0 ? inps.mantMens / inps.horasMens : 0;
      const mantAsignado = mantHora * inps.tiempo;
      const mano = inps.costoHora * (inps.tiempoTotalMin/60);
      const embalEnv = inps.embalaje + inps.envio;
      const costoTotal = costoMaterial + energia + amortUnidad + mantAsignado + mano + inps.matPost + embalEnv;
      const precioVenta = costoTotal * (1 + inps.margen/100);
      let precioConDesc = precioVenta;
      if(inps.umbral>0 && inps.cantidad >= inps.umbral) precioConDesc = precioVenta * (1 - inps.pctDesc/100);

      document.getElementById('rMaterial').textContent = fmt(costoMaterial);
      document.getElementById('rEnergia').textContent = fmt(energia);
      document.getElementById('rAmort').textContent = fmt(amortUnidad);
      document.getElementById('rMant').textContent = fmt(mantAsignado);
      document.getElementById('rMano').textContent = fmt(mano);
      document.getElementById('rPostMat').textContent = fmt(inps.matPost);
      document.getElementById('rEnvio').textContent = fmt(embalEnv);
      document.getElementById('rTotal').textContent = fmt(costoTotal);
      document.getElementById('rPrecio').textContent = fmt(precioVenta);
      document.getElementById('rPrecioDesc').textContent = fmt(precioConDesc);

      return {inps, outputs:{costoMaterial,energia,amortUnidad,mantAsignado,mano,embalEnv,costoTotal,precioVenta,precioConDesc}};
    }

    document.getElementById('btnCalcular').addEventListener('click', ()=>{ try{ calcular(); }catch(e){ alert('Error: '+e.message) }});

    document.getElementById('btnExportCSV').addEventListener('click', ()=>{
      const data = calcular();
      const rows = [];
      rows.push(['Parametro','Valor']);
      for(const [k,v] of Object.entries(data.inps)) rows.push([k, String(v)]);
      rows.push([]);
      rows.push(['Resultado','Valor']);
      for(const [k,v] of Object.entries(data.outputs)) rows.push([k, String(v)]);

      // Corrección: usar join(',') para columnas y '
' para filas
      const csv = rows.map(r => r.map(c => '"' + String(c).replace(/"/g, '""') + '"').join(',')).join('
');
      const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'Calculadora_Llaveros_3D.csv'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    });

    document.getElementById('btnCopiar').addEventListener('click', async ()=>{
      const res = calcular();
      const o = res.outputs;
      const txt = `Costo total/unidad: ${o.costoTotal.toFixed(2)} MXN
Precio venta: ${o.precioVenta.toFixed(2)} MXN
Precio con descuento: ${o.precioConDesc.toFixed(2)} MXN`;
      try{ await navigator.clipboard.writeText(txt); alert('Resultados copiados al portapapeles'); }catch(e){ alert('No se pudo copiar: '+e.message); }
    });

    document.getElementById('btnReset').addEventListener('click', ()=>{
      const defaults = {precioFilamento:890,pesoLlaveros:10,desperdicio:5,potencia:225,tiempoImpresion:1,tarifa:1.2,costoImpresora:8000,vidaUtil:2500,mantMensual:200,horasMens:100,costoHora:100,tiempoTotalMin:35,matPost:5,embalaje:3,envio:10,margen:20,umbral:10,pctDescuento:10};
      for(const k in defaults) if(document.getElementById(k)) document.getElementById(k).value = defaults[k];
      // restablecer cantidadPedido si existe
      const cp = document.getElementById('cantidadPedido'); if(cp) cp.value = 1;
      calcular();
    });

    // Insertar input de cantidadPedido en la UI lateral (para mobile/horizontal compat)
    window.addEventListener('load', ()=>{
      const sideFooter = document.querySelector('aside .note');
      if(sideFooter){
        const node = document.createElement('div');
        node.style.marginTop = '12px';
        node.innerHTML = '<label>Cantidad por pedido (para descuento)</label><input id="cantidadPedido" type="number" value="1" style="width:100%;padding:8px;border-radius:8px;border:1px solid rgba(255,255,255,0.04);background:transparent;color:var(--text)">';
        sideFooter.parentNode.insertBefore(node, sideFooter);
      }
      calcular();
    });
  </script></body>
</html>
