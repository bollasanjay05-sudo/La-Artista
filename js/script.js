// ============================================
// L'ARTISTA FINE DINING - ENHANCED JAVASCRIPT
// ============================================

// Restaurant Configuration - UPDATED WITH YOUR INFO
const RESTAURANT_CONFIG = {
    whatsappNumber: '919136558275',
    restaurantEmail: 'bollasanjay05@gmail.com',
    restaurantName: "L'ARTISTA Fine Italian Dining",
    restaurantAddress: "Elizabetes iela 123, Centra rajons, Rīga, LV-1010, Latvia",
    phoneNumber: "+91 91365 58275",
    adminEmail: "bollasanjay05@gmail.com"
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎭 L\'ARTISTA Restaurant Website Initialized');
    
    // Initialize all components
    initComponents();
});

// ============================================
// INITIALIZE ALL COMPONENTS
// ============================================
function initComponents() {
    // Hide loader
    hideLoader();
    
    // Set current year in footer
    const currentYear = document.getElementById('currentYear');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // Initialize all features
    initNavigation();
    initMenuTabs();
    initReservationForm();
    initScrollEffects();
    initSmoothScrolling();
    
    // Setup form validation
    setupFormValidation();
    
    // Initialize video fallback
    initVideoFallback();
}

// ============================================
// LOADER
// ============================================
function hideLoader() {
    const pageLoader = document.getElementById('pageLoader');
    if (pageLoader) {
        // Hide loader after page is fully loaded
        window.addEventListener('load', function() {
            setTimeout(function() {
                pageLoader.style.opacity = '0';
                pageLoader.style.visibility = 'hidden';
                
                setTimeout(() => {
                    pageLoader.style.display = 'none';
                }, 800);
            }, 1000);
        });
    }
}

// ============================================
// VIDEO FALLBACK HANDLER
// ============================================
function initVideoFallback() {
    const video = document.querySelector('.ambiance-video');
    if (video) {
        video.addEventListener('error', function() {
            // Show placeholder if video fails to load
            const placeholder = document.createElement('div');
            placeholder.className = 'video-placeholder';
            placeholder.innerHTML = `
                <i class="fas fa-play-circle"></i>
                <p>Experience the L'ARTISTA Ambiance</p>
                <small>Video loading...</small>
            `;
            
            // Replace video with placeholder
            const parent = video.parentElement;
            parent.innerHTML = '';
            parent.appendChild(placeholder);
        });
    }
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const navbar = document.getElementById('navbar');

    // Mobile Menu Toggle
    if (mobileMenuToggle && mobileMenu && mobileMenuClose) {
        mobileMenuToggle.addEventListener('click', function() {
            const isActive = mobileMenu.classList.toggle('active');
            document.body.style.overflow = isActive ? 'hidden' : 'auto';
            
            // Animate hamburger icon
            this.classList.toggle('active');
        });

        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Close menu when clicking links
        document.querySelectorAll('.premium-mobile-menu .nav-link').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(249, 247, 242, 0.98)';
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                navbar.style.background = 'rgba(249, 247, 242, 0.95)';
                navbar.style.boxShadow = 'none';
            }
            
            // Update active nav link
            updateActiveNavLink();
        });
    }
}

// ============================================
// MENU TABS - UPDATED FOR NEW STRUCTURE
// ============================================
function initMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');

    if (!menuTabs.length || !menuCategories.length) return;

    // Set first tab as active
    if (menuTabs.length > 0) {
        menuTabs[0].classList.add('active');
    }
    
    if (menuCategories.length > 0) {
        menuCategories[0].classList.add('active');
    }

    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const categoryId = this.getAttribute('data-category');
            
            // Update active tab
            menuTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected category
            showMenuCategory(categoryId);
            
            // Scroll menu section to top when switching tabs
            const menuSection = document.querySelector('.menu-section');
            if (menuSection) {
                menuSection.scrollTop = 0;
            }
        });
    });
}

function showMenuCategory(categoryId) {
    const menuCategories = document.querySelectorAll('.menu-category');
    
    // Hide all categories first
    menuCategories.forEach(category => {
        category.classList.remove('active');
    });
    
    // Show selected category
    const selectedCategory = document.getElementById(categoryId);
    if (selectedCategory) {
        selectedCategory.classList.add('active');
    }
}

