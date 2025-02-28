  var angle;
  var theta = 0,
    frms = 580,
    c = 100;
  
  var canvas = document.getElementById('fractalTree');
  var ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;  // Set canvas width to window width
    canvas.height = 300;  // Adjust for the browser's bottom margin
  }
  
  function setup() {
    resizeCanvas(); // Adjust the canvas size initially
    window.addEventListener('resize', resizeCanvas); // Adjust canvas size when window is resized
    requestAnimationFrame(draw); // Start the animation loop
  }
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before each draw
  
    angle = map(Math.sin(theta), -1, 1, 0, Math.PI / 2);
  
    ctx.save(); // Save the current drawing context state
    ctx.translate(canvas.width / 2, canvas.height - 100); // Move to the center-bottom
  
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    branch(60, 1); // Start drawing the tree
  
    ctx.restore(); // Restore the drawing context to avoid transformations affecting other drawings
  
    theta += (2 * Math.PI) / frms; // Update angle for animation
  
    requestAnimationFrame(draw); // Continue the animation loop
  }
  
  function branch(len, generation) {
    // Draw the branch
    ctx.lineWidth = map(generation, 1, 10, 2, 1); // Change the branch thickness based on generation
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len); // Draw line upwards
    ctx.stroke();
  
    // Move to the end and shrink
    ctx.translate(0, -len);
    len *= 0.66; // Shrink length
  
    generation++;
  
    if (len > 2) {
      // Right branch
      ctx.save();
      ctx.rotate(angle); // Rotate right
      branch(len, generation);
      ctx.restore();
  
      // Left branch
      ctx.save();
      ctx.rotate(-angle); // Rotate left
      branch(len, generation);
      ctx.restore();
    }
  }
  
  function map(value, start1, stop1, start2, stop2) {
    return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
  }
  
  // Start the animation
  setup(); // Initialize setup and start drawing
  