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
    
    // Check which page layout is present and initialize the right one
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

// HEADER SCROLL EFFECT
function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const updateHeader = () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    };
    
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader(); // Initial check
}

// MOBILE NAVIGATION TOGGLE
function initMobileNav() {
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav-mobile');
    const body = document.body;
    
    if (!toggle || !nav) return;
    
    toggle.addEventListener('click', () => {
        const isActive = toggle.classList.toggle('active');
        nav.classList.toggle('active');
        body.style.overflow = isActive ? 'hidden' : '';
        
        // Toggle aria-expanded for accessibility
        toggle.setAttribute('aria-expanded', isActive);
    });
    
    // Close mobile nav when clicking links
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            nav.classList.remove('active');
            body.style.overflow = '';
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            toggle.classList.remove('active');
            nav.classList.remove('active');
            body.style.overflow = '';
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// SCROLL ANIMATIONS WITH INTERSECTION OBSERVER
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    if (!elements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a slight delay for staggered effect
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

// COOKIE BANNER WITH LOCAL STORAGE
function initCookieBanner() {
    const banner = document.querySelector('.cookie-banner');
    const acceptBtn = document.querySelector('.cookie-accept');
    const declineBtn = document.querySelector('.cookie-decline');
    
    if (!banner) return;
    
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('datc_cookies_accepted');
    
    if (cookieChoice === null) {
        // Show banner after delay if no choice made
        setTimeout(() => {
            banner.classList.add('show');
            banner.setAttribute('aria-hidden', 'false');
        }, 1500);
    }
    
    // Accept button
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('datc_cookies_accepted', 'true');
            banner.classList.remove('show');
            banner.setAttribute('aria-hidden', 'true');
            // Here you would initialize analytics, tracking, etc.
        });
    }
    
    // Decline button (optional)
    if (declineBtn) {
        declineBtn.addEventListener('click', () => {
            localStorage.setItem('datc_cookies_accepted', 'false');
            banner.classList.remove('show');
            banner.setAttribute('aria-hidden', 'true');
        });
    }
}

// HERO VIDEO SETUP
function initVideo() {
    const video = document.querySelector('.hero-video');
    if (!video) return;
    
    // Set up video for autoplay
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata'; // Changed from 'auto' for better performance
    
    // Try to autoplay
    const playVideo = () => {
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log('🎥 Video playing successfully');
                    video.classList.add('loaded', 'playing');
                })
                .catch(error => {
                    console.log('⚠️ Autoplay prevented:', error.name);
                    // Add fallback UI here if needed
                    video.classList.add('loaded');
                    video.classList.remove('playing');
                });
        }
    };
    
    // Play when enough data is loaded
    if (video.readyState >= 3) {
        playVideo();
    } else {
        video.addEventListener('loadeddata', playVideo, { once: true });
    }
    
    // Handle video ending for seamless loop
    video.addEventListener('ended', () => {
        video.currentTime = 0;
        video.play().catch(console.log);
    });
    
    // Pause video when page is not visible (save battery)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            video.pause();
        } else {
            video.play().catch(console.log);
        }
    });
}

// SMOOTH SCROLL FOR ANCHOR LINKS
function initSmoothScroll() {
    // Hero scroll down button
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
    
    // All anchor links that start with #
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Skip empty anchors or special cases
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
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });
}

// DISTINCTION SECTION - For pages with PILLAR layout
function initDistinctionSection() {
    console.log('🎯 Initializing distinction section (pillars)...');
    
    const pillars = document.querySelectorAll('.pillar');
    if (!pillars.length) return;
    
    console.log(`✅ Found ${pillars.length} pillars`);
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150); // Staggered delay
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    pillars.forEach(pillar => {
        observer.observe(pillar);
        
        // Enhanced hover effects
        pillar.addEventListener('mouseenter', () => {
            const number = pillar.querySelector('.pillar-number');
            const title = pillar.querySelector('.pillar-title');
            
            if (number) {
                number.style.transform = 'translateX(8px) scale(1.05)';
                number.style.opacity = '1';
            }
            if (title) {
                title.style.transform = 'translateX(4px)';
            }
        });
        
        pillar.addEventListener('mouseleave', () => {
            const number = pillar.querySelector('.pillar-number');
            const title = pillar.querySelector('.pillar-title');
            
            if (number) {
                number.style.transform = 'translateX(0) scale(1)';
                number.style.opacity = '0.8';
            }
            if (title) {
                title.style.transform = 'translateX(0)';
            }
        });
    });
}

// DISTINCTION ACCORDION - For homepage with ACCORDION layout
function initDistinctionAccordion() {
    console.log('🎯 Initializing distinction accordion...');
    
    const accordionItems = document.querySelectorAll('.accordion-item');
    if (!accordionItems.length) return;
    
    console.log(`✅ Found ${accordionItems.length} accordion items`);
    
    // Function to close all accordion items
    const closeAllItems = () => {
        accordionItems.forEach(item => {
            item.classList.remove('active');
            const header = item.querySelector('.accordion-header');
            if (header) {
                header.setAttribute('aria-expanded', 'false');
            }
        });
    };
    
    // Function to open a specific item
    const openItem = (item) => {
        closeAllItems();
        item.classList.add('active');
        const header = item.querySelector('.accordion-header');
        if (header) {
            header.setAttribute('aria-expanded', 'true');
        }
    };
    
    // Ensure first item is open by default
    const firstItem = document.querySelector('.accordion-item.active') || accordionItems[0];
    if (firstItem) {
        openItem(firstItem);
    }
    
    // Add click handlers to all accordion headers
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (!header) return;
        
        // Set initial ARIA attributes
        header.setAttribute('aria-expanded', item.classList.contains('active'));
        header.setAttribute('aria-controls', `accordion-content-${Array.from(accordionItems).indexOf(item)}`);
        
        const content = item.querySelector('.accordion-content');
        if (content) {
            content.id = `accordion-content-${Array.from(accordionItems).indexOf(item)}`;
        }
        
        // Click handler
        header.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = item.classList.contains('active');
            
            if (isActive) {
                // If clicking an open item, close it
                closeAllItems();
            } else {
                // If clicking a closed item, open it
                openItem(item);
            }
        });
        
        // Keyboard navigation support
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                header.click();
            }
            
            // Arrow key navigation
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                
                const currentIndex = Array.from(accordionItems).indexOf(item);
                let nextIndex;
                
                if (e.key === 'ArrowDown') {
                    nextIndex = (currentIndex + 1) % accordionItems.length;
                } else {
                    nextIndex = (currentIndex - 1 + accordionItems.length) % accordionItems.length;
                }
                
                openItem(accordionItems[nextIndex]);
                accordionItems[nextIndex].querySelector('.accordion-header').focus();
            }
        });
    });
    
    // Optional: Close accordions when clicking outside (disabled by default)
    // Uncomment if you want this behavior
    /*
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.accordion-item')) {
            closeAllItems();
            // Reopen first item
            openItem(accordionItems[0]);
        }
    });
    */
}

// UTILITY: Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// UTILITY: Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}