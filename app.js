const ml = (ms, zh, en) => ({ ms, zh, en });
const t = (value) => typeof value === "string" ? value : value?.[state.lang] ?? value?.ms ?? "";

const I18N = {
  title: ml("Jom Teroka Koordinat & Nisbah!", "一起来探索坐标与比！", "Let's Explore Coordinates & Ratios!"),
  subtitle: ml("Alat manipulatif berpandukan buku teks SK & SJKC Tahun 4–6.", "配合 SK 与 SJKC 四至六年级课本的操作工具。", "A hands-on tool aligned to SK & SJKC Year 4–6 textbooks."),
  soundOn: ml("Bunyi: Buka", "声音：开", "Sound: On"),
  soundOff: ml("Bunyi: Tutup", "声音：关", "Sound: Off"),
  tabCoordinate: ml("Koordinat", "坐标", "Coordinates"),
  tabRatio: ml("Nisbah", "比", "Ratio"),
  tabProportion: ml("Kadaran & Skala", "比例与比例尺", "Proportion & Scale"),
  chooseActivity: ml("Pilih alat", "选择工具", "Choose a tool"),
  grade: ml("Tahun", "年级", "Year"),
  activity: ml("Alat", "工具", "Tool"),
  tryIt: ml("Mari cuba!", "动手试试！", "Try it!"),
  teacherMode: ml("Tetapan guru", "老师设置", "Teacher settings"),
  resetTool: ml("Tetapkan semula alat", "重置工具", "Reset tool"),
  customSettings: ml("Tetapkan nilai demonstrasi", "设置示范数值", "Set demonstration values"),
  customHelp: ml("Tetapkan nilai permulaan untuk demonstrasi kelas.", "为课堂示范设置初始数值。", "Set starting values for a class demonstration."),
  cancel: ml("Batal", "取消", "Cancel"),
  useSettings: ml("Gunakan tetapan", "使用设置", "Use settings"),
  howTo: ml("Cara guna", "怎样使用", "How to use"),
  stepObserve: ml("Perhatikan kedudukan", "仔细观察", "Observe positions"),
  stepMove: ml("Gerakkan & bina", "移动与构建", "Move & build"),
  stepExplain: ml("Terangkan hubungan", "说明关系", "Explain relationships"),
  newExample: ml("Contoh baharu", "随机新示例", "New example"),
  horizontal: ml("Mengufuk", "横向", "Horizontal"),
  vertical: ml("Mencancang", "直向", "Vertical"),
  total: ml("Jumlah", "总数", "Total"),
  simplest: ml("Bentuk termudah", "最简比", "Simplest form"),
  scale: ml("Skala", "比例尺", "Scale"),
  mapDistance: ml("Jarak peta", "图上距离", "Map distance"),
  actualDistance: ml("Jarak sebenar", "实际距离", "Actual distance"),
  first: ml("Kumpulan A", "A 组", "Group A"),
  second: ml("Kumpulan B", "B 组", "Group B"),
  items: ml("Bilangan", "数量", "Items"),
  cost: ml("Harga", "价钱", "Cost")
};

const MODES = {
  coordinate: { label: I18N.tabCoordinate },
  ratio: { label: I18N.tabRatio },
  proportion: { label: I18N.tabProportion }
};

