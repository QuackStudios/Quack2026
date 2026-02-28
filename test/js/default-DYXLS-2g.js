import {
  _ as ct,
  a as dt,
  b as pt,
  c as vt,
  d as mt,
  e as ft,
  f as _t,
} from "./IconYT-DWaI6GCI.js";
import {
  h,
  i as u,
  k as e,
  _ as oe,
  B as ge,
  C as Te,
  r as n,
  e as W,
  z as G,
  M as _e,
  D as Se,
  E as ht,
  G as ae,
  g as Ce,
  v as j,
  H as He,
  F as ee,
  s as te,
  j as r,
  n as le,
  l as R,
  I as q,
  J as Ye,
  K as ze,
  L as gt,
  t as O,
  N as Ve,
  T as Ge,
  O as Xe,
  P as Me,
  Q as Fe,
  R as z,
  u as Le,
  S as Ct,
  U as je,
  V as ie,
  W as qe,
  x as Je,
  b as Ke,
  a as be,
  X as Ie,
  m as ue,
  Y as he,
  Z as $,
  $ as bt,
  a0 as yt,
  a1 as kt,
  a2 as Qe,
  a3 as K,
  a4 as Q,
  a5 as fe,
  a6 as ve,
  a7 as me,
  a8 as $e,
  a9 as Ue,
  aa as Et,
  ab as Tt,
} from "./app-CGoBdrrW.js";
const St = {
  class: "icon-dot",
  xmlns: "http://www.w3.org/2000/svg",
  version: "1.1",
  viewBox: "0 0 6 6",
};
function Vt(S, o) {
  return (
    u(),
    h(
      "svg",
      St,
      o[0] ||
        (o[0] = [
          e(
            "circle",
            { cx: "3", cy: "3", r: "3", style: { fill: "currentColor" } },
            null,
            -1
          ),
        ])
    )
  );
}
const et = { render: Vt },
  Mt = (S, o = 2) => `00${S}`.slice(-o),
  Ee = (S) => {
    const o = Mt(S);
    return [Number.parseInt(o.charAt(0)), Number.parseInt(o.charAt(1))];
  },
  We = (S) => {
    let o = S;
    const y = o % 1e3;
    o = (o - y) / 1e3;
    const F = o % 60;
    o = (o - F) / 60;
    const p = o % 60;
    o = (o - p) / 60;
    const d = o % 24;
    o = (o - d) / 24;
    const C = Math.min(o, 99);
    return { d: Ee(C), h: Ee(d), m: Ee(p), s: Ee(F), ms: y };
  },
  Lt = ["muted"],
  Rt = ["src", "type"],
  wt = { class: "VideoModal-left" },
  At = ["aria-label"],
  Ht = { class: "VideoModal-center" },
  $t = { class: "VideoModal-scrubber" },
  Ft = { class: "VideoModal-time" },
  It = { class: "VideoModal-right" },
  xt = ["aria-label"],
  Pt = 2.5,
  Dt = {
    __name: "VideoModal",
    setup(S) {
      const { gsap: o } = ge(),
        y = Te();
      let F = null,
        p = null,
        d = null;
      const C = n(null),
        f = n(null);
      n(null);
      const g = n(null),
        v = n(null),
        k = n(null),
        b = n(null),
        D = n(null),
        V = n(!1),
        L = n(0),
        N = n(30),
        w = n(1e3),
        A = n(0),
        E = n(!1),
        i = n(!1),
        M = n(!1),
        Z = n(!1),
        a = n("Close"),
        t = n("0:00"),
        m = W(() => (i.value, "Sound")),
        _ = W(() => (i.value ? "Sound On" : "Sound Off")),
        c = W(() => (M.value ? "Pause" : "Play")),
        l = W(() => {
          var s;
          return [
            ...(((s = y.videoModalData) == null ? void 0 : s.sources) || []),
          ];
        });
      W(() => {
        var s;
        return ((s = y.videoModalData) == null ? void 0 : s.title) || "";
      });
      const I = W(() => {
        var s;
        return ((s = y.videoModalData) == null ? void 0 : s.timeOffset) || 0;
      });
      let H = 0;
      function Y() {
        var P;
        v.value && (M.value = !((P = v.value) != null && P.paused));
      }
      function U() {
        var P;
        v.value && ((M.value = !((P = v.value) != null && P.paused)), Oe());
      }
      function X() {
        xe(), Re();
      }
      function ne() {
        xe();
      }
      function re() {
        i.value = !i.value;
      }
      function T() {
        var s;
        y.setModalState(_e.NONE),
          document != null &&
            document.fullscreenElement &&
            ((s = document.exitFullscreen) == null || s.call(document)),
          we();
      }
      function x(s) {
        Re(), E.value && Pe(s);
      }
      function B(s) {
        const P = v.value;
        P && (P.currentTime = s || 0);
      }
      function J() {
        const s = v.value;
        s == null ||
          s.play().catch((P) => {
            console.error("Video cannot play:", P);
          }),
          Oe();
      }
      function ye() {
        const s = v.value;
        s == null || s.pause(), we();
      }
      function xe() {
        const s = v.value;
        s && (s.paused ? J() : ye(), (M.value = !s.paused));
      }
      function tt(s) {
        return s.touches ? s.touches[0].clientX : s.clientX;
      }
      function Pe(s) {
        if (!v.value.duration) return;
        const P = tt(s) - A.value,
          ce = Math.max(0, Math.min(1, P / w.value));
        v.value.currentTime = ce * v.value.duration;
      }
      function De(s) {
        (E.value = !0), ye(), Pe(s);
      }
      function ke() {
        (E.value = !1), M.value && J();
      }
      function Re() {
        (Z.value = !0),
          clearTimeout(F),
          (F = setTimeout(() => {
            Z.value = !1;
          }, Pt * 1e3));
      }
      function ot() {
        const s = v.value;
        if (s != null && s.duration) {
          L.value = s.currentTime / s.duration;
          const P = We(s.currentTime * 1e3);
          We(s.duration * 1e3), (t.value = [...P.m, ":", ...P.s].join(""));
        }
      }
      function nt() {
        const s = v.value;
        if (s != null && s.duration) {
          const P = w.value,
            ce = L.value,
            de = 1,
            Ae = Xe(P * ce, de, P - de) - de;
          k.value.style.translate = `${Ae}px 0px`;
        }
      }
      let Ne;
      function Oe() {
        BTEDL.videoProgress(0, l.value[0].src),
          (H = 0),
          we(),
          (Ne = setInterval(() => {
            const s = v.value;
            if (s && !s.paused) {
              const P = (s.currentTime / s.duration) * 100;
              Math.round(P / 10) > H &&
                ((H = Math.round(P / 10)),
                BTEDL.videoProgress(H * 10, l.value[0].src));
            }
          }, 5e3));
      }
      function we() {
        clearInterval(Ne);
      }
      function st() {
        p == null || p.kill(),
          d == null || d.kill(),
          (p = o.timeline()),
          p.to(C.value, { autoAlpha: 1, duration: 0.5 }),
          p.to(v.value, { opacity: 1, duration: 0.5, delay: 0.25 }),
          p.to(
            g.value,
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
            "ui"
          );
      }
      function Be(s = !1) {
        p == null || p.kill(),
          d == null || d.kill(),
          (d = o.timeline()),
          d.to(v.value, { opacity: 0, duration: s ? 0 : 0.5 }, 0),
          d.to(C.value, { autoAlpha: 0, duration: s ? 0 : 0.5 }),
          d.set(g.value, { y: 20, immediateRender: !1 });
      }
      function at() {
        window.addEventListener("mousemove", x),
          window.addEventListener("mouseup", ke),
          window.addEventListener("touchmove", x),
          window.addEventListener("touchend", ke);
      }
      function Ze() {
        window.removeEventListener("mousemove", x),
          window.removeEventListener("mouseup", ke),
          window.removeEventListener("touchmove", x),
          window.removeEventListener("touchend", ke);
        const s = v.value;
        s && s.removeEventListener("pause", ye);
      }
      return (
        G(l, (s) => {
          v.value &&
            (v.value.pause(),
            (L.value = 0),
            (t.value = "0:00"),
            (M.value = !1),
            s.length > 0 &&
              setTimeout(() => {
                B(I.value), J();
              }, 50));
        }),
        G(
          () => y.modalState,
          (s) => {
            s === _e.VIDEO
              ? ((V.value = !0), B(I.value), Re(), at(), st())
              : ((V.value = !1), ye(), Ze(), Be());
          }
        ),
        Se(() => {
          if (
            (k.value && (N.value = k.value.getBoundingClientRect().width),
            b.value)
          ) {
            const s = b.value.getBoundingClientRect();
            (w.value = s.width), (A.value = s.left);
          }
        }),
        ht(
          () => {
            ot(), nt();
          },
          { delegate: V }
        ),
        ae(() => {
          Be(!0),
            setTimeout(() => {
              const s = v.value;
              s && y.setVideoModalPlayerRef(s);
            }, 50);
        }),
        Ce(() => {
          p == null || p.kill(), d == null || d.kill(), Ze();
        }),
        (s, P) => {
          const ce = Ye,
            de = ze,
            Ae = ct,
            lt = gt,
            rt = et,
            it = dt,
            ut = pt;
          return (
            u(),
            j(Ge, { to: "body" }, [
              e(
                "div",
                { ref_key: "videoModalRef", ref: C, class: "VideoModal" },
                [
                  (u(),
                  h(
                    "video",
                    {
                      key: r(l)
                        .map((pe) => pe.src)
                        .join(","),
                      ref_key: "videoRef",
                      ref: v,
                      class: "VideoModal-video",
                      autoplay: !1,
                      loop: !1,
                      muted: r(i),
                      playsinline: "",
                      onClick: X,
                      onPlay: U,
                      onEnded: Y,
                    },
                    [
                      (u(!0),
                      h(
                        ee,
                        null,
                        te(
                          r(l),
                          (pe) => (
                            u(),
                            h(
                              "source",
                              { key: pe.src, src: pe.src, type: pe.type },
                              null,
                              8,
                              Rt
                            )
                          )
                        ),
                        128
                      )),
                      P[0] ||
                        (P[0] = He(
                          " This video is not supported by your browser. "
                        )),
                    ],
                    40,
                    Lt
                  )),
                  e(
                    "div",
                    {
                      class: le([
                        "VideoModal-ui",
                        { "VideoModal-ui--hidden": r(Z) === !1 },
                      ]),
                    },
                    [
                      P[1] ||
                        (P[1] = e(
                          "div",
                          { class: "VideoModal-darken" },
                          [
                            e("div", { class: "VideoModal-gradienttop" }),
                            e("div", { class: "VideoModal-gradientbottom" }),
                          ],
                          -1
                        )),
                      e(
                        "div",
                        {
                          ref_key: "closeRef",
                          ref: f,
                          class: "VideoModal-close",
                        },
                        [
                          R(
                            de,
                            {
                              label: r(a),
                              theme: "white-video-close",
                              onClick: T,
                            },
                            { default: q(() => [R(ce)]), _: 1 },
                            8,
                            ["label"]
                          ),
                        ],
                        512
                      ),
                      e(
                        "div",
                        {
                          ref_key: "controlsRef",
                          ref: g,
                          class: "VideoModal-controls",
                        },
                        [
                          e("div", wt, [
                            e(
                              "button",
                              {
                                class: "VideoModal-pausebutton",
                                "aria-label": r(c),
                                onClick: ne,
                              },
                              [
                                r(M)
                                  ? (u(),
                                    j(Ae, {
                                      key: 0,
                                      class: "VideoModal-pauseicon",
                                    }))
                                  : (u(),
                                    j(lt, {
                                      key: 1,
                                      class: "VideoModal-pauseicon",
                                    })),
                                He(" " + O(r(c)), 1),
                              ],
                              8,
                              At
                            ),
                          ]),
                          e("div", Ht, [
                            e(
                              "div",
                              {
                                ref_key: "scrubberWrapRef",
                                ref: D,
                                class: "VideoModal-scrubberwrap",
                                onMousedown: De,
                                onTouchstart: De,
                              },
                              [
                                e("div", $t, [
                                  e(
                                    "div",
                                    {
                                      ref_key: "tooltipRef",
                                      ref: k,
                                      class: "VideoModal-scrubbertooltip",
                                    },
                                    [
                                      e("div", Ft, O(r(t)), 1),
                                      R(rt, { class: "VideoModal-playhead" }),
                                    ],
                                    512
                                  ),
                                  e(
                                    "div",
                                    {
                                      ref_key: "scrubberRef",
                                      ref: b,
                                      class: "VideoModal-scrubberfill",
                                    },
                                    null,
                                    512
                                  ),
                                  e(
                                    "div",
                                    {
                                      class: "VideoModal-scrubberprogress",
                                      style: Ve({ width: `${r(L) * 100}%` }),
                                    },
                                    null,
                                    4
                                  ),
                                ]),
                              ],
                              544
                            ),
                          ]),
                          e("div", It, [
                            e(
                              "button",
                              {
                                class: "VideoModal-mutebutton",
                                "aria-label": r(_),
                                onClick: re,
                              },
                              [
                                He(O(r(m)) + " ", 1),
                                r(i)
                                  ? (u(),
                                    j(ut, {
                                      key: 1,
                                      class: "VideoModal-soundicon",
                                    }))
                                  : (u(),
                                    j(it, {
                                      key: 0,
                                      class: "VideoModal-soundicon",
                                    })),
                              ],
                              8,
                              xt
                            ),
                          ]),
                        ],
                        512
                      ),
                    ],
                    2
                  ),
                ],
                512
              ),
            ])
          );
        }
      );
    },
  },
  Nt = oe(Dt, [["__scopeId", "data-v-f94cb370"]]),
  Ot = {
    __name: "LenisScrollBar",
    setup(S) {
      const o = {
          minThumbHeightPx: 40,
          minThumbHeightUnit: 0.05,
          visibleCooldownSeconds: 0.5,
          dragScrollDuration: 0.8,
          rolloverScreenWidthUnit: 0.75,
        },
        y = Me(),
        { scrollCurrent: F, scrollProgress: p, scrollLock: d } = Fe(y),
        C = n(!1),
        f = n(1e3),
        g = n(!1),
        v = n(0),
        k = n(0),
        b = n(1e3),
        D = n(2e3),
        V = n(0),
        L = n(0),
        N = n(!1),
        w = n(!1),
        A = n(!1);
      let E = -1;
      G(
        F,
        () => {
          (A.value = !1),
            clearTimeout(E),
            (E = setTimeout(() => {
              A.value = !0;
            }, o.visibleCooldownSeconds * 1e3));
        },
        { immediate: !0 }
      ),
        G(g, (T) => {
          y.setScrollBarDragging(T);
        }),
        (w.value = z.desktop);
      const i = W(() => V.value / D.value > o.rolloverScreenWidthUnit),
        M = W(() => {
          const T = Math.round((b.value / f.value) * b.value),
            x = b.value * o.minThumbHeightUnit,
            B = o.minThumbHeightPx;
          return Math.max(Math.max(T, x), B);
        }),
        Z = W(() => (b.value - M.value) * p.value),
        a = W(() => {
          const T = !d.value,
            x = !A.value,
            B = i.value,
            J = g.value;
          return T && (x || B || J);
        }),
        t = W(() => {
          const T = g.value,
            x = V.value > D.value - 30;
          return z.desktop && a.value && (x || T);
        });
      function m(T) {
        (N.value = !0),
          !d.value &&
            ((g.value = !0),
            (v.value = T.clientY),
            (k.value = F.value),
            z.desktop &&
              z.hasDocument &&
              (document.addEventListener("mouseup", _, {}),
              (document.body.style.userSelect = "none"),
              (document.body.style.webkitUserSelect = "none")));
      }
      function _() {
        (N.value = !1),
          (g.value = !1),
          z.desktop &&
            z.hasDocument &&
            (document.removeEventListener("mouseup", _),
            (document.body.style.userSelect = ""),
            (document.body.style.webkitUserSelect = ""));
      }
      function c(T) {
        N.value = !0;
        let B = (T.clientY / b.value) * f.value;
        (B = I(B)),
          z.desktop &&
            z.hasDocument &&
            (document.addEventListener("mouseup", l, {}),
            (document.body.style.userSelect = "none"),
            (document.body.style.webkitUserSelect = "none")),
          y.scrollTo(B, {
            duration: 0.5,
            onComplete: () => {
              N.value && m({ clientY: L.value });
            },
          });
      }
      function l() {
        (N.value = !1),
          z.desktop &&
            z.hasDocument &&
            (document.removeEventListener("mouseup", l),
            (document.body.style.userSelect = ""),
            (document.body.style.webkitUserSelect = ""));
      }
      function I(T) {
        const x = f.value - b.value;
        return Xe(T, 0.001, x - 0.001);
      }
      function H(T) {
        if (((V.value = T.clientX), (L.value = T.clientY), !g.value)) return;
        const x = T.clientY - v.value;
        let B = k.value + (x / b.value) * f.value;
        (B = I(B)), y.scrollTo(B, { duration: o.dragScrollDuration });
      }
      function Y() {
        var T;
        (f.value =
          (z.hasDocument &&
            ((T = document.body) == null ? void 0 : T.scrollHeight)) ||
          10),
          (b.value = window.innerHeight),
          (D.value = window.innerWidth),
          (C.value = f.value > b.value);
      }
      function U(T) {
        z.desktop && m(T);
      }
      function X(T) {
        z.desktop && c(T);
      }
      Se(
        () => {
          Y();
        },
        !0,
        null,
        !0
      );
      function ne() {
        z.desktop &&
          z.hasDocument &&
          document.addEventListener("mousemove", H, { passive: !0 });
      }
      function re() {
        z.desktop &&
          z.hasDocument &&
          (document.removeEventListener("mousemove", H),
          document.removeEventListener("mouseup", _),
          document.removeEventListener("mouseup", l));
      }
      return (
        ae(() => {
          ne(), Y(), (w.value = z.desktop);
        }),
        Ce(() => {
          re();
        }),
        (T, x) => (
          u(),
          h(
            "div",
            {
              class: le([
                "LenisScrollBar",
                {
                  isEnabled: r(C),
                  isVisible: r(a),
                  isGutterRollOver: r(t),
                  isDesktop: r(w),
                },
              ]),
            },
            [
              e(
                "div",
                { class: "LenisScrollBar-gutter", onMousedown: X },
                null,
                32
              ),
              e(
                "div",
                {
                  class: "LenisScrollBar-thumb",
                  style: Ve({
                    height: `${r(M)}px`,
                    translate: `0px ${r(Z)}px`,
                  }),
                  onMousedown: U,
                },
                x[0] ||
                  (x[0] = [
                    e("div", { class: "LenisScrollBar-thumbfill" }, null, -1),
                  ]),
                36
              ),
            ],
            2
          )
        )
      );
    },
  },
  Bt = oe(Ot, [["__scopeId", "data-v-d3c7ceef"]]),
  Zt = { class: "TheFooter" },
  Ut = { "aria-label": "Primary footer navigation" },
  Wt = { class: "TheFooter-primarynav" },
  Yt = { class: "TheFooter-primarylinkdefault" },
  zt = { key: 0 },
  Gt = { key: 1 },
  Xt = { key: 0 },
  jt = { key: 1 },
  qt = {
    class: "TheFooter-secondarynav",
    "aria-label": "Secondary TheFooter navigation",
  },
  Jt = { class: "TheFooter-extraprimarynav" },
  Kt = { key: 0 },
  Qt = { key: 1 },
  eo = { class: "TheFooter-secondarylinks" },
  to = { key: 0 },
  oo = { key: 1 },
  no = { class: "TheFooter-bottom" },
  so = { class: "TheFooter-copyright" },
  ao = { class: "TheFooter-socialicons" },
  lo = { class: "sr-only" },
  ro = 200,
