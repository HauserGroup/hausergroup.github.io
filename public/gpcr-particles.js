// Original GPCR particle shapes and spring dynamics, adapted to the lab site's canvas.
export function initParticleHero(hero) {
  const cv = hero.querySelector("[data-particle-canvas]");
  if (!cv || hero.dataset.ready === "true") return;
  const ctx = cv.getContext("2d");
  if (!ctx) return;
  const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
  let reduce = motionPreference.matches;
  let paused = reduce;
  let inView = true;
  let manuallySelected = false;
  let animationFrame = null;
  let previousTime = null;
  let clock = 0;
  let autoStart = 0;
  const modeButtons = [...hero.querySelectorAll("[data-particle-mode]")];
  const pauseButton = hero.querySelector("[data-particle-pause]");
  var TAU = Math.PI * 2,
    sin = Math.sin,
    cos = Math.cos;

  function rng(seed) {
    return function () {
      seed = (seed + 0x6d2b79f5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  var R = rng(7411);
  function j(a) {
    return (R() - 0.5) * a;
  }
  function sph() {
    var u = R() * 2 - 1,
      a = R() * TAU,
      s = Math.sqrt(1 - u * u);
    return [s * cos(a), u, s * sin(a)];
  }
  function clamp(v) {
    return v < 0 ? 0 : v > 1 ? 1 : v;
  }

  var initialBounds = cv.getBoundingClientRect();
  var area = initialBounds.width * initialBounds.height;
  var N = Math.max(3200, Math.min(7000, Math.round(area / 200)));

  /* ---------- shape builders: each returns N points (x,y,z,tone,size,alpha,role) ---------- */
  function B(axis) {
    var p = [];
    return {
      p: p,
      labels: [],
      axis: axis,
      add: function (x, y, z, t, s, a, r) {
        p.push(x, y, z, t, s, a, r || 0);
      },
    };
  }
  function n(f) {
    return Math.floor(N * f);
  }
  function fin(b) {
    for (var i = b.p.length / 7; i < N; i++) {
      var d = sph(),
        r = 0.9 + R() * 1.1;
      b.add(d[0] * r * 1.35, d[1] * r * 0.9, d[2] * r, 4, 0.8, 0.26);
    }
    var idx = new Uint32Array(N),
      k,
      t;
    for (i = 0; i < N; i++) idx[i] = i;
    for (i = N - 1; i > 0; i--) {
      k = Math.floor(R() * (i + 1));
      t = idx[i];
      idx[i] = idx[k];
      idx[k] = t;
    }
    var o = {
      T: new Float32Array(N * 3),
      tone: new Uint8Array(N),
      size: new Float32Array(N),
      al: new Float32Array(N),
      role: new Uint8Array(N),
      labels: b.labels,
      axis: b.axis,
    };
    for (i = 0; i < N; i++) {
      var s = idx[i] * 7;
      o.T[i * 3] = b.p[s];
      o.T[i * 3 + 1] = b.p[s + 1];
      o.T[i * 3 + 2] = b.p[s + 2];
      o.tone[i] = b.p[s + 3];
      o.size[i] = b.p[s + 4];
      o.al[i] = b.p[s + 5];
      o.role[i] = b.p[s + 6];
    }
    return o;
  }

  function dna() {
    var b = B("x"),
      rot = -0.3,
      c = cos(rot),
      s_ = sin(rot),
      turns = 2.6,
      rad = 0.27,
      L = 1.08,
      off = 2.3,
      i,
      k,
      s,
      p,
      q,
      u;
    function P(s, ph) {
      var th = s * TAU * turns + ph;
      return [(s * 2 - 1) * L, cos(th) * rad, sin(th) * rad];
    }
    function put(x, y, z, t, sz, a) {
      b.add(x * c - y * s_, x * s_ + y * c - 0.1, z, t, sz, a);
    }
    for (k = 0; k < 2; k++)
      for (i = n(0.27); i--;) {
        p = P(R(), k * off);
        put(
          p[0] + j(0.03),
          p[1] + j(0.03),
          p[2] + j(0.03),
          k ? 0 : 1,
          1.4,
          0.95,
        );
      }
    var bp = 36,
      vars = { 8: 1, 19: 1, 29: 1 },
      per = n(0.3 / bp);
    for (i = 0; i < bp; i++) {
      s = (i + 0.5) / bp;
      p = P(s, 0);
      q = P(s, off);
      for (k = per; k--;) {
        u = R();
        if (vars[i])
          put(
            p[0] + (q[0] - p[0]) * u,
            p[1] + (q[1] - p[1]) * u,
            p[2] + (q[2] - p[2]) * u,
            2,
            2,
            1,
          );
        else
          put(
            p[0] + (q[0] - p[0]) * u + j(0.01),
            p[1] + (q[1] - p[1]) * u,
            p[2] + (q[2] - p[2]) * u,
            4,
            1,
            0.6,
          );
      }
      if (i === 19) {
        var mx_ = (p[0] + q[0]) / 2;
        b.labels.push([
          "missense variant",
          mx_ * c + 0.42 * s_,
          mx_ * s_ - 0.42 * c - 0.1,
          0,
        ]);
      }
    }
    return fin(b);
  }

  function receptor() {
    var b = B("y"),
      oy = -0.1,
      top = -0.46,
      bot = 0.46,
      hel = [],
      i,
      k,
      s,
      h,
      a,
      tw;
    for (i = 0; i < 7; i++) {
      a = (i * TAU) / 7 + 0.3;
      tw = a + 1.25;
      hel.push({
        tx: cos(a) * 0.3 + cos(tw) * 0.06,
        tz: sin(a) * 0.3 + sin(tw) * 0.06,
        bx: cos(a) * 0.3 - cos(tw) * 0.06,
        bz: sin(a) * 0.3 - sin(tw) * 0.06,
      });
    }
    var per = n(0.38 / 7);
    for (i = 0; i < 7; i++) {
      h = hel[i];
      for (k = 0; k < per; k++) {
        s = k / per;
        var th = s * TAU * 6.5 + i;
        b.add(
          h.tx + (h.bx - h.tx) * s + cos(th) * 0.062 + j(0.02),
          top + (bot - top) * s + oy + j(0.02),
          h.tz + (h.bz - h.tz) * s + sin(th) * 0.062 + j(0.02),
          i % 2 ? 3 : 0,
          1.5,
          0.95,
        );
      }
      b.labels.push(["TM" + (i + 1), h.tx * 1.3, top + oy - 0.07, h.tz * 1.3]);
    }
    per = n(0.09 / 6);
    for (i = 0; i < 6; i++) {
      var lo = i % 2 === 0,
        y0 = (lo ? bot : top) + oy,
        h1 = hel[i],
        h2 = hel[i + 1];
      var x0 = lo ? h1.bx : h1.tx,
        z0 = lo ? h1.bz : h1.tz,
        x1 = lo ? h2.bx : h2.tx,
        z1 = lo ? h2.bz : h2.tz;
      var mx_ = ((x0 + x1) / 2) * 1.3,
        mz = ((z0 + z1) / 2) * 1.3,
        my_ = y0 + (lo ? 0.2 : -0.2);
      for (k = per; k--;) {
        s = R();
        var w = 1 - s;
        b.add(
          w * w * x0 + 2 * w * s * mx_ + s * s * x1 + j(0.015),
          w * w * y0 + 2 * w * s * my_ + s * s * y0 + j(0.015),
          w * w * z0 + 2 * w * s * mz + s * s * z1 + j(0.015),
          i % 2 ? 3 : 0,
          1.1,
          0.7,
        );
      }
    }
    for (k = n(0.015); k--;) {
      s = R();
      b.add(
        hel[0].tx + 0.12 * sin(s * 7),
        top + oy - s * 0.34,
        hel[0].tz + 0.12 * sin(s * 5 + 1),
        0,
        1.1,
        0.7,
      );
    }
    for (k = n(0.015); k--;) {
      s = R();
      b.add(
        hel[6].bx + 0.14 * sin(s * 6) + s * 0.2,
        bot + oy + s * 0.16 + 0.03 * sin(s * 9),
        hel[6].bz + 0.1 * sin(s * 4),
        0,
        1.1,
        0.7,
      );
    }
    for (k = n(0.22); k--;) {
      var r = Math.sqrt(0.42 * 0.42 + R() * (1 - 0.42 * 0.42));
      a = R() * TAU;
      var x = r * cos(a),
        z = r * sin(a);
      b.add(
        x,
        (k % 2 ? 0.34 : -0.34) +
          oy +
          0.03 * sin(x * 3) * cos(z * 2.5) +
          j(0.024),
        z,
        4,
        1,
        0.5,
      );
    }
    var ligandRing = [];
    for (i = 0; i < 6; i++)
      ligandRing.push([cos((i * TAU) / 6) * 0.14, sin((i * TAU) / 6) * 0.105]);
    ligandRing.push([0.235, 0.055], [0.31, -0.008]);
    var ligandBonds = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 0],
      [0, 6],
      [6, 7],
    ];
    for (k = n(0.045); k--;) {
      var bond = ligandBonds[k % ligandBonds.length],
        p0 = ligandRing[bond[0]],
        p1 = ligandRing[bond[1]];
      s = R();
      b.add(
        p0[0] + (p1[0] - p0[0]) * s + j(0.009),
        -0.24 + oy + p0[1] + (p1[1] - p0[1]) * s + j(0.009),
        j(0.016),
        1,
        2.1,
        1,
        1,
      );
    }
    var G = [
      [0.04, 0.75, 0, 0.2, 0.16, 0.17, 0.07],
      [0.22, 0.8, 0.015, 0.11, 0.12, 0.12, 0.018],
    ];
    G.forEach(function (g) {
      for (var k = n(g[6]); k--;) {
        var d = sph(),
          q = Math.pow(R(), 0.25);
        b.add(
          g[0] + d[0] * g[3] * q,
          g[1] + oy + d[1] * g[4] * q,
          g[2] + d[2] * g[5] * q,
          2,
          1.3,
          0.8,
        );
      }
    });
    for (k = n(0.012); k--;) {
      s = R();
      a = s * TAU * 2.7;
      b.add(
        0.04 * (1 - s) + cos(a) * 0.022,
        0.64 + oy - s * 0.2,
        sin(a) * 0.022,
        2,
        1.3,
        0.8,
      );
    }
    for (k = n(0.023); k--;) {
      a = R() * TAU;
      var gr = (0.07 + R() * 0.065) * (1 + 0.13 * cos(a * 7));
      b.add(
        -0.25 + cos(a) * gr,
        0.83 + oy + sin(a) * gr,
        0.045 + j(0.065),
        2,
        1.3,
        0.8,
      );
    }
    for (k = n(0.007); k--;) {
      s = R();
      a = s * TAU * 2.5;
      b.add(
        -0.36 - s * 0.055 + cos(a) * 0.018,
        0.94 + oy - s * 0.22,
        0.075 + sin(a) * 0.018,
        2,
        1.3,
        0.8,
      );
    }
    b.labels.push(
      ["G protein", 0.36, 0.78 + oy, 0],
      ["lipid bilayer", 0.92, -0.43 + oy, 0],
    );
    return fin(b);
  }

  function molecule() {
    /* epinephrine, the body's own agonist for adrenergic GPCRs */
    var b = B("x"),
      A = [],
      i,
      k,
      u;
    for (i = 0; i < 6; i++)
      A.push([cos((i * TAU) / 6), sin((i * TAU) / 6), "C"]);
    A.push(
      [-2, 0, "O"],
      [-1, -1.732, "O"],
      [1.866, 0.5, "C"],
      [1.866, 1.5, "O"],
      [2.732, 0, "C"],
      [3.598, 0.5, "N"],
      [4.464, 0, "C"],
    );
    var bonds = [
      [0, 1, 1],
      [1, 2],
      [2, 3, 1],
      [3, 4],
      [4, 5, 1],
      [5, 0],
      [3, 6],
      [4, 7],
      [0, 8],
      [8, 9],
      [8, 10],
      [10, 11],
      [11, 12],
    ];
    function X(x) {
      return (x - 1.232) * 0.3;
    }
    function Y(y) {
      return -y * 0.3 - 0.2;
    }
    function Z(x) {
      return 0.08 * sin(X(x) * 2.2);
    }
    var per = n(0.26 / 16);
    bonds.forEach(function (bd) {
      var p = A[bd[0]],
        q = A[bd[1]];
      for (k = per; k--;) {
        u = R();
        var x = p[0] + (q[0] - p[0]) * u,
          y = p[1] + (q[1] - p[1]) * u;
        b.add(X(x) + j(0.012), Y(y) + j(0.012), Z(x) + j(0.012), 4, 1.1, 0.85);
      }
      if (bd[2])
        for (k = per; k--;) {
          u = 0.15 + R() * 0.7;
          x = (p[0] + (q[0] - p[0]) * u) * 0.82;
          y = (p[1] + (q[1] - p[1]) * u) * 0.82;
          b.add(X(x) + j(0.01), Y(y) + j(0.01), Z(x), 4, 1.1, 0.85);
        }
    });
    per = n(0.34 / 13);
    A.forEach(function (a) {
      var het = a[2] !== "C",
        rad = het ? 0.07 : 0.05,
        tone = a[2] === "O" ? 2 : a[2] === "N" ? 0 : 3;
      for (k = per; k--;) {
        var d = sph(),
          q = rad * Math.pow(R(), 0.3);
        b.add(
          X(a[0]) + d[0] * q,
          Y(a[1]) + d[1] * q,
          Z(a[0]) + d[2] * q,
          tone,
          het ? 1.6 : 1.4,
          0.95,
        );
      }
    });
    for (k = n(0.13); k--;) {
      var x = -0.8 + R() * 1.6;
      b.add(
        x,
        0.84 - 0.3 / (1 + Math.exp(-x * 7)) + j(0.012),
        j(0.02),
        1,
        1.5,
        0.95,
      );
    }
    for (k = n(0.04); k--;) b.add(-0.85 + R() * 1.7, 0.88, 0, 4, 1, 0.5);
    for (k = n(0.02); k--;) b.add(-0.85, 0.5 + R() * 0.38, 0, 4, 1, 0.5);
    b.labels.push(
      ["epinephrine", 0.62, 0.2, 0],
      ["EC₅₀", 0.1, 0.64, 0],
      ["log [agonist]", 0.45, 0.96, 0],
    );
    return fin(b);
  }

  function people() {
    var b = B("x"),
      cols = 11,
      rows = 5,
      dx = 0.19,
      dy = 0.3,
      per = Math.floor((N * 0.68) / (cols * rows)),
      r,
      c,
      k;
    for (r = 0; r < rows; r++)
      for (c = 0; c < cols; c++) {
        var X = (c - (cols - 1) / 2) * dx + (r % 2 ? dx / 4 : -dx / 4),
          Y = (r - (rows - 1) / 2) * dy - 0.14,
          Z = (r - 2) * 0.13 + j(0.08);
        var car = (r === 0 && c === 8) || R() < 0.17,
          tone = car ? 2 : 4,
          sz = car ? 1.5 : 1.15,
          al = car ? 1 : 0.78;
        if (r === 0 && c === 8)
          b.labels.push(["variant carriers", X, Y - 0.17, Z]);
        for (k = 0; k < per; k++) {
          if (k < per * 0.32) {
            var a = R() * TAU,
              q = Math.sqrt(R()) * 0.034;
            b.add(X + cos(a) * q, Y - 0.085 + sin(a) * q, Z, tone, sz, al);
          } else {
            var y = -0.04 + R() * 0.13,
              w = y < 0 ? Math.sqrt(1 - (y / 0.04) * (y / 0.04)) : 1;
            b.add(X + (R() - 0.5) * 0.11 * w, Y + y, Z, tone, sz, al);
          }
        }
      }
    for (k = n(0.12); k--;) {
      var x,
        y,
        part = R();
      if (part < 0.08) {
        x = 0;
        y = 0.75 + R() * 0.22;
      } else if (part < 0.65) {
        x = -0.28 + R() * 0.56;
        y = 0.86 + (k % 2 ? 0.11 : -0.11);
      } else {
        var a = R() * TAU;
        x = (cos(a) < 0 ? -0.28 : 0.28) + cos(a) * 0.11;
        y = 0.86 + sin(a) * 0.11;
      }
      b.add(x + j(0.008), y + j(0.008), 0, 2, 1.2, 0.9);
    }
    b.labels.push(["Linked prescriptions & outcomes", 0, 1.13, 0]);
    return fin(b);
  }

  var shapes = [dna(), receptor(), molecule(), people()];
  /* ---------- particle state ---------- */
  var P = new Float32Array(N * 3),
    V = new Float32Array(N * 3),
    K = new Float32Array(N),
    PH = new Float32Array(N),
    DL = new Float32Array(N);
  for (var i = 0; i < N; i++) {
    var d = sph(),
      r = 1.2 + R() * 1.6;
    P[i * 3] = d[0] * r;
    P[i * 3 + 1] = d[1] * r;
    P[i * 3 + 2] = d[2] * r;
    K[i] = 0.012 + R() * 0.02;
    PH[i] = R() * TAU;
    DL[i] = R() * 0.9;
  }

  var cur = 1,
    prev = 1,
    switchT = 0,
    cycleT = 0.6,
    PERIOD = 5.4;
  var W = 0,
    H = 0,
    DPR = 1,
    cx = 0,
    cy = 0,
    U = 1,
    mx = 0,
    my = 0,
    rotY = 0.3,
    rotX = 0.12;

  var LV = 8,
    col = [],
    labelCol = "#17171a",
    labelFont = '"IBM Plex Mono",ui-monospace,monospace';
  var solid = true;
  function hex(value) {
    value = value.trim().replace("#", "");
    if (value.length === 3)
      value = value[0] + value[0] + value[1] + value[1] + value[2] + value[2];
    var parsed = parseInt(value, 16);
    return [(parsed >> 16) & 255, (parsed >> 8) & 255, parsed & 255];
  }
  function readColors() {
    const style = getComputedStyle(hero);
    const tokens = ["--green", "--yellow", "--red", "--blue", "--ink-2"];
    const fallback = ["#178553", "#f6c51b", "#d92d1c", "#1e4fc2", "#6a6a70"];
    tokens.forEach(function (token, tone) {
      const rgb = hex(style.getPropertyValue(token) || fallback[tone]);
      col[tone] = Array.from(
        { length: LV },
        (_, level) =>
          "rgba(" + rgb.join(",") + "," + (level / (LV - 1)).toFixed(3) + ")",
      );
    });
    labelCol = style.getPropertyValue("--ink").trim() || "#17171a";
    labelFont = style.getPropertyValue("--f-mono").trim() || labelFont;
  }
  function resize() {
    const bounds = cv.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    DPR = Math.min(2, window.devicePixelRatio || 1);
    W = cv.width = Math.round(bounds.width * DPR);
    H = cv.height = Math.round(bounds.height * DPR);
    cx = W * 0.5;
    cy = H * (cur === 1 ? 0.51 : 0.47);
    U = sceneScale();
    readColors();
    solid = true;
    draw(false, reduce);
    hero.dataset.ready = "true";
    schedule();
  }
  function sceneScale() {
    return cur === 1
      ? Math.min(W * 0.43, H * 0.45)
      : Math.min(W * 0.36, H * 0.39);
  }
  /* ---------- render ---------- */
  function draw(advance, snap) {
    const targetScale = sceneScale();
    const targetCenter = H * (cur === 1 ? 0.51 : 0.47);
    if (advance) {
      U += (targetScale - U) * 0.08;
      cy += (targetCenter - cy) * 0.08;
    } else if (snap) {
      U = targetScale;
      cy = targetCenter;
    }
    var t = clock,
      el = reduce || snap ? 99 : t - switchT,
      S = shapes[cur],
      S0 = shapes[prev];
    var fade = solid ? 1 : clamp(0.28 + 0.72 * clamp((el - 1.2) / 0.8));
    solid = false;
    ctx.globalAlpha = 1;
    if (fade === 1) ctx.clearRect(0, 0, W, H);
    else {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0," + fade + ")";
      ctx.fillRect(0, 0, W, H);
    }
    ctx.globalCompositeOperation = "source-over";

    if (reduce) {
      rotY = 0.35;
      rotX = 0.12;
    } else if (advance) {
      rotY += (sin(t * 0.22) * 0.55 + mx * 0.5 - rotY) * 0.05;
      rotX += (0.22 + my * 0.28 - rotX) * 0.05;
    }
    var cyr = cos(rotY),
      syr = sin(rotY),
      cxr = cos(rotX),
      sxr = sin(rotX);

    var tc = t - cycleT;
    if (advance && tc > PERIOD) {
      cycleT = t;
      tc = 0;
    }
    var lg = clamp(tc / 1.1);
    lg = lg * lg * (3 - 2 * lg);
    var ligOff = reduce || snap ? 0 : -(1 - lg) * 0.62;
    var pu = (tc - 1.1) / 1.9,
      active = !reduce && !snap && pu > 0 && pu < 1,
      ay = S.axis === "y";
    var q = ay ? -0.7 + 1.75 * pu : -1.2 + 2.4 * pu;
    var sw = reduce ? 0 : Math.max(0, 1 - el / 1.1) * 0.012,
      ss = Math.max(0.8, Math.min(1.4, U / DPR / 300)) * DPR;
    var T = S.T,
      last = null;

    for (var i = 0; i < N; i++) {
      var a = i * 3,
        tx = T[a],
        ty = T[a + 1],
        tz = T[a + 2];
      if (S.role[i]) ty += ligOff;
      var px, py, pz;
      if (reduce || snap) {
        px = P[a] = tx;
        py = P[a + 1] = ty;
        pz = P[a + 2] = tz;
      } else if (advance) {
        px = P[a];
        py = P[a + 1];
        pz = P[a + 2];
        var vx = (V[a] + (tx - px) * K[i] - pz * sw) * 0.86,
          vy = (V[a + 1] + (ty - py) * K[i]) * 0.86,
          vz = (V[a + 2] + (tz - pz) * K[i] + px * sw) * 0.86;
        V[a] = vx;
        V[a + 1] = vy;
        V[a + 2] = vz;
        px = P[a] = px + vx;
        py = P[a + 1] = py + vy;
        pz = P[a + 2] = pz + vz;
      } else {
        px = P[a];
        py = P[a + 1];
        pz = P[a + 2];
      }
      var x = px + 0.006 * sin(t * 1.1 + PH[i]),
        y = py + 0.006 * cos(t * 0.9 + PH[i] * 1.7);
      var x1 = x * cyr + pz * syr,
        z1 = -x * syr + pz * cyr,
        y2 = y * cxr - z1 * sxr,
        z2 = y * sxr + z1 * cxr;
      var f = 3.4 / (3.4 + z2);
      if (f <= 0) continue;
      var sh = el > DL[i] ? S : S0,
        bst = 0;
      if (active) {
        var dd = ((ay ? py : px) - q) / 0.08;
        bst = Math.exp(-dd * dd);
      }
      var al = sh.al[i] * (0.35 + 0.65 * clamp(0.5 - z2 * 0.45)) + bst * 0.6;
      var lv = (Math.min(1, al) * (LV - 1) + 0.5) | 0;
      if (!lv) continue;
      var c = col[sh.tone[i]][lv];
      if (c !== last) {
        ctx.fillStyle = c;
        last = c;
      }
      var rr = sh.size[i] * f * ss * (1 + bst * 1.5),
        sx = cx + x1 * U * f,
        sy = cy + y2 * U * f;
      if (rr < 1.1 * DPR) ctx.fillRect(sx - rr, sy - rr, rr * 2, rr * 2);
      else {
        ctx.beginPath();
        ctx.arc(sx, sy, rr, 0, TAU);
        ctx.fill();
      }
    }

    var la = clamp((el - 2) / 0.6);
    if (la > 0) {
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = la * 0.85;
      ctx.fillStyle = labelCol;
      ctx.font = 10.5 * DPR + "px " + labelFont;
      ctx.textAlign = "center";
      for (i = 0; i < S.labels.length; i++) {
        var L = S.labels[i];
        x1 = L[1] * cyr + L[3] * syr;
        z1 = -L[1] * syr + L[3] * cyr;
        y2 = L[2] * cxr - z1 * sxr;
        z2 = L[2] * sxr + z1 * cxr;
        f = 3.4 / (3.4 + z2);
        const labelInset = ctx.measureText(L[0]).width / 2 + 8 * DPR;
        const labelX = Math.max(
          labelInset,
          Math.min(W - labelInset, cx + x1 * U * f),
        );
        const labelY = Math.max(
          15 * DPR,
          Math.min(H - 10 * DPR, cy + y2 * U * f),
        );
        ctx.fillText(L[0], labelX, labelY);
      }
      ctx.globalAlpha = 1;
    }
  }

  function updateControls() {
    modeButtons.forEach(function (button) {
      button.setAttribute(
        "aria-pressed",
        String(Number(button.dataset.particleMode) === cur),
      );
    });
    cv.setAttribute(
      "aria-label",
      [
        "Animated receptor gene with sequence variants",
        "Animated seven-helix GPCR, ligand and G protein",
        "Animated epinephrine molecule and dose-response curve",
        "Animated cohort with linked prescriptions and outcomes",
      ][cur],
    );
    hero.dataset.particleActive = String(cur);
    hero.dataset.particlePaused = String(paused);
    if (pauseButton) {
      pauseButton.setAttribute("aria-pressed", String(paused));
      pauseButton.setAttribute(
        "aria-label",
        paused ? "Play animation" : "Pause animation",
      );
      pauseButton.title = paused ? "Play animation" : "Pause animation";
    }
  }
  function go(next, manual = false) {
    if (!Number.isInteger(next) || !shapes[next]) return;
    manuallySelected = manuallySelected || manual;
    if (next !== cur) {
      prev = cur;
      cur = next;
      switchT = clock;
      cycleT = clock + 0.9;
      autoStart = clock;
      if (paused) {
        V.fill(0);
        switchT = clock - 3;
        solid = true;
        draw(false, true);
      }
    }
    updateControls();
    schedule();
  }
  function stop() {
    if (animationFrame !== null) cancelAnimationFrame(animationFrame);
    animationFrame = null;
    previousTime = null;
  }
  function schedule() {
    if (
      animationFrame === null &&
      !paused &&
      inView &&
      !document.hidden &&
      W &&
      H
    ) {
      animationFrame = requestAnimationFrame(tick);
    }
  }
  function tick(now) {
    animationFrame = null;
    if (paused || !inView || document.hidden) {
      previousTime = null;
      return;
    }
    if (previousTime === null) previousTime = now - 1000 / 60;
    const delta = now - previousTime;
    // Keep the original 60 Hz spring dynamics on high-refresh screens.
    if (delta >= 1000 / 60 - 0.25) {
      clock += Math.min(delta, 50) / 1000;
      previousTime = now;
      draw(true, false);
      if (!manuallySelected && clock - autoStart >= 9)
        go((cur + 1) % shapes.length);
    }
    schedule();
  }
  modeButtons.forEach(function (button) {
    button.addEventListener("click", () =>
      go(Number(button.dataset.particleMode), true),
    );
  });
  pauseButton?.addEventListener("click", function () {
    paused = !paused;
    if (!paused) reduce = false;
    stop();
    updateControls();
    schedule();
  });
  cv.addEventListener("pointermove", function (event) {
    if (paused) return;
    const bounds = cv.getBoundingClientRect();
    mx = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    my = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
  });
  cv.addEventListener("pointerleave", function () {
    mx = 0;
    my = 0;
  });
  cv.addEventListener("click", function () {
    if (!paused) cycleT = clock - 1.1;
  });
  document.addEventListener("visibilitychange", function () {
    stop();
    schedule();
  });
  motionPreference.addEventListener("change", function () {
    reduce = motionPreference.matches;
    paused = reduce;
    stop();
    updateControls();
    if (reduce) {
      solid = true;
      draw(false, true);
    }
    schedule();
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      function (entries) {
        inView = entries[0].isIntersecting;
        if (inView) schedule();
        else stop();
      },
      { threshold: 0.01 },
    ).observe(cv);
  }
  if ("ResizeObserver" in window) new ResizeObserver(resize).observe(cv);
  else window.addEventListener("resize", resize);
  readColors();
  updateControls();
  resize();
}

document.querySelectorAll("[data-particle-hero]").forEach(initParticleHero);
