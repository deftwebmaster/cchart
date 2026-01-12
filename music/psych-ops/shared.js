// Psych Ops - Shared Track Script

(function() {
  const lines = document.querySelectorAll('.line');
  const pivot = document.getElementById('pivot');
  const finale = document.getElementById('finale');
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // For reduced motion, just show everything
    lines.forEach(line => line.classList.add('visible'));
    if (pivot) pivot.classList.add('visible');
    if (finale) finale.classList.add('in-view');
    return;
  }

  // Line reveal observer
  const lineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target.closest('.verse');
        if (section) {
          const sectionLines = section.querySelectorAll('.line');
          const index = Array.from(sectionLines).indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
        } else {
          entry.target.classList.add('visible');
        }
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.1
  });

  lines.forEach(line => lineObserver.observe(line));

  // Pivot observer
  if (pivot) {
    const pivotObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.5
    });
    pivotObserver.observe(pivot);
  }

  // Finale observer
  if (finale) {
    const finaleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, {
      threshold: 0.3
    });
    finaleObserver.observe(finale);
  }
})();
