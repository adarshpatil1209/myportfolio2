// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Get in Touch button scroll
const contactNavBtns = document.querySelectorAll('#contact-nav-btn, #contact-mobile-btn');
contactNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        if (!mobileMenuBtn.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (!name || !email || !message) {
        showFormStatus('Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showFormStatus('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate delay
    setTimeout(() => {
        // In a real application, you would send this data to a server
        console.log('Form Data:', { name, email, message });
        
        // Show success message
        showFormStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form status message
function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.classList.remove('hidden', 'text-red-400', 'text-green-400');
    formStatus.classList.add(type === 'success' ? 'text-green-400' : 'text-red-400');
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formStatus.classList.add('hidden');
    }, 5000);
}

// Scroll to top button functionality (optional, can be added)
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const nav = document.querySelector('nav');
    
    // Add shadow to nav on scroll
    if (scrollY > 10) {
        nav.classList.add('shadow-lg', 'shadow-teal-500/5');
    } else {
        nav.classList.remove('shadow-lg', 'shadow-teal-500/5');
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and elements
document.querySelectorAll('.group, section > div').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
});

// Active nav link highlighting on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.classList.remove('text-teal-400');
        link.classList.add('text-gray-300');
        
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.remove('text-gray-300');
            link.classList.add('text-teal-400');
        }
    });
});

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }
});

// Add loading state for external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function (e) {
        // Smooth visual feedback
        this.style.opacity = '0.7';
        setTimeout(() => {
            this.style.opacity = '1';
        }, 200);
    });
});

console.log('Portfolio website loaded successfully!');
