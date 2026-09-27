document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('in-view'));
  }

  const backToTop = document.getElementById('backToTop');
  const updateBackToTop = () => {
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 450);
  };
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();
  if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent('Website enquiry - ' + data.get('service'));
      const body = encodeURIComponent(
        'Name: ' + data.get('name') + '\\n' +
        'Email: ' + data.get('email') + '\\n' +
        'Phone: ' + data.get('phone') + '\\n' +
        'Service: ' + data.get('service') + '\\n\\n' +
        'Message:\\n' + data.get('message')
      );
      const feedback = document.getElementById('formFeedback');
      // Replace vijay.a@dhruvinfotec.co.in in index.html with your real business email.
      window.location.href = 'mailto:vijay.a@dhruvinfotec.co.in?subject=' + subject + '&body=' + body;
      if (feedback) feedback.textContent = 'Your email app should open with the enquiry details. Please configure the business email address before publishing.';
    });
  }
});