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

function catSays() {
    Swal.fire({
        title: "What do you want it so say?",
        input: "text",
        inputAttributes: {
            autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Say",
        showLoaderOnConfirm: true,
        preConfirm: async (catSaying) => {
            document.getElementById("says").src = `https://cataas.com/cat/says/${catSaying}?fontSize=50`;
        }
    });
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
document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.getElementById('options1');

    fetch('https://cataas.com/api/tags')
        .then(response => response.json())
        .then(tags => {
            const options = tags
                .filter(tag => tag.trim() !== '')
                .map(tag => `<option value="${tag.replace("#", "").toLowerCase()}">${tag.replace("#", "")}</option>`)
                .join('');

            selectElement.innerHTML = options;
        })
});



// Event listener for hash change
window.addEventListener('hashchange', showContentFromHash);

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
}
