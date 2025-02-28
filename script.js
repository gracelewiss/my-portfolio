document.querySelectorAll('.header-right a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').slice(1);
      document.getElementById(targetId).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  //fade in effect
document.addEventListener('DOMContentLoaded', function() {
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
});

//audio
const audio = document.getElementById('background-music');
  audio.addEventListener('canplay', function() {
    audio.volume = 0.5; 
  });


  