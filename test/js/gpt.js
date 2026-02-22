function KH(t) {
  try {
    return JSON.parse(t || "{}");
  } catch (e) {
    return console.error("[SSG] On state deserialization -", e, t), {};
  }
}

function XH(t, e, n, r) {
  const {
    transformState: i,
    registerComponents: o = !0,
    useHead: s = !0,
    rootContainer: a = "#app",
  } = {};
  async function u(c = !1, h) {
    const l = ux(t);
    let d;
    s && l.use((d = qH()));
    const f = J2({ history: R2(e.base), ...e }),
      { routes: _ } = e;
    o && l.component("ClientOnly", YH);
    const g = [],
      w = {
        app: l,
        head: d,
        isClient: !0,
        router: f,
        routes: _,
        onSSRAppRendered: () => {},
        triggerOnSSRAppRendered: () => Promise.all(g.map((x) => x())),
        initialState: {},
        transformState: i,
        routePath: h,
      };
    await GH(),
      (w.initialState =
        (i == null ? void 0 : i(window.__INITIAL_STATE__ || {})) ||
        KH(window.__INITIAL_STATE__)),
      await (n == null ? void 0 : n(w)),
      l.use(f);
    let A,
      k = !0;
    f.beforeEach((x, L, F) => {
      (k || (A && A === x.path)) &&
        ((k = !1), (A = x.path), (x.meta.state = w.initialState)),
        F();
    });
    const R = w.initialState;
    return { ...w, initialState: R };
  }
  return (
    (async () => {
      const { app: c, router: h } = await u();
      await h.isReady();
      c.mount(a, true);

      // 1) inject everything first
      __injectPreloader();
      __injectHeaderNavigation();
      __injectPreStickyIntro();
      __injectScrollMenu();
      __injectNewSection();
      __injectAfterMain();
      __ensureInjectAfterAfterMain();
      __ensureInjectAfterThird();

      __injectColorSync();
      __injectShiftHeadingsScroll();
      __injectHomeStickyAutoHeight();

      // 2) init your header scripts (they may rely on DOM existing)
      if (typeof window.__INIT_HEADER_SCRIPTS === "function") {
        window.__INIT_HEADER_SCRIPTS();
      }
    })(),
    u
  );
}

/* -----------------------------
   INJECT: Color Sync (GLOBAL) — WRAP-TRANSITION TRIGGER (ALWAYS-ON LOGS)
   - ALWAYS logs (no toggle needed), but rate-limited to avoid console spam.
   - Deterministic trigger: flips nav/logo styling when `.wrap-transition` crosses
     a line just below the header bottom.
   - Also sanity-checks `.wrap-transition` background; if it's transparent, we log it.
     (We do NOT force a color by default—just report what's going on.)

   Optional overrides (set in console):
     window.__COLOR_SYNC_FORCE_REINIT = true;
     window.__COLOR_SYNC_TARGET = ".wrap-transition";
     window.__COLOR_SYNC_OFFSET = 8;
     window.__FORCE_COLOR_SYNC = "dark" | "light" | null;
   ----------------------------- */
function __injectColorSync() {
  try {
    const VER = 42; // bidirectional, alpha-based reveal
    const TAG = "[line-reveal]";
    const info = (...a) => console.info(TAG, ...a);
    const warn = (...a) => console.warn(TAG, ...a);

    const vNow = window.__COLOR_SYNC_VER || 0;
    if (vNow >= VER) {
      info("skip (already initialized)", { vNow, VER });
      return;
    }
    window.__COLOR_SYNC_VER = VER;

    info("called", {
      VER,
      prev: vNow,
      readyState: document.readyState,
      url: location.href,
    });

    const waitFor = (testFn, onOk, opts = {}) => {
      const tries = opts.tries ?? 800;
      const delay = opts.delay ?? 50;
      const label = opts.label ?? "waitFor";
      let n = 0;
      const tick = () => {
        n++;
        let ok = false;
        try {
          ok = !!testFn();
        } catch {}
        if (ok) return onOk();
        if (n >= tries) return warn("waitFor TIMEOUT", { label, tries });
        setTimeout(tick, delay);
      };
      tick();
    };

    // --- Colors (bright = solid, dull = same RGB with alpha) ---
    const BRIGHT = [178, 74, 29]; // rgb(178, 74, 29)
    const DULL_A = 0.3; // 30% opacity

    const rgb = (c) => `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
    const rgba = (c, a) => `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`;
    const clamp01 = (x) => Math.max(0, Math.min(1, x));
    const mixAlpha = (a0, a1, t) => a0 + (a1 - a0) * t;

    // --- CSS to preserve wrapping ---
    const STYLE_ID = "qk-line-reveal-css-wrapsafe";
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.textContent = `
        .line-reveal { white-space: normal; word-break: normal; overflow-wrap: break-word; }
        .line-reveal__ch { display:inline; white-space: normal; }
      `;
      document.head.appendChild(style);
      info("CSS injected", { STYLE_ID });
    }

    const WRAP_SEL = ".wrap-transition";
    const TARGET_SEL = `${WRAP_SEL} .big-quote[split-text], ${WRAP_SEL} .big-quote`;
    const getTarget = () => document.querySelector(TARGET_SEL);

    // --- Build chars once; allow natural wrapping. ---
    const buildChars = (el) => {
      if (!el || el.__lrBuilt) return;

      // Normalize whitespace so indentation/newlines don’t become “characters”
      const text = (el.textContent || "").replace(/\s+/g, " ").trim();
      if (!text) return;

      el.__lrBuilt = true;
      el.classList.add("line-reveal");

      el.textContent = "";
      const chars = [];

      for (const ch of text) {
        // Keep spaces as plain text nodes (no span)
        if (ch === " ") {
          el.appendChild(document.createTextNode(" "));
          continue;
        }

        const sp = document.createElement("span");
        sp.className = "line-reveal__ch";
        sp.textContent = ch;
        sp.style.color = rgba(BRIGHT, DULL_A); // start dull (alpha)
        el.appendChild(sp);
        chars.push(sp);
      }

      el.__lrChars = chars;
      console.info("[line-reveal] built chars", { count: chars.length });
    };

    // --- Update (bidirectional by design; colors are recomputed every tick) ---
    const update = () => {
      const el = getTarget();
      if (!el) return;

      if (!el.__lrBuilt) buildChars(el);
      const chars = el.__lrChars;
      if (!chars || !chars.length) return;

      // 1) Group visible chars into visual lines by offsetTop
      const lines = [];
      let currentTop = null;
      let current = [];
      for (const sp of chars) {
        const top = sp.offsetTop;
        if (currentTop === null) currentTop = top;
        if (top !== currentTop) {
          lines.push(current);
          current = [];
          currentTop = top;
        }
        current.push(sp);
      }
      if (current.length) lines.push(current);

      // 2) One global progress for the entire block (0..1)
      // Start when element TOP hits 85% viewport.
      // Finish when element BOTTOM hits 55% viewport. (tweak if needed)
      const vh = window.innerHeight;
      const rect = el.getBoundingClientRect();
      const START_PX = vh * 0.85;
      const END_PX = vh * 0.55;

      // rect.top = START_PX -> t=0
      // rect.bottom = END_PX -> t=1
      const distance = rect.height + (START_PX - END_PX);
      const t = clamp01((START_PX - rect.top) / distance);

      // 3) Spend progress across lines sequentially (line 2 only starts after line 1 finishes)
      const total = lines.reduce((sum, line) => sum + line.length, 0);
      let remaining = t * total;

      // Deadzone so first char of a new line doesn’t instantly brighten
      const EPS = 0.15;

      for (const line of lines) {
        const n = line.length;

        let revealed = Math.max(0, Math.min(n, remaining));
        revealed = Math.max(0, revealed - EPS);

        const iFull = Math.floor(revealed);
        const frac = revealed - iFull;

        for (let i = 0; i < n; i++) {
          if (revealed <= 0) {
            line[i].style.color = rgba(BRIGHT, DULL_A);
            continue;
          }

          if (i < iFull) {
            line[i].style.color = rgb(BRIGHT);
          } else if (i === iFull) {
            // Smooth alpha ramp for active char
            const a = mixAlpha(DULL_A, 1, frac);
            line[i].style.color = rgba(BRIGHT, a);
          } else {
            line[i].style.color = rgba(BRIGHT, DULL_A);
          }
        }

        remaining -= n;
      }
    };

    // --- Scheduling (scroll parents + RAF fallback) ---
    let raf = 0;
    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        try {
          update();
        } catch (e) {
          console.error("[line-reveal] update failed:", e);
        }
      });
    };

    const getScrollParents = (el) => {
      const parents = [];
      const isScrollable = (node) => {
        const s = getComputedStyle(node);
        const oy = s.overflowY;
        return (
          (oy === "auto" || oy === "scroll") &&
          node.scrollHeight > node.clientHeight + 1
        );
      };

      let p = el?.parentElement;
      while (p && p !== document.body) {
        if (isScrollable(p)) parents.push(p);
        p = p.parentElement;
      }
      parents.push(window); // always include window fallback
      return parents;
    };

    waitFor(
      () => document.querySelector(WRAP_SEL) && getTarget(),
      () => {
        info("initialized", { TARGET_SEL });

        const targetEl = getTarget();
        const scrollParents = getScrollParents(targetEl);
        console.log(
          "[line-reveal] scrollParents:",
          scrollParents.map((x) =>
            x === window ? "window" : x.className || x.tagName
          )
        );

        const onScroll = () => schedule();
        const onResize = () => {
          const el = getTarget();
          if (el) {
            // rebuild because line breaks change
            const text = el.textContent || "";
            el.textContent = text;
            el.__lrBuilt = false;
            el.__lrChars = null;
          }
          schedule();
        };

        // attach listeners (capture helps with nested scrollers)
        scrollParents.forEach((sp) => {
          if (sp === window)
            window.addEventListener("scroll", onScroll, { passive: true });
          else
            sp.addEventListener("scroll", onScroll, {
              passive: true,
              capture: true,
            });
        });
        window.addEventListener("resize", onResize);

        // RAF fallback (guaranteed bidirectional even with smooth scrolling)
        let running = true;
        const loop = () => {
          if (!running) return;
          update();
          requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);

        window.__COLOR_SYNC_STATE = {
          cleanup: () => {
            running = false;
            scrollParents.forEach((sp) => {
              try {
                if (sp === window)
                  window.removeEventListener("scroll", onScroll);
                else
                  sp.removeEventListener("scroll", onScroll, { capture: true });
              } catch {}
            });
            try {
              window.removeEventListener("resize", onResize);
            } catch {}
          },
        };

        // initial kicks
        setTimeout(schedule, 50);
        setTimeout(schedule, 250);
        setTimeout(schedule, 900);
      },
      { tries: 900, delay: 50, label: "line-reveal target" }
    );
  } catch (e) {
    console.error("[line-reveal] failed", e);
  }
}
window.__injectColorSync = __injectColorSync;

function __injectShiftHeadingsScroll() {
  try {
    const VER = 1;
    if ((window.__SHIFT_HEADINGS_VER || 0) >= VER) {
      console.log("[shift-headings] skip (already initialized)");
      return;
    }
    window.__SHIFT_HEADINGS_VER = VER;

    console.log("[shift-headings] called", {
      url: location.href,
      readyState: document.readyState,
    });

    const waitFor = (testFn, onOk, opts = {}) => {
      const tries = opts.tries ?? 500;
      const delay = opts.delay ?? 50;
      const label = opts.label ?? "waitFor";
      let n = 0;
      const tick = () => {
        n++;
        let ok = false;
        try {
          ok = !!testFn();
        } catch (e) {}
        if (ok) {
          console.log("[shift-headings] waitFor OK", { label, tries: n });
          return onOk();
        }
        if (n >= tries) {
          console.warn("[shift-headings] waitFor TIMEOUT", { label, tries });
          return;
        }
        setTimeout(tick, delay);
      };
      tick();
    };

    // Light CSS help (optional, but improves smoothness)
    const STYLE_ID = "qk-shift-headings-css";
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.textContent = `
        .shift-right, .shift-left { will-change: transform; display: inline-block; }
      `;
      document.head.appendChild(style);
      console.log("[shift-headings] CSS injected");
    }

    // Targets
    const rightEls = () =>
      Array.from(document.querySelectorAll(".shift-right"));
    const leftEls = () => Array.from(document.querySelectorAll(".shift-left"));

    // Find a reasonable "trigger section":
    // we pick the closest section ancestor that contains BOTH shift-left and shift-right.
    const findTriggerSection = () => {
      const r = rightEls()[0];
      const l = leftEls()[0];
      if (!r || !l) return null;

      // climb up from one of them to a section that contains the other
      let node = r.closest("section");
      while (node) {
        if (
          node.querySelector(".shift-left") &&
          node.querySelector(".shift-right")
        )
          return node;
        node = node.parentElement
          ? node.parentElement.closest("section")
          : null;
      }
      // fallback: common ancestor div
      return r.closest(".section") || r.closest("section") || null;
    };

    // Easing similar to Webflow-ish smoothness
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const clamp01 = (x) => Math.max(0, Math.min(1, x));

    // Controls (tweakable without editing code)
    // how far to move at full progress
    const getDistancePx = () => window.__SHIFT_HEADINGS_DISTANCE_PX ?? 260;

    const getLeftMult = () => window.__SHIFT_LEFT_MULT ?? 0.65; // <— reduce left travel
    const getRightMult = () => window.__SHIFT_RIGHT_MULT ?? 1.0;

    // where within viewport the animation should start/finish (as a fraction of vh)
    const getStartY = () => window.__SHIFT_HEADINGS_START_Y ?? 0.99;
    const getEndY = () => window.__SHIFT_HEADINGS_END_Y ?? 0.1;

    let raf = 0;

    const apply = (progress01) => {
      const dist = getDistancePx();
      const eased = easeOutCubic(progress01);

      // 🔧 START POSITION for shift-left (this is what you want)
      const LEFT_START_PX = window.__SHIFT_LEFT_START_PX ?? 160;

      // optional: reduce how far it travels
      const LEFT_TRAVEL_MULT = window.__SHIFT_LEFT_MULT ?? 0.6;

      const xRight = dist * eased;
      const xLeft = LEFT_START_PX + -dist * LEFT_TRAVEL_MULT * eased;

      rightEls().forEach((el) => {
        el.style.transform = `translate3d(${xRight}px, 0, 0)`;
      });
      leftEls().forEach((el) => {
        el.style.transform = `translate3d(${xLeft}px, 0, 0)`;
      });

      // Always-on but not spammy
      const ls = (window.__SHIFT_HEADINGS_LOG ||= { last: 0 });
      const now = Date.now();
      if (now - ls.last > 800) {
        ls.last = now;
        console.log("[shift-headings] progress", progress01.toFixed(3), {
          xRight: Math.round(xRight),
          xLeft: Math.round(xLeft),
        });
      }
    };

    const computeProgress = (section) => {
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;

      const startPx = vh * getStartY();
      const endPx = vh * getEndY();

      // progress 0 when section top hits startPx
      // progress 1 when section bottom hits endPx
      const distance = r.height + (startPx - endPx);
      const t = clamp01((startPx - r.top) / distance);
      return t;
    };

    const update = (reason = "raf") => {
      raf = 0;

      const section = findTriggerSection();
      if (!section) {
        console.warn(
          "[shift-headings] update: trigger section not found (missing .shift-left/.shift-right?)"
        );
        return;
      }

      const t = computeProgress(section);
      apply(t);
    };

    const schedule = (reason = "event") => {
      if (raf) return;
      raf = requestAnimationFrame(() => update(reason));
    };

    waitFor(
      () => rightEls().length && leftEls().length,
      () => {
        const section = findTriggerSection();
        console.log("[shift-headings] initialized", {
          rightCount: rightEls().length,
          leftCount: leftEls().length,
          triggerSection: section
            ? section.className || section.tagName
            : "null",
        });

        window.addEventListener("scroll", () => schedule("scroll"), {
          passive: true,
        });
        window.addEventListener("resize", () => schedule("resize"));

        // store cleanup like your other patterns
        window.__SHIFT_HEADINGS_STATE = {
          cleanup: () => {
            try {
              window.removeEventListener("scroll", () => schedule("scroll"));
            } catch {}
            try {
              window.removeEventListener("resize", () => schedule("resize"));
            } catch {}
          },
        };

        // initial paints after layout settles
        schedule("init");
        setTimeout(() => schedule("init-250"), 250);
        setTimeout(() => schedule("init-900"), 900);
      },
      { tries: 700, delay: 50, label: "shift-headings targets" }
    );
  } catch (e) {
    console.error("[shift-headings] failed", e);
  }
}
window.__injectShiftHeadingsScroll = __injectShiftHeadingsScroll;

// Drop-in replacement for your existing function
function __injectPreStickyIntro() {
  try {
    const VER = 8;
    if ((window.__PRESTICKY_INTRO_VER || 0) >= VER) return;
    window.__PRESTICKY_INTRO_VER = VER;

    if (window.__INTRO_RAF) cancelAnimationFrame(window.__INTRO_RAF);
    window.__INTRO_RAF = 0;

    if (window.__INTRO_OBS) {
      try {
        window.__INTRO_OBS.disconnect();
      } catch (e) {}
    }
    window.__INTRO_OBS = null;

    if (window.__INTRO_REVEAL_CLEANUP) {
      try {
        window.__INTRO_REVEAL_CLEANUP();
      } catch (e) {}
    }
    window.__INTRO_REVEAL_CLEANUP = null;

    const INTRO_ID = "presticky-intro";

    const css = [
      "width:100vw",
      "display:flex",
      "align-items:center",
      "justify-content:center",
      "font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif",
      "background:white",
      "position:relative",
      "z-index:999",
      "padding-bottom:100px",
    ].join(";");

    const getTargets = () => {
      const pane = document.querySelector(".lenisscroll-pane");
      const main = pane && pane.querySelector(":scope > main");
      if (!pane || !main) return null;

      const hasHomeAnim =
        !!main.querySelector(".HomeAnimation") &&
        !!main.querySelector(".HomeAnimation-landscape") &&
        !!main.querySelector(".HomeAnimation-landscape-sticky-wrap");

      if (!hasHomeAnim) return null;
      return { pane, main };
    };

    const removeAllInjectedClones = (keepNode) => {
      document.querySelectorAll(".InjectedTestSection").forEach((el) => {
        if (el !== keepNode) el.remove();
      });
      const dupes = document.querySelectorAll(`#${CSS.escape(INTRO_ID)}`);
      if (dupes.length > 1)
        dupes.forEach((el, idx) => {
          if (idx !== 0) el.remove();
        });
    };

    const ensureRevealCss = () => {
      if (document.getElementById("qk-intro-reveal-css")) return;

      const style = document.createElement("style");
      style.id = "qk-intro-reveal-css";
      style.type = "text/css";
      style.textContent = `
        /* One class for all hidden-by-default animated elements (keeps layout; no display:none). */
        #${INTRO_ID} .qk-intro-hidden{
          opacity:0 ;
          pointer-events:none !important;
          will-change:transform, opacity;
        }
        #${INTRO_ID} .qk-intro-hidden[data-qk-anim="word"] { transform:translate3d(0,120%,0); }
        #${INTRO_ID} .qk-intro-hidden[data-qk-anim="fade"] { transform:translate3d(0,18px,0); }
        #${INTRO_ID} .qk-intro-hidden[data-qk-anim="cards"]{ transform:translate3d(0,6%,0); }
        #${INTRO_ID} .qk-intro-hidden[data-qk-anim="line"] { transform:scaleX(0); transform-origin:0% 50%; opacity:1 !important; }

        #${INTRO_ID}[data-qk-reveal="1"]{ visibility:visible; }
      `;
      document.head.appendChild(style);
    };

    const initIntroReveal = (intro) => {
      if (!intro || intro.__qk_reveal_init) return;
      intro.__qk_reveal_init = true;

      ensureRevealCss();
      intro.setAttribute("data-qk-reveal", "1");

      const prefersReduced =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const qAll = (sel) => Array.from(intro.querySelectorAll(sel));
      const hidden = qAll(".qk-intro-hidden");

      const unhideAll = () => {
        hidden.forEach((el) => {
          el.classList.remove("qk-intro-hidden");
          el.style.opacity = "";
          el.style.transform = "";
          el.style.pointerEvents = "";
        });
      };

      const canAnimate = !!Element.prototype.animate;

      // Timeline tuning (you asked: smoother/longer opacity, tighter stagger, minimal group gaps)
      const OPACITY_DUR = 1200; // longer fade so it’s clearly visible
      const MOVE_DUR = 780; // motion slightly snappier than fade
      const STAGGER_WORD = 22; // tighter
      const STAGGER_FADE = 24; // tighter
      const BASE_WORD = 0;
      const BASE_FADE = 160; // overlaps more with words
      const BASE_LINE = 190;
      const BASE_CARDS = 260;

      const EASE_MOVE = "cubic-bezier(0.22, 1, 0.36, 1)";
      const EASE_FADE = "cubic-bezier(0.2, 0.9, 0.2, 1)";

      const startTimeline = () => {
        if (intro.__qk_revealed) return;
        intro.__qk_revealed = true;

        if (!canAnimate || prefersReduced) {
          unhideAll();
          return;
        }

        const anim = (el, kf, opt) => {
          try {
            const a = el.animate(kf, opt);
            a.onfinish = () => {
              el.classList.remove("qk-intro-hidden");
              el.style.opacity = "";
              el.style.transform = "";
              el.style.pointerEvents = "";
            };
            return a;
          } catch (e) {
            el.classList.remove("qk-intro-hidden");
            return null;
          }
        };

        const words = qAll(".qk-intro-hidden[data-qk-anim='word']");
        const fades = qAll(".qk-intro-hidden[data-qk-anim='fade']");
        const lines = qAll(".qk-intro-hidden[data-qk-anim='line']");
        const cards = qAll(".qk-intro-hidden[data-qk-anim='cards']");

        // Words: slide up + long fade
        words.forEach((el, i) => {
          anim(
            el,
            [
              { transform: "translate3d(0,120%,0)", opacity: 0 },
              { transform: "translate3d(0,0%,0)", opacity: 1 },
            ],
            {
              duration: Math.max(OPACITY_DUR, MOVE_DUR),
              easing: EASE_MOVE,
              delay: BASE_WORD + STAGGER_WORD * i,
              fill: "both",
            }
          );
        });

        // Line: grow
        lines.forEach((el) => {
          anim(
            el,
            [
              { transform: "scaleX(0)", opacity: 1 },
              { transform: "scaleX(1)", opacity: 1 },
            ],
            { duration: 720, easing: EASE_MOVE, delay: BASE_LINE, fill: "both" }
          );
        });

        // Fade elements: gentle up + long fade
        fades.forEach((el, i) => {
          anim(
            el,
            [
              { transform: "translate3d(0,18px,0)", opacity: 0 },
              { transform: "translate3d(0,0px,0)", opacity: 1 },
            ],
            {
              duration: OPACITY_DUR,
              easing: EASE_FADE,
              delay: BASE_FADE + STAGGER_FADE * i,
              fill: "both",
            }
          );
        });

        // Cards: slightly slower and smooth
        cards.forEach((el, i) => {
          anim(
            el,
            [
              { transform: "translate3d(0,6%,0)", opacity: 0 },
              { transform: "translate3d(0,0%,0)", opacity: 1 },
            ],
            {
              duration: 1300,
              easing: EASE_FADE,
              delay: BASE_CARDS + 18 * i,
              fill: "both",
            }
          );
        });
      };

      const onDone = () => setTimeout(startTimeline, 650); // after overlay lifts

      if (window.__QK_PRELOADER_DONE) onDone();
      else {
        window.addEventListener("qk-preloader:done", onDone, { once: true });
        const t = setTimeout(onDone, 4500);
        window.__INTRO_REVEAL_CLEANUP = () => {
          try {
            clearTimeout(t);
          } catch (e) {}
          try {
            window.removeEventListener("qk-preloader:done", onDone);
          } catch (e) {}
        };
      }
    };

    const ensureIntro = () => {
      const t = getTargets();
      if (!t) return false;

      const { pane, main } = t;

      let intro = document.getElementById(INTRO_ID);
      if (!intro) {
        intro = document.createElement("section");
        intro.id = INTRO_ID;
        intro.className = "InjectedTestSection";
        intro.setAttribute("data-presticky-intro", "1");
        intro.style.cssText = css;

        // FULL HTML (rewritten): removed inline opacity/transform on animated elements,
        // added qk-intro-hidden + data-qk-anim markers.
        intro.innerHTML = `
<section class="section overflow-hidden">
  <div class="padding-bottom padding-xhuge">
    <div class="page-padding">
      <div class="container-large">
        <div class="hero-wrapper is-new">
          <h1 class="hero-heading is-new">
            <div class="hero-heading_word">
              <div class="hero-heading_mask">
                <div class="hero-heading_text qk-intro-hidden" data-qk-anim="word">Build</div>
              </div>

              <button
                class="hero-heading_img is-btn qk-intro-hidden"
                data-qk-anim="fade"
                data-vimeo-lightbox-control="open"
                data-vimeo-lightbox-id="1116214405"
              >
                <div class="video-play"></div>
                <img
                  src="index/images/r8a3dPeHTsmH.gif"
                  loading="eager"
                  width="250"
                  height="250"
                  alt=""
                  class="hero-img-1"
                />
                <img
                  class="vimeo-thumb"
                  src="index/images/68bb30e3208f760f22b823b9_93847d09e97a953ebb4d929c6b85833d_2055772682-2fdefad43fffdaecc660a9ae2607c315e34b058d849a98c90ebe927ed7b9273c-d_640_region%253Dus.jpg"
                  width="1000"
                  height="1000"
                  alt=""
                  sizes="(max-width: 479px) 97vw, (max-width: 767px) 98vw, 99vw"
                  loading="eager"
                  data-vimeo-lightbox-placeholder=""
                  srcset="
                    index/images/68bb30e3208f760f22b823b9_93847d09e97a953ebb4d929c6b85833d_2055772682-2fdefad43fffdaecc660a9ae2607c315e34b058d849a98c90ebe927ed7b9273c-d_640_region%253Dus-p-500.jpg   500w,
                    index/images/68bb30e3208f760f22b823b9_93847d09e97a953ebb4d929c6b85833d_2055772682-2fdefad43fffdaecc660a9ae2607c315e34b058d849a98c90ebe927ed7b9273c-d_640_region%253Dus-p-800.jpg   800w,
                    index/images/68bb30e3208f760f22b823b9_93847d09e97a953ebb4d929c6b85833d_2055772682-2fdefad43fffdaecc660a9ae2607c315e34b058d849a98c90ebe927ed7b9273c-d_640_region%253Dus-p-1080.jpg 1080w,
                    index/images/68bb30e3208f760f22b823b9_93847d09e97a953ebb4d929c6b85833d_2055772682-2fdefad43fffdaecc660a9ae2607c315e34b058d849a98c90ebe927ed7b9273c-d_640_region%253Dus-p-1600.jpg 1600w,
                    index/images/68bb30e3208f760f22b823b9_93847d09e97a953ebb4d929c6b85833d_2055772682-2fdefad43fffdaecc660a9ae2607c315e34b058d849a98c90ebe927ed7b9273c-d_640_region%253Dus-p-2000.jpg 2000w,
                    index/images/68bb30e3208f760f22b823b9_93847d09e97a953ebb4d929c6b85833d_2055772682-2fdefad43fffdaecc660a9ae2607c315e34b058d849a98c90ebe927ed7b9273c-d_640_region%253Dus-p-2600.jpg 2600w,
                    index/images/68bb30e3208f760f22b823b9_93847d09e97a953ebb4d929c6b85833d_2055772682-2fdefad43fffdaecc660a9ae2607c315e34b058d849a98c90ebe927ed7b9273c-d_640_region%253Dus-p-3200.jpg 3200w,
                    index/images/68bb30e3208f760f22b823b9_93847d09e97a953ebb4d929c6b85833d_2055772682-2fdefad43fffdaecc660a9ae2607c315e34b058d849a98c90ebe927ed7b9273c-d_640_region%253Dus.jpg        3840w
                  "
                />
              </button>
            </div>

            <div class="hero-heading_word">
              <div class="hero-heading_mask">
                <div class="hero-heading_text qk-intro-hidden" data-qk-anim="word">Digital</div>
              </div>
            </div>

            <div class="hero-heading_word">
              <div class="hero-heading_mask">
                <div class="hero-heading_text qk-intro-hidden" data-qk-anim="word">experien­ces</div>
              </div>
            </div>

            <div class="hero-heading_word">
              <div class="hero-heading_img is-img-2">
                <img
                  class="hero-img-2 qk-intro-hidden"
                  data-qk-anim="fade"
                  src="index/images/VBhquZRBW96M.jpg"
                  width="446"
                  height="256"
                  alt=""
                  sizes="(max-width: 479px) 100vw, 446px"
                  loading="eager"
                  srcset="
                    index/images/uuHkTi7Cc2zA.jpg  500w,
                    index/images/WgAkBAOGFNM8.jpg  800w,
                    index/images/f9qTq29KJnOe.jpg 1080w,
                    index/images/0aEQoKk2WVYF.jpg 1600w,
                    index/images/SbjpKOnvNQLP.jpg 2000w,
                    index/images/C19uR07DGBLZ.jpg 2600w,
                    index/images/EB3v5xhMllin.jpg 3200w,
                    index/images/VBhquZRBW96M.jpg 4760w
                  "
                />
              </div>
              <div class="hero-heading_mask">
                <div class="hero-heading_text qk-intro-hidden" data-qk-anim="word">that</div>
              </div>
            </div>

            <div class="hero-heading_word">
              <div class="hero-heading_mask">
                <div class="hero-heading_text qk-intro-hidden" data-qk-anim="word">refuse</div>
              </div>

              <div class="hero-heading_img is-img-3">
                <img
                  class="hero-img-3 qk-intro-hidden"
                  data-qk-anim="fade"
                  src="index/images/FxBWSg813AXr.jpg"
                  width="350"
                  height="388"
                  alt=""
                  sizes="(max-width: 479px) 100vw, 350px"
                  loading="eager"
                  srcset="
                    index/images/KG4Qacn51ato.jpg  500w,
                    index/images/ghMAJYhTdViB.jpg  800w,
                    index/images/WOfQwk88G6LL.jpg 1080w,
                    index/images/ie2iTLSlSd11.jpg 1600w,
                    index/images/FxBWSg813AXr.jpg 2000w
                  "
                />
              </div>
            </div>

            <div class="hero-heading_word">
              <div class="hero-heading_mask">
                <div class="hero-heading_text qk-intro-hidden" data-qk-anim="word">to blend in</div>
              </div>
            </div>
          </h1>
        </div>

        <div class="home-intro-grid custom-margin-home">
          <div
            id="w-node-a5e9ce1a-dc41-a502-5ab4-74a54e608718-644deb4a"
            class="hero-button-wrapper qk-intro-hidden"
            data-qk-anim="fade"
          >
            <a href="./services" class="button w-inline-block" style="padding: 1rem 3rem !important;">
              <div class="button-text-wrap" style="font-size: 1.1vw; line-height: 138%;">
                Build your website like you give a quack →
              </div>
            </a>
          </div>

          <div id="w-node-a5e9ce1a-dc41-a502-5ab4-74a54e60871b-644deb4a">
            <div class="h-line qk-intro-hidden" data-qk-anim="line"></div>

            <div class="eyebrow no-border is--home qk-intro-hidden" data-qk-anim="fade">
              Who We Are
            </div>

            <h2 class="home-intro qk-intro-hidden" data-qk-anim="fade">
              <span class="spin">✺</span> Who said building a website was rocket science? Come on, pull up a chair.
            </h2>
          </div>
        </div>

        <section class="home-grid-cards qk-intro-hidden" data-qk-anim="cards">
          <a
            id="w-node-a5e9ce1a-dc41-a502-5ab4-74a54e608721-644deb4a"
            class="home-project-card w-inline-block"
          >
            <img
              class="card-bg"
              src="hero-1.png"
              width="1216"
              height="1564"
              alt=""
              sizes="100vw"
              loading="lazy"
              srcset="
                hero-1.png  500w,
                hero-1.png  800w,
                hero-1.png 1080w,
                hero-1.png 1402w
              "
            />
            <div class="project-card-info">
              <h3 class="heading-small">Porsche</h3>
              <div class="project-tag">Vehicles</div>
            </div>
          </a>

          <div
            id="w-node-a5e9ce1a-dc41-a502-5ab4-74a54e608728-644deb4a"
            class="home-text-card"
          >
            <div>
              From brand strategy, UX/UI design,
              and full-stack development, our expertise empowers
              brands to grow and bring bold concepts to life.
            </div>
          </div>

          <a
            id="w-node-a5e9ce1a-dc41-a502-5ab4-74a54e60872b-644deb4a"
            class="home-project-card w-inline-block"
          >
            <div class="project-card-info">
              <h3 class="heading-small">SeatGeek</h3>
              <div class="project-tag">Entertainment</div>
            </div>
            <img
              src="4.png"
              loading="lazy"
              width="812"
              height="1564"
              alt=""
              srcset="
                4.png  500w,
                4.png  800w,
                4.png 1080w,
                4.png 1600w,
                4.png 2000w,
                4.png 2600w,
                4.png 3200w,
                4.png 4533w
              "
              sizes="(max-width: 991px) 100vw, 812px"
              class="card-bg"
            />
          </a>

          <div
            id="w-node-a5e9ce1a-dc41-a502-5ab4-74a54e608732-644deb4a"
            class="home-text-card"
          >
            <div class="max-width-small">
              <div>
                Startups, digital products, finance, health, retail, logistics, media, education, entertainment, enterprise, <strong>yes</strong>
              </div>
            </div>
          </div>

          <a class="home-project-card w-inline-block">
            <img
              src="hero-3.png"
              loading="lazy"
              width="812"
              height="1564"
              alt=""
              srcset="
                9.png  500w,
                9.png  800w,
                9.png 1065w
              "
              sizes="(max-width: 991px) 100vw, 812px"
              class="card-bg"
            />
            <div class="project-card-info">
              <h3 class="heading-small">Optix</h3>
              <div class="project-tag">Coworking</div>
            </div>
          </a>

        </section>
      </div>
    </div>
  </div>
</section>
        `;
      } else {
        intro.classList.add("InjectedTestSection");
        if (!intro.getAttribute("data-presticky-intro"))
          intro.setAttribute("data-presticky-intro", "1");
        if (!intro.style.cssText) intro.style.cssText = css;
      }

      const shouldBeHere =
        intro.parentElement === pane && intro.nextElementSibling === main;
      if (!shouldBeHere) pane.insertBefore(intro, main);

      removeAllInjectedClones(intro);

      initIntroReveal(intro);

      const update = () => {
        const top = main.getBoundingClientRect().top;
        const atTop = top <= 0;
        window.__INTRO_MAIN_AT_TOP = atTop;
        window.__INTRO_OFFSET_PX =
          intro.getBoundingClientRect().height || window.innerHeight;
      };

      let lastAtTop = null;
      const loop = () => {
        const top = main.getBoundingClientRect().top;
        const atTop = top <= 0;

        if (lastAtTop !== atTop) {
          lastAtTop = atTop;
          update();
        } else {
          window.__INTRO_OFFSET_PX =
            intro.getBoundingClientRect().height || window.innerHeight;
        }

        window.__INTRO_RAF = requestAnimationFrame(loop);
      };

      window.__INTRO_RAF = requestAnimationFrame(loop);

      const obs = new MutationObserver(() => {
        const fresh = getTargets();
        if (!fresh) return;

        const { pane: p2, main: m2 } = fresh;
        const node = document.getElementById(INTRO_ID);
        if (!node) return;

        if (!(node.parentElement === p2 && node.nextElementSibling === m2)) {
          p2.insertBefore(node, m2);
        }

        removeAllInjectedClones(node);
      });

      window.__INTRO_OBS = obs;
      obs.observe(document.documentElement, { childList: true, subtree: true });

      update();
      lastAtTop = null;

      return true;
    };

    if (ensureIntro()) return;

    const waiter = new MutationObserver(() => {
      if (ensureIntro()) waiter.disconnect();
    });
    waiter.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
    setTimeout(() => {
      try {
        waiter.disconnect();
      } catch (e) {}
    }, 15000);
  } catch (e) {}
}

