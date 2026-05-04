const canvas = document.getElementById("heart");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let time = 0;

// función corazón
function heart(t) {
  return {
    x: 16 * Math.pow(Math.sin(t), 3),
    y: -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t))
  };
}

// dibuja corazón con glow real
function drawNeonHeart(scale, glowIntensity) {
  let cx = canvas.width / 2;
  let cy = canvas.height / 2;

  ctx.beginPath();

  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
    let p = heart(i);

    let x = cx + p.x * scale;
    let y = cy + p.y * scale;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  ctx.closePath();

  // glow fuerte 🔥
  ctx.shadowBlur = glowIntensity;
  ctx.shadowColor = "#ff2e88";

  ctx.strokeStyle = "#ff2e88";
  ctx.lineWidth = 3;
  ctx.stroke();

  // relleno suave (esto hace que ya no se vea “líneas vacías”)
  ctx.fillStyle = "rgba(255, 46, 136, 0.08)";
  ctx.fill();
}

// animación con latido 💓
function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let pulse = Math.sin(time) * 2;

  // capas para efecto neón real
  drawNeonHeart(20 + pulse, 25);
  drawNeonHeart(22 + pulse, 40);
  drawNeonHeart(24 + pulse, 60);

  time += 0.05;

  requestAnimationFrame(animate);
}

animate();