__WEBFLOW_FOOTER_HTML = `
<section class="section_footer background-color-black" style="padding-bottom: 11.5rem">
            <div class="footer-padding">
              <div class="page-padding">
                <div class="container-large">
                  <a
                    aria-label="return to homepge"
                    href="./"
                    class="footer-logo w-inline-block"
                    ><div class="w-embed">
                      <img
                        src="QuackStudios-white.svg"
                        loading="lazy"
                        alt="Quack Studios Logo">
                      </div
                  ></a>
                  <div class="footer-flex">
                    <div class="max-width-medium footer-mailing-list">
                      <div class="heading-small">
                        Get brand, product, and digital strategy insights straight to your inbox.
                      </div>
                      <div class="mailing-form-wrapper">
                        <div class="mailing-form w-embed w-iframe">
                          <iframe
                            title="mailing list signup"
                            src="https://embeds.beehiiv.com/128eddf3-45c6-41ec-8dc5-893ea61cf7e3?slim=true"
                            data-test-id="beehiiv-embed"
                            height="52"
                            frameborder="0"
                            scrolling="no"
                            style="
                              margin: 0;
                              border-radius: 0px !important;
                              background-color: transparent !important;
                            "
                          ></iframe>
                        </div>
                      </div>
                      <div class="form-disclaimer">
                        Curated updates and thinking from the Quack Studios team.
                      </div>
                    </div>
                    <div class="footer-menu">
                      <div
                        id="w-node-_39d5ed3a-049e-821d-984e-0712f161b3fe-f161b3f3"
                      >
                        <div class="footer-heading">Company</div>
                        <a href="./" class="footer-nav-link w-inline-block"
                          ><div>Home</div></a
                        ><a
                          href="./services"
                          class="footer-nav-link w-inline-block"
                          ><div>Services</div></a
                        ><a
                          href="./about"
                          aria-current="page"
                          class="footer-nav-link w-inline-block w--current"
                          ><div>About</div></a
                        ><a href="./work" class="footer-nav-link w-inline-block"
                          ><div>Work</div></a
                        ><a
                          href="./work-with-us"
                          class="footer-nav-link w-inline-block"
                          ><div>Contact</div></a
                        >
                      </div>
                      <div
                        id="w-node-_39d5ed3a-049e-821d-984e-0712f161b410-f161b3f3"
                      >
                        <div class="footer-heading">Discover</div>
                        <a
                          data-prevent-transition=""
                          href="https://au.linkedin.com/company/quackstudiosaustralia"
                          target="_blank"
                          class="footer-nav-link w-inline-block"
                          ><div>LinkedIn</div></a
                        ><a
                          data-prevent-transition=""
                          href="https://www.instagram.com/neongoosestudios/"
                          target="_blank"
                          class="footer-nav-link w-inline-block"
                          ><div>Instagram</div></a
                        ><a
                          data-prevent-transition=""
                          href="https://www.facebook.com/people/QuackStudios/61569291452180/"
                          target="_blank"
                          class="footer-nav-link w-inline-block"
                          ><div>Facebook</div></a
                        >
                      </div>
                      <div
                        id="w-node-_39d5ed3a-049e-821d-984e-0712f161b419-f161b3f3"
                      >
                        <div class="footer-heading">Learn</div>
                        <a
                          href="./insights"
                          class="footer-nav-link w-inline-block"
                          ><div>Insights</div></a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="w-clearfix">
                    <div class="copyright">©2026 QuackStudios</div>
                    <a
                      href="./"
                      data-prevent-transition=""
                      class="top-link w-inline-block"
                      ><div>Back to Top</div></a
                    >
                  </div>
                </div>
              </div>
            </div>
          </section>
          <a
            data-w-id="f095ceff-1416-61e3-4e28-8aa500ebb59c"
            href="./services"
            class="next-page is--default w-inline-block"
            ><img
              src="index/images/65aed80126eee11bf033126b_5V1A4016%25402x%201.jpg"
              loading="lazy"
              alt=""
              sizes="(max-width: 1556px) 100vw, 1556px"
              srcset="
                index/images/65aed80126eee11bf033126b_5V1A4016%25402x%201-p-500.jpg   500w,
                index/images/65aed80126eee11bf033126b_5V1A4016%25402x%201-p-800.jpg   800w,
                index/images/65aed80126eee11bf033126b_5V1A4016%25402x%201-p-1080.jpg 1080w,
                index/images/65aed80126eee11bf033126b_5V1A4016%25402x%201.jpg        1556w
              "
              class="next-page-image"
            />
            <div class="container-large">
              <div class="next-page-grid">
                <div>Up Next</div>
                <div
                  id="w-node-f095ceff-1416-61e3-4e28-8aa500ebb5a2-00ebb59c"
                  class="page-link-icon"
                >
                  <img
                    src="index/images/HeDPVHDwPUni.svg"
                    loading="lazy"
                    width="48"
                    height="46"
                    alt=""
                    class="next-page-arrow"
                  /><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 96 96"
                    fill="none"
                    class="page-link__circle"
                  >
                    <circle
                      cx="48"
                      cy="48"
                      r="47"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-dasharray="300"
                      stroke-dashoffset="var(--page-end)"
                      class="circle"
                    ></circle>
                  </svg>
                </div>
                <div id="w-node-f095ceff-1416-61e3-4e28-8aa500ebb5a6-00ebb59c">
                  Services
                </div>
              </div>
            </div></a
          >
`.trim(),

  io = {
    __name: "TheFooter",
    setup(S) {
      const o = Me(),
        y = Le(),
        { gsap: F } = ge(),
        p = n(null),
        d = n([]),
        C = n([]),
        f = [],
        g = n([]),
        v = n([]),
        k = n(""),
        b = n([]),
        D = n([]),
        V = { facebook: _t, x: ft, linkedin: mt, youtube: vt };
      G(
        () => y.siteConfig,
        (E) => {
          var i, M, Z, a, t;
          if (
            ((b.value =
              ((M =
                (i = E == null ? void 0 : E.elements) == null
                  ? void 0
                  : i.footermenu) == null
                ? void 0
                : M.linkedItems) || []),
            !b.value || b.value.length === 0)
          ) {
            console.warn("No footer menu data found in siteConfig");
            return;
          }
          (d.value = b.value[0].elements),
            (C.value = y.filterLinkList(d.value.top.linkedItems).slice(0, 4)),
            (g.value = y.filterLinkList(d.value.top.linkedItems).slice(4)),
            (v.value = y.filterLinkList(d.value.bottom.linkedItems)),
            (k.value = (Z = d.value.copyright) == null ? void 0 : Z.value),
            (D.value =
              ((t =
                (a = E == null ? void 0 : E.elements) == null
                  ? void 0
                  : a.sociallinks) == null
                ? void 0
                : t.linkedItems) || []);
        },
        { deep: !0, immediate: !1 }
      );
      function L(E) {
        f.forEach((i, M) => {
          M === E &&
            F.to(i, {
              duration: 0.3,
              clipPath: "rect(0 100% 100% 0)",
              ease: "power2.out",
            });
        });
      }
      function N() {
        f.forEach((E) => {
          F.to(E, {
            duration: 0.3,
            clipPath: "rect(0 0% 100% 0)",
            ease: "power2.out",
          });
        });
      }
      let w = 0;
      G(
        () => o.scrollSubPixel,
        () => {
          const E = Ct(o.scrollSubPixel, o.lenis.limit - w, o.lenis.limit);
          p.value && (p.value.style.translate = `0 ${(1 - E) * ro}px`);
        }
      );
      function A() {
        w = p.value ? p.value.offsetHeight : 0;
      }
      return (
        Se(
          () => {
            A();
          },
          !0,
          null,
          !0
        ),
        ae(() => {
          A();
        }),
        (E, i) => {
          const M = je,
            Z = qe;
          return (
                u(),
                h("footer", Zt, [
                    e(
                    "div",
                    { class: "TheFooter-wrapper", innerHTML: __WEBFLOW_FOOTER_HTML },
                    null
                    ),
                ])
                );
        }
      );
    },
  },
  uo = oe(io, [["__scopeId", "data-v-e44eba43"]]),
  co = {
    __name: "HitZone",
    props: {
      inset: { type: String, default: z.mobile ? "-0.6rem" : "-1.2rem" },
    },
    setup(S) {
      const o = S,
        y = W(() => `inset: ${o.inset};`);
      return (F, p) => (
        u(), h("div", { class: "hitzone", style: Ve(r(y)) }, null, 4)
      );
    },
  },
  po = oe(co, [["__scopeId", "data-v-a2bd6bf1"]]),
  vo = { class: "TheMenu-scroll", "data-lenis-prevent": "" },
  mo = { class: "TheMenu-container" },
  fo = { class: "TheMenu-body" },
  _o = { key: 0, class: "TheMenu-nav" },
  ho = { key: 0 },
  go = { key: 1 },
  Co = { class: "TheMenu-footer" },
  bo = { key: 0, class: "TheMenu-secondary" },
  yo = { key: 0 },
  ko = {
    __name: "TheMenu",
    setup(S) {
      Ke();
      const o = be(),
        y = Te(),
        F = Ie(),
        p = Le(),
        { gsap: d } = ge(),
        C = n(null),
        f = n(null),
        g = n(null),
        v = n(null),
        k = n(null),
        b = n(null),
        D = n(null),
        V = n(null),
        L = [],
        N = [],
        w = n([]),
        A = n([]),
        E = n([]),
        i = n([]);
      function M(c) {
        return o.path === `/${c.elements.slug.value}`;
      }
      function Z() {
        y.setModalState(_e.NONE);
      }
      let a = null,
        t = null;
      function m() {
        a == null || a.kill(),
          t == null || t.kill(),
          (a = d.timeline({})),
          a.set([b.value, k.value, g.value, v.value], { autoAlpha: 1 }, ">"),
          a.to(f.value, { autoAlpha: 1, duration: 0.6 }, 0),
          a.to(b.value, { scaleX: 1, duration: 0.6, ease: "power2.inOut" }, 0),
          a.to(
            v.value,
            { scale: 1, duration: 0.25, ease: "power2.inOut" },
            ">-0.1"
          ),
          a.to(
            k.value,
            { translateX: "0%", duration: 0.6, ease: "power2.inOut" },
            0
          ),
          a.to(
            D.value,
            { translateX: "0%", duration: 0.6, ease: "power2.inOut" },
            0
          ),
          a.set(L, { autoAlpha: 0 }, 0),
          a.set(V.value, { autoAlpha: 0 }, 0),
          a.set(N, { autoAlpha: 0 }, 0),
          a.fromTo(
            [L, V.value, N],
            { x: 30, autoAlpha: 1 },
            { x: 0, ease: "power4.out", stagger: 0.09, duration: 0.6 },
            0.35
          );
      }
      function _(c = !1, l = !1) {
        a == null || a.kill(),
          t == null || t.kill(),
          (t = d.timeline({})),
          t.to(f.value, { autoAlpha: 0, duration: c ? 0 : 0.4 }, 0),
          t.to(
            v.value,
            { scale: 0.01, duration: c ? 0 : 0.18, ease: "power2.inOut" },
            0
          ),
          t.set([v.value], { autoAlpha: 0 }, ">"),
          t.to(
            k.value,
            { autoAlpha: 0, ease: "linear", duration: c ? 0 : 0.2 },
            0
          ),
          t.to(
            k.value,
            {
              translateX: "100%",
              ease: "power2.inOut",
              duration: c ? 0 : 0.25,
            },
            0.1
          ),
          t.to(
            D.value,
            {
              translateX: "-100%",
              ease: "power2.inOut",
              duration: c ? 0 : 0.25,
            },
            0.1
          ),
          t.to(
            b.value,
            { scaleX: 0.01, ease: "power2.inOut", duration: c ? 0 : 0.25 },
            0.1
          ),
          t.set([b.value, k.value, g.value], { autoAlpha: 0 }, ">");
      }
      return (
        G(
          () => y.modalState,
          (c) => {
            if (c === _e.MENU) m();
            else {
              const l = y.menuOpenBeforeRouteChange;
              _(!1, l);
            }
          }
        ),
        G(
          () => p.siteConfig,
          (c) => {
            var l, I;
            if (
              ((i.value =
                ((I =
                  (l = c == null ? void 0 : c.elements) == null
                    ? void 0
                    : l.mainmenu) == null
                  ? void 0
                  : I.linkedItems) || []),
              !i.value || i.value.length === 0)
            ) {
              console.warn("No menu data found in siteConfig");
              return;
            }
            (w.value = i.value[0].elements),
              (A.value = p.filterLinkList(w.value.top.linkedItems)),
              (E.value = p.filterLinkList(w.value.bottom.linkedItems));
          },
          { deep: !0, immediate: !1 }
        ),
        ae(() => {
          _(!0);
        }),
        (c, l) => {
          var ne, re;
          const I = Ye,
            H = ze,
            Y = et,
            U = ie,
            X = po;
          return (
            u(),
            j(Ge, { to: "body" }, [
              e(
                "div",
                { ref_key: "rootRef", ref: C, class: "TheMenu" },
                [
                  e(
                    "div",
                    {
                      ref_key: "bgWrapperRef",
                      ref: f,
                      class: "TheMenu-bgWrapper",
                      onClick: Z,
                    },
                    l[0] ||
                      (l[0] = [
                        e(
                          "div",
                          { class: "TheMenu-bg TheMenu-bg--first" },
                          null,
                          -1
                        ),
                        e(
                          "div",
                          { class: "TheMenu-bg TheMenu-bg--second" },
                          null,
                          -1
                        ),
                        e(
                          "div",
                          { class: "TheMenu-bg TheMenu-bg--third" },
                          null,
                          -1
                        ),
                      ]),
                    512
                  ),
                  e(
                    "div",
                    { ref_key: "menuBlockRef", ref: g, class: "TheMenu-block" },
                    [
                      e(
                        "div",
                        {
                          ref_key: "menuContentBgRef",
                          ref: b,
                          class: "TheMenu-contentBg",
                        },
                        null,
                        512
                      ),
                      e(
                        "div",
                        {
                          ref_key: "menuCloseRef",
                          ref: v,
                          class: "TheMenu-closeButton",
                        },
                        [
                          R(
                            H,
                            {
                              label: "Close",
                              theme: r(F).isMobileOrPortraitTablet
                                ? "yellow-alt"
                                : "yellow",
                              onClick: Z,
                            },
                            { default: q(() => [R(I)]), _: 1 },
                            8,
                            ["theme"]
                          ),
                        ],
                        512
                      ),
                      e(
                        "div",
                        {
                          ref_key: "menuContentRef",
                          ref: k,
                          class: "TheMenu-content",
                        },
                        [
                          e(
                            "div",
                            {
                              ref_key: "menuInverseRef",
                              ref: D,
                              class: "TheMenu-inverse",
                            },
                            [
                              e("div", vo, [
                                e("div", mo, [
                                  e("div", fo, [
                                    e("div", null, [
                                      (ne = r(A)) != null && ne.length
                                        ? (u(),
                                          h("nav", _o, [
                                            (u(!0),
                                            h(
                                              ee,
                                              null,
                                              te(
                                                r(A),
                                                (T, x) => (
                                                  u(),
                                                  h(
                                                    "div",
                                                    {
                                                      key: `primaryLink-${x}`,
                                                      ref_for: !0,
                                                      ref: (B) => (L[x] = B),
                                                      class:
                                                        "TheMenu-primaryLinkWrapper",
                                                    },
                                                    [
                                                      l[1] ||
                                                        (l[1] = e(
                                                          "div",
                                                          {
                                                            class:
                                                              "TheMenu-primaryDivider",
                                                          },
                                                          null,
                                                          -1
                                                        )),
                                                      R(
                                                        U,
                                                        {
                                                          to: r(
                                                            p
                                                          ).getInternalTo(T),
                                                          "data-first": x === 0,
                                                          "data-last":
                                                            x ===
                                                            r(A).length - 1,
                                                          "data-active": M(T),
                                                          class:
                                                            "TheMenu-link TheMenu-link--primary TheMenu-largeText",
                                                        },
                                                        {
                                                          default: q(() => {
                                                            var B, J;
                                                            return [
                                                              (J =
                                                                (B =
                                                                  T.elements) ==
                                                                null
                                                                  ? void 0
                                                                  : B.title) !=
                                                                null && J.value
                                                                ? (u(),
                                                                  h(
                                                                    "span",
                                                                    ho,
                                                                    O(
                                                                      T.elements
                                                                        .title
                                                                        .value
                                                                    ),
                                                                    1
                                                                  ))
                                                                : (u(),
                                                                  h(
                                                                    "span",
                                                                    go,
                                                                    "Error: No title defined"
                                                                  )),
                                                              R(Y),
                                                            ];
                                                          }),
                                                          _: 2,
                                                        },
                                                        1032,
                                                        [
                                                          "to",
                                                          "data-first",
                                                          "data-last",
                                                          "data-active",
                                                        ]
                                                      ),
                                                    ]
                                                  )
                                                )
                                              ),
                                              128
                                            )),
                                          ]))
                                        : ue("", !0),
                                    ]),
                                  ]),
                                  e("div", Co, [
                                    (re = r(E)) != null && re.length
                                      ? (u(),
                                        h("nav", bo, [
                                          e(
                                            "div",
                                            {
                                              ref_key: "homeLinkRef",
                                              ref: V,
                                              class: "TheMenu-link--featured",
                                            },
                                            [
                                              R(
                                                U,
                                                {
                                                  to: "/",
                                                  title: "home",
                                                  class:
                                                    "TheMenu-link TheMenu-largeText",
                                                },
                                                {
                                                  default: q(() => [
                                                    R(X, {
                                                      inset: "-1.5rem -0.3rem",
                                                    }),
                                                    l[2] ||
                                                      (l[2] = e(
                                                        "span",
                                                        null,
                                                        "Home",
                                                        -1
                                                      )),
                                                  ]),
                                                  _: 1,
                                                  __: [2],
                                                }
                                              ),
                                            ],
                                            512
                                          ),
                                          (u(!0),
                                          h(
                                            ee,
                                            null,
                                            te(
                                              r(E),
                                              (T, x) => (
                                                u(),
                                                h(
                                                  "div",
                                                  {
                                                    key: `secondaryLink-${x}`,
                                                    ref_for: !0,
                                                    ref: (B) => (N[x] = B),
                                                    class:
                                                      "TheMenu-secondaryLinkWrapper",
                                                  },
                                                  [
                                                    R(
                                                      U,
                                                      {
                                                        to: r(p).getInternalTo(
                                                          T
                                                        ),
                                                        title: T.label,
                                                        class:
                                                          "TheMenu-link TheMenu-link--secondary",
                                                      },
                                                      {
                                                        default: q(() => {
                                                          var B, J;
                                                          return [
                                                            R(X, {
                                                              inset:
                                                                "-1.5rem -0.3rem",
                                                            }),
                                                            (J =
                                                              (B =
                                                                T.elements) ==
                                                              null
                                                                ? void 0
                                                                : B.title) !=
                                                              null && J.value
                                                              ? (u(),
                                                                h(
                                                                  "span",
                                                                  yo,
                                                                  O(
                                                                    T.elements
                                                                      .title
                                                                      .value
                                                                  ),
                                                                  1
                                                                ))
                                                              : ue("", !0),
                                                          ];
                                                        }),
                                                        _: 2,
                                                      },
                                                      1032,
                                                      ["to", "title"]
                                                    ),
                                                  ]
                                                )
                                              )
                                            ),
                                            128
                                          )),
                                        ]))
                                      : ue("", !0),
                                  ]),
                                ]),
                              ]),
                            ],
                            512
                          ),
                        ],
                        512
                      ),
                    ],
                    512
                  ),
                ],
                512
              ),
            ])
          );
        }
      );
    },
  },
  Eo = oe(ko, [["__scopeId", "data-v-7355f592"]]),
  To = {
    class: "icon-hamburger",
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    viewBox: "0 0 16 16",
  };
