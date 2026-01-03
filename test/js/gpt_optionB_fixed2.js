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

// 2) init your header scripts (they may rely on DOM existing)
if (typeof window.__INIT_HEADER_SCRIPTS === "function") {
  window.__INIT_HEADER_SCRIPTS();
}

// 3) Load Webflow runtime AFTER injections so IX2 scans the final DOM (Option B)
try {
  await __loadWebflowOnce("index/js/vMpAccJ2sqik.js");
  // When webflow.js is loaded dynamically (after DOMContentLoaded),
  // explicitly kick the modules so they bind immediately.
  __wfInitAfterLoad();
} catch (e) {
  // If Webflow fails to load, keep site usable; interactions just won't run.
  console.warn("[wf] webflow.js failed to load", e);
}

// Give Webflow one tick to bind interactions
await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));


    })(),
    u
  );
}

// ---- Webflow runtime loader (Option B) ----
// Loads webflow.js exactly once, after Vue mount + all DOM injections.
// This avoids IX2 scanning an incomplete DOM (race condition).
function __loadWebflowOnce(src) {
  const S = (window.__WF_BOOT__ ||= { promise: null, loaded: false });

  // NOTE: Webflow-exported HTML often contains an inline stub:
  //   window.Webflow = window.Webflow || [];
  // That stub is just an Array (so it has .push), but the runtime is NOT loaded yet.
  // Therefore we must NOT treat "push exists" as "Webflow is ready".
  const isRuntimeReady = () =>
    window.Webflow && typeof window.Webflow.require === "function";

  if (S.loaded) return Promise.resolve();
  if (S.promise) return S.promise;

  S.promise = new Promise((resolve, reject) => {
    try {
      // If Webflow runtime is already present (eg. script still in HTML), just resolve.
      // (Don't confuse the Webflow stub array for the runtime.)
      if (isRuntimeReady()) {
        S.loaded = true;
        resolve();
        return;
      }

      const abs = new URL(src, document.baseURI).href;

      // If a matching script tag already exists, wait for it.
      const existing = Array.from(document.scripts).find((s) => {
        const ssrc = s.getAttribute("src");
        return ssrc && new URL(ssrc, document.baseURI).href === abs;
      });

      if (existing) {
        // If it's already loaded, resolve immediately.
        try {
          if (existing.readyState === "complete" || isRuntimeReady()) {
            S.loaded = true;
            resolve();
            return;
          }
        } catch (_) {}
        existing.addEventListener("load", () => {
          S.loaded = true;
          resolve();
        });
        existing.addEventListener("error", reject);
        return;
      }

      const s = document.createElement("script");
      // Use the resolved absolute URL so this works from nested routes like /services.
      s.src = abs;
      s.async = true;
      s.type = "text/javascript";
      s.onload = () => {
        S.loaded = true;
        resolve();
      };
      s.onerror = reject;

      // Append to body when possible; fallback to head.
      (document.body || document.head || document.documentElement).appendChild(s);
    } catch (e) {
      reject(e);
    }
  });

  return S.promise;
}

// After dynamic load, kick Webflow modules to bind interactions immediately.
// (Equivalent to what normally happens on DOM ready in a pure Webflow page.)
function __wfInitAfterLoad() {
  const wf = window.Webflow;
  if (!wf || typeof wf.require !== "function") return;
  const req = wf.require;

  // Interactions
  try {
    const ix2 = req("ix2");
    if (ix2 && typeof ix2.init === "function") ix2.init();
  } catch (_) {}

  // Common Webflow components used on your page
  try { req("lottie")?.ready?.(); } catch (_) {}
  try { req("dropdown")?.ready?.(); } catch (_) {}
  try { req("tabs")?.ready?.(); } catch (_) {}
  try { req("slider")?.ready?.(); } catch (_) {}
  try { req("forms")?.ready?.(); } catch (_) {}

  // Nudge layout calculations
  try { window.dispatchEvent(new Event("resize")); } catch (_) {}
}

