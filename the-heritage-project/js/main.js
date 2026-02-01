/**
 * Ubuntu Heritage Foundation - Premium Living Experience
 * Complete JavaScript with animations, interactions, and PayPal
 */

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCursorGlow();
    initNavigation();
    initFloatingSymbols();
    initParallax();
    initAnimations();
    initMagneticButtons();
    initCounters();
    initVolunteerForm();
    initDonations();
    initPayPal();
    initExperienceWidget();
    initEventsTabs();
    initEventsModal();
});

// ============================================
// PREMIUM LOADER
// ============================================
function initLoader() {
    const loader = document.getElementById('loader');

    window.addEventListener('load', () => {
        // Add slight delay for effect
        setTimeout(() => {
            loader.classList.add('hidden');
            // Trigger hero animations after loader
            setTimeout(animateHeroEntrance, 300);
        }, 2000);
    });

    // Fallback if load event already fired
    if (document.readyState === 'complete') {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(animateHeroEntrance, 300);
        }, 2000);
    }
}

// ============================================
// CUSTOM CURSOR GLOW
// ============================================
function initCursorGlow() {
    const cursorGlow = document.getElementById('cursorGlow');
    if (!cursorGlow || window.innerWidth < 768) return;

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth follow
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        cursorGlow.style.left = currentX + 'px';
        cursorGlow.style.top = currentY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// FLOATING ADINKRA SYMBOLS
// ============================================
function initFloatingSymbols() {
    const container = document.getElementById('floatingSymbols');
    if (!container) return;

    const symbols = ['✦', '◆', '◈', '❖', '✧', '⬡', '☀', '✵', '❂', '⊛'];
    const symbolCount = 15;

    for (let i = 0; i < symbolCount; i++) {
        const symbol = document.createElement('div');
        symbol.className = 'floating-symbol';
        symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        const size = Math.random() * 20 + 16;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = Math.random() * 15 + 20;

        symbol.style.cssText = `
            font-size: ${size}px;
            left: ${left}%;
            top: ${top}%;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            color: rgba(244, 160, 32, ${Math.random() * 0.15 + 0.05});
        `;

        container.appendChild(symbol);
    }
}

// ============================================
// MOUSE PARALLAX FOR HERO
// ============================================
function initParallax() {
    const parallaxContainer = document.getElementById('heroParallax');
    if (!parallaxContainer) return;

    const layers = parallaxContainer.querySelectorAll('.parallax-layer');

    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 30;
        const y = (window.innerHeight / 2 - e.clientY) / 30;

        layers.forEach(layer => {
            const depth = parseFloat(layer.dataset.depth) || 0.1;
            const moveX = x * depth;
            const moveY = y * depth;
            layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

// ============================================
// HERO ENTRANCE ANIMATION
// ============================================
function animateHeroEntrance() {
    gsap.registerPlugin(ScrollTrigger);

    const elements = document.querySelectorAll('.animate-on-load');

    elements.forEach((el, i) => {
        const delay = parseFloat(el.dataset.delay) || i * 0.15;

        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: delay,
            ease: 'power3.out'
        });
    });

    // Animate title underline
    gsap.to('.title-underline', {
        scaleX: 1,
        duration: 0.8,
        delay: 1.2,
        ease: 'power2.out'
    });
}

// ============================================
// GSAP SCROLL ANIMATIONS
// ============================================
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Story cards
    gsap.utils.toArray('.story-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 80,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out'
        });
    });

    // Divider diamonds
    gsap.utils.toArray('.divider-pattern span').forEach((span, i) => {
        gsap.from(span, {
            scrollTrigger: {
                trigger: span.parentElement,
                start: 'top 90%'
            },
            scale: 0,
            rotation: 180,
            duration: 0.5,
            delay: i * 0.1,
            ease: 'back.out(2)'
        });
    });

    // Mzilikazi section
    gsap.from('.mzilikazi-card', {
        scrollTrigger: {
            trigger: '.mzilikazi-section',
            start: 'top 70%'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.royal-crest', {
        scrollTrigger: {
            trigger: '.mzilikazi-section',
            start: 'top 70%'
        },
        scale: 0,
        rotation: -360,
        duration: 1.2,
        delay: 0.3,
        ease: 'elastic.out(1, 0.5)'
    });

    gsap.from('.crest-rings span', {
        scrollTrigger: {
            trigger: '.mzilikazi-section',
            start: 'top 70%'
        },
        scale: 0,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.5,
        ease: 'power2.out'
    });

    // Queen's Quote & Actions Animation
    gsap.from('.queen-quote', {
        scrollTrigger: {
            trigger: '.mzilikazi-card',
            start: 'top 60%'
        },
        y: 30,
        opacity: 0,
        duration: 1.2,
        delay: 0.6,
        ease: 'power3.out'
    });

    gsap.from('.quote-author', {
        scrollTrigger: {
            trigger: '.mzilikazi-card',
            start: 'top 60%'
        },
        opacity: 0,
        duration: 1,
        delay: 1,
        ease: 'power2.out'
    });

    gsap.from('.mzilikazi-actions .btn', {
        scrollTrigger: {
            trigger: '.mzilikazi-actions',
            start: 'top 90%'
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // Impact cards
    gsap.utils.toArray('.impact-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%'
            },
            y: 60,
            opacity: 0,
            scale: 0.9,
            duration: 0.7,
            delay: i * 0.1,
            ease: 'back.out(1.5)'
        });
    });

    // Volunteer section
    gsap.from('.volunteer-info', {
        scrollTrigger: {
            trigger: '.volunteer-section',
            start: 'top 70%'
        },
        x: -80,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
    });

    gsap.from('.volunteer-form-container', {
        scrollTrigger: {
            trigger: '.volunteer-section',
            start: 'top 70%'
        },
        x: 80,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
    });

    // Role cards
    gsap.from('.role-card', {
        scrollTrigger: {
            trigger: '.volunteer-roles',
            start: 'top 85%'
        },
        x: -40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
    });

    // Donation tiers
    gsap.utils.toArray('.tier-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: '.donation-tiers',
                start: 'top 80%'
            },
            y: 50,
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            delay: i * 0.12,
            ease: 'back.out(1.3)'
        });
    });

    // Section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 85%'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // Highlight items
    gsap.from('.highlight-item', {
        scrollTrigger: {
            trigger: '.mzilikazi-highlights',
            start: 'top 80%'
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
    });
}

