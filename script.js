// Show content based on the initial hash
showContentFromHash();

// Function to reload the cat image
function reloadImage() {
    handleWaitCheck();
    document.getElementById('img').src = 'https://cataas.com/cat?a=' + Math.random();
}

// Function to reload the cat gif
function reloadGif() {
    handleWaitCheck();
    document.getElementById('gifImg').src = 'https://cataas.com/cat/gif?a=' + Math.random();
}

// Function to handle waiting period
function handleWaitCheck() {
    if (!localStorage.getItem('wait') || localStorage.getItem('wait') === 'true') {
        alert('Wait one second...');
        localStorage.setItem('wait', 'asdf');
    }
}

// Function to show content based on the URL hash
function showContentFromHash() {
    const hash = window.location.hash.substring(1); // Remove the '#' character
    const contentElements = document.querySelectorAll('.content');

    contentElements.forEach(content => {
        if (content.id === hash) {
            content.style.display = 'block';
        } else {
            content.style.display = 'none';
        }
    });
}

// Fetch tags and populate options
document.addEventListener('DOMContentLoaded', function () {
    const selectElement = document.getElementById('options1');

    fetch('https://cataas.com/api/tags')
        .then(response => response.json())
        .then(tags => {
            const options = tags
                .filter(tag => tag.trim() !== '')
                .map(tag => `<option value="${tag.replace("#", "")}">${tag.replace("#", "")}</option>`)
                .join('');

            selectElement.innerHTML = options;
        })
});



// Event listener for hash change
window.addEventListener('hashchange', showContentFromHash);












// Function to toggle active class for multiselect on title click
function toggleMultiselect(multiselect) {
    multiselect.classList.toggle('active');
    
    // Close other open multiselects
    document.querySelectorAll('.multiselect').forEach(function(ms) {
        if (ms !== multiselect) {
            ms.classList.remove('active');
        }
    });
}

// Initialize multiselects
document.querySelectorAll('.multiselect').forEach(function(multiselect) {
    const title = multiselect.querySelector('.title');
    const container = multiselect.querySelector('.container');

    // Toggle active class on title click
    title.addEventListener('click', function(event) {
        toggleMultiselect(multiselect);
        event.stopPropagation(); // Prevent document click listener from immediately closing
    });

    // Close multiselect dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!multiselect.contains(event.target)) {
            multiselect.classList.remove('active');
        }
    });

    // Handle option selection within multiselect dropdown
    container.addEventListener('click', function(event) {
        if (event.target.tagName === 'OPTION') {
            var titleText = multiselect.querySelector('.title .text');
            titleText.textContent = event.target.textContent.trim();
            multiselect.classList.remove('active');
            event.stopPropagation(); // Prevent immediate closure by document click listener
        }
    });
});