const ACTIVITIES = {
  coordinatePlot: {
    label: ml("Plot & baca koordinat", "标示与读取坐标", "Plot & read coordinates"),
    scope: ml("Tahun 4 · Paksi-x, paksi-y dan asalan O", "四年级 · 横轴、纵轴与原点 O", "Year 4 · x-axis, y-axis and origin O"),
    tip: ml("Koordinat dibaca mengikut urutan (x, y): gerak mengufuk dahulu, kemudian mencancang.", "坐标按 (x, y) 读取：先横向，再直向。", "Read coordinates in the order (x, y): horizontal first, then vertical."),
    guides: [ml("Klik mana-mana persilangan grid.", "点击任意网格交点。", "Click any grid intersection."), ml("Seret titik P tepat mengikut tetikus.", "拖动 P 点；圆点会跟着鼠标。", "Drag point P; it follows the pointer."), ml("Baca x dahulu, kemudian y.", "先读 x，再读 y。", "Read x first, then y.")]
  },
  coordinateDistance: {
    label: ml("Jarak dua titik", "两点之间的距离", "Distance between two points"),
    scope: ml("Tahun 5 · Jarak mengufuk dan mencancang", "五年级 · 横向与直向距离", "Year 5 · Horizontal and vertical distance"),
    tip: ml("Seret A atau B. Garis hijau menunjukkan beza x; garis merah menunjukkan beza y.", "拖动 A 或 B。绿线表示 x 的差，红线表示 y 的差。", "Drag A or B. Green shows the x difference; red shows the y difference."),
    guides: [ml("Seret titik A atau B.", "拖动 A 或 B。", "Drag A or B."), ml("Kira petak secara mengufuk.", "数横向格子。", "Count horizontal squares."), ml("Kira petak secara mencancang.", "数直向格子。", "Count vertical squares.")]
  },
  coordinateRoute: {
    label: ml("Laluan koordinat", "坐标路线", "Coordinate route"),
    scope: ml("Tahun 5 · Laluan antara tiga lokasi", "五年级 · 三个地点之间的路线", "Year 5 · Route between three locations"),
    tip: ml("Seret A, B dan C. Laluan ungu mengikut grid, bukan garis serong.", "拖动 A、B 和 C。紫色路线沿着网格走，不走斜线。", "Drag A, B and C. The purple route follows the grid, not a diagonal."),
    guides: [ml("Susun tiga lokasi.", "安排三个地点。", "Position three places."), ml("Ikut laluan A → B → C.", "沿 A → B → C 行走。", "Follow A → B → C."), ml("Tambah semua jarak grid.", "把所有网格距离相加。", "Add all grid distances.")]
  },
  scaledCoordinates: {
    label: ml("Koordinat berskala", "有比例尺的坐标图", "Scaled coordinate map"),
    scope: ml("Tahun 6 · Jarak sebenar pada grid berskala", "六年级 · 比例网格上的实际距离", "Year 6 · Actual distance on a scaled grid"),
    tip: ml("Setiap petak mewakili jarak sebenar yang sama. Ini bukan ukuran pembaris.", "每一格代表相同的实际距离；这里不是尺子测量。", "Every square represents the same actual distance. This is not ruler measurement."),
    guides: [ml("Seret dua lokasi.", "拖动两个地点。", "Drag two locations."), ml("Kira beza grid x dan y.", "计算 x 与 y 的格数差。", "Count the x and y grid differences."), ml("Darab dengan skala setiap petak.", "乘以每格所代表的距离。", "Multiply by the scale per square.")]
  },
  ratioObjects: {
    label: ml("Pembina nisbah objek", "物品比建构器", "Object ratio builder"),
    scope: ml("Tahun 4 · Nisbah dua kuantiti dalam unit sama", "四年级 · 两个同单位数量的比", "Year 4 · Ratio of two quantities in the same unit"),
    tip: ml("Klik ruang bulat atau seret bar. Susunan A : B mesti dikekalkan.", "点击圆位或拖动滑杆。A : B 的次序必须保持。", "Click a circle slot or drag a bar. Keep the order A : B."),
    guides: [ml("Bina Kumpulan A.", "建立 A 组。", "Build Group A."), ml("Bina Kumpulan B.", "建立 B 组。", "Build Group B."), ml("Baca A : B mengikut urutan.", "按次序读 A : B。", "Read A : B in order.")]
  },
  ratioParts: {
    label: ml("Bahagian kepada bahagian / keseluruhan", "部分比部分／整体", "Part-to-part / whole"),
    scope: ml("Tahun 5 · Bezakan dua jenis perbandingan", "五年级 · 分辨两种比较方式", "Year 5 · Distinguish two comparisons"),
    tip: ml("A : B membandingkan dua bahagian. A : jumlah membandingkan satu bahagian dengan keseluruhan.", "A : B 比较两个部分；A : 总数比较一个部分与整体。", "A : B compares two parts; A : total compares one part with the whole."),
    guides: [ml("Ubah bilangan A dan B.", "改变 A 与 B 的数量。", "Change A and B."), ml("Pilih jenis perbandingan.", "选择比较类型。", "Choose a comparison."), ml("Lihat jumlah apabila perlu.", "需要时观察总数。", "Use the total when needed.")]
  },
  ratioSimplify: {
    label: ml("Nisbah bentuk termudah", "最简比实验室", "Simplest ratio lab"),
    scope: ml("Tahun 6 · Nisbah setara dan bentuk termudah", "六年级 · 相等的比与最简比", "Year 6 · Equivalent ratios and simplest form"),
    tip: ml("Setiap bingkai ialah satu kumpulan setara. Bahagi kedua-dua nombor dengan faktor yang sama.", "每个框是一组相等组合。两个数必须除以同一个因数。", "Each frame is one equal group. Divide both numbers by the same factor."),
    guides: [ml("Pilih dua kuantiti.", "选择两个数量。", "Choose two quantities."), ml("Cari faktor sepunya terbesar.", "找最大公因数。", "Find the greatest common factor."), ml("Bahagi kedua-duanya serentak.", "两个数同时相除。", "Divide both together.")]
  },
  unitRate: {
    label: ml("Kadaran seunit", "单一量比例", "Unit-rate proportion"),
    scope: ml("Tahun 4 · Cari nilai seunit dahulu", "四年级 · 先求一个单位的值", "Year 4 · Find one unit first"),
    tip: ml("Harga setiap satu kekal sama. Bilangan dan jumlah harga berubah bersama.", "每一个的价钱保持不变；数量与总价一起变化。", "The price per item stays constant; quantity and total cost change together."),
    guides: [ml("Tetapkan harga seunit.", "设置单价。", "Set the unit price."), ml("Ubah bilangan barang.", "改变物品数量。", "Change the number of items."), ml("Darab bilangan × harga seunit.", "数量 × 单价。", "Multiply items × unit price.")]
  },
  proportionUnknown: {
    label: ml("Kuantiti tidak diketahui", "未知数量比例板", "Unknown quantity board"),
    scope: ml("Tahun 5 · Cari nilai melalui kadaran", "五年级 · 运用比例求未知数", "Year 5 · Find an unknown through proportion"),
    tip: ml("Kedua-dua bar dibesarkan dengan faktor yang sama.", "两条数线都必须乘以相同的倍数。", "Both number lines are enlarged by the same factor."),
    guides: [ml("Baca pasangan pertama.", "读取第一组对应数。", "Read the first pair."), ml("Cari faktor pendarab.", "找出倍数。", "Find the multiplier."), ml("Gunakan faktor yang sama pada pasangan kedua.", "在第二组使用相同倍数。", "Use the same factor on the second pair.")]
  },
  mapScale: {
    label: ml("Makmal skala peta", "地图比例尺实验室", "Map scale lab"),
    scope: ml("Tahun 6 · Skala peta dan jarak sebenar", "六年级 · 地图比例尺与实际距离", "Year 6 · Map scale and actual distance"),
    tip: ml("Seret kedua-dua pin. Satu petak peta ialah 1 cm; skala menukarkannya kepada km sebenar.", "拖动两个图钉。地图一格是 1 cm，比例尺把它换成实际 km。", "Drag both pins. One map square is 1 cm; the scale converts it to real kilometres."),
    guides: [ml("Seret pin A dan B.", "拖动图钉 A 与 B。", "Drag pins A and B."), ml("Kira jarak peta sepanjang grid.", "沿网格计算图上距离。", "Count map distance along the grid."), ml("Darab dengan nilai skala.", "乘以比例尺数值。", "Multiply by the scale value.")]
  }
};

const PLAN = {
  4: { coordinate: ["coordinatePlot"], ratio: ["ratioObjects"], proportion: ["unitRate"] },
  5: { coordinate: ["coordinateDistance", "coordinateRoute"], ratio: ["ratioParts"], proportion: ["proportionUnknown"] },
  6: { coordinate: ["scaledCoordinates"], ratio: ["ratioSimplify"], proportion: ["mapScale"] }
};

const defaults = () => ({
  coordinatePlot: { P: { x: 4, y: 6 } },
  coordinateDistance: { A: { x: 2, y: 3 }, B: { x: 8, y: 7 } },
  coordinateRoute: { A: { x: 1, y: 2 }, B: { x: 7, y: 3 }, C: { x: 8, y: 8 } },
  scaledCoordinates: { A: { x: 2, y: 3 }, B: { x: 8, y: 7 }, scale: 2 },
  ratioObjects: { a: 3, b: 5, view: "partPart" },
  ratioParts: { a: 4, b: 6, view: "partPart" },
  ratioSimplify: { a: 12, b: 18, view: "partPart" },
  unitRate: { unitCost: 3, quantity: 4 },
  proportionUnknown: { a: 3, b: 5, multiplier: 4 },
  mapScale: { A: { x: 2, y: 2 }, B: { x: 8, y: 5 }, scale: 2 }
});

