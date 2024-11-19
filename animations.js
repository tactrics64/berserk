// Smooth scrolling with easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Enhanced navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add blur effect and background when scrolling down
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Enhanced stats animation with better easing
const stats = document.querySelectorAll('.stat-number');
const animationDuration = 2000;
const frameDuration = 1000/60;
const totalFrames = Math.round(animationDuration / frameDuration);

const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

const animateStats = () => {
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const countTo = target;
        
        let frame = 0;
        const counter = setInterval(() => {
            frame++;
            const progress = easeOutCubic(frame/totalFrames);
            const currentCount = Math.round(countTo * progress);

            if (currentCount === countTo) {
                clearInterval(counter);
            } else {
                stat.textContent = currentCount.toLocaleString() + '+';
            }
        }, frameDuration);
    });
};

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const animateOnScroll = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(animateOnScroll, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .command-item, .support-card, .stat-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    observer.observe(element);
});

// Add animation class when elements come into view
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        element.classList.add('animate-in');
    });
});

// Theme switching with enhanced animation
const themeSwitch = document.querySelector('.theme-switch');
const html = document.documentElement;
const themeIcon = themeSwitch.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeSwitch.addEventListener('click', () => {
    themeSwitch.style.transform = 'scale(0.95) rotate(10deg)';
    setTimeout(() => {
        themeSwitch.style.transform = 'scale(1) rotate(0deg)';
    }, 200);

    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    themeIcon.style.transform = 'rotate(360deg)';
}

// Add CSS animation class
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 1 !important;
    }

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

    .navbar {
        transition: transform 0.3s ease, backdrop-filter 0.3s ease;
    }

    .navbar.scroll-down {
        transform: translateY(-100%);
    }

    .navbar.scroll-up {
        transform: translateY(0);
    }

    .theme-switch i {
        transition: transform 0.3s ease;
    }
`;

document.head.appendChild(style);

// Button hover effect
const buttons = document.querySelectorAll('.primary-button, .secondary-button, .cta-button');

buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });

    button.addEventListener('mouseout', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = 'none';
    });
});

// Status updates
const updateStatus = () => {
    // In a real implementation, these would be fetched from your API
    const serverCount = document.getElementById('server-count');
    const latency = document.getElementById('latency');
    const activeGames = document.getElementById('active-games');
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');

    // Simulated values - replace with actual API calls
    const mockData = {
        servers: Math.floor(Math.random() * (1000 - 800) + 800),
        latency: Math.floor(Math.random() * (100 - 20) + 20),
        games: Math.floor(Math.random() * (500 - 300) + 300),
        status: 'operational'
    };

    // Update values with animation
    const animateValue = (element, value, duration = 1000) => {
        const start = parseInt(element.textContent) || 0;
        const increment = (value - start) / (duration / 16);
        let current = start;

        const update = () => {
            current += increment;
            if ((increment > 0 && current >= value) || (increment < 0 && current <= value)) {
                element.textContent = value.toLocaleString();
            } else {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    };

    // Update status indicator
    if (mockData.status === 'operational') {
        statusDot.style.backgroundColor = '#10B981';
        statusDot.style.setProperty('--pulse-color', '#10B981');
        statusText.textContent = 'Operational';
    } else {
        statusDot.style.backgroundColor = '#EF4444';
        statusDot.style.setProperty('--pulse-color', '#EF4444');
        statusText.textContent = 'Issues Detected';
    }

    // Update values
    animateValue(serverCount, mockData.servers);
    latency.textContent = `${mockData.latency}ms`;
    animateValue(activeGames, mockData.games);
};

// Initial update
updateStatus();

// Update every 30 seconds
setInterval(updateStatus, 30000);

// Custom cursor animation
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Move dot instantly to cursor position
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

// Smooth outline animation
function animateOutline() {
    // Calculate distance between current outline position and mouse position
    let dx = mouseX - outlineX;
    let dy = mouseY - outlineY;
    
    // Move outline towards mouse with smooth easing
    outlineX += dx * 0.15;
    outlineY += dy * 0.15;
    
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';
    
    requestAnimationFrame(animateOutline);
}

animateOutline();

// Hide cursor when mouse leaves window
document.addEventListener('mouseout', () => {
    cursorDot.style.opacity = '0';
    cursorOutline.style.opacity = '0';
});

document.addEventListener('mouseover', () => {
    cursorDot.style.opacity = '1';
    cursorOutline.style.opacity = '0.5';
});

// Mobile enhancements
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
    // Add smooth-scroll class to body for better mobile scrolling
    document.body.classList.add('smooth-scroll');
    
    // Add touch feedback to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .feature-card, .command-item, .stat-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', () => {
            element.style.transform = 'scale(0.98)';
        }, { passive: true });
        
        element.addEventListener('touchend', () => {
            element.style.transform = 'none';
        }, { passive: true });
    });

    // Optimize scroll performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Prevent pull-to-refresh on mobile
    document.body.style.overscrollBehavior = 'none';
}
