document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const menuToggle = document.getElementById('mobile-menu');
    const navUL = document.querySelector('nav ul');
    const sections = document.querySelectorAll('section');

    // Function to highlight the active link based on scroll position
    const setActiveLink = () => {
        let index = sections.length;

        while(--index && window.scrollY + 70 < sections[index].offsetTop) {}
        
        navLinks.forEach((link) => link.classList.remove('active'));
        navLinks[index].classList.add('active');
    };

    setActiveLink();
    window.addEventListener('scroll', setActiveLink);

    // Smooth scroll effect for all navigation links
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }

            // Close the mobile menu after clicking
            if (navUL.classList.contains('show')) {
                navUL.classList.remove('show');
            }
        });
    });

    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navUL.classList.toggle('show');
        });
    }

    // Reveal sections on scroll
    const revealOnScroll = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (sectionTop < screenPosition) {
                section.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Load GitHub repos only for portfolio section
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
        fetchGitHubRepos();
    }

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    // Check for saved user preference, if any, on load of the website
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️ Light Mode';
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.textContent = '☀️ Light Mode';
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            darkModeToggle.textContent = '🌙 Dark Mode';
            localStorage.setItem('dark-mode', 'disabled');
        }
    });
});

function fetchGitHubRepos() {
    const repoContainer = document.getElementById('repos');
    const githubUsername = 'DanielDBenjamin'; // Replace with your GitHub username
    const reposURL = `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=10`;

    fetch(reposURL)
        .then(response => response.json())
        .then(repos => {
            if (repos.message === "Not Found") {
                repoContainer.innerHTML = `<p>GitHub user not found.</p>`;
                return;
            }

            repos.forEach(repo => {
                const repoElement = document.createElement('div');
                repoElement.classList.add('repo');

                repoElement.innerHTML = `
                    <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                    <p>${repo.description ? repo.description : 'No description provided.'}</p>
                    <p>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count} | 📝 ${repo.language ? repo.language : 'N/A'}</p>
                `;

                repoContainer.appendChild(repoElement);
            });

            // Reveal repo container after loading
            repoContainer.classList.add('visible');
        })
        .catch(error => {
            console.error('Error fetching GitHub repositories:', error);
            repoContainer.innerHTML = `<p>Unable to fetch repositories.</p>`;
        });
}