// ============================================
// MAGNETIC BUTTONS
// ============================================
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(el, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}

// ============================================
// ANIMATED COUNTERS
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');

    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);

        ScrollTrigger.create({
            trigger: counter,
            start: 'top 85%',
            onEnter: () => animateCounter(counter, target),
            once: true
        });
    });
}

function animateCounter(element, target) {
    const obj = { value: 0 };

    gsap.to(obj, {
        value: target,
        duration: 2.5,
        ease: 'power2.out',
        onUpdate: () => {
            element.textContent = Math.floor(obj.value).toLocaleString();
        }
    });
}

// ============================================
// VOLUNTEER FORM
// ============================================
function initVolunteerForm() {
    const form = document.getElementById('volunteerForm');
    const formSuccess = document.getElementById('formSuccess');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Validate
        if (!data.fullName || !data.email) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Button loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="btn-text">Submitting...</span>';
        submitBtn.disabled = true;

        // Simulate submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success
        form.style.display = 'none';
        formSuccess.style.display = 'block';

        // Celebration!
        createConfetti();

        // Reset
        form.reset();
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;

        console.log('Volunteer Registration:', data);
    });
}

// ============================================
// DONATIONS
// ============================================
let selectedAmount = 50;

function initDonations() {
    const tierCards = document.querySelectorAll('.tier-card');
    const customInput = document.getElementById('customAmount');
    const amountDisplay = document.getElementById('selectedAmount');

    if (!tierCards.length) return;

    // Set default
    document.querySelector('.tier-card.popular')?.classList.add('selected');

    // Tier selection
    tierCards.forEach(card => {
        card.addEventListener('click', () => {
            tierCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedAmount = parseInt(card.dataset.amount);
            amountDisplay.textContent = `$${selectedAmount}`;
            customInput.value = '';

            // Animate selection
            gsap.fromTo(card,
                { scale: 0.95 },
                { scale: 1, duration: 0.3, ease: 'back.out(2)' }
            );
        });
    });

    // Custom amount
    customInput.addEventListener('input', () => {
        const value = parseInt(customInput.value);
        if (value > 0) {
            selectedAmount = value;
            amountDisplay.textContent = `$${selectedAmount}`;
            tierCards.forEach(c => c.classList.remove('selected'));
        }
    });
}

