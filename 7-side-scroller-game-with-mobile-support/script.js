/** @type {HTMLCanvasElement} */
window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas1');
  const context = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 720;

  class InputHandler {
    constructor() {
      this.keys = [];
      window.addEventListener('keydown', e => {
        if ((e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight") && this.keys.indexOf(e.key) === -1) {
          this.keys.push(e.key);
        }
        console.log(e.key, this.keys);
      });

      window.addEventListener('keyup', e => {
        if (e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight") {
          this.keys.splice(this.keys.indexOf(e.key), 1);
        }
        console.log(e.key, this.keys);
      });
    }
  }

  class Player {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 200;
      this.height = 200;
      this.x = 0;
      this.y = this.gameHeight - this.height;
      this.image = document.getElementById('playerImage');
      this.frameX = 0;
      this.frameY = 0;
      this.speed = 0;
      this.velocityY = 0;
      this.weight = 1;
    }
    draw(context) {
      context.fillStyle = 'white';
      context.fillRect(this.x, this.y, this.width, this.height);
      context.drawImage(
        this.image,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    update() {
      if (input.keys.indexOf('ArrowRight') > -1) {
        this.speed = 5;
      } else if (input.keys.indexOf('ArrowLeft') > -1) {
        this.speed = -5;
      } else if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()) {
        this.velocityY -= 32;
      } else {
        this.speed = 0;
      }

      // Horizontal Movement
      this.x += this.speed;
      if (this.x < 0) this.x = 0;
      else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;

      // Vertical Movement
      this.y += this.velocityY;
      if (!this.onGround()) {
        this.velocityY += this.weight;
        this.frameY = 1;
      } else {
        this.velocityY = 0;
        this.frameY = 0;
      }
      if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
    }
    onGround() {
      return this.y >= this.gameHeight - this.height;
    }
  }

  class Background {

  }

  class Enemy {

  }

  function handleEnemies() {

  }

  function displayStatusText() {

  }

  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height);

  function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(context);
    player.update(input);
    requestAnimationFrame(animate);
  }
  animate();

});