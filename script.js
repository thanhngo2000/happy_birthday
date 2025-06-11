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
  'images/side5.jpg',
  'images/side6.jpg',
  'images/side7.jpg',
  'images/side8.jpg',
  'images/side9.jpg',
  'images/side10.jpg',
  'images/side11.jpg'
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

const customWish = document.getElementById('customWish');

// Hiện sau 5 giây
setTimeout(() => {
  if (customWish) {
    customWish.style.display = 'block';
    // Kích hoạt hiệu ứng mờ dần vào
    requestAnimationFrame(() => {
      customWish.style.opacity = '1';
    });
  }

  // Sau 5 phút (300 giây), ẩn dòng chữ
  setTimeout(() => {
    if (customWish) {
      customWish.style.opacity = '0';
      setTimeout(() => {
        customWish.style.display = 'none';
      }, 1000); // Chờ hiệu ứng fade-out hoàn thành
    }
  }, 5000); 
}, 5000); // Đợi 5 giây sau khi load

const customWish2 = document.getElementById('customWish2');


setTimeout(() => {
  if (customWish2) {
    customWish2.style.display = 'block';
    requestAnimationFrame(() => {
      customWish2.style.opacity = '1';
    });
  }


  setTimeout(() => {
    if (customWish2) {
      customWish2.style.opacity = '0';
      setTimeout(() => {
        customWish2.style.display = 'none';
      }, 1000); 
    }
  }, 5000); 
}, 15000); 


const customWish3 = document.getElementById('customWish3');

// Sau 20 giây
setTimeout(() => {
  customWish3.style.display = 'block';

  // Bắt đầu trigger animation (scale up và opacity)
  requestAnimationFrame(() => {
    customWish3.style.opacity = '1';
    customWish3.style.transform = 'scale(1)';
  });

  // Sau khi hiệu ứng kết thúc (sau 5 giây), bắt đầu ẩn dần
  setTimeout(() => {
    customWish3.style.opacity = '0';
    // Sau khi opacity về 0, ẩn phần tử
    setTimeout(() => {
      customWish3.style.display = 'none';
    }, 500); // đợi opacity fade-out
  }, 5000); // biến mất sau 5 giây animation
}, 25000); 

const customWish4 = document.getElementById('customWish4');

// Sau 20 giây
setTimeout(() => {
  customWish4.style.display = 'block';

  // Bắt đầu trigger animation (scale up và opacity)
  requestAnimationFrame(() => {
    customWish4.style.opacity = '1';
    customWish4.style.transform = 'scale(1)';
  });

  // Sau khi hiệu ứng kết thúc (sau 5 giây), bắt đầu ẩn dần
  setTimeout(() => {
    customWish4.style.opacity = '0';
    // Sau khi opacity về 0, ẩn phần tử
    setTimeout(() => {
      customWish4.style.display = 'none';
    }, 500); // đợi opacity fade-out
  }, 5000); // biến mất sau 5 giây animation
}, 35000); 

const wishLine = document.getElementById("wish-line");

const wishes = [
  "Hiền: 🎉🎂 CHÚC MỪNG SINH NHẬT BÉ BÔNG SIÊU QUẬY! 🎂🎉",
  "Hôm nay là sinh nhật của một cô bé siêu cấp đáng yêu, siêu cấp tinh nghịch, siêu cấp ăn nhiều – chính là BÔNG ĐẠI TỶ!",
  "Chúc Bông tuổi mới:",
  "Lớn nhanh như thổi, ăn chóng lớn mà không cần ăn rau!",
  "Mỗi ngày đều cười khanh khách như bị chích... tickle!",
  "Thêm một tuổi nhưng không được thêm \"trò quậy\" nha – bố mẹ mệt lắm rồi!",
  "Luôn được tặng thật nhiều quà, nhưng đừng bóc quà rồi... vứt vỏ lung tung khắp nhà!"
];

// Thời điểm bắt đầu: sau 25s kể từ lúc chạy website (có thể thay đổi)
const startDelay = 45000; // 35s
const visibleDuration = 3000; // 3s hiển thị
const fadeDuration = 1000; // 1s mờ dần

function showWish(index) {
  if (index >= wishes.length) return;

  // Cập nhật nội dung và hiển thị
  wishLine.innerText = wishes[index];
  wishLine.style.opacity = "1";

  // Ẩn sau visibleDuration
  setTimeout(() => {
    wishLine.style.opacity = "0";
  }, visibleDuration);

  // Hiện dòng tiếp theo sau toàn bộ thời gian dòng hiện tại
  setTimeout(() => {
    showWish(index + 1);
  }, visibleDuration + fadeDuration);
}

// Kích hoạt chuỗi lời chúc sau khi trễ 25s
setTimeout(() => {
  showWish(0);
}, startDelay);


// const delayedLine = document.getElementById("delayed-line");

// const delayedTexts = [
//   "Tài Bùi",
//   "E viết dùm anh đoạn lời chúc sinh nhật của e gửi cho bông anh sẽ bỏ vào quà",
//   "(1 phút sau)",
//   "Ok anh",
//   "(6 tiếng sau)",
//   "e nhớ viết giúp anh lời chúc mừng sinh nhật cho Bông nhé",
//   "(11 tiếng sau)",
//   "ok anh",
//   "(3 tiếng sau)",
//   "viết đi nha. Hôm nay anh chốt quà r. Xong r ko sửa đc",
//   "Và rồi nó không gửi"
// ];

// const delayedStart = 65000; // bắt đầu 1 phút sau + chờ phần chúc trước chạy xong
// const visibleTime = 3000;
// const fadeTime = 1000;

// function showDelayedText(index) {
//   if (index >= delayedTexts.length) return;

//   delayedLine.innerText = delayedTexts[index];
//   delayedLine.style.opacity = "1";

//   setTimeout(() => {
//     delayedLine.style.opacity = "0";
//   }, visibleTime);

//   setTimeout(() => {
//     showDelayedText(index + 1);
//   }, visibleTime + fadeTime);
// }

// Khởi động hiệu ứng sau thời gian chờ
// setTimeout(() => {
//   showDelayedText(0);
// }, delayedStart);


const anhThanhLine = document.getElementById("wish-anh-thanh-line");

const anhThanhTexts = [
  "Anh Thành",
  "Chúc em tuổi mới:",
  "Học hành tấn tới, gia đình vui vẻ, tình duyên thuận lợi",
  "Ngày càng xinh đẹp, ăn không lo mập, ngủ không lo muộn,",
  "Xài tiền như nước… nước người khác trả!",
  "Hổng còn là em út nữa",
  "Nên là hết được mọi người chiều rồi nghen em",
  "Lì là anh xử đẹp tại chỗ đấy"
];

const anhThanhStartDelay = 80000; // chờ phần trước chạy xong + 13.5s
const showDuration = 3000;
// const fadeDuration = 1000;

function showAnhThanhLine(index) {
  if (index >= anhThanhTexts.length) return;

  anhThanhLine.innerText = anhThanhTexts[index];
  anhThanhLine.style.opacity = "1";
  anhThanhLine.style.transform = "scale(1.05)";

  setTimeout(() => {
    anhThanhLine.style.opacity = "0";
    anhThanhLine.style.transform = "scale(0.95)";
  }, showDuration);

  setTimeout(() => {
    showAnhThanhLine(index + 1);
  }, showDuration + fadeDuration);
}

setTimeout(() => {
  showAnhThanhLine(0);
}, anhThanhStartDelay);