function __injectHeaderNavigation() {
  try {
    const VER = 2;
    if ((window.__HEADER_NAV_VER || 0) >= VER) return;
    window.__HEADER_NAV_VER = VER;

    const HEADER_ID = "navigation";

    // Prevent duplicates
    if (document.getElementById(HEADER_ID)) return;

    const pane = document.querySelector(".lenisscroll-pane");
    if (!pane) return;

    const header = document.createElement("header");
    header.id = HEADER_ID;
    header.className = "navigation";

    header.innerHTML = `
        <div class="global-styles w-embed">
          <style>
            /* HIDE SCROLLBARS */
            ::-webkit-scrollbar { width: 0px; }
            ::-webkit-scrollbar-track { background: transparent; }
            ::-webkit-scrollbar-thumb { background: transparent; }
            ::-webkit-scrollbar-thumb:hover { background: transparent; }

            body { -webkit-font-smoothing: antialiased; }

            @media (max-width:1280px) and (min-width:991px) {
              .insights-title { font-size: 1.625rem; }
            }

            /* Custom Cursors */
            .project-card {
              cursor: url(index/images/64e336072b476f3aa3e825c4_stringer%20arrow%20cursor.png), auto !important;
            }
            .home_slider_component {
              cursor: url(index/images/65b134bb5f9e4c283d76c055_Mouse%20Grab-01.svg), auto !important;
            }
            .home_slider_component:active {
              cursor: url(index/images/65b134ba452712e47071e2cf_Mouse%20Grab-02.svg), auto !important;
            }

            @media screen and (min-width: 1400px) {
              .big-cta { font-size: 9.5rem; }
            }

            @media screen and (min-width: 1500px) {
              .landing-text {
                font-size: 8rem;
                letter-spacing:-0.45rem;
                margin-right: 1.5rem;
              }
              .wrapper-launch {
                padding-right: 8.5rem;
                margin-right: 1.5rem;
              }
              .wrapper-that { padding-left: 12.625rem; }
              .wrapper-shape { padding-left: 11.5rem; }
            }

            .insights-card:hover .insights-card-thumb { transform: scale(1.05); }

            /* Prevent label clicks blocking interaction */
            .filter-cancel, .filter-label { pointer-events: none; }

            /* Change link colors to text color */
            a { color: inherit; }

            .team-member-row:hover .team-list-headshot { opacity: 100%; }

            /* Make text look crisper and more legible in all browsers */
            body {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              font-smoothing: antialiased;
              text-rendering: optimizeLegibility;
            }

            *[tabindex]:focus-visible,
            input[type="file"]:focus-visible {
              outline: 0.125rem solid #4d65ff;
              outline-offset: 0.125rem;
            }

            .w-richtext > :not(div):first-child,
            .w-richtext > div:first-child > :first-child {
              margin-top: 0 !important;
            }

            .w-richtext>:last-child,
            .w-richtext ol li:last-child,
            .w-richtext ul li:last-child {
              margin-bottom: 0 !important;
            }

            .pointer-events-off { pointer-events: none; }
            .pointer-events-on { pointer-events: auto; }

            .div-square::after {
              content: "";
              display: block;
              padding-bottom: 100%;
            }

            .container-medium,.container-small, .container-large {
              margin-right: auto !important;
              margin-left: auto !important;
            }

            .text-style-3lines {
              display: -webkit-box;
              overflow: hidden;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            }

            .text-style-2lines {
              display: -webkit-box;
              overflow: hidden;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }

            .display-inlineflex { display: inline-flex; }

            .hide { display: none !important; }

            @media screen and (max-width: 991px) {
              .hide, .hide-tablet { display: none !important; }
            }
            @media screen and (max-width: 767px) {
              .hide-mobile-landscape { display: none !important; }
            }
            @media screen and (max-width: 479px) {
              .hide-mobile { display: none !important; }
            }

            .margin-0 { margin: 0rem !important; }
            .padding-0 { padding: 0rem !important; }
            .spacing-clean { padding: 0rem !important; margin: 0rem !important; }

            /* Checkbox Styles */
            .checkbox .filter-cancel { transform: scale(0); max-width: 0rem; }
            .checkbox:has(.filter-checkbox.w--redirected-checked) { color: white; }
            .checkbox:has(.filter-checkbox.w--redirected-checked) .filter-checkbox { background: black; }
            .checkbox:has(.filter-checkbox.w--redirected-checked) .filter-cancel { transform: scale(1); max-width: 1.25rem; }
            .checkbox.is-outlined:has(.filter-checkbox.w--redirected-checked) { border: 1px solid black; }

            @media only screen and (min-width: 1700px) {
              .hero-heading_text { font-size: 140px !important; }
            }
            .hero-heading_text { text-box: trim-both cap alphabetic; }
          </style>
        </div>

        <div class="qs-main-logo" style="width: 19%;">
          <a href="./">
            <img src="QuackStudios-3.svg" alt="QuackStudios logo">
          </a>
        </div>

        <style>
          .qs-main-logo img {
            display: block;
            width: 100%;
            height: auto;
            filter: none;
            transition: filter 320ms ease, opacity 320ms ease;
          }
          body.services-open .qs-main-logo img {
            filter: invert(1);
          }
        </style>

        <div class="nav-wrapper">
          <div class="mobile-nav">
            <a
              id="w-node-_64d6b572-7c43-936d-785b-b92d636aa663-644deb4a"
              href="./"
              aria-current="page"
              class="logo w-inline-block w--current"
            >
              <div class="logo-mono w-embed">
                <svg width="100%" height="auto" viewBox="0 0 41 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25.2786 10.2454C25.2786 12.342 23.8427 14.3199 19.8828 14.3199H0V0H19.8035C23.3625 0 24.9174 1.57352 24.9174 3.63052C24.9174 5.08097 24.0277 6.39516 22.0896 6.79513C24.2743 7.11599 25.283 8.36865 25.283 10.2454H25.2786ZM4.08316 5.78861H18.6715C20.3497 5.78861 20.6933 4.94032 20.6933 4.13598C20.6933 3.42833 20.2881 2.66355 18.6715 2.66355H4.08316V5.78861ZM21.0589 9.92459C21.0589 8.93565 20.3938 8.24998 18.8742 8.24998H4.08316V11.6563H18.8565C20.4114 11.6563 21.0589 10.9091 21.0589 9.92019V9.92459Z"></path>
                  <path d="M25.7631 22.4447C25.7631 25.5082 23.3802 27.4641 19.6802 27.4641H4.08316V32.0001H0V17.6802H19.7771C23.5167 17.6802 25.7587 19.4735 25.7587 22.4403L25.7631 22.4447ZM21.4773 22.5458C21.4773 21.1744 20.5083 20.4097 18.7905 20.4097H4.08316V24.7434H18.7684C20.4863 24.7434 21.4773 23.9347 21.4773 22.5458Z"></path>
                  <path d="M35.7 10.06C33.04 10.06 30.94 8 30.94 5.22C30.94 2.44 33.04 0.38 35.7 0.38C38.36 0.38 40.46 2.44 40.46 5.22C40.46 8 38.36 10.06 35.7 10.06ZM35.7 9.24C37.9 9.24 39.52 7.56 39.52 5.22C39.52 2.88 37.9 1.2 35.7 1.2C33.5 1.2 31.88 2.88 31.88 5.22C31.88 7.56 33.5 9.24 35.7 9.24ZM35.02 7.86H33.7V2.54H35.92C37.16 2.54 37.82 3.1 37.82 4.1C37.82 4.84 37.38 5.28 36.7 5.44V5.46C38.06 5.68 37.62 7.7 37.94 7.8V7.86H36.58C36.32 7.62 36.76 5.98 35.52 5.98H35.02V7.86ZM35.02 4.92H35.56C36.1 4.92 36.56 4.8 36.56 4.22C36.56 3.64 36.1 3.54 35.56 3.54H35.02V4.92Z"></path>
                </svg>
              </div>
            </a>
            <div id="w-node-_64d6b572-7c43-936d-785b-b92d636aa665-644deb4a" class="menu-toggle">
              <div class="toggle-text-wrapper">
                <div class="toggle-text">Menu<br />close</div>
              </div>
              <div class="menu-icon">
                <div class="menu-icon-text">✺</div>
                <div class="menu-icon-close w-embed">
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1446_9029)">
                      <path d="M10.2611 9.29107L18.5969 1.82204L17.2335 0.411144L9.31854 8.61494L1.82217 0.145895L0.411274 1.50925L8.63646 9.38392L0.146024 16.9206L1.50938 18.3315L9.34351 10.0951L16.9207 18.5967L18.3316 17.2334L10.2611 9.29107Z" fill="white"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_1446_9029">
                        <rect width="18.3" height="18.3" fill="white" transform="translate(0.448242) rotate(1.40314)"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div fs-scrolldisable-media="(max-width: 991px)" fs-scrolldisable-element="when-visible" class="nav-menu">
            <a href="./" data-w-id="64d6b572-7c43-936d-785b-b92d636aa670" class="nav-logo-home w-inline-block" style="min-width: 3.75rem !important">
              <div class="logo-mono w-embed"><img src="quack-icon.png"></div>
            </a>
            <a class="nav-link w-inline-block">
              <div data-w-id="64d6b572-7c43-936d-785b-b92d636aa673" class="link-text is-1">Services</div>
              <div class="nav-pill"></div>
            </a>

            <link rel="prefetch" href="./services" />
            <a href="./about" class="nav-link is-2 w-inline-block">
              <div data-w-id="64d6b572-7c43-936d-785b-b92d636aa676" class="link-text is-2">About</div>
            </a>

            <link rel="prefetch" href="./about" />
            <a href="./work" class="nav-link w-inline-block">
              <div data-w-id="64d6b572-7c43-936d-785b-b92d636aa679" class="link-text is-3">Work</div>
            </a>

            <link rel="prefetch" href="./work" />
            <a href="./insights" class="nav-link w-inline-block">
              <div data-w-id="64d6b572-7c43-936d-785b-b92d636aa67c" class="link-text is-4">Insights</div>
            </a>

            <link rel="prefetch" href="./insights" />
            <a href="./careers" class="nav-link display-mobile w-inline-block">
              <div data-w-id="64d6b572-7c43-936d-785b-b92d636aa67f" class="link-text is-5">Careers</div>
            </a>

            <a data-button-hover="" href="./contact" class="button is-nav w-inline-block">
              <div data-button-text="" class="button-anim__text">Work With Us</div>
            </a>
            <link rel="prefetch" href="./contact" />
            <div class="menu-bg"></div>
          </div>
        </div>
        <div class="spacing-div" style="width: 30%;"></div>
      `;

    // Insert INSIDE lenis pane as sibling of presticky-intro (preferred)
    const presticky = pane.querySelector("#presticky-intro");
    const main =
      pane.querySelector(":scope > main") || pane.querySelector("main");

    if (presticky) {
      pane.insertBefore(header, presticky);
    } else if (main) {
      pane.insertBefore(header, main);
    } else {
      pane.prepend(header);
    }

    // After injection: run header init scripts (DOMContentLoaded already fired)
    const runInjectedHeaderScripts = () => {
      // Only run once
      if (window.__HEADER_SCRIPTS_INITED) return;
      window.__HEADER_SCRIPTS_INITED = true;

      if (typeof window.__INIT_HEADER_SCRIPTS === "function") {
        try {
          window.__INIT_HEADER_SCRIPTS();
        } catch (e) {}
      }
    };

    // Wait a tick so any framework patching settles, then run
    requestAnimationFrame(() => {
      runInjectedHeaderScripts();

      // Kick both the injected header and the injected intro section (if present),
      // because either can contain data-w-id nodes.
    });
  } catch (e) {
    console.error("[header inject]", e);
  }
}

