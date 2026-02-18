/* =====================================================
   D AL TAMIMI CAPITAL - JavaScript (COMPLETE VERSION)
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing D Al Tamimi Capital...');
    
    initHeader();
    initMobileNav();
    initScrollAnimations();
    initCookieBanner();
    initVideo();
    initSmoothScroll();
    
    if (document.querySelector('.accordion-item')) {
        console.log('📁 Found accordion layout');
        initDistinctionAccordion();
    }
    
    if (document.querySelector('.pillar')) {
        console.log('📁 Found pillar layout');
        initDistinctionSection();
    }
    
    console.log('✅ All initializations complete');
});

function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    const updateHeader = () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
}

function initMobileNav() {
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav-mobile');
    const body = document.body;
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => {
        const isActive = toggle.classList.toggle('active');
        nav.classList.toggle('active');
        body.style.overflow = isActive ? 'hidden' : '';
        toggle.setAttribute('aria-expanded', isActive);
    });
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            nav.classList.remove('active');
            body.style.overflow = '';
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            toggle.classList.remove('active');
            nav.classList.remove('active');
            body.style.overflow = '';
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    if (!elements.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    elements.forEach(el => observer.observe(el));
}

function initCookieBanner() {
    const banner = document.querySelector('.cookie-banner');
    const acceptBtn = document.querySelector('.cookie-accept');
    const declineBtn = document.querySelector('.cookie-decline');
    if (!banner) return;
    
    // Only show on homepage, no localStorage (shows every visit)
    const isHomepage = window.location.pathname === '/' || 
                       window.location.pathname === '/index.html' ||
                       window.location.pathname.endsWith('/');
    
    if (isHomepage) {
        setTimeout(() => {
            banner.classList.add('show');
            banner.setAttribute('aria-hidden', 'false');
        }, 1500);
    }
    
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            banner.classList.remove('show');
            banner.setAttribute('aria-hidden', 'true');
            // PLAY VIDEO WHEN COOKIE ACCEPTED
            const video = document.querySelector('.hero-video');
            if (video) {
                video.muted = true;
                video.play().then(() => {
                    video.classList.add('playing');
                    console.log('🎥 Video started via cookie accept');
                }).catch(console.log);
            }
        });
    }
    
    if (declineBtn) {
        declineBtn.addEventListener('click', () => {
            banner.classList.remove('show');
            banner.setAttribute('aria-hidden', 'true');
        });
    }
}

// HERO VIDEO SETUP — FIXED: interaction fallback added
function initVideo() {
    const video = document.querySelector('.hero-video');
    if (!video) return;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.classList.add('loaded');
    let hasPlayed = false;
    const playVideo = () => {
        if (hasPlayed) return;
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log('🎥 Video playing successfully');
                    video.classList.add('loaded', 'playing');
                    hasPlayed = true;
                })
                .catch(error => {
                    console.log('⚠️ Autoplay prevented:', error.name);
                    video.classList.add('loaded');
                    const playOnInteraction = () => {
                        if (hasPlayed) return;
                        video.play().then(() => {
                            console.log('🎥 Video unlocked by interaction');
                            video.classList.add('playing');
                            hasPlayed = true;
                        }).catch(console.log);
                    };
                    ['click', 'touchstart', 'mousedown'].forEach(event => {
                        document.addEventListener(event, playOnInteraction, {
                            once: true,
                            capture: true
                        });
                    });
                });
        }
    };
    if (video.readyState >= 3) {
        playVideo();
    } else {
        video.addEventListener('loadeddata', playVideo, { once: true });
    }
    video.addEventListener('ended', () => {
        video.currentTime = 0;
        video.play().catch(console.log);
    });
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            video.pause();
        } else if (hasPlayed) {
            video.play().catch(console.log);
        }
    });
}

function initSmoothScroll() {
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', (e) => {
            e.preventDefault();
            const firstSection = document.querySelector('.section');
            if (firstSection) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                window.scrollTo({
                    top: firstSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    }
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        const href = anchor.getAttribute('href');
        if (href === '#' || href === '#!') return;
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight - 20;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                history.pushState(null, null, targetId);
            }
        });
    });
}

function initDistinctionSection() {
    console.log('🎯 Initializing distinction section (pillars)...');
    const pillars = document.querySelectorAll('.pillar');
    if (!pillars.length) return;
    console.log(`✅ Found ${pillars.length} pillars`);
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    pillars.forEach(pillar => {
        observer.observe(pillar);
        pillar.addEventListener('mouseenter', () => {
            const number = pillar.querySelector('.pillar-number');
            const title = pillar.querySelector('.pillar-title');
            if (number) { number.style.transform = 'translateX(8px) scale(1.05)'; number.style.opacity = '1'; }
            if (title) { title.style.transform = 'translateX(4px)'; }
        });
        pillar.addEventListener('mouseleave', () => {
            const number = pillar.querySelector('.pillar-number');
            const title = pillar.querySelector('.pillar-title');
            if (number) { number.style.transform = 'translateX(0) scale(1)'; number.style.opacity = '0.8'; }
            if (title) { title.style.transform = 'translateX(0)'; }
        });
    });
}

function initDistinctionAccordion() {
    console.log('🎯 Initializing distinction accordion...');
    const accordionItems = document.querySelectorAll('.accordion-item');
    if (!accordionItems.length) return;
    console.log(`✅ Found ${accordionItems.length} accordion items`);
    const closeAllItems = () => {
        accordionItems.forEach(item => {
            item.classList.remove('active');
            const header = item.querySelector('.accordion-header');
            if (header) header.setAttribute('aria-expanded', 'false');
        });
    };
    const openItem = (item) => {
        closeAllItems();
        item.classList.add('active');
        const header = item.querySelector('.accordion-header');
        if (header) header.setAttribute('aria-expanded', 'true');
    };
    const firstItem = document.querySelector('.accordion-item.active') || accordionItems[0];
    if (firstItem) openItem(firstItem);
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (!header) return;
        header.setAttribute('aria-expanded', item.classList.contains('active'));
        header.setAttribute('aria-controls', `accordion-content-${Array.from(accordionItems).indexOf(item)}`);
        const content = item.querySelector('.accordion-content');
        if (content) content.id = `accordion-content-${Array.from(accordionItems).indexOf(item)}`;
        header.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isActive = item.classList.contains('active');
            if (isActive) { closeAllItems(); } else { openItem(item); }
        });
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); header.click(); }
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                const currentIndex = Array.from(accordionItems).indexOf(item);
                let nextIndex = e.key === 'ArrowDown'
                    ? (currentIndex + 1) % accordionItems.length
                    : (currentIndex - 1 + accordionItems.length) % accordionItems.length;
                openItem(accordionItems[nextIndex]);
                accordionItems[nextIndex].querySelector('.accordion-header').focus();
            }
        });
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => { clearTimeout(timeout); func(...args); };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}
