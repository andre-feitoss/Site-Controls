/* ==========================================================================
   CTRLS - Main Application Logic & Interactivity
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Glassmorphism on Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      mobileToggle.innerHTML = isExpanded ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
  }

  // 3. Toast Notification Helper
  window.showToast = function (message, icon = 'fas fa-check-circle') {
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="${icon} text-gold" style="font-size:1.2rem;"></i><span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };

  // 4. Modal System (Video Player, Tickets, Cart)
  const modalOverlay = document.getElementById('modal-overlay');
  const modalBody = document.getElementById('modal-body-container');
  const modalClose = document.getElementById('modal-close-btn');

  function openModal(contentHtml) {
    if (!modalOverlay || !modalBody) return;
    modalBody.innerHTML = contentHtml;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (modalBody) modalBody.innerHTML = '';
    }, 300);
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // 5. Video Cards Click Handler
  const videoCards = document.querySelectorAll('.video-card');
  videoCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-title') || 'Vídeo CTRLS';
      const videoId = card.getAttribute('data-youtube-id') || 'dQw4w9WgXcQ';
      openModal(`
        <h3 class="text-gold" style="font-size:1.5rem; margin-bottom:16px;">${title}</h3>
        <div style="position:relative; width:100%; aspect-ratio:16/9; border-radius:16px; overflow:hidden; border:1px solid var(--border-glass);">
          <iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1" title="${title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      `);
    });
  });

  // 6. Ticket Booking Buttons
  const ticketBtns = document.querySelectorAll('.btn-ticket');
  ticketBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const city = btn.getAttribute('data-city') || 'São Paulo, SP';
      const date = btn.getAttribute('data-date') || '25 OUT';
      openModal(`
        <div style="text-align:center;">
          <i class="fas fa-ticket-alt text-gold" style="font-size:3rem; margin-bottom:16px;"></i>
          <h3 class="text-gradient" style="font-size:2rem; margin-bottom:8px;">Turnê Oceanos 2026</h3>
          <p style="color:var(--white-muted); font-size:1.1rem; margin-bottom:24px;">${city} &bull; ${date}</p>
          <form id="ticket-form" style="display:flex; flex-direction:column; gap:16px; text-align:left;">
            <div class="form-group">
              <label class="form-label">Nome Completo</label>
              <input type="text" class="form-input" placeholder="Seu nome" required />
            </div>
            <div class="form-group">
              <label class="form-label">E-mail para Receber o Ingresso</label>
              <input type="email" class="form-input" placeholder="seuemail@exemplo.com" required />
            </div>
            <div class="form-group">
              <label class="form-label">Quantidade de Ingressos</label>
              <select class="form-select">
                <option value="1">1 Ingresso (Pista VIP)</option>
                <option value="2">2 Ingressos (Pista VIP)</option>
                <option value="4">4 Ingressos (Combo Família)</option>
              </select>
            </div>
            <button type="submit" class="btn btn-gold" style="width:100%; margin-top:10px;">Confirmar e Garantir Ingresso</button>
          </form>
        </div>
      `);

      setTimeout(() => {
        const ticketForm = document.getElementById('ticket-form');
        if (ticketForm) {
          ticketForm.addEventListener('submit', (e) => {
            e.preventDefault();
            closeModal();
            showToast('Ingresso reservado com sucesso! Verifique seu e-mail.', 'fas fa-ticket-alt');
          });
        }
      }, 100);
    });
  });

  // 7. Shopping Cart Add Buttons
  const cartBtns = document.querySelectorAll('.btn-add-cart');
  let cartCount = 0;
  const cartBadge = document.getElementById('cart-badge-count');

  cartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-product-name') || 'Produto CTRLS';
      cartCount++;
      if (cartBadge) {
        cartBadge.textContent = cartCount;
        cartBadge.style.display = 'inline-block';
      }
      showToast(`'${name}' adicionado ao seu carrinho!`, 'fas fa-shopping-bag');
    });
  });

  // 8. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  // 9. Contact Form Handler - Directing to bkpcontrols@gmail.com
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      submitBtn.disabled = true;

      const name = contactForm.querySelector('input[type="text"]').value;
      const email = contactForm.querySelector('input[type="email"]').value;
      const phone = contactForm.querySelector('input[type="tel"]').value;
      const select = contactForm.querySelector('select').value;
      const message = contactForm.querySelector('textarea').value;

      fetch('https://formsubmit.co/ajax/bkpcontrols@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          nome: name,
          email: email,
          telefone: phone,
          assunto: select,
          mensagem: message
        })
      }).then(() => {
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        showToast('Mensagem enviada com sucesso!', 'fas fa-paper-plane');
      }).catch(() => {
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        showToast('Mensagem enviada com sucesso!', 'fas fa-paper-plane');
      });
    });
  }
});
