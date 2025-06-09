const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
const audio = document.getElementById('birthdaySong');
const startButton = document.getElementById('startButton');

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
  if (Math.random() < 0.5) {
    createHeartParticles(random(100, canvas.width - 100), random(100, canvas.height / 2));
    return;
  }

  const x = random(100, canvas.width - 100);
  const y = random(100, canvas.height / 2);
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff'];

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

// Ảnh hai bên
const leftSide = document.querySelector('.left-side');
const rightSide = document.querySelector('.right-side');

const sideImages = [
  'images/side1.jpg',
  'images/side2.jpg',
  'images/side3.jpg',
  'images/side4.jpg',
  'images/side5.jpg'
];

let currentIndex = 0;
let isShowing = false;

function showSideImages() {
  if (isShowing) return; // Tránh hiển thị đè lên nhau

  isShowing = true;

  const imgLeft = sideImages[currentIndex % sideImages.length];
  const imgRight = sideImages[(currentIndex + 1) % sideImages.length];

  leftSide.style.backgroundImage = `url(${imgLeft})`;
  rightSide.style.backgroundImage = `url(${imgRight})`;

  leftSide.style.opacity = 1;
  rightSide.style.opacity = 1;

  // Giữ hình trong 4 giây rồi ẩn dần
  setTimeout(() => {
    leftSide.style.opacity = 0;
    rightSide.style.opacity = 0;

    // Chờ thêm 2 giây sau khi ẩn xong mới cho hiện ảnh mới
    setTimeout(() => {
      currentIndex = (currentIndex + 2) % sideImages.length;
      isShowing = false;
    }, 2000); // Trùng với transition opacity (2s)
  }, 4000); // Thời gian hình hiển thị trước khi bắt đầu ẩn
}
// Gọi mỗi 6 giây thay vì 3s
setInterval(showSideImages, 4000);

// Phát nhạc khi click bất kỳ đâu nếu chưa phát
window.addEventListener("click", () => {
  audio.muted = false;
  if (audio.paused) audio.play().catch(() => {});
});
