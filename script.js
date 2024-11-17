// Smooth scrolling for header links
document.querySelectorAll('.header-right a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').slice(1);
      document.getElementById(targetId).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  document.addEventListener('scroll', function () {
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        const position = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (position < windowHeight - 100) {
            item.style.opacity = 1;
            item.style.transform = 'translateX(0)';
        }
    });
});

// Add this to your script.js file
document.addEventListener('DOMContentLoaded', function() {
  const fadeElements = document.querySelectorAll('.fade-in');

  const options = {
    threshold: 0.5 // Trigger when 50% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once it's visible
      }
    });
  }, options);

  fadeElements.forEach(element => {
    observer.observe(element);
  });
});

const audio = document.getElementById('background-music');

  // Wait until the audio is fully loaded to adjust volume
  audio.addEventListener('canplay', function() {
    audio.volume = 0.5; 
  });


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
  