function So(S, o) {
  return (
    u(),
    h(
      "svg",
      To,
      o[0] ||
        (o[0] = [
          he(
            '<defs><clipPath id="clippath"><rect x="0" y="0" width="16" height="16" style="fill:none;"></rect></clipPath><clipPath id="clippath-1"><rect x=".8" y="2.1" width="14.3" height="11.7" style="fill:none;"></rect></clipPath></defs><g style="clip-path:url(#clippath);"><g style="clip-path:url(#clippath-1);"><path d="M15.2,7.3v1.5H.8v-1.5h14.3ZM.8,12.4v1.5h14.3v-1.5H.8ZM.8,2.1v1.5h14.3v-1.5H.8Z" fill="currentColor"></path></g></g>',
            2
          ),
        ])
    )
  );
}
const Vo = { render: So },
  Mo = {
    class: "icon-button-border",
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    viewBox: "0 0 33 33",
  };
function Lo(S, o) {
  return (
    u(),
    h(
      "svg",
      Mo,
      o[0] ||
        (o[0] = [
          e(
            "rect",
            {
              x: ".5",
              y: ".6",
              width: "32",
              height: "32",
              rx: "5.5",
              ry: "5.5",
              style: { stroke: "currentColor" },
            },
            null,
            -1
          ),
        ])
    )
  );
}
const Ro = { render: Lo },
  wo = {
    class: "icon-be-name",
    viewBox: "0 0 103 35",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  };
