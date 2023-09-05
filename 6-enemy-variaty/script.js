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

    }
    update() {

    }
    draw() {

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