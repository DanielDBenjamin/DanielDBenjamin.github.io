document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');
    const menuToggle = document.getElementById('mobile-menu');
    const navUL = document.querySelector('nav ul');

    // Function to update active link based on scroll position
    const setActiveLink = () => {
        let index = sections.length;

        while(--index && window.scrollY + 50 < sections[index].offsetTop) {}
        
        navLinks.forEach((link) => link.classList.remove('active'));
        if (navLinks[index]) {
            navLinks[index].classList.add('active');
        }
    };

    setActiveLink();
    window.addEventListener('scroll', setActiveLink);

    // Add smooth scroll effect
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close the mobile menu after clicking
            if (navUL.classList.contains('show')) {
                navUL.classList.remove('show');
            }
        });
    });

    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
        navUL.classList.toggle('show');
    });
});