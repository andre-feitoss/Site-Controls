/* ==========================================================================
   CTRLS - 3D Orbital Menu Math & Physics System
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const orbitalContainer = document.getElementById('orbital-container');
  if (!orbitalContainer) return;

  orbitalContainer.innerHTML = '';

  const links = [
    { nome: 'YouTube',   href: 'https://www.youtube.com/@controladosprasalvar/shorts' },
    { nome: 'Spotify',   href: 'https://open.spotify.com/intl-pt/album/1gALQbFq8B3aNmqkhYyy3A' },
    { nome: 'Instagram', href: 'https://www.instagram.com/controladosprasalvar/' },
    { nome: 'TikTok',    href: 'https://www.tiktok.com/@controlados.pra.s' },
    { nome: 'Facebook',  href: 'https://facebook.com' },
    { nome: 'LinkedIn',  href: 'https://www.linkedin.com/in/controlados-pra-salvar-81848b424/' },
    { nome: 'Contato',   href: '#contato' }
  ];

  links.forEach(({ nome, href }) => {
    const btn = document.createElement('a');
    btn.className = 'orbital-badge';
    btn.textContent = nome;
    btn.href = href;
    if (href.startsWith('http')) {
      btn.target = '_blank';
      btn.rel = 'noopener noreferrer';
    }
    orbitalContainer.appendChild(btn);
  });
});
