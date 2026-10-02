/* MEHRAAB LIVING — Concept Demo interactions (zero dependencies) */
(function(){
  'use strict';
  var finePointer = window.matchMedia('(pointer:fine)').matches;

  /* ---------- Loader ---------- */
  var loader = document.getElementById('loader');
  var bar = document.getElementById('loaderBar');
  var pct = document.getElementById('loaderPct');
  var progress = 0;
  var tick = setInterval(function(){
    progress = Math.min(progress + Math.random() * 22, 100);
    bar.style.width = progress + '%';
    pct.textContent = Math.floor(progress) + '%';
    if (progress >= 100) {
      clearInterval(tick);
      setTimeout(function(){ loader.classList.add('done'); }, 350);
    }
  }, 160);
  /* Safety: never trap the user behind the loader */
  setTimeout(function(){ loader.classList.add('done'); }, 4000);

  /* ---------- Sticky nav state ---------- */
  var nav = document.getElementById('nav');
  function onScrollNav(){ nav.classList.toggle('scrolled', window.scrollY > 24); }
  window.addEventListener('scroll', onScrollNav, { passive:true });
  onScrollNav();

  /* ---------- Hamburger ---------- */
  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', function(){
    var open = navLinks.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  navLinks.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      navLinks.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded','false');
    });
  });

  /* ---------- Smooth anchor scrolling with nav offset ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = a.getAttribute('href');
      if (id.length < 2) return; /* "#" alone: decorative demo link */
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var y = el.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top:y, behavior:'smooth' });
    });
  });

  /* ---------- Scroll reveals (IntersectionObserver + stagger) ---------- */
  var revealIO = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (en.isIntersecting) { en.target.classList.add('in'); revealIO.unobserve(en.target); }
    });
  }, { threshold:0.12, rootMargin:'0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(function(el){ revealIO.observe(el); });

  /* ---------- Animated counters ---------- */
  function animateCounter(el){
    var target = parseInt(el.getAttribute('data-target'), 10) || 0;
    var dur = 1600, start = null;
    function frame(ts){
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target).toLocaleString('en-US');
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = target.toLocaleString('en-US');
    }
    requestAnimationFrame(frame);
  }
  var counterIO = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (en.isIntersecting) { animateCounter(en.target); counterIO.unobserve(en.target); }
    });
  }, { threshold:0.5 });
  document.querySelectorAll('.counter').forEach(function(el){ counterIO.observe(el); });

  /* ---------- Hero parallax: scroll + pointer ---------- */
  var layers = Array.prototype.slice.call(document.querySelectorAll('.hero__layer[data-depth]'));
  var hero = document.getElementById('hero');
  var sy = 0;
  var pointerX = 0.5, pointerY = 0.5;
  function parallax(){
    sy += (window.scrollY - sy) * 0.08;
    layers.forEach(function(layer){
      var d = parseFloat(layer.getAttribute('data-depth'));
      var px = (pointerX - 0.5) * d * 220;
      var py = (pointerY - 0.5) * d * 160 - sy * d * 1.4;
      layer.style.transform = 'translate3d(' + px.toFixed(1) + 'px,' + py.toFixed(1) + 'px,0)';
    });
    requestAnimationFrame(parallax);
  }
  if (finePointer) {
    hero.addEventListener('pointermove', function(e){
      var r = hero.getBoundingClientRect();
      pointerX = (e.clientX - r.left) / r.width;
      pointerY = (e.clientY - r.top) / r.height;
    });
  }
  requestAnimationFrame(parallax);

  /* ---------- 3D tilt on cards ---------- */
  if (finePointer) {
    document.querySelectorAll('.tilt').forEach(function(card){
      var raf = null;
      card.addEventListener('pointermove', function(e){
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function(){
          card.style.transform = 'perspective(900px) rotateY(' + (x * 10).toFixed(2) + 'deg) rotateX(' + (-y * 10).toFixed(2) + 'deg) translateY(-6px)';
        });
      });
      card.addEventListener('pointerleave', function(){
        if (raf) cancelAnimationFrame(raf);
        card.style.transform = '';
      });
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (finePointer) {
    document.querySelectorAll('.magnetic').forEach(function(btn){
      btn.addEventListener('pointermove', function(e){
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform = 'translate(' + (x * 0.18).toFixed(1) + 'px,' + (y * 0.28).toFixed(1) + 'px)';
      });
      btn.addEventListener('pointerleave', function(){ btn.style.transform = ''; });
    });
  }

  /* ---------- Cursor glow ---------- */
  var glow = document.getElementById('cursorGlow');
  if (finePointer && glow) {
    var gx = 0, gy = 0, tx = 0, ty = 0;
    window.addEventListener('pointermove', function(e){
      tx = e.clientX; ty = e.clientY; glow.style.opacity = '1';
    }, { passive:true });
    (function follow(){
      gx += (tx - gx) * 0.08; gy += (ty - gy) * 0.08;
      glow.style.transform = 'translate(' + (gx - 170) + 'px,' + (gy - 170) + 'px)';
      requestAnimationFrame(follow);
    })();
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
