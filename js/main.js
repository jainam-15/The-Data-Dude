/* ============================================
   THE DATA DUDE — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMobileNav();
    initScrollAnimations();
    initHeroParticles();
});

/* === Sticky Header === */
function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });
}

/* === Mobile Navigation === */
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.nav-overlay');

    if (!hamburger || !navMenu) return;

    function closeNav() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function openNav() {
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    hamburger.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            closeNav();
        } else {
            openNav();
        }
    });

    if (overlay) {
        overlay.addEventListener('click', closeNav);
    }

    // Close on link click
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeNav);
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeNav();
    });
}

/* === Scroll Animations (Intersection Observer) === */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

/* === Hero Particles === */
function initHeroParticles() {
    const container = document.querySelector('.hero-particles');
    if (!container) return;

    const particleCount = window.innerWidth < 768 ? 8 : 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 6 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 10;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        if (Math.random() > 0.5) {
            particle.style.background = 'rgba(15, 196, 201, 0.15)';
        }

        container.appendChild(particle);
    }
}
