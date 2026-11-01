const audio = document.getElementById("audioPlayer");
const loader = document.getElementById("preloader");
const backToTopBtn = document.getElementById("backtotopbutton");
const bgVideo = document.querySelector(".global-video-bg");

// Global video background autoplay assurance (handles battery saver & mobile policies)
if (bgVideo) {
  bgVideo.muted = true;
  const ensureVideoPlaying = () => {
    const playPromise = bgVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const startOnInteraction = () => {
          bgVideo.play();
          window.removeEventListener("touchstart", startOnInteraction);
          window.removeEventListener("click", startOnInteraction);
          window.removeEventListener("scroll", startOnInteraction);
        };
        window.addEventListener("touchstart", startOnInteraction, { passive: true });
        window.addEventListener("click", startOnInteraction, { passive: true });
        window.addEventListener("scroll", startOnInteraction, { passive: true });
      });
    }
  };
  ensureVideoPlaying();
}

// Settings toggles (sound & appearance)
function settingtoggle() {
  document.getElementById("setting-container").classList.toggle("settingactivate");
  document.getElementById("visualmodetogglebuttoncontainer").classList.toggle("visualmodeshow");
  document.getElementById("soundtogglebuttoncontainer").classList.toggle("soundmodeshow");
}

function playpause() {
  const soundSwitch = document.getElementById("switchforsound");
  if (!audio) return;
  if (soundSwitch && soundSwitch.checked) {
    audio.play().catch(() => {
      // Audio playback blocked by browser policy
    });
  } else {
    audio.pause();
  }
}

function visualmode() {
  document.body.classList.toggle("light-mode");
  document.querySelectorAll(".needtobeinvert").forEach((el) => {
    el.classList.toggle("invertapplied");
  });
}

// Preloader completion
window.addEventListener("load", () => {
  if (loader) loader.style.display = "none";
  const hey = document.querySelector(".hey");
  if (hey) hey.classList.add("popup");
});

// Mobile menu toggling
function hamburgerMenu() {
  document.body.classList.toggle("stopscrolling");
  document.getElementById("mobiletogglemenu").classList.toggle("show-toggle-menu");
  document.getElementById("burger-bar1").classList.toggle("hamburger-animation1");
  document.getElementById("burger-bar2").classList.toggle("hamburger-animation2");
  document.getElementById("burger-bar3").classList.toggle("hamburger-animation3");
}

function hidemenubyli() {
  document.body.classList.remove("stopscrolling");
  document.getElementById("mobiletogglemenu").classList.remove("show-toggle-menu");
  document.getElementById("burger-bar1").classList.remove("hamburger-animation1");
  document.getElementById("burger-bar2").classList.remove("hamburger-animation2");
  document.getElementById("burger-bar3").classList.remove("hamburger-animation3");
}

// Navigation scroll tracking & Back-to-Top Button
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".navbar .navbar-tabs .navbar-tabs-ul li");
const mobilenavLi = document.querySelectorAll(".mobiletogglemenu .mobile-navbar-tabs-ul li");

function updateScrollState() {
  const currentScrollY = window.scrollY || window.pageYOffset;
  let currentSectionId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (currentScrollY >= sectionTop - 220) {
      currentSectionId = section.getAttribute("id");
    }
  });

  mobilenavLi.forEach((li) => {
    li.classList.remove("activeThismobiletab");
    if (currentSectionId && li.classList.contains(currentSectionId)) {
      li.classList.add("activeThismobiletab");
    }
  });

  navLi.forEach((li) => {
    li.classList.remove("activeThistab");
    if (currentSectionId && li.classList.contains(currentSectionId)) {
      li.classList.add("activeThistab");
    }
  });

  // Back to top button visibility
  if (backToTopBtn) {
    if (currentScrollY > 400) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  }
}

window.addEventListener("scroll", updateScrollState, { passive: true });

function scrolltoTopfunction() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

console.log(
  "%c Designed and Developed by Krishna Narayan Singh ",
  "background-image: linear-gradient(90deg,#8000ff,#6bc5f8); color: white; font-weight:900; font-size:1rem; padding:12px; border-radius:6px;"
);