function __injectScrollMenu() {
  try {
    const pane = document.querySelector(".lenisscroll-pane");
    if (!pane) return;

    // Prevent duplicates by checking for the root class itself
    if (pane.querySelector(".x_nav_component")) return;

    // IMPORTANT: keep your provided markup exactly inside here
    const raw = `
      <div class="x_nav_component">
          <div class="x_nav_css x_u-display-none w-embed">
            <style>
              /* EDIT MODE  */
              .x_nav_component.is-edit .x_nav_wrap {width: 58.5rem; height: 42.625rem;transform:translateX(0);}
              .x_nav_component.is-edit .x_nav_left {width:17.5rem;}
              .x_nav_component.is-edit .x_nav_left_inner {display:flex}
              .x_nav_component.is-edit .x_nav_bg {display:block; opacity:60%;}
              .x_nav_component.is-edit .x_nav_button_ico.is-open {display:none}
              .x_nav_component.is-edit .x_nav_button_ico.is-close {display:block}
              .x_nav_component.is-edit .x_nav_button_bg {opacity:100%;}
              .x_nav_component.is-edit .x_nav_content_wrap {display:block; opacity:100%}
              .x_nav_component.is-edit .x_nav_list {display:flex;}
              /* EDIT MODE -- TABLET */
              @media (max-width:991px) {
              .x_nav_component.is-edit .x_nav_wrap {width: 42.5rem; height: 37.375rem;}
              .x_nav_component.is-edit .x_nav_left {width:13.25rem}
              }
              /* EDIT MODE -- MOBILE */
              @media (max-width:767px) {
              .x_nav_component.is-edit .x_nav_wrap {width: 22.5625rem; height: 25.625rem;}
              .x_nav_component.is-edit .x_nav_content_wrap {display:none;}
              .x_nav_component.is-edit .x_nav_left {width:100%}
              /* EDIT MODE -- SUBMENU */
              .x_nav_component.is-sub-menu .x_nav_right {height:26rem}
              .x_nav_component.is-sub-menu .x_nav_content_wrap {opacity:1}
              .x_nav_component.is-sub-menu .x_nav_content_wrap {display:block}
              .x_nav_component.is-sub-menu .x_nav_list {opacity:0}
              .x_nav_component.is-sub-menu .x_nav_wrap {height: 30rem}
              }
              /* ======================= */

              /* NAV BTN */
              .x_nav_button_bg.is-active {background-color: transparent; backdrop-filter: none;}
              /* NAV BTN -- DESKTOP */
              @media (min-width:991px) {
              .x_nav_button_wrap:hover .x_nav_button_bg{background-color:var(--x_colors--base-900)}
              }

              /* LEFT MAIN MENU */
              .x_nav_link_wrap.is-active .x_nav_link_arrow,
              .x_nav_link_wrap.is-active .x_nav_link_text {opacity:100%}
              .x_nav_link_wrap.w--current .x_nav_link_dot {display:block}
              /* LEFT MAIN MENU -- DESKTOP */
              @media (min-width:991px){
              .x_nav_link_wrap:hover .x_nav_link_arrow,
              .x_nav_link_wrap:hover .x_nav_link_text {opacity:100%}
              }

              /* SERVICES */
              .x_nav_content_inner.is-active {display:flex}
              /* SERVICES -- DESKTOP */
              @media (min-width:991px){
              .x_nav_services_link:hover .x_nav_services_bg {opacity:100%}
              .x_nav_services_link:hover .x_nav_services_subtitle {color:var(--x_colors--base-100);}
              .x_nav_services_link:hover .x_nav_services_ico {opacity:100%}
              .x_nav_services_row {flex: 1;transition: flex 0.4s ease;}
              .x_nav_services_row:hover {flex: 1.5;}
              .x_nav_content_inner.is-services .x_nav_services_row:not(:hover) {flex: 0.75;}
              /* SERVICES -- MOBILE */
              @media (max-width:767px) {
              .x_nav_services_link .x_nav_services_ico {opacity:30%}
              }

              /* PROJECTS */
              .x_nav_projects_slide:first-child {opacity:100%}

              /* INSIGHTS -- DESKTOP */
              @media (min-width:991px){
              .x_nav_insights_link:hover .x_nav_insights_img {transform: scale(1.02)}
              }

              .x_nav_insights_link:hover {
                background-color: rgba(0, 0, 0, 0.2);
              }

              .x_nav_insights_link:hover .x_nav_insights_title {
                text-decoration: underline white;
              }

              /* INSIGHTS -- MOBILE */
              @media (max-width:767px) {
              .x_nav_insights_item:nth-child(1n+3) {border-bottom: 1px solid transparent}
              }

              /* Open and Close Psuedo Element */
              /* SERVICES label + icon layout */
/* Make the "Services" label hold text + icon side-by-side */
.link-text.is-1 {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;          /* space between text and icon */
}

/* Icon container */
.link-text.is-1 .services-toggle-icon {
  position: relative;
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  transition: transform 360ms cubic-bezier(0.55, 0, 0.1, 1);
}

/* Rotate the whole icon when open (adds a bit of life) */
.link-text.is-1 .services-toggle-icon.is-open {
  transform: rotate(180deg);
}

/* Horizontal + vertical bars */
.link-text.is-1 .services-toggle-icon::before,
.link-text.is-1 .services-toggle-icon::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  background: currentColor;
  top: 50%;
  left: 0;
  transform-origin: center;
  transform: translateY(-50%);
  border-radius: 999px;
  transition:
    transform 360ms cubic-bezier(0.55, 0, 0.1, 1),
    opacity 200ms ease-out;
}

/* Vertical bar (for the +) */
.link-text.is-1 .services-toggle-icon::after {
  transform: translateY(-50%) rotate(90deg);
}

/* OPEN STATE:
   - vertical bar shrinks & fades (leaving a minus)
*/
.link-text.is-1 .services-toggle-icon.is-open::after {
  transform: translateY(-50%) rotate(90deg) scaleX(0);
  opacity: 0;
}




            </style>
          </div>
          <div class="x_nav_wrap" style="transform: translate(0px);">
            <div class="x_nav_inner">
              <div class="x_nav_left">
                <div class="x_nav_left_inner">
                  <a
                    href="./"
                    aria-current="page"
                    class="x_nav_logo_link w-inline-block w--current"
                    ><img
                      style="filter: brightness(0) invert(1);"
                      src="quack-icon-peach.png"
                      class="x_nav_logo_ico"
                    >
                    </a>
                  <div class="x_nav_list">
                    <div class="x_nav_list_line"></div>
                    <a
                      nav-link="services"
                      href="./"
                      aria-current="page"
                      class="x_nav_link_wrap is-home w-inline-block w--current"
                      ><div class="x_nav_link_text x_u-l-body">Home</div>
                      <div class="x_nav_link_dot"></div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        viewBox="0 0 32 32"
                        fill="none"
                        class="x_nav_link_arrow"
                      >
                        <path
                          d="M7.17 6.67H25.33M24.3 6.67V24.83M24.3 6.67L6.67 25.33"
                          stroke="currentColor"
                          stroke-width="2"
                        ></path></svg
                    ></a>
                    <div class="x_nav_list_line"></div>
                    <a
                      nav-mobile=""
                      nav-link="services"
                      href="#"
                      class="x_nav_link_wrap is-services is-active w-inline-block"
                      ><div class="x_nav_link_text x_u-l-body">Solutions</div>
                      <div class="x_nav_link_dot"></div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        viewBox="0 0 20 20"
                        fill="none"
                        class="x_nav_link_arrow_mob"
                      >
                        <path
                          d="M15.8359 4.48328L15.8359 16.55M15.8359 15.8346L4.48459 15.8346M15.8359 15.8346L4.16927 4.16797"
                          stroke="currentColor"
                          stroke-width="1.5"
                        ></path></svg
                    ></a>
                    <div class="x_nav_list_line"></div>
                    <a
                      nav-link="about"
                      href="./about.html"
                      class="x_nav_link_wrap is-about w-inline-block"
                      ><div class="x_nav_link_text x_u-l-body">Philosophy</div>
                      <div class="x_nav_link_dot"></div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        viewBox="0 0 32 32"
                        fill="none"
                        class="x_nav_link_arrow"
                      >
                        <path
                          d="M7.17 6.67H25.33M24.3 6.67V24.83M24.3 6.67L6.67 25.33"
                          stroke="currentColor"
                          stroke-width="2"
                        ></path></svg
                    ></a>
                    <div class="x_nav_list_line"></div>
                  
                    <a
                      nav-mobile=""
                      nav-link="insights"
                      href="./blog.html"
                      class="x_nav_link_wrap is-insights w-inline-block"
                      ><div class="x_nav_link_text x_u-l-body">Insights</div>
                      <div class="x_nav_link_dot"></div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        viewBox="0 0 32 32"
                        fill="none"
                        class="x_nav_link_arrow"
                      >
                        <path
                          d="M7.17 6.67H25.33M24.3 6.67V24.83M24.3 6.67L6.67 25.33"
                          stroke="currentColor"
                          stroke-width="2"
                        ></path></svg
                    ></a>
                    <div class="x_nav_list_line"></div>
                    <a
                      nav-link="contact"
                      href="./contact.html"
                      class="x_nav_link_wrap is-contact w-inline-block"
                      ><div class="x_nav_link_text x_u-l-body">Contact</div>
                      <div class="x_nav_link_dot"></div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        viewBox="0 0 32 32"
                        fill="none"
                        class="x_nav_link_arrow"
                      >
                        <path
                          d="M7.17 6.67H25.33M24.3 6.67V24.83M24.3 6.67L6.67 25.33"
                          stroke="currentColor"
                          stroke-width="2"
                        ></path></svg
                    ></a>
                    <div class="x_nav_list_line"></div>
                  </div>
                  <div class="x_nav_socials_list">
                    <a
                      href="https://au.linkedin.com/company/quackstudiosaustralia"
                      target="_blank"
                      class="x_nav_socials_link x_u-s-body"
                      >Linkedin</a
                    ><a
                      href="https://www.instagram.com/neongoosestudios/"
                      target="_blank"
                      class="x_nav_socials_link x_u-s-body"
                      >Instagram</a
                    ><a
                      href="https://www.facebook.com/people/QuackStudios/61569291452180/"
                      target="_blank"
                      class="x_nav_socials_link x_u-s-body"
                      >Facebook</a
                    >
                  </div>
                </div>
                <div class="x_nav_button_wrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 20 20"
                    fill="none"
                    class="x_nav_button_ico is-open"
                  >
                    <path
                      d="M8.33594 5.83203H16.6693"
                      stroke="currentColor"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M3.33594 10H16.6693"
                      stroke="currentColor"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M3.33594 14.168H11.6693"
                      stroke="currentColor"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path></svg
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 24 24"
                    fill="none"
                    class="x_nav_button_ico is-close"
                  >
                    <path
                      d="M4 12H20"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                  <div class="x_nav_button_bg"></div>
                </div>
              </div>
              <div class="x_nav_right">
                <div class="x_nav_content_wrap">
                  <div
                    nav-content="services"
                    class="x_nav_content_inner is-services is-active"
                  >
                    <div class="x_nav_mob-submenu_top_wrap">
                      <div class="x_nav_mob-submenu_back_wrap">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          viewBox="0 0 16 16"
                          fill="none"
                          class="x_nav_mob-submenu_back_ico"
                        >
                          <path
                            d="M7.81382 1.57681L1.39252 7.9981M1.39252 7.9981L7.81382 14.4194M1.39252 7.9981L14.5919 7.9981"
                            stroke="currentColor"
                            stroke-width="1.2"
                          ></path>
                        </svg>
                        <div class="x_nav_mob-submenu_back_text x_u-s-body">
                          Back
                        </div>
                      </div>
                    </div>
                    <div class="x_nav_services_row">
                      <a
                        href="./user-experience-design"
                        class="x_nav_services_link w-inline-block"
                        ><div class="x_nav_services_subtitle x_u-s-body">
                          5 services
                        </div>
                        <div class="x_nav_services_bottom">
                          <div class="x_nav_services_title x_u-l-body">
                            Website design
                          </div>
                          <div
                            class="x_nav_services_ico"
                            data-w-id="d610c7c5-24f2-d9ea-945a-0cfcd107ed78"
                            data-animation-type="lottie"
                            data-src="https://cdn.prod.website-files.com/63f5d378a903c2a12583ce2f/679794ef95917ff41fc56aeb_Research_.json"
                            data-loop="1"
                            data-direction="1"
                            data-autoplay="1"
                            data-is-ix2-target="0"
                            data-renderer="svg"
                            data-default-duration="0"
                            data-duration="0"
                          ></div>
                        </div>
                        <img
                          sizes="(max-width: 479px) 33vw, (max-width: 991px) 32vw, (max-width: 1439px) 26vw, 28vw"
                          srcset="
                            website-design-photo.avif 500w,
                            website-design-photo.avif 880w
                          "
                          alt=""
                          src="website-design-photo.avif"
                          loading="lazy"
                          class="x_nav_services_bg" /></a
                      ><a
                        href="./digital-product-development"
                        class="x_nav_services_link w-inline-block"
                        ><div class="x_nav_services_subtitle x_u-s-body">
                          3 services<br />
                        </div>
                        <div class="x_nav_services_bottom">
                          <div class="x_nav_services_title x_u-l-body">
                            Digital development
                          </div>
                          <div
                            class="x_nav_services_ico"
                            data-w-id="fa53416b-4a48-e610-c193-5b83bc62754d"
                            data-animation-type="lottie"
                            data-src="https://cdn.prod.website-files.com/63f5d378a903c2a12583ce2f/679794eb15de7178c8e4f01c_Development%20%20%20design.json"
                            data-loop="1"
                            data-direction="1"
                            data-autoplay="1"
                            data-is-ix2-target="0"
                            data-renderer="svg"
                            data-default-duration="0"
                            data-duration="0"
                          ></div>
                        </div>
                        <img
                          sizes="(max-width: 479px) 33vw, (max-width: 991px) 32vw, (max-width: 1439px) 26vw, 28vw"
                          srcset="
                            digital-development-photo.avif 500w,
                            digital-development-photo.avif 880w
                          "
                          alt=""
                          src="digital-development-photo.avif"
                          loading="lazy"
                          class="x_nav_services_bg"
                      /></a>
                    </div>
                    <div class="x_nav_services_row">
                      <a
                        href="./branding-agency"
                        class="x_nav_services_link w-inline-block"
                        ><div class="x_nav_services_subtitle x_u-s-body">
                          6 services
                        </div>
                        <div class="x_nav_services_bottom">
                          <div class="x_nav_services_title x_u-l-body">
                            Brand strategy
                          </div>
                          <div
                            class="x_nav_services_ico"
                            data-w-id="bc16c603-9c35-09d0-a6ae-bae8347b9069"
                            data-animation-type="lottie"
                            data-src="https://cdn.prod.website-files.com/63f5d378a903c2a12583ce2f/679794efdc3c639187a65d7b_Rebranding.json"
                            data-loop="1"
                            data-direction="1"
                            data-autoplay="1"
                            data-is-ix2-target="0"
                            data-renderer="svg"
                            data-default-duration="0"
                            data-duration="0"
                          ></div>
                        </div>
                        <img
                          sizes="(max-width: 479px) 31vw, (max-width: 991px) 32vw, (max-width: 1439px) 26vw, 28vw"
                          srcset="
                            brand-strategy-photo.avif 500w,
                            brand-strategy-photo.avif 880w
                          "
                          alt=""
                          src="brand-strategy-photo.avif"
                          loading="lazy"
                          class="x_nav_services_bg" /></a
                      ><a
                        href="./content-creation"
                        class="x_nav_services_link w-inline-block"
                        ><div class="x_nav_services_subtitle x_u-s-body">
                          4 services<br />
                        </div>
                        <div class="x_nav_services_bottom">
                          <div class="x_nav_services_title x_u-l-body">
                            Copywriting
                          </div>
                          <div
                            class="x_nav_services_ico"
                            data-w-id="71786f3f-574d-5780-bb0e-324659351775"
                            data-animation-type="lottie"
                            data-src="https://cdn.prod.website-files.com/63f5d378a903c2a12583ce2f/679794efc7f179e8c5d32b13_Video%20explainers.json"
                            data-loop="1"
                            data-direction="1"
                            data-autoplay="1"
                            data-is-ix2-target="0"
                            data-renderer="svg"
                            data-default-duration="0"
                            data-duration="0"
                          ></div>
                        </div>
                        <img
                          sizes="(max-width: 479px) 31vw, (max-width: 991px) 32vw, (max-width: 1439px) 26vw, 28vw"
                          srcset="
                            copywriting-image.avif 500w,
                            copywriting-image.avif 880w
                          "
                          alt=""
                          src="copywriting-image.avif"
                          loading="lazy"
                          class="x_nav_services_bg"
                      /></a>
                    </div>
                  </div>
                  <div nav-content="about" class="x_nav_content_inner is-about">
                    <div class="x_nav_about_top">
                      <div class="x_nav_about_list">
                        <img
                          src="index/images/67ed6077a8f1afb7593f9e60_Frame%202117936445.svg"
                          loading="lazy"
                          alt=""
                          class="x_nav_about_item"
                        /><img
                          src="index/images/67ed60776bf90d818242f3c3_Frame%202117936443.svg"
                          loading="lazy"
                          alt=""
                          class="x_nav_about_item"
                        /><img
                          src="index/images/67ed6077a8f1afb7593f9e60_Frame%202117936445.svg"
                          loading="lazy"
                          alt=""
                          class="x_nav_about_item"
                        /><img
                          src="index/images/67ed6078b4970079fae7a786_Frame%202117936446.svg"
                          loading="lazy"
                          alt=""
                          class="x_nav_about_item"
                        /><img
                          src="index/images/67ed6078fd113d67387f3cdf_Frame%202117936447.svg"
                          loading="lazy"
                          alt=""
                          class="x_nav_about_item"
                        /><img
                          src="index/images/67ed607742221b592b3f51d3_Frame%202117936448.svg"
                          loading="lazy"
                          alt=""
                          class="x_nav_about_item"
                        />
                      </div>
                      <div class="x_nav_about_list">
                        <img
                          src="index/images/67ed6077a8f1afb7593f9e60_Frame%202117936445.svg"
                          loading="lazy"
                          alt=""
                          class="x_nav_about_item"
                        /><img
                          src="index/images/67ed60776bf90d818242f3c3_Frame%202117936443.svg"
                          loading="lazy"
                          alt=""
                          class="x_nav_about_item"
                        /><img
                          src="index/images/67ed6077a8f1afb7593f9e60_Frame%202117936445.svg"
                          loading="lazy"
                          alt=""
                          class="x_nav_about_item"
                        /><img
                          src="index/images/67ed6078b4970079fae7a786_Frame%202117936446.svg"
                          loading="lazy"
                          alt=""
                          class="x_nav_about_item"
                        /><img
                          src="index/images/67ed6078fd113d67387f3cdf_Frame%202117936447.svg"
                          loading="lazy"
                          alt=""
                          class="x_nav_about_item"
                        /><img
                          src="index/images/67ed607742221b592b3f51d3_Frame%202117936448.svg"
                          loading="lazy"
                          alt=""
                          class="x_nav_about_item"
                        />
                      </div>
                    </div>
                    <div class="x_nav_about_center">
                      QuackStudios
                      <div class="x_nav_about_text x_u-l-body">
                        We are an award-winning full-service digital agency
                        powered by the future itself.
                      </div>
                    </div>
                    <div class="x_nav_about_bottom">
                      <div class="x_nav_about_num_wrap">
                        <div class="x_nav_about_num">10</div>
                        <div class="x_nav_about_num_text">
                          Awards & <br />Recognitions
                        </div>
                      </div>
                      <div class="x_nav_about_num_wrap">
                        <div class="x_nav_about_num">100+</div>
                        <div class="x_nav_about_num_text">
                          Finished <br />projects
                        </div>
                      </div>
                      <div class="x_nav_about_num_wrap">
                        <div class="x_nav_about_num">4</div>
                        <div class="x_nav_about_num_text">
                          Main <br />Services
                        </div>
                      </div>
                    </div>
                  </div>
                  <div nav-content="works" class="x_nav_content_inner is-works">
                    <div class="x_nav_mob-submenu_top_wrap">
                      <div class="x_nav_mob-submenu_back_wrap">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          viewBox="0 0 16 16"
                          fill="none"
                          class="x_nav_mob-submenu_back_ico"
                        >
                          <path
                            d="M7.81382 1.57681L1.39252 7.9981M1.39252 7.9981L7.81382 14.4194M1.39252 7.9981L14.5919 7.9981"
                            stroke="currentColor"
                            stroke-width="1.2"
                          ></path>
                        </svg>
                        <div class="x_nav_mob-submenu_back_text x_u-s-body">
                          Back
                        </div>
                      </div>
                      <a
                        href="./projects.html"
                        class="x_nav_mob-submenu_top_link w-inline-block"
                        ><div class="x_nav_mob-submenu_top_title x_u-l-body">
                          Open all works
                        </div></a
                      >
                    </div>
                    <div class="x_nav_projects_cms w-dyn-list">
                      <div
                        role="list"
                        class="x_nav_projects_slider w-dyn-items"
                      >
                        <div
                          role="listitem"
                          class="x_nav_projects_slide w-dyn-item"
                        >
                          <div class="x_nav_projects_top">
                            <div class="x_nav_projects_subtitle x_u-s-body">
                              Featured Project
                            </div>
                            <div class="x_nav_projects_title">Project 1</div>
                          </div>
                          <div class="x_nav_projects_bottom">
                            <img
                              src="index/images/ej9la3l6JfVk.webp"
                              loading="lazy"
                              alt="TheRealDeal"
                              sizes="100vw"
                              srcset="
                                index/images/jr5NGcOsenAf.webp  500w,
                                index/images/ZbVdlnMgm3we.webp  800w,
                                index/images/HgfIm4lsGk0n.webp 1080w,
                                index/images/ej9la3l6JfVk.webp 1580w
                              "
                              class="x_nav_projects_img"
                            /><a
                              href="https://www.quackstudios.com.au/projects/therealdeal"
                              class="x_nav_projects_btn w-inline-block"
                              ><div class="x_nav_projects_btn_text">
                                Explore
                              </div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="100%"
                                viewBox="0 0 16 16"
                                fill="none"
                                class="x_nav_projects_btn_ico"
                              >
                                <g clip-path="url(#clip0_5651_52427)">
                                  <path
                                    d="M8.0026 14.6654C11.6845 14.6654 14.6693 11.6806 14.6693 7.9987C14.6693 4.3168 11.6845 1.33203 8.0026 1.33203C4.32071 1.33203 1.33594 4.3168 1.33594 7.9987C1.33594 11.6806 4.32071 14.6654 8.0026 14.6654Z"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M10.6693 7.9987H5.33594M10.6693 7.9987C10.6693 7.5319 9.33974 6.65972 9.0026 6.33203M10.6693 7.9987C10.6693 8.4655 9.33974 9.3377 9.0026 9.66536"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </g></svg
                            ></a>
                          </div>
                        </div>
                        <div
                          role="listitem"
                          class="x_nav_projects_slide w-dyn-item"
                        >
                          <div class="x_nav_projects_top">
                            <div class="x_nav_projects_subtitle x_u-s-body">
                              Featured Project
                            </div>
                            <div class="x_nav_projects_title">Project 2</div>
                          </div>
                          <div class="x_nav_projects_bottom">
                            <img
                              src="index/images/68061a2f62e232e2d8332615_project%20cart-1.avif"
                              loading="lazy"
                              alt="Condomini"
                              sizes="100vw"
                              srcset="
                                index/images/68061a2f62e232e2d8332615_project%20cart-1-p-500.avif  500w,
                                index/images/68061a2f62e232e2d8332615_project%20cart-1-p-800.avif  800w,
                                index/images/68061a2f62e232e2d8332615_project%20cart-1.avif       1620w
                              "
                              class="x_nav_projects_img"
                            /><a
                              href="https://www.quackstudios.com.au/projects/condomini"
                              class="x_nav_projects_btn w-inline-block"
                              ><div class="x_nav_projects_btn_text">
                                Explore
                              </div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="100%"
                                viewBox="0 0 16 16"
                                fill="none"
                                class="x_nav_projects_btn_ico"
                              >
                                <g clip-path="url(#clip0_5651_52427)">
                                  <path
                                    d="M8.0026 14.6654C11.6845 14.6654 14.6693 11.6806 14.6693 7.9987C14.6693 4.3168 11.6845 1.33203 8.0026 1.33203C4.32071 1.33203 1.33594 4.3168 1.33594 7.9987C1.33594 11.6806 4.32071 14.6654 8.0026 14.6654Z"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M10.6693 7.9987H5.33594M10.6693 7.9987C10.6693 7.5319 9.33974 6.65972 9.0026 6.33203M10.6693 7.9987C10.6693 8.4655 9.33974 9.3377 9.0026 9.66536"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </g></svg
                            ></a>
                          </div>
                        </div>
                        <div
                          role="listitem"
                          class="x_nav_projects_slide w-dyn-item"
                        >
                          <div class="x_nav_projects_top">
                            <div class="x_nav_projects_subtitle x_u-s-body">
                              Featured Project
                            </div>
                            <div class="x_nav_projects_title">Project 3</div>
                          </div>
                          <div class="x_nav_projects_bottom">
                            <img
                              src="index/images/8kLjuA4kGSlI.png"
                              loading="lazy"
                              alt="Smarthost"
                              sizes="100vw"
                              srcset="
                                index/images/hg6SxmpJlfNA.png  500w,
                                index/images/cDGnUkkHTnu5.png  800w,
                                index/images/5TdfBO0unlml.png 1080w,
                                index/images/8kLjuA4kGSlI.png 1580w
                              "
                              class="x_nav_projects_img"
                            /><a
                              href="https://www.quackstudios.com.au/projects/smarthost"
                              class="x_nav_projects_btn w-inline-block"
                              ><div class="x_nav_projects_btn_text">
                                Explore
                              </div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="100%"
                                viewBox="0 0 16 16"
                                fill="none"
                                class="x_nav_projects_btn_ico"
                              >
                                <g clip-path="url(#clip0_5651_52427)">
                                  <path
                                    d="M8.0026 14.6654C11.6845 14.6654 14.6693 11.6806 14.6693 7.9987C14.6693 4.3168 11.6845 1.33203 8.0026 1.33203C4.32071 1.33203 1.33594 4.3168 1.33594 7.9987C1.33594 11.6806 4.32071 14.6654 8.0026 14.6654Z"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M10.6693 7.9987H5.33594M10.6693 7.9987C10.6693 7.5319 9.33974 6.65972 9.0026 6.33203M10.6693 7.9987C10.6693 8.4655 9.33974 9.3377 9.0026 9.66536"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </g></svg
                            ></a>
                          </div>
                        </div>
                        <div
                          role="listitem"
                          class="x_nav_projects_slide w-dyn-item"
                        >
                          <div class="x_nav_projects_top">
                            <div class="x_nav_projects_subtitle x_u-s-body">
                              Featured Project
                            </div>
                            <div class="x_nav_projects_title color-fade-text">
                              Project 4
                            </div>
                          </div>
                          <div class="x_nav_projects_bottom">
                            <img
                              src="index/images/reZalrd2OdG1.avif"
                              loading="lazy"
                              alt="Changing education"
                              sizes="100vw"
                              srcset="
                                index/images/3eVIVwwWsarl.avif  500w,
                                index/images/KGUzQrdyAVLb.avif  800w,
                                index/images/reZalrd2OdG1.avif 1612w
                              "
                              class="x_nav_projects_img"
                            /><a
                              href="https://www.quackstudios.com.au/projects/changing-education"
                              class="x_nav_projects_btn w-inline-block"
                              ><div class="x_nav_projects_btn_text">
                                Explore
                              </div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="100%"
                                viewBox="0 0 16 16"
                                fill="none"
                                class="x_nav_projects_btn_ico"
                              >
                                <g clip-path="url(#clip0_5651_52427)">
                                  <path
                                    d="M8.0026 14.6654C11.6845 14.6654 14.6693 11.6806 14.6693 7.9987C14.6693 4.3168 11.6845 1.33203 8.0026 1.33203C4.32071 1.33203 1.33594 4.3168 1.33594 7.9987C1.33594 11.6806 4.32071 14.6654 8.0026 14.6654Z"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M10.6693 7.9987H5.33594M10.6693 7.9987C10.6693 7.5319 9.33974 6.65972 9.0026 6.33203M10.6693 7.9987C10.6693 8.4655 9.33974 9.3377 9.0026 9.66536"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </g></svg
                            ></a>
                          </div>
                        </div>
                        <div
                          role="listitem"
                          class="x_nav_projects_slide w-dyn-item"
                        >
                          <div class="x_nav_projects_top">
                            <div class="x_nav_projects_subtitle x_u-s-body">
                              Featured Project
                            </div>
                            <div class="x_nav_projects_title color-fade-text">Project 5</div>
                          </div>
                          <div class="x_nav_projects_bottom">
                            <img
                              src="index/images/YDDDXUAVh7A1.webp"
                              loading="lazy"
                              alt="Dan John"
                              sizes="100vw"
                              srcset="
                                index/images/YYYpnWx6xVKb.webp  500w,
                                index/images/oIhAJyrOfT2z.webp  800w,
                                index/images/u270Bcc1Yj7c.webp 1080w,
                                index/images/AunrOsOEOkey.webp 1600w,
                                index/images/YDDDXUAVh7A1.webp 1620w
                              "
                              class="x_nav_projects_img"
                            /><a
                              href="https://www.quackstudios.com.au/projects/danjohn"
                              class="x_nav_projects_btn w-inline-block"
                              ><div class="x_nav_projects_btn_text">
                                Explore
                              </div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="100%"
                                viewBox="0 0 16 16"
                                fill="none"
                                class="x_nav_projects_btn_ico"
                              >
                                <g clip-path="url(#clip0_5651_52427)">
                                  <path
                                    d="M8.0026 14.6654C11.6845 14.6654 14.6693 11.6806 14.6693 7.9987C14.6693 4.3168 11.6845 1.33203 8.0026 1.33203C4.32071 1.33203 1.33594 4.3168 1.33594 7.9987C1.33594 11.6806 4.32071 14.6654 8.0026 14.6654Z"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M10.6693 7.9987H5.33594M10.6693 7.9987C10.6693 7.5319 9.33974 6.65972 9.0026 6.33203M10.6693 7.9987C10.6693 8.4655 9.33974 9.3377 9.0026 9.66536"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </g></svg
                            ></a>
                          </div>
                        </div>
                        <div
                          role="listitem"
                          class="x_nav_projects_slide w-dyn-item"
                        >
                          <div class="x_nav_projects_top">
                            <div class="x_nav_projects_subtitle x_u-s-body">
                              Featured Project
                            </div>
                            <div class="x_nav_projects_title color-fade-text">Project 6</div>
                          </div>
                          <div class="x_nav_projects_bottom">
                            <img
                              src="index/images/rJSV8oiUpjHp.png"
                              loading="lazy"
                              alt="Mobilhub"
                              sizes="100vw"
                              srcset="
                                index/images/O3ZyHsntMO2k.png  500w,
                                index/images/rrNSoyHpNujD.png  800w,
                                index/images/6qxY250h9tNw.png 1080w,
                                index/images/rJSV8oiUpjHp.png 1580w
                              "
                              class="x_nav_projects_img"
                            /><a
                              href="https://www.quackstudios.com.au/projects/mobilhub"
                              class="x_nav_projects_btn w-inline-block"
                              ><div class="x_nav_projects_btn_text">
                                Explore
                              </div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="100%"
                                viewBox="0 0 16 16"
                                fill="none"
                                class="x_nav_projects_btn_ico"
                              >
                                <g clip-path="url(#clip0_5651_52427)">
                                  <path
                                    d="M8.0026 14.6654C11.6845 14.6654 14.6693 11.6806 14.6693 7.9987C14.6693 4.3168 11.6845 1.33203 8.0026 1.33203C4.32071 1.33203 1.33594 4.3168 1.33594 7.9987C1.33594 11.6806 4.32071 14.6654 8.0026 14.6654Z"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M10.6693 7.9987H5.33594M10.6693 7.9987C10.6693 7.5319 9.33974 6.65972 9.0026 6.33203M10.6693 7.9987C10.6693 8.4655 9.33974 9.3377 9.0026 9.66536"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </g></svg
                            ></a>
                          </div>
                        </div>
                        <div
                          role="listitem"
                          class="x_nav_projects_slide w-dyn-item"
                        >
                          <div class="x_nav_projects_top">
                            <div class="x_nav_projects_subtitle x_u-s-body">
                              Featured Project
                            </div>
                            <div class="x_nav_projects_title">Project 7</div>
                          </div>
                          <div class="x_nav_projects_bottom">
                            <img
                              src="index/images/DI6VZrTFPS9v.webp"
                              loading="lazy"
                              alt="Unicef"
                              sizes="100vw"
                              srcset="
                                index/images/pSZk3syYkp8q.webp  500w,
                                index/images/drlKd7z66WNX.webp  800w,
                                index/images/FhvLrPKhR5Ex.webp 1080w,
                                index/images/DI6VZrTFPS9v.webp 1580w
                              "
                              class="x_nav_projects_img"
                            /><a
                              href="https://www.quackstudios.com.au/projects/unicef"
                              class="x_nav_projects_btn w-inline-block"
                              ><div class="x_nav_projects_btn_text">
                                Explore
                              </div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="100%"
                                viewBox="0 0 16 16"
                                fill="none"
                                class="x_nav_projects_btn_ico"
                              >
                                <g clip-path="url(#clip0_5651_52427)">
                                  <path
                                    d="M8.0026 14.6654C11.6845 14.6654 14.6693 11.6806 14.6693 7.9987C14.6693 4.3168 11.6845 1.33203 8.0026 1.33203C4.32071 1.33203 1.33594 4.3168 1.33594 7.9987C1.33594 11.6806 4.32071 14.6654 8.0026 14.6654Z"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M10.6693 7.9987H5.33594M10.6693 7.9987C10.6693 7.5319 9.33974 6.65972 9.0026 6.33203M10.6693 7.9987C10.6693 8.4655 9.33974 9.3377 9.0026 9.66536"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </g></svg
                            ></a>
                          </div>
                        </div>
                        <div
                          role="listitem"
                          class="x_nav_projects_slide w-dyn-item"
                        >
                          <div class="x_nav_projects_top">
                            <div class="x_nav_projects_subtitle x_u-s-body">
                              Featured Project
                            </div>
                            <div class="x_nav_projects_title">
                              Project 8
                            </div>
                          </div>
                          <div class="x_nav_projects_bottom">
                            <img
                              src="index/images/7CXkeQbpBJ13.webp"
                              loading="lazy"
                              alt="Josh Wood Colour"
                              sizes="100vw"
                              srcset="
                                index/images/JBjbcmHEIuL1.webp  500w,
                                index/images/zG23IrWTolyo.webp  800w,
                                index/images/9ciFwNHIhrbX.webp 1080w,
                                index/images/7CXkeQbpBJ13.webp 1580w
                              "
                              class="x_nav_projects_img"
                            /><a
                              href="https://www.quackstudios.com.au/projects/josh-wood-colour"
                              class="x_nav_projects_btn w-inline-block"
                              ><div class="x_nav_projects_btn_text">
                                Explore
                              </div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="100%"
                                viewBox="0 0 16 16"
                                fill="none"
                                class="x_nav_projects_btn_ico"
                              >
                                <g clip-path="url(#clip0_5651_52427)">
                                  <path
                                    d="M8.0026 14.6654C11.6845 14.6654 14.6693 11.6806 14.6693 7.9987C14.6693 4.3168 11.6845 1.33203 8.0026 1.33203C4.32071 1.33203 1.33594 4.3168 1.33594 7.9987C1.33594 11.6806 4.32071 14.6654 8.0026 14.6654Z"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M10.6693 7.9987H5.33594M10.6693 7.9987C10.6693 7.5319 9.33974 6.65972 9.0026 6.33203M10.6693 7.9987C10.6693 8.4655 9.33974 9.3377 9.0026 9.66536"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </g></svg
                            ></a>
                          </div>
                        </div>
                        <div
                          role="listitem"
                          class="x_nav_projects_slide w-dyn-item"
                        >
                          <div class="x_nav_projects_top">
                            <div class="x_nav_projects_subtitle x_u-s-body">
                              Featured Project
                            </div>
                            <div class="x_nav_projects_title">
                              Project 9
                            </div>
                          </div>
                          <div class="x_nav_projects_bottom">
                            <img
                              src="index/images/680f6386992e17ee76e30dbc_Bleed%20Esport.webp"
                              loading="lazy"
                              alt="Bleed Esports"
                              sizes="100vw"
                              srcset="
                                index/images/680f6386992e17ee76e30dbc_Bleed%20Esport-p-500.webp   500w,
                                index/images/680f6386992e17ee76e30dbc_Bleed%20Esport-p-800.webp   800w,
                                index/images/680f6386992e17ee76e30dbc_Bleed%20Esport-p-1080.webp 1080w,
                                index/images/680f6386992e17ee76e30dbc_Bleed%20Esport.webp        1580w
                              "
                              class="x_nav_projects_img"
                            /><a
                              href="https://www.quackstudios.com.au/projects/bleed-esports"
                              class="x_nav_projects_btn w-inline-block"
                              ><div class="x_nav_projects_btn_text">
                                Explore
                              </div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="100%"
                                viewBox="0 0 16 16"
                                fill="none"
                                class="x_nav_projects_btn_ico"
                              >
                                <g clip-path="url(#clip0_5651_52427)">
                                  <path
                                    d="M8.0026 14.6654C11.6845 14.6654 14.6693 11.6806 14.6693 7.9987C14.6693 4.3168 11.6845 1.33203 8.0026 1.33203C4.32071 1.33203 1.33594 4.3168 1.33594 7.9987C1.33594 11.6806 4.32071 14.6654 8.0026 14.6654Z"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M10.6693 7.9987H5.33594M10.6693 7.9987C10.6693 7.5319 9.33974 6.65972 9.0026 6.33203M10.6693 7.9987C10.6693 8.4655 9.33974 9.3377 9.0026 9.66536"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </g></svg
                            ></a>
                          </div>
                        </div>
                        <div
                          role="listitem"
                          class="x_nav_projects_slide w-dyn-item"
                        >
                          <div class="x_nav_projects_top">
                            <div class="x_nav_projects_subtitle x_u-s-body">
                              Featured Project
                            </div>
                            <div class="x_nav_projects_title">Project 10</div>
                          </div>
                          <div class="x_nav_projects_bottom">
                            <img
                              src="index/images/1VZrQmRJanHd.png"
                              loading="lazy"
                              alt="PhishPhinder"
                              sizes="100vw"
                              srcset="
                                index/images/meeeWbBSKvuv.png  500w,
                                index/images/QGwHeBheqeiA.png  800w,
                                index/images/8Gw93Yyq3Sq5.png 1080w,
                                index/images/1VZrQmRJanHd.png 1580w
                              "
                              class="x_nav_projects_img"
                            /><a
                              href="https://www.quackstudios.com.au/projects/phishphinder"
                              class="x_nav_projects_btn w-inline-block"
                              ><div class="x_nav_projects_btn_text">
                                Explore
                              </div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="100%"
                                viewBox="0 0 16 16"
                                fill="none"
                                class="x_nav_projects_btn_ico"
                              >
                                <g clip-path="url(#clip0_5651_52427)">
                                  <path
                                    d="M8.0026 14.6654C11.6845 14.6654 14.6693 11.6806 14.6693 7.9987C14.6693 4.3168 11.6845 1.33203 8.0026 1.33203C4.32071 1.33203 1.33594 4.3168 1.33594 7.9987C1.33594 11.6806 4.32071 14.6654 8.0026 14.6654Z"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M10.6693 7.9987H5.33594M10.6693 7.9987C10.6693 7.5319 9.33974 6.65972 9.0026 6.33203M10.6693 7.9987C10.6693 8.4655 9.33974 9.3377 9.0026 9.66536"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </g></svg
                            ></a>
                          </div>
                        </div>
                        <div
                          role="listitem"
                          class="x_nav_projects_slide w-dyn-item"
                        >
                          <div class="x_nav_projects_top">
                            <div class="x_nav_projects_subtitle x_u-s-body">
                              Featured Project
                            </div>
                            <div class="x_nav_projects_title">Project 11</div>
                          </div>
                          <div class="x_nav_projects_bottom">
                            <img
                              src="index/images/680618a0105cc6a4448921fe_project%20cart-5.avif"
                              loading="lazy"
                              alt="DepthsTech"
                              sizes="100vw"
                              srcset="
                                index/images/680618a0105cc6a4448921fe_project%20cart-5-p-500.avif   500w,
                                index/images/680618a0105cc6a4448921fe_project%20cart-5-p-800.avif   800w,
                                index/images/680618a0105cc6a4448921fe_project%20cart-5-p-1080.avif 1080w,
                                index/images/680618a0105cc6a4448921fe_project%20cart-5.avif        1620w
                              "
                              class="x_nav_projects_img"
                            /><a
                              href="https://www.quackstudios.com.au/projects/depthstech"
                              class="x_nav_projects_btn w-inline-block"
                              ><div class="x_nav_projects_btn_text">
                                Explore
                              </div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="100%"
                                viewBox="0 0 16 16"
                                fill="none"
                                class="x_nav_projects_btn_ico"
                              >
                                <g clip-path="url(#clip0_5651_52427)">
                                  <path
                                    d="M8.0026 14.6654C11.6845 14.6654 14.6693 11.6806 14.6693 7.9987C14.6693 4.3168 11.6845 1.33203 8.0026 1.33203C4.32071 1.33203 1.33594 4.3168 1.33594 7.9987C1.33594 11.6806 4.32071 14.6654 8.0026 14.6654Z"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M10.6693 7.9987H5.33594M10.6693 7.9987C10.6693 7.5319 9.33974 6.65972 9.0026 6.33203M10.6693 7.9987C10.6693 8.4655 9.33974 9.3377 9.0026 9.66536"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </g></svg
                            ></a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="x_nav_projects_nav_btn is-prev">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        viewBox="0 0 16 16"
                        fill="none"
                        class="x_nav_projects_nav_ico"
                      >
                        <path
                          d="M7.82163 1.58071L1.40034 8.00201M1.40034 8.00201L7.82163 14.4233M1.40034 8.00201H14.5997"
                          stroke="currentColor"
                          stroke-width="1.5"
                        ></path>
                      </svg>
                    </div>
                    <div class="x_nav_projects_nav_btn is-next">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        viewBox="0 0 16 16"
                        fill="none"
                        class="x_nav_projects_nav_ico"
                      >
                        <path
                          d="M8.17837 1.58071L14.5997 8.00201M14.5997 8.00201L8.17837 14.4233M14.5997 8.00201H1.40034"
                          stroke="currentColor"
                          stroke-width="1.5"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div
                    nav-content="insights"
                    class="x_nav_content_inner is-insights"
                  >
                    <div class="x_nav_mob-submenu_top_wrap">
                      <div class="x_nav_mob-submenu_back_wrap">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          viewBox="0 0 16 16"
                          fill="none"
                          class="x_nav_mob-submenu_back_ico"
                        >
                          <path
                            d="M7.81382 1.57681L1.39252 7.9981M1.39252 7.9981L7.81382 14.4194M1.39252 7.9981L14.5919 7.9981"
                            stroke="currentColor"
                            stroke-width="1.2"
                          ></path>
                        </svg>
                        <div class="x_nav_mob-submenu_back_text x_u-s-body">
                          Back
                        </div>
                      </div>
                      <a
                        href="./blog.html"
                        class="x_nav_mob-submenu_top_link w-inline-block"
                        ><div class="x_nav_mob-submenu_top_title x_u-l-body">
                          Open all insights
                        </div></a
                      >
                    </div>
                    <div class="x_nav_insights_cms w-dyn-list">
                      <div role="list" class="x_nav_insights_list w-dyn-items">
                        <div
                          role="listitem"
                          class="x_nav_insights_item w-dyn-item"
                        >
                          <a
                            href="why-most-experts-never-have-to-live-with-the-result.html"
                            class="x_nav_insights_link w-inline-block"
                            ><div class="x_nav_insights_img_wrap">
                              <img
                                src="insights/images/uks3bnbjAUsw.webp"
                                loading="lazy"
                                alt=""
                                sizes="100vw"
                                srcset="
                                  insights/images/uks3bnbjAUsw.webp   500w,
                                  insights/images/uks3bnbjAUsw.webp   800w,
                                  insights/images/uks3bnbjAUsw.webp   1080w,
                                  insights/images/uks3bnbjAUsw.webp   1598w
                                "
                                class="x_nav_insights_img"
                              />
                            </div>
                            <div class="x_nav_insights_content">
                              <div class="x_nav_insights_service x_u-s-body">
                                UX/UI
                              </div>
                              <div class="x_nav_insights_title x_u-s-body">
                          Why Most “Experts” Never Have to Live With the Result
                              </div>
                            </div></a
                          >
                        </div>
                        <div
                          role="listitem"
                          class="x_nav_insights_item w-dyn-item"
                        >
                          <a
                            href="Flexible Scope Issues.html"
                            class="x_nav_insights_link w-inline-block"
                            ><div class="x_nav_insights_img_wrap">
                              <img
                                src="insights/images/4RwXcr8j9F21.webp"
                                loading="lazy"
                                alt=""
                                sizes="100vw"
                                srcset="
                                  insights/images/4RwXcr8j9F21.webp 500w,
                                  insights/images/4RwXcr8j9F21.webp 799w
                                "
                                class="x_nav_insights_img"
                              />
                            </div>
                            <div class="x_nav_insights_content">
                              <div class="x_nav_insights_service x_u-s-body">
                                UX/UI
                              </div>
                              <div class="x_nav_insights_title x_u-s-body">
                                Why “Flexible Scope” Is a Red Flag
                              </div>
                            </div></a
                          >
                        </div>
                        <div
                          role="listitem"
                          class="x_nav_insights_item w-dyn-item"
                        >
                          <a
                            href="Website vs Business. What's Confusing.html"
                            class="x_nav_insights_link w-inline-block"
                            ><div class="x_nav_insights_img_wrap">
                              <img
                                src="insights/images/UZLywOz1Yi9Q.webp"
                                loading="lazy"
                                alt=""
                                sizes="100vw"
                                srcset="
                                  insights/images/UZLywOz1Yi9Q.webp  500w,
                                  insights/images/UZLywOz1Yi9Q.webp  800w,
                                  insights/images/UZLywOz1Yi9Q.webp 1080w,
                                  insights/images/UZLywOz1Yi9Q.webp 1598w
                                "
                                class="x_nav_insights_img"
                              />
                            </div>
                            <div class="x_nav_insights_content">
                              <div class="x_nav_insights_service x_u-s-body">
                                UX/UI
                              </div>
                              <div class="x_nav_insights_title x_u-s-body">       
                          The Website Isn’t Confusing. The Business Is.
                              </div>
                            </div></a
                          >
                        </div>
                        <div
                          role="listitem"
                          class="x_nav_insights_item w-dyn-item"
                        >
                          <a
                            href="full-service-agency-vs-bespoke-solution.html"
                            class="x_nav_insights_link w-inline-block"
                            ><div class="x_nav_insights_img_wrap">
                              <img
                                src="insights/images/ISQn8QE3qgD3.webp"
                                loading="lazy"
                                alt=""
                                sizes="100vw"
                                srcset="
                                  insights/images/ISQn8QE3qgD3.webp  500w,
                                  insights/images/ISQn8QE3qgD3.webp  800w,
                                  insights/images/ISQn8QE3qgD3.webp 1080w,
                                  insights/images/ISQn8QE3qgD3.webp 1598w
                                "
                                class="x_nav_insights_img"
                              />
                            </div>
                            <div class="x_nav_insights_content">
                              <div class="x_nav_insights_service x_u-s-body">
                                UX/UI
                              </div>
                              <div class="x_nav_insights_title x_u-s-body">
                         Why Full-Service Agencies Make Websites Worse
                              </div>
                            </div></a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    nav-content="contact"
                    class="x_nav_content_inner is-contact"
                  >
                    <div class="x_nav_contact_wrap">
                      <div class="x_nav_contact_top_wrap">
                        <div class="x_nav_contact_img_wrap">
                          <img
                            sizes="(max-width: 1090px) 100vw, 1090px"
                            srcset="
                              emilia-maren.png 500w,
                              emilia-maren.png 800w,
                              emilia-maren.png 1080w,
                              emilia-maren.png 1090w
                            "
                            alt="Ruben Roubish"
                            src="emilia-maren.png"
                            loading="lazy"
                            class="x_nav_contact_img"
                          />
                        </div>
                        <div class="menu_contact_rail_wrap">
                          <div class="menu_contact_rail_inner">
                            <div class="menu_contact_rail_text">
                              Get in touch!
                            </div>
                            <div class="menu_contact_rail_text">—</div>
                            <div class="menu_contact_rail_text">
                              Get in touch!
                            </div>
                            <div class="menu_contact_rail_text">—</div>
                            <div class="menu_contact_rail_text">
                              Get in touch!
                            </div>
                            <div class="menu_contact_rail_text">—</div>
                          </div>
                          <div class="menu_contact_rail_inner">
                            <div class="menu_contact_rail_text">
                              Get in touch!
                            </div>
                            <div class="menu_contact_rail_text">—</div>
                            <div class="menu_contact_rail_text">
                              Get in touch!
                            </div>
                            <div class="menu_contact_rail_text">—</div>
                            <div class="menu_contact_rail_text">
                              Get in touch!
                            </div>
                            <div class="menu_contact_rail_text">—</div>
                          </div>
                        </div>
                      </div>
                      <address class="menu_contact_mid_wrap">
                        <div class="menu_contact_link_wrap">
                          <a
                            href="tel:0721134700"
                            class="menu_contact_link x_u-l-body"
                            >(07) 2113 4700</a
                          ><a
                            href="mailto:hello@quackstudios.com.au"
                            class="menu_contact_link x_u-l-body"
                            >hello@quackstudios.com.au</a
                          >
                        </div>
                        <div class="menu_contact_adres x_u-s-body">
                          Level 7/154 Melbourne St <br> South Brisbane QLD 4000
                        </div>
                      </address>
                      <div class="menu_contact_socials_wrap">
                        <a
                          href="https://www.instagram.com/neongoosestudios/"
                          target="_blank"
                          class="menu_contact_socials_link x_u-s-body"
                          >Instagram</a
                        ><a
                          href="https://au.linkedin.com/company/quackstudiosaustralia"
                          target="_blank"
                          class="menu_contact_socials_link x_u-s-body"
                          >LinkedIn</a
                        ><a
                          href="https://www.facebook.com/people/QuackStudios/61569291452180/"
                          target="_blank"
                          class="menu_contact_socials_link x_u-s-body"
                          >Facebook</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  href="#"
                  class="x_nav_contact-btn_link is-consult w-inline-block open-koalender"
                  data-cal-open
                  ><div class="x_nav_contact-btn_text">
                    Get free consultation
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 16 16"
                    fill="none"
                    class="x_nav_contact-btn_ico"
                  >
                    <g clip-path="url(#clip0_5651_52427)">
                      <path
                        d="M8.0026 14.6654C11.6845 14.6654 14.6693 11.6806 14.6693 7.9987C14.6693 4.3168 11.6845 1.33203 8.0026 1.33203C4.32071 1.33203 1.33594 4.3168 1.33594 7.9987C1.33594 11.6806 4.32071 14.6654 8.0026 14.6654Z"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M10.6693 7.9987H5.33594M10.6693 7.9987C10.6693 7.5319 9.33974 6.65972 9.0026 6.33203M10.6693 7.9987C10.6693 8.4655 9.33974 9.3377 9.0026 9.66536"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </g></svg></a
                ><a
                  href="#"
                  class="x_nav_contact-btn_link is-services w-inline-block"
                  ><div class="x_nav_contact-btn_text">
                    Explore our Services
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 14 14"
                    fill="none"
                    class="x_nav_contact-btn_ico"
                  >
                    <g clip-path="url(#clip0_6684_109660)">
                      <path
                        d="M1.16781 7.00228C1.16781 10.2239 3.77948 12.8356 7.00114 12.8356C10.2228 12.8356 12.8345 10.2239 12.8345 7.00228C12.8345 3.78062 10.2228 1.16895 7.00114 1.16895C3.77948 1.16894 1.16781 3.78062 1.16781 7.00228Z"
                        stroke="currentColor"
                        stroke-width="0.75"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M7.00114 9.33561L7.00114 4.66895M7.00114 9.33561C7.40959 9.33561 8.17275 8.17227 8.45947 7.87728M7.00114 9.33561C6.59269 9.33561 5.82951 8.17227 5.54281 7.87728"
                        stroke="currentColor"
                        stroke-width="0.75"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </g></svg
                ></a>
              </div>
            </div>
          </div>
          <div fs-scrolldisable-element="when-visible" class="x_nav_bg"></div>
        </div>
    `;

    // Parse HTML without wrapping div
    const template = document.createElement("template");
    template.innerHTML = raw.trim();

    const fragment = template.content;

    // Decide where to insert
    const preSticky = pane.querySelector("#pre-sticky-intro");
    const header = pane.querySelector("header.navigation");

    if (preSticky) {
      preSticky.insertAdjacentElement("afterend", fragment.firstElementChild);
    } else if (header) {
      header.insertAdjacentElement("afterend", fragment.firstElementChild);
    } else {
      pane.prepend(fragment.firstElementChild);
    }
  } catch (e) {
    console.error("[injectScrollMenu]", e);
  }
}

