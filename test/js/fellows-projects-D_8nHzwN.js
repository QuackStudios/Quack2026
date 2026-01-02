import {
  _ as U,
  u as G,
  r as i,
  a as O,
  b as J,
  c as K,
  am as B,
  an as Q,
  e as g,
  d as W,
  z as R,
  w as X,
  o as Y,
  f as Z,
  g as ee,
  h as _,
  i as c,
  m as M,
  j as C,
  k as d,
  t as te,
  v as F,
  n as E,
  l as ae,
  ao as oe,
  ap as le,
  aq as se,
} from "./app-CGoBdrrW.js";
const re = ["data-nav-color", "data-is-modal-route"],
  ne = { key: 0, class: "fellowsprojects-loading" },
  ue = { key: 1, class: "fellowsprojects-error" },
  ie = { class: "type-oversized" },
  ce = { key: 2, class: "fellowsprojects-content" },
  de = ["data-is-modal-route", "data-has-filter"],
  me = ["data-has-filter", "data-is-modal-route"],
  ve = {
    __name: "fellows-projects",
    props: {
      slug: { type: String, required: !0 },
      filter: { type: String, default: "" },
      isModalRoute: { type: Boolean, default: !1 },
      theme: {
        name: "theme",
        type: Object,
        default: () => ({
          name: "theme",
          type: "multiple_choice",
          value: [{ name: "cream", codename: "cream" }],
        }),
      },
    },
    setup(n) {
      const r = n,
        m = G(),
        j = i(""),
        o = i(null),
        b = O(),
        x = J(),
        v = i(),
        S = i(null),
        { data: u, error: I, isLoading: h } = K("fellows-projects"),
        { data: w, error: fe, isLoading: pe } = B("sector"),
        { data: y, error: ge, isLoading: he } = B("program"),
        { data: we, error: ye, isLoading: N } = Q("be"),
        l = i(""),
        f = i([]),
        V = g(() =>
          l.value
            ? `${j.value || "Fellows Projects"} - ${l.value}`
            : j.value || "Fellows Projects"
        );
      r.isModalRoute ||
        W(
          g(() => ({
            title: V.value,
            meta: o.value ? m.getMeta(o.value) : [],
            link: m.getMetaLinks(o.value),
          }))
        );
      function $() {
        o.value.theme = r.theme;
      }
      const T = g(() =>
          !o.value || !o.value.theme
            ? {}
            : { [`theme--${m.getThemeValue(o.value.theme)}`]: !0 }
        ),
        D = g(() => {
          var e, t, a;
          return (a =
            (t = (e = o.value) == null ? void 0 : e.companies) == null
              ? void 0
              : t.linkedItems) != null && a.length
            ? o.value.companies.linkedItems
            : [];
        }),
        A = g(() =>
          l.value
            ? D.value.filter((e) => {
                var t, a, s;
                return (s =
                  (a = (t = e.elements) == null ? void 0 : t.tags) == null
                    ? void 0
                    : a.value) != null && s.length
                  ? !!(
                      e.elements.tags.value.some((p) => p.name === l.value) ||
                      e.elements.tags.value.some((p) => p.name === l.value)
                    )
                  : !1;
              })
            : D.value
        );
      async function k() {
        var e, t;
        if (((v.value = !1), P(), !!u.value)) {
          if (!((e = u.value.system) != null && e.type)) {
            v.value = "Invalid page data structure";
            return;
          }
          (o.value = u.value.elements),
            (j.value = (t = o.value.title) == null ? void 0 : t.value),
            r.isModalRoute || (m.pageType = u.value.system.type),
            $();
        }
      }
      function L(e) {
        var a, s;
        let t =
          (s = (a = e.elements) == null ? void 0 : a.fellowsprojects_area) ==
          null
            ? void 0
            : s.value;
        return t.length < 1 ? !1 : ((t = t[0].name), t === l.value);
      }
      function q() {
        if (!w || !y || !w.value || !y.value) {
          f.value = [];
          return;
        }
        const e = w.value.filter((a) => L(a)),
          t = y.value.filter((a) => L(a));
        f.value = e.length ? e[0] : t.length ? t[0] : [];
      }
      function P() {
        (l.value = r.filter ? r.filter : ""),
          (y.value || w.value) && l.value !== "" && q();
      }
      function z(e) {
        if (r.filter === e) return;
        const t = e
          ? `/fellows-projects/${encodeURIComponent(e)}`
          : "/fellows-projects";
        x.push(t);
      }
      async function H() {
        try {
          await new Promise((e, t) => {
            const a = R(
              () => h.value,
              (s) => {
                s || (a(), e());
              },
              { immediate: !0 }
            );
          }),
            u.value && (await k());
        } catch (e) {
          console.error("Error in onServerPrefetch:", e);
        }
      }
      return (
        R(l, (e) => {
          z(e);
        }),
        R(
          () => b.params,
          () => {
            P();
          },
          { immediate: !0 }
        ),
        X(() => {
          u.value && !h.value && k(),
            I.value && (v.value = "Error loading page");
        }),
        Y(async () => {
          (S.value = r.slug),
            BTEDL.newPage("fellows-projects"),
            u.value && !h.value && k();
        }),
        Z(async () => {
          (S.value = r.slug), await H();
        }),
        ee(() => {}),
        (e, t) => {
          const a = le,
            s = se,
            p = oe;
          return (
            c(),
            _(
              "div",
              {
                key: e.$route.fullPath,
                class: E(["fellowsprojects", T.value]),
                "data-nav-color": C(m).getNavColorValue(T.value),
                "data-is-modal-route": n.isModalRoute,
              },
              [
                C(h) || C(N)
                  ? (c(),
                    _(
                      "div",
                      ne,
                      t[0] ||
                        (t[0] = [
                          d(
                            "div",
                            { class: "loading-indicator" },
                            " Loading page content... ",
                            -1
                          ),
                        ])
                    ))
                  : v.value
                  ? (c(),
                    _("div", ue, [
                      d("h1", ie, te(v.value), 1),
                      t[1] ||
                        (t[1] = d(
                          "p",
                          null,
                          "Sorry, we couldn't load the page you requested.",
                          -1
                        )),
                    ]))
                  : o.value
                  ? (c(),
                    _("div", ce, [
                      !f.value || !l.value
                        ? (c(),
                          F(a, { key: 0, block: o.value }, null, 8, ["block"]))
                        : M("", !0),
                      d(
                        "section",
                        {
                          class: "fellowsprojects-companies",
                          "data-is-modal-route": n.isModalRoute,
                          "data-has-filter": !!l.value,
                        },
                        [
                          d(
                            "div",
                            {
                              class: E([
                                "fellowsprojects-container",
                                n.isModalRoute
                                  ? "fellowsprojects-container--modal"
                                  : "",
                              ]),
                            },
                            [
                              d(
                                "div",
                                {
                                  class: "fellowsprojects-layout",
                                  "data-has-filter": !!l.value,
                                  "data-is-modal-route": n.isModalRoute,
                                },
                                [
                                  f.value && l.value
                                    ? (c(),
                                      F(
                                        s,
                                        {
                                          key: 0,
                                          area: f.value,
                                          theme: o.value.theme,
                                          class: "fellowsprojects-areadetail",
                                          "is-modal-route": n.isModalRoute,
                                        },
                                        null,
                                        8,
                                        ["area", "theme", "is-modal-route"]
                                      ))
                                    : M("", !0),
                                  ae(
                                    p,
                                    {
                                      companies: A.value,
                                      filtered: !!l.value,
                                      theme: o.value.theme,
                                      class: "fellowsprojects-gridcontainer",
                                      "is-modal-route": n.isModalRoute,
                                    },
                                    null,
                                    8,
                                    [
                                      "companies",
                                      "filtered",
                                      "theme",
                                      "is-modal-route",
                                    ]
                                  ),
                                ],
                                8,
                                me
                              ),
                            ],
                            2
                          ),
                        ],
                        8,
                        de
                      ),
                    ]))
                  : M("", !0),
              ],
              10,
              re
            )
          );
        }
      );
    },
  },
  je = U(ve, [["__scopeId", "data-v-8a764bc9"]]);
export { je as default };
