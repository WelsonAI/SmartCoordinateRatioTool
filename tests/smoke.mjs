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
  6:{coordinate:["scaledCoordinates"],ratio:["ratioSimplify"],proportion:["ratioQuantity","mapScale"]}
};
const covered=[];
for (const [grade,modes] of Object.entries(expected)) for (const [mode,activities] of Object.entries(modes)) {
  const result=await evaluate(`(() => { const g=document.querySelector('#gradeSelect');g.value='${grade}';g.dispatchEvent(new Event('change',{bubbles:true}));document.querySelector('[data-mode=${mode}]').click();const list=[...document.querySelectorAll('#activitySelect option')].map(o=>o.value);const checks=[];for(const activity of list){const a=document.querySelector('#activitySelect');a.value=activity;a.dispatchEvent(new Event('change',{bubbles:true}));checks.push({activity,stage:document.querySelectorAll('#visualStage>*').length,controls:document.querySelectorAll('#controlArea button,#controlArea input').length,summary:document.querySelector('#liveSummary').textContent.trim().length,guides:document.querySelectorAll('.tool-guide-step').length,overflow:document.documentElement.scrollWidth-window.innerWidth});}return {list,checks};})()`);
  if(result.list.join(",")!==activities.join(","))throw new Error(`${grade}/${mode} list mismatch: ${result.list}`);
  if(result.checks.some(c=>!c.stage||!c.controls||!c.summary||c.guides!==3||c.overflow>1))throw new Error(`${grade}/${mode} incomplete: ${JSON.stringify(result.checks)}`);
  covered.push(...result.list);
}
if(new Set(covered).size!==11)throw new Error("Expected 11 unique activities.");

