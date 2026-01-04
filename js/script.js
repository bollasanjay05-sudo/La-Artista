// ============================================
// L'ARTISTA FINE DINING - ENHANCED & OPTIMIZED
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

// Performance & Analytics Tracking
let pageLoadTime = Date.now();
let reservationAttempts = 0;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎭 L\'ARTISTA Restaurant Website Initialized');
    
    // Track page load performance
    pageLoadTime = Date.now() - pageLoadTime;
    console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    
    // Initialize all components
    initComponents();
    
    // Setup performance optimizations
    setupPerformanceOptimizations();
    
    // Setup PWA features
    setupPWA();
});

// ============================================
// INITIALIZE ALL COMPONENTS
// ============================================
function initComponents() {
    // Hide loader with smooth transition
    setTimeout(() => {
        if (loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            document.body.style.overflow = 'auto';
            
            setTimeout(() => {
                loader.style.display = 'none';
            }, 800);
        }
    }, 1200);

    // Set current year in footer
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Initialize all features
    initMobileMenu();
    initMenuTabs();
    initReservationForm();
    initScrollAnimations();
    initImageLazyLoading();
    initVideoOptimization();
    initFormValidation();

    // Handle scroll events
    window.addEventListener('scroll', handleScroll);

    // Add touch event listeners for mobile
    initTouchEvents();
    
    // Setup keyboard navigation
    initKeyboardNavigation();
    
    // Setup analytics events
    setupAnalytics();
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
    
    // Preload critical resources
    if ('connection' in navigator && navigator.connection.saveData) {
        console.log('📱 Data saver mode detected - optimizing resources');
    }
    
    // Cache DOM elements
    cacheDOM();
}

// Cache frequently used DOM elements
function cacheDOM() {
    window.cachedElements = {
        navbar: document.querySelector('.premium-navbar'),
        heroVideo: document.querySelector('.hero-video video'),
        whatsappFloat: document.querySelector('.whatsapp-float')
    };
}

// ============================================
// PWA SETUP
// ============================================
function setupPWA() {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(registration => {
                console.log('✅ ServiceWorker registration successful:', registration.scope);
            }).catch(error => {
                console.log('❌ ServiceWorker registration failed:', error);
            });
        });
    }
    
    // Handle app install prompt
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later
        deferredPrompt = e;
        // Show custom install button if needed
        showInstallPrompt();
    });
    
    window.addEventListener('appinstalled', () => {
        console.log('📱 PWA installed successfully');
        // Clear the deferredPrompt so it can be garbage collected
        deferredPrompt = null;
        // Track installation
        trackEvent('pwa_installed');
    });
}

// Show custom install prompt
function showInstallPrompt() {
    // You can create a custom install button here
    const installButton = document.createElement('button');
    installButton.className = 'btn btn-premium install-btn';
    installButton.innerHTML = '<i class="fas fa-download"></i> Install App';
    installButton.style.position = 'fixed';
    installButton.style.bottom = '100px';
    installButton.style.right = '30px';
    installButton.style.zIndex = '999';
    
    installButton.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        
        // Show the install prompt
        deferredPrompt.prompt();
        
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            console.log('✅ User accepted the install prompt');
        } else {
            console.log('❌ User dismissed the install prompt');
        }
        
        // Remove the button
        installButton.remove();
        deferredPrompt = null;
    });
    
    document.body.appendChild(installButton);
}

// ============================================
// MOBILE MENU - ENHANCED
// ============================================
function initMobileMenu() {
    if (!menuToggle || !mobileMenu || !mobileMenuClose) return;

    // Toggle mobile menu with animation
    menuToggle.addEventListener('click', () => {
        const isActive = menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : 'auto';
        
        // Track menu interaction
        trackEvent('mobile_menu_toggle', { state: isActive ? 'open' : 'closed' });
    });

    // Close mobile menu
    mobileMenuClose.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close menu when clicking links with smooth transition
    document.querySelectorAll('.premium-mobile-menu .nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            // Close menu first
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Then scroll to target
            setTimeout(() => {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 300);
        });
    });
}

