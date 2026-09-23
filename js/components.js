const HEADER = "\n<header class=\"site-header\" id=\"siteHeader\">\n  <div class=\"topline\">\n    <div class=\"container topline-inner\">\n      <span>Gujarat, India</span>\n      <span class=\"topline-dot\"></span>\n      <a href=\"tel:+919722415741\">+91 97224 15741</a>\n      <span class=\"topline-dot\"></span>\n      <a href=\"mailto:rudraprimeinfra@gmail.com\">rudraprimeinfra@gmail.com</a>\n    </div>\n  </div>\n  <div class=\"nav-wrap\">\n    <div class=\"container nav\">\n      <a class=\"brand\" href=\"{{HOME}}\">\n        <img src=\"{{ROOT}}assets/img/logo.jpg\" alt=\"Rudra Prime Infra LLP logo\">\n        <span><b>RUDRA PRIME</b><small>INFRA LLP</small></span>\n      </a>\n      <button class=\"menu-toggle\" aria-label=\"Open menu\" aria-expanded=\"false\">\n        <span></span><span></span><span></span>\n      </button>\n      <nav class=\"nav-links\" aria-label=\"Primary navigation\">\n        <a data-link=\"home\" href=\"{{HOME}}\">Home</a>\n        <a data-link=\"about\" href=\"{{ROOT}}pages/about.html\">Company</a>\n        <a data-link=\"services\" href=\"{{ROOT}}pages/services.html\">Capabilities</a>\n        <a data-link=\"projects\" href=\"{{ROOT}}pages/projects.html\">Projects</a>\n        <a data-link=\"solar\" href=\"{{ROOT}}pages/solar.html\">5 MW Solar</a>\n        <a data-link=\"gallery\" href=\"{{ROOT}}pages/gallery.html\">Gallery</a>\n        <a data-link=\"contact\" class=\"nav-cta\" href=\"{{ROOT}}pages/contact.html\">Start a Project <span>\u2197</span></a>\n      </nav>\n    </div>\n  </div>\n</header>\n";
const FOOTER = "\n<footer class=\"footer\">\n  <div class=\"container footer-grid\">\n    <div class=\"footer-main\">\n      <img src=\"{{ROOT}}assets/img/logo.jpg\" alt=\"Rudra Prime Infra LLP\">\n      <p>Where Integrity Meets Innovation.</p>\n      <p class=\"footer-note\">Civil \u00b7 Structural \u00b7 Solar EPC \u00b7 Manpower</p>\n    </div>\n    <div>\n      <h3>Explore</h3>\n      <a href=\"{{HOME}}\">Home</a>\n      <a href=\"{{ROOT}}pages/about.html\">Company</a>\n      <a href=\"{{ROOT}}pages/services.html\">Capabilities</a>\n      <a href=\"{{ROOT}}pages/projects.html\">Project track record</a>\n    </div>\n    <div>\n      <h3>Focus</h3>\n      <a href=\"{{ROOT}}pages/solar.html\">Solar EPC</a>\n      <a href=\"{{ROOT}}pages/services.html#civil\">Civil & Earthwork</a>\n      <a href=\"{{ROOT}}pages/services.html#structural\">Structural Steel</a>\n      <a href=\"{{ROOT}}pages/services.html#manpower\">Manpower</a>\n    </div>\n    <div>\n      <h3>Contact</h3>\n      <a href=\"tel:+919722415741\">+91 97224 15741</a>\n      <a href=\"tel:+919265531593\">+91 92655 31593</a>\n      <a href=\"mailto:rudraprimeinfra@gmail.com\">rudraprimeinfra@gmail.com</a>\n      <span>Bhuj, Kachchh \u00b7 Tharad, Banaskantha \u00b7 Gujarat</span>\n    </div>\n  </div>\n  <div class=\"container footer-bottom\">\n    <span>\u00a9 <span id=\"year\"></span> Rudra Prime Infra LLP. All rights reserved.</span>\n    <span>GSTIN: 24ABMFR2469K1ZP</span>\n  </div>\n</footer>\n<a class=\"whatsapp\" href=\"https://wa.me/919722415741?text=Hello%20Rudra%20Prime%20Infra%2C%20I%20would%20like%20to%20discuss%20a%20project.\" aria-label=\"WhatsApp\">\u25d4</a>\n<button class=\"back-top\" id=\"backTop\" aria-label=\"Back to top\">\u2191</button>\n";

(() => {
  const root = document.documentElement;
  const path = location.pathname.replaceAll("\\","/");
  const isPages = path.includes("/pages/");
  const HOME = isPages ? "../index.html" : "index.html";
  const ROOT = isPages ? "../" : "";

  const header = document.querySelector("#site-header");
  const footer = document.querySelector("#site-footer");
  if (header) header.innerHTML = HEADER.replaceAll("{{HOME}}", HOME).replaceAll("{{ROOT}}", ROOT);
  if (footer) footer.innerHTML = FOOTER.replaceAll("{{HOME}}", HOME).replaceAll("{{ROOT}}", ROOT);

  const page = document.body.dataset.page || "";
  document.querySelectorAll("[data-link]").forEach(a => {
    if (a.dataset.link === page) a.classList.add("active");
  });

  const menu = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  if(menu && links){
    menu.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      menu.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("menu-open", open);
    });
    links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      links.classList.remove("open");
      document.body.classList.remove("menu-open");
      menu.setAttribute("aria-expanded","false");
    }));
  }

  const year = document.querySelector("#year");
  if(year) year.textContent = new Date().getFullYear();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("visible"); });
  }, {threshold:.08});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  const back = document.querySelector("#backTop");
  window.addEventListener("scroll", () => {
    if(back) back.classList.toggle("show", window.scrollY > 500);
  });
  if(back) back.addEventListener("click", () => window.scrollTo({top:0,behavior:"smooth"}));

  document.querySelectorAll(".faq-q").forEach(btn => {
    btn.addEventListener("click", () => btn.closest(".faq-item").classList.toggle("open"));
  });

  // Simple gallery lightbox.
  const box = document.querySelector("#lightbox");
  const boxImg = document.querySelector("#lightboxImg");
  const close = document.querySelector("#lightboxClose");
  document.querySelectorAll("[data-lightbox]").forEach(img => {
    img.addEventListener("click", () => {
      if(!box) return;
      boxImg.src = img.currentSrc || img.src;
      boxImg.alt = img.alt;
      box.classList.add("open");
    });
  });
  const closeBox = () => box && box.classList.remove("open");
  if(close) close.addEventListener("click", closeBox);
  if(box) box.addEventListener("click", e => { if(e.target === box) closeBox(); });
  document.addEventListener("keydown", e => { if(e.key === "Escape") closeBox(); });

  // Project filter.
  const filter = document.querySelector("#projectFilter");
  if(filter){
    filter.addEventListener("change", () => {
      const value = filter.value;
      document.querySelectorAll("[data-project-type]").forEach(card => {
        card.hidden = value !== "all" && card.dataset.projectType !== value;
      });
    });
  }
})();

document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href*="#"]');
  if (!a) return;
  const url = new URL(a.href, location.href);
  if (url.pathname !== location.pathname || !url.hash) return;
  const target = document.querySelector(url.hash);
  if (!target) return;
  e.preventDefault();
  const offset = document.querySelector(".nav-wrap")?.offsetHeight || 82;
  window.scrollTo({top: target.getBoundingClientRect().top + window.scrollY - offset - 18, behavior:"smooth"});
});
