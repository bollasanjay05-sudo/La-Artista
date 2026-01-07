// ============================================
// L'ARTISTA FINE DINING - ENHANCED JAVASCRIPT
// ============================================

// Restaurant Configuration
const RESTAURANT_CONFIG = {
    whatsappNumber: '37112345678',
    restaurantEmail: 'reservations@lartista.lv',
    restaurantName: "L'ARTISTA Fine Italian Dining",
    restaurantAddress: "Elizabetes iela 123, Centra rajons, Rīga, LV-1010, Latvia",
    phoneNumber: "+371 12 345 678"
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
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
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

    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const categoryId = this.getAttribute('data-category');
            
            // Update active tab
            menuTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected category
            showMenuCategory(categoryId);
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
// RESERVATION FORM
// ============================================
function initReservationForm() {
    const bookingForm = document.getElementById('bookingForm');
    if (!bookingForm) return;

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
    bookingForm.addEventListener('submit', function(e) {
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
        if (!formData.name || !formData.phone || !formData.guests || !formData.date || !formData.time) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Send reservation
        sendReservation(formData);
    });
}

function sendReservation(formData) {
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
                   `📧 Email: ${formData.email || 'Not provided'}%0A%0A` +
                   `*📅 Reservation Details*%0A` +
                   `📅 Date: ${formattedDate}%0A` +
                   `⏰ Time: ${formData.time}%0A` +
                   `👥 Guests: ${formData.guests}%0A` +
                   `💭 Special Requests: ${formData.specialRequests || 'None'}%0A%0A` +
                   `_Sent via website reservation system_`;

    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${message}`;

    // Show success notification
    showNotification('Reservation sent successfully! Opening WhatsApp...', 'success');
    
    // Open WhatsApp after delay
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
        
        // Reset form
        document.getElementById('bookingForm').reset();
        
        // Reset date to tomorrow
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            dateInput.value = tomorrow.toISOString().split('T')[0];
        }
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
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} notification-icon"></i>
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
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
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
        if (!phoneRegex.test(cleanedPhone) || cleanedPhone.length < 8) {
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
