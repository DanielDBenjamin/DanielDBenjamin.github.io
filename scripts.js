document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const menuToggle = document.getElementById('mobile-menu');
    const navUL = document.querySelector('nav ul');

    // Function to highlight the active link based on the current page
    const setActiveLink = () => {
        navLinks.forEach(link => {
            // Remove 'active' class from all links
            link.classList.remove('active');
            
            // Check if the href matches the current page
            if (link.href === window.location.href) {
                link.classList.add('active');
            }
        });
    };

    setActiveLink();

    // Add smooth scroll effect only for in-page links (href starts with '#')
    navLinks.forEach(anchor => {
        if (anchor.getAttribute('href').startsWith('#')) {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                if (href && href !== '#') {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }

                // Close the mobile menu after clicking
                if (navUL.classList.contains('show')) {
                    navUL.classList.remove('show');
                }
            });
        }
    });

    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navUL.classList.toggle('show');
        });
    }

    // Load GitHub repos only on portfolio.html
    if (window.location.pathname.includes('portfolio.html')) {
        fetchGitHubRepos();
    }
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
        })
        .catch(error => {
            console.error('Error fetching GitHub repositories:', error);
            repoContainer.innerHTML = `<p>Unable to fetch repositories.</p>`;
        });
}