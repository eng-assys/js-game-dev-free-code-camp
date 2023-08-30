/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;

let ravens = [];
class Raven {
  constructor() {
    this.image = new Image();
    this.image.src = 'assets/raven.png';
    this.spriteWidth = 271;
    this.spriteHeight = 194;
    this.sizeModifier = Math.random() * 0.6 + 0.4;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - this.height);
    this.directionX = Math.random() * 5 + 3;
    this.directionY = Math.random() * 5 - 2.5;
    this.markedForDeletion = false;
    this.frame = 0;
    this.maxFrame = 5;
  }
  update() {
    this.x -= this.directionX;
    if (this.x < 0 - this.width) this.markedForDeletion = true;
    this.frame = (this.frame >= this.maxFrame) ? 0 : this.frame + 1;
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

function animate(timestamp) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  timeToNextRaven += deltaTime;
  if (timeToNextRaven > ravenInterval) {
    ravens.push(new Raven());
    timeToNextRaven = 0;
  }
  ravens.forEach((raven, index) => {
    raven.update();
    raven.draw();
    if (raven.markedForDeletion) ravens.splice(index, 1);
  });
  requestAnimationFrame(animate);
};
animate(0);