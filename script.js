const canvas = document.getElementById("heart");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let t = 0;

function heart(t) {
  return {
    x: 16 * Math.pow(Math.sin(t), 3),
    y: -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t))
  };
}

function drawHeart(scale, offsetX, offsetY, color) {
  ctx.beginPath();

  for (let i = 0; i <= Math.PI * 2; i += 0.02) {
    let p = heart(i + t);

    let x = offsetX + p.x * scale;
    let y = offsetY + p.y * scale;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  ctx.closePath();

  // efecto neón 🔥
  ctx.shadowBlur = 20;
  ctx.shadowColor = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;

  ctx.stroke();
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let centerX = canvas.width / 2;
  let centerY = canvas.height / 2;

  // múltiples capas para efecto glow
  drawHeart(20, centerX, centerY, "#ff2e88");
  drawHeart(22, centerX, centerY, "#ff4da6");
  drawHeart(24, centerX, centerY, "#ff80bf");

  t += 0.01;

  requestAnimationFrame(animate);
}

animate();
