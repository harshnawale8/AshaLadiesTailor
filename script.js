// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    // Initialize all functionality
    initializeGalleryFilter();
    initializeContactForm();
    initializeFloatingWhatsApp();
    initializeSmoothScrolling();
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Gallery filtering functionality
function initializeGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.classList.remove('filtered-out');
                } else {
                    item.style.display = 'none';
                    item.classList.add('filtered-out');
                }
            });
        });
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            if (!data.name || !data.phone || !data.message) {
                showToast('Please fill in all required fields.', 'error');
                return;
            }
            
            // Create WhatsApp message
            const message = `Hello Asha Tailor! 

Name: ${data.name}
Email: ${data.email || 'Not provided'}
Phone: ${data.phone}
Service: ${data.service || 'Not specified'}

Message: ${data.message}`;
            
            // Open WhatsApp
            const whatsappUrl = `https://wa.me/8669593756?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            // Show success message
            showToast('Message sent! Your inquiry has been sent via WhatsApp. We\'ll respond shortly!', 'success');
            
            // Reset form
            this.reset();
        });
    }
}

// Floating WhatsApp functionality
function initializeFloatingWhatsApp() {
    const whatsappToggle = document.getElementById('whatsappToggle');
    const whatsappCard = document.getElementById('whatsappCard');
    const closeWhatsapp = document.getElementById('closeWhatsapp');
    const startChat = document.getElementById('startChat');
    
    if (whatsappToggle && whatsappCard) {
        whatsappToggle.addEventListener('click', function() {
            whatsappCard.classList.toggle('hidden');
        });
        
        if (closeWhatsapp) {
            closeWhatsapp.addEventListener('click', function() {
                whatsappCard.classList.add('hidden');
            });
        }
        
        if (startChat) {
            startChat.addEventListener('click', function() {
                const message = encodeURIComponent("Hello Asha Tailor! I'm interested in your blouse stitching services. Can we discuss my requirements?");
                window.open(`https://wa.me/8669593756?text=${message}`, '_blank');
                whatsappCard.classList.add('hidden');
            });
        }
    }
}

// Smooth scrolling for all internal links
function initializeSmoothScrolling() {
    // Handle footer navigation buttons
    const footerButtons = document.querySelectorAll('footer button[onclick]');
    footerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const onclick = this.getAttribute('onclick');
            const sectionId = onclick.match(/scrollToSection\('(.+)'\)/);
            if (sectionId && sectionId[1]) {
                scrollToSection(sectionId[1]);
            }
        });
    });
}

// Toast notification system
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-message">${message}</span>
            <button class="toast-close" onclick="this.parentElement.parentElement.remove()">
                <i data-lucide="x" class="icon-tiny"></i>
            </button>
        </div>
    `;
    
    // Add styles
    toast.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        max-width: 400px;
        padding: 1rem;
        background: ${type === 'success' ? 'hsl(142, 76%, 36%)' : type === 'error' ? 'hsl(0, 84%, 60%)' : 'hsl(210, 40%, 98%)'};
        color: ${type === 'success' || type === 'error' ? 'white' : 'hsl(222, 84%, 5%)'};
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-family: var(--font-body);
        font-size: 0.875rem;
    `;
    
    // Add toast to document
    document.body.appendChild(toast);
    
    // Initialize Lucide icons for the close button
    lucide.createIcons();
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }
    }, 5000);
}

// Add CSS animations for toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .toast-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .toast-close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.25rem;
        border-radius: 0.25rem;
    }
    
    .toast-close:hover {
        opacity: 1;
        background: rgba(255, 255, 255, 0.1);
    }
`;
document.head.appendChild(style);

// Add intersection observer for animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Add fadeInUp animation
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    section {
        opacity: 0;
    }
    
    section.animated {
        animation: fadeInUp 0.6s ease forwards;
    }
`;
document.head.appendChild(animationStyle);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Delay animation initialization to ensure proper loading
    setTimeout(initializeAnimations, 500);
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Re-initialize Lucide icons after potential layout changes
    lucide.createIcons();
});

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Handle form validation
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Please enter a valid name (at least 2 characters)');
    }
    
    if (!formData.phone || !/^[\+]?[1-9][\d]{9,14}$/.test(formData.phone.replace(/\s/g, ''))) {
        errors.push('Please enter a valid phone number');
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Please enter a message (at least 10 characters)');
    }
    
    return errors;
}

// Enhanced contact form with better validation
function initializeEnhancedContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
            });
            
            input.addEventListener('input', function() {
                clearInputError(this);
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get and validate form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            const errors = validateForm(data);
            
            if (errors.length > 0) {
                showToast(errors[0], 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i data-lucide="loader-2" class="icon-small animate-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate processing delay
            setTimeout(() => {
                // Create WhatsApp message
                const message = `Hello Asha Tailor! 

Name: ${data.name}
Email: ${data.email || 'Not provided'}
Phone: ${data.phone}
Service: ${data.service || 'Not specified'}

Message: ${data.message}`;
                
                // Open WhatsApp
                const whatsappUrl = `https://wa.me/8080920232?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
                
                // Reset form and button
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showToast('Message sent successfully! We\'ll respond on WhatsApp shortly.', 'success');
                
                // Re-initialize Lucide icons
                lucide.createIcons();
            }, 1000);
        });
    }
}

function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    switch (input.name) {
        case 'name':
            if (!value || value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            }
            break;
        case 'phone':
            if (!value || !/^[\+]?[1-9][\d]{9,14}$/.test(value.replace(/\s/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
            break;
        case 'email':
            if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'message':
            if (!value || value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters';
            }
            break;
    }
    
    if (!isValid) {
        showInputError(input, errorMessage);
    } else {
        clearInputError(input);
    }
    
    return isValid;
}

function showInputError(input, message) {
    clearInputError(input);
    
    input.style.borderColor = 'hsl(0, 84%, 60%)';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'input-error';
    errorDiv.style.cssText = `
        color: hsl(0, 84%, 60%);
        font-size: 0.75rem;
        margin-top: 0.25rem;
        font-family: var(--font-body);
    `;
    errorDiv.textContent = message;
    
    input.parentNode.appendChild(errorDiv);
}

function clearInputError(input) {
    input.style.borderColor = '';
    const errorDiv = input.parentNode.querySelector('.input-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Replace the basic contact form initialization with the enhanced version
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    initializeGalleryFilter();
    initializeEnhancedContactForm(); // Use enhanced version
    initializeFloatingWhatsApp();
    initializeSmoothScrolling();
    initializeLazyLoading();
});