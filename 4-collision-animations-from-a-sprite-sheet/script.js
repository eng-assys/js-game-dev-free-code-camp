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
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = 'boom.png';
    this.frame = 0;
    this.timer = 0;
    this.angle = Math.random() * 6.2 // in radians - 360° is about 6.2 radians
  }
  update() {
    this.timer++;
    if (this.timer % 5 === 0) this.frame++;
  }
  draw() {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      0 - this.width / 2,
      0 - this.height / 2,
      this.width,
      this.height
    );
    context.restore();
  }
}

function createAnimation(e) {
  let positionX = e.x - canvasPosition.left;
  let positionY = e.y - canvasPosition.top;
  explosionsArray.push(new Explosion(positionX, positionY));
}

window.addEventListener('click', e => {
  createAnimation(e);
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