// ============================================
// L'ARTISTA FINE DINING - ENHANCED JAVASCRIPT
// ============================================

// DOM Elements
const pageLoader = document.getElementById('pageLoader');
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCategories = document.querySelectorAll('.menu-category');
const bookingForm = document.getElementById('bookingForm');
const newsletterForm = document.querySelector('.newsletter-form');
const backToTop = document.getElementById('backToTop');
const dateInput = document.getElementById('date');

// Restaurant Configuration
const RESTAURANT_CONFIG = {
    whatsappNumber: '37112345678',
    restaurantEmail: 'reservations@lartista.lv',
    restaurantName: "L'ARTISTA Fine Italian Dining",
    restaurantAddress: "Elizabetes iela 123, Centra rajons, Rīga, LV-1010, Latvia",
    phoneNumber: "+371 12 345 678"
};

// Performance Tracking
let pageLoadTime = Date.now();
let reservationAttempts = 0;

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎭 L\'ARTISTA Restaurant Website Initialized');
    
    // Track page load performance
    pageLoadTime = Date.now() - pageLoadTime;
    console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    
    // Initialize all components
    initComponents();
    
    // Setup performance optimizations
    setupPerformanceOptimizations();
    
    // Setup analytics
    setupAnalytics();
});

// ============================================
// INITIALIZE ALL COMPONENTS
// ============================================

function initComponents() {
    // Hide loader
    hideLoader();
    
    // Initialize all features
    initNavigation();
    initMenuTabs();
    initReservationForm();
    initNewsletterForm();
    initScrollAnimations();
    initSmoothScrolling();
    initBackToTop();
    initFormValidation();
    
    // Handle scroll events
    initScrollEffects();
    
    // Add touch event listeners for mobile
    initTouchEvents();
}

// ============================================
// LOADER
// ============================================

function hideLoader() {
    if (pageLoader) {
        setTimeout(() => {
            pageLoader.style.opacity = '0';
            pageLoader.style.visibility = 'hidden';
            
            setTimeout(() => {
                pageLoader.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 800);
        }, 1200);
    }
}

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

function setupPerformanceOptimizations() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScroll, 100);
    });
    
    // Cache DOM elements
    cacheDOM();
}

function cacheDOM() {
    window.cachedElements = {
        navbar: document.querySelector('.premium-navbar'),
        heroImage: document.querySelector('.hero-bg img'),
        whatsappFloat: document.querySelector('.whatsapp-float')
    };
}

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
    // Mobile Menu Toggle
    if (mobileMenuToggle && mobileMenu && mobileMenuClose) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        mobileMenuClose.addEventListener('click', closeMobileMenu);
        
        // Close menu when clicking links
        document.querySelectorAll('.premium-mobile-menu .nav-link').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }
    
    // Update active navigation link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function toggleMobileMenu() {
    const isActive = mobileMenu.classList.toggle('active');
    document.body.style.overflow = isActive ? 'hidden' : 'auto';
    
    // Track menu interaction
    trackEvent('mobile_menu_toggle', { state: isActive ? 'open' : 'closed' });
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ============================================
// MENU TABS
// ============================================

function initMenuTabs() {
    if (!menuTabs.length || !menuCategories.length) return;

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const categoryId = tab.getAttribute('data-category');
            
            // Update active tab
            menuTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show selected category
            showMenuCategory(categoryId);
            
            // Track menu tab interaction
            trackEvent('menu_tab_click', { category: categoryId });
        });
    });
}

function showMenuCategory(categoryId) {
    // Hide all categories first
    menuCategories.forEach(category => {
        category.classList.remove('active');
        category.style.opacity = '0';
        category.style.transform = 'translateY(20px)';
    });
    
    // Show selected category with animation
    const selectedCategory = document.getElementById(categoryId);
    if (selectedCategory) {
        setTimeout(() => {
            selectedCategory.classList.add('active');
            selectedCategory.style.opacity = '1';
            selectedCategory.style.transform = 'translateY(0)';
            
            // Animate menu items with delay
            const menuItems = selectedCategory.querySelectorAll('.menu-item');
            menuItems.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
            });
        }, 50);
    }
}

// ============================================
// RESERVATION FORM
// ============================================