function __injectNewSection() {
  try {
    const pane = document.querySelector(".lenisscroll-pane");
    if (!pane) return;

    // CHANGE THIS to something unique in your markup
    if (pane.querySelector(".x_bc-header_services_wrap")) return;

    const raw = `
      <div
          fs-scrolldisable-element="when-visible"
          class="x_bc-header_services_wrap"
        >
          <div class="x_bc-header_services_css x_u-display-none w-embed">
          </div>
          <div
            fs-scrolldisable-element="preserve"
            class="x_bc-header_services_inner"
          >
            <div class="x_bc-header_services_container">
              <div class="x_bc-header_services_card_wrap">
                <a
                  data-w-id="8618ad9d-ba0c-ee25-b3dd-e2b1130d5526"
                  href="./user-experience-design"
                  class="x_bc-header_services_card_link w-inline-block"
                  ><div class="x_bc-header_services_card_inner-02">
                    <div class="x_bc-header_services_card_inner is-01">
                      <img
                        src="brand-strategy-photo.avif"
                        loading="eager"
                        sizes="(max-width: 880px) 100vw, 880px"
                        srcset="
                          brand-strategy-photo.avif 500w,
                          brand-strategy-photo.avif 880w
                        "
                        alt=""
                        class="x_bc-header_services_card_img"
                      />
                      <div class="x_bc-header_services_card_bottom">
                        <div class="x_bc-header_services_card_title_wrap">
                          <div
                            class="x_bc-header_services_card_title x_u-heading-4"
                          >
                            Brand Strategy
                          </div>
                          <div
                            class="x_bc-header_services_card_more x_u-s-body"
                          >
                            Learn more
                          </div>
                        </div>
                        <div class="x_bc-header_services_card_num x_u-s-body">
                          01
                        </div>
                      </div>
                    </div>
                  </div></a
                >
              </div>
              <div class="x_bc-header_services_card_wrap">
                <a
                  data-w-id="982f1869-3131-d98f-1f62-07a02bc39e4a"
                  href="website-development.html"
                  class="x_bc-header_services_card_link w-inline-block"
                  ><div class="x_bc-header_services_card_inner-02">
                    <div class="x_bc-header_services_card_inner is-02">
                      <img
                        src="website-design-photo.avif"
                        loading="eager"
                        alt=""
                        class="x_bc-header_services_card_img"
                      />
                      <div class="x_bc-header_services_card_bottom">
                        <div class="x_bc-header_services_card_title_wrap">
                          <div
                            class="x_bc-header_services_card_title x_u-heading-4"
                          >
                            Website Design
                          </div>
                          <div
                            class="x_bc-header_services_card_more x_u-s-body"
                          >
                            Learn more
                          </div>
                        </div>
                        <div class="x_bc-header_services_card_num x_u-s-body">
                          02
                        </div>
                      </div>
                    </div>
                  </div></a
                >
              </div>
              <div class="x_bc-header_services_card_wrap">
                <a
                  data-w-id="fc23a484-e790-05f8-0193-1a6935f2c613"
                  href="./digital-product-development"
                  class="x_bc-header_services_card_link w-inline-block"
                  ><div class="x_bc-header_services_card_inner-02">
                    <div class="x_bc-header_services_card_inner is-03">
                      <img
                        src="digital-development-photo.avif"
                        loading="eager"
                        sizes="(max-width: 880px) 100vw, 880px"
                        srcset="
                          digital-development-photo.avif 500w,
                          digital-development-photo.avif 880w
                        "
                        alt=""
                        class="x_bc-header_services_card_img"
                      />
                      <div class="x_bc-header_services_card_bottom">
                        <div class="x_bc-header_services_card_title_wrap">
                          <div
                            class="x_bc-header_services_card_title x_u-heading-4"
                          >
                            Digital Development
                          </div>
                          <div
                            class="x_bc-header_services_card_more x_u-s-body"
                          >
                            Learn more
                          </div>
                        </div>
                        <div class="x_bc-header_services_card_num x_u-s-body">
                          03
                        </div>
                      </div>
                    </div>
                  </div></a
                >
              </div>
              <div class="x_bc-header_services_card_wrap">
                <a
                  data-w-id="b1cf9564-92f9-e06e-962c-5fa6d9b60bef"
                  href="./branding-agency"
                  class="x_bc-header_services_card_link w-inline-block"
                  ><div class="x_bc-header_services_card_inner-02">
                    <div class="x_bc-header_services_card_inner is-04">
                      <img
                        src="copywriting-image.avif"
                        loading="eager"
                        sizes="(max-width: 880px) 100vw, 880px"
                        srcset="
                          copywriting-image.avif 500w,
                          copywriting-image.avif 880w
                        "
                        alt=""
                        class="x_bc-header_services_card_img"
                      />
                      <div class="x_bc-header_services_card_bottom">
                        <div class="x_bc-header_services_card_title_wrap">
                          <div
                            class="x_bc-header_services_card_title x_u-heading-4"
                          >
                            Copywriting
                          </div>
                          <div
                            class="x_bc-header_services_card_more x_u-s-body"
                          >
                            Learn more
                          </div>
                        </div>
                        <div class="x_bc-header_services_card_num x_u-s-body">
                          04
                        </div>
                      </div>
                    </div>
                  </div></a
                >
              </div>
             
             
              
              <div class="x_bc-header_services_card_wrap">
                <a
                  data-w-id="8618ad9d-ba0c-ee25-b3dd-e2b1130d5526"
                  href="./user-experience-design"
                  class="x_bc-header_services_card_link w-inline-block"
                  ><div class="x_bc-header_services_card_inner-02">
                    <div class="x_bc-header_services_card_inner is-01">
                      <img
                        src="brand-strategy-photo.avif"
                        loading="eager"
                        sizes="(max-width: 880px) 100vw, 880px"
                        srcset="
                          brand-strategy-photo.avif 500w,
                          brand-strategy-photo.avif 880w
                        "
                        alt=""
                        class="x_bc-header_services_card_img"
                      />
                      <div class="x_bc-header_services_card_bottom">
                        <div class="x_bc-header_services_card_title_wrap">
                          <div
                            class="x_bc-header_services_card_title x_u-heading-4"
                          >
                            Brand Strategy
                          </div>
                          <div
                            class="x_bc-header_services_card_more x_u-s-body"
                          >
                            Learn more
                          </div>
                        </div>
                        <div class="x_bc-header_services_card_num x_u-s-body">
                          01
                        </div>
                      </div>
                    </div>
                  </div></a
                >
              </div>
              <div class="x_bc-header_services_card_wrap">
                <a
                  data-w-id="982f1869-3131-d98f-1f62-07a02bc39e4a"
                  href="website-development.html"
                  class="x_bc-header_services_card_link w-inline-block"
                  ><div class="x_bc-header_services_card_inner-02">
                    <div class="x_bc-header_services_card_inner is-02">
                      <img
                        src="website-design-photo.avif"
                        loading="eager"
                        alt=""
                        class="x_bc-header_services_card_img"
                      />
                      <div class="x_bc-header_services_card_bottom">
                        <div class="x_bc-header_services_card_title_wrap">
                          <div
                            class="x_bc-header_services_card_title x_u-heading-4"
                          >
                            Website Design
                          </div>
                          <div
                            class="x_bc-header_services_card_more x_u-s-body"
                          >
                            Learn more
                          </div>
                        </div>
                        <div class="x_bc-header_services_card_num x_u-s-body">
                          02
                        </div>
                      </div>
                    </div>
                  </div></a
                >
              </div>
              <div class="x_bc-header_services_card_wrap">
                <a
                  data-w-id="fc23a484-e790-05f8-0193-1a6935f2c613"
                  href="./digital-product-development"
                  class="x_bc-header_services_card_link w-inline-block"
                  ><div class="x_bc-header_services_card_inner-02">
                    <div class="x_bc-header_services_card_inner is-03">
                      <img
                        src="digital-development-photo.avif"
                        loading="eager"
                        sizes="(max-width: 880px) 100vw, 880px"
                        srcset="
                          digital-development-photo.avif 500w,
                          digital-development-photo.avif 880w
                        "
                        alt=""
                        class="x_bc-header_services_card_img"
                      />
                      <div class="x_bc-header_services_card_bottom">
                        <div class="x_bc-header_services_card_title_wrap">
                          <div
                            class="x_bc-header_services_card_title x_u-heading-4"
                          >
                            Digital Development
                          </div>
                          <div
                            class="x_bc-header_services_card_more x_u-s-body"
                          >
                            Learn more
                          </div>
                        </div>
                        <div class="x_bc-header_services_card_num x_u-s-body">
                          03
                        </div>
                      </div>
                    </div>
                  </div></a
                >
              </div>
              <div class="x_bc-header_services_card_wrap">
                <a
                  data-w-id="b1cf9564-92f9-e06e-962c-5fa6d9b60bef"
                  href="./branding-agency"
                  class="x_bc-header_services_card_link w-inline-block"
                  ><div class="x_bc-header_services_card_inner-02">
                    <div class="x_bc-header_services_card_inner is-04">
                      <img
                        src="copywriting-image.avif"
                        loading="eager"
                        sizes="(max-width: 880px) 100vw, 880px"
                        srcset="
                          copywriting-image.avif 500w,
                          copywriting-image.avif 880w
                        "
                        alt=""
                        class="x_bc-header_services_card_img"
                      />
                      <div class="x_bc-header_services_card_bottom">
                        <div class="x_bc-header_services_card_title_wrap">
                          <div
                            class="x_bc-header_services_card_title x_u-heading-4"
                          >
                            Copywriting
                          </div>
                          <div
                            class="x_bc-header_services_card_more x_u-s-body"
                          >
                            Learn more
                          </div>
                        </div>
                        <div class="x_bc-header_services_card_num x_u-s-body">
                          04
                        </div>
                      </div>
                    </div>
                  </div></a
                >
              </div>
              
             
             
              <div class="x_bc-header_services_card_wrap">
                <a
                  data-w-id="8618ad9d-ba0c-ee25-b3dd-e2b1130d5526"
                  href="./user-experience-design"
                  class="x_bc-header_services_card_link w-inline-block"
                  ><div class="x_bc-header_services_card_inner-02">
                    <div class="x_bc-header_services_card_inner is-01">
                      <img
                        src="brand-strategy-photo.avif"
                        loading="eager"
                        sizes="(max-width: 880px) 100vw, 880px"
                        srcset="
                          brand-strategy-photo.avif 500w,
                          brand-strategy-photo.avif 880w
                        "
                        alt=""
                        class="x_bc-header_services_card_img"
                      />
                      <div class="x_bc-header_services_card_bottom">
                        <div class="x_bc-header_services_card_title_wrap">
                          <div
                            class="x_bc-header_services_card_title x_u-heading-4"
                          >
                            Brand Strategy
                          </div>
                          <div
                            class="x_bc-header_services_card_more x_u-s-body"
                          >
                            Learn more
                          </div>
                        </div>
                        <div class="x_bc-header_services_card_num x_u-s-body">
                          01
                        </div>
                      </div>
                    </div>
                  </div></a
                >
              </div>
              <div class="x_bc-header_services_card_wrap">
                <a
                  data-w-id="982f1869-3131-d98f-1f62-07a02bc39e4a"
                  href="website-development.html"
                  class="x_bc-header_services_card_link w-inline-block"
                  ><div class="x_bc-header_services_card_inner-02">
                    <div class="x_bc-header_services_card_inner is-02">
                      <img
                        src="website-design-photo.avif"
                        loading="eager"
                        alt=""
                        class="x_bc-header_services_card_img"
                      />
                      <div class="x_bc-header_services_card_bottom">
                        <div class="x_bc-header_services_card_title_wrap">
                          <div
                            class="x_bc-header_services_card_title x_u-heading-4"
                          >
                            Website Design
                          </div>
                          <div
                            class="x_bc-header_services_card_more x_u-s-body"
                          >
                            Learn more
                          </div>
                        </div>
                        <div class="x_bc-header_services_card_num x_u-s-body">
                          02
                        </div>
                      </div>
                    </div>
                  </div></a
                >
              </div>
              <div class="x_bc-header_services_card_wrap">
                <a
                  data-w-id="fc23a484-e790-05f8-0193-1a6935f2c613"
                  href="./digital-product-development"
                  class="x_bc-header_services_card_link w-inline-block"
                  ><div class="x_bc-header_services_card_inner-02">
                    <div class="x_bc-header_services_card_inner is-03">
                      <img
                        src="digital-development-photo.avif"
                        loading="eager"
                        sizes="(max-width: 880px) 100vw, 880px"
                        srcset="
                          digital-development-photo.avif 500w,
                          digital-development-photo.avif 880w
                        "
                        alt=""
                        class="x_bc-header_services_card_img"
                      />
                      <div class="x_bc-header_services_card_bottom">
                        <div class="x_bc-header_services_card_title_wrap">
                          <div
                            class="x_bc-header_services_card_title x_u-heading-4"
                          >
                            Digital Development
                          </div>
                          <div
                            class="x_bc-header_services_card_more x_u-s-body"
                          >
                            Learn more
                          </div>
                        </div>
                        <div class="x_bc-header_services_card_num x_u-s-body">
                          03
                        </div>
                      </div>
                    </div>
                  </div></a
                >
              </div>
              <div class="x_bc-header_services_card_wrap">
                <a
                  data-w-id="b1cf9564-92f9-e06e-962c-5fa6d9b60bef"
                  href="./branding-agency"
                  class="x_bc-header_services_card_link w-inline-block"
                  ><div class="x_bc-header_services_card_inner-02">
                    <div class="x_bc-header_services_card_inner is-04">
                      <img
                        src="copywriting-image.avif"
                        loading="eager"
                        sizes="(max-width: 880px) 100vw, 880px"
                        srcset="
                          copywriting-image.avif 500w,
                          copywriting-image.avif 880w
                        "
                        alt=""
                        class="x_bc-header_services_card_img"
                      />
                      <div class="x_bc-header_services_card_bottom">
                        <div class="x_bc-header_services_card_title_wrap">
                          <div
                            class="x_bc-header_services_card_title x_u-heading-4"
                          >
                            Copywriting
                          </div>
                          <div
                            class="x_bc-header_services_card_more x_u-s-body"
                          >
                            Learn more
                          </div>
                        </div>
                        <div class="x_bc-header_services_card_num x_u-s-body">
                          04
                        </div>
                      </div>
                    </div>
                  </div></a
                >
              </div>
              
             
              
              <div class="x_bc-header_services_card_wrap">
                <a
                  data-w-id="8618ad9d-ba0c-ee25-b3dd-e2b1130d5526"
                  href="./user-experience-design"
                  class="x_bc-header_services_card_link w-inline-block"
                  ><div class="x_bc-header_services_card_inner-02">
                    <div class="x_bc-header_services_card_inner is-01">
                      <img
                        src="brand-strategy-photo.avif"
                        loading="eager"
                        sizes="(max-width: 880px) 100vw, 880px"
                        srcset="
                          brand-strategy-photo.avif 500w,
                          brand-strategy-photo.avif 880w
                        "
                        alt=""
                        class="x_bc-header_services_card_img"
                      />
                      <div class="x_bc-header_services_card_bottom">
                        <div class="x_bc-header_services_card_title_wrap">
                          <div
                            class="x_bc-header_services_card_title x_u-heading-4"
                          >
                            Brand Strategy
                          </div>
                          <div
                            class="x_bc-header_services_card_more x_u-s-body"
                          >
                            Learn more
                          </div>
                        </div>
                        <div class="x_bc-header_services_card_num x_u-s-body">
                          01
                        </div>
                      </div>
                    </div>
                  </div></a
                >
              </div>
              <div class="x_bc-header_services_card_wrap">
                <a
                  data-w-id="982f1869-3131-d98f-1f62-07a02bc39e4a"
                  href="website-development.html"
                  class="x_bc-header_services_card_link w-inline-block"
                  ><div class="x_bc-header_services_card_inner-02">
                    <div class="x_bc-header_services_card_inner is-02">
                      <img
                        src="website-design-photo.avif"
                        loading="eager"
                        alt=""
                        class="x_bc-header_services_card_img"
                      />
                      <div class="x_bc-header_services_card_bottom">
                        <div class="x_bc-header_services_card_title_wrap">
                          <div
                            class="x_bc-header_services_card_title x_u-heading-4"
                          >
                            Website Design
                          </div>
                          <div
                            class="x_bc-header_services_card_more x_u-s-body"
                          >
                            Learn more
                          </div>
                        </div>
                        <div class="x_bc-header_services_card_num x_u-s-body">
                          02
                        </div>
                      </div>
                    </div>
                  </div></a
                >
              </div>
              <div class="x_bc-header_services_card_wrap">
                <a
                  data-w-id="fc23a484-e790-05f8-0193-1a6935f2c613"
                  href="./digital-product-development"
                  class="x_bc-header_services_card_link w-inline-block"
                  ><div class="x_bc-header_services_card_inner-02">
                    <div class="x_bc-header_services_card_inner is-03">
                      <img
                        src="digital-development-photo.avif"
                        loading="eager"
                        sizes="(max-width: 880px) 100vw, 880px"
                        srcset="
                          digital-development-photo.avif 500w,
                          digital-development-photo.avif 880w
                        "
                        alt=""
                        class="x_bc-header_services_card_img"
                      />
                      <div class="x_bc-header_services_card_bottom">
                        <div class="x_bc-header_services_card_title_wrap">
                          <div
                            class="x_bc-header_services_card_title x_u-heading-4"
                          >
                            Digital Development
                          </div>
                          <div
                            class="x_bc-header_services_card_more x_u-s-body"
                          >
                            Learn more
                          </div>
                        </div>
                        <div class="x_bc-header_services_card_num x_u-s-body">
                          03
                        </div>
                      </div>
                    </div>
                  </div></a
                >
              </div>
              <div class="x_bc-header_services_card_wrap">
                <a
                  data-w-id="b1cf9564-92f9-e06e-962c-5fa6d9b60bef"
                  href="./branding-agency"
                  class="x_bc-header_services_card_link w-inline-block"
                  ><div class="x_bc-header_services_card_inner-02">
                    <div class="x_bc-header_services_card_inner is-04">
                      <img
                        src="copywriting-image.avif"
                        loading="eager"
                        sizes="(max-width: 880px) 100vw, 880px"
                        srcset="
                          copywriting-image.avif 500w,
                          copywriting-image.avif 880w
                        "
                        alt=""
                        class="x_bc-header_services_card_img"
                      />
                      <div class="x_bc-header_services_card_bottom">
                        <div class="x_bc-header_services_card_title_wrap">
                          <div
                            class="x_bc-header_services_card_title x_u-heading-4"
                          >
                            Copywriting
                          </div>
                          <div
                            class="x_bc-header_services_card_more x_u-s-body"
                          >
                            Learn more
                          </div>
                        </div>
                        <div class="x_bc-header_services_card_num x_u-s-body">
                          04
                        </div>
                      </div>
                    </div>
                  </div></a
                >
              </div>
             
             
              
            </div>
          </div>
          <div class="x_bc-header_services_bottom" style="pointer-events: none;">
            <div
              class="x_bc-header_services_ico"
              data-w-id="dc4bd620-c824-dd11-99d9-72f9fd3b9f47"
              data-animation-type="lottie"
              data-src="https://cdn.prod.website-files.com/63f5d378a903c2a12583ce2f/681b2c453350159178c1dd18_Animation%20-%201746605713285-2.json"
              data-loop="1"
              data-direction="1"
              data-autoplay="1"
              data-is-ix2-target="0"
              data-renderer="svg"
              data-default-duration="0"
              data-duration="3"
            ></div>
            <div class="x_bc-header_services_text x_u-heading-4">
              Our expertise
            </div>
            <div class="x_bc-header_services_sroll x_u-s-body">
              Scroll to see all
            </div>
          </div>
        </div>
    `;

    const template = document.createElement("template");
    template.innerHTML = raw.trim();

    const node = template.content.firstElementChild;
    if (!node) return;

    // ⬇️ CHOOSE INSERTION POINT ⬇️
    const afterEl = pane.querySelector(".x_nav_component"); // example

    if (afterEl) {
      afterEl.insertAdjacentElement("afterend", node);
    } else {
      pane.appendChild(node);
    }
  } catch (e) {
    console.error("[injectNewSection]", e);
  }
}

