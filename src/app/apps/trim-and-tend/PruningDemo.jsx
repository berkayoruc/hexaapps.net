"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const THREE_SRC = "/trim-and-tend/three.min.js";
const PROBLEMS = { dead: 2, sick: 1, sprout: 1 };
const TIPS = {
  dead: "Dead branch cleared",
  sick: "Cut before the disease spread",
  sprout: "Water sprout gone, the energy goes to the branches",
};

function loadThree() {
  if (window.THREE) return Promise.resolve(window.THREE);
  if (!window.__threeLoading) {
    window.__threeLoading = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = THREE_SRC;
      s.async = true;
      s.onload = () => resolve(window.THREE);
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  return window.__threeLoading;
}

const rand = (a, b) => a + Math.random() * (b - a);
const pick = (a) => a[Math.floor(Math.random() * a.length)];

function createGame(THREE, host, onUpdate) {
  /* ---------- renderer / scene (same look as the game) ---------- */
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.style.display = "block";
  renderer.domElement.style.touchAction = "none";
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const SKY = 0xefd6c6;
  scene.background = new THREE.Color(SKY);
  scene.fog = new THREE.Fog(SKY, 18, 40);
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 4.2, 10.5);
  camera.lookAt(0, 2.6, 0);

  scene.add(new THREE.HemisphereLight(0xfff0e0, 0x7d8f62, 0.8));
  scene.add(new THREE.AmbientLight(0xffe8d6, 0.15));
  const sun = new THREE.DirectionalLight(0xffd9b0, 0.95);
  sun.position.set(6, 11, 5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, near: 1, far: 30 });
  sun.shadow.bias = -0.0006;
  scene.add(sun);

  const std = (c, e) =>
    new THREE.MeshStandardMaterial({ color: c, roughness: 0.88, metalness: 0, flatShading: true, emissive: e || 0x000000 });
  const M = {
    bark: std(0x80573a), dead: std(0xb9b2a8), sprout: std(0xa8c96a),
    leaf: [std(0x7fb069), std(0x679c57), std(0x93c47d), std(0x8dbb5f)],
    sick: [std(0xc9a14a), std(0xb5793b), std(0xa89a45)],
    hlWood: std(0xffc27a, 0x6b3a10), hlLeaf: std(0xffe2a0, 0x5a4410),
    grass: std(0xd9e58a), soil: std(0xe0955a), stone: std(0xf0d2b0),
  };
  const woodMat = (t) => (t === "dead" ? M.dead : t === "sprout" ? M.sprout : M.bark);
  const woodGeo = new THREE.CylinderGeometry(0.72, 1, 1, 7, 1);
  woodGeo.translate(0, 0.5, 0);
  const leafGeo = new THREE.IcosahedronGeometry(1, 0);

  /* ---------- ground ---------- */
  const ground = new THREE.Mesh(new THREE.CircleGeometry(30, 40), M.grass);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);
  const soil = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.8, 0.04, 20), M.soil);
  soil.position.y = 0.02;
  soil.receiveShadow = true;
  scene.add(soil);
  const tuftGeo = new THREE.ConeGeometry(0.07, 0.18, 3);
  const tuftMat = std(0x8fae4a);
  for (let i = 0; i < 160; i++) {
    const a = rand(0, 6.28), r = rand(2, 11);
    const t = new THREE.Mesh(tuftGeo, tuftMat);
    t.position.set(Math.cos(a) * r, 0.09, Math.sin(a) * r);
    t.rotation.y = rand(0, 3);
    scene.add(t);
  }
  const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.35, 0), M.stone);
  rock.position.set(-2.6, 0.15, 1.4);
  rock.scale.y = 0.6;
  rock.castShadow = true;
  scene.add(rock);

  /* ---------- tree (simplified from the game's tree.js) ---------- */
  const treeRoot = new THREE.Group();
  scene.add(treeRoot);

  function createBranch(parent, o) {
    const g = new THREE.Group();
    g.rotation.order = "YXZ";
    g.position.y = o.atY || 0;
    g.rotation.set(0, o.az || 0, o.tilt || 0);
    g.userData = { isBranch: true, len: o.len, rad: o.rad, depth: o.depth, type: o.type || "healthy", problemRoot: false, wood: null, leaves: null };
    const m = new THREE.Mesh(woodGeo, woodMat(g.userData.type));
    m.scale.set(o.rad, o.len, o.rad);
    m.castShadow = true;
    m.receiveShadow = true;
    m.userData = { branch: g, kind: "wood" };
    g.add(m);
    g.userData.wood = m;
    parent.add(g);
    return g;
  }
  function addLeaves(g, scale = 1) {
    const u = g.userData;
    if (u.leaves) return;
    const c = new THREE.Group();
    c.position.y = u.len;
    const n = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < n; i++) {
      const l = new THREE.Mesh(leafGeo, u.type === "sick" ? pick(M.sick) : pick(M.leaf));
      const s = rand(0.28, 0.46) * scale;
      l.scale.set(s, s * rand(0.8, 1.1), s);
      l.position.set(rand(-0.32, 0.32) * scale, rand(-0.1, 0.3) * scale, rand(-0.32, 0.32) * scale);
      l.rotation.set(rand(0, 3), rand(0, 3), rand(0, 3));
      l.castShadow = true;
      l.userData = { branch: g, kind: "leaf" };
      c.add(l);
    }
    g.add(c);
    u.leaves = c;
  }
  function allBranches() {
    const a = [];
    treeRoot.traverse((o) => o.userData.isBranch && a.push(o));
    return a;
  }
  function growRecursive(g, maxDepth) {
    const u = g.userData;
    if (u.depth >= maxDepth || u.len < 0.35) return addLeaves(g);
    const n = u.depth === 0 ? 4 : Math.random() < 0.5 ? 2 : 3;
    const az0 = rand(0, 6.28);
    for (let i = 0; i < n; i++) {
      const leader = i === 0 && u.depth <= 1;
      const tilt = leader ? rand(0.05, 0.2) : u.depth === 0 ? rand(0.6, 0.9) : rand(0.35, 0.65);
      const atY = leader ? u.len : u.depth === 0 ? u.len * rand(0.55, 0.9) : u.len * rand(0.65, 1);
      const c = createBranch(g, {
        len: u.len * rand(0.68, 0.8), rad: u.rad * rand(0.55, 0.66), depth: u.depth + 1,
        tilt, az: az0 + i * (6.28 / n) + rand(-0.3, 0.3), atY,
      });
      growRecursive(c, maxDepth);
    }
    if (u.depth >= maxDepth - 1) addLeaves(g, 0.85);
  }
  function setSubtreeType(g, type) {
    g.traverse((o) => {
      const u = o.userData;
      if (!u.isBranch) return;
      u.type = type;
      u.wood.material = woodMat(type);
      if (!u.leaves) return;
      if (type === "dead") { o.remove(u.leaves); u.leaves = null; }
      else if (type === "sick") u.leaves.children.forEach((l) => (l.material = pick(M.sick)));
    });
  }
  const subtreeHealthy = (g) => {
    let ok = true;
    g.traverse((o) => { if (o.userData.isBranch && o.userData.type !== "healthy") ok = false; });
    return ok;
  };
  function makeProblem(type) {
    const c = allBranches().filter((b) => {
      const u = b.userData;
      return u.depth >= 2 && u.depth <= 3 && u.type === "healthy" && subtreeHealthy(b);
    });
    if (!c.length) return;
    const g = pick(c);
    setSubtreeType(g, type);
    g.userData.problemRoot = true;
  }
  function addSprout() {
    const hosts = allBranches().filter((b) => b.userData.depth === 1 && b.userData.type === "healthy");
    if (!hosts.length) return;
    const h = pick(hosts);
    treeRoot.updateMatrixWorld(true);
    const hq = new THREE.Quaternion();
    h.getWorldQuaternion(hq);
    const g = createBranch(h, { len: rand(1.0, 1.4), rad: 0.04, depth: h.userData.depth + 1, type: "sprout" });
    const a = rand(0, 6.28), r = h.userData.rad * 0.75;
    g.position.set(Math.cos(a) * r, h.userData.len * rand(0.3, 0.7), Math.sin(a) * r);
    g.quaternion.copy(hq).invert();
    g.userData.problemRoot = true;
    addLeaves(g, 0.55);
  }

  let state;
  const falling = [];
  function build() {
    for (const c of [...treeRoot.children]) treeRoot.remove(c);
    for (const f of falling) scene.remove(f.o);
    falling.length = 0;
    const trunk = createBranch(treeRoot, { len: 2.1, rad: 0.27, depth: 0 });
    growRecursive(trunk, 4);
    for (let i = 0; i < PROBLEMS.dead; i++) makeProblem("dead");
    for (let i = 0; i < PROBLEMS.sick; i++) makeProblem("sick");
    for (let i = 0; i < PROBLEMS.sprout; i++) addSprout();
    let leaves = 0, total = 0;
    treeRoot.traverse((o) => {
      const u = o.userData;
      if (!u.isBranch) return;
      if (u.problemRoot) total++;
      if (u.type === "healthy" && u.leaves) leaves++;
    });
    if (total === 0) return build(); // very rare: no room for a problem branch, grow another tree
    state = { fixed: 0, total, healthyCuts: 0, leaves0: leaves, leavesLost: 0, msg: "Tap the grey, yellow and pale branches", done: false };
    emit();
  }
  const emit = () => onUpdate({ ...state });

  /* ---------- picking / highlight ---------- */
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  function targetAt(cx, cy) {
    const r = renderer.domElement.getBoundingClientRect();
    ndc.set(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(treeRoot.children, true).find((h) => h.object.userData.branch);
    if (!hit) return null;
    let g = hit.object.userData.branch;
    // a click anywhere inside a problem subtree takes the whole problem branch
    for (let p = g; p && p.userData.isBranch; p = p.parent) if (p.userData.problemRoot) return p;
    return g;
  }
  let hover = null;
  const saved = new Map();
  function setHover(g) {
    if (g === hover) return;
    for (const [m, mat] of saved) m.material = mat;
    saved.clear();
    hover = g;
    if (!g || g.userData.depth === 0) return;
    g.traverse((o) => {
      if (!o.isMesh) return;
      saved.set(o, o.material);
      o.material = o.userData.kind === "leaf" ? M.hlLeaf : M.hlWood;
    });
  }

  function cut(g) {
    if (!g || state.done) return;
    if (g.userData.depth === 0) { state.msg = "You can't cut the trunk"; return emit(); }
    setHover(null);
    let lost = 0;
    g.traverse((o) => { if (o.userData.isBranch && o.userData.type === "healthy" && o.userData.leaves) lost++; });
    scene.attach(g);
    falling.push({
      o: g, t: 0,
      v: new THREE.Vector3(rand(-0.8, 0.8), rand(0.4, 1.2), rand(-0.8, 0.8)),
      w: new THREE.Vector3(rand(-1.5, 1.5), rand(-1, 1), rand(-1.5, 1.5)),
    });
    const u = g.userData;
    if (u.problemRoot) {
      state.fixed++;
      state.msg = TIPS[u.type];
    } else {
      state.healthyCuts++;
      state.leavesLost += lost;
      state.msg = `A healthy branch is gone (−${lost} leaf ${lost === 1 ? "cluster" : "clusters"})`;
    }
    if (state.fixed === state.total) {
      state.done = true;
      state.msg = "The tree can breathe again!";
    }
    emit();
  }

  /* ---------- input: drag to turn, tap to cut ---------- */
  const el = renderer.domElement;
  let down = null, idle = true;
  const onDown = (e) => {
    down = { x: e.clientX, y: e.clientY, rot: treeRoot.rotation.y, moved: false };
    idle = false;
    el.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e) => {
    if (down) {
      const dx = e.clientX - down.x;
      if (Math.abs(dx) > 6 || Math.abs(e.clientY - down.y) > 6) down.moved = true;
      if (down.moved) { treeRoot.rotation.y = down.rot + dx * 0.01; setHover(null); }
      return;
    }
    if (e.pointerType === "mouse") {
      const g = targetAt(e.clientX, e.clientY);
      setHover(g);
      el.style.cursor = g && g.userData.depth > 0 ? "pointer" : "grab";
    }
  };
  const onUp = (e) => {
    if (down && !down.moved) cut(targetAt(e.clientX, e.clientY));
    down = null;
  };
  const onLeave = () => setHover(null);
  el.addEventListener("pointerdown", onDown);
  el.addEventListener("pointermove", onMove);
  el.addEventListener("pointerup", onUp);
  el.addEventListener("pointerleave", onLeave);

  /* ---------- size / loop ---------- */
  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    // narrow (phone-shaped) views: step back until the whole crown fits
    const fit = 3.3 / (Math.tan((camera.fov * Math.PI) / 360) * camera.aspect);
    const d = Math.max(10.5, fit);
    camera.position.set(0, 2.6 + d * 0.15, d);
    camera.lookAt(0, 2.5, 0);
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();

  let raf, last = performance.now();
  const tick = (now) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (idle) treeRoot.rotation.y += dt * 0.15;
    for (let i = falling.length - 1; i >= 0; i--) {
      const f = falling[i];
      f.t += dt;
      f.v.y -= 9.8 * dt;
      f.o.position.addScaledVector(f.v, dt);
      f.o.rotation.x += f.w.x * dt;
      f.o.rotation.z += f.w.z * dt;
      if (f.o.position.y < 0.05) { f.o.position.y = 0.05; f.v.set(0, 0, 0); f.w.set(0, 0, 0); }
      if (f.t > 1.6) {
        const s = Math.max(0, 1 - (f.t - 1.6) * 2);
        f.o.scale.setScalar(s);
        if (s === 0) { scene.remove(f.o); falling.splice(i, 1); }
      }
    }
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  };
  build();
  raf = requestAnimationFrame(tick);

  return {
    restart: () => { setHover(null); treeRoot.rotation.y = 0; idle = true; build(); },
    dispose: () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointerleave", onLeave);
      scene.traverse((o) => o.geometry?.dispose());
      Object.values(M).flat().forEach((m) => m.dispose());
      renderer.dispose();
      el.remove();
    },
  };
}

