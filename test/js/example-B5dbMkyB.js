var ae = Object.defineProperty;
var ce = (a, o, n) =>
  o in a
    ? ae(a, o, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (a[o] = n);
var w = (a, o, n) => ce(a, typeof o != "symbol" ? o + "" : o, n);
import {
  h as p,
  i as d,
  k as e,
  F,
  s as U,
  l as t,
  ac as re,
  ad as X,
  v as Y,
  j as C,
  ae as de,
  U as ue,
  J,
  af as Q,
  ag as me,
  W as pe,
  L as ee,
  ah as ge,
  _ as ne,
  c as _e,
  r as $,
  u as he,
  C as ve,
  w as we,
  o as fe,
  f as Ce,
  m as ye,
  p as be,
  M as Z,
  ai as ke,
  aj as Ie,
  H as f,
  I as h,
  K as $e,
  ak as Te,
  t as xe,
  al as Me,
  z as Se,
} from "./app-CGoBdrrW.js";
import { _ as Be, a as Pe } from "./ButtonToggle-DHR3sQku.js";
import {
  f as Le,
  d as He,
  _ as De,
  b as Ae,
  a as Ee,
  e as Ne,
  c as ze,
} from "./IconYT-DWaI6GCI.js";
const Ve = { class: "image" },
  Oe = { key: 0 },
  Re = ["type", "media", "srcset", "sizes", "width", "height"],
  We = ["src", "srcset", "width", "height", "alt"],
  je = ["src", "srcset", "sizes", "width", "height", "alt"],
  qe = {
    __name: "TheImage",
    props: {
      sources: { type: Array, default: null },
      srcset: { type: String, default: null },
      src: { type: String, required: !0 },
      sizes: { type: String, required: !0 },
      alt: { type: String, required: !0 },
      width: { type: Number, required: !0 },
      height: { type: Number, required: !0 },
    },
    setup(a) {
      return (o, n) => (
        d(),
        p("div", Ve, [
          a.sources
            ? (d(),
              p("picture", Oe, [
                (d(!0),
                p(
                  F,
                  null,
                  U(
                    a.sources,
                    (i, l) => (
                      d(),
                      p(
                        "source",
                        {
                          key: l,
                          type: i.type,
                          media: i.media,
                          srcset: i.srcset,
                          sizes: a.sizes,
                          width: i.width,
                          height: i.height,
                        },
                        null,
                        8,
                        Re
                      )
                    )
                  ),
                  128
                )),
                e(
                  "img",
                  {
                    src: a.src,
                    srcset: a.srcset,
                    width: a.width,
                    height: a.height,
                    alt: a.alt,
                  },
                  null,
                  8,
                  We
                ),
              ]))
            : (d(),
              p(
                "img",
                {
                  key: 1,
                  src: a.src,
                  srcset: a.srcset,
                  sizes: a.sizes,
                  width: a.width,
                  height: a.height,
                  alt: a.alt,
                },
                null,
                8,
                je
              )),
        ])
      );
    },
  },
  k = (a) => `${a / 16}em`,
  Ze = { class: "example-component" },
  Fe = {
    __name: "ComponentWithImage",
    props: { image: { type: Object, default: null } },
    setup(a) {
      const o = `(min-width: ${k(1520)}) ${k(1240)}, calc(80.75vw + ${k(29)})`;
      return (n, i) => {
        const l = qe;
        return d(), p("div", Ze, [t(l, re(a.image, { sizes: o }), null, 16)]);
      };
    },
  },
  Ue = "mobile",
  Ke = "tablet-portrait",
  Ge = "desktop",
  Xe = {
    sizeDivider: 1.5,
    sizeBufferAmount: 100,
    smallestImageSize: 360,
    supportedImageTypes: [
      { extension: "webp", sourceType: "webp" },
      { extension: "jpg", sourceType: "jpeg" },
      { extension: "png", sourceType: "png" },
    ],
  };
class Ye {
  constructor(o) {
    w(this, "_setSassBreakpoints", () => {
      Object.keys(X).forEach((o) => {
        this.breakpoints.push({ name: o, breakpoint: Number.parseInt(X[o]) });
      });
    });
    w(this, "_getImageExtension", (o) =>
      o.originalSrc.split(".").pop().toLowerCase()
    );
    w(this, "_getImageTypes", (o) => {
      const n = [],
        i = this.config.supportedImageTypes.find(
          (l) => l.extension === this._getImageExtension(o)
        );
      return (
        n.push(
          this.config.supportedImageTypes.find((l) => l.extension === "webp")
        ),
        n.push(i),
        n
      );
    });
    w(
      this,
      "_replaceNamedBreakpoints",
      (o) => (
        o.forEach((n) => {
          const i = this.breakpoints.find((l) => l.name === n.breakpoint);
          i && (n.breakpoint = i.breakpoint);
        }),
        o
      )
    );
    w(this, "_getImageBreakpoint", (o, n) => {
      const i = n.length > 2,
        l = this.breakpoints.find((m) => m.name === Ue),
        c = this.breakpoints.find((m) => m.name === Ke),
        r = this._replaceNamedBreakpoints(n);
      r.sort((m, b) => b.breakpoint - m.breakpoint);
      const u = r[r.length - 1].breakpoint;
      return o.breakpoint === u
        ? k(0)
        : i
        ? k(o.breakpoint)
        : u && u === l.breakpoint
        ? k(c.breakpoint)
        : k(u);
    });
    w(this, "_getMedia", (o, n) =>
      o.length > 1 ? `(width >= ${this._getImageBreakpoint(n, o)})` : null
    );
    w(this, "_addSubsequentImageSizes", (o, n, i, l) => {
      for (; o.width > n.width; ) {
        o = {
          width: Math.round(o.width / this.config.sizeDivider),
          height: Math.round(o.height / this.config.sizeDivider),
        };
        const c =
          n.width === this.config.smallestImageSize
            ? 0
            : this.config.sizeBufferAmount;
        o.width > n.width + c && i[l].push(o);
      }
    });
    w(this, "_getImageSizes", (o) => {
      const n = o.map((c) => ({
        width: c.designWidth,
        height: c.designHeight,
      }));
      n.sort((c, r) => r.width - c.width);
      const i = [];
      let l;
      return (
        n.forEach((c, r, u) => {
          const m = u[r + 1]
            ? u[r + 1]
            : { width: this.config.smallestImageSize };
          (l = c),
            r === 0 && i.push([{ width: l.width * 2, height: l.height * 2 }]),
            i[r] ? i[r].push(l) : i.push([l]),
            this._addSubsequentImageSizes(l, m, i, r);
        }),
        i
      );
    });
    w(this, "_getSrcset", (o, n, i) => {
      const l = this._getImageSizes(o),
        r = o[n].originalSrc.split("/").slice(0, -1).join("/");
      return l[n]
        .map((m) => `${r}/${m.width}x${m.height}.${i} ${m.width}w`)
        .join(", ");
    });
    w(this, "_getSources", (o) => {
      const n = [];
      return (
        o.forEach((i, l, c) => {
          this._getImageTypes(i).forEach((u) => {
            const m = u.sourceType;
            n.push({
              type: `image/${m}`,
              media: this._getMedia(c, i),
              srcset: this._getSrcset(c, l, u.extension),
              width: i.designWidth,
              height: i.designHeight,
            });
          });
        }),
        n
      );
    });
    (this.config = Object.assign({}, Xe, o)),
      (this.breakpoints = []),
      this._setSassBreakpoints();
  }
  getImages(o) {
    const n = o.filter((l) => (l == null ? void 0 : l.originalSrc)),
      i = n.find((l) => l.breakpoint === Ge) || n[0];
    return {
      sources: this._getSources(n),
      src: i.originalSrc,
      width: i.designWidth,
      height: i.designHeight,
      alt: i.alt,
    };
  }
}
const Je = new Ye(),
  Qe = {
    __name: "ComponentWithImageAdapter",
    props: {
      imageDesktop: { type: Object, default: null },
      imageMobile: { type: Object, default: null },
    },
    setup(a) {
      var i, l, c, r;
      const o = a,
        n = Je.getImages([
          {
            breakpoint: "desktop",
            originalSrc: (i = o.imageDesktop) == null ? void 0 : i.filename,
            alt: (l = o.imageDesktop) == null ? void 0 : l.alt,
            designWidth: 1400,
            designHeight: 700,
          },
          {
            breakpoint: "mobile",
            originalSrc: (c = o.imageMobile) == null ? void 0 : c.filename,
            alt: (r = o.imageMobile) == null ? void 0 : r.alt,
            designWidth: 700,
            designHeight: 500,
          },
        ]);
      return (u, m) => {
        const b = Fe;
        return d(), Y(b, { image: C(n) }, null, 8, ["image"]);
      };
    },
  },
  en = {
    viewBox: "0 0 14 17",
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
  };
function nn(a, o) {
  return (
    d(),
    p(
      "svg",
      en,
      o[0] ||
        (o[0] = [
          e(
            "path",
            {
              d: "M6.70595 3.3405H7.87398V6.9785H6.70595M9.91599 3.3405H11.084V6.9785H9.91599M2.91599 0L0 3.0345V13.9655H3.49592V17L6.42007 13.9655H8.74796L14 8.5V0M12.832 7.8965L10.5041 10.319H8.16803L6.12602 12.444V10.319H3.49592V1.2155H12.832V7.8965Z",
            },
            null,
            -1
          ),
        ])
    )
  );
}
const on = { render: nn },
  tn = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 13.01",
    fill: "currentColor",
  };