function __injectPreloader() {
  try {
    // Version guard (prevents duplicate loaders after soft navigations)
    const VER = 1;
    if ((window.__QK_PRELOADER_VER || 0) >= VER) return;
    window.__QK_PRELOADER_VER = VER;

    // Remove any older instances from previous bundles
    document
      .querySelectorAll(".qk-load-wrapper, .qk-page-load-trigger")
      .forEach((n) => n.remove());

    // Build DOM
    const trigger = document.createElement("div");
    trigger.className = "qk-page-load-trigger";
    trigger.setAttribute("aria-hidden", "true");

    const wrap = document.createElement("div");
    wrap.className = "qk-load-wrapper";
    wrap.setAttribute("aria-hidden", "true");

    const animHost = document.createElement("div");
    animHost.className = "qk-load-anim";
    animHost.setAttribute("data-lottie-src", "./refined-quack-loader.json");

    // Styles (inline so this works even if CSS isn't loaded yet)
    // Black full-screen overlay
    Object.assign(wrap.style, {
      position: "fixed",
      inset: "0",
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#000",
      zIndex: "2147483647",
      transform: "translate3d(0,0,0)",
      willChange: "transform, opacity",
      pointerEvents: "none",
    });

    // Lottie box sizing (tweak as needed)
    Object.assign(animHost.style, {
      width: "25rem",
      height: "25rem",
      pointerEvents: "none",
    });

    wrap.appendChild(animHost);

    // Insert at top of body so it overlays everything
    document.body.insertAdjacentElement("afterbegin", wrap);
    document.body.insertAdjacentElement("afterbegin", trigger);

    // Ensure we can reveal page if anything goes wrong
    const forceReveal = (() => {
      let done = false;
      return (why) => {
        if (done) return;
        done = true;
        // 👇 PUT THE HOOK RIGHT HERE
        try {
          window.__QK_PRELOADER_DONE = true;
          window.dispatchEvent(new Event("qk-preloader:done"));
        } catch (e) {}

        // Animate up + out (lift the black overlay)
        try {
          wrap.style.transition =
            "transform 520ms cubic-bezier(0.65, 0, 0.35, 1), opacity 520ms cubic-bezier(0.65, 0, 0.35, 1)";
          wrap.style.transform = "translate3d(0,-100vh,0)";
          wrap.style.opacity = "0";
        } catch (e) {}

        // Remove after transition
        setTimeout(() => {
          try {
            wrap.remove();
          } catch (e) {}
          try {
            trigger.remove();
          } catch (e) {}
        }, 800);

        // Optional debug hook
        try {
          console.log("[preloader] reveal", why);
        } catch (e) {}
      };
    })();

    // If you *need* to block scrolling while loader is up:
    // const prevOverflow = document.documentElement.style.overflow;
    // document.documentElement.style.overflow = "hidden";

    const ensureLottie = () =>
      new Promise((resolve, reject) => {
        if (window.lottie && typeof window.lottie.loadAnimation === "function")
          return resolve(window.lottie);

        const existing = document.querySelector('script[data-qk-lottie="1"]');
        if (existing) {
          // wait for it
          existing.addEventListener("load", () => resolve(window.lottie));
          existing.addEventListener("error", reject);
          return;
        }

        const s = document.createElement("script");
        s.src =
          "https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js";
        s.async = true;
        s.defer = true;
        s.setAttribute("data-qk-lottie", "1");
        s.onload = () =>
          window.lottie
            ? resolve(window.lottie)
            : reject(new Error("lottie loaded but window.lottie missing"));
        s.onerror = () => reject(new Error("failed to load lottie-web"));
        document.head.appendChild(s);
      });

    // Play lottie then lift overlay
    const run = async () => {
      let lottieApi;
      try {
        lottieApi = await ensureLottie();
      } catch (e) {
        forceReveal("no-lottie");
        return;
      }

      let anim;
      try {
        anim = lottieApi.loadAnimation({
          container: animHost,
          renderer: "svg",
          loop: false,
          autoplay: true,
          path: animHost.getAttribute("data-lottie-src"),
          rendererSettings: {
            progressiveLoad: true,
            preserveAspectRatio: "xMidYMid meet",
          },
        });
      } catch (e) {
        forceReveal("loadAnimation-error");
        return;
      }

      // If animation metadata never loads, don’t hang forever
      const hardTimeout = setTimeout(() => forceReveal("timeout"), 7000);

      // Reveal when the animation completes
      const onComplete = () => {
        clearTimeout(hardTimeout);
        try {
          anim.removeEventListener("complete", onComplete);
        } catch (e) {}
        forceReveal("complete");
      };

      try {
        anim.addEventListener("complete", onComplete);
      } catch (e) {}

      // Extra safety: if it’s super short / zero frames
      setTimeout(() => {
        try {
          if (!anim || !anim.totalFrames || anim.totalFrames < 2)
            forceReveal("no-frames");
        } catch (e) {}
      }, 1200);
    };

    // Start on next frame so layout is ready
    requestAnimationFrame(run);
  } catch (e) {
    console.error("[injectPreloader]", e);
  }
}

