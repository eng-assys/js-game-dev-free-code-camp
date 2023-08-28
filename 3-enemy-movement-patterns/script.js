/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;
const enemies = [
  {
    name: 'front_bats',
    sprite: 'assets/enemy1.png',
    amount: 20,
    spriteWidth: 293,
    spriteHeight: 155
  },
  {
    name: 'horizontal_bats',
    sprite: 'assets/enemy2.png',
    amount: 10,
    spriteWidth: 293,
    spriteHeight: 155
  },
  {
    name: 'ghosts',
    sprite: 'assets/enemy3.png',
    amount: 6,
    spriteWidth: 293,
    spriteHeight: 155
  },
  {
    name: 'wheels',
    sprite: 'assets/enemy4.png',
    amount: 8,
    spriteWidth: 293,
    spriteHeight: 155
  },
];
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
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
  }
  update() {
    this.x += Math.random() * 5 - 2.5;
    this.y += Math.random() * 5 - 2.5;
    // animate sprites
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? this.frame = 0 : this.frame++;
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
    super(
      enemies[0].sprite,
      enemies[0].spriteWidth,
      enemies[0].spriteHeight
    );
  }
}

class HorizontalBat extends Enemy {
  constructor() {
    super(
      enemies[1].sprite,
      enemies[1].spriteWidth,
      enemies[1].spriteHeight
    );
  }
}

class Ghost extends Enemy {
  constructor() {
    super(
      enemies[2].sprite,
      enemies[2].spriteWidth,
      enemies[2].spriteHeight
    );
  }
}

class Wheel extends Enemy {
  constructor() {
    super(
      enemies[3].sprite,
      enemies[3].spriteWidth,
      enemies[3].spriteHeight
    );
  }
}

const enemyClasses = {
  front_bats: FrontBat,
  horizontal_bats: HorizontalBat,
  ghosts: Ghost,
  wheels: Wheel
}

enemies.forEach(enemy => {
  for (let i = 0; i < enemy.amount; i++) {
    enemiesArray.push(new enemyClasses[enemy.name]());
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