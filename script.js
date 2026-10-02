/* Muhammad Adeel — Portfolio v2 interactions. Vanilla JS, no dependencies. */
(function(){
  "use strict";
  var fine = window.matchMedia("(pointer:fine)").matches;
  var reduced = window.matchMedia("(prefers-reduced-motion:reduce)").matches;

  /* ---------- Loader ---------- */
  var loader = document.getElementById("loader");
  var bar = document.getElementById("loaderProgress");
  var p = 0, finished = false;
  var tick = setInterval(function(){
    p = Math.min(p + Math.random() * 26, 94);
    if (bar) bar.style.width = p + "%";
  }, 200);
  function finishLoad(){
    if (finished) return; finished = true;
    clearInterval(tick);
    if (bar) bar.style.width = "100%";
    setTimeout(function(){ loader.classList.add("done"); }, 350);
  }
  if (document.readyState === "complete") setTimeout(finishLoad, 500);
  else window.addEventListener("load", function(){ setTimeout(finishLoad, 500); });
  setTimeout(finishLoad, 4500); // safety

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById("menuBtn");
  var navLinks = document.getElementById("navLinks");
  menuBtn.addEventListener("click", function(){
    var open = navLinks.classList.toggle("open");
    menuBtn.classList.toggle("open", open);
  });
  navLinks.addEventListener("click", function(e){
    if (e.target.tagName === "A"){ navLinks.classList.remove("open"); menuBtn.classList.remove("open"); }
  });

  /* ---------- Scroll reveals ---------- */
  var revealObs = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (en.isIntersecting){ en.target.classList.add("visible"); revealObs.unobserve(en.target); }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach(function(el, i){
    el.style.transitionDelay = ((i % 4) * 0.08) + "s";
    revealObs.observe(el);
  });

  /* ---------- Animated counters ---------- */
  function animateCount(el){
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1500, start = null;
    function step(ts){
      if (!start) start = ts;
      var t = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var countObs = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (en.isIntersecting){ animateCount(en.target); countObs.unobserve(en.target); }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll(".stat-num").forEach(function(el){ countObs.observe(el); });

  /* ---------- 3D tilt cards ---------- */
  if (fine && !reduced){
    document.querySelectorAll(".tilt").forEach(function(card){
      var raf = null;
      card.addEventListener("pointermove", function(e){
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function(){
          card.style.transform = "perspective(900px) rotateY(" + (x * 7).toFixed(2) + "deg) rotateX(" + (-y * 7).toFixed(2) + "deg) translateY(-4px)";
        });
      });
      card.addEventListener("pointerleave", function(){
        if (raf) cancelAnimationFrame(raf);
        card.style.transform = "";
      });
    });

    /* ---------- Magnetic buttons ---------- */
    document.querySelectorAll(".magnetic").forEach(function(btn){
      btn.addEventListener("pointermove", function(e){
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform = "translate(" + (x * 0.18).toFixed(1) + "px," + (y * 0.28).toFixed(1) + "px)";
      });
      btn.addEventListener("pointerleave", function(){ btn.style.transform = ""; });
    });

    /* ---------- Cursor glow ---------- */
    var glow = document.getElementById("cursorGlow");
    var gx = -500, gy = -500, tx = gx, ty = gy;
    document.addEventListener("pointermove", function(e){ tx = e.clientX; ty = e.clientY; });
    (function loop(){
      gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12;
      glow.style.left = gx + "px"; glow.style.top = gy + "px";
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- Hero parallax ---------- */
  var heroMedia = document.querySelector(".hero-media");
  if (heroMedia && !reduced){
    var ticking = false;
    window.addEventListener("scroll", function(){
      if (ticking) return; ticking = true;
      requestAnimationFrame(function(){
        var y = window.scrollY;
        if (y < window.innerHeight * 1.2){
          heroMedia.style.transform = "translateY(" + (y * 0.28).toFixed(1) + "px) scale(" + (1 + y / 6000).toFixed(4) + ")";
        }
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- Video modal ---------- */
  var modal = document.getElementById("modal");
  var modalVideo = document.getElementById("modalVideo");
  var modalTitle = document.getElementById("modalTitle");
  function openModal(src, title){
    modalTitle.textContent = title || "";
    modalVideo.src = src;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modalVideo.play().catch(function(){});
  }
  function closeModal(){
    modalVideo.pause();
    modalVideo.removeAttribute("src");
    modalVideo.load();
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  document.querySelectorAll("[data-play]").forEach(function(btn){
    btn.addEventListener("click", function(){
      openModal(btn.getAttribute("data-play"), btn.getAttribute("data-title"));
    });
  });
  modal.querySelectorAll("[data-close]").forEach(function(el){
    el.addEventListener("click", closeModal);
  });
  document.addEventListener("keydown", function(e){
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  /* ---------- Hero video autoplay ---------- */
  var heroBg = document.querySelector(".hero-bg");
  if (heroBg){
    var tryPlay = function(){ heroBg.play().catch(function(){}); };
    heroBg.addEventListener("canplay", tryPlay, { once: true });
    tryPlay();
  }

  /* ---------- Nav shadow ---------- */
  var nav = document.getElementById("nav");
  window.addEventListener("scroll", function(){
    nav.style.boxShadow = window.scrollY > 40 ? "0 10px 30px rgba(0,0,0,.45)" : "none";
  }, { passive: true });
})();
