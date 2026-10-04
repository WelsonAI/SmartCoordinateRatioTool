const endpoint = process.argv[2] || "http://127.0.0.1:9556";
const targetUrl = process.argv[3] || "file:///C:/Users/User/Desktop/SmartCoordinateRatioTool/index.html";

const targets = await fetch(endpoint + "/json/list").then((response) => response.json());
const target = targets.find((item) => item.type === "page");
if (!target) throw new Error("No browser page target.");
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { socket.addEventListener("open", resolve, { once: true }); socket.addEventListener("error", reject, { once: true }); });
let id = 0;
const pending = new Map();
const runtimeErrors = [];
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) { const request = pending.get(message.id); pending.delete(message.id); message.error ? request.reject(new Error(message.error.message)) : request.resolve(message.result); }
  if (message.method === "Runtime.exceptionThrown") runtimeErrors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
});
function send(method, params = {}) { const callId = ++id; socket.send(JSON.stringify({ id: callId, method, params })); return new Promise((resolve, reject) => pending.set(callId, { resolve, reject })); }
async function evaluate(expression) { const result = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }); if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text); return result.result.value; }

await send("Page.enable"); await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await send("Page.navigate", { url: targetUrl });
await new Promise((resolve) => setTimeout(resolve, 900));

const initial = await evaluate(`(() => ({
  grades:[...document.querySelectorAll('#gradeSelect option')].map(o=>o.value),
  modes:[...document.querySelectorAll('[data-mode]')].map(b=>b.dataset.mode),
  forest:document.querySelector('.forest-footer img').complete && document.querySelector('.forest-footer img').naturalWidth>0,
  overflow:document.documentElement.scrollWidth-window.innerWidth,
  guides:document.querySelectorAll('.tool-guide-step').length
}))()`);
if (initial.grades.join(",") !== "4,5,6") throw new Error("Unexpected grades: " + initial.grades);
if (initial.modes.join(",") !== "coordinate,ratio,proportion") throw new Error("Unexpected modes: " + initial.modes);
if (!initial.forest || initial.overflow > 1 || initial.guides !== 3) throw new Error("Initial layout failed: " + JSON.stringify(initial));

const expected = {
  4:{coordinate:["coordinatePlot"],ratio:["ratioObjects"],proportion:["unitRate"]},
  5:{coordinate:["coordinateDistance","coordinateRoute"],ratio:["ratioParts"],proportion:["proportionUnknown"]},
  6:{coordinate:["scaledCoordinates"],ratio:["ratioSimplify"],proportion:["mapScale"]}
};
const covered=[];
for (const [grade,modes] of Object.entries(expected)) for (const [mode,activities] of Object.entries(modes)) {
  const result=await evaluate(`(() => { const g=document.querySelector('#gradeSelect');g.value='${grade}';g.dispatchEvent(new Event('change',{bubbles:true}));document.querySelector('[data-mode=${mode}]').click();const list=[...document.querySelectorAll('#activitySelect option')].map(o=>o.value);const checks=[];for(const activity of list){const a=document.querySelector('#activitySelect');a.value=activity;a.dispatchEvent(new Event('change',{bubbles:true}));checks.push({activity,stage:document.querySelectorAll('#visualStage>*').length,controls:document.querySelectorAll('#controlArea button,#controlArea input').length,summary:document.querySelector('#liveSummary').textContent.trim().length,guides:document.querySelectorAll('.tool-guide-step').length,overflow:document.documentElement.scrollWidth-window.innerWidth});}return {list,checks};})()`);
  if(result.list.join(",")!==activities.join(","))throw new Error(`${grade}/${mode} list mismatch: ${result.list}`);
  if(result.checks.some(c=>!c.stage||!c.controls||!c.summary||c.guides!==3||c.overflow>1))throw new Error(`${grade}/${mode} incomplete: ${JSON.stringify(result.checks)}`);
  covered.push(...result.list);
}
if(new Set(covered).size!==10)throw new Error("Expected 10 unique activities.");