// ============================================
// MENU TABS - ENHANCED
// ============================================
function initMenuTabs() {
    if (!menuTabs.length || !menuCategories.length) return;

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            // Update active tab with animation
            menuTabs.forEach(t => {
                t.classList.remove('active');
                t.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    t.style.transform = 'scale(1)';
                }, 50);
            });
            
            tab.classList.add('active');
            tab.style.transform = 'scale(1.05)';
            
            // Show corresponding category with fade effect
            menuCategories.forEach(category => {
                category.style.opacity = '0';
                category.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    category.classList.remove('active');
                    
                    if (category.id === tabId) {
                        setTimeout(() => {
                            category.classList.add('active');
                            category.style.opacity = '1';
                            category.style.transform = 'translateY(0)';
                        }, 50);
                    }
                }, 300);
            });
            
            // Track menu tab interaction
            trackEvent('menu_tab_click', { tab: tabId });
        });
    });
}

// ============================================
// RESERVATION SYSTEM - ENHANCED
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
        
        // Add date restrictions (max 90 days in advance)
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 90);
        dateInput.max = maxDate.toISOString().split('T')[0];
    }

    // Time selection enhancement
    const timeSelect = document.getElementById('time');
    if (timeSelect) {
        // Generate time slots dynamically
        const times = ['18:00', '19:00', '20:00', '21:00', '22:00'];
        timeSelect.innerHTML = '<option value="">Select time</option>' + 
            times.map(time => `<option value="${time}">${time}</option>`).join('');
    }

    // Form submission with enhanced validation
    reservationForm.addEventListener('submit', async function(e) {
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

        // Enhanced validation
        const validation = validateReservationForm(formData);
        if (!validation.isValid) {
            showNotification(validation.message, 'error');
            // Add visual feedback for invalid fields
            highlightInvalidFields(validation.invalidFields);
            return;
        }

        // Show enhanced loading state
        const submitBtn = reservationForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            <span>SENDING RESERVATION...</span>
            <div class="progress-bar"></div>
        `;
        submitBtn.disabled = true;

        try {
            // Simulate progress
            simulateProgress(submitBtn);
            
            // Send to WhatsApp AND Email simultaneously
            const [whatsappSent, emailSent] = await Promise.allSettled([
                sendToWhatsApp(formData),
                sendToEmail(formData)
            ]);

            reservationAttempts++;
            
            if (whatsappSent.status === 'fulfilled' || emailSent.status === 'fulfilled') {
                showNotification('🎉 Reservation sent successfully! We\'ll confirm shortly.', 'success');
                
                // Track successful reservation
                trackEvent('reservation_success', {
                    attempts: reservationAttempts,
                    hasEmail: !!formData.email
                });
                
                // Reset form after delay with animation
                setTimeout(() => {
                    reservationForm.reset();
                    if (dateInput) {
                        const tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        dateInput.value = tomorrow.toISOString().split('T')[0];
                    }
                    // Reset visual state
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

// Enhanced form validation
function validateReservationForm(data) {
    const invalidFields = [];
    
    // Required fields validation
    const requiredFields = [
        { key: 'name', label: 'Full Name' },
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
            message: `Please fill in all required fields`,
            invalidFields
        };
    }

    // Phone validation with international format
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

    // Email validation with better pattern
    if (data.email && !isValidEmail(data.email)) {
        invalidFields.push('email');
        return {
            isValid: false,
            message: 'Please enter a valid email address',
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

    // Max guests validation
    const guestsNum = parseInt(data.guests);
    if (guestsNum < 1 || guestsNum > 20) {
        invalidFields.push('guests');
        return {
            isValid: false,
            message: 'Please select 1-20 guests',
            invalidFields
        };
    }

    return { 
        isValid: true, 
        message: 'Valid',
        invalidFields: []
    };
}

// Enhanced email validation
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Highlight invalid fields
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

// Reset form visuals
function resetFormVisuals() {
    document.querySelectorAll('.form-control.invalid').forEach(field => {
        field.classList.remove('invalid');
    });
}

// Simulate progress for better UX
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

// Enhanced WhatsApp message sending
function sendToWhatsApp(formData) {
    return new Promise((resolve, reject) => {
        try {
            // Format date beautifully
            const formattedDate = new Date(formData.date).toLocaleDateString('en-GB', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Create enhanced WhatsApp message with emojis
            const message = `*🎭 NEW RESERVATION - ${RESTAURANT_CONFIG.restaurantName}*%0A%0A` +
                           `*📋 Guest Information*%0A` +
                           `👤 Name: ${formData.name}%0A` +
                           `📞 Phone: ${formData.phone}%0A` +
                           `📧 Email: ${formData.email || 'Not provided'}%0A%0A` +
                           `*📅 Reservation Details*%0A` +
                           `📅 Date: ${formattedDate}%0A` +
                           `⏰ Time: ${formData.time}%0A` +
                           `👥 Guests: ${formData.guests}%0A` +
                           `💭 Special Requests: ${formData.message || 'None'}%0A%0A` +
                           `*🏛️ Restaurant Info*%0A` +
                           `${RESTAURANT_CONFIG.restaurantName}%0A` +
                           `📍 ${RESTAURANT_CONFIG.restaurantAddress}%0A` +
                           `📞 ${RESTAURANT_CONFIG.phoneNumber}%0A%0A` +
                           `_Sent via website reservation system_` +
                           `%0A%0A📱 _Message ID: ${Date.now()}_`;

            // Create WhatsApp URL with enhanced parameters
            const whatsappURL = `https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${message}`;

            // Open WhatsApp in new tab with fallback
            const whatsappWindow = window.open(whatsappURL, '_blank', 'noopener,noreferrer');
            
            if (whatsappWindow) {
                setTimeout(() => {
                    if (!whatsappWindow.closed) {
                        resolve(true);
                    } else {
                        reject(new Error('WhatsApp window closed'));
                    }
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

// Enhanced Email sending
function sendToEmail(formData) {
    return new Promise((resolve, reject) => {
        try {
            // Format date
            const formattedDate = new Date(formData.date).toLocaleDateString('en-GB', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Create email subject and body
            const subject = `🎭 New Reservation: ${formData.name} - ${formattedDate} ${formData.time}`;
            const body = `
🎭 NEW RESERVATION - ${RESTAURANT_CONFIG.restaurantName}

📋 GUEST INFORMATION:
👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
📧 Email: ${formData.email || 'Not provided'}

📅 RESERVATION DETAILS:
📅 Date: ${formattedDate}
⏰ Time: ${formData.time}
👥 Number of Guests: ${formData.guests}
💭 Special Requests: ${formData.message || 'None'}

🏛️ RESTAURANT INFO:
${RESTAURANT_CONFIG.restaurantName}
📍 ${RESTAURANT_CONFIG.restaurantAddress}
📞 ${RESTAURANT_CONFIG.phoneNumber}

---
📱 Sent via website reservation system
🆔 Message ID: ${Date.now()}
            `.trim();

            // Create mailto link with enhanced parameters
            const mailtoLink = `mailto:${RESTAURANT_CONFIG.restaurantEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Open email client with fallback
            const emailWindow = window.open(mailtoLink, '_blank', 'noopener,noreferrer');
            
            if (emailWindow) {
                setTimeout(() => {
                    if (!emailWindow.closed) {
                        resolve(true);
                    } else {
                        reject(new Error('Email window closed'));
                    }
                }, 1000);
            } else {
                // Fallback for popup blockers
                window.location.href = mailtoLink;
                setTimeout(() => resolve(true), 500);
            }
        } catch (error) {
            reject(error);
        }
    });
}

