! function(t) {
    function i(t, r) {
        var s = t.data("settings");
        "undefined" == typeof r && (r = !1), r && n(t);
        var a = e(t);
        t.animate(a.css, a.time, "linear", function() {
            t.css(s.direction, "0"), i(t, !0)
        })
    }

    function e(t) {
        var i = t.data("settings"),
            e = t.children().first(),
            n = Math.abs(-t.css(i.direction).replace("px", "").replace("auto", "0") - e.outerWidth(!0)),
            i = t.data("settings"),
            r = 1e3 * n / i.speed,
            s = {};
        return s[i.direction] = t.css(i.direction).replace("px", "").replace("auto", "0") - n, {
            css: s,
            time: r
        }
    }

    function n(t) {
        var i = t.data("settings");
        t.css("transition-duration", "0s").css(i.direction, "0");
        var e = t.children().first();
        e.hasClass("webticker-init") ? e.remove() : t.children().last().after(e)
    }

    function r(t, i) {
        "undefined" == typeof i && (i = !1), i && n(t);
        var r = e(t),
            s = r.time / 1e3;
        s += "s", t.css(r.css).css("transition-duration", s)
    }

    function s(i, e, n) {
        var r;
        t.get(i, function(i) {
            var s = t(i);
            s.find("item").each(function() {
                var i = t(this),
                    e = {
                        title: i.find("title").text(),
                        link: i.find("link").text()
                    };
                listItem = "<li><a href='" + e.link + "'>" + e.title + "</a></li>", r += listItem
            }), n.webTicker("update", r, e)
        })
    }

    function a(i) {
        var e = i.data("settings");
        i.width("auto");
        var n = 0;
        if (i.children("li").each(function() {
                n += t(this).outerWidth(!0)
            }), n < i.parent().width() || 1 == i.children().length)
            if (e.duplicate)
                for (itemWidth = Math.max.apply(Math, i.children().map(function() {
                        return t(this).width()
                    }).get()); n - itemWidth < i.parent().width() || 1 == i.children().length;) {
                    var r = i.children().clone();
                    i.append(r), n = 0, i.children("li").each(function() {
                        n += t(this).outerWidth(!0)
                    }), itemWidth = Math.max.apply(Math, i.children().map(function() {
                        return t(this).width()
                    }).get())
                } else {
                    var s = i.parent().width() - n;
                    s += i.find("li:first").width();
                    var a = i.find("li:first").height();
                    i.append('<li class="ticker-spacer" style="width:' + s + "px;height:" + a + 'px;"></li>')
                }
            if (e.startEmpty) {
                var a = i.find("li:first").height();
                i.prepend('<li class="webticker-init" style="width:' + i.parent().width() + "px;height:" + a + 'px;"></li>')
            }
        for (n = 0, i.children("li").each(function() {
                n += t(this).outerWidth(!0)
            }), i.width(n + 200), widthCompare = 0, i.children("li").each(function() {
                widthCompare += t(this).outerWidth(!0)
            }); widthCompare >= i.width();) i.width(i.width() + 200), widthCompare = 0, i.children("li").each(function() {
            widthCompare += t(this).outerWidth(!0)
        })
    }
    var c = function() {
            var t = document.createElement("p").style,
                i = ["ms", "O", "Moz", "Webkit"];
            if ("" == t.transition) return !0;
            for (; i.length;)
                if (i.pop() + "Transition" in t) return !0;
            return !1
        }(),
        d = {
            init: function(e) {
                return e = jQuery.extend({
                    speed: 50,
                    direction: "left",
                    moving: !0,
                    startEmpty: !0,
                    duplicate: !1,
                    rssurl: !1,
                    hoverpause: !0,
                    rssfrequency: 0,
                    updatetype: "reset"
                }, e), this.each(function() {
                    jQuery(this).data("settings", e);
                    var n = jQuery(this);
                    n.addClass("newsticker"), n.css("display", "block");
                    var d = n.wrap("<div class='mask'></div>");
                    d.after("<span class='tickeroverlay-left'>&nbsp;</span><span class='tickeroverlay-right'>&nbsp;</span>");
                    n.parent().wrap("<div class='tickercontainer'></div>");
                    a(n), e.rssurl && (s(e.rssurl, e.type, n), e.rssfrequency > 0 && window.setInterval(function() {
                        s(e.rssurl, e.type, n)
                    }, 1e3 * e.rssfrequency * 60)), c ? (n.css("transition-duration", "0s").css(e.direction, "0"), r(n, !1), n.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend", function(i) {
                        return n.is(i.target) ? void r(t(this), !0) : !1
                    })) : i(t(this)), e.hoverpause && n.hover(function() {
                        if (c) {
                            var i = t(this).css(e.direction);
                            t(this).css("transition-duration", "0s").css(e.direction, i)
                        } else jQuery(this).stop()
                    }, function() {
                        jQuery(this).data("settings").moving && (c ? r(t(this), !1) : i(n))
                    })
                })
            },
            stop: function() {
                var i = t(this).data("settings");
                return i.moving ? (i.moving = !1, this.each(function() {
                    if (c) {
                        var e = t(this).css(i.direction);
                        t(this).css("transition-duration", "0s").css(i.direction, e)
                    } else t(this).stop()
                })) : void 0
            },
            cont: function() {
                var e = t(this).data("settings");
                return e.moving ? void 0 : (e.moving = !0, this.each(function() {
                    c ? r(t(this), !1) : i(t(this))
                }))
            },
            update: function(i, e, n, r) {
                e = e || "reset", "undefined" == typeof n && (n = !0), "undefined" == typeof r && (r = !1), "string" == typeof i && (i = t(i));
                var s = t(this);
                s.webTicker("stop");
                var c = t(this).data("settings");
                if ("reset" == e) s.html(i), s.css(c.direction, "0"), a(s);
                else if ("swap" == e) {
                    s.children("li").addClass("old");
                    for (var d = 0; d < i.length; d++) id = t(i[d]).data("update"), match = s.find('[data-update="' + id + '"]'), match.length < 1 ? n && (0 == s.find(".ticker-spacer:first-child").length && s.find(".ticker-spacer").length > 0 ? s.children("li.ticker-spacer").before(i[d]) : s.append(i[d])) : s.find('[data-update="' + id + '"]').replaceWith(i[d]);
                    s.children("li.webticker-init, li.ticker-spacer").removeClass("old"), r && s.children("li").remove(".old"), stripWidth = 0, s.children("li").each(function() {
                        stripWidth += t(this).outerWidth(!0)
                    }), s.width(stripWidth + 200)
                }
                s.webTicker("cont")
            }
        };
    t.fn.webTicker = function(i) {
        return d[i] ? d[i].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof i && i ? void t.error("Method " + i + " does not exist on jQuery.webTicker") : d.init.apply(this, arguments)
    }
}(jQuery);