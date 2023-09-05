/** @type {HTMLCanvasElement} */
window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas1');
  const context = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 800;

  class Game {
    constructor() {

    }
    update() {

    }
    draw() {

    }
    #addNewEnemy() {

    }
  }

  class Enemy {
    constructor() {
      this.x = 100;
      this.y = 100;
      this.width = 100;
      this.height = 100;
    }
    update() {
      this.x--;
    }
    draw() {
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  let lastTime = 1;
  function animate(timeStamp) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp

    requestAnimationFrame(animate);
  }

  animate(0);
});