let state = {
  lang: localStorage.getItem("scr-lang") || "ms",
  sound: localStorage.getItem("scr-sound") !== "off",
  grade: 4,
  mode: "coordinate",
  activity: "coordinatePlot",
  values: defaults()
};

const els = {
  grade: document.querySelector("#gradeSelect"), activity: document.querySelector("#activitySelect"),
  sideTitle: document.querySelector("#sideTitle"), scope: document.querySelector("#scopeNote"), tip: document.querySelector("#tipBox span:last-child"),
  activityTitle: document.querySelector("#activityTitle"), badge: document.querySelector("#gradeBadge"),
  challenge: document.querySelector("#challengePanel"), guide: document.querySelector("#toolGuide"), stage: document.querySelector("#visualStage"),
  controls: document.querySelector("#controlArea"), summary: document.querySelector("#liveSummary"),
  sound: document.querySelector("#soundToggle"), dialog: document.querySelector("#teacherDialog"), fields: document.querySelector("#teacherFields"),
  error: document.querySelector("#teacherError")
};

let audioContext;
let lastSoundAt = 0;
function playClick(frequency = 520) {
  if (!state.sound) return;
  const now = performance.now();
  if (now - lastSoundAt < 35) return;
  lastSoundAt = now;
  try {
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(.045, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + .07);
    osc.connect(gain).connect(audioContext.destination);
    osc.start(); osc.stop(audioContext.currentTime + .07);
  } catch (_) { /* Sound is optional. */ }
}

function setI18n() {
  document.documentElement.lang = state.lang === "zh" ? "zh-CN" : state.lang;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (I18N[key]) node.textContent = t(I18N[key]);
  });
  document.querySelectorAll("[data-lang]").forEach((button) => button.classList.toggle("active", button.dataset.lang === state.lang));
  els.sound.querySelector("span:last-child").textContent = t(state.sound ? I18N.soundOn : I18N.soundOff);
  els.sound.querySelector("span:first-child").textContent = state.sound ? "🔊" : "🔇";
  els.sound.setAttribute("aria-pressed", String(state.sound));
  [...els.grade.options].forEach((option) => option.textContent = state.lang === "zh" ? `${option.value}年级` : state.lang === "en" ? `Year ${option.value}` : `Tahun ${option.value}`);
}

function selectFirstActivity() {
  const choices = PLAN[state.grade][state.mode];
  state.activity = choices[0];
}

function renderApp() {
  setI18n();
  els.grade.value = String(state.grade);
  document.querySelectorAll("[data-mode]").forEach((button) => button.classList.toggle("active", button.dataset.mode === state.mode));
  els.sideTitle.textContent = t(MODES[state.mode].label);
  const choices = PLAN[state.grade][state.mode];
  if (!choices.includes(state.activity)) state.activity = choices[0];
  els.activity.innerHTML = choices.map((id) => `<option value="${id}">${t(ACTIVITIES[id].label)}</option>`).join("");
  els.activity.value = state.activity;
  const meta = ACTIVITIES[state.activity];
  els.scope.textContent = t(meta.scope);
  els.tip.textContent = t(meta.tip);
  els.activityTitle.textContent = t(meta.label);
  els.badge.textContent = state.lang === "zh" ? `${state.grade}年级` : state.lang === "en" ? `Y${state.grade}` : `T${state.grade}`;
  renderGuide(meta.guides);
  renderActivity();
}

function renderGuide(steps) {
  els.guide.innerHTML = `<div class="tool-guide-title">👋 ${t(I18N.howTo)}</div><div class="tool-guide-steps">${steps.map((step, i) => `<div class="tool-guide-step"><b>${i + 1}</b><span>${t(step)}</span></div>`).join("")}</div>`;
}

function renderActivity() {
  if (["coordinatePlot", "coordinateDistance", "coordinateRoute", "scaledCoordinates"].includes(state.activity)) renderCoordinate();
  else if (["ratioObjects", "ratioParts", "ratioSimplify"].includes(state.activity)) renderRatio();
  else if (state.activity === "mapScale") renderMapScale();
  else renderProportion();
}

const grid = { ox: 70, oy: 330, step: 27, max: 10 };
const sx = (x) => grid.ox + x * grid.step;
const sy = (y) => grid.oy - y * grid.step;

function gridLines() {
  let lines = "";
  for (let i = 0; i <= grid.max; i++) {
    lines += `<line class="grid-line" x1="${sx(i)}" y1="${sy(0)}" x2="${sx(i)}" y2="${sy(10)}"/><line class="grid-line" x1="${sx(0)}" y1="${sy(i)}" x2="${sx(10)}" y2="${sy(i)}"/>`;
    if (i > 0) lines += `<text class="axis-label" x="${sx(i)}" y="352" text-anchor="middle">${i}</text><text class="axis-label" x="52" y="${sy(i) + 5}" text-anchor="middle">${i}</text>`;
  }
  return `${lines}<line class="axis-line" x1="${sx(0)}" y1="${sy(0)}" x2="${sx(10) + 22}" y2="${sy(0)}"/><line class="axis-line" x1="${sx(0)}" y1="${sy(0)}" x2="${sx(0)}" y2="${sy(10) - 18}"/><path d="M${sx(10)+22} ${sy(0)} l-10 -6 v12z" fill="#61451f"/><path d="M${sx(0)} ${sy(10)-18} l-6 10 h12z" fill="#61451f"/><text class="axis-label" x="${sx(10)+32}" y="${sy(0)+5}">x</text><text class="axis-label" x="${sx(0)-3}" y="${sy(10)-24}">y</text><text class="axis-label" x="${sx(0)}" y="352" text-anchor="middle">O</text>`;
}

function pointSvg(name, point) {
  const className = name === "P" ? "point-p" : `point-${name.toLowerCase()}`;
  return `<g data-point-group="${name}"><circle class="point-handle ${className}" data-point="${name}" cx="${sx(point.x)}" cy="${sy(point.y)}" r="13"/><text class="point-label" data-point-label="${name}" x="${sx(point.x) + 18}" y="${sy(point.y) - 8}">${name}</text><text class="point-coordinate" data-point-coordinate="${name}" x="${sx(point.x) + 18}" y="${sy(point.y) + 12}">(${point.x}, ${point.y})</text></g>`;
}

