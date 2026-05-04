const canvas = document.getElementById("heart");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function heartShape(t) {
  return {
    x: 16 * Math.pow(Math.sin(t), 3),
    y: -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t))
  };
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 2 + 1;
    this.alpha = 1;
  }

  draw() {
    ctx.fillStyle = "rgba(255, 0, 120," + this.alpha + ")";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    this.alpha -= 0.01;
  }
}

function createHeart() {
  for (let i = 0; i < Math.PI * 2; i += 0.15) {
    let pos = heartShape(i);
    let x = canvas.width / 2 + pos.x * 20;
    let y = canvas.height / 2 + pos.y * 20;
    particles.push(new Particle(x, y));
  }
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  createHeart();

  particles.forEach((p, index) => {
    p.update();
    p.draw();
    if (p.alpha <= 0) particles.splice(index, 1);
  });

  requestAnimationFrame(animate);
}

animate();
