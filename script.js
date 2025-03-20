// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

// Toggle navigation menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = document.querySelector('#navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to nav items on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const navbarHeight = document.querySelector('#navbar').offsetHeight;
        
        if (pageYOffset >= sectionTop - navbarHeight - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.25
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
    section.classList.add('fade-in');
});

// Observe all project cards for animation
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
    card.classList.add('fade-in');
});

// Observe all skill tags for animation
document.querySelectorAll('.skill-tag').forEach((tag, index) => {
    observer.observe(tag);
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.classList.add('pop-in');
});

// Update footer with current year
const footerYear = new Date().getFullYear();
document.querySelector('footer .container p').innerHTML = `&copy; ${footerYear} Oğuz Nurlu. All rights reserved.`;

// Update last updated date
const lastUpdatedElement = document.createElement('p');
lastUpdatedElement.classList.add('last-updated');
lastUpdatedElement.textContent = `Last updated: March 20, 2025`;
document.querySelector('footer .container').appendChild(lastUpdatedElement);

// Add typing animation to hero text
const heroText = document.querySelector('.hero-content h2');
const text = heroText.textContent;
heroText.textContent = '';

let i = 0;
const typingSpeed = 100;

function typeWriter() {
    if (i < text.length) {
        heroText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, typingSpeed);
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .fade-in.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .pop-in {
        opacity: 0;
        transform: scale(0.8);
        transition: opacity 0.4s ease-out, transform 0.4s ease-out;
    }
    
    .pop-in.animate {
        opacity: 1;
        transform: scale(1);
    }
    
    .nav-links a.active {
        color: var(--primary-color);
        font-weight: 700;
    }
    
    .last-updated {
        font-size: 0.8rem;
        margin-top: 0.5rem;
        opacity: 0.8;
    }
`;

document.head.appendChild(style);