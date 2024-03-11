const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
let isDrawing = false;

let lastX = 0;
let lastY = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Drawing variables
let hue = 0;
let lineWidth = 10;
let widthModifier = 0.2;

ctx.lineJoin = "round";
ctx.lineCap = "round";

function draw(e) {
  // left click only
  if (!isDrawing) return;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);

  // Modify values on each stroke
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.lineWidth = lineWidth;
  ctx.stroke();

  hue++;
  lineWidth += widthModifier;
  console.log(lineWidth);

  // Manage drawing variables
  [lastX, lastY] = [e.offsetX, e.offsetY];

  if (hue === 360) {
    hue = 0;
  }
  if (lineWidth >= 100) {
    widthModifier = -0.2;
  } else if (lineWidth <= 10) {
    widthModifier = 0.2;
  }
}

canvas.addEventListener("mousedown", (e) => {
  if (e.button !== 0) return;
  isDrawing = true;
  lineWidth = 10;
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue = 0;
});
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
