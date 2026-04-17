document.addEventListener("DOMContentLoaded", function () {

    const music = document.getElementById("bg-music");
    const button = document.getElementById("musicToggle");
    const icon = document.getElementById("musicIcon");

    if (!music || !button || !icon) return;

    // volumen bajo
    music.volume = 0.07;

    // activar música en la primera interacción
    document.addEventListener("click", () => {
        music.play().catch(() => {});
    }, { once: true });

    // toggle mute
    button.addEventListener("click", () => {
        music.muted = !music.muted;

        if (music.muted) {
            icon.classList.remove("bi-volume-up");
            icon.classList.add("bi-volume-mute");
        } else {
            icon.classList.remove("bi-volume-mute");
            icon.classList.add("bi-volume-up");
        }
    });

});