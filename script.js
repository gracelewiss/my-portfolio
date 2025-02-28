document.querySelectorAll('.header-right a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').slice(1);
      document.getElementById(targetId).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.header-right a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').slice(1);
      document.getElementById(targetId).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  const fadeElements = document.querySelectorAll('.fade-in');
  const options = {
    threshold: 0.5 
  };

  const observer = new IntersectionObserver((entries, observer) => {
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
    audio.addEventListener('canplay', function() {
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

  
  