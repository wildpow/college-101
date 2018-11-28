!(function(e, t) {
  for (var r in t) e[r] = t[r];
})(
  exports,
  (function(e) {
    var t = {};
    function r(n) {
      if (t[n]) return t[n].exports;
      var i = (t[n] = { i: n, l: !1, exports: {} });
      return e[n].call(i.exports, i, i.exports, r), (i.l = !0), i.exports;
    }
    return (
      (r.m = e),
      (r.c = t),
      (r.d = function(e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
      }),
      (r.r = function(e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (r.t = function(e, t) {
        if ((1 & t && (e = r(e)), 8 & t)) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (
          (r.r(n),
          Object.defineProperty(n, "default", { enumerable: !0, value: e }),
          2 & t && "string" != typeof e)
        )
          for (var i in e)
            r.d(
              n,
              i,
              function(t) {
                return e[t];
              }.bind(null, i),
            );
        return n;
      }),
      (r.n = function(e) {
        var t =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return r.d(t, "a", t), t;
      }),
      (r.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (r.p = ""),
      r((r.s = 98))
    );
  })([
    function(e, t, r) {
      "use strict";
      var n = r(5),
        i = r(9),
        o = r(6),
        a = r(1),
        s = r(3),
        c = {}.hasOwnProperty;
      function u(e, t) {
        (this._stripe = e),
          (this._urlData = t || {}),
          (this.basePath = a.makeURLInterpolator(e.getApiField("basePath"))),
          (this.resourcePath = this.path),
          (this.path = a.makeURLInterpolator(this.path)),
          this.includeBasic &&
            this.includeBasic.forEach(function(e) {
              this[e] = u.BASIC_METHODS[e];
            }, this),
          this.initialize.apply(this, arguments);
      }
      (u.extend = a.protoExtend),
        (u.method = r(14)),
        (u.BASIC_METHODS = r(27)),
        (u.prototype = {
          path: "",
          initialize: function() {},
          requestDataProcessor: null,
          validateRequest: null,
          createFullPath: function(e, t) {
            return o
              .join(
                this.basePath(t),
                this.path(t),
                "function" == typeof e ? e(t) : e,
              )
              .replace(/\\/g, "/");
          },
          createResourcePathWithSymbols: function(e) {
            return "/" + o.join(this.resourcePath, e || "").replace(/\\/g, "/");
          },
          createUrlData: function() {
            var e = {};
            for (var t in this._urlData)
              c.call(this._urlData, t) && (e[t] = this._urlData[t]);
            return e;
          },
          wrapTimeout: a.callbackifyPromiseWithTimeout,
          _timeoutHandler: function(e, t, r) {
            var n = this;
            return function() {
              var i = new s("ETIMEDOUT");
              (i.code = "ETIMEDOUT"),
                (t._isAborted = !0),
                t.abort(),
                r.call(
                  n,
                  new s.StripeConnectionError({
                    message:
                      "Request aborted due to timeout being reached (" +
                      e +
                      "ms)",
                    detail: i,
                  }),
                  null,
                );
            };
          },
          _responseHandler: function(e, t) {
            var r = this;
            return function(n) {
              var i = "";
              n.setEncoding("utf8"),
                n.on("data", function(e) {
                  i += e;
                }),
                n.on("end", function() {
                  var o = n.headers || {};
                  n.requestId = o["request-id"];
                  var c = a.removeEmpty({
                    api_version: o["stripe-version"],
                    account: o["stripe-account"],
                    idempotency_key: o["idempotency-key"],
                    method: e._requestEvent.method,
                    path: e._requestEvent.path,
                    status: n.statusCode,
                    request_id: n.requestId,
                    elapsed: Date.now() - e._requestStart,
                  });
                  r._stripe._emitter.emit("response", c);
                  try {
                    var u;
                    if ((i = JSON.parse(i)).error)
                      return (
                        (i.error.headers = o),
                        (i.error.statusCode = n.statusCode),
                        (i.error.requestId = n.requestId),
                        (u =
                          401 === n.statusCode
                            ? new s.StripeAuthenticationError(i.error)
                            : 403 === n.statusCode
                            ? new s.StripePermissionError(i.error)
                            : 429 === n.statusCode
                            ? new s.StripeRateLimitError(i.error)
                            : s.StripeError.generate(i.error)),
                        t.call(r, u, null)
                      );
                  } catch (e) {
                    return t.call(
                      r,
                      new s.StripeAPIError({
                        message: "Invalid JSON received from the Stripe API",
                        response: i,
                        exception: e,
                        requestId: o["request-id"],
                      }),
                      null,
                    );
                  }
                  Object.defineProperty(i, "lastResponse", {
                    enumerable: !1,
                    writable: !1,
                    value: n,
                  }),
                    t.call(r, null, i);
                });
            };
          },
          _errorHandler: function(e, t) {
            var r = this;
            return function(n) {
              e._isAborted ||
                t.call(
                  r,
                  new s.StripeConnectionError({
                    message: "An error occurred with our connection to Stripe",
                    detail: n,
                  }),
                  null,
                );
            };
          },
          _defaultHeaders: function(e, t, r) {
            var n =
              "Stripe/v1 NodeBindings/" +
              this._stripe.getConstant("PACKAGE_VERSION");
            this._stripe._appInfo &&
              (n += " " + this._stripe.getAppInfoAsString());
            var i = {
              Authorization: e
                ? "Bearer " + e
                : this._stripe.getApiField("auth"),
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
              "Content-Length": t,
              "User-Agent": n,
            };
            return r && (i["Stripe-Version"] = r), i;
          },
          _request: function(e, t, r, o, s, c, u) {
            var d,
              p = this;
            function l(o, l) {
              var h, f;
              if (o) return u(o);
              (h = p._stripe.getApiField("version")),
                (d = l),
                (f = p._defaultHeaders(s, d.length, h)),
                p._stripe.getClientUserAgent(function(o) {
                  (f["X-Stripe-Client-User-Agent"] = o),
                    c.headers && Object.assign(f, c.headers),
                    (function(o, s) {
                      var c = p._stripe.getApiField("timeout"),
                        l = "http" == p._stripe.getApiField("protocol"),
                        h = (l ? n : i).request({
                          host: t || p._stripe.getApiField("host"),
                          port: p._stripe.getApiField("port"),
                          path: r,
                          method: e,
                          agent: p._stripe.getApiField("agent"),
                          headers: s,
                          ciphers:
                            "DEFAULT:!aNULL:!eNULL:!LOW:!EXPORT:!SSLv2:!MD5",
                        }),
                        f = a.removeEmpty({
                          api_version: o,
                          account: s["Stripe-Account"],
                          idempotency_key: s["Idempotency-Key"],
                          method: e,
                          path: r,
                        });
                      (h._requestEvent = f),
                        (h._requestStart = Date.now()),
                        p._stripe._emitter.emit("request", f),
                        h.setTimeout(c, p._timeoutHandler(c, h, u)),
                        h.on("response", p._responseHandler(h, u)),
                        h.on("error", p._errorHandler(h, u)),
                        h.on("socket", function(e) {
                          e.connecting
                            ? e.on(l ? "connect" : "secureConnect", function() {
                                h.write(d), h.end();
                              })
                            : (h.write(d), h.end());
                        });
                    })(h, f);
                });
            }
            p.requestDataProcessor
              ? p.requestDataProcessor(e, o, c.headers, l)
              : l(null, a.stringifyRequestData(o || {}));
          },
        }),
        (e.exports = u);
    },
    function(e, t, r) {
      "use strict";
      var n,
        i = r(2).Buffer,
        o = r(7).EventEmitter,
        a = r(23),
        s = r(12),
        c = {}.hasOwnProperty,
        u = r(13),
        d = ["api_key", "idempotency_key", "stripe_account", "stripe_version"],
        p = (e.exports = {
          isAuthKey: function(e) {
            return (
              "string" == typeof e && /^(?:[a-z]{2}_)?[A-z0-9]{32}$/.test(e)
            );
          },
          isOptionsHash: function(e) {
            return (
              u(e) &&
              d.some(function(t) {
                return c.call(e, t);
              })
            );
          },
          stringifyRequestData: function(e) {
            return a.stringify(e, { arrayFormat: "brackets" });
          },
          makeURLInterpolator: ((n = {
            "\n": "\\n",
            '"': '\\"',
            "\u2028": "\\u2028",
            "\u2029": "\\u2029",
          }),
          function(e) {
            var t = e.replace(/["\n\r\u2028\u2029]/g, function(e) {
              return n[e];
            });
            return function(e) {
              return t.replace(/\{([\s\S]+?)\}/g, function(t, r) {
                return encodeURIComponent(e[r] || "");
              });
            };
          }),
          getDataFromArgs: function(e) {
            if (e.length < 1 || !u(e[0])) return {};
            if (!p.isOptionsHash(e[0])) return e.shift();
            var t = Object.keys(e[0]),
              r = t.filter(function(e) {
                return d.indexOf(e) > -1;
              });
            return (
              r.length > 0 &&
                r.length !== t.length &&
                l(
                  "Options found in arguments (" +
                    r.join(", ") +
                    "). Did you mean to pass an options object? See https://github.com/stripe/stripe-node/wiki/Passing-Options.",
                ),
              {}
            );
          },
          getOptionsFromArgs: function(e) {
            var t = { auth: null, headers: {} };
            if (e.length > 0) {
              var r = e[e.length - 1];
              if (p.isAuthKey(r)) t.auth = e.pop();
              else if (p.isOptionsHash(r)) {
                var n = e.pop(),
                  i = Object.keys(n).filter(function(e) {
                    return -1 == d.indexOf(e);
                  });
                i.length &&
                  l("Invalid options found (" + i.join(", ") + "); ignoring."),
                  n.api_key && (t.auth = n.api_key),
                  n.idempotency_key &&
                    (t.headers["Idempotency-Key"] = n.idempotency_key),
                  n.stripe_account &&
                    (t.headers["Stripe-Account"] = n.stripe_account),
                  n.stripe_version &&
                    (t.headers["Stripe-Version"] = n.stripe_version);
              }
            }
            return t;
          },
          protoExtend: function(e) {
            var t = this,
              r = c.call(e, "constructor")
                ? e.constructor
                : function() {
                    t.apply(this, arguments);
                  };
            return (
              Object.assign(r, t),
              (r.prototype = Object.create(t.prototype)),
              Object.assign(r.prototype, e),
              r
            );
          },
          encodeParamWithIntegerIndexes: function(e, t) {
            return void 0 !== t[e] && (t[e] = p.arrayToObject(t[e])), t;
          },
          arrayToObject: function(e) {
            if (Array.isArray(e)) {
              var t = {};
              return (
                e.map(function(e, r) {
                  t[r.toString()] = e;
                }),
                t
              );
            }
            return e;
          },
          secureCompare: function(e, t) {
            if (((e = i.from(e)), (t = i.from(t)), e.length !== t.length))
              return !1;
            if (s.timingSafeEqual) return s.timingSafeEqual(e, t);
            for (var r = e.length, n = 0, o = 0; o < r; ++o) n |= e[o] ^ t[o];
            return 0 === n;
          },
          removeEmpty: function(e) {
            if ("object" != typeof e)
              throw new Error("Argument must be an object");
            return (
              Object.keys(e).forEach(function(t) {
                (null !== e[t] && void 0 !== e[t]) || delete e[t];
              }),
              e
            );
          },
          checkForStream: function(e) {
            return !(!e.file || !e.file.data) && e.file.data instanceof o;
          },
          callbackifyPromiseWithTimeout: function(e, t) {
            return t
              ? e.then(
                  function(e) {
                    setTimeout(function() {
                      t(null, e);
                    }, 0);
                  },
                  function(e) {
                    setTimeout(function() {
                      t(e, null);
                    }, 0);
                  },
                )
              : e;
          },
        });
      function l(e) {
        return "function" != typeof process.emitWarning
          ? console.warn("Stripe: " + e)
          : process.emitWarning(e, "Stripe");
      }
    },
    function(e, t, r) {
      var n = r(22),
        i = n.Buffer;
      function o(e, t) {
        for (var r in e) t[r] = e[r];
      }
      function a(e, t, r) {
        return i(e, t, r);
      }
      i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow
        ? (e.exports = n)
        : (o(n, t), (t.Buffer = a)),
        o(i, a),
        (a.from = function(e, t, r) {
          if ("number" == typeof e)
            throw new TypeError("Argument must not be a number");
          return i(e, t, r);
        }),
        (a.alloc = function(e, t, r) {
          if ("number" != typeof e)
            throw new TypeError("Argument must be a number");
          var n = i(e);
          return (
            void 0 !== t
              ? "string" == typeof r
                ? n.fill(t, r)
                : n.fill(t)
              : n.fill(0),
            n
          );
        }),
        (a.allocUnsafe = function(e) {
          if ("number" != typeof e)
            throw new TypeError("Argument must be a number");
          return i(e);
        }),
        (a.allocUnsafeSlow = function(e) {
          if ("number" != typeof e)
            throw new TypeError("Argument must be a number");
          return n.SlowBuffer(e);
        });
    },
    function(e, t, r) {
      "use strict";
      var n = r(1);
      function i(e) {
        this.populate.apply(this, arguments),
          (this.stack = new Error(this.message).stack);
      }
      (e.exports = i),
        (i.prototype = Object.create(Error.prototype)),
        (i.prototype.type = "GenericError"),
        (i.prototype.populate = function(e, t) {
          (this.type = e), (this.message = t);
        }),
        (i.extend = n.protoExtend);
      var o = (i.StripeError = i.extend({
        type: "StripeError",
        populate: function(e) {
          (this.type = this.type),
            (this.stack = new Error(e.message).stack),
            (this.rawType = e.type),
            (this.code = e.code),
            (this.param = e.param),
            (this.message = e.message),
            (this.detail = e.detail),
            (this.raw = e),
            (this.headers = e.headers),
            (this.requestId = e.requestId),
            (this.statusCode = e.statusCode);
        },
      }));
      (o.generate = function(e) {
        switch (e.type) {
          case "card_error":
            return new i.StripeCardError(e);
          case "invalid_request_error":
            return new i.StripeInvalidRequestError(e);
          case "api_error":
            return new i.StripeAPIError(e);
          case "idempotency_error":
            return new i.StripeIdempotencyError(e);
        }
        return new i("Generic", "Unknown Error");
      }),
        (i.StripeCardError = o.extend({ type: "StripeCardError" })),
        (i.StripeInvalidRequestError = o.extend({
          type: "StripeInvalidRequestError",
        })),
        (i.StripeAPIError = o.extend({ type: "StripeAPIError" })),
        (i.StripeAuthenticationError = o.extend({
          type: "StripeAuthenticationError",
        })),
        (i.StripePermissionError = o.extend({ type: "StripePermissionError" })),
        (i.StripeRateLimitError = o.extend({ type: "StripeRateLimitError" })),
        (i.StripeConnectionError = o.extend({ type: "StripeConnectionError" })),
        (i.StripeSignatureVerificationError = o.extend({
          type: "StripeSignatureVerificationError",
        })),
        (i.StripeIdempotencyError = o.extend({
          type: "StripeIdempotencyError",
        }));
    },
    ,
    function(e, t) {
      e.exports = require("http");
    },
    function(e, t) {
      e.exports = require("path");
    },
    function(e, t) {
      e.exports = require("events");
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        i = n.method;
      e.exports = n.extend({
        create: i({ method: "POST", path: "accounts" }),
        list: i({ method: "GET", path: "accounts", methodType: "list" }),
        update: i({ method: "POST", path: "accounts/{id}", urlParams: ["id"] }),
        del: i({ method: "DELETE", path: "accounts/{id}", urlParams: ["id"] }),
        reject: i({
          method: "POST",
          path: "accounts/{id}/reject",
          urlParams: ["id"],
        }),
        retrieve: function(e) {
          return "string" == typeof e
            ? i({
                method: "GET",
                path: "accounts/{id}",
                urlParams: ["id"],
              }).apply(this, arguments)
            : (null == e && [].shift.apply(arguments),
              i({ method: "GET", path: "account" }).apply(this, arguments));
        },
        createExternalAccount: i({
          method: "POST",
          path: "accounts/{accountId}/external_accounts",
          urlParams: ["accountId"],
        }),
        listExternalAccounts: i({
          method: "GET",
          path: "accounts/{accountId}/external_accounts",
          urlParams: ["accountId"],
          methodType: "list",
        }),
        retrieveExternalAccount: i({
          method: "GET",
          path: "accounts/{accountId}/external_accounts/{externalAccountId}",
          urlParams: ["accountId", "externalAccountId"],
        }),
        updateExternalAccount: i({
          method: "POST",
          path: "accounts/{accountId}/external_accounts/{externalAccountId}",
          urlParams: ["accountId", "externalAccountId"],
        }),
        deleteExternalAccount: i({
          method: "DELETE",
          path: "accounts/{accountId}/external_accounts/{externalAccountId}",
          urlParams: ["accountId", "externalAccountId"],
        }),
        createLoginLink: i({
          method: "POST",
          path: "accounts/{accountId}/login_links",
          urlParams: ["accountId"],
        }),
        createPerson: i({
          method: "POST",
          path: "accounts/{accountId}/persons",
          urlParams: ["accountId"],
        }),
        listPersons: i({
          method: "GET",
          path: "accounts/{accountId}/persons",
          urlParams: ["accountId"],
          methodType: "list",
        }),
        retrievePerson: i({
          method: "GET",
          path: "accounts/{accountId}/persons/{personId}",
          urlParams: ["accountId", "personId"],
        }),
        updatePerson: i({
          method: "POST",
          path: "accounts/{accountId}/persons/{personId}",
          urlParams: ["accountId", "personId"],
        }),
        deletePerson: i({
          method: "DELETE",
          path: "accounts/{accountId}/persons/{personId}",
          urlParams: ["accountId", "personId"],
        }),
      });
    },
    function(e, t) {
      e.exports = require("https");
    },
    function(e, t, r) {
      "use strict";
      var n = Object.prototype.hasOwnProperty,
        i = (function() {
          for (var e = [], t = 0; t < 256; ++t)
            e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
          return e;
        })(),
        o = function(e, t) {
          for (
            var r = t && t.plainObjects ? Object.create(null) : {}, n = 0;
            n < e.length;
            ++n
          )
            void 0 !== e[n] && (r[n] = e[n]);
          return r;
        };
      e.exports = {
        arrayToObject: o,
        assign: function(e, t) {
          return Object.keys(t).reduce(function(e, r) {
            return (e[r] = t[r]), e;
          }, e);
        },
        compact: function(e) {
          for (
            var t = [{ obj: { o: e }, prop: "o" }], r = [], n = 0;
            n < t.length;
            ++n
          )
            for (
              var i = t[n], o = i.obj[i.prop], a = Object.keys(o), s = 0;
              s < a.length;
              ++s
            ) {
              var c = a[s],
                u = o[c];
              "object" == typeof u &&
                null !== u &&
                -1 === r.indexOf(u) &&
                (t.push({ obj: o, prop: c }), r.push(u));
            }
          return (function(e) {
            for (var t; e.length; ) {
              var r = e.pop();
              if (((t = r.obj[r.prop]), Array.isArray(t))) {
                for (var n = [], i = 0; i < t.length; ++i)
                  void 0 !== t[i] && n.push(t[i]);
                r.obj[r.prop] = n;
              }
            }
            return t;
          })(t);
        },
        decode: function(e) {
          try {
            return decodeURIComponent(e.replace(/\+/g, " "));
          } catch (t) {
            return e;
          }
        },
        encode: function(e) {
          if (0 === e.length) return e;
          for (
            var t = "string" == typeof e ? e : String(e), r = "", n = 0;
            n < t.length;
            ++n
          ) {
            var o = t.charCodeAt(n);
            45 === o ||
            46 === o ||
            95 === o ||
            126 === o ||
            (o >= 48 && o <= 57) ||
            (o >= 65 && o <= 90) ||
            (o >= 97 && o <= 122)
              ? (r += t.charAt(n))
              : o < 128
              ? (r += i[o])
              : o < 2048
              ? (r += i[192 | (o >> 6)] + i[128 | (63 & o)])
              : o < 55296 || o >= 57344
              ? (r +=
                  i[224 | (o >> 12)] +
                  i[128 | ((o >> 6) & 63)] +
                  i[128 | (63 & o)])
              : ((n += 1),
                (o = 65536 + (((1023 & o) << 10) | (1023 & t.charCodeAt(n)))),
                (r +=
                  i[240 | (o >> 18)] +
                  i[128 | ((o >> 12) & 63)] +
                  i[128 | ((o >> 6) & 63)] +
                  i[128 | (63 & o)]));
          }
          return r;
        },
        isBuffer: function(e) {
          return (
            null != e &&
            !!(
              e.constructor &&
              e.constructor.isBuffer &&
              e.constructor.isBuffer(e)
            )
          );
        },
        isRegExp: function(e) {
          return "[object RegExp]" === Object.prototype.toString.call(e);
        },
        merge: function e(t, r, i) {
          if (!r) return t;
          if ("object" != typeof r) {
            if (Array.isArray(t)) t.push(r);
            else {
              if ("object" != typeof t) return [t, r];
              (i.plainObjects ||
                i.allowPrototypes ||
                !n.call(Object.prototype, r)) &&
                (t[r] = !0);
            }
            return t;
          }
          if ("object" != typeof t) return [t].concat(r);
          var a = t;
          return (
            Array.isArray(t) && !Array.isArray(r) && (a = o(t, i)),
            Array.isArray(t) && Array.isArray(r)
              ? (r.forEach(function(r, o) {
                  n.call(t, o)
                    ? t[o] && "object" == typeof t[o]
                      ? (t[o] = e(t[o], r, i))
                      : t.push(r)
                    : (t[o] = r);
                }),
                t)
              : Object.keys(r).reduce(function(t, o) {
                  var a = r[o];
                  return n.call(t, o) ? (t[o] = e(t[o], a, i)) : (t[o] = a), t;
                }, a)
          );
        },
      };
    },
    function(e, t, r) {
      "use strict";
      var n = String.prototype.replace,
        i = /%20/g;
      e.exports = {
        default: "RFC3986",
        formatters: {
          RFC1738: function(e) {
            return n.call(e, i, "+");
          },
          RFC3986: function(e) {
            return e;
          },
        },
        RFC1738: "RFC1738",
        RFC3986: "RFC3986",
      };
    },
    function(e, t) {
      e.exports = require("crypto");
    },
    function(e, t) {
      var r = "[object Object]";
      var n,
        i,
        o = Function.prototype,
        a = Object.prototype,
        s = o.toString,
        c = a.hasOwnProperty,
        u = s.call(Object),
        d = a.toString,
        p = ((n = Object.getPrototypeOf),
        (i = Object),
        function(e) {
          return n(i(e));
        });
      e.exports = function(e) {
        if (
          !(function(e) {
            return !!e && "object" == typeof e;
          })(e) ||
          d.call(e) != r ||
          (function(e) {
            var t = !1;
            if (null != e && "function" != typeof e.toString)
              try {
                t = !!(e + "");
              } catch (e) {}
            return t;
          })(e)
        )
          return !1;
        var t = p(e);
        if (null === t) return !0;
        var n = c.call(t, "constructor") && t.constructor;
        return "function" == typeof n && n instanceof n && s.call(n) == u;
      };
    },
    function(e, t, r) {
      "use strict";
      var n = r(1),
        i = r(15),
        o = r(26).makeAutoPaginationMethods;
      e.exports = function(e) {
        return function() {
          var t = [].slice.call(arguments),
            r = "function" == typeof t[t.length - 1] && t.pop(),
            a = n.callbackifyPromiseWithTimeout(i(this, t, e, {}), r);
          if ("list" === e.methodType) {
            var s = o(this, t, e, a);
            Object.assign(a, s);
          }
          return a;
        };
      };
    },
    function(e, t, r) {
      "use strict";
      var n = r(1),
        i = /^optional!/;
      e.exports = function(e, t, r, o) {
        return new Promise(function(a, s) {
          try {
            var c = (function(e, t, r, o) {
              for (
                var a =
                    "function" == typeof r.path
                      ? r.path
                      : n.makeURLInterpolator(r.path || ""),
                  s = (r.method || "GET").toUpperCase(),
                  c = r.urlParams || [],
                  u =
                    r.encode ||
                    function(e) {
                      return e;
                    },
                  d = r.host,
                  p = [].slice.call(t),
                  l = e.createUrlData(),
                  h = 0,
                  f = c.length;
                h < f;
                ++h
              ) {
                var m,
                  v = p[0],
                  y = c[h],
                  g = i.test(y);
                if ("id" == (y = y.replace(i, "")) && "string" != typeof v)
                  throw ((m = e.createResourcePathWithSymbols(r.path)),
                  new Error(
                    'Stripe: "id" must be a string, but got: ' +
                      typeof v +
                      " (on API request to `" +
                      s +
                      " " +
                      m +
                      "`)",
                  ));
                if (!v) {
                  if (g) {
                    l[y] = "";
                    continue;
                  }
                  throw ((m = e.createResourcePathWithSymbols(r.path)),
                  new Error(
                    'Stripe: Argument "' +
                      c[h] +
                      '" required, but got: ' +
                      v +
                      " (on API request to `" +
                      s +
                      " " +
                      m +
                      "`)",
                  ));
                }
                l[y] = p.shift();
              }
              var I = n.getDataFromArgs(p),
                P = u(Object.assign(I, o)),
                E = n.getOptionsFromArgs(p);
              if (p.length)
                throw ((m = e.createResourcePathWithSymbols(r.path)),
                new Error(
                  "Stripe: Unknown arguments (" +
                    p +
                    "). Did you mean to pass an options object? See https://github.com/stripe/stripe-node/wiki/Passing-Options. (on API request to " +
                    s +
                    " `" +
                    m +
                    "`)",
                ));
              var b = e.createFullPath(a, l),
                S = Object.assign(E.headers, r.headers);
              return (
                r.validator && r.validator(P, { headers: S }),
                {
                  requestMethod: s,
                  requestPath: b,
                  data: P,
                  auth: E.auth,
                  headers: S,
                  host: d,
                }
              );
            })(e, t, r, o);
          } catch (e) {
            return void s(e);
          }
          e._request(
            c.requestMethod,
            c.host,
            c.requestPath,
            c.data,
            c.auth,
            { headers: c.headers },
            function(e, t) {
              e
                ? s(e)
                : a(r.transformResponseData ? r.transformResponseData(t) : t);
            },
          );
        });
      };
    },
    function(e, t, r) {
      const n = r(17),
        i = r(6);
      function o(e) {
        console.log(`[dotenv][DEBUG] ${e}`);
      }
      function a(e, t) {
        const r = Boolean(t && t.debug),
          n = {};
        return (
          e
            .toString()
            .split("\n")
            .forEach(function(e, t) {
              const i = e.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
              if (null != i) {
                const e = i[1];
                let t = i[2] || "";
                const r = t ? t.length : 0;
                r > 0 &&
                  '"' === t.charAt(0) &&
                  '"' === t.charAt(r - 1) &&
                  (t = t.replace(/\\n/gm, "\n")),
                  (t = t.replace(/(^['"]|['"]$)/g, "").trim()),
                  (n[e] = t);
              } else r && o(`did not match key and value when parsing line ${t + 1}: ${e}`);
            }),
          n
        );
      }
      function s(e) {
        let t = i.resolve(process.cwd(), ".env"),
          r = "utf8",
          s = !1;
        e &&
          (null != e.path && (t = e.path),
          null != e.encoding && (r = e.encoding),
          null != e.debug && (s = !0));
        try {
          const e = a(n.readFileSync(t, { encoding: r }), { debug: s });
          return (
            Object.keys(e).forEach(function(t) {
              process.env.hasOwnProperty(t)
                ? s &&
                  o(
                    `"${t}" is already defined in \`process.env\` and will not be overwritten`,
                  )
                : (process.env[t] = e[t]);
            }),
            { parsed: e }
          );
        } catch (e) {
          return { error: e };
        }
      }
      (e.exports.config = s), (e.exports.load = s), (e.exports.parse = a);
    },
    function(e, t) {
      e.exports = require("fs");
    },
    function(e, t, r) {
      "use strict";
      (c.DEFAULT_HOST = "api.stripe.com"),
        (c.DEFAULT_PORT = "443"),
        (c.DEFAULT_BASE_PATH = "/v1/"),
        (c.DEFAULT_API_VERSION = null),
        (c.DEFAULT_TIMEOUT = r(5).createServer().timeout),
        (c.PACKAGE_VERSION = r(19).version),
        (c.USER_AGENT = {
          bindings_version: c.PACKAGE_VERSION,
          lang: "node",
          lang_version: process.version,
          platform: process.platform,
          publisher: "stripe",
          uname: null,
        }),
        (c.USER_AGENT_SERIALIZED = null);
      var n = ["name", "version", "url", "partner_id"],
        i = r(7).EventEmitter,
        o = r(20).exec,
        a = r(21),
        s = {
          Account: r(8),
          Accounts: r(8),
          ApplePayDomains: r(28),
          ApplicationFees: r(29),
          Balance: r(30),
          BitcoinReceivers: r(31),
          Charges: r(32),
          CountrySpecs: r(33),
          Coupons: r(34),
          Customers: r(35),
          Disputes: r(36),
          EphemeralKeys: r(37),
          Events: r(38),
          ExchangeRates: r(39),
          Files: r(40),
          FileLinks: r(42),
          InvoiceItems: r(43),
          Invoices: r(44),
          IssuerFraudRecords: r(45),
          LoginLinks: r(46),
          OrderReturns: r(47),
          Orders: r(48),
          PaymentIntents: r(49),
          Payouts: r(50),
          Plans: r(51),
          Products: r(52),
          RecipientCards: r(53),
          Recipients: r(54),
          Refunds: r(55),
          Skus: r(56),
          Sources: r(57),
          SubscriptionItems: r(58),
          Subscriptions: r(59),
          ThreeDSecure: r(60),
          Tokens: r(61),
          Topups: r(62),
          Transfers: r(63),
          UsageRecords: r(64),
          UsageRecordSummaries: r(65),
          WebhookEndpoints: r(66),
          ApplicationFeeRefunds: r(67),
          ChargeRefunds: r(68),
          CustomerCards: r(69),
          CustomerSubscriptions: r(70),
          Persons: r(71),
          TransferReversals: r(72),
          Issuing: a("issuing", {
            Authorizations: r(73),
            Cardholders: r(74),
            Cards: r(75),
            Disputes: r(76),
            Transactions: r(77),
          }),
          Reporting: a("reporting", { ReportRuns: r(78), ReportTypes: r(79) }),
          Sigma: a("sigma", { ScheduledQueryRuns: r(80) }),
          Terminal: a("terminal", {
            ConnectionTokens: r(81),
            Locations: r(82),
            Readers: r(83),
          }),
        };
      function c(e, t) {
        if (!(this instanceof c)) return new c(e, t);
        Object.defineProperty(this, "_emitter", {
          value: new i(),
          enumerable: !1,
          configurable: !1,
          writeable: !1,
        }),
          (this.on = this._emitter.on.bind(this._emitter)),
          (this.off = this._emitter.removeListener.bind(this._emitter)),
          (this._api = {
            auth: null,
            host: c.DEFAULT_HOST,
            port: c.DEFAULT_PORT,
            basePath: c.DEFAULT_BASE_PATH,
            version: c.DEFAULT_API_VERSION,
            timeout: c.DEFAULT_TIMEOUT,
            agent: null,
            dev: !1,
          }),
          this._prepResources(),
          this.setApiKey(e),
          this.setApiVersion(t),
          (this.errors = r(3)),
          (this.webhooks = r(84));
      }
      (s.FileUploads = s.Files),
        (c.StripeResource = r(0)),
        (c.resources = s),
        (c.prototype = {
          setHost: function(e, t, r) {
            this._setApiField("host", e),
              t && this.setPort(t),
              r && this.setProtocol(r);
          },
          setProtocol: function(e) {
            this._setApiField("protocol", e.toLowerCase());
          },
          setPort: function(e) {
            this._setApiField("port", e);
          },
          setApiVersion: function(e) {
            e && this._setApiField("version", e);
          },
          setApiKey: function(e) {
            e && this._setApiField("auth", "Bearer " + e);
          },
          setTimeout: function(e) {
            this._setApiField("timeout", null == e ? c.DEFAULT_TIMEOUT : e);
          },
          setAppInfo: function(e) {
            if (e && "object" != typeof e)
              throw new Error("AppInfo must be an object.");
            if (e && !e.name) throw new Error("AppInfo.name is required");
            e = e || {};
            var t = n.reduce(function(t, r) {
              return "string" == typeof e[r] && ((t = t || {})[r] = e[r]), t;
            }, void 0);
            (c.USER_AGENT_SERIALIZED = void 0), (this._appInfo = t);
          },
          setHttpAgent: function(e) {
            this._setApiField("agent", e);
          },
          _setApiField: function(e, t) {
            this._api[e] = t;
          },
          getApiField: function(e) {
            return this._api[e];
          },
          getConstant: function(e) {
            return c[e];
          },
          getClientUserAgent: function(e) {
            if (c.USER_AGENT_SERIALIZED) return e(c.USER_AGENT_SERIALIZED);
            this.getClientUserAgentSeeded(c.USER_AGENT, function(t) {
              (c.USER_AGENT_SERIALIZED = t), e(c.USER_AGENT_SERIALIZED);
            });
          },
          getClientUserAgentSeeded: function(e, t) {
            var r = this;
            o("uname -a", function(n, i) {
              var o = {};
              for (var a in e) o[a] = encodeURIComponent(e[a]);
              (o.uname = encodeURIComponent(i) || "UNKNOWN"),
                r._appInfo && (o.application = r._appInfo),
                t(JSON.stringify(o));
            });
          },
          getAppInfoAsString: function() {
            if (!this._appInfo) return "";
            var e = this._appInfo.name;
            return (
              this._appInfo.version && (e += "/" + this._appInfo.version),
              this._appInfo.url && (e += " (" + this._appInfo.url + ")"),
              e
            );
          },
          _prepResources: function() {
            for (var e in s)
              this[e[0].toLowerCase() + e.substring(1)] = new s[e](this);
          },
        }),
        (e.exports = c),
        (e.exports.Stripe = c);
    },
    function(e) {
      e.exports = {
        name: "stripe",
        version: "6.15.1",
        description: "Stripe API wrapper",
        keywords: ["stripe", "payment processing", "credit cards", "api"],
        homepage: "https://github.com/stripe/stripe-node",
        author: "Stripe <support@stripe.com> (https://stripe.com/)",
        contributors: [
          "Ask Bjørn Hansen <ask@develooper.com> (http://www.askask.com/)",
          "Michelle Bu <michelle@stripe.com>",
          "Alex Sexton <alex@stripe.com>",
          "James Padolsey",
        ],
        repository: {
          type: "git",
          url: "git://github.com/stripe/stripe-node.git",
        },
        "bugs:": "https://github.com/stripe/stripe-node/issues",
        engines: { node: ">=4" },
        main: "lib/stripe.js",
        devDependencies: {
          chai: "~4.1.2",
          "chai-as-promised": "~7.1.1",
          coveralls: "^3.0.0",
          eslint: "^4.19.1",
          "eslint-plugin-chai-friendly": "^0.4.0",
          mocha: "~5.0.5",
          nyc: "^11.3.0",
        },
        dependencies: {
          "lodash.isplainobject": "^4.0.6",
          qs: "~6.5.1",
          "safe-buffer": "^5.1.1",
        },
        license: "MIT",
        scripts: {
          clean: "rm -rf ./.nyc_output ./node_modules/.cache ./coverage",
          mocha: "nyc mocha",
          test: "npm run lint && npm run mocha",
          lint: "eslint .",
          report: "nyc -r text -r lcov report",
          coveralls:
            "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
        },
      };
    },
    function(e, t) {
      e.exports = require("child_process");
    },
    function(e, t, r) {
      "use strict";
      function n(e, t) {
        for (var r in t) {
          var n = r[0].toLowerCase() + r.substring(1),
            i = new t[r](e);
          this[n] = i;
        }
      }
      (e.exports = function(e, t) {
        return function(e) {
          return new n(e, t);
        };
      }),
        (e.exports.ResourceNamespace = n);
    },
    function(e, t) {
      e.exports = require("buffer");
    },
    function(e, t, r) {
      "use strict";
      var n = r(24),
        i = r(25),
        o = r(11);
      e.exports = { formats: o, parse: i, stringify: n };
    },
    function(e, t, r) {
      "use strict";
      var n = r(10),
        i = r(11),
        o = {
          brackets: function(e) {
            return e + "[]";
          },
          indices: function(e, t) {
            return e + "[" + t + "]";
          },
          repeat: function(e) {
            return e;
          },
        },
        a = Date.prototype.toISOString,
        s = {
          delimiter: "&",
          encode: !0,
          encoder: n.encode,
          encodeValuesOnly: !1,
          serializeDate: function(e) {
            return a.call(e);
          },
          skipNulls: !1,
          strictNullHandling: !1,
        },
        c = function e(t, r, i, o, a, c, u, d, p, l, h, f) {
          var m = t;
          if ("function" == typeof u) m = u(r, m);
          else if (m instanceof Date) m = l(m);
          else if (null === m) {
            if (o) return c && !f ? c(r, s.encoder) : r;
            m = "";
          }
          if (
            "string" == typeof m ||
            "number" == typeof m ||
            "boolean" == typeof m ||
            n.isBuffer(m)
          )
            return c
              ? [h(f ? r : c(r, s.encoder)) + "=" + h(c(m, s.encoder))]
              : [h(r) + "=" + h(String(m))];
          var v,
            y = [];
          if (void 0 === m) return y;
          if (Array.isArray(u)) v = u;
          else {
            var g = Object.keys(m);
            v = d ? g.sort(d) : g;
          }
          for (var I = 0; I < v.length; ++I) {
            var P = v[I];
            (a && null === m[P]) ||
              (y = Array.isArray(m)
                ? y.concat(e(m[P], i(r, P), i, o, a, c, u, d, p, l, h, f))
                : y.concat(
                    e(
                      m[P],
                      r + (p ? "." + P : "[" + P + "]"),
                      i,
                      o,
                      a,
                      c,
                      u,
                      d,
                      p,
                      l,
                      h,
                      f,
                    ),
                  ));
          }
          return y;
        };
      e.exports = function(e, t) {
        var r = e,
          a = t ? n.assign({}, t) : {};
        if (
          null !== a.encoder &&
          void 0 !== a.encoder &&
          "function" != typeof a.encoder
        )
          throw new TypeError("Encoder has to be a function.");
        var u = void 0 === a.delimiter ? s.delimiter : a.delimiter,
          d =
            "boolean" == typeof a.strictNullHandling
              ? a.strictNullHandling
              : s.strictNullHandling,
          p = "boolean" == typeof a.skipNulls ? a.skipNulls : s.skipNulls,
          l = "boolean" == typeof a.encode ? a.encode : s.encode,
          h = "function" == typeof a.encoder ? a.encoder : s.encoder,
          f = "function" == typeof a.sort ? a.sort : null,
          m = void 0 !== a.allowDots && a.allowDots,
          v =
            "function" == typeof a.serializeDate
              ? a.serializeDate
              : s.serializeDate,
          y =
            "boolean" == typeof a.encodeValuesOnly
              ? a.encodeValuesOnly
              : s.encodeValuesOnly;
        if (void 0 === a.format) a.format = i.default;
        else if (!Object.prototype.hasOwnProperty.call(i.formatters, a.format))
          throw new TypeError("Unknown format option provided.");
        var g,
          I,
          P = i.formatters[a.format];
        "function" == typeof a.filter
          ? (r = (I = a.filter)("", r))
          : Array.isArray(a.filter) && (g = I = a.filter);
        var E,
          b = [];
        if ("object" != typeof r || null === r) return "";
        E =
          a.arrayFormat in o
            ? a.arrayFormat
            : "indices" in a
            ? a.indices
              ? "indices"
              : "repeat"
            : "indices";
        var S = o[E];
        g || (g = Object.keys(r)), f && g.sort(f);
        for (var T = 0; T < g.length; ++T) {
          var x = g[T];
          (p && null === r[x]) ||
            (b = b.concat(c(r[x], x, S, d, p, l ? h : null, I, f, m, v, P, y)));
        }
        var _ = b.join(u),
          O = !0 === a.addQueryPrefix ? "?" : "";
        return _.length > 0 ? O + _ : "";
      };
    },
    function(e, t, r) {
      "use strict";
      var n = r(10),
        i = Object.prototype.hasOwnProperty,
        o = {
          allowDots: !1,
          allowPrototypes: !1,
          arrayLimit: 20,
          decoder: n.decode,
          delimiter: "&",
          depth: 5,
          parameterLimit: 1e3,
          plainObjects: !1,
          strictNullHandling: !1,
        },
        a = function(e, t, r) {
          if (e) {
            var n = r.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e,
              o = /(\[[^[\]]*])/g,
              a = /(\[[^[\]]*])/.exec(n),
              s = a ? n.slice(0, a.index) : n,
              c = [];
            if (s) {
              if (
                !r.plainObjects &&
                i.call(Object.prototype, s) &&
                !r.allowPrototypes
              )
                return;
              c.push(s);
            }
            for (var u = 0; null !== (a = o.exec(n)) && u < r.depth; ) {
              if (
                ((u += 1),
                !r.plainObjects &&
                  i.call(Object.prototype, a[1].slice(1, -1)) &&
                  !r.allowPrototypes)
              )
                return;
              c.push(a[1]);
            }
            return (
              a && c.push("[" + n.slice(a.index) + "]"),
              (function(e, t, r) {
                for (var n = t, i = e.length - 1; i >= 0; --i) {
                  var o,
                    a = e[i];
                  if ("[]" === a) o = (o = []).concat(n);
                  else {
                    o = r.plainObjects ? Object.create(null) : {};
                    var s =
                        "[" === a.charAt(0) && "]" === a.charAt(a.length - 1)
                          ? a.slice(1, -1)
                          : a,
                      c = parseInt(s, 10);
                    !isNaN(c) &&
                    a !== s &&
                    String(c) === s &&
                    c >= 0 &&
                    r.parseArrays &&
                    c <= r.arrayLimit
                      ? ((o = [])[c] = n)
                      : (o[s] = n);
                  }
                  n = o;
                }
                return n;
              })(c, t, r)
            );
          }
        };
      e.exports = function(e, t) {
        var r = t ? n.assign({}, t) : {};
        if (
          null !== r.decoder &&
          void 0 !== r.decoder &&
          "function" != typeof r.decoder
        )
          throw new TypeError("Decoder has to be a function.");
        if (
          ((r.ignoreQueryPrefix = !0 === r.ignoreQueryPrefix),
          (r.delimiter =
            "string" == typeof r.delimiter || n.isRegExp(r.delimiter)
              ? r.delimiter
              : o.delimiter),
          (r.depth = "number" == typeof r.depth ? r.depth : o.depth),
          (r.arrayLimit =
            "number" == typeof r.arrayLimit ? r.arrayLimit : o.arrayLimit),
          (r.parseArrays = !1 !== r.parseArrays),
          (r.decoder = "function" == typeof r.decoder ? r.decoder : o.decoder),
          (r.allowDots =
            "boolean" == typeof r.allowDots ? r.allowDots : o.allowDots),
          (r.plainObjects =
            "boolean" == typeof r.plainObjects
              ? r.plainObjects
              : o.plainObjects),
          (r.allowPrototypes =
            "boolean" == typeof r.allowPrototypes
              ? r.allowPrototypes
              : o.allowPrototypes),
          (r.parameterLimit =
            "number" == typeof r.parameterLimit
              ? r.parameterLimit
              : o.parameterLimit),
          (r.strictNullHandling =
            "boolean" == typeof r.strictNullHandling
              ? r.strictNullHandling
              : o.strictNullHandling),
          "" === e || null == e)
        )
          return r.plainObjects ? Object.create(null) : {};
        for (
          var s =
              "string" == typeof e
                ? (function(e, t) {
                    for (
                      var r = {},
                        n = t.ignoreQueryPrefix ? e.replace(/^\?/, "") : e,
                        a =
                          t.parameterLimit === 1 / 0
                            ? void 0
                            : t.parameterLimit,
                        s = n.split(t.delimiter, a),
                        c = 0;
                      c < s.length;
                      ++c
                    ) {
                      var u,
                        d,
                        p = s[c],
                        l = p.indexOf("]="),
                        h = -1 === l ? p.indexOf("=") : l + 1;
                      -1 === h
                        ? ((u = t.decoder(p, o.decoder)),
                          (d = t.strictNullHandling ? null : ""))
                        : ((u = t.decoder(p.slice(0, h), o.decoder)),
                          (d = t.decoder(p.slice(h + 1), o.decoder))),
                        i.call(r, u)
                          ? (r[u] = [].concat(r[u]).concat(d))
                          : (r[u] = d);
                    }
                    return r;
                  })(e, r)
                : e,
            c = r.plainObjects ? Object.create(null) : {},
            u = Object.keys(s),
            d = 0;
          d < u.length;
          ++d
        ) {
          var p = u[d],
            l = a(p, s[p], r);
          c = n.merge(c, l, r);
        }
        return n.compact(c);
      };
    },
    function(e, t, r) {
      "use strict";
      var n = r(15),
        i = r(1);
      e.exports.makeAutoPaginationMethods = function(e, t, r, o) {
        var a = { currentPromise: null },
          s = o,
          c = 0;
        function u(i) {
          if (!i || !i.data || "number" != typeof i.data.length)
            throw Error(
              "Unexpected: Stripe API response does not have a well-formed `data` array.",
            );
          if (c < i.data.length) {
            var o = i.data[c];
            return (c += 1), { value: o, done: !1 };
          }
          if (i.has_more) {
            c = 0;
            var a = (function(e) {
              var t = e.data.length - 1,
                r = e.data[t],
                n = r && r.id;
              if (!n)
                throw Error(
                  "Unexpected: No `id` found on the last item while auto-paging a list.",
                );
              return n;
            })(i);
            return (s = n(e, t, r, { starting_after: a })).then(u);
          }
          return { value: void 0, done: !0 };
        }
        function d() {
          return (function(e, t) {
            return e.currentPromise
              ? e.currentPromise
              : ((e.currentPromise = new Promise(t).then(function(t) {
                  return (e.currentPromise = void 0), t;
                })),
                e.currentPromise);
          })(a, function(e, t) {
            return s
              .then(u)
              .then(e)
              .catch(t);
          });
        }
        var p = (function(e) {
            return function() {
              var t = [].slice.call(arguments),
                r = (function(e) {
                  if (0 !== e.length) {
                    var t = e[0];
                    if ("function" != typeof t)
                      throw Error(
                        "The first argument to autoPagingEach, if present, must be a callback function; receieved " +
                          typeof t,
                      );
                    if (2 === t.length) return t;
                    if (t.length > 2)
                      throw Error(
                        "The `onItem` callback function passed to autoPagingEach must accept at most two arguments; got " +
                          t,
                      );
                    return function(e, r) {
                      var n = t(e);
                      r(n);
                    };
                  }
                })(t),
                n = (function(e) {
                  if (!(e.length < 2)) {
                    var t = e[1];
                    if ("function" != typeof t)
                      throw Error(
                        "The second argument to autoPagingEach, if present, must be a callback function; receieved " +
                          typeof t,
                      );
                    return t;
                  }
                })(t);
              if (t.length > 2)
                throw Error(
                  "autoPagingEach takes up to two arguments; received:",
                  t,
                );
              var o = (function(e, t) {
                return new Promise(function(r, n) {
                  e()
                    .then(function n(i) {
                      if (!i.done) {
                        var o = i.value;
                        return new Promise(function(e) {
                          t(o, e);
                        }).then(function(t) {
                          return !1 === t ? n({ done: !0 }) : e().then(n);
                        });
                      }
                      r();
                    })
                    .catch(n);
                });
              })(e, r);
              return i.callbackifyPromiseWithTimeout(o, n);
            };
          })(d),
          l = (function(e) {
            return function(t, r) {
              var n = t && t.limit;
              if (!n)
                throw Error(
                  "You must pass a `limit` option to autoPagingToArray, eg; `autoPagingToArray({limit: 1000});`.",
                );
              if (n > 1e4)
                throw Error(
                  "You cannot specify a limit of more than 10,000 items to fetch in `autoPagingToArray`; use `autoPagingEach` to iterate through longer lists.",
                );
              var o = new Promise(function(t, r) {
                var i = [];
                e(function(e) {
                  if ((i.push(e), i.length >= n)) return !1;
                })
                  .then(function() {
                    t(i);
                  })
                  .catch(r);
              });
              return i.callbackifyPromiseWithTimeout(o, r);
            };
          })(p),
          h = {
            autoPagingEach: p,
            autoPagingToArray: l,
            next: d,
            return: function() {
              return {};
            },
            ["undefined" != typeof Symbol && Symbol.asyncIterator
              ? Symbol.asyncIterator
              : "@@asyncIterator"]: function() {
              return h;
            },
          };
        return h;
      };
    },
    function(e, t, r) {
      "use strict";
      var n = r(13),
        i = r(14),
        o = r(1);
      e.exports = {
        create: i({ method: "POST" }),
        list: i({ method: "GET", methodType: "list" }),
        retrieve: i({ method: "GET", path: "/{id}", urlParams: ["id"] }),
        update: i({ method: "POST", path: "{id}", urlParams: ["id"] }),
        del: i({ method: "DELETE", path: "{id}", urlParams: ["id"] }),
        setMetadata: function(e, t, r, i, a) {
          var s = this,
            c = t,
            u = n(t),
            d = null === c || (u && !Object.keys(c).length);
          (d || u) && "string" == typeof r
            ? (i = r)
            : "string" != typeof i &&
              (a || "function" != typeof i || (a = i), (i = null));
          var p = this.createUrlData(),
            l = this.createFullPath("/" + e, p);
          return o.callbackifyPromiseWithTimeout(
            new Promise(
              function(e, n) {
                if (d) a(null, i);
                else if (u)
                  this._request(
                    "POST",
                    null,
                    l,
                    { metadata: null },
                    i,
                    {},
                    function(e, t) {
                      if (e) return n(e);
                      a(c, i);
                    },
                  );
                else {
                  var o = {};
                  (o[t] = r), a(o, i);
                }
                function a(t, r) {
                  s._request("POST", null, l, { metadata: t }, r, {}, function(
                    t,
                    r,
                  ) {
                    t ? n(t) : e(r.metadata);
                  });
                }
              }.bind(this),
            ),
            a,
          );
        },
        getMetadata: function(e, t, r) {
          r || "function" != typeof t || ((r = t), (t = null));
          var n = this.createUrlData(),
            i = this.createFullPath("/" + e, n);
          return o.callbackifyPromiseWithTimeout(
            new Promise(
              function(e, r) {
                this._request("GET", null, i, {}, t, {}, function(t, n) {
                  t ? r(t) : e(n.metadata);
                });
              }.bind(this),
            ),
            r,
          );
        },
      };
    },
    function(e, t, r) {
      "use strict";
      e.exports = r(0).extend({
        path: "apple_pay/domains",
        includeBasic: ["create", "list", "retrieve", "del"],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        i = n.method;
      e.exports = n.extend({
        path: "application_fees",
        includeBasic: ["list", "retrieve"],
        refund: i({ method: "POST", path: "/{id}/refund", urlParams: ["id"] }),
        createRefund: i({
          method: "POST",
          path: "/{feeId}/refunds",
          urlParams: ["feeId"],
        }),
        listRefunds: i({
          method: "GET",
          path: "/{feeId}/refunds",
          urlParams: ["feeId"],
          methodType: "list",
        }),
        retrieveRefund: i({
          method: "GET",
          path: "/{feeId}/refunds/{refundId}",
          urlParams: ["feeId", "refundId"],
        }),
        updateRefund: i({
          method: "POST",
          path: "/{feeId}/refunds/{refundId}",
          urlParams: ["feeId", "refundId"],
        }),
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        i = n.method;
      e.exports = n.extend({
        path: "balance",
        retrieve: i({ method: "GET" }),
        listTransactions: i({
          method: "GET",
          path: "history",
          methodType: "list",
        }),
        retrieveTransaction: i({
          method: "GET",
          path: "history/{transactionId}",
          urlParams: ["transactionId"],
        }),
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        i = n.method;
      e.exports = n.extend({
        path: "bitcoin/receivers",
        includeBasic: ["list", "retrieve", "getMetadata"],
        listTransactions: i({
          method: "GET",
          path: "/{receiverId}/transactions",
          urlParams: ["receiverId"],
          methodType: "list",
        }),
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        i = n.method;
      e.exports = n.extend({
        path: "charges",
        includeBasic: [
          "create",
          "list",
          "retrieve",
          "update",
          "setMetadata",
          "getMetadata",
        ],
        capture: i({
          method: "POST",
          path: "/{id}/capture",
          urlParams: ["id"],
        }),
        refund: i({ method: "POST", path: "/{id}/refund", urlParams: ["id"] }),
        updateDispute: i({
          method: "POST",
          path: "/{id}/dispute",
          urlParams: ["id"],
        }),
        closeDispute: i({
          method: "POST",
          path: "/{id}/dispute/close",
          urlParams: ["id"],
        }),
        createRefund: i({
          method: "POST",
          path: "/{chargeId}/refunds",
          urlParams: ["chargeId"],
        }),
        listRefunds: i({
          method: "GET",
          path: "/{chargeId}/refunds",
          urlParams: ["chargeId"],
          methodType: "list",
        }),
        retrieveRefund: i({
          method: "GET",
          path: "/{chargeId}/refunds/{refundId}",
          urlParams: ["chargeId", "refundId"],
        }),
        updateRefund: i({
          method: "POST",
          path: "/{chargeId}/refunds/{refundId}",
          urlParams: ["chargeId", "refundId"],
        }),
        markAsSafe: function(e) {
          return this.update(e, { fraud_details: { user_report: "safe" } });
        },
        markAsFraudulent: function(e) {
          return this.update(e, {
            fraud_details: { user_report: "fraudulent" },
          });
        },
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.extend({
        path: "country_specs",
        includeBasic: ["list", "retrieve"],
      });
    },
    function(e, t, r) {
      "use strict";
      e.exports = r(0).extend({
        path: "coupons",
        includeBasic: ["create", "list", "update", "retrieve", "del"],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        i = r(1),
        o = n.method;
      e.exports = n.extend({
        path: "customers",
        includeBasic: [
          "create",
          "list",
          "retrieve",
          "update",
          "del",
          "setMetadata",
          "getMetadata",
        ],
        _legacyUpdateSubscription: o({
          method: "POST",
          path: "{customerId}/subscription",
          urlParams: ["customerId"],
        }),
        _newstyleUpdateSubscription: o({
          method: "POST",
          path: "/{customerId}/subscriptions/{subscriptionId}",
          urlParams: ["customerId", "subscriptionId"],
        }),
        _legacyCancelSubscription: o({
          method: "DELETE",
          path: "{customerId}/subscription",
          urlParams: ["customerId"],
        }),
        _newstyleCancelSubscription: o({
          method: "DELETE",
          path: "/{customerId}/subscriptions/{subscriptionId}",
          urlParams: ["customerId", "subscriptionId"],
        }),
        createSubscription: o({
          method: "POST",
          path: "/{customerId}/subscriptions",
          urlParams: ["customerId"],
        }),
        listSubscriptions: o({
          method: "GET",
          path: "/{customerId}/subscriptions",
          urlParams: ["customerId"],
          methodType: "list",
        }),
        retrieveSubscription: o({
          method: "GET",
          path: "/{customerId}/subscriptions/{subscriptionId}",
          urlParams: ["customerId", "subscriptionId"],
        }),
        updateSubscription: function(e, t) {
          return "string" == typeof t
            ? this._newstyleUpdateSubscription.apply(this, arguments)
            : this._legacyUpdateSubscription.apply(this, arguments);
        },
        cancelSubscription: function(e, t) {
          return "string" != typeof t || i.isAuthKey(t)
            ? this._legacyCancelSubscription.apply(this, arguments)
            : this._newstyleCancelSubscription.apply(this, arguments);
        },
        createCard: o({
          method: "POST",
          path: "/{customerId}/cards",
          urlParams: ["customerId"],
        }),
        listCards: o({
          method: "GET",
          path: "/{customerId}/cards",
          urlParams: ["customerId"],
          methodType: "list",
        }),
        retrieveCard: o({
          method: "GET",
          path: "/{customerId}/cards/{cardId}",
          urlParams: ["customerId", "cardId"],
        }),
        updateCard: o({
          method: "POST",
          path: "/{customerId}/cards/{cardId}",
          urlParams: ["customerId", "cardId"],
        }),
        deleteCard: o({
          method: "DELETE",
          path: "/{customerId}/cards/{cardId}",
          urlParams: ["customerId", "cardId"],
        }),
        createSource: o({
          method: "POST",
          path: "/{customerId}/sources",
          urlParams: ["customerId"],
        }),
        listSources: o({
          method: "GET",
          path: "/{customerId}/sources",
          urlParams: ["customerId"],
          methodType: "list",
        }),
        retrieveSource: o({
          method: "GET",
          path: "/{customerId}/sources/{sourceId}",
          urlParams: ["customerId", "sourceId"],
        }),
        updateSource: o({
          method: "POST",
          path: "/{customerId}/sources/{sourceId}",
          urlParams: ["customerId", "sourceId"],
        }),
        deleteSource: o({
          method: "DELETE",
          path: "/{customerId}/sources/{sourceId}",
          urlParams: ["customerId", "sourceId"],
        }),
        verifySource: o({
          method: "POST",
          path: "/{customerId}/sources/{sourceId}/verify",
          urlParams: ["customerId", "sourceId"],
        }),
        deleteDiscount: o({
          method: "DELETE",
          path: "/{customerId}/discount",
          urlParams: ["customerId"],
        }),
        deleteSubscriptionDiscount: o({
          method: "DELETE",
          path: "/{customerId}/subscriptions/{subscriptionId}/discount",
          urlParams: ["customerId", "subscriptionId"],
        }),
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        i = n.method;
      e.exports = n.extend({
        path: "disputes",
        includeBasic: [
          "list",
          "retrieve",
          "update",
          "setMetadata",
          "getMetadata",
        ],
        close: i({ method: "POST", path: "/{id}/close", urlParams: ["id"] }),
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        i = n.method;
      e.exports = n.extend({
        create: i({
          method: "POST",
          validator: function(e, t) {
            if (!t.headers || !t.headers["Stripe-Version"])
              throw new Error(
                "stripe_version must be specified to create an ephemeral key",
              );
          },
        }),
        path: "ephemeral_keys",
        includeBasic: ["del"],
      });
    },
    function(e, t, r) {
      "use strict";
      e.exports = r(0).extend({
        path: "events",
        includeBasic: ["list", "retrieve"],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.extend({
        path: "exchange_rates",
        includeBasic: ["list", "retrieve"],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(2).Buffer,
        i = r(1),
        o = r(0),
        a = o.method,
        s = r(41),
        c = r(3);
      e.exports = o.extend({
        requestDataProcessor: function(e, t, r, o) {
          return (
            (t = t || {}),
            "POST" === e
              ? (function(t) {
                  if (i.checkForStream(t)) return a(s);
                  var n = s(e, t, r);
                  return o(null, n);
                })(t)
              : o(null, i.stringifyRequestData(t))
          );
          function a(i) {
            var a = [];
            t.file.data
              .on("data", function(e) {
                a.push(e);
              })
              .on("end", function() {
                var s = Object.assign({}, t);
                s.file.data = n.concat(a);
                var c = i(e, s, r);
                o(null, c);
              })
              .on("error", function(e) {
                (function(e) {
                  var t = c.extend({
                    type: "StreamProcessingError",
                    populate: function(e) {
                      (this.type = this.type),
                        (this.message = e.message),
                        (this.detail = e.detail);
                    },
                  });
                  return function(r) {
                    e(
                      new t({
                        message:
                          "An error occurred while attempting to process the file for upload.",
                        detail: r,
                      }),
                      null,
                    );
                  };
                })(o)(e);
              });
          }
        },
        path: "files",
        create: a({
          method: "POST",
          headers: { "Content-Type": "multipart/form-data" },
          host: "files.stripe.com",
        }),
        list: a({ method: "GET" }),
        retrieve: a({ method: "GET", path: "/{id}", urlParams: ["id"] }),
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(2).Buffer;
      e.exports = function(e, t, r) {
        var i = (
          Math.round(1e16 * Math.random()) + Math.round(1e16 * Math.random())
        ).toString();
        r["Content-Type"] = "multipart/form-data; boundary=" + i;
        var o = new n(0);
        function a(e) {
          var t = o,
            r = e instanceof n ? e : new n(e);
          (o = new n(t.length + r.length + 2)),
            t.copy(o),
            r.copy(o, t.length),
            o.write("\r\n", o.length - 2);
        }
        function s(e) {
          return (
            '"' + e.replace(/"|"/g, "%22").replace(/\r\n|\r|\n/g, " ") + '"'
          );
        }
        for (var c in t) {
          var u = t[c];
          a("--" + i),
            u.hasOwnProperty("data")
              ? (a(
                  "Content-Disposition: form-data; name=" +
                    s(c) +
                    "; filename=" +
                    s(u.name || "blob"),
                ),
                a("Content-Type: " + (u.type || "application/octet-stream")),
                a(""),
                a(u.data))
              : (a("Content-Disposition: form-data; name=" + s(c)),
                a(""),
                a(u));
        }
        return a("--" + i + "--"), o;
      };
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.extend({
        path: "file_links",
        includeBasic: [
          "create",
          "list",
          "retrieve",
          "update",
          "setMetadata",
          "getMetadata",
        ],
      });
    },
    function(e, t, r) {
      "use strict";
      e.exports = r(0).extend({
        path: "invoiceitems",
        includeBasic: [
          "create",
          "list",
          "retrieve",
          "update",
          "del",
          "setMetadata",
          "getMetadata",
        ],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        i = n.method,
        o = r(1);
      e.exports = n.extend({
        path: "invoices",
        includeBasic: ["create", "list", "retrieve", "update", "del"],
        finalizeInvoice: i({
          method: "POST",
          path: "{invoiceId}/finalize",
          urlParams: ["invoiceId"],
        }),
        markUncollectible: i({
          method: "POST",
          path: "{invoiceId}/mark_uncollectible",
          urlParams: ["invoiceId"],
        }),
        pay: i({
          method: "POST",
          path: "{invoiceId}/pay",
          urlParams: ["invoiceId"],
        }),
        retrieveLines: i({
          method: "GET",
          path: "{invoiceId}/lines",
          urlParams: ["invoiceId"],
        }),
        retrieveUpcoming: i({
          method: "GET",
          path: function(e) {
            var t = "upcoming?customer=" + e.customerId;
            return e.invoiceOptions && "string" == typeof e.invoiceOptions
              ? t + "&subscription=" + e.invoiceOptions
              : e.invoiceOptions && "object" == typeof e.invoiceOptions
              ? (void 0 !== e.invoiceOptions.subscription_items &&
                  (e.invoiceOptions.subscription_items = o.arrayToObject(
                    e.invoiceOptions.subscription_items,
                  )),
                t + "&" + o.stringifyRequestData(e.invoiceOptions))
              : t;
          },
          urlParams: ["customerId", "optional!invoiceOptions"],
          encode: o.encodeParamWithIntegerIndexes.bind(
            null,
            "subscription_items",
          ),
        }),
        sendInvoice: i({
          method: "POST",
          path: "{invoiceId}/send",
          urlParams: ["invoiceId"],
        }),
        voidInvoice: i({
          method: "POST",
          path: "{invoiceId}/void",
          urlParams: ["invoiceId"],
        }),
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.extend({
        path: "issuer_fraud_records",
        includeBasic: ["list", "retrieve"],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.extend({
        path: "accounts/{accountId}/login_links",
        includeBasic: ["create"],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.extend({
        path: "order_returns",
        includeBasic: ["list", "retrieve"],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        i = n.method;
      e.exports = n.extend({
        path: "orders",
        includeBasic: ["create", "list", "retrieve", "update"],
        pay: i({
          method: "POST",
          path: "/{orderId}/pay",
          urlParams: ["orderId"],
        }),
        returnOrder: i({
          method: "POST",
          path: "/{orderId}/returns",
          urlParams: ["orderId"],
        }),
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        i = n.method;
      e.exports = n.extend({
        path: "payment_intents",
        includeBasic: ["create", "list", "retrieve", "update"],
        cancel: i({
          method: "POST",
          path: "{paymentIntentId}/cancel",
          urlParams: ["paymentIntentId"],
        }),
        capture: i({
          method: "POST",
          path: "{paymentIntentId}/capture",
          urlParams: ["paymentIntentId"],
        }),
        confirm: i({
          method: "POST",
          path: "{paymentIntentId}/confirm",
          urlParams: ["paymentIntentId"],
        }),
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        i = n.method;
      e.exports = n.extend({
        path: "payouts",
        includeBasic: [
          "create",
          "list",
          "retrieve",
          "update",
          "setMetadata",
          "getMetadata",
        ],
        cancel: i({
          method: "POST",
          path: "{payoutId}/cancel",
          urlParams: ["payoutId"],
        }),
        listTransactions: i({
          method: "GET",
          path: "{payoutId}/transactions",
          urlParams: ["payoutId"],
          methodType: "list",
        }),
      });
    },
    function(e, t, r) {
      "use strict";
      e.exports = r(0).extend({
        path: "plans",
        includeBasic: ["create", "list", "retrieve", "update", "del"],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.extend({
        path: "products",
        includeBasic: ["create", "list", "retrieve", "update", "del"],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.extend({
        path: "recipients/{recipientId}/cards",
        includeBasic: ["create", "list", "retrieve", "update", "del"],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        i = n.method;
      e.exports = n.extend({
        path: "recipients",
        includeBasic: [
          "create",
          "list",
          "retrieve",
          "update",
          "del",
          "setMetadata",
          "getMetadata",
        ],
        createCard: i({
          method: "POST",
          path: "/{recipientId}/cards",
          urlParams: ["recipientId"],
        }),
        listCards: i({
          method: "GET",
          path: "/{recipientId}/cards",
          urlParams: ["recipientId"],
          methodType: "list",
        }),
        retrieveCard: i({
          method: "GET",
          path: "/{recipientId}/cards/{cardId}",
          urlParams: ["recipientId", "cardId"],
        }),
        updateCard: i({
          method: "POST",
          path: "/{recipientId}/cards/{cardId}",
          urlParams: ["recipientId", "cardId"],
        }),
        deleteCard: i({
          method: "DELETE",
          path: "/{recipientId}/cards/{cardId}",
          urlParams: ["recipientId", "cardId"],
        }),
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.extend({
        path: "refunds",
        includeBasic: ["create", "list", "retrieve", "update"],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.extend({
        path: "skus",
        includeBasic: ["create", "list", "retrieve", "update", "del"],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        i = n.method;
      e.exports = n.extend({
        path: "sources",
        includeBasic: [
          "create",
          "retrieve",
          "update",
          "setMetadata",
          "getMetadata",
        ],
        listSourceTransactions: i({
          method: "GET",
          path: "/{id}/source_transactions",
          urlParams: ["id"],
          methodType: "list",
        }),
        verify: i({ method: "POST", path: "/{id}/verify", urlParams: ["id"] }),
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.extend({
        path: "subscription_items",
        includeBasic: ["create", "list", "retrieve", "update", "del"],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        i = r(1),
        o = n.method;
      e.exports = n.extend({
        path: "subscriptions",
        includeBasic: ["list", "retrieve", "del"],
        create: o({
          method: "POST",
          encode: i.encodeParamWithIntegerIndexes.bind(null, "items"),
        }),
        update: o({
          method: "POST",
          path: "{id}",
          urlParams: ["id"],
          encode: i.encodeParamWithIntegerIndexes.bind(null, "items"),
        }),
        deleteDiscount: o({
          method: "DELETE",
          path: "/{subscriptionId}/discount",
          urlParams: ["subscriptionId"],
        }),
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.extend({
        path: "3d_secure",
        includeBasic: ["create", "retrieve"],
      });
    },
    function(e, t, r) {
      "use strict";
      e.exports = r(0).extend({
        path: "tokens",
        includeBasic: ["create", "retrieve"],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        i = n.method;
      e.exports = n.extend({
        path: "topups",
        includeBasic: [
          "create",
          "list",
          "retrieve",
          "update",
          "setMetadata",
          "getMetadata",
        ],
        cancel: i({
          method: "POST",
          path: "{topupId}/cancel",
          urlParams: ["topupId"],
        }),
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        i = n.method;
      e.exports = n.extend({
        path: "transfers",
        includeBasic: [
          "create",
          "list",
          "retrieve",
          "update",
          "setMetadata",
          "getMetadata",
        ],
        reverse: i({
          method: "POST",
          path: "/{transferId}/reversals",
          urlParams: ["transferId"],
        }),
        cancel: i({
          method: "POST",
          path: "{transferId}/cancel",
          urlParams: ["transferId"],
        }),
        listTransactions: i({
          method: "GET",
          path: "{transferId}/transactions",
          urlParams: ["transferId"],
          methodType: "list",
        }),
        createReversal: i({
          method: "POST",
          path: "/{transferId}/reversals",
          urlParams: ["transferId"],
        }),
        listReversals: i({
          method: "GET",
          path: "/{transferId}/reversals",
          urlParams: ["transferId"],
          methodType: "list",
        }),
        retrieveReversal: i({
          method: "GET",
          path: "/{transferId}/reversals/{reversalId}",
          urlParams: ["transferId", "reversalId"],
        }),
        updateReversal: i({
          method: "POST",
          path: "/{transferId}/reversals/{reversalId}",
          urlParams: ["transferId", "reversalId"],
        }),
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        i = n.method;
      e.exports = n.extend({
        path: "subscription_items",
        create: i({
          method: "POST",
          path: "{subscriptionItem}/usage_records",
          urlParams: ["subscriptionItem"],
        }),
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        i = n.method;
      e.exports = n.extend({
        path: "subscription_items",
        list: i({
          method: "GET",
          path: "{subscriptionItem}/usage_record_summaries",
          urlParams: ["subscriptionItem"],
          methodType: "list",
        }),
      });
    },
    function(e, t, r) {
      "use strict";
      e.exports = r(0).extend({
        path: "webhook_endpoints",
        includeBasic: ["create", "list", "update", "retrieve", "del"],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.extend({
        path: "application_fees/{feeId}/refunds",
        includeBasic: ["create", "list", "retrieve", "update"],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.extend({
        path: "charges/{chargeId}/refunds",
        includeBasic: ["create", "list", "retrieve", "update"],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.extend({
        path: "customers/{customerId}/cards",
        includeBasic: ["create", "list", "retrieve", "update", "del"],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        i = n.method;
      e.exports = n.extend({
        path: "customers/{customerId}/subscriptions",
        includeBasic: ["create", "list", "retrieve", "update", "del"],
        deleteDiscount: i({
          method: "DELETE",
          path: "/{subscriptionId}/discount",
          urlParams: ["customerId", "subscriptionId"],
        }),
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.extend({
        path: "accounts/{accountId}/persons",
        includeBasic: ["create", "del", "list", "retrieve", "update"],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.extend({
        path: "transfers/{transferId}/reversals",
        includeBasic: ["create", "list", "retrieve", "update"],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        i = n.method;
      e.exports = n.extend({
        path: "issuing/authorizations",
        includeBasic: [
          "list",
          "retrieve",
          "update",
          "setMetadata",
          "getMetadata",
        ],
        approve: i({
          method: "POST",
          path: "/{id}/approve",
          urlParams: ["id"],
        }),
        decline: i({
          method: "POST",
          path: "/{id}/decline",
          urlParams: ["id"],
        }),
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.extend({
        path: "issuing/cardholders",
        includeBasic: [
          "create",
          "list",
          "retrieve",
          "update",
          "setMetadata",
          "getMetadata",
        ],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0),
        i = n.method;
      e.exports = n.extend({
        path: "issuing/cards",
        includeBasic: [
          "create",
          "list",
          "retrieve",
          "update",
          "setMetadata",
          "getMetadata",
        ],
        retrieveDetails: i({
          method: "GET",
          path: "/{id}/details",
          urlParams: ["id"],
        }),
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.extend({
        path: "issuing/disputes",
        includeBasic: [
          "create",
          "list",
          "retrieve",
          "update",
          "setMetadata",
          "getMetadata",
        ],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.extend({
        path: "issuing/transactions",
        includeBasic: [
          "list",
          "retrieve",
          "update",
          "setMetadata",
          "getMetadata",
        ],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.extend({
        path: "reporting/report_runs",
        includeBasic: ["create", "list", "retrieve"],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.extend({
        path: "reporting/report_types",
        includeBasic: ["list", "retrieve"],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.extend({
        path: "sigma/scheduled_query_runs",
        includeBasic: ["list", "retrieve"],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.extend({
        path: "terminal/connection_tokens",
        includeBasic: ["create"],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.extend({
        path: "terminal/locations",
        includeBasic: ["create", "list", "retrieve", "update"],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(0);
      e.exports = n.extend({
        path: "terminal/readers",
        includeBasic: ["create", "list", "retrieve", "update"],
      });
    },
    function(e, t, r) {
      "use strict";
      var n = r(2).Buffer,
        i = r(12),
        o = r(1),
        a = r(3),
        s = {
          DEFAULT_TOLERANCE: 300,
          constructEvent: function(e, t, r, n) {
            return (
              this.signature.verifyHeader(e, t, r, n || s.DEFAULT_TOLERANCE),
              JSON.parse(e)
            );
          },
        },
        c = {
          EXPECTED_SCHEME: "v1",
          _computeSignature: function(e, t) {
            return i
              .createHmac("sha256", t)
              .update(e, "utf8")
              .digest("hex");
          },
          verifyHeader: function(e, t, r, i) {
            e = n.isBuffer(e) ? e.toString("utf8") : e;
            var s = (function(e, t) {
              if ("string" != typeof e) return null;
              return e.split(",").reduce(
                function(e, r) {
                  var n = r.split("=");
                  return (
                    "t" === n[0] && (e.timestamp = n[1]),
                    n[0] === t && e.signatures.push(n[1]),
                    e
                  );
                },
                { timestamp: -1, signatures: [] },
              );
            })(
              (t = n.isBuffer(t) ? t.toString("utf8") : t),
              this.EXPECTED_SCHEME,
            );
            if (!s || -1 === s.timestamp)
              throw new a.StripeSignatureVerificationError({
                message:
                  "Unable to extract timestamp and signatures from header",
                detail: { header: t, payload: e },
              });
            if (!s.signatures.length)
              throw new a.StripeSignatureVerificationError({
                message: "No signatures found with expected scheme",
                detail: { header: t, payload: e },
              });
            var c = this._computeSignature(s.timestamp + "." + e, r);
            if (!!!s.signatures.filter(o.secureCompare.bind(o, c)).length)
              throw new a.StripeSignatureVerificationError({
                message:
                  "No signatures found matching the expected signature for payload. Are you passing the raw request body you received from Stripe? https://github.com/stripe/stripe-node#webhook-signing",
                detail: { header: t, payload: e },
              });
            var u = Math.floor(Date.now() / 1e3) - s.timestamp;
            if (i > 0 && u > i)
              throw new a.StripeSignatureVerificationError({
                message: "Timestamp outside the tolerance zone",
                detail: { header: t, payload: e },
              });
            return !0;
          },
        };
      (s.signature = c), (e.exports = s);
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function(e, t, r) {
      "use strict";
      r(16).config(), console.log(process.env.SK);
      const n = r(18)(process.env.SK),
        i = {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        };
      t.handler = function(e, t, r) {
        ("POST" === e.httpMethod && e.body) ||
          r(null, { statusCode: 200, headers: i, body: "" });
        const o = JSON.parse(e.body);
        if ((console.log(o), !o.token || !o.amount || !o.idempotency_key))
          return (
            console.error("Required information is missing."),
            void r(null, {
              statusCode: 200,
              headers: i,
              body: JSON.stringify({ status: "missing-information" }),
            })
          );
        n.charges.create(
          {
            currency: "usd",
            amount: o.amount,
            source: o.token.id,
            receipt_email: o.token.email,
            description: "a sample test charge",
          },
          { idempotency_key: o.idempotency_key },
          (e, t) => {
            null !== e && console.log(e);
            let n =
              null === t || "succeeded" !== t.status ? "failed" : t.status;
            r(null, {
              statusCode: 200,
              headers: i,
              body: JSON.stringify({ status: n }),
            });
          },
        );
      };
    },
  ]),
);
