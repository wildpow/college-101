!(function(e, n) {
  for (var t in n) e[t] = n[t];
})(
  exports,
  (function(e) {
    var n = {};
    function t(r) {
      if (n[r]) return n[r].exports;
      var o = (n[r] = { i: r, l: !1, exports: {} });
      return e[r].call(o.exports, o, o.exports, t), (o.l = !0), o.exports;
    }
    return (
      (t.m = e),
      (t.c = n),
      (t.d = function(e, n, r) {
        t.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: r });
      }),
      (t.r = function(e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (t.t = function(e, n) {
        if ((1 & n && (e = t(e)), 8 & n)) return e;
        if (4 & n && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (
          (t.r(r),
          Object.defineProperty(r, "default", { enumerable: !0, value: e }),
          2 & n && "string" != typeof e)
        )
          for (var o in e)
            t.d(
              r,
              o,
              function(n) {
                return e[n];
              }.bind(null, o),
            );
        return r;
      }),
      (t.n = function(e) {
        var n =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return t.d(n, "a", n), n;
      }),
      (t.o = function(e, n) {
        return Object.prototype.hasOwnProperty.call(e, n);
      }),
      (t.p = ""),
      t((t.s = 97))
    );
  })({
    97: function(e, n, t) {
      "use strict";
      function r(e, n, t, r, o, u, i) {
        try {
          var c = e[u](i),
            f = c.value;
        } catch (e) {
          return void t(e);
        }
        c.done ? n(f) : Promise.resolve(f).then(r, o);
      }
      const { GREETING: o } = process.env;
      n.handler = (function() {
        var e = (function(e) {
          return function() {
            var n = this,
              t = arguments;
            return new Promise(function(o, u) {
              var i = e.apply(n, t);
              function c(e) {
                r(i, o, u, c, f, "next", e);
              }
              function f(e) {
                r(i, o, u, c, f, "throw", e);
              }
              c(void 0);
            });
          };
        })(function*(e, n) {
          return { statusCode: 200, body: o };
        });
        return function(n, t) {
          return e.apply(this, arguments);
        };
      })();
    },
  }),
);
