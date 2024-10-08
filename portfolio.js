// Toggle theme light to dark and vice versa
const toggleThemeButton = document.getElementById('toggleTheme');
const body = document.body;
const icon = toggleThemeButton.querySelector('i');

// Initialize light mode as the default
body.classList.add('light-mode');

toggleThemeButton.addEventListener('click', () => {
    // Toggle the theme
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');

    // Change the icon depending on the current theme
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Navlinks toggle
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll('.navbar a');
    const menuIcon = document.getElementById('menu-icon'); // Ensure this is defined here
    const navbar = document.querySelector('.navbar'); // Get the navbar element
    const headerHeight = document.querySelector('.header').offsetHeight; // Get the height of the header

    // Function to scroll to a section based on its ID
    function scrollToSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            const offsetPosition = targetSection.offsetTop - headerHeight; // Calculate position
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Check if there's a hash in the URL on page load
    const initialHash = window.location.hash.substring(1); // Remove the '#' character
    if (initialHash) {
        scrollToSection(initialHash); // Scroll to the initial section if it exists
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            const targetId = this.getAttribute('href').substring(1); // Get the target section ID

            // Check if the clicked link is the Resume link
            if (this.id === 'resume-link') {
                event.preventDefault(); // Prevent default action
                downloadResume(); // Call the download function
                return; // Exit the function to prevent further actions
            }

            event.preventDefault(); // Prevent default scrolling behavior

            // Save the current section in localStorage
            localStorage.setItem('currentSection', targetId);

            // Scroll to the target section with a smooth effect
            scrollToSection(targetId);
            navbar.classList.remove('menu-open'); // Close the navbar when a link is clicked
        });
    });

    // Menu icon functionality
    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('menu-open'); // Toggle the navbar visibility
        document.body.classList.toggle('menu-open'); // Toggle body class if needed
    });
});

// Function to download the resume
function downloadResume() {
    fetch('https://siratoonnahar.github.io/SiratoonNahar/SiratoonNahar-FullStackWebDeveloper.pdf')
        .then(response => response.blob()) // Convert response to Blob
        .then(blob => {
            const url = window.URL.createObjectURL(blob); // Create a URL for the blob
            const a = document.createElement('a'); // Create a new anchor element
            a.href = url; // Set the href to the blob URL
            a.download = 'Siratoon_Nahar_Resume.pdf'; // Set the filename for download
            document.body.appendChild(a); // Append the anchor to the document
            a.click(); // Programmatically click the anchor to trigger the download
            a.remove(); // Clean up by removing the anchor
            window.URL.revokeObjectURL(url); // Release the blob URL
        })
        .catch(err => console.error('Download failed:', err)); // Handle errors
}

// Resume button function
document.getElementById('downloadResume').addEventListener('click', function () {
    // Call the download function
    downloadResume();
});

// Hire button scroll
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({ behavior: 'smooth' });
}
