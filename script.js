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
// LIGHTBOX FUNCTIONALITY
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
    if (lightboxPrice) lightboxPrice.textContent = price;
    if (lightboxIcon) lightboxIcon.textContent = icon;
    if (lightboxCategory) lightboxCategory.innerHTML = category + ' • <strong>' + price + '</strong>';
    
    // Set minimum date to today
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

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

// Close lightbox on overlay click
if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) {
            closeLightbox();
        }
    });
}

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// ============================================
// SUBMIT ORDER TO WHATSAPP
// ============================================
function submitToWhatsApp(event) {
    event.preventDefault();

    const name = document.getElementById('lb-name').value.trim();
    const phone = document.getElementById('lb-phone').value.trim();
    const email = document.getElementById('lb-email').value.trim();
    const quantity = document.getElementById('lb-quantity').value;
    const date = document.getElementById('lb-date').value;
    const address = document.getElementById('lb-address').value.trim();
    const message = document.getElementById('lb-message').value.trim();

    // Validation
    if (!name || !phone || !quantity || !date || !address) {
        alert('Please fill in all required fields!');
        return false;
    }

    // Phone validation
    if (phone.length < 10) {
        alert('Please enter a valid phone number!');
        return false;
    }

    // Format the WhatsApp message
    let whatsappMessage = `🎂 *NEW ORDER - Royal Bakery* 🎂\n\n`;
    whatsappMessage += `━━━━━━━━━━━━━━━━━━\n`;
    whatsappMessage += `📦 *Product:* ${currentProduct.name}\n`;
    whatsappMessage += `💰 *Price:* ${currentProduct.price}\n`;
    whatsappMessage += `📂 *Category:* ${currentProduct.category}\n`;
    whatsappMessage += `━━━━━━━━━━━━━━━━━━\n\n`;
    whatsappMessage += `👤 *Customer Details:*\n`;
    whatsappMessage += `• Name: ${name}\n`;
    whatsappMessage += `• Phone: ${phone}\n`;
    if (email) whatsappMessage += `• Email: ${email}\n`;
    whatsappMessage += `• Quantity: ${quantity}\n`;
    whatsappMessage += `• Delivery Date: ${date}\n`;
    whatsappMessage += `• Address: ${address}\n`;
    if (message) {
        whatsappMessage += `\n📝 *Special Instructions:*\n${message}\n`;
    }
    whatsappMessage += `\n━━━━━━━━━━━━━━━━━━\n`;
    whatsappMessage += `Please confirm this order. Thank you! 🙏`;

    // Encode and redirect to WhatsApp
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/919876543210?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappURL, '_blank');

    // Close lightbox and reset form
    closeLightbox();
    document.getElementById('lightboxForm').reset();

    return false;
}

// ============================================
// CONTACT FORM TO WHATSAPP
// ============================================
function handleContactForm(event) {
    event.preventDefault();

    const name = document.getElementById('c-name').value.trim();
    const phone = document.getElementById('c-phone').value.trim();
    const email = document.getElementById('c-email').value.trim();
    const subject = document.getElementById('c-subject').value;
    const message = document.getElementById('c-message').value.trim();

    // Validation
    if (!name || !phone || !email || !subject || !message) {
        alert('Please fill in all required fields!');
        return false;
    }

    if (phone.length < 10) {
        alert('Please enter a valid phone number!');
        return false;
    }

    // Format WhatsApp message
    let whatsappMessage = `📩 *NEW ENQUIRY - Royal Bakery* 📩\n\n`;
    whatsappMessage += `━━━━━━━━━━━━━━━━━━\n`;
    whatsappMessage += `👤 *Name:* ${name}\n`;
    whatsappMessage += `📞 *Phone:* ${phone}\n`;
    whatsappMessage += `✉️ *Email:* ${email}\n`;
    whatsappMessage += `📌 *Subject:* ${subject}\n`;
    whatsappMessage += `━━━━━━━━━━━━━━━━━━\n\n`;
    whatsappMessage += `💬 *Message:*\n${message}\n\n`;
    whatsappMessage += `━━━━━━━━━━━━━━━━━━\n`;
    whatsappMessage += `Please respond at your earliest. Thank you! 🙏`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/919876543210?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');

    // Reset form
    document.getElementById('contactForm').reset();

    // Show success message
    alert('✅ Your message has been prepared for WhatsApp! Click send in the WhatsApp window that opened.');

    return false;
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