import {
  _ as G,
  r as c,
  u as J,
  a as K,
  b as Q,
  c as W,
  d as X,
  e as Y,
  w as Z,
  o as ee,
  f as ae,
  g as te,
  h as l,
  i as n,
  j as i,
  k as s,
  n as A,
  l as f,
  m as F,
  p as oe,
  t as ne,
  q as le,
  F as se,
  s as ue,
  v as re,
  x as ce,
  y as ie,
  z as ve,
  A as $,
} from "./app-CGoBdrrW.js";
const ge = { key: 0, class: "page-loading" },
  de = ["data-nav-color"],
  pe = ["data-nav-color"],
  me = { class: "page-container" },
  _e = { class: "page-grid" },
  he = { key: 0, class: "type-eyebrow page-eyebrow" },
  ye = { class: "page-body" },
  fe = { key: 2, class: "page-content page-content--404 theme--cream" },
  be = { class: "page-container page-container--404" },
  q = {
    __name: "[slug]",
    props: {
      slug: { type: String, required: !0 },
      isModalRoute: { type: Boolean, default: !1 },
      theme: {
        name: "theme",
        type: Object,
        default: () => ({
          name: "theme",
          type: "multiple_choice",
          value: [{ name: "beige", codename: "beige" }],
        }),
      },
    },
    setup(b) {
      const u = b;
      c("page");
      const r = J(),
        d = c(""),
        e = c(null),
        z = K();
      Q();
      const p = c(),
        v = c(null),
        { data: t, error: k, isLoading: g } = W(u.slug);
      u.isModalRoute ||
        X(
          Y(() => ({
            title: d.value || U(),
            meta: e.value ? r.getMeta(e.value) : [],
            link: r.getMetaLinks(e.value),
          }))
        );
      async function m() {
        var a, o;
        if (((p.value = !1), !!t.value)) {
          if (!((a = t.value.system) != null && a.type)) {
            p.value = "Invalid page data structure";
            return;
          }
          (e.value = t.value.elements),
            e.value,
            e.value,
            (d.value = (o = e.value.title) == null ? void 0 : o.value),
            (r.pageType = t.value.system.type);
        }
      }
      Z(() => {
        t.value && !g.value && m(),
          k.value &&
            ((p.value = "Error loading page"),
            console.error("Error loading page:", k.value));
      });
      function U() {
        const a = z.params.slug;
        return a
          ? a
              .split("-")
              .map((o) => o.charAt(0).toUpperCase() + o.slice(1))
              .join(" ")
          : "";
      }
      async function O() {
        try {
          await new Promise((a, o) => {
            const _ = ve(
              () => g.value,
              (h) => {
                h || (_(), a());
              },
              { immediate: !0 }
            );
          }),
            t.value && (await m());
        } catch (a) {
          console.error("Error in onServerPrefetch:", a);
        }
      }
      return (
        ee(async () => {
          (v.value = u.slug),
            v.value,
            BTEDL.newPage(v.value),
            t.value && !g.value && m();
        }),
        ae(async () => {
          (v.value = u.slug), await O();
        }),
        te(() => {}),
        (a, o) => {
          var w, S, C, B, T, x, E, M, N, L, P, R, V, j, D, H, I;
          const _ = oe,
            h = ie;
          return (
            n(),
            l("div", { key: u.slug, class: "page" }, [
              i(g)
                ? (n(),
                  l(
                    "div",
                    ge,
                    o[0] ||
                      (o[0] = [
                        s(
                          "div",
                          { class: "loading-indicator" },
                          "Loading page content...",
                          -1
                        ),
                      ])
                  ))
                : e.value
                ? (n(),
                  l(
                    "div",
                    {
                      key: 1,
                      class: A([
                        "page-content",
                        `theme--${
                          ((C =
                            (S =
                              (w = e.value.theme) == null ? void 0 : w.value) ==
                            null
                              ? void 0
                              : S[0]) == null
                            ? void 0
                            : C.name) || "beige"
                        }`,
                      ]),
                      "data-nav-color": i(r).getNavColorValue(
                        ((x =
                          (T =
                            (B = e.value.theme) == null ? void 0 : B.value) ==
                          null
                            ? void 0
                            : T[0]) == null
                          ? void 0
                          : x.name) || "beige"
                      ),
                    },
                    [
                      f(
                        _,
                        {
                          block: {
                            _type: "sectionHeader",
                            vueType: "SectionHeader",
                            title: d.value,
                            intro:
                              ((E = e.value.intro) == null
                                ? void 0
                                : E.value) || "",
                            theme: e.value.theme || b.theme,
                            blockIndex: 0,
                            cascadeColor: "white",
                            leadAlignment: "right-compact",
                          },
                        },
                        null,
                        8,
                        ["block"]
                      ),
                      s(
                        "div",
                        {
                          class: A(
                            `theme--${
                              ((L =
                                (N =
                                  (M = e.value.theme) == null
                                    ? void 0
                                    : M.value) == null
                                  ? void 0
                                  : N[0]) == null
                                ? void 0
                                : L.name) || "beige"
                            }`
                          ),
                          "data-nav-color": i(r).getNavColorValue(
                            ((V =
                              (R =
                                (P = e.value.theme) == null
                                  ? void 0
                                  : P.value) == null
                                ? void 0
                                : R[0]) == null
                              ? void 0
                              : V.name) || "beige"
                          ),
                        },
                        [
                          s("div", me, [
                            s("div", _e, [
                              e.value.eyebrow
                                ? (n(),
                                  l(
                                    "h2",
                                    he,
                                    ne(
                                      (j = e.value.eyebrow) == null
                                        ? void 0
                                        : j.value
                                    ),
                                    1
                                  ))
                                : F("", !0),
                              s("div", ye, [
                                f(
                                  le,
                                  {
                                    html:
                                      (D = e.value.body) == null
                                        ? void 0
                                        : D.value,
                                    "in-column": !0,
                                  },
                                  null,
                                  8,
                                  ["html"]
                                ),
                              ]),
                            ]),
                          ]),
                        ],
                        10,
                        pe
                      ),
                      (I = (H = i(t)) == null ? void 0 : H.components) !=
                        null && I.length
                        ? (n(!0),
                          l(
                            se,
                            { key: 0 },
                            ue(
                              i(t).components,
                              (y) => (
                                n(),
                                re(
                                  ce(y.vueType),
                                  {
                                    key: y.blockIndex,
                                    data: y,
                                    class: "page-component",
                                  },
                                  null,
                                  8,
                                  ["data"]
                                )
                              )
                            ),
                            128
                          ))
                        : F("", !0),
                    ],
                    10,
                    de
                  ))
                : (n(), l("div", fe, [s("div", be, [f(h)])])),
            ])
          );
        }
      );
    },
  };
typeof $ == "function" && $(q);
const we = G(q, [["__scopeId", "data-v-a3987941"]]);
export { we as default };
