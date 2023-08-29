/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 700;
const explosionsArray = [];
let gameFrame = 0;
let canvasPosition = canvas.getBoundingClientRect();

class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.image = new Image();
    this.image.src = 'boom.png';
    this.frame = 0;
  }
  update() {
    this.frame = this.frame > 4 ? -1 : this.frame + 1;
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
  let explosion = new Explosion(
    e.x - canvasPosition.left,
    e.y - canvasPosition.top
  );
  explosionsArray.push(explosion);
});

function animate() {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  explosionsArray.forEach((explosion, index) => {
    explosion.update();
    explosion.draw();
    if (explosion.frame === -1) explosionsArray.splice(index, 1);
  });
  gameFrame++;
  requestAnimationFrame(animate);
}

animate();