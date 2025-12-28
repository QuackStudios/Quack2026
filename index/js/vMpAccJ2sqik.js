(self.webpackChunk = self.webpackChunk || []).push([
  ["744"],
  {
    5897: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        i = {
          cleanupElement: function () {
            return I;
          },
          createInstance: function () {
            return b;
          },
          destroy: function () {
            return y;
          },
          init: function () {
            return T;
          },
          ready: function () {
            return E;
          },
        };
      for (var d in i)
        Object.defineProperty(t, d, { enumerable: !0, get: i[d] });
      a(2897), a(233), a(9754), a(971), a(2374), a(5152), a(5273), a(172);
      let o = (n = a(3142)) && n.__esModule ? n : { default: n },
        c = a(7933),
        r = (e) => e.Webflow.require("lottie").lottie,
        l = (e) => !!(e.Webflow.env("design") || e.Webflow.env("preview")),
        s = { Playing: "playing", Stopped: "stopped" },
        f = new (class {
          _cache = [];
          set(e, t) {
            let a = (0, o.default)(this._cache, ({ wrapper: t }) => t === e);
            -1 !== a && this._cache.splice(a, 1),
              this._cache.push({ wrapper: e, instance: t });
          }
          delete(e) {
            let t = (0, o.default)(this._cache, ({ wrapper: t }) => t === e);
            -1 !== t && this._cache.splice(t, 1);
          }
          get(e) {
            let t = (0, o.default)(this._cache, ({ wrapper: t }) => t === e);
            return -1 !== t ? this._cache[t].instance : null;
          }
        })(),
        u = {};
      class g {
        config = null;
        currentState = s.Stopped;
        animationItem;
        handlers = {
          enterFrame: [],
          complete: [],
          loop: [],
          dataReady: [],
          destroy: [],
          error: [],
        };
        load(e) {
          let t = (e.dataset || u).src || "";
          t.endsWith(".lottie")
            ? (0, c.fetchLottie)(t).then((t) => {
                this._loadAnimation(e, t);
              })
            : this._loadAnimation(e, void 0),
            f.set(e, this),
            (this.container = e);
        }
        _loadAnimation(e, t) {
          let a = e.dataset || u,
            n = a.src || "",
            i = a.preserveAspectRatio || "xMidYMid meet",
            d = a.renderer || "svg",
            o = 1 === parseFloat(a.loop),
            c = parseFloat(a.direction) || 1,
            f = 1 === parseFloat(a.autoplay),
            g = parseFloat(a.duration) || 0,
            p = 1 === parseFloat(a.isIx2Target),
            b = parseFloat(a.ix2InitialState);
          isNaN(b) && (b = null);
          let I = {
            src: n,
            loop: o,
            autoplay: f,
            renderer: d,
            direction: c,
            duration: g,
            hasIx2: p,
            ix2InitialValue: b,
            preserveAspectRatio: i,
          };
          if (
            this.animationItem &&
            this.config &&
            this.config.src === n &&
            d === this.config.renderer &&
            i === this.config.preserveAspectRatio
          ) {
            if (
              (o !== this.config.loop && this.setLooping(o),
              p ||
                (c !== this.config.direction && this.setDirection(c),
                g !== this.config.duration &&
                  (g > 0 && g !== this.duration
                    ? this.setSpeed(this.duration / g)
                    : this.setSpeed(1))),
              f && this.play(),
              b && b !== this.config.ix2InitialValue)
            ) {
              let e = b / 100;
              this.goToFrame(this.frames * e);
            }
            this.config = I;
            return;
          }
          let T = e.ownerDocument.defaultView;
          try {
            this.animationItem && this.destroy(),
              (this.animationItem = r(T).loadAnimation({
                container: e,
                loop: o,
                autoplay: f,
                renderer: d,
                rendererSettings: {
                  preserveAspectRatio: i,
                  progressiveLoad: !0,
                  hideOnTransparent: !0,
                },
                ...(t ? { animationData: t } : { path: n }),
              }));
          } catch (e) {
            this.handlers.error.forEach((t) => t(e));
            return;
          }
          this.animationItem &&
            (l(T) &&
              (this.animationItem.addEventListener("enterFrame", () => {
                if (!this.isPlaying) return;
                let {
                    currentFrame: e,
                    totalFrames: t,
                    playDirection: a,
                  } = this.animationItem,
                  n = (e / t) * 100,
                  i = Math.round(1 === a ? n : 100 - n);
                this.handlers.enterFrame.forEach((t) => t(i, e));
              }),
              this.animationItem.addEventListener("complete", () => {
                if (this.currentState !== s.Playing || !this.animationItem.loop)
                  return void this.handlers.complete.forEach((e) => e());
                this.currentState = s.Stopped;
              }),
              this.animationItem.addEventListener("loopComplete", (e) => {
                this.handlers.loop.forEach((t) => t(e));
              }),
              this.animationItem.addEventListener("data_failed", (e) => {
                this.handlers.error.forEach((t) => t(e));
              }),
              this.animationItem.addEventListener("error", (e) => {
                this.handlers.error.forEach((t) => t(e));
              })),
            this.isLoaded
              ? (this.handlers.dataReady.forEach((e) => e()), f && this.play())
              : this.animationItem.addEventListener("data_ready", () => {
                  if (
                    (this.handlers.dataReady.forEach((e) => e()),
                    !p &&
                      (this.setDirection(c),
                      g > 0 &&
                        g !== this.duration &&
                        this.setSpeed(this.duration / g),
                      f && this.play()),
                    b)
                  ) {
                    let e = b / 100;
                    this.goToFrame(this.frames * e);
                  }
                }),
            (this.config = I));
        }
        onFrameChange(e) {
          -1 === this.handlers.enterFrame.indexOf(e) &&
            this.handlers.enterFrame.push(e);
        }
        onPlaybackComplete(e) {
          -1 === this.handlers.complete.indexOf(e) &&
            this.handlers.complete.push(e);
        }
        onLoopComplete(e) {
          -1 === this.handlers.loop.indexOf(e) && this.handlers.loop.push(e);
        }
        onDestroy(e) {
          -1 === this.handlers.destroy.indexOf(e) &&
            this.handlers.destroy.push(e);
        }
        onDataReady(e) {
          -1 === this.handlers.dataReady.indexOf(e) &&
            this.handlers.dataReady.push(e);
        }
        onError(e) {
          -1 === this.handlers.error.indexOf(e) && this.handlers.error.push(e);
        }
        play() {
          if (!this.animationItem) return;
          let e = 1 === this.animationItem.playDirection ? 0 : this.frames;
          this.animationItem.goToAndPlay(e, !0),
            (this.currentState = s.Playing);
        }
        stop() {
          if (this.animationItem) {
            if (this.isPlaying) {
              let { playDirection: e } = this.animationItem,
                t = 1 === e ? 0 : this.frames;
              this.animationItem.goToAndStop(t, !0);
            }
            this.currentState = s.Stopped;
          }
        }
        destroy() {
          this.animationItem &&
            (this.isPlaying && this.stop(),
            this.handlers.destroy.forEach((e) => e()),
            this.container && f.delete(this.container),
            this.animationItem.destroy(),
            Object.keys(this.handlers).forEach(
              (e) => (this.handlers[e].length = 0)
            ),
            (this.animationItem = null),
            (this.container = null),
            (this.config = null));
        }
        get isPlaying() {
          return !!this.animationItem && !this.animationItem.isPaused;
        }
        get isPaused() {
          return !!this.animationItem && this.animationItem.isPaused;
        }
        get duration() {
          return this.animationItem ? this.animationItem.getDuration() : 0;
        }
        get frames() {
          return this.animationItem ? this.animationItem.totalFrames : 0;
        }
        get direction() {
          return this.animationItem ? this.animationItem.playDirection : 1;
        }
        get isLoaded() {
          return !this.animationItem, this.animationItem.isLoaded;
        }
        get ix2InitialValue() {
          return this.config ? this.config.ix2InitialValue : null;
        }
        goToFrame(e) {
          this.animationItem && this.animationItem.setCurrentRawFrameValue(e);
        }
        setSubframe(e) {
          this.animationItem && this.animationItem.setSubframe(e);
        }
        setSpeed(e = 1) {
          this.animationItem &&
            (this.isPlaying && this.stop(), this.animationItem.setSpeed(e));
        }
        setLooping(e) {
          this.animationItem &&
            (this.isPlaying && this.stop(), (this.animationItem.loop = e));
        }
        setDirection(e) {
          this.animationItem &&
            (this.isPlaying && this.stop(),
            this.animationItem.setDirection(e),
            this.goToFrame(1 === e ? 0 : this.frames));
        }
      }
      let p = () =>
          Array.from(
            document.querySelectorAll('[data-animation-type="lottie"]')
          ),
        b = (e) => {
          let t = f.get(e);
          return null == t && (t = new g()), t.load(e), t;
        },
        I = (e) => {
          let t = f.get(e);
          t && t.destroy();
        },
        T = () => {
          p().forEach((e) => {
            1 !== parseFloat(e.getAttribute("data-is-ix2-target")) && I(e),
              b(e);
          });
        },
        y = () => {
          p().forEach(I);
        },
        E = T;
    },
    2444: function (e, t, a) {
      "use strict";
      var n = a(3949),
        i = a(5897),
        d = a(8724);
      n.define(
        "lottie",
        (e.exports = function () {
          return {
            lottie: d,
            createInstance: i.createInstance,
            cleanupElement: i.cleanupElement,
            init: i.init,
            destroy: i.destroy,
            ready: i.ready,
          };
        })
      );
    },
    5487: function () {
      "use strict";
      window.tram = (function (e) {
        function t(e, t) {
          return new M.Bare().init(e, t);
        }
        function a(e) {
          var t = parseInt(e.slice(1), 16);
          return [(t >> 16) & 255, (t >> 8) & 255, 255 & t];
        }
        function n(e, t, a) {
          return (
            "#" + (0x1000000 | (e << 16) | (t << 8) | a).toString(16).slice(1)
          );
        }
        function i() {}
        function d(e, t, a) {
          if ((void 0 !== t && (a = t), void 0 === e)) return a;
          var n = a;
          return (
            q.test(e) || !$.test(e)
              ? (n = parseInt(e, 10))
              : $.test(e) && (n = 1e3 * parseFloat(e)),
            0 > n && (n = 0),
            n == n ? n : a
          );
        }
        function o(e) {
          Q.debug && window && window.console.warn(e);
        }
        var c,
          r,
          l,
          s = (function (e, t, a) {
            function n(e) {
              return "object" == typeof e;
            }
            function i(e) {
              return "function" == typeof e;
            }
            function d() {}
            return function o(c, r) {
              function l() {
                var e = new s();
                return i(e.init) && e.init.apply(e, arguments), e;
              }
              function s() {}
              r === a && ((r = c), (c = Object)), (l.Bare = s);
              var f,
                u = (d[e] = c[e]),
                g = (s[e] = l[e] = new d());
              return (
                (g.constructor = l),
                (l.mixin = function (t) {
                  return (s[e] = l[e] = o(l, t)[e]), l;
                }),
                (l.open = function (e) {
                  if (
                    ((f = {}),
                    i(e) ? (f = e.call(l, g, u, l, c)) : n(e) && (f = e),
                    n(f))
                  )
                    for (var a in f) t.call(f, a) && (g[a] = f[a]);
                  return i(g.init) || (g.init = c), l;
                }),
                l.open(r)
              );
            };
          })("prototype", {}.hasOwnProperty),
          f = {
            ease: [
              "ease",
              function (e, t, a, n) {
                var i = (e /= n) * e,
                  d = i * e;
                return (
                  t +
                  a *
                    (-2.75 * d * i + 11 * i * i + -15.5 * d + 8 * i + 0.25 * e)
                );
              },
            ],
            "ease-in": [
              "ease-in",
              function (e, t, a, n) {
                var i = (e /= n) * e,
                  d = i * e;
                return t + a * (-1 * d * i + 3 * i * i + -3 * d + 2 * i);
              },
            ],
            "ease-out": [
              "ease-out",
              function (e, t, a, n) {
                var i = (e /= n) * e,
                  d = i * e;
                return (
                  t +
                  a *
                    (0.3 * d * i + -1.6 * i * i + 2.2 * d + -1.8 * i + 1.9 * e)
                );
              },
            ],
            "ease-in-out": [
              "ease-in-out",
              function (e, t, a, n) {
                var i = (e /= n) * e,
                  d = i * e;
                return t + a * (2 * d * i + -5 * i * i + 2 * d + 2 * i);
              },
            ],
            linear: [
              "linear",
              function (e, t, a, n) {
                return (a * e) / n + t;
              },
            ],
            "ease-in-quad": [
              "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
              function (e, t, a, n) {
                return a * (e /= n) * e + t;
              },
            ],
            "ease-out-quad": [
              "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
              function (e, t, a, n) {
                return -a * (e /= n) * (e - 2) + t;
              },
            ],
            "ease-in-out-quad": [
              "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
              function (e, t, a, n) {
                return (e /= n / 2) < 1
                  ? (a / 2) * e * e + t
                  : (-a / 2) * (--e * (e - 2) - 1) + t;
              },
            ],
            "ease-in-cubic": [
              "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
              function (e, t, a, n) {
                return a * (e /= n) * e * e + t;
              },
            ],
            "ease-out-cubic": [
              "cubic-bezier(0.215, 0.610, 0.355, 1)",
              function (e, t, a, n) {
                return a * ((e = e / n - 1) * e * e + 1) + t;
              },
            ],
            "ease-in-out-cubic": [
              "cubic-bezier(0.645, 0.045, 0.355, 1)",
              function (e, t, a, n) {
                return (e /= n / 2) < 1
                  ? (a / 2) * e * e * e + t
                  : (a / 2) * ((e -= 2) * e * e + 2) + t;
              },
            ],
            "ease-in-quart": [
              "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
              function (e, t, a, n) {
                return a * (e /= n) * e * e * e + t;
              },
            ],
            "ease-out-quart": [
              "cubic-bezier(0.165, 0.840, 0.440, 1)",
              function (e, t, a, n) {
                return -a * ((e = e / n - 1) * e * e * e - 1) + t;
              },
            ],
            "ease-in-out-quart": [
              "cubic-bezier(0.770, 0, 0.175, 1)",
              function (e, t, a, n) {
                return (e /= n / 2) < 1
                  ? (a / 2) * e * e * e * e + t
                  : (-a / 2) * ((e -= 2) * e * e * e - 2) + t;
              },
            ],
            "ease-in-quint": [
              "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
              function (e, t, a, n) {
                return a * (e /= n) * e * e * e * e + t;
              },
            ],
            "ease-out-quint": [
              "cubic-bezier(0.230, 1, 0.320, 1)",
              function (e, t, a, n) {
                return a * ((e = e / n - 1) * e * e * e * e + 1) + t;
              },
            ],
            "ease-in-out-quint": [
              "cubic-bezier(0.860, 0, 0.070, 1)",
              function (e, t, a, n) {
                return (e /= n / 2) < 1
                  ? (a / 2) * e * e * e * e * e + t
                  : (a / 2) * ((e -= 2) * e * e * e * e + 2) + t;
              },
            ],
            "ease-in-sine": [
              "cubic-bezier(0.470, 0, 0.745, 0.715)",
              function (e, t, a, n) {
                return -a * Math.cos((e / n) * (Math.PI / 2)) + a + t;
              },
            ],
            "ease-out-sine": [
              "cubic-bezier(0.390, 0.575, 0.565, 1)",
              function (e, t, a, n) {
                return a * Math.sin((e / n) * (Math.PI / 2)) + t;
              },
            ],
            "ease-in-out-sine": [
              "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
              function (e, t, a, n) {
                return (-a / 2) * (Math.cos((Math.PI * e) / n) - 1) + t;
              },
            ],
            "ease-in-expo": [
              "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
              function (e, t, a, n) {
                return 0 === e ? t : a * Math.pow(2, 10 * (e / n - 1)) + t;
              },
            ],
            "ease-out-expo": [
              "cubic-bezier(0.190, 1, 0.220, 1)",
              function (e, t, a, n) {
                return e === n
                  ? t + a
                  : a * (-Math.pow(2, (-10 * e) / n) + 1) + t;
              },
            ],
            "ease-in-out-expo": [
              "cubic-bezier(1, 0, 0, 1)",
              function (e, t, a, n) {
                return 0 === e
                  ? t
                  : e === n
                  ? t + a
                  : (e /= n / 2) < 1
                  ? (a / 2) * Math.pow(2, 10 * (e - 1)) + t
                  : (a / 2) * (-Math.pow(2, -10 * --e) + 2) + t;
              },
            ],
            "ease-in-circ": [
              "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
              function (e, t, a, n) {
                return -a * (Math.sqrt(1 - (e /= n) * e) - 1) + t;
              },
            ],
            "ease-out-circ": [
              "cubic-bezier(0.075, 0.820, 0.165, 1)",
              function (e, t, a, n) {
                return a * Math.sqrt(1 - (e = e / n - 1) * e) + t;
              },
            ],
            "ease-in-out-circ": [
              "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
              function (e, t, a, n) {
                return (e /= n / 2) < 1
                  ? (-a / 2) * (Math.sqrt(1 - e * e) - 1) + t
                  : (a / 2) * (Math.sqrt(1 - (e -= 2) * e) + 1) + t;
              },
            ],
            "ease-in-back": [
              "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
              function (e, t, a, n, i) {
                return (
                  void 0 === i && (i = 1.70158),
                  a * (e /= n) * e * ((i + 1) * e - i) + t
                );
              },
            ],
            "ease-out-back": [
              "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
              function (e, t, a, n, i) {
                return (
                  void 0 === i && (i = 1.70158),
                  a * ((e = e / n - 1) * e * ((i + 1) * e + i) + 1) + t
                );
              },
            ],
            "ease-in-out-back": [
              "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
              function (e, t, a, n, i) {
                return (
                  void 0 === i && (i = 1.70158),
                  (e /= n / 2) < 1
                    ? (a / 2) * e * e * (((i *= 1.525) + 1) * e - i) + t
                    : (a / 2) *
                        ((e -= 2) * e * (((i *= 1.525) + 1) * e + i) + 2) +
                      t
                );
              },
            ],
          },
          u = {
            "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
            "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
            "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)",
          },
          g = window,
          p = "bkwld-tram",
          b = /[\-\.0-9]/g,
          I = /[A-Z]/,
          T = "number",
          y = /^(rgb|#)/,
          E = /(em|cm|mm|in|pt|pc|px)$/,
          m = /(em|cm|mm|in|pt|pc|px|%)$/,
          O = /(deg|rad|turn)$/,
          S = "unitless",
          _ = /(all|none) 0s ease 0s/,
          R = /^(width|height)$/,
          L = document.createElement("a"),
          A = ["Webkit", "Moz", "O", "ms"],
          v = ["-webkit-", "-moz-", "-o-", "-ms-"],
          h = function (e) {
            if (e in L.style) return { dom: e, css: e };
            var t,
              a,
              n = "",
              i = e.split("-");
            for (t = 0; t < i.length; t++)
              n += i[t].charAt(0).toUpperCase() + i[t].slice(1);
            for (t = 0; t < A.length; t++)
              if ((a = A[t] + n) in L.style) return { dom: a, css: v[t] + e };
          },
          N = (t.support = {
            bind: Function.prototype.bind,
            transform: h("transform"),
            transition: h("transition"),
            backface: h("backface-visibility"),
            timing: h("transition-timing-function"),
          });
        if (N.transition) {
          var C = N.timing.dom;
          if (((L.style[C] = f["ease-in-back"][0]), !L.style[C]))
            for (var P in u) f[P][0] = u[P];
        }
        var U = (t.frame =
            (c =
              g.requestAnimationFrame ||
              g.webkitRequestAnimationFrame ||
              g.mozRequestAnimationFrame ||
              g.oRequestAnimationFrame ||
              g.msRequestAnimationFrame) && N.bind
              ? c.bind(g)
              : function (e) {
                  g.setTimeout(e, 16);
                }),
          G = (t.now =
            (l =
              (r = g.performance) &&
              (r.now || r.webkitNow || r.msNow || r.mozNow)) && N.bind
              ? l.bind(r)
              : Date.now ||
                function () {
                  return +new Date();
                }),
          V = s(function (t) {
            function a(e, t) {
              var a = (function (e) {
                  for (var t = -1, a = e ? e.length : 0, n = []; ++t < a; ) {
                    var i = e[t];
                    i && n.push(i);
                  }
                  return n;
                })(("" + e).split(" ")),
                n = a[0];
              t = t || {};
              var i = j[n];
              if (!i) return o("Unsupported property: " + n);
              if (!t.weak || !this.props[n]) {
                var d = i[0],
                  c = this.props[n];
                return (
                  c || (c = this.props[n] = new d.Bare()),
                  c.init(this.$el, a, i, t),
                  c
                );
              }
            }
            function n(e, t, n) {
              if (e) {
                var o = typeof e;
                if (
                  (t ||
                    (this.timer && this.timer.destroy(),
                    (this.queue = []),
                    (this.active = !1)),
                  "number" == o && t)
                )
                  return (
                    (this.timer = new X({
                      duration: e,
                      context: this,
                      complete: i,
                    })),
                    void (this.active = !0)
                  );
                if ("string" == o && t) {
                  switch (e) {
                    case "hide":
                      r.call(this);
                      break;
                    case "stop":
                      c.call(this);
                      break;
                    case "redraw":
                      l.call(this);
                      break;
                    default:
                      a.call(this, e, n && n[1]);
                  }
                  return i.call(this);
                }
                if ("function" == o) return void e.call(this, this);
                if ("object" == o) {
                  var u = 0;
                  f.call(
                    this,
                    e,
                    function (e, t) {
                      e.span > u && (u = e.span), e.stop(), e.animate(t);
                    },
                    function (e) {
                      "wait" in e && (u = d(e.wait, 0));
                    }
                  ),
                    s.call(this),
                    u > 0 &&
                      ((this.timer = new X({ duration: u, context: this })),
                      (this.active = !0),
                      t && (this.timer.complete = i));
                  var g = this,
                    p = !1,
                    b = {};
                  U(function () {
                    f.call(g, e, function (e) {
                      e.active && ((p = !0), (b[e.name] = e.nextStyle));
                    }),
                      p && g.$el.css(b);
                  });
                }
              }
            }
            function i() {
              if (
                (this.timer && this.timer.destroy(),
                (this.active = !1),
                this.queue.length)
              ) {
                var e = this.queue.shift();
                n.call(this, e.options, !0, e.args);
              }
            }
            function c(e) {
              var t;
              this.timer && this.timer.destroy(),
                (this.queue = []),
                (this.active = !1),
                "string" == typeof e
                  ? ((t = {})[e] = 1)
                  : (t = "object" == typeof e && null != e ? e : this.props),
                f.call(this, t, u),
                s.call(this);
            }
            function r() {
              c.call(this), (this.el.style.display = "none");
            }
            function l() {
              this.el.offsetHeight;
            }
            function s() {
              var e,
                t,
                a = [];
              for (e in (this.upstream && a.push(this.upstream), this.props))
                (t = this.props[e]).active && a.push(t.string);
              (a = a.join(",")),
                this.style !== a &&
                  ((this.style = a), (this.el.style[N.transition.dom] = a));
            }
            function f(e, t, n) {
              var i,
                d,
                o,
                c,
                r = t !== u,
                l = {};
              for (i in e)
                (o = e[i]),
                  i in W
                    ? (l.transform || (l.transform = {}), (l.transform[i] = o))
                    : (I.test(i) &&
                        (i = i.replace(/[A-Z]/g, function (e) {
                          return "-" + e.toLowerCase();
                        })),
                      i in j ? (l[i] = o) : (c || (c = {}), (c[i] = o)));
              for (i in l) {
                if (((o = l[i]), !(d = this.props[i]))) {
                  if (!r) continue;
                  d = a.call(this, i);
                }
                t.call(this, d, o);
              }
              n && c && n.call(this, c);
            }
            function u(e) {
              e.stop();
            }
            function g(e, t) {
              e.set(t);
            }
            function b(e) {
              this.$el.css(e);
            }
            function T(e, a) {
              t[e] = function () {
                return this.children
                  ? y.call(this, a, arguments)
                  : (this.el && a.apply(this, arguments), this);
              };
            }
            function y(e, t) {
              var a,
                n = this.children.length;
              for (a = 0; n > a; a++) e.apply(this.children[a], t);
              return this;
            }
            (t.init = function (t) {
              if (
                ((this.$el = e(t)),
                (this.el = this.$el[0]),
                (this.props = {}),
                (this.queue = []),
                (this.style = ""),
                (this.active = !1),
                Q.keepInherited && !Q.fallback)
              ) {
                var a = H(this.el, "transition");
                a && !_.test(a) && (this.upstream = a);
              }
              N.backface &&
                Q.hideBackface &&
                B(this.el, N.backface.css, "hidden");
            }),
              T("add", a),
              T("start", n),
              T("wait", function (e) {
                (e = d(e, 0)),
                  this.active
                    ? this.queue.push({ options: e })
                    : ((this.timer = new X({
                        duration: e,
                        context: this,
                        complete: i,
                      })),
                      (this.active = !0));
              }),
              T("then", function (e) {
                return this.active
                  ? (this.queue.push({ options: e, args: arguments }),
                    void (this.timer.complete = i))
                  : o(
                      "No active transition timer. Use start() or wait() before then()."
                    );
              }),
              T("next", i),
              T("stop", c),
              T("set", function (e) {
                c.call(this, e), f.call(this, e, g, b);
              }),
              T("show", function (e) {
                "string" != typeof e && (e = "block"),
                  (this.el.style.display = e);
              }),
              T("hide", r),
              T("redraw", l),
              T("destroy", function () {
                c.call(this),
                  e.removeData(this.el, p),
                  (this.$el = this.el = null);
              });
          }),
          M = s(V, function (t) {
            function a(t, a) {
              var n = e.data(t, p) || e.data(t, p, new V.Bare());
              return n.el || n.init(t), a ? n.start(a) : n;
            }
            t.init = function (t, n) {
              var i = e(t);
              if (!i.length) return this;
              if (1 === i.length) return a(i[0], n);
              var d = [];
              return (
                i.each(function (e, t) {
                  d.push(a(t, n));
                }),
                (this.children = d),
                this
              );
            };
          }),
          x = s(function (e) {
            function t() {
              var e = this.get();
              this.update("auto");
              var t = this.get();
              return this.update(e), t;
            }
            (e.init = function (e, t, a, n) {
              (this.$el = e), (this.el = e[0]);
              var i,
                o,
                c,
                r = t[0];
              a[2] && (r = a[2]),
                z[r] && (r = z[r]),
                (this.name = r),
                (this.type = a[1]),
                (this.duration = d(t[1], this.duration, 500)),
                (this.ease =
                  ((i = t[2]),
                  (o = this.ease),
                  (c = "ease"),
                  void 0 !== o && (c = o),
                  i in f ? i : c)),
                (this.delay = d(t[3], this.delay, 0)),
                (this.span = this.duration + this.delay),
                (this.active = !1),
                (this.nextStyle = null),
                (this.auto = R.test(this.name)),
                (this.unit = n.unit || this.unit || Q.defaultUnit),
                (this.angle = n.angle || this.angle || Q.defaultAngle),
                Q.fallback || n.fallback
                  ? (this.animate = this.fallback)
                  : ((this.animate = this.transition),
                    (this.string =
                      this.name +
                      " " +
                      this.duration +
                      "ms" +
                      ("ease" != this.ease ? " " + f[this.ease][0] : "") +
                      (this.delay ? " " + this.delay + "ms" : "")));
            }),
              (e.set = function (e) {
                (e = this.convert(e, this.type)), this.update(e), this.redraw();
              }),
              (e.transition = function (e) {
                (this.active = !0),
                  (e = this.convert(e, this.type)),
                  this.auto &&
                    ("auto" == this.el.style[this.name] &&
                      (this.update(this.get()), this.redraw()),
                    "auto" == e && (e = t.call(this))),
                  (this.nextStyle = e);
              }),
              (e.fallback = function (e) {
                var a =
                  this.el.style[this.name] ||
                  this.convert(this.get(), this.type);
                (e = this.convert(e, this.type)),
                  this.auto &&
                    ("auto" == a && (a = this.convert(this.get(), this.type)),
                    "auto" == e && (e = t.call(this))),
                  (this.tween = new D({
                    from: a,
                    to: e,
                    duration: this.duration,
                    delay: this.delay,
                    ease: this.ease,
                    update: this.update,
                    context: this,
                  }));
              }),
              (e.get = function () {
                return H(this.el, this.name);
              }),
              (e.update = function (e) {
                B(this.el, this.name, e);
              }),
              (e.stop = function () {
                (this.active || this.nextStyle) &&
                  ((this.active = !1),
                  (this.nextStyle = null),
                  B(this.el, this.name, this.get()));
                var e = this.tween;
                e && e.context && e.destroy();
              }),
              (e.convert = function (e, t) {
                if ("auto" == e && this.auto) return e;
                var a,
                  i,
                  d = "number" == typeof e,
                  c = "string" == typeof e;
                switch (t) {
                  case T:
                    if (d) return e;
                    if (c && "" === e.replace(b, "")) return +e;
                    i = "number(unitless)";
                    break;
                  case y:
                    if (c) {
                      if ("" === e && this.original) return this.original;
                      if (t.test(e))
                        return "#" == e.charAt(0) && 7 == e.length
                          ? e
                          : ((a = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(e))
                              ? n(a[1], a[2], a[3])
                              : e
                            ).replace(/#(\w)(\w)(\w)$/, "#$1$1$2$2$3$3");
                    }
                    i = "hex or rgb string";
                    break;
                  case E:
                    if (d) return e + this.unit;
                    if (c && t.test(e)) return e;
                    i = "number(px) or string(unit)";
                    break;
                  case m:
                    if (d) return e + this.unit;
                    if (c && t.test(e)) return e;
                    i = "number(px) or string(unit or %)";
                    break;
                  case O:
                    if (d) return e + this.angle;
                    if (c && t.test(e)) return e;
                    i = "number(deg) or string(angle)";
                    break;
                  case S:
                    if (d || (c && m.test(e))) return e;
                    i = "number(unitless) or string(unit or %)";
                }
                return (
                  o(
                    "Type warning: Expected: [" +
                      i +
                      "] Got: [" +
                      typeof e +
                      "] " +
                      e
                  ),
                  e
                );
              }),
              (e.redraw = function () {
                this.el.offsetHeight;
              });
          }),
          w = s(x, function (e, t) {
            e.init = function () {
              t.init.apply(this, arguments),
                this.original || (this.original = this.convert(this.get(), y));
            };
          }),
          F = s(x, function (e, t) {
            (e.init = function () {
              t.init.apply(this, arguments), (this.animate = this.fallback);
            }),
              (e.get = function () {
                return this.$el[this.name]();
              }),
              (e.update = function (e) {
                this.$el[this.name](e);
              });
          }),
          k = s(x, function (e, t) {
            function a(e, t) {
              var a, n, i, d, o;
              for (a in e)
                (i = (d = W[a])[0]),
                  (n = d[1] || a),
                  (o = this.convert(e[a], i)),
                  t.call(this, n, o, i);
            }
            (e.init = function () {
              t.init.apply(this, arguments),
                this.current ||
                  ((this.current = {}),
                  W.perspective &&
                    Q.perspective &&
                    ((this.current.perspective = Q.perspective),
                    B(this.el, this.name, this.style(this.current)),
                    this.redraw()));
            }),
              (e.set = function (e) {
                a.call(this, e, function (e, t) {
                  this.current[e] = t;
                }),
                  B(this.el, this.name, this.style(this.current)),
                  this.redraw();
              }),
              (e.transition = function (e) {
                var t = this.values(e);
                this.tween = new Y({
                  current: this.current,
                  values: t,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                });
                var a,
                  n = {};
                for (a in this.current) n[a] = a in t ? t[a] : this.current[a];
                (this.active = !0), (this.nextStyle = this.style(n));
              }),
              (e.fallback = function (e) {
                var t = this.values(e);
                this.tween = new Y({
                  current: this.current,
                  values: t,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                  update: this.update,
                  context: this,
                });
              }),
              (e.update = function () {
                B(this.el, this.name, this.style(this.current));
              }),
              (e.style = function (e) {
                var t,
                  a = "";
                for (t in e) a += t + "(" + e[t] + ") ";
                return a;
              }),
              (e.values = function (e) {
                var t,
                  n = {};
                return (
                  a.call(this, e, function (e, a, i) {
                    (n[e] = a),
                      void 0 === this.current[e] &&
                        ((t = 0),
                        ~e.indexOf("scale") && (t = 1),
                        (this.current[e] = this.convert(t, i)));
                  }),
                  n
                );
              });
          }),
          D = s(function (t) {
            function d() {
              var e,
                t,
                a,
                n = r.length;
              if (n)
                for (U(d), t = G(), e = n; e--; ) (a = r[e]) && a.render(t);
            }
            var c = { ease: f.ease[1], from: 0, to: 1 };
            (t.init = function (e) {
              (this.duration = e.duration || 0), (this.delay = e.delay || 0);
              var t = e.ease || c.ease;
              f[t] && (t = f[t][1]),
                "function" != typeof t && (t = c.ease),
                (this.ease = t),
                (this.update = e.update || i),
                (this.complete = e.complete || i),
                (this.context = e.context || this),
                (this.name = e.name);
              var a = e.from,
                n = e.to;
              void 0 === a && (a = c.from),
                void 0 === n && (n = c.to),
                (this.unit = e.unit || ""),
                "number" == typeof a && "number" == typeof n
                  ? ((this.begin = a), (this.change = n - a))
                  : this.format(n, a),
                (this.value = this.begin + this.unit),
                (this.start = G()),
                !1 !== e.autoplay && this.play();
            }),
              (t.play = function () {
                this.active ||
                  (this.start || (this.start = G()),
                  (this.active = !0),
                  1 === r.push(this) && U(d));
              }),
              (t.stop = function () {
                var t, a;
                this.active &&
                  ((this.active = !1),
                  (a = e.inArray(this, r)) >= 0 &&
                    ((t = r.slice(a + 1)),
                    (r.length = a),
                    t.length && (r = r.concat(t))));
              }),
              (t.render = function (e) {
                var t,
                  a = e - this.start;
                if (this.delay) {
                  if (a <= this.delay) return;
                  a -= this.delay;
                }
                if (a < this.duration) {
                  var i,
                    d,
                    o = this.ease(a, 0, 1, this.duration);
                  return (
                    (t = this.startRGB
                      ? ((i = this.startRGB),
                        (d = this.endRGB),
                        n(
                          i[0] + o * (d[0] - i[0]),
                          i[1] + o * (d[1] - i[1]),
                          i[2] + o * (d[2] - i[2])
                        ))
                      : Math.round((this.begin + o * this.change) * l) / l),
                    (this.value = t + this.unit),
                    void this.update.call(this.context, this.value)
                  );
                }
                (t = this.endHex || this.begin + this.change),
                  (this.value = t + this.unit),
                  this.update.call(this.context, this.value),
                  this.complete.call(this.context),
                  this.destroy();
              }),
              (t.format = function (e, t) {
                if (((t += ""), "#" == (e += "").charAt(0)))
                  return (
                    (this.startRGB = a(t)),
                    (this.endRGB = a(e)),
                    (this.endHex = e),
                    (this.begin = 0),
                    void (this.change = 1)
                  );
                if (!this.unit) {
                  var n = t.replace(b, "");
                  n !== e.replace(b, "") &&
                    o("Units do not match [tween]: " + t + ", " + e),
                    (this.unit = n);
                }
                (t = parseFloat(t)),
                  (e = parseFloat(e)),
                  (this.begin = this.value = t),
                  (this.change = e - t);
              }),
              (t.destroy = function () {
                this.stop(),
                  (this.context = null),
                  (this.ease = this.update = this.complete = i);
              });
            var r = [],
              l = 1e3;
          }),
          X = s(D, function (e) {
            (e.init = function (e) {
              (this.duration = e.duration || 0),
                (this.complete = e.complete || i),
                (this.context = e.context),
                this.play();
            }),
              (e.render = function (e) {
                e - this.start < this.duration ||
                  (this.complete.call(this.context), this.destroy());
              });
          }),
          Y = s(D, function (e, t) {
            (e.init = function (e) {
              var t, a;
              for (t in ((this.context = e.context),
              (this.update = e.update),
              (this.tweens = []),
              (this.current = e.current),
              e.values))
                (a = e.values[t]),
                  this.current[t] !== a &&
                    this.tweens.push(
                      new D({
                        name: t,
                        from: this.current[t],
                        to: a,
                        duration: e.duration,
                        delay: e.delay,
                        ease: e.ease,
                        autoplay: !1,
                      })
                    );
              this.play();
            }),
              (e.render = function (e) {
                var t,
                  a,
                  n = this.tweens.length,
                  i = !1;
                for (t = n; t--; )
                  (a = this.tweens[t]).context &&
                    (a.render(e), (this.current[a.name] = a.value), (i = !0));
                return i
                  ? void (this.update && this.update.call(this.context))
                  : this.destroy();
              }),
              (e.destroy = function () {
                if ((t.destroy.call(this), this.tweens)) {
                  var e;
                  for (e = this.tweens.length; e--; ) this.tweens[e].destroy();
                  (this.tweens = null), (this.current = null);
                }
              });
          }),
          Q = (t.config = {
            debug: !1,
            defaultUnit: "px",
            defaultAngle: "deg",
            keepInherited: !1,
            hideBackface: !1,
            perspective: "",
            fallback: !N.transition,
            agentTests: [],
          });
        (t.fallback = function (e) {
          if (!N.transition) return (Q.fallback = !0);
          Q.agentTests.push("(" + e + ")");
          var t = RegExp(Q.agentTests.join("|"), "i");
          Q.fallback = t.test(navigator.userAgent);
        }),
          t.fallback("6.0.[2-5] Safari"),
          (t.tween = function (e) {
            return new D(e);
          }),
          (t.delay = function (e, t, a) {
            return new X({ complete: t, duration: e, context: a });
          }),
          (e.fn.tram = function (e) {
            return t.call(null, this, e);
          });
        var B = e.style,
          H = e.css,
          z = { transform: N.transform && N.transform.css },
          j = {
            color: [w, y],
            background: [w, y, "background-color"],
            "outline-color": [w, y],
            "border-color": [w, y],
            "border-top-color": [w, y],
            "border-right-color": [w, y],
            "border-bottom-color": [w, y],
            "border-left-color": [w, y],
            "border-width": [x, E],
            "border-top-width": [x, E],
            "border-right-width": [x, E],
            "border-bottom-width": [x, E],
            "border-left-width": [x, E],
            "border-spacing": [x, E],
            "letter-spacing": [x, E],
            margin: [x, E],
            "margin-top": [x, E],
            "margin-right": [x, E],
            "margin-bottom": [x, E],
            "margin-left": [x, E],
            padding: [x, E],
            "padding-top": [x, E],
            "padding-right": [x, E],
            "padding-bottom": [x, E],
            "padding-left": [x, E],
            "outline-width": [x, E],
            opacity: [x, T],
            top: [x, m],
            right: [x, m],
            bottom: [x, m],
            left: [x, m],
            "font-size": [x, m],
            "text-indent": [x, m],
            "word-spacing": [x, m],
            width: [x, m],
            "min-width": [x, m],
            "max-width": [x, m],
            height: [x, m],
            "min-height": [x, m],
            "max-height": [x, m],
            "line-height": [x, S],
            "scroll-top": [F, T, "scrollTop"],
            "scroll-left": [F, T, "scrollLeft"],
          },
          W = {};
        N.transform &&
          ((j.transform = [k]),
          (W = {
            x: [m, "translateX"],
            y: [m, "translateY"],
            rotate: [O],
            rotateX: [O],
            rotateY: [O],
            scale: [T],
            scaleX: [T],
            scaleY: [T],
            skew: [O],
            skewX: [O],
            skewY: [O],
          })),
          N.transform &&
            N.backface &&
            ((W.z = [m, "translateZ"]),
            (W.rotateZ = [O]),
            (W.scaleZ = [T]),
            (W.perspective = [E]));
        var q = /ms/,
          $ = /s|\./;
        return (e.tram = t);
      })(window.jQuery);
    },
    5756: function (e, t, a) {
      "use strict";
      var n,
        i,
        d,
        o,
        c,
        r,
        l,
        s,
        f,
        u,
        g,
        p,
        b,
        I,
        T,
        y,
        E,
        m,
        O,
        S,
        _ = window.$,
        R = a(5487) && _.tram;
      ((n = {}).VERSION = "1.6.0-Webflow"),
        (i = {}),
        (d = Array.prototype),
        (o = Object.prototype),
        (c = Function.prototype),
        d.push,
        (r = d.slice),
        d.concat,
        o.toString,
        (l = o.hasOwnProperty),
        (s = d.forEach),
        (f = d.map),
        d.reduce,
        d.reduceRight,
        (u = d.filter),
        d.every,
        (g = d.some),
        (p = d.indexOf),
        d.lastIndexOf,
        (b = Object.keys),
        c.bind,
        (I =
          n.each =
          n.forEach =
            function (e, t, a) {
              if (null == e) return e;
              if (s && e.forEach === s) e.forEach(t, a);
              else if (e.length === +e.length) {
                for (var d = 0, o = e.length; d < o; d++)
                  if (t.call(a, e[d], d, e) === i) return;
              } else
                for (var c = n.keys(e), d = 0, o = c.length; d < o; d++)
                  if (t.call(a, e[c[d]], c[d], e) === i) return;
              return e;
            }),
        (n.map = n.collect =
          function (e, t, a) {
            var n = [];
            return null == e
              ? n
              : f && e.map === f
              ? e.map(t, a)
              : (I(e, function (e, i, d) {
                  n.push(t.call(a, e, i, d));
                }),
                n);
          }),
        (n.find = n.detect =
          function (e, t, a) {
            var n;
            return (
              T(e, function (e, i, d) {
                if (t.call(a, e, i, d)) return (n = e), !0;
              }),
              n
            );
          }),
        (n.filter = n.select =
          function (e, t, a) {
            var n = [];
            return null == e
              ? n
              : u && e.filter === u
              ? e.filter(t, a)
              : (I(e, function (e, i, d) {
                  t.call(a, e, i, d) && n.push(e);
                }),
                n);
          }),
        (T =
          n.some =
          n.any =
            function (e, t, a) {
              t || (t = n.identity);
              var d = !1;
              return null == e
                ? d
                : g && e.some === g
                ? e.some(t, a)
                : (I(e, function (e, n, o) {
                    if (d || (d = t.call(a, e, n, o))) return i;
                  }),
                  !!d);
            }),
        (n.contains = n.include =
          function (e, t) {
            return (
              null != e &&
              (p && e.indexOf === p
                ? -1 != e.indexOf(t)
                : T(e, function (e) {
                    return e === t;
                  }))
            );
          }),
        (n.delay = function (e, t) {
          var a = r.call(arguments, 2);
          return setTimeout(function () {
            return e.apply(null, a);
          }, t);
        }),
        (n.defer = function (e) {
          return n.delay.apply(n, [e, 1].concat(r.call(arguments, 1)));
        }),
        (n.throttle = function (e) {
          var t, a, n;
          return function () {
            t ||
              ((t = !0),
              (a = arguments),
              (n = this),
              R.frame(function () {
                (t = !1), e.apply(n, a);
              }));
          };
        }),
        (n.debounce = function (e, t, a) {
          var i,
            d,
            o,
            c,
            r,
            l = function () {
              var s = n.now() - c;
              s < t
                ? (i = setTimeout(l, t - s))
                : ((i = null), a || ((r = e.apply(o, d)), (o = d = null)));
            };
          return function () {
            (o = this), (d = arguments), (c = n.now());
            var s = a && !i;
            return (
              i || (i = setTimeout(l, t)),
              s && ((r = e.apply(o, d)), (o = d = null)),
              r
            );
          };
        }),
        (n.defaults = function (e) {
          if (!n.isObject(e)) return e;
          for (var t = 1, a = arguments.length; t < a; t++) {
            var i = arguments[t];
            for (var d in i) void 0 === e[d] && (e[d] = i[d]);
          }
          return e;
        }),
        (n.keys = function (e) {
          if (!n.isObject(e)) return [];
          if (b) return b(e);
          var t = [];
          for (var a in e) n.has(e, a) && t.push(a);
          return t;
        }),
        (n.has = function (e, t) {
          return l.call(e, t);
        }),
        (n.isObject = function (e) {
          return e === Object(e);
        }),
        (n.now =
          Date.now ||
          function () {
            return new Date().getTime();
          }),
        (n.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g,
        }),
        (y = /(.)^/),
        (E = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029",
        }),
        (m = /\\|'|\r|\n|\u2028|\u2029/g),
        (O = function (e) {
          return "\\" + E[e];
        }),
        (S = /^\s*(\w|\$)+\s*$/),
        (n.template = function (e, t, a) {
          !t && a && (t = a);
          var i,
            d = RegExp(
              [
                ((t = n.defaults({}, t, n.templateSettings)).escape || y)
                  .source,
                (t.interpolate || y).source,
                (t.evaluate || y).source,
              ].join("|") + "|$",
              "g"
            ),
            o = 0,
            c = "__p+='";
          e.replace(d, function (t, a, n, i, d) {
            return (
              (c += e.slice(o, d).replace(m, O)),
              (o = d + t.length),
              a
                ? (c += "'+\n((__t=(" + a + "))==null?'':_.escape(__t))+\n'")
                : n
                ? (c += "'+\n((__t=(" + n + "))==null?'':__t)+\n'")
                : i && (c += "';\n" + i + "\n__p+='"),
              t
            );
          }),
            (c += "';\n");
          var r = t.variable;
          if (r) {
            if (!S.test(r))
              throw Error("variable is not a bare identifier: " + r);
          } else (c = "with(obj||{}){\n" + c + "}\n"), (r = "obj");
          c =
            "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" +
            c +
            "return __p;\n";
          try {
            i = Function(t.variable || "obj", "_", c);
          } catch (e) {
            throw ((e.source = c), e);
          }
          var l = function (e) {
            return i.call(this, e, n);
          };
          return (l.source = "function(" + r + "){\n" + c + "}"), l;
        }),
        (e.exports = n);
    },
    9461: function (e, t, a) {
      "use strict";
      var n = a(3949);
      n.define(
        "brand",
        (e.exports = function (e) {
          var t,
            a = {},
            i = document,
            d = e("html"),
            o = e("body"),
            c = window.location,
            r = /PhantomJS/i.test(navigator.userAgent),
            l =
              "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange";
          function s() {
            var a =
              i.fullScreen ||
              i.mozFullScreen ||
              i.webkitIsFullScreen ||
              i.msFullscreenElement ||
              !!i.webkitFullscreenElement;
            e(t).attr("style", a ? "display: none !important;" : "");
          }
          function f() {
            var e = o.children(".w-webflow-badge"),
              a = e.length && e.get(0) === t,
              i = n.env("editor");
            if (a) {
              i && e.remove();
              return;
            }
            e.length && e.remove(), i || o.append(t);
          }
          return (
            (a.ready = function () {
              var a,
                n,
                o,
                u = d.attr("data-wf-status"),
                g = d.attr("data-wf-domain") || "";
              /\.webflow\.io$/i.test(g) && c.hostname !== g && (u = !0),
                u &&
                  !r &&
                  ((t =
                    t ||
                    ((a = e('<a class="w-webflow-badge"></a>').attr(
                      "href",
                      "https://webflow.com?utm_campaign=brandjs"
                    )),
                    (n = e("<img>")
                      .attr(
                        "src",
                        "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-icon-d2.89e12c322e.svg"
                      )
                      .attr("alt", "")
                      .css({ marginRight: "4px", width: "26px" })),
                    (o = e("<img>")
                      .attr(
                        "src",
                        "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-text-d2.c82cec3b78.svg"
                      )
                      .attr("alt", "Made in Webflow")),
                    a.append(n, o),
                    a[0])),
                  f(),
                  setTimeout(f, 500),
                  e(i).off(l, s).on(l, s));
            }),
            a
          );
        })
      );
    },
    322: function (e, t, a) {
      "use strict";
      var n = a(3949);
      n.define(
        "edit",
        (e.exports = function (e, t, a) {
          if (
            ((a = a || {}),
            (n.env("test") || n.env("frame")) &&
              !a.fixture &&
              !(function () {
                try {
                  return !!(window.top.__Cypress__ || window.PLAYWRIGHT_TEST);
                } catch (e) {
                  return !1;
                }
              })())
          )
            return { exit: 1 };
          var i,
            d = e(window),
            o = e(document.documentElement),
            c = document.location,
            r = "hashchange",
            l =
              a.load ||
              function () {
                var t, a, n;
                (i = !0),
                  (window.WebflowEditor = !0),
                  d.off(r, f),
                  (t = function (t) {
                    var a;
                    e.ajax({
                      url: g("https://editor-api.webflow.com/api/editor/view"),
                      data: { siteId: o.attr("data-wf-site") },
                      xhrFields: { withCredentials: !0 },
                      dataType: "json",
                      crossDomain: !0,
                      success:
                        ((a = t),
                        function (t) {
                          var n, i, d;
                          if (!t)
                            return void console.error(
                              "Could not load editor data"
                            );
                          (t.thirdPartyCookiesSupported = a),
                            (i =
                              (n = t.scriptPath).indexOf("//") >= 0
                                ? n
                                : g("https://editor-api.webflow.com" + n)),
                            (d = function () {
                              window.WebflowEditor(t);
                            }),
                            e
                              .ajax({
                                type: "GET",
                                url: i,
                                dataType: "script",
                                cache: !0,
                              })
                              .then(d, u);
                        }),
                    });
                  }),
                  ((a = window.document.createElement("iframe")).src =
                    "https://webflow.com/site/third-party-cookie-check.html"),
                  (a.style.display = "none"),
                  (a.sandbox = "allow-scripts allow-same-origin"),
                  (n = function (e) {
                    "WF_third_party_cookies_unsupported" === e.data
                      ? (p(a, n), t(!1))
                      : "WF_third_party_cookies_supported" === e.data &&
                        (p(a, n), t(!0));
                  }),
                  (a.onerror = function () {
                    p(a, n), t(!1);
                  }),
                  window.addEventListener("message", n, !1),
                  window.document.body.appendChild(a);
              },
            s = !1;
          try {
            s =
              localStorage &&
              localStorage.getItem &&
              localStorage.getItem("WebflowEditor");
          } catch (e) {}
          function f() {
            !i && /\?edit/.test(c.hash) && l();
          }
          function u(e, t, a) {
            throw (console.error("Could not load editor script: " + t), a);
          }
          function g(e) {
            return e.replace(/([^:])\/\//g, "$1/");
          }
          function p(e, t) {
            window.removeEventListener("message", t, !1), e.remove();
          }
          return (
            s
              ? l()
              : c.search
              ? (/[?&](edit)(?:[=&?]|$)/.test(c.search) ||
                  /\?edit$/.test(c.href)) &&
                l()
              : d.on(r, f).triggerHandler(r),
            {}
          );
        })
      );
    },
    2338: function (e, t, a) {
      "use strict";
      a(3949).define(
        "focus-visible",
        (e.exports = function () {
          return {
            ready: function () {
              if ("undefined" != typeof document)
                try {
                  document.querySelector(":focus-visible");
                } catch (e) {
                  !(function (e) {
                    var t = !0,
                      a = !1,
                      n = null,
                      i = {
                        text: !0,
                        search: !0,
                        url: !0,
                        tel: !0,
                        email: !0,
                        password: !0,
                        number: !0,
                        date: !0,
                        month: !0,
                        week: !0,
                        time: !0,
                        datetime: !0,
                        "datetime-local": !0,
                      };
                    function d(e) {
                      return (
                        !!e &&
                        e !== document &&
                        "HTML" !== e.nodeName &&
                        "BODY" !== e.nodeName &&
                        "classList" in e &&
                        "contains" in e.classList
                      );
                    }
                    function o(e) {
                      e.getAttribute("data-wf-focus-visible") ||
                        e.setAttribute("data-wf-focus-visible", "true");
                    }
                    function c() {
                      t = !1;
                    }
                    function r() {
                      document.addEventListener("mousemove", l),
                        document.addEventListener("mousedown", l),
                        document.addEventListener("mouseup", l),
                        document.addEventListener("pointermove", l),
                        document.addEventListener("pointerdown", l),
                        document.addEventListener("pointerup", l),
                        document.addEventListener("touchmove", l),
                        document.addEventListener("touchstart", l),
                        document.addEventListener("touchend", l);
                    }
                    function l(e) {
                      (e.target.nodeName &&
                        "html" === e.target.nodeName.toLowerCase()) ||
                        ((t = !1),
                        document.removeEventListener("mousemove", l),
                        document.removeEventListener("mousedown", l),
                        document.removeEventListener("mouseup", l),
                        document.removeEventListener("pointermove", l),
                        document.removeEventListener("pointerdown", l),
                        document.removeEventListener("pointerup", l),
                        document.removeEventListener("touchmove", l),
                        document.removeEventListener("touchstart", l),
                        document.removeEventListener("touchend", l));
                    }
                    document.addEventListener(
                      "keydown",
                      function (a) {
                        a.metaKey ||
                          a.altKey ||
                          a.ctrlKey ||
                          (d(e.activeElement) && o(e.activeElement), (t = !0));
                      },
                      !0
                    ),
                      document.addEventListener("mousedown", c, !0),
                      document.addEventListener("pointerdown", c, !0),
                      document.addEventListener("touchstart", c, !0),
                      document.addEventListener(
                        "visibilitychange",
                        function () {
                          "hidden" === document.visibilityState &&
                            (a && (t = !0), r());
                        },
                        !0
                      ),
                      r(),
                      e.addEventListener(
                        "focus",
                        function (e) {
                          if (d(e.target)) {
                            var a, n, c;
                            (t ||
                              ((n = (a = e.target).type),
                              ("INPUT" === (c = a.tagName) &&
                                i[n] &&
                                !a.readOnly) ||
                                ("TEXTAREA" === c && !a.readOnly) ||
                                a.isContentEditable ||
                                0)) &&
                              o(e.target);
                          }
                        },
                        !0
                      ),
                      e.addEventListener(
                        "blur",
                        function (e) {
                          if (
                            d(e.target) &&
                            e.target.hasAttribute("data-wf-focus-visible")
                          ) {
                            var t;
                            (a = !0),
                              window.clearTimeout(n),
                              (n = window.setTimeout(function () {
                                a = !1;
                              }, 100)),
                              (t = e.target).getAttribute(
                                "data-wf-focus-visible"
                              ) && t.removeAttribute("data-wf-focus-visible");
                          }
                        },
                        !0
                      );
                  })(document);
                }
            },
          };
        })
      );
    },
    8334: function (e, t, a) {
      "use strict";
      var n = a(3949);
      n.define(
        "focus",
        (e.exports = function () {
          var e = [],
            t = !1;
          function a(a) {
            t &&
              (a.preventDefault(),
              a.stopPropagation(),
              a.stopImmediatePropagation(),
              e.unshift(a));
          }
          function i(a) {
            var n, i;
            (i = (n = a.target).tagName),
              ((/^a$/i.test(i) && null != n.href) ||
                (/^(button|textarea)$/i.test(i) && !0 !== n.disabled) ||
                (/^input$/i.test(i) &&
                  /^(button|reset|submit|radio|checkbox)$/i.test(n.type) &&
                  !n.disabled) ||
                (!/^(button|input|textarea|select|a)$/i.test(i) &&
                  !Number.isNaN(Number.parseFloat(n.tabIndex))) ||
                /^audio$/i.test(i) ||
                (/^video$/i.test(i) && !0 === n.controls)) &&
                ((t = !0),
                setTimeout(() => {
                  for (t = !1, a.target.focus(); e.length > 0; ) {
                    var n = e.pop();
                    n.target.dispatchEvent(new MouseEvent(n.type, n));
                  }
                }, 0));
          }
          return {
            ready: function () {
              "undefined" != typeof document &&
                document.body.hasAttribute("data-wf-focus-within") &&
                n.env.safari &&
                (document.addEventListener("mousedown", i, !0),
                document.addEventListener("mouseup", a, !0),
                document.addEventListener("click", a, !0));
            },
          };
        })
      );
    },
    7199: function (e) {
      "use strict";
      var t = window.jQuery,
        a = {},
        n = [],
        i = ".w-ix",
        d = {
          reset: function (e, t) {
            t.__wf_intro = null;
          },
          intro: function (e, n) {
            n.__wf_intro ||
              ((n.__wf_intro = !0), t(n).triggerHandler(a.types.INTRO));
          },
          outro: function (e, n) {
            n.__wf_intro &&
              ((n.__wf_intro = null), t(n).triggerHandler(a.types.OUTRO));
          },
        };
      (a.triggers = {}),
        (a.types = { INTRO: "w-ix-intro" + i, OUTRO: "w-ix-outro" + i }),
        (a.init = function () {
          for (var e = n.length, i = 0; i < e; i++) {
            var o = n[i];
            o[0](0, o[1]);
          }
          (n = []), t.extend(a.triggers, d);
        }),
        (a.async = function () {
          for (var e in d) {
            var t = d[e];
            d.hasOwnProperty(e) &&
              (a.triggers[e] = function (e, a) {
                n.push([t, a]);
              });
          }
        }),
        a.async(),
        (e.exports = a);
    },
    5134: function (e, t, a) {
      "use strict";
      var n = a(7199);
      function i(e, t) {
        var a = document.createEvent("CustomEvent");
        a.initCustomEvent(t, !0, !0, null), e.dispatchEvent(a);
      }
      var d = window.jQuery,
        o = {},
        c = ".w-ix";
      (o.triggers = {}),
        (o.types = { INTRO: "w-ix-intro" + c, OUTRO: "w-ix-outro" + c }),
        d.extend(o.triggers, {
          reset: function (e, t) {
            n.triggers.reset(e, t);
          },
          intro: function (e, t) {
            n.triggers.intro(e, t), i(t, "COMPONENT_ACTIVE");
          },
          outro: function (e, t) {
            n.triggers.outro(e, t), i(t, "COMPONENT_INACTIVE");
          },
        }),
        (e.exports = o);
    },
    941: function (e, t, a) {
      "use strict";
      var n = a(3949),
        i = a(6011);
      i.setEnv(n.env),
        n.define(
          "ix2",
          (e.exports = function () {
            return i;
          })
        );
    },
    3949: function (e, t, a) {
      "use strict";
      var n,
        i,
        d = {},
        o = {},
        c = [],
        r = window.Webflow || [],
        l = window.jQuery,
        s = l(window),
        f = l(document),
        u = l.isFunction,
        g = (d._ = a(5756)),
        p = (d.tram = a(5487) && l.tram),
        b = !1,
        I = !1;
      function T(e) {
        d.env() &&
          (u(e.design) && s.on("__wf_design", e.design),
          u(e.preview) && s.on("__wf_preview", e.preview)),
          u(e.destroy) && s.on("__wf_destroy", e.destroy),
          e.ready &&
            u(e.ready) &&
            (function (e) {
              if (b) return e.ready();
              g.contains(c, e.ready) || c.push(e.ready);
            })(e);
      }
      function y(e) {
        var t;
        u(e.design) && s.off("__wf_design", e.design),
          u(e.preview) && s.off("__wf_preview", e.preview),
          u(e.destroy) && s.off("__wf_destroy", e.destroy),
          e.ready &&
            u(e.ready) &&
            ((t = e),
            (c = g.filter(c, function (e) {
              return e !== t.ready;
            })));
      }
      (p.config.hideBackface = !1),
        (p.config.keepInherited = !0),
        (d.define = function (e, t, a) {
          o[e] && y(o[e]);
          var n = (o[e] = t(l, g, a) || {});
          return T(n), n;
        }),
        (d.require = function (e) {
          return o[e];
        }),
        (d.push = function (e) {
          if (b) {
            u(e) && e();
            return;
          }
          r.push(e);
        }),
        (d.env = function (e) {
          var t = window.__wf_design,
            a = void 0 !== t;
          return e
            ? "design" === e
              ? a && t
              : "preview" === e
              ? a && !t
              : "slug" === e
              ? a && window.__wf_slug
              : "editor" === e
              ? window.WebflowEditor
              : "test" === e
              ? window.__wf_test
              : "frame" === e
              ? window !== window.top
              : void 0
            : a;
        });
      var E = navigator.userAgent.toLowerCase(),
        m = (d.env.touch =
          "ontouchstart" in window ||
          (window.DocumentTouch && document instanceof window.DocumentTouch)),
        O = (d.env.chrome =
          /chrome/.test(E) &&
          /Google/.test(navigator.vendor) &&
          parseInt(E.match(/chrome\/(\d+)\./)[1], 10)),
        S = (d.env.ios = /(ipod|iphone|ipad)/.test(E));
      (d.env.safari = /safari/.test(E) && !O && !S),
        m &&
          f.on("touchstart mousedown", function (e) {
            n = e.target;
          }),
        (d.validClick = m
          ? function (e) {
              return e === n || l.contains(e, n);
            }
          : function () {
              return !0;
            });
      var _ = "resize.webflow orientationchange.webflow load.webflow",
        R = "scroll.webflow " + _;
      function L(e, t) {
        var a = [],
          n = {};
        return (
          (n.up = g.throttle(function (e) {
            g.each(a, function (t) {
              t(e);
            });
          })),
          e && t && e.on(t, n.up),
          (n.on = function (e) {
            "function" == typeof e && (g.contains(a, e) || a.push(e));
          }),
          (n.off = function (e) {
            if (!arguments.length) {
              a = [];
              return;
            }
            a = g.filter(a, function (t) {
              return t !== e;
            });
          }),
          n
        );
      }
      function A(e) {
        u(e) && e();
      }
      function v() {
        i && (i.reject(), s.off("load", i.resolve)),
          (i = new l.Deferred()),
          s.on("load", i.resolve);
      }
      (d.resize = L(s, _)),
        (d.scroll = L(s, R)),
        (d.redraw = L()),
        (d.location = function (e) {
          window.location = e;
        }),
        d.env() && (d.location = function () {}),
        (d.ready = function () {
          (b = !0),
            I ? ((I = !1), g.each(o, T)) : g.each(c, A),
            g.each(r, A),
            d.resize.up();
        }),
        (d.load = function (e) {
          i.then(e);
        }),
        (d.destroy = function (e) {
          (e = e || {}),
            (I = !0),
            s.triggerHandler("__wf_destroy"),
            null != e.domready && (b = e.domready),
            g.each(o, y),
            d.resize.off(),
            d.scroll.off(),
            d.redraw.off(),
            (c = []),
            (r = []),
            "pending" === i.state() && v();
        }),
        l(d.ready),
        v(),
        (e.exports = window.Webflow = d);
    },
    7624: function (e, t, a) {
      "use strict";
      var n = a(3949);
      n.define(
        "links",
        (e.exports = function (e, t) {
          var a,
            i,
            d,
            o = {},
            c = e(window),
            r = n.env(),
            l = window.location,
            s = document.createElement("a"),
            f = "w--current",
            u = /index\.(html|php)$/,
            g = /\/$/;
          function p() {
            var e = c.scrollTop(),
              a = c.height();
            t.each(i, function (t) {
              if (!t.link.attr("hreflang")) {
                var n = t.link,
                  i = t.sec,
                  d = i.offset().top,
                  o = i.outerHeight(),
                  c = 0.5 * a,
                  r = i.is(":visible") && d + o - c >= e && d + c <= e + a;
                t.active !== r && ((t.active = r), b(n, f, r));
              }
            });
          }
          function b(e, t, a) {
            var n = e.hasClass(t);
            (!a || !n) && (a || n) && (a ? e.addClass(t) : e.removeClass(t));
          }
          return (
            (o.ready =
              o.design =
              o.preview =
                function () {
                  (a = r && n.env("design")),
                    (d = n.env("slug") || l.pathname || ""),
                    n.scroll.off(p),
                    (i = []);
                  for (var t = document.links, o = 0; o < t.length; ++o)
                    !(function (t) {
                      if (!t.getAttribute("hreflang")) {
                        var n =
                          (a && t.getAttribute("href-disabled")) ||
                          t.getAttribute("href");
                        if (((s.href = n), !(n.indexOf(":") >= 0))) {
                          var o = e(t);
                          if (
                            s.hash.length > 1 &&
                            s.host + s.pathname === l.host + l.pathname
                          ) {
                            if (!/^#[a-zA-Z0-9\-\_]+$/.test(s.hash)) return;
                            var c = e(s.hash);
                            c.length && i.push({ link: o, sec: c, active: !1 });
                            return;
                          }
                          "#" !== n &&
                            "" !== n &&
                            b(
                              o,
                              f,
                              (!r && s.href === l.href) ||
                                n === d ||
                                (u.test(n) && g.test(d))
                            );
                        }
                      }
                    })(t[o]);
                  i.length && (n.scroll.on(p), p());
                }),
            o
          );
        })
      );
    },
    286: function (e, t, a) {
      "use strict";
      var n = a(3949);
      n.define(
        "scroll",
        (e.exports = function (e) {
          var t = {
              WF_CLICK_EMPTY: "click.wf-empty-link",
              WF_CLICK_SCROLL: "click.wf-scroll",
            },
            a = window.location,
            i = !(function () {
              try {
                return !!window.frameElement;
              } catch (e) {
                return !0;
              }
            })()
              ? window.history
              : null,
            d = e(window),
            o = e(document),
            c = e(document.body),
            r =
              window.requestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              function (e) {
                window.setTimeout(e, 15);
              },
            l = n.env("editor") ? ".w-editor-body" : "body",
            s =
              "header, " +
              l +
              " > .header, " +
              l +
              " > .w-nav:not([data-no-scroll])",
            f = 'a[href="#"]',
            u = 'a[href*="#"]:not(.w-tab-link):not(' + f + ")",
            g = document.createElement("style");
          g.appendChild(
            document.createTextNode(
              '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}'
            )
          );
          var p = /^#[a-zA-Z0-9][\w:.-]*$/;
          let b =
            "function" == typeof window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)");
          function I(e, t) {
            var a;
            switch (t) {
              case "add":
                (a = e.attr("tabindex"))
                  ? e.attr("data-wf-tabindex-swap", a)
                  : e.attr("tabindex", "-1");
                break;
              case "remove":
                (a = e.attr("data-wf-tabindex-swap"))
                  ? (e.attr("tabindex", a),
                    e.removeAttr("data-wf-tabindex-swap"))
                  : e.removeAttr("tabindex");
            }
            e.toggleClass("wf-force-outline-none", "add" === t);
          }
          function T(t) {
            var o = t.currentTarget;
            if (
              !(
                n.env("design") ||
                (window.$.mobile && /(?:^|\s)ui-link(?:$|\s)/.test(o.className))
              )
            ) {
              var l =
                p.test(o.hash) && o.host + o.pathname === a.host + a.pathname
                  ? o.hash
                  : "";
              if ("" !== l) {
                var f,
                  u = e(l);
                u.length &&
                  (t && (t.preventDefault(), t.stopPropagation()),
                  (f = l),
                  a.hash !== f &&
                    i &&
                    i.pushState &&
                    !(n.env.chrome && "file:" === a.protocol) &&
                    (i.state && i.state.hash) !== f &&
                    i.pushState({ hash: f }, "", f),
                  window.setTimeout(function () {
                    !(function (t, a) {
                      var n = d.scrollTop(),
                        i = (function (t) {
                          var a = e(s),
                            n =
                              "fixed" === a.css("position")
                                ? a.outerHeight()
                                : 0,
                            i = t.offset().top - n;
                          if ("mid" === t.data("scroll")) {
                            var o = d.height() - n,
                              c = t.outerHeight();
                            c < o && (i -= Math.round((o - c) / 2));
                          }
                          return i;
                        })(t);
                      if (n !== i) {
                        var o = (function (e, t, a) {
                            if (
                              "none" ===
                                document.body.getAttribute(
                                  "data-wf-scroll-motion"
                                ) ||
                              b.matches
                            )
                              return 0;
                            var n = 1;
                            return (
                              c.add(e).each(function (e, t) {
                                var a = parseFloat(
                                  t.getAttribute("data-scroll-time")
                                );
                                !isNaN(a) && a >= 0 && (n = a);
                              }),
                              (472.143 * Math.log(Math.abs(t - a) + 125) -
                                2e3) *
                                n
                            );
                          })(t, n, i),
                          l = Date.now(),
                          f = function () {
                            var e,
                              t,
                              d,
                              c,
                              s,
                              u = Date.now() - l;
                            window.scroll(
                              0,
                              ((e = n),
                              (t = i),
                              (d = u) > (c = o)
                                ? t
                                : e +
                                  (t - e) *
                                    ((s = d / c) < 0.5
                                      ? 4 * s * s * s
                                      : (s - 1) * (2 * s - 2) * (2 * s - 2) +
                                        1))
                            ),
                              u <= o ? r(f) : "function" == typeof a && a();
                          };
                        r(f);
                      }
                    })(u, function () {
                      I(u, "add"),
                        u.get(0).focus({ preventScroll: !0 }),
                        I(u, "remove");
                    });
                  }, 300 * !t));
              }
            }
          }
          return {
            ready: function () {
              var { WF_CLICK_EMPTY: e, WF_CLICK_SCROLL: a } = t;
              o.on(a, u, T),
                o.on(e, f, function (e) {
                  e.preventDefault();
                }),
                document.head.insertBefore(g, document.head.firstChild);
            },
          };
        })
      );
    },
    3695: function (e, t, a) {
      "use strict";
      a(3949).define(
        "touch",
        (e.exports = function (e) {
          var t = {},
            a = window.getSelection;
          function n(t) {
            var n,
              i,
              d = !1,
              o = !1,
              c = Math.min(Math.round(0.04 * window.innerWidth), 40);
            function r(e) {
              var t = e.touches;
              (t && t.length > 1) ||
                ((d = !0),
                t ? ((o = !0), (n = t[0].clientX)) : (n = e.clientX),
                (i = n));
            }
            function l(t) {
              if (d) {
                if (o && "mousemove" === t.type) {
                  t.preventDefault(), t.stopPropagation();
                  return;
                }
                var n,
                  r,
                  l,
                  s,
                  u = t.touches,
                  g = u ? u[0].clientX : t.clientX,
                  p = g - i;
                (i = g),
                  Math.abs(p) > c &&
                    a &&
                    "" === String(a()) &&
                    ((n = "swipe"),
                    (r = t),
                    (l = { direction: p > 0 ? "right" : "left" }),
                    (s = e.Event(n, { originalEvent: r })),
                    e(r.target).trigger(s, l),
                    f());
              }
            }
            function s(e) {
              if (d && ((d = !1), o && "mouseup" === e.type)) {
                e.preventDefault(), e.stopPropagation(), (o = !1);
                return;
              }
            }
            function f() {
              d = !1;
            }
            t.addEventListener("touchstart", r, !1),
              t.addEventListener("touchmove", l, !1),
              t.addEventListener("touchend", s, !1),
              t.addEventListener("touchcancel", f, !1),
              t.addEventListener("mousedown", r, !1),
              t.addEventListener("mousemove", l, !1),
              t.addEventListener("mouseup", s, !1),
              t.addEventListener("mouseout", f, !1),
              (this.destroy = function () {
                t.removeEventListener("touchstart", r, !1),
                  t.removeEventListener("touchmove", l, !1),
                  t.removeEventListener("touchend", s, !1),
                  t.removeEventListener("touchcancel", f, !1),
                  t.removeEventListener("mousedown", r, !1),
                  t.removeEventListener("mousemove", l, !1),
                  t.removeEventListener("mouseup", s, !1),
                  t.removeEventListener("mouseout", f, !1),
                  (t = null);
              });
          }
          return (
            (e.event.special.tap = {
              bindType: "click",
              delegateType: "click",
            }),
            (t.init = function (t) {
              return (t = "string" == typeof t ? e(t).get(0) : t)
                ? new n(t)
                : null;
            }),
            (t.instance = t.init(document)),
            t
          );
        })
      );
    },
    3487: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = {
        strFromU8: function () {
          return z;
        },
        unzip: function () {
          return q;
        },
      };
      for (var n in a)
        Object.defineProperty(t, n, { enumerable: !0, get: a[n] });
      let i = {},
        d = function (e, t, a, n, d) {
          let o = new Worker(
            i[t] ||
              (i[t] = URL.createObjectURL(
                new Blob(
                  [
                    e +
                      ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})',
                  ],
                  { type: "text/javascript" }
                )
              ))
          );
          return (
            (o.onmessage = function (e) {
              let t = e.data,
                a = t.$e$;
              if (a) {
                let e = Error(a[0]);
                (e.code = a[1]), (e.stack = a[2]), d(e, null);
              } else d(null, t);
            }),
            o.postMessage(a, n),
            o
          );
        },
        o = Uint8Array,
        c = Uint16Array,
        r = Uint32Array,
        l = new o([
          0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4,
          4, 5, 5, 5, 5, 0, 0, 0, 0,
        ]),
        s = new o([
          0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10,
          10, 11, 11, 12, 12, 13, 13, 0, 0,
        ]),
        f = new o([
          16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
        ]),
        u = function (e, t) {
          let a = new c(31);
          for (var n = 0; n < 31; ++n) a[n] = t += 1 << e[n - 1];
          let i = new r(a[30]);
          for (n = 1; n < 30; ++n)
            for (let e = a[n]; e < a[n + 1]; ++e) i[e] = ((e - a[n]) << 5) | n;
          return [a, i];
        },
        g = u(l, 2),
        p = g[0],
        b = g[1];
      (p[28] = 258), (b[258] = 28);
      let I = u(s, 0)[0],
        T = new c(32768);
      for (var y = 0; y < 32768; ++y) {
        let e = ((43690 & y) >>> 1) | ((21845 & y) << 1);
        (e =
          ((61680 & (e = ((52428 & e) >>> 2) | ((13107 & e) << 2))) >>> 4) |
          ((3855 & e) << 4)),
          (T[y] = (((65280 & e) >>> 8) | ((255 & e) << 8)) >>> 1);
      }
      let E = function (e, t, a) {
          let n,
            i = e.length,
            d = 0,
            o = new c(t);
          for (; d < i; ++d) e[d] && ++o[e[d] - 1];
          let r = new c(t);
          for (d = 0; d < t; ++d) r[d] = (r[d - 1] + o[d - 1]) << 1;
          if (a) {
            n = new c(1 << t);
            let a = 15 - t;
            for (d = 0; d < i; ++d)
              if (e[d]) {
                let i = (d << 4) | e[d],
                  o = t - e[d],
                  c = r[e[d] - 1]++ << o;
                for (let e = c | ((1 << o) - 1); c <= e; ++c) n[T[c] >>> a] = i;
              }
          } else
            for (n = new c(i), d = 0; d < i; ++d)
              e[d] && (n[d] = T[r[e[d] - 1]++] >>> (15 - e[d]));
          return n;
        },
        m = new o(288);
      for (y = 0; y < 144; ++y) m[y] = 8;
      for (y = 144; y < 256; ++y) m[y] = 9;
      for (y = 256; y < 280; ++y) m[y] = 7;
      for (y = 280; y < 288; ++y) m[y] = 8;
      let O = new o(32);
      for (y = 0; y < 32; ++y) O[y] = 5;
      let S = E(m, 9, 1),
        _ = E(O, 5, 1),
        R = function (e) {
          let t = e[0];
          for (let a = 1; a < e.length; ++a) e[a] > t && (t = e[a]);
          return t;
        },
        L = function (e, t, a) {
          let n = (t / 8) | 0;
          return ((e[n] | (e[n + 1] << 8)) >> (7 & t)) & a;
        },
        A = function (e, t) {
          let a = (t / 8) | 0;
          return (e[a] | (e[a + 1] << 8) | (e[a + 2] << 16)) >> (7 & t);
        },
        v = function (e) {
          return ((e + 7) / 8) | 0;
        },
        h = function (e, t, a) {
          (null == t || t < 0) && (t = 0),
            (null == a || a > e.length) && (a = e.length);
          let n = new (
            2 === e.BYTES_PER_ELEMENT ? c : 4 === e.BYTES_PER_ELEMENT ? r : o
          )(a - t);
          return n.set(e.subarray(t, a)), n;
        },
        N = [
          "unexpected EOF",
          "invalid block type",
          "invalid length/literal",
          "invalid distance",
          "stream finished",
          "no stream handler",
          ,
          "no callback",
          "invalid UTF-8 data",
          "extra field too long",
          "date not in range 1980-2099",
          "filename too long",
          "stream finishing",
          "invalid zip data",
        ];
      var C = function (e, t, a) {
        let n = Error(t || N[e]);
        if (
          ((n.code = e),
          Error.captureStackTrace && Error.captureStackTrace(n, C),
          !a)
        )
          throw n;
        return n;
      };
      let P = function (e, t, a) {
          let n = e.length;
          if (!n || (a && a.f && !a.l)) return t || new o(0);
          let i = !t || a,
            d = !a || a.i;
          a || (a = {}), t || (t = new o(3 * n));
          let c = function (e) {
              let a = t.length;
              if (e > a) {
                let n = new o(Math.max(2 * a, e));
                n.set(t), (t = n);
              }
            },
            r = a.f || 0,
            u = a.p || 0,
            g = a.b || 0,
            b = a.l,
            T = a.d,
            y = a.m,
            m = a.n,
            O = 8 * n;
          do {
            if (!b) {
              r = L(e, u, 1);
              let l = L(e, u + 1, 3);
              if (((u += 3), !l)) {
                let o = e[(P = v(u) + 4) - 4] | (e[P - 3] << 8),
                  l = P + o;
                if (l > n) {
                  d && C(0);
                  break;
                }
                i && c(g + o),
                  t.set(e.subarray(P, l), g),
                  (a.b = g += o),
                  (a.p = u = 8 * l),
                  (a.f = r);
                continue;
              }
              if (1 === l) (b = S), (T = _), (y = 9), (m = 5);
              else if (2 === l) {
                let t = L(e, u, 31) + 257,
                  a = L(e, u + 10, 15) + 4,
                  n = t + L(e, u + 5, 31) + 1;
                u += 14;
                let i = new o(n),
                  d = new o(19);
                for (var N = 0; N < a; ++N) d[f[N]] = L(e, u + 3 * N, 7);
                u += 3 * a;
                let c = R(d),
                  r = (1 << c) - 1,
                  l = E(d, c, 1);
                for (N = 0; N < n; ) {
                  let t = l[L(e, u, r)];
                  if (((u += 15 & t), (P = t >>> 4) < 16)) i[N++] = P;
                  else {
                    var P,
                      U = 0;
                    let t = 0;
                    for (
                      16 === P
                        ? ((t = 3 + L(e, u, 3)), (u += 2), (U = i[N - 1]))
                        : 17 === P
                        ? ((t = 3 + L(e, u, 7)), (u += 3))
                        : 18 === P && ((t = 11 + L(e, u, 127)), (u += 7));
                      t--;

                    )
                      i[N++] = U;
                  }
                }
                let s = i.subarray(0, t);
                var G = i.subarray(t);
                (y = R(s)), (m = R(G)), (b = E(s, y, 1)), (T = E(G, m, 1));
              } else C(1);
              if (u > O) {
                d && C(0);
                break;
              }
            }
            i && c(g + 131072);
            let h = (1 << y) - 1,
              M = (1 << m) - 1,
              x = u;
            for (; ; x = u) {
              let a = (U = b[A(e, u) & h]) >>> 4;
              if ((u += 15 & U) > O) {
                d && C(0);
                break;
              }
              if ((U || C(2), a < 256)) t[g++] = a;
              else {
                if (256 === a) {
                  (x = u), (b = null);
                  break;
                }
                {
                  let n = a - 254;
                  if (a > 264) {
                    var V = l[(N = a - 257)];
                    (n = L(e, u, (1 << V) - 1) + p[N]), (u += V);
                  }
                  let o = T[A(e, u) & M],
                    r = o >>> 4;
                  if (
                    (o || C(3),
                    (u += 15 & o),
                    (G = I[r]),
                    r > 3 &&
                      ((V = s[r]), (G += A(e, u) & ((1 << V) - 1)), (u += V)),
                    u > O)
                  ) {
                    d && C(0);
                    break;
                  }
                  i && c(g + 131072);
                  let f = g + n;
                  for (; g < f; g += 4)
                    (t[g] = t[g - G]),
                      (t[g + 1] = t[g + 1 - G]),
                      (t[g + 2] = t[g + 2 - G]),
                      (t[g + 3] = t[g + 3 - G]);
                  g = f;
                }
              }
            }
            (a.l = b),
              (a.p = x),
              (a.b = g),
              (a.f = r),
              b && ((r = 1), (a.m = y), (a.d = T), (a.n = m));
          } while (!r);
          return g === t.length ? t : h(t, 0, g);
        },
        U = function (e, t) {
          let a = {};
          for (var n in e) a[n] = e[n];
          for (var n in t) a[n] = t[n];
          return a;
        },
        G = function (e, t, a) {
          let n = e(),
            i = e.toString(),
            d = i
              .slice(i.indexOf("[") + 1, i.lastIndexOf("]"))
              .replace(/\s+/g, "")
              .split(",");
          for (let e = 0; e < n.length; ++e) {
            let i = n[e],
              o = d[e];
            if ("function" == typeof i) {
              t += ";" + o + "=";
              let e = i.toString();
              if (i.prototype)
                if (-1 !== e.indexOf("[native code]")) {
                  let a = e.indexOf(" ", 8) + 1;
                  t += e.slice(a, e.indexOf("(", a));
                } else
                  for (let a in ((t += e), i.prototype))
                    t +=
                      ";" +
                      o +
                      ".prototype." +
                      a +
                      "=" +
                      i.prototype[a].toString();
              else t += e;
            } else a[o] = i;
          }
          return [t, a];
        },
        V = [],
        M = function (e) {
          let t = [];
          for (let a in e)
            e[a].buffer && t.push((e[a] = new e[a].constructor(e[a])).buffer);
          return t;
        },
        x = function (e, t, a, n) {
          let i;
          if (!V[a]) {
            let t = "",
              n = {},
              d = e.length - 1;
            for (let a = 0; a < d; ++a)
              (t = (i = G(e[a], t, n))[0]), (n = i[1]);
            V[a] = G(e[d], t, n);
          }
          let o = U({}, V[a][1]);
          return d(
            V[a][0] +
              ";onmessage=function(e){for(var kz in e.data)self[kz]=e.data[kz];onmessage=" +
              t.toString() +
              "}",
            a,
            o,
            M(o),
            n
          );
        },
        w = function () {
          return [
            o,
            c,
            r,
            l,
            s,
            f,
            p,
            I,
            S,
            _,
            T,
            N,
            E,
            R,
            L,
            A,
            v,
            h,
            C,
            P,
            Q,
            F,
            k,
          ];
        };
      var F = function (e) {
          return postMessage(e, [e.buffer]);
        },
        k = function (e) {
          return e && e.size && new o(e.size);
        };
      let D = function (e, t, a, n, i, d) {
          var o = x(a, n, i, function (e, t) {
            o.terminate(), d(e, t);
          });
          return (
            o.postMessage([e, t], t.consume ? [e.buffer] : []),
            function () {
              o.terminate();
            }
          );
        },
        X = function (e, t) {
          return e[t] | (e[t + 1] << 8);
        },
        Y = function (e, t) {
          return (
            (e[t] | (e[t + 1] << 8) | (e[t + 2] << 16) | (e[t + 3] << 24)) >>> 0
          );
        };
      function Q(e, t) {
        return P(e, t);
      }
      let B = "undefined" != typeof TextDecoder && new TextDecoder(),
        H = function (e) {
          for (let t = "", a = 0; ; ) {
            let n = e[a++],
              i = (n > 127) + (n > 223) + (n > 239);
            if (a + i > e.length) return [t, h(e, a - 1)];
            i
              ? 3 === i
                ? (t += String.fromCharCode(
                    55296 |
                      ((n =
                        (((15 & n) << 18) |
                          ((63 & e[a++]) << 12) |
                          ((63 & e[a++]) << 6) |
                          (63 & e[a++])) -
                        65536) >>
                        10),
                    56320 | (1023 & n)
                  ))
                : (t +=
                    1 & i
                      ? String.fromCharCode(((31 & n) << 6) | (63 & e[a++]))
                      : String.fromCharCode(
                          ((15 & n) << 12) |
                            ((63 & e[a++]) << 6) |
                            (63 & e[a++])
                        ))
              : (t += String.fromCharCode(n));
          }
        };
      function z(e, t) {
        if (t) {
          let t = "";
          for (let a = 0; a < e.length; a += 16384)
            t += String.fromCharCode.apply(null, e.subarray(a, a + 16384));
          return t;
        }
        if (B) return B.decode(e);
        {
          let t = H(e),
            a = t[0];
          return t[1].length && C(8), a;
        }
      }
      let j = function (e, t, a) {
          let n = X(e, t + 28),
            i = z(e.subarray(t + 46, t + 46 + n), !(2048 & X(e, t + 8))),
            d = t + 46 + n,
            o = Y(e, t + 20),
            c =
              a && 0xffffffff === o
                ? z64e(e, d)
                : [o, Y(e, t + 24), Y(e, t + 42)],
            r = c[0],
            l = c[1],
            s = c[2];
          return [X(e, t + 10), r, l, i, d + X(e, t + 30) + X(e, t + 32), s];
        },
        W =
          "function" == typeof queueMicrotask
            ? queueMicrotask
            : "function" == typeof setTimeout
            ? setTimeout
            : function (e) {
                e();
              };
      function q(e, t, a) {
        a || ((a = t), (t = {})), "function" != typeof a && C(7);
        let n = [],
          i = function () {
            for (let e = 0; e < n.length; ++e) n[e]();
          },
          d = {},
          c = function (e, t) {
            W(function () {
              a(e, t);
            });
          };
        W(function () {
          c = a;
        });
        let r = e.length - 22;
        for (; 0x6054b50 !== Y(e, r); --r)
          if (!r || e.length - r > 65558) return c(C(13, 0, 1), null), i;
        let l = X(e, r + 8);
        if (l) {
          let a = l,
            s = Y(e, r + 16),
            f = 0xffffffff === s || 65535 === a;
          if (f) {
            let t = Y(e, r - 12);
            (f = 0x6064b50 === Y(e, t)) &&
              ((a = l = Y(e, t + 32)), (s = Y(e, t + 48)));
          }
          let u = t && t.filter;
          for (let t = 0; t < a; ++t)
            !(function () {
              var t, a, r;
              let g = j(e, s, f),
                p = g[0],
                b = g[1],
                I = g[2],
                T = g[3],
                y = g[4],
                E = g[5],
                m = E + 30 + X(e, E + 26) + X(e, E + 28);
              s = y;
              let O = function (e, t) {
                e ? (i(), c(e, null)) : (t && (d[T] = t), --l || c(null, d));
              };
              if (
                !u ||
                u({ name: T, size: b, originalSize: I, compression: p })
              )
                if (p)
                  if (8 === p) {
                    let i = e.subarray(m, m + b);
                    if (b < 32e4)
                      try {
                        O(null, ((t = new o(I)), P(i, t)));
                      } catch (e) {
                        O(e, null);
                      }
                    else
                      n.push(
                        ((a = { size: I }),
                        (r = O) || ((r = a), (a = {})),
                        "function" != typeof r && C(7),
                        D(
                          i,
                          a,
                          [w],
                          function (e) {
                            var t;
                            return F(((t = e.data[0]), P(t, k(e.data[1]))));
                          },
                          1,
                          r
                        ))
                      );
                  } else O(C(14, "unknown compression type " + p, 1), null);
                else O(null, h(e, m, m + b));
              else O(null, null);
            })(t);
        } else c(null, {});
        return i;
      }
    },
    7933: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        fetchLottie: function () {
          return f;
        },
        unZipDotLottie: function () {
          return s;
        },
      };
      for (var i in n)
        Object.defineProperty(t, i, { enumerable: !0, get: n[i] });
      let d = a(3487);
      async function o(e) {
        return await fetch(new URL(e, window?.location?.href).href).then((e) =>
          e.arrayBuffer()
        );
      }
      async function c(e) {
        return (
          await new Promise((t) => {
            let a = new FileReader();
            a.readAsDataURL(new Blob([e])), (a.onload = () => t(a.result));
          })
        ).split(",", 2)[1];
      }
      async function r(e) {
        let t = new Uint8Array(e),
          a = await new Promise((e, a) => {
            (0, d.unzip)(t, (t, n) => (t ? a(t) : e(n)));
          });
        return {
          read: (e) => (0, d.strFromU8)(a[e]),
          readB64: async (e) => await c(a[e]),
        };
      }
      async function l(e, t) {
        if (!("assets" in e)) return e;
        async function a(e) {
          let { p: a } = e;
          if (null == a || null == t.read(`images/${a}`)) return e;
          let n = a.split(".").pop(),
            i = await t.readB64(`images/${a}`);
          if (n?.startsWith("data:")) return (e.p = n), (e.e = 1), e;
          switch (n) {
            case "svg":
            case "svg+xml":
              e.p = `data:image/svg+xml;base64,${i}`;
              break;
            case "png":
            case "jpg":
            case "jpeg":
            case "gif":
            case "webp":
              e.p = `data:image/${n};base64,${i}`;
              break;
            default:
              e.p = `data:;base64,${i}`;
          }
          return (e.e = 1), e;
        }
        return (
          (await Promise.all(e.assets.map(a))).map((t, a) => {
            e.assets[a] = t;
          }),
          e
        );
      }
      async function s(e) {
        let t = await r(e),
          a = (function (e) {
            let t = JSON.parse(e);
            if (!("animations" in t)) throw Error("Manifest not found");
            if (0 === t.animations.length)
              throw Error("No animations listed in the manifest");
            return t;
          })(t.read("manifest.json"));
        return (
          await Promise.all(
            a.animations.map((e) =>
              l(JSON.parse(t.read(`animations/${e.id}.json`)), t)
            )
          )
        )[0];
      }
      async function f(e) {
        let t = await o(e);
        return !(function (e) {
          let t = new Uint8Array(e, 0, 32);
          return 80 === t[0] && 75 === t[1] && 3 === t[2] && 4 === t[3];
        })(t)
          ? JSON.parse(new TextDecoder().decode(t))
          : await s(t);
      }
    },
    3946: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        actionListPlaybackChanged: function () {
          return H;
        },
        animationFrameChanged: function () {
          return k;
        },
        clearRequested: function () {
          return M;
        },
        elementStateChanged: function () {
          return B;
        },
        eventListenerAdded: function () {
          return x;
        },
        eventStateChanged: function () {
          return F;
        },
        instanceAdded: function () {
          return X;
        },
        instanceRemoved: function () {
          return Q;
        },
        instanceStarted: function () {
          return Y;
        },
        mediaQueriesDefined: function () {
          return j;
        },
        parameterChanged: function () {
          return D;
        },
        playbackRequested: function () {
          return G;
        },
        previewRequested: function () {
          return U;
        },
        rawDataImported: function () {
          return h;
        },
        sessionInitialized: function () {
          return N;
        },
        sessionStarted: function () {
          return C;
        },
        sessionStopped: function () {
          return P;
        },
        stopRequested: function () {
          return V;
        },
        testFrameRendered: function () {
          return w;
        },
        viewportWidthChanged: function () {
          return z;
        },
      };
      for (var i in n)
        Object.defineProperty(t, i, { enumerable: !0, get: n[i] });
      let d = a(7087),
        o = a(9468),
        {
          IX2_RAW_DATA_IMPORTED: c,
          IX2_SESSION_INITIALIZED: r,
          IX2_SESSION_STARTED: l,
          IX2_SESSION_STOPPED: s,
          IX2_PREVIEW_REQUESTED: f,
          IX2_PLAYBACK_REQUESTED: u,
          IX2_STOP_REQUESTED: g,
          IX2_CLEAR_REQUESTED: p,
          IX2_EVENT_LISTENER_ADDED: b,
          IX2_TEST_FRAME_RENDERED: I,
          IX2_EVENT_STATE_CHANGED: T,
          IX2_ANIMATION_FRAME_CHANGED: y,
          IX2_PARAMETER_CHANGED: E,
          IX2_INSTANCE_ADDED: m,
          IX2_INSTANCE_STARTED: O,
          IX2_INSTANCE_REMOVED: S,
          IX2_ELEMENT_STATE_CHANGED: _,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: R,
          IX2_VIEWPORT_WIDTH_CHANGED: L,
          IX2_MEDIA_QUERIES_DEFINED: A,
        } = d.IX2EngineActionTypes,
        { reifyState: v } = o.IX2VanillaUtils,
        h = (e) => ({ type: c, payload: { ...v(e) } }),
        N = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
          type: r,
          payload: { hasBoundaryNodes: e, reducedMotion: t },
        }),
        C = () => ({ type: l }),
        P = () => ({ type: s }),
        U = ({ rawData: e, defer: t }) => ({
          type: f,
          payload: { defer: t, rawData: e },
        }),
        G = ({
          actionTypeId: e = d.ActionTypeConsts.GENERAL_START_ACTION,
          actionListId: t,
          actionItemId: a,
          eventId: n,
          allowEvents: i,
          immediate: o,
          testManual: c,
          verbose: r,
          rawData: l,
        }) => ({
          type: u,
          payload: {
            actionTypeId: e,
            actionListId: t,
            actionItemId: a,
            testManual: c,
            eventId: n,
            allowEvents: i,
            immediate: o,
            verbose: r,
            rawData: l,
          },
        }),
        V = (e) => ({ type: g, payload: { actionListId: e } }),
        M = () => ({ type: p }),
        x = (e, t) => ({ type: b, payload: { target: e, listenerParams: t } }),
        w = (e = 1) => ({ type: I, payload: { step: e } }),
        F = (e, t) => ({ type: T, payload: { stateKey: e, newState: t } }),
        k = (e, t) => ({ type: y, payload: { now: e, parameters: t } }),
        D = (e, t) => ({ type: E, payload: { key: e, value: t } }),
        X = (e) => ({ type: m, payload: { ...e } }),
        Y = (e, t) => ({ type: O, payload: { instanceId: e, time: t } }),
        Q = (e) => ({ type: S, payload: { instanceId: e } }),
        B = (e, t, a, n) => ({
          type: _,
          payload: { elementId: e, actionTypeId: t, current: a, actionItem: n },
        }),
        H = ({ actionListId: e, isPlaying: t }) => ({
          type: R,
          payload: { actionListId: e, isPlaying: t },
        }),
        z = ({ width: e, mediaQueries: t }) => ({
          type: L,
          payload: { width: e, mediaQueries: t },
        }),
        j = () => ({ type: A });
    },
    6011: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        i = {
          actions: function () {
            return l;
          },
          destroy: function () {
            return p;
          },
          init: function () {
            return g;
          },
          setEnv: function () {
            return u;
          },
          store: function () {
            return f;
          },
        };
      for (var d in i)
        Object.defineProperty(t, d, { enumerable: !0, get: i[d] });
      let o = a(9516),
        c = (n = a(7243)) && n.__esModule ? n : { default: n },
        r = a(1970),
        l = (function (e, t) {
          if (e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var a = s(t);
          if (a && a.has(e)) return a.get(e);
          var n = { __proto__: null },
            i = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var d in e)
            if ("default" !== d && Object.prototype.hasOwnProperty.call(e, d)) {
              var o = i ? Object.getOwnPropertyDescriptor(e, d) : null;
              o && (o.get || o.set)
                ? Object.defineProperty(n, d, o)
                : (n[d] = e[d]);
            }
          return (n.default = e), a && a.set(e, n), n;
        })(a(3946));
      function s(e) {
        if ("function" != typeof WeakMap) return null;
        var t = new WeakMap(),
          a = new WeakMap();
        return (s = function (e) {
          return e ? a : t;
        })(e);
      }
      let f = (0, o.createStore)(c.default);
      function u(e) {
        e() && (0, r.observeRequests)(f);
      }
      function g(e) {
        p(), (0, r.startEngine)({ store: f, rawData: e, allowEvents: !0 });
      }
      function p() {
        (0, r.stopEngine)(f);
      }
    },
    5012: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        elementContains: function () {
          return E;
        },
        getChildElements: function () {
          return O;
        },
        getClosestElement: function () {
          return _;
        },
        getProperty: function () {
          return p;
        },
        getQuerySelector: function () {
          return I;
        },
        getRefType: function () {
          return R;
        },
        getSiblingElements: function () {
          return S;
        },
        getStyle: function () {
          return g;
        },
        getValidDocument: function () {
          return T;
        },
        isSiblingNode: function () {
          return m;
        },
        matchSelector: function () {
          return b;
        },
        queryDocument: function () {
          return y;
        },
        setStyle: function () {
          return u;
        },
      };
      for (var i in n)
        Object.defineProperty(t, i, { enumerable: !0, get: n[i] });
      let d = a(9468),
        o = a(7087),
        { ELEMENT_MATCHES: c } = d.IX2BrowserSupport,
        {
          IX2_ID_DELIMITER: r,
          HTML_ELEMENT: l,
          PLAIN_OBJECT: s,
          WF_PAGE: f,
        } = o.IX2EngineConstants;
      function u(e, t, a) {
        e.style[t] = a;
      }
      function g(e, t) {
        return t.startsWith("--")
          ? window
              .getComputedStyle(document.documentElement)
              .getPropertyValue(t)
          : e.style instanceof CSSStyleDeclaration
          ? e.style[t]
          : void 0;
      }
      function p(e, t) {
        return e[t];
      }
      function b(e) {
        return (t) => t[c](e);
      }
      function I({ id: e, selector: t }) {
        if (e) {
          let t = e;
          if (-1 !== e.indexOf(r)) {
            let a = e.split(r),
              n = a[0];
            if (((t = a[1]), n !== document.documentElement.getAttribute(f)))
              return null;
          }
          return `[data-w-id="${t}"], [data-w-id^="${t}_instance"]`;
        }
        return t;
      }
      function T(e) {
        return null == e || e === document.documentElement.getAttribute(f)
          ? document
          : null;
      }
      function y(e, t) {
        return Array.prototype.slice.call(
          document.querySelectorAll(t ? e + " " + t : e)
        );
      }
      function E(e, t) {
        return e.contains(t);
      }
      function m(e, t) {
        return e !== t && e.parentNode === t.parentNode;
      }
      function O(e) {
        let t = [];
        for (let a = 0, { length: n } = e || []; a < n; a++) {
          let { children: n } = e[a],
            { length: i } = n;
          if (i) for (let e = 0; e < i; e++) t.push(n[e]);
        }
        return t;
      }
      function S(e = []) {
        let t = [],
          a = [];
        for (let n = 0, { length: i } = e; n < i; n++) {
          let { parentNode: i } = e[n];
          if (!i || !i.children || !i.children.length || -1 !== a.indexOf(i))
            continue;
          a.push(i);
          let d = i.firstElementChild;
          for (; null != d; )
            -1 === e.indexOf(d) && t.push(d), (d = d.nextElementSibling);
        }
        return t;
      }
      let _ = Element.prototype.closest
        ? (e, t) => (document.documentElement.contains(e) ? e.closest(t) : null)
        : (e, t) => {
            if (!document.documentElement.contains(e)) return null;
            let a = e;
            do {
              if (a[c] && a[c](t)) return a;
              a = a.parentNode;
            } while (null != a);
            return null;
          };
      function R(e) {
        return null != e && "object" == typeof e
          ? e instanceof Element
            ? l
            : s
          : null;
      }
    },
    1970: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        observeRequests: function () {
          return Z;
        },
        startActionGroup: function () {
          return ep;
        },
        startEngine: function () {
          return en;
        },
        stopActionGroup: function () {
          return eg;
        },
        stopAllActionGroups: function () {
          return eu;
        },
        stopEngine: function () {
          return ei;
        },
      };
      for (var i in n)
        Object.defineProperty(t, i, { enumerable: !0, get: n[i] });
      let d = y(a(9777)),
        o = y(a(4738)),
        c = y(a(4659)),
        r = y(a(3452)),
        l = y(a(6633)),
        s = y(a(3729)),
        f = y(a(2397)),
        u = y(a(5082)),
        g = a(7087),
        p = a(9468),
        b = a(3946),
        I = (function (e, t) {
          if (e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var a = E(t);
          if (a && a.has(e)) return a.get(e);
          var n = { __proto__: null },
            i = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var d in e)
            if ("default" !== d && Object.prototype.hasOwnProperty.call(e, d)) {
              var o = i ? Object.getOwnPropertyDescriptor(e, d) : null;
              o && (o.get || o.set)
                ? Object.defineProperty(n, d, o)
                : (n[d] = e[d]);
            }
          return (n.default = e), a && a.set(e, n), n;
        })(a(5012)),
        T = y(a(8955));
      function y(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function E(e) {
        if ("function" != typeof WeakMap) return null;
        var t = new WeakMap(),
          a = new WeakMap();
        return (E = function (e) {
          return e ? a : t;
        })(e);
      }
      let m = Object.keys(g.QuickEffectIds),
        O = (e) => m.includes(e),
        {
          COLON_DELIMITER: S,
          BOUNDARY_SELECTOR: _,
          HTML_ELEMENT: R,
          RENDER_GENERAL: L,
          W_MOD_IX: A,
        } = g.IX2EngineConstants,
        {
          getAffectedElements: v,
          getElementId: h,
          getDestinationValues: N,
          observeStore: C,
          getInstanceId: P,
          renderHTMLElement: U,
          clearAllStyles: G,
          getMaxDurationItemIndex: V,
          getComputedStyle: M,
          getInstanceOrigin: x,
          reduceListToGroup: w,
          shouldNamespaceEventParameter: F,
          getNamespacedParameterId: k,
          shouldAllowMediaQuery: D,
          cleanupHTMLElement: X,
          clearObjectCache: Y,
          stringifyTarget: Q,
          mediaQueriesEqual: B,
          shallowEqual: H,
        } = p.IX2VanillaUtils,
        {
          isPluginType: z,
          createPluginInstance: j,
          getPluginDuration: W,
        } = p.IX2VanillaPlugins,
        q = navigator.userAgent,
        $ = q.match(/iPad/i) || q.match(/iPhone/);
      function Z(e) {
        C({ store: e, select: ({ ixRequest: e }) => e.preview, onChange: K }),
          C({
            store: e,
            select: ({ ixRequest: e }) => e.playback,
            onChange: ee,
          }),
          C({ store: e, select: ({ ixRequest: e }) => e.stop, onChange: et }),
          C({ store: e, select: ({ ixRequest: e }) => e.clear, onChange: ea });
      }
      function K({ rawData: e, defer: t }, a) {
        let n = () => {
          en({ store: a, rawData: e, allowEvents: !0 }), J();
        };
        t ? setTimeout(n, 0) : n();
      }
      function J() {
        document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
      }
      function ee(e, t) {
        let {
            actionTypeId: a,
            actionListId: n,
            actionItemId: i,
            eventId: d,
            allowEvents: o,
            immediate: c,
            testManual: r,
            verbose: l = !0,
          } = e,
          { rawData: s } = e;
        if (n && i && s && c) {
          let e = s.actionLists[n];
          e && (s = w({ actionList: e, actionItemId: i, rawData: s }));
        }
        if (
          (en({ store: t, rawData: s, allowEvents: o, testManual: r }),
          (n && a === g.ActionTypeConsts.GENERAL_START_ACTION) || O(a))
        ) {
          eg({ store: t, actionListId: n }),
            ef({ store: t, actionListId: n, eventId: d });
          let e = ep({
            store: t,
            eventId: d,
            actionListId: n,
            immediate: c,
            verbose: l,
          });
          l &&
            e &&
            t.dispatch(
              (0, b.actionListPlaybackChanged)({
                actionListId: n,
                isPlaying: !c,
              })
            );
        }
      }
      function et({ actionListId: e }, t) {
        e ? eg({ store: t, actionListId: e }) : eu({ store: t }), ei(t);
      }
      function ea(e, t) {
        ei(t), G({ store: t, elementApi: I });
      }
      function en({ store: e, rawData: t, allowEvents: a, testManual: n }) {
        let { ixSession: i } = e.getState();
        if ((t && e.dispatch((0, b.rawDataImported)(t)), !i.active)) {
          (e.dispatch(
            (0, b.sessionInitialized)({
              hasBoundaryNodes: !!document.querySelector(_),
              reducedMotion:
                document.body.hasAttribute("data-wf-ix-vacation") &&
                window.matchMedia("(prefers-reduced-motion)").matches,
            })
          ),
          a) &&
            ((function (e) {
              let { ixData: t } = e.getState(),
                { eventTypeMap: a } = t;
              ec(e),
                (0, f.default)(a, (t, a) => {
                  let n = T.default[a];
                  if (!n)
                    return void console.warn(
                      `IX2 event type not configured: ${a}`
                    );
                  !(function ({ logic: e, store: t, events: a }) {
                    !(function (e) {
                      if (!$) return;
                      let t = {},
                        a = "";
                      for (let n in e) {
                        let { eventTypeId: i, target: d } = e[n],
                          o = I.getQuerySelector(d);
                        t[o] ||
                          ((i === g.EventTypeConsts.MOUSE_CLICK ||
                            i === g.EventTypeConsts.MOUSE_SECOND_CLICK) &&
                            ((t[o] = !0),
                            (a +=
                              o +
                              "{cursor: pointer;touch-action: manipulation;}")));
                      }
                      if (a) {
                        let e = document.createElement("style");
                        (e.textContent = a), document.body.appendChild(e);
                      }
                    })(a);
                    let { types: n, handler: i } = e,
                      { ixData: r } = t.getState(),
                      { actionLists: l } = r,
                      s = er(a, es);
                    if (!(0, c.default)(s)) return;
                    (0, f.default)(s, (e, n) => {
                      let i = a[n],
                        {
                          action: c,
                          id: s,
                          mediaQueries: f = r.mediaQueryKeys,
                        } = i,
                        { actionListId: u } = c.config;
                      B(f, r.mediaQueryKeys) ||
                        t.dispatch((0, b.mediaQueriesDefined)()),
                        c.actionTypeId ===
                          g.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION &&
                          (Array.isArray(i.config)
                            ? i.config
                            : [i.config]
                          ).forEach((a) => {
                            let { continuousParameterGroupId: n } = a,
                              i = (0, o.default)(
                                l,
                                `${u}.continuousParameterGroups`,
                                []
                              ),
                              c = (0, d.default)(i, ({ id: e }) => e === n),
                              r = (a.smoothing || 0) / 100,
                              f = (a.restingState || 0) / 100;
                            c &&
                              e.forEach((e, n) => {
                                !(function ({
                                  store: e,
                                  eventStateKey: t,
                                  eventTarget: a,
                                  eventId: n,
                                  eventConfig: i,
                                  actionListId: d,
                                  parameterGroup: c,
                                  smoothing: r,
                                  restingValue: l,
                                }) {
                                  let { ixData: s, ixSession: f } =
                                      e.getState(),
                                    { events: u } = s,
                                    p = u[n],
                                    { eventTypeId: b } = p,
                                    T = {},
                                    y = {},
                                    E = [],
                                    { continuousActionGroups: m } = c,
                                    { id: O } = c;
                                  F(b, i) && (O = k(t, O));
                                  let R =
                                    f.hasBoundaryNodes && a
                                      ? I.getClosestElement(a, _)
                                      : null;
                                  m.forEach((e) => {
                                    let { keyframe: t, actionItems: n } = e;
                                    n.forEach((e) => {
                                      let { actionTypeId: n } = e,
                                        { target: i } = e.config;
                                      if (!i) return;
                                      let d = i.boundaryMode ? R : null,
                                        o = Q(i) + S + n;
                                      if (
                                        ((y[o] = (function (e = [], t, a) {
                                          let n,
                                            i = [...e];
                                          return (
                                            i.some(
                                              (e, a) =>
                                                e.keyframe === t &&
                                                ((n = a), !0)
                                            ),
                                            null == n &&
                                              ((n = i.length),
                                              i.push({
                                                keyframe: t,
                                                actionItems: [],
                                              })),
                                            i[n].actionItems.push(a),
                                            i
                                          );
                                        })(y[o], t, e)),
                                        !T[o])
                                      ) {
                                        T[o] = !0;
                                        let { config: t } = e;
                                        v({
                                          config: t,
                                          event: p,
                                          eventTarget: a,
                                          elementRoot: d,
                                          elementApi: I,
                                        }).forEach((e) => {
                                          E.push({ element: e, key: o });
                                        });
                                      }
                                    });
                                  }),
                                    E.forEach(({ element: t, key: a }) => {
                                      let i = y[a],
                                        c = (0, o.default)(
                                          i,
                                          "[0].actionItems[0]",
                                          {}
                                        ),
                                        { actionTypeId: s } = c,
                                        f = (
                                          s === g.ActionTypeConsts.PLUGIN_RIVE
                                            ? 0 ===
                                              (
                                                c.config?.target
                                                  ?.selectorGuids || []
                                              ).length
                                            : z(s)
                                        )
                                          ? j(s)?.(t, c)
                                          : null,
                                        u = N(
                                          {
                                            element: t,
                                            actionItem: c,
                                            elementApi: I,
                                          },
                                          f
                                        );
                                      eb({
                                        store: e,
                                        element: t,
                                        eventId: n,
                                        actionListId: d,
                                        actionItem: c,
                                        destination: u,
                                        continuous: !0,
                                        parameterId: O,
                                        actionGroups: i,
                                        smoothing: r,
                                        restingValue: l,
                                        pluginInstance: f,
                                      });
                                    });
                                })({
                                  store: t,
                                  eventStateKey: s + S + n,
                                  eventTarget: e,
                                  eventId: s,
                                  eventConfig: a,
                                  actionListId: u,
                                  parameterGroup: c,
                                  smoothing: r,
                                  restingValue: f,
                                });
                              });
                          }),
                        (c.actionTypeId ===
                          g.ActionTypeConsts.GENERAL_START_ACTION ||
                          O(c.actionTypeId)) &&
                          ef({ store: t, actionListId: u, eventId: s });
                    });
                    let p = (e) => {
                        let { ixSession: n } = t.getState();
                        el(s, (d, o, c) => {
                          let l = a[o],
                            s = n.eventState[c],
                            { action: f, mediaQueries: u = r.mediaQueryKeys } =
                              l;
                          if (!D(u, n.mediaQueryKey)) return;
                          let p = (a = {}) => {
                            let n = i(
                              {
                                store: t,
                                element: d,
                                event: l,
                                eventConfig: a,
                                nativeEvent: e,
                                eventStateKey: c,
                              },
                              s
                            );
                            H(n, s) ||
                              t.dispatch((0, b.eventStateChanged)(c, n));
                          };
                          f.actionTypeId ===
                          g.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION
                            ? (Array.isArray(l.config)
                                ? l.config
                                : [l.config]
                              ).forEach(p)
                            : p();
                        });
                      },
                      T = (0, u.default)(p, 12),
                      y = ({ target: e = document, types: a, throttle: n }) => {
                        a.split(" ")
                          .filter(Boolean)
                          .forEach((a) => {
                            let i = n ? T : p;
                            e.addEventListener(a, i),
                              t.dispatch((0, b.eventListenerAdded)(e, [a, i]));
                          });
                      };
                    Array.isArray(n)
                      ? n.forEach(y)
                      : "string" == typeof n && y(e);
                  })({ logic: n, store: e, events: t });
                });
              let { ixSession: n } = e.getState();
              n.eventListeners.length &&
                (function (e) {
                  let t = () => {
                    ec(e);
                  };
                  eo.forEach((a) => {
                    window.addEventListener(a, t),
                      e.dispatch((0, b.eventListenerAdded)(window, [a, t]));
                  }),
                    t();
                })(e);
            })(e),
            (function () {
              let { documentElement: e } = document;
              -1 === e.className.indexOf(A) && (e.className += ` ${A}`);
            })(),
            e.getState().ixSession.hasDefinedMediaQueries &&
              C({
                store: e,
                select: ({ ixSession: e }) => e.mediaQueryKey,
                onChange: () => {
                  ei(e),
                    G({ store: e, elementApi: I }),
                    en({ store: e, allowEvents: !0 }),
                    J();
                },
              }));
          e.dispatch((0, b.sessionStarted)()),
            (function (e, t) {
              let a = (n) => {
                let { ixSession: i, ixParameters: d } = e.getState();
                if (i.active)
                  if ((e.dispatch((0, b.animationFrameChanged)(n, d)), t)) {
                    let t = C({
                      store: e,
                      select: ({ ixSession: e }) => e.tick,
                      onChange: (e) => {
                        a(e), t();
                      },
                    });
                  } else requestAnimationFrame(a);
              };
              a(window.performance.now());
            })(e, n);
        }
      }
      function ei(e) {
        let { ixSession: t } = e.getState();
        if (t.active) {
          let { eventListeners: a } = t;
          a.forEach(ed), Y(), e.dispatch((0, b.sessionStopped)());
        }
      }
      function ed({ target: e, listenerParams: t }) {
        e.removeEventListener.apply(e, t);
      }
      let eo = ["resize", "orientationchange"];
      function ec(e) {
        let { ixSession: t, ixData: a } = e.getState(),
          n = window.innerWidth;
        if (n !== t.viewportWidth) {
          let { mediaQueries: t } = a;
          e.dispatch(
            (0, b.viewportWidthChanged)({ width: n, mediaQueries: t })
          );
        }
      }
      let er = (e, t) => (0, r.default)((0, s.default)(e, t), l.default),
        el = (e, t) => {
          (0, f.default)(e, (e, a) => {
            e.forEach((e, n) => {
              t(e, a, a + S + n);
            });
          });
        },
        es = (e) =>
          v({
            config: { target: e.target, targets: e.targets },
            elementApi: I,
          });
      function ef({ store: e, actionListId: t, eventId: a }) {
        let { ixData: n, ixSession: i } = e.getState(),
          { actionLists: d, events: c } = n,
          r = c[a],
          l = d[t];
        if (l && l.useFirstGroupAsInitialState) {
          let d = (0, o.default)(l, "actionItemGroups[0].actionItems", []);
          if (
            !D(
              (0, o.default)(r, "mediaQueries", n.mediaQueryKeys),
              i.mediaQueryKey
            )
          )
            return;
          d.forEach((n) => {
            let { config: i, actionTypeId: d } = n,
              o = v({
                config:
                  i?.target?.useEventTarget === !0 &&
                  i?.target?.objectId == null
                    ? { target: r.target, targets: r.targets }
                    : i,
                event: r,
                elementApi: I,
              }),
              c = z(d);
            o.forEach((i) => {
              let o = c ? j(d)?.(i, n) : null;
              eb({
                destination: N({ element: i, actionItem: n, elementApi: I }, o),
                immediate: !0,
                store: e,
                element: i,
                eventId: a,
                actionItem: n,
                actionListId: t,
                pluginInstance: o,
              });
            });
          });
        }
      }
      function eu({ store: e }) {
        let { ixInstances: t } = e.getState();
        (0, f.default)(t, (t) => {
          if (!t.continuous) {
            let { actionListId: a, verbose: n } = t;
            eI(t, e),
              n &&
                e.dispatch(
                  (0, b.actionListPlaybackChanged)({
                    actionListId: a,
                    isPlaying: !1,
                  })
                );
          }
        });
      }
      function eg({
        store: e,
        eventId: t,
        eventTarget: a,
        eventStateKey: n,
        actionListId: i,
      }) {
        let { ixInstances: d, ixSession: c } = e.getState(),
          r = c.hasBoundaryNodes && a ? I.getClosestElement(a, _) : null;
        (0, f.default)(d, (a) => {
          let d = (0, o.default)(a, "actionItem.config.target.boundaryMode"),
            c = !n || a.eventStateKey === n;
          if (a.actionListId === i && a.eventId === t && c) {
            if (r && d && !I.elementContains(r, a.element)) return;
            eI(a, e),
              a.verbose &&
                e.dispatch(
                  (0, b.actionListPlaybackChanged)({
                    actionListId: i,
                    isPlaying: !1,
                  })
                );
          }
        });
      }
      function ep({
        store: e,
        eventId: t,
        eventTarget: a,
        eventStateKey: n,
        actionListId: i,
        groupIndex: d = 0,
        immediate: c,
        verbose: r,
      }) {
        let { ixData: l, ixSession: s } = e.getState(),
          { events: f } = l,
          u = f[t] || {},
          { mediaQueries: g = l.mediaQueryKeys } = u,
          { actionItemGroups: p, useFirstGroupAsInitialState: b } = (0,
          o.default)(l, `actionLists.${i}`, {});
        if (!p || !p.length) return !1;
        d >= p.length && (0, o.default)(u, "config.loop") && (d = 0),
          0 === d && b && d++;
        let T =
            (0 === d || (1 === d && b)) && O(u.action?.actionTypeId)
              ? u.config.delay
              : void 0,
          y = (0, o.default)(p, [d, "actionItems"], []);
        if (!y.length || !D(g, s.mediaQueryKey)) return !1;
        let E = s.hasBoundaryNodes && a ? I.getClosestElement(a, _) : null,
          m = V(y),
          S = !1;
        return (
          y.forEach((o, l) => {
            let { config: s, actionTypeId: f } = o,
              g = z(f),
              { target: p } = s;
            p &&
              v({
                config: s,
                event: u,
                eventTarget: a,
                elementRoot: p.boundaryMode ? E : null,
                elementApi: I,
              }).forEach((s, u) => {
                let p = g ? j(f)?.(s, o) : null,
                  b = g ? W(f)(s, o) : null;
                S = !0;
                let y = M({ element: s, actionItem: o }),
                  E = N({ element: s, actionItem: o, elementApi: I }, p);
                eb({
                  store: e,
                  element: s,
                  actionItem: o,
                  eventId: t,
                  eventTarget: a,
                  eventStateKey: n,
                  actionListId: i,
                  groupIndex: d,
                  isCarrier: m === l && 0 === u,
                  computedStyle: y,
                  destination: E,
                  immediate: c,
                  verbose: r,
                  pluginInstance: p,
                  pluginDuration: b,
                  instanceDelay: T,
                });
              });
          }),
          S
        );
      }
      function eb(e) {
        let t,
          { store: a, computedStyle: n, ...i } = e,
          {
            element: d,
            actionItem: o,
            immediate: c,
            pluginInstance: r,
            continuous: l,
            restingValue: s,
            eventId: f,
          } = i,
          u = P(),
          { ixElements: p, ixSession: T, ixData: y } = a.getState(),
          E = h(p, d),
          { refState: m } = p[E] || {},
          O = I.getRefType(d),
          S = T.reducedMotion && g.ReducedMotionTypes[o.actionTypeId];
        if (S && l)
          switch (y.events[f]?.eventTypeId) {
            case g.EventTypeConsts.MOUSE_MOVE:
            case g.EventTypeConsts.MOUSE_MOVE_IN_VIEWPORT:
              t = s;
              break;
            default:
              t = 0.5;
          }
        let _ = x(d, m, n, o, I, r);
        if (
          (a.dispatch(
            (0, b.instanceAdded)({
              instanceId: u,
              elementId: E,
              origin: _,
              refType: O,
              skipMotion: S,
              skipToValue: t,
              ...i,
            })
          ),
          eT(document.body, "ix2-animation-started", u),
          c)
        )
          return void (function (e, t) {
            let { ixParameters: a } = e.getState();
            e.dispatch((0, b.instanceStarted)(t, 0)),
              e.dispatch((0, b.animationFrameChanged)(performance.now(), a));
            let { ixInstances: n } = e.getState();
            ey(n[t], e);
          })(a, u);
        C({ store: a, select: ({ ixInstances: e }) => e[u], onChange: ey }),
          l || a.dispatch((0, b.instanceStarted)(u, T.tick));
      }
      function eI(e, t) {
        eT(document.body, "ix2-animation-stopping", {
          instanceId: e.id,
          state: t.getState(),
        });
        let { elementId: a, actionItem: n } = e,
          { ixElements: i } = t.getState(),
          { ref: d, refType: o } = i[a] || {};
        o === R && X(d, n, I), t.dispatch((0, b.instanceRemoved)(e.id));
      }
      function eT(e, t, a) {
        let n = document.createEvent("CustomEvent");
        n.initCustomEvent(t, !0, !0, a), e.dispatchEvent(n);
      }
      function ey(e, t) {
        let {
            active: a,
            continuous: n,
            complete: i,
            elementId: d,
            actionItem: o,
            actionTypeId: c,
            renderType: r,
            current: l,
            groupIndex: s,
            eventId: f,
            eventTarget: u,
            eventStateKey: g,
            actionListId: p,
            isCarrier: T,
            styleProp: y,
            verbose: E,
            pluginInstance: m,
          } = e,
          { ixData: O, ixSession: S } = t.getState(),
          { events: _ } = O,
          { mediaQueries: A = O.mediaQueryKeys } = _ && _[f] ? _[f] : {};
        if (D(A, S.mediaQueryKey) && (n || a || i)) {
          if (l || (r === L && i)) {
            t.dispatch((0, b.elementStateChanged)(d, c, l, o));
            let { ixElements: e } = t.getState(),
              { ref: a, refType: n, refState: i } = e[d] || {},
              s = i && i[c];
            (n === R || z(c)) && U(a, i, s, f, o, y, I, r, m);
          }
          if (i) {
            if (T) {
              let e = ep({
                store: t,
                eventId: f,
                eventTarget: u,
                eventStateKey: g,
                actionListId: p,
                groupIndex: s + 1,
                verbose: E,
              });
              E &&
                !e &&
                t.dispatch(
                  (0, b.actionListPlaybackChanged)({
                    actionListId: p,
                    isPlaying: !1,
                  })
                );
            }
            eI(e, t);
          }
        }
      }
    },
    8955: function (e, t, a) {
      "use strict";
      let n;
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "default", {
          enumerable: !0,
          get: function () {
            return eg;
          },
        });
      let i = f(a(5801)),
        d = f(a(4738)),
        o = f(a(3789)),
        c = a(7087),
        r = a(1970),
        l = a(3946),
        s = a(9468);
      function f(e) {
        return e && e.__esModule ? e : { default: e };
      }
      let {
          MOUSE_CLICK: u,
          MOUSE_SECOND_CLICK: g,
          MOUSE_DOWN: p,
          MOUSE_UP: b,
          MOUSE_OVER: I,
          MOUSE_OUT: T,
          DROPDOWN_CLOSE: y,
          DROPDOWN_OPEN: E,
          SLIDER_ACTIVE: m,
          SLIDER_INACTIVE: O,
          TAB_ACTIVE: S,
          TAB_INACTIVE: _,
          NAVBAR_CLOSE: R,
          NAVBAR_OPEN: L,
          MOUSE_MOVE: A,
          PAGE_SCROLL_DOWN: v,
          SCROLL_INTO_VIEW: h,
          SCROLL_OUT_OF_VIEW: N,
          PAGE_SCROLL_UP: C,
          SCROLLING_IN_VIEW: P,
          PAGE_FINISH: U,
          ECOMMERCE_CART_CLOSE: G,
          ECOMMERCE_CART_OPEN: V,
          PAGE_START: M,
          PAGE_SCROLL: x,
        } = c.EventTypeConsts,
        w = "COMPONENT_ACTIVE",
        F = "COMPONENT_INACTIVE",
        { COLON_DELIMITER: k } = c.IX2EngineConstants,
        { getNamespacedParameterId: D } = s.IX2VanillaUtils,
        X = (e) => (t) => !!("object" == typeof t && e(t)) || t,
        Y = X(({ element: e, nativeEvent: t }) => e === t.target),
        Q = X(({ element: e, nativeEvent: t }) => e.contains(t.target)),
        B = (0, i.default)([Y, Q]),
        H = (e, t) => {
          if (t) {
            let { ixData: a } = e.getState(),
              { events: n } = a,
              i = n[t];
            if (i && !ee[i.eventTypeId]) return i;
          }
          return null;
        },
        z = ({ store: e, event: t }) => {
          let { action: a } = t,
            { autoStopEventId: n } = a.config;
          return !!H(e, n);
        },
        j = ({ store: e, event: t, element: a, eventStateKey: n }, i) => {
          let { action: o, id: c } = t,
            { actionListId: l, autoStopEventId: s } = o.config,
            f = H(e, s);
          return (
            f &&
              (0, r.stopActionGroup)({
                store: e,
                eventId: s,
                eventTarget: a,
                eventStateKey: s + k + n.split(k)[1],
                actionListId: (0, d.default)(f, "action.config.actionListId"),
              }),
            (0, r.stopActionGroup)({
              store: e,
              eventId: c,
              eventTarget: a,
              eventStateKey: n,
              actionListId: l,
            }),
            (0, r.startActionGroup)({
              store: e,
              eventId: c,
              eventTarget: a,
              eventStateKey: n,
              actionListId: l,
            }),
            i
          );
        },
        W = (e, t) => (a, n) => !0 === e(a, n) ? t(a, n) : n,
        q = { handler: W(B, j) },
        $ = { ...q, types: [w, F].join(" ") },
        Z = [
          { target: window, types: "resize orientationchange", throttle: !0 },
          {
            target: document,
            types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
            throttle: !0,
          },
        ],
        K = "mouseover mouseout",
        J = { types: Z },
        ee = { PAGE_START: M, PAGE_FINISH: U },
        et = (() => {
          let e = void 0 !== window.pageXOffset,
            t =
              "CSS1Compat" === document.compatMode
                ? document.documentElement
                : document.body;
          return () => ({
            scrollLeft: e ? window.pageXOffset : t.scrollLeft,
            scrollTop: e ? window.pageYOffset : t.scrollTop,
            stiffScrollTop: (0, o.default)(
              e ? window.pageYOffset : t.scrollTop,
              0,
              t.scrollHeight - window.innerHeight
            ),
            scrollWidth: t.scrollWidth,
            scrollHeight: t.scrollHeight,
            clientWidth: t.clientWidth,
            clientHeight: t.clientHeight,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
          });
        })(),
        ea = (e, t) =>
          !(
            e.left > t.right ||
            e.right < t.left ||
            e.top > t.bottom ||
            e.bottom < t.top
          ),
        en = ({ element: e, nativeEvent: t }) => {
          let { type: a, target: n, relatedTarget: i } = t,
            d = e.contains(n);
          if ("mouseover" === a && d) return !0;
          let o = e.contains(i);
          return "mouseout" === a && !!d && !!o;
        },
        ei = (e) => {
          let {
              element: t,
              event: { config: a },
            } = e,
            { clientWidth: n, clientHeight: i } = et(),
            d = a.scrollOffsetValue,
            o = "PX" === a.scrollOffsetUnit ? d : (i * (d || 0)) / 100;
          return ea(t.getBoundingClientRect(), {
            left: 0,
            top: o,
            right: n,
            bottom: i - o,
          });
        },
        ed = (e) => (t, a) => {
          let { type: n } = t.nativeEvent,
            i = -1 !== [w, F].indexOf(n) ? n === w : a.isActive,
            d = { ...a, isActive: i };
          return ((!a || d.isActive !== a.isActive) && e(t, d)) || d;
        },
        eo = (e) => (t, a) => {
          let n = { elementHovered: en(t) };
          return (
            ((a ? n.elementHovered !== a.elementHovered : n.elementHovered) &&
              e(t, n)) ||
            n
          );
        },
        ec =
          (e) =>
          (t, a = {}) => {
            let n,
              i,
              { stiffScrollTop: d, scrollHeight: o, innerHeight: c } = et(),
              {
                event: { config: r, eventTypeId: l },
              } = t,
              { scrollOffsetValue: s, scrollOffsetUnit: f } = r,
              u = o - c,
              g = Number((d / u).toFixed(2));
            if (a && a.percentTop === g) return a;
            let p = ("PX" === f ? s : (c * (s || 0)) / 100) / u,
              b = 0;
            a &&
              ((n = g > a.percentTop),
              (b = (i = a.scrollingDown !== n) ? g : a.anchorTop));
            let I = l === v ? g >= b + p : g <= b - p,
              T = {
                ...a,
                percentTop: g,
                inBounds: I,
                anchorTop: b,
                scrollingDown: n,
              };
            return (a && I && (i || T.inBounds !== a.inBounds) && e(t, T)) || T;
          },
        er = (e, t) =>
          e.left > t.left &&
          e.left < t.right &&
          e.top > t.top &&
          e.top < t.bottom,
        el =
          (e) =>
          (t, a = { clickCount: 0 }) => {
            let n = { clickCount: (a.clickCount % 2) + 1 };
            return (n.clickCount !== a.clickCount && e(t, n)) || n;
          },
        es = (e = !0) => ({
          ...$,
          handler: W(
            e ? B : Y,
            ed((e, t) => (t.isActive ? q.handler(e, t) : t))
          ),
        }),
        ef = (e = !0) => ({
          ...$,
          handler: W(
            e ? B : Y,
            ed((e, t) => (t.isActive ? t : q.handler(e, t)))
          ),
        }),
        eu = {
          ...J,
          handler:
            ((n = (e, t) => {
              let { elementVisible: a } = t,
                { event: n, store: i } = e,
                { ixData: d } = i.getState(),
                { events: o } = d;
              return !o[n.action.config.autoStopEventId] && t.triggered
                ? t
                : (n.eventTypeId === h) === a
                ? (j(e), { ...t, triggered: !0 })
                : t;
            }),
            (e, t) => {
              let a = { ...t, elementVisible: ei(e) };
              return (
                ((t
                  ? a.elementVisible !== t.elementVisible
                  : a.elementVisible) &&
                  n(e, a)) ||
                a
              );
            }),
        },
        eg = {
          [m]: es(),
          [O]: ef(),
          [E]: es(),
          [y]: ef(),
          [L]: es(!1),
          [R]: ef(!1),
          [S]: es(),
          [_]: ef(),
          [V]: { types: "ecommerce-cart-open", handler: W(B, j) },
          [G]: { types: "ecommerce-cart-close", handler: W(B, j) },
          [u]: {
            types: "click",
            handler: W(
              B,
              el((e, { clickCount: t }) => {
                z(e) ? 1 === t && j(e) : j(e);
              })
            ),
          },
          [g]: {
            types: "click",
            handler: W(
              B,
              el((e, { clickCount: t }) => {
                2 === t && j(e);
              })
            ),
          },
          [p]: { ...q, types: "mousedown" },
          [b]: { ...q, types: "mouseup" },
          [I]: {
            types: K,
            handler: W(
              B,
              eo((e, t) => {
                t.elementHovered && j(e);
              })
            ),
          },
          [T]: {
            types: K,
            handler: W(
              B,
              eo((e, t) => {
                t.elementHovered || j(e);
              })
            ),
          },
          [A]: {
            types: "mousemove mouseout scroll",
            handler: (
              {
                store: e,
                element: t,
                eventConfig: a,
                nativeEvent: n,
                eventStateKey: i,
              },
              d = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 }
            ) => {
              let {
                  basedOn: o,
                  selectedAxis: r,
                  continuousParameterGroupId: s,
                  reverse: f,
                  restingState: u = 0,
                } = a,
                {
                  clientX: g = d.clientX,
                  clientY: p = d.clientY,
                  pageX: b = d.pageX,
                  pageY: I = d.pageY,
                } = n,
                T = "X_AXIS" === r,
                y = "mouseout" === n.type,
                E = u / 100,
                m = s,
                O = !1;
              switch (o) {
                case c.EventBasedOn.VIEWPORT:
                  E = T
                    ? Math.min(g, window.innerWidth) / window.innerWidth
                    : Math.min(p, window.innerHeight) / window.innerHeight;
                  break;
                case c.EventBasedOn.PAGE: {
                  let {
                    scrollLeft: e,
                    scrollTop: t,
                    scrollWidth: a,
                    scrollHeight: n,
                  } = et();
                  E = T ? Math.min(e + b, a) / a : Math.min(t + I, n) / n;
                  break;
                }
                case c.EventBasedOn.ELEMENT:
                default: {
                  m = D(i, s);
                  let e = 0 === n.type.indexOf("mouse");
                  if (e && !0 !== B({ element: t, nativeEvent: n })) break;
                  let a = t.getBoundingClientRect(),
                    { left: d, top: o, width: c, height: r } = a;
                  if (!e && !er({ left: g, top: p }, a)) break;
                  (O = !0), (E = T ? (g - d) / c : (p - o) / r);
                }
              }
              return (
                y && (E > 0.95 || E < 0.05) && (E = Math.round(E)),
                (o !== c.EventBasedOn.ELEMENT || O || O !== d.elementHovered) &&
                  ((E = f ? 1 - E : E),
                  e.dispatch((0, l.parameterChanged)(m, E))),
                {
                  elementHovered: O,
                  clientX: g,
                  clientY: p,
                  pageX: b,
                  pageY: I,
                }
              );
            },
          },
          [x]: {
            types: Z,
            handler: ({ store: e, eventConfig: t }) => {
              let { continuousParameterGroupId: a, reverse: n } = t,
                { scrollTop: i, scrollHeight: d, clientHeight: o } = et(),
                c = i / (d - o);
              (c = n ? 1 - c : c), e.dispatch((0, l.parameterChanged)(a, c));
            },
          },
          [P]: {
            types: Z,
            handler: (
              { element: e, store: t, eventConfig: a, eventStateKey: n },
              i = { scrollPercent: 0 }
            ) => {
              let {
                  scrollLeft: d,
                  scrollTop: o,
                  scrollWidth: r,
                  scrollHeight: s,
                  clientHeight: f,
                } = et(),
                {
                  basedOn: u,
                  selectedAxis: g,
                  continuousParameterGroupId: p,
                  startsEntering: b,
                  startsExiting: I,
                  addEndOffset: T,
                  addStartOffset: y,
                  addOffsetValue: E = 0,
                  endOffsetValue: m = 0,
                } = a;
              if (u === c.EventBasedOn.VIEWPORT) {
                let e = "X_AXIS" === g ? d / r : o / s;
                return (
                  e !== i.scrollPercent &&
                    t.dispatch((0, l.parameterChanged)(p, e)),
                  { scrollPercent: e }
                );
              }
              {
                let a = D(n, p),
                  d = e.getBoundingClientRect(),
                  o = (y ? E : 0) / 100,
                  c = (T ? m : 0) / 100;
                (o = b ? o : 1 - o), (c = I ? c : 1 - c);
                let r = d.top + Math.min(d.height * o, f),
                  u = Math.min(f + (d.top + d.height * c - r), s),
                  g = Math.min(Math.max(0, f - r), u) / u;
                return (
                  g !== i.scrollPercent &&
                    t.dispatch((0, l.parameterChanged)(a, g)),
                  { scrollPercent: g }
                );
              }
            },
          },
          [h]: eu,
          [N]: eu,
          [v]: {
            ...J,
            handler: ec((e, t) => {
              t.scrollingDown && j(e);
            }),
          },
          [C]: {
            ...J,
            handler: ec((e, t) => {
              t.scrollingDown || j(e);
            }),
          },
          [U]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: W(Y, (e, t) => {
              let a = { finished: "complete" === document.readyState };
              return a.finished && !(t && t.finshed) && j(e), a;
            }),
          },
          [M]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: W(Y, (e, t) => (t || j(e), { started: !0 })),
          },
        };
    },
    4609: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "ixData", {
          enumerable: !0,
          get: function () {
            return i;
          },
        });
      let { IX2_RAW_DATA_IMPORTED: n } = a(7087).IX2EngineActionTypes,
        i = (e = Object.freeze({}), t) =>
          t.type === n ? t.payload.ixData || Object.freeze({}) : e;
    },
    7718: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "ixInstances", {
          enumerable: !0,
          get: function () {
            return O;
          },
        });
      let n = a(7087),
        i = a(9468),
        d = a(1185),
        {
          IX2_RAW_DATA_IMPORTED: o,
          IX2_SESSION_STOPPED: c,
          IX2_INSTANCE_ADDED: r,
          IX2_INSTANCE_STARTED: l,
          IX2_INSTANCE_REMOVED: s,
          IX2_ANIMATION_FRAME_CHANGED: f,
        } = n.IX2EngineActionTypes,
        {
          optimizeFloat: u,
          applyEasing: g,
          createBezierEasing: p,
        } = i.IX2EasingUtils,
        { RENDER_GENERAL: b } = n.IX2EngineConstants,
        {
          getItemConfigByKey: I,
          getRenderType: T,
          getStyleProp: y,
        } = i.IX2VanillaUtils,
        E = (e, t) => {
          let a,
            n,
            i,
            o,
            {
              position: c,
              parameterId: r,
              actionGroups: l,
              destinationKeys: s,
              smoothing: f,
              restingValue: p,
              actionTypeId: b,
              customEasingFn: T,
              skipMotion: y,
              skipToValue: E,
            } = e,
            { parameters: m } = t.payload,
            O = Math.max(1 - f, 0.01),
            S = m[r];
          null == S && ((O = 1), (S = p));
          let _ = u((Math.max(S, 0) || 0) - c),
            R = y ? E : u(c + _ * O),
            L = 100 * R;
          if (R === c && e.current) return e;
          for (let e = 0, { length: t } = l; e < t; e++) {
            let { keyframe: t, actionItems: d } = l[e];
            if ((0 === e && (a = d[0]), L >= t)) {
              a = d[0];
              let c = l[e + 1],
                r = c && L !== t;
              (n = r ? c.actionItems[0] : null),
                r && ((i = t / 100), (o = (c.keyframe - t) / 100));
            }
          }
          let A = {};
          if (a && !n)
            for (let e = 0, { length: t } = s; e < t; e++) {
              let t = s[e];
              A[t] = I(b, t, a.config);
            }
          else if (a && n && void 0 !== i && void 0 !== o) {
            let e = (R - i) / o,
              t = g(a.config.easing, e, T);
            for (let e = 0, { length: i } = s; e < i; e++) {
              let i = s[e],
                d = I(b, i, a.config),
                o = (I(b, i, n.config) - d) * t + d;
              A[i] = o;
            }
          }
          return (0, d.merge)(e, { position: R, current: A });
        },
        m = (e, t) => {
          let {
              active: a,
              origin: n,
              start: i,
              immediate: o,
              renderType: c,
              verbose: r,
              actionItem: l,
              destination: s,
              destinationKeys: f,
              pluginDuration: p,
              instanceDelay: I,
              customEasingFn: T,
              skipMotion: y,
            } = e,
            E = l.config.easing,
            { duration: m, delay: O } = l.config;
          null != p && (m = p),
            (O = null != I ? I : O),
            c === b ? (m = 0) : (o || y) && (m = O = 0);
          let { now: S } = t.payload;
          if (a && n) {
            let t = S - (i + O);
            if (r) {
              let t = m + O,
                a = u(Math.min(Math.max(0, (S - i) / t), 1));
              e = (0, d.set)(e, "verboseTimeElapsed", t * a);
            }
            if (t < 0) return e;
            let a = u(Math.min(Math.max(0, t / m), 1)),
              o = g(E, a, T),
              c = {},
              l = null;
            return (
              f.length &&
                (l = f.reduce((e, t) => {
                  let a = s[t],
                    i = parseFloat(n[t]) || 0,
                    d = parseFloat(a) - i;
                  return (e[t] = d * o + i), e;
                }, {})),
              (c.current = l),
              (c.position = a),
              1 === a && ((c.active = !1), (c.complete = !0)),
              (0, d.merge)(e, c)
            );
          }
          return e;
        },
        O = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case o:
              return t.payload.ixInstances || Object.freeze({});
            case c:
              return Object.freeze({});
            case r: {
              let {
                  instanceId: a,
                  elementId: n,
                  actionItem: i,
                  eventId: o,
                  eventTarget: c,
                  eventStateKey: r,
                  actionListId: l,
                  groupIndex: s,
                  isCarrier: f,
                  origin: u,
                  destination: g,
                  immediate: b,
                  verbose: I,
                  continuous: E,
                  parameterId: m,
                  actionGroups: O,
                  smoothing: S,
                  restingValue: _,
                  pluginInstance: R,
                  pluginDuration: L,
                  instanceDelay: A,
                  skipMotion: v,
                  skipToValue: h,
                } = t.payload,
                { actionTypeId: N } = i,
                C = T(N),
                P = y(C, N),
                U = Object.keys(g).filter(
                  (e) => null != g[e] && "string" != typeof g[e]
                ),
                { easing: G } = i.config;
              return (0, d.set)(e, a, {
                id: a,
                elementId: n,
                active: !1,
                position: 0,
                start: 0,
                origin: u,
                destination: g,
                destinationKeys: U,
                immediate: b,
                verbose: I,
                current: null,
                actionItem: i,
                actionTypeId: N,
                eventId: o,
                eventTarget: c,
                eventStateKey: r,
                actionListId: l,
                groupIndex: s,
                renderType: C,
                isCarrier: f,
                styleProp: P,
                continuous: E,
                parameterId: m,
                actionGroups: O,
                smoothing: S,
                restingValue: _,
                pluginInstance: R,
                pluginDuration: L,
                instanceDelay: A,
                skipMotion: v,
                skipToValue: h,
                customEasingFn:
                  Array.isArray(G) && 4 === G.length ? p(G) : void 0,
              });
            }
            case l: {
              let { instanceId: a, time: n } = t.payload;
              return (0, d.mergeIn)(e, [a], {
                active: !0,
                complete: !1,
                start: n,
              });
            }
            case s: {
              let { instanceId: a } = t.payload;
              if (!e[a]) return e;
              let n = {},
                i = Object.keys(e),
                { length: d } = i;
              for (let t = 0; t < d; t++) {
                let d = i[t];
                d !== a && (n[d] = e[d]);
              }
              return n;
            }
            case f: {
              let a = e,
                n = Object.keys(e),
                { length: i } = n;
              for (let o = 0; o < i; o++) {
                let i = n[o],
                  c = e[i],
                  r = c.continuous ? E : m;
                a = (0, d.set)(a, i, r(c, t));
              }
              return a;
            }
            default:
              return e;
          }
        };
    },
    1540: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "ixParameters", {
          enumerable: !0,
          get: function () {
            return o;
          },
        });
      let {
          IX2_RAW_DATA_IMPORTED: n,
          IX2_SESSION_STOPPED: i,
          IX2_PARAMETER_CHANGED: d,
        } = a(7087).IX2EngineActionTypes,
        o = (e = {}, t) => {
          switch (t.type) {
            case n:
              return t.payload.ixParameters || {};
            case i:
              return {};
            case d: {
              let { key: a, value: n } = t.payload;
              return (e[a] = n), e;
            }
            default:
              return e;
          }
        };
    },
    7243: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "default", {
          enumerable: !0,
          get: function () {
            return f;
          },
        });
      let n = a(9516),
        i = a(4609),
        d = a(628),
        o = a(5862),
        c = a(9468),
        r = a(7718),
        l = a(1540),
        { ixElements: s } = c.IX2ElementsReducer,
        f = (0, n.combineReducers)({
          ixData: i.ixData,
          ixRequest: d.ixRequest,
          ixSession: o.ixSession,
          ixElements: s,
          ixInstances: r.ixInstances,
          ixParameters: l.ixParameters,
        });
    },
    628: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "ixRequest", {
          enumerable: !0,
          get: function () {
            return f;
          },
        });
      let n = a(7087),
        i = a(1185),
        {
          IX2_PREVIEW_REQUESTED: d,
          IX2_PLAYBACK_REQUESTED: o,
          IX2_STOP_REQUESTED: c,
          IX2_CLEAR_REQUESTED: r,
        } = n.IX2EngineActionTypes,
        l = { preview: {}, playback: {}, stop: {}, clear: {} },
        s = Object.create(null, {
          [d]: { value: "preview" },
          [o]: { value: "playback" },
          [c]: { value: "stop" },
          [r]: { value: "clear" },
        }),
        f = (e = l, t) => {
          if (t.type in s) {
            let a = [s[t.type]];
            return (0, i.setIn)(e, [a], { ...t.payload });
          }
          return e;
        };
    },
    5862: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "ixSession", {
          enumerable: !0,
          get: function () {
            return I;
          },
        });
      let n = a(7087),
        i = a(1185),
        {
          IX2_SESSION_INITIALIZED: d,
          IX2_SESSION_STARTED: o,
          IX2_TEST_FRAME_RENDERED: c,
          IX2_SESSION_STOPPED: r,
          IX2_EVENT_LISTENER_ADDED: l,
          IX2_EVENT_STATE_CHANGED: s,
          IX2_ANIMATION_FRAME_CHANGED: f,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: u,
          IX2_VIEWPORT_WIDTH_CHANGED: g,
          IX2_MEDIA_QUERIES_DEFINED: p,
        } = n.IX2EngineActionTypes,
        b = {
          active: !1,
          tick: 0,
          eventListeners: [],
          eventState: {},
          playbackState: {},
          viewportWidth: 0,
          mediaQueryKey: null,
          hasBoundaryNodes: !1,
          hasDefinedMediaQueries: !1,
          reducedMotion: !1,
        },
        I = (e = b, t) => {
          switch (t.type) {
            case d: {
              let { hasBoundaryNodes: a, reducedMotion: n } = t.payload;
              return (0, i.merge)(e, { hasBoundaryNodes: a, reducedMotion: n });
            }
            case o:
              return (0, i.set)(e, "active", !0);
            case c: {
              let {
                payload: { step: a = 20 },
              } = t;
              return (0, i.set)(e, "tick", e.tick + a);
            }
            case r:
              return b;
            case f: {
              let {
                payload: { now: a },
              } = t;
              return (0, i.set)(e, "tick", a);
            }
            case l: {
              let a = (0, i.addLast)(e.eventListeners, t.payload);
              return (0, i.set)(e, "eventListeners", a);
            }
            case s: {
              let { stateKey: a, newState: n } = t.payload;
              return (0, i.setIn)(e, ["eventState", a], n);
            }
            case u: {
              let { actionListId: a, isPlaying: n } = t.payload;
              return (0, i.setIn)(e, ["playbackState", a], n);
            }
            case g: {
              let { width: a, mediaQueries: n } = t.payload,
                d = n.length,
                o = null;
              for (let e = 0; e < d; e++) {
                let { key: t, min: i, max: d } = n[e];
                if (a >= i && a <= d) {
                  o = t;
                  break;
                }
              }
              return (0, i.merge)(e, { viewportWidth: a, mediaQueryKey: o });
            }
            case p:
              return (0, i.set)(e, "hasDefinedMediaQueries", !0);
            default:
              return e;
          }
        };
    },
    7377: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = {
        clearPlugin: function () {
          return s;
        },
        createPluginInstance: function () {
          return r;
        },
        getPluginConfig: function () {
          return i;
        },
        getPluginDestination: function () {
          return c;
        },
        getPluginDuration: function () {
          return d;
        },
        getPluginOrigin: function () {
          return o;
        },
        renderPlugin: function () {
          return l;
        },
      };
      for (var n in a)
        Object.defineProperty(t, n, { enumerable: !0, get: a[n] });
      let i = (e) => e.value,
        d = (e, t) => {
          if ("auto" !== t.config.duration) return null;
          let a = parseFloat(e.getAttribute("data-duration"));
          return a > 0
            ? 1e3 * a
            : 1e3 * parseFloat(e.getAttribute("data-default-duration"));
        },
        o = (e) => e || { value: 0 },
        c = (e) => ({ value: e.value }),
        r = (e) => {
          let t = window.Webflow.require("lottie");
          if (!t) return null;
          let a = t.createInstance(e);
          return a.stop(), a.setSubframe(!0), a;
        },
        l = (e, t, a) => {
          if (!e) return;
          let n = t[a.actionTypeId].value / 100;
          e.goToFrame(e.frames * n);
        },
        s = (e) => {
          let t = window.Webflow.require("lottie");
          t && t.createInstance(e).stop();
        };
    },
    2570: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = {
        clearPlugin: function () {
          return p;
        },
        createPluginInstance: function () {
          return u;
        },
        getPluginConfig: function () {
          return r;
        },
        getPluginDestination: function () {
          return f;
        },
        getPluginDuration: function () {
          return l;
        },
        getPluginOrigin: function () {
          return s;
        },
        renderPlugin: function () {
          return g;
        },
      };
      for (var n in a)
        Object.defineProperty(t, n, { enumerable: !0, get: a[n] });
      let i = "--wf-rive-fit",
        d = "--wf-rive-alignment",
        o = (e) => document.querySelector(`[data-w-id="${e}"]`),
        c = () => window.Webflow.require("rive"),
        r = (e, t) => e.value.inputs[t],
        l = () => null,
        s = (e, t) => {
          if (e) return e;
          let a = {},
            { inputs: n = {} } = t.config.value;
          for (let e in n) null == n[e] && (a[e] = 0);
          return a;
        },
        f = (e) => e.value.inputs ?? {},
        u = (e, t) => {
          if ((t.config?.target?.selectorGuids || []).length > 0) return e;
          let a = t?.config?.target?.pluginElement;
          return a ? o(a) : null;
        },
        g = (e, { PLUGIN_RIVE: t }, a) => {
          let n = c();
          if (!n) return;
          let o = n.getInstance(e),
            r = n.rive.StateMachineInputType,
            { name: l, inputs: s = {} } = a.config.value || {};
          function f(e) {
            if (e.loaded) a();
            else {
              let t = () => {
                a(), e?.off("load", t);
              };
              e?.on("load", t);
            }
            function a() {
              let a = e.stateMachineInputs(l);
              if (null != a) {
                if ((e.isPlaying || e.play(l, !1), i in s || d in s)) {
                  let t = e.layout,
                    a = s[i] ?? t.fit,
                    n = s[d] ?? t.alignment;
                  (a !== t.fit || n !== t.alignment) &&
                    (e.layout = t.copyWith({ fit: a, alignment: n }));
                }
                for (let e in s) {
                  if (e === i || e === d) continue;
                  let n = a.find((t) => t.name === e);
                  if (null != n)
                    switch (n.type) {
                      case r.Boolean:
                        null != s[e] && (n.value = !!s[e]);
                        break;
                      case r.Number: {
                        let a = t[e];
                        null != a && (n.value = a);
                        break;
                      }
                      case r.Trigger:
                        s[e] && n.fire();
                    }
                }
              }
            }
          }
          o?.rive ? f(o.rive) : n.setLoadHandler(e, f);
        },
        p = (e, t) => null;
    },
    2866: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = {
        clearPlugin: function () {
          return p;
        },
        createPluginInstance: function () {
          return u;
        },
        getPluginConfig: function () {
          return c;
        },
        getPluginDestination: function () {
          return f;
        },
        getPluginDuration: function () {
          return r;
        },
        getPluginOrigin: function () {
          return s;
        },
        renderPlugin: function () {
          return g;
        },
      };
      for (var n in a)
        Object.defineProperty(t, n, { enumerable: !0, get: a[n] });
      let i = (e) => document.querySelector(`[data-w-id="${e}"]`),
        d = () => window.Webflow.require("spline"),
        o = (e, t) => e.filter((e) => !t.includes(e)),
        c = (e, t) => e.value[t],
        r = () => null,
        l = Object.freeze({
          positionX: 0,
          positionY: 0,
          positionZ: 0,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          scaleX: 1,
          scaleY: 1,
          scaleZ: 1,
        }),
        s = (e, t) => {
          let a = Object.keys(t.config.value);
          if (e) {
            let t = o(a, Object.keys(e));
            return t.length ? t.reduce((e, t) => ((e[t] = l[t]), e), e) : e;
          }
          return a.reduce((e, t) => ((e[t] = l[t]), e), {});
        },
        f = (e) => e.value,
        u = (e, t) => {
          let a = t?.config?.target?.pluginElement;
          return a ? i(a) : null;
        },
        g = (e, t, a) => {
          let n = d();
          if (!n) return;
          let i = n.getInstance(e),
            o = a.config.target.objectId,
            c = (e) => {
              if (!e) throw Error("Invalid spline app passed to renderSpline");
              let a = o && e.findObjectById(o);
              if (!a) return;
              let { PLUGIN_SPLINE: n } = t;
              null != n.positionX && (a.position.x = n.positionX),
                null != n.positionY && (a.position.y = n.positionY),
                null != n.positionZ && (a.position.z = n.positionZ),
                null != n.rotationX && (a.rotation.x = n.rotationX),
                null != n.rotationY && (a.rotation.y = n.rotationY),
                null != n.rotationZ && (a.rotation.z = n.rotationZ),
                null != n.scaleX && (a.scale.x = n.scaleX),
                null != n.scaleY && (a.scale.y = n.scaleY),
                null != n.scaleZ && (a.scale.z = n.scaleZ);
            };
          i ? c(i.spline) : n.setLoadHandler(e, c);
        },
        p = () => null;
    },
    1407: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        clearPlugin: function () {
          return g;
        },
        createPluginInstance: function () {
          return s;
        },
        getPluginConfig: function () {
          return o;
        },
        getPluginDestination: function () {
          return l;
        },
        getPluginDuration: function () {
          return c;
        },
        getPluginOrigin: function () {
          return r;
        },
        renderPlugin: function () {
          return u;
        },
      };
      for (var i in n)
        Object.defineProperty(t, i, { enumerable: !0, get: n[i] });
      let d = a(380),
        o = (e, t) => e.value[t],
        c = () => null,
        r = (e, t) => {
          if (e) return e;
          let a = t.config.value,
            n = t.config.target.objectId,
            i = getComputedStyle(document.documentElement).getPropertyValue(n);
          return null != a.size
            ? { size: parseInt(i, 10) }
            : "%" === a.unit || "-" === a.unit
            ? { size: parseFloat(i) }
            : null != a.red && null != a.green && null != a.blue
            ? (0, d.normalizeColor)(i)
            : void 0;
        },
        l = (e) => e.value,
        s = () => null,
        f = {
          color: {
            match: ({ red: e, green: t, blue: a, alpha: n }) =>
              [e, t, a, n].every((e) => null != e),
            getValue: ({ red: e, green: t, blue: a, alpha: n }) =>
              `rgba(${e}, ${t}, ${a}, ${n})`,
          },
          size: {
            match: ({ size: e }) => null != e,
            getValue: ({ size: e }, t) => ("-" === t ? e : `${e}${t}`),
          },
        },
        u = (e, t, a) => {
          let {
              target: { objectId: n },
              value: { unit: i },
            } = a.config,
            d = t.PLUGIN_VARIABLE,
            o = Object.values(f).find((e) => e.match(d, i));
          o && document.documentElement.style.setProperty(n, o.getValue(d, i));
        },
        g = (e, t) => {
          let a = t.config.target.objectId;
          document.documentElement.style.removeProperty(a);
        };
    },
    3690: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "pluginMethodMap", {
          enumerable: !0,
          get: function () {
            return s;
          },
        });
      let n = a(7087),
        i = l(a(7377)),
        d = l(a(2866)),
        o = l(a(2570)),
        c = l(a(1407));
      function r(e) {
        if ("function" != typeof WeakMap) return null;
        var t = new WeakMap(),
          a = new WeakMap();
        return (r = function (e) {
          return e ? a : t;
        })(e);
      }
      function l(e, t) {
        if (!t && e && e.__esModule) return e;
        if (null === e || ("object" != typeof e && "function" != typeof e))
          return { default: e };
        var a = r(t);
        if (a && a.has(e)) return a.get(e);
        var n = { __proto__: null },
          i = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var d in e)
          if ("default" !== d && Object.prototype.hasOwnProperty.call(e, d)) {
            var o = i ? Object.getOwnPropertyDescriptor(e, d) : null;
            o && (o.get || o.set)
              ? Object.defineProperty(n, d, o)
              : (n[d] = e[d]);
          }
        return (n.default = e), a && a.set(e, n), n;
      }
      let s = new Map([
        [n.ActionTypeConsts.PLUGIN_LOTTIE, { ...i }],
        [n.ActionTypeConsts.PLUGIN_SPLINE, { ...d }],
        [n.ActionTypeConsts.PLUGIN_RIVE, { ...o }],
        [n.ActionTypeConsts.PLUGIN_VARIABLE, { ...c }],
      ]);
    },
    8023: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = {
        IX2_ACTION_LIST_PLAYBACK_CHANGED: function () {
          return m;
        },
        IX2_ANIMATION_FRAME_CHANGED: function () {
          return p;
        },
        IX2_CLEAR_REQUESTED: function () {
          return f;
        },
        IX2_ELEMENT_STATE_CHANGED: function () {
          return E;
        },
        IX2_EVENT_LISTENER_ADDED: function () {
          return u;
        },
        IX2_EVENT_STATE_CHANGED: function () {
          return g;
        },
        IX2_INSTANCE_ADDED: function () {
          return I;
        },
        IX2_INSTANCE_REMOVED: function () {
          return y;
        },
        IX2_INSTANCE_STARTED: function () {
          return T;
        },
        IX2_MEDIA_QUERIES_DEFINED: function () {
          return S;
        },
        IX2_PARAMETER_CHANGED: function () {
          return b;
        },
        IX2_PLAYBACK_REQUESTED: function () {
          return l;
        },
        IX2_PREVIEW_REQUESTED: function () {
          return r;
        },
        IX2_RAW_DATA_IMPORTED: function () {
          return i;
        },
        IX2_SESSION_INITIALIZED: function () {
          return d;
        },
        IX2_SESSION_STARTED: function () {
          return o;
        },
        IX2_SESSION_STOPPED: function () {
          return c;
        },
        IX2_STOP_REQUESTED: function () {
          return s;
        },
        IX2_TEST_FRAME_RENDERED: function () {
          return _;
        },
        IX2_VIEWPORT_WIDTH_CHANGED: function () {
          return O;
        },
      };
      for (var n in a)
        Object.defineProperty(t, n, { enumerable: !0, get: a[n] });
      let i = "IX2_RAW_DATA_IMPORTED",
        d = "IX2_SESSION_INITIALIZED",
        o = "IX2_SESSION_STARTED",
        c = "IX2_SESSION_STOPPED",
        r = "IX2_PREVIEW_REQUESTED",
        l = "IX2_PLAYBACK_REQUESTED",
        s = "IX2_STOP_REQUESTED",
        f = "IX2_CLEAR_REQUESTED",
        u = "IX2_EVENT_LISTENER_ADDED",
        g = "IX2_EVENT_STATE_CHANGED",
        p = "IX2_ANIMATION_FRAME_CHANGED",
        b = "IX2_PARAMETER_CHANGED",
        I = "IX2_INSTANCE_ADDED",
        T = "IX2_INSTANCE_STARTED",
        y = "IX2_INSTANCE_REMOVED",
        E = "IX2_ELEMENT_STATE_CHANGED",
        m = "IX2_ACTION_LIST_PLAYBACK_CHANGED",
        O = "IX2_VIEWPORT_WIDTH_CHANGED",
        S = "IX2_MEDIA_QUERIES_DEFINED",
        _ = "IX2_TEST_FRAME_RENDERED";
    },
    2686: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = {
        ABSTRACT_NODE: function () {
          return et;
        },
        AUTO: function () {
          return B;
        },
        BACKGROUND: function () {
          return F;
        },
        BACKGROUND_COLOR: function () {
          return w;
        },
        BAR_DELIMITER: function () {
          return j;
        },
        BORDER_COLOR: function () {
          return k;
        },
        BOUNDARY_SELECTOR: function () {
          return r;
        },
        CHILDREN: function () {
          return W;
        },
        COLON_DELIMITER: function () {
          return z;
        },
        COLOR: function () {
          return D;
        },
        COMMA_DELIMITER: function () {
          return H;
        },
        CONFIG_UNIT: function () {
          return I;
        },
        CONFIG_VALUE: function () {
          return u;
        },
        CONFIG_X_UNIT: function () {
          return g;
        },
        CONFIG_X_VALUE: function () {
          return l;
        },
        CONFIG_Y_UNIT: function () {
          return p;
        },
        CONFIG_Y_VALUE: function () {
          return s;
        },
        CONFIG_Z_UNIT: function () {
          return b;
        },
        CONFIG_Z_VALUE: function () {
          return f;
        },
        DISPLAY: function () {
          return X;
        },
        FILTER: function () {
          return G;
        },
        FLEX: function () {
          return Y;
        },
        FONT_VARIATION_SETTINGS: function () {
          return V;
        },
        HEIGHT: function () {
          return x;
        },
        HTML_ELEMENT: function () {
          return J;
        },
        IMMEDIATE_CHILDREN: function () {
          return q;
        },
        IX2_ID_DELIMITER: function () {
          return i;
        },
        OPACITY: function () {
          return U;
        },
        PARENT: function () {
          return Z;
        },
        PLAIN_OBJECT: function () {
          return ee;
        },
        PRESERVE_3D: function () {
          return K;
        },
        RENDER_GENERAL: function () {
          return en;
        },
        RENDER_PLUGIN: function () {
          return ed;
        },
        RENDER_STYLE: function () {
          return ei;
        },
        RENDER_TRANSFORM: function () {
          return ea;
        },
        ROTATE_X: function () {
          return A;
        },
        ROTATE_Y: function () {
          return v;
        },
        ROTATE_Z: function () {
          return h;
        },
        SCALE_3D: function () {
          return L;
        },
        SCALE_X: function () {
          return S;
        },
        SCALE_Y: function () {
          return _;
        },
        SCALE_Z: function () {
          return R;
        },
        SIBLINGS: function () {
          return $;
        },
        SKEW: function () {
          return N;
        },
        SKEW_X: function () {
          return C;
        },
        SKEW_Y: function () {
          return P;
        },
        TRANSFORM: function () {
          return T;
        },
        TRANSLATE_3D: function () {
          return O;
        },
        TRANSLATE_X: function () {
          return y;
        },
        TRANSLATE_Y: function () {
          return E;
        },
        TRANSLATE_Z: function () {
          return m;
        },
        WF_PAGE: function () {
          return d;
        },
        WIDTH: function () {
          return M;
        },
        WILL_CHANGE: function () {
          return Q;
        },
        W_MOD_IX: function () {
          return c;
        },
        W_MOD_JS: function () {
          return o;
        },
      };
      for (var n in a)
        Object.defineProperty(t, n, { enumerable: !0, get: a[n] });
      let i = "|",
        d = "data-wf-page",
        o = "w-mod-js",
        c = "w-mod-ix",
        r = ".w-dyn-item",
        l = "xValue",
        s = "yValue",
        f = "zValue",
        u = "value",
        g = "xUnit",
        p = "yUnit",
        b = "zUnit",
        I = "unit",
        T = "transform",
        y = "translateX",
        E = "translateY",
        m = "translateZ",
        O = "translate3d",
        S = "scaleX",
        _ = "scaleY",
        R = "scaleZ",
        L = "scale3d",
        A = "rotateX",
        v = "rotateY",
        h = "rotateZ",
        N = "skew",
        C = "skewX",
        P = "skewY",
        U = "opacity",
        G = "filter",
        V = "font-variation-settings",
        M = "width",
        x = "height",
        w = "backgroundColor",
        F = "background",
        k = "borderColor",
        D = "color",
        X = "display",
        Y = "flex",
        Q = "willChange",
        B = "AUTO",
        H = ",",
        z = ":",
        j = "|",
        W = "CHILDREN",
        q = "IMMEDIATE_CHILDREN",
        $ = "SIBLINGS",
        Z = "PARENT",
        K = "preserve-3d",
        J = "HTML_ELEMENT",
        ee = "PLAIN_OBJECT",
        et = "ABSTRACT_NODE",
        ea = "RENDER_TRANSFORM",
        en = "RENDER_GENERAL",
        ei = "RENDER_STYLE",
        ed = "RENDER_PLUGIN";
    },
    262: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = {
        ActionAppliesTo: function () {
          return d;
        },
        ActionTypeConsts: function () {
          return i;
        },
      };
      for (var n in a)
        Object.defineProperty(t, n, { enumerable: !0, get: a[n] });
      let i = {
          TRANSFORM_MOVE: "TRANSFORM_MOVE",
          TRANSFORM_SCALE: "TRANSFORM_SCALE",
          TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
          TRANSFORM_SKEW: "TRANSFORM_SKEW",
          STYLE_OPACITY: "STYLE_OPACITY",
          STYLE_SIZE: "STYLE_SIZE",
          STYLE_FILTER: "STYLE_FILTER",
          STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
          STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
          STYLE_BORDER: "STYLE_BORDER",
          STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
          OBJECT_VALUE: "OBJECT_VALUE",
          PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
          PLUGIN_SPLINE: "PLUGIN_SPLINE",
          PLUGIN_RIVE: "PLUGIN_RIVE",
          PLUGIN_VARIABLE: "PLUGIN_VARIABLE",
          GENERAL_DISPLAY: "GENERAL_DISPLAY",
          GENERAL_START_ACTION: "GENERAL_START_ACTION",
          GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
          GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
          GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
          GENERAL_LOOP: "GENERAL_LOOP",
          STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
        },
        d = {
          ELEMENT: "ELEMENT",
          ELEMENT_CLASS: "ELEMENT_CLASS",
          TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
        };
    },
    7087: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        ActionTypeConsts: function () {
          return o.ActionTypeConsts;
        },
        IX2EngineActionTypes: function () {
          return c;
        },
        IX2EngineConstants: function () {
          return r;
        },
        QuickEffectIds: function () {
          return d.QuickEffectIds;
        },
      };
      for (var i in n)
        Object.defineProperty(t, i, { enumerable: !0, get: n[i] });
      let d = l(a(1833), t),
        o = l(a(262), t);
      l(a(8704), t), l(a(3213), t);
      let c = f(a(8023)),
        r = f(a(2686));
      function l(e, t) {
        return (
          Object.keys(e).forEach(function (a) {
            "default" === a ||
              Object.prototype.hasOwnProperty.call(t, a) ||
              Object.defineProperty(t, a, {
                enumerable: !0,
                get: function () {
                  return e[a];
                },
              });
          }),
          e
        );
      }
      function s(e) {
        if ("function" != typeof WeakMap) return null;
        var t = new WeakMap(),
          a = new WeakMap();
        return (s = function (e) {
          return e ? a : t;
        })(e);
      }
      function f(e, t) {
        if (!t && e && e.__esModule) return e;
        if (null === e || ("object" != typeof e && "function" != typeof e))
          return { default: e };
        var a = s(t);
        if (a && a.has(e)) return a.get(e);
        var n = { __proto__: null },
          i = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var d in e)
          if ("default" !== d && Object.prototype.hasOwnProperty.call(e, d)) {
            var o = i ? Object.getOwnPropertyDescriptor(e, d) : null;
            o && (o.get || o.set)
              ? Object.defineProperty(n, d, o)
              : (n[d] = e[d]);
          }
        return (n.default = e), a && a.set(e, n), n;
      }
    },
    3213: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "ReducedMotionTypes", {
          enumerable: !0,
          get: function () {
            return s;
          },
        });
      let {
          TRANSFORM_MOVE: n,
          TRANSFORM_SCALE: i,
          TRANSFORM_ROTATE: d,
          TRANSFORM_SKEW: o,
          STYLE_SIZE: c,
          STYLE_FILTER: r,
          STYLE_FONT_VARIATION: l,
        } = a(262).ActionTypeConsts,
        s = { [n]: !0, [i]: !0, [d]: !0, [o]: !0, [c]: !0, [r]: !0, [l]: !0 };
    },
    1833: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = {
        EventAppliesTo: function () {
          return d;
        },
        EventBasedOn: function () {
          return o;
        },
        EventContinuousMouseAxes: function () {
          return c;
        },
        EventLimitAffectedElements: function () {
          return r;
        },
        EventTypeConsts: function () {
          return i;
        },
        QuickEffectDirectionConsts: function () {
          return s;
        },
        QuickEffectIds: function () {
          return l;
        },
      };
      for (var n in a)
        Object.defineProperty(t, n, { enumerable: !0, get: a[n] });
      let i = {
          NAVBAR_OPEN: "NAVBAR_OPEN",
          NAVBAR_CLOSE: "NAVBAR_CLOSE",
          TAB_ACTIVE: "TAB_ACTIVE",
          TAB_INACTIVE: "TAB_INACTIVE",
          SLIDER_ACTIVE: "SLIDER_ACTIVE",
          SLIDER_INACTIVE: "SLIDER_INACTIVE",
          DROPDOWN_OPEN: "DROPDOWN_OPEN",
          DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
          MOUSE_CLICK: "MOUSE_CLICK",
          MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
          MOUSE_DOWN: "MOUSE_DOWN",
          MOUSE_UP: "MOUSE_UP",
          MOUSE_OVER: "MOUSE_OVER",
          MOUSE_OUT: "MOUSE_OUT",
          MOUSE_MOVE: "MOUSE_MOVE",
          MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
          SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
          SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
          SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
          ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
          ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
          PAGE_START: "PAGE_START",
          PAGE_FINISH: "PAGE_FINISH",
          PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
          PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
          PAGE_SCROLL: "PAGE_SCROLL",
        },
        d = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" },
        o = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" },
        c = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" },
        r = {
          CHILDREN: "CHILDREN",
          SIBLINGS: "SIBLINGS",
          IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
        },
        l = {
          FADE_EFFECT: "FADE_EFFECT",
          SLIDE_EFFECT: "SLIDE_EFFECT",
          GROW_EFFECT: "GROW_EFFECT",
          SHRINK_EFFECT: "SHRINK_EFFECT",
          SPIN_EFFECT: "SPIN_EFFECT",
          FLY_EFFECT: "FLY_EFFECT",
          POP_EFFECT: "POP_EFFECT",
          FLIP_EFFECT: "FLIP_EFFECT",
          JIGGLE_EFFECT: "JIGGLE_EFFECT",
          PULSE_EFFECT: "PULSE_EFFECT",
          DROP_EFFECT: "DROP_EFFECT",
          BLINK_EFFECT: "BLINK_EFFECT",
          BOUNCE_EFFECT: "BOUNCE_EFFECT",
          FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
          FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
          RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
          JELLO_EFFECT: "JELLO_EFFECT",
          GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
          SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
          PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
        },
        s = {
          LEFT: "LEFT",
          RIGHT: "RIGHT",
          BOTTOM: "BOTTOM",
          TOP: "TOP",
          BOTTOM_LEFT: "BOTTOM_LEFT",
          BOTTOM_RIGHT: "BOTTOM_RIGHT",
          TOP_RIGHT: "TOP_RIGHT",
          TOP_LEFT: "TOP_LEFT",
          CLOCKWISE: "CLOCKWISE",
          COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
        };
    },
    8704: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "InteractionTypeConsts", {
          enumerable: !0,
          get: function () {
            return a;
          },
        });
      let a = {
        MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
        MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
        MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
        SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
        SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
        MOUSE_MOVE_IN_VIEWPORT_INTERACTION:
          "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
        PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
        PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
        PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
        NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
        DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
        ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
        TAB_INTERACTION: "TAB_INTERACTION",
        SLIDER_INTERACTION: "SLIDER_INTERACTION",
      };
    },
    380: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "normalizeColor", {
          enumerable: !0,
          get: function () {
            return n;
          },
        });
      let a = {
        aliceblue: "#F0F8FF",
        antiquewhite: "#FAEBD7",
        aqua: "#00FFFF",
        aquamarine: "#7FFFD4",
        azure: "#F0FFFF",
        beige: "#F5F5DC",
        bisque: "#FFE4C4",
        black: "#000000",
        blanchedalmond: "#FFEBCD",
        blue: "#0000FF",
        blueviolet: "#8A2BE2",
        brown: "#A52A2A",
        burlywood: "#DEB887",
        cadetblue: "#5F9EA0",
        chartreuse: "#7FFF00",
        chocolate: "#D2691E",
        coral: "#FF7F50",
        cornflowerblue: "#6495ED",
        cornsilk: "#FFF8DC",
        crimson: "#DC143C",
        cyan: "#00FFFF",
        darkblue: "#00008B",
        darkcyan: "#008B8B",
        darkgoldenrod: "#B8860B",
        darkgray: "#A9A9A9",
        darkgreen: "#006400",
        darkgrey: "#A9A9A9",
        darkkhaki: "#BDB76B",
        darkmagenta: "#8B008B",
        darkolivegreen: "#556B2F",
        darkorange: "#FF8C00",
        darkorchid: "#9932CC",
        darkred: "#8B0000",
        darksalmon: "#E9967A",
        darkseagreen: "#8FBC8F",
        darkslateblue: "#483D8B",
        darkslategray: "#2F4F4F",
        darkslategrey: "#2F4F4F",
        darkturquoise: "#00CED1",
        darkviolet: "#9400D3",
        deeppink: "#FF1493",
        deepskyblue: "#00BFFF",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1E90FF",
        firebrick: "#B22222",
        floralwhite: "#FFFAF0",
        forestgreen: "#228B22",
        fuchsia: "#FF00FF",
        gainsboro: "#DCDCDC",
        ghostwhite: "#F8F8FF",
        gold: "#FFD700",
        goldenrod: "#DAA520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#ADFF2F",
        grey: "#808080",
        honeydew: "#F0FFF0",
        hotpink: "#FF69B4",
        indianred: "#CD5C5C",
        indigo: "#4B0082",
        ivory: "#FFFFF0",
        khaki: "#F0E68C",
        lavender: "#E6E6FA",
        lavenderblush: "#FFF0F5",
        lawngreen: "#7CFC00",
        lemonchiffon: "#FFFACD",
        lightblue: "#ADD8E6",
        lightcoral: "#F08080",
        lightcyan: "#E0FFFF",
        lightgoldenrodyellow: "#FAFAD2",
        lightgray: "#D3D3D3",
        lightgreen: "#90EE90",
        lightgrey: "#D3D3D3",
        lightpink: "#FFB6C1",
        lightsalmon: "#FFA07A",
        lightseagreen: "#20B2AA",
        lightskyblue: "#87CEFA",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#B0C4DE",
        lightyellow: "#FFFFE0",
        lime: "#00FF00",
        limegreen: "#32CD32",
        linen: "#FAF0E6",
        magenta: "#FF00FF",
        maroon: "#800000",
        mediumaquamarine: "#66CDAA",
        mediumblue: "#0000CD",
        mediumorchid: "#BA55D3",
        mediumpurple: "#9370DB",
        mediumseagreen: "#3CB371",
        mediumslateblue: "#7B68EE",
        mediumspringgreen: "#00FA9A",
        mediumturquoise: "#48D1CC",
        mediumvioletred: "#C71585",
        midnightblue: "#191970",
        mintcream: "#F5FFFA",
        mistyrose: "#FFE4E1",
        moccasin: "#FFE4B5",
        navajowhite: "#FFDEAD",
        navy: "#000080",
        oldlace: "#FDF5E6",
        olive: "#808000",
        olivedrab: "#6B8E23",
        orange: "#FFA500",
        orangered: "#FF4500",
        orchid: "#DA70D6",
        palegoldenrod: "#EEE8AA",
        palegreen: "#98FB98",
        paleturquoise: "#AFEEEE",
        palevioletred: "#DB7093",
        papayawhip: "#FFEFD5",
        peachpuff: "#FFDAB9",
        peru: "#CD853F",
        pink: "#FFC0CB",
        plum: "#DDA0DD",
        powderblue: "#B0E0E6",
        purple: "#800080",
        rebeccapurple: "#663399",
        red: "#FF0000",
        rosybrown: "#BC8F8F",
        royalblue: "#4169E1",
        saddlebrown: "#8B4513",
        salmon: "#FA8072",
        sandybrown: "#F4A460",
        seagreen: "#2E8B57",
        seashell: "#FFF5EE",
        sienna: "#A0522D",
        silver: "#C0C0C0",
        skyblue: "#87CEEB",
        slateblue: "#6A5ACD",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#FFFAFA",
        springgreen: "#00FF7F",
        steelblue: "#4682B4",
        tan: "#D2B48C",
        teal: "#008080",
        thistle: "#D8BFD8",
        tomato: "#FF6347",
        turquoise: "#40E0D0",
        violet: "#EE82EE",
        wheat: "#F5DEB3",
        white: "#FFFFFF",
        whitesmoke: "#F5F5F5",
        yellow: "#FFFF00",
        yellowgreen: "#9ACD32",
      };
      function n(e) {
        let t,
          n,
          i,
          d = 1,
          o = e.replace(/\s/g, "").toLowerCase(),
          c = ("string" == typeof a[o] ? a[o].toLowerCase() : null) || o;
        if (c.startsWith("#")) {
          let e = c.substring(1);
          3 === e.length || 4 === e.length
            ? ((t = parseInt(e[0] + e[0], 16)),
              (n = parseInt(e[1] + e[1], 16)),
              (i = parseInt(e[2] + e[2], 16)),
              4 === e.length && (d = parseInt(e[3] + e[3], 16) / 255))
            : (6 === e.length || 8 === e.length) &&
              ((t = parseInt(e.substring(0, 2), 16)),
              (n = parseInt(e.substring(2, 4), 16)),
              (i = parseInt(e.substring(4, 6), 16)),
              8 === e.length && (d = parseInt(e.substring(6, 8), 16) / 255));
        } else if (c.startsWith("rgba")) {
          let e = c.match(/rgba\(([^)]+)\)/)[1].split(",");
          (t = parseInt(e[0], 10)),
            (n = parseInt(e[1], 10)),
            (i = parseInt(e[2], 10)),
            (d = parseFloat(e[3]));
        } else if (c.startsWith("rgb")) {
          let e = c.match(/rgb\(([^)]+)\)/)[1].split(",");
          (t = parseInt(e[0], 10)),
            (n = parseInt(e[1], 10)),
            (i = parseInt(e[2], 10));
        } else if (c.startsWith("hsla")) {
          let e,
            a,
            o,
            r = c.match(/hsla\(([^)]+)\)/)[1].split(","),
            l = parseFloat(r[0]),
            s = parseFloat(r[1].replace("%", "")) / 100,
            f = parseFloat(r[2].replace("%", "")) / 100;
          d = parseFloat(r[3]);
          let u = (1 - Math.abs(2 * f - 1)) * s,
            g = u * (1 - Math.abs(((l / 60) % 2) - 1)),
            p = f - u / 2;
          l >= 0 && l < 60
            ? ((e = u), (a = g), (o = 0))
            : l >= 60 && l < 120
            ? ((e = g), (a = u), (o = 0))
            : l >= 120 && l < 180
            ? ((e = 0), (a = u), (o = g))
            : l >= 180 && l < 240
            ? ((e = 0), (a = g), (o = u))
            : l >= 240 && l < 300
            ? ((e = g), (a = 0), (o = u))
            : ((e = u), (a = 0), (o = g)),
            (t = Math.round((e + p) * 255)),
            (n = Math.round((a + p) * 255)),
            (i = Math.round((o + p) * 255));
        } else if (c.startsWith("hsl")) {
          let e,
            a,
            d,
            o = c.match(/hsl\(([^)]+)\)/)[1].split(","),
            r = parseFloat(o[0]),
            l = parseFloat(o[1].replace("%", "")) / 100,
            s = parseFloat(o[2].replace("%", "")) / 100,
            f = (1 - Math.abs(2 * s - 1)) * l,
            u = f * (1 - Math.abs(((r / 60) % 2) - 1)),
            g = s - f / 2;
          r >= 0 && r < 60
            ? ((e = f), (a = u), (d = 0))
            : r >= 60 && r < 120
            ? ((e = u), (a = f), (d = 0))
            : r >= 120 && r < 180
            ? ((e = 0), (a = f), (d = u))
            : r >= 180 && r < 240
            ? ((e = 0), (a = u), (d = f))
            : r >= 240 && r < 300
            ? ((e = u), (a = 0), (d = f))
            : ((e = f), (a = 0), (d = u)),
            (t = Math.round((e + g) * 255)),
            (n = Math.round((a + g) * 255)),
            (i = Math.round((d + g) * 255));
        }
        if (Number.isNaN(t) || Number.isNaN(n) || Number.isNaN(i))
          throw Error(
            `Invalid color in [ix2/shared/utils/normalizeColor.js] '${e}'`
          );
        return { red: t, green: n, blue: i, alpha: d };
      }
    },
    9468: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        IX2BrowserSupport: function () {
          return d;
        },
        IX2EasingUtils: function () {
          return c;
        },
        IX2Easings: function () {
          return o;
        },
        IX2ElementsReducer: function () {
          return r;
        },
        IX2VanillaPlugins: function () {
          return l;
        },
        IX2VanillaUtils: function () {
          return s;
        },
      };
      for (var i in n)
        Object.defineProperty(t, i, { enumerable: !0, get: n[i] });
      let d = u(a(2662)),
        o = u(a(8686)),
        c = u(a(3767)),
        r = u(a(5861)),
        l = u(a(1799)),
        s = u(a(4124));
      function f(e) {
        if ("function" != typeof WeakMap) return null;
        var t = new WeakMap(),
          a = new WeakMap();
        return (f = function (e) {
          return e ? a : t;
        })(e);
      }
      function u(e, t) {
        if (!t && e && e.__esModule) return e;
        if (null === e || ("object" != typeof e && "function" != typeof e))
          return { default: e };
        var a = f(t);
        if (a && a.has(e)) return a.get(e);
        var n = { __proto__: null },
          i = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var d in e)
          if ("default" !== d && Object.prototype.hasOwnProperty.call(e, d)) {
            var o = i ? Object.getOwnPropertyDescriptor(e, d) : null;
            o && (o.get || o.set)
              ? Object.defineProperty(n, d, o)
              : (n[d] = e[d]);
          }
        return (n.default = e), a && a.set(e, n), n;
      }
    },
    2662: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        i = {
          ELEMENT_MATCHES: function () {
            return l;
          },
          FLEX_PREFIXED: function () {
            return s;
          },
          IS_BROWSER_ENV: function () {
            return c;
          },
          TRANSFORM_PREFIXED: function () {
            return f;
          },
          TRANSFORM_STYLE_PREFIXED: function () {
            return g;
          },
          withBrowser: function () {
            return r;
          },
        };
      for (var d in i)
        Object.defineProperty(t, d, { enumerable: !0, get: i[d] });
      let o = (n = a(9777)) && n.__esModule ? n : { default: n },
        c = "undefined" != typeof window,
        r = (e, t) => (c ? e() : t),
        l = r(() =>
          (0, o.default)(
            [
              "matches",
              "matchesSelector",
              "mozMatchesSelector",
              "msMatchesSelector",
              "oMatchesSelector",
              "webkitMatchesSelector",
            ],
            (e) => e in Element.prototype
          )
        ),
        s = r(() => {
          let e = document.createElement("i"),
            t = [
              "flex",
              "-webkit-flex",
              "-ms-flexbox",
              "-moz-box",
              "-webkit-box",
            ];
          try {
            let { length: a } = t;
            for (let n = 0; n < a; n++) {
              let a = t[n];
              if (((e.style.display = a), e.style.display === a)) return a;
            }
            return "";
          } catch (e) {
            return "";
          }
        }, "flex"),
        f = r(() => {
          let e = document.createElement("i");
          if (null == e.style.transform) {
            let t = ["Webkit", "Moz", "ms"],
              { length: a } = t;
            for (let n = 0; n < a; n++) {
              let a = t[n] + "Transform";
              if (void 0 !== e.style[a]) return a;
            }
          }
          return "transform";
        }, "transform"),
        u = f.split("transform")[0],
        g = u ? u + "TransformStyle" : "transformStyle";
    },
    3767: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        i = {
          applyEasing: function () {
            return f;
          },
          createBezierEasing: function () {
            return s;
          },
          optimizeFloat: function () {
            return l;
          },
        };
      for (var d in i)
        Object.defineProperty(t, d, { enumerable: !0, get: i[d] });
      let o = (function (e, t) {
          if (e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var a = r(t);
          if (a && a.has(e)) return a.get(e);
          var n = { __proto__: null },
            i = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var d in e)
            if ("default" !== d && Object.prototype.hasOwnProperty.call(e, d)) {
              var o = i ? Object.getOwnPropertyDescriptor(e, d) : null;
              o && (o.get || o.set)
                ? Object.defineProperty(n, d, o)
                : (n[d] = e[d]);
            }
          return (n.default = e), a && a.set(e, n), n;
        })(a(8686)),
        c = (n = a(1361)) && n.__esModule ? n : { default: n };
      function r(e) {
        if ("function" != typeof WeakMap) return null;
        var t = new WeakMap(),
          a = new WeakMap();
        return (r = function (e) {
          return e ? a : t;
        })(e);
      }
      function l(e, t = 5, a = 10) {
        let n = Math.pow(a, t),
          i = Number(Math.round(e * n) / n);
        return Math.abs(i) > 1e-4 ? i : 0;
      }
      function s(e) {
        return (0, c.default)(...e);
      }
      function f(e, t, a) {
        return 0 === t
          ? 0
          : 1 === t
          ? 1
          : a
          ? l(t > 0 ? a(t) : t)
          : l(t > 0 && e && o[e] ? o[e](t) : t);
      }
    },
    8686: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n,
        i = {
          bounce: function () {
            return Y;
          },
          bouncePast: function () {
            return Q;
          },
          ease: function () {
            return c;
          },
          easeIn: function () {
            return r;
          },
          easeInOut: function () {
            return s;
          },
          easeOut: function () {
            return l;
          },
          inBack: function () {
            return G;
          },
          inCirc: function () {
            return N;
          },
          inCubic: function () {
            return p;
          },
          inElastic: function () {
            return x;
          },
          inExpo: function () {
            return A;
          },
          inOutBack: function () {
            return M;
          },
          inOutCirc: function () {
            return P;
          },
          inOutCubic: function () {
            return I;
          },
          inOutElastic: function () {
            return F;
          },
          inOutExpo: function () {
            return h;
          },
          inOutQuad: function () {
            return g;
          },
          inOutQuart: function () {
            return E;
          },
          inOutQuint: function () {
            return S;
          },
          inOutSine: function () {
            return L;
          },
          inQuad: function () {
            return f;
          },
          inQuart: function () {
            return T;
          },
          inQuint: function () {
            return m;
          },
          inSine: function () {
            return _;
          },
          outBack: function () {
            return V;
          },
          outBounce: function () {
            return U;
          },
          outCirc: function () {
            return C;
          },
          outCubic: function () {
            return b;
          },
          outElastic: function () {
            return w;
          },
          outExpo: function () {
            return v;
          },
          outQuad: function () {
            return u;
          },
          outQuart: function () {
            return y;
          },
          outQuint: function () {
            return O;
          },
          outSine: function () {
            return R;
          },
          swingFrom: function () {
            return D;
          },
          swingFromTo: function () {
            return k;
          },
          swingTo: function () {
            return X;
          },
        };
      for (var d in i)
        Object.defineProperty(t, d, { enumerable: !0, get: i[d] });
      let o = (n = a(1361)) && n.__esModule ? n : { default: n },
        c = (0, o.default)(0.25, 0.1, 0.25, 1),
        r = (0, o.default)(0.42, 0, 1, 1),
        l = (0, o.default)(0, 0, 0.58, 1),
        s = (0, o.default)(0.42, 0, 0.58, 1);
      function f(e) {
        return Math.pow(e, 2);
      }
      function u(e) {
        return -(Math.pow(e - 1, 2) - 1);
      }
      function g(e) {
        return (e /= 0.5) < 1
          ? 0.5 * Math.pow(e, 2)
          : -0.5 * ((e -= 2) * e - 2);
      }
      function p(e) {
        return Math.pow(e, 3);
      }
      function b(e) {
        return Math.pow(e - 1, 3) + 1;
      }
      function I(e) {
        return (e /= 0.5) < 1
          ? 0.5 * Math.pow(e, 3)
          : 0.5 * (Math.pow(e - 2, 3) + 2);
      }
      function T(e) {
        return Math.pow(e, 4);
      }
      function y(e) {
        return -(Math.pow(e - 1, 4) - 1);
      }
      function E(e) {
        return (e /= 0.5) < 1
          ? 0.5 * Math.pow(e, 4)
          : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
      }
      function m(e) {
        return Math.pow(e, 5);
      }
      function O(e) {
        return Math.pow(e - 1, 5) + 1;
      }
      function S(e) {
        return (e /= 0.5) < 1
          ? 0.5 * Math.pow(e, 5)
          : 0.5 * (Math.pow(e - 2, 5) + 2);
      }
      function _(e) {
        return -Math.cos((Math.PI / 2) * e) + 1;
      }
      function R(e) {
        return Math.sin((Math.PI / 2) * e);
      }
      function L(e) {
        return -0.5 * (Math.cos(Math.PI * e) - 1);
      }
      function A(e) {
        return 0 === e ? 0 : Math.pow(2, 10 * (e - 1));
      }
      function v(e) {
        return 1 === e ? 1 : -Math.pow(2, -10 * e) + 1;
      }
      function h(e) {
        return 0 === e
          ? 0
          : 1 === e
          ? 1
          : (e /= 0.5) < 1
          ? 0.5 * Math.pow(2, 10 * (e - 1))
          : 0.5 * (-Math.pow(2, -10 * --e) + 2);
      }
      function N(e) {
        return -(Math.sqrt(1 - e * e) - 1);
      }
      function C(e) {
        return Math.sqrt(1 - Math.pow(e - 1, 2));
      }
      function P(e) {
        return (e /= 0.5) < 1
          ? -0.5 * (Math.sqrt(1 - e * e) - 1)
          : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
      }
      function U(e) {
        return e < 1 / 2.75
          ? 7.5625 * e * e
          : e < 2 / 2.75
          ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
          : e < 2.5 / 2.75
          ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
          : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
      }
      function G(e) {
        return e * e * (2.70158 * e - 1.70158);
      }
      function V(e) {
        return (e -= 1) * e * (2.70158 * e + 1.70158) + 1;
      }
      function M(e) {
        let t = 1.70158;
        return (e /= 0.5) < 1
          ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
          : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
      }
      function x(e) {
        let t = 1.70158,
          a = 0,
          n = 1;
        return 0 === e
          ? 0
          : 1 === e
          ? 1
          : (a || (a = 0.3),
            n < 1
              ? ((n = 1), (t = a / 4))
              : (t = (a / (2 * Math.PI)) * Math.asin(1 / n)),
            -(
              n *
              Math.pow(2, 10 * (e -= 1)) *
              Math.sin((2 * Math.PI * (e - t)) / a)
            ));
      }
      function w(e) {
        let t = 1.70158,
          a = 0,
          n = 1;
        return 0 === e
          ? 0
          : 1 === e
          ? 1
          : (a || (a = 0.3),
            n < 1
              ? ((n = 1), (t = a / 4))
              : (t = (a / (2 * Math.PI)) * Math.asin(1 / n)),
            n * Math.pow(2, -10 * e) * Math.sin((2 * Math.PI * (e - t)) / a) +
              1);
      }
      function F(e) {
        let t = 1.70158,
          a = 0,
          n = 1;
        return 0 === e
          ? 0
          : 2 == (e /= 0.5)
          ? 1
          : (a || (a = 0.3 * 1.5),
            n < 1
              ? ((n = 1), (t = a / 4))
              : (t = (a / (2 * Math.PI)) * Math.asin(1 / n)),
            e < 1)
          ? -0.5 *
            (n *
              Math.pow(2, 10 * (e -= 1)) *
              Math.sin((2 * Math.PI * (e - t)) / a))
          : n *
              Math.pow(2, -10 * (e -= 1)) *
              Math.sin((2 * Math.PI * (e - t)) / a) *
              0.5 +
            1;
      }
      function k(e) {
        let t = 1.70158;
        return (e /= 0.5) < 1
          ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
          : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
      }
      function D(e) {
        return e * e * (2.70158 * e - 1.70158);
      }
      function X(e) {
        return (e -= 1) * e * (2.70158 * e + 1.70158) + 1;
      }
      function Y(e) {
        return e < 1 / 2.75
          ? 7.5625 * e * e
          : e < 2 / 2.75
          ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
          : e < 2.5 / 2.75
          ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
          : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
      }
      function Q(e) {
        return e < 1 / 2.75
          ? 7.5625 * e * e
          : e < 2 / 2.75
          ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
          : e < 2.5 / 2.75
          ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
          : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
      }
    },
    1799: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        clearPlugin: function () {
          return b;
        },
        createPluginInstance: function () {
          return g;
        },
        getPluginConfig: function () {
          return l;
        },
        getPluginDestination: function () {
          return u;
        },
        getPluginDuration: function () {
          return f;
        },
        getPluginOrigin: function () {
          return s;
        },
        isPluginType: function () {
          return c;
        },
        renderPlugin: function () {
          return p;
        },
      };
      for (var i in n)
        Object.defineProperty(t, i, { enumerable: !0, get: n[i] });
      let d = a(2662),
        o = a(3690);
      function c(e) {
        return o.pluginMethodMap.has(e);
      }
      let r = (e) => (t) => {
          if (!d.IS_BROWSER_ENV) return () => null;
          let a = o.pluginMethodMap.get(t);
          if (!a) throw Error(`IX2 no plugin configured for: ${t}`);
          let n = a[e];
          if (!n) throw Error(`IX2 invalid plugin method: ${e}`);
          return n;
        },
        l = r("getPluginConfig"),
        s = r("getPluginOrigin"),
        f = r("getPluginDuration"),
        u = r("getPluginDestination"),
        g = r("createPluginInstance"),
        p = r("renderPlugin"),
        b = r("clearPlugin");
    },
    4124: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        cleanupHTMLElement: function () {
          return eH;
        },
        clearAllStyles: function () {
          return eY;
        },
        clearObjectCache: function () {
          return ef;
        },
        getActionListProgress: function () {
          return eq;
        },
        getAffectedElements: function () {
          return em;
        },
        getComputedStyle: function () {
          return eO;
        },
        getDestinationValues: function () {
          return eN;
        },
        getElementId: function () {
          return eb;
        },
        getInstanceId: function () {
          return eg;
        },
        getInstanceOrigin: function () {
          return eL;
        },
        getItemConfigByKey: function () {
          return eh;
        },
        getMaxDurationItemIndex: function () {
          return eW;
        },
        getNamespacedParameterId: function () {
          return eK;
        },
        getRenderType: function () {
          return eC;
        },
        getStyleProp: function () {
          return eP;
        },
        mediaQueriesEqual: function () {
          return e0;
        },
        observeStore: function () {
          return ey;
        },
        reduceListToGroup: function () {
          return e$;
        },
        reifyState: function () {
          return eI;
        },
        renderHTMLElement: function () {
          return eU;
        },
        shallowEqual: function () {
          return s.default;
        },
        shouldAllowMediaQuery: function () {
          return eJ;
        },
        shouldNamespaceEventParameter: function () {
          return eZ;
        },
        stringifyTarget: function () {
          return e1;
        },
      };
      for (var i in n)
        Object.defineProperty(t, i, { enumerable: !0, get: n[i] });
      let d = b(a(4075)),
        o = b(a(1455)),
        c = b(a(5720)),
        r = a(1185),
        l = a(7087),
        s = b(a(7164)),
        f = a(3767),
        u = a(380),
        g = a(1799),
        p = a(2662);
      function b(e) {
        return e && e.__esModule ? e : { default: e };
      }
      let {
          BACKGROUND: I,
          TRANSFORM: T,
          TRANSLATE_3D: y,
          SCALE_3D: E,
          ROTATE_X: m,
          ROTATE_Y: O,
          ROTATE_Z: S,
          SKEW: _,
          PRESERVE_3D: R,
          FLEX: L,
          OPACITY: A,
          FILTER: v,
          FONT_VARIATION_SETTINGS: h,
          WIDTH: N,
          HEIGHT: C,
          BACKGROUND_COLOR: P,
          BORDER_COLOR: U,
          COLOR: G,
          CHILDREN: V,
          IMMEDIATE_CHILDREN: M,
          SIBLINGS: x,
          PARENT: w,
          DISPLAY: F,
          WILL_CHANGE: k,
          AUTO: D,
          COMMA_DELIMITER: X,
          COLON_DELIMITER: Y,
          BAR_DELIMITER: Q,
          RENDER_TRANSFORM: B,
          RENDER_GENERAL: H,
          RENDER_STYLE: z,
          RENDER_PLUGIN: j,
        } = l.IX2EngineConstants,
        {
          TRANSFORM_MOVE: W,
          TRANSFORM_SCALE: q,
          TRANSFORM_ROTATE: $,
          TRANSFORM_SKEW: Z,
          STYLE_OPACITY: K,
          STYLE_FILTER: J,
          STYLE_FONT_VARIATION: ee,
          STYLE_SIZE: et,
          STYLE_BACKGROUND_COLOR: ea,
          STYLE_BORDER: en,
          STYLE_TEXT_COLOR: ei,
          GENERAL_DISPLAY: ed,
          OBJECT_VALUE: eo,
        } = l.ActionTypeConsts,
        ec = (e) => e.trim(),
        er = Object.freeze({ [ea]: P, [en]: U, [ei]: G }),
        el = Object.freeze({
          [p.TRANSFORM_PREFIXED]: T,
          [P]: I,
          [A]: A,
          [v]: v,
          [N]: N,
          [C]: C,
          [h]: h,
        }),
        es = new Map();
      function ef() {
        es.clear();
      }
      let eu = 1;
      function eg() {
        return "i" + eu++;
      }
      let ep = 1;
      function eb(e, t) {
        for (let a in e) {
          let n = e[a];
          if (n && n.ref === t) return n.id;
        }
        return "e" + ep++;
      }
      function eI({ events: e, actionLists: t, site: a } = {}) {
        let n = (0, o.default)(
            e,
            (e, t) => {
              let { eventTypeId: a } = t;
              return e[a] || (e[a] = {}), (e[a][t.id] = t), e;
            },
            {}
          ),
          i = a && a.mediaQueries,
          d = [];
        return (
          i
            ? (d = i.map((e) => e.key))
            : ((i = []), console.warn("IX2 missing mediaQueries in site data")),
          {
            ixData: {
              events: e,
              actionLists: t,
              eventTypeMap: n,
              mediaQueries: i,
              mediaQueryKeys: d,
            },
          }
        );
      }
      let eT = (e, t) => e === t;
      function ey({ store: e, select: t, onChange: a, comparator: n = eT }) {
        let { getState: i, subscribe: d } = e,
          o = d(function () {
            let d = t(i());
            if (null == d) return void o();
            n(d, c) || a((c = d), e);
          }),
          c = t(i());
        return o;
      }
      function eE(e) {
        let t = typeof e;
        if ("string" === t) return { id: e };
        if (null != e && "object" === t) {
          let {
            id: t,
            objectId: a,
            selector: n,
            selectorGuids: i,
            appliesTo: d,
            useEventTarget: o,
          } = e;
          return {
            id: t,
            objectId: a,
            selector: n,
            selectorGuids: i,
            appliesTo: d,
            useEventTarget: o,
          };
        }
        return {};
      }
      function em({
        config: e,
        event: t,
        eventTarget: a,
        elementRoot: n,
        elementApi: i,
      }) {
        let d, o, c;
        if (!i) throw Error("IX2 missing elementApi");
        let { targets: r } = e;
        if (Array.isArray(r) && r.length > 0)
          return r.reduce(
            (e, d) =>
              e.concat(
                em({
                  config: { target: d },
                  event: t,
                  eventTarget: a,
                  elementRoot: n,
                  elementApi: i,
                })
              ),
            []
          );
        let {
            getValidDocument: s,
            getQuerySelector: f,
            queryDocument: u,
            getChildElements: g,
            getSiblingElements: b,
            matchSelector: I,
            elementContains: T,
            isSiblingNode: y,
          } = i,
          { target: E } = e;
        if (!E) return [];
        let {
          id: m,
          objectId: O,
          selector: S,
          selectorGuids: _,
          appliesTo: R,
          useEventTarget: L,
        } = eE(E);
        if (O) return [es.has(O) ? es.get(O) : es.set(O, {}).get(O)];
        if (R === l.EventAppliesTo.PAGE) {
          let e = s(m);
          return e ? [e] : [];
        }
        let A = (t?.action?.config?.affectedElements ?? {})[m || S] || {},
          v = !!(A.id || A.selector),
          h = t && f(eE(t.target));
        if (
          (v
            ? ((d = A.limitAffectedElements), (o = h), (c = f(A)))
            : (o = c = f({ id: m, selector: S, selectorGuids: _ })),
          t && L)
        ) {
          let e = a && (c || !0 === L) ? [a] : u(h);
          if (c) {
            if (L === w) return u(c).filter((t) => e.some((e) => T(t, e)));
            if (L === V) return u(c).filter((t) => e.some((e) => T(e, t)));
            if (L === x) return u(c).filter((t) => e.some((e) => y(e, t)));
          }
          return e;
        }
        return null == o || null == c
          ? []
          : p.IS_BROWSER_ENV && n
          ? u(c).filter((e) => n.contains(e))
          : d === V
          ? u(o, c)
          : d === M
          ? g(u(o)).filter(I(c))
          : d === x
          ? b(u(o)).filter(I(c))
          : u(c);
      }
      function eO({ element: e, actionItem: t }) {
        if (!p.IS_BROWSER_ENV) return {};
        let { actionTypeId: a } = t;
        switch (a) {
          case et:
          case ea:
          case en:
          case ei:
          case ed:
            return window.getComputedStyle(e);
          default:
            return {};
        }
      }
      let eS = /px/,
        e_ = (e, t) =>
          t.reduce(
            (e, t) => (null == e[t.type] && (e[t.type] = eV[t.type]), e),
            e || {}
          ),
        eR = (e, t) =>
          t.reduce(
            (e, t) => (
              null == e[t.type] &&
                (e[t.type] = eM[t.type] || t.defaultValue || 0),
              e
            ),
            e || {}
          );
      function eL(e, t = {}, a = {}, n, i) {
        let { getStyle: o } = i,
          { actionTypeId: c } = n;
        if ((0, g.isPluginType)(c)) return (0, g.getPluginOrigin)(c)(t[c], n);
        switch (n.actionTypeId) {
          case W:
          case q:
          case $:
          case Z:
            return t[n.actionTypeId] || eG[n.actionTypeId];
          case J:
            return e_(t[n.actionTypeId], n.config.filters);
          case ee:
            return eR(t[n.actionTypeId], n.config.fontVariations);
          case K:
            return { value: (0, d.default)(parseFloat(o(e, A)), 1) };
          case et: {
            let t,
              i = o(e, N),
              c = o(e, C);
            return {
              widthValue:
                n.config.widthUnit === D
                  ? eS.test(i)
                    ? parseFloat(i)
                    : parseFloat(a.width)
                  : (0, d.default)(parseFloat(i), parseFloat(a.width)),
              heightValue:
                n.config.heightUnit === D
                  ? eS.test(c)
                    ? parseFloat(c)
                    : parseFloat(a.height)
                  : (0, d.default)(parseFloat(c), parseFloat(a.height)),
            };
          }
          case ea:
          case en:
          case ei:
            return (function ({
              element: e,
              actionTypeId: t,
              computedStyle: a,
              getStyle: n,
            }) {
              let i = er[t],
                o = n(e, i),
                c = (function (e, t) {
                  let a = e.exec(t);
                  return a ? a[1] : "";
                })(ek, eF.test(o) ? o : a[i]).split(X);
              return {
                rValue: (0, d.default)(parseInt(c[0], 10), 255),
                gValue: (0, d.default)(parseInt(c[1], 10), 255),
                bValue: (0, d.default)(parseInt(c[2], 10), 255),
                aValue: (0, d.default)(parseFloat(c[3]), 1),
              };
            })({
              element: e,
              actionTypeId: n.actionTypeId,
              computedStyle: a,
              getStyle: o,
            });
          case ed:
            return { value: (0, d.default)(o(e, F), a.display) };
          case eo:
            return t[n.actionTypeId] || { value: 0 };
          default:
            return;
        }
      }
      let eA = (e, t) => (t && (e[t.type] = t.value || 0), e),
        ev = (e, t) => (t && (e[t.type] = t.value || 0), e),
        eh = (e, t, a) => {
          if ((0, g.isPluginType)(e)) return (0, g.getPluginConfig)(e)(a, t);
          switch (e) {
            case J: {
              let e = (0, c.default)(a.filters, ({ type: e }) => e === t);
              return e ? e.value : 0;
            }
            case ee: {
              let e = (0, c.default)(
                a.fontVariations,
                ({ type: e }) => e === t
              );
              return e ? e.value : 0;
            }
            default:
              return a[t];
          }
        };
      function eN({ element: e, actionItem: t, elementApi: a }) {
        if ((0, g.isPluginType)(t.actionTypeId))
          return (0, g.getPluginDestination)(t.actionTypeId)(t.config);
        switch (t.actionTypeId) {
          case W:
          case q:
          case $:
          case Z: {
            let { xValue: e, yValue: a, zValue: n } = t.config;
            return { xValue: e, yValue: a, zValue: n };
          }
          case et: {
            let { getStyle: n, setStyle: i, getProperty: d } = a,
              { widthUnit: o, heightUnit: c } = t.config,
              { widthValue: r, heightValue: l } = t.config;
            if (!p.IS_BROWSER_ENV) return { widthValue: r, heightValue: l };
            if (o === D) {
              let t = n(e, N);
              i(e, N, ""), (r = d(e, "offsetWidth")), i(e, N, t);
            }
            if (c === D) {
              let t = n(e, C);
              i(e, C, ""), (l = d(e, "offsetHeight")), i(e, C, t);
            }
            return { widthValue: r, heightValue: l };
          }
          case ea:
          case en:
          case ei: {
            let {
              rValue: n,
              gValue: i,
              bValue: d,
              aValue: o,
              globalSwatchId: c,
            } = t.config;
            if (c && c.startsWith("--")) {
              let { getStyle: t } = a,
                n = t(e, c),
                i = (0, u.normalizeColor)(n);
              return {
                rValue: i.red,
                gValue: i.green,
                bValue: i.blue,
                aValue: i.alpha,
              };
            }
            return { rValue: n, gValue: i, bValue: d, aValue: o };
          }
          case J:
            return t.config.filters.reduce(eA, {});
          case ee:
            return t.config.fontVariations.reduce(ev, {});
          default: {
            let { value: e } = t.config;
            return { value: e };
          }
        }
      }
      function eC(e) {
        return /^TRANSFORM_/.test(e)
          ? B
          : /^STYLE_/.test(e)
          ? z
          : /^GENERAL_/.test(e)
          ? H
          : /^PLUGIN_/.test(e)
          ? j
          : void 0;
      }
      function eP(e, t) {
        return e === z ? t.replace("STYLE_", "").toLowerCase() : null;
      }
      function eU(e, t, a, n, i, d, c, r, l) {
        switch (r) {
          case B:
            var s = e,
              f = t,
              u = a,
              b = i,
              I = c;
            let T = ew
                .map((e) => {
                  let t = eG[e],
                    {
                      xValue: a = t.xValue,
                      yValue: n = t.yValue,
                      zValue: i = t.zValue,
                      xUnit: d = "",
                      yUnit: o = "",
                      zUnit: c = "",
                    } = f[e] || {};
                  switch (e) {
                    case W:
                      return `${y}(${a}${d}, ${n}${o}, ${i}${c})`;
                    case q:
                      return `${E}(${a}${d}, ${n}${o}, ${i}${c})`;
                    case $:
                      return `${m}(${a}${d}) ${O}(${n}${o}) ${S}(${i}${c})`;
                    case Z:
                      return `${_}(${a}${d}, ${n}${o})`;
                    default:
                      return "";
                  }
                })
                .join(" "),
              { setStyle: A } = I;
            eD(s, p.TRANSFORM_PREFIXED, I),
              A(s, p.TRANSFORM_PREFIXED, T),
              (function (
                { actionTypeId: e },
                { xValue: t, yValue: a, zValue: n }
              ) {
                return (
                  (e === W && void 0 !== n) ||
                  (e === q && void 0 !== n) ||
                  (e === $ && (void 0 !== t || void 0 !== a))
                );
              })(b, u) && A(s, p.TRANSFORM_STYLE_PREFIXED, R);
            return;
          case z:
            return (function (e, t, a, n, i, d) {
              let { setStyle: c } = d;
              switch (n.actionTypeId) {
                case et: {
                  let { widthUnit: t = "", heightUnit: i = "" } = n.config,
                    { widthValue: o, heightValue: r } = a;
                  void 0 !== o &&
                    (t === D && (t = "px"), eD(e, N, d), c(e, N, o + t)),
                    void 0 !== r &&
                      (i === D && (i = "px"), eD(e, C, d), c(e, C, r + i));
                  break;
                }
                case J:
                  var r = n.config;
                  let l = (0, o.default)(
                      a,
                      (e, t, a) => `${e} ${a}(${t}${ex(a, r)})`,
                      ""
                    ),
                    { setStyle: s } = d;
                  eD(e, v, d), s(e, v, l);
                  break;
                case ee:
                  n.config;
                  let f = (0, o.default)(
                      a,
                      (e, t, a) => (e.push(`"${a}" ${t}`), e),
                      []
                    ).join(", "),
                    { setStyle: u } = d;
                  eD(e, h, d), u(e, h, f);
                  break;
                case ea:
                case en:
                case ei: {
                  let t = er[n.actionTypeId],
                    i = Math.round(a.rValue),
                    o = Math.round(a.gValue),
                    r = Math.round(a.bValue),
                    l = a.aValue;
                  eD(e, t, d),
                    c(
                      e,
                      t,
                      l >= 1
                        ? `rgb(${i},${o},${r})`
                        : `rgba(${i},${o},${r},${l})`
                    );
                  break;
                }
                default: {
                  let { unit: t = "" } = n.config;
                  eD(e, i, d), c(e, i, a.value + t);
                }
              }
            })(e, 0, a, i, d, c);
          case H:
            var P = e,
              U = i,
              G = c;
            let { setStyle: V } = G;
            if (U.actionTypeId === ed) {
              let { value: e } = U.config;
              V(P, F, e === L && p.IS_BROWSER_ENV ? p.FLEX_PREFIXED : e);
            }
            return;
          case j: {
            let { actionTypeId: e } = i;
            if ((0, g.isPluginType)(e)) return (0, g.renderPlugin)(e)(l, t, i);
          }
        }
      }
      let eG = {
          [W]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
          [q]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
          [$]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
          [Z]: Object.freeze({ xValue: 0, yValue: 0 }),
        },
        eV = Object.freeze({
          blur: 0,
          "hue-rotate": 0,
          invert: 0,
          grayscale: 0,
          saturate: 100,
          sepia: 0,
          contrast: 100,
          brightness: 100,
        }),
        eM = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 }),
        ex = (e, t) => {
          let a = (0, c.default)(t.filters, ({ type: t }) => t === e);
          if (a && a.unit) return a.unit;
          switch (e) {
            case "blur":
              return "px";
            case "hue-rotate":
              return "deg";
            default:
              return "%";
          }
        },
        ew = Object.keys(eG),
        eF = /^rgb/,
        ek = RegExp("rgba?\\(([^)]+)\\)");
      function eD(e, t, a) {
        if (!p.IS_BROWSER_ENV) return;
        let n = el[t];
        if (!n) return;
        let { getStyle: i, setStyle: d } = a,
          o = i(e, k);
        if (!o) return void d(e, k, n);
        let c = o.split(X).map(ec);
        -1 === c.indexOf(n) && d(e, k, c.concat(n).join(X));
      }
      function eX(e, t, a) {
        if (!p.IS_BROWSER_ENV) return;
        let n = el[t];
        if (!n) return;
        let { getStyle: i, setStyle: d } = a,
          o = i(e, k);
        o &&
          -1 !== o.indexOf(n) &&
          d(
            e,
            k,
            o
              .split(X)
              .map(ec)
              .filter((e) => e !== n)
              .join(X)
          );
      }
      function eY({ store: e, elementApi: t }) {
        let { ixData: a } = e.getState(),
          { events: n = {}, actionLists: i = {} } = a;
        Object.keys(n).forEach((e) => {
          let a = n[e],
            { config: d } = a.action,
            { actionListId: o } = d,
            c = i[o];
          c && eQ({ actionList: c, event: a, elementApi: t });
        }),
          Object.keys(i).forEach((e) => {
            eQ({ actionList: i[e], elementApi: t });
          });
      }
      function eQ({ actionList: e = {}, event: t, elementApi: a }) {
        let { actionItemGroups: n, continuousParameterGroups: i } = e;
        n &&
          n.forEach((e) => {
            eB({ actionGroup: e, event: t, elementApi: a });
          }),
          i &&
            i.forEach((e) => {
              let { continuousActionGroups: n } = e;
              n.forEach((e) => {
                eB({ actionGroup: e, event: t, elementApi: a });
              });
            });
      }
      function eB({ actionGroup: e, event: t, elementApi: a }) {
        let { actionItems: n } = e;
        n.forEach((e) => {
          let n,
            { actionTypeId: i, config: d } = e;
          (n = (0, g.isPluginType)(i)
            ? (t) => (0, g.clearPlugin)(i)(t, e)
            : ez({ effect: ej, actionTypeId: i, elementApi: a })),
            em({ config: d, event: t, elementApi: a }).forEach(n);
        });
      }
      function eH(e, t, a) {
        let { setStyle: n, getStyle: i } = a,
          { actionTypeId: d } = t;
        if (d === et) {
          let { config: a } = t;
          a.widthUnit === D && n(e, N, ""), a.heightUnit === D && n(e, C, "");
        }
        i(e, k) && ez({ effect: eX, actionTypeId: d, elementApi: a })(e);
      }
      let ez =
        ({ effect: e, actionTypeId: t, elementApi: a }) =>
        (n) => {
          switch (t) {
            case W:
            case q:
            case $:
            case Z:
              e(n, p.TRANSFORM_PREFIXED, a);
              break;
            case J:
              e(n, v, a);
              break;
            case ee:
              e(n, h, a);
              break;
            case K:
              e(n, A, a);
              break;
            case et:
              e(n, N, a), e(n, C, a);
              break;
            case ea:
            case en:
            case ei:
              e(n, er[t], a);
              break;
            case ed:
              e(n, F, a);
          }
        };
      function ej(e, t, a) {
        let { setStyle: n } = a;
        eX(e, t, a),
          n(e, t, ""),
          t === p.TRANSFORM_PREFIXED && n(e, p.TRANSFORM_STYLE_PREFIXED, "");
      }
      function eW(e) {
        let t = 0,
          a = 0;
        return (
          e.forEach((e, n) => {
            let { config: i } = e,
              d = i.delay + i.duration;
            d >= t && ((t = d), (a = n));
          }),
          a
        );
      }
      function eq(e, t) {
        let { actionItemGroups: a, useFirstGroupAsInitialState: n } = e,
          { actionItem: i, verboseTimeElapsed: d = 0 } = t,
          o = 0,
          c = 0;
        return (
          a.forEach((e, t) => {
            if (n && 0 === t) return;
            let { actionItems: a } = e,
              r = a[eW(a)],
              { config: l, actionTypeId: s } = r;
            i.id === r.id && (c = o + d);
            let f = eC(s) === H ? 0 : l.duration;
            o += l.delay + f;
          }),
          o > 0 ? (0, f.optimizeFloat)(c / o) : 0
        );
      }
      function e$({ actionList: e, actionItemId: t, rawData: a }) {
        let { actionItemGroups: n, continuousParameterGroups: i } = e,
          d = [],
          o = (e) => (
            d.push((0, r.mergeIn)(e, ["config"], { delay: 0, duration: 0 })),
            e.id === t
          );
        return (
          n && n.some(({ actionItems: e }) => e.some(o)),
          i &&
            i.some((e) => {
              let { continuousActionGroups: t } = e;
              return t.some(({ actionItems: e }) => e.some(o));
            }),
          (0, r.setIn)(a, ["actionLists"], {
            [e.id]: { id: e.id, actionItemGroups: [{ actionItems: d }] },
          })
        );
      }
      function eZ(e, { basedOn: t }) {
        return (
          (e === l.EventTypeConsts.SCROLLING_IN_VIEW &&
            (t === l.EventBasedOn.ELEMENT || null == t)) ||
          (e === l.EventTypeConsts.MOUSE_MOVE && t === l.EventBasedOn.ELEMENT)
        );
      }
      function eK(e, t) {
        return e + Y + t;
      }
      function eJ(e, t) {
        return null == t || -1 !== e.indexOf(t);
      }
      function e0(e, t) {
        return (0, s.default)(e && e.sort(), t && t.sort());
      }
      function e1(e) {
        if ("string" == typeof e) return e;
        if (e.pluginElement && e.objectId)
          return e.pluginElement + Q + e.objectId;
        if (e.objectId) return e.objectId;
        let { id: t = "", selector: a = "", useEventTarget: n = "" } = e;
        return t + Q + a + Q + n;
      }
    },
    7164: function (e, t) {
      "use strict";
      function a(e, t) {
        return e === t
          ? 0 !== e || 0 !== t || 1 / e == 1 / t
          : e != e && t != t;
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "default", {
          enumerable: !0,
          get: function () {
            return n;
          },
        });
      let n = function (e, t) {
        if (a(e, t)) return !0;
        if (
          "object" != typeof e ||
          null === e ||
          "object" != typeof t ||
          null === t
        )
          return !1;
        let n = Object.keys(e),
          i = Object.keys(t);
        if (n.length !== i.length) return !1;
        for (let i = 0; i < n.length; i++)
          if (!Object.hasOwn(t, n[i]) || !a(e[n[i]], t[n[i]])) return !1;
        return !0;
      };
    },
    5861: function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        createElementState: function () {
          return _;
        },
        ixElements: function () {
          return S;
        },
        mergeActionState: function () {
          return R;
        },
      };
      for (var i in n)
        Object.defineProperty(t, i, { enumerable: !0, get: n[i] });
      let d = a(1185),
        o = a(7087),
        {
          HTML_ELEMENT: c,
          PLAIN_OBJECT: r,
          ABSTRACT_NODE: l,
          CONFIG_X_VALUE: s,
          CONFIG_Y_VALUE: f,
          CONFIG_Z_VALUE: u,
          CONFIG_VALUE: g,
          CONFIG_X_UNIT: p,
          CONFIG_Y_UNIT: b,
          CONFIG_Z_UNIT: I,
          CONFIG_UNIT: T,
        } = o.IX2EngineConstants,
        {
          IX2_SESSION_STOPPED: y,
          IX2_INSTANCE_ADDED: E,
          IX2_ELEMENT_STATE_CHANGED: m,
        } = o.IX2EngineActionTypes,
        O = {},
        S = (e = O, t = {}) => {
          switch (t.type) {
            case y:
              return O;
            case E: {
              let {
                  elementId: a,
                  element: n,
                  origin: i,
                  actionItem: o,
                  refType: c,
                } = t.payload,
                { actionTypeId: r } = o,
                l = e;
              return (
                (0, d.getIn)(l, [a, n]) !== n && (l = _(l, n, c, a, o)),
                R(l, a, r, i, o)
              );
            }
            case m: {
              let {
                elementId: a,
                actionTypeId: n,
                current: i,
                actionItem: d,
              } = t.payload;
              return R(e, a, n, i, d);
            }
            default:
              return e;
          }
        };
      function _(e, t, a, n, i) {
        let o =
          a === r ? (0, d.getIn)(i, ["config", "target", "objectId"]) : null;
        return (0, d.mergeIn)(e, [n], { id: n, ref: t, refId: o, refType: a });
      }
      function R(e, t, a, n, i) {
        let o = (function (e) {
          let { config: t } = e;
          return L.reduce((e, a) => {
            let n = a[0],
              i = a[1],
              d = t[n],
              o = t[i];
            return null != d && null != o && (e[i] = o), e;
          }, {});
        })(i);
        return (0, d.mergeIn)(e, [t, "refState", a], n, o);
      }
      let L = [
        [s, p],
        [f, b],
        [u, I],
        [g, T],
      ];
    },
    7550: function () {
      Webflow.require("ix2").init({
        events: {
          "e-5": {
            id: "e-5",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-3",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-6",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".blog-slider-arrow",
              originalId: "32bce2b5-44ef-8e4d-cd69-ce9925e5308c",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".blog-slider-arrow",
                originalId: "32bce2b5-44ef-8e4d-cd69-ce9925e5308c",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18a4b791b0d,
          },
          "e-6": {
            id: "e-6",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-4",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-5",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".blog-slider-arrow",
              originalId: "32bce2b5-44ef-8e4d-cd69-ce9925e5308c",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".blog-slider-arrow",
                originalId: "32bce2b5-44ef-8e4d-cd69-ce9925e5308c",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18a4b791b0d,
          },
          "e-7": {
            id: "e-7",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-5",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-8",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb5f|1c390ebb-a2b0-49f5-b91b-16f65a725cf6",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb5f|1c390ebb-a2b0-49f5-b91b-16f65a725cf6",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 10,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c82bc008e,
          },
          "e-9": {
            id: "e-9",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-5",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-10",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb5f|6957afb6-e1de-f19d-1ff8-3b3e30229a80",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb5f|6957afb6-e1de-f19d-1ff8-3b3e30229a80",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c82c06c0a,
          },
          "e-11": {
            id: "e-11",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-5",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-12",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb5f|bebe9b0f-bce7-ae92-7c96-9779b44c66c5",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb5f|bebe9b0f-bce7-ae92-7c96-9779b44c66c5",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c82c0838c,
          },
          "e-13": {
            id: "e-13",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-6",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-14",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb5f|0598390f-6066-73dd-2bfe-d7d0c4351141",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb5f|0598390f-6066-73dd-2bfe-d7d0c4351141",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 10,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c82c0a353,
          },
          "e-15": {
            id: "e-15",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-6",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-16",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb5f|c9e71299-e8b2-5ad0-20bc-c710de4b0ef0",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb5f|c9e71299-e8b2-5ad0-20bc-c710de4b0ef0",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18c82c139a1,
          },
          "e-19": {
            id: "e-19",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-9",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb4a|55d0039d-3afe-c878-5cce-abd6c14c3611",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb4a|55d0039d-3afe-c878-5cce-abd6c14c3611",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-9-p",
                smoothing: 80,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18c86ef8121,
          },
          "e-35": {
            id: "e-35",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-20",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-36",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".services-wrapper",
              originalId:
                "65af9f0cabbaf2f9644debab|4e2f2b66-2852-1fcf-bb8b-15953d1eb682",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".services-wrapper",
                originalId:
                  "65af9f0cabbaf2f9644debab|4e2f2b66-2852-1fcf-bb8b-15953d1eb682",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18cedd12e13,
          },
          "e-39": {
            id: "e-39",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-21",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-40",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".small-project-card",
              originalId:
                "65af9f0cabbaf2f9644debab|e8be1308-08cc-a23c-0c76-9544053225ab",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".small-project-card",
                originalId:
                  "65af9f0cabbaf2f9644debab|e8be1308-08cc-a23c-0c76-9544053225ab",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18cedec7fe6,
          },
          "e-40": {
            id: "e-40",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-22",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-39",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".small-project-card",
              originalId:
                "65af9f0cabbaf2f9644debab|e8be1308-08cc-a23c-0c76-9544053225ab",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".small-project-card",
                originalId:
                  "65af9f0cabbaf2f9644debab|e8be1308-08cc-a23c-0c76-9544053225ab",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18cedec800a,
          },
          "e-45": {
            id: "e-45",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "SLIDE_EFFECT",
              instant: !1,
              config: {
                actionListId: "slideInBottom",
                autoStopEventId: "e-154",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".f-form-steps-item.is---2",
              originalId:
                "638dda96c024ae5a01eed12a|fb64b881-daa1-ecd2-9de9-309abc070751",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".f-form-steps-item.is---2",
                originalId:
                  "638dda96c024ae5a01eed12a|fb64b881-daa1-ecd2-9de9-309abc070751",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: 0,
              direction: "BOTTOM",
              effectIn: !0,
            },
            createdOn: 0x184e21f5cf6,
          },
          "e-69": {
            id: "e-69",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-14",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-70",
              },
            },
            mediaQueries: ["main"],
            target: {
              selector: ".home-project-card",
              originalId:
                "65af9f0cabbaf2f9644deb4a|f700cbe6-3915-54d8-d54b-08daffb87c7b",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".home-project-card",
                originalId:
                  "65af9f0cabbaf2f9644deb4a|f700cbe6-3915-54d8-d54b-08daffb87c7b",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18cfaac2897,
          },
          "e-70": {
            id: "e-70",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-15",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-69",
              },
            },
            mediaQueries: ["main"],
            target: {
              selector: ".home-project-card",
              originalId:
                "65af9f0cabbaf2f9644deb4a|f700cbe6-3915-54d8-d54b-08daffb87c7b",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".home-project-card",
                originalId:
                  "65af9f0cabbaf2f9644deb4a|f700cbe6-3915-54d8-d54b-08daffb87c7b",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18cfaac2898,
          },
          "e-71": {
            id: "e-71",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-12",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-72",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".home-project-card",
              originalId:
                "65af9f0cabbaf2f9644deb4a|f700cbe6-3915-54d8-d54b-08daffb87c7b",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".home-project-card",
                originalId:
                  "65af9f0cabbaf2f9644deb4a|f700cbe6-3915-54d8-d54b-08daffb87c7b",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 10,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18cfab45b66,
          },
          "e-77": {
            id: "e-77",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-36",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-78",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".filter-checkbox.is--filter",
              originalId:
                "65af9f0cabbaf2f9644debb1|71d85573-aa52-1355-de64-a6e4628fb888",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".filter-checkbox",
                originalId:
                  "65af9f0cabbaf2f9644debb1|71d85573-aa52-1355-de64-a6e4628fb888",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d26851b3f,
          },
          "e-78": {
            id: "e-78",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-37",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-77",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".filter-checkbox.is--filter",
              originalId:
                "65af9f0cabbaf2f9644debb1|71d85573-aa52-1355-de64-a6e4628fb888",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".filter-checkbox",
                originalId:
                  "65af9f0cabbaf2f9644debb1|71d85573-aa52-1355-de64-a6e4628fb888",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d26851b3f,
          },
          "e-83": {
            id: "e-83",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-31",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-84",
              },
            },
            mediaQueries: ["medium", "small", "tiny"],
            target: {
              selector: ".menu-toggle",
              originalId:
                "65af9f0cabbaf2f9644deb60|fdf6e356-7d53-d86a-b37f-76d760c925f7",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".menu-toggle",
                originalId:
                  "65af9f0cabbaf2f9644deb60|fdf6e356-7d53-d86a-b37f-76d760c925f7",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d2bc37ed1,
          },
          "e-84": {
            id: "e-84",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-40",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-83",
              },
            },
            mediaQueries: ["medium", "small", "tiny"],
            target: {
              selector: ".menu-toggle",
              originalId:
                "65af9f0cabbaf2f9644deb60|fdf6e356-7d53-d86a-b37f-76d760c925f7",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".menu-toggle",
                originalId:
                  "65af9f0cabbaf2f9644deb60|fdf6e356-7d53-d86a-b37f-76d760c925f7",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d2bc37ed1,
          },
          "e-87": {
            id: "e-87",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "SLIDE_EFFECT",
              instant: !1,
              config: {
                actionListId: "slideInBottom",
                autoStopEventId: "e-88",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb64|3aedec2f-ff06-89ad-fd09-79a302c5fce1",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb64|3aedec2f-ff06-89ad-fd09-79a302c5fce1",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: 0,
              direction: "BOTTOM",
              effectIn: !0,
            },
            createdOn: 0x18d30fa0576,
          },
          "e-89": {
            id: "e-89",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "SLIDE_EFFECT",
              instant: !1,
              config: {
                actionListId: "slideInBottom",
                autoStopEventId: "e-90",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debb1|e37ed7f7-6703-5b98-0f55-9bf02a3b0de9",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debb1|e37ed7f7-6703-5b98-0f55-9bf02a3b0de9",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: 0,
              direction: "BOTTOM",
              effectIn: !0,
            },
            createdOn: 0x18d32f4129e,
          },
          "e-97": {
            id: "e-97",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-43",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-98",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb4a|c757df75-44c4-dc5b-014c-b17ecf3083bb",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb4a|c757df75-44c4-dc5b-014c-b17ecf3083bb",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d36fbac2a,
          },
          "e-101": {
            id: "e-101",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-43",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-102",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb4a|b44cc401-9f6e-2469-37bd-7e3633547631",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb4a|b44cc401-9f6e-2469-37bd-7e3633547631",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d36fc2173,
          },
          "e-103": {
            id: "e-103",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-43",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-104",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".client-logo",
              originalId: "f4986d5d-6787-023a-4f9b-234561a90b21",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".client-logo",
                originalId: "f4986d5d-6787-023a-4f9b-234561a90b21",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d36fc6177,
          },
          "e-105": {
            id: "e-105",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-43",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-106",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".big-cta",
              originalId: "dcea1946-ecb5-7284-66b7-7b49d7739e16",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".big-cta",
                originalId: "dcea1946-ecb5-7284-66b7-7b49d7739e16",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d36fcc08c,
          },
          "e-107": {
            id: "e-107",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-43",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-108",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".hashtag",
              originalId: "dcea1946-ecb5-7284-66b7-7b49d7739e19",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".hashtag",
                originalId: "dcea1946-ecb5-7284-66b7-7b49d7739e19",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d36fce01f,
          },
          "e-109": {
            id: "e-109",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-44",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-110",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".enquiry-card",
              originalId:
                "65af9f0cabbaf2f9644deb4a|21ca679e-a158-6eb5-a63f-ddd0dbd67d8f",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".enquiry-card",
                originalId:
                  "65af9f0cabbaf2f9644deb4a|21ca679e-a158-6eb5-a63f-ddd0dbd67d8f",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d36fd7b51,
          },
          "e-115": {
            id: "e-115",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-45",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-116",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debb4|81da0179-e4ad-4aae-4126-7a3b6a34cab8",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debb4|81da0179-e4ad-4aae-4126-7a3b6a34cab8",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d37066148,
          },
          "e-117": {
            id: "e-117",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-43",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-118",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".accordion_item",
              originalId:
                "65af9f0cabbaf2f9644debab|0a589cbc-fab4-0a8a-e575-6a609ea2da7d",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".accordion_item",
                originalId:
                  "65af9f0cabbaf2f9644debab|0a589cbc-fab4-0a8a-e575-6a609ea2da7d",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d37068d6e,
          },
          "e-119": {
            id: "e-119",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-45",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-120",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".banner",
              originalId:
                "65af9f0cabbaf2f9644deb5f|9a324c01-21b9-2133-5ca4-83ffaab1eb4c",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".banner",
                originalId:
                  "65af9f0cabbaf2f9644deb5f|9a324c01-21b9-2133-5ca4-83ffaab1eb4c",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d370776f6,
          },
          "e-121": {
            id: "e-121",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-43",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-122",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb5f|11a652bf-f13b-58cd-bab3-89612ad50519",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb5f|11a652bf-f13b-58cd-bab3-89612ad50519",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d3707d8b4,
          },
          "e-123": {
            id: "e-123",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-43",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-124",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debb4|81da0179-e4ad-4aae-4126-7a3b6a34cab8",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debb4|81da0179-e4ad-4aae-4126-7a3b6a34cab8",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d37081daa,
          },
          "e-125": {
            id: "e-125",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-43",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-126",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb5f|0689c2db-d7d3-29ca-db55-fa03bd68a512",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb5f|0689c2db-d7d3-29ca-db55-fa03bd68a512",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d37084eb4,
          },
          "e-131": {
            id: "e-131",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-43",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-132",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb5f|98ad1e29-a879-b57a-51b6-8f7dacc518be",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb5f|98ad1e29-a879-b57a-51b6-8f7dacc518be",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d372e2173,
          },
          "e-133": {
            id: "e-133",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-106",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-134",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".team-member-row",
              originalId:
                "65af9f0cabbaf2f9644deb5f|e3762b48-7dec-8118-129f-5bc7a76b3e7a",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".team-member-row",
                originalId:
                  "65af9f0cabbaf2f9644deb5f|e3762b48-7dec-8118-129f-5bc7a76b3e7a",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d372e607c,
          },
          "e-137": {
            id: "e-137",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-43",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-138",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debab|89c4765a-86aa-05ff-9514-584cd608f026",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debab|89c4765a-86aa-05ff-9514-584cd608f026",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d3b21bf1a,
          },
          "e-141": {
            id: "e-141",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-89",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-142",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb4a|c23aadd1-223d-d6a8-2bcc-62344aa384ad",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb4a|21ca679e-a158-6eb5-a63f-ddd0dbd67d8f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d669270a4,
          },
          "e-142": {
            id: "e-142",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-90",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-141",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb4a|c23aadd1-223d-d6a8-2bcc-62344aa384ad",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb4a|21ca679e-a158-6eb5-a63f-ddd0dbd67d8f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d669270a4,
          },
          "e-143": {
            id: "e-143",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-87",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-144",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb4a|c23aadd1-223d-d6a8-2bcc-62344aa384c0",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb4a|213633ad-edaf-b063-506c-737257203e8d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d6693d6ad,
          },
          "e-144": {
            id: "e-144",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-88",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-143",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb4a|c23aadd1-223d-d6a8-2bcc-62344aa384c0",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb4a|213633ad-edaf-b063-506c-737257203e8d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d6693d6ae,
          },
          "e-145": {
            id: "e-145",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-140",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb4a",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb4a",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-140-p",
                smoothing: 85,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18d66b99101,
          },
          "e-146": {
            id: "e-146",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-21",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-147",
              },
            },
            mediaQueries: ["main"],
            target: {
              selector: ".static-project-card",
              originalId:
                "65af9f0cabbaf2f9644debab|ad3f40aa-5230-6223-2b07-31f8b5691d73",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".static-project-card",
                originalId:
                  "65af9f0cabbaf2f9644debab|ad3f40aa-5230-6223-2b07-31f8b5691d73",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d66cf046d,
          },
          "e-147": {
            id: "e-147",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-22",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-146",
              },
            },
            mediaQueries: ["main"],
            target: {
              selector: ".static-project-card",
              originalId:
                "65af9f0cabbaf2f9644debab|ad3f40aa-5230-6223-2b07-31f8b5691d73",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".static-project-card",
                originalId:
                  "65af9f0cabbaf2f9644debab|ad3f40aa-5230-6223-2b07-31f8b5691d73",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d66cf046e,
          },
          "e-150": {
            id: "e-150",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "PLUGIN_LOTTIE_EFFECT",
              instant: !1,
              config: {
                actionListId: "pluginLottie",
                autoStopEventId: "e-151",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "4670ad46-4932-509b-83ce-70c0e2513c23",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "4670ad46-4932-509b-83ce-70c0e2513c23",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: 0,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d66d46076,
          },
          "e-151": {
            id: "e-151",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "PLUGIN_LOTTIE_EFFECT",
              instant: !1,
              config: {
                actionListId: "pluginLottieReverse",
                autoStopEventId: "e-150",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "4670ad46-4932-509b-83ce-70c0e2513c23",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "4670ad46-4932-509b-83ce-70c0e2513c23",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !0,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: 0,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d66d46076,
          },
          "e-152": {
            id: "e-152",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "PLUGIN_LOTTIE_EFFECT",
              instant: !1,
              config: {
                actionListId: "pluginLottie",
                autoStopEventId: "e-153",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "9a91d30c-015a-8a05-d460-05c2196919e9",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "9a91d30c-015a-8a05-d460-05c2196919e9",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: 0,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d66d65b3c,
          },
          "e-153": {
            id: "e-153",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "PLUGIN_LOTTIE_EFFECT",
              instant: !1,
              config: {
                actionListId: "pluginLottieReverse",
                autoStopEventId: "e-152",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "9a91d30c-015a-8a05-d460-05c2196919e9",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "9a91d30c-015a-8a05-d460-05c2196919e9",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !0,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: 0,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d66d65b3c,
          },
          "e-154": {
            id: "e-154",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-51",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-155",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".fs_accordion-1_header",
              originalId:
                "65af9f0cabbaf2f9644debab|28a8fa55-e1c1-f6aa-bdd5-bfeb5f41219c",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".fs_accordion-1_header",
                originalId:
                  "65af9f0cabbaf2f9644debab|28a8fa55-e1c1-f6aa-bdd5-bfeb5f41219c",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18444512480,
          },
          "e-155": {
            id: "e-155",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-52",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-154",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".fs_accordion-1_header",
              originalId:
                "65af9f0cabbaf2f9644debab|28a8fa55-e1c1-f6aa-bdd5-bfeb5f41219c",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".fs_accordion-1_header",
                originalId:
                  "65af9f0cabbaf2f9644debab|28a8fa55-e1c1-f6aa-bdd5-bfeb5f41219c",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18444512480,
          },
          "e-156": {
            id: "e-156",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-51",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-157",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debab|28a8fa55-e1c1-f6aa-bdd5-bfeb5f412188",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debab|28a8fa55-e1c1-f6aa-bdd5-bfeb5f412188",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d66fccda9,
          },
          "e-157": {
            id: "e-157",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-52",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-156",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debab|28a8fa55-e1c1-f6aa-bdd5-bfeb5f412188",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debab|28a8fa55-e1c1-f6aa-bdd5-bfeb5f412188",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d66fccdaa,
          },
          "e-158": {
            id: "e-158",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-51",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-159",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debb2|a1daff49-040d-85f6-6262-1737f335fc82",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debb2|a1daff49-040d-85f6-6262-1737f335fc82",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d6703550a,
          },
          "e-159": {
            id: "e-159",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-52",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-158",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debb2|a1daff49-040d-85f6-6262-1737f335fc82",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debb2|a1daff49-040d-85f6-6262-1737f335fc82",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d6703550a,
          },
          "e-162": {
            id: "e-162",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-55",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-163",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".project-radio",
              originalId:
                "65af9f0cabbaf2f9644debb3|a45d6e76-5ada-d079-5564-8b94664515fc",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".project-radio",
                originalId:
                  "65af9f0cabbaf2f9644debb3|a45d6e76-5ada-d079-5564-8b94664515fc",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d6a1e3dc7,
          },
          "e-176": {
            id: "e-176",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-57",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-177",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deba9|29f9b162-1e63-7905-d477-afbaa2099581",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deba9|29f9b162-1e63-7905-d477-afbaa2099581",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d795c0b14,
          },
          "e-178": {
            id: "e-178",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-43",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-179",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".project-image",
              originalId:
                "65af9f0cabbaf2f9644deba9|2ea9e541-4dd2-bc6f-f9cf-388722154e7d",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".project-image",
                originalId:
                  "65af9f0cabbaf2f9644deba9|2ea9e541-4dd2-bc6f-f9cf-388722154e7d",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d795e30ef,
          },
          "e-180": {
            id: "e-180",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-58",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-181",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".project-text-right",
              originalId:
                "65af9f0cabbaf2f9644deba9|82cbd18e-40d1-d481-7477-28954197c4c4",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".project-text-right",
                originalId:
                  "65af9f0cabbaf2f9644deba9|82cbd18e-40d1-d481-7477-28954197c4c4",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d795e5868,
          },
          "e-184": {
            id: "e-184",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-38",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".section_full_image.background-grad-wb",
              originalId:
                "65af9f0cabbaf2f9644deba9|5d98ee46-a1c0-f91d-5b57-1e624cdcf00d",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".section_full_image.background-grad-wb",
                originalId:
                  "65af9f0cabbaf2f9644deba9|5d98ee46-a1c0-f91d-5b57-1e624cdcf00d",
                appliesTo: "CLASS",
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-38-p",
                smoothing: 80,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18d796e244f,
          },
          "e-209": {
            id: "e-209",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-38",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".background-grad-wb",
              originalId:
                "65af9f0cabbaf2f9644deba9|429b1629-e74f-62ce-a913-35350ef44955",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".background-grad-wb",
                originalId:
                  "65af9f0cabbaf2f9644deba9|429b1629-e74f-62ce-a913-35350ef44955",
                appliesTo: "CLASS",
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-38-p",
                smoothing: 80,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18d8d0afaec,
          },
          "e-210": {
            id: "e-210",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-59",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".section_image_grid.background-grad-gb",
              originalId:
                "65af9f0cabbaf2f9644deba8|13a17f9d-8d34-8ace-8420-0cbd66db0cb3",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".section_image_grid.background-grad-gb",
                originalId:
                  "65af9f0cabbaf2f9644deba8|13a17f9d-8d34-8ace-8420-0cbd66db0cb3",
                appliesTo: "CLASS",
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-59-p",
                smoothing: 80,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18d8d0dcc99,
          },
          "e-211": {
            id: "e-211",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-59",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".section_image_grid.background-grad-wb",
              originalId:
                "65af9f0cabbaf2f9644deba8|13a17f9d-8d34-8ace-8420-0cbd66db0cb3",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".section_image_grid.background-grad-wb",
                originalId:
                  "65af9f0cabbaf2f9644deba8|13a17f9d-8d34-8ace-8420-0cbd66db0cb3",
                appliesTo: "CLASS",
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-59-p",
                smoothing: 50,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18d8d13f5be,
          },
          "e-212": {
            id: "e-212",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-38",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".section_grad",
              originalId:
                "65af9f0cabbaf2f9644deb6f|7fa12e05-46d0-1f39-e504-dca32e6a2ca6",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".section_grad",
                originalId:
                  "65af9f0cabbaf2f9644deb6f|7fa12e05-46d0-1f39-e504-dca32e6a2ca6",
                appliesTo: "CLASS",
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-38-p",
                smoothing: 50,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18d8d1c1b14,
          },
          "e-216": {
            id: "e-216",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-63",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-217",
              },
            },
            mediaQueries: ["medium", "small", "tiny"],
            target: {
              selector: ".nav-link",
              originalId: "8ca4e543-6362-a1b8-b067-ce2c4fd9e70e",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".nav-link",
                originalId: "8ca4e543-6362-a1b8-b067-ce2c4fd9e70e",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18d92a24202,
          },
          "e-237": {
            id: "e-237",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-67",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-238",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb4a|8cc3b201-222f-cd53-daf5-c331a1690825",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb4a|8cc3b201-222f-cd53-daf5-c331a1690825",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18da76b5b55,
          },
          "e-242": {
            id: "e-242",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_FINISH",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-56",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-241",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deba9",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deba9",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18dc6c45b97,
          },
          "e-243": {
            id: "e-243",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-70",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-244",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debb1|e37ed7f7-6703-5b98-0f55-9bf02a3b0de9",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debb1|e37ed7f7-6703-5b98-0f55-9bf02a3b0de9",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18dc6cdde9f,
          },
          "e-244": {
            id: "e-244",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-82",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-243",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debb1|e37ed7f7-6703-5b98-0f55-9bf02a3b0de9",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debb1|e37ed7f7-6703-5b98-0f55-9bf02a3b0de9",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18dc6cddea0,
          },
          "e-265": {
            id: "e-265",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-80",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-266",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "533d6e3c-b900-0e54-9426-0805c2ee7263",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "533d6e3c-b900-0e54-9426-0805c2ee7263",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18dcc7dbdda,
          },
          "e-266": {
            id: "e-266",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-81",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-265",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "533d6e3c-b900-0e54-9426-0805c2ee7263",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "533d6e3c-b900-0e54-9426-0805c2ee7263",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18dcc7dbddc,
          },
          "e-269": {
            id: "e-269",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-84",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "65af9f0cabbaf2f9644debb4",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debb4",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-84-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18dd70d607b,
          },
          "e-270": {
            id: "e-270",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-84",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "65af9f0cabbaf2f9644deb4a",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb4a",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-84-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18dd70f326b,
          },
          "e-271": {
            id: "e-271",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-84",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "65af9f0cabbaf2f9644debab",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debab",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-84-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18defb00c43,
          },
          "e-272": {
            id: "e-272",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-84",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "65af9f0cabbaf2f9644deb5f",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb5f",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-84-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18defb06ba8,
          },
          "e-273": {
            id: "e-273",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-84",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "65af9f0cabbaf2f9644debb1",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debb1",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-84-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18defb0aa2d,
          },
          "e-274": {
            id: "e-274",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-84",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "65af9f0cabbaf2f9644deb60",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb60",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-84-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18defb0e432,
          },
          "e-275": {
            id: "e-275",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-84",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "65af9f0cabbaf2f9644deb6c",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb6c",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-84-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18defb111e9,
          },
          "e-276": {
            id: "e-276",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-84",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "65af9f0cabbaf2f9644debb2",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debb2",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-84-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18defb1454c,
          },
          "e-277": {
            id: "e-277",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-84",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "65af9f0cabbaf2f9644deba9",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deba9",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-84-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18defb1a622,
          },
          "e-278": {
            id: "e-278",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-84",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "65af9f0cabbaf2f9644deb6f",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb6f",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-84-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18defb1e06a,
          },
          "e-279": {
            id: "e-279",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-84",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "65af9f0cabbaf2f9644debae",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debae",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-84-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18defb2183b,
          },
          "e-280": {
            id: "e-280",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-84",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "65af9f0cabbaf2f9644deb6a",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb6a",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-84-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18defb2452d,
          },
          "e-282": {
            id: "e-282",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-84",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "65af9f0cabbaf2f9644deb6d",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb6d",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-84-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18defb2f949,
          },
          "e-283": {
            id: "e-283",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-84",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb6b",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb6b",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-84-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18defb32422,
          },
          "e-284": {
            id: "e-284",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-84",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "65af9f0cabbaf2f9644deba8",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deba8",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-84-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18defb37a5b,
          },
          "e-285": {
            id: "e-285",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-84",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "65af9f0cabbaf2f9644deb6e",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb6e",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-84-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18defb3a44f,
          },
          "e-286": {
            id: "e-286",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-84",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "65bb45f270ea76a1adfa0909",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65bb45f270ea76a1adfa0909",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-84-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18defb3d664,
          },
          "e-287": {
            id: "e-287",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-84",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "65bb47b2f0d1f240cac16e34",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65bb47b2f0d1f240cac16e34",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-84-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18defb4063d,
          },
          "e-288": {
            id: "e-288",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-84",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "65bb495c8d5c55a145a0dcd5",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65bb495c8d5c55a145a0dcd5",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-84-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18defb42fee,
          },
          "e-289": {
            id: "e-289",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-84",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "65cb6ddbd76285ff880a7828",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65cb6ddbd76285ff880a7828",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-84-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18defb45c00,
          },
          "e-303": {
            id: "e-303",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-93",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-304",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb4a|f62ff884-fda8-276f-9d12-8a2062c4e766",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb4a|f62ff884-fda8-276f-9d12-8a2062c4e766",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e0efb62a1,
          },
          "e-304": {
            id: "e-304",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-94",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-303",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb4a|f62ff884-fda8-276f-9d12-8a2062c4e766",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb4a|f62ff884-fda8-276f-9d12-8a2062c4e766",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e0efb62a1,
          },
          "e-305": {
            id: "e-305",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-95",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-306",
              },
            },
            mediaQueries: ["medium", "small", "tiny"],
            target: {
              selector: ".nav-link",
              originalId:
                "65af9f0cabbaf2f9644deb4a|64d6b572-7c43-936d-785b-b92d636aa672",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".nav-link",
                originalId:
                  "65af9f0cabbaf2f9644deb4a|64d6b572-7c43-936d-785b-b92d636aa672",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e0f1a8759,
          },
          "e-307": {
            id: "e-307",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-96",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-308",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".challenge-grid",
              originalId:
                "65af9f0cabbaf2f9644deb4a|256a265e-5dba-532c-9aee-14479b328fc9",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".challenge-grid",
                originalId:
                  "65af9f0cabbaf2f9644deb4a|256a265e-5dba-532c-9aee-14479b328fc9",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 20,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e189ecea1,
          },
          "e-309": {
            id: "e-309",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-84",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb64",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb64",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-84-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18e1e0b741c,
          },
          "e-310": {
            id: "e-310",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_MOVE",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-97",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "65af9f0cabbaf2f9644deb5f",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb5f",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-97-p",
                selectedAxis: "X_AXIS",
                basedOn: "VIEWPORT",
                reverse: !1,
                smoothing: 90,
                restingState: 50,
              },
              {
                continuousParameterGroupId: "a-97-p-2",
                selectedAxis: "Y_AXIS",
                basedOn: "VIEWPORT",
                reverse: !1,
                smoothing: 90,
                restingState: 50,
              },
            ],
            createdOn: 0x18e2422f754,
          },
          "e-311": {
            id: "e-311",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-98",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-312",
              },
            },
            mediaQueries: ["main"],
            target: {
              selector: ".careers-slider-next",
              originalId:
                "65af9f0cabbaf2f9644deb5f|2817ab15-3f9a-c9e6-38a7-fbecfdeefc90",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".careers-slider-next",
                originalId:
                  "65af9f0cabbaf2f9644deb5f|2817ab15-3f9a-c9e6-38a7-fbecfdeefc90",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e2424bc26,
          },
          "e-312": {
            id: "e-312",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-99",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-311",
              },
            },
            mediaQueries: ["main"],
            target: {
              selector: ".careers-slider-next",
              originalId:
                "65af9f0cabbaf2f9644deb5f|2817ab15-3f9a-c9e6-38a7-fbecfdeefc90",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".careers-slider-next",
                originalId:
                  "65af9f0cabbaf2f9644deb5f|2817ab15-3f9a-c9e6-38a7-fbecfdeefc90",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e2424bc27,
          },
          "e-313": {
            id: "e-313",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-100",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-314",
              },
            },
            mediaQueries: ["main"],
            target: {
              selector: ".careers-slider-prev",
              originalId:
                "65af9f0cabbaf2f9644deb5f|2817ab15-3f9a-c9e6-38a7-fbecfdeefc8f",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".careers-slider-prev",
                originalId:
                  "65af9f0cabbaf2f9644deb5f|2817ab15-3f9a-c9e6-38a7-fbecfdeefc8f",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e242937b2,
          },
          "e-314": {
            id: "e-314",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-101",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-313",
              },
            },
            mediaQueries: ["main"],
            target: {
              selector: ".careers-slider-prev",
              originalId:
                "65af9f0cabbaf2f9644deb5f|2817ab15-3f9a-c9e6-38a7-fbecfdeefc8f",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".careers-slider-prev",
                originalId:
                  "65af9f0cabbaf2f9644deb5f|2817ab15-3f9a-c9e6-38a7-fbecfdeefc8f",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e242937b3,
          },
          "e-315": {
            id: "e-315",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-102",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-316",
              },
            },
            mediaQueries: ["main"],
            target: {
              selector: ".careers-slider-next",
              originalId:
                "65af9f0cabbaf2f9644deb5f|2817ab15-3f9a-c9e6-38a7-fbecfdeefc90",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".careers-slider-next",
                originalId:
                  "65af9f0cabbaf2f9644deb5f|2817ab15-3f9a-c9e6-38a7-fbecfdeefc90",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e243dc436,
          },
          "e-317": {
            id: "e-317",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-102",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-318",
              },
            },
            mediaQueries: ["main"],
            target: {
              selector: ".careers-slider-prev",
              originalId:
                "65af9f0cabbaf2f9644deb5f|2817ab15-3f9a-c9e6-38a7-fbecfdeefc8f",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".careers-slider-prev",
                originalId:
                  "65af9f0cabbaf2f9644deb5f|2817ab15-3f9a-c9e6-38a7-fbecfdeefc8f",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e243f6465,
          },
          "e-319": {
            id: "e-319",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_MOVE",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-97",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb60",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb60",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-97-p",
                selectedAxis: "X_AXIS",
                basedOn: "VIEWPORT",
                reverse: !1,
                smoothing: 90,
                restingState: 50,
              },
              {
                continuousParameterGroupId: "a-97-p-2",
                selectedAxis: "Y_AXIS",
                basedOn: "VIEWPORT",
                reverse: !1,
                smoothing: 90,
                restingState: 50,
              },
            ],
            createdOn: 0x18e27beaed3,
          },
          "e-320": {
            id: "e-320",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-77",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb4a|256a265e-5dba-532c-9aee-14479b328fc2",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb4a|256a265e-5dba-532c-9aee-14479b328fc2",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-77-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18e2dea10ed,
          },
          "e-321": {
            id: "e-321",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_START",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-103",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-322",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debab",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debab",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e2e64c4f8,
          },
          "e-322": {
            id: "e-322",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_FINISH",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-103",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-321",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debab",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debab",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e2e64c4f9,
          },
          "e-324": {
            id: "e-324",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_FINISH",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-103",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-323",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb5f",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb5f",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e2e66cde2,
          },
          "e-326": {
            id: "e-326",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_FINISH",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-103",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-325",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debb1",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debb1",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e2e670281,
          },
          "e-328": {
            id: "e-328",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_FINISH",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-103",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-327",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb60",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb60",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e2e672361,
          },
          "e-330": {
            id: "e-330",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_FINISH",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-103",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-329",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb6c",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb6c",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e2e674871,
          },
          "e-332": {
            id: "e-332",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_FINISH",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-103",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-331",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debb2",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debb2",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e2e6a33b9,
          },
          "e-334": {
            id: "e-334",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_FINISH",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-105",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-333",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb64",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb64",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e2e6afc25,
          },
          "e-336": {
            id: "e-336",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_FINISH",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-103",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-335",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debb4",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debb4",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e2e85f9da,
          },
          "e-341": {
            id: "e-341",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-43",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-342",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".banner",
              originalId:
                "65af9f0cabbaf2f9644deb60|9a324c01-21b9-2133-5ca4-83ffaab1eb4c",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".banner",
                originalId:
                  "65af9f0cabbaf2f9644deb60|9a324c01-21b9-2133-5ca4-83ffaab1eb4c",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e2e9dd05a,
          },
          "e-346": {
            id: "e-346",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_FINISH",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-56",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-345",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb6f",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb6f",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e5b6bf628,
          },
          "e-348": {
            id: "e-348",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_FINISH",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-56",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-347",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debae",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debae",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e5b6c4794,
          },
          "e-350": {
            id: "e-350",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_FINISH",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-56",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-349",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb6a",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb6a",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e5b6c7e61,
          },
          "e-352": {
            id: "e-352",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_FINISH",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-56",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-351",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debaf",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debaf",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e5b73423d,
          },
          "e-354": {
            id: "e-354",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_FINISH",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-56",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-353",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb6d",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb6d",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e5b737676,
          },
          "e-356": {
            id: "e-356",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_FINISH",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-56",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-355",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb6b",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb6b",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e5b73a84c,
          },
          "e-358": {
            id: "e-358",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_FINISH",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-56",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-357",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deba8",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deba8",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e5b73dcec,
          },
          "e-360": {
            id: "e-360",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_FINISH",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-56",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-359",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb6e",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb6e",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e5b741763,
          },
          "e-362": {
            id: "e-362",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_FINISH",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-56",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-361",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65bb45f270ea76a1adfa0909",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65bb45f270ea76a1adfa0909",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e5b74439b,
          },
          "e-364": {
            id: "e-364",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_FINISH",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-56",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-363",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65bb47b2f0d1f240cac16e34",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65bb47b2f0d1f240cac16e34",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e5b74878d,
          },
          "e-366": {
            id: "e-366",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_FINISH",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-56",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-365",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65bb495c8d5c55a145a0dcd5",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65bb495c8d5c55a145a0dcd5",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18e5b74abcc,
          },
          "e-368": {
            id: "e-368",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_MOVE",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-108",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "65af9f0cabbaf2f9644deb4a",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb4a",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-108-p",
                selectedAxis: "X_AXIS",
                basedOn: "VIEWPORT",
                reverse: !1,
                smoothing: 86,
                restingState: 50,
              },
              {
                continuousParameterGroupId: "a-108-p-2",
                selectedAxis: "Y_AXIS",
                basedOn: "VIEWPORT",
                reverse: !1,
                smoothing: 86,
                restingState: 50,
              },
            ],
            createdOn: 0x18f05bc16c4,
          },
          "e-369": {
            id: "e-369",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-111",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".card-bg",
              originalId:
                "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e608722",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".card-bg",
                originalId:
                  "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e608722",
                appliesTo: "CLASS",
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-111-p",
                smoothing: 80,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18f05cd1a95,
          },
          "e-370": {
            id: "e-370",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-112",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-371",
              },
            },
            mediaQueries: ["main"],
            target: {
              selector: ".enquiry-card__wrap",
              originalId:
                "65af9f0cabbaf2f9644deb4a|21ca679e-a158-6eb5-a63f-ddd0dbd67d8f",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".enquiry-card__wrap",
                originalId:
                  "65af9f0cabbaf2f9644deb4a|21ca679e-a158-6eb5-a63f-ddd0dbd67d8f",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f066024f1,
          },
          "e-371": {
            id: "e-371",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-113",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-370",
              },
            },
            mediaQueries: ["main"],
            target: {
              selector: ".enquiry-card__wrap",
              originalId:
                "65af9f0cabbaf2f9644deb4a|21ca679e-a158-6eb5-a63f-ddd0dbd67d8f",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".enquiry-card__wrap",
                originalId:
                  "65af9f0cabbaf2f9644deb4a|21ca679e-a158-6eb5-a63f-ddd0dbd67d8f",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f066024f3,
          },
          "e-372": {
            id: "e-372",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-115",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debab|6faa5d62-2db2-5ee8-36ac-b989a9bec140",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debab|6faa5d62-2db2-5ee8-36ac-b989a9bec140",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-115-p",
                smoothing: 85,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18f0bc3dc4d,
          },
          "e-373": {
            id: "e-373",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-116",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-374",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debab|d0d2438e-f72c-18ee-5b27-7af792caecf9",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debab|d0d2438e-f72c-18ee-5b27-7af792caecf9",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f0c3ad7f0,
          },
          "e-374": {
            id: "e-374",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-117",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-373",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debab|d0d2438e-f72c-18ee-5b27-7af792caecf9",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debab|d0d2438e-f72c-18ee-5b27-7af792caecf9",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f0c3ad7f2,
          },
          "e-375": {
            id: "e-375",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-118",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-378",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".enquiry-card__wrap.is--easter",
              originalId:
                "65af9f0cabbaf2f9644debb4|1f277ab0-fd09-8935-86a6-6ef803fd3f93",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".enquiry-card__wrap.is--easter",
                originalId:
                  "65af9f0cabbaf2f9644debb4|1f277ab0-fd09-8935-86a6-6ef803fd3f93",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f1029f49b,
          },
          "e-376": {
            id: "e-376",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-119",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-377",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".enquiry-card__wrap.is--easter",
              originalId:
                "65af9f0cabbaf2f9644debb4|1f277ab0-fd09-8935-86a6-6ef803fd3f93",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".enquiry-card__wrap.is--easter",
                originalId:
                  "65af9f0cabbaf2f9644debb4|1f277ab0-fd09-8935-86a6-6ef803fd3f93",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f1029f49d,
          },
          "e-377": {
            id: "e-377",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-118",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-378",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".enquiry-card__wrap.is--easter",
              originalId:
                "65af9f0cabbaf2f9644debb4|1f277ab0-fd09-8935-86a6-6ef803fd3f93",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".enquiry-card__wrap.is--easter",
                originalId:
                  "65af9f0cabbaf2f9644debb4|1f277ab0-fd09-8935-86a6-6ef803fd3f93",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f1029f49b,
          },
          "e-378": {
            id: "e-378",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-119",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-377",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".enquiry-card__wrap.is--easter",
              originalId:
                "65af9f0cabbaf2f9644debb4|1f277ab0-fd09-8935-86a6-6ef803fd3f93",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".enquiry-card__wrap.is--easter",
                originalId:
                  "65af9f0cabbaf2f9644debb4|1f277ab0-fd09-8935-86a6-6ef803fd3f93",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f1029f49d,
          },
          "e-379": {
            id: "e-379",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-43",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-380",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debb4|47fab3f8-fe70-17ac-0f87-5552fca0e54f",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debb4|47fab3f8-fe70-17ac-0f87-5552fca0e54f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f10797e67,
          },
          "e-381": {
            id: "e-381",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-45",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-382",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debb4|47fab3f8-fe70-17ac-0f87-5552fca0e54f",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debb4|47fab3f8-fe70-17ac-0f87-5552fca0e54f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f10797e67,
          },
          "e-383": {
            id: "e-383",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-23",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-384",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debb4|8829c381-e014-a560-f7f7-dadf0d95a87a",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debb4|8829c381-e014-a560-f7f7-dadf0d95a87a",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f11c53d1b,
          },
          "e-384": {
            id: "e-384",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-120",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-383",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debb4|8829c381-e014-a560-f7f7-dadf0d95a87a",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debb4|8829c381-e014-a560-f7f7-dadf0d95a87a",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f11c53d1d,
          },
          "e-385": {
            id: "e-385",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-121",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-386",
              },
            },
            mediaQueries: ["main"],
            target: {
              selector: ".design-card",
              originalId:
                "65af9f0cabbaf2f9644debb4|8829c381-e014-a560-f7f7-dadf0d95a880",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".design-card",
                originalId:
                  "65af9f0cabbaf2f9644debb4|8829c381-e014-a560-f7f7-dadf0d95a880",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f120d4fca,
          },
          "e-386": {
            id: "e-386",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-122",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-385",
              },
            },
            mediaQueries: ["main"],
            target: {
              selector: ".design-card",
              originalId:
                "65af9f0cabbaf2f9644debb4|8829c381-e014-a560-f7f7-dadf0d95a880",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".design-card",
                originalId:
                  "65af9f0cabbaf2f9644debb4|8829c381-e014-a560-f7f7-dadf0d95a880",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f120d4fca,
          },
          "e-387": {
            id: "e-387",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-123",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-388",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".next-page.is--work",
              originalId: "f00924d9-05ec-c45e-7204-a836371d99b0",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".next-page.is--work",
                originalId: "f00924d9-05ec-c45e-7204-a836371d99b0",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f5f45408f,
          },
          "e-388": {
            id: "e-388",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-124",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-387",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".next-page.is--work",
              originalId: "f00924d9-05ec-c45e-7204-a836371d99b0",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".next-page.is--work",
                originalId: "f00924d9-05ec-c45e-7204-a836371d99b0",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f5f454094,
          },
          "e-389": {
            id: "e-389",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-91",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-390",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".next-page.is--default",
              originalId: "f095ceff-1416-61e3-4e28-8aa500ebb59c",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".next-page.is--default",
                originalId: "f095ceff-1416-61e3-4e28-8aa500ebb59c",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f5f4888d6,
          },
          "e-390": {
            id: "e-390",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-92",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-389",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".next-page.is--default",
              originalId: "f095ceff-1416-61e3-4e28-8aa500ebb59c",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".next-page.is--default",
                originalId: "f095ceff-1416-61e3-4e28-8aa500ebb59c",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f5f4888d8,
          },
          "e-391": {
            id: "e-391",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-125",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-392",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debb4|e22e6ad0-544c-1f5b-eb30-ec7a75aee803",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debb4|e22e6ad0-544c-1f5b-eb30-ec7a75aee803",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 10,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f5f56f960,
          },
          "e-393": {
            id: "e-393",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-125",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-394",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debb4|32fa89bd-76d4-b6a7-32ac-2ad1b3bf2efc",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debb4|32fa89bd-76d4-b6a7-32ac-2ad1b3bf2efc",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 10,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f5f5718cf,
          },
          "e-395": {
            id: "e-395",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-125",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-396",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debb4|36f058f7-221b-08d1-18ac-d631ac43dc0e",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debb4|36f058f7-221b-08d1-18ac-d631ac43dc0e",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 10,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f5f573c79,
          },
          "e-397": {
            id: "e-397",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-125",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-398",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debb4|bbc725f8-c006-3431-a2af-aa73388b502c",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debb4|bbc725f8-c006-3431-a2af-aa73388b502c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 10,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f5f576e40,
          },
          "e-399": {
            id: "e-399",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-126",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-400",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb4a|21ca679e-a158-6eb5-a63f-ddd0dbd67d8f",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb4a|21ca679e-a158-6eb5-a63f-ddd0dbd67d8f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !0,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f5f7ea221,
          },
          "e-400": {
            id: "e-400",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-127",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-399",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb4a|21ca679e-a158-6eb5-a63f-ddd0dbd67d8f",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb4a|21ca679e-a158-6eb5-a63f-ddd0dbd67d8f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f5f7ea222,
          },
          "e-401": {
            id: "e-401",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-126",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-402",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debb2|cb6201a7-ef8a-b4d8-1858-987925710765",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debb2|cb6201a7-ef8a-b4d8-1858-987925710765",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !0,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f5f816b05,
          },
          "e-402": {
            id: "e-402",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-127",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-401",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debb2|cb6201a7-ef8a-b4d8-1858-987925710765",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debb2|cb6201a7-ef8a-b4d8-1858-987925710765",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f5f816b06,
          },
          "e-403": {
            id: "e-403",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-128",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-404",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debb4|f3a5d830-1db5-547c-b366-85730fbce3d0",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debb4|f3a5d830-1db5-547c-b366-85730fbce3d0",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 15,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f61eedff5,
          },
          "e-405": {
            id: "e-405",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-129",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-406",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".filter-checkbox.is--team",
              originalId:
                "65af9f0cabbaf2f9644debb4|ec0e172d-2a36-f005-7081-04a81b673df5",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".filter-checkbox.is--team",
                originalId:
                  "65af9f0cabbaf2f9644debb4|ec0e172d-2a36-f005-7081-04a81b673df5",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f765687a6,
          },
          "e-406": {
            id: "e-406",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-130",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-405",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".filter-checkbox.is--team",
              originalId:
                "65af9f0cabbaf2f9644debb4|ec0e172d-2a36-f005-7081-04a81b673df5",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".filter-checkbox.is--team",
                originalId:
                  "65af9f0cabbaf2f9644debb4|ec0e172d-2a36-f005-7081-04a81b673df5",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f765687a8,
          },
          "e-407": {
            id: "e-407",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-131",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main", "medium", "small"],
            target: {
              id: "65af9f0cabbaf2f9644deb5f|55cad09a-25be-9f0f-3e29-3cffe5ea806a",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb5f|55cad09a-25be-9f0f-3e29-3cffe5ea806a",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-131-p",
                smoothing: 80,
                startsEntering: !0,
                addStartOffset: !0,
                addOffsetValue: 50,
                startsExiting: !0,
                addEndOffset: !0,
                endOffsetValue: -20,
              },
            ],
            createdOn: 0x18f76bd0ab3,
          },
          "e-408": {
            id: "e-408",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-131",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb5f|55cad09a-25be-9f0f-3e29-3cffe5ea806a",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb5f|55cad09a-25be-9f0f-3e29-3cffe5ea806a",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-131-p",
                smoothing: 80,
                startsEntering: !0,
                addStartOffset: !0,
                addOffsetValue: 60,
                startsExiting: !0,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x18f76d01161,
          },
          "e-409": {
            id: "e-409",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-125",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-410",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".card-header.anim",
              originalId:
                "65af9f0cabbaf2f9644debb2|cb6201a7-ef8a-b4d8-1858-987925710766",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".card-header.anim",
                originalId:
                  "65af9f0cabbaf2f9644debb2|cb6201a7-ef8a-b4d8-1858-987925710766",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 10,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f87de42c8,
          },
          "e-411": {
            id: "e-411",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-125",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-412",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".card-text.anim",
              originalId:
                "65af9f0cabbaf2f9644debb2|cb6201a7-ef8a-b4d8-1858-98792571076c",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".card-text.anim",
                originalId:
                  "65af9f0cabbaf2f9644debb2|cb6201a7-ef8a-b4d8-1858-98792571076c",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 10,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x18f87dee3f9,
          },
          "e-413": {
            id: "e-413",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-58",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-414",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".project-text-left",
              originalId:
                "65af9f0cabbaf2f9644deba8|13a17f9d-8d34-8ace-8420-0cbd66db0cbc",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".project-text-left",
                originalId:
                  "65af9f0cabbaf2f9644deba8|13a17f9d-8d34-8ace-8420-0cbd66db0cbc",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x1948dccd8f1,
          },
          "e-415": {
            id: "e-415",
            name: "",
            animationType: "preset",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-132",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "67995ab1e7b96a3ffe9f2876",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "67995ab1e7b96a3ffe9f2876",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-132-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x194af0a4652,
          },
          "e-417": {
            id: "e-417",
            name: "",
            animationType: "preset",
            eventTypeId: "PAGE_FINISH",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-56",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-416",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "67995ab1e7b96a3ffe9f2876",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "67995ab1e7b96a3ffe9f2876",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x194af0a4652,
          },
          "e-418": {
            id: "e-418",
            name: "",
            animationType: "preset",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-133",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "67995db30f864f9db690b7a1",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "67995db30f864f9db690b7a1",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-133-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x194af16088d,
          },
          "e-420": {
            id: "e-420",
            name: "",
            animationType: "preset",
            eventTypeId: "PAGE_FINISH",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-56",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-419",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "67995db30f864f9db690b7a1",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "67995db30f864f9db690b7a1",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x194af16088d,
          },
          "e-421": {
            id: "e-421",
            name: "",
            animationType: "preset",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-134",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "67995f7c76a3fe75523236dc",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "67995f7c76a3fe75523236dc",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-134-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x194af1cff67,
          },
          "e-423": {
            id: "e-423",
            name: "",
            animationType: "preset",
            eventTypeId: "PAGE_FINISH",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-56",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-422",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "67995f7c76a3fe75523236dc",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "67995f7c76a3fe75523236dc",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x194af1cff67,
          },
          "e-424": {
            id: "e-424",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-9",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb4a|c35208d0-5e6e-8d78-e878-3380f417ee18",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb4a|c35208d0-5e6e-8d78-e878-3380f417ee18",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-9-p",
                smoothing: 80,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x1954d9be62c,
          },
          "e-425": {
            id: "e-425",
            name: "",
            animationType: "preset",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-135",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "686603127be028edc82ca6d0",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "686603127be028edc82ca6d0",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-135-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x197ce7c01b1,
          },
          "e-426": {
            id: "e-426",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_MOVE",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-136",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "686603127be028edc82ca6d0",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "686603127be028edc82ca6d0",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-136-p",
                selectedAxis: "X_AXIS",
                basedOn: "VIEWPORT",
                reverse: !1,
                smoothing: 90,
                restingState: 50,
              },
              {
                continuousParameterGroupId: "a-136-p-2",
                selectedAxis: "Y_AXIS",
                basedOn: "VIEWPORT",
                reverse: !1,
                smoothing: 90,
                restingState: 50,
              },
            ],
            createdOn: 0x197ce7c01b1,
          },
          "e-428": {
            id: "e-428",
            name: "",
            animationType: "preset",
            eventTypeId: "PAGE_FINISH",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-103",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-427",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "686603127be028edc82ca6d0",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "686603127be028edc82ca6d0",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x197ce7c01b1,
          },
          "e-429": {
            id: "e-429",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-137",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-430",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6870a8fa86b8f6effc526e80|29f9b162-1e63-7905-d477-afbaa2099581",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6870a8fa86b8f6effc526e80|29f9b162-1e63-7905-d477-afbaa2099581",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x197f8141481,
          },
          "e-432": {
            id: "e-432",
            name: "",
            animationType: "preset",
            eventTypeId: "PAGE_FINISH",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-56",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-431",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6870a8fa86b8f6effc526e80",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6870a8fa86b8f6effc526e80",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x197f8141481,
          },
          "e-433": {
            id: "e-433",
            name: "",
            animationType: "preset",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-138",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "6870a8fa86b8f6effc526e80",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6870a8fa86b8f6effc526e80",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-138-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x197f8141481,
          },
          "e-434": {
            id: "e-434",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-9",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb4a|a1bf78e3-5403-9f03-4bf1-b58b7326243c",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb4a|a1bf78e3-5403-9f03-4bf1-b58b7326243c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-9-p",
                smoothing: 80,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x198098ec811,
          },
          "e-435": {
            id: "e-435",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-66",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-436",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb4a|80c12096-f855-7473-d2dc-a0ada87effa0",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb4a|80c12096-f855-7473-d2dc-a0ada87effa0",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x198158d0716,
          },
          "e-437": {
            id: "e-437",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-141",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-438",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "687c63e3af3893c1a0fe6dc3|29f9b162-1e63-7905-d477-afbaa2099581",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "687c63e3af3893c1a0fe6dc3|29f9b162-1e63-7905-d477-afbaa2099581",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19825e6318c,
          },
          "e-440": {
            id: "e-440",
            name: "",
            animationType: "preset",
            eventTypeId: "PAGE_FINISH",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-56",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-439",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "687c63e3af3893c1a0fe6dc3",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "687c63e3af3893c1a0fe6dc3",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19825e6318c,
          },
          "e-441": {
            id: "e-441",
            name: "",
            animationType: "preset",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-142",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main"],
            target: {
              id: "687c63e3af3893c1a0fe6dc3",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "687c63e3af3893c1a0fe6dc3",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-142-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x19825e6318c,
          },
          "e-444": {
            id: "e-444",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_START",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-139",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-445",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb4a",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb4a",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x1982a01acc2,
          },
          "e-446": {
            id: "e-446",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-139",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-447",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".page-load-trigger",
              originalId:
                "65af9f0cabbaf2f9644deb4a|c579b6f5-1090-e869-01af-0983a091f6c0",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".page-load-trigger",
                originalId:
                  "65af9f0cabbaf2f9644deb4a|c579b6f5-1090-e869-01af-0983a091f6c0",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x1982a2d62be,
          },
          "e-448": {
            id: "e-448",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "SLIDE_EFFECT",
              instant: !1,
              config: {
                actionListId: "slideInBottom",
                autoStopEventId: "e-449",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb5f|db404aa1-b036-4516-b4df-4b187aef3164",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb5f|db404aa1-b036-4516-b4df-4b187aef3164",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 10,
              scrollOffsetUnit: "%",
              delay: 100,
              direction: "BOTTOM",
              effectIn: !0,
            },
            createdOn: 0x1983c4c8816,
          },
          "e-450": {
            id: "e-450",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "SLIDE_EFFECT",
              instant: !1,
              config: {
                actionListId: "slideInBottom",
                autoStopEventId: "e-451",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb6c|df5a8ff4-ed79-8f98-bca9-5979877fe510",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb6c|df5a8ff4-ed79-8f98-bca9-5979877fe510",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 10,
              scrollOffsetUnit: "%",
              delay: 100,
              direction: "BOTTOM",
              effectIn: !0,
            },
            createdOn: 0x1983c4d9244,
          },
          "e-452": {
            id: "e-452",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "SLIDE_EFFECT",
              instant: !1,
              config: {
                actionListId: "slideInBottom",
                autoStopEventId: "e-453",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb6c|94fd136a-0aeb-4229-236a-b733092edabc",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb6c|94fd136a-0aeb-4229-236a-b733092edabc",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 10,
              scrollOffsetUnit: "%",
              delay: 100,
              direction: "BOTTOM",
              effectIn: !0,
            },
            createdOn: 0x1983c4dccc3,
          },
          "e-454": {
            id: "e-454",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "SLIDE_EFFECT",
              instant: !1,
              config: {
                actionListId: "slideInBottom",
                autoStopEventId: "e-455",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debb2|cb6201a7-ef8a-b4d8-1858-987925710764",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debb2|cb6201a7-ef8a-b4d8-1858-987925710764",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 10,
              scrollOffsetUnit: "%",
              delay: 100,
              direction: "BOTTOM",
              effectIn: !0,
            },
            createdOn: 0x1983c4e3100,
          },
          "e-458": {
            id: "e-458",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_START",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-56",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-459",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "687be9883a0830c27e40b106",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "687be9883a0830c27e40b106",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x1987d59114c,
          },
          "e-460": {
            id: "e-460",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_SCROLL",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-84",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "687be9883a0830c27e40b106",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "687be9883a0830c27e40b106",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-84-p",
                smoothing: 50,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x1987d59a7e0,
          },
          "e-461": {
            id: "e-461",
            name: "",
            animationType: "custom",
            eventTypeId: "PAGE_START",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-56",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-462",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644debab",
              appliesTo: "PAGE",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644debab",
                appliesTo: "PAGE",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x1988abc68bf,
          },
          "e-465": {
            id: "e-465",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-67",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-466",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "65af9f0cabbaf2f9644deb4a|3661061e-3944-227f-20bd-16f33a773683",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "65af9f0cabbaf2f9644deb4a|3661061e-3944-227f-20bd-16f33a773683",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x1991b2ab2a2,
          },
        },
        actionLists: {
          "a-3": {
            id: "a-3",
            title: "Slider Arrow Hover",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-3-n",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 300,
                      target: {
                        useEventTarget: !0,
                        id: "32bce2b5-44ef-8e4d-cd69-ce9925e5308c",
                      },
                      globalSwatchId: "",
                      rValue: 48,
                      bValue: 255,
                      gValue: 110,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-3-n-2",
                    actionTypeId: "STYLE_FILTER",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 300,
                      target: {},
                      filters: [
                        {
                          type: "invert",
                          filterId: "dc27",
                          value: 100,
                          unit: "%",
                        },
                        {
                          type: "saturate",
                          filterId: "fa48",
                          value: 0,
                          unit: "%",
                        },
                        {
                          type: "brightness",
                          filterId: "5382",
                          value: 1e3,
                          unit: "%",
                        },
                      ],
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18a4b792651,
          },
          "a-4": {
            id: "a-4",
            title: "Slider Arrow Hover OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-4-n",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 300,
                      target: {
                        useEventTarget: !0,
                        id: "32bce2b5-44ef-8e4d-cd69-ce9925e5308c",
                      },
                      globalSwatchId: "fc1bce37",
                      rValue: 255,
                      bValue: 255,
                      gValue: 255,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-4-n-2",
                    actionTypeId: "STYLE_FILTER",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 300,
                      target: {},
                      filters: [
                        {
                          type: "invert",
                          filterId: "dc27",
                          value: 0,
                          unit: "%",
                        },
                        {
                          type: "saturate",
                          filterId: "fa48",
                          value: 100,
                          unit: "%",
                        },
                        {
                          type: "brightness",
                          filterId: "5382",
                          value: 100,
                          unit: "%",
                        },
                      ],
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18a4b792651,
          },
          "a-5": {
            id: "a-5",
            title: "Timeline Left",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-5-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".timeline-marker.is-odd",
                        selectorGuids: [
                          "ac0b7096-35d2-7e9c-14fa-e461ec807fd5",
                          "34faa797-8ab7-f560-9d5c-7a95a954af07",
                        ],
                      },
                      xValue: 0,
                      yValue: 0,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-5-n-8",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".timeline-text",
                        selectorGuids: ["057ac355-4f6b-bd0c-a66e-d55026146bf0"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-5-n-7",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".timeline-text",
                        selectorGuids: ["057ac355-4f6b-bd0c-a66e-d55026146bf0"],
                      },
                      yValue: 50,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-5-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".timeline-date",
                        selectorGuids: ["66b7c83f-6a0c-a849-f0a6-9ac6b038bd61"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-5-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".timeline-date",
                        selectorGuids: ["66b7c83f-6a0c-a849-f0a6-9ac6b038bd61"],
                      },
                      xValue: 50,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-5-n-2",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".timeline-marker.is-odd",
                        selectorGuids: [
                          "ac0b7096-35d2-7e9c-14fa-e461ec807fd5",
                          "34faa797-8ab7-f560-9d5c-7a95a954af07",
                        ],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-5-n-6",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 200,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".timeline-date",
                        selectorGuids: ["66b7c83f-6a0c-a849-f0a6-9ac6b038bd61"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-5-n-5",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 200,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".timeline-date",
                        selectorGuids: ["66b7c83f-6a0c-a849-f0a6-9ac6b038bd61"],
                      },
                      xValue: 0,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-5-n-9",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 200,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".timeline-text",
                        selectorGuids: ["057ac355-4f6b-bd0c-a66e-d55026146bf0"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-5-n-10",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 200,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".timeline-text",
                        selectorGuids: ["057ac355-4f6b-bd0c-a66e-d55026146bf0"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c82bc0d20,
          },
          "a-6": {
            id: "a-6",
            title: "Timeline Right",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-6-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".timeline-marker",
                        selectorGuids: ["ac0b7096-35d2-7e9c-14fa-e461ec807fd5"],
                      },
                      xValue: 0,
                      yValue: 0,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-6-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".timeline-date",
                        selectorGuids: ["66b7c83f-6a0c-a849-f0a6-9ac6b038bd61"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-6-n-5",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".timeline-date",
                        selectorGuids: ["66b7c83f-6a0c-a849-f0a6-9ac6b038bd61"],
                      },
                      xValue: -50,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-6-n-9",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".timeline-text",
                        selectorGuids: ["057ac355-4f6b-bd0c-a66e-d55026146bf0"],
                      },
                      yValue: 50,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-6-n-10",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".timeline-text",
                        selectorGuids: ["057ac355-4f6b-bd0c-a66e-d55026146bf0"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-6-n-6",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".timeline-marker",
                        selectorGuids: ["ac0b7096-35d2-7e9c-14fa-e461ec807fd5"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-6-n-7",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 200,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".timeline-date",
                        selectorGuids: ["66b7c83f-6a0c-a849-f0a6-9ac6b038bd61"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-6-n-8",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 200,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".timeline-date",
                        selectorGuids: ["66b7c83f-6a0c-a849-f0a6-9ac6b038bd61"],
                      },
                      xValue: 0,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-6-n-11",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 200,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".timeline-text",
                        selectorGuids: ["057ac355-4f6b-bd0c-a66e-d55026146bf0"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-6-n-12",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 200,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".timeline-text",
                        selectorGuids: ["057ac355-4f6b-bd0c-a66e-d55026146bf0"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18c82bc0d20,
          },
          "a-9": {
            id: "a-9",
            title: "Why Text",
            continuousParameterGroups: [
              {
                id: "a-9-p",
                type: "SCROLL_PROGRESS",
                parameterLabel: "Scroll",
                continuousActionGroups: [
                  {
                    keyframe: 0,
                    actionItems: [
                      {
                        id: "a-9-n",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".shift-left",
                            selectorGuids: [
                              "7ca03672-629d-a212-0289-2a662b2883e4",
                            ],
                          },
                          xValue: 25,
                          xUnit: "%",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-9-n-3",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".shift-right",
                            selectorGuids: [
                              "2985a8f9-3aa1-5acc-db48-b892cdffffc6",
                            ],
                          },
                          xValue: -25,
                          xUnit: "%",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 40,
                    actionItems: [
                      {
                        id: "a-9-n-5",
                        actionTypeId: "STYLE_BACKGROUND_COLOR",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "PARENT",
                            selector: ".wrap-transition",
                            selectorGuids: [
                              "09a3ab5e-bdcf-6665-8f51-86cc7603d46b",
                            ],
                          },
                          globalSwatchId: "",
                          rValue: 0,
                          bValue: 0,
                          gValue: 0,
                          aValue: 1,
                        },
                      },
                      {
                        id: "a-9-n-8",
                        actionTypeId: "STYLE_TEXT_COLOR",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "PARENT",
                            selector: ".wrap-transition",
                            selectorGuids: [
                              "09a3ab5e-bdcf-6665-8f51-86cc7603d46b",
                            ],
                          },
                          globalSwatchId: "",
                          rValue: 255,
                          bValue: 255,
                          gValue: 255,
                          aValue: 1,
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 50,
                    actionItems: [
                      {
                        id: "a-9-n-6",
                        actionTypeId: "STYLE_BACKGROUND_COLOR",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "PARENT",
                            selector: ".wrap-transition",
                            selectorGuids: [
                              "09a3ab5e-bdcf-6665-8f51-86cc7603d46b",
                            ],
                          },
                          globalSwatchId: "",
                          rValue: 240,
                          bValue: 230,
                          gValue: 237,
                          aValue: 1,
                        },
                      },
                      {
                        id: "a-9-n-7",
                        actionTypeId: "STYLE_TEXT_COLOR",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "PARENT",
                            selector: ".wrap-transition",
                            selectorGuids: [
                              "09a3ab5e-bdcf-6665-8f51-86cc7603d46b",
                            ],
                          },
                          globalSwatchId: "",
                          rValue: 0,
                          bValue: 0,
                          gValue: 0,
                          aValue: 1,
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 100,
                    actionItems: [
                      {
                        id: "a-9-n-2",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".shift-left",
                            selectorGuids: [
                              "7ca03672-629d-a212-0289-2a662b2883e4",
                            ],
                          },
                          xValue: -25,
                          xUnit: "%",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-9-n-4",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".shift-right",
                            selectorGuids: [
                              "2985a8f9-3aa1-5acc-db48-b892cdffffc6",
                            ],
                          },
                          xValue: 25,
                          xUnit: "%",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
            createdOn: 0x18c86ef8cb9,
          },
          "a-20": {
            id: "a-20",
            title: "Services Scroll In",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-20-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".project-chapter-number",
                        selectorGuids: ["98572977-ce59-3d07-1ea3-04a0c034d17e"],
                      },
                      xValue: null,
                      yValue: -20,
                      xUnit: "px",
                      yUnit: "px",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-20-n-7",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".service-line-dark",
                        selectorGuids: ["81441f53-5c0c-d2a5-920f-85ae2b1efdcb"],
                      },
                      widthValue: 0,
                      widthUnit: "%",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-20-n-5",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".service-line-light",
                        selectorGuids: ["0f19e56d-f018-3f4c-8ff6-c54221e725ad"],
                      },
                      widthValue: 0,
                      widthUnit: "%",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-20-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".project-chapter-number",
                        selectorGuids: ["98572977-ce59-3d07-1ea3-04a0c034d17e"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-20-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".project-chapter-number",
                        selectorGuids: ["98572977-ce59-3d07-1ea3-04a0c034d17e"],
                      },
                      xValue: null,
                      yValue: 0,
                      xUnit: "px",
                      yUnit: "px",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-20-n-6",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".service-line-light",
                        selectorGuids: ["0f19e56d-f018-3f4c-8ff6-c54221e725ad"],
                      },
                      widthValue: 100,
                      widthUnit: "%",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-20-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".project-chapter-number",
                        selectorGuids: ["98572977-ce59-3d07-1ea3-04a0c034d17e"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-20-n-8",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".service-line-dark",
                        selectorGuids: ["81441f53-5c0c-d2a5-920f-85ae2b1efdcb"],
                      },
                      widthValue: 100,
                      widthUnit: "%",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18cedd14118,
          },
          "a-21": {
            id: "a-21",
            title: "Small Project Card Hover",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-21-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".project-snippet",
                        selectorGuids: ["4232fcbd-80f3-692d-ab1f-52c004b22ab7"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-21-n-8",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".card-bg",
                        selectorGuids: ["6fe78b78-5b92-4db6-78d9-625712b1eae4"],
                      },
                      xValue: 1.05,
                      yValue: 1.05,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-21-n-6",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".project-snippet",
                        selectorGuids: ["4232fcbd-80f3-692d-ab1f-52c004b22ab7"],
                      },
                      yValue: 0.5,
                      xUnit: "PX",
                      yUnit: "em",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-21-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".card-bg",
                        selectorGuids: ["6fe78b78-5b92-4db6-78d9-625712b1eae4"],
                      },
                      value: 0.3,
                      unit: "",
                    },
                  },
                  {
                    id: "a-21-n-9",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".card-bg",
                        selectorGuids: ["6fe78b78-5b92-4db6-78d9-625712b1eae4"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-21-n-7",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".project-snippet",
                        selectorGuids: ["4232fcbd-80f3-692d-ab1f-52c004b22ab7"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "em",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-21-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".project-snippet",
                        selectorGuids: ["4232fcbd-80f3-692d-ab1f-52c004b22ab7"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18cedec8ccc,
          },
          "a-22": {
            id: "a-22",
            title: "Small Project Card Hover OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-22-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 400,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".project-snippet",
                        selectorGuids: ["4232fcbd-80f3-692d-ab1f-52c004b22ab7"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-22-n-6",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 400,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".card-bg",
                        selectorGuids: ["6fe78b78-5b92-4db6-78d9-625712b1eae4"],
                      },
                      xValue: 1.05,
                      yValue: 1.05,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-22-n-5",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 400,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".project-snippet",
                        selectorGuids: ["4232fcbd-80f3-692d-ab1f-52c004b22ab7"],
                      },
                      yValue: 0.5,
                      xUnit: "PX",
                      yUnit: "em",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-22-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 400,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".card-bg",
                        selectorGuids: ["6fe78b78-5b92-4db6-78d9-625712b1eae4"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18cedec8ccc,
          },
          "a-14": {
            id: "a-14",
            title: "Project Card Hover",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-14-n-2",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".project-tag",
                        selectorGuids: ["bbe91c98-46a2-5503-4329-00b65ee502f3"],
                      },
                      heightValue: 0,
                      widthUnit: "PX",
                      heightUnit: "px",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-14-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".project-tag",
                        selectorGuids: ["bbe91c98-46a2-5503-4329-00b65ee502f3"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-14-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".card-bg",
                        selectorGuids: ["6fe78b78-5b92-4db6-78d9-625712b1eae4"],
                      },
                      xValue: 1.05,
                      yValue: 1.05,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-14-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".project-tag",
                        selectorGuids: ["bbe91c98-46a2-5503-4329-00b65ee502f3"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-14-n-3",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".project-tag",
                        selectorGuids: ["bbe91c98-46a2-5503-4329-00b65ee502f3"],
                      },
                      widthUnit: "PX",
                      heightUnit: "AUTO",
                      locked: !1,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18ce9a7a185,
          },
          "a-15": {
            id: "a-15",
            title: "Project Card Hover OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-15-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".card-bg",
                        selectorGuids: ["6fe78b78-5b92-4db6-78d9-625712b1eae4"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-15-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".project-tag",
                        selectorGuids: ["bbe91c98-46a2-5503-4329-00b65ee502f3"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-15-n-2",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".project-tag",
                        selectorGuids: ["bbe91c98-46a2-5503-4329-00b65ee502f3"],
                      },
                      heightValue: 0,
                      widthUnit: "PX",
                      heightUnit: "px",
                      locked: !1,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18ce9a7a185,
          },
          "a-12": {
            id: "a-12",
            title: "Project Card Scroll In",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-12-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".card-bg",
                        selectorGuids: ["6fe78b78-5b92-4db6-78d9-625712b1eae4"],
                      },
                      xValue: 1.25,
                      yValue: 1.25,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-12-n-9",
                    actionTypeId: "STYLE_FILTER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".project-text",
                        selectorGuids: ["a81f5f6b-af25-eff6-ffa3-efefb6d5b7c9"],
                      },
                      filters: [
                        {
                          type: "saturate",
                          filterId: "d357",
                          value: 0,
                          unit: "%",
                        },
                      ],
                    },
                  },
                  {
                    id: "a-12-n-7",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".card-bg",
                        selectorGuids: ["6fe78b78-5b92-4db6-78d9-625712b1eae4"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-12-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".project-card-info",
                        selectorGuids: ["02c18baa-62c7-b737-08b2-20d72c9a9f64"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-12-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".project-card-info",
                        selectorGuids: ["02c18baa-62c7-b737-08b2-20d72c9a9f64"],
                      },
                      yValue: 100,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-12-n-2",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".card-bg",
                        selectorGuids: ["6fe78b78-5b92-4db6-78d9-625712b1eae4"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-12-n-10",
                    actionTypeId: "STYLE_FILTER",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".project-text",
                        selectorGuids: ["a81f5f6b-af25-eff6-ffa3-efefb6d5b7c9"],
                      },
                      filters: [
                        {
                          type: "saturate",
                          filterId: "aa97",
                          value: 100,
                          unit: "%",
                        },
                      ],
                    },
                  },
                  {
                    id: "a-12-n-6",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".project-card-info",
                        selectorGuids: ["02c18baa-62c7-b737-08b2-20d72c9a9f64"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-12-n-5",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".project-card-info",
                        selectorGuids: ["02c18baa-62c7-b737-08b2-20d72c9a9f64"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "px",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-12-n-8",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".card-bg",
                        selectorGuids: ["6fe78b78-5b92-4db6-78d9-625712b1eae4"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18ce9705270,
          },
          "a-36": {
            id: "a-36",
            title: "Filter On",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-36-n-3",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".filter-cancel",
                        selectorGuids: ["64fad229-e835-60f5-ff47-4edc351e0431"],
                      },
                      xValue: 0,
                      yValue: 0,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-36-n-7",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".filter-cancel",
                        selectorGuids: ["64fad229-e835-60f5-ff47-4edc351e0431"],
                      },
                      widthValue: 0,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-36-n",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        useEventTarget: "PARENT",
                        selector: ".filter-checkbox.is--filter",
                        selectorGuids: [
                          "68919f07-ebdd-da43-e90f-761aeb368c62",
                          "f9bf1571-111d-e62e-5664-2c3fc95363fb",
                        ],
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-36-n-10",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        useEventTarget: "PARENT",
                        selector: ".filter-checkbox.is--filter",
                        selectorGuids: [
                          "68919f07-ebdd-da43-e90f-761aeb368c62",
                          "f9bf1571-111d-e62e-5664-2c3fc95363fb",
                        ],
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-36-n-9",
                    actionTypeId: "STYLE_TEXT_COLOR",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        useEventTarget: "PARENT",
                        selector: ".filter-field",
                        selectorGuids: ["68919f07-ebdd-da43-e90f-761aeb368c61"],
                      },
                      globalSwatchId: "",
                      rValue: 255,
                      bValue: 255,
                      gValue: 255,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-36-n-8",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".filter-cancel",
                        selectorGuids: ["64fad229-e835-60f5-ff47-4edc351e0431"],
                      },
                      widthValue: 1.25,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-36-n-6",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".filter-cancel",
                        selectorGuids: ["64fad229-e835-60f5-ff47-4edc351e0431"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18d26852735,
          },
          "a-37": {
            id: "a-37",
            title: "Filter Off",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-37-n-4",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 300,
                      target: {
                        useEventTarget: "PARENT",
                        selector: ".filter-checkbox.is--filter",
                        selectorGuids: [
                          "68919f07-ebdd-da43-e90f-761aeb368c62",
                          "f9bf1571-111d-e62e-5664-2c3fc95363fb",
                        ],
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                  {
                    id: "a-37-n-9",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 300,
                      target: {
                        useEventTarget: "PARENT",
                        selector: ".filter-checkbox.is--filter",
                        selectorGuids: [
                          "68919f07-ebdd-da43-e90f-761aeb368c62",
                          "f9bf1571-111d-e62e-5664-2c3fc95363fb",
                        ],
                      },
                      globalSwatchId: "",
                      rValue: 154,
                      bValue: 162,
                      gValue: 153,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-37-n-8",
                    actionTypeId: "STYLE_TEXT_COLOR",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 300,
                      target: {
                        useEventTarget: "PARENT",
                        selector: ".filter-field",
                        selectorGuids: ["68919f07-ebdd-da43-e90f-761aeb368c61"],
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-37-n-7",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 300,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".filter-cancel",
                        selectorGuids: ["64fad229-e835-60f5-ff47-4edc351e0431"],
                      },
                      widthValue: 0,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-37-n-5",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 300,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".filter-cancel",
                        selectorGuids: ["64fad229-e835-60f5-ff47-4edc351e0431"],
                      },
                      xValue: 0,
                      yValue: 0,
                      locked: !0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18d26852735,
          },
          "a-31": {
            id: "a-31",
            title: "Menu Open",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-31-n",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".menu-icon-close",
                        selectorGuids: ["08579a7a-5f1b-c190-2424-4dc88251775a"],
                      },
                      value: "none",
                    },
                  },
                  {
                    id: "a-31-n-34",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".button.is-nav",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27158",
                          "5c40a8d6-e310-842a-f44b-8dc20de71e50",
                        ],
                      },
                      xValue: 0.8,
                      yValue: 0.8,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-31-n-27",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".link-text.is-1",
                        selectorGuids: [
                          "5774608a-90fc-0ef7-c7e4-ac471aaa1ba8",
                          "229c8c88-dbbc-f909-ded2-4aba024d7e02",
                        ],
                      },
                      xValue: null,
                      yValue: 100,
                      xUnit: "rem",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-31-n-26",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".link-text.is-2",
                        selectorGuids: [
                          "5774608a-90fc-0ef7-c7e4-ac471aaa1ba8",
                          "b11e67ec-b9ba-2f9a-efe0-6c5ab388506a",
                        ],
                      },
                      xValue: null,
                      yValue: 100,
                      xUnit: "rem",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-31-n-25",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".link-text.is-3",
                        selectorGuids: [
                          "5774608a-90fc-0ef7-c7e4-ac471aaa1ba8",
                          "0f8df602-fffd-9994-0015-81321217f06d",
                        ],
                      },
                      xValue: null,
                      yValue: 100,
                      xUnit: "rem",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-31-n-24",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".link-text.is-4",
                        selectorGuids: [
                          "5774608a-90fc-0ef7-c7e4-ac471aaa1ba8",
                          "f0c9f7c6-45de-7fa4-edb9-1ee7b436a35c",
                        ],
                      },
                      xValue: null,
                      yValue: 100,
                      xUnit: "rem",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-31-n-23",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".link-text.is-5",
                        selectorGuids: [
                          "5774608a-90fc-0ef7-c7e4-ac471aaa1ba8",
                          "ff0fe22b-ec18-0498-dc10-46398deb2ee1",
                        ],
                      },
                      xValue: null,
                      yValue: 100,
                      xUnit: "rem",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-31-n-21",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".button.is-nav",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27158",
                          "5c40a8d6-e310-842a-f44b-8dc20de71e50",
                        ],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-31-n-11",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".nav-menu",
                        selectorGuids: ["df3837b4-70a5-5825-3413-98bd31049847"],
                      },
                      value: "none",
                    },
                  },
                  {
                    id: "a-31-n-8",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".menu-bg",
                        selectorGuids: ["48f02565-7822-9c8f-3841-7dff4df3c275"],
                      },
                      widthValue: 100,
                      heightValue: 0,
                      widthUnit: "%",
                      heightUnit: "%",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-31-n-2",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".menu-icon-close",
                        selectorGuids: ["08579a7a-5f1b-c190-2424-4dc88251775a"],
                      },
                      yValue: 90,
                      xUnit: "DEG",
                      yUnit: "deg",
                      zUnit: "DEG",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-31-n-5",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".menu-icon-close",
                        selectorGuids: ["08579a7a-5f1b-c190-2424-4dc88251775a"],
                      },
                      value: "flex",
                    },
                  },
                  {
                    id: "a-31-n-12",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".nav-menu",
                        selectorGuids: ["df3837b4-70a5-5825-3413-98bd31049847"],
                      },
                      value: "flex",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-31-n-7",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "outExpo",
                      duration: 1e3,
                      target: {
                        selector: ".menu-bg",
                        selectorGuids: ["48f02565-7822-9c8f-3841-7dff4df3c275"],
                      },
                      widthValue: 100,
                      heightValue: 100,
                      widthUnit: "%",
                      heightUnit: "%",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-31-n-6",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".toggle-text",
                        selectorGuids: ["5aace4e1-02e3-1c13-4c50-d379d0dbc5ac"],
                      },
                      yValue: -0.875,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-31-n-3",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "inQuart",
                      duration: 450,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".menu-icon-text",
                        selectorGuids: ["6d7537da-ce04-e719-87fc-dea71d25040a"],
                      },
                      yValue: 90,
                      xUnit: "DEG",
                      yUnit: "deg",
                      zUnit: "DEG",
                    },
                  },
                  {
                    id: "a-31-n-28",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 200,
                      easing: "outExpo",
                      duration: 800,
                      target: {
                        selector: ".link-text.is-1",
                        selectorGuids: [
                          "5774608a-90fc-0ef7-c7e4-ac471aaa1ba8",
                          "229c8c88-dbbc-f909-ded2-4aba024d7e02",
                        ],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-31-n-29",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 300,
                      easing: "outExpo",
                      duration: 800,
                      target: {
                        selector: ".link-text.is-2",
                        selectorGuids: [
                          "5774608a-90fc-0ef7-c7e4-ac471aaa1ba8",
                          "b11e67ec-b9ba-2f9a-efe0-6c5ab388506a",
                        ],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-31-n-30",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 400,
                      easing: "outExpo",
                      duration: 800,
                      target: {
                        selector: ".link-text.is-3",
                        selectorGuids: [
                          "5774608a-90fc-0ef7-c7e4-ac471aaa1ba8",
                          "0f8df602-fffd-9994-0015-81321217f06d",
                        ],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-31-n-4",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 450,
                      easing: "outQuart",
                      duration: 450,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".menu-icon-close",
                        selectorGuids: ["08579a7a-5f1b-c190-2424-4dc88251775a"],
                      },
                      yValue: 0,
                      xUnit: "DEG",
                      yUnit: "deg",
                      zUnit: "DEG",
                    },
                  },
                  {
                    id: "a-31-n-33",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 500,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        selector: ".button.is-nav",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27158",
                          "5c40a8d6-e310-842a-f44b-8dc20de71e50",
                        ],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-31-n-22",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 500,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        selector: ".button.is-nav",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27158",
                          "5c40a8d6-e310-842a-f44b-8dc20de71e50",
                        ],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-31-n-31",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 500,
                      easing: "outExpo",
                      duration: 800,
                      target: {
                        selector: ".link-text.is-4",
                        selectorGuids: [
                          "5774608a-90fc-0ef7-c7e4-ac471aaa1ba8",
                          "f0c9f7c6-45de-7fa4-edb9-1ee7b436a35c",
                        ],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-31-n-32",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 600,
                      easing: "outExpo",
                      duration: 800,
                      target: {
                        selector: ".link-text.is-5",
                        selectorGuids: [
                          "5774608a-90fc-0ef7-c7e4-ac471aaa1ba8",
                          "ff0fe22b-ec18-0498-dc10-46398deb2ee1",
                        ],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18cfa75d5f5,
          },
          "a-40": {
            id: "a-40",
            title: "Menu Close",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-40-n-2",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 500,
                      target: {
                        selector: ".button.is-nav",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27158",
                          "5c40a8d6-e310-842a-f44b-8dc20de71e50",
                        ],
                      },
                      xValue: 0.95,
                      yValue: 0.95,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-40-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inExpo",
                      duration: 500,
                      target: {
                        selector: ".link-text.is-1",
                        selectorGuids: [
                          "5774608a-90fc-0ef7-c7e4-ac471aaa1ba8",
                          "229c8c88-dbbc-f909-ded2-4aba024d7e02",
                        ],
                      },
                      xValue: null,
                      yValue: 100,
                      xUnit: "rem",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-40-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inExpo",
                      duration: 500,
                      target: {
                        selector: ".link-text.is-2",
                        selectorGuids: [
                          "5774608a-90fc-0ef7-c7e4-ac471aaa1ba8",
                          "b11e67ec-b9ba-2f9a-efe0-6c5ab388506a",
                        ],
                      },
                      xValue: null,
                      yValue: 100,
                      xUnit: "rem",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-40-n-5",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inExpo",
                      duration: 500,
                      target: {
                        selector: ".link-text.is-3",
                        selectorGuids: [
                          "5774608a-90fc-0ef7-c7e4-ac471aaa1ba8",
                          "0f8df602-fffd-9994-0015-81321217f06d",
                        ],
                      },
                      xValue: null,
                      yValue: 100,
                      xUnit: "rem",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-40-n-6",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inExpo",
                      duration: 500,
                      target: {
                        selector: ".link-text.is-4",
                        selectorGuids: [
                          "5774608a-90fc-0ef7-c7e4-ac471aaa1ba8",
                          "f0c9f7c6-45de-7fa4-edb9-1ee7b436a35c",
                        ],
                      },
                      xValue: null,
                      yValue: 100,
                      xUnit: "rem",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-40-n-7",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inExpo",
                      duration: 500,
                      target: {
                        selector: ".link-text.is-5",
                        selectorGuids: [
                          "5774608a-90fc-0ef7-c7e4-ac471aaa1ba8",
                          "ff0fe22b-ec18-0498-dc10-46398deb2ee1",
                        ],
                      },
                      xValue: null,
                      yValue: 100,
                      xUnit: "rem",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-40-n-8",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 500,
                      target: {
                        selector: ".button.is-nav",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27158",
                          "5c40a8d6-e310-842a-f44b-8dc20de71e50",
                        ],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-40-n-15",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".toggle-text",
                        selectorGuids: ["5aace4e1-02e3-1c13-4c50-d379d0dbc5ac"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-40-n-17",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "inQuart",
                      duration: 300,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".menu-icon-close",
                        selectorGuids: ["08579a7a-5f1b-c190-2424-4dc88251775a"],
                      },
                      yValue: -90,
                      xUnit: "DEG",
                      yUnit: "deg",
                      zUnit: "DEG",
                    },
                  },
                  {
                    id: "a-40-n-16",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 500,
                      easing: "outQuart",
                      duration: 300,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".menu-icon-text",
                        selectorGuids: ["6d7537da-ce04-e719-87fc-dea71d25040a"],
                      },
                      yValue: 0,
                      xUnit: "DEG",
                      yUnit: "deg",
                      zUnit: "DEG",
                    },
                  },
                  {
                    id: "a-40-n-10",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 500,
                      easing: "inOutExpo",
                      duration: 600,
                      target: {
                        selector: ".menu-bg",
                        selectorGuids: ["48f02565-7822-9c8f-3841-7dff4df3c275"],
                      },
                      widthValue: 100,
                      heightValue: 0,
                      widthUnit: "%",
                      heightUnit: "%",
                      locked: !1,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-40-n-9",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".nav-menu",
                        selectorGuids: ["df3837b4-70a5-5825-3413-98bd31049847"],
                      },
                      value: "none",
                    },
                  },
                  {
                    id: "a-40-n",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".menu-icon-close",
                        selectorGuids: ["08579a7a-5f1b-c190-2424-4dc88251775a"],
                      },
                      value: "none",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18cfa75d5f5,
          },
          "a-43": {
            id: "a-43",
            title: "Fade in from bottom",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-43-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "65af9f0cabbaf2f9644deb4a|4577465b-da05-26d5-2e75-43c9151cbc99",
                      },
                      yValue: 20,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-43-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "65af9f0cabbaf2f9644deb4a|4577465b-da05-26d5-2e75-43c9151cbc99",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-43-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 1e3,
                      target: {
                        useEventTarget: !0,
                        id: "65af9f0cabbaf2f9644deb4a|4577465b-da05-26d5-2e75-43c9151cbc99",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-43-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 1e3,
                      target: {
                        useEventTarget: !0,
                        id: "65af9f0cabbaf2f9644deb4a|4577465b-da05-26d5-2e75-43c9151cbc99",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "px",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18d36fa826d,
          },
          "a-44": {
            id: "a-44",
            title: "Enquiry Card Scroll In",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-44-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".card-bg",
                        selectorGuids: ["6fe78b78-5b92-4db6-78d9-625712b1eae4"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-44-n-6",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".card-bg",
                        selectorGuids: ["6fe78b78-5b92-4db6-78d9-625712b1eae4"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18d36fdb257,
          },
          "a-45": {
            id: "a-45",
            title: "Banner Scroll In",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-45-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".image-cover",
                        selectorGuids: ["cb071269-f320-aca2-f570-c15041145b6a"],
                      },
                      xValue: 1.25,
                      yValue: 1.25,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-45-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {},
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-45-n-2",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".image-cover",
                        selectorGuids: ["cb071269-f320-aca2-f570-c15041145b6a"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-45-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {},
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18d37039852,
          },
          "a-106": {
            id: "a-106",
            title: "Team Card Fade In",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-106-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "65af9f0cabbaf2f9644deb4a|e3762b48-7dec-8118-129f-5bc7a76b3e7a",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-106-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team-member-cell",
                        selectorGuids: ["5789b71f-234e-3a24-4339-fba9798a8902"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-106-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team-member-cell",
                        selectorGuids: ["5789b71f-234e-3a24-4339-fba9798a8902"],
                      },
                      yValue: 20,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-106-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: !0,
                        id: "65af9f0cabbaf2f9644deb4a|e3762b48-7dec-8118-129f-5bc7a76b3e7a",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-106-n-7",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team-member-cell",
                        selectorGuids: ["5789b71f-234e-3a24-4339-fba9798a8902"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-106-n-6",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team-member-cell",
                        selectorGuids: ["5789b71f-234e-3a24-4339-fba9798a8902"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18d36fa826d,
          },
          "a-89": {
            id: "a-89",
            title: "Contact Card 1 Hover",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-89-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "65af9f0cabbaf2f9644debb2|c23aadd1-223d-d6a8-2bcc-62344aa384b3",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-89-n-2",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "65af9f0cabbaf2f9644debb2|c23aadd1-223d-d6a8-2bcc-62344aa384b3",
                      },
                      widthValue: 0,
                      widthUnit: "px",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-89-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 500,
                      target: {
                        useEventTarget: "SIBLINGS",
                        id: "65af9f0cabbaf2f9644debb2|c23aadd1-223d-d6a8-2bcc-62344aa384c0",
                      },
                      value: 0.85,
                      unit: "",
                    },
                  },
                  {
                    id: "a-89-n-4",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "65af9f0cabbaf2f9644debb2|c23aadd1-223d-d6a8-2bcc-62344aa384be",
                      },
                      xValue: 1.05,
                      yValue: 1.05,
                      locked: !0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18d66929421,
          },
          "a-90": {
            id: "a-90",
            title: "Contact Card 1 Hover OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-90-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "65af9f0cabbaf2f9644debb2|c23aadd1-223d-d6a8-2bcc-62344aa384b3",
                      },
                      widthUnit: "AUTO",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-90-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "65af9f0cabbaf2f9644debb2|c23aadd1-223d-d6a8-2bcc-62344aa384b3",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-90-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 500,
                      target: {
                        useEventTarget: "SIBLINGS",
                        id: "65af9f0cabbaf2f9644debb2|c23aadd1-223d-d6a8-2bcc-62344aa384c0",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-90-n-4",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "65af9f0cabbaf2f9644debb2|c23aadd1-223d-d6a8-2bcc-62344aa384be",
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18d66929421,
          },
          "a-87": {
            id: "a-87",
            title: "Contact Card 2 Hover",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-87-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 0,
                      target: {
                        id: "65af9f0cabbaf2f9644debb2|c23aadd1-223d-d6a8-2bcc-62344aa384c6",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-87-n-2",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        id: "65af9f0cabbaf2f9644debb2|c23aadd1-223d-d6a8-2bcc-62344aa384c6",
                      },
                      widthValue: 0,
                      widthUnit: "px",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-87-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644debb2|c23aadd1-223d-d6a8-2bcc-62344aa384ad",
                      },
                      value: 0.85,
                      unit: "",
                    },
                  },
                  {
                    id: "a-87-n-4",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644debb2|c23aadd1-223d-d6a8-2bcc-62344aa384d1",
                      },
                      xValue: 1.05,
                      yValue: 1.05,
                      locked: !0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18d66929421,
          },
          "a-88": {
            id: "a-88",
            title: "Contact Card 2 Hover OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-88-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        id: "65af9f0cabbaf2f9644debb2|c23aadd1-223d-d6a8-2bcc-62344aa384c6",
                      },
                      widthUnit: "AUTO",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-88-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 0,
                      target: {
                        id: "65af9f0cabbaf2f9644debb2|c23aadd1-223d-d6a8-2bcc-62344aa384c6",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-88-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644debb2|c23aadd1-223d-d6a8-2bcc-62344aa384ad",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-88-n-4",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644debb2|c23aadd1-223d-d6a8-2bcc-62344aa384d1",
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18d66929421,
          },
          "a-140": {
            id: "a-140",
            title: "Homepage Scroll v2",
            continuousParameterGroups: [
              {
                id: "a-140-p",
                type: "SCROLL_PROGRESS",
                parameterLabel: "Scroll",
                continuousActionGroups: [
                  {
                    keyframe: 0,
                    actionItems: [
                      {
                        id: "a-140-n",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "65af9f0cabbaf2f9644deb4a|b2cc91f5-e90d-eb2a-5b1a-fe04d92c0734",
                          },
                          xValue: 0,
                          xUnit: "%",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-140-n-2",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "65af9f0cabbaf2f9644deb4a|5724ed6a-d74b-d35c-6362-37aef0090b40",
                          },
                          xValue: 0,
                          xUnit: "%",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-140-n-3",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "65af9f0cabbaf2f9644deb4a|04a38487-0738-4bad-8bd1-c683087e199d",
                          },
                          xValue: 0,
                          xUnit: "%",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-140-n-4",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "65af9f0cabbaf2f9644deb4a|6e3a8d10-eb31-55b6-e19a-17ec9e1c83fd",
                          },
                          xValue: 0,
                          xUnit: "%",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-140-n-5",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "65af9f0cabbaf2f9644deb4a|98af9948-81f7-83e4-c5c0-63177ed3a374",
                          },
                          xValue: 0,
                          xUnit: "%",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-140-n-6",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "65af9f0cabbaf2f9644deb4a|5cc55046-87d2-732e-ed0f-df8e16cb90f0",
                          },
                          xValue: 0,
                          xUnit: "%",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 8,
                    actionItems: [
                      {
                        id: "a-140-n-7",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "65af9f0cabbaf2f9644deb4a|b2cc91f5-e90d-eb2a-5b1a-fe04d92c0734",
                          },
                          xValue: -75,
                          xUnit: "%",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-140-n-8",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "65af9f0cabbaf2f9644deb4a|5724ed6a-d74b-d35c-6362-37aef0090b40",
                          },
                          xValue: -75,
                          xUnit: "%",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-140-n-9",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "65af9f0cabbaf2f9644deb4a|04a38487-0738-4bad-8bd1-c683087e199d",
                          },
                          xValue: 75,
                          xUnit: "%",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-140-n-10",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "65af9f0cabbaf2f9644deb4a|6e3a8d10-eb31-55b6-e19a-17ec9e1c83fd",
                          },
                          xValue: 75,
                          xUnit: "%",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-140-n-11",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "65af9f0cabbaf2f9644deb4a|98af9948-81f7-83e4-c5c0-63177ed3a374",
                          },
                          xValue: -75,
                          xUnit: "%",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-140-n-12",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "65af9f0cabbaf2f9644deb4a|5cc55046-87d2-732e-ed0f-df8e16cb90f0",
                          },
                          xValue: 75,
                          xUnit: "%",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
            createdOn: 0x18d66b99e6a,
          },
          "a-51": {
            id: "a-51",
            title: "Accordion 1 - Content open",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-51-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".accordion_content",
                        selectorGuids: ["106ce7a7-c603-3079-5172-3a6e53fdbe80"],
                      },
                      widthValue: 100,
                      heightValue: 0,
                      widthUnit: "%",
                      heightUnit: "rem",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-51-n-6",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".accordion_arrow-wrapper",
                        selectorGuids: ["106ce7a7-c603-3079-5172-3a6e53fdbe7f"],
                      },
                      zValue: 90,
                      xUnit: "DEG",
                      yUnit: "DEG",
                      zUnit: "deg",
                    },
                  },
                  {
                    id: "a-51-n-2",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".accordion_content",
                        selectorGuids: ["106ce7a7-c603-3079-5172-3a6e53fdbe80"],
                      },
                      value: "none",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-51-n-3",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".accordion_content",
                        selectorGuids: ["106ce7a7-c603-3079-5172-3a6e53fdbe80"],
                      },
                      value: "block",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-51-n-4",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".accordion_content",
                        selectorGuids: ["106ce7a7-c603-3079-5172-3a6e53fdbe80"],
                      },
                      widthValue: 100,
                      widthUnit: "%",
                      heightUnit: "AUTO",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-51-n-5",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".accordion_arrow-wrapper",
                        selectorGuids: ["106ce7a7-c603-3079-5172-3a6e53fdbe7f"],
                      },
                      zValue: 270,
                      xUnit: "DEG",
                      yUnit: "DEG",
                      zUnit: "deg",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x1836a357c2c,
          },
          "a-52": {
            id: "a-52",
            title: "Accordion 1 - Content close",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-52-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".accordion_content",
                        selectorGuids: ["106ce7a7-c603-3079-5172-3a6e53fdbe80"],
                      },
                      widthValue: 100,
                      heightValue: 0,
                      widthUnit: "%",
                      heightUnit: "px",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-52-n-2",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".accordion_arrow-wrapper",
                        selectorGuids: ["106ce7a7-c603-3079-5172-3a6e53fdbe7f"],
                      },
                      zValue: 90,
                      xUnit: "DEG",
                      yUnit: "DEG",
                      zUnit: "deg",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-52-n-3",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".accordion_content",
                        selectorGuids: ["106ce7a7-c603-3079-5172-3a6e53fdbe80"],
                      },
                      value: "none",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x1836a357c2c,
          },
          "a-55": {
            id: "a-55",
            title: "Enquiry Radio Click",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-55-n-3",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 300,
                      target: {
                        useEventTarget: !0,
                        id: "65af9f0cabbaf2f9644debb3|a45d6e76-5ada-d079-5564-8b94664515fc",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-55-n-2",
                    actionTypeId: "STYLE_TEXT_COLOR",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 300,
                      target: {
                        useEventTarget: !0,
                        id: "65af9f0cabbaf2f9644debb3|a45d6e76-5ada-d079-5564-8b94664515fc",
                      },
                      globalSwatchId: "",
                      rValue: 255,
                      bValue: 255,
                      gValue: 255,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-55-n",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 300,
                      target: {
                        useEventTarget: !0,
                        id: "65af9f0cabbaf2f9644debb3|a45d6e76-5ada-d079-5564-8b94664515fc",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-55-n-6",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 300,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".project-radio",
                        selectorGuids: ["cacc7f76-3f49-0834-c778-0b93ac24a0b6"],
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0.5,
                    },
                  },
                  {
                    id: "a-55-n-5",
                    actionTypeId: "STYLE_TEXT_COLOR",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 300,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".project-radio",
                        selectorGuids: ["cacc7f76-3f49-0834-c778-0b93ac24a0b6"],
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-55-n-4",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 300,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".project-radio",
                        selectorGuids: ["cacc7f76-3f49-0834-c778-0b93ac24a0b6"],
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18d6a1e46d2,
          },
          "a-57": {
            id: "a-57",
            title: "New Timed Animation",
            actionItemGroups: [],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18d795c205d,
          },
          "a-58": {
            id: "a-58",
            title: "Case Study Text",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-58-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".project-chapter-number",
                        selectorGuids: ["98572977-ce59-3d07-1ea3-04a0c034d17e"],
                      },
                      xValue: null,
                      yValue: -1,
                      xUnit: "rem",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-58-n-3",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".service-line-light",
                        selectorGuids: ["0f19e56d-f018-3f4c-8ff6-c54221e725ad"],
                      },
                      widthValue: 0,
                      widthUnit: "%",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-58-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".project-chapter-number",
                        selectorGuids: ["98572977-ce59-3d07-1ea3-04a0c034d17e"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-58-n-8",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".project-chapter-number",
                        selectorGuids: ["98572977-ce59-3d07-1ea3-04a0c034d17e"],
                      },
                      xValue: null,
                      yValue: 0,
                      xUnit: "rem",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-58-n-9",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".project-chapter-number",
                        selectorGuids: ["98572977-ce59-3d07-1ea3-04a0c034d17e"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-58-n-10",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 200,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".service-line-light",
                        selectorGuids: ["0f19e56d-f018-3f4c-8ff6-c54221e725ad"],
                      },
                      widthValue: 100,
                      widthUnit: "%",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18d795e6e7a,
          },
          "a-38": {
            id: "a-38",
            title: "Full Image - BG Fade White to Black",
            continuousParameterGroups: [
              {
                id: "a-38-p",
                type: "SCROLL_PROGRESS",
                parameterLabel: "Scroll",
                continuousActionGroups: [
                  {
                    keyframe: 40,
                    actionItems: [
                      {
                        id: "a-38-n-5",
                        actionTypeId: "STYLE_BACKGROUND_COLOR",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "PARENT",
                            selector: ".project-body",
                            selectorGuids: [
                              "644378d1-6309-d530-12fa-f90a98b3a426",
                            ],
                          },
                          globalSwatchId: "",
                          rValue: 249,
                          bValue: 249,
                          gValue: 249,
                          aValue: 1,
                        },
                      },
                      {
                        id: "a-38-n-6",
                        actionTypeId: "STYLE_TEXT_COLOR",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "PARENT",
                            selector: ".project-body",
                            selectorGuids: [
                              "644378d1-6309-d530-12fa-f90a98b3a426",
                            ],
                          },
                          globalSwatchId: "",
                          rValue: 0,
                          bValue: 0,
                          gValue: 0,
                          aValue: 1,
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 50,
                    actionItems: [
                      {
                        id: "a-38-n",
                        actionTypeId: "STYLE_BACKGROUND_COLOR",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "PARENT",
                            selector: ".project-body",
                            selectorGuids: [
                              "644378d1-6309-d530-12fa-f90a98b3a426",
                            ],
                          },
                          globalSwatchId: "",
                          rValue: 0,
                          bValue: 0,
                          gValue: 0,
                          aValue: 1,
                        },
                      },
                      {
                        id: "a-38-n-7",
                        actionTypeId: "STYLE_TEXT_COLOR",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "PARENT",
                            selector: ".project-body",
                            selectorGuids: [
                              "644378d1-6309-d530-12fa-f90a98b3a426",
                            ],
                          },
                          globalSwatchId: "",
                          rValue: 255,
                          bValue: 255,
                          gValue: 255,
                          aValue: 1,
                        },
                      },
                    ],
                  },
                ],
              },
            ],
            createdOn: 0x18c879ed6cf,
          },
          "a-59": {
            id: "a-59",
            title: "Image Grid - BG Fade White to Black",
            continuousParameterGroups: [
              {
                id: "a-59-p",
                type: "SCROLL_PROGRESS",
                parameterLabel: "Scroll",
                continuousActionGroups: [
                  {
                    keyframe: 43,
                    actionItems: [
                      {
                        id: "a-59-n",
                        actionTypeId: "STYLE_BACKGROUND_COLOR",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: !0,
                            id: "65af9f0cabbaf2f9644deba8|13a17f9d-8d34-8ace-8420-0cbd66db0cb3",
                          },
                          globalSwatchId: "",
                          rValue: 249,
                          bValue: 249,
                          gValue: 249,
                          aValue: 1,
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 48,
                    actionItems: [
                      {
                        id: "a-59-n-2",
                        actionTypeId: "STYLE_BACKGROUND_COLOR",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: !0,
                            id: "65af9f0cabbaf2f9644deba8|13a17f9d-8d34-8ace-8420-0cbd66db0cb3",
                          },
                          globalSwatchId: "",
                          rValue: 0,
                          bValue: 0,
                          gValue: 0,
                          aValue: 1,
                        },
                      },
                    ],
                  },
                ],
              },
            ],
            createdOn: 0x18c879ed6cf,
          },
          "a-63": {
            id: "a-63",
            title: "Menu Close Transition",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-63-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 200,
                      target: {
                        selector: ".button.is-nav",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27158",
                          "5c40a8d6-e310-842a-f44b-8dc20de71e50",
                        ],
                      },
                      xValue: 0.8,
                      yValue: 0.8,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-63-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 200,
                      target: { id: "8ca4e543-6362-a1b8-b067-ce2c4fd9e70f" },
                      xValue: null,
                      yValue: 3,
                      xUnit: "rem",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-63-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 200,
                      target: { id: "8ca4e543-6362-a1b8-b067-ce2c4fd9e712" },
                      yValue: 3,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-63-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 200,
                      target: { id: "8ca4e543-6362-a1b8-b067-ce2c4fd9e715" },
                      yValue: 3,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-63-n-5",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 200,
                      target: { id: "8ca4e543-6362-a1b8-b067-ce2c4fd9e718" },
                      yValue: 3,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-63-n-6",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 200,
                      target: { id: "8ca4e543-6362-a1b8-b067-ce2c4fd9e71b" },
                      yValue: 3,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-63-n-7",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 200,
                      target: {
                        selector: ".button.is-nav",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27158",
                          "5c40a8d6-e310-842a-f44b-8dc20de71e50",
                        ],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-63-n-9",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 200,
                      easing: "inOutQuad",
                      duration: 300,
                      target: {
                        selector: ".menu-icon-close",
                        selectorGuids: ["08579a7a-5f1b-c190-2424-4dc88251775a"],
                      },
                      yValue: -90,
                      xUnit: "DEG",
                      yUnit: "deg",
                      zUnit: "DEG",
                    },
                  },
                  {
                    id: "a-63-n-10",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 200,
                      easing: "inOutQuad",
                      duration: 300,
                      target: {
                        selector: ".menu-icon-text",
                        selectorGuids: ["6d7537da-ce04-e719-87fc-dea71d25040a"],
                      },
                      yValue: 0,
                      xUnit: "DEG",
                      yUnit: "deg",
                      zUnit: "DEG",
                    },
                  },
                  {
                    id: "a-63-n-11",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 200,
                      easing: "inOutQuad",
                      duration: 300,
                      target: {
                        selector: ".menu-bg",
                        selectorGuids: ["48f02565-7822-9c8f-3841-7dff4df3c275"],
                      },
                      widthValue: 100,
                      heightValue: 0,
                      widthUnit: "%",
                      heightUnit: "%",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-63-n-8",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 200,
                      easing: "inOutQuad",
                      duration: 300,
                      target: {
                        selector: ".toggle-text",
                        selectorGuids: ["5aace4e1-02e3-1c13-4c50-d379d0dbc5ac"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-63-n-12",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".nav-menu",
                        selectorGuids: ["df3837b4-70a5-5825-3413-98bd31049847"],
                      },
                      value: "none",
                    },
                  },
                  {
                    id: "a-63-n-13",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".menu-icon-close",
                        selectorGuids: ["08579a7a-5f1b-c190-2424-4dc88251775a"],
                      },
                      value: "none",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18cfa75d5f5,
          },
          "a-67": {
            id: "a-67",
            title: "Close Video",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-67-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 300,
                      target: {
                        selector: ".section_video",
                        selectorGuids: ["5ccecda1-0e76-d909-89af-fda8812193d6"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-67-n",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".section_video",
                        selectorGuids: ["5ccecda1-0e76-d909-89af-fda8812193d6"],
                      },
                      value: "none",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18da75d427a,
          },
          "a-56": {
            id: "a-56",
            title: "Case Study Load In",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-56-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".card-bg",
                        selectorGuids: ["6fe78b78-5b92-4db6-78d9-625712b1eae4"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-56-n-13",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".project-wrapper",
                        selectorGuids: ["0775409c-3c37-8599-fc1c-754a0ebf19ae"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-56-n-10",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".eyebrow",
                        selectorGuids: ["d87e9f4a-ffb9-3918-a7e1-832b79a5b05e"],
                      },
                      widthValue: 0,
                      widthUnit: "%",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-56-n-9",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".eyebrow",
                        selectorGuids: ["d87e9f4a-ffb9-3918-a7e1-832b79a5b05e"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-56-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        selector: ".card-bg",
                        selectorGuids: ["6fe78b78-5b92-4db6-78d9-625712b1eae4"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-56-n-12",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        selector: ".eyebrow",
                        selectorGuids: ["d87e9f4a-ffb9-3918-a7e1-832b79a5b05e"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-56-n-11",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        selector: ".eyebrow",
                        selectorGuids: ["d87e9f4a-ffb9-3918-a7e1-832b79a5b05e"],
                      },
                      widthValue: 100,
                      widthUnit: "%",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-56-n-14",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        selector: ".project-wrapper",
                        selectorGuids: ["0775409c-3c37-8599-fc1c-754a0ebf19ae"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18d795a5e5d,
          },
          "a-70": {
            id: "a-70",
            title: "Work Project Hover",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-70-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".text-card-bg",
                        selectorGuids: ["47cfbda4-5722-33cd-fd31-c0d0679e882c"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-70-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".card-bg",
                        selectorGuids: ["6fe78b78-5b92-4db6-78d9-625712b1eae4"],
                      },
                      xValue: 1.05,
                      yValue: 1.05,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-70-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".text-card-bg",
                        selectorGuids: ["47cfbda4-5722-33cd-fd31-c0d0679e882c"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-70-n-5",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".project-text-card",
                        selectorGuids: ["2448d395-9427-7b00-5f89-5d407879102c"],
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18dc6ce3de3,
          },
          "a-82": {
            id: "a-82",
            title: "Work Project Hover OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-82-n-2",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".card-bg",
                        selectorGuids: ["6fe78b78-5b92-4db6-78d9-625712b1eae4"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-82-n-3",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".project-text-card",
                        selectorGuids: ["2448d395-9427-7b00-5f89-5d407879102c"],
                      },
                      globalSwatchId: "",
                      rValue: 192,
                      bValue: 192,
                      gValue: 192,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-82-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".text-card-bg",
                        selectorGuids: ["47cfbda4-5722-33cd-fd31-c0d0679e882c"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18dc6ce3de3,
          },
          "a-80": {
            id: "a-80",
            title: "Logo Animation",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-80-n",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".logo-desktop",
                        selectorGuids: ["79bb640e-e4cf-3e70-a2c4-6cc982871b23"],
                      },
                      value: 0,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-80-n-2",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".logo-desktop",
                        selectorGuids: ["79bb640e-e4cf-3e70-a2c4-6cc982871b23"],
                      },
                      value: 100,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18dcc7ddf75,
          },
          "a-81": {
            id: "a-81",
            title: "Logo Animation Reverse",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-81-n-2",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".logo-desktop",
                        selectorGuids: ["79bb640e-e4cf-3e70-a2c4-6cc982871b23"],
                      },
                      value: 0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18dcc7ddf75,
          },
          "a-84": {
            id: "a-84",
            title: "Nav Logo Appear",
            continuousParameterGroups: [
              {
                id: "a-84-p",
                type: "SCROLL_PROGRESS",
                parameterLabel: "Scroll",
                continuousActionGroups: [
                  {
                    keyframe: 5,
                    actionItems: [
                      {
                        id: "a-84-n",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "cba46a16-c890-d02f-9c9c-390f67f3cb59",
                          },
                          widthValue: 0,
                          widthUnit: "rem",
                          heightUnit: "PX",
                          locked: !1,
                        },
                      },
                      {
                        id: "a-84-n-3",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "65af9f0cabbaf2f9644deb4a|64d6b572-7c43-936d-785b-b92d636aa670",
                          },
                          widthValue: 0,
                          widthUnit: "rem",
                          heightUnit: "PX",
                          locked: !1,
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 10,
                    actionItems: [
                      {
                        id: "a-84-n-2",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "cba46a16-c890-d02f-9c9c-390f67f3cb59",
                          },
                          widthValue: 3.75,
                          widthUnit: "rem",
                          heightUnit: "PX",
                          locked: !1,
                        },
                      },
                      {
                        id: "a-84-n-4",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "65af9f0cabbaf2f9644deb4a|64d6b572-7c43-936d-785b-b92d636aa670",
                          },
                          widthValue: 3.75,
                          widthUnit: "rem",
                          heightUnit: "PX",
                          locked: !1,
                        },
                      },
                    ],
                  },
                ],
              },
            ],
            createdOn: 0x18dd70d6c85,
          },
          "a-93": {
            id: "a-93",
            title: "Logo Animation 2",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-93-n",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".logo-desktop",
                        selectorGuids: ["79bb640e-e4cf-3e70-a2c4-6cc982871b23"],
                      },
                      value: 0,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-93-n-2",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".logo-desktop",
                        selectorGuids: ["79bb640e-e4cf-3e70-a2c4-6cc982871b23"],
                      },
                      value: 100,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18dcc7ddf75,
          },
          "a-94": {
            id: "a-94",
            title: "Logo Animation Reverse 2",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-94-n",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 1e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".logo-desktop",
                        selectorGuids: ["79bb640e-e4cf-3e70-a2c4-6cc982871b23"],
                      },
                      value: 0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18dcc7ddf75,
          },
          "a-95": {
            id: "a-95",
            title: "Menu Close Transition 2",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-95-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 200,
                      target: {
                        selector: ".button.is-nav",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27158",
                          "5c40a8d6-e310-842a-f44b-8dc20de71e50",
                        ],
                      },
                      xValue: 0.8,
                      yValue: 0.8,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-95-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 200,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|64d6b572-7c43-936d-785b-b92d636aa673",
                      },
                      xValue: null,
                      yValue: 3,
                      xUnit: "rem",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-95-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 200,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|64d6b572-7c43-936d-785b-b92d636aa676",
                      },
                      yValue: 3,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-95-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 200,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|64d6b572-7c43-936d-785b-b92d636aa679",
                      },
                      yValue: 3,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-95-n-5",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 200,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|64d6b572-7c43-936d-785b-b92d636aa67c",
                      },
                      yValue: 3,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-95-n-6",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 200,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|64d6b572-7c43-936d-785b-b92d636aa67f",
                      },
                      yValue: 3,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-95-n-7",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 200,
                      target: {
                        selector: ".button.is-nav",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27158",
                          "5c40a8d6-e310-842a-f44b-8dc20de71e50",
                        ],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-95-n-8",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 200,
                      easing: "inOutQuad",
                      duration: 300,
                      target: {
                        selector: ".menu-icon-close",
                        selectorGuids: ["08579a7a-5f1b-c190-2424-4dc88251775a"],
                      },
                      yValue: -90,
                      xUnit: "DEG",
                      yUnit: "deg",
                      zUnit: "DEG",
                    },
                  },
                  {
                    id: "a-95-n-9",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 200,
                      easing: "inOutQuad",
                      duration: 300,
                      target: {
                        selector: ".menu-icon-text",
                        selectorGuids: ["6d7537da-ce04-e719-87fc-dea71d25040a"],
                      },
                      yValue: 0,
                      xUnit: "DEG",
                      yUnit: "deg",
                      zUnit: "DEG",
                    },
                  },
                  {
                    id: "a-95-n-10",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 200,
                      easing: "inOutQuad",
                      duration: 300,
                      target: {
                        selector: ".menu-bg",
                        selectorGuids: ["48f02565-7822-9c8f-3841-7dff4df3c275"],
                      },
                      widthValue: 100,
                      heightValue: 0,
                      widthUnit: "%",
                      heightUnit: "%",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-95-n-11",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 200,
                      easing: "inOutQuad",
                      duration: 300,
                      target: {
                        selector: ".toggle-text",
                        selectorGuids: ["5aace4e1-02e3-1c13-4c50-d379d0dbc5ac"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-95-n-12",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".nav-menu",
                        selectorGuids: ["df3837b4-70a5-5825-3413-98bd31049847"],
                      },
                      value: "none",
                    },
                  },
                  {
                    id: "a-95-n-13",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".menu-icon-close",
                        selectorGuids: ["08579a7a-5f1b-c190-2424-4dc88251775a"],
                      },
                      value: "none",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18cfa75d5f5,
          },
          "a-96": {
            id: "a-96",
            title: "Challenge Scroll",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-96-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".challenge-number",
                        selectorGuids: ["b377a28b-307c-21b4-05f2-ef2af0c1ef81"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-96-n-14",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".challenge-image",
                        selectorGuids: ["77cdeaf9-5bcc-18c9-fb26-e0bd21961db5"],
                      },
                      xValue: 0.6,
                      yValue: 0.6,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-96-n-13",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".challenge-image",
                        selectorGuids: ["77cdeaf9-5bcc-18c9-fb26-e0bd21961db5"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-96-n-8",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".challenge-heading",
                        selectorGuids: ["fa9443f0-f75d-4f75-44fa-5cdcc3b32569"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-96-n-7",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".challenge-text",
                        selectorGuids: ["b7bba360-aff2-17da-00a7-583daa725c1a"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-96-n-6",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".challenge-text",
                        selectorGuids: ["b7bba360-aff2-17da-00a7-583daa725c1a"],
                      },
                      yValue: 2,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-96-n-5",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".challenge-heading",
                        selectorGuids: ["fa9443f0-f75d-4f75-44fa-5cdcc3b32569"],
                      },
                      yValue: 2,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-96-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".challenge-number",
                        selectorGuids: ["b377a28b-307c-21b4-05f2-ef2af0c1ef81"],
                      },
                      xValue: -1,
                      xUnit: "rem",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-96-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".challenge-number",
                        selectorGuids: ["b377a28b-307c-21b4-05f2-ef2af0c1ef81"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-96-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".challenge-number",
                        selectorGuids: ["b377a28b-307c-21b4-05f2-ef2af0c1ef81"],
                      },
                      xValue: 0,
                      xUnit: "rem",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-96-n-10",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 200,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".challenge-heading",
                        selectorGuids: ["fa9443f0-f75d-4f75-44fa-5cdcc3b32569"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-96-n-9",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 200,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".challenge-heading",
                        selectorGuids: ["fa9443f0-f75d-4f75-44fa-5cdcc3b32569"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-96-n-12",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 400,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".challenge-text",
                        selectorGuids: ["b7bba360-aff2-17da-00a7-583daa725c1a"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-96-n-11",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 400,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".challenge-text",
                        selectorGuids: ["b7bba360-aff2-17da-00a7-583daa725c1a"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-96-n-16",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 600,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".challenge-image",
                        selectorGuids: ["77cdeaf9-5bcc-18c9-fb26-e0bd21961db5"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-96-n-15",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 600,
                      easing: "inOutQuart",
                      duration: 800,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".challenge-image",
                        selectorGuids: ["77cdeaf9-5bcc-18c9-fb26-e0bd21961db5"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18e189f3b30,
          },
          "a-97": {
            id: "a-97",
            title: "Mouse Follow",
            continuousParameterGroups: [
              {
                id: "a-97-p",
                type: "MOUSE_X",
                parameterLabel: "Mouse X",
                continuousActionGroups: [
                  {
                    keyframe: 0,
                    actionItems: [
                      {
                        id: "a-97-n",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "271e3553-6e43-0ec6-a5df-d68396e3a4fb",
                          },
                          xValue: -50,
                          xUnit: "vw",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-97-n-5",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "271e3553-6e43-0ec6-a5df-d68396e3a4f8",
                          },
                          xValue: -50,
                          xUnit: "vw",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 100,
                    actionItems: [
                      {
                        id: "a-97-n-2",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "271e3553-6e43-0ec6-a5df-d68396e3a4fb",
                          },
                          xValue: 50,
                          xUnit: "vw",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-97-n-6",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "271e3553-6e43-0ec6-a5df-d68396e3a4f8",
                          },
                          xValue: 50,
                          xUnit: "vw",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: "a-97-p-2",
                type: "MOUSE_Y",
                parameterLabel: "Mouse Y",
                continuousActionGroups: [
                  {
                    keyframe: 0,
                    actionItems: [
                      {
                        id: "a-97-n-3",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "271e3553-6e43-0ec6-a5df-d68396e3a4fb",
                          },
                          yValue: -50,
                          xUnit: "PX",
                          yUnit: "vh",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-97-n-7",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "271e3553-6e43-0ec6-a5df-d68396e3a4f8",
                          },
                          yValue: -50,
                          xUnit: "PX",
                          yUnit: "vh",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 100,
                    actionItems: [
                      {
                        id: "a-97-n-4",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "271e3553-6e43-0ec6-a5df-d68396e3a4fb",
                          },
                          yValue: 50,
                          xUnit: "PX",
                          yUnit: "vh",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-97-n-8",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "271e3553-6e43-0ec6-a5df-d68396e3a4f8",
                          },
                          yValue: 50,
                          xUnit: "PX",
                          yUnit: "vh",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
            createdOn: 0x18e24230390,
          },
          "a-98": {
            id: "a-98",
            title: "Mouse Follow Next",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-98-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".custom-cursor-next",
                        selectorGuids: ["233f9e00-0725-2fab-d9f5-f7657dcd9e2b"],
                      },
                      xValue: 0,
                      yValue: 0,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-98-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".custom-cursor-next",
                        selectorGuids: ["233f9e00-0725-2fab-d9f5-f7657dcd9e2b"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-98-n-2",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 500,
                      target: {
                        selector: ".custom-cursor-next",
                        selectorGuids: ["233f9e00-0725-2fab-d9f5-f7657dcd9e2b"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-98-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 500,
                      target: {
                        selector: ".custom-cursor-next",
                        selectorGuids: ["233f9e00-0725-2fab-d9f5-f7657dcd9e2b"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18e2424c602,
          },
          "a-99": {
            id: "a-99",
            title: "Mouse Follow Next OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-99-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 200,
                      target: {
                        selector: ".custom-cursor-next",
                        selectorGuids: ["233f9e00-0725-2fab-d9f5-f7657dcd9e2b"],
                      },
                      xValue: 0,
                      yValue: 0,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-99-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 200,
                      target: {
                        selector: ".custom-cursor-next",
                        selectorGuids: ["233f9e00-0725-2fab-d9f5-f7657dcd9e2b"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18e2424c602,
          },
          "a-100": {
            id: "a-100",
            title: "Mouse Follow Prev",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-100-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".custom-cursor-prev",
                        selectorGuids: ["3733c234-3e60-3031-290e-e78fef44a6cb"],
                      },
                      xValue: 0,
                      yValue: 0,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-100-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".custom-cursor-prev",
                        selectorGuids: ["3733c234-3e60-3031-290e-e78fef44a6cb"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-100-n-2",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 500,
                      target: {
                        selector: ".custom-cursor-prev",
                        selectorGuids: ["3733c234-3e60-3031-290e-e78fef44a6cb"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-100-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 500,
                      target: {
                        selector: ".custom-cursor-prev",
                        selectorGuids: ["3733c234-3e60-3031-290e-e78fef44a6cb"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18e2424c602,
          },
          "a-101": {
            id: "a-101",
            title: "Mouse Follow Prev OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-101-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 200,
                      target: {
                        selector: ".custom-cursor-prev",
                        selectorGuids: ["3733c234-3e60-3031-290e-e78fef44a6cb"],
                      },
                      xValue: 0,
                      yValue: 0,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-101-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 200,
                      target: {
                        selector: ".custom-cursor-prev",
                        selectorGuids: ["3733c234-3e60-3031-290e-e78fef44a6cb"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18e2424c602,
          },
          "a-102": {
            id: "a-102",
            title: "Cursor Click",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-102-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inQuad",
                      duration: 200,
                      target: {
                        selector: ".custom-cursor-next",
                        selectorGuids: ["233f9e00-0725-2fab-d9f5-f7657dcd9e2b"],
                      },
                      xValue: 0.9,
                      yValue: 0.9,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-102-n-3",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inQuad",
                      duration: 200,
                      target: {
                        selector: ".custom-cursor-prev",
                        selectorGuids: ["3733c234-3e60-3031-290e-e78fef44a6cb"],
                      },
                      xValue: 0.9,
                      yValue: 0.9,
                      locked: !0,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-102-n-2",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "outQuad",
                      duration: 200,
                      target: {
                        selector: ".custom-cursor-next",
                        selectorGuids: ["233f9e00-0725-2fab-d9f5-f7657dcd9e2b"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-102-n-4",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "outQuad",
                      duration: 200,
                      target: {
                        selector: ".custom-cursor-prev",
                        selectorGuids: ["3733c234-3e60-3031-290e-e78fef44a6cb"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18e243dd930,
          },
          "a-77": {
            id: "a-77",
            title: "Challenge-scroll",
            continuousParameterGroups: [
              {
                id: "a-77-p",
                type: "SCROLL_PROGRESS",
                parameterLabel: "Scroll",
                continuousActionGroups: [
                  {
                    keyframe: 10,
                    actionItems: [
                      {
                        id: "a-77-n-22",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            id: "65af9f0cabbaf2f9644deb4a|256a265e-5dba-532c-9aee-14479b328fc9",
                          },
                          value: 0.1,
                          unit: "",
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 15,
                    actionItems: [
                      {
                        id: "a-77-n-23",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".sticky-tracker",
                            selectorGuids: [
                              "fd8b75f9-f8cd-9b90-0339-79c6451fd119",
                            ],
                          },
                          value: 0,
                          unit: "",
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 33,
                    actionItems: [
                      {
                        id: "a-77-n-3",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            id: "65af9f0cabbaf2f9644deb4a|256a265e-5dba-532c-9aee-14479b328fd4",
                          },
                          value: 0,
                          unit: "",
                        },
                      },
                      {
                        id: "a-77-n",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            id: "65af9f0cabbaf2f9644deb4a|256a265e-5dba-532c-9aee-14479b328fc9",
                          },
                          value: 1,
                          unit: "",
                        },
                      },
                      {
                        id: "a-77-n-24",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".sticky-tracker",
                            selectorGuids: [
                              "fd8b75f9-f8cd-9b90-0339-79c6451fd119",
                            ],
                          },
                          value: 1,
                          unit: "",
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 50,
                    actionItems: [
                      {
                        id: "a-77-n-2",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            id: "65af9f0cabbaf2f9644deb4a|256a265e-5dba-532c-9aee-14479b328fc9",
                          },
                          value: 0,
                          unit: "",
                        },
                      },
                      {
                        id: "a-77-n-4",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            id: "65af9f0cabbaf2f9644deb4a|256a265e-5dba-532c-9aee-14479b328fd4",
                          },
                          value: 1,
                          unit: "",
                        },
                      },
                      {
                        id: "a-77-n-5",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            id: "65af9f0cabbaf2f9644deb4a|256a265e-5dba-532c-9aee-14479b328fdf",
                          },
                          value: 0,
                          unit: "",
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 65,
                    actionItems: [
                      {
                        id: "a-77-n-6",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            id: "65af9f0cabbaf2f9644deb4a|256a265e-5dba-532c-9aee-14479b328fdf",
                          },
                          value: 1,
                          unit: "",
                        },
                      },
                      {
                        id: "a-77-n-7",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            id: "65af9f0cabbaf2f9644deb4a|256a265e-5dba-532c-9aee-14479b328fd4",
                          },
                          value: 0,
                          unit: "",
                        },
                      },
                      {
                        id: "a-77-n-9",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            id: "65af9f0cabbaf2f9644deb4a|256a265e-5dba-532c-9aee-14479b328fea",
                          },
                          value: 0,
                          unit: "",
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 83,
                    actionItems: [
                      {
                        id: "a-77-n-8",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            id: "65af9f0cabbaf2f9644deb4a|256a265e-5dba-532c-9aee-14479b328fdf",
                          },
                          value: 0,
                          unit: "",
                        },
                      },
                      {
                        id: "a-77-n-10",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            id: "65af9f0cabbaf2f9644deb4a|256a265e-5dba-532c-9aee-14479b328fea",
                          },
                          value: 1,
                          unit: "",
                        },
                      },
                      {
                        id: "a-77-n-25",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".sticky-tracker",
                            selectorGuids: [
                              "fd8b75f9-f8cd-9b90-0339-79c6451fd119",
                            ],
                          },
                          value: 1,
                          unit: "",
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 100,
                    actionItems: [
                      {
                        id: "a-77-n-26",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".sticky-tracker",
                            selectorGuids: [
                              "fd8b75f9-f8cd-9b90-0339-79c6451fd119",
                            ],
                          },
                          value: 0,
                          unit: "",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
            createdOn: 0x18dcc5ececd,
          },
          "a-103": {
            id: "a-103",
            title: "Hero Load",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-103-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".heading-hero",
                        selectorGuids: ["30ae41ac-a263-bf00-f8de-87dcbf522d46"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-103-n-12",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644debb1|984bc779-2143-58bf-d8d7-891a4c332665",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-103-n-11",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644debb1|984bc779-2143-58bf-d8d7-891a4c332665",
                      },
                      yValue: 10,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-103-n-9",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".eyebrow",
                        selectorGuids: ["d87e9f4a-ffb9-3918-a7e1-832b79a5b05e"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-103-n-8",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".eyebrow",
                        selectorGuids: ["d87e9f4a-ffb9-3918-a7e1-832b79a5b05e"],
                      },
                      widthValue: 0,
                      widthUnit: "%",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-103-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".insights-heading",
                        selectorGuids: ["ad7fa399-974f-0c66-21c8-1c4e10f46d16"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-103-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".intro-text",
                        selectorGuids: ["19de8ecc-25bb-2689-86ff-ba6c19775155"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-103-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".heading-hero",
                        selectorGuids: ["30ae41ac-a263-bf00-f8de-87dcbf522d46"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-103-n-14",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 1e3,
                      target: {
                        id: "65af9f0cabbaf2f9644debb1|984bc779-2143-58bf-d8d7-891a4c332665",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-103-n-13",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 1e3,
                      target: {
                        id: "65af9f0cabbaf2f9644debb1|984bc779-2143-58bf-d8d7-891a4c332665",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-103-n-7",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 1e3,
                      target: {
                        selector: ".eyebrow",
                        selectorGuids: ["d87e9f4a-ffb9-3918-a7e1-832b79a5b05e"],
                      },
                      widthValue: 100,
                      widthUnit: "%",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-103-n-6",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 1e3,
                      target: {
                        selector: ".insights-heading",
                        selectorGuids: ["ad7fa399-974f-0c66-21c8-1c4e10f46d16"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-103-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 1e3,
                      target: {
                        selector: ".intro-text",
                        selectorGuids: ["19de8ecc-25bb-2689-86ff-ba6c19775155"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-103-n-10",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 250,
                      easing: "inOutQuad",
                      duration: 750,
                      target: {
                        selector: ".eyebrow",
                        selectorGuids: ["d87e9f4a-ffb9-3918-a7e1-832b79a5b05e"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18e2e64dab6,
          },
          "a-105": {
            id: "a-105",
            title: "Article Load In",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-105-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644deb64|2df05d04-121e-8b22-d4d8-44148ffe4993",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-105-n-23",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".insights-banner",
                        selectorGuids: ["f618dae3-3b87-dd5e-7228-547d9ca7e223"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-105-n-22",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".insights-banner",
                        selectorGuids: ["f618dae3-3b87-dd5e-7228-547d9ca7e223"],
                      },
                      yValue: 10,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-105-n-20",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".grid-hairline",
                        selectorGuids: ["be63e187-0955-6e31-8832-281f3fe1849f"],
                      },
                      widthValue: 0,
                      heightValue: 1,
                      widthUnit: "%",
                      heightUnit: "px",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-105-n-10",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".insights-read",
                        selectorGuids: ["1a64b9fe-ef34-067c-5249-6bfbb3ddbf29"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-105-n-9",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".insights-read",
                        selectorGuids: ["1a64b9fe-ef34-067c-5249-6bfbb3ddbf29"],
                      },
                      yValue: -50,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-105-n-8",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".insights-date",
                        selectorGuids: ["c4205d4b-3f88-c819-34c3-f45b1eeb85d2"],
                      },
                      yValue: -50,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-105-n-7",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".insights-date",
                        selectorGuids: ["c4205d4b-3f88-c819-34c3-f45b1eeb85d2"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-105-n-6",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".insights-author",
                        selectorGuids: ["cb76b7c2-5fac-6850-fac0-00368c4bfedf"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-105-n-5",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".insights-author",
                        selectorGuids: ["cb76b7c2-5fac-6850-fac0-00368c4bfedf"],
                      },
                      yValue: -50,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-105-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".insights-tag",
                        selectorGuids: ["90b8af1f-0c7d-53e8-d4cf-30987da7eb70"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-105-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".insights-tag",
                        selectorGuids: ["90b8af1f-0c7d-53e8-d4cf-30987da7eb70"],
                      },
                      yValue: -50,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-105-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 100,
                      target: {
                        id: "65af9f0cabbaf2f9644deb64|2df05d04-121e-8b22-d4d8-44148ffe4993",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-105-n-19",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 1e3,
                      target: {
                        selector: ".insights-tag",
                        selectorGuids: ["90b8af1f-0c7d-53e8-d4cf-30987da7eb70"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-105-n-18",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 1e3,
                      target: {
                        selector: ".insights-tag",
                        selectorGuids: ["90b8af1f-0c7d-53e8-d4cf-30987da7eb70"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-105-n-21",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 1500,
                      target: {
                        selector: ".grid-hairline",
                        selectorGuids: ["be63e187-0955-6e31-8832-281f3fe1849f"],
                      },
                      widthValue: 100,
                      heightValue: 1,
                      widthUnit: "%",
                      heightUnit: "px",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-105-n-17",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 250,
                      easing: "inOutQuad",
                      duration: 1e3,
                      target: {
                        selector: ".insights-author",
                        selectorGuids: ["cb76b7c2-5fac-6850-fac0-00368c4bfedf"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-105-n-16",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 250,
                      easing: "inOutQuad",
                      duration: 1e3,
                      target: {
                        selector: ".insights-author",
                        selectorGuids: ["cb76b7c2-5fac-6850-fac0-00368c4bfedf"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-105-n-14",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 500,
                      easing: "inOutQuad",
                      duration: 1e3,
                      target: {
                        selector: ".insights-date",
                        selectorGuids: ["c4205d4b-3f88-c819-34c3-f45b1eeb85d2"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-105-n-25",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 500,
                      easing: "inOutQuad",
                      duration: 1e3,
                      target: {
                        selector: ".insights-banner",
                        selectorGuids: ["f618dae3-3b87-dd5e-7228-547d9ca7e223"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-105-n-24",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 500,
                      easing: "inOutQuad",
                      duration: 1e3,
                      target: {
                        selector: ".insights-banner",
                        selectorGuids: ["f618dae3-3b87-dd5e-7228-547d9ca7e223"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-105-n-13",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 500,
                      easing: "inOutQuad",
                      duration: 1e3,
                      target: {
                        selector: ".insights-date",
                        selectorGuids: ["c4205d4b-3f88-c819-34c3-f45b1eeb85d2"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-105-n-12",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 750,
                      easing: "inOutQuad",
                      duration: 1e3,
                      target: {
                        selector: ".insights-read",
                        selectorGuids: ["1a64b9fe-ef34-067c-5249-6bfbb3ddbf29"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-105-n-11",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 750,
                      easing: "inOutQuad",
                      duration: 1e3,
                      target: {
                        selector: ".insights-read",
                        selectorGuids: ["1a64b9fe-ef34-067c-5249-6bfbb3ddbf29"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18e5b77b353,
          },
          "a-108": {
            id: "a-108",
            title: "Hero Images move",
            continuousParameterGroups: [
              {
                id: "a-108-p",
                type: "MOUSE_X",
                parameterLabel: "Mouse X",
                continuousActionGroups: [
                  {
                    keyframe: 0,
                    actionItems: [
                      {
                        id: "a-108-n",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e608711",
                          },
                          xValue: -0.5,
                          xUnit: "rem",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-108-n-5",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e60870f",
                          },
                          xValue: -0.75,
                          xUnit: "rem",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-108-n-9",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "65af9f0cabbaf2f9644deb4a|06e4c0f5-ac5c-3bb5-b3af-9de2e4a0d400",
                          },
                          xValue: -0.6,
                          xUnit: "rem",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 100,
                    actionItems: [
                      {
                        id: "a-108-n-2",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e608711",
                          },
                          xValue: 0.5,
                          xUnit: "rem",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-108-n-6",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e60870f",
                          },
                          xValue: 0.75,
                          xUnit: "rem",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-108-n-10",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "65af9f0cabbaf2f9644deb4a|06e4c0f5-ac5c-3bb5-b3af-9de2e4a0d400",
                          },
                          xValue: 0.6,
                          xUnit: "rem",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: "a-108-p-2",
                type: "MOUSE_Y",
                parameterLabel: "Mouse Y",
                continuousActionGroups: [
                  {
                    keyframe: 0,
                    actionItems: [
                      {
                        id: "a-108-n-3",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e608711",
                          },
                          yValue: -0.5,
                          xUnit: "PX",
                          yUnit: "rem",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-108-n-7",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e60870f",
                          },
                          yValue: -0.75,
                          xUnit: "PX",
                          yUnit: "rem",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-108-n-11",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "65af9f0cabbaf2f9644deb4a|06e4c0f5-ac5c-3bb5-b3af-9de2e4a0d400",
                          },
                          yValue: -0.6,
                          xUnit: "PX",
                          yUnit: "rem",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 100,
                    actionItems: [
                      {
                        id: "a-108-n-4",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e608711",
                          },
                          yValue: 0.5,
                          xUnit: "PX",
                          yUnit: "rem",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-108-n-8",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e60870f",
                          },
                          yValue: 0.75,
                          xUnit: "PX",
                          yUnit: "rem",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-108-n-12",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "65af9f0cabbaf2f9644deb4a|06e4c0f5-ac5c-3bb5-b3af-9de2e4a0d400",
                          },
                          yValue: 0.8,
                          xUnit: "PX",
                          yUnit: "rem",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
            createdOn: 0x18f05ba1f3f,
          },
          "a-111": {
            id: "a-111",
            title: "Background Card BG Parallax",
            continuousParameterGroups: [
              {
                id: "a-111-p",
                type: "SCROLL_PROGRESS",
                parameterLabel: "Scroll",
                continuousActionGroups: [
                  {
                    keyframe: 0,
                    actionItems: [
                      {
                        id: "a-111-n",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: !0,
                            id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e608722",
                          },
                          yValue: -9,
                          xUnit: "PX",
                          yUnit: "%",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 100,
                    actionItems: [
                      {
                        id: "a-111-n-2",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: !0,
                            id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e608722",
                          },
                          yValue: 0,
                          xUnit: "PX",
                          yUnit: "%",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
            createdOn: 0x18f05cd347e,
          },
          "a-112": {
            id: "a-112",
            title: "Enquiry Card – Hover IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-112-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".enquiry-card__overlay",
                        selectorGuids: ["c116ddbd-443f-884b-4217-e08ca8f50eca"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-112-n-11",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".enquiry-card__overlay",
                        selectorGuids: ["c116ddbd-443f-884b-4217-e08ca8f50eca"],
                      },
                      globalSwatchId: "--tint",
                      rValue: 240,
                      bValue: 230,
                      gValue: 237,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-112-n-9",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-text",
                        selectorGuids: ["7bfd1580-d478-10e6-eb15-44aa3aa728b4"],
                      },
                      value: "none",
                    },
                  },
                  {
                    id: "a-112-n-5",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button.is-icon.is-card",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27158",
                          "07815991-952a-8d98-0e00-e4c25af27171",
                          "22062d45-77a3-203b-c78b-2de46461a8da",
                        ],
                      },
                      widthValue: 3.75,
                      heightValue: 3.75,
                      widthUnit: "rem",
                      heightUnit: "rem",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-112-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-text",
                        selectorGuids: ["7bfd1580-d478-10e6-eb15-44aa3aa728b4"],
                      },
                      yValue: 50,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-112-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-text",
                        selectorGuids: ["7bfd1580-d478-10e6-eb15-44aa3aa728b4"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-112-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".enquiry-card__overlay",
                        selectorGuids: ["c116ddbd-443f-884b-4217-e08ca8f50eca"],
                      },
                      value: 0.5,
                      unit: "",
                    },
                  },
                  {
                    id: "a-112-n-6",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button.is-icon.is-card",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27158",
                          "07815991-952a-8d98-0e00-e4c25af27171",
                          "22062d45-77a3-203b-c78b-2de46461a8da",
                        ],
                      },
                      widthValue: 15,
                      heightValue: 3.75,
                      widthUnit: "rem",
                      heightUnit: "rem",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-112-n-12",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".enquiry-card__overlay",
                        selectorGuids: ["c116ddbd-443f-884b-4217-e08ca8f50eca"],
                      },
                      globalSwatchId: "--black",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-112-n-10",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 300,
                      easing: "inOutQuart",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-text",
                        selectorGuids: ["7bfd1580-d478-10e6-eb15-44aa3aa728b4"],
                      },
                      value: "block",
                    },
                  },
                  {
                    id: "a-112-n-8",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 350,
                      easing: "inOutQuart",
                      duration: 250,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-text",
                        selectorGuids: ["7bfd1580-d478-10e6-eb15-44aa3aa728b4"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-112-n-7",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 350,
                      easing: "inOutQuart",
                      duration: 250,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-text",
                        selectorGuids: ["7bfd1580-d478-10e6-eb15-44aa3aa728b4"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18f0660401b,
          },
          "a-113": {
            id: "a-113",
            title: "Enquiry Card – Hover OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-113-n-6",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".enquiry-card__overlay",
                        selectorGuids: ["c116ddbd-443f-884b-4217-e08ca8f50eca"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-113-n-12",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".enquiry-card__overlay",
                        selectorGuids: ["c116ddbd-443f-884b-4217-e08ca8f50eca"],
                      },
                      globalSwatchId: "--tint",
                      rValue: 240,
                      bValue: 230,
                      gValue: 237,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-113-n-11",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        selector: ".card-tag.no--caps",
                        selectorGuids: [
                          "d1392b07-105f-ad11-1b62-ff2a6ab57a71",
                          "f4fe850b-baad-f4f0-67dc-971201ee13c4",
                        ],
                      },
                      xValue: 0,
                      xUnit: "rem",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-113-n-7",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button.is-icon.is-card",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27158",
                          "07815991-952a-8d98-0e00-e4c25af27171",
                          "22062d45-77a3-203b-c78b-2de46461a8da",
                        ],
                      },
                      widthValue: 3.75,
                      heightValue: 3.75,
                      widthUnit: "rem",
                      heightUnit: "rem",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-113-n-9",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 250,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-text",
                        selectorGuids: ["7bfd1580-d478-10e6-eb15-44aa3aa728b4"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-113-n-10",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 250,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-text",
                        selectorGuids: ["7bfd1580-d478-10e6-eb15-44aa3aa728b4"],
                      },
                      yValue: 50,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-113-n-8",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 300,
                      easing: "inOutQuart",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-text",
                        selectorGuids: ["7bfd1580-d478-10e6-eb15-44aa3aa728b4"],
                      },
                      value: "none",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18f0660401b,
          },
          "a-115": {
            id: "a-115",
            title: "Montage Image Parallax",
            continuousParameterGroups: [
              {
                id: "a-115-p",
                type: "SCROLL_PROGRESS",
                parameterLabel: "Scroll",
                continuousActionGroups: [
                  {
                    keyframe: 0,
                    actionItems: [
                      {
                        id: "a-115-n",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".montage-image-1",
                            selectorGuids: [
                              "a83ce0b0-2ae2-4855-4ac1-883340dc6a4d",
                            ],
                          },
                          yValue: 5,
                          xUnit: "PX",
                          yUnit: "%",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-115-n-3",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".montage-image-4",
                            selectorGuids: [
                              "54873a72-5b97-2216-11e4-98b9c8c22d9c",
                            ],
                          },
                          yValue: 8,
                          xUnit: "PX",
                          yUnit: "%",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-115-n-5",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".montage-image-2",
                            selectorGuids: [
                              "b427475f-aca0-90b1-ade4-f5022ea885bb",
                            ],
                          },
                          yValue: 3,
                          xUnit: "PX",
                          yUnit: "%",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-115-n-7",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".montage-image-3",
                            selectorGuids: [
                              "fa2ce631-acde-a077-27e2-b81086fda406",
                            ],
                          },
                          yValue: 10,
                          xUnit: "PX",
                          yUnit: "%",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-115-n-9",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".montage-image-6",
                            selectorGuids: [
                              "d5771a4c-cf88-b0c6-c2c9-307437ec4f41",
                            ],
                          },
                          yValue: -10,
                          xUnit: "PX",
                          yUnit: "%",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-115-n-11",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".montage-image-5",
                            selectorGuids: [
                              "1f1588be-14e0-e3f1-cc05-9ec1a7599839",
                            ],
                          },
                          yValue: -6,
                          xUnit: "PX",
                          yUnit: "%",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 100,
                    actionItems: [
                      {
                        id: "a-115-n-2",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".montage-image-1",
                            selectorGuids: [
                              "a83ce0b0-2ae2-4855-4ac1-883340dc6a4d",
                            ],
                          },
                          yValue: -12,
                          xUnit: "PX",
                          yUnit: "%",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-115-n-4",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".montage-image-4",
                            selectorGuids: [
                              "54873a72-5b97-2216-11e4-98b9c8c22d9c",
                            ],
                          },
                          yValue: -8,
                          xUnit: "PX",
                          yUnit: "%",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-115-n-6",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".montage-image-2",
                            selectorGuids: [
                              "b427475f-aca0-90b1-ade4-f5022ea885bb",
                            ],
                          },
                          yValue: -3,
                          xUnit: "PX",
                          yUnit: "%",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-115-n-8",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".montage-image-3",
                            selectorGuids: [
                              "fa2ce631-acde-a077-27e2-b81086fda406",
                            ],
                          },
                          yValue: -10,
                          xUnit: "PX",
                          yUnit: "%",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-115-n-10",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".montage-image-6",
                            selectorGuids: [
                              "d5771a4c-cf88-b0c6-c2c9-307437ec4f41",
                            ],
                          },
                          yValue: 6,
                          xUnit: "PX",
                          yUnit: "%",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-115-n-12",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".montage-image-5",
                            selectorGuids: [
                              "1f1588be-14e0-e3f1-cc05-9ec1a7599839",
                            ],
                          },
                          yValue: 10,
                          xUnit: "PX",
                          yUnit: "%",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
            createdOn: 0x18f0bc40217,
          },
          "a-116": {
            id: "a-116",
            title: "Accordion – Hover IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-116-n-3",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".accordion_item-line",
                        selectorGuids: ["b10f2e28-9cd1-8838-641c-82c44d991dc7"],
                      },
                      zValue: 1e-4,
                      xUnit: "DEG",
                      yUnit: "DEG",
                      zUnit: "deg",
                    },
                  },
                  {
                    id: "a-116-n-4",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".accordion_item-line",
                        selectorGuids: ["b10f2e28-9cd1-8838-641c-82c44d991dc7"],
                      },
                      xValue: 0,
                      locked: !1,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-116-n",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".accordion_item-line",
                        selectorGuids: ["b10f2e28-9cd1-8838-641c-82c44d991dc7"],
                      },
                      zValue: 1e-4,
                      xUnit: "DEG",
                      yUnit: "DEG",
                      zUnit: "deg",
                    },
                  },
                  {
                    id: "a-116-n-2",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".accordion_item-line",
                        selectorGuids: ["b10f2e28-9cd1-8838-641c-82c44d991dc7"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18f0c3ae01f,
          },
          "a-117": {
            id: "a-117",
            title: "Accordion – Hover OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-117-n-3",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".accordion_item-line",
                        selectorGuids: ["b10f2e28-9cd1-8838-641c-82c44d991dc7"],
                      },
                      zValue: 1e-4,
                      xUnit: "DEG",
                      yUnit: "DEG",
                      zUnit: "deg",
                    },
                  },
                  {
                    id: "a-117-n-4",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".accordion_item-line",
                        selectorGuids: ["b10f2e28-9cd1-8838-641c-82c44d991dc7"],
                      },
                      xValue: 0,
                      yValue: 1,
                      locked: !1,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18f0c3ae01f,
          },
          "a-118": {
            id: "a-118",
            title: "Enquiry Card (easter)– Hover IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-118-n-11",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".enquiry-card__overlay.is--easter",
                        selectorGuids: [
                          "c116ddbd-443f-884b-4217-e08ca8f50eca",
                          "960160e0-919d-8432-950f-30aa0eb5ee54",
                        ],
                      },
                      globalSwatchId: "--easter",
                      rValue: 222,
                      bValue: 225,
                      gValue: 207,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-118-n-13",
                    actionTypeId: "STYLE_TEXT_COLOR",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "65af9f0cabbaf2f9644debb4|1f277ab0-fd09-8935-86a6-6ef803fd3f93",
                      },
                      globalSwatchId: "--black",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-118-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".enquiry-card__overlay",
                        selectorGuids: ["c116ddbd-443f-884b-4217-e08ca8f50eca"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-118-n-2",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-text",
                        selectorGuids: ["7bfd1580-d478-10e6-eb15-44aa3aa728b4"],
                      },
                      value: "none",
                    },
                  },
                  {
                    id: "a-118-n-3",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button.is-icon.is-card",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27158",
                          "07815991-952a-8d98-0e00-e4c25af27171",
                          "22062d45-77a3-203b-c78b-2de46461a8da",
                        ],
                      },
                      widthValue: 3.75,
                      heightValue: 3.75,
                      widthUnit: "rem",
                      heightUnit: "rem",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-118-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-text",
                        selectorGuids: ["7bfd1580-d478-10e6-eb15-44aa3aa728b4"],
                      },
                      yValue: 50,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-118-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-text",
                        selectorGuids: ["7bfd1580-d478-10e6-eb15-44aa3aa728b4"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-118-n-6",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".enquiry-card__overlay",
                        selectorGuids: ["c116ddbd-443f-884b-4217-e08ca8f50eca"],
                      },
                      value: 0.5,
                      unit: "",
                    },
                  },
                  {
                    id: "a-118-n-14",
                    actionTypeId: "STYLE_TEXT_COLOR",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: !0,
                        id: "65af9f0cabbaf2f9644debb4|1f277ab0-fd09-8935-86a6-6ef803fd3f93",
                      },
                      globalSwatchId: "--white",
                      rValue: 255,
                      bValue: 255,
                      gValue: 255,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-118-n-12",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".enquiry-card__overlay.is--easter",
                        selectorGuids: [
                          "c116ddbd-443f-884b-4217-e08ca8f50eca",
                          "960160e0-919d-8432-950f-30aa0eb5ee54",
                        ],
                      },
                      globalSwatchId: "--black",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-118-n-7",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button.is-icon.is-card",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27158",
                          "07815991-952a-8d98-0e00-e4c25af27171",
                          "22062d45-77a3-203b-c78b-2de46461a8da",
                        ],
                      },
                      widthValue: 15,
                      heightValue: 3.75,
                      widthUnit: "rem",
                      heightUnit: "rem",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-118-n-8",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 300,
                      easing: "inOutQuart",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-text",
                        selectorGuids: ["7bfd1580-d478-10e6-eb15-44aa3aa728b4"],
                      },
                      value: "block",
                    },
                  },
                  {
                    id: "a-118-n-9",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 350,
                      easing: "inOutQuart",
                      duration: 250,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-text",
                        selectorGuids: ["7bfd1580-d478-10e6-eb15-44aa3aa728b4"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-118-n-10",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 350,
                      easing: "inOutQuart",
                      duration: 250,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-text",
                        selectorGuids: ["7bfd1580-d478-10e6-eb15-44aa3aa728b4"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18f0660401b,
          },
          "a-119": {
            id: "a-119",
            title: "Enquiry Card (easter) – Hover OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-119-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".enquiry-card__overlay",
                        selectorGuids: ["c116ddbd-443f-884b-4217-e08ca8f50eca"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-119-n-7",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".enquiry-card__overlay.is--easter",
                        selectorGuids: [
                          "c116ddbd-443f-884b-4217-e08ca8f50eca",
                          "960160e0-919d-8432-950f-30aa0eb5ee54",
                        ],
                      },
                      globalSwatchId: "--easter",
                      rValue: 222,
                      bValue: 225,
                      gValue: 207,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-119-n-6",
                    actionTypeId: "STYLE_TEXT_COLOR",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: !0,
                        id: "65af9f0cabbaf2f9644debb4|1f277ab0-fd09-8935-86a6-6ef803fd3f93",
                      },
                      globalSwatchId: "--black",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-119-n-2",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button.is-icon.is-card",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27158",
                          "07815991-952a-8d98-0e00-e4c25af27171",
                          "22062d45-77a3-203b-c78b-2de46461a8da",
                        ],
                      },
                      widthValue: 3.75,
                      heightValue: 3.75,
                      widthUnit: "rem",
                      heightUnit: "rem",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-119-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 250,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-text",
                        selectorGuids: ["7bfd1580-d478-10e6-eb15-44aa3aa728b4"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-119-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 250,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-text",
                        selectorGuids: ["7bfd1580-d478-10e6-eb15-44aa3aa728b4"],
                      },
                      yValue: 50,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-119-n-5",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 300,
                      easing: "inOutQuart",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-text",
                        selectorGuids: ["7bfd1580-d478-10e6-eb15-44aa3aa728b4"],
                      },
                      value: "none",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18f0660401b,
          },
          "a-23": {
            id: "a-23",
            title: "Plan Toggle Dev",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-23-n-8",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644debb4|8829c381-e014-a560-f7f7-dadf0d95a87c",
                      },
                      value: 0.3,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-23-n-10",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        id: "65af9f0cabbaf2f9644debb4|8829c381-e014-a560-f7f7-dadf0d95a878",
                      },
                      value: 0.4,
                      unit: "",
                    },
                  },
                  {
                    id: "a-23-n-9",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        id: "65af9f0cabbaf2f9644debb4|8829c381-e014-a560-f7f7-dadf0d95a87c",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-23-n-7",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".toggle",
                        selectorGuids: ["30bcd980-a15d-0127-4f38-e6223a3c9572"],
                      },
                      xValue: 1.5,
                      xUnit: "rem",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18cee32f702,
          },
          "a-120": {
            id: "a-120",
            title: "Plan Toggle Design",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-120-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        id: "65af9f0cabbaf2f9644debb4|8829c381-e014-a560-f7f7-dadf0d95a878",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-120-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        id: "65af9f0cabbaf2f9644debb4|8829c381-e014-a560-f7f7-dadf0d95a87c",
                      },
                      value: 0.4,
                      unit: "",
                    },
                  },
                  {
                    id: "a-120-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".toggle",
                        selectorGuids: ["30bcd980-a15d-0127-4f38-e6223a3c9572"],
                      },
                      xValue: 0,
                      xUnit: "rem",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18cee32f702,
          },
          "a-121": {
            id: "a-121",
            title: "Pricing Card – Hover IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-121-n-2",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-text",
                        selectorGuids: ["7bfd1580-d478-10e6-eb15-44aa3aa728b4"],
                      },
                      value: "none",
                    },
                  },
                  {
                    id: "a-121-n-3",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button.is-icon.is-card",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27158",
                          "07815991-952a-8d98-0e00-e4c25af27171",
                          "22062d45-77a3-203b-c78b-2de46461a8da",
                        ],
                      },
                      widthValue: 3.75,
                      heightValue: 3.75,
                      widthUnit: "rem",
                      heightUnit: "rem",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-121-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-text",
                        selectorGuids: ["7bfd1580-d478-10e6-eb15-44aa3aa728b4"],
                      },
                      yValue: 50,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-121-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-text",
                        selectorGuids: ["7bfd1580-d478-10e6-eb15-44aa3aa728b4"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-121-n-7",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button.is-icon.is-card",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27158",
                          "07815991-952a-8d98-0e00-e4c25af27171",
                          "22062d45-77a3-203b-c78b-2de46461a8da",
                        ],
                      },
                      widthValue: 15,
                      heightValue: 3.75,
                      widthUnit: "rem",
                      heightUnit: "rem",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-121-n-8",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 300,
                      easing: "inOutQuart",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-text",
                        selectorGuids: ["7bfd1580-d478-10e6-eb15-44aa3aa728b4"],
                      },
                      value: "block",
                    },
                  },
                  {
                    id: "a-121-n-9",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 350,
                      easing: "inOutQuart",
                      duration: 250,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-text",
                        selectorGuids: ["7bfd1580-d478-10e6-eb15-44aa3aa728b4"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-121-n-10",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 350,
                      easing: "inOutQuart",
                      duration: 250,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-text",
                        selectorGuids: ["7bfd1580-d478-10e6-eb15-44aa3aa728b4"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18f0660401b,
          },
          "a-122": {
            id: "a-122",
            title: "Pricing Card – Hover OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-122-n-2",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button.is-icon.is-card",
                        selectorGuids: [
                          "07815991-952a-8d98-0e00-e4c25af27158",
                          "07815991-952a-8d98-0e00-e4c25af27171",
                          "22062d45-77a3-203b-c78b-2de46461a8da",
                        ],
                      },
                      widthValue: 3.75,
                      heightValue: 3.75,
                      widthUnit: "rem",
                      heightUnit: "rem",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-122-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 250,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-text",
                        selectorGuids: ["7bfd1580-d478-10e6-eb15-44aa3aa728b4"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-122-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 250,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-text",
                        selectorGuids: ["7bfd1580-d478-10e6-eb15-44aa3aa728b4"],
                      },
                      yValue: 50,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-122-n-5",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 300,
                      easing: "inOutQuart",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-text",
                        selectorGuids: ["7bfd1580-d478-10e6-eb15-44aa3aa728b4"],
                      },
                      value: "none",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18f0660401b,
          },
          "a-123": {
            id: "a-123",
            title: "Next Page - work",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-123-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".page-link-icon",
                        selectorGuids: ["0f786af5-d051-f99a-6b06-2eed31ab513c"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-123-n-8",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "f00924d9-05ec-c45e-7204-a836371d99b0",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "vh",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-123-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".next-page-image",
                        selectorGuids: ["29dc5b88-eaeb-3c49-4837-645f3c29fa65"],
                      },
                      value: 0.4,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-123-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".next-page-image",
                        selectorGuids: ["29dc5b88-eaeb-3c49-4837-645f3c29fa65"],
                      },
                      value: 0.8,
                      unit: "",
                    },
                  },
                  {
                    id: "a-123-n-6",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 10,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        selector: ".section_footer.background-color-black",
                        selectorGuids: [
                          "71c1b7b5-e37c-bf7b-ae47-59e66ecc92df",
                          "c85d0051-43a2-5948-25da-64b8f7daca9a",
                        ],
                      },
                      yValue: -5,
                      xUnit: "PX",
                      yUnit: "vh",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-123-n-9",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 10,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: !0,
                        id: "f00924d9-05ec-c45e-7204-a836371d99b0",
                      },
                      yValue: -5,
                      xUnit: "PX",
                      yUnit: "vh",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-123-n-7",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 300,
                      easing: "outBack",
                      duration: 450,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".page-link-icon",
                        selectorGuids: ["0f786af5-d051-f99a-6b06-2eed31ab513c"],
                      },
                      yValue: 50,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18e0e5918da,
          },
          "a-124": {
            id: "a-124",
            title: "Next Page OUT - work",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-124-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".page-link-icon",
                        selectorGuids: ["0f786af5-d051-f99a-6b06-2eed31ab513c"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-124-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        useEventTarget: !0,
                        id: "f00924d9-05ec-c45e-7204-a836371d99b0",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "vh",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-124-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".next-page-image",
                        selectorGuids: ["29dc5b88-eaeb-3c49-4837-645f3c29fa65"],
                      },
                      value: 0.4,
                      unit: "",
                    },
                  },
                  {
                    id: "a-124-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        selector: ".section_footer.background-color-black",
                        selectorGuids: [
                          "71c1b7b5-e37c-bf7b-ae47-59e66ecc92df",
                          "c85d0051-43a2-5948-25da-64b8f7daca9a",
                        ],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "vh",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18e0e5918da,
          },
          "a-91": {
            id: "a-91",
            title: "Next Page",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-91-n-10",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".page-link-icon",
                        selectorGuids: ["0f786af5-d051-f99a-6b06-2eed31ab513c"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-91-n-9",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".next-page-image",
                        selectorGuids: ["29dc5b88-eaeb-3c49-4837-645f3c29fa65"],
                      },
                      value: 0.4,
                      unit: "",
                    },
                  },
                  {
                    id: "a-91-n-7",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "f095ceff-1416-61e3-4e28-8aa500ebb59c",
                      },
                      widthValue: 100,
                      heightValue: 15,
                      widthUnit: "%",
                      heightUnit: "rem",
                      locked: !1,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-91-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: !0,
                        id: "f095ceff-1416-61e3-4e28-8aa500ebb59c",
                      },
                      widthValue: 100,
                      heightValue: 20,
                      widthUnit: "%",
                      heightUnit: "rem",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-91-n-8",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".next-page-image",
                        selectorGuids: ["29dc5b88-eaeb-3c49-4837-645f3c29fa65"],
                      },
                      value: 0.8,
                      unit: "",
                    },
                  },
                  {
                    id: "a-91-n-6",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 10,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        selector: ".section_footer.background-color-black",
                        selectorGuids: [
                          "71c1b7b5-e37c-bf7b-ae47-59e66ecc92df",
                          "c85d0051-43a2-5948-25da-64b8f7daca9a",
                        ],
                      },
                      yValue: -5,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-91-n-11",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 300,
                      easing: "outBack",
                      duration: 450,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".page-link-icon",
                        selectorGuids: ["0f786af5-d051-f99a-6b06-2eed31ab513c"],
                      },
                      yValue: 50,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18e0e5918da,
          },
          "a-92": {
            id: "a-92",
            title: "Next Page OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-92-n-9",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".page-link-icon",
                        selectorGuids: ["0f786af5-d051-f99a-6b06-2eed31ab513c"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-92-n-6",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".next-page-image",
                        selectorGuids: ["29dc5b88-eaeb-3c49-4837-645f3c29fa65"],
                      },
                      value: 0.4,
                      unit: "",
                    },
                  },
                  {
                    id: "a-92-n-8",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        selector: ".section_footer.background-color-black",
                        selectorGuids: [
                          "71c1b7b5-e37c-bf7b-ae47-59e66ecc92df",
                          "c85d0051-43a2-5948-25da-64b8f7daca9a",
                        ],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-92-n-3",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 10,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        useEventTarget: !0,
                        id: "f095ceff-1416-61e3-4e28-8aa500ebb59c",
                      },
                      widthValue: 100,
                      heightValue: 15,
                      widthUnit: "%",
                      heightUnit: "rem",
                      locked: !1,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18e0e5918da,
          },
          "a-125": {
            id: "a-125",
            title: "Fade In Card",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-125-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "65af9f0cabbaf2f9644debb4|bbc725f8-c006-3431-a2af-aa73388b502c",
                      },
                      yValue: 2,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-125-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "65af9f0cabbaf2f9644debb4|bbc725f8-c006-3431-a2af-aa73388b502c",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-125-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: !0,
                        id: "65af9f0cabbaf2f9644debb4|bbc725f8-c006-3431-a2af-aa73388b502c",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-125-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 600,
                      target: {
                        useEventTarget: !0,
                        id: "65af9f0cabbaf2f9644debb4|bbc725f8-c006-3431-a2af-aa73388b502c",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18f5f5587d4,
          },
          "a-126": {
            id: "a-126",
            title: "Enquiry Card - Loop",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-126-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".enquiry-card-heading.anim",
                        selectorGuids: [
                          "58ccf72b-44a1-dbf5-63a0-436e7fdc5432",
                          "dd38f35f-894a-5946-f912-17034c516c14",
                        ],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-126-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".enquiry-card-heading.anim",
                        selectorGuids: [
                          "58ccf72b-44a1-dbf5-63a0-436e7fdc5432",
                          "dd38f35f-894a-5946-f912-17034c516c14",
                        ],
                      },
                      yValue: -100,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-126-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 1250,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".enquiry-card-heading.anim",
                        selectorGuids: [
                          "58ccf72b-44a1-dbf5-63a0-436e7fdc5432",
                          "dd38f35f-894a-5946-f912-17034c516c14",
                        ],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-126-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 1250,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".enquiry-card-heading.anim",
                        selectorGuids: [
                          "58ccf72b-44a1-dbf5-63a0-436e7fdc5432",
                          "dd38f35f-894a-5946-f912-17034c516c14",
                        ],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18f5f7eaaf8,
          },
          "a-127": {
            id: "a-127",
            title: "Enquiry Card - Loop End",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-127-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".enquiry-card-heading.anim",
                        selectorGuids: [
                          "58ccf72b-44a1-dbf5-63a0-436e7fdc5432",
                          "dd38f35f-894a-5946-f912-17034c516c14",
                        ],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18f5f7eaaf8,
          },
          "a-128": {
            id: "a-128",
            title: "Team Surprise",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-128-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "65af9f0cabbaf2f9644debb4|f3a5d830-1db5-547c-b366-85730fbce3d0",
                      },
                      yValue: -50,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-128-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "65af9f0cabbaf2f9644debb4|f3a5d830-1db5-547c-b366-85730fbce3d0",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-128-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "65af9f0cabbaf2f9644debb4|f3a5d830-1db5-547c-b366-85730fbce3d0",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-128-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "65af9f0cabbaf2f9644debb4|f3a5d830-1db5-547c-b366-85730fbce3d0",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-128-n-5",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 1500,
                      easing: "inOutBack",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "65af9f0cabbaf2f9644debb4|f3a5d830-1db5-547c-b366-85730fbce3d0",
                      },
                      yValue: 40,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-128-n-6",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "outBack",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "65af9f0cabbaf2f9644debb4|f3a5d830-1db5-547c-b366-85730fbce3d0",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-128-n-8",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 2500,
                      easing: "inQuart",
                      duration: 400,
                      target: {
                        useEventTarget: !0,
                        id: "65af9f0cabbaf2f9644debb4|f3a5d830-1db5-547c-b366-85730fbce3d0",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-128-n-7",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 2500,
                      easing: "inQuart",
                      duration: 400,
                      target: {
                        useEventTarget: !0,
                        id: "65af9f0cabbaf2f9644debb4|f3a5d830-1db5-547c-b366-85730fbce3d0",
                      },
                      yValue: 50,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-128-n-9",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: !0,
                        id: "65af9f0cabbaf2f9644debb4|f3a5d830-1db5-547c-b366-85730fbce3d0",
                      },
                      value: "none",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18f61eeff51,
          },
          "a-129": {
            id: "a-129",
            title: "Filter On - team",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-129-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644debb1|984bc779-2143-58bf-d8d7-891a4c33266f",
                      },
                      xValue: 0,
                      yValue: 0,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-129-n-2",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644debb1|984bc779-2143-58bf-d8d7-891a4c33266f",
                      },
                      widthValue: 0,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-129-n-3",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        id: "65af9f0cabbaf2f9644debb1|984bc779-2143-58bf-d8d7-891a4c33266c",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-129-n-4",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        id: "65af9f0cabbaf2f9644debb1|984bc779-2143-58bf-d8d7-891a4c33266c",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-129-n-5",
                    actionTypeId: "STYLE_TEXT_COLOR",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".filter-label",
                        selectorGuids: ["68919f07-ebdd-da43-e90f-761aeb368c64"],
                      },
                      globalSwatchId: "",
                      rValue: 255,
                      bValue: 255,
                      gValue: 255,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-129-n-6",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        id: "65af9f0cabbaf2f9644debb1|984bc779-2143-58bf-d8d7-891a4c33266f",
                      },
                      widthValue: 1.25,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-129-n-7",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        id: "65af9f0cabbaf2f9644debb1|984bc779-2143-58bf-d8d7-891a4c33266f",
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-129-n-8",
                    actionTypeId: "STYLE_TEXT_COLOR",
                    config: {
                      delay: 0,
                      easing: "inOutQuart",
                      duration: 450,
                      target: {
                        id: "65af9f0cabbaf2f9644debb1|984bc779-2143-58bf-d8d7-891a4c33266c",
                      },
                      globalSwatchId: "",
                      rValue: 255,
                      bValue: 255,
                      gValue: 255,
                      aValue: 1,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18d26852735,
          },
          "a-130": {
            id: "a-130",
            title: "Filter Off - team",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-130-n",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 300,
                      target: {
                        id: "65af9f0cabbaf2f9644debb1|984bc779-2143-58bf-d8d7-891a4c33266c",
                      },
                      globalSwatchId: "--white",
                      rValue: 255,
                      bValue: 255,
                      gValue: 255,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-130-n-3",
                    actionTypeId: "STYLE_TEXT_COLOR",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 300,
                      target: {
                        useEventTarget: "SIBLINGS",
                        selector: ".filter-label",
                        selectorGuids: ["68919f07-ebdd-da43-e90f-761aeb368c64"],
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-130-n-4",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 300,
                      target: {
                        id: "65af9f0cabbaf2f9644debb1|984bc779-2143-58bf-d8d7-891a4c33266f",
                      },
                      widthValue: 0,
                      widthUnit: "rem",
                      heightUnit: "PX",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-130-n-5",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 300,
                      target: {
                        id: "65af9f0cabbaf2f9644debb1|984bc779-2143-58bf-d8d7-891a4c33266f",
                      },
                      xValue: 0,
                      yValue: 0,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-130-n-6",
                    actionTypeId: "STYLE_TEXT_COLOR",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 300,
                      target: {
                        id: "65af9f0cabbaf2f9644debb1|984bc779-2143-58bf-d8d7-891a4c33266c",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 1,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18d26852735,
          },
          "a-131": {
            id: "a-131",
            title: "About",
            continuousParameterGroups: [
              {
                id: "a-131-p",
                type: "SCROLL_PROGRESS",
                parameterLabel: "Scroll",
                continuousActionGroups: [
                  {
                    keyframe: 52,
                    actionItems: [
                      {
                        id: "a-131-n-8",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".sentence-1",
                            selectorGuids: [
                              "fe2d56f4-cc2c-567b-c826-b00fdd5dfe13",
                            ],
                          },
                          value: 1,
                          unit: "",
                        },
                      },
                      {
                        id: "a-131-n-3",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".sentence-2",
                            selectorGuids: [
                              "bfc307a0-fd0b-1957-e0f9-ab6b60e0c70b",
                            ],
                          },
                          value: 0.1,
                          unit: "",
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 59,
                    actionItems: [
                      {
                        id: "a-131-n-9",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".sentence-1",
                            selectorGuids: [
                              "fe2d56f4-cc2c-567b-c826-b00fdd5dfe13",
                            ],
                          },
                          value: 0.1,
                          unit: "",
                        },
                      },
                      {
                        id: "a-131-n-10",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".sentence-2",
                            selectorGuids: [
                              "bfc307a0-fd0b-1957-e0f9-ab6b60e0c70b",
                            ],
                          },
                          value: 1,
                          unit: "",
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 69,
                    actionItems: [
                      {
                        id: "a-131-n-11",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".sentence-3",
                            selectorGuids: [
                              "70027c88-35e3-540f-0235-16452f153b96",
                            ],
                          },
                          value: 0.1,
                          unit: "",
                        },
                      },
                      {
                        id: "a-131-n-13",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".sentence-2",
                            selectorGuids: [
                              "bfc307a0-fd0b-1957-e0f9-ab6b60e0c70b",
                            ],
                          },
                          value: 1,
                          unit: "",
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 76,
                    actionItems: [
                      {
                        id: "a-131-n-12",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".sentence-3",
                            selectorGuids: [
                              "70027c88-35e3-540f-0235-16452f153b96",
                            ],
                          },
                          value: 1,
                          unit: "",
                        },
                      },
                      {
                        id: "a-131-n-14",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".sentence-2",
                            selectorGuids: [
                              "bfc307a0-fd0b-1957-e0f9-ab6b60e0c70b",
                            ],
                          },
                          value: 0.1,
                          unit: "",
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 86,
                    actionItems: [
                      {
                        id: "a-131-n-15",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".sentence-3",
                            selectorGuids: [
                              "70027c88-35e3-540f-0235-16452f153b96",
                            ],
                          },
                          value: 1,
                          unit: "",
                        },
                      },
                      {
                        id: "a-131-n-5",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".sentence-5",
                            selectorGuids: [
                              "365a8665-f821-c1b6-2175-4b08e79f962b",
                            ],
                          },
                          value: 0.1,
                          unit: "",
                        },
                      },
                      {
                        id: "a-131-n-6",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".sentence-6",
                            selectorGuids: [
                              "546bcea4-9e91-e0c1-90d6-2df51b92b1d8",
                            ],
                          },
                          value: 0.1,
                          unit: "",
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 93,
                    actionItems: [
                      {
                        id: "a-131-n-16",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".sentence-3",
                            selectorGuids: [
                              "70027c88-35e3-540f-0235-16452f153b96",
                            ],
                          },
                          value: 0.1,
                          unit: "",
                        },
                      },
                      {
                        id: "a-131-n-17",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".sentence-5",
                            selectorGuids: [
                              "365a8665-f821-c1b6-2175-4b08e79f962b",
                            ],
                          },
                          value: 1,
                          unit: "",
                        },
                      },
                      {
                        id: "a-131-n-20",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".sentence-6",
                            selectorGuids: [
                              "546bcea4-9e91-e0c1-90d6-2df51b92b1d8",
                            ],
                          },
                          value: 1,
                          unit: "",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
            createdOn: 0x18f76c66ebf,
          },
          "a-132": {
            id: "a-132",
            title: "Nav Logo Appear 2",
            continuousParameterGroups: [
              {
                id: "a-132-p",
                type: "SCROLL_PROGRESS",
                parameterLabel: "Scroll",
                continuousActionGroups: [
                  {
                    keyframe: 5,
                    actionItems: [
                      {
                        id: "a-132-n",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "67995ab1e7b96a3ffe9f2876|cba46a16-c890-d02f-9c9c-390f67f3cb59",
                          },
                          widthValue: 0,
                          widthUnit: "rem",
                          heightUnit: "PX",
                          locked: !1,
                        },
                      },
                      {
                        id: "a-132-n-2",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "67995ab1e7b96a3ffe9f2876|64d6b572-7c43-936d-785b-b92d636aa670",
                          },
                          widthValue: 0,
                          widthUnit: "rem",
                          heightUnit: "PX",
                          locked: !1,
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 10,
                    actionItems: [
                      {
                        id: "a-132-n-3",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "67995ab1e7b96a3ffe9f2876|cba46a16-c890-d02f-9c9c-390f67f3cb59",
                          },
                          widthValue: 3.75,
                          widthUnit: "rem",
                          heightUnit: "PX",
                          locked: !1,
                        },
                      },
                      {
                        id: "a-132-n-4",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "67995ab1e7b96a3ffe9f2876|64d6b572-7c43-936d-785b-b92d636aa670",
                          },
                          widthValue: 3.75,
                          widthUnit: "rem",
                          heightUnit: "PX",
                          locked: !1,
                        },
                      },
                    ],
                  },
                ],
              },
            ],
            createdOn: 0x18dd70d6c85,
          },
          "a-133": {
            id: "a-133",
            title: "Nav Logo Appear 3",
            continuousParameterGroups: [
              {
                id: "a-133-p",
                type: "SCROLL_PROGRESS",
                parameterLabel: "Scroll",
                continuousActionGroups: [
                  {
                    keyframe: 5,
                    actionItems: [
                      {
                        id: "a-133-n",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "67995db30f864f9db690b7a1|cba46a16-c890-d02f-9c9c-390f67f3cb59",
                          },
                          widthValue: 0,
                          widthUnit: "rem",
                          heightUnit: "PX",
                          locked: !1,
                        },
                      },
                      {
                        id: "a-133-n-2",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "67995db30f864f9db690b7a1|64d6b572-7c43-936d-785b-b92d636aa670",
                          },
                          widthValue: 0,
                          widthUnit: "rem",
                          heightUnit: "PX",
                          locked: !1,
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 10,
                    actionItems: [
                      {
                        id: "a-133-n-3",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "67995db30f864f9db690b7a1|cba46a16-c890-d02f-9c9c-390f67f3cb59",
                          },
                          widthValue: 3.75,
                          widthUnit: "rem",
                          heightUnit: "PX",
                          locked: !1,
                        },
                      },
                      {
                        id: "a-133-n-4",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "67995db30f864f9db690b7a1|64d6b572-7c43-936d-785b-b92d636aa670",
                          },
                          widthValue: 3.75,
                          widthUnit: "rem",
                          heightUnit: "PX",
                          locked: !1,
                        },
                      },
                    ],
                  },
                ],
              },
            ],
            createdOn: 0x18dd70d6c85,
          },
          "a-134": {
            id: "a-134",
            title: "Nav Logo Appear 4",
            continuousParameterGroups: [
              {
                id: "a-134-p",
                type: "SCROLL_PROGRESS",
                parameterLabel: "Scroll",
                continuousActionGroups: [
                  {
                    keyframe: 5,
                    actionItems: [
                      {
                        id: "a-134-n",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "67995f7c76a3fe75523236dc|cba46a16-c890-d02f-9c9c-390f67f3cb59",
                          },
                          widthValue: 0,
                          widthUnit: "rem",
                          heightUnit: "PX",
                          locked: !1,
                        },
                      },
                      {
                        id: "a-134-n-2",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "67995f7c76a3fe75523236dc|64d6b572-7c43-936d-785b-b92d636aa670",
                          },
                          widthValue: 0,
                          widthUnit: "rem",
                          heightUnit: "PX",
                          locked: !1,
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 10,
                    actionItems: [
                      {
                        id: "a-134-n-3",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "67995f7c76a3fe75523236dc|cba46a16-c890-d02f-9c9c-390f67f3cb59",
                          },
                          widthValue: 3.75,
                          widthUnit: "rem",
                          heightUnit: "PX",
                          locked: !1,
                        },
                      },
                      {
                        id: "a-134-n-4",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "67995f7c76a3fe75523236dc|64d6b572-7c43-936d-785b-b92d636aa670",
                          },
                          widthValue: 3.75,
                          widthUnit: "rem",
                          heightUnit: "PX",
                          locked: !1,
                        },
                      },
                    ],
                  },
                ],
              },
            ],
            createdOn: 0x18dd70d6c85,
          },
          "a-135": {
            id: "a-135",
            title: "Nav Logo Appear 5",
            continuousParameterGroups: [
              {
                id: "a-135-p",
                type: "SCROLL_PROGRESS",
                parameterLabel: "Scroll",
                continuousActionGroups: [
                  {
                    keyframe: 5,
                    actionItems: [
                      {
                        id: "a-135-n",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "686603127be028edc82ca6d0|cba46a16-c890-d02f-9c9c-390f67f3cb59",
                          },
                          widthValue: 0,
                          widthUnit: "rem",
                          heightUnit: "PX",
                          locked: !1,
                        },
                      },
                      {
                        id: "a-135-n-2",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "686603127be028edc82ca6d0|64d6b572-7c43-936d-785b-b92d636aa670",
                          },
                          widthValue: 0,
                          widthUnit: "rem",
                          heightUnit: "PX",
                          locked: !1,
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 10,
                    actionItems: [
                      {
                        id: "a-135-n-3",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "686603127be028edc82ca6d0|cba46a16-c890-d02f-9c9c-390f67f3cb59",
                          },
                          widthValue: 3.75,
                          widthUnit: "rem",
                          heightUnit: "PX",
                          locked: !1,
                        },
                      },
                      {
                        id: "a-135-n-4",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "686603127be028edc82ca6d0|64d6b572-7c43-936d-785b-b92d636aa670",
                          },
                          widthValue: 3.75,
                          widthUnit: "rem",
                          heightUnit: "PX",
                          locked: !1,
                        },
                      },
                    ],
                  },
                ],
              },
            ],
            createdOn: 0x18dd70d6c85,
          },
          "a-136": {
            id: "a-136",
            title: "Mouse Follow 2",
            continuousParameterGroups: [
              {
                id: "a-136-p",
                type: "MOUSE_X",
                parameterLabel: "Mouse X",
                continuousActionGroups: [
                  {
                    keyframe: 0,
                    actionItems: [
                      {
                        id: "a-136-n",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "686603127be028edc82ca6d0|271e3553-6e43-0ec6-a5df-d68396e3a4fb",
                          },
                          xValue: -50,
                          xUnit: "vw",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-136-n-2",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "686603127be028edc82ca6d0|271e3553-6e43-0ec6-a5df-d68396e3a4f8",
                          },
                          xValue: -50,
                          xUnit: "vw",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 100,
                    actionItems: [
                      {
                        id: "a-136-n-3",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "686603127be028edc82ca6d0|271e3553-6e43-0ec6-a5df-d68396e3a4fb",
                          },
                          xValue: 50,
                          xUnit: "vw",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-136-n-4",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "686603127be028edc82ca6d0|271e3553-6e43-0ec6-a5df-d68396e3a4f8",
                          },
                          xValue: 50,
                          xUnit: "vw",
                          yUnit: "PX",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                id: "a-136-p-2",
                type: "MOUSE_Y",
                parameterLabel: "Mouse Y",
                continuousActionGroups: [
                  {
                    keyframe: 0,
                    actionItems: [
                      {
                        id: "a-136-n-5",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "686603127be028edc82ca6d0|271e3553-6e43-0ec6-a5df-d68396e3a4fb",
                          },
                          yValue: -50,
                          xUnit: "PX",
                          yUnit: "vh",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-136-n-6",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "686603127be028edc82ca6d0|271e3553-6e43-0ec6-a5df-d68396e3a4f8",
                          },
                          yValue: -50,
                          xUnit: "PX",
                          yUnit: "vh",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 100,
                    actionItems: [
                      {
                        id: "a-136-n-7",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "686603127be028edc82ca6d0|271e3553-6e43-0ec6-a5df-d68396e3a4fb",
                          },
                          yValue: 50,
                          xUnit: "PX",
                          yUnit: "vh",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-136-n-8",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            id: "686603127be028edc82ca6d0|271e3553-6e43-0ec6-a5df-d68396e3a4f8",
                          },
                          yValue: 50,
                          xUnit: "PX",
                          yUnit: "vh",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
            createdOn: 0x18e24230390,
          },
          "a-137": {
            id: "a-137",
            title: "New Timed Animation 2",
            actionItemGroups: [],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18d795c205d,
          },
          "a-138": {
            id: "a-138",
            title: "Nav Logo Appear 6",
            continuousParameterGroups: [
              {
                id: "a-138-p",
                type: "SCROLL_PROGRESS",
                parameterLabel: "Scroll",
                continuousActionGroups: [
                  {
                    keyframe: 5,
                    actionItems: [
                      {
                        id: "a-138-n",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "6870a8fa86b8f6effc526e80|cba46a16-c890-d02f-9c9c-390f67f3cb59",
                          },
                          widthValue: 0,
                          widthUnit: "rem",
                          heightUnit: "PX",
                          locked: !1,
                        },
                      },
                      {
                        id: "a-138-n-2",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "6870a8fa86b8f6effc526e80|64d6b572-7c43-936d-785b-b92d636aa670",
                          },
                          widthValue: 0,
                          widthUnit: "rem",
                          heightUnit: "PX",
                          locked: !1,
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 10,
                    actionItems: [
                      {
                        id: "a-138-n-3",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "6870a8fa86b8f6effc526e80|cba46a16-c890-d02f-9c9c-390f67f3cb59",
                          },
                          widthValue: 3.75,
                          widthUnit: "rem",
                          heightUnit: "PX",
                          locked: !1,
                        },
                      },
                      {
                        id: "a-138-n-4",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "6870a8fa86b8f6effc526e80|64d6b572-7c43-936d-785b-b92d636aa670",
                          },
                          widthValue: 3.75,
                          widthUnit: "rem",
                          heightUnit: "PX",
                          locked: !1,
                        },
                      },
                    ],
                  },
                ],
              },
            ],
            createdOn: 0x18dd70d6c85,
          },
          "a-66": {
            id: "a-66",
            title: "Launch Video",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-66-n-3",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".section_video",
                        selectorGuids: ["5ccecda1-0e76-d909-89af-fda8812193d6"],
                      },
                      value: "none",
                    },
                  },
                  {
                    id: "a-66-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".section_video",
                        selectorGuids: ["5ccecda1-0e76-d909-89af-fda8812193d6"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-66-n-4",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".section_video",
                        selectorGuids: ["5ccecda1-0e76-d909-89af-fda8812193d6"],
                      },
                      value: "block",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-66-n-6",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "inOutQuad",
                      duration: 300,
                      target: {
                        selector: ".section_video",
                        selectorGuids: ["5ccecda1-0e76-d909-89af-fda8812193d6"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18da75d427a,
          },
          "a-141": {
            id: "a-141",
            title: "New Timed Animation 3",
            actionItemGroups: [],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x18d795c205d,
          },
          "a-142": {
            id: "a-142",
            title: "Nav Logo Appear 7",
            continuousParameterGroups: [
              {
                id: "a-142-p",
                type: "SCROLL_PROGRESS",
                parameterLabel: "Scroll",
                continuousActionGroups: [
                  {
                    keyframe: 5,
                    actionItems: [
                      {
                        id: "a-142-n",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "687c63e3af3893c1a0fe6dc3|cba46a16-c890-d02f-9c9c-390f67f3cb59",
                          },
                          widthValue: 0,
                          widthUnit: "rem",
                          heightUnit: "PX",
                          locked: !1,
                        },
                      },
                      {
                        id: "a-142-n-2",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "687c63e3af3893c1a0fe6dc3|64d6b572-7c43-936d-785b-b92d636aa670",
                          },
                          widthValue: 0,
                          widthUnit: "rem",
                          heightUnit: "PX",
                          locked: !1,
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 10,
                    actionItems: [
                      {
                        id: "a-142-n-3",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "687c63e3af3893c1a0fe6dc3|cba46a16-c890-d02f-9c9c-390f67f3cb59",
                          },
                          widthValue: 3.75,
                          widthUnit: "rem",
                          heightUnit: "PX",
                          locked: !1,
                        },
                      },
                      {
                        id: "a-142-n-4",
                        actionTypeId: "STYLE_SIZE",
                        config: {
                          delay: 0,
                          easing: "inOutQuad",
                          duration: 500,
                          target: {
                            id: "687c63e3af3893c1a0fe6dc3|64d6b572-7c43-936d-785b-b92d636aa670",
                          },
                          widthValue: 3.75,
                          widthUnit: "rem",
                          heightUnit: "PX",
                          locked: !1,
                        },
                      },
                    ],
                  },
                ],
              },
            ],
            createdOn: 0x18dd70d6c85,
          },
          "a-139": {
            id: "a-139",
            title: "Home Hero Load v2",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-139-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e608705",
                      },
                      yValue: 120,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-139-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|7871eb9d-187e-6140-1607-3dae8e8808d9",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-139-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|7871eb9d-187e-6140-1607-3dae8e8808d9",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-139-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".load-wrapper",
                        selectorGuids: ["e4cac13d-aa6b-ec49-0f06-95b759890068"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "vh",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-139-n-5",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|7871eb9d-187e-6140-1607-3dae8e8808d9",
                      },
                      value: 0,
                    },
                  },
                  {
                    id: "a-139-n-6",
                    actionTypeId: "GENERAL_DISPLAY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        selector: ".load-wrapper",
                        selectorGuids: ["e4cac13d-aa6b-ec49-0f06-95b759890068"],
                      },
                      value: "flex",
                    },
                  },
                  {
                    id: "a-139-n-7",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e608718",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-139-n-8",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e608718",
                      },
                      yValue: 2,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-139-n-9",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e60871e",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-139-n-10",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e60871e",
                      },
                      yValue: 2,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-139-n-11",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e60871c",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-139-n-12",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e60871c",
                      },
                      yValue: 1,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-139-n-13",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|32640830-ee85-2cfd-3b3b-9287cac19ee6",
                      },
                      xValue: 0,
                      locked: !1,
                    },
                  },
                  {
                    id: "a-139-n-14",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e608720",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-139-n-15",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e608720",
                      },
                      yValue: 5,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-139-n-16",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e608711",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-139-n-17",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e60870f",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-139-n-18",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|06e4c0f5-ac5c-3bb5-b3af-9de2e4a0d400",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-139-n-19",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|94fde4fa-43d5-1b6d-47d3-8eea41608e91",
                      },
                      yValue: 120,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-139-n-20",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|8cc462ba-2ae2-e655-5eca-bfa87e9d9fd9",
                      },
                      yValue: 120,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-139-n-21",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|87c233cf-f1a3-72bf-cf2c-92a1a4b60bba",
                      },
                      yValue: 120,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-139-n-22",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|d50b4bfb-cd58-6208-e28a-0111e0f034d6",
                      },
                      yValue: 120,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-139-n-23",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|651266b1-ca34-8285-6d9c-dd8718e29e6f",
                      },
                      yValue: 120,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-139-n-24",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 4240,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|7871eb9d-187e-6140-1607-3dae8e8808d9",
                      },
                      value: 99,
                    },
                  },
                  {
                    id: "a-139-n-25",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 4400,
                      easing: "inOutQuart",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|7871eb9d-187e-6140-1607-3dae8e8808d9",
                      },
                      yValue: -100,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-139-n-26",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 4400,
                      easing: "inOutQuart",
                      duration: 500,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|7871eb9d-187e-6140-1607-3dae8e8808d9",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-139-n-27",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 4500,
                      easing: "inOutExpo",
                      duration: 1e3,
                      target: {
                        selector: ".load-wrapper",
                        selectorGuids: ["e4cac13d-aa6b-ec49-0f06-95b759890068"],
                      },
                      yValue: 100,
                      xUnit: "PX",
                      yUnit: "vh",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-139-n-28",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 4800,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e608705",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-139-n-29",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 4800,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|06e4c0f5-ac5c-3bb5-b3af-9de2e4a0d400",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-139-n-30",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 4800,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|94fde4fa-43d5-1b6d-47d3-8eea41608e91",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-139-n-31",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 5e3,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|8cc462ba-2ae2-e655-5eca-bfa87e9d9fd9",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-139-n-32",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 5e3,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e60870f",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-139-n-33",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 5e3,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|87c233cf-f1a3-72bf-cf2c-92a1a4b60bba",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-139-n-34",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 5200,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|d50b4bfb-cd58-6208-e28a-0111e0f034d6",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-139-n-35",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 5200,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e60871c",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-139-n-36",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 5200,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e60871c",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-139-n-37",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 5200,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e608718",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-139-n-38",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 5200,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e608718",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-139-n-39",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 5200,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|32640830-ee85-2cfd-3b3b-9287cac19ee6",
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-139-n-40",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 5200,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e608711",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-139-n-41",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 5200,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|651266b1-ca34-8285-6d9c-dd8718e29e6f",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-139-n-42",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 5300,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e60871e",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-139-n-43",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 5300,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e60871e",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "rem",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-139-n-44",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 5400,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e608720",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-139-n-45",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 5400,
                      easing: "inOutQuart",
                      duration: 1e3,
                      target: {
                        id: "65af9f0cabbaf2f9644deb4a|a5e9ce1a-dc41-a502-5ab4-74a54e608720",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x18e324f8522,
          },
          slideInBottom: {
            id: "slideInBottom",
            useFirstGroupAsInitialState: !0,
            actionItemGroups: [
              {
                actionItems: [
                  {
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      duration: 0,
                      target: {
                        id: "N/A",
                        appliesTo: "TRIGGER_ELEMENT",
                        useEventTarget: !0,
                      },
                      value: 0,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      duration: 0,
                      target: {
                        id: "N/A",
                        appliesTo: "TRIGGER_ELEMENT",
                        useEventTarget: !0,
                      },
                      xValue: 0,
                      yValue: 100,
                      xUnit: "PX",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 1e3,
                      target: {
                        id: "N/A",
                        appliesTo: "TRIGGER_ELEMENT",
                        useEventTarget: !0,
                      },
                      xValue: 0,
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 1e3,
                      target: {
                        id: "N/A",
                        appliesTo: "TRIGGER_ELEMENT",
                        useEventTarget: !0,
                      },
                      value: 1,
                    },
                  },
                ],
              },
            ],
          },
          pluginLottie: {
            id: "pluginLottie",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        id: "N/A",
                        appliesTo: "TRIGGER_ELEMENT",
                        useEventTarget: !0,
                      },
                      value: 0,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: "auto",
                      target: {
                        id: "N/A",
                        appliesTo: "TRIGGER_ELEMENT",
                        useEventTarget: !0,
                      },
                      value: 100,
                    },
                  },
                ],
              },
            ],
          },
          pluginLottieReverse: {
            id: "pluginLottieReverse",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        id: "N/A",
                        appliesTo: "TRIGGER_ELEMENT",
                        useEventTarget: !0,
                      },
                      value: 100,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: "auto",
                      target: {
                        id: "N/A",
                        appliesTo: "TRIGGER_ELEMENT",
                        useEventTarget: !0,
                      },
                      value: 0,
                    },
                  },
                ],
              },
            ],
          },
        },
        site: {
          mediaQueries: [
            { key: "main", min: 992, max: 1e4 },
            { key: "medium", min: 768, max: 991 },
            { key: "small", min: 480, max: 767 },
            { key: "tiny", min: 0, max: 479 },
          ],
        },
      });
    },
  },
]);
