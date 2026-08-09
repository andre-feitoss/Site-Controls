/* ==========================================================================
   CTRLS - 3D Orbital Menu Math & Physics System
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const orbitalContainer = document.getElementById('orbital-container');
  if (!orbitalContainer) return;

  const platforms = [
    { name: 'YouTube', icon: 'fab fa-youtube', url: 'https://www.youtube.com/@controladosprasalvar/shorts', isInternal: false },
    { name: 'Spotify', icon: 'fab fa-spotify', url: 'https://open.spotify.com/intl-pt/album/1gALQbFq8B3aNmqkhYyy3A', isInternal: false },
    { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://www.instagram.com/controladosprasalvar/', isInternal: false },
    { name: 'TikTok', icon: 'fab fa-tiktok', url: 'https://www.tiktok.com/@controlados.pra.s', isInternal: false },
    { name: 'Facebook', icon: 'fab fa-facebook-f', url: 'https://facebook.com', isInternal: false },
    { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/in/controlados-pra-salvar-81848b424/', isInternal: false },
    { name: 'Apple Music', icon: 'fab fa-apple', url: 'https://music.apple.com/us/search?term=controlados%20pra%20salvar', isInternal: false },
    { name: 'Amazon Music', icon: 'fab fa-amazon', url: 'https://music.amazon.co.jp/artists/B0H7NF1JSQ/controlados-pra-salvar', isInternal: false },
    { name: 'YouTube Music', icon: 'fas fa-play-circle', url: 'https://music.youtube.com/watch?v=e7FscCD7jrc&list=RDAMVMe7FscCD7jrc', isInternal: false },
    { name: 'Cifras Club', icon: 'fas fa-guitar', url: 'https://www.cifraclub.com.br/controlados-pra-salvar/dez-vezes-mais/', isInternal: false },
    { name: 'Loja', icon: 'fas fa-shopping-bag', url: '#loja', isInternal: true },
    { name: 'Agenda', icon: 'fas fa-calendar-alt', url: '#agenda', isInternal: true },
    { name: 'Contato', icon: 'fas fa-envelope', url: '#contato', isInternal: true }
  ];

  const totalItems = platforms.length;
  let badges = [];
  let currentAngle = 0;
  let orbitSpeed = 0.003; // Smooth rotation speed
  let isHovered = false;

  // Create badge elements
  platforms.forEach((item, index) => {
    const badge = document.createElement('a');
    badge.className = 'orbital-badge';
    badge.href = item.url;
    if (!item.isInternal) {
      badge.target = '_blank';
      badge.rel = 'noopener noreferrer';
    }

    badge.innerHTML = `<i class="${item.icon}"></i><span>${item.name}</span>`;

    // Pause rotation on hover & elevate item
    badge.addEventListener('mouseenter', () => {
      isHovered = true;
    });

    badge.addEventListener('mouseleave', () => {
      isHovered = false;
    });

    if (item.isInternal) {
      badge.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = document.querySelector(item.url);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    orbitalContainer.appendChild(badge);
    badges.push(badge);
  });

  // Calculate 3D Ellipse Radii based on screen width
  function getRadii() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 600) {
      return { rx: 170, ry: 80, rz: 60 };
    } else if (screenWidth <= 992) {
      return { rx: 340, ry: 130, rz: 100 };
    } else {
      return { rx: 480, ry: 180, rz: 140 };
    }
  }

  // Animation Loop
  function updateOrbit() {
    if (!isHovered) {
      currentAngle += orbitSpeed;
    }

    const { rx, ry, rz } = getRadii();

    badges.forEach((badge, i) => {
      const angle = (2 * Math.PI * i) / totalItems + currentAngle;
      
      // Elliptical coordinates
      const x = rx * Math.cos(angle);
      const y = ry * Math.sin(angle);
      const z = rz * Math.sin(angle);

      // Depth math: scale, opacity, z-index
      const scale = 0.7 + ((z + rz) / (2 * rz)) * 0.45; // scale between 0.70 and 1.15
      const opacity = 0.6 + ((z + rz) / (2 * rz)) * 0.4; // opacity between 0.6 and 1.0
      const zIndex = Math.round(((z + rz) / (2 * rz)) * 40) + 10;

      // Apply transform if not currently hovered directly
      if (!badge.matches(':hover')) {
        badge.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) scale(${scale.toFixed(2)})`;
        badge.style.opacity = opacity.toFixed(2);
        badge.style.zIndex = zIndex;
      }
    });

    requestAnimationFrame(updateOrbit);
  }

  updateOrbit();
});