// ============================================
// PAYPAL INTEGRATION
// ============================================
function initPayPal() {
    const paypalContainer = document.getElementById('paypal-button-container');

    if (!paypalContainer || typeof paypal === 'undefined') {
        console.log('PayPal SDK not loaded');
        return;
    }

    paypal.Buttons({
        style: {
            layout: 'vertical',
            color: 'gold',
            shape: 'pill',
            label: 'donate'
        },

        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{
                    description: 'Ubuntu Heritage Foundation Donation',
                    amount: {
                        value: selectedAmount.toString(),
                        currency_code: 'USD'
                    }
                }]
            });
        },

        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                showDonationSuccess(selectedAmount);
                console.log('Donation successful:', details);
            });
        },

        onError: function (err) {
            console.error('PayPal Error:', err);
            showNotification('Error processing donation. Please try again.', 'error');
        },

        onCancel: function () {
            showNotification('Donation cancelled. Feel free to try again!', 'info');
        }
    }).render('#paypal-button-container');
}

// ============================================
// DONATION SUCCESS
// ============================================
function showDonationSuccess(amount) {
    const modal = document.getElementById('donationSuccess');
    const amountDisplay = document.getElementById('donatedAmount');

    if (modal && amountDisplay) {
        amountDisplay.textContent = `$${amount}`;
        modal.style.display = 'flex';
        createConfetti();
    }
}

function closeDonationModal() {
    const modal = document.getElementById('donationSuccess');
    if (modal) {
        modal.style.display = 'none';
    }
}

window.closeDonationModal = closeDonationModal;

