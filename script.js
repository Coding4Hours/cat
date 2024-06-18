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

document.addEventListener('click', function(event) {
    // Close multiselect dropdown when clicking outside
    if (!event.target.closest('.multiselect')) {
        document.querySelectorAll('.multiselect.active').forEach(function(multi) {
            multi.classList.remove('active');
        });
    }
});

document.querySelectorAll('.multiselect .title').forEach(function(title) {
    title.addEventListener('click', function() {
        var multiselect = this.closest('.multiselect');
        multiselect.classList.toggle('active');
    });
});

document.querySelectorAll('.multiselect .container option').forEach(function(option) {
    option.addEventListener('click', function() {
        var multiselect = this.closest('.multiselect');
        var title = multiselect.querySelector('.title .text');
        title.textContent = this.textContent;
        multiselect.classList.remove('active');
    });
});


// Event listener for hash change
window.addEventListener('hashchange', showContentFromHash);
