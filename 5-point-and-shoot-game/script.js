/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const collisionCanvas = document.getElementById('collisionCanvas');
const collisionContext = collisionCanvas.getContext('2d', { willReadFrequently: true });
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

let score = 0;
let gameOver = false;
context.font = '50px Impact';

let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;

let ravens = [];
let ravensPositionsByColor = {};

let explosions = [];

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
    this.timeSinceFlap = 0;
    this.flapInterval = Math.random() * 50 + 50;
    this.randomColors = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255)
    ]
    this.color = `rgb(${this.randomColors[0]},${this.randomColors[1]},${this.randomColors[0]})`;
  }
  update(deltaTime) {
    if (this.y < 0 || this.y > canvas.height - this.height) {
      this.directionY = -this.directionY;
    }
    this.x -= this.directionX;
    this.y += this.directionY;
    if (this.x < 0 - this.width) this.markedForDeletion = true;
    this.timeSinceFlap += deltaTime;
    if (this.timeSinceFlap > this.flapInterval) {
      this.frame = (this.frame >= this.maxFrame) ? 0 : this.frame + 1;
      this.timeSinceFlap = 0;
    }
    if (this.x < 0 - this.width) gameOver = true;
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
    collisionContext.fillStyle = this.color;
    collisionContext.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Explosion {
  constructor(x, y, size) {
    this.image = new Image();
    this.image.src = 'assets/boom.png';
    this.sound = new Audio();
    this.sound.src = 'assets/boom.wav';
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.x = x;
    this.y = y;
    this.size = size;
    this.frame = 0;
    this.timeSinceLastFrame = 0;
    this.frameInterval = 200;
    this.markedForDeletion = false;

  }
  update(deltaTime) {
    if (this.frame === 0) this.sound.play();
    this.timeSinceLastFrame += deltaTime;
    if (this.timeSinceLastFrame > this.frameInterval) {
      this.frame++;
      this.timeSinceLastFrame = 0;
      if (this.frame > 5) this.markedForDeletion = true;
    }
  }
  draw() {
    context.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y - this.size / 4,
      this.size,
      this.size
    );
  }
}

function drawScore() {
  context.fillStyle = 'black';
  context.fillText(`Score: ${score}`, 50, 75);
  context.fillStyle = 'white';
  context.fillText(`Score: ${score}`, 55, 80);
}

function drawGameOver() {
  context.textAlign = 'center';
  context.fillStyle = 'black';
  context.fillText(`GAME OVER, your score is ${score}`, canvas.width / 2, canvas.height / 2);
  context.fillStyle = 'white';
  context.fillText(`GAME OVER, your score is ${score}`, canvas.width / 2 + 5, canvas.height / 2 + 5);
}

window.addEventListener('click', e => {
  const detectPixelColor = collisionContext.getImageData(e.x, e.y, 1, 1);
  const pixelColor = detectPixelColor.data;

  const ravenColor = `rgb(${pixelColor[0]},${pixelColor[1]},${pixelColor[0]})`;
  let clickedRaven = ravens[ravensPositionsByColor[ravenColor]];
  if (clickedRaven) {
    clickedRaven.markedForDeletion = true;
    score++;
    explosions.push(new Explosion(
      clickedRaven.x,
      clickedRaven.y,
      clickedRaven.width
    ));
  }
});

function animate(timestamp) {
  collisionContext.clearRect(0, 0, canvas.width, canvas.height);
  context.clearRect(0, 0, canvas.width, canvas.height);
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  timeToNextRaven += deltaTime;

  drawScore();

  if (timeToNextRaven > ravenInterval) {
    ravens.push(new Raven());
    timeToNextRaven = 0;
    ravens.sort((a, b) => {
      return a.width - b.width;
    });
  }

  ravensPositionsByColor = {};
  ravens.forEach((raven, index) => {
    raven.update(deltaTime);
    raven.draw();
    if (raven.markedForDeletion) ravens.splice(index, 1);
    else ravensPositionsByColor[raven.color] = index;
  });

  explosions.forEach((explosion, index) => {
    explosion.update(deltaTime);
    explosion.draw();
    if (explosion.markedForDeletion) explosions.splice(index, 1);
  });
  if (!gameOver) requestAnimationFrame(animate);
  else drawGameOver();
};
animate(0);