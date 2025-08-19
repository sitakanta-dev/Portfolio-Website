document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; 
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('.section');
        const scrollPosition = window.scrollY + 100; 

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`a[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); 

    function updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
        }
    }

    window.addEventListener('scroll', updateNavbarBackground);

    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    function validateName(name) {
        return name.trim().length >= 2;
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }

    function validateMessage(message) {
        return message.trim().length >= 10;
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        formGroup.classList.add('error');
        formGroup.classList.remove('success');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    function showSuccess(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        formGroup.classList.add('success');
        formGroup.classList.remove('error');
        errorElement.classList.remove('show');
    }

    function clearValidation(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        formGroup.classList.remove('error', 'success');
        errorElement.classList.remove('show');
    }

    nameInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            clearValidation(this);
        } else if (validateName(this.value)) {
            showSuccess(this);
        } else {
            showError(this, 'Name must be at least 2 characters long');
        }
    });

    emailInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            clearValidation(this);
        } else if (validateEmail(this.value)) {
            showSuccess(this);
        } else {
            showError(this, 'Please enter a valid email address');
        }
    });

    messageInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            clearValidation(this);
        } else if (validateMessage(this.value)) {
            showSuccess(this);
        } else {
            showError(this, 'Message must be at least 10 characters long');
        }
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = nameInput.value;
        const email = emailInput.value;
        const message = messageInput.value;
        
        let isValid = true;

        if (!validateName(name)) {
            showError(nameInput, name.trim() === '' ? 'Name is required' : 'Name must be at least 2 characters long');
            isValid = false;
        } else {
            showSuccess(nameInput);
        }

        if (!validateEmail(email)) {
            showError(emailInput, email.trim() === '' ? 'Email is required' : 'Please enter a valid email address');
            isValid = false;
        } else {
            showSuccess(emailInput);
        }

        if (!validateMessage(message)) {
            showError(messageInput, message.trim() === '' ? 'Message is required' : 'Message must be at least 10 characters long');
            isValid = false;
        } else {
            showSuccess(messageInput);
        }

        if (isValid) {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
            
            [nameInput, emailInput, messageInput].forEach(input => {
                clearValidation(input);
            });
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.project-card, .timeline-item, .skill-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    const skillItems = document.querySelectorAll('.skill-item');
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); 
            }
        });
    }, observerOptions);

    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        skillsObserver.observe(item);
    });
});