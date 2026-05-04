const canvas = document.getElementById("heart");
const ctx = canvas.getContext("2d");

// tamaño pantalla
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// función corazón
function heart(t) {
  return {
    x: 16 * Math.pow(Math.sin(t), 3),
    y: -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t))
  };
}

// 🔥 DIBUJO FIJO (sin animación primero para probar)
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const scale = Math.min(canvas.width, canvas.height) / 30;
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

  // glow
  ctx.shadowBlur = 30;
  ctx.shadowColor = "#ff2e88";

  ctx.strokeStyle = "#ff2e88";
  ctx.lineWidth = 5;
  ctx.stroke();

  ctx.fillStyle = "rgba(255, 46, 136, 0.2)";
  ctx.fill();
}

draw();