function sn(a, o) {
  return (
    d(),
    p(
      "svg",
      tn,
      o[0] ||
        (o[0] = [
          e(
            "path",
            {
              class: "cls-1",
              d: "M5,13a9.29,9.29,0,0,0,9.35-9.35c0-.14,0-.28,0-.42A6.63,6.63,0,0,0,16,1.54a6.61,6.61,0,0,1-1.89.52A3.32,3.32,0,0,0,15.56.24a6.87,6.87,0,0,1-2.09.8A3.28,3.28,0,0,0,7.79,3.28,3.08,3.08,0,0,0,7.88,4,9.29,9.29,0,0,1,1.11.6,3.29,3.29,0,0,0,2.13,5,3.09,3.09,0,0,1,.65,4.57v0A3.28,3.28,0,0,0,3.28,7.83,3,3,0,0,1,2.42,8a3.18,3.18,0,0,1-.62-.06,3.27,3.27,0,0,0,3.06,2.28,6.58,6.58,0,0,1-4.08,1.4A5.11,5.11,0,0,1,0,11.52,9.17,9.17,0,0,0,5,13",
            },
            null,
            -1
          ),
        ])
    )
  );
}
const ln = { render: sn },
  an = {
    fill: "none",
    viewBox: "0 0 41 40",
    xmlns: "http://www.w3.org/2000/svg",
  };