function renderCoordinate() {
  const id = state.activity;
  const data = state.values[id];
  const names = id === "coordinatePlot" ? ["P"] : id === "coordinateRoute" ? ["A", "B", "C"] : ["A", "B"];
  const extra = id === "coordinatePlot" ? "" : `<path id="routePath" class="${id === "coordinateRoute" ? "route-line" : "route-guide"}" d=""/><line id="distanceX" class="distance-x"/><line id="distanceY" class="distance-y"/>`;
  const readouts = id === "coordinatePlot"
    ? `<div class="readout-card x"><span>x</span><strong id="readX">${data.P.x}</strong></div><div class="readout-card y"><span>y</span><strong id="readY">${data.P.y}</strong></div><div class="readout-card"><span>P</span><strong id="readPair">(${data.P.x}, ${data.P.y})</strong></div>`
    : `<div class="readout-card x"><span>${t(I18N.horizontal)}</span><strong id="readDx">0</strong></div><div class="readout-card y"><span>${t(I18N.vertical)}</span><strong id="readDy">0</strong></div><div class="readout-card"><span>${id === "coordinateRoute" ? t(I18N.total) : id === "scaledCoordinates" ? t(I18N.actualDistance) : t(I18N.total)}</span><strong id="readTotal">0</strong></div>`;
  els.stage.innerHTML = `<div class="coordinate-wrap"><svg id="coordinateSvg" class="coordinate-board" viewBox="0 0 430 380" role="img" aria-label="Coordinate grid">${gridLines()}${extra}${names.map((name) => pointSvg(name, data[name])).join("")}</svg><div class="coordinate-readouts">${readouts}</div></div>`;
  const scaleControl = id === "scaledCoordinates" ? rangeControl("coordScale", t(I18N.scale), data.scale, 1, 10, state.lang === "zh" ? "km/格" : "km/grid") : "";
  els.controls.innerHTML = `${scaleControl}<div class="action-row"><button id="newExampleButton" class="primary-button" type="button">🎲 ${t(I18N.newExample)}</button></div>`;
  attachCoordinateHandlers();
  if (id === "scaledCoordinates") document.querySelector("#coordScale").addEventListener("input", (e) => { data.scale = +e.target.value; document.querySelector("#coordScaleOut").textContent = `${data.scale} ${state.lang === "zh" ? "km/格" : "km/grid"}`; updateCoordinateDom(); });
  document.querySelector("#newExampleButton").addEventListener("click", randomizeCurrent);
  updateCoordinateDom();
}

function coordinatePath(points) {
  const segment = (a, b) => `L ${sx(b.x)} ${sy(a.y)} L ${sx(b.x)} ${sy(b.y)}`;
  let d = `M ${sx(points[0].x)} ${sy(points[0].y)}`;
  for (let i = 1; i < points.length; i++) d += ` ${segment(points[i - 1], points[i])}`;
  return d;
}

function updateCoordinateDom() {
  const id = state.activity;
  const data = state.values[id];
  const names = id === "coordinatePlot" ? ["P"] : id === "coordinateRoute" ? ["A", "B", "C"] : ["A", "B"];
  names.forEach((name) => {
    const p = data[name];
    const circle = document.querySelector(`[data-point="${name}"]`);
    const label = document.querySelector(`[data-point-label="${name}"]`);
    const coord = document.querySelector(`[data-point-coordinate="${name}"]`);
    if (!circle) return;
    circle.setAttribute("cx", sx(p.x)); circle.setAttribute("cy", sy(p.y));
    label.setAttribute("x", sx(p.x) + 18); label.setAttribute("y", sy(p.y) - 8);
    coord.setAttribute("x", sx(p.x) + 18); coord.setAttribute("y", sy(p.y) + 12); coord.textContent = `(${p.x}, ${p.y})`;
  });
  if (id === "coordinatePlot") {
    document.querySelector("#readX").textContent = data.P.x;
    document.querySelector("#readY").textContent = data.P.y;
    document.querySelector("#readPair").textContent = `(${data.P.x}, ${data.P.y})`;
    els.challenge.innerHTML = challenge(t(ml(`Koordinat P ialah (${data.P.x}, ${data.P.y})`, `P 点的坐标是 (${data.P.x}, ${data.P.y})`, `Point P is at (${data.P.x}, ${data.P.y})`)), t(ml("Gerak mengufuk dahulu, kemudian mencancang.", "先横向移动，再直向移动。", "Move horizontally first, then vertically.")));
    els.summary.textContent = t(ml(`x = ${data.P.x}, y = ${data.P.y} → P(${data.P.x}, ${data.P.y})`, `x = ${data.P.x}，y = ${data.P.y} → P(${data.P.x}, ${data.P.y})`, `x = ${data.P.x}, y = ${data.P.y} → P(${data.P.x}, ${data.P.y})`));
    return;
  }
  const points = names.map((name) => data[name]);
  document.querySelector("#routePath").setAttribute("d", coordinatePath(points));
  const a = points[0], b = points[1];
  const dx = Math.abs(b.x - a.x), dy = Math.abs(b.y - a.y);
  const xLine = document.querySelector("#distanceX"), yLine = document.querySelector("#distanceY");
  xLine.setAttribute("x1", sx(a.x)); xLine.setAttribute("y1", sy(a.y)); xLine.setAttribute("x2", sx(b.x)); xLine.setAttribute("y2", sy(a.y));
  yLine.setAttribute("x1", sx(b.x)); yLine.setAttribute("y1", sy(a.y)); yLine.setAttribute("x2", sx(b.x)); yLine.setAttribute("y2", sy(b.y));
  let horizontal = dx, vertical = dy;
  if (id === "coordinateRoute") {
    horizontal += Math.abs(data.C.x - b.x);
    vertical += Math.abs(data.C.y - b.y);
  }
  const total = horizontal + vertical;
  const scale = id === "scaledCoordinates" ? data.scale : 1;
  document.querySelector("#readDx").textContent = id === "scaledCoordinates" ? `${horizontal * scale} km` : `${horizontal} ${t(ml("unit", "单位", "units"))}`;
  document.querySelector("#readDy").textContent = id === "scaledCoordinates" ? `${vertical * scale} km` : `${vertical} ${t(ml("unit", "单位", "units"))}`;
  document.querySelector("#readTotal").textContent = id === "scaledCoordinates" ? `${total * scale} km` : `${total} ${t(ml("unit", "单位", "units"))}`;
  if (id === "coordinateRoute") {
    els.challenge.innerHTML = challenge(t(ml(`Laluan A → B → C = ${total} unit`, `路线 A → B → C = ${total} 个单位`, `Route A → B → C = ${total} units`)), t(ml("Setiap segmen bergerak sepanjang grid.", "每一段都沿着网格移动。", "Every segment moves along the grid.")));
    els.summary.textContent = t(ml(`Jumlah laluan grid = ${total} unit`, `网格路线总长 = ${total} 个单位`, `Total grid route = ${total} units`));
  } else if (id === "scaledCoordinates") {
    els.challenge.innerHTML = challenge(t(ml(`1 petak = ${scale} km · jarak sebenar ${total * scale} km`, `1 格 = ${scale} km · 实际距离 ${total * scale} km`, `1 square = ${scale} km · actual distance ${total * scale} km`)), t(ml(`${total} petak × ${scale} km`, `${total} 格 × ${scale} km`, `${total} squares × ${scale} km`)));
    els.summary.textContent = `${total} × ${scale} km = ${total * scale} km`;
  } else {
    els.challenge.innerHTML = challenge(t(ml(`Beza mengufuk ${dx}, beza mencancang ${dy}`, `横向相差 ${dx}，直向相差 ${dy}`, `Horizontal difference ${dx}, vertical difference ${dy}`)), t(ml("Kedua-dua jarak dibaca pada grid yang sama.", "两个距离都在同一个网格上读取。", "Both distances are read on the same grid.")));
    els.summary.textContent = t(ml(`|${b.x} − ${a.x}| = ${dx}; |${b.y} − ${a.y}| = ${dy}`, `|${b.x} − ${a.x}| = ${dx}；|${b.y} − ${a.y}| = ${dy}`, `|${b.x} − ${a.x}| = ${dx}; |${b.y} − ${a.y}| = ${dy}`));
  }
}

