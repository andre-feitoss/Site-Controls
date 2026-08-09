/* ==========================================================================
   CTRLS - Spatial Dimensional Camera Navigation & Matrix Grid Engine
   Pattern Flow:
   Page 1 (Hero)    -> Page 2 (Sobre):    RIGHT  (1, 0)
   Page 2 (Sobre)   -> Page 3 (Músicas):  DOWN   (1, 1)
   Page 3 (Músicas) -> Page 4 (Vídeos):   LEFT   (0, 1)
   Page 4 (Vídeos)  -> Page 5 (Agenda):   DOWN   (0, 2)
   Page 5 (Agenda)  -> Page 6 (Loja):     RIGHT  (1, 2)
   Page 6 (Loja)    -> Page 7 (Contato):  DOWN   (1, 3)
   ========================================================================== */

(function () {
  const gridPositions = {
    'hero':    { col: 0, row: 0, index: 1 },
    'sobre':   { col: 1, row: 0, index: 2 },
    'musicas': { col: 1, row: 1, index: 3 },
    'videos':  { col: 0, row: 1, index: 4 },
    'agenda':  { col: 0, row: 2, index: 5 },
    'loja':    { col: 1, row: 2, index: 6 },
    'contato': { col: 1, row: 3, index: 7 }
  };

  const sectionKeys = ['hero', 'sobre', 'musicas', 'videos', 'agenda', 'loja', 'contato'];
  let currentSectionIndex = 0;
  let isNavigating = false;

  document.addEventListener('DOMContentLoaded', () => {
    const spatialGrid = document.getElementById('spatial-grid');
    const navLinks = document.querySelectorAll('.nav-link, .logo-brand, a[href^="#"]');

    if (!spatialGrid) return;

    // Set up section absolute positioning on 2D Matrix Grid
    sectionKeys.forEach((key) => {
      const sec = document.getElementById(key);
      if (sec) {
        const { col, row } = gridPositions[key];
        sec.style.position = 'absolute';
        sec.style.left = `${col * 100}vw`;
        sec.style.top = `${row * 100}vh`;
        sec.style.width = '100vw';
        sec.style.height = '100vh';
        sec.style.overflowY = 'auto';
      }
    });

    window.navigateToSection = function (targetKey, triggerCtrlS = false) {
      if (isNavigating || !gridPositions[targetKey]) return;

      const currentKey = sectionKeys[currentSectionIndex];
      if (currentKey === targetKey) return;

      isNavigating = true;
      const targetPos = gridPositions[targetKey];
      const targetIndex = sectionKeys.indexOf(targetKey);

      // Check if we should trigger the CTRL S 3D keypress explosion variation
      const useCtrlSVariation = triggerCtrlS || (Math.random() > 0.4);

      if (useCtrlSVariation && window.triggerCtrlSExplosion) {
        window.triggerCtrlSExplosion(() => {
          performCameraSlide(targetPos, targetKey, targetIndex);
        });
      } else {
        performCameraSlide(targetPos, targetKey, targetIndex);
      }
    };

    function performCameraSlide(targetPos, targetKey, targetIndex) {
      const targetX = -targetPos.col * window.innerWidth;
      const targetY = -targetPos.row * window.innerHeight;

      // Spawn directional particle burst along motion vector
      if (window.spawnTransitionParticles) {
        window.spawnTransitionParticles(targetPos.col, targetPos.row);
      }

      // GSAP 3D Camera Travel with Motion Blur & Royal Blue Glow
      if (window.gsap) {
        gsap.to(spatialGrid, {
          x: targetX,
          y: targetY,
          duration: 1.3,
          ease: 'power4.inOut',
          onStart: () => {
            document.body.classList.add('in-transition');
          },
          onComplete: () => {
            currentSectionIndex = targetIndex;
            isNavigating = false;
            document.body.classList.remove('in-transition');
            // Update active nav links
            updateActiveNavLinks(targetKey);
          }
        });
      } else {
        // Fallback without GSAP
        spatialGrid.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
        currentSectionIndex = targetIndex;
        isNavigating = false;
        updateActiveNavLinks(targetKey);
      }
    }

    function updateActiveNavLinks(activeKey) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const key = href.replace('#', '');
          if (key === activeKey) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        }
      });
    }

    // Intercept click on internal anchor links
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.length > 1) {
          const targetKey = href.replace('#', '');
          if (gridPositions[targetKey]) {
            e.preventDefault();
            window.navigateToSection(targetKey, anchor.classList.contains('btn-gold'));
          }
        }
      }
    });

    // Keyboard Arrow / Page Navigation System
    window.addEventListener('keydown', (e) => {
      if (isNavigating || document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        const nextIndex = (currentSectionIndex + 1) % sectionKeys.length;
        window.navigateToSection(sectionKeys[nextIndex]);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        const prevIndex = (currentSectionIndex - 1 + sectionKeys.length) % sectionKeys.length;
        window.navigateToSection(sectionKeys[prevIndex]);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        const nextIndex = (currentSectionIndex + 1) % sectionKeys.length;
        window.navigateToSection(sectionKeys[nextIndex], true);
      }
    });

    // Touch Swipe Navigation for Mobile
    let touchStartX = 0, touchStartY = 0;
    window.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    });

    window.addEventListener('touchend', (e) => {
      if (isNavigating || e.changedTouches.length === 0) return;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const dx = touchEndX - touchStartX;
      const dy = touchEndY - touchStartY;

      if (Math.abs(dx) > 70 || Math.abs(dy) > 70) {
        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx < 0) {
            // Swipe Left -> next section
            const nextIndex = (currentSectionIndex + 1) % sectionKeys.length;
            window.navigateToSection(sectionKeys[nextIndex]);
          } else {
            // Swipe Right -> prev section
            const prevIndex = (currentSectionIndex - 1 + sectionKeys.length) % sectionKeys.length;
            window.navigateToSection(sectionKeys[prevIndex]);
          }
        }
      }
    });
  });
})();
