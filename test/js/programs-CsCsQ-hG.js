import {
  _ as N,
  u as P,
  h as s,
  i as a,
  k as l,
  F as B,
  s as M,
  t as T,
  l as g,
  q as j,
  j as c,
  n as E,
  r as S,
  C as O,
  m as k,
  v as V,
  ai as z,
  I as F,
  aj as H,
  M as R,
  a as A,
  b as G,
  c as U,
  d as J,
  e as f,
  w as K,
  o as Q,
  f as W,
  g as X,
  z as Y,
} from "./app-CGoBdrrW.js";
import { _ as Z } from "./PeopleGridList-BcDkdxlr.js";
import { a as ee } from "./HeroHeader-TNgpKgPN.js";
const te = ["data-nav-color"],
  ae = { class: "TwoColList-container" },
  le = { class: "TwoColList-wrapper" },
  oe = { class: "TwoColList-content" },
  se = { class: "TwoColList-title type-h2" },
  ne = { class: "TwoColList-description" },
  re = {
    __name: "TwoColList",
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
    setup(d) {
      const r = P();
      return (i, u) => (
        a(),
        s(
          "section",
          {
            class: E([
              "TwoColList",
              `theme--${c(r).getThemeValue(d.block.theme)}`,
            ]),
            "data-nav-color": c(r).getNavColorValue(
              c(r).getThemeValue(d.block.theme)
            ),
          },
          [
            l("div", ae, [
              (a(!0),
              s(
                B,
                null,
                M(
                  d.block.items,
                  (e) => (
                    a(),
                    s(
                      "article",
                      { key: e.system.id, class: "TwoColList-item" },
                      [
                        l("div", le, [
                          u[0] ||
                            (u[0] = l(
                              "div",
                              { class: "TwoColList-gap" },
                              null,
                              -1
                            )),
                          l("div", oe, [
                            l("h2", se, T(e.elements.title.value), 1),
                            l("div", ne, [
                              g(
                                j,
                                { html: e.elements.description.value },
                                null,
                                8,
                                ["html"]
                              ),
                            ]),
                          ]),
                        ]),
                      ]
                    )
                  )
                ),
                128
              )),
            ]),
          ],
          10,
          te
        )
      );
    },
  },
  ce = N(re, [["__scopeId", "data-v-0465894d"]]),
  ue = { class: "CardStack" },
  ie = ["data-nav-color"],
  me = { class: "CardStack-container" },
  de = { class: "CardStack-wrapper" },
  _e = { key: 0, class: "CardStack-eyebrow" },
  ve = { class: "CardStack-header" },
  pe = { class: "CardStack-title type-h1" },
  he = { class: "CardStack-body" },
  ge = { key: 0, class: "CardStack-footer" },
  ke = { class: "CardStack-modalcontent" },
  ye = { class: "type-h5 CardStack-modalheader" },
  Ce = {
    __name: "CardStack",
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
    setup(d) {
      S(null);
      const r = P(),
        i = O();
      function u() {
        return {
          theme: {
            name: "theme",
            type: "multiple_choice",
            value: [{ name: "cream", codename: "cream" }],
          },
          overlay: {
            name: "overlaytheme",
            type: "multiple_choice",
            value: [{ name: "black", codename: "black" }],
          },
        };
      }
      const e = () => {
          window.location.href = "/fellows-projects";
        },
        _ = () => {
          window.location.href = "/research-and-publications";
        };
      return ($, m) => {
        const v = z,
          y = Z,
          L = H;
        return (
          a(),
          s("div", ue, [
            (a(!0),
            s(
              B,
              null,
              M(d.block.items, (t) => {
                var w, b;
                return (
                  a(),
                  s(
                    "div",
                    {
                      key: t.system.id,
                      class: E([
                        "CardStack-card",
                        `theme--${c(r).getThemeValue(t.elements.theme)}`,
                      ]),
                      "data-nav-color": c(r).getNavColorValue(
                        c(r).getThemeValue(t.elements.theme)
                      ),
                    },
                    [
                      l("div", me, [
                        l("div", de, [
                          (w = t.elements.subtitle) != null && w.value
                            ? (a(), s("p", _e, T(t.elements.subtitle.value), 1))
                            : k("", !0),
                          l("header", ve, [
                            l("h2", pe, T(t.elements.title.value), 1),
                          ]),
                          l("div", he, [
                            g(
                              j,
                              {
                                html: t.elements.description.value,
                                class: "type-body--lg",
                              },
                              null,
                              8,
                              ["html"]
                            ),
                            (b = t.elements.cta) != null && b.value
                              ? (a(),
                                s("div", ge, [
                                  g(v, {
                                    label: "Explore the Projects",
                                    theme: "yellow",
                                    onClick: e,
                                  }),
                                  t.elements.modal_cta.value &&
                                  t.elements.modal_content.value
                                    ? (a(),
                                      V(
                                        v,
                                        {
                                          key: 0,
                                          label: t.elements.modal_cta.value,
                                          theme: "yellow",
                                          onClick: (p) =>
                                            c(i).setModalState(
                                              c(R).CONTENT + t.system.id
                                            ),
                                        },
                                        null,
                                        8,
                                        ["label", "onClick"]
                                      ))
                                    : k("", !0),
                                  t.elements.cta_link.value
                                    ? (a(),
                                      V(
                                        v,
                                        {
                                          key: 1,
                                          label: t.elements.cta.value,
                                          theme: "yellow",
                                          to: t.elements.cta_link.value,
                                          target: "_blank",
                                        },
                                        null,
                                        8,
                                        ["label", "to"]
                                      ))
                                    : k("", !0),
                                  g(v, {
                                    label: "View our Research",
                                    theme: "transparent",
                                    onClick: _,
                                  }),
                                ]))
                              : k("", !0),
                            g(
                              L,
                              {
                                "unique-id": t.system.id,
                                theme: u().theme,
                                "overlay-theme": u().overlay,
                                "is-large": !1,
                              },
                              {
                                default: F(() => [
                                  l("section", ke, [
                                    (a(!0),
                                    s(
                                      B,
                                      null,
                                      M(
                                        t.elements.modal_content.linkedItems,
                                        (p, I) => (
                                          a(),
                                          s(
                                            "article",
                                            {
                                              key: p.system.id,
                                              class: "CardStack-modalgridwrap",
                                            },
                                            [
                                              l(
                                                "h2",
                                                ye,
                                                T(p.elements.title.value),
                                                1
                                              ),
                                              g(
                                                y,
                                                {
                                                  fullwidth: !0,
                                                  block: {
                                                    people:
                                                      p.elements.items
                                                        .linkedItems,
                                                    theme: u().theme,
                                                  },
                                                  class: "peoplegridlist",
                                                },
                                                null,
                                                8,
                                                ["block"]
                                              ),
                                            ]
                                          )
                                        )
                                      ),
                                      128
                                    )),
                                  ]),
                                ]),
                                _: 2,
                              },
                              1032,
                              ["unique-id", "theme", "overlay-theme"]
                            ),
                          ]),
                        ]),
                      ]),
                    ],
                    10,
                    ie
                  )
                );
              }),
              128
            )),
          ])
        );
      };
    },
  },
  fe = N(Ce, [["__scopeId", "data-v-dba1b43b"]]),
  we = ["data-nav-color"],
  be = { key: 0, class: "programs-loading" },
  Se = { key: 1, class: "programs-error" },
  Te = { class: "type-oversized" },
  $e = { key: 2, class: "programs-content" },
  Le = {
    __name: "programs",
    props: { slug: { type: String, required: !0 } },
    setup(d) {
      const r = d,
        i = P(),
        u = S(""),
        e = S(null);
      A(), G();
      const _ = S(),
        $ = S(null),
        { data: m, error: v, isLoading: y } = U("programs");
      J(
        f(() => ({
          title: u.value || "Programs",
          meta: e.value ? i.getMeta(e.value) : [],
          link: i.getMetaLinks(e.value),
        }))
      );
      const L = f(() =>
          !e.value || !e.value.theme
            ? {}
            : { [`theme--${i.getThemeValue(e.value.theme)}`]: !0 }
        ),
        t = f(() => {
          var o;
          return !e.value || !((o = e.value.programs) != null && o.linkedItems)
            ? []
            : e.value.programs.linkedItems;
        }),
        w = f(() =>
          t.value.length
            ? t.value.filter((o) => {
                var n;
                return (n = o.elements.display) == null
                  ? void 0
                  : n.value.some((h) => h.codename === "card_stack");
              })
            : []
        ),
        b = f(() => w.value.slice(0, 3)),
        p = f(() => {
          if (!t.value.length) return [];
          const o = w.value.slice(3),
            n = t.value.filter((h) => {
              var C;
              return !(
                (C = h.elements.display) != null &&
                C.value.some((x) => x.codename === "card_stack")
              );
            });
          return [...o, ...n];
        });
      async function I() {
        var o, n;
        if (((_.value = !1), !!m.value)) {
          if (!((o = m.value.system) != null && o.type)) {
            _.value = "Invalid page data structure";
            return;
          }
          (e.value = m.value.elements),
            e.value,
            (u.value = (n = e.value.title) == null ? void 0 : n.value),
            (i.pageType = m.value.system.type),
            q();
        }
      }
      function q() {
        !e.value ||
          e.value.theme ||
          (e.value.theme = {
            name: "theme",
            type: "multiple_choice",
            value: [{ name: "cream", codename: "cream" }],
          });
      }
      async function D() {
        try {
          await new Promise((o, n) => {
            const h = Y(
              () => y.value,
              (C) => {
                C || (h(), o());
              },
              { immediate: !0 }
            );
          }),
            m.value && (await I());
        } catch (o) {
          console.error("Error in onServerPrefetch:", o);
        }
      }
      return (
        K(() => {
          m.value && !y.value && I(),
            v.value &&
              ((_.value = "Error loading page"),
              console.error("Error loading page:", v.value));
        }),
        Q(async () => {
          ($.value = r.slug),
            $.value,
            BTEDL.newPage("programs"),
            m.value && !y.value && I();
        }),
        W(async () => {
          ($.value = r.slug), await D();
        }),
        X(() => {}),
        (o, n) => {
          const h = ee,
            C = fe,
            x = ce;
          return (
            a(),
            s(
              "div",
              {
                key: r.slug,
                class: E(["programs", L.value]),
                "data-nav-color": c(i).getNavColorValue(L.value),
              },
              [
                c(y)
                  ? (a(),
                    s(
                      "div",
                      be,
                      n[0] ||
                        (n[0] = [
                          l(
                            "div",
                            { class: "loading-indicator" },
                            "Loading page content...",
                            -1
                          ),
                        ])
                    ))
                  : _.value
                  ? (a(),
                    s("div", Se, [
                      l("h1", Te, T(_.value), 1),
                      n[1] ||
                        (n[1] = l(
                          "p",
                          null,
                          "Sorry, we couldn't load the page you requested.",
                          -1
                        )),
                    ]))
                  : e.value
                  ? (a(),
                    s("div", $e, [
                      g(h, { block: e.value }, null, 8, ["block"]),
                      b.value.length
                        ? (a(),
                          V(
                            C,
                            {
                              key: 0,
                              block: {
                                _type: "card_stack",
                                vueType: "CardStack",
                                items: b.value,
                              },
                            },
                            null,
                            8,
                            ["block"]
                          ))
                        : k("", !0),
                      p.value.length
                        ? (a(),
                          V(
                            x,
                            {
                              key: 1,
                              block: {
                                _type: "two_col_list",
                                vueType: "TwoColList",
                                items: p.value,
                                theme: e.value.theme,
                              },
                            },
                            null,
                            8,
                            ["block"]
                          ))
                        : k("", !0),
                    ]))
                  : k("", !0),
              ],
              10,
              we
            )
          );
        }
      );
    },
  },
  Be = N(Le, [["__scopeId", "data-v-02206a5a"]]);
export { Be as default };
