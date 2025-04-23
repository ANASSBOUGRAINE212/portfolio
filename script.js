// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 20,
            behavior: 'smooth'
        });
    });
});

// Fade-in animation for sections using IntersectionObserver
const fadeInSections = document.querySelectorAll('section');
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

fadeInSections.forEach(section => {
    fadeInObserver.observe(section);
});

// Parallax effect for the home image (throttled with requestAnimationFrame)
const homeImage = document.querySelector('.home-img');
let lastScrollY = 0;

function handleParallax() {
    homeImage.style.transform = `translateY(${lastScrollY * 0.3}px)`;
}

if (homeImage) {
    window.addEventListener('scroll', () => {
        lastScrollY = window.pageYOffset;
        requestAnimationFrame(handleParallax);
    });
}

// Hover animations for buttons, links, and skill tags
const interactiveElements = document.querySelectorAll('button, a, .skill-tag');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.transform = 'scale(1.05)';
    });
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'scale(1)';
    });
});

// Typewriter effect for hero text
const typewriterElement = document.querySelector('.typewriter-text');
if (typewriterElement) {
    const text = "Junior Engineer in Networks, Telecommunications & Data Intelligence";
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            typewriterElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50); // Typing speed
        }
    }

    typewriterElement.textContent = ''; // Clear initial text
    typeWriter();
}

// Staggered animation for skill tags in the hero section
const skillTags = document.querySelectorAll('.skill-tag');
if (skillTags.length > 0) {
    skillTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.opacity = 1;
            tag.style.transform = 'translateY(0)';
        }, 500 + (index * 200));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const typingText = document.querySelector('.typing-text span');
    console.log(typingText); // Check if this logs the correct element

    const words = [
        "Computer Vision Engineer",
        "Network engineer",
        "Web Designer",
        "Data Scientist",
        "Telecommunication engineer",
        "Software Developer"
    ];
    let wordIndex = 0;

    function updateText() {
        if (typingText) {
            typingText.textContent = words[wordIndex];
            wordIndex = (wordIndex + 1) % words.length;
        } else {
            console.error("Element '.typing-text span' not found!");
        }
    }

    setInterval(updateText, 4000); // Change text every 4 seconds
});