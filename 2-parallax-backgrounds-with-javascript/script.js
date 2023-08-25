const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
const BACKGROUND_LAYER_SIZE = 2400; // in pixels
let gameSpeed = 5;

// Generate Layers Array
const backgroundLayer = [];
['1', '2', '3', '4', '5'].map(layerNumber => {
  let image = new Image();
  image.src = `assets/layer-${layerNumber}.png`
  backgroundLayer.push(image)
})

let x = 0;
let x2 = BACKGROUND_LAYER_SIZE; // Size in pixels of background image

function animate() {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  context.drawImage(backgroundLayer[3], x, 0);
  context.drawImage(backgroundLayer[3], x2, 0);

  x = x < -BACKGROUND_LAYER_SIZE ? BACKGROUND_LAYER_SIZE + x2 - gameSpeed : x - gameSpeed;
  x2 = x2 < -BACKGROUND_LAYER_SIZE ? BACKGROUND_LAYER_SIZE + x - gameSpeed : x2 - gameSpeed;

  requestAnimationFrame(animate);
}

animate();