const teaching = await evaluate(`(() => {
  const choose=(grade,mode,activity)=>{const g=document.querySelector('#gradeSelect');g.value=String(grade);g.dispatchEvent(new Event('change',{bubbles:true}));document.querySelector('[data-mode='+mode+']').click();const a=document.querySelector('#activitySelect');a.value=activity;a.dispatchEvent(new Event('change',{bubbles:true}));};
  choose(5,'coordinate','coordinateRoute');
  const route={legs:document.querySelectorAll('.route-card').length,paths:document.querySelectorAll('.route-leg').length,labels:document.querySelectorAll('.route-leg-label').length,works:[document.querySelector('#readLegABWork')?.textContent,document.querySelector('#readLegBCWork')?.textContent,document.querySelector('#readRouteWork')?.textContent]};
  choose(5,'ratio','ratioParts');
  const parts={question:!!document.querySelector('.comparison-question'),choices:document.querySelectorAll('.comparison-choice').length,explain:document.querySelectorAll('#comparisonExplain .compare-chip').length};
  choose(6,'ratio','ratioSimplify');
  const simplify={equations:document.querySelectorAll('.simplify-equation').length,results:document.querySelectorAll('.simplify-result').length,repeatedGroups:document.querySelectorAll('.ratio-group').length};
  choose(5,'proportion','proportionUnknown');
  const unknown={machine:!!document.querySelector('.proportion-machine'),rows:document.querySelectorAll('.machine-row').length,steps:document.querySelectorAll('.solve-steps>div').length,factor:document.querySelector('#solveFactor')?.textContent,answer:document.querySelector('#solveUnknown')?.textContent};
  choose(6,'proportion','mapScale');
  const map={captions:document.querySelectorAll('.map-place-caption').length,counts:document.querySelectorAll('.map-count').length,steps:document.querySelectorAll('.map-learning-steps>div').length,formula:[document.querySelector('#mapStep1')?.textContent,document.querySelector('#mapStep2')?.textContent,document.querySelector('#mapStep3')?.textContent]};
  choose(4,'ratio','ratioObjects');document.querySelector('[data-ratio-preset=hundred]').click();
  const largeRatio={hundred:!!document.querySelector('.hundred-flat'),headline:document.querySelector('.challenge-text').textContent};document.querySelector('[data-ratio-preset=thousand]').click();largeRatio.thousand=!!document.querySelector('.thousand-bundle');largeRatio.thousandHeadline=document.querySelector('.challenge-text').textContent;
  choose(6,'proportion','ratioQuantity');
  const quantity={blocks:document.querySelectorAll('.quantity-blocks i').length,steps:document.querySelectorAll('.quantity-solve-steps>div').length,choices:document.querySelectorAll('[data-known-mode]').length,results:document.querySelectorAll('.quantity-results .metric').length};
  return {route,parts,simplify,unknown,map,largeRatio,quantity};
})()`);
if(teaching.route.legs!==3||teaching.route.paths!==2||teaching.route.labels!==0||teaching.route.works.some(v=>!v))throw new Error("Route explanation failed: "+JSON.stringify(teaching.route));
if(!teaching.parts.question||teaching.parts.choices!==3||teaching.parts.explain!==2)throw new Error("Ratio comparison explanation failed: "+JSON.stringify(teaching.parts));
if(teaching.simplify.equations!==2||teaching.simplify.results!==1||teaching.simplify.repeatedGroups!==0)throw new Error("Simplest-ratio explanation failed: "+JSON.stringify(teaching.simplify));
if(!teaching.unknown.machine||teaching.unknown.rows!==2||teaching.unknown.steps!==2||!teaching.unknown.factor||!teaching.unknown.answer)throw new Error("Unknown proportion explanation failed: "+JSON.stringify(teaching.unknown));
if(teaching.map.captions!==2||teaching.map.counts!==2||teaching.map.steps!==3||teaching.map.formula.some(v=>!v))throw new Error("Map-scale explanation failed: "+JSON.stringify(teaching.map));
if(!teaching.largeRatio.hundred||!teaching.largeRatio.headline.includes('1 : 100')||!teaching.largeRatio.thousand||!teaching.largeRatio.thousandHeadline.includes('1 : 1000'))throw new Error("Large-ratio representation failed: "+JSON.stringify(teaching.largeRatio));
if(teaching.quantity.blocks!==5||teaching.quantity.steps!==3||teaching.quantity.choices!==2||teaching.quantity.results!==3)throw new Error("Ratio-quantity lab failed: "+JSON.stringify(teaching.quantity));

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
  choose(4,'ratio','ratioObjects');document.querySelector('[data-ratio-preset=objects]').click();
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
  choose(5,'ratio','ratioParts');document.querySelector('[data-view=wholePart]').click();
  const wholePart={view:state.values.ratioParts.view,headline:document.querySelector('.challenge-text').textContent};
  choose(6,'proportion','ratioQuantity');document.querySelector('[data-known-mode=knownTotal]').click();const ratioQtyUnit=document.querySelector('#ratioQtyUnit');ratioQtyUnit.value='5';ratioQtyUnit.dispatchEvent(new Event('input',{bubbles:true}));
  const ratioQuantity={mode:state.values.ratioQuantity.knownMode,unit:state.values.ratioQuantity.unit,a:document.querySelector('#quantityAResult').textContent,b:document.querySelector('#quantityBResult').textContent,total:document.querySelector('#quantityTotalResult').textContent};
  document.querySelector('#teacherButton').click();const quantityFields=[...document.querySelectorAll('[data-teacher-key]')];quantityFields[0].value='3';quantityFields[1].value='4';quantityFields[2].value='6';document.querySelector('#useTeacherSettings').click();const quantityTeacher={a:state.values.ratioQuantity.a,b:state.values.ratioQuantity.b,unit:state.values.ratioQuantity.unit,open:document.querySelector('#teacherDialog').open};
  choose(4,'coordinate','coordinatePlot');document.querySelector('#teacherButton').click();
  const fields=[...document.querySelectorAll('[data-teacher-key]')];fields[0].value='9';fields[1].value='1';document.querySelector('#useTeacherSettings').click();
  const teacher={point:{...state.values.coordinatePlot.P},open:document.querySelector('#teacherDialog').open};
  document.querySelector('#resetToolButton').click();
  const reset={...state.values.coordinatePlot.P};
  return {coordinate,ratio,proportion,mapDuring,wholePart,ratioQuantity,quantityTeacher,teacher,reset,lang:document.documentElement.lang,overflow:document.documentElement.scrollWidth-window.innerWidth};
})()`);
if(interaction.coordinate.during.x!==5||interaction.coordinate.during.y!==9)throw new Error("Coordinate drag did not follow pointer: "+JSON.stringify(interaction.coordinate));
if(interaction.ratio.a!==9||interaction.ratio.tokens!==9)throw new Error("Ratio control failed: "+JSON.stringify(interaction.ratio));
if(interaction.proportion.factor!==6||!interaction.proportion.unknown)throw new Error("Proportion control failed.");
if(!Number.isInteger(interaction.mapDuring.x)||!Number.isInteger(interaction.mapDuring.y))throw new Error("Map drag failed.");
if(interaction.wholePart.view!=="wholePart"||!interaction.wholePart.headline.includes("总数"))throw new Error("Whole-to-part switch failed: "+JSON.stringify(interaction.wholePart));
if(interaction.ratioQuantity.mode!=="knownTotal"||interaction.ratioQuantity.unit!==5||interaction.ratioQuantity.a!=="10"||interaction.ratioQuantity.b!=="15"||interaction.ratioQuantity.total!=="25")throw new Error("Ratio-quantity interaction failed: "+JSON.stringify(interaction.ratioQuantity));
if(interaction.quantityTeacher.open||interaction.quantityTeacher.a!==3||interaction.quantityTeacher.b!==4||interaction.quantityTeacher.unit!==6)throw new Error("Ratio-quantity teacher settings failed: "+JSON.stringify(interaction.quantityTeacher));
if(interaction.teacher.open||interaction.teacher.point.x!==9||interaction.teacher.point.y!==1)throw new Error("Teacher settings failed: "+JSON.stringify(interaction.teacher));
if(interaction.reset.x!==4||interaction.reset.y!==6)throw new Error("Reset failed: "+JSON.stringify(interaction.reset));
if(interaction.lang!=="zh-CN"||interaction.overflow>1)throw new Error("Global interaction failed: "+JSON.stringify(interaction));
if(runtimeErrors.length)throw new Error("Runtime errors: "+runtimeErrors.join("\n"));
console.log(JSON.stringify({initial,covered:[...new Set(covered)],interaction},null,2));
socket.close();

