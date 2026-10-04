import { writeFile } from "node:fs/promises";
const endpoint=process.argv[2]||"http://127.0.0.1:9556";
const targetUrl=process.argv[3]||"file:///C:/Users/User/Desktop/SmartCoordinateRatioTool/index.html";
const targets=await fetch(endpoint+"/json/list").then(r=>r.json());
const target=targets.find(item=>item.type==="page");
const socket=new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve,reject)=>{socket.addEventListener("open",resolve,{once:true});socket.addEventListener("error",reject,{once:true});});
let id=0;const pending=new Map();socket.addEventListener("message",e=>{const m=JSON.parse(e.data);if(!m.id||!pending.has(m.id))return;const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(new Error(m.error.message)):p.resolve(m.result);});
function send(method,params={}){const callId=++id;socket.send(JSON.stringify({id:callId,method,params}));return new Promise((resolve,reject)=>pending.set(callId,{resolve,reject}));}
async function evaluate(expression){const r=await send("Runtime.evaluate",{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw new Error(r.exceptionDetails.text);return r.result.value;}
async function capture(width,height,grade,mode,activity,output){await send("Emulation.setDeviceMetricsOverride",{width,height,deviceScaleFactor:1,mobile:width<600});await send("Page.navigate",{url:targetUrl});await new Promise(r=>setTimeout(r,650));await evaluate(`(()=>{const g=document.querySelector('#gradeSelect');g.value='${grade}';g.dispatchEvent(new Event('change',{bubbles:true}));document.querySelector('[data-mode=${mode}]').click();const a=document.querySelector('#activitySelect');a.value='${activity}';a.dispatchEvent(new Event('change',{bubbles:true}));document.querySelector('[data-lang=zh]').click();})()`);await new Promise(r=>setTimeout(r,200));const size=await evaluate("({width:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight})");const shot=await send("Page.captureScreenshot",{format:"png",captureBeyondViewport:true,clip:{x:0,y:0,width:size.width,height:size.height,scale:1}});await writeFile(output,Buffer.from(shot.data,"base64"));console.log(`${output} ${size.width}x${size.height}`);}
await send("Page.enable");await send("Runtime.enable");
await capture(1440,1000,5,"coordinate","coordinateDistance","review-coordinate-desktop.png");
await capture(1440,1000,5,"coordinate","coordinateRoute","review-route-desktop.png");
await capture(1440,1000,6,"coordinate","scaledCoordinates","review-scaled-coordinate-desktop.png");
await capture(1440,1000,4,"ratio","ratioObjects","review-ratio-objects-desktop.png");
await capture(1440,1000,5,"ratio","ratioParts","review-ratio-parts-desktop.png");
await capture(1440,1000,6,"ratio","ratioSimplify","review-ratio-desktop.png");
await capture(1440,1000,4,"proportion","unitRate","review-unit-rate-desktop.png");
await capture(1440,1000,5,"proportion","proportionUnknown","review-proportion-desktop.png");
await capture(1440,1000,6,"proportion","mapScale","review-scale-desktop.png");
await capture(390,844,4,"coordinate","coordinatePlot","review-coordinate-mobile.png");
socket.close();
