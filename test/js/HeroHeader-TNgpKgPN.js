import {
  _ as he,
  u as ge,
  h as _,
  i as x,
  k,
  F as xe,
  s as Se,
  m as $,
  t as C,
  j as R,
  n as B,
  as as P,
  at as pe,
  ae as _e,
  X as je,
  P as Oe,
  r as I,
  au as Re,
  e as qe,
  ar as He,
  z as Ie,
  D as we,
  G as $e,
  $ as Ce,
  g as Ge,
  N as Le,
  v as Ee,
  a0 as Me,
  q as Ne,
} from "./app-CGoBdrrW.js";
const Pe = ["data-nav-color"],
  Be = { class: "GridList-container" },
  ze = { class: "GridList-header" },
  Ve = { class: "GridList-heading" },
  Ye = { key: 0, class: "GridList-subtitle GridList-subtitle--primary" },
  Ae = { key: 1, class: "GridList-subtitle GridList-subtitle--secondary" },
  Fe = {
    __name: "GridList",
    props: {
      block: {
        type: Object,
        required: !0,
        default: () => ({
          _type: "",
          vueType: "",
          pageTitle: "",
          pageSlug: "",
          blockIndex: 1,
          cascadeColor: "white",
          items: [],
          theme: {
            name: "theme",
            type: "multiple_choice",
            value: [{ name: "white", codename: "white" }],
          },
        }),
      },
    },
    setup(e) {
      const a = ge();
      return (i, o) => (
        x(),
        _(
          "div",
          {
            class: B([
              "GridList",
              `theme--${R(a).getThemeValue(e.block.theme)}`,
            ]),
            "data-nav-color": R(a).getNavColorValue(
              R(a).getThemeValue(e.block.theme)
            ),
          },
          [
            k("div", Be, [
              (x(!0),
              _(
                xe,
                null,
                Se(
                  e.block.items,
                  (l, f) => (
                    x(),
                    _("div", { key: f, class: "GridList-item" }, [
                      k("div", ze, [
                        k("h2", Ve, C(l.heading), 1),
                        l.subtitlePrimary
                          ? (x(), _("p", Ye, C(l.subtitlePrimary), 1))
                          : $("", !0),
                        l.subtitleSecondary
                          ? (x(), _("p", Ae, C(l.subtitleSecondary), 1))
                          : $("", !0),
                      ]),
                    ])
                  )
                ),
                128
              )),
            ]),
          ],
          10,
          Pe
        )
      );
    },
  },
  Tt = he(Fe, [["__scopeId", "data-v-acc1f4da"]]);