function __injectPreStickyIntro() {
  try {
    // Bump version so cached older bundles can’t win.
    const VER = 4;
    if ((window.__PRESTICKY_INTRO_VER || 0) >= VER) return;
    window.__PRESTICKY_INTRO_VER = VER;

    // Kill previous loops/observers if any
    if (window.__INTRO_RAF) cancelAnimationFrame(window.__INTRO_RAF);
    window.__INTRO_RAF = 0;

    if (window.__INTRO_OBS) {
      try { window.__INTRO_OBS.disconnect(); } catch (e) {}
    }
    window.__INTRO_OBS = null;

    const INTRO_ID = "presticky-intro";
    const css = [
      "width:100vw",
      "display:flex",
      "align-items:center",
      "justify-content:center",
      "font-size:48px",
      "font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif",
      "background:white",
      "position:relative",
      "z-index:999",
      "padding-bottom: 100px"
    ].join(";");

    const getTargets = () => {
      const pane = document.querySelector(".lenisscroll-pane");
      const main = pane && pane.querySelector(":scope > main");
      if (!pane || !main) return null;

      // IMPORTANT: wait until Vue has actually rendered the HomeAnimation subtree,
      // otherwise hydration/patching can “adopt” our injected node.
      const hasHomeAnim =
        !!main.querySelector(".HomeAnimation") &&
        !!main.querySelector(".HomeAnimation-landscape") &&
        !!main.querySelector(".HomeAnimation-landscape-sticky-wrap");

      if (!hasHomeAnim) return null;

      return { pane, main };
    };

    // Hard guarantee: only ONE injected section exists anywhere
    const removeAllInjectedClones = (keepNode) => {
      document.querySelectorAll(".InjectedTestSection").forEach((el) => {
        if (el !== keepNode) el.remove();
      });

      // Extra paranoia: if something duplicated the ID, keep the first and delete the rest
      const dupes = document.querySelectorAll(`#${CSS.escape(INTRO_ID)}`);
      if (dupes.length > 1) {
        dupes.forEach((el, idx) => { if (idx !== 0) el.remove(); });
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
        intro.innerHTML = `<section class="section overflow-hidden">
              <div class="padding-bottom padding-xhuge">
                <div class="page-padding">
                  <div class="container-large">
                    <div class="hero-wrapper is-new">
                      <h1 class="hero-heading is-new">
                        <div class="hero-heading_word">
                          <div
                            data-w-id="b2cc91f5-e90d-eb2a-5b1a-fe04d92c0734"
                            class="hero-heading_mask"
                          >
                            <div
                              data-w-id="a5e9ce1a-dc41-a502-5ab4-74a54e608705"
                              style="
                                -webkit-transform: translate3d(0, 120%, 0)
                                  scale3d(1, 1, 1) rotateX(0) rotateY(0)
                                  rotateZ(0) skew(0, 0);
                                -moz-transform: translate3d(0, 120%, 0)
                                  scale3d(1, 1, 1) rotateX(0) rotateY(0)
                                  rotateZ(0) skew(0, 0);
                                -ms-transform: translate3d(0, 120%, 0)
                                  scale3d(1, 1, 1) rotateX(0) rotateY(0)
                                  rotateZ(0) skew(0, 0);
                                transform: translate3d(0, 120%, 0)
                                  scale3d(1, 1, 1) rotateX(0) rotateY(0)
                                  rotateZ(0) skew(0, 0);
                              "
                              class="hero-heading_text"
                            >
                              Build
                            </div>
                          </div>
                          <button
                            data-w-id="06e4c0f5-ac5c-3bb5-b3af-9de2e4a0d400"
                            style="opacity: 0"
                            data-vimeo-lightbox-control="open"
                            data-vimeo-lightbox-id="1116214405"
                            class="hero-heading_img is-btn"
                          >
                            <div class="video-play">PLAY</div>
                            <img
                              src="index/images/r8a3dPeHTsmH.gif"
                              loading="eager"
                              width="250"
                              height="250"
                              alt=""
                              class="hero-img-1"
                            /><img
                              class="vimeo-thumb"
                              src="index/images/68bb30e3208f760f22b823b9_93847d09e97a953ebb4d929c6b85833d_2055772682-2fdefad43fffdaecc660a9ae2607c315e34b058d849a98c90ebe927ed7b9273c-d_640_region%253Dus.jpg"
                              width="1000"
                              data-vimeo-lightbox-placeholder=""
                              height="1000"
                              alt=""
                              sizes="(max-width: 479px) 97vw, (max-width: 767px) 98vw, 99vw"
                              loading="eager"
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
                          <div
                            data-w-id="04a38487-0738-4bad-8bd1-c683087e199d"
                            class="hero-heading_mask"
                          >
                            <div
                              data-w-id="94fde4fa-43d5-1b6d-47d3-8eea41608e91"
                              style="
                                -webkit-transform: translate3d(0, 120%, 0)
                                  scale3d(1, 1, 1) rotateX(0) rotateY(0)
                                  rotateZ(0) skew(0, 0);
                                -moz-transform: translate3d(0, 120%, 0)
                                  scale3d(1, 1, 1) rotateX(0) rotateY(0)
                                  rotateZ(0) skew(0, 0);
                                -ms-transform: translate3d(0, 120%, 0)
                                  scale3d(1, 1, 1) rotateX(0) rotateY(0)
                                  rotateZ(0) skew(0, 0);
                                transform: translate3d(0, 120%, 0)
                                  scale3d(1, 1, 1) rotateX(0) rotateY(0)
                                  rotateZ(0) skew(0, 0);
                              "
                              class="hero-heading_text"
                            >
                              Digital
                            </div>
                          </div>
                        </div>
                        <div class="hero-heading_word">
                          <div
                            data-w-id="5724ed6a-d74b-d35c-6362-37aef0090b40"
                            class="hero-heading_mask"
                          >
                            <div
                              data-w-id="8cc462ba-2ae2-e655-5eca-bfa87e9d9fd9"
                              style="
                                -webkit-transform: translate3d(0, 120%, 0)
                                  scale3d(1, 1, 1) rotateX(0) rotateY(0)
                                  rotateZ(0) skew(0, 0);
                                -moz-transform: translate3d(0, 120%, 0)
                                  scale3d(1, 1, 1) rotateX(0) rotateY(0)
                                  rotateZ(0) skew(0, 0);
                                -ms-transform: translate3d(0, 120%, 0)
                                  scale3d(1, 1, 1) rotateX(0) rotateY(0)
                                  rotateZ(0) skew(0, 0);
                                transform: translate3d(0, 120%, 0)
                                  scale3d(1, 1, 1) rotateX(0) rotateY(0)
                                  rotateZ(0) skew(0, 0);
                              "
                              class="hero-heading_text"
                            >
                              experien­ces
                            </div>
                          </div>
                        </div>
                        <div class="hero-heading_word">
                          <div class="hero-heading_img is-img-2">
                            <img
                              class="hero-img-2"
                              src="index/images/VBhquZRBW96M.jpg"
                              width="446"
                              height="256"
                              alt=""
                              style="opacity: 0"
                              sizes="(max-width: 479px) 100vw, 446px"
                              data-w-id="a5e9ce1a-dc41-a502-5ab4-74a54e60870f"
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
                          <div
                            data-w-id="6e3a8d10-eb31-55b6-e19a-17ec9e1c83fd"
                            class="hero-heading_mask"
                          >
                            <div
                              data-w-id="87c233cf-f1a3-72bf-cf2c-92a1a4b60bba"
                              style="
                                -webkit-transform: translate3d(0, 120%, 0)
                                  scale3d(1, 1, 1) rotateX(0) rotateY(0)
                                  rotateZ(0) skew(0, 0);
                                -moz-transform: translate3d(0, 120%, 0)
                                  scale3d(1, 1, 1) rotateX(0) rotateY(0)
                                  rotateZ(0) skew(0, 0);
                                -ms-transform: translate3d(0, 120%, 0)
                                  scale3d(1, 1, 1) rotateX(0) rotateY(0)
                                  rotateZ(0) skew(0, 0);
                                transform: translate3d(0, 120%, 0)
                                  scale3d(1, 1, 1) rotateX(0) rotateY(0)
                                  rotateZ(0) skew(0, 0);
                              "
                              class="hero-heading_text"
                            >
                              that
                            </div>
                          </div>
                        </div>
                        <div class="hero-heading_word">
                          <div
                            data-w-id="98af9948-81f7-83e4-c5c0-63177ed3a374"
                            class="hero-heading_mask"
                          >
                            <div
                              data-w-id="d50b4bfb-cd58-6208-e28a-0111e0f034d6"
                              style="
                                -webkit-transform: translate3d(0, 120%, 0)
                                  scale3d(1, 1, 1) rotateX(0) rotateY(0)
                                  rotateZ(0) skew(0, 0);
                                -moz-transform: translate3d(0, 120%, 0)
                                  scale3d(1, 1, 1) rotateX(0) rotateY(0)
                                  rotateZ(0) skew(0, 0);
                                -ms-transform: translate3d(0, 120%, 0)
                                  scale3d(1, 1, 1) rotateX(0) rotateY(0)
                                  rotateZ(0) skew(0, 0);
                                transform: translate3d(0, 120%, 0)
                                  scale3d(1, 1, 1) rotateX(0) rotateY(0)
                                  rotateZ(0) skew(0, 0);
                              "
                              class="hero-heading_text"
                            >
                              refuse
                            </div>
                          </div>
                          <div class="hero-heading_img is-img-3">
                            <img
                              class="hero-img-3"
                              src="index/images/FxBWSg813AXr.jpg"
                              width="350"
                              height="388"
                              alt=""
                              style="opacity: 0"
                              sizes="(max-width: 479px) 100vw, 350px"
                              data-w-id="a5e9ce1a-dc41-a502-5ab4-74a54e608711"
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
                          <div
                            data-w-id="5cc55046-87d2-732e-ed0f-df8e16cb90f0"
                            class="hero-heading_mask"
                          >
                            <div
                              data-w-id="651266b1-ca34-8285-6d9c-dd8718e29e6f"
                              style="
                                -webkit-transform: translate3d(0, 120%, 0)
                                  scale3d(1, 1, 1) rotateX(0) rotateY(0)
                                  rotateZ(0) skew(0, 0);
                                -moz-transform: translate3d(0, 120%, 0)
                                  scale3d(1, 1, 1) rotateX(0) rotateY(0)
                                  rotateZ(0) skew(0, 0);
                                -ms-transform: translate3d(0, 120%, 0)
                                  scale3d(1, 1, 1) rotateX(0) rotateY(0)
                                  rotateZ(0) skew(0, 0);
                                transform: translate3d(0, 120%, 0)
                                  scale3d(1, 1, 1) rotateX(0) rotateY(0)
                                  rotateZ(0) skew(0, 0);
                              "
                              class="hero-heading_text"
                            >
                            to blend in
                            </div>
                          </div>
                        </div>
                      </h1>
                    </div>
                    <div class="home-intro-grid custom-margin-home">
                      <div
                        id="w-node-a5e9ce1a-dc41-a502-5ab4-74a54e608718-644deb4a"
                        data-w-id="a5e9ce1a-dc41-a502-5ab4-74a54e608718"
                        style="
                          opacity: 0;
                          -webkit-transform: translate3d(0, 2rem, 0)
                            scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0)
                            skew(0, 0);
                          -moz-transform: translate3d(0, 2rem, 0)
                            scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0)
                            skew(0, 0);
                          -ms-transform: translate3d(0, 2rem, 0)
                            scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0)
                            skew(0, 0);
                          transform: translate3d(0, 2rem, 0) scale3d(1, 1, 1)
                            rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                        "
                        class="hero-button-wrapper"
                      >
                        <a href="./services" class="button w-inline-block" style="padding: 1rem 3rem !important;"
                          ><div class="button-text-wrap" style="font-size: 1.1vw; line-height: 138%;">
                            Build your website like you give a quack →
                          </div></a
                        >
                      </div>
                      <div
                        id="w-node-a5e9ce1a-dc41-a502-5ab4-74a54e60871b-644deb4a"
                      >
                        <div
                          data-w-id="32640830-ee85-2cfd-3b3b-9287cac19ee6"
                          style="
                            -webkit-transform: translate3d(0, 0, 0)
                              scale3d(0, 1, 1) rotateX(0) rotateY(0) rotateZ(0)
                              skew(0, 0);
                            -moz-transform: translate3d(0, 0, 0)
                              scale3d(0, 1, 1) rotateX(0) rotateY(0) rotateZ(0)
                              skew(0, 0);
                            -ms-transform: translate3d(0, 0, 0) scale3d(0, 1, 1)
                              rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                            transform: translate3d(0, 0, 0) scale3d(0, 1, 1)
                              rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                          "
                          class="h-line"
                        ></div>
                        <div
                          data-w-id="a5e9ce1a-dc41-a502-5ab4-74a54e60871c"
                          style="
                            opacity: 0;
                            -webkit-transform: translate3d(0, 1rem, 0)
                              scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0)
                              skew(0, 0);
                            -moz-transform: translate3d(0, 1rem, 0)
                              scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0)
                              skew(0, 0);
                            -ms-transform: translate3d(0, 1rem, 0)
                              scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0)
                              skew(0, 0);
                            transform: translate3d(0, 1rem, 0) scale3d(1, 1, 1)
                              rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                          "
                          class="eyebrow no-border is--home"
                        >
                          Who We Are
                        </div>
                        <h2
                          data-w-id="a5e9ce1a-dc41-a502-5ab4-74a54e60871e"
                          style="
                            opacity: 0;
                            -webkit-transform: translate3d(0, 2rem, 0)
                              scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0)
                              skew(0, 0);
                            -moz-transform: translate3d(0, 2rem, 0)
                              scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0)
                              skew(0, 0);
                            -ms-transform: translate3d(0, 2rem, 0)
                              scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0)
                              skew(0, 0);
                            transform: translate3d(0, 2rem, 0) scale3d(1, 1, 1)
                              rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                          "
                          class="home-intro"
                        >
                          <span class="spin">✺</span> We partner with fearless brands to create bold digital spaces for brands that refuse to blend in. 
                        </h2>
                      </div>
                    </div>
                    <section
                      data-w-id="a5e9ce1a-dc41-a502-5ab4-74a54e608720"
                      style="
                        opacity: 0;
                        -webkit-transform: translate3d(0, 5%, 0)
                          scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0)
                          skew(0, 0);
                        -moz-transform: translate3d(0, 5%, 0) scale3d(1, 1, 1)
                          rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                        -ms-transform: translate3d(0, 5%, 0) scale3d(1, 1, 1)
                          rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                        transform: translate3d(0, 5%, 0) scale3d(1, 1, 1)
                          rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                      "
                      class="home-grid-cards"
                    >
                      <a
                        id="w-node-a5e9ce1a-dc41-a502-5ab4-74a54e608721-644deb4a"
                        href="./work/wa-solutions"
                        class="home-project-card w-inline-block"
                        ><img
                          class="card-bg"
                          src="index/images/9x7qfQC3kWvd.jpg"
                          width="1216"
                          height="1564"
                          alt=""
                          sizes="100vw"
                          data-w-id="a5e9ce1a-dc41-a502-5ab4-74a54e608722"
                          loading="lazy"
                          srcset="
                            index/images/9JewMItFwTlB.jpg  500w,
                            index/images/H1tRswqlSSG9.jpg  800w,
                            index/images/TcdG5ELSFRMV.jpg 1080w,
                            index/images/9x7qfQC3kWvd.jpg 1402w
                          "
                        />
                        <div class="project-card-info">
                          <h3 class="heading-small">WA Solutions</h3>
                          <div class="project-tag">Logistics</div>
                        </div></a
                      >
                      <div
                        id="w-node-a5e9ce1a-dc41-a502-5ab4-74a54e608728-644deb4a"
                        class="home-text-card"
                      >
                        <div>
                          From digital strategy, brand & user experience design,
                          and full-stack development, our expertise empowers
                          brands to look ahead and bring bold concepts to life.
                        </div>
                      </div>
                      <a
                        id="w-node-a5e9ce1a-dc41-a502-5ab4-74a54e60872b-644deb4a"
                        href="./work/seatgeek"
                        class="home-project-card w-inline-block"
                        ><div class="project-card-info">
                          <h3 class="heading-small">SeatGeek</h3>
                          <div class="project-tag">Entertainment</div>
                        </div>
                        <img
                          src="index/images/CfOdnGOrTEqI.jpg"
                          loading="lazy"
                          width="812"
                          height="1564"
                          alt=""
                          srcset="
                            index/images/NuwtcfOtq8Dc.jpg  500w,
                            index/images/arRlNJOykmAv.jpg  800w,
                            index/images/FaMzfaeT8NBH.jpg 1080w,
                            index/images/ATxTyPreRNWQ.jpg 1600w,
                            index/images/M3OCu7slz5ap.jpg 2000w,
                            index/images/iBePSVm2XjQI.jpg 2600w,
                            index/images/ilIHNtaeexF5.jpg 3200w,
                            index/images/CfOdnGOrTEqI.jpg 4533w
                          "
                          sizes="(max-width: 991px) 100vw, 812px"
                          class="card-bg"
                      /></a>
                      <div
                        id="w-node-a5e9ce1a-dc41-a502-5ab4-74a54e608732-644deb4a"
                        class="home-text-card"
                      >
                        <div class="max-width-small">
                          <div>
                            SAAS, gaming, finance, sports, logistics, fashion,
                            insurance, fitness, e-commerce, security,
                            information technology, <strong>yes</strong>
                          </div>
                        </div>
                      </div>
                      <a
                        href="./work/optix"
                        class="home-project-card w-inline-block"
                        ><img
                          src="index/images/jfVlPkP74hkx.webp"
                          loading="lazy"
                          width="812"
                          height="1564"
                          alt=""
                          srcset="
                            index/images/uWt6lfUgmSb3.webp  500w,
                            index/images/fZlX0UxZHuPR.webp  800w,
                            index/images/jfVlPkP74hkx.webp 1065w
                          "
                          sizes="(max-width: 991px) 100vw, 812px"
                          class="card-bg"
                        />
                        <div class="project-card-info">
                          <h3 class="heading-small">Optix</h3>
                          <div class="project-tag">Coworking</div>
                        </div></a
                      ><a
                        href="./work/jackie"
                        class="home-project-card w-inline-block"
                        ><img
                          src="index/images/XjBb8NC4l9zI.png"
                          loading="lazy"
                          width="812"
                          height="1564"
                          alt=""
                          class="card-bg"
                        />
                        <div class="project-card-info">
                          <h3 class="heading-small">Jackie</h3>
                          <div class="project-tag">Fashion</div>
                        </div></a
                      >
                    </section>
                  </div>
                </div>
              </div>
            </section>`;
      } else {
        // Make sure styling/class stays consistent even if something patched it
        intro.classList.add("InjectedTestSection");
        if (!intro.getAttribute("data-presticky-intro")) {
          intro.setAttribute("data-presticky-intro", "1");
        }
        if (!intro.style.cssText) intro.style.cssText = css;
      }

      // MUST be: child of .lenisscroll-pane AND immediately before <main>
      const shouldBeHere =
        intro.parentElement === pane && intro.nextElementSibling === main;

      if (!shouldBeHere) {
        pane.insertBefore(intro, main);
      }

      // Immediately delete any clones (no attribute checks, no id checks except keepNode)
      removeAllInjectedClones(intro);

      // Globals used by your “offset aware” logic elsewhere
      const update = () => {
        const top = main.getBoundingClientRect().top;
        const atTop = top <= 0;

        // unlock flag for your scroll/animation gating
        window.__INTRO_MAIN_AT_TOP = atTop;

        // intro height in px (for offsetting scroll math elsewhere if needed)
        window.__INTRO_OFFSET_PX =
          intro.getBoundingClientRect().height || window.innerHeight;
      };

      // Only do work when state changes (prevents console spam / pointless writes)
      let lastAtTop = null;
      const loop = () => {
        const top = main.getBoundingClientRect().top;
        const atTop = top <= 0;

        if (lastAtTop !== atTop) {
          lastAtTop = atTop;
          update();
        } else {
          // Still keep offset fresh in case of responsive changes
          window.__INTRO_OFFSET_PX =
            intro.getBoundingClientRect().height || window.innerHeight;
        }

        window.__INTRO_RAF = requestAnimationFrame(loop);
      };

      // Start loop once
      window.__INTRO_RAF = requestAnimationFrame(loop);

      // Re-assert placement if Vue re-patches DOM later (this stops the “duplication”)
      const obs = new MutationObserver(() => {
        const fresh = getTargets();
        if (!fresh) return;

        const { pane: p2, main: m2 } = fresh;

        // Re-find the canonical node (in case Vue swapped references)
        const node = document.getElementById(INTRO_ID);
        if (!node) return;

        // Force correct placement
        if (!(node.parentElement === p2 && node.nextElementSibling === m2)) {
          p2.insertBefore(node, m2);
        }

        // Kill any clones anywhere in the DOM (including inside sticky-wrap)
        removeAllInjectedClones(node);
      });

      window.__INTRO_OBS = obs;
      obs.observe(document.documentElement, { childList: true, subtree: true });

      // Run one immediate update so globals are correct on first paint
      update();

      // Reset lastAtTop so loop updates correctly after first paint
      lastAtTop = null;

      return true;
    };

    // Try now, otherwise wait until Vue finishes creating the subtree.
    if (ensureIntro()) return;

    const waiter = new MutationObserver(() => {
      if (ensureIntro()) {
        waiter.disconnect();
      }
    });

    waiter.observe(document.documentElement, { childList: true, subtree: true });

    // Don’t watch forever
    setTimeout(() => {
      try { waiter.disconnect(); } catch (e) {}
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

            <a data-button-hover="" href="./work-with-us" class="button is-nav w-inline-block">
              <div data-button-text="" class="button-anim__text">Work With Us</div>
            </a>
            <link rel="prefetch" href="./work-with-us" />
            <div class="menu-bg"></div>
          </div>
        </div>
        <div class="spacing-div" style="width: 30%;"></div>
      `;

    // Insert INSIDE lenis pane as sibling of presticky-intro (preferred)
    const presticky = pane.querySelector("#presticky-intro");
    const main = pane.querySelector(":scope > main") || pane.querySelector("main");

    if (presticky) {
      pane.insertBefore(header, presticky);
    } else if (main) {
      pane.insertBefore(header, main);
    } else {
      pane.prepend(header);
    }

    
    


    

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
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      viewBox="0 0 40 40"
                      fill="none"
                      class="x_nav_logo_ico"
                    >
                      <path
                        d="M33.3672 19.4413C33.3672 21.1894 34.6857 22.3863 36.3279 22.3863C37.9623 22.3863 39.2808 21.1894 39.2808 19.4413C39.2808 17.6853 37.9623 16.4727 36.3279 16.4727C34.6857 16.4727 33.3672 17.6853 33.3672 19.4413ZM34.0225 19.4413C34.0225 18.0239 35.0331 17.0711 36.3279 17.0711C37.6465 17.0711 38.6255 18.0239 38.6255 19.4413C38.6255 20.8272 37.6465 21.7957 36.3279 21.7957C35.0331 21.7957 34.0225 20.8272 34.0225 19.4413ZM35.8226 19.7799H36.2806L36.9438 20.9059H37.8912L37.1254 19.6539C37.4649 19.52 37.7017 19.2602 37.7017 18.7877C37.7017 17.9688 37.078 17.7562 36.2332 17.7562H34.9699V20.9059H35.8226V19.7799ZM36.849 18.7877C36.849 18.9767 36.7306 19.1263 36.4464 19.1263H35.8226V18.4176H36.4464C36.7306 18.4176 36.849 18.6066 36.849 18.7877Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M17.1696 3.57031C16.6621 11.6956 9.86975 17.8578 1.99848 17.3339L1.42969 26.4408C14.1733 27.289 25.1701 17.3124 25.9917 4.15746L17.1696 3.57031Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M31.4297 22.4969H20.1826L16.1552 34.2846H26.199L31.4297 22.4969Z"
                        fill="currentColor"
                      ></path></svg
                  ></a>
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
                      nav-link="works"
                      href="./projects.html"
                      class="x_nav_link_wrap is-works w-inline-block"
                      ><div class="x_nav_link_text x_u-l-body">Works</div>
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
                      href="https://www.linkedin.com/company/fourmeta/mycompany/"
                      target="_blank"
                      class="x_nav_socials_link x_u-s-body"
                      >Linkedin</a
                    ><a
                      href="https://www.instagram.com/fourmeta.agency/"
                      target="_blank"
                      class="x_nav_socials_link x_u-s-body"
                      >Instagram</a
                    ><a
                      href="https://www.facebook.com/fourmeta.agency"
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
                            User experience design
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
                            index/images/Ex50kTTBQE8f.avif 500w,
                            index/images/MEbEHlhyRgz7.avif 880w
                          "
                          alt=""
                          src="index/images/MEbEHlhyRgz7.avif"
                          loading="lazy"
                          class="x_nav_services_bg" /></a
                      ><a
                        href="./digital-product-development"
                        class="x_nav_services_link w-inline-block"
                        ><div class="x_nav_services_subtitle x_u-s-body">
                          10 services<br />
                        </div>
                        <div class="x_nav_services_bottom">
                          <div class="x_nav_services_title x_u-l-body">
                            Digital product development
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
                            index/images/cgiRSxsdDCNa.avif 500w,
                            index/images/4y5S09TQNmTa.avif 880w
                          "
                          alt=""
                          src="index/images/4y5S09TQNmTa.avif"
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
                            Branding services
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
                            index/images/HiM8KO8LhrgL.avif 500w,
                            index/images/XkUPGA4V2iz0.avif 880w
                          "
                          alt=""
                          src="index/images/XkUPGA4V2iz0.avif"
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
                            Marketing design & animation
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
                            index/images/9gzGuiswPtDM.avif 500w,
                            index/images/lA5cZQcoXN7q.avif 880w
                          "
                          alt=""
                          src="index/images/lA5cZQcoXN7q.avif"
                          loading="lazy"
                          class="x_nav_services_bg"
                      /></a>
                    </div>
                    <div class="x_nav_services_row">
                      <a
                        href="./digital-marketing"
                        class="x_nav_services_link w-inline-block"
                        ><div class="x_nav_services_subtitle x_u-s-body">
                          6 services
                        </div>
                        <div class="x_nav_services_bottom">
                          <div class="x_nav_services_title x_u-l-body">
                            Digital marketing
                          </div>
                          <div
                            class="x_nav_services_ico"
                            data-w-id="0bd49cce-db8a-e955-2140-f1490e1edee3"
                            data-animation-type="lottie"
                            data-src="https://cdn.prod.website-files.com/63f5d378a903c2a12583ce2f/679794efd581f88d7816894a_Social%20Media.json"
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
                          loading="lazy"
                          src="index/images/6813429b07113242088e834c_image%20%2816%29.avif"
                          alt=""
                          class="x_nav_services_bg" /></a
                      ><a
                        href="./shopify-ecommerce"
                        class="x_nav_services_link is-last w-inline-block"
                        ><div class="x_nav_services_subtitle x_u-s-body">
                          8 services
                        </div>
                        <div class="x_nav_services_bottom">
                          <div class="x_nav_services_title x_u-l-body">
                            Shopify eCommerce
                          </div>
                          <div
                            class="x_nav_services_ico"
                            data-w-id="3bab695c-d5e3-c1f7-9c7b-7c7c44140333"
                            data-animation-type="lottie"
                            data-src="https://cdn.prod.website-files.com/63f5d378a903c2a12583ce2f/679794ed890900b4a3a7a885_Payments.json"
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
                          loading="lazy"
                          src="index/images/1od3LmQmI811.avif"
                          alt=""
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
                        <div class="x_nav_about_num">300+</div>
                        <div class="x_nav_about_num_text">
                          Finished <br />projects
                        </div>
                      </div>
                      <div class="x_nav_about_num_wrap">
                        <div class="x_nav_about_num">7</div>
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
                            href="./blog/time-to-redesign-website"
                            class="x_nav_insights_link w-inline-block"
                            ><div class="x_nav_insights_img_wrap">
                              <img
                                src="index/images/67ffbb76fd4a3d25801489c9_website%20redesign.jpg"
                                loading="lazy"
                                alt=""
                                sizes="100vw"
                                srcset="
                                  index/images/67ffbb76fd4a3d25801489c9_website%20redesign-p-500.jpg   500w,
                                  index/images/67ffbb76fd4a3d25801489c9_website%20redesign-p-800.jpg   800w,
                                  index/images/67ffbb76fd4a3d25801489c9_website%20redesign-p-1080.jpg 1080w,
                                  index/images/67ffbb76fd4a3d25801489c9_website%20redesign.jpg        1598w
                                "
                                class="x_nav_insights_img"
                              />
                            </div>
                            <div class="x_nav_insights_content">
                              <div class="x_nav_insights_service x_u-s-body">
                                UX/UI
                              </div>
                              <div class="x_nav_insights_title x_u-s-body">
                                Website Redesign: Is It Time to Change the
                                Design of Your Website?
                              </div>
                            </div></a
                          >
                        </div>
                        <div
                          role="listitem"
                          class="x_nav_insights_item w-dyn-item"
                        >
                          <a
                            href="./blog/effective-landing-page-design-for-startups"
                            class="x_nav_insights_link w-inline-block"
                            ><div class="x_nav_insights_img_wrap">
                              <img
                                src="index/images/VUXfjsyNYguJ.jpg"
                                loading="lazy"
                                alt=""
                                sizes="100vw"
                                srcset="
                                  index/images/uK3c23re5xB6.jpg 500w,
                                  index/images/VUXfjsyNYguJ.jpg 799w
                                "
                                class="x_nav_insights_img"
                              />
                            </div>
                            <div class="x_nav_insights_content">
                              <div class="x_nav_insights_service x_u-s-body">
                                UX/UI
                              </div>
                              <div class="x_nav_insights_title x_u-s-body">
                                How to Create an Effective Landing Page for Your
                                Startup
                              </div>
                            </div></a
                          >
                        </div>
                        <div
                          role="listitem"
                          class="x_nav_insights_item w-dyn-item"
                        >
                          <a
                            href="./blog/11-key-ux-and-ui-components-driving-website-engagement"
                            class="x_nav_insights_link w-inline-block"
                            ><div class="x_nav_insights_img_wrap">
                              <img
                                src="index/images/mNvEfsaclxtl.jpg"
                                loading="lazy"
                                alt=""
                                sizes="100vw"
                                srcset="
                                  index/images/100PLMJozlY4.jpg  500w,
                                  index/images/BwW5AjbaSeV4.jpg  800w,
                                  index/images/K3QwfUJHDtxd.jpg 1080w,
                                  index/images/mNvEfsaclxtl.jpg 1598w
                                "
                                class="x_nav_insights_img"
                              />
                            </div>
                            <div class="x_nav_insights_content">
                              <div class="x_nav_insights_service x_u-s-body">
                                UX/UI
                              </div>
                              <div class="x_nav_insights_title x_u-s-body">
                                11 Key UX and UI Components Driving Website
                                Engagement
                              </div>
                            </div></a
                          >
                        </div>
                        <div
                          role="listitem"
                          class="x_nav_insights_item w-dyn-item"
                        >
                          <a
                            href="./blog/what-is-a-design-brief"
                            class="x_nav_insights_link w-inline-block"
                            ><div class="x_nav_insights_img_wrap">
                              <img
                                src="index/images/pJJ14WyPVz5l.jpg"
                                loading="lazy"
                                alt=""
                                sizes="100vw"
                                srcset="
                                  index/images/h1X8KvweF5mI.jpg  500w,
                                  index/images/a44Jh20UqG4S.jpg  800w,
                                  index/images/T0FbowkYJCc5.jpg 1080w,
                                  index/images/pJJ14WyPVz5l.jpg 1598w
                                "
                                class="x_nav_insights_img"
                              />
                            </div>
                            <div class="x_nav_insights_content">
                              <div class="x_nav_insights_service x_u-s-body">
                                UX/UI
                              </div>
                              <div class="x_nav_insights_title x_u-s-body">
                                What Is a Design Brief for Your Project And How
                                to Create It?
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
                              index/images/headshot-filler.jpg 500w,
                              index/images/headshot-filler.jpg 800w,
                              index/images/headshot-filler.jpg 1080w,
                              index/images/headshot-filler.jpg 1090w
                            "
                            alt="Ruben Roubish"
                            src="index/images/headshot-filler.jpg"
                            loading="lazy"
                            class="x_nav_contact_img"
                          />
                          <div class="x_nav_contact_name_wrap">
                            <div class="x_nav_contact_name_ico w-embed">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="100%"
                                height="100%"
                                viewBox="0 0 25 24"
                                fill="none"
                              >
                                <circle
                                  cx="12.4844"
                                  cy="12"
                                  r="12"
                                  fill="white"
                                ></circle>
                                <circle
                                  cx="3.51432"
                                  cy="3.51432"
                                  r="3.51432"
                                  transform="matrix(-1 0 0 1 16 8.48535)"
                                  fill="#8A9F83"
                                ></circle>
                                <circle
                                  opacity="0.6"
                                  cx="12.4902"
                                  cy="12"
                                  r="4.97862"
                                  stroke="#83838E"
                                  stroke-width="0.58572"
                                ></circle>
                              </svg>
                            </div>
                            <div class="x_nav_contact_name_text">
                              Garry Kasparov
                            </div>
                          </div>
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
                          href="https://www.instagram.com/fourmeta.agency/"
                          target="_blank"
                          class="menu_contact_socials_link x_u-s-body"
                          >Instagram</a
                        ><a
                          href="https://www.linkedin.com/company/fourmeta/mycompany/"
                          target="_blank"
                          class="menu_contact_socials_link x_u-s-body"
                          >LinkedIn</a
                        ><a
                          href="https://www.facebook.com/fourmeta.agency"
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
                        src="index/images/MEbEHlhyRgz7.avif"
                        loading="eager"
                        sizes="(max-width: 880px) 100vw, 880px"
                        srcset="
                          index/images/Ex50kTTBQE8f.avif 500w,
                          index/images/MEbEHlhyRgz7.avif 880w
                        "
                        alt=""
                        class="x_bc-header_services_card_img"
                      />
                      <div class="x_bc-header_services_card_bottom">
                        <div class="x_bc-header_services_card_title_wrap">
                          <div
                            class="x_bc-header_services_card_title x_u-heading-4"
                          >
                            Brand Clarity
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
                        src="index/images/1od3LmQmI811.avif"
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
                        src="index/images/4y5S09TQNmTa.avif"
                        loading="eager"
                        sizes="(max-width: 880px) 100vw, 880px"
                        srcset="
                          index/images/cgiRSxsdDCNa.avif 500w,
                          index/images/4y5S09TQNmTa.avif 880w
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
                        src="index/images/XkUPGA4V2iz0.avif"
                        loading="eager"
                        sizes="(max-width: 880px) 100vw, 880px"
                        srcset="
                          index/images/HiM8KO8LhrgL.avif 500w,
                          index/images/XkUPGA4V2iz0.avif 880w
                        "
                        alt=""
                        class="x_bc-header_services_card_img"
                      />
                      <div class="x_bc-header_services_card_bottom">
                        <div class="x_bc-header_services_card_title_wrap">
                          <div
                            class="x_bc-header_services_card_title x_u-heading-4"
                          >
                            Strategic Positioning
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
                  data-w-id="f265d215-420e-dbfa-7bb0-a07f1543e334"
                  href="./digital-marketing"
                  class="x_bc-header_services_card_link w-inline-block"
                  ><div class="x_bc-header_services_card_inner-02">
                    <div class="x_bc-header_services_card_inner is-06">
                      <img
                        src="index/images/6813429b07113242088e834c_image%20%2816%29.avif"
                        loading="eager"
                        alt=""
                        class="x_bc-header_services_card_img"
                      />
                      <div class="x_bc-header_services_card_bottom">
                        <div class="x_bc-header_services_card_title_wrap">
                          <div
                            class="x_bc-header_services_card_title x_u-heading-4"
                          >
                            SEO
                          </div>
                          <div
                            class="x_bc-header_services_card_more x_u-s-body"
                          >
                            Learn more
                          </div>
                        </div>
                        <div class="x_bc-header_services_card_num x_u-s-body">
                          06
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
                        src="index/images/MEbEHlhyRgz7.avif"
                        loading="eager"
                        sizes="(max-width: 880px) 100vw, 880px"
                        srcset="
                          index/images/Ex50kTTBQE8f.avif 500w,
                          index/images/MEbEHlhyRgz7.avif 880w
                        "
                        alt=""
                        class="x_bc-header_services_card_img"
                      />
                      <div class="x_bc-header_services_card_bottom">
                        <div class="x_bc-header_services_card_title_wrap">
                          <div
                            class="x_bc-header_services_card_title x_u-heading-4"
                          >
                            Brand Clarity
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
                        src="index/images/1od3LmQmI811.avif"
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
                        src="index/images/4y5S09TQNmTa.avif"
                        loading="eager"
                        sizes="(max-width: 880px) 100vw, 880px"
                        srcset="
                          index/images/cgiRSxsdDCNa.avif 500w,
                          index/images/4y5S09TQNmTa.avif 880w
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
                        src="index/images/XkUPGA4V2iz0.avif"
                        loading="eager"
                        sizes="(max-width: 880px) 100vw, 880px"
                        srcset="
                          index/images/HiM8KO8LhrgL.avif 500w,
                          index/images/XkUPGA4V2iz0.avif 880w
                        "
                        alt=""
                        class="x_bc-header_services_card_img"
                      />
                      <div class="x_bc-header_services_card_bottom">
                        <div class="x_bc-header_services_card_title_wrap">
                          <div
                            class="x_bc-header_services_card_title x_u-heading-4"
                          >
                            Strategic Positioning
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
                  data-w-id="f265d215-420e-dbfa-7bb0-a07f1543e334"
                  href="./digital-marketing"
                  class="x_bc-header_services_card_link w-inline-block"
                  ><div class="x_bc-header_services_card_inner-02">
                    <div class="x_bc-header_services_card_inner is-06">
                      <img
                        src="index/images/6813429b07113242088e834c_image%20%2816%29.avif"
                        loading="eager"
                        alt=""
                        class="x_bc-header_services_card_img"
                      />
                      <div class="x_bc-header_services_card_bottom">
                        <div class="x_bc-header_services_card_title_wrap">
                          <div
                            class="x_bc-header_services_card_title x_u-heading-4"
                          >
                            SEO
                          </div>
                          <div
                            class="x_bc-header_services_card_more x_u-s-body"
                          >
                            Learn more
                          </div>
                        </div>
                        <div class="x_bc-header_services_card_num x_u-s-body">
                          06
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
                        src="index/images/MEbEHlhyRgz7.avif"
                        loading="eager"
                        sizes="(max-width: 880px) 100vw, 880px"
                        srcset="
                          index/images/Ex50kTTBQE8f.avif 500w,
                          index/images/MEbEHlhyRgz7.avif 880w
                        "
                        alt=""
                        class="x_bc-header_services_card_img"
                      />
                      <div class="x_bc-header_services_card_bottom">
                        <div class="x_bc-header_services_card_title_wrap">
                          <div
                            class="x_bc-header_services_card_title x_u-heading-4"
                          >
                            Brand Clarity
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
                        src="index/images/1od3LmQmI811.avif"
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
                        src="index/images/4y5S09TQNmTa.avif"
                        loading="eager"
                        sizes="(max-width: 880px) 100vw, 880px"
                        srcset="
                          index/images/cgiRSxsdDCNa.avif 500w,
                          index/images/4y5S09TQNmTa.avif 880w
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
                        src="index/images/XkUPGA4V2iz0.avif"
                        loading="eager"
                        sizes="(max-width: 880px) 100vw, 880px"
                        srcset="
                          index/images/HiM8KO8LhrgL.avif 500w,
                          index/images/XkUPGA4V2iz0.avif 880w
                        "
                        alt=""
                        class="x_bc-header_services_card_img"
                      />
                      <div class="x_bc-header_services_card_bottom">
                        <div class="x_bc-header_services_card_title_wrap">
                          <div
                            class="x_bc-header_services_card_title x_u-heading-4"
                          >
                            Strategic Positioning
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
                  data-w-id="f265d215-420e-dbfa-7bb0-a07f1543e334"
                  href="./digital-marketing"
                  class="x_bc-header_services_card_link w-inline-block"
                  ><div class="x_bc-header_services_card_inner-02">
                    <div class="x_bc-header_services_card_inner is-06">
                      <img
                        src="index/images/6813429b07113242088e834c_image%20%2816%29.avif"
                        loading="eager"
                        alt=""
                        class="x_bc-header_services_card_img"
                      />
                      <div class="x_bc-header_services_card_bottom">
                        <div class="x_bc-header_services_card_title_wrap">
                          <div
                            class="x_bc-header_services_card_title x_u-heading-4"
                          >
                            SEO
                          </div>
                          <div
                            class="x_bc-header_services_card_more x_u-s-body"
                          >
                            Learn more
                          </div>
                        </div>
                        <div class="x_bc-header_services_card_num x_u-s-body">
                          06
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
                        src="index/images/MEbEHlhyRgz7.avif"
                        loading="eager"
                        sizes="(max-width: 880px) 100vw, 880px"
                        srcset="
                          index/images/Ex50kTTBQE8f.avif 500w,
                          index/images/MEbEHlhyRgz7.avif 880w
                        "
                        alt=""
                        class="x_bc-header_services_card_img"
                      />
                      <div class="x_bc-header_services_card_bottom">
                        <div class="x_bc-header_services_card_title_wrap">
                          <div
                            class="x_bc-header_services_card_title x_u-heading-4"
                          >
                            Brand Clarity
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
                        src="index/images/1od3LmQmI811.avif"
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
                        src="index/images/4y5S09TQNmTa.avif"
                        loading="eager"
                        sizes="(max-width: 880px) 100vw, 880px"
                        srcset="
                          index/images/cgiRSxsdDCNa.avif 500w,
                          index/images/4y5S09TQNmTa.avif 880w
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
                        src="index/images/XkUPGA4V2iz0.avif"
                        loading="eager"
                        sizes="(max-width: 880px) 100vw, 880px"
                        srcset="
                          index/images/HiM8KO8LhrgL.avif 500w,
                          index/images/XkUPGA4V2iz0.avif 880w
                        "
                        alt=""
                        class="x_bc-header_services_card_img"
                      />
                      <div class="x_bc-header_services_card_bottom">
                        <div class="x_bc-header_services_card_title_wrap">
                          <div
                            class="x_bc-header_services_card_title x_u-heading-4"
                          >
                            Strategic Positioning
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
                  data-w-id="f265d215-420e-dbfa-7bb0-a07f1543e334"
                  href="./digital-marketing"
                  class="x_bc-header_services_card_link w-inline-block"
                  ><div class="x_bc-header_services_card_inner-02">
                    <div class="x_bc-header_services_card_inner is-06">
                      <img
                        src="index/images/6813429b07113242088e834c_image%20%2816%29.avif"
                        loading="eager"
                        alt=""
                        class="x_bc-header_services_card_img"
                      />
                      <div class="x_bc-header_services_card_bottom">
                        <div class="x_bc-header_services_card_title_wrap">
                          <div
                            class="x_bc-header_services_card_title x_u-heading-4"
                          >
                            SEO
                          </div>
                          <div
                            class="x_bc-header_services_card_more x_u-s-body"
                          >
                            Learn more
                          </div>
                        </div>
                        <div class="x_bc-header_services_card_num x_u-s-body">
                          06
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
    // Prevent duplicates
    if (document.querySelector(".load-wrapper")) return;

    const raw = `
      <div class="page-load-trigger"></div>
      <div
        class="load-wrapper"
        style="
          -webkit-transform: translate3d(0, 0vh, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
          -moz-transform: translate3d(0, 0vh, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
          -ms-transform: translate3d(0, 0vh, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
          transform: translate3d(0, 0vh, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
          display: flex;
        "
      >
        <div
          data-w-id="7871eb9d-187e-6140-1607-3dae8e8808d9"
          data-is-ix2-target="1"
          class="load-anim"
          data-animation-type="lottie"
          data-src="./refined-quack-loader.json"
          data-loop="0"
          data-direction="1"
          data-autoplay="0"
          data-renderer="svg"
          data-default-duration="2.3"
          data-duration="0"
          data-ix2-initial-state="0"
          style="pointer-events: none;"
        ></div>
      </div>
    `;

    const template = document.createElement("template");
    template.innerHTML = raw.trim();

    // Insert right at top of body so it overlays everything
    document.body.insertAdjacentElement("afterbegin", template.content.firstElementChild); // page-load-trigger
    document.body.insertAdjacentElement("afterbegin", template.content.firstElementChild); // load-wrapper

  } catch (e) {
    console.error("[injectPreloader]", e);
  }
}

function __injectAfterMain() {
  try {
    const pane = document.querySelector(".lenisscroll-pane");
    if (!pane) return;

    // Target the exact main you mentioned
    const main = pane.querySelector('main[data-v-ea5deaed]');
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
                        "The Brave People team has done a masterful job at
                        capturing the essence of FCF and projecting it through
                        our site, mobile apps and branding elements. Always game
                        for the next challenge, they continue to work closely
                        with our product, tech and marketing groups under
                        aggressive timelines to deliver creative which
                        consistently exceeds expectations and delights our fans.
                        Simply put, Brave People crushes it."
                      </div>
                      <div class="quote-author">
                        <div class="quote-avatar">
                          <img
                            src="index/images/68708c314208a7a24e201324_steve-adler-headshot%201.png"
                            loading="lazy"
                            alt=""
                            class="quote-avatar-img"
                          />
                        </div>
                        <div class="quote-client">
                          Steve Adler<br />CTO of Fan Controlled Football
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section class="section overflow-hidden">
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

    const anchor = pane.querySelector('[data-injected="after-main"]') || pane.querySelector(".x_after_main_component");
    if (!anchor) return false;

    // Prevent duplicates using DOM state, not by relying on raw HTML
    if (pane.querySelector('[data-injected="after-after-main"]')) return true;

    const raw = `
      <section class="section background-color-tint overflow-hidden"  >
            <div class="page-padding">
              <div class="container-large">
                <div class="clients-component">
                  <div class="w-dyn-list">
                    <div role="list" class="clients-grid w-dyn-items">
                      <div
                        id="w-node-_5ae52ac4-7be5-1755-b763-148024eb95e1-61a90b20"
                        role="listitem"
                        class="client-item w-dyn-item"
                      >
                        <img
                          src="index/images/cSN2H2d8onCr.png"
                          loading="lazy"
                          id="w-node-f4986d5d-6787-023a-4f9b-234561a90b22-61a90b20"
                          alt=""
                          sizes="100vw"
                          srcset="
                            index/images/wZTWEJi7HNNw.png 500w,
                            index/images/cSN2H2d8onCr.png 730w
                          "
                          class="client-logo"
                        />
                      </div>
                      <div
                        id="w-node-_5ae52ac4-7be5-1755-b763-148024eb95e1-61a90b20"
                        role="listitem"
                        class="client-item w-dyn-item"
                      >
                        <img
                          src="index/images/ISdVvM7XG50N.png"
                          loading="lazy"
                          id="w-node-f4986d5d-6787-023a-4f9b-234561a90b22-61a90b20"
                          alt=""
                          sizes="100vw"
                          srcset="
                            index/images/ClG89ht9KyWN.png 500w,
                            index/images/ISdVvM7XG50N.png 730w
                          "
                          class="client-logo"
                        />
                      </div>
                      <div
                        id="w-node-_5ae52ac4-7be5-1755-b763-148024eb95e1-61a90b20"
                        role="listitem"
                        class="client-item w-dyn-item"
                      >
                        <img
                          src="index/images/zG8wjN232OSf.png"
                          loading="lazy"
                          id="w-node-f4986d5d-6787-023a-4f9b-234561a90b22-61a90b20"
                          alt=""
                          sizes="100vw"
                          srcset="
                            index/images/BC8Np3ELk75L.png 500w,
                            index/images/zG8wjN232OSf.png 730w
                          "
                          class="client-logo"
                        />
                      </div>
                      <div
                        id="w-node-_5ae52ac4-7be5-1755-b763-148024eb95e1-61a90b20"
                        role="listitem"
                        class="client-item w-dyn-item"
                      >
                        <img
                          src="index/images/5FvZnLl5LpF4.png"
                          loading="lazy"
                          id="w-node-f4986d5d-6787-023a-4f9b-234561a90b22-61a90b20"
                          alt=""
                          sizes="100vw"
                          srcset="
                            index/images/noOssspoxAcT.png 500w,
                            index/images/5FvZnLl5LpF4.png 730w
                          "
                          class="client-logo"
                        />
                      </div>
                      <div
                        id="w-node-_5ae52ac4-7be5-1755-b763-148024eb95e1-61a90b20"
                        role="listitem"
                        class="client-item w-dyn-item"
                      >
                        <img
                          src="index/images/3fUKc8AXfEv3.png"
                          loading="lazy"
                          id="w-node-f4986d5d-6787-023a-4f9b-234561a90b22-61a90b20"
                          alt=""
                          sizes="100vw"
                          srcset="
                            index/images/ypaa0hw3G1KL.png 500w,
                            index/images/3fUKc8AXfEv3.png 730w
                          "
                          class="client-logo"
                        />
                      </div>
                      <div
                        id="w-node-_5ae52ac4-7be5-1755-b763-148024eb95e1-61a90b20"
                        role="listitem"
                        class="client-item w-dyn-item"
                      >
                        <img
                          src="index/images/MeW4Ur8A1w6t.png"
                          loading="lazy"
                          id="w-node-f4986d5d-6787-023a-4f9b-234561a90b22-61a90b20"
                          alt=""
                          sizes="100vw"
                          srcset="
                            index/images/qWvWVGVBDIvm.png 500w,
                            index/images/MeW4Ur8A1w6t.png 730w
                          "
                          class="client-logo"
                        />
                      </div>
                      <div
                        id="w-node-_5ae52ac4-7be5-1755-b763-148024eb95e1-61a90b20"
                        role="listitem"
                        class="client-item w-dyn-item"
                      >
                        <img
                          src="index/images/8jk2gg4nO0x7.png"
                          loading="lazy"
                          id="w-node-f4986d5d-6787-023a-4f9b-234561a90b22-61a90b20"
                          alt=""
                          sizes="100vw"
                          srcset="
                            index/images/XaAAidlS3pbJ.png 500w,
                            index/images/8jk2gg4nO0x7.png 730w
                          "
                          class="client-logo"
                        />
                      </div>
                      <div
                        id="w-node-_5ae52ac4-7be5-1755-b763-148024eb95e1-61a90b20"
                        role="listitem"
                        class="client-item w-dyn-item"
                      >
                        <img
                          src="index/images/vDJJpU03ttEY.png"
                          loading="lazy"
                          id="w-node-f4986d5d-6787-023a-4f9b-234561a90b22-61a90b20"
                          alt=""
                          sizes="100vw"
                          srcset="
                            index/images/UDCnZL8VOApY.png 500w,
                            index/images/vDJJpU03ttEY.png 730w
                          "
                          class="client-logo"
                        />
                      </div>
                      <div
                        id="w-node-_5ae52ac4-7be5-1755-b763-148024eb95e1-61a90b20"
                        role="listitem"
                        class="client-item w-dyn-item"
                      >
                        <img
                          src="index/images/qM03caFPqmhp.png"
                          loading="lazy"
                          id="w-node-f4986d5d-6787-023a-4f9b-234561a90b22-61a90b20"
                          alt=""
                          sizes="100vw"
                          srcset="
                            index/images/t6MQ9Cz9fYfD.png 500w,
                            index/images/qM03caFPqmhp.png 730w
                          "
                          class="client-logo"
                        />
                      </div>
                      <div
                        id="w-node-_5ae52ac4-7be5-1755-b763-148024eb95e1-61a90b20"
                        role="listitem"
                        class="client-item w-dyn-item"
                      >
                        <img
                          src="index/images/F8qRmpdlmfS9.png"
                          loading="lazy"
                          id="w-node-f4986d5d-6787-023a-4f9b-234561a90b22-61a90b20"
                          alt=""
                          sizes="100vw"
                          srcset="
                            index/images/MworQnhH9g2q.png 500w,
                            index/images/F8qRmpdlmfS9.png 730w
                          "
                          class="client-logo"
                        />
                      </div>
                      <div
                        id="w-node-_5ae52ac4-7be5-1755-b763-148024eb95e1-61a90b20"
                        role="listitem"
                        class="client-item w-dyn-item"
                      >
                        <img
                          src="index/images/LSywx6g8uiFc.png"
                          loading="lazy"
                          id="w-node-f4986d5d-6787-023a-4f9b-234561a90b22-61a90b20"
                          alt=""
                          sizes="100vw"
                          srcset="
                            index/images/Fb26qle3IHMu.png 500w,
                            index/images/LSywx6g8uiFc.png 730w
                          "
                          class="client-logo"
                        />
                      </div>
                      <div
                        id="w-node-_5ae52ac4-7be5-1755-b763-148024eb95e1-61a90b20"
                        role="listitem"
                        class="client-item w-dyn-item"
                      >
                        <img
                          src="index/images/Kw79EOgGIgC6.png"
                          loading="lazy"
                          id="w-node-f4986d5d-6787-023a-4f9b-234561a90b22-61a90b20"
                          alt=""
                          sizes="100vw"
                          srcset="
                            index/images/Jfwb41rWzpwC.png 500w,
                            index/images/Kw79EOgGIgC6.png 730w
                          "
                          class="client-logo"
                        />
                      </div>
                    </div>
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
                      href="./work-with-us"
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
                          Choose Your project Path
                        </h2>
                      </div>
                      <div class="max-width-medium">
                        <div
                          lines-slide-up=""
                          split-text=""
                          class="text-size-medium"
                        >
                          Going from 0-1 or breaking into your next stage of
                          growth? We specialize in all of the above.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="enquiry-cards-flex">
                    <a
                      data-prevent-transition=""
                      data-w-id="21ca679e-a158-6eb5-a63f-ddd0dbd67d8f"
                      href="https://bravepeople.typeform.com/getstarted"
                      target="_blank"
                      class="enquiry-card__wrap is--black w-inline-block"
                      ><div class="card-header anim">
                        <div class="w-layout-hflex enquiry-card-text">
                          <div class="enquiry-card-heading">Build a</div>
                          <div class="div-block">
                            <div class="enquiry-card-heading anim">Website</div>
                            <div class="enquiry-card-heading anim">Brand</div>
                          </div>
                        </div>
                        <div class="card-tag no--caps">Fixed Scope</div>
                      </div>
                      <div class="card-text anim">
                        <div class="enquiry-card-p">
                          Plan-driven, fixed timelines, deliverable-centric.
                          Focus your effort and investment toward singular
                          business needs with precision.
                        </div>
                        <div class="button is-icon is-card">
                          <div class="button-text">Work With Us</div>
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
                      <div class="enquiry-card__overlay"></div></a
                    ><a
                      href="./build-a-digital-product"
                      class="enquiry-card__wrap is--black w-inline-block"
                      ><div class="card-header anim">
                        <div class="w-layout-hflex enquiry-card-text">
                          <div class="enquiry-card-heading">
                            Build a Digital Product
                          </div>
                        </div>
                        <div class="card-tag no--caps">
                          Flexible Subscription
                        </div>
                      </div>
                      <div class="card-text anim">
                        <div class="enquiry-card-p">
                          Change-driven, flexible roadmaps, people-centric. Add
                          seasoned creatives to your team to launch or iterate
                          on a digital product.
                        </div>
                        <div class="button is-icon is-card">
                          <div class="button-text">Work With Us</div>
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
                      <div class="enquiry-card__overlay"></div></a
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




// Call this after you inject DOM that contains Webflow interactions (data-w-id).
// Example: __webflowIX2Kick("#presticky-intro")
function __webflowIX2Kick(scopeSelectorOrEl) {
  try {
    // ---- singleton state ----
    const S = (window.__WF_IX2_STATE ||= {
      obs: null,
      queued: false,
      tries: 0,
      maxTries: 18,          // ~3–6s depending on backoff
      lastRunAt: 0,
      scope: null,
      fallbackTimer: 0
    });

    // Resolve scope
    const scope =
      typeof scopeSelectorOrEl === "string"
        ? document.querySelector(scopeSelectorOrEl)
        : scopeSelectorOrEl;

    // If user passes a selector and it doesn't exist yet, keep selector and wait
    S.scope = scope || S.scope || scopeSelectorOrEl;

    // Debounce: collapse many mutation events into one init attempt
    if (S.queued) return;
    S.queued = true;

    const schedule = () => {
      S.queued = false;
      __wfTryInit();
    };

    // Next frame is usually too early; do 2 frames for stability
    requestAnimationFrame(() => requestAnimationFrame(schedule));

    // Install observer once: any future injection/patch will re-kick automatically
    if (!S.obs) {
      S.obs = new MutationObserver((mutList) => {
        // Only react if a node with data-w-id showed up, or our scope appeared
        let relevant = false;

        for (const m of mutList) {
          for (const n of m.addedNodes) {
            if (n.nodeType !== 1) continue;
            if (n.matches?.("[data-w-id]") || n.querySelector?.("[data-w-id]")) {
              relevant = true;
              break;
            }
            if (typeof S.scope === "string") {
              if (n.matches?.(S.scope) || n.querySelector?.(S.scope)) {
                relevant = true;
                break;
              }
            }
          }
          if (relevant) break;
        }

        if (relevant) __webflowIX2Kick(S.scope);
      });

      S.obs.observe(document.documentElement, { childList: true, subtree: true });
    }

    function __wfReady() {
      return (
        window.Webflow &&
        typeof window.Webflow.require === "function" &&
        window.Webflow.require("ix2") &&
        typeof window.Webflow.require("ix2").init === "function"
      );
    }

    function __resolveScopeEl() {
      const s = S.scope;
      if (!s) return null;
      if (typeof s === "string") return document.querySelector(s);
      if (s && s.nodeType === 1) return s;
      return null;
    }

    function __scopeHasInteractions(el) {
      if (!el) return false;
      return !!(el.matches?.("[data-w-id]") || el.querySelector?.("[data-w-id]"));
    }

    function __hardReinitIX2() {
      // Safer than destroy/ready/destroy/ready spam:
      // - destroy ix2 only
      // - init ix2 only
      const ix2 = window.Webflow.require("ix2");
      try { ix2.destroy(); } catch (e) {}
      try { ix2.init(); } catch (e) {}
    }

    function __wfTryInit() {
      const now = performance.now();
      // Prevent thrashing if many events fire
      if (now - S.lastRunAt < 120) {
        __webflowIX2Kick(S.scope);
        return;
      }
      S.lastRunAt = now;

      // Wait for DOM + Webflow
      const el = __resolveScopeEl();
      const ready = __wfReady();

      // If we have a scope, only init once scope exists + contains data-w-id
      if (el && !__scopeHasInteractions(el)) {
        // scope exists but doesn't yet contain w-id nodes (still injecting)
        __wfBackoffRetry();
        return;
      }

      if (!ready) {
        __wfBackoffRetry();
        return;
      }

      // Use Webflow.push to run when Webflow considers itself ready
      // (this avoids the “50%” timing issue)
      window.Webflow.push(() => {
        // Force a reflow so any initial inline styles are computed before ix2 reads them
        // (helps with “works when devtools open”)
        try { document.documentElement.offsetHeight; } catch (e) {}

        __hardReinitIX2();

        // Verify quickly: if elements still stuck (opacity 0 etc), retry
        __scheduleVerifyAndRetry(el);
      });
    }

    function __wfBackoffRetry() {
      S.tries++;
      if (S.tries > S.maxTries) {
        // Optional last-resort reveal (keeps site usable if ix2 refuses)
        __fallbackReveal();
        return;
      }

      // Exponential-ish backoff (fast at first, then slower)
      const delay = Math.min(60 * S.tries, 600);

      setTimeout(() => {
        S.queued = false;
        __webflowIX2Kick(S.scope);
      }, delay);
    }

    function __scheduleVerifyAndRetry(scopeEl) {
      // after init, check on next frames — if still stuck, kick again
      let checks = 0;

      const verify = () => {
        checks++;

        const el = scopeEl || __resolveScopeEl();
        if (!el) return;

        // heuristic: if we still find many nodes with opacity:0 AND data-w-id,
        // ix2 probably didn’t bind, so reinit again
        const stuck = el.querySelectorAll("[data-w-id]").length
          ? Array.from(el.querySelectorAll("[data-w-id]")).some((n) => {
              const cs = getComputedStyle(n);
              // lots of Webflow reveal elems start opacity 0 + translateY(120%)
              return cs.opacity === "0";
            })
          : false;

        if (stuck && checks < 6) {
          // kick again
          S.queued = false;
          __webflowIX2Kick(S.scope);
          return;
        }

        // reset tries on success-ish
        if (!stuck) S.tries = 0;
      };

      requestAnimationFrame(() => requestAnimationFrame(verify));
      requestAnimationFrame(() => requestAnimationFrame(verify));
      requestAnimationFrame(() => requestAnimationFrame(verify));
    }

    function __fallbackReveal() {
      // Don’t do this immediately; only if we fail many times.
      // It removes the “hidden forever” problem.
      if (S.fallbackTimer) return;

      S.fallbackTimer = setTimeout(() => {
        S.fallbackTimer = 0;
        const el = __resolveScopeEl();
        if (!el) return;

        const nodes = el.querySelectorAll("[data-w-id]");
        nodes.forEach((n) => {
          // Only rescue things that are still invisible
          const cs = getComputedStyle(n);
          if (cs.opacity === "0") {
            n.style.opacity = "1";
            // Don’t obliterate all transforms; just remove the common “offscreen” translate
            // If you prefer: n.style.transform = "none";
            if (n.style.transform && /translate3d\([^,]+,\s*120%/.test(n.style.transform)) {
              n.style.transform = "translate3d(0, 0, 0)";
            }
          }
        });

        console.warn("[wf-ix2] Gave up after retries — applied fallback reveal to avoid hidden content.");
      }, 900);
    }
  } catch (e) {
    console.warn("[wf-ix2] kick error", e);
  }
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
      window.gsap.set(els.navWrap, { width: cfg.closedWidth, height: cfg.closedHeight });
      window.gsap.set(els.navLeft, { width: cfg.closedLeftWidth });
      window.gsap.set([els.navBg, els.navContent], { display: "none", opacity: 0 });
      window.gsap.set([els.navLeftInner], { display: "none", opacity: 0 });
      window.gsap.set(els.closeIcon, { display: "none" });
      window.gsap.set([els.navList, els.navSocials, els.navLogo], { opacity: 0 });
      window.gsap.set(els.openIcon, { display: "block" });
      window.gsap.set(els.navRight, { height: "auto" });
      window.gsap.set(els.navBtnBg, { opacity: 100 });
    };

    const setMobileInitialStyles = (cfg) => {
      window.gsap.set(els.navWrap, { width: cfg.closedWidth, height: cfg.closedHeight });
      window.gsap.set(els.navLeft, { width: cfg.closedLeftWidth });
      window.gsap.set([els.navBg, els.navContent], { display: "none", opacity: 0 });
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
      tl.to(els.navWrap, { width: cfg.navWrapWidth, duration: 0.2, ease: "none" }, 0)
        .to(els.navLeft, { width: cfg.navLeftWidth, duration: 0.2, ease: "none" }, 0)
        .to(els.navWrap, { height: cfg.navWrapHeight, duration: 0.2, ease: "none" })
        .set(els.closeIcon, { display: "block" }, 0)
        .set(els.openIcon, { display: "none" }, 0)
        .to(els.navBg, { display: "block", opacity: 0.6, duration: 0.2, ease: "power2.out" }, 0)
        .to(els.navLeftInner, { display: "flex", opacity: 1, duration: 0.2, ease: "none" }, 0.2)
        .to(els.navLogo, { opacity: 1, duration: 0.2, ease: "none" }, 0.4)
        .to(els.navList, { opacity: 1, duration: 0.2, ease: "none" })
        .to(els.navSocials, { opacity: 1, duration: 0.2, ease: "none" })
        .to(els.navContent, { display: "block", opacity: 1, duration: 0.2, ease: "none" }, "-=0.2");
    };

    const setupMobileAnimation = (cfg) => {
      tl.clear();
      tl.to(els.navWrap, { width: cfg.navWrapWidth, duration: 0.2, ease: mobileEasing.wrapWidth }, 0)
        .to(els.navWrap, { height: cfg.navWrapHeight, duration: 0.2, ease: mobileEasing.wrapHeight })
        .set(els.closeIcon, { display: "block" }, 0)
        .set(els.openIcon, { display: "none" }, 0)
        .to(els.navBg, { display: "block", opacity: 0.6, duration: 0.2, ease: mobileEasing.bg }, 0)
        .to(els.navLeftInner, { display: "block", opacity: 1, duration: 0.2, ease: "power3.in" });
    };

    const setupMobileSubmenuAnimation = (cfg) => {
      submenuTl.clear();
      submenuTl
        .to(els.navWrap, { height: cfg.expandedHeight, duration: 0.2, ease: "none" })
        .to(els.navRight, { height: cfg.rightExpandedHeight, duration: 0.25, ease: "none" }, 0)
        .to(els.navList, { opacity: 0, duration: 0.1, ease: "none" }, "-=0.3")
        .to(els.navContent, { display: "block", opacity: 1, duration: 0.1, ease: "none" }, 0.4);
    };

    const openMenu = () => {
      els.navBtnBg && els.navBtnBg.classList.add("is-active");
      tl.play();
    };

    const closeMenu = () => {
      if (!submenuTl.reversed()) {
        submenuTl.reverse().then(() => {
          tl.reverse().then(() => els.navBtnBg && els.navBtnBg.classList.remove("is-active"));
        });
      } else {
        tl.reverse().then(() => els.navBtnBg && els.navBtnBg.classList.remove("is-active"));
      }
    };

    const toggleMenu = () => (tl.reversed() ? openMenu() : closeMenu());
    const openSubmenu = () => submenuTl.play();
    const closeSubmenu = () => submenuTl.reverse();

    const getConfig = (width) => {
      if (width > configs.large.minWidth) return configs.large;
      if (width > configs.mobile.maxWidth && width <= configs.medium.maxWidth) return configs.medium;
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
      els.navMobileBacks.forEach((btn) => bindOnce(btn, "nav_mob_back", "click", closeSubmenu));

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

    const rotTo = window.gsap.quickTo(".x_bc-header_services_container", "rotation", {
      duration: 0.6,
      ease: "power3.out",
    });

    const cardLinks = document.querySelectorAll(".x_bc-header_services_card_link");

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
      const primaryDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const isTouchpad = primaryDelta % 1 !== 0;
      const multiplier = isTouchpad ? TOUCHPAD_SENSITIVITY : MOUSE_SENSITIVITY;

      let delta = primaryDelta * multiplier;
      delta = Math.max(-60, Math.min(60, delta));

      rotation_velocity -= delta;
      y_velocity -= Math.abs(delta) * VERTICAL_KICK;
    };

    bindOnce(innerEl, "services_wheel", "wheel", handleScroll, { passive: false });

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
        try { lenis.raf(time); } catch (e) {}
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }

    let isScrollLocked = false;

    function lockScroll() {
      if (isScrollLocked) return;
      try { lenis.stop(); } catch (e) {}
      document.documentElement.classList.add("lenis-stopped");
      isScrollLocked = true;
    }

    function unlockScroll() {
      if (!isScrollLocked) return;
      try { lenis.start(); } catch (e) {}
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
      bindOnce(el, "services_stop_wheel", "wheel", (e) => e.stopPropagation(), { passive: false });
      bindOnce(el, "services_stop_touch", "touchmove", (e) => e.stopPropagation(), { passive: false });
    };

    allowInnerScroll();

    // Menu click bindings (these selectors assume those elements exist)
    bindOnce(document, "lenis_click_1", "click", (e) => {
      if (e.target.closest(".x_bc_menu_link.is-open")) lockScroll();
      if (e.target.closest(".x_bc_menu_link.is-close")) unlockScroll();
    });

    bindOnce(document, "lenis_click_2", "click", (e) => {
      if (e.target.closest(".x_nav_button_ico.is-open")) lockScroll();
      if (e.target.closest(".x_nav_button_ico.is-close") || e.target.closest(".x_nav_bg")) unlockScroll();
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
    const closeWrap = document.querySelector(".x_bc-header_services_close_wrap");
    const cursorWrap = document.querySelector(".x_g--cursors_services-menu_wrap");
    const servicesInner = document.querySelector(".x_bc-header_services_inner");
    const servicesBottom = document.querySelector(".x_bc-header_services_bottom");
    const servicesText = document.querySelector(".x_bc-header_services_text.x_u-heading-4");
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
      warn(".link-text.is-1 not inside a.nav-link – services menu init skipped.");
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
      if (cursorWrap) cursorWrap.style.transition = "opacity 100ms ease, transform 100ms ease";
      if (closeWrap) closeWrap.style.transition = "opacity 400ms ease-out, transform 400ms cubic-bezier(0.175,0.885,0.32,1.275)";
      if (servicesInner) servicesInner.style.transition = "opacity 400ms ease-out, transform 400ms ease-out";
      if (servicesBottom) servicesBottom.style.transition = "opacity 400ms ease-out, transform 400ms cubic-bezier(0.175,0.885,0.32,1.275)";
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
    bindOnce(document, "services_capture", "click", (e) => {
      const anchor = e.target.closest("a.nav-link");
      if (!anchor) return;
      if (anchor !== servicesAnchor) return;

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation && e.stopImmediatePropagation();

      if (!isOpen) openServicesMenu();
      else closeServicesMenu();
    }, true);

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
        open: () => warn("Secondary services menu not bound because primary is active."),
        close: () => warn("Secondary services menu not bound because primary is active."),
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
      if (pane && pane.scrollHeight > pane.clientHeight) return pane.scrollTop;

      // Fallback
      return window.scrollY || document.documentElement.scrollTop || 0;
    };

    const initOnce = () => {
      const navShell = document.querySelector("header.navigation, .navigation");
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
        pane.addEventListener("scroll", () => apply(getScrollY()), { passive: true });
        apply(getScrollY());
        console.log("[scroll-nav] bound to .lenisscroll-pane");
        return true;
      }

      window.addEventListener("scroll", () => apply(getScrollY()), { passive: true });
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
      return !!(header && target && target.closest && target.closest(HEADER_SEL));
    }

    let lastY = window.scrollY;
    bindOnce(window, "scroll_block_debug", "scroll", () => {
      const y = window.scrollY;
      if (y !== lastY) slog("WINDOW SCROLLED:", lastY, "→", y, "menuOpen=", isMenuOpen());
      lastY = y;
    }, { passive: true });

    function blockIfNeeded(e) {
      const open = isMenuOpen();
      const hitHeader = inHeader(e.target);
      if (!open || !hitHeader) return;

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation && e.stopImmediatePropagation();

      slog("BLOCKED", e.type, "deltaY=", e.deltaY, "target=", e.target?.className || e.target?.tagName);
    }

    // capture-phase document listeners
    bindOnce(document, "scroll_block_wheel", "wheel", blockIfNeeded, { passive: false, capture: true });
    bindOnce(document, "scroll_block_touch", "touchmove", blockIfNeeded, { passive: false, capture: true });

    bindOnce(document, "scroll_block_key", "keydown", (e) => {
      if (!isMenuOpen()) return;
      if (!inHeader(document.activeElement)) return;

      const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
      if (!keys.includes(e.key)) return;

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation && e.stopImmediatePropagation();
      slog("BLOCKED key scroll:", e.key);
    }, { capture: true });
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
        try { __initGSAPNavigation(); } catch (e) { console.error("[hdr-init] GSAP nav failed", e); }
        try { __initServicesCarouselWheel(); } catch (e) { console.error("[hdr-init] GSAP wheel failed", e); }

        // Lenis lock wiring
        __initLenisLocking();

        log("All header/scripts init attempted.");
      },
      { tries: 240, label: "__INIT_HEADER_SCRIPTS(header.navigation)" }
    );
  };
})();
