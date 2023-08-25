/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 100;
const enemiesList = [];

class Enemy {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
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

for (let enemyIndex = 0; enemyIndex < numberOfEnemies; enemyIndex++) {
  enemiesList.push(new Enemy());
}

function animate() {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemiesList.forEach(enemy => {
    enemy.update();
    enemy.draw();
  });
  requestAnimationFrame(animate);
}

animate();