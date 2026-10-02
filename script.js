/* Muhammad Adeel — Portfolio v3 "Ivory & Honey" interactions.
   Vanilla JS, no dependencies. Scroll-choreography reveal engine,
   floating cards, tilt, magnetic buttons, counters, modal player. */
(function(){
  "use strict";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ---------- Loader ---------- */
  var loader = document.getElementById("loader"),
      lp = document.getElementById("loaderProgress"),
      prog = 0;
  var ltick = setInterval(function(){
    prog = Math.min(prog + Math.random() * 26, 92);
    if (lp) lp.style.width = prog + "%";
  }, 160);
  function hideLoader(){
    clearInterval(ltick);
    if (lp) lp.style.width = "100%";
    setTimeout(function(){ if (loader) loader.classList.add("done"); }, 250);
  }
  window.addEventListener("load", hideLoader);
  setTimeout(hideLoader, 2600); /* safety */

  /* ---------- Scroll choreography: step-by-step reveals ----------
     Every .rv gets a delay based on its order among siblings inside
     its section, so cards enter ONE AFTER ANOTHER like a guided tour.
     FAQ + Client cards get a longer step for extra ceremony. */
  var rvEls = Array.prototype.slice.call(document.querySelectorAll(".rv"));
  var groups = {};
  rvEls.forEach(function(el){
    var sec = el.closest("section, footer, .hero-inner") || document.body;
    var key = sec.tagName + "-" + Array.prototype.indexOf.call(document.querySelectorAll("section, footer, .hero-inner"), sec);
    (groups[key] = groups[key] || []).push(el);
  });
  Object.keys(groups).forEach(function(key){
    var items = groups[key];
    var slow = items.some(function(el){
      return el.querySelector(".faq-item") || el.querySelector(".client-card");
    });
    var step = slow ? 150 : 105; /* ms between cards */
    items.forEach(function(el, i){
      /* headers pop first, cards follow one-by-one */
      var isHeader = el.classList.contains("kicker") || el.classList.contains("section-title") || el.classList.contains("section-sub");
      el.style.transitionDelay = (isHeader ? 0 : Math.min(i * step, 1400)) + "ms";
    });
  });
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, {threshold: 0.12, rootMargin: "0px 0px -6% 0px"});
  rvEls.forEach(function(el){ io.observe(el); });

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll(".stat-num[data-count]");
  var cio = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (!e.isIntersecting) return;
      var el = e.target, target = parseInt(el.getAttribute("data-count"), 10) || 0,
          suffix = el.getAttribute("data-suffix") || "", t0 = null;
      cio.unobserve(el);
      if (reduceMotion){ el.textContent = target + suffix; return; }
      function frame(t){
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / 1400, 1),
            ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * ease) + suffix;
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    });
  }, {threshold: 0.5});
  counters.forEach(function(c){ cio.observe(c); });

  /* ---------- Nav ---------- */
  var nav = document.getElementById("nav"),
      menuBtn = document.getElementById("menuBtn"),
      navLinks = document.getElementById("navLinks");
  function onScrollNav(){ nav.classList.toggle("scrolled", window.scrollY > 30); }
  window.addEventListener("scroll", onScrollNav, {passive: true});
  onScrollNav();
  if (menuBtn) menuBtn.addEventListener("click", function(){
    var open = navLinks.classList.toggle("open");
    menuBtn.classList.toggle("open", open);
  });
  navLinks.querySelectorAll("a").forEach(function(a){
    a.addEventListener("click", function(){
      navLinks.classList.remove("open"); menuBtn.classList.remove("open");
    });
  });

  /* ---------- Parallax: hero blobs + continuous backdrop drift ---------- */
  var plx = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]")),
      bgStage = document.querySelector(".bg-stage"),
      ticking = false;
  function parallax(){
    ticking = false;
    if (reduceMotion) return;
    var y = window.scrollY;
    plx.forEach(function(el){
      var f = parseFloat(el.getAttribute("data-parallax")) || 0.1;
      el.style.transform = "translate3d(0," + (y * f) + "px,0)";
    });
    if (bgStage) bgStage.style.transform = "translate3d(0," + (y * 0.05) + "px,0)";
  }
  window.addEventListener("scroll", function(){
    if (!ticking){ ticking = true; requestAnimationFrame(parallax); }
  }, {passive: true});

  /* ---------- 3D tilt on floating cards ---------- */
  if (finePointer && !reduceMotion){
    document.querySelectorAll(".tilt").forEach(function(card){
      var raf = null;
      card.addEventListener("pointermove", function(ev){
        var r = card.getBoundingClientRect(),
            px = (ev.clientX - r.left) / r.width - 0.5,
            py = (ev.clientY - r.top) / r.height - 0.5;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function(){
          card.style.animationPlayState = "paused"; /* pause idle float while tilting */
          card.style.transform = "perspective(900px) rotateY(" + (px * 9) + "deg) rotateX(" + (-py * 9) + "deg) translateY(-6px)";
        });
      });
      card.addEventListener("pointerleave", function(){
        if (raf) cancelAnimationFrame(raf);
        card.style.transform = "";
        card.style.animationPlayState = "";
      });
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (finePointer && !reduceMotion){
    document.querySelectorAll(".magnetic").forEach(function(btn){
      btn.addEventListener("pointermove", function(ev){
        var r = btn.getBoundingClientRect(),
            dx = ev.clientX - (r.left + r.width / 2),
            dy = ev.clientY - (r.top + r.height / 2);
        btn.style.transform = "translate(" + (dx * 0.14) + "px," + (dy * 0.14) + "px)";
      });
      btn.addEventListener("pointerleave", function(){ btn.style.transform = ""; });
    });
  }

  /* ---------- Cursor glow ---------- */
  var glow = document.getElementById("cursorGlow");
  if (glow && finePointer && !reduceMotion){
    var gx = -400, gy = -400, tx = gx, ty = gy, shown = false;
    document.addEventListener("pointermove", function(ev){
      tx = ev.clientX; ty = ev.clientY;
      if (!shown){ glow.style.opacity = "1"; shown = true; }
    });
    (function loop(){
      gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12;
      glow.style.left = gx + "px"; glow.style.top = gy + "px";
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- Video modal ---------- */
  var modal = document.getElementById("modal"),
      mVideo = document.getElementById("modalVideo"),
      mTitle = document.getElementById("modalTitle");
  function openModal(src, title){
    mVideo.src = src; mTitle.textContent = title || "";
    modal.classList.add("open"); modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    mVideo.play().catch(function(){});
  }
  function closeModal(){
    modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true");
    mVideo.pause(); mVideo.removeAttribute("src"); mVideo.load();
    document.body.style.overflow = "";
  }
  document.querySelectorAll("[data-play]").forEach(function(card){
    card.addEventListener("click", function(){
      openModal(card.getAttribute("data-play"), card.getAttribute("data-title"));
    });
  });
  modal.querySelectorAll("[data-close]").forEach(function(b){
    b.addEventListener("click", closeModal);
  });
  document.addEventListener("keydown", function(ev){
    if (ev.key === "Escape" && modal.classList.contains("open")) closeModal();
  });
})();

/* Full-page cinematic background video: pause when tab hidden (battery), resume on return */
(function(){
  var bg = document.querySelector(".bg-video");
  if(!bg) return;
  document.addEventListener("visibilitychange", function(){
    if(document.hidden){ bg.pause(); }
    else { bg.play().catch(function(){}); }
  });
})();