function stars(s) {
  if (s.healthyCuts === 0) return 3;
  return s.leavesLost / Math.max(1, s.leaves0) <= 0.15 ? 2 : 1;
}

export default function PruningDemo({ storeUrl, fallback }) {
  const hostRef = useRef(null);
  const gameRef = useRef(null);
  const [s, setS] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    loadThree()
      .then((THREE) => {
        if (!alive || !hostRef.current) return;
        gameRef.current = createGame(THREE, hostRef.current, (v) => alive && setS(v));
      })
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
      gameRef.current?.dispose();
      gameRef.current = null;
    };
  }, []);

  return (
    <div className="w-full max-w-[380px] xs:w-[340px] shrink-0 self-center xs:self-start">
      <div
        className="relative w-full overflow-hidden rounded-[2.5rem] shadow-xl"
        style={{ background: "#efd6c6", aspectRatio: "9 / 17" }}
      >
        <div ref={hostRef} className="absolute inset-0" />

        {s && (
          <div className="pointer-events-none absolute left-3 right-3 top-3 flex items-start justify-between gap-3">
            <div className="rounded-2xl px-4 py-2 shadow" style={{ background: "#f4efe2", color: "#2f3a24" }}>
              <div className="font-bold">Tree care</div>
              <div className="text-sm">
                {s.fixed}/{s.total} problem branches
                {s.healthyCuts > 0 && ` · ${s.healthyCuts} healthy cut`}
              </div>
            </div>
          </div>
        )}

        {s?.msg && !s.done && (
          <div
            key={s.msg + s.fixed + s.healthyCuts}
            className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 w-max max-w-[88%] text-center rounded-2xl px-4 py-2 text-sm shadow"
            style={{ background: "#f4efe2", color: "#2f3a24" }}
          >
            {s.msg}
          </div>
        )}

        {s?.done && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(239,214,198,.55)" }}>
            <div className="mx-4 rounded-3xl px-6 py-6 text-center shadow-xl" style={{ background: "#f4efe2", color: "#2f3a24" }}>
              <div className="text-4xl tracking-widest" style={{ color: "#d98b3a" }}>
                {"★".repeat(stars(s))}
                <span className="opacity-25">{"★".repeat(3 - stars(s))}</span>
              </div>
              <div className="pt-2 text-2xl font-bold">{s.msg}</div>
              <div className="pt-1 text-sm opacity-80">
                {s.healthyCuts === 0
                  ? "Clean job, not a single healthy branch lost."
                  : `${s.healthyCuts} healthy ${s.healthyCuts === 1 ? "branch" : "branches"} lost along the way.`}
              </div>
              <div className="flex flex-wrap justify-center gap-2 pt-5">
                <button
                  onClick={() => gameRef.current?.restart()}
                  className="rounded-full px-5 py-2 font-semibold text-white"
                  style={{ background: "#4d6b3a" }}
                >
                  New tree
                </button>
                {storeUrl && (
                  <a
                    href={storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full px-5 py-2 font-semibold"
                    style={{ background: "#e3dccb" }}
                  >
                    Get the full game
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {error && fallback && (
          <Image src={fallback} alt="Trim & Tend screenshot" fill className="object-cover" />
        )}
      </div>
      {!error && (
        <p className="pt-3 text-center text-sm opacity-60">
          Playable demo · drag to turn the tree
        </p>
      )}
    </div>
  );
}
