document.addEventListener("DOMContentLoaded", () => {

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

let isSubmitting = false; // anti doble envío

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (isSubmitting) return; // evita spam rápido

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");

    
    const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/; // solo letras
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|org)$/i;

    // dominios permitidos
    const allowedDomains = [
        "gmail.com",
        "hotmail.com",
        "outlook.com",
        "yahoo.com",
        "comunidad.com"
    ];

    let valid = true;

    // limpiar errores
    [nombre, email, mensaje].forEach(c => c.classList.remove("is-invalid"));

    // 🔒 Sanitizar inputs
    const cleanNombre = nombre.value.trim().replace(/[<>]/g, "");
    const cleanEmail = email.value.trim().toLowerCase();
    const cleanMensaje = mensaje.value.trim().replace(/[<>]/g, "");

    // VALIDACIÓN NOMBRE
    if (
        cleanNombre.length < 3 ||
        cleanNombre.length > 50 ||
        !nombreRegex.test(cleanNombre)
    ) {
        nombre.classList.add("is-invalid");
        valid = false;
    }

    // VALIDACIÓN EMAIL
    const domain = cleanEmail.split("@")[1];

    if (
        !emailRegex.test(cleanEmail) ||
        !allowedDomains.includes(domain)
    ) {
        email.classList.add("is-invalid");
        valid = false;
    }

    // VALIDACIÓN MENSAJE
    if (
        cleanMensaje.length < 10 ||
        cleanMensaje.length > 500
    ) {
        mensaje.classList.add("is-invalid");
        valid = false;
    }

    if (!valid) return;

    // 🔒 bloqueo envío
    isSubmitting = true;

    status.innerHTML = "<span class='text-warning'>Enviando...</span>";

    try {
        const response = await fetch("https://formspree.io/f/mojyeboo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                nombre: cleanNombre,
                email: cleanEmail,
                mensaje: cleanMensaje
            })
        });

        if (response.ok) {
            status.innerHTML = "<span class='text-success'> Mensaje enviado con éxito</span>";
            form.reset();
        } else {
            status.innerHTML = "<span class='text-danger'> Error al enviar</span>";
        }

    } catch (error) {
        status.innerHTML = "<span class='text-danger'> Error de conexión</span>";
    }

    setTimeout(() => {
        isSubmitting = false;
    }, 3000);
});

});