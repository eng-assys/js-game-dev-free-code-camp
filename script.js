const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'shadow_dog.png';
const spriteWidth = 575; // 6876px width/12 columns = 573 (rounded to 575)
const spriteHeight = 523; // 5230px height/10 lines - 523
let frameX = 0;
let frameY = 0;

function animate() {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // context.drawImage(image, sourceX, sourceY, sourceW, sourceH, dx, dy, dw, dh);
  context.drawImage(
    playerImage,
    frameX * spriteWidth,
    frameY * spriteHeight,
    spriteWidth,
    spriteHeight,
    0,
    0,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
  );

  frameX = frameX < 6 ? frameX + 1 : 0;

  requestAnimationFrame(animate);
};

animate();