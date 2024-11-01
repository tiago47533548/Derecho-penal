const fixedButton = document.getElementById("fixedButton");
const chatContainer = document.getElementById("chatContainer");

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


fixedButton.addEventListener("click", function() {
    if (!chatContainer.classList.contains("slideIn")) {
        chatContainer.classList.remove("slideOut");
        chatContainer.classList.add("slideIn");
    } else {
        chatContainer.classList.remove("slideIn");
        chatContainer.classList.add("slideOut");
    }
});

function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
}