var V, ae;
function ye() {
  if (ae) return V;
  ae = 1;
  function e(a) {
    var i = typeof a;
    return a != null && (i == "object" || i == "function");
  }
  return (V = e), V;
}
var Y, re;
function De() {
  if (re) return Y;
  re = 1;
  var e = typeof P == "object" && P && P.Object === Object && P;
  return (Y = e), Y;
}
var A, ne;
function Te() {
  if (ne) return A;
  ne = 1;
  var e = De(),
    a = typeof self == "object" && self && self.Object === Object && self,
    i = e || a || Function("return this")();
  return (A = i), A;
}
var F, ie;
function Ue() {
  if (ie) return F;
  ie = 1;
  var e = Te(),
    a = function () {
      return e.Date.now();
    };
  return (F = a), F;
}
var D, oe;
function We() {
  if (oe) return D;
  oe = 1;
  var e = /\s/;
  function a(i) {
    for (var o = i.length; o-- && e.test(i.charAt(o)); );
    return o;
  }
  return (D = a), D;
}
var U, se;
function Xe() {
  if (se) return U;
  se = 1;
  var e = We(),
    a = /^\s+/;
  function i(o) {
    return o && o.slice(0, e(o) + 1).replace(a, "");
  }
  return (U = i), U;
}
var W, le;
function ke() {
  if (le) return W;
  le = 1;
  var e = Te(),
    a = e.Symbol;
  return (W = a), W;
}
var X, ce;
function Je() {
  if (ce) return X;
  ce = 1;
  var e = ke(),
    a = Object.prototype,
    i = a.hasOwnProperty,
    o = a.toString,
    l = e ? e.toStringTag : void 0;
  function f(m) {
    var c = i.call(m, l),
      v = m[l];
    try {
      m[l] = void 0;
      var n = !0;
    } catch {}
    var u = o.call(m);
    return n && (c ? (m[l] = v) : delete m[l]), u;
  }
  return (X = f), X;
}
var J, ue;
function Ke() {
  if (ue) return J;
  ue = 1;
  var e = Object.prototype,
    a = e.toString;
  function i(o) {
    return a.call(o);
  }
  return (J = i), J;
}
var K, de;
function Qe() {
  if (de) return K;
  de = 1;
  var e = ke(),
    a = Je(),
    i = Ke(),
    o = "[object Null]",
    l = "[object Undefined]",
    f = e ? e.toStringTag : void 0;
  function m(c) {
    return c == null
      ? c === void 0
        ? l
        : o
      : f && f in Object(c)
      ? a(c)
      : i(c);
  }
  return (K = m), K;
}
var Q, fe;
function Ze() {
  if (fe) return Q;
  fe = 1;
  function e(a) {
    return a != null && typeof a == "object";
  }
  return (Q = e), Q;
}
var Z, me;
function et() {
  if (me) return Z;
  me = 1;
  var e = Qe(),
    a = Ze(),
    i = "[object Symbol]";
  function o(l) {
    return typeof l == "symbol" || (a(l) && e(l) == i);
  }
  return (Z = o), Z;
}
var ee, ve;
function tt() {
  if (ve) return ee;
  ve = 1;
  var e = Xe(),
    a = ye(),
    i = et(),
    o = NaN,
    l = /^[-+]0x[0-9a-f]+$/i,
    f = /^0b[01]+$/i,
    m = /^0o[0-7]+$/i,
    c = parseInt;
  function v(n) {
    if (typeof n == "number") return n;
    if (i(n)) return o;
    if (a(n)) {
      var u = typeof n.valueOf == "function" ? n.valueOf() : n;
      n = a(u) ? u + "" : u;
    }
    if (typeof n != "string") return n === 0 ? n : +n;
    n = e(n);
    var g = f.test(n);
    return g || m.test(n) ? c(n.slice(2), g ? 2 : 8) : l.test(n) ? o : +n;
  }
  return (ee = v), ee;
}
var te, be;
function at() {
  if (be) return te;
  be = 1;
  var e = ye(),
    a = Ue(),
    i = tt(),
    o = "Expected a function",
    l = Math.max,
    f = Math.min;
  function m(c, v, n) {
    var u,
      g,
      b,
      S,
      h,
      p,
      q = 0,
      E = !1,
      j = !1,
      G = !0;
    if (typeof c != "function") throw new TypeError(o);
    (v = i(v) || 0),
      e(n) &&
        ((E = !!n.leading),
        (j = "maxWait" in n),
        (b = j ? l(i(n.maxWait) || 0, v) : b),
        (G = "trailing" in n ? !!n.trailing : G));
    function w(s) {
      var y = u,
        H = g;
      return (u = g = void 0), (q = s), (S = c.apply(H, y)), S;
    }
    function z(s) {
      return (q = s), (h = setTimeout(t, v)), E ? w(s) : S;
    }
    function M(s) {
      var y = s - p,
        H = s - q,
        L = v - y;
      return j ? f(L, b - H) : L;
    }
    function N(s) {
      var y = s - p,
        H = s - q;
      return p === void 0 || y >= v || y < 0 || (j && H >= b);
    }
    function t() {
      var s = a();
      if (N(s)) return r(s);
      h = setTimeout(t, M(s));
    }
    function r(s) {
      return (h = void 0), G && u ? w(s) : ((u = g = void 0), S);
    }
    function d() {
      h !== void 0 && clearTimeout(h), (q = 0), (u = p = g = h = void 0);
    }
    function T() {
      return h === void 0 ? S : r(a());
    }
    function O() {
      var s = a(),
        y = N(s);
      if (((u = arguments), (g = this), (p = s), y)) {
        if (h === void 0) return z(p);
        if (j) return clearTimeout(h), (h = setTimeout(t, v)), w(p);
      }
      return h === void 0 && (h = setTimeout(t, v)), S;
    }
    return (O.cancel = d), (O.flush = T), O;
  }
  return (te = m), te;
}
var rt = at();
const nt = pe(rt),
  it = ["data-nav-color", "data-variant"],
  ot = ["data-variant"],
  st = ["data-variant"],
  lt = ["data-variant"],
  ct = ["data-variant"],
  ut = ["data-variant"],
  dt = ["src", "alt"],
  ft = ["data-variant"],
  mt = ["data-theme", "data-variant"],
  vt = ["data-variant", "data-theme"],
  bt = ["data-variant"],
  ht = ["data-variant"],
  gt = _e({
    __name: "HeroHeader",
    props: {
      variant: { type: String, default: "default" },
      block: {
        type: Object,
        required: !0,
        default: () => ({
          _type: "",
          vueType: "",
          pageTitle: "",
          blockIndex: 1,
          cascadeColor: "white",
          theme: {
            name: "theme",
            type: "multiple_choice",
            value: [{ name: "white", codename: "white" }],
          },
        }),
      },
    },
    setup(e) {
      const a = e,
        i = ge(),
        o = je(),
        l = Oe(),
        f = I(null),
        m = I(null),
        c = I(null),
        v = I(null),
        n = I(""),
        u = I(!1),
        g = I(null),
        b = {
          imgYOffset: 0,
          titleYOffset: 0,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          radius: 0,
          intersection: { top: 0, left: 0, right: 0, bottom: 0 },
        },
        { scrollData: S } = Re({ elRef: g });
      function h(t, r) {
        return {
          left: t.left - r.left,
          top: t.top - r.top,
          right: t.right - r.left,
          bottom: t.bottom - r.top,
        };
      }
      function p(t, r) {
        return {
          left: t.left - r.left,
          top: t.top - r.top,
          right: t.right - r.left,
          bottom: t.bottom - r.top,
        };
      }
      function q(t, r) {
        return {
          left: Math.max(t.left, r.left),
          top: Math.max(t.top, r.top),
          right: Math.min(t.right, r.right),
          bottom: Math.min(t.bottom, r.bottom),
        };
      }
      function E(t, r) {
        return {
          left: Math.max(0, t.left - r.left),
          top: Math.max(0, t.top - r.top),
          right: Math.max(0, r.right - t.right),
          bottom: Math.max(0, r.bottom - t.bottom),
        };
      }
      function j() {
        if (!u.value || !c.value) return;
        (f.value.style.translate = "0px"), (c.value.style.translate = "0px");
        const t = f.value.getBoundingClientRect(),
          r = c.value.getBoundingClientRect(),
          d = f.value.parentElement.getBoundingClientRect(),
          T = h(t, d),
          O = p(r, d),
          s = q(T, O),
          y = E(s, O);
        Object.assign(b, y),
          Object.assign(b.intersection, s),
          (b.radius = o.isPhoneBreakpoint ? 0.1 : 0.3),
          w();
      }
      function G() {
        const t = b.intersection;
        let {
          top: r,
          bottom: d,
          left: T,
          right: O,
          radius: s,
          titleYOffset: y,
          imgYOffset: H,
        } = b;
        const L = y - H;
        (r += L),
          (d += L),
          (r = Math.min(0, r)),
          (d = Math.max(0, d)),
          t.right > t.left && t.bottom > t.top
            ? (n.value = `inset(${r}px ${O}px ${d}px ${T}px round ${s}rem)`)
            : (n.value = "inset(0 0 100% 0 round 0.3rem)");
      }
      function w() {
        if (!u.value || !c.value) return;
        const { svh: t } = S,
          { y: r } = S.rect.viewportUnit;
        if (r > 1) return;
        const d = Me.landscape ? 0.2 : 0.15;
        (b.titleYOffset = r * t * d),
          (c.value.style.translate = `0px ${b.titleYOffset}px`),
          (v.value.style.translate = `0px ${b.titleYOffset}px`),
          (b.imgYOffset = 0),
          (f.value.style.translate = `0px ${b.imgYOffset}px`);
        const T = r * t * d * -1;
        (m.value.style.translate = `0px ${T}px`), G();
      }
      function z(t) {
        const r = i.getAssetURL(a.block.heroimage);
        if (r) return r;
        const d = { default: "348x334", right: "438x302", center: "348x334" };
        return `https://placehold.co/${d[t] || d.default}?text=%2A`;
      }
      const M = qe(() => {
          var t;
          return He((t = a.block.title) == null ? void 0 : t.value);
        }),
        N = nt(() => {
          requestAnimationFrame(j);
        }, 150);
      return (
        Ie(() => l.scrollSubPixel, w),
        we(N),
        $e(async () => {
          await Ce(), (u.value = !0), requestAnimationFrame(j);
        }),
        Ge(() => {
          u.value = !1;
        }),
        (t, r) => {
          var T;
          const d = Ne;
          return (
            x(),
            _(
              "header",
              {
                ref_key: "rootRef",
                ref: g,
                class: B([
                  "HeroHeader",
                  `theme--${R(i).getThemeValue(e.block.theme)}`,
                ]),
                "data-nav-color": R(i).getNavColorValue(
                  R(i).getThemeValue(e.block.theme)
                ),
                "data-variant": e.variant,
              },
              [
                k(
                  "div",
                  { class: "HeroHeader-container", "data-variant": e.variant },
                  [
                    k(
                      "div",
                      { class: "HeroHeader-wrap", "data-variant": e.variant },
                      [
                        k(
                          "div",
                          {
                            class: "HeroHeader-maskedcol",
                            "data-variant": e.variant,
                          },
                          [
                            k(
                              "div",
                              {
                                "data-variant": e.variant,
                                class: "HeroHeader-maskedblock",
                              },
                              [
                                k(
                                  "div",
                                  {
                                    ref_key: "imageWrapRef",
                                    ref: f,
                                    class: "HeroHeader-imagewrap",
                                    "data-variant": e.variant,
                                  },
                                  [
                                    k(
                                      "img",
                                      {
                                        ref_key: "imageRef",
                                        ref: m,
                                        src: z(e.variant),
                                        alt:
                                          ((T = e.block.heroimage) == null
                                            ? void 0
                                            : T.alt) || "Hero Image",
                                        class: "HeroHeader-image",
                                      },
                                      null,
                                      8,
                                      dt
                                    ),
                                  ],
                                  8,
                                  ut
                                ),
                                k(
                                  "div",
                                  {
                                    class: "HeroHeader-titlewrap",
                                    "data-variant": e.variant,
                                  },
                                  [
                                    e.block.title
                                      ? (x(),
                                        _(
                                          "h1",
                                          {
                                            key: 0,
                                            ref_key: "titleRef",
                                            ref: c,
                                            class: B([
                                              "HeroHeader-title type-oversized",
                                              e.variant == "right"
                                                ? ""
                                                : M.value,
                                            ]),
                                            "data-theme": R(i).getThemeValue(
                                              e.block.theme
                                            ),
                                            "data-variant": e.variant,
                                          },
                                          C(e.block.title.value),
                                          11,
                                          mt
                                        ))
                                      : $("", !0),
                                    e.block.title
                                      ? (x(),
                                        _(
                                          "h1",
                                          {
                                            key: 1,
                                            ref_key: "maskTitleRef",
                                            ref: v,
                                            class: B([
                                              "HeroHeader-title HeroHeader-titlemask type-oversized",
                                              e.variant == "right"
                                                ? ""
                                                : M.value,
                                            ]),
                                            "data-variant": e.variant,
                                            "data-theme": R(i).getThemeValue(
                                              e.block.theme
                                            ),
                                            style: Le({ clipPath: n.value }),
                                          },
                                          C(e.block.title.value),
                                          15,
                                          vt
                                        ))
                                      : $("", !0),
                                  ],
                                  8,
                                  ft
                                ),
                              ],
                              8,
                              ct
                            ),
                          ],
                          8,
                          lt
                        ),
                        k(
                          "div",
                          {
                            class: "HeroHeader-lead",
                            "data-variant": e.variant,
                          },
                          [
                            e.block.eyebrow
                              ? (x(),
                                _(
                                  "p",
                                  {
                                    key: 0,
                                    "data-variant": e.variant,
                                    class: "HeroHeader-leadtitle type-eyebrow",
                                  },
                                  C(e.block.eyebrow.value),
                                  9,
                                  ht
                                ))
                              : $("", !0),
                            e.block.intro
                              ? (x(),
                                Ee(
                                  d,
                                  {
                                    key: 1,
                                    "data-variant": e.variant,
                                    class: "HeroHeader-leadtext type-h6",
                                    html: e.block.intro.value,
                                  },
                                  null,
                                  8,
                                  ["data-variant", "html"]
                                ))
                              : $("", !0),
                          ],
                          8,
                          bt
                        ),
                      ],
                      8,
                      st
                    ),
                  ],
                  8,
                  ot
                ),
              ],
              10,
              it
            )
          );
        }
      );
    },
  }),
  kt = he(gt, [["__scopeId", "data-v-ba2d3ec3"]]);
export { Tt as _, kt as a };
