/* ==========================================================================
   CTRLS - Menu de Redes Sociais
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

    // Estilo dos botões
    btn.style.position = 'static';
    btn.style.transform = 'none';
    btn.style.display = 'inline-block';
    btn.style.padding = '6px 10px';
    btn.style.margin = '0';
    btn.style.fontSize = '0.72rem';
    btn.style.fontWeight = '600';
    btn.style.textTransform = 'uppercase';
    btn.style.textDecoration = 'none';
    btn.style.whiteSpace = 'nowrap';

    if (href.startsWith('http')) {
      btn.target = '_blank';
      btn.rel = 'noopener noreferrer';
    }

    orbitalContainer.appendChild(btn);
  });

  // Organiza todos os botões em uma única linha
  orbitalContainer.style.position = 'absolute';
  orbitalContainer.style.left = '50%';
  orbitalContainer.style.top = '100%';
  orbitalContainer.style.transform = 'translateX(-50%)';
  orbitalContainer.style.width = '100%';
  orbitalContainer.style.height = 'auto';
  orbitalContainer.style.display = 'flex';
  orbitalContainer.style.flexDirection = 'row';
  orbitalContainer.style.justifyContent = 'center';
  orbitalContainer.style.alignItems = 'center';
  orbitalContainer.style.flexWrap = 'nowrap';
  orbitalContainer.style.gap = '18px';
  orbitalContainer.style.zIndex = '100';
});
