    // Navbar scroll shadow
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 30);
      });
    }
    });

    function toggleNav() {
      document.getElementById('navLinks').classList.toggle('open');
    }

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
      console.log(entries);
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      });
    });
