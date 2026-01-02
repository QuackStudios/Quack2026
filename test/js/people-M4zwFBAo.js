import { _ as U } from "./PeopleGridList-BcDkdxlr.js";
import {
  _ as w,
  u as T,
  h as n,
  i as a,
  k as s,
  n as B,
  j as v,
  F as z,
  s as F,
  t as k,
  m,
  l as S,
  q as H,
  e as $,
  r as b,
  a as A,
  b as O,
  c as G,
  d as J,
  w as K,
  o as Q,
  f as W,
  g as X,
  v as R,
  z as Y,
} from "./app-CGoBdrrW.js";
import { a as Z } from "./HeroHeader-TNgpKgPN.js";
const ee = { class: "BigList" },
  te = ["data-nav-color"],
  se = { class: "BigList-itemcontainer" },
  ae = { class: "BigList-header" },
  le = { class: "BigList-title type-h2" },
  oe = { class: "BigList-subheader" },
  ne = { class: "BigList-subheaderwrap" },
  ie = {
    key: 0,
    class: "BigList-subtitle BigList-subtitle--primary type-body--sm",
  },
  ce = {
    key: 1,
    class: "BigList-subtitle BigList-subtitle--secondary type-body--sm",
  },
  re = { class: "BigList-content" },
  ue = { class: "BigList-imagewrap" },
  pe = ["src", "alt"],
  de = { class: "BigList-text" },
  ge = {
    __name: "BigList",
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
    setup(r) {
      const l = T();
      return (p, d) => {
        const e = H;
        return (
          a(),
          n("div", ee, [
            s(
              "div",
              {
                class: B([
                  "BigList-bg",
                  `theme--${v(l).getThemeValue(r.block.theme)}`,
                ]),
              },
              null,
              2
            ),
            (a(!0),
            n(
              z,
              null,
              F(
                r.block.items,
                (t, o) => (
                  a(),
                  n(
                    "div",
                    {
                      key: o,
                      class: B([
                        "BigList-item",
                        `theme--${v(l).getThemeValue(r.block.theme)} item-${o}`,
                      ]),
                      "data-nav-color": v(l).getNavColorValue(
                        v(l).getThemeValue(r.block.theme)
                      ),
                    },
                    [
                      s("div", se, [
                        d[0] ||
                          (d[0] = s(
                            "div",
                            { class: "BigList-keyline-wrap" },
                            [s("div", { class: "BigList-keyline" })],
                            -1
                          )),
                        s("header", ae, [
                          s("h2", le, k(t.heading), 1),
                          s("div", oe, [
                            s("div", ne, [
                              t.subtitlePrimary
                                ? (a(), n("span", ie, k(t.subtitlePrimary), 1))
                                : m("", !0),
                              t.subtitleSecondary
                                ? (a(),
                                  n("span", ce, k(t.subtitleSecondary), 1))
                                : m("", !0),
                            ]),
                          ]),
                        ]),
                        s("div", re, [
                          s("div", ue, [
                            t.image
                              ? (a(),
                                n(
                                  "img",
                                  {
                                    key: 0,
                                    src: t.image,
                                    alt: t.heading,
                                    class: "BigList-image",
                                  },
                                  null,
                                  8,
                                  pe
                                ))
                              : m("", !0),
                          ]),
                          s("div", de, [
                            S(e, { html: t.content }, null, 8, ["html"]),
                          ]),
                        ]),
                      ]),
                    ],
                    10,
                    te
                  )
                )
              ),
              128
            )),
          ])
        );
      };
    },
  },
  me = w(ge, [["__scopeId", "data-v-2390ca6f"]]),
  _e = { class: "PeopleBigList" },
  ve = { class: "PeopleBigList-container" },
  he = { key: 0, class: "type-eyebrow PeopleBigList-sectiontitle" },
  ye = { class: "PeopleBigList-biglist" },
  be = {
    __name: "PeopleBigList",
    props: {
      block: {
        type: Object,
        required: !0,
        default: () => ({
          _type: "peopleBigList",
          vueType: "PeopleBigList",
          theme: {
            name: "theme",
            type: "multiple_choice",
            value: [{ name: "beige", codename: "beige" }],
          },
          sectionTitle: { value: "Managers" },
          people: { value: [], linkedItems: [] },
        }),
      },
    },
    setup(r) {
      const l = r,
        p = T();
      function d() {
        return {
          name: "theme",
          type: "multiple_choice",
          value: [{ name: "yellow", codename: "yellow" }],
        };
      }
      const e = $(() =>
        !l.block.people || l.block.people.length === 0
          ? []
          : l.block.people.map((t) => {
              var h, g, _, y;
              const o = t.elements,
                i = p.getAssetURL(o.photo);
              return {
                heading: ((h = o.name) == null ? void 0 : h.value) || "",
                subtitlePrimary:
                  ((g = o.role_title) == null ? void 0 : g.value) || "",
                subtitleSecondary:
                  ((_ = o.company) == null ? void 0 : _.value) || "",
                image: i || null,
                content: ((y = o.description) == null ? void 0 : y.value) || "",
              };
            })
      );
      return (t, o) => {
        const i = me;
        return (
          a(),
          n("section", _e, [
            s("div", ve, [
              r.block.sectionTitle
                ? (a(), n("h2", he, k(r.block.sectionTitle), 1))
                : m("", !0),
              s("div", ye, [
                S(i, { block: { items: e.value, theme: d() } }, null, 8, [
                  "block",
                ]),
              ]),
            ]),
          ])
        );
      };
    },
  },
  ke = w(be, [["__scopeId", "data-v-94f88a05"]]),
  fe = ["data-nav-color"],
  Le = { key: 0, class: "people-loading" },
  Be = { key: 1, class: "people-error" },
  $e = { class: "type-oversized" },
  we = { key: 2, class: "people-content" },
  Te = { class: "people-container" },
  Se = { class: "people-container" },
  Pe = {
    __name: "people",
    props: { slug: { type: String, required: !0 } },
    setup(r) {
      const l = r;
      b("page");
      const p = T(),
        d = b(""),
        e = b(null);
      A(), O();
      const t = b(),
        o = b(null),
        { data: i, error: h, isLoading: g } = G("people");
      J(
        $(() => ({
          title: d.value || q(),
          meta: e.value ? p.getMeta(e.value) : [],
          link: p.getMetaLinks(e.value),
        }))
      );
      async function _() {
        var u, c;
        if (((t.value = !1), !!i.value)) {
          if (!((u = i.value.system) != null && u.type)) {
            t.value = "Invalid page data structure";
            return;
          }
          (e.value = i.value.elements),
            e.value,
            e.value,
            (d.value = (c = e.value.title) == null ? void 0 : c.value),
            (p.pageType = i.value.system.type),
            j();
        }
      }
      const y = $(() =>
        !e.value || !e.value.theme
          ? {}
          : { [`theme--${p.getThemeValue(e.value.theme)}`]: !0 }
      );
      function j() {
        !e.value ||
          e.value.theme ||
          (e.value.theme = {
            name: "theme",
            type: "multiple_choice",
            value: [{ name: "grey", codename: "grey" }],
          });
      }
      K(() => {
        i.value && !g.value && _(),
          h.value &&
            ((t.value = "Error loading page"),
            console.error("Error loading page:", h.value));
      });
      function q() {
        const u = l.slug;
        return u
          ? u
              .split("-")
              .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
              .join(" ")
          : "";
      }
      async function D() {
        try {
          await new Promise((u, c) => {
            const f = Y(
              () => g.value,
              (L) => {
                L || (f(), u());
              },
              { immediate: !0 }
            );
          }),
            i.value && (await _());
        } catch (u) {
          console.error("Error in onServerPrefetch:", u);
        }
      }
      return (
        Q(async () => {
          (o.value = l.slug),
            o.value,
            BTEDL.newPage("people"),
            i.value && !g.value && _();
        }),
        W(async () => {
          (o.value = l.slug), await D();
        }),
        X(() => {}),
        (u, c) => {
          var P, I, C, V, x, E, N;
          const f = Z,
            L = ke,
            M = U;
          return (
            a(),
            n(
              "div",
              {
                key: l.slug,
                class: B(["people", y.value]),
                "data-nav-color": v(p).getNavColorValue(y.value),
              },
              [
                v(g)
                  ? (a(),
                    n(
                      "div",
                      Le,
                      c[0] ||
                        (c[0] = [
                          s(
                            "div",
                            { class: "loading-indicator" },
                            "Loading page content...",
                            -1
                          ),
                        ])
                    ))
                  : t.value
                  ? (a(),
                    n("div", Be, [
                      s("h1", $e, k(t.value), 1),
                      c[1] ||
                        (c[1] = s(
                          "p",
                          null,
                          "Sorry, we couldn't load the page you requested.",
                          -1
                        )),
                    ]))
                  : e.value
                  ? (a(),
                    n("div", we, [
                      S(f, { variant: "right", block: e.value }, null, 8, [
                        "block",
                      ]),
                      s("section", Te, [
                        (I =
                          (P = e.value) == null
                            ? void 0
                            : P.managing_partners) != null &&
                        I.linkedItems.length
                          ? (a(),
                            R(
                              L,
                              {
                                key: 0,
                                block: {
                                  sectionTitle:
                                    (C = e.value.biglist_section_title) == null
                                      ? void 0
                                      : C.value,
                                  people:
                                    (V = e.value) == null
                                      ? void 0
                                      : V.managing_partners.linkedItems,
                                },
                                class: "peoplebiglist",
                              },
                              null,
                              8,
                              ["block"]
                            ))
                          : m("", !0),
                      ]),
                      s("section", Se, [
                        (E = (x = e.value) == null ? void 0 : x.venture_team) !=
                          null && E.linkedItems.length
                          ? (a(),
                            R(
                              M,
                              {
                                key: 0,
                                block: {
                                  sectionTitle:
                                    (N = e.value.gridlist_section_title) == null
                                      ? void 0
                                      : N.value,
                                  theme: e.value.theme,
                                  people: e.value.venture_team.linkedItems,
                                },
                                class: "peoplegridlist",
                              },
                              null,
                              8,
                              ["block"]
                            ))
                          : m("", !0),
                      ]),
                    ]))
                  : m("", !0),
              ],
              10,
              fe
            )
          );
        }
      );
    },
  },
  xe = w(Pe, [["__scopeId", "data-v-d0c41c66"]]);
export { xe as default };