// ============================================
// NOTIFICATION SYSTEM - ENHANCED
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

    // Determine icon and color based on type
    const notificationConfig = {
        success: { icon: 'check-circle', color: '#25d366', iconColor: '#25d366' },
        error: { icon: 'exclamation-circle', color: '#D6273B', iconColor: '#D6273B' },
        warning: { icon: 'exclamation-triangle', color: '#f0ad4e', iconColor: '#f0ad4e' },
        info: { icon: 'info-circle', color: '#1F3D2B', iconColor: '#1F3D2B' }
    }[type] || notificationConfig.info;

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'assertive');
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${notificationConfig.icon} notification-icon"></i>
            <div class="notification-text">
                <span>${message}</span>
                <div class="notification-progress"></div>
            </div>
        </div>
        <button class="notification-close" aria-label="Close notification">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add styles dynamically
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

    // Style the content
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
    `;

    // Style the icon
    const icon = notification.querySelector('.notification-icon');
    icon.style.cssText = `
        color: ${notificationConfig.iconColor};
        font-size: 20px;
        flex-shrink: 0;
    `;

    // Style the text container
    const textContainer = notification.querySelector('.notification-text');
    textContainer.style.cssText = `
        flex: 1;
        min-width: 0;
    `;

    // Style the progress bar
    const progressBar = notification.querySelector('.notification-progress');
    progressBar.style.cssText = `
        height: 3px;
        background: ${notificationConfig.color};
        width: 100%;
        transform: scaleX(1);
        transform-origin: left;
        transition: transform ${duration}ms linear;
        margin-top: 8px;
        border-radius: 2px;
    `;

    // Style the close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: #666;
        cursor: pointer;
        font-size: 16px;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        transition: all 0.2s ease;
        flex-shrink: 0;
    `;

    // Add hover effect to close button
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(0,0,0,0.05)';
        closeBtn.style.color = '#333';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'none';
        closeBtn.style.color = '#666';
    });

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Start progress bar animation
    setTimeout(() => {
        progressBar.style.transform = 'scaleX(0)';
    }, 100);

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

    // Add click outside to close (optional)
    notification.addEventListener('click', (e) => {
        if (e.target === notification) {
            clearTimeout(autoRemove);
            notification.style.transform = 'translateX(400px)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 400);
        }
    });
}

