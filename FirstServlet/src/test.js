/*! jQuery v1.7.2 jquery.com | jquery.org/license */

function load_box(target) {
    $.ajax(target.data("uri"), {
        success: function (data, textStatus, jqXHR) {
            target.empty().append(data)
        },
        dataType: "html"
    })
}

function bind_box_edit(target) {
    var box = $("#" + target.data("box-id"));
    target.find("a").on("ajax:success", function (xhr, data, status) {
        box.empty().append(data), bind_box_form(box)
    })
}

function bind_box_form(target) {
    target.find("form.change_settings").on("ajax:success", function (xhr, data, status) {
        target.data("uri", data.uri), load_box(target)
    }), bind_box_type(target)
}

function bind_box_type(target) {
    target.find("form.change_type").on("ajax:success", function (xhr, data, status) {
        target.empty().append(data), bind_box_form(target)
    })
}(function (a, b) {
        function cy(a) {
            return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
        }

        function cu(a) {
            if (!cj[a]) {
                var b = c.body,
                    d = f("<" + a + ">").appendTo(b),
                    e = d.css("display");
                d.remove();
                if (e === "none" || e === "") {
                    ck || (ck = c.createElement("iframe"), ck.frameBorder = ck.width = ck.height = 0), b.appendChild(ck);
                    if (!cl || !ck.createElement) cl = (ck.contentWindow || ck.contentDocument).document, cl.write((f.support.boxModel ? "<!doctype html>" : "") + "<html><body>"), cl.close();
                    d = cl.createElement(a), cl.body.appendChild(d), e = f.css(d, "display"), b.removeChild(ck)
                }
                cj[a] = e
            }
            return cj[a]
        }

        function ct(a, b) {
            var c = {};
            return f.each(cp.concat.apply([], cp.slice(0, b)), function () {
                c[this] = a
            }), c
        }

        function cs() {
            cq = b
        }

        function cr() {
            return setTimeout(cs, 0), cq = f.now()
        }

        function ci() {
            try {
                return new a.ActiveXObject("Microsoft.XMLHTTP")
            } catch (b) {}
        }

        function ch() {
            try {
                return new a.XMLHttpRequest
            } catch (b) {}
        }

        function cb(a, c) {
            a.dataFilter && (c = a.dataFilter(c, a.dataType));
            var d = a.dataTypes,
                e = {}, g, h, i = d.length,
                j, k = d[0],
                l, m, n, o, p;
            for (g = 1; g < i; g++) {
                if (g === 1)
                    for (h in a.converters) typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
                l = k, k = d[g];
                if (k === "*") k = l;
                else if (l !== "*" && l !== k) {
                    m = l + " " + k, n = e[m] || e["* " + k];
                    if (!n) {
                        p = b;
                        for (o in e) {
                            j = o.split(" ");
                            if (j[0] === l || j[0] === "*") {
                                p = e[j[1] + " " + k];
                                if (p) {
                                    o = e[o], o === !0 ? n = p : p === !0 && (n = o);
                                    break
                                }
                            }
                        }
                    }!n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)))
                }
            }
            return c
        }

        function ca(a, c, d) {
            var e = a.contents,
                f = a.dataTypes,
                g = a.responseFields,
                h, i, j, k;
            for (i in g) i in d && (c[g[i]] = d[i]);
            while (f[0] === "*") f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
            if (h)
                for (i in e)
                    if (e[i] && e[i].test(h)) {
                        f.unshift(i);
                        break
                    }
            if (f[0] in d) j = f[0];
            else {
                for (i in d) {
                    if (!f[0] || a.converters[i + " " + f[0]]) {
                        j = i;
                        break
                    }
                    k || (k = i)
                }
                j = j || k
            } if (j) return j !== f[0] && f.unshift(j), d[j]
        }

        function b_(a, b, c, d) {
            if (f.isArray(b)) f.each(b, function (b, e) {
                c || bD.test(a) ? d(a, e) : b_(a + "[" + (typeof e == "object" ? b : "") + "]", e, c, d)
            });
            else if (!c && f.type(b) === "object")
                for (var e in b) b_(a + "[" + e + "]", b[e], c, d);
            else d(a, b)
        }

        function b$(a, c) {
            var d, e, g = f.ajaxSettings.flatOptions || {};
            for (d in c) c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d]);
            e && f.extend(!0, a, e)
        }

        function bZ(a, c, d, e, f, g) {
            f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
            var h = a[f],
                i = 0,
                j = h ? h.length : 0,
                k = a === bS,
                l;
            for (; i < j && (k || !l); i++) l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = bZ(a, c, d, e, l, g)));
            return (k || !l) && !g["*"] && (l = bZ(a, c, d, e, "*", g)), l
        }

        function bY(a) {
            return function (b, c) {
                typeof b != "string" && (c = b, b = "*");
                if (f.isFunction(c)) {
                    var d = b.toLowerCase().split(bO),
                        e = 0,
                        g = d.length,
                        h, i, j;
                    for (; e < g; e++) h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c)
                }
            }
        }

        function bB(a, b, c) {
            var d = b === "width" ? a.offsetWidth : a.offsetHeight,
                e = b === "width" ? 1 : 0,
                g = 4;
            if (d > 0) {
                if (c !== "border")
                    for (; e < g; e += 2) c || (d -= parseFloat(f.css(a, "padding" + bx[e])) || 0), c === "margin" ? d += parseFloat(f.css(a, c + bx[e])) || 0 : d -= parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0;
                return d + "px"
            }
            d = by(a, b);
            if (d < 0 || d == null) d = a.style[b];
            if (bt.test(d)) return d;
            d = parseFloat(d) || 0;
            if (c)
                for (; e < g; e += 2) d += parseFloat(f.css(a, "padding" + bx[e])) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0), c === "margin" && (d += parseFloat(f.css(a, c + bx[e])) || 0);
            return d + "px"
        }

        function bo(a) {
            var b = c.createElement("div");
            return bh.appendChild(b), b.innerHTML = a.outerHTML, b.firstChild
        }

        function bn(a) {
            var b = (a.nodeName || "").toLowerCase();
            b === "input" ? bm(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bm)
        }

        function bm(a) {
            if (a.type === "checkbox" || a.type === "radio") a.defaultChecked = a.checked
        }

        function bl(a) {
            return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
        }

        function bk(a, b) {
            var c;
            b.nodeType === 1 && (b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase(), c === "object" ? b.outerHTML = a.outerHTML : c !== "input" || a.type !== "checkbox" && a.type !== "radio" ? c === "option" ? b.selected = a.defaultSelected : c === "input" || c === "textarea" ? b.defaultValue = a.defaultValue : c === "script" && b.text !== a.text && (b.text = a.text) : (a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value)), b.removeAttribute(f.expando), b.removeAttribute("_submit_attached"), b.removeAttribute("_change_attached"))
        }

        function bj(a, b) {
            if (b.nodeType === 1 && !! f.hasData(a...ion(a) {
                    var b = " " + a + " ",
                        c = 0,
                        d = this.length;
                    for (; c < d; c++)
                        if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1) return !0;
                    return !1
                }, val: function (a) {
                    var c, d, e, g = this[0];
                    if ( !! arguments.length) return e = f.isFunction(a), this.each(function (d) {
                        var g = f(this),
                            h;
                        if (this.nodeType === 1) {
                            e ? h = a.call(this, d, g.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function (a) {
                                return a == null ? "" : a + ""
                            })), c = f.valHooks[this.type] || f.valHooks[this.nodeName.toLowerCase()];
                            if (!c || !("set" in c) || c.set(this, h, "value") === b) this.value = h
                        }
                    });
                    if (g) return c = f.valHooks[g.type] || f.valHooks[g.nodeName.toLowerCase()], c && "get" in c && (d = c.get(g, "value")) !== b ? d : (d = g.value, typeof d == "string" ? d.replace(q, "") : d == null ? "" : d)
                }
            }), f.extend({
                valHooks: {
                    option: {
                        get: function (a) {
                            var b = a.attributes.value;
                            return !b || b.specified ? a.value : a.text
                        }
                    },
                    select: {
                        get: function (a) {
                            var b, c, d, e, g = a.selectedIndex,
                                h = [],
                                i = a.options,
                                j = a.type === "select-one";
                            if (g < 0) return null;
                            c = j ? g : 0, d = j ? g + 1 : i.length;
                            for (; c < d; c++) {
                                e = i[c];
                                if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
                                    b = f(e).val();
                                    if (j) return b;
                                    h.push(b)
                                }
                            }
                            return j && !h.length && i.length ? f(i[g]).val() : h
                        },
                        set: function (a, b) {
                            var c = f.makeArray(b);
                            return f(a).find("option").each(function () {
                                this.selected = f.inArray(f(this).val(), c) >= 0
                            }), c.length || (a.selectedIndex = -1), c
                        }
                    }
                },
                attrFn: {
                    val: !0,
                    css: !0,
                    html: !0,
                    text: !0,
                    data: !0,
                    width: !0,
                    height: !0,
                    offset: !0
                },
                attr: function (a, c, d, e) {
                    var g, h, i, j = a.nodeType;
                    if ( !! a && j !== 3 && j !== 8 && j !== 2) {
                        if (e && c in f.attrFn) return f(a)[c](d);
                        if (typeof a.getAttribute == "undefined") return f.prop(a, c, d);
                        i = j !== 1 || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w));
                        if (d !== b) {
                            if (d === null) {
                                f.removeAttr(a, c);
                                return
                            }
                            return h && "set" in h && i && (g = h.set(a, d, c)) !== b ? g : (a.setAttribute(c, "" + d), d)
                        }
                        return h && "get" in h && i && (g = h.get(a, c)) !== null ? g : (g = a.getAttribute(c), g === null ? b : g)
                    }
                },
                removeAttr: function (a, b) {
                    var c, d, e, g, h, i = 0;
                    if (b && a.nodeType === 1) {
                        d = b.toLowerCase().split(p), g = d.length;
                        for (; i < g; i++) e = d[i], e && (c = f.propFix[e] || e, h = u.test(e), h || f.attr(a, e, ""), a.removeAttribute(v ? e : c), h && c in a && (a[c] = !1))
                    }
                },
                attrHooks: {
                    type: {
                        set: function (a, b) {
                            if (r.test(a.nodeName) && a.parentNode) f.error("type property can't be changed");
                            else if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
                                var c = a.value;
                                return a.setAttribute("type", b), c && (a.value = c), b
                            }
                        }
                    },
                    value: {
                        get: function (a, b) {
                            return w && f.nodeName(a, "button") ? w.get(a, b) : b in a ? a.value : null
                        },
                        set: function (a, b, c) {
                            if (w && f.nodeName(a, "button")) return w.set(a, b, c);
                            a.value = b
                        }
                    }
                },
                propFix: {
                    tabindex: "tabIndex",
                    readonly: "readOnly",
                    "for": "htmlFor",
                    "class": "className",
                    maxlength: "maxLength",
                    cellspacing: "cellSpacing",
                    cellpadding: "cellPadding",
                    rowspan: "rowSpan",
                    colspan: "colSpan",
                    usemap: "useMap",
                    frameborder: "frameBorder",
                    contenteditable: "contentEditable"
                },
                prop: function (a, c, d) {
                    var e, g, h, i = a.nodeType;
                    if ( !! a && i !== 3 && i !== 8 && i !== 2) return h = i !== 1 || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]), d !== b ? g && "set" in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get" in g && (e = g.get(a, c)) !== null ? e : a[c]
                },
                propHooks: {
                    tabIndex: {
                        get: function (a) {
                            var c = a.getAttributeNode("tabindex");
                            return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b
                        }
                    }
                }
            }), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {
                get: function (a, c) {
                    var d, e = f.prop(a, c);
                    return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
                },
                set: function (a, b, c) {
                    var d;
                    return b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase())), c
                }
            }, v || (y = {
                name: !0,
                id: !0,
                coords: !0
            }, w = f.valHooks.button = {
                get: function (a, c) {
                    var d;
                    return d = a.getAttributeNode(c), d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b
                },
                set: function (a, b, d) {
                    var e = a.getAttributeNode(d);
                    return e || (e = c.createAttribute(d), a.setAttributeNode(e)), e.nodeValue = b + ""
                }
            }, f.attrHooks.tabindex.set = w.set, f.each(["width", "height"], function (a, b) {
                f.attrHooks[b] = f.extend(f.attrHooks[b], {
                    set: function (a, c) {
                        if (c === "") return a.setAttribute(b, "auto"), c
                    }
                })
            }), f.attrHooks.contenteditable = {
                get: w.get,
                set: function (a, b, c) {
                    b === "" && (b = "false"), w.set(a, b, c)
                }
            }), f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function (a, c) {
                f.attrHooks[c] = f.extend(f.attrHooks[c], {
                    get: function (a) {
                        var d = a.getAttribute(c, 2);
                        return d === null ? b : d
                    }
                })
            }), f.support.style || (f.attrHooks.style = {
                get: function (a) {
                    return a.style.cssText.toLowerCase() || b
                },
                set: function (a, b) {
                    return a.style.cssText = "" + b
                }
            }), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
                get: function (a) {
                    var b = a.parentNode;
                    return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
                }
            })), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each(["radio", "checkbox"], function () {
                f.valHooks[this] = {
                    get: function (a) {
                        return a.getAttribute("value") === null ? "on" : a.value
                    }
                }
            }), f.each(["radio", "checkbox"], function () {
                f.valHooks[this] = f.extend(f.valHooks[this], {
                    set: function (a, b) {
                        if (f.isArray(b)) return a.checked = f.inArray(f(a).val(), b) >= 0
                    }
                })
            });
            var z = /^(?:textarea|input|select)$/i,
                A = /^([^\.]*)?(?:\.(.+))?$/,
                B = /(?:^|\s)hover(\.\S+)?\b/,
                C = /^key/,
                D = /^(?:mouse|contextmenu)|click/,
                E = /^(?:focusinfocus|focusoutblur)$/,
                F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
                G = function (a) {
                    var b = F.exec(a);
                    return b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)")), b
                }, H = function (a, b) {
                    var c = a.attributes || {};
                    return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value))
                }, I = function (a) {
                    return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1")
                };
            f.event = {
                add: function (a, c, d, e, g) {
                    var h, i, j, k, l, m, n, o, p, q, r, s;
                    if (!(a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a)))) {
                        d.handler && (p = d, d = p.handler, g = p.selector), d.guid || (d.guid = f.guid++), j = h.events, j || (h.events = j = {}), i = h.handle, i || (h.handle = i = function (a) {
                            return typeof f == "undefined" || !! a && f.event.triggered === a.type ? b : f.event.dispatch.apply(i.elem, arguments)
                        }, i.elem = a), c = f.trim(I(c)).split(" ");
                        for (k = 0; k < c.length; k++) {
                            l = A.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({
                                type: m,
                                origType: l[1],
                                data: e,
                                handler: d,
                                guid: d.guid,
                                selector: g,
                                quick: g && G(g),
                                namespace: n.join(".")
                            }, p), r = j[m];
                            if (!r) {
                                r = j[m] = [], r.delegateCount = 0;
                                if (!s.setup || s.setup.call(a, e, n, i) === !1) a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i)
                            }
                            s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), f.event.global[m] = !0
                        }
                        a = null
                    }
                },
                global: {},
                remove: function (a, b, c, d, e) {
                    var g = f.hasData(a) && f._data(a),
                        h, i, j, k, l, m, n, o, p, q, r, s;
                    if ( !! g && !! (o = g.events)) {
                        b = f.trim(I(b || "")).split(" ");
                        for (h = 0; h < b.length; h++) {
                            i = A.exec(b[h]) || [], j = k = i[1], l = i[2];
                            if (!j) {
                                for (j in o) f.event.remove(a, j + b[h], c, d, !0);
                                continue
                            }
                            p = f.event.special[j] || {}, j = (d ? p.delegateType : p.bindType) || j, r = o[j] || [], m = r.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                            for (n = 0; n < r.length; n++) s = r[n], (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1), s.selector && r.delegateCount--, p.remove && p.remove.call(a, s));
                            r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), delete o[j])
                        }
                        f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, ["events", "handle"], !0))
                    }
                },
                customEvent: {
                    getData: !0,
                    setData: !0,
                    changeData: !0
                },
                trigger: function (c, d, e, g) {
                    if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
                        var h = c.type || c,
                            i = [],
                            j, k, l, m, n, o, p, q, r, s;
                        if (E.test(h + f.event.triggered)) return;
                        h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort());
                        if ((!e || f.event.customEvent[h]) && !f.event.global[h]) return;
                        c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, o = h.indexOf(":") < 0 ? "on" + h : "";
                        if (!e) {
                            j = f.cache;
                            for (l in j) j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
                            return
                        }
                        c.result = b, c.target || (c.target = e), d = d != null ? f.makeArray(d) : [], d.unshift(c), p = f.event.special[h] || {};
                        if (p.trigger && p.trigger.apply(e, d) === !1) return;
                        r = [
                            [e, p.bindType || h]
                        ];
                        if (!g && !p.noBubble && !f.isWindow(e)) {
                            s = p.delegateType || h, m = E.test(s + h) ? e : e.parentNode, n = null;
                            for (; m; m = m.parentNode) r.push([m, s]), n = m;
                            n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s])
                        }
                        for (l = 0; l < r.length && !c.isPropagationStopped(); l++) m = r[l][0], c.type = r[l][1], q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), q = o && m[o], q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault();
                        return c.type = h, !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, n && (e[o] = n)), c.result
                    }
                },
                dispatch: function (c) {
                    c = f.event.fix(c || a.event);
                    var d = (f._data(this, "events") || {})[c.type] || [],
                        e = d.delegateCount,
                        g = [].slice.call(arguments, 0),
                        h = !c.exclusive && !c.namespace,
                        i = f.event.special[c.type] || {}, j = [],
                        k, l, m, n, o, p, q, r, s, t, u;
                    g[0] = c, c.delegateTarget = this;
                    if (!i.preDispatch || i.preDispatch.call(this, c) !== !1) {
                        if (e && (!c.button || c.type !== "click")) {
                            n = f(this), n.context = this.ownerDocument || this;
                            for (m = c.target; m != this; m = m.parentNode || this)
                                if (m.disabled !== !0) {
                                    p = {}, r = [], n[0] = m;
                                    for (k = 0; k < e; k++) s = d[k], t = s.selector, p[t] === b && (p[t] = s.quick ? H(m, s.quick) : n.is(t)), p[t] && r.push(s);
                                    r.length && j.push({
                                        elem: m,
                                        matches: r
                                    })
                                }
                        }
                        d.length > e && j.push({
                            elem: this,
                            matches: d.slice(e)
                        });
                        for (k = 0; k < j.length && !c.isPropagationStopped(); k++) {
                            q = j[k], c.currentTarget = q.elem;
                            for (l = 0; l < q.matches.length && !c.isImmediatePropagationStopped(); l++) {
                                s = q.matches[l];
                                if (h || !c.namespace && !s.namespace || c.namespace_re && c.namespace_re.test(s.namespace)) c.data = s.data, c.handleObj... {
                                    e.splice(h--, 1);
                                    break
                                }
                            }
                            return e
                        }, has: function (a) {
                            var b = f(a);
                            return this.filter(function () {
                                for (var a = 0, c = b.length; a < c; a++)
                                    if (f.contains(this, b[a])) return !0
                            })
                        },
                        not: function (a) {
                            return this.pushStack(T(this, a, !1), "not", a)
                        },
                        filter: function (a) {
                            return this.pushStack(T(this, a, !0), "filter", a)
                        },
                        is: function (a) {
                            return !!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0)
                        },
                        closest: function (a, b) {
                            var c = [],
                                d, e, g = this[0];
                            if (f.isArray(a)) {
                                var h = 1;
                                while (g && g.ownerDocument && g !== b) {
                                    for (d = 0; d < a.length; d++) f(g).is(a[d]) && c.push({
                                        selector: a[d],
                                        elem: g,
                                        level: h
                                    });
                                    g = g.parentNode, h++
                                }
                                return c
                            }
                            var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
                            for (d = 0, e = this.length; d < e; d++) {
                                g = this[d];
                                while (g) {
                                    if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
                                        c.push(g);
                                        break
                                    }
                                    g = g.parentNode;
                                    if (!g || !g.ownerDocument || g === b || g.nodeType === 11) break
                                }
                            }
                            return c = c.length > 1 ? f.unique(c) : c, this.pushStack(c, "closest", a)
                        },
                        index: function (a) {
                            return a ? typeof a == "string" ? f.inArray(this[0], f(a)) : f.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
                        },
                        add: function (a, b) {
                            var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a),
                                d = f.merge(this.get(), c);
                            return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d))
                        },
                        andSelf: function () {
                            return this.add(this.prevObject)
                        }
                    }),
                f.each({
                    parent: function (a) {
                        var b = a.parentNode;
                        return b && b.nodeType !== 11 ? b : null
                    },
                    parents: function (a) {
                        return f.dir(a, "parentNode")
                    },
                    parentsUntil: function (a, b, c) {
                        return f.dir(a, "parentNode", c)
                    },
                    next: function (a) {
                        return f.nth(a, 2, "nextSibling")
                    },
                    prev: function (a) {
                        return f.nth(a, 2, "previousSibling")
                    },
                    nextAll: function (a) {
                        return f.dir(a, "nextSibling")
                    },
                    prevAll: function (a) {
                        return f.dir(a, "previousSibling")
                    },
                    nextUntil: function (a, b, c) {
                        return f.dir(a, "nextSibling", c)
                    },
                    prevUntil: function (a, b, c) {
                        return f.dir(a, "previousSibling", c)
                    },
                    siblings: function (a) {
                        return f.sibling((a.parentNode || {}).firstChild, a)
                    },
                    children: function (a) {
                        return f.sibling(a.firstChild)
                    },
                    contents: function (a) {
                        return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes)
                    }
                }, function (a, b) {
                    f.fn[a] = function (c, d) {
                        var e = f.map(this, b, c);
                        return L.test(a) || (d = c), d && typeof d == "string" && (e = f.filter(d, e)), e = this.length > 1 && !R[a] ? f.unique(e) : e, (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse()), this.pushStack(e, a, P.call(arguments).join(","))
                    }
                }),
                f.extend({
                    filter: function (a, b, c) {
                        return c && (a = ":not(" + a + ")"), b.length === 1 ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b)
                    },
                    dir: function (a, c, d) {
                        var e = [],
                            g = a[c];
                        while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d))) g.nodeType === 1 && e.push(g), g = g[c];
                        return e
                    },
                    nth: function (a, b, c, d) {
                        b = b || 1;
                        var e = 0;
                        for (; a; a = a[c])
                            if (a.nodeType === 1 && ++e === b) break;
                        return a
                    },
                    sibling: function (a, b) {
                        var c = [];
                        for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
                        return c
                    }
                });
                var V = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
                    W = / jQuery\d+="(?:\d+|null)"/g,
                    X = /^\s+/,
                    Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
                    Z = /<([\w:]+)/,
                    $ = /<tbody/i,
                    _ = /<|&#?\w+;/,
                    ba = /<(?:script|style)/i,
                    bb = /<(?:script|object|embed|option|style)/i,
                    bc = new RegExp("<(?:" + V + ")[\\s/>]", "i"),
                    bd = /checked\s*(?:[^=]|=\s*.checked.)/i,
                    be = /\/(java|ecma)script/i,
                    bf = /^\s*<!(?:\[CDATA\[|\-\-)/,
                    bg = {
                        option: [1, "<select multiple='multiple'>", "</select>"],
                        legend: [1, "<fieldset>", "</fieldset>"],
                        thead: [1, "<table>", "</table>"],
                        tr: [2, "<table><tbody>", "</tbody></table>"],
                        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                        area: [1, "<map>", "</map>"],
                        _default: [0, "", ""]
                    }, bh = U(c);
                bg.optgroup = bg.option, bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead, bg.th = bg.td, f.support.htmlSerialize || (bg._default = [1, "div<div>", "</div>"]), f.fn.extend({
                    text: function (a) {
                        return f.access(this, function (a) {
                            return a === b ? f.text(this) : this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a))
                        }, null, a, arguments.length)
                    },
                    wrapAll: function (a) {
                        if (f.isFunction(a)) return this.each(function (b) {
                            f(this).wrapAll(a.call(this, b))
                        });
                        if (this[0]) {
                            var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
                            this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                                var a = this;
                                while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild;
                                return a
                            }).append(this)
                        }
                        return this
                    },
                    wrapInner: function (a) {
                        return f.isFunction(a) ? this.each(function (b) {
                            f(this).wrapInner(a.call(this, b))
                        }) : this.each(function () {
                            var b = f(this),
                                c = b.contents();
                            c.length ? c.wrapAll(a) : b.append(a)
                        })
                    },
                    wrap: function (a) {
                        var b = f.isFunction(a);
                        return this.each(function (c) {
                            f(this).wrapAll(b ? a.call(this, c) : a)
                        })
                    },
                    unwrap: function () {
                        return this.parent().each(function () {
                            f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
                        }).end()
                    },
                    append: function () {
                        return this.domManip(arguments, !0, function (a) {
                            this.nodeType === 1 && this.appendChild(a)
                        })
                    },
                    prepend: function () {
                        return this.domManip(arguments, !0, function (a) {
                            this.nodeType === 1 && this.insertBefore(a, this
                                .firstChild)
                        })
                    },
                    before: function () {
                        if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) {
                            this.parentNode.insertBefore(a, this)
                        });
                        if (arguments.length) {
                            var a = f.clean(arguments);
                            return a.push.apply(a, this.toArray()), this.pushStack(a, "before", arguments)
                        }
                    },
                    after: function () {
                        if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) {
                            this.parentNode.insertBefore(a, this.nextSibling)
                        });
                        if (arguments.length) {
                            var a = this.pushStack(this, "after", arguments);
                            return a.push.apply(a, f.clean(arguments)), a
                        }
                    },
                    remove: function (a, b) {
                        for (var c = 0, d;
                            (d = this[c]) != null; c++)
                            if (!a || f.filter(a, [d]).length)!b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
                        return this
                    },
                    empty: function () {
                        for (var a = 0, b;
                            (b = this[a]) != null; a++) {
                            b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
                            while (b.firstChild) b.removeChild(b.firstChild)
                        }
                        return this
                    },
                    clone: function (a, b) {
                        return a = a == null ? !1 : a, b = b == null ? a : b, this.map(function () {
                            return f.clone(this, a, b)
                        })
                    },
                    html: function (a) {
                        return f.access(this, function (a) {
                            var c = this[0] || {}, d = 0,
                                e = this.length;
                            if (a === b) return c.nodeType === 1 ? c.innerHTML.replace(W, "") : null;
                            if (typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || ["", ""])[1].toLowerCase()]) {
                                a = a.replace(Y, "<$1></$2>");
                                try {
                                    for (; d < e; d++) c = this[d] || {}, c.nodeType === 1 && (f.cleanData(c.getElementsByTagName("*")), c.innerHTML = a);
                                    c = 0
                                } catch (g) {}
                            }
                            c && this.empty().append(a)
                        }, null, a, arguments.length)
                    },
                    replaceWith: function (a) {
                        return this[0] && this[0].parentNode ? f.isFunction(a) ? this.each(function (b) {
                            var c = f(this),
                                d = c.html();
                            c.replaceWith(a.call(this, b, d))
                        }) : (typeof a != "string" && (a = f(a).detach()), this.each(function () {
                            var b = this.nextSibling,
                                c = this.parentNode;
                            f(this).remove(), b ? f(b).before(a) : f(c).append(a)
                        })) : this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this
                    },
                    detach: function (a) {
                        return this.remove(a, !0)
                    },
                    domManip: function (a, c, d) {
                        var e, g, h, i, j = a[0],
                            k = [];
                        if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j)) return this.each(function () {
                            f(this).domManip(a, c, d, !0)
                        });
                        if (f.isFunction(j)) return this.each(function (e) {
                            var g = f(this);
                            a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d)
                        });
                        if (this[0]) {
                            i = j && j.parentNode, f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {
                                fragment: i
                            } : e = f.buildFragment(a, this, k), h = e.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
                            if (g) {
                                c = c && f.nodeName(g, "tr");
                                for (var l = 0, m = this.length, n = m - 1; l < m; l++) d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h)
                            }
                            k.length && f.each(k, function (a, b) {
                                b.src ? f.ajax({
                                    type: "GET",
                                    global: !1,
                                    url: b.src,
                                    async: !1,
                                    dataType: "script"
                                }) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b)
                            })
                        }
                        return this
                    }
                }), f.buildFragment = function (a, b, d) {
                    var e, g, h, i, j = a[0];
                    return b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0, h = f.fragments[j], h && h !== 1 && (e = h)), e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1), {
                        fragment: e,
                        cacheable: g
                    }
                }, f.fragments = {}, f.each({
                    appendTo: "append",
                    prependTo: "prepend",
                    insertBefore: "before",
                    insertAfter: "after",
                    replaceAll: "replaceWith"
                }, function (a, b) {
                    f.fn[a] = function (c) {
                        var d = [],
                            e = f(c),
                            g = this.length === 1 && this[0].parentNode;
                        if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) return e[b](this[0]), this;
                        for (var h = 0, i = e.length; h < i; h++) {
                            var j = (h > 0 ? this.clone(!0) : this).get();
                            f(e[h])[b](j), d = d.concat(j)
                        }
                        return this.pushStack(d, a, e.selector)
                    }
                }), f.extend({
                        clone: function (a, b, c) {
                            var d, e, g, h = f.support.html5Clone || f.isXMLDoc(a) || !bc.test("<" + a.nodeName + ">") ? a.cloneNode(!0) : bo(a);
                            if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
                                bk(a, h), d = bl(a), e = bl(h);
                                for (g = 0; d[g]; ++g) e[g] && bk(d[g], e[g])
                            }
                            if (b) {
                                bj(a, h);
                                if (c) {
                                    d = bl(a), e = bl(h);
                                    for (g = 0; d[g]; ++g) bj(d[g], e[g])
                                }
                            }
                            return d = e = null, h
                        },
                        clean: function (a, b, d, e) {
                            var g, h, i, j = [];
                            b = b || c, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
                            for (var k = 0, l;
                                (l = a[k]) != null; k++) {
                                typeof l == "number" && (l += "");
                                if (!l) continue;
                                if (typeof l == "string")
                                    if (!_.test(l)) l = b.createTextNode(l);
                                    else {
                                        l = l.replace(Y, "<$1></$2>");
                                        var m = (Z.exec(l) || ["", ""])[1].toLowerCase(),
                                            n = bg[m] || bg._default,
                                            o = n[0],
                                            p = b.createElement("div"),
                                            q = bh.childNodes,
                                            r;
                                        b === c ? bh.appendChild(p) : U(b).appendChild(p), p.innerHTML = n[1] + l + n[2];
                                        while (o--) p = p.lastChild;
                                        if (!f.support.tbody) {
                                            var s = $.test(l),
                                                t = m === "table" && !s ? p.firstChild && p.firstChild.childNodes : n[1] === "<table>" && !s ? p.childNodes : [];
                                            for (i = t.length - 1; i >= 0; --i) f.nodeName(t[i], "tbody") && !t[i].childNodes.length && t[i].parentNode.removeChild(t[i])
                                        }!f.support.leadingWhitespace && X.test(l) && p.insertBefore(b.createTextNode(X.exec(l)[0]), p.firstChild), l = p.childNodes, p && (p.parentNode.removeChild(p), q.length > 0 & ...oat(h) || 0, n = parseFloat(i) || 0), f.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using" in b ? b.using.call(a, k) : e.css(k)
                                    }
                            }, f.fn.extend({
                                position: function () {
                                    if (!this[0]) return null;
                                    var a = this[0],
                                        b = this.offsetParent(),
                                        c = this.offset(),
                                        d = cx.test(b[0].nodeName) ? {
                                            top: 0,
                                            left: 0
                                        } : b.offset();
                                    return c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0, {
                                        top: c.top - d.top,
                                        left: c.left - d.left
                                    }
                                },
                                offsetParent: function () {
                                    return this.map(function () {
                                        var a = this.offsetParent || c.body;
                                        while (a && !cx.test(a.nodeName) && f.css(a, "position") === "static") a = a.offsetParent;
                                        return a
                                    })
                                }
                            }), f.each({
                                scrollLeft: "pageXOffset",
                                scrollTop: "pageYOffset"
                            }, function (a, c) {
                                var d = /Y/.test(c);
                                f.fn[a] = function (e) {
                                    return f.access(this, function (a, e, g) {
                                        var h = cy(a);
                                        if (g === b) return h ? c in h ? h[c] : f.support.boxModel && h.document.documentElement[e] || h.document.body[e] : a[e];
                                        h ? h.scrollTo(d ? f(h).scrollLeft() : g, d ? g : f(h).scrollTop()) : a[e] = g
                                    }, a, e, arguments.length, null)
                                }
                            }), f.each({
                                Height: "height",
                                Width: "width"
                            }, function (a, c) {
                                var d = "client" + a,
                                    e = "scroll" + a,
                                    g = "offset" + a;
                                f.fn["inner" + a] = function () {
                                    var a = this[0];
                                    return a ? a.style ? parseFloat(f.css(a, c, "padding")) : this[c]() : null
                                }, f.fn["outer" + a] = function (a) {
                                    var b = this[0];
                                    return b ? b.style ? parseFloat(f.css(b, c, a ? "margin" : "border")) : this[c]() : null
                                }, f.fn[c] = function (a) {
                                    return f.access(this, function (a, c, h) {
                                        var i, j, k, l;
                                        if (f.isWindow(a)) return i = a.document, j = i.documentElement[d], f.support.boxModel && j || i.body && i.body[d] || j;
                                        if (a.nodeType === 9) return i = a.documentElement, i[d] >= i[e] ? i[d] : Math.max(a.body[e], i[e], a.body[g], i[g]);
                                        if (h === b) return k = f.css(a, c), l = parseFloat(k), f.isNumeric(l) ? l : k;
                                        f(a).css(c, h)
                                    }, c, a, arguments.length, null)
                                }
                            }), a.jQuery = a.$ = f, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
                                return f
                            })
                        })(window), function ($, undefined) {
                        var alreadyInitialized = function () {
                            var events = $._data(document, "events");
                            return events && events.click && $.grep(events.click, function (e) {
                                return e.namespace === "rails"
                            }).length
                        };
                        alreadyInitialized() && $.error("jquery-ujs has already been loaded!");
                        var rails;
                        $.rails = rails = {
                            linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
                            inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
                            formSubmitSelector: "form",
                            formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",
                            disableSelector: "input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
                            enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
                            requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
                            fileInputSelector: "input:file",
                            linkDisableSelector: "a[data-disable-with]",
                            CSRFProtection: function (xhr) {
                                var token = $('meta[name="csrf-token"]').attr("content");
                                token && xhr.setRequestHeader("X-CSRF-Token", token)
                            },
                            fire: function (obj, name, data) {
                                var event = $.Event(name);
                                return obj.trigger(event, data), event.result !== !1
                            },
                            confirm: function (message) {
                                return confirm(message)
                            },
                            ajax: function (options) {
                                return $.ajax(options)
                            },
                            href: function (element) {
                                return element.attr("href")
                            },
                            handleRemote: function (element) {
                                var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;
                                if (rails.fire(element, "ajax:before")) {
                                    elCrossDomain = element.data("cross-domain"), crossDomain = elCrossDomain === undefined ? null : elCrossDomain, withCredentials = element.data("with-credentials") || null, dataType = element.data("type") || $.ajaxSettings && $.ajaxSettings.dataType;
                                    if (element.is("form")) {
                                        method = element.attr("method"), url = element.attr("action"), data = element.serializeArray();
                                        var button = element.data("ujs:submit-button");
                                        button && (data.push(button), element.data("ujs:submit-button", null))
                                    } else element.is(rails.inputChangeSelector) ? (method = element.data("method"), url = element.data("url"), data = element.serialize(), element.data("params") && (data = data + "&" + element.data("params"))) : (method = element.data("method"), url = rails.href(element), data = element.data("params") || null);
                                    options = {
                                        type: method || "GET",
                                        data: data,
                                        dataType: dataType,
                                        beforeSend: function (xhr, settings) {
                                            return settings.dataType === undefined && xhr.setRequestHeader("accept", "*/*;q=0.5, " + settings.accepts.script), rails.fire(element, "ajax:beforeSend", [xhr, settings])
                                        },
                                        success: function (data, status, xhr) {
                                            element.trigger("ajax:success", [data, status, xhr])
                                        },
                                        complete: function (xhr, status) {
                                            element.trigger("ajax:complete", [xhr, status])
                                        },
                                        error: function (xhr, status, error) {
                                            element.trigger("ajax:error", [xhr, status, error])
                                        },
                                        xhrFields: {
                                            withCredentials: withCredentials
                                        },
                                        crossDomain: crossDomain
                                    }, url && (options.url = url);
                                    var jqxhr = rails.ajax(options);
                                    return element.trigger("ajax:send", jqxhr), jqxhr
                                }
                                return !1
                            },
                            handleMethod: function (link) {
                                var href = rails.href(link),
                                    method = link.data("method"),
                                    target = link.attr("target"),
                                    csrf_token = $("meta[name=csrf-token]").attr("content"),
                                    csrf_param = $("meta[name=csrf-param]").attr("content"),
                                    form = $('<form method="post" action="' + href + '"></form>'),
                                    metadata_input = '<input name="_method" value="' + method + '" type="hidden" />';
                                csrf_param !== undefined && csrf_token !== undefined && (metadata_input += '<input name="' + csrf_param + '" value="' + csrf_token + '" type="hidden" />'), target && form.attr("target", target), form.hide().append(metadata_input).appendTo("body"), form.submit()
                            },
                            disableFormElements: function (form) {
                                form.find(rails.disableSelector).each(function () {
                                    var element = $(this),
                                        method = element.is("button") ? "html" : "val";
                                    element.data("ujs:enable-with", element[method]()), element[method](element.data("disable-with")), element.prop("disabled", !0)
                                })
                            },
                            enableFormElements: function (form) {
                                form.find(rails.enableSelector).each(function () {
                                    var element = $(this),
                                        method = element.is("button") ? "html" : "val";
                                    element.data("ujs:enable-with") && element[method](element.data("ujs:enable-with")), element.prop("disabled", !1)
                                })
                            },
                            allowAction: function (element) {
                                var message = element.data("confirm"),
                                    answer = !1,
                                    callback;
                                return message ? (rails.fire(element, "confirm") && (answer = rails.confirm(message), callback = rails.fire(element, "confirm:complete", [answer])), answer && callback) : !0
                            },
                            blankInputs: function (form, specifiedSelector, nonBlank) {
                                var inputs = $(),
                                    input, valueToCheck, selector = specifiedSelector || "input,textarea",
                                    allInputs = form.find(selector);
                                return allInputs.each(function () {
                                    input = $(this), valueToCheck = input.is(":checkbox,:radio") ? input.is(":checked") : input.val();
                                    if (!valueToCheck == !nonBlank) {
                                        if (input.is(":radio") && allInputs.filter('input:radio:checked[name="' + input.attr("name") + '"]').length) return !0;
                                        inputs = inputs.add(input)
                                    }
                                }), inputs.length ? inputs : !1
                            },
                            nonBlankInputs: function (form, specifiedSelector) {
                                return rails.blankInputs(form, specifiedSelector, !0)
                            },
                            stopEverything: function (e) {
                                return $(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), !1
                            },
                            callFormSubmitBindings: function (form, event) {
                                var events = form.data("events"),
                                    continuePropagation = !0;
                                return events !== undefined && events.submit !== undefined && $.each(events.submit, function (i, obj) {
                                    if (typeof obj.handler == "function") return continuePropagation = obj.handler(event)
                                }), continuePropagation
                            },
                            disableElement: function (element) {
                                element.data("ujs:enable-with", element.html()), element.html(element.data("disable-with")), element.bind("click.railsDisable", function (e) {
                                    return rails.stopEverything(e)
                                })
                            },
                            enableElement: function (element) {
                                element.data("ujs:enable-with") !== undefined && (element.html(element.data("ujs:enable-with")), element.data("ujs:enable-with", !1)), element.unbind("click.railsDisable")
                            }
                        }, rails.fire($(document), "rails:attachBindings") && ($.ajaxPrefilter(function (options, originalOptions, xhr) {
                            options.crossDomain || rails.CSRFProtection(xhr)
                        }), $(document).delegate(rails.linkDisableSelector, "ajax:complete", function () {
                            rails.enableElement($(this))
                        }), $(document).delegate(rails.linkClickSelector, "click.rails", function (e) {
                            var link = $(this),
                                method = link.data("method"),
                                data = link.data("params");
                            if (!rails.allowAction(link)) return rails.stopEverything(e);
                            link.is(rails.linkDisableSelector) && rails.disableElement(link);
                            if (link.data("remote") !== undefined) {
                                if ((e.metaKey || e.ctrlKey) && (!method || method === "GET") && !data) return !0;
                                var handleRemote = rails.handleRemote(link);
                                return handleRemote === !1 ? rails.enableElement(link) : handleRemote.error(function () {
                                    rails.enableElement(link)
                                }), !1
                            }
                            if (link.data("method")) return rails.handleMethod(link), !1
                        }), $(document).delegate(rails.inputChangeSelector, "change.rails", function (e) {
                            var link = $(this);
                            return rails.allowAction(link) ? (rails.handleRemote(link), !1) : rails.stopEverything(e)
                        }), $(document).delegate(rails.formSubmitSelector, "submit.rails", function (e) {
                            var form = $(this),
                                remote = form.data("remote") !== undefined,
                                blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector),
                                nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
                            if (!rails.allowAction(form)) return rails.stopEverything(e);
                            if (blankRequiredInputs && form.attr("novalidate") == undefined && rails.fire(form, "ajax:aborted:required", [blankRequiredInputs])) return rails.stopEverything(e);
                            if (remote) {
                                if (nonBlankFileInputs) {
                                    setTimeout(function () {
                                        rails.disableFormElements(form)
                                    }, 13);
                                    var aborted = rails.fire(form, "ajax:aborted:file", [nonBlankFileInputs]);
                                    return aborted || setTimeout(function () {
                                        rails.enableFormElements(form)
                                    }, 13), aborted
                                }
                                return !$.support.submitBubbles && $().jquery < "1.7" && rails.callFormSubmitBindings(form, e) === !1 ? rails.stopEverything(e) : (rails.handleRemote(form), !1)
                            }
                            setTimeout(function () {
                                rails.disableFormElements(form)
                            }, 13)
                        }), $(document).delegate(rails.formInputClickSelector, "click.rails", function (event) {
                            var button = $(this);
                            if (!rails.allowAction(button)) return rails.stopEverything(event);
                            var name = button.attr("name"),
                                data = name ? {
                                    name: name,
                                    value: button.val()
                                } : null;
                            button.closest("form").data("ujs:submit-button", data)
                        }), $(document).delegate(rails.formSubmitSelector, "ajax:beforeSend.rails", function (event) {
                            this == event.target && rails.disa...(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]))
                    } catch (Z) {}
                    return {
                        w3: aa,
                        pv: ag,
                        wk: af,
                        ie: X,
                        win: ae,
                        mac: ac
                    }
                }(), k = function () {
                    if (!M.w3) return;
                    (typeof j.readyState != D && j.readyState == "complete" || typeof j.readyState == D && (j.getElementsByTagName("body")[0] || j.body)) && f(), J || (typeof j.addEventListener != D && j.addEventListener("DOMContentLoaded", f, !1), M.ie && M.win && (j.attachEvent(x, function () {
                        j.readyState == "complete" && (j.detachEvent(x, arguments.callee), f())
                    }), O == top && function () {
                        if (J) return;
                        try {
                            j.documentElement.doScroll("left")
                        } catch (X) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        f()
                    }()), M.wk && function () {
                        if (J) return;
                        if (!/loaded|complete/.test(j.readyState)) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        f()
                    }(), s(f))
                }(), d = function () {
                    M.ie && M.win && window.attachEvent("onunload", function () {
                        var ac = I.length;
                        for (var ab = 0; ab < ac; ab++) I[ab][0].detachEvent(I[ab][1], I[ab][2]);
                        var Z = N.length;
                        for (var aa = 0; aa < Z; aa++) y(N[aa]);
                        for (var Y in M) M[Y] = null;
                        M = null;
                        for (var X in swfobject) swfobject[X] = null;
                        swfobject = null
                    })
                }();
                return {
                    registerObject: function (ab, X, aa, Z) {
                        if (M.w3 && ab && X) {
                            var Y = {};
                            Y.id = ab, Y.swfVersion = X, Y.expressInstall = aa, Y.callbackFn = Z, o[o.length] = Y, w(ab, !1)
                        } else Z && Z({
                            success: !1,
                            id: ab
                        })
                    },
                    getObjectById: function (X) {
                        if (M.w3) return z(X)
                    },
                    embedSWF: function (ab, ah, ae, ag, Y, aa, Z, ad, af, ac) {
                        var X = {
                            success: !1,
                            id: ah
                        };
                        M.w3 && !(M.wk && M.wk < 312) && ab && ah && ae && ag && Y ? (w(ah, !1), K(function () {
                            ae += "", ag += "";
                            var aj = {};
                            if (af && typeof af === r)
                                for (var al in af) aj[al] = af[al];
                            aj.data = ab, aj.width = ae, aj.height = ag;
                            var am = {};
                            if (ad && typeof ad === r)
                                for (var ak in ad) am[ak] = ad[ak];
                            if (Z && typeof Z === r)
                                for (var ai in Z) typeof am.flashvars != D ? am.flashvars += "&" + ai + "=" + Z[ai] : am.flashvars = ai + "=" + Z[ai];
                            if (F(Y)) {
                                var an = u(aj, am, ah);
                                aj.id == ah && w(ah, !0), X.success = !0, X.ref = an
                            } else {
                                if (aa && A()) {
                                    aj.data = aa, P(aj, am, ah, ac);
                                    return
                                }
                                w(ah, !0)
                            }
                            ac && ac(X)
                        })) : ac && ac(X)
                    },
                    switchOffAutoHideShow: function () {
                        m = !1
                    },
                    ua: M,
                    getFlashPlayerVersion: function () {
                        return {
                            major: M.pv[0],
                            minor: M.pv[1],
                            release: M.pv[2]
                        }
                    },
                    hasFlashPlayerVersion: F,
                    createSWF: function (Z, Y, X) {
                        return M.w3 ? u(Z, Y, X) : undefined
                    },
                    showExpressInstall: function (Z, aa, X, Y) {
                        M.w3 && A() && P(Z, aa, X, Y)
                    },
                    removeSWF: function (X) {
                        M.w3 && y(X)
                    },
                    createCSS: function (aa, Z, Y, X) {
                        M.w3 && v(aa, Z, Y, X)
                    },
                    addDomLoadEvent: K,
                    addLoadEvent: s,
                    getQueryParamValue: function (aa) {
                        var Z = j.location.search || j.location.hash;
                        if (Z) {
                            /\?/.test(Z) && (Z = Z.split("?")[1]);
                            if (aa == null) return L(Z);
                            var Y = Z.split("&");
                            for (var X = 0; X < Y.length; X++)
                                if (Y[X].substring(0, Y[X].indexOf("=")) == aa) return L(Y[X].substring(Y[X].indexOf("=") + 1))
                        }
                        return ""
                    },
                    expressInstallCallback: function () {
                        if (a) {
                            var X = c(R);
                            X && l && (X.parentNode.replaceChild(l, X), Q && (w(Q, !0), M.ie && M.win && (l.style.display = "block")), E && E(B)), a = !1
                        }
                    }
                }
            }();
            (function () {
                window.trackIplaWinInstall = function () {
                    return _gaq.push(["_trackPageview", "/goal/install/ipla_windows"])
                }, window.trackActivatePacket = function (code) {
                    return _gaq.push(["_trackPageview", "/goal/activate/packet/" + code])
                }, window.trackActivateVod = function (vod_id) {
                    return _gaq.push(["_trackPageview", "/goal/activate/ppv/vod/" + vod_id])
                }, window.trackActivateLive = function (live_id) {
                    return _gaq.push(["_trackPageview", "/goal/activate/ppv/live/" + live_id])
                }, window.trackBuyPacket = function (code, title, category, category_id) {
                    return _gaq.push(["_trackPageview", "/goal/buy/packet/" + code]), Rede.Ipla2011.GemiusPrism.action === Rede.Ipla2011.GemiusPrism.Actions.PAYMENT_LOGIN_ON && (Rede.Ipla2011.GemiusPrism.init(Rede.Ipla2011.GemiusPrism.Actions.LOGIN_PAGE, title, category), Rede.Ipla2011.GemiusPrism.SendHit(), Rede.Ipla2011.GemiusPrism.init(Rede.Ipla2011.GemiusPrism.Actions.PAYMENT_LOGIN_ON, title, category)), Rede.Ipla2011.GemiusPrism.init("", title, category), Rede.Ipla2011.GemiusPrism.SendHit(), Rede.Ipla2011.img_hit("http://r.turn.com/r/beacon?b2=SCDe-iZ0xYjxE-Io_GBS6xA9wyDhrJca9XGeocWhel2_Z0wPuNgKnahwBktxWr9_PTpfS6AdzVLh9Yu_nsG-eQ&cid="), window.Rede.Ipla2011.setHitCode({
                        vod: !0,
                        keyCategoryId: category_id,
                        buttonBuyPacket: !0
                    })
                }, window.trackBuyVod = function (vod_id, title, category, category_id) {
                    return _gaq.push(["_trackPageview", "/goal/buy/ppv/vod/" + vod_id]), Rede.Ipla2011.GemiusPrism.action === Rede.Ipla2011.GemiusPrism.Actions.PAYMENT_LOGIN_ON && (Rede.Ipla2011.GemiusPrism.init(Rede.Ipla2011.GemiusPrism.Actions.LOGIN_PAGE, title, category), Rede.Ipla2011.GemiusPrism.SendHit(), Rede.Ipla2011.GemiusPrism.init(Rede.Ipla2011.GemiusPrism.Actions.PAYMENT_LOGIN_ON, title, category)), Rede.Ipla2011.GemiusPrism.init("", title, category), Rede.Ipla2011.GemiusPrism.SendHit(), Rede.Ipla2011.img_hit("http://r.turn.com/r/beacon?b2=SCDe-iZ0xYjxE-Io_GBS6xA9wyDhrJca9XGeocWhel2_Z0wPuNgKnahwBktxWr9_PTpfS6AdzVLh9Yu_nsG-eQ&cid="), window.Rede.Ipla2011.setHitCode({
                        vod: !0,
                        keyCategoryId: category_id,
                        buttonBuyVod: !0
                    })
                }, window.trackBuyLive = function (live_id, live_url) {
                    return _gaq.push(["_trackPageview", "/goal/buy/ppv/live/" + live_id]), window.Rede.Ipla2011.setHitCode({
                        live: !0,
                        liveId: live_id,
                        liveUrl: live_url,
                        buttonBuyLive: !0
                    }), !0
                }
            }).call(this),
            function () {
                window.eventsSent = {}, window.singleEvent = function (key, callback) {
                    window.logger && window.logger.info("emit single event with key: '" + key + "'");
                    if (!window.eventsSent[key]) return window.eventsSent[key] = !0, callback()
                }, window.vodType = function () {
                    return /\/program\-tv\//.test(window.location.pathname) ? "LIVE" : "VOD"
                }
            }.call(this),
            function () {
                function centerElement(element) {
                    element.css({
                        top: "50%",
                        left: "50%",
                        marginTop: "-" + element.height() / 2 + "px",
                        marginLeft: "-" + element.width() / 2 + "px",
                        position: "absolute"
                    })
                }
                window.Rede || (window.Rede = {}), window.location.href.match(/localhost/) ? window.development = !0 : window.location.href.match(/frontend3-dev/) && (window.development = !0), window.Rede.Ipla2011 = {
                    is_inited: !1,
                    is_dev_mode: !1,
                    modern_browser: !0,
                    ie8_xp: !1,
                    max_list_len: 9,
                    cookieInfoContainerHeight: 0,
                    animation_speed: {
                        veryfast: 100,
                        fast: 500,
                        slow: 1e3,
                        veryslow: 5e3
                    },
                    init: function () {
                        if (this.is_inited) return;
                        this.is_inited = !0;
                        if (document.location.hostname === "localhost" || document.location.hostname === "frontend3-dev.vm.redefine.pl") this.is_dev_mode = !0;
                        $.browser.msie && parseInt($.browser.version, 10) < 8 && (this.modern_browser = !1), $.browser.msie && parseInt($.browser.version, 10) == 8 && window.navigator.userAgent.indexOf("Windows NT 5.1") > 0 && (this.ie8_xp = !0), this.ShowCookieInfo(), this.ChildrenDayBg(), this.PhilipsVipBgChange(), this.Debug("ipla2011 init"), this.InstallSuggestionHelper(), this.InstallCollapseHandler(), this.InstallDropdownStylization(), this.InstallAjaxDropdown(), this.OnlyNumeric(), this.DisableLinks(), this.Detector && this.macBlock(), this.BindPlaytest()
                    },
                    ShowCookieInfo: function () {
                        var COOKIE_INFO_KEY = "ipla_cookie_info";
                        if ($.cookie(COOKIE_INFO_KEY) === null) {
                            $.cookie(COOKIE_INFO_KEY, !0, {
                                expires: 10950,
                                path: "/"
                            });
                            var delay = 500,
                                cookieInfoContainer = $("#cookies-info");
                            this.cookieInfoContainerHeight = cookieInfoContainer.outerHeight();
                            var cookieInfoCloseBtn = $("#cookies-info-close");
                            cookieInfoContainer.slideToggle(delay), this.animateBodyBG(this.cookieInfoContainerHeight, delay);
                            var self = this;
                            cookieInfoCloseBtn.click(function () {
                                return cookieInfoContainer.slideToggle(delay), self.animateBodyBG(0, delay), $(document).trigger("HideCookieInfo", self), !1
                            })
                        }
                    },
                    animateBodyBG: function (yPos, delay) {
                        $("body").animate({
                            "border-spacing": yPos
                        }, {
                            step: function (now, fx) {
                                $.browser.msie ? $(fx.elem).css("background-position-y", "" + now + "px") : $(fx.elem).css("background-position", "top " + now + "px center")
                            },
                            duration: delay
                        })
                    },
                    InstallPaginationPositioner: function () {
                        var items = $(".pagination_bar").children(),
                            w = 0;
                        for (var i = 0; i < items.length; i++) w += parseInt($(items[i]).width(), 10) + 1;
                        $(".pagination_bar").css({
                            width: w + "px",
                            marginLeft: "auto",
                            marginRight: "auto"
                        })
                    },
                    InstallCollapseHandler: function () {
                        function get_parent_div(obj) {
                            var parent = obj.parent();
                            return parent[0].tagName.toLowerCase() == "div" ? parent : get_parent_div(parent)
                        }
                        var class_name = "collapsed";
                        $("a.collapse_handler").bind("click", function () {
                            var p = get_parent_div($(this));
                            return p.hasClass(class_name) ? p.removeClass(class_name) : p.addClass(class_name), !1
                        })
                    },
                    InstallSuggestionHelper: function () {
                        $(".with_suggestion").each(function () {
                            var obj = $(this);
                            obj.addClass("is_default");
                            var default_text = obj.val();
                            jQuery.data(this, "default_value", default_text), obj.bind("focus", function () {
                                var val = obj.val();
                                val == default_text && obj.val("").removeClass("is_default")
                            }).bind("blur", function () {
                                var val = obj.val();
                                if (val == "") {
                                    var val = obj.val(default_text);
                                    obj.addClass("is_default")
                                }
                            }).bind("keyup", function () {
                                var val = obj.val();
                                val == "" ? obj.siblings('input[type="image"], input[type="submit"], input.submit').addClass("disabled") : obj.siblings('input[type="image"], input[type="submit"], input.submit').removeClass("disabled")
                            }), $(obj.get(0).form).bind("submit", function () {
                                return obj.val() == default_text ? !1 : !0
                            }), (obj.val() == default_text || obj.val() == "") && obj.siblings('input[type="image"], input[type="submit"], input.submit').addClass("disabled")
                        })
                    },
                    BindHourSelect: function () {
                        function __on_dropdown_change(e, itm, rec) {
                            var obj;
                            typeof itm == "undefined" ? obj = $(this) : obj = itm;
                            var value = obj.val();
                            if (typeof rec == "undefined") {
                                var other;
                                obj.attr("id") == "hour_select_bottom" ? other = "hour_select_top" : other = "hour_select_bottom";
                                var hour = value.replace("h", "").replace("m", ":"),
                                    label = $("#" + other).next().find("label");
                                label.html(hour)
                            }
                            var lnk = $("div." + value).first();
                            lnk.show(), $(lnk).prevUntil(".clear").hide(), $(lnk).nextUntil(".day_and_hour_select").show(), window.opera && (window.location.hash != "#autoplay" && (window.location.hash = "#top"), $(document.body).append('<div id="opera-fake"></div>'), setTimeout(function () {
                                $("#opera-fake").remove()
                            }, 1e3))
                        }
                        $("#hour_select_bottom, #hour_select_top").change(__on_dropdown_change), __on_dropdown_change(null, $("#hour_select_bottom"), !0)
                    },
                    InstallDropdownStylization: function () {
                        var self = this;
                        $(".stylize_me").each(function (idx, obj) {
                                obj = $(obj);
                                var max_list_lenght = obj.hasClass("one_col") ? 100 : self.max_list_len,
                                    values = [],
                                    deflt = "";
                                obj.find("option").each(function (oi, oo) {
                                    values.push([oo.value, oo.text])
                                }), deflt = 0, obj.find('option[selected="selected"]') && (deflt = obj.find('option[selected="selected"]').index()), obj.hide();
                                var lists_cnt = Math.ceil(values.length / max_list_lenght),
                                    h = [];
                                h.push('<div class="rede_dropdown">'), h.push("<label>" + values[deflt][1] + "</label>"...ptionsBranding.page === this.pagesBranding.MAIN_PAGE ? $("<div class='package'> <div class='left'><p>PAKIET</p><p>iplaNetTV</p></div> <div class='separate'></div> <div class='middle'><p>15 kana³ów na ¿ywo.</p><p>Twoja telewizja  - gdziekolwiek jesteœ!</p></div> <div class='separate'></div> <div class='right'><div><ul><li><span>P³aæ raz i ogl¹daj bez ograniczeñ!</span></li><li><span>Znane i lubiane stacje: Discovery, Filmbox, Polsat News i wiele innych!</span></li></ul></div><a href='/pakiet/NETTV'></a></div> </div>").insertAfter(".info") : (this.optionsBranding.page === this.pagesBranding.SHOW_PAGE || this.optionsBranding.page === this.pagesBranding.TITLE_PAGE) && $("section").css({
                                        "border-radius": "5px 5px 0 0"
                                    }): $("section").css({
                                        "border-radius": "5px 5px 0 0"
                                    }), $("#breadcrump").detach().insertBefore($(".info .wrapper")).css({
                                        display: "block"
                                    }), this.createShadowBranding(), $.browser.msie && parseInt($.browser.version) <= 8 && $("section").css({
                                        background: "#FFFFFF"
                                    })
                                }, correctBrandingAfterLoadedAjax: function () {
                                    this.createShadowBranding(!1)
                                },
                                isObject: function (obj) {
                                    return obj === Object(obj)
                                },
                                isArray: Array.isArray || function (obj) {
                                    return {}.toString.call(obj) == "[object Array]"
                                },
                                isEmptyObject: function (o) {
                                    return !this.isObject(o) || this.isArray(o) ? !1 : Object.keys ? Object.keys(o).length === 0 : function (o) {
                                        for (var k in o)
                                            if (o.hasOwnProperty(k)) return !1;
                                        return !0
                                    }(o)
                                },
                                createShadowBranding: function (correct) {
                                    if (this.isEmptyObject(this.optionsBranding)) return !1;
                                    $("section").css({
                                        height: "auto"
                                    });
                                    var cookiesInfo = $("#cookies-info"),
                                        cookiesInfoHeight = $("#cookies-info").css("display") === "block" ? Rede.Ipla2011.cookieInfoContainerHeight : 0,
                                        section = $("section"),
                                        offset = section.offset(),
                                        sectionHeightMin = this.optionsBranding.heightBG - offset.top - parseInt(section.css("padding-top")) - parseInt(section.css("padding-bottom")),
                                        package = $(".package"),
                                        packageHeight = package.length != 0 ? package.height() : 0,
                                        shadowHeightOnWhiteBG = 25,
                                        shadowBox = $(".section-shadow"),
                                        shadowBoxHeight = sectionHeightMin + packageHeight + shadowHeightOnWhiteBG,
                                        self = this;
                                    sectionHeightMin > section.outerHeight() && section.height(sectionHeightMin + shadowHeightOnWhiteBG * 2), shadowBox.length === 0 && (shadowBox = $("<div class='section-shadow'></div>"), $(document.body).append(shadowBox)), shadowBox.css({
                                        top: offset.top + cookiesInfoHeight - packageHeight,
                                        left: offset.left,
                                        width: section.outerWidth()
                                    }), shadowBoxHeight < section.height() + packageHeight ? shadowBox.height(section.outerHeight() + packageHeight - 4) : shadowBox.height(shadowBoxHeight), typeof correct == "undefined" && setTimeout(function () {
                                        self.createShadowBranding(!0)
                                    }, 500), $(document).off().on("HideCookieInfo", function () {
                                        $(".section-shadow").animate({
                                            top: offset.top - packageHeight
                                        }, 500, function () {})
                                    })
                                },
                                truncate: function (text, len, ellipsis) {
                                    var trunc = text;
                                    return trunc.length > len && (trunc = trunc.substring(0, len), trunc = trunc.replace(/\w+$/, ""), typeof ellipsis != "undefined" && (trunc += "...")), trunc
                                },
                                topMenu: function () {
                                    $("div.main_menu_expander").each(function (index, item) {
                                        var list = $(item).find("ul.list_small"),
                                            indexTop = 0,
                                            indexLeft = 0,
                                            index = 0,
                                            padding = 0,
                                            listItems = $(list).find("li");
                                        if ($(this).find("ul.vertical").length != 0) {
                                            var columns = $(this).find("ul.vertical ul").length;
                                            if (columns != 0) {
                                                for (var i = 1; i <= 6; i++) $(this).parent().removeClass("columns_" + i);
                                                $(this).parent().addClass("columns_" + columns);
                                                var widthPrePost = 0,
                                                    jumToService = $(this).find(".jump_to_service");
                                                columns == 1 ? widthPrePost = 80 : columns == 2 ? widthPrePost = 230 : columns == 3 ? widthPrePost = 320 : columns >= 4 && (widthPrePost = 580, columns = 4), $(jumToService).css({
                                                    width: parseInt($(widthPrePost).find("a").css("width")) + widthPrePost + "!important"
                                                }), $(jumToService).find(".pre").css({
                                                    backgroundImage: "url(/assets/common/menu/columns_" + columns + ".png)",
                                                    width: widthPrePost / 2
                                                }), $(jumToService).find(".post").css({
                                                    backgroundImage: "url(/assets/common/menu/columns_" + columns + ".png)",
                                                    width: widthPrePost / 2,
                                                    backgroundPosition: -widthPrePost / 2
                                                })
                                            }
                                        }
                                        $(item).css({
                                            display: "block",
                                            opacity: 0
                                        }), $(listItems).each(function (index, item) {
                                            var top = $(item).position().top;
                                            top > index && (indexTop = top, padding = parseInt($(item).css("padding-bottom")));
                                            var right = $(item).position().left;
                                            right > indexLeft && (indexLeft = right)
                                        }), $(listItems).filter(function (index) {
                                            return $(this).position().top == indexTop
                                        }).css({
                                            "padding-bottom": 0,
                                            "margin-bottom": padding,
                                            opacity: 1
                                        }), $(listItems).filter(function (index) {
                                            return $(this).position().left == indexLeft
                                        }).addClass("last"), $(list).css({
                                            opacity: 1,
                                            height: "auto"
                                        }), $(item).css({
                                            opacity: 1
                                        }).removeAttr("style")
                                    })
                                },
                                img_hit: function (url) {
                                    var img = new Image;
                                    img.src = url, $(img).addClass("img-hit"), document.body.appendChild(img)
                                },
                                correctSizeText: function (obj) {
                                    var limits = [21, 15],
                                        i = 0,
                                        limitsLength = limits.length,
                                        breakFor = !1;
                                    $($(obj).text().trim().split(" ")).each(function (index, item) {
                                        e: for (; i < limitsLength; i++) {
                                            if (item.length > limits[i]) switch (limits[i]) {
                                            case 15:
                                                $(obj).css({
                                                    "line-height": "29px",
                                                    "font-size": "24px",
                                                    padding: "3px 0 7px 0"
                                                }), breakFor = !0;
                                                break;
                                            case 21:
                                                $(obj)
                                                    .css({
                                                        "line-height": "24px",
                                                        "font-size": "19px",
                                                        padding: "3px 0 7px 0"
                                                    }), breakFor = !0
                                            }
                                            if (breakFor) break e
                                        }
                                        if (breakFor) return !1
                                    })
                                }
                            }, Rede.Ipla2011.injectOverlay = function (data, params, callback) {
                                var overlay, body_height, window_height, overlay_height, body;
                                Rede.Ipla2011.overlayStarted = !0, body = $("body"), data = $(data), body_height = body.height(), window_height = $(window).height(), overlay = $('<div id="overlay"></div>'), overlay.append(data), window.overlay_params = params, body.append(overlay), overlay_height = overlay.height(), overlay_height < window_height ? overlay.css("height", window_height) : overlay.css("height", body_height).css("position", "absolute"), overlay.find(".close a").bind("click", Rede.Ipla2011.closeOverlay), centerElement(data), typeof callback == "function" && callback(), $(window).resize(function () {
                                    var window_height;
                                    body_height = $(document.body).height(), window_height = $(window).height(), overlay_height = overlay.height(), overlay.css("height", window_height), centerElement(data)
                                })
                            }, Rede.Ipla2011.centerElement = centerElement
                        }(),
                        function () {
                            "use strict";

                            function VodOptions(params) {
                                this.vod = params.vod, this.serialPage = params.serialPage, this.serialEpisode = params.serialEpisode, this.buttonWatchOnPage = params.buttonWatchOnPage, this.buttonWatchInIpla = params.buttonWatchInIpla, this.buttonBuyVod = params.buttonBuyVod, this.buttonBuyPacket = params.buttonBuyPacket, this.buttonBuyToken = params.buttonBuyToken, this.categoryId = params.categoryId, this.keyCategoryId = params.keyCategoryId
                            }

                            function LiveOptions(params) {
                                this.live = params.live, this.liveId = params.liveId, this.liveUrl = params.liveUrl, this.buyPage = params.buyPage, this.buttonBuyLive = params.buttonBuyLive, this.categoryPage = params.categoryPage, this.playerPage = params.playerPage
                            }

                            function getFromCollection(coll, options, order) {
                                var key, i;
                                if (coll === undefined || coll === null || options === null || options === undefined) return undefined;
                                if (order === null || order === undefined) {
                                    for (key in coll)
                                        if (options[key]) return coll[key]
                                } else
                                    for (i = 0; i < order.length; i += 1) {
                                        key = order[i];
                                        if (key && options[key]) return coll[key]
                                    }
                            }

                            function getImageSource(serial, options, order) {
                                return getFromCollection(IMAGE_SOURCES[serial], options, order)
                            }

                            function getGemiusCode(serial, options, order) {
                                return getFromCollection(GEMIUS_CODES[serial], options, order)
                            }

                            function initLive(options) {
                                var live, img, order, gemiusCode, imageSource;
                                img = new Image, live = LIVES[options.liveUrl] || LIVES[options.liveId], order = ["buttonBuyLive", "buyPage", "categoryPage", "playerPage"], imageSource = getImageSource(live, options, order), gemiusCode = getGemiusCode(live, options, order), imageSource && (img.src = imageSource), typeof window.gemius_hit == "function" && gemiusCode && window.gemius_hit(gemiusCode)
                            }

                            function initByCategoryId(options) {
                                var img, category, imageSrc;
                                img = new Image, category = CATEGORIES[options.categoryId], imageSrc = "http://r.turn.com/r/beacon?b2=LCqSFgAI3at67iQBH_rG6ZaLqanYC5oloeImMZjOPEiYcAHKCsv31JQSm_q3beXYPJzpLP-8JC0xjSS4bWB46A&cid=", SUPPORTED_CATEGORIES.some(function (cat) {
                                    return cat === category
                                }) && (img.src = imageSrc)
                            }

                            function initByHannibalEpisode(options) {
                                var hannibalEpisode, gemiusCode, img, imageSource, episodeNo, order;
                                img = new Image, hannibalEpisode = HANNIBAL_EPISODES[options.vodId], order = ["serialPage", "serialEpisode", "buttonWatchOnPage", "buttonWatchInIpla", "buttonBuyVod", "buttonBuyPacket", "buttonBuyToken"], imageSource = getImageSource("Hannibal", options, order), options.serialEpisode && hannibalEpisode ? (episodeNo = parseInt(String(hannibalEpisode).match(/\d+$/)[0], 10) - 1, gemiusCode = HANNIBAL_GEMIUS_CODES[episodeNo]) : gemiusCode = getGemiusCode("Hannibal", options, order), imageSource && (img.src = imageSource), typeof window.gemius_hit == "function" && gemiusCode && window.gemius_hit(gemiusCode)
                            }

                            function initByKeyCategory(options) {
                                var serial, img, scope, imageSource, order;
                                img = new Image, serial = SERIALS[options.keyCategoryId], serial === "hannibal" ? initByHannibalEpisode(options) : (order = ["serialPage", "serialEpisode", "buttonWatchOnPage", "buttonWatchInIpla"], scope = new VodOptions(options), scope.buttonWatchOnPage === undefined && (scope.buttonWatchOnPage = scope.buttonWatchInIpla), imageSource = getImageSource(serial, scope, order), imageSource && (img.src = imageSource))
                            }

                            function initVod(options) {
                                options.categoryId ? initByCategoryId(options) : options.keyCategoryId && initByKeyCategory(options)
                            }

                            function init(hitCode, options) {
                                options.vod ? initVod(options) : options.live && initLive(options)
                            }

                            function HitCode(options) {
                                init(this, options)
                            }
                            var CATEGORIES, SERIALS, LIVES, HANNIBAL_EPISODES, SUPPORTED_CATEGORIES, IMAGE_SOURCES, HANNIBAL_GEMIUS_CODES, GEMIUS_CODES;
                            VodOptions.prototype = {}, LiveOptions.prototype = {}, CATEGORIES = {
                                1754: "serial",
                                5000916: "animowany",
                                5000915: "internetowy",
                                5000913: "komediowy",
                                5000914: "kryminalny",
                                5000912: "obyczajowy",
                                5001641: "paradokumentalny",
                                5001736: "sensacyjny"
                            }, SERIALS = {
                                5001717: "przyjació³ki",
                                5001187: "rodzinka.pl",
                                5001946: "na krawêdzi",
                                759: "œwiat wed³ug kiepskich",
                                828: "pierwsza mi³oœæ",
                                5001091: "m jak mi³oœæ",
                                5002091: "hannibal",
                                127710: "hannibal"
                            }, HANNIBAL_EPISODES = {
                                5716276: "odcinek 1",
                                5716317: "odcinek 2",
                                5716328: "odcinek 3",
                                5717662: "odcinek 4",
                                5717686: "odcinek 5",
                                5717731: "od...s("
                                blur "),images.each(function(){var index=$(this).index();index===idx?$(this).css({display:"
                                block "}):$(this).css({display:"
                                none "})})})})},CutString:function(str,len,ellipsis){if(str.length>len){var new_str=str.substr(0,len);return ellipsis&&(new_str+="...
                                "),new_str}return str},showPackButton:function(){$.ajax(" / ajax_api / users / bundles ",{dataType:"
                                json ",success:function(data){var pack=$("#
                                autopromo_boxes.packets a.image "),code=pack.attr("
                                data - code ");typeof data[code]!="
                                undefined "&&pack.find("
                                p span ").addClass("
                                zobacz ")}})},ToggleDescription:function(short_descr_element,long_descr_element){var short_descr_element=$(short_descr_element),long_descr_element=$(long_descr_element);if(short_descr_element.text().length<long_descr_element.text().length){var expand=$(" < a > ").text("
                                Wiê cej ").addClass("
                                expand ").click(function(){short_descr_element.hide(),long_descr_element.show()}),fold=$(" < a > ").text("
                                Mniej ").addClass("
                                fold ").click(function(){long_descr_element.hide(),short_descr_element.show()});short_descr_element.append(expand),long_descr_element.append(fold)}}})}(),function(){window.Rede&&window.Rede.Ipla2011&&(window.Rede.Ipla2011.Switcher=function(options){this.parent=window.Rede.Ipla2011,this.container=null,this.navigation_container=null,this.items_count=0,this.interval=null;var defaults={id:"
                                ",nav_id:"
                                ",pause_on_hover:!0,active_item:0,auto_switch:!0,switch_delay:2e3,item_prefix:"
                                ",maxDescHeight:250,text_format:!1};options=options||{},this.options=$.extend({},defaults,options),this.container=$("#
                                "+this.options.id),this.navigation_container=$("#
                                "+this.options.nav_id),this.init=function(){var self=this,chldlist=this.container.children();for(var i=0,l=chldlist.length;i<l;i++){var item=chldlist[i];$(item).attr("
                                id ",self.options.item_prefix+"
                                _ "+i),i===0&&this.formatText(self.options.item_prefix+"
                                _0 "),self.items_count++}this.DrawNavigation(),this.BindNavigationClicks(),this.options.auto_switch===!0&&this.InstallAutoSwitcher()},this.DrawNavigation=function(){var h=[];h.push('<a href="#
                                " class="
                                prev ">&nbsp;</a>');for(var i=0;i<this.items_count;i++){var cls="
                                ";i==this.options.active_item?cls='class="
                                active dots "':cls='class="
                                dots "',h.push('<a href="#
                                " '+cls+' id="
                                '+this.options.nav_id+"_"+i+'
                                ">&nbsp;</a>')}h.push('<a href="#
                                " class="
                                next ">&nbsp;</a>'),this.navigation_container.html(h.join("\
                                n "))},this.BindNavigationClicks=function(){var self=this;this.navigation_container.find(".dots ").unbind().bind("
                                click ",function(){var id=$(this).attr("
                                id ").replace(self.options.nav_id+"
                                _ ","
                                ");return self.SwitchItem(id),self.options.auto_switch===!0&&self.InstallAutoSwitcher(),!1}),$(this.navigation_container).find(".prev ").bind("
                                click ",function(){return self.SwitchToPrevItem(),!1}),$(this.navigation_container).find(".next ").bind("
                                click ",function(){return self.SwitchToNextItem(),!1}),this.options.text_format||this.navigation_container.find(".dots ").eq(0).click()},this.BindHovers=function(){var self=this;this.options.auto_switch===!0&&(this.container.children().unbind().bind("
                                mouseover ",function(){self.ClearAutoSwitcher()}),this.container.children().bind("
                                mouseout ",function(){self.InstallAutoSwitcher()}))},this.SwitchItem=function(id){var old_id=this.options.item_prefix+"
                                _ "+this.options.active_item,new_id=this.options.item_prefix+"
                                _ "+id;$("#
                                "+old_id).hide(),$("#
                                "+new_id).show(),this.options.text_format?this.formatText(new_id):$("#
                                "+new_id+"
                                p,
                                #"+new_id+"
                                h3 ").css("
                                max - height ","
                                none "),$("#
                                "+this.options.nav_id+"
                                _ "+this.options.active_item).removeClass("
                                active "),$("#
                                "+this.options.nav_id+"
                                _ "+id).addClass("
                                active "),this.options.active_item=id},this.SwitchToNextItem=function(){var self=this,next_item=this.options.active_item==this.items_count-1?0:parseInt(this.options.active_item,10)+1;this.SwitchItem(next_item),self.options.auto_switch===!0&&self.InstallAutoSwitcher()},this.SwitchToPrevItem=function(){var self=this,prev_item=this.options.active_item==0?this.items_count-1:parseInt(this.options.active_item,10)-1;this.SwitchItem(prev_item),self.options.auto_switch===!0&&self.InstallAutoSwitcher()},this.InstallAutoSwitcher=function(){var self=this;this.ClearAutoSwitcher(),this.interval=setInterval(function(){self.SwitchToNextItem()},this.options.switch_delay),this.options.pause_on_hover&&this.BindHovers()},this.ClearAutoSwitcher=function(){this.interval!=null&&(clearInterval(this.interval),this.interval=null)},this.formatText=function(id){var title=$("#
                                "+id+"
                                h3 "),title_h=title.height(),desc=$("#
                                "+id+".desc - box p "),desc_h=desc.height(),title_line=40,title_lines=Math.ceil(title_h/title_line),desc_line=18,isPackage=$("#
                                "+id+".vod_in_package_info ").length>0,infoPackage=$("#
                                "+id+".vod_in_package_info ");if(title_lines<=1)desc.css("
                                max - height ",desc_line*7+2+"
                                px "),infoPackage.css({display:"
                                block "});else if(title_lines<=2)isPackage?(desc.css({overflow:"
                                hidden ","
                                max - height ":desc_line*5+2+"
                                px "}),infoPackage.css({display:"
                                block "})):desc.css("
                                max - height ",desc_line*7+2+"
                                px ");else if(title_lines<=3)if(isPackage){desc.css("
                                max - height ",desc_line*3+2+"
                                px "
);var marginTopSlider=10;infoPackage.css({display:"
                                block ","
                                margin - top ":marginTopSlider})}else desc.css("
                                max - height ",desc_line*5+2+"
                                px ");else if(title_lines<=4)if(isPackage){desc.css({display:"
                                none "});var marginTopSlider=10;infoPackage.css({display:"
                                block ","
                                margin - top ":marginTopSlider})}else desc.css({display:"
                                block ",overflow:"
                                hidden ","
                                max - height ":desc_line*3+2+"
                                px "});else isPackage?(desc.hide(),infoPackage.css({display:"
                                block "})):(desc.show(),desc.css("
                                height ",desc_line*4+2+"
                                px "));title.css("
                                max - height ",title_line*4+2+"
                                px ")},this.init()})}(),function(){window.Rede&&window.Rede.Ipla2011&&(window.Rede.Ipla2011.Slider=function(options){this.parent=window.Rede.Ipla2011,this.container=null,this.navigation_container=null,this.items_count=0,this.in_animation=!1,this.items_on_page=10,this.page=1,this.pages_count=1,this.columns_count=5,this.column_width=0;var defaults={id:"
                                ",rows_cnt:2,items_on_page:10,nav_id:"
                                ",pagination_id:"
                                ",slide_by:"
                                item ",active_item:0,item_prefix:"
                                ",keep_order:!1,load_from_json:!1,json_url:"
                                ",on_load:null,no_dots:!1};options=options||{},this.options=$.extend({},defaults,options),this.container=$("#
                                "+this.options.id),this.navigation_container=$("#
                                "+this.options.nav_id),this.options.rows_cnt&&this.options.columns_cnt?(this.items_on_page=this.options.items_on_page=this.options.rows_cnt*this.options.columns_cnt,this.container.parent().addClass("
                                columns_ "+this.options.columns_cnt)):this.items_on_page=this.options.items_on_page,this.init=function(){var self=this;this.options.load_from_json?$.ajax(this.options.json_url,{dataType:"
                                json ",success:function(data){self.container.html("
                                ").append(self.buildList(data.vods)),self.PrepareList(),typeof self.options.on_load=="
                                function "&&self.options.on_load()},error:function(){console.log("
                                AJAX ERROR ")}}):this.PrepareList()},this.buildList=function(data){var ul=document.createElement("
                                ul "),li;for(var i=0;i<data.length;i++){var item=data[i];li=$(" < li > "),li.append($(" < a > ").addClass("
                                img ").attr("
                                href ","#
                                ").append($(" < img > ").attr("
                                src ",item.poster))),li.append($(" < h3 > ").append($(" < a > ").attr("
                                href ","#
                                ").text(item.m_title_en))),li.append($(" < h3 > ").append($(" < a > ").attr("
                                href ","#
                                ").text(item.m_title_pl))),ul.appendChild(li[0])}return ul},this.PrepareList=function(){this.items_count=this.container.find("
                                li ").length;if(this.items_count==0){$("#
                                "+this.options.id).parent().hide();return}if(this.options.slide_by=="
                                page "){var c=1,p=0;while(c<this.items_count)c+=this.items_on_page,p++;this.pages_count=p}else this.pages_count=(this.items_count-this.options.items_on_page)/this.options.rows_cnt+1;this.parent.Debug("
                                slider "+this.options.id+" - "+this.items_count+"
                                elementó w,
                                na stronie: "+this.items_on_page),this.items_count<=this.items_on_page||this.options.pagination_id!="
                                "?this.navigation_container.html("
                                "):(this.navigation_container.html(this.buildNav()),this.updateButtons()),this.columns_count=Math.ceil(this.items_count/this.options.rows_cnt),this.columns_count=typeof this.options.columns_cnt!="
                                undefined "?this.options.columns_cnt:this.columns_count,this.column_width=parseInt($("#
                                "+this.options.id+"
                                li ").width(),10)+parseInt($("#
                                "+this.options.id+"
                                li ").css("
                                paddingLeft "),10)+parseInt($("#
                                "+this.options.id+"
                                li ").css("
                                paddingRight "),10),this.container.find("
                                ul ").css("
                                width ",this.columns_count*this.column_width),Math.ceil(this.items_count/this.options.columns_cnt)<this.options.rows_cnt&&(this.options.rows_cnt=Math.ceil(this.items_count/this.options.columns_cnt));if(this.options.separate_rows_height){var r_h=[],total_h=0,limit=6,closestHidden=$(this.container),checkHidden=!1;while(closestHidden&&closestHidden.css("
                                display ")!=="
                                none "&&limit)closestHidden=closestHidden.parent().closest(": hidden "),limit--;if(limit!=0){var parentContainer=$(this.container).parent(),tempContainer=$(this.container).detach(),styleAttrValue=tempContainer.attr("
                                style ")?tempContainer.attr("
                                style "):"
                                ";tempContainer.css({position:"
                                absolute ",visibility:"
                                hidden ",display:"
                                block ",left:-9999}),$("
                                body ").append(tempContainer)}var items=this.container.find("
                                li ");for(var r=0;r<this.options.rows_cnt;r++){var max_h=0,h,row_items=[];for(var c=0;c<this.options.columns_cnt;c++){var idx=r*this.options.columns_cnt+c,item=items[idx];row_items.push(item);var h=$(item).height();h>max_h&&(max_h=h)}for(var i=0;i<row_items.length;i++)$(row_items[i]).css("
                                height ",max_h+"
                                px ");r_h.push(max_h),total_h+=max_h+parseInt($(row_items[0]).css("
                                paddingBottom "),10)+parseInt($(row_items[0]).css("
                                paddingTop "),10)}limit!=0&&(styleAttrValue&&tempContainer.attr("
                                style ",styleAttrValue),$(parentContainer).append(tempContainer),this.options.pagination_id!="
                                "&&$(parentContainer).append($("#
                                "+this.options.pagination_id)));var parent_div=this.container,first_li=this.container.find("
                                li ").first();this.options.add_height&&(total_h+=this.options.add_height),this.options.min_height&&total_h<this.options.min_height&&(total_h=this.options.min_height),parent_div.css("
                                height ",total_h+"
                                px ")}else{var max_h=0,h;this.container.find("
                                li ").each(function(){h=$(th...r){var img_src='<img src="
                                '+this.items[imgnr][1]+'
                                " alt="
                                " />',self=this;self.big_photo_container.html(img_src),window.opera?self.big_photo_container.find("
                                img ").show():$(img_src).load(function(){var h=self.big_photo_container.find("
                                img ").height();if(h>0){var cont_h=self.big_photo_container.height();self.big_photo_container.find("
                                img ").css({"
                                margin - top ":Math.max(0,parseInt((cont_h-h)/2,10))})}self.big_photo_container.find("
                                img ").fadeIn()}),this.UpdateCurrentImage(imgnr)},UpdateCurrentImage:function(imgnr){this.current_image=imgnr,this.container.find(".nav span ").html(imgnr+1+" / "+this.items_count)},BindClicks:function(){var self=this;this.container.find("
                                ul li a ").bind("
                                click ",function(){var img_id=$(this).attr("
                                id ").split(" - ")[1];img_id=parseInt(img_id,10),self.current_image=img_id,self.DisplayBigImage(self.current_image),self.current_image==self.items_count-1?self.right_arrow_obj.hide():self.right_arrow_obj.show(),self.current_image==0?self.left_arrow_obj.hide():self.left_arrow_obj.show()}),this.right_arrow_obj.bind("
                                click ",function(){return self.ShowNextImage(),!1}),this.left_arrow_obj.bind("
                                click ",function(){return self.ShowPrevImage(),!1}),this.container.find(".gallery_items > .nav_next ").bind("
                                click ",function(){self.ShowNextPage()}),this.container.find(".gallery_items > .nav_prev ").bind("
                                click ",function(){self.ShowPrevPage()})},ShowNextPage:function(){var self=this;this.current_page<self.max_pages&&this.gallery_items.animate({left:" -= "+6*this.item_width+"
                                px "},this.parent.animation_speed.veryfast,function(){self.container.find(".gallery_items > .nav_prev ").show(),self.current_page++,self.current_page==self.max_pages&&self.container.find(".gallery_items > .nav_next ").hide()})},ShowPrevPage:function(){var self=this;this.current_page>1&&this.gallery_items.animate({left:" += "+6*this.item_width+"
                                px "},this.parent.animation_speed.veryfast,function(){self.current_page--,self.container.find(".gallery_items > .nav_next ").show(),self.current_page==1&&self.container.find(".gallery_items > .nav_prev ").hide()})},ShowNextImage:function(){this.current_image<this.items_count-1&&(this.DisplayBigImage(++this.current_image),this.left_arrow_obj.show(),this.current_image==this.items_count-1&&this.right_arrow_obj.hide())},ShowPrevImage:function(){this.current_image>0&&(this.DisplayBigImage(--this.current_image),this.right_arrow_obj.show(),this.current_image==0&&this.left_arrow_obj.hide())}})}(),function(){window.Rede&&window.Rede.Ipla2011&&(window.Rede.Ipla2011.Popup={parent:window.Rede.Ipla2011,init:function(ask_password){this.PreparePopupBackground(),this.ShowPopupWindow(ask_password),this.HidePopupWindow()},PreparePopupBackground:function(){var popup='<div id="
                                delete - account - popup "><div id="
                                popup - background "><div class="
                                popup - window "><div class="
                                inner "><div class="
                                popup - top "><h3>USUWANIE KONTA</h3><div class="
                                close "><a href="#
                                ">Zamknij</a></div></div><div class="
                                clear "></div><div class="
                                popup - body "><form method="
                                post " action=" / Usun - konto " class="
                                inner - text "><p class="
                                text - top ">Usuwaj¹c konto stracisz dostêp do dodatkowych funkcjonalnoœci w serwisie, a twoje aktywne pakiety i us³ugi strac¹ wa¿noœæ.</p><p class="
                                text - bottom ">Czy na pewno chcesz usun¹æ konto?</p><dl class="
                                password "><dt><span class="
                                label ">has³o</span></dt><dd><div class="
                                input - left "></div><div class="
                                input "><input type="
                                password " name="
                                password "/></div><div class="
                                input - right "></div></dd></dl><div class="
                                btns "><div class="
                                delete - account - popup "><input type="
                                submit " id="
                                delAccountInput " value="
                                Usuñ konto " /><a href="#
                                ">Usuñ konto</a></div><div class="
                                cancel "><a href="#
                                ">Anuluj</a></div></div></form></div></div></div></div></div>';$("#
                                delete - account - popup ").length<=0&&$("
                                body ").append(popup);if($("#
                                delete - account - popup# popup - background ").length>=0){var body_height=$("
                                body ").height();$("
                                div# popup - background ").css({height:body_height})}},ShowPopupWindow:function(ask_password){$(".delete - account a ").bind("
                                click ",function(){$("
                                div# delete - account - popup div# popup - background ").show(),$("
                                div.delete - account - popup input ").show(),$("
                                div.delete - account - popup a ").hide(),ask_password?$(".popup - window dl.password ").show():$(".popup - window dl.password ").hide(),$("
                                div.cancel a ").html("
                                Anuluj ")})},HidePopupWindow:function(){$(".close a,
                                div.cancel a ").bind("
                                click ",function(){$("
                                div# popup - background ").hide(),$("
                                dl.password ").hide(),$(".popup - window p.text - bottom ").show()})},ShowHiddenField:function(){$(".delete - account - popup a ").bind("
                                click ",function(){$(".popup - window p.text - bottom ").hide(),$(".popup - window dl.password ").show(),$("
                                div.delete - account - popup a ").hide(),$("
                                div.delete - account - popup input ").show(),$("
                                div.cancel a ").html("
                                Anuluj ")})},ShowPopupStatic:function(){$("
                                div# popup - background ").show()}})}(),function(){window.Rede&&window.Rede.Ipla2011&&(window.Rede.Ipla2011.Tabs={tabs:null,tabs_nb:null,tabs_on_page:4,step:0,init:function(){var self=this;this.tabs=$(".payment_tabs li "),this.tabs_nb=this.tabs.length,this.tabs_nb>this.tabs_on_page&&($(".payment_tabs_wrap.nav ")
.css("
                                display ","
                                block "),$(".payment_tabs_wrap.next ").click(function(){return self.next(),!1}),$(".payment_tabs_wrap.prev ").click(function(){return self.prev(),!1}),this.posTabs())},next:function(){this.step!=this.tabs_nb-this.tabs_on_page&&this.step++,this.posTabs()},prev:function(){this.step!=0&&this.step--,this.posTabs()},posTabs:function(){$(".payment_tabs ul ").css({left:this.step*-208}),this.showNav()},showNav:function(){this.step==this.tabs_nb-this.tabs_on_page?$(".payment_tabs_wrap.next ").hide():$(".payment_tabs_wrap.next ").show(),this.step==0?$(".payment_tabs_wrap.prev ").hide():$(".payment_tabs_wrap.prev ").show()}})}(),function(){window.Rede&&window.Rede.Ipla2011&&(window.Rede.Ipla2011.Notify={parent:window.Rede.Ipla2011,init:function(config){this.opts=config,this.SetBgHeight(),this.PositionNotify(),this.BindClose()},PositionNotify:function(){$(this.opts.container).css({position:"
                                absolute ",left:" - 2000px ",top:0,display:"
                                none "}).show();var cont=$(this.opts.container).find("#
                                notify - wrap "),windowW=$(window).width(),windowH=$(window).height(),contW=cont.width(),contH=cont.height();$(this.opts.container).hide().removeAttr("
                                style "),cont.css({left:parseInt(windowW/2-contW/2),top:parseInt(windowH/2-contH/2)})},SetBgHeight:function(){var cont=$(this.opts.container).find("#
                                popup - background ");cont.css({height:$("
                                body ").height()})},BindClose:function(){var cont=$(this.opts.container),closeLink=$(this.opts.container).find(".close ");closeLink.live("
                                click ",function(){return cont.hide(),!1})},ShowNotify:function(){var cont=$(this.opts.container);cont.show()}})}(),function(){window.Rede&&window.Rede.Ipla2011&&(window.Rede.Ipla2011.Videos={parent:window.Rede.Ipla2011,init:function(){this.BindTitlesFilteringCriteriaChange()},BindTitlesFilteringCriteriaChange:function(){var data={channel:$(".channel_select select ").val(),title_lang:$(".titles_lang_select.selected ").attr("
                                rel "),letter:"
                                "},self=this;$(".letter_select_bar.selected ").length>0&&(data.letter=$(".letter_select_bar.selected a ").attr("
                                href ").substring(1)),$(".channel_select select ").bind("
                                change ",function(){return data.channel=$(this).val(),self.FillFilteringFormWithData(data),!1})},FillFilteringFormWithData:function(data){var base_url=" / VOD / index ";for(var elt in data)typeof elt=="
                                string "&&(elt=="
                                channel "&&data[elt]?base_url=base_url+" / channel - "+data[elt]:elt=="
                                title_lang "&&(base_url=base_url+" / title_lang - "+data[elt]));window.location.pathname=base_url}})}(),function(){window.Rede||(window.Rede={}),window.Rede.Ipla2011||(window.Rede.Ipla2011={}),window.Rede&&window.Rede.Ipla2011&&(window.Rede.Ipla2011.TrailersBox=function(name,vods,width,height,live,pathToSWF){var paused=!1,self=this,shuffle=function(o){for(var j,x,i=o.length;i;j=parseInt(Math.random()*i),x=o[--i],o[i]=o[j],o[j]=x);return o},vods=shuffle(vods),currentVod=0,firstVod=vods[currentVod],block=$("#
                                "+name),intervalId=0,volume=0,intervalTimeId=0,autoPlay=!0,player=null,allowFullScreen=!1,links=block.find(".link "),titles=block.find(".title "),categories=block.find(".category "),controls=block.find(".controls "),overlay=block.find(".overlay ");window.Rede.Ipla2011.MainPage.showTrailerSportowy&&name!="
                                trailerBoxSport "&&(autoPlay=!1),live&&(autoPlay=!0,allowFullScreen=!0);var playerVars={videoFlashPlayerApiObj:"
                                window.
                                "+name+".flashPlayerApi "},setMetadata=function(vod){titles.text(vod.title),links.attr("
                                href ",vod.url),overlay.data("
                                href ",vod.url),categories.text(vod.category),categories.attr("
                                href ",vod.category_url),playerVars.autoPlay=typeof vod.autoPlay=="
                                undefined "?autoPlay:vod.autoPlay,playerVars.volume=typeof vod.volume=="
                                undefined "?volume:vod.volume,playerVars.loadAndPlay=typeof vod.loadAndPlay=="
                                undefined "?null:vod.loadAndPlay,playerVars.pathAdvertisementXML=typeof vod.pathAdvertisementXML=="
                                undefined "?null:vod.pathAdvertisementXML,playerVars.videoURL=vod.trailer,playerVars.playerBarJS=typeof vod.playerBarJS=="
                                undefined "?"
                                true ":vod.playerBarJS,playerVars.aspect=typeof vod.aspect=="
                                undefined "?"
                                16: 9 ":vod.aspect,playerVars.scaleMode=typeof vod.scaleMode=="
                                undefined "?null:vod.scaleMode,playerVars.gsmIdentifier="
                                coJA4oNy85.24TETkE3KnJaF31MFQkbGWZkTog2bSFn.57 ",playerVars.gsmHitcollector=typeof vod.gsmHitcollector=="
                                undefined "?"
                                http: //spl.hit.gemius.pl":vod.gsmHitcollector,playerVars.id=typeof vod.id=="undefined"?"":vod.id,playerVars.cpid=typeof vod.cpid=="undefined"?"1":vod.cpid,playerVars.treeId=typeof vod.treeId=="undefined"?"1":vod.treeId,playerVars.series=typeof vod.series=="undefined"?"1":vod.series,playerVars.title=typeof vod.title=="undefined"?"":vod.title+" - Zwiastun",playerVars.distributor=typeof vod.distributor=="undefined"?"":vod.distributor,playerVars.ga=typeof vod.ga=="undefined"?"":vod.ga,playerVars.model=typeof vod.model=="undefined"?"free":vod.model,playerVars.quality=typeof vod.quality=="undefined"?"":vod.quality,playerVars.type=typeof vod.type=="undefined"?"":vod.type,playerVars.duration=typeof vod.duration=="undefined"?"":vod.duration};setMetadata(firstVod),live&&$.extend(playerVa..._americas")return user_exp.indexOf(value)!==-1?"true":"false"},split_grant_exp=function(exp,user_exp,f){var i,j,v,w,_ref;exp=exp.split("+");for(i in exp){v=exp[i],exp[i]=v.split("*"),_ref=exp[i];for(j in _ref)w=_ref[j],exp[i][j]=f(exp[i][j],user_exp),exp[i][j]!=="false"&&(exp[i][j]="true");exp[i]=exp[i].join("&&")}return exp=exp.join("||"),exp},lock_button=function(elem,user_exp){var exp;exp=$(elem).attr("dataexp"),exp=split_grant_exp(exp,user_exp,lock_condition);if(eval(exp))return $(elem).addClass("disabled")},lock_icon=function(elem,user_exp){var exp,lock_marker;exp=$(elem).attr("dataexp"),exp=split_grant_exp(exp,user_exp,lock_condition);if(!eval(exp))return lock_marker=$("<span>").addClass("iconLOCK"),$(elem).parent().append(lock_marker)},window.Rede.Ipla2011.deleteUserExp=function(){return $.cookie("ipla_user_exp","",{expires:-1})},window.Rede.Ipla2011.setUserExp=function(user_exp){var INTERVAL,date;return INTERVAL=1e5,date=new Date((new Date).getTime()+INTERVAL),$.cookie("ipla_user_exp",user_exp,{expires:date})},window.Rede.Ipla2011.getUserExp=function(){return $.cookie("ipla_user_exp")}}.call(this),function(Rede,$){"use strict";var packets;Rede.Ipla2013===undefined&&(Rede.Ipla2013={}),packets=Rede.Ipla2013.Packets={},packets.init=function(){this.root=$("#packet-price-infos"),this.root.length>0&&(this.getData(),this.findPorts(),this.bindPackPurchase())},packets.findPorts=function(){return this.normalDuration=this.root.find("#normal_user_packet_time"),this.normalPrice=this.root.find("#normal_user_packet_price"),this.polsatUser=this.root.find("#packet_for_polsat_user"),this.polsatPrice=this.polsatUser.find("#polsat_user_packet_price"),this.buyButton=this.root.find("#packet_buy_button"),!0},packets.getData=function(){$.getJSON($("#json_packet_price_url").data("url"),function(packetPrice){packets.fill(packetPrice)})},packets.bindPackPurchase=function(){$(".unavailable .pack_purchase").click(function(){return!1})},packets.fill=function(packetPrice){var p;this.normalDuration.html(packetPrice.normal.duration),this.normalPrice.html(packetPrice.normal.price),packetPrice.cp&&(this.polsatPrice.html(packetPrice.cp),this.polsatUser.show(0)),packetPrice.button.show===!1?$("#hide-if-unlimited").hide(0):packetPrice.button.text==="Przed³u¿"&&(this.normalPrice.parent().hide(0),p=$("<p></p>"),p.html(packetPrice.normal.price),p.insertAfter(this.normalPrice.parent())),packetPrice.button.show!==!1&&(this.buyButton.show(0),this.buyButton.find(".label:first").html(packetPrice.button.text))},$(function(){packets.init()})}(window.Rede,jQuery),function(){"use strict";function isStaging(){return!!window.location.hostname.match(/staging/)}function isDevelopment(){return CHECK.some(function(name){return window.location.hostname.match(new RegExp(name))})}function isProduction(){return!isDevelopment()&&!isStaging()}function currentEnvironment(){var r;return enforcedEnv?r=enforcedEnv:isProduction()?r="production":isStaging()?r="staging":isDevelopment()&&(r="development"),r}function setRede(){ENVS.forEach(function(env){return testers[env]()||enforcedEnv===env}),$("body").trigger("environment:changed",currentEnvironment())}function init(env){setRede(),isProduction()||(window.development=!0);try{if(!isProduction())try{Object.defineProperty(window,"development",{value:!0})}catch(e){window.development=!0}}catch(es){}}function Environment(){init(this)}var enforcedEnv,ENVS,CHECK,testers;enforcedEnv=!1,testers={},CHECK=[],ENVS=["development","production","staging"],testers.staging=isStaging,testers.production=isProduction,testers.development=isDevelopment,Environment.prototype={},CHECK.push("localhost"),CHECK.push("frontend\\d+-dev.vm.redefine.pl"),CHECK.push("172.16.110.42"),Environment.prototype.forceEnvironment=function(env){enforcedEnv=env,setRede()},Environment.prototype.isProduction=function(){return enforcedEnv==="production"||currentEnvironment()==="production"},Environment.prototype.isntProduction=function(){return enforcedEnv!=="production"||currentEnvironment()!=="production"};try{Object.defineProperty(Environment.prototype,"constructor",{value:Environment}),Object.defineProperty(Environment.prototype,"toString",{value:currentEnvironment}),Object.defineProperty(Environment,"toString",{value:function(){return Environment.name}}),Object.defineProperty(Rede,"Environment",{value:Environment}),Object.defineProperty(Rede,"env",{value:new Environment})}catch(e){Environment.prototype.constructor=Environment,Environment.prototype.toString=currentEnvironment,Environment.toString=function(){return Environment.name},Rede.Environment=Environment,Rede.env=new Environment}}(),$(function(){"use strict";$("body").on("init:vods:buttons",function(){window.Rede.Ipla2011.VodPriceHandler(),$("span.not-accessible").length&&window.Rede.blockPlayerButton(),$("div.vod_in_package_info").append($("#cnt_vod_in_package_info p")).css("display","block"),$(".vod_platforms").append($("#cnt_vod_platforms").html()).show(),$("p.icons").append($("#cntIcons span")),
                                $("span.premier-isnt-blank").length ? $(".premiere").bind("mouseover", function () {
                                    var p = $(".icons").position();
                                    $("#vod_details_tooltip_premiere").css({
                                        left: parseInt(p.left, 10) - 20 + "px",
                                        top: parseInt(p.top, 10) + 15 + "px"
                                    }), window.show_tooltip()
                                }) : $("span.vod-is-hit").length && $(".hit").bind("mouseover", function () {
                                    var p = $(".icons").position();
                                    $("#vod_details_tooltip_hit").css({
                                        left: parseInt(p.left, 10) - 40 + "px",
                                        top: parseInt(p.top, 10) + 15 + "px"
                                    }), window.show_tooltip()
                                })
                            }), $(document).on("click", "#access_buttons .watchOnPage", function () {
                            var idHandler = $("span#vod_info_get_key_category_id");
                            $(this).hasClass("gfx_button") ? (Rede.Ipla2011.GemiusPrism.init(Rede.Ipla2011.GemiusPrism.Actions.WATCH_IN_WWW), Rede.Ipla2011.GemiusPrism.SendHit()) : $(this).hasClass("open_in_ipla") && (Rede.Ipla2011.GemiusPrism.init(Rede.Ipla2011.GemiusPrism.Actions.WATCH_IN_IPLA), Rede.Ipla2011.GemiusPrism.SendHit())
                        })
                    }),
                function () {
                    "use strict";

                    function appendLoader(silverlight) {
                        var loader;
                        Rede.Ipla2011.injectOverlay(silverlight.wrapper, null, null), loader = silverlight.wrapper.find("#silverlight-ajax-loader"), $("#overlay").append(loader.detach().show()), Rede.Ipla2011.centerElement(loader);
                        try {
                            Object.defineProperty(silverlight, "loader", {
                                value: loader,
                                writable: !0
                            })
                        } catch (e) {
                            silverlight.loader = loader
                        }
                        $(document).on(Events.MEDIA_OPENED_EVENT, function () {
                            silverlight.hideLoader()
                        })
                    }

                    function lazyClose() {
                        $("#silverlightPlayer").remove(), Rede.Ipla2011.closeOverlay()
                    }

                    function setupCustoms(params) {
                        customSplashScreen && (params.splashscreensource = "/assets/Empty.xamp"), hardwareAcceleration && (params.enableGPUAcceleration = "true"), htmlAccess && (params.enableHtmlAccess = "true")
                    }

                    function closeCallback() {
                        setTimeout(lazyClose, 200)
                    }

                    function closeOnClick(silver, button) {
                        button.on("click", function () {
                            silver.runtime && silver.stop(), closeCallback()
                        })
                    }

                    function init(silver, params) {
                        var events, builder;
                        params.uid = Date.now().toString(), setupCustoms(params), silver.uid = params.uid, silver.id = slid += 1, events = new Rede.Ipla2013.Silverlight.Events(silver, params), silver.events = events, builder = new Rede.Ipla2013.Silverlight.Builder(silver, params), silver.builder = builder;
                        try {
                            Object.defineProperty(silver, "uid", {
                                value: params.uid,
                                enumerable: !0
                            }), Object.defineProperty(silver, "id", {
                                value: slid,
                                enumerable: !0
                            }), Object.defineProperty(silver, "events", {
                                value: events,
                                enumerable: !0
                            }), Object.defineProperty(silver, "builder", {
                                value: builder,
                                enumerable: !0
                            })
                        } catch (e) {}
                    }

                    function Silverlight(params) {
                        params && init(this, params)
                    }
                    var slid, Logger, Events, customSplashScreen, hardwareAcceleration, htmlAccess;
                    slid = 0, customSplashScreen = !1, hardwareAcceleration = !1, htmlAccess = !1, Silverlight.prototype = {}, Silverlight.prototype.initParams = !0, Silverlight.prototype.appendEvents = !0, Silverlight.prototype.id = 0, Silverlight.prototype.uid = "", Silverlight.prototype.builder = null, Silverlight.prototype.events = null, Silverlight.prototype.runtime = null, Silverlight.prototype.element = $(), Silverlight.prototype.onLoadName = "", Silverlight.prototype.onErrorName = "", Silverlight.prototype.onLogName = "", Silverlight.prototype.type = "application/x-silverlight-2", Silverlight.prototype.data = "data:application/x-silverlight-2,", Silverlight.prototype.play = function () {
                        this.runtime.Player.Play(), this.trigger(Events.PLAY_MOVIE_EVENT, this)
                    }, Silverlight.prototype.pause = function () {
                        this.runtime.Player.Pause(), this.trigger(Events.PAUSE_MOVIE_EVENT, this)
                    }, Silverlight.prototype.stop = function () {
                        this.runtime.Player.Stop(), this.trigger(Events.STOP_MOVIE_EVENT, this)
                    }, Silverlight.prototype.toggleControlPanel = function () {
                        this.runtime.Player.ToggleControlPanel(), this.trigger(Events.TOGGLE_CONTROL_PANEL_EVENT, this)
                    }, Object.defineProperty(Silverlight.prototype, "constructor", {
                        value: Silverlight,
                        enumerable: !0
                    }), Silverlight.prototype.on = function on(eventName, callback) {
                        return $(document).on(eventName, callback), this
                    }, Silverlight.prototype.one = function on(eventName, callback) {
                        return $(document).one(eventName, callback), this
                    }, Silverlight.prototype.trigger = function trigger(eventName, data) {
                        return window.logger.info("Emit event: " + eventName), $(document).trigger(eventName, data), this
                    }, Silverlight.prototype.setCloseButton = function (element) {
                        return closeOnClick(this, element), this
                    }, Silverlight.prototype.loader = $(), Silverlight.toString = function () {
                        return Silverlight.name
                    }, Silverlight.prototype.hideLoader = function () {
                        if (!this.loader) throw new Error("To hide loader you must first show it.");
                        this.loader.hide(0), Rede.Ipla2011.centerElement(this.wrapper)
                    }, Silverlight.prototype.showLoader = function () {
                        this.loader.length && this.loader.remove(), appendLoader(this)
                    };
                    try {
                        Object.defineProperty(Silverlight, "toString", {
                            value: function () {
                                return Silverlight.name
                            }
                        }), Object.defineProperty(Silverlight, "customSplashscreen", {
                            get: function () {
                                return customSplashScreen
                            },
                            set: function (v) {
                                customSplashScreen = !! v
                            }
                        }), Object.defineProperty(Silverlight, "hardwareAcceleration", {
                            get: function () {
                                return hardwareAcceleration
                            },
                            set: function (v) {
                                hardwareAcceleration = !! v
                            }
                        }), Object.defineProperty(Silverlight, "htmlAccess", {
                                get: function () {
                                    return htmlAccess
                                },
                                set: function (v) {
                                    htmlAcces...AUTH_FAILED_EVENT,
                                    function () {
                                        redirectOnError({
                                            errorRedirectUrl: "/Wyloguj",
                                            notifyAirBrake: null,
                                            errorDescription: null,
                                            errorLink: null,
                                            errorText: null,
                                            errorType: null
                                        })
                                    }).on(Events.PAYBACK_TIME_EVENT, function () {
                                    redirectOnError({
                                        errorRedirectUrl: "/pakiet/EXTRA",
                                        notifyAirBrake: null,
                                        errorDescription: null,
                                        errorLink: null,
                                        errorText: null,
                                        errorType: null
                                    })
                                }).on(Events.DRM_EVENT, function () {
                                    redirectOnError({
                                        errorLink: null,
                                        errorDescription: null,
                                        errorText: "Ten materia³ mo¿e byæ odtwarzany tylko w aplikacji ipla",
                                        errorType: null,
                                        notifyAirBrake: 1,
                                        errorRedirectUrl: null
                                    })
                                }).on(Events.RED_EVENT, function (event, url, log) {
                                    $.ajax({
                                        type: "POST",
                                        url: url,
                                        data: "json=" + encodeURIComponent(log)
                                    })
                                }).on(Events.BEFORE_ERROR_EVENT, function () {
                                    silverlight.wrapper.hide(0)
                                })
                            }

                            function createWrapper() {
                                return $("#overlay_play_on_www #playerContainer").find("#silverlight-player_template").clone()
                            }

                            function init(silver, params) {
                                silver.wrapper = createWrapper(), silver.wrapper.find("#player-embed").append(silver.element), silver.setCloseButton(silver.wrapper.find("#player-close a")), setEvents(silver), silver.element.show(), Rede.env.isntProduction() && (window.silverlight = silver)
                            }

                            function IplaSilverlight(params) {
                                Silverlight.call(this, params), params && init(this, params)
                            }
                            var Silverlight, Events, Logger, silverlight, playerContainer, prefixForUrl; Silverlight = Rede.Ipla2013.Silverlight, Events = Silverlight.Events, Logger = Silverlight.Logger, prefixForUrl = function (path) {
                                return /\?/.test(path) ? "&" : "?"
                            }, IplaSilverlight.prototype = new Rede.Ipla2013.Silverlight(null), IplaSilverlight.prototype.wrapper = $();
                            try {
                                Object.defineProperty(IplaSilverlight, "toString", {
                                    value: function () {
                                        return "IplaSilverlight"
                                    }
                                }), Object.defineProperty(IplaSilverlight.prototype, "constructor", {
                                    value: IplaSilverlight
                                }), Object.defineProperty(Rede.Ipla2013, "IplaSilverlight", {
                                    value: IplaSilverlight,
                                    enumerable: !0
                                })
                            } catch (e) {
                                IplaSilverlight.toString = function () {
                                    return IplaSilverlight.name
                                }, IplaSilverlight.prototype.constructor = IplaSilverlight, Rede.Ipla2013.IplaSilverlight = IplaSilverlight
                            }
                        }(),
                        function () {
                            "use strict";

                            function createWrapper() {
                                return $("#overlay_play_on_www #playerContainer").find("#silverlight-player_template").clone()
                            }

                            function init(silver, params) {
                                window.logger.info("Build Trailer Player"), silver.wrapper = createWrapper(), silver.wrapper.find("#player-embed").append(silver.element), silver.setCloseButton(silver.wrapper.find("#player-close a")), silver.element.show(), silver.wrapper.show(), Rede.env.isntProduction() && (window.trailer = silver)
                            }

                            function TrailerPlayer(params) {
                                Silverlight.call(this, params), params && init(this, params)
                            }
                            var Silverlight;
                            Silverlight = Rede.Ipla2013.Silverlight, $(function () {
                                $.getScript("https://www.youtube.com/player_api")
                            }), TrailerPlayer.prototype = new Silverlight(null), TrailerPlayer.prototype.initParams = !1, TrailerPlayer.prototype.appendEvents = !0, TrailerPlayer.prototype.type = "application/x-shockwave-flash", TrailerPlayer.prototype.data = "/swf/video2.swf", Object.defineProperty(Rede.Ipla2013, "TrailerPlayer", {
                                value: TrailerPlayer,
                                enumerable: !0
                            }), Object.defineProperty(TrailerPlayer, "toString", {
                                value: function () {
                                    return TrailerPlayer.name
                                }
                            }), Object.defineProperty(TrailerPlayer.prototype, "constructor", {
                                value: TrailerPlayer
                            })
                        }(),
                        function () {
                            "use strict";

                            function buildLoader(player) {
                                player.showLoader()
                            }

                            function createNewPlayer(json) {
                                var silverlight;
                                silverlight = new Rede.Ipla2013.IplaSilverlight(json), buildLoader(silverlight), silverlight.wrapper.css({
                                    left: "-60000px"
                                })
                            }

                            function createTrailerPlayer(element) {
                                var data, trailerPlayer;
                                element = $(element), data = element.data("params"), data = Object.create(data), trailerPlayer = new Rede.Ipla2013.TrailerPlayer(data), buildLoader(trailerPlayer), element.data("source") !== "youtube" ? (trailerPlayer.wrapper.css({
                                    height: 427,
                                    width: 670
                                }), trailerPlayer.trigger(Rede.Ipla2013.Silverlight.Events.MEDIA_OPENED_EVENT), Rede.Ipla2011.centerElement(trailerPlayer.wrapper), trailerPlayer.loader.remove()) : trailerPlayer.wrapper.css({
                                    left: "-60000px"
                                })
                            }

                            function showPlayer(event) {
                                var element, d;
                                event.preventDefault(), element = $(event.target), element.data("params") && (d = element.data("params")), createNewPlayer(Object.create(d || data))
                            }

                            function showTrailerPlayer(event) {
                                event.preventDefault(), createTrailerPlayer(event.target)
                            }

                            function showHidden() {
                                $(".trailer-element").css({
                                    display: "block"
                                }), $(".vod_photo a").css({
                                    display: "block"
                                })
                            }

                            function init() {
                                var handler;
                                initialized || (window.logger.debug("initialize player"), Events = Events || Rede.Ipla2013.Silverlight.Events, initialized = !0, handler = $("#silverlight-data"), window.logger.info("Player data handler exists: " + (handler.length > 0)), handler.length > 0 && (data = handler.data("params"), window.gt_code = data.gemius_traffic_code, delete data.gemius_traffic_code, showHidden()))
                            }
                            var Player, data, Events, initialized;
                            Player = {}, Player.forceInit = init;
                            try {
                                Object.defineProperty(Player, "constructor", {
                                    value: function Player() {
                                        throw new Error("Singleton class")
                                    }
                                }), Object.defineProperty(Player, "toString", {
                                    value: function () {
                                        return "Rede.Ipla2013.Player"
                                    }
                                }), Object.defineProperty(Rede.Ipla2013, "Player", {
                                    value: Player,
                                    enumerable: !0
                                })
                            } catch (e) {
                                Rede.Ipla2013.Player = Player, Player.constructor = function Player() {
                                    throw new Error("Singleton class")
                                }, Player.toString = function () {
                                    return "Rede.Ipla2013.Player"
                                }
                            }
                            $(function () {
                                window.logger.info("Player mount listeners for player"), $("body").on("click", ".vod_watch_links a.watchOnPage, .vod_photo a", showPlayer).on("click", ".trailers a", showTrailerPlayer).on("init:vods:buttons", function () {
                                    window.logger.debug("catch init event!"), init()
                                })
                            })
                        }(),
                        function ($) {
                            $.fn.ajaxfileupload = function (options) {
                                var settings = {
                                    params: {},
                                    action: "",
                                    onStart: function () {
                                        console.log("starting upload"), console.log(this)
                                    },
                                    onComplete: function (response) {
                                        console.log("got response: "), console.log(response), console.log(this)
                                    },
                                    onCancel: function () {
                                        console.log("cancelling: "), console.log(this)
                                    },
                                    valid_extensions: ["gif", "png", "jpg", "jpeg"],
                                    submit_button: null
                                }, uploading_file = !1;
                                return options && $.extend(settings, options), this.each(function () {
                                    var $element = $(this);
                                    if ($element.data("ajaxUploader-setup") === !0) return;
                                    $element.change(function () {
                                        uploading_file = !1, settings.submit_button == null && upload_file()
                                    }), settings.submit_button != null && settings.submit_button.click(function () {
                                        uploading_file || upload_file()
                                    });
                                    var upload_file = function () {
                                        if ($element.val() == "") return settings.onCancel.apply($element, [settings.params]);
                                        var ext = $element.val().split(".").pop().toLowerCase();
                                        if ($.inArray(ext, settings.valid_extensions) == -1) settings.onComplete.apply($element, [{
                                                status: !1,
                                                message: "The select file type is invalid. File must be " + settings.valid_extensions.join(", ") + "."
                                            },
                                            settings.params
                                        ]);
                                        else {
                                            uploading_file = !0, wrapElement($element);
                                            var ret = settings.onStart.apply($element);
                                            ret !== !1 && $element.parent("form").submit()
                                        }
                                    };
                                    $element.data("ajaxUploader-setup", !0);
                                    var handleResponse = function (loadedFrame, element) {
                                        var response, responseStr = loadedFrame.contentWindow.document.body.innerHTML;
                                        try {
                                            response = JSON.parse(responseStr)
                                        } catch (e) {
                                            response = responseStr
                                        }
                                        element.siblings().remove(), element.unwrap(), uploading_file = !1, settings.onComplete.apply(element, [response, settings.params])
                                    }, wrapElement = function (element) {
                                            var frame_id = "ajaxUploader-iframe-" + Math.round((new Date).getTime() / 1e3);
                                            $("body").after('<iframe width="0" height="0" style="display:none;" name="' + frame_id + '" id="' + frame_id + '"/>'), $("#" + frame_id).load(function () {
                                                handleResponse(this, element)
                                            }), element.wrap(function () {
                                                return '<form action="' + settings.action + '" method="POST" enctype="multipart/form-data" target="' + frame_id + '" />'
                                            }).after(function () {
                                                var key, html = "";
                                                for (key in settings.params) html += '<input type="hidden" name="' + key + '" value="' + settings.params[key] + '" />';
                                                return html
                                            })
                                        }
                                })
                            }
                        }(jQuery),
                        function ($) {
                            $.fn.editable = function (target, options) {
                                if ("disable" == target) {
                                    $(this).data("disabled.editable", !0);
                                    return
                                }
                                if ("enable" == target) {
                                    $(this).data("disabled.editable", !1);
                                    return
                                }
                                if ("destroy" == target) {
                                    $(this).unbind($(this).data("event.editable")).removeData("disabled.editable").removeData("event.editable");
                                    return
                                }
                                var settings = $.extend({}, $.fn.editable.defaults, {
                                    target: target
                                }, options),
                                    plugin = $.editable.types[settings.type].plugin || function () {}, submit = $.editable.types[settings.type].submit || function () {}, buttons = $.editable.types[settings.type].buttons || $.editable.types.defaults.buttons,
                                    content = $.editable.types[settings.type].content || $.editable.types.defaults.content,
                                    element = $.editable.types[settings.type].element || $.editable.types.defaults.element,
                                    reset = $.editable.types[settings.type].reset || $.editable.types.defaults.reset,
                                    callback = settings.callback || function () {}, onedit = settings.onedit || function () {}, onsubmit = settings.onsubmit || function () {}, onreset = settings.onreset || function () {}, onerror = settings.onerror || reset;
                                return settings.tooltip && $(this).attr("title", settings.tooltip), settings.autowidth = "auto" == settings.width, settings.autoheight = "auto" == settings.height, this.each(function () {
                                        var self = this,
                                            savedwidth = $(self).width(),
                                            savedheight = $(self).height();
                                        $(this).data("event.editable", settings.event), $.trim($(this).html()) || $(this).html(settings.placeholder), $(this).bind(settings.event, function (e) {
                                                if (!0 === $(this).data("disabled.editable")) return;
                                                if (self.editing) return;
                                                if (!1 === onedit.apply(this, [settings, self])) return;
                                                e.preventDefault(), e.stopPropagation(), settings.tooltip && $(self).removeAttr("title"), 0 == $(self).width() ? (settings.width = savedwidth, settings.height = savedheight) : (settings.width != "none" && (settings.width = settings.autowidth ? $(self).width() : settings.width), settings.height != "none" && (settings.height = settings.autoheight ? $(self).height() : settings.height)), $(this).html().toLowerCase().replace(/(;|")/g, "") == settings.placeholder.toLowerCase().replace(/(;|")/g, "") && $(this).html(""), self.editing = !0, self.revert = $(self).html(), $(self).html("");
                                                var form = $("<form />");
                                                settings.cssclass && ("inherit" == settings.cssclass ? form.attr("class", $(self).attr("class")) : form.attr("class", settings.cssclass)), settings.style && ("inherit" == settings.style ? (form.attr("style", $(self).attr("style")), form.css("display", $(self).css("display"))) : form.att....blur(function (e) {
                                                        settings.onblur.apply(self, [input.val(), settings])
                                                    }): input.blur(function (e) {}), form.submit(function (e) {
                                                        t && clearTimeout(t), e.preventDefault();
                                                        if (!1 !== onsubmit.apply(form, [settings, self]) && !1 !== submit.apply(form, [settings, self]))
                                                            if ($.isFunction(settings.target)) {
                                                                var str = settings.target.apply(self, [input.val(), settings]);
                                                                $(self).html(str), self.editing = !1, callback.apply(self, [self.innerHTML, settings]), $.trim($(self).html()) || $(self).html(settings.placeholder)
                                                            } else {
                                                                var submitdata = {};
                                                                submitdata[settings.name] = input.val(), submitdata[settings.id] = self.id, $.isFunction(settings.submitdata) ? $.extend(submitdata, settings.submitdata.apply(self, [self.revert, settings])) : $.extend(submitdata, settings.submitdata), "PUT" == settings.method && (submitdata._method = "put"), $(self).html(settings.indicator);
                                                                var ajaxoptions = {
                                                                    type: "POST",
                                                                    data: submitdata,
                                                                    dataType: "html",
                                                                    url: settings.target,
                                                                    success: function (result, status) {
                                                                        ajaxoptions.dataType == "html" && $(self).html(result), self.editing = !1, callback.apply(self, [result, settings]), $.trim($(self).html()) || $(self).html(settings.placeholder)
                                                                    },
                                                                    error: function (xhr, status, error) {
                                                                        onerror.apply(form, [settings, self, xhr])
                                                                    }
                                                                };
                                                                $.extend(ajaxoptions, settings.ajaxoptions), $.ajax(ajaxoptions)
                                                            }
                                                        return $(self).attr("title", settings.tooltip), !1
                                                    })
                                                }), this.reset = function (form) {
                                                this.editing && !1 !== onreset.apply(form, [settings, self]) && ($(self).html(self.revert), self.editing = !1, $.trim($(self).html()) || $(self).html(settings.placeholder), settings.tooltip && $(self).attr("title", settings.tooltip))
                                            }
                                        })
                                }, $.editable = {
                                    types: {
                                        defaults: {
                                            element: function (settings, original) {
                                                var input = $('<input type="hidden"></input>');
                                                return $(this).append(input), input
                                            },
                                            content: function (string, settings, original) {
                                                $(":input:first", this).val(string)
                                            },
                                            reset: function (settings, original) {
                                                original.reset(this)
                                            },
                                            buttons: function (settings, original) {
                                                var form = this;
                                                if (settings.submit) {
                                                    if (settings.submit.match(/>$/)) var submit = $(settings.submit).click(function () {
                                                        submit.attr("type") != "submit" && form.submit()
                                                    });
                                                    else {
                                                        var submit = $('<button type="submit" />');
                                                        submit.html(settings.submit)
                                                    }
                                                    $(this).append(submit)
                                                }
                                                if (settings.cancel) {
                                                    if (settings.cancel.match(/>$/)) var cancel = $(settings.cancel);
                                                    else {
                                                        var cancel = $('<button type="cancel" />');
                                                        cancel.html(settings.cancel)
                                                    }
                                                    $(this).append(cancel), $(cancel).click(function (event) {
                                                        if ($.isFunction($.editable.types[settings.type].reset)) var reset = $.editable.types[settings.type].reset;
                                                        else var reset = $.editable.types.defaults.reset;
                                                        return reset.apply(form, [settings, original]), !1
                                                    })
                                                }
                                            }
                                        },
                                        text: {
                                            element: function (settings, original) {
                                                var input = $("<input />");
                                                return settings.width != "none" && input.width(settings.width), settings.height != "none" && input.height(settings.height), input.attr("autocomplete", "off"), $(this).append(input), input
                                            }
                                        },
                                        textarea: {
                                            element: function (settings, original) {
                                                var textarea = $("<textarea />");
                                                return settings.rows ? textarea.attr("rows", settings.rows) : settings.height != "none" && textarea.height(settings.height), settings.cols ? textarea.attr("cols", settings.cols) : settings.width != "none" && textarea.width(settings.width), $(this).append(textarea), textarea
                                            }
                                        },
                                        select: {
                                            element: function (settings, original) {
                                                var select = $("<select />");
                                                return $(this).append(select), select
                                            },
                                            content: function (data, settings, original) {
                                                if (String == data.constructor) eval("var json = " + data);
                                                else var json = data;
                                                for (var key in json) {
                                                    if (!json.hasOwnProperty(key)) continue;
                                                    if ("selected" == key) continue;
                                                    var option = $("<option />").val(key).append(json[key]);
                                                    $("select", this).append(option)
                                                }
                                                $("select", this).children().each(function () {
                                                    ($(this).val() == json["selected"] || $(this).text() == $.trim(original.revert)) && $(this).attr("selected", "selected")
                                                })
                                            }
                                        }
                                    },
                                    addInputType: function (name, input) {
                                        $.editable.types[name] = input
                                    }
                                }, $.fn.editable.defaults = {
                                    name: "value",
                                    id: "id",
                                    type: "text",
                                    width: "auto",
                                    height: "auto",
                                    event: "click.editable",
                                    onblur: "cancel",
                                    loadtype: "GET",
                                    loadtext: "Loading...",
                                    placeholder: "Click to edit",
                                    loaddata: {},
                                    submitdata: {},
                                    ajaxoptions: {}
                                }
                            }(jQuery), $(function () {
                                $(".editable").each(function (index, elem) {
                                    e = $(elem), height = e.height(), width = e.width(), height < 100 && (height = "auto"), width < 200 && (width = "auto"), e.editable("/cms/editable/" + e.attr("data-key") + ".js", {
                                        method: "PUT",
                                        height: height,
                                        width: width,
                                        event: "dblclick",
                                        submit: "Zapisz",
                                        placeholder: "Zmieñ mnie (" + e.attr("data-key") + ")",
                                        type: "textarea",
                                        onblur: function () {},
                                        cancel: "Anuluj"
                                    })
                                }), $(".editable-img").each(function (index, elem) {
                                    var e = $(elem);
                                    e.dblclick(function () {
                                        form = $("<form method='post' enctype='multipart/form-data' ><input type='file' name='image' /></form>"), $("body").append(form), $("input", form).ajaxfileupload({
                                            action: "/cms/editable_img",
                                            params: {
                                                key: e.attr("data-key"),
                                                height: parseInt(e.css("height")),
                                                width: parseInt(e.css("width"))
                                            },
                                            onComplete: function (resp) {
                                                e.css("background-image", "url(" + resp + ")"), form.hide()
                                            }
                                        }), $("input", form).trigger("click")
                                    })
                                })
                            }), $(document).ready(function () {
                                $(".editable_box").each(function (_, box) {
                                    load_box($(box))
                                }), $(".edit_editable_box").each(function (_, box) {
                                    bind_box_edit($(box))
                                })
                            }),
                            function () {}.call(this);