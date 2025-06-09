const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
const audio = document.getElementById('birthdaySong');
const startButton = document.getElementById('startButton');
const birthdayImage = document.getElementById('birthdayImage');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const particles = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createHeartParticles(x, y) {
  const heartShape = [];
  const colors = ['#ff3366', '#ff6699', '#ff0033', '#ff99cc'];

  for (let t = 0; t < Math.PI * 2; t += 0.2) {
    const r = 10 * (1 - Math.sin(t));
    const px = x + r * Math.cos(t) * 5;
    const py = y - r * Math.sin(t) * 5;
    heartShape.push({ x: px, y: py });
  }

  for (let i = 0; i < heartShape.length; i++) {
    particles.push({
      x: heartShape[i].x,
      y: heartShape[i].y,
      radius: random(2, 4),
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * 2 * Math.PI,
      speed: random(1, 3),
      alpha: 1,
      decay: random(0.01, 0.02)
    });
  }
}

function createFirework() {
  const x = random(100, canvas.width - 100);
  const y = random(100, canvas.height / 2);
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff'];

  if (Math.random() < 0.5) {
    createHeartParticles(x, y);
    return;
  }

  for (let i = 0; i < 50; i++) {
    particles.push({
      x: x,
      y: y,
      radius: random(1, 3),
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * 2 * Math.PI,
      speed: random(2, 6),
      alpha: 1,
      decay: random(0.01, 0.02)
    });
  }
}

function updateParticles() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    p.alpha -= p.decay;
    if (p.alpha <= 0) {
      particles.splice(i, 1);
      continue;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function animate() {
  if (Math.random() < 0.2) createFirework();
  updateParticles();
  requestAnimationFrame(animate);
}

startButton.addEventListener('click', () => {
  startButton.style.display = 'none';
  audio.play().catch(e => console.log('Không thể phát âm thanh:', e));
  animate();
});

// 🎞️ Logic thay đổi ảnh ở trung tâm
const centerImages = [
  'images/person.jpg',
  'images/side1.jpg',
  'images/side2.jpg',
  'images/side3.jpg',
  'images/side4.jpg',
  'images/side5.jpg'
];

let currentCenter = 0;

function switchCenterImage() {
  birthdayImage.style.opacity = 0;

  setTimeout(() => {
    currentCenter = (currentCenter + 1) % centerImages.length;
    birthdayImage.src = centerImages[currentCenter];
    birthdayImage.style.opacity = 0.95;
  }, 1000);
}

setInterval(switchCenterImage, 5000); // đổi ảnh mỗi 5 giây

// Cho phép phát âm thanh khi người dùng click bất kỳ
window.addEventListener("click", () => {
  audio.muted = false;
  if (audio.paused) audio.play().catch(() => {});
});