function cn(a, o) {
  return (
    d(),
    p(
      "svg",
      an,
      o[0] ||
        (o[0] = [
          e(
            "path",
            {
              d: "m20.2972 2.24311c-5.1333-1.366664-10.33335 0-14.00001 3.66667-3.66667 3.7-5.03334 8.93332-3.7 14.03332 1.26666 4.8333 5.26666 8.7333 10.13331 9.9667 3.3.8333 6.6334.5333 9.6334-.8334.7-.3333 1.4333-.4666 2.1333-.4666 1.2 0 2.3333.4333 3.2 1.3l8.3667 8.3667 2.5666-2.5667-8.3666-8.3667c-1.3667-1.3667-1.7-3.4667-.8334-5.3333 1.3667-3 1.6667-6.3334.8334-9.6334-1.2-4.86662-5.1334-8.83329-9.9667-10.13329zm-3.9 24.49999c-5.9 0-10.70001-4.8-10.70001-10.7s4.80001-10.69999 10.70001-10.69999 10.7 4.79999 10.7 10.69999-4.8 10.7-10.7 10.7z",
              fill: "currentColor",
            },
            null,
            -1
          ),
        ])
    )
  );
}
const rn = { render: cn },
  dn = {
    viewBox: "0 0 58 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  };
function un(a, o) {
  return (
    d(),
    p(
      "svg",
      dn,
      o[0] ||
        (o[0] = [
          e(
            "path",
            {
              d: "M57.977 21.4036V27.217H0.750305V21.4036H57.977ZM0.750305 41.937V47.7503H57.977V41.937H0.750305ZM0.750305 0.816956V6.63029H57.977V0.816956H0.750305Z",
              fill: "currentColor",
            },
            null,
            -1
          ),
        ])
    )
  );
}
const mn = { render: un },
  pn = {
    viewBox: "0 0 15 11",
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
  };
function gn(a, o) {
  return (
    d(),
    p(
      "svg",
      pn,
      o[0] ||
        (o[0] = [
          e(
            "path",
            {
              d: "M11.9996 0.906612C11.1014 0.483996 10.1289 0.177258 9.11589 3.13542e-05C9.10701 -0.000255346 9.09818 0.001427 9.09001 0.00496013C9.08184 0.00849326 9.07454 0.0137914 9.06862 0.0204807C8.94706 0.245422 8.80524 0.538527 8.71069 0.763468C7.63622 0.599874 6.54351 0.599874 5.46904 0.763468C5.37449 0.53171 5.23267 0.245422 5.10436 0.0204807C5.0976 0.0068479 5.07734 3.13542e-05 5.05708 3.13542e-05C4.04407 0.177258 3.07833 0.483996 2.17337 0.906612C2.16661 0.906612 2.15986 0.913429 2.15311 0.920245C0.316171 3.69452 -0.190336 6.39381 0.059541 9.06584C0.059541 9.07947 0.0662944 9.09311 0.0798013 9.09992C1.29542 9.99969 2.46376 10.545 3.6186 10.9063C3.63886 10.9131 3.65912 10.9063 3.66587 10.8926C3.93601 10.5177 4.17913 10.1224 4.38849 9.70658C4.402 9.67932 4.38849 9.65205 4.36148 9.64523C3.97653 9.49527 3.61185 9.31805 3.25391 9.11356C3.2269 9.09992 3.2269 9.05902 3.24716 9.03858C3.32145 8.98404 3.39574 8.9227 3.47002 8.86817C3.48353 8.85453 3.50379 8.85453 3.5173 8.86135C5.84048 9.93152 8.346 9.93152 10.6422 8.86135C10.6557 8.85453 10.6759 8.85453 10.6894 8.86817C10.7637 8.92951 10.838 8.98404 10.9123 9.04539C10.9393 9.06584 10.9393 9.10674 10.9056 9.12037C10.5544 9.33168 10.1829 9.50209 9.79799 9.65205C9.77098 9.65887 9.76422 9.69295 9.77098 9.7134C9.98709 10.1292 10.2302 10.5245 10.4936 10.8995C10.5139 10.9063 10.5341 10.9131 10.5544 10.9063C11.716 10.545 12.8843 9.99969 14.0999 9.09992C14.1134 9.09311 14.1202 9.07947 14.1202 9.06584C14.4173 5.97801 13.6272 3.29917 12.0266 0.920245C12.0199 0.913429 12.0131 0.906612 11.9996 0.906612ZM4.73967 7.43672C4.04407 7.43672 3.46327 6.78916 3.46327 5.99165C3.46327 5.19413 4.03056 4.54657 4.73967 4.54657C5.45553 4.54657 6.02282 5.20094 6.01607 5.99165C6.01607 6.78916 5.44878 7.43672 4.73967 7.43672ZM9.44681 7.43672C8.75121 7.43672 8.17041 6.78916 8.17041 5.99165C8.17041 5.19413 8.7377 4.54657 9.44681 4.54657C10.1627 4.54657 10.73 5.20094 10.7232 5.99165C10.7232 6.78916 10.1627 7.43672 9.44681 7.43672Z",
            },
            null,
            -1
          ),
        ])
    )
  );
}
const _n = { render: gn },
  hn = {
    fill: "none",
    viewBox: "0 0 41 40",
    xmlns: "http://www.w3.org/2000/svg",
  };
function vn(a, o) {
  return (
    d(),
    p(
      "svg",
      hn,
      o[0] ||
        (o[0] = [
          e(
            "path",
            {
              d: "m15.6972 26.1168c-.6333.6333-1.7667.6333-2.4 0-1.9333-1.9334-5.79999-5.8-6.79999-6.8l-2.56667 2.5666 10.56666 10.5334 22.3-22.2667-2.5667-2.56666z",
              fill: "currentColor",
            },
            null,
            -1
          ),
        ])
    )
  );
}
const wn = { render: vn },
  fn = {
    viewBox: "0 0 24 18",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  };
function Cn(a, o) {
  return (
    d(),
    p(
      "svg",
      fn,
      o[0] ||
        (o[0] = [
          e(
            "path",
            {
              d: "M8.48718 12.6003C10.0168 12.6003 10.7861 11.6521 11.0276 10.4535L10.2046 10.3104C10.0257 11.2585 9.39063 11.8579 8.48718 11.8579C7.19013 11.8579 6.51925 10.7308 6.51925 9.24588C6.51925 7.70732 7.22591 6.66968 8.46929 6.66968C9.45325 6.66968 10.0347 7.30479 10.1599 8.26192L11.0276 8.17247C10.8666 6.85753 10.0615 5.94513 8.51401 5.94513C6.62659 5.94513 5.62473 7.30479 5.62473 9.25483C5.62473 11.0975 6.51925 12.6003 8.48718 12.6003ZM14.7876 12.6003C16.3172 12.6003 17.0865 11.6521 17.328 10.4535L16.505 10.3104C16.3261 11.2585 15.691 11.8579 14.7876 11.8579C13.4905 11.8579 12.8196 10.7308 12.8196 9.24588C12.8196 7.70732 13.5263 6.66968 14.7697 6.66968C15.7536 6.66968 16.3351 7.30479 16.4603 8.26192L17.328 8.17247C17.167 6.85753 16.3619 5.94513 14.8144 5.94513C12.927 5.94513 11.9251 7.30479 11.9251 9.25483C11.9251 11.0975 12.8196 12.6003 14.7876 12.6003Z",
              fill: "currentColor",
            },
            null,
            -1
          ),
          e(
            "rect",
            {
              x: "0.682617",
              y: "1.41504",
              width: "21.834",
              height: "15.6375",
              stroke: "currentColor",
            },
            null,
            -1
          ),
        ])
    )
  );
}
const yn = { render: Cn },
  bn = { class: "icons-container" },
  kn = { class: "icons-grid" },
  In = { class: "icon-item" },
  $n = { class: "icon-item" },
  Tn = { class: "icon-item" },
  xn = { class: "icon-item" },
  Mn = { class: "icon-item" },
  Sn = { class: "icon-item" },
  Bn = { class: "icon-item" },
  Pn = { class: "icon-item" },
  Ln = { class: "icon-item" },
  Hn = { class: "icon-item" },
  Dn = { class: "icon-item" },
  An = { class: "icon-item" },
  En = { class: "icon-item" },
  Nn = { class: "icon-item" },
  zn = { class: "icon-item" },
  Vn = { class: "icon-item" },
  On = { class: "icon-item" },
  Rn = { class: "icon-item" },
  Wn = { class: "icon-item" },
  jn = { class: "icon-item" },
  qn = { class: "icon-item" },
  Zn = de({
    __name: "IconsDemo",
    setup(a) {
      return (o, n) => {
        const i = ue,
          l = yn,
          c = wn,
          r = J,
          u = _n,
          m = Q,
          b = Le,
          D = me,
          P = He,
          L = pe,
          A = mn,
          E = De,
          N = ee,
          T = ge,
          z = rn,
          H = Ae,
          x = Ee,
          V = ln,
          O = on,
          R = Ne,
          M = ze;
        return (
          d(),
          p("div", bn, [
            n[21] || (n[21] = e("h1", null, "Icon Gallery", -1)),
            e("div", kn, [
              e("div", In, [
                t(i, { class: "icon" }),
                n[0] ||
                  (n[0] = e("div", { class: "icon-name" }, "IconArrow", -1)),
              ]),
              e("div", $n, [
                t(l, { class: "icon" }),
                n[1] || (n[1] = e("div", { class: "icon-name" }, "IconCC", -1)),
              ]),
              e("div", Tn, [
                t(c, { class: "icon" }),
                n[2] ||
                  (n[2] = e("div", { class: "icon-name" }, "IconCheck", -1)),
              ]),
              e("div", xn, [
                t(r, { class: "icon" }),
                n[3] ||
                  (n[3] = e("div", { class: "icon-name" }, "IconClose", -1)),
              ]),
              e("div", Mn, [
                t(u, { class: "icon" }),
                n[4] ||
                  (n[4] = e("div", { class: "icon-name" }, "IconDiscord", -1)),
              ]),
              e("div", Sn, [
                t(m, { class: "icon" }),
                n[5] ||
                  (n[5] = e("div", { class: "icon-name" }, "IconDownload", -1)),
              ]),
              e("div", Bn, [
                t(b, { class: "icon" }),
                n[6] || (n[6] = e("div", { class: "icon-name" }, "IconFB", -1)),
              ]),
              e("div", Pn, [
                t(D, { class: "icon" }),
                n[7] ||
                  (n[7] = e("div", { class: "icon-name" }, "IconLink", -1)),
              ]),
              e("div", Ln, [
                t(P, { class: "icon" }),
                n[8] ||
                  (n[8] = e("div", { class: "icon-name" }, "IconLinkedIn", -1)),
              ]),
              e("div", Hn, [
                t(L, { class: "icon" }),
                n[9] ||
                  (n[9] = e("div", { class: "icon-name" }, "IconLogoBT", -1)),
              ]),
              e("div", Dn, [
                t(A, { class: "icon" }),
                n[10] ||
                  (n[10] = e("div", { class: "icon-name" }, "IconMenu", -1)),
              ]),
              e("div", An, [
                t(E, { class: "icon" }),
                n[11] ||
                  (n[11] = e("div", { class: "icon-name" }, "IconPause", -1)),
              ]),
              e("div", En, [
                t(N, { class: "icon" }),
                n[12] ||
                  (n[12] = e("div", { class: "icon-name" }, "IconPlay", -1)),
              ]),
              e("div", Nn, [
                t(T, { class: "icon" }),
                n[13] ||
                  (n[13] = e("div", { class: "icon-name" }, "IconPlus", -1)),
              ]),
              e("div", zn, [
                t(z, { class: "icon" }),
                n[14] ||
                  (n[14] = e("div", { class: "icon-name" }, "IconSearch", -1)),
              ]),
              e("div", Vn, [
                t(H, { class: "icon" }),
                n[15] ||
                  (n[15] = e(
                    "div",
                    { class: "icon-name" },
                    "IconSoundOff",
                    -1
                  )),
              ]),
              e("div", On, [
                t(x, { class: "icon" }),
                n[16] ||
                  (n[16] = e("div", { class: "icon-name" }, "IconSoundOn", -1)),
              ]),
              e("div", Rn, [
                t(V, { class: "icon" }),
                n[17] ||
                  (n[17] = e("div", { class: "icon-name" }, "IconTW", -1)),
              ]),
              e("div", Wn, [
                t(O, { class: "icon" }),
                n[18] ||
                  (n[18] = e("div", { class: "icon-name" }, "IconTwitch", -1)),
              ]),
              e("div", jn, [
                t(R, { class: "icon" }),
                n[19] ||
                  (n[19] = e("div", { class: "icon-name" }, "IconX", -1)),
              ]),
              e("div", qn, [
                t(M, { class: "icon" }),
                n[20] ||
                  (n[20] = e("div", { class: "icon-name" }, "IconYT", -1)),
              ]),
            ]),
          ])
        );
      };
    },
  }),
  Fn = ne(Zn, [["__scopeId", "data-v-c0a5a511"]]),
  Un = ["data-nav-color"],
  Kn = { class: "row" },
  Gn = { class: "row" },
  Xn = { class: "row" },
  Yn = { class: "row" },
  Jn = { class: "row" },
  Qn = { class: "row" },
  eo = { class: "row" },
  no = { class: "row" },
  oo = { class: "row" },
  to = { class: "row" },
  so = { class: "rive-container" },
  io = {
    __name: "example",
    setup(a) {
      const { data: o, error: n, isLoading: i } = _e("home"),
        l = $(null),
        c = $(),
        r = he(),
        u = ve(),
        m = {
          filename: "https://placehold.co/1400x700.jpg",
          alt: "Image alt text",
        },
        b = {
          filename: "https://placehold.co/800x400.jpg",
          alt: "Image alt text",
        },
        D = { src: "/rive/file.riv", artboard: "Main", animation: "Main" },
        P = $("P"),
        L = $("Perspective"),
        A = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
      function E(g) {
        const s = [
            "ba",
            "be",
            "bi",
            "bo",
            "bu",
            "da",
            "de",
            "di",
            "do",
            "du",
            "ma",
            "me",
            "mi",
            "mo",
            "mu",
          ],
          S = Math.floor(Math.random() * 3) + 2,
          I =
            g +
            Array(S)
              .fill()
              .map(() => s[Math.floor(Math.random() * s.length)])
              .join("");
        return I.charAt(0).toUpperCase() + I.slice(1).toLowerCase();
      }
      function N(g) {
        (P.value = g), (L.value = E(g));
      }
      async function T() {
        var g;
        if (((c.value = !1), !!o.value)) {
          if (!((g = o.value.system) != null && g.type)) {
            c.value = "Invalid page data structure";
            return;
          }
          (l.value = o.value.elements),
            l.value,
            l.value,
            (r.pageType = o.value.system.type);
        }
      }
      function z() {}
      const H = $("left"),
        x = $("watch"),
        V = ["left", "right", "right-compact"];
      function O(g) {
        `${g}`, (x.value = g), (H.value = g);
      }
      function R() {
        return [
          { name: "Manufacturing", codename: "manufacturing" },
          { name: "Electricity", codename: "electricity" },
          { name: "Agriculture", codename: "agriculture" },
          { name: "Transportation", codename: "transportation" },
          { name: "Buildings", codename: "buildings" },
        ];
      }
      function M() {
        return {
          theme: {
            name: "theme",
            type: "multiple_choice",
            value: [{ name: "yellow", codename: "yellow" }],
          },
          overlay: {
            name: "overlaytheme",
            type: "multiple_choice",
            value: [{ name: "yellow", codename: "yellow" }],
          },
          general: {
            name: "theme",
            type: "multiple_choice",
            value: [{ name: "beige", codename: "beige" }],
          },
        };
      }
      async function oe() {
        try {
          await new Promise((g, s) => {
            const S = Se(
              () => i.value,
              (I) => {
                I || (S(), g());
              },
              { immediate: !0 }
            );
          }),
            o.value && (await T());
        } catch (g) {
          console.error("Error in onServerPrefetch:", g);
        }
      }
      return (
        we(() => {
          o.value && !i.value && T(),
            n.value &&
              ((c.value = "Error loading page"),
              console.error("Error loading page:", n.value));
        }),
        fe(async () => {
          o.value, o.value && !i.value && T();
        }),
        Ce(async () => {
          await oe();
        }),
        (g, s) => {
          var G;
          const S = be,
            I = Be,
            y = ke,
            W = Ie,
            te = Pe,
            j = J,
            v = $e,
            q = Q,
            B = ee,
            K = Te,
            se = Qe,
            ie = Me;
          return l.value
            ? (d(),
              p(
                "div",
                {
                  key: 0,
                  class: "example theme--warm-grey",
                  "data-nav-color": C(r).getNavColorValue("warm-grey"),
                },
                [
                  t(
                    S,
                    {
                      block: {
                        _type: "sectionHeader",
                        vueType: "SectionHeader",
                        title: "Example Components Page",
                        intro:
                          "This is an example of the SectionHeader component. This comes in 3 variations: left, right, and right-compact. Right-compact is used on the generic page type to better align with RichText in the right column.",
                        theme: {
                          name: "theme",
                          type: "multiple_choice",
                          value: [{ name: "cream", codename: "cream" }],
                        },
                        blockIndex: 0,
                        cascadeColor: "white",
                        leadAlignment: H.value,
                      },
                    },
                    null,
                    8,
                    ["block"]
                  ),
                  e("div", Kn, [
                    t(
                      I,
                      {
                        activeTab: x.value,
                        "onUpdate:activeTab": [
                          s[0] || (s[0] = (_) => (x.value = _)),
                          O,
                        ],
                        tabs: V,
                        variant: "relative",
                      },
                      null,
                      8,
                      ["activeTab"]
                    ),
                  ]),
                  s[20] ||
                    (s[20] = e(
                      "div",
                      { class: "row" },
                      [
                        e("div", { class: "RichText" }, [
                          e("h2", { class: "type-h2" }, "Portfolio modals"),
                          e(
                            "p",
                            { class: "type-body--lg" },
                            "This uses the regular modal component, but instead of rendering a slot it renders a slug and a filter "
                          ),
                        ]),
                      ],
                      -1
                    )),
                  e("div", Gn, [
                    (d(!0),
                    p(
                      F,
                      null,
                      U(
                        R(),
                        (_) => (
                          d(),
                          p("div", { key: _.codename }, [
                            t(
                              y,
                              {
                                label: _.name,
                                theme: "yellow",
                                onClick: (le) =>
                                  C(u).setModalState(C(Z).CONTENT + _.codename),
                              },
                              null,
                              8,
                              ["label", "onClick"]
                            ),
                            t(
                              W,
                              {
                                uniqueId: _.codename,
                                slug: "portfolio",
                                filter: _.codename,
                                theme: M().theme,
                                "overlay-theme": M().overlay,
                              },
                              null,
                              8,
                              ["uniqueId", "filter", "theme", "overlay-theme"]
                            ),
                          ])
                        )
                      ),
                      128
                    )),
                  ]),
                  s[21] ||
                    (s[21] = e(
                      "div",
                      { class: "row" },
                      [
                        e("div", { class: "RichText" }, [
                          e(
                            "h2",
                            { class: "type-h2" },
                            "Generic content page modals"
                          ),
                          e("p", { class: "type-body--lg" }, [
                            f(
                              "This uses the regular modal component, but instead of rendering a slot it renders a slug. "
                            ),
                            e("br"),
                            f(
                              "Note: this will work for generic content pages, but other pages don't currently have the modifications needed to render in a modal"
                            ),
                          ]),
                        ]),
                      ],
                      -1
                    )),
                  e("div", Xn, [
                    e("div", null, [
                      t(y, {
                        label: "Privacy",
                        onClick:
                          s[1] ||
                          (s[1] = (_) =>
                            C(u).setModalState(C(Z).CONTENT + "privacy")),
                      }),
                      t(
                        W,
                        {
                          uniqueId: "privacy",
                          slug: "privacy-policy",
                          theme: M().general,
                        },
                        null,
                        8,
                        ["theme"]
                      ),
                    ]),
                  ]),
                  s[22] ||
                    (s[22] = e(
                      "div",
                      { class: "row" },
                      [
                        e("div", { class: "RichText" }, [
                          e("h2", { class: "type-h2" }, "Regular modals"),
                          e(
                            "p",
                            { class: "type-body--lg" },
                            "This uses the regular modal component, but instead of rendering a slot it renders a slug "
                          ),
                        ]),
                      ],
                      -1
                    )),
                  e("div", Yn, [
                    e("div", null, [
                      t(y, {
                        label: "Render Content",
                        onClick:
                          s[2] ||
                          (s[2] = (_) =>
                            C(u).setModalState(C(Z).CONTENT + "test")),
                      }),
                      t(
                        W,
                        { uniqueId: "test" },
                        {
                          default: h(
                            () =>
                              s[18] || (s[18] = [f(" Any modal content here ")])
                          ),
                          _: 1,
                          __: [18],
                        }
                      ),
                    ]),
                  ]),
                  t(
                    te,
                    {
                      "show-grid": !0,
                      block: {
                        title: { value: L.value },
                        theme: (G = l.value) == null ? void 0 : G.theme,
                      },
                    },
                    null,
                    8,
                    ["block"]
                  ),
                  e("div", Jn, [
                    (d(!0),
                    p(
                      F,
                      null,
                      U(
                        C(A),
                        (_) => (
                          d(),
                          Y(
                            y,
                            {
                              key: _,
                              label: _,
                              theme: P.value === _ ? "yellow" : "transparent",
                              onClick: (le) => N(_),
                            },
                            null,
                            8,
                            ["label", "theme", "onClick"]
                          )
                        )
                      ),
                      128
                    )),
                  ]),
                  t(Fn),
                  e("div", Qn, [
                    t(y, {
                      label: "Click Me",
                      theme: "black",
                      onClick:
                        s[3] || (s[3] = () => console.log("Button clicked")),
                    }),
                    t(y, {
                      label: "Click Me",
                      theme: "white",
                      onClick:
                        s[4] || (s[4] = () => console.log("Button clicked")),
                    }),
                    t(y, {
                      label: "Click Me",
                      theme: "yellow",
                      onClick:
                        s[5] || (s[5] = () => console.log("Button clicked")),
                    }),
                    t(y, {
                      label: "Click Me",
                      theme: "transparent",
                      onClick:
                        s[6] || (s[6] = () => console.log("Button clicked")),
                    }),
                  ]),
                  e("div", eo, [
                    t(
                      v,
                      {
                        label: "Close",
                        theme: "black",
                        onClick:
                          s[7] ||
                          (s[7] = () =>
                            console.log("Close button (black) clicked")),
                      },
                      { default: h(() => [t(j)]), _: 1 }
                    ),
                    t(
                      v,
                      {
                        label: "Download",
                        theme: "black",
                        onClick:
                          s[8] ||
                          (s[8] = () =>
                            console.log("Download button (black) clicked")),
                      },
                      { default: h(() => [t(q)]), _: 1 }
                    ),
                    t(
                      v,
                      {
                        label: "Play",
                        theme: "black",
                        onClick:
                          s[9] ||
                          (s[9] = () =>
                            console.log("Play button (black) clicked")),
                      },
                      { default: h(() => [t(B)]), _: 1 }
                    ),
                    t(
                      v,
                      {
                        label: "Close",
                        theme: "yellow",
                        onClick:
                          s[10] ||
                          (s[10] = () =>
                            console.log("Close button (yellow) clicked")),
                      },
                      { default: h(() => [t(j)]), _: 1 }
                    ),
                    t(
                      v,
                      {
                        label: "Download",
                        theme: "yellow",
                        onClick:
                          s[11] ||
                          (s[11] = () =>
                            console.log("Download button (yellow) clicked")),
                      },
                      { default: h(() => [t(q)]), _: 1 }
                    ),
                    t(
                      v,
                      {
                        label: "Play",
                        theme: "yellow",
                        onClick:
                          s[12] ||
                          (s[12] = () =>
                            console.log("Play button (yellow) clicked")),
                      },
                      { default: h(() => [t(B)]), _: 1 }
                    ),
                    t(
                      v,
                      {
                        label: "Play",
                        theme: "white-alt",
                        onClick:
                          s[13] ||
                          (s[13] = () =>
                            console.log("Play button (yellow) clicked")),
                      },
                      { default: h(() => [t(B)]), _: 1 }
                    ),
                  ]),
                  e("div", no, [
                    t(
                      v,
                      {
                        label: "Close",
                        theme: "yellow",
                        variant: "large",
                        onClick:
                          s[14] ||
                          (s[14] = () =>
                            console.log("Close button (yellow) clicked")),
                      },
                      { default: h(() => [t(j)]), _: 1 }
                    ),
                    t(
                      v,
                      {
                        label: "Download",
                        theme: "yellow",
                        variant: "large",
                        onClick:
                          s[15] ||
                          (s[15] = () =>
                            console.log("Download button (yellow) clicked")),
                      },
                      { default: h(() => [t(q)]), _: 1 }
                    ),
                    t(
                      v,
                      {
                        label: "Play",
                        theme: "yellow",
                        variant: "large",
                        onClick:
                          s[16] ||
                          (s[16] = () =>
                            console.log("Play button (yellow) clicked")),
                      },
                      { default: h(() => [t(B)]), _: 1 }
                    ),
                    t(
                      v,
                      {
                        label: "Play",
                        theme: "white-alt",
                        variant: "large",
                        onClick:
                          s[17] ||
                          (s[17] = () =>
                            console.log("Play button (yellow) clicked")),
                      },
                      { default: h(() => [t(B)]), _: 1 }
                    ),
                  ]),
                  e("div", oo, [
                    t(K, { label: "Liquid Fuels", variant: "default" }),
                    t(K, { label: "Liquid Fuels", variant: "compact" }),
                  ]),
                  e("div", to, [
                    s[19] ||
                      (s[19] = e(
                        "h2",
                        { class: "type-h2" },
                        "Homepage data",
                        -1
                      )),
                    e("code", null, xe(l.value), 1),
                  ]),
                  s[23] ||
                    (s[23] = e(
                      "div",
                      { class: "row" },
                      [
                        e("div", { class: "lines" }, [
                          f(" This is line one "),
                          e("br"),
                          f(" this is "),
                          e("i", null, "line two"),
                          f(),
                          e("br"),
                          f(" this is "),
                          e("b", null, "line three "),
                          f(),
                          e("br"),
                          f(" this is "),
                          e(
                            "a",
                            { href: "https://www.google.com/" },
                            "line four"
                          ),
                        ]),
                      ],
                      -1
                    )),
                  s[24] ||
                    (s[24] = e(
                      "h2",
                      null,
                      "This is an example responsive image",
                      -1
                    )),
                  t(se, { "image-desktop": m, "image-mobile": b }),
                  e("div", so, [
                    t(ie, {
                      "src-all": D,
                      "log-instance": !0,
                      autoplay: !0,
                      onLoad: z,
                    }),
                  ]),
                ],
                8,
                Un
              ))
            : ye("", !0);
        }
      );
    },
  },
  uo = ne(io, [["__scopeId", "data-v-f765fa93"]]);
export { uo as default };
