/* Muhammad Adeel — Portfolio interactions. Vanilla JS, no dependencies. */
(function(){
  "use strict";

  /* ---------- Loader ---------- */
  var loader = document.getElementById("loader");
  var bar = document.getElementById("loaderProgress");
  var p = 0;
  var tick = setInterval(function(){
    p = Math.min(p + Math.random() * 28, 96);
    bar.style.width = p + "%";
  }, 220);
  function finishLoad(){
    clearInterval(tick);
    bar.style.width = "100%";
    setTimeout(function(){ loader.classList.add("done"); }, 350);
  }
  if (document.readyState === "complete") finishLoad();
  else window.addEventListener("load", finishLoad);
  setTimeout(finishLoad, 4000); // safety

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById("menuBtn");
  var navLinks = document.querySelector(".nav-links");
  menuBtn.addEventListener("click", function(){ navLinks.classList.toggle("open"); });
  navLinks.addEventListener("click", function(e){
    if (e.target.tagName === "A") navLinks.classList.remove("open");
  });

  /* ---------- Scroll reveals ---------- */
  var revealObs = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (en.isIntersecting){ en.target.classList.add("in"); revealObs.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function(el){ revealObs.observe(el); });

  /* ---------- Animated counters ---------- */
  function animateCount(el){
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1400, start = null;
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

  /* ---------- 3D tilt glow on service cards ---------- */
  document.querySelectorAll(".service").forEach(function(card){
    card.addEventListener("pointermove", function(e){
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
      card.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
    });
  });

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
    modalVideo.play().catch(function(){ /* user will press play */ });
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

  /* ---------- Hero video: ensure it tries to play (muted autoplay) ---------- */
  var heroBg = document.querySelector(".hero-bg");
  if (heroBg){
    var tryPlay = function(){ heroBg.play().catch(function(){}); };
    heroBg.addEventListener("canplay", tryPlay, { once: true });
    tryPlay();
  }

  /* ---------- Nav shadow on scroll ---------- */
  var nav = document.getElementById("nav");
  window.addEventListener("scroll", function(){
    nav.style.boxShadow = window.scrollY > 40 ? "0 10px 30px rgba(0,0,0,.45)" : "none";
  }, { passive: true });
})();
