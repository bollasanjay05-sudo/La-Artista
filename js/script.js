// ============================================
// L'ARTISTA FINE DINING PREMIUM JAVASCRIPT
// ============================================

// DOM Elements
const loader = document.querySelector('.loader');
const navbar = document.querySelector('.premium-navbar');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.premium-mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const reservationForm = document.getElementById('reservationForm');
const currentYear = document.getElementById('currentYear');
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCategories = document.querySelectorAll('.premium-menu-category');

// Restaurant Configuration
const RESTAURANT_CONFIG = {
    whatsappNumber: '37112345678', // Replace with your WhatsApp number
    restaurantEmail: 'reservations@lartista.lv', // Replace with your email
    restaurantName: "L'ARTISTA Fine Italian Dining",
    restaurantAddress: "Riga City Center, Latvia"
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c L\'ARTISTA Fine Dining 🍝 ', 'background: linear-gradient(to right, #1F3D2B, #D6273B); color: white; padding: 10px; font-size: 16px; border-radius: 5px;');
    
    // Hide loader with smooth animation
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 1500);

    // Set current year in footer
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Initialize mobile menu
    initMobileMenu();

    // Initialize menu tabs
    initMenuTabs();

    // Initialize reservation form
    initReservationForm();

    // Initialize animations
    initScrollAnimations();

    // Initialize lazy loading
    initLazyLoading();

    // Initialize gallery interactions
    initGallery();

    // Performance monitoring
    initPerformanceMonitoring();

    // Handle scroll events
    window.addEventListener('scroll', handleScroll);
});

// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================
function initMobileMenu() {
    if (!menuToggle || !mobileMenu || !mobileMenuClose) return;

    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile menu
    mobileMenuClose.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close menu when clicking links
    document.querySelectorAll('.premium-mobile-menu .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

// ============================================
// MENU TABS FUNCTIONALITY
// ============================================
function initMenuTabs() {
    if (!menuTabs.length || !menuCategories.length) return;

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            // Update active tab
            menuTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show corresponding category
            menuCategories.forEach(category => {
                category.classList.remove('active');
                if (category.id === tabId) {
                    setTimeout(() => {
                        category.classList.add('active');
                    }, 50);
                }
            });
        });
    });
}

// ============================================
// RESERVATION SYSTEM - WhatsApp & Email
// ============================================
function initReservationForm() {
    if (!reservationForm) return;

    // Set minimum date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        
        // Set placeholder date to 3 days from now
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 3);
        dateInput.value = futureDate.toISOString().split('T')[0];
    }

    // Form submission handler
    reservationForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            guests: document.getElementById('guests').value,
            specialRequests: document.getElementById('specialRequests').value.trim()
        };

        // Validate form
        const validation = validateReservationForm(formData);
        if (!validation.isValid) {
            showNotification(validation.message, 'error');
            return;
        }

        // Show loading state
        const submitBtn = reservationForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> PROCESSING...';
        submitBtn.disabled = true;

        try {
            // Send to WhatsApp
            const whatsappSuccess = await sendToWhatsApp(formData);
            
            // Send to Email
            const emailSuccess = await sendToEmail(formData);

            if (whatsappSuccess && emailSuccess) {
                showNotification('Reservation sent successfully! We\'ll confirm shortly.', 'success');
                
                // Reset form after delay
                setTimeout(() => {
                    reservationForm.reset();
                    // Reset date to 3 days from now
                    if (dateInput) {
                        const futureDate = new Date();
                        futureDate.setDate(futureDate.getDate() + 3);
                        dateInput.value = futureDate.toISOString().split('T')[0];
                    }
                }, 2000);
            } else {
                showNotification('Reservation partially sent. Please check your WhatsApp/Email.', 'warning');
            }
        } catch (error) {
            console.error('Reservation error:', error);
            showNotification('Error sending reservation. Please try again.', 'error');
        } finally {
            // Restore button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Form validation
function validateReservationForm(data) {
    // Required fields
    const requiredFields = ['name', 'email', 'phone', 'date', 'time', 'guests'];
    for (const field of requiredFields) {
        if (!data[field]) {
            return {
                isValid: false,
                message: `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`
            };
        }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return {
            isValid: false,
            message: 'Please enter a valid email address'
        };
    }

    // Phone validation (international format)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanedPhone = data.phone.replace(/\D/g, '');
    if (!phoneRegex.test(cleanedPhone)) {
        return {
            isValid: false,
            message: 'Please enter a valid phone number'
        };
    }

    // Date validation (not in past)
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        return {
            isValid: false,
            message: 'Please select a future date'
        };
    }

    return { isValid: true, message: 'Valid' };
}