function __injectAfterMain() {
  try {
    const pane = document.querySelector(".lenisscroll-pane");
    if (!pane) return;

    // Target the exact main you mentioned
    const main = pane.querySelector("main[data-v-ea5deaed]");
    if (!main) return;

    // Prevent duplicates (pick a unique class in your injected HTML)
    if (pane.querySelector(".x_after_main_component")) return;

    const raw = `
      <div class="wrap-transition" data-injected="after-main">
            <section class="section">
              <div class="padding-section-large">
                <div class="page-padding">
                  <div class="container-large">
                    <div class="quote-component">
                      <div scrub-each-word="" split-text="" class="big-quote">
                        You've seen the ads.
"Your website is costing you clarity and dominance." Blah blah blah.


Here's what we've noticed: the louder an agency talks, the less impressive the work tends to be. Big words, bigger invoices and same five f*cking templates. We just build websites. Damn good ones your customers can actually use.



If that sounds refreshingly boring... you're our kind of person.
                      </div>
                     
                  </div>
                </div>
              </div>
            </section>
            <section class="section overflow-hidden" style="color:rgb(178, 74, 29);">
              <div class="padding-section-large is--brands">
                <div class="page-padding">
                  <div class="container-large">
                    <div class="margin-bottom margin-large">
                      <h1
                        data-w-id="55d0039d-3afe-c878-5cce-abd6c14c3611"
                        class="heading-massive"
                      >
                        <span class="shift-right">Digitally<br /></span>
                      </h1>
                      <h1
                        data-w-id="a1bf78e3-5403-9f03-4bf1-b58b7326243c"
                        class="heading-massive"
                      >
                        <span class="shift-left">Irreverant<br /></span>
                      </h1>
                     
                    </div>
                    <div class="margin-bottom margin-large">
                      <div class="_4-col-grid">
                        <div
                          id="w-node-b44cc401-9f6e-2469-37bd-7e363354762e-644deb4a"
                        >
                          <div class="max-width-small">
                            <h2
                              lines-slide-up=""
                              split-text=""
                              data-w-id="b44cc401-9f6e-2469-37bd-7e3633547631"
                              style="
                                -webkit-transform: translate3d(0, 20%, 0)
                                  scale3d(1, 1, 1) rotateX(0) rotateY(0)
                                  rotateZ(0) skew(0, 0);
                                -moz-transform: translate3d(0, 20%, 0)
                                  scale3d(1, 1, 1) rotateX(0) rotateY(0)
                                  rotateZ(0) skew(0, 0);
                                -ms-transform: translate3d(0, 20%, 0)
                                  scale3d(1, 1, 1) rotateX(0) rotateY(0)
                                  rotateZ(0) skew(0, 0);
                                transform: translate3d(0, 20%, 0)
                                  scale3d(1, 1, 1) rotateX(0) rotateY(0)
                                  rotateZ(0) skew(0, 0);
                                opacity: 0;
                              "
                              class="text-size-medium"
                            >
                              We help ambitious teams build better, more
                              connected experiences for web.
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="stats-grid home">
                      <div
                        id="w-node-_4bed7ec8-be2f-6206-1084-44d8cd0e2bce-644deb4a"
                        class="stats-card"
                      >
                        <div
                          fb-count-time="2500"
                          fb-count="true"
                          fb-count-target="10"
                          class="stat-number"
                        >
                          0
                        </div>
                        <div>Years Running</div>
                      </div>
                      <div
                        id="w-node-_4bed7ec8-be2f-6206-1084-44d8cd0e2bd3-644deb4a"
                        class="stats-card"
                      >
                        <div
                          fb-count-time="2500"
                          fb-count="true"
                          fb-count-target="21"
                          class="stat-number"
                        >
                          0
                        </div>
                        <div>Brave People</div>
                      </div>
                      <div
                        id="w-node-_4bed7ec8-be2f-6206-1084-44d8cd0e2bd8-644deb4a"
                        class="stats-card"
                      >
                        <div class="stat-flex">
                          <div
                            fb-count-time="2500"
                            fb-count="true"
                            fb-count-target="50"
                            class="stat-number"
                          >
                            0
                          </div>
                          <div class="stat-number">%</div>
                        </div>
                        <div>Remote</div>
                      </div>
                      <div
                        id="w-node-_4bed7ec8-be2f-6206-1084-44d8cd0e2be0-644deb4a"
                        class="grid-spacer"
                      ></div>
                      <div
                        id="w-node-_4bed7ec8-be2f-6206-1084-44d8cd0e2be1-644deb4a"
                        class="grid-spacer"
                      ></div>
                      <div
                        id="w-node-_4bed7ec8-be2f-6206-1084-44d8cd0e2be2-644deb4a"
                        class="stats-card"
                      >
                        <div
                          fb-count-time="2500"
                          fb-count="true"
                          fb-count-target="4"
                          class="stat-number"
                        >
                          0
                        </div>
                        <div>Average Team Size</div>
                      </div>
                      <div
                        id="w-node-_4bed7ec8-be2f-6206-1084-44d8cd0e2be7-644deb4a"
                        class="stats-card"
                      >
                        <div class="stat-flex">
                          <div
                            fb-count-time="2500"
                            fb-count="true"
                            fb-count-target="90"
                            class="stat-number"
                          >
                            0
                          </div>
                          <div class="stat-number">%</div>
                        </div>
                        <div>Referral Rate</div>
                      </div>
                      <div
                        id="w-node-_4bed7ec8-be2f-6206-1084-44d8cd0e2bef-644deb4a"
                        class="stats-card"
                      >
                        <div class="stat-flex">
                          <div
                            fb-count-time="2500"
                            fb-count="true"
                            fb-count-target="200"
                            class="stat-number"
                          >
                            0
                          </div>
                          <div class="stat-number">+</div>
                        </div>
                        <div>Projects Launched</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
    `;

    const template = document.createElement("template");
    template.innerHTML = raw.trim();

    const node = template.content.firstElementChild;
    if (!node) return;

    // ✅ Insert *after* the main
    main.insertAdjacentElement("afterend", node);
  } catch (e) {
    console.error("[injectAfterMain]", e);
  }
}

