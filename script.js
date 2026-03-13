// ============================================
// ROYAL BAKERY - COMPLETE JAVASCRIPT
// ============================================

// ============================================
// PRELOADER
// ============================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1500);
    }
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (backToTop) {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    reveals.forEach((element, index) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            // Add staggered delay for elements in the same parent
            const delay = element.closest('.categories-grid, .products-grid, .why-us-grid, .testimonials-grid, .menu-grid, .team-grid, .values-grid, .milestones-grid, .process-grid, .hours-grid, .gallery-grid')
                ? Array.from(element.parentElement.children).indexOf(element) * 100
                : 0;
            
            setTimeout(() => {
                element.classList.add('active');
            }, delay);
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const windowHeight = window.innerHeight;
        const elementTop = counter.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100 && !counter.classList.contains('counted')) {
            counter.classList.add('counted');
            let current = 0;
            const increment = target / 80;
            const duration = 2000;
            const stepTime = duration / 80;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                if (target >= 1000) {
                    counter.textContent = Math.floor(current).toLocaleString() + '+';
                } else {
                    counter.textContent = Math.floor(current) + '+';
                }
            }, stepTime);
        }
    });
}

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

// ============================================
// MENU FILTER FUNCTIONALITY
// ============================================
const filterTabs = document.querySelectorAll('.filter-tab');
const menuCards = document.querySelectorAll('.menu-card');

filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active from all tabs
        filterTabs.forEach(t => t.classList.remove('active'));
        // Add active to clicked tab
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter');

        menuCards.forEach(card => {
            if (filter === 'all') {
                card.classList.remove('hidden');
                card.style.display = '';
                // Re-trigger animation
                card.classList.remove('active');
                setTimeout(() => {
                    card.classList.add('active');
                }, 100);
            } else {
                if (card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                    card.style.display = '';
                    card.classList.remove('active');
                    setTimeout(() => {
                        card.classList.add('active');
                    }, 100);
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            }
        });
    });
});

// ============================================
// LIGHTBOX FUNCTIONALITY - UPDATED
// ============================================
const lightboxOverlay = document.getElementById('lightboxOverlay');
let currentProduct = {};

function openLightbox(name, price, icon, category) {
    currentProduct = { name, price, icon, category };

    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxPrice = document.getElementById('lightboxPrice');
    const lightboxIcon = document.getElementById('lightboxIcon');
    const lightboxCategory = document.getElementById('lightboxCategory');
    const dateInput = document.getElementById('lb-date');

    if (lightboxTitle) lightboxTitle.textContent = name;
    if (lightboxPrice) lightboxPrice.innerHTML = `💰 ${price}`;
    if (lightboxIcon) lightboxIcon.textContent = icon;
    if (lightboxCategory) lightboxCategory.innerHTML = `📂 ${category}`;

    // Set minimum date to today
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // Reset form
    const form = document.getElementById('lightboxForm');
    if (form) form.reset();

    if (lightboxOverlay) {
        lightboxOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    if (lightboxOverlay) {
        lightboxOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close on overlay click
if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) {
            closeLightbox();
        }
    });
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});


// ============================================
// SUBMIT ORDER TO WHATSAPP - UPDATED
// ============================================
function submitToWhatsApp(event) {
    event.preventDefault();

    const name = document.getElementById('lb-name').value.trim();
    const phone = document.getElementById('lb-phone').value.trim();
    const email = document.getElementById('lb-email').value.trim();
    const quantity = document.getElementById('lb-quantity').value;
    const date = document.getElementById('lb-date').value;
    const time = document.getElementById('lb-time').value;
    const address = document.getElementById('lb-address').value.trim();
    const message = document.getElementById('lb-message').value.trim();

    // Validations
    if (!name || !phone || !quantity || !date || !address) {
        showFormError('Please fill in all required fields! ⚠️');
        return false;
    }

    if (phone.length < 10 || !/^\d{10}$/.test(phone)) {
        showFormError('Please enter a valid 10-digit phone number! 📞');
        return false;
    }

    // Format date nicely
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    // Build WhatsApp Message
    let wa = '';
    wa += `🎂 *NEW ORDER — Royal Bakery*\n`;
    wa += `━━━━━━━━━━━━━━━━━━━━\n\n`;

    wa += `📦 *PRODUCT DETAILS*\n`;
    wa += `┌─────────────────────\n`;
    wa += `│ 🏷️ *Item:* ${currentProduct.name}\n`;
    wa += `│ 💰 *Price:* ${currentProduct.price}\n`;
    wa += `│ 📂 *Category:* ${currentProduct.category}\n`;
    wa += `│ 🔢 *Quantity:* ${quantity}\n`;
    wa += `└─────────────────────\n\n`;

    wa += `👤 *CUSTOMER INFO*\n`;
    wa += `┌─────────────────────\n`;
    wa += `│ 📛 *Name:* ${name}\n`;
    wa += `│ 📞 *Phone:* ${phone}\n`;
    if (email) wa += `│ ✉️ *Email:* ${email}\n`;
    wa += `└─────────────────────\n\n`;

    wa += `🚚 *DELIVERY DETAILS*\n`;
    wa += `┌─────────────────────\n`;
    wa += `│ 📅 *Date:* ${formattedDate}\n`;
    if (time) wa += `│ ⏰ *Time:* ${time}\n`;
    wa += `│ 📍 *Address:* ${address}\n`;
    wa += `└─────────────────────\n`;

    if (message) {
        wa += `\n📝 *SPECIAL INSTRUCTIONS*\n`;
        wa += `"${message}"\n`;
    }

    wa += `\n━━━━━━━━━━━━━━━━━━━━\n`;
    wa += `✅ Please confirm this order.\n`;
    wa += `🙏 Thank you for choosing Royal Bakery!`;

    // Open WhatsApp
    const encodedMsg = encodeURIComponent(wa);
    const waURL = `https://wa.me/919876543210?text=${encodedMsg}`;
    window.open(waURL, '_blank');

    // Close & Reset
    closeLightbox();
    document.getElementById('lightboxForm').reset();

    return false;
}

