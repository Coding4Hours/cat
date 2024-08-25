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

const BIN_URL_READ = 'https://api.jsonbin.io/v3/b/66ca6d48ad19ca34f89a8f83/latest';
const BIN_URL_UPDATE = 'https://api.jsonbin.io/v3/b/66ca6d48ad19ca34f89a8f83';
const BIN_API_KEY = '$2a$10$4ebKU8OBCBuzya/EUYEJKuXdKRU3Nh7v68tPbiFT7TR0LhOagRF2a';
const RANDOM_FACT_URL = 'https://meowfacts.herokuapp.com/';
const DATE_KEY = 'factDate';

// Function to fetch a random cat fact
function fetchCatFact(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', RANDOM_FACT_URL, true);
    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            callback(null, data.data[0]);
        } else {
            callback("Error fetching random cat fact");
        }
    };
    xhr.onerror = () => callback("Network error fetching random cat fact");
    xhr.send();
}

// Function to fetch the cat facts from JSONBin.io
function fetchFactsFromBin(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', BIN_URL_READ, true);
    xhr.setRequestHeader('X-Master-Key', BIN_API_KEY);
    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            callback(null, data.record || []);
        } else {
            callback("Error fetching data from JSONBin.io");
        }
    };
    xhr.onerror = () => callback("Network error fetching data from JSONBin.io");
    xhr.send();
}

// Function to update the cat facts in JSONBin.io
function updateFactInBin(date, fact, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', BIN_URL_UPDATE, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Master-Key', BIN_API_KEY);
    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            callback(null, xhr.responseText);
        } else {
            callback("Error updating data in JSONBin.io");
        }
    };
    xhr.onerror = () => callback("Network error updating data in JSONBin.io");
    xhr.send(JSON.stringify({ date, fact }));
}

// Function to display the cat fact
function dailyFact() {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    fetchFactsFromBin((err, facts) => {
        if (err) {
            console.error(err);
            return;
        }

        const existingFact = facts.find(item => item.date === today);

        if (existingFact) {
            document.getElementById('dailyFactEl').textContent = `Daily Cat Fact: ${newFact}`;
        } else {
            fetchCatFact((fetchErr, newFact) => {
                if (fetchErr) {
                    console.error(fetchErr);
                    return;
                }

                updateFactInBin(today, newFact, (updateErr, response) => {
                    if (updateErr) {
                        console.error(updateErr);
                        return;
                    }

                    document.getElementById('dailyFactEl').textContent = `Daily Cat Fact: ${newFact}`;
                });
            });
        }
    });
}


dailyFact();