// ============================================
// CONFETTI CELEBRATION
// ============================================
function createConfetti() {
    const colors = ['#FFD93D', '#F4A020', '#E8850C', '#C75B39', '#E07B5A', '#6B2D5C'];
    const confettiCount = 150;
    const container = document.body;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        const size = Math.random() * 12 + 5;
        const isCircle = Math.random() > 0.5;

        confetti.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${isCircle ? size : size * 0.6}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${50 + (Math.random() - 0.5) * 40}%;
            top: 50%;
            border-radius: ${isCircle ? '50%' : '2px'};
            z-index: 10001;
            pointer-events: none;
        `;
        container.appendChild(confetti);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 400 + 200;
        const destX = Math.cos(angle) * velocity;
        const destY = Math.sin(angle) * velocity - 200;

        gsap.to(confetti, {
            x: destX,
            y: destY,
            rotation: Math.random() * 720 - 360,
            duration: Math.random() * 1.5 + 1.5,
            ease: 'power2.out',
            onComplete: () => {
                gsap.to(confetti, {
                    y: '+=300',
                    opacity: 0,
                    duration: 1,
                    ease: 'power1.in',
                    onComplete: () => confetti.remove()
                });
            }
        });
    }
}

// ============================================
// NOTIFICATIONS
// ============================================
function showNotification(message, type = 'info') {
    document.querySelectorAll('.notification').forEach(n => n.remove());

    const colors = {
        error: '#C75B39',
        success: '#2D5A45',
        info: '#F4A020'
    };

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${colors[type]};
        color: white;
        padding: 18px 28px;
        border-radius: 14px;
        font-weight: 500;
        box-shadow: 0 10px 40px rgba(0,0,0,0.25);
        z-index: 10002;
        transform: translateX(120%);
        font-family: 'Poppins', sans-serif;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    gsap.to(notification, {
        x: 0,
        duration: 0.5,
        ease: 'back.out(1.5)'
    });

    setTimeout(() => {
        gsap.to(notification, {
            x: '120%',
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => notification.remove()
        });
    }, 4000);
}

// ============================================
// TILT EFFECT FOR CARDS (Optional)
// ============================================
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// ============================================
// EXPERIENCE SETTINGS WIDGET
// ============================================
function initExperienceWidget() {
    const widget = document.getElementById('experienceWidget');
    const toggleBtn = widget?.querySelector('.widget-toggle');
    const themeToggles = document.querySelectorAll('input[name="themeMode"]');

    if (!widget || !toggleBtn) return;

    // Toggle Widget Panel
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        widget.classList.toggle('active');

        // GSAP Spin
        gsap.to(toggleBtn.querySelector('i'), {
            rotate: widget.classList.contains('active') ? 90 : 0,
            duration: 0.4,
            ease: 'power2.out'
        });
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!widget.contains(e.target) && widget.classList.contains('active')) {
            widget.classList.remove('active');
            gsap.to(toggleBtn.querySelector('i'), { rotate: 0, duration: 0.4 });
        }
    });

    // Handle Theme Modes
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        // Also update radio state just in case
        const targetRadio = widget.querySelector(`input[value="${theme}"]`);
        if (targetRadio) targetRadio.checked = true;
    }

    // Initialize on load based on checked radio
    const checkedTheme = widget.querySelector('input[name="themeMode"]:checked');
    if (checkedTheme) {
        setTheme(checkedTheme.value);
    } else {
        setTheme('light'); // Default fallback
    }

    themeToggles.forEach(toggle => {
        toggle.addEventListener('change', () => {
            const theme = toggle.value;
            setTheme(theme);

            // Magnetic haptic effect
            gsap.fromTo(widget.querySelector('.mode-glider'),
                { scale: 0.9 },
                { scale: 1, duration: 0.3, ease: 'back.out(2)' }
            );

            console.log(`✨ Theme switched to: ${theme}`);
        });
    });
}

// ============================================
// EVENTS TABS
// ============================================
function initEventsTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const grids = document.querySelectorAll('.events-grid');

    if (!tabBtns.length) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');

            // Toggle Buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Toggle Grids
            grids.forEach(grid => {
                grid.classList.remove('active');
                if (grid.id === tabId) {
                    grid.classList.add('active');

                    // Trigger scroll trigger refresh for new content
                    ScrollTrigger.refresh();
                }
            });
        });
    });
}

// ============================================
// EVENTS MODAL
// ============================================
function initEventsModal() {
    const modal = document.getElementById('eventModal');
    const form = document.getElementById('eventRegForm');
    const success = document.getElementById('eventSuccess');
    const mainContent = document.getElementById('modalMainContent');
    const eventCards = document.querySelectorAll('.event-card');

    if (!modal) return;

    window.openEventModal = function (card) {
        // Reset view
        success.style.display = 'none';
        mainContent.style.display = 'block';
        mainContent.style.opacity = '1';
        mainContent.style.transform = 'translateY(0)';

        // Populate Data
        const title = card.querySelector('h3').textContent;
        const img = card.querySelector('.event-image img').src;
        const dateTag = card.querySelector('.event-date-tag');
        const dateText = dateTag ? dateTag.textContent.trim().replace(/\s+/g, ' ') : '';
        const details = card.querySelectorAll('.event-details span');
        const loc = details[0] ? details[0].textContent.trim() : '';
        const time = details[1] ? details[1].textContent.trim() : '';

        document.getElementById('modalEventTitle').textContent = title;
        document.getElementById('modalEventImg').src = img;
        document.getElementById('modalEventDate').innerHTML = `<i class="ph ph-calendar"></i> ${dateText} • ${time}`;
        document.getElementById('modalEventLocation').innerHTML = `<i class="ph ph-map-pin"></i> ${loc}`;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeEventModal = function () {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Card Clicks
    eventCards.forEach(card => {
        const link = card.querySelector('.event-link');
        if (link && (link.textContent.includes('Book') || link.textContent.includes('Register'))) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                openEventModal(card);
            });
        }
    });

    // Form Submit
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Animation for transition
            gsap.to(mainContent, {
                opacity: 0,
                y: -20,
                duration: 0.4,
                onComplete: () => {
                    mainContent.style.display = 'none';
                    success.style.display = 'block';
                    gsap.fromTo(success,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.5 }
                    );
                }
            });
        });
    }

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeEventModal();
        }
    });
}

console.log('✨ Ubuntu Heritage Foundation - Premium Experience Loaded');
