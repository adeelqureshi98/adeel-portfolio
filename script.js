/* Muhammad Adeel — Portfolio v3 "Ivory & Honey" interactions.
   Vanilla JS, no dependencies. Scroll-choreography reveal engine,
   floating cards, tilt, magnetic buttons, counters, modal player. */
(function(){
  "use strict";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ---------- Loader: buttery-smooth GPU-composited progress ----------
     The bar fills via transform:scaleX (compositor-only, zero layout work).
     Progress eases toward a creeping target — no random jumps, no stutter. */
  var loader = document.getElementById("loader"),
      lp = document.getElementById("loaderProgress"),
      prog = 0, pTarget = 0, loaderHidden = false, pEase = 0.055;
  function loaderFrame(){
    prog += (pTarget - prog) * pEase;
    if (pTarget >= 1 && prog > 0.996) prog = 1;
    if (lp) lp.style.transform = "scaleX(" + prog.toFixed(4) + ")";
    if (prog < 1 || !loaderHidden){
      requestAnimationFrame(loaderFrame);
    } else {
      if (loader) loader.classList.add("done");
      document.body.classList.add("hero-enter"); /* cinematic hero entrance */
    }
  }
  requestAnimationFrame(loaderFrame);
  var creepTimer = setInterval(function(){
    if (pTarget < 0.88) pTarget += 0.045; /* slow, perfectly smooth creep */
  }, 180);
  function hideLoader(){
    if (loaderHidden) return;
    loaderHidden = true;
    clearInterval(creepTimer);
    pTarget = 1; pEase = 0.16; /* brisk but smooth finish */
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

  /* ---------- Staggered idle float for cards ----------
     Each .float-i gets a negative delay + slight duration variance (per
     section) so cards drift out of sync like buoys, not robots.
     Amplitude comes from --famp in CSS. Compositor-only (transform). */
  document.querySelectorAll("section, footer, .hero-inner").forEach(function(scope){
    var cards = scope.querySelectorAll(".float-i");
    cards.forEach(function(card, i){
      card.style.setProperty("--fd", (-((i * 1.618) % 7.5)).toFixed(2) + "s");
      if (!card.classList.contains("float-soft")){
        card.style.setProperty("--fdur", (6.8 + (i % 4) * 0.7).toFixed(2) + "s");
      }
    });
  });

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
      glow.style.transform = "translate3d(" + gx.toFixed(1) + "px," + gy.toFixed(1) + "px,0) translate(-50%,-50%)";
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

/* ---------- v3.3: Scroll progress hairline ---------- */
(function(){
  var bar = document.getElementById("progress");
  if(!bar) return;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduceMotion) return;
  var ticking = false;
  function update(){
    ticking = false;
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var p = max > 0 ? (window.scrollY / max) : 0;
    bar.style.transform = "scaleX(" + Math.min(Math.max(p, 0), 1) + ")";
  }
  window.addEventListener("scroll", function(){
    if(!ticking){ ticking = true; requestAnimationFrame(update); }
  }, {passive:true});
  update();
})();

/* ---------- v3.6: Services Spotlight ----------
   One featured skill panel at a time (fixed height — always equal).
   Auto-advances every 6s with a cinematic crossfade; pause on hover/focus,
   arrows + dots + chips + keyboard; auto-resume after 7s; tab-hidden pauses.
   reduced-motion = all 6 as a clean equal grid (.spot-static). */
(function(){
  var stage = document.getElementById("spotStage");
  if(!stage) return;
  var panels = Array.prototype.slice.call(stage.querySelectorAll(".spot-panel"));
  var chips = Array.prototype.slice.call(stage.querySelectorAll(".spot-chip"));
  var dotsWrap = stage.querySelector(".spot-dots");
  var prevBtn = stage.querySelector(".spot-prev");
  var nextBtn = stage.querySelector(".spot-next");
  var n = panels.length;
  if(!n) return;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduceMotion){ stage.classList.add("spot-static"); return; }

  var dots = panels.map(function(_, i){
    var d = document.createElement("button");
    d.type = "button";
    d.setAttribute("aria-label", "Show service " + (i + 1) + " of " + n);
    d.addEventListener("click", function(){ goTo(i); });
    dotsWrap.appendChild(d);
    return d;
  });

  var cur = 0, timer = null, resumeTimer = null;
  var INTERVAL = 6000, RESUME = 7000;

  function stopAuto(){ if(timer){ clearInterval(timer); timer = null; } }
  function startAuto(){
    if(timer || document.hidden) return;
    timer = setInterval(function(){ goTo(cur + 1); }, INTERVAL);
  }
  function restartAuto(){
    stopAuto();
    if(resumeTimer) clearTimeout(resumeTimer);
    resumeTimer = setTimeout(startAuto, RESUME);
  }
  function goTo(i){
    i = ((i % n) + n) % n;
    if(i === cur){ restartAuto(); return; }
    panels[cur].classList.remove("is-active");
    panels[cur].setAttribute("aria-hidden", "true");
    chips[cur].classList.remove("is-active");
    chips[cur].setAttribute("aria-selected", "false");
    cur = i;
    panels[cur].classList.add("is-active");
    panels[cur].removeAttribute("aria-hidden");
    chips[cur].classList.add("is-active");
    chips[cur].setAttribute("aria-selected", "true");
    dots.forEach(function(d, j){ d.classList.toggle("active", j === cur); });
    restartAuto();
  }

  prevBtn.addEventListener("click", function(){ goTo(cur - 1); });
  nextBtn.addEventListener("click", function(){ goTo(cur + 1); });
  chips.forEach(function(c, i){
    c.setAttribute("aria-selected", i === 0 ? "true" : "false");
    c.addEventListener("click", function(){ goTo(i); });
  });
  stage.addEventListener("keydown", function(ev){
    if(ev.key === "ArrowRight"){ ev.preventDefault(); goTo(cur + 1); }
    else if(ev.key === "ArrowLeft"){ ev.preventDefault(); goTo(cur - 1); }
  });
  stage.addEventListener("pointerenter", function(){ stopAuto(); if(resumeTimer) clearTimeout(resumeTimer); });
  stage.addEventListener("pointerleave", restartAuto);
  stage.addEventListener("focusin", function(){ stopAuto(); if(resumeTimer) clearTimeout(resumeTimer); });
  stage.addEventListener("focusout", restartAuto);
  document.addEventListener("visibilitychange", function(){ document.hidden ? stopAuto() : startAuto(); });

  panels.forEach(function(p, i){ if(i !== 0) p.setAttribute("aria-hidden", "true"); });
  dots[0].classList.add("active");
  startAuto();
})();


/* ---------- v3.4: Cinematic scroll moments ---------- */
(function(){
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduceMotion) return;

  /* Moment 1 — pinned horizontal film-strip journey for Selected Work (desktop) */
  (function(){
    var sec = document.getElementById("work");
    var pin = document.getElementById("workPin");
    if(!sec || !pin) return;
    if(!window.matchMedia("(min-width: 1024px)").matches) return;
    sec.classList.add("cine-on");
    var view = pin.querySelector(".cine-viewport");
    var track = document.getElementById("workTrack");
    var prog = document.getElementById("workProg");
    var ticking = false;
    function update(){
      ticking = false;
      var top = pin.getBoundingClientRect().top;
      var total = pin.offsetHeight - window.innerHeight;
      var p = total > 0 ? Math.min(1, Math.max(0, -top / total)) : 0;
      var maxX = Math.max(0, track.scrollWidth - view.clientWidth);
      track.style.transform = "translate3d(" + (-p * maxX).toFixed(1) + "px,0,0)";
      if(prog) prog.style.width = (p * 100).toFixed(1) + "%";
    }
    function req(){ if(!ticking){ ticking = true; requestAnimationFrame(update); } }
    window.addEventListener("scroll", req, {passive: true});
    window.addEventListener("resize", req);
    if(document.fonts && document.fonts.ready){ document.fonts.ready.then(update); }
    window.addEventListener("load", update);
    update();
  })();

  /* Moment 2 — cinematic parallax depth on section titles (viewport-relative) */
  (function(){
    var titles = Array.prototype.slice.call(document.querySelectorAll(".section-title"));
    if(!titles.length) return;
    var ticking = false;
    function update(){
      ticking = false;
      var vh = window.innerHeight;
      titles.forEach(function(el){
        if(!el.classList.contains("in")) return;      /* let the reveal finish first */
        if(el.closest(".cine-on")) return;            /* pinned section stays put */
        el.style.transitionProperty = "opacity";      /* take transform off the reveal transition */
        var r = el.getBoundingClientRect();
        var d = (r.top + r.height / 2) - vh / 2;
        var shift = Math.max(-40, Math.min(40, d * -0.04));
        el.style.transform = "translate3d(0," + shift.toFixed(1) + "px,0)";
      });
    }
    function req(){ if(!ticking){ ticking = true; requestAnimationFrame(update); } }
    window.addEventListener("scroll", req, {passive: true});
    window.addEventListener("resize", req);
    update();
  })();
})();
