// Enhanced JavaScript for Portfolio Website
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Typing effect
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const words = [
            "Network Engineer", 
            "Telecommunications Engineer",
            "devOps engineer",
            "Machine Learning Engineer",
            "Software Developer"
        ];
        
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                // Remove char
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // Add char
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentWord.length) {
                // Pause at end
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to next word
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }
            
            setTimeout(typeEffect, typeSpeed);
        }
        
        // Start the typing effect
        typeEffect();
    }
    // Animate when skills section is in view
    const skillsSection = document.getElementById('skills');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // Project hover and click effects
    const projectItems = document.querySelectorAll('.project-item');
    const projectPreview = document.querySelector('.project-preview');
    const projectsSection = document.getElementById('projects');
    const previewImage = document.querySelector('.preview-image');
    const previewTitle = document.querySelector('.preview-header h4');
    const previewDescription = document.querySelector('.preview-info p');
    const githubLink = document.querySelector('.github-link');
    const closeButton = document.querySelector('.close-preview');
    
    let isPreviewSticky = false;
    
    projectItems.forEach(item => {
        // Hover functionality
        item.addEventListener('mouseenter', function() {
            if (!isPreviewSticky) {
                showPreview(this);
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!isPreviewSticky) {
                projectPreview.classList.remove('active');
            }
        });
        
        // Click functionality to make preview sticky
        item.addEventListener('click', function() {
            showPreview(this);
            isPreviewSticky = true;
            projectPreview.classList.add('sticky');
        });
    });
    
    // Close preview when leaving projects section
    if (projectsSection) {
        projectsSection.addEventListener('mouseleave', function() {
            if (!isPreviewSticky) {
                projectPreview.classList.remove('active');
            } else {
                // Also close sticky preview when leaving section
                projectPreview.classList.remove('active', 'sticky');
                isPreviewSticky = false;
            }
        });
    }
    
    // Close button functionality
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            projectPreview.classList.remove('active', 'sticky');
            isPreviewSticky = false;
        });
    }
    
    // Function to show preview
    function showPreview(projectItem) {
        const imageUrl = projectItem.getAttribute('data-image');
        const title = projectItem.querySelector('h3').textContent;
        const description = projectItem.getAttribute('data-description');
        const githubUrl = projectItem.getAttribute('data-github');
        
        if (previewImage && previewTitle && previewDescription && githubLink) {
            previewImage.src = imageUrl;
            previewTitle.textContent = title;
            previewDescription.textContent = description;
            githubLink.href = githubUrl;
            projectPreview.classList.add('active');
        }
    }
    
    // Click outside to close sticky preview
    document.addEventListener('click', function(e) {
        if (isPreviewSticky && 
            !projectPreview.contains(e.target) && 
            !Array.from(projectItems).some(item => item.contains(e.target))) {
            projectPreview.classList.remove('active', 'sticky');
            isPreviewSticky = false;
        }
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header when scrolling down
        if (window.scrollY > lastScrollY && window.scrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = window.scrollY;
    });
});
