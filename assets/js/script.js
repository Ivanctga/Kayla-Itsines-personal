document.addEventListener("DOMContentLoaded", () => {
  // 1. HEADER STICKY E RESPONSIVO (MOBILE MENU)
  const header = document.getElementById("header");
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.getElementById("main-nav");
  const navLinksArray = document.querySelectorAll(".nav-link, .nav-cta-mobile");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Lógica do Menu Hamburger
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      const isExpanded = mobileToggle.getAttribute("aria-expanded") === "true";

      // Toggle de classes e aria-attributes
      mobileToggle.setAttribute("aria-expanded", !isExpanded);
      navMenu.classList.toggle("open");

      // Troca o ícone
      const icon = mobileToggle.querySelector("i");
      if (!isExpanded) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
      } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    });

    // Fechar menu ao clicar em um link
    navLinksArray.forEach((link) => {
      link.addEventListener("click", () => {
        if (navMenu.classList.contains("open")) {
          navMenu.classList.remove("open");
          mobileToggle.setAttribute("aria-expanded", "false");
          const icon = mobileToggle.querySelector("i");
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      });
    });
  }

  // 2. SMOOTH SCROLLING (OTIMIZADO)
  const linksInternos = document.querySelectorAll('a[href^="#"]');

  linksInternos.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");

      if (href === "#") return;

      const targetElement = document.querySelector(href);

      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // 3. HIGHLIGHT DO MENU (SCROLL SPY COM INTERSECTION OBSERVER)
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link"); // ignora o botão CTA do menu

  const observerOptions = {
    root: null,
    rootMargin: "-50% 0px -50% 0px",
    threshold: 0,
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute("id");

        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${currentId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    if (section.getAttribute("id")) {
      sectionObserver.observe(section);
    }
  });

  // 4. ANIMAÇÕES ON-SCROLL (FADE + SLIDE)
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -100px 0px",
      threshold: 0,
    },
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  // 5. BOTÕES FLUTUANTES (WHATSAPP E SCROLL TO TOP)
  const fab = document.querySelector(".fab-whatsapp");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    // Mostra o WhatsApp FAB e Scroll To Top após rolar 500px
    if (window.scrollY > 500) {
      if (fab) fab.classList.add("visible");
      if (scrollTopBtn) scrollTopBtn.classList.add("visible");
    } else {
      if (fab) fab.classList.remove("visible");
      if (scrollTopBtn) scrollTopBtn.classList.remove("visible");
    }
  });

  // Ação do Scroll To Top
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // 6. FAQ ACCORDION (Acessível)
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const headerBtn = item.querySelector(".accordion-header");

    headerBtn.addEventListener("click", () => {
      const isExpanded = headerBtn.getAttribute("aria-expanded") === "true";

      // Fecha outros acordeões (Opcional, mas limpo)
      accordionItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
          otherItem
            .querySelector(".accordion-header")
            .setAttribute("aria-expanded", "false");
        }
      });

      item.classList.toggle("active");
      headerBtn.setAttribute("aria-expanded", !isExpanded);
    });
  });

  // 7. INTERCEPTAR FORMULÁRIO COM FEEDBACK E VALIDAÇÃO
  const form = document.getElementById("leadForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validação HTML5 Básica
      if (!this.checkValidity()) {
        this.reportValidity();
        return;
      }

      const btn = this.querySelector('button[type="submit"]');
      const textoOriginal = btn.innerHTML;

      // Microinteração de Loading
      btn.innerHTML =
        '<i class="fa-solid fa-circle-notch fa-spin"></i> Redirecionando...';
      btn.style.opacity = "0.8";
      btn.disabled = true;

      setTimeout(() => {
        const nome = document.getElementById("nome").value;
        const select = document.getElementById("objetivo");
        const objetivo = select.options[select.selectedIndex].text;

        const numeroTelefone = "5511999999999";
        const mensagem = `Olá! Meu nome é ${nome}. Gostaria de iniciar a consultoria com foco em: ${objetivo}. Como podemos começar?`;

        const urlWhatsApp = `https://wa.me/${numeroTelefone}?text=${encodeURIComponent(mensagem)}`;

        window.open(urlWhatsApp, "_blank", "noopener,noreferrer");

        // Restaura botão
        btn.innerHTML = textoOriginal;
        btn.style.opacity = "1";
        btn.disabled = false;
        form.reset();
      }, 800);
    });
  }

  // 8. RIPPLE EFFECT (Microinterações)
  const rippleButtons = document.querySelectorAll(".ripple");
  rippleButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const x = e.clientX - this.getBoundingClientRect().left;
      const y = e.clientY - this.getBoundingClientRect().top;
      
      const rippleElement = document.createElement("span");
      rippleElement.classList.add("ripple-element");
      rippleElement.style.left = `${x}px`;
      rippleElement.style.top = `${y}px`;
      
      const size = Math.max(this.clientWidth, this.clientHeight);
      rippleElement.style.width = rippleElement.style.height = `${size}px`;
      rippleElement.style.marginLeft = rippleElement.style.marginTop = `${-size / 2}px`;
      
      this.appendChild(rippleElement);
      
      setTimeout(() => {
        rippleElement.remove();
      }, 600);
    });
  });
});