function attachCoordinateHandlers() {
  const svg = document.querySelector("#coordinateSvg");
  let drag = null;
  const toGrid = (event) => {
    const rect = svg.getBoundingClientRect();
    const x = (event.clientX - rect.left) * 430 / rect.width;
    const y = (event.clientY - rect.top) * 380 / rect.height;
    return { x: Math.max(0, Math.min(10, Math.round((x - grid.ox) / grid.step))), y: Math.max(0, Math.min(10, Math.round((grid.oy - y) / grid.step))) };
  };
  svg.addEventListener("pointerdown", (event) => {
    const target = event.target.closest("[data-point]");
    if (target) drag = { name: target.dataset.point, id: event.pointerId };
    else if (state.activity === "coordinatePlot") drag = { name: "P", id: event.pointerId };
    if (!drag) return;
    event.preventDefault();
    try { svg.setPointerCapture?.(event.pointerId); } catch (_) { /* Synthetic pointer events may not be capturable. */ }
    state.values[state.activity][drag.name] = toGrid(event);
    updateCoordinateDom();
  });
  svg.addEventListener("pointermove", (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    event.preventDefault();
    state.values[state.activity][drag.name] = toGrid(event);
    updateCoordinateDom();
  });
  const end = (event) => { if (drag?.id === event.pointerId) { drag = null; playClick(630); } };
  svg.addEventListener("pointerup", end); svg.addEventListener("pointercancel", end);
}

function renderRatio() {
  const id = state.activity;
  const data = state.values[id];
  const groupA = tokenGroup("a", "A", "#20a889", data.a);
  const groupB = tokenGroup("b", "B", "#8062c6", data.b);
  const groups = id === "ratioSimplify" ? `<div id="ratioGroups" class="ratio-groups"></div>` : "";
  els.stage.innerHTML = `<div class="stage-stack"><div class="ratio-board">${groupA}<div class="ratio-symbol">:</div>${groupB}</div><div id="ratioBar" class="ratio-bar"><div class="bar-a"></div><div class="bar-b"></div></div>${groups}</div>`;
  const compare = id === "ratioParts" ? `<div class="choice-row"><button class="choice-chip ${data.view === "partPart" ? "active" : ""}" data-view="partPart" type="button">A : B</button><button class="choice-chip ${data.view === "partWhole" ? "active" : ""}" data-view="partWhole" type="button">A : ${t(I18N.total)}</button></div>` : "";
  els.controls.innerHTML = `${compare}<div class="range-grid">${rangeControl("ratioA", t(I18N.first), data.a, 1, 24, "")}${rangeControl("ratioB", t(I18N.second), data.b, 1, 24, "")}</div><div class="action-row"><button id="newExampleButton" class="primary-button" type="button">🎲 ${t(I18N.newExample)}</button></div>`;
  document.querySelectorAll("[data-token-side]").forEach((token) => token.addEventListener("click", () => { data[token.dataset.tokenSide] = +token.dataset.value; syncRatioControls(); updateRatioDom(); }));
  document.querySelector("#ratioA").addEventListener("input", (e) => { data.a = +e.target.value; syncRatioControls(); updateRatioDom(); });
  document.querySelector("#ratioB").addEventListener("input", (e) => { data.b = +e.target.value; syncRatioControls(); updateRatioDom(); });
  document.querySelectorAll("[data-view]").forEach((button) => button.addEventListener("click", () => { data.view = button.dataset.view; renderRatio(); }));
  document.querySelector("#newExampleButton").addEventListener("click", randomizeCurrent);
  updateRatioDom();
}

