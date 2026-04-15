const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- AUDIO (single timeline source) ---
const audio = new Audio("song.mp3");
audio.volume = 0.8;

let started = false;

// --- OBJECTS (your "map") ---
const objects = [
  { time: 2000, x: 300, y: 300 },
  { time: 4000, x: 600, y: 200 },
  { time: 6000, x: 800, y: 500 }
];

// --- START (required for browser autoplay rules) ---
window.addEventListener("click", () => {
  if (!started) {
    audio.play();
    started = true;
  }
});

// --- MAIN LOOP (THE MIX) ---
function loop() {
  requestAnimationFrame(loop);

  const time = audio.currentTime * 1000;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // background (alive but simple)
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // --- rolling polling (core concept) ---
  for (const obj of objects) {
    const dt = time - obj.time;

    if (dt > -1000 && dt < 1000) {
      drawCircle(obj, dt);
    }
  }

  // tiny debug HUD
  ctx.fillStyle = "white";
  ctx.fillText(`time: ${time.toFixed(0)}`, 20, 30);
}

// --- RENDER ---
function drawCircle(obj, dt) {
  const progress = 1 - Math.abs(dt) / 1000;
  const radius = 50 * Math.max(progress, 0.2);

  ctx.beginPath();
  ctx.arc(obj.x, obj.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
}

loop();
