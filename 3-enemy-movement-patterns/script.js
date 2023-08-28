/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;

const enemiesArray = []

let gameFrame = 0;

class Enemy {
  constructor(image, spriteWidth, spriteHeight) {
    this.image = new Image();
    this.image.src = image;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
  }
  update() { }
  animateSprites(maxFrame) {
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > maxFrame ? this.frame = 0 : this.frame++;
    }
  }
  draw() {
    context.drawImage(
      this.image,
      this.frame * this.spriteWidth,
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

class FrontBat extends Enemy {
  constructor() {
    super('assets/enemy1.png', 293, 155);
  }
  update() {
    this.x += Math.random() * 15 - 7.5;
    this.y += Math.random() * 10 - 5;
    this.animateSprites(4);
  }
}

class HorizontalBat extends Enemy {
  constructor() {
    super('assets/enemy2.png', 266, 188);
    this.speed = Math.random() * 4 + 1;
    this.angle = 0;
    this.angleSpeed = Math.random() * 0.2;
    this.curve = Math.random() * 7;
  }
  update() {
    this.x -= this.speed;
    this.y += this.curve * Math.sin(this.angle);
    this.angle += this.angleSpeed;
    if (this.x + this.width < 0) this.x = canvas.width;
    this.animateSprites(4);
  }
}

class Ghost extends Enemy {
  constructor() {
    super('assets/enemy3.png', 218, 188);
    this.angle = 0;
    this.angleSpeed = Math.random() * 1.5 + 0.5;
  }
  update() {
    this.x = canvas.width / 2 * Math.sin(this.angle * Math.PI / 90) + canvas.width / 2 - this.width / 2;
    this.y = canvas.height / 2 * Math.sin(this.angle * Math.PI / 360) + canvas.height / 2 - this.height / 2;
    this.angle += this.angleSpeed;
    if (this.x + this.width < 0) this.x = canvas.width;
    this.animateSprites(4);
  }
}

class Wheel extends Enemy {
  constructor() {
    super('assets/enemy4.png', 293, 155);
  }
}

const enemiesDefinitions = [
  {
    class: FrontBat,
    amount: 0
  },
  {
    class: HorizontalBat,
    amount: 0
  },
  {
    class: Ghost,
    amount: 50
  },
  {
    class: Wheel,
    amount: 0
  }
]

enemiesDefinitions.forEach(enemy => {
  for (let i = 0; i < enemy.amount; i++) {
    enemiesArray.push(new enemy.class());
  }
})

function animate() {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemiesArray.forEach(enemy => {
    enemy.update();
    enemy.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}

animate();