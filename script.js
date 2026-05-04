const canvas = document.getElementById("heart");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let t = 0;

function heart(t) {
  return {
    x: 16 * Math.pow(Math.sin(t), 3),
    y: -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t))
  };
}

function drawHeart(scale) {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  ctx.beginPath();

  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
    let p = heart(i);

    let x = cx + p.x * scale;
    let y = cy + p.y * scale;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  ctx.closePath();

  // 🔥 GRADIENTE (esto es lo que faltaba)
  let gradient = ctx.createRadialGradient(cx, cy, 10, cx, cy, 300);
  gradient.addColorStop(0, "#ff2e88");
  gradient.addColorStop(0.5, "#ff4da6");
  gradient.addColorStop(1, "transparent");

  // 💖 relleno luminoso
  ctx.fillStyle = gradient;
  ctx.fill();

  // ✨ glow fuerte real
  ctx.shadowBlur = 50;
  ctx.shadowColor = "#ff2e88";

  ctx.strokeStyle = "#ff2e88";
  ctx.lineWidth = 4;
  ctx.stroke();
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let pulse = Math.sin(t) * 1.5;

  drawHeart(18 + pulse);
  drawHeart(20 + pulse);
  drawHeart(22 + pulse);

  t += 0.05;

  requestAnimationFrame(animate);
}

animate();
