/* Rodseo Physical - developer: change DEV to your full name if you like */
const DEV="Yosef Habtamu",$=s=>document.querySelector(s),G=k=>JSON.parse(localStorage.getItem("rp_"+k)||"null"),S=(k,v)=>localStorage.setItem("rp_"+k,JSON.stringify(v));
const today=()=>new Date().toLocaleDateString("en-CA");
/* ---------- skeleton engine: angles in degrees, 0 = down, 90 = forward (right) ---------- */
const K="T FA FB NA NB KT KS KF ST SS SF hr".split(" "),P=(b,o)=>{const a=b.slice();for(const k in o)a[K.indexOf(k)]=o[k];return a};
const B=[5,25,150,30,145,-22,-22,90,30,-8,90,0]; // fighting stance. T=torso, F/N=far/near arm, K=kicking leg, S=support leg
const ST=(a,b)=>[a,b];
function fk(a){const[T,FA,FB,NA,NB,KT,KS,KF,ST,SS,SF]=a,r=Math.PI/180,d=(o,l,g)=>[o[0]+l*Math.sin(g*r),o[1]+l*Math.cos(g*r)],h=[0,0],n=[55*Math.sin(T*r),-55*Math.cos(T*r)],hd=[n[0]+15*Math.sin(T*r),n[1]-15*Math.cos(T*r)];
const arm=(x,y)=>{const e=d(n,28,x);return[n,e,d(e,26,y)]},leg=(t,s,f)=>{const k=d(h,40,t),an=d(k,40,s);return[h,k,an,d(an,15,f)]};
return{n,hd,fa:arm(FA,FB),na:arm(NA,NB),kl:leg(KT,KS,KF),sl:leg(ST,SS,SF)}}
function draw(a,m,hit){const f=fk(a),all=[...f.kl,...f.sl,...f.fa,...f.na],dx=125-f.sl[2][0],dy=185-Math.max(...all.map(p=>p[1])),X=p=>(p[0]+dx).toFixed(1),Y=p=>(p[1]+dy).toFixed(1);
const L=(p,c,w,o=1)=>`<polyline points="${p.map(q=>X(q)+","+Y(q)).join(" ")}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity="${o}"/>`;
let s=`<line x1="10" x2="290" y1="190" y2="190" stroke="#262b3b" stroke-width="3"/>`;
if(m.pad){const px=125+m.pad[0],py=185-m.pad[1];s+=`<rect x="${px}" y="${py-26}" width="14" height="52" rx="7" fill="${hit?"#FF8A00":"#3a3f55"}"/>`;if(hit)s+=`<circle cx="${px}" cy="${py}" r="26" fill="#FF8A00" opacity=".25"/><path d="M${px-12} ${py-30}l6 12M${px+18} ${py-26}l-6 12M${px+20} ${py+6}l-12 4" stroke="#FFD27A" stroke-width="3" stroke-linecap="round"/>`}
s+=L(f.fa,"#EDEAE4",7,.4)+L(f.sl,"#EDEAE4",10,.55)+L([f.kl[0],f.n],"#EDEAE4",12)+L(f.kl,"#FF2D55",18,.22)+L(f.kl,"#FF2D55",10)+L(f.na,"#FF8A00",8)+`<circle cx="${X(f.hd)}" cy="${Y(f.hd)}" r="13" fill="#EDEAE4"/>`;
if(m.tv){const r=a[11]*Math.PI/180,c=[258,42];s+=`<circle cx="${c[0]}" cy="${c[1]}" r="30" fill="#0008" stroke="#ffffff22"/><line x1="${c[0]-20*Math.sin(r)}" y1="${c[1]-20*Math.cos(r)}" x2="${c[0]+20*Math.sin(r)}" y2="${c[1]+20*Math.cos(r)}" stroke="#FF2D55" stroke-width="6" stroke-linecap="round"/><path d="M${c[0]} ${c[1]}l${24*Math.cos(r)} ${-24*Math.sin(r)}" stroke="#FF8A00" stroke-width="3"/><text x="258" y="86" fill="#8d93a8" font-size="10" text-anchor="middle">hips, top view</text>`}
return s}
/* ---------- moves: [title, how-to text, pose, hit?] ---------- */
const MOVES={
front:{n:"Front snap kick (ap chagi)",pad:[92,82],s:[["Fighting stance","Feet wider than shoulders, knees soft, hands up, weight on the balls of your feet.",B],["Chamber","Drive the back knee up to belt height. Toes pulled back, shin hanging down, standing heel light.",P(B,{KT:88,KS:-5,ST:8,SS:-6,T:0})],["Snap","Snap the shin out like a whip and hit with the ball of the foot. Push the hips forward, lean back a little.",P(B,{KT:90,KS:95,KF:165,ST:6,SS:-4,T:-8}),1],["Retract fast","Pull the foot back to the chamber as fast as it went out. Never leave the leg hanging.",P(B,{KT:88,KS:-5,ST:8,SS:-6})],["Land in stance","Put the foot down in stance with your hands still up. Reset and repeat.",B]]},
round:{n:"Roundhouse kick (dollyo chagi)",pad:[92,82],tv:1,s:[["Fighting stance","Relaxed and ready. The top-view circle shows your hips, they stay square for now.",B],["Pivot and chamber","Turn the standing heel toward the target and lift the knee up and across your body.",P(B,{KT:80,KS:-8,ST:8,SS:-6,hr:45})],["Turn the hip over","This is where the power comes from. Your knee points at the target, hips open fully.",P(B,{KT:88,KS:10,ST:6,SS:-4,T:-6,hr:100})],["Whip and hit","Throw the lower leg out like a whip and hit with the top of the foot. Lean away, head up.",P(B,{KT:90,KS:95,KF:120,ST:6,SS:-4,T:-14,hr:125}),1],["Snap back","Bend the knee straight back to the chamber, do not let it drop.",P(B,{KT:85,KS:5,ST:8,SS:-6,hr:60})],["Land","Turn back and land in stance, hands up.",B]]},
side:{n:"Side kick (yeop chagi)",pad:[84,80],tv:1,s:[["Fighting stance","Ready position, hands up.",B],["Chamber","Pull the knee up to your chest, foot tucked, hips turning sideways.",P(B,{KT:100,KS:10,KF:90,ST:6,SS:-6,hr:60})],["Thrust","Push the heel out in a straight line, lean back, hit with the blade of the foot.",P(B,{KT:88,KS:92,KF:178,ST:4,SS:-4,T:-28,hr:90}),1],["Retract","Pull the knee back to the chest with control.",P(B,{KT:100,KS:10,KF:90,ST:6,SS:-6,hr:60})],["Land","Return to stance.",B]]},
back:{n:"Back kick (dwit chagi)",pad:[-92,79],tv:1,s:[["Fighting stance","Ready position.",B],["Spin and look","Turn your back to the target and look over your shoulder. Never lose sight of it.",P(B,{T:20,KT:10,KS:-20,ST:15,SS:-5,hr:90})],["Chamber","Tuck the knee under your body, heel pointing at the target.",P(B,{T:35,KT:35,KS:-35,ST:12,SS:-4,hr:150})],["Thrust","Drive the heel straight back, torso leans forward, hit with the heel.",P(B,{T:60,KT:-88,KS:-92,KF:-170,ST:10,SS:-2,hr:180}),1],["Retract","Fold the leg back under you.",P(B,{T:35,KT:35,KS:-35,ST:12,SS:-4,hr:150})],["Turn back","Spin around to face front in stance.",B]]},
axe:{n:"Axe kick (naeryeo chagi)",pad:[62,28],s:[["Fighting stance","Ready position.",B],["Chamber","Lift the knee with the leg slightly bent.",P(B,{KT:80,KS:-5,ST:8,SS:-6})],["Lift high","Swing the straight leg up, toes pulled back, hands stay up. Stay on your support leg.",P(B,{KT:172,KS:172,KF:150,ST:6,SS:-4,T:-12})],["Drop the heel","Chop down fast with the heel. Use your hips and core to drive it, do not just swing.",P(B,{KT:50,KS:45,KF:100,ST:8,SS:-4,T:10}),1],["Land","Place the foot down and reset.",B]]},
jab:{n:"Jab and cross",pad:[58,130],s:[["Guard","Chin down, hands up, elbows in, knees soft.",B],["Jab","Snap the lead hand straight out, rotate the fist so the palm faces down at the end.",P(B,{T:8,NA:85,NB:88}),1],["Back to guard","Bring the hand back along the same line, as fast as it went out.",B],["Cross","Push off the back foot, turn the hips and shoulder. The rear heel lifts. Rear hand goes straight out.",P(B,{T:14,FA:85,FB:88,KF:50}),1],["Back to guard","Reset the guard. Breathe out on every punch.",B]]},
squat:{n:"Squat",s:[["Stand tall","Feet shoulder-width, chest up, arms forward for balance.",[0,70,80,70,80,2,0,90,-2,0,90,0]],["Sit back","Hips go back and down, knees follow the toes, back stays straight.",[38,80,85,80,85,75,-12,90,75,-12,90,0]],["Push the floor away","Drive through the whole foot and stand tall. Jump here for jump squats.",[0,70,80,70,80,2,0,90,-2,0,90,0]]]},
lunge:{n:"Lunge / split squat",s:[["Split stance","One foot forward, torso tall, hands on hips.",[0,20,100,20,100,-25,-25,60,25,0,90,0]],["Drop","Lower the back knee toward the floor, front shin stays upright.",[0,20,100,20,100,-15,-80,-70,80,-5,90,0]],["Drive up","Push through the front heel to stand. Keep your hips level.",[0,20,100,20,100,-25,-25,60,25,0,90,0]]]},
plank:{n:"Plank",s:[["Set up","Hands under shoulders, body one straight line from head to heels.",[73,0,0,0,0,-73,-73,20,-73,-73,20,0]],["Brace","Squeeze glutes, pull the belly button in, breathe. Stop if your back hurts.",[71,0,0,0,0,-71,-71,20,-71,-71,20,0]]]}};
const GUIDE=["front","round","side","back","axe","jab","squat","lunge","plank"];
function mount(el,id){const m=MOVES[id],n=m.s.length;let i=0,t0=performance.now(),pl=1,sp=1,raf,last=-1;
el.innerHTML=`<div class="stage"><svg id="fig" viewBox="0 0 300 210"></svg></div><div class="dots">${m.s.map(()=>"<i></i>").join("")}</div><h3 id="sl"></h3><p id="st" class="mute"></p><div class="row"><button class="chip" id="pv">Back</button><button class="chip" id="pp">Pause</button><button class="chip" id="nx">Next</button><button class="chip" id="sd">Speed 1x</button></div>`;
const go=d=>{i=(i+d+n)%n;t0=performance.now()};
$("#pv").onclick=()=>go(-1);$("#nx").onclick=()=>go(1);
$("#pp").onclick=e=>{pl=!pl;e.target.textContent=pl?"Pause":"Play";t0=performance.now()};
$("#sd").onclick=e=>{sp=sp==1?.5:1;e.target.textContent="Speed "+sp+"x"};
function fr(now){if(!el.isConnected)return;const D=1900/sp;let e=now-t0;if(pl&&e>=D){i=(i+1)%n;t0=now;e=0}
const k=pl?Math.max(0,(e/D-.55)/.45):0,ez=k*k*(3-2*k),A=m.s[i][2],C=m.s[(i+1)%n][2],a=A.map((v,j)=>v+(C[j]-v)*ez);
$("#fig").innerHTML=draw(a,m,m.s[i][3]&&ez<.2);
if(last!=i){last=i;$("#sl").textContent=(i+1)+". "+m.s[i][0];$("#st").textContent=m.s[i][1];document.querySelectorAll(".dots i").forEach((d,j)=>d.className=j==i?"on":"")}
raf=requestAnimationFrame(fr)}
raf=requestAnimationFrame(fr)}
/* ---------- workout plan (40 min = 2400 s, about 70% legs) ---------- */
const WARM=[["High knees and light skipping",60,0,"Light and bouncy. Wake the legs up."],["Leg swings, front and side",60,0,"Hold a wall. Swing loose, a bit higher each rep."],["Ankle and hip circles",60,0,"10 slow circles each way, each side."],["Bodyweight squats",60,"squat","Chest up, sit back, knees follow the toes."]];
const LEG=[[["Jump squats",200,"squat","Sit back, explode up, land soft on bent knees. Rest 20 s between sets."],["Skater jumps",200,0,"Bound side to side, land on one leg, hold it 1 second."],["Step jumps or tuck jumps",200,0,"Use a low, stable step only. Stop when form drops."]],
[["Bulgarian split squat",200,"lunge","Rear foot on a chair. Slow down, push through the front heel."],["Slow squats, 4 sec down",200,"squat","Add a backpack with books once it feels easy."],["Single-leg glute bridge and calf raises",200,0,"Squeeze 2 seconds at the top."]],
[["Reverse lunges",200,"lunge","Step back, drop the back knee, stay tall."],["Lateral lunges",200,0,"Sit into one hip, keep the other leg straight."],["Wall sit",200,0,"Thighs level with the floor. Keep breathing."]]];
const KB=["front","round","side","back","axe"];
function plan(n){const th=(n-1)%7,r=th==6?.6:1,ks=[...KB.slice(th%5),...KB.slice(0,th%5)].slice(0,4),
it=[...WARM,...LEG[[0,1,2,0,1,2,2][th]],...ks.map(k=>[MOVES[k].n,165,k,"5 slow reps each leg to learn the line, 5 fast, then 5 with full power."]),
["Hip flexor lunge stretch",90,0,"Back knee down, push the hips forward. 45 s each side."],["Hamstring and butterfly stretch",90,0,"Breathe out and fold slowly. Never bounce."],
["Stance, jab and cross",180,"jab","Stay light on your feet. Turn the hips on every cross."],["Shadow boxing rounds",180,0,"Jab, cross, hook, uppercut. Move your feet, keep your hands up."],
["Plank",60,"plank","Straight line head to heels. Stop if your back hurts."],["Dead bug",60,0,"Lying on your back, lower opposite arm and leg slowly. Lower back stays on the floor."],["Bird dog",60,0,"On all fours, reach opposite arm and leg. Hips stay level."],["Standing knee drives",60,0,"Drive the knee up fast, stand tall."],
["Towel wring and bag carry",60,0,"Wring a wet towel hard, then carry a bag of books by the handles."],["Finger-tip push-up hold and wrist curls",60,0,"Hold on the finger tips, then curl a water bottle with your wrist."]];
return it.map(x=>[x[0],Math.round(x[1]*r),x[2],x[3]])}
const THEMES=["Power","Strength","Technique","Power","Strength","Conditioning","Active recovery"];
const QUOTES=["They counted you out. Let your work answer.","Every rep is proof they misjudged you.","Silence them with who you become, not with noise.","The one they laughed at is the one you are rebuilding today.","Respect is built in the hours nobody watches.","You remember how it felt. Turn it into discipline.","They made you small in their story. Write a bigger one with your legs.","Pain you remember is fuel you can spend.","Quiet people with strong legs end arguments without speaking.","Your past does not decide you. Today's session does.","Do not chase their approval. Outwork their opinion.","One more session, one more reason they will stop doubting.","Strong is built, not given. Build.","Stand tall. Let them wonder what changed.","Their words ended at the door. Your training did not.","Be so disciplined that disrespect has nowhere to land.","You are not training to prove them wrong. You are training to stop needing to.","Kick like you have already won the day.","Hard days make the calm ones unshakeable.","Your stance is your answer.","Small today, dangerous tomorrow, still humble.","Control first, power second, patience always.","The streak is the proof. Do not break it.","Rest your pride. Train your body."];
/* ---------- state ---------- */
let prof=G("p"),done=G("done")||[],logs=G("logs")||{w:[],h:[]},chat=G("chat")||[],tab="home",W=null,tick=null;
const streak=()=>{let c=0,d=new Date();if(!done.includes(today()))d.setDate(d.getDate()-1);while(done.includes(d.toLocaleDateString("en-CA"))){c++;d.setDate(d.getDate()-1)}return c};
const dayNum=()=>Math.max(1,Math.floor((new Date(today())-new Date(prof.start))/864e5)+1);
const quote=()=>QUOTES[(new Date().getDate()+done.length)%QUOTES.length];
const esc=s=>String(s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
function nav(){$("#nav").innerHTML=prof?[["home","Today"],["guide","Kicks"],["prog","Progress"],["coach","Coach"],["me","Profile"]].map(([k,l])=>`<button class="${tab==k?"on":""}" data-t="${k}">${l}</button>`).join(""):"";document.querySelectorAll("#nav button").forEach(b=>b.onclick=()=>{W=null;clearInterval(tick);tab=b.dataset.t;view()})}
function view(){nav();({home,guide,prog,coach,me})[tab]()}
/* ---------- onboarding ---------- */
function onboard(){$("#app").innerHTML=`<h1>Welcome to Rodseo Physical</h1><p class="mute">Your home martial-arts trainer. Tell me about your body first, so the plan fits you.</p>
<div class="card"><label>Your name</label><input id="nm"><div class="row"><div><label>Age</label><input id="ag" type="number" min="8" max="80"></div><div><label>Height (cm)</label><input id="ht" type="number" value="158"></div><div><label>Weight (kg)</label><input id="wt" type="number" value="48"></div></div>
<label>Using a mass gainer?</label><select id="mg"><option>Yes, starting soon</option><option>Yes, already using</option><option>No</option></select>
<label>Pain or injuries (optional)</label><input id="inj"></div>
<div class="card"><p class="mute">This is general fitness information, not medical advice. Check with a doctor before you start, especially if you are still growing or take supplements. Stop if you feel pain.</p>
<label><input type="checkbox" id="c1" style="width:auto"> I accept the <a href="terms.html" target="_blank">Terms of Service</a> and the safety notice.</label><br>
<label><input type="checkbox" id="c2" style="width:auto"> If I am under 18, I have permission from a parent or guardian.</label></div>
<p id="er" style="color:#ff6b81"></p><button class="btn big" id="go">Build my plan</button>`;
$("#go").onclick=()=>{const v=i=>$(i).value.trim(),h=+v("#ht"),w=+v("#wt");if(!v("#nm")||!h||!w)return $("#er").textContent="Enter your name, height and weight.";if(!$("#c1").checked||!$("#c2").checked)return $("#er").textContent="Please accept both boxes to continue.";
prof={name:v("#nm"),age:v("#ag"),h,w,mg:v("#mg"),inj:v("#inj"),start:today()};logs={w:[[today(),w]],h:[[today(),h]]};S("p",prof);S("logs",logs);tab="home";view()}}
/* ---------- home ---------- */
function home(){const n=dayNum(),th=THEMES[(n-1)%7],fin=done.includes(today());
$("#app").innerHTML=`<div class="card hero"><div class="row" style="align-items:center"><div><div class="mute">Day ${n} of 60, ${th}</div><div class="streak">${streak()}</div><div class="mute">day streak</div></div><img src="icons/logo.png" style="max-width:96px;flex:0 0 96px" alt=""></div></div>
<div class="card"><div class="quote">${esc(quote())}</div></div>
<div class="card"><h3>Hello ${esc(prof.name)}</h3><p class="mute">40 minutes. About 70% legs: kicks, jumps, strength and hip flexibility. Then stance, punches, core and grip.</p><button class="btn big" id="st">${fin?"Train again":"Start today's training"}</button></div>
<div class="card"><h3>Before you train</h3><p class="mute">Warm up first, stop on pain, and eat real meals with your mass gainer. Drink water.</p></div>`;$("#st").onclick=()=>startW()}
function startW(){W={items:plan(dayNum()),i:0,left:0,pause:0};W.left=W.items[0][1];player();tick=setInterval(()=>{if(W.pause)return;W.left--;if(W.left<=0)return next();$("#tm")&&upd()},1000)}
const mmss=s=>Math.floor(s/60)+":"+String(s%60).padStart(2,"0");
function next(){W.i++;if(W.i>=W.items.length)return finish();W.left=W.items[W.i][1];navigator.vibrate&&navigator.vibrate(200);player()}
function upd(){const tot=W.items.reduce((a,x)=>a+x[1],0),spent=W.items.slice(0,W.i).reduce((a,x)=>a+x[1],0)+W.items[W.i][1]-W.left;$("#tm").textContent=mmss(W.left);$("#pb").style.width=(100*spent/tot)+"%"}
function player(){const[x,s,a,c]=W.items[W.i];$("#app").innerHTML=`<div class="mute">Exercise ${W.i+1} of ${W.items.length}</div><div class="bar"><i id="pb"></i></div><h2 style="margin-top:12px">${esc(x)}</h2><div class="timer" id="tm"></div>${a?`<div id="an"></div>`:""}<p>${esc(c)}</p>
<div class="row"><button class="btn ghost" id="pz">${W.pause?"Resume":"Pause"}</button><button class="btn ghost" id="sk">Skip</button><button class="btn ghost" id="sp">Stop</button></div>`;
if(a)mount($("#an"),a);upd();$("#pz").onclick=()=>{W.pause=!W.pause;$("#pz").textContent=W.pause?"Resume":"Pause"};$("#sk").onclick=next;$("#sp").onclick=()=>{clearInterval(tick);W=null;view()}}
function finish(){clearInterval(tick);W=null;if(!done.includes(today())){done.push(today());S("done",done)}
$("#app").innerHTML=`<div class="card hero" style="text-align:center"><h1>Session done</h1><div class="streak">${streak()}</div><p>day streak. Cool down, drink water, eat.</p><div class="quote" style="text-align:left">${esc(quote())}</div></div><button class="btn" id="ok">Back to today</button>`;$("#ok").onclick=()=>{tab="home";view()}}
/* ---------- kick guide ---------- */
function guide(sel=GUIDE[0]){$("#app").innerHTML=`<h1>Step by step</h1><p class="mute">Watch the animation, then copy it slowly. The red leg is the kicking leg, the orange pad is the target.</p><div class="chips" style="margin-bottom:14px">${GUIDE.map(k=>`<button class="chip" data-k="${k}" style="${k==sel?"border-color:#FF2D55":""}">${MOVES[k].n.split(" (")[0]}</button>`).join("")}</div><div id="an"></div>`;
document.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>guide(b.dataset.k));mount($("#an"),sel)}
/* ---------- progress and height ---------- */
function prog(){const dn=new Date(),days=[];for(let i=27;i>=0;i--){const d=new Date(dn);d.setDate(d.getDate()-i);days.push(d.toLocaleDateString("en-CA"))}
const last=a=>a.slice(-4).reverse().map(x=>`${x[0]}: ${x[1]}`).join("<br>");
$("#app").innerHTML=`<h1>Progress</h1><div class="card"><h3>Last 28 days</h3>${days.map(d=>`<span class="day ${done.includes(d)?"d":""}">${+d.slice(8)}</span>`).join("")}<p class="mute">${done.length} sessions done. Best streak starts with today.</p></div>
<div class="card"><h3>Weight (kg)</h3><div class="row"><input id="nw" type="number" step="0.1" placeholder="${prof.w}"><button class="btn" id="aw" style="flex:0 0 90px">Add</button></div><p class="mute">${last(logs.w)}</p></div>
<div class="card"><h3>Height (cm)</h3><div class="row"><input id="nh" type="number" step="0.1" placeholder="${prof.h}"><button class="btn" id="ah" style="flex:0 0 90px">Add</button></div><p class="mute">${last(logs.h)}</p></div>
<div class="card"><h3>Height and growth care</h3><p class="mute">Height depends mostly on genetics and age. No exercise or supplement can promise extra height, so the app focuses on what truly helps: 8 to 10 hours of sleep, enough protein, calcium and vitamin D foods, good posture, spine and hip stretches (cobra, child's pose), and measuring every 2 weeks against a wall at the same time of day. Skip heavy lifting and hard landings from heights. If you are still growing, ask a doctor about supplements.</p></div>`;
const add=(i,k,idx)=>$(i).onclick=()=>{const v=+$(idx).value;if(v){logs[k].push([today(),v]);S("logs",logs);prog()}};add("#aw","w","#nw");add("#ah","h","#nh")}
/* ---------- AI coach (Gemini) ---------- */
const sys=()=>`You are Rodseo Coach, a short, practical home taekwondo and boxing trainer. User: ${prof.name}, ${prof.h} cm, ${prof.w} kg, age ${prof.age||"unknown"}, mass gainer: ${prof.mg}, injuries: ${prof.inj||"none"}, training day ${dayNum()} of 60, streak ${streak()}. Rules: sessions max 40 minutes, home only, no gym tools, about 70% legs. Never diagnose. If the user reports pain, dizziness or injury, tell them to stop and see a professional. Do not encourage real fights or violence. Be honest that height cannot be guaranteed to increase. Keep answers under 120 words.`;
function coach(){const msgs=chat.map(m=>`<div class="msg ${m.role=="user"?"u":"a"}">${esc(m.parts[0].text)}</div>`).join("")||`<p class="mute">Ask me to adjust today's workout, fix your kick form, or plan your meals.</p>`;
$("#app").innerHTML=`<h1>Coach</h1><div id="ms">${msgs}</div><div class="chips" style="margin:10px 0">${["Make today shorter","Fix my roundhouse","My legs are sore","What should I eat?"].map(t=>`<button class="chip">${t}</button>`).join("")}</div><div class="row"><input id="q" placeholder="Ask your coach"><button class="btn" id="sn" style="flex:0 0 80px;margin-bottom:10px">Send</button></div>`;
const send=async t=>{if(!t)return;if(!G("key")){chat.push({role:"user",parts:[{text:t}]},{role:"model",parts:[{text:"Add your Gemini API key in Profile first."}]});return coach()}
chat.push({role:"user",parts:[{text:t}]});coach();$("#ms").insertAdjacentHTML("beforeend",`<div class="msg a">Thinking...</div>`);
try{const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${G("model")||"gemini-2.5-flash"}:generateContent?key=${G("key")}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({systemInstruction:{parts:[{text:sys()}]},contents:chat.slice(-20)})}),j=await r.json();
if(!r.ok)throw new Error(j.error?.message||"Request failed");chat.push({role:"model",parts:[{text:j.candidates[0].content.parts[0].text}]})}catch(e){chat.pop();chat.push({role:"user",parts:[{text:t}]},{role:"model",parts:[{text:"Coach error: "+e.message+". Check your key and model name in Profile, and your internet."}]})}
chat=chat.slice(-30);S("chat",chat);coach()};
$("#sn").onclick=()=>{const t=$("#q").value.trim();$("#q").value="";send(t)};document.querySelectorAll(".chips .chip").forEach(b=>b.onclick=()=>send(b.textContent))}
/* ---------- profile ---------- */
function me(){$("#app").innerHTML=`<h1>Profile</h1><div class="card"><h3>${esc(prof.name)}</h3><p class="mute">${prof.h} cm, ${prof.w} kg. Training started ${prof.start}.</p></div>
<div class="card"><h3>Gemini AI coach</h3><label>API key (stays on this device only, never put it in GitHub)</label><input id="ky" type="password" value="${esc(G("key")||"")}"><label>Model name</label><input id="md" value="${esc(G("model")||"gemini-2.5-flash")}"><button class="btn" id="sv">Save</button></div>
<div class="card"><h3>Your own reason</h3><label>One line that makes you train (shown with your quotes)</label><input id="rs" value="${esc(G("reason")||"")}"><button class="btn ghost" id="sr">Save reason</button></div>
<div class="card"><button class="btn ghost" id="ex">Export progress</button><br><a href="terms.html">Terms of Service</a><p class="mute">Rodseo Physical, developed by ${DEV}.</p><button class="btn ghost" id="rt">Erase everything</button></div>`;
$("#sv").onclick=()=>{S("key",$("#ky").value.trim());S("model",$("#md").value.trim());$("#sv").textContent="Saved"};$("#sr").onclick=()=>{S("reason",$("#rs").value.trim());QUOTES.push($("#rs").value.trim());$("#sr").textContent="Saved"};
$("#ex").onclick=()=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify({prof,done,logs})],{type:"application/json"}));a.download="rodseo-progress.json";a.click()};
$("#rt").onclick=()=>{if(confirm("Erase all data on this device?")){localStorage.clear();location.reload()}}}
{const r=G("reason");if(r)QUOTES.push(r)}
prof?view():onboard();
if("serviceWorker"in navigator&&location.protocol.startsWith("http"))navigator.serviceWorker.register("sw.js");
