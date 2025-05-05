var angle;
var theta = 0,      // controls animation cycle using sine wave
    frms = 700,     // how long one full animation cycle lasts
    c = 100;        

var canvas = document.getElementById('fractalTree');
var ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth; // makes it full width
  canvas.height = canvas.parentElement.offsetHeight; // keeps height based on container
}

function setup() {
  resizeCanvas(); // run once on load
  window.addEventListener('resize', resizeCanvas); // auto resize if window changes
  requestAnimationFrame(draw); // loop starts here
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clean canvas each frame

  const minAngle = Math.PI / 10; // cap so branches never collapse straight
  const maxAngle = Math.PI / 2;  // max open angle
  angle = map(Math.sin(theta), -1, 1, minAngle, maxAngle); // oscillate between those

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height - 10); // move to bottom center

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  branch(100, 1); // draw tree from root

  ctx.restore();

  theta += (2 * Math.PI) / frms; // step forward in cycle

  requestAnimationFrame(draw); // next frame
}

function branch(len, generation) {
  ctx.lineWidth = map(generation, 1, 10, 2, 1); // thinner as it goes up
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -len); // draw up
  ctx.stroke();

  ctx.translate(0, -len); // move to branch tip
  len *= 0.66; // shorten next gen

  generation++;

  if (len > 2) { // keep going until branches are too small
    ctx.save();
    ctx.rotate(angle);
    branch(len, generation);
    ctx.restore();

    ctx.save();
    ctx.rotate(-angle);
    branch(len, generation);
    ctx.restore();
  }
}

function map(value, start1, stop1, start2, stop2) {
  return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
}

setup(); 