const interaction = await evaluate(`(() => {
  const choose=(grade,mode,activity)=>{const g=document.querySelector('#gradeSelect');g.value=String(grade);g.dispatchEvent(new Event('change',{bubbles:true}));document.querySelector('[data-mode='+mode+']').click();const a=document.querySelector('#activitySelect');a.value=activity;a.dispatchEvent(new Event('change',{bubbles:true}));};
  choose(5,'coordinate','coordinateDistance');
  const svg=document.querySelector('#coordinateSvg'),handle=document.querySelector('[data-point=B]'),rect=svg.getBoundingClientRect();
  const before={...state.values.coordinateDistance.B};
  const toClient=(x,y)=>({clientX:rect.left+(70+x*27)/430*rect.width,clientY:rect.top+(330-y*27)/380*rect.height});
  const start=toClient(before.x,before.y),end=toClient(5,9);
  handle.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,cancelable:true,pointerId:31,...start}));
  svg.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,cancelable:true,pointerId:31,...end}));
  const during={...state.values.coordinateDistance.B};
  svg.dispatchEvent(new PointerEvent('pointerup',{bubbles:true,cancelable:true,pointerId:31,...end}));
  const coordinate={before,during,dx:document.querySelector('#readDx').textContent,dy:document.querySelector('#readDy').textContent};
  choose(4,'ratio','ratioObjects');
  const range=document.querySelector('#ratioA');range.value='9';range.dispatchEvent(new Event('input',{bubbles:true}));
  const ratio={a:state.values.ratioObjects.a,tokens:document.querySelectorAll('#tokensA .token:not(.empty)').length,headline:document.querySelector('.challenge-text').textContent};
  choose(5,'proportion','proportionUnknown');
  const mult=document.querySelector('#multiplier');mult.value='6';mult.dispatchEvent(new Event('input',{bubbles:true}));
  const proportion={factor:state.values.proportionUnknown.multiplier,unknown:document.querySelector('#unknownValue').textContent};
  choose(6,'proportion','mapScale');
  const map=document.querySelector('#mapCard'),pin=document.querySelector('[data-map-point=B]'),mr=map.getBoundingClientRect();
  pin.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,cancelable:true,pointerId:32,clientX:mr.left+mr.width*.75,clientY:mr.top+mr.height*.6}));
  map.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,cancelable:true,pointerId:32,clientX:mr.left+mr.width*.52,clientY:mr.top+mr.height*.38}));
  const mapDuring={...state.values.mapScale.B};
  map.dispatchEvent(new PointerEvent('pointerup',{bubbles:true,cancelable:true,pointerId:32,clientX:mr.left+mr.width*.52,clientY:mr.top+mr.height*.38}));
  document.querySelector('[data-lang=zh]').click();
  choose(5,'ratio','ratioParts');document.querySelector('[data-view=partWhole]').click();
  const partWhole={view:state.values.ratioParts.view,headline:document.querySelector('.challenge-text').textContent};
  choose(4,'coordinate','coordinatePlot');document.querySelector('#teacherButton').click();
  const fields=[...document.querySelectorAll('[data-teacher-key]')];fields[0].value='9';fields[1].value='1';document.querySelector('#useTeacherSettings').click();
  const teacher={point:{...state.values.coordinatePlot.P},open:document.querySelector('#teacherDialog').open};
  document.querySelector('#resetToolButton').click();
  const reset={...state.values.coordinatePlot.P};
  return {coordinate,ratio,proportion,mapDuring,partWhole,teacher,reset,lang:document.documentElement.lang,overflow:document.documentElement.scrollWidth-window.innerWidth};
})()`);
if(interaction.coordinate.during.x!==5||interaction.coordinate.during.y!==9)throw new Error("Coordinate drag did not follow pointer: "+JSON.stringify(interaction.coordinate));
if(interaction.ratio.a!==9||interaction.ratio.tokens!==9)throw new Error("Ratio control failed: "+JSON.stringify(interaction.ratio));
if(interaction.proportion.factor!==6||!interaction.proportion.unknown)throw new Error("Proportion control failed.");
if(!Number.isInteger(interaction.mapDuring.x)||!Number.isInteger(interaction.mapDuring.y))throw new Error("Map drag failed.");
if(interaction.partWhole.view!=="partWhole"||!interaction.partWhole.headline.includes("总数"))throw new Error("Part-to-whole switch failed: "+JSON.stringify(interaction.partWhole));
if(interaction.teacher.open||interaction.teacher.point.x!==9||interaction.teacher.point.y!==1)throw new Error("Teacher settings failed: "+JSON.stringify(interaction.teacher));
if(interaction.reset.x!==4||interaction.reset.y!==6)throw new Error("Reset failed: "+JSON.stringify(interaction.reset));
if(interaction.lang!=="zh-CN"||interaction.overflow>1)throw new Error("Global interaction failed: "+JSON.stringify(interaction));
if(runtimeErrors.length)throw new Error("Runtime errors: "+runtimeErrors.join("\n"));
console.log(JSON.stringify({initial,covered:[...new Set(covered)],interaction},null,2));
socket.close();

