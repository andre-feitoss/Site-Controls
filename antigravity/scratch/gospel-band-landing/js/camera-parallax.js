/* ==========================================================================
   CTRLS - Camera Parallax 3D Perspective Tilt System
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const stage = document.getElementById('stage-3d');
  const heroWrapper = document.getElementById('band-hero-wrapper');
  const bandImage = document.getElementById('band-image');

  if (!stage || !heroWrapper) return;

  let mouseX = 0, mouseY = 0;
  let targetRotateX = 0, targetRotateY = 0;
  let currentRotateX = 0, currentRotateY = 0;
  const lerpFactor = 0.08; // Smooth camera damping

  window.addEventListener('mousemove', (e) => {
    // Normalize mouse coordinates from -1 to 1 relative to window center
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    mouseX = (e.clientX - centerX) / centerX;
    mouseY = (e.clientY - centerY) / centerY;

    // Max tilt angles: 12 degrees X, 16 degrees Y
    targetRotateX = -mouseY * 12;
    targetRotateY = mouseX * 16;
  });

  // Touch support for mobile parallax
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX = (touch.clientX - centerX) / centerX;
      mouseY = (touch.clientY - centerY) / centerY;
      targetRotateX = -mouseY * 8;
      targetRotateY = mouseX * 10;
    }
  });

  // Reset to neutral on mouseleave
  document.addEventListener('mouseleave', () => {
    targetRotateX = 0;
    targetRotateY = 0;
  });

  function renderParallax() {
    // Smooth interpolation (LERP)
    currentRotateX += (targetRotateX - currentRotateX) * lerpFactor;
    currentRotateY += (targetRotateY - currentRotateY) * lerpFactor;

    // Apply 3D perspective transform
    stage.style.transform = `rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg)`;
    
    // Parallax depth shift for inner band image
    if (bandImage) {
      const imgShiftX = -currentRotateY * 0.8;
      const imgShiftY = currentRotateX * 0.8;
      bandImage.style.transform = `scale(1.06) translate(${imgShiftX.toFixed(2)}px, ${imgShiftY.toFixed(2)}px)`;
    }

    requestAnimationFrame(renderParallax);
  }

  renderParallax();
});
