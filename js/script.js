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
  // Fade-in animation
  const fadeElements = document.querySelectorAll('.fade-in');
  const options = {
    threshold: 0.2
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

  // Music controls
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

  const musicToggle = document.getElementById('music-toggle');

  if (musicToggle && audio) {
    const icon = musicToggle.querySelector('i');
    let isPlaying = false;

    musicToggle.addEventListener('click', function (e) {
      e.preventDefault();

      if (isPlaying) {
        audio.pause();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
      } else {
        audio.muted = false;
        audio.play();
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
      }

      isPlaying = !isPlaying;
    });
  }

  // Experience tab logic

  function showExperience(contentId, tabEl) {
    const section = document.getElementById("experience");
    if (!section) return;

    // hide only experience panels inside experience section
    section.querySelectorAll(".experience-content").forEach(panel => {
      panel.style.display = "none";
    });

    // remove active only from experience tabs
    section.querySelectorAll(".experience-tabs li").forEach(tab => {
      tab.classList.remove("active");
    });

    // show selected
    const selected = section.querySelector(`#${contentId}`);
    if (selected) selected.style.display = "block";

    // mark active
    if (tabEl) tabEl.classList.add("active");
  }

  const expSection = document.getElementById("experience");
  if (expSection) {
    const activeExpTab =
      expSection.querySelector(".experience-tabs li.active") ||
      expSection.querySelector(".experience-tabs li");

    if (activeExpTab) {
      showExperience("uoua", activeExpTab);
    }
  }

  window.showExperience = showExperience;

  function showLeadership(contentId, tabEl) {
    const section = document.getElementById("leadership");
    if (!section) return;

    section.querySelectorAll(".leadership-content").forEach(panel => {
      panel.style.display = "none";
    });

    section.querySelectorAll(".leadership-tabs li").forEach(tab => {
      tab.classList.remove("active");
    });

    const selected = section.querySelector(`#${contentId}`);
    if (selected) selected.style.display = "block";

    if (tabEl) tabEl.classList.add("active");
  }


  const leadSection = document.getElementById("leadership");
  if (leadSection) {
   const activeLeadTab =
      leadSection.querySelector(".leadership-tabs li.active") ||
      leadSection.querySelector(".leadership-tabs li");

    if (activeLeadTab) {
      showLeadership("wic", activeLeadTab);
    }
  }

  window.showLeadership = showLeadership;
});