function Ao(S, o) {
  return (
    u(),
    h(
      "svg",
      wo,
      o[0] ||
        (o[0] = [
          he(
            '<path d="M0 0.800049H5.57644C6.24677 0.800049 6.86237 0.938252 7.42324 1.21411C7.98383 1.48997 8.42575 1.8855 8.74873 2.40043C9.0717 2.91562 9.23319 3.51641 9.23319 4.20307C9.23319 4.88972 9.04406 5.52131 8.66636 6.02397C8.28865 6.5269 7.78279 6.90089 7.14903 7.14595C7.88033 7.26862 8.45637 7.59682 8.87689 8.13027C9.2974 8.66373 9.50793 9.34739 9.50793 10.1812C9.50793 10.8679 9.33723 11.4782 8.99583 12.0114C8.65444 12.5449 8.19734 12.9557 7.62455 13.2438C7.05176 13.5322 6.42993 13.6761 5.7596 13.6761H0V0.800049ZM7.05745 11.4872C7.47174 11.1318 7.67901 10.6348 7.67901 9.99724C7.67901 9.35966 7.47174 8.863 7.05745 8.50754C6.6429 8.15208 6.08826 7.97381 5.39354 7.97381H1.82838V12.0207H5.39382C6.08853 12.0207 6.64317 11.843 7.05772 11.4872H7.05745ZM6.83798 5.80344C7.21569 5.45998 7.40481 4.98813 7.40481 4.38679C7.40481 3.78546 7.21569 3.31415 6.83798 2.97041C6.46028 2.62695 5.94818 2.45522 5.3025 2.45522H1.82838V6.31809H5.30223C5.94791 6.31809 6.46001 6.14663 6.83771 5.80317L6.83798 5.80344Z" fill="currentColor"></path><path d="M10.8228 4.47892H12.4682V6.50235C12.6511 5.82796 12.9833 5.30677 13.4648 4.93878C13.9463 4.57105 14.4977 4.38678 15.1195 4.38678H15.9421V6.07902H15.2105C14.6619 6.07902 14.1896 6.19542 13.7937 6.42848C13.3976 6.66155 13.0928 6.99874 12.8795 7.44006C12.666 7.88166 12.5595 8.40885 12.5595 9.02191V13.6756H10.8228V4.47892Z" fill="currentColor"></path><path d="M18.4685 13.3174C17.8164 12.9557 17.2921 12.4129 16.896 11.6895C16.4998 10.9658 16.3018 10.0891 16.3018 9.05898C16.3018 8.02886 16.4998 7.17375 16.896 6.45629C17.2921 5.73883 17.8164 5.19938 18.4685 4.83765C19.1205 4.47592 19.8184 4.29492 20.5619 4.29492C21.342 4.29492 22.0245 4.46366 22.6095 4.80085C23.1945 5.13804 23.6453 5.61317 23.9623 6.22622C24.2794 6.83928 24.4379 7.54447 24.4379 8.3418V9.35338H18.0386C18.0751 10.0158 18.2214 10.5738 18.4775 11.0274C18.7335 11.4809 19.0533 11.8214 19.4372 12.0482C19.8211 12.275 20.2081 12.3884 20.5982 12.3884H20.7443C21.2195 12.3884 21.64 12.2657 22.0058 12.0207C22.3713 11.7753 22.5968 11.4199 22.6824 10.9538H24.4192C24.2607 11.8615 23.828 12.5727 23.121 13.0876C22.4141 13.6028 21.5791 13.8601 20.6161 13.8601C19.836 13.8601 19.1199 13.6791 18.468 13.3177L18.4685 13.3174ZM22.0703 6.30909C21.6864 5.94736 21.2079 5.76636 20.6351 5.76636H20.4888C19.9523 5.76636 19.4681 5.94437 19.0354 6.3001C18.6027 6.65555 18.3071 7.21355 18.1486 7.9738H22.7011C22.6645 7.22581 22.4542 6.67109 22.0703 6.30936V6.30909Z" fill="currentColor"></path><path d="M27.5061 13.2899C26.8967 12.9099 26.4179 12.3579 26.0708 11.6342C25.7235 10.9107 25.5498 10.0586 25.5498 9.07727C25.5498 8.09595 25.7235 7.2441 26.0708 6.52038C26.4182 5.79692 26.8967 5.2452 27.5061 4.86494C28.1154 4.48495 28.8039 4.29468 29.5721 4.29468C30.2912 4.29468 30.8821 4.42334 31.3454 4.68094C31.8088 4.93854 32.1927 5.30026 32.4975 5.76612V4.47868H34.2343V13.6756H32.4975V12.3882C32.1927 12.8543 31.8088 13.2157 31.3454 13.4733C30.8821 13.7309 30.2912 13.8596 29.5721 13.8596C28.8042 13.8596 28.1154 13.6696 27.5061 13.2893V13.2899ZM31.1807 12.0114C31.5706 11.7601 31.8876 11.3828 32.1315 10.8802C32.3753 10.3775 32.4973 9.77674 32.4973 9.07755C32.4973 8.37835 32.3753 7.77784 32.1315 7.27491C31.8876 6.77225 31.5709 6.39499 31.1807 6.14366C30.7905 5.89233 30.3762 5.76639 29.9376 5.76639H29.755C29.2916 5.76639 28.8711 5.89233 28.4934 6.14366C28.1157 6.39499 27.8201 6.76898 27.6066 7.26564C27.3931 7.76257 27.2866 8.36636 27.2866 9.07755C27.2866 9.78874 27.3931 10.3928 27.6066 10.8895C27.8198 11.3864 28.1154 11.7604 28.4934 12.0117C28.8711 12.263 29.2916 12.3887 29.755 12.3887H29.9376C30.3762 12.3887 30.7905 12.263 31.1807 12.0117V12.0114Z" fill="currentColor"></path><path d="M35.5952 0.800049H37.332V8.45193L41.3543 4.47893H43.6397L39.8369 8.13927L43.8226 13.6759H41.6835L38.5938 9.33485L37.3323 10.5672V13.6759H35.5955V0.800049H35.5952Z" fill="currentColor"></path><path d="M46.719 13.1424C46.3657 12.7869 46.1887 12.2903 46.1887 11.6524V5.98716H44.1777V4.47892H46.1887V1.49896H47.9255V4.47892H50.1197V5.98716H47.9255V11.3765C47.9255 11.6464 47.9803 11.8364 48.09 11.9468C48.1997 12.0572 48.3886 12.1123 48.6568 12.1123H50.3936V13.6758H48.1997C47.566 13.6758 47.072 13.4981 46.7187 13.1424H46.719Z" fill="currentColor"></path><path d="M51.4683 0.800049H53.2051V5.76637C53.5099 5.31278 53.8998 4.95405 54.3753 4.69019C54.8505 4.42659 55.4355 4.29466 56.1305 4.29466C56.8255 4.29466 57.4194 4.42659 57.9131 4.69019C58.4068 4.95405 58.7818 5.32805 59.0375 5.81244C59.2933 6.29683 59.4215 6.86409 59.4215 7.51368V13.6759H57.6844V7.88194C57.6844 7.44035 57.6205 7.06336 57.4923 6.7507C57.3644 6.43803 57.1631 6.19597 56.8892 6.02424C56.6147 5.85278 56.2644 5.76664 55.8379 5.76664H55.6916C55.2526 5.76664 54.8443 5.87704 54.4666 6.09784C54.0889 6.31864 53.7841 6.63757 53.5524 7.05436C53.3207 7.47142 53.2051 7.96181 53.2051 8.5258V13.6761H51.4683V0.800049Z" fill="currentColor"></path><path d="M60.7964 4.47892H62.4419V6.50235C62.6248 5.82796 62.9569 5.30677 63.4384 4.93878C63.9199 4.57105 64.4713 4.38678 65.0931 4.38678H65.9157V6.07902H65.1842C64.6355 6.07902 64.1632 6.19542 63.7674 6.42848C63.3712 6.66155 63.0664 6.99874 62.8532 7.44006C62.6397 7.88166 62.5332 8.40885 62.5332 9.02191V13.6756H60.7964V4.47892Z" fill="currentColor"></path><path d="M68.3844 13.2531C67.7138 12.8485 67.1868 12.2843 66.8028 11.5608C66.4189 10.8374 66.2271 10.0098 66.2271 9.07752C66.2271 8.14526 66.4189 7.31795 66.8028 6.59422C67.1868 5.87077 67.7138 5.30678 68.3844 4.90198C69.0547 4.49746 69.7982 4.29492 70.6148 4.29492C71.4315 4.29492 72.175 4.49746 72.8453 4.90198C73.5156 5.3065 74.0426 5.87077 74.4268 6.59422C74.8108 7.31795 75.0029 8.14553 75.0029 9.07752C75.0029 10.0095 74.8108 10.8374 74.4268 11.5608C74.0429 12.2845 73.5159 12.8485 72.8453 13.2531C72.175 13.6576 71.4315 13.8598 70.6148 13.8598C69.7982 13.8598 69.0547 13.6576 68.3844 13.2531ZM72.0224 11.9929C72.4123 11.7293 72.7171 11.3493 72.9366 10.8524C73.1558 10.3557 73.2658 9.7639 73.2658 9.07725C73.2658 8.39059 73.1561 7.79907 72.9366 7.30214C72.7171 6.80548 72.4123 6.42549 72.0224 6.16162C71.6322 5.89803 71.1873 5.76609 70.6877 5.76609H70.5417C70.0418 5.76609 69.5969 5.89803 69.207 6.16162C68.8168 6.42549 68.512 6.80548 68.2928 7.30214C68.0733 7.79907 67.9636 8.39059 67.9636 9.07725C67.9636 9.7639 68.0733 10.3557 68.2928 10.8524C68.512 11.3493 68.8168 11.7293 69.207 11.9929C69.5969 12.2567 70.0418 12.3884 70.5417 12.3884H70.6877C71.1873 12.3884 71.6322 12.2567 72.0224 11.9929Z" fill="currentColor"></path><path d="M77.6457 13.4368C77.1823 13.1547 76.832 12.7654 76.5944 12.2688C76.3565 11.7721 76.2378 11.1988 76.2378 10.549V4.47894H77.9746V10.1813C77.9746 10.917 78.1269 11.4687 78.4317 11.8367C78.7365 12.2047 79.1996 12.3887 79.8214 12.3887H79.9674C80.3695 12.3887 80.7445 12.2693 81.0919 12.03C81.4392 11.7909 81.7226 11.4477 81.9421 10.9998C82.1613 10.5523 82.2713 10.0341 82.2713 9.44527V4.47894H84.0081V13.6759H82.2713V11.9286C82.0762 12.4806 81.7259 12.9401 81.22 13.3081C80.7142 13.6761 80.0896 13.8601 79.3459 13.8601C78.6755 13.8601 78.1087 13.7192 77.6457 13.4371V13.4368Z" fill="currentColor"></path><path d="M86.9923 17.3637C86.3707 17.1244 85.886 16.7875 85.5389 16.3522C85.1915 15.9166 84.9872 15.4232 84.9263 14.8712H86.6631C86.7484 15.3128 87.0104 15.653 87.4494 15.8923C87.8883 16.1311 88.4308 16.2508 89.0767 16.2508H89.2596C90.076 16.2508 90.7222 16.0237 91.1974 15.5704C91.6727 15.1165 91.9106 14.4236 91.9106 13.4916V12.2042C91.6545 12.6212 91.2917 12.9707 90.8224 13.2525C90.3531 13.5347 89.8018 13.6756 89.168 13.6756C88.4364 13.6756 87.7631 13.5041 87.1478 13.1607C86.5322 12.8172 86.0385 12.293 85.6671 11.5878C85.2953 10.8826 85.1094 10.015 85.1094 8.98486C85.1094 7.95474 85.2921 7.08736 85.6578 6.38217C86.0233 5.67725 86.514 5.15306 87.1296 4.80932C87.7452 4.46586 88.4248 4.29413 89.1683 4.29413C89.8142 4.29413 90.384 4.43833 90.8777 4.72646C91.3714 5.01486 91.7158 5.36105 91.9108 5.76557V4.47813H93.6476V13.6751C93.6476 14.4476 93.471 15.1405 93.1174 15.7536C92.7638 16.3666 92.2487 16.848 91.5724 17.1975C90.8959 17.5469 90.0944 17.7217 89.168 17.7217C88.3392 17.7217 87.6138 17.602 86.9923 17.3629V17.3637ZM90.6124 11.8089C91.0023 11.5453 91.3161 11.1713 91.554 10.6869C91.7916 10.2025 91.9106 9.63554 91.9106 8.98541C91.9106 8.33528 91.7976 7.76557 91.5722 7.2749C91.3467 6.78424 91.0479 6.41025 90.6764 6.15265C90.3046 5.89505 89.9055 5.76639 89.4791 5.76639H89.3327C88.8816 5.76639 88.4673 5.88006 88.0896 6.10685C87.7119 6.33365 87.4101 6.68638 87.1846 7.1645C86.9592 7.6429 86.8465 8.24969 86.8465 8.98541C86.8465 10.0769 87.0689 10.8862 87.5138 11.4134C87.9588 11.9408 88.5348 12.2044 89.2417 12.2044H89.388C89.8145 12.2044 90.2228 12.0728 90.613 11.8089H90.6124Z" fill="currentColor"></path><path d="M95.0469 0.800049H96.7837V5.76637C97.0885 5.31278 97.4784 4.95405 97.9539 4.69019C98.4292 4.42659 99.0141 4.29466 99.7091 4.29466C100.404 4.29466 100.998 4.42659 101.492 4.69019C101.985 4.95405 102.36 5.32805 102.616 5.81244C102.872 6.29683 103 6.86409 103 7.51368V13.6759H101.263V7.88194C101.263 7.44035 101.199 7.06336 101.071 6.7507C100.943 6.43803 100.742 6.19597 100.468 6.02424C100.193 5.85278 99.843 5.76664 99.4165 5.76664H99.2702C98.8312 5.76664 98.4229 5.87704 98.0452 6.09784C97.6675 6.31864 97.3627 6.63757 97.131 7.05436C96.8994 7.47142 96.7837 7.96181 96.7837 8.5258V13.6761H95.0469V0.800049Z" fill="currentColor"></path><path d="M0 17.0696H9.3245V18.725H1.82838V22.4958H8.22769V24.1515H1.82838V28.2902H9.50766V29.9457H0V17.0699V17.0696Z" fill="currentColor"></path><path d="M10.7437 20.7482H12.4804V22.0357C12.7853 21.5821 13.1752 21.2234 13.6507 20.9595C14.1259 20.6959 14.7109 20.564 15.4059 20.564C16.1009 20.564 16.6948 20.6959 17.1885 20.9595C17.6822 21.2234 18.0572 21.5974 18.3129 22.0817C18.5687 22.5661 18.6969 23.1334 18.6969 23.783V29.9452H16.9598V24.1513C16.9598 23.7097 16.8959 23.3327 16.7677 23.02C16.6398 22.7073 16.4385 22.4653 16.1646 22.2936C15.8901 22.1221 15.5398 22.036 15.1133 22.036H14.967C14.528 22.036 14.1197 22.1464 13.742 22.3672C13.3643 22.5879 13.0595 22.9069 12.8278 23.3237C12.5961 23.7407 12.4804 24.2311 12.4804 24.7951V29.9454H10.7437V20.7485V20.7482Z" fill="currentColor"></path><path d="M21.8894 29.5869C21.2373 29.2252 20.713 28.6825 20.3169 27.959C19.9207 27.2353 19.7227 26.3586 19.7227 25.3285C19.7227 24.2984 19.9207 23.4433 20.3169 22.7258C20.713 22.0084 21.2373 21.4689 21.8894 21.1072C22.5414 20.7455 23.2393 20.5645 23.9828 20.5645C24.7629 20.5645 25.4454 20.7332 26.0304 21.0704C26.6154 21.4076 27.0662 21.8827 27.3832 22.4958C27.7003 23.1088 27.8588 23.814 27.8588 24.6113V25.6229H21.4595C21.496 26.2853 21.6423 26.8433 21.8984 27.2969C22.1544 27.7505 22.4742 28.0909 22.8581 28.3177C23.242 28.5445 23.629 28.6579 24.0191 28.6579H24.1652C24.6404 28.6579 25.0609 28.5353 25.4267 28.2902C25.7922 28.0449 26.0177 27.6894 26.1033 27.2233H27.8401C27.6816 28.131 27.2489 28.8422 26.5419 29.3571C25.835 29.8723 25 30.1296 24.037 30.1296C23.2569 30.1296 22.5408 29.9486 21.8889 29.5872L21.8894 29.5869ZM25.4912 22.5786C25.1073 22.2169 24.6288 22.0359 24.056 22.0359H23.9097C23.3732 22.0359 22.889 22.2139 22.4563 22.5696C22.0236 22.9251 21.728 23.4831 21.5695 24.2433H26.122C26.0854 23.4953 25.8751 22.9406 25.4912 22.5789V22.5786Z" fill="currentColor"></path><path d="M29.0034 20.7482H30.6489V22.7716C30.8318 22.0973 31.164 21.5761 31.6455 21.2081C32.1269 20.8403 32.6783 20.6561 33.3002 20.6561H34.1228V22.3483H33.3912C32.8425 22.3483 32.3702 22.4647 31.9744 22.6978C31.5783 22.9308 31.2734 23.268 31.0602 23.7094C30.8467 24.1509 30.7402 24.6781 30.7402 25.2912V29.9449H29.0034V20.7479V20.7482Z" fill="currentColor"></path><path d="M36.4244 33.6333C35.8028 33.3939 35.3181 33.057 34.971 32.6217C34.6237 32.1861 34.4194 31.6927 34.3584 31.1407H36.0952C36.1805 31.5823 36.4426 31.9225 36.8815 32.1618C37.3204 32.4006 37.8629 32.5203 38.5088 32.5203H38.6917C39.5081 32.5203 40.1543 32.2932 40.6296 31.8399C41.1048 31.386 41.3427 30.6931 41.3427 29.7611V28.4737C41.0866 28.8907 40.7238 29.2402 40.2546 29.5221C39.7853 29.8042 39.2339 29.9451 38.6001 29.9451C37.8686 29.9451 37.1953 29.7737 36.5799 29.4302C35.9643 29.0867 35.4707 28.5625 35.0992 27.8574C34.7274 27.1522 34.5416 26.2845 34.5416 25.2544C34.5416 24.2243 34.7242 23.3569 35.09 22.6517C35.4555 21.9468 35.9462 21.4226 36.5618 21.0789C37.1774 20.7354 37.8569 20.5637 38.6004 20.5637C39.2464 20.5637 39.8162 20.7079 40.3098 20.996C40.8035 21.2844 41.1479 21.6306 41.343 22.0351V20.7477H43.0798V29.9446C43.0798 30.7171 42.9031 31.41 42.5495 32.0231C42.1962 32.6361 41.6808 33.1175 41.0045 33.467C40.328 33.8165 39.5265 33.9912 38.6001 33.9912C37.7713 33.9912 37.046 33.8715 36.4244 33.6325V33.6333ZM40.0446 28.0784C40.4345 27.8148 40.7482 27.4408 40.9861 26.9564C41.2238 26.4721 41.3427 25.9051 41.3427 25.2549C41.3427 24.6048 41.2297 24.0351 41.0043 23.5444C40.7788 23.0538 40.48 22.6798 40.1085 22.4222C39.7368 22.1646 39.3377 22.0359 38.9112 22.0359H38.7649C38.3137 22.0359 37.8995 22.1496 37.5217 22.3764C37.144 22.6032 36.8422 22.9559 36.6168 23.434C36.3913 23.9124 36.2786 24.5192 36.2786 25.2549C36.2786 26.3464 36.5011 27.1557 36.946 27.6829C37.3909 28.2104 37.9669 28.474 38.6738 28.474H38.8201C39.2466 28.474 39.6549 28.3423 40.0451 28.0784H40.0446Z" fill="currentColor"></path><path d="M44.0423 20.7482L47.8819 29.7612V31.0489C47.8819 31.2326 47.8573 31.3768 47.8085 31.4812C47.7597 31.5856 47.6836 31.6622 47.5801 31.711C47.4763 31.7601 47.3332 31.7846 47.1503 31.7846H44.5907V33.3482H47.6074C48.2534 33.3482 48.7349 33.1887 49.0519 32.8698C49.3689 32.5508 49.5274 32.0665 49.5274 31.4166V29.7492L53.2755 20.7482H51.4837L48.7368 27.5297L45.8888 20.7482H44.042H44.0423Z" fill="currentColor"></path>',
            18
          ),
        ])
    )
  );
}
const Ho = { render: Ao },
  $o = { class: "InversionNav-container" },
  Fo = {
    __name: "InversionNav",
    setup(S) {
      const o = Me(),
        y = Te(),
        F = Ie(),
        { gsap: p } = ge(),
        d = be();
      function C() {
        y.setModalState(_e.MENU);
      }
      const f = n(null),
        g = [],
        v = [],
        k = [],
        b = [
          { class: "differenceLayer" },
          { class: "overlayLayer" },
          { class: "saturationLayer" },
          { class: "colorLayer" },
        ],
        D = n(!1);
      function V(t) {
        return t[t.length - 1];
      }
      function L(t) {
        return t.slice(0, -1);
      }
      const N = n(!1),
        w = W(() => F.isPhoneBreakpoint && N.value);
      G(w, (t) => {
        M(t ? "#12110E" : "", k);
      }),
        G(
          () => d.fullPath,
          () => {
            L(g).forEach((t) => {
              p.set(t, { autoAlpha: 1, delay: $.LEAVE });
            }),
              p.set(V(g), { autoAlpha: 0, delay: $.LEAVE });
          }
        ),
        G(N, (t) => {
          g.forEach((m) => {
            p.killTweensOf(m), p.to(m, { autoAlpha: t ? 0 : 1, duration: 0.5 });
          });
        });
      function A() {
        const t = o.scrollSubPixel / yt.lvh;
        N.value = !kt(t, -1, 1);
      }
      function E() {
        D.value && A();
      }
      function i() {
        E();
      }
      G(
        () => o.scrollSubPixel,
        () => {
          E();
        }
      ),
        Se(i);
      function M(t = "", m) {
        p.set(V(m), { color: t, autoAlpha: t === "" ? 0 : 1 });
      }
      function Z() {
        [g, v, k].forEach((t, m, _) => {
          if ((w.value && m === _.length - 1) || (N.value && m === 0)) return;
          const c = V(t);
          if (!c) return;
          const l = c.getBoundingClientRect(),
            I = l.left + l.width / 2,
            H = l.top + l.height / 2,
            U = document
              .elementsFromPoint(I, H)
              .find((ne) => ne.matches("[data-nav-color]"));
          if (!U) {
            M("", t);
            return;
          }
          const X = U.getAttribute("data-nav-color");
          M(X, t);
        });
      }
      let a;
      return (
        ae(() => {
          bt(() => {
            (D.value = !0),
              E(),
              (a = setInterval(Z, 300)),
              (f.value.style.visibility = "visible");
          });
        }),
        Ce(() => {
          clearInterval(a);
        }),
        (t, m) => {
          const _ = Ho,
            c = ie,
            l = qe,
            I = Ro,
            H = Vo;
          return null;
        }
      );
    },
  },
  Io = oe(Fo, [["__scopeId", "data-v-f84c3a99"]]),
  xo = { key: 0, class: "GridOverlay" },
  Po = { class: "GridOverlay-inner" },
  Do = { class: "GridOverlay-grid" },
  No = 12,
  Oo = {
    __name: "GridOverlay",
    setup(S) {
      const o = z.href.includes("debug-grid");
      return (y, F) =>
        r(o)
          ? (u(),
            h("div", xo, [
              e("div", Po, [
                e("div", Do, [
                  (u(),
                  h(
                    ee,
                    null,
                    te(No, (p) =>
                      e(
                        "div",
                        {
                          key: p,
                          class: "GridOverlay-column",
                          style: Ve({ gridColumn: p }),
                        },
                        null,
                        4
                      )
                    ),
                    64
                  )),
                ]),
              ]),
            ]))
          : ue("", !0);
    },
  },
  Bo = oe(Oo, [["__scopeId", "data-v-213e9090"]]),
  Zo = { class: "PageTransition-logoWrapper" },
  Uo = {
    class: "PageTransition-logo",
    viewBox: "0 0 2600 2600",
    xmlns: "http://www.w3.org/2000/svg",
  },
  se = 75,
  Wo = {
    __name: "PageTransition",
    setup(S) {
      const { gsap: o, CustomEase: y } = ge(),
        F = be(),
        p = Qe(),
        d = W(() => p.transitionState),
        C = n(null),
        f = n(null),
        g = n(null),
        v = n(null),
        k = n(null),
        b = n(null),
        D = n(""),
        V = W(() => /^\/portfolio\/[^/]+/.test(F.path) && D.value !== ""),
        L = W(() => (V.value ? "vertical" : "horizontal"));
      function N(c) {
        let l = document.querySelector('meta[name="theme-color"]');
        l ||
          ((l = document.createElement("meta")),
          (l.name = "theme-color"),
          document.head.appendChild(l)),
          l.setAttribute("content", c);
      }
      let w = null,
        A = ve.YELLOW;
      function E(c) {
        w == null || w.kill(),
          (w = o.timeline()),
          w.to("html", { backgroundColor: c, duration: 0.5 }, 0);
        const l = { color: A };
        w.to(
          l,
          {
            color: c,
            duration: 0.5,
            onUpdate() {
              N(l.color), (A = l.color);
            },
          },
          0
        );
      }
      G(V, (c) => {
        E(c ? ve.BLACK : ve.YELLOW);
      });
      let i;
      const M = y.create("custom", "M0,0 C0.16,0.74 0.3,1 1,1 "),
        Z = y.create("custom", "M0,0 C0.66,0 0.7,0.33 1,1 ");
      G(d, (c) => {
        c === K.LEAVE && a(), c === K.ENTER_AFTER_LOADED && t();
      });
      function a() {
        p.setTransitionVisibleState(K.LEAVE),
          i == null || i.kill(),
          (i = o.timeline());
        const c = L.value === "horizontal" ? "x" : "y",
          l = L.value === "horizontal" ? "y" : "x",
          I = L.value === "horizontal" ? 0 : `-${se}vw`;
        o.set(
          C.value,
          {
            [c]: L.value === "horizontal" ? "100vw" : `-${se * 2 + 100}lvh`,
            [l]: I,
            autoAlpha: 1,
          },
          0
        );
        const H = L.value === "horizontal" ? `-${se}vw` : "0lvh";
        i.to(
          C.value,
          { [c]: H, duration: $.LEAVE * 0.5, ease: "Power2.easeInOut" },
          0
        ),
          b.value &&
            (o.set(b.value, { autoAlpha: 0 }),
            i.to(
              b.value,
              { autoAlpha: 1, duration: $.LEAVE * 0.25 },
              $.LEAVE * 0.33
            )),
          o.set([f.value, g.value], { autoAlpha: 0 }),
          o.set([v.value], { autoAlpha: 1 }),
          o.set([k.value], { autoAlpha: 0.62 }),
          i.to(
            [v.value, k.value],
            { scale: 1, duration: $.LEAVE * 0.66, ease: M, stagger: 0.2 },
            $.LEAVE * 0.33
          ),
          i.to(
            [f.value, g.value],
            { scale: 1, duration: $.LEAVE * 0.66, ease: M, stagger: 0.2 },
            $.LEAVE * 0.33
          ),
          i.set([v.value, k.value], { autoAlpha: 0 }, $.LEAVE * 0.74),
          i.set([f.value], { autoAlpha: 1 }, $.LEAVE * 0.74),
          i.set([g.value], { autoAlpha: 0.62 }, $.LEAVE * 0.74);
      }
      function t() {
        p.setTransitionVisibleState(K.ENTER),
          i == null || i.kill(),
          (i = o.timeline());
        const c = L.value === "horizontal" ? "x" : "y",
          l = L.value === "horizontal" ? `-${se}vw` : "0lvh",
          I = L.value === "horizontal" ? "y" : "x",
          H = L.value === "horizontal" ? "0lvh" : `-${se}vw`;
        o.set(C.value, { [c]: l, [I]: H, autoAlpha: 1 }, 0);
        const Y =
          L.value === "horizontal" ? `-${se * 2 + 100}vw` : `${se + 100}lvh`;
        i.to(
          C.value,
          {
            [c]: Y,
            duration: $.ENTER_TOTAL - $.ENTER_DELAY,
            delay: $.ENTER_DELAY - $.ENTER_DELAY / 3,
            ease: "Power2.easeInOut",
          },
          0
        ),
          b.value &&
            i.to(b.value, { autoAlpha: 0, duration: $.ENTER_DELAY }, 0),
          i.set([f.value, g.value], { autoAlpha: 0 }, $.ENTER_DELAY * 0.5),
          i.set([v.value], { autoAlpha: 1 }, $.ENTER_DELAY * 0.5),
          i.set([k.value], { autoAlpha: 0.62 }, $.ENTER_DELAY * 0.5),
          i.to(
            [v.value, k.value],
            { scale: 0.01, duration: $.ENTER_DELAY, ease: Z, stagger: 0.2 },
            0
          ),
          i.to(
            [f.value, g.value],
            { scale: 0.01, duration: $.ENTER_DELAY, ease: Z, stagger: 0.2 },
            0
          ),
          i.to(
            [v.value, k.value],
            { autoAlpha: 0, duration: $.ENTER_DELAY * 0.2 },
            $.ENTER_DELAY * 0.8
          ),
          i.add(() => m(), i.duration());
      }
      function m() {
        i == null || i.kill(),
          (i = null),
          p.setTransitionVisibleState(K.AFTER_ENTER),
          E(ve.CREAM),
          C.value && o.set(C.value, { autoAlpha: 0 }),
          b.value && o.set(b.value, { autoAlpha: 0 }),
          f.value &&
            g.value &&
            o.set([v.value, k.value], { autoAlpha: 0, scale: 0.01 });
      }
      function _(c) {
        const l = c.replace(/^\/+/, "").split("/");
        return (l[l.length - 1] || "").replace(/-/g, " ");
      }
      return (
        G(F, () => {
          D.value = _(F.path) || "home";
        }),
        ae(() => {
          o.set(C.value, { x: `-${se}vw` }),
            o.set([f.value, g.value, v.value, k.value, b.value], {
              transformOrigin: "50% 50%",
            }),
            o.fromTo(
              [f.value, g.value, v.value, k.value],
              { rotation: 0 },
              { rotation: 360, duration: 7, repeat: -1 }
            ),
            o.set([f.value, g.value], { autoAlpha: 0 }),
            o.set([v.value], { autoAlpha: 1 }),
            o.set([k.value], { autoAlpha: 0.62 }),
            (i = o.timeline()),
            i.fromTo(
              [v.value, k.value],
              { scale: 0.1 },
              { scale: 1, duration: $.LEAVE * 0.66, ease: M, stagger: 0.2 },
              0
            ),
            i.fromTo(
              [f.value, g.value],
              { scale: 0.1 },
              { scale: 1, duration: $.LEAVE * 0.66, ease: M, stagger: 0.2 },
              0
            ),
            i.set([v.value, k.value], { autoAlpha: 0 }, i.duration()),
            i.set([f.value], { autoAlpha: 1 }, i.duration()),
            i.set([g.value], { autoAlpha: 0.62 }, i.duration()),
            N(ve.YELLOW);
        }),
        Ce(() => {
          m();
        }),
        (c, l) => (
          u(),
          h(
            "div",
            { class: le(["PageTransition", { "PageTransition--dark": r(V) }]) },
            [
              e(
                "div",
                {
                  ref_key: "curtainRef",
                  ref: C,
                  class: "PageTransition-curtainWrapper",
                },
                l[0] ||
                  (l[0] = [
                    he(
                      '<div class="PageTransition-curtainGradientLeft" data-v-9efb3050></div><div class="PageTransition-curtainGradientTop" data-v-9efb3050></div><div class="PageTransition-curtainCentre" data-v-9efb3050></div><div class="PageTransition-curtainGradientBottom" data-v-9efb3050></div><div class="PageTransition-curtainGradientRight" data-v-9efb3050></div>',
                      5
                    ),
                  ]),
                512
              ),
              e("div", Zo, [
                (u(),
                h("svg", Uo, [
                  e(
                    "path",
                    {
                      ref_key: "cutLogoRing1Ref",
                      ref: f,
                      class: "PageTransition-logoRing",
                      fill: "currentColor",
                      d: "M1037.46,474.69l-102.1-55.85,70.86-241.98c21.19-72.35,87.55-122.07,162.95-122.07h261.66c75.39,0,141.76,49.72,162.95,122.07l70.86,241.98,32.71,111.69,84.1,287.18,287.18,84.1-55.85,102.1-322.96-94.58-94.58-322.96-32.71-111.69-85.01-290.29c-2.76-9.44-11.42-15.92-21.25-15.92h-312.54c-9.83,0-18.49,6.48-21.25,15.92l-85.01,290.29ZM2422.3,1005.39l-241.98-70.86-55.85,102.1,290.29,85.01c9.44,2.76,15.92,11.42,15.92,21.25v312.54c0,9.83-6.48,18.49-15.92,21.25l-290.29,85.01-111.69,32.71-322.96,94.58-94.58,322.96,102.1,55.85,84.1-287.18,287.18-84.1,111.69-32.71,241.98-70.86c72.35-21.19,122.07-87.55,122.07-162.95v-261.66c0-75.39-49.72-141.76-122.07-162.95ZM1477.52,2413.93c-2.76,9.44-11.42,15.92-21.25,15.92h-312.54c-9.83,0-18.49-6.48-21.25-15.92l-85.01-290.29-32.71-111.69-94.58-322.96-322.96-94.58-55.85,102.1,287.18,84.1,84.1,287.18,32.71,111.69,70.86,241.98c21.19,72.35,87.55,122.07,162.95,122.07h261.66c75.39,0,141.76-49.72,162.95-122.07l70.86-241.98-102.1-55.85-85.01,290.29ZM169.31,1455.43v-312.54c0-9.83,6.48-18.49,15.92-21.25l290.29-85.01,111.69-32.71,322.96-94.58,94.58-322.96-102.1-55.85-84.1,287.18-287.18,84.1-111.69,32.71-241.98,70.86c-72.35,21.19-122.07,87.55-122.07,162.95v261.66c0,75.39,49.72,141.76,122.07,162.95l241.98,70.86,55.85-102.1-290.29-85.01c-9.44-2.76-15.92-11.42-15.92-21.25Z",
                    },
                    null,
                    512
                  ),
                  e(
                    "path",
                    {
                      ref_key: "cutLogoRing2Ref",
                      ref: g,
                      class: "PageTransition-logoRing",
                      opacity: "0.62",
                      fill: "currentColor",
                      d: "M902.65,2067.79l32.71,111.69-221.21,121c-66.15,36.18-148.23,24.41-201.54-28.9l-185.02-185.02c-53.31-53.31-65.08-135.39-28.9-201.54l121-221.21,55.85-102.1,143.6-262.54-143.6-262.54,111.69-32.71,161.49,295.24-161.49,295.24-55.85,102.1-145.15,265.38c-4.72,8.63-3.18,19.33,3.77,26.29l221,221c6.95,6.95,17.66,8.49,26.29,3.77l265.38-145.15ZM2301.32,1885.02l-121-221.21-111.69,32.71,145.15,265.38c4.72,8.63,3.18,19.33-3.77,26.29l-221,221c-6.95,6.95-17.66,8.49-26.29,3.77l-265.38-145.15-102.1-55.85-295.24-161.49-295.24,161.49,32.71,111.69,262.54-143.6,262.54,143.6,102.1,55.85,221.21,121c66.15,36.18,148.23,24.41,201.54-28.9l185.02-185.02c53.31-53.31,65.08-135.39,28.9-201.54ZM1962.73,385.38c8.63-4.72,19.33-3.18,26.29,3.77l221,221c6.95,6.95,8.49,17.66,3.77,26.29l-145.15,265.38-55.85,102.1-161.49,295.24,161.49,295.24,111.69-32.71-143.6-262.54,143.6-262.54,55.85-102.1,121-221.21c36.18-66.15,24.41-148.23-28.9-201.54l-185.02-185.02c-53.31-53.31-135.39-65.08-201.54-28.9l-221.21,121,32.71,111.69,265.38-145.15ZM419.68,934.52l111.69-32.71-145.15-265.38c-4.72-8.63-3.18-19.33,3.77-26.29l221-221c6.95-6.95,17.66-8.49,26.29-3.77l265.38,145.15,102.1,55.85,295.24,161.49,295.24-161.49-32.71-111.69-262.54,143.6-262.54-143.6-102.1-55.85-221.21-121c-66.15-36.18-148.23-24.41-201.54,28.9l-185.02,185.02c-53.31,53.31-65.08,135.39-28.9,201.54l121,221.21Z",
                    },
                    null,
                    512
                  ),
                  e(
                    "path",
                    {
                      ref_key: "solidLogoRing1Ref",
                      ref: v,
                      class: "PageTransition-logoRing",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "114px",
                      "stroke-miterlimit": "10",
                      d: "M2398.18,1058.39l-662.55-194.03-194.03-662.55c-15.51-52.96-64.08-89.34-119.26-89.34h-244.7c-55.18,0-103.75,36.39-119.26,89.34l-194.03,662.55-662.55,194.03c-52.96,15.51-89.34,64.08-89.34,119.26v244.7c0,55.18,36.39,103.75,89.34,119.26l662.55,194.03,194.03,662.55c15.51,52.96,64.08,89.34,119.26,89.34h244.7c55.18,0,103.75-36.39,119.26-89.34l194.03-662.55,662.55-194.03c52.96-15.51,89.34-64.08,89.34-119.26v-244.7c0-55.18-36.39-103.75-89.34-119.26Z",
                    },
                    null,
                    512
                  ),
                  e(
                    "path",
                    {
                      ref_key: "solidLogoRing2Ref",
                      ref: k,
                      class: "PageTransition-logoRing",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "114px",
                      "stroke-miterlimit": "10",
                      opacity: "0.62",
                      d: "M2247.38,1905.69l-331.29-605.69,331.29-605.69c26.48-48.41,17.86-108.49-21.15-147.51l-173.03-173.03c-39.02-39.02-99.09-47.63-147.51-21.15l-605.69,331.29-605.69-331.29c-48.41-26.48-108.49-17.86-147.51,21.15l-173.03,173.03c-39.02,39.02-47.63,99.09-21.15,147.51l331.29,605.69-331.29,605.69c-26.48,48.41-17.86,108.49,21.15,147.51l173.03,173.03c39.02,39.02,99.09,47.63,147.51,21.15l605.69-331.29,605.69,331.29c48.41,26.48,108.49,17.86,147.51-21.15l173.03-173.03c39.02-39.02,47.63-99.09,21.15-147.51Z",
                    },
                    null,
                    512
                  ),
                ])),
                Q(
                  e(
                    "div",
                    {
                      ref_key: "pageTitleRef",
                      ref: b,
                      class: "PageTransition-title",
                    },
                    O(r(D)),
                    513
                  ),
                  [[fe, r(D)]]
                ),
              ]),
            ],
            2
          )
        )
      );
    },
  },
  Yo = oe(Wo, [["__scopeId", "data-v-9efb3050"]]),
  zo = { class: "SignupForm-container" },
  Go = { class: "SignupForm-success SignupForm-row" },
  Xo = { class: "SignupForm-col SignupForm-col--left" },
  jo = { class: "SignupForm-header SignupForm-header--alone" },
  qo = { class: "SignupForm-title type-h3" },
  Jo = { class: "SignupForm-text type-body--md" },
  Ko = { class: "SignupForm-fail SignupForm-row" },
  Qo = { class: "SignupForm-col SignupForm-col--left" },
  en = { class: "SignupForm-header SignupForm-header--alone" },
  tn = { class: "SignupForm-title type-h3" },
  on = { class: "SignupForm-text type-body--md" },
  nn = { class: "SignupForm-wait SignupForm-row" },
  sn = { class: "SignupForm-col SignupForm-col--left" },
  an = { class: "SignupForm-header SignupForm-header--alone" },
  ln = { class: "SignupForm-title type-h3" },
  rn = { class: "SignupForm-text type-body--md" },
  un = { class: "SignupForm-row" },
  cn = {
    class: "SignupForm-col SignupForm-col--left",
    "data-withform": "true",
  },
  dn = { class: "SignupForm-header" },
  pn = { class: "SignupForm-title SignupForm-title--main type-h3" },
  vn = { class: "SignupForm-text type-body--md" },
  mn = {
    class: "SignupForm-col SignupForm-col--right",
    "data-withform": "true",
  },
  fn = { class: "SignupForm-field" },
  _n = { for: "field-name", class: "SignupForm-label" },
  hn = ["placeholder", "data-is-valid"],
  gn = { class: "SignupForm-field" },
  Cn = {
    key: 0,
    class: "SignupForm-label SignupForm-label--error",
    "data-has-error": "true",
  },
  bn = { key: 1, for: "field-email", class: "SignupForm-label" },
  yn = ["placeholder", "data-has-error"],
  kn = { key: 0, class: "SignupForm-field" },
  En = { key: 1, class: "SignupForm-field" },
  Tn = { class: "SignupForm-field", "data-last": "true" },
  Sn = {
    key: 0,
    class: "SignupForm-label SignupForm-label--error",
    "data-has-error": "true",
  },
  Vn = { key: 1, for: "field-company", class: "SignupForm-label" },
  Mn = ["placeholder", "data-has-error"],
  Ln = "https://besupport20250918203824.azurewebsites.net/api/AddContact",
  Rn = {
    __name: "SignupForm",
    props: {
      block: {
        type: Object,
        required: !1,
        default: () => ({
          title: "Get updates",
          message:
            "Join our mailing list for the latest updates from across the BE network about our programs, partners and progress toward net-zero emissions.",
          name_label: "Your Full Name",
          name_placeholder: "Enter your full name",
          email_label: "Your Email",
          email_placeholder: "Enter your email",
          email_error: "Please enter a valid email address",
          company_label: "Company",
          company_placeholder: "Enter your company",
          focus_label: "Your Focus",
          interest_label: "Your Interest",
          success_title: "Thanks for signing up",
          success_message: "An email has been sent to your inbox.",
          error_title: "Something went wrong",
          error_message: "Please try again later.",
          in_progress_title: "Submission in progress",
          in_progress_message: "Please stay on this page until it’s complete.",
          campaign_id: "first",
        }),
      },
    },
    setup(S) {
      const o = be(),
        y = W(() => o.path === "/signup"),
        F = S;
      Le();
      function p(a) {
        return /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(a);
      }
      const d = {
          FORM: "FORM",
          WAIT: "WAIT",
          FAIL: "FAIL",
          SUCCESS: "SUCCESS",
        },
        C = n(""),
        f = n(""),
        g = n(""),
        v = n(""),
        k = n(""),
        b = n(!1),
        D = n(!1),
        V = n(d.FORM),
        L = W(() => p(C.value)),
        N = W(() => !L.value && D.value),
        w = W(() => L.value),
        A = n(""),
        E = W(() => {
          var t;
          const a = [];
          return (
            !L.value && a.push((t = F.block) == null ? void 0 : t.email_error),
            A.value !== "" && a.push(A.value),
            a.join(`
`)
          );
        });
      async function i() {
        var I;
        (A.value = ""), (V.value = d.WAIT);
        const a = f.value.trim().split(" "),
          t = a.slice(0, -1).join(" ") || f.value,
          m = a.length > 1 ? a[a.length - 1] : "",
          _ = ((I = F.block) == null ? void 0 : I.campaign_id) || "first";
        let l = `${Ln}?firstname=${encodeURIComponent(
          t
        )}&lastname=${encodeURIComponent(m)}&email=${encodeURIComponent(
          C.value
        )}&company=${encodeURIComponent(g.value)}&campaign=${encodeURIComponent(
          _
        )}`;
        y.value &&
          k.value &&
          (l += `&interest=${encodeURIComponent(
            k.value
          )}&focus=${encodeURIComponent(v.value)}`);
        try {
          BTEDL.signupStart();
          const H = await fetch(l, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }),
            Y = H,
            U = typeof Y.body == "string" ? JSON.parse(Y.body) : Y;
          if (H.status >= 400)
            throw (
              (BTEDL.signupError(U.message || "Signup failed"),
              (V.value = d.FAIL),
              (A.value = U.message || "Signup failed"),
              new Error(U.message || "Signup failed"))
            );
          BTEDL.signupComplete(), (V.value = d.SUCCESS), (C.value = "");
        } catch (H) {
          (V.value = d.FAIL),
            BTEDL.signupError("An error occurred during signup"),
            (A.value = H instanceof Error ? H.message : "An error occurred"),
            console.error("Newsletter signup error:", H);
        }
      }
      async function M(a) {
        a.preventDefault(),
          V.value !== d.WAIT && ((b.value = !0), w.value && (await i()));
      }
      function Z(a) {
        return a ? a.split(new RegExp("(?<=\\.)\\s+")) : [];
      }
      return (
        ae(() => {}),
        (a, t) => {
          const m = je;
          return (
            u(),
            h(
              "section",
              { class: le(["SignupForm", { showEmailInvalid: r(N) }]) },
              [
                e("div", zo, [
                  Q(
                    e(
                      "div",
                      Go,
                      [
                        e("div", Xo, [
                          e("header", jo, [
                            e("h3", qo, O(S.block.success_title), 1),
                            e("p", Jo, O(S.block.success_message), 1),
                          ]),
                        ]),
                      ],
                      512
                    ),
                    [[fe, r(V) === d.SUCCESS]]
                  ),
                  Q(
                    e(
                      "div",
                      Ko,
                      [
                        e("div", Qo, [
                          e("header", en, [
                            e("h3", tn, O(S.block.error_title), 1),
                            e("p", on, O(S.block.error_message), 1),
                          ]),
                        ]),
                      ],
                      512
                    ),
                    [[fe, r(V) === d.FAIL]]
                  ),
                  Q(
                    e(
                      "div",
                      nn,
                      [
                        e("div", sn, [
                          e("header", an, [
                            e("h3", ln, O(S.block.in_progress_title), 1),
                            e("p", rn, O(S.block.in_progress_message), 1),
                          ]),
                        ]),
                      ],
                      512
                    ),
                    [[fe, r(V) === d.WAIT]]
                  ),
                  Q(
                    e(
                      "div",
                      un,
                      [
                        e("div", cn, [
                          e("header", dn, [
                            e("h3", pn, [
                              (u(!0),
                              h(
                                ee,
                                null,
                                te(
                                  Z(S.block.title),
                                  (_) => (
                                    u(),
                                    h(
                                      "span",
                                      { key: _, class: "SignupForm-titlepart" },
                                      O(_),
                                      1
                                    )
                                  )
                                ),
                                128
                              )),
                            ]),
                            e("p", vn, O(S.block.message), 1),
                          ]),
                        ]),
                        e("div", mn, [
                          e(
                            "form",
                            {
                              class: "SignupForm-form",
                              onSubmit: t[6] || (t[6] = (_) => M(_)),
                            },
                            [
                              e("div", fn, [
                                e("label", _n, O(S.block.name_label), 1),
                                Q(
                                  e(
                                    "input",
                                    {
                                      id: "field-name",
                                      "onUpdate:modelValue":
                                        t[0] ||
                                        (t[0] = (_) =>
                                          me(f) ? (f.value = _) : null),
                                      class: "SignupForm-input",
                                      placeholder: S.block.name_placeholder,
                                      "data-is-valid": r(f).length > 3,
                                    },
                                    null,
                                    8,
                                    hn
                                  ),
                                  [[$e, r(f)]]
                                ),
                              ]),
                              e("div", gn, [
                                r(b) && r(E)
                                  ? (u(), h("label", Cn, O(r(E)), 1))
                                  : (u(),
                                    h("label", bn, O(S.block.email_label), 1)),
                                Q(
                                  e(
                                    "input",
                                    {
                                      id: "field-email",
                                      "onUpdate:modelValue":
                                        t[1] ||
                                        (t[1] = (_) =>
                                          me(C) ? (C.value = _) : null),
                                      class: "SignupForm-input",
                                      placeholder: S.block.email_placeholder,
                                      "data-last": "true",
                                      "data-has-error": !!(r(b) && r(E)),
                                      required: "",
                                    },
                                    null,
                                    8,
                                    yn
                                  ),
                                  [[$e, r(C)]]
                                ),
                              ]),
                              r(y)
                                ? (u(),
                                  h("div", kn, [
                                    t[8] ||
                                      (t[8] = e(
                                        "label",
                                        {
                                          for: "field-focus",
                                          class: "SignupForm-label",
                                        },
                                        " Focus ",
                                        -1
                                      )),
                                    Q(
                                      e(
                                        "select",
                                        {
                                          id: "field-focus",
                                          "onUpdate:modelValue":
                                            t[2] ||
                                            (t[2] = (_) =>
                                              me(v) ? (v.value = _) : null),
                                          class: "SignupForm-select",
                                        },
                                        t[7] ||
                                          (t[7] = [
                                            he(
                                              '<option value="" disabled data-v-069816bf>  Select your focus </option><option value="investing" data-v-069816bf>  Investing </option><option value="innovation" data-v-069816bf>  Innovation </option><option value="research" data-v-069816bf>  Research </option><option value="policy" data-v-069816bf>  Policy </option><option value="media" data-v-069816bf>  Media </option><option value="nonprofit" data-v-069816bf>  Nonprofit </option><option value="advocate" data-v-069816bf>  Advocate </option><option value="student" data-v-069816bf>  Student </option><option value="other" data-v-069816bf>  Other </option>',
                                              10
                                            ),
                                          ]),
                                        512
                                      ),
                                      [[Ue, r(v)]]
                                    ),
                                  ]))
                                : ue("", !0),
                              r(y)
                                ? (u(),
                                  h("div", En, [
                                    t[10] ||
                                      (t[10] = e(
                                        "label",
                                        {
                                          for: "field-interest",
                                          class: "SignupForm-label",
                                        },
                                        " Interest ",
                                        -1
                                      )),
                                    Q(
                                      e(
                                        "select",
                                        {
                                          id: "field-interest",
                                          "onUpdate:modelValue":
                                            t[3] ||
                                            (t[3] = (_) =>
                                              me(k) ? (k.value = _) : null),
                                          class: "SignupForm-select",
                                        },
                                        t[9] ||
                                          (t[9] = [
                                            he(
                                              '<option value="" disabled data-v-069816bf>  Select your interest </option><option value="manufacturing" data-v-069816bf>  Manufacturing </option><option value="electricity" data-v-069816bf>  Electricity </option><option value="agriculture" data-v-069816bf>  Agriculture </option><option value="transportation" data-v-069816bf>  Transportation </option><option value="buildings" data-v-069816bf>  Buildings </option>',
                                              6
                                            ),
                                          ]),
                                        512
                                      ),
                                      [[Ue, r(k)]]
                                    ),
                                  ]))
                                : ue("", !0),
                              e("div", Tn, [
                                r(b) && r(E)
                                  ? (u(), h("label", Sn, O(r(E)), 1))
                                  : (u(),
                                    h(
                                      "label",
                                      Vn,
                                      O(S.block.company_label),
                                      1
                                    )),
                                Q(
                                  e(
                                    "input",
                                    {
                                      id: "field-company",
                                      "onUpdate:modelValue":
                                        t[4] ||
                                        (t[4] = (_) =>
                                          me(g) ? (g.value = _) : null),
                                      class: "SignupForm-input",
                                      placeholder: S.block.company_placeholder,
                                      "data-last": "true",
                                      "data-has-error": !!(r(b) && r(E)),
                                    },
                                    null,
                                    8,
                                    Mn
                                  ),
                                  [[$e, r(g)]]
                                ),
                                e(
                                  "button",
                                  {
                                    id: "field-submit",
                                    class: "SignupForm-btn",
                                    onClick: t[5] || (t[5] = (_) => M(_)),
                                  },
                                  [
                                    t[11] ||
                                      (t[11] = e(
                                        "span",
                                        { class: "sr-only" },
                                        "Submit",
                                        -1
                                      )),
                                    R(
                                      m,
                                      {
                                        class: "SignupForm-inputicon",
                                        role: "presentation",
                                        "data-is-valid": r(L),
                                      },
                                      null,
                                      8,
                                      ["data-is-valid"]
                                    ),
                                  ]
                                ),
                              ]),
                            ],
                            32
                          ),
                        ]),
                      ],
                      512
                    ),
                    [[fe, r(V) === d.FORM]]
                  ),
                ]),
              ],
              2
            )
          );
        }
      );
    },
  },
  wn = oe(Rn, [["__scopeId", "data-v-069816bf"]]),
  An = { class: "SignupFormWrapper" },
  Hn = {
    __name: "SignupFormWrapper",
    setup(S) {
      const o = Le(),
        y = n();
      function F(p) {
        const d = {};
        return (
          Object.entries(p).forEach(([C, f]) => {
            d[C] = f.value;
          }),
          d
        );
      }
      return (
        G(
          () => o.siteConfig,
          (p) => {
            var C, f, g;
            const d =
              ((g =
                (f =
                  (C = p == null ? void 0 : p.elements) == null
                    ? void 0
                    : C.subscribeform) == null
                  ? void 0
                  : f.linkedItems) == null
                ? void 0
                : g[0]) || !1;
            d && d.elements && (y.value = F(d.elements));
          },
          { deep: !0, immediate: !0 }
        ),
        (p, d) => {
  return null;
}
      );
    },
  },
  $n = { class: "lenisscroll-pane" },
  Fn = {
    __name: "default",
    setup(S) {
      const o = Te(),
        y = be();
      Ke();
      const F = Ie(),
        p = Me(),
        d = Qe();
      let C = null;
      const f = n(!1),
        g = !1,
        { isWarningShowing: v, isLoaderVisible: k } = Fe(o),
        { isMobile: b, ww: D, wh: V } = Fe(F),
        L = W(() => b.value && D.value >= V.value),
        N = W(() => {
          const c = D.value / V.value <= 1,
            l = V.value < 550;
          return !b.value && (c || l);
        });
      G([L, N], ([t, m]) => {
        v.value = t || m;
      });
      let w, A;
      G(
        () => o.isLoaderVisible,
        (t) => {
          E();
        }
      );
      function E() {
        const t = d.transitionState === K.ENTER;
        !o.isLoaderVisible && f.value && t && i();
      }
      function i() {
        d.setTransitionState(K.ENTER_AFTER_LOADED),
          (w = setTimeout(() => {
            d.setTransitionState(K.AFTER_ENTER), C == null || C(), (C = null);
          }, $.ENTER_TOTAL * 1e3));
      }
      function M(t, m) {
        Z(t, m);
      }
      function Z(t, m) {
        clearTimeout(w),
          clearTimeout(A),
          (C = m),
          d.setTransitionState(K.ENTER),
          (f.value = !1),
          (t.style.opacity = 1),
          setTimeout(() => {
            (f.value = !0), E();
          }, $.ENTER_TOTAL * 1e3);
      }
      function a(t, m) {
        clearTimeout(w),
          clearTimeout(A),
          d.setTransitionState(K.LEAVE),
          clearTimeout(A),
          (A = setTimeout(() => {
            d.setTransitionState(K.AFTER_LEAVE), m == null || m();
          }, $.LEAVE * 1e3));
      }
      return (
        ae(() => {
          p.initLenis();
        }),
        Ce(() => {
          p.cleanup();
        }),
        (t, m) => {
          const _ = Bo,
            c = Io,
            l = Eo,
            I = Et("RouterView"),
            H = uo,
            Y = Bt,
            U = Nt;
          return (
            u(),
            h(
              "div",
              { class: le(["layout", g]) },
              [
                R(_),
                R(c),
                R(l),
                e("div", $n, [
                  e("main", null, [
                    R(I, null, {
                      default: q(({ Component: X }) => [
                        R(
                          Tt,
                          {
                            appear: "",
                            mode: "out-in",
                            css: !1,
                            onAppear: M,
                            onEnter: Z,
                            onLeave: a,
                          },
                          {
                            default: q(() => [
                              (u(),
                              j(Je(X), { key: r(y).path, class: "page" })),
                            ]),
                            _: 2,
                          },
                          1024
                        ),
                      ]),
                      _: 1,
                    }),
                  ]),
                  R(Hn),
                  R(H),
                  R(Y),
                ]),
                R(U),
                R(Yo),
              ],
              2
            )
          );
        }
      );
    },
  },
  Pn = oe(Fn, [["__scopeId", "data-v-ea5deaed"]]);
export { Pn as default };
