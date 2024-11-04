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
                    includeHTML(); // Recursividad para cargar más HTML
                })
                .catch(error => console.error('Error loading HTML:', error));
        }
    });
}
includeHTML();

function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
}

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (validateForm(nombre, email, password)) {
        registerUser (nombre, email, password);
    }
});

function validateForm(nombre, email, password) {
    if (!nombre || !email || !password) {
        alert('Por favor, completa todos los campos.');
        return false;
    }
    // Aquí puedes agregar más validaciones, como el formato del email.
    return true;
}

function registerUser (nombre, email, password) {
    let users = JSON.parse(localStorage.getItem('users')) || {};
    
    if (users[email]) {
        alert('El usuario ya está registrado.');
        return;
    }

    // Aquí se debe usar un hash seguro para las contraseñas en producción
    const hashedPassword = btoa(password); // Solo para fines de demostración
    users[email] = { nombre, password: hashedPassword };
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    window.location.href = 'login.html';
}