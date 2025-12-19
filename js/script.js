// Main JavaScript for La Artista Website

class LaArtista {
    constructor() {
        this.init();
    }

    init() {
        this.setupLoader();
        this.setupNavbar();
        this.setupScrollAnimations();
        this.setupMobileMenu();
        this.setupFormValidation();
        this.setupSmoothScroll();
        this.setupVideoOptimization();
        this.setupImageLazyLoading();
        this.setupIntersectionObserver();
        this.setupReservationForm();
        this.setupGoogleMaps();
    }

    // Loader Animation
    setupLoader() {
        const loader = document.querySelector('.loader');
        if (loader) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    loader.classList.add('hidden');
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 500);
                }, 1000);
            });
        }
    }

    // Navbar Scroll Effect
    setupNavbar() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let lastScroll = 0;
        const scrollThreshold = 100;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add shadow on scroll
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll
            if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });

        // Add active class to current page nav item
        this.setupActiveNavLink();
    }

    setupActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (currentPath.includes(linkPath) && linkPath !== '/') {
                link.classList.add('active');
            }
        });
    }

    // Mobile Menu Toggle
    setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                mobileMenu.classList.toggle('active');
                document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
            });

            // Close menu when clicking a link
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                    menuToggle.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    }

    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Add staggered animation for children
                    const children = entry.target.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('visible');
                        }, index * 150);
                    });
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
            observer.observe(el);
        });
    }

    // Form Validation
    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                if (this.validateForm(form)) {
                    this.submitForm(form);
                }
            });

            // Real-time validation
            const inputs = form.querySelectorAll('.form-input, .form-textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
                
                input.addEventListener('input', () => {
                    this.clearError(input);
                });
            });
        });
    }

    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('.form-input, .form-textarea');
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const errorElement = field.parentElement.querySelector('.error-message') || 
                           this.createErrorElement(field.parentElement);
        
        // Clear previous error
        field.classList.remove('error');
        errorElement.textContent = '';
        
        // Required validation
        if (field.hasAttribute('required') && !value) {
            this.showError(field, errorElement, 'This field is required');
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showError(field, errorElement, 'Please enter a valid email address');
                return false;
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[^\d+]/g, ''))) {
                this.showError(field, errorElement, 'Please enter a valid phone number');
                return false;
            }
        }
        
        return true;
    }

    createErrorElement(parent) {
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.style.cssText = `
            color: var(--red);
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: block;
        `;
        parent.appendChild(errorElement);
        return errorElement;
    }

    showError(field, errorElement, message) {
        field.classList.add('error');
        errorElement.textContent = message;
        field.focus();
    }

    clearError(field) {
        field.classList.remove('error');
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    async submitForm(form) {
        const submitBtn = form.querySelector('[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            this.showNotification('Message sent successfully!', 'success');
            
            // Reset form
            form.reset();
            
        } catch (error) {
            this.showNotification('Error sending message. Please try again.', 'error');
            console.error('Form submission error:', error);
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? 'var(--green)' : 'var(--red)'};
            color: var(--ivory);
            border-radius: 4px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            box-shadow: var(--shadow-lg);
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Smooth Scroll
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without page reload
                    history.pushState(null, null, targetId);
                }
            });
        });
    }

    // Video Optimization
    setupVideoOptimization() {
        const videos = document.querySelectorAll('video');
        
        videos.forEach(video => {
            // Lazy load videos
            if ('IntersectionObserver' in window) {
                const videoObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            video.play().catch(e => console.log('Autoplay prevented:', e));
                        } else {
                            video.pause();
                        }
                    });
                });
                
                videoObserver.observe(video);
            }
            
            // Add loading state
            video.addEventListener('loadeddata', () => {
                video.parentElement.classList.add('loaded');
            });
        });
    }

    // Image Lazy Loading
    setupImageLazyLoading() {
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
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Intersection Observer Setup
    setupIntersectionObserver() {
        const sections = document.querySelectorAll('section');
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, {
            threshold: 0.2
        });
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // Reservation Form Specific
    setupReservationForm() {
        const reservationForm = document.getElementById('reservationForm');
        if (!reservationForm) return;
        
        // Date picker initialization
        const dateInput = reservationForm.querySelector('input[type="date"]');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
            
            // Set default to next day
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            dateInput.value = tomorrow.toISOString().split('T')[0];
        }
        
        // Time slot selection
        const timeSlots = reservationForm.querySelectorAll('.time-slot');
        timeSlots.forEach(slot => {
            slot.addEventListener('click', () => {
                timeSlots.forEach(s => s.classList.remove('selected'));
                slot.classList.add('selected');
            });
        });
    }

    // Google Maps Integration
    setupGoogleMaps() {
        const mapElement = document.getElementById('googleMap');
        if (!mapElement) return;
        
        // Initialize map
        const map = new google.maps.Map(mapElement, {
            center: { lat: 56.9496, lng: 24.1052 }, // Riga coordinates
            zoom: 15,
            styles: [
                {
                    featureType: "all",
                    elementType: "geometry",
                    stylers: [{ color: "#f6f4ef" }]
                },
                {
                    featureType: "all",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#1f3d2b" }]
                }
            ]
        });
        
        // Add marker
        new google.maps.Marker({
            position: { lat: 56.9496, lng: 24.1052 },
            map: map,
            title: "La Artista",
            icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                        <circle cx="20" cy="20" r="18" fill="#1F3D2B" stroke="#F6F4EF" stroke-width="2"/>
                        <circle cx="20" cy="14" r="6" fill="#F6F4EF"/>
                        <rect x="12" y="22" width="16" height="10" rx="3" fill="#F6F4EF"/>
                    </svg>
                `)
            }
        });
    }

    // Utility Methods
    debounce(func, wait) {
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

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LaArtista();
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .notification.success { background: var(--green); }
        .notification.error { background: var(--red); }
        
        .time-slot {
            padding: 0.5rem 1rem;
            border: 1px solid rgba(31, 61, 43, 0.2);
            cursor: pointer;
            transition: var(--transition);
        }
        
        .time-slot:hover {
            border-color: var(--green);
        }
        
        .time-slot.selected {
            background: var(--green);
            color: var(--ivory);
            border-color: var(--green);
        }
        
        .menu-toggle {
            display: none;
        }
        
        @media (max-width: 1024px) {
            .menu-toggle {
                display: block;
                position: relative;
                width: 30px;
                height: 20px;
                background: none;
                border: none;
                cursor: pointer;
                z-index: 1000;
            }
            
            .menu-toggle span {
                display: block;
                width: 100%;
                height: 2px;
                background: var(--green);
                position: absolute;
                transition: var(--transition);
            }
            
            .menu-toggle span:nth-child(1) { top: 0; }
            .menu-toggle span:nth-child(2) { top: 9px; }
            .menu-toggle span:nth-child(3) { top: 18px; }
            
            .menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
    `;
    document.head.appendChild(style);
});

// Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(
            registration => {
                console.log('ServiceWorker registration successful');
            },
            err => {
                console.log('ServiceWorker registration failed: ', err);
            }
        );
    });
}