function tokenGroup(side, name, color, value) {
  return `<div class="token-group"><div class="token-title"><span>${name}</span><strong id="tokenCount${side.toUpperCase()}">${value}</strong></div><div id="tokens${side.toUpperCase()}" class="token-grid">${tokens(side, color, value)}</div></div>`;
}
function tokens(side, color, value) {
  const max = Math.max(12, value);
  return Array.from({ length: max }, (_, i) => `<button type="button" class="token ${i < Math.min(value,max) ? "" : "empty"}" style="--token:${color}" data-token-side="${side}" data-value="${i + 1}" aria-label="${side.toUpperCase()} ${i + 1}">${i < Math.min(value,max) ? i + 1 : "+"}</button>`).join("");
}
function syncRatioControls() {
  const data = state.values[state.activity];
  const a = document.querySelector("#ratioA"), b = document.querySelector("#ratioB");
  if (a) { a.value = data.a; document.querySelector("#ratioAOut").textContent = data.a; }
  if (b) { b.value = data.b; document.querySelector("#ratioBOut").textContent = data.b; }
}
function updateRatioDom() {
  const id = state.activity, data = state.values[id];
  document.querySelector("#tokenCountA").textContent = data.a;
  document.querySelector("#tokenCountB").textContent = data.b;
  document.querySelector("#tokensA").innerHTML = tokens("a", "#20a889", data.a);
  document.querySelector("#tokensB").innerHTML = tokens("b", "#8062c6", data.b);
  document.querySelectorAll("[data-token-side]").forEach((token) => token.addEventListener("click", () => { data[token.dataset.tokenSide] = +token.dataset.value; syncRatioControls(); updateRatioDom(); }));
  const left = document.querySelector("#ratioBar .bar-a"), right = document.querySelector("#ratioBar .bar-b");
  const rightValue = data.view === "partWhole" ? data.a + data.b : data.b;
  left.style.flex = data.a; right.style.flex = data.view === "partWhole" ? data.b : data.b;
  left.textContent = `A = ${data.a}`; right.textContent = `B = ${data.b}`;
  const divisor = gcd(data.a, data.b), sa = data.a / divisor, sb = data.b / divisor;
  if (id === "ratioSimplify") {
    const groups = document.querySelector("#ratioGroups");
    groups.innerHTML = Array.from({ length: divisor }, () => `<div class="ratio-group">${Array.from({ length: sa }, () => '<span class="mini-token"></span>').join("")}${Array.from({ length: sb }, () => '<span class="mini-token b"></span>').join("")}</div>`).join("");
    els.challenge.innerHTML = challenge(`${data.a} : ${data.b} = ${sa} : ${sb}`, t(ml(`Bahagi kedua-dua nombor dengan ${divisor}.`, `两个数同时除以 ${divisor}。`, `Divide both numbers by ${divisor}.`)));
    els.summary.textContent = t(ml(`FSTB = ${divisor} → nisbah termudah ${sa} : ${sb}`, `最大公因数 = ${divisor} → 最简比 ${sa} : ${sb}`, `GCF = ${divisor} → simplest ratio ${sa} : ${sb}`));
  } else if (id === "ratioParts") {
    const shownRight = data.view === "partWhole" ? data.a + data.b : data.b;
    const label = data.view === "partWhole" ? `A : ${t(I18N.total)}` : "A : B";
    els.challenge.innerHTML = challenge(`${label} = ${data.a} : ${shownRight}`, data.view === "partWhole" ? t(ml(`${data.a} bahagian A daripada ${data.a + data.b} objek.`, `${data.a} 个 A，占全部 ${data.a + data.b} 个物品。`, `${data.a} A items out of ${data.a + data.b} objects.`)) : t(ml("Bandingkan dua bahagian sahaja.", "只比较两个部分。", "Compare the two parts only.")));
    els.summary.textContent = data.view === "partWhole" ? `${data.a} : (${data.a} + ${data.b}) = ${data.a} : ${data.a + data.b}` : `A : B = ${data.a} : ${data.b}`;
  } else {
    els.challenge.innerHTML = challenge(`A : B = ${data.a} : ${data.b}`, t(ml("Nisbah dibaca mengikut urutan kumpulan.", "比必须按照组别次序读取。", "Read the ratio in group order.")));
    els.summary.textContent = t(ml(`${data.a} objek hijau kepada ${data.b} objek ungu`, `${data.a} 个绿色物品比 ${data.b} 个紫色物品`, `${data.a} green objects to ${data.b} purple objects`));
  }
}

function renderProportion() {
  const id = state.activity, data = state.values[id];
  if (id === "unitRate") {
    els.stage.innerHTML = `<div class="proportion-board"><div class="double-line"><div class="number-line"><div class="number-line-label">${t(I18N.items)}</div><div id="itemLine" class="number-track"></div></div><div class="number-line"><div class="number-line-label">${t(I18N.cost)} (RM)</div><div id="costLine" class="number-track"></div></div></div><div class="metric-row"><div class="metric"><span>${t(ml("Harga seunit", "单价", "Unit price"))}</span><strong id="unitValue"></strong></div><div class="metric active"><span>${t(I18N.items)}</span><strong id="quantityValue"></strong></div><div class="metric"><span>${t(I18N.cost)}</span><strong id="costValue"></strong></div></div></div>`;
    els.controls.innerHTML = `<div class="range-grid">${rangeControl("unitCost", t(ml("Harga seunit", "单价", "Unit price")), data.unitCost, 1, 20, "RM")}${rangeControl("quantity", t(I18N.items), data.quantity, 1, 10, "")}</div><div class="action-row"><button id="newExampleButton" class="primary-button" type="button">🎲 ${t(I18N.newExample)}</button></div>`;
    bindSimpleRange("unitCost", "unitCost", updateProportionDom);
    bindSimpleRange("quantity", "quantity", updateProportionDom);
  } else {
    els.stage.innerHTML = `<div class="proportion-board"><div class="double-line"><div class="number-line"><div class="number-line-label">A</div><div id="firstLine" class="number-track"></div></div><div class="number-line"><div class="number-line-label">B</div><div id="secondLine" class="number-track"></div></div></div><div class="metric-row"><div class="metric"><span>${t(ml("Pasangan pertama", "第一组", "First pair"))}</span><strong id="basePair"></strong></div><div class="metric"><span>${t(ml("Faktor", "倍数", "Multiplier"))}</span><strong id="factorValue"></strong></div><div class="metric active"><span>${t(ml("Nilai tidak diketahui", "未知数", "Unknown value"))}</span><strong id="unknownValue"></strong></div></div></div>`;
    els.controls.innerHTML = `<div class="range-grid">${rangeControl("propA", "A", data.a, 1, 10, "")}${rangeControl("propB", "B", data.b, 1, 10, "")}${rangeControl("multiplier", t(ml("Faktor", "倍数", "Multiplier")), data.multiplier, 2, 10, "×")}</div><div class="action-row"><button id="newExampleButton" class="primary-button" type="button">🎲 ${t(I18N.newExample)}</button></div>`;
    bindSimpleRange("propA", "a", updateProportionDom);
    bindSimpleRange("propB", "b", updateProportionDom);
    bindSimpleRange("multiplier", "multiplier", updateProportionDom);
  }
  document.querySelector("#newExampleButton").addEventListener("click", randomizeCurrent);
  updateProportionDom();
}