function initReservationForm() {
    if (!bookingForm) return;

    // Set minimum date to today
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        
        // Set default date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.value = tomorrow.toISOString().split('T')[0];
        
        // Add date restrictions (max 90 days in advance)
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 90);
        dateInput.max = maxDate.toISOString().split('T')[0];
    }

    // Form submission
    bookingForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            guests: document.getElementById('guests').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            specialRequests: document.getElementById('special-requests').value.trim()
        };

        // Validate form
        const validation = validateReservationForm(formData);
        if (!validation.isValid) {
            showNotification(validation.message, 'error');
            highlightInvalidFields(validation.invalidFields);
            return;
        }

        // Show loading state
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            <span>Sending Reservation...</span>
            <div class="progress-bar"></div>
        `;
        submitBtn.disabled = true;

        try {
            // Simulate progress
            simulateProgress(submitBtn);
            
            // Send reservation
            const reservationSent = await sendReservation(formData);
            
            reservationAttempts++;
            
            if (reservationSent) {
                showNotification('🎉 Reservation sent successfully! We\'ll confirm shortly.', 'success');
                
                // Track successful reservation
                trackEvent('reservation_success', {
                    attempts: reservationAttempts,
                    hasEmail: !!formData.email
                });
                
                // Reset form after delay
                setTimeout(() => {
                    bookingForm.reset();
                    if (dateInput) {
                        const tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        dateInput.value = tomorrow.toISOString().split('T')[0];
                    }
                    resetFormVisuals();
                }, 1500);
            } else {
                showNotification('⚠️ Please try again or contact us directly.', 'error');
                trackEvent('reservation_error', { attempts: reservationAttempts });
            }
        } catch (error) {
            console.error('Reservation error:', error);
            showNotification('❌ Error sending reservation. Please try again.', 'error');
            trackEvent('reservation_exception', { error: error.message });
        } finally {
            // Restore button state
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.querySelector('.progress-bar')?.remove();
            }, 2000);
        }
    });
}

function validateReservationForm(data) {
    const invalidFields = [];
    
    // Required fields validation
    const requiredFields = [
        { key: 'name', label: 'Full Name' },
        { key: 'email', label: 'Email Address' },
        { key: 'phone', label: 'Phone Number' },
        { key: 'date', label: 'Date' },
        { key: 'time', label: 'Time' },
        { key: 'guests', label: 'Number of Guests' }
    ];
    
    for (const field of requiredFields) {
        if (!data[field.key]) {
            invalidFields.push(field.key);
        }
    }
    
    if (invalidFields.length > 0) {
        return {
            isValid: false,
            message: 'Please fill in all required fields',
            invalidFields
        };
    }

    // Email validation
    if (data.email && !isValidEmail(data.email)) {
        invalidFields.push('email');
        return {
            isValid: false,
            message: 'Please enter a valid email address',
            invalidFields
        };
    }

    // Phone validation
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
    const cleanedPhone = data.phone.replace(/\D/g, '');
    if (!phoneRegex.test(data.phone) || cleanedPhone.length < 8) {
        invalidFields.push('phone');
        return {
            isValid: false,
            message: 'Please enter a valid phone number',
            invalidFields
        };
    }

    // Date validation
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        invalidFields.push('date');
        return {
            isValid: false,
            message: 'Please select a future date',
            invalidFields
        };
    }

    return { 
        isValid: true, 
        message: 'Valid',
        invalidFields: []
    };
}

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function highlightInvalidFields(fields) {
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.classList.add('invalid');
            setTimeout(() => {
                field.classList.remove('invalid');
            }, 3000);
        }
    });
}

function resetFormVisuals() {
    document.querySelectorAll('.form-control.invalid').forEach(field => {
        field.classList.remove('invalid');
    });
}

function simulateProgress(button) {
    const progressBar = button.querySelector('.progress-bar') || 
                       document.createElement('div');
    
    progressBar.className = 'progress-bar';
    progressBar.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #25d366, #D6273B);
        width: 0%;
        transition: width 2s ease-in-out;
        border-radius: 0 0 4px 4px;
    `;
    
    if (!button.querySelector('.progress-bar')) {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(progressBar);
    }
    
    setTimeout(() => {
        progressBar.style.width = '100%';
    }, 100);
}

