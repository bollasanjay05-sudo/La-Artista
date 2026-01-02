// ============================================
// L'ARTISTA FINE DINING - OPTIMIZED
// ============================================

// DOM Elements
const loader = document.querySelector('.loader');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.premium-mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const reservationForm = document.getElementById('reservationForm');
const currentYear = document.getElementById('currentYear');
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCategories = document.querySelectorAll('.menu-category');

// Restaurant Configuration
const RESTAURANT_CONFIG = {
    whatsappNumber: '37125722769',
    restaurantEmail: 'bollasanjay05@gmail.com',
    restaurantName: "L'ARTISTA Fine Dining Restaurant",
    restaurantAddress: "Vaļņu iela 25, Riga, LV-1050, Latvia",
    phoneNumber: "+371 25 722 769"
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('L\'ARTISTA Restaurant Website Initialized');
    
    // Hide loader
    setTimeout(() => {
        if (loader) {
            loader.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
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

    // Handle scroll events
    window.addEventListener('scroll', handleScroll);

    // Add touch event listeners for mobile
    initTouchEvents();
});

// ============================================
// MOBILE MENU
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
// MENU TABS
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
// RESERVATION SYSTEM - WHATSAPP & EMAIL SIMULTANEOUSLY
// ============================================
function initReservationForm() {
    if (!reservationForm) return;

    // Set minimum date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        
        // Set default date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.value = tomorrow.toISOString().split('T')[0];
    }

    // Form submission
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim(),
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            guests: document.getElementById('guests').value,
            message: document.getElementById('message').value.trim()
        };

        // Validate form
        const validation = validateReservationForm(formData);
        if (!validation.isValid) {
            showNotification(validation.message, 'error');
            return;
        }

        // Show loading state
        const submitBtn = reservationForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SENDING...';
        submitBtn.disabled = true;

        try {
            // Send to WhatsApp AND Email simultaneously
            const whatsappSent = sendToWhatsApp(formData);
            const emailSent = sendToEmail(formData);

            if (whatsappSent || emailSent) {
                showNotification('Reservation sent to WhatsApp and Email! We\'ll confirm shortly.', 'success');
                
                // Reset form after delay
                setTimeout(() => {
                    reservationForm.reset();
                    if (dateInput) {
                        const tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        dateInput.value = tomorrow.toISOString().split('T')[0];
                    }
                }, 2000);
            } else {
                showNotification('Please try sending again.', 'error');
            }
        } catch (error) {
            console.error('Reservation error:', error);
            showNotification('Error sending reservation. Please try again.', 'error');
        } finally {
            // Restore button state
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    });
}

// Form validation
function validateReservationForm(data) {
    // Required fields
    const requiredFields = ['name', 'phone', 'date', 'time', 'guests'];
    for (const field of requiredFields) {
        if (!data[field]) {
            return {
                isValid: false,
                message: `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`
            };
        }
    }

    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanedPhone = data.phone.replace(/\D/g, '');
    if (!phoneRegex.test(cleanedPhone)) {
        return {
            isValid: false,
            message: 'Please enter a valid phone number'
        };
    }

    // Email validation (optional but if provided, validate)
    if (data.email && !isValidEmail(data.email)) {
        return {
            isValid: false,
            message: 'Please enter a valid email address'
        };
    }

    // Date validation
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

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Send to WhatsApp AND Email simultaneously
function sendToWhatsApp(formData) {
    // Format date
    const formattedDate = new Date(formData.date).toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Create WhatsApp message
    const message = `*NEW RESERVATION - ${RESTAURANT_CONFIG.restaurantName}*%0A%0A` +
                   `*Guest Information*%0A` +
                   `Name: ${formData.name}%0A` +
                   `Phone: ${formData.phone}%0A` +
                   `Email: ${formData.email || 'Not provided'}%0A%0A` +
                   `*Reservation Details*%0A` +
                   `Date: ${formattedDate}%0A` +
                   `Time: ${formData.time}%0A` +
                   `Guests: ${formData.guests}%0A` +
                   `Special Requests: ${formData.message || 'None'}%0A%0A` +
                   `*Restaurant Info*%0A` +
                   `${RESTAURANT_CONFIG.restaurantName}%0A` +
                   `${RESTAURANT_CONFIG.restaurantAddress}%0A` +
                   `Phone: ${RESTAURANT_CONFIG.phoneNumber}%0A%0A` +
                   `_Sent via website reservation system_`;

    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${message}`;

    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
    
    return true;
}

// Send to Email
function sendToEmail(formData) {
    // Format date
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
Email: ${formData.email || 'Not provided'}

RESERVATION DETAILS:
Date: ${formattedDate}
Time: ${formData.time}
Number of Guests: ${formData.guests}
Special Requests: ${formData.message || 'None'}

RESTAURANT INFO:
${RESTAURANT_CONFIG.restaurantName}
${RESTAURANT_CONFIG.restaurantAddress}
Phone: ${RESTAURANT_CONFIG.phoneNumber}

This reservation was submitted via the website reservation system.
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:${RESTAURANT_CONFIG.restaurantEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.open(mailtoLink, '_blank');
    
    return true;
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

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
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
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        border-left: 4px solid ${iconColor};
        max-width: 400px;
    `;

    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
    `;

    notification.querySelector('.notification-content i').style.color = iconColor;

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: #666;
        cursor: pointer;
        font-size: 16px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        transition: all 0.2s ease;
    `;

    // Add to page
    document.body.appendChild(notification);

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
        }, 300);
    }, 5000);

    // Close button
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
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
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

function handleScroll() {
    const navbar = document.querySelector('.premium-navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}

// ============================================
// TOUCH EVENTS FOR MOBILE
// ============================================
function initTouchEvents() {
    // Add touch support for menu items
    document.querySelectorAll('.menu-item, .btn, .menu-tab, .social-icon').forEach(item => {
        item.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        item.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        });
    });
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Lazy load images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
});

// ============================================
// ERROR HANDLING
// ============================================
window.addEventListener('error', function(e) {
    console.error('Website error:', e.error);
});

// Add styles for notification
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .touch-active {
        transform: scale(0.98) !important;
        transition: transform 0.1s ease !important;
    }
    
    /* Responsive notification */
    @media (max-width: 768px) {
        .notification {
            top: 80px;
            right: 10px;
            left: 10px;
            max-width: calc(100% - 20px);
        }
    }
    
    /* Fix for iOS tap highlights */
    * {
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
    
    /* Fix for iOS form elements */
    input, select, textarea {
        font-size: 16px !important;
    }
`;
document.head.appendChild(notificationStyles);
