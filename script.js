/* ============================================================
   YAAC — Comodidad Deportiva · script.js
   Vanilla JS. Sin dependencias.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- THEME TOGGLE ---------- */
  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") || "dark";
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("yaac-theme", next); } catch (e) {}
    });
  }

  /* ---------- MOBILE NAV (+ body scroll lock) ---------- */
  var burger = document.getElementById("navBurger");
  var mobile = document.getElementById("navMobile");
  var setMenu = function (open) {
    if (!burger || !mobile) return;
    burger.classList.toggle("is-open", open);
    mobile.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("is-locked", open);
  };
  if (burger && mobile) {
    burger.addEventListener("click", function () {
      setMenu(!burger.classList.contains("is-open"));
    });
    mobile.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && burger.classList.contains("is-open")) setMenu(false);
    });
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  var revealTargets = [
    ".section__head",
    ".product",
    ".feature",
    ".step",
    ".look",
    ".review",
    ".ig-card",
    ".faq details",
    ".about-copy",
    ".about-visual",
    ".ship-copy",
    ".ship-map",
    ".contact-card",
    ".stat"
  ];
  var nodes = document.querySelectorAll(revealTargets.join(","));
  nodes.forEach(function (n, i) {
    n.setAttribute("data-reveal", "");
    n.style.transitionDelay = (Math.min(i, 8) * 70) + "ms";
  });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    nodes.forEach(function (n) { io.observe(n); });
  } else {
    nodes.forEach(function (n) { n.classList.add("is-visible"); });
  }

  /* ---------- FOOTER YEAR ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- STATS COUNT-UP ---------- */
  var counters = document.querySelectorAll(".stat strong[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var animate = function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10);
      var prefix = el.getAttribute("data-prefix") || "";
      var suffix = el.getAttribute("data-suffix") || "";
      var dur = 1400, start = performance.now();
      var step = function (now) {
        var p = Math.min(1, (now - start) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    var statObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          animate(e.target);
          statObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { statObs.observe(c); });
  }

  /* ---------- BACK TO TOP ---------- */
  var top = document.getElementById("toTop");
  if (top) {
    var onScroll = function () {
      if (window.scrollY > 600) top.classList.add("is-show");
      else top.classList.remove("is-show");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    top.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- ANN-BAR: pause on hover ---------- */
  var ann = document.querySelector(".ann-bar__track");
  if (ann) {
    ann.addEventListener("mouseenter", function () {
      ann.style.animationPlayState = "paused";
    });
    ann.addEventListener("mouseleave", function () {
      ann.style.animationPlayState = "running";
    });
  }

  /* ---------- SMOOTH SCROLL + A11Y FOCUS MGMT ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      var navH = document.getElementById("nav") ? document.getElementById("nav").offsetHeight : 0;
      var dest = t.getBoundingClientRect().top + window.pageYOffset - navH - 12;
      window.scrollTo({ top: Math.max(0, dest), behavior: "smooth" });
      // a11y: move focus to target for keyboard/screen-reader users
      if (t.tabIndex < 0) t.setAttribute("tabindex", "-1");
      setTimeout(function () { try { t.focus({ preventScroll: true }); } catch (_) {} }, 420);
    });
  });

  /* ---------- SCROLL-SPY: active nav link ---------- */
  var navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
  var spyTargets = [];
  navLinks.forEach(function (a) {
    var id = a.getAttribute("href");
    if (id && id.length > 1) {
      var el = document.querySelector(id);
      if (el) spyTargets.push({ a: a, el: el });
    }
  });
  if (spyTargets.length && "IntersectionObserver" in window) {
    var spyObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var match = spyTargets.find(function (t) { return t.el === e.target; });
        if (!match) return;
        if (e.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove("is-active"); });
          match.a.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    spyTargets.forEach(function (t) { spyObs.observe(t.el); });
  }

})();
