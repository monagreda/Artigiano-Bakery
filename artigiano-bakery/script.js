// =====================================================
// ARTIGIANO BAKERY - INTERACTIVE JAVASCRIPT
// =====================================================

// =====================================================
// NAVBAR SCROLL EFFECT
// =====================================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// =====================================================
// MOBILE MENU TOGGLE
// =====================================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// =====================================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// =====================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
});

// =====================================================
// ANIMATED COUNTER FOR STATS
// =====================================================
function animateCounter(element, target, duration = 2000) {
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.round(target) + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// =====================================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// =====================================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Trigger counter animation for stats
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all stat numbers
document.querySelectorAll('.stat-number').forEach(stat => {
    observer.observe(stat);
});

// Observe all cards for stagger animation
const cards = document.querySelectorAll('.glass-card, .service-card-flip, .testimonial-card');
cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    observer.observe(card);
    
    // Add stagger effect
    setTimeout(() => {
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }, index * 50);
});

// =====================================================
// FLIP CARDS - MOBILE TAP SUPPORT
// =====================================================
const flipCards = document.querySelectorAll('.service-card-flip');

// Detect if device is mobile/touch
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (isTouchDevice) {
    flipCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent event bubbling
            e.stopPropagation();
            
            // Toggle flipped class
            this.classList.toggle('flipped');
            
            // Remove flipped class from other cards
            flipCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.classList.remove('flipped');
                }
            });
        });
    });
    
    // Close flipped cards when clicking outside
    document.addEventListener('click', () => {
        flipCards.forEach(card => {
            card.classList.remove('flipped');
        });
    });
}

// =====================================================
// PARTICLE SYSTEM
// =====================================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = window.innerWidth < 768 ? 20 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Create particles on load
window.addEventListener('load', createParticles);

// =====================================================
// FORM SUBMISSION HANDLER
// =====================================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Show success message (you can replace this with actual form submission)
        alert('¡Gracias por tu mensaje! Te contactaremos pronto. 🥖');
        
        // Reset form
        this.reset();
        
        // In a real application, you would send the data to a server here
        // Example:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     body: formData
        // }).then(response => response.json())
        //   .then(data => console.log(data));
    });
}

// =====================================================
// PARALLAX EFFECT FOR HERO VISUAL
// =====================================================
const heroVisual = document.querySelector('.hero-visual');

if (heroVisual) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.3;
        
        if (scrolled < window.innerHeight) {
            heroVisual.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// =====================================================
// DEBOUNCE UTILITY FUNCTION
// =====================================================
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

// =====================================================
// LAZY LOAD IMAGES
// =====================================================
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            
            // Add loaded class for fade-in effect
            img.classList.add('loaded');
            
            observer.unobserve(img);
        }
    });
});

// Observe all images
document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

// =====================================================
// SCROLL REVEAL ANIMATION
// =====================================================
const revealElements = document.querySelectorAll('.section-header, .about-content, .cta-container');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealObserver.observe(element);
});

// =====================================================
// CTA BUTTON CLICK HANDLERS
// =====================================================
const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Check if button text suggests ordering
        const buttonText = this.textContent.toLowerCase();
        
        if (buttonText.includes('pedir') || buttonText.includes('pedido') || buttonText.includes('orden')) {
            e.preventDefault();
            
            // You can replace this with actual ordering functionality
            alert('¡Función de pedidos próximamente! 🥐\n\nPor ahora, contáctanos por teléfono o WhatsApp.');
        }
        
        if (buttonText.includes('producto')) {
            e.preventDefault();
            
            // Scroll to services section
            const servicesSection = document.getElementById('servicios');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// =====================================================
// PERFORMANCE OPTIMIZATION
// =====================================================
// Add will-change property to animated elements on scroll
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Performance optimizations here
            ticking = false;
        });
        ticking = true;
    }
});

// =====================================================
// CONSOLE MESSAGE
// =====================================================
console.log('%c🥖 Artigiano Bakery', 'font-size: 24px; font-weight: bold; color: #722F37;');
console.log('%cPan artesanal hecho con pasión', 'font-size: 14px; color: #A1A1AA;');
console.log('%cWeb desarrollada con amor y código limpio ❤️', 'font-size: 12px; color: #71717A;');

// =====================================================
// INITIALIZE ON DOM CONTENT LOADED
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Artigiano Bakery website loaded successfully!');
    
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
});