function tickMarkup(values, max) {
  return values.map((value, i) => `<i class="tick ${i === 0 ? "first-tick" : i === values.length - 1 ? "last-tick" : ""}" style="left:${(i / (values.length - 1 || 1)) * 100}%"><span>${value}</span></i>`).join("");
}
function updateProportionDom() {
  const id = state.activity, data = state.values[id];
  if (id === "unitRate") {
    const cost = data.unitCost * data.quantity;
    document.querySelector("#itemLine").innerHTML = tickMarkup([0, 1, data.quantity], data.quantity);
    document.querySelector("#costLine").innerHTML = tickMarkup([0, data.unitCost, cost], cost);
    document.querySelector("#unitValue").textContent = `RM ${data.unitCost}`;
    document.querySelector("#quantityValue").textContent = data.quantity;
    document.querySelector("#costValue").textContent = `RM ${cost}`;
    els.challenge.innerHTML = challenge(`${data.quantity} × RM ${data.unitCost} = RM ${cost}`, t(ml(`1 barang berharga RM ${data.unitCost}.`, `1 件物品的价钱是 RM ${data.unitCost}。`, `1 item costs RM ${data.unitCost}.`)));
    els.summary.textContent = t(ml(`Harga seunit kekal RM ${data.unitCost}.`, `每件单价保持 RM ${data.unitCost}。`, `The unit price stays RM ${data.unitCost}.`));
  } else {
    const x = data.a * data.multiplier, y = data.b * data.multiplier;
    document.querySelector("#firstLine").innerHTML = tickMarkup([0, data.a, x], x);
    document.querySelector("#secondLine").innerHTML = tickMarkup([0, data.b, `<span class="unknown-value">? = ${y}</span>`], y);
    document.querySelector("#basePair").textContent = `${data.a} : ${data.b}`;
    document.querySelector("#factorValue").textContent = `× ${data.multiplier}`;
    document.querySelector("#unknownValue").textContent = y;
    els.challenge.innerHTML = challenge(`${data.a} : ${data.b} = ${x} : ${y}`, t(ml(`Kedua-dua nilai didarab dengan ${data.multiplier}.`, `两个数都乘以 ${data.multiplier}。`, `Both values are multiplied by ${data.multiplier}.`)));
    els.summary.textContent = `${data.b} × ${data.multiplier} = ${y}`;
  }
}

function renderMapScale() {
  const data = state.values.mapScale;
  els.stage.innerHTML = `<div class="scale-map"><div id="mapCard" class="map-card"><div id="roadH" class="map-road"></div><div id="roadV" class="map-road"></div><button class="map-place" data-map-point="A" style="--place:#0d806b"><span>A</span></button><button class="map-place" data-map-point="B" style="--place:#8062c6"><span>B</span></button></div><div class="formula-card"><span>${t(I18N.scale)}</span><strong id="scaleText"></strong><span>${t(I18N.mapDistance)}</span><strong id="mapDistanceText"></strong><span>${t(I18N.actualDistance)}</span><strong id="actualDistanceText"></strong></div></div>`;
  els.controls.innerHTML = `${rangeControl("mapScaleValue", t(I18N.scale), data.scale, 1, 10, state.lang === "zh" ? "km/cm" : "km/cm")}<div class="action-row"><button id="newExampleButton" class="primary-button" type="button">🎲 ${t(I18N.newExample)}</button></div>`;
  document.querySelector("#mapScaleValue").addEventListener("input", (e) => { data.scale = +e.target.value; document.querySelector("#mapScaleValueOut").textContent = `${data.scale} km/cm`; updateMapDom(); });
  document.querySelector("#newExampleButton").addEventListener("click", randomizeCurrent);
  attachMapHandlers(); updateMapDom();
}

function mapPosition(p) { return { left: 8 + p.x * 8.4, top: 10 + p.y * 11.4 }; }
function updateMapDom() {
  const data = state.values.mapScale;
  ["A", "B"].forEach((name) => {
    const pos = mapPosition(data[name]);
    const node = document.querySelector(`[data-map-point="${name}"]`);
    node.style.left = `${pos.left}%`; node.style.top = `${pos.top}%`;
  });
  const a = mapPosition(data.A), b = mapPosition(data.B);
  const h = document.querySelector("#roadH"), v = document.querySelector("#roadV");
  h.style.left = `${Math.min(a.left,b.left)}%`; h.style.top = `${a.top}%`; h.style.width = `${Math.abs(b.left-a.left)}%`;
  v.style.left = `${b.left}%`; v.style.top = `${Math.min(a.top,b.top)}%`; v.style.width = `${Math.abs(b.top-a.top)}%`; v.style.transform = "rotate(90deg)";
  const dx = Math.abs(data.B.x-data.A.x), dy = Math.abs(data.B.y-data.A.y), mapDistance = dx + dy, actual = mapDistance * data.scale;
  document.querySelector("#scaleText").textContent = `1 cm : ${data.scale} km`;
  document.querySelector("#mapDistanceText").textContent = `${mapDistance} cm`;
  document.querySelector("#actualDistanceText").textContent = `${actual} km`;
  els.challenge.innerHTML = challenge(`${mapDistance} cm × ${data.scale} km/cm = ${actual} km`, t(ml("Laluan peta bergerak mengufuk dan mencancang.", "地图路线沿横向和直向移动。", "The map route moves horizontally and vertically.")));
  els.summary.textContent = t(ml(`Skala 1 cm mewakili ${data.scale} km jarak sebenar.`, `比例尺：图上 1 cm 表示实际 ${data.scale} km。`, `Scale: 1 cm represents ${data.scale} km in reality.`));
}

function attachMapHandlers() {
  const map = document.querySelector("#mapCard"); let drag = null;
  const pointAt = (event) => { const rect = map.getBoundingClientRect(); return { x: Math.max(0,Math.min(10,Math.round(((event.clientX-rect.left)/rect.width-.08)/.084))), y: Math.max(0,Math.min(7,Math.round(((event.clientY-rect.top)/rect.height-.10)/.114))) }; };
  map.addEventListener("pointerdown", (event) => { const target = event.target.closest("[data-map-point]"); if (!target) return; drag = { name: target.dataset.mapPoint, id: event.pointerId }; event.preventDefault(); try { map.setPointerCapture?.(event.pointerId); } catch (_) { /* Synthetic pointer events may not be capturable. */ } state.values.mapScale[drag.name] = pointAt(event); updateMapDom(); });
  map.addEventListener("pointermove", (event) => { if (!drag || drag.id !== event.pointerId) return; event.preventDefault(); state.values.mapScale[drag.name] = pointAt(event); updateMapDom(); });
  const end = (event) => { if (drag?.id === event.pointerId) { drag = null; playClick(630); } };
  map.addEventListener("pointerup", end); map.addEventListener("pointercancel", end);
}

