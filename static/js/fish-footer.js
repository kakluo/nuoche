// 创建页脚和 canvas
const footer = document.createElement('footer');
footer.style.position = 'relative';
footer.style.height = '150px';
footer.style.backgroundColor = 'rgba(240, 248, 255, 0.8)';
footer.style.overflow = 'hidden';

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = 150;
footer.appendChild(canvas);
document.body.appendChild(footer);

const ctx = canvas.getContext('2d');
let fishArray = [];

// 鱼的构造函数
function Fish(x, y, speed, size) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.size = size;
  this.direction = Math.random() < 0.5 ? 1 : -1;

  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(100, 149, 237, 0.8)';
    ctx.fill();
    ctx.closePath();
  };

  this.update = function() {
    this.x += this.speed * this.direction;
    if (this.x > canvas.width || this.x < 0) {
      this.direction *= -1;
    }
    this.draw();
  };
}

// 初始化鱼群
function initFish() {
  fishArray = [];
  for (let i = 0; i < 10; i++) {
    let size = Math.random() * 10 + 5;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let speed = Math.random() * 2 + 1;
    fishArray.push(new Fish(x, y, speed, size));
  }
}

// 动画循环
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fishArray.forEach(fish => fish.update());
  requestAnimationFrame(animate);
}

// 运行
initFish();
animate();

// 监听窗口大小变化
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  initFish();
});
