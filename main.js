/* REVENANT — shared interactions */

/* --- mobile nav --- */
(function(){
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  if(toggle && links){
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }
})();

/* --- hero letters stagger --- */
(function(){
  document.querySelectorAll('.hero__word .reveal').forEach((el, i) => {
    el.style.animationDelay = (0.08 * i + 0.1) + 's';
  });
})();

/* --- scroll reveal --- */
(function(){
  const els = document.querySelectorAll('.r');
  if(!('IntersectionObserver' in window) || !els.length){ els.forEach(e=>e.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold:0.12 });
  els.forEach(e => io.observe(e));
})();

/* --- gallery filter --- */
(function(){
  const filters = document.querySelectorAll('.filter');
  const tiles = document.querySelectorAll('.tile');
  if(!filters.length) return;
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.setAttribute('aria-pressed','false'));
      btn.setAttribute('aria-pressed','true');
      const f = btn.dataset.filter;
      tiles.forEach(t => {
        const show = f === 'all' || t.dataset.style === f;
        t.style.display = show ? '' : 'none';
      });
    });
  });
})();

/* --- lightbox --- */
(function(){
  const box = document.querySelector('.lightbox');
  if(!box) return;
  const inner = box.querySelector('.lightbox__inner .tile__img');
  const cap = box.querySelector('.lightbox__cap');
  const close = box.querySelector('.lightbox__close');

  document.querySelectorAll('.tile').forEach(t => {
    t.addEventListener('click', () => {
      const no = t.querySelector('.tile__no')?.textContent || '';
      const style = t.querySelector('.tile__style')?.textContent || '';
      cap.innerHTML = `<div class="tile__no">${no}</div><div class="tile__style">${style}</div>`;
      box.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  function shut(){ box.classList.remove('open'); document.body.style.overflow=''; }
  close.addEventListener('click', shut);
  box.addEventListener('click', e => { if(e.target === box) shut(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') shut(); });
})();

/* --- booking form (front-end only; wire to your backend) --- */
(function(){
  const form = document.querySelector('#booking-form');
  if(!form) return;
  const status = form.querySelector('.form-status');
  form.querySelector('.btn').addEventListener('click', () => {
    const name = form.querySelector('[name=name]').value.trim();
    const contact = form.querySelector('[name=contact]').value.trim();
    if(!name || !contact){
      status.textContent = 'Add your name and a way to reach you.';
      return;
    }
    status.textContent = 'Sent. I read every request — expect a reply within a few days.';
    form.querySelectorAll('input, textarea, select').forEach(el => el.value = '');
  });
})();

/* --- mark current nav link --- */
(function(){
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(a => {
    if(a.getAttribute('href') === here) a.setAttribute('aria-current','page');
  });
})();
