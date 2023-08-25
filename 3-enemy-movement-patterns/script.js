/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;

enemy1 = {
  x: 10,
  y: 50,
  width: 100,
  height: 50
}

function animate() {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemy1.x++;
  enemy1.y++;
  context.fillRect(enemy1.x, enemy1.y, enemy1.width, enemy1.height);
  requestAnimationFrame(animate);
}

animate();