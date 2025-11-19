// ============================================
// PARTICLE SYSTEM WITH CONNECTIONS
// ============================================

class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.connectionDistance = 150;
        this.particleCount = 50;
        this.mouseX = 0;
        this.mouseY = 0;
        this.raf = null;
        this.running = false; // start paused; will be started when hero is visible

        this.resizeCanvas();
        this.createParticles();

        window.addEventListener('resize', () => this.resizeCanvas());
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        
        // Left side particles moving right
        for (let i = 0; i < this.particleCount / 2; i++) {
            this.particles.push({
                x: Math.random() * (window.innerWidth * 0.3),
                y: Math.random() * window.innerHeight,
                vx: Math.random() * 1 + 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.5 + 0.3,
                side: 'left'
            });
        }

        // Right side particles moving left
        for (let i = 0; i < this.particleCount / 2; i++) {
            this.particles.push({
                x: window.innerWidth - Math.random() * (window.innerWidth * 0.3),
                y: Math.random() * window.innerHeight,
                vx: -(Math.random() * 1 + 0.5),
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.5 + 0.3,
                side: 'right'
            });
        }
    }

    update() {
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges vertically
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
                particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            }

            // Reset horizontal position when off-screen
            if (particle.side === 'left' && particle.x > this.canvas.width) {
                particle.x = -10;
                particle.y = Math.random() * this.canvas.height;
            } else if (particle.side === 'right' && particle.x < 0) {
                particle.x = this.canvas.width + 10;
                particle.y = Math.random() * this.canvas.height;
            }

            // Slight drift
            particle.vy += (Math.random() - 0.5) * 0.1;
            particle.vy = Math.max(-1, Math.min(1, particle.vy));

            // Opacity pulse
            particle.opacity += (Math.random() - 0.5) * 0.02;
            particle.opacity = Math.max(0.2, Math.min(0.8, particle.opacity));
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectionDistance) {
                    const opacity = (1 - distance / this.connectionDistance) * 0.4;
                    this.ctx.strokeStyle = `rgba(20, 184, 166, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }

        // Draw particles with glow
        this.particles.forEach(particle => {
            // Glow effect
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.radius * 3
            );
            gradient.addColorStop(0, `rgba(20, 184, 166, ${particle.opacity * 0.6})`);
            gradient.addColorStop(1, `rgba(20, 184, 166, 0)`);
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
            this.ctx.fill();

            // Core particle
            this.ctx.fillStyle = `rgba(20, 184, 166, ${particle.opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    animate() {
        if (!this.running) return;
        this.update();
        this.draw();
        this.raf = requestAnimationFrame(() => this.animate());
    }

    start() {
        if (this.running) return;
        this.running = true;
        this.animate();
    }

    stop() {
        this.running = false;
        if (this.raf) {
            cancelAnimationFrame(this.raf);
            this.raf = null;
        }
    }
}

// Initialize particle system (paused by default)
const canvas = document.getElementById('particle-canvas');
let particleSystem = null;
if (canvas) {
    particleSystem = new ParticleSystem(canvas);
}

// Ensure mobile menu button reference exists
const mobileMenuBtn = document.getElementById('mobile-menu-btn');

// ============================================
// SUNLIGHT EFFECT WITH SCROLL
// ============================================

const sunlight = document.getElementById('sunlight');
let sunlightFadeStart = window.innerHeight * 0.5;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (scrollY > sunlightFadeStart) {
        sunlight.classList.add('hidden');
    } else {
        sunlight.classList.remove('hidden');
    }

    // Parallax effect for underwater background
    const underwaterBg = document.querySelector('.underwater-bg');
    if (underwaterBg) {
        underwaterBg.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
});

// Show visuals only when hero (intro) is visible
const hero = document.getElementById('hero');
if (hero) {
    const heroObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.body.classList.add('visuals-active');
                if (particleSystem) particleSystem.start();
            } else {
                document.body.classList.remove('visuals-active');
                if (particleSystem) particleSystem.stop();
            }
        });
    }, { threshold: 0.35 });

    heroObserver.observe(hero);

    // Initial check (in case page loaded scrolled to hero)
    const rect = hero.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        document.body.classList.add('visuals-active');
        if (particleSystem) particleSystem.start();
    }
}
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
