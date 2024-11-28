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

    // Fetch and display GitHub repositories
    fetchGitHubRepos();
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
            console.log('Error fetching GitHub repositories:', error);
        });
}