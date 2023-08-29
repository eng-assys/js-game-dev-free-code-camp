/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 700;

context.fillStyle = 'white';
context.fillRect(50, 50, 100, 150);