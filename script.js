// Show content based on the initial hash
showContentFromHash();

// Function to reload the cat image
function reloadImage() {
    handleWaitCheck();
    document.getElementById('img').src = 'https://cataas.com/cat?a=' + Math.random();
}

// Function to add filter to cat image
function addFilter() {
    var filter = prompt('Choose a filter. e.g. mono, negate, custom. See cataas.com/');
    if (filter) {
        document.getElementById('img').src = 'https://cataas.com/cat?filter=' + filter;
    }
}

// Function to reload the cat gif
function reloadGif() {
    handleWaitCheck();
    document.getElementById('gifImg').src = 'https://cataas.com/cat/gif?a=' + Math.random();
}

// Function to change the saying of the cat
function catsay() {
    var saying = prompt('Cat say:');
    if (saying) {
        document.getElementById('says').src = 'https://cataas.com/cat/says/' + saying + '?fontSize=50';
    }
}

// Function to fetch and display a random fact
function fact() {
    fetch('https://meowfacts.herokuapp.com/')
        .then(response => response.json())
        .then(data => document.getElementById('factEl').textContent = 'Interesting fact: ' + data.data[0])
        .catch(console.error);
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

// Interval to reload fact every 6 seconds
setInterval(fact, 6000);

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
        .catch(error => {
            console.error('Error fetching tags:', error);
        });
});

// Event listener for hash change
window.addEventListener('hashchange', showContentFromHash);
