const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
const DEFAULT_LAYER_WIDTH = 2400;
const DEFAULT_LAYER_HEIGHT = CANVAS_HEIGHT;
const LAYERS_AMOUNT = 5;
let gameSpeed = 3;

const slider = document.getElementById('slider');
slider.value = gameSpeed;
const showGameSpeed = document.getElementById('showGameSpeed');
showGameSpeed.innerHTML = gameSpeed;
slider.addEventListener('change', e => {
  gameSpeed = e.target.value;
  showGameSpeed.innerHTML = e.target.value;
});

class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = DEFAULT_LAYER_WIDTH;
    this.height = DEFAULT_LAYER_HEIGHT;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * speedModifier;
  }
  update() {
    this.speed = gameSpeed * this.speedModifier;
    if (this.x <= -this.width) {
      this.x = 0;
    }
    this.x = Math.floor(this.x - this.speed);
  }
  draw() {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
  }
}

const backgroundImages = [];
for (let layerNumber = 0; layerNumber < LAYERS_AMOUNT; layerNumber++) {
  let image = new Image();
  image.src = `assets/layer-${layerNumber + 1}.png`
  backgroundImages.push(image);
}

const backgroundLayers = [];
backgroundImages.forEach((image, index) => {
  let layer = new Layer(image, 0.5 * index);
  backgroundLayers.push(layer);
})

function animate() {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  backgroundLayers.forEach(layer => {
    layer.update();
    layer.draw();
  });
  requestAnimationFrame(animate);
}

animate();