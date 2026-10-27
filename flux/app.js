'use strict';
const canvas = document.querySelector('#field');
const ctx = canvas.getContext('2d', {alpha:false});
const mobile = matchMedia('(max-width:700px)').matches;
const reduced = matchMedia('(prefers-reduced-motion:reduce)').matches;
const N = mobile ? 3600 : 6500;
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
  let side=Math.ceil(Math.sqrt(N));let x=(i%side)/side, z=Math.floor(i/side)/side;
  targets[3][k]=(x-.5)*360;targets[3][k+1]=0;targets[3][k+2]=(z-.5)*360;
  pos[k]=targets[0][k];pos[k+1]=targets[0][k+1];pos[k+2]=targets[0][k+2];
}
let W,H,dpr,zoom=1,yaw=-.35,pitch=-.12,targetYaw=yaw,targetPitch=pitch;
let form=0, tempo=1, paused=reduced, time=0,last=0,frames=0,fpsLast=0;
let pointer=null, dragging=false,lastX=0,lastY=0,pinchDistance=0;
const pointers=new Map();
const forms=[['The attractor','A strange kind of order.'],['Orbital mechanics','Every point has somewhere to be.'],['Double helix','Two paths. One endless conversation.'],['Wave interference','Nothing moves alone.']];
const stars=Array.from({length:65},()=>[rand(),rand(),rand()]);
function resize(){W=innerWidth;H=innerHeight;dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);}
addEventListener('resize',resize);resize();
document.querySelector('#particle-count').textContent=N.toLocaleString();
function setForm(f){form=f;document.querySelectorAll('[data-form]').forEach(b=>{const active=Number(b.dataset.form)===f;b.classList.toggle('selected',active);b.setAttribute('aria-pressed',active);});document.querySelector('#specimen-number').textContent=`0${f+1} / 04`;document.querySelector('#specimen-title').textContent=forms[f][0];document.querySelector('#specimen-description').textContent=forms[f][1];document.querySelector('#announcement').textContent=forms[f].join('. ');if(paused){pos.set(targets[form]);if(form===3)for(let i=0;i<N;i++){const k=i*3,x=pos[k],z=pos[k+2];pos[k+1]=31*Math.sin(x*.027+time)*Math.cos(z*.022+time*.7)+16*Math.sin(Math.hypot(x,z)*.045-time*1.7);}}}
document.querySelectorAll('[data-form]').forEach(b=>b.addEventListener('click',()=>setForm(Number(b.dataset.form))));
function pause(){paused=!paused;document.querySelector('#pause').textContent=paused?'▷':'Ⅱ';document.querySelector('#pause').setAttribute('aria-label',paused?'Play animation':'Pause animation');}
if(paused){document.querySelector('#pause').textContent='▷';document.querySelector('#pause').setAttribute('aria-label','Play animation');}
document.querySelector('#pause').onclick=pause;
document.querySelector('#tempo').oninput=e=>{tempo=Number(e.target.value);document.querySelector('#tempo-value').textContent=tempo.toFixed(1)+'×';document.querySelector('#velocity-readout').textContent=tempo.toFixed(2)+'×';};
document.querySelector('#reset').onclick=()=>{targetYaw=-.35;targetPitch=-.12;zoom=1;};
const about=document.querySelector('#about');
document.querySelector('#info').onclick=()=>about.showModal();document.querySelector('#close-info').onclick=()=>about.close();
addEventListener('keydown',e=>{if(['INPUT','BUTTON'].includes(e.target.tagName)||about.open||e.metaKey||e.ctrlKey||e.altKey)return;if('1234'.includes(e.key))setForm(Number(e.key)-1);if(e.code==='Space'){e.preventDefault();pause();}});
canvas.addEventListener('pointerdown',e=>{canvas.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});dragging=true;lastX=e.clientX;lastY=e.clientY;pinchDistance=0;});
canvas.addEventListener('pointermove',e=>{pointer={x:e.clientX,y:e.clientY};if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===2){let [a,b]=[...pointers.values()];const dist=Math.hypot(a.x-b.x,a.y-b.y);if(pinchDistance)zoom=Math.max(.55,Math.min(1.8,zoom*dist/pinchDistance));pinchDistance=dist;}else{targetYaw+=(e.clientX-lastX)*.006;targetPitch=Math.max(-1.3,Math.min(1.3,targetPitch+(e.clientY-lastY)*.005));}lastX=e.clientX;lastY=e.clientY;});
function release(e){pointers.delete(e.pointerId);dragging=pointers.size>0;pinchDistance=0;if(dragging){const p=[...pointers.values()][0];lastX=p.x;lastY=p.y;}}
canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);canvas.addEventListener('pointerleave',()=>{pointer=null;});
canvas.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.max(.55,Math.min(1.8,zoom-e.deltaY*.0008));},{passive:false});
const points=Array.from({length:N},()=>({x:0,y:0,z:0,r:0,a:0,color:0}));
function render(ms){
  const delta=Math.min((ms-last)/1000||.016,.05);last=ms;
  if(!paused&&!document.hidden){time+=delta*tempo;if(!dragging)targetYaw+=delta*.075*tempo;}
  yaw+=(targetYaw-yaw)*.09;pitch+=(targetPitch-pitch)*.09;
  ctx.fillStyle='#050505';ctx.fillRect(0,0,W,H);
  const compact=W<701;
  const cx=W*(compact?.53:.63),cy=H*(compact?.45:.45);
  const scale=Math.min(W/(compact?470:1000),H/690)*zoom;
  let glow=ctx.createRadialGradient(cx,cy,0,cx,cy,Math.max(100,280*scale));glow.addColorStop(0,'#c5ff4307');glow.addColorStop(.6,'#94bd2a03');glow.addColorStop(1,'#05050500');ctx.fillStyle=glow;ctx.fillRect(0,0,W,H);
  for(const [x,y,s] of stars){ctx.fillStyle=`rgba(200,210,185,${.08+s*.15})`;ctx.fillRect(x*W,y*H,1,1);}
  ctx.strokeStyle='#ffffff09';ctx.lineWidth=.6;
  const ring=240*scale;
  ctx.beginPath();ctx.ellipse(cx,cy,ring,ring*.29,-.3,0,TAU);ctx.stroke();
  ctx.setLineDash([2,9]);ctx.beginPath();ctx.ellipse(cx,cy,ring*1.12,ring*1.12,0,0,TAU);ctx.stroke();ctx.setLineDash([]);
  const sy=Math.sin(yaw),cyaw=Math.cos(yaw),sp=Math.sin(pitch),cp=Math.cos(pitch);
  const target=targets[form],morph=1-Math.exp(-delta*3.5);
  for(let i=0;i<N;i++){
    const k=i*3;let tx=target[k],ty=target[k+1],tz=target[k+2];
    if(form===3){ty=31*Math.sin(tx*.027+time)*Math.cos(tz*.022+time*.7)+16*Math.sin(Math.hypot(tx,tz)*.045-time*1.7);}
    if(form===1){ty+=5*Math.sin(time+i*.02);}
    if(!paused){pos[k]+=(tx-pos[k])*morph;pos[k+1]+=(ty-pos[k+1])*morph;pos[k+2]+=(tz-pos[k+2])*morph;}
    const x=pos[k],y=pos[k+1],z=pos[k+2];
    const rx=x*cyaw+z*sy,rz=z*cyaw-x*sy,ry=y*cp-rz*sp,depth=y*sp+rz*cp;
    const perspective=600/(600+depth);
    const p=points[i];p.x=cx+rx*scale*perspective;p.y=cy-ry*scale*perspective;p.z=depth;
    const breathe=.8+.2*Math.sin(time*1.5+seeds[i]*TAU);
    p.a=Math.max(.1,Math.min(.94,(1-(depth+230)/600)*breathe));p.r=Math.max(.55,(.65+seeds[i]*.7)*scale*perspective);
    p.color=seeds[i]>.96?2:seeds[i]>.77?1:0;
  }
  points.sort((a,b)=>b.z-a.z);
  ctx.globalCompositeOperation='lighter';
  for(let i=0;i<N;i++){
    const p=points[i];ctx.globalAlpha=p.a;ctx.fillStyle=p.color===2?'#ecffd3':p.color===1?'#6d9f32':'#c5ff43';
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,TAU);ctx.fill();
    if(p.color===2&&p.z<40){ctx.globalAlpha=p.a*.09;ctx.beginPath();ctx.arc(p.x,p.y,p.r*4,0,TAU);ctx.fill();}
  }
  ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
  if(pointer&&!dragging){ctx.strokeStyle='#c5ff4340';ctx.lineWidth=.7;ctx.beginPath();ctx.arc(pointer.x,pointer.y,12,0,TAU);ctx.stroke();ctx.fillStyle='#c5ff43';ctx.fillRect(pointer.x-1,pointer.y-1,2,2);}
  frames++;if(ms-fpsLast>800){document.querySelector('#fps').textContent=Math.round(frames*1000/(ms-fpsLast))+' FPS';fpsLast=ms;frames=0;}
  requestAnimationFrame(render);
}
requestAnimationFrame(render);
document.querySelector('#capture').onclick=()=>{
  const out=document.createElement('canvas');out.width=canvas.width;out.height=canvas.height;const c=out.getContext('2d');c.drawImage(canvas,0,0);c.scale(dpr,dpr);c.fillStyle='#f3f3eb';c.font='500 34px sans-serif';c.fillText('FLUX',32,52);c.fillStyle='#c5ff43';c.font='11px monospace';c.fillText(forms[form][0].toUpperCase()+' / KELSON WARNER',33,76);
  out.toBlob(blob=>{if(!blob)return;const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`flux-${['attractor','orbit','helix','wave'][form]}.png`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);document.querySelector('#announcement').textContent='Artwork saved as PNG.';},'image/png');
};
