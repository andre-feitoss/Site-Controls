/* ==========================================================================
   CTRLS - Cosmic Golden Particles Canvas System
   ========================================================================== */

(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4 - 0.2; // slight upward drift
      this.alpha = Math.random() * 0.7 + 0.2;
      this.maxAlpha = this.alpha;
      this.pulseSpeed = Math.random() * 0.02 + 0.005;
      
      // Color palette: 80% gold tones, 20% warm white
      const isGold = Math.random() > 0.2;
      if (isGold) {
        this.color = `rgba(212, 175, 55, ${this.alpha})`;
        this.glowColor = 'rgba(255, 223, 0, 0.8)';
      } else {
        this.color = `rgba(255, 255, 255, ${this.alpha})`;
        this.glowColor = 'rgba(255, 255, 255, 0.8)';
      }
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Pulse alpha for twinkling effect
      this.alpha += Math.sin(Date.now() * this.pulseSpeed) * 0.005;
      if (this.alpha < 0.1) this.alpha = 0.1;
      if (this.alpha > 0.9) this.alpha = 0.9;

      // Wrap boundaries
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      // Mouse repulsion / attraction
      if (mouse.x && mouse.y) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          let angle = Math.atan2(dy, dx);
          let force = (mouse.radius - dist) / mouse.radius;
          this.x -= Math.cos(angle) * force * 1.5;
          this.y -= Math.sin(angle) * force * 1.5;
        }
      }
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = this.size > 1.8 ? 12 : 4;
      ctx.shadowColor = this.glowColor;
      ctx.fill();
      ctx.restore();
    }
  }

  // Initialize particle array
  const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 9000), 120);
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Render loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw subtle radial gradient glow in background
    let bgGlow = ctx.createRadialGradient(width / 2, height / 2, 100, width / 2, height / 2, width * 0.7);
    bgGlow.addColorStop(0, 'rgba(212, 175, 55, 0.03)');
    bgGlow.addColorStop(1, 'rgba(7, 7, 9, 0)');
    ctx.fillStyle = bgGlow;
    ctx.fillRect(0, 0, width, height);

    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
})();
