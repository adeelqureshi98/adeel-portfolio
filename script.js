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

/* ---------- v3.3: Gold wipe reveals on work + podcast cards ---------- */
(function(){
  var els = Array.prototype.slice.call(document.querySelectorAll(".wipe"));
  if(!els.length) return;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduceMotion) return;
  var wio = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      var cs = window.getComputedStyle(e.target);
      var d = cs.transitionDelay && cs.transitionDelay !== "0s" ? cs.transitionDelay : "0s";
      e.target.style.setProperty("--wipe-delay", d);
      e.target.classList.add("in");
      wio.unobserve(e.target);
    });
  }, {threshold: 0.18});
  els.forEach(function(el){ wio.observe(el); });
})();

/* ---------- v3.3: Services 3D orbit carousel ----------
   Slow auto-rotating ring of the 5 skill cards (CSS 3D).
   Pauses on hover/focus; arrows + dots + keyboard; mobile = swipe snap;
   reduced-motion = static grid (handled via .orbit-static class). */
(function(){
  var stage = document.getElementById("orbitStage");
  if(!stage) return;
  var track = document.getElementById("orbitTrack");
  var cards = Array.prototype.slice.call(track.querySelectorAll(".orbit-card"));
  var dotsWrap = stage.querySelector(".orbit-dots");
  var prevBtn = stage.querySelector(".orbit-prev");
  var nextBtn = stage.querySelector(".orbit-next");
  var n = cards.length;
  if(!n) return;
  var STEP = 360 / n;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var mqMobile = window.matchMedia("(max-width: 680px)");
  if(reduceMotion){ stage.classList.add("orbit-static"); return; }

  var dots = cards.map(function(_, i){
    var d = document.createElement("button");
    d.type = "button";
    d.setAttribute("aria-label", "Show service " + (i + 1) + " of " + n);
    d.addEventListener("click", function(){ goTo(i); });
    dotsWrap.appendChild(d);
    return d;
  });

  var angle = 0, active = false, raf = null, last = 0, tween = null, resumeTimer = null;
  var SPEED = 7; /* degrees per second — slow, majestic */

  function radius(){ return Math.max(300, Math.min(520, stage.clientWidth * 0.44)); }
  function norm(a){ return ((a % 360) + 360) % 360; }

  function render(){
    var r = radius();
    track.style.transform = "translateZ(" + (-r) + "px) rotateY(" + angle + "deg)";
    var front = 0, best = 999;
    cards.forEach(function(card, i){
      var a = i * STEP;
      card.style.transform = "rotateY(" + a + "deg) translateZ(" + r + "px)";
      var rel = norm(a + angle);
      var dist = Math.min(rel, 360 - rel);
      var facing = Math.cos(rel * Math.PI / 180);
      if(facing < -0.35){ card.style.opacity = "0"; card.style.visibility = "hidden"; }
      else{
        card.style.opacity = facing < 0.4 ? "0.45" : "1";
        card.style.visibility = "visible";
      }
      var isFront = dist < STEP / 2;
      card.classList.toggle("is-front", isFront);
      if(isFront){ card.removeAttribute("aria-hidden"); } else { card.setAttribute("aria-hidden", "true"); }
      if(dist < best){ best = dist; front = i; }
    });
    dots.forEach(function(d, i){ d.classList.toggle("active", i === front); });
    return front;
  }
  function currentFront(){
    var best = 0, bd = 999;
    cards.forEach(function(_, i){
      var rel = norm(i * STEP + angle), d = Math.min(rel, 360 - rel);
      if(d < bd){ bd = d; best = i; }
    });
    return best;
  }
  function tick(t){
    if(!active) return;
    if(!last) last = t;
    var dt = (t - last) / 1000; last = t;
    angle = norm(angle + SPEED * dt);
    render();
    raf = requestAnimationFrame(tick);
  }
  function start(){
    if(active || mqMobile.matches || document.hidden) return;
    active = true; last = 0; raf = requestAnimationFrame(tick);
  }
  function stop(){
    active = false;
    if(raf) cancelAnimationFrame(raf); raf = null;
    if(tween) cancelAnimationFrame(tween); tween = null;
  }
  function pauseTemp(){
    stop();
    if(resumeTimer) clearTimeout(resumeTimer);
    resumeTimer = setTimeout(start, 7000);
  }
  function animateTo(target){
    stop();
    if(resumeTimer) clearTimeout(resumeTimer);
    var cur = norm(angle), delta = norm(target) - cur;
    if(delta > 180) delta -= 360;
    if(delta < -180) delta += 360;
    var from = angle, to = angle + delta, t0 = null;
    function frame(t){
      if(!t0) t0 = t;
      var p = Math.min((t - t0) / 650, 1);
      var e = 1 - Math.pow(1 - p, 3);
      angle = norm(from + (to - from) * e);
      render();
      if(p < 1){ tween = requestAnimationFrame(frame); }
      else{ tween = null; pauseTemp(); }
    }
    tween = requestAnimationFrame(frame);
  }
  function goTo(i){ animateTo(-i * STEP); }

  prevBtn.addEventListener("click", function(){ goTo((currentFront() - 1 + n) % n); });
  nextBtn.addEventListener("click", function(){ goTo((currentFront() + 1) % n); });
  stage.addEventListener("keydown", function(ev){
    if(ev.key === "ArrowRight"){ ev.preventDefault(); goTo((currentFront() + 1) % n); }
    else if(ev.key === "ArrowLeft"){ ev.preventDefault(); goTo((currentFront() - 1 + n) % n); }
  });
  stage.addEventListener("pointerenter", function(){ stop(); if(resumeTimer) clearTimeout(resumeTimer); });
  stage.addEventListener("pointerleave", function(){ pauseTemp(); });
  stage.addEventListener("focusin", function(){ stop(); if(resumeTimer) clearTimeout(resumeTimer); });
  stage.addEventListener("focusout", function(){ pauseTemp(); });
  document.addEventListener("visibilitychange", function(){ document.hidden ? stop() : start(); });

  function teardown(){
    stop();
    cards.forEach(function(c){
      c.style.transform = ""; c.style.opacity = ""; c.style.visibility = "";
      c.classList.remove("is-front"); c.removeAttribute("aria-hidden");
    });
    track.style.transform = "";
  }
  function setup(){
    if(mqMobile.matches){ teardown(); return; }
    render(); start();
  }
  if(mqMobile.addEventListener){ mqMobile.addEventListener("change", setup); }
  setup();
})();
