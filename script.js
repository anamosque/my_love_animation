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
  const cy = canvas.height * 0.55;

  ctx.beginPath();

  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
    let p = heart(i);

    let x = cx + p.x * scale;
    let y = cy + p.y * scale;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  ctx.closePath();

  // glow fuerte
  ctx.shadowBlur = 70;
  ctx.shadowColor = "#ff2e88";

  ctx.strokeStyle = "#ff2e88";
  ctx.lineWidth = 6;
  ctx.stroke();

  // relleno luminoso
  ctx.fillStyle = "rgba(255, 46, 136, 0.18)";
  ctx.fill();
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let base = Math.min(canvas.width, canvas.height) / 25;
  let pulse = Math.sin(t) * 6;

  drawHeart(base + pulse);
  drawHeart(base + 10 + pulse);
  drawHeart(base + 20 + pulse);

  t += 0.05;

  requestAnimationFrame(animate);
}

animate();
