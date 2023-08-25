/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;
const ENEMIES_AMOUNT = 4;
const numberOfEnemies = 100;
const enemiesArray = [];

const enemiesImages = [];
for (let enemyNumber = 0; enemyNumber < ENEMIES_AMOUNT; enemyNumber++) {
  let image = new Image();
  image.src = `assets/enemy${enemyNumber + 1}.png`
  enemiesImages.push(image);
}

class Enemy {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.speed = Math.random() * 4 - 2;
    this.spriteWidth = 293;
    this.spriteHeight = 155;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
  }
  update() {
    this.x += this.speed;
    this.y += this.speed;
  }
  draw() {
    context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(
      enemiesImages[0],
      0,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}



for (let enemyIndex = 0; enemyIndex < numberOfEnemies; enemyIndex++) {
  enemiesArray.push(new Enemy());
}

function animate() {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemiesArray.forEach(enemy => {
    enemy.update();
    enemy.draw();
  });
  requestAnimationFrame(animate);
}

animate();