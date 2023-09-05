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
      this.enemyInterval = 1000;
      this.enemyTimer = 0;
    }
    update(deltaTime) {
      if (this.enemyTimer > this.enemyInterval) {
        this.#addNewEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach((enemy, index) => {
        if (!enemy.markedForDeletion) enemy.update();
        else this.enemies.splice(index, 1);
      });
    }
    draw() {
      this.enemies.forEach(enemy => enemy.draw());
    }
    #addNewEnemy() {
      this.enemies.push(new Enemy(this));
    }
  }

  class Enemy {
    constructor(game) {
      this.game = game;
      this.x = this.game.width;
      this.y = Math.random() * this.game.height;
      this.width = 100;
      this.height = 100;
      this.markedForDeletion = false;
    }
    update() {
      this.x--;
      if (this.x < 0 - this.width) this.markedForDeletion = true;
    }
    draw() {
      this.game.context.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  const game = new Game(context, canvas.width, canvas.height);
  let lastTime = 1;
  function animate(timeStamp) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp
    game.update(deltaTime);
    game.draw();
    requestAnimationFrame(animate);
  }

  animate(0);
});