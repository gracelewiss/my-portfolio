document.querySelectorAll('.header-right a').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const fadeElements = document.querySelectorAll('.fade-in');
  const options = {
    threshold: 0.5 
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); 
      }
    });
  }, options);

  fadeElements.forEach(element => {
    observer.observe(element);
  });

  const audio = document.getElementById('background-music');

  if (audio) {
    audio.addEventListener('canplay', function () {
      audio.volume = 0.5; 
      audio.play(); 
      audio.muted = false; 
    });

    if (audio.paused) {
      audio.muted = false; 
      audio.play(); 
    }
  }
});