async function sendReservation(formData) {
    return new Promise((resolve, reject) => {
        try {
            // Format date beautifully
            const formattedDate = new Date(formData.date).toLocaleDateString('en-GB', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Create WhatsApp message
            const message = `*🎭 NEW RESERVATION - ${RESTAURANT_CONFIG.restaurantName}*%0A%0A` +
                           `*📋 Guest Information*%0A` +
                           `👤 Name: ${formData.name}%0A` +
                           `📞 Phone: ${formData.phone}%0A` +
                           `📧 Email: ${formData.email}%0A%0A` +
                           `*📅 Reservation Details*%0A` +
                           `📅 Date: ${formattedDate}%0A` +
                           `⏰ Time: ${formData.time}%0A` +
                           `👥 Guests: ${formData.guests}%0A` +
                           `💭 Special Requests: ${formData.specialRequests || 'None'}%0A%0A` +
                           `*🏛️ Restaurant Info*%0A` +
                           `${RESTAURANT_CONFIG.restaurantName}%0A` +
                           `📍 ${RESTAURANT_CONFIG.restaurantAddress}%0A` +
                           `📞 ${RESTAURANT_CONFIG.phoneNumber}%0A%0A` +
                           `_Sent via website reservation system_`;

            // Create WhatsApp URL
            const whatsappURL = `https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${message}`;

            // Open WhatsApp in new tab
            const whatsappWindow = window.open(whatsappURL, '_blank', 'noopener,noreferrer');
            
            if (whatsappWindow) {
                setTimeout(() => {
                    resolve(true);
                }, 1000);
            } else {
                // Fallback for popup blockers
                window.location.href = whatsappURL;
                setTimeout(() => resolve(true), 500);
            }
        } catch (error) {
            reject(error);
        }
    });
}

// ============================================
// NEWSLETTER FORM
// ============================================

function initNewsletterForm() {
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('.newsletter-input');
        const email = emailInput.value.trim();
        
        if (email && isValidEmail(email)) {
            showNotification(`Thank you for subscribing with ${email}! You'll receive our updates soon.`, 'success');
            emailInput.value = '';
            
            // Track newsletter subscription
            trackEvent('newsletter_subscription', { email: email });
        } else {
            showNotification('Please enter a valid email address', 'error');
        }
    });
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'info', duration = 5000) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (existingNotification.parentNode) {
                existingNotification.remove();
            }
        }, 300);
    }

    // Determine icon and color
    const notificationConfig = {
        success: { icon: 'check-circle', color: '#25d366' },
        error: { icon: 'exclamation-circle', color: '#D6273B' },
        warning: { icon: 'exclamation-triangle', color: '#f0ad4e' },
        info: { icon: 'info-circle', color: '#1F3D2B' }
    }[type] || { icon: 'info-circle', color: '#1F3D2B' };

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'assertive');
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${notificationConfig.icon}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" aria-label="Close notification">
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
        border-radius: 12px;
        box-shadow: 0 5px 25px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        border-left: 4px solid ${notificationConfig.color};
        max-width: 400px;
        opacity: 0;
    `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Auto remove after duration
    const autoRemove = setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 400);
    }, duration);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        notification.style.transform = 'translateX(400px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 400);
    });
}

// ============================================
// SCROLL EFFECTS
// ============================================

function initScrollEffects() {
    // Navbar scroll effect
    window.addEventListener('scroll', handleScroll);
}

function handleScroll() {
    // Navbar scroll effect
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Update active navigation link
    updateActiveNavLink();
    
    // Show/hide back to top button
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ============================================
// SMOOTH SCROLLING
// ============================================

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// BACK TO TOP
// ============================================

function initBackToTop() {
    if (!backToTop) return;
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
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
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe staggered items
    document.querySelectorAll('.staggered-item').forEach(item => {
        observer.observe(item);
    });

    // Observe fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// FORM VALIDATION
// ============================================

function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Add real-time validation feedback
            input.addEventListener('blur', () => {
                validateField(input);
            });
            
            // Remove error state on input
            input.addEventListener('input', () => {
                if (input.classList.contains('invalid')) {
                    input.classList.remove('invalid');
                    const errorMsg = input.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }
                }
            });
        });
    });
}

function validateField(field) {
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && field.value.trim()) {
        if (!isValidEmail(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && field.value.trim()) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanedPhone = field.value.replace(/\D/g, '');
        if (!phoneRegex.test(cleanedPhone) || cleanedPhone.length < 8) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // Update field state
    if (!isValid) {
        field.classList.add('invalid');
        
        // Add or update error message
        let errorElement = field.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.insertBefore(errorElement, field.nextSibling);
        }
        
        errorElement.textContent = errorMessage;
        errorElement.style.cssText = `
            color: #D6273B;
            font-size: 12px;
            margin-top: 4px;
            animation: fadeIn 0.3s ease;
        `;
    } else {
        field.classList.remove('invalid');
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
    }
    
    return isValid;
}

// ============================================
// TOUCH EVENTS FOR MOBILE
// ============================================

function initTouchEvents() {
    // Add touch support for interactive elements
    const touchElements = document.querySelectorAll('.menu-item, .btn, .menu-tab, .social-icon');
    
    touchElements.forEach(item => {
        // Touch start
        item.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        // Touch end
        item.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        });
        
        // Touch cancel
        item.addEventListener('touchcancel', function() {
            this.classList.remove('touch-active');
        });
    });
}

// ============================================
// ANALYTICS & EVENT TRACKING
// ============================================

function setupAnalytics() {
    // Track page views
    trackEvent('page_view', {
        page: window.location.pathname,
        referrer: document.referrer
    });
    
    // Track clicks on important elements
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('click', (e) => {
            const text = element.textContent.trim() || element.getAttribute('aria-label') || 'Unknown';
            trackEvent('element_click', {
                element: text,
                href: element.getAttribute('href') || 'none'
            });
        });
    });
    
    // Track form interactions
    if (bookingForm) {
        bookingForm.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('focus', () => {
                trackEvent('form_field_focus', { field: field.id });
            });
        });
    }
}

function trackEvent(eventName, eventData = {}) {
    // Simple event tracking - you can integrate with Google Analytics or other services
    const event = {
        name: eventName,
        data: eventData,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
    };
    
    console.log('📊 Event:', event);
    
    // You can add your analytics service here
    // Example: Google Analytics
    // if (window.gtag) {
    //     gtag('event', eventName, eventData);
    // }
}

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', function(e) {
    console.error('Website error:', e.error);
    trackEvent('javascript_error', {
        message: e.error.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno
    });
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    trackEvent('promise_rejection', { reason: e.reason.toString() });
});

// ============================================
// HELPER FUNCTIONS
// ============================================

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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', initComponents);
