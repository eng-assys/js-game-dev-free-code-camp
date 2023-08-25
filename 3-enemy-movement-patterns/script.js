/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;

class Enemy {
  constructor() {
    this.x = 10;
    this.y = 50;
    this.width = 100;
    this.height = 50;
  }
  update() {
    this.x++;
    this.y++;
  }
  draw() {
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

const enemy1 = new Enemy();

function animate() {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemy1.update();
  enemy1.draw();
  requestAnimationFrame(animate);
}

animate();