/* ==========================================================================
   Interactive ASCII Globe Animation (FIG 06)
   ========================================================================== */
(function initHeroGlobe() {
  const cv = document.getElementById("globe");
  if (!cv) return;

  const FACE = '"Fira Code", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';
  const INK_DARK = "226,228,233";
  const INK_LIGHT = "35,32,48";
  const SOFT = 0.88;

  const INK64_DARK = [];
  const INK64_LIGHT = [];
  for (let q0 = 0; q0 < 64; q0++) {
    const alpha = ((q0 / 63) * SOFT).toFixed(4);
    INK64_DARK.push(`rgba(${INK_DARK},${alpha})`);
    INK64_LIGHT.push(`rgba(${INK_LIGHT},${alpha})`);
  }

  function ink(a) {
    const isLight = document.body.classList.contains("light-mode");
    const arr = isLight ? INK64_LIGHT : INK64_DARK;
    const idx = a <= 0 ? 0 : a >= 1 ? 63 : (a * 63) | 0;
    return arr[idx];
  }

  function Surface(el) {
    this.el = el;
    this.ctx = el.getContext("2d");
    this.w = 0;
    this.h = 0;
    this.dpr = 1;
    this.resize();
  }

  Surface.prototype.resize = function () {
    const r = this.el.getBoundingClientRect();
    if (!r.width || !r.height) return false;
    const dpr = Math.min(1.5, window.devicePixelRatio || 1);
    const w = Math.round(r.width * dpr);
    const h = Math.round(r.height * dpr);
    if (w === this.el.width && h === this.el.height && this.w === r.width) return false;
    this.el.width = w;
    this.el.height = h;
    this.w = r.width;
    this.h = r.height;
    this.dpr = dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return true;
  };

  Object.defineProperty(Surface.prototype, "u", {
    get: function () {
      return this.w < this.h ? this.w : this.h;
    },
  });

  Surface.prototype.base = function () {
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  };

  const QA = (Math.PI * 2) / 64;
  function qang(a) {
    return Math.round(a / QA) * QA;
  }

  function local(canvas, e) {
    const r = canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  const LAND_B64 = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPcBAOD/HwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACA//+P//f/LwgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4/v/4/////wcAAAAEAPABAAAAfAAAAAAAAAAAAAAAAAAAAADg9w/4/////wEAAP4AAAAAAAAA+AAAAAAAAAAAAAAAAAAAAIAG+Of//////wAAAHwGAAAAAAAAAAMAAAAAAAAAAAAAAACABwAc/4P//////wAAADAAAAAAQAAAAD4AAAAAAAAAAAAAAAAAfMbDcQAA/v///wAAAAAAAADABwAA//8HAMAPAAAAAAAAAABgAAAAAAAA/P///wAAAAAAAABwAADg//8AAAAAAAAAAAAAAADwG457dwcA8P//HwAAAAAAAAAYAAD///9/eAAAAAAAAAAAAAD4/g0H/w8A8P//PwAAAAAAAAAOgOv/////fwD/AAAAAAA/AAAA/B84/v8A8P//LwAAAAD4AAAA4PP//////////wAAAOD///H/+D/3cPgDoP//DwAAAID/BwAAx/v/////////P4AA/P///////////////////////w8AAOcBAAgAAAAAAAAAAAAAgP///////////////////////wcAACYAAAQAAAAAAAAAAAAAgf///////////////////////wMM8AAAAAAAAAAAAAAAAAAAIID/////////e+wPwH8AgA8AAP/5z/////////////////8/ANH///////9/AIALgD8AAAAAwH/+//////////////////9/APj///////8fADwAAD8AAAAA8D/+//////////////////sPAPC/+f////8fAPwAADgAAAAA8D/+////////////////D/wBAMCfAP////8PAPwYAAAAAAAA8H/4//////////////9/DgcAAAAcAOD///8/APw/AAAAAAAQAB7w//////////////8BgAMAAAACAMD/////Afh/AAAAAAA4gBz+/////////////38A4AMAAMAAAMD/////B/z/AAAAAABwwAb+/////////////x8A8AEAAAAAAAD/////P///AwAAAADmgOH//////////////z8A4AAAAAAAAAD+////P/7/BwAAAAD28P////////////////8D4AAAAAAAAAD8////f/7/BwAAAADz+f////////////////8HIAAAAAAAAAD6////////BAAAAABw/v////////////////8EAAAAAAAAAADo//////8jHgAAAACA//////////////////8MAAAAAAAAAADQ//////8OPgAAAADw//////////////////8AAAAAAAAAAADg//////+PIAAAAADA////v////////////38EAAAAAAAAAADg////////AAAAAACA//v/zD/8/////////z8AAAAAAAAAAADg//////8bAAAAAACA//N/gD///////////x8GAAAAAAAAAADw//////8AAAAAAAD+B8c/AD/+/////////wcPAAAAAAAAAADg//////8AAAAAAAD+gx4/DH74/////////wABAAAAAAAAAADg/////x8AAAAAAAD+gbCn///8////////fQABAAAAAAAAAADg/////w8AAAAAAAD/gCDn///4//////9/MgADAAAAAAAAAADA/////w8AAAAAAAD+AADm/3/4//////8/cIABAAAAAAAAAADA/////wcAAAAAAAA44AHC///5////////4+ABAAAAAAAAAACA/////wcAAAAAAACI/wEA4P//////////4OgAAAAAAAAAAAAA/////wMAAAAAAAD4/wAA4P//////////ADYAAAAAAAAAAAAA/P///wEAAAAAAAD+/wEA8P//////////AQcAAAAAAAAAAAAA+P//fwAAAAAAAAD//w8P8P//////////AQEAAAAAAAAAAAAAyP//fwAAAAAAAAD//3//////////////AQAAAAAAAAAAAAAA0P+PYQAAAAAAAAD//////z//////////AwAAAAAAAAAAAAAAoP8HwAAAAAAAAMD/////83/+////////AQAAAAAAAAAAAAAAIP8DwAAAAAAAAOD/////5//I////////AAAAAAAAAAAAAAAAQP4DgAAAAAAAAPD/////z/+A////////AAAAAAAAAAAAAAAAAPwDAAIAAAAAAPD/////z/8ZwP////9/AQAAAAAAAAAAAAAAAPgDQAAAAAAAAPj/////j/9/gP////8fAQAAAAAAAAAAAAAAAPADEAMAAAAAAPz/////v///AP9//P8DAAAAAAAAAAAAAAAAAPADAwwAAAAAAPj/////P/9/APw//B8AAAAAAAAAAAAIAAAAAPCHA8AAAAAAAPj/////P/4/APwP+J8BAAAAAAAAAAAAAAAAAMD/A0YEAAAAAPj/////f/4fAPwH+B8AAwAAAAAAAAAAAAAAAAD/AQAAAAAAAPj/////f/wHAPgD8D8AAwAAAAAAAAAAAAAAAADgHwAAAAAAAPj///////wDAPgAwH8AAQAAAAAAAAAAAAAAAADAHwAAAAAAAPz//////30AAPAAwH8AAAAAAAAAAAAAAAAAAAAAHAAAAAAAAPj//////wsAAPAAgH4AAQAAAAAAAAAAAAAAAAAAGEAAAAAAAPj//////wMBAPAAgHwAAAAAAAAAAAAAAAAAAAAAGPAhAAAAAPD///////cBAOAAgDiABAAAAAAAAAAAAAAAAAAAIPl/AAAAAOD///////8AAGABABBAFAAAAAAAAAAAAAAAAAAAgP7/AQAAAMD///////8AAAABgAAAHAAAAAAAAAAAAAAAAAAAAPz/AQAAAID///////8AAAABAAEgCAAAAAAAAAAAAAAAAAAAAPz/HwAAAAD/8P///38AAAAAAANgAAAAAAAAAAAAAAAAAAAAAPz/fwAAAAAAoP///z8AAAAAYAd4AAAAAAAAAAAAAAAAAAAAAPz/fwAAAAAAAP///x8AAAAAwAY8AAAAAAAAAAAAAAAAAAAAAP7//wAAAAAAAP///w8AAAAAgAc+AAAAAAAAAAAAAAAAAAAAAP///wAAAAAAAP///wcAAAAAgIM/TwAAAAAAAAAAAAAAAAAAAP///wEAAAAAgP///wMAAAAAAIc/QAQAAAAAAAAAAAAAAAAAgP///w8AAAAAgP///wEAAAAAAA6fAUQAAAAAAAAAAAAAAAAAAP////8AAAAAAP///wAAAAAAAB6ewuwDAgAAAAAAAAAAAAAAgP////8DAAAAAP7//wAAAAAAABwAAvAPAgAAAAAAAAAAAAAAgP////8PAAAAAPz/fwAAAAAAABAAAMCfAQAAAAAAAAAAAAAAAP////8PAAAAAPz//wAAAAAAAOADAIA/MAAAAAAAAAAAAAAAAP7///8PAAAAAPz/fwAAAAAAAAAPAMBngAAAAAAAAAAAAAAAAP7///8PAAAAAPz//wAAAAAAAAAACABAAAAAAAAAAAAAAAAAAPz///8HAAAAAPj//wAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAPz///8DAAAAAPj//wAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAPj///8BAAAAAPz//4AAAAAAAAAAAB8GAAAAAAAAAAAAAAAAAPj///8BAAAAAPz//8EAAAAAAAAAIB8OAAAAAAAAAAAAAAAAAPD///8BAAAAAP7//+AAAAAAAAAA+B8OACAAAAAAAAAAAAAAAMD///8BAAAAAP7/f/gAAAAAAAAA/H8eAAAAAAAAAAAAAAAAAID///8AAAAAAP7/H/gAAAAAAAAA/P8fAABAAAAAAAAAAAAAAAD///8AAAAAAPz/D3AAAAAAAAAA/v8/AAAAAAAAAAAAAAAAAAD///8AAAAAAPj/D3gAAAAAAADA//9/AAgAAAAAAAAAAAAAAAD//38AAAAAAPj/DzgAAAAAAADw////AAAAAAAAAAAAAAAAAAD//x8AAAAAAPD/DzgAAAAAAAD4////AQAAAAAAAAAAAAAAAAD//wMAAAAAAPD/DzgAAAAAAAD4////AwAAAAAAAAAAAAAAAID//wEAAAAAAPD/AwAAAAAAAAD4////AwAAAAAAAAAAAAAAAID//wEAAAAAAPD/AwAAAAAAAAD4////BwAAAAAAAAAAAAAAAID//wEAAAAAAOD/AwAAAAAAAAD4////BwAAAAAAAAAAAAAAAID//wAAAAAAAOD/AQAAAAAAAADw////BwAAAAAAAAAAAAAAAID//wAAAAAAAMD/AAAAAAAAAADw////AwAAAAAAAAAAAAAAAID/fwAAAAAAAIB/AAAAAAAAAADgf/z/AwAAAAAAAAAAAAAAAID/PwAAAAAAAIA/AAAAAAAAAADgB/D/AQAAAAAAAAAAAAAAAMD/HQAAAAAAAIABAAAAAAAAAADwAND/AQAAAAAAAAAAAAAAAMD/AwAAAAAAAAAAAAAAAAAAAAAAAID/AAAIAAAAAAAAAAAAAMD/BwAAAAAAAAAAAAAAAAAAAAAAAAD/AAAQAAAAAAAAAAAAAOD/AwAAAAAAAAAAAAAAAAAAAAAAAAA+AABwAAAAAAAAAAAAAOA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAOA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAOAPAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAGAAAAAAAAAAAAAMAPAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAADAAAAAAAAAAAAAPAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMABAAAAAAAAAAAAAPADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOABAAAAAAAAAAAAAPAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPADAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAPABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPCBAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAA+AABAAJ8//j8PAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAPD/fwD///////8/AAAAAAAAAAAAAAAAAIA+AAAAAAAAAAAAPP///8D/////////HwAAAAAAAAAAAAAAAIA9AAAAAAAA8Pz/////P/j//////////wMAAAAAAAAAAMAAAPB9AAAAAID/////////P/7///////////8BAAAAAAAAAOABAwB/AAAAAPD///////////////////////8AAAAAAFACPoD///9/AAAAAPD//////////////////////x8AAAAA+P////////8HAAAAAP///////////////////////wcAAAAA/v///////wMAAAAA/v///////////////////////wcAAAD8/////////w8AAA7w/////////////////////////w8AAMAB/////////wMAgB84/////////////////////////wEAAAAA/P///////3/w4AcA/////////////////////////wAAAADg//////////8/gM///////////////////////////wMAAADg/////////////f///////////////////////////z8A7wMA/v////////////////////////////////////////8/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

  const s = new Surface(cv);
  const MW = 288;
  const MH = 144;
  let land;
  (function () {
    const bin = atob(LAND_B64);
    land = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) land[i] = bin.charCodeAt(i);
  })();

  function isLand(lon, lat) {
    const gx = Math.floor(((lon + 180) / 360) * MW);
    const gy = Math.floor(((90 - lat) / 180) * MH);
    if (gx < 0 || gx >= MW || gy < 0 || gy >= MH) return false;
    const b = gy * MW + gx;
    return (land[b >> 3] >> (b & 7)) & 1;
  }

  const PHRASE = "everypointonthisballisapathbacktoanotherone";
  const nodes = [];
  (function () {
    const LAT_STEP = 3.05;
    let k = 0;
    let run = 0;
    let sea3 = 0;
    for (let lat = -86; lat <= 86; lat += LAT_STEP) {
      const rl = Math.cos((lat * Math.PI) / 180);
      const n = Math.max(1, Math.round(98 * rl));
      for (let i = 0; i < n; i++) {
        const lon = -180 + (360 * i) / n;
        const l = isLand(lon, lat);
        if (!l && sea3++ % 2) continue;
        let letter = 0;
        if (l && run++ % 2 === 0) letter = PHRASE.charAt(k++ % PHRASE.length);
        nodes.push({
          lat: (lat * Math.PI) / 180,
          lon: (lon * Math.PI) / 180,
          land: l,
          c: letter,
        });
      }
    }
  })();

  let spin = 2.1;
  let vel = 0.16;
  let hover = false;
  let drag = null;
  let tilt = -0.36;
  let vtilt = 0;
  const land8 = [];
  let zoom = 1;
  let zoomT = 1;
  const pins = [];
  let look = null;
  const sea = [];
  const soil = [];

  cv.addEventListener("pointerenter", function () {
    hover = true;
  });
  cv.addEventListener("pointerleave", function () {
    hover = false;
    look = null;
  });
  cv.addEventListener("pointerdown", function (e) {
    drag = local(cv, e);
    drag.moved = false;
    cv.setPointerCapture(e.pointerId);
  });
  cv.addEventListener("pointermove", function (e) {
    const p = local(cv, e);
    look = p;
    if (!drag) return;
    vel = ((p.x - drag.x) / s.u) * 9;
    vtilt = -((p.y - drag.y) / s.u) * 6;
    tilt = Math.max(-1.15, Math.min(1.15, tilt + vtilt * 0.016));
    drag = p;
    drag.moved = true;
  });
  function release() {
    if (drag && !drag.moved) {
      const g = unproject(drag.x, drag.y);
      if (g) {
        pins.push({ lat: g.lat, lon: g.lon, t: performance.now() });
        if (pins.length > 7) pins.shift();
      }
    }
    drag = null;
  }
  cv.addEventListener("pointerup", release);
  cv.addEventListener("pointercancel", function () {
    drag = null;
  });
  cv.addEventListener(
    "wheel",
    function (e) {
      e.preventDefault();
      zoomT = Math.max(0.85, Math.min(2.6, zoomT * Math.exp(-e.deltaY * 0.0016)));
    },
    { passive: false }
  );

  const view = { cx: 0, cy: 0, R: 1, cs: 1, sn: 0, ct: 1, st: 0 };
  function unproject(px, py) {
    const x1 = (px - view.cx) / view.R;
    const y2 = (view.cy - py) / view.R;
    const q = 1 - x1 * x1 - y2 * y2;
    if (q <= 0.002) return null;
    const z2 = Math.sqrt(q);
    const y0 = y2 * view.ct + z2 * view.st;
    const z1 = -y2 * view.st + z2 * view.ct;
    const x0 = x1 * view.cs + z1 * view.sn;
    const z0 = -x1 * view.sn + z1 * view.cs;
    return {
      lat: Math.asin(Math.max(-1, Math.min(1, y0))),
      lon: Math.atan2(z0, x0),
    };
  }

  function draw(now, dt) {
    const ctx = s.ctx;
    ctx.clearRect(0, 0, s.w, s.h);

    zoom += (zoomT - zoom) * Math.min(1, dt / 180);
    if (!drag) {
      const idle = hover ? 0.045 : 0.16;
      vel += (idle - vel) * Math.min(1, dt / 900);
      vtilt *= Math.pow(0.9, dt / 16);
      tilt += (vtilt * dt) / 1000;
      tilt += (-0.36 - tilt) * Math.min(1, dt / 4000);
    }
    spin += (vel * dt) / 1000;

    const cx = s.w / 2;
    const cy = s.h / 2 + s.u * 0.035;
    const R = s.u * 0.318 * zoom;
    const fs = s.u * 0.0275 * Math.pow(zoom, 0.72);
    const cs = Math.cos(spin);
    const sn = Math.sin(spin);
    const ct = Math.cos(tilt);
    const st = Math.sin(tilt);
    view.cx = cx;
    view.cy = cy;
    view.R = R;
    view.cs = cs;
    view.sn = sn;
    view.ct = ct;
    view.st = st;

    let lx = -1e9;
    let ly = -1e9;
    const lr = s.u * 0.2;
    const lr2 = lr * lr;
    if (look && !drag) {
      lx = look.x;
      ly = look.y;
    }

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    sea.length = 0;
    soil.length = 0;
    for (let i = 0; i < nodes.length; i++) {
      const nd = nodes[i];
      const cl = Math.cos(nd.lat);
      const x0 = cl * Math.cos(nd.lon);
      const y0 = Math.sin(nd.lat);
      const z0 = cl * Math.sin(nd.lon);
      const x1 = x0 * cs - z0 * sn;
      const z1 = x0 * sn + z0 * cs;
      const y2 = y0 * ct - z1 * st;
      const z2 = y0 * st + z1 * ct;
      if (z2 <= 0.02) continue;

      const px = cx + x1 * R;
      const py = cy - y2 * R;
      const dx = px - lx;
      const dy = py - ly;
      const glow = dx * dx + dy * dy < lr2 ? 1 - Math.sqrt(dx * dx + dy * dy) / lr : 0;
      if (!nd.land) {
        sea.push(px, py, Math.min(0.999, z2 + glow * 0.55));
        continue;
      }
      if (!nd.c) {
        soil.push(px, py, Math.min(0.999, z2 + glow * 0.55));
        continue;
      }

      const tx0 = -Math.sin(nd.lon);
      const tz0 = Math.cos(nd.lon);
      const tx1 = tx0 * cs - tz0 * sn;
      const tz1 = tx0 * sn + tz0 * cs;
      const ang = qang(Math.atan2(tz1 * st, tx1));
      const b = Math.min(7, Math.max(0, (Math.min(0.999, z2 + glow * 0.6) * 7.99) | 0));
      (land8[b] || (land8[b] = [])).push(px, py, ang, nd.c, 0);
    }

    const dmin = Math.max(0.7, s.u * 0.0029);
    function dots(list, base, gain, grow) {
      for (let lvl = 0; lvl < 6; lvl++) {
        const z = (lvl + 0.5) / 6;
        const dsz = dmin * grow * (0.55 + 0.75 * z);
        ctx.fillStyle = ink(base + gain * z);
        ctx.beginPath();
        for (let q = 0; q < list.length; q += 3) {
          const lv = list[q + 2] >= 1 ? 5 : (list[q + 2] * 6) | 0;
          if (lv !== lvl) continue;
          ctx.rect(list[q] - dsz / 2, list[q + 1] - dsz / 2, dsz, dsz);
        }
        ctx.fill();
      }
    }
    dots(sea, 0.1, 0.22, 1.0);
    dots(soil, 0.34, 0.46, 1.7);

    for (let bi = 0; bi < 8; bi++) {
      const arr = land8[bi];
      if (!arr || !arr.length) continue;
      const zb = (bi + 0.5) / 8;
      ctx.font = "bold " + (fs * (0.42 + 0.58 * zb)).toFixed(2) + "px " + FACE;
      ctx.fillStyle = ink(0.28 + 0.72 * Math.pow(zb, 0.6));
      for (let t = 0; t < arr.length; t += 5) {
        ctx.save();
        ctx.translate(arr[t], arr[t + 1]);
        ctx.rotate(arr[t + 2]);
        ctx.fillText(arr[t + 3], 0, 0);
        ctx.restore();
      }
      arr.length = 0;
    }

    for (let pi = 0; pi < pins.length; pi++) {
      const pn = pins[pi];
      const pcl = Math.cos(pn.lat);
      const ax = pcl * Math.cos(pn.lon);
      const ay = Math.sin(pn.lat);
      const az = pcl * Math.sin(pn.lon);
      const bx1 = ax * cs - az * sn;
      const bz1 = ax * sn + az * cs;
      const by2 = ay * ct - bz1 * st;
      const bz2 = ay * st + bz1 * ct;
      if (bz2 <= 0.02) continue;
      const ppx = cx + bx1 * R;
      const ppy = cy - by2 * R;
      const age = (now - pn.t) / 1000;
      const pop = Math.min(1, age / 0.22);
      const rr2 = s.u * 0.016 * (0.4 + 0.6 * pop) * (0.55 + 0.45 * bz2);
      ctx.beginPath();
      ctx.arc(ppx, ppy, rr2, 0, Math.PI * 2);
      ctx.strokeStyle = ink(0.3 + 0.55 * bz2);
      ctx.lineWidth = Math.max(0.7, s.u * 0.0022);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(ppx, ppy, Math.max(0.7, rr2 * 0.22), 0, Math.PI * 2);
      ctx.fillStyle = ink(0.45 + 0.55 * bz2);
      ctx.fill();
      if (age < 0.9) {
        const w2 = 1 - age / 0.9;
        ctx.beginPath();
        ctx.arc(ppx, ppy, rr2 + (1 - w2) * s.u * 0.05, 0, Math.PI * 2);
        ctx.strokeStyle = ink(0.55 * w2 * w2);
        ctx.lineWidth = Math.max(0.6, s.u * 0.0016);
        ctx.stroke();
      }
    }
  }

  let prev = performance.now();
  let visible = true;
  function checkVisible() {
    const vh = window.innerHeight;
    const r = cv.getBoundingClientRect();
    visible = r.bottom > -80 && r.top < vh + 80;
  }
  function frame(now) {
    const dt = Math.min(64, now - prev);
    prev = now;
    if (s.w && visible) {
      s.base();
      draw(now, dt);
    }
    requestAnimationFrame(frame);
  }
  window.addEventListener("scroll", checkVisible, { passive: true });
  requestAnimationFrame(frame);

  function onResize() {
    s.resize();
    checkVisible();
  }
  window.addEventListener("resize", onResize);
  if (window.ResizeObserver && cv.parentElement) {
    new ResizeObserver(onResize).observe(cv.parentElement);
  }
  onResize();
})();
