

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    // Toggle the 'active' class when the menuToggle is clicked
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.job-filters form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get the values from the form fields
        const keywords = document.getElementById('keywords').value;
        const industry = document.getElementById('industry').value;
        const location = document.getElementById('location').value;
        const salary = document.getElementById('salary').value;

        // You can perform further actions here, such as:
        // - Sending the form data to a server via AJAX for filtering job listings
        // - Displaying filtered job listings on the page
        // - Any other actions based on the user's search criteria

        // For demonstration purposes, let's just log the form data to the console
        console.log('Keywords:', keywords);
        console.log('Industry:', industry);
        console.log('Location:', location);
        console.log('Salary:', salary);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.getElementById('language-select');

    // Load default language (English)
    let currentLanguage = 'en';
    loadLanguage(currentLanguage);

    // Event listener for language select change
    languageSelect.addEventListener('change', function() {
        currentLanguage = languageSelect.value;
        loadLanguage(currentLanguage);
    });

    // Function to load language based on user selection
    function loadLanguage(language) {
        fetch(`languages/${language}.json`)
            .then(response => response.json())
            .then(data => {
                // Update text content of elements based on language
                document.getElementById('hero-heading').textContent = data.hero.heading;
                document.getElementById('hero-text').textContent = data.hero.text;
                document.getElementById('explore-btn').textContent = data.hero.btnText;
                document.getElementById('contact-heading').textContent = data.contact.heading;
                document.getElementById('contact-text').textContent = data.contact.text;
                document.getElementById('email-link').textContent = data.contact.email;
            })
            .catch(error => console.error('Error loading language:', error));
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch job listings from the API
    function fetchJobListings() {
        // Replace 'API_ENDPOINT' with the actual URL of the API endpoint
        const apiUrl = 'API_ENDPOINT';

        // Make a GET request to the API
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Process the retrieved job listings data
                displayJobListings(data);
            })
            .catch(error => {
                console.error('Error fetching job listings:', error);
            });
    }

    // Function to display job listings on the webpage
    function displayJobListings(jobListings) {
        const jobListContainer = document.getElementById('job-listings');

        // Clear existing job listings
        jobListContainer.innerHTML = '';

        // Iterate over the job listings and create HTML elements to display them
        jobListings.forEach(job => {
            const jobCard = document.createElement('div');
            jobCard.classList.add('job-card');

            const title = document.createElement('h3');
            title.textContent = job.title;

            const company = document.createElement('p');
            company.textContent = 'Company: ' + job.company;

            const location = document.createElement('p');
            location.textContent = 'Location: ' + job.location;

            const description = document.createElement('p');
            description.textContent = 'Description: ' + job.description;

            const applyButton = document.createElement('a');
            applyButton.href = job.applyUrl;
            applyButton.textContent = 'Apply Now';
            applyButton.classList.add('btn');

            jobCard.appendChild(title);
            jobCard.appendChild(company);
            jobCard.appendChild(location);
            jobCard.appendChild(description);
            jobCard.appendChild(applyButton);

            jobListContainer.appendChild(jobCard);
        });
    }

    // Fetch job listings when the page loads
    fetchJobListings();
});

// Initialize the map
function initMap() {
    // Center the map on Japan
    var japan = { lat: 35.682839, lng: 139.759455 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: japan
    });

    // Example job listings data
    var jobListings = [
        { title: 'Software Engineer', company: 'TechJapan Inc.', location: { lat: 35.6895, lng: 139.6917 } },
        { title: 'English Teacher', company: 'ABC English School', location: { lat: 34.6937, lng: 135.5023 } }
        // Add more job listings as needed
    ];

    // Add markers for each job listing
    jobListings.forEach(function (job) {
        var marker = new google.maps.Marker({
            position: job.location,
            map: map,
            title: job.title
        });

        // Add info window to display job details when marker is clicked
        var infoWindow = new google.maps.InfoWindow({
            content: '<h3>' + job.title + '</h3><p>' + job.company + '</p>'
        });

        marker.addListener('click', function () {
            infoWindow.open(map, marker);
        });
    });
}

const jobCards = document.querySelectorAll('.job-card');

        jobCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.backgroundColor = '#f0f0f0'; // Change background color on hover
            });

            card.addEventListener('mouseleave', () => {
                card.style.backgroundColor = '#fff'; // Restore original background color when not hovered
            });
        });