// Form Error Alert (Custom)
function showFormError(msg) {
    // Create custom error toast
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        background: linear-gradient(135deg, #FF6B6B, #EE5A5A);
        color: white;
        padding: 14px 28px;
        border-radius: 14px;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        font-weight: 600;
        z-index: 100000;
        box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
        animation: toastIn 0.4s ease forwards;
        max-width: 90%;
        text-align: center;
    `;
    toast.textContent = msg;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes toastIn {
            from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes toastOut {
            from { opacity: 1; transform: translateX(-50%) translateY(0); }
            to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(toast);

    // Remove after 3s
    setTimeout(() => {
        toast.style.animation = 'toastOut 0.4s ease forwards';
        setTimeout(() => {
            toast.remove();
            style.remove();
        }, 400);
    }, 3000);
}

// ============================================
// NEWSLETTER HANDLER
// ============================================
function handleNewsletter(event) {
    event.preventDefault();
    
    const emailInput = event.target.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    if (!email) {
        alert('Please enter your email address!');
        return false;
    }

    // Send to WhatsApp
    const message = encodeURIComponent(`📧 *Newsletter Subscription*\n\nEmail: ${email}\n\nPlease add me to your newsletter and offers list! 🍰`);
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');

    emailInput.value = '';
    alert('✅ Thank you for subscribing! Confirm on WhatsApp to complete.');

    return false;
}

// ============================================
// FAQ TOGGLE
// ============================================
function toggleFaq(button) {
    const faqItem = button.parentElement;
    const allFaqItems = document.querySelectorAll('.faq-item');

    // Close all other FAQ items
    allFaqItems.forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });

    // Toggle current FAQ item
    faqItem.classList.toggle('active');
}

// ============================================
// PRODUCT WISHLIST TOGGLE
// ============================================
document.querySelectorAll('.product-wishlist').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.toggle('wishlisted');
        
        if (this.classList.contains('wishlisted')) {
            this.textContent = '❤️';
            this.style.background = '#FF6B6B';
            this.style.color = '#fff';
        } else {
            this.textContent = '❤';
            this.style.background = 'rgba(255,255,255,0.9)';
            this.style.color = '';
        }
    });
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// PARALLAX EFFECT ON HERO
// ============================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.scrollY;
        const heroImage = hero.querySelector('.hero-image-main');
        if (heroImage && scrolled < 800) {
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    }
});

// ============================================
// AUTO-SET DATE MINIMUM ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => {
        input.setAttribute('min', today);
    });
});

// ============================================
// TYPING EFFECT FOR HERO (Optional Enhancement)
// ============================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ============================================
// IMAGE LAZY LOADING SIMULATION
// ============================================
const observerOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
};

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            imageObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.product-image, .menu-card-image, .gallery-item, .team-image').forEach(img => {
    imageObserver.observe(img);
});

// ============================================
// CONSOLE BRANDING
// ============================================
console.log('%c🎂 Royal Bakery', 'font-size: 24px; font-weight: bold; color: #C8956C;');
console.log('%cFreshly Baked Happiness Since 2010', 'font-size: 14px; color: #8B7355;');
console.log('%cWebsite crafted with love 💖', 'font-size: 12px; color: #D4AF37;');