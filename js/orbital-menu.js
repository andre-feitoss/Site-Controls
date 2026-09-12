/* ==========================================================================
   CTRLS - 3D Orbital Menu Math & Physics System
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const orbitalContainer = document.getElementById('orbital-container');
  if (!orbitalContainer) return;

  orbitalContainer.innerHTML = '';

  const links = [
    'YouTube',
    'Spotify',
    'Instagram',
    'TikTok',
    'Facebook',
    'LinkedIn',
    'Contato'
  ];

  links.forEach(nome => {
    const btn = document.createElement('button');
    btn.className = 'orbital-badge';
    btn.textContent = nome;
    orbitalContainer.appendChild(btn);
  });
});
