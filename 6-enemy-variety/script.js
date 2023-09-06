/** @type {HTMLCanvasElement} */
window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas1');
  const context = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 800;

  class Game {
    constructor(context, width, height) {
      this.context = context;
      this.width = width;
      this.height = height;
      this.enemies = [];
      this.enemyInterval = 700;
      this.enemyTimer = 0;
      this.enemyTypes = [Worm, Ghost, Spider];
    }
    update(deltaTime) {
      if (this.enemyTimer > this.enemyInterval) {
        this.#addNewEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach((enemy, index) => {
        if (!enemy.markedForDeletion) enemy.update(deltaTime);
        else this.enemies.splice(index, 1);
      });
    }
    draw() {
      this.enemies.forEach(enemy => enemy.draw());
    }
    #addNewEnemy() {
      const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
      this.enemies.push(new randomEnemy(this));
    }
  }

  class Enemy {
    constructor(game) {
      this.game = game;
      this.markedForDeletion = false;

      this.spriteWidth = 100;
      this.spriteHeight = 100;
      this.width = this.spriteWidth / 2;
      this.height = this.spriteHeight / 2;

      this.frameX = 0;
      this.maxFrame = 5;
      this.frameInterval = 100;
      this.frameTimer = 0;
      this.x = this.game.width;
      this.y = Math.random() * this.game.height;

      this.velocityX = 0.2;
      this.velocityY = 0;
      this.image;
    }
    update(deltaTime) {
      this.x -= this.velocityX * deltaTime;
      if (this.x < 0 - this.width) this.markedForDeletion = true;
      if (this.frameTimer > this.frameInterval) {
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = 0;
      } else {
        this.frameTimer += deltaTime;
      }
    }
    draw() {
      if (this.image) {
        this.game.context.drawImage(
          this.image,
          this.frameX * this.spriteWidth,
          0,
          this.spriteWidth,
          this.spriteHeight,
          this.x,
          this.y,
          this.width,
          this.height
        );
      } else {
        this.game.context.fillRect(this.x, this.y, this.width, this.height);
      }
    }
  }

  class Worm extends Enemy {
    constructor(game) {
      super(game);
      this.image = worm;
      this.spriteWidth = 229;
      this.spriteHeight = 171;
      this.width = this.spriteWidth / 2;
      this.height = this.spriteHeight / 2;
      this.x = this.game.width;
      this.y = this.game.height - this.height;
      this.velocityX = Math.random() * 0.1 + 0.1;
    }
  }

  class Ghost extends Enemy {
    constructor(game) {
      super(game);
      this.image = ghost;
      this.spriteWidth = 261;
      this.spriteHeight = 209;
      this.width = this.spriteWidth / 2;
      this.height = this.spriteHeight / 2;
      this.x = this.game.width;
      this.y = Math.random() * this.game.height * 0.8;
      this.velocityX = Math.random() * 0.2 + 0.1;
      this.angle = 0;
      this.curve = Math.random() * 3;
    }
    update(deltaTime) {
      super.update(deltaTime);
      this.y += Math.sin(this.angle) * this.curve;
      this.angle += 0.04;
    }
    draw() {
      this.game.context.save();
      this.game.context.globalAlpha = 0.7;
      super.draw();
      this.game.context.restore();
    }
  }

  class Spider extends Enemy {
    constructor(game) {
      super(game);
      this.image = spider;
      this.spriteWidth = 310;
      this.spriteHeight = 175;
      this.width = this.spriteWidth / 2;
      this.height = this.spriteHeight / 2;
      this.x = Math.random() * this.game.width;
      this.y = 0 - this.height;
      this.velocityX = 0;
      this.velocityY = Math.random() * 0.2 + 0.2;
      this.maxLength = Math.random() * this.game.height;
    }
    update(deltaTime) {
      super.update(deltaTime);
      if (this.y < 0 - this.height * 2) this.markedForDeletion = true;
      this.y += this.velocityY * deltaTime;
      if (this.y > 200) this.velocityY *= -1;
    }
    draw() {
      this.game.context.beginPath();
      this.game.context.moveTo(this.x + this.width / 2, 0);
      this.game.context.lineTo(this.x + this.width / 2, this.y + 10);
      this.game.context.stroke();
      super.draw();
    }
  }

  const game = new Game(context, canvas.width, canvas.height);
  let lastTime = 1;
  function animate(timeStamp) {

    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    game.context.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw();

    requestAnimationFrame(animate);
  }

  animate(0);
});