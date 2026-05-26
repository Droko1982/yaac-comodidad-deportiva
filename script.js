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

  /* ---------- MOBILE NAV ---------- */
  var burger = document.getElementById("navBurger");
  var mobile = document.getElementById("navMobile");
  if (burger && mobile) {
    burger.addEventListener("click", function () {
      var isOpen = burger.classList.toggle("is-open");
      mobile.classList.toggle("is-open", isOpen);
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    mobile.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        burger.classList.remove("is-open");
        mobile.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      });
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

  /* ---------- SMOOTH SCROLL OFFSET FIX FOR STICKY NAV ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      var navH = document.getElementById("nav") ? document.getElementById("nav").offsetHeight : 0;
      var top = t.getBoundingClientRect().top + window.pageYOffset - navH - 12;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });

})();
