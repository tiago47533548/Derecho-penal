// Procesar el formulario
function submitForm() {
    // Valores de los inputs
    const tema = document.getElementById('tema-input').value;
    const subtema = document.getElementById('subtema-input').value;
    const caracteristicas = document.getElementById('caracteristicas-input').value;

    // Mostrar los datos en la consola (o hacer algo con ellos)
    console.log('Tema:', tema);
    console.log('Subtema:', subtema);
    console.log('Características:', caracteristicas);

    // Para guardar en el backend y sus datos
    alert("¡Formulario enviado con éxito!");
}
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    elmnt.innerHTML = this.responseText;
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}
includeHTML();

function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
}