function __injectAfterAfterMain() {
  try {
    const pane = document.querySelector(".lenisscroll-pane");
    if (!pane) return false;

    const anchor =
      pane.querySelector('[data-injected="after-main"]') ||
      pane.querySelector(".x_after_main_component");
    if (!anchor) return false;

    // Prevent duplicates using DOM state, not by relying on raw HTML
    if (pane.querySelector('[data-injected="after-after-main"]')) return true;

    const raw = `
      <section class="section background-color-tint overflow-hidden"  style="display: none !important">
            <div class="page-padding">
              <div class="container-large">
                <div class="clients-component">
                  <div class="w-dyn-list">
                    
                  </div>
                </div>
              </div>
            </div>
          </section>
    `;

    const template = document.createElement("template");
    template.innerHTML = raw.trim();

    const node = template.content.firstElementChild;
    if (!node) return false;

    // ✅ Add marker here (safe)
    node.setAttribute("data-injected", "after-after-main");

    anchor.insertAdjacentElement("afterend", node);
    return true;
  } catch (e) {
    console.error("[injectAfterAfterMain]", e);
    return false;
  }
}

function __ensureInjectAfterAfterMain(maxFrames = 240) {
  let frames = 0;
  (function tick() {
    if (__injectAfterAfterMain()) return;
    if (++frames >= maxFrames) {
      console.warn("[injectAfterAfterMain] gave up waiting for anchor");
      return;
    }
    requestAnimationFrame(tick);
  })();
}

function __injectAfterThirdAnchor() {
  try {
    const pane = document.querySelector(".lenisscroll-pane");
    if (!pane) return false;

    const anchor = pane.querySelector('[data-injected="after-after-main"]');
    if (!anchor) return false;

    if (pane.querySelector('[data-injected="after-third"]')) return true;

    const raw = `
      <section class="section background-color-tint">
            <div class="cta-padding">
              <div class="page-padding">
                <div class="container-large">
                  <div class="flex-vertical">
                    <a
                      data-button-hover=""
                      href="./contact"
                      class="big-cta w-inline-block"
                      ><div data-button-text="" class="big-cta__text">
                        Work With Us
                      </div></a
                    >
                    <div class="hashtag">#shapethefuture</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="padding-section-large">
              <div class="page-padding">
                <div class="container-large">
                  <div class="margin-bottom margin-huge">
                    <div class="max-width-xlarge">
                      <div class="margin-bottom margin-medium">
                        <h2
                          lines-slide-up=""
                          split-text=""
                          class="heading-large"
                        >
                          Choose Your Engagement Model
                        </h2>
                      </div>
                      <div class="max-width-medium">
                        <div
                          lines-slide-up=""
                          split-text=""
                          class="text-size-medium"
                        >
                          Whether you’re launching something new or scaling an existing business, we offer clear paths to get you there.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div data-w-id="cb6201a7-ef8a-b4d8-1858-987925710764" class="enquiry-cards-flex">
                    <a
                      data-prevent-transition=""
                      data-w-id="21ca679e-a158-6eb5-a63f-ddd0dbd67d8f"
                      href="https://bravepeople.typeform.com/getstarted"
                      target="_blank"
                      class="enquiry-card__wrap number-one is--black w-inline-block"
                      ><div class="card-header anim">
                        <div class="w-layout-hflex enquiry-card-text">
                          <div class="enquiry-card-heading">Launch your</div>
                          <div class="div-block">
                            <div class="enquiry-card-heading anim">Website</div>
                            <div class="enquiry-card-heading anim">Brand</div>
                          </div>
                        </div>
                        <div class="card-tag no--caps">Fixed Scope</div>
                      </div>
                      <div class="card-text anim">
                        <div class="enquiry-card-p">
                          A focused, end-to-end website build to establish a strong digital presence. 
                          From content and design through to development and deployment, we deliver a high-performance site with a clear scope, timeline, and outcome.
                        </div>
                        <div class="button is-icon is-card">
                          <div class="button-text">Start Your Build</div>
                          <div class="button-arrow w-embed">
                            <svg
                              width="26"
                              height="38"
                              viewBox="0 0 26 38"
                              stroke="currentColor"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.7773 32.8115L22.6833 21.9055C24.3401 20.2488 24.3401 17.5627 22.6833 15.906L11.7774 4.99999"
                                stroke-width="2"
                              ></path>
                              <line
                                y1="-1"
                                x2="24.5643"
                                y2="-1"
                                transform="matrix(-1 -1.68587e-07 -2.52881e-07 1 24.625 20.0938)"
                                stroke-width="2"
                              ></line>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <img
                        src="index/images/680fa5ebdd3d9d78849fe02c_sarah-dorweiler-Rv2kTIuya_I-unsplash%203%20%281%29.png"
                        loading="lazy"
                        sizes="100vw"
                        srcset="
                          index/images/680fa5ebdd3d9d78849fe02c_sarah-dorweiler-Rv2kTIuya_I-unsplash%203%20%281%29-p-500.png 500w,
                          index/images/680fa5ebdd3d9d78849fe02c_sarah-dorweiler-Rv2kTIuya_I-unsplash%203%20%281%29.png       714w
                        "
                        alt=""
                        class="card-bg" />
                      <div class="enquiry-card__overlay number-one"></div></a
                    ><a
                      href="./build-a-digital-product"
                      class="enquiry-card__wrap number-two is--black w-inline-block"
                      ><div class="card-header anim">
                        <div class="w-layout-hflex enquiry-card-text">
                          <div class="enquiry-card-heading">
                            Evolve Your Brand
                          </div>
                        </div>
                        <div class="card-tag no--caps">
                          Ongoing Partnership
                        </div>
                      </div>
                      <div class="card-text anim">
                        <div class="enquiry-card-p">
                          An ongoing strategic and technical partnership for growing businesses. 
                          Brand strategy, custom development, performance optimisation, and long-term support through a flexible, scalable engagement.
                          </div>
                        <div class="button is-icon is-card">
                          <div class="button-text">Explore Partnership</div>
                          <div class="button-arrow w-embed">
                            <svg
                              width="26"
                              height="38"
                              viewBox="0 0 26 38"
                              stroke="currentColor"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.7773 32.8115L22.6833 21.9055C24.3401 20.2488 24.3401 17.5627 22.6833 15.906L11.7774 4.99999"
                                stroke-width="2"
                              ></path>
                              <line
                                y1="-1"
                                x2="24.5643"
                                y2="-1"
                                transform="matrix(-1 -1.68587e-07 -2.52881e-07 1 24.625 20.0938)"
                                stroke-width="2"
                              ></line>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <img
                        src="index/images/680fa5eb3443e4c285b5db08_sarah-dorweiler-Rv2kTIuya_I-unsplash%201%20%281%29.png"
                        loading="lazy"
                        sizes="100vw"
                        srcset="
                          index/images/680fa5eb3443e4c285b5db08_sarah-dorweiler-Rv2kTIuya_I-unsplash%201%20%281%29-p-500.png 500w,
                          index/images/680fa5eb3443e4c285b5db08_sarah-dorweiler-Rv2kTIuya_I-unsplash%201%20%281%29.png       714w
                        "
                        alt=""
                        class="card-bg" />
                      <div class="enquiry-card__overlay number-two"></div></a
                    ><link rel="prefetch" href="./build-a-digital-product" />
                  </div>
                </div>
              </div>
            </div>
          </section>
    `;

    const template = document.createElement("template");
    template.innerHTML = raw.trim();

    const node = template.content.firstElementChild;
    if (!node) return false;

    anchor.insertAdjacentElement("afterend", node);
    return true;
  } catch (e) {
    console.error("[injectAfterThird]", e);
    return false;
  }
}

function __ensureInjectAfterThird(maxFrames = 240) {
  let frames = 0;
  (function tick() {
    if (__injectAfterThirdAnchor()) return;
    if (++frames >= maxFrames) {
      console.warn("[injectAfterThird] gave up waiting for anchor");
      return;
    }
    requestAnimationFrame(tick);
  })();
}

/* =========================================================
   Header + Services scripts (converted from DOMContentLoaded)
   Call: window.__INIT_HEADER_SCRIPTS()
   ========================================================= */

