// DOM Elements
const loader = document.querySelector('.loader');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const reservationForm = document.getElementById('reservationForm');
const currentYear = document.getElementById('currentYear');

// WhatsApp Number - CHANGE THIS TO YOUR NUMBER
const WHATSAPP_NUMBER = '37112345678'; // Example: Latvia number format

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Hide loader after 1 second
    setTimeout(() => {
        if (loader) {
            loader.style.display = 'none';
        }
    }, 1000);

    // Set current year in footer
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Mobile menu toggle
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking links
        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // Set minimum date to today for reservation form
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }

    // Reservation form submission
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                guests: document.getElementById('guests').value,
                message: document.getElementById('message').value
            };

            // Validate form
            if (!validateForm(formData)) {
                return;
            }

            // Format date
            const formattedDate = new Date(formData.date).toLocaleDateString('en-GB', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Create WhatsApp message
            const whatsappMessage = `*NEW RESERVATION REQUEST*%0A%0A` +
                                  `*Name:* ${formData.name}%0A` +
                                  `*Phone:* ${formData.phone}%0A` +
                                  `*Date:* ${formattedDate}%0A` +
                                  `*Time:* ${formData.time}%0A` +
                                  `*Guests:* ${formData.guests}%0A` +
                                  `*Special Requests:* ${formData.message || 'None'}%0A%0A` +
                                  `_Sent via L'ARTISTA website_`;

            // Create WhatsApp URL
            const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

            // Open WhatsApp in new tab
            window.open(whatsappURL, '_blank');

            // Show success message
            showNotification('Reservation sent to WhatsApp! Please check your messages.', 'success');

            // Reset form after 2 seconds
            setTimeout(() => {
                reservationForm.reset();
            }, 2000);
        });
    }

    // Initialize scroll animations
    initScrollAnimations();
});

// Form validation
function validateForm(data) {
    // Check if all required fields are filled
    if (!data.name || !data.phone || !data.date || !data.time || !data.guests) {
        showNotification('Please fill in all required fields', 'error');
        return false;
    }

    // Phone validation (basic)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanedPhone = data.phone.replace(/\D/g, '');
    if (!phoneRegex.test(cleanedPhone)) {
        showNotification('Please enter a valid phone number', 'error');
        return false;
    }

    return true;
}

// Show notification
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
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';

    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        border-left: 4px solid ${type === 'success' ? '#25d366' : type === 'error' ? '#D6273B' : '#1F3D2B'};
        max-width: 400px;
    `;

    // Add content styles
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
    `;

    // Add icon color
    notification.querySelector('.notification-content i').style.color = 
        type === 'success' ? '#25d366' : type === 'error' ? '#D6273B' : '#1F3D2B';

    // Close button styles
    notification.querySelector('.notification-close').style.cssText = `
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

    notification.querySelector('.notification-close:hover').style.backgroundColor = '#f5f5f5';

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

    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(autoRemove);
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// Scroll animations
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
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

    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        navbar.style.padding = '10px 0';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.padding = '15px 0';
    }
});

// Simple image lazy loading
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
