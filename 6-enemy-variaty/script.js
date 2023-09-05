/** @type {HTMLCanvasElement} */
document.addEventListener('load', () => {
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

  function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
  }

  animate();
});