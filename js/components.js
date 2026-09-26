const HEADER = `
<header class="site-header" id="siteHeader">
  <div class="nav-wrap">
    <div class="container nav">
      <a class="brand" href="{{HOME}}" aria-label="Rudra Prime Infra LLP home">
        <img src="{{ROOT}}assets/img/navbar-mark.jpg" alt="Rudra Prime Infra LLP logo">
        <span><b>RUDRA PRIME</b><small>INFRA LLP</small></span>
      </a>
      <button class="menu-toggle" aria-label="Open navigation" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <nav class="nav-links" aria-label="Primary navigation">
        <a data-link="home" href="{{HOME}}">Home</a>
        <a data-link="about" href="{{ROOT}}pages/about.html">Company</a>
        <a data-link="services" href="{{ROOT}}pages/services.html">Capabilities</a>
        <a data-link="projects" href="{{ROOT}}pages/projects.html">Projects</a>
        <a data-link="solar" href="{{ROOT}}pages/solar.html">5 MW Solar</a>
        <a data-link="gallery" href="{{ROOT}}pages/gallery.html">Gallery</a>
        <a data-link="careers" href="{{ROOT}}pages/careers.html">Careers</a>
        <a data-link="contact" class="nav-cta" href="{{ROOT}}pages/contact.html">Start a Project <span>↗</span></a>
      </nav>
    </div>
  </div>
</header>`;

const FOOTER = `
<footer class="footer">
  <div class="container footer-grid">
    <div class="footer-main">
      <img src="{{ROOT}}assets/img/logo.jpg" alt="Rudra Prime Infra LLP">
      <div class="footer-tagline">Where Integrity Meets Innovation.</div>
      <p class="footer-note">Civil · Structural · Solar EPC · Manpower</p>
      <p>Professionally managed civil infrastructure and project execution across Gujarat and beyond.</p>
    </div>
    <div><h3>Explore</h3>
      <a href="{{HOME}}">Home</a><a href="{{ROOT}}pages/about.html">Company</a><a href="{{ROOT}}pages/services.html">Capabilities</a><a href="{{ROOT}}pages/projects.html">Projects</a><a href="{{ROOT}}pages/careers.html">Careers</a>
    </div>
    <div><h3>Capabilities</h3>
      <a href="{{ROOT}}pages/services.html#solar">Solar EPC</a><a href="{{ROOT}}pages/services.html#civil">Civil & Earthwork</a><a href="{{ROOT}}pages/services.html#piling">Piling & Foundations</a><a href="{{ROOT}}pages/services.html#electrical">Electrical & Cabling</a><a href="{{ROOT}}pages/services.html#manpower">Manpower</a>
    </div>
    <div><h3>Contact</h3>
      <a href="tel:+919722415741">+91 97224 15741</a><a href="tel:+919265531593">+91 92655 31593</a><a href="mailto:rudraprimeinfra@gmail.com">rudraprimeinfra@gmail.com</a>
      <span>Office No. 108, First Floor, Time Square Empire, Mirzapur Road, Bhuj, Kachchh, Gujarat – 370001</span>
      <span>Branch: Tharad, Banaskantha, Gujarat – 385565</span>
    </div>
  </div>
  <div class="container footer-bottom"><span>© <span id="year"></span> Rudra Prime Infra LLP. All rights reserved.</span><span>GSTIN: 24ABMFR2469K1ZP</span></div>
</footer>
<a class="whatsapp" href="https://wa.me/919722415741?text=Hello%20Rudra%20Prime%20Infra%2C%20I%20would%20like%20to%20discuss%20a%20project." aria-label="WhatsApp">⌁</a>
<button class="back-top" id="backTop" aria-label="Back to top">↑</button>`;

(() => {
  const path = location.pathname.replaceAll('\\','/');
  const isPages = path.includes('/pages/');
  const HOME = isPages ? '../index.html' : 'index.html';
  const ROOT = isPages ? '../' : '';
  const header = document.querySelector('#site-header');
  const footer = document.querySelector('#site-footer');
  if(header) header.innerHTML = HEADER.replaceAll('{{HOME}}', HOME).replaceAll('{{ROOT}}', ROOT);
  if(footer) footer.innerHTML = FOOTER.replaceAll('{{HOME}}', HOME).replaceAll('{{ROOT}}', ROOT);

  const page = document.body.dataset.page || '';
  document.querySelectorAll('[data-link]').forEach(a => { if(a.dataset.link === page) a.classList.add('active'); });

  const menu = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if(menu && links){
    menu.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      menu.setAttribute('aria-expanded', open ? 'true' : 'false');
      menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      document.body.classList.toggle('menu-open', open);
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open'); document.body.classList.remove('menu-open'); menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label','Open navigation');
    }));
  }

  const year = document.querySelector('#year'); if(year) year.textContent = new Date().getFullYear();

  const observer = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }), {threshold:.08});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const back = document.querySelector('#backTop');
  window.addEventListener('scroll', () => { if(back) back.classList.toggle('show', window.scrollY > 500); }, {passive:true});
  if(back) back.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

  document.querySelectorAll('.faq-q').forEach(btn => btn.addEventListener('click', () => btn.closest('.faq-item').classList.toggle('open')));

  const box = document.querySelector('#lightbox');
  const boxImg = document.querySelector('#lightboxImg');
  const close = document.querySelector('#lightboxClose');
  document.querySelectorAll('[data-lightbox]').forEach(img => img.addEventListener('click', () => {
    if(!box) return; boxImg.src = img.currentSrc || img.src; boxImg.alt = img.alt; box.classList.add('open'); document.body.classList.add('lightbox-open');
  }));
  const closeBox = () => { if(box){box.classList.remove('open');document.body.classList.remove('lightbox-open');} };
  if(close) close.addEventListener('click', closeBox);
  if(box) box.addEventListener('click', e => { if(e.target === box) closeBox(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeBox(); });

  const filter = document.querySelector('#projectFilter');
  if(filter) filter.addEventListener('change', () => {
    const value = filter.value;
    document.querySelectorAll('[data-project-type]').forEach(card => { card.hidden = value !== 'all' && card.dataset.projectType !== value; });
  });
})();

document.addEventListener('click', e => {
  const a = e.target.closest('a[href*="#"]'); if(!a) return;
  const url = new URL(a.href, location.href); if(url.pathname !== location.pathname || !url.hash) return;
  const target = document.querySelector(url.hash); if(!target) return;
  e.preventDefault();
  const offset = document.querySelector('.nav-wrap')?.offsetHeight || 82;
  window.scrollTo({top: target.getBoundingClientRect().top + window.scrollY - offset - 18, behavior:'smooth'});
});
