// Backup of main.js created on 2026-02-09
// This is a full backup of the main JavaScript file.

/* =====================================================
   D AL TAMIMI CAPITAL - JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMobileNav();
    initScrollAnimations();
    initCookieBanner();
    initVideo();
    initStrategicDisciplines();
    initSmoothScroll();
    initInteractivePillars();
});

// HEADER
function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const updateHeader = () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    };
    
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader(); // Initial check
}

// MOBILE NAVIGATION
function initMobileNav() {
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav-mobile');
    const body = document.body;
    
    if (!toggle || !nav) return;
    
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        nav.classList.toggle('active');
        body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile nav when clicking links
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            nav.classList.remove('active');
            body.style.overflow = '';
        });
    });
}

// SCROLL ANIMATIONS
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    if (!elements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
}

// COOKIE BANNER
function initCookieBanner() {
    const banner = document.querySelector('.cookie-banner');
    const acceptBtn = document.querySelector('.cookie-accept');
    
    if (!banner) return;
    
    // Show banner if cookies not accepted
    if (!localStorage.getItem('datc_cookies_accepted')) {
        setTimeout(() => banner.classList.add('show'), 2000);
    }
    
    // Accept button
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('datc_cookies_accepted', 'true');
            banner.classList.remove('show');
        });
    }
}

// VIDEO SETUP
function initVideo() {
    const video = document.querySelector('.hero-video');
    if (!video) return;
    
    // Set up video attributes
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    
    // Try to autoplay
    const playVideo = () => {
        video.play()
            .then(() => {
                console.log('✅ Video playing');
                video.classList.add('loaded', 'playing');
            })
            .catch(e => {
                console.log('⚠️ Autoplay prevented:', e.message);
                // Show play button or fallback
            });
    };
    
    // Play when ready
    if (video.readyState >= 3) {
        playVideo();
    } else {
        video.addEventListener('loadeddata', playVideo);
    }
    
    // Retry on user interaction
    const retryPlay = () => {
        if (video.paused) {
            video.play().catch(console.log);
        }
    };
    
    ['click', 'touchstart'].forEach(event => {
        document.addEventListener(event, retryPlay, { once: true });
    });
    
    // Loop handling for seamless transition
    video.addEventListener('ended', () => {
        video.currentTime = 0;
        video.play().catch(console.log);
    });
}

// STRATEGIC DISCIPLINES - Enhanced hover effects
function initStrategicDisciplines() {
    const cards = document.querySelectorAll('.discipline-card');
    if (!cards.length) return;
    
    cards.forEach(card => {
        // Mouse move effect for 3D tilt
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// SMOOTH SCROLL
function initSmoothScroll() {
    // Hero scroll button
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', () => {
            const firstSection = document.querySelector('.section');
            if (firstSection) {
                firstSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Anchor links (excluding external links)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                window.scrollTo({
                    top: target.offsetTop - headerHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Export functions if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initHeader,
        initMobileNav,
        initScrollAnimations,
        initCookieBanner,
        initVideo,
        initStrategicDisciplines,
        initSmoothScroll,
        initInteractivePillars
    };
}

// =====================================================
// INTERACTIVE PILLARS - DISTINCTION SECTION
// =====================================================

function initInteractivePillars() {
    const pillarItems = document.querySelectorAll('.pillar-item');
    
    if (pillarItems.length === 0) return;
    
    // Initialize first pillar as active
    const firstPillar = document.querySelector('.pillar-item');
    if (firstPillar) {
        openPillar(firstPillar);
    }
    
    // Handle pillar clicks
    pillarItems.forEach(item => {
        const toggleBtn = item.querySelector('.pillar-toggle');
        const header = item.querySelector('.pillar-header');
        const content = item.querySelector('.pillar-content');
        
        // Button click handler
        if (toggleBtn && content) {
            toggleBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const isActive = item.classList.contains('active');
                
                // Close all other pillars
                pillarItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        closePillar(otherItem);
                    }
                });
                
                // Toggle current pillar
                if (isActive) {
                    closePillar(item);
                } else {
                    openPillar(item);
                    // Update URL for deep linking
                    history.pushState(null, null, `#${item.id}`);
                }
            });
            
            // Allow Enter/Space on button
            toggleBtn.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        }
        
        // Header click handler (for whole header area)
        if (header) {
            header.addEventListener('click', function(e) {
                if (e.target.closest('.pillar-toggle')) return; // Don't double-trigger
                const toggleBtn = item.querySelector('.pillar-toggle');
                if (toggleBtn) toggleBtn.click();
            });
            
            header.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const toggleBtn = item.querySelector('.pillar-toggle');
                    if (toggleBtn) toggleBtn.click();
                }
            });
        }
    });
    
    // Deep linking from URL
    function checkHash() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const targetPillar = document.getElementById(hash);
            if (targetPillar && targetPillar.classList.contains('pillar-item')) {
                pillarItems.forEach(item => closePillar(item));
                openPillar(targetPillar);
                // Smooth scroll to pillar
                setTimeout(() => {
                    targetPillar.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            }
        }
    }
    
    // Check hash on load
    checkHash();
    
    // Check hash on hash change
    window.addEventListener('hashchange', checkHash);
    
    // Close pillar function
    function closePillar(item) {
        item.classList.remove('active');
        const toggleBtn = item.querySelector('.pillar-toggle');
        const content = item.querySelector('.pillar-content');
        
        if (toggleBtn) {
            toggleBtn.setAttribute('aria-expanded', 'false');
            const icon = toggleBtn.querySelector('.toggle-icon');
            if (icon) icon.textContent = '+';
        }
        
        if (content) {
            content.setAttribute('hidden', '');
        }
    }
    
    // Open pillar function
    function openPillar(item) {
        item.classList.add('active');
        const toggleBtn = item.querySelector('.pillar-toggle');
        const content = item.querySelector('.pillar-content');
        
        if (toggleBtn) {
            toggleBtn.setAttribute('aria-expanded', 'true');
            const icon = toggleBtn.querySelector('.toggle-icon');
            if (icon) icon.textContent = '−';
        }
        
        if (content) {
            content.removeAttribute('hidden');
        }
    }
}

