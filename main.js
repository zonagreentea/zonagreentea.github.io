function loop() {
  requestAnimationFrame(loop);

  const time = audio.currentTime * 1000;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const objects = generateObjects(time);

  for (const obj of objects) {
    drawCircle(obj);
  }
}
