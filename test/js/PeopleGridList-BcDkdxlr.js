import { _ as p } from "./HeroHeader-TNgpKgPN.js";
import {
  _ as h,
  u as _,
  e as b,
  h as r,
  i as d,
  k as u,
  m as f,
  t as k,
  l as v,
  j as i,
  n as y,
} from "./app-CGoBdrrW.js";
const g = ["data-nav-color"],
  w = ["data-full-width"],
  G = { key: 0, class: "type-eyebrow PeopleGridList-sectiontitle" },
  L = ["data-full-width"],
  P = {
    __name: "PeopleGridList",
    props: {
      fullwidth: { type: Boolean, default: !1 },
      block: {
        type: Object,
        required: !0,
        default: () => ({
          _type: "peopleGridList",
          vueType: "PeopleGridList",
          theme: {
            name: "theme",
            type: "multiple_choice",
            value: [{ name: "beige", codename: "beige" }],
          },
          sectionTitle: { value: "Venture Team" },
          people: { value: [], linkedItems: [] },
        }),
      },
    },
    setup(e) {
      const o = e,
        a = _(),
        m = b(() =>
          !o.block.people || o.block.people.length === 0
            ? []
            : o.block.people.map((s) => {
                var l, n, c;
                const t = s.elements;
                return {
                  heading: ((l = t.name) == null ? void 0 : l.value) || "",
                  subtitlePrimary:
                    ((n = t.company) == null ? void 0 : n.value) || "",
                  subtitleSecondary:
                    ((c = t.role_title) == null ? void 0 : c.value) || "",
                };
              })
        );
      return (s, t) => {
        const l = p;
        return (
          d(),
          r(
            "article",
            {
              class: y([
                "PeopleGridList-article",
                `theme--${i(a).getThemeValue(e.block.theme)}`,
              ]),
              "data-nav-color": i(a).getNavColorValue(
                i(a).getThemeValue(e.block.theme)
              ),
            },
            [
              u(
                "div",
                {
                  class: "PeopleGridList-container",
                  "data-full-width": e.fullwidth,
                },
                [
                  e.block.sectionTitle
                    ? (d(), r("h2", G, k(e.block.sectionTitle), 1))
                    : f("", !0),
                  u(
                    "div",
                    {
                      "data-full-width": e.fullwidth,
                      class: "PeopleGridList-gridlist",
                    },
                    [
                      v(
                        l,
                        { block: { theme: e.block.theme, items: m.value } },
                        null,
                        8,
                        ["block"]
                      ),
                    ],
                    8,
                    L
                  ),
                ],
                8,
                w
              ),
            ],
            10,
            g
          )
        );
      };
    },
  },
  B = h(P, [["__scopeId", "data-v-9b0cd6fa"]]);
export { B as _ };
