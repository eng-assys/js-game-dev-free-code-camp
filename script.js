const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'shadow_dog.png';
let x = 0;
let y = 50;

function animate() {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  context.fillRect(x, y, 100, 100);
  x += 10;
  if (x === 600) {
    y = y >= 600 ? 0 : y + 10;
    x = 0;
  }

  requestAnimationFrame(animate);
}

animate();