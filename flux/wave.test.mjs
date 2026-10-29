import fs from 'node:fs';
import assert from 'node:assert/strict';
const {WaveField}=await import('data:text/javascript,'+encodeURIComponent(fs.readFileSync(new URL('./wave.js',import.meta.url),'utf8')));
const rms=w=>Math.sqrt(w.height.reduce((s,v)=>s+v*v,0)/w.height.length);
const w=new WaveField(61);w.pluck(30,30);const initial=rms(w);
for(let i=0;i<240;i++)w.step(1/120,.6,1);
assert(Math.abs(w.height[30*61+50])>.001,'disturbance propagates');
for(let i=0;i<3600;i++)w.step(1/120,1.5,1);
assert(rms(w)<initial*.1,'damping settles the field');
for(const frequency of [.3,2.5]){const d=new WaveField(61);for(let i=0;i<3600;i++)d.step(1/120,.1,frequency,[{x:20,z:30},{x:40,z:30}]);assert(d.height.every(Number.isFinite));assert(Math.max(...d.height.map(Math.abs))<300,'driven field remains bounded');}
const a=new WaveField(61),b=new WaveField(61),sum=new WaveField(61);a.pluck(20,30);b.pluck(40,30);sum.pluck(20,30);sum.pluck(40,30);for(let i=0;i<240;i++){for(const x of [a,b,sum])x.step(1/120,.6,1);}assert(Math.max(...sum.height.map((v,i)=>Math.abs(v-a.height[i]-b.height[i])))<.001,'linear waves superpose');
console.log('PASS: propagation, damping, driven stability, and superposition');
