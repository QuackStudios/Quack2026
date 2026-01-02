import {
  ae as p,
  u as _,
  r as v,
  e as g,
  ar as f,
  G as k,
  h as o,
  i as s,
  j as l,
  n as u,
  k as n,
  m as T,
  t as m,
  _ as h,
  F as b,
  s as y,
} from "./app-CGoBdrrW.js";
const w = ["data-nav-color"],
  S = { class: "SimpleHero-container" },
  C = ["data-show-grid"],
  B = { class: "SimpleHero-titlewrap" },
  $ = ["data-theme"],
  H = p({
    __name: "SimpleHero",
    props: {
      showGrid: { type: Boolean, default: !1 },
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
      const r = e,
        a = _(),
        d = v(null),
        c = g(() => {
          var i;
          return f((i = r.block.title) == null ? void 0 : i.value);
        });
      return (
        k(async () => {}),
        (i, t) => (
          s(),
          o(
            "header",
            {
              class: u([
                "SimpleHero",
                `theme--${l(a).getThemeValue(e.block.theme)}`,
              ]),
              "data-nav-color": l(a).getNavColorValue(
                l(a).getThemeValue(e.block.theme)
              ),
            },
            [
              n("div", S, [
                n(
                  "div",
                  { class: "SimpleHero-wrap", "data-show-grid": e.showGrid },
                  [
                    n("div", B, [
                      e.block.title
                        ? (s(),
                          o(
                            "h1",
                            {
                              key: 0,
                              ref_key: "titleRef",
                              ref: d,
                              class: u([
                                "SimpleHero-title type-oversized",
                                c.value,
                              ]),
                              "data-theme": l(a).getThemeValue(e.block.theme),
                            },
                            m(e.block.title.value),
                            11,
                            $
                          ))
                        : T("", !0),
                    ]),
                  ],
                  8,
                  C
                ),
              ]),
            ],
            10,
            w
          )
        )
      );
    },
  }),
  N = h(H, [["__scopeId", "data-v-00328bd0"]]),
  V = ["data-variant"],
  x = { class: "ButtonToggle" },
  A = { class: "ButtonToggle-group" },
  j = ["data-active", "onClick", "aria-label", "aria-pressed"],
  q = {
    __name: "ButtonToggle",
    props: {
      activeTab: { type: String, required: !0 },
      tabs: { type: Array, required: !0, default: () => ["watch", "read"] },
      variant: { type: String, default: "default" },
    },
    emits: ["update:activeTab"],
    setup(e, { emit: r }) {
      const a = r,
        d = (c) => {
          a("update:activeTab", c);
        };
      return (c, i) => (
        s(),
        o(
          "div",
          { class: "ButtonToggle-wrapper", "data-variant": e.variant },
          [
            n("div", x, [
              n("div", A, [
                (s(!0),
                o(
                  b,
                  null,
                  y(
                    e.tabs,
                    (t) => (
                      s(),
                      o(
                        "button",
                        {
                          key: t,
                          class: "ButtonToggle-option",
                          "data-active": e.activeTab === t,
                          onClick: (G) => d(t),
                          "aria-label": `Show ${t} content`,
                          "aria-pressed": e.activeTab === t,
                        },
                        m(t.charAt(0).toUpperCase() + t.slice(1)),
                        9,
                        j
                      )
                    )
                  ),
                  128
                )),
              ]),
            ]),
          ],
          8,
          V
        )
      );
    },
  },
  z = h(q, [["__scopeId", "data-v-d45fc1e7"]]);
export { z as _, N as a };