function rangeControl(id, label, value, min, max, unit) {
  return `<div class="range-control"><label for="${id}">${label}</label><output id="${id}Out">${value}${unit ? ` ${unit}` : ""}</output><input id="${id}" type="range" min="${min}" max="${max}" step="1" value="${value}"></div>`;
}
function bindSimpleRange(id, key, callback) {
  document.querySelector(`#${id}`).addEventListener("input", (event) => { state.values[state.activity][key] = +event.target.value; document.querySelector(`#${id}Out`).textContent = event.target.value; callback(); });
}
function challenge(main, sub) { return `<div><div class="challenge-kicker">${t(I18N.tryIt)}</div><div class="challenge-text">${main}</div><div class="challenge-sub">${sub}</div></div>`; }
function gcd(a, b) { while (b) [a,b] = [b,a%b]; return a; }
function rand(min, max) { return Math.floor(Math.random()*(max-min+1))+min; }

function randomizeCurrent() {
  const id = state.activity, data = state.values[id];
  if (id === "coordinatePlot") data.P = { x: rand(1,9), y: rand(1,9) };
  else if (["coordinateDistance","scaledCoordinates"].includes(id)) { data.A = { x: rand(0,4), y: rand(0,5) }; data.B = { x: rand(6,10), y: rand(5,10) }; }
  else if (id === "coordinateRoute") { data.A = { x: rand(0,3), y: rand(0,3) }; data.B = { x: rand(4,7), y: rand(2,6) }; data.C = { x: rand(7,10), y: rand(6,10) }; }
  else if (["ratioObjects","ratioParts"].includes(id)) { data.a = rand(1,12); data.b = rand(1,12); }
  else if (id === "ratioSimplify") { const factor=rand(2,6); data.a=rand(1,4)*factor; data.b=rand(2,5)*factor; }
  else if (id === "unitRate") { data.unitCost=rand(2,10); data.quantity=rand(2,8); }
  else if (id === "proportionUnknown") { data.a=rand(1,6); data.b=rand(2,8); data.multiplier=rand(2,6); }
  else if (id === "mapScale") { data.A={x:rand(0,3),y:rand(0,3)}; data.B={x:rand(6,10),y:rand(4,7)}; data.scale=rand(1,6); }
  playClick(720); renderActivity();
}

function teacherSchema() {
  const id = state.activity, data = state.values[id];
  if (id === "coordinatePlot") return [{key:"P.x",label:"P · x",value:data.P.x,min:0,max:10},{key:"P.y",label:"P · y",value:data.P.y,min:0,max:10}];
  if (["coordinateDistance","scaledCoordinates"].includes(id)) return [{key:"A.x",label:"A · x",value:data.A.x,min:0,max:10},{key:"A.y",label:"A · y",value:data.A.y,min:0,max:10},{key:"B.x",label:"B · x",value:data.B.x,min:0,max:10},{key:"B.y",label:"B · y",value:data.B.y,min:0,max:10},...(id==="scaledCoordinates"?[{key:"scale",label:t(I18N.scale),value:data.scale,min:1,max:10}]:[])];
  if (id === "coordinateRoute") return ["A","B","C"].flatMap((name)=>[{key:`${name}.x`,label:`${name} · x`,value:data[name].x,min:0,max:10},{key:`${name}.y`,label:`${name} · y`,value:data[name].y,min:0,max:10}]);
  if (["ratioObjects","ratioParts","ratioSimplify"].includes(id)) return [{key:"a",label:t(I18N.first),value:data.a,min:1,max:24},{key:"b",label:t(I18N.second),value:data.b,min:1,max:24}];
  if (id === "unitRate") return [{key:"unitCost",label:t(ml("Harga seunit", "单价", "Unit price")),value:data.unitCost,min:1,max:20},{key:"quantity",label:t(I18N.items),value:data.quantity,min:1,max:10}];
  if (id === "proportionUnknown") return [{key:"a",label:"A",value:data.a,min:1,max:10},{key:"b",label:"B",value:data.b,min:1,max:10},{key:"multiplier",label:t(ml("Faktor", "倍数", "Multiplier")),value:data.multiplier,min:2,max:10}];
  return [{key:"A.x",label:"A · x",value:data.A.x,min:0,max:10},{key:"A.y",label:"A · y",value:data.A.y,min:0,max:7},{key:"B.x",label:"B · x",value:data.B.x,min:0,max:10},{key:"B.y",label:"B · y",value:data.B.y,min:0,max:7},{key:"scale",label:t(I18N.scale),value:data.scale,min:1,max:10}];
}
function openTeacherDialog() {
  els.error.textContent="";
  els.fields.innerHTML=teacherSchema().map((field)=>`<div><label for="teacher-${field.key.replace(".","-")}">${field.label}</label><input id="teacher-${field.key.replace(".","-")}" data-teacher-key="${field.key}" type="number" min="${field.min}" max="${field.max}" step="1" value="${field.value}"></div>`).join("");
  els.dialog.showModal();
}
function applyTeacherSettings() {
  const schema=teacherSchema(), data=state.values[state.activity]; let valid=true;
  document.querySelectorAll("[data-teacher-key]").forEach((input)=>{ const rule=schema.find((item)=>item.key===input.dataset.teacherKey); const value=+input.value; if (!Number.isInteger(value)||value<rule.min||value>rule.max) { valid=false; return; } const path=rule.key.split("."); if(path.length===2)data[path[0]][path[1]]=value; else data[path[0]]=value; });
  if(!valid){els.error.textContent=t(ml("Masukkan nombor bulat dalam julat yang ditunjukkan.","请输入所示范围内的整数。","Enter whole numbers within the shown range."));return;}
  els.dialog.close(); playClick(680); renderActivity();
}

document.querySelectorAll("[data-mode]").forEach((button)=>button.addEventListener("click",()=>{state.mode=button.dataset.mode;selectFirstActivity();playClick();renderApp();}));
document.querySelectorAll("[data-lang]").forEach((button)=>button.addEventListener("click",()=>{state.lang=button.dataset.lang;localStorage.setItem("scr-lang",state.lang);playClick();renderApp();}));
els.grade.addEventListener("change",()=>{state.grade=+els.grade.value;selectFirstActivity();playClick();renderApp();});
els.activity.addEventListener("change",()=>{state.activity=els.activity.value;playClick();renderApp();});
els.sound.addEventListener("click",()=>{state.sound=!state.sound;localStorage.setItem("scr-sound",state.sound?"on":"off");if(state.sound)playClick(620);setI18n();});
document.querySelector("#teacherButton").addEventListener("click",openTeacherDialog);
document.querySelector("#useTeacherSettings").addEventListener("click",applyTeacherSettings);
document.querySelector("#resetToolButton").addEventListener("click",()=>{state.values=defaults();playClick(440);renderActivity();});
document.addEventListener("click", (event) => { if (event.target.closest("button")) playClick(); });

renderApp();
