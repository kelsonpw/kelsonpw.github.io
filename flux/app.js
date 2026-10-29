import { WaveField } from './wave.js?v=field-2';
const canvas = document.querySelector('#field');
const ctx = canvas.getContext('2d', {alpha:false});
const mobile = matchMedia('(max-width:700px)').matches;
const reduced = matchMedia('(prefers-reduced-motion:reduce)').matches;
const GRID = mobile ? 61 : 81;
const N = GRID * GRID;
const wave = new WaveField(GRID);
const TAU = Math.PI*2;
const pos = new Float32Array(N*3);
const targets = Array.from({length:4},()=>new Float32Array(N*3));
const seeds = new Float32Array(N);
let randomSeed=1987;
function rand(){randomSeed=(randomSeed*1664525+1013904223)>>>0;return randomSeed/4294967296;}
let lx=.1, ly=0, lz=0;
for(let i=0;i<N+600;i++){
  const dt=.008;
  const dx=10*(ly-lx),dy=lx*(28-lz)-ly,dz=lx*ly-8/3*lz;
  lx+=dx*dt;ly+=dy*dt;lz+=dz*dt;
  if(i>=600){let k=(i-600)*3;targets[0][k]=lx*8;targets[0][k+1]=(lz-25)*8;targets[0][k+2]=ly*6;}
}
for(let i=0;i<N;i++){
  seeds[i]=rand();
  let k=i*3, a=rand()*TAU,b=rand()*TAU;
  let r=133+39*Math.cos(b);
  targets[1][k]=r*Math.cos(a);targets[1][k+1]=39*Math.sin(b);targets[1][k+2]=r*Math.sin(a);
  let t=i/N, strand=i%2, theta=t*TAU*3+strand*Math.PI;
  let radius=68+(rand()-.5)*13;
  targets[2][k]=radius*Math.cos(theta);targets[2][k+1]=(t-.5)*330;targets[2][k+2]=radius*Math.sin(theta);
  if(i%7===0){let bridge=rand()*2-1;targets[2][k]*=bridge;targets[2][k+2]*=bridge;}
  let side=GRID;let x=(i%side)/(side-1), z=Math.floor(i/side)/(side-1);
  targets[3][k]=(x-.5)*360;targets[3][k+1]=0;targets[3][k+2]=(z-.5)*360;
  pos[k]=targets[3][k];pos[k+1]=0;pos[k+2]=targets[3][k+2];
}
const $ = selector => document.querySelector(selector);
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
let W,H,dpr,zoom=1,yaw=-.3,pitch=-.76,targetYaw=yaw,targetPitch=pitch;
let form=3,tempo=1,paused=reduced,time=0,last=0,frames=0,fpsLast=0,accumulator=0;
let frequency=1,damping=.6,twoSources=false,mode='ripple',autoOrbit=false,immersive=false;
let disturbances=0,held=null,framePending=false;
let pointer=null,pinchDistance=0;
const pointers=new Map();
const markers=[];
const forms=[['The attractor','A Lorenz trajectory, traced through space.'],['Toroidal sculpture','A geometric study in circular motion.'],['Double helix','Two paths. One endless conversation.'],['Wave interference','Tap twice. Watch the waves meet.']];
const stars=Array.from({length:65},()=>[rand(),rand(),rand()]);
const points=Array.from({length:N},()=>({x:0,y:0,z:0,r:0,a:0,color:0}));
let camera={cx:0,cy:0,scale:1};
function invalidate(){if(!framePending){framePending=true;requestAnimationFrame(render);}}
function resize(){W=innerWidth;H=innerHeight<500?680:innerHeight;dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);invalidate();}
function announce(text){$('#announcement').textContent=text;}
function setPaused(value){paused=value;accumulator=0;$('#pause').textContent=paused?'▷':'Ⅱ';$('#pause').setAttribute('aria-label',paused?'Play animation':'Pause animation');invalidate();}
function setMode(value){mode=value;held=null;for(const m of ['ripple','orbit']){$('#'+m+'-mode').classList.toggle('active',mode===m);$('#'+m+'-mode').setAttribute('aria-pressed',mode===m);}canvas.style.cursor=mode==='ripple'&&form===3?'crosshair':'grab';$('#hint').textContent=mode==='ripple'?'Tap the field. Hold to drive a wave.':'Drag to orbit · scroll or pinch to zoom';invalidate();}
function setAutoOrbit(value){autoOrbit=value;$('#auto-orbit').textContent=value?'Auto-orbit on':'Auto-orbit off';$('#auto-orbit').setAttribute('aria-pressed',value);invalidate();}
function resetCamera(){targetYaw=-.3;targetPitch=form===3?-.76:-.12;zoom=1;setAutoOrbit(false);invalidate();}
function setForm(f,reset=true){form=f;held=null;pointers.clear();accumulator=0;document.querySelectorAll('[data-form]').forEach(b=>{const active=Number(b.dataset.form)===f;b.classList.toggle('selected',active);b.setAttribute('aria-pressed',active);});$('#specimen-number').textContent=`0${f+1} / 04`;$('#specimen-title').textContent=forms[f][0];$('#specimen-description').textContent=forms[f][1];$('#wave-controls').hidden=f!==3;$('#sculpture-controls').hidden=f===3;$('#metric-label').textContent=f===3?'DISTURBANCES':'TEMPO';$('#metric-value').textContent=f===3?String(disturbances).padStart(2,'0'):tempo.toFixed(1)+'×';if(reset)resetCamera();if(paused){pos.set(targets[f]);if(f===3)for(let i=0;i<N;i++)pos[i*3+1]=wave.height[i]*1.5;}setMode(mode);if(f!==3)$('#hint').textContent='Drag to orbit. Your camera stays where you leave it.';announce(forms[f].join('. '));invalidate();}
function sources(){const a=[];if(twoSources)a.push({x:Math.round(GRID*.32),z:Math.floor(GRID/2)},{x:Math.round(GRID*.68),z:Math.floor(GRID/2)});if(held&&performance.now()-held.started>250)a.push(held);return a;}
function syncWave(){if(form===3)for(let i=0;i<N;i++){pos[i*3]=targets[3][i*3];pos[i*3+1]=wave.height[i]*1.5;pos[i*3+2]=targets[3][i*3+2];}}
function stillPreview(){for(let i=0;i<30;i++)wave.step(1/120,damping,frequency,sources());syncWave();invalidate();}
function pluck(x=Math.floor(GRID/2),z=Math.floor(GRID/2)){wave.pluck(x,z);disturbances++;markers.push({x,z,created:performance.now()});if(markers.length>6)markers.shift();$('#metric-value').textContent=String(disturbances).padStart(2,'0');$('#hint').textContent=disturbances===1?'Now add another. Watch them meet.':'Hold to drive · Two sources makes interference';if(paused)stillPreview();else syncWave();announce(paused?'Ripple added. Showing a still preview; press Play to animate.':'Ripple added.');invalidate();}
function project(x,y,z){const sy=Math.sin(yaw),cy=Math.cos(yaw),sp=Math.sin(pitch),cp=Math.cos(pitch);const rx=x*cy+z*sy,rz=z*cy-x*sy,ry=y*cp-rz*sp,depth=y*sp+rz*cp,p=600/(600+depth);return {x:camera.cx+rx*camera.scale*p,y:camera.cy-ry*camera.scale*p,z:depth,p};}
function pick(x,y){let nearest=null,distance=32*32;for(let i=0;i<N;i++){const p=points[i],d=(p.x-x)**2+(p.y-y)**2;if(d<distance){distance=d;nearest={x:i%GRID,z:Math.floor(i/GRID)};}}return nearest;}
function setImmersive(value){immersive=value;document.body.classList.toggle('immersed',value);$('#immersive').textContent=value?'Exit field ↙':'Enter field ↗';$('#immersive').setAttribute('aria-pressed',value);invalidate();}
function updateTuning(){$('#frequency-value').textContent=frequency.toFixed(1)+' Hz';$('#damping-value').textContent=damping.toFixed(1);$('#frequency').value=frequency;$('#damping').value=damping;if(paused&&twoSources)stillPreview();invalidate();}
function setupLink(){const p=new URLSearchParams({form:String(form),frequency:frequency.toFixed(1),damping:damping.toFixed(1),sources:twoSources?'2':'0',yaw:targetYaw.toFixed(3),pitch:targetPitch.toFixed(3),zoom:zoom.toFixed(2),field:immersive?'1':'0',tempo:tempo.toFixed(1)});return location.origin+location.pathname+'#'+p;}
function restoreSetup(){const p=new URLSearchParams(location.hash.slice(1));const number=(key,fallback,min,max)=>{if(!p.has(key))return fallback;const n=Number(p.get(key));return Number.isFinite(n)?clamp(n,min,max):fallback;};form=Math.round(number('form',3,0,3));frequency=number('frequency',1,.3,2.5);damping=number('damping',.6,.1,2.5);twoSources=p.get('sources')==='2';zoom=number('zoom',1,.55,1.8);yaw=targetYaw=number('yaw',-.3,-100,100);pitch=targetPitch=number('pitch',form===3?-.76:-.12,-1.3,form===3?-.15:1.3);tempo=number('tempo',1,0,2);setForm(form,false);setImmersive(p.get('field')==='1');$('#sources').setAttribute('aria-pressed',twoSources);$('#tempo').value=tempo;$('#tempo-value').textContent=tempo.toFixed(1)+'×';updateTuning();}
addEventListener('resize',resize);
addEventListener('visibilitychange',()=>{if(!document.hidden){last=0;invalidate();}});
document.querySelectorAll('[data-form]').forEach(b=>b.onclick=()=>setForm(Number(b.dataset.form)));
$('#pause').onclick=()=>setPaused(!paused);$('#reset').onclick=resetCamera;
$('#ripple-mode').onclick=()=>setMode('ripple');$('#orbit-mode').onclick=()=>setMode('orbit');
$('#immersive').onclick=()=>setImmersive(!immersive);$('#auto-orbit').onclick=()=>setAutoOrbit(!autoOrbit);
$('#pluck').onclick=()=>pluck();
$('#sources').onclick=()=>{twoSources=!twoSources;$('#sources').setAttribute('aria-pressed',twoSources);$('#hint').textContent=twoSources?'Two sources. Change frequency. Find a pattern.':'Sources off. Tap anywhere on the field.';if(paused)stillPreview();invalidate();};
$('#clear').onclick=()=>{wave.clear();twoSources=false;held=null;markers.length=0;disturbances=0;$('#sources').setAttribute('aria-pressed','false');$('#metric-value').textContent='00';$('#hint').textContent='A quiet field. Tap to disturb it.';syncWave();invalidate();};
$('#frequency').oninput=e=>{frequency=Number(e.target.value);updateTuning();};$('#damping').oninput=e=>{damping=Number(e.target.value);updateTuning();};
$('#tempo').oninput=e=>{tempo=Number(e.target.value);$('#tempo-value').textContent=tempo.toFixed(1)+'×';$('#metric-value').textContent=tempo.toFixed(1)+'×';invalidate();};
const about=$('#about');$('#info').onclick=()=>about.showModal();$('#close-info').onclick=()=>about.close();
$('#share').onclick=async()=>{const url=setupLink();try{await navigator.clipboard.writeText(url);$('#share').textContent='Link copied ✓';setTimeout(()=>{$('#share').textContent='Share setup ↗';},2000);}catch{const dialog=$('#share-dialog');$('#share-url').value=url;dialog.showModal();$('#share-url').select();}announce('Setup link ready. Includes camera, form, frequency, damping, and sources.');};$('#close-share').onclick=()=>$('#share-dialog').close();
addEventListener('keydown',e=>{if(about.open||$('#share-dialog').open||e.metaKey||e.ctrlKey||e.altKey||['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName))return;if(['1','2','3','4'].includes(e.key)){setForm(Number(e.key)-1);return;}if(e.key.toLowerCase()==='r'&&form===3){e.preventDefault();pluck();}if(e.target===canvas){if(e.code==='Space'){e.preventDefault();setPaused(!paused);}const keys={ArrowLeft:[-.12,0],ArrowRight:[.12,0],ArrowUp:[0,-.08],ArrowDown:[0,.08]};if(keys[e.key]){e.preventDefault();targetYaw+=keys[e.key][0];targetPitch=clamp(targetPitch+keys[e.key][1],-1.3,form===3?-.15:1.3);setAutoOrbit(false);}if(['+','=','-'].includes(e.key)){e.preventDefault();zoom=clamp(zoom+(e.key==='-'?-.1:.1),.55,1.8);invalidate();}}});
canvas.addEventListener('pointerdown',e=>{canvas.focus({preventScroll:true});canvas.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});pinchDistance=0;if(pointers.size>1){held=null;return;}if(form===3&&mode==='ripple'){const p=pick(e.clientX,e.clientY);if(p){pluck(p.x,p.z);held={...p,started:performance.now()};}else{$('#hint').textContent='Tap on the lime surface to send a ripple.';}}});
canvas.addEventListener('pointermove',e=>{pointer={x:e.clientX,y:e.clientY};const previous=pointers.get(e.pointerId);if(previous){pointers.set(e.pointerId,pointer);if(pointers.size===2){held=null;const [a,b]=[...pointers.values()],distance=Math.hypot(a.x-b.x,a.y-b.y);if(pinchDistance)zoom=clamp(zoom*distance/pinchDistance,.55,1.8);pinchDistance=distance;}else if(form!==3||mode==='orbit'){targetYaw+=(e.clientX-previous.x)*.006;targetPitch=clamp(targetPitch+(e.clientY-previous.y)*.005,-1.3,form===3?-.15:1.3);setAutoOrbit(false);}else if(held){const p=pick(e.clientX,e.clientY);if(p){held.x=p.x;held.z=p.z;}}}invalidate();});
function release(e){pointers.delete(e.pointerId);held=null;pinchDistance=0;invalidate();}
canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);canvas.addEventListener('lostpointercapture',release);canvas.addEventListener('pointerleave',()=>{pointer=null;invalidate();});
canvas.addEventListener('wheel',e=>{e.preventDefault();zoom=clamp(zoom-e.deltaY*.0008,.55,1.8);invalidate();},{passive:false});
function render(ms){
  framePending=false;if(document.hidden)return;
  const dt=Math.min((ms-last)/1000||.016,.05);last=ms;
  const movingCamera=Math.abs(targetYaw-yaw)+Math.abs(targetPitch-pitch)>.0001;
  if(!paused){time+=dt*tempo;if(autoOrbit&&!pointers.size)targetYaw+=dt*.075*tempo;if(form===3){accumulator+=dt;const src=sources();while(accumulator>=1/120){wave.step(1/120,damping,frequency,src);accumulator-=1/120;}}}
  const ease=reduced?1:1-Math.exp(-dt*10);yaw+=(targetYaw-yaw)*ease;pitch+=(targetPitch-pitch)*ease;
  ctx.fillStyle='#050505';ctx.fillRect(0,0,W,H);
  const compact=W<701;
  const consoleTop=$('.console').getBoundingClientRect().top;
  const top=compact?(immersive?110:(H<730?190:285)):135;
  const bottom=compact?consoleTop-65:consoleTop-80;
  camera={cx:W*(compact?.5:immersive?.5:.63),cy:(top+bottom)/2,scale:(compact?Math.max(.32,Math.min(W/440,Math.max(130,bottom-top)/240)):Math.min(W/(immersive?700:850),H/570))*zoom};
  const {cx,cy,scale}=camera;
  for(const [x,y,s] of stars){ctx.fillStyle=`rgba(200,210,185,${.07+s*.12})`;ctx.fillRect(x*W,y*H,1,1);}
  const morph=1-Math.exp(-dt*5),target=targets[form];
  for(let i=0;i<N;i++){
    const k=i*3;let tx=target[k],ty=target[k+1],tz=target[k+2];
    if(form===3)ty=wave.height[i]*1.5;
    if(form===1)ty+=5*Math.sin(time+i*.02);
    if(!paused){pos[k]+=(tx-pos[k])*morph;pos[k+1]+=(ty-pos[k+1])*morph;pos[k+2]+=(tz-pos[k+2])*morph;}
    const p=project(pos[k],pos[k+1],pos[k+2]);Object.assign(points[i],p);
    const point=points[i];
    let energy=0;
    if(form===3){const x=i%GRID,z=Math.floor(i/GRID),h=wave.height;const slope=Math.abs(h[i]-h[z*GRID+Math.max(0,x-1)])+Math.abs(h[i]-h[Math.max(0,z-1)*GRID+x]);energy=clamp(Math.abs(wave.velocity[i])*.006+slope*.08,0,1);}
    const depth=clamp(1-(p.z+230)/650,.15,1);
    point.a=form===3?clamp(.24+energy*.65+depth*.18,.2,1):depth*(.8+.2*Math.sin(time+seeds[i]*TAU));
    point.r=Math.max(.55,(form===3?.68+energy*.8:.65+seeds[i]*.7)*scale*p.p);
    point.color=form===3?(energy>.75?2:energy>.15?0:1):(seeds[i]>.96?2:seeds[i]>.77?1:0);
  }
  if(form===3){ctx.lineWidth=.55;ctx.strokeStyle='#b6ed4320';for(let z=0;z<GRID;z+=6){ctx.beginPath();for(let x=0;x<GRID;x++){const p=points[z*GRID+x];if(x===0)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y);}ctx.stroke();}for(let x=0;x<GRID;x+=6){ctx.beginPath();for(let z=0;z<GRID;z++){const p=points[z*GRID+x];if(z===0)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y);}ctx.stroke();}}
  ctx.globalCompositeOperation='lighter';
  for(const p of points){ctx.globalAlpha=p.a;ctx.fillStyle=p.color===2?'#f0ffd7':p.color===1?'#74982c':'#c5ff43';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,TAU);ctx.fill();if(p.color===2){ctx.globalAlpha=p.a*.065;ctx.beginPath();ctx.arc(p.x,p.y,p.r*3.4,0,TAU);ctx.fill();}}
  ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
  if(form===3){const src=sources();for(const s of src){const p=points[s.z*GRID+s.x];ctx.strokeStyle='#e9ffb8';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(p.x,p.y,8,4,0,0,TAU);ctx.stroke();ctx.font='9px monospace';ctx.fillStyle='#c5ff43';ctx.fillText('SOURCE',p.x+12,p.y-8);}for(const m of markers){const age=(ms-m.created)/1000;if(age<1.3){const p=points[m.z*GRID+m.x];ctx.strokeStyle=`rgba(197,255,67,${Math.max(0,1-age/1.3)})`;ctx.beginPath();ctx.ellipse(p.x,p.y,8+age*28,4+age*14,0,0,TAU);ctx.stroke();}}}
  if(pointer&&form===3&&mode==='ripple'){const p=pick(pointer.x,pointer.y);if(p){const q=points[p.z*GRID+p.x];ctx.strokeStyle='#c5ff4380';ctx.beginPath();ctx.arc(q.x,q.y,9,0,TAU);ctx.stroke();}}
  frames++;if(ms-fpsLast>800){$('#fps').textContent=paused?'PAUSED':Math.round(frames*1000/(ms-fpsLast))+' FPS';fpsLast=ms;frames=0;}
  if(!paused||movingCamera){framePending=true;requestAnimationFrame(render);}else $('#fps').textContent='PAUSED';
}
$('#capture').onclick=()=>{const out=document.createElement('canvas');out.width=canvas.width;out.height=canvas.height;const c=out.getContext('2d');c.drawImage(canvas,0,0);c.scale(dpr,dpr);c.fillStyle='#f3f3eb';c.font='500 34px sans-serif';c.fillText('FLUX',32,52);c.fillStyle='#c5ff43';c.font='11px monospace';c.fillText(forms[form][0].toUpperCase()+' / KELSON WARNER',33,76);out.toBlob(blob=>{if(!blob)return;const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`flux-${['attractor','torus','helix','wave'][form]}.png`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);announce('Artwork saved as PNG.');},'image/png');};
$('#particle-count').textContent=N.toLocaleString();
restoreSetup();setPaused(reduced);resize();
if(!reduced&&!location.hash){wave.pluck(Math.round(GRID*.36),Math.round(GRID*.46),25);wave.pluck(Math.round(GRID*.65),Math.round(GRID*.55),25);for(let i=0;i<60;i++)wave.step(1/120,damping,frequency);syncWave();$('#hint').textContent='A starting ripple. The next one is yours.';}