// Send to WhatsApp
async function sendToWhatsApp(formData) {
    try {
        // Format date
        const formattedDate = new Date(formData.date).toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Create WhatsApp message
        const message = `*NEW RESERVATION - ${RESTAURANT_CONFIG.restaurantName}*%0A%0A` +
                       `*👤 Guest Information*%0A` +
                       `Name: ${formData.name}%0A` +
                       `Phone: ${formData.phone}%0A` +
                       `Email: ${formData.email}%0A%0A` +
                       `*📅 Reservation Details*%0A` +
                       `Date: ${formattedDate}%0A` +
                       `Time: ${formData.time}%0A` +
                       `Guests: ${formData.guests}%0A` +
                       `Special Requests: ${formData.specialRequests || 'None'}%0A%0A` +
                       `*📍 Restaurant Info*%0A` +
                       `${RESTAURANT_CONFIG.restaurantName}%0A` +
                       `${RESTAURANT_CONFIG.restaurantAddress}%0A%0A` +
                       `_Sent via website reservation system_`;

        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${message}`;

        // Open WhatsApp in new tab
        window.open(whatsappURL, '_blank', 'noopener,noreferrer');
        
        return true;
    } catch (error) {
        console.error('WhatsApp error:', error);
        return false;
    }
}

// Send to Email using Formspree (free service)
async function sendToEmail(formData) {
    try {
        // Format date for email
        const formattedDate = new Date(formData.date).toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Create email subject and body
        const subject = `New Reservation: ${formData.name} - ${formattedDate} ${formData.time}`;
        const body = `
NEW RESERVATION - ${RESTAURANT_CONFIG.restaurantName}

GUEST INFORMATION:
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}

RESERVATION DETAILS:
Date: ${formattedDate}
Time: ${formData.time}
Number of Guests: ${formData.guests}
Special Requests: ${formData.specialRequests || 'None'}

RESTAURANT INFO:
${RESTAURANT_CONFIG.restaurantName}
${RESTAURANT_CONFIG.restaurantAddress}

This reservation was submitted via the website reservation system.
        `.trim();

        // Create mailto link
        const mailtoLink = `mailto:${RESTAURANT_CONFIG.restaurantEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open email client
        window.open(mailtoLink, '_blank', 'noopener,noreferrer');
        
        return true;
    } catch (error) {
        console.error('Email error:', error);
        return false;
    }
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set icon based on type
    let icon = 'info-circle';
    let iconColor = '#1F3D2B';
    
    switch (type) {
        case 'success':
            icon = 'check-circle';
            iconColor = '#25d366';
            break;
        case 'error':
            icon = 'exclamation-circle';
            iconColor = '#D6273B';
            break;
        case 'warning':
            icon = 'exclamation-triangle';
            iconColor = '#f0ad4e';
            break;
    }

    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${icon}" style="color: ${iconColor};"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        padding: 1.25rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 99999;
        transform: translateX(400px);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        border-left: 4px solid ${iconColor};
        max-width: 400px;
        animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    `;

    // Content styles
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.875rem;
        flex: 1;
    `;

    notification.querySelector('.notification-content i').style.cssText = `
        font-size: 1.25rem;
    `;

    notification.querySelector('.notification-content span').style.cssText = `
        font-size: 0.95rem;
        color: var(--text-dark);
        line-height: 1.5;
    `;

    // Close button styles
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: var(--text-light);
        cursor: pointer;
        font-size: 1rem;
        padding: 0.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        transition: all 0.2s ease;
    `;

    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
    });

    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.backgroundColor = 'transparent';
    });

    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 400);
    }, 5000);

    // Close button functionality
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 400);
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add special animations based on element type
                if (entry.target.classList.contains('premium-menu-item')) {
                    entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
                }
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.fade-in, .premium-menu-item, .premium-feature-card, .premium-gallery-item').forEach(el => {
        observer.observe(el);
    });
}

function handleScroll() {
    // Navbar scroll effect
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}

// ============================================
// LAZY LOADING
// ============================================
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                    }
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// ============================================
// GALLERY INTERACTIONS
// ============================================
function initGallery() {
    const galleryItems = document.querySelectorAll('.premium-gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const imgAlt = item.querySelector('img').alt;
            
            // Create lightbox
            createLightbox(imgSrc, imgAlt);
        });
    });
}

function createLightbox(src, alt) {
    // Remove existing lightbox
    const existingLightbox = document.querySelector('.lightbox');
    if (existingLightbox) {
        existingLightbox.remove();
    }

    // Create lightbox element
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">
                <i class="fas fa-times"></i>
            </button>
            <img src="${src}" alt="${alt}">
            <div class="lightbox-caption">${alt}</div>
        </div>
    `;

    // Add to page
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

    // Add styles
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        animation: fadeIn 0.3s ease;
    `;

    const lightboxContent = lightbox.querySelector('.lightbox-content');
    lightboxContent.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        animation: zoomIn 0.3s ease;
    `;

    lightbox.querySelector('img').style.cssText = `
        max-width: 100%;
        max-height: 80vh;
        border-radius: 8px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    `;

    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
        transition: all 0.2s ease;
    `;

    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.transform = 'scale(1.2)';
    });

    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.transform = 'scale(1)';
    });

    // Lightbox caption
    const caption = lightbox.querySelector('.lightbox-caption');
    caption.style.cssText = `
        color: white;
        text-align: center;
        margin-top: 1rem;
        font-size: 1rem;
        opacity: 0.9;
    `;

    // Close lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.style.animation = 'fadeOut 0.3s ease';
        lightboxContent.style.animation = 'zoomOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(lightbox);
            document.body.style.overflow = 'auto';
        }, 300);
    });

    // Close on ESC key
    document.addEventListener('keydown', function lightboxKeyHandler(e) {
        if (e.key === 'Escape') {
            closeBtn.click();
            document.removeEventListener('keydown', lightboxKeyHandler);
        }
    });

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeBtn.click();
        }
    });
}

// ============================================
// PERFORMANCE MONITORING
// ============================================
function initPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
        if ('performance' in window) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            if (pageLoadTime > 3000) {
                console.warn(`Page load took ${pageLoadTime}ms. Consider optimizing images and assets.`);
            }
        }
    });

    // Monitor scroll performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Log scroll performance issues
            if (performance.now() > 16) { // 60fps threshold
                console.warn('Scroll performance issue detected.');
            }
        }, 100);
    });
}

// ============================================
// ANIMATION KEYFRAMES
// ============================================
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes zoomIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
    
    @keyframes zoomOut {
        from { transform: scale(1); opacity: 1; }
        to { transform: scale(0.8); opacity: 0; }
    }
    
    /* Smooth fade-in for elements */
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                    transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Menu item animations */
    .premium-menu-item {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(styleSheet);

// ============================================
// ERROR HANDLING
// ============================================
window.addEventListener('error', function(e) {
    console.error('Website error:', e.error);
    
    // Show user-friendly error message
    if (!document.querySelector('.error-notification')) {
        const errorNotification = document.createElement('div');
        errorNotification.className = 'error-notification';
        errorNotification.innerHTML = `
            <div style="position: fixed; bottom: 20px; left: 20px; background: #D6273B; color: white; padding: 12px 20px; border-radius: 8px; font-size: 0.9rem; z-index: 99999; box-shadow: 0 4px 20px rgba(0,0,0,0.2);">
                <i class="fas fa-exclamation-triangle" style="margin-right: 8px;"></i>
                An error occurred. Please refresh the page.
            </div>
        `;
        document.body.appendChild(errorNotification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (errorNotification.parentNode) {
                errorNotification.remove();
            }
        }, 5000);
    }
});

// ============================================
// SERVICE WORKER REGISTRATION (PWA)
// ============================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registered:', registration);
        }).catch(error => {
            console.log('ServiceWorker registration failed:', error);
        });
    });
}

// ============================================
// CACHE MANAGEMENT
// ============================================
const CACHE_VERSION = 'lartista-premium-v1';
const CACHE_FILES = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/script.js',
    '/manifest.json',
    '/images/lartista-logo.png'
];

// Preload critical assets
window.addEventListener('load', () => {
    CACHE_FILES.forEach(file => {
        if (!file.startsWith('http')) {
            fetch(file).catch(() => {});
        }
    });
});
