! function (t) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function (t) {
  "use strict";
  var e = window.Slick || {};
  (e = function () {
    var e = 0;
    return function (i, s) {
      var o, n = this;
      n.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: t(i),
        appendDots: t(i),
        arrows: !0,
        asNavFor: null,
        prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
        nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function (e, i) {
          return t('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1)
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: .35,
        fade: !1,
        focusOnSelect: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3
      }, n.initials = {
        animating: !1,
        dragging: !1,
        autoPlayTimer: null,
        currentDirection: 0,
        currentLeft: null,
        currentSlide: 0,
        direction: 1,
        $dots: null,
        listWidth: null,
        listHeight: null,
        loadIndex: 0,
        $nextArrow: null,
        $prevArrow: null,
        slideCount: null,
        slideWidth: null,
        $slideTrack: null,
        $slides: null,
        sliding: !1,
        slideOffset: 0,
        swipeLeft: null,
        $list: null,
        touchObject: {},
        transformsEnabled: !1,
        unslicked: !1
      }, t.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = t(i), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, o = t(i).data("slick") || {}, n.options = t.extend({}, n.defaults, s, o), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = t.proxy(n.autoPlay, n), n.autoPlayClear = t.proxy(n.autoPlayClear, n), n.autoPlayIterator = t.proxy(n.autoPlayIterator, n), n.changeSlide = t.proxy(n.changeSlide, n), n.clickHandler = t.proxy(n.clickHandler, n), n.selectHandler = t.proxy(n.selectHandler, n), n.setPosition = t.proxy(n.setPosition, n), n.swipeHandler = t.proxy(n.swipeHandler, n), n.dragHandler = t.proxy(n.dragHandler, n), n.keyHandler = t.proxy(n.keyHandler, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
    }
  }()).prototype.activateADA = function () {
    this.$slideTrack.find(".slick-active").attr({
      "aria-hidden": "false"
    }).find("a, input, button, select").attr({
      tabindex: "0"
    })
  }, e.prototype.addSlide = e.prototype.slickAdd = function (e, i, s) {
    var o = this;
    if ("boolean" == typeof i) s = i, i = null;
    else if (i < 0 || i >= o.slideCount) return !1;
    o.unload(), "number" == typeof i ? 0 === i && 0 === o.$slides.length ? t(e).appendTo(o.$slideTrack) : s ? t(e).insertBefore(o.$slides.eq(i)) : t(e).insertAfter(o.$slides.eq(i)) : !0 === s ? t(e).prependTo(o.$slideTrack) : t(e).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function (e, i) {
      t(i).attr("data-slick-index", e)
    }), o.$slidesCache = o.$slides, o.reinit()
  }, e.prototype.animateHeight = function () {
    var t = this;
    if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
      var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
      t.$list.animate({
        height: e
      }, t.options.speed)
    }
  }, e.prototype.animateSlide = function (e, i) {
    var s = {},
      o = this;
    o.animateHeight(), !0 === o.options.rtl && !1 === o.options.vertical && (e = -e), !1 === o.transformsEnabled ? !1 === o.options.vertical ? o.$slideTrack.animate({
      left: e
    }, o.options.speed, o.options.easing, i) : o.$slideTrack.animate({
      top: e
    }, o.options.speed, o.options.easing, i) : !1 === o.cssTransitions ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft), t({
      animStart: o.currentLeft
    }).animate({
      animStart: e
    }, {
      duration: o.options.speed,
      easing: o.options.easing,
      step: function (t) {
        t = Math.ceil(t), !1 === o.options.vertical ? (s[o.animType] = "translate(" + t + "px, 0px)", o.$slideTrack.css(s)) : (s[o.animType] = "translate(0px," + t + "px)", o.$slideTrack.css(s))
      },
      complete: function () {
        i && i.call()
      }
    })) : (o.applyTransition(), e = Math.ceil(e), !1 === o.options.vertical ? s[o.animType] = "translate3d(" + e + "px, 0px, 0px)" : s[o.animType] = "translate3d(0px," + e + "px, 0px)", o.$slideTrack.css(s), i && setTimeout(function () {
      o.disableTransition(), i.call()
    }, o.options.speed))
  }, e.prototype.getNavTarget = function () {
    var e = this.options.asNavFor;
    return e && null !== e && (e = t(e).not(this.$slider)), e
  }, e.prototype.asNavFor = function (e) {
    var i = this.getNavTarget();
    null !== i && "object" == typeof i && i.each(function () {
      var i = t(this).slick("getSlick");
      i.unslicked || i.slideHandler(e, !0)
    })
  }, e.prototype.applyTransition = function (t) {
    var e = this,
      i = {};
    !1 === e.options.fade ? i[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : i[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
  }, e.prototype.autoPlay = function () {
    var t = this;
    t.autoPlayClear(), t.slideCount > t.options.slidesToShow && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
  }, e.prototype.autoPlayClear = function () {
    this.autoPlayTimer && clearInterval(this.autoPlayTimer)
  }, e.prototype.autoPlayIterator = function () {
    var t = this,
      e = t.currentSlide + t.options.slidesToScroll;
    t.paused || t.interrupted || t.focussed || (!1 === t.options.infinite && (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1 ? t.direction = 0 : 0 === t.direction && (e = t.currentSlide - t.options.slidesToScroll, t.currentSlide - 1 == 0 && (t.direction = 1))), t.slideHandler(e))
  }, e.prototype.buildArrows = function () {
    var e = this;
    !0 === e.options.arrows && (e.$prevArrow = t(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = t(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
      "aria-disabled": "true",
      tabindex: "-1"
    }))
  }, e.prototype.buildDots = function () {
    var e, i, s = this;
    if (!0 === s.options.dots && s.slideCount > s.options.slidesToShow) {
      for (s.$slider.addClass("slick-dotted"), i = t("<ul />").addClass(s.options.dotsClass), e = 0; e <= s.getDotCount(); e += 1) i.append(t("<li />").append(s.options.customPaging.call(this, s, e)));
      s.$dots = i.appendTo(s.options.appendDots), s.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
    }
  }, e.prototype.buildOut = function () {
    var e = this;
    e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function (e, i) {
      t(i).attr("data-slick-index", e).data("originalStyling", t(i).attr("style") || "")
    }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? t('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), t("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
  }, e.prototype.buildRows = function () {
    var t, e, i, s, o, n, a, r = this;
    if (s = document.createDocumentFragment(), n = r.$slider.children(), r.options.rows > 1) {
      for (a = r.options.slidesPerRow * r.options.rows, o = Math.ceil(n.length / a), t = 0; t < o; t++) {
        var l = document.createElement("div");
        for (e = 0; e < r.options.rows; e++) {
          var d = document.createElement("div");
          for (i = 0; i < r.options.slidesPerRow; i++) {
            var c = t * a + (e * r.options.slidesPerRow + i);
            n.get(c) && d.appendChild(n.get(c))
          }
          l.appendChild(d)
        }
        s.appendChild(l)
      }
      r.$slider.empty().append(s), r.$slider.children().children().children().css({
        width: 100 / r.options.slidesPerRow + "%",
        display: "inline-block"
      })
    }
  }, e.prototype.checkResponsive = function (e, i) {
    var s, o, n, a = this,
      r = !1,
      l = a.$slider.width(),
      d = window.innerWidth || t(window).width();
    if ("window" === a.respondTo ? n = d : "slider" === a.respondTo ? n = l : "min" === a.respondTo && (n = Math.min(d, l)), a.options.responsive && a.options.responsive.length && null !== a.options.responsive) {
      for (s in o = null, a.breakpoints) a.breakpoints.hasOwnProperty(s) && (!1 === a.originalSettings.mobileFirst ? n < a.breakpoints[s] && (o = a.breakpoints[s]) : n > a.breakpoints[s] && (o = a.breakpoints[s]));
      null !== o ? null !== a.activeBreakpoint ? (o !== a.activeBreakpoint || i) && (a.activeBreakpoint = o, "unslick" === a.breakpointSettings[o] ? a.unslick(o) : (a.options = t.extend({}, a.originalSettings, a.breakpointSettings[o]), !0 === e && (a.currentSlide = a.options.initialSlide), a.refresh(e)), r = o) : (a.activeBreakpoint = o, "unslick" === a.breakpointSettings[o] ? a.unslick(o) : (a.options = t.extend({}, a.originalSettings, a.breakpointSettings[o]), !0 === e && (a.currentSlide = a.options.initialSlide), a.refresh(e)), r = o) : null !== a.activeBreakpoint && (a.activeBreakpoint = null, a.options = a.originalSettings, !0 === e && (a.currentSlide = a.options.initialSlide), a.refresh(e), r = o), e || !1 === r || a.$slider.trigger("breakpoint", [a, r])
    }
  }, e.prototype.changeSlide = function (e, i) {
    var s, o, n = this,
      a = t(e.currentTarget);
    switch (a.is("a") && e.preventDefault(), a.is("li") || (a = a.closest("li")), s = n.slideCount % n.options.slidesToScroll != 0 ? 0 : (n.slideCount - n.currentSlide) % n.options.slidesToScroll, e.data.message) {
      case "previous":
        o = 0 === s ? n.options.slidesToScroll : n.options.slidesToShow - s, n.slideCount > n.options.slidesToShow && n.slideHandler(n.currentSlide - o, !1, i);
        break;
      case "next":
        o = 0 === s ? n.options.slidesToScroll : s, n.slideCount > n.options.slidesToShow && n.slideHandler(n.currentSlide + o, !1, i);
        break;
      case "index":
        var r = 0 === e.data.index ? 0 : e.data.index || a.index() * n.options.slidesToScroll;
        n.slideHandler(n.checkNavigable(r), !1, i), a.children().trigger("focus");
        break;
      default:
        return
    }
  }, e.prototype.checkNavigable = function (t) {
    var e, i;
    if (i = 0, t > (e = this.getNavigableIndexes())[e.length - 1]) t = e[e.length - 1];
    else
      for (var s in e) {
        if (t < e[s]) {
          t = i;
          break
        }
        i = e[s]
      }
    return t
  }, e.prototype.cleanUpEvents = function () {
    var e = this;
    e.options.dots && null !== e.$dots && t("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", t.proxy(e.interrupt, e, !0)).off("mouseleave.slick", t.proxy(e.interrupt, e, !1)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide)), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), t(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && t(e.$slideTrack).children().off("click.slick", e.selectHandler), t(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), t(window).off("resize.slick.slick-" + e.instanceUid, e.resize), t("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), t(window).off("load.slick.slick-" + e.instanceUid, e.setPosition), t(document).off("ready.slick.slick-" + e.instanceUid, e.setPosition)
  }, e.prototype.cleanUpSlideEvents = function () {
    var e = this;
    e.$list.off("mouseenter.slick", t.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", t.proxy(e.interrupt, e, !1))
  }, e.prototype.cleanUpRows = function () {
    var t, e = this;
    e.options.rows > 1 && ((t = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(t))
  }, e.prototype.clickHandler = function (t) {
    !1 === this.shouldClick && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault())
  }, e.prototype.destroy = function (e) {
    var i = this;
    i.autoPlayClear(), i.touchObject = {}, i.cleanUpEvents(), t(".slick-cloned", i.$slider).detach(), i.$dots && i.$dots.remove(), i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()), i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()), i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
      t(this).attr("style", t(this).data("originalStyling"))
    }), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.detach(), i.$list.detach(), i.$slider.append(i.$slides)), i.cleanUpRows(), i.$slider.removeClass("slick-slider"), i.$slider.removeClass("slick-initialized"), i.$slider.removeClass("slick-dotted"), i.unslicked = !0, e || i.$slider.trigger("destroy", [i])
  }, e.prototype.disableTransition = function (t) {
    var e = this,
      i = {};
    i[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
  }, e.prototype.fadeSlide = function (t, e) {
    var i = this;
    !1 === i.cssTransitions ? (i.$slides.eq(t).css({
      zIndex: i.options.zIndex
    }), i.$slides.eq(t).animate({
      opacity: 1
    }, i.options.speed, i.options.easing, e)) : (i.applyTransition(t), i.$slides.eq(t).css({
      opacity: 1,
      zIndex: i.options.zIndex
    }), e && setTimeout(function () {
      i.disableTransition(t), e.call()
    }, i.options.speed))
  }, e.prototype.fadeSlideOut = function (t) {
    var e = this;
    !1 === e.cssTransitions ? e.$slides.eq(t).animate({
      opacity: 0,
      zIndex: e.options.zIndex - 2
    }, e.options.speed, e.options.easing) : (e.applyTransition(t), e.$slides.eq(t).css({
      opacity: 0,
      zIndex: e.options.zIndex - 2
    }))
  }, e.prototype.filterSlides = e.prototype.slickFilter = function (t) {
    var e = this;
    null !== t && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit())
  }, e.prototype.focusHandler = function () {
    var e = this;
    e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function (i) {
      i.stopImmediatePropagation();
      var s = t(this);
      setTimeout(function () {
        e.options.pauseOnFocus && (e.focussed = s.is(":focus"), e.autoPlay())
      }, 0)
    })
  }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
    return this.currentSlide
  }, e.prototype.getDotCount = function () {
    var t = this,
      e = 0,
      i = 0,
      s = 0;
    if (!0 === t.options.infinite)
      for (; e < t.slideCount;) ++s, e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
    else if (!0 === t.options.centerMode) s = t.slideCount;
    else if (t.options.asNavFor)
      for (; e < t.slideCount;) ++s, e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
    else s = 1 + Math.ceil((t.slideCount - t.options.slidesToShow) / t.options.slidesToScroll);
    return s - 1
  }, e.prototype.getLeft = function (t) {
    var e, i, s, o = this,
      n = 0;
    return o.slideOffset = 0, i = o.$slides.first().outerHeight(!0), !0 === o.options.infinite ? (o.slideCount > o.options.slidesToShow && (o.slideOffset = o.slideWidth * o.options.slidesToShow * -1, n = i * o.options.slidesToShow * -1), o.slideCount % o.options.slidesToScroll != 0 && t + o.options.slidesToScroll > o.slideCount && o.slideCount > o.options.slidesToShow && (t > o.slideCount ? (o.slideOffset = (o.options.slidesToShow - (t - o.slideCount)) * o.slideWidth * -1, n = (o.options.slidesToShow - (t - o.slideCount)) * i * -1) : (o.slideOffset = o.slideCount % o.options.slidesToScroll * o.slideWidth * -1, n = o.slideCount % o.options.slidesToScroll * i * -1))) : t + o.options.slidesToShow > o.slideCount && (o.slideOffset = (t + o.options.slidesToShow - o.slideCount) * o.slideWidth, n = (t + o.options.slidesToShow - o.slideCount) * i), o.slideCount <= o.options.slidesToShow && (o.slideOffset = 0, n = 0), !0 === o.options.centerMode && !0 === o.options.infinite ? o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2) - o.slideWidth : !0 === o.options.centerMode && (o.slideOffset = 0, o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2)), e = !1 === o.options.vertical ? t * o.slideWidth * -1 + o.slideOffset : t * i * -1 + n, !0 === o.options.variableWidth && (s = o.slideCount <= o.options.slidesToShow || !1 === o.options.infinite ? o.$slideTrack.children(".slick-slide").eq(t) : o.$slideTrack.children(".slick-slide").eq(t + o.options.slidesToShow), e = !0 === o.options.rtl ? s[0] ? -1 * (o.$slideTrack.width() - s[0].offsetLeft - s.width()) : 0 : s[0] ? -1 * s[0].offsetLeft : 0, !0 === o.options.centerMode && (s = o.slideCount <= o.options.slidesToShow || !1 === o.options.infinite ? o.$slideTrack.children(".slick-slide").eq(t) : o.$slideTrack.children(".slick-slide").eq(t + o.options.slidesToShow + 1), e = !0 === o.options.rtl ? s[0] ? -1 * (o.$slideTrack.width() - s[0].offsetLeft - s.width()) : 0 : s[0] ? -1 * s[0].offsetLeft : 0, e += (o.$list.width() - s.outerWidth()) / 2)), e
  }, e.prototype.getOption = e.prototype.slickGetOption = function (t) {
    return this.options[t]
  }, e.prototype.getNavigableIndexes = function () {
    var t, e = this,
      i = 0,
      s = 0,
      o = [];
    for (!1 === e.options.infinite ? t = e.slideCount : (i = -1 * e.options.slidesToScroll, s = -1 * e.options.slidesToScroll, t = 2 * e.slideCount); i < t;) o.push(i), i = s + e.options.slidesToScroll, s += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
    return o
  }, e.prototype.getSlick = function () {
    return this
  }, e.prototype.getSlideCount = function () {
    var e, i, s = this;
    return i = !0 === s.options.centerMode ? s.slideWidth * Math.floor(s.options.slidesToShow / 2) : 0, !0 === s.options.swipeToSlide ? (s.$slideTrack.find(".slick-slide").each(function (o, n) {
      if (n.offsetLeft - i + t(n).outerWidth() / 2 > -1 * s.swipeLeft) return e = n, !1
    }), Math.abs(t(e).attr("data-slick-index") - s.currentSlide) || 1) : s.options.slidesToScroll
  }, e.prototype.goTo = e.prototype.slickGoTo = function (t, e) {
    this.changeSlide({
      data: {
        message: "index",
        index: parseInt(t)
      }
    }, e)
  }, e.prototype.init = function (e) {
    var i = this;
    t(i.$slider).hasClass("slick-initialized") || (t(i.$slider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots(), i.checkResponsive(!0), i.focusHandler()), e && i.$slider.trigger("init", [i]), !0 === i.options.accessibility && i.initADA(), i.options.autoplay && (i.paused = !1, i.autoPlay())
  }, e.prototype.initADA = function () {
    var e = this;
    e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
      "aria-hidden": "true",
      tabindex: "-1"
    }).find("a, input, button, select").attr({
      tabindex: "-1"
    }), e.$slideTrack.attr("role", "listbox"), e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (i) {
      t(this).attr({
        role: "option",
        "aria-describedby": "slick-slide" + e.instanceUid + i
      })
    }), null !== e.$dots && e.$dots.attr("role", "tablist").find("li").each(function (i) {
      t(this).attr({
        role: "presentation",
        "aria-selected": "false",
        "aria-controls": "navigation" + e.instanceUid + i,
        id: "slick-slide" + e.instanceUid + i
      })
    }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), e.activateADA()
  }, e.prototype.initArrowEvents = function () {
    var t = this;
    !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.off("click.slick").on("click.slick", {
      message: "previous"
    }, t.changeSlide), t.$nextArrow.off("click.slick").on("click.slick", {
      message: "next"
    }, t.changeSlide))
  }, e.prototype.initDotEvents = function () {
    var e = this;
    !0 === e.options.dots && e.slideCount > e.options.slidesToShow && t("li", e.$dots).on("click.slick", {
      message: "index"
    }, e.changeSlide), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && t("li", e.$dots).on("mouseenter.slick", t.proxy(e.interrupt, e, !0)).on("mouseleave.slick", t.proxy(e.interrupt, e, !1))
  }, e.prototype.initSlideEvents = function () {
    var e = this;
    e.options.pauseOnHover && (e.$list.on("mouseenter.slick", t.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", t.proxy(e.interrupt, e, !1)))
  }, e.prototype.initializeEvents = function () {
    var e = this;
    e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
      action: "start"
    }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
      action: "move"
    }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
      action: "end"
    }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
      action: "end"
    }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), t(document).on(e.visibilityChange, t.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && t(e.$slideTrack).children().on("click.slick", e.selectHandler), t(window).on("orientationchange.slick.slick-" + e.instanceUid, t.proxy(e.orientationChange, e)), t(window).on("resize.slick.slick-" + e.instanceUid, t.proxy(e.resize, e)), t("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), t(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), t(document).on("ready.slick.slick-" + e.instanceUid, e.setPosition)
  }, e.prototype.initUI = function () {
    var t = this;
    !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.show()
  }, e.prototype.keyHandler = function (t) {
    var e = this;
    t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && !0 === e.options.accessibility ? e.changeSlide({
      data: {
        message: !0 === e.options.rtl ? "next" : "previous"
      }
    }) : 39 === t.keyCode && !0 === e.options.accessibility && e.changeSlide({
      data: {
        message: !0 === e.options.rtl ? "previous" : "next"
      }
    }))
  }, e.prototype.lazyLoad = function () {
    var e, i, s = this;

    function o(e) {
      t("img[data-lazy]", e).each(function () {
        var e = t(this),
          i = t(this).attr("data-lazy"),
          o = document.createElement("img");
        o.onload = function () {
          e.animate({
            opacity: 0
          }, 100, function () {
            e.attr("src", i).animate({
              opacity: 1
            }, 200, function () {
              e.removeAttr("data-lazy").removeClass("slick-loading")
            }), s.$slider.trigger("lazyLoaded", [s, e, i])
          })
        }, o.onerror = function () {
          e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), s.$slider.trigger("lazyLoadError", [s, e, i])
        }, o.src = i
      })
    }!0 === s.options.centerMode ? !0 === s.options.infinite ? i = (e = s.currentSlide + (s.options.slidesToShow / 2 + 1)) + s.options.slidesToShow + 2 : (e = Math.max(0, s.currentSlide - (s.options.slidesToShow / 2 + 1)), i = s.options.slidesToShow / 2 + 1 + 2 + s.currentSlide) : (e = s.options.infinite ? s.options.slidesToShow + s.currentSlide : s.currentSlide, i = Math.ceil(e + s.options.slidesToShow), !0 === s.options.fade && (e > 0 && e--, i <= s.slideCount && i++)), o(s.$slider.find(".slick-slide").slice(e, i)), s.slideCount <= s.options.slidesToShow ? o(s.$slider.find(".slick-slide")) : s.currentSlide >= s.slideCount - s.options.slidesToShow ? o(s.$slider.find(".slick-cloned").slice(0, s.options.slidesToShow)) : 0 === s.currentSlide && o(s.$slider.find(".slick-cloned").slice(-1 * s.options.slidesToShow))
  }, e.prototype.loadSlider = function () {
    var t = this;
    t.setPosition(), t.$slideTrack.css({
      opacity: 1
    }), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
  }, e.prototype.next = e.prototype.slickNext = function () {
    this.changeSlide({
      data: {
        message: "next"
      }
    })
  }, e.prototype.orientationChange = function () {
    this.checkResponsive(), this.setPosition()
  }, e.prototype.pause = e.prototype.slickPause = function () {
    this.autoPlayClear(), this.paused = !0
  }, e.prototype.play = e.prototype.slickPlay = function () {
    var t = this;
    t.autoPlay(), t.options.autoplay = !0, t.paused = !1, t.focussed = !1, t.interrupted = !1
  }, e.prototype.postSlide = function (t) {
    var e = this;
    e.unslicked || (e.$slider.trigger("afterChange", [e, t]), e.animating = !1, e.setPosition(), e.swipeLeft = null, e.options.autoplay && e.autoPlay(), !0 === e.options.accessibility && e.initADA())
  }, e.prototype.prev = e.prototype.slickPrev = function () {
    this.changeSlide({
      data: {
        message: "previous"
      }
    })
  }, e.prototype.preventDefault = function (t) {
    t.preventDefault()
  }, e.prototype.progressiveLazyLoad = function (e) {
    e = e || 1;
    var i, s, o, n = this,
      a = t("img[data-lazy]", n.$slider);
    a.length ? (i = a.first(), s = i.attr("data-lazy"), (o = document.createElement("img")).onload = function () {
      i.attr("src", s).removeAttr("data-lazy").removeClass("slick-loading"), !0 === n.options.adaptiveHeight && n.setPosition(), n.$slider.trigger("lazyLoaded", [n, i, s]), n.progressiveLazyLoad()
    }, o.onerror = function () {
      e < 3 ? setTimeout(function () {
        n.progressiveLazyLoad(e + 1)
      }, 500) : (i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, i, s]), n.progressiveLazyLoad())
    }, o.src = s) : n.$slider.trigger("allImagesLoaded", [n])
  }, e.prototype.refresh = function (e) {
    var i, s, o = this;
    s = o.slideCount - o.options.slidesToShow, !o.options.infinite && o.currentSlide > s && (o.currentSlide = s), o.slideCount <= o.options.slidesToShow && (o.currentSlide = 0), i = o.currentSlide, o.destroy(!0), t.extend(o, o.initials, {
      currentSlide: i
    }), o.init(), e || o.changeSlide({
      data: {
        message: "index",
        index: i
      }
    }, !1)
  }, e.prototype.registerBreakpoints = function () {
    var e, i, s, o = this,
      n = o.options.responsive || null;
    if ("array" === t.type(n) && n.length) {
      for (e in o.respondTo = o.options.respondTo || "window", n)
        if (s = o.breakpoints.length - 1, i = n[e].breakpoint, n.hasOwnProperty(e)) {
          for (; s >= 0;) o.breakpoints[s] && o.breakpoints[s] === i && o.breakpoints.splice(s, 1), s--;
          o.breakpoints.push(i), o.breakpointSettings[i] = n[e].settings
        } o.breakpoints.sort(function (t, e) {
        return o.options.mobileFirst ? t - e : e - t
      })
    }
  }, e.prototype.reinit = function () {
    var e = this;
    e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && t(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
  }, e.prototype.resize = function () {
    var e = this;
    t(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function () {
      e.windowWidth = t(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
    }, 50))
  }, e.prototype.removeSlide = e.prototype.slickRemove = function (t, e, i) {
    var s = this;
    if (t = "boolean" == typeof t ? !0 === (e = t) ? 0 : s.slideCount - 1 : !0 === e ? --t : t, s.slideCount < 1 || t < 0 || t > s.slideCount - 1) return !1;
    s.unload(), !0 === i ? s.$slideTrack.children().remove() : s.$slideTrack.children(this.options.slide).eq(t).remove(), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slidesCache = s.$slides, s.reinit()
  }, e.prototype.setCSS = function (t) {
    var e, i, s = this,
      o = {};
    !0 === s.options.rtl && (t = -t), e = "left" == s.positionProp ? Math.ceil(t) + "px" : "0px", i = "top" == s.positionProp ? Math.ceil(t) + "px" : "0px", o[s.positionProp] = t, !1 === s.transformsEnabled ? s.$slideTrack.css(o) : (o = {}, !1 === s.cssTransitions ? (o[s.animType] = "translate(" + e + ", " + i + ")", s.$slideTrack.css(o)) : (o[s.animType] = "translate3d(" + e + ", " + i + ", 0px)", s.$slideTrack.css(o)))
  }, e.prototype.setDimensions = function () {
    var t = this;
    !1 === t.options.vertical ? !0 === t.options.centerMode && t.$list.css({
      padding: "0px " + t.options.centerPadding
    }) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), !0 === t.options.centerMode && t.$list.css({
      padding: t.options.centerPadding + " 0px"
    })), t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), !1 === t.options.vertical && !1 === t.options.variableWidth ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : !0 === t.options.variableWidth ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
    var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
    !1 === t.options.variableWidth && t.$slideTrack.children(".slick-slide").width(t.slideWidth - e)
  }, e.prototype.setFade = function () {
    var e, i = this;
    i.$slides.each(function (s, o) {
      e = i.slideWidth * s * -1, !0 === i.options.rtl ? t(o).css({
        position: "relative",
        right: e,
        top: 0,
        zIndex: i.options.zIndex - 2,
        opacity: 0
      }) : t(o).css({
        position: "relative",
        left: e,
        top: 0,
        zIndex: i.options.zIndex - 2,
        opacity: 0
      })
    }), i.$slides.eq(i.currentSlide).css({
      zIndex: i.options.zIndex - 1,
      opacity: 1
    })
  }, e.prototype.setHeight = function () {
    var t = this;
    if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
      var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
      t.$list.css("height", e)
    }
  }, e.prototype.setOption = e.prototype.slickSetOption = function () {
    var e, i, s, o, n, a = this,
      r = !1;
    if ("object" === t.type(arguments[0]) ? (s = arguments[0], r = arguments[1], n = "multiple") : "string" === t.type(arguments[0]) && (s = arguments[0], o = arguments[1], r = arguments[2], "responsive" === arguments[0] && "array" === t.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) a.options[s] = o;
    else if ("multiple" === n) t.each(s, function (t, e) {
      a.options[t] = e
    });
    else if ("responsive" === n)
      for (i in o)
        if ("array" !== t.type(a.options.responsive)) a.options.responsive = [o[i]];
        else {
          for (e = a.options.responsive.length - 1; e >= 0;) a.options.responsive[e].breakpoint === o[i].breakpoint && a.options.responsive.splice(e, 1), e--;
          a.options.responsive.push(o[i])
        } r && (a.unload(), a.reinit())
  }, e.prototype.setPosition = function () {
    var t = this;
    t.setDimensions(), t.setHeight(), !1 === t.options.fade ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t])
  }, e.prototype.setProps = function () {
    var t = this,
      e = document.body.style;
    t.positionProp = !0 === t.options.vertical ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === t.options.useCSS && (t.cssTransitions = !0), t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex), void 0 !== e.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)), void 0 !== e.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", void 0 === e.msTransform && (t.animType = !1)), void 0 !== e.transform && !1 !== t.animType && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = t.options.useTransform && null !== t.animType && !1 !== t.animType
  }, e.prototype.setSlideClasses = function (t) {
    var e, i, s, o, n = this;
    i = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(t).addClass("slick-current"), !0 === n.options.centerMode ? (e = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (t >= e && t <= n.slideCount - 1 - e ? n.$slides.slice(t - e, t + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (s = n.options.slidesToShow + t, i.slice(s - e + 1, s + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === t ? i.eq(i.length - 1 - n.options.slidesToShow).addClass("slick-center") : t === n.slideCount - 1 && i.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(t).addClass("slick-center")) : t >= 0 && t <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(t, t + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= n.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (o = n.slideCount % n.options.slidesToShow, s = !0 === n.options.infinite ? n.options.slidesToShow + t : t, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - t < n.options.slidesToShow ? i.slice(s - (n.options.slidesToShow - o), s + o).addClass("slick-active").attr("aria-hidden", "false") : i.slice(s, s + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === n.options.lazyLoad && n.lazyLoad()
  }, e.prototype.setupInfinite = function () {
    var e, i, s, o = this;
    if (!0 === o.options.fade && (o.options.centerMode = !1), !0 === o.options.infinite && !1 === o.options.fade && (i = null, o.slideCount > o.options.slidesToShow)) {
      for (s = !0 === o.options.centerMode ? o.options.slidesToShow + 1 : o.options.slidesToShow, e = o.slideCount; e > o.slideCount - s; e -= 1) i = e - 1, t(o.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
      for (e = 0; e < s; e += 1) i = e, t(o.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
      o.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
        t(this).attr("id", "")
      })
    }
  }, e.prototype.interrupt = function (t) {
    t || this.autoPlay(), this.interrupted = t
  }, e.prototype.selectHandler = function (e) {
    var i = this,
      s = t(e.target).is(".slick-slide") ? t(e.target) : t(e.target).parents(".slick-slide"),
      o = parseInt(s.attr("data-slick-index"));
    if (o || (o = 0), i.slideCount <= i.options.slidesToShow) return i.setSlideClasses(o), void i.asNavFor(o);
    i.slideHandler(o)
  }, e.prototype.slideHandler = function (t, e, i) {
    var s, o, n, a, r, l, d = this;
    if (e = e || !1, (!0 !== d.animating || !0 !== d.options.waitForAnimate) && !(!0 === d.options.fade && d.currentSlide === t || d.slideCount <= d.options.slidesToShow))
      if (!1 === e && d.asNavFor(t), s = t, r = d.getLeft(s), a = d.getLeft(d.currentSlide), d.currentLeft = null === d.swipeLeft ? a : d.swipeLeft, !1 === d.options.infinite && !1 === d.options.centerMode && (t < 0 || t > d.getDotCount() * d.options.slidesToScroll)) !1 === d.options.fade && (s = d.currentSlide, !0 !== i ? d.animateSlide(a, function () {
        d.postSlide(s)
      }) : d.postSlide(s));
      else if (!1 === d.options.infinite && !0 === d.options.centerMode && (t < 0 || t > d.slideCount - d.options.slidesToScroll)) !1 === d.options.fade && (s = d.currentSlide, !0 !== i ? d.animateSlide(a, function () {
      d.postSlide(s)
    }) : d.postSlide(s));
    else {
      if (d.options.autoplay && clearInterval(d.autoPlayTimer), o = s < 0 ? d.slideCount % d.options.slidesToScroll != 0 ? d.slideCount - d.slideCount % d.options.slidesToScroll : d.slideCount + s : s >= d.slideCount ? d.slideCount % d.options.slidesToScroll != 0 ? 0 : s - d.slideCount : s, d.animating = !0, d.$slider.trigger("beforeChange", [d, d.currentSlide, o]), n = d.currentSlide, d.currentSlide = o, d.setSlideClasses(d.currentSlide), d.options.asNavFor && (l = (l = d.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(d.currentSlide), d.updateDots(), d.updateArrows(), !0 === d.options.fade) return !0 !== i ? (d.fadeSlideOut(n), d.fadeSlide(o, function () {
        d.postSlide(o)
      })) : d.postSlide(o), void d.animateHeight();
      !0 !== i ? d.animateSlide(r, function () {
        d.postSlide(o)
      }) : d.postSlide(o)
    }
  }, e.prototype.startLoad = function () {
    var t = this;
    !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading")
  }, e.prototype.swipeDirection = function () {
    var t, e, i, s, o = this;
    return t = o.touchObject.startX - o.touchObject.curX, e = o.touchObject.startY - o.touchObject.curY, i = Math.atan2(e, t), (s = Math.round(180 * i / Math.PI)) < 0 && (s = 360 - Math.abs(s)), s <= 45 && s >= 0 ? !1 === o.options.rtl ? "left" : "right" : s <= 360 && s >= 315 ? !1 === o.options.rtl ? "left" : "right" : s >= 135 && s <= 225 ? !1 === o.options.rtl ? "right" : "left" : !0 === o.options.verticalSwiping ? s >= 35 && s <= 135 ? "down" : "up" : "vertical"
  }, e.prototype.swipeEnd = function (t) {
    var e, i, s = this;
    if (s.dragging = !1, s.interrupted = !1, s.shouldClick = !(s.touchObject.swipeLength > 10), void 0 === s.touchObject.curX) return !1;
    if (!0 === s.touchObject.edgeHit && s.$slider.trigger("edge", [s, s.swipeDirection()]), s.touchObject.swipeLength >= s.touchObject.minSwipe) {
      switch (i = s.swipeDirection()) {
        case "left":
        case "down":
          e = s.options.swipeToSlide ? s.checkNavigable(s.currentSlide + s.getSlideCount()) : s.currentSlide + s.getSlideCount(), s.currentDirection = 0;
          break;
        case "right":
        case "up":
          e = s.options.swipeToSlide ? s.checkNavigable(s.currentSlide - s.getSlideCount()) : s.currentSlide - s.getSlideCount(), s.currentDirection = 1
      }
      "vertical" != i && (s.slideHandler(e), s.touchObject = {}, s.$slider.trigger("swipe", [s, i]))
    } else s.touchObject.startX !== s.touchObject.curX && (s.slideHandler(s.currentSlide), s.touchObject = {})
  }, e.prototype.swipeHandler = function (t) {
    var e = this;
    if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== t.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), t.data.action) {
      case "start":
        e.swipeStart(t);
        break;
      case "move":
        e.swipeMove(t);
        break;
      case "end":
        e.swipeEnd(t)
    }
  }, e.prototype.swipeMove = function (t) {
    var e, i, s, o, n, a = this;
    return n = void 0 !== t.originalEvent ? t.originalEvent.touches : null, !(!a.dragging || n && 1 !== n.length) && (e = a.getLeft(a.currentSlide), a.touchObject.curX = void 0 !== n ? n[0].pageX : t.clientX, a.touchObject.curY = void 0 !== n ? n[0].pageY : t.clientY, a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))), !0 === a.options.verticalSwiping && (a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2)))), "vertical" !== (i = a.swipeDirection()) ? (void 0 !== t.originalEvent && a.touchObject.swipeLength > 4 && t.preventDefault(), o = (!1 === a.options.rtl ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1), !0 === a.options.verticalSwiping && (o = a.touchObject.curY > a.touchObject.startY ? 1 : -1), s = a.touchObject.swipeLength, a.touchObject.edgeHit = !1, !1 === a.options.infinite && (0 === a.currentSlide && "right" === i || a.currentSlide >= a.getDotCount() && "left" === i) && (s = a.touchObject.swipeLength * a.options.edgeFriction, a.touchObject.edgeHit = !0), !1 === a.options.vertical ? a.swipeLeft = e + s * o : a.swipeLeft = e + s * (a.$list.height() / a.listWidth) * o, !0 === a.options.verticalSwiping && (a.swipeLeft = e + s * o), !0 !== a.options.fade && !1 !== a.options.touchMove && (!0 === a.animating ? (a.swipeLeft = null, !1) : void a.setCSS(a.swipeLeft))) : void 0)
  }, e.prototype.swipeStart = function (t) {
    var e, i = this;
    if (i.interrupted = !0, 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow) return i.touchObject = {}, !1;
    void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== e ? e.pageX : t.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== e ? e.pageY : t.clientY, i.dragging = !0
  }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
    var t = this;
    null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit())
  }, e.prototype.unload = function () {
    var e = this;
    t(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
  }, e.prototype.unslick = function (t) {
    var e = this;
    e.$slider.trigger("unslick", [e, t]), e.destroy()
  }, e.prototype.updateArrows = function () {
    var t = this;
    Math.floor(t.options.slidesToShow / 2), !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && !t.options.infinite && (t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === t.currentSlide ? (t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - t.options.slidesToShow && !1 === t.options.centerMode ? (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - 1 && !0 === t.options.centerMode && (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
  }, e.prototype.updateDots = function () {
    var t = this;
    null !== t.$dots && (t.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
  }, e.prototype.visibility = function () {
    var t = this;
    t.options.autoplay && (document[t.hidden] ? t.interrupted = !0 : t.interrupted = !1)
  }, t.fn.slick = function () {
    var t, i, s = this,
      o = arguments[0],
      n = Array.prototype.slice.call(arguments, 1),
      a = s.length;
    for (t = 0; t < a; t++)
      if ("object" == typeof o || void 0 === o ? s[t].slick = new e(s[t], o) : i = s[t].slick[o].apply(s[t].slick, n), void 0 !== i) return i;
    return s
  }
}),
function (t, e, i, s) {
  function o(e, i) {
    this.settings = null, this.options = t.extend({}, o.Defaults, i), this.$element = t(e), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
      time: null,
      target: null,
      pointer: null,
      stage: {
        start: null,
        current: null
      },
      direction: null
    }, this._states = {
      current: {},
      tags: {
        initializing: ["busy"],
        animating: ["busy"],
        dragging: ["interacting"]
      }
    }, t.each(["onResize", "onThrottledResize"], t.proxy(function (e, i) {
      this._handlers[i] = t.proxy(this[i], this)
    }, this)), t.each(o.Plugins, t.proxy(function (t, e) {
      this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this)
    }, this)), t.each(o.Workers, t.proxy(function (e, i) {
      this._pipe.push({
        filter: i.filter,
        run: t.proxy(i.run, this)
      })
    }, this)), this.setup(), this.initialize()
  }
  o.Defaults = {
    items: 3,
    loop: !1,
    center: !1,
    rewind: !1,
    mouseDrag: !0,
    touchDrag: !0,
    pullDrag: !0,
    freeDrag: !1,
    margin: 0,
    stagePadding: 0,
    merge: !1,
    mergeFit: !0,
    autoWidth: !1,
    startPosition: 0,
    rtl: !1,
    smartSpeed: 250,
    fluidSpeed: !1,
    dragEndSpeed: !1,
    responsive: {},
    responsiveRefreshRate: 200,
    responsiveBaseElement: e,
    fallbackEasing: "swing",
    info: !1,
    nestedItemSelector: !1,
    itemElement: "div",
    stageElement: "div",
    refreshClass: "owl-refresh",
    loadedClass: "owl-loaded",
    loadingClass: "owl-loading",
    rtlClass: "owl-rtl",
    responsiveClass: "owl-responsive",
    dragClass: "owl-drag",
    itemClass: "owl-item",
    stageClass: "owl-stage",
    stageOuterClass: "owl-stage-outer",
    grabClass: "owl-grab"
  }, o.Width = {
    Default: "default",
    Inner: "inner",
    Outer: "outer"
  }, o.Type = {
    Event: "event",
    State: "state"
  }, o.Plugins = {}, o.Workers = [{
    filter: ["width", "settings"],
    run: function () {
      this._width = this.$element.width()
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function (t) {
      t.current = this._items && this._items[this.relative(this._current)]
    }
  }, {
    filter: ["items", "settings"],
    run: function () {
      this.$stage.children(".cloned").remove()
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function (t) {
      var e = this.settings.margin || "",
        i = !this.settings.autoWidth,
        s = this.settings.rtl,
        o = {
          width: "auto",
          "margin-left": s ? e : "",
          "margin-right": s ? "" : e
        };
      !i && this.$stage.children().css(o), t.css = o
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function (t) {
      var e = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
        i = null,
        s = this._items.length,
        o = !this.settings.autoWidth,
        n = [];
      for (t.items = {
          merge: !1,
          width: e
        }; s--;) i = this._mergers[s], i = this.settings.mergeFit && Math.min(i, this.settings.items) || i, t.items.merge = i > 1 || t.items.merge, n[s] = o ? e * i : this._items[s].width();
      this._widths = n
    }
  }, {
    filter: ["items", "settings"],
    run: function () {
      var e = [],
        i = this._items,
        s = this.settings,
        o = Math.max(2 * s.items, 4),
        n = 2 * Math.ceil(i.length / 2),
        a = s.loop && i.length ? s.rewind ? o : Math.max(o, n) : 0,
        r = "",
        l = "";
      for (a /= 2; a--;) e.push(this.normalize(e.length / 2, !0)), r += i[e[e.length - 1]][0].outerHTML, e.push(this.normalize(i.length - 1 - (e.length - 1) / 2, !0)), l = i[e[e.length - 1]][0].outerHTML + l;
      this._clones = e, t(r).addClass("cloned").appendTo(this.$stage), t(l).addClass("cloned").prependTo(this.$stage)
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function () {
      for (var t = this.settings.rtl ? 1 : -1, e = this._clones.length + this._items.length, i = -1, s = 0, o = 0, n = []; ++i < e;) s = n[i - 1] || 0, o = this._widths[this.relative(i)] + this.settings.margin, n.push(s + o * t);
      this._coordinates = n
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function () {
      var t = this.settings.stagePadding,
        e = this._coordinates,
        i = {
          width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t,
          "padding-left": t || "",
          "padding-right": t || ""
        };
      this.$stage.css(i)
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function (t) {
      var e = this._coordinates.length,
        i = !this.settings.autoWidth,
        s = this.$stage.children();
      if (i && t.items.merge)
        for (; e--;) t.css.width = this._widths[this.relative(e)], s.eq(e).css(t.css);
      else i && (t.css.width = t.items.width, s.css(t.css))
    }
  }, {
    filter: ["items"],
    run: function () {
      this._coordinates.length < 1 && this.$stage.removeAttr("style")
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function (t) {
      t.current = t.current ? this.$stage.children().index(t.current) : 0, t.current = Math.max(this.minimum(), Math.min(this.maximum(), t.current)), this.reset(t.current)
    }
  }, {
    filter: ["position"],
    run: function () {
      this.animate(this.coordinates(this._current))
    }
  }, {
    filter: ["width", "position", "items", "settings"],
    run: function () {
      var t, e, i, s, o = this.settings.rtl ? 1 : -1,
        n = 2 * this.settings.stagePadding,
        a = this.coordinates(this.current()) + n,
        r = a + this.width() * o,
        l = [];
      for (i = 0, s = this._coordinates.length; i < s; i++) t = this._coordinates[i - 1] || 0, e = Math.abs(this._coordinates[i]) + n * o, (this.op(t, "<=", a) && this.op(t, ">", r) || this.op(e, "<", a) && this.op(e, ">", r)) && l.push(i);
      this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + l.join("), :eq(") + ")").addClass("active"), this.settings.center && (this.$stage.children(".center").removeClass("center"), this.$stage.children().eq(this.current()).addClass("center"))
    }
  }], o.prototype.initialize = function () {
    var e, i, o;
    (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) && (e = this.$element.find("img"), i = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : s, o = this.$element.children(i).width(), e.length && o <= 0 && this.preloadAutoWidthImages(e));
    this.$element.addClass(this.options.loadingClass), this.$stage = t("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this.$element.is(":visible") ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
  }, o.prototype.setup = function () {
    var e = this.viewport(),
      i = this.options.responsive,
      s = -1,
      o = null;
    i ? (t.each(i, function (t) {
      t <= e && t > s && (s = Number(t))
    }), "function" == typeof (o = t.extend({}, this.options, i[s])).stagePadding && (o.stagePadding = o.stagePadding()), delete o.responsive, o.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + s))) : o = t.extend({}, this.options), this.trigger("change", {
      property: {
        name: "settings",
        value: o
      }
    }), this._breakpoint = s, this.settings = o, this.invalidate("settings"), this.trigger("changed", {
      property: {
        name: "settings",
        value: this.settings
      }
    })
  }, o.prototype.optionsLogic = function () {
    this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
  }, o.prototype.prepare = function (e) {
    var i = this.trigger("prepare", {
      content: e
    });
    return i.data || (i.data = t("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(e)), this.trigger("prepared", {
      content: i.data
    }), i.data
  }, o.prototype.update = function () {
    for (var e = 0, i = this._pipe.length, s = t.proxy(function (t) {
        return this[t]
      }, this._invalidated), o = {}; e < i;)(this._invalidated.all || t.grep(this._pipe[e].filter, s).length > 0) && this._pipe[e].run(o), e++;
    this._invalidated = {}, !this.is("valid") && this.enter("valid")
  }, o.prototype.width = function (t) {
    switch (t = t || o.Width.Default) {
      case o.Width.Inner:
      case o.Width.Outer:
        return this._width;
      default:
        return this._width - 2 * this.settings.stagePadding + this.settings.margin
    }
  }, o.prototype.refresh = function () {
    this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
  }, o.prototype.onThrottledResize = function () {
    e.clearTimeout(this.resizeTimer), this.resizeTimer = e.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
  }, o.prototype.onResize = function () {
    return !!this._items.length && this._width !== this.$element.width() && !!this.$element.is(":visible") && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))
  }, o.prototype.registerEventHandlers = function () {
    t.support.transition && this.$stage.on(t.support.transition.end + ".owl.core", t.proxy(this.onTransitionEnd, this)), !1 !== this.settings.responsive && this.on(e, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
      return !1
    })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", t.proxy(this.onDragEnd, this)))
  }, o.prototype.onDragStart = function (e) {
    var s = null;
    3 !== e.which && (t.support.transform ? s = {
      x: (s = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","))[16 === s.length ? 12 : 4],
      y: s[16 === s.length ? 13 : 5]
    } : (s = this.$stage.position(), s = {
      x: this.settings.rtl ? s.left + this.$stage.width() - this.width() + this.settings.margin : s.left,
      y: s.top
    }), this.is("animating") && (t.support.transform ? this.animate(s.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === e.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = t(e.target), this._drag.stage.start = s, this._drag.stage.current = s, this._drag.pointer = this.pointer(e), t(i).on("mouseup.owl.core touchend.owl.core", t.proxy(this.onDragEnd, this)), t(i).one("mousemove.owl.core touchmove.owl.core", t.proxy(function (e) {
      var s = this.difference(this._drag.pointer, this.pointer(e));
      t(i).on("mousemove.owl.core touchmove.owl.core", t.proxy(this.onDragMove, this)), Math.abs(s.x) < Math.abs(s.y) && this.is("valid") || (e.preventDefault(), this.enter("dragging"), this.trigger("drag"))
    }, this)))
  }, o.prototype.onDragMove = function (t) {
    var e = null,
      i = null,
      s = null,
      o = this.difference(this._drag.pointer, this.pointer(t)),
      n = this.difference(this._drag.stage.start, o);
    this.is("dragging") && (t.preventDefault(), this.settings.loop ? (e = this.coordinates(this.minimum()), i = this.coordinates(this.maximum() + 1) - e, n.x = ((n.x - e) % i + i) % i + e) : (e = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), i = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), s = this.settings.pullDrag ? -1 * o.x / 5 : 0, n.x = Math.max(Math.min(n.x, e + s), i + s)), this._drag.stage.current = n, this.animate(n.x))
  }, o.prototype.onDragEnd = function (e) {
    var s = this.difference(this._drag.pointer, this.pointer(e)),
      o = this._drag.stage.current,
      n = s.x > 0 ^ this.settings.rtl ? "left" : "right";
    t(i).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== s.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(o.x, 0 !== s.x ? n : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = n, (Math.abs(s.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function () {
      return !1
    })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
  }, o.prototype.closest = function (e, i) {
    var s = -1,
      o = this.width(),
      n = this.coordinates();
    return this.settings.freeDrag || t.each(n, t.proxy(function (t, a) {
      return "left" === i && e > a - 30 && e < a + 30 ? s = t : "right" === i && e > a - o - 30 && e < a - o + 30 ? s = t + 1 : this.op(e, "<", a) && this.op(e, ">", n[t + 1] || a - o) && (s = "left" === i ? t + 1 : t), -1 === s
    }, this)), this.settings.loop || (this.op(e, ">", n[this.minimum()]) ? s = e = this.minimum() : this.op(e, "<", n[this.maximum()]) && (s = e = this.maximum())), s
  }, o.prototype.animate = function (e) {
    var i = this.speed() > 0;
    this.is("animating") && this.onTransitionEnd(), i && (this.enter("animating"), this.trigger("translate")), t.support.transform3d && t.support.transition ? this.$stage.css({
      transform: "translate3d(" + e + "px,0px,0px)",
      transition: this.speed() / 1e3 + "s"
    }) : i ? this.$stage.animate({
      left: e + "px"
    }, this.speed(), this.settings.fallbackEasing, t.proxy(this.onTransitionEnd, this)) : this.$stage.css({
      left: e + "px"
    })
  }, o.prototype.is = function (t) {
    return this._states.current[t] && this._states.current[t] > 0
  }, o.prototype.current = function (t) {
    if (t === s) return this._current;
    if (0 === this._items.length) return s;
    if (t = this.normalize(t), this._current !== t) {
      var e = this.trigger("change", {
        property: {
          name: "position",
          value: t
        }
      });
      e.data !== s && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), this.trigger("changed", {
        property: {
          name: "position",
          value: this._current
        }
      })
    }
    return this._current
  }, o.prototype.invalidate = function (e) {
    return "string" === t.type(e) && (this._invalidated[e] = !0, this.is("valid") && this.leave("valid")), t.map(this._invalidated, function (t, e) {
      return e
    })
  }, o.prototype.reset = function (t) {
    (t = this.normalize(t)) !== s && (this._speed = 0, this._current = t, this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]))
  }, o.prototype.normalize = function (t, e) {
    var i = this._items.length,
      o = e ? 0 : this._clones.length;
    return !this.isNumeric(t) || i < 1 ? t = s : (t < 0 || t >= i + o) && (t = ((t - o / 2) % i + i) % i + o / 2), t
  }, o.prototype.relative = function (t) {
    return t -= this._clones.length / 2, this.normalize(t, !0)
  }, o.prototype.maximum = function (t) {
    var e, i, s, o = this.settings,
      n = this._coordinates.length;
    if (o.loop) n = this._clones.length / 2 + this._items.length - 1;
    else if (o.autoWidth || o.merge) {
      for (e = this._items.length, i = this._items[--e].width(), s = this.$element.width(); e-- && !((i += this._items[e].width() + this.settings.margin) > s););
      n = e + 1
    } else n = o.center ? this._items.length - 1 : this._items.length - o.items;
    return t && (n -= this._clones.length / 2), Math.max(n, 0)
  }, o.prototype.minimum = function (t) {
    return t ? 0 : this._clones.length / 2
  }, o.prototype.items = function (t) {
    return t === s ? this._items.slice() : (t = this.normalize(t, !0), this._items[t])
  }, o.prototype.mergers = function (t) {
    return t === s ? this._mergers.slice() : (t = this.normalize(t, !0), this._mergers[t])
  }, o.prototype.clones = function (e) {
    var i = this._clones.length / 2,
      o = i + this._items.length,
      n = function (t) {
        return t % 2 == 0 ? o + t / 2 : i - (t + 1) / 2
      };
    return e === s ? t.map(this._clones, function (t, e) {
      return n(e)
    }) : t.map(this._clones, function (t, i) {
      return t === e ? n(i) : null
    })
  }, o.prototype.speed = function (t) {
    return t !== s && (this._speed = t), this._speed
  }, o.prototype.coordinates = function (e) {
    var i, o = 1,
      n = e - 1;
    return e === s ? t.map(this._coordinates, t.proxy(function (t, e) {
      return this.coordinates(e)
    }, this)) : (this.settings.center ? (this.settings.rtl && (o = -1, n = e + 1), i = this._coordinates[e], i += (this.width() - i + (this._coordinates[n] || 0)) / 2 * o) : i = this._coordinates[n] || 0, i = Math.ceil(i))
  }, o.prototype.duration = function (t, e, i) {
    return 0 === i ? 0 : Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed)
  }, o.prototype.to = function (t, e) {
    var i = this.current(),
      s = null,
      o = t - this.relative(i),
      n = (o > 0) - (o < 0),
      a = this._items.length,
      r = this.minimum(),
      l = this.maximum();
    this.settings.loop ? (!this.settings.rewind && Math.abs(o) > a / 2 && (o += -1 * n * a), (s = (((t = i + o) - r) % a + a) % a + r) !== t && s - o <= l && s - o > 0 && (i = s - o, t = s, this.reset(i))) : this.settings.rewind ? t = (t % (l += 1) + l) % l : t = Math.max(r, Math.min(l, t)), this.speed(this.duration(i, t, e)), this.current(t), this.$element.is(":visible") && this.update()
  }, o.prototype.next = function (t) {
    t = t || !1, this.to(this.relative(this.current()) + 1, t)
  }, o.prototype.prev = function (t) {
    t = t || !1, this.to(this.relative(this.current()) - 1, t)
  }, o.prototype.onTransitionEnd = function (t) {
    if (t !== s && (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0))) return !1;
    this.leave("animating"), this.trigger("translated")
  }, o.prototype.viewport = function () {
    var s;
    return this.options.responsiveBaseElement !== e ? s = t(this.options.responsiveBaseElement).width() : e.innerWidth ? s = e.innerWidth : i.documentElement && i.documentElement.clientWidth ? s = i.documentElement.clientWidth : console.warn("Can not detect viewport width."), s
  }, o.prototype.replace = function (e) {
    this.$stage.empty(), this._items = [], e && (e = e instanceof jQuery ? e : t(e)), this.settings.nestedItemSelector && (e = e.find("." + this.settings.nestedItemSelector)), e.filter(function () {
      return 1 === this.nodeType
    }).each(t.proxy(function (t, e) {
      e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
    }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
  }, o.prototype.add = function (e, i) {
    var o = this.relative(this._current);
    i = i === s ? this._items.length : this.normalize(i, !0), e = e instanceof jQuery ? e : t(e), this.trigger("add", {
      content: e,
      position: i
    }), e = this.prepare(e), 0 === this._items.length || i === this._items.length ? (0 === this._items.length && this.$stage.append(e), 0 !== this._items.length && this._items[i - 1].after(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[i].before(e), this._items.splice(i, 0, e), this._mergers.splice(i, 0, 1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[o] && this.reset(this._items[o].index()), this.invalidate("items"), this.trigger("added", {
      content: e,
      position: i
    })
  }, o.prototype.remove = function (t) {
    (t = this.normalize(t, !0)) !== s && (this.trigger("remove", {
      content: this._items[t],
      position: t
    }), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), this.invalidate("items"), this.trigger("removed", {
      content: null,
      position: t
    }))
  }, o.prototype.preloadAutoWidthImages = function (e) {
    e.each(t.proxy(function (e, i) {
      this.enter("pre-loading"), i = t(i), t(new Image).one("load", t.proxy(function (t) {
        i.attr("src", t.target.src), i.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
      }, this)).attr("src", i.attr("src") || i.attr("data-src") || i.attr("data-src-retina"))
    }, this))
  }, o.prototype.destroy = function () {
    for (var s in this.$element.off(".owl.core"), this.$stage.off(".owl.core"), t(i).off(".owl.core"), !1 !== this.settings.responsive && (e.clearTimeout(this.resizeTimer), this.off(e, "resize", this._handlers.onThrottledResize)), this._plugins) this._plugins[s].destroy();
    this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
  }, o.prototype.op = function (t, e, i) {
    var s = this.settings.rtl;
    switch (e) {
      case "<":
        return s ? t > i : t < i;
      case ">":
        return s ? t < i : t > i;
      case ">=":
        return s ? t <= i : t >= i;
      case "<=":
        return s ? t >= i : t <= i
    }
  }, o.prototype.on = function (t, e, i, s) {
    t.addEventListener ? t.addEventListener(e, i, s) : t.attachEvent && t.attachEvent("on" + e, i)
  }, o.prototype.off = function (t, e, i, s) {
    t.removeEventListener ? t.removeEventListener(e, i, s) : t.detachEvent && t.detachEvent("on" + e, i)
  }, o.prototype.trigger = function (e, i, s, n, a) {
    var r = {
        item: {
          count: this._items.length,
          index: this.current()
        }
      },
      l = t.camelCase(t.grep(["on", e, s], function (t) {
        return t
      }).join("-").toLowerCase()),
      d = t.Event([e, "owl", s || "carousel"].join(".").toLowerCase(), t.extend({
        relatedTarget: this
      }, r, i));
    return this._supress[e] || (t.each(this._plugins, function (t, e) {
      e.onTrigger && e.onTrigger(d)
    }), this.register({
      type: o.Type.Event,
      name: e
    }), this.$element.trigger(d), this.settings && "function" == typeof this.settings[l] && this.settings[l].call(this, d)), d
  }, o.prototype.enter = function (e) {
    t.each([e].concat(this._states.tags[e] || []), t.proxy(function (t, e) {
      this._states.current[e] === s && (this._states.current[e] = 0), this._states.current[e]++
    }, this))
  }, o.prototype.leave = function (e) {
    t.each([e].concat(this._states.tags[e] || []), t.proxy(function (t, e) {
      this._states.current[e]--
    }, this))
  }, o.prototype.register = function (e) {
    if (e.type === o.Type.Event) {
      if (t.event.special[e.name] || (t.event.special[e.name] = {}), !t.event.special[e.name].owl) {
        var i = t.event.special[e.name]._default;
        t.event.special[e.name]._default = function (t) {
          return !i || !i.apply || t.namespace && -1 !== t.namespace.indexOf("owl") ? t.namespace && t.namespace.indexOf("owl") > -1 : i.apply(this, arguments)
        }, t.event.special[e.name].owl = !0
      }
    } else e.type === o.Type.State && (this._states.tags[e.name] ? this._states.tags[e.name] = this._states.tags[e.name].concat(e.tags) : this._states.tags[e.name] = e.tags, this._states.tags[e.name] = t.grep(this._states.tags[e.name], t.proxy(function (i, s) {
      return t.inArray(i, this._states.tags[e.name]) === s
    }, this)))
  }, o.prototype.suppress = function (e) {
    t.each(e, t.proxy(function (t, e) {
      this._supress[e] = !0
    }, this))
  }, o.prototype.release = function (e) {
    t.each(e, t.proxy(function (t, e) {
      delete this._supress[e]
    }, this))
  }, o.prototype.pointer = function (t) {
    var i = {
      x: null,
      y: null
    };
    return (t = (t = t.originalEvent || t || e.event).touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t).pageX ? (i.x = t.pageX, i.y = t.pageY) : (i.x = t.clientX, i.y = t.clientY), i
  }, o.prototype.isNumeric = function (t) {
    return !isNaN(parseFloat(t))
  }, o.prototype.difference = function (t, e) {
    return {
      x: t.x - e.x,
      y: t.y - e.y
    }
  }, t.fn.owlCarousel = function (e) {
    var i = Array.prototype.slice.call(arguments, 1);
    return this.each(function () {
      var s = t(this),
        n = s.data("owl.carousel");
      n || (n = new o(this, "object" == typeof e && e), s.data("owl.carousel", n), t.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function (e, i) {
        n.register({
          type: o.Type.Event,
          name: i
        }), n.$element.on(i + ".owl.carousel.core", t.proxy(function (t) {
          t.namespace && t.relatedTarget !== this && (this.suppress([i]), n[i].apply(this, [].slice.call(arguments, 1)), this.release([i]))
        }, n))
      })), "string" == typeof e && "_" !== e.charAt(0) && n[e].apply(n, i)
    })
  }, t.fn.owlCarousel.Constructor = o
}(window.Zepto || window.jQuery, window, document),
function (t, e, i, s) {
  var o = function (e) {
    this._core = e, this._interval = null, this._visible = null, this._handlers = {
      "initialized.owl.carousel": t.proxy(function (t) {
        t.namespace && this._core.settings.autoRefresh && this.watch()
      }, this)
    }, this._core.options = t.extend({}, o.Defaults, this._core.options), this._core.$element.on(this._handlers)
  };
  o.Defaults = {
    autoRefresh: !0,
    autoRefreshInterval: 500
  }, o.prototype.watch = function () {
    this._interval || (this._visible = this._core.$element.is(":visible"), this._interval = e.setInterval(t.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
  }, o.prototype.refresh = function () {
    this._core.$element.is(":visible") !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
  }, o.prototype.destroy = function () {
    var t, i;
    for (t in e.clearInterval(this._interval), this._handlers) this._core.$element.off(t, this._handlers[t]);
    for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
  }, t.fn.owlCarousel.Constructor.Plugins.AutoRefresh = o
}(window.Zepto || window.jQuery, window, document),
function (t, e, i, s) {
  var o = function (e) {
    this._core = e, this._loaded = [], this._handlers = {
      "initialized.owl.carousel change.owl.carousel resized.owl.carousel": t.proxy(function (e) {
        if (e.namespace && this._core.settings && this._core.settings.lazyLoad && (e.property && "position" == e.property.name || "initialized" == e.type))
          for (var i = this._core.settings, s = i.center && Math.ceil(i.items / 2) || i.items, o = i.center && -1 * s || 0, n = (e.property && void 0 !== e.property.value ? e.property.value : this._core.current()) + o, a = this._core.clones().length, r = t.proxy(function (t, e) {
              this.load(e)
            }, this); o++ < s;) this.load(a / 2 + this._core.relative(n)), a && t.each(this._core.clones(this._core.relative(n)), r), n++
      }, this)
    }, this._core.options = t.extend({}, o.Defaults, this._core.options), this._core.$element.on(this._handlers)
  };
  o.Defaults = {
    lazyLoad: !1
  }, o.prototype.load = function (i) {
    var s = this._core.$stage.children().eq(i),
      o = s && s.find(".owl-lazy");
    !o || t.inArray(s.get(0), this._loaded) > -1 || (o.each(t.proxy(function (i, s) {
      var o, n = t(s),
        a = e.devicePixelRatio > 1 && n.attr("data-src-retina") || n.attr("data-src");
      this._core.trigger("load", {
        element: n,
        url: a
      }, "lazy"), n.is("img") ? n.one("load.owl.lazy", t.proxy(function () {
        n.css("opacity", 1), this._core.trigger("loaded", {
          element: n,
          url: a
        }, "lazy")
      }, this)).attr("src", a) : ((o = new Image).onload = t.proxy(function () {
        n.css({
          "background-image": 'url("' + a + '")',
          opacity: "1"
        }), this._core.trigger("loaded", {
          element: n,
          url: a
        }, "lazy")
      }, this), o.src = a)
    }, this)), this._loaded.push(s.get(0)))
  }, o.prototype.destroy = function () {
    var t, e;
    for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
    for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
  }, t.fn.owlCarousel.Constructor.Plugins.Lazy = o
}(window.Zepto || window.jQuery, window, document),
function (t, e, i, s) {
  var o = function (e) {
    this._core = e, this._handlers = {
      "initialized.owl.carousel refreshed.owl.carousel": t.proxy(function (t) {
        t.namespace && this._core.settings.autoHeight && this.update()
      }, this),
      "changed.owl.carousel": t.proxy(function (t) {
        t.namespace && this._core.settings.autoHeight && "position" == t.property.name && this.update()
      }, this),
      "loaded.owl.lazy": t.proxy(function (t) {
        t.namespace && this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
      }, this)
    }, this._core.options = t.extend({}, o.Defaults, this._core.options), this._core.$element.on(this._handlers)
  };
  o.Defaults = {
    autoHeight: !1,
    autoHeightClass: "owl-height"
  }, o.prototype.update = function () {
    var e, i = this._core._current,
      s = i + this._core.settings.items,
      o = this._core.$stage.children().toArray().slice(i, s),
      n = [];
    t.each(o, function (e, i) {
      n.push(t(i).height())
    }), e = Math.max.apply(null, n), this._core.$stage.parent().height(e).addClass(this._core.settings.autoHeightClass)
  }, o.prototype.destroy = function () {
    var t, e;
    for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
    for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
  }, t.fn.owlCarousel.Constructor.Plugins.AutoHeight = o
}(window.Zepto || window.jQuery, window, document),
function (t, e, i, s) {
  var o = function (e) {
    this._core = e, this._videos = {}, this._playing = null, this._handlers = {
      "initialized.owl.carousel": t.proxy(function (t) {
        t.namespace && this._core.register({
          type: "state",
          name: "playing",
          tags: ["interacting"]
        })
      }, this),
      "resize.owl.carousel": t.proxy(function (t) {
        t.namespace && this._core.settings.video && this.isInFullScreen() && t.preventDefault()
      }, this),
      "refreshed.owl.carousel": t.proxy(function (t) {
        t.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
      }, this),
      "changed.owl.carousel": t.proxy(function (t) {
        t.namespace && "position" === t.property.name && this._playing && this.stop()
      }, this),
      "prepared.owl.carousel": t.proxy(function (e) {
        if (e.namespace) {
          var i = t(e.content).find(".owl-video");
          i.length && (i.css("display", "none"), this.fetch(i, t(e.content)))
        }
      }, this)
    }, this._core.options = t.extend({}, o.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", t.proxy(function (t) {
      this.play(t)
    }, this))
  };
  o.Defaults = {
    video: !1,
    videoHeight: !1,
    videoWidth: !1
  }, o.prototype.fetch = function (t, e) {
    var i = t.attr("data-vimeo-id") ? "vimeo" : t.attr("data-vzaar-id") ? "vzaar" : "youtube",
      s = t.attr("data-vimeo-id") || t.attr("data-youtube-id") || t.attr("data-vzaar-id"),
      o = t.attr("data-width") || this._core.settings.videoWidth,
      n = t.attr("data-height") || this._core.settings.videoHeight,
      a = t.attr("href");
    if (!a) throw new Error("Missing video URL.");
    if ((s = a.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/))[3].indexOf("youtu") > -1) i = "youtube";
    else if (s[3].indexOf("vimeo") > -1) i = "vimeo";
    else {
      if (!(s[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
      i = "vzaar"
    }
    s = s[6], this._videos[a] = {
      type: i,
      id: s,
      width: o,
      height: n
    }, e.attr("data-video", a), this.thumbnail(t, this._videos[a])
  }, o.prototype.thumbnail = function (e, i) {
    var s, o, n = i.width && i.height ? 'style="width:' + i.width + "px;height:" + i.height + 'px;"' : "",
      a = e.find("img"),
      r = "src",
      l = "",
      d = this._core.settings,
      c = function (t) {
        '<div class="owl-video-play-icon"></div>',
        s = d.lazyLoad ? '<div class="owl-video-tn ' + l + '" ' + r + '="' + t + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>',
        e.after(s),
        e.after('<div class="owl-video-play-icon"></div>')
      };
    if (e.wrap('<div class="owl-video-wrapper"' + n + "></div>"), this._core.settings.lazyLoad && (r = "data-src", l = "owl-lazy"), a.length) return c(a.attr(r)), a.remove(), !1;
    "youtube" === i.type ? (o = "//img.youtube.com/vi/" + i.id + "/hqdefault.jpg", c(o)) : "vimeo" === i.type ? t.ajax({
      type: "GET",
      url: "//vimeo.com/api/v2/video/" + i.id + ".json",
      jsonp: "callback",
      dataType: "jsonp",
      success: function (t) {
        o = t[0].thumbnail_large, c(o)
      }
    }) : "vzaar" === i.type && t.ajax({
      type: "GET",
      url: "//vzaar.com/api/videos/" + i.id + ".json",
      jsonp: "callback",
      dataType: "jsonp",
      success: function (t) {
        o = t.framegrab_url, c(o)
      }
    })
  }, o.prototype.stop = function () {
    this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
  }, o.prototype.play = function (e) {
    var i, s = t(e.target).closest("." + this._core.settings.itemClass),
      o = this._videos[s.attr("data-video")],
      n = o.width || "100%",
      a = o.height || this._core.$stage.height();
    this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), s = this._core.items(this._core.relative(s.index())), this._core.reset(s.index()), "youtube" === o.type ? i = '<iframe width="' + n + '" height="' + a + '" src="//www.youtube.com/embed/' + o.id + "?autoplay=1&rel=0&v=" + o.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === o.type ? i = '<iframe src="//player.vimeo.com/video/' + o.id + '?autoplay=1" width="' + n + '" height="' + a + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' : "vzaar" === o.type && (i = '<iframe frameborder="0"height="' + a + '"width="' + n + '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' + o.id + '/player?autoplay=true"></iframe>'), t('<div class="owl-video-frame">' + i + "</div>").insertAfter(s.find(".owl-video")), this._playing = s.addClass("owl-video-playing"))
  }, o.prototype.isInFullScreen = function () {
    var e = i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement;
    return e && t(e).parent().hasClass("owl-video-frame")
  }, o.prototype.destroy = function () {
    var t, e;
    for (t in this._core.$element.off("click.owl.video"), this._handlers) this._core.$element.off(t, this._handlers[t]);
    for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
  }, t.fn.owlCarousel.Constructor.Plugins.Video = o
}(window.Zepto || window.jQuery, window, document),
function (t, e, i, s) {
  var o = function (e) {
    this.core = e, this.core.options = t.extend({}, o.Defaults, this.core.options), this.swapping = !0, this.previous = s, this.next = s, this.handlers = {
      "change.owl.carousel": t.proxy(function (t) {
        t.namespace && "position" == t.property.name && (this.previous = this.core.current(), this.next = t.property.value)
      }, this),
      "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": t.proxy(function (t) {
        t.namespace && (this.swapping = "translated" == t.type)
      }, this),
      "translate.owl.carousel": t.proxy(function (t) {
        t.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
      }, this)
    }, this.core.$element.on(this.handlers)
  };
  o.Defaults = {
    animateOut: !1,
    animateIn: !1
  }, o.prototype.swap = function () {
    if (1 === this.core.settings.items && t.support.animation && t.support.transition) {
      this.core.speed(0);
      var e, i = t.proxy(this.clear, this),
        s = this.core.$stage.children().eq(this.previous),
        o = this.core.$stage.children().eq(this.next),
        n = this.core.settings.animateIn,
        a = this.core.settings.animateOut;
      this.core.current() !== this.previous && (a && (e = this.core.coordinates(this.previous) - this.core.coordinates(this.next), s.one(t.support.animation.end, i).css({
        left: e + "px"
      }).addClass("animated owl-animated-out").addClass(a)), n && o.one(t.support.animation.end, i).addClass("animated owl-animated-in").addClass(n))
    }
  }, o.prototype.clear = function (e) {
    t(e.target).css({
      left: ""
    }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
  }, o.prototype.destroy = function () {
    var t, e;
    for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
    for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
  }, t.fn.owlCarousel.Constructor.Plugins.Animate = o
}(window.Zepto || window.jQuery, window, document),
function (t, e, i, s) {
  var o = function (e) {
    this._core = e, this._timeout = null, this._paused = !1, this._handlers = {
      "changed.owl.carousel": t.proxy(function (t) {
        t.namespace && "settings" === t.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : t.namespace && "position" === t.property.name && this._core.settings.autoplay && this._setAutoPlayInterval()
      }, this),
      "initialized.owl.carousel": t.proxy(function (t) {
        t.namespace && this._core.settings.autoplay && this.play()
      }, this),
      "play.owl.autoplay": t.proxy(function (t, e, i) {
        t.namespace && this.play(e, i)
      }, this),
      "stop.owl.autoplay": t.proxy(function (t) {
        t.namespace && this.stop()
      }, this),
      "mouseover.owl.autoplay": t.proxy(function () {
        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
      }, this),
      "mouseleave.owl.autoplay": t.proxy(function () {
        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
      }, this),
      "touchstart.owl.core": t.proxy(function () {
        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
      }, this),
      "touchend.owl.core": t.proxy(function () {
        this._core.settings.autoplayHoverPause && this.play()
      }, this)
    }, this._core.$element.on(this._handlers), this._core.options = t.extend({}, o.Defaults, this._core.options)
  };
  o.Defaults = {
    autoplay: !1,
    autoplayTimeout: 5e3,
    autoplayHoverPause: !1,
    autoplaySpeed: !1
  }, o.prototype.play = function (t, e) {
    this._paused = !1, this._core.is("rotating") || (this._core.enter("rotating"), this._setAutoPlayInterval())
  }, o.prototype._getNextTimeout = function (s, o) {
    return this._timeout && e.clearTimeout(this._timeout), e.setTimeout(t.proxy(function () {
      this._paused || this._core.is("busy") || this._core.is("interacting") || i.hidden || this._core.next(o || this._core.settings.autoplaySpeed)
    }, this), s || this._core.settings.autoplayTimeout)
  }, o.prototype._setAutoPlayInterval = function () {
    this._timeout = this._getNextTimeout()
  }, o.prototype.stop = function () {
    this._core.is("rotating") && (e.clearTimeout(this._timeout), this._core.leave("rotating"))
  }, o.prototype.pause = function () {
    this._core.is("rotating") && (this._paused = !0)
  }, o.prototype.destroy = function () {
    var t, e;
    for (t in this.stop(), this._handlers) this._core.$element.off(t, this._handlers[t]);
    for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
  }, t.fn.owlCarousel.Constructor.Plugins.autoplay = o
}(window.Zepto || window.jQuery, window, document),
function (t, e, i, s) {
  "use strict";
  var o = function (e) {
    this._core = e, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
      next: this._core.next,
      prev: this._core.prev,
      to: this._core.to
    }, this._handlers = {
      "prepared.owl.carousel": t.proxy(function (e) {
        e.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + t(e.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
      }, this),
      "added.owl.carousel": t.proxy(function (t) {
        t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 0, this._templates.pop())
      }, this),
      "remove.owl.carousel": t.proxy(function (t) {
        t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 1)
      }, this),
      "changed.owl.carousel": t.proxy(function (t) {
        t.namespace && "position" == t.property.name && this.draw()
      }, this),
      "initialized.owl.carousel": t.proxy(function (t) {
        t.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
      }, this),
      "refreshed.owl.carousel": t.proxy(function (t) {
        t.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
      }, this)
    }, this._core.options = t.extend({}, o.Defaults, this._core.options), this.$element.on(this._handlers)
  };
  o.Defaults = {
    nav: !1,
    navText: ["prev", "next"],
    navSpeed: !1,
    navElement: "div",
    navContainer: !1,
    navContainerClass: "owl-nav",
    navClass: ["owl-prev", "owl-next"],
    slideBy: 1,
    dotClass: "owl-dot",
    dotsClass: "owl-dots",
    dots: !0,
    dotsEach: !1,
    dotsData: !1,
    dotsSpeed: !1,
    dotsContainer: !1
  }, o.prototype.initialize = function () {
    var e, i = this._core.settings;
    for (e in this._controls.$relative = (i.navContainer ? t(i.navContainer) : t("<div>").addClass(i.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = t("<" + i.navElement + ">").addClass(i.navClass[0]).html(i.navText[0]).prependTo(this._controls.$relative).on("click", t.proxy(function (t) {
        this.prev(i.navSpeed)
      }, this)), this._controls.$next = t("<" + i.navElement + ">").addClass(i.navClass[1]).html(i.navText[1]).appendTo(this._controls.$relative).on("click", t.proxy(function (t) {
        this.next(i.navSpeed)
      }, this)), i.dotsData || (this._templates = [t("<div>").addClass(i.dotClass).append(t("<span>")).prop("outerHTML")]), this._controls.$absolute = (i.dotsContainer ? t(i.dotsContainer) : t("<div>").addClass(i.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "div", t.proxy(function (e) {
        var s = t(e.target).parent().is(this._controls.$absolute) ? t(e.target).index() : t(e.target).parent().index();
        e.preventDefault(), this.to(s, i.dotsSpeed)
      }, this)), this._overrides) this._core[e] = t.proxy(this[e], this)
  }, o.prototype.destroy = function () {
    var t, e, i, s;
    for (t in this._handlers) this.$element.off(t, this._handlers[t]);
    for (e in this._controls) this._controls[e].remove();
    for (s in this.overides) this._core[s] = this._overrides[s];
    for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
  }, o.prototype.update = function () {
    var t, e, i = this._core.clones().length / 2,
      s = i + this._core.items().length,
      o = this._core.maximum(!0),
      n = this._core.settings,
      a = n.center || n.autoWidth || n.dotsData ? 1 : n.dotsEach || n.items;
    if ("page" !== n.slideBy && (n.slideBy = Math.min(n.slideBy, n.items)), n.dots || "page" == n.slideBy)
      for (this._pages = [], t = i, e = 0, 0; t < s; t++) {
        if (e >= a || 0 === e) {
          if (this._pages.push({
              start: Math.min(o, t - i),
              end: t - i + a - 1
            }), Math.min(o, t - i) === o) break;
          e = 0, 0
        }
        e += this._core.mergers(this._core.relative(t))
      }
  }, o.prototype.draw = function () {
    var e, i = this._core.settings,
      s = this._core.items().length <= i.items,
      o = this._core.relative(this._core.current()),
      n = i.loop || i.rewind;
    this._controls.$relative.toggleClass("disabled", !i.nav || s), i.nav && (this._controls.$previous.toggleClass("disabled", !n && o <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !n && o >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !i.dots || s), i.dots && (e = this._pages.length - this._controls.$absolute.children().length, i.dotsData && 0 !== e ? this._controls.$absolute.html(this._templates.join("")) : e > 0 ? this._controls.$absolute.append(new Array(e + 1).join(this._templates[0])) : e < 0 && this._controls.$absolute.children().slice(e).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(t.inArray(this.current(), this._pages)).addClass("active"))
  }, o.prototype.onTrigger = function (e) {
    var i = this._core.settings;
    e.page = {
      index: t.inArray(this.current(), this._pages),
      count: this._pages.length,
      size: i && (i.center || i.autoWidth || i.dotsData ? 1 : i.dotsEach || i.items)
    }
  }, o.prototype.current = function () {
    var e = this._core.relative(this._core.current());
    return t.grep(this._pages, t.proxy(function (t, i) {
      return t.start <= e && t.end >= e
    }, this)).pop()
  }, o.prototype.getPosition = function (e) {
    var i, s, o = this._core.settings;
    return "page" == o.slideBy ? (i = t.inArray(this.current(), this._pages), s = this._pages.length, e ? ++i : --i, i = this._pages[(i % s + s) % s].start) : (i = this._core.relative(this._core.current()), s = this._core.items().length, e ? i += o.slideBy : i -= o.slideBy), i
  }, o.prototype.next = function (e) {
    t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e)
  }, o.prototype.prev = function (e) {
    t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e)
  }, o.prototype.to = function (e, i, s) {
    var o;
    !s && this._pages.length ? (o = this._pages.length, t.proxy(this._overrides.to, this._core)(this._pages[(e % o + o) % o].start, i)) : t.proxy(this._overrides.to, this._core)(e, i)
  }, t.fn.owlCarousel.Constructor.Plugins.Navigation = o
}(window.Zepto || window.jQuery, window, document),
function (t, e, i, s) {
  "use strict";
  var o = function (i) {
    this._core = i, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
      "initialized.owl.carousel": t.proxy(function (i) {
        i.namespace && "URLHash" === this._core.settings.startPosition && t(e).trigger("hashchange.owl.navigation")
      }, this),
      "prepared.owl.carousel": t.proxy(function (e) {
        if (e.namespace) {
          var i = t(e.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
          if (!i) return;
          this._hashes[i] = e.content
        }
      }, this),
      "changed.owl.carousel": t.proxy(function (i) {
        if (i.namespace && "position" === i.property.name) {
          var s = this._core.items(this._core.relative(this._core.current())),
            o = t.map(this._hashes, function (t, e) {
              return t === s ? e : null
            }).join();
          if (!o || e.location.hash.slice(1) === o) return;
          e.location.hash = o
        }
      }, this)
    }, this._core.options = t.extend({}, o.Defaults, this._core.options), this.$element.on(this._handlers), t(e).on("hashchange.owl.navigation", t.proxy(function (t) {
      var i = e.location.hash.substring(1),
        s = this._core.$stage.children(),
        o = this._hashes[i] && s.index(this._hashes[i]);
      void 0 !== o && o !== this._core.current() && this._core.to(this._core.relative(o), !1, !0)
    }, this))
  };
  o.Defaults = {
    URLhashListener: !1
  }, o.prototype.destroy = function () {
    var i, s;
    for (i in t(e).off("hashchange.owl.navigation"), this._handlers) this._core.$element.off(i, this._handlers[i]);
    for (s in Object.getOwnPropertyNames(this)) "function" != typeof this[s] && (this[s] = null)
  }, t.fn.owlCarousel.Constructor.Plugins.Hash = o
}(window.Zepto || window.jQuery, window, document),
function (t, e, i, s) {
  function o(e, i) {
    var o = !1,
      n = e.charAt(0).toUpperCase() + e.slice(1);
    return t.each((e + " " + r.join(n + " ") + n).split(" "), function (t, e) {
      if (a[e] !== s) return o = !i || e, !1
    }), o
  }

  function n(t) {
    return o(t, !0)
  }
  var a = t("<support>").get(0).style,
    r = "Webkit Moz O ms".split(" "),
    l = {
      transition: {
        end: {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          OTransition: "oTransitionEnd",
          transition: "transitionend"
        }
      },
      animation: {
        end: {
          WebkitAnimation: "webkitAnimationEnd",
          MozAnimation: "animationend",
          OAnimation: "oAnimationEnd",
          animation: "animationend"
        }
      }
    },
    d = function () {
      return !!o("transform")
    },
    c = function () {
      return !!o("perspective")
    },
    h = function () {
      return !!o("animation")
    };
  (function () {
    return !!o("transition")
  })() && (t.support.transition = new String(n("transition")), t.support.transition.end = l.transition.end[t.support.transition]), h() && (t.support.animation = new String(n("animation")), t.support.animation.end = l.animation.end[t.support.animation]), d() && (t.support.transform = new String(n("transform")), t.support.transform3d = c())
}(window.Zepto || window.jQuery, window, document),
function (t) {
  "object" == typeof module && module.exports ? module.exports = t() : window.intlTelInput = t()
}(function (t) {
  "use strict";
  return function () {
    for (var e = [
        ["Afghanistan (‫افغانستان‬‎)", "af", "93"],
        ["Albania (Shqipëri)", "al", "355"],
        ["Algeria (‫الجزائر‬‎)", "dz", "213"],
        ["American Samoa", "as", "1", 5, ["684"]],
        ["Andorra", "ad", "376"],
        ["Angola", "ao", "244"],
        ["Anguilla", "ai", "1", 6, ["264"]],
        ["Antigua and Barbuda", "ag", "1", 7, ["268"]],
        ["Argentina", "ar", "54"],
        ["Armenia (Հայաստան)", "am", "374"],
        ["Aruba", "aw", "297"],
        ["Australia", "au", "61", 0],
        ["Austria (Österreich)", "at", "43"],
        ["Azerbaijan (Azərbaycan)", "az", "994"],
        ["Bahamas", "bs", "1", 8, ["242"]],
        ["Bahrain (‫البحرين‬‎)", "bh", "973"],
        ["Bangladesh (বাংলাদেশ)", "bd", "880"],
        ["Barbados", "bb", "1", 9, ["246"]],
        ["Belarus (Беларусь)", "by", "375"],
        ["Belgium (België)", "be", "32"],
        ["Belize", "bz", "501"],
        ["Benin (Bénin)", "bj", "229"],
        ["Bermuda", "bm", "1", 10, ["441"]],
        ["Bhutan (འབྲུག)", "bt", "975"],
        ["Bolivia", "bo", "591"],
        ["Bosnia and Herzegovina (Босна и Херцеговина)", "ba", "387"],
        ["Botswana", "bw", "267"],
        ["Brazil (Brasil)", "br", "55"],
        ["British Indian Ocean Territory", "io", "246"],
        ["British Virgin Islands", "vg", "1", 11, ["284"]],
        ["Brunei", "bn", "673"],
        ["Bulgaria (България)", "bg", "359"],
        ["Burkina Faso", "bf", "226"],
        ["Burundi (Uburundi)", "bi", "257"],
        ["Cambodia (កម្ពុជា)", "kh", "855"],
        ["Cameroon (Cameroun)", "cm", "237"],
        ["Canada", "ca", "1", 1, ["204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905"]],
        ["Cape Verde (Kabu Verdi)", "cv", "238"],
        ["Caribbean Netherlands", "bq", "599", 1, ["3", "4", "7"]],
        ["Cayman Islands", "ky", "1", 12, ["345"]],
        ["Central African Republic (République centrafricaine)", "cf", "236"],
        ["Chad (Tchad)", "td", "235"],
        ["Chile", "cl", "56"],
        ["China (中国)", "cn", "86"],
        ["Christmas Island", "cx", "61", 2],
        ["Cocos (Keeling) Islands", "cc", "61", 1],
        ["Colombia", "co", "57"],
        ["Comoros (‫جزر القمر‬‎)", "km", "269"],
        ["Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", "cd", "243"],
        ["Congo (Republic) (Congo-Brazzaville)", "cg", "242"],
        ["Cook Islands", "ck", "682"],
        ["Costa Rica", "cr", "506"],
        ["Côte d’Ivoire", "ci", "225"],
        ["Croatia (Hrvatska)", "hr", "385"],
        ["Cuba", "cu", "53"],
        ["Curaçao", "cw", "599", 0],
        ["Cyprus (Κύπρος)", "cy", "357"],
        ["Czech Republic (Česká republika)", "cz", "420"],
        ["Denmark (Danmark)", "dk", "45"],
        ["Djibouti", "dj", "253"],
        ["Dominica", "dm", "1", 13, ["767"]],
        ["Dominican Republic (República Dominicana)", "do", "1", 2, ["809", "829", "849"]],
        ["Ecuador", "ec", "593"],
        ["Egypt (‫مصر‬‎)", "eg", "20"],
        ["El Salvador", "sv", "503"],
        ["Equatorial Guinea (Guinea Ecuatorial)", "gq", "240"],
        ["Eritrea", "er", "291"],
        ["Estonia (Eesti)", "ee", "372"],
        ["Ethiopia", "et", "251"],
        ["Falkland Islands (Islas Malvinas)", "fk", "500"],
        ["Faroe Islands (Føroyar)", "fo", "298"],
        ["Fiji", "fj", "679"],
        ["Finland (Suomi)", "fi", "358", 0],
        ["France", "fr", "33"],
        ["French Guiana (Guyane française)", "gf", "594"],
        ["French Polynesia (Polynésie française)", "pf", "689"],
        ["Gabon", "ga", "241"],
        ["Gambia", "gm", "220"],
        ["Georgia (საქართველო)", "ge", "995"],
        ["Germany (Deutschland)", "de", "49"],
        ["Ghana (Gaana)", "gh", "233"],
        ["Gibraltar", "gi", "350"],
        ["Greece (Ελλάδα)", "gr", "30"],
        ["Greenland (Kalaallit Nunaat)", "gl", "299"],
        ["Grenada", "gd", "1", 14, ["473"]],
        ["Guadeloupe", "gp", "590", 0],
        ["Guam", "gu", "1", 15, ["671"]],
        ["Guatemala", "gt", "502"],
        ["Guernsey", "gg", "44", 1, ["1481", "7781", "7839", "7911"]],
        ["Guinea (Guinée)", "gn", "224"],
        ["Guinea-Bissau (Guiné Bissau)", "gw", "245"],
        ["Guyana", "gy", "592"],
        ["Haiti", "ht", "509"],
        ["Honduras", "hn", "504"],
        ["Hong Kong (香港)", "hk", "852"],
        ["Hungary (Magyarország)", "hu", "36"],
        ["Iceland (Ísland)", "is", "354"],
        ["India (भारत)", "in", "91"],
        ["Indonesia", "id", "62"],
        ["Iran (‫ایران‬‎)", "ir", "98"],
        ["Iraq (‫العراق‬‎)", "iq", "964"],
        ["Ireland", "ie", "353"],
        ["Isle of Man", "im", "44", 2, ["1624", "74576", "7524", "7924", "7624"]],
        ["Israel (‫ישראל‬‎)", "il", "972"],
        ["Italy (Italia)", "it", "39", 0],
        ["Jamaica", "jm", "1", 4, ["876", "658"]],
        ["Japan (日本)", "jp", "81"],
        ["Jersey", "je", "44", 3, ["1534", "7509", "7700", "7797", "7829", "7937"]],
        ["Jordan (‫الأردن‬‎)", "jo", "962"],
        ["Kazakhstan (Казахстан)", "kz", "7", 1, ["33", "7"]],
        ["Kenya", "ke", "254"],
        ["Kiribati", "ki", "686"],
        ["Kosovo", "xk", "383"],
        ["Kuwait (‫الكويت‬‎)", "kw", "965"],
        ["Kyrgyzstan (Кыргызстан)", "kg", "996"],
        ["Laos (ລາວ)", "la", "856"],
        ["Latvia (Latvija)", "lv", "371"],
        ["Lebanon (‫لبنان‬‎)", "lb", "961"],
        ["Lesotho", "ls", "266"],
        ["Liberia", "lr", "231"],
        ["Libya (‫ليبيا‬‎)", "ly", "218"],
        ["Liechtenstein", "li", "423"],
        ["Lithuania (Lietuva)", "lt", "370"],
        ["Luxembourg", "lu", "352"],
        ["Macau (澳門)", "mo", "853"],
        ["Macedonia (FYROM) (Македонија)", "mk", "389"],
        ["Madagascar (Madagasikara)", "mg", "261"],
        ["Malawi", "mw", "265"],
        ["Malaysia", "my", "60"],
        ["Maldives", "mv", "960"],
        ["Mali", "ml", "223"],
        ["Malta", "mt", "356"],
        ["Marshall Islands", "mh", "692"],
        ["Martinique", "mq", "596"],
        ["Mauritania (‫موريتانيا‬‎)", "mr", "222"],
        ["Mauritius (Moris)", "mu", "230"],
        ["Mayotte", "yt", "262", 1, ["269", "639"]],
        ["Mexico (México)", "mx", "52"],
        ["Micronesia", "fm", "691"],
        ["Moldova (Republica Moldova)", "md", "373"],
        ["Monaco", "mc", "377"],
        ["Mongolia (Монгол)", "mn", "976"],
        ["Montenegro (Crna Gora)", "me", "382"],
        ["Montserrat", "ms", "1", 16, ["664"]],
        ["Morocco (‫المغرب‬‎)", "ma", "212", 0],
        ["Mozambique (Moçambique)", "mz", "258"],
        ["Myanmar (Burma) (မြန်မာ)", "mm", "95"],
        ["Namibia (Namibië)", "na", "264"],
        ["Nauru", "nr", "674"],
        ["Nepal (नेपाल)", "np", "977"],
        ["Netherlands (Nederland)", "nl", "31"],
        ["New Caledonia (Nouvelle-Calédonie)", "nc", "687"],
        ["New Zealand", "nz", "64"],
        ["Nicaragua", "ni", "505"],
        ["Niger (Nijar)", "ne", "227"],
        ["Nigeria", "ng", "234"],
        ["Niue", "nu", "683"],
        ["Norfolk Island", "nf", "672"],
        ["North Korea (조선 민주주의 인민 공화국)", "kp", "850"],
        ["Northern Mariana Islands", "mp", "1", 17, ["670"]],
        ["Norway (Norge)", "no", "47", 0],
        ["Oman (‫عُمان‬‎)", "om", "968"],
        ["Pakistan (‫پاکستان‬‎)", "pk", "92"],
        ["Palau", "pw", "680"],
        ["Palestine (‫فلسطين‬‎)", "ps", "970"],
        ["Panama (Panamá)", "pa", "507"],
        ["Papua New Guinea", "pg", "675"],
        ["Paraguay", "py", "595"],
        ["Peru (Perú)", "pe", "51"],
        ["Philippines", "ph", "63"],
        ["Poland (Polska)", "pl", "48"],
        ["Portugal", "pt", "351"],
        ["Puerto Rico", "pr", "1", 3, ["787", "939"]],
        ["Qatar (‫قطر‬‎)", "qa", "974"],
        ["Réunion (La Réunion)", "re", "262", 0],
        ["Romania (România)", "ro", "40"],
        ["Russia (Россия)", "ru", "7", 0],
        ["Rwanda", "rw", "250"],
        ["Saint Barthélemy", "bl", "590", 1],
        ["Saint Helena", "sh", "290"],
        ["Saint Kitts and Nevis", "kn", "1", 18, ["869"]],
        ["Saint Lucia", "lc", "1", 19, ["758"]],
        ["Saint Martin (Saint-Martin (partie française))", "mf", "590", 2],
        ["Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", "pm", "508"],
        ["Saint Vincent and the Grenadines", "vc", "1", 20, ["784"]],
        ["Samoa", "ws", "685"],
        ["San Marino", "sm", "378"],
        ["São Tomé and Príncipe (São Tomé e Príncipe)", "st", "239"],
        ["Saudi Arabia (‫المملكة العربية السعودية‬‎)", "sa", "966"],
        ["Senegal (Sénégal)", "sn", "221"],
        ["Serbia (Србија)", "rs", "381"],
        ["Seychelles", "sc", "248"],
        ["Sierra Leone", "sl", "232"],
        ["Singapore", "sg", "65"],
        ["Sint Maarten", "sx", "1", 21, ["721"]],
        ["Slovakia (Slovensko)", "sk", "421"],
        ["Slovenia (Slovenija)", "si", "386"],
        ["Solomon Islands", "sb", "677"],
        ["Somalia (Soomaaliya)", "so", "252"],
        ["South Africa", "za", "27"],
        ["South Korea (대한민국)", "kr", "82"],
        ["South Sudan (‫جنوب السودان‬‎)", "ss", "211"],
        ["Spain (España)", "es", "34"],
        ["Sri Lanka (ශ්‍රී ලංකාව)", "lk", "94"],
        ["Sudan (‫السودان‬‎)", "sd", "249"],
        ["Suriname", "sr", "597"],
        ["Svalbard and Jan Mayen", "sj", "47", 1, ["79"]],
        ["Swaziland", "sz", "268"],
        ["Sweden (Sverige)", "se", "46"],
        ["Switzerland (Schweiz)", "ch", "41"],
        ["Syria (‫سوريا‬‎)", "sy", "963"],
        ["Taiwan (台灣)", "tw", "886"],
        ["Tajikistan", "tj", "992"],
        ["Tanzania", "tz", "255"],
        ["Thailand (ไทย)", "th", "66"],
        ["Timor-Leste", "tl", "670"],
        ["Togo", "tg", "228"],
        ["Tokelau", "tk", "690"],
        ["Tonga", "to", "676"],
        ["Trinidad and Tobago", "tt", "1", 22, ["868"]],
        ["Tunisia (‫تونس‬‎)", "tn", "216"],
        ["Turkey (Türkiye)", "tr", "90"],
        ["Turkmenistan", "tm", "993"],
        ["Turks and Caicos Islands", "tc", "1", 23, ["649"]],
        ["Tuvalu", "tv", "688"],
        ["U.S. Virgin Islands", "vi", "1", 24, ["340"]],
        ["Uganda", "ug", "256"],
        ["Ukraine (Україна)", "ua", "380"],
        ["United Arab Emirates (‫الإمارات العربية المتحدة‬‎)", "ae", "971"],
        ["United Kingdom", "gb", "44", 0],
        ["United States", "us", "1", 0],
        ["Uruguay", "uy", "598"],
        ["Uzbekistan (Oʻzbekiston)", "uz", "998"],
        ["Vanuatu", "vu", "678"],
        ["Vatican City (Città del Vaticano)", "va", "39", 1, ["06698"]],
        ["Venezuela", "ve", "58"],
        ["Vietnam (Việt Nam)", "vn", "84"],
        ["Wallis and Futuna (Wallis-et-Futuna)", "wf", "681"],
        ["Western Sahara (‫الصحراء الغربية‬‎)", "eh", "212", 1, ["5288", "5289"]],
        ["Yemen (‫اليمن‬‎)", "ye", "967"],
        ["Zambia", "zm", "260"],
        ["Zimbabwe", "zw", "263"],
        ["Åland Islands", "ax", "358", 1, ["18"]]
      ], i = 0; i < e.length; i++) {
      var s = e[i];
      e[i] = {
        name: s[0],
        iso2: s[1],
        dialCode: s[2],
        priority: s[3] || 0,
        areaCodes: s[4] || null
      }
    }

    function o(t, e) {
      for (var i = 0; i < e.length; i++) {
        var s = e[i];
        s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(t, s.key, s)
      }
    }
    var n = {
      getInstance: function (t) {
        var e = t.getAttribute("data-intl-tel-input-id");
        return window.intlTelInputGlobals.instances[e]
      },
      instances: {}
    };
    "object" == typeof window && (window.intlTelInputGlobals = n);
    var a = 0,
      r = {
        allowDropdown: !0,
        autoHideDialCode: !0,
        autoPlaceholder: "polite",
        customContainer: "",
        customPlaceholder: null,
        dropdownContainer: null,
        excludeCountries: [],
        formatOnDisplay: !0,
        geoIpLookup: null,
        hiddenInput: "",
        initialCountry: "",
        localizedCountries: null,
        nationalMode: !0,
        onlyCountries: [],
        placeholderNumberType: "MOBILE",
        preferredCountries: ["us", "gb"],
        separateDialCode: !1,
        utilsScript: ""
      },
      l = ["800", "822", "833", "844", "855", "866", "877", "880", "881", "882", "883", "884", "885", "886", "887", "888", "889"];
    "object" == typeof window && window.addEventListener("load", function () {
      window.intlTelInputGlobals.windowLoaded = !0
    });
    var d = function (t, e) {
        for (var i = Object.keys(t), s = 0; s < i.length; s++) e(i[s], t[i[s]])
      },
      c = function (t) {
        d(window.intlTelInputGlobals.instances, function (e) {
          window.intlTelInputGlobals.instances[e][t]()
        })
      },
      h = function () {
        function i(t, e) {
          var s = this;
          ! function (t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
          }(this, i), this.id = a++, this.telInput = t, this.activeItem = null, this.highlightedItem = null;
          var o = e || {};
          this.options = {}, d(r, function (t, e) {
            s.options[t] = o.hasOwnProperty(t) ? o[t] : e
          }), this.hadInitialPlaceholder = Boolean(t.getAttribute("placeholder"))
        }
        var s, n, h;
        return s = i, (n = [{
          key: "_init",
          value: function () {
            var t = this;
            if (this.options.nationalMode && (this.options.autoHideDialCode = !1), this.options.separateDialCode && (this.options.autoHideDialCode = this.options.nationalMode = !1), this.isMobile = /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), this.isMobile && (document.body.classList.add("iti-mobile"), this.options.dropdownContainer || (this.options.dropdownContainer = document.body)), "undefined" != typeof Promise) {
              var e = new Promise(function (e, i) {
                  t.resolveAutoCountryPromise = e, t.rejectAutoCountryPromise = i
                }),
                i = new Promise(function (e, i) {
                  t.resolveUtilsScriptPromise = e, t.rejectUtilsScriptPromise = i
                });
              this.promise = Promise.all([e, i])
            } else this.resolveAutoCountryPromise = this.rejectAutoCountryPromise = function () {}, this.resolveUtilsScriptPromise = this.rejectUtilsScriptPromise = function () {};
            this.selectedCountryData = {}, this._processCountryData(), this._generateMarkup(), this._setInitialState(), this._initListeners(), this._initRequests()
          }
        }, {
          key: "_processCountryData",
          value: function () {
            this._processAllCountries(), this._processCountryCodes(), this._processPreferredCountries(), this.options.localizedCountries && this._translateCountriesByLocale(), (this.options.onlyCountries.length || this.options.localizedCountries) && this.countries.sort(this._countryNameSort)
          }
        }, {
          key: "_addCountryCode",
          value: function (e, i, s) {
            i.length > this.dialCodeMaxLen && (this.dialCodeMaxLen = i.length), this.countryCodes.hasOwnProperty(i) || (this.countryCodes[i] = []);
            for (var o = 0; o < this.countryCodes[i].length; o++)
              if (this.countryCodes[i][o] === e) return;
            var n = s !== t ? s : this.countryCodes[i].length;
            this.countryCodes[i][n] = e
          }
        }, {
          key: "_processAllCountries",
          value: function () {
            if (this.options.onlyCountries.length) {
              var t = this.options.onlyCountries.map(function (t) {
                return t.toLowerCase()
              });
              this.countries = e.filter(function (e) {
                return t.indexOf(e.iso2) > -1
              })
            } else if (this.options.excludeCountries.length) {
              var i = this.options.excludeCountries.map(function (t) {
                return t.toLowerCase()
              });
              this.countries = e.filter(function (t) {
                return -1 === i.indexOf(t.iso2)
              })
            } else this.countries = e
          }
        }, {
          key: "_translateCountriesByLocale",
          value: function () {
            for (var t = 0; t < this.countries.length; t++) {
              var e = this.countries[t].iso2.toLowerCase();
              this.options.localizedCountries.hasOwnProperty(e) && (this.countries[t].name = this.options.localizedCountries[e])
            }
          }
        }, {
          key: "_countryNameSort",
          value: function (t, e) {
            return t.name.localeCompare(e.name)
          }
        }, {
          key: "_processCountryCodes",
          value: function () {
            this.dialCodeMaxLen = 0, this.countryCodes = {};
            for (var t = 0; t < this.countries.length; t++) {
              var e = this.countries[t];
              this._addCountryCode(e.iso2, e.dialCode, e.priority)
            }
            for (var i = 0; i < this.countries.length; i++) {
              var s = this.countries[i];
              if (s.areaCodes)
                for (var o = this.countryCodes[s.dialCode][0], n = 0; n < s.areaCodes.length; n++) {
                  for (var a = s.areaCodes[n], r = 1; r < a.length; r++) {
                    var l = s.dialCode + a.substr(0, r);
                    this._addCountryCode(o, l), this._addCountryCode(s.iso2, l)
                  }
                  this._addCountryCode(s.iso2, s.dialCode + a)
                }
            }
          }
        }, {
          key: "_processPreferredCountries",
          value: function () {
            this.preferredCountries = [];
            for (var t = 0; t < this.options.preferredCountries.length; t++) {
              var e = this.options.preferredCountries[t].toLowerCase(),
                i = this._getCountryData(e, !1, !0);
              i && this.preferredCountries.push(i)
            }
          }
        }, {
          key: "_createEl",
          value: function (t, e, i) {
            var s = document.createElement(t);
            return e && d(e, function (t, e) {
              return s.setAttribute(t, e)
            }), i && i.appendChild(s), s
          }
        }, {
          key: "_generateMarkup",
          value: function () {
            this.telInput.hasAttribute("autocomplete") || this.telInput.form && this.telInput.form.hasAttribute("autocomplete") || this.telInput.setAttribute("autocomplete", "off");
            var t = "iti";
            this.options.allowDropdown && (t += " iti--allow-dropdown"), this.options.separateDialCode && (t += " iti--separate-dial-code"), this.options.customContainer && (t += " ", t += this.options.customContainer);
            var e = this._createEl("div", {
              class: t
            });
            if (this.telInput.parentNode.insertBefore(e, this.telInput), this.flagsContainer = this._createEl("div", {
                class: "iti__flag-container"
              }, e), e.appendChild(this.telInput), this.selectedFlag = this._createEl("div", {
                class: "iti__selected-flag",
                role: "combobox",
                "aria-owns": "iti-".concat(this.id, "__country-listbox"),
                "aria-expanded": "false"
              }, this.flagsContainer), this.selectedFlagInner = this._createEl("div", {
                class: "iti__flag"
              }, this.selectedFlag), this.options.separateDialCode && (this.selectedDialCode = this._createEl("div", {
                class: "iti__selected-dial-code"
              }, this.selectedFlag)), this.options.allowDropdown && (this.selectedFlag.setAttribute("tabindex", "0"), this.dropdownArrow = this._createEl("div", {
                class: "iti__arrow"
              }, this.selectedFlag), this.countryList = this._createEl("ul", {
                class: "iti__country-list iti__hide",
                id: "iti-".concat(this.id, "__country-listbox"),
                role: "listbox"
              }), this.preferredCountries.length && (this._appendListItems(this.preferredCountries, "iti__preferred", !0), this._createEl("li", {
                class: "iti__divider",
                role: "separator",
                "aria-disabled": "true"
              }, this.countryList)), this._appendListItems(this.countries, "iti__standard"), this.options.dropdownContainer ? (this.dropdown = this._createEl("div", {
                class: "iti iti--container"
              }), this.dropdown.appendChild(this.countryList)) : this.flagsContainer.appendChild(this.countryList)), this.options.hiddenInput) {
              var i = this.options.hiddenInput,
                s = this.telInput.getAttribute("name");
              if (s) {
                var o = s.lastIndexOf("["); - 1 !== o && (i = "".concat(s.substr(0, o), "[").concat(i, "]"))
              }
              this.hiddenInput = this._createEl("input", {
                type: "hidden",
                name: i
              }), e.appendChild(this.hiddenInput)
            }
          }
        }, {
          key: "_appendListItems",
          value: function (t, e, i) {
            for (var s = "", o = 0; o < t.length; o++) {
              var n = t[o],
                a = i ? "-preferred" : "";
              s += "<li class='iti__country ".concat(e, "' tabIndex='-1' id='iti-").concat(this.id, "__item-").concat(n.iso2).concat(a, "' role='option' data-dial-code='").concat(n.dialCode, "' data-country-code='").concat(n.iso2, "'>"), s += "<div class='iti__flag-box'><div class='iti__flag iti__".concat(n.iso2, "'></div></div>"), s += "<span class='iti__country-name'>".concat(n.name, "</span>"), s += "<span class='iti__dial-code'>+".concat(n.dialCode, "</span>"), s += "</li>"
            }
            this.countryList.insertAdjacentHTML("beforeend", s)
          }
        }, {
          key: "_setInitialState",
          value: function () {
            var t = this.telInput.value,
              e = this._getDialCode(t),
              i = this._isRegionlessNanp(t),
              s = this.options,
              o = s.initialCountry,
              n = s.nationalMode,
              a = s.autoHideDialCode,
              r = s.separateDialCode;
            e && !i ? this._updateFlagFromNumber(t) : "auto" !== o && (o ? this._setFlag(o.toLowerCase()) : e && i ? this._setFlag("us") : (this.defaultCountry = this.preferredCountries.length ? this.preferredCountries[0].iso2 : this.countries[0].iso2, t || this._setFlag(this.defaultCountry)), t || n || a || r || (this.telInput.value = "+".concat(this.selectedCountryData.dialCode))), t && this._updateValFromNumber(t)
          }
        }, {
          key: "_initListeners",
          value: function () {
            this._initKeyListeners(), this.options.autoHideDialCode && this._initBlurListeners(), this.options.allowDropdown && this._initDropdownListeners(), this.hiddenInput && this._initHiddenInputListener()
          }
        }, {
          key: "_initHiddenInputListener",
          value: function () {
            var t = this;
            this._handleHiddenInputSubmit = function () {
              t.hiddenInput.value = t.getNumber()
            }, this.telInput.form && this.telInput.form.addEventListener("submit", this._handleHiddenInputSubmit)
          }
        }, {
          key: "_getClosestLabel",
          value: function () {
            for (var t = this.telInput; t && "LABEL" !== t.tagName;) t = t.parentNode;
            return t
          }
        }, {
          key: "_initDropdownListeners",
          value: function () {
            var t = this;
            this._handleLabelClick = function (e) {
              t.countryList.classList.contains("iti__hide") ? t.telInput.focus() : e.preventDefault()
            };
            var e = this._getClosestLabel();
            e && e.addEventListener("click", this._handleLabelClick), this._handleClickSelectedFlag = function () {
              !t.countryList.classList.contains("iti__hide") || t.telInput.disabled || t.telInput.readOnly || t._showDropdown()
            }, this.selectedFlag.addEventListener("click", this._handleClickSelectedFlag), this._handleFlagsContainerKeydown = function (e) {
              t.countryList.classList.contains("iti__hide") && -1 !== ["ArrowUp", "Up", "ArrowDown", "Down", " ", "Enter"].indexOf(e.key) && (e.preventDefault(), e.stopPropagation(), t._showDropdown()), "Tab" === e.key && t._closeDropdown()
            }, this.flagsContainer.addEventListener("keydown", this._handleFlagsContainerKeydown)
          }
        }, {
          key: "_initRequests",
          value: function () {
            var t = this;
            this.options.utilsScript && !window.intlTelInputUtils ? window.intlTelInputGlobals.windowLoaded ? window.intlTelInputGlobals.loadUtils(this.options.utilsScript) : window.addEventListener("load", function () {
              window.intlTelInputGlobals.loadUtils(t.options.utilsScript)
            }) : this.resolveUtilsScriptPromise(), "auto" === this.options.initialCountry ? this._loadAutoCountry() : this.resolveAutoCountryPromise()
          }
        }, {
          key: "_loadAutoCountry",
          value: function () {
            window.intlTelInputGlobals.autoCountry ? this.handleAutoCountry() : window.intlTelInputGlobals.startedLoadingAutoCountry || (window.intlTelInputGlobals.startedLoadingAutoCountry = !0, "function" == typeof this.options.geoIpLookup && this.options.geoIpLookup(function (t) {
              window.intlTelInputGlobals.autoCountry = t.toLowerCase(), setTimeout(function () {
                return c("handleAutoCountry")
              })
            }, function () {
              return c("rejectAutoCountryPromise")
            }))
          }
        }, {
          key: "_initKeyListeners",
          value: function () {
            var t = this;
            this._handleKeyupEvent = function () {
              t._updateFlagFromNumber(t.telInput.value) && t._triggerCountryChange()
            }, this.telInput.addEventListener("keyup", this._handleKeyupEvent), this._handleClipboardEvent = function () {
              setTimeout(t._handleKeyupEvent)
            }, this.telInput.addEventListener("cut", this._handleClipboardEvent), this.telInput.addEventListener("paste", this._handleClipboardEvent)
          }
        }, {
          key: "_cap",
          value: function (t) {
            var e = this.telInput.getAttribute("maxlength");
            return e && t.length > e ? t.substr(0, e) : t
          }
        }, {
          key: "_initBlurListeners",
          value: function () {
            var t = this;
            this._handleSubmitOrBlurEvent = function () {
              t._removeEmptyDialCode()
            }, this.telInput.form && this.telInput.form.addEventListener("submit", this._handleSubmitOrBlurEvent), this.telInput.addEventListener("blur", this._handleSubmitOrBlurEvent)
          }
        }, {
          key: "_removeEmptyDialCode",
          value: function () {
            if ("+" === this.telInput.value.charAt(0)) {
              var t = this._getNumeric(this.telInput.value);
              t && this.selectedCountryData.dialCode !== t || (this.telInput.value = "")
            }
          }
        }, {
          key: "_getNumeric",
          value: function (t) {
            return t.replace(/\D/g, "")
          }
        }, {
          key: "_trigger",
          value: function (t) {
            var e = document.createEvent("Event");
            e.initEvent(t, !0, !0), this.telInput.dispatchEvent(e)
          }
        }, {
          key: "_showDropdown",
          value: function () {
            this.countryList.classList.remove("iti__hide"), this.selectedFlag.setAttribute("aria-expanded", "true"), this._setDropdownPosition(), this.activeItem && (this._highlightListItem(this.activeItem, !1), this._scrollTo(this.activeItem, !0)), this._bindDropdownListeners(), this.dropdownArrow.classList.add("iti__arrow--up"), this._trigger("open:countrydropdown")
          }
        }, {
          key: "_toggleClass",
          value: function (t, e, i) {
            i && !t.classList.contains(e) ? t.classList.add(e) : !i && t.classList.contains(e) && t.classList.remove(e)
          }
        }, {
          key: "_setDropdownPosition",
          value: function () {
            var t = this;
            if (this.options.dropdownContainer && this.options.dropdownContainer.appendChild(this.dropdown), !this.isMobile) {
              var e = this.telInput.getBoundingClientRect(),
                i = window.pageYOffset || document.documentElement.scrollTop,
                s = e.top + i,
                o = this.countryList.offsetHeight,
                n = s + this.telInput.offsetHeight + o < i + window.innerHeight,
                a = s - o > i;
              if (this._toggleClass(this.countryList, "iti__country-list--dropup", !n && a), this.options.dropdownContainer) {
                var r = !n && a ? 0 : this.telInput.offsetHeight;
                this.dropdown.style.top = "".concat(s + r, "px"), this.dropdown.style.left = "".concat(e.left + document.body.scrollLeft, "px"), this._handleWindowScroll = function () {
                  return t._closeDropdown()
                }, window.addEventListener("scroll", this._handleWindowScroll)
              }
            }
          }
        }, {
          key: "_getClosestListItem",
          value: function (t) {
            for (var e = t; e && e !== this.countryList && !e.classList.contains("iti__country");) e = e.parentNode;
            return e === this.countryList ? null : e
          }
        }, {
          key: "_bindDropdownListeners",
          value: function () {
            var t = this;
            this._handleMouseoverCountryList = function (e) {
              var i = t._getClosestListItem(e.target);
              i && t._highlightListItem(i, !1)
            }, this.countryList.addEventListener("mouseover", this._handleMouseoverCountryList), this._handleClickCountryList = function (e) {
              var i = t._getClosestListItem(e.target);
              i && t._selectListItem(i)
            }, this.countryList.addEventListener("click", this._handleClickCountryList);
            var e = !0;
            this._handleClickOffToClose = function () {
              e || t._closeDropdown(), e = !1
            }, document.documentElement.addEventListener("click", this._handleClickOffToClose);
            var i = "",
              s = null;
            this._handleKeydownOnDropdown = function (e) {
              e.preventDefault(), "ArrowUp" === e.key || "Up" === e.key || "ArrowDown" === e.key || "Down" === e.key ? t._handleUpDownKey(e.key) : "Enter" === e.key ? t._handleEnterKey() : "Escape" === e.key ? t._closeDropdown() : /^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(e.key) && (s && clearTimeout(s), i += e.key.toLowerCase(), t._searchForCountry(i), s = setTimeout(function () {
                i = ""
              }, 1e3))
            }, document.addEventListener("keydown", this._handleKeydownOnDropdown)
          }
        }, {
          key: "_handleUpDownKey",
          value: function (t) {
            var e = "ArrowUp" === t || "Up" === t ? this.highlightedItem.previousElementSibling : this.highlightedItem.nextElementSibling;
            e && (e.classList.contains("iti__divider") && (e = "ArrowUp" === t || "Up" === t ? e.previousElementSibling : e.nextElementSibling), this._highlightListItem(e, !0))
          }
        }, {
          key: "_handleEnterKey",
          value: function () {
            this.highlightedItem && this._selectListItem(this.highlightedItem)
          }
        }, {
          key: "_searchForCountry",
          value: function (t) {
            for (var e = 0; e < this.countries.length; e++)
              if (this._startsWith(this.countries[e].name, t)) {
                var i = this.countryList.querySelector("#iti-".concat(this.id, "__item-").concat(this.countries[e].iso2));
                this._highlightListItem(i, !1), this._scrollTo(i, !0);
                break
              }
          }
        }, {
          key: "_startsWith",
          value: function (t, e) {
            return t.substr(0, e.length).toLowerCase() === e
          }
        }, {
          key: "_updateValFromNumber",
          value: function (t) {
            var e = t;
            if (this.options.formatOnDisplay && window.intlTelInputUtils && this.selectedCountryData) {
              var i = !this.options.separateDialCode && (this.options.nationalMode || "+" !== e.charAt(0)),
                s = intlTelInputUtils.numberFormat,
                o = s.NATIONAL,
                n = s.INTERNATIONAL,
                a = i ? o : n;
              e = intlTelInputUtils.formatNumber(e, this.selectedCountryData.iso2, a)
            }
            e = this._beforeSetNumber(e), this.telInput.value = e
          }
        }, {
          key: "_updateFlagFromNumber",
          value: function (t) {
            var e = t,
              i = this.selectedCountryData.dialCode,
              s = "1" === i;
            e && this.options.nationalMode && s && "+" !== e.charAt(0) && ("1" !== e.charAt(0) && (e = "1".concat(e)), e = "+".concat(e)), this.options.separateDialCode && i && "+" !== e.charAt(0) && (e = "+".concat(i).concat(e));
            var o = this._getDialCode(e),
              n = this._getNumeric(e),
              a = null;
            if (o) {
              var r = this.countryCodes[this._getNumeric(o)],
                l = -1 !== r.indexOf(this.selectedCountryData.iso2) && n.length <= o.length - 1;
              if (!("1" === i && this._isRegionlessNanp(n)) && !l)
                for (var d = 0; d < r.length; d++)
                  if (r[d]) {
                    a = r[d];
                    break
                  }
            } else "+" === e.charAt(0) && n.length ? a = "" : e && "+" !== e || (a = this.defaultCountry);
            return null !== a && this._setFlag(a)
          }
        }, {
          key: "_isRegionlessNanp",
          value: function (t) {
            var e = this._getNumeric(t);
            if ("1" === e.charAt(0)) {
              var i = e.substr(1, 3);
              return -1 !== l.indexOf(i)
            }
            return !1
          }
        }, {
          key: "_highlightListItem",
          value: function (t, e) {
            var i = this.highlightedItem;
            i && i.classList.remove("iti__highlight"), this.highlightedItem = t, this.highlightedItem.classList.add("iti__highlight"), e && this.highlightedItem.focus()
          }
        }, {
          key: "_getCountryData",
          value: function (t, i, s) {
            for (var o = i ? e : this.countries, n = 0; n < o.length; n++)
              if (o[n].iso2 === t) return o[n];
            if (s) return null;
            throw new Error("No country data for '".concat(t, "'"))
          }
        }, {
          key: "_setFlag",
          value: function (t) {
            var e = this.selectedCountryData.iso2 ? this.selectedCountryData : {};
            this.selectedCountryData = t ? this._getCountryData(t, !1, !1) : {}, this.selectedCountryData.iso2 && (this.defaultCountry = this.selectedCountryData.iso2), this.selectedFlagInner.setAttribute("class", "iti__flag iti__".concat(t));
            var i = t ? "".concat(this.selectedCountryData.name, ": +").concat(this.selectedCountryData.dialCode) : "Unknown";
            if (this.selectedFlag.setAttribute("title", i), this.options.separateDialCode) {
              var s = this.selectedCountryData.dialCode ? "+".concat(this.selectedCountryData.dialCode) : "";
              this.selectedDialCode.innerHTML = s;
              var o = this.selectedFlag.offsetWidth || this._getHiddenSelectedFlagWidth();
              this.telInput.style.paddingLeft = "".concat(o + 6, "px")
            }
            if (this._updatePlaceholder(), this.options.allowDropdown) {
              var n = this.activeItem;
              if (n && (n.classList.remove("iti__active"), n.setAttribute("aria-selected", "false")), t) {
                var a = this.countryList.querySelector("#iti-".concat(this.id, "__item-").concat(t, "-preferred")) || this.countryList.querySelector("#iti-".concat(this.id, "__item-").concat(t));
                a.setAttribute("aria-selected", "true"), a.classList.add("iti__active"), this.activeItem = a, this.selectedFlag.setAttribute("aria-activedescendant", a.getAttribute("id"))
              }
            }
            return e.iso2 !== t
          }
        }, {
          key: "_getHiddenSelectedFlagWidth",
          value: function () {
            var t = this.telInput.parentNode.cloneNode();
            t.style.visibility = "hidden", document.body.appendChild(t);
            var e = this.selectedFlag.cloneNode(!0);
            t.appendChild(e);
            var i = e.offsetWidth;
            return t.parentNode.removeChild(t), i
          }
        }, {
          key: "_updatePlaceholder",
          value: function () {
            var t = "aggressive" === this.options.autoPlaceholder || !this.hadInitialPlaceholder && "polite" === this.options.autoPlaceholder;
            if (window.intlTelInputUtils && t) {
              var e = intlTelInputUtils.numberType[this.options.placeholderNumberType],
                i = this.selectedCountryData.iso2 ? intlTelInputUtils.getExampleNumber(this.selectedCountryData.iso2, this.options.nationalMode, e) : "";
              i = this._beforeSetNumber(i), "function" == typeof this.options.customPlaceholder && (i = this.options.customPlaceholder(i, this.selectedCountryData)), this.telInput.setAttribute("placeholder", i)
            }
          }
        }, {
          key: "_selectListItem",
          value: function (t) {
            var e = this._setFlag(t.getAttribute("data-country-code"));
            this._closeDropdown(), this._updateDialCode(t.getAttribute("data-dial-code"), !0), this.telInput.focus();
            var i = this.telInput.value.length;
            this.telInput.setSelectionRange(i, i), e && this._triggerCountryChange()
          }
        }, {
          key: "_closeDropdown",
          value: function () {
            this.countryList.classList.add("iti__hide"), this.selectedFlag.setAttribute("aria-expanded", "false"), this.dropdownArrow.classList.remove("iti__arrow--up"), document.removeEventListener("keydown", this._handleKeydownOnDropdown), document.documentElement.removeEventListener("click", this._handleClickOffToClose), this.countryList.removeEventListener("mouseover", this._handleMouseoverCountryList), this.countryList.removeEventListener("click", this._handleClickCountryList), this.options.dropdownContainer && (this.isMobile || window.removeEventListener("scroll", this._handleWindowScroll), this.dropdown.parentNode && this.dropdown.parentNode.removeChild(this.dropdown)), this._trigger("close:countrydropdown")
          }
        }, {
          key: "_scrollTo",
          value: function (t, e) {
            var i = this.countryList,
              s = window.pageYOffset || document.documentElement.scrollTop,
              o = i.offsetHeight,
              n = i.getBoundingClientRect().top + s,
              a = n + o,
              r = t.offsetHeight,
              l = t.getBoundingClientRect().top + s,
              d = l + r,
              c = l - n + i.scrollTop,
              h = o / 2 - r / 2;
            if (l < n) e && (c -= h), i.scrollTop = c;
            else if (d > a) {
              e && (c += h);
              var u = o - r;
              i.scrollTop = c - u
            }
          }
        }, {
          key: "_updateDialCode",
          value: function (t, e) {
            var i, s = this.telInput.value,
              o = "+".concat(t);
            if ("+" === s.charAt(0)) {
              var n = this._getDialCode(s);
              i = n ? s.replace(n, o) : o
            } else {
              if (this.options.nationalMode || this.options.separateDialCode) return;
              if (s) i = o + s;
              else {
                if (!e && this.options.autoHideDialCode) return;
                i = o
              }
            }
            this.telInput.value = i
          }
        }, {
          key: "_getDialCode",
          value: function (t) {
            var e = "";
            if ("+" === t.charAt(0))
              for (var i = "", s = 0; s < t.length; s++) {
                var o = t.charAt(s);
                if (!isNaN(parseInt(o, 10)) && (i += o, this.countryCodes[i] && (e = t.substr(0, s + 1)), i.length === this.dialCodeMaxLen)) break
              }
            return e
          }
        }, {
          key: "_getFullNumber",
          value: function () {
            var t = this.telInput.value.trim(),
              e = this.selectedCountryData.dialCode,
              i = this._getNumeric(t);
            return (this.options.separateDialCode && "+" !== t.charAt(0) && e && i ? "+".concat(e) : "") + t
          }
        }, {
          key: "_beforeSetNumber",
          value: function (t) {
            var e = t;
            if (this.options.separateDialCode) {
              var i = this._getDialCode(e);
              if (i) {
                var s = " " === e[(i = "+".concat(this.selectedCountryData.dialCode)).length] || "-" === e[i.length] ? i.length + 1 : i.length;
                e = e.substr(s)
              }
            }
            return this._cap(e)
          }
        }, {
          key: "_triggerCountryChange",
          value: function () {
            this._trigger("countrychange")
          }
        }, {
          key: "handleAutoCountry",
          value: function () {
            "auto" === this.options.initialCountry && (this.defaultCountry = window.intlTelInputGlobals.autoCountry, this.telInput.value || this.setCountry(this.defaultCountry), this.resolveAutoCountryPromise())
          }
        }, {
          key: "handleUtils",
          value: function () {
            window.intlTelInputUtils && (this.telInput.value && this._updateValFromNumber(this.telInput.value), this._updatePlaceholder()), this.resolveUtilsScriptPromise()
          }
        }, {
          key: "destroy",
          value: function () {
            var t = this.telInput.form;
            if (this.options.allowDropdown) {
              this._closeDropdown(), this.selectedFlag.removeEventListener("click", this._handleClickSelectedFlag), this.flagsContainer.removeEventListener("keydown", this._handleFlagsContainerKeydown);
              var e = this._getClosestLabel();
              e && e.removeEventListener("click", this._handleLabelClick)
            }
            this.hiddenInput && t && t.removeEventListener("submit", this._handleHiddenInputSubmit), this.options.autoHideDialCode && (t && t.removeEventListener("submit", this._handleSubmitOrBlurEvent), this.telInput.removeEventListener("blur", this._handleSubmitOrBlurEvent)), this.telInput.removeEventListener("keyup", this._handleKeyupEvent), this.telInput.removeEventListener("cut", this._handleClipboardEvent), this.telInput.removeEventListener("paste", this._handleClipboardEvent), this.telInput.removeAttribute("data-intl-tel-input-id");
            var i = this.telInput.parentNode;
            i.parentNode.insertBefore(this.telInput, i), i.parentNode.removeChild(i), delete window.intlTelInputGlobals.instances[this.id]
          }
        }, {
          key: "getExtension",
          value: function () {
            return window.intlTelInputUtils ? intlTelInputUtils.getExtension(this._getFullNumber(), this.selectedCountryData.iso2) : ""
          }
        }, {
          key: "getNumber",
          value: function (t) {
            if (window.intlTelInputUtils) {
              var e = this.selectedCountryData.iso2;
              return intlTelInputUtils.formatNumber(this._getFullNumber(), e, t)
            }
            return ""
          }
        }, {
          key: "getNumberType",
          value: function () {
            return window.intlTelInputUtils ? intlTelInputUtils.getNumberType(this._getFullNumber(), this.selectedCountryData.iso2) : -99
          }
        }, {
          key: "getSelectedCountryData",
          value: function () {
            return this.selectedCountryData
          }
        }, {
          key: "getValidationError",
          value: function () {
            if (window.intlTelInputUtils) {
              var t = this.selectedCountryData.iso2;
              return intlTelInputUtils.getValidationError(this._getFullNumber(), t)
            }
            return -99
          }
        }, {
          key: "isValidNumber",
          value: function () {
            var t = this._getFullNumber().trim(),
              e = this.options.nationalMode ? this.selectedCountryData.iso2 : "";
            return window.intlTelInputUtils ? intlTelInputUtils.isValidNumber(t, e) : null
          }
        }, {
          key: "setCountry",
          value: function (t) {
            var e = t.toLowerCase();
            this.selectedFlagInner.classList.contains("iti__".concat(e)) || (this._setFlag(e), this._updateDialCode(this.selectedCountryData.dialCode, !1), this._triggerCountryChange())
          }
        }, {
          key: "setNumber",
          value: function (t) {
            var e = this._updateFlagFromNumber(t);
            this._updateValFromNumber(t), e && this._triggerCountryChange()
          }
        }, {
          key: "setPlaceholderNumberType",
          value: function (t) {
            this.options.placeholderNumberType = t, this._updatePlaceholder()
          }
        }]) && o(s.prototype, n), h && o(s, h), i
      }();
    n.getCountryData = function () {
      return e
    };
    var u = function (t, e, i) {
      var s = document.createElement("script");
      s.onload = function () {
        c("handleUtils"), e && e()
      }, s.onerror = function () {
        c("rejectUtilsScriptPromise"), i && i()
      }, s.className = "iti-load-utils", s.async = !0, s.src = t, document.body.appendChild(s)
    };
    return n.loadUtils = function (t) {
        if (!window.intlTelInputUtils && !window.intlTelInputGlobals.startedLoadingUtilsScript) {
          if (window.intlTelInputGlobals.startedLoadingUtilsScript = !0, "undefined" != typeof Promise) return new Promise(function (e, i) {
            return u(t, e, i)
          });
          u(t)
        }
        return null
      }, n.defaults = r, n.version = "17.0.0",
      function (t, e) {
        var i = new h(t, e);
        return i._init(), t.setAttribute("data-intl-tel-input-id", i.id), window.intlTelInputGlobals.instances[i.id] = i, i
      }
  }()
}),
function (t, e, i, s) {
  "use strict";

  function o(t, e) {
    if (this.element = t, this.settings = a, this._defaults = a, this._name = n, e !== s && null !== e) {
      for (var i in a)
        if ("object" != typeof a[i]) e[i] !== s && (this.settings[i] = e[i]);
        else if (a[i] !== s)
        for (var o in a[i]) e[i] !== s && e[i][o] !== s && (this.settings[i][o] = e[i][o]);
      for (var i in e)
        if ("object" == typeof e[i])
          for (var o in e[i]) this.settings[i][o] === s && (this.settings[i][o] = e[i][o])
    }
    this.init()
  }
  var n = "pin",
    a = {
      messages: {
        valid: "Valid!",
        required: "This field cannot be empty",
        numeric: "This field requires a numeric value, no letters or special characters",
        sequential: "This field cannot be sequential, e.g. 1234",
        repeat: "This field cannot contain the same values only, e.g. 1111"
      },
      count: 4,
      displayMessage: {},
      isPassword: !1,
      showvValidErrorMessage: !0,
      allowSequential: !0,
      allowRepeat: !0
    };
  t.extend(o.prototype, {
    init: function (e) {
      e = e || !1;
      var i = this;
      if (0 === t(i.element).children().length && i.settings !== s && null !== i.settings)
        for (var o = 0; o < i.settings.count; o++) i.settings.isPassword && i.settings.showvValidErrorMessage ? t(i.element).append('<input value="0" type="password" name="pin_' + o + '" data-vvalid="numeric|min:1|max:1" maxlength="1" />') : i.settings.isPassword ? t(i.element).append('<input value="0" type="password" name="pin_' + o + '" data-vvalid="numeric|min:1|max:1" data-vvalid-error-text="false" maxlength="1" />') : i.settings.showvValidErrorMessage ? t(i.element).append('<input value="0" type="text" name="pin_' + o + '" data-vvalid="numeric|min:1|max:1" maxlength="1" />') : t(i.element).append('<input type="text" value="0" name="pin_' + o + '" data-vvalid="numeric|min:1|max:1" data-vvalid-error-text="false" maxlength="1" />');
      return i.isNotAForm(i.element, e)
    },
    isNotAForm: function (e, i) {
      var s = this,
        o = [];
      if (t.each(t(e).children(), function () {
          o.push(this), s.focus(this)
        }), i) {
        var n = s.validate(o);
        return t.each(o, function () {
          n.valid ? t(this).removeClass("error") : t(this).addClass("error")
        }), t(s.settings.displayMessage).html(n.message), n.valid
      }
    },
    focus: function (e) {
      t(e).on("click", function () {
        t(e).val("")
      }), t(e).on("keypress", function () {
        setTimeout(function () {
          t(e).next().focus().val("")
        }, 10)
      })
    },
    validate: function (e) {
      var i = this,
        s = 0,
        o = [];
      if (t.each(e, function () {
          o.push(parseInt(t(this).val())), "" === t(this).val() && s++
        }), s === o.length) return {
        valid: !1,
        message: i.settings.messages.required
      };
      for (var n = 0; n < o.length; n++)
        if (isNaN(parseInt(o[n]))) return {
          valid: !1,
          message: i.settings.messages.numeric
        };
      return i.settings.allowSequential || i.sequential(o) ? i.settings.allowRepeat || i.repeat(o) ? {
        valid: !0,
        message: i.settings.messages.valid
      } : {
        valid: !1,
        message: i.settings.messages.repeat
      } : {
        valid: !1,
        message: i.settings.messages.sequential
      }
    },
    sequential: function (t) {
      for (var e = [], i = 0; i < t.length; i++) e.push(t[0] + i);
      return JSON.stringify(t) !== JSON.stringify(e)
    },
    repeat: function (e) {
      for (var i = [], s = 0; s < e.length; s++) s > 0 && (e[0] === e[s] ? i.push(!0) : i.push(!1));
      return -1 !== t.inArray(!1, i)
    }
  }), t.fn[n] = function (e) {
    return this.each(function () {
      t.data(this, "plugin_" + n) || t.data(this, "plugin_" + n, new o(this, e))
    })
  }, t.extend(t.pin, {
    destroy: function () {
      delete this.validate
    }
  })
}(jQuery, window, document),
function (t) {
  t.fn.niceSelect = function (e) {
    function i(e) {
      e.after(t("<div></div>").addClass("nice-select").addClass(e.attr("class") || "").addClass(e.attr("disabled") ? "disabled" : "").attr("tabindex", e.attr("disabled") ? null : "0").html('<span class="current"></span><ul class="list"></ul>'));
      var i = e.next(),
        s = e.find("option"),
        o = e.find("option:selected");
      i.find(".current").html(o.data("display") || o.text()), s.each(function (e) {
        var s = t(this),
          o = s.data("display");
        i.find("ul").append(t("<li></li>").attr("data-value", s.val()).attr("data-display", o || null).addClass("option" + (s.is(":selected") ? " selected" : "") + (s.is(":disabled") ? " disabled" : "")).html(s.text()))
      })
    }
    if ("string" == typeof e) return "update" == e ? this.each(function () {
      var e = t(this),
        s = t(this).next(".nice-select"),
        o = s.hasClass("open");
      s.length && (s.remove(), i(e), o && e.next().trigger("click"))
    }) : "destroy" == e ? (this.each(function () {
      var e = t(this),
        i = t(this).next(".nice-select");
      i.length && (i.remove(), e.css("display", ""))
    }), 0 == t(".nice-select").length && t(document).off(".nice_select")) : console.log('Method "' + e + '" does not exist.'), this;
    this.hide(), this.each(function () {
      var e = t(this);
      e.next().hasClass("nice-select") || i(e)
    }), t(document).off(".nice_select"), t(document).on("click.nice_select", ".nice-select", function (e) {
      var i = t(this);
      t(".nice-select").not(i).removeClass("open"), i.toggleClass("open"), i.hasClass("open") ? (i.find(".option"), i.find(".focus").removeClass("focus"), i.find(".selected").addClass("focus")) : i.focus()
    }), t(document).on("click.nice_select", function (e) {
      0 === t(e.target).closest(".nice-select").length && t(".nice-select").removeClass("open").find(".option")
    }), t(document).on("click.nice_select", ".nice-select .option:not(.disabled)", function (e) {
      var i = t(this),
        s = i.closest(".nice-select");
      s.find(".selected").removeClass("selected"), i.addClass("selected");
      var o = i.data("display") || i.text();
      s.find(".current").text(o), s.prev("select").val(i.data("value")).trigger("change")
    }), t(document).on("keydown.nice_select", ".nice-select", function (e) {
      var i = t(this),
        s = t(i.find(".focus") || i.find(".list .option.selected"));
      if (32 == e.keyCode || 13 == e.keyCode) return i.hasClass("open") ? s.trigger("click") : i.trigger("click"), !1;
      if (40 == e.keyCode) {
        if (i.hasClass("open")) {
          var o = s.nextAll(".option:not(.disabled)").first();
          o.length > 0 && (i.find(".focus").removeClass("focus"), o.addClass("focus"))
        } else i.trigger("click");
        return !1
      }
      if (38 == e.keyCode) {
        if (i.hasClass("open")) {
          var n = s.prevAll(".option:not(.disabled)").first();
          n.length > 0 && (i.find(".focus").removeClass("focus"), n.addClass("focus"))
        } else i.trigger("click");
        return !1
      }
      if (27 == e.keyCode) i.hasClass("open") && i.trigger("click");
      else if (9 == e.keyCode && i.hasClass("open")) return !1
    });
    var s = document.createElement("a").style;
    return s.cssText = "pointer-events:auto", "auto" !== s.pointerEvents && t("html").addClass("no-csspointerevents"), this
  }
}(jQuery),
function (t, e) {
  "function" == typeof define && define.amd ? define("mdtoast", [], e(t)) : "object" == typeof exports ? module.exports = e(t) : t.mdtoast = e(t)
}("undefined" != typeof global ? global : this.window || this.global, function (t) {
  "use strict";

  function e(t, e, i, s) {
    e.appendChild(t.docFrag), setTimeout(function () {
      t.toast.classList.remove("mdt--load"), setTimeout(function () {
        i && i.shown && i.shown.apply(t), s && "function" == typeof s && s.apply(t)
      }, t.animateTime), t.options.interaction ? t.options.interactionTimeout && (t.timeout = setTimeout(function () {
        t.hide()
      }, t.options.interactionTimeout)) : t.options.duration && (t.timeout = setTimeout(function () {
        t.hide()
      }, t.options.duration)), e.classList.add(o), t.options.modal && e.classList.add(n)
    }, 15)
  }
  var i = !!document.querySelector && !!t.addEventListener,
    s = {
      init: !1,
      duration: 5e3,
      type: "default",
      modal: !1,
      interaction: !1,
      interactionTimeout: null,
      actionText: "OK",
      action: function () {
        this.hide()
      },
      callbacks: {}
    },
    o = "mdtoast--open",
    n = "mdtoast--modal",
    a = function () {
      if (!(this instanceof a)) return a.apply(Object.create(a.prototype), arguments);
      var t = this,
        e = arguments;
      return t.animateTime = 230, t.message = e[0], t.options = function () {
        var t = {},
          e = !1,
          i = 0,
          s = arguments.length;
        "[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (e = arguments[0], i++);
        for (var o = function (i) {
            for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && (e && "[object Object]" === Object.prototype.toString.call(i[s]) ? t[s] = extend(!0, t[s], i[s]) : t[s] = i[s])
          }; s > i; i++) o(arguments[i]);
        return t
      }(s, e[1]), t.timeout = null, t.options.init || r.apply(t), t
    },
    r = function () {
      if (i) {
        var t, e, s = this,
          o = s.options,
          n = (o.callbacks, function (t, e, i, s) {
            var o = document.createElement(t);
            return o.className = e, void 0 !== i && (o[s ? "innerHTML" : "innerText"] = i), o
          }),
          a = function (t) {
            t.target.matches(".mdt-action") && ("click" === t.type || "keypress" === t.type && 13 === t.keyCode) && o.action && o.action.apply(s, [t])
          };
        s.docFrag = document.createDocumentFragment(), s.toast = n("div", "mdtoast mdt--load"), s.toast.tabIndex = 0, s.docFrag.appendChild(s.toast), "default" !== o.type && s.toast.classList.add("mdt--" + o.type), t = n("div", "mdt-message", s.message, !0), s.toast.appendChild(t), e = n("span", "mdt-action"), o.interaction && (e.innerText = o.actionText, e.tabIndex = 0, s.toast.classList.add("mdt--interactive"), s.toast.appendChild(e)), s.toast.addEventListener("click", a, !1), s.toast.addEventListener("keypress", a, !1), s.toast.mdtoast = s, s.options.init || s.show()
      }
    };
  return Object.defineProperties(a, {
    INFO: {
      value: "info"
    },
    ERROR: {
      value: "error"
    },
    WARNING: {
      value: "warning"
    },
    SUCCESS: {
      value: "success"
    }
  }), a.prototype.show = function (t) {
    var i = this,
      s = i.options.callbacks,
      o = document.getElementsByClassName("mdtoast"),
      n = document.body;
    if (!n.contains(i.toast))
      if (i.options.init && r.apply(this), o.length > 0)
        for (var a = o.length - 1; a >= 0; a--) o[a].mdtoast.hide(function () {
          0 > a && e(i, n, s, t)
        });
      else e(i, n, s, t)
  }, a.prototype.hide = function (t) {
    var e = this,
      i = e.options.callbacks,
      s = document.body;
    clearTimeout(e.timeout), e.toast.classList.add("mdt--load"), s.classList.remove(o), s.classList.remove(n), setTimeout(function () {
      s.removeChild(e.toast), i && i.hidden && i.hidden.apply(e), t && "function" == typeof t && t.apply(e)
    }, e.animateTime)
  }, a
});
var Uname = document.getElementById("name"),
  nextBtn1 = document.getElementById("inputNext");

function CheckName() {

   if(Uname.value.length < 2 ){
    $('#inputNext').css('background', '#C4C4C4');
    nextBtn1.classList.add("dissable");
  } else {
    $('#inputNext').css('background', '#FF9C40');
    nextBtn1.classList.remove("dissable");

  }


};
var PhoneInput = document.getElementById("phone"),
  nextBtn2 = document.getElementById("inputNext2"),
  regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  phoneError = document.getElementById("NumberError");

function CheckPhoe() {
  PhoneInput.value.length < 5 ? nextBtn2.classList.remove("show") : nextBtn2.classList.add("show"), PhoneInput.value.match(regPhone) ? (phoneError.innerHTML = "", nextBtn2.classList.remove("dissable")) : (phoneError.innerHTML = "Please enter 10 digit mobile no. number only", nextBtn2.classList.add("dissable"))
}
var Uemail = document.getElementById("email"),
  emailMessage = document.getElementById("emailMessage"),
  emailNext = document.getElementById("inputNext3"),
  mailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  mailformate2 = "abcd@gmail.com";

function checkEmail() {
  Uemail.value.length < 1 ? emailNext.classList.remove("show") : emailNext.classList.add("show");
  if (Uemail.value.match(mailformat)) {
    $('#inputNext3').css('background', '#FF9C40');
    emailMessage.innerHTML = "";
    emailNext.classList.remove("dissable");
  } else {
    $('#inputNext3').css('background', '#C4C4C4');
    emailMessage.innerHTML = "Error. Enter valid email.";
    emailNext.classList.add("dissable");
  }
};

function CheckNameGo() {
  if ($('#inputNext').hasClass("dissable")) {} else if ($('#inputNext').hasClass("show")) {
    $("#inputNext").click();
  }

  // nextBtn1.classList.add("show"), nextBtn1.click()
};

function CheckPhoeGo() {
  if ($('#inputNext2').hasClass("dissable")) {} else if ($('#inputNext2').hasClass("show")) {
    $("#inputNext2").click();
  }
};

function checkEmailGo() {
  Uemail.value.length < 1 ? emailNext.classList.remove("show") : emailNext.classList.add("show"), Uemail.value.match(mailformat) ? (emailMessage.innerHTML = "", emailNext.classList.remove("dissable"), emailNext.click()) : (emailMessage.innerHTML = "Error. Enter valid email.", emailNext.classList.add("dissable"))
}
Uname.addEventListener("keyup", function (t) {
  13 === t.keyCode && CheckNameGo()
}), PhoneInput.addEventListener("keyup", function (t) {
  13 === t.keyCode && CheckPhoeGo()
}), Uemail.addEventListener("keyup", function (t) {
  13 === t.keyCode && checkEmailGo()
});


