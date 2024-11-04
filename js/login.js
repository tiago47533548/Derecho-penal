function includeHTML() {
    const elements = document.querySelectorAll("[w3-include-html]");
    elements.forEach(elmnt => {
        const file = elmnt.getAttribute("w3-include-html");
        if (file) {
            fetch(file)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.text();
                })
                .then(data => {
                    elmnt.innerHTML = data;
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                })
                .catch(error => console.error('Error loading HTML:', error));
        }
    });
}
includeHTML();

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get input values and trim whitespace
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Proceed with login logic (e.g., AJAX request)
    login(email, password);
});

function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
}

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    login();
});

function login(email, password) {
    // Example AJAX request to send credentials to the server
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Handle successful login
        } else {
            // Handle login failure
            document.getElementById('loginMessage').innerText = 'Credenciales incorrectas.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}   

// Función para comprobar si la sesión está activa
function isSessionActive() {
    return localStorage.getItem('sessionActive') === 'true';
}

// Configura un intervalo para verificar el estado de la sesión cada 3 segundos
setInterval(() => {
    if (isSessionActive()) {
        console.log('La sesión está activa');
    } else {
        console.log('La sesión no está activa');
    }
}, 3000);