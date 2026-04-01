// For license information, see `https://assets.adobedtm.com/ee4236cad46a/09883cc0a4ab/launch-5db81b245bbe.js`.
(window._satellite = window._satellite || {}),
  (window._satellite.container = {
    buildInfo: {
      minified: !0,
      buildDate: "2025-11-10T00:50:44Z",
      turbineBuildDate: "2024-08-22T17:32:44Z",
      turbineVersion: "28.0.0",
    },
    environment: {
      id: "ENf105a066bb07440bb29f019d65787588",
      stage: "production",
    },
    dataElements: {
      WT_mcid: {
        defaultValue: "",
        storageDuration: "pageview",
        modulePath: "core/src/lib/dataElements/queryStringParameter.js",
        settings: { name: "WT.mc_id", caseInsensitive: !0 },
      },
    },
    extensions: {
      "adobe-analytics": {
        displayName: "Adobe Analytics",
        hostedLibFilesBaseUrl:
          "https://assets.adobedtm.com/extensions/EP31dbb9c60e404ba1aa6e746d49be6f29/",
        settings: {
          orgId: "19B827E253DA9DA10A490D4E@AdobeOrg",
          libraryCode: {
            type: "managed",
            accounts: {
              staging: ["bgc3-btenew-ppe"],
              production: ["bgc3-btenew-prod"],
              development: ["bgc3-btenew-ppe"],
            },
            useActivityMap: !0,
            scopeTrackerGlobally: !0,
          },
          trackerProperties: {
            server: "window.location.host",
            pageURL: "window.location.href",
            pageName: "window.location.pathname",
            currencyCode: "USD",
            trackInlineStats: !0,
            trackDownloadLinks: !0,
            trackExternalLinks: !0,
            linkDownloadFileTypes: [
              "doc",
              "docx",
              "eps",
              "jpg",
              "png",
              "svg",
              "xls",
              "ppt",
              "pptx",
              "pdf",
              "xlsx",
              "tab",
              "csv",
              "zip",
              "txt",
              "vsd",
              "vxd",
              "xml",
              "js",
              "css",
              "rar",
              "exe",
              "wma",
              "mov",
              "avi",
              "wmv",
              "mp3",
              "wav",
              "m4v",
            ],
          },
        },
        modules: {
          "adobe-analytics/src/lib/actions/sendBeacon.js": {
            name: "send-beacon",
            displayName: "Send Beacon",
            script: function (e, t, n, r) {
              "use strict";
              var o = n("../sharedModules/getTracker"),
                i = n("../helpers/getNodeLinkText"),
                a = function (e) {
                  return e && e.nodeName && "a" === e.nodeName.toLowerCase();
                },
                s = function (e) {
                  return a(e) ? i(e) : "link clicked";
                },
                c = function (e, t, n) {
                  if ("page" === t.type)
                    r.logger.info("Firing page view beacon."), e.t();
                  else {
                    var o = {
                      linkType: t.linkType || "o",
                      linkName: t.linkName || s(n),
                    };
                    r.logger.info(
                      "Firing link track beacon using the values: " +
                        JSON.stringify(o) +
                        "."
                    ),
                      e.tl(a(n) ? n : "true", o.linkType, o.linkName);
                  }
                };
              e.exports = function (e, t) {
                return o().then(
                  function (n) {
                    c(n, e, t.element);
                  },
                  function (e) {
                    r.logger.error("Cannot send beacon: " + e);
                  }
                );
              };
            },
          },
          "adobe-analytics/src/lib/actions/setVariables.js": {
            name: "set-variables",
            displayName: "Set Variables",
            script: function (e, t, n, r) {
              "use strict";
              var o = n("../sharedModules/getTracker"),
                i = n("../helpers/applyTrackerVariables");
              e.exports = function (e, t) {
                return o().then(
                  function (n) {
                    r.logger.info("Set variables on the tracker."),
                      i(n, e.trackerProperties),
                      e.customSetup &&
                        e.customSetup.source &&
                        e.customSetup.source.call(t.element, t, n);
                  },
                  function (e) {
                    r.logger.error("Cannot set variables: " + e);
                  }
                );
              };
            },
          },
          "adobe-analytics/src/lib/sharedModules/getTracker.js": {
            script: function (e, t, n, r) {
              "use strict";
              var o,
                i = n("@adobe/reactor-cookie"),
                a = n("@adobe/reactor-promise"),
                s = n("@adobe/reactor-window"),
                c = n("../helpers/settingsHelper"),
                l = n("../helpers/augmenters"),
                d = n("../helpers/applyTrackerVariables"),
                u = n("../helpers/loadLibrary"),
                p = n("../helpers/generateVersion")(
                  r.buildInfo.turbineBuildDate
                ),
                g = "beforeSettings",
                f = r.getSharedModule("adobe-mcid", "mcid-instance"),
                m = function (e) {
                  return !e || "true" === i.get(e);
                },
                h = function (e) {
                  return a
                    .all(
                      l.map(function (t) {
                        var n;
                        try {
                          n = t(e);
                        } catch (e) {
                          setTimeout(function () {
                            throw e;
                          });
                        }
                        return a.resolve(n);
                      })
                    )
                    .then(function () {
                      return e;
                    });
                },
                y = function (e) {
                  return (
                    f &&
                      (r.logger.info("Setting MCID instance on the tracker."),
                      (e.visitor = f)),
                    e
                  );
                },
                v = function (e) {
                  return (
                    r.logger.info('Setting version on tracker: "' + p + '".'),
                    void 0 !== e.tagContainerMarker
                      ? (e.tagContainerMarker = p)
                      : "string" == typeof e.version &&
                        e.version.substring(e.version.length - 5) !== "-" + p &&
                        (e.version += "-" + p),
                    e
                  );
                },
                b = function (e, t, n) {
                  return (
                    t.loadPhase === g &&
                      t.source &&
                      (r.logger.info("Calling custom script before settings."),
                      t.source.call(s, n)),
                    d(n, e || {}),
                    t.loadPhase !== g &&
                      t.source &&
                      (r.logger.info("Calling custom script after settings."),
                      t.source.call(s, n)),
                    n
                  );
                },
                w = function (e, t) {
                  return (
                    c.isAudienceManagementEnabled(e) &&
                      (t.loadModule("AudienceManagement"),
                      r.logger.info("Initializing AudienceManagement module"),
                      t.AudienceManagement.setup(
                        e.moduleProperties.audienceManager.config
                      )),
                    t
                  );
                },
                E =
                  ((o = r.getExtensionSettings()),
                  m(o.trackingCookieName)
                    ? u(o)
                        .then(h)
                        .then(y)
                        .then(v)
                        .then(
                          b.bind(null, o.trackerProperties, o.customSetup || {})
                        )
                        .then(w.bind(null, o))
                    : a.reject(
                        "EU compliance was not acknowledged by the user."
                      ));
              e.exports = function () {
                return E;
              };
            },
            name: "get-tracker",
            shared: !0,
          },
          "adobe-analytics/src/lib/sharedModules/augmentTracker.js": {
            name: "augment-tracker",
            shared: !0,
            script: function (e, t, n) {
              "use strict";
              var r = n("../helpers/augmenters");
              e.exports = function (e) {
                r.push(e);
              };
            },
          },
          "adobe-analytics/src/lib/helpers/getNodeLinkText.js": {
            script: function (e) {
              "use strict";
              var t = function (e) {
                  return e && e.replace(/\s+/g, " ").trim();
                },
                n = /^(SCRIPT|STYLE|LINK|CANVAS|NOSCRIPT|#COMMENT)$/i,
                r = function (e) {
                  return !(e && e.nodeName && e.nodeName.match(n));
                },
                o = function (e) {
                  var t = [],
                    n = !1;
                  return (
                    r(e)
                      ? (t.push(e),
                        e.childNodes &&
                          Array.prototype.slice
                            .call(e.childNodes)
                            .forEach(function (e) {
                              var r = o(e);
                              (t = t.concat(r.supportedNodes)),
                                (n = n || r.includesUnsupportedNodes);
                            }))
                      : (n = !0),
                    { supportedNodes: t, includesUnsupportedNodes: n }
                  );
                },
                i = function (e, t, n) {
                  var r;
                  return (
                    (n && n !== e.nodeName.toUpperCase()) ||
                      (r = e.getAttribute(t)),
                    r
                  );
                };
              e.exports = function (e) {
                var n = t(e.innerText || e.textContent),
                  r = o(e);
                if (!n || r.includesUnsupportedNodes) {
                  var a,
                    s,
                    c,
                    l,
                    d = [];
                  r.supportedNodes.forEach(function (e) {
                    e.getAttribute &&
                      ((a = a || t(e.getAttribute("alt"))),
                      (s = s || t(e.getAttribute("title"))),
                      (c = c || t(i(e, "value", "INPUT"))),
                      (l = l || t(i(e, "src", "IMG")))),
                      e.nodeValue && d.push(e.nodeValue);
                  }),
                    (n = t(d.join(""))) || (n = t(a || s || c || l || ""));
                }
                return n;
              };
            },
          },
          "adobe-analytics/src/lib/helpers/settingsHelper.js": {
            script: function (e, t, n, r) {
              "use strict";
              var o = n("@adobe/reactor-window"),
                i = {
                  LIB_TYPES: {
                    MANAGED: "managed",
                    PREINSTALLED: "preinstalled",
                    REMOTE: "remote",
                    CUSTOM: "custom",
                  },
                  MANAGED_LIB_PATHS: {
                    APP_MEASUREMENT: "AppMeasurement.js",
                    ACTIVITY_MAP: "AppMeasurement_Module_ActivityMap.js",
                    AUDIENCE_MANAGEMENT:
                      "AppMeasurement_Module_AudienceManagement.js",
                  },
                  getReportSuites: function (e) {
                    var t = e.production;
                    return (
                      e[r.environment.stage] && (t = e[r.environment.stage]),
                      t.join(",")
                    );
                  },
                  isActivityMapEnabled: function (e) {
                    return !(
                      e.libraryCode &&
                      !e.libraryCode.useActivityMap &&
                      !1 === e.libraryCode.useActivityMap
                    );
                  },
                  isAudienceManagementEnabled: function (e) {
                    var t = !1;
                    return (
                      e &&
                        e.moduleProperties &&
                        e.moduleProperties.audienceManager &&
                        e.moduleProperties.audienceManager.config &&
                        o &&
                        o._satellite &&
                        o._satellite.company &&
                        o._satellite.company.orgId &&
                        (t = !0),
                      t
                    );
                  },
                };
              e.exports = i;
            },
          },
          "adobe-analytics/src/lib/helpers/augmenters.js": {
            script: function (e) {
              "use strict";
              e.exports = [];
            },
          },
          "adobe-analytics/src/lib/helpers/applyTrackerVariables.js": {
            script: function (e, t, n, r) {
              "use strict";
              var o = n("@adobe/reactor-query-string"),
                i = n("@adobe/reactor-window"),
                a = /eVar([0-9]+)/,
                s = /prop([0-9]+)/,
                c = new RegExp(
                  "^(eVar[0-9]+)|(prop[0-9]+)|(hier[0-9]+)|campaign|purchaseID|channel|server|state|zip|pageType$"
                ),
                l = function (e, t, n) {
                  return n.indexOf(e) === t;
                },
                d = function (e, t, n) {
                  var r = Object.keys(t).filter(c.test.bind(c));
                  return (
                    n && r.push("events"),
                    (r = r.concat((e.linkTrackVars || "").split(",")))
                      .filter(function (e, t) {
                        return "None" !== e && e && l(e, t, r);
                      })
                      .join(",")
                  );
                },
                u = function (e, t) {
                  var n = t.map(function (e) {
                    return e.name;
                  });
                  return (n = n.concat((e.linkTrackEvents || "").split(",")))
                    .filter(function (e, t) {
                      return "None" !== e && l(e, t, n);
                    })
                    .join(",");
                },
                p = function (e, t, n) {
                  e[t] = n[t].join(",");
                },
                g = function (e, t, n) {
                  var r = n.dynamicVariablePrefix || "D=";
                  n[t].forEach(function (t) {
                    var n;
                    if ("value" === t.type) n = t.value;
                    else {
                      var o = a.exec(t.value);
                      if (o) n = r + "v" + o[1];
                      else {
                        var i = s.exec(t.value);
                        i && (n = r + "c" + i[1]);
                      }
                    }
                    e[t.name] = n;
                  });
                },
                f = {
                  linkDownloadFileTypes: p,
                  linkExternalFilters: p,
                  linkInternalFilters: p,
                  hierarchies: function (e, t, n) {
                    n[t].forEach(function (t) {
                      e[t.name] = t.sections.join(t.delimiter);
                    });
                  },
                  props: g,
                  eVars: g,
                  campaign: function (e, t, n) {
                    if ("queryParam" === n[t].type) {
                      var r = o.parse(i.location.search);
                      e[t] = r[n[t].value];
                    } else e[t] = n[t].value;
                  },
                  events: function (e, t, n) {
                    var r = n[t].map(function (e) {
                      var t = e.name;
                      return (
                        e.id && (t = [t, e.id].join(":")),
                        e.value && (t = [t, e.value].join("=")),
                        t
                      );
                    });
                    e[t] = r.join(",");
                  },
                };
              e.exports = function (e, t) {
                var n = {};
                (t = t || {}),
                  Object.keys(t).forEach(function (e) {
                    var r = f[e],
                      o = t[e];
                    r ? r(n, e, t) : (n[e] = o);
                  }),
                  n.events &&
                    e.events &&
                    e.events.length > 0 &&
                    (n.events = e.events + "," + n.events);
                var o = t && t.events && t.events.length > 0,
                  i = d(e, n, o);
                i && (n.linkTrackVars = i);
                var a = u(e, t.events || []);
                a && (n.linkTrackEvents = a),
                  r.logger.info(
                    'Applying the following properties on tracker: "' +
                      JSON.stringify(n) +
                      '".'
                  ),
                  Object.keys(n).forEach(function (t) {
                    e[t] = n[t];
                  });
              };
            },
          },
          "adobe-analytics/src/lib/helpers/loadLibrary.js": {
            script: function (e, t, n, r) {
              "use strict";
              var o = n("@adobe/reactor-load-script"),
                i = n("@adobe/reactor-window"),
                a = n("@adobe/reactor-promise"),
                s = n("./settingsHelper"),
                c = n("./pollHelper"),
                l = function (e, t) {
                  if (!i.s_gi)
                    throw new Error(
                      "Unable to create AppMeasurement tracker, `s_gi` function not found." +
                        i.AppMeasurement
                    );
                  r.logger.info(
                    'Creating AppMeasurement tracker with these report suites: "' +
                      t +
                      '"'
                  );
                  var n = i.s_gi(t);
                  return (
                    e.libraryCode.scopeTrackerGlobally &&
                      (r.logger.info("Setting the tracker as window.s"),
                      (i.s = n)),
                    n
                  );
                },
                d = function (e) {
                  var t = [];
                  switch (e.libraryCode.type) {
                    case s.LIB_TYPES.MANAGED:
                      t.push(
                        r.getHostedLibFileUrl(
                          s.MANAGED_LIB_PATHS.APP_MEASUREMENT
                        )
                      ),
                        s.isActivityMapEnabled(e) &&
                          t.push(
                            r.getHostedLibFileUrl(
                              s.MANAGED_LIB_PATHS.ACTIVITY_MAP
                            )
                          );
                      break;
                    case s.LIB_TYPES.CUSTOM:
                      t.push(e.libraryCode.source);
                      break;
                    case s.LIB_TYPES.REMOTE:
                      t.push(
                        "https:" === i.location.protocol
                          ? e.libraryCode.httpsUrl
                          : e.libraryCode.httpUrl
                      );
                  }
                  if (s.isAudienceManagementEnabled(e)) {
                    var n = { namespace: i._satellite.company.orgId };
                    (e.moduleProperties.audienceManager.config.visitorService =
                      n),
                      t.push(
                        r.getHostedLibFileUrl(
                          s.MANAGED_LIB_PATHS.AUDIENCE_MANAGEMENT
                        )
                      );
                  }
                  return t;
                },
                u = function (e) {
                  return a.all(
                    d(e).map(function (e) {
                      return r.logger.info("Loading script: " + e), o(e);
                    })
                  );
                },
                p = function (e, t) {
                  if (e.libraryCode.accounts)
                    if (t.sa) {
                      var n = s.getReportSuites(e.libraryCode.accounts);
                      r.logger.info(
                        'Setting the following report suites on the tracker: "' +
                          n +
                          '"'
                      ),
                        t.sa(n);
                    } else
                      r.logger.warn(
                        "Cannot set report suites on tracker. `sa` method not available."
                      );
                  return t;
                },
                g = function (e) {
                  if (i[e])
                    return (
                      r.logger.info('Found tracker located at: "' + e + '".'),
                      i[e]
                    );
                  throw new Error(
                    'Cannot find the global variable name: "' + e + '".'
                  );
                };
              e.exports = function (e) {
                var t = u(e);
                switch (e.libraryCode.type) {
                  case s.LIB_TYPES.MANAGED:
                    var n = s.getReportSuites(e.libraryCode.accounts);
                    return t.then(l.bind(null, e, n));
                  case s.LIB_TYPES.PREINSTALLED:
                    return t
                      .then(
                        c.poll.bind(null, i, e.libraryCode.trackerVariableName)
                      )
                      .then(p.bind(null, e));
                  case s.LIB_TYPES.CUSTOM:
                  case s.LIB_TYPES.REMOTE:
                    return t
                      .then(g.bind(null, e.libraryCode.trackerVariableName))
                      .then(p.bind(null, e));
                  default:
                    throw new Error("Cannot load library. Type not supported.");
                }
              };
            },
          },
          "adobe-analytics/src/lib/helpers/generateVersion.js": {
            script: function (e) {
              "use strict";
              var t = 8,
                n = function (e) {
                  return e.getUTCDate().toString(36);
                },
                r = function (e) {
                  return e.substr(e.length - 1);
                },
                o = function (e) {
                  return Math.floor(e.getUTCHours() / t);
                },
                i = function (e) {
                  var t = (e.getUTCMonth() + 1 + 12 * o(e)).toString(36);
                  return r(t);
                },
                a = function (e) {
                  return (e.getUTCFullYear() - 2010).toString(36);
                };
              e.exports = function (e) {
                var t = new Date(e);
                if (isNaN(t)) throw new Error("Invalid date provided");
                return ("L" + a(t) + i(t) + n(t)).toUpperCase();
              };
            },
          },
          "adobe-analytics/src/lib/helpers/pollHelper.js": {
            script: function (e, t, n, r) {
              "use strict";
              var o = n("@adobe/reactor-promise"),
                i = 40,
                a = 250,
                s = function (e, t, n) {
                  r.logger.info('Found property located at: "' + t + '"].'),
                    e(n);
                },
                c = function (e, t) {
                  return new o(function (n, r) {
                    if (e[t]) return s(n, t, e[t]);
                    var o = 1,
                      c = setInterval(function () {
                        e[t] && (s(n, t, e[t]), clearInterval(c)),
                          o >= i &&
                            (clearInterval(c),
                            r(
                              new Error(
                                'Bailing out. Cannot find the variable name: "' +
                                  t +
                                  '"].'
                              )
                            )),
                          o++;
                      }, a);
                  });
                };
              e.exports = {
                poll: function (e, t) {
                  return (
                    r.logger.info(
                      'Waiting for the property to become accessible at: "' +
                        t +
                        '"].'
                    ),
                    c(e, t)
                  );
                },
              };
            },
          },
        },
      },
      "adobe-alloy": {
        displayName: "Adobe Experience Platform Web SDK",
        hostedLibFilesBaseUrl:
          "https://assets.adobedtm.com/extensions/EPf014ed2967c745c5ba3a2e04de817f0a/",
        settings: {
          instances: [
            {
              name: "alloy",
              edgeConfigId: "2d667408-b605-4e4f-acc0-3e1b984b8a67",
              idMigrationEnabled: !1,
              stagingEdgeConfigId: "1b59155e-2de5-4a2f-87fe-f2c5b1c780f0",
              developmentEdgeConfigId: "1b59155e-2de5-4a2f-87fe-f2c5b1c780f0",
            },
          ],
          components: { eventMerge: !1 },
        },
        modules: {
          "adobe-alloy/dist/lib/instanceManager/index.js": {
            script: function (e, t, n, r) {
              "use strict";
              var o;
              const {
                  createCustomInstance: i,
                  createEventMergeId: a,
                  components: s,
                } = n("../alloy"),
                c = n("./createInstanceManager"),
                l = n("./injectWrapOnBeforeEventSend"),
                d = n("../utils/createGetConfigOverrides"),
                u = l({ version: "2.31.0" });
              e.exports = c({
                turbine: r,
                window: window,
                createCustomInstance: i,
                components: s,
                createEventMergeId: a,
                orgId: _satellite.company.orgId,
                wrapOnBeforeEventSend: u,
                getConfigOverrides: d(
                  null === (o = r.environment) || void 0 === o
                    ? void 0
                    : o.stage
                ),
              });
            },
          },
          "adobe-alloy/dist/lib/alloy.js": {
            script: function (e, t) {
              "use strict";
              function n(e) {
                for (var t = 1; t < arguments.length; t++) {
                  var n = arguments[t];
                  for (var r in n) e[r] = n[r];
                }
                return e;
              }
              function r(e, t) {
                function o(r, o, i) {
                  if ("undefined" != typeof document) {
                    "number" == typeof (i = n({}, t, i)).expires &&
                      (i.expires = new Date(Date.now() + 864e5 * i.expires)),
                      i.expires && (i.expires = i.expires.toUTCString()),
                      (r = encodeURIComponent(r)
                        .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
                        .replace(/[()]/g, escape));
                    var a = "";
                    for (var s in i)
                      i[s] &&
                        ((a += "; " + s),
                        !0 !== i[s] && (a += "=" + i[s].split(";")[0]));
                    return (document.cookie = r + "=" + e.write(o, r) + a);
                  }
                }
                function i(t) {
                  if (
                    "undefined" != typeof document &&
                    (!arguments.length || t)
                  ) {
                    for (
                      var n = document.cookie
                          ? document.cookie.split("; ")
                          : [],
                        r = {},
                        o = 0;
                      o < n.length;
                      o++
                    ) {
                      var i = n[o].split("="),
                        a = i.slice(1).join("=");
                      try {
                        var s = decodeURIComponent(i[0]);
                        if (((r[s] = e.read(a, s)), t === s)) break;
                      } catch (e) {}
                    }
                    return t ? r[t] : r;
                  }
                }
                return Object.create(
                  {
                    set: o,
                    get: i,
                    remove: function (e, t) {
                      o(e, "", n({}, t, { expires: -1 }));
                    },
                    withAttributes: function (e) {
                      return r(this.converter, n({}, this.attributes, e));
                    },
                    withConverter: function (e) {
                      return r(n({}, this.converter, e), this.attributes);
                    },
                  },
                  {
                    attributes: { value: Object.freeze(t) },
                    converter: { value: Object.freeze(e) },
                  }
                );
              }
              function o(e, t = 0) {
                return (
                  we[e[t + 0]] +
                  we[e[t + 1]] +
                  we[e[t + 2]] +
                  we[e[t + 3]] +
                  "-" +
                  we[e[t + 4]] +
                  we[e[t + 5]] +
                  "-" +
                  we[e[t + 6]] +
                  we[e[t + 7]] +
                  "-" +
                  we[e[t + 8]] +
                  we[e[t + 9]] +
                  "-" +
                  we[e[t + 10]] +
                  we[e[t + 11]] +
                  we[e[t + 12]] +
                  we[e[t + 13]] +
                  we[e[t + 14]] +
                  we[e[t + 15]]
                ).toLowerCase();
              }
              function i() {
                if (!Ee) {
                  if ("undefined" == typeof crypto || !crypto.getRandomValues)
                    throw new Error(
                      "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
                    );
                  Ee = crypto.getRandomValues.bind(crypto);
                }
                return Ee(ke);
              }
              function a(e, t, n) {
                if (Ce.randomUUID && !t && !e) return Ce.randomUUID();
                const r = (e = e || {}).random ?? e.rng?.() ?? i();
                if (r.length < 16)
                  throw new Error("Random bytes length must be >= 16");
                if (
                  ((r[6] = (15 & r[6]) | 64), (r[8] = (63 & r[8]) | 128), t)
                ) {
                  if ((n = n || 0) < 0 || n + 16 > t.length)
                    throw new RangeError(
                      `UUID byte range ${n}:${n + 15} is out of buffer bounds`
                    );
                  for (let e = 0; e < 16; ++e) t[n + e] = r[e];
                  return t;
                }
                return o(r);
              }
              function s(e) {
                return e &&
                  e.__esModule &&
                  Object.prototype.hasOwnProperty.call(e, "default")
                  ? e.default
                  : e;
              }
              function c() {
                if (cn) return sn;
                cn = 1;
                var e = function (e) {
                    var t = {};
                    if (!e || "string" != typeof e) return t;
                    var n = e.trim().replace(/^[?#&]/, ""),
                      r = new URLSearchParams(n),
                      o = r.keys();
                    do {
                      var i = o.next(),
                        a = i.value;
                      if (a) {
                        var s = r.getAll(a);
                        1 === s.length ? (t[a] = s[0]) : (t[a] = s);
                      }
                    } while (!1 === i.done);
                    return t;
                  },
                  t = function (e) {
                    var t = "{{space}}",
                      n = new URLSearchParams();
                    return (
                      Object.keys(e).forEach(function (r) {
                        var o = e[r];
                        "string" == typeof e[r]
                          ? (o = o.replace(/ /g, t))
                          : ["object", "undefined"].includes(typeof o) &&
                            !Array.isArray(o) &&
                            (o = ""),
                          Array.isArray(o)
                            ? o.forEach(function (e) {
                                n.append(r, e);
                              })
                            : n.append(r, o);
                      }),
                      n
                        .toString()
                        .replace(new RegExp(encodeURIComponent(t), "g"), "%20")
                    );
                  };
                return (
                  (sn = {
                    parse: function (t) {
                      return e(t);
                    },
                    stringify: function (e) {
                      return t(e);
                    },
                  }),
                  sn
                );
              }
              function l(e) {
                return "object" == typeof e || void 0 === e;
              }
              function d() {
                return {
                  matches: (e, t, n = []) => {
                    if (l(e[t])) return !1;
                    const r = String(e[t]).toLowerCase();
                    for (let e = 0; e < n.length; e += 1)
                      if (!l(n[e]) && r === String(n[e]).toLowerCase())
                        return !0;
                    return !1;
                  },
                };
              }
              function u() {
                return {
                  matches: (e, t, n = []) => {
                    if (l(e[t])) return !1;
                    const r = String(e[t]).toLowerCase();
                    for (let e = 0; e < n.length; e += 1)
                      if (!l(n[e]) && r === String(n[e]).toLowerCase())
                        return !1;
                    return !0;
                  },
                };
              }
              function p() {
                return { matches: (e, t) => void 0 !== e[t] && null !== e[t] };
              }
              function g() {
                return { matches: (e, t) => void 0 === e[t] || null === e[t] };
              }
              function f(e) {
                return "number" == typeof e;
              }
              function m() {
                return {
                  matches: (e, t, n = []) => {
                    const r = e[t];
                    if (!f(r)) return !1;
                    for (let e = 0; e < n.length; e += 1)
                      if (f(n[e]) && r > n[e]) return !0;
                    return !1;
                  },
                };
              }
              function h() {
                return {
                  matches: (e, t, n = []) => {
                    const r = e[t];
                    if (!f(r)) return !1;
                    for (let e = 0; e < n.length; e += 1)
                      if (f(n[e]) && r >= n[e]) return !0;
                    return !1;
                  },
                };
              }
              function y() {
                return {
                  matches: (e, t, n = []) => {
                    const r = e[t];
                    if (!f(r)) return !1;
                    for (let e = 0; e < n.length; e += 1)
                      if (f(n[e]) && r < n[e]) return !0;
                    return !1;
                  },
                };
              }
              function v() {
                return {
                  matches: (e, t, n = []) => {
                    const r = e[t];
                    if (!f(r)) return !1;
                    for (let e = 0; e < n.length; e += 1)
                      if (f(n[e]) && r <= n[e]) return !0;
                    return !1;
                  },
                };
              }
              function b() {
                return {
                  matches: (e, t, n = []) => {
                    if (l(e[t])) return !1;
                    const r = String(e[t]).toLowerCase();
                    for (let e = 0; e < n.length; e += 1)
                      if (
                        !l(n[e]) &&
                        -1 !== r.indexOf(String(n[e]).toLowerCase())
                      )
                        return !0;
                    return !1;
                  },
                };
              }
              function w() {
                return {
                  matches: (e, t, n = []) => {
                    if (l(e[t])) return !1;
                    const r = String(e[t]).toLowerCase();
                    for (let e = 0; e < n.length; e += 1)
                      if (
                        !l(n[e]) &&
                        -1 !== r.indexOf(String(n[e]).toLowerCase())
                      )
                        return !1;
                    return !0;
                  },
                };
              }
              function E() {
                return {
                  matches: (e, t, n = []) => {
                    if (l(e[t])) return !1;
                    const r = String(e[t]).toLowerCase();
                    for (let e = 0; e < n.length; e += 1)
                      if (!l(n[e]) && r.startsWith(String(n[e]).toLowerCase()))
                        return !0;
                    return !1;
                  },
                };
              }
              function k() {
                return {
                  matches: (e, t, n = []) => {
                    if (l(e[t])) return !1;
                    const r = String(e[t]).toLowerCase();
                    for (let e = 0; e < n.length; e += 1)
                      if (!l(n[e]) && r.endsWith(n[e].toLowerCase())) return !0;
                    return !1;
                  },
                };
              }
              function C(e) {
                return Lp[e];
              }
              function S(e) {
                return void 0 === e;
              }
              function I(e, t, n, r = 0, o = 1 / 0) {
                return e.reduce((e, i) => {
                  try {
                    const a = n.generateEventHash(Vp(i)),
                      s = t.events[a];
                    if (!s) return e;
                    const { timestamps: c = [] } = s;
                    return e + c.filter((e) => e >= r && e <= o).length;
                  } catch {
                    return e;
                  }
                }, 0);
              }
              function T(e, t, n, r = 0, o = 1 / 0) {
                try {
                  let i = r;
                  const a = e.every((e) => {
                    const r = n.generateEventHash(Vp(e)),
                      a = t.events[r];
                    if (!a) return !1;
                    const s = a.timestamps[0],
                      c = s >= i && s <= o;
                    return (i = s), c;
                  });
                  return Number(a);
                } catch {
                  return 0;
                }
              }
              function P(e, t, n, r = 0, o = 1 / 0) {
                try {
                  return e.reduce(
                    (e, i, a) => {
                      const s = n.generateEventHash(Vp(i)),
                        c = t.events[s];
                      if (!c) return e;
                      const l = c.timestamps
                        .filter((e) => e >= r && e <= o)
                        .pop();
                      return l && l > e.timestamp
                        ? { index: a, timestamp: l }
                        : e;
                    },
                    { index: -1, timestamp: 0 }
                  ).index;
                } catch {
                  return -1;
                }
              }
              function D(e, t, n) {
                let r = !0;
                for (let o = 0; o < t.length; o += 1)
                  r = r && t[o].evaluate(e, n);
                return r;
              }
              function O(e, t, n) {
                let r = !1;
                for (let o = 0; o < t.length; o += 1)
                  if (((r = r || t[o].evaluate(e, n)), r)) return !0;
                return !1;
              }
              function N(e, t, n) {
                return { version: e, rules: t, metadata: n };
              }
              function A(e, t, n) {
                return {
                  key: n,
                  execute: (n, r) => (e.evaluate(n, r) ? t : []),
                  toString: () => `Rule{condition=${e}, consequences=${t}}`,
                };
              }
              function R(e, t) {
                return {
                  evaluate: (e, n) => t.evaluate(e, n),
                  toString: () => `Condition{type=${e}, definition=${t}}`,
                };
              }
              function x(e, t, n) {
                return { id: e, type: t, detail: n };
              }
              function M(e, t) {
                return {
                  evaluate: (n, r) =>
                    Mp.AND === e ? D(n, t, r) : Mp.OR === e && O(n, t, r),
                };
              }
              function _(e, t, n) {
                return {
                  evaluate: (r) => {
                    const o = C(t);
                    return !!o && o.matches(r, e, n);
                  },
                };
              }
              function L(e, t, n, r, o, i) {
                return {
                  evaluate: (a, s) => {
                    let c;
                    return (
                      (c =
                        _p.MOST_RECENT === i
                          ? P(e, a, s, r, o)
                          : _p.ORDERED === i
                          ? T(e, a, s, r, o)
                          : I(e, a, s, r, o)),
                      Bp(c, t, n)
                    );
                  },
                };
              }
              function j(e) {
                const { key: t, matcher: n, values: r } = e;
                return _(t, n, r);
              }
              function $(e) {
                const { logic: t, conditions: n } = e;
                return M(t, n.map(q));
              }
              function U(e) {
                const {
                  events: t,
                  from: n,
                  to: r,
                  matcher: o,
                  value: i,
                  searchType: a,
                } = e;
                return L(t, o, i, n, r, a);
              }
              function q(e) {
                const { type: t, definition: n } = e;
                if (Rp.MATCHER === t) return R(t, j(n));
                if (Rp.GROUP === t) return R(t, $(n));
                if (Rp.HISTORICAL === t) return R(t, U(n));
                throw new Error("Can not parse condition");
              }
              function B(e) {
                const { id: t, type: n, detail: r } = e;
                return x(t, n, r);
              }
              function F(e) {
                const { condition: t, consequences: n, key: r } = e;
                return A(q(t), n.map(B), r);
              }
              function V(e) {
                if (e)
                  return {
                    provider: e.provider,
                    providerData: Object.assign({}, e.providerData),
                  };
              }
              function H(e) {
                const { version: t, rules: n, metadata: r } = e;
                return N(t, n.map(F), V(r));
              }
              function z(e, t) {
                return {
                  provider: zp,
                  execute: (n) =>
                    e.map((e) => e.execute(n, t)).filter((e) => e.length > 0),
                };
              }
              function G(e) {
                const { providerData: t } = e;
                if (!t) throw new Error("Provider data is missing in metadata");
                const { identityTemplate: n, buckets: r } = t;
                if (!n)
                  throw new Error(
                    "Identity template is missing in provider data"
                  );
                if (!r) throw new Error("Buckets is missing in provider data");
              }
              function J(e) {
                const { xdm: t } = e;
                if (!t) throw new Error("XDM object is missing in the context");
                const { identityMap: n } = t;
                if (!n)
                  throw new Error("Identity map is missing in the XDM object");
                const r = n[Gp];
                if (!r)
                  throw new Error(
                    "ECID identity namespace is missing in the identity map"
                  );
                if (!Array.isArray(r) || 0 === r.length)
                  throw new Error(
                    "ECID identities array is empty or not an array"
                  );
                const o = r[0].id;
                if (!o)
                  throw new Error(
                    "ECID identity is missing in the identities array"
                  );
                return o;
              }
              function W(e, t, n) {
                const { providerData: r } = n,
                  { identityTemplate: o } = r;
                return o.replace(Jp, t).replace(Wp, e);
              }
              function Q(e) {
                return !S(e);
              }
              function Y(e, t = (e) => e[0]) {
                const n = {};
                return function (...r) {
                  const o = t(r);
                  return Q(n[o]) || (n[o] = e(...r)), n[o];
                };
              }
              function X(e, t) {
                const n = 65535 & t;
                return ((((t - n) * e) | 0) + ((n * e) | 0)) | 0;
              }
              function K(e, t = 0) {
                let n;
                const r = e.length,
                  o = 3432918353,
                  i = 461845907;
                let a = t;
                const s = -2 & r;
                for (let t = 0; t < s; t += 2)
                  (n = e.charCodeAt(t) | (e.charCodeAt(t + 1) << 16)),
                    (n = X(n, o)),
                    (n = ((131071 & n) << 15) | (n >>> 17)),
                    (n = X(n, i)),
                    (a ^= n),
                    (a = ((524287 & a) << 13) | (a >>> 19)),
                    (a = (5 * a + 3864292196) | 0);
                return (
                  r % 2 == 1 &&
                    ((n = e.charCodeAt(s)),
                    (n = X(n, o)),
                    (n = ((131071 & n) << 15) | (n >>> 17)),
                    (n = X(n, i)),
                    (a ^= n)),
                  (a ^= r << 1),
                  (a ^= a >>> 16),
                  (a = X(a, 2246822507)),
                  (a ^= a >>> 13),
                  (a = X(a, 3266489909)),
                  (a ^= a >>> 16),
                  a
                );
              }
              function Z(e, t) {
                const n = Qp(e),
                  r = ((Math.abs(n) % t) / t) * Yp;
                return Math.round(r * Yp) / Yp;
              }
              function ee(e, t, n) {
                return { allocation: Xp(e, t), ...n };
              }
              function te(e) {
                const t = {};
                for (let n = 0; n < e.length; n += 1) {
                  const r = e[n];
                  r.key && (t[r.key] || (t[r.key] = []), t[r.key].push(r));
                }
                return t;
              }
              function ne(e, t) {
                return t.map((t) => t.execute(e)).filter((e) => e.length > 0);
              }
              function re(e, t) {
                G(t);
                const n = e.filter((e) => !e.key),
                  r = te(e),
                  { buckets: o } = t.providerData;
                return {
                  provider: Hp,
                  execute: (e) => {
                    const i = J(e),
                      a = ne(e, n),
                      s = Object.keys(r),
                      c = [];
                    for (let n = 0; n < s.length; n += 1) {
                      const a = s[n],
                        l = r[a],
                        d = ne(ee(W(i, a, t), o, e), l);
                      c.push(...d);
                    }
                    return [...a, ...c];
                  },
                };
              }
              function oe(e, t, n) {
                const { provider: r } = t;
                return r === Hp ? re(e, t) : z(e, n);
              }
              function ie(
                e,
                t = {
                  generateEventHash: () => {
                    throw new Error("No hash function provided");
                  },
                }
              ) {
                const { rules: n, metadata: r = {} } = H(e);
                return oe(n, r, t);
              }
              function ae(e) {
                for (var t = 1; t < arguments.length; t++) {
                  var n = arguments[t];
                  for (var r in n) e[r] = n[r];
                }
                return e;
              }
              function se(e, t) {
                function n(n, r, o) {
                  if ("undefined" != typeof document) {
                    "number" == typeof (o = ae({}, t, o)).expires &&
                      (o.expires = new Date(Date.now() + 864e5 * o.expires)),
                      o.expires && (o.expires = o.expires.toUTCString()),
                      (n = encodeURIComponent(n)
                        .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
                        .replace(/[()]/g, escape));
                    var i = "";
                    for (var a in o)
                      o[a] &&
                        ((i += "; " + a),
                        !0 !== o[a] && (i += "=" + o[a].split(";")[0]));
                    return (document.cookie = n + "=" + e.write(r, n) + i);
                  }
                }
                function r(t) {
                  if (
                    "undefined" != typeof document &&
                    (!arguments.length || t)
                  ) {
                    for (
                      var n = document.cookie
                          ? document.cookie.split("; ")
                          : [],
                        r = {},
                        o = 0;
                      o < n.length;
                      o++
                    ) {
                      var i = n[o].split("="),
                        a = i.slice(1).join("=");
                      try {
                        var s = decodeURIComponent(i[0]);
                        if (((r[s] = e.read(a, s)), t === s)) break;
                      } catch (e) {}
                    }
                    return t ? r[t] : r;
                  }
                }
                return Object.create(
                  {
                    set: n,
                    get: r,
                    remove: function (e, t) {
                      n(e, "", ae({}, t, { expires: -1 }));
                    },
                    withAttributes: function (e) {
                      return se(this.converter, ae({}, this.attributes, e));
                    },
                    withConverter: function (e) {
                      return se(ae({}, this.converter, e), this.attributes);
                    },
                  },
                  {
                    attributes: { value: Object.freeze(t) },
                    converter: { value: Object.freeze(e) },
                  }
                );
              }
              function ce(e, t = 0) {
                return (
                  ef[e[t + 0]] +
                  ef[e[t + 1]] +
                  ef[e[t + 2]] +
                  ef[e[t + 3]] +
                  "-" +
                  ef[e[t + 4]] +
                  ef[e[t + 5]] +
                  "-" +
                  ef[e[t + 6]] +
                  ef[e[t + 7]] +
                  "-" +
                  ef[e[t + 8]] +
                  ef[e[t + 9]] +
                  "-" +
                  ef[e[t + 10]] +
                  ef[e[t + 11]] +
                  ef[e[t + 12]] +
                  ef[e[t + 13]] +
                  ef[e[t + 14]] +
                  ef[e[t + 15]]
                ).toLowerCase();
              }
              function le() {
                if (!tf) {
                  if ("undefined" == typeof crypto || !crypto.getRandomValues)
                    throw new Error(
                      "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
                    );
                  tf = crypto.getRandomValues.bind(crypto);
                }
                return tf(nf);
              }
              function de(e) {
                if (rf.randomUUID && !e) return rf.randomUUID();
                const t = (e = e || {}).random ?? e.rng?.() ?? le();
                if (t.length < 16)
                  throw new Error("Random bytes length must be >= 16");
                return (
                  (t[6] = (15 & t[6]) | 64), (t[8] = (63 & t[8]) | 128), ce(t)
                );
              }
              Object.defineProperty(t, "__esModule", { value: !0 }),
                (t.deepAssign =
                  t.createEventMergeId =
                  t.createCustomInstance =
                  t.components =
                    void 0);
              var ue = (e) => null == e,
                pe = (e) => !ue(e) && !Array.isArray(e) && "object" == typeof e,
                ge = (...e) =>
                  e.length < 2
                    ? Object.assign(...e)
                    : e.reduce(
                        (e, t) => (
                          pe(t) &&
                            Object.keys(t).forEach((n) => {
                              Array.isArray(t[n])
                                ? Array.isArray(e[n])
                                  ? e[n].push(...t[n])
                                  : (e[n] = [...t[n]])
                                : (e[n] = t[n]);
                            }),
                          e
                        )
                      ),
                fe = r(
                  {
                    read: function (e) {
                      return (
                        '"' === e[0] && (e = e.slice(1, -1)),
                        e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
                      );
                    },
                    write: function (e) {
                      return encodeURIComponent(e).replace(
                        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
                        decodeURIComponent
                      );
                    },
                  },
                  { path: "/" }
                ),
                me = {
                  get: fe.get.bind(fe),
                  set: fe.set.bind(fe),
                  remove: fe.remove.bind(fe),
                  withConverter: fe.withConverter.bind(fe),
                };
              const he = (e, t) => {
                Object.keys(t).forEach((n) => {
                  pe(e[n]) && pe(t[n]) ? he(e[n], t[n]) : (e[n] = t[n]);
                });
              };
              var ye = (e, ...t) => {
                  if (ue(e))
                    throw new TypeError(
                      'deepAssign "target" cannot be null or undefined'
                    );
                  const n = Object(e);
                  return t.forEach((e) => he(n, Object(e))), n;
                },
                ve = (e, t) => (n) => {
                  const r = t
                    .split(".")
                    .reduce((e, t) => ((e[t] = e[t] || {}), e[t]), e);
                  ye(r, n);
                },
                be = () => {
                  const e = [];
                  return {
                    add(t) {
                      e.push(t);
                    },
                    call: (...t) => Promise.all(e.map((e) => e(...t))),
                  };
                };
              const we = [];
              for (let e = 0; e < 256; ++e)
                we.push((e + 256).toString(16).slice(1));
              let Ee;
              const ke = new Uint8Array(16);
              var Ce = {
                  randomUUID:
                    "undefined" != typeof crypto &&
                    crypto.randomUUID &&
                    crypto.randomUUID.bind(crypto),
                },
                Se = () => ({ eventMergeId: a() }),
                Ie = ({ logger: e, cookieJar: t }) => ({
                  ...t,
                  set(n, r, o) {
                    e.info("Setting cookie", { name: n, value: r, ...o }),
                      t.set(n, r, o);
                  },
                }),
                Te = () => {
                  let e = 0,
                    t = Promise.resolve();
                  return {
                    addTask(n) {
                      e += 1;
                      const r = () =>
                        n().finally(() => {
                          e -= 1;
                        });
                      return (t = t.then(r, r)), t;
                    },
                    get length() {
                      return e;
                    },
                  };
                },
                Pe = () => {
                  const e = {};
                  return (
                    (e.promise = new Promise((t, n) => {
                      (e.resolve = t), (e.reject = n);
                    })),
                    e
                  );
                };
              const De = (e, t) => e === t,
                Oe = (e, t, n) => {
                  for (let r = 0; r < e.length; r += 1)
                    if (n(e[r], t)) return r;
                  return -1;
                };
              var Ne = (e, t = De) => e.filter((n, r) => Oe(e, n, t) === r),
                Ae = (e, t) => e.appendChild(t);
              const Re = (e, t) => {
                Object.keys(t).forEach((n) => {
                  if ("style" === n && pe(t[n])) {
                    const r = t[n];
                    Object.keys(r).forEach((t) => {
                      e.style[t] = r[t];
                    });
                  } else e[n] = t[n];
                });
              };
              var xe = (e, t = {}, n = {}, r = [], o = document) => {
                const i = o.createElement(e);
                return (
                  Object.keys(t).forEach((e) => {
                    i.setAttribute(e, t[e]);
                  }),
                  Re(i, n),
                  r.forEach((e) => Ae(i, e)),
                  i
                );
              };
              const Me = "BODY",
                _e = "IFRAME",
                Le = "IMG",
                je = "DIV",
                $e = "STYLE",
                Ue = "SCRIPT",
                qe = "HEAD";
              var Be = ({ src: e, currentDocument: t = document }) =>
                  new Promise((n, r) => {
                    xe(
                      Le,
                      { src: e },
                      { onload: n, onerror: r, onabort: r },
                      [],
                      t
                    );
                  }),
                Fe = (e) => "function" == typeof e,
                Ve = (e) => Array.isArray(e) && e.length > 0,
                He = (e) =>
                  Array.isArray(e) ? e : null == e ? [] : [].slice.call(e);
              const ze = /^\s*>/;
              var Ge = (e, t) =>
                  ze.test(t)
                    ? He(e.querySelectorAll(`:scope ${t}`))
                    : He(e.querySelectorAll(t)),
                Je = ":shadow";
              const We = (e) => e.split(Je),
                Qe = (e, t) => {
                  const n = t;
                  return n.startsWith(">")
                    ? `${
                        e instanceof Element || e instanceof Document
                          ? ":scope"
                          : ":host"
                      } ${n}`
                    : n;
                };
              var Ye = (e, t) => {
                  const n = We(t);
                  if (n.length < 2) return Ge(e, t);
                  let r = e;
                  for (let e = 0; e < n.length; e += 1) {
                    const t = n[e].trim();
                    if ("" === t && r.shadowRoot) {
                      r = r.shadowRoot;
                      continue;
                    }
                    const o = Qe(r, t),
                      i = Ge(r, o);
                    if (0 === i.length || !i[0] || !i[0].shadowRoot) return i;
                    r = i[0].shadowRoot;
                  }
                },
                Xe = (e) => -1 !== e.indexOf(Je),
                Ke = (e, t = document) => (Xe(e) ? Ye(t, e) : Ge(t, e));
              const Ze = "MutationObserver",
                et = "requestAnimationFrame",
                tt = { childList: !0, subtree: !0 },
                nt = "visibilityState",
                rt = "visible",
                ot = 100,
                it = 5e3,
                at = (e) => new Error(`Could not find: ${e}`),
                st = (e) => new Promise(e),
                ct = (e) => Fe(e[Ze]),
                lt = (e, t, n, r, o) =>
                  st((i, a) => {
                    let s;
                    const c = new e[Ze](() => {
                      const e = o(n);
                      Ve(e) && (c.disconnect(), s && clearTimeout(s), i(e));
                    });
                    (s = setTimeout(() => {
                      c.disconnect(), a(at(n));
                    }, r)),
                      c.observe(t, tt);
                  }),
                dt = (e) => e[nt] === rt,
                ut = (e, t, n, r) =>
                  st((o, i) => {
                    const a = () => {
                      const n = r(t);
                      Ve(n) ? o(n) : e[et](a);
                    };
                    a(),
                      setTimeout(() => {
                        i(at(t));
                      }, n);
                  }),
                pt = (e, t, n) =>
                  st((r, o) => {
                    const i = () => {
                      const t = n(e);
                      Ve(t) ? r(t) : setTimeout(i, ot);
                    };
                    i(),
                      setTimeout(() => {
                        o(at(e));
                      }, t);
                  });
              var gt = (e, t = Ke, n = it, r = window, o = document) => {
                  const i = t(e);
                  return Ve(i)
                    ? Promise.resolve(i)
                    : ct(r)
                    ? lt(r, o, e, n, t)
                    : dt(o)
                    ? ut(r, e, n, t)
                    : pt(e, n, t);
                },
                ft = (e, t) =>
                  t.matches ? t.matches(e) : t.msMatchesSelector(e),
                mt = (e) => {
                  const t = e.parentNode;
                  return t ? t.removeChild(e) : null;
                };
              const ht = { name: "Adobe Alloy" },
                yt = { style: { display: "none", width: 0, height: 0 } };
              var vt = ({
                  appendNode: e = Ae,
                  awaitSelector: t = gt,
                  createNode: n = xe,
                  fireImage: r = Be,
                } = {}) => {
                  const o = r;
                  let i;
                  const a = () =>
                      t(Me).then(([t]) => i || ((i = n(_e, ht, yt)), e(t, i))),
                    s = ({ src: e }) =>
                      a().then((t) => {
                        const n = t.contentWindow.document;
                        return r({ src: e, currentDocument: n });
                      });
                  return (e) => {
                    const { hideReferrer: t, url: n } = e;
                    return t ? s({ src: n }) : o({ src: n });
                  };
                },
                bt = (e) => pe(e) && 0 === Object.keys(e).length;
              const wt = (e, t) =>
                  ue(e) || !pe(e)
                    ? e
                    : Object.keys(e).reduce((n, r) => {
                        const o = e[r];
                        if (pe(o)) {
                          const e = wt(o, t);
                          return bt(e) ? n : { ...n, [r]: e };
                        }
                        return t(o) ? { ...n, [r]: o } : n;
                      }, {}),
                Et = (e) => {
                  let t = 2166136261;
                  const n = 16777619,
                    r = new TextEncoder().encode(e);
                  for (let e = 0; e < r.length; e += 1)
                    (t ^= r[e]), (t = Math.imul(t, n));
                  return t >>> 0;
                },
                kt = (e) => Et(e).toString(16).padStart(8, "0");
              var Ct = "com.adobe.alloy.",
                St = (e, t) => e.slice(-t);
              const It = `${Ct}getTld`;
              var Tt = (e, t) => {
                  let n = "";
                  const r = e.location.hostname.toLowerCase().split(".");
                  let o = 1;
                  for (; o < r.length && !t.get(It); )
                    (o += 1),
                      (n = St(r, o).join(".")),
                      t.set(It, It, { domain: n });
                  return t.remove(It, { domain: n }), n;
                },
                Pt = "kndctr",
                Dt = (e) => e.replace("@", "_"),
                Ot = (e, t) => `${Pt}_${Dt(e)}_${t}`,
                Nt = (e, t) => {
                  const n = {};
                  return (
                    e.forEach((e) => {
                      const r = t(e);
                      n[r] || (n[r] = []), n[r].push(e);
                    }),
                    n
                  );
                };
              const At = "Chrome",
                Rt = "Edge",
                xt = "EdgeChromium",
                Mt = "Firefox",
                _t = "IE",
                Lt = "Safari",
                jt = "Unknown";
              var $t = (e) => {
                let t,
                  n = !1;
                return () => (n || ((n = !0), (t = e())), t);
              };
              const Ut = [At, Rt, xt, _t, jt];
              var qt = ({ getBrowser: e }) => $t(() => Ut.includes(e()));
              const Bt = "identity",
                Ft = "consent",
                Vt = "cluster";
              var Ht = ({ orgId: e }) => {
                const t = Ot(e, Bt);
                return () => Boolean(me.get(t));
              };
              const zt = (e, t) => {
                const n = Object.keys(e);
                for (let r = 0; r < n.length; r += 1) {
                  const o = n[r];
                  if (e[o].test(t)) return o;
                }
                return jt;
              };
              var Gt = ({ userAgent: e }) =>
                $t(() =>
                  zt(
                    {
                      [Rt]: /Edge\/([0-9\._]+)/,
                      [xt]: /Edg\/([0-9\.]+)/,
                      [At]: /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/,
                      [Mt]: /Firefox\/([0-9\.]+)(?:\s|$)/,
                      [_t]: /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/,
                      [Lt]: /Version\/([0-9\._]+).*Safari/,
                    },
                    e
                  )
                );
              const Jt = (e, t, n) => ({
                getItem(r) {
                  try {
                    return e[t].getItem(n + r);
                  } catch {
                    return null;
                  }
                },
                setItem(r, o) {
                  try {
                    return e[t].setItem(n + r, o), !0;
                  } catch {
                    return !1;
                  }
                },
                clear() {
                  try {
                    return (
                      Object.keys(e[t]).forEach((r) => {
                        r.startsWith(n) && e[t].removeItem(r);
                      }),
                      !0
                    );
                  } catch {
                    return !1;
                  }
                },
              });
              var Wt = (e) => (t) => {
                  const n = Ct + t;
                  return {
                    session: Jt(e, "sessionStorage", n),
                    persistent: Jt(e, "localStorage", n),
                  };
                },
                Qt = (e, t) => e.filter((e) => t.includes(e)),
                Yt = (e) => "boolean" == typeof e,
                Xt = (e) => "number" == typeof e && !Number.isNaN(e),
                Kt = (e) => {
                  const t = parseInt(e, 10);
                  return Xt(t) && e === t;
                },
                Zt = (e, t) => 0 === t.indexOf(`${Pt}_${Dt(e)}_`),
                en = (e) => "string" == typeof e,
                tn = (e) => en(e) && e.length > 0,
                nn = () => {};
              const rn = (e) => {
                  const t = {},
                    n = e.split(".");
                  switch (n.length) {
                    case 1:
                      (t.subdomain = ""),
                        (t.domain = e),
                        (t.topLevelDomain = "");
                      break;
                    case 2:
                      (t.subdomain = ""),
                        (t.domain = e),
                        (t.topLevelDomain = n[1]);
                      break;
                    case 3:
                      (t.subdomain = "www" === n[0] ? "" : n[0]),
                        (t.domain = e),
                        (t.topLevelDomain = n[2]);
                      break;
                    case 4:
                      (t.subdomain = "www" === n[0] ? "" : n[0]),
                        (t.domain = e),
                        (t.topLevelDomain = `${n[2]}.${n[3]}`);
                  }
                  return t;
                },
                on = (e) => {
                  try {
                    const t = new URL(e);
                    let n = t.pathname;
                    return (
                      e.endsWith("/") || "/" !== n || (n = ""),
                      {
                        host: t.hostname,
                        path: n,
                        query: t.search.replace(/^\?/, ""),
                        anchor: t.hash.replace(/^#/, ""),
                      }
                    );
                  } catch {
                    return { host: "", path: "", query: "", anchor: "" };
                  }
                },
                an = (e, t = rn) => {
                  en(e) || (e = "");
                  const n = on(e),
                    { host: r, path: o, query: i, anchor: a } = n;
                  return { path: o, query: i, fragment: a, ...t(r) };
                };
              var sn,
                cn,
                ln = (e) => {
                  if (ue(e) || "object" != typeof e) return null;
                  const t = wt(
                    e,
                    (e) => !(ue(e) || (!Yt(e) && !Xt(e) && !tn(e) && !Ve(e)))
                  );
                  return bt(t) ? null : t;
                },
                dn = s(c());
              const un = (e) =>
                Array.isArray(e)
                  ? e.map((e) => un(e))
                  : "object" == typeof e && null !== e
                  ? Object.keys(e)
                      .sort()
                      .reduce((t, n) => ((t[n] = un(e[n])), t), {})
                  : e;
              var pn = (e) => un(e),
                gn = (e) => (e instanceof Error ? e : new Error(e)),
                fn = ({ error: e, message: t }) => {
                  try {
                    e.message = t;
                  } catch {}
                },
                mn = ({ error: e, message: t }) => {
                  const n = gn(e),
                    r = `${t}\nCaused by: ${n.message}`;
                  return fn({ error: n, message: r }), n;
                },
                hn = (e) => en(e) && "true" === e.toLowerCase(),
                yn = (e, t) => {
                  if (Xt(e) || en(e)) {
                    const t = Math.round(Number(e));
                    if (!Number.isNaN(t)) return t;
                  }
                  return t;
                };
              const vn = (e, t, n) => `${e}`.padStart(t, n);
              var bn = (e) => {
                const t = e.getFullYear(),
                  n = vn(e.getMonth() + 1, 2, "0"),
                  r = vn(e.getDate(), 2, "0"),
                  o = vn(e.getHours(), 2, "0"),
                  i = vn(e.getMinutes(), 2, "0"),
                  a = vn(e.getSeconds(), 2, "0"),
                  s = vn(e.getMilliseconds(), 3, "0"),
                  c = yn(e.getTimezoneOffset(), 0);
                return `${t}-${n}-${r}T${o}:${i}:${a}.${s}${
                  c > 0 ? "-" : "+"
                }${vn(Math.floor(Math.abs(c) / 60), 2, "0")}:${vn(
                  Math.abs(c) % 60,
                  2,
                  "0"
                )}`;
              };
              const wn = (e) =>
                  function (t, n) {
                    return null == t ? t : e.call(this, t, n);
                  },
                En = (e, t) =>
                  function (n, r) {
                    return t.call(this, e.call(this, n, r), r);
                  },
                kn = (e, t) =>
                  function (n, r) {
                    const o = [],
                      i = [e, t].reduce((e, t) => {
                        try {
                          return t.call(this, e, r);
                        } catch (t) {
                          return o.push(t), e;
                        }
                      }, n);
                    if (o.length) throw new Error(o.join("\n"));
                    return i;
                  },
                Cn = (e, t, n) => Object.assign(En(e, t), e, n),
                Sn = (e, t, n) => Object.assign(En(e, wn(t)), e, n),
                In = (e, t, n) => Object.assign(kn(wn(t), e), e, n),
                Tn = (e, t, n, r) => {
                  if (!e)
                    throw new Error(
                      `'${n}': Expected ${r}, but got ${JSON.stringify(t)}.`
                    );
                };
              var Pn = (e, t) => (Tn(Yt(e), e, t, "true or false"), e),
                Dn = (e, t) => (Tn(Fe(e), e, t, "a function"), e),
                On = (e, t) =>
                  function (n, r) {
                    let o;
                    const i = e.find((e) => {
                      try {
                        return (o = e.call(this, n, r)), !0;
                      } catch {
                        return !1;
                      }
                    });
                    return Tn(i, n, r, t), o;
                  },
                Nn = (e) =>
                  function (t, n) {
                    Tn(Array.isArray(t), t, n, "an array");
                    const r = [],
                      o = t.map((o, i) => {
                        try {
                          return e.call(this, o, `${n}[${i}]`, t);
                        } catch (e) {
                          return void r.push(e.message);
                        }
                      });
                    if (r.length) throw new Error(r.join("\n"));
                    return o;
                  },
                An = (e) => (t) => null == t ? e : t,
                Rn = (e = "This field has been deprecated") =>
                  function (t, n) {
                    let r = e;
                    return (
                      void 0 !== t &&
                        (n && (r = `'${n}': ${r}`),
                        this && this.logger && this.logger.warn(r)),
                      t
                    );
                  },
                xn = (e) => (t, n) => (Tn(t === e, t, n, `${e}`), t),
                Mn = (e) =>
                  function (t, n) {
                    Tn(pe(t), t, n, "an object");
                    const r = [],
                      o = {};
                    if (
                      (Object.keys(t).forEach((i) => {
                        const a = t[i],
                          s = n ? `${n}.${i}` : i;
                        try {
                          const t = e.call(this, a, s);
                          void 0 !== t && (o[i] = t);
                        } catch (e) {
                          r.push(e.message);
                        }
                      }),
                      r.length)
                    )
                      throw new Error(r.join("\n"));
                    return o;
                  },
                _n = (e, t) => (n, r) => (
                  Tn(n >= t, n, r, `${e} greater than or equal to ${t}`), n
                ),
                Ln = (e, t) => (n, r) => (
                  Tn(n <= t, n, r, `${e} less than or equal to ${t}`), n
                ),
                jn = (e) => (t, n) => {
                  const r = [];
                  if (
                    (Object.keys(t).forEach((t) => {
                      if (!e[t]) {
                        const e = n ? `${n}.${t}` : t;
                        r.push(`'${e}': Unknown field.`);
                      }
                    }),
                    r.length)
                  )
                    throw new Error(r.join("\n"));
                  return t;
                },
                $n = (e) => (t, n) => (
                  pe(t) ? Tn(!bt(t), t, n, e) : Tn(t.length > 0, t, n, e), t
                ),
                Un = (e) =>
                  function (t, n) {
                    Tn(pe(t), t, n, "an object");
                    const r = [],
                      o = {};
                    if (
                      (Object.keys(e).forEach((i) => {
                        const a = t[i],
                          s = e[i],
                          c = n ? `${n}.${i}` : i;
                        try {
                          const e = s.call(this, a, c);
                          void 0 !== e && (o[i] = e);
                        } catch (e) {
                          r.push(e.message);
                        }
                      }),
                      Object.keys(t).forEach((e) => {
                        Object.prototype.hasOwnProperty.call(o, e) ||
                          (o[e] = t[e]);
                      }),
                      r.length)
                    )
                      throw new Error(r.join("\n"));
                    return o;
                  },
                qn = (e, t, n) =>
                  function (r, o) {
                    Tn(pe(r), r, o, "an object");
                    const { [e]: i, [n]: a, ...s } = r,
                      c = t(i, o);
                    if (void 0 !== c) {
                      let t = `The field '${e}' is deprecated. Use '${n}' instead.`;
                      if ((o && (t = `'${o}': ${t}`), void 0 !== a && a !== c))
                        throw new Error(t);
                      this && this.logger && this.logger.warn(t);
                    }
                    return { [n]: a || c, ...s };
                  },
                Bn = () => {
                  const e = [];
                  return (t, n) => (
                    Tn(
                      -1 === e.indexOf(t),
                      t,
                      n,
                      "a unique value across instances"
                    ),
                    e.push(t),
                    t
                  );
                },
                Fn = (e) => {
                  const t = Object.create(null);
                  for (let n = 0; n < e.length; n += 1) {
                    const r = e[n];
                    if (r in t) return !1;
                    t[r] = !0;
                  }
                  return !0;
                },
                Vn = () => (e, t) => (
                  Tn(Fn(e), e, t, "array values to be unique"), e
                );
              const Hn = /^[a-z0-9.-]{1,}$/i;
              var zn = (e, t) => (Tn(Hn.test(e), e, t, "a valid domain"), e),
                Gn = (e, t) => (Tn(Kt(e), e, t, "an integer"), e),
                Jn = (e, t) => (Tn(Xt(e), e, t, "a number"), e),
                Wn = (e) => {
                  try {
                    return null !== RegExp(e);
                  } catch {
                    return !1;
                  }
                },
                Qn = (e, t) => (Tn(Wn(e), e, t, "a regular expression"), e),
                Yn = (e, t) => {
                  if (null == e) throw new Error(`'${t}' is a required option`);
                  return e;
                },
                Xn = (e, t) => (Tn(en(e), e, t, "a string"), e),
                Kn = (e) => (t, n) => (
                  Tn(e.test(t), t, n, `does not match the ${e.toString()}`), t
                );
              const Zn = (e) => e;
              (Zn.default = function (e) {
                return Cn(this, An(e));
              }),
                (Zn.required = function () {
                  return Cn(this, Yn);
                }),
                (Zn.deprecated = function (e) {
                  return Cn(this, Rn(e));
                });
              const er = function () {
                  return Sn(this, zn);
                },
                tr = function (e) {
                  return Sn(this, _n("an integer", e));
                },
                nr = function (e) {
                  return Sn(this, _n("a number", e));
                },
                rr = function (e) {
                  return Sn(this, Ln("a number", e));
                },
                or = function () {
                  return Sn(this, Gn, { minimum: tr });
                },
                ir = function () {
                  return Sn(this, $n("a non-empty string"));
                },
                ar = function () {
                  return Sn(this, $n("a non-empty array"));
                },
                sr = function () {
                  return Sn(this, $n("a non-empty object"));
                },
                cr = function () {
                  return Sn(this, Qn);
                },
                lr = function (e) {
                  return Sn(this, Kn(e));
                },
                dr = function () {
                  return Sn(this, Bn());
                },
                ur = function () {
                  return Sn(this, Vn());
                },
                pr = function (e, t) {
                  return Cn(this, On(e, t));
                },
                gr = function () {
                  return this;
                },
                fr = function (e) {
                  return Sn(this, Nn(e), { nonEmpty: ar, uniqueItems: ur });
                },
                mr = function () {
                  return Sn(this, Pn);
                },
                hr = function () {
                  return Sn(this, Dn);
                },
                yr = function (e) {
                  return Sn(this, xn(e));
                },
                vr = function () {
                  return Sn(this, Jn, {
                    minimum: nr,
                    maximum: rr,
                    integer: or,
                    unique: dr,
                  });
                },
                br = function (e) {
                  return Sn(this, Mn(e), { nonEmpty: sr });
                },
                wr = (e) => ({
                  noUnknownFields: function () {
                    return Sn(this, jn(e));
                  },
                  nonEmpty: sr,
                  concat: function (t) {
                    const n = { ...e, ...t.schema };
                    return Sn(this, t, wr(n));
                  },
                  renamed: function (e, t, n) {
                    return In(this, qn(e, t, n));
                  },
                  schema: e,
                }),
                Er = function (e) {
                  return Sn(this, Un(e), wr(e));
                },
                kr = function () {
                  return Sn(this, Xn, {
                    regexp: cr,
                    domain: er,
                    nonEmpty: ir,
                    unique: dr,
                    matches: lr,
                  });
                },
                Cr = pr.bind(Zn),
                Sr = gr.bind(Zn),
                Ir = fr.bind(Zn),
                Tr = mr.bind(Zn),
                Pr = hr.bind(Zn),
                Dr = yr.bind(Zn),
                Or = vr.bind(Zn),
                Nr = br.bind(Zn),
                Ar = Er.bind(Zn),
                Rr = kr.bind(Zn),
                xr = function (...e) {
                  return Cr(
                    e.map(Dr),
                    `one of these values: ${JSON.stringify(e)}`
                  );
                };
              var Mr = Nr(
                  Ir(
                    Ar({
                      authenticatedState: xr(
                        "ambiguous",
                        "authenticated",
                        "loggedOut"
                      ),
                      id: Rr(),
                      namespace: Ar({ code: Rr() }).noUnknownFields(),
                      primary: Tr(),
                      xid: Rr(),
                    }).noUnknownFields()
                  ).required()
                ),
                _r = Ar({}),
                Lr = "alloy_debug",
                jr = ({
                  console: e,
                  locationSearch: t,
                  createLogger: n,
                  instanceName: r,
                  createNamespacedStorage: o,
                  getMonitors: i,
                }) => {
                  const a = dn.parse(t),
                    s = o(`instance.${r}.`),
                    c = s.session.getItem("debug");
                  let l = "true" === c,
                    d = null === c;
                  const u = () => l,
                    p = (e, { fromConfig: t }) => {
                      (t && !d) || (l = e),
                        t ||
                          (s.session.setItem("debug", e.toString()), (d = !1));
                    };
                  return (
                    void 0 !== a[Lr] && p(hn(a[Lr]), { fromConfig: !1 }),
                    {
                      setDebugEnabled: p,
                      logger: n({
                        getDebugEnabled: u,
                        context: { instanceName: r },
                        getMonitors: i,
                        console: e,
                      }),
                      createComponentLogger: (t) =>
                        n({
                          getDebugEnabled: u,
                          context: { instanceName: r, componentName: t },
                          getMonitors: i,
                          console: e,
                        }),
                    }
                  );
                };
              const $r = [
                  "onComponentsRegistered",
                  "onBeforeEvent",
                  "onBeforeRequest",
                  "onResponse",
                  "onRequestFailure",
                  "onClick",
                  "onDecision",
                ],
                Ur =
                  (e, t) =>
                  (...n) =>
                    Promise.all(
                      e.getLifecycleCallbacks(t).map(
                        (e) =>
                          new Promise((t) => {
                            t(e(...n));
                          })
                      )
                    ),
                qr =
                  (e) =>
                  (...t) =>
                    Promise.resolve().then(() => e(...t));
              var Br = (e) =>
                $r.reduce((t, n) => ((t[n] = qr(Ur(e, n))), t), {});
              const Fr =
                (e, t) =>
                (...n) => {
                  let r;
                  try {
                    r = e(...n);
                  } catch (e) {
                    throw mn({ error: e, message: t });
                  }
                  return (
                    r instanceof Promise &&
                      (r = r.catch((e) => {
                        throw mn({ error: e, message: t });
                      })),
                    r
                  );
                };
              var Vr = () => {
                  const e = {},
                    t = {},
                    n = {},
                    r = (e, n = {}) => {
                      const r = Qt(Object.keys(t), Object.keys(n));
                      if (r.length)
                        throw new Error(
                          `[ComponentRegistry] Could not register ${e} because it has existing command(s): ${r.join(
                            ","
                          )}`
                        );
                      Object.keys(n).forEach((r) => {
                        const o = n[r];
                        (o.commandName = r),
                          (o.run = Fr(
                            o.run,
                            `[${e}] An error occurred while executing the ${r} command.`
                          )),
                          (t[r] = o);
                      });
                    },
                    o = (e, t = {}) => {
                      Object.keys(t).forEach((r) => {
                        (n[r] = n[r] || []),
                          n[r].push(
                            Fr(
                              t[r],
                              `[${e}] An error occurred while executing the ${r} lifecycle hook.`
                            )
                          );
                      });
                    };
                  return {
                    register(t, n) {
                      const { commands: i, lifecycle: a } = n;
                      r(t, i), o(t, a), (e[t] = n);
                    },
                    getCommand: (e) => t[e],
                    getCommandNames: () => Object.keys(t),
                    getLifecycleCallbacks: (e) => n[e] || [],
                    getComponentNames: () => Object.keys(e),
                  };
                },
                Hr =
                  ({
                    logger: e,
                    sendFetchRequest: t,
                    sendBeaconRequest: n,
                    isRequestRetryable: r,
                    getRequestRetryDelay: o,
                  }) =>
                  ({ requestId: i, url: a, payload: s, useSendBeacon: c }) => {
                    const l = JSON.stringify(s),
                      d = JSON.parse(l);
                    e.logOnBeforeNetworkRequest({
                      url: a,
                      requestId: i,
                      payload: d,
                    });
                    const u = (s = 0) =>
                      (c ? n : t)(a, l).then((t) => {
                        if (r({ response: t, retriesAttempted: s })) {
                          const e = o({ response: t, retriesAttempted: s });
                          return new Promise((t) => {
                            setTimeout(() => {
                              t(u(s + 1));
                            }, e);
                          });
                        }
                        let n;
                        try {
                          n = JSON.parse(t.body);
                        } catch {}
                        return (
                          e.logOnNetworkResponse({
                            requestId: i,
                            url: a,
                            payload: d,
                            ...t,
                            parsedBody: n,
                            retriesAttempted: s,
                          }),
                          {
                            statusCode: t.statusCode,
                            body: t.body,
                            parsedBody: n,
                            getHeader: t.getHeader,
                          }
                        );
                      });
                    return u().catch((t) => {
                      throw (
                        (e.logOnNetworkError({
                          requestId: i,
                          url: a,
                          payload: d,
                          error: t,
                        }),
                        mn({ error: t, message: "Network request failed." }))
                      );
                    });
                  },
                zr =
                  ({ logger: e }) =>
                  (t) => {
                    if (t) {
                      const n = t.split(";");
                      if (n.length >= 2 && n[1].length > 0)
                        try {
                          const e = parseInt(n[1], 10);
                          if (!Number.isNaN(e)) return { regionId: e };
                        } catch {}
                      e.warn(`Invalid adobe edge: "${t}"`);
                    }
                    return {};
                  };
              const Gr = "in",
                Jr = "out",
                Wr = "pending",
                Qr = "general",
                Yr = "declinedConsent",
                Xr = "default",
                Kr = "initial",
                Zr = "new",
                eo = (e) => {
                  const t = new Error(e);
                  return (t.code = Yr), (t.message = e), t;
                };
              var to = ({ logger: e }) => {
                  const t = [],
                    n = () => {
                      for (; t.length; ) t.shift().resolve();
                    },
                    r = () => {
                      for (; t.length; )
                        t.shift().reject(eo("The user declined consent."));
                    },
                    o = () => Promise.resolve(),
                    i = () => Promise.resolve(),
                    a = () => Promise.resolve(),
                    s = () =>
                      Promise.reject(
                        eo("No consent preferences have been set.")
                      ),
                    c = () => Promise.reject(eo("The user declined consent.")),
                    l = (e) => {
                      if (e)
                        return Promise.reject(new Error("Consent is pending."));
                      const n = Pe();
                      return t.push(n), n.promise;
                    };
                  return {
                    in(t) {
                      t === Xr
                        ? (this.awaitConsent = i)
                        : (t === Kr
                            ? e.info(
                                "Loaded user consent preferences. The user previously consented."
                              )
                            : t === Zr &&
                              this.awaitConsent !== a &&
                              e.info("User consented."),
                          n(),
                          (this.awaitConsent = a));
                    },
                    out(t) {
                      t === Xr
                        ? (e.warn(
                            "User consent preferences not found. Default consent of out will be used."
                          ),
                          (this.awaitConsent = s))
                        : (t === Kr
                            ? e.warn(
                                "Loaded user consent preferences. The user previously declined consent."
                              )
                            : t === Zr &&
                              this.awaitConsent !== c &&
                              e.warn("User declined consent."),
                          r(),
                          (this.awaitConsent = c));
                    },
                    pending(t) {
                      t === Xr &&
                        e.info(
                          "User consent preferences not found. Default consent of pending will be used. Some commands may be delayed."
                        ),
                        (this.awaitConsent = l);
                    },
                    awaitConsent: o,
                    withConsent() {
                      return this.awaitConsent(!0);
                    },
                    current() {
                      switch (this.awaitConsent) {
                        case i:
                          return { state: "in", wasSet: !1 };
                        case a:
                          return { state: "in", wasSet: !0 };
                        case s:
                          return { state: "out", wasSet: !1 };
                        case c:
                          return { state: "out", wasSet: !0 };
                        case l:
                          return { state: "pending", wasSet: !1 };
                        default:
                          return { state: "in", wasSet: !1 };
                      }
                    },
                  };
                },
                no = ({ generalConsentState: e, logger: t }) => {
                  const n = (n, r) => {
                    switch (n[Qr]) {
                      case Gr:
                        e.in(r);
                        break;
                      case Jr:
                        e.out(r);
                        break;
                      case Wr:
                        e.pending(r);
                        break;
                      default:
                        t.warn(`Unknown consent value: ${n[Qr]}`);
                    }
                  };
                  return {
                    initializeConsent(e, t) {
                      t[Qr] ? n(t, Kr) : n(e, Xr);
                    },
                    setConsent(e) {
                      n(e, Zr);
                    },
                    suspend() {
                      e.pending();
                    },
                    awaitConsent: () => e.awaitConsent(),
                    withConsent: () => e.withConsent(),
                    current: () => e.current(),
                  };
                };
              const ro = (e) =>
                e &&
                e._experience &&
                e._experience.decisioning &&
                Ve(e._experience.decisioning.propositions)
                  ? e._experience.decisioning.propositions
                  : [];
              var oo = () => {
                const e = {};
                let t,
                  n,
                  r = !1,
                  o = !1,
                  i = !0;
                const a = (e) => {
                    if (o)
                      throw new Error(
                        `${e} cannot be called after event is finalized.`
                      );
                  },
                  s = {
                    hasQuery() {
                      return Object.prototype.hasOwnProperty.call(
                        this.getContent(),
                        "query"
                      );
                    },
                    getContent() {
                      const r = JSON.parse(JSON.stringify(e));
                      return t && ye(r, { xdm: t }), n && ye(r, { data: n }), r;
                    },
                    setUserXdm(e) {
                      a("setUserXdm"), (t = e);
                    },
                    setUserData(e) {
                      a("setUserData"), (n = e);
                    },
                    mergeXdm(t) {
                      a("mergeXdm"), t && ye(e, { xdm: t });
                    },
                    mergeData(t) {
                      a("mergeData"), t && ye(e, { data: t });
                    },
                    mergeMeta(t) {
                      a("mergeMeta"), t && ye(e, { meta: t });
                    },
                    mergeQuery(t) {
                      a("mergeQuery"), t && ye(e, { query: t });
                    },
                    documentMayUnload() {
                      r = !0;
                    },
                    finalize(r) {
                      if (o) return;
                      const a = Ne(
                        [...ro(t), ...ro(e.xdm)],
                        (e, t) =>
                          e === t ||
                          (e.id &&
                            t.id &&
                            e.id === t.id &&
                            e.scope &&
                            t.scope &&
                            e.scope === t.scope)
                      );
                      if (
                        (t && this.mergeXdm(t),
                        a.length > 0 &&
                          (e.xdm._experience.decisioning.propositions = a),
                        n && s.mergeData(n),
                        (o = !0),
                        r)
                      ) {
                        i = !1;
                        const t = { xdm: e.xdm || {}, data: e.data || {} },
                          n = r(t);
                        (i = !1 !== n),
                          (e.xdm = t.xdm || {}),
                          (e.data = t.data || {}),
                          bt(e.xdm) && delete e.xdm,
                          bt(e.data) && delete e.data;
                      }
                    },
                    getDocumentMayUnload: () => r,
                    isEmpty: () => bt(e) && (!t || bt(t)) && (!n || bt(n)),
                    shouldSend: () => i,
                    getViewName() {
                      if (t && t.web && t.web.webPageDetails)
                        return t.web.webPageDetails.viewName;
                    },
                    toJSON() {
                      if (!o) throw new Error("toJSON called before finalize");
                      return e;
                    },
                  };
                return s;
              };
              const io = "Retry-After",
                ao = "x-adobe-edge";
              var so =
                ({ extractEdgeInfo: e }) =>
                ({ content: t = {}, getHeader: n }) => {
                  const {
                    handle: r = [],
                    errors: o = [],
                    warnings: i = [],
                  } = t;
                  return {
                    getPayloadsByType: (e) =>
                      r.filter((t) => t.type === e).flatMap((e) => e.payload),
                    getErrors: () => o,
                    getWarnings: () => i,
                    getEdge: () => e(n(ao)),
                    toJSON: () => t,
                  };
                };
              const co = "configure",
                lo = "setDebug";
              var uo = ({
                logger: e,
                configureCommand: t,
                setDebugCommand: n,
                handleError: r,
                validateCommandOptions: o,
              }) => {
                let i;
                const a = (r, a) => {
                  let s;
                  if (r === co) {
                    if (i)
                      throw new Error(
                        "The library has already been configured and may only be configured once."
                      );
                    s = () => ((i = t(a)), i.then(() => {}));
                  } else {
                    if (!i)
                      throw new Error(
                        "The library must be configured first. Please do so by executing the configure command."
                      );
                    s =
                      r === lo
                        ? () => {
                            const e = Ar({
                                enabled: Tr().required(),
                              }).noUnknownFields(),
                              t = o({
                                command: {
                                  commandName: lo,
                                  optionsValidator: e,
                                },
                                options: a,
                              });
                            n(t);
                          }
                        : () =>
                            i.then(
                              (e) => {
                                const t = e.getCommand(r);
                                if (!t || !Fe(t.run)) {
                                  const t = [co, lo]
                                    .concat(e.getCommandNames())
                                    .join(", ");
                                  throw new Error(
                                    `The ${r} command does not exist. List of available commands: ${t}.`
                                  );
                                }
                                const n = o({ command: t, options: a });
                                return t.run(n);
                              },
                              () => (
                                e.warn(
                                  `An error during configuration is preventing the ${r} command from executing.`
                                ),
                                new Promise(() => {})
                              )
                            );
                  }
                  return s;
                };
                return (t, n = {}) =>
                  new Promise((r) => {
                    const o = a(t, n);
                    e.logOnBeforeCommand({ commandName: t, options: n }),
                      r(o());
                  })
                    .catch((e) => r(e, `${t} command`))
                    .catch((r) => {
                      throw (
                        (e.logOnCommandRejected({
                          commandName: t,
                          options: n,
                          error: r,
                        }),
                        r)
                      );
                    })
                    .then((r) => {
                      const o = pe(r) ? r : {};
                      return (
                        e.logOnCommandResolved({
                          commandName: t,
                          options: n,
                          result: o,
                        }),
                        o
                      );
                    });
              };
              const po = "https://adobe.ly/3sHgQHb";
              var go = ({ command: e, options: t }) => {
                const {
                  commandName: n,
                  documentationUri: r = po,
                  optionsValidator: o,
                } = e;
                let i = t;
                if (o)
                  try {
                    i = o(t);
                  } catch (e) {
                    throw new Error(
                      `Invalid ${n} command options:\n\t - ${e} For command documentation see: ${r}`
                    );
                  }
                return i;
              };
              const fo = "https://adobe.ly/3sHh553",
                mo = ({
                  combinedConfigValidator: e,
                  options: t,
                  logger: n,
                }) => {
                  try {
                    return e
                      .noUnknownFields()
                      .required()
                      .call({ logger: n }, t);
                  } catch (e) {
                    throw new Error(
                      `Resolve these configuration problems:\n\t - ${e.message
                        .split("\n")
                        .join(
                          "\n\t - "
                        )}\nFor configuration documentation see: ${fo}`
                    );
                  }
                },
                ho = (e, t, n) =>
                  n.reduce(
                    (n, { buildOnInstanceConfiguredExtraParams: r }) => (
                      r && (n = { ...n, ...r({ config: e, logger: t }) }), n
                    ),
                    {}
                  ),
                yo = (e) => {
                  const t = [],
                    n = {
                      get enabled() {
                        return e.enabled;
                      },
                      flush() {
                        t.forEach(({ method: t, args: n }) => e[t](...n));
                      },
                    };
                  return (
                    Object.keys(e)
                      .filter((t) => "function" == typeof e[t])
                      .forEach((e) => {
                        n[e] = (...n) => {
                          t.push({ method: e, args: n });
                        };
                      }),
                    n
                  );
                };
              var vo = ({
                  options: e,
                  componentCreators: t,
                  coreConfigValidators: n,
                  createConfig: r,
                  logger: o,
                  setDebugEnabled: i,
                }) => {
                  const a = yo(o),
                    s = t
                      .map(({ configValidators: e }) => e)
                      .filter((e) => e)
                      .reduce((e, t) => e.concat(t), n),
                    c = r(
                      mo({ combinedConfigValidator: s, options: e, logger: a })
                    );
                  i(c.debugEnabled, { fromConfig: !0 }), a.flush();
                  const l = ho(c, o, t);
                  return o.logOnInstanceConfigured({ ...l, config: c }), c;
                },
                bo = ({
                  componentCreators: e,
                  lifecycle: t,
                  componentRegistry: n,
                  getImmediatelyAvailableTools: r,
                }) => (
                  e.forEach((e) => {
                    const { namespace: t } = e,
                      o = r(t);
                    let i;
                    try {
                      i = e(o);
                    } catch (e) {
                      throw mn({
                        error: e,
                        message: `[${t}] An error occurred during component creation.`,
                      });
                    }
                    n.register(t, i);
                  }),
                  t.onComponentsRegistered({ lifecycle: t }).then(() => n)
                );
              const wo = (e) => ({ ...e }),
                Eo = "edge.adobedc.net",
                ko = "adobedc.demdex.net";
              var Co = "ee",
                So = () =>
                  Ar({
                    debugEnabled: Tr().default(!1),
                    datastreamId: Rr().unique().required(),
                    edgeDomain: Rr().domain().default(Eo),
                    edgeBasePath: Rr().nonEmpty().default(Co),
                    orgId: Rr().unique().required(),
                    onBeforeEventSend: Pr().default(nn),
                    edgeConfigOverrides: _r,
                  }).renamed("edgeConfigId", Rr().unique(), "datastreamId"),
                Io =
                  ({ errorPrefix: e, logger: t }) =>
                  (n, r) => {
                    const o = gn(n);
                    if (o.code === Yr)
                      return (
                        t.warn(
                          `The ${r} could not fully complete. ${o.message}`
                        ),
                        {}
                      );
                    throw (fn({ error: o, message: `${e} ${o.message}` }), o);
                  },
                To =
                  ({ fetch: e }) =>
                  (t, n) =>
                    e(t, {
                      method: "POST",
                      cache: "no-cache",
                      credentials: "include",
                      headers: { "Content-Type": "text/plain; charset=UTF-8" },
                      referrerPolicy: "no-referrer-when-downgrade",
                      body: n,
                    }).then((e) =>
                      e
                        .text()
                        .then((t) => ({
                          statusCode: e.status,
                          getHeader: (t) => e.headers.get(t),
                          body: t,
                        }))
                    ),
                Po =
                  ({ sendBeacon: e, sendFetchRequest: t, logger: n }) =>
                  (r, o) => {
                    const i = new Blob([o], {
                      type: "text/plain; charset=UTF-8",
                    });
                    return e(r, i)
                      ? Promise.resolve({
                          statusCode: 204,
                          getHeader: () => null,
                          body: "",
                        })
                      : (n.info(
                          "Unable to use `sendBeacon`; falling back to `fetch`."
                        ),
                        t(r, o));
                  },
                Do = ({
                  getDebugEnabled: e,
                  console: t,
                  getMonitors: n,
                  context: r,
                }) => {
                  let o = `[${r.instanceName}]`;
                  r.componentName && (o += ` [${r.componentName}]`);
                  const i = (e, t) => {
                      const o = n();
                      if (o.length > 0) {
                        const n = { ...r, ...t };
                        o.forEach((t) => {
                          t[e] && t[e](n);
                        });
                      }
                    },
                    a = (n, ...r) => {
                      i("onBeforeLog", { level: n, arguments: r }),
                        e() && t[n](o, ...r);
                    };
                  return {
                    get enabled() {
                      return n().length > 0 || e();
                    },
                    logOnInstanceCreated(e) {
                      i("onInstanceCreated", e),
                        a("info", "Instance initialized.");
                    },
                    logOnInstanceConfigured(e) {
                      i("onInstanceConfigured", e),
                        a(
                          "info",
                          "Instance configured. Computed configuration:",
                          e.config
                        );
                    },
                    logOnBeforeCommand(e) {
                      i("onBeforeCommand", e),
                        a(
                          "info",
                          `Executing ${e.commandName} command. Options:`,
                          e.options
                        );
                    },
                    logOnCommandResolved(e) {
                      i("onCommandResolved", e),
                        a(
                          "info",
                          `${e.commandName} command resolved. Result:`,
                          e.result
                        );
                    },
                    logOnCommandRejected(e) {
                      i("onCommandRejected", e),
                        a(
                          "error",
                          `${e.commandName} command was rejected. Error:`,
                          e.error
                        );
                    },
                    logOnBeforeNetworkRequest(e) {
                      i("onBeforeNetworkRequest", e),
                        a(
                          "info",
                          `Request ${e.requestId}: Sending request.`,
                          e.payload
                        );
                    },
                    logOnNetworkResponse(e) {
                      i("onNetworkResponse", e);
                      const t =
                        e.parsedBody || e.body
                          ? "response body:"
                          : "no response body.";
                      a(
                        "info",
                        `Request ${e.requestId}: Received response with status code ${e.statusCode} and ${t}`,
                        e.parsedBody || e.body
                      );
                    },
                    logOnNetworkError(e) {
                      i("onNetworkError", e),
                        a(
                          "error",
                          `Request ${e.requestId}: Network request failed.`,
                          e.error
                        );
                    },
                    logOnContentHiding(e) {
                      i("onContentHiding", { status: e.status }),
                        a(e.logLevel, e.message);
                    },
                    logOnContentRendering(e) {
                      i("onContentRendering", {
                        status: e.status,
                        payload: e.detail,
                      }),
                        a(e.logLevel, e.message);
                    },
                    info: a.bind(null, "info"),
                    warn: a.bind(null, "warn"),
                    error: a.bind(null, "error"),
                  };
                },
                Oo = "__view__",
                No = (e) => (t, n) => {
                  (e.xdm = e.xdm || {}),
                    (e.xdm.identityMap = e.xdm.identityMap || {}),
                    (e.xdm.identityMap[t] = e.xdm.identityMap[t] || []),
                    e.xdm.identityMap[t].push(n);
                },
                Ao = (e) => {
                  const {
                      payload: t,
                      getAction: n,
                      getUseSendBeacon: r,
                      datastreamIdOverride: o,
                      edgeSubPath: i,
                    } = e,
                    s = a();
                  let c = !1,
                    l = !1;
                  return {
                    getId: () => s,
                    getPayload: () => t,
                    getAction: () => n({ isIdentityEstablished: l }),
                    getDatastreamIdOverride: () => o,
                    getUseSendBeacon: () => r({ isIdentityEstablished: l }),
                    getEdgeSubPath: () => i || "",
                    getUseIdThirdPartyDomain: () => c,
                    setUseIdThirdPartyDomain() {
                      c = !0;
                    },
                    setIsIdentityEstablished() {
                      l = !0;
                    },
                  };
                },
                Ro = ({ payload: e, datastreamIdOverride: t }) => {
                  const n = ({ isIdentityEstablished: t }) =>
                    e.getDocumentMayUnload() && t;
                  return Ao({
                    payload: e,
                    getAction: ({ isIdentityEstablished: e }) =>
                      n({ isIdentityEstablished: e }) ? "collect" : "interact",
                    getUseSendBeacon: n,
                    datastreamIdOverride: t,
                  });
                },
                xo = (e) => {
                  const { content: t, addIdentity: n, hasIdentity: r } = e,
                    o = ve(t, "meta.configOverrides");
                  return {
                    mergeMeta: ve(t, "meta"),
                    mergeState: ve(t, "meta.state"),
                    mergeQuery: ve(t, "query"),
                    mergeConfigOverride: (e) => o(ln(e)),
                    addIdentity: n,
                    hasIdentity: r,
                    toJSON: () => t,
                  };
                },
                Mo = (e) => (t) =>
                  void 0 !==
                  (e.xdm && e.xdm.identityMap && e.xdm.identityMap[t]),
                _o = () => {
                  const e = {},
                    t = xo({
                      content: e,
                      addIdentity: No(e),
                      hasIdentity: Mo(e),
                    });
                  return (
                    (t.addEvent = (t) => {
                      (e.events = e.events || []), e.events.push(t);
                    }),
                    (t.getDocumentMayUnload = () =>
                      (e.events || []).some((e) => e.getDocumentMayUnload())),
                    t
                  );
                },
                Lo = ({
                  localConfigOverrides: e,
                  globalConfigOverrides: t,
                  payload: n,
                }) => {
                  const r = { payload: n },
                    { datastreamId: o, ...i } = e || {};
                  return (
                    o && (r.datastreamIdOverride = o),
                    t && !bt(t) && n.mergeConfigOverride(t),
                    i && !bt(i) && n.mergeConfigOverride(i),
                    r
                  );
                };
              const jo = "adb_validation_sessionid",
                $o = "validation.",
                Uo = "clientId",
                qo = (e) => {
                  let t = e.persistent.getItem(Uo);
                  return t || ((t = a()), e.persistent.setItem(Uo, t)), t;
                };
              var Bo = ({ window: e, createNamespacedStorage: t }) => {
                const n = t($o);
                return () => {
                  const t = dn.parse(e.location.search)[jo];
                  if (!t) return "";
                  const r = `${t}|${qo(n)}`;
                  return `&${dn.stringify({ adobeAepValidationToken: r })}`;
                };
              };
              const Fo =
                "Event was canceled because the onBeforeEventSend callback returned false.";
              var Vo = ({
                config: e,
                logger: t,
                lifecycle: n,
                consent: r,
                createEvent: o,
                createDataCollectionRequestPayload: i,
                createDataCollectionRequest: a,
                sendEdgeNetworkRequest: s,
                applyResponse: c,
              }) => {
                const { onBeforeEventSend: l, edgeConfigOverrides: d } = e;
                return {
                  createEvent: o,
                  sendEvent(e, o = {}) {
                    const { edgeConfigOverrides: c, ...u } = o,
                      p = Lo({
                        payload: i(),
                        localConfigOverrides: c,
                        globalConfigOverrides: d,
                      }),
                      g = a(p),
                      f = be(),
                      m = be();
                    return n
                      .onBeforeEvent({
                        ...u,
                        event: e,
                        onResponse: f.add,
                        onRequestFailure: m.add,
                      })
                      .then(() => (p.payload.addEvent(e), r.awaitConsent()))
                      .then(() => {
                        try {
                          e.finalize(l);
                        } catch (e) {
                          const t = () => {
                            throw e;
                          };
                          return (
                            m.add(n.onRequestFailure),
                            m.call({ error: e }).then(t, t)
                          );
                        }
                        if (!e.shouldSend()) {
                          m.add(n.onRequestFailure), t.info(Fo);
                          const e = new Error(Fo);
                          return m.call({ error: e }).then(() => {});
                        }
                        return s({
                          request: g,
                          runOnResponseCallbacks: f.call,
                          runOnRequestFailureCallbacks: m.call,
                        });
                      });
                  },
                  applyResponse(e, t = {}) {
                    const {
                        renderDecisions: r = !1,
                        decisionContext: o = {},
                        responseHeaders: s = {},
                        responseBody: l = { handle: [] },
                        personalization: d,
                      } = t,
                      u = i(),
                      p = a({ payload: u }),
                      g = be();
                    return n
                      .onBeforeEvent({
                        event: e,
                        renderDecisions: r,
                        decisionContext: o,
                        decisionScopes: [Oo],
                        personalization: d,
                        onResponse: g.add,
                        onRequestFailure: nn,
                      })
                      .then(
                        () => (
                          u.addEvent(e),
                          c({
                            request: p,
                            responseHeaders: s,
                            responseBody: l,
                            runOnResponseCallbacks: g.call,
                          })
                        )
                      );
                  },
                };
              };
              const Ho = "state:store";
              var zo = ({
                cookieJar: e,
                shouldTransferCookie: t,
                apexDomain: n,
                dateProvider: r,
              }) => ({
                cookiesToPayload(r, o) {
                  const i = "" !== n && o.endsWith(n),
                    a = { domain: n, cookiesEnabled: !0 };
                  if (!i) {
                    const n = e.get(),
                      r = Object.keys(n)
                        .filter(t)
                        .map((e) => ({ key: e, value: n[e] }));
                    r.length && (a.entries = r);
                  }
                  r.mergeState(a);
                },
                responseToCookies(t) {
                  t.getPayloadsByType(Ho).forEach((t) => {
                    const o = { domain: n },
                      i =
                        t.attrs &&
                        t.attrs.SameSite &&
                        t.attrs.SameSite.toLowerCase();
                    void 0 !== t.maxAge &&
                      (o.expires = new Date(r().getTime() + 1e3 * t.maxAge)),
                      void 0 !== i && (o.sameSite = i),
                      "none" === i && (o.secure = !0),
                      e.set(t.key, t.value, o);
                  });
                },
              });
              const Go = "mboxEdgeCluster",
                Jo = "at_qa_mode",
                Wo = "mbox";
              var Qo =
                  ({ orgId: e, targetMigrationEnabled: t }) =>
                  (n) =>
                    Zt(e, n) || n === Jo || (t && n === Wo),
                Yo = "v1";
              const Xo = "TypeError",
                Ko = "NetworkError",
                Zo = (e) => e.name === Xo || e.name === Ko || 0 === e.status;
              var ei = (e) => {
                  const t = e.shift() || [],
                    n = e.shift() || [];
                  return ge({}, ...t, ...n, ...e);
                },
                ti = (e) => (t) => {
                  const n = () => {
                    throw t;
                  };
                  return e.call({ error: t }).then(n, n);
                };
              const ni = (e, t) => t.getUseIdThirdPartyDomain() && Zo(e);
              var ri = ({
                config: e,
                lifecycle: t,
                cookieTransfer: n,
                sendNetworkRequest: r,
                createResponse: o,
                processWarningsAndErrors: i,
                getLocationHint: a,
                getAssuranceValidationTokenParams: s,
              }) => {
                const { edgeDomain: c, edgeBasePath: l, datastreamId: d } = e;
                let u = !1;
                const p = (e, t) => {
                  const n = a(),
                    r = n
                      ? `${l}/${n}${t.getEdgeSubPath()}`
                      : `${l}${t.getEdgeSubPath()}`,
                    o = t.getDatastreamIdOverride() || d;
                  return (
                    o !== d &&
                      t
                        .getPayload()
                        .mergeMeta({
                          sdkConfig: { datastream: { original: d } },
                        }),
                    `https://${e}/${r}/${Yo}/${t.getAction()}?configId=${o}&requestId=${t.getId()}${s()}`
                  );
                };
                return ({
                  request: e,
                  runOnResponseCallbacks: a = nn,
                  runOnRequestFailureCallbacks: s = nn,
                }) => {
                  const l = be();
                  l.add(t.onResponse), l.add(a);
                  const d = be();
                  return (
                    d.add(t.onRequestFailure),
                    d.add(s),
                    t
                      .onBeforeRequest({
                        request: e,
                        onResponse: l.add,
                        onRequestFailure: d.add,
                      })
                      .then(() => {
                        const t = u || !e.getUseIdThirdPartyDomain() ? c : ko,
                          o = p(t, e),
                          i = e.getPayload();
                        return (
                          n.cookiesToPayload(i, t),
                          r({
                            requestId: e.getId(),
                            url: o,
                            payload: i,
                            useSendBeacon: e.getUseSendBeacon(),
                          })
                        );
                      })
                      .then((e) => (i(e), e))
                      .catch((t) => {
                        if (ni(t, e)) {
                          (u = !0), e.setUseIdThirdPartyDomain(!1);
                          const t = p(c, e),
                            o = e.getPayload();
                          return (
                            n.cookiesToPayload(o, c),
                            r({
                              requestId: e.getId(),
                              url: t,
                              payload: o,
                              useSendBeacon: e.getUseSendBeacon(),
                            })
                          );
                        }
                        return ti(d)(t);
                      })
                      .then(({ parsedBody: e, getHeader: t }) => {
                        const r = o({ content: e, getHeader: t });
                        return (
                          n.responseToCookies(r),
                          l.call({ response: r }).then(ei)
                        );
                      })
                  );
                };
              };
              const oi = 204,
                ii = "The server responded with a";
              var ai =
                  ({ logger: e }) =>
                  (t) => {
                    const { statusCode: n, body: r, parsedBody: o } = t;
                    if (
                      n < 200 ||
                      n >= 300 ||
                      (!o && n !== oi) ||
                      (o && !Array.isArray(o.handle))
                    ) {
                      const e = o ? JSON.stringify(o, null, 2) : r;
                      throw new Error(
                        `${ii} status code ${n} and ${
                          e ? `response body:\n${e}` : "no response body."
                        }`
                      );
                    }
                    if (o) {
                      const { warnings: t = [], errors: n = [] } = o;
                      t.forEach((t) => {
                        e.warn(`${ii} warning:`, t);
                      }),
                        n.forEach((t) => {
                          e.error(`${ii} non-fatal error:`, t);
                        });
                    }
                  },
                si = ({ orgId: e, cookieJar: t }) => {
                  const n = Ot(e, Vt),
                    r = () => t.get(n),
                    o = () => {
                      const e = t.get(Go);
                      if (e) return `t${e}`;
                    };
                  return () => r() || o();
                };
              const ci = 3,
                li = [429, 503, 502, 504];
              var di = ({ response: e, retriesAttempted: t }) =>
                t < ci && li.includes(e.statusCode);
              const ui = 1e3,
                pi = 1e3,
                gi = 0.3,
                fi = (e) => {
                  const t = ui + e * pi,
                    n = t * gi,
                    r = t - n,
                    o = t + n;
                  return Math.round(r + Math.random() * (o - r));
                },
                mi = (e) => {
                  const t = e.getHeader(io);
                  let n;
                  if (t) {
                    const e = parseInt(t, 10);
                    n = Kt(e)
                      ? 1e3 * e
                      : Math.max(
                          0,
                          new Date(t).getTime() - new Date().getTime()
                        );
                  }
                  return n;
                };
              var hi = ({ response: e, retriesAttempted: t }) => {
                let n = mi(e);
                return void 0 === n && (n = fi(t)), n;
              };
              const yi = 200;
              var vi =
                  ({
                    cookieTransfer: e,
                    lifecycle: t,
                    createResponse: n,
                    processWarningsAndErrors: r,
                  }) =>
                  ({
                    request: o,
                    responseHeaders: i,
                    responseBody: a,
                    runOnResponseCallbacks: s = nn,
                    runOnRequestFailureCallbacks: c = nn,
                  }) => {
                    const l = be();
                    l.add(t.onResponse), l.add(s);
                    const d = be();
                    d.add(t.onRequestFailure), d.add(c);
                    const u = (e) => i[e];
                    return t
                      .onBeforeRequest({
                        request: o,
                        onResponse: l.add,
                        onRequestFailure: d.add,
                      })
                      .then(() =>
                        r({
                          statusCode: yi,
                          getHeader: u,
                          body: JSON.stringify(a),
                          parsedBody: a,
                        })
                      )
                      .catch(ti(d))
                      .then(() => {
                        const t = n({ content: a, getHeader: u });
                        return (
                          e.responseToCookies(t),
                          l.call({ response: t }).then(ei)
                        );
                      });
                  },
                bi = (e) => {
                  let t = window.__alloyMonitors || [];
                  return e && (t = t.concat(e)), t;
                },
                wi = (e) => (t) => {
                  const n = {
                    webPageDetails: { URL: e.location.href || e.location },
                    webReferrer: { URL: e.document.referrer },
                  };
                  ye(t, { web: n });
                };
              const Ei = (e) => {
                  const {
                    screen: { orientation: t },
                  } = e;
                  if (null == t || null == t.type) return null;
                  const n = t.type.split("-");
                  return 0 === n.length ||
                    ("portrait" !== n[0] && "landscape" !== n[0])
                    ? null
                    : n[0];
                },
                ki = (e) => {
                  if (Fe(e.matchMedia)) {
                    if (e.matchMedia("(orientation: portrait)").matches)
                      return "portrait";
                    if (e.matchMedia("(orientation: landscape)").matches)
                      return "landscape";
                  }
                  return null;
                };
              var Ci = (e) => (t) => {
                  const {
                      screen: { width: n, height: r },
                    } = e,
                    o = {},
                    i = yn(r);
                  i >= 0 && (o.screenHeight = i);
                  const a = yn(n);
                  a >= 0 && (o.screenWidth = a);
                  const s = Ei(e) || ki(e);
                  s && (o.screenOrientation = s),
                    Object.keys(o).length > 0 && ye(t, { device: o });
                },
                Si = (e) => (t) => {
                  const {
                      document: {
                        documentElement: {
                          clientWidth: n,
                          clientHeight: r,
                        } = {},
                      },
                    } = e,
                    o = { type: "browser" },
                    i = yn(n);
                  i >= 0 && (o.browserDetails = { viewportWidth: i });
                  const a = yn(r);
                  a >= 0 &&
                    ((o.browserDetails = o.browserDetails || {}),
                    (o.browserDetails.viewportHeight = a)),
                    ye(t, { environment: o });
                },
                Ii = (e) => (t) => {
                  const n = e(),
                    r = {},
                    o = yn(n.getTimezoneOffset());
                  void 0 !== o && (r.localTimezoneOffset = o),
                    (void 0 === o || Math.abs(o) < 6e3) &&
                      (r.localTime = bn(n)),
                    ye(t, { placeContext: r });
                },
                Ti = (e) => (t) => {
                  const n = e().toISOString();
                  ye(t, { timestamp: n });
                },
                Pi = "https://ns.adobe.com/experience/alloy";
              const Di = "2.28.0";
              var Oi = (e) => {
                  ye(e, {
                    implementationDetails: {
                      name: Pi,
                      version: Di,
                      environment: "browser",
                    },
                  });
                },
                Ni = (e, t, n, r) => {
                  const o = e.context
                    .flatMap((e, r) =>
                      n[e]
                        ? [n[e]]
                        : (t.warn(
                            `Invalid context[${r}]: '${e}' is not available.`
                          ),
                          [])
                    )
                    .concat(r);
                  return {
                    namespace: "Context",
                    lifecycle: {
                      onBeforeEvent({ event: e }) {
                        const n = {};
                        return Promise.all(
                          o.map((e) => Promise.resolve(e(n, t)))
                        ).then(() => e.mergeXdm(n));
                      },
                    },
                  };
                },
                Ai = [
                  ["architecture", "string"],
                  ["bitness", "string"],
                  ["model", "string"],
                  ["platformVersion", "string"],
                  ["wow64", "boolean"],
                ];
              const Ri = (e) => "userAgentData" in e;
              var xi = (e) =>
                Ri(e)
                  ? (t, n) => {
                      try {
                        return e.userAgentData
                          .getHighEntropyValues(Ai.map((e) => e[0]))
                          .then((e) => {
                            const n = {};
                            Ai.forEach(([t, r]) => {
                              Object.prototype.hasOwnProperty.call(e, t) &&
                                typeof e[t] === r &&
                                (n[t] = e[t]);
                            }),
                              ye(t, {
                                environment: {
                                  browserDetails: { userAgentClientHints: n },
                                },
                              });
                          });
                      } catch (e) {
                        return (
                          n.warn(
                            `Unable to collect user-agent client hints. ${e.message}`
                          ),
                          nn
                        );
                      }
                    }
                  : nn;
              const Mi = wi(window),
                _i = Ci(window),
                Li = Si(window),
                ji = Ii(() => new Date()),
                $i = Ti(() => new Date()),
                Ui = { web: Mi, device: _i, environment: Li, placeContext: ji },
                qi = { highEntropyUserAgentHints: xi(navigator) },
                Bi = { ...Ui, ...qi },
                Fi = [$i, Oi],
                Vi = ({ config: e, logger: t }) => Ni(e, t, Bi, Fi);
              (Vi.namespace = "Context"),
                (Vi.configValidators = Ar({
                  context: Ir(Rr()).default(Object.keys(Ui)),
                }));
              var Hi = ({ options: e }) =>
                  Ar({
                    type: Rr(),
                    xdm: Ar({ eventType: Rr(), identityMap: Mr }),
                    data: Ar({}),
                    documentUnloading: Tr(),
                    renderDecisions: Tr(),
                    decisionScopes: Ir(Rr()).uniqueItems(),
                    personalization: Ar({
                      decisionScopes: Ir(Rr()).uniqueItems(),
                      surfaces: Ir(Rr()).uniqueItems(),
                      sendDisplayEvent: Tr().default(!0),
                      includeRenderedPropositions: Tr().default(!1),
                      defaultPersonalizationEnabled: Tr(),
                      decisionContext: Ar({}),
                    }).default({ sendDisplayEvent: !0 }),
                    datasetId: Rr(),
                    mergeId: Rr(),
                    edgeConfigOverrides: _r,
                  })
                    .required()
                    .noUnknownFields()(e),
                zi = ({ options: e }) =>
                  Ar({
                    renderDecisions: Tr(),
                    responseHeaders: Nr(Rr().required()),
                    responseBody: Ar({
                      handle: Ir(
                        Ar({ type: Rr().required(), payload: Sr().required() })
                      ).required(),
                    }).required(),
                    personalization: Ar({
                      sendDisplayEvent: Tr().default(!0),
                      decisionContext: Ar({}),
                    }).default({ sendDisplayEvent: !0 }),
                  }).noUnknownFields()(e);
              const Gi = ({ eventManager: e, logger: t }) => ({
                commands: {
                  sendEvent: {
                    documentationUri: "https://adobe.ly/3GQ3Q7t",
                    optionsValidator: (e) => Hi({ options: e }),
                    run: (n) => {
                      const {
                          xdm: r,
                          data: o,
                          documentUnloading: i,
                          type: a,
                          mergeId: s,
                          datasetId: c,
                          edgeConfigOverrides: l,
                          ...d
                        } = n,
                        u = e.createEvent();
                      return (
                        i && u.documentMayUnload(),
                        u.setUserXdm(r),
                        u.setUserData(o),
                        a && u.mergeXdm({ eventType: a }),
                        s && u.mergeXdm({ eventMergeId: s }),
                        l && (d.edgeConfigOverrides = l),
                        c &&
                          (t.warn(
                            "The 'datasetId' option has been deprecated. Please use 'edgeConfigOverrides.com_adobe_experience_platform.datasets.event.datasetId' instead."
                          ),
                          (d.edgeConfigOverrides = l || {}),
                          ye(d.edgeConfigOverrides, {
                            com_adobe_experience_platform: {
                              datasets: { event: { datasetId: c } },
                            },
                          })),
                        e.sendEvent(u, d)
                      );
                    },
                  },
                  applyResponse: {
                    documentationUri: "",
                    optionsValidator: (e) => zi({ options: e }),
                    run: (t) => {
                      const {
                          renderDecisions: n = !1,
                          decisionContext: r = {},
                          responseHeaders: o = {},
                          responseBody: i = { handle: [] },
                          personalization: a,
                        } = t,
                        s = e.createEvent();
                      return e.applyResponse(s, {
                        renderDecisions: n,
                        decisionContext: r,
                        responseHeaders: o,
                        responseBody: i,
                        personalization: a,
                      });
                    },
                  },
                },
              });
              Gi.namespace = "DataCollector";
              const Ji = (e, t) =>
                `ID sync ${t ? "succeeded" : "failed"}: ${e.spec.url}`;
              var Wi =
                ({ fireReferrerHideableImage: e, logger: t }) =>
                (n) => {
                  const r = n.filter((e) => "url" === e.type);
                  return r.length
                    ? Promise.all(
                        r.map((n) =>
                          e(n.spec)
                            .then(() => {
                              t.info(Ji(n, !0));
                            })
                            .catch(() => {
                              t.error(Ji(n, !1));
                            })
                        )
                      ).then(nn)
                    : Promise.resolve();
                };
              const Qi = Ar({
                thirdPartyCookiesEnabled: Tr().default(!0),
                idMigrationEnabled: Tr().default(!0),
              });
              var Yi = Ar({
                  url: Rr().required().nonEmpty(),
                  edgeConfigOverrides: _r,
                })
                  .required()
                  .noUnknownFields(),
                Xi = "ECID",
                Ki = ({
                  addEcidQueryToPayload: e,
                  addQueryStringIdentityToPayload: t,
                  ensureSingleIdentity: n,
                  setLegacyEcid: r,
                  handleResponseForIdSyncs: o,
                  getNamespacesFromResponse: i,
                  getIdentity: a,
                  consent: s,
                  appendIdentityToUrl: c,
                  logger: l,
                  getIdentityOptionsValidator: d,
                  decodeKndctrCookie: u,
                }) => {
                  let p,
                    g = {};
                  return {
                    lifecycle: {
                      onBeforeRequest: ({
                        request: r,
                        onResponse: o,
                        onRequestFailure: i,
                      }) => (
                        e(r.getPayload()),
                        t(r.getPayload()),
                        n({ request: r, onResponse: o, onRequestFailure: i })
                      ),
                      onResponse({ response: e }) {
                        const t = i(e);
                        return (
                          (p && p[Xi]) || !t || !t[Xi] || r(t[Xi]),
                          t &&
                            Object.keys(t).length > 0 &&
                            (p = { ...p, ...t }),
                          (g = { ...g, ...e.getEdge() }),
                          o(e)
                        );
                      },
                    },
                    commands: {
                      getIdentity: {
                        optionsValidator: d,
                        run: (e) => {
                          const { namespaces: t } = e;
                          return s
                            .awaitConsent()
                            .then(() => {
                              if (p) return;
                              const n = u();
                              return n &&
                                t.includes(Xi) &&
                                (p || (p = {}), (p[Xi] = n), 1 === t.length)
                                ? void 0
                                : a(e);
                            })
                            .then(() => ({
                              identity: t.reduce(
                                (e, t) => ((e[t] = p[t] || null), e),
                                {}
                              ),
                              edge: g,
                            }));
                        },
                      },
                      appendIdentityToUrl: {
                        optionsValidator: Yi,
                        run: (e) =>
                          s
                            .withConsent()
                            .then(() => {
                              if (p) return;
                              const t = u();
                              return t
                                ? (p || (p = {}), void (p[Xi] = t))
                                : a(e);
                            })
                            .then(() => ({ url: c(p[Xi], e.url) }))
                            .catch(
                              (t) => (
                                l.warn(
                                  `Unable to append identity to url. ${t.message}`
                                ),
                                e
                              )
                            ),
                      },
                    },
                  };
                },
                Zi = ({
                  config: e,
                  getEcidFromVisitor: t,
                  apexDomain: n,
                  isPageSsl: r,
                  cookieJar: o,
                }) => {
                  const { idMigrationEnabled: i, orgId: a } = e,
                    s = `AMCV_${a}`,
                    c = () => {
                      let e = null;
                      const t = "s_ecid",
                        n = o.get(t) || o.get(s);
                      if (n) {
                        const t = /(^|\|)MCMID\|(\d+)($|\|)/,
                          r = n.match(t);
                        r && (e = r[2]);
                      }
                      return e;
                    };
                  return {
                    getEcid() {
                      if (i) {
                        const e = c();
                        return e ? Promise.resolve(e) : t();
                      }
                      return Promise.resolve();
                    },
                    setEcid(e) {
                      if (i && c() !== e) {
                        const t = r ? { sameSite: "none", secure: !0 } : {};
                        o.set(s, `MCMID|${e}`, {
                          domain: n,
                          expires: 390,
                          ...t,
                        });
                      }
                    },
                  };
                },
                ea = ({ logger: e }) =>
                  new Promise((t, n) => {
                    if (pe(window.adobe) && pe(window.adobe.optIn)) {
                      const r = window.adobe.optIn;
                      e.info(
                        "Delaying request while waiting for legacy opt-in to let Visitor retrieve ECID from server."
                      ),
                        r.fetchPermissions(() => {
                          r.isApproved([r.Categories.ECID])
                            ? (e.info(
                                "Received legacy opt-in approval to let Visitor retrieve ECID from server."
                              ),
                              t())
                            : n(new Error("Legacy opt-in was declined."));
                        }, !0);
                    } else t();
                  }),
                ta = (e) => {
                  const t = e.Visitor;
                  return Fe(t) && Fe(t.getInstance) && t;
                },
                na =
                  ({ logger: e, orgId: t, awaitVisitorOptIn: n }) =>
                  () => {
                    const r = ta(window);
                    return r
                      ? n({ logger: e })
                          .then(
                            () => (
                              e.info(
                                "Delaying request while using Visitor to retrieve ECID from server."
                              ),
                              new Promise((n) => {
                                r.getInstance(t, {}).getMarketingCloudVisitorID(
                                  (t) => {
                                    e.info(
                                      "Resuming previously delayed request that was waiting for ECID from Visitor."
                                    ),
                                      n(t);
                                  },
                                  !0
                                );
                              })
                            )
                          )
                          .catch((t) => {
                            t
                              ? e.info(
                                  `${t.message}, retrieving ECID from experience edge`
                                )
                              : e.info(
                                  "An error occurred while obtaining the ECID from Visitor."
                                );
                          })
                      : Promise.resolve();
                  },
                ra =
                  ({ processIdSyncs: e }) =>
                  (t) =>
                    e(t.getPayloadsByType("identity:exchange")),
                oa = ({
                  doesIdentityCookieExist: e,
                  setDomainForInitialIdentityPayload: t,
                  addLegacyEcidToPayload: n,
                  awaitIdentityCookie: r,
                  logger: o,
                }) => {
                  let i;
                  const a = (e) => (t(e), n(e.getPayload()));
                  return ({
                    request: t,
                    onResponse: n,
                    onRequestFailure: s,
                  }) => {
                    if (e())
                      return t.setIsIdentityEstablished(), Promise.resolve();
                    if (i) {
                      o.info(
                        "Delaying request while retrieving ECID from server."
                      );
                      const e = i;
                      return (
                        (i = e.catch(() =>
                          r({ onResponse: n, onRequestFailure: s })
                        )),
                        i.catch(() => {}),
                        e
                          .then(() => {
                            o.info("Resuming previously delayed request."),
                              t.setIsIdentityEstablished();
                          })
                          .catch(() => a(t))
                      );
                    }
                    return (
                      (i = r({ onResponse: n, onRequestFailure: s })),
                      i.catch(() => {}),
                      a(t)
                    );
                  };
                },
                ia = "CORE",
                aa = ({
                  thirdPartyCookiesEnabled: e,
                  areThirdPartyCookiesSupportedByDefault: t,
                }) => {
                  const n = { identity: { fetch: [Xi] } };
                  return (
                    e && t() && n.identity.fetch.push(ia),
                    (e) => {
                      e.mergeQuery(n);
                    }
                  );
                },
                sa =
                  ({
                    thirdPartyCookiesEnabled: e,
                    areThirdPartyCookiesSupportedByDefault: t,
                  }) =>
                  (n) => {
                    e && t() && n.setUseIdThirdPartyDomain();
                  },
                ca =
                  ({ getLegacyEcid: e, addEcidToPayload: t }) =>
                  (n) =>
                    n.hasIdentity(Xi)
                      ? Promise.resolve()
                      : e().then((e) => {
                          e && t(n, e);
                        }),
                la = "adobe_mc",
                da = (e) => {
                  try {
                    return decodeURIComponent(e);
                  } catch {
                    return "";
                  }
                };
              const ua = 300;
              var pa =
                  ({
                    locationSearch: e,
                    dateProvider: t,
                    orgId: n,
                    logger: r,
                  }) =>
                  (o) => {
                    if (o.hasIdentity(Xi)) return;
                    let i = dn.parse(e)[la];
                    if (void 0 === i) return;
                    Array.isArray(i) &&
                      (r.warn(
                        "Found multiple adobe_mc query string paramters, only using the last one."
                      ),
                      (i = i[i.length - 1]));
                    const a = i.split("|").reduce((e, t) => {
                        const [n, r] = t.split("=");
                        return (
                          (e[n] = da(r)),
                          (e[n] = e[n].replace(/[^a-zA-Z0-9@.]/g, "")),
                          e
                        );
                      }, {}),
                      s = parseInt(a.TS, 10),
                      c = a.MCMID,
                      l = da(a.MCORGID);
                    t().getTime() / 1e3 <= s + ua && l === n && c
                      ? (r.info(
                          `Found valid ECID identity ${c} from the adobe_mc query string parameter.`
                        ),
                        o.addIdentity(Xi, { id: c }))
                      : r.info(
                          "Detected invalid or expired adobe_mc query string parameter."
                        );
                  },
                ga = (e, t) => {
                  e.addIdentity(Xi, { id: t });
                },
                fa =
                  ({ doesIdentityCookieExist: e, orgId: t, logger: n }) =>
                  ({ onResponse: r, onRequestFailure: o }) =>
                    new Promise((i, a) => {
                      r(() => {
                        e()
                          ? i()
                          : (n.warn(
                              `Identity cookie not found. This could be caused by any of the following issues:\n\t* The org ID ${t} configured in Alloy doesn't match the org ID specified in the edge configuration.\n\t* Experience edge was not able to set the identity cookie due to domain or cookie restrictions.\n\t* The request was canceled by the browser and not fully processed.`
                            ),
                            a(new Error("Identity cookie not found.")));
                      }),
                        o(() => {
                          e()
                            ? i()
                            : a(new Error("Identity cookie not found."));
                        });
                    }),
                ma = (e) =>
                  e
                    .getPayloadsByType("identity:result")
                    .reduce(
                      (e, t) => (
                        t.namespace &&
                          t.namespace.code &&
                          (e[t.namespace.code] = t.id),
                        e
                      ),
                      {}
                    ),
                ha =
                  ({
                    sendEdgeNetworkRequest: e,
                    createIdentityRequestPayload: t,
                    createIdentityRequest: n,
                    globalConfigOverrides: r,
                  }) =>
                  ({ namespaces: o, edgeConfigOverrides: i } = {}) => {
                    const a = Lo({
                        payload: t(o),
                        globalConfigOverrides: r,
                        localConfigOverrides: i,
                      }),
                      s = n(a);
                    return e({ request: s });
                  },
                ya = ({ payload: e, datastreamIdOverride: t }) =>
                  Ao({
                    payload: e,
                    datastreamIdOverride: t,
                    getAction: () => "identity/acquire",
                    getUseSendBeacon: () => !1,
                  }),
                va = (e) => {
                  const t = { query: { identity: { fetch: e } } };
                  return xo({
                    content: t,
                    addIdentity: No(t),
                    hasIdentity: Mo(t),
                  });
                };
              const ba = /^([^?#]*)(\??[^#]*)(#?.*)$/,
                wa = (e) => ("" === e ? "?" : "?" === e ? "" : "&");
              var Ea =
                ({ dateProvider: e, orgId: t }) =>
                (n, r) => {
                  const o = Math.round(e().getTime() / 1e3),
                    i = encodeURIComponent(
                      `TS=${o}|MCMID=${n}|MCORGID=${encodeURIComponent(t)}`
                    ),
                    [, a, s, c] = r.match(ba);
                  return `${a}${s}${wa(s)}adobe_mc=${i}${c}`;
                };
              const ka = Ar({
                namespaces: Ir(xr(Xi, ia))
                  .nonEmpty()
                  .uniqueItems()
                  .default([Xi]),
                edgeConfigOverrides: _r,
              })
                .noUnknownFields()
                .default({ namespaces: [Xi] });
              var Ca =
                ({ thirdPartyCookiesEnabled: e }) =>
                (t) => {
                  const n = ka(t);
                  if (!e && n.namespaces.includes(ia))
                    throw new Error(
                      `namespaces: The ${ia} namespace cannot be requested when third-party cookies are disabled.`
                    );
                  return n;
                };
              const Sa = 1,
                Ia = (e, t) => {
                  let n,
                    r = 0,
                    o = 0;
                  do {
                    if (t < 0 || t + o >= e.length)
                      throw new Error(
                        "Invalid varint: buffer ended unexpectedly"
                      );
                    if (
                      ((n = e[t + o]),
                      (r |= (127 & n) << (7 * o)),
                      (o += 1),
                      o > 10)
                    )
                      throw new Error("Invalid varint: too long");
                  } while (128 & n);
                  return { value: r, length: o };
                },
                Ta = Object.freeze({
                  VARINT: 0,
                  I64: 1,
                  LEN: 2,
                  SGROUP: 3,
                  EGROUP: 4,
                  I32: 5,
                }),
                Pa = (e) => {
                  let t = 0,
                    n = null;
                  for (; t < e.length && !n; ) {
                    const { value: r, length: o } = Ia(e, t);
                    t += o;
                    const i = 7 & r;
                    if (r >> 3 === Sa) {
                      if (i === Ta.LEN) {
                        const r = Ia(e, t);
                        return (
                          (t += r.length),
                          (n = new TextDecoder().decode(
                            e.slice(t, t + r.value)
                          )),
                          (t += r.value),
                          n
                        );
                      }
                    } else
                      switch (i) {
                        case Ta.VARINT:
                          t += Ia(e, t).length;
                          break;
                        case Ta.I64:
                          t += 8;
                          break;
                        case Ta.LEN: {
                          const n = Ia(e, t);
                          t += n.length + n.value;
                          break;
                        }
                        case Ta.SGROUP:
                        case Ta.EGROUP:
                          break;
                        case Ta.I32:
                          t += 4;
                          break;
                        default:
                          throw new Error(
                            `Malformed kndctr cookie. Unknown wire type: ${i}`
                          );
                      }
                  }
                  throw new Error("No ECID found in cookie.");
                },
                Da = (e) => {
                  const t = atob(e);
                  return Uint8Array.from(t, (e) => e.codePointAt(0));
                };
              var Oa = ({ orgId: e, cookieJar: t, logger: n }) => {
                const r = Ot(e, "identity");
                return () => {
                  const e = t.get(r);
                  if (!e) return null;
                  try {
                    const t = decodeURIComponent(e)
                        .replace(/_/g, "/")
                        .replace(/-/g, "+"),
                      n = Da(t);
                    return Pa(n);
                  } catch (e) {
                    return (
                      n.warn(`Unable to decode ECID from ${r} cookie`, e), null
                    );
                  }
                };
              };
              const Na = ({
                config: e,
                logger: t,
                consent: n,
                fireReferrerHideableImage: r,
                sendEdgeNetworkRequest: o,
                apexDomain: i,
                getBrowser: a,
              }) => {
                const {
                    orgId: s,
                    thirdPartyCookiesEnabled: c,
                    edgeConfigOverrides: l,
                  } = e,
                  d = na({ logger: t, orgId: s, awaitVisitorOptIn: ea }),
                  u = Ie({ logger: t, cookieJar: me }),
                  p = Zi({
                    config: e,
                    getEcidFromVisitor: d,
                    apexDomain: i,
                    cookieJar: u,
                    isPageSsl: "https:" === window.location.protocol,
                  }),
                  g = Ht({ orgId: s }),
                  f = ha({
                    sendEdgeNetworkRequest: o,
                    createIdentityRequestPayload: va,
                    createIdentityRequest: ya,
                    globalConfigOverrides: l,
                  }),
                  m = qt({ getBrowser: a }),
                  h = sa({
                    thirdPartyCookiesEnabled: c,
                    areThirdPartyCookiesSupportedByDefault: m,
                  }),
                  y = ca({ getLegacyEcid: p.getEcid, addEcidToPayload: ga }),
                  v = pa({
                    locationSearch: window.document.location.search,
                    dateProvider: () => new Date(),
                    orgId: s,
                    logger: t,
                  }),
                  b = fa({ doesIdentityCookieExist: g, orgId: s, logger: t }),
                  w = oa({
                    doesIdentityCookieExist: g,
                    setDomainForInitialIdentityPayload: h,
                    addLegacyEcidToPayload: y,
                    awaitIdentityCookie: b,
                    logger: t,
                  }),
                  E = Wi({ fireReferrerHideableImage: r, logger: t }),
                  k = ra({ processIdSyncs: E }),
                  C = Ea({ dateProvider: () => new Date(), orgId: s }),
                  S = Ca({ thirdPartyCookiesEnabled: c }),
                  I = aa({
                    thirdPartyCookiesEnabled: c,
                    areThirdPartyCookiesSupportedByDefault: m,
                  }),
                  T = Oa({ orgId: s, cookieJar: u, logger: t });
                return Ki({
                  addEcidQueryToPayload: I,
                  addQueryStringIdentityToPayload: v,
                  ensureSingleIdentity: w,
                  setLegacyEcid: p.setEcid,
                  handleResponseForIdSyncs: k,
                  getNamespacesFromResponse: ma,
                  getIdentity: f,
                  consent: n,
                  appendIdentityToUrl: C,
                  logger: t,
                  getIdentityOptionsValidator: S,
                  decodeKndctrCookie: T,
                });
              };
              (Na.namespace = "Identity"), (Na.configValidators = Qi);
              const Aa = ({ config: e, componentRegistry: t }) => {
                  const n = [...t.getCommandNames(), co, lo].sort(),
                    r = { ...e };
                  Object.keys(e).forEach((t) => {
                    const n = e[t];
                    "function" == typeof n && (r[t] = n.toString());
                  });
                  const o = t.getComponentNames();
                  return {
                    version: Di,
                    configs: r,
                    commands: n,
                    components: o,
                  };
                },
                Ra = ({ config: e, componentRegistry: t }) => ({
                  commands: {
                    getLibraryInfo: {
                      run: () => ({
                        libraryInfo: Aa({ config: e, componentRegistry: t }),
                      }),
                    },
                  },
                });
              Ra.namespace = "LibraryInfo";
              var xa = Object.freeze({
                __proto__: null,
                context: Vi,
                dataCollector: Gi,
                identity: Na,
                libraryInfo: Ra,
              });
              const Ma = Wt(window),
                { fetch: _a, navigator: La } = window,
                ja = So(),
                $a = Tt(window, me),
                Ua = To({ fetch: _a }),
                qa = vt(),
                Ba = Bo({ window: window, createNamespacedStorage: Ma }),
                Fa = Gt({ userAgent: window.navigator.userAgent }),
                Va = ({
                  instanceName: e,
                  logController: {
                    setDebugEnabled: t,
                    logger: n,
                    createComponentLogger: r,
                  },
                  components: o,
                }) => {
                  const i = Vr(),
                    a = Br(i),
                    s = o.concat(Object.values(xa)),
                    c = (e) => {
                      t(e.enabled, { fromConfig: !1 });
                    },
                    l = Ie({ logger: n, cookieJar: me }),
                    d = (o) => {
                      const c = vo({
                          options: o,
                          componentCreators: s,
                          coreConfigValidators: ja,
                          createConfig: wo,
                          logger: n,
                          setDebugEnabled: t,
                        }),
                        { orgId: d, targetMigrationEnabled: u } = c,
                        p = Qo({ orgId: d, targetMigrationEnabled: u }),
                        g = zo({
                          cookieJar: l,
                          shouldTransferCookie: p,
                          apexDomain: $a,
                          dateProvider: () => new Date(),
                        }),
                        f = Fe(La.sendBeacon)
                          ? Po({
                              sendBeacon: La.sendBeacon.bind(La),
                              sendFetchRequest: Ua,
                              logger: n,
                            })
                          : Ua,
                        m = Hr({
                          logger: n,
                          sendFetchRequest: Ua,
                          sendBeaconRequest: f,
                          isRequestRetryable: di,
                          getRequestRetryDelay: hi,
                        }),
                        h = ai({ logger: n }),
                        y = zr({ logger: n }),
                        v = so({ extractEdgeInfo: y }),
                        b = si({ orgId: d, cookieJar: me }),
                        w = ri({
                          config: c,
                          lifecycle: a,
                          cookieTransfer: g,
                          sendNetworkRequest: m,
                          createResponse: v,
                          processWarningsAndErrors: h,
                          getLocationHint: b,
                          getAssuranceValidationTokenParams: Ba,
                        }),
                        E = vi({
                          lifecycle: a,
                          cookieTransfer: g,
                          createResponse: v,
                          processWarningsAndErrors: h,
                        }),
                        k = to({ logger: n }),
                        C = no({ generalConsentState: k, logger: n }),
                        S = Vo({
                          config: c,
                          logger: n,
                          lifecycle: a,
                          consent: C,
                          createEvent: oo,
                          createDataCollectionRequestPayload: _o,
                          createDataCollectionRequest: Ro,
                          sendEdgeNetworkRequest: w,
                          applyResponse: E,
                        });
                      return bo({
                        componentCreators: s,
                        lifecycle: a,
                        componentRegistry: i,
                        getImmediatelyAvailableTools(t) {
                          const n = r(t);
                          return {
                            config: c,
                            componentRegistry: i,
                            consent: C,
                            eventManager: S,
                            fireReferrerHideableImage: qa,
                            logger: n,
                            lifecycle: a,
                            sendEdgeNetworkRequest: w,
                            handleError: Io({
                              errorPrefix: `[${e}] [${t}]`,
                              logger: n,
                            }),
                            createNamespacedStorage: Ma,
                            apexDomain: $a,
                            getBrowser: Fa,
                          };
                        },
                      });
                    },
                    u = Io({ errorPrefix: `[${e}]`, logger: n });
                  return uo({
                    logger: n,
                    configureCommand: d,
                    setDebugCommand: c,
                    handleError: u,
                    validateCommandOptions: go,
                  });
                },
                Ha =
                  ({ eventManager: e, lifecycle: t, handleError: n }) =>
                  (r) => {
                    if (r.s_fe) return Promise.resolve();
                    const o =
                        "composedPath" in r && r.composedPath().length > 0
                          ? r.composedPath()[0]
                          : r.target,
                      i = e.createEvent();
                    return (
                      i.documentMayUnload(),
                      t
                        .onClick({ event: i, clickedElement: o })
                        .then(() =>
                          i.isEmpty() ? Promise.resolve() : e.sendEvent(i)
                        )
                        .then(nn)
                        .catch((e) => {
                          n(e, "click collection");
                        })
                    );
                  };
              var za = ({ eventManager: e, lifecycle: t, handleError: n }) => {
                const r = Ha({ eventManager: e, lifecycle: t, handleError: n });
                document.addEventListener("click", r, !0);
              };
              const Ga =
                  "\\.(exe|zip|wav|mp3|mov|mpg|avi|wmv|pdf|doc|docx|xls|xlsx|ppt|pptx)$",
                Ja = Rr().regexp().default(Ga),
                Wa = Ar({
                  clickCollectionEnabled: Tr().default(!0),
                  clickCollection: Ar({
                    internalLinkEnabled: Tr().default(!0),
                    externalLinkEnabled: Tr().default(!0),
                    downloadLinkEnabled: Tr().default(!0),
                    sessionStorageEnabled: Tr().default(!1),
                    eventGroupingEnabled: Tr().default(!1),
                    filterClickProperties: Pr(),
                  }).default({
                    internalLinkEnabled: !0,
                    externalLinkEnabled: !0,
                    downloadLinkEnabled: !0,
                    sessionStorageEnabled: !1,
                    eventGroupingEnabled: !1,
                  }),
                  downloadLinkQualifier: Ja,
                  onBeforeLinkClickSend: Pr().deprecated(
                    'The field "onBeforeLinkClickSend" has been deprecated. Use "clickCollection.filterClickDetails" instead.'
                  ),
                }),
                Qa = "cppXYctnr";
              var Ya = (e = document) => null !== e.getElementById(Qa),
                Xa = (e) => {
                  let t = e;
                  return (
                    /^https?:\/\//i.test(t) ||
                      (t = `${window.location.protocol}//${e}`),
                    new URL(t).hostname
                  );
                },
                Ka = (e, t) => Xa(e) !== Xa(t);
              const Za = (e, t) =>
                t &&
                (("download" === t && !e.downloadLinkEnabled) ||
                  ("exit" === t && !e.externalLinkEnabled) ||
                  ("other" === t && !e.internalLinkEnabled));
              var es = ({
                config: e,
                logger: t,
                getClickedElementProperties: n,
                clickActivityStorage: r,
              }) => {
                const { clickCollectionEnabled: o, clickCollection: i } = e;
                return o
                  ? ({ event: o, clickedElement: a }) => {
                      const s = n({
                          clickActivityStorage: r,
                          clickedElement: a,
                          config: e,
                          logger: t,
                        }),
                        c = s.linkType;
                      Ya() ||
                        (s.isValidLink() && Za(i, c)
                          ? t.info(
                              `Cancelling link click event due to clickCollection.${c}LinkEnabled = false.`
                            )
                          : !s.isInternalLink() ||
                            !i.eventGroupingEnabled ||
                            (e.onBeforeLinkClickSend &&
                              !i.filterClickDetails) ||
                            Ka(window.location.hostname, s.linkUrl)
                          ? s.isValidLink()
                            ? (o.mergeXdm(s.xdm),
                              o.mergeData(s.data),
                              r.save({
                                pageName: s.pageName,
                                pageIDType: s.pageIDType,
                              }))
                            : s.isValidActivityMapData() && r.save(s.properties)
                          : r.save(s.properties));
                    }
                  : () => {};
              };
              const ts = (e) => ({
                  eventType: "web.webinteraction.linkClicks",
                  web: {
                    webInteraction: {
                      name: e.linkName,
                      region: e.linkRegion,
                      type: e.linkType,
                      URL: e.linkUrl,
                      linkClicks: { value: 1 },
                    },
                  },
                }),
                ns = (e) => ({
                  __adobe: {
                    analytics: {
                      contextData: {
                        a: {
                          activitymap: {
                            page: e.pageName,
                            link: e.linkName,
                            region: e.linkRegion,
                            pageIDType: e.pageIDType,
                          },
                        },
                      },
                    },
                  },
                }),
                rs = (e, t) => {
                  const { xdm: n, data: r, clickedElement: o } = e;
                  if (
                    ((t.clickedElement = o), n && n.web && n.web.webInteraction)
                  ) {
                    const {
                      name: e,
                      region: r,
                      type: o,
                      URL: i,
                    } = n.web.webInteraction;
                    (t.linkName = e),
                      (t.linkRegion = r),
                      (t.linkType = o),
                      (t.linkUrl = i);
                  }
                  if (r && r.__adobe && r.__adobe.analytics) {
                    const { contextData: e } = r.__adobe.analytics;
                    if (e && e.a && e.a.activitymap) {
                      const {
                        page: n,
                        link: r,
                        region: o,
                        pageIDType: i,
                      } = e.a.activitymap;
                      (t.pageName = n || t.pageName),
                        (t.linkName = r || t.linkName),
                        (t.linkRegion = o || t.linkRegion),
                        void 0 !== i && (t.pageIDType = i);
                    }
                  }
                };
              var os = ({ properties: e, logger: t } = {}) => {
                  let n = e || {};
                  return {
                    get pageName() {
                      return n.pageName;
                    },
                    set pageName(e) {
                      n.pageName = e;
                    },
                    get linkName() {
                      return n.linkName;
                    },
                    set linkName(e) {
                      n.linkName = e;
                    },
                    get linkRegion() {
                      return n.linkRegion;
                    },
                    set linkRegion(e) {
                      n.linkRegion = e;
                    },
                    get linkType() {
                      return n.linkType;
                    },
                    set linkType(e) {
                      n.linkType = e;
                    },
                    get linkUrl() {
                      return n.linkUrl;
                    },
                    set linkUrl(e) {
                      n.linkUrl = e;
                    },
                    get pageIDType() {
                      return n.pageIDType;
                    },
                    set pageIDType(e) {
                      n.pageIDType = e;
                    },
                    get clickedElement() {
                      return n.clickedElement;
                    },
                    set clickedElement(e) {
                      n.clickedElement = e;
                    },
                    get properties() {
                      return {
                        pageName: n.pageName,
                        linkName: n.linkName,
                        linkRegion: n.linkRegion,
                        linkType: n.linkType,
                        linkUrl: n.linkUrl,
                        pageIDType: n.pageIDType,
                      };
                    },
                    isValidLink: () =>
                      !!(n.linkUrl && n.linkType && n.linkName && n.linkRegion),
                    isInternalLink() {
                      return this.isValidLink() && "other" === n.linkType;
                    },
                    isValidActivityMapData: () =>
                      !!n.pageName &&
                      !!n.linkName &&
                      !!n.linkRegion &&
                      void 0 !== n.pageIDType,
                    get xdm() {
                      return n.filteredXdm ? n.filteredXdm : ts(this);
                    },
                    get data() {
                      return n.filteredData ? n.filteredData : ns(this);
                    },
                    applyPropertyFilter(e) {
                      e &&
                        !1 === e(n) &&
                        (t &&
                          t.info(
                            `Clicked element properties were rejected by filter function: ${JSON.stringify(
                              this.properties,
                              null,
                              2
                            )}`
                          ),
                        (n = {}));
                    },
                    applyOptionsFilter(e) {
                      const r = this.options;
                      if (r && r.clickedElement && (r.xdm || r.data)) {
                        if (e && !1 === e(r))
                          return (
                            t &&
                              t.info(
                                `Clicked element properties were rejected by filter function: ${JSON.stringify(
                                  this.properties,
                                  null,
                                  2
                                )}`
                              ),
                            void (this.options = void 0)
                          );
                        (this.options = r),
                          (n.filteredXdm = r.xdm),
                          (n.filteredData = r.data);
                      }
                    },
                    get options() {
                      const e = {};
                      if (
                        (this.isValidLink() && (e.xdm = this.xdm),
                        this.isValidActivityMapData() && (e.data = this.data),
                        this.clickedElement &&
                          (e.clickedElement = this.clickedElement),
                        e.xdm || e.data)
                      )
                        return e;
                    },
                    set options(e) {
                      (n = {}), e && rs(e, n);
                    },
                  };
                },
                is =
                  ({ clickActivityStorage: e }) =>
                  (t) => {
                    if (Ya()) return;
                    const n = e.load(),
                      r = os({ properties: n });
                    if (r.isValidLink() || r.isValidActivityMapData()) {
                      if (r.isValidLink()) {
                        const e = r.xdm;
                        delete e.eventType, t.mergeXdm(e);
                      }
                      r.isValidActivityMapData() && t.mergeData(r.data),
                        e.save({
                          pageName: r.pageName,
                          pageIDType: r.pageIDType,
                        });
                    }
                  },
                as =
                  ({
                    window: e,
                    getLinkName: t,
                    getLinkRegion: n,
                    getAbsoluteUrlFromAnchorElement: r,
                    findClickableElement: o,
                    determineLinkType: i,
                  }) =>
                  ({
                    clickedElement: a,
                    config: s,
                    logger: c,
                    clickActivityStorage: l,
                  }) => {
                    const { onBeforeLinkClickSend: d, clickCollection: u } = s,
                      { filterClickDetails: p } = u,
                      g = os({ logger: c });
                    if (a) {
                      const c = o(a);
                      if (c) {
                        (g.clickedElement = a),
                          (g.linkUrl = r(e, c)),
                          (g.linkType = i(e, s, g.linkUrl, c)),
                          (g.linkRegion = n(c)),
                          (g.linkName = t(c)),
                          (g.pageIDType = 0),
                          (g.pageName = e.location.href);
                        const o = l.load();
                        o &&
                          o.pageName &&
                          ((g.pageName = o.pageName), (g.pageIDType = 1)),
                          p
                            ? g.applyPropertyFilter(p)
                            : d && g.applyOptionsFilter(d);
                      }
                    }
                    return g;
                  };
              const ss = "clickData";
              var cs = ({ storage: e }) => ({
                  save: (t) => {
                    const n = JSON.stringify(t);
                    e.setItem(ss, n);
                  },
                  load: () => {
                    let t = null;
                    const n = e.getItem(ss);
                    return n && (t = JSON.parse(n)), t;
                  },
                  remove: () => {
                    e.removeItem(ss);
                  },
                }),
                ls =
                  ({ clickActivityStorage: e }) =>
                  (t) => {
                    e.save({
                      pageName: t.getContent().xdm.web.webPageDetails.name,
                      pageIDType: 1,
                    });
                  },
                ds = (e, t) => {
                  const {
                    clickCollectionEnabled: n,
                    onBeforeLinkClickSend: r,
                    downloadLinkQualifier: o,
                  } = e;
                  !1 === n &&
                    (r &&
                      t.warn(
                        "The 'onBeforeLinkClickSend' configuration was provided but will be ignored because clickCollectionEnabled is false."
                      ),
                    o &&
                      o !== Ga &&
                      t.warn(
                        "The 'downloadLinkQualifier' configuration was provided but will be ignored because clickCollectionEnabled is false."
                      ));
                },
                us = (e) => e && e.replace(/\s+/g, " ").trim();
              const ps = /^(SCRIPT|STYLE|LINK|CANVAS|NOSCRIPT|#COMMENT)$/i;
              var gs = (e) => !(e && e.nodeName && e.nodeName.match(ps));
              const fs = (e) => {
                  let t = [],
                    n = !1;
                  return (
                    gs(e)
                      ? (t.push(e),
                        e.childNodes &&
                          Array.prototype.slice
                            .call(e.childNodes)
                            .forEach((e) => {
                              const r = fs(e);
                              (t = t.concat(r.supportedNodes)),
                                (n = n || r.includesUnsupportedNodes);
                            }))
                      : (n = !0),
                    { supportedNodes: t, includesUnsupportedNodes: n }
                  );
                },
                ms = (e, t, n) => {
                  let r;
                  return (
                    (n && n !== e.nodeName.toUpperCase()) ||
                      (r = e.getAttribute(t)),
                    r
                  );
                },
                hs = (e) => {
                  const t = { texts: [] };
                  return (
                    e.supportedNodes.forEach((e) => {
                      e.getAttribute &&
                        (t.alt || (t.alt = us(e.getAttribute("alt"))),
                        t.title || (t.title = us(e.getAttribute("title"))),
                        t.inputValue ||
                          (t.inputValue = us(ms(e, "value", "INPUT"))),
                        t.imgSrc || (t.imgSrc = us(ms(e, "src", "IMG")))),
                        e.nodeValue && t.texts.push(e.nodeValue);
                    }),
                    t
                  );
                },
                ys = /^(HEADER|MAIN|FOOTER|NAV)$/i,
                vs = (e) => {
                  let t;
                  return (
                    "region" === e.role &&
                      tn(e["aria-label"]) &&
                      (t = e["aria-label"]),
                    t
                  );
                },
                bs = (e) => {
                  let t;
                  return (
                    e && e.nodeName && e.nodeName.match(ys) && (t = e.nodeName),
                    t
                  );
                };
              var ws = (e, t) => {
                  const n = e.location.href;
                  let r = t.href || "";
                  "string" != typeof r && (r = "");
                  try {
                    return new URL(r, n).href;
                  } catch {
                    return n;
                  }
                },
                Es = (e) =>
                  !(
                    !e.href ||
                    ("A" !== e.tagName && "AREA" !== e.tagName) ||
                    (e.onclick &&
                      e.protocol &&
                      !(e.protocol.toLowerCase().indexOf("javascript") < 0))
                  ),
                ks = (e) => !!e && !!e.onclick,
                Cs = (e) => {
                  if ("INPUT" === e.tagName) {
                    const t = e.getAttribute("type");
                    if ("submit" === t) return !0;
                    if ("image" === t && e.src) return !0;
                  }
                  return !1;
                },
                Ss = (e) => "BUTTON" === e.tagName && "submit" === e.type,
                Is = (e) => {
                  const t = e.indexOf("?"),
                    n = e.indexOf("#");
                  return t >= 0 && (t < n || n < 0)
                    ? e.substring(0, t)
                    : n >= 0
                    ? e.substring(0, n)
                    : e;
                },
                Ts = (e, t, n) => {
                  let r = !1;
                  if (t)
                    if (n && n.download) r = !0;
                    else if (e) {
                      const n = new RegExp(e),
                        o = Is(t).toLowerCase();
                      r = n.test(o);
                    }
                  return r;
                },
                Ps = (e, t) => {
                  let n = !1;
                  if (t && e.location.hostname) {
                    const r = e.location.hostname.toLowerCase();
                    n = Is(t).toLowerCase().indexOf(r) < 0;
                  }
                  return n;
                },
                Ds = (e) => {
                  const t = e.getContent();
                  return (
                    void 0 !== t.xdm &&
                    void 0 !== t.xdm.web &&
                    void 0 !== t.xdm.web.webPageDetails &&
                    void 0 !== t.xdm.web.webPageDetails.name
                  );
                },
                Os = () => {
                  const e = {};
                  return {
                    getItem: (t) => e[t],
                    setItem: (t, n) => {
                      e[t] = n;
                    },
                    removeItem: (t) => {
                      delete e[t];
                    },
                  };
                };
              const Ns = as({
                window: window,
                getLinkName: (e) => {
                  let t = us(e.innerText || e.textContent);
                  const n = fs(e);
                  if (!t || n.includesUnsupportedNodes) {
                    const e = hs(n);
                    (t = us(e.texts.join(""))),
                      t || (t = e.alt || e.title || e.inputValue || e.imgSrc);
                  }
                  return t || "";
                },
                getLinkRegion: (e) => {
                  let t,
                    n = e.parentNode;
                  for (; n; ) {
                    if (((t = us(n.id || vs(n) || bs(n))), t)) return t;
                    n = n.parentNode;
                  }
                  return "BODY";
                },
                getAbsoluteUrlFromAnchorElement: ws,
                findClickableElement: (e) => {
                  let t = e;
                  for (; t; ) {
                    if (Es(t) || ks(t) || Cs(t) || Ss(t)) return t;
                    t = t.parentNode;
                  }
                  return null;
                },
                determineLinkType: (e, t, n, r) => {
                  let o = "other";
                  return (
                    tn(n) &&
                      (Ts(t.downloadLinkQualifier, n, r)
                        ? (o = "download")
                        : Ps(e, n) && (o = "exit")),
                    o
                  );
                },
              });
              let As;
              const Rs = (e) => {
                  if (!As) {
                    const t = Wt(window)(e.orgId || ""),
                      n = Os(),
                      r = e.clickCollection.sessionStorageEnabled
                        ? t.session
                        : n;
                    As = cs({ storage: r });
                  }
                },
                xs = ({
                  config: e,
                  eventManager: t,
                  handleError: n,
                  logger: r,
                }) => {
                  ds(e, r);
                  const o = e.clickCollection;
                  As || Rs(e);
                  const i = es({
                      config: e,
                      logger: r,
                      clickActivityStorage: As,
                      getClickedElementProperties: Ns,
                    }),
                    a = is({ clickActivityStorage: As }),
                    s = ls({ clickActivityStorage: As });
                  return {
                    lifecycle: {
                      onComponentsRegistered(e) {
                        const { lifecycle: r } = e;
                        za({ eventManager: t, lifecycle: r, handleError: n });
                      },
                      onClick({ event: e, clickedElement: t }) {
                        i({ event: e, clickedElement: t });
                      },
                      onBeforeEvent({ event: e }) {
                        Ds(e) && (o.eventGroupingEnabled && a(e), s(e, r, As));
                      },
                    },
                  };
                };
              (xs.namespace = "ActivityCollector"),
                (xs.configValidators = Wa),
                (xs.buildOnInstanceConfiguredExtraParams = ({
                  config: e,
                  logger: t,
                }) => (
                  As || Rs(e),
                  {
                    getLinkDetails: (n) =>
                      Ns({
                        clickActivityStorage: As,
                        clickedElement: n,
                        config: e,
                        logger: t,
                      }).properties,
                  }
                ));
              const Ms = (e) => `URL destination succeeded: ${e.spec.url}`;
              var _s = ({
                  fireReferrerHideableImage: e,
                  logger: t,
                  cookieJar: n,
                  isPageSsl: r,
                }) => {
                  const o = r ? { sameSite: "none", secure: !0 } : {},
                    i = (e) => {
                      e.filter((e) => "cookie" === e.type).forEach((e) => {
                        const {
                          name: t,
                          value: r,
                          domain: i,
                          ttlDays: a,
                        } = e.spec;
                        n.set(t, r || "", {
                          domain: i || "",
                          expires: a || 10,
                          ...o,
                        });
                      });
                    },
                    a = (n) => {
                      const r = n.filter((e) => "url" === e.type);
                      return Promise.all(
                        r.map((n) =>
                          e(n.spec)
                            .then(() => {
                              t.info(Ms(n));
                            })
                            .catch(() => {})
                        )
                      ).then(nn);
                    };
                  return (e) => (i(e), a(e));
                },
                Ls = ({ processDestinations: e }) => {
                  const t = ({ response: t }) => {
                      const n = t.getPayloadsByType("activation:push");
                      return e(n);
                    },
                    n = ({ response: e }) => ({
                      destinations: e.getPayloadsByType("activation:pull"),
                    });
                  return ({ response: e }) =>
                    t({ response: e }).then(() => n({ response: e }));
                };
              const js = ({ logger: e, fireReferrerHideableImage: t }) => {
                const n = me.withConverter({
                    write: (e) => encodeURIComponent(e),
                  }),
                  r = Ie({ logger: e, cookieJar: n }),
                  o = _s({
                    fireReferrerHideableImage: t,
                    logger: e,
                    cookieJar: r,
                    isPageSsl: "https:" === window.location.protocol,
                  });
                return {
                  lifecycle: { onResponse: Ls({ processDestinations: o }) },
                  commands: {},
                };
              };
              js.namespace = "Audiences";
              var $s = ({
                  storedConsent: e,
                  taskQueue: t,
                  defaultConsent: n,
                  consent: r,
                  sendSetConsentRequest: o,
                  validateSetConsentOptions: i,
                  consentHashStore: a,
                  doesIdentityCookieExist: s,
                }) => {
                  const c = { [Qr]: n };
                  let l = e.read();
                  const d = s(),
                    u = void 0 !== l[Qr];
                  (d && u) || a.clear(),
                    d || (e.clear(), (l = {})),
                    r.initializeConsent(c, l);
                  const p = () => {
                    if (0 === t.length) {
                      const t = e.read();
                      void 0 !== t[Qr] && r.setConsent(t);
                    }
                  };
                  return {
                    commands: {
                      setConsent: {
                        optionsValidator: i,
                        run: ({
                          consent: e,
                          identityMap: n,
                          edgeConfigOverrides: i,
                        }) => {
                          r.suspend();
                          const s = a.lookup(e);
                          return t
                            .addTask(() =>
                              s.isNew()
                                ? o({
                                    consentOptions: e,
                                    identityMap: n,
                                    edgeConfigOverrides: i,
                                  })
                                : Promise.resolve()
                            )
                            .then(() => s.save())
                            .finally(p);
                        },
                      },
                    },
                    lifecycle: { onResponse: p, onRequestFailure: p },
                  };
                },
                Us = (e) => kt(JSON.stringify(pn(e)));
              const qs = ({ standard: e, version: t }) => `${e}.${t}`;
              var Bs = ({ storage: e }) => ({
                  clear() {
                    e.clear();
                  },
                  lookup(t) {
                    const n = {},
                      r = (e) => {
                        const t = qs(e),
                          { standard: r, version: o, ...i } = e;
                        return n[t] || (n[t] = Us(i).toString()), n[t];
                      };
                    return {
                      isNew: () =>
                        t.some((t) => {
                          const n = qs(t),
                            o = e.getItem(n);
                          return null === o || o !== r(t);
                        }),
                      save() {
                        t.forEach((t) => {
                          const n = qs(t);
                          e.setItem(n, r(t));
                        });
                      },
                    };
                  },
                }),
                Fs = () => {
                  const e = {},
                    t = xo({
                      content: e,
                      addIdentity: (t, n) => {
                        (e.identityMap = e.identityMap || {}),
                          (e.identityMap[t] = e.identityMap[t] || []),
                          e.identityMap[t].push(n);
                      },
                      hasIdentity: (t) =>
                        void 0 !== (e.identityMap && e.identityMap[t]),
                    });
                  return (
                    (t.setConsent = (t) => {
                      e.consent = t;
                    }),
                    t
                  );
                },
                Vs = ({ payload: e, datastreamIdOverride: t }) =>
                  Ao({
                    payload: e,
                    datastreamIdOverride: t,
                    getAction: () => "privacy/set-consent",
                    getUseSendBeacon: () => !1,
                  }),
                Hs = ({ parseConsentCookie: e, orgId: t, cookieJar: n }) => {
                  const r = Ot(t, Ft);
                  return {
                    read() {
                      const t = n.get(r);
                      return t ? e(t) : {};
                    },
                    clear() {
                      n.remove(r);
                    },
                  };
                },
                zs =
                  ({
                    createConsentRequestPayload: e,
                    createConsentRequest: t,
                    sendEdgeNetworkRequest: n,
                    edgeConfigOverrides: r,
                  }) =>
                  ({
                    consentOptions: o,
                    identityMap: i,
                    edgeConfigOverrides: a,
                  }) => {
                    const s = Lo({
                      payload: e(),
                      globalConfigOverrides: r,
                      localConfigOverrides: a,
                    });
                    s.payload.setConsent(o),
                      pe(i) &&
                        Object.keys(i).forEach((e) => {
                          i[e].forEach((t) => {
                            s.payload.addIdentity(e, t);
                          });
                        });
                    const c = t(s);
                    return n({ request: c }).then(() => {});
                  },
                Gs = (e) =>
                  e.split(";").reduce((e, t) => {
                    const [n, r] = t.split("=");
                    return (e[n] = r), e;
                  }, {}),
                Js = Ar({
                  consent: Ir(Sr()).required().nonEmpty(),
                  identityMap: Mr,
                  edgeConfigOverrides: _r,
                })
                  .noUnknownFields()
                  .required(),
                Ws = Ar({ defaultConsent: xr(Gr, Jr, Wr).default(Gr) });
              const Qs = ({
                config: e,
                consent: t,
                sendEdgeNetworkRequest: n,
                createNamespacedStorage: r,
              }) => {
                const { orgId: o, defaultConsent: i } = e,
                  a = Hs({ parseConsentCookie: Gs, orgId: o, cookieJar: me }),
                  s = Te(),
                  c = zs({
                    createConsentRequestPayload: Fs,
                    createConsentRequest: Vs,
                    sendEdgeNetworkRequest: n,
                    edgeConfigOverrides: e.edgeConfigOverrides,
                  }),
                  l = r(`${Dt(o)}.consentHashes.`),
                  d = Bs({ storage: l.persistent }),
                  u = Ht({ orgId: o });
                return $s({
                  storedConsent: a,
                  taskQueue: s,
                  defaultConsent: i,
                  consent: t,
                  sendSetConsentRequest: c,
                  validateSetConsentOptions: Js,
                  consentHashStore: d,
                  doesIdentityCookieExist: u,
                });
              };
              (Qs.namespace = "Consent"), (Qs.configValidators = Ws);
              var Ys = ({ createEventMergeId: e }) => ({
                commands: { createEventMergeId: { run: e } },
              });
              const Xs = () => Ys({ createEventMergeId: Se });
              Xs.namespace = "EventMerge";
              var Ks = {
                  PAUSE: "media.pauseStart",
                  PLAY: "media.play",
                  BUFFER_START: "media.bufferStart",
                  AD_START: "media.adStart",
                  Ad_BREAK_START: "media.adBreakStart",
                  SESSION_END: "media.sessionEnd",
                  SESSION_START: "media.sessionStart",
                  SESSION_COMPLETE: "media.sessionComplete",
                  PING: "media.ping",
                  AD_BREAK_COMPLETE: "media.adBreakComplete",
                  AD_COMPLETE: "media.adComplete",
                  AD_SKIP: "media.adSkip",
                  BITRATE_CHANGE: "media.bitrateChange",
                  CHAPTER_COMPLETE: "media.chapterComplete",
                  CHAPTER_SKIP: "media.chapterSkip",
                  CHAPTER_START: "media.chapterStart",
                  ERROR: "media.error",
                  STATES_UPDATE: "media.statesUpdate",
                },
                Zs = ({ mediaRequestPayload: e, action: t }) =>
                  Ao({
                    payload: e,
                    edgeSubPath: "/va",
                    getAction: () => t,
                    getUseSendBeacon: () => !1,
                  }),
                ec = ({
                  config: e,
                  eventManager: t,
                  consent: n,
                  sendEdgeNetworkRequest: r,
                  setTimestamp: o,
                }) => ({
                  createMediaEvent({ options: n }) {
                    const r = t.createEvent(),
                      { xdm: i } = n;
                    if ((o(i), r.setUserXdm(i), i.eventType === Ks.AD_START)) {
                      const { advertisingDetails: t } = n.xdm.mediaCollection;
                      r.mergeXdm({
                        mediaCollection: {
                          advertisingDetails: {
                            playerName:
                              t.playerName || e.streamingMedia.playerName,
                          },
                        },
                      });
                    }
                    return r;
                  },
                  createMediaSession(n) {
                    const {
                        playerName: r,
                        channel: o,
                        appVersion: i,
                      } = e.streamingMedia,
                      a = t.createEvent(),
                      { sessionDetails: s } = n.xdm.mediaCollection;
                    return (
                      a.setUserXdm(n.xdm),
                      a.mergeXdm({
                        eventType: Ks.SESSION_START,
                        mediaCollection: {
                          sessionDetails: {
                            playerName: s.playerName || r,
                            channel: s.channel || o,
                            appVersion: s.appVersion || i,
                          },
                        },
                      }),
                      a
                    );
                  },
                  augmentMediaEvent({
                    event: e,
                    playerId: t,
                    getPlayerDetails: n,
                    sessionID: r,
                  }) {
                    if (!t || !n) return e;
                    const { playhead: o, qoeDataDetails: i } = n({
                      playerId: t,
                    });
                    return (
                      e.mergeXdm({
                        mediaCollection: {
                          playhead: yn(o),
                          qoeDataDetails: i,
                          sessionID: r,
                        },
                      }),
                      e
                    );
                  },
                  trackMediaSession({
                    event: e,
                    mediaOptions: n,
                    edgeConfigOverrides: r,
                  }) {
                    const o = { mediaOptions: n, edgeConfigOverrides: r };
                    return t.sendEvent(e, o);
                  },
                  trackMediaEvent({ event: e, action: t }) {
                    const o = _o(),
                      i = Zs({ mediaRequestPayload: o, action: t });
                    return (
                      o.addEvent(e),
                      e.finalize(),
                      n
                        .awaitConsent()
                        .then(() => r({ request: i }).then(() => ({})))
                    );
                  },
                }),
                tc = { MAIN: "main", COMPLETED: "completed" },
                nc = () => {
                  let e;
                  return {
                    getSession: (t) => e[t] || {},
                    storeSession: ({ playerId: t, sessionDetails: n }) => {
                      void 0 === e && (e = {}), (e[t] = n);
                    },
                    stopPing: ({ playerId: t }) => {
                      const n = e[t];
                      n &&
                        (clearTimeout(n.pingId),
                        (n.pingId = null),
                        (n.playbackState = tc.COMPLETED));
                    },
                    savePing: ({
                      playerId: t,
                      pingId: n,
                      playbackState: r,
                    }) => {
                      e[t] &&
                        (e[t].pingId && clearTimeout(e[t].pingId),
                        (e[t].pingId = n),
                        (e[t].playbackState = r));
                    },
                  };
                };
              const rc = (e, t) =>
                e === Ks.AD_START ||
                e === Ks.Ad_BREAK_START ||
                e === Ks.AD_SKIP ||
                e === Ks.AD_COMPLETE
                  ? "ad"
                  : e === Ks.AD_BREAK_COMPLETE ||
                    e === Ks.CHAPTER_COMPLETE ||
                    e === Ks.CHAPTER_START ||
                    e === Ks.CHAPTER_SKIP ||
                    e === Ks.SESSION_START
                  ? "main"
                  : e === Ks.SESSION_END || e === Ks.SESSION_COMPLETE
                  ? "completed"
                  : t;
              var oc = ({
                  mediaEventManager: e,
                  mediaSessionCacheManager: t,
                  config: n,
                }) => {
                  const r = (o) => {
                    const i = e.createMediaEvent({ options: o }),
                      { playerId: a, xdm: s } = o,
                      { eventType: c } = s,
                      l = c.split(".")[1],
                      {
                        getPlayerDetails: d,
                        sessionPromise: u,
                        playbackState: p,
                      } = t.getSession(a);
                    return u.then((o) =>
                      o.sessionId
                        ? (e.augmentMediaEvent({
                            event: i,
                            eventType: c,
                            playerId: a,
                            getPlayerDetails: d,
                            sessionID: o.sessionId,
                          }),
                          e
                            .trackMediaEvent({ event: i, action: l })
                            .then(() => {
                              if (a)
                                if (
                                  c === Ks.SESSION_COMPLETE ||
                                  c === Ks.SESSION_END
                                )
                                  t.stopPing({ playerId: a });
                                else {
                                  const e = rc(c, p);
                                  if ("completed" === e) return;
                                  const o =
                                      "ad" === e
                                        ? n.streamingMedia.adPingInterval
                                        : n.streamingMedia.mainPingInterval,
                                    i = setTimeout(() => {
                                      const e = {
                                        playerId: a,
                                        xdm: { eventType: Ks.PING },
                                      };
                                      r(e);
                                    }, 1e3 * o);
                                  t.savePing({
                                    playerId: a,
                                    pingId: i,
                                    playbackState: e,
                                  });
                                }
                            }))
                        : Promise.reject(
                            new Error(
                              `Failed to trigger media event: ${c}. Session ID is not available for playerId: ${a}.`
                            )
                          )
                    );
                  };
                  return (e) => r(e);
                },
                ic =
                  ({
                    config: e,
                    mediaEventManager: t,
                    mediaSessionCacheManager: n,
                    legacy: r = !1,
                  }) =>
                  (o) => {
                    if (!e.streamingMedia)
                      return Promise.reject(
                        new Error("Streaming media is not configured.")
                      );
                    const {
                        playerId: i,
                        getPlayerDetails: a,
                        edgeConfigOverrides: s,
                      } = o,
                      c = t.createMediaSession(o);
                    t.augmentMediaEvent({
                      event: c,
                      playerId: i,
                      getPlayerDetails: a,
                    });
                    const l = t.trackMediaSession({
                      event: c,
                      mediaOptions: {
                        playerId: i,
                        getPlayerDetails: a,
                        legacy: r,
                      },
                      edgeConfigOverrides: s,
                    });
                    return (
                      n.storeSession({
                        playerId: i,
                        sessionDetails: {
                          sessionPromise: l,
                          getPlayerDetails: a,
                          playbackState: tc.MAIN,
                        },
                      }),
                      l
                    );
                  },
                ac = (e) => !en(e) || !e.trim(),
                sc =
                  ({
                    mediaSessionCacheManager: e,
                    config: t,
                    trackMediaEvent: n,
                  }) =>
                  ({ response: r, playerId: o, getPlayerDetails: i }) => {
                    const a = r.getPayloadsByType(
                      "media-analytics:new-session"
                    );
                    if (Ve(a)) {
                      const { sessionId: r } = a[0];
                      if (ac(r)) return {};
                      if (!o || !i) return { sessionId: r };
                      const s = setTimeout(() => {
                        n({ playerId: o, xdm: { eventType: Ks.PING } });
                      }, 1e3 * t.streamingMedia.mainPingInterval);
                      return (
                        e.savePing({
                          playerId: o,
                          pingId: s,
                          playbackState: tc.MAIN,
                        }),
                        { sessionId: r }
                      );
                    }
                    return {};
                  };
              const cc = { Video: "video", Audio: "audio" },
                lc = {
                  VOD: "vod",
                  Live: "live",
                  Linear: "linear",
                  Podcast: "podcast",
                  Audiobook: "audiobook",
                  AOD: "aod",
                },
                dc = {
                  FullScreen: "fullScreen",
                  ClosedCaption: "closedCaptioning",
                  Mute: "mute",
                  PictureInPicture: "pictureInPicture",
                  InFocus: "inFocus",
                },
                uc = {
                  AdBreakStart: "adBreakStart",
                  AdBreakComplete: "adBreakComplete",
                  AdStart: "adStart",
                  AdComplete: "adComplete",
                  AdSkip: "adSkip",
                  ChapterStart: "chapterStart",
                  ChapterComplete: "chapterComplete",
                  ChapterSkip: "chapterSkip",
                  SeekStart: "seekStart",
                  SeekComplete: "seekComplete",
                  BufferStart: "bufferStart",
                  BufferComplete: "bufferComplete",
                  BitrateChange: "bitrateChange",
                  StateStart: "stateStart",
                  StateEnd: "stateEnd",
                },
                pc = {
                  SessionStart: "sessionStart",
                  SessionEnd: "sessionEnd",
                  SessionComplete: "sessionComplete",
                  Play: "play",
                  Pause: "pauseStart",
                  Error: "error",
                  StateUpdate: "statesUpdate",
                },
                gc = {
                  MediaResumed: "media.resumed",
                  GranularAdTracking: "media.granularadtracking",
                },
                fc = {
                  Show: "a.media.show",
                  Season: "a.media.season",
                  Episode: "a.media.episode",
                  AssetId: "a.media.asset",
                  Genre: "a.media.genre",
                  FirstAirDate: "a.media.airDate",
                  FirstDigitalDate: "a.media.digitalDate",
                  Rating: "a.media.rating",
                  Originator: "a.media.originator",
                  Network: "a.media.network",
                  ShowType: "a.media.type",
                  AdLoad: "a.media.adLoad",
                  MVPD: "a.media.pass.mvpd",
                  Authorized: "a.media.pass.auth",
                  DayPart: "a.media.dayPart",
                  Feed: "a.media.feed",
                  StreamFormat: "a.media.format",
                },
                mc = {
                  Artist: "a.media.artist",
                  Album: "a.media.album",
                  Label: "a.media.label",
                  Author: "a.media.author",
                  Station: "a.media.station",
                  Publisher: "a.media.publisher",
                },
                hc = {
                  Advertiser: "a.media.ad.advertiser",
                  CampaignId: "a.media.ad.campaign",
                  CreativeId: "a.media.ad.creative",
                  PlacementId: "a.media.ad.placement",
                  SiteId: "a.media.ad.site",
                  CreativeUrl: "a.media.ad.creativeURL",
                };
              var yc = ({
                  trackMediaEvent: e,
                  trackMediaSession: t,
                  mediaResponseHandler: n,
                  logger: r,
                  createMediaHelper: o,
                  createGetInstance: i,
                  config: s,
                }) => ({
                  lifecycle: {
                    onBeforeEvent({ mediaOptions: e, onResponse: t = nn }) {
                      if (!e) return;
                      const { legacy: r, playerId: o, getPlayerDetails: i } = e;
                      r &&
                        t(({ response: e }) =>
                          n({ playerId: o, getPlayerDetails: i, response: e })
                        );
                    },
                  },
                  commands: {
                    getMediaAnalyticsTracker: {
                      run: () => {
                        if (!s.streamingMedia)
                          return Promise.reject(
                            new Error("Streaming media is not configured.")
                          );
                        r.info("Streaming media is configured in legacy mode.");
                        const n = o({ logger: r });
                        return Promise.resolve({
                          getInstance: () =>
                            i({
                              logger: r,
                              trackMediaEvent: e,
                              trackMediaSession: t,
                              uuid: a,
                            }),
                          Event: uc,
                          MediaType: cc,
                          PlayerState: dc,
                          StreamType: lc,
                          MediaObjectKey: gc,
                          VideoMetadataKeys: fc,
                          AudioMetadataKeys: mc,
                          AdMetadataKeys: hc,
                          ...n,
                        });
                      },
                    },
                  },
                }),
                vc = ({ logger: e }) => {
                  const t = (t, n, r) => {
                      const o = { friendlyName: t, offset: n, index: r },
                        i = Ar({
                          friendlyName: Rr().nonEmpty(),
                          offset: Or(),
                          index: Or(),
                        });
                      try {
                        const e = i(o);
                        return {
                          advertisingPodDetails: {
                            friendlyName: e.friendlyName,
                            offset: e.offset,
                            index: e.index,
                          },
                        };
                      } catch (t) {
                        return (
                          e.warn(
                            "An error occurred while creating the Ad Break Object.",
                            t
                          ),
                          {}
                        );
                      }
                    },
                    n = (t, n, r, o) => {
                      const i = {
                          friendlyName: t,
                          name: n,
                          podPosition: r,
                          length: o,
                        },
                        a = Ar({
                          friendlyName: Rr().nonEmpty(),
                          name: Rr().nonEmpty(),
                          podPosition: Or(),
                          length: Or(),
                        });
                      try {
                        const e = a(i);
                        return {
                          advertisingDetails: {
                            friendlyName: e.friendlyName,
                            name: e.name,
                            podPosition: e.podPosition,
                            length: e.length,
                          },
                        };
                      } catch (t) {
                        return (
                          e.warn(
                            "An error occurred while creating the Advertising Object.",
                            t
                          ),
                          {}
                        );
                      }
                    },
                    r = (t, n, r, o) => {
                      const i = {
                          friendlyName: t,
                          offset: n,
                          length: r,
                          index: o,
                        },
                        a = Ar({
                          friendlyName: Rr().nonEmpty(),
                          offset: Or(),
                          length: Or(),
                          index: Or(),
                        });
                      try {
                        const e = a(i);
                        return {
                          chapterDetails: {
                            friendlyName: e.friendlyName,
                            offset: e.offset,
                            index: e.index,
                            length: e.length,
                          },
                        };
                      } catch (t) {
                        return (
                          e.warn(
                            "An error occurred while creating the Chapter Object.",
                            t
                          ),
                          {}
                        );
                      }
                    },
                    o = (t) => {
                      const n = /^[a-zA-Z0-9_]{1,64}$/,
                        r = Rr().matches(n, "This is not a valid state name.");
                      try {
                        return { name: r(t) };
                      } catch (t) {
                        return (
                          e.warn(
                            "An error occurred while creating the State Object.",
                            t
                          ),
                          {}
                        );
                      }
                    },
                    i = (t, n, r, o) => {
                      const i = {
                          bitrate: t,
                          droppedFrames: n,
                          fps: r,
                          startupTime: o,
                        },
                        a = Ar({
                          bitrate: Or(),
                          droppedFrames: Or(),
                          fps: Or(),
                          startupTime: Or(),
                        });
                      try {
                        const e = a(i);
                        return {
                          bitrate: e.bitrate,
                          droppedFrames: e.droppedFrames,
                          framesPerSecond: e.fps,
                          timeToStart: e.startupTime,
                        };
                      } catch (t) {
                        return (
                          e.warn(
                            "An error occurred while creating the QOE Object.",
                            t
                          ),
                          {}
                        );
                      }
                    };
                  return {
                    createMediaObject: (t, n, r, o, i) => {
                      const a = {
                          friendlyName: t,
                          name: n,
                          length: r,
                          streamType: i,
                          contentType: o,
                        },
                        s = Ar({
                          friendlyName: Rr().nonEmpty(),
                          name: Rr().nonEmpty(),
                          length: Or().required(),
                          streamType: Rr().nonEmpty(),
                          contentType: Rr().nonEmpty(),
                        });
                      try {
                        const e = s(a);
                        return {
                          sessionDetails: {
                            name: e.name,
                            friendlyName: e.friendlyName,
                            length: Math.round(e.length),
                            streamType: e.streamType,
                            contentType: e.contentType,
                          },
                        };
                      } catch (t) {
                        return (
                          e.warn(
                            "An error occurred while creating the Media Object.",
                            t
                          ),
                          {}
                        );
                      }
                    },
                    createAdBreakObject: t,
                    createAdObject: n,
                    createChapterObject: r,
                    createStateObject: o,
                    createQoEObject: i,
                  };
                };
              const bc = {
                  "a.media.show": "show",
                  "a.media.season": "season",
                  "a.media.episode": "episode",
                  "a.media.asset": "assetID",
                  "a.media.genre": "genre",
                  "a.media.airDate": "firstAirDate",
                  "a.media.digitalDate": "firstDigitalDate",
                  "a.media.rating": "rating",
                  "a.media.originator": "originator",
                  "a.media.network": "network",
                  "a.media.type": "showType",
                  "a.media.adLoad": "adLoad",
                  "a.media.pass.mvpd": "mvpd",
                  "a.media.pass.auth": "authorized",
                  "a.media.dayPart": "dayPart",
                  "a.media.feed": "feed",
                  "a.media.format": "streamFormat",
                  "a.media.artist": "artist",
                  "a.media.album": "album",
                  "a.media.label": "label",
                  "a.media.author": "author",
                  "a.media.station": "station",
                  "a.media.publisher": "publisher",
                  "media.resumed": "hasResume",
                },
                wc = {
                  "a.media.ad.advertiser": "advertiser",
                  "a.media.ad.campaign": "campaignID",
                  "a.media.ad.creative": "creativeID",
                  "a.media.ad.placement": "placementID",
                  "a.media.ad.site": "siteID",
                  "a.media.ad.creativeURL": "creativeURL",
                };
              var Ec = ({
                logger: e,
                trackMediaSession: t,
                trackMediaEvent: n,
                uuid: r,
              }) => {
                let o = null;
                const i = () => {
                    o = { qoe: null, lastPlayhead: 0, playerId: r() };
                  },
                  a = ({ eventType: e }) =>
                    e === uc.BufferComplete || e === uc.SeekComplete
                      ? pc.Play
                      : e === uc.StateStart || e === uc.StateEnd
                      ? pc.StateUpdate
                      : e === uc.SeekStart
                      ? pc.Pause
                      : e,
                  s = ({
                    eventType: e,
                    mediaDetails: t = {},
                    contextData: n = [],
                  }) => {
                    const r = a({ eventType: e });
                    if (e === uc.StateStart)
                      return {
                        eventType: `media.${r}`,
                        mediaCollection: { statesStart: [t] },
                      };
                    if (e === uc.StateEnd)
                      return {
                        eventType: `media.${r}`,
                        mediaCollection: { statesEnd: [t] },
                      };
                    const o = {
                        eventType: `media.${r}`,
                        mediaCollection: { ...t },
                      },
                      i = [];
                    return (
                      Object.keys(n).forEach((e) => {
                        bc[e]
                          ? (o.mediaCollection.sessionDetails[bc[e]] = n[e])
                          : wc[e]
                          ? (o.mediaCollection.advertisingDetails[wc[e]] = n[e])
                          : i.push({ name: e, value: n[e] });
                      }),
                      Ve(i) && (o.mediaCollection.customMetadata = i),
                      o
                    );
                  };
                return {
                  trackSessionStart: (n, r = {}) => {
                    if (ue(n) || bt(n))
                      return e.warn("Invalid media object"), {};
                    null === o &&
                      (e.warn(
                        "The Media Session was completed. Restarting a new session."
                      ),
                      i());
                    const a = s({
                      eventType: pc.SessionStart,
                      mediaDetails: n,
                      contextData: r,
                    });
                    return t({
                      playerId: o.playerId,
                      getPlayerDetails: () => ({
                        playhead: o.lastPlayhead,
                        qoeDataDetails: o.qoe,
                      }),
                      xdm: a,
                    });
                  },
                  trackPlay: () => {
                    if (null === o)
                      return e.warn("The Media Session was completed."), {};
                    const t = s({
                      eventType: pc.Play,
                    });
                    return n({ playerId: o.playerId, xdm: t });
                  },
                  trackPause: () => {
                    if (null === o)
                      return e.warn("The Media Session was completed."), {};
                    const t = s({ eventType: pc.Pause });
                    return n({ playerId: o.playerId, xdm: t });
                  },
                  trackSessionEnd: () => {
                    if (null === o)
                      return e.warn("The Media Session was completed."), {};
                    const t = s({ eventType: pc.SessionEnd });
                    return n({ playerId: o.playerId, xdm: t });
                  },
                  trackComplete: () => {
                    if (null === o)
                      return e.warn("The Media Session was completed."), {};
                    const t = s({ eventType: pc.SessionComplete });
                    return n({ playerId: o.playerId, xdm: t });
                  },
                  trackError: (t) => {
                    if ((e.warn(`trackError(${t})`), null === o))
                      return e.warn("The Media Session was completed."), {};
                    const r = { name: t, source: "player" },
                      i = s({
                        eventType: pc.Error,
                        mediaDetails: { errorDetails: r },
                      });
                    return n({ playerId: o.playerId, xdm: i });
                  },
                  trackEvent: (t, r, i) => {
                    if (bt(r)) return e.warn("Invalid media object."), {};
                    if (null === o)
                      return e.warn("The Media Session was completed."), {};
                    if (!Object.values(uc).includes(t))
                      return e.warn("Invalid event type"), {};
                    const a = s({
                      eventType: t,
                      mediaDetails: r,
                      contextData: i,
                    });
                    return n({ playerId: o.playerId, xdm: a });
                  },
                  updatePlayhead: (t) => {
                    null !== o
                      ? Xt(t) && (o.lastPlayhead = parseInt(t, 10))
                      : e.warn("The Media Session was completed.");
                  },
                  updateQoEObject: (t) => {
                    null !== o
                      ? t && (o.qoe = t)
                      : e.warn("The Media Session was completed.");
                  },
                  destroy: () => {
                    e.warn("Destroy called, destroying the tracker."),
                      (o = null);
                  },
                };
              };
              const kc = ({
                eventManager: e,
                sendEdgeNetworkRequest: t,
                config: n,
                logger: r,
                consent: o,
              }) => {
                const i = nc(),
                  a = ec({
                    sendEdgeNetworkRequest: t,
                    config: n,
                    consent: o,
                    eventManager: e,
                    setTimestamp: Ti(() => new Date()),
                  }),
                  s = oc({
                    mediaSessionCacheManager: i,
                    mediaEventManager: a,
                    config: n,
                  }),
                  c = ic({
                    config: n,
                    mediaEventManager: a,
                    mediaSessionCacheManager: i,
                    legacy: !0,
                  }),
                  l = sc({
                    mediaSessionCacheManager: i,
                    config: n,
                    trackMediaEvent: s,
                  });
                return yc({
                  mediaResponseHandler: l,
                  trackMediaSession: c,
                  trackMediaEvent: s,
                  createMediaHelper: vc,
                  createGetInstance: Ec,
                  logger: r,
                  config: n,
                });
              };
              kc.namespace = "Legacy Media Analytics";
              const Cc = "web",
                Sc = "webapp",
                Ic = "://",
                Tc = "#",
                Pc = /^(\w+):\/\/([^/#]+)(\/[^#]*)?(#.*)?$/,
                Dc =
                  /^(?:.*@)?(?:[a-z\d\u00a1-\uffff.-]+|\[[a-f\d:]+])(?::\d+)?$/,
                Oc = /^\/(?:[/\w\u00a1-\uffff-.~]|%[a-fA-F\d]{2})*$/,
                Nc = /^#(?:[/\w\u00a1-\uffff-.~]|%[a-fA-F\d]{2})+$/,
                Ac = (e = "/") => {
                  let t = e.length;
                  for (; t > 0 && -1 !== "/".indexOf(e.charAt(t - 1)); ) t -= 1;
                  return e.substring(0, t) || "/";
                },
                Rc = (e) => (tn(e) ? e.toLowerCase() : ""),
                xc = (e) => (tn(e) ? e.toLowerCase() : ""),
                Mc = (e) => (tn(e) ? Ac(e) : "/"),
                _c = (e) => {
                  const t = e.match(Pc);
                  return t
                    ? {
                        surfaceType: Rc(t[1]),
                        authority: xc(t[2]),
                        path: Mc(t[3]),
                        fragment: t[4],
                      }
                    : null;
                },
                Lc = (e) =>
                  `${e.surfaceType}${Ic}${e.authority}${e.path || ""}${
                    e.fragment || ""
                  }`,
                jc = (e) => {
                  const t = e(),
                    n = t.host.toLowerCase(),
                    r = t.pathname;
                  return Cc + Ic + n + Ac(r);
                },
                $c = (e, t) => (e.startsWith(Tc) ? jc(t) + e : e),
                Uc = (e, t, n) => {
                  const r = (e) => (n.warn(e), null);
                  if (!tn(e)) return r(`Invalid surface: ${e}`);
                  const o = $c(e, t),
                    i = _c(o);
                  return null === i
                    ? r(`Invalid surface: ${e}`)
                    : [Cc, Sc].includes(i.surfaceType)
                    ? i.authority && Dc.test(i.authority)
                      ? i.path && !Oc.test(i.path)
                        ? r(`Invalid path ${i.path} in surface: ${e}`)
                        : i.fragment && !Nc.test(i.fragment)
                        ? r(`Invalid fragment ${i.fragment} in surface: ${e}`)
                        : i
                      : r(`Invalid authority ${i.authority} in surface: ${e}`)
                    : r(
                        `Unsupported surface type ${i.surfaceType} in surface: ${e}`
                      );
                },
                qc = (e) =>
                  !!e && 0 === e.indexOf(Cc + Ic) && -1 === e.indexOf(Tc),
                Bc = (e = [], t, n) =>
                  e
                    .map((e) => Uc(e, t, n))
                    .filter((e) => !ue(e))
                    .map(Lc),
                Fc =
                  "https://ns.adobe.com/personalization/default-content-item",
                Vc = "https://ns.adobe.com/personalization/dom-action",
                Hc = "https://ns.adobe.com/personalization/html-content-item",
                zc = "https://ns.adobe.com/personalization/json-content-item",
                Gc = "https://ns.adobe.com/personalization/ruleset-item",
                Jc = "https://ns.adobe.com/personalization/redirect-item",
                Wc = "https://ns.adobe.com/personalization/message/in-app",
                Qc =
                  "https://ns.adobe.com/personalization/message/content-card",
                Yc =
                  "https://ns.adobe.com/personalization/eventHistoryOperation",
                Xc = (e) => {
                  e.includes(Oo) || e.push(Oo);
                },
                Kc = (e, t) => {
                  const n = jc(t);
                  e.includes(n) || e.push(n);
                },
                Zc = (e) => e.filter((t, n) => e.indexOf(t) === n);
              var el = ({
                getPageLocation: e,
                renderDecisions: t,
                decisionScopes: n,
                personalization: r,
                event: o,
                isCacheInitialized: i,
                logger: a,
              }) => {
                const s = o.getViewName();
                return {
                  isRenderDecisions: () => t,
                  isSendDisplayEvent: () => !!r.sendDisplayEvent,
                  shouldIncludeRenderedPropositions: () =>
                    !!r.includeRenderedPropositions,
                  getViewName: () => s,
                  hasScopes: () => n.length > 0 || Ve(r.decisionScopes),
                  hasSurfaces: () => Ve(r.surfaces),
                  hasViewName: () => tn(s),
                  createQueryDetails() {
                    const t = [...n];
                    Ve(r.decisionScopes) && t.push(...r.decisionScopes);
                    const o = Bc(r.surfaces, e, a);
                    this.shouldRequestDefaultPersonalization() &&
                      (Xc(t), Kc(o, e));
                    const i = [Fc, Hc, zc, Jc, Gc, Wc, Qc];
                    return (
                      t.includes(Oo) && i.push(Vc),
                      { schemas: i, decisionScopes: Zc(t), surfaces: Zc(o) }
                    );
                  },
                  isCacheInitialized: () => i,
                  shouldFetchData() {
                    return (
                      this.hasScopes() ||
                      this.hasSurfaces() ||
                      this.shouldRequestDefaultPersonalization()
                    );
                  },
                  shouldUseCachedData() {
                    return this.hasViewName() && !this.shouldFetchData();
                  },
                  shouldRequestDefaultPersonalization() {
                    return (
                      r.defaultPersonalizationEnabled ||
                      (!this.isCacheInitialized() &&
                        !1 !== r.defaultPersonalizationEnabled)
                    );
                  },
                };
              };
              const tl = "Rendering is disabled for authoring mode.",
                nl = "decisioning.propositionDisplay",
                rl = "decisioning.propositionInteract",
                ol = "decisioning.propositionTrigger",
                il = "decisioning.propositionDismiss",
                al = "decisioning.propositionSuppressDisplay",
                sl = 1,
                cl = {
                  DISPLAY: "display",
                  INTERACT: "interact",
                  TRIGGER: "trigger",
                  DISMISS: "dismiss",
                  SUPPRESS: "suppressDisplay",
                },
                ll = {
                  [nl]: cl.DISPLAY,
                  [rl]: cl.INTERACT,
                  [ol]: cl.TRIGGER,
                  [il]: cl.DISMISS,
                  [al]: cl.SUPPRESS,
                },
                dl = {
                  [cl.DISPLAY]: nl,
                  [cl.INTERACT]: rl,
                  [cl.TRIGGER]: ol,
                  [cl.DISMISS]: il,
                  [cl.SUPPRESS]: al,
                },
                ul = (e) => ll[e],
                pl = (e) => dl[e],
                gl = { propositions: [] };
              var fl = ({ logger: e, options: t }) => {
                  const n = Ar({
                    propositions: Ir(
                      Ar({
                        id: Rr().required(),
                        scope: Rr().required(),
                        scopeDetails: Ar({
                          decisionProvider: Rr().required(),
                        }).required(),
                        items: Ir(
                          Ar({
                            id: Rr().required(),
                            schema: Rr().required(),
                            data: Ar(Sr()),
                          })
                        )
                          .nonEmpty()
                          .required(),
                      }).required()
                    )
                      .nonEmpty()
                      .required(),
                    metadata: Ar(Sr()),
                    viewName: Rr(),
                  }).required();
                  try {
                    return n(t);
                  } catch (t) {
                    return (
                      e.warn(
                        "Invalid options for applyPropositions. No propositions will be applied.",
                        t
                      ),
                      gl
                    );
                  }
                },
                ml = ({
                  getPageLocation: e,
                  logger: t,
                  fetchDataHandler: n,
                  viewChangeHandler: r,
                  onClickHandler: o,
                  isAuthoringModeEnabled: i,
                  mergeQuery: a,
                  viewCache: s,
                  showContainers: c,
                  applyPropositions: l,
                  setTargetMigration: d,
                  mergeDecisionsMeta: u,
                  renderedPropositions: p,
                  onDecisionHandler: g,
                  handleConsentFlicker: f,
                }) => ({
                  lifecycle: {
                    onComponentsRegistered() {
                      f();
                    },
                    onDecision: g,
                    onBeforeRequest: ({ request: e }) => (
                      d(e), Promise.resolve()
                    ),
                    onBeforeEvent({
                      event: o,
                      renderDecisions: l,
                      decisionScopes: d = [],
                      personalization: g = {},
                      onResponse: f = nn,
                      onRequestFailure: m = nn,
                    }) {
                      if ((f(() => ({ propositions: [] })), m(() => c()), i()))
                        return (
                          t.warn(tl), a(o, { enabled: !1 }), Promise.resolve()
                        );
                      const h = el({
                          getPageLocation: e,
                          renderDecisions: l,
                          decisionScopes: d,
                          personalization: g,
                          event: o,
                          isCacheInitialized: s.isInitialized(),
                          logger: t,
                        }),
                        y = [];
                      if (
                        (h.shouldIncludeRenderedPropositions() &&
                          y.push(p.clear()),
                        h.shouldFetchData())
                      ) {
                        const e = s.createCacheUpdate(h.getViewName());
                        m(() => e.cancel()),
                          n({
                            cacheUpdate: e,
                            personalizationDetails: h,
                            event: o,
                            onResponse: f,
                          });
                      } else
                        h.shouldUseCachedData() &&
                          y.push(
                            r({
                              personalizationDetails: h,
                              event: o,
                              onResponse: f,
                              onRequestFailure: m,
                            })
                          );
                      return Promise.all(y).then((e) => {
                        const t = e.flatMap((e) => e);
                        Ve(t) && u(o, t, [cl.DISPLAY]);
                      });
                    },
                    onClick({ event: e, clickedElement: t }) {
                      o({ event: e, clickedElement: t });
                    },
                  },
                  commands: {
                    applyPropositions: {
                      optionsValidator: (e) => fl({ logger: t, options: e }),
                      run: l,
                    },
                  },
                }),
                hl = (e = "undefined") => xe(je, {}, { innerHTML: e });
              const yl = ":eq(",
                vl = /:eq\((\d+)\)/g,
                bl = (e) => -1 === e.indexOf(yl),
                wl = (e) => e.split(vl).filter(tn),
                El = /(#|\.)(-?\w+)/g,
                kl = (e, t, n) => `${t}${CSS.escape(n)}`,
                Cl = (e) => e.replace(El, kl),
                Sl = (e) => {
                  const t = [],
                    n = Cl(e.trim()),
                    r = wl(n),
                    { length: o } = r;
                  let i = 0;
                  for (; i < o; ) {
                    const e = r[i],
                      n = r[i + 1];
                    n ? t.push({ sel: e, eq: Number(n) }) : t.push({ sel: e }),
                      (i += 2);
                  }
                  return t;
                },
                Il = (e) => {
                  const t = document;
                  if (bl(e)) return Ke(e, t);
                  const n = Sl(e),
                    { length: r } = n;
                  let o = [],
                    i = t,
                    a = 0;
                  for (; a < r; ) {
                    const { sel: e, eq: t } = n[a],
                      s = Ke(e, i),
                      { length: c } = s;
                    if (0 === c) break;
                    if (null != t && t > c - 1) break;
                    a < r - 1 && (null == t ? ([i] = s) : (i = s[t])),
                      a === r - 1 && (o = null == t ? s : [s[t]]),
                      (a += 1);
                  }
                  return o;
                };
              var Tl = (e, t = document) => t.getElementById(e),
                Pl = (e, t, n) => {
                  e.setAttribute(t, n);
                },
                Dl = (e, t) => e.getAttribute(t),
                Ol = (e, t) => {
                  e.removeAttribute(t);
                },
                Nl = (e, t, n, r) => {
                  let o;
                  (o = r ? `${t}:${n} !${r};` : `${t}:${n};`),
                    (e.style.cssText += `;${o}`);
                },
                Al = (e) => e.parentNode,
                Rl = (e) => e.nextElementSibling,
                xl = (e, t) => {
                  if (!e) return;
                  const n = Al(e);
                  n && n.insertBefore(t, Rl(e));
                },
                Ml = (e, t) => {
                  if (!e) return;
                  const n = Al(e);
                  n && n.insertBefore(t, e);
                },
                _l = (e) => {
                  const { children: t } = e;
                  return t ? He(t) : [];
                },
                Ll = (e) => {
                  const { childNodes: t } = e;
                  return t ? He(t) : [];
                },
                jl = (e) => e.firstElementChild;
              let $l;
              var Ul = (e = document) => {
                if (void 0 === $l) {
                  const t = e.querySelector("[nonce]");
                  $l = t && (t.nonce || t.getAttribute("nonce"));
                }
                return $l;
              };
              const ql = "src",
                Bl = (e) => e.tagName === Le,
                Fl = (e) => xe(Le, { src: e }),
                Vl = (e) => {
                  Ke(Le, e).forEach((e) => {
                    const t = Dl(e, ql);
                    t && Fl(t);
                  });
                },
                Hl = (e, t) => e.tagName === t,
                zl = (e) => Hl(e, $e) && !Dl(e, ql);
              var Gl = (e) => {
                const t = Ke($e, e),
                  { length: n } = t,
                  r = Ul();
                if (r)
                  for (let e = 0; e < n; e += 1) {
                    const n = t[e];
                    zl(n) && (n.nonce = r);
                  }
              };
              const Jl = (e, t) =>
                  new Promise((n, r) => {
                    (t.onload = () => {
                      n(t);
                    }),
                      (t.onerror = () => {
                        r(new Error(`Failed to load script: ${e}`));
                      });
                  }),
                Wl = (e) => {
                  const t = document.createElement("script");
                  (t.src = e), (t.async = !0);
                  const n = Jl(e, t);
                  return document.head.appendChild(t), n;
                },
                Ql = (e, t) => !!e && e.tagName === t,
                Yl = (e) => Ql(e, Ue) && !Dl(e, ql),
                Xl = (e) => Ql(e, Ue) && Dl(e, ql),
                Kl = (e) => {
                  const t = Ke(Ue, e),
                    n = [],
                    { length: r } = t,
                    o = Ul(),
                    i = { ...(o && { nonce: o }) };
                  for (let e = 0; e < r; e += 1) {
                    const r = t[e];
                    if (!Yl(r)) continue;
                    const { textContent: o } = r;
                    o && n.push(xe(Ue, i, { textContent: o }));
                  }
                  return n;
                },
                Zl = (e) => {
                  const t = Ke(Ue, e),
                    n = [],
                    { length: r } = t;
                  for (let e = 0; e < r; e += 1) {
                    const r = t[e];
                    if (!Xl(r)) continue;
                    const o = Dl(r, ql);
                    o && n.push(o);
                  }
                  return n;
                },
                ed = (e, t) => {
                  t.forEach((t) => {
                    e.appendChild(t), e.removeChild(t);
                  });
                },
                td = (e) => Promise.all(e.map(Wl));
              var nd = (e, t, n) => {
                const r = hl(t);
                Gl(r);
                const o = Ll(r),
                  i = Kl(r),
                  a = Zl(r);
                return (
                  Vl(r),
                  o.forEach((t) => {
                    Ae(e, t);
                  }),
                  n(e),
                  ed(e, i),
                  td(a)
                );
              };
              const rd = (e) => {
                Ll(e).forEach(mt);
              };
              var od = (e, t, n) => (rd(e), nd(e, t, n)),
                id = (e, t, n) => {
                  const r = hl(t);
                  Gl(r);
                  const o = Ll(r),
                    i = Kl(r),
                    a = Zl(r),
                    { length: s } = o;
                  let c = s - 1;
                  for (Vl(r); c >= 0; ) {
                    const t = o[c];
                    n(t);
                    const r = jl(e);
                    r ? Ml(r, t) : Ae(e, t), (c -= 1);
                  }
                  return ed(e, i), td(a);
                };
              const ad = "alloy-prehiding",
                sd = "{ visibility: hidden }",
                cd = {},
                ld = (e) => {
                  if (cd[e]) return;
                  const t = Ul(),
                    n = { ...(t && { nonce: t }) },
                    r = xe($e, n, { textContent: `${e} ${sd}` });
                  Ae(document.head, r), (cd[e] = r);
                },
                dd = (e) => {
                  const t = cd[e];
                  t && (mt(t), delete cd[e]);
                },
                ud = (e) => (t) => {
                  if (!t) return;
                  if (Tl(ad)) return;
                  const n = Ul(),
                    r = { id: ad, ...(n && { nonce: n }) },
                    o = xe($e, r, { textContent: t });
                  e.logOnContentHiding({
                    status: "hide-containers",
                    message: "Prehiding style applied to hide containers.",
                    logLevel: "info",
                  }),
                    Ae(document.head, o);
                },
                pd = (e) => () => {
                  const t = Tl(ad);
                  t &&
                    (e.logOnContentHiding({
                      status: "show-containers",
                      message: "Prehiding style removed to show containers.",
                      logLevel: "info",
                    }),
                    mt(t));
                };
              var gd = (e, t, n) => {
                  n(e), (e.textContent = t);
                },
                fd = (e, t, n) => {
                  const r = hl(t);
                  Gl(r);
                  const o = Ll(r),
                    i = Kl(r),
                    a = Zl(r);
                  return (
                    Vl(r),
                    o.forEach((t) => {
                      n(t), Ml(e, t);
                    }),
                    ed(e, i),
                    td(a)
                  );
                },
                md = (e, t, n) =>
                  fd(e, t, n).then(() => {
                    mt(e);
                  }),
                hd = (e, t, n) => {
                  const r = hl(t);
                  Gl(r);
                  const o = Ll(r),
                    i = Kl(r),
                    a = Zl(r);
                  Vl(r);
                  let s = e;
                  return (
                    o.forEach((e) => {
                      n(e), xl(s, e), (s = e);
                    }),
                    ed(e, i),
                    td(a)
                  );
                },
                yd = (e, t, n) => {
                  const { priority: r, ...o } = t;
                  Object.keys(o).forEach((t) => {
                    Nl(e, t, o[t], r);
                  }),
                    n(e);
                },
                vd = (e, t, n) => {
                  Object.keys(t).forEach((n) => {
                    Pl(e, n, t[n]);
                  }),
                    n(e);
                },
                bd = (e, t, n) => {
                  Bl(e) && (Fl(t), n(e), Ol(e, ql), Pl(e, ql, t));
                },
                wd = (e, { from: t, to: n }, r) => {
                  const o = _l(e),
                    i = o[t],
                    a = o[n];
                  i && a && (t < n ? xl(a, i) : Ml(a, i), r(a), r(i));
                };
              const Ed = ({
                  containers: e,
                  content: t,
                  decorateProposition: n,
                  renderFunc: r,
                  renderStatusHandler: o,
                }) => {
                  const i = e.filter(o.shouldRender).map(async (e) => {
                    await r(e, t, n), o.markAsRendered(e);
                  });
                  return Promise.all(i);
                },
                kd = (e) => async (t, n, r) => {
                  const { selector: o, prehidingSelector: i, content: a } = t;
                  ld(i);
                  try {
                    const t = await gt(o, Il);
                    Ed({
                      containers: t,
                      content: a,
                      decorateProposition: n,
                      renderFunc: e,
                      renderStatusHandler: r,
                    });
                  } finally {
                    dd(i);
                  }
                },
                Cd = (e) => (`${e}`.endsWith("px") ? e : `${e}px`);
              var Sd = (e, t, n) => {
                  const { priority: r, ...o } = t;
                  Object.keys(o).forEach((t) => {
                    let n = o[t];
                    ("left" !== t && "top" !== t) || (n = Cd(n)),
                      Nl(e, t, n, r);
                  }),
                    n(e);
                },
                Id = (e, t, n) => {
                  n(e);
                },
                Td = (e, t, n) => {
                  const { priority: r, ...o } = t;
                  Object.keys(o).forEach((t) => {
                    let n = o[t];
                    ("width" !== t && "height" !== t) || (n = Cd(n)),
                      Nl(e, t, n, r);
                  }),
                    n(e);
                };
              const Pd = "setHtml",
                Dd = "customCode",
                Od = "setText",
                Nd = "setAttribute",
                Ad = "setImageSource",
                Rd = "setStyle",
                xd = "move",
                Md = "resize",
                _d = "rearrange",
                Ld = "remove",
                jd = "insertAfter",
                $d = "insertBefore",
                Ud = "replaceHtml",
                qd = "prependHtml",
                Bd = "appendHtml",
                Fd = "click",
                Vd = "collectInteractions";
              var Hd = () => ({
                  [Pd]: kd(od),
                  [Dd]: kd(id),
                  [Od]: kd(gd),
                  [Nd]: kd(vd),
                  [Ad]: kd(bd),
                  [Rd]: kd(yd),
                  [xd]: kd(Sd),
                  [Md]: kd(Td),
                  [_d]: kd(wd),
                  [Ld]: kd(mt),
                  [jd]: kd(hd),
                  [$d]: kd(fd),
                  [Ud]: kd(md),
                  [qd]: kd(id),
                  [Bd]: kd(nd),
                  [Vd]: kd(Id),
                }),
                zd =
                  ({ eventManager: e, mergeDecisionsMeta: t }) =>
                  ({
                    decisionsMeta: n = [],
                    propositionAction: r,
                    documentMayUnload: o = !1,
                    eventType: i = nl,
                    propositionEventTypes: a = [ul(i)],
                    viewName: s,
                  }) => {
                    const c = e.createEvent(),
                      l = { eventType: i };
                    return (
                      s && (l.web = { webPageDetails: { viewName: s } }),
                      Ve(n) && t(c, n, a, r),
                      c.mergeXdm(l),
                      o && c.documentMayUnload(),
                      e.sendEvent(c)
                    );
                  };
              const Gd = "personalization:decisions";
              var Jd =
                  ({
                    logger: e,
                    prehidingStyle: t,
                    showContainers: n,
                    hideContainers: r,
                    mergeQuery: o,
                    processPropositions: i,
                    createProposition: a,
                    notificationHandler: s,
                    consent: c,
                  }) =>
                  ({
                    cacheUpdate: l,
                    personalizationDetails: d,
                    event: u,
                    onResponse: p,
                  }) => {
                    const { state: g, wasSet: f } = c.current();
                    ("out" === g && f) || (d.isRenderDecisions() ? r(t) : n()),
                      o(u, d.createQueryDetails());
                    const m = s(
                      d.isRenderDecisions(),
                      d.isSendDisplayEvent(),
                      d.getViewName()
                    );
                    p(({ response: t }) => {
                      const r = t.getPayloadsByType(Gd);
                      Ve(r) ||
                        e.logOnContentRendering({
                          status: "no-offers",
                          message: "No offers were returned.",
                          logLevel: "info",
                          detail: { query: d.createQueryDetails() },
                        });
                      const o = r.map((e) => a(e)),
                        {
                          page: s = [],
                          view: c = [],
                          proposition: u = [],
                        } = Nt(o, (e) => e.getScopeType()),
                        p = l.update(c);
                      let g, f, h;
                      return (
                        d.isRenderDecisions()
                          ? (({
                              render: g,
                              returnedPropositions: f,
                              returnedDecisions: h,
                            } = i([...s, ...p], u)),
                            Ve(s) &&
                              e.logOnContentRendering({
                                status: "rendering-started",
                                message:
                                  "Started rendering propositions for page-wide scope.",
                                logLevel: "info",
                                detail: {
                                  scope: Oo,
                                  propositions: s.map((e) => e.toJSON()),
                                },
                              }),
                            Ve(p) &&
                              e.logOnContentRendering({
                                status: "rendering-started",
                                message: `Rendering propositions started for view scope - ${d.getViewName()}.`,
                                logLevel: "info",
                                detail: {
                                  scope: d.getViewName(),
                                  propositions: p.map((e) => e.toJSON()),
                                },
                              }),
                            g().then(m),
                            n())
                          : ({ returnedPropositions: f, returnedDecisions: h } =
                              i([], [...s, ...p, ...u])),
                        { propositions: f, decisions: h }
                      );
                    });
                  },
                Wd = (e, t) => {
                  if (bl(e)) return ft(e, t);
                  const n = Il(e);
                  let r = !1;
                  for (let e = 0; e < n.length; e += 1)
                    if (n[e] === t) {
                      r = !0;
                      break;
                    }
                  return r;
                };
              const Qd = "view",
                Yd = "page",
                Xd = "proposition",
                Kd = (e) =>
                  e.map((e) => {
                    const { trackingLabel: t, scopeType: n, ...r } = e;
                    return r;
                  }),
                Zd = (e) =>
                  e.filter((t, n) => {
                    const r = JSON.stringify(t);
                    return n === e.findIndex((e) => JSON.stringify(e) === r);
                  }),
                eu = (e, t, n) => {
                  const { documentElement: r } = document;
                  let o = e,
                    i = 0;
                  for (; o && o !== r; ) {
                    if (Wd(t, o)) {
                      const e = n(t),
                        r = { metas: e },
                        o = e.find((e) => e.trackingLabel);
                      o && ((r.label = o.trackingLabel), (r.weight = i));
                      const a = e.find((e) => e.scopeType === Qd);
                      return a && ((r.viewName = a.scope), (r.weight = i)), r;
                    }
                    (o = o.parentNode), (i += 1);
                  }
                  return { metas: null };
                };
              var tu = (e, t, n) => {
                  const r = [];
                  let o,
                    i = "",
                    a = Number.MAX_SAFE_INTEGER,
                    s = Number.MAX_SAFE_INTEGER;
                  for (let c = 0; c < t.length; c += 1) {
                    const {
                      metas: l,
                      label: d,
                      weight: u,
                      viewName: p,
                    } = eu(e, t[c], n);
                    l &&
                      (d && u <= a && ((i = d), (a = u)),
                      p && u <= s && ((o = p), (s = u)),
                      r.push(...Kd(l)));
                  }
                  return {
                    decisionsMeta: Zd(r),
                    propositionActionLabel: i,
                    propositionActionToken: void 0,
                    viewName: o,
                  };
                },
                nu = (e = document) =>
                  -1 !== e.location.href.indexOf("adobe_authoring_enabled");
              const ru = (e, t, n, r) => {
                  if (0 === t.length) return;
                  const o = {};
                  n.forEach((e) => {
                    o[e] = sl;
                  });
                  const i = {
                    _experience: {
                      decisioning: { propositions: t, propositionEventType: o },
                    },
                  };
                  r && (i._experience.decisioning.propositionAction = r),
                    e.mergeXdm(i);
                },
                ou = (e, t) => {
                  e.mergeQuery({ personalization: { ...t } });
                },
                iu = (e, t) => {
                  if (!t && !e) return;
                  const n = {};
                  return e && (n.label = e), t && (n.tokens = [t]), n;
                };
              var au =
                  ({
                    mergeDecisionsMeta: e,
                    collectInteractions: t,
                    collectClicks: n,
                    getInteractionMetas: r,
                    getClickMetas: o,
                    getClickSelectors: i,
                    autoCollectPropositionInteractions: a,
                  }) =>
                  ({ event: s, clickedElement: c }) => {
                    const l = [];
                    let d, u, p;
                    if (
                      ([t(c, r, a), n(c, i(), o)].forEach(
                        ({
                          decisionsMeta: e,
                          propositionActionLabel: t,
                          propositionActionToken: n,
                          viewName: r,
                        }) => {
                          Array.prototype.push.apply(l, e),
                            !d && t && (d = t),
                            !u && n && (u = n),
                            !p && r && (p = r);
                        }
                      ),
                      Ve(l))
                    ) {
                      const t = { eventType: rl };
                      p && (t.web = { webPageDetails: { viewName: p } }),
                        s.mergeXdm(t),
                        e(s, l, [cl.INTERACT], iu(d, u));
                    }
                  },
                su = ({ createProposition: e }) => {
                  let t = !1,
                    n = Promise.resolve({});
                  const r = (t, n) => {
                    const r = t[n.toLowerCase()];
                    return r && r.length > 0
                      ? r
                      : [
                          e(
                            {
                              scope: n,
                              scopeDetails: {
                                characteristics: { scopeType: Qd },
                              },
                              items: [{ schema: Fc }],
                            },
                            !1
                          ),
                        ];
                  };
                  return {
                    createCacheUpdate: (e) => {
                      const o = Pe();
                      return (
                        (t = !0),
                        (n = n.then((e) =>
                          o.promise.then((t) => ({ ...e, ...t })).catch(() => e)
                        )),
                        {
                          update(t) {
                            const n = t.filter((e) => e.getScope()),
                              i = Nt(n, (e) => e.getScope().toLowerCase());
                            return o.resolve(i), e ? r(i, e) : [];
                          },
                          cancel() {
                            o.reject();
                          },
                        }
                      );
                    },
                    getView: (e) => n.then((t) => r(t, e)),
                    isInitialized: () => t,
                  };
                },
                cu =
                  ({ processPropositions: e, viewCache: t, logger: n }) =>
                  ({ personalizationDetails: r, onResponse: o }) => {
                    let i, a;
                    const s = r.getViewName();
                    return (
                      o(() => ({ propositions: i, decisions: a })),
                      t.getView(s).then((t) => {
                        let o;
                        return r.isRenderDecisions()
                          ? (({
                              render: o,
                              returnedPropositions: i,
                              returnedDecisions: a,
                            } = e(t)),
                            n.logOnContentRendering({
                              status: "rendering-started",
                              message: `Started rendering propositions for view scope - ${s}.`,
                              logLevel: "info",
                              detail: {
                                scope: s,
                                propositions: t.map((e) => e.toJSON()),
                              },
                            }),
                            o())
                          : (({
                              returnedPropositions: i,
                              returnedDecisions: a,
                            } = e([], t)),
                            []);
                      })
                    );
                  };
              const lu = (e) => Object.keys(e).map((t) => ({ id: t, ...e[t] }));
              var du = () => {
                  const e = {};
                  return {
                    storeClickMeta: ({
                      selector: t,
                      meta: {
                        id: n,
                        scope: r,
                        scopeDetails: o,
                        trackingLabel: i,
                        scopeType: a,
                      },
                    }) => {
                      e[t] || (e[t] = {}),
                        (e[t][n] = {
                          scope: r,
                          scopeDetails: o,
                          trackingLabel: i,
                          scopeType: a,
                        });
                    },
                    getClickSelectors: () => Object.keys(e),
                    getClickMetas: (t) => (e[t] ? lu(e[t]) : {}),
                  };
                },
                uu = () => {
                  const e = {},
                    t = {};
                  return {
                    storeInteractionMeta: (n, r, o, i, a) => {
                      (a = parseInt(a, 10)),
                        e[a] || ((e[a] = {}), (t[a] = {})),
                        t[a][n] || (t[a][n] = new Set()),
                        t[a][n].add(r),
                        (e[a][n] = { ...i, scopeType: o });
                    },
                    getInteractionMetas: (n) =>
                      Array.isArray(n) && 0 !== n.length
                        ? Object.values(
                            n
                              .map((e) => parseInt(e, 10))
                              .reduce(
                                (n, r) => (
                                  Object.keys(e[r] || {}).forEach((o) => {
                                    n[o] ||
                                      (n[o] = {
                                        proposition: e[r][o],
                                        items: new Set(),
                                      }),
                                      (n[o].items = new Set([
                                        ...n[o].items,
                                        ...t[r][o],
                                      ]));
                                  }),
                                  n
                                ),
                                {}
                              )
                          ).map(({ proposition: e, items: t }) => ({
                            ...e,
                            items: Array.from(t).map((e) => ({ id: e })),
                          }))
                        : [],
                  };
                };
              const pu = (e, t) => e === zc && t === Vd,
                gu = {
                  [Vc]: () => !0,
                  [Hc]: () => !0,
                  [zc]: pu,
                  [Wc]: () => !0,
                  [Fc]: () => !0,
                },
                fu = (e, t) => "function" == typeof gu[e] && gu[e](e, t);
              var mu = ({
                  processPropositions: e,
                  createProposition: t,
                  renderedPropositions: n,
                  viewCache: r,
                }) => {
                  const o = ({ items: e, metadataForScope: t = {} }) => {
                      const { actionType: n, selector: r } = t;
                      return e
                        .filter((e) => fu(e.schema, n))
                        .map((e) => {
                          const { schema: o } = e;
                          return o === Hc || pu(o, n)
                            ? bt(t)
                              ? void 0
                              : {
                                  ...e,
                                  schema: pu(o, n) ? Vc : o,
                                  data: { ...e.data, selector: r, type: n },
                                }
                            : { ...e };
                        })
                        .filter((e) => e);
                    },
                    i = (e) => !(e.scope === Oo && e.renderAttempted),
                    a = ({ propositions: e, metadata: t }) =>
                      e
                        .filter(i)
                        .map((e) => {
                          if (Ve(e.items)) {
                            const { id: n, scope: r, scopeDetails: i } = e;
                            return {
                              id: n,
                              scope: r,
                              scopeDetails: i,
                              items: o({
                                items: e.items,
                                metadataForScope: t[e.scope],
                              }),
                            };
                          }
                          return e;
                        })
                        .filter((e) => Ve(e.items));
                  return ({
                    propositions: o = [],
                    metadata: i = {},
                    viewName: s,
                  }) => {
                    const c = Pe();
                    n.concat(c.promise);
                    const l = a({ propositions: o, metadata: i }).map((e) =>
                      t(e)
                    );
                    return Promise.resolve()
                      .then(() => (s ? r.getView(s) : []))
                      .then((t) => {
                        const { render: n, returnedPropositions: r } = e([
                          ...l,
                          ...t,
                        ]);
                        return n().then(c.resolve), { propositions: r };
                      });
                  };
                },
                hu =
                  ({ window: e }) =>
                  () =>
                    e.location,
                yu = ({ targetMigrationEnabled: e }) =>
                  e
                    ? (e) => {
                        e.getPayload().mergeMeta({ target: { migration: !0 } });
                      }
                    : nn;
              const vu = "BODY > *:eq(0)";
              var bu = (e) => {
                const { selector: t, type: n } = e;
                return n !== Dd || t !== vu ? e : { ...e, selector: "BODY" };
              };
              const wu = "SCRIPT,LINK,STYLE",
                Eu = (e) => {
                  const t = hl(e);
                  return Ke(wu, t)
                    .map((e) => e.outerHTML)
                    .join("");
                };
              var ku = (e) => {
                  const t = { ...e },
                    { content: n, selector: r } = t;
                  if (ac(n)) return t;
                  if (null == r) return t;
                  const o = Il(r);
                  return Ql(o[0], qe)
                    ? ((t.type = Bd), (t.content = Eu(n)), t)
                    : t;
                },
                Cu = (e) => (t) =>
                  t ? e.reduce((e, t) => ({ ...e, ...t(e) }), t) : t,
                Su = ({ preprocess: e, isPageWideSurface: t }) => {
                  const n = (t, n) => {
                    const {
                        id: r,
                        schema: o,
                        data: i,
                        characteristics: { trackingLabel: a } = {},
                      } = t,
                      s = i ? i.type : void 0,
                      c = e(i);
                    return {
                      getId: () => r,
                      getSchema: () => o,
                      getSchemaType: () => s,
                      getData: () => c,
                      getProposition: () => n,
                      getTrackingLabel: () => a,
                      getOriginalItem: () => t,
                      toString: () => JSON.stringify(t),
                      toJSON: () => t,
                    };
                  };
                  return (e, r = !0, o = !1) => {
                    const {
                        id: i,
                        scope: a,
                        scopeDetails: s,
                        items: c = [],
                      } = e,
                      { characteristics: { scopeType: l } = {} } = s || {};
                    return {
                      getScope: () => a,
                      getScopeType: () =>
                        a === Oo || t(a) ? Yd : l === Qd ? Qd : Xd,
                      getItems() {
                        return c.map((e) => n(e, this));
                      },
                      getNotification: () => ({
                        id: i,
                        scope: a,
                        scopeDetails: s,
                      }),
                      getId: () => i,
                      toJSON: () => e,
                      shouldSuppressDisplay: () => o,
                      addToReturnValues(t, n, o, i) {
                        r &&
                          (t.push({
                            ...e,
                            items: o.map((e) => e.getOriginalItem()),
                            renderAttempted: i,
                          }),
                          i ||
                            n.push({
                              ...e,
                              items: o.map((e) => e.getOriginalItem()),
                            }));
                      },
                    };
                  };
                },
                Iu = () => {
                  let e = Promise.resolve([]);
                  return {
                    concat(t) {
                      e = e.then((e) =>
                        t.then((t) => e.concat(t)).catch(() => e)
                      );
                    },
                    clear() {
                      const t = e;
                      return (e = Promise.resolve([])), t;
                    },
                  };
                },
                Tu = () => ({
                  render: nn,
                  setRenderAttempted: !0,
                  includeInNotification: !0,
                });
              const Pu = "always",
                Du = "never",
                Ou = "decoratedElementsOnly",
                Nu = [Pu, Du, Ou],
                Au = "data-aep-interact-id",
                Ru = "data-aep-click-label",
                xu = "data-aep-click-token";
              let Mu = 0;
              const _u = (e, t) => (t ? parseInt(t, 10) : ++Mu),
                Lu = (e, t) => !!e && !!e[t] && [Pu, Ou].includes(e[t]),
                ju = (e, t, n, r, o, i, a, s) => {
                  const { scopeDetails: c = {} } = a,
                    { decisionProvider: l } = c;
                  return Lu(e, l) || t === Fd
                    ? (e) => {
                        if (!e.tagName) return;
                        const t = _u(n, Dl(e, Au));
                        s(n, r, i, a, t),
                          Pl(e, Au, t),
                          o && !Dl(e, Ru) && Pl(e, Ru, o);
                      }
                    : nn;
                };
              var $u = (e, t) =>
                  e !== Qd
                    ? { shouldRender: () => !0, markAsRendered: () => {} }
                    : {
                        shouldRender: (e) =>
                          !e ||
                          !(e.dataset.adobePropositionIds ?? "")
                            .split(",")
                            .includes(t),
                        markAsRendered: (e) => {
                          const n = (e.dataset.adobePropositionIds ?? "").split(
                            ","
                          );
                          n.includes(t) || n.push(t),
                            (e.dataset.adobePropositionIds = n
                              .sort()
                              .join(","));
                        },
                      },
                Uu =
                  ({
                    modules: e,
                    logger: t,
                    storeInteractionMeta: n,
                    storeClickMeta: r,
                    autoCollectPropositionInteractions: o,
                  }) =>
                  (i) => {
                    const { type: a, selector: s } = i.getData() || {};
                    if (!a)
                      return (
                        t.warn(
                          "Invalid DOM action data: missing type.",
                          i.getData()
                        ),
                        { setRenderAttempted: !1, includeInNotification: !1 }
                      );
                    if (a === Fd)
                      return s
                        ? (r({
                            selector: s,
                            meta: {
                              ...i.getProposition().getNotification(),
                              trackingLabel: i.getTrackingLabel(),
                              scopeType: i.getProposition().getScopeType(),
                            },
                          }),
                          { setRenderAttempted: !0, includeInNotification: !1 })
                        : (t.warn(
                            "Invalid DOM action data: missing selector.",
                            i.getData()
                          ),
                          {
                            setRenderAttempted: !1,
                            includeInNotification: !1,
                          });
                    if (!e[a])
                      return (
                        t.warn(
                          "Invalid DOM action data: unknown type.",
                          i.getData()
                        ),
                        { setRenderAttempted: !1, includeInNotification: !1 }
                      );
                    const c = $u(i.getProposition().getScopeType(), i.getId()),
                      l = ju(
                        o,
                        a,
                        i.getProposition().getId(),
                        i.getId(),
                        i.getTrackingLabel(),
                        i.getProposition().getScopeType(),
                        i.getProposition().getNotification(),
                        n
                      );
                    return {
                      render: () => e[a](i.getData(), l, c),
                      setRenderAttempted: !0,
                      includeInNotification: !0,
                    };
                  },
                qu =
                  ({
                    modules: e,
                    logger: t,
                    storeInteractionMeta: n,
                    autoCollectPropositionInteractions: r,
                  }) =>
                  (o) => {
                    const { type: i, selector: a } = o.getData() || {};
                    if (!a || !i)
                      return {
                        setRenderAttempted: !1,
                        includeInNotification: !1,
                      };
                    if (!e[i])
                      return (
                        t.warn("Invalid HTML content data", o.getData()),
                        { setRenderAttempted: !1, includeInNotification: !1 }
                      );
                    const s = ju(
                        r,
                        i,
                        o.getProposition().getId(),
                        o.getId(),
                        o.getTrackingLabel(),
                        o.getProposition().getScopeType(),
                        o.getProposition().getNotification(),
                        n
                      ),
                      c = $u(o.getProposition().getScopeType(), o.getId());
                    return {
                      render: () => e[i](o.getData(), s, c),
                      setRenderAttempted: !0,
                      includeInNotification: !0,
                    };
                  };
              const Bu = "BODY";
              var Fu =
                  ({ logger: e, executeRedirect: t, collect: n }) =>
                  (r) => {
                    const { content: o } = r.getData() || {};
                    return o
                      ? {
                          render: () => (
                            ld(Bu),
                            n({
                              decisionsMeta: [
                                r.getProposition().getNotification(),
                              ],
                              documentMayUnload: !0,
                            })
                              .then(
                                () => (
                                  e.logOnContentRendering({
                                    status: "rendering-redirect",
                                    detail: {
                                      propositionDetails: r
                                        .getProposition()
                                        .getNotification(),
                                      redirect: o,
                                    },
                                    message: `Redirect action ${r.toString()} executed.`,
                                    logLevel: "info",
                                  }),
                                  t(o)
                                )
                              )
                              .catch((e) => {
                                throw (dd(Bu), e);
                              })
                          ),
                          setRenderAttempted: !0,
                          onlyRenderThis: !0,
                        }
                      : (e.warn("Invalid Redirect data", r.getData()), {});
                  },
                Vu = ({ schemaProcessors: e, logger: t }) => {
                  const n = (e, n) => () =>
                      Promise.resolve()
                        .then(e)
                        .then(
                          () => (
                            t.enabled &&
                              t.info(`Action ${n.toString()} executed.`),
                            n.toJSON()
                          )
                        )
                        .catch((e) => {
                          const { message: r, stack: o } = e,
                            i = `Failed to execute action ${n.toString()}. ${r} ${o}`;
                          t.logOnContentRendering({
                            status: "rendering-failed",
                            detail: {
                              propositionDetails: n
                                .getProposition()
                                .getNotification(),
                              item: n.toJSON(),
                            },
                            error: e,
                            message: i,
                            logLevel: "warn",
                          });
                        }),
                    r = async (e, t) => {
                      const n = (await Promise.allSettled(e.map((e) => e())))
                        .filter((e) => "fulfilled" === e.status)
                        .map((e) => e.value);
                      if (t && Ve(n)) return { ...t, items: n };
                    },
                    o = (t) => {
                      const n = e[t.getSchema()];
                      return n ? n(t) : {};
                    },
                    i = ({
                      renderers: e,
                      returnedPropositions: t,
                      returnedDecisions: i,
                      items: a,
                      proposition: s,
                    }) => {
                      let c,
                        l,
                        d,
                        u,
                        p = [...e],
                        g = [...t],
                        f = [...i],
                        m = [],
                        h = [],
                        y = [],
                        v = !1,
                        b = !1,
                        w = 0;
                      for (; a.length > w; ) {
                        if (
                          ((u = a[w]),
                          ({
                            render: c,
                            setRenderAttempted: l,
                            includeInNotification: d,
                            onlyRenderThis: b,
                          } = o(u)),
                          b)
                        ) {
                          (g = []),
                            (f = []),
                            l ? ((m = [u]), (h = [])) : ((m = []), (h = [u])),
                            (p = []),
                            (y = [c]),
                            (v = d);
                          break;
                        }
                        c && y.push(n(c, u)),
                          d && (v = !0),
                          l ? m.push(u) : h.push(u),
                          (w += 1);
                      }
                      if (y.length > 0) {
                        const e = v ? s.getNotification() : void 0;
                        p.push(() => r(y, e));
                      } else
                        v && p.push(() => Promise.resolve(s.getNotification()));
                      return (
                        m.length > 0 && s.addToReturnValues(g, f, m, !0),
                        h.length > 0 && s.addToReturnValues(g, f, h, !1),
                        {
                          renderers: p,
                          returnedPropositions: g,
                          returnedDecisions: f,
                          onlyRenderThis: b,
                        }
                      );
                    };
                  return (e, n = []) => {
                    let r,
                      o,
                      a,
                      s = [],
                      c = [],
                      l = [],
                      d = 0;
                    for (
                      ;
                      e.length > d &&
                      ((o = e[d]),
                      (a = o.getItems()),
                      ({
                        renderers: s,
                        returnedPropositions: c,
                        returnedDecisions: l,
                        onlyRenderThis: r,
                      } = i({
                        renderers: s,
                        returnedPropositions: c,
                        returnedDecisions: l,
                        items: a,
                        proposition: o,
                      })),
                      !r);

                    )
                      d += 1;
                    return (
                      r &&
                        e.forEach((e, t) => {
                          t !== d &&
                            e.addToReturnValues(c, l, e.getItems(), !1);
                        }),
                      n.forEach((e) => {
                        e.addToReturnValues(c, l, e.getItems(), !1);
                      }),
                      {
                        returnedPropositions: c,
                        returnedDecisions: l,
                        render: () =>
                          Promise.all(s.map((e) => e())).then((e) => {
                            const n = e.filter((e) => e),
                              r = n.map((e) => {
                                const { id: t, scope: n, scopeDetails: r } = e;
                                return { id: t, scope: n, scopeDetails: r };
                              });
                            if (Ve(n)) {
                              const e = Nt(n, (e) => e.scope);
                              t.logOnContentRendering({
                                status: "rendering-succeeded",
                                detail: { ...e },
                                message: `Scopes: ${JSON.stringify(
                                  e
                                )} successfully executed.`,
                                logLevel: "info",
                              });
                            }
                            return r;
                          }),
                      }
                    );
                  };
                };
              const Hu = () => {
                let e = 0;
                return (t) => {
                  const { items: n = [] } = t;
                  return !!n.some((e) => e.schema === Wc) && ((e += 1), e > 1);
                };
              };
              var zu =
                ({
                  processPropositions: e,
                  createProposition: t,
                  notificationHandler: n,
                }) =>
                ({
                  renderDecisions: r,
                  propositions: o,
                  event: i,
                  personalization: a = {},
                }) => {
                  if (!r) return Promise.resolve();
                  const { sendDisplayEvent: s = !0 } = a,
                    c = i ? i.getViewName() : void 0,
                    l = Hu(),
                    d = o.map((e) => t(e, !0, l(e))),
                    { render: u, returnedPropositions: p } = e(d),
                    g = n(r, s, c),
                    f = d.reduce((e, t) => ((e[t.getId()] = t), e), {});
                  return (
                    u().then((e) => {
                      const t = e.filter(
                          (e) => !f[e.id].shouldSuppressDisplay()
                        ),
                        n = e.filter((e) => f[e.id].shouldSuppressDisplay());
                      g(t, n);
                    }),
                    Promise.resolve({ propositions: p })
                  );
                };
              const Gu = "text/html",
                Ju = "application/json",
                Wu = "defaultContent",
                Qu = ["content", "contentType"],
                Yu = ["mobileParameters", "webParameters", "html"],
                Xu = (e, t) => {
                  for (let n = 0; n < Qu.length; n += 1) {
                    const r = Qu[n];
                    if (!Object.prototype.hasOwnProperty.call(e, r))
                      return (
                        t.warn(
                          `Invalid in-app message data: missing property '${r}'.`,
                          e
                        ),
                        !1
                      );
                  }
                  const { content: n, contentType: r } = e;
                  if (r === Ju)
                    for (let r = 0; r < Yu.length; r += 1) {
                      const o = Yu[r];
                      if (!Object.prototype.hasOwnProperty.call(n, o))
                        return (
                          t.warn(
                            `Invalid in-app message data.content: missing property '${o}'.`,
                            e
                          ),
                          !1
                        );
                    }
                  return !0;
                };
              var Ku =
                ({ modules: e, logger: t }) =>
                (n) => {
                  const r = n.getData(),
                    o = n.getProposition(),
                    i = { ...o.getNotification() },
                    a = o.shouldSuppressDisplay();
                  if (!r)
                    return (
                      t.warn("Invalid in-app message data: undefined.", r), {}
                    );
                  const { type: s = Wu } = r;
                  return e[s]
                    ? Xu(r, t)
                      ? i
                        ? {
                            render: () => (a ? null : e[s]({ ...r, meta: i })),
                            setRenderAttempted: !0,
                            includeInNotification: !0,
                          }
                        : (t.warn("Invalid in-app message meta: undefined.", i),
                          {})
                      : {}
                    : (t.warn("Invalid in-app message data: unknown type.", r),
                      {});
                };
              const Zu = (e) => {
                  const t = Ke(`#${e}`, document);
                  t && t.length > 0 && mt(t[0]);
                },
                ep = (e) => {
                  const t = {};
                  if (!e || "a" !== e.tagName.toLowerCase()) return t;
                  const { href: n } = e;
                  if (!n || !n.startsWith("adbinapp://")) return t;
                  const r = n.split("?"),
                    o = r[0].split("://")[1],
                    i = e.innerText,
                    a = e.getAttribute("data-uuid") || "";
                  let s, c;
                  if (Ve(r)) {
                    const e = dn.parse(r[1]);
                    (s = e.interaction || ""), (c = da(e.link || ""));
                  }
                  return {
                    action: o,
                    interaction: s,
                    link: c,
                    label: i,
                    uuid: a,
                  };
                };
              var tp =
                (e) =>
                (t, n = !1) => (
                  n ? (e.location.href = t) : e.location.replace(t),
                  new Promise(() => {})
                );
              const np = "alloy-messaging-container",
                rp = "alloy-overlay-container",
                op = "alloy-content-iframe",
                ip = () => [np, rp].forEach(Zu),
                ap =
                  (e, t = tp(window)) =>
                  (n) => {
                    n.preventDefault(), n.stopImmediatePropagation();
                    const { target: r } = n,
                      o = "a" === r.tagName.toLowerCase() ? r : r.closest("a");
                    if (!o) return;
                    const {
                      action: i,
                      interaction: a,
                      link: s,
                      label: c,
                      uuid: l,
                    } = ep(o);
                    e(i, { label: c, id: a, uuid: l, link: s }),
                      "dismiss" === i && ip(),
                      tn(s) && s.length > 0 && t(s, !0);
                  },
                sp = (e, t) => {
                  const n = new DOMParser().parseFromString(e, Gu),
                    r = n.querySelector("script");
                  r && r.setAttribute("nonce", Ul());
                  const o = xe("iframe", {
                    src: URL.createObjectURL(
                      new Blob([n.documentElement.outerHTML], {
                        type: "text/html",
                      })
                    ),
                    id: op,
                  });
                  return (
                    o.addEventListener("load", () => {
                      const { addEventListener: e } =
                        o.contentDocument || o.contentWindow.document;
                      e("click", t);
                    }),
                    o
                  );
                },
                cp = (e, t, n, r) => {
                  [
                    { id: rp, element: r },
                    { id: np, element: n },
                    { id: op, element: e },
                  ].forEach(({ id: e, element: n }) => {
                    const { style: r = {}, params: o = {} } = t[e];
                    Object.assign(n.style, r);
                    const {
                        parentElement: i = "body",
                        insertionMethod: a = "appendChild",
                        enabled: s = !0,
                      } = o,
                      c = document.querySelector(i);
                    s && c && "function" == typeof c[a] && c[a](n);
                  });
                },
                lp = (e) => {
                  const {
                      verticalAlign: t,
                      width: n,
                      horizontalAlign: r,
                      backdropColor: o,
                      height: i,
                      cornerRadius: a,
                      horizontalInset: s,
                      verticalInset: c,
                      uiTakeover: l = !1,
                    } = e,
                    d = {
                      width: n ? `${n}%` : "100%",
                      backgroundColor: o || "rgba(0, 0, 0, 0.5)",
                      borderRadius: a ? `${a}px` : "0px",
                      border: "none",
                      position: l ? "fixed" : "relative",
                      overflow: "hidden",
                    };
                  return (
                    "left" === r
                      ? (d.left = s ? `${s}%` : "0")
                      : "right" === r
                      ? (d.right = s ? `${s}%` : "0")
                      : "center" === r &&
                        ((d.left = "50%"), (d.transform = "translateX(-50%)")),
                    "top" === t
                      ? (d.top = c ? `${c}%` : "0")
                      : "bottom" === t
                      ? ((d.position = "fixed"), (d.bottom = c ? `${c}%` : "0"))
                      : "center" === t &&
                        ((d.top = "50%"),
                        (d.transform =
                          ("center" === r ? `${d.transform} ` : "") +
                          "translateY(-50%)"),
                        (d.display = "flex"),
                        (d.alignItems = "center"),
                        (d.justifyContent = "center")),
                    (d.height = i ? `${i}vh` : "100%"),
                    d
                  );
                },
                dp = (e) => {
                  const { backdropOpacity: t, backdropColor: n } = e;
                  return {
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    background: "transparent",
                    opacity: t || 0.5,
                    backgroundColor: n || "#FFFFFF",
                  };
                },
                up = ["enabled", "parentElement", "insertionMethod"],
                pp = (e) => {
                  if (!e) return !1;
                  const t = Object.keys(e);
                  if (!t.includes(np)) return !1;
                  if (!t.includes(rp)) return !1;
                  const n = Object.values(e);
                  for (let e = 0; e < n.length; e += 1) {
                    if (!Ar(n[e], "style")) return !1;
                    if (!Ar(n[e], "params")) return !1;
                    for (let t = 0; t < up.length; t += 1)
                      if (!Ar(n[e].params, up[t])) return !1;
                  }
                  return !0;
                },
                gp = (e) => {
                  if (!e) return;
                  const { uiTakeover: t = !1 } = e;
                  return {
                    [op]: {
                      style: { border: "none", width: "100%", height: "100%" },
                      params: {
                        enabled: !0,
                        parentElement: "#alloy-messaging-container",
                        insertionMethod: "appendChild",
                      },
                    },
                    [np]: {
                      style: lp(e),
                      params: {
                        enabled: !0,
                        parentElement: "body",
                        insertionMethod: "appendChild",
                      },
                    },
                    [rp]: {
                      style: dp(e),
                      params: {
                        enabled: !0 === t,
                        parentElement: "body",
                        insertionMethod: "appendChild",
                      },
                    },
                  };
                },
                fp = (e = {}, t) => {
                  ip();
                  const { content: n, contentType: r, mobileParameters: o } = e;
                  let { webParameters: i } = e;
                  if (r !== Gu) return;
                  const a = xe("div", { id: np }),
                    s = sp(n, ap(t)),
                    c = xe("div", { id: rp });
                  pp(i) || (i = gp(o)), i && cp(s, i, a, c);
                };
              var mp = (e, t) =>
                  new Promise((n) => {
                    const { meta: r } = e;
                    fp(e, (e, n) => {
                      const o = {};
                      (o[cl.INTERACT] = sl),
                        -1 !== Object.values(cl).indexOf(e) && (o[e] = sl),
                        t({
                          decisionsMeta: [r],
                          propositionAction: n,
                          eventType: rl,
                          propositionEventTypes: Object.keys(o),
                        });
                    }),
                      n({ meta: r });
                  }),
                hp = (e) => ({ defaultContent: (t) => mp(t, e) }),
                yp = (e, t) => (n, r, o) => {
                  if (!n) return () => {};
                  if (!r) {
                    const e = Pe();
                    return t.concat(e.promise), e.resolve;
                  }
                  return (t = [], n = []) => {
                    Ve(t) && e({ decisionsMeta: t, viewName: o }),
                      Ve(n) &&
                        e({
                          decisionsMeta: n,
                          eventType: al,
                          propositionAction: { reason: "Conflict" },
                          viewName: o,
                        });
                  };
                },
                vp =
                  ({ showContainers: e, consent: t }) =>
                  () => {
                    const { state: n, wasSet: r } = t.current();
                    n === Jr && r ? e() : t.awaitConsent().catch(e);
                  };
              const bp = (e) => {
                  const { documentElement: t } = document;
                  let n = e;
                  const r = new Set();
                  let o, i;
                  for (; n && n !== t && !(n instanceof ShadowRoot); ) {
                    const e = Dl(n, Au);
                    e && r.add(e),
                      (o = o || Dl(n, Ru)),
                      (i = i || Dl(n, xu)),
                      (n = n.parentNode);
                  }
                  return { interactIds: [...r], clickLabel: o, clickToken: i };
                },
                wp = (e) => {
                  const t = e.find((e) => e.scopeType === Qd);
                  return t ? t.scope : void 0;
                },
                Ep = (e, t, n) => (r) => {
                  const { scopeDetails: o = {} } = r,
                    { decisionProvider: i } = o;
                  return e[i] === Pu || (e[i] === Ou && (t || n));
                };
              var kp = (e, t, n) => {
                const {
                    interactIds: r,
                    clickLabel: o = "",
                    clickToken: i,
                  } = bp(e),
                  a = Ep(n, o, i);
                if (0 === r.length) return {};
                const s = t(r).filter(a);
                return {
                  decisionsMeta: Kd(s),
                  propositionActionLabel: o,
                  propositionActionToken: i,
                  viewName: wp(s),
                };
              };
              const Cp = "personalization:decisions",
                Sp = "AJO",
                Ip = "TGT",
                Tp = ({
                  config: e,
                  logger: t,
                  eventManager: n,
                  consent: r,
                }) => {
                  const {
                      targetMigrationEnabled: o,
                      prehidingStyle: i,
                      autoCollectPropositionInteractions: a,
                    } = e,
                    s = zd({ eventManager: n, mergeDecisionsMeta: ru }),
                    c = pd(t),
                    l = ud(t),
                    { storeInteractionMeta: d, getInteractionMetas: u } = uu(),
                    {
                      storeClickMeta: p,
                      getClickSelectors: g,
                      getClickMetas: f,
                    } = du(),
                    m = hu({ window: window }),
                    h = Hd(),
                    y = Cu([ku, bu]),
                    v = Su({ preprocess: y, isPageWideSurface: qc }),
                    b = su({ createProposition: v }),
                    w = tp(window),
                    E = {
                      [Fc]: Tu,
                      [Vc]: Uu({
                        modules: h,
                        logger: t,
                        storeInteractionMeta: d,
                        storeClickMeta: p,
                        autoCollectPropositionInteractions: a,
                      }),
                      [Hc]: qu({
                        modules: h,
                        logger: t,
                        storeInteractionMeta: d,
                        autoCollectPropositionInteractions: a,
                      }),
                      [Jc]: Fu({ logger: t, executeRedirect: w, collect: s }),
                      [Wc]: Ku({ modules: hp(s), logger: t }),
                    },
                    k = Vu({ schemaProcessors: E, logger: t }),
                    C = Iu(),
                    S = yp(s, C),
                    I = Jd({
                      prehidingStyle: i,
                      showContainers: c,
                      hideContainers: l,
                      mergeQuery: ou,
                      processPropositions: k,
                      createProposition: v,
                      notificationHandler: S,
                      consent: r,
                      logger: t,
                    }),
                    T = au({
                      mergeDecisionsMeta: ru,
                      collectInteractions: kp,
                      collectClicks: tu,
                      getInteractionMetas: u,
                      getClickMetas: f,
                      getClickSelectors: g,
                      autoCollectPropositionInteractions: a,
                    }),
                    P = cu({ processPropositions: k, viewCache: b, logger: t }),
                    D = mu({
                      processPropositions: k,
                      createProposition: v,
                      renderedPropositions: C,
                      viewCache: b,
                    }),
                    O = yu({ targetMigrationEnabled: o }),
                    N = zu({
                      processPropositions: k,
                      createProposition: v,
                      notificationHandler: S,
                    }),
                    A = vp({ showContainers: c, consent: r });
                  return ml({
                    getPageLocation: m,
                    logger: t,
                    fetchDataHandler: I,
                    viewChangeHandler: P,
                    onClickHandler: T,
                    isAuthoringModeEnabled: nu,
                    mergeQuery: ou,
                    viewCache: b,
                    showContainers: c,
                    applyPropositions: D,
                    setTargetMigration: O,
                    mergeDecisionsMeta: ru,
                    renderedPropositions: C,
                    onDecisionHandler: N,
                    handleConsentFlicker: A,
                  });
                };
              Tp.namespace = "Personalization";
              const Pp = Nu.map((e) => Dr(e));
              Tp.configValidators = Ar({
                prehidingStyle: Rr().nonEmpty(),
                targetMigrationEnabled: Tr().default(!1),
                autoCollectPropositionInteractions: Ar({
                  [Sp]: Cr(Pp).default(Pu),
                  [Ip]: Cr(Pp).default(Du),
                })
                  .default({ [Sp]: Pu, [Ip]: Du })
                  .noUnknownFields(),
              });
              const Dp = (e) =>
                  null !== e &&
                  "object" == typeof e &&
                  Object.getPrototypeOf(e) === Object.prototype,
                Op = (e, t = {}, n = []) => (
                  Object.keys(e).forEach((r) => {
                    Dp(e[r]) || Array.isArray(e[r])
                      ? Op(e[r], t, [...n, r])
                      : (t[[...n, r].join(".")] = e[r]);
                  }),
                  t
                );
              var Np = (e) => (Dp(e) ? Op(e) : e),
                Ap = ({
                  renderDecisions: e,
                  decisionProvider: t,
                  applyResponse: n,
                  event: r,
                  personalization: o,
                  decisionContext: i,
                }) => {
                  const a = { ...Np(r.getContent()), ...i };
                  return ({ response: i }) => {
                    if ((t.addPayloads(i.getPayloadsByType(Cp)), !r.hasQuery()))
                      return { propositions: [] };
                    const s = t.evaluate(a);
                    return n({
                      renderDecisions: e,
                      propositions: s,
                      event: r,
                      personalization: o,
                    });
                  };
                };
              const Rp = {
                  MATCHER: "matcher",
                  GROUP: "group",
                  HISTORICAL: "historical",
                },
                xp = {
                  EQUALS: "eq",
                  NOT_EQUALS: "ne",
                  EXISTS: "ex",
                  NOT_EXISTS: "nx",
                  GREATER_THAN: "gt",
                  GREATER_THAN_OR_EQUAL_TO: "ge",
                  LESS_THAN: "lt",
                  LESS_THAN_OR_EQUAL_TO: "le",
                  CONTAINS: "co",
                  NOT_CONTAINS: "nc",
                  STARTS_WITH: "sw",
                  ENDS_WITH: "ew",
                },
                Mp = { AND: "and", OR: "or" },
                _p = { ORDERED: "ordered", MOST_RECENT: "mostRecent" },
                Lp = {
                  [xp.EQUALS]: d(),
                  [xp.NOT_EQUALS]: u(),
                  [xp.EXISTS]: p(),
                  [xp.NOT_EXISTS]: g(),
                  [xp.GREATER_THAN]: m(),
                  [xp.GREATER_THAN_OR_EQUAL_TO]: h(),
                  [xp.LESS_THAN]: y(),
                  [xp.LESS_THAN_OR_EQUAL_TO]: v(),
                  [xp.CONTAINS]: b(),
                  [xp.NOT_CONTAINS]: w(),
                  [xp.STARTS_WITH]: E(),
                  [xp.ENDS_WITH]: k(),
                },
                jp = "eventId",
                $p = "eventType",
                Up = ["iam.eventType", $p, "type"],
                qp = ["iam.id", "id"],
                Bp = (e, t, n) => {
                  switch (t) {
                    case xp.GREATER_THAN:
                      return e > n;
                    case xp.GREATER_THAN_OR_EQUAL_TO:
                      return e >= n;
                    case xp.LESS_THAN:
                      return e < n;
                    case xp.LESS_THAN_OR_EQUAL_TO:
                      return e <= n;
                    case xp.EQUALS:
                      return e === n;
                    case xp.NOT_EQUALS:
                      return e !== n;
                    default:
                      return !1;
                  }
                },
                Fp = (e, t) => {
                  for (let n = 0; n < t.length; n += 1)
                    if (!S(e[t[n]])) return t[n];
                  throw new Error(
                    "The event does not match the expected schema."
                  );
                },
                Vp = (e) => {
                  const t = structuredClone(e);
                  return (
                    [
                      [Fp(t, Up), $p],
                      [Fp(t, qp), jp],
                    ].forEach(([e, n]) => {
                      e !== n && ((t[n] = t[e]), delete t[e]);
                    }),
                    t
                  );
                },
                Hp = "TGT",
                zp = "DEFAULT",
                Gp = "ECID",
                Jp = "<key>",
                Wp = "<identity>",
                Qp = Y(K, (e) => e.join("-")),
                Yp = 100,
                Xp = Y(Z);
              var Kp = (e) => {
                  const t = structuredClone(e),
                    n = Object.keys(t)
                      .sort()
                      .reduce((e, n) => {
                        const r = t[n];
                        return null == r || "" === r ? e : (e += `${n}:${r}`);
                      }, "");
                  return kt(n);
                },
                Zp = (e) => {
                  const t = new Date();
                  return t.setDate(t.getDate() - e), t;
                };
              const eg = 1e3,
                tg = 30,
                ng = "events",
                rg = 2097152,
                og = { TYPE: "~type", SOURCE: "~source" },
                ig = {
                  EDGE: "com.adobe.eventType.edge",
                  RULES_ENGINE: "com.adobe.eventType.rulesEngine",
                },
                ag = { REQUEST: "com.adobe.eventSource.requestContent" },
                sg = "cjmiam",
                cg = "schema",
                lg = "insert",
                dg = "insertIfNotExists";
              var ug =
                  (e = tg, t = eg) =>
                  (n) => {
                    let r = Object.entries(n).reduce(
                      (e, [t, { timestamps: n = [] }]) => (
                        n.forEach((n) => {
                          e.push({ key: t, timestamp: n });
                        }),
                        e
                      ),
                      []
                    );
                    const o = Zp(e);
                    return (
                      (r = r.filter(({ timestamp: e }) => e >= o)),
                      r.sort((e, t) => e.timestamp - t.timestamp),
                      (r = r.slice(-t)),
                      r.reduce(
                        (e, { key: t, timestamp: n }) => (
                          e[t] || (e[t] = { timestamps: [] }),
                          e[t].timestamps.push(n),
                          e
                        ),
                        {}
                      )
                    );
                  },
                pg = (e) => {
                  const { _experience: t } = e || {};
                  return !!t && "object" == typeof t;
                };
              const gg = (e) => e?.scopeDetails?.activity?.id,
                fg = (e) => e?.scopeDetails?.decisionProvider,
                mg = (e, t) => (n) => {
                  try {
                    const n = e.getItem(t);
                    return [JSON.parse(n), n.length];
                  } catch {}
                  return [n, 0];
                },
                hg = (e, t) => (n) => {
                  e.setItem(t, JSON.stringify(n));
                },
                yg = () => {
                  const e = {};
                  return {
                    getItem: (t) => (t in e ? e[t] : null),
                    setItem: (t, n) => {
                      e[t] = n;
                    },
                  };
                },
                vg = (e) => {
                  e.clear();
                };
              var bg = (e = []) => (Array.isArray(e) ? e.flat(1 / 0) : e),
                wg = (e, t, n) => {
                  const { html: r, mobileParameters: o } = n;
                  return {
                    schema: Wc,
                    data: {
                      mobileParameters: o,
                      webParameters: {},
                      content: r,
                      contentType: Gu,
                    },
                    id: e,
                  };
                },
                Eg = (e, t, n) => {
                  const { schema: r, data: o, id: i } = n;
                  return { schema: r, data: o, id: i || e };
                };
              const kg = { [sg]: wg, [cg]: Eg };
              var Cg = () => (e) => {
                const { id: t, type: n, detail: r } = e;
                return "function" == typeof kg[n] ? kg[n](t, n, r) : r;
              };
              const Sg = (e) => {
                const { schema: t, data: n } = e;
                if (t === Gc) return !0;
                if (t !== zc) return !1;
                try {
                  const e =
                    "string" == typeof n.content
                      ? JSON.parse(n.content)
                      : n.content;
                  return (
                    e &&
                    Object.prototype.hasOwnProperty.call(e, "version") &&
                    Object.prototype.hasOwnProperty.call(e, "rules")
                  );
                } catch {
                  return !1;
                }
              };
              var Ig = (e, t) => {
                  const n = Cg(),
                    r = gg(e),
                    o = [],
                    i = (e) => {
                      const { data: t = {}, schema: n } = e,
                        r = n === Gc ? t : t.content;
                      r &&
                        o.push(
                          ie("string" == typeof r ? JSON.parse(r) : r, {
                            generateEventHash: Kp,
                          })
                        );
                    },
                    a = (i) => {
                      const a = t.getEvent(nl, r),
                        s = a?.timestamps[0],
                        c = bg(o.map((e) => e.execute(i)))
                          .map(n)
                          .map((e) => {
                            const n = t.addEvent({
                              eventType: cl.TRIGGER,
                              eventId: r,
                            }).timestamps[0];
                            return {
                              ...e,
                              data: {
                                ...e.data,
                                qualifiedDate: n,
                                displayedDate: s,
                              },
                            };
                          });
                      return { ...e, items: c };
                    };
                  return (
                    Array.isArray(e.items) && e.items.filter(Sg).forEach(i),
                    {
                      rank: e?.scopeDetails?.rank || 1 / 0,
                      evaluate: a,
                      isEvaluable: o.length > 0,
                    }
                  );
                },
                Tg = ({ eventRegistry: e }) => {
                  const t = {},
                    n = (n) => {
                      const r = gg(n);
                      if (!r) return;
                      const o = Ig(n, e);
                      o.isEvaluable && (t[r] = o);
                    };
                  return {
                    addPayload: n,
                    addPayloads: (e) => {
                      e.forEach(n);
                    },
                    evaluate: (e = {}) =>
                      Object.values(t)
                        .sort(({ rank: e }, { rank: t }) => e - t)
                        .map((t) => t.evaluate(e))
                        .filter((e) => e.items.length > 0),
                  };
                },
                Pg = (e) => {
                  const t = [];
                  return (
                    e.forEach((e) => {
                      const n = [];
                      e.items.forEach((e) => {
                        e.schema === Yc
                          ? t.push({
                              operation: e.data.operation,
                              event: {
                                eventId: e.data.content["iam.id"],
                                eventType: e.data.content["iam.eventType"],
                              },
                            })
                          : n.push(e);
                      }),
                        (e.items = n);
                    }),
                    t
                  );
                },
                Dg =
                  ({ lifecycle: e, eventRegistry: t }) =>
                  ({
                    renderDecisions: n = !1,
                    propositions: r = [],
                    event: o,
                    personalization: i,
                  }) => {
                    if (e) {
                      const a = Pg(r);
                      t.addEventPayloads(a),
                        e.onDecision({
                          renderDecisions: n,
                          propositions: r,
                          event: o,
                          personalization: i,
                        });
                    }
                    return { propositions: r };
                  },
                Og = ({ storage: e, logger: t }) => {
                  let n,
                    r,
                    o,
                    i = e;
                  const a = (e) => {
                    i = e;
                    const t = mg(i, ng);
                    if (((n = hg(i, ng)), ([r, o] = t({})), o > rg)) {
                      const e = ug();
                      (r = e(r)), n(r);
                    }
                  };
                  a(e);
                  const s = (
                      e = { eventType: null, eventId: null },
                      o = lg
                    ) => {
                      const { eventType: i, eventId: a } = e;
                      if (!i || !a) return;
                      const s = Kp(e);
                      if (o === dg && r[s]) return;
                      (r[s] && Array.isArray(r[s].timestamps)) ||
                        (r[s] = { timestamps: [] });
                      const c = new Date().getTime();
                      return (
                        r[s].timestamps.push(c),
                        r[s].timestamps.sort(),
                        t.info(
                          "[Event History] Added event for",
                          e,
                          "with hash",
                          s,
                          "and timestamp",
                          c
                        ),
                        n(r),
                        r[s]
                      );
                    },
                    c = (e = []) =>
                      e.map(({ operation: e, event: t }) => s(t, e));
                  return {
                    addExperienceEdgeEvent: (e) => {
                      const { xdm: t } = e.getContent();
                      if (!pg(t)) return;
                      const {
                        _experience: {
                          decisioning: {
                            propositionEventType: n = {},
                            propositionAction: { id: r } = {},
                            propositions: o = [],
                          } = {},
                        },
                      } = t;
                      Object.keys(n)
                        .filter((e) => n[e] === sl)
                        .forEach((e) => {
                          o.forEach((t) => {
                            fg(t) === Sp &&
                              s({ eventId: gg(t), eventType: e, action: r });
                          });
                        });
                    },
                    addEvent: s,
                    addEventPayloads: c,
                    getEvent: (e, t) => {
                      const n = Kp({ eventType: e, eventId: t });
                      if (r[n]) return r[n];
                    },
                    toJSON: () => r,
                    setStorage: a,
                  };
                },
                Ng = ({ eventRegistry: e, window: t, getBrowser: n }) => {
                  const r = new Date().getTime(),
                    o = () => ({ title: t.title, url: t.url, ...an(t.url) }),
                    i = () => ({ url: t.referrer, ...an(t.referrer) }),
                    a = () => {
                      const e = new Date(),
                        t = e.getTime();
                      return {
                        pageLoadTimestamp: r,
                        currentTimestamp: t,
                        currentDate: e.getDate(),
                        "~state.com.adobe.module.lifecycle/lifecyclecontextdata.dayofweek":
                          e.getDay() + 1,
                        "~state.com.adobe.module.lifecycle/lifecyclecontextdata.hourofday":
                          e.getHours(),
                        currentMinute: e.getMinutes(),
                        currentMonth: e.getMonth(),
                        currentYear: e.getFullYear(),
                        pageVisitDuration: t - r,
                        "~timestampu": t / 1e3,
                        "~timestampz": e.toISOString(),
                      };
                    },
                    s = () => ({
                      height: t.height,
                      width: t.width,
                      scrollY: t.scrollY,
                      scrollX: t.scrollX,
                    }),
                    c = {
                      browser: { name: n() },
                      page: o(),
                      referringPage: i(),
                    },
                    l = () => ({ ...c, ...a(), window: s(), "~sdkver": Di });
                  return {
                    getContext: (t = {}) => {
                      const n = { ...l(), ...t };
                      return { ...Np(n), events: e.toJSON() };
                    },
                  };
                };
              const Ag = (e, ...t) => t,
                Rg = () => !0,
                xg = () => {
                  let e = Ag,
                    t = Rg,
                    n = 0;
                  const r = {},
                    o = (e) => () => {
                      delete r[e];
                    },
                    i = (e, t) =>
                      "function" != typeof e
                        ? () => {}
                        : ((n += 1),
                          (r[n] = { callback: e, params: t }),
                          { id: n, unsubscribe: o(n) }),
                    a = (...n) => {
                      Object.values(r).forEach(({ callback: r, params: o }) => {
                        const i = e(o, ...n);
                        t(o, ...i) && r(...i);
                      });
                    },
                    s = (n, ...o) => {
                      if (!n || !r[n]) return;
                      const { callback: i, params: a } = r[n],
                        s = e(a, ...o);
                      t(a, ...s) && i(...s);
                    };
                  return {
                    add: i,
                    emit: a,
                    emitOne: s,
                    hasSubscriptions: () => Object.keys(r).length > 0,
                    setEmissionPreprocessor: (t) => {
                      "function" == typeof t && (e = t);
                    },
                    setEmissionCondition: (e) => {
                      "function" == typeof e && (t = e);
                    },
                  };
                },
                Mg = ({ options: e }) =>
                  Ar({
                    surfaces: Ir(Rr()).uniqueItems(),
                    schemas: Ir(Rr()).uniqueItems(),
                    callback: Pr().required(),
                  }).noUnknownFields()(e),
                _g = (e) => {
                  const { id: t, scope: n, scopeDetails: r } = e;
                  return { id: t, scope: n, scopeDetails: r };
                };
              var Lg = ({ collect: e }) => {
                let t = () => {};
                const n = new Set(),
                  r = (e) => [cl.INTERACT, cl.DISMISS].includes(e),
                  o = (e, t, o) => {
                    const i = [e, t].join("-"),
                      a = !o.has(i) && (r(e) || !n.has(i));
                    return o.add(i), n.add(i), a;
                  },
                  i = (t, n = []) => {
                    if (!(n instanceof Array)) return Promise.resolve();
                    if (!Object.values(cl).includes(t))
                      return Promise.resolve();
                    const r = [],
                      i = new Set();
                    return (
                      n.forEach((e) => {
                        const n = _g(e);
                        o(t, n.id, i) && r.push(n);
                      }),
                      r.length > 0
                        ? e({
                            decisionsMeta: r,
                            eventType: pl(t),
                            documentMayUnload: !0,
                          })
                        : Promise.resolve()
                    );
                  },
                  a = xg(),
                  s = (e, t) => {
                    const { surfacesFilter: n, schemasFilter: r } = e;
                    return [
                      {
                        propositions: t
                          .filter((e) => !n || n.includes(e.scope))
                          .map((e) => {
                            const { items: t = [] } = e;
                            return {
                              ...e,
                              items: t.filter(
                                (e) => !r || r.includes(e.schema)
                              ),
                            };
                          })
                          .filter((e) => e.items.length > 0),
                      },
                      i,
                    ];
                  };
                a.setEmissionPreprocessor(s);
                const c = ({ surfaces: e, schemas: n, callback: r }) => {
                  const { id: o, unsubscribe: i } = a.add(r, {
                    surfacesFilter: e instanceof Array ? e : void 0,
                    schemasFilter: n instanceof Array ? n : void 0,
                  });
                  return t(o), Promise.resolve({ unsubscribe: i });
                };
                return {
                  refresh: (e) => {
                    (t = (t) => {
                      t ? a.emitOne(t, e) : a.emit(e);
                    }),
                      t();
                  },
                  command: {
                    optionsValidator: (e) => Mg({ options: e }),
                    run: c,
                  },
                };
              };
              const jg = ({ options: e }) =>
                Ar({
                  renderDecisions: Tr(),
                  personalization: Ar({ decisionContext: Ar({}) }),
                }).noUnknownFields()(e);
              var $g = ({ contextProvider: e, decisionProvider: t }) => ({
                optionsValidator: (e) => jg({ options: e }),
                run: ({
                  renderDecisions: n,
                  decisionContext: r,
                  applyResponse: o,
                }) =>
                  o({
                    renderDecisions: n,
                    propositions: t.evaluate(e.getContext(r)),
                  }),
              });
              const Ug = ({
                config: e,
                eventManager: t,
                createNamespacedStorage: n,
                consent: r,
                getBrowser: o,
                logger: i,
              }) => {
                const { orgId: a, personalizationStorageEnabled: s } = e,
                  c = zd({ eventManager: t, mergeDecisionsMeta: ru }),
                  l = n(`${Dt(a)}.decisioning.`);
                s || vg(l.persistent);
                const d = Og({ storage: yg(), logger: i }),
                  u = Tg({ eventRegistry: d }),
                  p = Ng({ eventRegistry: d, window: window, getBrowser: o }),
                  g = $g({ contextProvider: p, decisionProvider: u }),
                  f = Lg({ collect: c });
                let m;
                return {
                  lifecycle: {
                    onDecision({ propositions: e }) {
                      f.refresh(e);
                    },
                    onComponentsRegistered(e) {
                      (m = Dg({ lifecycle: e.lifecycle, eventRegistry: d })),
                        s &&
                          r
                            .awaitConsent()
                            .then(() => {
                              d.setStorage(l.persistent);
                            })
                            .catch(() => {
                              l && vg(l.persistent);
                            });
                    },
                    onBeforeEvent({
                      event: e,
                      renderDecisions: t,
                      personalization: n = {},
                      onResponse: r = nn,
                    }) {
                      const { decisionContext: o = {} } = n;
                      r(
                        Ap({
                          renderDecisions: t,
                          decisionProvider: u,
                          applyResponse: m,
                          event: e,
                          personalization: n,
                          decisionContext: p.getContext({
                            [og.TYPE]: ig.EDGE,
                            [og.SOURCE]: ag.REQUEST,
                            ...o,
                          }),
                        })
                      );
                    },
                    onBeforeRequest({ request: e }) {
                      const t = e.getPayload().toJSON(),
                        { events: n = [] } = t;
                      0 !== n.length &&
                        n.forEach((e) => d.addExperienceEdgeEvent(e));
                    },
                  },
                  commands: {
                    evaluateRulesets: {
                      run: ({
                        renderDecisions: e,
                        personalization: t = {},
                      }) => {
                        const { decisionContext: n = {} } = t;
                        return g.run({
                          renderDecisions: e,
                          decisionContext: {
                            [og.TYPE]: ig.RULES_ENGINE,
                            [og.SOURCE]: ag.REQUEST,
                            ...n,
                          },
                          applyResponse: m,
                        });
                      },
                      optionsValidator: g.optionsValidator,
                    },
                    subscribeRulesetItems: f.command,
                  },
                };
              };
              (Ug.namespace = "RulesEngine"),
                (Ug.configValidators = Ar({
                  personalizationStorageEnabled: Tr().default(!1),
                }));
              var qg = Ar({
                  streamingMedia: Ar({
                    channel: Rr().nonEmpty().required(),
                    playerName: Rr().nonEmpty().required(),
                    appVersion: Rr(),
                    mainPingInterval: Or().minimum(10).maximum(50).default(10),
                    adPingInterval: Or().minimum(1).maximum(10).default(10),
                  }).noUnknownFields(),
                }),
                Bg = ({ options: e }) =>
                  Cr(
                    [
                      Ar({
                        playerId: Rr().required(),
                        getPlayerDetails: Pr().required(),
                        xdm: Ar({
                          mediaCollection: Ar({
                            sessionDetails: Ar(Sr()).required(),
                          }),
                        }),
                        edgeConfigOverrides: _r,
                      }).required(),
                      Ar({
                        xdm: Ar({
                          mediaCollection: Ar({
                            playhead: Or().required(),
                            sessionDetails: Ar(Sr()).required(),
                          }),
                        }),
                        edgeConfigOverrides: _r,
                      }).required(),
                    ],
                    "an object with playerId, getPlayerDetails and xdm.mediaCollection.sessionDetails, or an object with xdm.mediaCollection.playhead and xdm.mediaCollection.sessionDetails"
                  )(e),
                Fg = ({ options: e }) =>
                  Cr(
                    [
                      Ar({
                        playerId: Rr().required(),
                        xdm: Ar({
                          eventType: xr(...Object.values(Ks)).required(),
                          mediaCollection: Ar(Sr()),
                        }).required(),
                      }).required(),
                      Ar({
                        xdm: Ar({
                          eventType: xr(...Object.values(Ks)).required(),
                          mediaCollection: Ar({
                            playhead: Or().integer().required(),
                            sessionID: Rr().required(),
                          }).required(),
                        }).required(),
                      }).required(),
                    ],
                    "Error validating the sendMediaEvent command options."
                  )(e),
                Vg = ({
                  config: e,
                  trackMediaEvent: t,
                  trackMediaSession: n,
                  mediaResponseHandler: r,
                }) => ({
                  lifecycle: {
                    onBeforeEvent({ mediaOptions: e, onResponse: t = nn }) {
                      if (!e) return;
                      const { legacy: n, playerId: o, getPlayerDetails: i } = e;
                      n ||
                        t(({ response: e }) =>
                          r({ playerId: o, getPlayerDetails: i, response: e })
                        );
                    },
                  },
                  commands: {
                    createMediaSession: {
                      optionsValidator: (e) => Bg({ options: e }),
                      run: n,
                    },
                    sendMediaEvent: {
                      optionsValidator: (e) => Fg({ options: e }),
                      run: (n) =>
                        e.streamingMedia
                          ? t(n)
                          : Promise.reject(
                              new Error("Streaming media is not configured.")
                            ),
                    },
                  },
                });
              const Hg = ({
                config: e,
                logger: t,
                eventManager: n,
                sendEdgeNetworkRequest: r,
                consent: o,
              }) => {
                const i = nc(),
                  a = ec({
                    config: e,
                    eventManager: n,
                    consent: o,
                    sendEdgeNetworkRequest: r,
                    setTimestamp: Ti(() => new Date()),
                  }),
                  s = oc({
                    mediaSessionCacheManager: i,
                    mediaEventManager: a,
                    config: e,
                  }),
                  c = ic({
                    config: e,
                    mediaEventManager: a,
                    mediaSessionCacheManager: i,
                  }),
                  l = sc({
                    mediaSessionCacheManager: i,
                    config: e,
                    trackMediaEvent: s,
                  });
                return Vg({
                  config: e,
                  trackMediaEvent: s,
                  mediaResponseHandler: l,
                  trackMediaSession: c,
                });
              };
              (Hg.namespace = "Streaming media"), (Hg.configValidators = qg);
              var zg = Object.freeze({
                __proto__: null,
                activityCollector: xs,
                audiences: js,
                consent: Qs,
                eventMerge: Xs,
                mediaAnalyticsBridge: kc,
                personalization: Tp,
                rulesEngine: Ug,
                streamingMedia: Hg,
              });
              const { console: Gg } = window,
                Jg = Wt(window),
                Wg = (e = {}) => {
                  const t = Ar({
                      name: Rr().default("alloy"),
                      monitors: Ir(Ar({})).default([]),
                      components: Ir(Pr()),
                    }).noUnknownFields(),
                    { name: n, monitors: r, components: o } = t(e),
                    i = jr({
                      console: Gg,
                      locationSearch: window.location.search,
                      createLogger: Do,
                      instanceName: n,
                      createNamespacedStorage: Jg,
                      getMonitors: bi.bind(null, r),
                    }),
                    a = Va({
                      instanceName: n,
                      logController: i,
                      components: o,
                    });
                  return i.logger.logOnInstanceCreated({ instance: a }), a;
                };
              t.createCustomInstance = Wg;
              var Qg = (e) => null == e,
                Yg = (e) => !Qg(e) && !Array.isArray(e) && "object" == typeof e,
                Xg = se(
                  {
                    read: function (e) {
                      return (
                        '"' === e[0] && (e = e.slice(1, -1)),
                        e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
                      );
                    },
                    write: function (e) {
                      return encodeURIComponent(e).replace(
                        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
                        decodeURIComponent
                      );
                    },
                  },
                  { path: "/" }
                );
              Xg.get.bind(Xg),
                Xg.set.bind(Xg),
                Xg.remove.bind(Xg),
                Xg.withConverter.bind(Xg);
              const Kg = (e, t) => {
                Object.keys(t).forEach((n) => {
                  Yg(e[n]) && Yg(t[n]) ? Kg(e[n], t[n]) : (e[n] = t[n]);
                });
              };
              var Zg = (e, ...t) => {
                if (Qg(e))
                  throw new TypeError(
                    'deepAssign "target" cannot be null or undefined'
                  );
                const n = Object(e);
                return t.forEach((e) => Kg(n, Object(e))), n;
              };
              t.deepAssign = Zg;
              const ef = [];
              for (let e = 0; e < 256; ++e)
                ef.push((e + 256).toString(16).slice(1));
              let tf;
              const nf = new Uint8Array(16);
              var rf = {
                  randomUUID:
                    "undefined" != typeof crypto &&
                    crypto.randomUUID &&
                    crypto.randomUUID.bind(crypto),
                },
                of = () => ({ eventMergeId: de() });
              t.createEventMergeId = of;
              var af = (e) => "function" == typeof e,
                sf = (e) => Yg(e) && 0 === Object.keys(e).length,
                cf = (e) => "boolean" == typeof e,
                lf = (e) => "number" == typeof e && !Number.isNaN(e),
                df = (e) => {
                  const t = parseInt(e, 10);
                  return lf(t) && e === t;
                },
                uf = (e) => "string" == typeof e;
              const pf = (e) =>
                  function (t, n) {
                    return null == t ? t : e.call(this, t, n);
                  },
                gf = (e, t) =>
                  function (n, r) {
                    return t.call(this, e.call(this, n, r), r);
                  },
                ff = (e, t) =>
                  function (n, r) {
                    const o = [],
                      i = [e, t].reduce((e, t) => {
                        try {
                          return t.call(this, e, r);
                        } catch (t) {
                          return o.push(t), e;
                        }
                      }, n);
                    if (o.length) throw new Error(o.join("\n"));
                    return i;
                  },
                mf = (e, t, n) => Object.assign(gf(e, t), e, n),
                hf = (e, t, n) => Object.assign(gf(e, pf(t)), e, n),
                yf = (e, t, n) => Object.assign(ff(pf(t), e), e, n),
                vf = (e, t, n, r) => {
                  if (!e)
                    throw new Error(
                      `'${n}': Expected ${r}, but got ${JSON.stringify(t)}.`
                    );
                };
              var bf = (e, t) => (vf(cf(e), e, t, "true or false"), e),
                wf = (e, t) => (vf(af(e), e, t, "a function"), e),
                Ef = (e, t) =>
                  function (n, r) {
                    let o;
                    const i = e.find((e) => {
                      try {
                        return (o = e.call(this, n, r)), !0;
                      } catch {
                        return !1;
                      }
                    });
                    return vf(i, n, r, t), o;
                  },
                kf = (e) =>
                  function (t, n) {
                    vf(Array.isArray(t), t, n, "an array");
                    const r = [],
                      o = t.map((o, i) => {
                        try {
                          return e.call(this, o, `${n}[${i}]`, t);
                        } catch (e) {
                          return void r.push(e.message);
                        }
                      });
                    if (r.length) throw new Error(r.join("\n"));
                    return o;
                  },
                Cf = (e) => (t) => null == t ? e : t,
                Sf = (e = "This field has been deprecated") =>
                  function (t, n) {
                    let r = e;
                    return (
                      void 0 !== t &&
                        (n && (r = `'${n}': ${r}`),
                        this && this.logger && this.logger.warn(r)),
                      t
                    );
                  },
                If = (e) => (t, n) => (vf(t === e, t, n, `${e}`), t),
                Tf = (e) =>
                  function (t, n) {
                    vf(Yg(t), t, n, "an object");
                    const r = [],
                      o = {};
                    if (
                      (Object.keys(t).forEach((i) => {
                        const a = t[i],
                          s = n ? `${n}.${i}` : i;
                        try {
                          const t = e.call(this, a, s);
                          void 0 !== t && (o[i] = t);
                        } catch (e) {
                          r.push(e.message);
                        }
                      }),
                      r.length)
                    )
                      throw new Error(r.join("\n"));
                    return o;
                  },
                Pf = (e, t) => (n, r) => (
                  vf(n >= t, n, r, `${e} greater than or equal to ${t}`), n
                ),
                Df = (e, t) => (n, r) => (
                  vf(n <= t, n, r, `${e} less than or equal to ${t}`), n
                ),
                Of = (e) => (t, n) => {
                  const r = [];
                  if (
                    (Object.keys(t).forEach((t) => {
                      if (!e[t]) {
                        const e = n ? `${n}.${t}` : t;
                        r.push(`'${e}': Unknown field.`);
                      }
                    }),
                    r.length)
                  )
                    throw new Error(r.join("\n"));
                  return t;
                },
                Nf = (e) => (t, n) => (
                  Yg(t) ? vf(!sf(t), t, n, e) : vf(t.length > 0, t, n, e), t
                ),
                Af = (e) =>
                  function (t, n) {
                    vf(Yg(t), t, n, "an object");
                    const r = [],
                      o = {};
                    if (
                      (Object.keys(e).forEach((i) => {
                        const a = t[i],
                          s = e[i],
                          c = n ? `${n}.${i}` : i;
                        try {
                          const e = s.call(this, a, c);
                          void 0 !== e && (o[i] = e);
                        } catch (e) {
                          r.push(e.message);
                        }
                      }),
                      Object.keys(t).forEach((e) => {
                        Object.prototype.hasOwnProperty.call(o, e) ||
                          (o[e] = t[e]);
                      }),
                      r.length)
                    )
                      throw new Error(r.join("\n"));
                    return o;
                  },
                Rf = (e, t, n) =>
                  function (r, o) {
                    vf(Yg(r), r, o, "an object");
                    const { [e]: i, [n]: a, ...s } = r,
                      c = t(i, o);
                    if (void 0 !== c) {
                      let t = `The field '${e}' is deprecated. Use '${n}' instead.`;
                      if ((o && (t = `'${o}': ${t}`), void 0 !== a && a !== c))
                        throw new Error(t);
                      this && this.logger && this.logger.warn(t);
                    }
                    return { [n]: a || c, ...s };
                  },
                xf = () => {
                  const e = [];
                  return (t, n) => (
                    vf(
                      -1 === e.indexOf(t),
                      t,
                      n,
                      "a unique value across instances"
                    ),
                    e.push(t),
                    t
                  );
                },
                Mf = (e) => {
                  const t = Object.create(null);
                  for (let n = 0; n < e.length; n += 1) {
                    const r = e[n];
                    if (r in t) return !1;
                    t[r] = !0;
                  }
                  return !0;
                },
                _f = () => (e, t) => (
                  vf(Mf(e), e, t, "array values to be unique"), e
                );
              const Lf = /^[a-z0-9.-]{1,}$/i;
              var jf = (e, t) => (vf(Lf.test(e), e, t, "a valid domain"), e),
                $f = (e, t) => (vf(df(e), e, t, "an integer"), e),
                Uf = (e, t) => (vf(lf(e), e, t, "a number"), e),
                qf = (e) => {
                  try {
                    return null !== RegExp(e);
                  } catch {
                    return !1;
                  }
                },
                Bf = (e, t) => (vf(qf(e), e, t, "a regular expression"), e),
                Ff = (e, t) => {
                  if (null == e) throw new Error(`'${t}' is a required option`);
                  return e;
                },
                Vf = (e, t) => (vf(uf(e), e, t, "a string"), e),
                Hf = (e) => (t, n) => (
                  vf(e.test(t), t, n, `does not match the ${e.toString()}`), t
                );
              const zf = (e) => e;
              (zf.default = function (e) {
                return mf(this, Cf(e));
              }),
                (zf.required = function () {
                  return mf(this, Ff);
                }),
                (zf.deprecated = function (e) {
                  return mf(this, Sf(e));
                });
              const Gf = function () {
                  return hf(this, jf);
                },
                Jf = function (e) {
                  return hf(this, Pf("an integer", e));
                },
                Wf = function (e) {
                  return hf(this, Pf("a number", e));
                },
                Qf = function (e) {
                  return hf(this, Df("a number", e));
                },
                Yf = function () {
                  return hf(this, $f, { minimum: Jf });
                },
                Xf = function () {
                  return hf(this, Nf("a non-empty string"));
                },
                Kf = function () {
                  return hf(this, Nf("a non-empty array"));
                },
                Zf = function () {
                  return hf(this, Nf("a non-empty object"));
                },
                em = function () {
                  return hf(this, Bf);
                },
                tm = function (e) {
                  return hf(this, Hf(e));
                },
                nm = function () {
                  return hf(this, xf());
                },
                rm = function () {
                  return hf(this, _f());
                },
                om = function (e, t) {
                  return mf(this, Ef(e, t));
                },
                im = function () {
                  return this;
                },
                am = function (e) {
                  return hf(this, kf(e), { nonEmpty: Kf, uniqueItems: rm });
                },
                sm = function () {
                  return hf(this, bf);
                },
                cm = function () {
                  return hf(this, wf);
                },
                lm = function (e) {
                  return hf(this, If(e));
                },
                dm = function () {
                  return hf(this, Uf, {
                    minimum: Wf,
                    maximum: Qf,
                    integer: Yf,
                    unique: nm,
                  });
                },
                um = function (e) {
                  return hf(this, Tf(e), { nonEmpty: Zf });
                },
                pm = (e) => ({
                  noUnknownFields: function () {
                    return hf(this, Of(e));
                  },
                  nonEmpty: Zf,
                  concat: function (t) {
                    const n = { ...e, ...t.schema };
                    return hf(this, t, pm(n));
                  },
                  renamed: function (e, t, n) {
                    return yf(this, Rf(e, t, n));
                  },
                  schema: e,
                }),
                gm = function (e) {
                  return hf(this, Af(e), pm(e));
                },
                fm = function () {
                  return hf(this, Vf, {
                    regexp: em,
                    domain: Gf,
                    nonEmpty: Xf,
                    unique: nm,
                    matches: tm,
                  });
                },
                mm = om.bind(zf);
              im.bind(zf);
              const hm = am.bind(zf),
                ym = sm.bind(zf);
              cm.bind(zf);
              const vm = lm.bind(zf);
              dm.bind(zf);
              const bm = um.bind(zf),
                wm = gm.bind(zf),
                Em = fm.bind(zf);
              bm(
                hm(
                  wm({
                    authenticatedState: (function (...e) {
                      return mm(
                        e.map(vm),
                        `one of these values: ${JSON.stringify(e)}`
                      );
                    })("ambiguous", "authenticated", "loggedOut"),
                    id: Em(),
                    namespace: wm({ code: Em() }).noUnknownFields(),
                    primary: ym(),
                    xid: Em(),
                  }).noUnknownFields()
                ).required()
              ),
                wm({}),
                (t.components = [
                  zg.activityCollector,
                  zg.audiences,
                  zg.consent,
                  zg.mediaAnalyticsBridge,
                  zg.personalization,
                  zg.rulesEngine,
                  zg.streamingMedia,
                ]);
            },
          },
          "adobe-alloy/dist/lib/instanceManager/createInstanceManager.js": {
            script: function (e) {
              "use strict";
              e.exports = ({
                turbine: e,
                window: t,
                createCustomInstance: n,
                components: r,
                createEventMergeId: o,
                orgId: i,
                wrapOnBeforeEventSend: a,
                getConfigOverrides: s,
              }) => {
                const { instances: c } = e.getExtensionSettings(),
                  l = {},
                  d = {};
                return (
                  (t.__alloyMonitors = t.__alloyMonitors || []),
                  t.__alloyMonitors.push({
                    onInstanceCreated: (...e) => {
                      (d.onInstanceCreated ||= []), d.onInstanceCreated.push(e);
                    },
                    onInstanceConfigured: (...e) => {
                      (d.onInstanceConfigured ||= []),
                        d.onInstanceConfigured.push(e);
                    },
                    onBeforeCommand(...e) {
                      const { commandName: t } = e[0];
                      "configure" === t &&
                        ((d.onBeforeCommand ||= []), d.onBeforeCommand.push(e));
                    },
                  }),
                  c.forEach(
                    ({
                      name: o,
                      edgeConfigId: c,
                      stagingEdgeConfigId: d,
                      developmentEdgeConfigId: u,
                      onBeforeEventSend: p,
                      ...g
                    }) => {
                      const f = n({ name: o, components: r });
                      (t[o] = f),
                        t.__alloyNS || (t.__alloyNS = []),
                        t.__alloyNS.push(o),
                        (l[o] = f);
                      const m = e.environment && e.environment.stage,
                        h =
                          ("development" === m && u) ||
                          ("staging" === m && d) ||
                          c;
                      (g.edgeConfigOverrides = s(g)),
                        f("configure", {
                          ...g,
                          datastreamId: h,
                          debugEnabled: e.debugEnabled,
                          orgId: g.orgId || i,
                          onBeforeEventSend: a(p),
                        }),
                        e.onDebugChanged((e) => {
                          f("setDebug", { enabled: e });
                        });
                    }
                  ),
                  {
                    getInstance: (e) => l[e],
                    createEventMergeId: () => o(),
                    addMonitor(e) {
                      t.__alloyMonitors.push(e),
                        Object.keys(d).forEach((t) => {
                          e[t] &&
                            d[t].forEach((n) => {
                              e[t](...n);
                            });
                        });
                    },
                  }
                );
              };
            },
          },
          "adobe-alloy/dist/lib/instanceManager/injectWrapOnBeforeEventSend.js":
            {
              script: function (e) {
                "use strict";
                e.exports =
                  ({ version: e }) =>
                  (t) =>
                  (n) => {
                    if (
                      ((n.xdm.implementationDetails.name = `${n.xdm.implementationDetails.name}/reactor`),
                      (n.xdm.implementationDetails.version = `${n.xdm.implementationDetails.version}+${e}`),
                      t)
                    )
                      return t(n);
                  };
              },
            },
          "adobe-alloy/dist/lib/utils/createGetConfigOverrides.js": {
            script: function (e) {
              "use strict";
              const t = (e) => (t) => {
                var n, r, o, i;
                const { edgeConfigOverrides: a } = t;
                let s;
                if (a) {
                  if (a[e]) s = { ...a[e] };
                  else {
                    if (a.development || a.staging || a.production) return;
                    s = a;
                  }
                  if (0 !== Object.keys(s).length && !1 !== s.enabled) {
                    if (
                      (delete s.enabled,
                      Object.keys(s).forEach((e) => {
                        var t;
                        !0 ===
                          (null === (t = s[e]) || void 0 === t
                            ? void 0
                            : t.enabled) && delete s[e].enabled;
                      }),
                      (null === (n = s.com_adobe_analytics) ||
                      void 0 === n ||
                      null === (n = n.reportSuites) ||
                      void 0 === n
                        ? void 0
                        : n.length) > 0 &&
                        (s.com_adobe_analytics.reportSuites =
                          s.com_adobe_analytics.reportSuites
                            .flatMap((e) =>
                              e.includes(",") ? e.split(/,\s*/gi) : e
                            )
                            .map((e) => e.trim())
                            .filter(Boolean)),
                      void 0 !==
                        (null === (r = s.com_adobe_identity) || void 0 === r
                          ? void 0
                          : r.idSyncContainerId) &&
                        null !==
                          (null === (o = s.com_adobe_identity) || void 0 === o
                            ? void 0
                            : o.idSyncContainerId) &&
                        "string" ==
                          typeof (null === (i = s.com_adobe_identity) ||
                          void 0 === i
                            ? void 0
                            : i.idSyncContainerId))
                    )
                      if ("" === s.com_adobe_identity.idSyncContainerId.trim())
                        delete s.com_adobe_identity.idSyncContainerId;
                      else {
                        const e = parseInt(
                          s.com_adobe_identity.idSyncContainerId.trim(),
                          10
                        );
                        if (Number.isNaN(e))
                          throw new Error(
                            `The ID sync container ID "${s.com_adobe_identity.idSyncContainerId}" is not a valid integer.`
                          );
                        s.com_adobe_identity.idSyncContainerId = e;
                      }
                    return s;
                  }
                }
              };
              e.exports = t;
            },
          },
        },
      },
      core: {
        displayName: "Core",
        hostedLibFilesBaseUrl:
          "https://assets.adobedtm.com/extensions/EP6a6d85ccbeaa4750848f31959dd9eec5/",
        modules: {
          "core/src/lib/dataElements/queryStringParameter.js": {
            name: "query-string-parameter",
            displayName: "Query String Parameter",
            script: function (e, t, n) {
              "use strict";
              var r = n("@adobe/reactor-window"),
                o = n("@adobe/reactor-query-string");
              e.exports = function (e) {
                var t = o.parse(r.location.search);
                if (!e.caseInsensitive) return t[e.name];
                for (
                  var n = e.name.toLowerCase(), i = Object.keys(t), a = 0;
                  a < i.length;
                  a++
                ) {
                  var s = i[a];
                  if (s.toLowerCase() === n) return t[s];
                }
              };
            },
          },
          "core/src/lib/events/libraryLoaded.js": {
            name: "library-loaded",
            displayName: "Library Loaded (Page Top)",
            script: function (e, t, n) {
              "use strict";
              var r = n("./helpers/pageLifecycleEvents");
              e.exports = function (e, t) {
                r.registerLibraryLoadedTrigger(t);
              };
            },
          },
          "core/src/lib/actions/customCode.js": {
            name: "custom-code",
            displayName: "Custom Code",
            script: function (e, t, n, r) {
              "use strict";
              var o,
                i,
                a,
                s,
                c = n("@adobe/reactor-document"),
                l = n("@adobe/reactor-promise"),
                d = n("./helpers/decorateCode"),
                u = n("./helpers/loadCodeSequentially"),
                p = n("../../../node_modules/postscribe/dist/postscribe"),
                g = n("./helpers/unescapeHtmlCode"),
                f = n("../helpers/findPageScript").getTurbine,
                m =
                  ((i = function (e) {
                    p(c.body, e, {
                      beforeWriteToken: function (e) {
                        var t = e.tagName && e.tagName.toLowerCase();
                        return (
                          o && "script" === t && (e.attrs.nonce = o),
                          ("script" !== t && "style" !== t) ||
                            (Object.keys(e.attrs || {}).forEach(function (t) {
                              e.attrs[t] = g(e.attrs[t]);
                            }),
                            e.src && (e.src = g(e.src))),
                          e
                        );
                      },
                      error: function (e) {
                        r.logger.error(e.msg);
                      },
                    });
                  }),
                  (a = []),
                  (s = function () {
                    if (c.body) for (; a.length; ) i(a.shift());
                    else setTimeout(s, 20);
                  }),
                  function (e) {
                    a.push(e), s();
                  }),
                h = (function () {
                  if (c.currentScript) return c.currentScript.async;
                  var e = f();
                  return !e || e.async;
                })();
              e.exports = function (e, t) {
                var n;
                o = r.getExtensionSettings().cspNonce;
                var i = { settings: e, event: t },
                  a = i.settings.source;
                if (a)
                  return i.settings.isExternal
                    ? u(a).then(function (e) {
                        return e
                          ? ((n = d(i, e)), m(n.code), n.promise)
                          : l.resolve();
                      })
                    : ((n = d(i, a)),
                      h || "loading" !== c.readyState
                        ? m(n.code)
                        : c.write &&
                          !1 ===
                            r.propertySettings.ruleComponentSequencingEnabled
                        ? c.write(n.code)
                        : m(n.code),
                      n.promise);
              };
            },
          },
          "core/src/lib/events/pageBottom.js": {
            name: "page-bottom",
            displayName: "Page Bottom",
            script: function (e, t, n) {
              "use strict";
              var r = n("./helpers/pageLifecycleEvents");
              e.exports = function (e, t) {
                r.registerPageBottomTrigger(t);
              };
            },
          },
          "core/src/lib/conditions/path.js": {
            name: "path",
            displayName: "Path Without Query String",
            script: function (e, t, n) {
              "use strict";
              var r = n("@adobe/reactor-document"),
                o = n("../helpers/textMatch");
              e.exports = function (e) {
                var t = r.location.pathname;
                return e.paths.some(function (e) {
                  var n = e.valueIsRegex ? new RegExp(e.value, "i") : e.value;
                  return o(t, n);
                });
              };
            },
          },
          "core/src/lib/events/helpers/pageLifecycleEvents.js": {
            script: function (e, t, n) {
              "use strict";
              var r = n("@adobe/reactor-window"),
                o = n("@adobe/reactor-document"),
                i = -1 !== r.navigator.appVersion.indexOf("MSIE 10"),
                a = "WINDOW_LOADED",
                s = "DOM_READY",
                c = "PAGE_BOTTOM",
                l = [c, s, a],
                d = function (e, t) {
                  return { element: e, target: e, nativeEvent: t };
                },
                u = {};
              l.forEach(function (e) {
                u[e] = [];
              });
              var p = function (e, t) {
                  l.slice(0, f(e) + 1).forEach(function (e) {
                    m(t, e);
                  });
                },
                g = function () {
                  return "complete" === o.readyState
                    ? a
                    : "interactive" === o.readyState
                    ? i
                      ? null
                      : s
                    : void 0;
                },
                f = function (e) {
                  return l.indexOf(e);
                },
                m = function (e, t) {
                  u[t].forEach(function (t) {
                    h(e, t);
                  }),
                    (u[t] = []);
                },
                h = function (e, t) {
                  var n = t.trigger,
                    r = t.syntheticEventFn;
                  n(r ? r(e) : null);
                };
              (r._satellite = r._satellite || {}),
                (r._satellite.pageBottom = p.bind(null, c)),
                o.addEventListener("DOMContentLoaded", p.bind(null, s), !0),
                r.addEventListener("load", p.bind(null, a), !0),
                r.setTimeout(function () {
                  var e = g();
                  e && p(e);
                }, 0),
                (e.exports = {
                  registerLibraryLoadedTrigger: function (e) {
                    e();
                  },
                  registerPageBottomTrigger: function (e) {
                    u[c].push({ trigger: e });
                  },
                  registerDomReadyTrigger: function (e) {
                    u[s].push({
                      trigger: e,
                      syntheticEventFn: d.bind(null, o),
                    });
                  },
                  registerWindowLoadedTrigger: function (e) {
                    u[a].push({
                      trigger: e,
                      syntheticEventFn: d.bind(null, r),
                    });
                  },
                });
            },
          },
          "core/src/lib/actions/helpers/decorateCode.js": {
            script: function (e, t, n) {
              "use strict";
              var r = n("./decorators/decorateGlobalJavaScriptCode"),
                o = n("./decorators/decorateNonGlobalJavaScriptCode"),
                i = {
                  javascript: function (e, t) {
                    return e.settings.global ? r(e, t) : o(e, t);
                  },
                  html: n("./decorators/decorateHtmlCode"),
                };
              e.exports = function (e, t) {
                return i[e.settings.language](e, t);
              };
            },
          },
          "core/src/lib/actions/helpers/loadCodeSequentially.js": {
            script: function (e, t, n) {
              "use strict";
              var r = n("@adobe/reactor-promise"),
                o = n("./getSourceByUrl"),
                i = r.resolve();
              e.exports = function (e) {
                var t = new r(function (t) {
                  var n = o(e);
                  r.all([n, i]).then(function (e) {
                    var n = e[0];
                    t(n);
                  });
                });
                return (i = t), t;
              };
            },
          },
          "core/node_modules/postscribe/dist/postscribe.js": {
            script: function (e, t) {
              var n, r;
              (n = this),
                (r = function () {
                  return (function (e) {
                    function t(r) {
                      if (n[r]) return n[r].exports;
                      var o = (n[r] = { exports: {}, id: r, loaded: !1 });
                      return (
                        e[r].call(o.exports, o, o.exports, t),
                        (o.loaded = !0),
                        o.exports
                      );
                    }
                    var n = {};
                    return (t.m = e), (t.c = n), (t.p = ""), t(0);
                  })([
                    function (e, t, n) {
                      "use strict";
                      function r(e) {
                        return e && e.__esModule ? e : { default: e };
                      }
                      var o = r(n(1));
                      e.exports = o.default;
                    },
                    function (e, t, n) {
                      "use strict";
                      function r(e) {
                        if (e && e.__esModule) return e;
                        var t = {};
                        if (null != e)
                          for (var n in e)
                            Object.prototype.hasOwnProperty.call(e, n) &&
                              (t[n] = e[n]);
                        return (t.default = e), t;
                      }
                      function o(e) {
                        return e && e.__esModule ? e : { default: e };
                      }
                      function i() {}
                      function a() {
                        var e = f.shift();
                        if (e) {
                          var t = u.last(e);
                          t.afterDequeue(),
                            (e.stream = s.apply(void 0, e)),
                            t.afterStreamStart();
                        }
                      }
                      function s(e, t, n) {
                        function r(e) {
                          (e = n.beforeWrite(e)), m.write(e), n.afterWrite(e);
                        }
                        ((m = new d.default(e, n)).id = g++),
                          (m.name = n.name || m.id),
                          (c.streams[m.name] = m);
                        var o = e.ownerDocument,
                          s = {
                            close: o.close,
                            open: o.open,
                            write: o.write,
                            writeln: o.writeln,
                          };
                        l(o, {
                          close: i,
                          open: i,
                          write: function () {
                            for (
                              var e = arguments.length, t = Array(e), n = 0;
                              n < e;
                              n++
                            )
                              t[n] = arguments[n];
                            return r(t.join(""));
                          },
                          writeln: function () {
                            for (
                              var e = arguments.length, t = Array(e), n = 0;
                              n < e;
                              n++
                            )
                              t[n] = arguments[n];
                            return r(t.join("") + "\n");
                          },
                        });
                        var u = m.win.onerror || i;
                        return (
                          (m.win.onerror = function (e, t, r) {
                            n.error({ msg: e + " - " + t + ": " + r }),
                              u.apply(m.win, [e, t, r]);
                          }),
                          m.write(t, function () {
                            l(o, s),
                              (m.win.onerror = u),
                              n.done(),
                              (m = null),
                              a();
                          }),
                          m
                        );
                      }
                      function c(e, t, n) {
                        if (u.isFunction(n)) n = { done: n };
                        else if ("clear" === n)
                          return (f = []), (m = null), void (g = 0);
                        n = u.defaults(n, p);
                        var r = [
                          (e = /^#/.test(e)
                            ? window.document.getElementById(e.substr(1))
                            : e.jquery
                            ? e[0]
                            : e),
                          t,
                          n,
                        ];
                        return (
                          (e.postscribe = {
                            cancel: function () {
                              r.stream ? r.stream.abort() : (r[1] = i);
                            },
                          }),
                          n.beforeEnqueue(r),
                          f.push(r),
                          m || a(),
                          e.postscribe
                        );
                      }
                      t.__esModule = !0;
                      var l =
                        Object.assign ||
                        function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var r in n)
                              Object.prototype.hasOwnProperty.call(n, r) &&
                                (e[r] = n[r]);
                          }
                          return e;
                        };
                      t.default = c;
                      var d = o(n(2)),
                        u = r(n(4)),
                        p = {
                          afterAsync: i,
                          afterDequeue: i,
                          afterStreamStart: i,
                          afterWrite: i,
                          autoFix: !0,
                          beforeEnqueue: i,
                          beforeWriteToken: function (e) {
                            return e;
                          },
                          beforeWrite: function (e) {
                            return e;
                          },
                          done: i,
                          error: function (e) {
                            throw new Error(e.msg);
                          },
                          releaseAsync: !1,
                        },
                        g = 0,
                        f = [],
                        m = null;
                      l(c, { streams: {}, queue: f, WriteStream: d.default });
                    },
                    function (e, t, n) {
                      "use strict";
                      function r(e) {
                        if (e && e.__esModule) return e;
                        var t = {};
                        if (null != e)
                          for (var n in e)
                            Object.prototype.hasOwnProperty.call(e, n) &&
                              (t[n] = e[n]);
                        return (t.default = e), t;
                      }
                      function o(e) {
                        return e && e.__esModule ? e : { default: e };
                      }
                      function i(e, t) {
                        if (!(e instanceof t))
                          throw new TypeError(
                            "Cannot call a class as a function"
                          );
                      }
                      function a(e, t) {
                        var n = p + t,
                          r = e.getAttribute(n);
                        return d.existy(r) ? String(r) : r;
                      }
                      function s(e, t) {
                        var n =
                            arguments.length > 2 && void 0 !== arguments[2]
                              ? arguments[2]
                              : null,
                          r = p + t;
                        d.existy(n) && "" !== n
                          ? e.setAttribute(r, n)
                          : e.removeAttribute(r);
                      }
                      t.__esModule = !0;
                      var c =
                          Object.assign ||
                          function (e) {
                            for (var t = 1; t < arguments.length; t++) {
                              var n = arguments[t];
                              for (var r in n)
                                Object.prototype.hasOwnProperty.call(n, r) &&
                                  (e[r] = n[r]);
                            }
                            return e;
                          },
                        l = o(n(3)),
                        d = r(n(4)),
                        u = !1,
                        p = "data-ps-",
                        g = "ps-style",
                        f = "ps-script",
                        m = (function () {
                          function e(t) {
                            var n =
                              arguments.length > 1 && void 0 !== arguments[1]
                                ? arguments[1]
                                : {};
                            i(this, e),
                              (this.root = t),
                              (this.options = n),
                              (this.doc = t.ownerDocument),
                              (this.win =
                                this.doc.defaultView || this.doc.parentWindow),
                              (this.parser = new l.default("", {
                                autoFix: n.autoFix,
                              })),
                              (this.actuals = [t]),
                              (this.proxyHistory = ""),
                              (this.proxyRoot = this.doc.createElement(
                                t.nodeName
                              )),
                              (this.scriptStack = []),
                              (this.writeQueue = []),
                              s(this.proxyRoot, "proxyof", 0);
                          }
                          return (
                            (e.prototype.write = function () {
                              var e;
                              for (
                                (e = this.writeQueue).push.apply(e, arguments);
                                !this.deferredRemote && this.writeQueue.length;

                              ) {
                                var t = this.writeQueue.shift();
                                d.isFunction(t)
                                  ? this._callFunction(t)
                                  : this._writeImpl(t);
                              }
                            }),
                            (e.prototype._callFunction = function (e) {
                              var t = {
                                type: "function",
                                value: e.name || e.toString(),
                              };
                              this._onScriptStart(t),
                                e.call(this.win, this.doc),
                                this._onScriptDone(t);
                            }),
                            (e.prototype._writeImpl = function (e) {
                              this.parser.append(e);
                              for (
                                var t = void 0, n = void 0, r = void 0, o = [];
                                (t = this.parser.readToken()) &&
                                !(n = d.isScript(t)) &&
                                !(r = d.isStyle(t));

                              )
                                (t = this.options.beforeWriteToken(t)) &&
                                  o.push(t);
                              o.length > 0 && this._writeStaticTokens(o),
                                n && this._handleScriptToken(t),
                                r && this._handleStyleToken(t);
                            }),
                            (e.prototype._writeStaticTokens = function (e) {
                              var t = this._buildChunk(e);
                              return t.actual
                                ? ((t.html = this.proxyHistory + t.actual),
                                  (this.proxyHistory += t.proxy),
                                  (this.proxyRoot.innerHTML = t.html),
                                  u &&
                                    (t.proxyInnerHTML =
                                      this.proxyRoot.innerHTML),
                                  this._walkChunk(),
                                  u &&
                                    (t.actualInnerHTML = this.root.innerHTML),
                                  t)
                                : null;
                            }),
                            (e.prototype._buildChunk = function (e) {
                              for (
                                var t = this.actuals.length,
                                  n = [],
                                  r = [],
                                  o = [],
                                  i = e.length,
                                  a = 0;
                                a < i;
                                a++
                              ) {
                                var s = e[a],
                                  c = s.toString();
                                if ((n.push(c), s.attrs)) {
                                  if (!/^noscript$/i.test(s.tagName)) {
                                    var l = t++;
                                    r.push(
                                      c.replace(
                                        /(\/?>)/,
                                        " " + p + "id=" + l + " $1"
                                      )
                                    ),
                                      s.attrs.id !== f &&
                                        s.attrs.id !== g &&
                                        o.push(
                                          "atomicTag" === s.type
                                            ? ""
                                            : "<" +
                                                s.tagName +
                                                " " +
                                                p +
                                                "proxyof=" +
                                                l +
                                                (s.unary ? " />" : ">")
                                        );
                                  }
                                } else
                                  r.push(c),
                                    o.push("endTag" === s.type ? c : "");
                              }
                              return {
                                tokens: e,
                                raw: n.join(""),
                                actual: r.join(""),
                                proxy: o.join(""),
                              };
                            }),
                            (e.prototype._walkChunk = function () {
                              for (
                                var e = void 0, t = [this.proxyRoot];
                                d.existy((e = t.shift()));

                              ) {
                                var n = 1 === e.nodeType;
                                if (!n || !a(e, "proxyof")) {
                                  n &&
                                    ((this.actuals[a(e, "id")] = e),
                                    s(e, "id"));
                                  var r =
                                    e.parentNode && a(e.parentNode, "proxyof");
                                  r && this.actuals[r].appendChild(e);
                                }
                                t.unshift.apply(t, d.toArray(e.childNodes));
                              }
                            }),
                            (e.prototype._handleScriptToken = function (e) {
                              var t = this,
                                n = this.parser.clear();
                              n && this.writeQueue.unshift(n),
                                (e.src = e.attrs.src || e.attrs.SRC),
                                (e = this.options.beforeWriteToken(e)) &&
                                  (e.src && this.scriptStack.length
                                    ? (this.deferredRemote = e)
                                    : this._onScriptStart(e),
                                  this._writeScriptToken(e, function () {
                                    t._onScriptDone(e);
                                  }));
                            }),
                            (e.prototype._handleStyleToken = function (e) {
                              var t = this.parser.clear();
                              t && this.writeQueue.unshift(t),
                                (e.type =
                                  e.attrs.type || e.attrs.TYPE || "text/css"),
                                (e = this.options.beforeWriteToken(e)) &&
                                  this._writeStyleToken(e),
                                t && this.write();
                            }),
                            (e.prototype._writeStyleToken = function (e) {
                              var t = this._buildStyle(e);
                              this._insertCursor(t, g),
                                e.content &&
                                  (t.styleSheet && !t.sheet
                                    ? (t.styleSheet.cssText = e.content)
                                    : t.appendChild(
                                        this.doc.createTextNode(e.content)
                                      ));
                            }),
                            (e.prototype._buildStyle = function (e) {
                              var t = this.doc.createElement(e.tagName);
                              return (
                                t.setAttribute("type", e.type),
                                d.eachKey(e.attrs, function (e, n) {
                                  t.setAttribute(e, n);
                                }),
                                t
                              );
                            }),
                            (e.prototype._insertCursor = function (e, t) {
                              this._writeImpl('<span id="' + t + '"/>');
                              var n = this.doc.getElementById(t);
                              n && n.parentNode.replaceChild(e, n);
                            }),
                            (e.prototype._onScriptStart = function (e) {
                              (e.outerWrites = this.writeQueue),
                                (this.writeQueue = []),
                                this.scriptStack.unshift(e);
                            }),
                            (e.prototype._onScriptDone = function (e) {
                              e === this.scriptStack[0]
                                ? (this.scriptStack.shift(),
                                  this.write.apply(this, e.outerWrites),
                                  !this.scriptStack.length &&
                                    this.deferredRemote &&
                                    (this._onScriptStart(this.deferredRemote),
                                    (this.deferredRemote = null)))
                                : this.options.error({
                                    msg: "Bad script nesting or script finished twice",
                                  });
                            }),
                            (e.prototype._writeScriptToken = function (e, t) {
                              var n = this._buildScript(e),
                                r = this._shouldRelease(n),
                                o = this.options.afterAsync;
                              e.src &&
                                ((n.src = e.src),
                                this._scriptLoadHandler(
                                  n,
                                  r
                                    ? o
                                    : function () {
                                        t(), o();
                                      }
                                ));
                              try {
                                this._insertCursor(n, f), (n.src && !r) || t();
                              } catch (e) {
                                this.options.error(e), t();
                              }
                            }),
                            (e.prototype._buildScript = function (e) {
                              var t = this.doc.createElement(e.tagName);
                              return (
                                d.eachKey(e.attrs, function (e, n) {
                                  t.setAttribute(e, n);
                                }),
                                e.content && (t.text = e.content),
                                t
                              );
                            }),
                            (e.prototype._scriptLoadHandler = function (e, t) {
                              function n() {
                                e =
                                  e.onload =
                                  e.onreadystatechange =
                                  e.onerror =
                                    null;
                              }
                              function r() {
                                n(), null != t && t(), (t = null);
                              }
                              function o(e) {
                                n(), a(e), null != t && t(), (t = null);
                              }
                              function i(e, t) {
                                var n = e["on" + t];
                                null != n && (e["_on" + t] = n);
                              }
                              var a = this.options.error;
                              i(e, "load"),
                                i(e, "error"),
                                c(e, {
                                  onload: function () {
                                    if (e._onload)
                                      try {
                                        e._onload.apply(
                                          this,
                                          Array.prototype.slice.call(
                                            arguments,
                                            0
                                          )
                                        );
                                      } catch (t) {
                                        o({
                                          msg:
                                            "onload handler failed " +
                                            t +
                                            " @ " +
                                            e.src,
                                        });
                                      }
                                    r();
                                  },
                                  onerror: function () {
                                    if (e._onerror)
                                      try {
                                        e._onerror.apply(
                                          this,
                                          Array.prototype.slice.call(
                                            arguments,
                                            0
                                          )
                                        );
                                      } catch (t) {
                                        return void o({
                                          msg:
                                            "onerror handler failed " +
                                            t +
                                            " @ " +
                                            e.src,
                                        });
                                      }
                                    o({ msg: "remote script failed " + e.src });
                                  },
                                  onreadystatechange: function () {
                                    /^(loaded|complete)$/.test(e.readyState) &&
                                      r();
                                  },
                                });
                            }),
                            (e.prototype._shouldRelease = function (e) {
                              return (
                                !/^script$/i.test(e.nodeName) ||
                                !!(
                                  this.options.releaseAsync &&
                                  e.src &&
                                  e.hasAttribute("async")
                                )
                              );
                            }),
                            e
                          );
                        })();
                      t.default = m;
                    },
                    function (e) {
                      var t;
                      (t = function () {
                        return (function (e) {
                          function t(r) {
                            if (n[r]) return n[r].exports;
                            var o = (n[r] = { exports: {}, id: r, loaded: !1 });
                            return (
                              e[r].call(o.exports, o, o.exports, t),
                              (o.loaded = !0),
                              o.exports
                            );
                          }
                          var n = {};
                          return (t.m = e), (t.c = n), (t.p = ""), t(0);
                        })([
                          function (e, t, n) {
                            "use strict";
                            function r(e) {
                              return e && e.__esModule ? e : { default: e };
                            }
                            var o = r(n(1));
                            e.exports = o.default;
                          },
                          function (e, t, n) {
                            "use strict";
                            function r(e) {
                              return e && e.__esModule ? e : { default: e };
                            }
                            function o(e) {
                              if (e && e.__esModule) return e;
                              var t = {};
                              if (null != e)
                                for (var n in e)
                                  Object.prototype.hasOwnProperty.call(e, n) &&
                                    (t[n] = e[n]);
                              return (t.default = e), t;
                            }
                            function i(e, t) {
                              if (!(e instanceof t))
                                throw new TypeError(
                                  "Cannot call a class as a function"
                                );
                            }
                            t.__esModule = !0;
                            var a = o(n(2)),
                              s = o(n(3)),
                              c = r(n(6)),
                              l = n(5),
                              d = {
                                comment: /^<!--/,
                                endTag: /^<\//,
                                atomicTag:
                                  /^<\s*(script|style|noscript|iframe|textarea)[\s\/>]/i,
                                startTag: /^</,
                                chars: /^[^<]/,
                              },
                              u = (function () {
                                function e() {
                                  var t = this,
                                    n =
                                      arguments.length > 0 &&
                                      void 0 !== arguments[0]
                                        ? arguments[0]
                                        : "",
                                    r =
                                      arguments.length > 1 &&
                                      void 0 !== arguments[1]
                                        ? arguments[1]
                                        : {};
                                  i(this, e), (this.stream = n);
                                  var o = !1,
                                    s = {};
                                  for (var l in a)
                                    a.hasOwnProperty(l) &&
                                      (r.autoFix && (s[l + "Fix"] = !0),
                                      (o = o || s[l + "Fix"]));
                                  o
                                    ? ((this._readToken = (0, c.default)(
                                        this,
                                        s,
                                        function () {
                                          return t._readTokenImpl();
                                        }
                                      )),
                                      (this._peekToken = (0, c.default)(
                                        this,
                                        s,
                                        function () {
                                          return t._peekTokenImpl();
                                        }
                                      )))
                                    : ((this._readToken = this._readTokenImpl),
                                      (this._peekToken = this._peekTokenImpl));
                                }
                                return (
                                  (e.prototype.append = function (e) {
                                    this.stream += e;
                                  }),
                                  (e.prototype.prepend = function (e) {
                                    this.stream = e + this.stream;
                                  }),
                                  (e.prototype._readTokenImpl = function () {
                                    var e = this._peekTokenImpl();
                                    if (e)
                                      return (
                                        (this.stream = this.stream.slice(
                                          e.length
                                        )),
                                        e
                                      );
                                  }),
                                  (e.prototype._peekTokenImpl = function () {
                                    for (var e in d)
                                      if (
                                        d.hasOwnProperty(e) &&
                                        d[e].test(this.stream)
                                      ) {
                                        var t = s[e](this.stream);
                                        if (t)
                                          return "startTag" === t.type &&
                                            /script|style/i.test(t.tagName)
                                            ? null
                                            : ((t.text = this.stream.substr(
                                                0,
                                                t.length
                                              )),
                                              t);
                                      }
                                  }),
                                  (e.prototype.peekToken = function () {
                                    return this._peekToken();
                                  }),
                                  (e.prototype.readToken = function () {
                                    return this._readToken();
                                  }),
                                  (e.prototype.readTokens = function (e) {
                                    for (
                                      var t = void 0;
                                      (t = this.readToken());

                                    )
                                      if (e[t.type] && !1 === e[t.type](t))
                                        return;
                                  }),
                                  (e.prototype.clear = function () {
                                    var e = this.stream;
                                    return (this.stream = ""), e;
                                  }),
                                  (e.prototype.rest = function () {
                                    return this.stream;
                                  }),
                                  e
                                );
                              })();
                            for (var p in ((t.default = u),
                            (u.tokenToString = function (e) {
                              return e.toString();
                            }),
                            (u.escapeAttributes = function (e) {
                              var t = {};
                              for (var n in e)
                                e.hasOwnProperty(n) &&
                                  (t[n] = (0, l.escapeQuotes)(e[n], null));
                              return t;
                            }),
                            (u.supports = a),
                            a))
                              a.hasOwnProperty(p) &&
                                (u.browserHasFlaw =
                                  u.browserHasFlaw || (!a[p] && p));
                          },
                          function (e, t) {
                            "use strict";
                            t.__esModule = !0;
                            var n = !1,
                              r = !1,
                              o = window.document.createElement("div");
                            try {
                              var i = "<P><I></P></I>";
                              (o.innerHTML = i),
                                (t.tagSoup = n = o.innerHTML !== i);
                            } catch (e) {
                              t.tagSoup = n = !1;
                            }
                            try {
                              (o.innerHTML = "<P><i><P></P></i></P>"),
                                (t.selfClose = r = 2 === o.childNodes.length);
                            } catch (e) {
                              t.selfClose = r = !1;
                            }
                            (o = null), (t.tagSoup = n), (t.selfClose = r);
                          },
                          function (e, t, n) {
                            "use strict";
                            function r(e) {
                              var t = e.indexOf("-->");
                              if (t >= 0)
                                return new l.CommentToken(
                                  e.substr(4, t - 1),
                                  t + 3
                                );
                            }
                            function o(e) {
                              var t = e.indexOf("<");
                              return new l.CharsToken(t >= 0 ? t : e.length);
                            }
                            function i(e) {
                              var t, n, r;
                              if (-1 !== e.indexOf(">")) {
                                var o = e.match(d.startTag);
                                if (o) {
                                  var i =
                                    ((t = {}),
                                    (n = {}),
                                    (r = o[2]),
                                    o[2].replace(d.attr, function (e, o) {
                                      arguments[2] ||
                                      arguments[3] ||
                                      arguments[4] ||
                                      arguments[5]
                                        ? arguments[5]
                                          ? ((t[arguments[5]] = ""),
                                            (n[arguments[5]] = !0))
                                          : (t[o] =
                                              arguments[2] ||
                                              arguments[3] ||
                                              arguments[4] ||
                                              (d.fillAttr.test(o) && o) ||
                                              "")
                                        : (t[o] = ""),
                                        (r = r.replace(e, ""));
                                    }),
                                    {
                                      v: new l.StartTagToken(
                                        o[1],
                                        o[0].length,
                                        t,
                                        n,
                                        !!o[3],
                                        r.replace(
                                          /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                                          ""
                                        )
                                      ),
                                    });
                                  if (
                                    "object" ===
                                    (void 0 === i ? "undefined" : c(i))
                                  )
                                    return i.v;
                                }
                              }
                            }
                            function a(e) {
                              var t = i(e);
                              if (t) {
                                var n = e.slice(t.length);
                                if (
                                  n.match(
                                    new RegExp(
                                      "</\\s*" + t.tagName + "\\s*>",
                                      "i"
                                    )
                                  )
                                ) {
                                  var r = n.match(
                                    new RegExp(
                                      "([\\s\\S]*?)</\\s*" +
                                        t.tagName +
                                        "\\s*>",
                                      "i"
                                    )
                                  );
                                  if (r)
                                    return new l.AtomicTagToken(
                                      t.tagName,
                                      r[0].length + t.length,
                                      t.attrs,
                                      t.booleanAttrs,
                                      r[1]
                                    );
                                }
                              }
                            }
                            function s(e) {
                              var t = e.match(d.endTag);
                              if (t)
                                return new l.EndTagToken(t[1], t[0].length);
                            }
                            t.__esModule = !0;
                            var c =
                              "function" == typeof Symbol &&
                              "symbol" == typeof Symbol.iterator
                                ? function (e) {
                                    return typeof e;
                                  }
                                : function (e) {
                                    return e &&
                                      "function" == typeof Symbol &&
                                      e.constructor === Symbol &&
                                      e !== Symbol.prototype
                                      ? "symbol"
                                      : typeof e;
                                  };
                            (t.comment = r),
                              (t.chars = o),
                              (t.startTag = i),
                              (t.atomicTag = a),
                              (t.endTag = s);
                            var l = n(4),
                              d = {
                                startTag:
                                  /^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=?\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
                                endTag: /^<\/([\-A-Za-z0-9_]+)[^>]*>/,
                                attr: /(?:([\-A-Za-z0-9_]+)\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))|(?:([\-A-Za-z0-9_]+)(\s|$)+)/g,
                                fillAttr:
                                  /^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i,
                              };
                          },
                          function (e, t, n) {
                            "use strict";
                            function r(e, t) {
                              if (!(e instanceof t))
                                throw new TypeError(
                                  "Cannot call a class as a function"
                                );
                            }
                            (t.__esModule = !0),
                              (t.EndTagToken =
                                t.AtomicTagToken =
                                t.StartTagToken =
                                t.TagToken =
                                t.CharsToken =
                                t.CommentToken =
                                t.Token =
                                  void 0);
                            var o = n(5),
                              i =
                                ((t.Token = function e(t, n) {
                                  r(this, e),
                                    (this.type = t),
                                    (this.length = n),
                                    (this.text = "");
                                }),
                                (t.CommentToken = (function () {
                                  function e(t, n) {
                                    r(this, e),
                                      (this.type = "comment"),
                                      (this.length = n || (t ? t.length : 0)),
                                      (this.text = ""),
                                      (this.content = t);
                                  }
                                  return (
                                    (e.prototype.toString = function () {
                                      return "<!--" + this.content;
                                    }),
                                    e
                                  );
                                })()),
                                (t.CharsToken = (function () {
                                  function e(t) {
                                    r(this, e),
                                      (this.type = "chars"),
                                      (this.length = t),
                                      (this.text = "");
                                  }
                                  return (
                                    (e.prototype.toString = function () {
                                      return this.text;
                                    }),
                                    e
                                  );
                                })()),
                                (t.TagToken = (function () {
                                  function e(t, n, o, i, a) {
                                    r(this, e),
                                      (this.type = t),
                                      (this.length = o),
                                      (this.text = ""),
                                      (this.tagName = n),
                                      (this.attrs = i),
                                      (this.booleanAttrs = a),
                                      (this.unary = !1),
                                      (this.html5Unary = !1);
                                  }
                                  return (
                                    (e.formatTag = function (e) {
                                      var t =
                                          arguments.length > 1 &&
                                          void 0 !== arguments[1]
                                            ? arguments[1]
                                            : null,
                                        n = "<" + e.tagName;
                                      for (var r in e.attrs)
                                        if (e.attrs.hasOwnProperty(r)) {
                                          n += " " + r;
                                          var i = e.attrs[r];
                                          (void 0 !== e.booleanAttrs &&
                                            void 0 !== e.booleanAttrs[r]) ||
                                            (n +=
                                              '="' +
                                              (0, o.escapeQuotes)(i) +
                                              '"');
                                        }
                                      return (
                                        e.rest && (n += " " + e.rest),
                                        e.unary && !e.html5Unary
                                          ? (n += "/>")
                                          : (n += ">"),
                                        null != t &&
                                          (n += t + "</" + e.tagName + ">"),
                                        n
                                      );
                                    }),
                                    e
                                  );
                                })()));
                            (t.StartTagToken = (function () {
                              function e(t, n, o, i, a, s) {
                                r(this, e),
                                  (this.type = "startTag"),
                                  (this.length = n),
                                  (this.text = ""),
                                  (this.tagName = t),
                                  (this.attrs = o),
                                  (this.booleanAttrs = i),
                                  (this.html5Unary = !1),
                                  (this.unary = a),
                                  (this.rest = s);
                              }
                              return (
                                (e.prototype.toString = function () {
                                  return i.formatTag(this);
                                }),
                                e
                              );
                            })()),
                              (t.AtomicTagToken = (function () {
                                function e(t, n, o, i, a) {
                                  r(this, e),
                                    (this.type = "atomicTag"),
                                    (this.length = n),
                                    (this.text = ""),
                                    (this.tagName = t),
                                    (this.attrs = o),
                                    (this.booleanAttrs = i),
                                    (this.unary = !1),
                                    (this.html5Unary = !1),
                                    (this.content = a);
                                }
                                return (
                                  (e.prototype.toString = function () {
                                    return i.formatTag(this, this.content);
                                  }),
                                  e
                                );
                              })()),
                              (t.EndTagToken = (function () {
                                function e(t, n) {
                                  r(this, e),
                                    (this.type = "endTag"),
                                    (this.length = n),
                                    (this.text = ""),
                                    (this.tagName = t);
                                }
                                return (
                                  (e.prototype.toString = function () {
                                    return "</" + this.tagName + ">";
                                  }),
                                  e
                                );
                              })());
                          },
                          function (e, t) {
                            "use strict";
                            function n(e) {
                              var t =
                                arguments.length > 1 && void 0 !== arguments[1]
                                  ? arguments[1]
                                  : "";
                              return e
                                ? e.replace(/([^"]*)"/g, function (e, t) {
                                    return /\\/.test(t) ? t + '"' : t + '\\"';
                                  })
                                : t;
                            }
                            (t.__esModule = !0), (t.escapeQuotes = n);
                          },
                          function (e, t) {
                            "use strict";
                            function n(e) {
                              return (
                                e &&
                                  "startTag" === e.type &&
                                  ((e.unary = s.test(e.tagName) || e.unary),
                                  (e.html5Unary = !/\/>$/.test(e.text))),
                                e
                              );
                            }
                            function r(e, t) {
                              var r = e.stream,
                                o = n(t());
                              return (e.stream = r), o;
                            }
                            function o(e, t) {
                              var n = t.pop();
                              e.prepend("</" + n.tagName + ">");
                            }
                            function i() {
                              var e = [];
                              return (
                                (e.last = function () {
                                  return this[this.length - 1];
                                }),
                                (e.lastTagNameEq = function (e) {
                                  var t = this.last();
                                  return (
                                    t &&
                                    t.tagName &&
                                    t.tagName.toUpperCase() === e.toUpperCase()
                                  );
                                }),
                                (e.containsTagName = function (e) {
                                  for (var t, n = 0; (t = this[n]); n++)
                                    if (t.tagName === e) return !0;
                                  return !1;
                                }),
                                e
                              );
                            }
                            function a(e, t, a) {
                              function s() {
                                var t = r(e, a);
                                t && d[t.type] && d[t.type](t);
                              }
                              var l = i(),
                                d = {
                                  startTag: function (n) {
                                    var r = n.tagName;
                                    "TR" === r.toUpperCase() &&
                                    l.lastTagNameEq("TABLE")
                                      ? (e.prepend("<TBODY>"), s())
                                      : t.selfCloseFix &&
                                        c.test(r) &&
                                        l.containsTagName(r)
                                      ? l.lastTagNameEq(r)
                                        ? o(e, l)
                                        : (e.prepend("</" + n.tagName + ">"),
                                          s())
                                      : n.unary || l.push(n);
                                  },
                                  endTag: function (n) {
                                    l.last()
                                      ? t.tagSoupFix &&
                                        !l.lastTagNameEq(n.tagName)
                                        ? o(e, l)
                                        : l.pop()
                                      : t.tagSoupFix && (a(), s());
                                  },
                                };
                              return function () {
                                return s(), n(a());
                              };
                            }
                            (t.__esModule = !0), (t.default = a);
                            var s =
                                /^(AREA|BASE|BASEFONT|BR|COL|FRAME|HR|IMG|INPUT|ISINDEX|LINK|META|PARAM|EMBED)$/i,
                              c =
                                /^(COLGROUP|DD|DT|LI|OPTIONS|P|TD|TFOOT|TH|THEAD|TR)$/i;
                          },
                        ]);
                      }),
                        (e.exports = t());
                    },
                    function (e, t) {
                      "use strict";
                      function n(e) {
                        return null != e;
                      }
                      function r(e) {
                        return "function" == typeof e;
                      }
                      function o(e, t, n) {
                        var r = void 0,
                          o = (e && e.length) || 0;
                        for (r = 0; r < o; r++) t.call(n, e[r], r);
                      }
                      function i(e, t, n) {
                        for (var r in e)
                          e.hasOwnProperty(r) && t.call(n, r, e[r]);
                      }
                      function a(e, t) {
                        return (
                          (e = e || {}),
                          i(t, function (t, r) {
                            n(e[t]) || (e[t] = r);
                          }),
                          e
                        );
                      }
                      function s(e) {
                        try {
                          return Array.prototype.slice.call(e);
                        } catch (r) {
                          var t =
                            ((n = []),
                            o(e, function (e) {
                              n.push(e);
                            }),
                            { v: n });
                          if ("object" === (void 0 === t ? "undefined" : p(t)))
                            return t.v;
                        }
                        var n;
                      }
                      function c(e) {
                        return e[e.length - 1];
                      }
                      function l(e, t) {
                        return !(
                          !e ||
                          ("startTag" !== e.type && "atomicTag" !== e.type) ||
                          !("tagName" in e) ||
                          !~e.tagName.toLowerCase().indexOf(t)
                        );
                      }
                      function d(e) {
                        return l(e, "script");
                      }
                      function u(e) {
                        return l(e, "style");
                      }
                      t.__esModule = !0;
                      var p =
                        "function" == typeof Symbol &&
                        "symbol" == typeof Symbol.iterator
                          ? function (e) {
                              return typeof e;
                            }
                          : function (e) {
                              return e &&
                                "function" == typeof Symbol &&
                                e.constructor === Symbol &&
                                e !== Symbol.prototype
                                ? "symbol"
                                : typeof e;
                            };
                      (t.existy = n),
                        (t.isFunction = r),
                        (t.each = o),
                        (t.eachKey = i),
                        (t.defaults = a),
                        (t.toArray = s),
                        (t.last = c),
                        (t.isTag = l),
                        (t.isScript = d),
                        (t.isStyle = u);
                    },
                  ]);
                }),
                "object" == typeof t && "object" == typeof e
                  ? (e.exports = r())
                  : "function" == typeof define && define.amd
                  ? define([], r)
                  : "object" == typeof t
                  ? (t.postscribe = r())
                  : (n.postscribe = r());
            },
          },
          "core/src/lib/actions/helpers/unescapeHtmlCode.js": {
            script: function (e, t, n) {
              "use strict";
              var r = n("@adobe/reactor-document").createElement("div");
              e.exports = function (e) {
                return (r.innerHTML = e), r.textContent || r.innerText || e;
              };
            },
          },
          "core/src/lib/helpers/findPageScript.js": {
            script: function (e, t, n) {
              "use strict";
              var r = n("@adobe/reactor-document"),
                o = function (e) {
                  for (
                    var t = r.querySelectorAll("script"), n = 0;
                    n < t.length;
                    n++
                  ) {
                    var o = t[n];
                    if (e.test(o.src)) return o;
                  }
                },
                i = function () {
                  return o(
                    new RegExp(/(launch|satelliteLib)-[^\/]+.js(\?.*)?$/)
                  );
                };
              e.exports = { getTurbine: i, byRegexPattern: o };
            },
          },
          "core/src/lib/actions/helpers/decorators/decorateGlobalJavaScriptCode.js":
            {
              script: function (e, t, n) {
                "use strict";
                var r = n("@adobe/reactor-promise");
                e.exports = function (e, t) {
                  return {
                    code: "<script>\n" + t + "\n</script>",
                    promise: r.resolve(),
                  };
                };
              },
            },
          "core/src/lib/actions/helpers/decorators/decorateNonGlobalJavaScriptCode.js":
            {
              script: function (e, t, n) {
                "use strict";
                var r = n("@adobe/reactor-promise"),
                  o = 0;
                e.exports = function (e, t) {
                  var n = "_runScript" + ++o,
                    i = new r(function (t, o) {
                      _satellite[n] = function (i) {
                        delete _satellite[n],
                          new r(function (t) {
                            t(
                              i.call(
                                e.event.element,
                                e.event,
                                e.event.target,
                                r
                              )
                            );
                          }).then(t, o);
                      };
                    });
                  return {
                    code:
                      '<script>_satellite["' +
                      n +
                      '"](function(event, target, Promise) {\n' +
                      t +
                      "\n});</script>",
                    promise: i,
                  };
                };
              },
            },
          "core/src/lib/actions/helpers/decorators/decorateHtmlCode.js": {
            script: function (e, t, n, r) {
              "use strict";
              var o = n("@adobe/reactor-promise"),
                i = 0,
                a = {};
              (window._satellite = window._satellite || {}),
                (window._satellite._onCustomCodeSuccess = function (e) {
                  var t = a[e];
                  t && (delete a[e], t.resolve());
                }),
                (window._satellite._onCustomCodeFailure = function (e) {
                  var t = a[e];
                  t && (delete a[e], t.reject());
                });
              var s = function (e) {
                  return -1 !== e.indexOf("${reactorCallbackId}");
                },
                c = function (e, t) {
                  return e.replace(/\${reactorCallbackId}/g, t);
                },
                l = function (e) {
                  return e.settings.isExternal;
                };
              e.exports = function (e, t) {
                var n;
                return (
                  l(e) && (t = r.replaceTokens(t, e.event)),
                  s(t)
                    ? ((n = new o(function (e, t) {
                        a[String(i)] = { resolve: e, reject: t };
                      })),
                      (t = c(t, i)),
                      (i += 1))
                    : (n = o.resolve()),
                  { code: t, promise: n }
                );
              };
            },
          },
          "core/src/lib/actions/helpers/getSourceByUrl.js": {
            script: function (e, t, n) {
              "use strict";
              var r = n("@adobe/reactor-load-script"),
                o = n("@adobe/reactor-promise"),
                i = n("../../helpers/findPageScript").byRegexPattern,
                a = {},
                s = {},
                c = function (e) {
                  return s[e] || (s[e] = r(e)), s[e];
                };
              (_satellite.__registerScript = function (e, t) {
                var n;
                if (document.currentScript)
                  n = document.currentScript.getAttribute("src");
                else {
                  var r = new RegExp(".*" + e + ".*");
                  n = i(r).getAttribute("src");
                }
                a[n] = t;
              }),
                (e.exports = function (e) {
                  return a[e]
                    ? o.resolve(a[e])
                    : new o(function (t) {
                        c(e).then(
                          function () {
                            t(a[e]);
                          },
                          function () {
                            t();
                          }
                        );
                      });
                });
            },
          },
          "core/src/lib/helpers/textMatch.js": {
            script: function (e) {
              "use strict";
              e.exports = function (e, t) {
                if (null == t)
                  throw new Error("Illegal Argument: Pattern is not present");
                return (
                  null != e &&
                  ("string" == typeof t
                    ? e === t
                    : t instanceof RegExp && t.test(e))
                );
              };
            },
          },
        },
      },
    },
    company: {
      orgId: "19B827E253DA9DA10A490D4E@AdobeOrg",
      dynamicCdnEnabled: !1,
    },
    property: {
      name: "Quack Studios",
      settings: {
        domains: ["quackstudios.com.au"],
        undefinedVarsReturnEmpty: !1,
        ruleComponentSequencingEnabled: !0,
      },
      id: "PRd8a6e384e84143e58ae87e822fd5848f",
    },
    rules: [
      {
        id: "RL06a359e220db4597b63728804b8fb2f1",
        name: "EventHandlers",
        events: [
          {
            modulePath: "core/src/lib/events/libraryLoaded.js",
            settings: {},
            ruleOrder: 50,
          },
        ],
        conditions: [],
        actions: [
          {
            modulePath: "core/src/lib/actions/customCode.js",
            settings: {
              source:
                'window.BTEDL = window.BTEDL || {};\n\nBTEDL.videoProgress=function(t, name)   {\n\t// call at start (0) and then every 10 percent, where t = the percent Complete, name is video name\n\n\t_satellite.logger.log(\'video progress\',t,name);\n\ts.linkTrackVars = "events,eVar1,eVar3";\n\ts.linkTrackEvents = "event7,event8,event9,event10";\n\ts.events=\'\';\n\ts.eVar1 = s.pageName;\n\ts.eVar3 = name;\n\tif (t <=10) { \n\t\ts.events = "event7"; // video views\n\t} else if (t == 50) {\n\t\ts.events = "event8";  //video50\n\t} else if (t == 80) {\n\t\ts.events = "event9";\n\t} else if (t > 90) {\n\t\ts.events = "event10";\n\t}\n\t\n\tif (s.events) { s.tl(true, "o", "Video " + t + "% Completion"); }\n\ts.linkTrackEvents=s.events=s.linkTrackVars = \'\';\n};\n\nBTEDL.signupStart=function() { \n\tvar ev=\'Signup Start\';\n\ts.prop1=ev;\n\ts.prop2=ev;\n\ts.linkTrackEvents = s.events="event5";\n\ts.linkTrackVars="eVar1,eVar2,prop1,prop2,events";\n\ts.tl(true,\'o\',ev);\n\ts.linkTrackEvents=s.events=s.linkTrackVars = \'\';\t\n};\n\nBTEDL.signupComplete =function() { \n\tvar ev=\'Signup Complete\';\n\ts.prop1=ev;\n\ts.prop2=ev;\n\ts.linkTrackEvents = s.events="event2";\n\ts.linkTrackVars="eVar1,eVar2,prop1,prop2,events";\n\ts.tl(true,\'o\',ev);\n\ts.linkTrackEvents=s.events=s.linkTrackVars = \'\';\n};\n\nBTEDL.signupError=function(err,method) {  \n\t//var ev = err ? \'Signup Error \'+err : \'Signup Error \';\n\tvar ev = \'Signup Error\';\n\ts.prop1=ev;\n\ts.prop2=ev;\n\ts.linkTrackEvents = s.events="event6";\n\ts.linkTrackVars="eVar1,eVar2,prop1,prop2,events";\n\ts.tl(true,\'o\',ev);\n\ts.linkTrackEvents=s.events=s.linkTrackVars = \'\';\n};\n\nBTEDL.newPage=function(u) {  \n\ts.pageName = s.eVar1= u;\n\ts.eVar2 = window.location.href;\n\ts.t();\n};\n\n\ndocument.addEventListener("mousedown", function(event) {\n\t\n  _satellite.logger.log("binding clicktracking");\n\n\tvar pn,mod2,lt,hr,evts,jfooter,jheader;\n\tvar mod="main";\n\tvar modtype="default";\n\tvar modname="default";\n\t\n\ttry {\n\t\tpn = window.location.pathname.toLowerCase();\n\t  \n\t\tlet target = event.target || event.srcElement; // Cross-browser compatibility\n\t\tif (event.target.tagName === \'A\' || event.target.closest(\'a\')) {\n\t\t\tconst anch = event.target.tagName === \'A\' ? event.target : event.target.closest(\'a\');\n\t\t\t\n\t\t\t//event.preventDefault(); // Prevent default link behavior (optional)\n\t\t\t\n\t\t\t// Get the link text and destination URL\n\t\t\tconst lt = anch.textContent || anch.innerText; // Cross-browser for inner text\n\t\t\tconst hr = anch.href;\n\t\t\t_satellite.logger.log("In Clicktracking",lt,hr);\n\t\t\n\t\t\tlet siteHeaderDiv = anch.closest("div.siteHeader"); // Use closest() to find the nearest matching ancestor\n\n\t\t\t//modname = $(this).closest("[data-module-name]").attr("data-module-name");\n\t\t\t//modtype = $(this).closest("[data-module-type]").attr("data-module-type");\n\t\t\t\n\t\t\tif (siteHeaderDiv) {\n\t\t\t\tmod=modname=\'header\';\n\t\t\t}\n\t\t\t\t\t\n\t\t\t_satellite.logger.log("module: ",modname,modtype);\n\t\t\t\n\t\t\t//s.linkTrackVars="prop1,prop2,prop12,prop13,prop14,prop15,prop16,prop17,prop18,prop19,prop20,events";\n\t\t\ts.linkTrackVars="prop1,prop2,events";\n\t\t\ts.prop1=lt;\n\t\t\ts.prop2=hr;\n\t\t\ts.linkTrackEvents="event1";\n\t\t\ts.events="event1";\n\t\t\t/*\n\t\t\ts.prop12=pn;\n\t\t\ts.prop13=lt;\n\t\t\ts.prop14=hr;\n\t\t\ts.prop15=modtype+": "+modname;\n\t\t\ts.prop16=mod+"__"+lt;\n\t\t\ts.prop17=mod+"__"+hr;\n\t\t\ts.prop18=pn+":"+mod+"__"+lt;\n\t\t\ts.prop19=pn+":"+mod+"__"+hr;\n\t\t\ts.prop20="D=pageName";\n\t\t\t*/\n\t\t\t\n\t\t\twindow.s.tl(true,\'o\',lt);\n\t\t}\n\t} catch(moderr) {console.log("clicktracking error:"+moderr)}\n\n});\n',
              language: "javascript",
            },
          },
        ],
      },
      {
        id: "RLd5e316d8555244589998a8f21ce02e28",
        name: "AppMeasurement_PV_call",
        events: [
          {
            modulePath: "core/src/lib/events/libraryLoaded.js",
            settings: {},
            ruleOrder: 50,
          },
        ],
        conditions: [],
        actions: [
          {
            modulePath: "adobe-analytics/src/lib/actions/setVariables.js",
            settings: {
              customSetup: {
                source: function (e, t) {
                  var n = window.location.pathname.toLowerCase();
                  (t.pageName = t.eVar1 = "/" == n ? "home" : n),
                    (t.eVar2 = window.location.href),
                    (t.server = window.location.host.toLowerCase());
                },
              },
              trackerProperties: {
                campaign: { type: "value", value: "%WT_mcid%" },
              },
            },
            timeout: 2e3,
            delayNext: !0,
          },
          {
            modulePath: "adobe-analytics/src/lib/actions/sendBeacon.js",
            settings: { type: "page" },
            timeout: 2e3,
            delayNext: !0,
          },
        ],
      },
      {
        id: "RLe1bba5b3f9df4d54a97ee2721c5658d0",
        name: "Track Scroll Depth",
        events: [
          {
            modulePath: "core/src/lib/events/pageBottom.js",
            settings: {},
            ruleOrder: 50,
          },
        ],
        conditions: [
          {
            modulePath: "core/src/lib/conditions/path.js",
            settings: { paths: [{ value: "/" }] },
            timeout: 2e3,
          },
        ],
        actions: [
          {
            modulePath: "core/src/lib/actions/customCode.js",
            settings: {
              source:
                'window.maxScrollDecileNumber=0;\n\nwindow.addEventListener("scroll", function() {\n\tvar evtnum=0,intScrollProgress=0;\n\tintScrollProgress = parseInt(10*window.scrollProgress);\n   \tevtnum = 10 + intScrollProgress;\n\tif (window.scrollProgress > 1) { _satellite.logger.warn("*** scroll greater than 1");}\n\tif ((intScrollProgress<=10) && (intScrollProgress > window.maxScrollDecileNumber)) {\n\t\twindow.maxScrollDecileNumber=intScrollProgress+0;\n\t\t_satellite.logger.log("*** New decile: "+window.maxScrollDecileNumber);\n\t\ts.linkTrackEvents = s.events="event"+evtnum;\n\t\ts.linkTrackVars="eVar1,eVar2,events";\n\t\ts.tl(true,\'o\',\'scrollprogress decile \'+intScrollProgress);\n\t}\n});\n\n',
              language: "javascript",
            },
            timeout: 2e3,
            delayNext: !0,
          },
        ],
      },
    ],
  });
var _satellite = (function () {
  "use strict";
  function e(e) {
    return e &&
      e.__esModule &&
      Object.prototype.hasOwnProperty.call(e, "default")
      ? e.default
      : e;
  }
  function t(e) {
    return "[object Object]" === Object.prototype.toString.call(e);
  }
  function n(e) {
    var n, r;
    return (
      !1 !== t(e) &&
      (void 0 === (n = e.constructor) ||
        (!1 !== t((r = n.prototype)) &&
          !1 !== r.hasOwnProperty("isPrototypeOf")))
    );
  }
  function r(e) {
    return (
      "string" == typeof e && -1 !== e.indexOf("[") && -1 !== e.indexOf("]")
    );
  }
  function o(e) {
    return e.substr(0, e.indexOf("["));
  }
  function i(e, t, n) {
    if (e.length && ut(t)) {
      var a = e[0];
      if (1 !== e.length) {
        var s = e.slice(1);
        if (!r(a)) return i(s, t[a], n);
        var c = t[(a = o(a))];
        Array.isArray(c) &&
          c.forEach(function (e) {
            return i(s, e, n);
          });
      } else t.hasOwnProperty(a) && "string" == typeof t[a] && (t[a] = n(t[a]));
    }
  }
  if (window.atob) {
    var a =
        "undefined" != typeof globalThis
          ? globalThis
          : "undefined" != typeof window
          ? window
          : "undefined" != typeof global
          ? global
          : "undefined" != typeof self
          ? self
          : {},
      s = document,
      c = Object.assign,
      l = window,
      d = l,
      u = function (e, t, n, r) {
        var o,
          i = Boolean(t && Array.isArray(n)),
          a = Boolean(i && e),
          s = document.createElement("a");
        if (i) {
          var c = function () {
            var e = new Error(
              "Unable to find the Library Embed Code for Dynamic Host Resolution."
            );
            throw ((e.code = "dynamic_host_resolver_constructor_error"), e);
          };
          if (
            (e &&
              (/^((https?:)?\/\/).+/.test(e) || c(),
              /^\/\/.+/.test(e)
                ? (s.href = d.location.protocol + e)
                : (s.href = e)),
            s.hostname || c(),
            -1 === n.indexOf(s.hostname))
          ) {
            var l = new Error(
              "This library is not authorized for this domain. Please contact your CSM for more information."
            );
            throw ((l.code = "dynamic_host_not_allowed"), l);
          }
        }
        var u = function () {
            if (null != o) return o;
            if (a) {
              var e = s.host;
              /:80$/.test(e)
                ? (e = e.replace(":80", ""))
                : /:80\/$/.test(e)
                ? (e = e.replace(":80/", ""))
                : /:443$/.test(e)
                ? (e = e.replace(":443", ""))
                : /:443\/$/.test(e) && (e = e.replace(":443/", "")),
                (o = s.protocol + "//" + e);
            } else o = "";
            return o;
          },
          p = function (e) {
            return a && "string" == typeof e
              ? [u(), "/" === e.charAt(0) ? e.slice(1) : e].join("/")
              : e;
          },
          g = {
            getTurbineHost: u,
            decorateWithDynamicHost: p,
            get isDynamicEnforced() {
              return i;
            },
          };
        return (
          d &&
            r.onDebugChanged(function (e) {
              e ? (d.dynamicHostResolver = g) : delete d.dynamicHostResolver;
            }),
          g
        );
      },
      p = function (e) {
        var t = [];
        return (
          e.forEach(function (e) {
            e.events &&
              e.events.forEach(function (n) {
                t.push({ rule: e, event: n });
              });
          }),
          t.sort(function (e, t) {
            return e.event.ruleOrder - t.event.ruleOrder;
          })
        );
      },
      g = "debug",
      f = function (e, t) {
        var n = function () {
            return "true" === e.getItem(g);
          },
          r = function (t) {
            e.setItem(g, t);
          },
          o = [],
          i = function (e) {
            o.push(e);
          };
        return (
          (t.outputEnabled = n()),
          {
            onDebugChanged: i,
            getDebugEnabled: n,
            setDebugEnabled: function (e) {
              n() !== e &&
                (r(e),
                (t.outputEnabled = e),
                o.forEach(function (t) {
                  t(e);
                }));
            },
          }
        );
      },
      m = "Module did not export a function.",
      h = function (e, t, n) {
        return function (r, o, i) {
          i = i || [];
          var a = e.getModuleExports(r.modulePath);
          if ("function" != typeof a) throw new Error(m);
          var s = e.getModuleDefinition(r.modulePath),
            c = r.settings || {};
          !r.hasTransformedFilePaths &&
            s.filePaths &&
            (n(c, s.filePaths, r.modulePath), (r.hasTransformedFilePaths = !0));
          var l = t(c, o);
          return a.bind(null, l).apply(null, i);
        };
      },
      y = function (e) {
        return "string" == typeof e ? e.replace(/\s+/g, " ").trim() : e;
      },
      v = {
        LOG: "log",
        INFO: "info",
        DEBUG: "debug",
        WARN: "warn",
        ERROR: "error",
      },
      b = "\ud83d\ude80",
      w =
        10 ===
        parseInt(
          (/msie (\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1]
        )
          ? "[Launch]"
          : b,
      E = !1,
      k = function (e) {
        if (E && window.console) {
          var t = Array.prototype.slice.call(arguments, 1);
          t.unshift(w),
            e !== v.DEBUG || window.console[e] || (e = v.INFO),
            window.console[e].apply(window.console, t);
        }
      },
      C = k.bind(null, v.LOG),
      S = k.bind(null, v.INFO),
      I = k.bind(null, v.DEBUG),
      T = k.bind(null, v.WARN),
      P = k.bind(null, v.ERROR),
      D = function () {
        var e = E;
        (E = !0),
          k.apply(
            null,
            Array.prototype.concat(
              v.WARN,
              Array.prototype.slice.call(arguments)
            )
          ),
          e || (E = !1);
      },
      O = {
        log: C,
        info: S,
        debug: I,
        warn: T,
        error: P,
        deprecation: D,
        get outputEnabled() {
          return E;
        },
        set outputEnabled(e) {
          E = e;
        },
        createPrefixedLogger: function (e) {
          var t = "[" + e + "]";
          return {
            log: C.bind(null, t),
            info: S.bind(null, t),
            debug: I.bind(null, t),
            warn: T.bind(null, t),
            error: P.bind(null, t),
          };
        },
      },
      N = l,
      A = "com.adobe.reactor.",
      R = function (e, t) {
        var n = A + (t || "");
        return {
          getItem: function (t) {
            try {
              return N[e].getItem(n + t);
            } catch (e) {
              return null;
            }
          },
          setItem: function (t, r) {
            try {
              return N[e].setItem(n + t, r), !0;
            } catch (e) {
              return !1;
            }
          },
        };
      },
      x = R,
      M = "dataElements.",
      _ = x("sessionStorage", M),
      L = x("localStorage", M),
      j = { PAGEVIEW: "pageview", SESSION: "session", VISITOR: "visitor" },
      $ = {},
      U = function (e) {
        var t;
        try {
          t = JSON.stringify(e);
        } catch (e) {}
        return t;
      },
      q = y,
      B = O,
      F = {
        setValue: function (e, t, n) {
          var r;
          switch (t) {
            case j.PAGEVIEW:
              return void ($[e] = n);
            case j.SESSION:
              return void ((r = U(n)) && _.setItem(e, r));
            case j.VISITOR:
              return void ((r = U(n)) && L.setItem(e, r));
          }
        },
        getValue: function (e, t) {
          var n;
          switch (t) {
            case j.PAGEVIEW:
              return $.hasOwnProperty(e) ? $[e] : null;
            case j.SESSION:
              return null === (n = _.getItem(e)) ? n : JSON.parse(n);
            case j.VISITOR:
              return null === (n = L.getItem(e)) ? n : JSON.parse(n);
          }
        },
      },
      V = function (e, t, n, r) {
        return (
          "Failed to execute data element module " +
          e.modulePath +
          " for data element " +
          t +
          ". " +
          n +
          (r ? "\n" + r : "")
        );
      },
      H = function (e, t, n, r, o) {
        return function (i, a) {
          var s = t(i);
          if (!s) return r ? "" : void 0;
          var c,
            l,
            d = s.storageDuration;
          try {
            (c = e.getModuleExports(s.modulePath)),
              (l = e.getModuleDefinition(s.modulePath));
          } catch (e) {
            return void B.error(V(s, i, e.message, e.stack));
          }
          if ("function" == typeof c) {
            var u,
              p = s.settings || {};
            !s.hasTransformedFilePaths &&
              l.filePaths &&
              (o(p, l.filePaths, s.modulePath),
              (s.hasTransformedFilePaths = !0));
            try {
              u = c(n(p, a), a);
            } catch (e) {
              return void B.error(V(s, i, e.message, e.stack));
            }
            return (
              d && (null != u ? F.setValue(i, d, u) : (u = F.getValue(i, d))),
              null == u && null != s.defaultValue && (u = s.defaultValue),
              "string" == typeof u &&
                (s.cleanText && (u = q(u)),
                s.forceLowerCase && (u = u.toLowerCase())),
              u
            );
          }
          B.error(V(s, i, "Module did not export a function."));
        };
      },
      z = y,
      G = {
        text: function (e) {
          return e.textContent;
        },
        cleanText: function (e) {
          return z(e.textContent);
        },
      },
      J = function (e, t, n) {
        for (var r, o = e, i = 0, a = t.length; i < a; i++) {
          if (null == o) return;
          var s = t[i];
          if (n && "@" === s.charAt(0)) {
            var c = s.slice(1);
            o = G[c](o);
          } else if (
            o.getAttribute &&
            (r = s.match(/^getAttribute\((.+)\)$/))
          ) {
            var l = r[1];
            o = o.getAttribute(l);
          } else o = o[s];
        }
        return o;
      },
      W = function (e, t, n) {
        return function (r, o) {
          var i;
          if (t(r)) i = n(r, o);
          else {
            var a = r.split("."),
              s = a.shift();
            "this" === s
              ? o && (i = J(o.element, a, !0))
              : "event" === s
              ? o && (i = J(o, a))
              : "target" === s
              ? o && (i = J(o.target, a))
              : (i = J(e[s], a));
          }
          return i;
        };
      },
      Q = function (e, t) {
        return function (n) {
          var r = n.split(".")[0];
          return Boolean(
            t(n) ||
              "this" === r ||
              "event" === r ||
              "target" === r ||
              e.hasOwnProperty(r)
          );
        };
      },
      Y = function (e, t, n) {
        var r = { exports: {} };
        return e.call(r.exports, r, r.exports, t, n), r.exports;
      },
      X = Y,
      K = O,
      Z = function () {
        var e = {},
          t = function (t) {
            var n = e[t];
            if (!n) throw new Error("Module " + t + " not found.");
            return n;
          },
          n = function () {
            Object.keys(e).forEach(function (e) {
              try {
                r(e);
              } catch (n) {
                var t =
                  "Error initializing module " +
                  e +
                  ". " +
                  n.message +
                  (n.stack ? "\n" + n.stack : "");
                K.error(t);
              }
            });
          },
          r = function (e) {
            var n = t(e);
            return (
              n.hasOwnProperty("exports") ||
                (n.exports = X(n.definition.script, n.require, n.turbine)),
              n.exports
            );
          };
        return {
          registerModule: function (t, n, r, o, i) {
            var a = { definition: n, extensionName: r, require: o, turbine: i };
            (a.require = o), (e[t] = a);
          },
          hydrateCache: n,
          getModuleExports: r,
          getModuleDefinition: function (e) {
            return t(e).definition;
          },
          getModuleExtensionName: function (e) {
            return t(e).extensionName;
          },
        };
      },
      ee = O,
      te = !1,
      ne = function (e) {
        return function (t, n) {
          var r = e._monitors;
          r &&
            (te ||
              (ee.warn(
                "The _satellite._monitors API may change at any time and should only be used for debugging."
              ),
              (te = !0)),
            r.forEach(function (e) {
              e[t] && e[t](n);
            }));
        };
      },
      re = O,
      oe = function (e, t, n) {
        var r,
          o,
          i,
          a,
          s = [],
          c = function (r, o, i) {
            if (!e(o)) return r;
            s.push(o);
            var a = t(o, i);
            return s.pop(), null == a && n ? "" : a;
          };
        return (
          (r = function (e, t) {
            var n = /^%([^%]+)%$/.exec(e);
            return n
              ? c(e, n[1], t)
              : e.replace(/%(.+?)%/g, function (e, n) {
                  return c(e, n, t);
                });
          }),
          (o = function (e, t) {
            for (var n = {}, r = Object.keys(e), o = 0; o < r.length; o++) {
              var i = r[o],
                s = e[i];
              n[i] = a(s, t);
            }
            return n;
          }),
          (i = function (e, t) {
            for (var n = [], r = 0, o = e.length; r < o; r++)
              n.push(a(e[r], t));
            return n;
          }),
          (a = function (e, t) {
            return "string" == typeof e
              ? r(e, t)
              : Array.isArray(e)
              ? i(e, t)
              : "object" == typeof e && null !== e
              ? o(e, t)
              : e;
          }),
          function (e, t) {
            return s.length > 10
              ? (re.error(
                  "Data element circular reference detected: " + s.join(" -> ")
                ),
                e)
              : a(e, t);
          }
        );
      },
      ie = function (e) {
        return function () {
          if ("string" == typeof arguments[0]) e[arguments[0]] = arguments[1];
          else if (arguments[0]) {
            var t = arguments[0];
            for (var n in t) e[n] = t[n];
          }
        };
      },
      ae =
        ("undefined" != typeof window && window.Promise) ||
        (void 0 !== a && a.Promise),
      se = ae,
      ce = function (e, t, n) {
        return function (r, o, i, a) {
          return a.then(function () {
            var a,
              s = r.delayNext;
            return new se(function (t, n) {
              var o = e(r, i, [i]);
              if (!s) return t();
              var c = r.timeout,
                l = new se(function (e, t) {
                  a = setTimeout(function () {
                    t(
                      new Error(
                        "A timeout occurred because the action took longer than " +
                          c / 1e3 +
                          " seconds to complete. "
                      )
                    );
                  }, c);
                });
              se.race([o, l]).then(t, n);
            })
              .catch(function (e) {
                return clearTimeout(a), (e = t(e)), n(r, o, e), se.reject(e);
              })
              .then(function () {
                clearTimeout(a);
              });
          });
        };
      },
      le = ae,
      de = function (e, t, n, r, o) {
        return function (i, a, s, c) {
          return c.then(function () {
            var c;
            return new le(function (t, n) {
              var r = e(i, s, [s]),
                o = i.timeout,
                a = new le(function (e, t) {
                  c = setTimeout(function () {
                    t(
                      new Error(
                        "A timeout occurred because the condition took longer than " +
                          o / 1e3 +
                          " seconds to complete. "
                      )
                    );
                  }, o);
                });
              le.race([r, a]).then(t, n);
            })
              .catch(function (e) {
                return clearTimeout(c), (e = t(e)), r(i, a, e), le.reject(e);
              })
              .then(function (e) {
                if ((clearTimeout(c), !n(i, e))) return o(i, a), le.reject();
              });
          });
        };
      },
      ue = ae.resolve(),
      pe = function (e, t, n) {
        return function (r, o) {
          return (
            r.conditions &&
              r.conditions.forEach(function (t) {
                ue = e(t, r, o, ue);
              }),
            r.actions &&
              r.actions.forEach(function (e) {
                ue = t(e, r, o, ue);
              }),
            (ue = (ue = ue.then(function () {
              n(r);
            })).catch(function () {}))
          );
        };
      },
      ge = function (e) {
        return Boolean(
          e && "object" == typeof e && "function" == typeof e.then
        );
      },
      fe = function (e, t, n, r) {
        return function (o, i) {
          var a;
          if (o.conditions)
            for (var s = 0; s < o.conditions.length; s++) {
              a = o.conditions[s];
              try {
                var c = e(a, i, [i]);
                if (ge(c))
                  throw new Error(
                    "Rule component sequencing must be enabled on the property for this condition to function properly."
                  );
                if (!t(a, c)) return n(a, o), !1;
              } catch (e) {
                return r(a, o, e), !1;
              }
            }
          return !0;
        };
      },
      me = function (e, t) {
        return function (n, r) {
          e(n, r) && t(n, r);
        };
      },
      he = function (e) {
        return function (t) {
          var n = e.getModuleDefinition(t.modulePath);
          return (n && n.displayName) || t.modulePath;
        };
      },
      ye = function (e) {
        return function (t) {
          var n = t.rule,
            r = t.event,
            o = e.getModuleDefinition(r.modulePath).name;
          return {
            $type: e.getModuleExtensionName(r.modulePath) + "." + o,
            $rule: { id: n.id, name: n.name },
          };
        };
      },
      ve = function (e, t, n, r, o, i) {
        return function (a, s) {
          var c = s.rule,
            l = s.event;
          l.settings = l.settings || {};
          try {
            var d = o(s);
            t(l, null, [
              function (t) {
                var r = n(d, t);
                a(function () {
                  e(r, c);
                });
              },
            ]);
          } catch (e) {
            i.error(r(l, c, e));
          }
        };
      },
      be = function (e, t, n, r) {
        return function (o, i, a) {
          var s = t(o);
          n.error(e(s, i.name, a)),
            r("ruleActionFailed", { rule: i, action: o });
        };
      },
      we = function (e, t, n, r) {
        return function (o, i, a) {
          var s = t(o);
          n.error(e(s, i.name, a)),
            r("ruleConditionFailed", { rule: i, condition: o });
        };
      },
      Ee = function (e, t, n) {
        return function (r, o) {
          var i = e(r);
          t.log('Condition "' + i + '" for rule "' + o.name + '" was not met.'),
            n("ruleConditionFailed", { rule: o, condition: r });
        };
      },
      ke = function (e, t) {
        return function (n) {
          e.log('Rule "' + n.name + '" fired.'),
            t("ruleCompleted", { rule: n });
        };
      },
      Ce = function (e, t, n) {
        return function (r, o) {
          var i;
          if (r.actions)
            for (var a = 0; a < r.actions.length; a++) {
              i = r.actions[a];
              try {
                e(i, o, [o]);
              } catch (e) {
                return void t(i, r, e);
              }
            }
          n(r);
        };
      },
      Se = function (e, t, n, r) {
        return function (o, i) {
          r("ruleTriggered", { rule: i }), e ? n(i, o) : t(i, o);
        };
      },
      Ie = function (e, t, n) {
        return (
          'Failed to execute "' +
          e +
          '" for "' +
          t +
          '" rule. ' +
          n.message +
          (n.stack ? "\n" + n.stack : "")
        );
      },
      Te = function (e, t) {
        return (t && !e.negate) || (!t && e.negate);
      },
      Pe = [],
      De = !1,
      Oe = function (e) {
        De ? e() : Pe.push(e);
      },
      Ne = function (e, t, n) {
        e(t).forEach(function (e) {
          n(Oe, e);
        }),
          (De = !0),
          Pe.forEach(function (e) {
            e();
          }),
          (Pe = []);
      },
      Ae = function (e) {
        if (
          (e ||
            (e = new Error(
              "The extension triggered an error, but no error information was provided."
            )),
          !(e instanceof Error))
        ) {
          var t = "object" == typeof e ? JSON.stringify(e) : String(e);
          e = new Error(t);
        }
        return e;
      },
      Re = {};
    Object.defineProperty(Re, "__esModule", { value: !0 }),
      (Re.isPlainObject = n);
    var xe,
      Me = O,
      _e = c,
      { isPlainObject: Le } = Re,
      je = function (e, t) {
        return (
          Le((t = t || {})) ? (t = _e({}, t, e)) : _e(t, e),
          t.hasOwnProperty("type") ||
            Object.defineProperty(t, "type", {
              get: function () {
                return (
                  Me.deprecation(
                    "Accessing event.type in Adobe Launch has been deprecated and will be removed soon. Please use event.$type instead."
                  ),
                  t.$type
                );
              },
            }),
          t
        );
      },
      $e = function (e, t) {
        return function (n, r) {
          var o = e[n];
          if (o) {
            var i = o.modules;
            if (i)
              for (var a = Object.keys(i), s = 0; s < a.length; s++) {
                var c = a[s],
                  l = i[c];
                if (l.shared && l.name === r) return t.getModuleExports(c);
              }
          }
        };
      },
      Ue = function (e, t) {
        return function () {
          return t ? e(t) : {};
        };
      },
      qe = function (e, t, n) {
        return function (r) {
          if (n) {
            var o = r.split(".");
            o.splice(o.length - 1 || 1, 0, "min"), (r = o.join("."));
          }
          return e(t) + r;
        };
      },
      Be = ".js",
      Fe = function (e) {
        return e.substr(0, e.lastIndexOf("/"));
      },
      Ve = function (e, t) {
        return -1 !== e.indexOf(t, e.length - t.length);
      },
      He = function (e, t) {
        Ve(t, Be) || (t += Be);
        var n = t.split("/"),
          r = Fe(e).split("/");
        return (
          n.forEach(function (e) {
            e && "." !== e && (".." === e ? r.length && r.pop() : r.push(e));
          }),
          r.join("/")
        );
      },
      ze = { exports: {} };
    (xe = function () {
      function e() {
        for (var e = 0, t = {}; e < arguments.length; e++) {
          var n = arguments[e];
          for (var r in n) t[r] = n[r];
        }
        return t;
      }
      function t(e) {
        return e.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
      }
      function n(r) {
        function o() {}
        function i(t, n, i) {
          if ("undefined" != typeof document) {
            "number" == typeof (i = e({ path: "/" }, o.defaults, i)).expires &&
              (i.expires = new Date(1 * new Date() + 864e5 * i.expires)),
              (i.expires = i.expires ? i.expires.toUTCString() : "");
            try {
              var a = JSON.stringify(n);
              /^[\{\[]/.test(a) && (n = a);
            } catch (e) {}
            (n = r.write
              ? r.write(n, t)
              : encodeURIComponent(String(n)).replace(
                  /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
                  decodeURIComponent
                )),
              (t = encodeURIComponent(String(t))
                .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
                .replace(/[\(\)]/g, escape));
            var s = "";
            for (var c in i)
              i[c] &&
                ((s += "; " + c),
                !0 !== i[c] && (s += "=" + i[c].split(";")[0]));
            return (document.cookie = t + "=" + n + s);
          }
        }
        function a(e, n) {
          if ("undefined" != typeof document) {
            for (
              var o = {},
                i = document.cookie ? document.cookie.split("; ") : [],
                a = 0;
              a < i.length;
              a++
            ) {
              var s = i[a].split("="),
                c = s.slice(1).join("=");
              n || '"' !== c.charAt(0) || (c = c.slice(1, -1));
              try {
                var l = t(s[0]);
                if (((c = (r.read || r)(c, l) || t(c)), n))
                  try {
                    c = JSON.parse(c);
                  } catch (e) {}
                if (((o[l] = c), e === l)) break;
              } catch (e) {}
            }
            return e ? o[e] : o;
          }
        }
        return (
          (o.set = i),
          (o.get = function (e) {
            return a(e, !1);
          }),
          (o.getJSON = function (e) {
            return a(e, !0);
          }),
          (o.remove = function (t, n) {
            i(t, "", e(n, { expires: -1 }));
          }),
          (o.defaults = {}),
          (o.withConverter = n),
          o
        );
      }
      return n(function () {});
    }),
      (ze.exports = xe());
    var Ge = ze.exports,
      Je = { get: Ge.get, set: Ge.set, remove: Ge.remove },
      We = ae,
      Qe = function (e, t) {
        return new We(function (n, r) {
          (t.onload = function () {
            n(t);
          }),
            (t.onerror = function () {
              r(new Error("Failed to load script " + e));
            });
        });
      },
      Ye = function (e) {
        var t = {};
        if (!e || "string" != typeof e) return t;
        var n = e.trim().replace(/^[?#&]/, ""),
          r = new URLSearchParams(n),
          o = r.keys();
        do {
          var i = o.next(),
            a = i.value;
          if (a) {
            var s = r.getAll(a);
            1 === s.length ? (t[a] = s[0]) : (t[a] = s);
          }
        } while (!1 === i.done);
        return t;
      },
      Xe = function (e) {
        var t = "{{space}}",
          n = new URLSearchParams();
        return (
          Object.keys(e).forEach(function (r) {
            var o = e[r];
            "string" == typeof e[r]
              ? (o = o.replace(/ /g, t))
              : ["object", "undefined"].includes(typeof o) &&
                !Array.isArray(o) &&
                (o = ""),
              Array.isArray(o)
                ? o.forEach(function (e) {
                    n.append(r, e);
                  })
                : n.append(r, o);
          }),
          n.toString().replace(new RegExp(encodeURIComponent(t), "g"), "%20")
        );
      },
      Ke = "@adobe/reactor-",
      Ze = {
        cookie: Je,
        document: s,
        "load-script": function (e) {
          var t = document.createElement("script");
          (t.src = e), (t.async = !0);
          var n = Qe(e, t);
          return document.getElementsByTagName("head")[0].appendChild(t), n;
        },
        "object-assign": c,
        promise: ae,
        "query-string": {
          parse: function (e) {
            return Ye(e);
          },
          stringify: function (e) {
            return Xe(e);
          },
        },
        window: l,
      },
      et = function (e) {
        return function (t) {
          if (0 === t.indexOf(Ke)) {
            var n = t.substr(Ke.length),
              r = Ze[n];
            if (r) return r;
          }
          if (0 === t.indexOf("./") || 0 === t.indexOf("../")) return e(t);
          throw new Error('Cannot resolve module "' + t + '".');
        };
      },
      tt = $e,
      nt = Ue,
      rt = qe,
      ot = O,
      it = He,
      at = et,
      st = function (e, t, n, r, o, i, a) {
        var s = e.extensions,
          c = e.buildInfo,
          l = e.environment,
          d = e.property.settings;
        if (s) {
          var u = tt(s, t);
          Object.keys(s).forEach(function (p) {
            var g = s[p],
              f = g.settings;
            Array.isArray(g.filePaths) && (f = i(f, g.filePaths));
            var m = nt(r, f);
            if (g.modules) {
              var h = ot.createPrefixedLogger(g.displayName),
                y = rt(a, g.hostedLibFilesBaseUrl, c.minified),
                v = {
                  buildInfo: c,
                  environment: l,
                  property: { name: e.property.name, id: e.property.id },
                  getDataElementValue: o,
                  getExtensionSettings: m,
                  getHostedLibFileUrl: y,
                  getSharedModule: u,
                  logger: h,
                  propertySettings: d,
                  replaceTokens: r,
                  onDebugChanged: n.onDebugChanged,
                  get debugEnabled() {
                    return n.getDebugEnabled();
                  },
                };
              Object.keys(g.modules).forEach(function (e) {
                var n = g.modules[e],
                  r = at(function (n) {
                    var r = it(e, n);
                    return t.getModuleExports(r);
                  });
                t.registerModule(e, n, p, r, v);
              });
            }
          }),
            t.hydrateCache();
        }
        return t;
      },
      ct = Je,
      lt = O,
      dt = function (e, t, n, r, o) {
        var i = lt.createPrefixedLogger("Custom Script");
        (e.track = function (e) {
          lt.log('"' + e + '" does not match any direct call identifiers.');
        }),
          (e.getVisitorId = function () {
            return null;
          }),
          (e.property = { name: t.property.name, id: t.property.id }),
          (e.company = t.company),
          (e.buildInfo = t.buildInfo),
          (e.environment = t.environment),
          (e.logger = i),
          (e.notify = function (e, t) {
            switch (
              (lt.deprecation(
                "_satellite.notify is deprecated. Please use the `_satellite.logger` API."
              ),
              t)
            ) {
              case 3:
                i.info(e);
                break;
              case 4:
                i.warn(e);
                break;
              case 5:
                i.error(e);
                break;
              default:
                i.log(e);
            }
          }),
          (e.getVar = r),
          (e.setVar = o),
          (e.setCookie = function (e, t, n) {
            var r = "",
              o = {};
            n && ((r = ", { expires: " + n + " }"), (o.expires = n));
            var i =
              '_satellite.setCookie is deprecated. Please use _satellite.cookie.set("' +
              e +
              '", "' +
              t +
              '"' +
              r +
              ").";
            lt.deprecation(i), ct.set(e, t, o);
          }),
          (e.readCookie = function (e) {
            return (
              lt.deprecation(
                '_satellite.readCookie is deprecated. Please use _satellite.cookie.get("' +
                  e +
                  '").'
              ),
              ct.get(e)
            );
          }),
          (e.removeCookie = function (e) {
            lt.deprecation(
              '_satellite.removeCookie is deprecated. Please use _satellite.cookie.remove("' +
                e +
                '").'
            ),
              ct.remove(e);
          }),
          (e.cookie = ct),
          (e.pageBottom = function () {}),
          (e.setDebug = n);
        var a = !1;
        Object.defineProperty(e, "_container", {
          get: function () {
            return (
              a ||
                (lt.warn(
                  "_satellite._container may change at any time and should only be used for debugging."
                ),
                (a = !0)),
              t
            );
          },
        });
      },
      { isPlainObject: ut } = Re,
      pt = s,
      gt = c,
      ft = u,
      mt = p,
      ht = f,
      yt = h,
      vt = H,
      bt = W,
      wt = Q,
      Et = Z,
      kt = ne,
      Ct = oe,
      St = ie,
      It = ce,
      Tt = de,
      Pt = pe,
      Dt = fe,
      Ot = me,
      Nt = he,
      At = ye,
      Rt = ve,
      xt = be,
      Mt = we,
      _t = Ee,
      Lt = ke,
      jt = Ce,
      $t = Se,
      Ut = Ie,
      qt = Te,
      Bt = Ne,
      Ft = Ae,
      Vt = je,
      Ht = R,
      zt = st,
      Gt = dt,
      Jt = function (e, t) {
        return function (n, r, o) {
          return e &&
            ut(n) &&
            Object.keys(n).length &&
            Array.isArray(r) &&
            r.length
            ? (r.forEach(function (e) {
                (Boolean(
                  null != o && /^core\/.*actions.*\/customCode\.js$/.test(o)
                ) &&
                  "source" === e &&
                  !n.isExternal) ||
                  i(e.split("."), n, t);
              }),
              n)
            : n;
        };
      },
      Wt = O,
      Qt = window._satellite;
    if (Qt && !window.__satelliteLoaded) {
      window.__satelliteLoaded = !0;
      var Yt = Qt.container;
      delete Qt.container;
      var Xt = gt({}, Yt.buildInfo);
      Object.defineProperty(Xt, "environment", {
        get: function () {
          return (
            Wt.deprecation(
              "container.buildInfo.environment is deprecated.Please use `container.environment.stage` instead"
            ),
            Yt.environment.stage
          );
        },
      }),
        (Yt.buildInfo = Xt);
      var Kt,
        Zt = ht(Ht("localStorage"), Wt),
        en = "";
      pt.currentScript &&
        pt.currentScript.getAttribute("src") &&
        (en = pt.currentScript.getAttribute("src"));
      try {
        Kt = ft(
          en,
          Boolean(Yt.company.dynamicCdnEnabled),
          Yt.company.cdnAllowList,
          Zt
        );
      } catch (e) {
        throw (Wt.warn("Please review the following error:"), e);
      }
      var tn,
        nn = Jt(Kt.isDynamicEnforced, Kt.decorateWithDynamicHost),
        rn = Et(),
        on = Yt.property.settings.undefinedVarsReturnEmpty,
        an = Yt.property.settings.ruleComponentSequencingEnabled,
        sn = Yt.dataElements || {},
        cn = function (e) {
          return sn[e];
        },
        ln = function () {
          return tn.apply(null, arguments);
        },
        dn = vt(rn, cn, ln, on, nn),
        un = {},
        pn = St(un),
        gn = wt(un, cn),
        fn = bt(un, cn, dn);
      (tn = Ct(gn, fn, on)),
        Gt(Qt, Yt, Zt.setDebugEnabled, fn, pn),
        zt(Yt, rn, Zt, tn, dn, nn, Kt.decorateWithDynamicHost);
      var mn = kt(Qt),
        hn = yt(rn, tn, nn),
        yn = Nt(rn),
        vn = _t(yn, Wt, mn),
        bn = Mt(Ut, yn, Wt, mn),
        wn = xt(Ut, yn, Wt, mn),
        En = Lt(Wt, mn),
        kn = Rt(
          $t(
            an,
            Ot(Dt(hn, qt, vn, bn), jt(hn, wn, En)),
            Pt(Tt(hn, Ft, qt, bn, vn), It(hn, Ft, wn), En),
            mn
          ),
          hn,
          Vt,
          Ut,
          At(rn),
          Wt
        );
      Bt(mt, Yt.rules || [], kn);
    }
    return e(Qt);
  }
  console.warn("Adobe Launch is unsupported in IE 9 and below.");
})();
