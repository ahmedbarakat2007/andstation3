// script.js
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.getElementById('holder').appendChild(canvas);

let width, height;
const waves = [];
const waveCount = 5;
const amplitude = 30; // Increased amplitude for a more dramatic wave
const speed = 0.03; // Increased speed for smoother animation

class Wave {
  constructor(index) {
      this.index = index;
      this.offset = Math.random() * Math.PI * 2;
  }

  draw() {
      // Draw the bottom wave
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
          const y = height / 2 + Math.sin(x * 0.01 + this.offset + (this.index * 0.5)) * amplitude;
          ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      // Set the gradient for the bottom part
      const bottomGradient = ctx.createLinearGradient(0, height / 2, 0, height);
      bottomGradient.addColorStop(0, `rgba(0, 122, 255, ${0.5 - this.index * 0.1})`);
      bottomGradient.addColorStop(1, `rgba(0, 255, 255, ${0.3 - this.index * 0.1})`);

      ctx.fillStyle = bottomGradient;
      ctx.fill();

      // Draw the top wave (mirroring the bottom wave)
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
          const y = height / 2 - Math.sin(x * 0.01 + this.offset + (this.index * 0.5)) * amplitude;
          ctx.lineTo(x, y);
      }
      ctx.lineTo(width, 0);
      ctx.lineTo(0, 0);
      ctx.closePath();

      // Set the gradient for the top part
      const topGradient = ctx.createLinearGradient(0, 0, 0, height / 2);
      topGradient.addColorStop(0, `rgba(0, 255, 255, ${0.3 - this.index * 0.1})`);
      topGradient.addColorStop(1, `rgba(0, 122, 255, ${0.5 - this.index * 0.1})`);

      ctx.fillStyle = topGradient;
      ctx.fill();
  }

  update() {
      this.offset += speed;
  }
}

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

function init() {
    for (let i = 0; i < waveCount; i++) {
        waves.push(new Wave(i));
    }
    animate();
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    waves.forEach(wave => {
        wave.update();
        wave.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
resize();
init();
