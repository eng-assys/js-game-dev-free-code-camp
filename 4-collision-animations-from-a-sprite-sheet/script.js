/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 700;
const explosionsArray = [];
let canvasPosition = canvas.getBoundingClientRect();

class Explosion {
  constructor(x, y) {
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.x = x - this.width / 2;
    this.y = y - this.height / 2;
    this.image = new Image();
    this.image.src = 'boom.png';
    this.frame = 0;
    this.timer = 0;
  }
  update() {
    this.timer++;
    if (this.timer % 5 === 0) this.frame++;
  }
  draw() {
    context.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}

window.addEventListener('click', e => {
  let positionX = e.x - canvasPosition.left;
  let positionY = e.y - canvasPosition.top;
  explosionsArray.push(new Explosion(positionX, positionY));
});

function animate() {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  explosionsArray.forEach((explosion, index) => {
    explosion.update();
    explosion.draw();
    if (explosion.frame > 5) explosionsArray.splice(index, 1);
  });
  requestAnimationFrame(animate);
}

animate();