(function () {
  const log = (...a) => console.log("[hdr-init]", ...a);
  const warn = (...a) => console.warn("[hdr-init]", ...a);

  // Small helper: wait for a condition with rAF retries
  function waitFor(testFn, onReady, { tries = 180, label = "waitFor" } = {}) {
    let n = 0;
    const tick = () => {
      n++;
      let ok = false;
      try {
        ok = !!testFn();
      } catch (e) {
        ok = false;
      }
      if (ok) return onReady();
      if (n >= tries) return warn(label, "timeout after tries =", tries);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // Helper: bind an event only once per element+key
  function bindOnce(el, key, type, handler, options) {
    if (!el) return false;
    const k = "__bind_" + key;
    if (el[k]) return false;
    el.addEventListener(type, handler, options);
    el[k] = true;
    return true;
  }

  /* -----------------------------
     1) GSAP Navigation (initNavigation)
     ----------------------------- */
  function __initGSAPNavigation() {
    // guard: don't init twice
    if (window.__NAV_GSAP_INITED) return;
    window.__NAV_GSAP_INITED = true;

    if (!window.gsap) {
      warn("GSAP missing. initNavigation skipped.");
      return;
    }

    const els = {
      navWrap: document.querySelector(".x_nav_wrap"),
      navButton: document.querySelector(".x_nav_button_wrap"),
      navBtnBg: document.querySelector(".x_nav_button_bg"),
      closeIcon: document.querySelector(".x_nav_button_ico.is-close"),
      openIcon: document.querySelector(".x_nav_button_ico.is-open"),
      navBg: document.querySelector(".x_nav_bg"),
      navLeft: document.querySelector(".x_nav_left"),
      navLeftInner: document.querySelector(".x_nav_left_inner"),
      navList: document.querySelector(".x_nav_list"),
      navLogo: document.querySelector(".x_nav_logo_ico"),
      navSocials: document.querySelector(".x_nav_socials_list"),
      navLinks: document.querySelectorAll(".x_nav_link_wrap"),
      navContent: document.querySelector(".x_nav_content_wrap"),
      navRight: document.querySelector(".x_nav_right"),
      navMobileBacks: document.querySelectorAll(".x_nav_mob-submenu_back_wrap"),
    };

    if (!els.navWrap || !els.navButton) {
      warn("GSAP nav missing .x_nav_wrap or .x_nav_button_wrap");
      return;
    }

    const configs = {
      large: {
        minWidth: 991,
        navWrapWidth: "58.5rem",
        navLeftWidth: "17.5rem",
        navWrapHeight: "42.625rem",
        closedWidth: "25rem",
        closedHeight: "4.75rem",
        closedLeftWidth: "8rem",
      },
      medium: {
        minWidth: 767,
        maxWidth: 991,
        navWrapWidth: "42.5rem",
        navLeftWidth: "13.25rem",
        navWrapHeight: "37.375rem",
        closedWidth: "24rem",
        closedHeight: "4.5rem",
        closedLeftWidth: "6.75rem",
      },
      mobile: {
        maxWidth: 767,
        navWrapWidth: "23rem",
        navLeftWidth: "100%",
        navWrapHeight: "25.625rem",
        closedWidth: "23rem",
        closedHeight: "3.75rem",
        closedLeftWidth: "100%",
        expandedHeight: "30rem",
        rightExpandedHeight: "26rem",
      },
    };

    const mobileEasing = {
      wrapWidth: "power2.out",
      wrapHeight: "power2.out",
      leftWidth: "power2.out",
      bg: "power2.out",
      leftInner: "power1.inOut",
      logo: "power1.inOut",
      list: "power1.inOut",
      socials: "power1.inOut",
      content: "power1.inOut",
    };

    let tl = window.gsap.timeline({ paused: true, reversed: true });
    let submenuTl = window.gsap.timeline({ paused: true, reversed: true });
    let currentConfig = null;

    const setInitialStyles = (cfg) => {
      window.gsap.set(els.navWrap, {
        width: cfg.closedWidth,
        height: cfg.closedHeight,
      });
      window.gsap.set(els.navLeft, { width: cfg.closedLeftWidth });
      window.gsap.set([els.navBg, els.navContent], {
        display: "none",
        opacity: 0,
      });
      window.gsap.set([els.navLeftInner], { display: "none", opacity: 0 });
      window.gsap.set(els.closeIcon, { display: "none" });
      window.gsap.set([els.navList, els.navSocials, els.navLogo], {
        opacity: 0,
      });
      window.gsap.set(els.openIcon, { display: "block" });
      window.gsap.set(els.navRight, { height: "auto" });
      window.gsap.set(els.navBtnBg, { opacity: 100 });
    };

    const setMobileInitialStyles = (cfg) => {
      window.gsap.set(els.navWrap, {
        width: cfg.closedWidth,
        height: cfg.closedHeight,
      });
      window.gsap.set(els.navLeft, { width: cfg.closedLeftWidth });
      window.gsap.set([els.navBg, els.navContent], {
        display: "none",
        opacity: 0,
      });
      window.gsap.set([els.navLeftInner], { display: "none", opacity: 0 });
      window.gsap.set(els.closeIcon, { display: "none" });
      window.gsap.set([els.navSocials, els.navLogo], { opacity: 0 });
      window.gsap.set(els.openIcon, { display: "block" });
      window.gsap.set([els.navBtnBg, els.navList], { opacity: 100 });
      window.gsap.set(els.navRight, { height: "0rem" });
      window.gsap.set(els.navContent, { display: "none", opacity: 0 });
    };

    const setupDesktopAnimation = (cfg) => {
      tl.clear();
      tl.to(
        els.navWrap,
        { width: cfg.navWrapWidth, duration: 0.2, ease: "none" },
        0
      )
        .to(
          els.navLeft,
          { width: cfg.navLeftWidth, duration: 0.2, ease: "none" },
          0
        )
        .to(els.navWrap, {
          height: cfg.navWrapHeight,
          duration: 0.2,
          ease: "none",
        })
        .set(els.closeIcon, { display: "block" }, 0)
        .set(els.openIcon, { display: "none" }, 0)
        .to(
          els.navBg,
          { display: "block", opacity: 0.6, duration: 0.2, ease: "power2.out" },
          0
        )
        .to(
          els.navLeftInner,
          { display: "flex", opacity: 1, duration: 0.2, ease: "none" },
          0.2
        )
        .to(els.navLogo, { opacity: 1, duration: 0.2, ease: "none" }, 0.4)
        .to(els.navList, { opacity: 1, duration: 0.2, ease: "none" })
        .to(els.navSocials, { opacity: 1, duration: 0.2, ease: "none" })
        .to(
          els.navContent,
          { display: "block", opacity: 1, duration: 0.2, ease: "none" },
          "-=0.2"
        );
    };

    const setupMobileAnimation = (cfg) => {
      tl.clear();
      tl.to(
        els.navWrap,
        {
          width: cfg.navWrapWidth,
          duration: 0.2,
          ease: mobileEasing.wrapWidth,
        },
        0
      )
        .to(els.navWrap, {
          height: cfg.navWrapHeight,
          duration: 0.2,
          ease: mobileEasing.wrapHeight,
        })
        .set(els.closeIcon, { display: "block" }, 0)
        .set(els.openIcon, { display: "none" }, 0)
        .to(
          els.navBg,
          {
            display: "block",
            opacity: 0.6,
            duration: 0.2,
            ease: mobileEasing.bg,
          },
          0
        )
        .to(els.navLeftInner, {
          display: "block",
          opacity: 1,
          duration: 0.2,
          ease: "power3.in",
        });
    };

    const setupMobileSubmenuAnimation = (cfg) => {
      submenuTl.clear();
      submenuTl
        .to(els.navWrap, {
          height: cfg.expandedHeight,
          duration: 0.2,
          ease: "none",
        })
        .to(
          els.navRight,
          { height: cfg.rightExpandedHeight, duration: 0.25, ease: "none" },
          0
        )
        .to(els.navList, { opacity: 0, duration: 0.1, ease: "none" }, "-=0.3")
        .to(
          els.navContent,
          { display: "block", opacity: 1, duration: 0.1, ease: "none" },
          0.4
        );
    };

    const openMenu = () => {
      els.navBtnBg && els.navBtnBg.classList.add("is-active");
      tl.play();
    };

    const closeMenu = () => {
      if (!submenuTl.reversed()) {
        submenuTl.reverse().then(() => {
          tl.reverse().then(
            () => els.navBtnBg && els.navBtnBg.classList.remove("is-active")
          );
        });
      } else {
        tl.reverse().then(
          () => els.navBtnBg && els.navBtnBg.classList.remove("is-active")
        );
      }
    };

    const toggleMenu = () => (tl.reversed() ? openMenu() : closeMenu());
    const openSubmenu = () => submenuTl.play();
    const closeSubmenu = () => submenuTl.reverse();

    const getConfig = (width) => {
      if (width > configs.large.minWidth) return configs.large;
      if (width > configs.mobile.maxWidth && width <= configs.medium.maxWidth)
        return configs.medium;
      if (width <= configs.mobile.maxWidth) return configs.mobile;
      return null;
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const newConfig = getConfig(width);

      if (newConfig && newConfig !== currentConfig) {
        currentConfig = newConfig;
        if (width <= configs.mobile.maxWidth) {
          setupMobileAnimation(currentConfig);
          setupMobileSubmenuAnimation(currentConfig);
          setMobileInitialStyles(currentConfig);
        } else {
          setupDesktopAnimation(currentConfig);
          setInitialStyles(currentConfig);
        }
        if (!tl.reversed()) tl.reverse();
        if (!submenuTl.reversed()) submenuTl.reverse();
      }
    };

    handleResize();

    bindOnce(els.navButton, "nav_toggle", "click", toggleMenu);
    bindOnce(els.navBg, "nav_bg_toggle", "click", toggleMenu);

    els.navLinks &&
      els.navLinks.forEach((link) => {
        if (link.getAttribute("nav-mobile") === "") {
          bindOnce(link, "nav_mobile_link", "click", (e) => {
            if (window.innerWidth <= configs.mobile.maxWidth) {
              e.preventDefault();
              openSubmenu();
            }
          });
        }
      });

    els.navMobileBacks &&
      els.navMobileBacks.forEach((btn) =>
        bindOnce(btn, "nav_mob_back", "click", closeSubmenu)
      );

    bindOnce(window, "nav_resize", "resize", handleResize);

    window.__navControls = { openMenu, closeMenu, openSubmenu, closeSubmenu };
  }

  /* -----------------------------
     2) Services carousel wheel (GSAP + ticker)
     ----------------------------- */
  function __initServicesCarouselWheel() {
    if (window.__SERVICES_CAROUSEL_INITED) return;
    window.__SERVICES_CAROUSEL_INITED = true;

    if (!window.gsap) {
      warn("GSAP missing. Services carousel wheel skipped.");
      return;
    }

    const innerEl = document.querySelector(".x_bc-header_services_inner");
    if (!innerEl) {
      warn("No .x_bc-header_services_inner found for services wheel.");
      return;
    }

    window.gsap.set(".x_bc-header_services_card_link", { yPercent: -5 });

    const medias = document.querySelectorAll(".x_bc-header_services_card_wrap");
    medias.forEach((media, index) => {
      const rotation = (360 / medias.length) * index;
      window.gsap.set(media, { rotation });
    });

    const rotTo = window.gsap.quickTo(
      ".x_bc-header_services_container",
      "rotation",
      {
        duration: 0.6,
        ease: "power3.out",
      }
    );

    const cardLinks = document.querySelectorAll(
      ".x_bc-header_services_card_link"
    );

    let rotation_velocity = 0;
    let y_velocity = 0;
    let current_rotation = 0;
    let current_y = -5;
    const base_y = -5;

    const FRICTION = 0.95;
    const VERTICAL_KICK = 0.3;
    const MOUSE_SENSITIVITY = 0.0011;
    const TOUCHPAD_SENSITIVITY = 0.0011;

    const handleScroll = (e) => {
      e.preventDefault();
      const primaryDelta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const isTouchpad = primaryDelta % 1 !== 0;
      const multiplier = isTouchpad ? TOUCHPAD_SENSITIVITY : MOUSE_SENSITIVITY;

      let delta = primaryDelta * multiplier;
      delta = Math.max(-60, Math.min(60, delta));

      rotation_velocity -= delta;
      y_velocity -= Math.abs(delta) * VERTICAL_KICK;
    };

    bindOnce(innerEl, "services_wheel", "wheel", handleScroll, {
      passive: false,
    });

    // Only add ticker once
    if (!window.__SERVICES_CAROUSEL_TICK) {
      window.__SERVICES_CAROUSEL_TICK = true;
      window.gsap.ticker.add(() => {
        current_rotation += rotation_velocity;
        rotTo(current_rotation);

        const spring_force = (base_y - current_y) * 0.01;
        y_velocity += spring_force;
        current_y += y_velocity;
        window.gsap.set(cardLinks, { yPercent: current_y });

        rotation_velocity *= FRICTION;
        y_velocity *= FRICTION;
      });
    }
  }

  /* 2.5 the colour change one */
  function __injectColorSync__nested_do_not_use() {
    try {
      const VER = 1;
      if ((window.__COLOR_SYNC_VER || 0) >= VER) return;
      window.__COLOR_SYNC_VER = VER;

      const DEBUG = false;
      const log = (...a) => DEBUG && console.log("[color-sync]", ...a);

      // If you re-init (route changes), clean old triggers
      if (window.__COLOR_SYNC_CLEANUP) {
        try {
          window.__COLOR_SYNC_CLEANUP();
        } catch (e) {}
      }
      window.__COLOR_SYNC_CLEANUP = null;

      const waitFor = (testFn, onOk, opts) => {
        const tries = (opts && opts.tries) || 240;
        const every = (opts && opts.every) || 50;
        const label = (opts && opts.label) || "waitFor";
        let n = 0;

        const tick = () => {
          n++;
          let ok = false;
          try {
            ok = !!testFn();
          } catch (e) {}
          if (ok) return onOk();
          if (n >= tries) return log("timeout", label);
          setTimeout(tick, every);
        };

        tick();
      };

      const ORANGE_BG = "#b24a1d";
      const OFFWHITE_TX = "#f9f9f9";
      const OFFWHITE_BG = "#f0ede6";
      const ORANGE_TX = "#b24a1d";

      const SMOOTH_DUR = 0.8; // seconds

      // Wait for GSAP + ScrollTrigger + elements
      waitFor(
        () =>
          window.gsap &&
          window.ScrollTrigger &&
          document.querySelector(".fade-grey-to-black") &&
          document.querySelector(".wrap-transition"),
        () => {
          const gsap = window.gsap;
          const ScrollTrigger = window.ScrollTrigger;

          // In case plugin isn't registered yet
          try {
            gsap.registerPlugin(ScrollTrigger);
          } catch (e) {}

          const fade = document.querySelector(".fade-grey-to-black");
          const wrap = document.querySelector(".wrap-transition");
          if (!fade || !wrap) {
            log("Missing elements", { fade: !!fade, wrap: !!wrap });
            return;
          }

          // Kill any prior triggers created by this module (if reinit)
          const killMine = () => {
            try {
              ScrollTrigger.getAll().forEach((st) => {
                if (
                  st &&
                  st.vars &&
                  st.vars.id &&
                  String(st.vars.id).startsWith("qk-color-sync")
                ) {
                  st.kill(true);
                }
              });
            } catch (e) {}
          };
          killMine();

          const toOrangeState = () => {
            gsap.to([fade, wrap], {
              backgroundColor: ORANGE_BG,
              color: OFFWHITE_TX,
              duration: SMOOTH_DUR,
              ease: "power2.out",
              overwrite: "auto",
            });
          };

          const toOffwhiteState = () => {
            gsap.to([fade, wrap], {
              backgroundColor: OFFWHITE_BG,
              color: ORANGE_TX,
              duration: SMOOTH_DUR,
              ease: "power2.out",
              overwrite: "auto",
            });
          };

          // INITIAL STATE
          gsap.set(wrap, { backgroundColor: ORANGE_BG, color: OFFWHITE_TX });

          // PHASE 1 — ORIGINAL LOGIC
          gsap
            .timeline({
              scrollTrigger: {
                id: "qk-color-sync-phase1",
                trigger: fade,
                start: "center 80%",
                end: "center 50%",
                scrub: true,
                invalidateOnRefresh: true,
              },
            })
            .fromTo(
              fade,
              { backgroundColor: "#f9f9f9", color: "#000" },
              {
                backgroundColor: ORANGE_BG,
                color: OFFWHITE_TX,
                overwrite: "auto",
                ease: "none",
              }
            );

          gsap.to(fade.querySelectorAll(".challenge-item"), {
            "--bg-color": "#0000",
            scrollTrigger: {
              id: "qk-color-sync-items",
              trigger: fade,
              start: "center 80%",
              end: "center 50%",
              scrub: true,
              invalidateOnRefresh: true,
            },
            overwrite: "auto",
            ease: "none",
          });

          // PHASE 2 — HANDOFF (smooth instead of snap)
          const handoffST = ScrollTrigger.create({
            id: "qk-color-sync-handoff",
            trigger: wrap,
            start: "top 50%",
            end: "top 20%",
            scrub: true,
            invalidateOnRefresh: true,

            onLeaveBack: () => {
              toOrangeState();
              if (DEBUG) log("leaveBack -> tween BOTH to orange");
            },

            onLeave: () => {
              toOffwhiteState();
              if (DEBUG) log("leave -> tween BOTH to offwhite");
            },
          });

          gsap.fromTo(
            [fade, wrap],
            { backgroundColor: ORANGE_BG, color: OFFWHITE_TX },
            {
              backgroundColor: OFFWHITE_BG,
              color: ORANGE_TX,
              ease: "none",
              overwrite: "auto",
              immediateRender: false,
              scrollTrigger: handoffST,
            }
          );

          // Cleanup for route changes / reinits
          window.__COLOR_SYNC_CLEANUP = () => {
            try {
              killMine();
            } catch (e) {}
          };

          // If Lenis / layout changes, refresh triggers after things settle
          try {
            setTimeout(() => ScrollTrigger.refresh(), 250);
          } catch (e) {}

          log("init OK");
        },
        { tries: 400, every: 50, label: "__injectColorSync(gsap+elements)" }
      );
    } catch (e) {}
  }

  /* -----------------------------
     3) Lenis integration + scroll lock
     (safe: reuses existing instance)
     ----------------------------- */
  function __initLenisLocking() {
    if (window.__LENIS_LOCK_INITED) return;
    window.__LENIS_LOCK_INITED = true;

    // Reuse existing instance if present
    let lenis = window.lenis || window.__lenis || null;

    // If no instance but Lenis constructor exists globally, create one
    if (!lenis && typeof window.Lenis === "function") {
      try {
        lenis = new window.Lenis();
        window.lenis = lenis;
        window.__lenis = lenis;
      } catch (e) {
        warn("Failed to create Lenis instance", e);
      }
    }

    if (!lenis) {
      warn("Lenis instance not found; skipping lock/unlock wiring.");
      return;
    }

    // Only start raf loop once
    if (!window.__LENIS_RAF_RUNNING) {
      window.__LENIS_RAF_RUNNING = true;
      const raf = (time) => {
        try {
          lenis.raf(time);
        } catch (e) {}
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }

    let isScrollLocked = false;

    function lockScroll() {
      if (isScrollLocked) return;
      try {
        lenis.stop();
      } catch (e) {}
      document.documentElement.classList.add("lenis-stopped");
      isScrollLocked = true;
    }

    function unlockScroll() {
      if (!isScrollLocked) return;
      try {
        lenis.start();
      } catch (e) {}
      document.documentElement.classList.remove("lenis-stopped");
      isScrollLocked = false;
    }

    // Preserve native scroll for modal body content
    document.querySelectorAll(".modal-body-content").forEach((el) => {
      el.setAttribute("data-lenis-prevent", "");
    });

    // Allow inner scroll within services inner
    const allowInnerScroll = () => {
      const el = document.querySelector(".x_bc-header_services_inner");
      if (!el) return;

      // Stop propagation so Lenis doesn't steal it
      bindOnce(el, "services_stop_wheel", "wheel", (e) => e.stopPropagation(), {
        passive: false,
      });
      bindOnce(
        el,
        "services_stop_touch",
        "touchmove",
        (e) => e.stopPropagation(),
        { passive: false }
      );
    };

    allowInnerScroll();

    // Menu click bindings (these selectors assume those elements exist)
    bindOnce(document, "lenis_click_1", "click", (e) => {
      if (e.target.closest(".x_bc_menu_link.is-open")) lockScroll();
      if (e.target.closest(".x_bc_menu_link.is-close")) unlockScroll();
    });

    bindOnce(document, "lenis_click_2", "click", (e) => {
      if (e.target.closest(".x_nav_button_ico.is-open")) lockScroll();
      if (
        e.target.closest(".x_nav_button_ico.is-close") ||
        e.target.closest(".x_nav_bg")
      )
        unlockScroll();
    });
  }

  /* -----------------------------
     4) Services Menu script (YOUR “capture phase interceptor” version)
     ----------------------------- */
  function __initServicesMenuPrimary() {
    if (window.__SERVICES_MENU_PRIMARY_INITED) return;
    window.__SERVICES_MENU_PRIMARY_INITED = true;

    const servicesWrap = document.querySelector(".x_bc-header_services_wrap");
    const navWrap = document.querySelector(".x_nav_wrap");
    const closeWrap = document.querySelector(
      ".x_bc-header_services_close_wrap"
    );
    const cursorWrap = document.querySelector(
      ".x_g--cursors_services-menu_wrap"
    );
    const servicesInner = document.querySelector(".x_bc-header_services_inner");
    const servicesBottom = document.querySelector(
      ".x_bc-header_services_bottom"
    );
    const servicesText = document.querySelector(
      ".x_bc-header_services_text.x_u-heading-4"
    );
    const servicesIcon = document.querySelector(".x_bc-header_services_ico");

    if (!servicesWrap) {
      warn("No .x_bc-header_services_wrap found – services menu init skipped.");
      return;
    }

    const servicesTextDiv = document.querySelector(".link-text.is-1");
    if (!servicesTextDiv) {
      warn("No .link-text.is-1 found – services menu init skipped.");
      return;
    }

    const servicesAnchor = servicesTextDiv.closest("a.nav-link");
    if (!servicesAnchor) {
      warn(
        ".link-text.is-1 not inside a.nav-link – services menu init skipped."
      );
      return;
    }

    // Icon
    let toggleIcon = servicesTextDiv.querySelector(".services-toggle-icon");
    if (!toggleIcon) {
      toggleIcon = document.createElement("span");
      toggleIcon.className = "services-toggle-icon";
      toggleIcon.setAttribute("aria-hidden", "true");
      servicesTextDiv.appendChild(toggleIcon);
    }

    servicesAnchor.setAttribute("href", "#");

    let isOpen = false;
    let textIconTimeout = null;

    const setTransform = (el, { translateYRem = 0, scale = 1 } = {}) => {
      if (!el) return;
      el.style.transform = `translateY(${translateYRem}rem) scale(${scale})`;
    };

    const setClosedImmediate = () => {
      servicesWrap.style.display = "none";
      servicesWrap.style.opacity = "0";

      if (cursorWrap) {
        cursorWrap.style.opacity = "1";
        cursorWrap.style.transform = "scale(0)";
      }
      if (closeWrap) {
        closeWrap.style.opacity = "0";
        setTransform(closeWrap, { translateYRem: 5, scale: 1 });
      }
      if (servicesInner) {
        servicesInner.style.opacity = "0";
        setTransform(servicesInner, { translateYRem: 10, scale: 0.5 });
      }
      if (servicesBottom) {
        servicesBottom.style.opacity = "0";
        setTransform(servicesBottom, { translateYRem: 5, scale: 1 });
      }

      if (servicesIcon) servicesIcon.style.opacity = "1";
      if (servicesText) servicesText.style.opacity = "0";

      if (navWrap) navWrap.style.display = "";

      servicesTextDiv.classList.remove("is-active");
      toggleIcon && toggleIcon.classList.remove("is-open");

      document.body.classList.remove("services-open");
      isOpen = false;
    };

    const setupTransitions = () => {
      servicesWrap.style.transition = "opacity 200ms ease";
      if (cursorWrap)
        cursorWrap.style.transition =
          "opacity 100ms ease, transform 100ms ease";
      if (closeWrap)
        closeWrap.style.transition =
          "opacity 400ms ease-out, transform 400ms cubic-bezier(0.175,0.885,0.32,1.275)";
      if (servicesInner)
        servicesInner.style.transition =
          "opacity 400ms ease-out, transform 400ms ease-out";
      if (servicesBottom)
        servicesBottom.style.transition =
          "opacity 400ms ease-out, transform 400ms cubic-bezier(0.175,0.885,0.32,1.275)";
      if (servicesIcon) servicesIcon.style.transition = "opacity 200ms ease";
      if (servicesText) servicesText.style.transition = "opacity 200ms ease";
    };

    const openServicesMenu = () => {
      if (isOpen) return;
      isOpen = true;
      clearTimeout(textIconTimeout);

      servicesTextDiv.classList.add("is-active");
      toggleIcon && toggleIcon.classList.add("is-open");
      document.body.classList.add("services-open");

      if (navWrap) navWrap.style.display = "none";

      servicesWrap.style.display = "flex";
      void servicesWrap.offsetWidth;
      servicesWrap.style.opacity = "1";

      if (closeWrap) {
        closeWrap.style.opacity = "1";
        setTransform(closeWrap, { translateYRem: 0, scale: 1 });
      }

      if (cursorWrap) {
        cursorWrap.style.opacity = "1";
        cursorWrap.style.transform = "scale(1)";
      }

      if (servicesInner) {
        setTimeout(() => {
          servicesInner.style.opacity = "1";
          setTransform(servicesInner, { translateYRem: 0, scale: 1 });
        }, 100);
      }

      if (servicesBottom) {
        setTimeout(() => {
          servicesBottom.style.opacity = "1";
          setTransform(servicesBottom, { translateYRem: 0, scale: 1 });
        }, 200);
      }

      if (servicesIcon || servicesText) {
        textIconTimeout = setTimeout(() => {
          if (servicesIcon) servicesIcon.style.opacity = "0";
          if (servicesText) servicesText.style.opacity = "1";
        }, 3000); // (your pasted script says 3000 despite comment)
      }
    };

    const closeServicesMenu = () => {
      if (!isOpen) return;
      isOpen = false;
      clearTimeout(textIconTimeout);

      servicesTextDiv.classList.remove("is-active");
      toggleIcon && toggleIcon.classList.remove("is-open");
      document.body.classList.remove("services-open");

      if (navWrap) navWrap.style.display = "";

      if (servicesBottom) {
        servicesBottom.style.opacity = "0";
        setTransform(servicesBottom, { translateYRem: 5, scale: 1 });
      }

      if (cursorWrap) cursorWrap.style.transform = "scale(0)";

      if (servicesInner) {
        servicesInner.style.opacity = "0";
        setTransform(servicesInner, { translateYRem: 10, scale: 0.5 });
      }

      servicesWrap.style.opacity = "0";
      setTimeout(() => {
        if (!isOpen) servicesWrap.style.display = "none";
      }, 200);

      if (servicesIcon) servicesIcon.style.opacity = "1";
      if (servicesText) servicesText.style.opacity = "0";
    };

    // Expose
    window.__servicesMenu = {
      open: openServicesMenu,
      close: closeServicesMenu,
      state: () => ({ isOpen }),
    };

    // Capture-phase click intercept for Services link
    bindOnce(
      document,
      "services_capture",
      "click",
      (e) => {
        const anchor = e.target.closest("a.nav-link");
        if (!anchor) return;
        if (anchor !== servicesAnchor) return;

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation && e.stopImmediatePropagation();

        if (!isOpen) openServicesMenu();
        else closeServicesMenu();
      },
      true
    );

    // close button
    if (closeWrap) {
      bindOnce(closeWrap, "services_close", "click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation && e.stopImmediatePropagation();
        closeServicesMenu();
      });
    }

    setupTransitions();
    setClosedImmediate();
  }

  /* -----------------------------
     5) Services Menu script (your SECOND version)
     NOTE: This conflicts with the primary one.
     We keep it "available" but DO NOT bind if primary already bound.
     ----------------------------- */
  function __initServicesMenuSecondary() {
    // If primary is active, do not double-bind. Still "active" by being callable.
    if (window.__SERVICES_MENU_SECONDARY_INITED) return;
    window.__SERVICES_MENU_SECONDARY_INITED = true;

    if (window.__SERVICES_MENU_PRIMARY_INITED) {
      // Provide a soft wrapper so you can still call it manually if needed
      window.__servicesMenuSecondary = window.__servicesMenuSecondary || {
        open: () =>
          warn("Secondary services menu not bound because primary is active."),
        close: () =>
          warn("Secondary services menu not bound because primary is active."),
      };
      return;
    }

    // (If you ever disable primary, you can move your secondary binding code here.)
  }

  /* -----------------------------
     6) Scroll show/hide: header.navigation vs .x_nav_wrap popup
     ----------------------------- */
  function __initScrollNavSwap() {
    try {
      // ====== CONFIG ======
      const TOP_THRESHOLD = 40; // px
      const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

      // Prevent double-binding
      if (window.__SCROLL_NAV_SWAP_INIT) return;
      window.__SCROLL_NAV_SWAP_INIT = true;

      const getScrollY = () => {
        // Prefer Lenis if available
        const lenis = window.lenis || window.__lenis;
        if (lenis && typeof lenis.scroll === "number") return lenis.scroll;

        // If your layout scrolls inside the pane
        const pane = document.querySelector(".lenisscroll-pane");
        if (pane && pane.scrollHeight > pane.clientHeight)
          return pane.scrollTop;

        // Fallback
        return window.scrollY || document.documentElement.scrollTop || 0;
      };

      const initOnce = () => {
        const navShell = document.querySelector(
          "header.navigation, .navigation"
        );
        if (!navShell) return false;

        // Popup is OPTIONAL (don’t bail if it’s not injected yet)
        const popupNav = document.querySelector(".x_nav_wrap");

        // Smooth transitions
        navShell.style.transition = `opacity 480ms ease, transform 650ms ${ease}`;
        if (popupNav) {
          popupNav.style.transition = `opacity 480ms ease, transform 650ms ${ease}`;
        }

        // Initial state: at top → header visible, popup hidden
        navShell.style.transform = "translateY(0)";
        navShell.style.opacity = "1";
        navShell.style.pointerEvents = "auto";

        if (popupNav) {
          popupNav.style.opacity = "0";
          popupNav.style.pointerEvents = "none";
          popupNav.style.transform = "translateY(16px)";
        }

        let isAtTop = true;

        const apply = (y) => {
          const nowAtTop = y <= TOP_THRESHOLD;

          if (nowAtTop) {
            if (!isAtTop) {
              // Show header
              navShell.style.transform = "translateY(0)";
              navShell.style.opacity = "1";
              navShell.style.pointerEvents = "auto";

              // Hide popup (if present)
              if (popupNav) {
                popupNav.style.opacity = "0";
                popupNav.style.pointerEvents = "none";
                popupNav.style.transform = "translateY(16px)";
              }
            }
            isAtTop = true;
            return;
          }

          // Away from top
          if (isAtTop) {
            isAtTop = false;

            // Hide header
            navShell.style.transform = "translateY(-72px)";
            navShell.style.opacity = "0";
            navShell.style.pointerEvents = "none";

            // Show popup (if present)
            if (popupNav) {
              popupNav.style.opacity = "1";
              popupNav.style.pointerEvents = "auto";
              popupNav.style.transform = "translateY(0)";
            }
          }
        };

        // ---- Bind to the correct scroller ----
        const lenis = window.lenis || window.__lenis;
        if (lenis && typeof lenis.on === "function") {
          lenis.on("scroll", ({ scroll }) => apply(scroll));
          apply(getScrollY());
          console.log("[scroll-nav] bound to Lenis");
          return true;
        }

        const pane = document.querySelector(".lenisscroll-pane");
        if (pane && pane.scrollHeight > pane.clientHeight) {
          pane.addEventListener("scroll", () => apply(getScrollY()), {
            passive: true,
          });
          apply(getScrollY());
          console.log("[scroll-nav] bound to .lenisscroll-pane");
          return true;
        }

        window.addEventListener("scroll", () => apply(getScrollY()), {
          passive: true,
        });
        apply(getScrollY());
        console.log("[scroll-nav] bound to window");
        return true;
      };

      // Try now, and retry briefly because you inject header/popup later
      if (initOnce()) return;

      let tries = 0;
      const retry = () => {
        tries++;
        if (initOnce()) return;
        if (tries > 180) return; // ~3 seconds at 60fps
        requestAnimationFrame(retry);
      };
      requestAnimationFrame(retry);
    } catch (e) {
      console.warn("[scroll-nav] init error", e);
    }
  }
  window.__initScrollNavSwap = __initScrollNavSwap;

  /* -----------------------------
     7) Scroll blocking while services-open AND gesture starts in header
     ----------------------------- */
  function __initScrollBlockWhileMenuOpen() {
    if (window.__SCROLL_BLOCK_INITED) return;
    window.__SCROLL_BLOCK_INITED = true;

    const HEADER_SEL = "header.navigation";
    const DEBUG = true;
    const slog = (...a) => DEBUG && console.log("[scroll-block]", ...a);

    function isMenuOpen() {
      return document.body.classList.contains("services-open");
    }

    function inHeader(target) {
      const header = document.querySelector(HEADER_SEL);
      return !!(
        header &&
        target &&
        target.closest &&
        target.closest(HEADER_SEL)
      );
    }

    let lastY = window.scrollY;
    bindOnce(
      window,
      "scroll_block_debug",
      "scroll",
      () => {
        const y = window.scrollY;
        lastY = y;
      },
      { passive: true }
    );

    function blockIfNeeded(e) {
      const open = isMenuOpen();
      const hitHeader = inHeader(e.target);
      if (!open || !hitHeader) return;

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation && e.stopImmediatePropagation();

      slog(
        "BLOCKED",
        e.type,
        "deltaY=",
        e.deltaY,
        "target=",
        e.target?.className || e.target?.tagName
      );
    }

    // capture-phase document listeners
    bindOnce(document, "scroll_block_wheel", "wheel", blockIfNeeded, {
      passive: false,
      capture: true,
    });
    bindOnce(document, "scroll_block_touch", "touchmove", blockIfNeeded, {
      passive: false,
      capture: true,
    });

    bindOnce(
      document,
      "scroll_block_key",
      "keydown",
      (e) => {
        if (!isMenuOpen()) return;
        if (!inHeader(document.activeElement)) return;

        const keys = [
          "ArrowUp",
          "ArrowDown",
          "PageUp",
          "PageDown",
          "Home",
          "End",
          " ",
        ];
        if (!keys.includes(e.key)) return;

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation && e.stopImmediatePropagation();
        slog("BLOCKED key scroll:", e.key);
      },
      { capture: true }
    );
  }

  /* -----------------------------
     MASTER: run everything
     ----------------------------- */
  window.__INIT_HEADER_SCRIPTS = function __INIT_HEADER_SCRIPTS() {
    // Safe to call many times; each init has guards.
    // Wait until injected header exists (and optionally services elements)
    waitFor(
      () => document.querySelector("header.navigation"),
      () => {
        if (typeof window.__initScrollNavSwap === "function") {
          window.__initScrollNavSwap();
        } else {
          console.warn("[hdr-init] __initScrollNavSwap missing (skipping)");
        }
        __initScrollBlockWhileMenuOpen();

        // Services menu depends on those elements existing
        __initServicesMenuPrimary();
        __initServicesMenuSecondary();

        // GSAP bits
        try {
          __initGSAPNavigation();
        } catch (e) {
          console.error("[hdr-init] GSAP nav failed", e);
        }
        try {
          __initServicesCarouselWheel();
        } catch (e) {
          console.error("[hdr-init] GSAP wheel failed", e);
        }

        // Lenis lock wiring
        __initLenisLocking();

        log("All header/scripts init attempted.");
      },
      { tries: 240, label: "__INIT_HEADER_SCRIPTS(header.navigation)" }
    );
  };
})();
