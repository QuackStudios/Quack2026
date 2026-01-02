import { a as O, _ as A } from "./ButtonToggle-DHR3sQku.js";
import {
  _ as V,
  u as x,
  h as d,
  i as t,
  k as u,
  m as h,
  t as g,
  H as C,
  v as k,
  j as y,
  af as H,
  ag as z,
  C as F,
  r as $,
  l as T,
  I as K,
  L as G,
  K as J,
  M as Q,
  F as X,
  s as Y,
  n as B,
  P as Z,
  a as ee,
  b as te,
  c as se,
  d as ae,
  e as b,
  w as ne,
  z as W,
  o as oe,
  f as le,
  g as ce,
} from "./app-CGoBdrrW.js";
const re = ["href", "target", "data-index"],
  ie = { class: "ResourceItemRead-container" },
  ue = { class: "ResourceItemRead-info" },
  de = { key: 0, class: "ResourceItemRead-topic" },
  me = { class: "ResourceItemRead-content" },
  ve = { class: "ResourceItemRead-title type-h6" },
  _e = { key: 0 },
  pe = { key: 1, class: "ResourceItemWatch-subtitle" },
  he = { class: "ResourceItemRead-iconwrap" },
  ye = { class: "sr-only" },
  fe = {
    __name: "ResourceItemRead",
    props: {
      item: { type: Object, required: !0 },
      index: { type: Number, required: !0 },
    },
    setup(o) {
      const p = o,
        l = x(),
        v = (() => {
          var c;
          const s = { type: "link", url: "#", label: "View" },
            m = l.getAssetURL(p.item.elements.download);
          return (
            m
              ? ((s.type = "download"), (s.url = m), (s.label = "Download"))
              : (c = p.item.elements.link) != null &&
                c.value &&
                ((s.type = "link"),
                (s.url = p.item.elements.link.value),
                (s.label = "View Online")),
            s
          );
        })(),
        e = () => {
          const s = p.item.system.name;
          if (s.includes(":")) {
            const m = s.split(":");
            return {
              firstPart: m[0].trim(),
              secondPart: m.slice(1).join(":").trim(),
            };
          }
          return { firstPart: s, secondPart: null };
        };
      return (s, m) => {
        var a, _;
        const c = H,
          r = z;
        return (
          t(),
          d(
            "a",
            {
              href: y(v).url,
              class: "ResourceItemRead",
              target: y(v).type === "link" ? "_blank" : "_self",
              rel: "noopener noreferrer",
              "data-index": o.index,
            },
            [
              u("div", ie, [
                u("div", ue, [
                  ((_ =
                    (a = o.item.elements.topic) == null ? void 0 : a.value) ==
                  null
                    ? void 0
                    : _.length) > 0
                    ? (t(),
                      d("span", de, g(o.item.elements.topic.value[0].name), 1))
                    : h("", !0),
                  u("div", me, [
                    u("h3", ve, [
                      C(g(e().firstPart), 1),
                      e().secondPart ? (t(), d("span", _e, ":")) : h("", !0),
                      e().secondPart
                        ? (t(), d("span", pe, g(e().secondPart), 1))
                        : h("", !0),
                    ]),
                    u("div", he, [
                      y(v).type === "download"
                        ? (t(),
                          k(c, { key: 0, class: "ResourceItemRead-icon" }))
                        : (t(),
                          k(r, { key: 1, class: "ResourceItemRead-icon" })),
                      u("span", ye, g(y(v).label), 1),
                    ]),
                  ]),
                ]),
              ]),
            ],
            8,
            re
          )
        );
      };
    },
  },
  ge = V(fe, [["__scopeId", "data-v-f11acfd1"]]),
  Re = ["data-index"],
  Ie = { class: "ResourceItemWatch-container" },
  ke = { class: "ResourceItemWatch-info" },
  we = { class: "ResourceItemWatch-thumbnail" },
  be = ["src", "alt"],
  $e = { class: "ResourceItemWatch-content" },
  Pe = { class: "ResourceItemWatch-title type-h6" },
  Se = { key: 0 },
  Ve = { key: 1, class: "ResourceItemWatch-subtitle" },
  xe = { key: 0, class: "ResourceItemWatch-duration type-body--boldsm" },
  Le = {
    __name: "ResourceItemWatch",
    props: {
      item: { type: Object, required: !0 },
      index: { type: Number, required: !0 },
    },
    emits: ["playVideo"],
    setup(o, { emit: p }) {
      const l = o,
        R = F(),
        v = x(),
        e = $(!1);
      function s() {
        let r = v.getVideoSources(l.item.elements.video);
        l.item.elements.cloudinary_url &&
          l.item.elements.cloudinary_url.value &&
          (r = [
            {
              src: v.prefixedVideoURL(l.item.elements.cloudinary_url.value),
              type: "video/mp4",
            },
          ]),
          R.setVideoModalData({ sources: r, timeOffset: 0 }),
          R.setModalState(Q.VIDEO);
      }
      function m() {
        var a;
        const r = v.getAssetURL(
          (a = l.item.elements) == null ? void 0 : a.thumbnail
        );
        return r || "https://placehold.co/600x338";
      }
      function c() {
        const r = l.item.system.name;
        if (r.includes(":")) {
          const a = r.split(":");
          return {
            firstPart: a[0].trim(),
            secondPart: a.slice(1).join(":").trim(),
          };
        }
        return { firstPart: r, secondPart: null };
      }
      return (r, a) => {
        var I;
        const _ = G,
          P = J;
        return (
          t(),
          d(
            "button",
            {
              class: "ResourceItemWatch",
              "data-index": o.index,
              onClick: s,
              onMouseenter: a[0] || (a[0] = (w) => (e.value = !0)),
              onMouseleave: a[1] || (a[1] = (w) => (e.value = !1)),
            },
            [
              u("div", Ie, [
                u("div", ke, [
                  u("div", we, [
                    T(
                      P,
                      {
                        label: "Play",
                        theme: "white-alt",
                        variant: "large",
                        class: "ResourceItemWatch-playicon",
                        "not-button": !0,
                        "manual-hover": y(e),
                      },
                      { default: K(() => [T(_)]), _: 1 },
                      8,
                      ["manual-hover"]
                    ),
                    u(
                      "img",
                      {
                        src: m(),
                        alt: `${o.item.system.name} thumbnail`,
                        class: "ResourceItemWatch-img",
                      },
                      null,
                      8,
                      be
                    ),
                  ]),
                  u("div", $e, [
                    u("h3", Pe, [
                      C(g(c().firstPart), 1),
                      c().secondPart ? (t(), d("span", Se, ":")) : h("", !0),
                      c().secondPart
                        ? (t(), d("span", Ve, g(c().secondPart), 1))
                        : h("", !0),
                    ]),
                    (I = o.item.elements.video_length) != null && I.value
                      ? (t(),
                        d("span", xe, g(o.item.elements.video_length.value), 1))
                      : h("", !0),
                  ]),
                ]),
              ]),
            ],
            40,
            Re
          )
        );
      };
    },
  },
  Te = V(Le, [["__scopeId", "data-v-8434a3f2"]]),
  We = ["data-nav-color"],
  Ce = { class: "ResourceList-container" },
  Be = { class: "ResourceList-list" },
  Me = { class: "ResourceList-title sr-only" },
  Ne = {
    __name: "ResourceList",
    props: {
      title: { type: String, required: !0 },
      items: { type: Array, required: !0, default: () => [] },
      type: {
        type: String,
        required: !0,
        validator: (o) => ["watch", "read"].includes(o),
      },
      theme: {
        name: "theme",
        type: Object,
        default: () => ({
          name: "theme",
          type: "multiple_choice",
          value: [{ name: "warm-grey", codename: "warm-grey" }],
        }),
      },
    },
    emits: ["playVideo"],
    setup(o, { emit: p }) {
      const l = x(),
        R = p,
        v = (e) => {
          R("playVideo", e);
        };
      return (e, s) => {
        const m = Te,
          c = ge;
        return (
          t(),
          d(
            "section",
            {
              class: B([
                "ResourceList",
                `theme--${y(l).getThemeValue(o.theme)}`,
              ]),
              "data-nav-color": y(l).getNavColorValue(
                y(l).getThemeValue(o.theme)
              ),
            },
            [
              u("div", Ce, [
                u("div", Be, [
                  u("h2", Me, g(o.title), 1),
                  (t(!0),
                  d(
                    X,
                    null,
                    Y(
                      o.items,
                      (r, a) => (
                        t(),
                        d(
                          "div",
                          { key: r.system.id, class: "ResourceList-item" },
                          [
                            o.type === "watch"
                              ? (t(),
                                k(
                                  m,
                                  { key: 0, item: r, onPlayVideo: v, index: a },
                                  null,
                                  8,
                                  ["item", "index"]
                                ))
                              : (t(),
                                k(c, { key: 1, index: a, item: r }, null, 8, [
                                  "index",
                                  "item",
                                ])),
                          ]
                        )
                      )
                    ),
                    128
                  )),
                ]),
              ]),
            ],
            10,
            We
          )
        );
      };
    },
  },
  qe = V(Ne, [["__scopeId", "data-v-ca8fa06f"]]),
  De = ["data-nav-color"],
  Ue = { key: 0, class: "perspectives-loading" },
  je = { key: 1, class: "perspectives-error" },
  Ee = { class: "type-oversized" },
  Oe = { key: 2, class: "perspectives-content" },
  Ae = { class: "content-sections" },
  He = {
    __name: "perspectives",
    props: { slug: { type: String, required: !1 } },
    setup(o) {
      const p = o,
        l = x(),
        R = Z(),
        v = $(""),
        e = $(null);
      ee(), te();
      const s = $(),
        m = $(null),
        { data: c, error: r, isLoading: a } = se("perspectives"),
        _ = $("watch");
      ae(
        b(() => ({
          title: v.value || "Perspectives",
          meta: e.value ? l.getMeta(e.value) : [],
          link: l.getMetaLinks(e.value),
        }))
      );
      const P = b(() =>
          !e.value || !e.value.theme
            ? {}
            : { [`theme--${l.getThemeValue(e.value.theme)}`]: !0 }
        ),
        I = b(() => {
          var i, n, f;
          return (
            ((f =
              (n = (i = e.value) == null ? void 0 : i.perspectives_watch) ==
              null
                ? void 0
                : n.linkedItems) == null
              ? void 0
              : f.length) > 0
          );
        }),
        w = b(() => {
          var i, n, f;
          return (
            ((f =
              (n = (i = e.value) == null ? void 0 : i.perspectives_read) == null
                ? void 0
                : n.linkedItems) == null
              ? void 0
              : f.length) > 0
          );
        }),
        M = b(() => I.value && w.value),
        N = b(() => {
          const i = [];
          return I.value && i.push("watch"), w.value && i.push("read"), i;
        });
      async function L() {
        var i, n;
        if (((s.value = !1), !!c.value)) {
          if (!((i = c.value.system) != null && i.type)) {
            s.value = "Invalid page data structure";
            return;
          }
          (e.value = c.value.elements),
            (v.value = (n = e.value.title) == null ? void 0 : n.value),
            (l.pageType = c.value.system.type),
            I.value ? (_.value = "watch") : w.value && (_.value = "read"),
            q();
        }
      }
      function q() {
        !e.value ||
          e.value.theme ||
          (e.value.theme = {
            name: "theme",
            type: "multiple_choice",
            value: [{ name: "warm-grey", codename: "warm-grey" }],
          });
      }
      function D(i) {
        const n = l.getVideoSources(i.elements.video);
        n && n.length > 0
          ? window.open(n[0].src, "_blank")
          : console.error("No video sources available for this item");
      }
      async function U() {
        try {
          await new Promise((i, n) => {
            const f = W(
              () => a.value,
              (S) => {
                S || (f(), i());
              },
              { immediate: !0 }
            );
          }),
            c.value && (await L());
        } catch (i) {
          console.error("Error in onServerPrefetch:", i);
        }
      }
      return (
        ne(() => {
          c.value && !a.value && L(),
            r.value &&
              ((s.value = "Error loading page"),
              console.error("Error loading page:", r.value));
        }),
        W(_, () => {
          R.scrollTo(1, { duration: 0.1 });
        }),
        oe(async () => {
          (m.value = p.slug),
            m.value,
            BTEDL.newPage("perspectives"),
            c.value && !a.value && L();
        }),
        le(async () => {
          (m.value = p.slug), await U();
        }),
        ce(() => {}),
        (i, n) => {
          const f = O,
            S = qe,
            j = A;
          return (
            t(),
            d(
              "div",
              {
                key: p.slug,
                class: B(["perspectives", P.value]),
                "data-nav-color": y(l).getNavColorValue(P.value),
              },
              [
                y(a)
                  ? (t(),
                    d(
                      "div",
                      Ue,
                      n[1] ||
                        (n[1] = [
                          u(
                            "div",
                            { class: "loading-indicator" },
                            "Loading page content...",
                            -1
                          ),
                        ])
                    ))
                  : s.value
                  ? (t(),
                    d("div", je, [
                      u("h1", Ee, g(s.value), 1),
                      n[2] ||
                        (n[2] = u(
                          "p",
                          null,
                          "Sorry, we couldn't load the page you requested.",
                          -1
                        )),
                    ]))
                  : e.value
                  ? (t(),
                    d("div", Oe, [
                      T(f, { block: e.value }, null, 8, ["block"]),
                      u("div", Ae, [
                        I.value && _.value === "watch"
                          ? (t(),
                            k(
                              S,
                              {
                                key: 0,
                                type: "watch",
                                items: e.value.perspectives_watch.linkedItems,
                                title: "Watch",
                                theme: e.value.theme,
                                onPlayVideo: D,
                              },
                              null,
                              8,
                              ["items", "theme"]
                            ))
                          : h("", !0),
                        w.value && _.value === "read"
                          ? (t(),
                            k(
                              S,
                              {
                                key: 1,
                                type: "read",
                                title: "Read",
                                theme: e.value.theme,
                                items: e.value.perspectives_read.linkedItems,
                              },
                              null,
                              8,
                              ["theme", "items"]
                            ))
                          : h("", !0),
                      ]),
                      M.value
                        ? (t(),
                          k(
                            j,
                            {
                              key: 0,
                              activeTab: _.value,
                              "onUpdate:activeTab":
                                n[0] || (n[0] = (E) => (_.value = E)),
                              tabs: N.value,
                            },
                            null,
                            8,
                            ["activeTab", "tabs"]
                          ))
                        : h("", !0),
                    ]))
                  : h("", !0),
              ],
              10,
              De
            )
          );
        }
      );
    },
  },
  Ke = V(He, [["__scopeId", "data-v-4099426e"]]);
export { Ke as default };