// ============================================
// IMAGE LAZY LOADING - ENHANCED
// ============================================
function initImageLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyVideos = document.querySelectorAll('video[data-src]');
    
    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
        return;
    }
    
    // Configure Intersection Observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                loadImage(img);
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '100px 0px',
        threshold: 0.1
    });
    
    const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                loadVideo(video);
                observer.unobserve(video);
            }
        });
    }, {
        rootMargin: '200px 0px',
        threshold: 0.1
    });
    
    // Observe all lazy elements
    lazyImages.forEach(img => imageObserver.observe(img));
    lazyVideos.forEach(video => videoObserver.observe(video));
}

function loadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) return;
    
    // Create new image to preload
    const preloadImage = new Image();
    preloadImage.src = src;
    
    preloadImage.onload = () => {
        img.src = src;
        img.removeAttribute('data-src');
        img.classList.add('loaded');
        img.style.opacity = '1';
        img.style.transition = 'opacity 0.5s ease';
    };
    
    preloadImage.onerror = () => {
        console.warn('Failed to load image:', src);
        img.classList.add('load-error');
    };
}

function loadVideo(video) {
    const src = video.getAttribute('data-src');
    if (!src) return;
    
    const source = video.querySelector('source');
    if (source) {
        source.src = src;
        video.load();
        video.removeAttribute('data-src');
    }
}

// ============================================
// VIDEO OPTIMIZATION
// ============================================
function initVideoOptimization() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Add loading attribute for better performance
        video.setAttribute('loading', 'lazy');
        
        // Handle video play/pause on visibility
        if ('IntersectionObserver' in window) {
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Video is in view, try to play
                        video.play().catch(e => {
                            console.log('Video autoplay prevented:', e);
                        });
                    } else {
                        // Video is out of view, pause to save resources
                        video.pause();
                    }
                });
            }, {
                threshold: 0.5
            });
            
            videoObserver.observe(video);
        }
    });
}

// ============================================
// FORM VALIDATION ENHANCEMENTS
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
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
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
// SCROLL ANIMATIONS - ENHANCED
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for child elements
                const animatedChildren = entry.target.querySelectorAll('.animate-child');
                animatedChildren.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animated');
                    }, index * 100);
                });
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
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.background = 'rgba(249, 247, 242, 0.98)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.background = 'rgba(249, 247, 242, 0.95)';
        }
    }
    
    // Update active navigation link based on scroll position
    updateActiveNavLink();
}

// ============================================
// ACTIVE NAVIGATION LINK UPDATER
// ============================================
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
// TOUCH EVENTS FOR MOBILE - ENHANCED
// ============================================
function initTouchEvents() {
    // Add touch support for interactive elements
    const touchElements = document.querySelectorAll('.menu-item, .btn, .menu-tab, .social-icon, .gallery-item');
    
    touchElements.forEach(item => {
        // Touch start
        item.addEventListener('touchstart', function(e) {
            this.classList.add('touch-active');
            
            // Prevent background scroll on touch
            if (this.classList.contains('menu-item') || 
                this.classList.contains('gallery-item')) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Touch end
        item.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        });
        
        // Touch cancel
        item.addEventListener('touchcancel', function() {
            this.classList.remove('touch-active');
        });
    });
    
    // Add swipe support for mobile menu
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].
