// D AL TAMIMI CAPITAL - ENHANCED JAVASCRIPT
// World-class interactive functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Enhanced Header Scroll Effects
    const header = document.querySelector('.header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const scrollY = window.scrollY;
        
        // Add/remove scrolled class
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (scrollY > lastScrollY && scrollY > 200) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Mobile Menu Toggle
    if (mobileToggle && navMobile) {
        mobileToggle.addEventListener('click', function() {
            mobileToggle.classList.toggle('active');
            navMobile.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });

        // Close mobile menu on link click
        navMobile.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMobile.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
    }

    // Smooth Scroll for Hero Scroll Indicator
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', () => {
            const nextSection = document.querySelector('.section');
            if (nextSection) {
                nextSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Philosophy Toggle Functionality
    window.togglePhilosophy = function() {
        const philosophyDetails = document.getElementById('philosophy-details');
        const expandBtn = document.querySelector('.expand-philosophy-btn');
        const collapseBtn = document.querySelector('.collapse-philosophy-btn');
        
        if (philosophyDetails) {
            if (philosophyDetails.classList.contains('active')) {
                philosophyDetails.classList.remove('active');
                if (expandBtn) expandBtn.style.display = 'flex';
                if (collapseBtn) collapseBtn.style.display = 'none';
            } else {
                philosophyDetails.classList.add('active');
                if (expandBtn) expandBtn.style.display = 'none';
                if (collapseBtn) collapseBtn.style.display = 'flex';
            }
        }
    };

    // Enhanced Pillars Toggle
    window.togglePillar = function(element) {
        const pillarCard = element;
        const statusIndicator = pillarCard.querySelector('.status-indicator');
        const statusText = pillarCard.querySelector('.status-text');
        
        // Close other active pillars
        const allPillars = document.querySelectorAll('.pillar-card');
        allPillars.forEach(card => {
            if (card !== pillarCard && card.classList.contains('active')) {
                card.classList.remove('active');
                const indicator = card.querySelector('.status-indicator');
                const text = card.querySelector('.status-text');
                if (indicator) indicator.classList.remove('active');
                if (text) text.textContent = 'Explore details';
            }
        });
        
        // Toggle current pillar
        pillarCard.classList.toggle('active');
        
        if (pillarCard.classList.contains('active')) {
            if (statusIndicator) statusIndicator.classList.add('active');
            if (statusText) statusText.textContent = 'Expanded';
            
            // Scroll pillar into view
            setTimeout(() => {
                pillarCard.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }, 100);
        } else {
            if (statusIndicator) statusIndicator.classList.remove('active');
            if (statusText) statusText.textContent = 'Explore details';
        }
    };

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Enhanced Active Navigation
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id], .section');
        const navLinks = document.querySelectorAll('.nav a, .nav-mobile a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id') || '';
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}` || 
                (currentSection === '' && link.getAttribute('href') === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // Performance optimizations
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--transition-base', '0s');
        document.documentElement.style.setProperty('--transition-slow', '0s');
    }

    // Preload critical images
    const criticalImages = [
        'images/Dubai-skyline-image.png',
        'images/DATC-logo.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});
