/* ==========================================================================
   CTRLS - 3D Keypress & Musical Particle Explosion Engine
   Features:
   - 3D Keycaps for [ CTRL ] and [ S ]
   - Mechanical 3D Keypress Motion
   - Luminous Royal Blue & Gold Spark Explosion
   - Musical Notes (♪, ♫, ♬, ♩) & Soundwaves Particle Burst
   ========================================================================== */

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    // Create transition overlay container
    const transitionOverlay = document.createElement('div');
    transitionOverlay.id = 'ctrls-transition-overlay';
    transitionOverlay.innerHTML = `
      <canvas id="ctrls-particle-canvas"></canvas>
      <div class="ctrls-3d-keys-container">
        <div class="keycap-3d" id="keycap-ctrl">
          <span class="key-top">CTRL</span>
          <span class="key-side"></span>
        </div>
        <div class="keycap-3d" id="keycap-s">
          <span class="key-top">S</span>
          <span class="key-side"></span>
        </div>
      </div>
    `;
    document.body.appendChild(transitionOverlay);

    const canvas = document.getElementById('ctrls-particle-canvas');
    const ctx = canvas.getContext('2d');
    const keyCtrl = document.getElementById('keycap-ctrl');
    const keyS = document.getElementById('keycap-s');

    let particles = [];
    let isAnimating = false;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const musicalNotes = ['♪', '♫', '♬', '♩', '∮', '♭', '♯'];
    const colors = [
      'rgba(0, 82, 255, 0.95)',   // Royal Blue
      'rgba(0, 229, 255, 0.95)',  // Neon Cyan
      'rgba(255, 255, 255, 0.95)',// Pure White
      'rgba(212, 175, 55, 0.95)', // Gold Accent
      'rgba(120, 80, 255, 0.95)'  // Neon Purple
    ];

    class TransitionParticle {
      constructor(x, y, type = 'note') {
        this.x = x;
        this.y = y;
        this.type = type;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 12 + 4;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.size = Math.random() * 18 + 12;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.015;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.1;
        this.noteSymbol = musicalNotes[Math.floor(Math.random() * musicalNotes.length)];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.waveRadius = 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.96;
        this.vy *= 0.96;
        this.alpha -= this.decay;
        this.rotation += this.rotSpeed;
        this.waveRadius += 6;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(this.alpha, 0);

        if (this.type === 'note') {
          ctx.translate(this.x, this.y);
          ctx.rotate(this.rotation);
          ctx.font = `bold ${this.size}px Outfit, sans-serif`;
          ctx.fillStyle = this.color;
          ctx.shadowBlur = 15;
          ctx.shadowColor = this.color;
          ctx.fillText(this.noteSymbol, 0, 0);
        } else if (this.type === 'spark') {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.shadowBlur = 20;
          ctx.shadowColor = '#00e5ff';
          ctx.fill();
        } else if (this.type === 'wave') {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.waveRadius, 0, Math.PI * 2);
          ctx.strokeStyle = this.color;
          ctx.lineWidth = 3;
          ctx.shadowBlur = 15;
          ctx.shadowColor = this.color;
          ctx.stroke();
        }

        ctx.restore();
      }
    }

    function renderParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].alpha <= 0) {
          particles.splice(i, 1);
        }
      }
      if (particles.length > 0) {
        requestAnimationFrame(renderParticles);
      }
    }

    // Directional transition particle burst along camera travel
    window.spawnTransitionParticles = function (col, row) {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      for (let i = 0; i < 40; i++) {
        const type = Math.random() > 0.4 ? 'note' : (Math.random() > 0.5 ? 'spark' : 'wave');
        particles.push(new TransitionParticle(centerX + (Math.random() - 0.5) * 300, centerY + (Math.random() - 0.5) * 300, type));
      }
      renderParticles();
    };

    // CTRL S Keypress & Particle Explosion
    window.triggerCtrlSExplosion = function (onComplete) {
      if (isAnimating) return;
      isAnimating = true;

      transitionOverlay.classList.add('active');

      // Step 1: Keycaps entrance 3D animation
      if (window.gsap) {
        gsap.set([keyCtrl, keyS], { scale: 0, opacity: 0, rotationX: 45 });
        gsap.to([keyCtrl, keyS], {
          scale: 1,
          opacity: 1,
          rotationX: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          onComplete: pressKeys
        });
      } else {
        keyCtrl.style.opacity = '1';
        keyS.style.opacity = '1';
        setTimeout(pressKeys, 400);
      }

      // Step 2: Mechanical 3D keypress & spark explosion
      function pressKeys() {
        keyCtrl.classList.add('pressed');
        keyS.classList.add('pressed');

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Spawn 80 explosive musical particles & sparks
        for (let i = 0; i < 85; i++) {
          const type = i % 3 === 0 ? 'note' : (i % 3 === 1 ? 'spark' : 'wave');
          particles.push(new TransitionParticle(centerX, centerY, type));
        }
        renderParticles();

        if (onComplete) onComplete();

        // Step 3: Fade out keycaps & reveal page
        setTimeout(() => {
          if (window.gsap) {
            gsap.to([keyCtrl, keyS], {
              scale: 1.4,
              opacity: 0,
              duration: 0.4,
              ease: 'power2.in',
              onComplete: finishTransition
            });
          } else {
            finishTransition();
          }
        }, 500);
      }

      function finishTransition() {
        keyCtrl.classList.remove('pressed');
        keyS.classList.remove('pressed');
        transitionOverlay.classList.remove('active');
        isAnimating = false;
      }
    };
  });
})();