// ============================================
// RESERVATION FORM - UPDATED FOR DUAL NOTIFICATION
// ============================================
function initReservationForm() {
    const bookingForm = document.getElementById('bookingForm');
    if (!bookingForm) return;

    // Set minimum date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const todayFormatted = today.toISOString().split('T')[0];
        dateInput.min = todayFormatted;
        
        // Set default date to tomorrow
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
        dateInput.value = tomorrowFormatted;
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
        if (!validateReservationForm(formData)) {
            showNotification('Please fill in all required fields correctly', 'error');
            return;
        }

        // Show loading state
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;

        try {
            // Send reservation
            await sendReservation(formData);
            
            // Reset form
            bookingForm.reset();
            
            // Reset date to tomorrow
            if (dateInput) {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                dateInput.value = tomorrow.toISOString().split('T')[0];
            }
            
        } catch (error) {
            showNotification('Error sending reservation. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

function validateReservationForm(formData) {
    // Required fields validation
    if (!formData.name || !formData.email || !formData.phone || !formData.guests || !formData.date || !formData.time) {
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        return false;
    }
    
    // Phone validation (Indian format)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanedPhone = formData.phone.replace(/\D/g, '');
    if (!phoneRegex.test(cleanedPhone) || cleanedPhone.length < 10) {
        return false;
    }
    
    return true;
}

async function sendReservation(formData) {
    // Format date beautifully
    const formattedDate = new Date(formData.date).toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // 1. Create WhatsApp message for customer
    const whatsappMessage = `*🎭 NEW RESERVATION - ${RESTAURANT_CONFIG.restaurantName}*%0A%0A` +
                           `*📋 Guest Information*%0A` +
                           `👤 Name: ${formData.name}%0A` +
                           `📞 Phone: ${formData.phone}%0A` +
                           `📧 Email: ${formData.email}%0A%0A` +
                           `*📅 Reservation Details*%0A` +
                           `📅 Date: ${formattedDate}%0A` +
                           `⏰ Time: ${formData.time}%0A` +
                           `👥 Guests: ${formData.guests}%0A` +
                           `💭 Special Requests: ${formData.specialRequests || 'None'}%0A%0A` +
                           `📍 ${RESTAURANT_CONFIG.restaurantAddress}%0A` +
                           `📞 ${RESTAURANT_CONFIG.phoneNumber}%0A%0A` +
                           `_Thank you for choosing L'ARTISTA!_`;

    // 2. Create WhatsApp message for admin
    const adminWhatsappMessage = `*🚨 NEW RESERVATION ALERT - ${RESTAURANT_CONFIG.restaurantName}*%0A%0A` +
                                `*📋 Guest Information*%0A` +
                                `👤 Name: ${formData.name}%0A` +
                                `📞 Phone: ${formData.phone}%0A` +
                                `📧 Email: ${formData.email}%0A%0A` +
                                `*📅 Reservation Details*%0A` +
                                `📅 Date: ${formattedDate}%0A` +
                                `⏰ Time: ${formData.time}%0A` +
                                `👥 Guests: ${formData.guests}%0A` +
                                `💭 Special Requests: ${formData.specialRequests || 'None'}%0A%0A` +
                                `_Sent via website reservation system_`;

    // 3. Create email subject and body
    const emailSubject = `New Reservation - ${formData.name} - ${formattedDate}`;
    const emailBody = `New Reservation Details:\n\n` +
                     `Guest Information:\n` +
                     `Name: ${formData.name}\n` +
                     `Phone: ${formData.phone}\n` +
                     `Email: ${formData.email}\n\n` +
                     `Reservation Details:\n` +
                     `Date: ${formattedDate}\n` +
                     `Time: ${formData.time}\n` +
                     `Guests: ${formData.guests}\n` +
                     `Special Requests: ${formData.specialRequests || 'None'}\n\n` +
                     `Restaurant Information:\n` +
                     `${RESTAURANT_CONFIG.restaurantName}\n` +
                     `${RESTAURANT_CONFIG.restaurantAddress}\n` +
                     `Phone: ${RESTAURANT_CONFIG.phoneNumber}\n\n` +
                     `Sent via L'ARTISTA website reservation system`;

    // Create URLs
    const customerWhatsappURL = `https://wa.me/${formData.phone.replace(/\D/g, '')}?text=${whatsappMessage}`;
    const adminWhatsappURL = `https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${adminWhatsappMessage}`;
    const emailURL = `mailto:${RESTAURANT_CONFIG.restaurantEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // Show success notification
    showNotification('Reservation sent! Opening WhatsApp for confirmation...', 'success');
    
    // Open customer WhatsApp after delay
    setTimeout(() => {
        // Open customer WhatsApp
        window.open(customerWhatsappURL, '_blank');
        
        // Open admin WhatsApp after a short delay
        setTimeout(() => {
            window.open(adminWhatsappURL, '_blank');
            
            // Open email after another short delay
            setTimeout(() => {
                window.open(emailURL, '_blank');
            }, 500);
        }, 1000);
    }, 1500);
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
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} notification-icon"></i>
            <div class="notification-text">
                <span>${message}</span>
                <div class="notification-progress"></div>
            </div>
        </div>
        <button class="notification-close" aria-label="Close notification">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Start progress bar
    setTimeout(() => {
        const progressBar = notification.querySelector('.notification-progress');
        if (progressBar) {
            progressBar.style.transform = 'scaleX(0)';
        }
    }, 100);

    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 400);
    }, 5000);

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
    // Update active navigation link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 100;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    // Update nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').replace('#', '');
        if (href === currentSection) {
            link.classList.add('active');
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
                    if (link.getAttribute('href') === targetId) {
                        link.classList.add('active');
                    }
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    document.getElementById('mobileMenuToggle').classList.remove('active');
                    document.body.style.overflow = 'auto';
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
// FORM VALIDATION
// ============================================
function setupFormValidation() {
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
                }
            });
        });
    });
}

function validateField(field) {
    let isValid = true;
    
    // Required field validation
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
    }
    
    // Email validation
    if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && field.value.trim()) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanedPhone = field.value.replace(/\D/g, '');
        if (!phoneRegex.test(cleanedPhone) || cleanedPhone.length < 10) {
            isValid = false;
        }
    }
    
    // Update field state
    if (!isValid) {
        field.classList.add('invalid');
    } else {
        field.classList.remove('invalid');
    }
    
    return isValid;
}

// Initialize everything
initComponents();
